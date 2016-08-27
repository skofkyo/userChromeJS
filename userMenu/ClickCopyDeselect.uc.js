// ==UserScript==
// @name           ClickCopyDeselect.uc.js
// @description    點擊右鍵複製選項後取消選曲文字.uc
// @author         skofkyo
// @include        main
// @license        MIT License
// @compatibility  Firefox 4+
// @charset        UTF-8
// @version        0.1
// @homepageURL    
// ==/UserScript==

document.querySelector("#context-copy").addEventListener('click', function(event) {
    setTimeout('content.document.getSelection().removeAllRanges();', 100);
}, false);