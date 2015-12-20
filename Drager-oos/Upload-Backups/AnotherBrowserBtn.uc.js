(function() {
	AnotherBrowser = {
		init: function() {
			this.icon = $("TabsToolbar").appendChild($C("toolbarbutton", {
				id: "AnotherBrowser",
				class: "toolbarbutton-1",
				label: "另一個視窗",
				tooltiptext: "顯示 Index",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArUlEQVQ4jc2TUQrDIBBE3wVMcoEk90iOmx5C/wO1f80FhNqL9CMDXYpCIIVWGFzX2dHVXYA7kIFk8AQ80ApePsvJiuUBTEAPjJpn4Cq7lz1/cCbFkuS0YwRWI7BWOOk/BLLyG+QctI5GIFY4GSCIsBrcgAvghEU+y4mKpTMnWTTmuk2F08H+z6VNZwRchdPCXiSlFJYDKfivPOLv6+C0wOlm2ii3c+DdzoFyO28vxlBcNJTkO0QAAAAASUVORK5CYII=",
				onclick: "AnotherBrowser.openPanel(event);",
				style: "padding: 0px; -moz-transform: scale(0.875);",
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
			var self = this,
				panel = $("AnotherBrowser-panel"),
				iframe = $("AnotherBrowser-iframe");
			panel.openPopup(self.icon);
			iframe.contentDocument.location.href = "chrome://userchromejs/content/index.html";
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
