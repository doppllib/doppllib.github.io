konan.libraries.push ({

  knjs_get__Context_lineWidth: function(arena, obj) {
    var result = kotlinObject(arena, obj).lineWidth;
    return result;
  },

  knjs_set__Context_lineWidth: function(arena, obj, value) {
    kotlinObject(arena, obj).lineWidth = value;
  },

  knjs_get__Context_fillStyle: function(arena, obj, resultArena) {
    var result = kotlinObject(arena, obj).fillStyle;
    return toArena(resultArena, result);
  },

  knjs_set__Context_fillStyle: function(arena, obj, valuePtr, valueLen) {
    var value = toUTF16String(valuePtr, valueLen);
    kotlinObject(arena, obj).fillStyle = value;
  },

  knjs_get__Context_strokeStyle: function(arena, obj, resultArena) {
    var result = kotlinObject(arena, obj).strokeStyle;
    return toArena(resultArena, result);
  },

  knjs_set__Context_strokeStyle: function(arena, obj, valuePtr, valueLen) {
    var value = toUTF16String(valuePtr, valueLen);
    kotlinObject(arena, obj).strokeStyle = value;
  },

  knjs__Context_lineTo: function(arena, obj, x, y) {
    var result = kotlinObject(arena, obj).lineTo(x, y);
    return ;
  },

  knjs__Context_moveTo: function(arena, obj, x, y) {
    var result = kotlinObject(arena, obj).moveTo(x, y);
    return ;
  },

  knjs__Context_beginPath: function(arena, obj) {
    var result = kotlinObject(arena, obj).beginPath();
    return ;
  },

  knjs__Context_stroke: function(arena, obj) {
    var result = kotlinObject(arena, obj).stroke();
    return ;
  },

  knjs__Context_fillRect: function(arena, obj, x, y, width, height) {
    var result = kotlinObject(arena, obj).fillRect(x, y, width, height);
    return ;
  },

  knjs__Context_fillText: function(arena, obj, testPtr, testLen, x, y, maxWidth) {
    var test = toUTF16String(testPtr, testLen);
    var result = kotlinObject(arena, obj).fillText(test, x, y, maxWidth);
    return ;
  },

  knjs__Context_fill: function(arena, obj) {
    var result = kotlinObject(arena, obj).fill();
    return ;
  },

  knjs__Context_closePath: function(arena, obj) {
    var result = kotlinObject(arena, obj).closePath();
    return ;
  },

  knjs_get__DOMRect_left: function(arena, obj) {
    var result = kotlinObject(arena, obj).left;
    return result;
  },

  knjs_set__DOMRect_left: function(arena, obj, value) {
    kotlinObject(arena, obj).left = value;
  },

  knjs_get__DOMRect_right: function(arena, obj) {
    var result = kotlinObject(arena, obj).right;
    return result;
  },

  knjs_set__DOMRect_right: function(arena, obj, value) {
    kotlinObject(arena, obj).right = value;
  },

  knjs_get__DOMRect_top: function(arena, obj) {
    var result = kotlinObject(arena, obj).top;
    return result;
  },

  knjs_set__DOMRect_top: function(arena, obj, value) {
    kotlinObject(arena, obj).top = value;
  },

  knjs_get__DOMRect_bottom: function(arena, obj) {
    var result = kotlinObject(arena, obj).bottom;
    return result;
  },

  knjs_set__DOMRect_bottom: function(arena, obj, value) {
    kotlinObject(arena, obj).bottom = value;
  },

  knjs__Canvas_getContext: function(arena, obj, contextPtr, contextLen, resultArena) {
    var context = toUTF16String(contextPtr, contextLen);
    var result = kotlinObject(arena, obj).getContext(context);
    return toArena(resultArena, result);
  },

  knjs__Canvas_getBoundingClientRect: function(arena, obj, resultArena) {
    var result = kotlinObject(arena, obj).getBoundingClientRect();
    return toArena(resultArena, result);
  },

  knjs__Document_getElementById: function(arena, obj, idPtr, idLen, resultArena) {
    var id = toUTF16String(idPtr, idLen);
    var result = kotlinObject(arena, obj).getElementById(id);
    return toArena(resultArena, result);
  },

  knjs_get__MouseEvent_clientX: function(arena, obj) {
    var result = kotlinObject(arena, obj).clientX;
    return result;
  },

  knjs_get__MouseEvent_clientY: function(arena, obj) {
    var result = kotlinObject(arena, obj).clientY;
    return result;
  },

  knjs__Response_json: function(arena, obj, resultArena) {
    var result = kotlinObject(arena, obj).json();
    return toArena(resultArena, result);
  },

  knjs__Promise_then: function(arena, obj, lambdaIndex, lambdaResultArena, resultArena) {
    var lambda = konan_dependencies.env.Konan_js_wrapLambda(lambdaResultArena, lambdaIndex);
    var result = kotlinObject(arena, obj).then(lambda);
    return toArena(resultArena, result);
  },

  knjs_get____Global_document: function(resultArena) {
    var result = document;
    return toArena(resultArena, result);
  },

  knjs____Global_fetch: function(urlPtr, urlLen, resultArena) {
    var url = toUTF16String(urlPtr, urlLen);
    var result = fetch(url);
    return toArena(resultArena, result);
  },

  knjs____Global_setInterval: function(lambdaIndex, lambdaResultArena, interval) {
    var lambda = konan_dependencies.env.Konan_js_wrapLambda(lambdaResultArena, lambdaIndex);
    var result = setInterval(lambda, interval);
    return ;
  }
})

