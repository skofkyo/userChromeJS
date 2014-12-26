// ==UserScript==
// @name                Extension Options Menu.uc.js
// @description         拡張を操作するボタンを追加
// @include             main
// @charset        UTF-8
// @version             3.0.0  プラグインも表示するように アイテムのソート方法を指定できるように
// @downloadURL         http://u6.getuploader.com/script/search?q=Extension+Options+Menu.uc.js
// @note                作成にあたりアドオン版Extension Options Menuとucjs_optionsmenu_0.8.uc.jsとtoggleRestartlessAddons.jsを参考にさせてもらいました
// ==/UserScript==
/*
按鈕圖標
左鍵：擴展及插件選單
中鍵：啟用 / 停用 DOM & Element Inspector (重新啟動瀏覽器)
右鍵：打開擴展管理員

擴展
左鍵：啟用 / 禁用擴展
中鍵：打開擴展主頁
右鍵：打開擴展選項（如果有的話）
CTRL + 左鍵：打開擴展的安裝文件夾
CTRL + 中鍵：複製擴展 ID 和圖標地址（如果可用）到剪貼板
CTRL + 右鍵：移除擴展
*/
(function() {
	EOM = {
		ADDON_TYPES: ['extension', 'plugin'], // 顯示的項目類型 (表示するアイテムの種類)
		SHOW_VERSION: true, // 顯示版本 (ヴァージョンを表示するか)
		SHOW_ALL: true, // 顯示全部，包括沒有選項的 (設定のないアドオンも表示するか)
		SHOW_USERDISABLED: true, // 顯示禁用的 (無効のアドオンを表示するか)
		SHOW_APPDISABLED: false, // 顯示不兼容的 (互換性のないアドオンを表示するか)
		AUTO_RESTART: false, // 啟用/停用擴展後立即重新啟動瀏覽器(無需重啟擴展除外) (アドオンの有効/無効時に自動で再起動するか(再起動不要アドオンは除外される))

		sort: {
			enabled: 0,
			clickToPlay: 0,
			disabled: 1
				// 0, 0, 0 - 按字母順序排列 (アルファベット順に)
				// 0, 0, 1 - 把啟用和禁用分開並按字母順序排列 (アドオンマネージャと同じようにソート)
				// 0, 1, 2 - 啟用 add-ons，然後click-to-play，最後禁用 (enabled add-ons, then click-to-play and then disabled)
		},

		init: function() {
			CustomizableUI.createWidget({
				defaultArea: CustomizableUI.AREA_NAVBAR,
				id: "eom-button",
				type: 'custom',
				onBuild: function(aDocument) {
					var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
					var props = {
						id: "eom-button",
						class: "toolbarbutton-1 chromeclass-toolbar-additional",
						label: "Extension Options Menu",
						tooltiptext: "左鍵：擴展及插件選單\n右鍵：打開擴展管理員",
						removable: "true",
						type: "menu",
						context: '_child',
						style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdUlEQVQ4jZWRPUwTARiGz5g4ODi4YKKxiFDBFrBQfoRGKGCxlist7V17Xq/X3pX2/rDXH3qFlmptIcTEEAYXV1cmFxMNIXExjsZJ4ghxhTiIGn2dcClCeJMn+fLm+57lI4gTctVsXWiz9n8zd/YdmMzW5yftN6R7YHRnwstg0h+B7fYYCMJy7lSCSW/4xQwng45rcJH0awBnTiUgQ9HUDCeBimnwBNg6QRDHC5pvdL/qsA3BYnfg1qATTg+FkPgQzKyOCS8D29A4LHYHbvYM41q77WODoH/EvUOGRfg5CQFeQTiRBq8Z4DUDzGwGAV6Bn5MwzSYxODaFw7uzh8OEN7wb0wyIevlYhHQJLt8DEKb27py5a+BPW2ffW6vdIXhC8d+JTBmz2UoDQrqEiJT7ySQzB5wyj7vTDIjeO65tDx2HO8jDHeTBJrNI5atHwqZyyJdr4putLTtJxzfvz0Q2CKc78JlTCuDVIlg5j4S+BNmoH0kgpiKXK5kAnAVwGUATwQqyPhUSvjKCuvF49VmUU41fanEZ2sIK1OIyFKMGxahBLS6Djs+hd3icv27pabXaHZ86bEPvCAAXALQAaAJwPsjLu+rCCrTFFYh6GVEp/yUqz28L6TJic0Xcm+Ew4g7AQ8XhcPnQ8EYyLOxqpVUk81VI2XIdQDMAk5RdrCeyFSTzVSSyjyAX6yCZxNGCdPkpRH0JJM1nDnsvzRcSmQpy1bV/+Dn5/4LU/BOMeujvrV0DV8ydfS1OD/VDKtSQr60jX1tHrroGX0RqFPhY8SUrF/aiirHnDkTfU5R4kaJilyaD3IeoYuwJemVf0Cv7/NziPhkWNv8CjYdwg9vkXo0AAAAASUVORK5CYII=)",
						onclick: 'eom.onClick(event);',
					};
					for (var p in props) {
						toolbarbutton.setAttribute(p, props[p]);
					};
					return toolbarbutton;
				}
			});

			eom = {
				onClick: function(event) {
					switch (event.button) {
						case 2:
							BrowserOpenAddonsMgr()
							break;
					}
				}
			}

			var mp = $('eom-button').appendChild($C('menupopup', {
				id: 'eom-button-popup',
				onpopupshowing: 'EOM.populateMenu(event.currentTarget)',
				onclick: 'event.preventDefault(); event.stopPropagation();',
				style: "max-width: 420px;"
			}));
			mp.addEventListener("mouseover", function(event) {
				event.originalTarget.setAttribute('closemenu', "none")
			}, true);
		},

		populateMenu: function(aParent) {
			var popup = aParent;
			var i, mi, addon, addons, menuIcon, df,
				sep, type, prevType, addStyle;
			var _this = this;

			for (i = 0, len = popup.childNodes.length; i < len; i++) {
				popup.removeChild(popup.firstChild);
			}

			AddonManager.getAddonsByTypes(this.ADDON_TYPES, function(addonlist) {
				addons = Array.slice(addonlist);
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

			addons.sort(function(a, b) {
				var ka = key(a);
				var kb = key(b);
				return ka == kb ? 0 : ka < kb ? -1 : 1;
			});

			for (i = 0, len = addons.length; i < len; i++) {
				addon = addons[i];
				df = document.createDocumentFragment();
				sep = $C('menuseparator');

				if ((!addon.appDisabled || (addon.appDisabled && this.SHOW_APPDISABLED)) && ((addon.isActive && addon.optionsURL) || ((addon.userDisabled && this.SHOW_USERDISABLED) || (!addon.userDisabled && this.SHOW_ALL) || (addon.appDisabled && this.SHOW_APPDISABLED)))) {
					type = addon.type;
					if (prevType && type != prevType)
						df.appendChild(sep);
					prevType = type;
					menuIcon = addon.iconURL || type == 'extension' && 'chrome://mozapps/skin/extensions/extensionGeneric-16.png' || type == 'plugin' && 'chrome://mozapps/skin/plugins/pluginGeneric-16.png';
					date = new Date(addon.updateDate);
					updateDate = date.getFullYear() + '年' + (date.getMonth() + 1) + "月" + date.getDate() + '日';
					mi = $C('menuitem', {
						label: _this.SHOW_VERSION ? addon.name += ' ' + '[' + addon.version + ']' : addon.name,
						tooltiptext: '左鍵：啟用 / 禁用擴展' + ' (Size: ' + Math.floor(addon.size / 1024) + 'KB)' + '\n中鍵：打開擴展主頁 - ' + addon.homepageURL + '\n右鍵：打開擴展選項 - ' + addon.optionsURL + '\nCtrl + 左鍵：打開擴展的安裝文件夾\nCtrl + 中鍵：複製擴展 ID - ' + addon.id + ' 和\n　　　　　　圖標地址 - ' + addon.iconURL + '\nCtrl + 右鍵：移除擴展' + '\n\n更新日期：' + updateDate + '\n說明：' + addon.description,
						class: 'menuitem-iconic',
						image: menuIcon
					});
					if (addon.type == 'plugin') {
						mi.setAttribute("tooltiptext", '左鍵：啟用 / 禁用插件' + ' (Size: ' + Math.floor(addon.size / 1024) + 'KB)' + '\nCtrl + 中鍵：複製插件 ID - ' + addon.id + ' 和\n　　　　　　圖標地址 - ' + addon.iconURL + '\n\n更新日期：' + updateDate + '\n說明：' + addon.description)
					}
					mi.addon = addon;
					mi.addEventListener('click', function(e) {
						EOM.itemClick(e, this.addon);
					}, true);
					EOM.setDisabled(mi, addon.userDisabled);
					EOM.setUninstalled(mi, addon.pendingOperations != 0);
					addStyle = mi.style;

					if (!addon.optionsURL && addon.isActive)
						addStyle.color = 'blue';
					if (!addon.optionsURL && !addon.homepageURL && addon.isActive)
						addStyle.color = 'red';
					if (addon.userDisabled)
						addStyle.color = 'gray';
					if (addon.type == 'plugin' && 'STATE_ASK_TO_ACTIVATE' in AddonManager && addon.userDisabled == AddonManager.STATE_ASK_TO_ACTIVATE)
						addStyle.color = 'green';

					df.appendChild(mi);
					popup.appendChild(df);
				}
			}

			var menusep = popup.insertBefore($C('menuseparator'), popup.firstChild);
			var menugroup = popup.insertBefore($C("menugroup", {
				id: "eom-menugroup"
			}), menusep);

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
			switch (event.button) {
				case 1:
					EOM.DOMEI(event);
					break;
				case 2:
					gBrowser.selectedTab = gBrowser.addTab('about:addons');
					event.preventDefault();
					break;
			}
		},

		DOMEI: function(event) {
			var {
				AddonManager
			} = Components.utils.import("resource://gre/modules/AddonManager.jsm", {});
			var AddonIDs = [
				'inspector@mozilla.org',
				'InspectElement@zbinlin',
			];
			for (n = 0; n < AddonIDs.length; n++) {
				AddonManager.getAddonByID(AddonIDs[n], function(addon) {
					addon.userDisabled = addon.userDisabled ? false : true;
				});
			}
			Application.restart();
		},

		CopyList: function(event) {
			Application.extensions ? Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(Application.extensions.all.map(function(item, id) {
				return id + 1 + ". " + item._item.name + " [" + item._item.version + "]" + "\nID:" + item._item.id;
			}).join("\n")) : Application.getExtensions(function(extensions) {
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(extensions.all.map(function(item, id) {
					return id + 1 + ". " + item._item.name + " [" + item._item.version + "]" + "\nID:" + item._item.id;
				}).join("\n"));
			})
			XULBrowserWindow.statusTextField.label = "擴展清單已複製";
			setTimeout(function() {
				XULBrowserWindow.statusTextField.label = "";
			}, 1500);
		},

		itemClick: function(e, aAddon) {
			var addon = aAddon;
			var mi = e.target;
			var ctrl = e.ctrlKey,
				shift = e.shiftKey,
				alt = e.altKey;
			switch (e.button) {
				case 0:
					// 啟用/禁用擴展 (有効/無効を切り替え)
					if (!ctrl && !shift && !alt) {
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
						this.setDisabled(mi, newDis);
					}
					// 打開擴展的安裝文件夾 (拡張のフォルダを開く)
					else if (ctrl && !shift && !alt) {
						var dir = Services.dirsvc.get('ProfD', Ci.nsIFile);
						var nsLocalFile = Components.Constructor('@mozilla.org/file/local;1', 'nsILocalFile', 'initWithPath');
						dir.append('extensions');
						dir.append(addon.id);
						var fileOrDir = dir.path + (dir.exists() ? '' : '.xpi');
						try {
							(new nsLocalFile(fileOrDir)).reveal();
						} catch (ex) {
							var addonDir = /.xpi$/.test(fileOrDir) ? dir.parent : dir;
							try {
								if (addonDir.exists()) {
									addonDir.launch();
								}
							} catch (ex) {
								var uri = Services.io.newFileURI(addonDir);
								var protSvc = Cc['@mozilla.org/uriloader/external-protocol-service;1'].getService(Ci.nsIExternalProtocolService);
								protSvc.loadUrl(uri);
							}
						}
					}
					break;
				case 1:
					// 打開擴展首頁 (拡張のウェブページを開く)
					if ((!ctrl && !shift && !alt) && addon.homepageURL) {
						openLinkIn(addon.homepageURL, 'tabshifted', {}); // 'tab' で背面に開く
					}
					// 複製擴展 ID 和圖標地址 (いろいろコピー)
					else if (ctrl && !shift && !alt) {
						clipboard = Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper);
						clipboard.copyString("id: " + addon.id + "\r\n" + "iconURL: " + addon.iconURL);
					}
					break;
				case 2:
					// 打開擴展選項 (拡張の設定画面を開く)
					if ((!ctrl && !shift && !alt) && addon.optionsURL) {
						if (addon.optionsType == 2) {
							BrowserOpenAddonsMgr('addons://detail/' + encodeURIComponent(addon.id) + ('/preferences'));
						} else {
							openDialog(addon.optionsURL, addon.name, 'chrome,titlebar,toolbar,resizable,scrollbars,centerscreen,dialog=no,modal=no');
						}
					}
					// 移除擴展 (アンインストール)
					else if (ctrl && !shift && !alt) {
						(addon.pendingOperations & AddonManager.PENDING_UNINSTALL) ? addon.cancelUninstall(): addon.uninstall();
						this.setUninstalled(mi, addon.pendingOperations & AddonManager.PENDING_UNINSTALL);
					}
					break;
			}
		},

		isAskToActivateAddon: function(addon) {
			return addon.type == 'plugin' && 'STATE_ASK_TO_ACTIVATE' in AddonManager && Application.prefs.getValue('plugins.click_to_play', false);
		},

		setDisabled: function(mi, disabled) {
			var askToActivate = 'STATE_ASK_TO_ACTIVATE' in AddonManager && disabled == AddonManager.STATE_ASK_TO_ACTIVATE;
			(askToActivate) ? mi.classList.add('askToActivate'): mi.classList.remove('askToActivate');
			(disabled && !askToActivate) ? mi.classList.add('addon-disabled'): mi.classList.remove('addon-disabled');
		},

		setUninstalled: function(mi, uninstalled) {
			(uninstalled) ? mi.classList.add('addon-uninstall'): mi.classList.remove('addon-uninstall');
		}
	};
	var mMenus = [{
		alabel: '重新啟動瀏覽器',
		label: '清除 startupCache',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgElEQVQ4jY2RfUzMARjHv7tODnmJOxGm3LnKe3fnoh+W184ypjmZpZrQFLOSstns5g/cIXq9fuqQUd4tx0jFcLVRrSxNNE2bsUYY5Sr09Y9u2Nz6/vk83+ez5/s8gBvFAbKCUKw7Hz6o3KrDDHfev5Qmx/BCAVvKklR1b8rSWHMovM+ignJAw6IeEZU7FC3tNxeSjWvJF8l8Z0/tu5eyqKloiWd6MjDELcCqg/5hqk8bm8LIulCyQiCrjGRVCjuupbN04+Tygyoo3EIypkNVluDd0OsIJe+F8KV5IjtFFXkhnM7iRF5eM+aaEfBwDeTpEGDVQcgLwTyTAl4AIGqhrNg+uvlzaTBti3D0nEGa2W6ZRNoW87VpAfPnwuAC2I1eLa3FMT8cphVOUQtNfz1XA1XJqkH3bQJWAkBJhMcZ54mp/Hl4Fq8aPM+5AFUxsi42JLFR3PwtQ40J/ySShAHS31sFPt873smjKjqihr5yOSo3DH7NO2vZkm/8njUb+v/dJg6Q1e6Sv2FOIOs3jfzqalxYjlM/CrXsvrWVxSs9TwFAjh7q0wKsohbyft8RJcZWJ4zp+nTAj4/WD/v45+vCWtN9SHsk2zINLJiPvVYdNjRbo2mP9X9i8cM4ADAp4FUoINYmIP6kgNV/5bwaIS3tOaEmr0Tybe5qPtg553N3dRa/1Yi8ETvNYQ6A7/+iAQDMAfC9bZQ97jT7k0ULyevR5KUo8qzAnrt7WJ6oeSpqMdMtRNRCXrJMkl27bWTHh/3jfzJDSWb4s/eYmg37QliwALvdAvplCcJUR8yI953mKayP9/5ycRls2cHQAZAMCGDyw6grBumz4qUS83ENgtx5fwEzyhRmLMK7zwAAAABJRU5ErkJggg==",
		oncommand: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
		style: "min-width: 290px;"
	}, {
		label: "打開擴展目錄",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEElEQVQ4jY2RXUiTcRjF/9JFpBAapk5NnWzzI5vTbb5uuunrtFm5XCpi7tVEs0zU9aFFk6wmiV9RfrRqkRgZhVIZSjXUNDPCmaamlZQQ0gdFVxGFbu10paXzonN5Hs6P5zkPISsVniYjArXAzv8vceVyIi8A71g7hNW9k56eQsfFEYeQtUlOzqFJ69dzV4uuIbw4LxLB7CCyfNDGccgujcE9rqgvM4D6ZAjmvKjm+HYUbWShLYxn65Rsfro87iHwI9H5YBUYsankGqQXnkNycQyBlSaIK+7i6x4pblFBn/e6usMUswVP4vgzjKMr6y/ANYhFonIR1WxGTMsrSI2TEBnGwG8cgUjfjY+7JeiL5eM8zx/jieEYUYThPhVireP6Zi4iHEhk9im/Q20vvAuvQNBoRkjDMJry9mM0NRrv0yi8U0fgTZIIU4lCjNECm1kuQDXbh/m7RVzxARJ/pJLI8uF3oguc+iG0ZqSiR03jbbIYw2oRLhdSMCvCYIoIfqZycfH5twUHIs1d2LDXgI3F1+Bf8xjeVf1w1/fAu/QmprcJUX9UCk27EvcSQtEZHjRo94Z18qwPXsc64FczCK8zj+B2+iHoWiNS9BVo04hwSB+FlNZ45FRIoaigPtgBjuZtvlXZUIDx4cNIb2rGhvJOfDFrYOpVIePmVqS0JkBlVEDZSEN8Ujy7FExRurIMx0N0tdrA0S5jPKxzJdA0n4OHrg1fzAxeDqpxp0sJ7VUaygYa7JKA64SQNUuAg7t9yw06PoY7d+F1vwbWuRL8nNmHH1M5sEwzmJ9Ih2VUDX1LLGJrYsDRhsAjj3t7CcAkuYW2N9LfrF91sH4qg3VOC8tsAb5PZMMyzWDApMLOszLIqmQ2ySkZhMejEFAknFx2/8EsbtCD1sSpoY5kWOe0MF2NHzhTxPv9a1KD+907EK4T2/ilIoSWRdrc0tmMk8Rli12JRzTstK4rCfML74ttN+qo5NIstqq3ha46fThY4Ug7J7MY7rfgYspCBM7OduFFZW/34uWm+vivOgxw9HSiXPgr7T+DX3N5gyCN2AAAAABJRU5ErkJggg==",
		oncommand: "FileUtils.getFile('ProfD', ['extensions']).reveal();"
	}, {
		label: "複製擴展清單",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==",
		oncommand: "EOM.CopyList(event);"
	}, {
		label: "複製組態清單",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFhklEQVRYhbVXXUhbZxg+YqFlN7vb5dhFLsqgUJANWgY7N2Owi62yiVrGGGNIb9baqeScZA1uc7J0YzStdrSRKJme5PxUjzOxmKwmaeJ/Qqw/bUxMU38iVu10mLNGC+fZheQ0J4murtkHz805D+/7vO93vuf9DkFkLYZhjrMs2/h/gmGY48R+i2XZM4IgwOfzwefzwePxKMg8K4QX5fE8D4ZhPiYIovRAAbIsY3d3Fzs7O9jd3YUsyyi0DstjWRZWq7WCIIgSVWKdTreg0+m2dDqdZDAYkE6nYbFY4HA4DgyaTqfx9OnfSKfTL8Sz2+3gOK48r3KtVnuWoqjPjUbjtdbWFqRSKUxNTWFxcXHfoJIkIZVKQZKkA5Nn83iex/vC1UGi+/sOoueH67k6SiwWSyXDMAWDrq2tIZlMYnl5GfH4PGKxGOLxeSwvLyOZTOYhw3v8+LESTxAEvN1zFYTYDKKnaUvJXFNT8+q5c+deu3nz1y86Ozshy7Kyr5nl9XohiiJ4ngfHceB5HqIoore3Nw/ZvNnZWaWYfQXQNL1F0zRomoZerwcAtLW1weFwvHTbs3kFBOydhoaGhnfr6ureM5lMlzo6OgAAKysr2NjYKFpylYCeZpQI322RJHkk04RSgiBKMsewUNBI5AGmp6cRjUYRi8XyEI1GMT09jampKRVvc3NTJeADrtVRamtsOcI2/qR04MKFC6/X1ta+YTaba7q6ugAA29vbkCRJqejOnTtwOp3o7+/Pg9PphCiK6OnpgSiKKl4ikVAE8DwPyxXz+Z8/anyz9cNfNNk+sKXX65EBAJjNZnR3d79027N5NhuDrq8ssH3SBq6i/flHqNVqVR2QZRlra2tYX18vWnJJksAwDJjz7eAqOtQCsq2Y5/mCQefm5jA5OakgHA5jbGwMo6MjGBsbQzgcVr3PIOMDqVQKNhsDrvY38LkCtFrtOxRFkSaT6ZLZbEYqlcLDh3Gsr68rVQSDQWWoeL1euN0uuFwDcLtd8Hq9BYeP1+vF/Py8ygn52s58AZlvgKZpUJQWkiTBbDarfOC/tj2bJwhCYQEEQRAajeZoW1tblc3GFG3Pc3mCIIBl2TN5e08QRClJkscsFkslz/MFg4bDYXg8HgwODsLj8WBoaAjDw8N5GBoaUvGSyaQSQxAEREXt2LPbleKOs6pL8YH6+vpPGxoavjQajddu3LgBAIhGo1haWlIqCoVC8Pv9CAQCGB8fx8TERB7Gx8cRCARUvNXVVZWAJUc9nt0+i1Rf1XMnpGladR8AAKvVioGBgaLZcEbAYl89pL5qbPdWPZ8F2ccw24qLmRzYc8JY90Wk+qqR6qsq7AMZAblBR0ZG4Ha78+ByueB0OuFwOOB0OuFyuVTvFxYWlHg2G4O5Wxch9VVjp79aNY4pnU7X2NzcbG9paYEsyxgeHsa9e/eUiuLxOGZnZ1WYmZlBKBRCMBhEKBTCzMxMHufJkycqJxy1f3PraX/1t89uV1KKAIqi/DRNT+r1+kRTUxMkSYLdboPb7S7qkbTZGPxh+vHrtYq3Tv5ZUXYibws4jiu32ZiiDqDcO2Gs7jP8VX0aW1Wn8r6BA++EgUDgX0dvoRF9//6sygkLCqBp+jpFUVaDweAzGo2QZRk+nw+Tk5OKgJWVFSQSCUQiETx4cB+RSASJRAKPHj3KQzZvdXVV5YT7CWAoSvu7wWCYuHz5MgDA7XYjGAy+dNtz74QZAZt7AvZ8gCTJIxqN5ijHceW5V7JiJc8WsFV9GhuVp178TnjYP6D9eIIggOO48rKysldIkjy2rxNmDxe/34+7d+/C7/cXHD6H4QmCAKvVWkGS5DGNRnM07xh2dnae4DjuSgYsy5rsdvtVlmVN2c9zcRhee3v7yezK/wGqaw3RGfJ4RgAAAABJRU5ErkJggg==",
		oncommand: "ucjs_copysysinfo.copyText('TEMPLATE');"
	}];
	var css = '\
	#eom-menugroup .menu-iconic-icon {margin-left:2px;}\
	.addon-disabled > .menu-iconic-left {filter:url("chrome://mozapps/skin/extensions/extensions.svg#greyscale")}\
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
