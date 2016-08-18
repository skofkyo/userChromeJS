location == "chrome://browser/content/browser.xul" && (function () {
	var self = arguments.callee;
	if (!self.batteryStatus) {
		self.batteryStatus = document.querySelector("#status-bar").appendChild(document.createElement("progressmeter"));
		self.batteryStatus.style.minWidth = self.batteryStatus.style.maxWidth = "50px";
		navigator.mozBattery.addEventListener('levelchange', self, false)
		navigator.mozBattery.addEventListener('chargingchange', self, false)
	}
	var batteryBar = document.getAnonymousElementByAttribute(self.batteryStatus, "class", "*");
	self.batteryStatus.setAttribute("value", navigator.mozBattery.level * 100);
	self.batteryStatus.setAttribute("tooltiptext", (navigator.mozBattery.charging ? "\u5145\u7535\u4E2D" : "\u505C\u6B62\u5145\u7535\u4E2D") + " \u7535\u6C60\u7535\u91CF " + navigator.mozBattery.level * 100 + "%");
	navigator.mozBattery.charging ? batteryBar.classList.add("progress-bar") : batteryBar.classList.remove("progress-bar");
	navigator.mozBattery.level == 1 && batteryBar.classList.remove("progress-bar");
	batteryBar.style.backgroundColor = (navigator.mozBattery.level < 0.3 ? "red" : "green");
})()