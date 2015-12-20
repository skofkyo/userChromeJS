keys[1] = function() {
				XULBrowserWindow.statusTextField.label = "重新載入";
				UCL.rebuild();
				USL.rebuild();
				ucjsMouseGestures.reload(true);
				addMenu.rebuild(true);
				uAutoPagerize.loadSetting(true);
				uAutoPagerize.loadSetting_CN();
				refererChanger.reload(true);
				KeyChanger.makeKeyset(true);
				ZoomManager.setZoomForBrowser(getBrowser(), 1.25);
			};
keys[2] = "XULBrowserWindow.statusTextField.label = 'Gmail'; gBrowser.selectedTab = gBrowser.addTab('https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=https://mail.google.com/mail/?tab%3Dwm&scc=1&ltmpl=default&ltmplcache=2');";
keys['a'] = "XULBrowserWindow.statusTextField.label = 'Adblock Plus 條件偏好設定'; gBrowser.selectedTab = gBrowser.addTab('chrome://adblockplus/content/ui/filters.xul');";
keys['s'] = function() {
				XULBrowserWindow.statusTextField.label = '定位到searchbar並清除關鍵字';
				document.getElementById('searchbar').focus();
				MGs.FindReset();
			};
keys['d'] = "XULBrowserWindow.statusTextField.label = '切換 dTa 單鍵下載選擇器'; dTaTurboSelect.Toggle();";
keys['f'] = function() {
				XULBrowserWindow.statusTextField.label = "開啟並定位到findbar";
				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar.getElement('highlight').setAttribute("checked", "true");
				gFindBar._findField.focus();
				gFindBar._findField.value = '';
			};
keys['u'] = function() {
				XULBrowserWindow.statusTextField.label = '定位到urlbar並清除關鍵字';
				document.getElementById('urlbar').focus();
				document.getElementById('urlbar').value = '';
			};
