!function (doc, win) {
  "use strict";

  var max = 2147483648;

  function $$ (selector) {
    return arrayize(doc.querySelectorAll(selector));
  }

  function arrayize (arraylike) {
    return Array.prototype.slice.call(arraylike);
  }

  function each (array, callback, scope) {
    if (typeof Array.prototype.forEach === 'function') {
      return array.forEach(callback);
    }

    for (var i = 0, len = array.length; i < len; i++) {
      callback.call(scope || this, array[i], i, array);
    }
  }

  function setStyles (el, styles) {
    for (var i in styles) {
      if (styles.hasOwnProperty(i)) {
        el.style[i] = styles[i];
      }
    }
  }

  function relativize (el) {
    if (!el || !el.style) return;

    el.style.position = 'relative';
    if (win.getComputedStyle(el).getPropertyValue('z-index') !== 'auto') {
      el.style.zIndex = max;
    }

    return relativize(el.parentNode);
  }

  function createMask () {
    var mask = doc.createElement('div');

    setStyles(mask, {
      position: 'absolute',
      background: '#111',
      opacity: 0.95,
      zIndex: 100000,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    });

    return doc.body.appendChild(mask);
  }

  function createClose () {
    var close = doc.createElement('a');
    close.href = '#';
    close.innerHTML = 'close';

    setStyles(close, {
      textDecoration: 'none',
      color: '#FFF',
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 100001
    });

    return doc.body.appendChild(close);
  }

  function pumpUpVids (vids) {
    each(vids, function (el) {
      relativize(el);
      setStyles(el, { zIndex: max, position: 'absolute' });
    });
  }

  function closeUp (mask, close, vids) {
    mask.parentNode.removeChild(mask);
    close.parentNode.removeChild(close);

    each(vids, function (el) {
      el.style.position = 'static';
    });
  }

  var vids = arrayize($$('video'));
  if (vids.length) {
    pumpUpVids(vids);

    var mask = createMask(),
        close = createClose();

    close.addEventListener('click', function (e) {
      e.preventDefault();
      closeUp(mask, close, vids);
    });
  }

}(document, window);
