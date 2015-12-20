location == "chrome://browser/content/browser.xul" && (function() {
	var TYPE = 0; // 0:按鈕 2:工具選單
	if (TYPE == 0) {
		var Icon = $("TabsToolbar").appendChild($C("toolbarbutton", {
			id: "Extension-button",
			class: "toolbarbutton-1",
			type: "menu",
		}));
	}
	else if (TYPE == 2) {
		var dTS = $("devToolsSeparator");
		var Icon = dTS.parentNode.insertBefore($C("menu", {
			id: "Extension-Menu",
			class: "menu-iconic",
		}), dTS);
	}
	Icon.setAttribute("label", "附加元件選單");
	Icon.setAttribute("tooltiptext", "附加元件選單");
	Icon.setAttribute("image", "chrome://mozapps/skin/extensions/extensionGeneric-16.png");
	Icon.appendChild($C("menupopup")).addEventListener("popupshowing", showExtensionList, false);

	function showExtensionList(node) {
		node = node.target;
		while (node.hasChildNodes()) {
			node.removeChild(node.lastChild);
		}
		var AddonManager = Components.utils.import('resource://gre/modules/AddonManager.jsm').AddonManager;
		AddonManager.getAddonsByTypes(["extension"], function(extension) {
			var item = [];
			for(var i = 0; i < extension.length; i++) {
				item[i] = node.appendChild(document.createElement("menuitem"));
				item[i].setAttribute("label", extension[i].name + ' [' + extension[i].version + ']');
				item[i].setAttribute("type", "checkbox");
				item[i].setAttribute("checked", !extension[i].userDisabled);
				item[i].setAttribute("Disabled", extension[i].appDisabled);
				item[i].setAttribute("extensionID", extension[i].id);
				item[i].onclick = function(evt) {
					AddonManager.getAddonByID(evt.target.getAttribute("extensionID"), function(p) {
						p.userDisabled = p.userDisabled ? false : true;
					});
				}
			}
		});
	}

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
