// ==UserScript==
// @name           SelectTrigger.uc.js
// @note           28.03.2015 - 新增部份快捷鍵 (F: 定位到 findbar, A: 新分頁前景, G: Google 加密, B: 百度, T: Google 翻譯, I: Google 加密站內, P: Google 圖片, D: 刪除, H: 高亮, S: 定位到 searchbar, U: 定位到 urlbar)
// @note           22.03.2015 - 新增自動複製及統計選取字數
// @note           20.09.2014 - 新增雙擊頁面觸發彈出，及添加 state 區分按鈕出現條件和在部分網頁不觸發
// @note           17.09.2014 - 新增搜索菜單按鈕
// @note           12.09.2014 - 新增翻譯功能 (P.S. 翻譯字數約 200 字)
// @note           07.09.2014 - 修改為配置外置版
// @note           31.07.2014 - 新增快捷鍵 (C: 複製, V: 貼上)
// @note           29.07.2014 - 新增限制條件，分別為於輸入框內或當按住 Ctrl/Shift/Alt 時
// @note           28.07.2014 - 選取文字後自動彈出自定選單
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/MainScript/SelectTrigger.uc.js
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function() {
	ST = {
		get FILE() {
			let aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
			aFile.appendRelativePath("local\\_SelectTrigger.js");
			delete this.FILE;
			return this.FILE = aFile;
		},
		configs: {},
		init: function() {
			var STPopup = $("mainPopupSet").appendChild($C("menupopup", {
				id: "SelectTrigger-popup",
				onpopupshown: "\
				if (getBrowserSelection()) {\
					goDoCommand('cmd_copy');\
					ST.ShowPrompt('複製：' + readFromClipboard());\
				}"
			}));
			var STMG = STPopup.appendChild($C("menugroup", {
				id: "SelectTrigger-menugroup",
				onclick: "document.getElementById('SelectTrigger-popup').hidePopup();",
				onDOMMouseScroll: "document.getElementById('SelectTrigger-popup').hidePopup();"
			}));
			var KeyC = STPopup.appendChild($C("menuitem", {
				accesskey: "C",
				command: "cmd_copy",
			}));
			var KeyV = STPopup.appendChild($C("menuitem", {
				accesskey: "V",
				command: "cmd_paste",
			}));
			var KeyF = STPopup.appendChild($C("menuitem", {
				accesskey: "F",
				command: "cmd_find",
			}));
			var KeyA = STPopup.appendChild($C("menuitem", {
				accesskey: "A",
				oncommand: "gBrowser.selectedTab = gBrowser.addTab(getBrowserSelection() || readFromClipboard());",
			}));
			var KeyG = STPopup.appendChild($C("menuitem", {
				accesskey: "G",
				oncommand: "ST.EngineSearch('https://encrypted.google.com/#q=');",
			}));
			var KeyB = STPopup.appendChild($C("menuitem", {
				accesskey: "B",
				oncommand: "ST.EngineSearch('https://www.baidu.com/s?ie=utf-8&wd=');",
			}));
			var KeyT = STPopup.appendChild($C("menuitem", {
				accesskey: "T",
				oncommand: "ST.EngineSearch('https://translate.google.com/#auto/zh-TW/');",
			}));
			var KeyI = STPopup.appendChild($C("menuitem", {
				accesskey: "I",
				oncommand: "ST.EngineSearch('https://encrypted.google.com/#q=site:' + content.location.host + ' ');",
			}));
			var KeyP = STPopup.appendChild($C("menuitem", {
				accesskey: "P",
				oncommand: "ST.EngineSearch('https://duckduckgo.com/?q=!img ');",
			}));
			var KeyD = STPopup.appendChild($C("menuitem", {
				accesskey: "D",
				oncommand: "ST.ShowPrompt('刪除：' + content.getSelection()); content.getSelection().deleteFromDocument(0);",
			}));
			var KeyH = STPopup.appendChild($C("menuitem", {
				accesskey: "H",
				oncommand: "gWHT.addWord(getBrowserSelection() || readFromClipboard());",
			}));
			var KeyS = STPopup.appendChild($C("menuitem", {
				accesskey: "S",
				oncommand: "ST.FocusTo('searchbar');",
			}));
			var KeyU = STPopup.appendChild($C("menuitem", {
				accesskey: "U",
				oncommand: "ST.FocusTo('urlbar');",
			}));
			var menuitem = $('devToolsSeparator').parentNode.insertBefore($C('menuitem', {
				id: 'SelectTrigger-menuitem',
				label: 'SelectTrigger',
				tooltiptext: '左鍵：重載配置\n右鍵：編輯配置',
				oncommand: 'setTimeout(function() {ST.rebuild(true);}, 10);',
				onclick: 'if (event.button == 2) {event.preventDefault(); ST.edit(ST.FILE);}'
			}), $('devToolsSeparator'));

			setTimeout(function() {ST.rebuild();}, 1000);
			ST.startup();
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
			var STMG = $("SelectTrigger-menugroup");

			// 重載時防止重複項目
			for (var i = STMG.childNodes.length - 1; i >= 0; i--) {
				STMG.removeChild(STMG.childNodes[i]);
			}

			for (var i = 0; i < this.configs.buttons.length; i++) {
				var btn = this.configs.buttons[i];
				let btnItems = STMG.appendChild($C('toolbarbutton', {
					tooltiptext: btn.label,
					image: btn.image,
					state: btn.state
				}));
				if (typeof btn.onclick == 'function') {
					btnItems.setAttribute('onclick', btn.onclick.toSource() + '.call(this, event);');
				} else {
					btnItems.setAttribute('onclick', btn.onclick);
				}
				if (typeof btn.onDOMMouseScroll == 'function') {
					btnItems.setAttribute('onDOMMouseScroll', btn.onDOMMouseScroll.toSource() + '.call(this, event);');
				} else {
					btnItems.setAttribute('onDOMMouseScroll', btn.onDOMMouseScroll);
				}
			}

			var SearchBtn = STMG.appendChild($C("toolbarbutton", {
				id: "SearchMenu-button",
				type: "menu",
				tooltiptext: "左鍵：Google 加密\n中鍵：百度貼吧\n右鍵：Google 加密站內\n向上滾動：百度圖片\n向下滾動：Google 圖片\n\n❖ 若搜索欄有文字，便搜尋搜索欄文字\n❖ 若搜索欄沒有文字並選取了文字，便搜尋選取文字\n❖ 否則便搜尋剪貼簿中的文字\n❖ 新分頁前景",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACo0lEQVQ4jY3Mz2vTcBgG8FdnallK3VKW/mAuLLD1B8OlI23arW22NGWHUNMcwkAHybZT0a21uq60PWQDxzwNetCL9KJ40FvBg55E/wTR01BBEMSDB0Xc6vZ6Sike5r7wuTzf530AAMCyrPP1ev2apmlPFUV5eRpN0540m80CAJwD+9g0zcfhcBhDoRCGw+FThUIhjEQiaJpmCwAAGo2GHgwGcWJiomdqaupYFMWPkiS9TSaTP/r/bJFIBGu1mgT5fP4Ry7Jok2X51dbW1rSu6wOtVuuiZVkuwzBucRz3q7/HsiwqirIPkiR1GIZBhmFwfn7+tWVZg2tra9VMJvNZEISfuVzuRbPZDBaLxcLk5OSx3WUYBmVZboMoip1AIIDj4+Mn1WqVX11dvT06OoqBQKAnHo9/2tvbuyRJ0vP+fGFhoQ2pVKrj9XpxZmbmi67rA/F4/MDr9WI/mqZxeXn5uq7rN2ma7uXpdLoNyblkh6Io5DjuQNf1gWg0+o2iKPyXqqo3TNM0+7NUKtWGRCLRcbvdyLLs793dXU86nX7mdruxn9/v725sbEwtLi7u9+eJRKINsVisQ5IkkiSJ+Xx+u9FoXOY47p3L5UKSJNHn8x0pinIHAM4LgvDe7pIkiYIgtIHn+Y7T6USn04kjIyNHhmGsWJY1aBjGVVVVV0qlUtCyrAsAAOvr69Msy361+70Bh8OBNpIkT3ief6Oqam1paakoy/IDnuc/lMvlJABAuVzm/H7/ocPhwFgs1oZMJvOQIAj8n7Gxse+bm5tzOzs7MZ/Pd0gQBIqieA8qlUrW5XKdnGXE4/F0aZruEgSBw8PDfyqVShQAADRN2x4aGjo+ywhBEEhRVLdQKJSg/9VqtVg2m707Ozt7/zS5XG67Xq9fse/+AnDURgQylYErAAAAAElFTkSuQmCC",
				style: "padding: 0px;",
				onclick: "\
				var url = ['https://encrypted.google.com/#q=', 'http://tieba.baidu.com/f?ie=utf-8&kw=', 'https://encrypted.google.com/#q=site:' + content.location.host + ' '];\
				ST.EngineSearch(url[event.button]);\
				",
				onDOMMouseScroll: "\
				if (event.detail > 0) {var url = 'https://duckduckgo.com/?q=!img ';}\
				else {var url = 'http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=';}\
				ST.EngineSearch(url);\
				return;\
				",
			}));
			var SearchPopup = SearchBtn.appendChild($C("menupopup", {id: "SearchMenu-popup"}));

			for (var i = 0; i < this.configs.menuitems.length; i++) {
				var mi = this.configs.menuitems[i];
				let miItems = SearchPopup.appendChild($C('menuitem', {
					label: mi.label,
					tooltiptext: "左鍵：新分頁前景\n中鍵：此分頁\n右鍵：新分頁背景\n\n❖ 若搜索欄有文字，便搜尋搜索欄文字\n❖ 若搜索欄沒有文字並選取了文字，便搜尋選取文字\n❖ 否則便搜尋剪貼簿中的文字",
					image: mi.image,
					class: "menuitem-iconic",
					url: mi.url,
					onclick: "ST.SwitchSearch(event); event.preventDefault(); event.stopPropagation();"
				}));
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
				.showAlertNotification("", aTitle||"SelectTrigger" , aString, false, "", null);
		},
		log: function() {
			Application.console.log(Array.slice(arguments));
		},
		startup: function() {
			gBrowser.mPanelContainer.addEventListener("mouseup", function(e) {
				var eName = e.target.nodeName || e.target.localName || e.target.tagName;
				if (eName == "TEXTAREA" || eName == "INPUT" || e.target.isContentEditable) return;
				if (/^about:(blank|newtab|addons|config)/i.test(content.location.toString())) return;
				if (content.location.host == "github.com" && eName == "DIV") return;
				if (e.ctrlKey || e.altKey || e.shiftKey) return;
				if (e.button == 0 && getBrowserSelection()) {
					$("SelectTrigger-popup").openPopupAtScreen(e.screenX - 60, e.screenY - 40, true);
					var HideCSS = '\
						#SelectTrigger-menugroup toolbarbutton[state="dblclick"] {display:none!important;}\
						#SelectTrigger-menugroup toolbarbutton[state="select"] {display:block!important;}\
					'.replace(/[\r\n\t]/g, '');;
					ST.style = addStyle(HideCSS);
				}
			}, false);
			gBrowser.mPanelContainer.addEventListener("dblclick", function(e) {
				if (/^about:(blank|newtab|addons|config)|chrome:\/\/*/i.test(content.location.toString())) return;
				if (e.ctrlKey || e.altKey || e.shiftKey) return;
				if (e.button == 0) {
					$("SelectTrigger-popup").openPopupAtScreen(e.screenX, e.screenY, true);
					content.document.getSelection().removeAllRanges();
				}
				var HideCSS = '\
					#SelectTrigger-menugroup toolbarbutton[state="dblclick"] {display:block!important;}\
					#SelectTrigger-menugroup toolbarbutton[state="select"] {display:none!important;}\
				'.replace(/[\r\n\t]/g, '');;
				ST.style = addStyle(HideCSS);
			}, false);
			gBrowser.mPanelContainer.addEventListener("mousemove", function(e) {
				if (e.ctrlKey || e.altKey || e.shiftKey) return;
				if (getBrowserSelection()) {
					function countNonAlphabet(str) {
						var m = str.match(/[^\x00-\x80]/g);
						return (!m?0:m.length);
					}
					function countAlphabetWord(str) {
						var m = str.match(/\b[\w-]+\b/g);
						return (!m?0:m.length);
					}
					function countNonSpaceChar(str) {
						var m = str.match(/\S/g);
						return (!m?0:m.length);
					}

					var string = content.getSelection().toString();
					var nonAlphabetNum = countNonAlphabet(string);
					var alphabetWordNum = countAlphabetWord(string);
					var wordNum = nonAlphabetNum + alphabetWordNum;
					var nonSpaceCharNum = countNonSpaceChar(string);
					ST.ShowPrompt('英文字數：' + wordNum + ' | 中文字數：' + nonSpaceCharNum);
				}
			}, false);
		},
		SwitchSearch: function(event) {
			var x = $('searchbar').value || getBrowserSelection() || readFromClipboard(),
				label = event.target.getAttribute('label'),
				url = event.target.getAttribute('url');
			$('searchbar').value = "";
			if (label == "Google 加密站內") {
				var y = url + content.location.host + " " + x;
			}
			else {
				var y = url + x;
			}
			switch(event.button) {
				case 0:
					gBrowser.selectedTab = gBrowser.addTab(y);
				break;
				case 1:
					loadURI(y);
				break;
				case 2:
					gBrowser.addTab(y);
				break;
			}
		},
		EngineSearch: function(url) {
			var txt = getBrowserSelection() || $('searchbar').value || readFromClipboard();
			gBrowser.selectedTab = gBrowser.addTab(url + encodeURIComponent(txt));
		},
		FocusTo: function(ID) {
			$(ID).value = getBrowserSelection() || readFromClipboard();
			$(ID).focus();
		},
		ShowPrompt: function(str) {XULBrowserWindow.statusTextField.label = str;}
	};
	var css = '\
		#SelectTrigger-popup,\
		#SearchMenu-popup {-moz-appearance:none; background:-moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%); border:2px solid rgb(144,144,144); border-radius:5px;}\
		#SearchMenu-button dropmarker,\
		#SelectTrigger-popup autorepeatbutton {display:none;}\
		#SelectTrigger-popup menuitem:not([class="menuitem-iconic"]) {-moz-appearance:none;}\
		#SearchMenu-button .toolbarbutton-icon {margin:0px 3px;}\
		#SelectTrigger-popup {opacity:0.2!important; -moz-transition:opacity 0.3s ease-out!important;}\
		#SelectTrigger-popup:hover {opacity:1!important; -moz-transition:opacity 0.2s ease-in!important;}\
		'.replace(/[\r\n\t]/g, '');;
	ST.style = addStyle(css);
	ST.init();
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
