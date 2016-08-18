location == "chrome://browser/content/browser.xul" && (function () {
	var fbArrowscrollbox = (document.querySelector("#fbPanelBar1-Arrowscrollbox") || document.querySelector("#fbMainContainer").contentDocument.querySelector("#fbPanelBar1-Arrowscrollbox"));
	var searchHTML = fbArrowscrollbox.parentNode.insertBefore(document.createElement("button"), fbArrowscrollbox.nextElementSibling);
	searchHTML.label = "\u641C\u7D22";
	searchHTML.onclick = function () {
		(document.querySelector("#fbPanelBar1-browser") || document.querySelector("#fbMainContainer").contentDocument.querySelector("#fbPanelBar1-browser"))._contentWindow.find("", false, false, true, false, true, true);
	};
})()