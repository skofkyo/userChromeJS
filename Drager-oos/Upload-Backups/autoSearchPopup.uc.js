location == "chrome://browser/content/browser.xul" && (autoSearchPopup = true) && gBrowser.mPanelContainer.addEventListener("mouseup", function (event) {
	setTimeout(function () {
		if (autoSearchPopup === true && event.button === 0 && event.target.ownerDocument.designMode !== "on" && getBrowserSelection()) {
			var x = false; // false: 前景 | true: 背景
			var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup"),
				text = getBrowserSelection();

			var MI1 = popup.appendChild(document.createElement("menuitem"));
			MI1.setAttribute("label", "複製");
			MI1.setAttribute("accesskey", "C");
			MI1.setAttribute("command", "cmd_copy");

			var MI2 = popup.appendChild(document.createElement("menuitem"));
			MI2.setAttribute("label", "剪下");
			MI2.setAttribute("accesskey", "T");
			MI2.setAttribute("command", "cmd_cut");

			var MI3 = popup.appendChild(document.createElement("menuitem"));
			MI3.setAttribute("label", "貼上");
			MI3.setAttribute("accesskey", "V");
			MI3.setAttribute("command", "cmd_paste");

			var MI4 = popup.appendChild(document.createElement("menuitem"));
			MI4.setAttribute("label", "刪除");
			MI4.setAttribute("accesskey", "D");
			MI4.setAttribute("command", "cmd_delete");

			var serach = function() {
				popup.removeEventListener("command", serach, false);
				gBrowser.removeEventListener("click", closeSerach, false)
				setTimeout(function(selectedEngine) {
					if (x == false) {gBrowser.selectedTab = gBrowser.addTab();}
					else if (x == true) {}
					BrowserSearch.loadSearch(text, x);
					popup.querySelectorAll("#" + selectedEngine.id)[0].click();
				}, 10, popup.querySelector("*[selected=true]"))
			}
			var closeSerach = function() {
				popup.removeEventListener("command", serach, false);
				gBrowser.removeEventListener("click", closeSerach, false)
				popup.removeChild(MI1);
				popup.removeChild(MI2);
				popup.removeChild(MI3);
				popup.removeChild(MI4);
				popup.removeAttribute("style");
			}

			popup.addEventListener("command", serach, false)
			gBrowser.addEventListener("click", closeSerach, false)
			popup.openPopup(null, null, event.screenX - 100, event.screenY + 20);
			popup.setAttribute("style", "-moz-appearance: none; background: -moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%); border: 2px solid rgb(144,144,144);");
		}
	}, 500)
}, false)
