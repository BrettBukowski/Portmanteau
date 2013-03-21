// Very hit or miss, depending on how the site's styled...
!function(doc) {
  var css = 'html,body{color:#efefef;background:#212121;}h1,h2,h3,h4,h5,h6,h1 a{color:#eee;}a{color:#726EDA;}',
      style = doc.createElement('style');

  style.type = 'text/css';
  style.innerHTML = css;

  doc.getElementsByTagName('head')[0].appendChild(style);
}(document);
