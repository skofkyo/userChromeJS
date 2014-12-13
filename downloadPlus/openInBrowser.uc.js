// ==UserScript==
// @include        chrome://browser/content/browser.xul
// @include        chrome://browser/content/places/places.xul
// @include        chrome://mozapps/content/downloads/unknownContentType.xul
// @include        chrome://mozapps/content/downloads/downloads.xul
// @charset      UTF-8
// ==/UserScript==

(function () {
	if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
	var openInFirefox = {
		Components: Components,
		observe: function (aSubject, aTopic, aData) {
			var channel = aSubject.QueryInterface(this.Components.interfaces.nsIHttpChannel);
			if (channel.originalURI.spec != openInFirefox.url) return
			channel.contentType = openInFirefox.mime;
			channel.loadFlags &= ~this.Components.interfaces.nsIChannel.LOAD_CALL_CONTENT_SNIFFERS;
			channel.setResponseHeader("Content-Disposition", "", false);
			var observerService = this.Components.classes["@mozilla.org/observer-service;1"].getService(this.Components.interfaces.nsIObserverService);
			observerService.removeObserver(openInFirefox, "http-on-examine-response", false);
			observerService.removeObserver(openInFirefox, "http-on-examine-merged-response", false);
		}
	}
	document.querySelector("#save").parentNode.insertBefore(document.createElement("hbox"), document.querySelector("#save")).appendChild(document.createElement("radio")).id = "openInBrowser";
	document.querySelector("#openInBrowser").setAttribute("width", "103");
	document.querySelector("#openInBrowser").setAttribute("label", "Firefox\u6253\u958B");
	document.querySelector("#openInBrowser").parentNode.appendChild(document.createElement("vbox")).appendChild(document.createElement("menulist")).id = "MIMETypes";
	var MT = document.querySelector("#MIMETypes");
	MT.setAttribute("width", "100");
	var menupopup = MT.appendChild(document.createElement("menupopup"));
	menupopup.setAttribute("flex", "1");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "BT種子檔");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "圖片");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "純文字");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "音樂");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "影片");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "網頁");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "XML");
	document.querySelector("#MIMETypes").selectedIndex = 0;
	addEventListener("DOMNodeInserted", window.sizeToContent, true)
	addEventListener("dialogaccept", function () {
		if (document.querySelector("#mode").selectedItem.id == "openInBrowser") {
			document.documentElement.removeAttribute("ondialogaccept");
			openInFirefox.url = dialog.mLauncher.source.asciiSpec;
			openInFirefox.mime = [ "application/x-bittorrent", "image/png","text/plain", "audio/mp3", "video/x-ms-wmv", "text/html", "text/xml"][document.querySelector("#MIMETypes").selectedIndex]
			var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
			observerService.addObserver(openInFirefox, "http-on-examine-response", false);
			observerService.addObserver(openInFirefox, "http-on-examine-merged-response", false);
			var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
			(mainwin.content.location == "about:blank") ? (mainwin.gBrowser.mCurrentBrowser.loadURIWithFlags(openInFirefox.url, 256)) : (mainwin.gBrowser.loadOneTab("", {
				inBackground: false
			}) && mainwin.gBrowser.mCurrentBrowser.loadURIWithFlags(openInFirefox.url, 256));
		}
	}, false);
})()