location == "chrome://browser/content/browser.xul" && window.addEventListener("keyup", function (e) {
	e.keyCode == 67 && e.ctrlKey && e.target.namespaceURI == "http://www.w3.org/1999/xhtml" && Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(readFromClipboard())
}, false)