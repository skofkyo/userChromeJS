// ==UserScript==
// @name                 CustomMenuEditor.uc.js
// @description       編輯頁面右鍵選單 (自用版)
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2016.8.19        
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==
(function() {

    window.CustomMenuEditor = {
    
        init: function() {
            this.MoveContextMenuitem();
            this.addstyle();
        },
        
        MoveContextMenuitem: function() {
            var contextMenu = $("contentAreaContextMenu");//右鍵選單
            var contextcopyimagecontents = $("context-copyimage-contents");//複製圖片
            var contextviewbgimage = $("context-viewbgimage");//檢視背景圖片
            var contextviewimageinfo = $("context-viewimageinfo");//檢視圖片資訊
            var contextsaveimage = $("context-saveimage");//圖片另存新檔…
            var contextviewimage = $("context-viewimage");//檢視圖片
            var spellsuggestionsseparator = $("spell-suggestions-separator");//拼寫的分割線
            var contextcut = $("context-cut");//剪下
            var contextcopy = $("context-copy");//複製
            var contextpaste = $("context-paste");//貼上
            var contextdelete = $("context-delete");//刪除
            contextMenu.insertBefore(contextviewbgimage, contextcopyimagecontents);//檢視背景圖片插入到複製圖片的上方
            contextMenu.insertBefore(contextviewimageinfo, contextviewbgimage);//檢視圖片資訊插入到檢視背景圖片的上方
            contextMenu.insertBefore(contextsaveimage, contextviewimage);//圖片另存新檔…插入到檢視圖片的上方
            contextMenu.insertBefore(contextcut, spellsuggestionsseparator);//剪下插入到拼寫分割線的上方
            contextMenu.insertBefore(contextcopy, spellsuggestionsseparator);//複製插入到拼寫分割線的上方
            contextMenu.insertBefore(contextpaste, spellsuggestionsseparator);//貼上插入到拼寫分割線的上方
            contextMenu.insertBefore(contextdelete, spellsuggestionsseparator);//刪除插入到拼寫分割線的上方
            //下方寫法
            //contextMenu.insertBefore(xThunderxian,contextcopylink.nextSibling);
        },
        
        addstyle: function() {
            var style = ' \
                /* 右键菜单 */ \
                /*(無拼字建議)*/\
                #spell-no-suggestions,\
                /*新增到字典*/\
                #spell-add-to-dictionary,\
                /*還原「新增到字典」*/\
                #spell-undo-add-to-dictionary,\
                /*分頁分割線*/\
                #page-menu-separator,\
                /*字典分割線*/\
                #spell-suggestions-separator,\
                /*DownThemAll!分割線*/\
                #dtaCtxSepFront-direct,\
                /*開啟鏈結*/\
                #context-openlinkincurrent,\
                /*用新分頁開啟鏈結*/\
                #context-openlinkintab,\
                /*新增容器分頁*/\
                #menu_newUserContext,\
                /*用新容器分頁開啟鏈結*/\
                #context-openlinkinusercontext-menu,\
                /*將鏈結儲存至 Pocket*/\
                #context-savelinktopocket,\
                /*將頁面儲存至 Pocket*/\
                #context-pocket,\
                /*用新視窗開啟鏈結*/\
                #context-openlink,\
                /*用新隱私視窗開啟鏈結*/\
                #context-openlinkprivate,\
                /*此鏈結加入書籤*/\
                #context-bookmarklink,\
                /*複製電子郵件地址*/\
                #context-copyemail,\
                /*播放*/\
                #context-media-play,\
                /*暫停*/\
                #context-media-pause,\
                /*靜音*/\
                #context-media-mute,\
                /*取消靜音*/\
                #context-media-unmute,\
                /*顯示控制按鈕*/\
                #context-media-showcontrols,\
                /*隱藏控制按鈕*/\
                #context-media-hidecontrols,\
                /*顯示統計資訊*/\
                #context-video-showstats,\
                /*隱藏統計資訊*/\
                #context-video-hidestats,\
                /*全螢幕*/\
                #context-video-fullscreen,\
                /*離開全螢幕模式*/\
                #context-leave-dom-fullscreen,\
                /*分割線*/\
                #context-media-sep-commands,\
                /*播放視訊檔案*/\
                #context-viewvideo,\
                /*複製視訊檔案網址*/\
                /*#context-copyvideourl,*/\
                /*複製音訊檔案網址*/\
                /*#context-copyaudiourl,*/\
                /*郵寄圖片…*/\
                #context-sendimage,\
                /*設為桌布…*/\
                /*#context-setDesktopBackground,*/\
                /*另存視訊檔案…*/\
                /*#context-savevideo,*/\
                /*另存音訊檔案…*/\
                /*#context-saveaudio,*/\
                /*另存快照為…*/\
                #context-video-saveimage,\
                /*郵寄視訊…*/\
                #context-sendvideo,\
                /*郵寄音訊…*/\
                #context-sendaudio,\
                /*上一頁*/\
                #context-back,\
                /*下一頁*/\
                #context-forward,\
                /*停止*/\
                #context-stop,\
                /*此頁加入書籤*/\
                #context-bookmarkpage,\
                /*另存新檔…*/\
                #context-savepage,\
                /*分割線*/\
                #context-sep-viewbgimage,\
                /*復原*/\
                #context-undo,\
                /*全選*/\
                #context-selectall,\
                /*Secure Login*/\
                #secureLoginContextMenuSeparator1,\
                #secureLoginContextMenuMenu,\
                #secureLoginContextMenuItem,\
                #secureLoginContextMenuSeparator2,\
                /*設為用關鍵字搜尋…*/\
                #context-keywordfield,\
                #context-searchselect,\
                /*分割線*/\
                #context-sep-viewsource,\
                /*拼字檢查*/\
                #spell-separator,#spell-check-enabled,\
                /*新增字典…*/\
                #spell-add-dictionaries-main,\
                /*語言*/\
                #spell-dictionaries,\
                /*改變文字方向*/\
                #context-sep-bidi,#context-bidi-text-direction-toggle,\
                /*切換頁面方向*/\
                #context-bidi-page-direction-toggle,\
                #foxyproxy-contextmenu-icon,\
                /*全選的分割線*/\
                #context-sep-selectall,\
                /*復原的分割線*/\
                #context-sep-undo,\
                /*Backup Utilities...*/\
                #softwarebychuck,\
                /*inspect分割線*/\
                #inspect-separator,\
                #context-navigation,\
                menuitem[label="Adblock Plus：阻擋圖片…"],\
                menuitem[label="Adblock Edge：阻擋圖片…"]\
                { display: none; !important; }\
                '.replace(/\s+/g, " ");
            var sspi = document.createProcessingInstruction(
                'xml-stylesheet',
                'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
            );
            document.insertBefore(sspi, document.documentElement);
        },
        
    };

    window.CustomMenuEditor.init();

    function $(id) {
        return document.getElementById(id);
    }
    
})();