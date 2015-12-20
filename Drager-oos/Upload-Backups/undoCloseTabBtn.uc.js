(function() {
	var uCTBtn = $("TabsToolbar").appendChild($C("toolbarbutton", {
		id: "undoclosetab-button",
		label: "復原分頁按鈕",
		tooltiptext: "左鍵：復原分頁選單\n中鍵：復原已關閉分頁\n右鍵：清除復原分頁列表",
		class: "toolbarbutton-1",
		type: "menu",
		context: "_child",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmElEQVQ4jaXSIQ7CQBRF0SMqKlgAghAEEtFFIBEsAYFENGyBFSBYAYtDIhDIQVCSSdOh7fQm38zLu+L/IU39J+ulRphazhLE5YAlytxyPA/cUeWU23OZKggSFxojeWI2RFJghS1ueEfZfsg+2mx8FxpwTgliSRfHJjv9E/wkXSwawa5PkKLEy4gP1qbCNbcMB8xzywXW8cMHRHtGPjrrfUUAAAAASUVORK5CYII=",
		onclick: "\
		if (event.button == 1) {\
			document.getElementById('History:UndoCloseTab').doCommand();\
		}\
		else if (event.button == 2) {\
			var Setting = 'browser.sessionstore.max_tabs_undo';\
			gPrefService.setIntPref(Setting, 0);\
			gPrefService.setIntPref(Setting, 50);\
			event.preventDefault();\
		}\
		"
	}));

	var popup = uCTBtn.appendChild($C("menupopup", {
		onpopupshowing: "this.parentNode.populateUndoSubmenu();",
		context: "",
		tooltip: "bhTooltip",
		popupsinherittooltip: "true"
	}));

	uCTBtn.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace(/._rootElt.*/, "") + ")");

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
