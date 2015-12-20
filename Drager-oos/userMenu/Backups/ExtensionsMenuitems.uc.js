(function() {
	var ClippleMenu = $('menu_ToolsPopup').insertBefore($C("menu", {
		id: "Clipple-AnoMenu",
		class: "menu-iconic",
		label: "Clipple!",
		image: "chrome://clipple/skin/icon16/paste.png",
	}), $("menu_preferences"));
		ClippleMenu.appendChild($("clipple-menu"));

	var tczoompanelMenu = $('menu_ToolsPopup').insertBefore($C("menu", {
		id: "tczoompanel-AnoMenu",
		class: "menu-iconic",
		label: "快速縮放",
		image: "chrome://zoompanel/skin/zoompanel.png",
	}), $("menu_preferences"));
		tczoompanelMenu.appendChild($("tczoompanel_Popup"));

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
