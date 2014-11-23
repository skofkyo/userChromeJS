location == "chrome://browser/content/browser.xul" && (function () {
	(document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseover', function (e) {
		if (e.target.localName == 'tab') {
			var that = arguments.callee;
			that.target = e.target
			if (!that.clearTimeout) {
				(document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseout', function () {
					clearTimeout(that.clearTimeout)
				}, false);
			}
			that.clearTimeout = setTimeout(function () {
				gBrowser.selectedTab = that.target
				//gURLBar.select();
			}, 0);
		}
	}, false)
})()
