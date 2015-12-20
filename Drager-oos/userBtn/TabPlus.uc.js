(function() {
// ==UserScript==
// @name			NewTabPlus_mod
// @description		整合版分頁增強
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/userBtn/TabPlus.uc.js
// @include			chrome://browser/content/browser.xul
// @include			chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include			chrome://browser/content/history/history-panel.xul
// @include			chrome://browser/content/places/places.xul
// ==/UserScript==

	// 新分頁打開：書籤、歷史、搜索欄
	try {
		eval('openLinkIn=' + openLinkIn.toString().
		replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)').
		replace(/&&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, ''));
	} catch(e) {}

	// 地址欄新分頁前景打開 (inBackground: true 背景)
	try {
		eval("gURLBar.handleCommand="+gURLBar.handleCommand.toString().replace(/^\s*(load.+);/gm,
		"if(/^javascript:/.test(url)||isTabEmpty(gBrowser.selectedTab)) {loadCurrent();} else {this.handleRevert();gBrowser.loadOneTab(url, {postData: postData, inBackground: false, allowThirdPartyFixup: true});}"));
	} catch(e) {}

	// 中鍵點擊書籤選單不關閉
	try {
		eval('BookmarksEventHandler.onClick =' + BookmarksEventHandler.onClick.toString().replace('node.hidePopup()', ''));
		eval('checkForMiddleClick =' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));
	} catch(e) {}
})();

location == "chrome://browser/content/browser.xul" && (function() {
	// 向上滾輪：關閉重複分頁 & 向下滾輪：關閉其他分頁 & 滾輪：切換分頁
	gBrowser.mTabContainer.addEventListener('DOMMouseScroll', function(e) {
		if (e.target.localName == "tab") {
			if (e.detail > 0) {
				gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
				XULBrowserWindow.statusTextField.label = "關閉其他分頁";
/*				var tabs = gBrowser.mTabContainer.childNodes;
				for (var i = tabs.length - 1; tabs[i] != gBrowser.mCurrentTab; i--) {gBrowser.removeTab(tabs[i]);}
				for (i--; i >= 0; i--) {gBrowser.removeTab(tabs[i]);}*/
			}
			else {
				CloseRepeatedTabs();
			}
			return;
		}
		else {
			this.advanceSelectedTab(e.detail > 0 ? +1 : -1, true);
		}
		e.stopPropagation();
		e.preventDefault();
		return;
	}, true);

	// 中鍵：復原已關閉分頁 & 左鍵：貼上就瀏覽 / Google 加密搜尋 (新分頁前景)
	gBrowser.mTabContainer.addEventListener("click", function(e) {
		if (e.target.localName !== "tab") {
			if (e.button == 2 && !e.ctrlKey) {
				XULBrowserWindow.statusTextField.label = "貼上就瀏覽 / Google 加密搜尋 (新分頁前景)";
				var TXT = getBrowserSelection() || readFromClipboard();
				(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:(text|image)\/[\u0025-\u007a]+)\s*$/.test(TXT) && (gBrowser.selectedTab = gBrowser.addTab(TXT))) || (gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/#q=" + encodeURIComponent(TXT)));
				e.preventDefault();
				e.stopPropagation();
			}
			else if (e.button == 1) {
				undoCloseTab();
				e.preventDefault();
				e.stopPropagation();
			}
		}
	}, true);

	// 雙擊左鍵：重新載入
	gBrowser.mTabContainer.addEventListener('dblclick', function (e) {
		if (e.target.localName == 'tab' && e.button == 0) {
			getBrowser().getBrowserForTab(e.target).reload();
		}
	}, false);

	// 鼠標停留分頁自動聚焦
	(document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseover',
	function self(e) {
		if ((self.target = e.target).localName === 'tab') {
			if (!self.timeoutID) {
				this.addEventListener('mouseout',
				function() {
					clearTimeout(self.timeoutID);
				},
				false);
			}
			self.timeoutID = setTimeout(function() {
				gBrowser.selectedTab = self.target;
			},
			200);
		}
	},
	false);

	// 點擊頁面恢復原來的地址
	gBrowser.addEventListener("DOMWindowCreated", function () {
		window.content.document.addEventListener("click", function (e) {
			document.getElementById("urlbar").handleRevert();
		}, false);
	}, false);

	// 自動關閉下載產生的空白分頁
	eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
	  if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
		  && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
		aWebProgress.DOMWindow.setTimeout(function() {\
		  !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
		}, 100);\
	  }\
	'));
})();
