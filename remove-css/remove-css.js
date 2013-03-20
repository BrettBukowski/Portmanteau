!function (doc) {
  "use strict";

  function arrayize (arraylike) {
    return Array.prototype.slice.call(arraylike);
  }

  function $$ (selector) {
    return arrayize(doc.querySelectorAll(selector));
  }

  function each (array, callback, scope) {
    if (typeof Array.prototype.forEach === 'function') {
      return array.forEach(callback);
    }

    for (var i = 0, len = array.length; i < len; i++) {
      callback.call(scope || this, array[i], i, array);
    }
  }

  function kill (node) {
    return node.parentNode.removeChild(node);
  }

  each($$('style').concat($$('link[rel="stylesheet"]')), kill);

}(document);
