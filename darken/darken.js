// Very hit or miss, depending on how the site's styled...
!function(doc) {
  var selectors = 'html, body, #content, [role="main"], #toc, .toc, .thumbinner',
      style = '{color:#efefef !important;background:#212121 !important;}h1,h2,h3,h4,h5,h6,h1 a{color:#eee;}a{color:#9591FA;}img.mwe-math-fallback-png-inline{color:#EFEFEF;}',
      css = selectors + style,
      styleEl = doc.createElement('style');

  styleEl.type = 'text/css';
  styleEl.innerHTML = css;

  doc.getElementsByTagName('head')[0].appendChild(styleEl);
}(document);
