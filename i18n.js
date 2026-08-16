/* Locale packs are split for deploy size: load en/bg/es/de + core */
(function(){
  var s = ['/i18n-en.js','/i18n-bg.js','/i18n-es.js','/i18n-de.js','/i18n-core.js'];
  s.forEach(function(src){
    var el = document.createElement('script');
    el.src = src;
    el.defer = false;
    document.head.appendChild(el);
  });
})();
