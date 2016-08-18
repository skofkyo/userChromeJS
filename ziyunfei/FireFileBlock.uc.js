location == "chrome://browser/content/browser.xul" && (function self() {
	"use strict";
	if (typeof Firebug !== "object") {
		alert("FireFileBlock Needs Firebug!")
		return;
	}
	if (Firebug.GlobalUI && !self.urls) {
		Firebug.GlobalUI.startFirebug(self);
		self.urls = {};
		return;
	}
	var isZH_CN = Application.prefs.get("general.useragent.locale").value === "zh-CN";
	Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService).addObserver({
		Components: Components,
		observe: function (aSubject, aTopic, aData) {
			var channel = aSubject.QueryInterface(this.Components.interfaces.nsIHttpChannel);
			var url = channel.originalURI.spec;
			if (((url.match(/.+(?=\?)/) || [0])[0] || url) in self.urls) {
				channel.requestMethod = "BLOCK";
			}
		}
	}, "http-on-modify-request", false);
	self.urls = {};
	(document.querySelector("#fbContextMenu") || document.querySelector("#fbMainContainer").contentDocument.querySelector("#fbContextMenu")).addEventListener("popupshown", function (event) {
		var urlLabel = self.selectedTR.querySelector(".netFullHrefLabel");
		if (Firebug.defaultPanelName === "net" && urlLabel) {
			var item = document.createElement("menuitem");
			var url = urlLabel.textContent;
			url = (url.match(/.+(?=\?)/) || [0])[0] || url;
			if (url in self.urls) {
				item.setAttribute("label", isZH_CN ? "\u53D6\u6D88\u5C4F\u853D\u8BE5URL" : "Cancel Block This URL");
				item.onclick = function () {
					delete self.urls[url];
				}
			} else {
				item.setAttribute("label", isZH_CN ? "\u5C4F\u853D\u8BE5URL" : "Block This URL");
				item.onclick = function () {
					self.urls[url] = 1;
					self.selectedTR.style.color = "red";
					self.selectedTR.querySelector(".netStatusLabel").textContent = isZH_CN ? "\u5DF2\u5C4F\u853D" : "Block";
				}
			}
			this.appendChild(item);
		}
	}, false);
	(document.querySelector("#fbPanelBar1-browser") || document.querySelector("#fbMainContainer").contentDocument.querySelector("#fbPanelBar1-browser")).contentDocument.addEventListener("click", function (event) {
		if (event.which === 3 && Firebug.defaultPanelName === "net") {
			var originalTarget = event.originalTarget;
			while (originalTarget = originalTarget.parentNode) {
				if (originalTarget.localName === "tr") {
					self.selectedTR = originalTarget;
				}
			}
			if (self.selectedTR.classList.contains("netInfoRow")) {
				self.selectedTR = self.selectedTR.previousSibling;
			}
		}
	}, false)
})()