// ==UserScript==
// @name                 AutohidePopup.uc.js
// @description       自動關閉右鍵選單
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.03              
// @include              main
// @include         chrome://browser/content/browser.xul
// @include         chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include         chrome://browser/content/places/places.xul
// ==/UserScript==

(function () {
//收藏庫
    var placesContext = document.querySelector("#placesContext");

    placesContext.addEventListener("mouseout", function(event){
			t=setTimeout(function (event) {
				placesContext.hidePopup();
			}, 1000);
	}, false);
	
    placesContext.addEventListener("mouseover", function(event){
			clearTimeout(t);
	}, false);
//頁面右鍵
    var ContextMenu = document.querySelector("#contentAreaContextMenu");
    
    ContextMenu.addEventListener("mouseout", function(event){
			t = setTimeout(function (event) {
				ContextMenu.hidePopup();
			}, 1000);
	}, false);

    ContextMenu.addEventListener("mouseover", function(event){
			clearTimeout(t);
	}, false);
//分頁右鍵
    var tabContextMenu = document.querySelector("#tabContextMenu");
    
    tabContextMenu.addEventListener("mouseout", function(event){
			t = setTimeout(function (event) {
				tabContextMenu.hidePopup();
			}, 1000);
	}, false);

    tabContextMenu.addEventListener("mouseover", function(event){
			clearTimeout(t);
	}, false);
	
})();