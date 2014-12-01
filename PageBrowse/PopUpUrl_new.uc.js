// ==UserScript==
// @name          PopUpUrl_new.uc.js
// @description   鼠標移動到超鏈接上時顯示鏈接信息，解決了在拼接頁面中無效的問題
// @include       *
// ==/UserScript==

    (function() {
        document.addEventListener('mouseover', function(e) {
            //以提示的方式显示当前链接的地址
            var target = e.target;
            if (target.title.indexOf('://') == -1) {
                if (target.hasAttribute('href')) {
                    target.title = (target.title ? target.title + ' | ' : '') + target.href;
                } else if (target.parentNode.hasAttribute('href')) {
                    var cTitle = target.title || target.parentNode.parentNode.title;
                    target.title = (cTitle ? cTitle + ' | ' : '') + target.parentNode.href;
                } else if (target.hasAttribute('src')) {
                    target.title = (target.title ? e.target.title + ' | ' : '') + e.target.src;
                }
            }
        }, false);
    })();