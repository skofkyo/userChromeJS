// ==UserScript==
// @include			main
// ==/UserScript==
location == 'chrome://browser/content/browser.xul' && (function () {
	var uIcon = document.getElementById('urlbar-icons'),
		bmbtn = document.getElementById('bookmarks-menu-button');
	if (!bmbtn) return;

	/*样式修正*/
	var cssStr = (function(){/*
		@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);
		@-moz-document url("chrome://browser/content/browser.xul") {
			#bookmarks-menu-button >toolbarbutton,
			#bookmarks-menu-button >toolbarbutton .toolbarbutton-icon{
			-moz-appearance:none!important;
			border:none!important;
			box-shadow:none!important;
			background:none!important;
			margin:0!important;
			padding:0!important;
			width:18px!important;
			height:18px!important;
			}

			#bookmarks-menu-button >dropmarker{
			display:none;
			}
			}
	*/}).toString().replace(/^.+\s|.+$/g,"");
	var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
	sss.loadAndRegisterSheet(Services.io.newURI('data:text/css,' + encodeURIComponent(cssStr), null, null), sss.USER_SHEET);

	/*右键书签按钮下拉列表*/
	uIcon.appendChild(bmbtn);
	var menupopup = document.getElementById('BMB_bookmarksPopup');
	bmbtn.addEventListener("click", function (e) {
		if (e.button == 2) {
			e.preventDefault();
			menupopup && menupopup.openPopup(BookmarkingUI.anchor, "after_pointer", 0, 0, false, false);
		}else if(e.button == 1){
			var itemId = PlacesUtils.getMostRecentBookmarkForURI(gBrowser.currentURI);
			if(!!~itemId){
				PlacesUtils.transactionManager.doTransaction(new PlacesRemoveItemTransaction(itemId));
			}
		}
	}, false);
})();