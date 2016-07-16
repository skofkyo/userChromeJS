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

var tbt = document.getElementById("tabbrowser-tabs");
var newTabBtn = document.getAnonymousElementByAttribute(tbt, "class", "tabs-newtab-button");
newTabBtn.addEventListener("click", function(e) {
    if (e.button === 2) {
        e.preventDefault();
        e.stopPropagation();
        let url = 'https://www.google.com.tw/search?q=' + encodeURIComponent(readFromClipboard());
        openNewTabWith(url);
    }
});
                setTimeout(function(event) {
            var pb = document.getElementById("anobtn");
            pb.addEventListener("contextmenu", function(event) {
                document.getElementById("anobtn_popup").openPopup(this, "after_pointer", 0, true, false);
                event.preventDefault();
            }, false);
                }, 500);
