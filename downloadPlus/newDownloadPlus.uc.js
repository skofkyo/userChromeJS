// ==UserScript==
// @name	newDownloadPlus.uc.js
// @description	從硬盤中刪除+下載重命名並可轉碼+雙擊復制鏈接+另存為+保存並打開+完成下載提示音+自動關閉下載產生的空白標簽。
// @author	Kelo 再次修改整合  (w13998686967、ywzhaiqi、黒儀大螃蟹、Alice0775、紫雲飛)
// @charset	UTF-8
// @include	chrome://browser/content/browser.xul
// @include	chrome://browser/content/places/places.xul
// @include	chrome://mozapps/content/downloads/unknownContentType.xul
// @include	chrome://mozapps/content/downloads/downloads.xul
// @include	chrome://browser/content/downloads/contentAreaDownloadsView.xul
// @inspect	window.downloadPlus
// @startup	window.downloadPlus.init();
// @shutdown	window.downloadPlus.onDestroy();
// @optionsURL	about:config?filter=userChromeJS.downloadPlus.
// @config	window.downloadPlus.openPref();
// @version	2015.10.01 新增"重啟瀏覽器下載面板不刪除記錄" 功能，增強"Hash 計算"功能
// @version	2015.09.19 修復"另存為..."的一個錯誤
// @version	2015.05.09 優化代碼，新增"Hash 計算功能"
// @version	2015.05.07 使用黒儀大螃蟹的最新"從硬盤中刪除"代碼  增加"下載面板顯示下載速度"功能
// @version	2015.05.03 修復一些Bug，腳本開關無需重啟了
// @version	2015.05.02 修復多個功能，完美支持FFV38，完善UI設置界面。增加N個功能
// @version	2015.05.01 修復多個功能，增加UI設置界面
// @version	2014.11.02 增加多個功能
// @version	2014.06.06 add delay to fix for new userChrome.js
// @note	設置菜單在菜單欄裡，id為downloadPlus_set。
// ==/UserScript==
(function() {
	let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
	if (window.downloadPlus) {
		window.downloadPlus.onDestroy();
		delete window.downloadPlus;
	}
	if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");
	if (!window.DownloadUtils) Cu.import("resource://gre/modules/DownloadUtils.jsm");

	var downloadPlus = {
		get prefs() {
			delete this.prefs;
			return this.prefs = Services.prefs.getBranch("userChromeJS.downloadPlus.");
		},
		get Window() Services.wm.getMostRecentWindow("downloadPlus:Preferences"),
		get mainwin() Services.wm.getMostRecentWindow("navigator:browser"),
		get appVersion() Services.appinfo.version.split(".")[0],

		init: function() {
			if (location.href == "chrome://browser/content/browser.xul") {
				var ins = $("devToolsSeparator", this.mainwin.document);
				ins.parentNode.insertBefore($C("menuitem", {
					id: "downloadPlus_set",
					label: "downloadPlus 設定",
					image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAa0lEQVR42mNgwAGcnJyOAPF/KD7MQCpA0gzGowYQaQAotNE1YsGHKTXgCCFXNODR3ECsVxqI1gx19mEChjTgSKmHGfCFMtSQBnyxxEBuPGMYAMQ2JGi2RjbgGRFRhws/BxngBWKQofkJSC8A7kTAGZ4aXdgAAAAASUVORK5CYII=",
					oncommand: "downloadPlus.openPref();",
					class: "menuitem-iconic",
				}), ins);
				this.prefs.addObserver('', this.PrefsObs, false);
				this.loadDefault();
			}
			this.loadSetting();
			window.addEventListener("unload", function() {
				downloadPlus.onDestroy();
			}, false);
		},

		onDestroy: function() {
			if ($("downloadPlus_set")) $("downloadPlus_set").parentNode.removeChild($("downloadPlus_set"));
			this.prefs.removeObserver('', this.PrefsObs, false);
			if (this.Window) this.Window.close();
			Services.obs.notifyObservers(null, "startupcache-invalidate", "");
		},

		PrefsObs: function(subject, topic, data) {
			if (topic == 'nsPref:changed') {
				switch (data) {
					case 'new_Download':
					case 'new_Download_popups':
					case 'downloadsPanel_removeFile':
					case 'downloadSound_Play':
					case 'downloadFileSize':
					case 'autoClose_blankTab':
					case 'save_And_Open':
					case 'save_And_Open_RorL':
					case 'download_speed':
					case 'download_checksum':
					case 'download_dialog_changeName':
					case 'download_dialog_changeName_encodingConvert':
					case 'download_dialog_changeName_locking':
					case 'download_dialog_saveas':
					case 'download_dialog_saveas_dir':
					case 'download_dialog_saveTo':
					case 'download_dialog_saveTo_suffix':
					case 'download_dialog_showCompleteURL':
					case 'download_dialog_doubleclicksaveL':
					case 'download_dialog_doubleclickanyW':
					case 'download_dontRemoveFinishedDownloads':
					case 'download_dontRemoveFinishedDownloads_MaxRetentionHours':
					case 'download_dontRemoveFinishedDownloads_MinStoreThreshold':
						downloadPlus.loadSetting(data);
						break;
				}
			}
		},

		loadDefault: function() {
			this.Default_DownloadUtils_convertByteUnits = DownloadUtils.convertByteUnits;
			this.Default_gBrowser_mTabProgressListener = gBrowser.mTabProgressListener.toString();
			this.Default_DownloadsViewItem_prototype_update = (DownloadsViewItem.prototype._updateStatusLine || DownloadsViewItem.prototype._updateProgress).toString();
		},

		loadSetting: function(type) {
			var self = this;
			if (!type || type === "new_Download_popups") {
				this.new_Download_popups = self.getPrefs(0, "new_Download_popups", false);
			}
			if (!type || type === "download_dialog_changeName_encodingConvert") {
				this.download_dialog_changeName_encodingConvert = self.getPrefs(0, "download_dialog_changeName_encodingConvert", false);
			}
			if (!type || type === "download_dialog_changeName_locking") {
				this.download_dialog_changeName_locking = self.getPrefs(0, "download_dialog_changeName_locking", false);
			}
			if (!type || type === "download_dialog_doubleclickanyW") {
				this.download_dialog_doubleclickanyW = self.getPrefs(0, "download_dialog_doubleclickanyW", false);
			}
			if (!type || type === "download_dialog_saveTo_suffix") {
				this.download_dialog_saveTo_suffix = self.getPrefs(1, "download_dialog_saveTo_suffix", 0);
			}
			if (!type || type === "save_And_Open_RorL") {
				this.save_And_Open_RorL = self.getPrefs(1, "save_And_Open_RorL", 0);
			}
			if (!type || type === "download_dialog_saveas_dir") {
				// this.PrefStrTrim("download_dialog_saveas_dir", "['C:\\Users\\Administrator\\Downloads\\壓縮', '壓縮'], ['F:\\軟件相關', '軟件'], ['C:\\Users\\Administrator\\Downloads\\文檔', '文檔'], ['C:\\Users\\Administrator\\Downloads\\音樂', '歌曲'],['C:\\Users\\Administrator\\Downloads\\其他', '其他']");
			}
			if (!type || type === "download_dontRemoveFinishedDownloads_MaxRetentionHours") {
				this.download_dontRemoveFinishedDownloads_MaxRetentionHours = self.getPrefs(1, "download_dontRemoveFinishedDownloads_MaxRetentionHours", 1);
			}
			if (!type || type === "download_dontRemoveFinishedDownloads_MinStoreThreshold") {
				this.download_dontRemoveFinishedDownloads_MinStoreThreshold = self.getPrefs(1, "download_dontRemoveFinishedDownloads_MinStoreThreshold", 1);
			}

			switch (location.href) {
				case "chrome://browser/content/browser.xul":
					this.downloadsPanelOnOpen.init()
					setTimeout(function() {
						if (!type || type === "new_Download") {
							self.new_Download(self.getPrefs(0, "new_Download", false));
						}
						if (!type || type === "downloadsPanel_removeFile") {
							self.downloadsPanelOnOpen.add(function() {
								self.downloadsPanel_removeFile(self.getPrefs(0, "downloadsPanel_removeFile", false))
							});
						}
						if (!type || type === "downloadSound_Play") {
							self.downloadSound_Play(self.getPrefs(0, "downloadSound_Play", false));
						}
						if (!type || type === "downloadFileSize") {
							self.downloadFileSize(self.getPrefs(0, "downloadFileSize", false));
						}
						if (!type || type === "autoClose_blankTab") {
							self.autoClose_blankTab(self.getPrefs(0, "autoClose_blankTab", false));
						}
						if (!type || type === "save_And_Open") {
							self.saveAndOpen_on_main(self.getPrefs(0, "save_And_Open", false));
						}
						if (!type || type === "download_dialog_changeName") {
							self.download_dialog_changeName_on_main(self.getPrefs(0, "download_dialog_changeName", false));
						}
						if (!type || type === "download_speed") {
							self.download_speed(self.getPrefs(0, "download_speed", false));
						}
						if (!type || type === "download_checksum") {
							self.downloadsPanelOnOpen.add(function() {
								self.download_checksum(self.getPrefs(0, "download_checksum", false));
							});
						}
						if (!type || type === "download_dontRemoveFinishedDownloads") {
							self.dontRemoveFinishedDownloads(self.getPrefs(0, "download_dontRemoveFinishedDownloads", false));
						}
					}, 200);
					// 有延遲？
					// store is null？
					setTimeout(function() {
						if (!type || type === "download_dontRemoveFinishedDownloads") {
							self.dontRemoveFinishedDownloads(self.getPrefs(0, "download_dontRemoveFinishedDownloads", false));
						}
					}, 2000);
					break;
				case "chrome://mozapps/content/downloads/unknownContentType.xul":
					setTimeout(function() {
						if (!type || type === "save_And_Open") {
							self.save_And_Open(self.getPrefs(0, "save_And_Open", false));
						}
						if (!type || type === "download_dialog_changeName") {
							self.download_dialog_changeName(self.getPrefs(0, "download_dialog_changeName", false));
						}
						if (!type || type === "download_dialog_saveas") {
							self.download_dialog_saveas(self.getPrefs(0, "download_dialog_saveas", false));
						}
						if (!type || type === "download_dialog_saveTo") {
							self.download_dialog_saveTo(self.getPrefs(0, "download_dialog_saveTo", false));
						}
						if (!type || type === "download_dialog_showCompleteURL") {
							self.download_dialog_showCompleteURL(self.getPrefs(0, "download_dialog_showCompleteURL", false));
						}
						if (!type || type === "download_dialog_doubleclicksaveL") {
							self.download_dialog_doubleclicksaveL(self.getPrefs(0, "download_dialog_doubleclicksaveL", false));
						}
						window.sizeToContent(); // 下載彈出窗口大小自適應(確保在添加的按鈕之後加載)
					}, 200);
					break;
				case "chrome://browser/content/places/places.xul":
					setTimeout(function() {
						if (!type || type === "new_Download") {
							self.new_Download(self.getPrefs(0, "new_Download", false));
						}
						if (!type || type === "downloadsPanel_removeFile") {
							self.downloadsPanel_removeFile(self.getPrefs(0, "downloadsPanel_removeFile", false));
						}
						if (!type || type === "download_checksum") {
							self.download_checksum(self.getPrefs(0, "download_checksum", false));
						}
					}, 200);
					break;
				case "chrome://browser/content/downloads/contentAreaDownloadsView.xul":
					setTimeout(function() {
						if (!type || type === "new_Download") {
							self.new_Download(self.getPrefs(0, "new_Download", false));
						}
						if (!type || type === "downloadsPanel_removeFile") {
							self.downloadsPanel_removeFile(self.getPrefs(0, "downloadsPanel_removeFile", false));
						}
						if (!type || type === "download_checksum") {
							self.download_checksum(self.getPrefs(0, "download_checksum", false));
						}
					}, 200);
					break;
			}
		},

		getPrefs: function(type, name, val) {
			switch (type) {
				case 0:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_BOOL)
						this.prefs.setBoolPref(name, val ? val : false);
					return this.prefs.getBoolPref(name);
					break;
				case 1:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_INT)
						this.prefs.setIntPref(name, val ? val : 0);
					return this.prefs.getIntPref(name);
					break;
				case 2:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_STRING)
						this.prefs.setCharPref(name, val ? val : "");
					return this.prefs.getCharPref(name);
					break;
			}
		},

		openPref: function() {
			if (this.Window)
				this.Window.focus();
			else {
				var option = this.option();
				window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8," + option, '', 'chrome,titlebar,toolbar,centerscreen,dialog=no');
			}
		},

		option: function() {
			xul = '<?xml version="1.0"?><?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
					<prefwindow xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"\
					id="downloadPlus_Settings"\
					ignorekeys="true"\
					title="downloadPlus 設定"\
					onload="changeStatus();"\
					buttons="accept,cancel,extra1"\
					ondialogextra1="feedBack();"\
					windowtype="downloadPlus:Preferences">\
					<prefpane id="main" flex="1">\
						<preferences>\
							<preference id="new_Download" type="bool" name="userChromeJS.downloadPlus.new_Download"/>\
							<preference id="new_Download_popups" type="bool" name="userChromeJS.downloadPlus.new_Download_popups"/>\
							<preference id="downloadsPanel_removeFile" type="bool" name="userChromeJS.downloadPlus.downloadsPanel_removeFile"/>\
							<preference id="downloadSound_Play" type="bool" name="userChromeJS.downloadPlus.downloadSound_Play"/>\
							<preference id="downloadFileSize" type="bool" name="userChromeJS.downloadPlus.downloadFileSize"/>\
							<preference id="autoClose_blankTab" type="bool" name="userChromeJS.downloadPlus.autoClose_blankTab"/>\
							<preference id="save_And_Open" type="bool" name="userChromeJS.downloadPlus.save_And_Open"/>\
							<preference id="save_And_Open_RorL" type="int" name="userChromeJS.downloadPlus.save_And_Open_RorL"/>\
							<preference id="download_speed" type="bool" name="userChromeJS.downloadPlus.download_speed"/>\
							<preference id="download_checksum" type="bool" name="userChromeJS.downloadPlus.download_checksum"/>\
							<preference id="download_dialog_changeName" type="bool" name="userChromeJS.downloadPlus.download_dialog_changeName"/>\
							<preference id="download_dialog_changeName_encodingConvert" type="bool" name="userChromeJS.downloadPlus.download_dialog_changeName_encodingConvert"/>\
							<preference id="download_dialog_changeName_locking" type="bool" name="userChromeJS.downloadPlus.download_dialog_changeName_locking"/>\
							<preference id="download_dialog_saveas" type="bool" name="userChromeJS.downloadPlus.download_dialog_saveas"/>\
							<preference id="download_dialog_saveTo" type="bool" name="userChromeJS.downloadPlus.download_dialog_saveTo"/>\
							<preference id="download_dialog_saveTo_suffix" type="int" name="userChromeJS.downloadPlus.download_dialog_saveTo_suffix"/>\
							<preference id="download_dialog_showCompleteURL" type="bool" name="userChromeJS.downloadPlus.download_dialog_showCompleteURL"/>\
							<preference id="download_dialog_doubleclicksaveL" type="bool" name="userChromeJS.downloadPlus.download_dialog_doubleclicksaveL"/>\
							<preference id="download_dialog_doubleclickanyW" type="bool" name="userChromeJS.downloadPlus.download_dialog_doubleclickanyW"/>\
							<preference id="dontRemoveFinishedDownloads_MaxRetentionHours" type="int" name="userChromeJS.downloadPlus.download_dontRemoveFinishedDownloads_MaxRetentionHours"/>\
							<preference id="dontRemoveFinishedDownloads_MinStoreThreshold" type="int" name="userChromeJS.downloadPlus.download_dontRemoveFinishedDownloads_MinStoreThreshold"/>\
							<preference id="dontRemoveFinishedDownloads" type="bool" name="userChromeJS.downloadPlus.download_dontRemoveFinishedDownloads"/>\
						</preferences>\
						<script>\
							function feedBack() {\
								opener.gBrowser.selectedTab = opener.gBrowser.addTab("https://github.com/GH-Kelo/userChromeJS/issues");\
							}\
							function changeStatus() {\
								$("new_Download_popups").disabled = !($("new_Download").value);\
								$("download_dialog_changeName_encodingConvert").disabled = $("download_dialog_changeName_locking").disabled = !($("download_dialog_changeName").value);\
								$("download_dialog_saveTo_suffix").disabled = !($("download_dialog_saveTo").value);\
								$("save_And_Open_RorL").disabled =  !($("save_And_Open").value);\
								$("dontRemoveFinishedDownloads_MaxRetentionHours").disabled = $("dontRemoveFinishedDownloads_MinStoreThreshold").disabled = !($("dontRemoveFinishedDownloads").value);\
							}\
							function _changeStatus(event) {\
								switch(event.target.id){\
									case "new_Download": \
									$("new_Download_popups").disabled = ($("new_Download").value);\
									break;\
									case "download_dialog_changeName":\
									$("download_dialog_changeName_encodingConvert").disabled = $("download_dialog_changeName_locking").disabled = ($("download_dialog_changeName").value);\
									break;\
									case "download_dialog_saveTo":\
									$("download_dialog_saveTo_suffix").disabled = ($("download_dialog_saveTo").value);\
									break;\
									case "save_And_Open":\
									$("save_And_Open_RorL").disabled = ($("save_And_Open").value);\
									break;\
									case "save_And_Open":\
									$("save_And_Open_RorL").disabled = ($("save_And_Open").value);\
									break;\
									case "dontRemoveFinishedDownloads":\
									$("dontRemoveFinishedDownloads_MaxRetentionHours").disabled = $("dontRemoveFinishedDownloads_MinStoreThreshold").disabled = ($("dontRemoveFinishedDownloads").value);\
									break;\
								}\
							}\
							function $(id) document.getElementById(id);\
						</script>\
						<groupbox>\
							<caption label="主界面"/>\
							<checkbox id="downloadSound_Play" label="下載完成提示音" preference="downloadSound_Play"/>\
							<checkbox id="downloadFileSize" label="精確顯示文件大小" preference="downloadFileSize"/>\
							<checkbox id="autoClose_blankTab" label="自動關閉下載產生的空白標簽" preference="autoClose_blankTab"/>\
							<checkbox id="download_speed" label="下載面板顯示下載速度" preference="download_speed"/>\
							<checkbox id="dontRemoveFinishedDownloads" label="下載面板是否不刪除記錄" tooltiptext="火狐在重啟後會自動刪除下載面板的下載記錄，這個選項能保存這些記錄" oncommand="_changeStatus(event)" preference="dontRemoveFinishedDownloads"/>\
							<hbox align="center" class="indent">\
								<label value="最大保存時間（時）："/>\
								<textbox id="dontRemoveFinishedDownloads_MaxRetentionHours" type="number" preference="dontRemoveFinishedDownloads_MaxRetentionHours" style="width:125px" tooltiptext="當時間小於這個數字時，才會保存這些下載記錄"/>\
							</hbox>\
							<hbox align="center" class="indent">\
								<label value="最小下載數量（個）："/>\
								<textbox id="dontRemoveFinishedDownloads_MinStoreThreshold" type="number" preference="dontRemoveFinishedDownloads_MinStoreThreshold" style="width:125px" tooltiptext="當下載面板中的數量大於這個數字時，才會保存這些下載記錄"/>\
							</hbox>\
						</groupbox>\
						<groupbox>\
							<caption label="下載界面"/>\
							<checkbox id="download_dialog_saveas" label="另存為" preference="download_dialog_saveas"/>\
							<hbox align="center">\
							            <checkbox id="download_dialog_saveTo" label="保存到" oncommand="_changeStatus(event)" preference="download_dialog_saveTo"/>\
							            <label value="後綴樣式："/>\
							            <menulist preference="download_dialog_saveTo_suffix" id="download_dialog_saveTo_suffix" style="width:220px">\
								            <menupopup>\
									            <menuitem label="樣式：如downloadPlus.uc.js(1).7z" value="0"/>\
									            <menuitem label="樣式：如downloadPlus.uc.js-1.7z" value="1"/>\
								            </menupopup>\
							            </menulist>\
							</hbox>\
							<checkbox id="download_dialog_showCompleteURL" label="下載彈出窗口雙擊鏈接復制完整鏈接" preference="download_dialog_showCompleteURL"/>\
							<checkbox id="download_dialog_doubleclicksaveL" label="下載彈出窗口雙擊保存文件項執行下載" preference="download_dialog_doubleclicksaveL"/>\
						            <checkbox id="download_dialog_doubleclickanyW" label="下載彈出窗口任何地方雙擊執行下載" preference="download_dialog_doubleclickanyW"/>\
						</groupbox>\
						<groupbox>\
							<caption label="其他"/>\
							<checkbox id="new_Download" label="新建下載 （主界面、收藏庫）"  tooltiptext="修改暫時需重啟生效，很快會更新" oncommand="_changeStatus(event)" preference="new_Download"/>\
							<hbox align="center" class="indent">\
							            <checkbox align="center" id="new_Download_popups" label="是否彈窗"  preference="new_Download_popups"/>\
							</hbox>\
							<checkbox id="downloadsPanel_removeFile" label="從硬盤中刪除 （主界面、收藏庫）" tooltiptext="修改暫時需重啟生效，很快會更新" preference="downloadsPanel_removeFile"/>\
							<checkbox id="download_checksum" label="Hash 計算（主界面、收藏庫）" preference="download_checksum"/>\
							<hbox align="center">\
							            <checkbox id="save_And_Open" label="保存並打開（主界面、下載界面）" tooltiptext="修改暫時需重啟生效，很快會更新" oncommand="_changeStatus(event)" preference="save_And_Open"/>\
							            <label value="打開方式："/>\
							            <menulist preference="save_And_Open_RorL" id="save_And_Open_RorL" style="width:120px">\
								            <menupopup>\
									            <menuitem label="打開所在文件夾" value="0"/>\
									            <menuitem label="打開文件" value="1"/>\
								            </menupopup>\
							            </menulist>\
							</hbox>\
							<checkbox id="download_dialog_changeName" label="下載改名（主界面、下載界面）" oncommand="_changeStatus(event)" preference="download_dialog_changeName"/>\
							<hbox align="center" class="indent">\
									<checkbox align="center" id="download_dialog_changeName_encodingConvert" label="是否開啟下拉菜單"  preference="download_dialog_changeName_encodingConvert"/>\
									<checkbox align="center" id="download_dialog_changeName_locking" label="鎖定保存文件按鈕"  preference="download_dialog_changeName_locking"/>\
							</hbox>\
						</groupbox>\
						<hbox flex="1">\
							<button dlgtype="extra1" label="反饋"/>\
							<spacer flex="1"/>\
							<button dlgtype="accept"/>\
							<button dlgtype="cancel"/>\
						</hbox>\
					</prefpane>\
					</prefwindow>\
			';
			return encodeURIComponent(xul);
		},

		// 下載完成提示音
		downloadSound_Play: function(enable) {
			if (!enable) {
				downloadPlaySound && downloadPlaySound.uninit();
				return;
			}
			var downloadPlaySound = {

				DL_START: null,
				DL_DONE: "file:///C:/WINDOWS/Media/chimes.wav",
				DL_CANCEL: null,
				DL_FAILED: null,

				get _enable() {
					var _enable = downloadPlus.getPrefs(0, "downloadSound_Play", false);
					return _enable;
				},

				_list: null,
				init: function sampleDownload_init() {
					XPCOMUtils.defineLazyModuleGetter(window, "Downloads",
						"resource://gre/modules/Downloads.jsm");


					window.addEventListener("unload", this, false);

					//**** 監視下載
					if (!this._list) {
						Downloads.getList(Downloads.ALL).then(list => {
							this._list = list;
							return this._list.addView(this);
						}).then(null, Cu.reportError);
					}
				},

				uninit: function() {
					window.removeEventListener("unload", this, false);
					if (this._list) {
						this._list.removeView(this);
					}
				},

				onDownloadAdded: function(aDownload) {
					//**** 開始下載
					if (this.DL_START && this._enable);
					this.playSoundFile(this.DL_START);
				},

				onDownloadChanged: function(aDownload) {
					//**** 取消下載
					if (aDownload.canceled && this.DL_CANCEL && this._enable)
						this.playSoundFile(this.DL_CANCEL)
						//**** 下載失敗
					if (aDownload.error && this.DL_FAILED && this._enable)
						this.playSoundFile(this.DL_FAILED)
						//**** 完成下載
					if (aDownload.succeeded && this.DL_DONE && this._enable)
						this.playSoundFile(this.DL_DONE)
				},

				playSoundFile: function(aFilePath) {
					if (!aFilePath)
						return;
					var ios = Components.classes["@mozilla.org/network/io-service;1"]
						.createInstance(Components.interfaces["nsIIOService"]);
					try {
						var uri = ios.newURI(aFilePath, "UTF-8", null);
					} catch (e) {
						return;
					}
					var file = uri.QueryInterface(Components.interfaces.nsIFileURL).file;
					if (!file.exists())
						return;

					this.play(uri);
				},

				play: function(aUri) {
					var sound = Components.classes["@mozilla.org/sound;1"]
						.createInstance(Components.interfaces["nsISound"]);
					sound.play(aUri);
				},

				handleEvent: function(event) {
					switch (event.type) {
						case "unload":
							this.uninit();
							break;
					}
				}
			}

			downloadPlaySound.init();
		},

		//新建下載
		new_Download: function(enable) {
			if (!enable) return;
			var createDownloadDialog = function() {
				if (downloadPlus.new_Download_popups)
					window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPD94bWwtc3R5bGVzaGVldCBocmVmPSJjaHJvbWU6Ly9nbG9iYWwvc2tpbi8iIHR5cGU9InRleHQvY3NzIj8+Cjx3aW5kb3cgeG1sbnM9Imh0dHA6Ly93d3cubW96aWxsYS5vcmcva2V5bWFzdGVyL2dhdGVrZWVwZXIvdGhlcmUuaXMub25seS54dWwiIHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiB0aXRsZT0i5paw5aKe5LiL6LyJ5Lu75YuZIj4KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvplovlp4st57WQ5p2fLeS9jeaVuF0pIj4KCQk8bGFiZWwgdmFsdWU9IuaJuemHj+S7u+WLmSI+PC9sYWJlbD4KCQk8dGV4dGJveCBmbGV4PSIxIi8+Cgk8L2hib3g+Cgk8dGV4dGJveCBpZD0idXJscyIgbXVsdGlsaW5lPSJ0cnVlIiBmbGV4PSIxIi8+Cgk8aGJveCBkaXI9InJldmVyc2UiPgoJCTxidXR0b24gbGFiZWw9IumWi+Wni+S4i+i8iSIvPgoJPC9oYm94PgoJPHNjcmlwdD4KCQk8IVtDREFUQVsKCQlmdW5jdGlvbiBQYXJzZVVSTHMoKSB7CgkJCXZhciBiYXRjaHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZTsKCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7CgkJCQlmb3IgKHZhciBtYXRjaCA9IGJhdGNodXJsLm1hdGNoKC9cWyhcZCspLShcZCspLT8oXGQrKT9cXS8pLCBpID0gbWF0Y2hbMV0sIGogPSBtYXRjaFsyXSwgayA9IG1hdGNoWzNdLCB1cmxzID0gW107IGkgPD0gajsgaSsrKSB7CgkJCQkJdXJscy5wdXNoKGJhdGNodXJsLnJlcGxhY2UoL1xbXGQrLVxkKygtXGQrKT9cXS8sIChpICsgIiIpLmxlbmd0aCA8IGsgPyAoZXZhbCgiMTBlIiArIChrIC0gKGkgKyAiIikubGVuZ3RoKSkgKyAiIikuc2xpY2UoMikgKyBpIDogaSkpOwoJCQkJfQoJCQkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3VybHMiKS52YWx1ZSA9IHVybHMuam9pbigiXG4iKTsKCQkJfSBlbHNlIHsKCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsKCQkJfQoJCX0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOwoJCXdoaWxlKG93bmVyLm9wZW5lciAmJiBvd25lci5sb2NhdGlvbiAhPSAiY2hyb21lOi8vYnJvd3Nlci9jb250ZW50L2Jyb3dzZXIueHVsIil7CgkJCW93bmVyID0gb3duZXIub3BlbmVyOwoJCX0KdmFyIG1haW53aW4gPSBDb21wb25lbnRzLmNsYXNzZXNbIkBtb3ppbGxhLm9yZy9hcHBzaGVsbC93aW5kb3ctbWVkaWF0b3I7MSJdLmdldFNlcnZpY2UoQ29tcG9uZW50cy5pbnRlcmZhY2VzLm5zSVdpbmRvd01lZGlhdG9yKS5nZXRNb3N0UmVjZW50V2luZG93KCJuYXZpZ2F0b3I6YnJvd3NlciIpOwkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS5hZGRFdmVudExpc3RlbmVyKCJrZXl1cCIsIFBhcnNlVVJMcywgZmFsc2UpOwoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJ1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNvbW1hbmQiLCBmdW5jdGlvbiAoKSB7CQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjdXJscyIpLnZhbHVlLnNwbGl0KCJcbiIpLmZvckVhY2goZnVuY3Rpb24gKHVybCkgewoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsKCQkJfSk7CgkJCWNsb3NlKCkKCQl9LCBmYWxzZSk7CgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlID0gb3duZXIucmVhZEZyb21DbGlwYm9hcmQoKTsKCQlQYXJzZVVSTHMoKTsKCQldXT4KCTwvc2NyaXB0Pgo8L3dpbmRvdz4=", "name", "top=" + (window.screenY + window.innerHeight/4 - 50) + ",left=" + (window.screenX + window.innerWidth/2 - 250));
				else
					window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPD94bWwtc3R5bGVzaGVldCBocmVmPSJjaHJvbWU6Ly9nbG9iYWwvc2tpbi8iIHR5cGU9InRleHQvY3NzIj8+Cjx3aW5kb3cgeG1sbnM9Imh0dHA6Ly93d3cubW96aWxsYS5vcmcva2V5bWFzdGVyL2dhdGVrZWVwZXIvdGhlcmUuaXMub25seS54dWwiIHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiB0aXRsZT0i5paw5aKe5LiL6LyJ5Lu75YuZIj4KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvplovlp4st57WQ5p2fLeS9jeaVuF0pIj4KCQk8bGFiZWwgdmFsdWU9IuaJuemHj+S7u+WLmSI+PC9sYWJlbD4KCQk8dGV4dGJveCBmbGV4PSIxIi8+Cgk8L2hib3g+Cgk8dGV4dGJveCBpZD0idXJscyIgbXVsdGlsaW5lPSJ0cnVlIiBmbGV4PSIxIi8+Cgk8aGJveCBkaXI9InJldmVyc2UiPgoJCTxidXR0b24gbGFiZWw9IumWi+Wni+S4i+i8iSIvPgoJPC9oYm94PgoJPHNjcmlwdD4KCQk8IVtDREFUQVsKCQlmdW5jdGlvbiBQYXJzZVVSTHMoKSB7CgkJCXZhciBiYXRjaHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZTsKCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7CgkJCQlmb3IgKHZhciBtYXRjaCA9IGJhdGNodXJsLm1hdGNoKC9cWyhcZCspLShcZCspLT8oXGQrKT9cXS8pLCBpID0gbWF0Y2hbMV0sIGogPSBtYXRjaFsyXSwgayA9IG1hdGNoWzNdLCB1cmxzID0gW107IGkgPD0gajsgaSsrKSB7CgkJCQkJdXJscy5wdXNoKGJhdGNodXJsLnJlcGxhY2UoL1xbXGQrLVxkKygtXGQrKT9cXS8sIChpICsgIiIpLmxlbmd0aCA8IGsgPyAoZXZhbCgiMTBlIiArIChrIC0gKGkgKyAiIikubGVuZ3RoKSkgKyAiIikuc2xpY2UoMikgKyBpIDogaSkpOwoJCQkJfQoJCQkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3VybHMiKS52YWx1ZSA9IHVybHMuam9pbigiXG4iKTsKCQkJfSBlbHNlIHsKCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsKCQkJfQoJCX0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOwoJCXdoaWxlKG93bmVyLm9wZW5lciAmJiBvd25lci5sb2NhdGlvbiAhPSAiY2hyb21lOi8vYnJvd3Nlci9jb250ZW50L2Jyb3dzZXIueHVsIil7CgkJCW93bmVyID0gb3duZXIub3BlbmVyOwoJCX0KdmFyIG1haW53aW4gPSBDb21wb25lbnRzLmNsYXNzZXNbIkBtb3ppbGxhLm9yZy9hcHBzaGVsbC93aW5kb3ctbWVkaWF0b3I7MSJdLmdldFNlcnZpY2UoQ29tcG9uZW50cy5pbnRlcmZhY2VzLm5zSVdpbmRvd01lZGlhdG9yKS5nZXRNb3N0UmVjZW50V2luZG93KCJuYXZpZ2F0b3I6YnJvd3NlciIpOwkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS5hZGRFdmVudExpc3RlbmVyKCJrZXl1cCIsIFBhcnNlVVJMcywgZmFsc2UpOwoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJ1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNvbW1hbmQiLCBmdW5jdGlvbiAoKSB7CQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjdXJscyIpLnZhbHVlLnNwbGl0KCJcbiIpLmZvckVhY2goZnVuY3Rpb24gKHVybCkgewoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCB0cnVlLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsKCQkJfSk7CgkJCWNsb3NlKCkKCQl9LCBmYWxzZSk7CgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlID0gb3duZXIucmVhZEZyb21DbGlwYm9hcmQoKTsKCQlQYXJzZVVSTHMoKTsKCQldXT4KCTwvc2NyaXB0Pgo8L3dpbmRvdz4=", "name", "top=" + (window.screenY + window.innerHeight/4 - 50) + ",left=" + (window.screenX + window.innerWidth/2 - 250));
			}

			location == "chrome://browser/content/browser.xul" && (function() {
				document.getElementById('downloads-button').parentNode.addEventListener('click', function(e) {
					if (e.target.id == "downloads-button" || e.target.id == "downloads-indicator") {
						if (e.button == 2) {
							if (!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)) {
								createDownloadDialog();
								e.stopPropagation();
								e.preventDefault();
							}
						}
					}
				}, false);
			})();

			location == "chrome://browser/content/places/places.xul" && (function() {
				var button = document.querySelector("#placesToolbar").insertBefore(document.createElement("toolbarbutton"), document.querySelector("#clearDownloadsButton"));
				button.id = "createNewDownload";
				button.label = "新建下載";
				button.style.paddingRight = "9px";
				button.addEventListener("command", createDownloadDialog, false);
				window.addEventListener("mouseover", function(e) {
					button.style.display = (document.getElementById("searchFilter").attributes.getNamedItem("collection").value == "downloads") ? "-moz-box" : "none";
				}, false);
			})();
		},
		// 從硬盤中刪除
		downloadsPanel_removeFile: function(enable) {
			if (!enable) {
				return;
			}
			var removeDownloadfile = {
				removeStatus: function() {
					var RMBtn = document.querySelector("#removeDownload"),
						listbox = document.querySelector("#downloadsListBox") || document.querySelector("#downloadsRichListBox"),
						state = listbox.selectedItems[0].getAttribute('state');
					RMBtn.setAttribute("disabled", "true");
					if (state != "0" && state != "4" && state != "5")
						RMBtn.removeAttribute("disabled");
				},
				removeMenu: function() {
					try {removeDownloadfile.removeStatus();} catch (e) {};
					if (document.querySelector("#removeDownload")) return;
					var menuitem = document.createElement("menuitem"),
						rlm = document.querySelector('.downloadRemoveFromHistoryMenuItem');
					menuitem.setAttribute("label", rlm.getAttribute("label").indexOf("History") != -1 ? "Delete File" : "從硬碟中刪除");
					menuitem.setAttribute("id", "removeDownload");
					menuitem.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABIUlEQVRIie2VUZHDIBRFKyESIuHOvQYiYSVUQiTUQSRUAhKQUAmREAnZj33sUBpoScjsz74ZPjLzwoHHeXC5JAGgI3klOUnykh6S1mg8JHmSE8krgC6doxgABkkumfTT4QAMbyG2+j2Ap0FyKkFuLSAR7JYDLY1By9+CzKxmIEk+C2opQwm0kry30JvkXdKaBRlsDg1Y27CWP4ecj2Swb0dyBDAA6ON8AL2tfrS8l///ZaiSQdLX6TLYWf9W5RQZ4lsbAEjOzWUIO7LSefxEH6A2twPQHZHB2UJdBF4MhqRS7ogMbqsiJJeNi9ofkiE6l+wLEHa5RwYkMmyV6hli1u1+YQtn8gpKe6BmlCBZ2OkypFEhw1il99FIGzaWRlHDfgO7af5HS7KuxwAAAABJRU5ErkJggg==");

					menuitem.onclick = function(e) {
						if (e.target.disabled) return;
						var path = "";
						if (typeof DownloadsViewItemController != "undefined" || DownloadsView.itemForElement) {
							let selectedItem = DownloadsView.richListBox.selectedItem;
							if (DownloadsView.itemForElement) {
								path = DownloadsView.itemForElement(selectedItem).download.target.path;
							}
							else if (DownloadsView.controllerForElement) {
								//FF38
								path = DownloadsView.controllerForElement(selectedItem).download.target.path;
							} else {
								//FF37
								path = (new DownloadsViewItemController(selectedItem)).dataItem.file;
							}
						} else {
							dv = document.getElementById("downloadsRichListBox")._placesView;
							let selectedItemsShell = dv._richlistbox.selectedItems[0]._shell;
							if (!(selectedItemsShell._metaData && selectedItemsShell._metaData.filePath)) {
								//FF38
								path = (selectedItemsShell._sessionDownload || selectedItemsShell._historyDownload).target.path;
							} else {
								//FF37
								path = selectedItemsShell._metaData.filePath;
							}
						}

						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						try {
							file.initWithPath(path);
						} catch (e) {
							var fileUrl = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService)
								.getProtocolHandler('file').QueryInterface(Components.interfaces.nsIFileProtocolHandler)
								.getFileFromURLSpec(path).path;
							file.initWithPath(fileUrl);
						}
						if (!file.exists()) {
							if (/\..{0,10}(\.part)$/.test(file.path))
								file.initWithPath(file.path.replace(".part", ""));
							else
								file.initWithPath(file.path + ".part");
						}
						if (file.exists()) {
							file.permissions |= 0666;
							file.remove(0);
						}

						if (typeof DownloadsViewItemController != "undefined" || DownloadsView.itemForElement) {
							let selectedItem = DownloadsView.richListBox.selectedItem;
							if (DownloadsView.itemForElement) {
								DownloadsView.itemForElement(selectedItem).doCommand("cmd_delete");
							}
							else if (DownloadsView.controllerForElement) {
								//FF38
								DownloadsView.controllerForElement(selectedItem).doCommand("cmd_delete");
							} else {
								//FF37
								(new DownloadsViewItemController(selectedItem)).doCommand("cmd_delete");
							}
						} else {
							dv.doCommand("cmd_delete");
						}
					};

					document.querySelector("#downloadsContextMenu").insertBefore(menuitem, rlm.nextSibling);
					removeDownloadfile.removeStatus();
				},

				init: function() {
					document.querySelector("#downloadsContextMenu").addEventListener("popupshowing", this.removeMenu, false);
				}
			};

			removeDownloadfile.init();
		},

		//精確顯示文件大小
		downloadFileSize: function(enable) {
			if (!enable) {
				location == "chrome://browser/content/browser.xul" && (DownloadUtils.convertByteUnits = downloadPlus.Default_DownloadUtils_convertByteUnits);
				return;
			}
			location == "chrome://browser/content/browser.xul" && (DownloadUtils.convertByteUnits =
				function DU_convertByteUnits(aBytes) {
					let unitIndex = 0;
					while ((aBytes >= 999.5) && (unitIndex < 3)) {
						aBytes /= 1024;
						unitIndex++;
					}
					return [(aBytes > 0) && (aBytes < 100) && (unitIndex != 0) ? (aBytes < 10 ? (parseInt(aBytes * 100) / 100).toFixed(2) : (parseInt(aBytes * 10) / 10).toFixed(1)) : parseInt(aBytes), ['bytes', 'KB', 'MB', 'GB'][unitIndex]];
				});
		},

		// 自動關閉下載產生的空白標簽
		autoClose_blankTab: function(enable) {
			if (!enable) {
				location == "chrome://browser/content/browser.xul" && eval("gBrowser.mTabProgressListener=" + downloadPlus.Default_gBrowser_mTabProgressListener);
				return
			};
			eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
				if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
                         			&& aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank" && aStatus == 0) {\
				aWebProgress.DOMWindow.setTimeout(function() {\
				!aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
				}, 100);\
				}\
			'));
		},

		// 保存並打開
		save_And_Open: function(enable) {
			if (!enable) return;
			var saveAndOpen = document.getAnonymousElementByAttribute(document.querySelector("*"), "dlgtype", "extra2");
			saveAndOpen.parentNode.insertBefore(saveAndOpen, document.documentElement.getButton("accept").nextSibling);
			saveAndOpen.setAttribute("hidden", "false");
			saveAndOpen.setAttribute("label", "儲存並開啟");
			saveAndOpen.setAttribute("oncommand", 'Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser").saveAndOpen.urls.push(dialog.mLauncher.source.asciiSpec);document.querySelector("#save").click();document.documentElement.getButton("accept").disabled=0;document.documentElement.getButton("accept").click()')
		},
		//作用於 main 窗口
		saveAndOpen_on_main: function(enable) {
			if (!enable) return;
			Components.utils.import("resource://gre/modules/Downloads.jsm");
			saveAndOpen = {
				urls: [],
				init: function() {
					Downloads.getList(Downloads.ALL).then(list => {
						list.addView({
							onDownloadChanged: function(dl) {
								if (downloadPlus.appVersion < 29) {
									if (dl.progress == 100 && saveAndOpen.urls.indexOf(dl.source.url) > -1) {
										downloadPlus.save_And_Open_RorL == 0 && dl.reveal();
										downloadPlus.save_And_Open_RorL == 1 && dl.launch();
										saveAndOpen.urls[saveAndOpen.urls.indexOf(dl.source.url)] = "";
									}
								} else if (downloadPlus.appVersion >= 29) {
									if (dl.progress == 100 && saveAndOpen.urls.indexOf(dl.source.url) > -1) {
										downloadPlus.save_And_Open_RorL == 0 && (new FileUtils.File(dl.target.path)).reveal();
										downloadPlus.save_And_Open_RorL == 1 && (new FileUtils.File(dl.target.path)).launch();
										saveAndOpen.urls[saveAndOpen.urls.indexOf(dl.source.url)] = "";
									}
								}
							},
							onDownloadAdded: function() {},
							onDownloadRemoved: function() {},
						});
					}).then(null, Cu.reportError);
				}

			}
			saveAndOpen.init();
		},

		// 下載改名
		download_dialog_changeName: function(enable) {
			//注:同時關閉改名和下拉菜單會導致下載文件的文件名不顯示(非要關閉請默認在28行最前面加//來注釋掉該功能)
			if (!enable) return;
			if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
			document.querySelector("#mode").addEventListener("select", function() {
				if (dialog.dialogElement("save").selected) {
					if (!document.querySelector("#locationtext")) {
						if (enable || downloadPlus.download_dialog_changeName_encodingConvert) {
							var orginalString = "";
							if (downloadPlus.download_dialog_changeName_encodingConvert) {
								try {
									orginalString = (opener.localStorage.getItem(dialog.mLauncher.source.spec) ||
										dialog.mLauncher.source.asciiSpec.substring(dialog.mLauncher.source.asciiSpec.lastIndexOf("/"))).replace(/[\/:*?"<>|]/g, "");
									opener.localStorage.removeItem(dialog.mLauncher.source.spec)
								} catch (e) {
									orginalString = dialog.mLauncher.suggestedFileName;
								}
							}
							if (downloadPlus.download_dialog_changeName_encodingConvert)
								var locationtext = document.querySelector("#location").parentNode.insertBefore(document.createElement("menulist"), document.querySelector("#location"));
							else
								var locationtext = document.querySelector("#location").parentNode.insertBefore(document.createElement("textbox"), document.querySelector("#location"));
							locationtext.id = "locationtext";
							if (enable && downloadPlus.download_dialog_changeName_encodingConvert)
								locationtext.setAttribute("editable", "true");
							locationtext.setAttribute("style", "margin-top:-2px;margin-bottom:-3px");
							locationtext.setAttribute("tooltiptext", "Ctrl+點擊轉換url編碼\n左鍵:UNICODE\n右鍵:GB2312");
							locationtext.addEventListener("click", function(e) {
								if (e.ctrlKey) {
									if (e.button == 0)
										this.value = decodeURIComponent(this.value);
									if (e.button == 2) {
										e.preventDefault();
										converter.charset = "GB2312";
										this.value = converter.ConvertToUnicode(unescape(this.value));
									}
								}
							}, false);
							if (enable)
								locationtext.value = dialog.mLauncher.suggestedFileName;
							if (downloadPlus.download_dialog_changeName_encodingConvert) {
								locationtext.addEventListener("command", function(e) {
									if (enable)
										locationtext.value = e.target.value;
									document.title = "Opening " + e.target.value;
								});
								let menupopup = locationtext.appendChild(document.createElement("menupopup"));
								let menuitem = menupopup.appendChild(document.createElement("menuitem"));
								menuitem.value = dialog.mLauncher.suggestedFileName;
								menuitem.label = "Original: " + menuitem.value;
								if (!enable)
									locationtext.value = menuitem.value;
								let converter = Components.classes['@mozilla.org/intl/scriptableunicodeconverter']
									.getService(Components.interfaces.nsIScriptableUnicodeConverter);

								function createMenuitem(encoding) {
										converter.charset = encoding;
										let menuitem = menupopup.appendChild(document.createElement("menuitem"));
										menuitem.value = converter.ConvertToUnicode(orginalString).replace(/^"(.+)"$/, "$1");
										menuitem.label = encoding + ": " + menuitem.value;
									}
									["GB18030", "BIG5", "Shift-JIS"].forEach(function(item) {
										createMenuitem(item)
									});
							}
						}
					}
					document.querySelector("#location").hidden = true;
					document.querySelector("#locationtext").hidden = false;
				} else {
					document.querySelector("#locationtext").hidden = true;
					document.querySelector("#location").hidden = false;
				}
			}, false)
			if (downloadPlus.download_dialog_changeName_locking)
				dialog.dialogElement("save").click();
			else
				dialog.dialogElement("save").selected && dialog.dialogElement("save").click();
			window.addEventListener("dialogaccept", function() {
				if ((document.querySelector("#locationtext").value != dialog.mLauncher.suggestedFileName) && dialog.dialogElement("save").selected) {
					var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
					mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, document.querySelector("#locationtext").value, null, null, null, null, null, null, mainwin.document, Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getBoolPref("browser.download.useDownloadDir"), null);
					document.documentElement.removeAttribute("ondialogaccept");
				}
			}, false);
		},
		//作用於 main 窗口
		download_dialog_changeName_on_main: function(enable) {
			if (!enable) return;
			const obsService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);
			const RESPONSE_TOPIC = 'http-on-examine-response';

			var respObserver = {
				observing: false,
				observe: function(subject, topic, data) {
					try {
						let channel = subject.QueryInterface(Ci.nsIHttpChannel);
						let header = channel.contentDispositionHeader;
						let associatedWindow = channel.notificationCallbacks
							.getInterface(Components.interfaces.nsILoadContext)
							.associatedWindow;
						associatedWindow.localStorage.setItem(channel.URI.spec, header.split("=")[1]);
					} catch (ex) {}
				},
				start: function() {
					if (!this.observing) {
						obsService.addObserver(this, RESPONSE_TOPIC, false);
						this.observing = true;
					}
				},
				stop: function() {
					if (this.observing) {
						obsService.removeObserver(this, RESPONSE_TOPIC, false);
						this.observing = false;
					}
				}
			};

			respObserver.start();
			addEventListener("beforeunload", function() {
				respObserver.stop();
			})
		},


		// 另存為...
		download_dialog_saveas: function(enable) {
			if (!enable) return;
			var saveas = document.documentElement.getButton("extra1");
			saveas.setAttribute("hidden", "false");
			saveas.setAttribute("label", "另存新檔");
			saveas.addEventListener("command", function() {
				var url = dialog.mLauncher.source.asciiSpec;
				var fileName = dialog.mLauncher.suggestedFileName;

				// 一些網站並不能直接用這種方式下載，
				// 故使用一個排除列表，以正則表達式的方式排除這類下載鏈接
				// 感謝反饋者 duh2008
				// http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1844079&pid=35867304
				var excludeList = [
					/http[s]?:\/\/wallpaperswide\.com\/download\/.*/i
				];
				if (excludeList.some(function(item) {
					return item.test(url);
				})) {
					var [file, path] = Download.promptForFile(fileName);
					if (path && typeof path === "string") {
						// Download.download(url, path);
						dialog.mLauncher.saveToDisk(file, 1);
						dialog.onCancel = function() {};
						return close();
					} else {
						return;
					}
				}

				var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
				mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")
				(url, null, 
					(document.querySelector("#locationtext") ? 
						document.querySelector("#locationtext").value : 
						fileName), 
					null, null, null, null, null, null, mainwin.document, 0, null);
				close();
			}, false);
		},

		// 保存到...
		download_dialog_saveTo: function(enable) {
			//目錄路徑的反斜槓\要雙寫\\
			//第一次使用要修改路徑，否則無法下載
			//如果使用Firefox3.6 + userChromeJS v1.2,則路徑中的漢字要轉義為\u6C49\u5B57編碼類型,否則會出現亂碼
			if (!enable) return;
			var cssStr = (function() {
				/*
				        button[label="\4FDD\5B58\5230"] .dropmarker-icon{
				                display:none;
				        }
				        button[label="\4FDD\5B58\5230"]::after{
				                content:"";
				                display:-moz-box;
				                width:8px;
				                height:19px;
				                margin-left:-20px;
				                -moz-appearance: menulist-button;
				        }
				        button[label="\4FDD\5B58\5230"][disabled]::after{
				                opacity:.3;
				        }
				        */
			}).toString().replace(/^.+\s|.+$/g, "");
			var style = document.createProcessingInstruction("xml-stylesheet", "type=\"text/css\"" + " href=\"data:text/css;base64," + btoa(cssStr) + "\"");
			document.insertBefore(style, document.firstChild);
			var dir = [
				["C:\\Users\\Administrator\\Downloads\\壓縮", "壓縮"],
				["F:\\軟件相關", "軟件"],
				["C:\\Users\\Administrator\\Downloads\\文檔", "文檔"],
				["C:\\Users\\Administrator\\Downloads\\音樂", "歌曲"],
				["C:\\Users\\Administrator\\Downloads\\其他", "其他"]
			];
			var saveTo = document.documentElement._buttons.cancel.parentNode.insertBefore(document.createElement("button"), document.documentElement._buttons.cancel);
			var saveToMenu = saveTo.appendChild(document.createElement("menupopup"));
			saveTo.classList.toggle("dialog-button");
			saveTo.label = "儲存至";
			saveTo.type = "menu";
			dir.forEach(function(dir) {
				var [name, dir] = [dir[1], dir[0]];
				var item = saveToMenu.appendChild(document.createElement("menuitem"));
				item.setAttribute("label", (name || (dir.match(/[^\\/]+$/) || [dir])[0]));
				item.setAttribute("image", "moz-icon:file:///" + dir + "\\");
				item.setAttribute("class", "menuitem-iconic");
				item.onclick = function() {
					var filename = (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value.trim() : document.querySelector("#location").value);
					var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
					file.initWithPath(dir + "\\" + filename);
					if (downloadPlus.download_dialog_saveTo_suffix == 0)
						while (file.exists()) {
							let index = filename.match(/\((\d+)\)(?:\.[^\.]+)?$/);
							if (index && index[1]) {
								filename = filename.replace(/\d+(?=\)(?:\.[^\.]+)?$)/, parseInt(index[1]) + 1);
							} else {
								filename = filename.replace(/(?=(\.[^\.]+)?$)/, "(1)");
							}
							file.initWithPath(dir + "\\" + filename);
						} else
					if (file.exists()) file.createUnique(0, 0644);
					dialog.mLauncher.saveToDisk(file, 1);
					dialog.onCancel = function() {};
					close();
				};
			})
		},

		// 下載彈出窗口雙擊鏈接復制完整鏈接
		download_dialog_showCompleteURL: function(enable) {
			if (!enable) return;
			var s = document.querySelector("#source");
			s.value = dialog.mLauncher.source.spec;
			s.setAttribute("crop", "center");
			s.setAttribute("tooltiptext", dialog.mLauncher.source.spec);
			s.setAttribute("ondblclick", 'Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(dialog.mLauncher.source.spec)');
		},

		// 下載彈出窗口雙擊文件項執行下載
		download_dialog_doubleclicksaveL: function(enable) {
			if (!enable) return;
			addEventListener("dblclick", function(event) {
				downloadPlus.download_dialog_doubleclickanyW && document.documentElement.getButton("accept").click();
				event.target.nodeName === "radio" && document.documentElement.getButton("accept").click();
			}, false);
		},

		download_speed: function(enable) {
			if (!enable) {
				if (downloadPlus.appVersion >= 38) {
					eval("DownloadsViewItem.prototype._updateProgress = " +
						downloadPlus.Default_DownloadsViewItem_prototype_update);
				} else if (downloadPlus.appVersion < 38) {
					eval("DownloadsViewItem.prototype._updateStatusLine = " +
						downloadPlus.Default_DownloadsViewItem_prototype_update);
				}
				return;
			}
			if (downloadPlus.appVersion >= 38) {
				eval("DownloadsViewItem.prototype._updateProgress = " +
					DownloadsViewItem.prototype._updateProgress.toString().replace('status.text', 'status.tip'));
			} else if (downloadPlus.appVersion < 38) {
				eval("DownloadsViewItem.prototype._updateStatusLine = " +
					DownloadsViewItem.prototype._updateStatusLine.toString().replace('[statusTip', '[status'));
			}
		},

		download_checksum: function(enable) {
			if (!enable) {
				this.checksum && this.checksum.uninit();
				return;
			}
			var checksum = this.checksum ? this.checksum : this.checksum = {
				_cache: [],
				init: function() {
					document.querySelector("#downloadsContextMenu").addEventListener("popupshowing", this.checksumMenu, false);
				},

				uninit: function() {
					document.querySelector("#downloadsContextMenu").removeEventListener("popupshowing", this.checksumMenu, false);
					if ($("checksumMenu")) {
                                $("checksumMenu").parentNode.removeChild($("checksumMenu"));
                              }
				},

				checksumState: function() {
					var CKMtn = document.querySelector("#checksumMenu"),
						listbox = document.querySelector("#downloadsListBox") || document.querySelector("#downloadsRichListBox"),
						state = listbox.selectedItems[0].getAttribute('state');
					CKMtn.setAttribute("disabled", "true");
					if (state != "0" && state != "3" && state != "4" && state != "5") CKMtn.removeAttribute("disabled");
				},

				checksumMenu: function() {
					try {checksum.checksumState();} catch (e) {};
					if (document.querySelector("#checksumMenu")) return;
					var menuitem = document.createElement("menuitem"),
						rlm = document.querySelector('.downloadRemoveFromHistoryMenuItem');
					menuitem.setAttribute("label", "Hash 計算");
					menuitem.setAttribute("id", "checksumMenu");
					menuitem.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAvklEQVQokcWRMQoCMRBF9wKCgsew2MJum1QLO8n8TOFBLDyGhQex0HsIil5DRPQAY5ElZCVg2MYHaR7/Q/hTVQnGmDkg6hzuJT5CRMsQkFOJjzjnVoAos9+X+Ii1vAkBbH96QHTMG19MYeYbINq2dlHikxH8CxBtmmZS4vsB7Kxf7lHiI0RUh1v5c4n/46pE2AGi1vJ6+NW8jzDjAIh2HctwHH/M+aTIF0CUiOqv4jXnkwCegKgxZpp65/DO+Q8nU9so94nUGAAAAABJRU5ErkJggg==");
					menuitem.onclick = function(e) {
						if (e.target.disabled) {
							return;
						}
						var path = "";
						if (typeof DownloadsViewItemController != "undefined" || DownloadsView.itemForElement) {
							let selectedItem = DownloadsView.richListBox.selectedItem;
							if (DownloadsView.itemForElement) {
								path = DownloadsView.itemForElement(selectedItem).download.target.path;
							}
							else if (DownloadsView.controllerForElement) {
								//FF38
								path = DownloadsView.controllerForElement(selectedItem).download.target.path;
							} else {
								//FF37
								path = (new DownloadsViewItemController(selectedItem)).dataItem.file;
							}
						} else {
							dv = document.getElementById("downloadsRichListBox")._placesView;
							let selectedItemsShell = dv._richlistbox.selectedItems[0]._shell;
							if (!(selectedItemsShell._metaData && selectedItemsShell._metaData.filePath)) {
								//FF38
								path = (selectedItemsShell._sessionDownload || selectedItemsShell._historyDownload).target.path;
							} else {
								//FF37
								path = selectedItemsShell._metaData.filePath;
							}
						}

						var algorithmList = ["MD5", "SHA1"];
						var tempResult = {};

						function checkPre(file) {
							if (algorithmList.length > 0) {
								var stream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
								stream.init(file, 0x01, 0444, 0);
								var algorithm = algorithmList.shift();
								tempResult[algorithm] = check(stream, algorithm);
								setTimeout(function() { checkPre(file); }, 100);
							}
							else {
								var tempText = [];
								for (var i in tempResult) {
									tempText.push(i + "：" + tempResult[i]);
								}
								var text = tempText.join("\n");
								var result = {
									text: text,
									result: tempResult,
									path: path,
									file: file,
									fileSize: file.fileSize
								};
								store(result)
								prompts(text);
							}
						}

						function check(stream, algorithm) {
							var ch = Cc['@mozilla.org/security/hash;1'].createInstance(Ci.nsICryptoHash);
							ch.init(ch[algorithm]);

							const PR_UINT32_MAX = 0xffffffff;
							ch.updateFromStream(stream, PR_UINT32_MAX);

							var hash = ch.finish(false);

							function toHexString(charCode) {
								return ('0' + charCode.toString(16)).slice(-2);
							}
							var s = [for (i of hash) toHexString(i.charCodeAt(0))].join('');
							return s;
						}

						function store(result) {
							var cache = checksum._cache;
							if (cache.indexOf(result) < 0) {
								cache.push(result);
							}
						}

						function filter(path, file) {
							return checksum._cache.find(function(item) {
								if (item.path === path && item.fileSize === file.fileSize && item.file.equals(file)) {
									return item;
								}
							});
						}

						function prompts(str){
						 	var prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
							var flags = prompts.BUTTON_POS_0 *
										prompts.BUTTON_TITLE_OK + prompts.BUTTON_POS_1*
										prompts.BUTTON_TITLE_CANCEL + prompts.BUTTON_POS_2 *
										prompts.BUTTON_TITLE_IS_STRING;
							var button = prompts.confirmEx(null, "Hash 計算", str, flags, "", "", "復制", null, {value: false});
							if (button == 2) {
								copy(str);
							}
						 }

						function copy(str) {
							Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(str);
							XULBrowserWindow.statusTextField.label = "Copy: " + str;
						}

						var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
						file.initWithPath(path);
						if (!file.exists()) {
							var str = 
							["出錯了，檢查文件是否刪除",
							"文件地址：" + path].join("\n");
						 	prompts(str);
						 	return;
						}
						else {
							var item = filter(path, file);
							if (item) {
								prompts(item.text);
							}
							else {
								checkPre(file);
							}
						}
					};

					document.querySelector("#downloadsContextMenu").insertBefore(menuitem, rlm.nextSibling);
					checksum.checksumState();
				},
			};
			checksum.init();
		},
		downloadsPanelOnOpen: {
			callbacks: [],
			add: function(fn) {
				if (typeof fn === "function") {
					this.callbacks.push(fn);
				}
				return this;
			},
			run: function() {
				this.callbacks.forEach(function(item) {
					item();
				});
				this.uninit();
			},
			init: function() {
				try {
					eval("DownloadsPanel.showPanel =" + DownloadsPanel.showPanel.toString()
						.replace(/(?:this|DownloadsPanel)\.\_openPopupIfDataReady\(\)/, "{$&;downloadPlus.downloadsPanelOnOpen.run();}"));
				} catch (e) {
					//Components.utils.reportError(e);
				}
			},
			uninit: function() {
				try {
					eval("DownloadsPanel.showPanel =" + DownloadsPanel.showPanel.toString()
						.replace("downloadPlus.downloadsPanelOnOpen.run();", ""));
				} catch (e) {
					//Components.utils.reportError(e);
				}
				this.callbacks = [];
				this.add = function(fn) {
					if (typeof fn === "function") {
						fn();
					}
				}
			}
		},
		dontRemoveFinishedDownloads: function(enable) {
			var {DownloadIntegration} = Cu.import("resource://gre/modules/DownloadIntegration.jsm", {});
			var store = DownloadIntegration._store;
			if (!enable) {
				if ("_shouldPersistDownloadFix" in DownloadIntegration) {
					DownloadIntegration.shouldPersistDownload = DownloadIntegration._shouldPersistDownloadFix;
					delete DownloadIntegration._shouldPersistDownloadFix;
				}
				if (store && "_shouldPersistDownloadFix" in store) {
					store.onsaveitem = store._onsaveitemFix;
					delete store._onsaveitemFix;
					store.save();
				}
				return;
			}
			var self = this;
			DownloadIntegration._shouldPersistDownloadFix = DownloadIntegration.shouldPersistDownload;
			var wrapped = DownloadIntegration.shouldPersistDownload = function(download) {
				if (download.hasPartialData || !download.succeeded) {
					return true;
				}
				var MaxRetentionHours = self.getPrefs(1, "download_dontRemoveFinishedDownloads_MaxRetentionHours");
				var MinStoreThreshold = self.getPrefs(1, "download_dontRemoveFinishedDownloads_MinStoreThreshold");
				var downloads = DownloadIntegration._store.list._downloads;
				if (MinStoreThreshold <= downloads.length) {
					return true;
				}
				// var leaveTime = downloads[Math.max(0, dlCount - 1 - minStore)].startTime;
				var older = Date.now() - MaxRetentionHours*60*60*1000;
				return download.startTime > older;
			};
			if (store) {
				store._onsaveitemFix = store.onsaveitem;
				store.onsaveitem = wrapped;
			}
		},
	};

	function $(id, doc) {
		doc = doc || document;
		return doc.getElementById(id);
	}

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	var Download = (function() {
		Cu.import('resource://gre/modules/Downloads.jsm');
		var exports = {};
		exports.download = function(source, target, callback) {
			var LIST;
			Downloads.getList(Downloads.ALL).then(function(list) {
				LIST= list
				return Downloads.createDownload({
					source: source,
					target: target,
				});
			})
			.catch(Cu.reportError)
			.then(function(download) {
				LIST.add(download);
				return download.start();
			})
			.catch(Cu.reportError)
			.then(function onSuccess() {
				if (typeof callback === "function") {
					callback()
				}
			}, function onFailure() {
				if (typeof callback === "function") {
					callback()
				}
			})
			.catch(Cu.reportError);

		};
		exports.promptForFile = function(defaultString) {
			const nsIFilePicker = Ci.nsIFilePicker;
			var fp = Cc["@mozilla.org/filepicker;1"]
				.createInstance(nsIFilePicker);
			fp.init(window, "請輸入要保存的文件名...", nsIFilePicker.modeSave);
			fp.defaultString = defaultString;
			fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterImages);
			var rv = fp.show();
			if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
				var file = fp.file;
				var path = fp.file.path;
			}
			return [file, path];
		}

		return exports;
	})();

	downloadPlus.init();
	window.downloadPlus = downloadPlus;
})();

/*顯示下載速度*/
(function(){
   eval("DownloadsViewItem.prototype._updateProgress = " +
      DownloadsViewItem.prototype._updateProgress.toString().replace('status.text', 'status.tip'));
})()