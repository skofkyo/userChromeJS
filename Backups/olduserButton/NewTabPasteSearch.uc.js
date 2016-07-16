// ==UserScript==
// @name           NewTabPasteSearch.uc.js
// @description    新增分頁按鈕右鍵點擊直接搜索剪貼簿裡的文字
// @author         skofkyo
// @include        main
// @license        MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @version        0.1
// @homepageURL    no
// ==/UserScript==

location=="chrome://browser/content/browser.xul" && window.addEventListener("click", function(e) {
    if (e.button === 2 && e.originalTarget.className === "tabs-newtab-button") {
        let url = 'https://www.google.com.tw/search?q='+ encodeURIComponent(readFromClipboard());
        openNewTabWith(url);
        e.preventDefault();
        e.stopPropagation();
    }
});