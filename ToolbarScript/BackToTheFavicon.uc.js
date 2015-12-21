// ==UserScript==
// @name           BackToTheFavicon.uc.js
// @description    恢復網址列顯示Favicon
// @author         none
// @include        main
// @license        MIT License
// @compatibility  Firefox 41+
// @charset        UTF-8
// @version        0.1
// @include chrome://browser/content/browser.xul
// ==/UserScript==

(function() {
    if (location != "chrome://browser/content/browser.xul") return;
    gBrowser.tabContainer.addEventListener("TabAttrModified", function() {
        if (gBrowser.mCurrentTab.image === gProxyFavIcon.src) return;
        (!!gBrowser.mCurrentTab.image) ? gProxyFavIcon.src = gBrowser.mCurrentTab.image : gProxyFavIcon.removeAttribute("src");
}, false);
})();