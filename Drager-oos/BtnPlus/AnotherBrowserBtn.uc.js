// ==UserScript==
// @name           AnotherBrowserBtn.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/BtnPlus/AnotherBrowserBtn.uc.js
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function() {
	AnotherBrowser = {
		init: function() {
			this.icon = $("TabsToolbar").appendChild($C("toolbarbutton", {
				id: "AnotherBrowser",
				class: "toolbarbutton-1",
				label: "另一個視窗",
				tooltiptext: "左鍵：顯示 Index\n中鍵：顯示收藏庫\n右鍵：顯示 Website",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAJUlEQVQ4jWNgoBL4jwMTK4/KwSJGSH64GEBRIA48GE0HQzodAABzd0+xt+fzuAAAAABJRU5ErkJggg==",
				onclick: "AnotherBrowser.openPanel(event);",
				style: "padding: 0px;",
			}));

			this.panel = $("mainPopupSet").appendChild($C("panel", {
				id: "AnotherBrowser-panel",
				type: "arrow",
				flip: "both",
				side: "top",
				consumeoutsideclicks: "false",
				noautofocus: "false",
				panelopen: "true",
			}));

			this.panel.appendChild($C("iframe", {
				id: "AnotherBrowser-iframe",
				type: "content",
				flex: "1",
				transparent: "transparent",
				showcaret: "true",
				autocompleteenabled: "true",
				style: "width: 1024px; height: 768px;",
			}));
		},
		openPanel: function(event) {
			$("AnotherBrowser-panel").openPopup(this.icon);
			var url = [
				"chrome://userchromejs/content/index.html",
				"chrome://browser/content/places/places.xul",
				"chrome://userchromejs/content/Website.html"
			];
			$("AnotherBrowser-iframe").contentDocument.location.href = url[event.button];
			event.preventDefault();
		},
		addAutoPopup: function() {
			var self = this;
			this.icon.addEventListener('mouseover', function() {
				if (self.hideTimer) {
					clearTimeout(self.hideTimer);
					self.hideTimer = null;
				}
				self.popupTimer = setTimeout(self.openPanel.bind(self), 100);
			}, false);
			this.icon.addEventListener('mouseout', function() {
				if (self.popupTimer) {
					clearTimeout(self.popupTimer);
					self.popupTimer = null;
				}
				self.hideTimer = setTimeout(function() {
					self.panel.hidePopup();
				}, 500);
			}, false);

			this.panel.addEventListener('mouseover', function() {
				if (self.hideTimer) {
					clearTimeout(self.hideTimer);
					self.hideTimer = null;
				}
			}, false);
			this.panel.addEventListener('mouseout', function() {
				self.hideTimer = setTimeout(function() {
					self.panel.hidePopup();
				}, 500);
			}, false);
		},
	};
	AnotherBrowser.init();
	AnotherBrowser.addAutoPopup();

	function $(id, doc) (doc || document).getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
