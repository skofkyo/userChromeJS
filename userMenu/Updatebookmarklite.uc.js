// ==UserScript==
// @name           Updatebookmarklite.uc.js
// @description    書籤維護
// @author         danny
// @include        main
// @compatibility  Firefox 11.0 10.0+
// @include        chrome://browser/content/places/places.xul
// @include        chrome://browser/content/bookmarks/bookmarksPanel.xul
// @charset              UTF-8
// ==/UserScript==
var updatebookmark = {
	init: function() {
		window.addEventListener("load", updatebookmark.onload, false);
		window.setTimeout("updatebookmark.onload();", 0);
	},

	uninit: function(event) {
		var plaMenu = document.getElementById("placesContext");
		var menubook1 = document.getElementById("updatebookmarkUpdateCurrentURLMenuItem");
		var menubook2 = document.getElementById("updatebookmarkUpdateCurrentTitleMenuItem");
		var menubook3 = document.getElementById("addnewbookmarkMenuItem");
		if (menubook1 && plaMenu) {
			plaMenu.removeChild(menubook1);
		}
		if (menubook2 && plaMenu) {
			plaMenu.removeChild(menubook2);
		}
		if (menubook3 && plaMenu) {
			plaMenu.removeChild(menubook3);
		}
		window.removeEventListener("load", updatebookmark.onload, false);
	},

	onload: function() {
		var placesContextMenu = document.getElementById("placesContext");
		var menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "updatebookmarkUpdateCurrentURLMenuItem");
		menuItem.setAttribute("label", "更新為當前網址");
		menuItem.setAttribute("oncommand", "updatebookmark.updateURL();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute('image', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAFLklEQVRIib2VfUxTZxSHXydOo50OHA4R6b0tvRSnRcWRWec0fiBO6IxaMTgopaVgaytQYCDKLlERBEHp+KioKPiVEhKJEQooFxEUtNZCaZmAYEEQhjIzl6n4cfbH4mIWtbDBnr9/5zw5J3nPi9AoQObWbgiMOskZjV5W0el0E8LSG8+vjy7TeHlFTRlzYcEFk/O6+Nt3udvrhjYqiyWj2pzMomjBKbWu30Vrl3rtKFm9VHTaU37wWjBXdvXpF+Lr4KW80sbblv3fVguAxh04bWYJU3Rx3tF11V9tq+pxF1U8mSco/YMjuPjYI6Rs0E1Q8ZotrIaFsgbwjbt0jvNvV0uZfqGlFVnk6xN07e7iqtdsQQW4CirBNagSCGEFEEItsIRaIETlQEiqwFVaB9zYG8945MWwEcsutdyfrtL2HfFLa3u+IMIA7LA6cA2tBtewaiCkV4CQ1QCxvRpY2ylgySlg7agGVmQdsGNvwsr9N+5+S2rmj2iyvNpHeWEnul/5HuqElakd4JFgBnZkAxCKGmCFXwVCeQ1YP9QDK64eXHZeB5f4enDZ3QAu5C2Yl2KEtVm6oiUxxz4ZljBP/6si6kL/88DCbtiY2fR0RXz5zwtDCkvw9ZmqWV77khy9Uw4wNuUWzk+of+iyvwlckg3ATDEAM7URmOnNwMxoBs7eqn73QNLTquwnw29EDDXYtuWY6ZnPzjPahb7yIHun+SyEEA0hNP5Nbs+JOuby/NYORtYdYOa0AlPdBoxsMzjvoZ44inMqP+UGBSFkO82qMKruYfyG3Gv3F22OjqDRaDPel4u7ZPHxOGd5hhdagHG8HZyTax45iFTF0xbxNyFEsx/WKkld72R/dUXe3LWhfgghmw9lQ6r7kthnO2F2MtXrEJR+YgqH540Qsj7R2ywnKZuv/WQEQmjCh3KZpaUTeapKtYMwNXsSsXIpQmisTxr5Ed1tzUyE0KQxFv3P5Bn7P1doW4WesozFw4iP4/M1463H3sFRfS89orYvglc5oPc8axp05u9Yba3mUHmLDz8h32rub0iS/Eit62QrLj8g11140MLRPHiJneoFRvrlxumE+6z31el0ugnq2gF/ZXGTcYF/xCqrIoqibA5ftXjItF0ZXppuy5z8rtd0tQXouV2A53QAFltwDL3jyZAkZZNd1sHZV96fJSvpf7IpraQUIWRrVSgoqleuKrw34JZ1F+jprUBPawUstRWwA+3ASG0BN/L8EZ6qYdHW4/o5YQWNcyPOtCxTajolkZru0/Kivh6x5iGEnmwa9A6Qb7AqQwghPFGtdE4yvMT23gEs0QTYj0bAdjcDtqsZ8F0mIMjmoXl7jI+/TGrqX5JsHliW2vH7mozuV76qHtis7gPp8bYX38ccPogQmjws4VQR3252bHEZvtMMeIwRMOVtwCJuARauB0xxGzCFATB5I2AyA2BSA+CyZpgb1Q7LErvAL9U85K/Myf+MTp85LNkbHKXxXHp4VQ9DYQZcqgdM0gBYSD1g4gbARTcAF+kAF90CTKgDXKgDllgPS+TUwJqgfcn29pjDiGRvcJKqYhjSmy8YIUbAhTcBC7wCzgHlQA+gAAusASywBvCt1EvmlpI+Ni+zmL3YzwcNd43vYpr/Olt66LmLTIkJGMFN4OR/9J7dasFh27XhJ6d7R5+yXxWjcuSGy2ewvbhopEf7fcwKjlqMSSrvM0OM4MRPLEAITUR/HfaP0Vt/46jiJD4UzRCXDTn6SGRjIvgnU0UiO8eAyHy7b1ZwR6PfnyF7a/YIepR1AAAAAElFTkSuQmCC");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[8]);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "updatebookmarkUpdateCurrentTitleMenuItem");
		menuItem.setAttribute("label", "更新為當前標題");
		menuItem.setAttribute("oncommand", "updatebookmark.updateTitle();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute('image', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAFLklEQVRIib2VfUxTZxSHXydOo50OHA4R6b0tvRSnRcWRWec0fiBO6IxaMTgopaVgaytQYCDKLlERBEHp+KioKPiVEhKJEQooFxEUtNZCaZmAYEEQhjIzl6n4cfbH4mIWtbDBnr9/5zw5J3nPi9AoQObWbgiMOskZjV5W0el0E8LSG8+vjy7TeHlFTRlzYcEFk/O6+Nt3udvrhjYqiyWj2pzMomjBKbWu30Vrl3rtKFm9VHTaU37wWjBXdvXpF+Lr4KW80sbblv3fVguAxh04bWYJU3Rx3tF11V9tq+pxF1U8mSco/YMjuPjYI6Rs0E1Q8ZotrIaFsgbwjbt0jvNvV0uZfqGlFVnk6xN07e7iqtdsQQW4CirBNagSCGEFEEItsIRaIETlQEiqwFVaB9zYG8945MWwEcsutdyfrtL2HfFLa3u+IMIA7LA6cA2tBtewaiCkV4CQ1QCxvRpY2ylgySlg7agGVmQdsGNvwsr9N+5+S2rmj2iyvNpHeWEnul/5HuqElakd4JFgBnZkAxCKGmCFXwVCeQ1YP9QDK64eXHZeB5f4enDZ3QAu5C2Yl2KEtVm6oiUxxz4ZljBP/6si6kL/88DCbtiY2fR0RXz5zwtDCkvw9ZmqWV77khy9Uw4wNuUWzk+of+iyvwlckg3ATDEAM7URmOnNwMxoBs7eqn73QNLTquwnw29EDDXYtuWY6ZnPzjPahb7yIHun+SyEEA0hNP5Nbs+JOuby/NYORtYdYOa0AlPdBoxsMzjvoZ44inMqP+UGBSFkO82qMKruYfyG3Gv3F22OjqDRaDPel4u7ZPHxOGd5hhdagHG8HZyTax45iFTF0xbxNyFEsx/WKkld72R/dUXe3LWhfgghmw9lQ6r7kthnO2F2MtXrEJR+YgqH540Qsj7R2ywnKZuv/WQEQmjCh3KZpaUTeapKtYMwNXsSsXIpQmisTxr5Ed1tzUyE0KQxFv3P5Bn7P1doW4WesozFw4iP4/M1463H3sFRfS89orYvglc5oPc8axp05u9Yba3mUHmLDz8h32rub0iS/Eit62QrLj8g11140MLRPHiJneoFRvrlxumE+6z31el0ugnq2gF/ZXGTcYF/xCqrIoqibA5ftXjItF0ZXppuy5z8rtd0tQXouV2A53QAFltwDL3jyZAkZZNd1sHZV96fJSvpf7IpraQUIWRrVSgoqleuKrw34JZ1F+jprUBPawUstRWwA+3ASG0BN/L8EZ6qYdHW4/o5YQWNcyPOtCxTajolkZru0/Kivh6x5iGEnmwa9A6Qb7AqQwghPFGtdE4yvMT23gEs0QTYj0bAdjcDtqsZ8F0mIMjmoXl7jI+/TGrqX5JsHliW2vH7mozuV76qHtis7gPp8bYX38ccPogQmjws4VQR3252bHEZvtMMeIwRMOVtwCJuARauB0xxGzCFATB5I2AyA2BSA+CyZpgb1Q7LErvAL9U85K/Myf+MTp85LNkbHKXxXHp4VQ9DYQZcqgdM0gBYSD1g4gbARTcAF+kAF90CTKgDXKgDllgPS+TUwJqgfcn29pjDiGRvcJKqYhjSmy8YIUbAhTcBC7wCzgHlQA+gAAusASywBvCt1EvmlpI+Ni+zmL3YzwcNd43vYpr/Olt66LmLTIkJGMFN4OR/9J7dasFh27XhJ6d7R5+yXxWjcuSGy2ewvbhopEf7fcwKjlqMSSrvM0OM4MRPLEAITUR/HfaP0Vt/46jiJD4UzRCXDTn6SGRjIvgnU0UiO8eAyHy7b1ZwR6PfnyF7a/YIepR1AAAAAElFTkSuQmCC");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[9]);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "addnewbookmarkMenuItem");
		menuItem.setAttribute("label", "在此書籤後面添加新書簽");
		menuItem.setAttribute("oncommand", "updatebookmark.appendURL();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute('image', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAABt0lEQVR42mNgwAP449etAOLZDOQCvui1pqIll/8LF57/yxO7TocsQ8Qyd28Tr3v6X7zuyX+xjJ1rSDaAO26NnkjJlX8QQ57+Fym+9Jc3YY0G0QZwRiyXFU/fuQVmAMw1Imk71nPGrZLG7vfYtbGgwONPWHdCIGH9B8Hkbf9FS6/8RzXk6X/Rkiv/BZO3/uePX/9eIG79Uf64tbOA6gPEqh/HMghnH/woUnThv2j5zf/iNY8wNGNgoBqQWpAekcx9L8VqH39gyF3zukii7vFvgprRsFT94x9l619nidU8cmP4+PGjUMbKN1XiJBgEshRk+fv37wXg4fLp0yeRxGWvG4EB+JcYAzJXvKkEWY4RwJ8/fxYz7nmyk5AhFv3PNoAsxRm9ClWXjxIyRKniwi68aUS64uozQobIVF69jdsEn5lcopX3/qLFwCep+idfUQyqvPWTIXQVM1YzRFPXG4BSJlTzd8epL5acuv/DY9/Nr962k5+vkqx7/ANsSC0wLyWuUcJqiHX9EROQzZYTXqzfdOlTwPfv35X279/PcubMGdYfP34orz33OcSs/9kW6fonnywr96PkIwDJHpLLwNBhgQAAAABJRU5ErkJggg==");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[10]);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "updatebookmarkMenuItem");
		menuItem.setAttribute("label", "替換當前書籤");
		menuItem.setAttribute("oncommand", "updatebookmark.updatebookreplace();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute('image', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAFLklEQVRIib2VfUxTZxSHXydOo50OHA4R6b0tvRSnRcWRWec0fiBO6IxaMTgopaVgaytQYCDKLlERBEHp+KioKPiVEhKJEQooFxEUtNZCaZmAYEEQhjIzl6n4cfbH4mIWtbDBnr9/5zw5J3nPi9AoQObWbgiMOskZjV5W0el0E8LSG8+vjy7TeHlFTRlzYcEFk/O6+Nt3udvrhjYqiyWj2pzMomjBKbWu30Vrl3rtKFm9VHTaU37wWjBXdvXpF+Lr4KW80sbblv3fVguAxh04bWYJU3Rx3tF11V9tq+pxF1U8mSco/YMjuPjYI6Rs0E1Q8ZotrIaFsgbwjbt0jvNvV0uZfqGlFVnk6xN07e7iqtdsQQW4CirBNagSCGEFEEItsIRaIETlQEiqwFVaB9zYG8945MWwEcsutdyfrtL2HfFLa3u+IMIA7LA6cA2tBtewaiCkV4CQ1QCxvRpY2ylgySlg7agGVmQdsGNvwsr9N+5+S2rmj2iyvNpHeWEnul/5HuqElakd4JFgBnZkAxCKGmCFXwVCeQ1YP9QDK64eXHZeB5f4enDZ3QAu5C2Yl2KEtVm6oiUxxz4ZljBP/6si6kL/88DCbtiY2fR0RXz5zwtDCkvw9ZmqWV77khy9Uw4wNuUWzk+of+iyvwlckg3ATDEAM7URmOnNwMxoBs7eqn73QNLTquwnw29EDDXYtuWY6ZnPzjPahb7yIHun+SyEEA0hNP5Nbs+JOuby/NYORtYdYOa0AlPdBoxsMzjvoZ44inMqP+UGBSFkO82qMKruYfyG3Gv3F22OjqDRaDPel4u7ZPHxOGd5hhdagHG8HZyTax45iFTF0xbxNyFEsx/WKkld72R/dUXe3LWhfgghmw9lQ6r7kthnO2F2MtXrEJR+YgqH540Qsj7R2ywnKZuv/WQEQmjCh3KZpaUTeapKtYMwNXsSsXIpQmisTxr5Ed1tzUyE0KQxFv3P5Bn7P1doW4WesozFw4iP4/M1463H3sFRfS89orYvglc5oPc8axp05u9Yba3mUHmLDz8h32rub0iS/Eit62QrLj8g11140MLRPHiJneoFRvrlxumE+6z31el0ugnq2gF/ZXGTcYF/xCqrIoqibA5ftXjItF0ZXppuy5z8rtd0tQXouV2A53QAFltwDL3jyZAkZZNd1sHZV96fJSvpf7IpraQUIWRrVSgoqleuKrw34JZ1F+jprUBPawUstRWwA+3ASG0BN/L8EZ6qYdHW4/o5YQWNcyPOtCxTajolkZru0/Kivh6x5iGEnmwa9A6Qb7AqQwghPFGtdE4yvMT23gEs0QTYj0bAdjcDtqsZ8F0mIMjmoXl7jI+/TGrqX5JsHliW2vH7mozuV76qHtis7gPp8bYX38ccPogQmjws4VQR3252bHEZvtMMeIwRMOVtwCJuARauB0xxGzCFATB5I2AyA2BSA+CyZpgb1Q7LErvAL9U85K/Myf+MTp85LNkbHKXxXHp4VQ9DYQZcqgdM0gBYSD1g4gbARTcAF+kAF90CTKgDXKgDllgPS+TUwJqgfcn29pjDiGRvcJKqYhjSmy8YIUbAhTcBC7wCzgHlQA+gAAusASywBvCt1EvmlpI+Ni+zmL3YzwcNd43vYpr/Olt66LmLTIkJGMFN4OR/9J7dasFh27XhJ6d7R5+yXxWjcuSGy2ewvbhopEf7fcwKjlqMSSrvM0OM4MRPLEAITUR/HfaP0Vt/46jiJD4UzRCXDTn6SGRjIvgnU0UiO8eAyHy7b1ZwR6PfnyF7a/YIepR1AAAAAElFTkSuQmCC");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[11]);
		placesContextMenu.addEventListener("popupshowing", updatebookmark.onpopup, false);
	},

	onpopup: function(event) {
		// show only when single item is clicked and when item is link
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}

		var menubook1 = document.getElementById('updatebookmarkUpdateCurrentURLMenuItem');
		var menubook2 = document.getElementById('updatebookmarkUpdateCurrentTitleMenuItem');
		var menubook3 = document.getElementById('addnewbookmarkMenuItem');
		var menubook4 = document.getElementById('updatebookmarkMenuItem');
		var activeContent = top.window.document.getElementById("content");
		var activeBrowser = activeContent.selectedBrowser;
		var newurlValue = activeBrowser.currentURI.spec;
		if (newurlValue == "about:blank" || newurlValue == "about:home") {
			if (menubook1) menubook1.hidden = true;
			if (menubook2) menubook2.hidden = true;
			if (menubook3) menubook3.hidden = true;
			if (menubook4) menubook4.hidden = true;
		} else {
			if (isSingleLink) {
				var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
				var oldurl = oldURI.spec;
				var oldtitleValue = PlacesUtils.bookmarks.getItemTitle(node.itemId);
				var newURI = Cc["@mozilla.org/network/io-service;1"].
				getService(Ci.nsIIOService).
				newURI(newurlValue, null, null);
				var newurl = newURI.spec;
				var newtitleValue = activeBrowser.contentTitle;

				//如果标题或地址与当前tab的符合,显示弹出菜单spec
				if (oldurl == newurl || oldtitleValue == newtitleValue) {
					if (menubook1) menubook1.hidden = false;
					if (menubook2) menubook2.hidden = false;
					if (menubook3) menubook3.hidden = true;
					if (menubook4) menubook4.hidden = true;
					return;
				} else {
					if (menubook1) menubook1.hidden = true;
					if (menubook2) menubook2.hidden = true;
					if (menubook3) {
						menubook3.hidden = false;
						menubook3.setAttribute("label", "在此書籤後面添加新書簽");
					}
					if (menubook4) menubook4.hidden = false;
					return;
				}
			} else {
				if (menubook1) menubook1.hidden = true;
				if (menubook2) menubook2.hidden = true;
				if (menubook3) {
					menubook3.hidden = true;
					menubook3.setAttribute("label", "在此資料夾添加新書簽");
				}
				if (menubook4) menubook4.hidden = true;
			}
		}
	},

	updateURL: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.currentURI.spec;
			var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
			var newURI = Cc["@mozilla.org/network/io-service;1"].
			getService(Ci.nsIIOService).
			newURI(newValue, null, null);

			// add old tags onto new uri
			var oldValueTags = PlacesUtils.tagging.getTagsForURI(oldURI, {});
			PlacesUtils.tagging.tagURI(newURI, oldValueTags);
			PlacesUtils.bookmarks.changeBookmarkURI(node.itemId, newURI);
		} catch (ex) {
			alert("無法更新書籤. 無效的URL.");
		}
	},

	updateTitle: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.contentTitle;
			PlacesUtils.bookmarks.setItemTitle(node.itemId, newValue);
		} catch (ex) {
			alert(ex.message);
		}
	},

	updatebookreplace: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.currentURI.spec;
			var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
			var items = ["更新標題和網址", "僅更新網址", "僅更新標題"]; // list items  
			var uselected = {};
			var result = prompts.select(null, "Title", "What greeting do you want?", items.length, items, uselected);
			if (result) {
				var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
				var newURI = Cc["@mozilla.org/network/io-service;1"].
				getService(Ci.nsIIOService).
				newURI(newValue, null, null);
				//add old tags onto new uri
				var newtitleValue = activeBrowser.contentTitle;
				if (uselected.value == 0 || uselected.value == 2)
					PlacesUtils.bookmarks.setItemTitle(node.itemId, newtitleValue);
				if (uselected.value == 0 || uselected.value == 1) {
					var oldValueTags = PlacesUtils.tagging.getTagsForURI(oldURI, {});
					PlacesUtils.tagging.tagURI(newURI, oldValueTags);
					PlacesUtils.bookmarks.changeBookmarkURI(node.itemId, newURI);
				}
			}
		} catch (ex) {
			alert("無法更新書籤. 無效的URL.");
		}
	},

	appendURL: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.currentURI.spec;
			var newtitle = activeBrowser.contentTitle;
			var newURI = Cc["@mozilla.org/network/io-service;1"].
			getService(Ci.nsIIOService).
			newURI(newValue, null, null);
			if (isSingleLink) {
				var pnodeid = PlacesUtils.bookmarks.getFolderIdForItem(node.itemId);
				PlacesUtils.bookmarks.insertBookmark(pnodeid, newURI, PlacesUtils.bookmarks.getItemIndex(node.itemId) + 1, newtitle);
			} else {
				var pnodeid = node.itemId;
				PlacesUtils.bookmarks.insertBookmark(pnodeid, newURI, 'DEFAULT_INDEX', newtitle);
			}
		} catch (ex) {
			alert(ex.message);
		}
	}
};
updatebookmark.init();
window.addEventListener("unload", function(event) {
	updatebookmark.uninit(event);
}, false);
