// ==UserScript==
// @name                Extension Options Menu.uc.js
// @description         拡張を操作するボタンを追加
// @version             3.0.8 (Fx44以降) 再起動に関する修正
// @version             3.0.7 メニューにアイコンが出ていなかったのを修正
// @version             3.0.6 互換性を考慮して書き換え デフォルトでボタンはカスタマイズパレットに配置
// @version             3.0.5 ツールチップに操作法を表示するように コメントアウト內CSSを更新
// @version             3.0.4 一部アドオンの設定畫面が機能していなかったのを修正、メニューパネル內でドロップマーカーが出ないようにするCSSを追記
// @version             3.0.3 (Fx29以降用) ボタンをツールバーパレットから自由に配置できるように変更(メニューパネル內への配置にも対応 ※コメントアウト內のcssを追加するように)
// @version             3.0.1  アルファベット順でソート時にセパレータが出てたのを修正
// @version             3.0.0  プラグインも表示するように アイテムのソート方法を指定できるように
// @downloadURL         http://u6.getuploader.com/script/search?q=Extension+Options+Menu.uc.js
// @note                作成にあたりアドオン版Extension Options Menuとucjs_optionsmenu_0.8.uc.jsとtoggleRestartlessAddons.jsを參考にさせてもらいました
// @charset              UTF-8
// ==/UserScript==
/*
按鈕圖標
左鍵：擴展及插件菜單
中鍵：啟用 / 停用 DOM & Element Inspector (重新啟動瀏覽器)
右鍵：打開擴展管理員

擴展
左鍵：啟用 / 禁用擴展
中鍵：打開擴展主頁
右鍵：打開擴展選項（如果有的話）
Ctrl + 左鍵：打開擴展的安裝文件夾
Ctrl + 中鍵：複製擴展 ID 和圖標地址（如果可用）到剪貼板
Ctrl + 右鍵：移除擴展
*/
location == "chrome://browser/content/browser.xul" && (function() {
	EOM = {
		_prefs:				null,
		ShowToolButton:		true, // true: 按鈕 false: 菜單
		ADDON_TYPES:		['extension', 'plugin'], // 顯示的項目類型
		SHOW_VERSION:		true, // 顯示版本
		SHOW_ALL:			true, // 顯示全部，包括沒有選項的
		SHOW_USERDISABLED:	true, // 顯示禁用的
		SHOW_APPDISABLED:	false, // 顯示不兼容的
		AUTO_RESTART:		false, // 啟用/停用擴展後立即重新啟動瀏覽器（無需重啟擴展除外）

		sort: {
			enabled: 0,
			clickToPlay: 0,
			disabled: 1
			// 0, 0, 0 - 按字母順序排列
			// 0, 0, 1 - 把啟用和禁用分開並按字母順序排列
			// 0, 1, 2 - 啟用 add-ons，然後 click-to-play，最後禁用
		},
		init: function() {
		  	CustomizableUI.createWidget({
				defaultArea: CustomizableUI.AREA_NAVBAR,
				id: "eom-btn",
			});
			this._prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("userChromeJS.EOM.");
			this._prefs.QueryInterface(Ci.nsIPrefBranch2);

			if (!this._prefs.prefHasUserValue("ShowToolButton")) {
				this._prefs.setBoolPref("ShowToolButton", this.ShowToolButton);
			} else {
				this.ShowToolButton = this._prefs.getBoolPref("ShowToolButton");
			}
			var overlay = '\
				<overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"\
						 xmlns:html="http://www.w3.org/1999/xhtml">\
						<toolbarbutton id="eom-btn"\
									   label="擴展及插件管理器"\
									   class="toolbarbutton-1"\
									   type="menu"\
									   removable="true"\
									   onclick="EOM.iconClick(event);"\
									   style="-moz-transform: scale(0.875);">\
							<menupopup id="eom-popup"\
									   onpopupshowing="EOM.populateMenu(event);"\
									   onclick="event.preventDefault(); event.stopPropagation();"\
									   style="max-width: 420px;">\
								<menuitem id="eom-showbtn"\
										  label="切換顯示模式"\
										  oncommand="EOM.toggleUI(1);"/>\
								<menuseparator id="eom-sep"/>\
								<menuseparator id="addon-sep"/>\
							</menupopup>\
						</toolbarbutton>\
				</overlay>';
			overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
			window.userChrome_js.loadOverlay(overlay, EOM);

			var menu = $("menu_ToolsPopup").insertBefore($C('menu', {
				id: 'eom-menu',
				label: '擴展及插件管理器',
				tooltiptext: "左鍵：擴展及插件菜單\n中鍵：啟用 / 停用 DOM & Element Inspector (重新啟動瀏覽器)\n右鍵：打開擴展管理員",
				class: 'menu-iconic',
				onclick: "EOM.iconClick(event);"
			}), $("menu_preferences"));
		},
		observe: function(aSubject, aTopic, aData) {
			if (aTopic == "xul-overlay-merged") {
				EOM.toggleUI(0);
				Application.console.log("擴展及插件管理器界面加載完畢！");
			}
		},
		toggleUI: function(tag) {
			if (tag > 0) {
				EOM._prefs.setBoolPref("ShowToolButton", !EOM._prefs.getBoolPref("ShowToolButton"));
				EOM.ShowToolButton = EOM._prefs.getBoolPref("ShowToolButton");
			}
			window.setTimeout(function() {
				$("eom-menu").hidden = EOM.ShowToolButton;
				$("eom-btn").hidden = !EOM.ShowToolButton;
				if (!EOM.ShowToolButton) {
					$("eom-menu").appendChild($("eom-popup"));
					$("eom-showbtn").setAttribute("label", "圖標顯示為按鈕");
				} else {
					$("eom-btn").appendChild($("eom-popup"));
					$("eom-showbtn").setAttribute("label", "圖標顯示為菜單");
					$("eom-btn").setAttribute('tooltiptext', '左鍵：擴展及插件菜單\n中鍵：啟用 / 停用 DOM & Element Inspector (重新啟動瀏覽器)\n右鍵：打開擴展管理員');
				}
			}, 10);
		},
		populateMenu: function(event) {
			var popup = event.target;
			if (popup !== event.currentTarget) return;
			popup.addEventListener("mouseover", function (event) {event.originalTarget.setAttribute('closemenu', "none")}, true);

			var nodes = popup.querySelectorAll('.menuitem-iconic');
			for(var i = 0, len = nodes.length; i < len; i++) {
				nodes[i].parentNode.removeChild(nodes[i]);
			}

			var addons, type, prevType, mi;
			AddonManager.getAddonsByTypes(this.ADDON_TYPES, function(aAddons) {
				addons = aAddons;
			});

			var thread = Services.tm.mainThread;
			while (addons == void(0)) {
				thread.processNextEvent(true);
			}

			function sortPosition(addon) {
				if ('STATE_ASK_TO_ACTIVATE' in AddonManager && addon.userDisabled == AddonManager.STATE_ASK_TO_ACTIVATE)
					return EOM.sort.clickToPlay;
				return (!addon.isActive) ? EOM.sort.disabled : EOM.sort.enabled;
			}

			function key(addon) {
				return EOM.ADDON_TYPES.indexOf(addon.type) + '\n' + sortPosition(addon) + '\n' + addon.name.toLowerCase();
			}

			addons.sort((a, b) => {
				var ka = key(a);
				var kb = key(b);
				return (ka < kb) ? -1 : 1;
			}).forEach((addon) => {
				if ((!addon.appDisabled || (addon.appDisabled && this.SHOW_APPDISABLED)) && ((addon.isActive && addon.optionsURL) || ((addon.userDisabled && this.SHOW_USERDISABLED) || (!addon.userDisabled && this.SHOW_ALL) || (addon.appDisabled && this.SHOW_APPDISABLED)))) {
					type = addon.type;
					if (prevType && type != prevType) {popup.appendChild($('addon-sep'));}
					prevType = type;
					var icon = addon.iconURL
							|| type == 'extension' && 'chrome://mozapps/skin/extensions/extensionGeneric-16.png'
							|| type == 'plugin' && 'chrome://mozapps/skin/plugins/pluginGeneric-16.png';
					date = new Date(addon.updateDate);
					updateDate = date.getFullYear() + '年' + (date.getMonth()+1) + "月" + date.getDate() + '日';
					mi = popup.appendChild($C('menuitem', {
						label: this.SHOW_VERSION ? addon.name += ' ' + '[' + addon.version + ']' : addon.name,
						tooltiptext: '左鍵：啟用 / 禁用擴展' + ' (Size: ' + Math.floor(addon.size / 1024) + 'KB)' + '\n中鍵：打開擴展主頁 - ' + addon.homepageURL + '\n右鍵：打開擴展選項 - ' + addon.optionsURL + '\nCtrl + 左鍵：打開擴展的安裝文件夾\nCtrl + 中鍵：複製擴展 ID - ' + addon.id + ' 和\n　　　　　　圖標地址 - ' + addon.iconURL + '\nCtrl + 右鍵：移除擴展' + '\n\n更新日期：' + updateDate + '\n說明：' + addon.description,
						class: 'menuitem-iconic',
						image: icon,
						onclick: "EOM.itemClick(event);"
					}));
					if (addon.type == 'plugin') {
						mi.setAttribute("tooltiptext", '左鍵：啟用 / 禁用插件' + ' (Size: ' + Math.floor(addon.size / 1024) + 'KB)' + '\nCtrl + 中鍵：複製插件 ID - ' + addon.id + ' 和\n　　　　　　圖標地址 - ' + addon.iconURL + '\n\n更新日期：' + updateDate + '\n說明：' + addon.description)
					}
					mi._Addon = addon;
					this.setDisable(mi, addon.userDisabled);
					this.setUninstall(mi, this.isPending(addon));

					var addStyle = mi.style;
					if (!addon.optionsURL && addon.isActive)
						addStyle.color = 'blue';
					if (!addon.optionsURL && !addon.homepageURL && addon.isActive)
						addStyle.color = 'red';
					if (addon.userDisabled)
						addStyle.color = 'gray';
					if (addon.type !== 'plugin' && !addon.operationsRequiringRestart)
						addStyle.color = 'green';
					if (addon.type == 'plugin' && 'STATE_ASK_TO_ACTIVATE' in AddonManager && addon.userDisabled == AddonManager.STATE_ASK_TO_ACTIVATE)
						addStyle.color = 'purple';
				}
			});

			var menugroup = popup.insertBefore($C("menugroup", {id: "eom-menugroup"}), $("eom-showbtn"));
			for (let i = 0, menu; menu = mMenus[i]; i++) {
				let menuItem = menugroup.appendChild($C("menuitem", {
					label: menu.alabel,
					tooltiptext: menu.label,
					image: menu.image,
					class: "menuitem-iconic",
					oncommand: menu.oncommand,
					style: menu.style || "max-width: 10px;"
				}));
			}
		},
		iconClick: function(event) {
			if (event.target !== event.currentTarget) return;
			switch (event.button) {
			case 1:
				var { AddonManager } = Components.utils.import("resource://gre/modules/AddonManager.jsm", {});
				var AddonIDs = [
					'inspector@mozilla.org',
					'InspectElement@zbinlin',
					];
				for(n = 0; n < AddonIDs.length; n++) {
					AddonManager.getAddonByID(AddonIDs[n], function(addon) {
						addon.userDisabled = addon.userDisabled ? false : true;
					});
				}
				Application.restart();
				break;
			case 2:
				switchToTabHavingURI("about:addons", true);
				event.preventDefault();
				break;
			}
		},
		itemClick: function(event) {
			var mi = event.target;
			if (mi !== event.currentTarget) return;
			if (!('_Addon' in mi)) return;
			var addon = mi._Addon;
			var pending = this.isPending(addon);
			var hasMdf = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
			switch (event.button) {
				case 0:
					// 啟用/禁用擴展
					if (!hasMdf) {
						let curDis = addon.userDisabled;
						let newDis;
						if ('STATE_ASK_TO_ACTIVATE' in AddonManager && curDis == AddonManager.STATE_ASK_TO_ACTIVATE)
							newDis = false;
						else if (!curDis)
							newDis = true;
						else {
							if (this.isAskToActivateAddon(addon))
								newDis = AddonManager.STATE_ASK_TO_ACTIVATE;
							else
								newDis = false;
						}
						addon.userDisabled = newDis;
						this.setDisable(mi, newDis);
						if (addon.operationsRequiringRestart && this.AUTO_RESTART) {
							if ('BrowserUtils' in window)
								BrowserUtils.restartApplication();
							else Application.restart();
						}
					}
					// 打開擴展的安裝文件夾
					else if (event.ctrlKey) {
						var dir = Services.dirsvc.get('ProfD', Ci.nsILocalFile);
						var nsLocalFile = Components.Constructor('@mozilla.org/file/local;1', 'nsILocalFile', 'initWithPath');
						dir.append('extensions');
						dir.append(addon.id);
						var fileOrDir = dir.path + (dir.exists() ? '' : '.xpi');
						try {
							new nsLocalFile(fileOrDir).reveal();
						} catch (e) {
							var addonDir = /.xpi$/.test(fileOrDir) ? dir.parent : dir;
							try {
								if (addonDir.exists()) {
									addonDir.launch();
								}
							} catch (e) {
								var uri = Services.io.newFileURI(addonDir);
								var protSvc = Cc['@mozilla.org/uriloader/external-protocol-service;1'].getService(Ci.nsIExternalProtocolService);
								protSvc.loadUrl(uri);
							}
						}
					}
					break;
				case 1:
					// 打開擴展首頁
					if (addon.homepageURL && !hasMdf) {
						openLinkIn(addon.homepageURL, 'tabshifted', {}); // 'tab'
					}
					// 複製擴展 ID 和圖標地址
					else if (event.ctrlKey) {
						Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString("id: " + addon.id + "\r\n" + "iconURL: " + addon.iconURL);
					}
					break;
				case 2:
					// 打開擴展選項
					if (addon.optionsURL && !hasMdf) {
						var optionsURL = addon.optionsURL;
						if (!addon.isActive || !optionsURL) {
							return;
						}
						switch (Number(addon.optionsType)) {
							case 2:
								BrowserOpenAddonsMgr('addons://detail/' + encodeURIComponent(addon.id) + '/preferences');
							break;
							case 3:
								"switchToTabHavingURI" in window ? switchToTabHavingURI(optionsURL, true) : openTab("contentTab", {contentPage: optionsURL});
							break;
							default:
								openDialog(optionsURL, addon.name, 'chrome,titlebar,toolbar,resizable,scrollbars,centerscreen,dialog=no,modal=no');
						}
					}
					// 移除擴展
					else if (event.ctrlKey) {
						if (pending) {
							addon.cancelUninstall();
						} else {
							addon.uninstall();
						}
						this.setUninstall(mi, pending);
					}
					break;
			}
		},
		isAskToActivateAddon: function(addon) {
			return addon.type == 'plugin'
					&& 'STATE_ASK_TO_ACTIVATE' in AddonManager
					&& Application.prefs.getValue('plugins.click_to_play', false);
		},
		setDisable: function(mi, dis) {
			var askToActivate = 'STATE_ASK_TO_ACTIVATE' in AddonManager && dis == AddonManager.STATE_ASK_TO_ACTIVATE;
			var cls = mi.classList;
			(askToActivate) ? cls.add('askToActivate') : cls.remove('askToActivate');
			(dis && !askToActivate) ? cls.add('addon-disabled') : cls.remove('addon-disabled');
		},
		setUninstall: function(mi, uninst) {
			var cls = mi.classList;
			uninst ? cls.add('addon-uninstall') : cls.remove('addon-uninstall');
		},
		isPending: function(addon) {
			return addon.pendingOperations & AddonManager.PENDING_UNINSTALL;
		},
	};
	var mMenus = [
		{
			alabel: '重新啟動瀏覽器',
			label: '清除 startupCache',
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgElEQVQ4jY2RfUzMARjHv7tODnmJOxGm3LnKe3fnoh+W184ypjmZpZrQFLOSstns5g/cIXq9fuqQUd4tx0jFcLVRrSxNNE2bsUYY5Sr09Y9u2Nz6/vk83+ez5/s8gBvFAbKCUKw7Hz6o3KrDDHfev5Qmx/BCAVvKklR1b8rSWHMovM+ignJAw6IeEZU7FC3tNxeSjWvJF8l8Z0/tu5eyqKloiWd6MjDELcCqg/5hqk8bm8LIulCyQiCrjGRVCjuupbN04+Tygyoo3EIypkNVluDd0OsIJe+F8KV5IjtFFXkhnM7iRF5eM+aaEfBwDeTpEGDVQcgLwTyTAl4AIGqhrNg+uvlzaTBti3D0nEGa2W6ZRNoW87VpAfPnwuAC2I1eLa3FMT8cphVOUQtNfz1XA1XJqkH3bQJWAkBJhMcZ54mp/Hl4Fq8aPM+5AFUxsi42JLFR3PwtQ40J/ySShAHS31sFPt873smjKjqihr5yOSo3DH7NO2vZkm/8njUb+v/dJg6Q1e6Sv2FOIOs3jfzqalxYjlM/CrXsvrWVxSs9TwFAjh7q0wKsohbyft8RJcZWJ4zp+nTAj4/WD/v45+vCWtN9SHsk2zINLJiPvVYdNjRbo2mP9X9i8cM4ADAp4FUoINYmIP6kgNV/5bwaIS3tOaEmr0Tybe5qPtg553N3dRa/1Yi8ETvNYQ6A7/+iAQDMAfC9bZQ97jT7k0ULyevR5KUo8qzAnrt7WJ6oeSpqMdMtRNRCXrJMkl27bWTHh/3jfzJDSWb4s/eYmg37QliwALvdAvplCcJUR8yI953mKayP9/5ycRls2cHQAZAMCGDyw6grBumz4qUS83ENgtx5fwEzyhRmLMK7zwAAAABJRU5ErkJggg==",
			oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",
			style: "min-width: 357px;"
		},
		{
			label: "打開擴展目錄",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEElEQVQ4jY2RXUiTcRjF/9JFpBAapk5NnWzzI5vTbb5uuunrtFm5XCpi7tVEs0zU9aFFk6wmiV9RfrRqkRgZhVIZSjXUNDPCmaamlZQQ0gdFVxGFbu10paXzonN5Hs6P5zkPISsVniYjArXAzv8vceVyIi8A71g7hNW9k56eQsfFEYeQtUlOzqFJ69dzV4uuIbw4LxLB7CCyfNDGccgujcE9rqgvM4D6ZAjmvKjm+HYUbWShLYxn65Rsfro87iHwI9H5YBUYsankGqQXnkNycQyBlSaIK+7i6x4pblFBn/e6usMUswVP4vgzjKMr6y/ANYhFonIR1WxGTMsrSI2TEBnGwG8cgUjfjY+7JeiL5eM8zx/jieEYUYThPhVireP6Zi4iHEhk9im/Q20vvAuvQNBoRkjDMJry9mM0NRrv0yi8U0fgTZIIU4lCjNECm1kuQDXbh/m7RVzxARJ/pJLI8uF3oguc+iG0ZqSiR03jbbIYw2oRLhdSMCvCYIoIfqZycfH5twUHIs1d2LDXgI3F1+Bf8xjeVf1w1/fAu/QmprcJUX9UCk27EvcSQtEZHjRo94Z18qwPXsc64FczCK8zj+B2+iHoWiNS9BVo04hwSB+FlNZ45FRIoaigPtgBjuZtvlXZUIDx4cNIb2rGhvJOfDFrYOpVIePmVqS0JkBlVEDZSEN8Ujy7FExRurIMx0N0tdrA0S5jPKxzJdA0n4OHrg1fzAxeDqpxp0sJ7VUaygYa7JKA64SQNUuAg7t9yw06PoY7d+F1vwbWuRL8nNmHH1M5sEwzmJ9Ih2VUDX1LLGJrYsDRhsAjj3t7CcAkuYW2N9LfrF91sH4qg3VOC8tsAb5PZMMyzWDApMLOszLIqmQ2ySkZhMejEFAknFx2/8EsbtCD1sSpoY5kWOe0MF2NHzhTxPv9a1KD+907EK4T2/ilIoSWRdrc0tmMk8Rli12JRzTstK4rCfML74ttN+qo5NIstqq3ha46fThY4Ug7J7MY7rfgYspCBM7OduFFZW/34uWm+vivOgxw9HSiXPgr7T+DX3N5gyCN2AAAAABJRU5ErkJggg==",
			oncommand: "FileUtils.getFile('ProfD', ['extensions']).reveal();",
		},
		{
			label: "複製擴展清單",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==",
			oncommand: function(event) {
				Application.extensions ? Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(Application.extensions.all.map(function(item, id) {
					return id + 1 + ". " + item._item.name + " [" + item._item.version + "]"/* + "\nID:" + item._item.id*/;
				}).join("\n")) : Application.getExtensions(function(extensions) {
					Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(extensions.all.map(function(item, id) {
						return id + 1 + ". " + item._item.name + " [" + item._item.version + "]"/* + "\nID:" + item._item.id*/;
					}).join("\n"));
				})
				XULBrowserWindow.statusTextField.label = "擴展清單已複製";
			},
		}
	];
	var css = '\
		#eom-btn, #eom-menu {list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdUlEQVQ4jZWRPUwTARiGz5g4ODi4YKKxiFDBFrBQfoRGKGCxlist7V17Xq/X3pX2/rDXH3qFlmptIcTEEAYXV1cmFxMNIXExjsZJ4ghxhTiIGn2dcClCeJMn+fLm+57lI4gTctVsXWiz9n8zd/YdmMzW5yftN6R7YHRnwstg0h+B7fYYCMJy7lSCSW/4xQwng45rcJH0awBnTiUgQ9HUDCeBimnwBNg6QRDHC5pvdL/qsA3BYnfg1qATTg+FkPgQzKyOCS8D29A4LHYHbvYM41q77WODoH/EvUOGRfg5CQFeQTiRBq8Z4DUDzGwGAV6Bn5MwzSYxODaFw7uzh8OEN7wb0wyIevlYhHQJLt8DEKb27py5a+BPW2ffW6vdIXhC8d+JTBmz2UoDQrqEiJT7ySQzB5wyj7vTDIjeO65tDx2HO8jDHeTBJrNI5atHwqZyyJdr4putLTtJxzfvz0Q2CKc78JlTCuDVIlg5j4S+BNmoH0kgpiKXK5kAnAVwGUATwQqyPhUSvjKCuvF49VmUU41fanEZ2sIK1OIyFKMGxahBLS6Djs+hd3icv27pabXaHZ86bEPvCAAXALQAaAJwPsjLu+rCCrTFFYh6GVEp/yUqz28L6TJic0Xcm+Ew4g7AQ8XhcPnQ8EYyLOxqpVUk81VI2XIdQDMAk5RdrCeyFSTzVSSyjyAX6yCZxNGCdPkpRH0JJM1nDnsvzRcSmQpy1bV/+Dn5/4LU/BOMeujvrV0DV8ydfS1OD/VDKtSQr60jX1tHrroGX0RqFPhY8SUrF/aiirHnDkTfU5R4kaJilyaD3IeoYuwJemVf0Cv7/NziPhkWNv8CjYdwg9vkXo0AAAAASUVORK5CYII=)}\
		#eom-showbtn {list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdklEQVQ4jXWTbUwUdADG/7zccZ6lQ/pgcDJEEEGBO8/hmLQY9mKOmFvyEi93IIISSSMGxx0Hw0QKJJCOI3CxGM0IhEASjDsQ1lgdRuqcE4N0RznTjPFSDGJwvz64nOX6bc+35+XTI8R/KRXOG6LFwcAEj+7d2b4PI3L8ltQZiuuKaGmp5yER8JT/Sco/0e+JylP1xNfuXTrWEU/+BQ26Pi3vnk8ioyWG10pU9lj9S4VjY2Pyp4cbcxP36PyW83tTKBnMwDhwiCJrGkXWVIzWNIoH0ikezCTxTBRROcG9k5O2dY/Dp5qKwyN0W5aMgxkYLKkYrakYB7XorAnorPEUWOLJ749D159E6dBRIj7cRIhW8fmj5dJI16jc4L78vhQK+zUYrCkUDrxJtS0P6+12hu3dDNu7sNw+R8vVahK+2E1onQyvHOE4YIyIFOv3i7gEU+RyoUVD2dBbXL9v46tbLRiHkum8cYbv7SNcsdsA6L/RTVCVMzvNMkJq5GyMF50iMNnDktV2gNPfGrj3xxT/MDL1NcXDSRgGEzh+6TArLNM+2sy2SkFYgxxVnZwtWdK7Iizbe67hu3Lml2bAAQ6H43HJ+IOrvDeiRdunYmFllnOXWwioEuxqlKGskxGgk/4lIt7xX6keLsJ06QSnLAbG719jaXmJin4d+t5UDraGENOhYGFlnq4fWlHXyon6dCORTV5s1UkdQpn+/ERa66tkdu0jpTOcb36+yIO5GcJN7rzS5kHPZAe/LPzK7Moq9/6cY2LWzs2Htzjc+gbe2U4zwnO/c2XQcRlq81p2mASt45/x4+/TKKsk7GoW7DuroGein99WYRqYnJsn5eM4fIwueGucrojgrPW+vkekUyEmN7bXCppvtnFnEYoHijhxWU/yhRcIa1xLzWg9vT9d48X31XiXCALL3AjUuhcIIYSI0ccU+BgEwSZX3u49Qr2tjXrblzSMnueD4QZebtqGss4FZYUH/icFoSY5Co3T3cT6LHchhBCx5thnFAnSi0FlMnbUSgg46UxguQtBFS4EV7qhrn0WtXkNyjo3Qj+Ss/moZHF7uvvr//qC37EN6xSxLmf98iSOkBoZKvMadtY/ksosR2mSE1Qmw0cjsXunuUT/7yO9tK57vZMl7ZuzpHf8C6SLW/XSVf9cybRPquvopmRng2emeO5J/98W5fyDGAVpggAAAABJRU5ErkJggg==)}\
		#eom-menugroup [label="undefined"] .menu-iconic-left {margin-left:2px;}\
		#eom-menugroup [label="undefined"] .menu-iconic-text {display: none !important;}\
		.addon-disabled > .menu-iconic-left {filter:grayscale(1);}\
		.addon-disabled label {opacity:0.8;}\
		.addon-disabled label:after {content:"停用";}\
		.addon-uninstall label {font-weight:bold!important;}\
		.addon-uninstall label:after {content:"移除";}\
		'.replace(/[\r\n\t]/g, '');;
	EOM.style = addStyle(css);
	EOM.init();

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) {
			if (typeof attr[n] == 'function') {el.setAttribute(n, attr[n].toSource() + '.call(this, event);');}
			else {el.setAttribute(n, attr[n])}
		});
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