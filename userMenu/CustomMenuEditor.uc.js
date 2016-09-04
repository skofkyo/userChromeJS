// ==UserScript==
// @name                 CustomMenuEditor.uc.js
// @description       編輯右鍵選單&使用CSS隱藏用不到的選單 (自用版)
// @author               skofkyo
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2016.8.27
// @include              chrome://browser/content/browser.xul
// @include              chrome://mozapps/content/extensions/extensions.xul
// @include              chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include              chrome://browser/content/history/history-panel.xul
// @include              chrome://browser/content/downloads/contentAreaDownloadsView.xul
// ==/UserScript==
(function() {

    var CustomMenuEditor = {

        Move: function() {
            /*$M("要移動的ID", "做為目標的ID");*/
            $M("context-viewbgimage", "context-copyimage-contents"); //檢視背景圖片插入到複製圖片的上方
            $M("context-viewimageinfo", "context-viewbgimage"); //檢視圖片資訊插入到檢視背景圖片的上方
            $M("context-saveimage", "context-viewimage"); //圖片另存新檔…插入到檢視圖片的上方

            /*復原,剪下,複製,貼上,刪除,全選插入到拼寫分割線的上方 (同目標可以這樣寫)*/
            ["context-undo", "context-cut", "context-copy", "context-paste", "context-delete", "context-selectall"].forEach(function(n) {
                $M(n, "spell-suggestions-separator");
            });
        },

        init: function() {
            this.Move();
            this.addstyle();
        },

        addstyle: function() {
            var css = ' \
                #context-navigation,/*menugroup*/\
                #context-sep-navigation,/*分割線*/\
                #spell-no-suggestions,/*(無拼字建議)*/\
                #spell-add-to-dictionary,/*新增到字典*/\
                #spell-undo-add-to-dictionary,/*還原「新增到字典」*/\
                #page-menu-separator,/*分頁分割線*/\
                #spell-suggestions-separator,/*字典分割線*/\
                #context-openlinkincurrent,/*開啟鏈結*/\
                #context-openlinkintab,/*用新分頁開啟鏈結*/\
                #menu_newUserContext,/*新增容器分頁*/\
                #context-openlinkinusercontext-menu,/*用新容器分頁開啟鏈結*/\
                #context-savelinktopocket,/*將鏈結儲存至 Pocket*/\
                #context-pocket,/*將頁面儲存至 Pocket*/\
                #context-openlink,/*用新視窗開啟鏈結*/\
                #context-openlinkprivate,/*用新隱私視窗開啟鏈結*/\
                #context-bookmarklink,/*此鏈結加入書籤*/\
                #context-copyemail,/*複製電子郵件地址*/\
                #context-media-play,/*播放*/\
                #context-media-pause,/*暫停*/\
                #context-media-mute,/*靜音*/\
                #context-media-unmute,/*取消靜音*/\
                #context-media-showcontrols,/*顯示控制按鈕*/\
                #context-media-hidecontrols,/*隱藏控制按鈕*/\
                #context-video-showstats,/*顯示統計資訊*/\
                #context-video-hidestats,/*隱藏統計資訊*/\
                #context-video-fullscreen,/*全螢幕*/\
                #context-leave-dom-fullscreen,/*離開全螢幕模式*/\
                #context-media-sep-commands,/*分割線*/\
                #context-viewvideo,/*播放視訊檔案*/\
                /*#context-copyvideourl,複製視訊檔案網址*/\
                /*#context-copyaudiourl,複製音訊檔案網址*/\
                #context-sendimage,/*郵寄圖片…*/\
                /*#context-setDesktopBackground,設為桌布…*/\
                /*#context-savevideo,另存視訊檔案…*/\
                /*#context-saveaudio,另存音訊檔案…*/\
                #context-video-saveimage,/*另存快照為…*/\
                #context-sendvideo,/*郵寄視訊…*/\
                #context-sendaudio,/*郵寄音訊…*/\
                #context-back,/*上一頁*/\
                #context-forward,/*下一頁*/\
                #context-stop,/*停止*/\
                #context-bookmarkpage,/*此頁加入書籤*/\
                #context-savepage,/*另存新檔…*/\
                #context-sep-viewbgimage,/*分割線*/\
                /*#context-undo,復原*/\
                /*#context-selectall,全選*/\
                #context-keywordfield,/*設為用關鍵字搜尋…*/\
                #context-searchselect,\
                #context-sep-viewsource,/*分割線*/\
                #spell-separator,#spell-check-enabled,/*拼字檢查*/\
                #spell-add-dictionaries-main,/*新增字典…*/\
                #spell-dictionaries,/*語言*/\
                #context-sep-bidi,#context-bidi-text-direction-toggle,/*改變文字方向*/\
                #context-bidi-page-direction-toggle,/*切換頁面方向*/\
                #context-sep-selectall,/*全選的分割線*/\
                #context-sep-undo,/*復原的分割線*/\
                #inspect-separator/*inspect分割線*/\
                { display: none !important; }\
                '.replace(/\s+/g, " ");
            var sspi = document.createProcessingInstruction(
                'xml-stylesheet',
                'type="text/css" href="data:text/css,' + encodeURIComponent(css) + '"'
            );
            document.insertBefore(sspi, document.documentElement);
        },

    };

    CustomMenuEditor.init();
    window.CustomMenuEditor = CustomMenuEditor;

    function $(id) {
        return document.getElementById(id);
    }

    function $M(a, b) {
        let id = $(a);
        let ins = $(b);
        if (!id && !ins) return;
        var move = ins.parentNode.insertBefore(id, ins); //.nextSibling
        return move;
    }

})();