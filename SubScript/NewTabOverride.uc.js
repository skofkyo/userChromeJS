// ==UserScript==
// @name           NewTabOverride.uc.js
// @description    修改Firefox 41以上版本 新增分頁按鈕開啟的URL
// @author         aborix
// @include        main
// @license        MIT License
// @compatibility  Firefox 41+
// @charset        UTF-8
// @version        0.2
// @homepageURL    http://www.camp-firefox.de/forum/viewtopic.php?p=981876
// ==/UserScript==

(function() {
   if (location != 'chrome://browser/content/browser.xul')
      return;
   const url = "about:home"
   if (Number(gAppInfo.version.substring(0,2)) < 44)
      NewTabURL.override(url)
   else
      aboutNewTabService.newTabURL = url;
})();
