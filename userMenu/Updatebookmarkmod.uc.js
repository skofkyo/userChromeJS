// ==UserScript==
// @name           updatebookmarklite.uc.js/Add Bookmark Here
// @author         danny/zbinlin
// @include        main
// @compatibility  Firefox 29+
// @include        chrome://browser/content/places/places.xul
// @include        chrome://browser/content/bookmarks/bookmarksPanel.xul
// @charset              UTF-8
// ==/UserScript==

(function () {
    if (window.AddBookmarkHere) return;
    var AddBookmarkHere = {
        init: function () {
            var placesContext = document.getElementById("placesContext");
            if (!placesContext) return;
            var self = this;
            window.addEventListener("unload", function (e) {
                window.removeEventListener("unload", arguments.callee, false);
                self.uninit();
            }, false);
            this.addContextMenu(placesContext, document.getElementById("placesContext_openSeparator").nextSibling);
        },
        addContextMenu: function (parentNode, afterNode) {
            var menuitem = document.createElement("menuitem");
            menuitem.id = "placesContext_add:bookmark";
            menuitem.setAttribute("label", "在此書籤後面添加新書簽");
            menuitem.setAttribute("accesskey", "h");
            menuitem.setAttribute("selection", "any");
            menuitem.addEventListener("command", this.addBookmark, false);
            parentNode.insertBefore(menuitem, afterNode);
        },
        addBookmark: function (e) {
            var popupNode = e.currentTarget.parentNode.triggerNode;
            if (!popupNode) return;
            var view = PlacesUIUtils.getViewForNode(popupNode);
            if (!view) return;
            var bookmarks = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService);
            var selectedNode = view.selectedNode;
            var iid, aid;
            if (selectedNode) {
                if (PlacesUtils.nodeIsFolder(selectedNode) && !PlacesUtils.nodeIsTagQuery(selectedNode) && !PlacesUtils.isReadonlyFolder(selectedNode)) {
                    iid = selectedNode.itemId;
                    aid = e.shiftKey ? 0 : bookmarks.DEFAULT_INDEX;
                } else {
                    iid = bookmarks.getFolderIdForItem(selectedNode.itemId);
                    var id = bookmarks.getItemIndex(selectedNode.itemId);
                    aid = e.shiftKey ? id : id + 1;
                }
            } else {
                iid = view.result.root.folderItemId;
                aid = e.shiftKey ? 0 : bookmarks.DEFAULT_INDEX;
            }
            //var doc = gBrowser.getBrowserForTab(gBrowser.mCurrentTab).contentDocument;
            var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                       .getInterface(Components.interfaces.nsIWebNavigation)
                       .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                       .rootTreeItem
                       .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                       .getInterface(Components.interfaces.nsIDOMWindow);
            var doc = mainWindow.gBrowser.getBrowserForTab(mainWindow.gBrowser.mCurrentTab).contentDocument;
            var uri = Services.io.newURI(doc.location.toString(), null, null);
            var title = doc.title;
            bookmarks.insertBookmark(iid, uri, aid, title);
        },
        uninit: function () {
            try {
                var menuitem = document.getElementById("placesContext_add:bookmark");
                menuitem.removeEventListener("command", this.addBookmark, false);
            } catch (ex) {
            }
        }
    };

        AddBookmarkHere.init();
        window.AddBookmarkHere = AddBookmarkHere;

})();

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
        placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[7]);
        menuItem = document.createElement("menuitem");
        menuItem.setAttribute("id", "updatebookmarkUpdateCurrentTitleMenuItem");
        menuItem.setAttribute("label", "更新為當前標題");
        menuItem.setAttribute("oncommand", "updatebookmark.updateTitle();");
        menuItem.setAttribute("closemenu", "single");
        menuItem.setAttribute("selection", "link");
        menuItem.setAttribute('image', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAFLklEQVRIib2VfUxTZxSHXydOo50OHA4R6b0tvRSnRcWRWec0fiBO6IxaMTgopaVgaytQYCDKLlERBEHp+KioKPiVEhKJEQooFxEUtNZCaZmAYEEQhjIzl6n4cfbH4mIWtbDBnr9/5zw5J3nPi9AoQObWbgiMOskZjV5W0el0E8LSG8+vjy7TeHlFTRlzYcEFk/O6+Nt3udvrhjYqiyWj2pzMomjBKbWu30Vrl3rtKFm9VHTaU37wWjBXdvXpF+Lr4KW80sbblv3fVguAxh04bWYJU3Rx3tF11V9tq+pxF1U8mSco/YMjuPjYI6Rs0E1Q8ZotrIaFsgbwjbt0jvNvV0uZfqGlFVnk6xN07e7iqtdsQQW4CirBNagSCGEFEEItsIRaIETlQEiqwFVaB9zYG8945MWwEcsutdyfrtL2HfFLa3u+IMIA7LA6cA2tBtewaiCkV4CQ1QCxvRpY2ylgySlg7agGVmQdsGNvwsr9N+5+S2rmj2iyvNpHeWEnul/5HuqElakd4JFgBnZkAxCKGmCFXwVCeQ1YP9QDK64eXHZeB5f4enDZ3QAu5C2Yl2KEtVm6oiUxxz4ZljBP/6si6kL/88DCbtiY2fR0RXz5zwtDCkvw9ZmqWV77khy9Uw4wNuUWzk+of+iyvwlckg3ATDEAM7URmOnNwMxoBs7eqn73QNLTquwnw29EDDXYtuWY6ZnPzjPahb7yIHun+SyEEA0hNP5Nbs+JOuby/NYORtYdYOa0AlPdBoxsMzjvoZ44inMqP+UGBSFkO82qMKruYfyG3Gv3F22OjqDRaDPel4u7ZPHxOGd5hhdagHG8HZyTax45iFTF0xbxNyFEsx/WKkld72R/dUXe3LWhfgghmw9lQ6r7kthnO2F2MtXrEJR+YgqH540Qsj7R2ywnKZuv/WQEQmjCh3KZpaUTeapKtYMwNXsSsXIpQmisTxr5Ed1tzUyE0KQxFv3P5Bn7P1doW4WesozFw4iP4/M1463H3sFRfS89orYvglc5oPc8axp05u9Yba3mUHmLDz8h32rub0iS/Eit62QrLj8g11140MLRPHiJneoFRvrlxumE+6z31el0ugnq2gF/ZXGTcYF/xCqrIoqibA5ftXjItF0ZXppuy5z8rtd0tQXouV2A53QAFltwDL3jyZAkZZNd1sHZV96fJSvpf7IpraQUIWRrVSgoqleuKrw34JZ1F+jprUBPawUstRWwA+3ASG0BN/L8EZ6qYdHW4/o5YQWNcyPOtCxTajolkZru0/Kivh6x5iGEnmwa9A6Qb7AqQwghPFGtdE4yvMT23gEs0QTYj0bAdjcDtqsZ8F0mIMjmoXl7jI+/TGrqX5JsHliW2vH7mozuV76qHtis7gPp8bYX38ccPogQmjws4VQR3252bHEZvtMMeIwRMOVtwCJuARauB0xxGzCFATB5I2AyA2BSA+CyZpgb1Q7LErvAL9U85K/Myf+MTp85LNkbHKXxXHp4VQ9DYQZcqgdM0gBYSD1g4gbARTcAF+kAF90CTKgDXKgDllgPS+TUwJqgfcn29pjDiGRvcJKqYhjSmy8YIUbAhTcBC7wCzgHlQA+gAAusASywBvCt1EvmlpI+Ni+zmL3YzwcNd43vYpr/Olt66LmLTIkJGMFN4OR/9J7dasFh27XhJ6d7R5+yXxWjcuSGy2ewvbhopEf7fcwKjlqMSSrvM0OM4MRPLEAITUR/HfaP0Vt/46jiJD4UzRCXDTn6SGRjIvgnU0UiO8eAyHy7b1ZwR6PfnyF7a/YIepR1AAAAAElFTkSuQmCC");
        placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[8]);
        menuItem = document.createElement("menuitem");
        menuItem.setAttribute("id", "updatebookmarkMenuItem");
        menuItem.setAttribute("label", "替換當前書籤");
        menuItem.setAttribute("oncommand", "updatebookmark.updatebookreplace2();");
        menuItem.setAttribute("onclick", "if (event.button == 2) { updatebookmark.updatebookreplace(); }");
        menuItem.setAttribute("tooltiptext", "左鍵直接替換標題&網址\n\n右鍵彈出對話框\n更新標題和網址\n僅更新網址\n僅更新標題");
        menuItem.setAttribute("closemenu", "single");
        menuItem.setAttribute("selection", "link");
        menuItem.setAttribute('image', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAFLklEQVRIib2VfUxTZxSHXydOo50OHA4R6b0tvRSnRcWRWec0fiBO6IxaMTgopaVgaytQYCDKLlERBEHp+KioKPiVEhKJEQooFxEUtNZCaZmAYEEQhjIzl6n4cfbH4mIWtbDBnr9/5zw5J3nPi9AoQObWbgiMOskZjV5W0el0E8LSG8+vjy7TeHlFTRlzYcEFk/O6+Nt3udvrhjYqiyWj2pzMomjBKbWu30Vrl3rtKFm9VHTaU37wWjBXdvXpF+Lr4KW80sbblv3fVguAxh04bWYJU3Rx3tF11V9tq+pxF1U8mSco/YMjuPjYI6Rs0E1Q8ZotrIaFsgbwjbt0jvNvV0uZfqGlFVnk6xN07e7iqtdsQQW4CirBNagSCGEFEEItsIRaIETlQEiqwFVaB9zYG8945MWwEcsutdyfrtL2HfFLa3u+IMIA7LA6cA2tBtewaiCkV4CQ1QCxvRpY2ylgySlg7agGVmQdsGNvwsr9N+5+S2rmj2iyvNpHeWEnul/5HuqElakd4JFgBnZkAxCKGmCFXwVCeQ1YP9QDK64eXHZeB5f4enDZ3QAu5C2Yl2KEtVm6oiUxxz4ZljBP/6si6kL/88DCbtiY2fR0RXz5zwtDCkvw9ZmqWV77khy9Uw4wNuUWzk+of+iyvwlckg3ATDEAM7URmOnNwMxoBs7eqn73QNLTquwnw29EDDXYtuWY6ZnPzjPahb7yIHun+SyEEA0hNP5Nbs+JOuby/NYORtYdYOa0AlPdBoxsMzjvoZ44inMqP+UGBSFkO82qMKruYfyG3Gv3F22OjqDRaDPel4u7ZPHxOGd5hhdagHG8HZyTax45iFTF0xbxNyFEsx/WKkld72R/dUXe3LWhfgghmw9lQ6r7kthnO2F2MtXrEJR+YgqH540Qsj7R2ywnKZuv/WQEQmjCh3KZpaUTeapKtYMwNXsSsXIpQmisTxr5Ed1tzUyE0KQxFv3P5Bn7P1doW4WesozFw4iP4/M1463H3sFRfS89orYvglc5oPc8axp05u9Yba3mUHmLDz8h32rub0iS/Eit62QrLj8g11140MLRPHiJneoFRvrlxumE+6z31el0ugnq2gF/ZXGTcYF/xCqrIoqibA5ftXjItF0ZXppuy5z8rtd0tQXouV2A53QAFltwDL3jyZAkZZNd1sHZV96fJSvpf7IpraQUIWRrVSgoqleuKrw34JZ1F+jprUBPawUstRWwA+3ASG0BN/L8EZ6qYdHW4/o5YQWNcyPOtCxTajolkZru0/Kivh6x5iGEnmwa9A6Qb7AqQwghPFGtdE4yvMT23gEs0QTYj0bAdjcDtqsZ8F0mIMjmoXl7jI+/TGrqX5JsHliW2vH7mozuV76qHtis7gPp8bYX38ccPogQmjws4VQR3252bHEZvtMMeIwRMOVtwCJuARauB0xxGzCFATB5I2AyA2BSA+CyZpgb1Q7LErvAL9U85K/Myf+MTp85LNkbHKXxXHp4VQ9DYQZcqgdM0gBYSD1g4gbARTcAF+kAF90CTKgDXKgDllgPS+TUwJqgfcn29pjDiGRvcJKqYhjSmy8YIUbAhTcBC7wCzgHlQA+gAAusASywBvCt1EvmlpI+Ni+zmL3YzwcNd43vYpr/Olt66LmLTIkJGMFN4OR/9J7dasFh27XhJ6d7R5+yXxWjcuSGy2ewvbhopEf7fcwKjlqMSSrvM0OM4MRPLEAITUR/HfaP0Vt/46jiJD4UzRCXDTn6SGRjIvgnU0UiO8eAyHy7b1ZwR6PfnyF7a/YIepR1AAAAAElFTkSuQmCC");
        placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[9]);
        placesContextMenu.addEventListener("popupshowing", updatebookmark.onpopup, false);
    },

    onpopup: function(event) {
        // show only when single item is clicked and when item is link
        var node = document.popupNode;
        var isSingleLink = false;
        if ("node" in node) {
            node = node.node;
            isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
        } else if ("_placesNode" in node) {
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
        var menubook5 = document.getElementById('placesContext_add:bookmark');
        var menubook4 = document.getElementById('updatebookmarkMenuItem');
        var activeContent = top.window.document.getElementById("content");
        var activeBrowser = activeContent.selectedBrowser;
        var newurlValue = activeBrowser.currentURI.spec;
        if (newurlValue == "about:blank" || newurlValue == "about:home") {
            if (menubook1) menubook1.hidden = true;
            if (menubook2) menubook2.hidden = true;
            if (menubook3) menubook3.hidden = true;
            if (menubook4) menubook4.hidden = true;
            if (menubook5) menubook5.hidden = true;
        } else {
            if (isSingleLink) {
                var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
                var oldurl = oldURI.spec;
                var oldtitleValue = PlacesUtils.bookmarks.getItemTitle(node.itemId);
                var newURI = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(newurlValue, null, null);
                var newurl = newURI.spec;
                var newtitleValue = activeBrowser.contentTitle;

                //如果标题或地址与当前tab的符合,显示弹出菜单spec
                if (oldurl == newurl || oldtitleValue == newtitleValue) {
                    if (menubook1) menubook1.hidden = false;
                    if (menubook2) menubook2.hidden = false;
                    if (menubook3) menubook3.hidden = true;
                    if (menubook4) menubook4.hidden = false;
                    return;
                } else {
                    if (menubook1) menubook1.hidden = true;
                    if (menubook2) menubook2.hidden = true;
                    if (menubook3) {
                        menubook3.hidden = true;
                        menubook3.setAttribute("label", "在此書籤後面添加新書簽");
                    }
                    if (menubook5) {
                        menubook5.setAttribute("label", "在此書籤後面添加新書簽");
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
                if (menubook5) {
                    menubook5.setAttribute("label", "在此資料夾添加新書簽");
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
        } else if ("_placesNode" in node) {
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
            var newURI = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(newValue, null, null);

            // add old tags onto new uri
            var oldValueTags = PlacesUtils.tagging.getTagsForURI(oldURI, {});
            PlacesUtils.tagging.tagURI(newURI, oldValueTags);
            PlacesUtils.bookmarks.changeBookmarkURI(node.itemId, newURI);
        } catch(ex) {
            alert("無法更新書籤. 無效的URL.");
        }
    },

    updateTitle: function() {
        var node = document.popupNode;
        var isSingleLink = false;
        if ("node" in node) {
            node = node.node;
            isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
        } else if ("_placesNode" in node) {
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
        } catch(ex) {
            alert(ex.message);
        }
    },
    
    updatebookreplace: function() {
        var node = document.popupNode;
        var isSingleLink = false;
        if ("node" in node) {
            node = node.node;
            isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
        } else if ("_placesNode" in node) {
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
                var newURI = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(newValue, null, null);
                //add old tags onto new uri
                var newtitleValue = activeBrowser.contentTitle;
                if (uselected.value === 0 || uselected.value == 2) PlacesUtils.bookmarks.setItemTitle(node.itemId, newtitleValue);
                if (uselected.value === 0 || uselected.value == 1) {
                    var oldValueTags = PlacesUtils.tagging.getTagsForURI(oldURI, {});
                    PlacesUtils.tagging.tagURI(newURI, oldValueTags);
                    PlacesUtils.bookmarks.changeBookmarkURI(node.itemId, newURI);
                }
            }
        } catch(ex) {
            alert("無法更新書籤. 無效的URL.");
        }
    },
    
    updatebookreplace2: function() {
        var node = document.popupNode;
        var isSingleLink = false;
        if ("node" in node) {
            node = node.node;
            isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
        } else if ("_placesNode" in node) {
            node = node._placesNode;
            isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
        } else {
            if ("view" in node.parentNode) {
                node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
                isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
            }
        }

            var newValue;
            var activeContent = top.window.document.getElementById("content");
            var activeBrowser = activeContent.selectedBrowser;
            newValue = activeBrowser.currentURI.spec;
            var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
            var uselected = {};

            var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
            var newURI = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(newValue, null, null);
            //add old tags onto new uri
            var newtitleValue = activeBrowser.contentTitle;
            PlacesUtils.bookmarks.setItemTitle(node.itemId, newtitleValue);

            var oldValueTags = PlacesUtils.tagging.getTagsForURI(oldURI, {});
            PlacesUtils.tagging.tagURI(newURI, oldValueTags);
            PlacesUtils.bookmarks.changeBookmarkURI(node.itemId, newURI);
    },

};
    
updatebookmark.init();
window.addEventListener("unload",
function(event) {
    updatebookmark.uninit(event);
},
false);

(function (css) {
        var css = ('\
            [id="placesContext_add:bookmark"]{\
            list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACX0lEQVR42pVTa0iTYRQ+vUsi/REVFF0IKYkuf7LCyCK20dTS1syWUJRQsMqEeZlta/u+11RUiLAgqh+rvJUIoXShkWn+MEbij9B0jm1uCQUxaekMJCtO70km2bp54IGHc57nnMPhfQH+HPN4LjPIRxR5xGGuYdFC0t3qHQ8ayre2WXSQOFc/k3KYyd/DvR6XzSPnMCPl/ttt1cH6psrtj3GyFQl1PPmhJRPW/tPIxRQSyoeY1fdS8kcbDL2weuVsZqYa/3UTWQsans1Mso7VXjwcd69eSnZ6uq1+/HQfMVyB+LESiVOOaqQRzS6TR9KCCvhBdsPdZfKPB69P4HgzziDEBezTGC3Dn2tjgWuRweclPuG9CmYVbOY6VufpKA7ghwbEt5a/Q2jcHYXDwnybvKBfDQsteyGZZ7EmX2fhCIYciAHT7yFqnqcFQX6ANZYqYYthBcSDHkBB5LwaUngma5kKXvmCw2Jtj3E2AmX4OVA7JWexZhpIg8n745BEji+HBHsGK3rdlvcGAzWIffmzEbyEr1qODUvprIAGzpijYQCIk/az6pFn+SEcvIDYa0DsF2v3FU9ztx2D7WffiyEVpI15A5TkGawp0muexCFxdW8ljnYbI2FXyQRxdEtIXGgcSoD5sQ22waJqXUInmd+1nw4/Kk/pl9OYQ0pjd5xVqQOhrnNjXwekbzxd8URo42N+nn0PbLx1JrHHWbVrUJjqrSrQntoESwg2NeglDWtsr9ntvnlypatUDetiGhTthFWyhtWQ+OgaWExH3ZcECwjET2yApTalIpc0plRYFv3i3wH9AYJp6KuwaQAAAABJRU5ErkJggg==") !important;\
            }\
        ');
        var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
        var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
        if (!sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
        sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
        }
})();

/*
(function (css) {
        var css = ('\
            [id="placesContext_add:bookmark"]{\
            list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACX0lEQVR42pVTa0iTYRQ+vUsi/REVFF0IKYkuf7LCyCK20dTS1syWUJRQsMqEeZlta/u+11RUiLAgqh+rvJUIoXShkWn+MEbij9B0jm1uCQUxaekMJCtO70km2bp54IGHc57nnMPhfQH+HPN4LjPIRxR5xGGuYdFC0t3qHQ8ayre2WXSQOFc/k3KYyd/DvR6XzSPnMCPl/ttt1cH6psrtj3GyFQl1PPmhJRPW/tPIxRQSyoeY1fdS8kcbDL2weuVsZqYa/3UTWQsans1Mso7VXjwcd69eSnZ6uq1+/HQfMVyB+LESiVOOaqQRzS6TR9KCCvhBdsPdZfKPB69P4HgzziDEBezTGC3Dn2tjgWuRweclPuG9CmYVbOY6VufpKA7ghwbEt5a/Q2jcHYXDwnybvKBfDQsteyGZZ7EmX2fhCIYciAHT7yFqnqcFQX6ANZYqYYthBcSDHkBB5LwaUngma5kKXvmCw2Jtj3E2AmX4OVA7JWexZhpIg8n745BEji+HBHsGK3rdlvcGAzWIffmzEbyEr1qODUvprIAGzpijYQCIk/az6pFn+SEcvIDYa0DsF2v3FU9ztx2D7WffiyEVpI15A5TkGawp0muexCFxdW8ljnYbI2FXyQRxdEtIXGgcSoD5sQ22waJqXUInmd+1nw4/Kk/pl9OYQ0pjd5xVqQOhrnNjXwekbzxd8URo42N+nn0PbLx1JrHHWbVrUJjqrSrQntoESwg2NeglDWtsr9ntvnlypatUDetiGhTthFWyhtWQ+OgaWExH3ZcECwjET2yApTalIpc0plRYFv3i3wH9AYJp6KuwaQAAAABJRU5ErkJggg==") !important;\
            }\
        ');
    var pi = document.createProcessingInstruction(
        'xml-stylesheet',
        'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
    );
    return document.insertBefore(pi, document.documentElement);
})();
*/