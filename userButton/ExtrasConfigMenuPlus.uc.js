// ==UserScript==
// @name                ExtrasConfigMenuPlus.uc.js
// @include             main
// @charset             UTF-8
// @note                extras_config_menu.uc.js から機能削減+α
// @note                スクリプトの有効無効を切り替えるコードはalice0775氏のrebuild_userChrome.uc.xulから拝借
// @version             2.0.1  Fx47以降でアイコン右クリックによる再起動ができなくなっていたのを修正
// @version             2.0.0  スクラッチパッドをエディタにする機能を廃止、Fx44以降で再起動できなくなっていたのを修正
// @version             1.9.9  真偽値の設定を切り替えるするtoggle関数を追加
// @version             1.9.8  要素を追加する際に$(id)と書ける様に
// ==/UserScript==
/*
■ edit & open関数について

ファイルを編集する場合は'edit'関数を使う
ファイルやフォルダを開く場合は'open'関数を使う
真偽値を切り替える場合は'toggle'関数を使う

各関数の第一引数は基点にするフォルダを指定する
  0 = chrome
  1 = profile
  2 = C:\\WINDOWS ※XPの場合
  3 = C:\\Program Files ※XPの場合
  4 = 第二引数にフルパスを書く場合 ※\\は\\\\にする
 'C' = Cドライブ
 'D' = Dドライブ

第二引数は第一引数で指定した基点フォルダにあるファイルかフォルダ名を指定する
[]で囲むのとファイル(フォルダ)名を''で括るのを忘れずに

// profileフォルダ内のprefs.jsを編集する例
ECM.edit(1, ['prefs.js'])

// chromeフォルダを開く例
ECM.open(0)

// firefoxを起動する例(第三引数のパラメータは省略可)
ECM.open(3, ['Mozilla Firefox', 'firefox.exe'], '-no-remote')

// javascriptの有効無効を切り替える例
ECM.toggle('javascript.enabled')

*/
(function () {

	'use strict';

	Cu.import('resource://gre/modules/Preferences.jsm');

	window.ECM = {

		editor: 1,
		urlbar: false,//位置 true為網址列 false可移動按鈕
		//editor: 'D:\\Software\\TeraPad\\TeraPad.exe',
		// 1 = view_source.editor.pathに設定したエディタ
		// エディタへのフルパスを記述すればそのエディタを使う ※パスを''で囲い\は\\に置き換える
		removeExt: true,  // スクリプトリスト内のファイル名から拡張子を取り除く

		itemLength: null,

		init: function () {
			try {
				CustomizableUI.createWidget({
					id: 'ExtrasConfigMenu',
					type: 'custom',
					defaultArea: CustomizableUI.AREA_NAVBAR,
					onBuild: function(aDocument) {
						var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
						var attributes = {
							id: 'ExtrasConfigMenu',
							class: 'toolbarbutton-1 chromeclass-toolbar-additional',
							removable: 'true',
							onclick: 'ECM.onClick(event)',
							label: 'ExtrasConfigMenu+',
							tooltiptext: '左鍵：ExtrasConfigMenu+選單\n中鍵：打開Chrome資料夾\n右鍵：重新啟動(清除緩存)',
							type: 'menu',
							context: "_child",
							style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC)'
						};
						for (var a in attributes)
							toolbarbutton.setAttribute(a, attributes[a]);
							
						var aPopup = aDocument.createElement('menupopup');
						aPopup.setAttribute('id', 'ecm-popup');
						aPopup.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
						toolbarbutton.appendChild(aPopup);
						aPopup.addEventListener('popupshowing', (event) => ECM.onpopup(event));		
			
						return toolbarbutton;
					}
				});
			} catch(e) { };
			/* ==================== ここから設定 ==================== */
			var Folderimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIklEQVQ4jcXTS08TYRSA4e8X8FOUBAEBp9yauDLuXCnqQqUUNMpFEzExpG60EBwGqAEWuGAhMXHBAiSiG4MRaKe1Q+lMLSQEgpIYaG3pXMrrYhSMkUTdeJJn+ybny/mE+O8THW58oSoSEbmaiFyNqkhEh+tifxxQFQmcFOytuCyDpb5ywo+rDqKHalAViVioIXEQiMg1sKdhRi9RUC9T3J6CfBIKuss0wEq57BSwhjroITZUX3YYyL/H1HyYWium5sfUfFiaDzvRghVvZne+icx8E5l3FyisT6EqEm97Jd/3wCnIvsHWb2IbHThGpyvVhaW3Ex/1shCsZCFYwWKwnMXeE4T7T7pvFWrYFhFZgq8z2EY7mUU/2aVWsuFWsuE24qOn+fTynLtKPgH5ZchrsKeBY6AqHoSqeGBnkuUxLwvBikOPKvk8dx47eQNruQVTa8aMX8OMX8VJ95Bfe8ZsoHJGqIN15BIPWRn3QvEjWDpYBlhpnFQHltGFpXdi6R2u5C3YGmfzdTcjbceaRHSoga05P5uv2iAzSzHdiZO+jZO+g7N6F2f13k+6Ka7dh53nfBg7gxCiRMRCjSQnzpLT++DLU/Y3etjfCLg2H/wiANtD5FaCzAaqpoUQQsSeeFGVWrAnITsCuzLsDhytMMH69BVGr5dedE855M3EQo2oSh0R2UNY9hCWa48UGahlSanfEUKU/DjGUiFE2V86/g/f7vfzDeaZGzZA26PeAAAAAElFTkSuQmCC"
			var Editimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII="
			var mp = $('ecm-popup');
			
			//移動選單(腳本生成的選單無效)
			//mp.appendChild($('tools-menu'));//工具選單
			//mp.appendChild($('webDeveloperMenu'));//網頁開發者
			
			// メモリ開放
			mp.appendChild(this.createME('menuitem', '釋放記憶體', () => {
				var os = Services.obs;
				var gMgr = Cc['@mozilla.org/memory-reporter-manager;1'].getService(Ci.nsIMemoryReporterManager);
				var parentWindow = Services.wm.getMostRecentWindow('navigator:browser');
				os.notifyObservers(null, 'child-gc-request', null);
				Cu.forceGC();
				os.notifyObservers(null, 'child-cc-request', null);
				parentWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils).cycleCollect();
				os.notifyObservers(null, 'child-mmu-request', null);
				gMgr.minimizeMemoryUsage(() => '');
			}, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEAUlEQVRYhe2W30tbZxzGn1ZPTJwWf0wHUnSYVmM01l9R+22TqalHW0nUaLRWMUbtrNGY6HRSdaMOCRVXnHPgil4IKgx2UVroRSne7B97dnGiydkmuziu7MIXnvO85/3wfr8PL++BA1yNq3E1/hdj3ryGhUx+Us2b15IBYpkcfR/i9OnsJ9Ho+xARy+R5/+tzFk59DLP/t8Fz1U828OUfm3+bXwaf+hjm9TlLMkDajIWTH6boPwmw+9DPcDjMjY0NncLhMLsP/Ya5/yTAyQ9TTJtJCZD+zELfcQ9H34ZYNeigiNDlcukkInRONxriVYMOjr4Nsfukl+nPUk9gQgna1m0cezfBxaOlCwt8fTBliC8eLXHs3QRtP1QwbdIc0n0IppCZI2+CbIu3X1igLd5umI+8CdIUMlPXXBlWgmUrZRz6fYTlXhtFhG63WycRYfXoHUO83GvTeqyWURlRkidgHspg+14H+44GGN2PUUTY2tqqk4gwtDtuiEf3Y/QfBaj+2kHzUEbyFCyBDPqPA/Rsqby/oqX1eDw6iQjvr7gNc8+WSv9xgJZASoBMv4m+w162xD0sVa0UEaqqqpOIsKLfboiXqla2xD30HfYy029KBsjymdh14KNrvYXTu2GKCDs7O3USET55OWyIT++G6VpvYdeBj1m+lADZD03s2HtEWXOxIeKkiLCrq0snEWFDxGmYy5qLHXuPmP0wJcANVWH7TifvLt9jsbuEIkKv16uTiPBW121DvNhdwrvL99i+08kbqpIMkNOmsHXrARsXmjm5+fTC77j/+4AhPrn5lI0LzWzdesCctpQAuW6FrngL6+acdISqabfbWVpaqpPdbqcjVG2Y18056Yq3MNedEiBP0ikvXKyZrmVV0EGr9xZzbXlUxzpY4vmSubY89sz1siroMMxrpmspL1zMk/RkgPymdDatCmsjDXSMV9M+UknbUIVO9pFKOsarL+SOiWo6l5vpXG5mXczJqjHHP/KmVWHTqjC/KSVAQb1Ca3cRo9uNHFws5Ey8jgPfaN6/oHlfTHN/tIAz8Tr2RDTvntV88HkRrd1FTK2Vuje63XjOz3T+PwJAKaxRuLbfwOFv8/n8l1o+WdL88WLCFzQfmNe8P6p5X0Tz4ZVCFtYoBJBzVit173f7DWfcDEBJ9L2GxEJ+oUPh61OVsZ0avj5VGf3pjubbmi/8rK1HXmnvkR81n91K8kKHQgBtZ7X+ujfBrQAKAFgApAHADQClX1QqvAwBWPwX/hWA2wByAJgAIAvATQB1ADoADAIYBRC6RAUBPAbQCaAeQDGAbADpSDw+A5CfCGIFUAag/BJVlqh7E8DniX5n9wDXEpO0xKIJQMZ/IFOiflrqBfwTnBS0PMCw0bsAAAAASUVORK5CYII='));
			
			//添加選單
			//mp.appendChild(this.createME('類型', '名稱', '命令', '圖示', 'ID', 'tooltiptext'));
			//mp.appendChild(this.createME('menuitem', 'empty.vbs', 'ECM.open(2, ["system32", "empty.vbs"])'));
			//mp.appendChild(document.createElement('menuseparator'));//分割線
			//mp.appendChild(this.createME('menuitem', 'Javascript 開/關', 'ECM.toggle("javascript.enabled")','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABZklEQVRIie3Vv0uVcRTH8VeD0iIOIUQFgUKLTnW5NEU0WKuKg7gKDgZB4BTYP9AcBFFU6NLUUEOTvyIcJEJQmwoaGhKCkG5Ddhu+98LTuc/z+HB19ANnOp9z3l++5/uDEyX14yLOoadKwXPsZmIkxzOEh/iKZib+4APuo7cIsByKaiE/hUbwxPiGU90A6q1VljVv4llR88MAr0JuFddwHpcwhicY7xawF3IXyhp1A/gZcqPHDYi5X1jAmeMC3JQ/1N9YlA7BkQBwGwcFoCZeoO8oALiKdyWQNSW3ugqgrZp0o/dzILNFRevBeLkE0NZZvA91r4vMn4NxsAIAboS6zTxTPZga/t/LQcUDnAm1b0hX+w6mcQ/f80wZPZL2+yXuYgKTeKDzAZyDJZ3Dycb1APh0iL8dH3EaNgoMfzEfmg9UbL4iDR3piO3gRyu28RhX5GtY+kze4ov0Nu1hC09xS8k/cKIO/QOGV8uOXSg5XgAAAABJRU5ErkJggg=='));
			//mp.appendChild(document.createElement('menuseparator'));//分割線
			//mp.appendChild(this.createME('menuitem', '編輯userChrome.css', 'ECM.edit(0, ["userChrome.css"])', Editimg));
			//mp.appendChild(this.createME('menuitem', '編輯userContent.css', 'ECM.edit(0, ["userContent.css"])', Editimg));
			//mp.appendChild(document.createElement('menuseparator'));//分割線
			mp.appendChild(this.createME('menuitem', '編輯prefs.js', 'ECM.edit(1, ["prefs.js"])', Editimg));
			mp.appendChild(this.createME('menuitem', '編輯user.js', 'ECM.edit(1, ["user.js"])', Editimg));
			//mp.appendChild(this.createME('menuitem', '編輯_keychanger.js', 'ECM.edit(0, ["_keychanger.js"])', Editimg));
			//mp.appendChild(this.createME('menuitem', '編輯_uAutoPagerize.js', 'ECM.edit(0, ["_uAutoPagerize.js"])', Editimg));
			mp.appendChild(document.createElement('menuseparator'));//分割線
			mp.appendChild(this.createME('menuitem', '打開Chrome資料夾', 'ECM.open(0)', Folderimg, 0, '打開Chrome資料夾'));
			mp.appendChild(this.createME('menuitem', '打開Profile資料夾', 'ECM.open(1)', Folderimg));
			//mp.appendChild(this.createME('menuitem', 'Inspect Element 設置', 'InspectElement.openPref();'));
			//mp.appendChild(this.createME('menuitem', '打開SubScript資料夾', 'ECM.open(0, ["SubScript"])', Folderimg));
			//mp.appendChild(this.createME('menuitem', '打開CSS資料夾', 'ECM.open(0, ["CSS"])', Folderimg));
			//mp.appendChild(this.createME('menuitem', '打開UserScriptLoader資料夾', 'ECM.open(0, ["UserScriptLoader"])', Folderimg));
			//mp.appendChild(this.createME('menuitem', '打開安裝資料夾', 'ECM.open(3, ["Mozilla Firefox"])', Folderimg));
			//mp.appendChild(document.createElement('menuseparator'));//分割線
			//mp.appendChild($('aboutName').cloneNode(false));

			/* ==================== END ==================== */

			this.itemLength = mp.childNodes.length;
			this.addPrefListener(ECM.readLaterPrefListener);
			window.addEventListener('unload', this, false);
			if (this.urlbar) {
				$('urlbar-icons').appendChild($('ExtrasConfigMenu'));
				 var style = ' \
					  @namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul); \
					  #urlbar-icons #ExtrasConfigMenu > dropmarker { display: none; } \
					  #urlbar-icons #ExtrasConfigMenu .toolbarbutton-icon {\
						padding: 0!important;\
						background: none !important;\
						border: none !important;\
						box-shadow: none !important;\
					  }\
					  #urlbar-icons #ExtrasConfigMenu {\
						padding: 0px 2px !important;\
						margin: -6px 0 !important;\
					  }\
					 '.replace(/\s+/g, " ");
					var sspi = document.createProcessingInstruction(
					  'xml-stylesheet',
					  'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
					);
					document.insertBefore(sspi, document.documentElement);
			}
		},

		handleEvent: function (event) {
			if (event.type === 'unload') {
				this.removePrefListener(ECM.readLaterPrefListener);
				this.itemLength = null;
			}
		},

		onClick: function (event) {
			if (event.button === 1) {
				//gBrowser.selectedTab = gBrowser.addTab("about:config")
				//switchToTabHavingURI("about:config", true);
				Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).launch();
			} else if (event.button === 2) {
				Services.appinfo.invalidateCachesOnRestart();
				('BrowserUtils' in window) ? BrowserUtils.restartApplication() : Application.restart();
			}
		},

		edit: function(key, pathArray) {
			var vieweditor = Services.prefs.getCharPref("view_source.editor.path");
			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "BIG5" : "UTF-8";
			var path =UI.ConvertFromUnicode( this.getPath(key, pathArray));
			if (this.editor === 1) {
				if (!vieweditor) {
					//alert("請先設定文字編輯器的路徑!!!\nabout:config view_source.editor.path\n字串值填入路徑 例如：C:\\Windows\\notepad.exe");
					//switchToTabHavingURI("about:config?filter=view_source.editor.path", true);
					//return;
					alert("請先設定文字編輯器的路徑!!!");
					var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
					fp.init(window, "設定全局腳本編輯器", fp.modeOpen);
					fp.appendFilter("執行檔案", "*.exe");
					if (fp.show() == fp.returnCancel || !fp.file)
						return;
					else {
						vieweditor = fp.file;
						Services.prefs.setCharPref("view_source.editor.path", vieweditor.path);
					}
					return;
				}
				this.launch(Services.prefs.getCharPref('view_source.editor.path'), path);
			} else {
				this.launch(this.editor, path);
			}
		},
    
		open: function (key, pathArray, arg) {
			var path = this.getPath(key, pathArray);
			this.launch(path, arg);
		},

		launch: function (path, arg) {
			arg = [arg] || [];
			var file = this.getLocalFile(path);
			if (!file.exists()) {
				return;
			}

			if (file.isExecutable()) {
				var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
				process.init(file);
				process.run(false, arg, arg.length);
			} else {
				file.reveal();
			}
		},

		getLocalFile: function (path) {
			var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
			file.initWithPath(path);
			return file;
		},

		getDir: function (key, pathArray) {
			var dir;
			if (key.indexOf('\\') !== -1) {
				dir = this.getLocalFile(key);
			} else {
				dir = Services.dirsvc.get(key, Ci.nsILocalFile);
			}
			if (pathArray != null) {
				for (var i = 0, len = pathArray.length; i < len; ++i) {
					dir.append(pathArray[i]);
				}
			}
			return dir.path;
		},

		getPath: function (key, pathArray) {
			pathArray = pathArray || [];
			var path = '';
			switch (key) {
			case 0:
				path = this.getDir('UChrm', pathArray);
				break;
			case 1:
				path = this.getDir('ProfD', pathArray);
				break;
			case 2:
				path = this.getDir('WinD', pathArray);
				break;
			case 3:
				path = this.getDir('ProgF', pathArray);
				break;
			case 4:
				path = pathArray;
				break;
			case 'C':
				path = this.getDir('C:\\', pathArray);
				break;
			case 'D':
				path = this.getDir('D:\\', pathArray);
				break;
			}
			return path;
		},

		toggle: function (prefName) {
			var pref = this.getPref(prefName);
			var prefType = Services.prefs.getPrefType(prefName);
			if (prefType === Ci.nsIPrefBranch.PREF_BOOL) {
				this.setPref(prefName, !pref);
			}
		},

		createME: function (sTyp, sLabel, sCommand, sImage, sId, stooltiptext) {
			const XUL_NS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
			var ele = document.createElementNS(XUL_NS, sTyp);
			switch (sTyp) {
			case 'menuitem':
				ele.setAttribute('label', sLabel);
				if (typeof sCommand === 'function') {
					ele.setAttribute('oncommand', '(' + sCommand.toSource() + ').call(this, event);');
				} else {
					ele.setAttribute('oncommand', sCommand);
				}
				if (sImage) ele.setAttribute('image', sImage);
				if (stooltiptext) ele.setAttribute('tooltiptext', stooltiptext);
				ele.setAttribute('class', 'menuitem-iconic')
				break;
			case 'menu':
				ele.setAttribute('label', sLabel);
				ele.setAttribute('id', sId);
				ele.setAttribute('class', 'menu-iconic')
				break;
			case 'menupopup':
				ele.setAttribute('id', sId);
				break;
			}
			return ele;
		},

		onpopup: function (event) {
			var mp = event.target;
			if (mp !== event.currentTarget) {
				return;
			}

			for (let i = this.itemLength, len = mp.childNodes.length; i < len; i++) {
				mp.removeChild(mp.lastChild);
			}

			var sep = document.createElement('menuseparator');
			mp.appendChild(sep);

			var scripts = userChrome_js.scripts.concat(userChrome_js.overlays);
			for (let j = 0, lenj = userChrome_js.arrSubdir.length; j < lenj; j++) {
				var dirName = (userChrome_js.arrSubdir[j] == '') ? 'root' : userChrome_js.arrSubdir[j];
				var flg = false;
				for (var i = 0, len = scripts.length; i < len; i++) {
					var script = scripts[i];
					if (script.dir !== dirName) continue;
					flg = true;
					break;
				}

				if (!flg) continue;

				var menu = mp.appendChild(document.createElement('menu'));
				menu.setAttribute('label', 'chrome/' + (dirName == 'root' ? '' : dirName));
				menu.dirName = dirName;

				var mp = menu.appendChild(document.createElement('menupopup'));
				mp.setAttribute('onpopupshowing', 'event.stopPropagation();');

				var flg = false;
				for (let i = 0, len = scripts.length; i < len; i++) {
					var script = scripts[i];
					var type = script.filename.lastIndexOf('uc.js') !== -1;
					if (script.dir != dirName) continue;
					if (flg && type !== flg) {
						var sep = document.createElement('menuseparator');
						mp.appendChild(sep);
					}
					flg = type;
					var mi = mp.appendChild(document.createElement('menuitem'));
					mi.setAttribute('label', this.removeExt ? script.filename.replace(/\.uc\.js$|\.uc\.xul$/g, '') : script.filename);
					mi.setAttribute('oncommand', 'ECM.chgScriptStat(script.filename);');
					mi.setAttribute('onclick', 'if (event.button !== 0) { event.preventDefault(); event.stopPropagation(); ECM.clickScriptMenu(event); }');
					//mi.setAttribute('closemenu', 'none');
					mi.setAttribute('type', 'checkbox');
					mi.setAttribute('checked', !userChrome_js.scriptDisable[script.filename]);
					if (script.description) {
						mi.setAttribute('tooltiptext', '左鍵：啟用 / 禁用\n中鍵：復選啟用 / 禁用\n右鍵：編輯\n\n' + '說明：' + script.description);
					} else {
						mi.setAttribute('tooltiptext', '左鍵：啟用 / 禁用\n中鍵：復選啟用 / 禁用\n右鍵：編輯');
					}
					
					mi.script = script;
				}
				mp = event.target;
			}
		},

		clickScriptMenu: function (event) {
			var target = event.target;
			var script = target.script;
			var fileURL = Services.io.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(script.url);
			if (event.button === 1) {
				this.chgScriptStat(script.filename);
				target.setAttribute('checked', !userChrome_js.scriptDisable[script.filename]);
			} else if (event.button === 2) {
				this.edit(4, fileURL.path);
			}
		},

		chgScriptStat: function (afilename) {
			var s = this.getPref('userChrome.disable.script');
			if (!userChrome_js.scriptDisable[afilename]) {
				s = (s + ',').replace(afilename + ',', '') + afilename + ',';
			} else {
				s = (s + ',').replace(afilename + ',', '');
			}
			s = s.replace(/,,/g, ',').replace(/^,/, '');
			this.setPref('userChrome.disable.script', s);
			userChrome_js.scriptDisable = this.restoreState(s.split(','));
		},

		restoreState: function (arr) {
			var disable = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				disable[arr[i]] = true;
			}
			return disable;
		},

		getPref: function (prefName) {
			return Preferences.get(prefName);
		},

		setPref: function (prefName, value) {
			Preferences.set(prefName, value);
		},

		addPrefListener: function (aObserver) {
			Services.prefs.addObserver(aObserver.domain, aObserver, false);
		},

		removePrefListener: function (aObserver) {
			Services.prefs.removeObserver(aObserver.domain, aObserver);
		},

		readLaterPrefListener: {
			domain: 'userChrome.disable',
			observe: function (aSubject, aTopic, aPrefstring) {
				if (aTopic === 'nsPref:changed') {
					setTimeout(() => {
						var s = ECM.getPref('userChrome.disable.script');
						userChrome_js.scriptDisable = ECM.restoreState(s.split(','));
					}, 0);
				}
			}
		}
	};
	window.ECM.init();
	
	function $(id) {
		var ele = {};
		if (ele[id] == null)
			ele[id] = document.getElementById(id);
		return ele[id];
	}

}());
