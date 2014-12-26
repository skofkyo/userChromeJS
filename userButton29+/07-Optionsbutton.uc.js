// ==UserScript==  
// @name                 Optionsbutton.uc.js
// @description       選項按鈕
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

	CustomizableUI.createWidget({
		id: "Preferences-button",
		type: 'custom',
		defaultArea: CustomizableUI.AREA_NAVBAR,
		onBuild: function(aDocument) {
			var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
			var props = {
				id: "Preferences-button",
				class: "toolbarbutton-1 chromeclass-toolbar-additional",
				label: "選項",
				tooltiptext: "左鍵：打開選項\n中鍵：打開about:support 疑難排除資訊\n右鍵：打開about:config",
				removable: "true",
				type: 'button',
				style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAACwElEQVQ4T7VUX0hTcRRWCV+0i5lRiRhqRbCEULSZ/5qa021ddd1td3Nuu9P5Z+ZmuimSGRVWD4H1EpFPIT1IEPQYBtWLEaXMHqSyh9CiOVqmoj2eft9tDnMJ9dCFH+d+3/nOdw/n/La4uP/9fPiydJid/E0n56+/yYp2RwwSYJCUnDKTtCeTOC51KmIIHh9I3dYUQre316QsLr0QeD9fAJylyCOVzkiIwOCR9/oHDMAxZugEJty+A+vph3IpLT37SWBuoUBZUUuCvZ0QgcEjz+3NXPcNDOlZXcpvZozIqak3Dh49XkbVDRYqrNBQoap2tuaMlcwtXYQIDB55RWEpaepNA6wuK6arz+HVKqHRMaERGknf5CKt0U4awRI9wOCRN1gdjz+FVyu3dhPdTnBprc7sbJ8VbG102mhdHBt/OBxe/dGKCCzYWsnS0vEGupht/tpO6sz+gwo6VlJJvEUiXrTT3Xv3Ly18XSli+XhEYPA6UZJ10HNcmrxNuTO85OTmk84skYnNw9HlJ53RSs9eBtQslxjRJAKDRx466LNZXaSzeNmoXK2dPsUL1NDoJLu7hxqamkmU2rojop2IwODlPNNBX16tmd7cUUZoed2IWcwvht0uj29O6vJRBW8I1+jFvmu37mgRgR1nfeTy+N8Fv620Q486ZpQRHToDOyYDb5X5xaqnpmY3dfYPkeTxk97mIrXBKkdg8CZnB+UVn5TvGatL2Lq5I0Uq9ZUSNU9Obx85Os9Rz+DlqQ7/IPUP3yBEYPCS108nqjRUqdX34/5tNeJGx8btZWrtUp1oI1dn90Roec1gd3vp/PURNhcvAYNHHrqxB49EZpQccyE/hpaVz1+87r55e3Rk457wZhv1XrxKiBgqeOQnXwU80G/7w2XCXewoNq4FL4jTdWITIW5sB/ng9zXuX/5SotuM2c4fXH4C3BQJxGxDNfsAAAAASUVORK5CYII=)",
				onclick: 'Preferences.onClick(event);',
				context: '_child',
			};
			for (var p in props) {
				toolbarbutton.setAttribute(p, props[p]);
			};
			return toolbarbutton;
		}
	});

	Preferences = {
		onClick: function(event) {
			switch (event.button) {
				case 0:
					openPreferences()
					break;
				case 1:
					gBrowser.selectedTab = gBrowser.addTab("about:support");
					break;
				case 2:
					gBrowser.selectedTab = gBrowser.addTab("about:config");
					break;
			}
		}
	}

})();