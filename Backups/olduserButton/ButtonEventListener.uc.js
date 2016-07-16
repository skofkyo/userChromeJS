// ==UserScript==
// @label                  ButtonEventListener.uc.js
// @description       為工具欄圖標增加點擊功能
// @namespace       fixGMPM@zbinlin
// @author          zbinlin/skofkyo
// @version         0.0.1
// @compatibility  Firefox 29+
// @charset              UTF-8
// ==/UserScript==

if (location == "chrome://browser/content/browser.xul") {
	//Flash Video Downloader - YouTube HD Download [4K]圖標右鍵菜單
	//var fvd = document.getElementById('fvd_single_button');
	//fvd.addEventListener("contextmenu", function(event) {
	//	fvd.firstChild.openPopupAtScreen(event.screenX, event.screenY, true); 
		//fvd.firstChild.openPopup( this , "after_pointer" , 0 , true, false ); 
	//	event.preventDefault();
	//}, false);
	//Flash Video Downloader - YouTube HD Download [4K]圖標右鍵菜單
	(function (doc) {
		var fvd = doc.getElementById('fvd_single_button');
		if (!fvd)
			return;
		fvd.addEventListener("click", function (e) {
			if (e.button == 1) {
				switchToTabHavingURI("about:downloads", true);
			}
			if (e.button == 2) {
				e.preventDefault();
				fvd.firstChild.openPopup( this , "after_pointer" , 0 , true, false ); 
			}
		}, false);
	})(document);
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
				switchToTabHavingURI("chrome://ublock0/content/logger-ui.html", true);
				//var tabCount = gBrowser.mPanelContainer.childNodes.length;
				//for(var i = 0; i < tabCount; i++) {
				//  var browser = gBrowser.getBrowserAtIndex(i);
				//  if (browser.currentURI.spec == 'chrome://ublock0/content/logger-ui.html'){
				//		tab = gBrowser.mTabs[i];
				//		gBrowser.selectedTab = tab;
				//		return;
				//  }
				//}
				//openUILinkIn("chrome://ublock0/content/logger-ui.html", "tab");
			}
			if (e.button == 2) {
				e.preventDefault();
				e.stopPropagation();
				switchToTabHavingURI("chrome://ublock0/content/dashboard.html", true);
				//var tabCount = gBrowser.mPanelContainer.childNodes.length;
				//for(var i = 0; i < tabCount; i++) {
				//  var browser = gBrowser.getBrowserAtIndex(i);
				//  if (browser.currentURI.spec == 'chrome://ublock0/content/dashboard.html'){
				//		tab = gBrowser.mTabs[i];
				//		gBrowser.selectedTab = tab;
				//		return;
				//  }
				//}
				//openUILinkIn("chrome://ublock0/content/dashboard.html", "tab");
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
				switchToTabHavingURI("about:support", true);
				//var tabCount = gBrowser.mPanelContainer.childNodes.length;
				//for(var i = 0; i < tabCount; i++) {
				//  var browser = gBrowser.getBrowserAtIndex(i);
				//  if (browser.currentURI.spec == 'about:support'){
				//		tab = gBrowser.mTabs[i];
				//		gBrowser.selectedTab = tab;
				//		return;
				//  }
				//}
				//openUILinkIn("about:support", "tab");
			}
			if (e.button == 2) {
				e.preventDefault();
				e.stopPropagation();
				switchToTabHavingURI("about:config", true);
				//var tabCount = gBrowser.mPanelContainer.childNodes.length;
				//for(var i = 0; i < tabCount; i++) {
				//  var browser = gBrowser.getBrowserAtIndex(i);
				//  if (browser.currentURI.spec == 'about:config'){
				//		tab = gBrowser.mTabs[i];
				//		gBrowser.selectedTab = tab;
				//		return;
				//  }
				//}
				//openUILinkIn("about:config", "tab");
			}
		}, false);
	})(document);
	
/*GM中鍵切換開關不關閉下拉菜單*/
eval('GM_popupClicked = ' + GM_popupClicked.toString()
.replace(/\'command\' \=\= aEvent\.type/,"$& \|\| aEvent\.button \=\= 1")
.replace(/\=\! script\.enabled\;\n/,"$&aEvent.target.setAttribute('checked',script.enabled);\n")
.replace(/closeMenus/,"if(aEvent\.button \!\= 1) $&"));

/*stylish中鍵切換開關不關閉下拉菜單和右鍵直接打開編輯*/
eval("stylishOverlay.popupShowing = "+ stylishOverlay.popupShowing.toString()
.replace(/menuitem\.addEventListener.*/,'\
menuitem.addEventListener("click", function(event) {\
if(event.button != 2) {\
stylishOverlay.toggleStyle(this.stylishStyle);\
event.target.setAttribute("checked",this.stylishStyle.enabled);\
event.stopPropagation();\
}else{\
stylishCommon.openEditForStyle(this.stylishStyle);\
closeMenus(this);\
event.preventDefault();\
}\
}, false);'
)
); 

}

