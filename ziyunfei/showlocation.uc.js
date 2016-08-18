location == "chrome://browser/content/browser.xul" && gBrowser.addEventListener("DOMWindowCreated", function (event) {
	var self = arguments.callee;
	if (!self.showLocation) {
		self.showLocation = document.querySelector("#status-bar").appendChild(document.createElement("statusbarpanel"));
		window.addEventListener("TabSelect", self, false);
		self.showLocation.label = "show location";
		self.isReqHash = [];
		self.showLocationHash = [];
	}
	try {
		var host = (event.originalTarget.location || content.location).hostname;
		if (!/tp/.test(content.location.protocol) || !host || self.isReqHash[host]) {
			(event.type == "TabSelect" || event.originalTarget == content.document) && (self.showLocation.label = "show location");
			return
		}
		Components.classes["@mozilla.org/network/dns-service;1"].getService(Components.interfaces.nsIDNSService).asyncResolve(host, 0, {
			onLookupComplete: function (inRequest, inRecord, inStatus) {
				var ip = inRecord.getNextAddrAsString();
				var server = (gBrowser.mCurrentBrowser.webNavigation.currentDocumentChannel.QueryInterface(Components.interfaces.nsIHttpChannel).getResponseHeader("server").match(/\w+/) || ["\u672A\u77E5"])[0];
				if (!self.showLocationHash[host]) {
					(event.type == "TabSelect" || event.originalTarget == content.document) && (self.showLocation.label = "show location");
					self.isReqHash[host] = true;
					var req = new XMLHttpRequest();
					req.open("GET", 'http://www.cz88.net/ip/index.aspx?ip=' + ip, true);
					req.send(null);
					req.onload = function () {
						if (req.status == 200) {
							self.showLocationHash[host] = req.responseText.match(/"InputIPAddrMessage">([^<]+)/)[1].replace(/\s*CZ88.NET.*/, "") + "  " + server + "  " + ip;
							host == content.location.hostname && (self.showLocation.label = self.showLocationHash[host]);
						}
						self.isReqHash[host] = false;
					}
				} else {
					host == content.location.hostname && (self.showLocation.label = self.showLocationHash[host]);
				}
			}
		}, null);
	} catch (e) {
		(event.type == "TabSelect" || event.originalTarget == content.document) && (self.showLocation.label = "show location");
	}
}, false)