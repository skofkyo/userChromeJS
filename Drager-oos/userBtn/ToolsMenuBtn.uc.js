// ==UserScript==
// @name           ToolsMenuBtn.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/userBtn/ToolsMenuBtn.uc.js
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function() {
	var TMBtn = $("TabsToolbar").appendChild($C("button", {
		id: "ToolsMenu-button",
		type: "menu",
		onclick: "if (event.button == 1) {openPreferences();} else if (event.button == 2) {openAboutDialog(); event.preventDefault();}",
		style: "margin: 0px; padding: 0px; font-weight: bold; font: 18px Microsoft Yahei; color: #FFF; min-width: 84px; -moz-appearance: none; background: #3B3B3B; border: none; opacity:0.95;",
		ordinal: "0",
	}));

	var TMPopup = TMBtn.appendChild($("menu_ToolsPopup"));
		TMPopup.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
		TMPopup.addEventListener("mouseover", function (event) {event.originalTarget.setAttribute('closemenu', 'none')}, true);

	function startTime() {
		var dayName = new Array ("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		var now = new Date(),
			D = now.getDate(),
			M = now.getMonth() + 1,
			Y = now.getFullYear(),
			h = now.getHours(),
			m = now.getMinutes(),
			s = now.getSeconds();
		h = checkTime(h);
		m = checkTime(m);
		s = checkTime(s);
		$("ToolsMenu-button").setAttribute("tooltiptext", "左鍵：工具選單\n中鍵：選項\n右鍵：關於 Firefox\n\n現時日期和時間：\n" + Y + " 年 " + M + " 月 " + D + " 日, " + dayName[now.getDay()]);
		TMBtn.label = h + ":" + m + ":" + s;
		setTimeout(startTime, 100);
	}
	function checkTime(n) {
		if (n < 10) {n = "0" + n}
		return n;
	}
	startTime();

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
