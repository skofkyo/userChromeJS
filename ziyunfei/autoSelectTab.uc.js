location == "chrome://browser/content/browser.xul" && (document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseover', function self(e) {
	if ((self.target = e.target).localName === 'tab') {
		if (!self.timeoutID) {
			this.addEventListener('mouseout', function () {
				clearTimeout(self.timeoutID)
			}, false);
		}
		self.timeoutID = setTimeout(function () {
			gBrowser.selectedTab = self.target;
		}, 300);
	}
}, false)