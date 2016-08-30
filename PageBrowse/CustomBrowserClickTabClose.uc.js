// ==UserScript==
// @name                 CustomBrowserClickTabClose.uc.js
// @description       中鍵點擊頁面空白處關閉當前分頁
// @author               skofkyo
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2016.8.30
// ==/UserScript==
(function() {
    var CustomBrowserClick = {
            TabClose: function(event) {
                var tar = event.target;
                var onlink = XULBrowserWindow.overLink;
                var node = document.commandDispatcher.focusedElement;
                var doc = tar.ownerDocument;
                if (event.button === 1) { //0左鍵1中鍵2右鍵
                    if (tar.href || tar.parentNode.href || /^https?/i.test(onlink.toString())) return; //排除鏈接
                    if (tar.nodeName.match(/img/i)) return; //排除圖片
                    if (tar.localName == 'input' || node && (node.type == "text" || node.type == "textarea")) return; //排除文本框
                    if (tar.localName == 'HTML' || tar.localName == 'span' || tar.localName == 'a' || tar.localName == 'b' || tar.localName == 'p') return; //排除節點名
                    if (doc.contentType != 'text/plain' && doc.contentType != 'text/html' && doc.contentType != 'application/xml' && doc.contentType != 'application/xhtml+xml') return; //排除類型
                    if (getBrowserSelection()) return; //排除有選取文字
                    event.preventDefault();
                    event.stopPropagation();
                    //document.getElementById("contentAreaContextMenu").hidePopup();//關閉右鍵選單 
                    this.isMouseDownL = false; //取消按下左鍵
                    this.isMouseDownM = false; //取消按下中鍵
                    this.isMouseDownR = false; //取消按下右鍵
                    gBrowser.removeCurrentTab(); //關閉分頁的代碼
                }
            }
        }
    //頁面點擊事件
    gBrowser.mPanelContainer.addEventListener("click" /*click為單擊 dblclick為雙擊*/ , CustomBrowserClick.TabClose, true);
    //取消按下中鍵自動滾屏
    gBrowser.mPanelContainer.addEventListener("mousedown", function(event) {
        if (event.button === 1) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
})();