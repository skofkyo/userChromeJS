// ==UserScript==
// @name                  EasyAppTabs.uc.js
// @namespace        EasyAppTabs.uc.js
// @description        分頁標籤雙擊或ctrl,shift,alt+單擊 釘選成應用程式分頁/還原成普通分頁
// @include               main
// @compatibility     Firefox 4.0+
// @author                skofkyo
// @homepage         
// @version              1.0.1 2012.11.05
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

gBrowser.mTabContainer.addEventListener('dblclick', function (event){
        var subTab = event.originalTarget;
        while(subTab.localName != "tab") {
             subTab = subTab.parentNode;
        }
        if(subTab.pinned && event.button == 0){
            gBrowser.unpinTab(subTab);
        } else {
            gBrowser.pinTab(subTab);
        }
    },false);

gBrowser.mTabContainer.addEventListener('click', function (event){
        var subTab = event.originalTarget;
        while(subTab.localName != "tab") {
            subTab = subTab.parentNode;
        }
        if(subTab.pinned && event.button == 0){
            if (event.ctrlKey || event.shiftKey || event.altKey) {
                gBrowser.unpinTab(subTab);
            }
        } else {
            if (event.ctrlKey || event.shiftKey || event.altKey) {
                gBrowser.pinTab(subTab);
            }
        }
  },false);
