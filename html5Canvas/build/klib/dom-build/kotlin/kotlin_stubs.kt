package kotlinx.interop.wasm.dom
import kotlinx.wasm.jsinterop.*
@SymbolName("knjs_get__Context_lineWidth")
external public fun knjs_get__Context_lineWidth(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_set__Context_lineWidth")
external public fun knjs_set__Context_lineWidth(arena: Int, index: Int, value: Int): Unit

@SymbolName("knjs_get__Context_fillStyle")
external public fun knjs_get__Context_fillStyle(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_set__Context_fillStyle")
external public fun knjs_set__Context_fillStyle(arena: Int, index: Int, valuePtr: Int, valueLen: Int): Unit

@SymbolName("knjs_get__Context_strokeStyle")
external public fun knjs_get__Context_strokeStyle(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_set__Context_strokeStyle")
external public fun knjs_set__Context_strokeStyle(arena: Int, index: Int, valuePtr: Int, valueLen: Int): Unit

@SymbolName("knjs__Context_lineTo")
external public fun knjs__Context_lineTo(arena: Int, index: Int, x: Int, y: Int, resultArena: Int): Unit

@SymbolName("knjs__Context_moveTo")
external public fun knjs__Context_moveTo(arena: Int, index: Int, x: Int, y: Int, resultArena: Int): Unit

@SymbolName("knjs__Context_beginPath")
external public fun knjs__Context_beginPath(arena: Int, index: Int, resultArena: Int): Unit

@SymbolName("knjs__Context_stroke")
external public fun knjs__Context_stroke(arena: Int, index: Int, resultArena: Int): Unit

@SymbolName("knjs__Context_fillRect")
external public fun knjs__Context_fillRect(arena: Int, index: Int, x: Int, y: Int, width: Int, height: Int, resultArena: Int): Unit

@SymbolName("knjs__Context_fillText")
external public fun knjs__Context_fillText(arena: Int, index: Int, testPtr: Int, testLen: Int, x: Int, y: Int, maxWidth: Int, resultArena: Int): Unit

@SymbolName("knjs__Context_fill")
external public fun knjs__Context_fill(arena: Int, index: Int, resultArena: Int): Unit

@SymbolName("knjs__Context_closePath")
external public fun knjs__Context_closePath(arena: Int, index: Int, resultArena: Int): Unit

open class Context(arena: Int, index: Int): JsValue(arena, index) {
  constructor(jsValue: JsValue): this(jsValue.arena, jsValue.index)
  var lineWidth: Int
    get() {
    val wasmRetVal = knjs_get__Context_lineWidth(this.arena, this.index, ArenaManager.currentArena)
      return wasmRetVal
    }

    set(value: Int) {
      knjs_set__Context_lineWidth(this.arena, this.index, value)
    }

  var fillStyle: String
    get() {
    val wasmRetVal = knjs_get__Context_fillStyle(this.arena, this.index, ArenaManager.currentArena)
      return TODO("Implement me")
    }

    set(value: String) {
      knjs_set__Context_fillStyle(this.arena, this.index, stringPointer(value), stringLengthBytes(value))
    }

  var strokeStyle: String
    get() {
    val wasmRetVal = knjs_get__Context_strokeStyle(this.arena, this.index, ArenaManager.currentArena)
      return TODO("Implement me")
    }

    set(value: String) {
      knjs_set__Context_strokeStyle(this.arena, this.index, stringPointer(value), stringLengthBytes(value))
    }

  fun  lineTo(x: Int, y: Int): Unit {
    knjs__Context_lineTo(this.arena, this.index, x, y, ArenaManager.currentArena)
    return 
  }

  fun  moveTo(x: Int, y: Int): Unit {
    knjs__Context_moveTo(this.arena, this.index, x, y, ArenaManager.currentArena)
    return 
  }

  fun  beginPath(): Unit {
    knjs__Context_beginPath(this.arena, this.index, ArenaManager.currentArena)
    return 
  }

  fun  stroke(): Unit {
    knjs__Context_stroke(this.arena, this.index, ArenaManager.currentArena)
    return 
  }

  fun  fillRect(x: Int, y: Int, width: Int, height: Int): Unit {
    knjs__Context_fillRect(this.arena, this.index, x, y, width, height, ArenaManager.currentArena)
    return 
  }

  fun  fillText(test: String, x: Int, y: Int, maxWidth: Int): Unit {
    knjs__Context_fillText(this.arena, this.index, stringPointer(test), stringLengthBytes(test), x, y, maxWidth, ArenaManager.currentArena)
    return 
  }

  fun  fill(): Unit {
    knjs__Context_fill(this.arena, this.index, ArenaManager.currentArena)
    return 
  }

  fun  closePath(): Unit {
    knjs__Context_closePath(this.arena, this.index, ArenaManager.currentArena)
    return 
  }

    companion object {
    }
}
val JsValue.asContext: Context
  get() {
    return Context(this.arena, this.index)
  }

@SymbolName("knjs_get__DOMRect_left")
external public fun knjs_get__DOMRect_left(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_set__DOMRect_left")
external public fun knjs_set__DOMRect_left(arena: Int, index: Int, value: Int): Unit

@SymbolName("knjs_get__DOMRect_right")
external public fun knjs_get__DOMRect_right(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_set__DOMRect_right")
external public fun knjs_set__DOMRect_right(arena: Int, index: Int, value: Int): Unit

@SymbolName("knjs_get__DOMRect_top")
external public fun knjs_get__DOMRect_top(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_set__DOMRect_top")
external public fun knjs_set__DOMRect_top(arena: Int, index: Int, value: Int): Unit

@SymbolName("knjs_get__DOMRect_bottom")
external public fun knjs_get__DOMRect_bottom(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_set__DOMRect_bottom")
external public fun knjs_set__DOMRect_bottom(arena: Int, index: Int, value: Int): Unit

open class DOMRect(arena: Int, index: Int): JsValue(arena, index) {
  constructor(jsValue: JsValue): this(jsValue.arena, jsValue.index)
  var left: Int
    get() {
    val wasmRetVal = knjs_get__DOMRect_left(this.arena, this.index, ArenaManager.currentArena)
      return wasmRetVal
    }

    set(value: Int) {
      knjs_set__DOMRect_left(this.arena, this.index, value)
    }

  var right: Int
    get() {
    val wasmRetVal = knjs_get__DOMRect_right(this.arena, this.index, ArenaManager.currentArena)
      return wasmRetVal
    }

    set(value: Int) {
      knjs_set__DOMRect_right(this.arena, this.index, value)
    }

  var top: Int
    get() {
    val wasmRetVal = knjs_get__DOMRect_top(this.arena, this.index, ArenaManager.currentArena)
      return wasmRetVal
    }

    set(value: Int) {
      knjs_set__DOMRect_top(this.arena, this.index, value)
    }

  var bottom: Int
    get() {
    val wasmRetVal = knjs_get__DOMRect_bottom(this.arena, this.index, ArenaManager.currentArena)
      return wasmRetVal
    }

    set(value: Int) {
      knjs_set__DOMRect_bottom(this.arena, this.index, value)
    }

    companion object {
    }
}
val JsValue.asDOMRect: DOMRect
  get() {
    return DOMRect(this.arena, this.index)
  }

@SymbolName("knjs__Canvas_getContext")
external public fun knjs__Canvas_getContext(arena: Int, index: Int, contextPtr: Int, contextLen: Int, resultArena: Int): Int

@SymbolName("knjs__Canvas_getBoundingClientRect")
external public fun knjs__Canvas_getBoundingClientRect(arena: Int, index: Int, resultArena: Int): Int

open class Canvas(arena: Int, index: Int): JsValue(arena, index) {
  constructor(jsValue: JsValue): this(jsValue.arena, jsValue.index)
  fun  getContext(context: String): Context {
    val wasmRetVal = knjs__Canvas_getContext(this.arena, this.index, stringPointer(context), stringLengthBytes(context), ArenaManager.currentArena)
    return Context(ArenaManager.currentArena, wasmRetVal)
  }

  fun  getBoundingClientRect(): DOMRect {
    val wasmRetVal = knjs__Canvas_getBoundingClientRect(this.arena, this.index, ArenaManager.currentArena)
    return DOMRect(ArenaManager.currentArena, wasmRetVal)
  }

    companion object {
    }
}
val JsValue.asCanvas: Canvas
  get() {
    return Canvas(this.arena, this.index)
  }

@SymbolName("knjs__Document_getElementById")
external public fun knjs__Document_getElementById(arena: Int, index: Int, idPtr: Int, idLen: Int, resultArena: Int): Int

open class Document(arena: Int, index: Int): JsValue(arena, index) {
  constructor(jsValue: JsValue): this(jsValue.arena, jsValue.index)
  fun  getElementById(id: String): JsValue {
    val wasmRetVal = knjs__Document_getElementById(this.arena, this.index, stringPointer(id), stringLengthBytes(id), ArenaManager.currentArena)
    return JsValue(ArenaManager.currentArena, wasmRetVal)
  }

    companion object {
    }
}
val JsValue.asDocument: Document
  get() {
    return Document(this.arena, this.index)
  }

@SymbolName("knjs_get__MouseEvent_clientX")
external public fun knjs_get__MouseEvent_clientX(arena: Int, index: Int, resultArena: Int): Int

@SymbolName("knjs_get__MouseEvent_clientY")
external public fun knjs_get__MouseEvent_clientY(arena: Int, index: Int, resultArena: Int): Int

open class MouseEvent(arena: Int, index: Int): JsValue(arena, index) {
  constructor(jsValue: JsValue): this(jsValue.arena, jsValue.index)
  val clientX: Int
    get() {
    val wasmRetVal = knjs_get__MouseEvent_clientX(this.arena, this.index, ArenaManager.currentArena)
      return wasmRetVal
    }

  val clientY: Int
    get() {
    val wasmRetVal = knjs_get__MouseEvent_clientY(this.arena, this.index, ArenaManager.currentArena)
      return wasmRetVal
    }

    companion object {
    }
}
val JsValue.asMouseEvent: MouseEvent
  get() {
    return MouseEvent(this.arena, this.index)
  }

@SymbolName("knjs__Response_json")
external public fun knjs__Response_json(arena: Int, index: Int, resultArena: Int): Int

open class Response(arena: Int, index: Int): JsValue(arena, index) {
  constructor(jsValue: JsValue): this(jsValue.arena, jsValue.index)
  fun  json(): JsValue {
    val wasmRetVal = knjs__Response_json(this.arena, this.index, ArenaManager.currentArena)
    return JsValue(ArenaManager.currentArena, wasmRetVal)
  }

    companion object {
    }
}
val JsValue.asResponse: Response
  get() {
    return Response(this.arena, this.index)
  }

@SymbolName("knjs__Promise_then")
external public fun knjs__Promise_then(arena: Int, index: Int, lambdaIndex: Int, lambdaResultArena: Int, resultArena: Int): Int

open class Promise(arena: Int, index: Int): JsValue(arena, index) {
  constructor(jsValue: JsValue): this(jsValue.arena, jsValue.index)
  fun <Rlambda> then(lambda: KtFunction<Rlambda>): Promise {
    val wasmRetVal = knjs__Promise_then(this.arena, this.index, wrapFunction<Rlambda>(lambda), ArenaManager.currentArena, ArenaManager.currentArena)
    return Promise(ArenaManager.currentArena, wasmRetVal)
  }

    companion object {
    }
}
val JsValue.asPromise: Promise
  get() {
    return Promise(this.arena, this.index)
  }

@SymbolName("knjs_get____Global_document")
external public fun knjs_get____Global_document(resultArena: Int): Int

@SymbolName("knjs____Global_fetch")
external public fun knjs____Global_fetch(urlPtr: Int, urlLen: Int, resultArena: Int): Int

@SymbolName("knjs____Global_setInterval")
external public fun knjs____Global_setInterval(lambdaIndex: Int, lambdaResultArena: Int, interval: Int, resultArena: Int): Unit

  val document: Document
    get() {
    val wasmRetVal = knjs_get____Global_document(ArenaManager.currentArena)
      return Document(ArenaManager.currentArena, wasmRetVal)
    }

  fun  fetch(url: String): Promise {
    val wasmRetVal = knjs____Global_fetch(stringPointer(url), stringLengthBytes(url), ArenaManager.currentArena)
    return Promise(ArenaManager.currentArena, wasmRetVal)
  }

  fun <Rlambda> setInterval(lambda: KtFunction<Rlambda>, interval: Int): Unit {
    knjs____Global_setInterval(wrapFunction<Rlambda>(lambda), ArenaManager.currentArena, interval, ArenaManager.currentArena)
    return 
  }

fun <R> setInterval(interval: Int, lambda: KtFunction<R>) = setInterval(lambda, interval)

