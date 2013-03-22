!function (doc) {
  "use strict";

  var horizontal, vertical, coordinates;

  doc.body.addEventListener('mousemove', onMouseOver);
  createCloseBox();

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

  function onMouseOver (e) {
    var x = e.clientX,
        y = e.clientY + doc.body.scrollTop;

    updateHorizontal(y);
    updateVertical(x);
    updateCoordinates(x, y);
  }

  function updateHorizontal (y) {
    horizontal || (horizontal = createLine({
      height: '1px',
      left:    0,
      right:   0,
      borderTop: '1px solid #FFF',
      borderBottom: '1px solid #FFF'
    }));
    setStyles(horizontal, { top: y + 'px' });
  }

  function updateVertical (x) {
    vertical || (vertical = createLine({
      width: '1px',
      top:    '0px',
      borderWidth: '0 1px',
      borderLeft: '1px solid #FFF',
      borderRight: '1px solid #FFF'
    }));
    setStyles(vertical, {
      left: x + 'px',
      height: doc.body.offsetHeight + 'px'
    });
  }

  function updateCoordinates (x, y) {
    coordinates || (coordinates = createCoordinateCard());
    setStyles(coordinates, {
      left: x + 20 + 'px',
      top: y + 20 + 'px'
    });

    coordinates.innerHTML = '(' + x + ', ' + y + ')';

    if (x + 20 + coordinates.clientWidth > doc.body.clientWidth) {
      coordinates.style.left = x - 40 + 'px';
    }
    if (y + 20 + coordinates.clientHeight > doc.body.clientHeight) {
      coordinates.style.top = y - 40 + 'px';
    }
  }

  function createLine (styles) {
    var line = doc.createElement('div');

    setStyles(line, mix(styles, {
      background: '#000',
      margin:     0,
      padding:    0,
      position:   'absolute',
      zIndex:     99
    }));

    return doc.body.appendChild(line);
  }

  function createCoordinateCard () {
    var card = doc.createElement('div');
    setStyles(card, {
      background:     'rgba(0, 0, 0, .5)',
      borderRadius:   '3px',
      boxShadow:      '0 0 3px rgba(0, 0, 0, .3)',
      color:          '#eee',
      fontFamily:     'Helvetica, Arial, sans-serif',
      lineHeight:     '1em',
      margin:         0,
      padding:        '4px',
      position:       'absolute',
      textShadow:     '0 1px 0 rgba(255, 255, 255, .5)',
      zIndex:         100
    });

    return doc.body.appendChild(card);
  }

  function createCloseBox () {
    var link = doc.createElement('a');
    link.href = '#';
    link.innerHTML = 'close';

    setStyles(link, {
      background:     'rgba(0, 0, 0, .4)',
      borderRadius:   '3px',
      boxShadow:      '0 0 3px rgba(0, 0, 0, .3)',
      color:          '#eee',
      fontFamily:     'Helvetica, Arial, sans-serif',
      lineHeight:     '1em',
      padding:        '4px',
      position:       'fixed',
      right:          '10px',
      textDecoration: 'none',
      textShadow:     '0 1px 0 rgba(255, 255, 255, .5)',
      top:            '10px',
      zIndex:         101
    });

    link.addEventListener('click', function (e) {
      e.preventDefault();
      link.parentNode.removeChild(link);
      close();
    });

    doc.body.appendChild(link);
  }

  function close () {
    vertical.parentNode.removeChild(vertical);
    horizontal.parentNode.removeChild(horizontal);
    coordinates.parentNode.removeChild(coordinates);

    vertical = horizontal = coordinates = null;

    doc.body.removeEventListener('mousemove', onMouseOver);
  }
}(document);
