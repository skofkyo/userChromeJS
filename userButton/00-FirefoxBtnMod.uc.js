// ==UserScript==
// @label                  Firefox-button-mod.uc.js
// @description       火狐按鈕
// @labelspace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.10
// @startup        
// @shutdown       
// @config         
// @homepageURL    
// @ohomepageURL    
// @reviewURL    
// @downloadURL    
// @note                   
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

(function() {

		CustomizableUI.createWidget({
		    defaultArea: CustomizableUI.AREA_NAVBAR,
		    id: "Firefox-button-mod",
		    label: "Firefox",
		});

		var FirefoxBtnMod = document.getElementById('Firefox-button-mod');
		FirefoxBtnMod.setAttribute('type', 'menu');
		FirefoxBtnMod.setAttribute('image', 'data:image/png;base64,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');

		var FirefoxBtnpopup = document.createElement("menupopup");
		FirefoxBtnpopup.setAttribute("id", "FirefoxBtnpopup");
		FirefoxBtnMod.appendChild(FirefoxBtnpopup);

		function menuadd() {
		    var n, Item, FavIDs;
		    FavIDs = [
		        'file-menu',
		        'edit-menu',
		        'view-menu',
		        'history-menu',
		        'bookmarksMenu',
		        'tools-menu',
		        'helpMenu',
		        'menu_preferences',
		        '-',
		        'fullScreenItem',
		        'charsetMenu',
		        'menu_openDownloads',
		        'menu_openAddons',
		        'webDeveloperMenu',
		        'javascriptConsole',
		        '-',
		        'aboutName',
		        'restart',
		        'menu_FileQuitItem',
		    ];
		    for (n = 0; n < FavIDs.length; n++) {
		        var FavID = FavIDs[n];
		        if (FavID == '-') {
		            Item = document.createElement("menuseparator");
		        } else if (FavID == 'javascriptConsole') {
		            Item = document.createElement("menuitem");
		            Item.setAttribute("label", "錯誤主控台");
		            Item.setAttribute("class", "menuitem-iconic");
		            Item.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC");
		            Item.setAttribute("oncommand", "toJavaScriptConsole();");
		        } else if (FavID == 'restart') {
		            Item = document.createElement("menuitem");
		            Item.setAttribute("label", "重新啟動瀏覽器");
		            Item.setAttribute("class", "menuitem-iconic");
		            Item.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=");
		            Item.setAttribute("oncommand", "Services.appinfo.invalidateCachesOnRestart() || Application.restart();");
		        } else {
		            Item = document.getElementById(FavID);
		            //if (Item) {
		            //    Item = Item.cloneNode(true);
		            //    Item.removeAttribute('key');
		            //}
		        }
		        if (Item != null) FirefoxBtnpopup.appendChild(Item);
		    }
		}
		
		setTimeout(function() {
		    menuadd();
		}, 2000);

		var css = ('\
		#TabsToolbar #Firefox-button-mod {\
			background: none !important;\
			margin-right: -21px !important;\
		}\
		#nav-bar  #Firefox-button-mod {\
			margin-right: -4px !important;\
		}\
		#nav-bar  #Firefox-button-mod .toolbarbutton-icon {\
			max-width: 32px !important;\
			padding: 2px 6px !important;\
		}\
		#Firefox-button-mod .toolbarbutton-icon {\
			padding-right: 8px !important;\
		}\
		#Firefox-button-mod dropmarker,#toolbar-menubar,#toggle_toolbar-menubar {\
			display: none;\
		}\
		');
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);

})();
