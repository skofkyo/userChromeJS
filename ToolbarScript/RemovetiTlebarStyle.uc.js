// ==UserScript==
// @name            RemoveTitlebarStyle.uc.js
// @description     移除標題列的樣式 為了搭配Win10 Microsoft Edge標簽欄風格CSS
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 46+
// @charset			UTF-8
// @include         chrome://browser/content/browser.xul
// @startup         window.rts.init();
// @homepageURL   	https://github.com/skofkyo/userChromeJS
// @version         1.0
// ==/UserScript==

//(function() {
//	var titlebar = document.getElementById('titlebar');
//	window.rts = {
//		init: function() {
//			window.addEventListener("resize", this, true);
//			setTimeout(function() {
//				titlebar.removeAttribute("style");
//			}, 10);
//		},
//		handleEvent: function(evnet) {
//			titlebar.removeAttribute("style");
//		}
//	};
//	window.rts.init();
//})();

document.getElementById('titlebar').removeAttribute("style");