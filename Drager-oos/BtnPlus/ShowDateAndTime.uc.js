// ==UserScript==
// @name           ShowDateAndTime.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/BtnPlus/ShowDateAndTime.uc.js
// ==/UserScript==
(function() {
	DaT = $("TabsToolbar").appendChild($C("button", {
				id: "Clock",
				style: "margin: 0px -14px 0px 0px; font-weight: bold; font: 18px Microsoft Yahei; color: #FFF; min-width: 84px; -moz-appearance: none; background: #3B3B3B; border: none; padding: 0px; opacity:0.95;",
				ordinal: "0",
			}));
	function startTime() {
//		var dayName = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		var dayName = new Array ("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
//		var dayName = new Array ("週日", "週一", "週二", "週三", "週四", "週五", "週六");
		var today = new Date();
		var D = today.getDate(),
			M = today.getMonth() + 1,
			Y = today.getFullYear(),
			h = today.getHours(),
			m = today.getMinutes(),
			s = today.getSeconds();
		h = checkTime(h);
		m = checkTime(m);
		s = checkTime(s);
		$("Clock").setAttribute("tooltiptext", "現時日期和時間：\n" + Y + " 年 " + M + " 月 " + D + " 日, " + dayName[today.getDay()]);
		DaT.label = h + ":" + m + ":" + s;
		setTimeout(function() {startTime();}, 100);
	}
	function checkTime(i) {
		if (i < 10) {i = "0" + i}
		return i
	}
	startTime();

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
