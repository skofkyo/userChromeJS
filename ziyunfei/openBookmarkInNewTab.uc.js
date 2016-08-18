location == "chrome://browser/content/browser.xul" && (function () {
	var _whereToOpenLink = whereToOpenLink;
	whereToOpenLink = function (event, ignoreButton, ignoreAlt) {
		if (event.originalTarget.classList.contains("bookmark-item") && event.originalTarget.getAttribute("scheme") !== "javascript" && content.location != "about:blank" && content.location != "about:newtab") {
			return "tab";
		} else {
			return _whereToOpenLink(event, ignoreButton, ignoreAlt);
		}
	}
})()