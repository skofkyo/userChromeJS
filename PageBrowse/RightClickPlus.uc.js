// ==UserScript==
// @name                 RightClickPlus.uc.js
// @description       鏈接點擊右鍵新分頁打開鏈接，在鏈接上 Ctrl + 右鍵打開選單，長按右鍵500毫秒後放開右鍵打開選單。
// @author               Drager-oos
// @modified           skofkyo
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2016.8.30
// ==/UserScript==
(function() {
    var x = true; // false: 前景 | true: 背景
    var RightClickPlusTime;
    var RightClickPlus = {
        OpenLink: function(event) {
            if (event.ctrlKey || event.shiftKey || event.altKey) return;
            if (event.button == 2) {
                var onlink = XULBrowserWindow.overLink;
                var href = event.target.href || event.target.parentNode.href || onlink;
                if (href && onlink !== "") {
                    if (/^javascript:/i.test(onlink.toString())) return;
                    event.preventDefault();
                    event.stopPropagation();
                    $("contentAreaContextMenu").hidePopup();
                    gBrowser.moveTabTo(gBrowser.loadOneTab(href, {
                        inBackground: x
                    }), gBrowser.mCurrentTab._tPos + 1);
                }
            }
        },
    }
    gBrowser.mPanelContainer.addEventListener('mousedown', function(event) {
        if (event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.button == 2) {
            gBrowser.mPanelContainer.addEventListener("click", RightClickPlus.OpenLink, false); //添加点击事件
            RightClickPlusTime = setTimeout(function(event) {
                    gBrowser.mPanelContainer.removeEventListener("click", RightClickPlus.OpenLink, false);
                }, 500) //長按右键xxx毫秒後 移除点击事件
        }
    }, false);
    gBrowser.mPanelContainer.addEventListener("mouseup", function(event) {
        if (event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.button == 2) clearTimeout(RightClickPlusTime); //在長按右鍵未達設定的延遲時間就放開右鍵則取消延遲
    }, false);
    function $(id) document.getElementById(id);
})();