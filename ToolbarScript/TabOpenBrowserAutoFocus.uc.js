// ==UserScript==
// @name                 TabOpenBrowserAutoFocus.uc.js
// @description       打開新分頁自動聚焦瀏覽頁面
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2016.7.16            
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==
gBrowser.tabContainer.addEventListener('TabSelect' /*監聽TabOpen或TabSelect*/ , function() {
    if (/^(about|http|file|chrome)/.test(gBrowser.selectedBrowser.currentURI.spec)) {
        setTimeout(function() {
            gBrowser.selectedBrowser.focus();
        }, 0);
    }
}, false);