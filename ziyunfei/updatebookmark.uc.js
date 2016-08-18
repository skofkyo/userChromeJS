location == "chrome://browser/content/browser.xul" && (function () {
	var newBM = document.getElementById("placesContext_new:bookmark");
	var repBM = newBM.parentNode.insertBefore(newBM.cloneNode(true), newBM);
	repBM.label = "\u66FF\u6362\u4E3A\u5F53\u524D\u7F51\u5740";
	repBM.command = "";
	repBM.addEventListener("command", function () {
		var itemId = (document.popupNode._placesNode || document.popupNode.node).itemId;
		PlacesUtils.bookmarks.changeBookmarkURI(itemId, gBrowser.currentURI);  //更新地址
		PlacesUtils.bookmarks.setItemTitle(itemId, gBrowser.contentTitle);     //更新标题
	}, false)
})()