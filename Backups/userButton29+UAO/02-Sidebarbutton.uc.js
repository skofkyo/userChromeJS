// ==UserScript==
// @name                 Sidebarbutton.uc.js
// @description       側邊攔按鈕
// @namespace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.27
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
		id: "Sidebar-button",
		type: 'custom',
		defaultArea: CustomizableUI.AREA_NAVBAR,
		onBuild: function(aDocument) {
			var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
			var props = {
				id: "Sidebar-button",
				class: "toolbarbutton-1 chromeclass-toolbar-additional",
				label: "側邊欄開關",
				tooltiptext: "左鍵：書籤側邊攔\n右鍵：歷史側邊攔",
				removable: "true",
				overflows: "false",
				type: 'button',
				style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVQ4jcWQz0/aYBzGv1f/Ci8KcYGIvzYcRhCVAqWFUt6W/rB929ESutEMPEyDO5iMmOwf8OjBg38javLssK1xELjuST6HJ/k83zd5if571jcy083M/mwze4BU9j3S2x+Q3s4nbOUO8W638A9bOx+Rzh7M1jcyU8rly7NSrYOHx6fSw+NTqVht49v3qVOsqS+THz+NSsuEpPsLVBUbO4flVzoW2lCsPk7qDGWRQWQckuah8QfmRLD7lwuYwQjFahtUbmjQP8UQdY665qLjRmBuBLnro84cSLqHptlLaFkBOjyCGY5wKmmgM7kL1Rng6vbOAJBS7BCKHQJAahlXt3eG6gxwJndBlaYJkXEAWCMiqqkOaqqDVR8PYE1kHJWmCRIUG0L7IhkIig1BsVceICIS2he/varqoPrmxfm+LIlXZxx1xpPBfF+WxGvoPhq6nwzm+7IknmQGkM0gGUhmAOlNXxb5r9eyQjB/iHQuXyAiUt0IqhutPJDaOzpi/hAtKwQ1zeDZi29w3rJwKnfhxRN48QQnoobdwvkC+8cCKooFL76BbPReSXMH92b/8sUIxzCCEfjwGnx4jW7vKzru5wUY/wIjHMMKx88aH9z/AnRJPbZJkdIWAAAAAElFTkSuQmCC)",
				onclick: 'Sidebar.onClick(event);',
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
		id: "Sidebar-button",
		class: 'toolbarbutton-1 chromeclass-toolbar-additional',
		label: "側邊欄開關",
		tooltiptext: "左鍵：書籤側邊攔\n右鍵：歷史側邊攔",
		removable: "true",
		overflows: "false",
		type: "button",
		style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVQ4jcWQz0/aYBzGv1f/Ci8KcYGIvzYcRhCVAqWFUt6W/rB929ESutEMPEyDO5iMmOwf8OjBg38javLssK1xELjuST6HJ/k83zd5if571jcy083M/mwze4BU9j3S2x+Q3s4nbOUO8W638A9bOx+Rzh7M1jcyU8rly7NSrYOHx6fSw+NTqVht49v3qVOsqS+THz+NSsuEpPsLVBUbO4flVzoW2lCsPk7qDGWRQWQckuah8QfmRLD7lwuYwQjFahtUbmjQP8UQdY665qLjRmBuBLnro84cSLqHptlLaFkBOjyCGY5wKmmgM7kL1Rng6vbOAJBS7BCKHQJAahlXt3eG6gxwJndBlaYJkXEAWCMiqqkOaqqDVR8PYE1kHJWmCRIUG0L7IhkIig1BsVceICIS2he/varqoPrmxfm+LIlXZxx1xpPBfF+WxGvoPhq6nwzm+7IknmQGkM0gGUhmAOlNXxb5r9eyQjB/iHQuXyAiUt0IqhutPJDaOzpi/hAtKwQ1zeDZi29w3rJwKnfhxRN48QQnoobdwvkC+8cCKooFL76BbPReSXMH92b/8sUIxzCCEfjwGnx4jW7vKzru5wUY/wIjHMMKx88aH9z/AnRJPbZJkdIWAAAAAElFTkSuQmCC)",
		context: '_child',
		onclick: 'Sidebar.onClick(event);',
	});
	ToolbarManager.addWidget(window, button, true);
	
	Sidebar = {
		onClick: function(event) {
			switch (event.button) {
				case 0:
					toggleSidebar("viewBookmarksSidebar");
					break;
					/*
					case 1:
					toggleSidebar("viewHistorySidebar");
					break;
					case 2:
					try {
					toggleSidebar('viewStylishSidebar');
					} catch (ex) {
					alert("\u672A\u5B89\u88DDStylish \u7121\u6B64\u5074\u908A\u6B04");
					}
					break;
					*/
				case 2:
					toggleSidebar("viewHistorySidebar");
					break;
			}
		}
	}
	
})();
