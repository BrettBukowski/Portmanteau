//
// Youtube's [HTML5 videos](http://youtube.com/html5) allow you
// to set playback speed to 0.25x, 0.5x, 1x, 1.5x, and 2x.
// But that's not fine-grained enough.
// Let's add a slider allowing us to go from 0.1x - 4.0x.
// And have it work with HTML5 videos on Youtube and Vimeo.
//
// Because you haven't lived until you've seen
// <http://youtu.be/5p0QtJMKt1s> in 0.3x and 3.3x.
//
// Inspired by
// [Leif Wickland's](http://leifw.wickland.net/2013/03/truly-variable-rate-video-playback-in.html)
// bookmarklet.
//
// Tested on YouTube's, Vimeo's and TED's HTML5 video players
//
// ＼(＾O＾)／＼(＾O＾)／＼(＾O＾)／
//

!function(doc) {
  "use strict";

  var vid = doc.querySelector('video'),
      range = doc.createElement('input'),
      label = doc.createElement('label'),
      div = doc.createElement('div'),
      parent;

  function setStyles (node, styles) {
    for (var prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        node.style[prop] = styles[prop];
      }
    }
  }

  label.innerHTML = '<span class="asdf">1x</span>';
  setStyles(label, {
    color: '#EEE',
    fontSize: '11px'
  });

  range.type = 'range';
  range.max = 4;
  range.min = 0.1;
  range.value = 1;
  range.step = 0.1;
  setStyles(range, {
    verticalAlign: 'middle',
    webkitAppearance: 'slider-horizontal',
    mozAppearance: 'slider-horizontal'
  });

  label.appendChild(range);

  setStyles(div, {
    marginTop: '3px',
    position: 'absolute',
    zIndex: 1000
  });

  div.appendChild(label);

  if (parent = doc.querySelector('.html5-player-chrome')) {
    parent.appendChild(div);
    setStyles(div, { left: '35%' });
  }
  else {
    vid.parentNode.insertBefore(div, vid);
  }

  range.addEventListener('change', function(e) {
    var newVal = e.target.value;
    vid.playbackRate = newVal;
    label.querySelector('.asdf').innerHTML = newVal + 'x';
  });
}(document);
