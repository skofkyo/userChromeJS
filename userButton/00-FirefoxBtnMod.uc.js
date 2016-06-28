// ==UserScript==
// @label                  Firefox-button-mod.uc.js
// @description       火狐按鈕
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.26
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

(function() {

	var Mode = 0;//0為新增可拖動按鈕 1為三道槓按鈕右鍵選單
	var icon = 0; // 當模式為新增可拖動按鈕時 0為火狐圖標 1為三道槓圖標 2為三槓動畫圖標
	var picon = 0;// 當模式為三道槓按鈕右鍵選單時 0不變 1為火狐圖標 2為三槓動畫圖標
	var hidden = false; //當模式為新增可拖動按鈕時是否隱藏原三道槓按鈕 true 隱藏 false 不隱藏
	
	if (Mode == 0) {
		CustomizableUI.createWidget({
			defaultArea: CustomizableUI.AREA_NAVBAR,
			id: "Firefox-button-mod",
			type: 'custom',
			onBuild: function(aDocument) {
				var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
				var props = {
					id: "Firefox-button-mod",
					class: "toolbarbutton-1 chromeclass-toolbar-additional",
					label: "Firefox",
					removable: "true",
					overflows: "false",
					type: "menu",
					popup: "FirefoxBtnpopup",
				};
				for (var p in props) {
					toolbarbutton.setAttribute(p, props[p]);
				};
				return toolbarbutton;
			}
		});
		var FirefoxBtnMod = document.getElementById('Firefox-button-mod');
		var FirefoxBtnpopup = document.createElement("menupopup");
		FirefoxBtnpopup.setAttribute("id", "FirefoxBtnpopup");
		FirefoxBtnMod.appendChild(FirefoxBtnpopup);
		if (hidden) document.getElementById("PanelUI-button").hidden = true;
	} else if (Mode == 1) {
		var FirefoxBtnpopup = document.createElement("menupopup");
		FirefoxBtnpopup.setAttribute("id", "FirefoxBtnpopup");
		var menubutton = document.getElementById("PanelUI-button")
		menubutton.appendChild(FirefoxBtnpopup);
		menubutton.addEventListener("contextmenu", function(event) {
			document.getElementById("FirefoxBtnpopup").openPopupAtScreen(event.screenX, event.screenY, true);
			event.preventDefault();
		}, false);
	};	
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
				//Item.setAttribute("oncommand", "Services.appinfo.invalidateCachesOnRestart() || Application.restart();");
				Item.setAttribute("oncommand", "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();");
			} else {
				Item = document.getElementById(FavID);
				//if (Item) {
				//    Item = Item.cloneNode(true);
				//    Item.removeAttribute('key');
				//}
			}
			if (Item != null) FirefoxBtnpopup.appendChild(Item);
		}
	};

	setTimeout(function() {
		menuadd();
	}, 2000);
	
	if (Mode == 0) {
		if (icon == 0) {
			var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
			+ '#TabsToolbar #Firefox-button-mod .toolbarbutton-icon {list-style-image:url(data:image/png;base64,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)}' 
			+ '#TabsToolbar #Firefox-button-mod {background: none !important;}' 
			+ '#toolbar-menubar #Firefox-button-mod .toolbarbutton-icon,#nav-bar #Firefox-button-mod .toolbarbutton-icon,#PersonalToolbar #Firefox-button-mod .toolbarbutton-icon' 
			+ '{list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADnElEQVQ4jW2TbVDTBRzHf7DxtME2trGBMlkSjosEDBnHw44G88CrgK5jyJEVmgrF3MY2xkgeQrjUIuQ0sUsaEdQbOMSHIASRKMRAp1ypPP03yLvslDsLo7tk+/auM67P68/n5YfoaaRmbmjmJ+qE0p5T2YeHbph6bj/c2+F4qD50YeqFvGPHZVtKVeGUH0DrYOmzxYpnZRmRlGW3JjRNzBkHZ9E4OoOu+RW0z/yOqn4Hqk586GmuU989qVdY6vIEgn9rYzgJJ/eGtLW8mX3rJWPLH3X2Dk9fmw62zh7Ujv+G8sEFlPTdQVnTaXzVnOhZcjyzOv7lhvaje/wURORNOiGFX32NP/Jr4/OY+yAJTM1mnNXFYd/pARw4v4DinhnovnHhjc+vIzanEnV1qVi+KXxyzR7elf+iPJSq04OSr+8X3nWZBXCZRGDKgzGmFeHy20q839CAvLabyG2dQnrDIDLqR6HRt2HoYwVcwxHzDdbNafS1VlLvqpA+YUxiOE1SLFaG4V59DDqtr2LnwSak1lxEqPYjcDWViC/pQpbejonODDz6ecuKvdFPR2fzRb0uiwSMOQSMSYLpMhmu1CZjj6ESqveGsKP2EiQ7a8GKfQviNAuUeTbc6o+D26Vyd9cEtVO7mvctYxTDaZZiKCsQZ+T+2JFegPjXzyBFdw4a83lE5RwDS5YLf5EGFcUaPBoIhnsmDO1VYV/Q8diAvvkyERiTFN9p/PBDKgvn3k1Fld6MVts+jJwqQc6ug/AOTANPoEZXcwE8I8F47FCstVTHHSXLRjI6Crmri4c2gHlHAFcRGz/t5mA0l4OLuTyYkqWQSaLhy9qGl5NUcPRFY+1qJOZvaB8YDmwrpFd8KLF3u9/tRYsYTpsITmMQZg1ifJojQ3yEEjxRDoTcBOyKj8E1SxiWe6X4+16mZ7Q/ekqdGBhDRMQtDfJu/DHN/68F/UbMG0RgynlgrCKMGRToLE7Bhf1bMWOWYcnGxcp4BB445aum3VRDRFwiIgom2nSYT8NjUVz3pEqKyQwepouEmC0R4xeTFEsVEixYuVju9sLyNGut1UqXBP4k/88QCT6UVM6mwW5f7z8v8308V8I4+P45PiZSuJjW+sJZ7eW+c8L78ZEi1sD2TZRKRF7rp6IAIpmaqKrCj8ZO8nycdiH7fkcE+/5nSt+5epXPcKacXUFE8v+Nn4ITQhS1lU0aZQAVJgZQQXQgpfOJIomIs17+B2O9wdZQOBe6AAAAAElFTkSuQmCC)}' 
			+ '}';
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
			sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
		} else if (icon == 1) {
			var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
			+ '#TabsToolbar #Firefox-button-mod {background: none !important;}' 
			+ '#Firefox-button-mod .toolbarbutton-icon' 
			+ '{list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBklEQVQ4jc3QTWqDQBiA4TlE9hISgzFDWss0UoOhP8RQxGpTi6KGhI4km0qadpUusvMK9YbuFTeji69XcGihfeG5wIvQnyf05HSACRsqGsgX01aGigYiJkzoySnClzNmOCFY3gsXwwlgPLmu0L3tZws3qu0gBh6LZdgYjveF8jzvFEUhlmU54FEUhZjneecXJvZxKp2pDBMdMJm1pIM0VpnQxyk6v5ozy6fgbl65WB4FZTqv0IO7yh7Dbe3Hb8DDDnaN+Rz9h4ldiaQjojNFuwMeI6KzrkRSNLkxmRfvYZ0cYZN8trJOjuDRPai3ZoWeVnEWbt9rejhB3BI9nCDYfTTLiP584jcbAp7PWNgDOQAAAABJRU5ErkJggg==)}' 
			+ '}';
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
			sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
		} else if (icon == 2) {
			var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
			+ '#TabsToolbar #Firefox-button-mod {background: none !important;}' 
			+ '#Firefox-button-mod .toolbarbutton-icon{' 
			+ 'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAQCAYAAAB+690jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsdJREFUeNrMVltrE0EUntndNNWEtFZjbEsrtqmRmksx+guKlEIQfRAR9En0QXzzd/gu2EdfvSBFCJKCN1BrMSWgsUqb2IZeTGqbNCGb3dnxnJCUcXvJ+NbAxwyZc749c/abb5ZyzslB+lFHR087jMcAHoDSIt4CFAF5QFVcMB7lHDC4AMhHW/DwRn4ZU8UFDeBLxCfvnwmcPiKzg/T3uT+jY7EHMM3+s7Dy0zMaGog7VCUqw2MwayaRmh8jJ/wFe0GdQ0NDTpNZJRkijMUce0H09y93yTgVrelM6tW0KSSKOdxWkAK90z9+mt6EuSkDjMWcHU/IpdnmZjFpmiaRAcZizg4NaZ6eLtw4vPXuRsewAx0A9y6aMkEcqzAuADZETbFozEmo0ke0tuPApRCnS+Me7yHS7nYSRbVpijPSdrhAuv1L3H+hKGqKqp4etVEEipJSSvrik89uhIJnXTKt//otXbo4fumhxcmSyMPH73Wdu3b7qcPhiMjwmBafmc7mxzSFEmxbRVg7OTw8bIKm1mWIAoEAbqiTTeSyIg9NTXWsV61IrVKV1BSta0rZ5Tzqb9+9rzSOY0tg7F6aKpaKScMwiAwwFnPQh5oUTT/qBwzCQ3wNTe3lR1uAAuwgA+MPcyLX7Gjdj+jcBy9ZXegntcpR6Je6OwvjpLql042VLVIpLhNuLYoP9L188eT6SCTcLtPimS9JLXb56hsofJ6IHQI/GnDTuNrrjZJeb0sexthsZur5Ffr6MR4WXSyoMxQM6obJyjIFjYTDGhwdFQ5BXTdM8KM88UV1JnclOVUa4YPnLWsiV+dRRO3EXyUMWT/C2L20Uy5XpP0IY0U/0gQ1r926c3da8KN9TynEL8O4Zr+1aGa2xLOpm9t+tP+NZhGztka5VeL2guAPdOsUTNKSlyN2U7cH0s+TKHbU1eL/8GznH7TPj78CDAD/U5+2FYl1DgAAAABJRU5ErkJggg==") !important;' + '}' + '#Firefox-button-mod:not(:hover) .toolbarbutton-icon {' 
			+ '-moz-image-region: rect(0px 18px 16px 0px) !important;' 
			+ '-moz-transition: all 0.2s !important;' 
			+ '}' 
			+ '#Firefox-button-mod:hover .toolbarbutton-icon {' 
			+ '-moz-image-region: rect(0px 36px 16px 18px) !important;' 
			+ '-moz-transition: all 0.2s !important;' 
			+ '}' 
			+ '}';
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
			sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
		}
	} else if (Mode == 1) {
		if (picon == 1) {
			var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
			+ '#PanelUI-menu-button{'
			+ 'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADnElEQVQ4jW2TbVDTBRzHf7DxtME2trGBMlkSjosEDBnHw44G88CrgK5jyJEVmgrF3MY2xkgeQrjUIuQ0sUsaEdQbOMSHIASRKMRAp1ypPP03yLvslDsLo7tk+/auM67P68/n5YfoaaRmbmjmJ+qE0p5T2YeHbph6bj/c2+F4qD50YeqFvGPHZVtKVeGUH0DrYOmzxYpnZRmRlGW3JjRNzBkHZ9E4OoOu+RW0z/yOqn4Hqk586GmuU989qVdY6vIEgn9rYzgJJ/eGtLW8mX3rJWPLH3X2Dk9fmw62zh7Ujv+G8sEFlPTdQVnTaXzVnOhZcjyzOv7lhvaje/wURORNOiGFX32NP/Jr4/OY+yAJTM1mnNXFYd/pARw4v4DinhnovnHhjc+vIzanEnV1qVi+KXxyzR7elf+iPJSq04OSr+8X3nWZBXCZRGDKgzGmFeHy20q839CAvLabyG2dQnrDIDLqR6HRt2HoYwVcwxHzDdbNafS1VlLvqpA+YUxiOE1SLFaG4V59DDqtr2LnwSak1lxEqPYjcDWViC/pQpbejonODDz6ecuKvdFPR2fzRb0uiwSMOQSMSYLpMhmu1CZjj6ESqveGsKP2EiQ7a8GKfQviNAuUeTbc6o+D26Vyd9cEtVO7mvctYxTDaZZiKCsQZ+T+2JFegPjXzyBFdw4a83lE5RwDS5YLf5EGFcUaPBoIhnsmDO1VYV/Q8diAvvkyERiTFN9p/PBDKgvn3k1Fld6MVts+jJwqQc6ug/AOTANPoEZXcwE8I8F47FCstVTHHSXLRjI6Crmri4c2gHlHAFcRGz/t5mA0l4OLuTyYkqWQSaLhy9qGl5NUcPRFY+1qJOZvaB8YDmwrpFd8KLF3u9/tRYsYTpsITmMQZg1ifJojQ3yEEjxRDoTcBOyKj8E1SxiWe6X4+16mZ7Q/ekqdGBhDRMQtDfJu/DHN/68F/UbMG0RgynlgrCKMGRToLE7Bhf1bMWOWYcnGxcp4BB445aum3VRDRFwiIgom2nSYT8NjUVz3pEqKyQwepouEmC0R4xeTFEsVEixYuVju9sLyNGut1UqXBP4k/88QCT6UVM6mwW5f7z8v8308V8I4+P45PiZSuJjW+sJZ7eW+c8L78ZEi1sD2TZRKRF7rp6IAIpmaqKrCj8ZO8nycdiH7fkcE+/5nSt+5epXPcKacXUFE8v+Nn4ITQhS1lU0aZQAVJgZQQXQgpfOJIomIs17+B2O9wdZQOBe6AAAAAElFTkSuQmCC") !important;'
			+'-moz-image-region: rect(0px 16px 16px 0px) !important;'
			+ '}'
			+ '}';
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
			sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
		} else if (picon == 2) {
			var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
			+ '#PanelUI-menu-button{'
			+ 'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAQCAYAAAB+690jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsdJREFUeNrMVltrE0EUntndNNWEtFZjbEsrtqmRmksx+guKlEIQfRAR9En0QXzzd/gu2EdfvSBFCJKCN1BrMSWgsUqb2IZeTGqbNCGb3dnxnJCUcXvJ+NbAxwyZc749c/abb5ZyzslB+lFHR087jMcAHoDSIt4CFAF5QFVcMB7lHDC4AMhHW/DwRn4ZU8UFDeBLxCfvnwmcPiKzg/T3uT+jY7EHMM3+s7Dy0zMaGog7VCUqw2MwayaRmh8jJ/wFe0GdQ0NDTpNZJRkijMUce0H09y93yTgVrelM6tW0KSSKOdxWkAK90z9+mt6EuSkDjMWcHU/IpdnmZjFpmiaRAcZizg4NaZ6eLtw4vPXuRsewAx0A9y6aMkEcqzAuADZETbFozEmo0ke0tuPApRCnS+Me7yHS7nYSRbVpijPSdrhAuv1L3H+hKGqKqp4etVEEipJSSvrik89uhIJnXTKt//otXbo4fumhxcmSyMPH73Wdu3b7qcPhiMjwmBafmc7mxzSFEmxbRVg7OTw8bIKm1mWIAoEAbqiTTeSyIg9NTXWsV61IrVKV1BSta0rZ5Tzqb9+9rzSOY0tg7F6aKpaKScMwiAwwFnPQh5oUTT/qBwzCQ3wNTe3lR1uAAuwgA+MPcyLX7Gjdj+jcBy9ZXegntcpR6Je6OwvjpLql042VLVIpLhNuLYoP9L188eT6SCTcLtPimS9JLXb56hsofJ6IHQI/GnDTuNrrjZJeb0sexthsZur5Ffr6MR4WXSyoMxQM6obJyjIFjYTDGhwdFQ5BXTdM8KM88UV1JnclOVUa4YPnLWsiV+dRRO3EXyUMWT/C2L20Uy5XpP0IY0U/0gQ1r926c3da8KN9TynEL8O4Zr+1aGa2xLOpm9t+tP+NZhGztka5VeL2guAPdOsUTNKSlyN2U7cH0s+TKHbU1eL/8GznH7TPj78CDAD/U5+2FYl1DgAAAABJRU5ErkJggg==") !important;'
			+ '}'
			+ '#PanelUI-button:not(:hover) #PanelUI-menu-button {'
			+ '-moz-image-region: rect(0px 18px 16px 0px) !important;'
			+ '-moz-transition: all 0.2s !important;'
			+ '}'
			+ '#PanelUI-button:hover #PanelUI-menu-button {'
			+ '-moz-image-region: rect(0px 36px 16px 18px) !important;'
			+ '-moz-transition: all 0.2s !important;'
			+ '}'
			+ '}';
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
			sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
		}
	};
	
})();
