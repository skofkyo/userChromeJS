/******************************************************************************************
 *FeiRuoMouse 自定義鼠標手勢命令
 *支持自定義腳本，內容直接置於command 函數內;
 *******************************************************************************************/
var GesCustomCommand = [
	//示例：
	{
		label: "後退/上一頁",
		command: function(event) {
			// getWebNavigation().canGoBack && getWebNavigation().goBack();
			var nav = gBrowser.webNavigation;
			if (nav.canGoBack) {
				nav.goBack();
			} else {
				try {
					nextPage.next();
				} catch (ex) {
					var doc = event.target.ownerDocument;
					// var win = doc.defaultView;
					// var document = window.content ? window._content.document : gBrowser.selectedBrowser.contentDocumentAsCPOW;
					var links = doc.links;
					for (i = 0; i < links.length; i++) {
						if (links[i].text.match(/^(\[|【)?上一|^Prev?|^<$|^<<$|^«$/i))
							doc.location = links[i].href;
						// if (
						// 	(links[i].text == '上一頁') ||
						// 	(links[i].text == '上一頁') ||
						// 	(links[i].text == '上一個') ||
						// 	(links[i].text == '<上一頁') ||
						// 	(links[i].text == '« 上一頁') ||
						// 	(links[i].text == '<<上一頁') ||
						// 	(links[i].text == '[上一頁]') ||
						// 	(links[i].text == '翻上頁') ||
						// 	(links[i].text == '【上一頁】') ||
						// 	(links[i].text == 'Previous') ||
						// 	(links[i].text == 'Prev') ||
						// 	(links[i].text == 'previous') ||
						// 	(links[i].text == 'prev') ||
						// 	(links[i].text == '‹‹') ||
						// 	(links[i].text == '<')
						// )
						// 	doc.location = links[i].href;
					}
				}
			}
		}
	}, {
		label: "前進/下一頁",
		command: function(event) {
			// getWebNavigation().canGoForward && getWebNavigation().goForward();
			var nav = gBrowser.webNavigation;
			if (nav.canGoForward) {
				nav.goForward();
			} else {
				try {
					nextPage.next(true);
				} catch (ex) {
					var doc = event.target.ownerDocument;
					// var win = doc.defaultView;
					// var document = window.content ? window._content.document : gBrowser.selectedBrowser.contentDocumentAsCPOW;
					var links = doc.links;
					for (i = 0; i < links.length; i++) {
						if (links[i].text.match(/^(\[|【)?下一|^Next?|^>$|^>>$|^»$/i))
							doc.location = links[i].href;
						// if (
						// 	(links[i].text == '下一頁') ||
						// 	(links[i].text == '下一頁') ||
						// 	(links[i].text == '下一個') ||
						// 	(links[i].text == '下一頁>') ||
						// 	(links[i].text == '下一頁 »') ||
						// 	(links[i].text == '下一頁>>') ||
						// 	(links[i].text == '[下一頁]') ||
						// 	(links[i].text == '翻下頁') ||
						// 	(links[i].text == '【下一頁】') ||
						// 	(links[i].text == 'Next') ||
						// 	(links[i].text == 'next') ||
						// 	(links[i].text == '››') ||
						// 	(links[i].text == '>')
						// )
						// 	doc.location = links[i].href;
					}
				}
			}
		}
	}, {
		label: "最大化/恢復視窗",
		command: function(event) {
			window.windowState == 1 ? window.restore() : window.maximize();
		}
	}, {
		label: "重置縮放",
		command: function(event) {
			FullZoom.reset();
		}
	}, {
		label: "開啟新分頁",
		command: function(event) {
			BrowserOpenTab();
		}
	}, {
		label: "開啟主頁",
		command: function(event) {
			BrowserHome();
		}
	}, {
		label: "關閉當前分頁",
		command: function(event) {
			gBrowser.removeCurrentTab();
		}
	}, {
		label: '關閉左側所有分頁',
		command: function(event) {
			var tabs = gBrowser.mTabContainer.childNodes;
			for (var i = tabs.length - 1; tabs[i] != gBrowser.mCurrentTab; i--) {}
			for (i--; i >= 0; i--) {
				gBrowser.removeTab(tabs[i]);
			}
		}
	}, {
		label: "關閉左邊的分頁",
		command: function(event) {
			gBrowser.visibleTabs.indexOf(gBrowser.mCurrentTab) == 0 || gBrowser.removeTab(gBrowser.visibleTabs[gBrowser.visibleTabs.indexOf(gBrowser.mCurrentTab) - 1]);
		}
	}, {
		label: '關閉右側所有分頁',
		command: function(event) {
			var tabs = gBrowser.mTabContainer.childNodes;
			for (var i = tabs.length - 1; tabs[i] != gBrowser.selectedTab; i--) {
				gBrowser.removeTab(tabs[i]);
			}
		}
	}, {
		label: "關閉右邊的分頁",
		command: function(event) {
			gBrowser.visibleTabs.indexOf(gBrowser.mCurrentTab) + 1 < gBrowser.visibleTabs.length && gBrowser.removeTab(gBrowser.visibleTabs[gBrowser.visibleTabs.indexOf(gBrowser.mCurrentTab) + 1]);
		}
	}, {
		label: "關閉其他分頁",
		command: function(event) {
			gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
		}
	}, {
		label: "關閉其他分頁(包括其他分頁組)",
		command: function(event) {
			Array.filter(gBrowser.mTabs, function(tab) {
				return tab != gBrowser.mCurrentTab;
			}).forEach(function(tab) {
				gBrowser.removeTab(tab);
			})
		}
	}, {
		label: "關閉所有分頁",
		command: function(event) {
			gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
			gBrowser.removeCurrentTab();
		}
	}, {
		label: "關閉所有分頁(包括其他分頁組)",
		command: function(event) {
			while (gBrowser.mTabs.length > 1)
				gBrowser.removeTab(gBrowser.mTabs[0]);
			gBrowser.removeCurrentTab();
		}
	}, {
		label: "恢復關閉的分頁",
		command: function(event) {
			undoCloseTab();
			//try {
			//	document.getElementById('History:UndoCloseTab').doCommand();
			//} catch (ex) {
			//	if ('undoRemoveTab' in gBrowser) gBrowser.undoRemoveTab();
			//	else throw "Session Restore feature is disabled."
			//}
		}
	}, {
		label: "切換至左邊的分頁",
		command: function(event) {
			gBrowser.tabContainer.advanceSelectedTab(-1, true);
		}
	}, {
		label: "切換至左邊的分頁(包括其他分頁組)",
		command: function(event) {
			Array.forEach(gBrowser.mTabs, function(tab) {
				tab.removeAttribute("hidden");
			})
			gBrowser.tabContainer.advanceSelectedTab(-1, true);
			Array.forEach(gBrowser.mTabs, function(tab) {
				tab.removeAttribute("hidden");
			})
		}
	}, {
		label: "切換至右邊的分頁",
		command: function(event) {
			gBrowser.tabContainer.advanceSelectedTab(+1, true);
		}
	}, {
		label: "切換至右邊的分頁(包括其他分頁組)",
		command: function(event) {
			Array.forEach(gBrowser.mTabs, function(tab) {
				tab.removeAttribute("hidden");
			})
			gBrowser.tabContainer.advanceSelectedTab(1, true);
			Array.forEach(gBrowser.mTabs, function(tab) {
				tab.removeAttribute("hidden");
			})
		}
	}, {
		label: "切換至第一個分頁",
		command: function(event) {
			gBrowser.selectedTab = (gBrowser.visibleTabs || gBrowser.mTabs)[0];
		}
	}, {
		label: "切換至最後一個分頁",
		command: function(event) {
			gBrowser.selectedTab = (gBrowser.visibleTabs || gBrowser.mTabs)[(gBrowser.visibleTabs || gBrowser.mTabs).length - 1];
		}
	}, {
		label: "重新整理當前頁面",
		command: function(event) {
			// gBrowser.mCurrentBrowser.reload();
			document.getElementById("Browser:Reload").doCommand();
		}
	}, {
		label: "跳過暫存重新整理當前頁面",
		command: function(event) {
			// BrowserReloadSkipCache();
			document.getElementById("Browser:ReloadSkipCache").doCommand();
		}
	}, {
		label: "重新整理其他所有頁面",
		command: function(event) {
			Array.forEach(gBrowser.visibleTabs, function(tab) {
				tab == gBrowser.mCurrentBrowser || tab.linkedBrowser.reload();
			})
		}
	}, {
		label: "重新整理其他所有頁面(包括其他分頁組)",
		command: function(event) {
			Array.forEach(gBrowser.mTabs, function(tab) {
				tab == gBrowser.mCurrentBrowser || tab.linkedBrowser.reload();
			})
		}
	}, {
		label: "重新整理所有頁面",
		command: function(event) {
			gBrowser.reloadAllTabs();
		}
	}, {
		label: "重新整理所有頁面(包括其他分頁組)",
		command: function(event) {
			Array.forEach(gBrowser.mTabs, function(tab) {
				tab.linkedBrowser.reload();
			})
		}
	}, {
		label: "停止載入當前頁",
		command: function(event) {
			BrowserStop();
		}
	}, {
		label: "停止載入所有頁",
		command: function(event) {
			Array.map(gBrowser.browsers, function(browser) {
				browser.stop()
			});
		}
	}, {
		label: "後退",
		command: function(event) {
			getWebNavigation().canGoBack && getWebNavigation().goBack();
		}
	}, {
		label: "後退到最後",
		command: function(event) {
			getWebNavigation().gotoIndex(0);
		}
	}, {
		label: "前進",
		command: function(event) {
			getWebNavigation().canGoForward && getWebNavigation().goForward();
		}
	}, {
		label: "前進到最前",
		command: function(event) {
			getWebNavigation().gotoIndex(getWebNavigation().sessionHistory.count - 1);
		}
	}, {
		label: "頁首/開啟選取範圍內的所有鏈結",
		command: function(event) {
			if (getBrowserSelection()) {
				Array.filter(content.document.links, function(link) {
					arguments.callee.uniq = arguments.callee.uniq || [];
					if (!~arguments.callee.uniq.indexOf(link.toString()) && content.getSelection().containsNode(link, 1)) {
						arguments.callee.uniq.push(link.toString());
						return 1;
					}
				}).forEach(function(link) {
					gBrowser.addTab(link.toString()) && content.document.getSelection().removeAllRanges();
				});
			} else {
				//var doc = event.target.ownerDocument;
				//var win = doc.defaultView;
				//win.scrollTo(0, 0);
				goDoCommand("cmd_scrollTop");
			}
		}
	}, {
		label: "轉到頁首",
		command: function(event) {
			//var doc = event.target.ownerDocument;
			//var win = doc.defaultView;
			//win.scrollTo(0, 0);
			goDoCommand("cmd_scrollTop");
		}
	}, {
		label: "轉到頁首(強制)",
		command: function(event) {
			content.scrollTo(0, 0);
		}
	}, {
		label: "轉到頁尾",
		command: function(event) {
			//var doc = event.target.ownerDocument;
			//var win = doc.defaultView;
			//win.scrollTo(0, 10000000000);
			goDoCommand("cmd_scrollBottom");
		}
	}, {
		label: "轉到頁尾(強制)",
		command: function(event) {
			content.scrollTo(0, 1e10);
		}
	}, {
		label: "向下滾動一屏",
		command: function(event) {
			content.scrollByPages(1);
		}
	}, {
		label: "向上滾動一屏",
		command: function(event) {
			content.scrollByPages(-1);
		}
	}, {
		label: "全選",
		command: function(event) {
			goDoCommand("cmd_selectAll");
		}
	}, {
		label: "全選並複製",
		command: function(event) {
			goDoCommand('cmd_selectAll');
			setTimeout('goDoCommand("cmd_copy");', 100);
			setTimeout('content.document.getSelection().removeAllRanges();', 100);
		}
	}, {
		label: "複製頁面全部文字",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.document.documentElement.textContent);
		}
	}, {
		label: "複製選中文字",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.getSelection());
		}
	}, {
		label: "搜索框搜索選中文字",
		command: function(event) {
			BrowserSearch.loadSearch(getBrowserSelection(), true);
		}
	}, {
		label: "baidu搜索選中文字",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/s?wd=' + getBrowserSelection());
		}
	}, {
		label: "google搜索選中文字",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(getBrowserSelection()));
		}
	}, {
		label: "儲存選中文字",
		command: function(event) {
			saveImageURL('data:text/plain;charset=UTF-8;base64,' + btoa(unescape(encodeURIComponent(content.getSelection().toString()))), content.document.title + ".txt");
		}
	}, {
		label: "開啟選中鏈結",
		command: function(event) {
			Array.filter(content.document.links, function(link) {
				arguments.callee.uniq = arguments.callee.uniq || [];
				if ((!~arguments.callee.uniq.indexOf(link.toString())) && content.getSelection().containsNode(link, 1)) {
					arguments.callee.uniq.push(link.toString());
					return 1;
				}
			}).forEach(function(link) {
				gBrowser.addTab(link.toString());
			})
		}
	}, {
		label: "複製選中鏈結",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(Array.filter(content.document.links, function(link) {
				arguments.callee.uniq = arguments.callee.uniq || [];
				if ((!~arguments.callee.uniq.indexOf(link.toString())) && content.getSelection().containsNode(link, 1)) {
					arguments.callee.uniq.push(link.toString());
					return 1;
				}
			}).map(function(link) {
				return link.toString();
			}).join("\r\n"));
		}
	}, {
		label: "下載選中圖片",
		command: function(event) {
			Array.filter(content.document.images, function(image) {
				arguments.callee.uniq = arguments.callee.uniq || [];
				if ((!~arguments.callee.uniq.indexOf(image.src)) && content.getSelection().containsNode(image, 1)) {
					arguments.callee.uniq.push(image.src);
					return 1;
				}
			}).forEach(function(image) {
				saveImageURL(image.src, 0, 0, 0, 1);
			})
		}
	}, {
		label: "刪除選中部分網頁",
		command: function(event) {
			content.getSelection().deleteFromDocument(0);
		}
	}, {
		label: "繁轉簡",
		command: function(event) {
			content.document.documentElement.appendChild(content.document.createElement("script")).src = "data:application/x-javascript;base64,aWYgKHR5cGVvZihUb25nV2VuKSA9PSAidW5kZWZpbmVkIikgdmFyIFRvbmdXZW4gPSBuZXcgT2JqZWN0KCk7CgpUb25nV2VuLnRfMl9zID0gewoiXHUwMGFmIjoiXHUwMmM5IiwgCiJcdTIwMjUiOiJcdTAwYTgiLCAKIlx1MjAyNyI6Ilx1MDBiNyIsIAoiXHUyMDM1IjoiXHVmZjQwIiwgCiJcdTIyNTIiOiJcdTIyNDgiLCAKIlx1MjI2NiI6Ilx1MjI2NCIsIAoiXHUyMjY3IjoiXHUyMjY1IiwgCiJcdTI1NzEiOiJcdWZmMGYiLCAKIlx1MjU3MiI6Ilx1ZmYzYyIsIAoiXHUyNTc0IjoiXHVmZjNmIiwgCiJcdTMwMGMiOiJcdTIwMWMiLCAKIlx1MzAwZCI6Ilx1MjAxZCIsIAoiXHUzMDBlIjoiXHUyMDE4IiwgCiJcdTMwMGYiOiJcdTIwMTkiLCAKIlx1MzQ3MyI6Ilx1MzQ0NyIsIAoiXHUzNjFhIjoiXHUzNjBlIiwgCiJcdTM5NmUiOiJcdTM5MTgiLCAKIlx1M2E3MyI6Ilx1MzlkMCIsIAoiXHU0M2IxIjoiXHU0M2FjIiwgCiJcdTQ2NjEiOiJcdTQ2NGMiLCAKIlx1NDc3YyI6Ilx1NDc4ZCIsIAoiXHU0OTQ3IjoiXHU0OTgyIiwgCiJcdTQ5OWIiOiJcdTQ5YjYiLCAKIlx1NDk5ZiI6Ilx1NDliNyIsIAoiXHU0Yzc3IjoiXHU0Y2EzIiwgCiJcdTRlMWYiOiJcdTRlMjIiLCAKIlx1NGUyNiI6Ilx1NWU3NiIsIAoiXHU0ZTNjIjoiXHU0ZTk1IiwgCiJcdTRlN2UiOiJcdTVlNzIiLCAKIlx1NGU4MiI6Ilx1NGU3MSIsIAoiXHU0ZTk5IjoiXHU0ZTk4IiwgCiJcdTRlOWUiOiJcdTRlOWEiLCAKIlx1NGYxNSI6Ilx1NTkyYiIsIAoiXHU0ZjQ3IjoiXHU0ZjJiIiwgCiJcdTRmNDgiOiJcdTVlMDMiLCAKIlx1NGY1NCI6Ilx1NTM2MCIsIAoiXHU0ZjZhIjoiXHU1ZjhhIiwgCiJcdTRmNzUiOiJcdTVlNzYiLCAKIlx1NGY4NiI6Ilx1Njc2NSIsIAoiXHU0Zjk2IjoiXHU0ZWQxIiwgCiJcdTRmOWEiOiJcdTVmODciLCAKIlx1NGZiNiI6Ilx1NGZhMyIsIAoiXHU0ZmI3IjoiXHU1YzQwIiwgCiJcdTRmYzEiOiJcdTRmZTMiLCAKIlx1NGZjMiI6Ilx1N2NmYiIsIAoiXHU0ZmUwIjoiXHU0ZmEwIiwgCiJcdTUwMDAiOiJcdTRmMjUiLCAKIlx1NTAwNiI6Ilx1NGZlOSIsIAoiXHU1MDA5IjoiXHU0ZWQzIiwgCiJcdTUwMGIiOiJcdTRlMmEiLCAKIlx1NTAxMSI6Ilx1NGVlYyIsIAoiXHU1MDE2IjoiXHU1ZTc4IiwgCiJcdTUwMjMiOiJcdTRlZmYiLCAKIlx1NTAyYiI6Ilx1NGYyNiIsIAoiXHU1MDQ5IjoiXHU0ZjFmIiwgCiJcdTUwNmEiOiJcdTkwM2MiLCAKIlx1NTA3NCI6Ilx1NGZhNyIsIAoiXHU1MDc1IjoiXHU0ZmE2IiwgCiJcdTUwN2EiOiJcdTU0YjEiLCAKIlx1NTA3ZCI6Ilx1NGYyYSIsIAoiXHU1MDkxIjoiXHU2NzcwIiwgCiJcdTUwOTYiOiJcdTRmMjciLCAKIlx1NTA5OCI6Ilx1NGYxZSIsIAoiXHU1MDk5IjoiXHU1OTA3IiwgCiJcdTUwOWEiOiJcdTY1NDgiLCAKIlx1NTBhMiI6Ilx1NWJiNiIsIAoiXHU1MGFkIjoiXHU0ZjYzIiwgCiJcdTUwYWYiOiJcdTUwNmMiLCAKIlx1NTBiMyI6Ilx1NGYyMCIsIAoiXHU1MGI0IjoiXHU0ZjFiIiwgCiJcdTUwYjUiOiJcdTUwM2EiLCAKIlx1NTBiNyI6Ilx1NGYyNCIsIAoiXHU1MGJlIjoiXHU1MDNlIiwgCiJcdTUwYzIiOiJcdTUwN2IiLCAKIlx1NTBjNSI6Ilx1NGVjNSIsIAoiXHU1MGM5IjoiXHU0ZjY1IiwgCiJcdTUwY2EiOiJcdTRlZDkiLCAKIlx1NTBkMSI6Ilx1NGZhOCIsIAoiXHU1MGQ1IjoiXHU0ZWM2IiwgCiJcdTUwZGUiOiJcdTRmMmEiLCAKIlx1NTBlMyI6Ilx1NTBlZCIsIAoiXHU1MGU1IjoiXHU0ZmE1IiwgCiJcdTUwZTgiOiJcdTUwN2UiLCAKIlx1NTBmMSI6Ilx1OTZjNyIsIAoiXHU1MGY5IjoiXHU0ZWY3IiwgCiJcdTUxMDAiOiJcdTRlZWEiLCAKIlx1NTEwMiI6Ilx1NGZhYyIsIAoiXHU1MTA0IjoiXHU0ZWJmIiwgCiJcdTUxMDUiOiJcdTVmNTMiLCAKIlx1NTEwOCI6Ilx1NGZhOSIsIAoiXHU1MTA5IjoiXHU0ZmVkIiwgCiJcdTUxMTAiOiJcdTUwYTciLCAKIlx1NTExNCI6Ilx1NGZlNiIsIAoiXHU1MTE1IjoiXHU0ZmFhIiwgCiJcdTUxMTgiOiJcdTVjM2QiLCAKIlx1NTExZiI6Ilx1NTA3ZiIsIAoiXHU1MTJhIjoiXHU0ZjE4IiwgCiJcdTUxMzIiOiJcdTUwYTgiLCAKIlx1NTEzNyI6Ilx1NGZlYSIsIAoiXHU1MTM4IjoiXHU3ZjU3IiwgCiJcdTUxM2EiOiJcdTUwYTkiLCAKIlx1NTEzYiI6Ilx1NTBhNSIsIAoiXHU1MTNjIjoiXHU0ZmU4IiwgCiJcdTUxNDciOiJcdTUxZjYiLCAKIlx1NTE0YyI6Ilx1NTE1MSIsIAoiXHU1MTUyIjoiXHU1MTNmIiwgCiJcdTUxNTciOiJcdTUxNTYiLCAKIlx1NTE2NyI6Ilx1NTE4NSIsIAoiXHU1MTY5IjoiXHU0ZTI0IiwgCiJcdTUxOGEiOiJcdTUxOGMiLCAKIlx1NTE5MSI6Ilx1ODBjNCIsIAoiXHU1MWFhIjoiXHU1ZTQyIiwgCiJcdTUxYzUiOiJcdTZkYjgiLCAKIlx1NTFjOCI6Ilx1NTFjMCIsIAoiXHU1MWNkIjoiXHU1MWJiIiwgCiJcdTUxZGMiOiJcdTUxZGIiLCAKIlx1NTFmMSI6Ilx1NTFlZiIsIAoiXHU1MjI1IjoiXHU1MjJiIiwgCiJcdTUyMmEiOiJcdTUyMjAiLCAKIlx1NTI0NCI6Ilx1NTIyZCIsIAoiXHU1MjQ3IjoiXHU1MjE5IiwgCiJcdTUyNDkiOiJcdTk1MDkiLCAKIlx1NTI0YiI6Ilx1NTE0YiIsIAoiXHU1MjRlIjoiXHU1MjM5IiwgCiJcdTUyNTciOiJcdTUyMmMiLCAKIlx1NTI1YiI6Ilx1NTIxYSIsIAoiXHU1MjVkIjoiXHU1MjY1IiwgCiJcdTUyNmUiOiJcdTUyNTAiLCAKIlx1NTI3NCI6Ilx1NTI0MCIsIAoiXHU1Mjc1IjoiXHU1MjFiIiwgCiJcdTUyNzciOiJcdTk0ZjIiLCAKIlx1NTI4MyI6Ilx1NTIxMiIsIAoiXHU1Mjg0IjoiXHU2NzJkIiwgCiJcdTUyODciOiJcdTUyNjciLCAKIlx1NTI4OSI6Ilx1NTIxOCIsIAoiXHU1MjhhIjoiXHU1MjNkIiwgCiJcdTUyOGMiOiJcdTUyM2YiLCAKIlx1NTI4ZCI6Ilx1NTI1MSIsIAoiXHU1MjkxIjoiXHU1MjQyIiwgCiJcdTUyYmIiOiJcdTUzMjEiLCAKIlx1NTJjMSI6Ilx1NTJiMiIsIAoiXHU1MmQ1IjoiXHU1MmE4IiwgCiJcdTUyZDciOiJcdTUyZDYiLCAKIlx1NTJkOSI6Ilx1NTJhMSIsIAoiXHU1MmRiIjoiXHU1MmNiIiwgCiJcdTUyZGQiOiJcdTgwZGMiLCAKIlx1NTJkZSI6Ilx1NTJiMyIsIAoiXHU1MmUyIjoiXHU1MmJmIiwgCiJcdTUyZTMiOiJcdTdlZTkiLCAKIlx1NTJlNiI6Ilx1NTI3ZiIsIAoiXHU1MmU5IjoiXHU1MmRhIiwgCiJcdTUyZjEiOiJcdTUyYTIiLCAKIlx1NTJmMyI6Ilx1NTJjYiIsIAoiXHU1MmY1IjoiXHU1MmIxIiwgCiJcdTUyZjgiOiJcdTUyOWQiLCAKIlx1NTJmYiI6Ilx1NTMwMCIsIAoiXHU1MzBiIjoiXHU5Njc2IiwgCiJcdTUzMmQiOiJcdTUzMjYiLCAKIlx1NTMyZiI6Ilx1NmM0NyIsIAoiXHU1MzMxIjoiXHU1MzJlIiwgCiJcdTUzNDAiOiJcdTUzM2EiLCAKIlx1NTM0NCI6Ilx1NWVmZiIsIAoiXHU1MzU0IjoiXHU1MzRmIiwgCiJcdTUzNmMiOiJcdTY2MDIiLCAKIlx1NTM3OSI6Ilx1NjA2NCIsIAoiXHU1MzdiIjoiXHU1Mzc0IiwgCiJcdTUzOTkiOiJcdTUzOGQiLCAKIlx1NTNhZCI6Ilx1NTM4YyIsIAoiXHU1M2IyIjoiXHU1Mzg5IiwgCiJcdTUzYjQiOiJcdTUzYTMiLCAKIlx1NTNjMyI6Ilx1NTNjMiIsIAoiXHU1M2UxIjoiXHU3NzdmIiwgCiJcdTUzZTIiOiJcdTRlMWIiLCAKIlx1NTQwYiI6Ilx1NWJmOCIsIAoiXHU1NDBlIjoiXHU1NDBlIiwgCiJcdTU0MzMiOiJcdTU0MzQiLCAKIlx1NTQzNiI6Ilx1NTQ1MCIsIAoiXHU1NDQyIjoiXHU1NDE1IiwgCiJcdTU0NGUiOiJcdTVjM2EiLCAKIlx1NTRiNyI6Ilx1NTU1NSIsIAoiXHU1NGJjIjoiXHU1NDU5IiwgCiJcdTU0ZTEiOiJcdTU0NTgiLCAKIlx1NTUwNCI6Ilx1NTQ1NyIsIAoiXHU1NTFkIjoiXHU1NWNhIiwgCiJcdTU1MzgiOiJcdTVmZjUiLCAKIlx1NTU0ZiI6Ilx1OTVlZSIsIAoiXHU1NTUzIjoiXHU1NDJmIiwgCiJcdTU1NTciOiJcdTU1NTYiLCAKIlx1NTU1ZSI6Ilx1NTRkMSIsIAoiXHU1NTVmIjoiXHU1NDJmIiwgCiJcdTU1NjIiOiJcdTU1MjEiLCAKIlx1NTU2MyI6Ilx1ODg1NCIsIAoiXHU1NThlIjoiXHUzNTllIiwgCiJcdTU1OWEiOiJcdTU1MjQiLCAKIlx1NTVhYSI6Ilx1NGUyNyIsIAoiXHU1NWFiIjoiXHU1NDAzIiwgCiJcdTU1YWMiOiJcdTRlNTQiLCAKIlx1NTVhZSI6Ilx1NTM1NSIsIAoiXHU1NWIyIjoiXHU1NGRmIiwgCiJcdTU1YzYiOiJcdTU0NWIiLCAKIlx1NTVjNyI6Ilx1NTU2YyIsIAoiXHU1NWNlIjoiXHU1NDE3IiwgCiJcdTU1ZGEiOiJcdTU0NWMiLCAKIlx1NTVlOSI6Ilx1NTUyMiIsIAoiXHU1NWY2IjoiXHU1NGQ0IiwgCiJcdTU2MDYiOiJcdTUzZjkiLCAKIlx1NTYwZCI6Ilx1NTViZCIsIAoiXHU1NjE0IjoiXHU1NDU1IiwgCiJcdTU2MTYiOiJcdTU1NjciLCAKIlx1NTYxNyI6Ilx1NWMxZCIsIAoiXHU1NjFjIjoiXHU1NTFiIiwgCiJcdTU2MjkiOiJcdTU0ZDciLCAKIlx1NTYyZSI6Ilx1NTUyMCIsIAoiXHU1NjJmIjoiXHU1NTc4IiwgCiJcdTU2MzAiOiJcdTUzZmQiLCAKIlx1NTYzNSI6Ilx1NTRkMyIsIAoiXHU1NjM4IjoiXHU1NDUyIiwgCiJcdTU2NDEiOiJcdTYwNzYiLCAKIlx1NTY1MyI6Ilx1NTYxOCIsIAoiXHU1NjVkIjoiXHU1NDlkIiwgCiJcdTU2NjAiOiJcdTU0ZDIiLCAKIlx1NTY2NSI6Ilx1NTRkZCIsIAoiXHU1NjY2IjoiXHU1NGQ1IiwgCiJcdTU2NmYiOiJcdTU1ZjMiLCAKIlx1NTY3MiI6Ilx1NTRkOSIsIAoiXHU1Njc0IjoiXHU1NWI3IiwgCiJcdTU2NzgiOiJcdTU0MjgiLCAKIlx1NTY3OSI6Ilx1NWY1MyIsIAoiXHU1NjgwIjoiXHU1NDliIiwgCiJcdTU2ODciOiJcdTU0MTMiLCAKIlx1NTY4YyI6Ilx1NTRkYyIsIAoiXHU1NjkwIjoiXHU1YzFkIiwgCiJcdTU2OTUiOiJcdTU2NWMiLCAKIlx1NTY5OSI6Ilx1NTU2ZSIsIAoiXHU1NmE1IjoiXHU1NGJkIiwgCiJcdTU2YTYiOiJcdTU0NTYiLCAKIlx1NTZhOCI6Ilx1NTQ5OSIsIAoiXHU1NmFlIjoiXHU1NDExIiwgCiJcdTU2YjMiOiJcdTU1YmUiLCAKIlx1NTZiNCI6Ilx1NGUyNSIsIAoiXHU1NmI2IjoiXHU1NjI0IiwgCiJcdTU2YzAiOiJcdTU1NmQiLCAKIlx1NTZjMSI6Ilx1NTVlYiIsIAoiXHU1NmMyIjoiXHU1NmEzIiwgCiJcdTU2YzUiOiJcdTUxODEiLCAKIlx1NTZjOCI6Ilx1NTQ1MyIsIAoiXHU1NmM5IjoiXHU1NTcwIiwgCiJcdTU2Y2MiOiJcdTgyY2YiLCAKIlx1NTZkMSI6Ilx1NTYzMSIsIAoiXHU1NmQzIjoiXHU1NTZlIiwgCiJcdTU2ZWEiOiJcdTU2ZjEiLCAKIlx1NTcwNyI6Ilx1NTZmNSIsIAoiXHU1NzBiIjoiXHU1NmZkIiwgCiJcdTU3MGQiOiJcdTU2ZjQiLCAKIlx1NTcwZiI6Ilx1NTcwOCIsIAoiXHU1NzEyIjoiXHU1NmVkIiwgCiJcdTU3MTMiOiJcdTU3MDYiLCAKIlx1NTcxNiI6Ilx1NTZmZSIsIAoiXHU1NzE4IjoiXHU1NmUyIiwgCiJcdTU3NzUiOiJcdTRlMTgiLCAKIlx1NTdkYyI6Ilx1OTFjZSIsIAoiXHU1N2UxIjoiXHU1N2FkIiwgCiJcdTU3ZjciOiJcdTYyNjciLCAKIlx1NTdmYyI6Ilx1NWQwZSIsIAoiXHU1ODA1IjoiXHU1NzVhIiwgCiJcdTU4MGEiOiJcdTU3YTkiLCAKIlx1NTgxNiI6Ilx1NTdiNCIsIAoiXHU1ODFkIjoiXHU1N2RhIiwgCiJcdTU4MmYiOiJcdTVjMjciLCAKIlx1NTgzMSI6Ilx1NjJhNSIsIAoiXHU1ODM0IjoiXHU1NzNhIiwgCiJcdTU4NGEiOiJcdTU3NTciLCAKIlx1NTg0YiI6Ilx1ODMxNCIsIAoiXHU1ODRmIjoiXHU1N2IyIiwgCiJcdTU4NTIiOiJcdTU3ZDgiLCAKIlx1NTg1NyI6Ilx1NmQ4MiIsIAoiXHU1ODVhIjoiXHU1MWEyIiwgCiJcdTU4NjIiOiJcdTU3NWUiLCAKIlx1NTg2NCI6Ilx1NTdkOSIsIAoiXHU1ODc1IjoiXHU1YzE4IiwgCiJcdTU4NzkiOiJcdTU4MTEiLCAKIlx1NTg4YSI6Ilx1NTdhYiIsIAoiXHU1ODkxIjoiXHU1ODkyIiwgCiJcdTU4OWMiOiJcdTU3NjAiLCAKIlx1NThhYiI6Ilx1NmEzZCIsIAoiXHU1OGFlIjoiXHU1ODE1IiwgCiJcdTU4YjMiOiJcdTU3NWYiLCAKIlx1NThiYiI6Ilx1NTg5OSIsIAoiXHU1OGJlIjoiXHU1N2E2IiwgCiJcdTU4YzciOiJcdTU3NWIiLCAKIlx1NThjZSI6Ilx1NTdkOSIsIAoiXHU1OGQzIjoiXHU1MzhiIiwgCiJcdTU4ZDgiOiJcdTU3OTIiLCAKIlx1NThkOSI6Ilx1NTczOSIsIAoiXHU1OGRhIjoiXHU1Nzg2IiwgCiJcdTU4ZGUiOiJcdTU3NGYiLCAKIlx1NThkZiI6Ilx1NTc4NCIsIAoiXHU1OGUyIjoiXHU1NzVjIiwgCiJcdTU4ZTkiOiJcdTU3NWQiLCAKIlx1NThlZiI6Ilx1NThlZSIsIAoiXHU1OGZhIjoiXHU1OGY2IiwgCiJcdTU4ZmQiOiJcdTViZmYiLCAKIlx1NTkyMCI6Ilx1NTkxZiIsIAoiXHU1OTIyIjoiXHU2OGE2IiwgCiJcdTU5M2UiOiJcdTU5MzkiLCAKIlx1NTk1MCI6Ilx1NTk0MiIsIAoiXHU1OTY3IjoiXHU1OTY1IiwgCiJcdTU5NjkiOiJcdTU5NDEiLCAKIlx1NTk2YSI6Ilx1NTkzYSIsIAoiXHU1OTZlIjoiXHU1OTRiIiwgCiJcdTU5OWQiOiJcdTU5ODYiLCAKIlx1NTljZCI6Ilx1NTlkNyIsIAoiXHU1OWU2IjoiXHU1OTc4IiwgCiJcdTU5ZWEiOiJcdTRmODQiLCAKIlx1NWExYiI6Ilx1NWEzMSIsIAoiXHU1YTQxIjoiXHU1YTA0IiwgCiJcdTVhNjYiOiJcdTU5ODciLCAKIlx1NWE2YyI6Ilx1NmRlYiIsIAoiXHU1YTZkIjoiXHU1YTA1IiwgCiJcdTVhYTciOiJcdTVhMzIiLCAKIlx1NWFhZSI6Ilx1NTA3NyIsIAoiXHU1YWFmIjoiXHU1OWFiIiwgCiJcdTVhYmMiOiJcdTVhYWEiLCAKIlx1NWFiZCI6Ilx1NTk4OCIsIAoiXHU1YWJmIjoiXHU2MTI3IiwgCiJcdTVhY2IiOiJcdTg4ODUiLCAKIlx1NWFkNyI6Ilx1NTlhYSIsIAoiXHU1YWY1IjoiXHU1OWE5IiwgCiJcdTVhZmIiOiJcdTVhMzQiLCAKIlx1NWFmZiI6Ilx1NWE3MyIsIAoiXHU1YjA4IjoiXHU1YTA2IiwgCiJcdTViMGIiOiJcdTVhNzUiLCAKIlx1NWIwYyI6Ilx1NWEwNyIsIAoiXHU1YjE5IjoiXHU1YWYxIiwgCiJcdTViMWQiOiJcdTg4ODUiLCAKIlx1NWIyMSI6Ilx1NWFkMiIsIAoiXHU1YjI0IjoiXHU1YjM3IiwgCiJcdTViMmEiOiJcdTVhZDQiLCAKIlx1NWIyZCI6Ilx1NTk3NiIsIAoiXHU1YjMwIjoiXHU1YTc0IiwgCiJcdTViMzgiOiJcdTVhNzYiLCAKIlx1NWI0MyI6Ilx1NWExOCIsIAoiXHU1YjRjIjoiXHU1YTA4IiwgCiJcdTViNmIiOiJcdTViNTkiLCAKIlx1NWI3OCI6Ilx1NWI2NiIsIAoiXHU1YjdmIjoiXHU1YjZhIiwgCiJcdTViYWUiOiJcdTViYWIiLCAKIlx1NWJkOCI6Ilx1N2Y2ZSIsIAoiXHU1YmUyIjoiXHU1YmRkIiwgCiJcdTViZTYiOiJcdTViOWUiLCAKIlx1NWJlNyI6Ilx1NWI4MSIsIAoiXHU1YmU5IjoiXHU1YmExIiwgCiJcdTViZWIiOiJcdTUxOTkiLCAKIlx1NWJlYyI6Ilx1NWJiZCIsIAoiXHU1YmY1IjoiXHU1YmEwIiwgCiJcdTViZjYiOiJcdTViOWQiLCAKIlx1NWMwNyI6Ilx1NWMwNiIsIAoiXHU1YzA4IjoiXHU0ZTEzIiwgCiJcdTVjMGIiOiJcdTViZmIiLCAKIlx1NWMwZCI6Ilx1NWJmOSIsIAoiXHU1YzBlIjoiXHU1YmZjIiwgCiJcdTVjMzciOiJcdTVjMzQiLCAKIlx1NWM0NiI6Ilx1NWM0YSIsIAoiXHU1YzRkIjoiXHU1YzM4IiwgCiJcdTVjNWMiOiJcdTVjNDkiLCAKIlx1NWM1ZCI6Ilx1NjI0OSIsIAoiXHU1YzYyIjoiXHU1YzYxIiwgCiJcdTVjNjQiOiJcdTVjNDIiLCAKIlx1NWM2OCI6Ilx1NWM2NiIsIAoiXHU1YzZjIjoiXHU1YzVlIiwgCiJcdTVjYTEiOiJcdTUxODgiLCAKIlx1NWNmNCI6Ilx1NWM5OCIsIAoiXHU1Y2Y2IjoiXHU1YzliIiwgCiJcdTVjZmQiOiJcdTVjZTEiLCAKIlx1NWQwZCI6Ilx1NWQwMyIsIAoiXHU1ZDExIjoiXHU2NjA2IiwgCiJcdTVkMTciOiJcdTVjOTciLCAKIlx1NWQxOSI6Ilx1NGVkMSIsIAoiXHU1ZDIwIjoiXHU1Y2JkIiwgCiJcdTVkMjIiOiJcdTVjZTUiLCAKIlx1NWQzMyI6Ilx1NWQ1YiIsIAoiXHU1ZDUwIjoiXHU1YzlhIiwgCiJcdTVkNTIiOiJcdTVjYTkiLCAKIlx1NWQ4MSI6Ilx1NWQ1ZCIsIAoiXHU1ZDg0IjoiXHU1ZDJkIiwgCiJcdTVkODciOiJcdTVjOTYiLCAKIlx1NWQ5NCI6Ilx1NWQ1YSIsIAoiXHU1ZDk3IjoiXHU1ZDAyIiwgCiJcdTVkYTAiOiJcdTVjZTQiLCAKIlx1NWRhMiI6Ilx1NWNlMyIsIAoiXHU1ZGE3IjoiXHU1Y2M0IiwgCiJcdTVkYTgiOiJcdTVjYzMiLCAKIlx1NWRiOCI6Ilx1NWQ1OCIsIAoiXHU1ZGJhIjoiXHU1Y2FkIiwgCiJcdTVkYmMiOiJcdTVjN2YiLCAKIlx1NWRiZCI6Ilx1NWNiMyIsIAoiXHU1ZGNiIjoiXHU1Y2JmIiwgCiJcdTVkZDIiOiJcdTVjZTYiLCAKIlx1NWRkNCI6Ilx1NWRjNSIsIAoiXHU1ZGQ2IjoiXHU1Y2E5IiwgCiJcdTVkZjAiOiJcdTVkZWYiLCAKIlx1NWRmOSI6Ilx1NTM3YSIsIAoiXHU1ZTI1IjoiXHU1ZTA1IiwgCiJcdTVlMmIiOiJcdTVlMDgiLCAKIlx1NWUzMyI6Ilx1NWUxMCIsIAoiXHU1ZTM2IjoiXHU1ZTI2IiwgCiJcdTVlNDAiOiJcdTVlMjciLCAKIlx1NWU0MyI6Ilx1NWUwZiIsIAoiXHU1ZTU3IjoiXHU1ZTNjIiwgCiJcdTVlNTgiOiJcdTVlM2IiLCAKIlx1NWU1ZiI6Ilx1NWUxYyIsIAoiXHU1ZTYzIjoiXHU1ZTAxIiwgCiJcdTVlNmIiOiJcdTVlMmUiLCAKIlx1NWU2YyI6Ilx1NWUzMSIsIAoiXHU1ZTc1IjoiXHU1ZjAwIiwgCiJcdTVlNzciOiJcdTVlNzYiLCAKIlx1NWU3OSI6Ilx1NWU3MiIsIAoiXHU1ZTdlIjoiXHU1MWUwIiwgCiJcdTVlODIiOiJcdTRlYzQiLCAKIlx1NWVhYiI6Ilx1NWU5MyIsIAoiXHU1ZWMxIjoiXHU1Mzk1IiwgCiJcdTVlYzIiOiJcdTUzYTIiLCAKIlx1NWVjNCI6Ilx1NTNhOSIsIAoiXHU1ZWM4IjoiXHU1M2E2IiwgCiJcdTVlY2UiOiJcdTVlYmMiLCAKIlx1NWVkYSI6Ilx1NTNhOCIsIAoiXHU1ZWRkIjoiXHU1M2FlIiwgCiJcdTVlZGYiOiJcdTVlOTkiLCAKIlx1NWVlMCI6Ilx1NTM4MiIsIAoiXHU1ZWUxIjoiXHU1ZTkxIiwgCiJcdTVlZTIiOiJcdTVlOWYiLCAKIlx1NWVlMyI6Ilx1NWU3ZiIsIAoiXHU1ZWU5IjoiXHU1ZWVhIiwgCiJcdTVlZWMiOiJcdTVlOTAiLCAKIlx1NWVmMSI6Ilx1NzVjOCIsIAoiXHU1ZWYzIjoiXHU1Mzg1IiwgCiJcdTVmMTIiOiJcdTVmMTEiLCAKIlx1NWYxNCI6Ilx1NTQwYSIsIAoiXHU1ZjMzIjoiXHU1ZjJhIiwgCiJcdTVmMzUiOiJcdTVmMjAiLCAKIlx1NWYzNyI6Ilx1NWYzYSIsIAoiXHU1ZjQ2IjoiXHU1MjJiIiwgCiJcdTVmNDgiOiJcdTVmMzkiLCAKIlx1NWY0YyI6Ilx1NWYyNSIsIAoiXHU1ZjRlIjoiXHU1ZjJmIiwgCiJcdTVmNTkiOiJcdTZjNDciLCAKIlx1NWY1YSI6Ilx1NmM0NyIsIAoiXHU1ZjY1IjoiXHU1ZjY2IiwgCiJcdTVmNmIiOiJcdTk2ZDUiLCAKIlx1NWY3ZiI6Ilx1NGY1YiIsIAoiXHU1ZjhjIjoiXHU1NDBlIiwgCiJcdTVmOTEiOiJcdTVmODQiLCAKIlx1NWY5ZSI6Ilx1NGVjZSIsIAoiXHU1ZmEwIjoiXHU1Zjk1IiwgCiJcdTVmYTkiOiJcdTU5MGQiLCAKIlx1NWZhYyI6Ilx1NjVjMSIsIAoiXHU1ZmI1IjoiXHU1ZjgxIiwgCiJcdTVmYjkiOiJcdTVmN2IiLCAKIlx1NjA0NiI6Ilx1NjA1MiIsIAoiXHU2MDY1IjoiXHU4MDNiIiwgCiJcdTYwODUiOiJcdTYwYTYiLCAKIlx1NjBiNSI6Ilx1NjAwNSIsIAoiXHU2MGI2IjoiXHU5NWY3IiwgCiJcdTYwYmQiOiJcdTUxYzQiLCAKIlx1NjBjNyI6Ilx1NjU2NiIsIAoiXHU2MGUxIjoiXHU2MDc2IiwgCiJcdTYwZjEiOiJcdTYwN2MiLCAKIlx1NjBmMiI6Ilx1NjA3ZCIsIAoiXHU2MGY3IjoiXHU4ODIyIiwgCiJcdTYwZmIiOiJcdTYwN2IiLCAKIlx1NjExYiI6Ilx1NzIzMSIsIAoiXHU2MTFjIjoiXHU2MGVjIiwgCiJcdTYxMjgiOiJcdTYwYWIiLCAKIlx1NjEzNCI6Ilx1NjAwNiIsIAoiXHU2MTM3IjoiXHU2MDdhIiwgCiJcdTYxM2UiOiJcdTVmZmUiLCAKIlx1NjE0NCI6Ilx1NjgxNyIsIAoiXHU2MTQ3IjoiXHU2YmI3IiwgCiJcdTYxNGIiOiJcdTYwMDEiLCAKIlx1NjE0ZCI6Ilx1NjEyMCIsIAoiXHU2MTU4IjoiXHU2MGU4IiwgCiJcdTYxNWEiOiJcdTYwZWQiLCAKIlx1NjE1ZiI6Ilx1NjA3OCIsIAoiXHU2MTYzIjoiXHU2MGVmIiwgCiJcdTYxNmEiOiJcdTYwMDQiLCAKIlx1NjE2YiI6Ilx1NjAwMiIsIAoiXHU2MTZlIjoiXHU4NjUxIiwgCiJcdTYxNzMiOiJcdTYwYWQiLCAKIlx1NjE3NiI6Ilx1NWU4NiIsIAoiXHU2MTdjIjoiXHU2MjFhIiwgCiJcdTYxN2UiOiJcdTZiMzIiLCAKIlx1NjE4MiI6Ilx1NWZlNyIsIAoiXHU2MThhIjoiXHU2MGViIiwgCiJcdTYxOTAiOiJcdTYwMWMiLCAKIlx1NjE5MSI6Ilx1NTFlZCIsIAoiXHU2MTkyIjoiXHU2MTI2IiwgCiJcdTYxOWEiOiJcdTYwZWUiLCAKIlx1NjFhNCI6Ilx1NjEyNCIsIAoiXHU2MWFiIjoiXHU2MGFmIiwgCiJcdTYxYWUiOiJcdTYwMDMiLCAKIlx1NjFiMiI6Ilx1NWJhYSIsIAoiXHU2MWI2IjoiXHU1ZmM2IiwgCiJcdTYxYzMiOiJcdTUyZTQiLCAKIlx1NjFjNyI6Ilx1NjA3MyIsIAoiXHU2MWM5IjoiXHU1ZTk0IiwgCiJcdTYxY2MiOiJcdTYwM2YiLCAKIlx1NjFjZCI6Ilx1NjFkNCIsIAoiXHU2MWRlIjoiXHU4NDk5IiwgCiJcdTYxZGYiOiJcdTYwM2MiLCAKIlx1NjFlMyI6Ilx1NjFkMSIsIAoiXHU2MWU4IjoiXHU2MDc5IiwgCiJcdTYxZjIiOiJcdTYwZTkiLCAKIlx1NjFmNiI6Ilx1NjFkMiIsIAoiXHU2MWY3IjoiXHU2MDAwIiwgCiJcdTYxZjgiOiJcdTYwYWMiLCAKIlx1NjFmYSI6Ilx1NWZjZiIsIAoiXHU2MWZjIjoiXHU2MGU3IiwgCiJcdTYxZmUiOiJcdTYxNTEiLCAKIlx1NjIwMCI6Ilx1NjA0YiIsIAoiXHU2MjA3IjoiXHU2MjA2IiwgCiJcdTYyMDkiOiJcdTk0YmEiLCAKIlx1NjIxNCI6Ilx1NjIwYiIsIAoiXHU2MjI3IjoiXHU2MjE3IiwgCiJcdTYyMjkiOiJcdTYyMmMiLCAKIlx1NjIzMCI6Ilx1NjIxOCIsIAoiXHU2MjMyIjoiXHU2MjBmIiwgCiJcdTYyMzYiOiJcdTYyMzciLCAKIlx1NjI1MCI6Ilx1NGVjMiIsIAoiXHU2MjVlIjoiXHU2MzRkIiwgCiJcdTYyNzEiOiJcdTYzZDIiLCAKIlx1NjI3YSI6Ilx1NjJiNSIsIAoiXHU2MjgzIjoiXHU2MmRhIiwgCiJcdTYyOTQiOiJcdTYyYjEiLCAKIlx1NjJiNCI6Ilx1NjZmMyIsIAoiXHU2MmNiIjoiXHU2MjliIiwgCiJcdTYyZDEiOiJcdTk0YjMiLCAKIlx1NjMwYyI6Ilx1NjgzYyIsIAoiXHU2MzM2IjoiXHU1YzQwIiwgCiJcdTYzM2UiOiJcdTYzMWYiLCAKIlx1NjM2OCI6Ilx1ODIwZCIsIAoiXHU2MzZiIjoiXHU2MjZhIiwgCiJcdTYzNzIiOiJcdTUzNzciLCAKIlx1NjM4MyI6Ilx1NjI2YiIsIAoiXHU2Mzg0IjoiXHU2MmExIiwgCiJcdTYzODYiOiJcdTM5Y2YiLCAKIlx1NjM5NyI6Ilx1NjMxYyIsIAoiXHU2Mzk5IjoiXHU2MzIzIiwgCiJcdTYzOWIiOiJcdTYzMDIiLCAKIlx1NjNhMSI6Ilx1OTFjNyIsIAoiXHU2M2MwIjoiXHU2MmUzIiwgCiJcdTYzZGEiOiJcdTYyNmMiLCAKIlx1NjNkYiI6Ilx1NjM2MiIsIAoiXHU2M2VlIjoiXHU2MzI1IiwgCiJcdTYzZjkiOiJcdTgwY2MiLCAKIlx1NjQwNiI6Ilx1Njc4NCIsIAoiXHU2NDBkIjoiXHU2MzVmIiwgCiJcdTY0MTYiOiJcdTY0NDciLCAKIlx1NjQxNyI6Ilx1NjM2MyIsIAoiXHU2NDFmIjoiXHU2NGMwIiwgCiJcdTY0MjUiOiJcdTYzNzYiLCAKIlx1NjQyOCI6Ilx1NjI1MyIsIAoiXHU2NDJmIjoiXHU2MzhmIiwgCiJcdTY0MzYiOiJcdTYyYTIiLCAKIlx1NjQzZSI6Ilx1NjlhOCIsIAoiXHU2NDQwIjoiXHU2MzQyIiwgCiJcdTY0NDMiOiJcdTYyNWIiLCAKIlx1NjQ1MSI6Ilx1NjNiNCIsIAoiXHU2NDVjIjoiXHU2M2JjIiwgCiJcdTY0NWYiOiJcdTY0MDIiLCAKIlx1NjQ2ZiI6Ilx1NjMxYSIsIAoiXHU2NDczIjoiXHU2MmEwIiwgCiJcdTY0NzYiOiJcdTYyOWYiLCAKIlx1NjQ3YiI6Ilx1NjNiYSIsIAoiXHU2NDg4IjoiXHU2MzVlIiwgCiJcdTY0OGYiOiJcdTYzMjYiLCAKIlx1NjQ5MCI6Ilx1NjQ5MSIsIAoiXHU2NDkzIjoiXHU2MzIwIiwgCiJcdTY0OWEiOiJcdTYyYzgiLCAKIlx1NjQ5ZiI6Ilx1NjMyMiIsIAoiXHU2NGEyIjoiXHU2M2I4IiwgCiJcdTY0YTMiOiJcdTYzYjgiLCAKIlx1NjRhNSI6Ilx1NjJlOCIsIAoiXHU2NGE2IjoiXHU2MjZmIiwgCiJcdTY0YWIiOiJcdTYyOWEiLCAKIlx1NjRiMiI6Ilx1NjI1MSIsIAoiXHU2NGIzIjoiXHU2M2ZmIiwgCiJcdTY0YmIiOiJcdTYzMWUiLCAKIlx1NjRiZSI6Ilx1NjMxZCIsIAoiXHU2NGJmIjoiXHU2MzYxIiwgCiJcdTY0YzEiOiJcdTYyZTUiLCAKIlx1NjRjNCI6Ilx1NjNiMyIsIAoiXHU2NGM3IjoiXHU2MmU5IiwgCiJcdTY0Y2EiOiJcdTUxZmIiLCAKIlx1NjRjYiI6Ilx1NjMyMSIsIAoiXHU2NGQzIjoiXHUzOWRmIiwgCiJcdTY0ZDQiOiJcdTYyYzUiLCAKIlx1NjRkYSI6Ilx1NjM2ZSIsIAoiXHU2NGUwIjoiXHU2MzI0IiwgCiJcdTY0ZTEiOiJcdTYyYWMiLCAKIlx1NjRlMyI6Ilx1NjM2MyIsIAoiXHU2NGVjIjoiXHU2MmRmIiwgCiJcdTY0ZWYiOiJcdTY0NDgiLCAKIlx1NjRmMCI6Ilx1NjJlNyIsIAoiXHU2NGYxIjoiXHU2NDAxIiwgCiJcdTY0ZjIiOiJcdTYzYjciLCAKIlx1NjRmNCI6Ilx1NjI2OSIsIAoiXHU2NGY3IjoiXHU2NGI3IiwgCiJcdTY0ZmEiOiJcdTY0NDYiLCAKIlx1NjRmYiI6Ilx1NjRkZSIsIAoiXHU2NGZjIjoiXHU2NGI4IiwgCiJcdTY0ZmUiOiJcdTYyNzAiLCAKIlx1NjUwNCI6Ilx1NjQ0NSIsIAoiXHU2NTA2IjoiXHU2NGI1IiwgCiJcdTY1MGYiOiJcdTYyZTIiLCAKIlx1NjUxNCI6Ilx1NjJlNiIsIAoiXHU2NTE2IjoiXHU2NDg0IiwgCiJcdTY1MTkiOiJcdTY0MDAiLCAKIlx1NjUxYiI6Ilx1NjRiYSIsIAoiXHU2NTFjIjoiXHU2NDNhIiwgCiJcdTY1MWQiOiJcdTY0NDQiLCAKIlx1NjUyMiI6Ilx1NjUxMiIsIAoiXHU2NTIzIjoiXHU2MzFiIiwgCiJcdTY1MjQiOiJcdTY0NGEiLCAKIlx1NjUyYSI6Ilx1NjQwNSIsIAoiXHU2NTJjIjoiXHU2M2ZkIiwgCiJcdTY1MzciOiJcdTgwMDMiLCAKIlx1NjU1NyI6Ilx1OGQyNSIsIAoiXHU2NTU4IjoiXHU1M2Q5IiwgCiJcdTY1NzUiOiJcdTY1NGMiLCAKIlx1NjU3OCI6Ilx1NjU3MCIsIAoiXHU2NTgyIjoiXHU2NTViIiwgCiJcdTY1ODMiOiJcdTZiZDkiLCAKIlx1NjU5NSI6Ilx1NjU5MyIsIAoiXHU2NWFjIjoiXHU2NWE5IiwgCiJcdTY1YjciOiJcdTY1YWQiLCAKIlx1NjViYyI6Ilx1NGU4ZSIsIAoiXHU2NWMyIjoiXHU2NWQ3IiwgCiJcdTY1ZGIiOiJcdTVlNjEiLCAKIlx1NjYwNyI6Ilx1NTM0NyIsIAoiXHU2NjQyIjoiXHU2NWY2IiwgCiJcdTY2NDkiOiJcdTY2NGIiLCAKIlx1NjY1ZCI6Ilx1NjYzYyIsIAoiXHU2NjVlIjoiXHU2NmU2IiwgCiJcdTY2NjIiOiJcdTY2NzAiLCAKIlx1NjY3MyI6Ilx1NjY3MCIsIAoiXHU2NjdiIjoiXHU2Njk3IiwgCiJcdTY2ODgiOiJcdTY2NTUiLCAKIlx1NjY4OSI6Ilx1NjY1NiIsIAoiXHU2Njk4IjoiXHU5NjMzIiwgCiJcdTY2YTIiOiJcdTc1NDUiLCAKIlx1NjZhYiI6Ilx1NjY4MiIsIAoiXHU2NmIxIjoiXHU2NjM1IiwgCiJcdTY2YjgiOiJcdTRlODYiLCAKIlx1NjZjNCI6Ilx1NjY1NCIsIAoiXHU2NmM2IjoiXHU1Mzg2IiwgCiJcdTY2YzciOiJcdTY2MTkiLCAKIlx1NjZjOSI6Ilx1NjY1MyIsIAoiXHU2NmNmIjoiXHU1NDExIiwgCiJcdTY2ZDYiOiJcdTY2YTciLCAKIlx1NjZlMCI6Ilx1NjVmNyIsIAoiXHU2NmU4IjoiXHU2NjNkIiwgCiJcdTY2ZWMiOiJcdTY2NTIiLCAKIlx1NjZmOCI6Ilx1NGU2NiIsIAoiXHU2NzAzIjoiXHU0ZjFhIiwgCiJcdTY3MjIiOiJcdTY3MWIiLCAKIlx1NjcyNyI6Ilx1ODBlNyIsIAoiXHU2NzJlIjoiXHU2NzJmIiwgCiJcdTY3NDciOiJcdTU3MmMiLCAKIlx1Njc3MSI6Ilx1NGUxYyIsIAoiXHU2N2I0IjoiXHU2MmQwIiwgCiJcdTY3ZjUiOiJcdTY4MDUiLCAKIlx1NjdmYSI6Ilx1NjJkMCIsIAoiXHU2ODEyIjoiXHU2NWVjIiwgCiJcdTY4NmUiOiJcdTY3NmYiLCAKIlx1Njg3ZiI6Ilx1Njc0NiIsIAoiXHU2ODk0IjoiXHU2ODAwIiwgCiJcdTY4OTgiOiJcdTY3YTciLCAKIlx1Njg5ZCI6Ilx1Njc2MSIsIAoiXHU2ODlmIjoiXHU2N2FkIiwgCiJcdTY4YjEiOiJcdTYzNDYiLCAKIlx1NjhjNCI6Ilx1NWYwMyIsIAoiXHU2OGQ2IjoiXHU2N2E4IiwgCiJcdTY4ZDciOiJcdTY3YTMiLCAKIlx1NjhkZiI6Ilx1NjgwYiIsIAoiXHU2OGUxIjoiXHUzYjRlIiwgCiJcdTY4ZTciOiJcdTY4MDgiLCAKIlx1NjhmMiI6Ilx1NjgxNiIsIAoiXHU2OTBmIjoiXHU2ODYwIiwgCiJcdTY5NDQiOiJcdTUzM2UiLCAKIlx1Njk0YSI6Ilx1Njc2OCIsIAoiXHU2OTUzIjoiXHU2N2FiIiwgCiJcdTY5NTkiOiJcdTgzMDIiLCAKIlx1Njk1YyI6Ilx1ODBlMSIsIAoiXHU2OTY4IjoiXHU2ODYyIiwgCiJcdTY5NmQiOiJcdTRlMWEiLCAKIlx1Njk3NSI6Ilx1Njc4MSIsIAoiXHU2OWE2IjoiXHU1ZTcyIiwgCiJcdTY5YWEiOiJcdTY3NjkiLCAKIlx1NjlhZSI6Ilx1ODM2MyIsIAoiXHU2OWJmIjoiXHU2ODY0IiwgCiJcdTY5YzMiOiJcdTc2ZDgiLCAKIlx1NjljYiI6Ilx1Njc4NCIsIAoiXHU2OWNkIjoiXHU2N2FhIiwgCiJcdTY5ZDMiOiJcdTY3NjAiLCAKIlx1NjllNyI6Ilx1NjkyMCIsIAoiXHU2OWU4IjoiXHU2OTAxIiwgCiJcdTY5ZjMiOiJcdTY4NjgiLCAKIlx1NmEwMSI6Ilx1Njg2OSIsIAoiXHU2YTAyIjoiXHU0ZTUwIiwgCiJcdTZhMDUiOiJcdTY3OWUiLCAKIlx1NmExMSI6Ilx1Njg4MSIsIAoiXHU2YTEzIjoiXHU2OTdjIiwgCiJcdTZhMTkiOiJcdTY4MDciLCAKIlx1NmExZSI6Ilx1NjdhMiIsIAoiXHU2YTIzIjoiXHU2ODM3IiwgCiJcdTZhMzgiOiJcdTY3MzQiLCAKIlx1NmEzOSI6Ilx1NjgxMSIsIAoiXHU2YTNhIjoiXHU2ODY2IiwgCiJcdTZhNDgiOiJcdTY4NjEiLCAKIlx1NmE0YiI6Ilx1Njg2NSIsIAoiXHU2YTVmIjoiXHU2NzNhIiwgCiJcdTZhNjIiOiJcdTY5MmQiLCAKIlx1NmE2NiI6Ilx1NWU2MiIsIAoiXHU2YTZiIjoiXHU2YTJhIiwgCiJcdTZhODEiOiJcdTZhYTkiLCAKIlx1NmE4OSI6Ilx1NjdmZCIsIAoiXHU2YTk0IjoiXHU2ODYzIiwgCiJcdTZhOWMiOiJcdTY4NjciLCAKIlx1NmE5ZiI6Ilx1NjlkYSIsIAoiXHU2YWEyIjoiXHU2OGMwIiwgCiJcdTZhYTMiOiJcdTZhMmYiLCAKIlx1NmFhZiI6Ilx1NTNmMCIsIAoiXHU2YWIzIjoiXHU2OWRmIiwgCiJcdTZhYjgiOiJcdTY3ZTAiLCAKIlx1NmFiYiI6Ilx1NjlkYiIsIAoiXHU2YWMyIjoiXHU2OGY5IiwgCiJcdTZhYzMiOiJcdTY3ZGMiLCAKIlx1NmFkMCI6Ilx1N2QyZiIsIAoiXHU2YWQzIjoiXHU2YTc5IiwgCiJcdTZhZGEiOiJcdTY5ODgiLCAKIlx1NmFkYiI6Ilx1NjgwOSIsIAoiXHU2YWRkIjoiXHU2OTFmIiwgCiJcdTZhZGUiOiJcdTZhN2MiLCAKIlx1NmFkZiI6Ilx1NjgwZSIsIAoiXHU2YWU1IjoiXHU2YTcxIiwgCiJcdTZhZTciOiJcdTY5ZTAiLCAKIlx1NmFlOCI6Ilx1NjgwYyIsIAoiXHU2YWVhIjoiXHU2N2E1IiwgCiJcdTZhZWIiOiJcdTZhNjUiLCAKIlx1NmFlYyI6Ilx1Njk4NyIsIAoiXHU2YWYzIjoiXHU2ODBhIiwgCiJcdTZhZjgiOiJcdTY5ODkiLCAKIlx1NmFmYSI6Ilx1NjhjMiIsIAoiXHU2YWZiIjoiXHU2YTMxIiwgCiJcdTZiMDQiOiJcdTY4MGYiLCAKIlx1NmIwYSI6Ilx1Njc0MyIsIAoiXHU2YjBmIjoiXHU2OTI0IiwgCiJcdTZiMTIiOiJcdTY4M2UiLCAKIlx1NmIxNiI6Ilx1Njk4NCIsIAoiXHU2YjFlIjoiXHU2OGMyIiwgCiJcdTZiMzgiOiJcdTU1MDkiLCAKIlx1NmIzZCI6Ilx1OTRhNiIsIAoiXHU2YjRlIjoiXHU1M2Y5IiwgCiJcdTZiNTAiOiJcdTZiMjciLCAKIlx1NmI1ZiI6Ilx1NmIyNCIsIAoiXHU2YjYxIjoiXHU2YjIyIiwgCiJcdTZiNzIiOiJcdTVjODEiLCAKIlx1NmI3NyI6Ilx1NTM4NiIsIAoiXHU2Yjc4IjoiXHU1ZjUyIiwgCiJcdTZiN2YiOiJcdTZiODEiLCAKIlx1NmI4MCI6Ilx1NTkyZCIsIAoiXHU2Yjk4IjoiXHU2YjhiIiwgCiJcdTZiOWUiOiJcdTZiOTIiLCAKIlx1NmJhNCI6Ilx1NmI4NyIsIAoiXHU2YmFiIjoiXHU2YjlhIiwgCiJcdTZiYWQiOiJcdTUwZjUiLCAKIlx1NmJhZSI6Ilx1NmI5MyIsIAoiXHU2YmFmIjoiXHU2YmExIiwgCiJcdTZiYjIiOiJcdTZiN2MiLCAKIlx1NmJiYSI6Ilx1Njc0MCIsIAoiXHU2YmJjIjoiXHU1OGYzIiwgCiJcdTZiYmQiOiJcdTgwYjQiLCAKIlx1NmJjMCI6Ilx1NmJjMSIsIAoiXHU2YmM2IjoiXHU2YmI0IiwgCiJcdTZiY2MiOiJcdTZiY2IiLCAKIlx1NmJkOCI6Ilx1NmJkNyIsIAoiXHU2YmVjIjoiXHU3NDAzIiwgCiJcdTZiZmYiOiJcdTZiZjUiLCAKIlx1NmMwOCI6Ilx1NmJlMSIsIAoiXHU2YzBjIjoiXHU2YzA3IiwgCiJcdTZjMjMiOiJcdTZjMTQiLCAKIlx1NmMyYiI6Ilx1NmMyMiIsIAoiXHU2YzJjIjoiXHU2YzI5IiwgCiJcdTZjMzMiOiJcdTZjMzIiLCAKIlx1NmMzZSI6Ilx1NmNkYiIsIAoiXHU2YzRkIjoiXHU0ZTM4IiwgCiJcdTZjNGUiOiJcdTZjZGIiLCAKIlx1NmM1OSI6Ilx1NmM2MSIsIAoiXHU2YzdhIjoiXHU1MWIzIiwgCiJcdTZjOGQiOiJcdTUxYjEiLCAKIlx1NmM5MiI6Ilx1NmNhMSIsIAoiXHU2Yzk2IjoiXHU1MWIyIiwgCiJcdTZjYzEiOiJcdTUxYjUiLCAKIlx1NmNkZCI6Ilx1NmVhZiIsIAoiXHU2ZDFmIjoiXHU2ZDk1IiwgCiJcdTZkMjkiOiJcdTZjYzQiLCAKIlx1NmQzNiI6Ilx1NmM3OSIsIAoiXHU2ZDZjIjoiXHU5MWNjIiwgCiJcdTZkNzkiOiJcdTZkNDMiLCAKIlx1NmQ4NyI6Ilx1NmNmZSIsIAoiXHU2ZGJjIjoiXHU1MWM5IiwgCiJcdTZkZDIiOiJcdTUxYzQiLCAKIlx1NmRkYSI6Ilx1NmNlYSIsIAoiXHU2ZGU1IjoiXHU2ZTBjIiwgCiJcdTZkZTgiOiJcdTUxYzAiLCAKIlx1NmRlYSI6Ilx1NmNhNiIsIAoiXHU2ZGY1IjoiXHU2ZTBhIiwgCiJcdTZkZjYiOiJcdTZkOWUiLCAKIlx1NmRmYSI6Ilx1NmQ0NSIsIAoiXHU2ZTE5IjoiXHU2ZGEzIiwgCiJcdTZlMWIiOiJcdTUxY2YiLCAKIlx1NmUyMiI6Ilx1NmNhOCIsIAoiXHU2ZTI2IjoiXHU2ZGExIiwgCiJcdTZlMmMiOiJcdTZkNGIiLCAKIlx1NmUzZSI6Ilx1NmQ1MSIsIAoiXHU2ZTRhIjoiXHU1MWQxIiwgCiJcdTZlNWUiOiJcdTZkNDgiLCAKIlx1NmU2MyI6Ilx1OTVmNSIsIAoiXHU2ZTY3IjoiXHU2ZDhjIiwgCiJcdTZlNmYiOiJcdTZjNjQiLCAKIlx1NmU4OCI6Ilx1NmNhOSIsIAoiXHU2ZTk2IjoiXHU1MWM2IiwgCiJcdTZlOWQiOiJcdTZjOWYiLCAKIlx1NmVhYiI6Ilx1NmUyOSIsIAoiXHU2ZWFlIjoiXHU2ZDQ5IiwgCiJcdTZlYjMiOiJcdTZkYTIiLCAKIlx1NmViYyI6Ilx1NmU3ZiIsIAoiXHU2ZWM0IjoiXHU2Y2E3IiwgCiJcdTZlYzUiOiJcdTcwNmQiLCAKIlx1NmVjYyI6Ilx1NmRhNCIsIAoiXHU2ZWNlIjoiXHU4MzY1IiwgCiJcdTZlZWMiOiJcdTZjYWEiLCAKIlx1NmVlZiI6Ilx1NmVkZSIsIAoiXHU2ZWYyIjoiXHU2ZTE3IiwgCiJcdTZlZjciOiJcdTUzNjQiLCAKIlx1NmVmOCI6Ilx1NmQ1MiIsIAoiXHU2ZWZiIjoiXHU2ZDUwIiwgCiJcdTZlZmUiOiJcdTZlZGEiLCAKIlx1NmVmZiI6Ilx1NmVlMSIsIAoiXHU2ZjAxIjoiXHU2ZTE0IiwgCiJcdTZmMGEiOiJcdTZlODciLCAKIlx1NmYxYSI6Ilx1NmNhNCIsIAoiXHU2ZjIyIjoiXHU2YzQ5IiwgCiJcdTZmMjMiOiJcdTZkOWYiLCAKIlx1NmYyYyI6Ilx1NmUwZCIsIAoiXHU2ZjMyIjoiXHU2ZGE4IiwgCiJcdTZmMzUiOiJcdTZlODYiLCAKIlx1NmYzOCI6Ilx1NmUxMCIsIAoiXHU2ZjNmIjoiXHU2ZDQ2IiwgCiJcdTZmNDEiOiJcdTk4OGQiLCAKIlx1NmY1MSI6Ilx1NmNmYyIsIAoiXHU2ZjU0IjoiXHU2ZDAxIiwgCiJcdTZmNWIiOiJcdTZmNWMiLCAKIlx1NmY1ZiI6Ilx1ODIwNCIsIAoiXHU2ZjY0IjoiXHU2ZGE2IiwgCiJcdTZmNmYiOiJcdTZkNTQiLCAKIlx1NmY3MCI6Ilx1NmU4MyIsIAoiXHU2Zjc3IjoiXHU2ZWQ3IiwgCiJcdTZmN2YiOiJcdTZkYTAiLCAKIlx1NmY4MCI6Ilx1NmRhOSIsIAoiXHU2ZjgyIjoiXHU2Zjg0IiwgCiJcdTZmODYiOiJcdTZkNDciLCAKIlx1NmY4NyI6Ilx1NmQ5ZCIsIAoiXHU2Zjk0IjoiXHU2ZDY5IiwgCiJcdTZmOTciOiJcdTZkYTciLCAKIlx1NmZhMCI6Ilx1NmUxMSIsIAoiXHU2ZmE0IjoiXHU2Y2ZkIiwgCiJcdTZmYTYiOiJcdTZlZWEiLCAKIlx1NmZhOSI6Ilx1NmNmNiIsIAoiXHU2ZmFlIjoiXHU2ZDRkIiwgCiJcdTZmYjEiOiJcdTZkYzAiLCAKIlx1NmZiZSI6Ilx1M2NlMCIsIAoiXHU2ZmMxIjoiXHU2ZDRhIiwgCiJcdTZmYzMiOiJcdTZkNTMiLCAKIlx1NmZkNSI6Ilx1NmU3ZiIsIAoiXHU2ZmQ4IjoiXHU2Y2RlIiwgCiJcdTZmZGIiOiJcdTg0OTkiLCAKIlx1NmZkYyI6Ilx1NmQ1NSIsIAoiXHU2ZmRmIjoiXHU2ZDRlIiwgCiJcdTZmZTQiOiJcdTZkOWIiLCAKIlx1NmZlYiI6Ilx1NmVlNSIsIAoiXHU2ZmVjIjoiXHU2ZDVhIiwgCiJcdTZmZjAiOiJcdTZmNGQiLCAKIlx1NmZmMSI6Ilx1NmVlOCIsIAoiXHU2ZmZhIjoiXHU2ZTg1IiwgCiJcdTZmZmMiOiJcdTZjZmEiLCAKIlx1NmZmZSI6Ilx1NmVlNCIsIAoiXHU3MDAxIjoiXHU2ZjNlIiwgCiJcdTcwMDUiOiJcdTZlZTIiLCAKIlx1NzAwNiI6Ilx1NmUwZSIsIAoiXHU3MDA5IjoiXHU2Y2ZiIiwgCiJcdTcwMGIiOiJcdTZjODgiLCAKIlx1NzAwZiI6Ilx1NmQ0ZiIsIAoiXHU3MDE1IjoiXHU2ZmQyIiwgCiJcdTcwMTgiOiJcdTZjZjgiLCAKIlx1NzAxZCI6Ilx1NmNhNSIsIAoiXHU3MDFmIjoiXHU2ZjQ3IiwgCiJcdTcwMjAiOiJcdTZmNDYiLCAKIlx1NzAyNiI6Ilx1NmY3NCIsIAoiXHU3MDI3IjoiXHU2Y2Y3IiwgCiJcdTcwMjgiOiJcdTZmZDEiLCAKIlx1NzAzMCI6Ilx1NWYyNSIsIAoiXHU3MDMyIjoiXHU2ZjRiIiwgCiJcdTcwM2UiOiJcdTZmOWMiLCAKIlx1NzA0MyI6Ilx1NmNhMyIsIAoiXHU3MDQ0IjoiXHU2ZWUwIiwgCiJcdTcwNTEiOiJcdTZkMTIiLCAKIlx1NzA1NSI6Ilx1NmYxMyIsIAoiXHU3MDU4IjoiXHU2ZWU5IiwgCiJcdTcwNWQiOiJcdTcwNGYiLCAKIlx1NzA2MyI6Ilx1NmU3ZSIsIAoiXHU3MDY0IjoiXHU2ZWU2IiwgCiJcdTcwNjkiOiJcdTZlZGYiLCAKIlx1NzA3ZCI6Ilx1NzA3ZSIsIAoiXHU3MGE0IjoiXHU3MTY3IiwgCiJcdTcwYjAiOiJcdTcwYWUiLCAKIlx1NzBiYSI6Ilx1NGUzYSIsIAoiXHU3MGNmIjoiXHU0ZTRjIiwgCiJcdTcwZjQiOiJcdTcwYzMiLCAKIlx1NzEyMSI6Ilx1NjVlMCIsIAoiXHU3MTQ5IjoiXHU3MGJjIiwgCiJcdTcxNTIiOiJcdTcwOWMiLCAKIlx1NzE1NiI6Ilx1NjY5NiIsIAoiXHU3MTU5IjoiXHU3MGRmIiwgCiJcdTcxNjIiOiJcdTgzMTUiLCAKIlx1NzE2NSI6Ilx1NzExNSIsIAoiXHU3MTY5IjoiXHU3MGU2IiwgCiJcdTcxNmMiOiJcdTcwODAiLCAKIlx1NzE5MiI6Ilx1ODM2NyIsIAoiXHU3MTk3IjoiXHU3MDlkIiwgCiJcdTcxYjEiOiJcdTcwZWQiLCAKIlx1NzFiZSI6Ilx1NzBiZCIsIAoiXHU3MWMxIjoiXHU3MGU4IiwgCiJcdTcxYzQiOiJcdTcxMzAiLCAKIlx1NzFjOCI6Ilx1NzA2ZiIsIAoiXHU3MWM5IjoiXHU3MDk2IiwgCiJcdTcxZDAiOiJcdTc4ZjciLCAKIlx1NzFkMiI6Ilx1NzBlNyIsIAoiXHU3MWQ5IjoiXHU3MGViIiwgCiJcdTcxZGMiOiJcdTcxMTYiLCAKIlx1NzFkZiI6Ilx1ODQyNSIsIAoiXHU3MWU2IjoiXHU3MDdmIiwgCiJcdTcxZWMiOiJcdTZiYzEiLCAKIlx1NzFlZCI6Ilx1NzBkYiIsIAoiXHU3MWY0IjoiXHU3MGU5IiwgCiJcdTcxZmIiOiJcdTcxOGYiLCAKIlx1NzFmYyI6Ilx1NzBlYyIsIAoiXHU3MWZlIjoiXHU3MTE4IiwgCiJcdTcxZmYiOiJcdTgwMDAiLCAKIlx1NzIwZCI6Ilx1NzBjMSIsIAoiXHU3MjEwIjoiXHU3MDg5IiwgCiJcdTcyMWIiOiJcdTcwYzIiLCAKIlx1NzIyZCI6Ilx1NGU4OSIsIAoiXHU3MjMyIjoiXHU0ZTNhIiwgCiJcdTcyM2EiOiJcdTcyMzciLCAKIlx1NzIzZSI6Ilx1NWMxNCIsIAoiXHU3MjQ2IjoiXHU1ODk5IiwgCiJcdTcyNTgiOiJcdTcyNGQiLCAKIlx1NzI2MCI6Ilx1NWI4MyIsIAoiXHU3Mjc0IjoiXHU2MmI1IiwgCiJcdTcyN2QiOiJcdTcyNzUiLCAKIlx1NzI5NiI6Ilx1ODM2NiIsIAoiXHU3MjliIjoiXHU3MjY2IiwgCiJcdTcyYTIiOiJcdTcyOGEiLCAKIlx1NzJhNyI6Ilx1NzI3YSIsIAoiXHU3MmMwIjoiXHU3MmI2IiwgCiJcdTcyZGEiOiJcdTY1ZTYiLCAKIlx1NzJmOSI6Ilx1NzJlZCIsIAoiXHU3MmZkIjoiXHU3MmM4IiwgCiJcdTczMTkiOiJcdTcyZjAiLCAKIlx1NzMzNiI6Ilx1NzJiOSIsIAoiXHU3MzNiIjoiXHU3MmYyIiwgCiJcdTczNDEiOiJcdTcyYjgiLCAKIlx1NzM0MyI6Ilx1NTQ0NiIsIAoiXHU3MzQ0IjoiXHU3MmYxIiwgCiJcdTczNDUiOiJcdTcyZWUiLCAKIlx1NzM0ZSI6Ilx1NTk1NiIsIAoiXHU3MzY4IjoiXHU3MmVjIiwgCiJcdTczNmEiOiJcdTcyZWYiLCAKIlx1NzM2YiI6Ilx1NzMwMyIsIAoiXHU3MzZlIjoiXHU3MmRkIiwgCiJcdTczNzAiOiJcdTcyZGUiLCAKIlx1NzM3MiI6Ilx1ODNiNyIsIAoiXHU3Mzc1IjoiXHU3MzBlIiwgCiJcdTczNzciOiJcdTcyYjciLCAKIlx1NzM3OCI6Ilx1NTE3ZCIsIAoiXHU3MzdhIjoiXHU3MzZkIiwgCiJcdTczN2IiOiJcdTczMmUiLCAKIlx1NzM3YyI6Ilx1NzMxNSIsIAoiXHU3MzgwIjoiXHU3MzIxIiwgCiJcdTczODUiOiJcdTU5OTkiLCAKIlx1NzM4NiI6Ilx1NTE3OSIsIAoiXHU3M2E4IjoiXHU3M2NmIiwgCiJcdTczZWEiOiJcdTU3MmQiLCAKIlx1NzNlZSI6Ilx1NGY2OSIsIAoiXHU3M2ZlIjoiXHU3M2IwIiwgCiJcdTc0MzEiOiJcdTk2ZDUiLCAKIlx1NzQzYSI6Ilx1NzNkMCIsIAoiXHU3NDNmIjoiXHU3M2YyIiwgCiJcdTc0NGIiOiJcdTczYWUiLCAKIlx1NzQ2MyI6Ilx1NzQxMCIsIAoiXHU3NDY0IjoiXHU3NDc2IiwgCiJcdTc0NjkiOiJcdTgzYjkiLCAKIlx1NzQ2YSI6Ilx1NzM5YiIsIAoiXHU3NDZmIjoiXHU3NDA1IiwgCiJcdTc0NzIiOiJcdTczYjEiLCAKIlx1NzQ4OSI6Ilx1NzQwZiIsIAoiXHU3NGExIjoiXHU3NDBlIiwgCiJcdTc0YTMiOiJcdTczOTEiLCAKIlx1NzRhNiI6Ilx1NzQ3NyIsIAoiXHU3NGIwIjoiXHU3M2FmIiwgCiJcdTc0YmQiOiJcdTczYmEiLCAKIlx1NzRiZiI6Ilx1NzQ4NyIsIAoiXHU3NGNhIjoiXHU3NDNjIiwgCiJcdTc0Y2YiOiJcdTczZDEiLCAKIlx1NzRkNCI6Ilx1NzQ4ZSIsIAoiXHU3NGQ2IjoiXHU5NTc2IiwgCiJcdTc0ZGEiOiJcdTc0ZDIiLCAKIlx1NzUwYyI6Ilx1NzRlZiIsIAoiXHU3NTE1IjoiXHU3NGVlIiwgCiJcdTc1MjIiOiJcdTRlYTciLCAKIlx1NzUyMyI6Ilx1NGVhNyIsIAoiXHU3NTI2IjoiXHU4MmNmIiwgCiJcdTc1MmEiOiJcdTg5ZDIiLCAKIlx1NzU1ZCI6Ilx1NGVhOSIsIAoiXHU3NTYyIjoiXHU2YmQ1IiwgCiJcdTc1NmIiOiJcdTc1M2IiLCAKIlx1NzU2YyI6Ilx1NzU3MiIsIAoiXHU3NTcwIjoiXHU1ZjAyIiwgCiJcdTc1NzYiOiJcdTVmNTMiLCAKIlx1NzU4NyI6Ilx1NzU3NCIsIAoiXHU3NThhIjoiXHU1M2UwIiwgCiJcdTc1YmYiOiJcdTc1ZjEiLCAKIlx1NzVkOSI6Ilx1NzVjOSIsIAoiXHU3NWUwIjoiXHU5MTc4IiwgCiJcdTc1ZjIiOiJcdTllYmIiLCAKIlx1NzVmMyI6Ilx1OWViYiIsIAoiXHU3NWZhIjoiXHU3NWY5IiwgCiJcdTc1ZmUiOiJcdTc1YjQiLCAKIlx1NzYwMiI6Ilx1NzVkNiIsIAoiXHU3NjA5IjoiXHU2MTA4IiwgCiJcdTc2MGIiOiJcdTc1YWYiLCAKIlx1NzYwZCI6Ilx1NzVhMSIsIAoiXHU3NjEzIjoiXHU3NWVhIiwgCiJcdTc2MWUiOiJcdTc2MTciLCAKIlx1NzYyMSI6Ilx1NzVhZSIsIAoiXHU3NjI3IjoiXHU3NTlmIiwgCiJcdTc2M2EiOiJcdTc2MTgiLCAKIlx1NzYzYiI6Ilx1NzYxOCIsIAoiXHU3NjQyIjoiXHU3NTk3IiwgCiJcdTc2NDYiOiJcdTc1ZTgiLCAKIlx1NzY0NyI6Ilx1NzVlYiIsIAoiXHU3NjQ5IjoiXHU3NjA1IiwgCiJcdTc2NTIiOiJcdTYxMDgiLCAKIlx1NzY1OCI6Ilx1NzVhMCIsIAoiXHU3NjVmIjoiXHU3NjJhIiwgCiJcdTc2NjEiOiJcdTc1ZjQiLCAKIlx1NzY2MiI6Ilx1NzVkMiIsIAoiXHU3NjY0IjoiXHU3NTk2IiwgCiJcdTc2NjUiOiJcdTc1YzciLCAKIlx1NzY2NyI6Ilx1NzVhYyIsIAoiXHU3NjY5IjoiXHU3NjVlIiwgCiJcdTc2NmMiOiJcdTc2NjMiLCAKIlx1NzY2ZCI6Ilx1NzYzZiIsIAoiXHU3NjZlIjoiXHU3NjNlIiwgCiJcdTc2NzAiOiJcdTc1YzgiLCAKIlx1NzY3MSI6Ilx1NzYyYiIsIAoiXHU3NjcyIjoiXHU3NjZiIiwgCiJcdTc2N2MiOiJcdTUzZDEiLCAKIlx1NzY4MSI6Ilx1NzY4MiIsIAoiXHU3NjlhIjoiXHU3NjkxIiwgCiJcdTc2YjAiOiJcdTc1YjEiLCAKIlx1NzZiOCI6Ilx1NzZiMiIsIAoiXHU3NmJhIjoiXHU3NmIxIiwgCiJcdTc2YzMiOiJcdTY3NmYiLCAKIlx1NzZkYyI6Ilx1NzZkNyIsIAoiXHU3NmRlIjoiXHU3NmNmIiwgCiJcdTc2ZTEiOiJcdTVjM2QiLCAKIlx1NzZlMyI6Ilx1NzZkMSIsIAoiXHU3NmU0IjoiXHU3NmQ4IiwgCiJcdTc2ZTciOiJcdTUzNjIiLCAKIlx1NzZlYSI6Ilx1ODM2MSIsIAoiXHU3NzI1IjoiXHU3NzI2IiwgCiJcdTc3M2UiOiJcdTRmMTciLCAKIlx1Nzc0ZiI6Ilx1NTZmMCIsIAoiXHU3NzVjIjoiXHU3NzQxIiwgCiJcdTc3NWUiOiJcdTc3NTAiLCAKIlx1Nzc2YSI6Ilx1Nzc3ZSIsIAoiXHU3Nzg3IjoiXHU3NzJmIiwgCiJcdTc3OTgiOiJcdTc3MGQiLCAKIlx1Nzc5YyI6Ilx1NDA1NiIsIAoiXHU3NzllIjoiXHU3NzkyIiwgCiJcdTc3YmMiOiJcdTc3NTEiLCAKIlx1NzdjNyI6Ilx1ODQ5OSIsIAoiXHU3N2QzIjoiXHU3NzJjIiwgCiJcdTc3ZGEiOiJcdTc3YTkiLCAKIlx1NzdlZiI6Ilx1NzdlYiIsIAoiXHU3ODMyIjoiXHU3MGFlIiwgCiJcdTc4NDMiOiJcdTY3MzEiLCAKIlx1Nzg2NCI6Ilx1Nzg1NiIsIAoiXHU3ODY4IjoiXHU3ODE3IiwgCiJcdTc4NmYiOiJcdTc4MWEiLCAKIlx1Nzg5NSI6Ilx1NWQwZSIsIAoiXHU3OGE5IjoiXHU3ODU1IiwgCiJcdTc4YWEiOiJcdTc4MjciLCAKIlx1NzhhZCI6Ilx1NzgwMCIsIAoiXHU3OGI4IjoiXHU3ODFjIiwgCiJcdTc4YmEiOiJcdTc4NmUiLCAKIlx1NzhiYyI6Ilx1NzgwMSIsIAoiXHU3OGQxIjoiXHU3ODU5IiwgCiJcdTc4ZGEiOiJcdTc4MTYiLCAKIlx1NzhlMyI6Ilx1Nzg5YyIsIAoiXHU3OGU3IjoiXHU3ODliIiwgCiJcdTc4ZWYiOiJcdTc3ZjYiLCAKIlx1NzhmZCI6Ilx1Nzg1NyIsIAoiXHU3OTA0IjoiXHU3ODVhIiwgCiJcdTc5MGUiOiJcdTc4NDAiLCAKIlx1NzkxOSI6Ilx1Nzg4ZCIsIAoiXHU3OTI2IjoiXHU3N2ZmIiwgCiJcdTc5MmEiOiJcdTc4M2EiLCAKIlx1NzkyYiI6Ilx1NzgzZSIsIAoiXHU3OTJjIjoiXHU3N2ZlIiwgCiJcdTc5MzEiOiJcdTc4M2IiLCAKIlx1Nzk0MiI6Ilx1NGVkNiIsIAoiXHU3OTQ1IjoiXHU3OTQ2IiwgCiJcdTc5NDciOiJcdTUzZWEiLCAKIlx1Nzk1MCI6Ilx1NGY1MSIsIAoiXHU3OTdjIjoiXHU4OGY4IiwgCiJcdTc5N2YiOiJcdTc5ODQiLCAKIlx1Nzk4ZCI6Ilx1Nzk3OCIsIAoiXHU3OThlIjoiXHU3OTZmIiwgCiJcdTc5OTUiOiJcdTc5NGUiLCAKIlx1NzlhNiI6Ilx1NWZhMSIsIAoiXHU3OWFhIjoiXHU3OTg1IiwgCiJcdTc5YWUiOiJcdTc5M2MiLCAKIlx1NzliMSI6Ilx1Nzk3NyIsIAoiXHU3OWJmIjoiXHU3OWMzIiwgCiJcdTc5YzgiOiJcdTdjN2MiLCAKIlx1NzljZiI6Ilx1ODAxNyIsIAoiXHU3YTA1IjoiXHU3YTBlIiwgCiJcdTdhMDgiOiJcdTc5YzYiLCAKIlx1N2ExYyI6Ilx1NjhmMSIsIAoiXHU3YTFmIjoiXHU3OTgwIiwgCiJcdTdhMjgiOiJcdTYyNDEiLCAKIlx1N2EyZSI6Ilx1NzljZCIsIAoiXHU3YTMxIjoiXHU3OWYwIiwgCiJcdTdhNDAiOiJcdThjMzciLCAKIlx1N2E0NyI6Ilx1NDE1ZiIsIAoiXHU3YTRjIjoiXHU3YTIzIiwgCiJcdTdhNGQiOiJcdTc5ZWYiLCAKIlx1N2E0ZSI6Ilx1OTg5NiIsIAoiXHU3YTYxIjoiXHU3YTUxIiwgCiJcdTdhNjIiOiJcdTc5ZmQiLCAKIlx1N2E2OCI6Ilx1OTg5MyIsIAoiXHU3YTY5IjoiXHU3YTMzIiwgCiJcdTdhNmIiOiJcdTgzYjciLCAKIlx1N2FhOSI6Ilx1N2E5ZCIsIAoiXHU3YWFhIjoiXHU2ZDNjIiwgCiJcdTdhYWUiOiJcdTdhNzciLCAKIlx1N2FhZiI6Ilx1N2E5MSIsIAoiXHU3YWI1IjoiXHU3YThlIiwgCiJcdTdhYjYiOiJcdTdhYWQiLCAKIlx1N2FiYSI6Ilx1N2FhNSIsIAoiXHU3YWM0IjoiXHU3YTljIiwgCiJcdTdhYzUiOiJcdTdhOGQiLCAKIlx1N2FjNyI6Ilx1N2FhNiIsIAoiXHU3YWNhIjoiXHU3YTgzIiwgCiJcdTdhZjYiOiJcdTdhZGUiLCAKIlx1N2IzYiI6Ilx1N2I0NyIsIAoiXHU3YjQ2IjoiXHU3YjE0IiwgCiJcdTdiNGQiOiJcdTdiMGIiLCAKIlx1N2I2NyI6Ilx1N2IxNSIsIAoiXHU3Yjc0IjoiXHU3YjU2IiwgCiJcdTdiODQiOiJcdTdiODUiLCAKIlx1N2I4NyI6Ilx1NGUyYSIsIAoiXHU3YjhiIjoiXHU3YjNhIiwgCiJcdTdiOGYiOiJcdTdiNWQiLCAKIlx1N2JhMCI6Ilx1NjhmMCIsIAoiXHU3YmMwIjoiXHU4MjgyIiwgCiJcdTdiYzQiOiJcdTgzMDMiLCAKIlx1N2JjOSI6Ilx1N2I1MSIsIAoiXHU3YmNiIjoiXHU3YmE3IiwgCiJcdTdiZGIiOiJcdTdiYWMiLCAKIlx1N2JlMCI6Ilx1N2I3MSIsIAoiXHU3YmU0IjoiXHU3YjAzIiwgCiJcdTdiZTkiOiJcdTdiNWIiLCAKIlx1N2JmMiI6Ilx1NWY1NyIsIAoiXHU3YmYzIjoiXHU3YjVhIiwgCiJcdTdjMDAiOiJcdTdiYTYiLCAKIlx1N2MwZCI6Ilx1N2JkMyIsIAoiXHU3YzExIjoiXHU4NGQxIiwgCiJcdTdjMWUiOiJcdTdiYWEiLCAKIlx1N2MyMSI6Ilx1N2I4MCIsIAoiXHU3YzIzIjoiXHU3YmQxIiwgCiJcdTdjMmIiOiJcdTdiYWIiLCAKIlx1N2MzNyI6Ilx1NmE5MCIsIAoiXHU3YzNkIjoiXHU3YjdlIiwgCiJcdTdjM2UiOiJcdTVlMTgiLCAKIlx1N2M0MyI6Ilx1N2JlZSIsIAoiXHU3YzRjIjoiXHU3Yjc5IiwgCiJcdTdjNTAiOiJcdTg1ZTQiLCAKIlx1N2M1OSI6Ilx1N2I5MyIsIAoiXHU3YzVjIjoiXHU3YmE4IiwgCiJcdTdjNWYiOiJcdTdjNDEiLCAKIlx1N2M2MCI6Ilx1N2IzYyIsIAoiXHU3YzY0IjoiXHU3YjdlIiwgCiJcdTdjNjUiOiJcdTlmYTAiLCAKIlx1N2M2OSI6Ilx1N2IzZSIsIAoiXHU3YzZhIjoiXHU3YzE2IiwgCiJcdTdjNmMiOiJcdTdiZjEiLCAKIlx1N2M2ZSI6Ilx1N2JhOSIsIAoiXHU3YzcyIjoiXHU1NDAxIiwgCiJcdTdjYTciOiJcdTU5ODYiLCAKIlx1N2NiNSI6Ilx1N2NhNCIsIAoiXHU3Y2RkIjoiXHU3Y2MxIiwgCiJcdTdjZGUiOiJcdTdjYWEiLCAKIlx1N2NlNyI6Ilx1N2NhZSIsIAoiXHU3Y2YwIjoiXHU1NmUyIiwgCiJcdTdjZjIiOiJcdTdjOWQiLCAKIlx1N2NmNCI6Ilx1N2M3NCIsIAoiXHU3Y2Y2IjoiXHU3YzljIiwgCiJcdTdjZmUiOiJcdTdlYTAiLCAKIlx1N2QwMCI6Ilx1N2VhYSIsIAoiXHU3ZDAyIjoiXHU3ZWEzIiwgCiJcdTdkMDQiOiJcdTdlYTYiLCAKIlx1N2QwNSI6Ilx1N2VhMiIsIAoiXHU3ZDA2IjoiXHU3ZWExIiwgCiJcdTdkMDciOiJcdTdlYTUiLCAKIlx1N2QwOCI6Ilx1N2VhOCIsIAoiXHU3ZDA5IjoiXHU3ZWFiIiwgCiJcdTdkMGIiOiJcdTdlYjkiLCAKIlx1N2QwZCI6Ilx1N2ViMyIsIAoiXHU3ZDEwIjoiXHU3ZWJkIiwgCiJcdTdkMTMiOiJcdTdlYmUiLCAKIlx1N2QxNCI6Ilx1N2VhZiIsIAoiXHU3ZDE1IjoiXHU3ZWIwIiwgCiJcdTdkMTYiOiJcdTdlYmMiLCAKIlx1N2QxNyI6Ilx1N2ViMSIsIAoiXHU3ZDE4IjoiXHU3ZWFlIiwgCiJcdTdkMTkiOiJcdTdlYjgiLCAKIlx1N2QxYSI6Ilx1N2VhNyIsIAoiXHU3ZDFiIjoiXHU3ZWI3IiwgCiJcdTdkMWMiOiJcdTdlYWQiLCAKIlx1N2QxZCI6Ilx1N2ViNCIsIAoiXHU3ZDIxIjoiXHU3ZWJhIiwgCiJcdTdkMmMiOiJcdTQzMzciLCAKIlx1N2QyZSI6Ilx1NjI0ZSIsIAoiXHU3ZDMwIjoiXHU3ZWM2IiwgCiJcdTdkMzEiOiJcdTdlYzIiLCAKIlx1N2QzMiI6Ilx1N2VjMSIsIAoiXHU3ZDMzIjoiXHU3ZWM1IiwgCiJcdTdkMzkiOiJcdTdlY2QiLCAKIlx1N2QzYSI6Ilx1N2VjMCIsIAoiXHU3ZDNjIjoiXHU3ZWNiIiwgCiJcdTdkM2YiOiJcdTdlZDAiLCAKIlx1N2Q0MCI6Ilx1N2VjYyIsIAoiXHU3ZDQyIjoiXHU3ZWM4IiwgCiJcdTdkNDMiOiJcdTVmMjYiLCAKIlx1N2Q0NCI6Ilx1N2VjNCIsIAoiXHU3ZDQ2IjoiXHU3ZWNhIiwgCiJcdTdkNGUiOiJcdTdlZDciLCAKIlx1N2Q1MCI6Ilx1N2VkMyIsIAoiXHU3ZDU1IjoiXHU3ZWRkIiwgCiJcdTdkNWIiOiJcdTdlZTYiLCAKIlx1N2Q1ZCI6Ilx1N2VkNCIsIAoiXHU3ZDVlIjoiXHU3ZWRlIiwgCiJcdTdkNjEiOiJcdTdlZGMiLCAKIlx1N2Q2MiI6Ilx1N2VkYSIsIAoiXHU3ZDY2IjoiXHU3ZWQ5IiwgCiJcdTdkNjgiOiJcdTdlZDIiLCAKIlx1N2Q3MCI6Ilx1N2VkNiIsIAoiXHU3ZDcxIjoiXHU3ZWRmIiwgCiJcdTdkNzIiOiJcdTRlMWQiLCAKIlx1N2Q3MyI6Ilx1N2VkYiIsIAoiXHU3ZDc5IjoiXHU3ZWUyIiwgCiJcdTdkODEiOiJcdTdlZDEiLCAKIlx1N2Q4MyI6Ilx1N2VlMSIsIAoiXHU3ZDg2IjoiXHU3ZWUwIiwgCiJcdTdkODgiOiJcdTdlZTgiLCAKIlx1N2Q4ZiI6Ilx1N2VlNSIsIAoiXHU3ZDkxIjoiXHU2MzQ2IiwgCiJcdTdkOTMiOiJcdTdlY2YiLCAKIlx1N2Q5YyI6Ilx1N2VmYyIsIAoiXHU3ZDllIjoiXHU3ZjBkIiwgCiJcdTdkYTAiOiJcdTdlZmYiLCAKIlx1N2RhMiI6Ilx1N2VmOCIsIAoiXHU3ZGEzIjoiXHU3ZWZiIiwgCiJcdTdkYWIiOiJcdTdlYmYiLCAKIlx1N2RhYyI6Ilx1N2VmNiIsIAoiXHU3ZGFkIjoiXHU3ZWY0IiwgCiJcdTdkYjAiOiJcdTdlZmUiLCAKIlx1N2RiMSI6Ilx1N2ViMiIsIAoiXHU3ZGIyIjoiXHU3ZjUxIiwgCiJcdTdkYjQiOiJcdTdmMDAiLCAKIlx1N2RiNSI6Ilx1NWY2OSIsIAoiXHU3ZGI4IjoiXHU3ZWI2IiwgCiJcdTdkYjkiOiJcdTdlZmEiLCAKIlx1N2RiYSI6Ilx1N2VlZSIsIAoiXHU3ZGJiIjoiXHU3ZWZkIiwgCiJcdTdkYmQiOiJcdTdlZjAiLCAKIlx1N2RiZSI6Ilx1N2VlYiIsIAoiXHU3ZGJmIjoiXHU3ZWY1IiwgCiJcdTdkYzQiOiJcdTdlZjIiLCAKIlx1N2RjNyI6Ilx1N2YwMSIsIAoiXHU3ZGNhIjoiXHU3ZDI3IiwgCiJcdTdkY2IiOiJcdTdlZWYiLCAKIlx1N2RkMiI6Ilx1N2VlYSIsIAoiXHU3ZGQ0IjoiXHU3ZWYxIiwgCiJcdTdkZDciOiJcdTdmMDMiLCAKIlx1N2RkOCI6Ilx1N2YwNCIsIAoiXHU3ZGQ5IjoiXHU3ZjAyIiwgCiJcdTdkZGEiOiJcdTdlYmYiLCAKIlx1N2RkZCI6Ilx1N2YwOSIsIAoiXHU3ZGRlIjoiXHU3ZjBlIiwgCiJcdTdkZTAiOiJcdTdmMTQiLCAKIlx1N2RlMSI6Ilx1N2YxNyIsIAoiXHU3ZGUzIjoiXHU3ZjE4IiwgCiJcdTdkZTYiOiJcdTdmMGMiLCAKIlx1N2RlOCI6Ilx1N2YxNiIsIAoiXHU3ZGU5IjoiXHU3ZjEzIiwgCiJcdTdkZWMiOiJcdTdmMDUiLCAKIlx1N2RlZiI6Ilx1N2VhYyIsIAoiXHU3ZGYxIjoiXHU3ZjExIiwgCiJcdTdkZjIiOiJcdTdmMDgiLCAKIlx1N2RmNCI6Ilx1N2VjMyIsIAoiXHU3ZGY2IjoiXHU3ZjBmIiwgCiJcdTdkZjkiOiJcdTdmMDciLCAKIlx1N2RmYiI6Ilx1ODFmNCIsIAoiXHU3ZTA4IjoiXHU4NDI2IiwgCiJcdTdlMDkiOiJcdTdmMTkiLCAKIlx1N2UwYSI6Ilx1N2YyMiIsIAoiXHU3ZTBiIjoiXHU3ZjEyIiwgCiJcdTdlMTAiOiJcdTdlYzkiLCAKIlx1N2UxMSI6Ilx1N2YyMyIsIAoiXHU3ZTE1IjoiXHU3ZjBhIiwgCiJcdTdlMTciOiJcdTdmMWUiLCAKIlx1N2UxYSI6Ilx1N2VlNiIsIAoiXHU3ZTFiIjoiXHU3ZjFhIiwgCiJcdTdlMWQiOiJcdTdmMWMiLCAKIlx1N2UxZSI6Ilx1N2YxZiIsIAoiXHU3ZTFmIjoiXHU3ZjFiIiwgCiJcdTdlMjMiOiJcdTUzYmYiLCAKIlx1N2UyYiI6Ilx1N2YxZCIsIAoiXHU3ZTJkIjoiXHU3ZjIxIiwgCiJcdTdlMmUiOiJcdTdmMjkiLCAKIlx1N2UyZiI6Ilx1NmYxNCIsIAoiXHU3ZTMxIjoiXHU3ZWI1IiwgCiJcdTdlMzIiOiJcdTdmMjciLCAKIlx1N2UzMyI6Ilx1N2YxYSIsIAoiXHU3ZTM0IjoiXHU3ZWE0IiwgCiJcdTdlMzUiOiJcdTdmMjYiLCAKIlx1N2UzNiI6Ilx1N2Q3NyIsIAoiXHU3ZTM3IjoiXHU3ZjE1IiwgCiJcdTdlMzkiOiJcdTdmMjUiLCAKIlx1N2UzZCI6Ilx1NjAzYiIsIAoiXHU3ZTNlIjoiXHU3ZWU5IiwgCiJcdTdlNDMiOiJcdTdlZjciLCAKIlx1N2U0NSI6Ilx1N2YyYiIsIAoiXHU3ZTQ2IjoiXHU3ZjJhIiwgCiJcdTdlNDgiOiJcdTg5NDEiLCAKIlx1N2U1MiI6Ilx1N2YyZiIsIAoiXHU3ZTU0IjoiXHU3ZWM3IiwgCiJcdTdlNTUiOiJcdTdmMmUiLCAKIlx1N2U1OSI6Ilx1N2ZmYiIsIAoiXHU3ZTVhIjoiXHU3ZjJkIiwgCiJcdTdlNWUiOiJcdTdlZDUiLCAKIlx1N2U2MSI6Ilx1N2VlMyIsIAoiXHU3ZTYyIjoiXHU3ZjBiIiwgCiJcdTdlNjkiOiJcdTdlZjMiLCAKIlx1N2U2YSI6Ilx1N2VkOCIsIAoiXHU3ZTZiIjoiXHU3Y2ZiIiwgCiJcdTdlNmQiOiJcdTgzMjciLCAKIlx1N2U2ZiI6Ilx1N2YzMyIsIAoiXHU3ZTcwIjoiXHU3ZjMyIiwgCiJcdTdlNzMiOiJcdTdmMzQiLCAKIlx1N2U3OSI6Ilx1N2VjZSIsIAoiXHU3ZTdjIjoiXHU3ZWU3IiwgCiJcdTdlN2QiOiJcdTdmMjQiLCAKIlx1N2U3ZSI6Ilx1N2YzMSIsIAoiXHU3ZTg4IjoiXHU3ZjJjIiwgCiJcdTdlOGEiOiJcdTdlYTkiLCAKIlx1N2U4YyI6Ilx1N2VlZCIsIAoiXHU3ZThkIjoiXHU3ZDJmIiwgCiJcdTdlOGYiOiJcdTdmMjAiLCAKIlx1N2U5MyI6Ilx1N2YyOCIsIAoiXHU3ZTk0IjoiXHU2MjRkIiwgCiJcdTdlOTYiOiJcdTdlYTQiLCAKIlx1N2U5OCI6Ilx1N2YzNSIsIAoiXHU3ZTljIjoiXHU3ZjA2IiwgCiJcdTdmM2QiOiJcdTk0YjUiLCAKIlx1N2YzZSI6Ilx1NzRmNiIsIAoiXHU3ZjQ4IjoiXHU1NzViIiwgCiJcdTdmNGMiOiJcdTdmNDIiLCAKIlx1N2Y2NiI6Ilx1N2Y1OCIsIAoiXHU3ZjcwIjoiXHU3ZjVhIiwgCiJcdTdmNzUiOiJcdTlhODIiLCAKIlx1N2Y3NyI6Ilx1N2Y2MiIsIAoiXHU3Zjg1IjoiXHU3ZjU3IiwgCiJcdTdmODYiOiJcdTdmNzQiLCAKIlx1N2Y4OCI6Ilx1N2Y4MSIsIAoiXHU3ZjhiIjoiXHU4Mjg4IiwgCiJcdTdmYTUiOiJcdTdmOWYiLCAKIlx1N2ZhOCI6Ilx1N2ZhMSIsIAoiXHU3ZmE5IjoiXHU0ZTQ5IiwgCiJcdTdmYjYiOiJcdTgxYmIiLCAKIlx1N2ZkMiI6Ilx1NGU2MCIsIAoiXHU3ZmVjIjoiXHU3ZmRhIiwgCiJcdTdmZjkiOiJcdTdmZDgiLCAKIlx1ODAxMSI6Ilx1N2FlZiIsIAoiXHU4MDIxIjoiXHU1MmE5IiwgCiJcdTgwMjQiOiJcdTg1YzkiLCAKIlx1ODAyYyI6Ilx1ODAyNyIsIAoiXHU4MDJlIjoiXHU4MDIyIiwgCiJcdTgwNTYiOiJcdTU3MjMiLCAKIlx1ODA1ZSI6Ilx1OTVmYiIsIAoiXHU4MDZmIjoiXHU4MDU0IiwgCiJcdTgwNzAiOiJcdTgwNmEiLCAKIlx1ODA3MiI6Ilx1NThmMCIsIAoiXHU4MDczIjoiXHU4MDM4IiwgCiJcdTgwNzUiOiJcdTgwNjkiLCAKIlx1ODA3NiI6Ilx1ODA0MiIsIAoiXHU4MDc3IjoiXHU4MDRjIiwgCiJcdTgwNzkiOiJcdTgwNGQiLCAKIlx1ODA3ZCI6Ilx1NTQyYyIsIAoiXHU4MDdlIjoiXHU4MDRiIiwgCiJcdTgwODUiOiJcdTgwODMiLCAKIlx1ODA4ZiI6Ilx1NjRjZCIsIAoiXHU4MDkwIjoiXHU4MGYzIiwgCiJcdTgwYzciOiJcdTgwYmEiLCAKIlx1ODBjYSI6Ilx1NjcxMCIsIAoiXHU4MTA1IjoiXHU4MGMxIiwgCiJcdTgxMDgiOiJcdTgxMDkiLCAKIlx1ODExYiI6Ilx1ODBlYiIsIAoiXHU4MTIzIjoiXHU1NTA3IiwgCiJcdTgxMjkiOiJcdTRmZWUiLCAKIlx1ODEyYiI6Ilx1ODEzMSIsIAoiXHU4MTM5IjoiXHU4MGMwIiwgCiJcdTgxNGUiOiJcdTgwYmUiLCAKIlx1ODE1NiI6Ilx1ODBlOCIsIAoiXHU4MTYxIjoiXHU4MTM2IiwgCiJcdTgxNjYiOiJcdTgxMTEiLCAKIlx1ODE2YiI6Ilx1ODBiZiIsIAoiXHU4MTczIjoiXHU4MTFhIiwgCiJcdTgxNzgiOiJcdTgwYTAiLCAKIlx1ODE4MyI6Ilx1ODE3ZCIsIAoiXHU4MTg2IjoiXHU1NWM5IiwgCiJcdTgxOTUiOiJcdTgxNTgiLCAKIlx1ODE5YSI6Ilx1ODBhNCIsIAoiXHU4MTllIjoiXHU0M2RkIiwgCiJcdTgxYTAiOiJcdTgwZjYiLCAKIlx1ODFhOSI6Ilx1ODE3YiIsIAoiXHU4MWJkIjoiXHU4MGM2IiwgCiJcdTgxYmUiOiJcdTgxMGQiLCAKIlx1ODFiZiI6Ilx1ODExMyIsIAoiXHU4MWM5IjoiXHU4MTM4IiwgCiJcdTgxY2QiOiJcdTgxMTAiLCAKIlx1ODFjZiI6Ilx1ODE5MSIsIAoiXHU4MWQ1IjoiXHU4MTk4IiwgCiJcdTgxZDgiOiJcdTgxNGEiLCAKIlx1ODFkOSI6Ilx1ODBlZCIsIAoiXHU4MWRhIjoiXHU4MGVhIiwgCiJcdTgxZGYiOiJcdTgxMGYiLCAKIlx1ODFlMCI6Ilx1ODExNCIsIAoiXHU4MWUyIjoiXHU4MWRjIiwgCiJcdTgxZTUiOiJcdTUzNjciLCAKIlx1ODFlOCI6Ilx1NGUzNCIsIAoiXHU4MWZhIjoiXHU1M2YwIiwgCiJcdTgyMDciOiJcdTRlMGUiLCAKIlx1ODIwOCI6Ilx1NTE3NCIsIAoiXHU4MjA5IjoiXHU0ZTNlIiwgCiJcdTgyMGEiOiJcdTY1ZTciLCAKIlx1ODIwYiI6Ilx1ODg0NSIsIAoiXHU4MjE2IjoiXHU5NGZhIiwgCiJcdTgyNTkiOiJcdTgyMzEiLCAKIlx1ODI2MyI6Ilx1NmE3OSIsIAoiXHU4MjY0IjoiXHU4MjIzIiwgCiJcdTgyNjYiOiJcdTgyMzAiLCAKIlx1ODI2YiI6Ilx1ODIzYiIsIAoiXHU4MjcxIjoiXHU4MjcwIiwgCiJcdTgyNzciOiJcdTgyNzMiLCAKIlx1ODI3OCI6Ilx1ODI3OSIsIAoiXHU4MmJiIjoiXHU1MjBkIiwgCiJcdTgyZTciOiJcdTgyY2UiLCAKIlx1ODJmYSI6Ilx1ODM5MyIsIAoiXHU4MzBkIjoiXHU4MmRmIiwgCiJcdTgzMzIiOiJcdTUxNzkiLCAKIlx1ODM0NSI6Ilx1N2I1NCIsIAoiXHU4MzRhIjoiXHU4MzQ2IiwgCiJcdTgzNzMiOiJcdThjNDYiLCAKIlx1ODM4YSI6Ilx1NWU4NCIsIAoiXHU4Mzk2IjoiXHU4MzBlIiwgCiJcdTgzYTIiOiJcdTgzNWEiLCAKIlx1ODNhNyI6Ilx1ODJjYiIsIAoiXHU4M2ViIjoiXHU1ODA3IiwgCiJcdTgzZWYiOiJcdTUzNGUiLCAKIlx1ODNmNCI6Ilx1NWViNSIsIAoiXHU4NDA3IjoiXHU4MmNjIiwgCiJcdTg0MGEiOiJcdTgzYjEiLCAKIlx1ODQyYyI6Ilx1NGUwNyIsIAoiXHU4NDM1IjoiXHU4M2I0IiwgCiJcdTg0NDkiOiJcdTUzZjYiLCAKIlx1ODQ1MiI6Ilx1ODM2ZCIsIAoiXHU4NDU3IjoiXHU3NzQwIiwgCiJcdTg0NjQiOiJcdTgzNmUiLCAKIlx1ODQ2NiI6Ilx1ODJjNyIsIAoiXHU4NDZmIjoiXHU4MzZmIiwgCiJcdTg0NzciOiJcdTgzNjQiLCAKIlx1ODQ5MCI6Ilx1NjQxYyIsIAoiXHU4NDk0IjoiXHU4M2IzIiwgCiJcdTg0OWUiOiJcdTgzODUiLCAKIlx1ODRiYyI6Ilx1ODJjZCIsIAoiXHU4NGMwIjoiXHU4MzZhIiwgCiJcdTg0YzYiOiJcdTVlMmQiLCAKIlx1ODRjYiI6Ilx1NzZkNiIsIAoiXHU4NGVlIjoiXHU4M2IyIiwgCiJcdTg0ZWYiOiJcdTgyYzEiLCAKIlx1ODRmNCI6Ilx1ODNiYyIsIAoiXHU4NGZkIjoiXHU4MzVjIiwgCiJcdTg1MDYiOiJcdTgzZjEiLCAKIlx1ODUxNCI6Ilx1NTM1YyIsIAoiXHU4NTFlIjoiXHU4NDhjIiwgCiJcdTg1MjMiOiJcdTg0OGIiLCAKIlx1ODUyNSI6Ilx1ODQ3MSIsIAoiXHU4NTI2IjoiXHU4MzExIiwgCiJcdTg1MmQiOiJcdTgzNmIiLCAKIlx1ODU0MSI6Ilx1ODM2OCIsIAoiXHU4NTQ2IjoiXHU4NDg3IiwgCiJcdTg1NGUiOiJcdTgzNWUiLCAKIlx1ODU1MiI6Ilx1ODM2YyIsIAoiXHU4NTU1IjoiXHU4M2I4IiwgCiJcdTg1NTgiOiJcdTgzNWIiLCAKIlx1ODU2MiI6Ilx1ODQ4OSIsIAoiXHU4NTY5IjoiXHU4MzYxIiwgCiJcdTg1NmEiOiJcdTgyOWMiLCAKIlx1ODU2ZCI6Ilx1ODQyNyIsIAoiXHU4NTc3IjoiXHU4NGUzIiwgCiJcdTg1ODgiOiJcdTgzNWYiLCAKIlx1ODU4YSI6Ilx1ODRkZiIsIAoiXHU4NThjIjoiXHU4Mjk3IiwgCiJcdTg1OTEiOiJcdTU5ZGMiLCAKIlx1ODU5NCI6Ilx1ODUzNyIsIAoiXHU4NTk5IjoiXHU1MjQzIiwgCiJcdTg1OWYiOiJcdTgzYjYiLCAKIlx1ODVhNiI6Ilx1ODM1MCIsIAoiXHU4NWE5IjoiXHU4NDI4IiwgCiJcdTg1YmEiOiJcdTgzNjAiLCAKIlx1ODVjZCI6Ilx1ODRkZCIsIAoiXHU4NWNlIjoiXHU4MzY5IiwgCiJcdTg1ZGQiOiJcdTgyN2EiLCAKIlx1ODVlNSI6Ilx1ODM2ZiIsIAoiXHU4NWVhIjoiXHU4NWFlIiwgCiJcdTg1ZWQiOiJcdTQ0ZDYiLCAKIlx1ODVmNiI6Ilx1ODJjOCIsIAoiXHU4NWY3IjoiXHU4NWFmIiwgCiJcdTg1ZjkiOiJcdTg1M2MiLCAKIlx1ODVmYSI6Ilx1ODUzYSIsIAoiXHU4NjAwIjoiXHU4NDFhIiwgCiJcdTg2MDQiOiJcdTg1NzIiLCAKIlx1ODYwNiI6Ilx1ODJhNiIsIAoiXHU4NjA3IjoiXHU4MmNmIiwgCiJcdTg2MGEiOiJcdTg1NzQiLCAKIlx1ODYwYiI6Ilx1ODJmOSIsIAoiXHU4NjE3IjoiXHU4NjE2IiwgCiJcdTg2MWEiOiJcdTg1ZDMiLCAKIlx1ODYxZSI6Ilx1ODUzOSIsIAoiXHU4NjIyIjoiXHU4MzBmIiwgCiJcdTg2MmQiOiJcdTUxNzAiLCAKIlx1ODYzYSI6Ilx1ODRlMCIsIAoiXHU4NjNmIjoiXHU4NDFkIiwgCiJcdTg2NTUiOiJcdTU5MDQiLCAKIlx1ODY1NiI6Ilx1NTQ3YyIsIAoiXHU4NjViIjoiXHU4NjVhIiwgCiJcdTg2NWMiOiJcdTg2NGYiLCAKIlx1ODY1ZiI6Ilx1NTNmNyIsIAoiXHU4NjY3IjoiXHU0ZThmIiwgCiJcdTg2NmYiOiJcdTg2NmMiLCAKIlx1ODZmYSI6Ilx1ODZmMSIsIAoiXHU4NmZiIjoiXHU4NzE1IiwgCiJcdTg3MDYiOiJcdTg2YWMiLCAKIlx1ODczYSI6Ilx1OTcxMyIsIAoiXHU4NzU1IjoiXHU4NjgwIiwgCiJcdTg3NWYiOiJcdTczMmMiLCAKIlx1ODc2NiI6Ilx1ODY3ZSIsIAoiXHU4NzY4IjoiXHU4NjcxIiwgCiJcdTg3NzgiOiJcdTg3MTciLCAKIlx1ODc4NCI6Ilx1ODZmMyIsIAoiXHU4NzllIjoiXHU4NjgyIiwgCiJcdTg3YTIiOiJcdTg0MjQiLCAKIlx1ODdiYiI6Ilx1ODc3YyIsIAoiXHU4N2M0IjoiXHU4NmYwIiwgCiJcdTg3YzgiOiJcdTg3NDgiLCAKIlx1ODdjZSI6Ilx1ODdhOCIsIAoiXHU4N2UzIjoiXHU4NjZlIiwgCiJcdTg3ZWMiOiJcdTg3NDkiLCAKIlx1ODdlZiI6Ilx1ODZmMiIsIAoiXHU4N2YyIjoiXHU4NjZiIiwgCiJcdTg3ZjYiOiJcdTg2Y2YiLCAKIlx1ODdmYSI6Ilx1ODdlZSIsIAoiXHU4N2ZiIjoiXHU4NjgxIiwgCiJcdTg4MDUiOiJcdTg3NDciLCAKIlx1ODgwNiI6Ilx1ODY3ZiIsIAoiXHU4ODBkIjoiXHU4NzRlIiwgCiJcdTg4MTAiOiJcdTg2ZjQiLCAKIlx1ODgxMSI6Ilx1ODc3ZSIsIAoiXHU4ODE0IjoiXHU4NjlkIiwgCiJcdTg4MWYiOiJcdTg3MjEiLCAKIlx1ODgyMyI6Ilx1ODZjZSIsIAoiXHU4ODI4IjoiXHU4N2NmIiwgCiJcdTg4MzEiOiJcdTg2Y2EiLCAKIlx1ODgzNiI6Ilx1ODY5NSIsIAoiXHU4ODM3IjoiXHU4ODNjIiwgCiJcdTg4M2IiOiJcdTg2ZWUiLCAKIlx1ODg0NiI6Ilx1NGYxNyIsIAoiXHU4ODRhIjoiXHU4NTExIiwgCiJcdTg4NTIiOiJcdTcwYWIiLCAKIlx1ODg1MyI6Ilx1NjcyZiIsIAoiXHU4ODVhIjoiXHU4MGUxIiwgCiJcdTg4NWIiOiJcdTUzNmIiLCAKIlx1ODg1ZCI6Ilx1NTFiMiIsIAoiXHU4ODc5IjoiXHU1M2VhIiwgCiJcdTg4OWUiOiJcdTg4NmUiLCAKIlx1ODhhYSI6Ilx1Nzk1YiIsIAoiXHU4OGNhIjoiXHU4ODg1IiwgCiJcdTg4Y2YiOiJcdTkxY2MiLCAKIlx1ODhkYyI6Ilx1ODg2NSIsIAoiXHU4OGRkIjoiXHU4OGM1IiwgCiJcdTg4ZTEiOiJcdTkxY2MiLCAKIlx1ODhmZCI6Ilx1NTIzNiIsIAoiXHU4OTA3IjoiXHU1OTBkIiwgCiJcdTg5MGUiOiJcdTg4OTYiLCAKIlx1ODkzMiI6Ilx1ODhlNCIsIAoiXHU4OTMzIjoiXHU4OGUyIiwgCiJcdTg5MzgiOiJcdTg5MWIiLCAKIlx1ODkzYiI6Ilx1NGViNSIsIAoiXHU4OTQ5IjoiXHU4OGU1IiwgCiJcdTg5NTYiOiJcdTg4ODQiLCAKIlx1ODk1ZCI6Ilx1ODhlMyIsIAoiXHU4OTYwIjoiXHU4OGM2IiwgCiJcdTg5NjQiOiJcdTg5MzQiLCAKIlx1ODk2YSI6Ilx1ODg5YyIsIAoiXHU4OTZjIjoiXHU2NDQ2IiwgCiJcdTg5NmYiOiJcdTg4NmMiLCAKIlx1ODk3MiI6Ilx1ODhhZCIsIAoiXHU4OTdlIjoiXHU4OTdmIiwgCiJcdTg5ODgiOiJcdTY4MzgiLCAKIlx1ODk4YiI6Ilx1ODljMSIsIAoiXHU4OThlIjoiXHU4OWMzIiwgCiJcdTg5OGYiOiJcdTg5YzQiLCAKIlx1ODk5MyI6Ilx1ODljNSIsIAoiXHU4OTk2IjoiXHU4OWM2IiwgCiJcdTg5OTgiOiJcdTg5YzciLCAKIlx1ODk5YyI6Ilx1NzczYSIsIAoiXHU4OWExIjoiXHU4OWNiIiwgCiJcdTg5YTYiOiJcdTg5Y2UiLCAKIlx1ODlhYSI6Ilx1NGViMiIsIAoiXHU4OWFjIjoiXHU4OWNhIiwgCiJcdTg5YWYiOiJcdTg5Y2YiLCAKIlx1ODliMiI6Ilx1ODlkMCIsIAoiXHU4OWI3IjoiXHU4OWQxIiwgCiJcdTg5YmEiOiJcdTg5YzkiLCAKIlx1ODliZCI6Ilx1ODljOCIsIAoiXHU4OWJmIjoiXHU4OWNjIiwgCiJcdTg5YzAiOiJcdTg5YzIiLCAKIlx1ODlkNCI6Ilx1N2I0YiIsIAoiXHU4OWRkIjoiXHU2MmI1IiwgCiJcdTg5ZjQiOiJcdTg5ZGUiLCAKIlx1ODlmNiI6Ilx1ODllZiIsIAoiXHU4OWY4IjoiXHU4OWU2IiwgCiJcdThhMDIiOiJcdThiYTIiLCAKIlx1OGEwMyI6Ilx1OGJhMyIsIAoiXHU4YTA4IjoiXHU4YmExIiwgCiJcdThhMGEiOiJcdThiYWYiLCAKIlx1OGEwYyI6Ilx1OGJhNyIsIAoiXHU4YTBlIjoiXHU4YmE4IiwgCiJcdThhMTAiOiJcdThiYTYiLCAKIlx1OGExMyI6Ilx1OGJhZCIsIAoiXHU4YTE1IjoiXHU4YmFhIiwgCiJcdThhMTYiOiJcdThiYWIiLCAKIlx1OGExNyI6Ilx1NjI1OCIsIAoiXHU4YTE4IjoiXHU4YmIwIiwgCiJcdThhMWIiOiJcdThiYjkiLCAKIlx1OGExZCI6Ilx1OGJiNiIsIAoiXHU4YTFmIjoiXHU4YmJjIiwgCiJcdThhMjIiOiJcdTZiMjMiLCAKIlx1OGEyMyI6Ilx1OGJjMCIsIAoiXHU4YTI1IjoiXHU4YmI3IiwgCiJcdThhMjkiOiJcdThiYmIiLCAKIlx1OGEyYSI6Ilx1OGJiZiIsIAoiXHU4YTJkIjoiXHU4YmJlIiwgCiJcdThhMzEiOiJcdThiYjgiLCAKIlx1OGEzNCI6Ilx1OGJjOSIsIAoiXHU4YTM2IjoiXHU4YmMzIiwgCiJcdThhM2EiOiJcdThiY2EiLCAKIlx1OGEzYiI6Ilx1NmNlOCIsIAoiXHU4YTNjIjoiXHU4YmMxIiwgCiJcdThhNDEiOiJcdThiYzIiLCAKIlx1OGE0NiI6Ilx1OGJjYiIsIAoiXHU4YTRlIjoiXHU4YmI1IiwgCiJcdThhNTAiOiJcdThiYzgiLCAKIlx1OGE1MiI6Ilx1OGJkMiIsIAoiXHU4YTU0IjoiXHU4YmNmIiwgCiJcdThhNTUiOiJcdThiYzQiLCAKIlx1OGE1NyI6Ilx1OGJjNyIsIAoiXHU4YTU4IjoiXHU4YmNlIiwgCiJcdThhNWIiOiJcdThiYzUiLCAKIlx1OGE1ZSI6Ilx1OGJjZCIsIAoiXHU4YTYwIjoiXHU1NDhmIiwgCiJcdThhNjEiOiJcdThiZTkiLCAKIlx1OGE2MiI6Ilx1OGJlMiIsIAoiXHU4YTYzIjoiXHU4YmUzIiwgCiJcdThhNjYiOiJcdThiZDUiLCAKIlx1OGE2OSI6Ilx1OGJkNyIsIAoiXHU4YTZiIjoiXHU4YmU3IiwgCiJcdThhNmMiOiJcdThiZGYiLCAKIlx1OGE2ZCI6Ilx1OGJlMSIsIAoiXHU4YTZlIjoiXHU4YmUwIiwgCiJcdThhNzAiOiJcdThiZDgiLCAKIlx1OGE3MSI6Ilx1OGJkZCIsIAoiXHU4YTcyIjoiXHU4YmU1IiwgCiJcdThhNzMiOiJcdThiZTYiLCAKIlx1OGE3NSI6Ilx1OGJkYyIsIAoiXHU4YTc2IjoiXHU5MTZjIiwgCiJcdThhN2IiOiJcdTU0YWYiLCAKIlx1OGE3YyI6Ilx1OGJkOSIsIAoiXHU4YTdmIjoiXHU4YmQ2IiwgCiJcdThhODQiOiJcdThiZDQiLCAKIlx1OGE4NSI6Ilx1OGJkYiIsIAoiXHU4YTg2IjoiXHU4YmQzIiwgCiJcdThhODciOiJcdTU5MzgiLCAKIlx1OGE4YyI6Ilx1NWZkNyIsIAoiXHU4YThkIjoiXHU4YmE0IiwgCiJcdThhOTEiOiJcdThiZjMiLCAKIlx1OGE5MiI6Ilx1OGJmNiIsIAoiXHU4YTk1IjoiXHU4YmRlIiwgCiJcdThhOTgiOiJcdThiZjEiLCAKIlx1OGE5YSI6Ilx1OGJlZSIsIAoiXHU4YTllIjoiXHU4YmVkIiwgCiJcdThhYTAiOiJcdThiZGEiLCAKIlx1OGFhMSI6Ilx1OGJlYiIsIAoiXHU4YWEzIjoiXHU4YmVjIiwgCiJcdThhYTQiOiJcdThiZWYiLCAKIlx1OGFhNSI6Ilx1OGJmMCIsIAoiXHU4YWE2IjoiXHU4YmY1IiwgCiJcdThhYTgiOiJcdThiZjIiLCAKIlx1OGFhYSI6Ilx1OGJmNCIsIAoiXHU4YWFjIjoiXHU4YmY0IiwgCiJcdThhYjAiOiJcdThjMDEiLCAKIlx1OGFiMiI6Ilx1OGJmZSIsIAoiXHU4YWI2IjoiXHU4YzA3IiwgCiJcdThhYjkiOiJcdThiZmQiLCAKIlx1OGFiYyI6Ilx1OGMwYSIsIAoiXHU4YWJmIjoiXHU4YzAzIiwgCiJcdThhYzIiOiJcdThjMDQiLCAKIlx1OGFjNCI6Ilx1OGMwNiIsIAoiXHU4YWM3IjoiXHU4YzA4IiwgCiJcdThhYzkiOiJcdThiZmYiLCAKIlx1OGFjYiI6Ilx1OGJmNyIsIAoiXHU4YWNkIjoiXHU4YmU0IiwgCiJcdThhY2YiOiJcdThiZjkiLCAKIlx1OGFkMSI6Ilx1OGJmYyIsIAoiXHU4YWQyIjoiXHU4YzA1IiwgCiJcdThhZDYiOiJcdThiYmEiLCAKIlx1OGFkNyI6Ilx1OGMwMiIsIAoiXHU4YWRiIjoiXHU4YzAwIiwgCiJcdThhZGMiOiJcdThjMGQiLCAKIlx1OGFkZCI6Ilx1OGMxZSIsIAoiXHU4YWRlIjoiXHU4YzFkIiwgCiJcdThhZTAiOiJcdTU1YTciLCAKIlx1OGFlMiI6Ilx1OGJlOCIsIAoiXHU4YWU0IjoiXHU4YzE0IiwgCiJcdThhZTYiOiJcdThjMWIiLCAKIlx1OGFlNyI6Ilx1OGMxMCIsIAoiXHU4YWViIjoiXHU4YzBmIiwgCiJcdThhZWQiOiJcdThjMTUiLCAKIlx1OGFlZSI6Ilx1OGMxOCIsIAoiXHU4YWYxIjoiXHU4YmIzIiwgCiJcdThhZjMiOiJcdThjMTkiLCAKIlx1OGFmNiI6Ilx1OGMwYyIsIAoiXHU4YWY3IjoiXHU4YmJkIiwgCiJcdThhZjgiOiJcdThiZjgiLCAKIlx1OGFmYSI6Ilx1OGMxYSIsIAoiXHU4YWZjIjoiXHU4YzE2IiwgCiJcdThhZmUiOiJcdThiZmEiLCAKIlx1OGIwMCI6Ilx1OGMwYiIsIAoiXHU4YjAxIjoiXHU4YzEyIiwgCiJcdThiMDIiOiJcdThjMTMiLCAKIlx1OGIwNCI6Ilx1OGE4YSIsIAoiXHU4YjA1IjoiXHU4YmNjIiwgCiJcdThiMGEiOiJcdThjMGUiLCAKIlx1OGIwZSI6Ilx1OGMxYyIsIAoiXHU4YjEwIjoiXHU4YzI3IiwgCiJcdThiMTQiOiJcdThjMTEiLCAKIlx1OGIxNiI6Ilx1OGMyMSIsIAoiXHU4YjE3IjoiXHU4YzI0IiwgCiJcdThiMTkiOiJcdThjMjYiLCAKIlx1OGIxYSI6Ilx1OGMyNSIsIAoiXHU4YjFiIjoiXHU4YmIyIiwgCiJcdThiMWQiOiJcdThjMjIiLCAKIlx1OGIyMCI6Ilx1OGMyMyIsIAoiXHU4YjI4IjoiXHU4YzFmIiwgCiJcdThiMmIiOiJcdThjMmEiLCAKIlx1OGIyYyI6Ilx1OGMyYyIsIAoiXHU4YjMzIjoiXHU4YmI0IiwgCiJcdThiMzkiOiJcdThjMjgiLCAKIlx1OGIzYyI6Ilx1NTQ3YyIsIAoiXHU4YjNlIjoiXHU4YzI5IiwgCiJcdThiNDEiOiJcdTU0ZDciLCAKIlx1OGI0NiI6Ilx1NTYzYiIsIAoiXHU4YjQ5IjoiXHU4YmMxIiwgCiJcdThiNGUiOiJcdThjMzIiLCAKIlx1OGI0ZiI6Ilx1OGJhNSIsIAoiXHU4YjU0IjoiXHU2NGIwIiwgCiJcdThiNTYiOiJcdThjMmUiLCAKIlx1OGI1OCI6Ilx1OGJjNiIsIAoiXHU4YjU5IjoiXHU4YzJmIiwgCiJcdThiNWEiOiJcdThjMmQiLCAKIlx1OGI1YyI6Ilx1OGMzMSIsIAoiXHU4YjVmIjoiXHU1NjZhIiwgCiJcdThiNmIiOiJcdThjMzUiLCAKIlx1OGI2ZCI6Ilx1NmJjMSIsIAoiXHU4YjZmIjoiXHU4YmQxIiwgCiJcdThiNzAiOiJcdThiYWUiLCAKIlx1OGI3NCI6Ilx1OGMzNCIsIAoiXHU4Yjc3IjoiXHU2MmE0IiwgCiJcdThiN2QiOiJcdThhODkiLCAKIlx1OGI3ZSI6Ilx1OGMyYiIsIAoiXHU4YjgwIjoiXHU4YmZiIiwgCiJcdThiODUiOiJcdThjMDkiLCAKIlx1OGI4YSI6Ilx1NTNkOCIsIAoiXHU4YjhjIjoiXHU1YmI0IiwgCiJcdThiOGUiOiJcdTk2ZTAiLCAKIlx1OGI5MiI6Ilx1OGMxNyIsIAoiXHU4YjkzIjoiXHU4YmE5IiwgCiJcdThiOTUiOiJcdThjMzAiLCAKIlx1OGI5NiI6Ilx1OGMzNiIsIAoiXHU4YjlhIjoiXHU4ZDVlIiwgCiJcdThiOWMiOiJcdThjMjAiLCAKIlx1OGI5ZSI6Ilx1OGMzMyIsIAoiXHU4YzNmIjoiXHU2ZWFhIiwgCiJcdThjNDgiOiJcdTVjODIiLCAKIlx1OGM0ZSI6Ilx1N2FkNiIsIAoiXHU4YzUwIjoiXHU0ZTMwIiwgCiJcdThjNTQiOiJcdTgyNzMiLCAKIlx1OGM1NiI6Ilx1NGU4ZCIsIAoiXHU4YzZjIjoiXHU3MzJhIiwgCiJcdThjNzYiOiJcdThjNmUiLCAKIlx1OGM4ZCI6Ilx1NzJmOCIsIAoiXHU4YzkzIjoiXHU3MzJiIiwgCiJcdThjOWQiOiJcdThkMWQiLCAKIlx1OGM5ZSI6Ilx1OGQxZSIsIAoiXHU4Y2EwIjoiXHU4ZDFmIiwgCiJcdThjYTEiOiJcdThkMjIiLCAKIlx1OGNhMiI6Ilx1OGQyMSIsIAoiXHU4Y2E3IjoiXHU4ZDJiIiwgCiJcdThjYTgiOiJcdThkMjciLCAKIlx1OGNhOSI6Ilx1OGQyOSIsIAoiXHU4Y2FhIjoiXHU4ZDJhIiwgCiJcdThjYWIiOiJcdThkMmYiLCAKIlx1OGNhYyI6Ilx1OGQyMyIsIAoiXHU4Y2FmIjoiXHU4ZDJlIiwgCiJcdThjYjAiOiJcdThkMzMiLCAKIlx1OGNiMiI6Ilx1OGQ0MCIsIAoiXHU4Y2IzIjoiXHU4ZDMwIiwgCiJcdThjYjQiOiJcdThkMzUiLCAKIlx1OGNiNiI6Ilx1OGQyYyIsIAoiXHU4Y2I3IjoiXHU0ZTcwIiwgCiJcdThjYjgiOiJcdThkMzciLCAKIlx1OGNiYSI6Ilx1OGQzNiIsIAoiXHU4Y2JiIjoiXHU4ZDM5IiwgCiJcdThjYmMiOiJcdThkMzQiLCAKIlx1OGNiZCI6Ilx1OGQzYiIsIAoiXHU4Y2JmIjoiXHU4ZDM4IiwgCiJcdThjYzAiOiJcdThkM2EiLCAKIlx1OGNjMSI6Ilx1OGQzMiIsIAoiXHU4Y2MyIjoiXHU4ZDQyIiwgCiJcdThjYzMiOiJcdThkNDEiLCAKIlx1OGNjNCI6Ilx1OGQzZiIsIAoiXHU4Y2M1IjoiXHU4ZDQ1IiwgCiJcdThjYzciOiJcdThkNDQiLCAKIlx1OGNjOCI6Ilx1OGQzZSIsIAoiXHU4Y2NhIjoiXHU4ZDNjIiwgCiJcdThjZDEiOiJcdThkNDgiLCAKIlx1OGNkMiI6Ilx1OGQ0YSIsIAoiXHU4Y2QzIjoiXHU1YmJlIiwgCiJcdThjZDUiOiJcdThkNDciLCAKIlx1OGNkOSI6Ilx1OGQ1MiIsIAoiXHU4Y2RhIjoiXHU4ZDQ5IiwgCiJcdThjZGMiOiJcdThkNTAiLCAKIlx1OGNkZSI6Ilx1OGQ0ZiIsIAoiXHU4Y2UwIjoiXHU4ZDU0IiwgCiJcdThjZTEiOiJcdThkNTMiLCAKIlx1OGNlMiI6Ilx1OGQyNCIsIAoiXHU4Y2UzIjoiXHU1MzU2IiwgCiJcdThjZTQiOiJcdThkMzEiLCAKIlx1OGNlNiI6Ilx1OGQ0YiIsIAoiXHU4Y2U3IjoiXHU4ZDU1IiwgCiJcdThjZWEiOiJcdThkMjgiLCAKIlx1OGNlYyI6Ilx1OGQyNiIsIAoiXHU4Y2VkIjoiXHU4ZDRjIiwgCiJcdThjZjQiOiJcdThkNTYiLCAKIlx1OGNmNSI6Ilx1OGQ1NyIsIAoiXHU4Y2Y4IjoiXHU1MjY5IiwgCiJcdThjZmEiOiJcdThkNWEiLCAKIlx1OGNmYiI6Ilx1OGQ1OSIsIAoiXHU4Y2ZjIjoiXHU4ZDJkIiwgCiJcdThjZmQiOiJcdThkNWIiLCAKIlx1OGNmZSI6Ilx1OGQ1YyIsIAoiXHU4ZDA0IjoiXHU4ZDNkIiwgCiJcdThkMDUiOiJcdThkNTgiLCAKIlx1OGQwOCI6Ilx1OGQ2MCIsIAoiXHU4ZDBhIjoiXHU4ZDVlIiwgCiJcdThkMGIiOiJcdThkNWQiLCAKIlx1OGQwZCI6Ilx1OGQ2MSIsIAoiXHU4ZDBmIjoiXHU4ZDYyIiwgCiJcdThkMTAiOiJcdThkNDYiLCAKIlx1OGQxMyI6Ilx1OGQ0MyIsIAoiXHU4ZDE2IjoiXHU4ZDRlIiwgCiJcdThkMWIiOiJcdThkNjMiLCAKIlx1OGQ5NSI6Ilx1OGQ3NiIsIAoiXHU4ZDk5IjoiXHU4ZDc1IiwgCiJcdThkYTgiOiJcdThkOGIiLCAKIlx1OGRiMiI6Ilx1OGRiMSIsIAoiXHU4ZGUxIjoiXHU4ZmY5IiwgCiJcdThkZmMiOiJcdTVjNDAiLCAKIlx1OGUxMCI6Ilx1OGRmNSIsIAoiXHU4ZTIxIjoiXHU4NzM3IiwgCiJcdThlMmIiOiJcdTc4YjAiLCAKIlx1OGUzMCI6Ilx1OTAzZSIsIAoiXHU4ZTM0IjoiXHU4ZTBhIiwgCiJcdThlNGMiOiJcdThkYzQiLCAKIlx1OGU1NSI6Ilx1OGRmOCIsIAoiXHU4ZTVmIjoiXHU4ZmY5IiwgCiJcdThlNjAiOiJcdThkZDYiLCAKIlx1OGU2MyI6Ilx1OGU1MiIsIAoiXHU4ZTY0IjoiXHU4ZTJhIiwgCiJcdThlNjciOiJcdTdjZGYiLCAKIlx1OGU3YSI6Ilx1OGRmNyIsIAoiXHU4ZTg5IjoiXHU4ZGI4IiwgCiJcdThlOGEiOiJcdThlMGMiLCAKIlx1OGU4YiI6Ilx1OGRmYiIsIAoiXHU4ZThkIjoiXHU4ZGMzIiwgCiJcdThlOTEiOiJcdThlMmYiLCAKIlx1OGU5MiI6Ilx1OGRkZSIsIAoiXHU4ZTkzIjoiXHU4ZTJjIiwgCiJcdThlOTUiOiJcdThlNzAiLCAKIlx1OGU5YSI6Ilx1OGRmOSIsIAoiXHU4ZWExIjoiXHU4ZTUxIiwgCiJcdThlYTUiOiJcdThlN2YiLCAKIlx1OGVhNiI6Ilx1OGU5YyIsIAoiXHU4ZWFhIjoiXHU4ZThmIiwgCiJcdThlYzAiOiJcdThlYWYiLCAKIlx1OGVjYSI6Ilx1OGY2NiIsIAoiXHU4ZWNiIjoiXHU4ZjY3IiwgCiJcdThlY2MiOiJcdThmNjgiLCAKIlx1OGVjZCI6Ilx1NTE5YiIsIAoiXHU4ZWQyIjoiXHU4ZjY5IiwgCiJcdThlZDQiOiJcdThmNmIiLCAKIlx1OGVkYiI6Ilx1OGY2ZCIsIAoiXHU4ZWRmIjoiXHU4ZjZmIiwgCiJcdThlZTQiOiJcdThmNzciLCAKIlx1OGVlYiI6Ilx1OGY3OCIsIAoiXHU4ZWYyIjoiXHU4ZjcxIiwgCiJcdThlZjgiOiJcdThmNzQiLCAKIlx1OGVmOSI6Ilx1OGY3NSIsIAoiXHU4ZWZhIjoiXHU4ZjdhIiwgCiJcdThlZmIiOiJcdThmNzIiLCAKIlx1OGVmYyI6Ilx1OGY3NiIsIAoiXHU4ZWZlIjoiXHU4ZjdjIiwgCiJcdThmMDMiOiJcdThmODMiLCAKIlx1OGYwNSI6Ilx1OGY4MiIsIAoiXHU4ZjA3IjoiXHU4ZjgxIiwgCiJcdThmMDkiOiJcdThmN2QiLCAKIlx1OGYwYSI6Ilx1OGY3ZSIsIAoiXHU4ZjEyIjoiXHU4Zjg0IiwgCiJcdThmMTMiOiJcdTYzM2QiLCAKIlx1OGYxNCI6Ilx1OGY4NSIsIAoiXHU4ZjE1IjoiXHU4ZjdiIiwgCiJcdThmMWIiOiJcdThmODYiLCAKIlx1OGYxYyI6Ilx1OGY4ZSIsIAoiXHU4ZjFkIjoiXHU4Zjg5IiwgCiJcdThmMWUiOiJcdThmOGIiLCAKIlx1OGYxZiI6Ilx1OGY4ZCIsIAoiXHU4ZjI1IjoiXHU4ZjhhIiwgCiJcdThmMjYiOiJcdThmODciLCAKIlx1OGYyOSI6Ilx1OGY4OCIsIAoiXHU4ZjJhIjoiXHU4ZjZlIiwgCiJcdThmMmYiOiJcdThmOTEiLCAKIlx1OGYzMyI6Ilx1OGY4ZiIsIAoiXHU4ZjM4IjoiXHU4ZjkzIiwgCiJcdThmM2IiOiJcdThmOTAiLCAKIlx1OGYzZSI6Ilx1OGY5NyIsIAoiXHU4ZjNmIjoiXHU4MjA2IiwgCiJcdThmNDIiOiJcdTZiYzIiLCAKIlx1OGY0NCI6Ilx1OGY5NiIsIAoiXHU4ZjQ1IjoiXHU4Zjk1IiwgCiJcdThmNDYiOiJcdThmOTgiLCAKIlx1OGY0OSI6Ilx1OGY2YyIsIAoiXHU4ZjRkIjoiXHU4Zjk5IiwgCiJcdThmNGUiOiJcdThmN2YiLCAKIlx1OGY1NCI6Ilx1OGY5YSIsIAoiXHU4ZjVmIjoiXHU4ZjcwIiwgCiJcdThmNjEiOiJcdThmOTQiLCAKIlx1OGY2MiI6Ilx1OGY3OSIsIAoiXHU4ZjY0IjoiXHU4ZjczIiwgCiJcdThmYTYiOiJcdTUyOWUiLCAKIlx1OGZhZCI6Ilx1OGY5ZSIsIAoiXHU4ZmFlIjoiXHU4ZmFiIiwgCiJcdThmYWYiOiJcdThmYTkiLCAKIlx1OGZiMiI6Ilx1NTE5YyIsIAoiXHU4ZmM2IjoiXHU4ZmU0IiwgCiJcdThmZjQiOiJcdTU2ZGUiLCAKIlx1OGZmYSI6Ilx1NGU0MyIsIAoiXHU5MDE1IjoiXHU4ZmYzIiwgCiJcdTkwMTkiOiJcdThmZDkiLCAKIlx1OTAyMyI6Ilx1OGZkZSIsIAoiXHU5MDMxIjoiXHU1NDY4IiwgCiJcdTkwMzIiOiJcdThmZGIiLCAKIlx1OTA0YSI6Ilx1NmUzOCIsIAoiXHU5MDRiIjoiXHU4ZmQwIiwgCiJcdTkwNGUiOiJcdThmYzciLCAKIlx1OTA1NCI6Ilx1OGZiZSIsIAoiXHU5MDU1IjoiXHU4ZmRkIiwgCiJcdTkwNTkiOiJcdTkwNjUiLCAKIlx1OTA1YyI6Ilx1OTAwYSIsIAoiXHU5MDVlIjoiXHU5MDEyIiwgCiJcdTkwNjAiOiJcdThmZGMiLCAKIlx1OTA2OSI6Ilx1OTAwMiIsIAoiXHU5MDcyIjoiXHU4ZmRmIiwgCiJcdTkwNzciOiJcdThmYzEiLCAKIlx1OTA3OCI6Ilx1OTAwOSIsIAoiXHU5MDdhIjoiXHU5MDU3IiwgCiJcdTkwN2MiOiJcdThmYmQiLCAKIlx1OTA4MSI6Ilx1OGZjOCIsIAoiXHU5MDg0IjoiXHU4ZmQ4IiwgCiJcdTkwODciOiJcdThmZTkiLCAKIlx1OTA4YSI6Ilx1OGZiOSIsIAoiXHU5MDhmIjoiXHU5MDNiIiwgCiJcdTkwOTAiOiJcdTkwMjYiLCAKIlx1OTBkZiI6Ilx1OTBjZiIsIAoiXHU5MGY1IjoiXHU5MGFlIiwgCiJcdTkxMDYiOiJcdTkwZDMiLCAKIlx1OTEwOSI6Ilx1NGU2MSIsIAoiXHU5MTEyIjoiXHU5MGI5IiwgCiJcdTkxMTQiOiJcdTkwYWMiLCAKIlx1OTExNiI6Ilx1OTBlNyIsIAoiXHU5MTI3IjoiXHU5MDkzIiwgCiJcdTkxMmQiOiJcdTkwZDEiLCAKIlx1OTEzMCI6Ilx1OTBiYiIsIAoiXHU5MTMyIjoiXHU5MGY4IiwgCiJcdTkxMzQiOiJcdTkwYmEiLCAKIlx1OTEzNiI6Ilx1OTBkMCIsIAoiXHU5MTNhIjoiXHU5MDlkIiwgCiJcdTkxNDgiOiJcdTkwZTYiLCAKIlx1OTE1NiI6Ilx1OWUyOSIsIAoiXHU5MTgzIjoiXHU4MTRjIiwgCiJcdTkxODYiOiJcdTc2Y2YiLCAKIlx1OTE5YyI6Ilx1NGUxMSIsIAoiXHU5MTllIjoiXHU5MTVkIiwgCiJcdTkxYWIiOiJcdTUzM2IiLCAKIlx1OTFhYyI6Ilx1OTE3MSIsIAoiXHU5MWIxIjoiXHU1M2QxIiwgCiJcdTkxYmMiOiJcdTViYjQiLCAKIlx1OTFjMCI6Ilx1OTE3ZiIsIAoiXHU5MWMxIjoiXHU4ODQ1IiwgCiJcdTkxYzMiOiJcdTkxN2UiLCAKIlx1OTFjNSI6Ilx1OTE3ZCIsIAoiXHU5MWM2IjoiXHU5MWM3IiwgCiJcdTkxY2IiOiJcdTkxY2EiLCAKIlx1OTFkMCI6Ilx1NTM5OCIsIAoiXHU5MWQzIjoiXHU5NDg2IiwgCiJcdTkxZDQiOiJcdTk0ODciLCAKIlx1OTFkNSI6Ilx1OTQ4YyIsIAoiXHU5MWQ3IjoiXHU5NDhhIiwgCiJcdTkxZDgiOiJcdTk0ODkiLCAKIlx1OTFkOSI6Ilx1OTQ4YiIsIAoiXHU5MWRkIjoiXHU5NDg4IiwgCiJcdTkxZTMiOiJcdTk0OTMiLCAKIlx1OTFlNCI6Ilx1OTQ5MCIsIAoiXHU5MWU2IjoiXHU2MjYzIiwgCiJcdTkxZTciOiJcdTk0OGYiLCAKIlx1OTFlOSI6Ilx1OTQ5MiIsIAoiXHU5MWY1IjoiXHU5NDk3IiwgCiJcdTkxZjciOiJcdTk0OGQiLCAKIlx1OTFmOSI6Ilx1OTQ5NSIsIAoiXHU5MWZhIjoiXHU5NDhlIiwgCiJcdTkxZmUiOiJcdTQ5N2EiLCAKIlx1OTIwMCI6Ilx1OTRhZiIsIAoiXHU5MjAxIjoiXHU5NGFiIiwgCiJcdTkyMDMiOiJcdTk0OTgiLCAKIlx1OTIwNCI6Ilx1OTRhZCIsIAoiXHU5MjA4IjoiXHU5NDlhIiwgCiJcdTkyMDkiOiJcdTk0YTAiLCAKIlx1OTIwZCI6Ilx1OTQ5ZCIsIAoiXHU5MjEwIjoiXHU5NGE0IiwgCiJcdTkyMTEiOiJcdTk0YTMiLCAKIlx1OTIxNCI6Ilx1OTQ5ZSIsIAoiXHU5MjE1IjoiXHU5NGFlIiwgCiJcdTkyMWUiOiJcdTk0YTciLCAKIlx1OTIyMyI6Ilx1OTQ5OSIsIAoiXHU5MjI1IjoiXHU5NGFjIiwgCiJcdTkyMjYiOiJcdTk0OWIiLCAKIlx1OTIyNyI6Ilx1OTRhYSIsIAoiXHU5MjJlIjoiXHU5NGNjIiwgCiJcdTkyMzAiOiJcdTk0YzgiLCAKIlx1OTIzMyI6Ilx1OTRiNiIsIAoiXHU5MjM0IjoiXHU5NGMzIiwgCiJcdTkyMzciOiJcdTk0YjQiLCAKIlx1OTIzOCI6Ilx1OTRiOSIsIAoiXHU5MjM5IjoiXHU5NGNkIiwgCiJcdTkyM2EiOiJcdTk0YjAiLCAKIlx1OTIzZCI6Ilx1OTRiOCIsIAoiXHU5MjNlIjoiXHU5NGMwIiwgCiJcdTkyM2YiOiJcdTk0YmYiLCAKIlx1OTI0MCI6Ilx1OTRiZSIsIAoiXHU5MjQ1IjoiXHU5NDljIiwgCiJcdTkyNDYiOiJcdTk0YmIiLCAKIlx1OTI0OCI6Ilx1OTRjYSIsIAoiXHU5MjQ5IjoiXHU5NGM5IiwgCiJcdTkyNGIiOiJcdTUyMjgiLCAKIlx1OTI0ZCI6Ilx1OTRjYiIsIAoiXHU5MjUxIjoiXHU5NGMyIiwgCiJcdTkyNTUiOiJcdTk0YjciLCAKIlx1OTI1NyI6Ilx1OTRiMyIsIAoiXHU5MjVhIjoiXHU5NGM2IiwgCiJcdTkyNWIiOiJcdTk0YzUiLCAKIlx1OTI1ZSI6Ilx1OTRiYSIsIAoiXHU5MjYyIjoiXHU5NGI1IiwgCiJcdTkyNjQiOiJcdTk0YTkiLCAKIlx1OTI2NiI6Ilx1OTRiMiIsIAoiXHU5MjZjIjoiXHU5NGJjIiwgCiJcdTkyNmQiOiJcdTk0YmQiLCAKIlx1OTI3NiI6Ilx1OTRjZiIsIAoiXHU5Mjc4IjoiXHU5NGYwIiwgCiJcdTkyN2EiOiJcdTk0ZDIiLCAKIlx1OTI3YiI6Ilx1OTRlYyIsIAoiXHU5MjdmIjoiXHU5NGVhIiwgCiJcdTkyODAiOiJcdTk0ZjYiLCAKIlx1OTI4MyI6Ilx1OTRmMyIsIAoiXHU5Mjg1IjoiXHU5NGRjIiwgCiJcdTkyOTEiOiJcdTk0ZTMiLCAKIlx1OTI5MyI6Ilx1OTRlOCIsIAoiXHU5Mjk2IjoiXHU5NGUyIiwgCiJcdTkyOTgiOiJcdTk0ZWQiLCAKIlx1OTI5YSI6Ilx1OTRlYiIsIAoiXHU5MjljIjoiXHU4ODU0IiwgCiJcdTkyYTAiOiJcdTk0ZDEiLCAKIlx1OTJhMyI6Ilx1OTRmNyIsIAoiXHU5MmE1IjoiXHU5NGYxIiwgCiJcdTkyYTYiOiJcdTk0ZGYiLCAKIlx1OTJhOCI6Ilx1OTRmNSIsIAoiXHU5MmE5IjoiXHU5NGU1IiwgCiJcdTkyYWEiOiJcdTk0ZDUiLCAKIlx1OTJhYiI6Ilx1OTRlZiIsIAoiXHU5MmFjIjoiXHU5NGQwIiwgCiJcdTkyYjEiOiJcdTk0ZGUiLCAKIlx1OTJiMiI6Ilx1NzEwYSIsIAoiXHU5MmIzIjoiXHU5NTEwIiwgCiJcdTkyYjciOiJcdTk1MDAiLCAKIlx1OTJiOSI6Ilx1OTUwOCIsIAoiXHU5MmJiIjoiXHU5NTExIiwgCiJcdTkyYmMiOiJcdTk1MDkiLCAKIlx1OTJjMSI6Ilx1OTRkZCIsIAoiXHU5MmMzIjoiXHU5NTEyIiwgCiJcdTkyYzUiOiJcdTk1MGMiLCAKIlx1OTJjNyI6Ilx1OTRhMSIsIAoiXHU5MmNjIjoiXHU5NGU0IiwgCiJcdTkyY2YiOiJcdTk0ZDciLCAKIlx1OTJkMiI6Ilx1OTUwYiIsIAoiXHU5MmRkIjoiXHU5NTBhIiwgCiJcdTkyZGYiOiJcdTk1MTMiLCAKIlx1OTJlMyI6Ilx1OTRkOCIsIAoiXHU5MmU0IjoiXHU5NTA0IiwgCiJcdTkyZTUiOiJcdTk1MDMiLCAKIlx1OTJlNiI6Ilx1OTUxNCIsIAoiXHU5MmU4IjoiXHU5NTA3IiwgCiJcdTkyZTkiOiJcdTk0ZDMiLCAKIlx1OTJlYSI6Ilx1OTRmYSIsIAoiXHU5MmVlIjoiXHU5NGQ2IiwgCiJcdTkyZWYiOiJcdTk1MDYiLCAKIlx1OTJmMCI6Ilx1OTUwMiIsIAoiXHU5MmYxIjoiXHU5NGZkIiwgCiJcdTkyZjYiOiJcdTk1MGQiLCAKIlx1OTJmOCI6Ilx1OTUyZiIsIAoiXHU5MmZiIjoiXHU5Mjc0IiwgCiJcdTkyZmMiOiJcdTk0YTIiLCAKIlx1OTMwMSI6Ilx1OTUxZSIsIAoiXHU5MzA0IjoiXHU1ZjU1IiwgCiJcdTkzMDYiOiJcdTk1MTYiLCAKIlx1OTMwNyI6Ilx1OTUyYiIsIAoiXHU5MzA4IjoiXHU5NTI5IiwgCiJcdTkzMTAiOiJcdTk1MjUiLCAKIlx1OTMxMiI6Ilx1OTUxNSIsIAoiXHU5MzE1IjoiXHU5NTFmIiwgCiJcdTkzMTgiOiJcdTk1MjQiLCAKIlx1OTMxOSI6Ilx1OTUzMSIsIAoiXHU5MzFhIjoiXHU5NGVlIiwgCiJcdTkzMWIiOiJcdTk1MWIiLCAKIlx1OTMxZiI6Ilx1OTUyYyIsIAoiXHU5MzIwIjoiXHU5NTJkIiwgCiJcdTkzMjIiOiJcdTk0YjEiLCAKIlx1OTMyNiI6Ilx1OTUyNiIsIAoiXHU5MzI4IjoiXHU5NTFhIiwgCiJcdTkzMmIiOiJcdTk1MjEiLCAKIlx1OTMyZSI6Ilx1OTUyMiIsIAoiXHU5MzJmIjoiXHU5NTE5IiwgCiJcdTkzMzMiOiJcdTk1MzAiLCAKIlx1OTMzNiI6Ilx1ODg2OCIsIAoiXHU5MzM4IjoiXHU5NGZjIiwgCiJcdTkzNDAiOiJcdTk1MWQiLCAKIlx1OTM0MSI6Ilx1OTUyOCIsIAoiXHU5MzQzIjoiXHU5NTJhIiwgCiJcdTkzNDYiOiJcdTk0OTQiLCAKIlx1OTM0NyI6Ilx1OTUzNCIsIAoiXHU5MzRhIjoiXHU3MGJjIiwgCiJcdTkzNGIiOiJcdTk1MDUiLCAKIlx1OTM0ZCI6Ilx1OTU0MCIsIAoiXHU5MzU0IjoiXHU5NTM3IiwgCiJcdTkzNTgiOiJcdTk0ZTEiLCAKIlx1OTM1YSI6Ilx1OTQ5NiIsIAoiXHU5MzViIjoiXHU5NTNiIiwgCiJcdTkzNjQiOiJcdTk1MzgiLCAKIlx1OTM2NSI6Ilx1OTUzMiIsIAoiXHU5MzY5IjoiXHU5NTE4IiwgCiJcdTkzNmMiOiJcdTk1MzkiLCAKIlx1OTM3MCI6Ilx1OTUzZSIsIAoiXHU5Mzc1IjoiXHU5NTJlIiwgCiJcdTkzNzYiOiJcdTk1MzYiLCAKIlx1OTM3YSI6Ilx1OTUxNyIsIAoiXHU5MzdjIjoiXHU5NDg4IiwgCiJcdTkzN2UiOiJcdTk0OWYiLCAKIlx1OTM4MiI6Ilx1OTU0MSIsIAoiXHU5Mzg0IjoiXHU5NTNmIiwgCiJcdTkzODciOiJcdTk1NDUiLCAKIlx1OTM4YSI6Ilx1OTU1MSIsIAoiXHU5MzhjIjoiXHU5NTcwIiwgCiJcdTkzOTQiOiJcdTk1NTUiLCAKIlx1OTM5NiI6Ilx1OTUwMSIsIAoiXHU5Mzk3IjoiXHU2N2FhIiwgCiJcdTkzOTgiOiJcdTk1NDkiLCAKIlx1OTM5YSI6Ilx1OTUyNCIsIAoiXHU5M2ExIjoiXHU5NTQzIiwgCiJcdTkzYTIiOiJcdTk0YTgiLCAKIlx1OTNhMyI6Ilx1ODRlNSIsIAoiXHU5M2E2IjoiXHU5NTRmIiwgCiJcdTkzYTciOiJcdTk0ZTAiLCAKIlx1OTNhOSI6Ilx1OTRlOSIsIAoiXHU5M2FhIjoiXHU5NTNjIiwgCiJcdTkzYWMiOiJcdTk1NTAiLCAKIlx1OTNhZSI6Ilx1OTU0NyIsIAoiXHU5M2IwIjoiXHU5NTUyIiwgCiJcdTkzYjMiOiJcdTk1NGQiLCAKIlx1OTNiNSI6Ilx1OTU1MyIsIAoiXHU5M2JmIjoiXHU5NTRlIiwgCiJcdTkzYzMiOiJcdTk1NWUiLCAKIlx1OTNjNyI6Ilx1OTU1ZiIsIAoiXHU5M2M4IjoiXHU5NGZlIiwgCiJcdTkzY2MiOiJcdTk1NDYiLCAKIlx1OTNjZCI6Ilx1OTU1OSIsIAoiXHU5M2QxIjoiXHU5NTVkIiwgCiJcdTkzZDciOiJcdTk0ZmYiLCAKIlx1OTNkOCI6Ilx1OTUzNSIsIAoiXHU5M2RjIjoiXHU5NTU3IiwgCiJcdTkzZGQiOiJcdTk1NTgiLCAKIlx1OTNkZSI6Ilx1OTU1YiIsIAoiXHU5M2RmIjoiXHU5NGYyIiwgCiJcdTkzZTEiOiJcdTk1NWMiLCAKIlx1OTNlMiI6Ilx1OTU1NiIsIAoiXHU5M2U0IjoiXHU5NTQyIiwgCiJcdTkzZTgiOiJcdTkzM2UiLCAKIlx1OTNmMCI6Ilx1OTU1YSIsIAoiXHU5M2Y1IjoiXHU5NGU3IiwgCiJcdTkzZjciOiJcdTk1NjQiLCAKIlx1OTNmOSI6Ilx1OTU2YSIsIAoiXHU5M2ZhIjoiXHU0OTdkIiwgCiJcdTkzZmQiOiJcdTk1MDgiLCAKIlx1OTQwMyI6Ilx1OTRkOSIsIAoiXHU5NDA5IjoiXHU5NGUzIiwgCiJcdTk0MGIiOiJcdTk0ZjQiLCAKIlx1OTQxMCI6Ilx1OTU2MyIsIAoiXHU5NDEyIjoiXHU5NGY5IiwgCiJcdTk0MTMiOiJcdTk1NjYiLCAKIlx1OTQxNCI6Ilx1OTU2MSIsIAoiXHU5NDE4IjoiXHU5NDlmIiwgCiJcdTk0MTkiOiJcdTk1NmIiLCAKIlx1OTQxZCI6Ilx1OTU2MiIsIAoiXHU5NDIwIjoiXHU5NTY4IiwgCiJcdTk0MjUiOiJcdTQ5ODUiLCAKIlx1OTQyNiI6Ilx1OTUwZSIsIAoiXHU5NDI3IjoiXHU5NTBmIiwgCiJcdTk0MjgiOiJcdTk1NDQiLCAKIlx1OTQyYiI6Ilx1OTU0YyIsIAoiXHU5NDJlIjoiXHU5NTcwIiwgCiJcdTk0MmYiOiJcdTQ5ODMiLCAKIlx1OTQzMiI6Ilx1OTU2ZiIsIAoiXHU5NDMzIjoiXHU5NTZkIiwgCiJcdTk0MzUiOiJcdTk0YzEiLCAKIlx1OTQzNiI6Ilx1OTU2ZSIsIAoiXHU5NDM4IjoiXHU5NGNlIiwgCiJcdTk0M2EiOiJcdTk0ZGIiLCAKIlx1OTQzZiI6Ilx1OTU3MSIsIAoiXHU5NDQ0IjoiXHU5NGY4IiwgCiJcdTk0NGEiOiJcdTk1NmMiLCAKIlx1OTQ0YyI6Ilx1OTU1NCIsIAoiXHU5NDUxIjoiXHU5Mjc0IiwgCiJcdTk0NTIiOiJcdTkyNzQiLCAKIlx1OTQ1NCI6Ilx1OTU3MiIsIAoiXHU5NDU1IjoiXHU5NTI3IiwgCiJcdTk0NWUiOiJcdTk1NzQiLCAKIlx1OTQ2MCI6Ilx1OTRjNCIsIAoiXHU5NDYzIjoiXHU5NTczIiwgCiJcdTk0NjQiOiJcdTUyMjgiLCAKIlx1OTQ2NSI6Ilx1OTU2NSIsIAoiXHU5NDZhIjoiXHU3MDg5IiwgCiJcdTk0NmQiOiJcdTk1NjciLCAKIlx1OTQ3MCI6Ilx1OTRhNSIsIAoiXHU5NDcyIjoiXHU5NTc2IiwgCiJcdTk0NzUiOiJcdTdmNTAiLCAKIlx1OTQ3NyI6Ilx1OTU0YSIsIAoiXHU5NDc5IjoiXHU5NTY5IiwgCiJcdTk0N2MiOiJcdTk1MjMiLCAKIlx1OTQ3ZCI6Ilx1OTRiYiIsIAoiXHU5NDdlIjoiXHU5MmFlIiwgCiJcdTk0N2YiOiJcdTUxZmYiLCAKIlx1OTQ4MSI6Ilx1NDk4NiIsIAoiXHU5NDgyIjoiXHU5NTRiIiwgCiJcdTk1NzciOiJcdTk1N2YiLCAKIlx1OTU4MCI6Ilx1OTVlOCIsIAoiXHU5NTgyIjoiXHU5NWU5IiwgCiJcdTk1ODMiOiJcdTk1ZWEiLCAKIlx1OTU4NiI6Ilx1OTVlYiIsIAoiXHU5NTg5IjoiXHU5NWVkIiwgCiJcdTk1OGIiOiJcdTVmMDAiLCAKIlx1OTU4YyI6Ilx1OTVmNiIsIAoiXHU5NThlIjoiXHU5NWYzIiwgCiJcdTk1OGYiOiJcdTk1ZjAiLCAKIlx1OTU5MSI6Ilx1OTVmMiIsIAoiXHU5NTkyIjoiXHU5NWYyIiwgCiJcdTk1OTMiOiJcdTk1ZjQiLCAKIlx1OTU5NCI6Ilx1OTVmNSIsIAoiXHU5NTk4IjoiXHU5NWY4IiwgCiJcdTk1YTEiOiJcdTk2MDIiLCAKIlx1OTVhMyI6Ilx1OTYwMSIsIAoiXHU5NWE0IjoiXHU1NDA4IiwgCiJcdTk1YTUiOiJcdTk2MDAiLCAKIlx1OTVhOCI6Ilx1OTVmYSIsIAoiXHU5NWE5IjoiXHU5NWZkIiwgCiJcdTk1YWIiOiJcdTk2MDMiLCAKIlx1OTVhYyI6Ilx1OTYwNiIsIAoiXHU5NWFkIjoiXHU5NWZlIiwgCiJcdTk1YjEiOiJcdTk2MDUiLCAKIlx1OTViNiI6Ilx1OTYwYSIsIAoiXHU5NWI5IjoiXHU5NjA5IiwgCiJcdTk1YmIiOiJcdTk2MGUiLCAKIlx1OTViYyI6Ilx1OTYwZiIsIAoiXHU5NWJkIjoiXHU5NjBkIiwgCiJcdTk1YmUiOiJcdTk2MDgiLCAKIlx1OTViZiI6Ilx1OTYwYyIsIAoiXHU5NWMzIjoiXHU5NjEyIiwgCiJcdTk1YzYiOiJcdTY3N2YiLCAKIlx1OTVjNyI6Ilx1NjY5NyIsIAoiXHU5NWM4IjoiXHU5NWYxIiwgCiJcdTk1Y2EiOiJcdTk2MTQiLCAKIlx1OTVjYiI6Ilx1OTYxNSIsIAoiXHU5NWNjIjoiXHU5NjExIiwgCiJcdTk1ZDAiOiJcdTk2MTciLCAKIlx1OTVkMyI6Ilx1OTVmZiIsIAoiXHU5NWQ0IjoiXHU5NjE2IiwgCiJcdTk1ZDUiOiJcdTk2MTkiLCAKIlx1OTVkNiI6Ilx1OTVlZiIsIAoiXHU5NWRjIjoiXHU1MTczIiwgCiJcdTk1ZGUiOiJcdTk2MWEiLCAKIlx1OTVlMSI6Ilx1OTYxMCIsIAoiXHU5NWUyIjoiXHU4ZjlmIiwgCiJcdTk1ZTUiOiJcdTk1ZmMiLCAKIlx1OTYyOCI6Ilx1NTM4NCIsIAoiXHU5NjJjIjoiXHU1NzUxIiwgCiJcdTk2MmYiOiJcdTU3NDAiLCAKIlx1OTY0ZiI6Ilx1OTY4YiIsIAoiXHU5NjU4IjoiXHU5NjQ5IiwgCiJcdTk2NWQiOiJcdTk2NTUiLCAKIlx1OTY1ZSI6Ilx1NTM0NyIsIAoiXHU5NjYzIjoiXHU5NjM1IiwgCiJcdTk2NzAiOiJcdTk2MzQiLCAKIlx1OTY3MyI6Ilx1OTY0OCIsIAoiXHU5Njc4IjoiXHU5NjQ2IiwgCiJcdTk2N2QiOiJcdTk2MzMiLCAKIlx1OTY4NCI6Ilx1NTgyNCIsIAoiXHU5Njg5IjoiXHU5NjY3IiwgCiJcdTk2OGEiOiJcdTk2MWYiLCAKIlx1OTY4ZSI6Ilx1OTYzNiIsIAoiXHU5Njk1IjoiXHU5NjY4IiwgCiJcdTk2OWIiOiJcdTk2NDUiLCAKIlx1OTZhNCI6Ilx1OTg5MyIsIAoiXHU5NmE4IjoiXHU5NjhmIiwgCiJcdTk2YWEiOiJcdTk2NjkiLCAKIlx1OTZiMSI6Ilx1OTY5MCIsIAoiXHU5NmI0IjoiXHU5NjQ3IiwgCiJcdTk2YjgiOiJcdTk2YjYiLCAKIlx1OTZiYiI6Ilx1NTNlYSIsIAoiXHU5NmNiIjoiXHU5NmJkIiwgCiJcdTk2ZDYiOiJcdTg2N2QiLCAKIlx1OTZkOSI6Ilx1NTNjYyIsIAoiXHU5NmRiIjoiXHU5NmNmIiwgCiJcdTk2ZGMiOiJcdTY3NDIiLCAKIlx1OTZkZSI6Ilx1OWUyMSIsIAoiXHU5NmUyIjoiXHU3OWJiIiwgCiJcdTk2ZTMiOiJcdTk2YmUiLCAKIlx1OTZmMiI6Ilx1NGU5MSIsIAoiXHU5NmZiIjoiXHU3NTM1IiwgCiJcdTk3MjQiOiJcdTZlOWMiLCAKIlx1OTcyNyI6Ilx1OTZmZSIsIAoiXHU5NzNkIjoiXHU5NzAxIiwgCiJcdTk3NDIiOiJcdTk2ZjMiLCAKIlx1OTc0NCI6Ilx1OTcyZCIsIAoiXHU5NzQ2IjoiXHU1M2M3IiwgCiJcdTk3NDgiOiJcdTcwNzUiLCAKIlx1OTc0OSI6Ilx1NTNjNiIsIAoiXHU5NzVhIjoiXHU5NzUzIiwgCiJcdTk3NWMiOiJcdTk3NTkiLCAKIlx1OTc2NiI6Ilx1ODE3YyIsIAoiXHU5NzY4IjoiXHU5NzY1IiwgCiJcdTk3OGYiOiJcdTVkZTkiLCAKIlx1OTdhNiI6Ilx1NzljYiIsIAoiXHU5N2MxIjoiXHU3ZjMwIiwgCiJcdTk3YzMiOiJcdTk3OTEiLCAKIlx1OTdjNiI6Ilx1NTM0MyIsIAoiXHU5N2M5IjoiXHU5N2FmIiwgCiJcdTk3Y2IiOiJcdTk3ZTYiLCAKIlx1OTdjYyI6Ilx1OTdlNyIsIAoiXHU5N2NkIjoiXHU5N2U4IiwgCiJcdTk3ZDMiOiJcdTk3ZTkiLCAKIlx1OTdkOSI6Ilx1OTdlYSIsIAoiXHU5N2RjIjoiXHU5N2VjIiwgCiJcdTk3ZGUiOiJcdTk3ZWIiLCAKIlx1OTdmYiI6Ilx1OTdmNSIsIAoiXHU5N2ZmIjoiXHU1NGNkIiwgCiJcdTk4MDEiOiJcdTk4NzUiLCAKIlx1OTgwMiI6Ilx1OTg3NiIsIAoiXHU5ODAzIjoiXHU5ODc3IiwgCiJcdTk4MDUiOiJcdTk4NzkiLCAKIlx1OTgwNiI6Ilx1OTg3YSIsIAoiXHU5ODA3IjoiXHU5ODc4IiwgCiJcdTk4MDgiOiJcdTk4N2IiLCAKIlx1OTgwYSI6Ilx1OTg3YyIsIAoiXHU5ODBjIjoiXHU5ODgyIiwgCiJcdTk4MGUiOiJcdTk4ODAiLCAKIlx1OTgwZiI6Ilx1OTg4MyIsIAoiXHU5ODEwIjoiXHU5ODg0IiwgCiJcdTk4MTEiOiJcdTk4N2QiLCAKIlx1OTgxMiI6Ilx1OTg4MSIsIAoiXHU5ODEzIjoiXHU5ODdmIiwgCiJcdTk4MTciOiJcdTk4ODciLCAKIlx1OTgxOCI6Ilx1OTg4NiIsIAoiXHU5ODFjIjoiXHU5ODhjIiwgCiJcdTk4MjEiOiJcdTk4ODkiLCAKIlx1OTgyNCI6Ilx1OTg5MCIsIAoiXHU5ODI2IjoiXHU5ODhmIiwgCiJcdTk4MmIiOiJcdTRmZWYiLCAKIlx1OTgyZCI6Ilx1NTkzNCIsIAoiXHU5ODMwIjoiXHU5ODhhIiwgCiJcdTk4MzIiOiJcdTk4OGIiLCAKIlx1OTgzNyI6Ilx1OTg5NCIsIAoiXHU5ODM4IjoiXHU5ODg4IiwgCiJcdTk4MzkiOiJcdTk4OTMiLCAKIlx1OTgzYiI6Ilx1OTg5MSIsIAoiXHU5ODQ2IjoiXHU5ODk3IiwgCiJcdTk4NGMiOiJcdTk4OTgiLCAKIlx1OTg0ZCI6Ilx1OTg5ZCIsIAoiXHU5ODRlIjoiXHU4MTZkIiwgCiJcdTk4NGYiOiJcdTk4OWMiLCAKIlx1OTg1MiI6Ilx1OTg5OSIsIAoiXHU5ODUzIjoiXHU5ODliIiwgCiJcdTk4NTQiOiJcdTk4OWMiLCAKIlx1OTg1OCI6Ilx1NjEzZiIsIAoiXHU5ODU5IjoiXHU5OGExIiwgCiJcdTk4NWIiOiJcdTk4YTAiLCAKIlx1OTg1ZSI6Ilx1N2M3YiIsIAoiXHU5ODYyIjoiXHU5ODlmIiwgCiJcdTk4NjUiOiJcdTk4YTIiLCAKIlx1OTg2NyI6Ilx1OTg3ZSIsIAoiXHU5ODZiIjoiXHU5OGE0IiwgCiJcdTk4NmMiOiJcdTk4YTUiLCAKIlx1OTg2ZiI6Ilx1NjYzZSIsIAoiXHU5ODcwIjoiXHU5OGE2IiwgCiJcdTk4NzEiOiJcdTk4ODUiLCAKIlx1OTg3MyI6Ilx1OTg5ZSIsIAoiXHU5ODc0IjoiXHU5OGE3IiwgCiJcdTk4YTgiOiJcdTk4Y2UiLCAKIlx1OThhZSI6Ilx1OThkMSIsIAoiXHU5OGFmIjoiXHU5OGQyIiwgCiJcdTk4YjEiOiJcdTUzZjAiLCAKIlx1OThiMyI6Ilx1NTIyZSIsIAoiXHU5OGI2IjoiXHU5OGQzIiwgCiJcdTk4YjgiOiJcdTk4ZDQiLCAKIlx1OThiYSI6Ilx1NjI2YyIsIAoiXHU5OGJjIjoiXHU5OGQ1IiwgCiJcdTk4YzAiOiJcdTk4ZDciLCAKIlx1OThjNCI6Ilx1OThkOCIsIAoiXHU5OGM2IjoiXHU5OGQ5IiwgCiJcdTk4YzgiOiJcdTk4ZGEiLCAKIlx1OThkYiI6Ilx1OThkZSIsIAoiXHU5OGUyIjoiXHU5OTY1IiwgCiJcdTk4ZTUiOiJcdTk5NjYiLCAKIlx1OThlOSI6Ilx1OTk2OCIsIAoiXHU5OGVhIjoiXHU5OTZhIiwgCiJcdTk4ZWIiOiJcdTk5NmIiLCAKIlx1OThlZCI6Ilx1OTk2YyIsIAoiXHU5OGVmIjoiXHU5OTZkIiwgCiJcdTk4ZjIiOiJcdTk5NmUiLCAKIlx1OThmNCI6Ilx1OTk3NCIsIAoiXHU5OGZjIjoiXHU5OTcyIiwgCiJcdTk4ZmQiOiJcdTk5NzEiLCAKIlx1OThmZSI6Ilx1OTk3MCIsIAoiXHU5OGZmIjoiXHU5OTczIiwgCiJcdTk5MDMiOiJcdTk5N2EiLCAKIlx1OTkwNCI6Ilx1OTk3OCIsIAoiXHU5OTA1IjoiXHU5OTdjIiwgCiJcdTk5MDgiOiJcdTdjY2QiLCAKIlx1OTkwOSI6Ilx1OTk3NyIsIAoiXHU5OTBhIjoiXHU1MTdiIiwgCiJcdTk5MGMiOiJcdTk5NzUiLCAKIlx1OTkwZSI6Ilx1OTk3OSIsIAoiXHU5OTBmIjoiXHU5OTdiIiwgCiJcdTk5MTEiOiJcdTk5N2QiLCAKIlx1OTkxMiI6Ilx1OTk4MSIsIAoiXHU5OTEzIjoiXHU5OTdmIiwgCiJcdTk5MTQiOiJcdTU0ZmEiLCAKIlx1OTkxOCI6Ilx1NGY1OSIsIAoiXHU5OTFhIjoiXHU4MGI0IiwgCiJcdTk5MWIiOiJcdTk5ODQiLCAKIlx1OTkxYyI6Ilx1OTk4MyIsIAoiXHU5OTFlIjoiXHU5OTZmIiwgCiJcdTk5MjEiOiJcdTk5ODUiLCAKIlx1OTkyOCI6Ilx1OTk4NiIsIAoiXHU5OTJjIjoiXHU3Y2NhIiwgCiJcdTk5MzEiOiJcdTdjYzciLCAKIlx1OTkzMyI6Ilx1OTk2NyIsIAoiXHU5OTM1IjoiXHU1NTgyIiwgCiJcdTk5MzYiOiJcdTk5ODkiLCAKIlx1OTkzNyI6Ilx1OTk4NyIsIAoiXHU5OTNhIjoiXHU5OThlIiwgCiJcdTk5M2MiOiJcdTk5NjkiLCAKIlx1OTkzZCI6Ilx1OTk4OCIsIAoiXHU5OTNlIjoiXHU5OThmIiwgCiJcdTk5M2YiOiJcdTk5OGEiLCAKIlx1OTk0MyI6Ilx1OTk4ZCIsIAoiXHU5OTQ1IjoiXHU5OTkyIiwgCiJcdTk5NDgiOiJcdTk5OTAiLCAKIlx1OTk0OSI6Ilx1OTk5MSIsIAoiXHU5OTRhIjoiXHU5OTkzIiwgCiJcdTk5NGIiOiJcdTk5ODgiLCAKIlx1OTk0YyI6Ilx1OTk5NCIsIAoiXHU5OTUxIjoiXHU5OTY1IiwgCiJcdTk5NTIiOiJcdTk5NzYiLCAKIlx1OTk1NyI6Ilx1OThlOCIsIAoiXHU5OTVjIjoiXHU5OTBkIiwgCiJcdTk5NWUiOiJcdTk5OGIiLCAKIlx1OTk1ZiI6Ilx1OTk5NSIsIAoiXHU5OWFjIjoiXHU5YTZjIiwgCiJcdTk5YWQiOiJcdTlhNmQiLCAKIlx1OTlhZSI6Ilx1NTFhZiIsIAoiXHU5OWIxIjoiXHU5YTZlIiwgCiJcdTk5YjMiOiJcdTlhNzAiLCAKIlx1OTliNCI6Ilx1OWE2ZiIsIAoiXHU5OWMxIjoiXHU5YTczIiwgCiJcdTk5ZDAiOiJcdTlhN2IiLCAKIlx1OTlkMSI6Ilx1OWE3ZCIsIAoiXHU5OWQyIjoiXHU5YTc5IiwgCiJcdTk5ZDQiOiJcdTlhNzUiLCAKIlx1OTlkNSI6Ilx1OWE3ZSIsIAoiXHU5OWQ4IjoiXHU5YTgwIiwgCiJcdTk5ZDkiOiJcdTlhNzgiLCAKIlx1OTlkYiI6Ilx1OWE3NiIsIAoiXHU5OWRkIjoiXHU5YTdjIiwgCiJcdTk5ZGYiOiJcdTlhNzciLCAKIlx1OTllMiI6Ilx1OWE4OCIsIAoiXHU5OWVkIjoiXHU5YTg3IiwgCiJcdTk5ZWUiOiJcdTlhNzMiLCAKIlx1OTlmMSI6Ilx1OWE4NiIsIAoiXHU5OWY4IjoiXHU5YThlIiwgCiJcdTk5ZmYiOiJcdTlhOGYiLCAKIlx1OWEwMSI6Ilx1OWE4YiIsIAoiXHU5YTAzIjoiXHU1NDQ2IiwgCiJcdTlhMDUiOiJcdTlhOTMiLCAKIlx1OWEwZCI6Ilx1OWE5MiIsIAoiXHU5YTBlIjoiXHU5YTkxIiwgCiJcdTlhMGYiOiJcdTlhOTAiLCAKIlx1OWExNiI6Ilx1OWE5YiIsIAoiXHU5YTE5IjoiXHU5YTk3IiwgCiJcdTlhMjMiOiJcdTliMDMiLCAKIlx1OWEyYiI6Ilx1OWE5ZSIsIAoiXHU5YTJkIjoiXHU5YTk4IiwgCiJcdTlhMmUiOiJcdTlhOWQiLCAKIlx1OWEzMCI6Ilx1ODE3ZSIsIAoiXHU5YTM2IjoiXHU5YTdhIiwgCiJcdTlhMzciOiJcdTlhOWEiLCAKIlx1OWEzOCI6Ilx1OWE5ZiIsIAoiXHU5YTNlIjoiXHU5YWExIiwgCiJcdTlhNDAiOiJcdTg0ZTYiLCAKIlx1OWE0MSI6Ilx1OWE5YyIsIAoiXHU5YTQyIjoiXHU5YTk2IiwgCiJcdTlhNDMiOiJcdTlhYTAiLCAKIlx1OWE0NCI6Ilx1OWFhMiIsIAoiXHU5YTQ1IjoiXHU5YTcxIiwgCiJcdTlhNGEiOiJcdTlhODUiLCAKIlx1OWE0ZCI6Ilx1OWE4MSIsIAoiXHU5YTRmIjoiXHU5YWEzIiwgCiJcdTlhNTUiOiJcdTlhODQiLCAKIlx1OWE1NyI6Ilx1OWE4YyIsIAoiXHU5YTVhIjoiXHU2MGNhIiwgCiJcdTlhNWIiOiJcdTlhN2YiLCAKIlx1OWE1ZiI6Ilx1OWFhNCIsIAoiXHU5YTYyIjoiXHU5YTc0IiwgCiJcdTlhNjQiOiJcdTlhYTciLCAKIlx1OWE2NSI6Ilx1OWFhNSIsIAoiXHU5YTZhIjoiXHU5YThhIiwgCiJcdTlhYWYiOiJcdTgwYWUiLCAKIlx1OWFjZiI6Ilx1OWFjNSIsIAoiXHU5YWQyIjoiXHU4MTBmIiwgCiJcdTlhZDQiOiJcdTRmNTMiLCAKIlx1OWFkNSI6Ilx1OWFjYyIsIAoiXHU5YWQ2IjoiXHU5YWNiIiwgCiJcdTlhZTMiOiJcdTRlZmYiLCAKIlx1OWFlZSI6Ilx1NTNkMSIsIAoiXHU5YjA2IjoiXHU2NzdlIiwgCiJcdTliMGQiOiJcdTgwZTEiLCAKIlx1OWIxYSI6Ilx1OTg3YiIsIAoiXHU5YjIyIjoiXHU5YjEzIiwgCiJcdTliMjUiOiJcdTY1OTciLCAKIlx1OWIyNyI6Ilx1OTVmOSIsIAoiXHU5YjI4IjoiXHU1NGM0IiwgCiJcdTliMjkiOiJcdTk2MGIiLCAKIlx1OWIyZSI6Ilx1OTYwNCIsIAoiXHU5YjMxIjoiXHU5MGMxIiwgCiJcdTliNGUiOiJcdTliNDkiLCAKIlx1OWI1OCI6Ilx1OWI0NyIsIAoiXHU5YjVhIjoiXHU5YzdjIiwgCiJcdTliNWIiOiJcdTljN2QiLCAKIlx1OWI2OCI6Ilx1OGM1YSIsIAoiXHU5YjZmIjoiXHU5YzgxIiwgCiJcdTliNzQiOiJcdTljODIiLCAKIlx1OWI3NyI6Ilx1OWM3ZiIsIAoiXHU5YjgxIjoiXHU5Yzg1IiwgCiJcdTliODMiOiJcdTljODYiLCAKIlx1OWI4ZCI6Ilx1OWM4ZiIsIAoiXHU5YjkwIjoiXHU5YzkwIiwgCiJcdTliOTEiOiJcdTljOGQiLCAKIlx1OWI5MiI6Ilx1OWM4YiIsIAoiXHU5YjkzIjoiXHU5YzhhIiwgCiJcdTliOWEiOiJcdTljOTIiLCAKIlx1OWI5ZSI6Ilx1OWM5NSIsIAoiXHU5YmEzIjoiXHU0YzlmIiwgCiJcdTliYTYiOiJcdTljOTYiLCAKIlx1OWJhYSI6Ilx1OWM5NCIsIAoiXHU5YmFiIjoiXHU5YzliIiwgCiJcdTliYWQiOiJcdTljOTEiLCAKIlx1OWJhZSI6Ilx1OWM5YyIsIAoiXHU5YmJhIjoiXHU5YzlkIiwgCiJcdTliYzAiOiJcdTljYTciLCAKIlx1OWJjMSI6Ilx1OWNhMCIsIAoiXHU5YmM3IjoiXHU5Y2E5IiwgCiJcdTliYzkiOiJcdTljYTQiLCAKIlx1OWJjYSI6Ilx1OWNhOCIsIAoiXHU5YmQ0IjoiXHU5Y2JiIiwgCiJcdTliZDYiOiJcdTljYWQiLCAKIlx1OWJkNyI6Ilx1OWM5ZSIsIAoiXHU5YmRiIjoiXHU5Y2I3IiwgCiJcdTliZGQiOiJcdTljYjQiLCAKIlx1OWJlMSI6Ilx1OWNiMSIsIAoiXHU5YmUyIjoiXHU5Y2I1IiwgCiJcdTliZTQiOiJcdTljYjIiLCAKIlx1OWJlNyI6Ilx1OWNiMyIsIAoiXHU5YmU4IjoiXHU5Y2I4IiwgCiJcdTliZWEiOiJcdTljYWUiLCAKIlx1OWJlYiI6Ilx1OWNiMCIsIAoiXHU5YmYwIjoiXHU5Yzg3IiwgCiJcdTliZjQiOiJcdTljYmEiLCAKIlx1OWJmZCI6Ilx1OWNhYiIsIAoiXHU5YmZmIjoiXHU5Y2NhIiwgCiJcdTljMDIiOiJcdTljOTciLCAKIlx1OWMwOCI6Ilx1OWNiZCIsIAoiXHU5YzA5IjoiXHU5Y2M3IiwgCiJcdTljMGMiOiJcdTRjYTEiLCAKIlx1OWMwZCI6Ilx1OWNjNSIsIAoiXHU5YzEyIjoiXHU5Y2M2IiwgCiJcdTljMTMiOiJcdTljYzMiLCAKIlx1OWMxYiI6Ilx1OWNjMSIsIAoiXHU5YzFjIjoiXHU5Y2QyIiwgCiJcdTljMWYiOiJcdTljZDEiLCAKIlx1OWMyMCI6Ilx1OWNjYiIsIAoiXHU5YzIzIjoiXHU5Y2E1IiwgCiJcdTljMjUiOiJcdTljY2YiLCAKIlx1OWMyNyI6Ilx1NGNhMiIsIAoiXHU5YzI4IjoiXHU5Y2NlIiwgCiJcdTljMjkiOiJcdTljZDAiLCAKIlx1OWMyZCI6Ilx1OWNjZCIsIAoiXHU5YzMxIjoiXHU5Y2EyIiwgCiJcdTljMzIiOiJcdTljY2MiLCAKIlx1OWMzMyI6Ilx1OWNkMyIsIAoiXHU5YzM1IjoiXHU5Y2Q4IiwgCiJcdTljMzciOiJcdTljYTYiLCAKIlx1OWMzOSI6Ilx1OWNhMyIsIAoiXHU5YzNiIjoiXHU5Y2Q3IiwgCiJcdTljM2MiOiJcdTljZGIiLCAKIlx1OWMzZSI6Ilx1OWNkNCIsIAoiXHU5YzQ1IjoiXHU5Y2Q5IiwgCiJcdTljNDgiOiJcdTljZDUiLCAKIlx1OWM0OSI6Ilx1OWNkNiIsIAoiXHU5YzUyIjoiXHU5Y2RmIiwgCiJcdTljNTQiOiJcdTljZGQiLCAKIlx1OWM1NiI6Ilx1OWNkYyIsIAoiXHU5YzU3IjoiXHU5Y2RlIiwgCiJcdTljNTgiOiJcdTljOWYiLCAKIlx1OWM1ZCI6Ilx1OWNiYyIsIAoiXHU5YzVmIjoiXHU5YzhlIiwgCiJcdTljNjAiOiJcdTljOTkiLCAKIlx1OWM2MyI6Ilx1OWNlMyIsIAoiXHU5YzY3IjoiXHU5Y2UyIiwgCiJcdTljNjgiOiJcdTljYmYiLCAKIlx1OWM2ZCI6Ilx1OWM5YSIsIAoiXHU5Yzc3IjoiXHU5Y2M0IiwgCiJcdTljNzgiOiJcdTljODgiLCAKIlx1OWM3YSI6Ilx1OWNhMSIsIAoiXHU5Y2U1IjoiXHU5ZTFmIiwgCiJcdTljZTciOiJcdTUxZWIiLCAKIlx1OWNlOSI6Ilx1OWUyMCIsIAoiXHU5Y2YzIjoiXHU1MWU0IiwgCiJcdTljZjQiOiJcdTllMjMiLCAKIlx1OWNmNiI6Ilx1OWUyMiIsIAoiXHU5Y2ZlIjoiXHU0ZDEzIiwgCiJcdTlkMDYiOiJcdTllMjkiLCAKIlx1OWQwNyI6Ilx1OWUyOCIsIAoiXHU5ZDA4IjoiXHU5NmMxIiwgCiJcdTlkMDkiOiJcdTllMjYiLCAKIlx1OWQxMiI6Ilx1OWUzMCIsIAoiXHU5ZDE1IjoiXHU5ZTM1IiwgCiJcdTlkMWIiOiJcdTllMzMiLCAKIlx1OWQxZCI6Ilx1OWUzMiIsIAoiXHU5ZDFlIjoiXHU5ZTJlIiwgCiJcdTlkMWYiOiJcdTllMzEiLCAKIlx1OWQyMyI6Ilx1OWUyYSIsIAoiXHU5ZDI2IjoiXHU5ZTJmIiwgCiJcdTlkMjgiOiJcdTllMmQiLCAKIlx1OWQyZiI6Ilx1OWUzOCIsIAoiXHU5ZDMwIjoiXHU5ZTM5IiwgCiJcdTlkMzQiOiJcdTllM2IiLCAKIlx1OWQzNyI6Ilx1NGQxNSIsIAoiXHU5ZDNiIjoiXHU5ZTNmIiwgCiJcdTlkM2YiOiJcdTllM2QiLCAKIlx1OWQ0MSI6Ilx1NGQxNCIsIAoiXHU5ZDQyIjoiXHU5ZTNhIiwgCiJcdTlkNDMiOiJcdTllM2MiLCAKIlx1OWQ1MSI6Ilx1OWU0MyIsIAoiXHU5ZDUyIjoiXHU5ZTQ2IiwgCiJcdTlkNTMiOiJcdTllNDEiLCAKIlx1OWQ1YyI6Ilx1OWU0OCIsIAoiXHU5ZDVkIjoiXHU5ZTQ1IiwgCiJcdTlkNjAiOiJcdTllNDQiLCAKIlx1OWQ2MSI6Ilx1OWU0OSIsIAoiXHU5ZDZhIjoiXHU5ZTRjIiwgCiJcdTlkNmMiOiJcdTllNGYiLCAKIlx1OWQ2ZSI6Ilx1OWU1MCIsIAoiXHU5ZDZmIjoiXHU5ZTRlIiwgCiJcdTlkNzAiOiJcdTk2ZDUiLCAKIlx1OWQ3MiI6Ilx1OWU0YSIsIAoiXHU5ZDg0IjoiXHU0ZDE2IiwgCiJcdTlkODciOiJcdTllMmIiLCAKIlx1OWQ4OSI6Ilx1OWU1MSIsIAoiXHU5ZDhhIjoiXHU5ZTUyIiwgCiJcdTlkOGYiOiJcdTllMjEiLCAKIlx1OWQ5MyI6Ilx1OWU0YiIsIAoiXHU5ZDk2IjoiXHU5ZTU5IiwgCiJcdTlkOTgiOiJcdTllNTUiLCAKIlx1OWQ5YSI6Ilx1OWU1NyIsIAoiXHU5ZGExIjoiXHU5ZTU2IiwgCiJcdTlkYTUiOiJcdTllNWIiLCAKIlx1OWRhOSI6Ilx1OWU1YyIsIAoiXHU5ZGFhIjoiXHU0ZDE3IiwgCiJcdTlkYWMiOiJcdTllMjciLCAKIlx1OWRhZiI6Ilx1ODNiYSIsIAoiXHU5ZGIxIjoiXHU5YTllIiwgCiJcdTlkYjQiOiJcdTllNjQiLCAKIlx1OWRiYSI6Ilx1OWU2MSIsIAoiXHU5ZGJiIjoiXHU5ZTU4IiwgCiJcdTlkYmMiOiJcdTllNjMiLCAKIlx1OWRiZiI6Ilx1OWU1YSIsIAoiXHU5ZGMyIjoiXHU5ZTVlIiwgCiJcdTlkYzkiOiJcdTRkMTgiLCAKIlx1OWRkMyI6Ilx1OWU2NyIsIAoiXHU5ZGQ2IjoiXHU5ZTY1IiwgCiJcdTlkZDciOiJcdTllMjUiLCAKIlx1OWRkOSI6Ilx1OWUzNyIsIAoiXHU5ZGRhIjoiXHU5ZTY4IiwgCiJcdTlkZTUiOiJcdTllMzYiLCAKIlx1OWRlNiI6Ilx1OWU2YSIsIAoiXHU5ZGVmIjoiXHU5ZTY5IiwgCiJcdTlkZjAiOiJcdTcxZDUiLCAKIlx1OWRmMiI6Ilx1OWU2YiIsIAoiXHU5ZGYzIjoiXHU5ZTQ3IiwgCiJcdTlkZjQiOiJcdTllNDciLCAKIlx1OWRmOCI6Ilx1OWU2YyIsIAoiXHU5ZGY5IjoiXHU5ZTcwIiwgCiJcdTlkZmEiOiJcdTllNmQiLCAKIlx1OWUwNyI6Ilx1OWU2ZiIsIAoiXHU5ZTBhIjoiXHU0ZDE5IiwgCiJcdTllMGMiOiJcdTllNzEiLCAKIlx1OWUxNSI6Ilx1OWUyYyIsIAoiXHU5ZTFhIjoiXHU5ZTY2IiwgCiJcdTllMWIiOiJcdTllNzMiLCAKIlx1OWUxZCI6Ilx1OWU0MiIsIAoiXHU5ZTFlIjoiXHU5ZTNlIiwgCiJcdTllNzUiOiJcdTUzNjQiLCAKIlx1OWU3OSI6Ilx1NTRiOCIsIAoiXHU5ZTdhIjoiXHU5ZTdlIiwgCiJcdTllN2MiOiJcdTc4NzciLCAKIlx1OWU3ZCI6Ilx1NzZkMCIsIAoiXHU5ZTk3IjoiXHU0ZTNkIiwgCiJcdTllYTUiOiJcdTllYTYiLCAKIlx1OWVhOSI6Ilx1OWViOCIsIAoiXHU5ZWI1IjoiXHU5NzYyIiwgCiJcdTllYmMiOiJcdTRlNDgiLCAKIlx1OWVjMyI6Ilx1OWVjNCIsIAoiXHU5ZWNjIjoiXHU5ZWM5IiwgCiJcdTllZGUiOiJcdTcwYjkiLCAKIlx1OWVlOCI6Ilx1NTE1YSIsIAoiXHU5ZWYyIjoiXHU5ZWVhIiwgCiJcdTllZjQiOiJcdTk3MDkiLCAKIlx1OWVmNiI6Ilx1OWVlMSIsIAoiXHU5ZWY3IjoiXHU5ZWU5IiwgCiJcdTllZmQiOiJcdTllZmUiLCAKIlx1OWVmZiI6Ilx1OWYwYiIsIAoiXHU5ZjA3IjoiXHU5Y2NjIiwgCiJcdTlmMDkiOiJcdTlmMGQiLCAKIlx1OWYxNSI6Ilx1NTFhYyIsIAoiXHU5ZjM0IjoiXHU5ZjM5IiwgCiJcdTlmNGEiOiJcdTlmNTAiLCAKIlx1OWY0YiI6Ilx1NjU4YiIsIAoiXHU5ZjRlIjoiXHU4ZDRkIiwgCiJcdTlmNGYiOiJcdTlmNTEiLCAKIlx1OWY1MiI6Ilx1OWY3ZiIsIAoiXHU5ZjU0IjoiXHU5ZjgwIiwgCiJcdTlmNTkiOiJcdTlmODUiLCAKIlx1OWY1YyI6Ilx1OWY4NyIsIAoiXHU5ZjVmIjoiXHU5ZjgzIiwgCiJcdTlmNjAiOiJcdTlmODYiLCAKIlx1OWY2MSI6Ilx1OWY4NCIsIAoiXHU5ZjYzIjoiXHU1MWZhIiwgCiJcdTlmNjYiOiJcdTlmODgiLCAKIlx1OWY2NyI6Ilx1NTU2ZSIsIAoiXHU5ZjZhIjoiXHU5ZjhhIiwgCiJcdTlmNmMiOiJcdTlmODkiLCAKIlx1OWY3MiI6Ilx1OWY4YiIsIAoiXHU5Zjc2IjoiXHU4MTZkIiwgCiJcdTlmNzciOiJcdTlmOGMiLCAKIlx1OWY4ZCI6Ilx1OWY5OSIsIAoiXHU5ZjkwIjoiXHU1ZTllIiwgCiJcdTlmOTEiOiJcdTRkYWUiLCAKIlx1OWY5NCI6Ilx1OWY5YSIsIAoiXHU5Zjk1IjoiXHU5ZjliIiwgCiJcdTlmOWMiOiJcdTlmOWYiLCAKIlx1ZmEwYyI6Ilx1NTE0MCIsIAoiXHVmZTMwIjoiXHUyMjM2IiwgCiJcdWZlMzEiOiJcdWZmNWMiLCAKIlx1ZmUzMyI6Ilx1ZmY1YyIsIAoiXHVmZTNmIjoiXHUyMjI3IiwgCiJcdWZlNDAiOiJcdTIyMjgiLCAKIlx1ZmU1MCI6Ilx1ZmYwYyIsIAoiXHVmZTUxIjoiXHUzMDAxIiwgCiJcdWZlNTIiOiJcdWZmMGUiLCAKIlx1ZmU1NCI6Ilx1ZmYxYiIsIAoiXHVmZTU1IjoiXHVmZjFhIiwgCiJcdWZlNTYiOiJcdWZmMWYiLCAKIlx1ZmU1NyI6Ilx1ZmYwMSIsIAoiXHVmZTU5IjoiXHVmZjA4IiwgCiJcdWZlNWEiOiJcdWZmMDkiLCAKIlx1ZmU1YiI6Ilx1ZmY1YiIsIAoiXHVmZTVjIjoiXHVmZjVkIiwgCiJcdWZlNWQiOiJcdWZmM2IiLCAKIlx1ZmU1ZSI6Ilx1ZmYzZCIsIAoiXHVmZTVmIjoiXHVmZjAzIiwgCiJcdWZlNjAiOiJcdWZmMDYiLCAKIlx1ZmU2MSI6Ilx1ZmYwYSIsIAoiXHVmZTYyIjoiXHVmZjBiIiwgCiJcdWZlNjMiOiJcdWZmMGQiLCAKIlx1ZmU2NCI6Ilx1ZmYxYyIsIAoiXHVmZTY1IjoiXHVmZjFlIiwgCiJcdWZlNjYiOiJcdWZmMWQiLCAKIlx1ZmU2OSI6Ilx1ZmYwNCIsIAoiXHVmZTZhIjoiXHVmZjA1IiwgCiJcdWZlNmIiOiJcdWZmMjAiCn07CgpmdW5jdGlvbiB0b1NpbXAoaXR4dCl7Cgl2YXIgemhtYXAgPSBUb25nV2VuLnRfMl9zOwoJCQoJaXR4dCA9IGl0eHQucmVwbGFjZSgvW15ceDAwLVx4RkZdL2csICBmdW5jdGlvbihzKXsJCQkKCQkJcmV0dXJuICgocyBpbiB6aG1hcCk/emhtYXBbc106cyk7CgkJfQoJKTsKCXJldHVybiAJaXR4dDsKfQoKZnVuY3Rpb24gY29udmVydF9zaW1wKCl7Cgl2YXIgY3VyRG9jID0gd2luZG93LmRvY3VtZW50OwkKCWlmIChjdXJEb2MuZXZhbHVhdGUpewoJCS8vdmFyIHhwciA9ICcvL3RleHQoKVtzdHJpbmctbGVuZ3RoKG5vcm1hbGl6ZS1zcGFjZSguKSk+MF1bbmFtZSguLikhPSJTQ1JJUFQiXVtuYW1lKC4uKSE9IlNUWUxFIl0nOwoJCXZhciB4cHIgPSAnLy90ZXh0KClbbm9ybWFsaXplLXNwYWNlKC4pXVtuYW1lKC4uKSE9IlNDUklQVCJdW25hbWUoLi4pIT0iU1RZTEUiXSc7CgkJCgkJdmFyIHRleHRub2RlcyA9IGN1ckRvYy5ldmFsdWF0ZSh4cHIsIGN1ckRvYywgIG51bGwsIFhQYXRoUmVzdWx0LlVOT1JERVJFRF9OT0RFX1NOQVBTSE9UX1RZUEUsICBudWxsKTsKCQl2YXIgdGV4dG5vZGVzX2xlbmd0aCA9IHRleHRub2Rlcy5zbmFwc2hvdExlbmd0aDsKCQkvL3ZhciBjdXJOb2RlID0gbnVsbDsKCgkJZm9yICh2YXIgaT0wLCBuPXRleHRub2Rlc19sZW5ndGgsIHRleHROb2RlcyA9IHRleHRub2RlczsgaTxuOyArK2kpIHsKCQkJdmFyIGN1ck5vZGUgPSB0ZXh0Tm9kZXMuc25hcHNob3RJdGVtKGkpOwoJCQkKCQkJLy9pZiAoL1teXHgyMC1ceEZGXSsvLnRlc3QoY3VyTm9kZS5kYXRhKSl7CgkJCS8vaWYgKC8ldS8udGVzdChlc2NhcGUoY3VyTm9kZS5kYXRhKSkpewoJCQkJY3VyTm9kZS5kYXRhID0gdG9TaW1wKGN1ck5vZGUuZGF0YSk7CgkJCS8vfQoJCX0JCQoJfWVsc2UgewoJCXdpbmRvdy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IHRvVHJhZCh3aW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpOwoJfQp9Cgpjb252ZXJ0X3NpbXAoKTs=";
		}
	}, {
		label: "簡轉繁",
		command: function(event) {
			content.document.documentElement.appendChild(content.document.createElement("script")).src = "data:application/javascript;base64,dmFyIFRvbmdXZW4gPSB7fTsNClRvbmdXZW4uc18yX3QgPSB7DQoiXHUwMGI3IjoiXHUyMDI3IiwgDQoiXHUyMDE1IjoiXHUyNTAwIiwgDQoiXHUyMDE2IjoiXHUyMjI1IiwgDQoiXHUyMDE4IjoiXHUzMDBlIiwgDQoiXHUyMDE5IjoiXHUzMDBmIiwgDQoiXHUyMDFjIjoiXHUzMDBjIiwgDQoiXHUyMDFkIjoiXHUzMDBkIiwgDQoiXHUyMDMzIjoiXHUzMDFlIiwgDQoiXHUyMjBmIjoiXHUwM2EwIiwgDQoiXHUyMjExIjoiXHUwM2EzIiwgDQoiXHUyMjI3IjoiXHVmZTNmIiwgDQoiXHUyMjI4IjoiXHVmZTQwIiwgDQoiXHUyMjM2IjoiXHVmZTMwIiwgDQoiXHUyMjQ4IjoiXHUyMjUyIiwgDQoiXHUyMjY0IjoiXHUyMjY2IiwgDQoiXHUyMjY1IjoiXHUyMjY3IiwgDQoiXHUyNTAxIjoiXHUyNTAwIiwgDQoiXHUyNTAzIjoiXHUyNTAyIiwgDQoiXHUyNTBmIjoiXHUyNTBjIiwgDQoiXHUyNTEzIjoiXHUyNTEwIiwgDQoiXHUyNTE3IjoiXHUyNTE0IiwgDQoiXHUyNTFiIjoiXHUyNTE4IiwgDQoiXHUyNTIzIjoiXHUyNTFjIiwgDQoiXHUyNTJiIjoiXHUyNTI0IiwgDQoiXHUyNTMzIjoiXHUyNTJjIiwgDQoiXHUyNTNiIjoiXHUyNTM0IiwgDQoiXHUyNTRiIjoiXHUyNTNjIiwgDQoiXHUzMDE2IjoiXHUzMDEwIiwgDQoiXHUzMDE3IjoiXHUzMDExIiwgDQoiXHUzNDQ3IjoiXHUzNDczIiwgDQoiXHUzNTllIjoiXHU1NThlIiwgDQoiXHUzNjBlIjoiXHUzNjFhIiwgDQoiXHUzOTE4IjoiXHUzOTZlIiwgDQoiXHUzOWNmIjoiXHU2Mzg2IiwgDQoiXHUzOWQwIjoiXHUzYTczIiwgDQoiXHUzOWRmIjoiXHU2NGQzIiwgDQoiXHUzYjRlIjoiXHU2OGUxIiwgDQoiXHUzY2UwIjoiXHU2ZmJlIiwgDQoiXHU0MDU2IjoiXHU3NzljIiwgDQoiXHU0MTVmIjoiXHU3YTQ3IiwgDQoiXHU0MzM3IjoiXHU3ZDJjIiwgDQoiXHU0M2FjIjoiXHU0M2IxIiwgDQoiXHU0M2RkIjoiXHU4MTllIiwgDQoiXHU0NGQ2IjoiXHU4NWVkIiwgDQoiXHU0NjRjIjoiXHU0NjYxIiwgDQoiXHU0NzIzIjoiXHU4YTIyIiwgDQoiXHU0NzI5IjoiXHU4YjhjIiwgDQoiXHU0NzhkIjoiXHU0NzdjIiwgDQoiXHU0OTdhIjoiXHU5MWZlIiwgDQoiXHU0OTdkIjoiXHU5M2ZhIiwgDQoiXHU0OTgyIjoiXHU0OTQ3IiwgDQoiXHU0OTgzIjoiXHU5NDJmIiwgDQoiXHU0OTg1IjoiXHU5NDI1IiwgDQoiXHU0OTg2IjoiXHU5NDgxIiwgDQoiXHU0OWI2IjoiXHU0OTliIiwgDQoiXHU0OWI3IjoiXHU0OTlmIiwgDQoiXHU0YzlmIjoiXHU5YmEzIiwgDQoiXHU0Y2ExIjoiXHU5YzBjIiwgDQoiXHU0Y2EyIjoiXHU5YzI3IiwgDQoiXHU0Y2EzIjoiXHU0Yzc3IiwgDQoiXHU0ZDEzIjoiXHU5Y2ZlIiwgDQoiXHU0ZDE0IjoiXHU5ZDQxIiwgDQoiXHU0ZDE1IjoiXHU5ZDM3IiwgDQoiXHU0ZDE2IjoiXHU5ZDg0IiwgDQoiXHU0ZDE3IjoiXHU5ZGFhIiwgDQoiXHU0ZDE4IjoiXHU5ZGM5IiwgDQoiXHU0ZDE5IjoiXHU5ZTBhIiwgDQoiXHU0ZGFlIjoiXHU5ZjkxIiwgDQoiXHU0ZTA3IjoiXHU4NDJjIiwgDQoiXHU0ZTBlIjoiXHU4MjA3IiwgDQoiXHU0ZTEzIjoiXHU1YzA4IiwgDQoiXHU0ZTFhIjoiXHU2OTZkIiwgDQoiXHU0ZTFiIjoiXHU1M2UyIiwgDQoiXHU0ZTFjIjoiXHU2NzcxIiwgDQoiXHU0ZTFkIjoiXHU3ZDcyIiwgDQoiXHU0ZTIyIjoiXHU0ZTFmIiwgDQoiXHU0ZTI0IjoiXHU1MTY5IiwgDQoiXHU0ZTI1IjoiXHU1NmI0IiwgDQoiXHU0ZTI3IjoiXHU1NWFhIiwgDQoiXHU0ZTJhIjoiXHU1MDBiIiwgDQoiXHU0ZTMwIjoiXHU4YzUwIiwgDQoiXHU0ZTM0IjoiXHU4MWU4IiwgDQoiXHU0ZTNhIjoiXHU3MGJhIiwgDQoiXHU0ZTNkIjoiXHU5ZTk3IiwgDQoiXHU0ZTNlIjoiXHU4MjA5IiwgDQoiXHU0ZTQ4IjoiXHU5ZWJjIiwgDQoiXHU0ZTQ5IjoiXHU3ZmE5IiwgDQoiXHU0ZTRjIjoiXHU3MGNmIiwgDQoiXHU0ZTUwIjoiXHU2YTAyIiwgDQoiXHU0ZTU0IjoiXHU1NWFjIiwgDQoiXHU0ZTYwIjoiXHU3ZmQyIiwgDQoiXHU0ZTYxIjoiXHU5MTA5IiwgDQoiXHU0ZTY2IjoiXHU2NmY4IiwgDQoiXHU0ZTcwIjoiXHU4Y2I3IiwgDQoiXHU0ZTcxIjoiXHU0ZTgyIiwgDQoiXHU0ZTg5IjoiXHU3MjJkIiwgDQoiXHU0ZThlIjoiXHU2NWJjIiwgDQoiXHU0ZThmIjoiXHU4NjY3IiwgDQoiXHU0ZTkxIjoiXHU5NmYyIiwgDQoiXHU0ZTk4IjoiXHU0ZTk5IiwgDQoiXHU0ZTlhIjoiXHU0ZTllIiwgDQoiXHU0ZWE3IjoiXHU3NTIyIiwgDQoiXHU0ZWE5IjoiXHU3NTVkIiwgDQoiXHU0ZWIyIjoiXHU4OWFhIiwgDQoiXHU0ZWI1IjoiXHU4OTNiIiwgDQoiXHU0ZWJmIjoiXHU1MTA0IiwgDQoiXHU0ZWM1IjoiXHU1MGM1IiwgDQoiXHU0ZWM2IjoiXHU1MGQ1IiwgDQoiXHU0ZWNlIjoiXHU1ZjllIiwgDQoiXHU0ZWQxIjoiXHU0Zjk2IiwgDQoiXHU0ZWQzIjoiXHU1MDA5IiwgDQoiXHU0ZWVhIjoiXHU1MTAwIiwgDQoiXHU0ZWVjIjoiXHU1MDExIiwgDQoiXHU0ZWY3IjoiXHU1MGY5IiwgDQoiXHU0ZjE3IjoiXHU3NzNlIiwgDQoiXHU0ZjE4IjoiXHU1MTJhIiwgDQoiXHU0ZjFhIjoiXHU2NzAzIiwgDQoiXHU0ZjFiIjoiXHU1MGI0IiwgDQoiXHU0ZjFlIjoiXHU1MDk4IiwgDQoiXHU0ZjFmIjoiXHU1MDQ5IiwgDQoiXHU0ZjIwIjoiXHU1MGIzIiwgDQoiXHU0ZjI0IjoiXHU1MGI3IiwgDQoiXHU0ZjI1IjoiXHU1MDAwIiwgDQoiXHU0ZjI2IjoiXHU1MDJiIiwgDQoiXHU0ZjI3IjoiXHU1MDk2IiwgDQoiXHU0ZjJhIjoiXHU1MDdkIiwgDQoiXHU0ZjJiIjoiXHU0ZjQ3IiwgDQoiXHU0ZjMyIjoiXHU0ZjYwIiwgDQoiXHU0ZjUzIjoiXHU5YWQ0IiwgDQoiXHU0ZjYzIjoiXHU1MGFkIiwgDQoiXHU0ZjY1IjoiXHU1MGM5IiwgDQoiXHU0ZmEwIjoiXHU0ZmUwIiwgDQoiXHU0ZmEzIjoiXHU0ZmI2IiwgDQoiXHU0ZmE1IjoiXHU1MGU1IiwgDQoiXHU0ZmE2IjoiXHU1MDc1IiwgDQoiXHU0ZmE3IjoiXHU1MDc0IiwgDQoiXHU0ZmE4IjoiXHU1MGQxIiwgDQoiXHU0ZmE5IjoiXHU1MTA4IiwgDQoiXHU0ZmFhIjoiXHU1MTE1IiwgDQoiXHU0ZmFjIjoiXHU1MTAyIiwgDQoiXHU0ZmUzIjoiXHU0ZmMxIiwgDQoiXHU0ZmU2IjoiXHU1MTE0IiwgDQoiXHU0ZmU4IjoiXHU1MTNjIiwgDQoiXHU0ZmU5IjoiXHU1MDA2IiwgDQoiXHU0ZmVhIjoiXHU1MTM3IiwgDQoiXHU0ZmVkIjoiXHU1MTA5IiwgDQoiXHU1MDJlIjoiXHU4OGY4IiwgDQoiXHU1MDNhIjoiXHU1MGI1IiwgDQoiXHU1MDNlIjoiXHU1MGJlIiwgDQoiXHU1MDZjIjoiXHU1MGFmIiwgDQoiXHU1MDdiIjoiXHU1MGMyIiwgDQoiXHU1MDdlIjoiXHU1MGU4IiwgDQoiXHU1MDdmIjoiXHU1MTFmIiwgDQoiXHU1MGE1IjoiXHU1MTNiIiwgDQoiXHU1MGE3IjoiXHU1MTEwIiwgDQoiXHU1MGE4IjoiXHU1MTMyIiwgDQoiXHU1MGE5IjoiXHU1MTNhIiwgDQoiXHU1MTNmIjoiXHU1MTUyIiwgDQoiXHU1MTUxIjoiXHU1MTRjIiwgDQoiXHU1MTU2IjoiXHU1MTU3IiwgDQoiXHU1MTVhIjoiXHU5ZWU4IiwgDQoiXHU1MTcwIjoiXHU4NjJkIiwgDQoiXHU1MTczIjoiXHU5NWRjIiwgDQoiXHU1MTc0IjoiXHU4MjA4IiwgDQoiXHU1MTc5IjoiXHU4MzMyIiwgDQoiXHU1MTdiIjoiXHU5OTBhIiwgDQoiXHU1MTdkIjoiXHU3Mzc4IiwgDQoiXHU1MTgxIjoiXHU1NmM1IiwgDQoiXHU1MTg1IjoiXHU1MTY3IiwgDQoiXHU1MTg4IjoiXHU1Y2ExIiwgDQoiXHU1MThjIjoiXHU1MThhIiwgDQoiXHU1MTk5IjoiXHU1YmViIiwgDQoiXHU1MTliIjoiXHU4ZWNkIiwgDQoiXHU1MTljIjoiXHU4ZmIyIiwgDQoiXHU1MWFmIjoiXHU5OWFlIiwgDQoiXHU1MWIyIjoiXHU2Yzk2IiwgDQoiXHU1MWIzIjoiXHU2YzdhIiwgDQoiXHU1MWI1IjoiXHU2Y2MxIiwgDQoiXHU1MWJiIjoiXHU1MWNkIiwgDQoiXHU1MWMwIjoiXHU2ZGU4IiwgDQoiXHU1MWM0IjoiXHU2ZGQyIiwgDQoiXHU1MWM3IjoiXHU2ZGRlIiwgDQoiXHU1MWM5IjoiXHU2ZGJjIiwgDQoiXHU1MWNmIjoiXHU2ZTFiIiwgDQoiXHU1MWQxIjoiXHU2ZTRhIiwgDQoiXHU1MWRiIjoiXHU1MWRjIiwgDQoiXHU1MWUwIjoiXHU1ZTdlIiwgDQoiXHU1MWU0IjoiXHU5Y2YzIiwgDQoiXHU1MWU2IjoiXHU4NjU1IiwgDQoiXHU1MWViIjoiXHU5Y2U3IiwgDQoiXHU1MWVkIjoiXHU2MTkxIiwgDQoiXHU1MWVmIjoiXHU1MWYxIiwgDQoiXHU1MWZiIjoiXHU2NGNhIiwgDQoiXHU1MWZjIjoiXHU1ZTdkIiwgDQoiXHU1MWZmIjoiXHU5NDdmIiwgDQoiXHU1MjBkIjoiXHU4MmJiIiwgDQoiXHU1MjEyIjoiXHU1MjgzIiwgDQoiXHU1MjE4IjoiXHU1Mjg5IiwgDQoiXHU1MjE5IjoiXHU1MjQ3IiwgDQoiXHU1MjFhIjoiXHU1MjViIiwgDQoiXHU1MjFiIjoiXHU1Mjc1IiwgDQoiXHU1MjIwIjoiXHU1MjJhIiwgDQoiXHU1MjJiIjoiXHU1MjI1IiwgDQoiXHU1MjJjIjoiXHU1MjU3IiwgDQoiXHU1MjJkIjoiXHU1MjQ0IiwgDQoiXHU1MjM5IjoiXHU1MjRlIiwgDQoiXHU1MjNkIjoiXHU1MjhhIiwgDQoiXHU1MjNmIjoiXHU1MjhjIiwgDQoiXHU1MjQwIjoiXHU1Mjc0IiwgDQoiXHU1MjQyIjoiXHU1MjkxIiwgDQoiXHU1MjUwIjoiXHU1MjZlIiwgDQoiXHU1MjUxIjoiXHU1MjhkIiwgDQoiXHU1MjY1IjoiXHU1MjVkIiwgDQoiXHU1MjY3IjoiXHU1Mjg3IiwgDQoiXHU1MjczIjoiXHU1Mjg0IiwgDQoiXHU1MjlkIjoiXHU1MmY4IiwgDQoiXHU1MjllIjoiXHU4ZmE2IiwgDQoiXHU1MmExIjoiXHU1MmQ5IiwgDQoiXHU1MmEyIjoiXHU1MmYxIiwgDQoiXHU1MmE4IjoiXHU1MmQ1IiwgDQoiXHU1MmIxIjoiXHU1MmY1IiwgDQoiXHU1MmIyIjoiXHU1MmMxIiwgDQoiXHU1MmIzIjoiXHU1MmRlIiwgDQoiXHU1MmJmIjoiXHU1MmUyIiwgDQoiXHU1MmNiIjoiXHU1MmYzIiwgDQoiXHU1MmRhIjoiXHU1MmU5IiwgDQoiXHU1MmRiIjoiXHU1MmYzIiwgDQoiXHU1MmU2IjoiXHU1MjdmIiwgDQoiXHU1MzAwIjoiXHU1MmZiIiwgDQoiXHU1MzI2IjoiXHU1MzJkIiwgDQoiXHU1MzJlIjoiXHU1MzMxIiwgDQoiXHU1MzNhIjoiXHU1MzQwIiwgDQoiXHU1MzNiIjoiXHU5MWFiIiwgDQoiXHU1MzRlIjoiXHU4M2VmIiwgDQoiXHU1MzRmIjoiXHU1MzU0IiwgDQoiXHU1MzU1IjoiXHU1NWFlIiwgDQoiXHU1MzU2IjoiXHU4Y2UzIiwgDQoiXHU1MzYwIjoiXHU0ZjU0IiwgDQoiXHU1MzYyIjoiXHU3NmU3IiwgDQoiXHU1MzY0IjoiXHU5ZTc1IiwgDQoiXHU1MzY3IjoiXHU4MWU1IiwgDQoiXHU1MzZiIjoiXHU4ODViIiwgDQoiXHU1Mzc0IjoiXHU1MzdiIiwgDQoiXHU1MzdhIjoiXHU1ZGY5IiwgDQoiXHU1MzgyIjoiXHU1ZWUwIiwgDQoiXHU1Mzg1IjoiXHU1ZWYzIiwgDQoiXHU1Mzg2IjoiXHU2Yjc3IiwgDQoiXHU1Mzg5IjoiXHU1M2IyIiwgDQoiXHU1MzhiIjoiXHU1OGQzIiwgDQoiXHU1MzhjIjoiXHU1M2FkIiwgDQoiXHU1MzhkIjoiXHU1Mzk5IiwgDQoiXHU1Mzk1IjoiXHU1ZWMxIiwgDQoiXHU1Mzk4IjoiXHU5MWQwIiwgDQoiXHU1M2EyIjoiXHU1ZWMyIiwgDQoiXHU1M2EzIjoiXHU1M2I0IiwgDQoiXHU1M2E2IjoiXHU1ZWM4IiwgDQoiXHU1M2E4IjoiXHU1ZWRhIiwgDQoiXHU1M2E5IjoiXHU1ZWM0IiwgDQoiXHU1M2FlIjoiXHU1ZWRkIiwgDQoiXHU1M2JmIjoiXHU3ZTIzIiwgDQoiXHU1M2MxIjoiXHU1M2MzIiwgDQoiXHU1M2MyIjoiXHU1M2MzIiwgDQoiXHU1M2M2IjoiXHU5NzQ5IiwgDQoiXHU1M2M3IjoiXHU5NzQ2IiwgDQoiXHU1M2NjIjoiXHU5NmQ5IiwgDQoiXHU1M2QxIjoiXHU3NjdjIiwgDQoiXHU1M2Q4IjoiXHU4YjhhIiwgDQoiXHU1M2Q5IjoiXHU2NTU4IiwgDQoiXHU1M2UwIjoiXHU3NThhIiwgDQoiXHU1M2Y2IjoiXHU4NDQ5IiwgDQoiXHU1M2Y3IjoiXHU4NjVmIiwgDQoiXHU1M2Y5IjoiXHU1NjA2IiwgDQoiXHU1M2ZkIjoiXHU1NjMwIiwgDQoiXHU1NDAxIjoiXHU3YzcyIiwgDQoiXHU1NDBlIjoiXHU1ZjhjIiwgDQoiXHU1NDEzIjoiXHU1Njg3IiwgDQoiXHU1NDE1IjoiXHU1NDQyIiwgDQoiXHU1NDE3IjoiXHU1NWNlIiwgDQoiXHU1NDI4IjoiXHU1Njc4IiwgDQoiXHU1NDJjIjoiXHU4MDdkIiwgDQoiXHU1NDJmIjoiXHU1NTVmIiwgDQoiXHU1NDM0IjoiXHU1NDMzIiwgDQoiXHU1NDUwIjoiXHU1NDM2IiwgDQoiXHU1NDUyIjoiXHU1NjM4IiwgDQoiXHU1NDUzIjoiXHU1NmM4IiwgDQoiXHU1NDU1IjoiXHU1NjE0IiwgDQoiXHU1NDU2IjoiXHU1NmE2IiwgDQoiXHU1NDU3IjoiXHU1NTA0IiwgDQoiXHU1NDU4IjoiXHU1NGUxIiwgDQoiXHU1NDU5IjoiXHU1NGJjIiwgDQoiXHU1NDViIjoiXHU1NWM2IiwgDQoiXHU1NDVjIjoiXHU1NWRhIiwgDQoiXHU1NDhmIjoiXHU4YTYwIiwgDQoiXHU1NDk5IjoiXHU1NmE4IiwgDQoiXHU1NDliIjoiXHU1NjgwIiwgDQoiXHU1NDlkIjoiXHU1NjVkIiwgDQoiXHU1NGNjIjoiXHU1NDcxIiwgDQoiXHU1NGNkIjoiXHU5N2ZmIiwgDQoiXHU1NGQxIjoiXHU1NTVlIiwgDQoiXHU1NGQyIjoiXHU1NjYwIiwgDQoiXHU1NGQzIjoiXHU1NjM1IiwgDQoiXHU1NGQ0IjoiXHU1NWY2IiwgDQoiXHU1NGQ1IjoiXHU1NjY2IiwgDQoiXHU1NGQ3IjoiXHU1NjI5IiwgDQoiXHU1NGQ5IjoiXHU1NjcyIiwgDQoiXHU1NGRjIjoiXHU1NjhjIiwgDQoiXHU1NGRkIjoiXHU1NjY1IiwgDQoiXHU1NGRmIjoiXHU1NWIyIiwgDQoiXHU1NTFiIjoiXHU1NjFjIiwgDQoiXHU1NTFkIjoiXHU1NWNhIiwgDQoiXHU1NTIwIjoiXHU1NjJlIiwgDQoiXHU1NTIxIjoiXHU1NTYyIiwgDQoiXHU1NTIyIjoiXHU1NWU5IiwgDQoiXHU1NTI0IjoiXHU1NTlhIiwgDQoiXHU1NTUzIjoiXHU1NTVmIiwgDQoiXHU1NTY3IjoiXHU1NjE2IiwgDQoiXHU1NTZjIjoiXHU1NWM3IiwgDQoiXHU1NTZkIjoiXHU1NmMwIiwgDQoiXHU1NTZlIjoiXHU5ZjY3IiwgDQoiXHU1NTcwIjoiXHU1NmM5IiwgDQoiXHU1NTc4IjoiXHU1NjJmIiwgDQoiXHU1NWI3IjoiXHU1Njc0IiwgDQoiXHU1NWJkIjoiXHU1NjBkIiwgDQoiXHU1NWJlIjoiXHU1NmIzIiwgDQoiXHU1NWViIjoiXHU1NmMxIiwgDQoiXHU1NWVjIjoiXHU1NDc1IiwgDQoiXHU1NWYzIjoiXHU1NjZmIiwgDQoiXHU1NjE4IjoiXHU1NjUzIiwgDQoiXHU1NjI0IjoiXHU1NmI2IiwgDQoiXHU1NjI5IjoiXHU4YjQxIiwgDQoiXHU1NjMxIjoiXHU1NmQxIiwgDQoiXHU1NjVjIjoiXHU1Njk1IiwgDQoiXHU1NmEzIjoiXHU1NmMyIiwgDQoiXHU1NmFlIjoiXHU1NDExIiwgDQoiXHU1NmUyIjoiXHU1NzE4IiwgDQoiXHU1NmVkIjoiXHU1NzEyIiwgDQoiXHU1NmVmIjoiXHU1NzBiIiwgDQoiXHU1NmYxIjoiXHU1NmVhIiwgDQoiXHU1NmY0IjoiXHU1NzBkIiwgDQoiXHU1NmY1IjoiXHU1NzA3IiwgDQoiXHU1NmZkIjoiXHU1NzBiIiwgDQoiXHU1NmZlIjoiXHU1NzE2IiwgDQoiXHU1NzA2IjoiXHU1NzEzIiwgDQoiXHU1NzIzIjoiXHU4MDU2IiwgDQoiXHU1NzM5IjoiXHU1OGQ5IiwgDQoiXHU1NzNhIjoiXHU1ODM0IiwgDQoiXHU1NzQyIjoiXHU5NjJhIiwgDQoiXHU1NzRmIjoiXHU1OGRlIiwgDQoiXHU1NzU3IjoiXHU1ODRhIiwgDQoiXHU1NzVhIjoiXHU1ODA1IiwgDQoiXHU1NzViIjoiXHU1OGM3IiwgDQoiXHU1NzVjIjoiXHU1OGUyIiwgDQoiXHU1NzVkIjoiXHU1OGU5IiwgDQoiXHU1NzVlIjoiXHU1ODYyIiwgDQoiXHU1NzVmIjoiXHU1OGIzIiwgDQoiXHU1NzYwIjoiXHU1ODljIiwgDQoiXHU1Nzg0IjoiXHU1OGRmIiwgDQoiXHU1Nzg1IjoiXHU1OGRmIiwgDQoiXHU1Nzg2IjoiXHU1OGRhIiwgDQoiXHU1NzkyIjoiXHU1OGQ4IiwgDQoiXHU1N2E2IjoiXHU1OGJlIiwgDQoiXHU1N2E5IjoiXHU1ODBhIiwgDQoiXHU1N2FiIjoiXHU1ODhhIiwgDQoiXHU1N2FkIjoiXHU1N2UxIiwgDQoiXHU1N2IyIjoiXHU1ODRmIiwgDQoiXHU1N2I0IjoiXHU1ODE2IiwgDQoiXHU1N2Q4IjoiXHU1ODUyIiwgDQoiXHU1N2Q5IjoiXHU1OGNlIiwgDQoiXHU1N2RhIjoiXHU1ODFkIiwgDQoiXHU1ODExIjoiXHU1ODc5IiwgDQoiXHU1ODE1IjoiXHU1OGFlIiwgDQoiXHU1ODkyIjoiXHU1ODkxIiwgDQoiXHU1ODk5IjoiXHU3MjQ2IiwgDQoiXHU1OGVlIjoiXHU1OGVmIiwgDQoiXHU1OGYwIjoiXHU4MDcyIiwgDQoiXHU1OGYzIjoiXHU2YmJjIiwgDQoiXHU1OGY2IjoiXHU1OGZhIiwgDQoiXHU1OTA0IjoiXHU4NjU1IiwgDQoiXHU1OTA3IjoiXHU1MDk5IiwgDQoiXHU1OTBkIjoiXHU1ZmE5IiwgDQoiXHU1OTFmIjoiXHU1OTIwIiwgDQoiXHU1OTM0IjoiXHU5ODJkIiwgDQoiXHU1OTM4IjoiXHU4YTg3IiwgDQoiXHU1OTM5IjoiXHU1OTNlIiwgDQoiXHU1OTNhIjoiXHU1OTZhIiwgDQoiXHU1OTQxIjoiXHU1OTY5IiwgDQoiXHU1OTQyIjoiXHU1OTUwIiwgDQoiXHU1OTRiIjoiXHU1OTZlIiwgDQoiXHU1OTU2IjoiXHU3MzRlIiwgDQoiXHU1OTY1IjoiXHU1OTY3IiwgDQoiXHU1OTZjIjoiXHU3MzRlIiwgDQoiXHU1OTg2IjoiXHU1OTlkIiwgDQoiXHU1OTg3IjoiXHU1YTY2IiwgDQoiXHU1OTg4IjoiXHU1YWJkIiwgDQoiXHU1OWE5IjoiXHU1YWY1IiwgDQoiXHU1OWFhIjoiXHU1YWQ3IiwgDQoiXHU1OWFiIjoiXHU1YWFmIiwgDQoiXHU1OWQ3IjoiXHU1OWNkIiwgDQoiXHU1YTA0IjoiXHU1YTQxIiwgDQoiXHU1YTA1IjoiXHU1YTZkIiwgDQoiXHU1YTA2IjoiXHU1YjA4IiwgDQoiXHU1YTA3IjoiXHU1YjBjIiwgDQoiXHU1YTA4IjoiXHU1YjRjIiwgDQoiXHU1YTMxIjoiXHU1YTFiIiwgDQoiXHU1YTMyIjoiXHU1YWE3IiwgDQoiXHU1YTM0IjoiXHU1YWZiIiwgDQoiXHU1YTczIjoiXHU1YWZmIiwgDQoiXHU1YTc0IjoiXHU1YjMwIiwgDQoiXHU1YTc1IjoiXHU1YjBiIiwgDQoiXHU1YTc2IjoiXHU1YjM4IiwgDQoiXHU1YWFhIjoiXHU1YWJjIiwgDQoiXHU1YWQyIjoiXHU1YjIxIiwgDQoiXHU1YWQ0IjoiXHU1YjJhIiwgDQoiXHU1YWYxIjoiXHU1YjE5IiwgDQoiXHU1YjM3IjoiXHU1YjI0IiwgDQoiXHU1YjU5IjoiXHU1YjZiIiwgDQoiXHU1YjY2IjoiXHU1Yjc4IiwgDQoiXHU1YjZhIjoiXHU1YjdmIiwgDQoiXHU1YjgxIjoiXHU1YmU3IiwgDQoiXHU1YjlkIjoiXHU1YmY2IiwgDQoiXHU1YjllIjoiXHU1YmU2IiwgDQoiXHU1YmEwIjoiXHU1YmY1IiwgDQoiXHU1YmExIjoiXHU1YmU5IiwgDQoiXHU1YmFhIjoiXHU2MWIyIiwgDQoiXHU1YmFiIjoiXHU1YmFlIiwgDQoiXHU1YmJkIjoiXHU1YmVjIiwgDQoiXHU1YmJlIjoiXHU4Y2QzIiwgDQoiXHU1YmMwIjoiXHU5MWM3IiwgDQoiXHU1YmRkIjoiXHU1YmUyIiwgDQoiXHU1YmY5IjoiXHU1YzBkIiwgDQoiXHU1YmZiIjoiXHU1YzBiIiwgDQoiXHU1YmZjIjoiXHU1YzBlIiwgDQoiXHU1YmZmIjoiXHU1OGZkIiwgDQoiXHU1YzA2IjoiXHU1YzA3IiwgDQoiXHU1YzE0IjoiXHU3MjNlIiwgDQoiXHU1YzE4IjoiXHU1ODc1IiwgDQoiXHU1YzFjIjoiXHU1NjBlIiwgDQoiXHU1YzFkIjoiXHU1NjE3IiwgDQoiXHU1YzI3IjoiXHU1ODJmIiwgDQoiXHU1YzM0IjoiXHU1YzM3IiwgDQoiXHU1YzM4IjoiXHU1YzRkIiwgDQoiXHU1YzNkIjoiXHU3NmUxIiwgDQoiXHU1YzQyIjoiXHU1YzY0IiwgDQoiXHU1YzQ5IjoiXHU1YzVjIiwgDQoiXHU1YzRhIjoiXHU1YzQ2IiwgDQoiXHU1YzVlIjoiXHU1YzZjIiwgDQoiXHU1YzYxIjoiXHU1YzYyIiwgDQoiXHU1YzY2IjoiXHU1YzY4IiwgDQoiXHU1YzdmIjoiXHU1ZGJjIiwgDQoiXHU1YzgxIjoiXHU2YjcyIiwgDQoiXHU1YzgyIjoiXHU4YzQ4IiwgDQoiXHU1Yzk2IjoiXHU1ZDg3IiwgDQoiXHU1Yzk3IjoiXHU1ZDE3IiwgDQoiXHU1Yzk4IjoiXHU1Y2Y0IiwgDQoiXHU1YzlhIjoiXHU1ZDUwIiwgDQoiXHU1YzliIjoiXHU1Y2Y2IiwgDQoiXHU1Y2FkIjoiXHU1ZGJhIiwgDQoiXHU1Y2JkIjoiXHU1ZDIwIiwgDQoiXHU1Y2JmIjoiXHU1ZGNiIiwgDQoiXHU1Y2MzIjoiXHU1ZGE4IiwgDQoiXHU1Y2M0IjoiXHU1ZGE3IiwgDQoiXHU1Y2UxIjoiXHU1Y2ZkIiwgDQoiXHU1Y2UzIjoiXHU1ZGEyIiwgDQoiXHU1Y2U0IjoiXHU1ZGEwIiwgDQoiXHU1Y2U1IjoiXHU1ZDIyIiwgDQoiXHU1Y2U2IjoiXHU1ZGQyIiwgDQoiXHU1Y2VmIjoiXHU1Y2YwIiwgDQoiXHU1ZDAyIjoiXHU1ZDk3IiwgDQoiXHU1ZDAzIjoiXHU1ZDBkIiwgDQoiXHU1ZDEwIjoiXHU1ZDExIiwgDQoiXHU1ZDJkIjoiXHU1ZDg0IiwgDQoiXHU1ZDU4IjoiXHU1ZGI4IiwgDQoiXHU1ZDVhIjoiXHU1ZDk0IiwgDQoiXHU1ZDViIjoiXHU1ZDMzIiwgDQoiXHU1ZDVkIjoiXHU1ZDgxIiwgDQoiXHU1ZGM1IjoiXHU1ZGQ0IiwgDQoiXHU1ZGNjIjoiXHU1ZGQ2IiwgDQoiXHU1ZGU5IjoiXHU5NzhmIiwgDQoiXHU1ZGVmIjoiXHU1ZGYwIiwgDQoiXHU1ZTAxIjoiXHU1ZTYzIiwgDQoiXHU1ZTA1IjoiXHU1ZTI1IiwgDQoiXHU1ZTA4IjoiXHU1ZTJiIiwgDQoiXHU1ZTBmIjoiXHU1ZTQzIiwgDQoiXHU1ZTEwIjoiXHU1ZTMzIiwgDQoiXHU1ZTE4IjoiXHU3YzNlIiwgDQoiXHU1ZTFjIjoiXHU1ZTVmIiwgDQoiXHU1ZTI2IjoiXHU1ZTM2IiwgDQoiXHU1ZTI3IjoiXHU1ZTQwIiwgDQoiXHU1ZTJlIjoiXHU1ZTZiIiwgDQoiXHU1ZTMxIjoiXHU1ZTZjIiwgDQoiXHU1ZTNiIjoiXHU1ZTU4IiwgDQoiXHU1ZTNjIjoiXHU1ZTU3IiwgDQoiXHU1ZTQyIjoiXHU1MWFhIiwgDQoiXHU1ZTc1IjoiXHU5NThiIiwgDQoiXHU1ZTc2IjoiXHU0ZTI2IiwgDQoiXHU1ZTc3IjoiXHU0ZTI2IiwgDQoiXHU1ZTdmIjoiXHU1ZWUzIiwgDQoiXHU1ZTg0IjoiXHU4MzhhIiwgDQoiXHU1ZTg2IjoiXHU2MTc2IiwgDQoiXHU1ZTkwIjoiXHU1ZWVjIiwgDQoiXHU1ZTkxIjoiXHU1ZWUxIiwgDQoiXHU1ZTkzIjoiXHU1ZWFiIiwgDQoiXHU1ZTk0IjoiXHU2MWM5IiwgDQoiXHU1ZTk5IjoiXHU1ZWRmIiwgDQoiXHU1ZTllIjoiXHU5ZjkwIiwgDQoiXHU1ZTlmIjoiXHU1ZWUyIiwgDQoiXHU1ZWJjIjoiXHU1ZWNlIiwgDQoiXHU1ZWVhIjoiXHU1ZWU5IiwgDQoiXHU1ZjAwIjoiXHU5NThiIiwgDQoiXHU1ZjAyIjoiXHU3NTcwIiwgDQoiXHU1ZjAzIjoiXHU2OGM0IiwgDQoiXHU1ZjExIjoiXHU1ZjEyIiwgDQoiXHU1ZjIwIjoiXHU1ZjM1IiwgDQoiXHU1ZjI1IjoiXHU1ZjRjIiwgDQoiXHU1ZjJhIjoiXHU1ZjMzIiwgDQoiXHU1ZjJmIjoiXHU1ZjRlIiwgDQoiXHU1ZjM5IjoiXHU1ZjQ4IiwgDQoiXHU1ZjNhIjoiXHU1ZjM3IiwgDQoiXHU1ZjUyIjoiXHU2Yjc4IiwgDQoiXHU1ZjUzIjoiXHU3NTc2IiwgDQoiXHU1ZjU0IjoiXHU1ZjU1IiwgDQoiXHU1ZjU1IjoiXHU5MzA0IiwgDQoiXHU1ZjVhIjoiXHU1ZjU5IiwgDQoiXHU1ZjY2IjoiXHU1ZjY1IiwgDQoiXHU1ZjdiIjoiXHU1ZmI5IiwgDQoiXHU1Zjg0IjoiXHU1ZjkxIiwgDQoiXHU1Zjk1IjoiXHU1ZmEwIiwgDQoiXHU1ZmM2IjoiXHU2MWI2IiwgDQoiXHU1ZmNmIjoiXHU2MWZhIiwgDQoiXHU1ZmU3IjoiXHU2MTgyIiwgDQoiXHU1ZmZlIjoiXHU2MTNlIiwgDQoiXHU2MDAwIjoiXHU2MWY3IiwgDQoiXHU2MDAxIjoiXHU2MTRiIiwgDQoiXHU2MDAyIjoiXHU2MTZiIiwgDQoiXHU2MDAzIjoiXHU2MWFlIiwgDQoiXHU2MDA0IjoiXHU2MTZhIiwgDQoiXHU2MDA1IjoiXHU2MGI1IiwgDQoiXHU2MDA2IjoiXHU2MTM0IiwgDQoiXHU2MDFjIjoiXHU2MTkwIiwgDQoiXHU2MDNiIjoiXHU3ZTNkIiwgDQoiXHU2MDNjIjoiXHU2MWRmIiwgDQoiXHU2MDNmIjoiXHU2MWNjIiwgDQoiXHU2MDRiIjoiXHU2MjAwIiwgDQoiXHU2MDUyIjoiXHU2MDQ2IiwgDQoiXHU2MDczIjoiXHU2MWM3IiwgDQoiXHU2MDc2IjoiXHU2MGUxIiwgDQoiXHU2MDc4IjoiXHU2MTVmIiwgDQoiXHU2MDc5IjoiXHU2MWU4IiwgDQoiXHU2MDdhIjoiXHU2MTM3IiwgDQoiXHU2MDdiIjoiXHU2MGZiIiwgDQoiXHU2MDdjIjoiXHU2MGYxIiwgDQoiXHU2MDdkIjoiXHU2MGYyIiwgDQoiXHU2MGE2IjoiXHU2MDg1IiwgDQoiXHU2MGFiIjoiXHU2MTI4IiwgDQoiXHU2MGFjIjoiXHU2MWY4IiwgDQoiXHU2MGFkIjoiXHU2MTczIiwgDQoiXHU2MGFmIjoiXHU2MWFiIiwgDQoiXHU2MGNhIjoiXHU5YTVhIiwgDQoiXHU2MGU3IjoiXHU2MWZjIiwgDQoiXHU2MGU4IjoiXHU2MTU4IiwgDQoiXHU2MGU5IjoiXHU2MWYyIiwgDQoiXHU2MGViIjoiXHU2MThhIiwgDQoiXHU2MGVjIjoiXHU2MTFjIiwgDQoiXHU2MGVkIjoiXHU2MTVhIiwgDQoiXHU2MGVlIjoiXHU2MTlhIiwgDQoiXHU2MGVmIjoiXHU2MTYzIiwgDQoiXHU2MTIwIjoiXHU2MTRkIiwgDQoiXHU2MTI0IjoiXHU2MWE0IiwgDQoiXHU2MTI2IjoiXHU2MTkyIiwgDQoiXHU2MTNmIjoiXHU5ODU4IiwgDQoiXHU2MTUxIjoiXHU2MWZlIiwgDQoiXHU2MWQxIjoiXHU2MWUzIiwgDQoiXHU2MWQyIjoiXHU2MWY2IiwgDQoiXHU2MWQ0IjoiXHU2MWNkIiwgDQoiXHU2MjA2IjoiXHU2MjA3IiwgDQoiXHU2MjBiIjoiXHU2MjE0IiwgDQoiXHU2MjBmIjoiXHU2MjMyIiwgDQoiXHU2MjE3IjoiXHU2MjI3IiwgDQoiXHU2MjE4IjoiXHU2MjMwIiwgDQoiXHU2MjJjIjoiXHU2MjI5IiwgDQoiXHU2MjM3IjoiXHU2MjM2IiwgDQoiXHU2MjUxIjoiXHU2NGIyIiwgDQoiXHU2MjY3IjoiXHU1N2Y3IiwgDQoiXHU2MjY5IjoiXHU2NGY0IiwgDQoiXHU2MjZhIjoiXHU2MzZiIiwgDQoiXHU2MjZiIjoiXHU2MzgzIiwgDQoiXHU2MjZjIjoiXHU2M2RhIiwgDQoiXHU2MjcwIjoiXHU2NGZlIiwgDQoiXHU2MjlhIjoiXHU2NGFiIiwgDQoiXHU2MjliIjoiXHU2MmNiIiwgDQoiXHU2MjlmIjoiXHU2NDc2IiwgDQoiXHU2MmEwIjoiXHU2NDczIiwgDQoiXHU2MmExIjoiXHU2Mzg0IiwgDQoiXHU2MmEyIjoiXHU2NDM2IiwgDQoiXHU2MmE0IjoiXHU4Yjc3IiwgDQoiXHU2MmE1IjoiXHU1ODMxIiwgDQoiXHU2MmM1IjoiXHU2NGQ0IiwgDQoiXHU2MmRmIjoiXHU2NGVjIiwgDQoiXHU2MmUyIjoiXHU2NTBmIiwgDQoiXHU2MmUzIjoiXHU2M2MwIiwgDQoiXHU2MmU1IjoiXHU2NGMxIiwgDQoiXHU2MmU2IjoiXHU2NTE0IiwgDQoiXHU2MmU3IjoiXHU2NGYwIiwgDQoiXHU2MmU4IjoiXHU2NGE1IiwgDQoiXHU2MmU5IjoiXHU2NGM3IiwgDQoiXHU2MzAyIjoiXHU2MzliIiwgDQoiXHU2MzFhIjoiXHU2NDZmIiwgDQoiXHU2MzFiIjoiXHU2NTIzIiwgDQoiXHU2MzFjIjoiXHU2Mzk3IiwgDQoiXHU2MzFkIjoiXHU2NGJlIiwgDQoiXHU2MzFlIjoiXHU2NGJiIiwgDQoiXHU2MzFmIjoiXHU2MzNlIiwgDQoiXHU2MzIwIjoiXHU2NDkzIiwgDQoiXHU2MzIxIjoiXHU2NGNiIiwgDQoiXHU2MzIyIjoiXHU2NDlmIiwgDQoiXHU2MzIzIjoiXHU2Mzk5IiwgDQoiXHU2MzI0IjoiXHU2NGUwIiwgDQoiXHU2MzI1IjoiXHU2M2VlIiwgDQoiXHU2MzI2IjoiXHU2NDhmIiwgDQoiXHU2MzVjIjoiXHU2NDFjIiwgDQoiXHU2MzVlIjoiXHU2NDg4IiwgDQoiXHU2MzVmIjoiXHU2NDBkIiwgDQoiXHU2MzYxIjoiXHU2NGJmIiwgDQoiXHU2MzYyIjoiXHU2M2RiIiwgDQoiXHU2MzYzIjoiXHU2NDE3IiwgDQoiXHU2MzZlIjoiXHU2NGRhIiwgDQoiXHU2M2IzIjoiXHU2NGM0IiwgDQoiXHU2M2I0IjoiXHU2NDUxIiwgDQoiXHU2M2I3IjoiXHU2NGYyIiwgDQoiXHU2M2I4IjoiXHU2NGEzIiwgDQoiXHU2M2JhIjoiXHU2NDdiIiwgDQoiXHU2M2JjIjoiXHU2NDVjIiwgDQoiXHU2M2ZkIjoiXHU2NTJjIiwgDQoiXHU2M2ZmIjoiXHU2NGIzIiwgDQoiXHU2NDAwIjoiXHU2NTE5IiwgDQoiXHU2NDAxIjoiXHU2NGYxIiwgDQoiXHU2NDAyIjoiXHU2NDVmIiwgDQoiXHU2NDA1IjoiXHU2NTJhIiwgDQoiXHU2NDNhIjoiXHU2NTFjIiwgDQoiXHU2NDQ0IjoiXHU2NTFkIiwgDQoiXHU2NDQ1IjoiXHU2NTA0IiwgDQoiXHU2NDQ2IjoiXHU2NGZhIiwgDQoiXHU2NDQ3IjoiXHU2NDE2IiwgDQoiXHU2NDQ4IjoiXHU2NGVmIiwgDQoiXHU2NDRhIjoiXHU2NTI0IiwgDQoiXHU2NDg0IjoiXHU2NTE2IiwgDQoiXHU2NDkxIjoiXHU2NDkwIiwgDQoiXHU2NGI1IjoiXHU2NTA2IiwgDQoiXHU2NGI3IjoiXHU2NGY3IiwgDQoiXHU2NGI4IjoiXHU2NGZjIiwgDQoiXHU2NGJhIjoiXHU2NTFiIiwgDQoiXHU2NGMwIjoiXHU2NDFmIiwgDQoiXHU2NGRlIjoiXHU2NGZiIiwgDQoiXHU2NTEyIjoiXHU2NTIyIiwgDQoiXHU2NTRjIjoiXHU2NTc1IiwgDQoiXHU2NTViIjoiXHU2NTgyIiwgDQoiXHU2NTcwIjoiXHU2NTc4IiwgDQoiXHU2NThiIjoiXHU5ZjRiIiwgDQoiXHU2NTkzIjoiXHU2NTk1IiwgDQoiXHU2NWE5IjoiXHU2NWFjIiwgDQoiXHU2NWFkIjoiXHU2NWI3IiwgDQoiXHU2NWUwIjoiXHU3MTIxIiwgDQoiXHU2NWU3IjoiXHU4MjBhIiwgDQoiXHU2NWY2IjoiXHU2NjQyIiwgDQoiXHU2NWY3IjoiXHU2NmUwIiwgDQoiXHU2NWY4IjoiXHU2Njk4IiwgDQoiXHU2NjE5IjoiXHU2NmM3IiwgDQoiXHU2NjM1IjoiXHU2NmIxIiwgDQoiXHU2NjNjIjoiXHU2NjVkIiwgDQoiXHU2NjNkIjoiXHU2NmU4IiwgDQoiXHU2NjNlIjoiXHU5ODZmIiwgDQoiXHU2NjRiIjoiXHU2NjQ5IiwgDQoiXHU2NjUyIjoiXHU2NmVjIiwgDQoiXHU2NjUzIjoiXHU2NmM5IiwgDQoiXHU2NjU0IjoiXHU2NmM0IiwgDQoiXHU2NjU1IjoiXHU2Njg4IiwgDQoiXHU2NjU2IjoiXHU2Njg5IiwgDQoiXHU2NjgyIjoiXHU2NmFiIiwgDQoiXHU2NmE3IjoiXHU2NmQ2IiwgDQoiXHU2NmI4IjoiXHU3N2FkIiwgDQoiXHU2NzJlIjoiXHU4ODUzIiwgDQoiXHU2NzJmIjoiXHU4ODUzIiwgDQoiXHU2NzNhIjoiXHU2YTVmIiwgDQoiXHU2NzQwIjoiXHU2YmJhIiwgDQoiXHU2NzQyIjoiXHU5NmRjIiwgDQoiXHU2NzQzIjoiXHU2YjBhIiwgDQoiXHU2NzQ2IjoiXHU2ODdmIiwgDQoiXHU2NzYwIjoiXHU2OWQzIiwgDQoiXHU2NzYxIjoiXHU2ODlkIiwgDQoiXHU2NzY1IjoiXHU0Zjg2IiwgDQoiXHU2NzY4IjoiXHU2OTRhIiwgDQoiXHU2NzY5IjoiXHU2OWFhIiwgDQoiXHU2NzcwIjoiXHU1MDkxIiwgDQoiXHU2NzgxIjoiXHU2OTc1IiwgDQoiXHU2Nzg0IjoiXHU2OWNiIiwgDQoiXHU2NzllIjoiXHU2YTA1IiwgDQoiXHU2N2EyIjoiXHU2YTFlIiwgDQoiXHU2N2EzIjoiXHU2OGQ3IiwgDQoiXHU2N2E1IjoiXHU2YWVhIiwgDQoiXHU2N2E3IjoiXHU2ODk4IiwgDQoiXHU2N2E4IjoiXHU2OGQ2IiwgDQoiXHU2N2FhIjoiXHU2OWNkIiwgDQoiXHU2N2FiIjoiXHU2OTUzIiwgDQoiXHU2N2FkIjoiXHU2ODlmIiwgDQoiXHU2N2RjIjoiXHU2YWMzIiwgDQoiXHU2N2UwIjoiXHU2YWI4IiwgDQoiXHU2N2ZkIjoiXHU2YTg5IiwgDQoiXHU2ODAwIjoiXHU2ODk0IiwgDQoiXHU2ODA1IjoiXHU2N2Y1IiwgDQoiXHU2ODA3IjoiXHU2YTE5IiwgDQoiXHU2ODA4IjoiXHU2OGU3IiwgDQoiXHU2ODA5IjoiXHU2YWRiIiwgDQoiXHU2ODBhIjoiXHU2YWYzIiwgDQoiXHU2ODBiIjoiXHU2OGRmIiwgDQoiXHU2ODBjIjoiXHU2YWU4IiwgDQoiXHU2ODBlIjoiXHU2YWRmIiwgDQoiXHU2ODBmIjoiXHU2YjA0IiwgDQoiXHU2ODExIjoiXHU2YTM5IiwgDQoiXHU2ODE2IjoiXHU2OGYyIiwgDQoiXHU2ODM3IjoiXHU2YTIzIiwgDQoiXHU2ODNlIjoiXHU2YjEyIiwgDQoiXHU2ODU0IjoiXHU2YTU4IiwgDQoiXHU2ODYwIjoiXHU2OTBmIiwgDQoiXHU2ODYxIjoiXHU2YTQ4IiwgDQoiXHU2ODYyIjoiXHU2OTY4IiwgDQoiXHU2ODYzIjoiXHU2YTk0IiwgDQoiXHU2ODY0IjoiXHU2OWJmIiwgDQoiXHU2ODY1IjoiXHU2YTRiIiwgDQoiXHU2ODY2IjoiXHU2YTNhIiwgDQoiXHU2ODY3IjoiXHU2YTljIiwgDQoiXHU2ODY4IjoiXHU2OWYzIiwgDQoiXHU2ODY5IjoiXHU2YTAxIiwgDQoiXHU2OGE2IjoiXHU1OTIyIiwgDQoiXHU2OGMwIjoiXHU2YWEyIiwgDQoiXHU2OGMyIjoiXHU2YWZhIiwgDQoiXHU2OTAxIjoiXHU2OWU4IiwgDQoiXHU2OTFmIjoiXHU2YWRkIiwgDQoiXHU2OTIwIjoiXHU2OWU3IiwgDQoiXHU2OTI0IjoiXHU2YjBmIiwgDQoiXHU2OTJkIjoiXHU2YTYyIiwgDQoiXHU2OTdjIjoiXHU2YTEzIiwgDQoiXHU2OTg0IjoiXHU2YjE2IiwgDQoiXHU2OTg3IjoiXHU2YWVjIiwgDQoiXHU2OTg4IjoiXHU2YWRhIiwgDQoiXHU2OTg5IjoiXHU2YWY4IiwgDQoiXHU2OTk4IjoiXHU3N2U5IiwgDQoiXHU2OWRhIjoiXHU2YTlmIiwgDQoiXHU2OWRiIjoiXHU2YWJiIiwgDQoiXHU2OWRmIjoiXHU2YWIzIiwgDQoiXHU2OWUwIjoiXHU2YWU3IiwgDQoiXHU2OWZjIjoiXHU4OThmIiwgDQoiXHU2YTJhIjoiXHU2YTZiIiwgDQoiXHU2YTJmIjoiXHU2YWEzIiwgDQoiXHU2YTMxIjoiXHU2YWZiIiwgDQoiXHU2YTY1IjoiXHU2YWViIiwgDQoiXHU2YTcxIjoiXHU2YWU1IiwgDQoiXHU2YTc5IjoiXHU2YWQzIiwgDQoiXHU2YTdjIjoiXHU2YWRlIiwgDQoiXHU2YTkwIjoiXHU3YzM3IiwgDQoiXHU2YWE5IjoiXHU2YTgxIiwgDQoiXHU2YjIyIjoiXHU2YjYxIiwgDQoiXHU2YjI0IjoiXHU2YjVmIiwgDQoiXHU2YjI3IjoiXHU2YjUwIiwgDQoiXHU2YjRlIjoiXHU1NjA2IiwgDQoiXHU2YjdjIjoiXHU2YmIyIiwgDQoiXHU2YjgxIjoiXHU2YjdmIiwgDQoiXHU2Yjg3IjoiXHU2YmE0IiwgDQoiXHU2YjhiIjoiXHU2Yjk4IiwgDQoiXHU2YjkyIjoiXHU2YjllIiwgDQoiXHU2YjkzIjoiXHU2YmFlIiwgDQoiXHU2YjlhIjoiXHU2YmFiIiwgDQoiXHU2YmExIjoiXHU2YmFmIiwgDQoiXHU2YmI0IjoiXHU2YmM2IiwgDQoiXHU2YmMxIjoiXHU2YmMwIiwgDQoiXHU2YmMyIjoiXHU4ZjQyIiwgDQoiXHU2YmQ1IjoiXHU3NTYyIiwgDQoiXHU2YmQ5IjoiXHU2NTgzIiwgDQoiXHU2YmUxIjoiXHU2YzA4IiwgDQoiXHU2YmY1IjoiXHU2YmZmIiwgDQoiXHU2YzA3IjoiXHU2YzBjIiwgDQoiXHU2YzE0IjoiXHU2YzIzIiwgDQoiXHU2YzIyIjoiXHU2YzJiIiwgDQoiXHU2YzI5IjoiXHU2YzJjIiwgDQoiXHU2YzMyIjoiXHU2YzMzIiwgDQoiXHU2YzNkIjoiXHU2YzQ2IiwgDQoiXHU2YzQ3IjoiXHU1MzJmIiwgDQoiXHU2YzQ5IjoiXHU2ZjIyIiwgDQoiXHU2YzY0IjoiXHU2ZTZmIiwgDQoiXHU2Yzc5IjoiXHU2ZDM2IiwgDQoiXHU2YzlmIjoiXHU2ZTlkIiwgDQoiXHU2Y2ExIjoiXHU2YzkyIiwgDQoiXHU2Y2EzIjoiXHU3MDQzIiwgDQoiXHU2Y2E0IjoiXHU2ZjFhIiwgDQoiXHU2Y2E1IjoiXHU3MDFkIiwgDQoiXHU2Y2E2IjoiXHU2ZGVhIiwgDQoiXHU2Y2E3IjoiXHU2ZWM0IiwgDQoiXHU2Y2E4IjoiXHU2ZTIyIiwgDQoiXHU2Y2E5IjoiXHU2ZTg4IiwgDQoiXHU2Y2FhIjoiXHU2ZWVjIiwgDQoiXHU2Y2IyIjoiXHU2Y2IxIiwgDQoiXHU2Y2M0IjoiXHU2ZDI5IiwgDQoiXHU2Y2RlIjoiXHU2ZmQ4IiwgDQoiXHU2Y2VhIjoiXHU2ZGRhIiwgDQoiXHU2Y2Y2IjoiXHU2ZmE5IiwgDQoiXHU2Y2Y3IjoiXHU3MDI3IiwgDQoiXHU2Y2Y4IjoiXHU3MDE4IiwgDQoiXHU2Y2ZhIjoiXHU2ZmZjIiwgDQoiXHU2Y2ZiIjoiXHU3MDA5IiwgDQoiXHU2Y2ZjIjoiXHU2ZjUxIiwgDQoiXHU2Y2ZkIjoiXHU2ZmE0IiwgDQoiXHU2Y2ZlIjoiXHU2ZDg3IiwgDQoiXHU2ZDAxIjoiXHU2ZjU0IiwgDQoiXHU2ZDEyIjoiXHU3MDUxIiwgDQoiXHU2ZDNjIjoiXHU3YWFhIiwgDQoiXHU2ZDQzIjoiXHU2ZDc5IiwgDQoiXHU2ZDQ1IjoiXHU2ZGZhIiwgDQoiXHU2ZDQ2IjoiXHU2ZjNmIiwgDQoiXHU2ZDQ3IjoiXHU2Zjg2IiwgDQoiXHU2ZDQ4IjoiXHU2ZTVlIiwgDQoiXHU2ZDQ5IjoiXHU2ZWFlIiwgDQoiXHU2ZDRhIjoiXHU2ZmMxIiwgDQoiXHU2ZDRiIjoiXHU2ZTJjIiwgDQoiXHU2ZDRkIjoiXHU2ZmFlIiwgDQoiXHU2ZDRlIjoiXHU2ZmRmIiwgDQoiXHU2ZDRmIjoiXHU3MDBmIiwgDQoiXHU2ZDUwIjoiXHU2ZWZiIiwgDQoiXHU2ZDUxIjoiXHU2ZTNlIiwgDQoiXHU2ZDUyIjoiXHU2ZWY4IiwgDQoiXHU2ZDUzIjoiXHU2ZmMzIiwgDQoiXHU2ZDU0IjoiXHU2ZjZmIiwgDQoiXHU2ZDU1IjoiXHU2ZmRjIiwgDQoiXHU2ZDVjIjoiXHU2ZmYxIiwgDQoiXHU2ZDhjIjoiXHU2ZTY3IiwgDQoiXHU2ZDliIjoiXHU2ZmU0IiwgDQoiXHU2ZDlkIjoiXHU2Zjg3IiwgDQoiXHU2ZDllIjoiXHU2ZGY2IiwgDQoiXHU2ZDlmIjoiXHU2ZjIzIiwgDQoiXHU2ZGEwIjoiXHU2ZjdmIiwgDQoiXHU2ZGExIjoiXHU2ZTI2IiwgDQoiXHU2ZGEyIjoiXHU2ZWIzIiwgDQoiXHU2ZGEzIjoiXHU2ZTE5IiwgDQoiXHU2ZGE0IjoiXHU2ZWNjIiwgDQoiXHU2ZGE2IjoiXHU2ZjY0IiwgDQoiXHU2ZGE3IjoiXHU2Zjk3IiwgDQoiXHU2ZGE4IjoiXHU2ZjMyIiwgDQoiXHU2ZGE5IjoiXHU2ZjgwIiwgDQoiXHU2ZTBhIjoiXHU2ZGY1IiwgDQoiXHU2ZTBjIjoiXHU2ZGU1IiwgDQoiXHU2ZTBkIjoiXHU2ZjJjIiwgDQoiXHU2ZTBlIjoiXHU3MDA2IiwgDQoiXHU2ZTEwIjoiXHU2ZjM4IiwgDQoiXHU2ZTExIjoiXHU2ZmEwIiwgDQoiXHU2ZTE0IjoiXHU2ZjAxIiwgDQoiXHU2ZTE2IjoiXHU3MDBiIiwgDQoiXHU2ZTE3IjoiXHU2ZWYyIiwgDQoiXHU2ZTI5IjoiXHU2ZWFiIiwgDQoiXHU2ZTdlIjoiXHU3MDYzIiwgDQoiXHU2ZTdmIjoiXHU2ZmQ1IiwgDQoiXHU2ZTgzIjoiXHU2ZjcwIiwgDQoiXHU2ZTg1IjoiXHU2ZmZhIiwgDQoiXHU2ZTg2IjoiXHU2ZjM1IiwgDQoiXHU2ZTg3IjoiXHU2ZjBhIiwgDQoiXHU2ZWJjIjoiXHU2ZmQ1IiwgDQoiXHU2ZWQ3IjoiXHU2Zjc3IiwgDQoiXHU2ZWRhIjoiXHU2ZWZlIiwgDQoiXHU2ZWRlIjoiXHU2ZWVmIiwgDQoiXHU2ZWRmIjoiXHU3MDY5IiwgDQoiXHU2ZWUwIjoiXHU3MDQ0IiwgDQoiXHU2ZWUxIjoiXHU2ZWZmIiwgDQoiXHU2ZWUyIjoiXHU3MDA1IiwgDQoiXHU2ZWU0IjoiXHU2ZmZlIiwgDQoiXHU2ZWU1IjoiXHU2ZmViIiwgDQoiXHU2ZWU2IjoiXHU3MDY0IiwgDQoiXHU2ZWU4IjoiXHU2ZmYxIiwgDQoiXHU2ZWU5IjoiXHU3MDU4IiwgDQoiXHU2ZWVhIjoiXHU2ZmE2IiwgDQoiXHU2ZjQ2IjoiXHU3MDIwIiwgDQoiXHU2ZjQ3IjoiXHU3MDFmIiwgDQoiXHU2ZjRiIjoiXHU3MDMyIiwgDQoiXHU2ZjRkIjoiXHU2ZmYwIiwgDQoiXHU2ZjVjIjoiXHU2ZjViIiwgDQoiXHU2Zjc0IjoiXHU3MDI2IiwgDQoiXHU2ZjljIjoiXHU3MDNlIiwgDQoiXHU2ZmQxIjoiXHU3MDI4IiwgDQoiXHU2ZmQyIjoiXHU3MDE1IiwgDQoiXHU3MDRmIjoiXHU3MDVkIiwgDQoiXHU3MDZkIjoiXHU2ZWM1IiwgDQoiXHU3MDZmIjoiXHU3MWM4IiwgDQoiXHU3MDc1IjoiXHU5NzQ4IiwgDQoiXHU3MDdlIjoiXHU3MDdkIiwgDQoiXHU3MDdmIjoiXHU3MWU2IiwgDQoiXHU3MDgwIjoiXHU3MTZjIiwgDQoiXHU3MDg5IjoiXHU3MjEwIiwgDQoiXHU3MDk2IjoiXHU3MWM5IiwgDQoiXHU3MDljIjoiXHU3MTUyIiwgDQoiXHU3MDlkIjoiXHU3MTk3IiwgDQoiXHU3MGE0IjoiXHU3MTY3IiwgDQoiXHU3MGI5IjoiXHU5ZWRlIiwgDQoiXHU3MGJjIjoiXHU3MTQ5IiwgDQoiXHU3MGJkIjoiXHU3MWJlIiwgDQoiXHU3MGMxIjoiXHU3MjBkIiwgDQoiXHU3MGMyIjoiXHU3MjFiIiwgDQoiXHU3MGMzIjoiXHU3MGY0IiwgDQoiXHU3MGRiIjoiXHU3MWVkIiwgDQoiXHU3MGRmIjoiXHU3MTU5IiwgDQoiXHU3MGU2IjoiXHU3MTY5IiwgDQoiXHU3MGU3IjoiXHU3MWQyIiwgDQoiXHU3MGU4IjoiXHU3MWMxIiwgDQoiXHU3MGU5IjoiXHU3MWY0IiwgDQoiXHU3MGViIjoiXHU3MWQ5IiwgDQoiXHU3MGVjIjoiXHU3MWZjIiwgDQoiXHU3MGVkIjoiXHU3MWIxIiwgDQoiXHU3MTE1IjoiXHU3MTY1IiwgDQoiXHU3MTE2IjoiXHU3MWRjIiwgDQoiXHU3MTE4IjoiXHU3MWZlIiwgDQoiXHU3MTQ1IjoiXHU5MzViIiwgDQoiXHU3MjMxIjoiXHU2MTFiIiwgDQoiXHU3MjMyIjoiXHU3MGJhIiwgDQoiXHU3MjM3IjoiXHU3MjNhIiwgDQoiXHU3MjQwIjoiXHU1ZThhIiwgDQoiXHU3MjRkIjoiXHU3MjU4IiwgDQoiXHU3MjY2IjoiXHU3MjliIiwgDQoiXHU3Mjc1IjoiXHU3MjdkIiwgDQoiXHU3MjdhIjoiXHU3MmE3IiwgDQoiXHU3MjhhIjoiXHU3MmEyIiwgDQoiXHU3MmI2IjoiXHU3MmMwIiwgDQoiXHU3MmI3IjoiXHU3Mzc3IiwgDQoiXHU3MmI4IjoiXHU3MzQxIiwgDQoiXHU3MmI5IjoiXHU3MzM2IiwgDQoiXHU3MmM4IjoiXHU3MmZkIiwgDQoiXHU3MmRkIjoiXHU3MzZlIiwgDQoiXHU3MmRlIjoiXHU3MzcwIiwgDQoiXHU3MmVjIjoiXHU3MzY4IiwgDQoiXHU3MmVkIjoiXHU3MmY5IiwgDQoiXHU3MmVlIjoiXHU3MzQ1IiwgDQoiXHU3MmVmIjoiXHU3MzZhIiwgDQoiXHU3MmYwIjoiXHU3MzE5IiwgDQoiXHU3MmYxIjoiXHU3MzQ0IiwgDQoiXHU3MmYyIjoiXHU3MzNiIiwgDQoiXHU3MzAzIjoiXHU3MzZiIiwgDQoiXHU3MzBlIjoiXHU3Mzc1IiwgDQoiXHU3MzE1IjoiXHU3MzdjIiwgDQoiXHU3MzIxIjoiXHU3MzgwIiwgDQoiXHU3MzJhIjoiXHU4YzZjIiwgDQoiXHU3MzJiIjoiXHU4YzkzIiwgDQoiXHU3MzJjIjoiXHU4NzVmIiwgDQoiXHU3MzJlIjoiXHU3MzdiIiwgDQoiXHU3MzQzIjoiXHU1NDQ2IiwgDQoiXHU3MzZkIjoiXHU3MzdhIiwgDQoiXHU3MzkxIjoiXHU3NGEzIiwgDQoiXHU3MzliIjoiXHU3NDZhIiwgDQoiXHU3M2FlIjoiXHU3NDRiIiwgDQoiXHU3M2FmIjoiXHU3NGIwIiwgDQoiXHU3M2IwIjoiXHU3M2ZlIiwgDQoiXHU3M2IxIjoiXHU3NDcyIiwgDQoiXHU3M2JhIjoiXHU3NGJkIiwgDQoiXHU3M2M5IjoiXHU3MzlmIiwgDQoiXHU3M2NmIjoiXHU3M2E4IiwgDQoiXHU3M2QwIjoiXHU3NDNhIiwgDQoiXHU3M2QxIjoiXHU3NGNmIiwgDQoiXHU3M2YyIjoiXHU3NDNmIiwgDQoiXHU3NDBlIjoiXHU3NGExIiwgDQoiXHU3NDBmIjoiXHU3NDg5IiwgDQoiXHU3NDEwIjoiXHU3NDYzIiwgDQoiXHU3NDJmIjoiXHU3YmExIiwgDQoiXHU3NDNjIjoiXHU3NGNhIiwgDQoiXHU3NDc2IjoiXHU3NDY0IiwgDQoiXHU3NDc3IjoiXHU3NGE2IiwgDQoiXHU3NDhlIjoiXHU3NGQ0IiwgDQoiXHU3NGQyIjoiXHU3NGRhIiwgDQoiXHU3NGVlIjoiXHU3NTE1IiwgDQoiXHU3NGVmIjoiXHU3NTBjIiwgDQoiXHU3NTIzIjoiXHU3NTIyIiwgDQoiXHU3NTM1IjoiXHU5NmZiIiwgDQoiXHU3NTNiIjoiXHU3NTZiIiwgDQoiXHU3NTQ1IjoiXHU2NmEyIiwgDQoiXHU3NTcyIjoiXHU3NTZjIiwgDQoiXHU3NTc0IjoiXHU3NTg3IiwgDQoiXHU3NTk2IjoiXHU3NjY0IiwgDQoiXHU3NTk3IjoiXHU3NjQyIiwgDQoiXHU3NTlmIjoiXHU3NjI3IiwgDQoiXHU3NWEwIjoiXHU3NjU4IiwgDQoiXHU3NWExIjoiXHU3NjBkIiwgDQoiXHU3NWFjIjoiXHU3NjY3IiwgDQoiXHU3NWFlIjoiXHU3NjIxIiwgDQoiXHU3NWFmIjoiXHU3NjBiIiwgDQoiXHU3NWIxIjoiXHU3NmIwIiwgDQoiXHU3NWI0IjoiXHU3NWZlIiwgDQoiXHU3NWM4IjoiXHU3NjcwIiwgDQoiXHU3NWM5IjoiXHU3NWQ5IiwgDQoiXHU3NWQyIjoiXHU3NjYyIiwgDQoiXHU3NWQ2IjoiXHU3NjAyIiwgDQoiXHU3NWU4IjoiXHU3NjQ2IiwgDQoiXHU3NWVhIjoiXHU3NjEzIiwgDQoiXHU3NWViIjoiXHU3NjQ3IiwgDQoiXHU3NWY5IjoiXHU3NWZhIiwgDQoiXHU3NjA1IjoiXHU3NjQ5IiwgDQoiXHU3NjE3IjoiXHU3NjFlIiwgDQoiXHU3NjE4IjoiXHU3NjNiIiwgDQoiXHU3NjJhIjoiXHU3NjVmIiwgDQoiXHU3NjJiIjoiXHU3NjcxIiwgDQoiXHU3NjNlIjoiXHU3NjZlIiwgDQoiXHU3NjNmIjoiXHU3NjZkIiwgDQoiXHU3NjVlIjoiXHU3NjY5IiwgDQoiXHU3NjYxIjoiXHU3NWY0IiwgDQoiXHU3NjYzIjoiXHU3NjZjIiwgDQoiXHU3NjZiIjoiXHU3NjcyIiwgDQoiXHU3NjkxIjoiXHU3NjlhIiwgDQoiXHU3NmIwIjoiXHU3NWIxIiwgDQoiXHU3NmIxIjoiXHU3NmJhIiwgDQoiXHU3NmIyIjoiXHU3NmI4IiwgDQoiXHU3NmNmIjoiXHU3NmRlIiwgDQoiXHU3NmQwIjoiXHU5ZTdkIiwgDQoiXHU3NmQxIjoiXHU3NmUzIiwgDQoiXHU3NmQ2IjoiXHU4NGNiIiwgDQoiXHU3NmQ3IjoiXHU3NmRjIiwgDQoiXHU3NmQ4IjoiXHU3NmU0IiwgDQoiXHU3NzBkIjoiXHU3Nzk4IiwgDQoiXHU3NzBlIjoiXHU4OTk2IiwgDQoiXHU3NzI2IjoiXHU3NzI1IiwgDQoiXHU3NzJjIjoiXHU3N2QzIiwgDQoiXHU3NzQwIjoiXHU4NDU3IiwgDQoiXHU3NzQxIjoiXHU3NzVjIiwgDQoiXHU3NzUwIjoiXHU3NzVlIiwgDQoiXHU3NzUxIjoiXHU3N2JjIiwgDQoiXHU3NzkyIjoiXHU3NzllIiwgDQoiXHU3N2E5IjoiXHU3N2RhIiwgDQoiXHU3N2ViIjoiXHU3N2VmIiwgDQoiXHU3N2Y2IjoiXHU3OGVmIiwgDQoiXHU3N2ZlIjoiXHU3OTJjIiwgDQoiXHU3N2ZmIjoiXHU3OTI2IiwgDQoiXHU3ODAwIjoiXHU3OGFkIiwgDQoiXHU3ODAxIjoiXHU3OGJjIiwgDQoiXHU3ODE2IjoiXHU3OGRhIiwgDQoiXHU3ODE3IjoiXHU3ODY4IiwgDQoiXHU3ODFhIjoiXHU3ODZmIiwgDQoiXHU3ODFjIjoiXHU3OGI4IiwgDQoiXHU3ODNhIjoiXHU3OTJhIiwgDQoiXHU3ODNiIjoiXHU3OTMxIiwgDQoiXHU3ODNlIjoiXHU3OTJiIiwgDQoiXHU3ODQwIjoiXHU3OTBlIiwgDQoiXHU3ODU1IjoiXHU3OGE5IiwgDQoiXHU3ODU2IjoiXHU3ODY0IiwgDQoiXHU3ODU3IjoiXHU3OGZkIiwgDQoiXHU3ODU5IjoiXHU3OGQxIiwgDQoiXHU3ODVhIjoiXHU3OTA0IiwgDQoiXHU3ODZlIjoiXHU3OGJhIiwgDQoiXHU3ODc3IjoiXHU5ZTdjIiwgDQoiXHU3ODhkIjoiXHU3OTE5IiwgDQoiXHU3ODliIjoiXHU3OGU3IiwgDQoiXHU3ODljIjoiXHU3OGUzIiwgDQoiXHU3OGIxIjoiXHU5ZTdjIiwgDQoiXHU3OTIxIjoiXHU3OTM0IiwgDQoiXHU3OTNjIjoiXHU3OWFlIiwgDQoiXHU3OTRlIjoiXHU3OTk1IiwgDQoiXHU3OTZmIjoiXHU3OThlIiwgDQoiXHU3OTc3IjoiXHU3OWIxIiwgDQoiXHU3OTc4IjoiXHU3OThkIiwgDQoiXHU3OTgwIjoiXHU3YTFmIiwgDQoiXHU3OTg0IjoiXHU3OTdmIiwgDQoiXHU3OTg1IjoiXHU3OWFhIiwgDQoiXHU3OWIwIjoiXHU3OTYyIiwgDQoiXHU3OWJiIjoiXHU5NmUyIiwgDQoiXHU3OWMzIjoiXHU3OWJmIiwgDQoiXHU3OWM2IjoiXHU3YTA4IiwgDQoiXHU3OWNkIjoiXHU3YTJlIiwgDQoiXHU3OWVmIjoiXHU3YTRkIiwgDQoiXHU3OWYwIjoiXHU3YTMxIiwgDQoiXHU3OWZkIjoiXHU3YTYyIiwgDQoiXHU3YTBlIjoiXHU3YTA1IiwgDQoiXHU3YTIzIjoiXHU3YTRjIiwgDQoiXHU3YTJkIjoiXHU3OWY4IiwgDQoiXHU3YTMzIjoiXHU3YTY5IiwgDQoiXHU3YTUxIjoiXHU3YTYxIiwgDQoiXHU3YTc3IjoiXHU3YWFlIiwgDQoiXHU3YTgzIjoiXHU3YWNhIiwgDQoiXHU3YThkIjoiXHU3YWM1IiwgDQoiXHU3YThlIjoiXHU3YWI1IiwgDQoiXHU3YTkxIjoiXHU3YWFmIiwgDQoiXHU3YTljIjoiXHU3YWM0IiwgDQoiXHU3YTlkIjoiXHU3YWE5IiwgDQoiXHU3YWE1IjoiXHU3YWJhIiwgDQoiXHU3YWE2IjoiXHU3YWM3IiwgDQoiXHU3YWFkIjoiXHU3YWI2IiwgDQoiXHU3YWQ2IjoiXHU4YzRlIiwgDQoiXHU3YWRlIjoiXHU3YWY2IiwgDQoiXHU3YjAzIjoiXHU3YmU0IiwgDQoiXHU3YjBiIjoiXHU3YjRkIiwgDQoiXHU3YjE0IjoiXHU3YjQ2IiwgDQoiXHU3YjE1IjoiXHU3YjY3IiwgDQoiXHU3YjNhIjoiXHU3YjhiIiwgDQoiXHU3YjNjIjoiXHU3YzYwIiwgDQoiXHU3YjNlIjoiXHU3YzY5IiwgDQoiXHU3YjUxIjoiXHU3YmM5IiwgDQoiXHU3YjVhIjoiXHU3YmYzIiwgDQoiXHU3YjViIjoiXHU3YmU5IiwgDQoiXHU3YjVkIjoiXHU3YjhmIiwgDQoiXHU3Yjc5IjoiXHU3YzRjIiwgDQoiXHU3YjdlIjoiXHU3YzNkIiwgDQoiXHU3YjgwIjoiXHU3YzIxIiwgDQoiXHU3YjkzIjoiXHU3YzU5IiwgDQoiXHU3YmE2IjoiXHU3YzAwIiwgDQoiXHU3YmE3IjoiXHU3YmNiIiwgDQoiXHU3YmE4IjoiXHU3YzVjIiwgDQoiXHU3YmE5IjoiXHU3YzZlIiwgDQoiXHU3YmFhIjoiXHU3YzFlIiwgDQoiXHU3YmFiIjoiXHU3YzJiIiwgDQoiXHU3YmQxIjoiXHU3YzIzIiwgDQoiXHU3YmQzIjoiXHU3YzBkIiwgDQoiXHU3YmVlIjoiXHU3YzQzIiwgDQoiXHU3YmYxIjoiXHU3YzZjIiwgDQoiXHU3YzE2IjoiXHU3YzZhIiwgDQoiXHU3YzQxIjoiXHU3YzVmIiwgDQoiXHU3Yzc0IjoiXHU3Y2Y0IiwgDQoiXHU3YzdiIjoiXHU5ODVlIiwgDQoiXHU3YzdjIjoiXHU3OWM4IiwgDQoiXHU3YzljIjoiXHU3Y2Y2IiwgDQoiXHU3YzlkIjoiXHU3Y2YyIiwgDQoiXHU3Y2E0IjoiXHU3Y2I1IiwgDQoiXHU3Y2FhIjoiXHU3Y2RlIiwgDQoiXHU3Y2FlIjoiXHU3Y2U3IiwgDQoiXHU3Y2MxIjoiXHU3Y2RkIiwgDQoiXHU3Y2M3IjoiXHU5OTMxIiwgDQoiXHU3Y2NkIjoiXHU5OTA4IiwgDQoiXHU3ZDI1IjoiXHU3ZDJlIiwgDQoiXHU3ZDI3IjoiXHU3ZGNhIiwgDQoiXHU3ZDc3IjoiXHU3ZTM2IiwgDQoiXHU3ZGFiIjoiXHU3ZGRhIiwgDQoiXHU3ZWEwIjoiXHU3Y2ZlIiwgDQoiXHU3ZWExIjoiXHU3ZDA2IiwgDQoiXHU3ZWEyIjoiXHU3ZDA1IiwgDQoiXHU3ZWEzIjoiXHU3ZDAyIiwgDQoiXHU3ZWE0IjoiXHU3ZTk2IiwgDQoiXHU3ZWE1IjoiXHU3ZDA3IiwgDQoiXHU3ZWE2IjoiXHU3ZDA0IiwgDQoiXHU3ZWE3IjoiXHU3ZDFhIiwgDQoiXHU3ZWE4IjoiXHU3ZDA4IiwgDQoiXHU3ZWE5IjoiXHU3ZThhIiwgDQoiXHU3ZWFhIjoiXHU3ZDAwIiwgDQoiXHU3ZWFiIjoiXHU3ZDA5IiwgDQoiXHU3ZWFjIjoiXHU3ZGVmIiwgDQoiXHU3ZWFkIjoiXHU3ZDFjIiwgDQoiXHU3ZWFlIjoiXHU3ZDE4IiwgDQoiXHU3ZWFmIjoiXHU3ZDE0IiwgDQoiXHU3ZWIwIjoiXHU3ZDE1IiwgDQoiXHU3ZWIxIjoiXHU3ZDE3IiwgDQoiXHU3ZWIyIjoiXHU3ZGIxIiwgDQoiXHU3ZWIzIjoiXHU3ZDBkIiwgDQoiXHU3ZWI0IjoiXHU3ZDFkIiwgDQoiXHU3ZWI1IjoiXHU3ZTMxIiwgDQoiXHU3ZWI2IjoiXHU3ZGI4IiwgDQoiXHU3ZWI3IjoiXHU3ZDFiIiwgDQoiXHU3ZWI4IjoiXHU3ZDE5IiwgDQoiXHU3ZWI5IjoiXHU3ZDBiIiwgDQoiXHU3ZWJhIjoiXHU3ZDIxIiwgDQoiXHU3ZWJjIjoiXHU3ZDE2IiwgDQoiXHU3ZWJkIjoiXHU3ZDEwIiwgDQoiXHU3ZWJlIjoiXHU3ZDEzIiwgDQoiXHU3ZWJmIjoiXHU3ZGRhIiwgDQoiXHU3ZWMwIjoiXHU3ZDNhIiwgDQoiXHU3ZWMxIjoiXHU3ZDMyIiwgDQoiXHU3ZWMyIjoiXHU3ZDMxIiwgDQoiXHU3ZWMzIjoiXHU3ZGY0IiwgDQoiXHU3ZWM0IjoiXHU3ZDQ0IiwgDQoiXHU3ZWM1IjoiXHU3ZDMzIiwgDQoiXHU3ZWM2IjoiXHU3ZDMwIiwgDQoiXHU3ZWM3IjoiXHU3ZTU0IiwgDQoiXHU3ZWM4IjoiXHU3ZDQyIiwgDQoiXHU3ZWM5IjoiXHU3ZTEwIiwgDQoiXHU3ZWNhIjoiXHU3ZDQ2IiwgDQoiXHU3ZWNiIjoiXHU3ZDNjIiwgDQoiXHU3ZWNjIjoiXHU3ZDQwIiwgDQoiXHU3ZWNkIjoiXHU3ZDM5IiwgDQoiXHU3ZWNlIjoiXHU3ZTc5IiwgDQoiXHU3ZWNmIjoiXHU3ZDkzIiwgDQoiXHU3ZWQwIjoiXHU3ZDNmIiwgDQoiXHU3ZWQxIjoiXHU3ZDgxIiwgDQoiXHU3ZWQyIjoiXHU3ZDY4IiwgDQoiXHU3ZWQzIjoiXHU3ZDUwIiwgDQoiXHU3ZWQ0IjoiXHU3ZDVkIiwgDQoiXHU3ZWQ1IjoiXHU3ZTVlIiwgDQoiXHU3ZWQ2IjoiXHU3ZDcwIiwgDQoiXHU3ZWQ3IjoiXHU3ZDRlIiwgDQoiXHU3ZWQ4IjoiXHU3ZTZhIiwgDQoiXHU3ZWQ5IjoiXHU3ZDY2IiwgDQoiXHU3ZWRhIjoiXHU3ZDYyIiwgDQoiXHU3ZWRiIjoiXHU3ZDczIiwgDQoiXHU3ZWRjIjoiXHU3ZDYxIiwgDQoiXHU3ZWRkIjoiXHU3ZDU1IiwgDQoiXHU3ZWRlIjoiXHU3ZDVlIiwgDQoiXHU3ZWRmIjoiXHU3ZDcxIiwgDQoiXHU3ZWUwIjoiXHU3ZDg2IiwgDQoiXHU3ZWUxIjoiXHU3ZDgzIiwgDQoiXHU3ZWUyIjoiXHU3ZDc5IiwgDQoiXHU3ZWUzIjoiXHU3ZTYxIiwgDQoiXHU3ZWU1IjoiXHU3ZDhmIiwgDQoiXHU3ZWU2IjoiXHU3ZDViIiwgDQoiXHU3ZWU3IjoiXHU3ZTdjIiwgDQoiXHU3ZWU4IjoiXHU3ZDg4IiwgDQoiXHU3ZWU5IjoiXHU3ZTNlIiwgDQoiXHU3ZWVhIjoiXHU3ZGQyIiwgDQoiXHU3ZWViIjoiXHU3ZGJlIiwgDQoiXHU3ZWVkIjoiXHU3ZThjIiwgDQoiXHU3ZWVlIjoiXHU3ZGJhIiwgDQoiXHU3ZWVmIjoiXHU3ZGNiIiwgDQoiXHU3ZWYwIjoiXHU3ZGJkIiwgDQoiXHU3ZWYxIjoiXHU3ZGQ0IiwgDQoiXHU3ZWYyIjoiXHU3ZGM0IiwgDQoiXHU3ZWYzIjoiXHU3ZTY5IiwgDQoiXHU3ZWY0IjoiXHU3ZGFkIiwgDQoiXHU3ZWY1IjoiXHU3ZGJmIiwgDQoiXHU3ZWY2IjoiXHU3ZGFjIiwgDQoiXHU3ZWY3IjoiXHU3ZTQzIiwgDQoiXHU3ZWY4IjoiXHU3ZGEyIiwgDQoiXHU3ZWZhIjoiXHU3ZGI5IiwgDQoiXHU3ZWZiIjoiXHU3ZGEzIiwgDQoiXHU3ZWZjIjoiXHU3ZDljIiwgDQoiXHU3ZWZkIjoiXHU3ZGJiIiwgDQoiXHU3ZWZlIjoiXHU3ZGIwIiwgDQoiXHU3ZWZmIjoiXHU3ZGEwIiwgDQoiXHU3ZjAwIjoiXHU3ZGI0IiwgDQoiXHU3ZjAxIjoiXHU3ZGM3IiwgDQoiXHU3ZjAyIjoiXHU3ZGQ5IiwgDQoiXHU3ZjAzIjoiXHU3ZGQ3IiwgDQoiXHU3ZjA0IjoiXHU3ZGQ4IiwgDQoiXHU3ZjA1IjoiXHU3ZGVjIiwgDQoiXHU3ZjA2IjoiXHU3ZTljIiwgDQoiXHU3ZjA3IjoiXHU3ZGY5IiwgDQoiXHU3ZjA4IjoiXHU3ZGYyIiwgDQoiXHU3ZjA5IjoiXHU3ZGRkIiwgDQoiXHU3ZjBhIjoiXHU3ZTE1IiwgDQoiXHU3ZjBiIjoiXHU3ZTYyIiwgDQoiXHU3ZjBjIjoiXHU3ZGU2IiwgDQoiXHU3ZjBkIjoiXHU3ZDllIiwgDQoiXHU3ZjBlIjoiXHU3ZGRlIiwgDQoiXHU3ZjBmIjoiXHU3ZGY2IiwgDQoiXHU3ZjExIjoiXHU3ZGYxIiwgDQoiXHU3ZjEyIjoiXHU3ZTBiIiwgDQoiXHU3ZjEzIjoiXHU3ZGU5IiwgDQoiXHU3ZjE0IjoiXHU3ZGUwIiwgDQoiXHU3ZjE1IjoiXHU3ZTM3IiwgDQoiXHU3ZjE2IjoiXHU3ZGU4IiwgDQoiXHU3ZjE3IjoiXHU3ZGUxIiwgDQoiXHU3ZjE4IjoiXHU3ZGUzIiwgDQoiXHU3ZjE5IjoiXHU3ZTA5IiwgDQoiXHU3ZjFhIjoiXHU3ZTFiIiwgDQoiXHU3ZjFiIjoiXHU3ZTFmIiwgDQoiXHU3ZjFjIjoiXHU3ZTFkIiwgDQoiXHU3ZjFkIjoiXHU3ZTJiIiwgDQoiXHU3ZjFlIjoiXHU3ZTE3IiwgDQoiXHU3ZjFmIjoiXHU3ZTFlIiwgDQoiXHU3ZjIwIjoiXHU3ZThmIiwgDQoiXHU3ZjIxIjoiXHU3ZTJkIiwgDQoiXHU3ZjIyIjoiXHU3ZTBhIiwgDQoiXHU3ZjIzIjoiXHU3ZTExIiwgDQoiXHU3ZjI0IjoiXHU3ZTdkIiwgDQoiXHU3ZjI1IjoiXHU3ZTM5IiwgDQoiXHU3ZjI2IjoiXHU3ZTM1IiwgDQoiXHU3ZjI3IjoiXHU3ZTMyIiwgDQoiXHU3ZjI4IjoiXHU3ZTkzIiwgDQoiXHU3ZjI5IjoiXHU3ZTJlIiwgDQoiXHU3ZjJhIjoiXHU3ZTQ2IiwgDQoiXHU3ZjJiIjoiXHU3ZTQ1IiwgDQoiXHU3ZjJjIjoiXHU3ZTg4IiwgDQoiXHU3ZjJkIjoiXHU3ZTVhIiwgDQoiXHU3ZjJlIjoiXHU3ZTU1IiwgDQoiXHU3ZjJmIjoiXHU3ZTUyIiwgDQoiXHU3ZjMwIjoiXHU5N2MxIiwgDQoiXHU3ZjMxIjoiXHU3ZTdlIiwgDQoiXHU3ZjMyIjoiXHU3ZTcwIiwgDQoiXHU3ZjMzIjoiXHU3ZTZmIiwgDQoiXHU3ZjM0IjoiXHU3ZTczIiwgDQoiXHU3ZjM1IjoiXHU3ZTk4IiwgDQoiXHU3ZjQyIjoiXHU3ZjRjIiwgDQoiXHU3ZjRlIjoiXHU3ZjQ4IiwgDQoiXHU3ZjUxIjoiXHU3ZGIyIiwgDQoiXHU3ZjU3IjoiXHU3Zjg1IiwgDQoiXHU3ZjVhIjoiXHU3ZjcwIiwgDQoiXHU3ZjYyIjoiXHU3Zjc3IiwgDQoiXHU3Zjc0IjoiXHU3Zjg2IiwgDQoiXHU3ZjgxIjoiXHU3Zjg4IiwgDQoiXHU3ZjlmIjoiXHU3ZmE1IiwgDQoiXHU3ZmExIjoiXHU3ZmE4IiwgDQoiXHU3ZmQ4IjoiXHU3ZmY5IiwgDQoiXHU3ZmRhIjoiXHU3ZmVjIiwgDQoiXHU4MDIyIjoiXHU4MDJlIiwgDQoiXHU4MDI3IjoiXHU4MDJjIiwgDQoiXHU4MDM4IjoiXHU4MDczIiwgDQoiXHU4MDNiIjoiXHU2MDY1IiwgDQoiXHU4MDQyIjoiXHU4MDc2IiwgDQoiXHU4MDRiIjoiXHU4MDdlIiwgDQoiXHU4MDRjIjoiXHU4MDc3IiwgDQoiXHU4MDRkIjoiXHU4MDc5IiwgDQoiXHU4MDU0IjoiXHU4MDZmIiwgDQoiXHU4MDY5IjoiXHU4MDc1IiwgDQoiXHU4MDZhIjoiXHU4MDcwIiwgDQoiXHU4MDgwIjoiXHU4MDdmIiwgDQoiXHU4MDgzIjoiXHU4MDg1IiwgDQoiXHU4MGEwIjoiXHU4MTc4IiwgDQoiXHU4MGE0IjoiXHU4MTlhIiwgDQoiXHU4MGFlIjoiXHU5YWFmIiwgDQoiXHU4MGJlIjoiXHU4MTRlIiwgDQoiXHU4MGJmIjoiXHU4MTZiIiwgDQoiXHU4MGMwIjoiXHU4MTM5IiwgDQoiXHU4MGMxIjoiXHU4MTA1IiwgDQoiXHU4MGM2IjoiXHU4MWJkIiwgDQoiXHU4MGRjIjoiXHU1MmRkIiwgDQoiXHU4MGU3IjoiXHU2NzI3IiwgDQoiXHU4MGU4IjoiXHU4MTU2IiwgDQoiXHU4MGVhIjoiXHU4MWRhIiwgDQoiXHU4MGViIjoiXHU4MTFiIiwgDQoiXHU4MGY2IjoiXHU4MWEwIiwgDQoiXHU4MTA5IjoiXHU4MTA4IiwgDQoiXHU4MTBkIjoiXHU4MWJlIiwgDQoiXHU4MTBmIjoiXHU5YWQyIiwgDQoiXHU4MTEwIjoiXHU4MWNkIiwgDQoiXHU4MTExIjoiXHU4MTY2IiwgDQoiXHU4MTEzIjoiXHU4MWJmIiwgDQoiXHU4MTE0IjoiXHU4MWUwIiwgDQoiXHU4MTFhIjoiXHU4MTczIiwgDQoiXHU4MTIzIjoiXHU1NTA3IiwgDQoiXHU4MTI5IjoiXHU0ZmVlIiwgDQoiXHU4MTMxIjoiXHU4MTJiIiwgDQoiXHU4MTM2IjoiXHU4MTYxIiwgDQoiXHU4MTM4IjoiXHU4MWM5IiwgDQoiXHU4MTRhIjoiXHU4MWQ4IiwgDQoiXHU4MTRjIjoiXHU5MTgzIiwgDQoiXHU4MTU4IjoiXHU4MTk1IiwgDQoiXHU4MTZkIjoiXHU5ODRlIiwgDQoiXHU4MTdiIjoiXHU4MWE5IiwgDQoiXHU4MTdjIjoiXHU5NzY2IiwgDQoiXHU4MTdkIjoiXHU4MTgzIiwgDQoiXHU4MTdlIjoiXHU5YTMwIiwgDQoiXHU4MTkxIjoiXHU4MWNmIiwgDQoiXHU4MWJiIjoiXHU3ZmI2IiwgDQoiXHU4MWRjIjoiXHU4MWUyIiwgDQoiXHU4MjA2IjoiXHU4ZjNmIiwgDQoiXHU4MjIzIjoiXHU4MjY0IiwgDQoiXHU4MjMwIjoiXHU4MjY2IiwgDQoiXHU4MjMxIjoiXHU4MjU5IiwgDQoiXHU4MjNiIjoiXHU4MjZiIiwgDQoiXHU4MjcwIjoiXHU4MjcxIiwgDQoiXHU4MjczIjoiXHU4YzU0IiwgDQoiXHU4MjdhIjoiXHU4NWRkIiwgDQoiXHU4MjgyIjoiXHU3YmMwIiwgDQoiXHU4Mjg4IjoiXHU3ZjhiIiwgDQoiXHU4Mjk3IjoiXHU4NThjIiwgDQoiXHU4MjljIjoiXHU4NTZhIiwgDQoiXHU4MmE2IjoiXHU4NjA2IiwgDQoiXHU4MmMxIjoiXHU4NGVmIiwgDQoiXHU4MmM3IjoiXHU4NDY2IiwgDQoiXHU4MmM4IjoiXHU4NWY2IiwgDQoiXHU4MmNiIjoiXHU4M2E3IiwgDQoiXHU4MmNjIjoiXHU4NDA3IiwgDQoiXHU4MmNkIjoiXHU4NGJjIiwgDQoiXHU4MmNlIjoiXHU4MmU3IiwgDQoiXHU4MmNmIjoiXHU4NjA3IiwgDQoiXHU4MmY5IjoiXHU4NjBiIiwgDQoiXHU4MzBlIjoiXHU4Mzk2IiwgDQoiXHU4MzBmIjoiXHU4NjIyIiwgDQoiXHU4MzExIjoiXHU4NTI2IiwgDQoiXHU4MzE0IjoiXHU1ODRiIiwgDQoiXHU4MzE1IjoiXHU3MTYyIiwgDQoiXHU4MzI3IjoiXHU3ZTZkIiwgDQoiXHU4MzQ2IjoiXHU4MzRhIiwgDQoiXHU4MzUwIjoiXHU4NWE2IiwgDQoiXHU4MzVhIjoiXHU4M2EyIiwgDQoiXHU4MzViIjoiXHU4NTU4IiwgDQoiXHU4MzVjIjoiXHU4NGZkIiwgDQoiXHU4MzVlIjoiXHU4NTRlIiwgDQoiXHU4MzVmIjoiXHU4NTg4IiwgDQoiXHU4MzYwIjoiXHU4NWJhIiwgDQoiXHU4MzYxIjoiXHU4NTY5IiwgDQoiXHU4MzYzIjoiXHU2OWFlIiwgDQoiXHU4MzY0IjoiXHU4NDc3IiwgDQoiXHU4MzY1IjoiXHU2ZWNlIiwgDQoiXHU4MzY2IjoiXHU3Mjk2IiwgDQoiXHU4MzY3IjoiXHU3MTkyIiwgDQoiXHU4MzY4IjoiXHU4NTQxIiwgDQoiXHU4MzY5IjoiXHU4NWNlIiwgDQoiXHU4MzZhIjoiXHU4NGMwIiwgDQoiXHU4MzZiIjoiXHU4NTJkIiwgDQoiXHU4MzZjIjoiXHU4NTUyIiwgDQoiXHU4MzZkIjoiXHU4NDUyIiwgDQoiXHU4MzZlIjoiXHU4NDY0IiwgDQoiXHU4MzZmIjoiXHU4NWU1IiwgDQoiXHU4Mzg1IjoiXHU4NDllIiwgDQoiXHU4M2IxIjoiXHU4NDBhIiwgDQoiXHU4M2IyIjoiXHU4NGVlIiwgDQoiXHU4M2IzIjoiXHU4NDk0IiwgDQoiXHU4M2I0IjoiXHU4NDM1IiwgDQoiXHU4M2I2IjoiXHU4NTlmIiwgDQoiXHU4M2I3IjoiXHU3MzcyIiwgDQoiXHU4M2I4IjoiXHU4NTU1IiwgDQoiXHU4M2I5IjoiXHU3NDY5IiwgDQoiXHU4M2JhIjoiXHU5ZGFmIiwgDQoiXHU4M2JjIjoiXHU4NGY0IiwgDQoiXHU4NDFhIjoiXHU4NjAwIiwgDQoiXHU4NDFkIjoiXHU4NjNmIiwgDQoiXHU4NDI0IjoiXHU4N2EyIiwgDQoiXHU4NDI1IjoiXHU3MWRmIiwgDQoiXHU4NDI2IjoiXHU3ZTA4IiwgDQoiXHU4NDI3IjoiXHU4NTZkIiwgDQoiXHU4NDI4IjoiXHU4NWE5IiwgDQoiXHU4NDU3IjoiXHU4NDU3IiwgDQoiXHU4NDZmIjoiXHU4NWU1IiwgDQoiXHU4NDcxIjoiXHU4NTI1IiwgDQoiXHU4NDg3IjoiXHU4NTQ2IiwgDQoiXHU4NDg5IjoiXHU4NTYyIiwgDQoiXHU4NDhiIjoiXHU4NTIzIiwgDQoiXHU4NDhjIjoiXHU4NTFlIiwgDQoiXHU4NGRkIjoiXHU4NWNkIiwgDQoiXHU4NGRmIjoiXHU4NThhIiwgDQoiXHU4NGUwIjoiXHU4NjNhIiwgDQoiXHU4NGUzIjoiXHU4NTc3IiwgDQoiXHU4NGU1IjoiXHU5M2EzIiwgDQoiXHU4NGU2IjoiXHU5YTQwIiwgDQoiXHU4NTM0IjoiXHU5ZWJiIiwgDQoiXHU4NTM3IjoiXHU4NTk0IiwgDQoiXHU4NTM5IjoiXHU4NjFlIiwgDQoiXHU4NTNhIjoiXHU4NWZhIiwgDQoiXHU4NTNjIjoiXHU4NWY5IiwgDQoiXHU4NTcyIjoiXHU4NjA0IiwgDQoiXHU4NTc0IjoiXHU4NjBhIiwgDQoiXHU4NWFlIjoiXHU4NWVhIiwgDQoiXHU4NWQzIjoiXHU4NjFhIiwgDQoiXHU4NjE2IjoiXHU4NjE3IiwgDQoiXHU4NjRmIjoiXHU4NjVjIiwgDQoiXHU4NjUxIjoiXHU2MTZlIiwgDQoiXHU4NjVhIjoiXHU4NjViIiwgDQoiXHU4NjZiIjoiXHU4N2YyIiwgDQoiXHU4NjZjIjoiXHU4NjZmIiwgDQoiXHU4NjZlIjoiXHU4N2UzIiwgDQoiXHU4NjcxIjoiXHU4NzY4IiwgDQoiXHU4NjdkIjoiXHU5NmQ2IiwgDQoiXHU4NjdlIjoiXHU4NzY2IiwgDQoiXHU4NjdmIjoiXHU4ODA2IiwgDQoiXHU4NjgwIjoiXHU4NzU1IiwgDQoiXHU4NjgxIjoiXHU4N2ZiIiwgDQoiXHU4NjgyIjoiXHU4NzllIiwgDQoiXHU4Njk1IjoiXHU4ODM2IiwgDQoiXHU4NmFjIjoiXHU4NzA2IiwgDQoiXHU4NmNhIjoiXHU4ODMxIiwgDQoiXHU4NmNlIjoiXHU4ODIzIiwgDQoiXHU4NmNmIjoiXHU4N2Y2IiwgDQoiXHU4NmVlIjoiXHU4ODNiIiwgDQoiXHU4NmYwIjoiXHU4N2M0IiwgDQoiXHU4NmYxIjoiXHU4NmZhIiwgDQoiXHU4NmYyIjoiXHU4N2VmIiwgDQoiXHU4NmYzIjoiXHU4Nzg0IiwgDQoiXHU4NmY0IjoiXHU4ODEwIiwgDQoiXHU4NzE1IjoiXHU4NmZiIiwgDQoiXHU4NzE3IjoiXHU4Nzc4IiwgDQoiXHU4NzIxIjoiXHU4ODFmIiwgDQoiXHU4NzQ3IjoiXHU4ODA1IiwgDQoiXHU4NzQ4IjoiXHU4N2M4IiwgDQoiXHU4NzQ5IjoiXHU4N2VjIiwgDQoiXHU4NzRlIjoiXHU4ODBkIiwgDQoiXHU4NzcwIjoiXHU4NjdhIiwgDQoiXHU4NzdjIjoiXHU4N2JiIiwgDQoiXHU4NzdlIjoiXHU4ODExIiwgDQoiXHU4N2E4IjoiXHU4N2NlIiwgDQoiXHU4N2NmIjoiXHU4ODI4IiwgDQoiXHU4N2VlIjoiXHU4N2ZhIiwgDQoiXHU4ODQ1IjoiXHU5MWMxIiwgDQoiXHU4ODQ2IjoiXHU3NzNlIiwgDQoiXHU4ODU0IjoiXHU5MjljIiwgDQoiXHU4ODY1IjoiXHU4OGRjIiwgDQoiXHU4ODZjIjoiXHU4OTZmIiwgDQoiXHU4ODZlIjoiXHU4ODllIiwgDQoiXHU4ODg0IjoiXHU4OTU2IiwgDQoiXHU4ODg1IjoiXHU4OGNhIiwgDQoiXHU4ODljIjoiXHU4OTZhIiwgDQoiXHU4OGFkIjoiXHU4OTcyIiwgDQoiXHU4OGM1IjoiXHU4OGRkIiwgDQoiXHU4OGM2IjoiXHU4OTYwIiwgDQoiXHU4OGNmIjoiXHU4OGUxIiwgDQoiXHU4OGUyIjoiXHU4OTMzIiwgDQoiXHU4OGUzIjoiXHU4OTVkIiwgDQoiXHU4OGU0IjoiXHU4OTMyIiwgDQoiXHU4OGU1IjoiXHU4OTQ5IiwgDQoiXHU4OTFiIjoiXHU4OTM4IiwgDQoiXHU4OTM0IjoiXHU4OTY0IiwgDQoiXHU4OWMxIjoiXHU4OThiIiwgDQoiXHU4OWMyIjoiXHU4OWMwIiwgDQoiXHU4OWMzIjoiXHU4OThlIiwgDQoiXHU4OWM0IjoiXHU4OThmIiwgDQoiXHU4OWM1IjoiXHU4OTkzIiwgDQoiXHU4OWM2IjoiXHU4OTk2IiwgDQoiXHU4OWM3IjoiXHU4OTk4IiwgDQoiXHU4OWM4IjoiXHU4OWJkIiwgDQoiXHU4OWM5IjoiXHU4OWJhIiwgDQoiXHU4OWNhIjoiXHU4OWFjIiwgDQoiXHU4OWNiIjoiXHU4OWExIiwgDQoiXHU4OWNjIjoiXHU4OWJmIiwgDQoiXHU4OWNlIjoiXHU4OWE2IiwgDQoiXHU4OWNmIjoiXHU4OWFmIiwgDQoiXHU4OWQwIjoiXHU4OWIyIiwgDQoiXHU4OWQxIjoiXHU4OWI3IiwgDQoiXHU4OWRlIjoiXHU4OWY0IiwgDQoiXHU4OWU2IjoiXHU4OWY4IiwgDQoiXHU4OWVmIjoiXHU4OWY2IiwgDQoiXHU4YTNjIjoiXHU4YjQ5IiwgDQoiXHU4YTg5IjoiXHU4YjdkIiwgDQoiXHU4YThhIjoiXHU4YjA0IiwgDQoiXHU4YmExIjoiXHU4YTA4IiwgDQoiXHU4YmEyIjoiXHU4YTAyIiwgDQoiXHU4YmEzIjoiXHU4YTAzIiwgDQoiXHU4YmE0IjoiXHU4YThkIiwgDQoiXHU4YmE1IjoiXHU4YjRmIiwgDQoiXHU4YmE2IjoiXHU4YTEwIiwgDQoiXHU4YmE3IjoiXHU4YTBjIiwgDQoiXHU4YmE4IjoiXHU4YTBlIiwgDQoiXHU4YmE5IjoiXHU4YjkzIiwgDQoiXHU4YmFhIjoiXHU4YTE1IiwgDQoiXHU4YmFiIjoiXHU4YTE2IiwgDQoiXHU4YmFkIjoiXHU4YTEzIiwgDQoiXHU4YmFlIjoiXHU4YjcwIiwgDQoiXHU4YmFmIjoiXHU4YTBhIiwgDQoiXHU4YmIwIjoiXHU4YTE4IiwgDQoiXHU4YmIyIjoiXHU4YjFiIiwgDQoiXHU4YmIzIjoiXHU4YWYxIiwgDQoiXHU4YmI0IjoiXHU4YjMzIiwgDQoiXHU4YmI1IjoiXHU4YTRlIiwgDQoiXHU4YmI2IjoiXHU4YTFkIiwgDQoiXHU4YmI3IjoiXHU4YTI1IiwgDQoiXHU4YmI4IjoiXHU4YTMxIiwgDQoiXHU4YmI5IjoiXHU4YTFiIiwgDQoiXHU4YmJhIjoiXHU4YWQ2IiwgDQoiXHU4YmJiIjoiXHU4YTI5IiwgDQoiXHU4YmJjIjoiXHU4YTFmIiwgDQoiXHU4YmJkIjoiXHU4YWY3IiwgDQoiXHU4YmJlIjoiXHU4YTJkIiwgDQoiXHU4YmJmIjoiXHU4YTJhIiwgDQoiXHU4YmMwIjoiXHU4YTIzIiwgDQoiXHU4YmMxIjoiXHU4YjQ5IiwgDQoiXHU4YmMyIjoiXHU4YTQxIiwgDQoiXHU4YmMzIjoiXHU4YTM2IiwgDQoiXHU4YmM0IjoiXHU4YTU1IiwgDQoiXHU4YmM1IjoiXHU4YTViIiwgDQoiXHU4YmM2IjoiXHU4YjU4IiwgDQoiXHU4YmM3IjoiXHU4YTU3IiwgDQoiXHU4YmM4IjoiXHU4YTUwIiwgDQoiXHU4YmM5IjoiXHU4YTM0IiwgDQoiXHU4YmNhIjoiXHU4YTNhIiwgDQoiXHU4YmNiIjoiXHU4YTQ2IiwgDQoiXHU4YmNjIjoiXHU4YjA1IiwgDQoiXHU4YmNkIjoiXHU4YTVlIiwgDQoiXHU4YmNlIjoiXHU4YTU4IiwgDQoiXHU4YmNmIjoiXHU4YTU0IiwgDQoiXHU4YmQxIjoiXHU4YjZmIiwgDQoiXHU4YmQyIjoiXHU4YTUyIiwgDQoiXHU4YmQzIjoiXHU4YTg2IiwgDQoiXHU4YmQ0IjoiXHU4YTg0IiwgDQoiXHU4YmQ1IjoiXHU4YTY2IiwgDQoiXHU4YmQ2IjoiXHU4YTdmIiwgDQoiXHU4YmQ3IjoiXHU4YTY5IiwgDQoiXHU4YmQ4IjoiXHU4YTcwIiwgDQoiXHU4YmQ5IjoiXHU4YTdjIiwgDQoiXHU4YmRhIjoiXHU4YWEwIiwgDQoiXHU4YmRiIjoiXHU4YTg1IiwgDQoiXHU4YmRjIjoiXHU4YTc1IiwgDQoiXHU4YmRkIjoiXHU4YTcxIiwgDQoiXHU4YmRlIjoiXHU4YTk1IiwgDQoiXHU4YmRmIjoiXHU4YTZjIiwgDQoiXHU4YmUwIjoiXHU4YTZlIiwgDQoiXHU4YmUxIjoiXHU4YTZkIiwgDQoiXHU4YmUyIjoiXHU4YTYyIiwgDQoiXHU4YmUzIjoiXHU4YTYzIiwgDQoiXHU4YmU0IjoiXHU4YWNkIiwgDQoiXHU4YmU1IjoiXHU4YTcyIiwgDQoiXHU4YmU2IjoiXHU4YTczIiwgDQoiXHU4YmU3IjoiXHU4YTZiIiwgDQoiXHU4YmU4IjoiXHU4YWUyIiwgDQoiXHU4YmU5IjoiXHU4YTYxIiwgDQoiXHU4YmViIjoiXHU4YWExIiwgDQoiXHU4YmVjIjoiXHU4YWEzIiwgDQoiXHU4YmVkIjoiXHU4YTllIiwgDQoiXHU4YmVlIjoiXHU4YTlhIiwgDQoiXHU4YmVmIjoiXHU4YWE0IiwgDQoiXHU4YmYwIjoiXHU4YWE1IiwgDQoiXHU4YmYxIjoiXHU4YTk4IiwgDQoiXHU4YmYyIjoiXHU4YWE4IiwgDQoiXHU4YmYzIjoiXHU4YTkxIiwgDQoiXHU4YmY0IjoiXHU4YWFhIiwgDQoiXHU4YmY1IjoiXHU4YWE2IiwgDQoiXHU4YmY2IjoiXHU4YTkyIiwgDQoiXHU4YmY3IjoiXHU4YWNiIiwgDQoiXHU4YmY4IjoiXHU4YWY4IiwgDQoiXHU4YmY5IjoiXHU4YWNmIiwgDQoiXHU4YmZhIjoiXHU4YWZlIiwgDQoiXHU4YmZiIjoiXHU4YjgwIiwgDQoiXHU4YmZjIjoiXHU4YWQxIiwgDQoiXHU4YmZkIjoiXHU4YWI5IiwgDQoiXHU4YmZlIjoiXHU4YWIyIiwgDQoiXHU4YmZmIjoiXHU4YWM5IiwgDQoiXHU4YzAwIjoiXHU4YWRiIiwgDQoiXHU4YzAxIjoiXHU4YWIwIiwgDQoiXHU4YzAyIjoiXHU4YWQ3IiwgDQoiXHU4YzAzIjoiXHU4YWJmIiwgDQoiXHU4YzA0IjoiXHU4YWMyIiwgDQoiXHU4YzA1IjoiXHU4YWQyIiwgDQoiXHU4YzA2IjoiXHU4YWM0IiwgDQoiXHU4YzA3IjoiXHU4YWI2IiwgDQoiXHU4YzA4IjoiXHU4YWM3IiwgDQoiXHU4YzA5IjoiXHU4Yjg1IiwgDQoiXHU4YzBhIjoiXHU4YWJjIiwgDQoiXHU4YzBiIjoiXHU4YjAwIiwgDQoiXHU4YzBjIjoiXHU4YWY2IiwgDQoiXHU4YzBkIjoiXHU4YWRjIiwgDQoiXHU4YzBlIjoiXHU4YjBhIiwgDQoiXHU4YzBmIjoiXHU4YWViIiwgDQoiXHU4YzEwIjoiXHU4YWU3IiwgDQoiXHU4YzExIjoiXHU4YjE0IiwgDQoiXHU4YzEyIjoiXHU4YjAxIiwgDQoiXHU4YzEzIjoiXHU4YjAyIiwgDQoiXHU4YzE0IjoiXHU4YWU0IiwgDQoiXHU4YzE1IjoiXHU4YWVkIiwgDQoiXHU4YzE2IjoiXHU4YWZjIiwgDQoiXHU4YzE3IjoiXHU4YjkyIiwgDQoiXHU4YzE4IjoiXHU4YWVlIiwgDQoiXHU4YzE5IjoiXHU4YWYzIiwgDQoiXHU4YzFhIjoiXHU4YWZhIiwgDQoiXHU4YzFiIjoiXHU4YWU2IiwgDQoiXHU4YzFjIjoiXHU4YjBlIiwgDQoiXHU4YzFkIjoiXHU4YWRlIiwgDQoiXHU4YzFlIjoiXHU4YWRkIiwgDQoiXHU4YzFmIjoiXHU4YjI4IiwgDQoiXHU4YzIwIjoiXHU4YjljIiwgDQoiXHU4YzIxIjoiXHU4YjE2IiwgDQoiXHU4YzIyIjoiXHU4YjFkIiwgDQoiXHU4YzIzIjoiXHU4YjIwIiwgDQoiXHU4YzI0IjoiXHU4YjE3IiwgDQoiXHU4YzI1IjoiXHU4YjFhIiwgDQoiXHU4YzI2IjoiXHU4YjE5IiwgDQoiXHU4YzI3IjoiXHU4YjEwIiwgDQoiXHU4YzI4IjoiXHU4YjM5IiwgDQoiXHU4YzI5IjoiXHU4YjNlIiwgDQoiXHU4YzJhIjoiXHU4YjJiIiwgDQoiXHU4YzJiIjoiXHU4YjdlIiwgDQoiXHU4YzJjIjoiXHU4YjJjIiwgDQoiXHU4YzJkIjoiXHU4YjVhIiwgDQoiXHU4YzJlIjoiXHU4YjU2IiwgDQoiXHU4YzJmIjoiXHU4YjU5IiwgDQoiXHU4YzMwIjoiXHU4Yjk1IiwgDQoiXHU4YzMxIjoiXHU4YjVjIiwgDQoiXHU4YzMyIjoiXHU4YjRlIiwgDQoiXHU4YzMzIjoiXHU4YjllIiwgDQoiXHU4YzM0IjoiXHU4Yjc0IiwgDQoiXHU4YzM1IjoiXHU4YjZiIiwgDQoiXHU4YzM2IjoiXHU4Yjk2IiwgDQoiXHU4YzZlIjoiXHU4Yzc2IiwgDQoiXHU4ZDFjIjoiXHU4ZDEzIiwgDQoiXHU4ZDFkIjoiXHU4YzlkIiwgDQoiXHU4ZDFlIjoiXHU4YzllIiwgDQoiXHU4ZDFmIjoiXHU4Y2EwIiwgDQoiXHU4ZDIxIjoiXHU4Y2EyIiwgDQoiXHU4ZDIyIjoiXHU4Y2ExIiwgDQoiXHU4ZDIzIjoiXHU4Y2FjIiwgDQoiXHU4ZDI0IjoiXHU4Y2UyIiwgDQoiXHU4ZDI1IjoiXHU2NTU3IiwgDQoiXHU4ZDI2IjoiXHU4Y2VjIiwgDQoiXHU4ZDI3IjoiXHU4Y2E4IiwgDQoiXHU4ZDI4IjoiXHU4Y2VhIiwgDQoiXHU4ZDI5IjoiXHU4Y2E5IiwgDQoiXHU4ZDJhIjoiXHU4Y2FhIiwgDQoiXHU4ZDJiIjoiXHU4Y2E3IiwgDQoiXHU4ZDJjIjoiXHU4Y2I2IiwgDQoiXHU4ZDJkIjoiXHU4Y2ZjIiwgDQoiXHU4ZDJlIjoiXHU4Y2FmIiwgDQoiXHU4ZDJmIjoiXHU4Y2FiIiwgDQoiXHU4ZDMwIjoiXHU4Y2IzIiwgDQoiXHU4ZDMxIjoiXHU4Y2U0IiwgDQoiXHU4ZDMyIjoiXHU4Y2MxIiwgDQoiXHU4ZDMzIjoiXHU4Y2IwIiwgDQoiXHU4ZDM0IjoiXHU4Y2JjIiwgDQoiXHU4ZDM1IjoiXHU4Y2I0IiwgDQoiXHU4ZDM2IjoiXHU4Y2JhIiwgDQoiXHU4ZDM3IjoiXHU4Y2I4IiwgDQoiXHU4ZDM4IjoiXHU4Y2JmIiwgDQoiXHU4ZDM5IjoiXHU4Y2JiIiwgDQoiXHU4ZDNhIjoiXHU4Y2MwIiwgDQoiXHU4ZDNiIjoiXHU4Y2JkIiwgDQoiXHU4ZDNjIjoiXHU4Y2NhIiwgDQoiXHU4ZDNkIjoiXHU4ZDA0IiwgDQoiXHU4ZDNlIjoiXHU4Y2M4IiwgDQoiXHU4ZDNmIjoiXHU4Y2M0IiwgDQoiXHU4ZDQwIjoiXHU4Y2IyIiwgDQoiXHU4ZDQxIjoiXHU4Y2MzIiwgDQoiXHU4ZDQyIjoiXHU4Y2MyIiwgDQoiXHU4ZDQzIjoiXHU4ZDEzIiwgDQoiXHU4ZDQ0IjoiXHU4Y2M3IiwgDQoiXHU4ZDQ1IjoiXHU4Y2M1IiwgDQoiXHU4ZDQ2IjoiXHU4ZDEwIiwgDQoiXHU4ZDQ3IjoiXHU4Y2Q1IiwgDQoiXHU4ZDQ4IjoiXHU4Y2QxIiwgDQoiXHU4ZDQ5IjoiXHU4Y2RhIiwgDQoiXHU4ZDRhIjoiXHU4Y2QyIiwgDQoiXHU4ZDRiIjoiXHU4Y2U2IiwgDQoiXHU4ZDRjIjoiXHU4Y2VkIiwgDQoiXHU4ZDRkIjoiXHU5ZjRlIiwgDQoiXHU4ZDRlIjoiXHU4ZDE2IiwgDQoiXHU4ZDRmIjoiXHU4Y2RlIiwgDQoiXHU4ZDUwIjoiXHU4Y2RjIiwgDQoiXHU4ZDUyIjoiXHU4Y2Q5IiwgDQoiXHU4ZDUzIjoiXHU4Y2UxIiwgDQoiXHU4ZDU0IjoiXHU4Y2UwIiwgDQoiXHU4ZDU1IjoiXHU4Y2U3IiwgDQoiXHU4ZDU2IjoiXHU4Y2Y0IiwgDQoiXHU4ZDU3IjoiXHU4Y2Y1IiwgDQoiXHU4ZDU4IjoiXHU4ZDA1IiwgDQoiXHU4ZDU5IjoiXHU4Y2ZiIiwgDQoiXHU4ZDVhIjoiXHU4Y2ZhIiwgDQoiXHU4ZDViIjoiXHU4Y2ZkIiwgDQoiXHU4ZDVjIjoiXHU4Y2ZlIiwgDQoiXHU4ZDVkIjoiXHU4ZDBiIiwgDQoiXHU4ZDVlIjoiXHU4ZDBhIiwgDQoiXHU4ZDVmIjoiXHU4ZDA3IiwgDQoiXHU4ZDYwIjoiXHU4ZDA4IiwgDQoiXHU4ZDYxIjoiXHU4ZDBkIiwgDQoiXHU4ZDYyIjoiXHU4ZDBmIiwgDQoiXHU4ZDYzIjoiXHU4ZDFiIiwgDQoiXHU4ZDc1IjoiXHU4ZDk5IiwgDQoiXHU4ZDc2IjoiXHU4ZDk1IiwgDQoiXHU4ZDhiIjoiXHU4ZGE4IiwgDQoiXHU4ZGIxIjoiXHU4ZGIyIiwgDQoiXHU4ZGI4IjoiXHU4ZTg5IiwgDQoiXHU4ZGMzIjoiXHU4ZThkIiwgDQoiXHU4ZGM0IjoiXHU4ZTRjIiwgDQoiXHU4ZGRlIjoiXHU4ZTkyIiwgDQoiXHU4ZGY1IjoiXHU4ZTEwIiwgDQoiXHU4ZGY3IjoiXHU4ZTdhIiwgDQoiXHU4ZGY4IjoiXHU4ZTU1IiwgDQoiXHU4ZGY5IjoiXHU4ZTlhIiwgDQoiXHU4ZGZiIjoiXHU4ZThiIiwgDQoiXHU4ZTBhIjoiXHU4ZTM0IiwgDQoiXHU4ZTBjIjoiXHU4ZThhIiwgDQoiXHU4ZTJhIjoiXHU4ZTY0IiwgDQoiXHU4ZTJjIjoiXHU4ZTkzIiwgDQoiXHU4ZTJmIjoiXHU4ZTkxIiwgDQoiXHU4ZTUxIjoiXHU4ZWExIiwgDQoiXHU4ZTUyIjoiXHU4ZTYzIiwgDQoiXHU4ZTcwIjoiXHU4ZTk1IiwgDQoiXHU4ZTdmIjoiXHU4ZWE1IiwgDQoiXHU4ZThmIjoiXHU4ZWFhIiwgDQoiXHU4ZTljIjoiXHU4ZWE2IiwgDQoiXHU4ZWFmIjoiXHU4ZWMwIiwgDQoiXHU4ZWIwIjoiXHU5YWQ0IiwgDQoiXHU4ZjY2IjoiXHU4ZWNhIiwgDQoiXHU4ZjY3IjoiXHU4ZWNiIiwgDQoiXHU4ZjY4IjoiXHU4ZWNjIiwgDQoiXHU4ZjY5IjoiXHU4ZWQyIiwgDQoiXHU4ZjZiIjoiXHU4ZWQ0IiwgDQoiXHU4ZjZjIjoiXHU4ZjQ5IiwgDQoiXHU4ZjZkIjoiXHU4ZWRiIiwgDQoiXHU4ZjZlIjoiXHU4ZjJhIiwgDQoiXHU4ZjZmIjoiXHU4ZWRmIiwgDQoiXHU4ZjcwIjoiXHU4ZjVmIiwgDQoiXHU4ZjcxIjoiXHU4ZWYyIiwgDQoiXHU4ZjcyIjoiXHU4ZWZiIiwgDQoiXHU4ZjczIjoiXHU4ZjY0IiwgDQoiXHU4Zjc0IjoiXHU4ZWY4IiwgDQoiXHU4Zjc1IjoiXHU4ZWY5IiwgDQoiXHU4Zjc2IjoiXHU4ZWZjIiwgDQoiXHU4Zjc3IjoiXHU4ZWU0IiwgDQoiXHU4Zjc4IjoiXHU4ZWViIiwgDQoiXHU4Zjc5IjoiXHU4ZjYyIiwgDQoiXHU4ZjdhIjoiXHU4ZWZhIiwgDQoiXHU4ZjdiIjoiXHU4ZjE1IiwgDQoiXHU4ZjdjIjoiXHU4ZWZlIiwgDQoiXHU4ZjdkIjoiXHU4ZjA5IiwgDQoiXHU4ZjdlIjoiXHU4ZjBhIiwgDQoiXHU4ZjdmIjoiXHU4ZjRlIiwgDQoiXHU4ZjgxIjoiXHU4ZjA3IiwgDQoiXHU4ZjgyIjoiXHU4ZjA1IiwgDQoiXHU4ZjgzIjoiXHU4ZjAzIiwgDQoiXHU4Zjg0IjoiXHU4ZjEyIiwgDQoiXHU4Zjg1IjoiXHU4ZjE0IiwgDQoiXHU4Zjg2IjoiXHU4ZjFiIiwgDQoiXHU4Zjg3IjoiXHU4ZjI2IiwgDQoiXHU4Zjg4IjoiXHU4ZjI5IiwgDQoiXHU4Zjg5IjoiXHU4ZjFkIiwgDQoiXHU4ZjhhIjoiXHU4ZjI1IiwgDQoiXHU4ZjhiIjoiXHU4ZjFlIiwgDQoiXHU4ZjhkIjoiXHU4ZjFmIiwgDQoiXHU4ZjhlIjoiXHU4ZjFjIiwgDQoiXHU4ZjhmIjoiXHU4ZjMzIiwgDQoiXHU4ZjkwIjoiXHU4ZjNiIiwgDQoiXHU4ZjkxIjoiXHU4ZjJmIiwgDQoiXHU4ZjkzIjoiXHU4ZjM4IiwgDQoiXHU4Zjk0IjoiXHU4ZjYxIiwgDQoiXHU4Zjk1IjoiXHU4ZjQ1IiwgDQoiXHU4Zjk2IjoiXHU4ZjQ0IiwgDQoiXHU4Zjk3IjoiXHU4ZjNlIiwgDQoiXHU4Zjk4IjoiXHU4ZjQ2IiwgDQoiXHU4Zjk5IjoiXHU4ZjRkIiwgDQoiXHU4ZjlhIjoiXHU4ZjU0IiwgDQoiXHU4ZjllIjoiXHU4ZmFkIiwgDQoiXHU4ZmE5IjoiXHU4ZmFmIiwgDQoiXHU4ZmFiIjoiXHU4ZmFlIiwgDQoiXHU4ZmI5IjoiXHU5MDhhIiwgDQoiXHU4ZmJkIjoiXHU5MDdjIiwgDQoiXHU4ZmJlIjoiXHU5MDU0IiwgDQoiXHU4ZmMxIjoiXHU5MDc3IiwgDQoiXHU4ZmM3IjoiXHU5MDRlIiwgDQoiXHU4ZmM4IjoiXHU5MDgxIiwgDQoiXHU4ZmQwIjoiXHU5MDRiIiwgDQoiXHU4ZmQ4IjoiXHU5MDg0IiwgDQoiXHU4ZmQ5IjoiXHU5MDE5IiwgDQoiXHU4ZmRiIjoiXHU5MDMyIiwgDQoiXHU4ZmRjIjoiXHU5MDYwIiwgDQoiXHU4ZmRkIjoiXHU5MDU1IiwgDQoiXHU4ZmRlIjoiXHU5MDIzIiwgDQoiXHU4ZmRmIjoiXHU5MDcyIiwgDQoiXHU4ZmU5IjoiXHU5MDg3IiwgDQoiXHU4ZmYzIjoiXHU5MDE1IiwgDQoiXHU4ZmY5IjoiXHU4ZGUxIiwgDQoiXHU5MDAyIjoiXHU5MDY5IiwgDQoiXHU5MDA5IjoiXHU5MDc4IiwgDQoiXHU5MDBhIjoiXHU5MDVjIiwgDQoiXHU5MDEyIjoiXHU5MDVlIiwgDQoiXHU5MDI2IjoiXHU5MDkwIiwgDQoiXHU5MDNiIjoiXHU5MDhmIiwgDQoiXHU5MDU3IjoiXHU5MDdhIiwgDQoiXHU5MDY1IjoiXHU5MDU5IiwgDQoiXHU5MDkzIjoiXHU5MTI3IiwgDQoiXHU5MDlkIjoiXHU5MTNhIiwgDQoiXHU5MGFjIjoiXHU5MTE0IiwgDQoiXHU5MGFlIjoiXHU5MGY1IiwgDQoiXHU5MGI5IjoiXHU5MTEyIiwgDQoiXHU5MGJhIjoiXHU5MTM0IiwgDQoiXHU5MGJiIjoiXHU5MTMwIiwgDQoiXHU5MGMzIjoiXHU1NDA4IiwgDQoiXHU5MGM0IjoiXHU5Njk5IiwgDQoiXHU5MGNmIjoiXHU5MGRmIiwgDQoiXHU5MGQwIjoiXHU5MTM2IiwgDQoiXHU5MGQxIjoiXHU5MTJkIiwgDQoiXHU5MGQzIjoiXHU5MTA2IiwgDQoiXHU5MGU2IjoiXHU5MTQ4IiwgDQoiXHU5MGU3IjoiXHU5MTE2IiwgDQoiXHU5MGY4IjoiXHU5MTMyIiwgDQoiXHU5MTVkIjoiXHU5MTllIiwgDQoiXHU5MTcxIjoiXHU5MWFjIiwgDQoiXHU5MTdkIjoiXHU5MWM1IiwgDQoiXHU5MTdlIjoiXHU5MWMzIiwgDQoiXHU5MTdmIjoiXHU5MWMwIiwgDQoiXHU5MTk2IjoiXHU5MTllIiwgDQoiXHU5MWNhIjoiXHU5MWNiIiwgDQoiXHU5MWNjIjoiXHU4OGUxIiwgDQoiXHU5MjA4IjoiXHU5MjNkIiwgDQoiXHU5MjIxIjoiXHU5NDE4IiwgDQoiXHU5MjQ2IjoiXHU5NDdkIiwgDQoiXHU5Mjc0IjoiXHU5NDUxIiwgDQoiXHU5MmFlIjoiXHU5NDdlIiwgDQoiXHU5MmJjIjoiXHU1MjQ5IiwgDQoiXHU5MmZiIjoiXHU5NDUxIiwgDQoiXHU5MzE4IjoiXHU5MzlhIiwgDQoiXHU5MzMyIjoiXHU5MzA0IiwgDQoiXHU5MzNlIjoiXHU5M2U4IiwgDQoiXHU5NDUyIjoiXHU5NDUxIiwgDQoiXHU5NDg2IjoiXHU5MWQzIiwgDQoiXHU5NDg3IjoiXHU5MWQ0IiwgDQoiXHU5NDg4IjoiXHU5MWRkIiwgDQoiXHU5NDg5IjoiXHU5MWQ4IiwgDQoiXHU5NDhhIjoiXHU5MWQ3IiwgDQoiXHU5NDhiIjoiXHU5MWQ5IiwgDQoiXHU5NDhjIjoiXHU5MWQ1IiwgDQoiXHU5NDhkIjoiXHU5MWY3IiwgDQoiXHU5NDhlIjoiXHU5MWZhIiwgDQoiXHU5NDhmIjoiXHU5MWU3IiwgDQoiXHU5NDkwIjoiXHU5MWU0IiwgDQoiXHU5NDkyIjoiXHU5MWU5IiwgDQoiXHU5NDkzIjoiXHU5MWUzIiwgDQoiXHU5NDk0IjoiXHU5MzQ2IiwgDQoiXHU5NDk1IjoiXHU5MWY5IiwgDQoiXHU5NDk2IjoiXHU5MzVhIiwgDQoiXHU5NDk3IjoiXHU5MWY1IiwgDQoiXHU5NDk4IjoiXHU5MjAzIiwgDQoiXHU5NDk5IjoiXHU5MjIzIiwgDQoiXHU5NDlhIjoiXHU5MjA4IiwgDQoiXHU5NDliIjoiXHU5MjI2IiwgDQoiXHU5NDljIjoiXHU5MjQ1IiwgDQoiXHU5NDlkIjoiXHU5MjBkIiwgDQoiXHU5NDllIjoiXHU5MjE0IiwgDQoiXHU5NDlmIjoiXHU5NDE4IiwgDQoiXHU5NGEwIjoiXHU5MjA5IiwgDQoiXHU5NGExIjoiXHU5MmM3IiwgDQoiXHU5NGEyIjoiXHU5MmZjIiwgDQoiXHU5NGEzIjoiXHU5MjExIiwgDQoiXHU5NGE0IjoiXHU5MjEwIiwgDQoiXHU5NGE1IjoiXHU5NDcwIiwgDQoiXHU5NGE2IjoiXHU2YjNkIiwgDQoiXHU5NGE3IjoiXHU5MjFlIiwgDQoiXHU5NGE4IjoiXHU5M2EyIiwgDQoiXHU5NGE5IjoiXHU5MjY0IiwgDQoiXHU5NGFhIjoiXHU5MjI3IiwgDQoiXHU5NGFiIjoiXHU5MjAxIiwgDQoiXHU5NGFjIjoiXHU5MjI1IiwgDQoiXHU5NGFkIjoiXHU5MjA0IiwgDQoiXHU5NGFlIjoiXHU5MjE1IiwgDQoiXHU5NGFmIjoiXHU5MjAwIiwgDQoiXHU5NGIwIjoiXHU5MjNhIiwgDQoiXHU5NGIxIjoiXHU5MzIyIiwgDQoiXHU5NGIyIjoiXHU5MjY2IiwgDQoiXHU5NGIzIjoiXHU5MjU3IiwgDQoiXHU5NGI0IjoiXHU5MjM3IiwgDQoiXHU5NGI1IjoiXHU3ZjNkIiwgDQoiXHU5NGI2IjoiXHU5MjMzIiwgDQoiXHU5NGI3IjoiXHU5MjU1IiwgDQoiXHU5NGI4IjoiXHU5MjNkIiwgDQoiXHU5NGI5IjoiXHU5MjM4IiwgDQoiXHU5NGJhIjoiXHU5MjVlIiwgDQoiXHU5NGJiIjoiXHU5NDdkIiwgDQoiXHU5NGJjIjoiXHU5MjZjIiwgDQoiXHU5NGJkIjoiXHU5MjZkIiwgDQoiXHU5NGJlIjoiXHU5MjQwIiwgDQoiXHU5NGJmIjoiXHU5MjNmIiwgDQoiXHU5NGMwIjoiXHU5MjNlIiwgDQoiXHU5NGMxIjoiXHU5NDM1IiwgDQoiXHU5NGMyIjoiXHU5MjUxIiwgDQoiXHU5NGMzIjoiXHU5MjM0IiwgDQoiXHU5NGM0IjoiXHU5NDYwIiwgDQoiXHU5NGM1IjoiXHU5MjViIiwgDQoiXHU5NGM2IjoiXHU5MjVhIiwgDQoiXHU5NGM4IjoiXHU5MjMwIiwgDQoiXHU5NGM5IjoiXHU5MjQ5IiwgDQoiXHU5NGNhIjoiXHU5MjQ4IiwgDQoiXHU5NGNiIjoiXHU5MjRkIiwgDQoiXHU5NGNjIjoiXHU5MjJlIiwgDQoiXHU5NGNkIjoiXHU5MjM5IiwgDQoiXHU5NGNlIjoiXHU5NDM4IiwgDQoiXHU5NGNmIjoiXHU5Mjc2IiwgDQoiXHU5NGQwIjoiXHU5MmFjIiwgDQoiXHU5NGQxIjoiXHU5MmEwIiwgDQoiXHU5NGQyIjoiXHU5MjdhIiwgDQoiXHU5NGQzIjoiXHU5MmU5IiwgDQoiXHU5NGQ1IjoiXHU5MmFhIiwgDQoiXHU5NGQ2IjoiXHU5MmVlIiwgDQoiXHU5NGQ3IjoiXHU5MmNmIiwgDQoiXHU5NGQ4IjoiXHU5MmUzIiwgDQoiXHU5NGQ5IjoiXHU5NDAzIiwgDQoiXHU5NGRiIjoiXHU5NDNhIiwgDQoiXHU5NGRjIjoiXHU5Mjg1IiwgDQoiXHU5NGRkIjoiXHU5MmMxIiwgDQoiXHU5NGRlIjoiXHU5MmIxIiwgDQoiXHU5NGRmIjoiXHU5MmE2IiwgDQoiXHU5NGUwIjoiXHU5M2E3IiwgDQoiXHU5NGUxIjoiXHU5MzU4IiwgDQoiXHU5NGUyIjoiXHU5Mjk2IiwgDQoiXHU5NGUzIjoiXHU5MjkxIiwgDQoiXHU5NGU0IjoiXHU5MmNjIiwgDQoiXHU5NGU1IjoiXHU5MmE5IiwgDQoiXHU5NGU3IjoiXHU5M2Y1IiwgDQoiXHU5NGU4IjoiXHU5MjkzIiwgDQoiXHU5NGU5IjoiXHU5M2E5IiwgDQoiXHU5NGVhIjoiXHU5MjdmIiwgDQoiXHU5NGViIjoiXHU5MjlhIiwgDQoiXHU5NGVjIjoiXHU5MjdiIiwgDQoiXHU5NGVkIjoiXHU5Mjk4IiwgDQoiXHU5NGVlIjoiXHU5MzFhIiwgDQoiXHU5NGVmIjoiXHU5MmFiIiwgDQoiXHU5NGYwIjoiXHU5Mjc4IiwgDQoiXHU5NGYxIjoiXHU5MmE1IiwgDQoiXHU5NGYyIjoiXHU5M2RmIiwgDQoiXHU5NGYzIjoiXHU5MjgzIiwgDQoiXHU5NGY0IjoiXHU5NDBiIiwgDQoiXHU5NGY1IjoiXHU5MmE4IiwgDQoiXHU5NGY2IjoiXHU5MjgwIiwgDQoiXHU5NGY3IjoiXHU5MmEzIiwgDQoiXHU5NGY4IjoiXHU5NDQ0IiwgDQoiXHU5NGY5IjoiXHU5NDEyIiwgDQoiXHU5NGZhIjoiXHU5MmVhIiwgDQoiXHU5NGZjIjoiXHU5MzM4IiwgDQoiXHU5NGZkIjoiXHU5MmYxIiwgDQoiXHU5NGZlIjoiXHU5M2M4IiwgDQoiXHU5NGZmIjoiXHU5M2Q3IiwgDQoiXHU5NTAwIjoiXHU5MmI3IiwgDQoiXHU5NTAxIjoiXHU5Mzk2IiwgDQoiXHU5NTAyIjoiXHU5MmYwIiwgDQoiXHU5NTAzIjoiXHU5MmU1IiwgDQoiXHU5NTA0IjoiXHU5MmU0IiwgDQoiXHU5NTA1IjoiXHU5MzRiIiwgDQoiXHU5NTA2IjoiXHU5MmVmIiwgDQoiXHU5NTA3IjoiXHU5MmU4IiwgDQoiXHU5NTA4IjoiXHU5M2ZkIiwgDQoiXHU5NTA5IjoiXHU5MmJjIiwgDQoiXHU5NTBhIjoiXHU5MmRkIiwgDQoiXHU5NTBiIjoiXHU5MmQyIiwgDQoiXHU5NTBjIjoiXHU5MmM1IiwgDQoiXHU5NTBkIjoiXHU5MmY2IiwgDQoiXHU5NTBlIjoiXHU5NDI2IiwgDQoiXHU5NTBmIjoiXHU5NDI3IiwgDQoiXHU5NTEwIjoiXHU5MmIzIiwgDQoiXHU5NTExIjoiXHU5MmJiIiwgDQoiXHU5NTEyIjoiXHU5MmMzIiwgDQoiXHU5NTEzIjoiXHU5MmRmIiwgDQoiXHU5NTE0IjoiXHU5MmU2IiwgDQoiXHU5NTE1IjoiXHU5MzEyIiwgDQoiXHU5NTE2IjoiXHU5MzA2IiwgDQoiXHU5NTE3IjoiXHU5MzdhIiwgDQoiXHU5NTE4IjoiXHU5MzY5IiwgDQoiXHU5NTE5IjoiXHU5MzJmIiwgDQoiXHU5NTFhIjoiXHU5MzI4IiwgDQoiXHU5NTFiIjoiXHU5MzFiIiwgDQoiXHU5NTFjIjoiXHU5MzIxIiwgDQoiXHU5NTFkIjoiXHU5MzQwIiwgDQoiXHU5NTFlIjoiXHU5MzAxIiwgDQoiXHU5NTFmIjoiXHU5MzE1IiwgDQoiXHU5NTIxIjoiXHU5MzJiIiwgDQoiXHU5NTIyIjoiXHU5MzJlIiwgDQoiXHU5NTIzIjoiXHU5NDdjIiwgDQoiXHU5NTI0IjoiXHU5MzE4IiwgDQoiXHU5NTI1IjoiXHU5MzEwIiwgDQoiXHU5NTI2IjoiXHU5MzI2IiwgDQoiXHU5NTI3IjoiXHU5NDU1IiwgDQoiXHU5NTI4IjoiXHU5MzQxIiwgDQoiXHU5NTI5IjoiXHU5MzA4IiwgDQoiXHU5NTJhIjoiXHU5MzQzIiwgDQoiXHU5NTJiIjoiXHU5MzA3IiwgDQoiXHU5NTJjIjoiXHU5MzFmIiwgDQoiXHU5NTJkIjoiXHU5MzIwIiwgDQoiXHU5NTJlIjoiXHU5Mzc1IiwgDQoiXHU5NTJmIjoiXHU5MmY4IiwgDQoiXHU5NTMwIjoiXHU5MzMzIiwgDQoiXHU5NTMxIjoiXHU5MzE5IiwgDQoiXHU5NTMyIjoiXHU5MzY1IiwgDQoiXHU5NTM0IjoiXHU5MzQ3IiwgDQoiXHU5NTM1IjoiXHU5M2Q4IiwgDQoiXHU5NTM2IjoiXHU5Mzc2IiwgDQoiXHU5NTM3IjoiXHU5MzU0IiwgDQoiXHU5NTM4IjoiXHU5MzY0IiwgDQoiXHU5NTM5IjoiXHU5MzZjIiwgDQoiXHU5NTNhIjoiXHU5MzdlIiwgDQoiXHU5NTNiIjoiXHU5MzViIiwgDQoiXHU5NTNjIjoiXHU5M2FhIiwgDQoiXHU5NTNlIjoiXHU5MzcwIiwgDQoiXHU5NTNmIjoiXHU5Mzg0IiwgDQoiXHU5NTQwIjoiXHU5MzRkIiwgDQoiXHU5NTQxIjoiXHU5MzgyIiwgDQoiXHU5NTQyIjoiXHU5M2U0IiwgDQoiXHU5NTQzIjoiXHU5M2ExIiwgDQoiXHU5NTQ0IjoiXHU5NDI4IiwgDQoiXHU5NTQ1IjoiXHU5Mzg3IiwgDQoiXHU5NTQ2IjoiXHU5M2NjIiwgDQoiXHU5NTQ3IjoiXHU5M2FlIiwgDQoiXHU5NTQ5IjoiXHU5Mzk4IiwgDQoiXHU5NTRhIjoiXHU5NDc3IiwgDQoiXHU5NTRiIjoiXHU5NDgyIiwgDQoiXHU5NTRjIjoiXHU5NDJiIiwgDQoiXHU5NTRkIjoiXHU5M2IzIiwgDQoiXHU5NTRlIjoiXHU5M2JmIiwgDQoiXHU5NTRmIjoiXHU5M2E2IiwgDQoiXHU5NTUwIjoiXHU5M2FjIiwgDQoiXHU5NTUxIjoiXHU5MzhhIiwgDQoiXHU5NTUyIjoiXHU5M2IwIiwgDQoiXHU5NTUzIjoiXHU5M2I1IiwgDQoiXHU5NTU0IjoiXHU5NDRjIiwgDQoiXHU5NTU1IjoiXHU5Mzk0IiwgDQoiXHU5NTU2IjoiXHU5M2UyIiwgDQoiXHU5NTU3IjoiXHU5M2RjIiwgDQoiXHU5NTU4IjoiXHU5M2RkIiwgDQoiXHU5NTU5IjoiXHU5M2NkIiwgDQoiXHU5NTVhIjoiXHU5M2YwIiwgDQoiXHU5NTViIjoiXHU5M2RlIiwgDQoiXHU5NTVjIjoiXHU5M2UxIiwgDQoiXHU5NTVkIjoiXHU5M2QxIiwgDQoiXHU5NTVlIjoiXHU5M2MzIiwgDQoiXHU5NTVmIjoiXHU5M2M3IiwgDQoiXHU5NTYxIjoiXHU5NDE0IiwgDQoiXHU5NTYyIjoiXHU5NDFkIiwgDQoiXHU5NTYzIjoiXHU5NDEwIiwgDQoiXHU5NTY0IjoiXHU5M2Y3IiwgDQoiXHU5NTY1IjoiXHU5NDY1IiwgDQoiXHU5NTY2IjoiXHU5NDEzIiwgDQoiXHU5NTY3IjoiXHU5NDZkIiwgDQoiXHU5NTY4IjoiXHU5NDIwIiwgDQoiXHU5NTY5IjoiXHU5NDc5IiwgDQoiXHU5NTZhIjoiXHU5M2Y5IiwgDQoiXHU5NTZiIjoiXHU5NDE5IiwgDQoiXHU5NTZjIjoiXHU5NDRhIiwgDQoiXHU5NTZkIjoiXHU5NDMzIiwgDQoiXHU5NTZlIjoiXHU5NDM2IiwgDQoiXHU5NTZmIjoiXHU5NDMyIiwgDQoiXHU5NTcwIjoiXHU5NDJlIiwgDQoiXHU5NTcxIjoiXHU5NDNmIiwgDQoiXHU5NTcyIjoiXHU5NDU0IiwgDQoiXHU5NTczIjoiXHU5NDYzIiwgDQoiXHU5NTc0IjoiXHU5NDVlIiwgDQoiXHU5NTc2IjoiXHU5NDcyIiwgDQoiXHU5NTdmIjoiXHU5NTc3IiwgDQoiXHU5NTkxIjoiXHU5NTkyIiwgDQoiXHU5NWE3IjoiXHU5YjI4IiwgDQoiXHU5NWU4IjoiXHU5NTgwIiwgDQoiXHU5NWU5IjoiXHU5NTgyIiwgDQoiXHU5NWVhIjoiXHU5NTgzIiwgDQoiXHU5NWViIjoiXHU5NTg2IiwgDQoiXHU5NWVkIjoiXHU5NTg5IiwgDQoiXHU5NWVlIjoiXHU1NTRmIiwgDQoiXHU5NWVmIjoiXHU5NWQ2IiwgDQoiXHU5NWYwIjoiXHU5NThmIiwgDQoiXHU5NWYxIjoiXHU5NWM4IiwgDQoiXHU5NWYyIjoiXHU5NTkyIiwgDQoiXHU5NWYzIjoiXHU5NThlIiwgDQoiXHU5NWY0IjoiXHU5NTkzIiwgDQoiXHU5NWY1IjoiXHU5NTk0IiwgDQoiXHU5NWY2IjoiXHU5NThjIiwgDQoiXHU5NWY3IjoiXHU2MGI2IiwgDQoiXHU5NWY4IjoiXHU5NTk4IiwgDQoiXHU5NWY5IjoiXHU5YjI3IiwgDQoiXHU5NWZhIjoiXHU5NWE4IiwgDQoiXHU5NWZiIjoiXHU4MDVlIiwgDQoiXHU5NWZjIjoiXHU5NWU1IiwgDQoiXHU5NWZkIjoiXHU5NWE5IiwgDQoiXHU5NWZlIjoiXHU5NWFkIiwgDQoiXHU5NWZmIjoiXHU5NWQzIiwgDQoiXHU5NjAwIjoiXHU5NWE1IiwgDQoiXHU5NjAxIjoiXHU5NWEzIiwgDQoiXHU5NjAyIjoiXHU5NWExIiwgDQoiXHU5NjAzIjoiXHU5NWFiIiwgDQoiXHU5NjA0IjoiXHU5YjJlIiwgDQoiXHU5NjA1IjoiXHU5NWIxIiwgDQoiXHU5NjA2IjoiXHU5NWFjIiwgDQoiXHU5NjA4IjoiXHU5NWJlIiwgDQoiXHU5NjA5IjoiXHU5NWI5IiwgDQoiXHU5NjBhIjoiXHU5NWI2IiwgDQoiXHU5NjBiIjoiXHU5YjI5IiwgDQoiXHU5NjBjIjoiXHU5NWJmIiwgDQoiXHU5NjBkIjoiXHU5NWJkIiwgDQoiXHU5NjBlIjoiXHU5NWJiIiwgDQoiXHU5NjBmIjoiXHU5NWJjIiwgDQoiXHU5NjEwIjoiXHU5NWUxIiwgDQoiXHU5NjExIjoiXHU5NWNjIiwgDQoiXHU5NjEyIjoiXHU5NWMzIiwgDQoiXHU5NjE0IjoiXHU5NWNhIiwgDQoiXHU5NjE1IjoiXHU5NWNiIiwgDQoiXHU5NjE2IjoiXHU5NWQ0IiwgDQoiXHU5NjE3IjoiXHU5NWQwIiwgDQoiXHU5NjE5IjoiXHU5NWQ1IiwgDQoiXHU5NjFhIjoiXHU5NWRlIiwgDQoiXHU5NjFmIjoiXHU5NjhhIiwgDQoiXHU5NjMzIjoiXHU5NjdkIiwgDQoiXHU5NjM0IjoiXHU5NjcwIiwgDQoiXHU5NjM1IjoiXHU5NjYzIiwgDQoiXHU5NjM2IjoiXHU5NjhlIiwgDQoiXHU5NjQ1IjoiXHU5NjliIiwgDQoiXHU5NjQ2IjoiXHU5Njc4IiwgDQoiXHU5NjQ3IjoiXHU5NmI0IiwgDQoiXHU5NjQ4IjoiXHU5NjczIiwgDQoiXHU5NjQ5IjoiXHU5NjU4IiwgDQoiXHU5NjU1IjoiXHU5NjVkIiwgDQoiXHU5NjY3IjoiXHU5Njg5IiwgDQoiXHU5NjY4IjoiXHU5Njk1IiwgDQoiXHU5NjY5IjoiXHU5NmFhIiwgDQoiXHU5NjhmIjoiXHU5NmE4IiwgDQoiXHU5NjkwIjoiXHU5NmIxIiwgDQoiXHU5NmI2IjoiXHU5NmI4IiwgDQoiXHU5NmJkIjoiXHU5NmNiIiwgDQoiXHU5NmJlIjoiXHU5NmUzIiwgDQoiXHU5NmNmIjoiXHU5NmRiIiwgDQoiXHU5NmUwIjoiXHU4YjhlIiwgDQoiXHU5NmYzIjoiXHU5NzQyIiwgDQoiXHU5NmZlIjoiXHU5NzI3IiwgDQoiXHU5NzAxIjoiXHU5NzNkIiwgDQoiXHU5NzA5IjoiXHU5ZWY0IiwgDQoiXHU5NzJkIjoiXHU5NzQ0IiwgDQoiXHU5NzUzIjoiXHU5NzVhIiwgDQoiXHU5NzU5IjoiXHU5NzVjIiwgDQoiXHU5NzYzIjoiXHU5NzYyIiwgDQoiXHU5NzY1IjoiXHU5NzY4IiwgDQoiXHU5NzkxIjoiXHU5N2MzIiwgDQoiXHU5NzkyIjoiXHU2YTQ3IiwgDQoiXHU5N2FmIjoiXHU5N2M5IiwgDQoiXHU5N2U2IjoiXHU5N2NiIiwgDQoiXHU5N2U3IjoiXHU5N2NjIiwgDQoiXHU5N2U4IjoiXHU5N2NkIiwgDQoiXHU5N2U5IjoiXHU5N2QzIiwgDQoiXHU5N2VhIjoiXHU5N2Q5IiwgDQoiXHU5N2ViIjoiXHU5N2RlIiwgDQoiXHU5N2VjIjoiXHU5N2RjIiwgDQoiXHU5N2Y1IjoiXHU5N2ZiIiwgDQoiXHU5ODc1IjoiXHU5ODAxIiwgDQoiXHU5ODc2IjoiXHU5ODAyIiwgDQoiXHU5ODc3IjoiXHU5ODAzIiwgDQoiXHU5ODc4IjoiXHU5ODA3IiwgDQoiXHU5ODc5IjoiXHU5ODA1IiwgDQoiXHU5ODdhIjoiXHU5ODA2IiwgDQoiXHU5ODdiIjoiXHU5ODA4IiwgDQoiXHU5ODdjIjoiXHU5ODBhIiwgDQoiXHU5ODdkIjoiXHU5ODExIiwgDQoiXHU5ODdlIjoiXHU5ODY3IiwgDQoiXHU5ODdmIjoiXHU5ODEzIiwgDQoiXHU5ODgwIjoiXHU5ODBlIiwgDQoiXHU5ODgxIjoiXHU5ODEyIiwgDQoiXHU5ODgyIjoiXHU5ODBjIiwgDQoiXHU5ODgzIjoiXHU5ODBmIiwgDQoiXHU5ODg0IjoiXHU5ODEwIiwgDQoiXHU5ODg1IjoiXHU5ODcxIiwgDQoiXHU5ODg2IjoiXHU5ODE4IiwgDQoiXHU5ODg3IjoiXHU5ODE3IiwgDQoiXHU5ODg4IjoiXHU5ODM4IiwgDQoiXHU5ODg5IjoiXHU5ODIxIiwgDQoiXHU5ODhhIjoiXHU5ODMwIiwgDQoiXHU5ODhiIjoiXHU5ODMyIiwgDQoiXHU5ODhjIjoiXHU5ODFjIiwgDQoiXHU5ODhkIjoiXHU2ZjQxIiwgDQoiXHU5ODhmIjoiXHU5ODI2IiwgDQoiXHU5ODkwIjoiXHU5ODI0IiwgDQoiXHU5ODkxIjoiXHU5ODNiIiwgDQoiXHU5ODkzIjoiXHU5ODM5IiwgDQoiXHU5ODk0IjoiXHU5ODM3IiwgDQoiXHU5ODk2IjoiXHU3YTRlIiwgDQoiXHU5ODk3IjoiXHU5ODQ2IiwgDQoiXHU5ODk4IjoiXHU5ODRjIiwgDQoiXHU5ODk5IjoiXHU5ODUyIiwgDQoiXHU5ODlhIjoiXHU5ODRlIiwgDQoiXHU5ODliIjoiXHU5ODUzIiwgDQoiXHU5ODljIjoiXHU5ODRmIiwgDQoiXHU5ODlkIjoiXHU5ODRkIiwgDQoiXHU5ODllIjoiXHU5ODczIiwgDQoiXHU5ODlmIjoiXHU5ODYyIiwgDQoiXHU5OGEwIjoiXHU5ODViIiwgDQoiXHU5OGExIjoiXHU5ODU5IiwgDQoiXHU5OGEyIjoiXHU5ODY1IiwgDQoiXHU5OGE0IjoiXHU5ODZiIiwgDQoiXHU5OGE1IjoiXHU5ODZjIiwgDQoiXHU5OGE2IjoiXHU5ODcwIiwgDQoiXHU5OGE3IjoiXHU5ODc0IiwgDQoiXHU5OGNlIjoiXHU5OGE4IiwgDQoiXHU5OGQxIjoiXHU5OGFlIiwgDQoiXHU5OGQyIjoiXHU5OGFmIiwgDQoiXHU5OGQzIjoiXHU5OGI2IiwgDQoiXHU5OGQ0IjoiXHU5OGI4IiwgDQoiXHU5OGQ1IjoiXHU5OGJjIiwgDQoiXHU5OGQ3IjoiXHU5OGMwIiwgDQoiXHU5OGQ4IjoiXHU5OGM0IiwgDQoiXHU5OGQ5IjoiXHU5OGM2IiwgDQoiXHU5OGRhIjoiXHU5OGM4IiwgDQoiXHU5OGRlIjoiXHU5OGRiIiwgDQoiXHU5OGU4IjoiXHU5OTU3IiwgDQoiXHU5OTBkIjoiXHU5OTVjIiwgDQoiXHU5OTY1IjoiXHU5OGUyIiwgDQoiXHU5OTY2IjoiXHU5OGU1IiwgDQoiXHU5OTY3IjoiXHU5OTMzIiwgDQoiXHU5OTY4IjoiXHU5OGU5IiwgDQoiXHU5OTY5IjoiXHU5OTNjIiwgDQoiXHU5OTZhIjoiXHU5OGVhIiwgDQoiXHU5OTZiIjoiXHU5OGViIiwgDQoiXHU5OTZjIjoiXHU5OGVkIiwgDQoiXHU5OTZkIjoiXHU5OGVmIiwgDQoiXHU5OTZlIjoiXHU5OGYyIiwgDQoiXHU5OTZmIjoiXHU5OTFlIiwgDQoiXHU5OTcwIjoiXHU5OGZlIiwgDQoiXHU5OTcxIjoiXHU5OGZkIiwgDQoiXHU5OTcyIjoiXHU5OGZjIiwgDQoiXHU5OTczIjoiXHU5OGZmIiwgDQoiXHU5OTc0IjoiXHU5OGY0IiwgDQoiXHU5OTc1IjoiXHU5OTBjIiwgDQoiXHU5OTc2IjoiXHU5OTUyIiwgDQoiXHU5OTc3IjoiXHU5OTA5IiwgDQoiXHU5OTc4IjoiXHU5OTA0IiwgDQoiXHU5OTc5IjoiXHU5OTBlIiwgDQoiXHU5OTdhIjoiXHU5OTAzIiwgDQoiXHU5OTdiIjoiXHU5OTBmIiwgDQoiXHU5OTdjIjoiXHU5OTA1IiwgDQoiXHU5OTdkIjoiXHU5OTExIiwgDQoiXHU5OTdmIjoiXHU5OTEzIiwgDQoiXHU5OTgwIjoiXHU5OTE4IiwgDQoiXHU5OTgxIjoiXHU5OTEyIiwgDQoiXHU5OTgzIjoiXHU5OTFjIiwgDQoiXHU5OTg0IjoiXHU5OTFiIiwgDQoiXHU5OTg1IjoiXHU5OTIxIiwgDQoiXHU5OTg2IjoiXHU5OTI4IiwgDQoiXHU5OTg3IjoiXHU5OTM3IiwgDQoiXHU5OTg4IjoiXHU5OTRiIiwgDQoiXHU5OTg5IjoiXHU5OTM2IiwgDQoiXHU5OThhIjoiXHU5OTNmIiwgDQoiXHU5OThiIjoiXHU5OTVlIiwgDQoiXHU5OThkIjoiXHU5OTQzIiwgDQoiXHU5OThlIjoiXHU5OTNhIiwgDQoiXHU5OThmIjoiXHU5OTNlIiwgDQoiXHU5OTkwIjoiXHU5OTQ4IiwgDQoiXHU5OTkxIjoiXHU5OTQ5IiwgDQoiXHU5OTkyIjoiXHU5OTQ1IiwgDQoiXHU5OTkzIjoiXHU5OTRhIiwgDQoiXHU5OTk0IjoiXHU5OTRjIiwgDQoiXHU5OTk1IjoiXHU5OTVmIiwgDQoiXHU5YTAzIjoiXHU1NDQ2IiwgDQoiXHU5YTZjIjoiXHU5OWFjIiwgDQoiXHU5YTZkIjoiXHU5OWFkIiwgDQoiXHU5YTZlIjoiXHU5OWIxIiwgDQoiXHU5YTZmIjoiXHU5OWI0IiwgDQoiXHU5YTcwIjoiXHU5OWIzIiwgDQoiXHU5YTcxIjoiXHU5YTQ1IiwgDQoiXHU5YTczIjoiXHU5OWMxIiwgDQoiXHU5YTc0IjoiXHU5YTYyIiwgDQoiXHU5YTc1IjoiXHU5OWQ0IiwgDQoiXHU5YTc2IjoiXHU5OWRiIiwgDQoiXHU5YTc3IjoiXHU5OWRmIiwgDQoiXHU5YTc4IjoiXHU5OWQ5IiwgDQoiXHU5YTc5IjoiXHU5OWQyIiwgDQoiXHU5YTdhIjoiXHU5YTM2IiwgDQoiXHU5YTdiIjoiXHU5OWQwIiwgDQoiXHU5YTdjIjoiXHU5OWRkIiwgDQoiXHU5YTdkIjoiXHU5OWQxIiwgDQoiXHU5YTdlIjoiXHU5OWQ1IiwgDQoiXHU5YTdmIjoiXHU5YTViIiwgDQoiXHU5YTgwIjoiXHU5OWQ4IiwgDQoiXHU5YTgxIjoiXHU5YTRkIiwgDQoiXHU5YTgyIjoiXHU3Zjc1IiwgDQoiXHU5YTg0IjoiXHU5YTU1IiwgDQoiXHU5YTg1IjoiXHU5YTRhIiwgDQoiXHU5YTg2IjoiXHU5OWYxIiwgDQoiXHU5YTg3IjoiXHU5OWVkIiwgDQoiXHU5YTg4IjoiXHU5OWUyIiwgDQoiXHU5YThhIjoiXHU5YTZhIiwgDQoiXHU5YThiIjoiXHU5YTAxIiwgDQoiXHU5YThjIjoiXHU5YTU3IiwgDQoiXHU5YThlIjoiXHU5OWY4IiwgDQoiXHU5YThmIjoiXHU5OWZmIiwgDQoiXHU5YTkwIjoiXHU5YTBmIiwgDQoiXHU5YTkxIjoiXHU5YTBlIiwgDQoiXHU5YTkyIjoiXHU5YTBkIiwgDQoiXHU5YTkzIjoiXHU5YTA1IiwgDQoiXHU5YTk2IjoiXHU5YTQyIiwgDQoiXHU5YTk3IjoiXHU5YTE5IiwgDQoiXHU5YTk4IjoiXHU5YTJkIiwgDQoiXHU5YTlhIjoiXHU5YTM3IiwgDQoiXHU5YTliIjoiXHU5YTE2IiwgDQoiXHU5YTljIjoiXHU5YTQxIiwgDQoiXHU5YTlkIjoiXHU5YTJlIiwgDQoiXHU5YTllIjoiXHU5YTJiIiwgDQoiXHU5YTlmIjoiXHU5YTM4IiwgDQoiXHU5YWEwIjoiXHU5YTQzIiwgDQoiXHU5YWExIjoiXHU5YTNlIiwgDQoiXHU5YWEyIjoiXHU5YTQ0IiwgDQoiXHU5YWEzIjoiXHU5YTRmIiwgDQoiXHU5YWE0IjoiXHU5YTVmIiwgDQoiXHU5YWE1IjoiXHU5YTY1IiwgDQoiXHU5YWE3IjoiXHU5YTY0IiwgDQoiXHU5YWM1IjoiXHU5YWNmIiwgDQoiXHU5YWNiIjoiXHU5YWQ2IiwgDQoiXHU5YWNjIjoiXHU5YWQ1IiwgDQoiXHU5YjEzIjoiXHU5YjIyIiwgDQoiXHU5YjQ3IjoiXHU5YjU4IiwgDQoiXHU5YjQ5IjoiXHU5YjRlIiwgDQoiXHU5YzdjIjoiXHU5YjVhIiwgDQoiXHU5YzdkIjoiXHU5YjViIiwgDQoiXHU5YzdmIjoiXHU5Yjc3IiwgDQoiXHU5YzgxIjoiXHU5YjZmIiwgDQoiXHU5YzgyIjoiXHU5Yjc0IiwgDQoiXHU5Yzg1IjoiXHU5YjgxIiwgDQoiXHU5Yzg2IjoiXHU5YjgzIiwgDQoiXHU5Yzg3IjoiXHU5YmYwIiwgDQoiXHU5Yzg4IjoiXHU5Yzc4IiwgDQoiXHU5YzhhIjoiXHU5YjkzIiwgDQoiXHU5YzhiIjoiXHU5YjkyIiwgDQoiXHU5YzhkIjoiXHU5YjkxIiwgDQoiXHU5YzhlIjoiXHU5YzVmIiwgDQoiXHU5YzhmIjoiXHU5YjhkIiwgDQoiXHU5YzkwIjoiXHU5YjkwIiwgDQoiXHU5YzkxIjoiXHU5YmFkIiwgDQoiXHU5YzkyIjoiXHU5YjlhIiwgDQoiXHU5Yzk0IjoiXHU5YmFhIiwgDQoiXHU5Yzk1IjoiXHU5YjllIiwgDQoiXHU5Yzk2IjoiXHU5YmE2IiwgDQoiXHU5Yzk3IjoiXHU5YzAyIiwgDQoiXHU5Yzk5IjoiXHU5YzYwIiwgDQoiXHU5YzlhIjoiXHU5YzZkIiwgDQoiXHU5YzliIjoiXHU5YmFiIiwgDQoiXHU5YzljIjoiXHU5YmFlIiwgDQoiXHU5YzlkIjoiXHU5YmJhIiwgDQoiXHU5YzllIjoiXHU5YmQ3IiwgDQoiXHU5YzlmIjoiXHU5YzU4IiwgDQoiXHU5Y2EwIjoiXHU5YmMxIiwgDQoiXHU5Y2ExIjoiXHU5YzdhIiwgDQoiXHU5Y2EyIjoiXHU5YzMxIiwgDQoiXHU5Y2EzIjoiXHU5YzM5IiwgDQoiXHU5Y2E0IjoiXHU5YmM5IiwgDQoiXHU5Y2E1IjoiXHU5YzIzIiwgDQoiXHU5Y2E2IjoiXHU5YzM3IiwgDQoiXHU5Y2E3IjoiXHU5YmMwIiwgDQoiXHU5Y2E4IjoiXHU5YmNhIiwgDQoiXHU5Y2E5IjoiXHU5YmM3IiwgDQoiXHU5Y2FiIjoiXHU5YmZkIiwgDQoiXHU5Y2FkIjoiXHU5YmQ2IiwgDQoiXHU5Y2FlIjoiXHU5YmVhIiwgDQoiXHU5Y2IwIjoiXHU5YmViIiwgDQoiXHU5Y2IxIjoiXHU5YmUxIiwgDQoiXHU5Y2IyIjoiXHU5YmU0IiwgDQoiXHU5Y2IzIjoiXHU5YmU3IiwgDQoiXHU5Y2I0IjoiXHU5YmRkIiwgDQoiXHU5Y2I1IjoiXHU5YmUyIiwgDQoiXHU5Y2I2IjoiXHU5YmYwIiwgDQoiXHU5Y2I3IjoiXHU5YmRiIiwgDQoiXHU5Y2I4IjoiXHU5YmU4IiwgDQoiXHU5Y2JhIjoiXHU5YmY0IiwgDQoiXHU5Y2JiIjoiXHU5YmQ0IiwgDQoiXHU5Y2JjIjoiXHU5YzVkIiwgDQoiXHU5Y2JkIjoiXHU5YzA4IiwgDQoiXHU5Y2JmIjoiXHU5YzY4IiwgDQoiXHU5Y2MxIjoiXHU5YzFiIiwgDQoiXHU5Y2MzIjoiXHU5YzEzIiwgDQoiXHU5Y2M0IjoiXHU5Yzc3IiwgDQoiXHU5Y2M1IjoiXHU5YzBkIiwgDQoiXHU5Y2M2IjoiXHU5YzEyIiwgDQoiXHU5Y2M3IjoiXHU5YzA5IiwgDQoiXHU5Y2NhIjoiXHU5YmZmIiwgDQoiXHU5Y2NiIjoiXHU5YzIwIiwgDQoiXHU5Y2NjIjoiXHU5YzMyIiwgDQoiXHU5Y2NkIjoiXHU5YzJkIiwgDQoiXHU5Y2NlIjoiXHU5YzI4IiwgDQoiXHU5Y2NmIjoiXHU5YzI1IiwgDQoiXHU5Y2QwIjoiXHU5YzI5IiwgDQoiXHU5Y2QxIjoiXHU5YzFmIiwgDQoiXHU5Y2QyIjoiXHU5YzFjIiwgDQoiXHU5Y2QzIjoiXHU5YzMzIiwgDQoiXHU5Y2Q0IjoiXHU5YzNlIiwgDQoiXHU5Y2Q1IjoiXHU5YzQ4IiwgDQoiXHU5Y2Q2IjoiXHU5YzQ5IiwgDQoiXHU5Y2Q3IjoiXHU5YzNiIiwgDQoiXHU5Y2Q4IjoiXHU5YzM1IiwgDQoiXHU5Y2Q5IjoiXHU5YzQ1IiwgDQoiXHU5Y2RiIjoiXHU5YzNjIiwgDQoiXHU5Y2RjIjoiXHU5YzU2IiwgDQoiXHU5Y2RkIjoiXHU5YzU0IiwgDQoiXHU5Y2RlIjoiXHU5YzU3IiwgDQoiXHU5Y2RmIjoiXHU5YzUyIiwgDQoiXHU5Y2UyIjoiXHU5YzY3IiwgDQoiXHU5Y2UzIjoiXHU5YzYzIiwgDQoiXHU5ZDhmIjoiXHU5NmRlIiwgDQoiXHU5ZGM0IjoiXHU5NmRlIiwgDQoiXHU5ZTFmIjoiXHU5Y2U1IiwgDQoiXHU5ZTIwIjoiXHU5Y2U5IiwgDQoiXHU5ZTIxIjoiXHU5NmRlIiwgDQoiXHU5ZTIyIjoiXHU5Y2Y2IiwgDQoiXHU5ZTIzIjoiXHU5Y2Y0IiwgDQoiXHU5ZTI1IjoiXHU5ZGQ3IiwgDQoiXHU5ZTI2IjoiXHU5ZDA5IiwgDQoiXHU5ZTI3IjoiXHU5ZGFjIiwgDQoiXHU5ZTI4IjoiXHU5ZDA3IiwgDQoiXHU5ZTI5IjoiXHU5ZDA2IiwgDQoiXHU5ZTJhIjoiXHU5ZDIzIiwgDQoiXHU5ZTJiIjoiXHU5ZDg3IiwgDQoiXHU5ZTJjIjoiXHU5ZTE1IiwgDQoiXHU5ZTJkIjoiXHU5ZDI4IiwgDQoiXHU5ZTJlIjoiXHU5ZDFlIiwgDQoiXHU5ZTJmIjoiXHU5ZDI2IiwgDQoiXHU5ZTMwIjoiXHU5ZDEyIiwgDQoiXHU5ZTMxIjoiXHU5ZDFmIiwgDQoiXHU5ZTMyIjoiXHU5ZDFkIiwgDQoiXHU5ZTMzIjoiXHU5ZDFiIiwgDQoiXHU5ZTM1IjoiXHU5ZDE1IiwgDQoiXHU5ZTM2IjoiXHU5ZGU1IiwgDQoiXHU5ZTM3IjoiXHU5ZGQ5IiwgDQoiXHU5ZTM4IjoiXHU5ZDJmIiwgDQoiXHU5ZTM5IjoiXHU5ZDMwIiwgDQoiXHU5ZTNhIjoiXHU5ZDQyIiwgDQoiXHU5ZTNiIjoiXHU5ZDM0IiwgDQoiXHU5ZTNjIjoiXHU5ZDQzIiwgDQoiXHU5ZTNkIjoiXHU5ZDNmIiwgDQoiXHU5ZTNlIjoiXHU5ZTFlIiwgDQoiXHU5ZTNmIjoiXHU5ZDNiIiwgDQoiXHU5ZTQxIjoiXHU5ZDUzIiwgDQoiXHU5ZTQyIjoiXHU5ZTFkIiwgDQoiXHU5ZTQzIjoiXHU5ZDUxIiwgDQoiXHU5ZTQ0IjoiXHU5ZDYwIiwgDQoiXHU5ZTQ1IjoiXHU5ZDVkIiwgDQoiXHU5ZTQ2IjoiXHU5ZDUyIiwgDQoiXHU5ZTQ3IjoiXHU5ZGY0IiwgDQoiXHU5ZTQ4IjoiXHU5ZDVjIiwgDQoiXHU5ZTQ5IjoiXHU5ZDYxIiwgDQoiXHU5ZTRhIjoiXHU5ZDcyIiwgDQoiXHU5ZTRiIjoiXHU5ZDkzIiwgDQoiXHU5ZTRjIjoiXHU5ZDZhIiwgDQoiXHU5ZTRlIjoiXHU5ZDZmIiwgDQoiXHU5ZTRmIjoiXHU5ZDZjIiwgDQoiXHU5ZTUwIjoiXHU5ZDZlIiwgDQoiXHU5ZTUxIjoiXHU5ZDg5IiwgDQoiXHU5ZTUyIjoiXHU5ZDhhIiwgDQoiXHU5ZTU1IjoiXHU5ZDk4IiwgDQoiXHU5ZTU2IjoiXHU5ZGExIiwgDQoiXHU5ZTU3IjoiXHU5ZDlhIiwgDQoiXHU5ZTU4IjoiXHU5ZGJiIiwgDQoiXHU5ZTU5IjoiXHU5ZDk2IiwgDQoiXHU5ZTVhIjoiXHU5ZGJmIiwgDQoiXHU5ZTViIjoiXHU5ZGE1IiwgDQoiXHU5ZTVjIjoiXHU5ZGE5IiwgDQoiXHU5ZTVlIjoiXHU5ZGMyIiwgDQoiXHU5ZTYxIjoiXHU5ZGJhIiwgDQoiXHU5ZTYzIjoiXHU5ZGJjIiwgDQoiXHU5ZTY0IjoiXHU5ZGI0IiwgDQoiXHU5ZTY1IjoiXHU5ZGQ2IiwgDQoiXHU5ZTY2IjoiXHU5ZTFhIiwgDQoiXHU5ZTY3IjoiXHU5ZGQzIiwgDQoiXHU5ZTY4IjoiXHU5ZGRhIiwgDQoiXHU5ZTY5IjoiXHU5ZGVmIiwgDQoiXHU5ZTZhIjoiXHU5ZGU2IiwgDQoiXHU5ZTZiIjoiXHU5ZGYyIiwgDQoiXHU5ZTZjIjoiXHU5ZGY4IiwgDQoiXHU5ZTZkIjoiXHU5ZGZhIiwgDQoiXHU5ZTZmIjoiXHU5ZTA3IiwgDQoiXHU5ZTcwIjoiXHU5ZGY5IiwgDQoiXHU5ZTcxIjoiXHU5ZTBjIiwgDQoiXHU5ZTczIjoiXHU5ZTFiIiwgDQoiXHU5ZTdlIjoiXHU5ZTdhIiwgDQoiXHU5ZWE2IjoiXHU5ZWE1IiwgDQoiXHU5ZWI4IjoiXHU5ZWE5IiwgDQoiXHU5ZWJkIjoiXHU5ZWJjIiwgDQoiXHU5ZWM0IjoiXHU5ZWMzIiwgDQoiXHU5ZWM5IjoiXHU5ZWNjIiwgDQoiXHU5ZWUxIjoiXHU5ZWY2IiwgDQoiXHU5ZWU5IjoiXHU5ZWY3IiwgDQoiXHU5ZWVhIjoiXHU5ZWYyIiwgDQoiXHU5ZWZlIjoiXHU5ZWZkIiwgDQoiXHU5ZjBiIjoiXHU5ZWZmIiwgDQoiXHU5ZjBkIjoiXHU5ZjA5IiwgDQoiXHU5ZjM5IjoiXHU5ZjM0IiwgDQoiXHU5ZjUwIjoiXHU5ZjRhIiwgDQoiXHU5ZjUxIjoiXHU5ZjRmIiwgDQoiXHU5Zjc2IjoiXHU5ODRlIiwgDQoiXHU5ZjdmIjoiXHU5ZjUyIiwgDQoiXHU5ZjgwIjoiXHU5ZjU0IiwgDQoiXHU5ZjgzIjoiXHU5ZjVmIiwgDQoiXHU5Zjg0IjoiXHU5ZjYxIiwgDQoiXHU5Zjg1IjoiXHU5ZjU5IiwgDQoiXHU5Zjg2IjoiXHU5ZjYwIiwgDQoiXHU5Zjg3IjoiXHU5ZjVjIiwgDQoiXHU5Zjg4IjoiXHU5ZjY2IiwgDQoiXHU5Zjg5IjoiXHU5ZjZjIiwgDQoiXHU5ZjhhIjoiXHU5ZjZhIiwgDQoiXHU5ZjhiIjoiXHU5ZjcyIiwgDQoiXHU5ZjhjIjoiXHU5Zjc3IiwgDQoiXHU5Zjk5IjoiXHU5ZjhkIiwgDQoiXHU5ZjlhIjoiXHU5Zjk0IiwgDQoiXHU5ZjliIjoiXHU5Zjk1IiwgDQoiXHU5ZjlmIjoiXHU5ZjljIiwgDQoiXHVlNWYxIjoiXHUzMDAwIg0KfTsNCg0KZnVuY3Rpb24gdG9UcmFkKGl0eHQpewkNCgl2YXIgemhtYXAgPSBUb25nV2VuLnNfMl90Ow0KCQkNCglpdHh0ID0gaXR4dC5yZXBsYWNlKC9bXlx4MDAtXHhGRl0vZywgIGZ1bmN0aW9uKHMpewkJCQ0KCQkJcmV0dXJuICgocyBpbiB6aG1hcCk/emhtYXBbc106cyk7DQoJCX0NCgkpOw0KCXJldHVybiAJaXR4dDsNCn0NCg0KZnVuY3Rpb24gZG9BRG9jKGN1ckRvYykgew0KCXRyeSB7CQkNCgkJdHJhblhwYXRoVGV4dChjdXJEb2MpOw0KCQkvL3RyYW5YcGF0aFRleHRhcmVhKGN1ckRvYyk7DQoJCS8vdHJhblhwYXRoSW5wdXQoY3VyRG9jKTsNCgl9IGNhdGNoKGV4KSB7DQoJCWFsZXJ0KCJkb0FEb2MgIiArIGV4ICsgY3VyRG9jICsgIiBuYW1lOiAiICsgY3VyRG9jLm5vZGVOYW1lKTsNCgl9DQp9DQoNCmZ1bmN0aW9uIGRvRnJhbWVzKGN1ckRvYywgZGVlcCkgew0KCXZhciBGUkFNRURFRVAgPSAxODsNCgkNCgl0cnkgewkNCgkJLy8gQXQgbGVhc3QgZG8gY3VycmVudCBkb2Mgb25jZS4NCgkJZG9BRG9jKGN1ckRvYyk7DQoJCSsrZGVlcDsNCgkJDQoJCXZhciBmcmFtZURvY0FyeSA9W107DQoJCQ0KCQlmdW5jdGlvbiBhZGRGcmFtZUNvbGxlY3Rpb24oY3VyRG9jLCBkZWVwKXsJCQ0KCQkJdmFyIG15X2ZyYW1lcyA9IGN1ckRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgiRlJBTUUiKTsJCQ0KCQkJdmFyIG15X2ZyYW1lc19sZW4gPSBteV9mcmFtZXMubGVuZ3RoOw0KDQoJCQlpZiAoKG15X2ZyYW1lc19sZW4gPiAwKSAmJiAoZGVlcCA8IEZSQU1FREVFUCkpIHsNCgkJCQlmb3IgKHZhciBpID0gMDsgaSA8IG15X2ZyYW1lc19sZW47IGkrKykgew0KCQkJCQl2YXIgZnJhbWVEb2MgPSBteV9mcmFtZXNbaV0uY29udGVudERvY3VtZW50Ow0KCQkJCQlmcmFtZURvY0FyeS5wdXNoKGZyYW1lRG9jKTsNCgkJCQkJYWRkRnJhbWVDb2xsZWN0aW9uKGZyYW1lRG9jLCArK2RlZXApOw0KCQkJCX0NCgkJCX0NCgkJCQ0KCQkJLyoNCgkJCXZhciBpRnJhbWVzID0gY3VyRG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCJJRlJBTUUiKTsNCgkJCXZhciBpRnJhbWVzX2xlbiA9IGlGcmFtZXMubGVuZ3RoOw0KDQoJCQlpZiAoKGlGcmFtZXNfbGVuID4gMCkgJiYgKGRlZXAgPCBGUkFNRURFRVApKSB7CQkJCQ0KCQkJCWZvciAodmFyIGkgPSAwOyBpIDwgaUZyYW1lc19sZW47IGkrKykgew0KCQkJCQl2YXIgaWZyYW1lRG9jID0gaUZyYW1lc1tpXS5jb250ZW50RG9jdW1lbnQ7DQoJCQkJCWZyYW1lRG9jQXJ5LnB1c2goaWZyYW1lRG9jKTsNCgkJCQkJYWRkRnJhbWVDb2xsZWN0aW9uKGlmcmFtZURvYywgKytkZWVwKTsNCgkJCQl9DQoJCQl9DQoJCQkqLw0KCQl9CQkNCgkJDQoJCWFkZEZyYW1lQ29sbGVjdGlvbihjdXJEb2MsIGRlZXApOw0KCQkNCgkJZm9yICh2YXIgaSA9IDA7IGkgPCBmcmFtZURvY0FyeS5sZW5ndGg7IGkrKykgew0KCQkJZG9BRG9jKGZyYW1lRG9jQXJ5W2ldKTsNCgkJfQ0KDQoJfSBjYXRjaChleCkgew0KCQlhbGVydCgiZG9GcmFtZXM6ICIgKyBleCk7DQoJfQ0KfQ0KDQpmdW5jdGlvbiB0cmFuWHBhdGhUZXh0KGN1ckRvYyl7DQoJaWYgKGN1ckRvYy5ldmFsdWF0ZSl7DQoJCS8vdmFyIHhwciA9ICcvL3RleHQoKVtzdHJpbmctbGVuZ3RoKG5vcm1hbGl6ZS1zcGFjZSguKSk+MF1bbmFtZSguLikhPSJTQ1JJUFQiXVtuYW1lKC4uKSE9IlNUWUxFIl0nOw0KCQl2YXIgeHByID0gJy8vdGV4dCgpW25vcm1hbGl6ZS1zcGFjZSguKV1bbmFtZSguLikhPSJTQ1JJUFQiXVtuYW1lKC4uKSE9IlNUWUxFIl0nOw0KCQkNCgkJdmFyIHRleHRub2RlcyA9IGN1ckRvYy5ldmFsdWF0ZSh4cHIsIGN1ckRvYywgIG51bGwsIFhQYXRoUmVzdWx0LlVOT1JERVJFRF9OT0RFX1NOQVBTSE9UX1RZUEUsICBudWxsKTsNCgkJdmFyIHRleHRub2Rlc19sZW5ndGggPSB0ZXh0bm9kZXMuc25hcHNob3RMZW5ndGg7DQoJCS8vdmFyIGN1ck5vZGUgPSBudWxsOw0KDQoJCWZvciAodmFyIGk9MCwgbj10ZXh0bm9kZXNfbGVuZ3RoLCB0ZXh0Tm9kZXMgPSB0ZXh0bm9kZXM7IGk8bjsgKytpKSB7DQoJCQl2YXIgY3VyTm9kZSA9IHRleHROb2Rlcy5zbmFwc2hvdEl0ZW0oaSk7DQoJCQkNCgkJCS8vaWYgKC9bXlx4MjAtXHhGRl0rLy50ZXN0KGN1ck5vZGUuZGF0YSkpew0KCQkJLy9pZiAoLyV1Ly50ZXN0KGVzY2FwZShjdXJOb2RlLmRhdGEpKSl7DQoJCQkJY3VyTm9kZS5kYXRhID0gdG9UcmFkKGN1ck5vZGUuZGF0YSk7DQoJCQkvL30NCgkJfQkJDQoJfWVsc2Ugew0KCQl3aW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB0b1RyYWQod2luZG93LmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MKTsNCgl9DQp9DQoNCg0KDQpmdW5jdGlvbiBjb252ZXJ0X3RyYWQoKXsNCgl2YXIgY3VyRG9jID0gd2luZG93LmRvY3VtZW50OwkNCglpZiAoY3VyRG9jIGluc3RhbmNlb2YgSFRNTERvY3VtZW50KSB7DQoJCWRvRnJhbWVzKGN1ckRvYywwKTsNCgl9DQp9DQoNCmNvbnZlcnRfdHJhZCgpOw==";
		}
	}, {
		label: "頁面編碼GB互轉UTF8",
		command: function(event) {
			BrowserSetForcedCharacterSet(gBrowser.mCurrentBrowser._docShell.charset == 'gbk' ? 'utf-8' : 'gbk');
		}
	}, {
		label: "網址向上一層",
		command: function(event) {
			loadURI(content.location.host + content.location.pathname.replace(/\/[^\/]+\/?$/, ""));
		}
	}, {
		label: "URL中的數字遞增",
		command: function(event) {
			loadURI(content.location.href.replace(/(\d+)(?=\D*$)/, function($0) {
				return +$0 + 1
			}));
		}
	}, {
		label: "URL中的數字遞減",
		command: function(event) {
			loadURI(content.location.href.replace(/(\d+)(?=\D*$)/, function($0) {
				return +$0 - 1 > 0 ? +$0 - 1 : 0;
			}));
		}
	}, {
		label: "開啟about:config",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab("about:config");
		}
	}, {
		label: "開啟Chrome目錄",
		command: function(event) {
			Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
		}
	}, {
		label: "開啟Profile目錄",
		command: function(event) {
			Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).reveal();
		}
	}, {
		label: "開啟我的電腦",
		command: function(event) {
			try {
				var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("WinD", Components.interfaces.nsILocalFile);
				file.append("explorer.exe");
				var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
				process.init(file);
				process.run(false, [","], 1);

			} catch (ex) {
				alert("開啟我的電腦失敗!")
			}
		}
	}, {
		label: "開啟音量控制器",
		command: function(event) {
			try {
				var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsILocalFile);
				file.append(/6/.test(navigator.oscpu) ? "sndvol.exe" : "sndvol32.exe");
				var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
				process.init(file);
				process.run(false, ["-f"], 1);
			} catch (ex) {
				alert("開啟音量控制器失敗!")
			}
		}
	}, {
		label: "開啟任務管理器",
		command: function(event) {
			try {
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				file.initWithPath(Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsILocalFile).path + "\\taskmgr.exe");
				file.launch();
			} catch (ex) {
				alert("開啟任務管理器失敗!")
			}
		}
	}, {
		label: "用IE開啟當前頁",
		command: function(event) {
			try {
				var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
				file.append("Internet Explorer");
				file.append("iexplore.exe");
				var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
				process.init(file);
				process.run(false, [content.location.href], 1);
			} catch (ex) {
				alert("開啟IE失敗!")
			}
		}
	}, {
		label: "開啟選項",
		command: function(event) {
			openPreferences();
		}
	}, {
		label: "開啟附加元件",
		command: function(event) {
			BrowserOpenAddonsMgr();
		}
	}, {
		label: "開啟附加元件(新視窗)",
		command: function(event) {
			window.open("about:addons", "history-pane", "chrome,resizable=yes,centerscreen").resizeTo(800, 600);
		}
	}, {
		label: "開啟下載視窗",
		command: function(event) {
			BrowserDownloadsUI();
		}
	}, {
		label: "開啟瀏覽紀錄視窗",
		command: function(event) {
			PlacesCommandHook.showPlacesOrganizer('History');
		}
	}, {
		label: "開啟錯誤控制台",
		command: function(event) {
			toJavaScriptConsole();
		}
	}, {
		label: "開啟定制工具欄視窗",
		command: function(event) {
			BrowserCustomizeToolbar();
		}
	}, {
		label: "開啟歷史視窗(側邊欄)",
		command: function(event) {
			toggleSidebar('viewHistorySidebar');
		}
	}, {
		label: "開啟歷史視窗(新視窗)",
		command: function(event) {
			window.open("chrome://browser/content/history/history-panel.xul", "history-pane", "chrome,resizable=yes,centerscreen").resizeTo(400, 600);
		}
	}, {
		label: "開啟或關閉查找欄",
		command: function(event) {
			gFindBar.open() || gFindBar.close();
		}
	}, {
		label: "開啟檔案選單",
		command: function(event) {
			document.getElementById("file-menu").menupopup.openPopup(null, null, event.screenX, event.screenY);
		}
	}, {
		label: "開啟工具選單",
		command: function(event) {
			document.getElementById("tools-menu").menupopup.openPopup(null, null, event.screenX, event.screenY);
		}
	}, {
		label: "開啟檢視選單",
		command: function(event) {
			document.getElementById("view-menu").menupopup.openPopup(null, null, event.screenX, event.screenY);
		}
	}, {
		label: "開啟剪貼簿中的網址",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab(readFromClipboard());
		}
	}, {
		label: "側邊欄開啟當前頁面",
		command: function(event) {
			openWebPanel(content.document.title, content.location);
		}
	}, {
		label: "複製當前頁面URL",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.location);
		}
	}, {
		label: "複製當前頁面URL+標題",
		command: function(event) {
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(content.document.title + " - " + content.location);
		}
	}, {
		label: "將當前頁面設為主頁",
		command: function(event) {
			openHomeDialog(content.location);
		}
	}, {
		label: "添加所有分頁到書簽",
		command: function(event) {
			PlacesCommandHook.bookmarkCurrentPages();
		}
	}, {
		label: "查看源代碼",
		command: function(event) {
			BrowserViewSourceOfDocument(content.document);
		}
	}, {
		label: "頁面放大",
		command: function(event) {
			FullZoom.enlarge();
		}
	}, {
		label: "頁面縮小",
		command: function(event) {
			FullZoom.reduce();
		}
	}, {
		label: "切換GIF動畫循環",
		command: function(event) {
			Array.forEach(content.document.querySelectorAll("img"), function(gif) {
				try {
					gif.QueryInterface(Ci.nsIImageLoadingContent).getRequest(Ci.nsIImageLoadingContent.CURRENT_REQUEST).image.animationMode ^= 1;
				} catch (e) {}
			})
		}
	}, {
		label: "切換圖片顯示",
		command: function(event) {
			!/img, embed, object { visibility: hidden/.test(content.document.getElementsByTagName("head")[0].lastElementChild.innerHTML) ? content.document.getElementsByTagName("head")[0].appendChild(content.document.createElement("style")).innerHTML = "img, embed, object { visibility: hidden !important; }html * { background-image: none !important; }" : content.document.getElementsByTagName("head")[0].removeChild(content.document.getElementsByTagName("head")[0].lastElementChild);
		}
	}, {
		label: "切換css樣式",
		command: function(event) {
			getMarkupDocumentViewer().authorStyleDisabled ^= 1;
		}
	}, {
		label: "切換代理(無代理<->系統代理)",
		command: function(event) {
			var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			pref.setIntPref("network.proxy.type", pref.getIntPref("network.proxy.type") == 0 ? 5 : 0);
		}
	}, {
		label: "切換代理(無代理<->手動配置代理)",
		command: function(event) {
			var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			pref.setIntPref("network.proxy.type", pref.getIntPref("network.proxy.type") == 0 ? 1 : 0);
		}
	}, {
		label: "切換當前網頁顯示",
		command: function(event) {
			Application.version[0] > 3 ? getMarkupDocumentViewer().setPageMode(content.show = (typeof content.show == "undefined" || content.show == 0), {}) : ((content.show = (typeof content.show == "undefined" || content.show == 0)) ? getMarkupDocumentViewer().hide() : getMarkupDocumentViewer().show());
		}
	}, {
		label: "切換當前網頁可編輯",
		command: function(event) {
			content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";
		}
	}, {
		label: "切換選單欄顯示",
		command: function(event) {
			document.getElementById("toolbar-menubar").setAttribute("autohide", document.getElementById("toolbar-menubar").getAttribute("autohide") == "true" ? "false" : "true");
		}
	}, {
		label: "顯示分頁組管理器",
		command: function(event) {
			TabView.toggle();
		}
	}, {
		label: "無動畫顯示分頁組管理器",
		command: function(event) {
			TabView._deck ? TabView._deck.selectedIndex ^= 1 : TabView.toggle();
		}
	}, {
		label: "臨時顯示所有分頁組分頁",
		command: function(event) {
			Array.forEach(gBrowser.mTabs, function(tab) {
				tab.removeAttribute("hidden");
			})
		}
	}, {
		label: "切換分頁組",
		command: function(event) {
			TabView._initFrame(function() {
				let tabItem = TabView._window.GroupItems.getNextGroupItemTab();
				if (tabItem) window.gBrowser.selectedTab = tabItem.tab;
				else {
					TabView._initFrame(function() {
						var tab = gBrowser.addTab("about:newtab");
						TabView.moveTabTo(tab, null);
						gBrowser.selectedTab = tab;
					});
				}
			});
			// gBrowser.selectedTab = Array.filter(gBrowser.mTabs, function(tab) {
			// 	return tab._tPos > gBrowser.mCurrentTab._tPos && tab.getAttribute("hidden") == "true";
			// })[0] || Array.filter(gBrowser.mTabs, function(tab) {
			// 	return tab.getAttribute("hidden") == "true";
			// })[0];
		}
	}, {
		label: "將當前tab放入新分頁組",
		command: function(event) {
			TabView.moveTabTo(gBrowser.mCurrentTab);
		}
	}, {
		label: "顯示所有分頁縮略圖",
		command: function(event) {
			allTabs.open();
		}
	}, {
		label: "頁面可見區域截圖",
		command: function(event) {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = content.innerWidth;
			canvas.height = content.innerHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png");
		}
	}, {
		label: "頁面所有區域截圖",
		command: function(event) {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = content.document.documentElement.scrollWidth;
			canvas.height = content.document.documentElement.scrollHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png");
		}
	}, {
		label: "瀏覽器界面截圖",
		command: function(event) {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = innerWidth;
			canvas.height = innerHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), "Firefox.png");
		}
	}, {
		label: "複製擴展清單",
		command: function(event) {
			Application.extensions ? Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(Application.extensions.all.map(function(item, id) {
				return id + 1 + ": " + item._item.name;
			}).join("\n")) : Application.getExtensions(function(extensions) {
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(extensions.all.map(function(item, id) {
					return id + 1 + ": " + item._item.name;
				}).join("\n"));
			})
		}
	}, {
		label: "新建隱私瀏覽視窗",
		command: function(event) {
			OpenBrowserWindow({
				private: true
			});
		}
	}, {
		label: "儲存當前頁面",
		command: function(event) {
			saveDocument(window.content.document);
		}
	}, {
		label: "最小化視窗",
		command: function(event) {
			setTimeout("minimize()", 10);
		}
	}, {
		label: "全螢幕",
		command: function(event) {
			BrowserFullScreen();
		}
	}, {
		label: "視窗佔用螢幕左半部分",
		command: function(event) {
			resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(0, 0));
		}
	}, {
		label: "視窗佔用螢幕右半部分",
		command: function(event) {
			resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(screen.availWidth / 2, 0));
		}
	}, {
		label: "重新啟動瀏覽器",
		command: function(event) {
			BrowserUtils.restartApplication();
		}
	}, {
		label: "刪除啟動緩存並重新啟動瀏覽器",
		command: function(event) {
			Services.appinfo.invalidateCachesOnRestart() || ('BrowserUtils' in window) ? BrowserUtils.restartApplication(): Application.restart();
			// const appStartup = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);

			// // Notify all windows that an application quit has been requested.
			// var os = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
			// var cancelQuit = Components.classes["@mozilla.org/supports-PRBool;1"].createInstance(Components.interfaces.nsISupportsPRBool);
			// os.notifyObservers(cancelQuit, "quit-application-requested", null);

			// // Something aborted the quit process.
			// if (cancelQuit.data) return;

			// // Notify all windows that an application quit has been granted.
			// os.notifyObservers(null, "quit-application-granted", null);

			// // Enumerate all windows and call shutdown handlers
			// var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
			// var windows = wm.getEnumerator(null);
			// var win;
			// while (windows.hasMoreElements()) {
			// 	win = windows.getNext();
			// 	if (("tryToClose" in win) && !win.tryToClose())
			// 		return;
			// }
			// let XRE = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime);
			// if (typeof XRE.invalidateCachesOnRestart == "function")
			// 	XRE.invalidateCachesOnRestart();
			// appStartup.quit(appStartup.eRestart | appStartup.eAttemptQuit);
		}
	}, {
		label: "關閉瀏覽器",
		command: function(event) {
			goQuitApplication();
		}
	}, {
		label: "翻譯",
		command: function(event) {
			var t = content.getSelection().toString();
			if (t) {
				gBrowser.selectedTab = gBrowser.addTab("https://translate.google.com.tw/?hl=zh-TW#auto|zh-TW|" + t);
			} else {
				loadURI("https://translate.google.com.tw/translate?sl=auto&tl=zh-TW&u=" + content.location);
			}
		}
	}
];

/******************************************************************************************
 *FeiRuoMouse 自定義鼠標拖拽命令
 *Image:FeiRuoMouse.DragScript.Image(event);
 *Text:FeiRuoMouse.DragScript.Text(event);
 *url-1:FeiRuoMouse.DragScript.Url(event);
 *url-2:FeiRuoMouse.DragScript.Url2(event);
 *******************************************************************************************/
var DragCustomCommand = [
	//示例：
	/*{
		label: "搜索相似圖片", //命令的說明文字
		Type: "Image", //拖拽圖片時的命令
		command: function(event) { //自定義命令，event為回傳事件
			var url = encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
			gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
			gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + url);
			gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
		}
	}, {
		label: "搜索框搜索鏈結文字",
		Type: "Url", //拖拽鏈結時的命令
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab();
			BrowserSearch.loadSearch(event.dataTransfer.getData("text/x-moz-url").split("\n")[1], false);
		}
	}, {
		label: "搜索框搜索選中文字[辨識URL並開啟]",
		Type: "Text", //拖拽文字時的命令
		command: function(event) {
			var Text = FeiRuoMouse.DragScript.Text(event);
			(FeiRuoMouse.DragScript.SeeAsURL(Text) && (gBrowser.selectedTab = gBrowser.addTab(Text))) || ((gBrowser.selectedTab = gBrowser.addTab()) & BrowserSearch.loadSearch(Text, false));
		}
	}, */
	/*圖片*/
	{
		label: "當前分頁開啟圖片",
		Type: "Image",
		command: function(event) {
			loadURI(event.dataTransfer.getData("application/x-moz-file-promise-url"));
		}
	}, {
		label: "新分頁開啟圖片(前景)",
		Type: "Image",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
		}
	}, {
		label: "新分頁開啟圖片(背景)",
		Type: "Image",
		command: function(event) {
			gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
		}
	}, {
		label: "當前分頁開啟圖片鏈結",
		Type: "Image",
		command: function(event) {
			loadURI(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	}, {
		label: "新分頁開啟圖片鏈結(前景)",
		Type: "Image",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	}, {
		label: "新分頁開啟圖片鏈結(背景)",
		Type: "Image",
		command: function(event) {
			gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	}, {
		label: "複製圖片地址",
		Type: "Image",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
		}
	}, {
		label: "複製圖片",
		Type: "Image",
		command: function(event) {
			(document.popupNode = content.document.createElement('img')).src = event.dataTransfer.getData("application/x-moz-file-promise-url");
			goDoCommand('cmd_copyImageContents');
		}
	}, {
		label: "下載圖片",
		Type: "Image",
		command: function(event) {
			saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, null, null, document);
		}
	}, {
		label: "下載圖片(不彈窗)",
		Type: "Image",
		command: function(event) {
			saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, true, null, document);
		}
	}, {
		label: "下載圖片(指定位置不彈窗)",
		Type: "Image",
		command: function(event) {
			var path = "c:";
			var uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null)
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(path);
			file.append(getDefaultFileName(null, uri));
			internalSave(null, null, null, null, null, null, null, {
				file: file,
				uri: uri
			}, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
		}
	}, {
		label: "搜索相似圖片(baidu)",
		Type: "Image",
		command: function(event) {
			gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
		}
	}, {
		label: "搜索相似圖片(Google)",
		Type: "Image",
		command: function(event) {
			gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
		}
	}, {
		label: "搜索相似圖片(sougou)",
		Type: "Image",
		command: function(event) {
			gBrowser.addTab('http://pic.sogou.com/ris?query=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
		}
	}, {
		label: "搜索相似圖片(tineye)",
		Type: "Image",
		command: function(event) {
			gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
		}
	}, {
		label: "搜索相似圖片(全部引擎)",
		Type: "Image",
		command: function(event) {
			var url = encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
			gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
			gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + url);
			gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
		}
	},
	/*鏈結*/
	{
		label: "當前分頁開啟鏈結",
		Type: "Url",
		command: function(event) {
			loadURI(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	}, {
		label: "新分頁開啟鏈結(前景)",
		Type: "Url",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	}, {
		label: "新分頁開啟鏈結(背景)",
		Type: "Url",
		command: function(event) {
			gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	}, {
		label: "搜索框搜索鏈結文字(前景)",
		Type: "Url",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab();
			BrowserSearch.loadSearch(event.dataTransfer.getData("text/x-moz-url").split("\n")[1], false);
		}
	}, {
		label: "搜索框搜索鏈結文字(背景)",
		Type: "Url",
		command: function(event) {
			BrowserSearch.loadSearch(event.dataTransfer.getData("text/x-moz-url").split("\n")[1], true);
		}
	}, {
		label: "Google搜索鏈結文字(前景)",
		Type: "Url",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]));
		}
	}, {
		label: "Google搜索鏈結文字(背景)",
		Type: "Url",
		command: function(event) {
			gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]));
		}
	}, {
		label: "baidu搜索鏈結文字(前景)",
		Type: "Url",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/x-moz-url").split("\n")[1]);
		}
	}, {
		label: "baidu搜索鏈結文字(背景)",
		Type: "Url",
		command: function(event) {
			gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/x-moz-url").split("\n")[1]);
		}
	}, {
		label: "複製鏈結",
		Type: "Url",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	}, {
		label: "複製鏈結文字",
		Type: "Url",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]);
		}
	}, {
		label: "下載鏈結",
		Type: "Url",
		command: function(event) {
			saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, null, null, document);
		}
	}, {
		label: "下載鏈結(不彈窗)",
		Type: "Url",
		command: function(event) {
			saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, true, null, document);
		}
	}, {
		label: "鏈結為youtube則用PotPlayer開啟否則複製鏈結文字",
		Type: "Url",
		command: function(event) {
				var edglink = event.dataTransfer.getData("text/x-moz-url").replace(/[\n\r]+/, "\n").split("\n");
				if (/https?:\/\/www\.youtube\.com\/(watch|playlis)/i.test(edglink)){
					var editor = "C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe";
					var file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
					file.initWithPath(editor);
					var process = Components.classes['@mozilla.org/process/util;1'].createInstance(Components.interfaces.nsIProcess);
					process.init(file);
					process.run(false, [edglink[0]], 1);
				} else {
					Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(edglink[1]);
				}
		}
	},
	/*文字*/
	{
		label: "搜索框搜索選中文字(前景)[辨識URL並開啟]",
		Type: "Text",
		command: function(event) {
			// (FeiRuoMouse.DragScript.SeeAsURL(event.dataTransfer.getData("text/unicode")) && (gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode")))) || ((gBrowser.selectedTab = gBrowser.addTab()) & BrowserSearch.loadSearch(event.dataTransfer.getData("text/unicode"), false));
			var Text = FeiRuoMouse.DragScript.Text(event);
			(FeiRuoMouse.DragScript.SeeAsURL(Text) && (gBrowser.selectedTab = gBrowser.addTab(Text))) || 
			((gBrowser.selectedTab = gBrowser.addTab()) & BrowserSearch.loadSearch(Text, false));
		}
	}, {
		label: "搜索框搜索選中文字(背景)[辨識URL並開啟]",
		Type: "Text",
		command: function(event) {
			(FeiRuoMouse.DragScript.SeeAsURL(event.dataTransfer.getData("text/unicode")) && gBrowser.addTab(event.dataTransfer.getData("text/unicode"))) || 
			BrowserSearch.loadSearch(event.dataTransfer.getData("text/unicode"), true);
		}
	}, {
		label: "彈出搜索框(前景)",
		Type: "Text",
		command: function(event) {
			var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup");
			var text = event.dataTransfer.getData("text/unicode");
			var serach = function() {
				popup.removeEventListener("command", serach, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
				setTimeout(function(selectedEngine) {
					gBrowser.selectedTab = gBrowser.addTab();
					BrowserSearch.loadSearch(text, false);
					popup.querySelectorAll("#" + selectedEngine.id)[0].click();
				}, 10, popup.querySelector("*[selected=true]"))
			}
			var closeSerach = function() {
				popup.removeEventListener("command", serach, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
			}
			popup.addEventListener("command", serach, false)
			popup.addEventListener("popuphidden", closeSerach, false)
			popup.openPopup(null, null, event.screenX - 100, event.screenY - 100);
		}
	}, {
		label: "彈出搜索框(背景)",
		Type: "Text",
		command: function(event) {
			var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup");
			var text = event.dataTransfer.getData("text/unicode");
			var serach = function() {
				popup.removeEventListener("command", serach, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
				setTimeout(function(selectedEngine) {
					BrowserSearch.loadSearch(text, true);
					popup.querySelectorAll("#" + selectedEngine.id)[0].click();
				}, 10, popup.querySelector("*[selected=true]"))
			}
			var closeSerach = function() {
				popup.removeEventListener("command", serach, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
			}
			popup.addEventListener("command", serach, false)
			popup.addEventListener("popuphidden", closeSerach, false)
			popup.openPopup(null, null, event.screenX - 100, event.screenY - 100);
		}
	}, {
		label: "Google搜索選中文字(前景)[辨識URL並開啟]",
		Type: "Text",
		command: function(event) {
			(FeiRuoMouse.DragScript.SeeAsURL(event.dataTransfer.getData("text/unicode")) && (gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode")))) || 
			(gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/unicode"))));
		}
	}, {
		label: "Google搜索選取文字(背景)[不辨識URL]",
		Type: "Text",
		command: function(event) {
				gBrowser.addTab("https://www.google.com.tw/search?q=" + encodeURIComponent(getBrowserSelection())) &&
				content.document.getSelection().removeAllRanges();
		}
	}, {
		label: "Google搜索選中文字(背景)[辨識URL並開啟]",
		Type: "Text",
		command: function(event) {
			(FeiRuoMouse.DragScript.SeeAsURL(event.dataTransfer.getData("text/unicode")) && gBrowser.addTab(event.dataTransfer.getData("text/unicode"))) || 
			gBrowser.addTab('https://www.google.com.tw/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/unicode"))) && content.document.getSelection().removeAllRanges();
		}
	}, {
		label: "baidu搜索選中文字(前景)[辨識URL並開啟]",
		Type: "Text",
		command: function(event) {
			(FeiRuoMouse.DragScript.SeeAsURL(event.dataTransfer.getData("text/unicode")) && (gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode")))) || 
			(gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/unicode")));
		}
	}, {
		label: "baidu搜索選中文字(背景)[辨識URL並開啟]",
		Type: "Text",
		command: function(event) {
			(FeiRuoMouse.DragScript.SeeAsURL(event.dataTransfer.getData("text/unicode")) && gBrowser.addTab(event.dataTransfer.getData("text/unicode"))) || 
			gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/unicode"));
		}
	}, {
		label: "搜索框搜索選中文字(站內)(前景)",
		Type: "Text",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab();
			BrowserSearch.loadSearch("site:" + content.location.host + " " + event.dataTransfer.getData("text/unicode"), false);
		}
	}, {
		label: "搜索框搜索選中文字(站內)(背景)",
		Type: "Text",
		command: function(event) {
			BrowserSearch.loadSearch("site:" + content.location.host + " " + event.dataTransfer.getData("text/unicode"), true);
		}
	}, {
		label: "Google搜索選中文字(站內)(前景)",
		Type: "Text",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + "site:" + content.location.host + " " + encodeURIComponent(event.dataTransfer.getData("text/unicode")));
		}
	}, {
		label: "Google搜索選中文字(站內)(背景)",
		Type: "Text",
		command: function(event) {
			gBrowser.addTab('http://www.google.com/search?q=' + "site:" + content.location.host + " " + encodeURIComponent(event.dataTransfer.getData("text/unicode")));
		}
	}, {
		label: "baidu搜索選中文字(站內)(前景)",
		Type: "Text",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/s?wd=' + "site:" + content.location.host + " " + event.dataTransfer.getData("text/unicode"));
		}
	}, {
		label: "baidu搜索選中文字(站內)(背景)",
		Type: "Text",
		command: function(event) {
			gBrowser.addTab('http://www.baidu.com/s?wd=' + "site:" + content.location.host + " " + event.dataTransfer.getData("text/unicode"));
		}
	}, {
		label: "複製文本",
		Type: "Text",
		command: function(event) {
			Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/unicode"));
		}
	}, {
		label: "Google翻譯文本 (Oos)",
		Type: "Text",
		command: function(event, self) {
					gTranslator = {
							getFocusedWindow: function() {
									var focusedWindow = document.commandDispatcher.focusedWindow;
									if (!focusedWindow || focusedWindow == window) {
											return window.content;
									} else {
											return focusedWindow;
									}
							},
							getSelectedText: function(e) {
									var focusedWindow = this.getFocusedWindow();
									var selected = focusedWindow.getSelection();
									if (selected && !selected.toString()) {
											var node = document.commandDispatcher.focusedElement;
											if (node &&
													node.ownerDocument.defaultView == focusedWindow &&
													'selectionStart' in node &&
													node.selectionStart != node.selectionEnd) {
													var offsetStart = Math.min(node.selectionStart, node.selectionEnd);
													var offsetEnd = Math.max(node.selectionStart, node.selectionEnd);
													var selectedText = node.value.substr(offsetStart, offsetEnd-offsetStart);
													return selectedText;
											}
									}
									var selectedText = selected ? selected.toString().replace(/^\s+/, "").replace(/\s+$/, "") : "";
									return selectedText;
							},
							translate: function(event, lang) {
									var div = $("mainPopupSet").appendChild($C("panel", {
											id: "gTranslator-popup",
											style: "-moz-appearance: none; background: rgb(247,247,247); border: 2px solid rgb(144,144,144); border-radius: 5px; font-size: 20px; max-width: 500px;",
											onpopuphidden: function() {this.parentNode.removeChild(this);}
									}));
									var label = div.appendChild($C("label", {
											id: "gTranslator-label",
											tooltiptext: "翻譯為\n左鍵：復制翻譯文本並關閉\n中鍵：英文\n右鍵：簡體中文\n向上滾動：繁體中文 (新分頁前台)\n向下滾動：繁體中文",
											onclick: function() {
													switch(event.button) {
															case 0:
																	var str = this.textContent;
																	XULBrowserWindow.statusTextField.label = "復制：" + str;
																	Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(str);
																	$("gTranslator-popup").hidePopup();
																	this.parentNode.removeChild(this);
															break;
															case 1:
																	gTranslator.translate(event, 'en');
															break;
															case 2:
																	gTranslator.translate(event, 'zh-CN');
															break;
													}
											},
											onDOMMouseScroll: function() {
													if (event.detail > 0) {
															gTranslator.translate(event);
													} else {
															gBrowser.selectedTab = gBrowser.addTab("https://translate.google.com/#auto/zh-TW/" + encodeURIComponent(getBrowserSelection()));
													}
													return;
											}
									}));
									function $(id) document.getElementById(id);
									function $C(name, attr) {
											var el = document.createElement(name);
											if (attr) Object.keys(attr).forEach(function(n) {
													if (typeof attr[n] == 'function') {el.setAttribute(n, attr[n].toSource() + '.call(this, event);');}
													else {el.setAttribute(n, attr[n])}
											});
											return el;
									}

									var Translated = this.getSelectedText() || readFromClipboard();
									var cel = lang || "zh-TW";
									var httpRequest = null;
									var fullUrl = "https://translate.google.com/translate_t?text=" + Translated + "&hl=" + cel + "&langpair=auto|" + cel + "&tbb=1";

									function removeHTMLTags(mitkell) {
											var strTagStrippedText = mitkell.replace(/<span title=[^>]+?\">/ig, "")
																											.replace(/<\/span>/ig, "")
																											.replace(/<br>/ig, '\n')
																											.replace(/<\/?[^>]+(>|$)/g, "");
											return strTagStrippedText;
									}
									function infoReceived() {
											var output = httpRequest.responseText;
											if (Translated[0] == " ") {
													var start = " ";
											} else {
													var start = "";
											}
											if (Translated[Translated.length - 1] == " ") {
													var end = " ";
											} else {
													var end = "";
											}
											if (output.length) {
													output = output.replace(/&quot;/gi,'"');
													output = output.replace(/&lt;/gi,'<');
													output = output.replace(/&gt;/gi,'>');
													output = output.replace(/&amp;/gi,'&');
													output = output.replace(/&#39;/gi,"'");
													var fieldArray = output.split('</head>');
													if (fieldArray[1].search('class="short_text"') != -1) {
															var tempElem = fieldArray[1].split('<span id=result_box class="short_text">');
													} else if (fieldArray[1].search('class="medium_text"') != -1) {
															var tempElem = fieldArray[1].split('<span id=result_box class="medium_text">');
													} else {
															var tempElem = fieldArray[1].split('<span id=result_box class="long_text">');
													}
													var outputi = tempElem[1].split('</span></div>');
													var label = $("gTranslator-label");
													while (label.firstChild) {
															label.removeChild(label.firstChild);
													}
													label.appendChild(document.createTextNode(start + removeHTMLTags(outputi[0]) + end));
													$("gTranslator-popup").openPopup($("content"), null, event.screenX - 5, event.screenY - 80);
											}
									}
									httpRequest = new XMLHttpRequest();
									httpRequest.open("GET", fullUrl, true);
									httpRequest.onload = infoReceived;
									httpRequest.send(null);
							},
					};
					gTranslator.translate(event);
		}
	}, {
		label: "按URL開啟文本",
		Type: "Text",
		command: function(event) {
			gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode"));
		}
	}, {
		label: "開啟查找欄搜索文本",
		Type: "Text",
		command: function(event) {
			gFindBar._findField.value = event.dataTransfer.getData("text/unicode");
			gFindBar.open();
			gFindBar.toggleHighlight(1);
		}
	}, {
		label: "不開啟查找欄搜索文本",
		Type: "Text",
		command: function(event) {
			gFindBar._findField.value = event.dataTransfer.getData("text/unicode");
			gFindBar.toggleHighlight(1);
		}
	}, {
		label: "下載文字",
		Type: "Text",
		command: function(event) {
			saveImageURL('data:text/plain;charset=UTF-8;base64,' + btoa(unescape(encodeURIComponent(event.dataTransfer.getData("text/unicode")))), event.dataTransfer.getData("text/unicode").slice(0, 5) + ".txt", null, null, null, null, document);
		}
	}, {
		label: "下載文字(不彈窗)",
		Type: "Text",
		command: function(event) {
			saveImageURL('data:text/plain;charset=UTF-8;base64,' + btoa(unescape(encodeURIComponent(event.dataTransfer.getData("text/unicode")))), event.dataTransfer.getData("text/unicode").slice(0, 5) + ".txt", null, null, true, null, document);
		}
	}, {
		label: "FGgTranslator翻譯", //命令的說明文字
		Type: "Text",
		command: function(event) { //自定義命令，event為回傳事件
			var doc = event.target.ownerDocument;
			var win = doc.defaultView;
			(function (window, document,event){
				if(!window.FGgTranslator){
					window.FGgTranslator = {
						offset: {
							x: 50,   //翻譯框出現的位置相對於鼠標手勢結束時的橫坐標位移
							y: 10,   //縱坐標位移, 值越大越往 上/左
						},
						google: 'https://translate.google.com.tw/',
						//link: 'http://173.194.127.152/', //直接使用服務器IP，
														 //可以換一個比較通暢的google翻譯服務器地址或IP,
														 //注意地址或IP最後還有還有"/"。
						service: 'baidu',
						bingAppId: '',
						selectText: null,
						boxElements:null,
						player: null,
						to: 'zh',
						from: 'auto',
						checkLanguge: 'auto',
						camelCase: false,
						preSelection: [],
						originDocument: null,
						_languages:{
							'google-bing':{
								en: '英語 English',
								ja: '日語 Japanese',
								fr: '法語 French',
								ru: '俄語 Russian',
								de: '德語 German',
								ko: '韓語 Korean',
								ar: '阿拉伯語 Arabic',
								et: '愛沙尼亞語 Estonian',
								bg: '保加利亞語 Bulgarian',
								pl: '波蘭語 Polish',
								fa: '波斯語 Persian',
								da: '丹麥語 Danish',
								fi: '芬蘭語 Finnish',
								ht: '海地克裡奧爾語 Haitian Creole',
								nl: '荷蘭語 Dutch',
								ca: '加泰羅尼亞語 Catalan',
								cs: '捷克語 Czech',
								lv: '拉脫維亞語 Latvian',
								lt: '立陶宛語 Lithuanian',
								ro: '羅馬尼亞語 Romanian',
								mt: '馬耳他語 Maltese',
								ms: '馬來語 Malay',
								no: '挪威語 Norwegian',
								pt: '葡萄牙語 Portuguese',
								sv: '瑞典語 Swedish',
								sk: '斯洛伐克語 Slovak',
								sl: '斯洛文尼亞語 Slovenian',
								th: '泰語 Thai',
								tr: '土耳其語 Turkish',
								cy: '威爾士語 Welsh',
								ur: '烏爾都語 Urdu',
								uk: '烏克蘭語 Ukrainian',
								el: '希臘語 Greek',
								es: '西班牙語 Spanish',
								hu: '匈牙利語 Hungarian',
								it: '意大利語 Italian',
								hi: '印地語 Hindi',
								id: '印尼語 Indonesian',
								vi: '越南語 Vietnamese',
							},
							google: {
								'zh-TW': '中文(繁體)',
								'zh-CN': '中文(簡體)',
								sq: '阿爾巴尼亞語 Albanian',
								az: '阿塞拜疆語 Azerbaijani',
								ga: '愛爾蘭語 Irish',
								eu: '巴斯克語 Basque',
								be: '白俄羅斯語 Belarusian',
								is: '冰島語 Icelandic',
								bs: '波斯尼亞語 Bosnian',
								af: '布爾語(南非荷蘭語) Afrikaans',
								tl: '菲律賓語 Filipino',
								km: '高棉語 Khmer',
								ka: '格魯吉亞語 Georgian',
								gu: '古吉拉特語 Gujarati',
								ha: '豪薩語 Hausa',
								gl: '加利西亞語 Galician',
								kn: '卡納達語 Kannada',
								hr: '克羅地亞語 Croatian',
								la: '拉丁語 Latin',
								lo: '老撾語 Lao',
								mr: '馬拉地語 Marathi',
								mk: '馬其頓語 Macedonian',
								mi: '毛利語 Maori',
								mn: '蒙古語 Mongolian',
								bn: '孟加拉語 Bengali',
								hmn: '苗語 Hmong',
								zu: '南非祖魯語 Zulu',
								ne: '尼泊爾語 Nepali',
								pa: '旁遮普語 Punjabi',
								sr: '塞爾維亞語 Serbian',
								eo: '世界語 Esperanto',
								sw: '斯瓦希里語 Swahili',
								ceb: '宿務語 Cebuano',
								so: '索馬裡語 Somali',
								te: '泰盧固語 Telugu',
								ta: '泰米爾語 Tamil',
								iw: '希伯來語 Hebrew',
								hy: '亞美尼亞語 Armenian',
								ig: '伊博語 Igbo',
								yi: '意第緒語 Yiddish',
								jw: '印尼爪哇語 Javanese',
								yo: '約魯巴語 Yoruba'
							},
							bing: {
								'zh-CHT': '中文(繁體)',
								'zh-CHS': '中文(簡體)',
								mww: '白苗文 Hmong Daw',
								tlh: '克林貢語 Klingon',
								he: '希伯來語 Hebrew'
							},
							baidu:{
								cht: '中文(繁體)',
								zh: '中文(簡體)',
								en: '英語',
								yue: '粵語',
								wyw: '文言文',
								jp: '日語',
								de: '德語',
								ru: '俄語',
								fra: '法語',
								kor: '韓語',
								est: '愛沙尼亞語',
								ara: '阿拉伯語',
								bul: '保加利亞語',
								pl: '波蘭語',
								dan: '丹麥語',
								fin: '芬蘭語',
								nl: '荷蘭語',
								cs: '捷克語',
								rom: '羅馬尼亞語',
								pt: '葡萄牙語',
								swe: '瑞典語',
								slo: '斯洛文尼亞語',
								th: '泰語',
								spa: '西班牙語',
								el: '希臘語',
								it: '意大利語',
								hu: '匈牙利語'
							},
							langMap: [
								['zh-CN', 'zh-CHS', 'zh'],
								['zh-TW', 'zh-CHT', 'cht'],
								['ar', 'ar', 'ara'],
								['fr', 'fr', 'fra'],
								['ko', 'ko', 'kor'],
								['ja', 'ja', 'jp'],
								['es', 'es', 'spa'],
								['et', 'et', 'est'],
								['bg', 'bg', 'bul'],
								['da', 'da', 'dan'],
								['fi', 'fi', 'fin'],
								['ro', 'ro', 'rom'],
								['sv', 'sv', 'swe'],
								['sl', 'sl', 'slo']
							],
							baiduLM: {
								zh: '',
								cht: '',
								en: ['yue', 'wyw'],
								jp: ['yue', 'wyw'],
								yue: 'zh,cht',
								th: ['yue', 'wyw'],
								ara: ['yue', 'wyw'],
								est: ['yue', 'wyw'],
								bul: ['yue', 'wyw'],
								pl: ['yue', 'wyw'],
								fra: ['yue', 'wyw'],
								fin: ['yue', 'wyw'],
								spa: ['yue', 'wyw'],
								dan: ['yue', 'wyw'],
								wyw: 'zh,cht',
								kor: ['yue', 'wyw'],
								ru: ['yue', 'wyw'],
								pt: ['yue', 'wyw'],
								de: ['yue', 'wyw'],
								it: ['yue', 'wyw'],
								cs: ['yue', 'wyw'],
								rom: ['yue', 'wyw'],
								swe: ['yue', 'wyw'],
								slo: ['yue', 'wyw'],
								hu: ['yue', 'wyw'],
								el: ['yue', 'wyw'],
								nl: ['yue', 'wyw']
							}
						},

						get languages(){
							var _l = this._languages,
								s = _l[this.service];
								l = {},
								gb = 'google-bing';
							if(!!~gb.indexOf(this.service))
								for(var i in _l[gb]) l[i] = _l[gb][i];
							for(var i in s) l[i] = s[i];
							return l;
						},

						init: function(event){
							if(!document.body) return;
							this.selectText = this.getSelection(event);
							if(this.selectText.replace(/\s+/g,'') === ''){
								if(readFromClipboard && readFromClipboard().replace(/\s+/g,'') !== ''){
									this.selectText = readFromClipboard().replace(/\n+/g,'\n');
								}else{
									return;
								}
							}

							if(!this.boxElements){
								this.getTranslateBox();
								this.boxElements.box.drag = {
									status: false,
									X     : 0,
									Y     : 0
								};

								this.boxElements.style = 
										this.setStyle(this.boxElements.box);

								//nightly 41 050622 (http://whereswalden.com/2015/06/20/)
								//https://bugzilla.mozilla.org/show_bug.cgi?id=1146136
								({
									from      : this.from,
									to        : this.to,
									camelCase : this.camelCase,
									service   : this.service,
									bingAppId : this.bingAppId
								} = this.getPref());

								document.addEventListener('mousedown',this, false);
								document.addEventListener('mouseup',this, false);
								document.addEventListener('mousemove',this, false);
								document.addEventListener('keypass',this, false);
								window.addEventListener('unload',this, false);
								this.boxElements.detail.addEventListener('DOMMouseScroll', this, false);
								(this.originDocument = event.view.document).addEventListener('mousedown',this, false);
							}

							var pageXY = (function(e){
								var target = e.view,
									top = 0,
									left = 0,
									rect = null;
								while(target != null && target != window.top){
									rect = target.frameElement.getBoundingClientRect();
									top += rect.top || 0;
									left += rect.left || 0;
									target = target.parent;
								}
								return {
									x: left + e.clientX,
									y: top + e.clientY
								};
							})(event);

							this.boxElements.box.style.top = pageXY.y + window.pageYOffset - this.offset.y +'px';
							this.boxElements.box.style.left = pageXY.x + window.pageXOffset - this.offset.x +'px';

							this.setTranslateText();
						},

						googleService: function(res){
							var {strFilter: sF, title: ftt, resultText: resultText} = this.filter,
								ftt = ftt.bind(this.filter),
								resultBox = this.boxElements.resultBox;


							var text = JSON.parse(res.responseText.replace(/\[,+|,{2,}(?!\])|,+\]/g, function(str){
									return Array.prototype.join.call(str, 'null');
								})),
								rt = '',//譯文
								rp = '',//注音
								languages = this.languages;

							if(!res.responseText || !text[0]){
								return this.statusAlert('未知錯誤');
							}

							//原文所屬語言
							this.checkLanguge = text[2];

							var t = text[0];
							for(var i=0;i<t.length;i++){
								//譯文
								if(!t[i][0] && !t[i][1]) continue;
								rt += ftt(t[i][0], t[i][1], 
									(languages[text[2]] + 
										' -&gt; ' + languages[this.to]));
								rp += t[i][1];
							}
							//注音
							rp = t[t.length - 1][3] ? ftt(t[t.length - 1][3], rp) : '';

							//顯示翻譯文本
							this.boxElements.resultText = resultText(rt);

							//顯示注音
							this.boxElements.phonetic = rp;

							/*//////////////////////////////////*/
							/*
							<span class="_FgGTr-D-t1-Ci">[詞性]</span>
							<ul class="_FgGTr-D-t1-Ul">
								<li class="_FgGTr-D-t1-li">
									<span>未翻譯文本</span>
									<span>
										<ul>
											<li>譯文1</li>
										</ul>
									</span>
								</li>
							</ul>*/

							if(text[1]){
								var t1 = text[1],
									sp = li = '';
								for(var m=0;m<t1.length;m++){
									li = '<span class="_FgGTr-D-t1-Ci">['+ sF(t1[m][0]) 
										+ '].</span><ul class="_FgGTr-D-t1-Ul">';
									for(var n=0;n<t1[m][2].length;n++){
										li += '<li class="_FgGTr-D-t1-li"><span>'
											+ sF(t1[m][2][n][0]) +'</span><span><ul>'
										for(var l=0;l<t1[m][2][n][1].length;l++){
											li += '<li>'+ sF(t1[m][2][n][1][l]) +'</li>';
										}
										li += '</ul></span></li>';
									}
									sp += li + '</ul>';
								}
								if(!!sp){
									var span = document.createElement('span');
									span.innerHTML = sp;
									this.boxElements.detail.appendChild(span);
								}
							/*//////////////////////////////////*/
							/*
							<span class="_FgGTr-D-t5-Ul"><ul>
								<li class="_FgGTr-D-t5-li1">
									<span>未翻譯文本</span>
								</li>
							</ul>
							<ul>
								<li class="_FgGTr-D-t5-li2">
									<span>
										<span>譯文0</span>
										<ul>
											<li>譯文1</li>
										</ul>
									</span>
								</li>
							</ul></span>*/
							}else if(text[5]){
								var t5 = text[5],
									li1 = li2 = '',
									filter = {};
								for(var j=0;j<t5.length;j++){
									if(!(t5[j][0] in filter) && t5[j][2] && 
										(t5[j][2].length!=1 || (t5[j][0] != t5[j][2][0][0])) &&
										!sF(t5[j][0], t5[j][2][0][0])
									){
										li1 += '<li class="_FgGTr-D-t5-li1"><span>'+sF(t5[j][0])+'</span></li>';
										li2 += '<li class="_FgGTr-D-t5-li2"><span><span>'
											+sF(t5[j][2][0][0])+'</span><ul>';
										for(var k=0;k<t5[j][2].length;k++){
											li2 += '<li>'+sF(t5[j][2][k][0])+'</li>';
										}
										li2 += '</ul></span></li>';
										filter[t5[j][0]] = true;
									}
								}

								if(!!li1 && !!li2){
									var span = document.createElement('span');
									span.innerHTML = '<ul>'+li1+'</ul><ul>'+li2+'</ul>';
									this.boxElements.detail.appendChild(span);
									this.boxElements.detail.moreUl = span.lastChild;
								}
							}

							//設置滾動條
							this.setClassName(this.boxElements.detail, '_FgGTrDetailOverflow', false);
							if(text[1] || text[5]){
								this.setScrollbar();
							}
						},

						getGoogleTK: function(str){
							function b(a, b) {
								for (var d = 0; d < b.length - 2; d += 3) {
									var c = b.charAt(d + 2),
										c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
										c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
									a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
								}
								return a
							}

							function tk(a) {
								for (var e = ['406398','2087938574'], h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
									var c = a.charCodeAt(f);
									128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
								}
								a = h;
								for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
								a = b(a, "+-3^+b+-f");
								a ^= Number(e[1]) || 0;
								0 > a && (a = (a & 2147483647) + 2147483648);
								a %= 1E6;
								return a.toString() + "." + (a ^ h)
							}
							return tk(str);
						},

						bingService: function(res, details){
							this.statusAlert('');
							var {strFilter: sF, title: ftt, resultText: resultText} = this.filter,
								ftt = ftt.bind(this.filter),
								resultBox = this.boxElements.resultBox,
								sentRequest = this.sentRequest.bind(this),
								detailBox = this.boxElements.detail;
							var bingTrantor = function(res){
									var text = res.responseText;
									if(!text){
										this.loadingAnimation();
										return this.statusAlert('未知錯誤');
									}
									try{
										text = JSON.parse(text);
									}catch(ex){
										this.loadingAnimation();
										return this.statusAlert('服務器響應格式錯誤');
									}

									//原文所屬語言
									this.checkLanguge = text.from;

									var cText = this.camelCaseText.trim(),
										oText = cText.split('\n'), //原文
										rt = '', //譯文
										languages = this.languages;

									for(var i=0;i<text.items.length;i++){
										//譯文
										rt += ftt(text.items[i].text, oText[i], 
											(languages[text.from] + 
												' -&gt; ' + languages[this.to]))
													.replace(/\<\/span\>/, '<br />$&');
									}

									//顯示翻譯文本
									this.boxElements.resultText = resultText(rt);

									//詳細
									text.items.length == 1 && (text.items[0].wordAlignment || ' ').split(' ').length == 1 && sentRequest({
										method: 'GET',
										url: 'https://www.bing.com/translator/api/Dictionary/Lookup?from='
											+ this.checkLanguge +'&to='+ this.to +'&text='+ encodeURIComponent(cText),
										rqType: 'bingDictCallback',
										headers:{
											Cookie: this.bingAppId
										}
									}, function(res){
										var text = res.responseText;
										try{
											text = JSON.parse(text);
										}catch(ex){}
										if(!text) return;
										var sp = li = '';
										for(var pt of text.items){
											li = '<span class="_FgGTr-D-t1-Ci">['+ pt[0].posTag
												+ '].</span><ul class="_FgGTr-D-t1-Ul">';
											for(var item of pt){
												li += '<li class="_FgGTr-D-t1-li"><span>'
													+ sF(item.displayTarget) +'</span><span><ul>';
												for(var bt of item.backTranslations){
													li += '<li>'+ sF(bt.displayText) +'</li>';
												}
												li += '</ul></span></li>';
											}
											sp += li + '</ul>';
										}
										if(!!sp){
											var span = document.createElement('span');
											span.innerHTML = sp;
											this.boxElements.detail.appendChild(span);
										}
										//設置滾動條
										this.setClassName(detailBox, '_FgGTrDetailOverflow', false);
										this.setScrollbar();
									}.bind(this));
							}.bind(this);

							if(typeof details.retry == 'number'){//先獲取請求翻譯頁面獲取令牌cookies作為appid
								if(details.retry > 3) return this.statusAlert(this.service + ' 服務發生未知錯誤');
								sentRequest({
									url: 'https://www.bing.com/translator/?to='+ this.to +'&text=' +  this.camelCaseText,
									retry: details.retry
								}, function(res){
									var ck = res.getResponseHeader('Set-Cookie').split('\n');
									this.setPref.call(this, {bingAppId: (this.bingAppId = ['mtstkn', 'MUID'].map(function(i){
										for(var c of ck){
											var m = c.match(new RegExp(i+'=[^;]+'));
											if(m) return m[0];
										}
										return '';
									}).join('; '))}); //保存bingAppId
									(details.headers || (details.headers = {}))['Cookie'] = this.bingAppId;
									sentRequest(details, bingTrantor);
								}.bind(this));
							}else{
								bingTrantor(res);
							}
						},

						baiduService: function(res, details){
							var {title: ftt, resultText: resultText, strFilter: sF} = this.filter,
								ftt = ftt.bind(this.filter),
								resultBox = this.boxElements.resultBox,
								detailBox = this.boxElements.detail,
								sentRequest = this.sentRequest.bind(this),
								setScrollbar = this.setScrollbar.bind(this),
								text = res.responseText,
								err = function(msg){
									this.loadingAnimation();
									return this.statusAlert(msg || '未知錯誤');
								}.bind(this);

							if(text == '') return err();
							try{
								text = JSON.parse(text);
								if(text.error != 0 && text.msg != 'success') return err(text.msg)
							}catch(ex){
								return err('服務器響應格式錯誤');
							}
							//原文所屬語言
							this.checkLanguge = text.lan || 'auto';

							//當自動檢測到為zh/en, 且翻譯目標語言為zh/en時，默認翻譯為 en/zh
							if(this.from == 'auto' 
								&& this.checkLanguge == this.to 
								&& ['zh', 'en', 'cht'].indexOf(this.to)>-1
							){
								this.to = ( ['zh', 'cht'].indexOf(this.to)>-1 ? 'en' : this.to);
								this.setResultLink();
								this.updateLanguages();
							}

							details.postData = 'from='+ (this.from == 'auto' ? this.checkLanguge : this.from)
										+ '&to=' + this.to + '&query=' + details.tText + '&transtype=hash&simple_means_flag=3'; //'&transtype=realtime';
							details.url = 'http://fanyi.baidu.com/v2transapi';
							//上次請求清除，重新添加
							this.loadingAnimation();
							sentRequest.call(this, details, function(res){
								clearInterval(resultBox.loading);
								var text = res.responseText,
									tRD = null,
									tDM = null,
									languages = this.languages,
									rt = '';//譯文
								if(text == '') return err();
								try{
									text = JSON.parse(text);
								}catch(ex){
									return err('服務器響應格式錯誤');
								}

								var tt_r = text.trans_result,
									td_r = text.dict_result;

								if(tt_r){
									//重新設置原文所屬語言
									this.checkLanguge = tt_r.from;

									//翻譯結果
									tRD = tt_r.data;

									var ara_ru = !!~['ara', 'ru'].indexOf(this.checkLanguge);

									for(var p of tRD){
										if(!!p.result && p.dst){
											for(var ci of p.result){
												var range = ci[4][0].split('|').map(function(r){return parseInt(r, 10)});
													spr = ci[3], _spr = ci[1]; //添加 空格、換行
												spr.forEach(function(s){
													s = s.split('|');
													if(s.length){
														_spr = _spr.split('');
														_spr.splice(s[0] == '0' ? 0 : _spr.length, 0, s[1]); //0為句前，1為末尾
														_spr = _spr.join('');
													}
												});
												rt += ftt(_spr,
													this.filter.cut(p.src, range[0], range[0] + range[1], ara_ru),
													(languages[this.checkLanguge] + ' -&gt; ' + languages[this.to]));
											}
										}else{
											rt += ftt(p.dst, p.src, (languages[this.checkLanguge] + ' -&gt; ' + languages[this.to]));
										}
										if(p != tRD[tRD.length-1])
											rt = rt.replace(/(\<span title\="[^"]+?" class\=")([^"]+?)("\>[^\<]+)\<\/span\>$/,
														'$1$2 _FgGTrR-T-Span-P$3</span><br />');
									}
								}else{
									this.checkLanguge = null;
								}
								this.boxElements.resultText = 
									resultText(rt == '' ? this.camelCaseText : rt);

								var dictResult = null;
								//簡單翻譯
								if(td_r){
									var tSM = td_r.simple_means;
									if(tSM){
										var smUL = '',
											tSM_symbols = tSM.symbols,
											tSM_word_name = [];
										if(td_r.err_words){ //大小寫區別單詞
											tSM_word_name.push(tSM.word_name);
											for(var tEW of td_r.err_words){
												if(Array.isArray(tEW.symbols)){
													tSM_symbols = tSM_symbols.concat(tEW.symbols);
												}
												tSM_word_name.push(tEW.word_name);
											}
										}
										for(var p of tSM_symbols){
											var ph = [];
											if(tSM_word_name.length){
												smUL += '<b class="_FgGTr-bd-sm-WordName">' + tSM_word_name[tSM_symbols.indexOf(p)];
											}
											if(!p.word_symbol){
												p.ph_en && ph.push('[英]:['+ p.ph_en + ']');
												p.ph_am && ph.push('[美]:['+ p.ph_am + ']');
												(p.ph_en == p.ph_am) && ph.pop();
												if (ph.join(', ') != '') smUL += '<div class="_FgGTr-bd-sm-Phonetic">'+ ph.join(', ') +'</div>';
											}else{
												smUL += '<div class="_FgGTr-bd-sm-Phonetic">'+ p.word_symbol +'</div>';
											}
											if(tSM_word_name.length){
												smUL += '</b>';
											}
											for(var parts of p.parts){
												//parts.part      en->zh
												//parts.means.word_mean zh->en
												//詞性 zh->en parts.part_name
												parts.part_name && (smUL += '<div class="_FgGTr-bd-sm-partsName"><b>['+ parts.part_name +']</b>');
												if(parts.part){
													smUL += '<div class="_FgGTr-bd-sm-parts"><b>'+ parts.part +'</b><ul>';
													for(var means of parts.means)
														smUL += '<li>' + means + '</li>';
													smUL += '</ul></div>';
												}else if(parts.means){
													smUL += '<ul class="_FgGTr-bd-sm-parts _FgGTr-bd-sm-parts-sg">';
													for(var means of parts.means){
														if(Array.isArray(parts.means)){
															if(typeof means == 'string'){
																smUL += '<li>' + means + '</li>';
															}else if(typeof means == 'object' && means.word_mean){
																smUL += '<li>' + means.word_mean + '</li>';
															}
														}else if(means.word_mean){
															smUL += '<li>' + means.word_mean + '</li>';
														}
													}
													smUL += '</ul>';
												}
												parts.part_name && (smUL += '</div>');
											}
										}
										//單詞其他形式
										if(tSM.exchange){
											var exc = {
												'word_done': '過去分詞',
												'word_past': '過去式',
												'word_ing': '現在進行時',
												'word_pl': '複數',
												'word_est': '最高級',
												'word_er': '比較級',
												'word_third': '第三人稱單數'
											}, _exc = '';
											for(var wx in exc){
												if((wx in tSM.exchange) && tSM.exchange[wx]){
													_exc += '<li><i>' + exc[wx] + ':</i><span>';
													for(var wxc of tSM.exchange[wx]){
														_exc += '<a target="_blank" href="http://fanyi.baidu.com/#' 
																	+ (this.checkLanguge || this.from) +'/'+ this.to +'/'
																	+ wxc +'">' + wxc + '</a>';
													}
													_exc += '</span></li>';
												}
											}
											if(_exc !='') smUL += '<ul class="_FgGTr-bd-sm-exchange">' + _exc + '</ul>';
										}
										if(smUL != ''){
											dictResult = document.createElement('div');
											dictResult.id = '_FgGTr-bd-dict-result';
											dictResult.innerHTML = smUL;
											detailBox.appendChild(dictResult);
										}
									}

									//其他語言 jp <-> en
									var tCt = td_r.content,
										tVe = td_r.voice;
									if(tCt){
										var tcUL = '';
										for(var i of tCt){
											tcUL += '<ul>'
											for(var m of i.mean){
												tcUL += '<li class="_FgGTr-bd-sm-parts">'+ (m.pre ? '<b>'+ m.pre +'</b>' : '') + '<ul>';
												for(var c in m.cont){
													tcUL += '<li>' + c + '</li>';
												}
												tcUL += '</ul></li>';
											}
											tcUL += '</ul>'
										}
										if(tcUL != ''){
											dictResult = document.createElement('div');
											dictResult.id = '_FgGTr-bd-dict-result';
											dictResult.innerHTML = tcUL;
											detailBox.appendChild(dictResult);
										}
									}
									if(tVe){
										var _ph = {}, ph = '';
										for(var i of tVe) for(var p in i) _ph[p] = i[p];
										if(_ph.en_phonic && _ph.us_phonic){//en -> jp 讀音
											ph = (_ph.en_phonic == _ph.us_phonic)
												? '[EN]:' + _ph.en_phonic
												: '[EN]:' + _ph.en_phonic + '' + ', [US]:' + _ph.us_phonic;

										}else if(_ph.phonic){//jp -> en 讀音
											ph = _ph.phonic;
										}
										(ph != '') && (this.boxElements.phonetic = '<span class="_FgGTrR-T-Span">' + ph + '<span>');
									}
								}

								//其他詳細翻譯
								var tab = '', synthesize = '', net = '', cizu = '',
									tongfanyici = '', baike = '', tContent = '',
									zhxiyi = '', enxiyi = '';
								var setTab = function(tName){
									for(var i in tName){
										if(tName[i] != ''){
											tab += '<li>' + i + '</li>';
											tContent += '<li>' + tName[i] + '</li>';
										}
									}
									if(tContent && tab){
										tContent = '<div><ul class="_FgGTr-bd-tContent">' + tContent + '</ul></div>';
										detailBox.innerHTML += ('<ul class="_FgGTr-bd-drTab">'+ tab + '</ul>' + tContent);
									}

									var tabs = detailBox.querySelectorAll('._FgGTr-bd-drTab>li'),
										contents = detailBox.querySelectorAll('._FgGTr-bd-tContent>li');
									for(var i=0, len = tabs.length; i<len; i++){
										if(i == 0) {
											tabs[0].classList.add('_FgGTr-bd-drTab-current');
											contents[0].classList.add('_FgGTr-bd-tContent-current');
											tabs[0].parentNode.style
												.setProperty('min-width', (tabs[0].offsetWidth + 4) * len + 'px', 'important');
											//設置當前標籤後才設置滾動條
											setScrollbar(contents[0].parentNode.parentNode);
										}
										tabs[i].onclick = (function(t){
											return function(){
												if(tabs[t].classList.contains('_FgGTr-bd-drTab-current')) return;

												//記錄上一個的滾動位置
												var perv = detailBox.querySelector('._FgGTr-bd-tContent-current');
												if(perv){
													if(!perv.WHTB)
														perv.WHTB = {};
													perv.WHTB.T = perv.parentNode.offsetTop;
												}
												for(var i=0; i<len; i++){
													tabs[i].classList[i == t ? 'add' : 'remove']('_FgGTr-bd-drTab-current');
													contents[i].classList[i == t ? 'add' : 'remove']('_FgGTr-bd-tContent-current');
												}
												setScrollbar(contents[t].parentNode.parentNode);
											}
										})(i);
									}
								};

								//4個基礎標籤 & 後來新增的2個擴展標籤
								if(td_r && ((typeof td_r == 'object') && !Array.isArray(td_r) || dictResult)){
									if(td_r.synthesize_means && td_r.synthesize_means.symbols 
											&& td_r.synthesize_means.symbols.length){ //漢英辭典
										for(var i of td_r.synthesize_means.symbols){
											synthesize += '<li>';
											if(i.xg != ''){
												synthesize += '<b>' + td_r.synthesize_means.word_name 
													+ ' <span>[' + i.word_symbol + ']</span></b>';
											}
											for(var cys of (i.cys.length && i.cys || i.parts.length && i.parts)){
												if(cys.part_name){
													synthesize += '<h5>[' + cys.part_name + ']</h5>';
												}
												if(cys.means && cys.means.length){
													synthesize += '<ul class="_FgGTr-bd-synthesizeCys">';
													for(means of cys.means){
														synthesize += '<li><h6>' + means.word_mean+ '</h6>';
														if(means.ljs && means.ljs.length){
															synthesize += '<ul class="_FgGTr-bd-synthesizeLjs">';
															for(var ljs of means.ljs)
																synthesize += '<li><ul><li>'+ ljs.ly + '</li><li>' + ljs.ls + '</li></ul></li>';
															synthesize += '</ul>';
														}
														synthesize += '</li>';
													}
													synthesize += '</ul>';
												}
											}
											synthesize += '</li>';
										}
										if(synthesize != '') synthesize = '<ul class="_FgGTr-bd-synthesize">' + synthesize + '</ul>';
									}
									if(td_r.net_means){ //網絡析義
										for(var i of td_r.net_means)
											net += '<li><span>' + i.means + '</span></li>';
										if(net != '') net = '<ul class="_FgGTr-bd-net-means">' + net + '</ul>';
									}

									var _cizu = (td_r.cizu && td_r.cizu.length && td_r.cizu) || (td_r.cizuxiyu 
											&& td_r.cizuxiyu.cizu && td_r.cizuxiyu.cizu.length && td_r.cizuxiyu.cizu);
									if(_cizu){ //短語詞組
										for(var i of _cizu){
											cizu += '<li><span>'+ (i.cz_name || i.cizu_name) +'</span>';
											if(i.jx && i.jx.length){
												cizu += '<ul class="_FgGTr-bd-czjx">';
												for(var jx of i.jx){
													cizu += '<li><span>' + (jx.jx_en || jx.jx_cn_mean) + '</span>';
													if(jx.lj && jx.lj.length){
														cizu += '<ul class="_FgGTr-bd-czlj">';
														for(var lj of jx.lj){
															cizu += '<li>'+ lj.lj_ly +'</li><li>' + lj.lj_ls + '</li>';
														}
														cizu += '</ul>';
													}
													cizu += '</li>'
												}
												cizu += '</ul>';
											}
											cizu += '</li>';
										}
										if(cizu != '') cizu = '<ul class="_FgGTr-bd-cizu">' + cizu + '</ul>';
									}

									if((td_r.tongyici && td_r.tongyici.length) //同反義詞
										|| (td_r.fanyici && td_r.fanyici.length)){
										tongfanyici = (function(tfyc){
											var ul = [];
											for(var tf in tfyc){
												if(tfyc[tf]){
													var str = '';
													for(var i of tfyc[tf]){
														if(i.means){//en->zh
															str += '<li><b>'+ i.part_name +'</b><span><ul class="_FgGTr-bd-part-name">';
															for(var m of i.means){
																str += '<li><h6>' + m.word_mean + '</h6><ul class="_FgGTr-bd-word-mean">';
																for(var cis of m.cis){
																	str += '<li><a target="_blank" href="http://fanyi.baidu.com/#' 
																		+ (this.checkLanguge || this.from) +'/'+ this.to +'/'
																		+ cis.ci_name +'">' + cis.ci_name + '</a></li>';
																}
																str += '</ul></span></li>';
															}
															str += '</ul></span></li>';
														}else if(i.ci_name){//zh->en
															str += '<li><h6>' + i.ci_name + '</h6></li>';
														}
													}
													if(str != '') ul.push('<h5 class="_FgGTr-bd-tongfanyiciTitle">'+ ('同反'.charAt(tf)) 
														+'義詞</h5><ul class="_FgGTr-bd-tongfanyici">' + str + '</ul>');
												}
											}
											return ul.join('');
										}).call(this, [td_r.tongyici, td_r.fanyici]);
									}

									var _baike = td_r.baike_means && td_r.baike_means.content && td_r.baike_means;
									if(_baike){//百科析義
										baike = '<div class="_FgGTr-bd-baike"><span>'+ _baike.content.replace(/\&amp;/g, '&') 
											+'</span><a title="前往百科頁面" href="'+ _baike.link +'" target="_blank"></a></div>';
									}

									if(td_r.zdict){// 中中析義
										zhxiyi = (function(zdict){
											var arr = [];
											for(var zd in zdict){
												var xiyi = '';
												if(!zdict[zd] || (
													(!zdict[zd].means || !zdict[zd].means.length) && !zdict[zd].chenyu)
												) continue;

												var cyu = zdict[zd].chenyu;
												if(cyu){//成語解釋
													var _cyu = {
														explain:  '解釋',
														from:     '出處',
														example:  '例句',
														grammer:  '語法',
														synonyms: '同義詞',
														antonym:  '反義詞'
													};
													xiyi += '<div class="_FgGTr-bd-zdictTitle">成語解釋</div><div class="_FgGTr-bd-zdictCyu">';
													if(cyu.pinyin) xiyi += '<b>' + td_r.zdict.word + ' <span>[' + cyu.pinyin + ']</span></b>';
													xiyi += '<ul>';
													for(var cy in _cyu){
														if(!cyu[cy]) continue;
														xiyi += '<li><b>' + _cyu[cy] + ':</b><span>' + cyu[cy] + '</span></li>';
													}
													xiyi += '</ul></div>';
													arr.push(xiyi);
													xiyi = '';
												}

												if(zdict[zd].means && zdict[zd].means.length){//字詞、引證解釋
													xiyi += '<div class="_FgGTr-bd-zdictTitle">'+ ['字詞', '引證'][zd] + '解釋</div>' 
														+ '<ul class="_FgGTr-bd-zdictMs">';
													for(var means of zdict[zd].means){
														xiyi += '<li>';
														if(means.pinyin)
															xiyi += '<b>' + td_r.zdict.word + ' <span>[' + means.pinyin + ']</span></b>';
														for(var exp of means.exp){
															if(zd == 1 && exp.pos) xiyi += '<div class="_FgGTr-bd-zdictPos"><h5>' + exp.pos + '</h5>';
															for(var des of exp.des){
																//去掉原先的序號 (1) / 1.
																xiyi += '<h6>' + des.main.replace(/^(?:\(\d+\)(?!\.)|\d+\.)/,'') + '</h6>';
																if(des.sub && des.sub.length){
																	xiyi += '<ul class="_FgGTr-bd-zdictSub">';
																	for(var sub of des.sub)
																		if(sub) xiyi += '<li>' + sub + '</li>';
																	xiyi += '</ul>';
																}
															}
															if(zd == 1 && exp.pos) xiyi += '</div>';
														}
														xiyi += '</li>';
													}
													xiyi += '</ul>';
													arr.push(xiyi);
												}
											}
											arr = arr.join('</li><li>');
											return arr ? '<ul class="_FgGTr-bd-zdict"><li>' + arr + '</li></ul>': '';
										}).call(this, [td_r.zdict.simple, td_r.zdict.detail]);
									}

									if(td_r.edict && td_r.edict.item && td_r.edict.item.length){// 英英析義
										for(var item of td_r.edict.item){
											enxiyi += '<li><h5>' + item.pos + '</h5>';
											for(var tg of item.tr_group){
												enxiyi += '<h6 class="_FgGTr-bd-edictTg">' + tg.tr + '</h6>';
												if(tg.example && tg.example.length){
													//例句
													enxiyi += '<ul class="_FgGTr-bd-edictExample">';
													for(var example of tg.example){
														enxiyi += '<li>' + example + '</li>';
													}
													enxiyi += '</ul>';
												}
												if(tg.similar_word && tg.similar_word.length){
													//同義詞synonym
													enxiyi += '<h6>synonym:</h6><ul class="_FgGTr-bd-edictSynonym">';
													for(var synonym of tg.similar_word){
														enxiyi += '<li><a target="_blank" href="http://fanyi.baidu.com/#' 
																+ (this.checkLanguge || this.from) +'/'+ this.to +'/'
																+ synonym +'">' + synonym + '</a></li>';
													}
													enxiyi += '</ul>';
												}
											}
											enxiyi += '</li>';
										}
										if(enxiyi != '') enxiyi = '<ul class="_FgGTr-bd-edict">' + enxiyi + '</ul>';
									}
								}

								setTab({//標籤 & 標籤內容
									'中中析義': zhxiyi,
									'英英析義': enxiyi,
									'漢英辭典': synthesize,
									'短語詞組': cizu,
									'同反義詞': tongfanyici,
									'網絡析義': net,
									'百科析義': baike
								});

								if(!tt_r && !td_r && text.error == 999 && text.from != null){
									this.checkLanguge = text.from;
									if(text.query)
										this.boxElements.resultText = text.query;
								}
							}.bind(this));
						},

						setTranslateText: function(word){
							word = (word || this.camelCaseText).trim();

							var details = {},
								callback = null,
								sentRequest = this.sentRequest,
								detailBox = this.boxElements.detail;

							//清除翻譯文本
							this.boxElements.resultText = '';

							//清除狀態
							this.boxElements.alertBox = '';

							//清空原來的
							while(detailBox.children.length){
								detailBox.removeChild(detailBox.firstChild);
							}
							detailBox.style.minWidth = '';
							this.setClassName(detailBox, '_FgGTrDetailOverflow', false);

							//清除注音
							this.boxElements.phonetic = '';

							//設置鏈接
							this.setResultLink();

							if(this.service == 'google'){
								details.url = this.google + 'translate_a/single?client=t&hl=auto&dt=bd&dt=ex&dt=ld&dt=md&sl=' + this.from + '&tl=' + this.to
													+ '&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&source=btn&srcrom=1&ssel=0&tsel=0&tk='+ this.getGoogleTK(word) +'&q='
													+ encodeURIComponent(word) + '&getTime=';
								details.timeout = 10000;
							}else if(this.service == 'bing'){
								details.url = 'https://www.bing.com/translator/api/Translate/TranslateArray?from='+ (this.from == 'auto' ? '-' : this.from) +'&to=' + this.to;
								details.method = 'POST';
								details.headers = {
									'Content-Type': 'application/json; charset=utf-8',
									'Cookie': this.bingAppId,
									'X-Requested-With': 'XMLHttpRequest',
									'Referer': 'https://www.bing.com/translator/?to=' + this.to + '&text='+encodeURIComponent(word)
								};
								details.postData = JSON.stringify(word.split('\n').map(function(t){
									return {id: ''.substr.call(Math.random(), 9, 11), text: t}
								}));
							}else if(this.service == 'baidu'){
								details.method = 'POST';
								details.tText = encodeURIComponent(word);
								details.url = 'http://fanyi.baidu.com/langdetect';
								details.postData = 'query='+ encodeURIComponent(this.filter.cut(word, 0, 50)).replace(/%20/g, '+');
								details.headers = {
									'Content-Type': 'application\/x-www-form-urlencoded;',
									'X-Requested-With': 'XMLHttpRequest',
									'Accept':'*\/*'
								};
							}
							this.loadingAnimation();
							details.url && sentRequest.call(this, details, callback);
						},

						updateLanguages: function(both){
							var index = ['google', 'bing', 'baidu'].indexOf(this.service),
								languages = this.languages,
								updateList = {},
								lg = this._languages.langMap;

							for(var i of lg){
								for(var j of i){
									if(j == this.from)
										this.from = i[index];
									if(j == this.to)
										this.to = i[index];
								}
							}

							//如果不支持翻譯的語言則設置為自動
							(!languages[this.from]) && (this.from = 'auto');
							(!languages[this.to]) && (this.to = lg[0][index]);

							if(index == 2){//baidu
								//數組為以外的語言，字符串（,）分割為只能翻譯語言，空字符串為全能翻譯語言。
								var _lm = this._languages.baiduLM,
									baiduLM = {};
								for(var m in _lm){
									if(typeof _lm[m] == 'string' && _lm[m] != ''){
										_lm[m].split(',').forEach(function(o){
											(baiduLM[m] || (baiduLM[m] = [])).push(o);
										});
									}else{
										for(var o in _lm){
											(_lm[m] == '' ? true : !~_lm[o].indexOf(m)) && (o != m)
												&& ((baiduLM[m] || (baiduLM[m] = [])).push(o));
										}
									}
								}

								both && (updateList.from = languages);
								var blm = baiduLM[this.from];
								if(blm){
									updateList.to = {};
									for(var i of blm){
										updateList.to[i] = languages[i];
									}
									(!~blm.indexOf(this.to)) && (this.to = blm[0]);
								}else if(this.from == 'auto'){
									updateList.to = languages;
								}
							}else{
								both && (updateList.from = languages);
								updateList.to = languages;
							}

							this.updateSelectMenu(updateList);
						},

						updateSelectMenu: function(obj){
							var o = this.boxElements,
								optionsBox = o.optionsBox,
								select = optionsBox.getElementsByClassName('_FgGTrOptionsSelect'),
								{from: fromList, to: toList} = obj;
							if(!select.length) return;

							for(var i=0;i<select.length;i++){
								if(select[i].className.indexOf('Service')<0){
									var itemsText = '', item = '',
										languages = [fromList, toList][i];
									if(languages){
										for(item in languages){
											var isZH = languages[item].indexOf('中文') == 0, //中文排在前
												option = '<option value="'+ item +'">'+ languages[item] +'</option>';
											itemsText = (isZH ? (option + itemsText) : (itemsText + option));
										}
										select[i].innerHTML = (i != 1 ? '<option value="auto">自動檢測</option>' : '') + itemsText;
									}
								}
							}

							select[0].value = this.from;
							select[1].value = this.to;
						},

						sentRequest: function(details, callback){
							var resultBox = this.boxElements.resultBox;

							if(resultBox.ajaxRequest && resultBox.ajaxRequest.status !== 200){
								resultBox.ajaxRequest.abort();
							}

							var {url, method, postData, headers, rqType, timeout} = details;
							if(!url) return;

							var ld = rqType !='bingDictCallback';
							resultBox.ajaxRequest = this.ajax({
								method : method || 'GET',
								url : url + (/\=$/.test(url) ? new Date().getTime() : ''),
								timeout: timeout || 5000,
								postData: postData,
								headers: headers || {},
								onload : function(res) {
									res = res.target;
									if (res.status == 200) {
										if(callback){
											callback(res);
										}else{
											clearInterval(resultBox.loading);
											this[this.service + 'Service'](res, details);
										}
									}else if(res.status == 404 || res.status / 500 >= 1){
										ld && this.loadingAnimation();
										ld && this.statusAlert('錯誤：訪問'+ this.service +'翻譯服務器出錯。');
									}else if(res.status == 403){
										var json;
										try{
											json = JSON.parse(res.responseText);
										}catch(e){
											this.statusAlert('錯誤：訪問'+ this.service +'翻譯服務器出錯。Code:' + res.status);
										}
										if(json && json.message){
											clearInterval(resultBox.loading);
											details.retry = (details.retry || 0) + 1;
											this[this.service + 'Service'](res, details);
										}else{
											this.statusAlert('錯誤：訪問'+ this.service +'翻譯服務器出錯。Code:' + res.status);
										}
									}else if(res.status == 414 || res.status == 400){
										if(this.service == 'google'){
											this.statusAlert('錯誤：要翻譯的文本過長。');
										}else{
											ld && this.statusAlert('錯誤：網絡錯誤');
										}
										ld && this.loadingAnimation();
									}
								}.bind(this),

								ontimeout: function(e){
									ld && this.loadingAnimation();
									ld && this.statusAlert('錯誤：訪問'+ this.service +'翻譯服務器超時。');
									e.target.abort();
								}.bind(this),

								onerror: function(e){
									ld && this.loadingAnimation();
									ld && this.statusAlert('錯誤：訪問'+ this.service +'翻譯服務器發生錯誤。');
									e.target.abort();
								}.bind(this)
							});
						},

						getTranslateBox: function (){
							var box = document.createElement('div');
							box.id = '_FgGTrMainBox';
							box.innerHTML = '\
								<div id="_FgGTrResult">\
									<div>\
										<a title="前往翻譯頁面" target="_blank">\
											<span class="_FgGTrResultText">loading</span>\
										</a>\
									</div>\
									<div class="_FgGTrSoundAndAlertBox">\
										<a class="_FgGTrSoundButton" title="發音"></a>\
										<span class="_FgGTrAlertBox _FgGTr-text-label"></span>\
										<span class="_FgGTrSoundPhonetic"></span>\
									</div>\
									<div class="_FgGTrDetail"></div>\
									<div class="_FgGTrOptions">\
										<a class="_FgGTrOptionsToggle" title="設置">▼</a>\
									</div>\
								</div>\
								<div class="_FgGTrOptionsBox"></div>';
							document.body.appendChild(box);

							this.boxElements = {
								box: box,
								toggleOn: false,
								style: null,
								set resultText(text) this.resultBox.innerHTML = text,
								get resultText() this.resultBox.textContent,
								set phonetic(text) this.phoneticBox.innerHTML = text,
								set alertBox(text) this.alertBox.textContent = text,
								get alertBox() this.get('AlertBox'),
								get phoneticBox() this.get('SoundPhonetic'),
								get soundButton() this.get('SoundButton'),
								get resultBox() this.get('ResultText'),
								get toggleButton() this.get('OptionsToggle'),
								get optionsBox()  this.get('OptionsBox'),
								get detail() this.get('Detail'),
								get swapButton() this.get('SwapButton'),
								get saveButton() this.get('OptionsSave'),
								get cancelButton() this.get('OptionsCancel'),
								get checkbox() this.get('OptionsCheckbox'),
								get serviceSelect() this.get('OptionsService'),
								get: function(name) {
									return this.box.querySelector('._FgGTr'+ name);
								}
							};
						},

						setResultLink: function(){
							var obj = {
								text        : encodeURIComponent(this.camelCaseText.trim()),
								from        : this.from,
								to          : this.to,
								checkLanguge: this.checkLanguge
							};
							var link = this.boxElements.resultBox.parentNode;
							if(this.service == 'google'){
								link.href = (this.google.indexOf('translate') < 0 
										//無法使用服務器IP直接連接至谷歌翻譯頁面
										? 'https://translate.google.com.hk/'
										: this.google) + '?text='+ obj.text +'&langpair='+ obj.from +'|'+ obj.to;
							}else if(this.service == 'bing'){
								link.href = 'https://www.bing.com/translator/default.aspx?to='+ obj.to +'&text='+ obj.text;
							}else if(this.service == 'baidu'){
								link.href = 'http://fanyi.baidu.com/#'
									+ obj.from + '/' + obj.to + '/' + obj.text;
							}
						},

						loadingAnimation: function(){
							var resultBox = this.boxElements.resultBox,
								_loading = null;
							clearInterval(resultBox.loading);
							resultBox.textContent = 'loading..';
							_loading = resultBox.loading = setInterval(function(){
								try{
									if(resultBox.textContent.length<10){
										resultBox.textContent += '.';
									}else{
										resultBox.textContent = 'loading';
									}
								}catch(ex){
									clearInterval(_loading);
								}
							}, 500);
						},

						setOptionsBox: function(){
							var o = this.boxElements;
							this.setClassName(o.toggleButton.parentNode, '_FgGTrOptionsHidden', true);
							if(o.optionsBox.children.length){
								return this.toggleHidden(o.optionsBox);
							}
							var optionsBox = o.optionsBox;
							optionsBox.innerHTML = '\
								<div>\
									<span class="_FgGTr-text-label">從:</span>\
									<select class="_FgGTrOptionsSelect _FgGTrOptionsSelectFrom"></select>\
									<a class="_FgGTrSwapButton" title="交換"></a>\
									<span class="_FgGTr-text-label">譯作:</span>\
									<select class="_FgGTrOptionsSelect _FgGTrOptionsSelectTo"></select>\
								</div>\
								<div>\
									<span>\
										<span class="_FgGTr-text-label">服務:</span>\
										<select class="_FgGTrOptionsSelect _FgGTrOptionsService">\
											<option value="google">google</option>\
											<option value="bing">bing</option>\
											<option value="baidu">baidu</option>\
										</select>\
									</span>\
									<span id="_FgGTrOptionsCheckboxSpan">\
										<input type="checkbox" class="_FgGTrOptionsCheckbox" />\
										<span class="_FgGTr-text-label">駝峰式</span>\
									</span>\
									<span id="_FgGTrOptionsButtonSpan">\
										<a class="_FgGTrOptionsButton _FgGTrOptionsSave">保存</a>\
										<a class="_FgGTrOptionsButton _FgGTrOptionsCancel">取消</a>\
									</span>\
								</div>';
							var select = optionsBox.getElementsByClassName('_FgGTrOptionsSelect');

							//更新選擇語言框
							this.updateLanguages(true);

							o.toggleOn = true;
							o.checkbox.checked    = this.camelCase;
							o.serviceSelect.value = this.service;

							o.optionsBox.addEventListener('change', this, false);
						},

						getPlayList: function(){
							var str = this.camelCaseText;
							if(this.service == 'google'){
								var strArr = str.split(/(?=[ \u3000\n\r\t\s\,\.\?\!\！\？\。\，\u4e00-\u9fa5])/),
									strArr2 = [], strLeng = '',
									u1 = this.google + 'translate_tts?q=',
									u2 = '&tl=' + this.checkLanguge + '&prev=input&client=t';
								for(var j=0; j<strArr.length; j++){
									if((strLeng + strArr[j]).length<=100){
										strLeng += strArr[j];
									}else{
										strArr2.push(u1 + encodeURIComponent(strLeng) + u2 + '&tk=' + this.getGoogleTK(strLeng));
										strLeng = strArr[j];
									}
									if(j==strArr.length-1){
										strArr2.push(u1 + encodeURIComponent(strLeng) + u2 + '&tk=' + this.getGoogleTK(strLeng));
									}
								}
								return strArr2;
							}else if(this.service == 'bing'){
								return ['https:/www.bing.com/translator/api/language/Speak?gender={gender}&locale={locale}&media=audio/mp3&text='+encodeURI(str.replace(/ +/g, '+'))];
							}else if(this.service == 'baidu'){
								var lan = (this.checkLanguge || (this.from == 'auto' ? this.checkLanguge : this.from)),
									lan = (lan == 'cht' ? 'zh' : lan), spd = 2,
									part = '&text=' + encodeURIComponent(str) + '&spd=';
								if(lan == 'yue') lan = 'cte', spd = 5;
								else (lan == 'en' || lan == 'zh') && (spd = 2);
								return [(lan != 'zh')
										? 'http://fanyi.baidu.com/gettts?source=web&lan=' + lan + part + spd
										: 'http://tts.baidu.com/text2audio?pid=101&ie=UTF-8&lan=' + lan + part + spd
								];
							}
						},

						playSound: function(pl){
							var that = this,
								PL = pl || that.getPlayList.call(that),
								PS = that.playSound.bind(that);

							if(that.service == 'bing' && !pl){
								var from = (that.checkLanguge || (that.from == 'auto' ? that.checkLanguge : that.from)),
									lang = {'en': 'en-US', 'zh-CHS': 'zh-CN', 'zh-CHT': 'zh-TW', 'ja': 'ja-JP'};//常用語言
								if(from in lang){
									PL = PL.map(function(u){
										return u.replace('{gender}', 'Male').replace('{locale}', lang[from]);
									});
								}else{
									return that.ajax({
										method: 'GET',
										timeout: 5000,
										headers: { Cookie: this.bingAppId},
										url: 'https://www.bing.com/translator/api/Language/GetSpeechDialectsForLocale?locale=' + from,
										onload: function(res) {
											res = res.target.responseText;
											var l;
											try{
												l = JSON.parse(res);
											}catch(ex){
												that.statusAlert('Bing 發音服務響應格式錯誤。', 1000);
											}
											l = l.pop();
											that.playSound.call(that, PL.map(function(u){
												return u.replace('{gender}', l.genders.shift()).replace('{locale}', l.locale);
											}));
										},
										onerror: function(){
											that.statusAlert('Bing 發音服務網絡錯誤。', 1000);
										},
										ontimeout:function(){
											that.statusAlert('Bing 發音服務網絡超時。', 1000);
										}
									});
								}
							}

							if(!PS.initialized){
								var header = {
									//google當使用服務器IP時要發送Host，否則返回404無法發音
									google: {
										Host: !~this.google.indexOf('google') ? 'translate.google.com' : this.google.match(/https?:\/\/([^\/]+)/)[1], 
										Referer: !~this.google.indexOf('google') ? 'https://translate.google.com/' : this.google
									},
									bing: {Host:'www.bing.com', Referer:'https://www.bing.com/translator/', Cookie: this.bingAppId},
									baidu: {Referer:'http://fanyi.baidu.com'}
								};
								PS.get = function(idx){
									if(!that.player) return;
									this.initialized = true;
									PL[idx] && that.ajax({
										method: 'GET',
										timeout: 5000,
										responseType: 'blob',
										url: PL[idx],
										headers: (that.service in header) ? header[that.service] : [],
										onload: function(res) {
											res = res.target;
											if (res.status == 200) {
												var blob = res.response;
												//FF33或以下對content-type為audio/x-mpeg的音頻解碼有限制
												if(blob.type == 'audio/x-mpeg')
													blob = blob.slice(0, blob.size, 'audio/mpeg');
												that.player.src = window.URL.createObjectURL(blob);
												that.player.play();
											}else if(res.status == 404 || res.status / 500 >= 1){
												if(that.service == 'google' && res.status == 404){
													that.statusAlert('錯誤：無此語音，或文本過長。', 1000);
												}else{
													that.statusAlert('網絡錯誤。', 1000);
												}
											}
										},
										ontimeout: function(e){
											that.statusAlert('錯誤：訪問'+ that.service +'翻譯服務器超時。');
											e.target.abort();
										}
									});
								};
							}

							if(!this.player){
								//為了突破CSP只能使用Chrome環境下的Audio構造函數
								this.player = new Audio();
								this.player.pIndex = 0;
								this.player.onended = function(){
									this.pIndex += 1;
									if(this.pIndex == PL.length){
										this.pIndex = 0;
										this.pause();
									}else{
										PS.get(this.pIndex);
									}
									window.URL.revokeObjectURL(this.src);
								};
								this.player.onloadstart = function(){
									that.statusAlert('共'+ PL.length
												+ '段語音，正在播放第' + (this.pIndex + 1) + '段。', 2500);
								};
								this.player.onerror = function(e){
									var i = PL.indexOf(e.target.currentSrc);
									that.statusAlert('錯誤: 第'+ ((!!~i ? i : 0) + 1) +'段語音加載失敗。', 2500);
									window.URL.revokeObjectURL(this.src);
								};
							}

							if (this.player){
								PS.get(this.player.pIndex = 0);
							}
						},

						statusAlert: function(text, delay){
							clearTimeout(this.boxElements.alertBox.hideTimer);
							this.setClassName(this.boxElements.alertBox, '_FgGTrAlertBoxHide', false);
							this.boxElements.alertBox = text;
							this.boxElements.alertBox.hideTimer = setTimeout(function(){
								try{
									!delay || this.setClassName(this.boxElements.alertBox, 
																	'_FgGTrAlertBoxHide', true);
								}catch(ex){
									clearTimeout(arguments.callee);
								}
							}.bind(this), typeof delay == 'number' ? delay : 1000);
						},

						ajax: function(obj){
							var req = Cc['@mozilla.org/xmlextras/xmlhttprequest;1']
												.createInstance(Ci.nsIXMLHttpRequest);
							req.open(obj.method, obj.url, true);
							if(obj.headers){
								for(var i in obj.headers){
									req.setRequestHeader(i, obj.headers[i]);
								}
							}
							if(obj.responseType) req.responseType = obj.responseType;
							if(obj.timeout) req.timeout = obj.timeout;
							if(obj.ontimeout) req.ontimeout = obj.ontimeout;
							if(obj.onerror) req.onerror = obj.onerror;
							req.send(obj.postData && obj.method=='POST' ? obj.postData : null);
							req.onload = obj.onload;
							return req;
						},

						removeTranslateBox: function(){
							this.selectText = null;
							if(this.player && this.player.src){
								this.player.pause();
								window.URL.revokeObjectURL(this.player.src);
							}
							this.player = null;
							this.preSelection = [];
							if(this.boxElements){
								clearInterval(this.boxElements.resultBox.loading);
								this.boxElements.detail.removeEventListener('DOMMouseScroll', this, false);
								document.body.removeChild(this.boxElements.box);
								this.boxElements = null;
							}
							document.removeEventListener('mousedown',this, false);
							document.removeEventListener('mouseup',this, false);
							document.removeEventListener('mousemove',this, false);
							document.removeEventListener('keypass',this, false);
							window.removeEventListener('unload', this, false);
							this.originDocument.removeEventListener('mousedown',this, false);
						},

						setScrollbar: function(element){
							if(!this.boxElements) return;
							var detailBox = this.boxElements.detail;

							if(element && detailBox.scrollbar && detailBox.scrollbar.bar){
								try{
									//移除原來的滾動條, 由detail滾動條切換到baidu try
									element.removeChild(detailBox.scrollbar.bar);
									this.setClassName(element, '_FgGTrDetailOverflow', false);
								}catch(ex){}
								detailBox.scrollbar.bar = null;
							}
							var scrollBox = element || detailBox,
								contentBox = scrollBox.firstChild;
							scrollBox.style.minWidth = '';

							if(!contentBox) return;

							//緩存寬高
							var bdTab = detailBox.querySelector('._FgGTr-bd-tContent-current'),
								WHTB = (bdTab && bdTab.WHTB || (bdTab && (bdTab.WHTB = {}))),
								antiBlink = function(add){
									//消除伸縮閃爍
									bdTab || this.setClassName(this.boxElements.box, '_FgGTr-AntiBlink', add);
									bdTab && this.setClassName(bdTab.parentNode, '_FgGTr-AntiBlink', add);
							}.bind(this);
							antiBlink(true);

							setTimeout(function(){
								var detailHeight = 150,
									contentStyle = getComputedStyle(contentBox, null),
									contentHeight = (bdTab && (typeof WHTB.H == 'number'))
												? WHTB.H : parseInt(contentStyle.height),
									contentWidth = (bdTab && (typeof WHTB.W == 'number'))
												? WHTB.W : parseInt(contentStyle.width);

								if(bdTab && !WHTB.H){
									//如果未設置
									WHTB.H = contentHeight;
									WHTB.W = contentWidth;
								}

								if(contentHeight < 250) return antiBlink(false);
								var scrollbar = document.createElement('div'),
									thumb = document.createElement('div');
								scrollbar.className = '_FgGTr-scrollbar';
								thumb.className = '_FgGTr-thumb';

								detailBox.scrollbar = {
									scrollBox: scrollBox,
									bar: scrollbar,
									thumb: thumb,
									status: false,
									contentBox: contentBox,
									Y: 0,
									barHeight: parseInt(detailHeight),
									thumbHeight: Math.max(parseInt(detailHeight / 
												contentBox.offsetHeight * detailHeight), 10),
								};

								//上次滾動位置
								if(bdTab){
									contentBox.style.top = (!WHTB.T ? 0 : WHTB.T) + 'px';
									thumb.style.top = (!WHTB.B ? 0 : WHTB.B) + 'px';
								}

								this.setClassName(scrollBox, '_FgGTrDetailOverflow', true);

								if(contentWidth>=382){
									contentWidth = 382
								}else{
									contentWidth += 12;
								}

								scrollBox.style.setProperty('min-width', contentWidth + 'px','important');
								thumb.style.setProperty('height', detailBox.scrollbar.thumbHeight + 'px','important');

								scrollbar.appendChild(thumb);
								scrollBox.appendChild(scrollbar);

								antiBlink(false);
							}.bind(this), (bdTab && typeof WHTB.H == 'number') ? 0 : 50);
						},

						onScroll: function(event){
							var od = this.boxElements.detail,
								scroll = od.scrollbar,
								bdTab = od.querySelector('._FgGTr-bd-tContent-current');
							if(!scroll || !scroll.bar) return;
							var scrollBox = scroll.scrollBox || od,
								sbHeight = scroll.bar.offsetHeight;
							if(event.type == 'mousedown'){
								if(event.target == scroll.thumb){
									scroll.status = true;
									scroll.Y = event.clientY - scroll.thumb.offsetTop;
									return true;
								}
								return;
							}else if(event.type == 'mousemove'){
								var T = event.clientY - scroll.Y,
									Y = 0, p = 0;
								if(T <= scroll.bar.offsetTop){
									Y = scroll.bar.offsetTop;
								}else if(T >= sbHeight - scroll.thumbHeight){
									Y = sbHeight - scroll.thumbHeight;
								}else{
									Y = T;
								}
								p = (scroll.thumb.offsetTop - scroll.bar.offsetTop) / 
											(sbHeight - scroll.thumbHeight);
								if(p>=0.95){
									p = 1;
								}else if(p<0.05){
									p = 0;
								}

								scroll.contentBox.style.top = 
											parseInt((scrollBox.offsetHeight - 
												scroll.contentBox.offsetHeight) * p) + 'px';

								scroll.thumb.style.top = Y +'px';
								if(bdTab){
									if(!bdTab.WHTB)
										bdTab.WHTB = {};
									bdTab.WHTB.B = Y
								}

							}else if(event.type == 'DOMMouseScroll'){
								if(scrollBox.contains(event.target)){
									event.preventDefault();
									var s = parseInt(0 - event.detail * 4),
										ct = scroll.contentBox.offsetTop + s,
										cy = 0, p = 0, t = 0,
										outerHeight = scrollBox.offsetHeight,
										innerHeight = scroll.contentBox.offsetHeight;

									if(ct <= outerHeight - innerHeight){
										cy = outerHeight - innerHeight;
									}else if(ct>=0){
										cy = 0;
									}else{
										cy = ct;
									}
									p = cy/(outerHeight - innerHeight);

									if(p>=0.95){
										p = 1;
									}else if(p<0.05){
										p = 0;
									}

									t = parseInt((sbHeight - scroll.thumbHeight) * p);
									if(t<=0){
										t=0;
									}else if(t>= sbHeight - scroll.thumbHeight){
										t = sbHeight - scroll.thumbHeight;
									}

									scroll.thumb.style.top = parseInt(t*p) + 'px';
									scroll.contentBox.style.top = cy + 'px';

									if(bdTab){
										if(!bdTab.WHTB)
											bdTab.WHTB = {};
										bdTab.WHTB.B = parseInt(t*p);
									}
								}

								//漸變過渡
								this.setClassName(scroll.bar, '_FgGTrScrolling', true);
								if(event.type == 'DOMMouseScroll' && scroll.contentBox.contains(event.target))
									this.setClassName(scroll.contentBox, '_FgGTrScrolling', true);
								clearTimeout(scroll.scrTimer);
								scroll.scrTimer = setTimeout(function(){
									if(event.type == 'DOMMouseScroll'){
										this.setClassName(scroll.contentBox, '_FgGTrScrolling', false);
									}
									this.setClassName(scroll.bar, '_FgGTrScrolling', false);
								}.bind(this), 500);
							}
						},

						handleEvent: function(event){
							var box = this.boxElements.box;
							if(!box) return;
							var target = event.target,
								drag = box.drag,
								o = this.boxElements;
							if(!event.altKey && event.type == 'mousedown' && event.button==0){
								if(box.contains(target)){
									switch(target){
										case o.soundButton:
											this.playSound();
											break;
										case o.toggleButton:
											this.setOptionsBox();
											break;
										case o.saveButton:
											this.setPref();
											this.toggleHidden();
											break;
										case o.cancelButton:
											this.toggleHidden();
											break;
										case o.swapButton:
											this.swapLanguages();
											break;
										default:
											if(this.onScroll(event))
												break;
											var eTarget = event.explicitOriginalTarget,
												oTarget = event.originalTarget;

											if ((o.detail.contains(target) 
												|| o.resultBox.contains(target) 
												|| o.phoneticBox.contains(target))
												&& eTarget.nodeType == 3 && oTarget.nodeType == 1
												|| target.classList.contains('_FgGTrOptionsSelect')
											) return;

											drag.status = true;
											this.setClassName(o.box, '_FgGTrOptionsGrab', true);
											drag.X = event.clientX - box.offsetLeft;
											drag.Y = event.clientY - box.offsetTop;
									}
								}else{
									this.removeTranslateBox();
								}
								if(!~Array.prototype.slice.call(box.querySelectorAll('._FgGTrOptionsSelect'))
										.indexOf(target) &&
										(drag.status || (o.detail.scrollbar && o.detail.scrollbar.status))){
									event.preventDefault();
								}
							}
							if(event.type == 'mouseup' || event.type == 'keypass'){
								if(event.type == 'mouseup'){
									box.drag.status = false;
									o.detail.scrollbar && (o.detail.scrollbar.status = false);
									this.setClassName(o.box, '_FgGTrOptionsGrab _FgGTrOptionsGrabbing', false);
								}

								clearTimeout(o.selectionTimer);
								if(((o.detail.children[0] && o.detail.children[0] != target && 
												o.detail.children[0].contains(target))
											&& !(target.classList && target.classList.contains('_FgGTr-D-t1-Ci'))
									) || event.altKey || event.button!=0
								) return;
								o.selectionTimer = setTimeout(function(){
									var selection = window.getSelection();
									if(selection.focusNode 
										&& box.contains(selection.focusNode) 
										&& selection.toString().replace(/\s/g, '') !='')
										return;
									for (var i in this.preSelection){
										selection.addRange(this.preSelection[i]);
									}
								}.bind(this),50);
							}
							if(event.type == 'mousemove'){
								if(drag.status){
									this.setClassName(o.box, '_FgGTrOptionsGrabbing', true);
									this.setClassName(o.box, '_FgGTrOptionsGrab',false);
									box.style.left = event.clientX - drag.X + 'px';
									box.style.top  = event.clientY - drag.Y + 'px';
								}
								if(o.detail.scrollbar && o.detail.scrollbar.status){
									this.onScroll(event);
								}


								if(o.detail.moreUl && o.detail.moreUl.contains(target)){
									Array.prototype.forEach.call(o.detail.moreUl.children, function(li){
										if(li.contains(target)){
											li.getElementsByTagName('ul')[0].style.top 
													= li.getClientRects()[0].top + 16 +'px';
										}
									});
								}
							}

							if(event.type == 'DOMMouseScroll'){
								this.onScroll(event);
							}

							if(event.type == 'change'){
								if(box.contains(target)){
									if(target == o.checkbox){
										this.toggleCamelCase();
									}else if(target.className){
										if(/Select[^ ]/.test(target.className)){
											this.selectLanguages(event);
											if(target == o.get('OptionsSelectFrom'))
												this.updateLanguages();
										}else if(target.className.indexOf('Service')>0){
											this.toggleService();
										}
									}
								}
							}
							if(event.type == 'unload'){
								clearInterval(o.resultBox.loading);
								this.removeTranslateBox();
								window.FGgTranslator = null;
							}
						},

						toggleCamelCase: function(){
							var checked = this.boxElements.checkbox.checked;
							this.camelCase = this.camelCase != checked ?
										 checked : this.camelCase;

							this.setTranslateText();
						},

						toggleService: function(){
							this.service = this.boxElements.serviceSelect.value;
							this.updateLanguages(true);
							this.setTranslateText();
						},

						swapLanguages: function(){
							var select = this.boxElements.box.getElementsByClassName('_FgGTrOptionsSelect'),
								[from, to] = [select[0].value, select[1].value];

							//先設置form更新列表後才設置to
							select[0].value = to;
							this.from = select[0].value;
							this.updateLanguages(true);

							select[1].value = 
									Array.prototype.some.call(select[1].options, function(i){return i.value == from})
									? from : select[1].options[0].value;
							this.to = select[1].value;
							this.setTranslateText();
						},

						selectLanguages: function(event){
							var target = event.target;
							if(target.className.indexOf('SelectTo')>0){
								this.to = target.value;
							}else{
								this.from = target.value;
							}
							this.setTranslateText();
						},

						toggleHidden: function(elm){
							var o = this.boxElements,
								t = o.toggleOn,
								c = '_FgGTrOptionsHidden';
							if(elm){
								this.setClassName(elm, c, t);
							}else{
								this.setClassName(o.toggleButton.parentNode, c, !t);
								this.setClassName(o.optionsBox, c, t);
							}
							o.toggleOn = !t;
						},

						setClassName: function(elm, className, add){
							if(!elm) return;
							var classList = elm.className.split(' '),
								_classList = [];
							className = className.split(' ');

							for(var i=0;i<className.length;i++){
								var find = 0;
								for(var j=0;j<classList.length;j++){
									if(className[i] == classList[j]){
										if(!add && classList[0]!=''){
											classList.splice(j,1);
										}
									}else{
										if(add) find++;
									}
								}
								if(add && find == classList.length){
									_classList.push(className[i]);
								}
							}
							if(add){
								classList = classList[0]!='' ? classList.concat(_classList) : _classList;
							}

							classList = classList.sort().join(' ');
							if(elm.className.split(' ').sort().join(' ') != classList){
								elm.className = classList;
							}
						},

						xpPref:function(value){
							var pref = 'FireGestures.FGgTranslator.optionJSON';
							if(arguments.length==0){
								return Services.prefs.getCharPref(pref);
							}else{
								Services.prefs.setCharPref(pref, value);
								return value;
							}
						},

						getPref: function(){
							try{
								var pref = JSON.parse(this.xpPref());
								!pref.service && (pref.service = this.service);
								return pref;
							}catch(ex){
								var pref = {
									from:         this.from,
									to:           this.to,
									camelCase:    this.camelCase,
									service:      this.service,
									bingAppId:    this.bingAppId
								};
								this.xpPref(JSON.stringify(pref));
								return pref;
							}
						},

						setPref: function(json){
							if(json){
								var pref = this.getPref();
								for(var i in json)
									pref[i] = json[i];
								this.xpPref(JSON.stringify(pref));
							}else{
								this.xpPref(JSON.stringify({
									from:         this.from,
									to:           this.to,
									camelCase:    this.camelCase,
									service:      this.service,
									bingAppId:    this.bingAppId
								}));
							}
						},

						get camelCaseText() {
							return (this.camelCase 
										? this.selectText
											.replace(/([A-Z0-9])([A-Z])([a-z])/g, function(a, b, c, d){
												return b + ' ' + c.toLowerCase() + d;
											}).replace(/([a-z])([A-Z])/g, function(a, b, c){
												return b + ' ' + c.toLowerCase();
											}).replace(/([A-Za-z])\.([A-Za-z])/g, function(a, b, c){
												return b + ' ' + c.toLowerCase();
											})
										: this.selectText);
						},

						filter: {
							strFilter: function(str, num){
								num = num || 0;
								var f = [{
										'&':'&amp;',
										'\'':'&#x27;',
										'"':'&#x22;',
										'<':'&lt;',
										'>':'&gt;',
										'/':'&#47;',
									},
									' "\'「」『』、｛｝{}[]【】.。…~·～～，,;；:：' +
									'-=+*&＆＄$￥＊*^％%＃#＠@~()（）<>《》?？！!'
									],
									sF = arguments.callee;

								if(typeof num == 'number'){
									return str.replace(/./g, function(s){
											return num == 0 ? 
												(f[0][s] ? f[0][s] : s) : 
												(!!~f[1].indexOf(s) ? '' : s);
										});
								}else{
									return sF(str, 1).toLowerCase() == 
												sF(num, 1).toLowerCase();
								}
							},

							resultText: function(str){
								return str.replace(/(^\<span title\="[^"]+?" class\="[^"]+?"\>)((\<br \/\>)?[\s]?)*/,'$1')
								.replace(/\<span title\="[^"]+?" class\="[^"]+?"\>\<\/span\>/g,'')
								.replace(/(\<span title\="[^"]+?" class\=")([^"]+?)("\>[^\<]+)\<br \/\><\/span\>/g,
									'$1$2 _FgGTrR-T-Span-P$3</span><br />');
							},

							title: function(text, title, rt){
								return '<span'+(title ? (' title="' 
									+ (rt ? rt.replace(/\s[A-Za-z]+/g, '') +'\n' : '') 
									+'原文:\n\t'+ this.strFilter(title) +'"') : '')
									+' class="_FgGTrR-T-Span">'
									+ (this.strFilter(text).replace(/\n+/g,'<br />')) + '</span>';
							},

							cut: function(str, start, end, ru){
								var step = 0, string = '', i = 0, l = str.length;
								for (; i < l; i++) {
									step += (ru
										? ((/^[\u0600-\u06ff]+$/.test(str[i]) 
											|| /^[\ufb50\ufdff]+$/.test(str[i]) 
											|| /^[\ufe70-\ufefc]+$/.test(str[i]) 
											|| /^[\u0400-\u052F]+$/.test(str[i])) ? 2 : 1)
										: (/^[\u0391-\uFFE5]+$/.test(str.substr(i, 1)) ? 3 : 1));
									if (end < step)
										return string;
									else if (start < step)
										string += str.substr(i, 1);
								}
								return string;
							}
						},

						getSelection: function(event){
							var view = event.view,
								selection = view.getSelection(),
								txt = '';

							if(!this.selectText || !this.boxElements.box.contains(event.target)){
								this.preSelection = [];
								for (var i = 0; i < selection.rangeCount; i++){
									this.preSelection.push(selection.getRangeAt(i));
								}
							}

							if(event && Array.prototype.some
								.call(view.document.querySelectorAll('TEXTAREA, input'), function(item){
										return item.contains(event.target);
									})
							){
								txt = event.target.value.substr(event.target.selectionStart, 
																event.target.selectionEnd - 
																event.target.selectionStart);
							}else{
								try{
									txt = (function (elemt){
										var str = '',
											childs = elemt.childNodes;
										for (var child of childs) {
											if (child.nodeType == 1){
												var style = window.getComputedStyle(child);
												if (style.display == 'none' || style.visibility != 'visible'){
													continue;
												}else if(style.display == 'block'){
													str += arguments.callee(child) + '\n';
												}else if(child.tagName == 'BR'){
													str +=  '\n';
												}else{
													str += arguments.callee(child);
												}
											}else if (child.nodeType == 3){
												str += child.nodeValue;
											}
										}
										return str;
									})(selection.getRangeAt(0).cloneContents());
								}catch(ex){
									return '';
								}
							}

							return txt.replace(/(\&nbsp\;)/g,' ')
										.replace(/(\n\s*\n)/g,'\n')
										.replace(/\n+/g,'\n');
						},

						setStyle: function(element){
							var style = document.createElement('style'),
								cssText = (function(){/*
									#_FgGTrMainBox, 
									#_FgGTrMainBox :-moz-any(
										a, span, div, ul, li, img, b, i,
										h6, h5, input, select, option){
										margin:0;
										padding:0;
										font-size:12px;
										font-weight:normal;
										font-family:"微軟雅黑";
										font-style:normal;
										text-align:left;
										line-height:16px;
										background:none;
										color:#000;
										white-space:normal;
										border:none;
										max-width: none;
										min-width: 0;
										max-height:none;
										min-height:0;
										word-wrap: break-word;
										height: auto;
										width: auto;
										vertical-align: baseline;
										box-shadow: none;
										text-shadow:none;
										outline: none;
										text-indent:0;
										box-sizing: content-box;
										float:none;
									}
									#_FgGTrMainBox #_FgGTrResult b{
										font-weight: bold;
									}
									._FgGTrOptionsSelect{
										background:#FFF;
									}
									#_FgGTrMainBox span::after,
									#_FgGTrMainBox span::before{
										display:none;
									}
									#_FgGTrMainBox {
										position:absolute;
										border: 2px solid #A2CD5A;
										border-radius: 8px;
										background:#D6E9F8;
										padding:5px;
										z-index: 10000000000;
										box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
										max-width: 400px;
										min-height: 26px;
										min-width: 71px;
									}
									#_FgGTrMainBox._FgGTrOptionsGrab{
										cursor: -moz-grab;
									}
									#_FgGTrMainBox._FgGTrOptionsGrabbing{
										cursor: -moz-grabbing;
									}
									#_FgGTrMainBox audio{
										display:none;
									}
									._FgGTrR-T-Span{
										border-bottom:1px dotted transparent;
									}
									._FgGTrResultText ._FgGTrR-T-Span{
										font-size:13px;
									}
									._FgGTrResultText,
									._FgGTrR-T-Span{
										color: #4899FF;
										cursor: pointer;
									}
									._FgGTrR-T-Span:hover{
										position: relative;
										border-color:#555;
										top:1px;
										left:1px;
									}
									._FgGTrR-T-Span._FgGTrR-T-Span-P::after{
										content:"¶";
										display:inline-block;
										width:1em;
										color:transparent;
									}
									._FgGTrR-T-Span._FgGTrR-T-Span-P:hover::after{
										color:#555;
									}
									._FgGTrSoundPhonetic:not(:empty){
										margin-bottom:5px;
										display: block;
									}
									._FgGTrSoundPhonetic >span._FgGTrR-T-Span,
									._FgGTr-bd-synthesize>li>b>span,
									._FgGTr-bd-zdictMs>li>b>span,
									._FgGTr-bd-zdictCyu>b>span,
									._FgGTr-bd-zdict h5>span,
									._FgGTr-bd-sm-Phonetic{
										color:#078723;
									}
									#_FgGTrMainBox #_FgGTrResult>div:first-child>a{
										text-decoration: none;
										outline: none;
									}
									#_FgGTrMainBox #_FgGTrResult>div:first-child{
										margin-bottom:5px;
									}
									._FgGTrDetail:not(:empty), 
									._FgGTr-bd-drTab + ._FgGTrDetailOverflow{
										position: relative;
										padding-bottom:4px;
									}

									#_FgGTrMainBox._FgGTr-AntiBlink #_FgGTrResult ._FgGTrDetail,
									._FgGTr-bd-tContent._FgGTr-AntiBlink{
										position: absolute;
										opacity:0;
										pointer-events:none;
										min-width: 382px;
									}
									._FgGTr-bd-drTab>div{
										min-height:20px;
									}

									._FgGTrDetailOverflow{
										height:150px;
										overflow-y:hidden;
										padding-right:7px;
									}
									._FgGTrDetail>span{
										display:inline-block;
									}
									._FgGTrDetailOverflow>:-moz-any(span, ._FgGTr-bd-tContent){
										position:absolute;
									}
									._FgGTr-scrollbar{
										height:calc(100% - 2px);
										position: absolute;
										right:3px;
										display: inline-block;
										width:1px;
										z-index:1000;
										background:transparent content-box;
										transition: background-color .3s ease-in-out .1s;
									}
									._FgGTr-thumb{
										border-radius:2px;
										right:-3px;
										position: absolute;
										background-color:rgba(0,0,0,.2);
										box-shadow:0 0 5px rgba(100,100,100,.3);
										width:7px;
										transition-duration: .5s;
										transition-property: background-color, box-shadow;
										transition-timing-function: ease-out;
									}
									._FgGTr-scrollbar:hover,
									._FgGTr-scrollbar._FgGTrScrolling{
										background-color:rgba(100,100,100,.3);
										transition: background-color .1s ease-in-out .1s;
									}
									._FgGTr-scrollbar>._FgGTr-thumb:hover,
									._FgGTr-scrollbar._FgGTrScrolling>._FgGTr-thumb{
										background-color: rgba(0,0,0,.8);
									}

									._FgGTrOptionsHidden {
										display:none;
									}
									._FgGTrSwapButton {
										padding:2px;
										margin-left:5px;
										display:inline-block;
										width:10px;
										height:10px;
										position:relative;
										top:3px;
										border-radius:3px;
										background:#63b8ff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMklEQVQYlWNggIL/////ZyAE/iOAOzaMrggnIM1EktyIz+3oAlitxOdG/B4i2kRi3AgAn4TF6Ws4tvgAAAAASUVORK5CYII=") no-repeat 2px 2px;
									}
									._FgGTrSwapButton:hover {
										background-color:#836FFF;
									}
									._FgGTrSoundButton {
										display:inline-block;
										width:16px;
										height:16px;
										background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeUlEQVQ4jWNgoCN4z8DA0ECKhvlo/P0MDAz/GRgYzjMwMAgQo/k/FvECqPh6YjRjM4CBgYGhHyrnQEgzsgHIzhZggIQHiiv+48DI8vuxWESSAcj8hgExAK8X0CVIDkRchmADeKORkBOJSkjIhiADkpIyNkByZiIKAAAF70uREOxIPQAAAABJRU5ErkJggg==") no-repeat;
									}

									._FgGTr-D-t1-Ci{
										color: #666;
										font-weight: bold;
										display:block;
									}
									._FgGTr-bd-zdictCyu>ul,
									._FgGTr-D-t1-Ul{
										display:table;
									}
									._FgGTr-bd-zdictCyu>ul>li,
									._FgGTr-D-t1-li{
										display:table-row;
									}
									._FgGTr-bd-zdictCyu>ul>li>:-moz-any(b, span),
									._FgGTr-D-t1-li>span {
										display:table-cell;
									}
									._FgGTr-D-t1-li>span:first-child{
										color: #D2691E;
										padding-right:15px;
										white-space:pre;
										vertical-align:middle;
									}
									._FgGTr-D-t1-li>span:last-child{
										max-width: 360px;
									}
									._FgGTr-D-t1-li>span:last-child>ul:hover{
										background:#ccc;
									}
									._FgGTr-bd-edictSynonym>li,
									._FgGTr-D-t1-li>span:last-child>ul>li{
										display:inline-block;
										color: #336FB8;
									}
									._FgGTr-bd-edictSynonym>li:not(:last-child)::after,
									._FgGTr-D-t1-li>span:last-child>ul>li:not(:last-child)::after{
										content:",";
										color:#000;
										display:inline-block;
										margin-right:2px;
									}

									#_FgGTrMainBox :-moz-any(._FgGTrSoundButton,._FgGTrOptionsButton,._FgGTrOptionsToggle){
										position:relative;
										color: #EE9A49;
										cursor: pointer;
										font-size: 10px;
										text-decoration: none;
										opacity:.5;
									}
									#_FgGTrMainBox :-moz-any(._FgGTrSoundButton,._FgGTrOptionsButton):active{
										opacity:1;
									}
									#_FgGTrMainBox :-moz-any(._FgGTrSoundButton,._FgGTrOptionsButton):hover{
										left:1px;
										top:1px;
										color:#A020F0;
									}
									._FgGTrOptionsToggle{
										opacity:1;
										top:-7px;
										left:2px;
										-moz-user-select: none;
									}
									._FgGTrOptionsToggle:hover{
										color:#A020F0;
										top:-6px;
										left:3px;
									}
									._FgGTrOptions{
										text-align:right;
										height:2px;
									}
									._FgGTrOptionsBox:not(:empty){
										background-color: #F0FFFF;
										border-radius: 0 0 7px 7px;
										line-height: 24px;
										min-height: 48px;
										text-align: center;
										min-width:255px;
										padding-top: 2px;
									}
									._FgGTrOptionsBox>div{
										text-align: center;
									}
									._FgGTrOptionsBox>div:last-child{
										padding: 4px 0;
									}
									._FgGTrOptionsSelect{
										font-family:"微軟雅黑";
										font-size: 12px;
										text-align:left;
										border: 1px solid #ccc;
										margin: 0;
										padding: 0;
										width: 88px;
										height: 24px;
										color:#000;
										outline: 0;
									}
									._FgGTrOptionsService{
										width: 65px;
									}
									._FgGTrOptionsCheckbox{
										position: relative;
										top: 2px;
										vertical-align: baseline;
									}
									._FgGTrOptionsCheckbox+span{
										margin-right:15px;
									}
									._FgGTrOptionsButton{
										-moz-user-select: none;
										background:#FFFFF0;
										border: 1px solid #CCCCCC;
										border-radius: 4px;
										color: #FFA500;
										height: 19px;
										padding: 0px 5px 0;
										font-size:12px;
										opacity:1;
									}
									._FgGTr-text-label{
										pointer-events: none;
										-moz-user-select: none;
									}
									#_FgGTrMainBox ul{
										list-style:none;
										display:inline-block;
									}
									#_FgGTrMainBox li{
										height:16px;
										list-style:none;
										line-height:16px;
									}
									._FgGTrDetailDictBing{
										color: #1F4072;
									}
									._FgGTrDetailDictB{
										font-weight: bold;
										display: block;
									}
									#_FgGTrMainBox :-moz-any(._FgGTr-D-t5-li1, ._FgGTr-D-t5-li2) :-moz-any(span,li){
										white-space: pre;
									}
									._FgGTr-D-t5-li1{
										margin-right:15px;
									}
									._FgGTr-D-t5-li1 >span{
										color: #D2691E;
									}
									._FgGTr-D-t5-li2>span{
										position:relative;
									}
									._FgGTr-D-t5-li2 >span>span{
										color: #336FB8;
										padding:0 4px;
										border: 2px solid transparent;
									}
									._FgGTr-D-t5-li2>span>ul>li{
										color: #336FB8;
									}
									._FgGTr-D-t5-li2>span>ul>li:not(:first-child){
										border-top: 1px dotted #555;
									}
									._FgGTr-D-t5-li2 >span>span:hover,
									._FgGTr-D-t5-li2>span>ul>li:hover{
										background:#ccc;
									}
									._FgGTr-D-t5-li2>span>ul{
										position:fixed;
										display:none;
										padding:4px 4px;
										margin-top:-22px;
										border: 2px solid #A2CD5A;
										border-radius: 8px;
										background:#D6E9F8;
										z-index: 10000;
										box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
									}
									._FgGTr-D-t5-li2:hover >span>ul{
										display:block;
									}
									._FgGTr-bd-sm-partsName{
										display: flex;
									}
									._FgGTr-bd-sm-partsName>b{
										color: #D2691E;
										white-space: pre;
									}
									._FgGTr-bd-sm-parts li{
										display: inline-block;
										margin-left: 10px;
										color: #1373B0;
									}
									._FgGTr-bd-sm-parts li:not(:last-child)::after{
										content: ';';
										color: #000;
									}
									._FgGTr-bd-sm-parts:not(._FgGTr-bd-sm-parts-sg) {
										height: auto;
										display: flex;
									}
									._FgGTr-bd-sm-parts._FgGTr-bd-sm-parts-sg>li,
									._FgGTr-bd-sm-WordName > div{
										margin:0 0 0 5px;
										word-wrap: normal;
									}
									._FgGTr-bd-sm-exchange>li>span,
									._FgGTr-bd-sm-exchange>li,
									._FgGTr-bd-sm-exchange{
										display: flex;
									}
									._FgGTr-bd-sm-exchange>li>span,
									._FgGTr-bd-sm-exchange>li{
										flex-direction: column;
									}
									._FgGTr-bd-sm-exchange>li{
										border-right: 1px dashed #AAA;
									}
									._FgGTr-bd-sm-exchange>li:last-child{
										border-right: none;
									}
									._FgGTr-bd-edict h6:not([class]),
									._FgGTr-bd-sm-exchange>li>i{
										font-style:italic;
										padding: 0 2px;
										font-size:90%;
										color: #888;
									}
									._FgGTr-bd-sm-exchange>li>i{
										border-bottom:1px dashed #AAA;
										padding-bottom: 2px;
										text-align: center;
									}
									._FgGTr-bd-sm-exchange>li>i+span{
										padding: 0 2px;
									}
									._FgGTr-bd-edictSynonym>li>a,
									._FgGTr-bd-sm-exchange>li>span>a{
										text-align: center;
										color: #08008B;
									}

									._FgGTrDetailOverflow>span._FgGTrScrolling ._FgGTr-D-t5-li2 >span>ul{
										display:none;
									}
									._FgGTrAlertBox{
										color: #F60;
										opacity: 1;
										display:inline-block;
										position:relative;
										top:-3px;
										height:16px;
										transition: opacity .2s ease-in-out .2s;
									}
									._FgGTrAlertBox._FgGTrAlertBoxHide{
										opacity: 0;
										transition: opacity .3s ease-in-out .5s;
									}

									._FgGTr-bd-drTab-current{
										background-color: #D7E3E9;
										font-weight: bold;
									}
									._FgGTr-bd-drTab+div{
										border:2px solid #A2CD5A;
										min-height: 16px;
									}
									._FgGTr-bd-drTab>li {
										display: inline-block;
										padding: 2px 4px;
										margin: 1px 2px -2px;
										border: 2px solid #A2CD5A;
										border-radius: 5px 5px 0 0;
										border-bottom: 2px solid #D7E3E9;
										cursor: pointer;
										-moz-user-select: none;
										position: relative;
										z-index:1;
									}

									._FgGTr-bd-drTab>li:first-child{
										margin-left: 0;
									}
									._FgGTr-bd-drTab>li:not(._FgGTr-bd-drTab-current){
										color: #666;
									}
									._FgGTr-bd-drTab>li::after{
										display: block;
										width: calc(100% + 2px);
										height: 1px;
										content: '';
										position: absolute;
										bottom: -2px;
										left: -1px;
										background-color: #A2CD5A;
									}
									._FgGTr-bd-drTab>li._FgGTr-bd-drTab-current::after{
										width: 1px;
									}
									._FgGTr-bd-tContent>li:not(._FgGTr-bd-tContent-current){
										display:none;
									}
									._FgGTr-bd-net-means>li {
										padding:0px 5px;
										list-style: inside decimal;
										font-size: 90%;
										color:#777;
									}
									._FgGTr-bd-net-means>li:hover {
										background-color: #ccc;
									}
									._FgGTr-bd-net-means>li>span {
										color: #1373B0;
									}
									._FgGTr-bd-tContent>li {
										display: block;
										height: auto;
										margin: 5px 0;
									}
									._FgGTr-bd-tongfanyici li {
										height: auto;
									}
									._FgGTr-bd-tContent :-moz-any(h5, h6, b) {
										font-weight: bold;
									}
									._FgGTr-bd-tContent h5 {
										margin-left:5px;
										color: #000;
										font-size: 12px;
									}
									._FgGTr-bd-zdictCyu>ul>li>b,
									._FgGTr-bd-sm-WordName,
									._FgGTr-bd-tContent h6 {
										color: #0E4780;
									}
									._FgGTr-bd-tongfanyici>li {
										display: flex;
									}
									._FgGTr-bd-tongfanyici>li>b {
										position: absolute;
										padding-left: 10px;
									}
									._FgGTr-bd-tongfanyici>li>b:not(:empty)+span{
										margin-top: 16px;
									}
									._FgGTr-bd-sm-WordName > div,
									._FgGTr-bd-word-mean>li {
										display: inline-block;
									}
									._FgGTr-bd-word-mean>li>a{
										color: #1373B0;
										text-decoration: none;
										padding: 0 2px;
									}
									._FgGTr-bd-edictSynonym>li>a,
									._FgGTr-bd-sm-exchange>li>span>a,
									._FgGTr-bd-word-mean>li>a{
										text-decoration: none;
									}
									._FgGTr-bd-edictSynonym>li>a:hover,
									._FgGTr-bd-sm-exchange>li>span>a:hover,
									._FgGTr-bd-word-mean>li>a:hover{
										text-decoration: underline;
										background-color: #ccc;
										border-radius: 3px;
										box-shadow:inset 0 0 4px rgba(0,0,0,.3);
										transition: background-color 200ms, box-shadow 200ms;
									}
									._FgGTr-bd-word-mean>li:not(:last-child)::after {
										content:',';
										color:#666;
									}
									._FgGTr-bd-tongfanyici h6 {
										margin:0;
									}
									._FgGTr-bd-cizu li{
										height:auto;
									}

									._FgGTr-bd-tContent {
										background-color: #D7E3E9;
										width: 100%;
									}
									._FgGTr-bd-synthesize>li>b + ._FgGTr-bd-synthesizeCys,
									._FgGTr-bd-synthesize>li>h5 + ._FgGTr-bd-synthesizeCys,
									._FgGTr-bd-zdictMs>li>:-moz-any(h6, ul),
									._FgGTr-bd-edict>li>:-moz-any(h6, ul),
									._FgGTr-bd-tongfanyici>li>b+span,
									._FgGTr-bd-tongfanyici>li>h6,
									._FgGTr-bd-czjx>li {
										margin-left: 20px;
									}
									._FgGTr-bd-zdictPos{
										margin-left: 25px;
									}
									._FgGTr-bd-zdictMs ._FgGTr-bd-zdictPos>h5,
									._FgGTr-bd-synthesize>li>h5{
										color: #D2691E;
										margin-left: -20px;
									}
									._FgGTr-bd-zdictCyu>:-moz-any(ul, b),
									._FgGTr-bd-synthesize>li>h5,
									._FgGTr-bd-synthesizeCys{
										margin-left:10px;
									}
									._FgGTr-bd-synthesize ._FgGTr-bd-synthesizeCys{
										width: calc(100% - 10px);
									}
									._FgGTr-bd-synthesize>li>h5 + ._FgGTr-bd-synthesizeCys,
									._FgGTr-bd-synthesize>li>b + ._FgGTr-bd-synthesizeCys{
										width: calc(100% - 20px);
									}
									._FgGTr-bd-synthesize>li>b,
									._FgGTr-bd-cizu>li>span,
									._FgGTr-bd-zdictMs>li>b,
									._FgGTr-bd-edict>li>h5,
									._FgGTr-bd-zdict h5{
										font-size: 12px;
										display: block;
										font-weight: bold;
										margin-left: 5px;
										color: #0E4780;
									}
									._FgGTr-bd-zdictTitle,
									._FgGTr-bd-tongfanyiciTitle{
										font-weight: bold;
										font-style: italic;
										color:#333;
										text-shadow:0 0 2px #fff;
									}
									._FgGTr-bd-zdictCyu>ul>li>b{
										vertical-align: middle;
										text-align: right;
										padding-right:2px;
									}

									._FgGTr-bd-synthesizeCys,
									._FgGTr-bd-tongfanyici,
									._FgGTr-bd-part-name,
									._FgGTr-bd-edict>li,
									._FgGTr-bd-zdictPos,
									._FgGTr-bd-zdictMs,
									._FgGTr-bd-czjx {
										counter-reset: bd-czjx;
									}
									._FgGTr-bd-synthesize>li>b,
									._FgGTr-bd-czjx>li>span,
									._FgGTr-bd-zdictMs>li>b,
									._FgGTr-bd-edict>li>h6,
									._FgGTr-bd-tContent b,
									._FgGTr-bd-sm-parts b,
									._FgGTr-bd-zdict h5{
										font-weight: bold;
										color: #124DF6;
									}
									._FgGTr-bd-tContent b,
									._FgGTr-bd-sm-parts b{
										white-space: pre;
									}

									._FgGTr-bd-tongfanyici>li>b:not(:empty)+span
										>._FgGTr-bd-part-name>li>h6:not(:empty)::before,
									._FgGTr-bd-synthesizeCys>li>h6:not(:empty)::before,
									._FgGTr-bd-tongfanyici>li>h6:not(:empty)::before,
									._FgGTr-bd-zdictMs>li>h6:not(:empty)::before,
									._FgGTr-bd-czjx>li>span:not(:empty)::before,
									._FgGTr-bd-zdictPos>h6:not(:empty)::before,
									._FgGTr-bd-edictTg:not(:empty)::before {
										content: counter(bd-czjx)". ";
										counter-increment: bd-czjx;
										display: inline-block;
										margin-right:3px;
										color: #777;
										font-size:90%;
									}
									._FgGTr-bd-synthesizeLjs>li>ul,
									._FgGTr-bd-synthesizeLjs,
									._FgGTr-bd-synthesize ul,
									._FgGTr-bd-tongfanyici,
									._FgGTr-bd-synthesize,
									._FgGTr-bd-net-means,
									._FgGTr-bd-zdictMs,
									._FgGTr-bd-drTab,
									._FgGTr-bd-czjx,
									._FgGTr-bd-cizu,
									._FgGTr-bd-czlj{
										display: block;
										width: 100%;
									}

									._FgGTr-bd-synthesizeLjs>li:not(:last-child){
										border-bottom:1px dashed #888;
									}

									._FgGTr-bd-synthesizeLjs>li>ul>li:last-child,
									._FgGTr-bd-czlj>li:nth-child(2n),
									._FgGTr-bd-zdictCyu>ul>li>span,
									._FgGTr-bd-tongfanyici>li>h6,
									._FgGTr-bd-edictExample>li{
										color: #1373B0;
										width: 100%;
									}
									._FgGTr-bd-zdictSub>li{
										color: #1373B0;
									}
									._FgGTr-bd-zdictSub:empty{
										display:none;
									}
									._FgGTr-bd-sm-WordName ~ ._FgGTr-bd-sm-parts,
									._FgGTr-bd-edictExample,
									._FgGTr-bd-zdictSub{
										display: block;
									}
									._FgGTr-bd-tContent ._FgGTr-bd-synthesizeLjs>li>ul>li,
									._FgGTr-bd-tContent ._FgGTr-bd-czlj>li,
									._FgGTr-bd-edictExample>li,
									._FgGTr-bd-zdictSub>li{
										list-style: outside none circle;
										margin-left: 1em;
										width: calc(100% - 1em);
									}
									._FgGTr-bd-tContent ._FgGTr-bd-czlj>li:-moz-any(:nth-child(4n+3), :nth-child(4n+4)),
									._FgGTr-bd-tContent ._FgGTr-bd-synthesizeLjs>li:nth-child(2n)>ul>li{
										list-style: outside none square;
									}
									._FgGTr-bd-synthesizeLjs>li>ul>li:hover,
									._FgGTr-bd-zdictCyu>ul>li>span:hover,
									._FgGTr-bd-tongfanyici>li>h6:hover,
									._FgGTr-bd-edictExample>li:hover,
									._FgGTr-bd-zdictSub>li:hover,
									._FgGTr-bd-czlj>li:hover{
										background-color: #F5ECD4;
										transition: background-color 200ms;
									}

									._FgGTr-bd-baike{
										text-indent: 2em;
										margin-left:5px;
										margin-right: 5px;
										position: relative;
									}
									._FgGTr-bd-baike>span{
										vertical-align: text-top;
										text-decoration: none;
										color: #1373B0;
									}
									._FgGTr-bd-baike>span+a{
										position: absolute;
										width: 12px;
										height:12px;
										display: inline-block;
										background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAA1klEQVQYlWXPLW7DQBAF4JH3vflx1swBJaV7gYCyHqJSaQ8SWBIQ5iOYRIp6jZJIAblCcWFRgQuitRJ3pIfmmxmNyKJM7YgGUw0Tf/MqH2aQc15HxCPJDcHPJb4Ci8FgX04fS186p4+3EA0mCYsLyTMT30g+LU/PEA2m1tt3ERGFbm+bpnZU6GmGrr4TEQmNFyT8oMGkST9KXzqSm7zKhztYsUK3AJ6dPrbSPoiI/IO1NOmrQr9zzuvrBouB5Dks9q6+q1HoKSyGu+mw2C+/DItL6UtXzR/HIDykMtZTxgAAAABJRU5ErkJggg==') no-repeat 0 1px;
										opacity: 0.4;
										bottom: -3px;
										right: -3px;
									}
									._FgGTr-bd-baike>span+a:hover{
										opacity: 0.6;
									}
								*/}).toString().replace(/^.+\s|.+$/g,'')
									.replace(/\s+\/\/.*/g,'')
									.replace(/;\n/g,' !important;\n')
									.replace(/\n\t+\./g,'\n#_FgGTrMainBox .');
							style.textContent = cssText
									.replace(/\n\t+\$[^;]+;\$/g,'').replace(/\&/g,'&amp;');
							element.appendChild(style);
							return style;
						},
					}
				}
				window.FGgTranslator.init(event);
			})(win, doc,event);
		}
	}
];