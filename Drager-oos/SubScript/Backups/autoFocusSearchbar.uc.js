if (location == "chrome://browser/content/browser.xul") {
	var AutoFocusBar = {
		handleEvent: function (e) {
			var elm = document.activeElement;
			while (1) {
				if (elm == null) return;
				if (elm.localName == "browser" ||
					elm.localName == "iframe" ||
					elm.localName == "frame") {
					elm = elm.contentDocument.activeElement;
					continue;
				}
				break;
			}
			if (elm.ownerDocument.designMode == "on" ||
				elm.localName == "select" ||
				elm.localName == "input" ||
				elm.localName == "textarea" ||
				elm.getAttribute("contenteditable") == "true") return;
			var mod = e.ctrlKey || e.metaKey || e.altKey;
			if (mod) return;
			var c = String.fromCharCode(e.charCode);
			if (/[^0-9a-zA-Z]/.test(c)) return;
			var Bar = document.getElementById("searchbar"); // urlbar
			if (!Bar) return;
			e.preventDefault();
			Bar.focus();
			try {
				Bar.value = '';
				var evt = document.createEvent("KeyboardEvent");
				evt.initKeyEvent('keypress', false, true, null,
								 false, false, false, false,
								 0, e.charCode);
				var input = Bar.inputField;
				input.dispatchEvent(evt);
			} catch (err) {
				Bar.value = c;
			}
		},
	}
	window.addEventListener("keypress", AutoFocusBar, false);
	window.addEventListener("unload", function () {
		window.removeEventListener("unload", arguments.callee, false);
		window.removeEventListener("keypress", AutoFocusBar, false);
	}, false);
}
