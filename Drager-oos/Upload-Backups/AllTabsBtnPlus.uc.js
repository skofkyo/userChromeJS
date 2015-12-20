(function() {
	var AllTabsBtn = $("urlbar").appendChild($("alltabs-button", {
		onDOMMouseScroll: "ReloadOrStopScroll.onScroll(event);",
		tooltiptext: "左鍵：所有分頁選單\n中鍵：復原分頁選單\n右鍵：分頁選單\n向上滾動：停止載入所有分頁\n向下滾動：重新載入所有分頁\n\n在復原分頁選單：\n右鍵：清除復原分頁列表",
	}));
	AllTabsBtn.addEventListener("click", function(event) {
		if (event.button == 1) {$("undoCloseTabPopup").openPopupAtScreen(event.screenX, event.screenY, true);}
		else if (event.button == 2) {$("tabContextMenu").openPopupAtScreen(event.screenX, event.screenY, true); event.preventDefault();}
	}, false);
	ReloadOrStopScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {gBrowser.reloadAllTabs();}
			else {Array.map(gBrowser.browsers, function(browser) {browser.stop()});}
			return;
		}
	};
	$("alltabs-popup", {onclick: "event.preventDefault(); event.stopPropagation();",});

	var css = '\
		#main-window {counter-reset:tabs;}\
		.tabbrowser-tab:not(:-moz-any([pinned],[concealed])) {counter-increment:tabs;}\
		/* Alltabs-button 顯示標籤頁總數 */\
		#alltabs-button:after {\
		content:counter(tabs);\
		display:-moz-box;\
		-moz-box-pack:center;\
		color:#000;\
		font-weight:bold;\
		font:18px Arial!important;\
		min-width:17px;\
		}\
		#alltabs-button > :-moz-any(label, image) {display:none;}\
		#alltabs-button {\
		visibility:visible!important;\
		padding:0px!important;\
		}\
		/* 彈出菜單顯示標籤頁序號 */\
		#alltabs-popup {counter-reset:latabs;}\
		#alltabs-popup .menuitem-iconic.alltabs-item.menuitem-with-favicon {counter-increment:latabs;}\
		#alltabs-popup .menuitem-iconic.alltabs-item.menuitem-with-favicon:before {content:counter(latabs);}\
		/* 彈出菜單顯示關閉標籤頁序號 */\
		#undoCloseTabPopup .menuitem-iconic {counter-increment:menuitem;}\
		#undoCloseTabPopup menuitem:before {content:counter(menuitem);}\
		\
		#alltabs-popup .menuitem-iconic.alltabs-item.menuitem-with-favicon:before,\
		#undoCloseTabPopup menuitem:before {\
		display:-moz-box;\
		-moz-box-pack:center;\
		font-weight:bold;\
		min-width:26px;\
		}\
		'.replace(/[\r\n\t]/g, '');;
	AllTabsBtn.style = addStyle(css);

	var popup = $("mainPopupSet").appendChild($C("menupopup", {
		id: "undoCloseTabPopup",
		onpopupshowing: "this.populateUndoSubmenu();",
		tooltip: "bhTooltip",
		popupsinherittooltip: "true",
		onclick: "if (event.button == 2) {ClearUndoCloseTabList.setPref('browser.sessionstore.max_tabs_undo', 'int', 0); ClearUndoCloseTabList.setPref('browser.sessionstore.max_tabs_undo', 'int', 50); event.preventDefault();}",
	}));
	popup.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace("undoMenu.firstChild", "this").replace(/.*undoMenu.*/g, "") + ")");

	function $(id, doc) (doc || document).getElementById(id);
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
	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	}
})();
