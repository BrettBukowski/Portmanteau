!function (doc) {
  "use strict";

  var overlayStyle = {
    background: 'rgba(150, 150, 150, .9)',
    boxShadow: '0 0 3px rgba(0, 0, 0, .4)',
    color: '#222',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    lineHeight: '1em',
    padding: '6px',
    position: 'absolute',
    textDecoration: 'none',
    textShadow: '0 1px rgba(255, 255, 255, .4)',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100000
  };

  var overlay = buildOverlay();
  displayAudio();

  function audioElements () {
    var audio = doc.querySelectorAll('audio');
    return Array.prototype.slice.call(audio);
  }

  function stylize (el, styles) {
    for (var i in styles) {
      if (styles.hasOwnProperty(i)) {
        el.style[i] = styles[i];
      }
    }
  }

  function buildOverlay () {
    var div = doc.createElement('div');
    div.innerHTML = '<div></div>';

    stylize(div, overlayStyle);

    attachCloseLink(div);
    attachRefreshLink(div);

    return doc.body.appendChild(div);
  }

  function close () {
    if (overlay) {
      overlay.parentNode.removeChild(overlay);
      overlay = null;
    }
  }

  function attachCloseLink (parent) {
    var link = doc.createElement('a');
    link.href = '#';
    link.innerHTML = 'close';
    stylize(link, {
      top: '2px',
      right: '2px',
      position: 'absolute',
      textDecoration: 'none',
      color: '#FFF'
    });

    parent.appendChild(link);

    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.target.parentNode.removeChild(e.target);
      close();
    });
  }

  function attachRefreshLink (parent) {
    var link = doc.createElement('a');
    link.href = '#';
    link.innerHTML = 'refresh';
    stylize(link, {
      top: '2px',
      right: '60px',
      position: 'absolute',
      textDecoration: 'none',
      color: '#FFF'
    });

    parent.appendChild(link);

    link.addEventListener('click', function (e) {
      e.preventDefault();
      displayAudio();
    });
  }

  function displayAudio () {
    showAudioInOverlay(audioElements(), overlay);
  }

  function showAudioInOverlay (audioList, panel) {
    if (!audioList.length) return;

    var audio = audioList.map(function (aud) {
      return "<div>" + aud.src + " " + ((!aud.paused) ? '(playing)' : '') + "</div>";
    });

    panel.querySelector('div').innerHTML = audio;
  }

}(document);
