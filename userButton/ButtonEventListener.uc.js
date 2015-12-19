// ==UserScript==
// @name            为工具栏图标增加点击功能
// @namespace       fixGMPM@zbinlin
// @author          zbinlin
// @version         0.0.1
// @compatibility  Firefox 29+
// @charset              UTF-8
// ==/UserScript==

if (location == "chrome://browser/content/browser.xul") {
	//greasemonkey圖標右鍵菜單
	(function (doc) {
		var greasemonkeyTBB = doc.getElementById('greasemonkey-tbb');
		if (!greasemonkeyTBB)
			return;
		var menupopup = greasemonkeyTBB.firstChild;
		greasemonkeyTBB.addEventListener("click", function (e) {
			if (e.button == 2) {
				e.preventDefault();
				menupopup.openPopup(this, "after_pointer", 0, 0, false, false);
			}
		}, false);
	})(document);
	//Tab mix plus已關閉標籤頁列表的右鍵菜單
	(function (doc) {
		var undocloseTBB = doc.getElementById('btn_undoclose');
		if (!undocloseTBB)
			return;
		var undoclosemenupopup = undocloseTBB.firstChild;
		undocloseTBB.addEventListener("click", function (e) {
			if (e.button == 2) {
				e.preventDefault();
				undoclosemenupopup.openPopup(this, "after_pointer", 0, 0, false, false);
			}
		}, false);
	})(document);
	//ublock按鈕
	(function (doc) {
		var ublock = doc.getElementById('ublock0-button');
		if (!ublock)
			return;
		ublock.addEventListener("click", function (e) {
			if (e.button == 1) {
				var tabCount = gBrowser.mPanelContainer.childNodes.length;
				for(var i = 0; i < tabCount; i++) {
				  browser = gBrowser.getBrowserAtIndex(i);
				  if (browser.currentURI.spec == 'chrome://ublock0/content/logger-ui.html'){
						tab = gBrowser.mTabs[i];
						gBrowser.selectedTab = tab;
						return;
				  }
				}
				openUILinkIn("chrome://ublock0/content/logger-ui.html", "tab");
			}
			if (e.button == 2) {
				e.preventDefault();
				e.stopPropagation();
				var tabCount = gBrowser.mPanelContainer.childNodes.length;
				for(var i = 0; i < tabCount; i++) {
				  browser = gBrowser.getBrowserAtIndex(i);
				  if (browser.currentURI.spec == 'chrome://ublock0/content/dashboard.html'){
						tab = gBrowser.mTabs[i];
						gBrowser.selectedTab = tab;
						return;
				  }
				}
				openUILinkIn("chrome://ublock0/content/dashboard.html", "tab");
			}
		}, false);
	})(document);
	//選項按鈕
	(function (doc) {
		var preferences = doc.getElementById('preferences-button');
		if (!preferences)
			return;
		preferences.setAttribute("tooltiptext", "左鍵：打開選項\n中鍵：打開about:support 疑難排除資訊\n右鍵：打開about:config");
		preferences.addEventListener("click", function (e) {
			if (e.button == 1) {
				var tabCount = gBrowser.mPanelContainer.childNodes.length;
				for(var i = 0; i < tabCount; i++) {
				  browser = gBrowser.getBrowserAtIndex(i);
				  if (browser.currentURI.spec == 'about:support'){
						tab = gBrowser.mTabs[i];
						gBrowser.selectedTab = tab;
						return;
				  }
				}
				openUILinkIn("about:support", "tab");
			}
			if (e.button == 2) {
				e.preventDefault();
				e.stopPropagation();
				var tabCount = gBrowser.mPanelContainer.childNodes.length;
				for(var i = 0; i < tabCount; i++) {
				  browser = gBrowser.getBrowserAtIndex(i);
				  if (browser.currentURI.spec == 'about:config'){
						tab = gBrowser.mTabs[i];
						gBrowser.selectedTab = tab;
						return;
				  }
				}
				openUILinkIn("about:config", "tab");
			}
		}, false);
	})(document);
}
