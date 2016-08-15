// ==UserScript==
// @name         AutoReloadTab.uc.js
// @description  自動重新載入分頁
// @namespace    1018148046
// @author       顏太嚇
// @include      chrome://browser/content/browser.xul
// @version      0.1
// @charset      UTF-8
// ==/UserScript==
'use strict';
(function() {
    let time = 5; //刷新間隔,單位分鐘
    let m = document.getElementById('context_reloadTab');
    m.setAttribute('tooltiptext', '右鍵:自動重新載入此分頁');
    m.addEventListener('click', function(e) {
        if (e.button == 2) {
            if (document.getElementById('main-window').AutoReload != true) {
                let interval = setInterval(function() {
                    var tabs = document.querySelectorAll('.tabbrowser-tab[AutoReload="true"]');
                    if (tabs.length != 0) {
                        for (var i = 0; i < tabs.length; i++) {
                            gBrowser.reloadTab(tabs[i]);
                        }
                        document.getElementById('main-window').AutoReload = true;
                    } else {
                        clearInterval(interval)
                        document.getElementById('main-window').AutoReload = false;
                    }
                }, time * 1000 * 60);
            };
            var tab = document.querySelector('.tabbrowser-tab[selected="true"]');
            if (!tab.getAttribute('AutoReload')) {
                tab.setAttribute('AutoReload', 'true');
                tab.setAttribute('style', 'background-image: linear-gradient(to right, transparent 20%, rgb(0, 167, 224) 30%, rgb(0, 167, 224) 70%, transparent 80%)!important;background-size: auto 2px!important;background-repeat: no-repeat!important;');
            } else {
                tab.removeAttribute('AutoReload');
                tab.removeAttribute('style');
            }
        }
        e.preventDefault();
        e.stopPropagation();
    }, false);
})();