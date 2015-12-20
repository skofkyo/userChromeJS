// ==UserScript==
// @name           FunctionsPlus.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/SubScript/FunctionsPlus.uc.js
// ==/UserScript==

(function() {
	$("urlbar").appendChild($("PanelUI-button", {
		tooltiptext: "左鍵：開啟選單\n中鍵：新建窗口並重載腳本\n右鍵：窗口占用屏幕右下半部分\n向上滾動：隱藏Firefox\n向下滾動：清除startupCache並重新啟動瀏覽器",
		onclick: "\
		if (event.button == 1) {userChromejs.rebuild();}\
		else if (event.button == 2) {\
			resizeTo(screen.availWidth / 2, screen.availHeight / 2, moveTo(screen.availWidth / 2, screen.availHeight / 2));\
			event.preventDefault();\
		}\
		",
		onDOMMouseScroll: "\
		if (event.detail > 0) {Services.appinfo.invalidateCachesOnRestart() || Application.restart();}\
		else {HideFirefox();}\
		return;\
		",
		onmouseover: "UCL.rebuild(); USL.rebuild(); ucjsMouseGestures.reload(true); addMenu.rebuild(true); uAutoPagerize.loadSetting(true); uAutoPagerize.loadSetting_CN(); KeyChanger.makeKeyset(true); Redirector.reload(); refererChanger.reload(true); ASP.rebuild(true);",
		style: "margin: 0px -4px 0px -2px;"
	}));

	$("urlbar-icons").appendChild($("downloads-button" , {
		tooltiptext: "顯示下載進度\n\n左鍵：開啟選單\n中鍵：管理員\n右鍵：DownThemAll!...\n向上滾動：打開下載\n向下滾動：dTa 單鍵下載選擇器",
		onmouseover: "DownloadsIndicatorView.onCommand(event);",
		onclick: "if (event.button == 1) {MGs.dTaBtn('dta-manager-button');} else if (event.button) {MGs.dTaBtn('dta-button'); event.preventDefault();}",
		onDOMMouseScroll: "\
		if (event.detail > 0) {MGs.dTaBtn('dta-turboselect-button');}\
		else {gBrowser.selectedTab = gBrowser.addTab('about:downloads');}\
		document.getElementById('downloadsPanel').hidePopup();\
		return;\
		",
		style: "padding: 0px; margin-left: -1px;",
	}));

//	document.querySelector("#nav-bar").removeAttribute("overflowable");

	setTimeout(function() {
//		$('AnotherBrowser').click();
		$('UserMenu-popup').openPopup($('UserMenu-button'), null, 0, 20, false, null, null);
		addMenu.rebuild(true);
	}, 2000);

	function DelayButtonsStart() {
//		$("urlbar-icons").appendChild($("clipple-statusbar-icon"));

		$("alltabs-button", {tooltiptext: "左鍵：所有分頁選單",});
		$("alltabs-popup", {onclick: 'event.preventDefault(); event.stopPropagation();'});
		$("alltabs-popup").addEventListener("mouseover", function (event) {event.originalTarget.setAttribute('closemenu', 'none')}, true);

		$("editBookmarkPanel", {position: "after_start"});

		$("UserMenu-button", {onmouseover: "document.getElementById('downloadsPanel').hidePopup();",});

		$("urlbar-reload-button", {
			tooltiptext: "左鍵：重新載入此分頁\n滾動：重新載入所有分頁\n\n在復原分頁選單：\n右鍵：清除復原分頁列表",
			onDOMMouseScroll: "gBrowser.reloadAllTabs();",
		});

		$("urlbar-stop-button", {
			tooltiptext: "左鍵：停止載入此分頁\n滾動：停止載入所有分頁",
			onDOMMouseScroll: "Array.map(gBrowser.browsers, function(browser) {browser.stop()});",
		});

		/* 在特定按鈕上自動彈出選單 */
		var uCTPhideDelay;
		$("urlbar-reload-button").addEventListener('mouseover', function(event) {
			$('undoCloseTabPopup').openPopupAtScreen(event.screenX, event.screenY, true);
			if (uCTPhideDelay) {
				clearTimeout(uCTPhideDelay);
				uCTPhideDelay = null;
			}
		}, false);
		$('urlbar-reload-button').addEventListener('mouseout', function() {
			uCTPhideDelay = setTimeout(function() {$('undoCloseTabPopup').hidePopup();}, 500);
		}, false);

		$('undoCloseTabPopup').addEventListener('mouseover', function() {
			if (uCTPhideDelay) {
				clearTimeout(uCTPhideDelay);
				uCTPhideDelay = null;
			}
		}, false);
		$('undoCloseTabPopup').addEventListener('mouseout', function() {
			uCTPhideDelay = setTimeout(function() {$('undoCloseTabPopup').hidePopup();}, 500);
		}, false);

		var BFMhideDelay;
		$("back-button").addEventListener('mouseover', function(event) {
			$('backForwardMenu').openPopupAtScreen(event.screenX, event.screenY, true);
			if (BFMhideDelay) {
				clearTimeout(BFMhideDelay);
				BFMhideDelay = null;
			}
		}, false);
		$('back-button').addEventListener('mouseout', function() {
			BFMhideDelay = setTimeout(function() {$('backForwardMenu').hidePopup();}, 500);
		}, false);

		$('backForwardMenu').addEventListener('mouseover', function() {
			if (BFMhideDelay) {
				clearTimeout(BFMhideDelay);
				BFMhideDelay = null;
			}
		}, false);
		$('backForwardMenu').addEventListener('mouseout', function() {
			BFMhideDelay = setTimeout(function() {$('backForwardMenu').hidePopup();}, 500);
		}, false);
	}

	function DelayMenuitemsStart() {
	/* 複製選單項到工具選單 */
		var n, Item, FavIDs;
		FavIDs = [
			'goOfflineMenuitem',
			'fullScreenItem',
			'FavIconReloader',
			'subscribeToPageMenuitem',
			'subscribeToPageMenupopup',
//			'bookmarksToolbarFolderMenu',
			];
		for(n = 0; n < FavIDs.length; n++) {
			Item = $(FavIDs[n]);
				if (Item) {
					Item = Item.cloneNode(true);
					Item.removeAttribute('key');
				}
			if (Item!=null) $('devToolsSeparator').parentNode.insertBefore(Item, $('devToolsSeparator'));
//			if (Item!=null) $('alltabs-popup').insertBefore(Item, $('alltabs-popup-separator')); /* 所有分頁選單 */
//			if (Item!=null) $('contentAreaContextMenu').appendChild(Item); /* 右鍵選單 */
//			if (Item!=null) $('BMB_bookmarksPopup').insertBefore(Item, $('BMB_bookmarksPopup').firstChild); /* 書籤按鈕選單 */
//			if (Item!=null) $('BMB_bookmarksPopup').insertBefore(Item, $('BMB_viewBookmarksSidebar')); /* $('BMB_bookmarksToolbar') */
		}

		var n, Item, FavIDs;
		FavIDs = [
			'file-menu',
			'edit-menu',
			'view-menu',
			'history-menu',
			'bookmarksMenu',
//			'tools-menu',
			'helpMenu',
			];
		for(n = 0; n < FavIDs.length; n++) {
			var FavID = FavIDs[n];
				Item = $(FavID);
				if (Item) {
//					Item = Item.cloneNode(true);
					Item.removeAttribute('key');
				}
			if (Item!=null) $('menu_ToolsPopup').insertBefore(Item, $('webDeveloperMenu'));
		}

		var n, Item, FavIDs;
		FavIDs = [
			'charsetMenu',
			];
		for(n = 0; n < FavIDs.length; n++) {
			var FavID = FavIDs[n];
				Item = $(FavID);
				if (Item) {
					Item = Item.cloneNode(true);
					Item.removeAttribute('key');
				}
			if (Item!=null) $('menu_ToolsPopup').insertBefore(Item, $('webDeveloperMenu'));
		}

		var n, Item, FavIDs;
		FavIDs = [
			'noscript-context-menu',
			'tongwen-context-menu',
			];
		for(n = 0; n < FavIDs.length; n++) {
			var FavID = FavIDs[n];
				Item = $(FavID);
				if (Item) {
					Item = Item.cloneNode(true);
					Item.removeAttribute('key');
				}
			if (Item!=null) $('menu_ToolsPopup').insertBefore(Item, $("menu_preferences"));
		}

		var ClippleMenu = $('menu_ToolsPopup').insertBefore($C("menu", {
			id: "Clipple-AnoMenu",
			class: "menu-iconic",
			label: "Clipple!",
			image: "chrome://clipple/skin/icon16/paste.png",
		}), $("menu_preferences"));
			ClippleMenu.appendChild($("clipple-menu"));

		var tczoompanelMenu = $('menu_ToolsPopup').insertBefore($C("menu", {
			id: "tczoompanel-AnoMenu",
			class: "menu-iconic",
			label: "快速縮放",
			image: "chrome://zoompanel/skin/zoompanel.png",
		}), $("menu_preferences"));
			tczoompanelMenu.appendChild($("tczoompanel_Popup"));

		$('fullScreenItem', {
			tooltiptext: "左鍵：全螢幕\n右鍵：全螢幕 & 隱藏工具列",
			onclick: "if (event.button == 2) {BrowserFullScreen(); FullScreen.setAutohide();}"
		});

		$("abp-menuitem", {
			class: "menu-iconic",
			tooltiptext: "左鍵：Adblock Plus 選單\n中鍵：啟用 / 停用 Adblock Plus\n右鍵：Adblock Plus 條件偏好設定",
			onclick: "if (event.button == 1) {document.getElementById('abp-menuitem-disabled').click();} else if (event.button == 2) {gBrowser.selectedTab = gBrowser.addTab('chrome://adblockplus/content/ui/filters.xul'); event.preventDefault();}"
		});

		$("abp-menuitem-popup", {onclick: "event.preventDefault(); event.stopPropagation();"});

/*		$("abp-toolbarbutton", {
			tooltiptext: "左鍵：Adblock Plus 選單\n中鍵：啟用 / 停用 Adblock Plus\n右鍵：Adblock Plus 條件偏好設定",
			onclick: "if (event.button == 2) {gBrowser.selectedTab = gBrowser.addTab('chrome://adblockplus/content/ui/filters.xul'); event.preventDefault();}"
		});

		$("abp-toolbar-popup", {onclick: "if (event.button == 2) {event.stopPropagation();}"});
*/
		$("noscript-tbb", {
//			tooltiptext: "左鍵：NoScript 選單\n中鍵：暫時允許此頁面的所有物件\n右鍵：取消暫時許可",
			onclick: "if (event.button == 2) {noscriptOverlay.revokeTemp(); event.preventDefault();}"
		});
		
/*		$("noscript-context-menu", {
			tooltiptext: "左鍵：NoScript 選單\n中鍵：暫時允許此頁面的所有物件\n右鍵：取消暫時許可",
			onclick: "if (event.button == 1) {noscriptOverlay.allowPage();} else if (event.button == 2) {noscriptOverlay.revokeTemp();}"
		});
		
		$("noscript-context-popup", {onclick: "noscriptOverlay.onCommandClick(event); event.preventDefault(); event.stopPropagation();"});
*/
	}

	var popup = $("mainPopupSet").appendChild($C("menupopup", {
		id: "undoCloseTabPopup",
		onpopupshowing: "this.populateUndoSubmenu();",
		tooltip: "bhTooltip",
		popupsinherittooltip: "true",
		onclick: "if (event.button == 2) {\
			XULBrowserWindow.statusTextField.label = '清除復原分頁列表';\
			var Setting = 'browser.sessionstore.max_tabs_undo';\
			gPrefService.setIntPref(Setting, 0);\
			gPrefService.setIntPref(Setting, 50);\
			event.target.parentNode.hidePopup();\
			event.preventDefault();\
		}\
		",
	}));
	popup.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace("undoMenu.firstChild", "this").replace(/.*undoMenu.*/g, "") + ")");

	function $(id, attr) {
		var el = document.getElementById(id);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	if (location == "chrome://browser/content/browser.xul") {
		setTimeout(DelayButtonsStart, 5000);
		setTimeout(DelayMenuitemsStart, 5000);
	}
})();
