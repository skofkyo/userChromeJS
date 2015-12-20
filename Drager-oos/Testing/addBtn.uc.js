// ==UserScript==
// @name           addBtn.uc.js
// @note           配置外置版
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/Testing/addBtn.uc.js
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function() {
	addBtn = {
		get FILE() {
			let aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
			aFile.appendRelativePath("local\\_addBtn.js");
			delete this.FILE;
			return this.FILE = aFile;
		},
		configs: {},

		init: function() {
			$("TabsToolbar").appendChild($C('hbox', {
				id: "TabsToolbar-aid",
				class: "toolbar-primary customization-target",
				fullscreentoolbar: "true",
				customizable: "true",
				mode: "icons",
				iconsize: "small",
				ordinal: "99",
				onclick: "event.preventDefault(); event.stopPropagation();"
			}));
			$("urlbar-icons").appendChild($C('hbox', {
				id: "urlbar-icons-aid",
				ordinal: "99",
				onclick: "event.preventDefault(); event.stopPropagation();"
			}));
			var menuitem = $('devToolsSeparator').parentNode.insertBefore($C('menuitem', {
				id: 'addBtn-menuitem',
				label: 'addBtn',
				tooltiptext: '左鍵：重載配置\n右鍵：編輯配置',
				oncommand: 'setTimeout(function() {addBtn.rebuild(true);}, 10);',
				onclick: 'if (event.button == 2) {event.preventDefault(); addBtn.edit(addBtn.FILE);}'
			}), $('devToolsSeparator'));

			setTimeout(function() {addBtn.rebuild();}, 1000);
		},
		rebuild: function(isAlert) {
			var aFile = this.FILE;
			if (!aFile || !aFile.exists() || !aFile.isFile()) {
				this.log(aFile? aFile.path : "配置文件");
				return;
			}

			var data = this.loadText(aFile);
			var sandbox = new Cu.Sandbox( new XPCNativeWrapper(window) );
			sandbox.Components = Components;
			sandbox.Cc = Cc;
			sandbox.Ci = Ci;
			sandbox.Cr = Cr;
			sandbox.Cu = Cu;
			sandbox.Services = Services;
			sandbox.locale = Services.prefs.getCharPref("general.useragent.locale");

			try {
				Cu.evalInSandbox(data, sandbox, "1.8");
			} catch (e) {
				this.alert("Error: " + e + "\n請重新檢查配置文件.");
				return this.log(e);
			}

			if (sandbox.configs) {
				this.configs = sandbox.configs;
			} else {
				this.alert('配置文件中 configs 不存在');
				return;
			}

			this.loadSubMenu();

			if (isAlert) this.alert("配置已經重新載入");
		},
		loadSubMenu: function() {
			var TabsToolbar = $("TabsToolbar-aid"),
				urlbar = $("urlbar-icons-aid");

			// 重載時防止重複項目
			for (var i = TabsToolbar.childNodes.length - 1; i >= 0; i--) {
				TabsToolbar.removeChild(TabsToolbar.childNodes[i]);
			}
			for (var i = urlbar.childNodes.length - 1; i >= 0; i--) {
				urlbar.removeChild(urlbar.childNodes[i]);
			}

			for (var i = 0; i < this.configs.TabsToolbar.length; i++) {
				var btn = this.configs.TabsToolbar[i];
				let btnItems = TabsToolbar.appendChild($C('toolbarbutton', {
					id: btn.id,
//					label: btn.label,
					tooltiptext: btn.tooltiptext || btn.label || "",
					image: btn.image,
					type: btn.type,
					class: "toolbarbutton-1",
				}));
				if (typeof btn.oncommand == 'function') {
					btnItems.setAttribute('oncommand', btn.oncommand.toSource() + '.call(this, event);');
				} else {
					btnItems.setAttribute('oncommand', btn.oncommand);
				}
				if (typeof btn.onclick == 'function') {
					btnItems.setAttribute('onclick', btn.onclick.toSource() + '.call(this, event);');
				} else {
					btnItems.setAttribute('onclick', btn.onclick);
				}
			}

			for (var i = 0; i < this.configs.urlbar.length; i++) {
				var btn = this.configs.urlbar[i];
				let btnItems = urlbar.appendChild($C('toolbarbutton', {
					id: btn.id,
//					label: btn.label,
					tooltiptext: btn.tooltiptext || btn.label || "",
					image: btn.image,
					type: btn.type,
					class: "toolbarbutton-1",
				}));
				if (typeof btn.oncommand == 'function') {
					btnItems.setAttribute('oncommand', btn.oncommand.toSource() + '.call(this, event);');
				} else {
					btnItems.setAttribute('oncommand', btn.oncommand);
				}
				if (typeof btn.onclick == 'function') {
					btnItems.setAttribute('onclick', btn.onclick.toSource() + '.call(this, event);');
				} else {
					btnItems.setAttribute('onclick', btn.onclick);
				}
			}
		},
		edit: function(aFile) {
			if (!aFile || !aFile.exists() || !aFile.isFile()) return;
			var editor;
			try {
				editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
			} catch(e) {}
			
			if (!editor || !editor.exists()) {
				alert("編輯器的路徑未設置!!!\n請設置 view_source.editor.path");
				toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
				return;
			}

			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0? "gbk": "UTF-8";
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);

			try {
				var path = UI.ConvertFromUnicode(aFile.path);
				var args = [path];
				process.init(editor);
				process.run(false, args, args.length);
			} catch (e) {
				alert("編輯器路徑不正確");
			}
		},
		loadText: function(aFile) {
			var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
			var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
			fstream.init(aFile, -1, 0, 0);
			sstream.init(fstream);

			var data = sstream.read(sstream.available());
			try { data = decodeURIComponent(escape(data)); } catch(e) {}
			sstream.close();
			fstream.close();
			return data;
		},
		alert: function(aString, aTitle) {
			Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
				.showAlertNotification("", aTitle||"addBtn" , aString, false, "", null);
		},
		log: function() {
			Application.console.log(Array.slice(arguments));
		},
	};
	var css = '\
		#urlbar-icons-aid toolbarbutton,\
		#urlbar-icons-aid toolbarbutton > .toolbarbutton-icon {padding:0px!important;}\
		:moz-any(#urlbar-icons-aid, #TabsToolbar-aid) toolbarbutton dropmarker{display:none;}\
		'.replace(/[\r\n\t]/g, '');;
	addBtn.style = addStyle(css);
	addBtn.init();
	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	}
})();
