!function (doc) {
  "use strict";

  function setStyles (el, styles) {
    for (var i in styles) {
      if (styles.hasOwnProperty(i)) {
        el.style[i] = styles[i];
      }
    }
  }

  function mix (receiver, sender) {
    for (var i in sender) {
      receiver[i] = sender[i];
    }

    return receiver;
  }

  function bind (context, func) {
    var slice = Array.prototype.slice,
        args = slice.call(arguments, 2);

    if (typeof Function.prototype.bind === 'function') {
      return Function.prototype.bind.apply(func, [context].concat(args));
    }
    return function () {
      func.apply(context, slice.call(arguments).concat(args));
    };
  }

  var commonStyles = {
    background: 'rgba(150, 150, 150, .9)',
    borderRadius: '3px',
    boxShadow: '0 0 3px rgba(0, 0, 0, .4)',
    color: '#222',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    lineHeight: '1em',
    padding: '6px',
    position: 'absolute',
    textDecoration: 'none',
    textShadow: '0 1px rgba(255, 255, 255, .4)'
  };

  function Ingress (infoCard) {
    this.infoCard = infoCard;

    this.enter();
  };
  Ingress.prototype = {
    enter: function() {
        this.callback = bind(this, this.mouseOver);
        doc.body.addEventListener('mouseover', this.callback);

        var ex = doc.createElement('a');
        ex.href = '#';
        ex.innerHTML = 'close';
        setStyles(ex, mix({
          top: '10px',
          right: '10px',
        }, commonStyles));
        ex.addEventListener('click', bind(this, function(e) {
          e.preventDefault();

          this.exit();
        }));
        this.exitButton = doc.body.appendChild(ex);
    },
    exit: function(e) {
        this.exitButton.parentNode.removeChild(this.exitButton);
        this.infoCard.destroy();
        doc.body.removeEventListener('mouseover', this.callback);
    },
    mouseOver: function (e) {
      var x = e.clientX,
          y = e.clientY;

      this.infoCard.moveTo(x + 20, y + 20);
      var font = this.getFontAtPoint(x, y);
      this.infoCard.setContent(font);
    },
    getFontAtPoint: function (x, y) {
      var el = doc.elementFromPoint(x, y),
          font = window.getComputedStyle(el).getPropertyValue('font-family');

      if (el.tagName === 'IMG') {
        font += ' (image) ';
      }

      return font;
    }
  };

  function Card () {
    this.card = this._create();
  }
  Card.prototype = {
    _create: function() {
      var card = doc.createElement('div');
      setStyles(card, mix({
        display: 'none',
      }, commonStyles));

      return doc.body.appendChild(card);
    },

    moveTo: function(x, y) {
      setStyles(this.card, {display: 'block', left: x + 'px', top: y + 'px' });
    },

    setContent: function(content) {
      this.card.innerHTML = content;
    },

    destroy: function() {
      this.card.parentNode.removeChild(this.card);
      this.card = null;
    }
  };
  new Ingress(new Card);
}(document);
