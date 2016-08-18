location == "chrome://browser/content/browser.xul" && (function () {
	(function (m) {
		m.id = "CBIR-search";
		m.addEventListener("command", function () {
			var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
			gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
			gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
			gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + url);
			gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
		}, false);
		m.setAttribute("label", "\u641C\u7D22\u7C7B\u4F3C\u56FE\u7247");
	})(document.getElementById("contentAreaContextMenu").insertBefore(document.createElement("menuitem"), document.getElementById("context-viewimage")));
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function () {
		gContextMenu.showItem("CBIR-search", gContextMenu.onImage || (gContextMenu.hasBGImage && !gContextMenu.isTextSelected));
	}, false);
})()