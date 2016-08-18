location == "chrome://browser/content/browser.xul" && (autoContextmenu = true) && gBrowser.mPanelContainer.addEventListener("mouseup", function (event) {
	setTimeout(function () {
		if (autoContextmenu === true && event.button === 0 && event.target.ownerDocument.designMode !== "on" && getBrowserSelection()) {
			var mouseEvent = document.createEvent("MouseEvents");
			mouseEvent.initMouseEvent("contextmenu", true, true, null, 1, event.screenX, event.screenY, event.screenX, event.screenY, false, false, false, false, 2, null);
			event.target.dispatchEvent(mouseEvent);
			document.querySelector("#contentAreaContextMenu").removeAttribute("hidden");
			document.querySelector("#contentAreaContextMenu").openPopup(null, null, event.screenX, event.screenY, true);
		}
	}, 0)
}, false)