// ==UserScript==
// @name                 Homebutton.uc.js
// @description       首頁按鈕
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
		id: "Home-button",
		type: 'custom',
		defaultArea: CustomizableUI.AREA_NAVBAR,
		onBuild: function(aDocument) {
			var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
			var props = {
				id: "Home-button",
				class: "toolbarbutton-1 chromeclass-toolbar-additional",
				label: "新首頁",
				tooltiptext: "左鍵：原始首頁\n中鍵：百度\n右鍵：Google",
				removable: "true",
				overflows: "false",
				type: 'button',
				style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACY0lEQVQ4jYWSXUiTYRiG7/f7nfg5/NzcckQFkdKIpZhkVJoWiKx24EEWaXUgFBFiUQR1IJ4EUYRIRGkHmfQLBYWyiDIUBosKbYmkRxWx2Pyb27dN2fyeDtSR8+85eZ/35r6v9+HlYViliMgAIGfhOskYm1nNu1LYSES2guLyjoLi8g4ishGRcSUvt0LY1Ofxmu0lFe2SJDdIktxgL6lo7/N4zURkSveztLD1QedT0822e4+ULGNR2d7S+wDQ7/Ge0SLhgcuNZ082nDo+wRgLLAMQka3pSvMW94f+x6qq5riqD932fhm0A0DprsLhN+73F6empiarD5adaL3R8pMx5k8BiMh27PS5Qt/wSFduriVeW+O89ar7XZ0+N1cMABzPD9Ycqep8/rL70thYMMNhL6h/9vDuIGPMz4jIVnn4qDMwHmrbvGnj6IF9e5687e2/kGEwWI2KAgCIaFHE4rGxqsr9rX2eT7W/fv/Jt5qzG3u7X/Sw3ZWua6FItKVo546eDRbLyNCP0SYlUxGNxixIkgQASCQSCIfD0LRoYnv+1rbg+Pi2gW9DzuyszGZGRA4AeQAmKlx1n61WCxRFgSiKS347mUwiomkIBIL4+LqrBIAJwF+BMeYjou8A8mSDAaqqgud5JJNJxGdmAQAZBhmyLEMQBIRC0wDgB/CVMUbC/68IoghRlgEA0YiGrjvXqwGg/vxVt6pmgxMECGmTLQFwHAee5+cB0RgA+BZ7s9mU8qwB4MHz85Ku6yld1/WUznH8WgCWmoDj2Lr6MkAsPovQdCTVr6cDaasMwIGl5Vs4l+mLq/wPSgHx6qqiTssAAAAASUVORK5CYII=)",
				onclick: 'Home.onClick(event);',
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
		id: "Home-button",
		class: 'toolbarbutton-1 chromeclass-toolbar-additional',
		label: "新首頁",
		tooltiptext: "左鍵：原始首頁\n中鍵：百度\n右鍵：Google",
		removable: "true",
		overflows: "false",
		type: "button",
		style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACY0lEQVQ4jYWSXUiTYRiG7/f7nfg5/NzcckQFkdKIpZhkVJoWiKx24EEWaXUgFBFiUQR1IJ4EUYRIRGkHmfQLBYWyiDIUBosKbYmkRxWx2Pyb27dN2fyeDtSR8+85eZ/35r6v9+HlYViliMgAIGfhOskYm1nNu1LYSES2guLyjoLi8g4ishGRcSUvt0LY1Ofxmu0lFe2SJDdIktxgL6lo7/N4zURkSveztLD1QedT0822e4+ULGNR2d7S+wDQ7/Ge0SLhgcuNZ082nDo+wRgLLAMQka3pSvMW94f+x6qq5riqD932fhm0A0DprsLhN+73F6empiarD5adaL3R8pMx5k8BiMh27PS5Qt/wSFduriVeW+O89ar7XZ0+N1cMABzPD9Ycqep8/rL70thYMMNhL6h/9vDuIGPMz4jIVnn4qDMwHmrbvGnj6IF9e5687e2/kGEwWI2KAgCIaFHE4rGxqsr9rX2eT7W/fv/Jt5qzG3u7X/Sw3ZWua6FItKVo546eDRbLyNCP0SYlUxGNxixIkgQASCQSCIfD0LRoYnv+1rbg+Pi2gW9DzuyszGZGRA4AeQAmKlx1n61WCxRFgSiKS347mUwiomkIBIL4+LqrBIAJwF+BMeYjou8A8mSDAaqqgud5JJNJxGdmAQAZBhmyLEMQBIRC0wDgB/CVMUbC/68IoghRlgEA0YiGrjvXqwGg/vxVt6pmgxMECGmTLQFwHAee5+cB0RgA+BZ7s9mU8qwB4MHz85Ku6yld1/WUznH8WgCWmoDj2Lr6MkAsPovQdCTVr6cDaasMwIGl5Vs4l+mLq/wPSgHx6qqiTssAAAAASUVORK5CYII=)",
		context: '_child',
		onclick: 'Home.onClick(event);',
	});
	ToolbarManager.addWidget(window, button, true);
	
	Home = {
		onClick: function(event) {
			switch (event.button) {
				case 0:
					gBrowser.selectedTab = BrowserGoHome(event);
					break;
				case 1:
					gBrowser.selectedTab = gBrowser.addTab("http://www.baidu.com/");
					break;
				case 2:
					gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/");
					break;
			}
		}
	}
	
})();
