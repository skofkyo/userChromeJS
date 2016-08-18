(function (x) {
	gBrowser.addEventListener("load", x, true);
	window.addEventListener("TabMove", x, false);
	window.addEventListener("TabClose", x, false);
})(function () {
	setTimeout(function () {
		Array.map(gBrowser.visibleTabs || gBrowser.mTabs, function (tab, num) {
			tab.label = (num + 1) + "  \u202D" + tab.label.match(/(?:^\d+  \u202D)?(.+)/)[1];
		})
	}, 5);
})