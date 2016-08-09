// ==UserScript==
// @name            noshowborder.uc.js
// @namespace       firefox
// @description     Noshowborder - 浏览器无边框
// @include         chrome://browser/content/browser.xul
// @version         1.2
// ==/UserScript==
(function() {
	window.chromemargin = {
		init: function() {
			window.addEventListener("resize", this, true);
			window.addEventListener("aftercustomization", this, false);
			window.addEventListener("customizationchange", this, false);
		},
		handleEvent: function(evnet) {
			document.documentElement.setAttribute("chromemargin", "0,0,0,0");
		}
	};
	window.chromemargin.init();

	setTimeout(function() {
		document.documentElement.setAttribute("chromemargin", "0,0,0,0");
	}, 200);
})();