var konan = { libraries: [] };
/*
 * Copyright 2010-2017 JetBrains s.r.o.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var instance;
var heap;
var memory;
var global_arguments;
var globalBase = 0; // TODO: Is there any way to obtain global_base from JavaScript?

var konanStackTop;

function isBrowser() {
    if (typeof window === 'undefined') {
        return false;
    } else {
        return true;
    };
}

var runtime;
if (isBrowser()) {
    runtime = {
        print: console.log,
        stdout: '',
        write: function (message) {
           this.stdout += message;
           var lastNewlineIndex = this.stdout.lastIndexOf('\n');
           if (lastNewlineIndex == -1) return;
           this.print(this.stdout.substring(0, lastNewlineIndex));
           this.stdout = this.stdout.substring(lastNewlineIndex + 1)
        },
        flush: function () {
            this.print(this.stdout);
        },
        exit: function(status) {
            throw Error("Kotlin process called exit (" + status + ")");
        }
    };
} else {
    runtime = {
        write: write,
        print: print,
        flush: function() {},
        exit: quit
    };
}

function print_usage() {
    // TODO: any reliable way to obtain the current script name?
    runtime.print('Usage: d8 --expose-wasm launcher.js -- <program.wasm> <program arg1> <program arg2> ...')
    quit(1); // TODO: this is d8 specific
}

function utf8encode(s) {
    return unescape(encodeURIComponent(s));
}

function utf8decode(s) {
    return decodeURIComponent(escape(s));
}

function fromString(string, pointer) {
    for (i = 0; i < string.length; i++) {
        heap[pointer + i] = string.charCodeAt(i);
    }
    heap[pointer + string.length] = 0;
}

function toString(pointer) {
    var string = '';
    for (var i = pointer; heap[i] != 0; i++) {
        string += String.fromCharCode(heap[i]);
    }
    return string;
}

function toUTF16String(pointer, size) {
    var string = '';
    for (var i = pointer; i < pointer + size; i+=2) {
        string += String.fromCharCode(heap[i] + heap[i+1]*256);
    }
    return string;
}

function int32ToHeap(value, pointer) {
    heap[pointer]   = value & 0xff;
    heap[pointer+1] = (value & 0xff00) >>> 8;
    heap[pointer+2] = (value & 0xff0000) >>> 16;
    heap[pointer+3] = (value & 0xff000000) >>> 24;
}

function stackTop() {
    // Read the value module's `__stack_pointer` is initialized with.
    // It is the very first static in .data section.
    var addr = (globalBase == 0 ? 4 : globalBase);
    var fourBytes = heap.buffer.slice(addr, addr+4);
    return new Uint32Array(fourBytes)[0];
}

function runGlobalInitializers(exports) {
    for (var property in exports) {
        if (property.startsWith("Konan_global_ctor_")) {
            exports[property]();
        }
    }
}

var konan_dependencies = {
    env: {
        abort: function() {
            throw new Error("abort()");
        },
        // TODO: Account for file and size.
        fgets: function(str, size, file) {
            // TODO: readline can't read lines without a newline.
            // Browsers cant read from console at all.
            fromString(utf8encode(readline() + '\n'), str);
            return str;
        },
        Konan_heap_upper: function() {
            return memory.buffer.byteLength;
        },
        Konan_heap_lower: function() {
            return konanStackTop;
        },
        Konan_heap_grow: function(pages) {
            // The buffer is allocated anew on calls to grow(),
            // so renew the heap array.
            var oldLength = memory.grow(pages);
            heap = new Uint8Array(konan_dependencies.env.memory.buffer);
            return oldLength;
        },
        Konan_abort: function(pointer) {
            throw new Error("Konan_abort(" + utf8decode(toString(pointer)) + ")");
        },
        Konan_exit: function(status) {
            runtime.exit(status);
        },
        Konan_js_arg_size: function(index) {
            if (index >= global_arguments.length) return -1;
            return global_arguments[index].length + 1; // + 1 for trailing zero.
        },
        Konan_js_fetch_arg: function(index, ptr) {
            var arg = utf8encode(global_arguments[index]);
            fromString(arg, ptr);
        },
        Konan_date_now: function(pointer) {
            var now = Date.now();
            var high = Math.floor(now / 0xffffffff);
            var low = Math.floor(now % 0xffffffff);
            int32ToHeap(low, pointer);
            int32ToHeap(high, pointer+4);
        },
        stdin: 0, // This is for fgets(,,stdin) to resolve. It is ignored.
        // TODO: Account for fd and size.
        write: function(fd, str, size) {
            if (fd != 1 && fd != 2) throw ("write(" + fd + ", ...)");
            // TODO: There is no writeErr() in d8. 
            // Approximate it with write() to stdout for now.
            runtime.write(utf8decode(toString(str)));
        },
        memory: new WebAssembly.Memory({ initial: 256, maximum: 16384 })
    }
};

function linkJavaScriptLibraries() {
    konan.libraries.forEach ( function (library) {
        for (var property in library) {
            konan_dependencies.env[property] = library[property];
        };
    });
};

function invokeModule(inst, args) {
    if (args.length < 1) print_usage();
    global_arguments = args;

    instance = inst;

    memory = konan_dependencies.env.memory
    heap = new Uint8Array(konan_dependencies.env.memory.buffer);
    konanStackTop = stackTop();

    var exit_status = 0;

    try {
        runGlobalInitializers(instance.exports);
        if (isBrowser()) {
            instance.memoryState = instance.exports.InitRuntime();
        }
        exit_status = instance.exports.Konan_js_main(args.length, isBrowser() ? 0 : 1);
        // TODO: so when should we deinit runtime?
    } catch (e) {
        runtime.print("Exception executing entry point: " + e);
        runtime.print(e.stack);
        exit_status = 1;
    }
    runtime.flush();

    return exit_status;
}

function setupModule(module) {
    module.env = {};
    module.env.memoryBase = 0;
    module.env.tablebase = 0;
    linkJavaScriptLibraries();
}

// Instantiate module in Browser in a sequence of promises.
function instantiateAndRun(arraybuffer, args) {
    WebAssembly.compile(arraybuffer)
    .then(function(module) {
        setupModule(module);
        return WebAssembly.instantiate(module, konan_dependencies);
    }).then(function(instance) {
        return invokeModule(instance, args);
    });
}

// Instantiate module in d8 synchronously.
function instantiateAndRunSync(arraybuffer, args) {
    var module = WebAssembly.Module(arraybuffer)
    setupModule(module);
    var instance = WebAssembly.Instance(module, konan_dependencies);
    return invokeModule(instance, args)
}

if (isBrowser()) {
    var filename = document.currentScript.getAttribute("wasm");
    fetch(filename).then( function(response) {
        return response.arrayBuffer();
    }).then(function(arraybuffer) { 
        instantiateAndRun(arraybuffer, [filename]); 
    });
} else {
    // Invoke from d8.
    var arrayBuffer = readbuffer(arguments[0]);
    var exitStatus = instantiateAndRunSync(arrayBuffer, arguments);
    quit(exitStatus);
}


konan.libraries.push ({
    arenas: new Map(),
    nextArena: 0,
    Konan_js_allocateArena: function (array) {
        var index = konan_dependencies.env.nextArena++;
        konan_dependencies.env.arenas.set(index, array || []);
        return index;
        
    },
    Konan_js_freeArena: function(arenaIndex) {
        var arena = konan_dependencies.env.arenas.get(arenaIndex);
        arena.forEach(function(element, index) {
            arena[index] = null;
        });
        konan_dependencies.env.arenas.delete(arenaIndex);
    },
    Konan_js_pushIntToArena: function (arenaIndex, value) {
        var arena = konan_dependencies.env.arenas.get(arenaIndex);
        arena.push(value);
        return arena.length - 1;
    },
    Konan_js_addObjectToArena: function (arenaIndex, object) {
        var arena = konan_dependencies.env.arenas.get(arenaIndex);
        arena.push(object);
        return arena.length - 1;
    },
    Konan_js_wrapLambda: function (functionArenaIndex, index) {
        return (function () { 
            var functionArena = konan_dependencies.env.arenas.get(functionArenaIndex);

            // convert Arguments to an array
            // to be provided by launcher.js
            var argumentArenaIndex = konan_dependencies.env.Konan_js_allocateArena(Array.prototype.slice.call(arguments));

            var resultIndex = instance.exports.Konan_js_runLambda(index, argumentArenaIndex, arguments.length);
            var result = kotlinObject(argumentArenaIndex, resultIndex);
            konan_dependencies.env.Konan_js_freeArena(argumentArenaIndex);

            return result;
        });
    },
    Konan_js_getInt: function(arenaIndex, objIndex, propertyNamePtr, propertyNameLength) {
        // TODO:  The toUTF16String() is to be resolved by launcher.js runtime.
        var property = toUTF16String(propertyNamePtr, propertyNameLength); 
        var value =  kotlinObject(arenaIndex, objIndex)[property];
        return value;
    },
    Konan_js_getProperty: function(arenaIndex, objIndex, propertyNamePtr, propertyNameLength) {
        // TODO:  The toUTF16String() is to be resolved by launcher.js runtime.
        var property = toUTF16String(propertyNamePtr, propertyNameLength); 
        var arena = konan_dependencies.env.arenas.get(arenaIndex);
        var value = arena[objIndex][property];
        arena.push(value);
        return arena.length - 1;
    },
    Konan_js_setFunction: function (arena, obj, propertyName, propertyNameLength, func) {
        var name = toUTF16String(propertyName, propertyNameLength);
        kotlinObject(arena, obj)[name] = konan_dependencies.env.Konan_js_wrapLambda(arena, func);
    },

    Konan_js_setString: function (arena, obj, propertyName, propertyNameLength, stringPtr, stringLength) {
        var name = toUTF16String(propertyName, propertyNameLength);
        var string = toUTF16String(stringPtr, stringLength);
        kotlinObject(arena, obj)[name] = string;
    },
});

// TODO: This is just a shorthand notation.
function kotlinObject(arenaIndex, objectIndex) {
    var arena = konan_dependencies.env.arenas.get(arenaIndex);
    if (typeof arena == "undefined") {
        console.log("No arena index " + arenaIndex + "for object" + objectIndex);
        console.trace()
    } 
    return arena[objectIndex]
}

function toArena(arenaIndex, object) {
    return konan_dependencies.env.Konan_js_addObjectToArena(arenaIndex, object);
}


konan.libraries.push ({          // This one will be auto generated.
        knjs_addDocumentToArena: function(arena) {
            // Should be resolved by jsinterop.
            return toArena(arena, document);
        },
        knjs_setInterval: function (arena, func, interval) {
            setInterval(konan_dependencies.env.Konan_js_wrapLambda(arena, func), interval);
        },
        knjs_getElementById: function (arena, obj, id, idLength, resultArena) {
            var name = toUTF16String(id, idLength);
            var result = kotlinObject(arena, obj).getElementById(name);
            return toArena(resultArena, result);
        },
        knjs_getContext: function (arena, obj, context, contextLength, resultArena) {
            var name = toUTF16String(context, contextLength);
            var result = kotlinObject(arena, obj).getContext(name);
            return toArena(resultArena, result);
        },
        knjs_getBoundingClientRect: function (arena, obj, resultArena) {
            var result = kotlinObject(arena, obj).getBoundingClientRect();
            return toArena(resultArena, result);
        },
        knjs_moveTo: function(arena, obj, x, y) {
            kotlinObject(arena, obj).moveTo(x, y);
        },
        knjs_lineTo: function(arena, obj, x, y) {
            kotlinObject(arena, obj).lineTo(x, y);
        },
        knjs_fillRect: function(arena, obj, x1, y1, width, height) {
            kotlinObject(arena, obj).fillRect(x1, y1, width, height);
        },
        knjs_fill: function(arena, obj) {
            kotlinObject(arena, obj).fill();
        },
        knjs_closePath: function(arena, obj) {
            kotlinObject(arena, obj).closePath();
        },
        knjs_setLineWidth: function(arena, obj, value) {
            kotlinObject(arena, obj).lineWidth = value;
        },
        knjs_setFillStyle: function(arena, obj, value_ptr, value_length) {
            var value = toUTF16String(value_ptr, value_length);
            kotlinObject(arena, obj).fillStyle = value;
        },
        knjs_beginPath: function(arena, obj) {
            kotlinObject(arena, obj).beginPath();
        },
        knjs_stroke: function(arena, obj) {
            kotlinObject(arena, obj).stroke();
        },
        knjs_fetch: function(arena, urlPtr, urlLength, resultArena) {
            var url = toUTF16String(urlPtr, urlLength);
            var result = fetch(url);
            return toArena(resultArena, result);
        },
        knjs_then: function(arena, obj, func, resultArena) {
            var value = konan_dependencies.env.Konan_js_wrapLambda(arena, func);
            var result = kotlinObject(arena, obj).then(value);
            var index = toArena(resultArena, result);
            return index;
        },
        knjs_json: function(arena, obj, resultArena) {
            var object = kotlinObject(arena, obj);
            result = object.json();
            return toArena(resultArena, result);
        }
});
