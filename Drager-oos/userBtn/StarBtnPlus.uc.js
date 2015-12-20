// ==UserScript==
// @name           StarBtnPlus.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/userBtn/StarBtnPlus.uc.js
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function() {
	var BMBtn = $("urlbar-icons").appendChild($("bookmarks-menu-button"));
	var StarBtn = document.getAnonymousElementByAttribute(BMBtn, "anonid", "button");
	StarBtn.setAttribute("tooltiptext","左鍵：將本頁加入書籤\n中鍵：將本頁加入書籤並彈出書籤編輯面板\n右鍵：刪除此書籤\n向上滾動：將本頁加入書籤\n向下滾動：將本頁加入書籤選單");
	StarBtn.setAttribute("onDOMMouseScroll", "\
		if (event.detail > 0) {PlacesCommandHook.bookmarkCurrentPage(false, PlacesUtils.bookmarksMenuFolderId);}\
		else {BookmarkingUI.onCommand(event);}\
		return;\
	");
	StarBtn.addEventListener("click", function(e) {
		if (e.button == 0) {
			BookmarkingUI.onCommand(event);
		} 
		else if (e.button == 1) {
			PlacesCommandHook.bookmarkCurrentPage(true);
		}
		else if (e.button == 2) {
			var uri = gBrowser.selectedBrowser.currentURI;
			var itemId = PlacesUtils.getMostRecentBookmarkForURI(uri);
			var navBookmarksService = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService);
			navBookmarksService.removeItem(itemId);
		}
		e.preventDefault();
	}, false);
	
	// 展開資料夾和標籤
	eval("StarUI._doShowEditBookmarkPanel=" + StarUI._doShowEditBookmarkPanel.toString().replace(/}$/, "gEditItemOverlay.toggleFolderTreeVisibility();gEditItemOverlay.toggleTagsSelector();document.getElementById('editBMPanel_folderTree').style.cssText = 'min-height:222px!important'; $&"));
	
	function $(id) document.getElementById(id);
})();
