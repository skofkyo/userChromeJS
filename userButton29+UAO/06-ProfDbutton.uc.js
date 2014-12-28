// ==UserScript==
// @name                 ProfDbutton.uc.js
// @description       開啟使用者設定資料夾
// @namespace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.26
// @startup        
// @shutdown       
// @config         
// @homepageURL    
// @ohomepageURL    
// @reviewURL    
// @downloadURL    
// @note                   
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==
(function() {
	// 来自 User Agent Overrider 扩展
	const ToolbarManager = (function() {
		let layoutWidget = function(document, button, isFirstRun) {
			let toolbox = document.getElementById('navigator-toolbox');
			toolbox.palette.appendChild(button);
			let container = null;
			let toolbars = document.getElementsByTagName('toolbar');
			let id = button.getAttribute('id');
			for (let i = 0; i < toolbars.length; i += 1) {
				let toolbar = toolbars[i];
				if (toolbar.getAttribute('currentset').indexOf(id) !== -1) {
					container = toolbar;
				}
			}
			if (!container) {
				if (isFirstRun) {
					container = document.getElementById('nav-bar');
				} else {
					return;
				}
			}
			let nextNode = null;
			let currentSet = container.getAttribute('currentset');
			let ids = (currentSet === '__empty') ? [] : currentSet.split(',');
			let idx = ids.indexOf(id);
			if (idx !== -1) {
				for (let i = idx; i < ids.length; i += 1) {
					nextNode = document.getElementById(ids[i]);
					if (nextNode) {
						break;
					}
				}
			}
			container.insertItem(id, nextNode, null, false);
			if (ids.indexOf(id) === -1) {
				container.setAttribute('currentset', container.currentSet);
				document.persist(container.id, 'currentset');
			}
		};
		let addWidget = function(window, widget, isFirstRun) {
			try {
				layoutWidget(window.document, widget, isFirstRun);
			} catch(error) {
				console.log(error);
			}
		};
		let removeWidget = function(window, widgetId) {
			try {
				let widget = window.document.getElementById(widgetId);
				widget.parentNode.removeChild(widget);
			} catch(error) {
				console.log(error);
			}
		};
		let exports = {
			addWidget: addWidget,
			removeWidget: removeWidget,
		};
		return exports;
	})();


	function $(id, doc) (doc || document).getElementById(id);

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) {
			Object.keys(attr).forEach(function(n) {
				if (typeof attr[n] === 'function') {
					el.addEventListener(n, attr[n], false);
				} else {
					el.setAttribute(n, attr[n]);
				}
			});
		}
		return el;
	}
	/*
	CustomizableUI.createWidget({
		id: "ProfD-button",
		type: 'custom',
		defaultArea: CustomizableUI.AREA_NAVBAR,
		onBuild: function(aDocument) {
			var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
			var props = {
				id: "ProfD-button",
				class: "toolbarbutton-1 chromeclass-toolbar-additional",
				label: "使用者設定資料夾",
				tooltiptext: "左鍵：打開Profile資料夾\n中鍵：打開extensions資料夾\n右鍵：打開chrome資料夾",
				removable: "true",
				overflows: "false",
				type: 'button',
				style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVQ4jb2SsWoCQRCGt1BCiCSFhb7HwqVdOOPufDvP4APkVbRJYW1rY5XAvUAQEcHSOk06tUipkDSnXI4zZ5WBHwZ2/m9nhjGmFCJyE0J4VtUNcIgxfgFZv99/LNdWhnOuBexU9bsoYOeca9UCQgjDsvmkEMKwFgCsLwGA9b8AXv4AvNQCnHPdGOOxbI4xHp1z3VpA3sW44vfxVWZjjEmSpF0GJEnSvhrQ6/UeVHVeAMxrTdbapvd+ICJLILPWNoEZMMvzDHj33g+stc1f5k6ncwfMCvNujTG3wAJY5Pn29C4iryJyfwYAb+WZ0zRVYAJM0jTViqVmZ4Cq7isKVjHGTYxxA6wq7mJ/BojIFDhcOqAKHVV1WlxDA3gSkVG+xI+Kjj5FZCkiI+99cM41jDHmB/Xe+MttdkMPAAAAAElFTkSuQmCC)",
				onclick: 'ProfD.onClick(event);',
				context: '_child',
			};
			for (var p in props) {
				toolbarbutton.setAttribute(p, props[p]);
			};
			return toolbarbutton;
		}
	});
	*/
	let button = $C('toolbarbutton', {
		id: "ProfD-button",
		class: 'toolbarbutton-1 chromeclass-toolbar-additional',
		label: "使用者設定資料夾",
		tooltiptext: "左鍵：打開Profile資料夾\n中鍵：打開extensions資料夾\n右鍵：打開chrome資料夾",
		removable: "true",
		overflows: "false",
		type: "button",
		style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVQ4jb2SsWoCQRCGt1BCiCSFhb7HwqVdOOPufDvP4APkVbRJYW1rY5XAvUAQEcHSOk06tUipkDSnXI4zZ5WBHwZ2/m9nhjGmFCJyE0J4VtUNcIgxfgFZv99/LNdWhnOuBexU9bsoYOeca9UCQgjDsvmkEMKwFgCsLwGA9b8AXv4AvNQCnHPdGOOxbI4xHp1z3VpA3sW44vfxVWZjjEmSpF0GJEnSvhrQ6/UeVHVeAMxrTdbapvd+ICJLILPWNoEZMMvzDHj33g+stc1f5k6ncwfMCvNujTG3wAJY5Pn29C4iryJyfwYAb+WZ0zRVYAJM0jTViqVmZ4Cq7isKVjHGTYxxA6wq7mJ/BojIFDhcOqAKHVV1WlxDA3gSkVG+xI+Kjj5FZCkiI+99cM41jDHmB/Xe+MttdkMPAAAAAElFTkSuQmCC)",
		context: '_child',
		onclick: 'ProfD.onClick(event);',
	});
	ToolbarManager.addWidget(window, button, true);
	
	ProfD = {
		onClick: function(event) {
			switch (event.button) {
				case 0:
					Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();
					break;
				case 1:
					var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
					file.append("extensions");
					file.launch();
					break;
				case 2:
					Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).launch();
					break;
			}
		}
	}

})();