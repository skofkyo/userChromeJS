// ==UserScript==
// @name          PopUpUrl_new.uc.js
// @description   鼠標移動到超鏈接上時顯示鏈接信息，解決了在拼接頁面中無效的問題
// @include       *
// ==/UserScript==

(function() {
        document.addEventListener('mouseover', function(e) {
                //以提示的方式显示当前链接的地址
                var target = e.target;

                if (!target.hasAttribute('settedTitle')) {
                        var href = target.getAttribute('href') ||
                                target.parentNode.getAttribute('href') ||
                                target.hasAttribute('src');
                        if(href.indexOf('javascript:')!=-1 && href.substring(0,1)=="#"){
                                target.setAttribute('settedTitle', true);
                                return;
                        }else{
                                if (href && href != '#') {
                                        var cTitle = target.title || target.parentNode.title || target.parentNode.parentNode.title;
                                        cTitle = (cTitle ? cTitle + '\n' : '');
                                        target.title = cTitle + href;
                                }
                                target.setAttribute('settedTitle', true);
                        }
                }
        }, false);
})();