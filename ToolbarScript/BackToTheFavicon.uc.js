// ==UserScript==
// @name            BackToTheFavicon.uc.js
// @charset         UTF-8
// @description     還原網址列站點圖示
// @include         chrome://browser/content/browser.xul
// @author          aborix
// @compatibility    Firefox 45+
// @version            2016.8.18
// ==/UserScript==
(function() {
   gBrowser.tabContainer.addEventListener('TabAttrModified', function() {
      var icon = document.getElementById('identity-icon');
      var favicon = gBrowser.selectedTab.image;
      if (favicon)
         icon.src = favicon
      else
         icon.removeAttribute('src');
   }, false);
   if (Number(gAppInfo.version.split('.')[0]) >= 51) {
      var css = '#urlbar[pageproxystate="valid"] > #identity-box > #identity-icon {opacity: 1} #identity-icon {filter: none}';
      var stylesheet = document.createProcessingInstruction('xml-stylesheet','type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"');
      document.insertBefore(stylesheet, document.documentElement);
   };
})();