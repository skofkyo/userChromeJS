(function() {
	FullZoom.onLocationChange = (function(aURI, aIsTabSwitch, aBrowser) {
		var val = 1.00;
		var browser = aBrowser || gBrowser.selectedBrowser;
		FullZoom._applyPrefToSetting ? FullZoom._applyPrefToSetting(val, browser) : FullZoom._applyPrefToZoom(val, browser);
	}).bind(FullZoom);
}());