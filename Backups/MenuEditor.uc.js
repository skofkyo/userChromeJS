// ==UserScript==
// @name                  Menu Editor.uc.js
// @description        編輯頁面右鍵選單 (自用版)
// @include               main
// @charset               UTF-8
// @compatibility     Firefox 4.0+
// @author                skofkyo
// @version              20151225
// @include              chrome://browser/content/browser.xul
// @include              chrome://browser/content/web-panels.xul
// ==/UserScript==
(function() {
	/*
	var css =('\
	');
	var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
	var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
	sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
	*/
	(function(css) {
		var css = ('\
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
		/*用新容器分頁開啟鏈結*/\
		#context-openlinkinusercontext-menu,\
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
        ');
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	})();


	///////////////////////////////////////////定義元素的名稱//////////////////////////////////////////////////

	//鏈結另存新檔…
	var contextsavelink = document.querySelector("#context-savelink");
	//複製鏈結網址
	var contextcopylink = document.querySelector("#context-copylink");
	//重新載入圖片
	var contextreloadimage = document.querySelector("#context-reloadimage");
	//檢視圖片
	var contextviewimage = document.querySelector("#context-viewimage");
	//複製圖片
	var contextcopyimagecontents = document.querySelector("#context-copyimage-contents");
	//複製圖片網址
	var contextcopyimage = document.querySelector("#context-copyimage");
	//圖片另存新檔…
	var contextsaveimage = document.querySelector("#context-saveimage");
	//檢視圖片資訊
	var contextviewimageinfo = document.querySelector("#context-viewimageinfo");
	//重新載入
	var contextreload = document.querySelector("#context-reload");
	//檢視背景圖片
	var contextviewbgimage = document.querySelector("#context-viewbgimage");
	//剪下
	var contextcut = document.querySelector("#context-cut");
	//複製
	var contextcopy = document.querySelector("#context-copy");
	//貼上
	var contextpaste = document.querySelector("#context-paste");
	//刪除
	var contextdelete = document.querySelector("#context-delete");
	//DownThemAll!
	var dtaCtxCompact = document.querySelector("#dtaCtxCompact");
	//本頁框
	var frame = document.querySelector("#frame");
	//檢視選取範圍原始碼
	var contextviewpartialsourceselection = document.querySelector("#context-viewpartialsource-selection");
	//檢視 MathML 原始碼
	var contextviewpartialsourcemathml = document.querySelector("#context-viewpartialsource-mathml");
	//檢視原始碼
	var contextviewsource = document.querySelector("#context-viewsource");
	//檢視頁面資訊
	var contextviewinfo = document.querySelector("#context-viewinfo");
	//語言及字元編碼
	var charsetMenu = document.querySelector("#charsetMenu");

	//拼寫的分割線
	var spellsuggestionsseparator = document.querySelector("#spell-suggestions-separator");
	//全選的分割線
	var contextsepselectall = document.querySelector("#context-sep-selectall");

	//右鍵選單
	var contextMenu = document.querySelector("#contentAreaContextMenu");
	var appmenuPrimaryPane = document.querySelector("#appmenuPrimaryPane");


	var appmenufebe = document.querySelector("#appmenu_febe");
	var syncsetupappmenu = document.querySelector("#sync-setup-appmenu");
	var appmenuquit = document.querySelector("#appmenu-quit");

	///////////////////////////////////////////移動元素到定義的位置//////////////////////////////////////////////////

	//語言及字元編碼插入到全選分割線的上方
	//contextMenu.insertBefore(charsetMenu,contextsepselectall);
	//檢視背景圖片插入到複製圖片的上方
	contextMenu.insertBefore(contextviewbgimage, contextcopyimagecontents);
	//檢視圖片資訊插入到檢視背景圖片的上方
	contextMenu.insertBefore(contextviewimageinfo, contextviewbgimage);
	//圖片另存新檔…插入到檢視圖片的上方
	contextMenu.insertBefore(contextsaveimage, contextviewimage);
	//剪下插入到拼寫分割線的上方
	contextMenu.insertBefore(contextcut, spellsuggestionsseparator);
	//複製插入到拼寫分割線的上方
	contextMenu.insertBefore(contextcopy, spellsuggestionsseparator);
	//貼上插入到拼寫分割線的上方
	contextMenu.insertBefore(contextpaste, spellsuggestionsseparator);
	//刪除插入到拼寫分割線的上方
	contextMenu.insertBefore(contextdelete, spellsuggestionsseparator);
	//DownThemAll!插入到拼寫分割線的上方
	//contextMenu.insertBefore(dtaCtxCompact,spellsuggestionsseparator);

	//下方寫法
	//contextMenu.insertAfter(xThunderxian,contextcopylink);
	//contextMenu.insertBefore(xThunderxian,contextcopylink.nextSibling);

})();