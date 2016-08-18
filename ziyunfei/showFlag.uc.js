location == "chrome://browser/content/browser.xul" && gBrowser.addEventListener("DOMWindowCreated", function (event) {
	var self = arguments.callee;
	if (!self.showFlag) {
		self.showFlag = document.querySelector("#status-bar").appendChild(document.createElement("statusbarpanel")).appendChild(document.createElement("image"));
		document.getAnonymousElementByAttribute(self.showFlag.parentNode, "class", "*").hidden = true;
		self.showFlag.style.width = "16px";
		window.addEventListener("TabSelect", self, false);
		self.showFlag.src = self.flag = "http://www.www.worldcat.org/wcpa/rel20111216/images/flag_red.gif"
		self.isReqHash = [];
		self.showFlagHash = [];
	}
	try {
		var host = (event.originalTarget.location || content.location).hostname;
		if (!/tp/.test(content.location.protocol) || !host || self.isReqHash[host]) {
			(event.type == "TabSelect" || event.originalTarget == content.document) && (self.showFlag.src = self.flag);
			return
		}
		Components.classes["@mozilla.org/network/dns-service;1"].getService(Components.interfaces.nsIDNSService).asyncResolve(host, 0, {
			onLookupComplete: function (inRequest, inRecord, inStatus) {
				var ip = inRecord.getNextAddrAsString();
				if (!self.showFlagHash[host]) {
					(event.type == "TabSelect" || event.originalTarget == content.document) && (self.showFlag.src = self.flag);
					self.isReqHash[host] = true;
					var req = new XMLHttpRequest();
					req.open("GET", 'http://phyxt8.bu.edu/iptool/geoip.php?ip=' + ip, true);
					req.send(null);
					req.onload = function () {
						if (req.status == 200) {
							self.showFlagHash[host] = (req.responseText.match(/[^;]+;[^;]+; ([^;]+);/) || ["", "CN"])[1].toLocaleLowerCase();
							host == content.location.hostname && (self.showFlag.src = "http://www.razerzone.com/asset/images/icons/flags/" + self.showFlagHash[host] + ".gif");
						}
						self.isReqHash[host] = false;
					}
				} else {
					host == content.location.hostname && (self.showFlag.src = "http://www.razerzone.com/asset/images/icons/flags/" + self.showFlagHash[host] + ".gif");
				}
			}
		}, null);
	} catch (e) {
		(event.type == "TabSelect" || event.originalTarget == content.document) && (self.showFlag.src = self.flag);
	}
}, false)