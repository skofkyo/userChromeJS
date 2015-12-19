// ==UserScript==
// @name UserAgentChangeModLite.uc.js
// @namespace http://www.sephiroth-j.de/mozilla/
// @charset     utf-8
// @note  modify by lastdream2013 at 20130616 mino fix
// @note  modify by lastdream2013 at 20130409 sitelist : change SITELIST idx to Name
// @note  modify by lastdream2013 for navigator.userAgent https://g.mozest.com/thread-43428-1-2
// @include chrome://browser/content/browser.xul
// ==/UserScript==
var ucjs_UAChanger = {

	//現有版本firefox的圖標
	NOW_UA_IMG: "data:image/png;base64,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",
	//其他版本firefox的圖標
	EXT_FX_LIST_IMG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADgElEQVQ4jX2Te0wUdADHf3cEyEtAJCBkDqWZBWpAirIaA7kGIpOI44CTp2EQ8qrAbNSBxFJAOx/DFlM0HoEzKGVgQJTEIw3iDjjkcXV40IaMDbEk5+DTf23h1ufvz/e/70eIVfiH59nI3lYroksbK7NruzuOt2jbSnomzipLGsKjolRmq/3/4CcvkHsqK/S5Aw/4aQWmgHuAbgVO62ZJOlU/+O5HF4KfGi435X6Yk5hWaeZ9FJmqh+pzZXT1tdH99wo9D5/Q9uAJ52eWiK+5Q03jCVo/e+f6/ZFmZyGEEBNnQsyNca7G3mh72jL86FR4cSNpJ+o5aHoMzYvLlP++SPIP0wSqtdR8XYqxV8Gt08o+o7HBQow0n3fWpzotGKIsmIy0YizSknb5ZprVudS1NnBqbpnimSUyRv9E1jSH4vgZHk9EY2iRMWsoe0Ms1Cfk6Q+YMBRswa8yKzSRttx9azPTn4RSUFJKXO9fxLTPEXLtD7aV/IxbzAUGroWB/nXmh+I/FrMn9/SM7DVlUGaNJtyWsSQX5k/uIr68EZ+L0wRVG/BWdbLpUC2OMVUEpxRx92ooy0MBTF4M7hDGD7w02r3mDEXYcUtmy5eea4mOzWRrwfc8X6LBvbCfDUl1OIWUYr67GGVWOugCeNT3Cleyfe+LcYXL8ECQNcMKB77ZbsZ3L0tJOJyPfWorL6Z/xYFjlXhmX8UuoAjptnySU6Ogz5uFZnf6Pt8xInqV/pVdPqZoFY4MhlkysU/KSIIDHZne6DI3oj+6icO5x5B4F2DqkUhnuSfLLW7MV1gxV/1qhbiTlxze6CqhK9CO0SRH7qXY0h26lvLtLmT7+uC6IwPhVYRwzWX3nn08rHJk8QtbJo9I0Xyavl9cUqnW1G/dMFS1XsrtcAd0h5wwZDlTG/sS/r4KbJzD2Lh+CzkBHgwWurOgtmcy5xlq5FvQ3azwFEIIMXZOHaQ2N1m+7GbG7bB1DB90xJDuyG9p9vQn2DKcbM1M+hpm8y2ZKV7HeL5gqi2tAiEk/965KTY6vtRUsnTpWSk/vmaDVm7P6EE7JhPXMhFvgz7FhqksK/TvWTHbFFGoUqmkTzXREBu287KHU88VB0HLCxJ+CTRDt1/CuFzCWKIJNxTOj7Rn38/73yIboqJMrseFvHkzYpe6PfC5b/sTfOt6j/iVaU7IUjorlR6r/X8ACyEFfsUfVDgAAAAASUVORK5CYII=",

	UANameIdxHash: [],

	// ----- 下面設置開始 -----
	// defautl: ステータスバーの右端に表示する
	TARGET: null,
	// 定義一個target，用來調整狀態欄順序,null為空
	ADD_OTHER_FX: true,
	// true:自動添加其他版本firefox的ua  false:不添加
	//2種版本firefox，下面請勿修改
	EXT_FX_LIST: [{
		name: "Firefox4.0",
		ua: "Mozilla/5.0 (Windows; Windows NT 6.1; rv:2.0b2) Gecko/20100720 Firefox/4.0b2",
		label: "Fx4.0",
		img: ""
	}, {
		name: "Firefox3.6",
		ua: "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8",
		label: "Fx3.6",
		img: ""
	}, ],
	// ----------------------
	// UA リストのインデックス
	def_idx: 0,
	Current_idx: 0,

	// 初期化
	init: function() {
		this.reload();
		this.mkData(); // UA データ(UA_LIST)を作る
		this.type = 2;							// 0:按鈕 2:工具菜單
		if (this.type == 0) {
		btn = document.getElementById("urlbar-icons").appendChild(document.createElement("toolbarbutton"));
		btn.setAttribute('class', 'toolbarbutton-1');
		btn.setAttribute("id", "ucjs_UserAgentChanger");
		btn.setAttribute('type', 'menu');
		btn.setAttribute("tooltiptext", "UserAgentChange");
		btn.setAttribute("image", this.UA_LIST[this.def_idx].img);
		} else if (this.type == 2) {
		var menu = document.createElement("menu");
		menu.setAttribute("id", "ucjs_UserAgentChanger");
		menu.setAttribute('class', 'menu-iconic');
		menu.setAttribute("label", "UserAgentChange");
		menu.setAttribute("image", this.UA_LIST[this.def_idx].img);
		var insPos = document.getElementById('devToolsSeparator');
		insPos.parentNode.insertBefore(menu, insPos);
		}
		this.mkPanel(); // パネルとメニューを作る
		this.setSiteIdx();
		// Observer 登錄
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		os.addObserver(this, "http-on-modify-request", false);
		os.addObserver(this.onDocumentCreated, "content-document-global-created", false);
		// イベント登錄
		var contentArea = document.getElementById("appcontent");
		contentArea.addEventListener("load", this, true);
		contentArea.addEventListener("select", this, false);
		var contentBrowser = this.getContentBrowser();
		contentBrowser.tabContainer.addEventListener("TabClose", this, false);
		window.addEventListener("unload", this, false);
	},
	reload: function(isAlert) {
		var data = this.importUserAgentChange();
		if (!data) return this.alert('Load Error: 配置文件不存在');
		var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
		try {
			Cu.evalInSandbox(data, sandbox, "1.8");
		} catch (e) {
			this.alert('Error: ' + e + '\n請重新檢查配置文件');
			return;
		}
		this.DISPLAY_TYPE = sandbox.DISPLAY_TYPE
		this.SITE_LIST = sandbox.SITE_LIST
		this.UA_LIST = sandbox.UA_LIST;
		try{
			document.getElementById("ucjs_UserAgentChanger").removeChild(document.getElementById("uac_popup"));
			this.mkData();
			this.mkPanel();
			
		}catch(e){}
		if (isAlert) this.alert('配置已經重新載入');
	},
	alert: function(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "UserAgentChanger", aString, false, "", null);
	},

	userAgentChangeFile: function() {
		var aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
		aFile.appendRelativePath("Local");
		aFile.appendRelativePath("_userAgentChange.js");
		if (!aFile.exists() || !aFile.isFile()) return null;
		delete this.file;
		return this.file = aFile;
	},

	importUserAgentChange: function() {
		var file = this.userAgentChangeFile();
		var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
		var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
		fstream.init(file, -1, 0, 0);
		sstream.init(fstream);
		var data = sstream.read(sstream.available());
		try {
			data = decodeURIComponent(escape(data));
		} catch (e) {}
		sstream.close();
		fstream.close();
		return data;
	},

	edit: function() {
		var aFile = this.userAgentChangeFile();
		if (!aFile || !aFile.exists() || !aFile.isFile()) return;
		var editor;
		try {
			editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
		} catch (e) {
			this.alert("請設置編輯器的路徑。\nview_source.editor.path");
			toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
			return;
		}
		var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
		var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);

		try {
			var path = UI.ConvertFromUnicode(aFile.path);
			var args = [path];
			process.init(editor);
			process.run(false, args, args.length);
		} catch (e) {
			this.alert("編輯器不正確！")
		}
	},


	onDocumentCreated: function(aSubject, aTopic, aData) {
		var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
		if (aChannel instanceof Ci.nsIHttpChannel) {
			var navigator = aSubject.navigator;
			var userAgent = aChannel.getRequestHeader("User-Agent");
			if (navigator.userAgent != userAgent) Object.defineProperty(XPCNativeWrapper.unwrap(navigator), "userAgent", {
				value: userAgent,
				enumerable: true
			});
		}
	},

	// UA データを作る
	mkData: function() {
		var ver = this.getVer(); // 現在使っている Firefox のバージョン
		// 現在使っている Firefox のデータを作る
		var tmp = [];
		tmp.name = "Firefox" + ver;
		tmp.ua = "";
		tmp.img = this.NOW_UA_IMG;
		tmp.label = "Fx" + (this.ADD_OTHER_FX ? ver : "");
		this.UA_LIST.unshift(tmp);
		// Fx のバージョンを見て UA を追加する
		if (this.ADD_OTHER_FX) {
			if (ver == 3.6) { // Fx3.6 の場合 Fx4 を追加する
				this.EXT_FX_LIST[0].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[0]);
			} else { // Fx3.6 以外では Fx3.6 を追加する
				this.EXT_FX_LIST[1].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[1]);
			}
		}
		// 起動時の UA を 初期化 (general.useragent.override の值が有るかチェック 07/03/02)
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (preferencesService.getPrefType("general.useragent.override") != 0) {
			for (var i = 0; i < this.UA_LIST.length; i++) {
				if (preferencesService.getCharPref("general.useragent.override") == this.UA_LIST[i].ua) {
					this.def_idx = i;
					break;
				}
			}
		}
	},
	// UA パネルを作る
	mkPanel: function() {
		// UA パネルのコンテクストメニューを作る
		var PopupMenu = document.createElement("menupopup");
		PopupMenu.setAttribute("id", "uac_popup");
		for (var i = 0; i < this.UA_LIST.length; i++) {
			if (this.UA_LIST[i].name == "分隔線") {
				var mi = document.createElement("menuseparator");
				PopupMenu.appendChild(mi);
			} else {
				var mi = document.createElement("menuitem");

				mi.setAttribute('label', this.UA_LIST[i].name);
				mi.setAttribute('tooltiptext', this.UA_LIST[i].ua);
				mi.setAttribute('oncommand', "ucjs_UAChanger.setUA(" + i + ");");

				if (this.DISPLAY_TYPE) {
					mi.setAttribute('class', 'menuitem-iconic');
					mi.setAttribute('image', this.UA_LIST[i].img);
				} else {
					mi.setAttribute("type", "radio");
					mi.setAttribute("checked", i == this.def_idx);
				}
				if (i == this.def_idx) {
					mi.setAttribute("style", 'font-weight: bold;');
					mi.style.color = 'red';
				} else {
					mi.setAttribute("style", 'font-weight: normal;');
					mi.style.color = 'black';
				}
				mi.setAttribute("uac-generated", true);
				PopupMenu.appendChild(mi);
			}
		}
		// パネルの變更を可能にする
		var mi = document.createElement("menuseparator");
		PopupMenu.appendChild(mi);
		var mi = document.createElement("menuitem");
		mi.setAttribute('id', 'ucjs_UAChangerConfig');
		mi.setAttribute('label', '重載/編輯UA配置');
		mi.setAttribute('image', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACmElEQVQ4y61TXUhTYRiWqItAJIKoi6KuAukioosgb7srizb/qv1ZOzvbdO78bZ3t/Oxszv25mnNzWhliZZYJIkm1C6OkIpGKogjMCAlK6qpEmJq+vcdyDknqog8evo/vfZ/n/d6fr6jof63jp4hSrd6SOnG64aHRxr6vrXN9xf0L3o2ibf1fBQBgS3OyI8PKURDCrSBF0+D2x0EJJ4bRtk6jMx+oMJDvNDpC+0eBCj1pqef9oMTbIdhyaQlu/znIdF4JIbHYZOemGCkMJCMuanVEzarnm3cQlDcnRtIo0AHepiRIkdSM46wf+gaGDhtJ+hDJCHNiJAVCqBUIp2caOVvzAjpLQ0R9ukp2KXG41jdwe+LDZLC2npsZeTK6HVPYNfrsRZrzRXK+5nZQfU8SjlhewEqJ40IoBSKiKd72Cgn7ESXZ4ZF23Df8rtG2RNvl+55gElRfGy1NrAgwQs4XywDni0LX1ZvhgsLuLEy1+/otmsU6qL5WVp7LG0hGnpPxkhZDEE1kDGt1KhhLVjmFEMi/BObzBtob+KQWDnMEi5O/UEgqrzTsWz6bHa4eVo4tFZnyBD6vKMdbh1gpCp5gC1go7+zRalNZvr06Yqy82rj7WE2t1sqIC6oPhyKNsWQ2L/D85WtNHSfl+MB5UIX0Fmq2vMqkRaESPUnPY9umrKy46FKal4LYOfnH8INHhsIpLL7RP9iDhkXaGwLSyX97/HTsYI3JxtVzCriVGPA4VGoAhzsA6YtdWeRsXj3Ke/oH7/Q6XNLHN2/HgzSv7DWRzLRadS9G9TQmgBEj0Nndexd9y9b6D6WIM4hNRpKi7IwwaWfFnI2Rwc5KCzZa+E44XPeOVBo2/svnUofJjOARPoSEYBGa5eFS1085Y5JNBegPyAAAAABJRU5ErkJggg==');
		mi.setAttribute("tooltiptext", '左鍵重載；右鍵編輯');
		mi.setAttribute('oncommand', 'event.preventDefault(); ucjs_UAChanger.reload(true);');
		mi.setAttribute('onclick', 'if (event.button == 2) {event.preventDefault(); closeMenus(event.currentTarget); ucjs_UAChanger.edit(); }');
		PopupMenu.appendChild(mi);
		var menu = document.getElementById("ucjs_UserAgentChanger");
		menu.addEventListener("popupshowing", this, false);
		menu.appendChild(PopupMenu);

	},
	// URL 指定で User-Agent の書き換え(UserAgentSwitcher.uc.js より)
	observe: function(subject, topic, data) {
		if (topic != "http-on-modify-request") return;
		var http = subject.QueryInterface(Ci.nsIHttpChannel);
		for (var i = 0; i < this.SITE_LIST.length; i++) {
			if (http.URI && (new RegExp(this.SITE_LIST[i].url)).test(http.URI.spec)) {
				var idx = this.SITE_LIST[i].idx;
				http.setRequestHeader("User-Agent", this.UA_LIST[idx].ua, false);
			}
		}
	},
	// イベント・ハンドラ
	handleEvent: function(aEvent) {
		var contentBrowser = this.getContentBrowser();
		var menu = document.getElementById("ucjs_UserAgentChanger");
		var uacMenu = document.getElementById("uac_popup");
		switch (aEvent.type) {
		case "popupshowing":
			// コンテクスト・メニュー・ポップアップ時にチェック・マークを更新する
			var menu = aEvent.target;
			for (var i = 0; i < menu.childNodes.length; i++) {
				if (i == ucjs_UAChanger.Current_idx) {
					menu.childNodes[i].setAttribute("style", 'font-weight: bold;');
					menu.childNodes[i].style.color = 'red';
					if (!this.DISPLAY_TYPE) menu.childNodes[i].setAttribute("checked", true);
				} else {
					menu.childNodes[i].setAttribute("style", 'font-weight: normal;');
					menu.childNodes[i].style.color = 'black';
				}
			}
			break;
		case "load":
			// SITE_LIST に登錄された URL の場合
		case "select":
		case "TabClose":
			for (var i = 0; i < ucjs_UAChanger.SITE_LIST.length; i++) {
				if ((new RegExp(this.SITE_LIST[i].url)).test(contentBrowser.currentURI.spec)) {
					var idx = this.SITE_LIST[i].idx;
					this.setImage(idx);
					return;
				}
			}
			this.setImage(this.def_idx);

			break;
		case "unload":
			// 終了處理
			var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
			os.removeObserver(this, "http-on-modify-request");
			os.removeObserver(this.onDocumentCreated, "content-document-global-created");
			var contentArea = document.getElementById("appcontent");
			contentArea.removeEventListener("load", this, true);
			contentArea.removeEventListener("select", this, false);
			if (contentBrowser) contentBrowser.tabContainer.removeEventListener("TabClose", this, false);
			uacMenu.removeEventListener("popupshowing", this, false);
			window.removeEventListener("unload", this, false);
			break;
		}
	},
	// 番號を指定して UA を設定
	setUA: function(i) {
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (i == 0) { // オリジナル UA にする場合
			// 既にオリジナル UA の場合は何もしない
			if (preferencesService.getPrefType("general.useragent.override") == 0) return;
			preferencesService.clearUserPref("general.useragent.override");
		} else { // 指定した UA にする場合
			preferencesService.setCharPref("general.useragent.override", this.UA_LIST[i].ua);
		}
		this.def_idx = i;
		this.setImage(i);
		gBrowser.mCurrentBrowser.reload();
	},
	// UA パネル畫像とツールチップを設定
	setImage: function(i) {
		var menu = document.getElementById("ucjs_UserAgentChanger");

		menu.setAttribute("image", this.UA_LIST[i].img);
		//menu.style.padding = "0px 2px";

		this.Current_idx = i;
	},
	// アプリケーションのバージョンを取得する(Alice0775 氏のスクリプトから頂きました。)
	getVer: function() {
		var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
		var ver = parseInt(info.version.substr(0, 3) * 10, 10) / 10;
		return ver;
	},
	setSiteIdx: function() {
		for (let i = 0; i < this.UA_LIST.length; i++) {
			this.UANameIdxHash[this.UA_LIST[i].name] = i;
		}
		for (let j = 0; j < this.SITE_LIST.length; j++) {
			var uaName = this.SITE_LIST[j].Name;
			if (this.UANameIdxHash[uaName]) {
				this.SITE_LIST[j].idx = this.UANameIdxHash[uaName];

			} else {
				this.SITE_LIST[j].idx = this.def_idx;

			}
		}
	},
	// 現在のブラウザオブジェクトを得る。
	getContentBrowser: function() {
		var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
		var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
		if (topWindowOfType) return topWindowOfType.document.getElementById("content");
		return null;
	}
}
ucjs_UAChanger.init();