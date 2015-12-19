// ==UserScript==
// @name           AddonbarforUC.uc.js
// @description    FF29恢复附加组件栏(状态栏)并集成了url-addon-bar
// @author         Geek in Training (GiT), zbinlin, dannylee
// @namespace      lidanny2012/AddonbarforUC@gmail.com
// @include        main
// @license        MIT License
// @compatibility  Firefox 29-30+
// @charset        UTF-8
// @version        0.0.3
// @note           转自拓展The Addon Bar (restored) By GiT
// @note           为脚本按钮恢复提供附加组件栏，集成了url-addon-bar By zbinlin
// ==/UserScript==

"use strict";
(function (css) {
  	    
    /*
     * AUTOHIDE
     * 当焦点在地址栏的输入框内时，是否自动隐藏附加组件栏
     * true : 自动隐藏
     * false: 不隐藏
     * 默认：true
     */
    const AUTOHIDE = true;
    const AUTOHIDECLASS = "url-addon-bar-auto-hide",
          AUTOHIDEFOCUSCLASS = "url-addon-bar-auto-hide-focus";
    
    function $(id) {
        return document.getElementById(id);
    }
    var cssStr = (["",
'@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);',

'@-moz-document url("chrome://browser/content/browser.xul") {',

'    #navigator-toolbox[iconsize="large"] #UC-addon-bar .toolbarbutton-menu-dropmarker {',
'        margin-left: 0 !important;',
'    }',
'    #navigator-toolbox[iconsize="large"] #UC-addon-bar .toolbarbutton-1 .toolbarbutton-icon,',
'    #navigator-toolbox[iconsize="large"] #UC-addon-bar .toolbarbutton-1 .toolbarbutton-menubutton-dropmarker,',
'    #navigator-toolbox[iconsize="large"] #UC-addon-bar .toolbarbutton-1 .dropmarker-icon {',
'        border: 0 !important;',
'        background-image: none !important;',
'        background-color: transparent !important;',
'        box-shadow: none !important;',
'        -moz-transition: none !important;',
'    }',
'    #navigator-toolbox[iconsize="large"] #UC-addon-bar .toolbarbutton-menubutton-dropmarker:before {',
'        display: none !important;',
'    }',
'    #navigator-toolbox[iconsize="large"] #UC-addon-bar .toolbarbutton-menubutton-dropmarker > .dropmarker-icon {',
'        border: 0 !important;',
'        padding: 0 !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1 > .toolbarbutton-menubutton-dropmarker {',
'        border-style: none !important;',
'        box-shadow: none !important;',
'        padding: 0 0 0 1px !important;',
'        background: transparent !important;',
'    }',

'    #urlbar-icons > * {',
'        padding: 0 2px !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar,',
'    #urlbar-icons > #UC-addon-bar > #UC-status-bar-container > #status-bar {',
'        -moz-appearance: none !important;',
'        height: 18px !important;',
'        min-height: 18px !important;',
'        border-style: none !important;',
'        background: transparent !important;',
'        -moz-box-align: center !important;',
'        padding: 0 !important;',
'        margin: 0 !important;',
'        box-shadow: none !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar > toolbaritem,',
'    #urlbar-icons #UC-status-bar-container #status-bar > toolbaritem {',
'        -moz-box-align: center !important;',
'        -moz-box-pack: center !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1,',
'    #urlbar-icons > #UC-addon-bar statusbarpanel,',
'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1 > .toolbarbutton-menubutton-button {',
'        -moz-appearance: none !important;',
'        border-style: none !important;',
'        border-radius: 0 !important;',
'        padding: 0 2px !important;',
'        margin: 0 !important;',
'        background: transparent !important;',
'        box-shadow: none !important;',
'        -moz-box-align: center !important;',
'        -moz-box-pack: center !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar > .toolbarbutton-1,',
'    #urlbar-icons > #UC-addon-bar > #UC-status-bar-container > #status-bar > statusbarpanel {',
'        min-width: 18px !important;',
'        min-height: 18px !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1 > .toolbarbutton-icon,',
'    #urlbar-icons > #UC-addon-bar > #UC-status-bar-container > #status-bar > statusbarpanel > .statusbarpanel-icon {',
'        max-width: 18px !important;',
'        /* max-height: 18px !important; */',
'        padding: 0 !important;',
'        margin: 0 !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1 > .toolbarbutton-menubutton-button,',
'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1 > .toolbarbutton-menubutton-button > .toolbarbutton-icon {',
'        padding: 0 !important;',
'        margin: 0 !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1:not([disabled="true"]):hover,',
'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1:not([disabled="true"])[type="menu-button"]:hover,',
'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1:not([disabled="true"])[open="true"],',
'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1:not([disabled="true"])[type="menu-button"][open="true"],',
'    #urlbar-icons > #UC-addon-bar > #UC-status-bar-container > #status-bar statusbarpanel:not([disabled="true"]):hover,',
'    #urlbar-icons > #UC-addon-bar > #UC-status-bar-container > #status-bar statusbarpanel:not([disabled="true"])[open="true"] {',
'        background-image: -moz-linear-gradient(rgba(242, 245, 249, 0.95), rgba(220, 223, 225, 0.67) 49%, rgba(198, 204, 208, 0.65) 51%, rgba(194, 197, 201, 0.3)) !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar #UC-addon-bar-close-button,',
'    #urlbar-icons > #UC-addon-bar toolbarspring,',
'    #urlbar-icons > #UC-addon-bar toolbarspacer,',
'    #urlbar-icons > #UC-addon-bar toolbarseparator,',
'    #urlbar-icons > #UC-addon-bar .toolbarbutton-1 > dropmarker,',
'    #urlbar-icons > #UC-addon-bar > #UC-status-bar-container > #status-bar > .statusbar-resizerpanel {',
'        display: none !important;',
'    }',

'    /* autohide */',
'    #urlbar-icons > #UC-addon-bar.' + AUTOHIDECLASS + ' {',
'        overflow: hidden !important;',
'        transition: width 0.75s !important;',
'    }',
'    #urlbar-icons > #UC-addon-bar.' + AUTOHIDECLASS + '.' + AUTOHIDEFOCUSCLASS + ' {',
'        width: 0 !important;',
'    }',

'    #urlbar-icons > #UC-addon-bar[moz-collapsed="true"] {',
'        visibility: inherit !important;',
'    }',

'}',
        ""].join("\n")).toString();
    var urlstyle = document.createProcessingInstruction("xml-stylesheet", "title=\"url-addon-bar\" type=\"text/css\"" + " href=\"data:text/css;base64," + btoa(cssStr) + "\"");
    var main = $("main-window");
    var urlbarIcons = $("urlbar-icons");
    var addonBar = null;
    var browserBottombox = $("browser-bottombox");
    var maintoolbox = $("navigator-toolbox");
    var backstage = Components.utils.import("resource:///modules/CustomizableUI.jsm");
    window.UCADDONBAR = {
    	_isready: false,
    	PREF: "userChromeJS.url-UCaddon-bar.enabled",
    	urlbarenabled: true,
    	_isinurlbar: true,
    	menuitem: null,
    	
    	stateduiload: function(){
    	  backstage.CustomizableUIInternal.registerArea("UC-addon-bar", {
      		legacy: false,
      		type: CustomizableUI.TYPE_TOOLBAR,
      		defaultPlacements: [
      			"UC-addon-bar-close-button",
      			"UC-addon-bar-spring",
      			"UC-status-bar-container"
      		],
      		defaultCollapsed: false
      	}, true);
      	/*CustomizableUI.registerArea("UC-addon-bar", {
    				legacy: true,
    				type: CustomizableUI.TYPE_TOOLBAR,
    				defaultPlacements: [
    					"UC-addon-bar-close-button",
    					"UC-addon-bar-spring",
					    "UC-status-bar-container"
    				]
    		});*/
      	CustomizableUI.createWidget({
      		id: "UC-addon-bar-close-button",
      		type: "button",
      		defaultArea: "UC-addon-bar",
      		label: "UC Addon Bar",
      		tooltiptext: "UC Addon Bar",
      		onCommand: function (e) {
      			let addonbar = e.target.ownerDocument.getElementById("UC-addon-bar");
      			let window = e.target.ownerDocument.defaultView;
      			if (addonbar.collapsed === false) {
      				addonbar.collapsed = true;
      			} else {
      				addonbar.collapsed = false;
      			}
      		}
      	});
      	CustomizableUI.createWidget({
      		id: "UC-addon-bar-spring",
      		type: "custom",
      		defaultArea: "UC-addon-bar",
      		onBuild: function (doc) {
      			let spring = doc.createElement("toolbarspring");
      			spring.id = "UC-addon-bar-spring";
      			spring.setAttribute("flex", "1");
      			spring.setAttribute("label", "可调整空白");
      			spring.setAttribute("removable", "true");
      			return spring;
      		}
      	});
      	CustomizableUI.createWidget({
      		id: "UC-status-bar-container",
      		type: "custom",
      		defaultArea: "UC-addon-bar",
      		onBuild: function (doc) {
      			let item = doc.createElement("toolbaritem");
      			item.id = "UC-status-bar-container";
      			item.setAttribute("removable", true);
      			item.setAttribute("label", "状态栏");
      			item.setAttribute("class", "panel-wide-item");
      			item.setAttribute("closemenu", "none");
      			let palette = doc.defaultView.gNavToolbox.palette;
      			let statusbar = doc.getElementById("status-bar") ||
      					palette.querySelector("status-bar");
      			item.appendChild(statusbar);
      			return item;
      		}
      	});
    	},
    	stateduiunload: function(){
    	  let listener = {
      		onWidgetBeforeDOMChange: function (node, nextNode, container, removing) {
      			if (removing) {
      				if (node.id === "UC-status-bar-container") {
      					if (node.firstChild && node.firstChild.id === "status-bar") {
      						node.ownerDocument.getElementById("addon-bar").appendChild(node.firstChild);
      					}
      				}
      			}
      		}
      	}
      	CustomizableUI.addListener(listener);
      	CustomizableUI.destroyWidget("UC-addon-bar-close-button");
      	CustomizableUI.destroyWidget("UC-addon-bar-spring");
      	CustomizableUI.destroyWidget("UC-status-bar-container");
      	CustomizableUI.unregisterArea("UC-addon-bar");
      	CustomizableUI.removeListener(listener);
    	},
    	initUI: function(){
    		this._isready = false;
    		var overlay = '\
    		    <overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
               xmlns:html="http://www.w3.org/1999/xhtml"> \
	             <vbox id="browser-bottombox">\
            		<toolbar id="UC-addon-bar" \
            		 class="toolbar-primary chromeclass-toolbar" \
            	   toolbarname="UC Addon Bar" \
            	   collapsed="false" \
            	   hidden="false" \
            		 context="toolbar-context-menu" \
            		 toolboxid="navigator-toolbox" \
            		 mode="icons" \
            		 accesskey="T" \
            		 iconsize="small" \
            		 lockiconsize="true" \
            		 key="UC-addon-bar-toggle-key" \
            		 customizable="true" \
            		 persist="collapsed">\
            	  </toolbar>\
            	 </vbox>\
    		    </overlay>';
    	  overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
        window.userChrome_js.loadOverlay(overlay, UCADDONBAR);
        UCADDONBAR.style = addStyle(css);
    	},
    	
    	observe: function(subject, topic, data) {
    	  switch (topic) {
    	    case "xul-overlay-merged" :
          if (!this._isready) {
  				    this._isready = true;
            	addonBar = $("UC-addon-bar");
            	this.style = addStyle(css);
            	if (!gPrefService.prefHasUserValue(this.PREF)) {
                    gPrefService.setBoolPref(this.PREF, true);
              }
            	this.menuitem = document.createElement("menuitem");
          		this.menuitem.setAttribute("id", "urlUCaddonbar");
          		this.menuitem.setAttribute("label", "移动UC-addon-bar到地址栏");
          		this.menuitem.setAttribute("type", "checkbox");
          		this.menuitem.setAttribute("checked", "false");
          		this.menuitem.setAttribute("oncommand", "window.UCADDONBAR.toggle();");
          		$("menu_ToolsPopup").appendChild(this.menuitem);
              this.menuitem.setAttribute('checked', gPrefService.getBoolPref(this.PREF));
              this.urlbarenabled = gPrefService.getBoolPref(this.PREF);
            	document.insertBefore(urlstyle, main);
              UCADDONBAR.init();
          }
          break;
    	  }
    	},
    	
      init: function () {
      	this.stateduiload();
      	this.makeCustomizable();
		    this.initToggle();
		    document.getElementById("addon-bar")._delegatingToolbar = "UC-addon-bar";
		    
			  let appendStatusbar = window.CustomizableUI.getWidgetIdsInArea("UC-addon-bar").slice(-1)[0] === "UC-status-bar-container";
    		this.reMigrateItems("UC-addon-bar");
    		if (appendStatusbar) {
    		  window.CustomizableUI.addWidgetToArea("UC-status-bar-container", "UC-addon-bar");
    		}
    		
    		if (!gPrefService.prefHasUserValue(this.PREF)) {
          gPrefService.setBoolPref(this.PREF, true);
        }
        this.menuitem.setAttribute('checked', gPrefService.getBoolPref(this.PREF));
        this.urlbarenabled = gPrefService.getBoolPref(this.PREF);
        document.insertBefore(urlstyle, main);
		    this.toggleUA();
		    window.addEventListener("unload", this.destroyUI, false);
  		},
  		
  		toggle: function() {
        gPrefService.setBoolPref(this.PREF, !gPrefService.getBoolPref(this.PREF));
        this.menuitem.setAttribute('checked', gPrefService.getBoolPref(this.PREF));
        this.urlbarenabled = gPrefService.getBoolPref(this.PREF);
        this.toggleUA();
      },
  		
  		autoHide: function (midx) {
          if (!AUTOHIDE) return;
          var input = $("urlbar").inputField;
          if (!input) return;
          var method = ["addEventListener", "removeEventListener"][midx];
          if (!method) return;
          input[method]("focus", this, false);
          input[method]("blur", this, false);
          addonBar[method]("transitionend", this, false);
          addonBar.classList[["add", "remove"][midx] || "remove"](AUTOHIDECLASS);
      },
      
      toggleUA: function () {
          if (!this.urlbarenabled) {
              browserBottombox.appendChild(addonBar);
              addonBar.setAttribute("context", "toolbar-context-menu");
              addonBar.setAttribute("toolboxid", "navigator-toolbox");
              this.autoHide(1);
              this._isinurlbar = false;
          } else {
              urlbarIcons.insertBefore(addonBar, urlbarIcons.firstChild);
              addonBar.removeAttribute("context");
              addonBar.removeAttribute("toolboxid");
              this.autoHide(0);
              this._isinurlbar = true;
          }
      },
  		
  		makeCustomizable: function () {
    		maintoolbox.addEventListener("beforecustomization", this.beforeCustomizing, false);
    		maintoolbox.addEventListener("aftercustomization", this.afterCustomization, false);
    
    		let customizingView = document.getElementById("customization-container");
    		let extraHbox = document.createElement("hbox");
    		extraHbox.id = "UC-addon-bar-extraHbox";
    		extraHbox.setAttribute("flex", "1");
    		Array.slice(customizingView.childNodes).forEach(function (node) {
    			extraHbox.appendChild(node);
    		});
    		customizingView.appendChild(extraHbox);
  		},
  		
  		beforeCustomizing: function (e) {
  			if (UCADDONBAR._isinurlbar){
  			  browserBottombox.appendChild(addonBar);
          addonBar.setAttribute("context", "toolbar-context-menu");
          addonBar.setAttribute("toolboxid", "navigator-toolbox");
          UCADDONBAR.autoHide(1);
          UCADDONBAR._isinurlbar = false;
  			}
    		let customizingView = document.getElementById("customization-container");
    		customizingView.appendChild(addonBar);
    	},
    	
    	afterCustomization: function (e) {
    		browserBottombox.appendChild(addonBar);
    		UCADDONBAR.toggleUA();
    	},
    	
    	reMigrateItems: function (area) {
    		let shim = document.getElementById("addon-bar");
    		let items = shim.getMigratedItems();
    
    		items.forEach(function (item) {
    			let placement = window.CustomizableUI.getPlacementOfWidget(item);
    			let exists = getTBI(item);
    			if (exists && (!placement || placement.area !== area)) {
    				try {
    					window.CustomizableUI.addWidgetToArea(item, area);
    				} catch (e) {
    					window.console.log(e);
    				}
    			}
    		});
    	},
  		
  		initToggle: function () {
    		let keyset = document.createElement("keyset");
    		let key = document.createElement("key");
    		let keyPlace = document.getElementById("mainKeyset").parentElement;
    		
    		keyset.id = "UC-addon-bar-keyset";
    		key.id = "UC-addon-bar-togglekey";
    		keyset.appendChild(key);
    		key.setAttribute("key", "/");
    		key.setAttribute("modifiers", "accel");
    		key.setAttribute("oncommand", "void(0)");
    		key.addEventListener("command", UCADDONBAR.toggleVisibility, false);
    		keyPlace.appendChild(keyset);
    	},
    	
  		toggleVisibility: function (e) {
  			try {
  				if (addonBar.collapsed === false ) {
  					addonBar.collapsed = true;
  		    } else {
  		      addonBar.collapsed = false;
  		    }
  		  } catch (e) {
  				console.log(e);
  		  }
  		},
  		
  		destroyUI: function(){
  		  window.removeEventListener("unload", this.destroyUI, false);
  		  if (this.urlbarenabled) {
          browserBottombox.appendChild(addonBar);
          addonBar.setAttribute("context", "toolbar-context-menu");
          addonBar.setAttribute("toolboxid", "navigator-toolbox");
          this.autoHide(1);
          this._isinurlbar = false;
        }
        this.stateduiunload();
        this.unload();
  		},
  		
  		unload: function () {
    		let keyset = document.getElementById("UC-addon-bar-keyset");
    		let key = document.getElementById("UC-addon-bar-togglekey");
    		let shim = document.getElementById("addon-bar");
    		
    		shim.setAttribute("toolbar-delegate", "nav-bar");
    		shim._delegatingToolbar = "nav-bar";
    		key.removeEventListener("command", UCADDONBAR.toggleVisibility);
    		keyset.parentElement.removeChild(keyset);
    		window.gNavToolbox.externalToolbars
    			.splice(window.gNavToolbox.externalToolbars.indexOf(addonBar), 1);
    		addonBar.parentElement.removeChild(addonBar);
    		
    		maintoolbox.removeEventListener("beforecustomization", this.beforeCustomizing);
    		maintoolbox.removeEventListener("aftercustomization", this.afterCustomization);
    
    		let customizingView = document.getElementById("customization-container");
    		let extraHbox = document.getElementById("UC-addon-bar-extraHbox");
    
    		Array.slice(extraHbox.childNodes).forEach(function (node) {
    			customizingView.appendChild(node);
    		});
    		customizingView.removeChild(extraHbox);
    		window.UCADDONBAR.style.parentNode
    		  .removeChild(window.UCADDONBAR.style);
    		delete window.UCADDONBAR.style;
    	},

      handleEvent: function (e) {
          switch (e.type) {
              case "transitionend":
                  if (addonBar === e.target && "width" === e.propertyName && !addonBar.classList.contains(AUTOHIDEFOCUSCLASS)) {
                      addonBar.style.width = "";
                  }
                  break;
              case "focus":
                  addonBar.style.width = window.getComputedStyle(addonBar, null)["width"];
                  setTimeout(function () {
                      addonBar.classList.add(AUTOHIDEFOCUSCLASS);
                  }, 30);
                  break;
              case "blur":
                  addonBar.classList.remove(AUTOHIDEFOCUSCLASS);
                  break;
          }
      }
    };
    UCADDONBAR.initUI();
    window.UCADDONBAR = UCADDONBAR;
    function addStyle(css) {
    	var pi = document.createProcessingInstruction(
    		'xml-stylesheet',
    		'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
    	);
    	return document.insertBefore(pi, document.documentElement);
    }
    
    function getTBI (id) { 
	    return document.getElementById(id) || window.gNavToolbox.palette.querySelector("#" + id);
    }
    
})('\
  #UC-addon-bar {\
	  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.15) inset;\
	  padding: 0px;\
  }\
  #UC-addon-bar-close-button {\
   list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABeUlEQVQ4jd2RsWrCUBSGsyWKXi9JHGJcjJgO2a4ipEqSq5OIihEkg0Oh0Kmd+gZ5DBfxYQSJJOhcumTIa/ydLEWjOPeM5z/fB+ccQfhfJUnSiyAI1TsjsiRJr7lJsVh8UxQF5XL5eEMiE0JiRVFQKBTer9Ltdtttt9upYRiglF5K5EqlEhuGAcZYtl6vn68EAMT9fh90u93UNE1QSo+lUqkqCIJMKY1brRY6nU622+1WAKTcNQCIh8Mh6Pf7qWVZUFX1qKpqbFkWer3effhSMhwOU8YYGGPgnD8Gn8v3fc3zvC/XdeG6Ljjn36PRqP4QTAiRNU2LbdvGeDzOJpNJats2NE073+Q+XKvVYsdxMJ1OsyiKVkmSBLPZLHUcB7qu35YQQmRd12POOebzeRZF0QqABEBMkiTwfT8dDAao1+v5kkaj8eF5HhaLxS98zgCIp9MpWC6XKecczWbz80oAoBWG4eYSvpSEYbgB8JS7BgDz3qsAiADMv70fvwa5u68RlvwAAAAASUVORK5CYII=);\
  }\
  #UC-addon-bar-close-button[cui-areatype="menu-panel"],\
    toolbarpaletteitem[place="palette"] > #UC-addon-bar-close-button {\
	  list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAErUlEQVRYhe2VXUhbZxjH3/TYxMr0aNRZmg8aQxKSpn6kntjYeBI4pIknxqQNIWZ+jkIgpJ2ICxhbRAml61G8s7SSNgQFh0YyDb3azQYbo1frLgZlDEbZoPtqYf3YTaf/XRmaWU8tXXvlA/+Lw3ne9/973/d5n5eQ/diPV0QgEOBcLtcdlmUfNjU1/Wa32z8fHh6ufifmLpcr7ff7ceHCBSgUChBCYLfbodfrH70TAJPJ9EAqlcJoNEKr1aKmpgYHDhwARVGIRCINb9U8FAqZysvLt4aGhlAoFIrKZDIghKCrq2virRiHw2Gz2Wy+X1FRsaVSqbCwsFACMDMzA0IIDh48CJVK9bS5ufknn883+r8BWK3W7wghIITA5XJhYmKiBODixYtQq9VwuVwYGhoCz/OgKArhcJh5Y3On01lG0/SmTCbDuXPncPXqVaytrWFlZaUEIpfLYW5uDrFYDLW1tSCEoL29/ZvteXp7e1WBQIDz+Xwfd3d3J0VNQ6HQe6dOnfrKZDI9UCqVzwghSKVSRbOlpSVsbGyUALyoy5cvY3vHKisrNymKKn4TQiCVSiEKYLfbv3hxQGdn565m/9XKygoGBwdBCAFN0+B5HpcuXYIgCBAEATRNQy6XPxcF0Ov1f0gkEigUCrjdbuTz+T2ZJ5NJaLVaeL1epFIprK+v78hhWRYajeaxKADDMH9ms9k9r3pbBoMBy8vLojm9vb3QaDRPRAHa29sfiZ3xbmpubkY8HhfNGR0dBU3Tm6IASqXymdFoRDQaxeTkJFZXV/cEcOXKFVRWVkKtViORSLw0RxAESCQSnDlzxr4rQGNj419yuRxGoxE0TePw4cM7qn5qagqxWAzxeLzkXzabRTgchsVieSlAPp/HkSNHYDab74sW4fT0dPF+19TUYH5+vqTYWltbsbCwAI7j4Pf7dxjZbLZdd2pychKEEFgslu+dTmfZDoDjx4//nEwmiwPa2tpw/vx5FAoFLC4uoq6uDuPj48XJaJrGrVu3ivmJRAIMw4ge18jICKRSKdRq9ROPxzNTAtLS0vJDLBYrWXFdXR3cbjfUajXKysqQTqdRKBQwOzsLQggoioJOp4NSqQQhBF6v95U1Mz8/D47jcOjQIVRVVW1aLJZ7Ho/HRqxW691IJFKSnMvlkM1mcePGDWQymR3Fl0qlMDc3h+vXr2NxcXHPvaNQKGBtbQ2JRAIKhQIOh2OZ2Gy2r3mef+1r+KaanZ2F1Wq9S1iWve1wON45wLVr12AymX4lbrf7k1cV0Zsqn88jk8lAEASMjY2hr68POp0Oer3+IQkGg7xcLhd98XZTLpdDOp2GIAgYHx9HNBpFKBQCx3GwWCw4evQoaJqGRCIpPnYymWyrurr6H6VS+bfP5/uIRKPRCoqi4PF4EI/HEY1G0d/fj7Nnz8Lj8YBlWTAMg2PHjkGj0aChoQG1tbVb9fX1z1Uq1VODwfB7a2vrjwzDfNvR0fGl0+n8jOO4m6dPnxa6urrGfD7fB6FQyBEMBnXDw8PlL21GTqfzU41G81ir1T4ym82/nDhx4t7JkyfvsCx7m+O4mzzPT/n9/g97enrYgYGB90V7+37sx2vGvzLcB2cx/yYCAAAAAElFTkSuQmCC);\
  }\
  toolbar:not([id="UC-addon-bar"]) #UC-addon-bar-close-button {\
	  list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB20lEQVQ4jc2SP8gScRzGj6ZoufUgRHAIXJrE8/xzqOfpeZyi6DmcCCJqkwk6CQa+mTiIgic65SDCkckh56/2lqigJWgsgvYKQiJeyqepl463wJbogWf4fuH58H3gS1H/lVRVvV6v1x95vd53sVhs/teAaDT6kGVZiKIIhmGOsiw7Tw7zPP+YYZjjdrsFIQSSJCEUCh0ikcjzXq935Y/BdDp9M5FI3HO5XMd+v4+fAMMwMBwO4XQ64fF4XofD4Qccxz2RJOm2DeBwOA40TWM+n4MQYvPZ2RkEQUCtVsNkMoGmafD5fC9sgFKp9N2yrEthQggajYZt1nUdLMu+tAFomoYkSdB1HYQQrNdrjEYj7Pd7dLtdiKJ4ATBNEx6P50O5XL56ASgUCuemaSKXy2Gz2SAWi6HT6aBarcKyLGQyGdsVi8UCbrf7kEqlblEURVGZTOYLIQTj8RjNZhPT6RSmaULTNBSLRbRarUvVVqsVKpUK/H7/e0qW5U+/63+K8/n8ORWPx9/8utztdjAMA8vlErPZDIPBAO12G5VKBaqqflMU5asgCJ+9Xu/HQCDwjEokEneCweBbnudfcRz3NBgMkkgkcj+ZTN5VFKWWTqfFbDZ7o16vXzv5K/+pfgBxjkqgGUL8RAAAAABJRU5ErkJggg==);\
  }\
  #UC-status-bar-container {\
  	margin: 1px 0px;\
  }\
  #status-bar {\
  	min-width: 1px;\
  	height: auto !important;\
  	display: -moz-box;\
  }\
  #status-bar > statusbarpanel {\
  	border-width: 0;\
  	-moz-appearance: none;\
  }\
  toolbarspring[cui-areatype="menu-panel"],\
  toolbarpaletteitem[place="palette"] > toolbarspring,\
  #main-window[customize-entered] toolbarspring {\
  	background-color: white;\
  	border: 1px solid rgba(0, 0, 0, 0.85);\
  	margin: 3px;\
  }\
  #UC-status-bar-container[cui-areatype="menu-panel"] {\
  	max-width: calc(22.35em - 0.1px);\
  	width: calc(22.35em - 0.1px);\
  	background-color: rgba(0,0,0,.1);\
  	margin: 3px 0px;\
  	border: 1px solid rgba(0,0,0,.05);\
  	border-radius: 2px;\
  }\
  toolbarpaletteitem[place="palette"] > #UC-status-bar-container,\
  #main-window[customize-entered] #UC-addon-bar #UC-status-bar-container {\
  	min-width: 60px;\
  	margin: 3px;\
  	padding: 0px;\
  	background-color: rgba(255, 255, 255, 0.55);\
  	box-shadow: 0 0 4px black inset;\
  	background-image: repeating-linear-gradient(-70deg, transparent, transparent 15px, rgba(0,0,0,.2) 16px, rgba(0,0,0,.2) 30px, transparent 31px);\
  }\
  #customization-container {\
    -moz-box-orient: vertical !important;\
  }\
  '.replace(/[\r\n\t]/g, ''));
