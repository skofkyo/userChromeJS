// ==UserScript==
// @name			AnotherButton
// @description		可移動的按鈕菜單
// @author	        feiruo
// @charset       	UTF-8
// @include			main
// @id              [A26C02CA]
// @inspect         window.anoBtn
// @startup         window.anoBtn.init();
// @shutdown        window.anoBtn.onDestroy();
// @config 			window.anoBtn.EditFile(anoBtn.File);
// @reviewURL		http://bbs.kafan.cn/thread-1657589-1-1.html
// @homepageURL		https://github.com/feiruo/userChromeJS/tree/master/anoBtn
// @downloadURL		https://github.com/feiruo/userChromeJS/raw/master/anoBtn/anoBtn.uc.js
// @note			支持菜單和腳本設置重載
// @note			需要 _anoBtn.js 配置文件
// @version			1.4.0 	2016.03.30 	15:30	修改機制，遍歷文件支持參數，開放生成函數AnoBtn_BuildPopup，方法[PopupBuild = new AnoBtn_BuildPopup('PopupID');PopupBuild.Build(Menus)]。
// @version			1.3.9 	2016.03.24 	17:30	Fix clone & load。
// @version			1.3.8 	2016.03.24 	14:30	Fix Urlbar-icons & popup。
// @version			1.3.7 	2015.11.05 	12:00	修復枚舉目錄不存在導致的錯誤，修正原菜單移動方式,修正編輯。
// @version			1.3.6 	2015.11.05 	12:00	增加目錄枚舉，菜單參數與自由性與addmenu一樣，僅限制位置於本菜單。
// @version			1.3.5 	2015.04.25 	10:00	為可移動菜單。
// @version			1.3.4 	2015.03.27 	09:00	調整代碼。
// @version			1.3.3 	2015.02.18 	22:00	調整代碼。
// @version			1.3.2 	2015.02.13 	23:00	Fix exec。
// @version			1.3.1 	2014.09.18 	19:00	Fix Path indexof '\\' or '//'。
// @version			1.3.0 	2014.08.12 	19:00	支持多級菜單，不限制菜單級數。
// @version			1.2.1
// @version			1.2 	修復按鈕移動之後重載殘留問題，增加菜單彈出位置選擇。
// @version			1.1 	解決編輯器中文路徑問題，修改菜單，提示等文字。
// @version			1.0
// ==/UserScript==
(function(CSS) {
    let {
        classes: Cc,
        interfaces: Ci,
        utils: Cu,
        results: Cr
    } = Components;
    if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");

    if (window.anoBtn) {
        window.anoBtn.onDestroy();
        delete window.anoBtn;
    }

    var anoBtn = {
        editor: 1, //UC腳本編輯器設置
        //editor: 'D:\\Software\\TeraPad\\TeraPad.exe',//UC腳本編輯器設置
        removeExt: true, //腳本名稱不顯示 uc.js/uc.xul
        anoBtn: true, //強制啟用AnotherButton腳本true/false 避免意外關閉
        get File() {
            let aFile;
            aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
            aFile.appendRelativePath("Local");
            aFile.appendRelativePath("_anoBtnNew.js");
            delete this.File;
            return this.File = aFile;
        },
        get FocusedWindow() {
            return gContextMenu && gContextMenu.target ? gContextMenu.target.ownerDocument.defaultView : (content ? content : gBrowser.selectedBrowser.contentWindowAsCPOW);
        },

        init: function() {
            var ins = $("menu_ToolsPopup").firstChild;
            ins.parentNode.insertBefore($C("menuitem", {
                id: "anoBtn_set",
                label: "AnotherButton",
                tooltiptext: "左鍵：重載配置\n右鍵：編輯配置",
                class: "menuitem-iconic",
                onclick: "anoBtn.BtnClick(event);",
            }), ins);
            this.ToRegExp();
            this.Rebuild();
            setTimeout(function() {
                anoBtn.Rebuild();
            }, 1000); //again for webDeveloperMenu
            this.style = addStyle(CSS);
            this.addPrefListener(anoBtn.readLaterPrefListener);
            window.addEventListener("unload", function() {
                anoBtn.onDestroy();
                anoBtn.removePrefListener(anoBtn.readLaterPrefListener);
            }, false);
            if (this.anoBtn) window.addEventListener('DOMWindowClose', anoBtn.anobtntrue, false);
        },

        ToRegExp: function() {
            let he = "(?:_HTML(?:IFIED)?|_ENCODE)?";
            let rTITLE = "%TITLE" + he + "%|%t\\b";
            let rTITLES = "%TITLES" + he + "%|%t\\b";
            let rURL = "%(?:R?LINK_OR_)?URL" + he + "%|%u\\b";
            let rHOST = "%HOST" + he + "%|%h\\b";
            let rIP = "%IP" + he + "%";
            let rBASEDOMAIN = "%BASEDOMAIN" + he + "%";
            let rSEL = "%SEL" + he + "%|%s\\b";
            let rLINK = "%R?LINK(?:_TEXT|_HOST)?" + he + "%|%l\\b";
            let rIMAGE = "%IMAGE(?:_URL|_ALT|_TITLE)" + he + "%|%i\\b";
            let rIMAGE_BASE64 = "%IMAGE_BASE64" + he + "%|%i\\b";
            let rMEDIA = "%MEDIA_URL" + he + "%|%m\\b";
            let rCLIPBOARD = "%CLIPBOARD" + he + "%|%p\\b";
            let rFAVICON = "%FAVICON" + he + "%";
            let rEMAIL = "%EMAIL" + he + "%";
            let rExt = "%EOL" + he + "%";

            let rFAVICON_BASE64 = "%FAVICON_BASE64" + he + "%";
            let rRLT_OR_UT = "%RLT_OR_UT" + he + "%"; // 鏈接文本或網頁標題

            this.rTITLE = new RegExp(rTITLE, "i");
            this.rTITLES = new RegExp(rTITLES, "i");
            this.rURL = new RegExp(rURL, "i");
            this.rIP = new RegExp(rIP, "i");
            this.rHOST = new RegExp(rHOST, "i");
            this.rBASEDOMAIN = new RegExp(rBASEDOMAIN, "i");
            this.rSEL = new RegExp(rSEL, "i");
            this.rLINK = new RegExp(rLINK, "i");
            this.rIMAGE = new RegExp(rIMAGE, "i");
            this.rMEDIA = new RegExp(rMEDIA, "i");
            this.rCLIPBOARD = new RegExp(rCLIPBOARD, "i");
            this.rFAVICON = new RegExp(rFAVICON, "i");
            this.rEMAIL = new RegExp(rEMAIL, "i");
            this.rExt = new RegExp(rExt, "i");
            this.rFAVICON_BASE64 = new RegExp(rFAVICON_BASE64, "i");
            this.rIMAGE_BASE64 = new RegExp(rIMAGE_BASE64, "i");
            this.rRLT_OR_UT = new RegExp(rRLT_OR_UT, "i");

            this.regexp = new RegExp([rTITLE, rTITLES, rURL, rHOST, rBASEDOMAIN, rIP, rSEL, rLINK, rIMAGE, rIMAGE_BASE64, rMEDIA, rCLIPBOARD, rFAVICON, rFAVICON_BASE64, rEMAIL, rExt, rRLT_OR_UT].join("|"), "ig");
        },

        onDestroy: function() {
            this.RebuildBtn();
            this.RebuildPopup();
            if ($("anoBtn_set"))
                $("anoBtn_set").parentNode.removeChild($("anoBtn_set"));
            Services.obs.notifyObservers(null, "startupcache-invalidate", "");
        },

        BtnClick: function(event) {
            if (event.target != event.currentTarget) return;
            event.stopPropagation();
            event.preventDefault();
            switch (event.target.id) {
                case 'anoBtn_set':
                    switch (event.button) {
                        case 0:
                            anoBtn.Rebuild(true);
                            break;
                        case 1:
                            break;
                        case 2:
                            anoBtn.EditFile();
                            break;
                    }
                    break;
                case 'anoBtn_Icon':
                    // $("anoBtn_Popup").openPopup(event.target);
                    //$("anoBtn_Popup").showPopup();
                    switch (event.button) {
                        case 0:
                            $("anoBtn_Popup").showPopup();
                            break;
                        case 1:
                            anoBtn.open(0);
                            break;
                        case 2:
                            Services.appinfo.invalidateCachesOnRestart();
                            ('BrowserUtils' in window) ? BrowserUtils.restartApplication(): Application.restart();
                            break;
                    }
                    break;
            }
            return;
        },

        Rebuild: function(isAlert) {
            var MenuDate = this.LoadFile(this.File);
            !!this.BuildPopup && this.BuildPopup.Remove();
            if (!MenuDate) return;
            this.anomenu = MenuDate.anomenu;
            this.anobtnset = MenuDate.anobtnset;
            this.RebuildBtn(true);
            this.RebuildPopup(true);
            if (isAlert) alert('配置已經重新載入');
        },

        /*****************************************************************************************/
        RebuildBtn: function(isAlert) {
            var icon = $("anoBtn_Icon");
            if (icon) icon.parentNode.removeChild(icon);
            delete icon;
            if (!isAlert) return;
            var iconInTag = this.anobtnset.intags ? this.anobtnset.intags : "tabbrowser-tabs";
            var iconImage = this.anobtnset.image ? this.anobtnset.image : "chrome://branding/content/icon16.png";
            var intags = $(iconInTag);
            var orientation = this.anobtnset.orientation ? this.anobtnset.orientation : 'before';

            if ($('anoBtn_set')) $('anoBtn_set').setAttribute('image', iconImage);

            var IconType = this.IconSstatusBarPanel ? 'statusbarpanel' : 'image';
            this.icon = $C('toolbarbutton', {
                id: 'anoBtn_Icon',
                class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                popup: 'anoBtn_Popup',
                //context: 'anoBtn_Popup',
                tooltiptext: '左鍵：AnotherButton選單\n中鍵：打開Chrome資料夾\n右鍵：重新啟動(清除緩存)',
                type: 'menu',
                removable: true,
                overflows: false,
                image: iconImage,
                src: iconImage,
                onclick: "anoBtn.BtnClick(event);",
            });

            if (this.anobtnset.Icon_Pos === 0) {
                ToolbarManager.addWidget(window, this.icon, true);
            } else if (this.anobtnset.Icon_Pos === 1) {
                $('urlbar-icons').appendChild(this.icon);
            } else if (this.anobtnset.Icon_Pos === 2) {
                if (orientation == 'before')
                    intags.parentNode.insertBefore(this.icon, intags);
                else if (orientation == 'after') {
                    var parentEl = intags.parentNode;
                    if (parentEl.lastChild == intags) {
                        parentEl.appendChild(this.icon);
                    } else {
                        parentEl.insertBefore(this.icon, intags.nextSibling);
                    }
                }
            }

            if (this.anobtnset.IconSstatusBarPanel)
                this.icon.classList.add('class', 'statusbarpanel-iconic');

            return true;
        },

        RebuildPopup: function(isAlert) {
            if (!this.anomenu) return;
            var Popup = $("anoBtn_Popup");
            if (Popup) Popup.parentNode.removeChild(Popup);
            this.Popup = null;
            !!this.BuildPopup && this.BuildPopup.Remove();
            delete this.BuildPopup;
            delete Popup;
            if (!isAlert) return;
            if (!this.BuildPopup) {
                this.BuildPopup = new AnoBtn_BuildPopup('anoBtn', $C("menupopup", {
                    id: "anoBtn_Popup",
                    position: this.anobtnset.position,
                    onpopupshowing: "anoBtn.PopupShowing(event);"
                }));
            }
            this.BuildPopup.Build(this.anomenu);
            this.icon.appendChild(this.BuildPopup.Popup);
        },

        PopupShowing: function(event) {
            var mp = event.target;
            if (mp !== event.currentTarget) {
                return;
            }
            var nodes = mp.querySelectorAll('.AnoBtnUc.menu-iconic');
            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].parentNode.removeChild(nodes[i]);
            }
            var sep = document.createElement('menuseparator');
            sep.setAttribute('class', 'AnoBtnUc menu-iconic');
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
                menu.setAttribute('tooltiptext', '右鍵：打開資料夾');
                menu.setAttribute('class', 'AnoBtnUc menu-iconic');
                menu.setAttribute('onclick', 'anoBtn.menuClick(event);');
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
                    mi.setAttribute('oncommand', 'anoBtn.chgScriptStat(script.filename);');
                    mi.setAttribute('onclick', 'if (event.button !== 0) { event.preventDefault(); event.stopPropagation(); anoBtn.clickScriptMenu(event); }');
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
        menuClick: function(event) {
            switch (event.button) {
                case 2:
                    var menu, label, rlabel, fdir;
                    menu = event.target;
                    label = menu.getAttribute("label");
                    if (label == "chrome/") {
                        rlabel = label.replace("chrome/", "chrome");
                    } else {
                        rlabel = label.replace("\/", "\\");
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    fdir = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\" + rlabel;
                    anoBtn.Exec(fdir);
                    break;
            }
        },
        edit: function(key, pathArray) {
            var vieweditor = Services.prefs.getCharPref("view_source.editor.path");
            var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
            UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "BIG5" : "UTF-8";
            var path = UI.ConvertFromUnicode(this.getPath(key, pathArray));
            if (this.editor === 1) {
                if (!vieweditor) {
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
        open: function(key, pathArray, arg) {
            var path = this.getPath(key, pathArray);
            this.launch(path, arg);
        },
        launch: function(path, arg) {
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
        getLocalFile: function(path) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            return file;
        },
        getDir: function(key, pathArray) {
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
        getPath: function(key, pathArray) {
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
        clickScriptMenu: function(event) {
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
        chgScriptStat: function(afilename) {
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
        restoreState: function(arr) {
            var disable = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                disable[arr[i]] = true;
            }
            return disable;
        },
        getPref: function(prefName) {
            return Preferences.get(prefName);
        },
        setPref: function(prefName, value) {
            Preferences.set(prefName, value);
        },
        addPrefListener: function(aObserver) {
            Services.prefs.addObserver(aObserver.domain, aObserver, false);
        },
        removePrefListener: function(aObserver) {
            Services.prefs.removeObserver(aObserver.domain, aObserver);
        },
        readLaterPrefListener: {
            domain: 'userChrome.disable',
            observe: function(aSubject, aTopic, aPrefstring) {
                if (aTopic === 'nsPref:changed') {
                    setTimeout(() => {
                        var s = anoBtn.getPref('userChrome.disable.script');
                        userChrome_js.scriptDisable = anoBtn.restoreState(s.split(','));
                    }, 0);
                }
            }
        },
        anobtntrue: function(event) {
            var duc = Services.prefs.getCharPref("userChrome.disable.script").replace(/AnotherButtonNewForUcManage\.uc\.js\,/g, "")
            Services.prefs.setCharPref("userChrome.disable.script", duc);
        },
        onCommand: function(event) {
            if (event.target != event.currentTarget) return;
            var menuitem = event.target;
            var text = menuitem.getAttribute("text") || "";
            var keyword = menuitem.getAttribute("keyword") || "";
            var url = menuitem.getAttribute("url") || "";
            var where = menuitem.getAttribute("where") || "";
            var exec = menuitem.getAttribute("exec") || "";
            var Post = menuitem.getAttribute("Post") || "";
            var Action = menuitem.getAttribute("Action") || "";

            if (Post)
                return this.PostData(this.ConvertText(url), this.ConvertText(Post));

            if (keyword) {
                let param = (text ? (text = this.ConvertText(text)) : "");
                let engine = Services.search.getEngineByAlias(keyword);
                if (engine) {
                    let submission = engine.getSubmission(param);
                    this.OpenCommand(event, submission.uri.spec, where);
                } else {
                    PlacesUtils.keywords.fetch(keyword || '').then(entry => {
                        if (!entry) return;
                        let newurl = entry.url.href.replace('%s', encodeURIComponent(param));
                        this.OpenCommand(event, newurl, where);
                    });
                }
            } else if (url)
                this.OpenCommand(event, this.ConvertText(url), where || "tab");
            else if (exec)
                this.Exec(exec, this.ConvertText(text));
            else if (text)
                this.Copy(this.ConvertText(text));
            else if (Action)
                this.OpenAction(Action);
        },

        OpenAction: function(url, fId, val, bId, bClass) {
            var wrap = {
                try: function(js) {
                    return "try{" + js + "}catch(e){}";
                },
                delay: function(js) {
                    return wrap.try("content.window.setTimeout(function(){" + wrap.try(js) + "},100);");
                },
                doOnLoad: function(js) {
                    return wrap.try("let onLoad = function(){" +
                        "removeEventListener('load',onLoad,true);" +
                        wrap.try(js) +
                        "};" +
                        "addEventListener('load',onLoad,true);");
                },
                quotes: function(str) {
                    return "\"" + str + "\"";
                },
                getElement: function(id) {
                    const selector = "form #" + id;
                    return "content.window.document.querySelector(" + wrap.quotes(selector) + ")";
                },
                getElementC: function(id) {
                    const selector = "form ." + id;
                    return "content.window.document.querySelector(" + wrap.quotes(selector) + ")";
                }
            };

            function openURL(url) {
                var browser = window.getBrowser();
                try {
                    window.TreeStyleTabService.readyToOpenChildTab(browser.selectedTab);
                } catch (e) {}
                var newTab = browser.addTab(url, {
                    ownerTab: browser.selectedTab,
                    relatedToCurrent: true
                });
                browser.selectedTab = newTab;
                return browser.getBrowserForTab(newTab);
            }

            var contentScript = wrap.getElement(fId) + ".value = " + wrap.quotes(this.ConvertText(val)) + ";";
            if (bId)
                contentScript += wrap.delay(wrap.getElement(bId) + ".click();")
            else if (bClass)
                contentScript += wrap.delay(wrap.getElementC(bClass) + ".click();")
            contentScript = "data:text/javascript," + encodeURIComponent(wrap.doOnLoad(contentScript));

            var targetBrowser = openURL(url);
            targetBrowser.messageManager.loadFrameScript(contentScript, false);
        },

        OpenCommand: function(event, url, where, postData) {
            var uri;
            try {
                uri = Services.io.newURI(url, null, null);
            } catch (e) {
                return console.log("URL 不正確: " + url);
            }
            if (uri.scheme === "javascript")
                loadURI(url);
            else if (where)
                openUILinkIn(uri.spec, where, false, postData || null);
            else if (event.button == 1)
                openNewTabWith(uri.spec);
            else
                openUILink(uri.spec, event);
        },

        Exec: function(path, arg) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            try {
                var a;
                if (typeof arg == 'string' || arg instanceof String) {
                    a = arg.split(/\s+/)
                } else if (Array.isArray(arg)) {
                    a = arg;
                } else {
                    a = [arg];
                }

                file.initWithPath(path);
                if (!file.exists()) {
                    Cu.reportError('File Not Found: ' + path);
                    return;
                }

                if (file.isExecutable()) {
                    process.init(file);
                    process.runw(false, a, a.length);
                } else {
                    file.launch();
                }
            } catch (e) {
                console.log(e);
            }
        },

        PostData: function(aURI, aPostData) {
            var stringStream = Cc["@mozilla.org/io/string-input-stream;1"].createInstance(Ci.nsIStringInputStream);
            if ("data" in stringStream)
                stringStream.data = aPostData;
            else
                stringStream.setData(aPostData, aPostData.length);

            var PostData = Cc["@mozilla.org/network/mime-input-stream;1"].createInstance(Ci.nsIMIMEInputStream);
            PostData.addHeader("Content-Type", "application/x-www-form-urlencoded");
            PostData.addContentLength = true;
            PostData.setData(stringStream);

            gBrowser.loadOneTab(aURI, null, null, PostData, false);
        },

        ConvertText: function(text) {
            text = text.toLocaleLowerCase();
            if (text.indexOf('\\') === 0) {
                text = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + text;
                return text;
            }
            var that = this;
            var context = gContextMenu || {
                link: {
                    href: "",
                    host: ""
                },
                target: {
                    alt: "",
                    title: ""
                },
                __noSuchMethod__: function(id, args)
                "",
            };
            var tab = document.popupNode && document.popupNode.localName == "tab" ? document.popupNode : null;
            var win = tab ? tab.linkedBrowser.contentWindow : this.FocusedWindow;

            function convert(str) {
                switch (str) {
                    case "%T":
                        return win.document.title;
                    case "%TITLE%":
                        return win.document.title;
                    case "%TITLES%":
                        return win.document.title.replace(/\s-\s.*/i, "").replace(/_[^\[\]【】]+$/, "");
                    case "%U":
                        return win.location.href;
                    case "%URL%":
                        return win.location.href;
                    case "%H":
                        return win.location.host;
                    case "%HOST%":
                        return win.location.host;
                    case "%S":
                        return that.getSelection(win) || "";
                    case "%SEL%":
                        return that.getSelection(win) || "";
                    case "%L":
                        return context.linkURL || "";
                    case "%RLINK%":
                        return context.linkURL || "";
                    case "%RLINK_HOST%":
                        return context.link.host || "";
                    case "%RLINK_TEXT%":
                        return context.linkText() || "";
                    case "%RLINK_OR_URL%":
                        return context.linkURL || win.location.href;
                    case "%RLT_OR_UT%":
                        return context.onLink && context.linkText() || win.document.title; // 鏈接文本或網頁標題
                    case "%IMAGE_ALT%":
                        return context.target.alt || "";
                    case "%IMAGE_TITLE%":
                        return context.target.title || "";
                    case "%I":
                        return context.imageURL || "";
                    case "%IMAGE_URL%":
                        return context.imageURL || "";
                    case "%IMAGE_BASE64%":
                        return img2base64(context.imageURL);
                    case "%M":
                        return context.mediaURL || "";
                    case "%MEDIA_URL%":
                        return context.mediaURL || "";
                    case "%P":
                        return readFromClipboard() || "";
                    case "%CLIPBOARD%":
                        return readFromClipboard() || "";
                    case "%FAVICON%":
                        return gBrowser.getIcon(tab ? tab : null) || "";
                    case "%FAVICON_BASE64%":
                        return img2base64(gBrowser.getIcon(tab ? tab : null));
                    case "%EMAIL%":
                        return getEmailAddress() || "";
                    case "%IP%":
                        return FeiRuoNet_InfoCaches && FeiRuoNet_InfoCaches.DNS[gBrowser.selectedBrowser.currentURI.host];
                    case "%BASEDOMAIN%":
                        var eTLDService = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService);
                        return eTLDService.getBaseDomain(makeURI(gBrowser.selectedBrowser.currentURI.spec));
                    case "%EOL%":
                        return "\r\n";
                    case "%EOL%":
                        return "\r\n";
                }
                return str;
            }

            function htmlEscape(s) {
                return (s + "").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
            };

            function getEmailAddress() {
                var url = context.linkURL;
                if (!url || !/^mailto:([^?]+).*/i.test(url)) return "";
                var addresses = RegExp.$1;
                try {
                    var characterSet = context.target.ownerDocument.characterSet;
                    const textToSubURI = Cc['@mozilla.org/intl/texttosuburi;1'].getService(Ci.nsITextToSubURI);
                    addresses = textToSubURI.unEscapeURIForUI(characterSet, addresses);
                } catch (ex) {}
                return addresses;
            }

            function img2base64(imgsrc) {
                if (typeof imgsrc == 'undefined') return "";

                const NSURI = "http://www.w3.org/1999/xhtml";
                var img = new Image();
                var that = this;
                var canvas,
                    isCompleted = false;
                img.onload = function() {
                    var width = this.naturalWidth,
                        height = this.naturalHeight;
                    canvas = document.createElementNS(NSURI, "canvas");
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0);
                    isCompleted = true;
                };
                img.onerror = function() {
                    Components.utils.reportError("Count not load: " + imgsrc);
                    isCompleted = true;
                };
                img.src = imgsrc;

                var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
                while (!isCompleted) {
                    thread.processNextEvent(true);
                }

                var data = canvas ? canvas.toDataURL("image/png") : "";
                canvas = null;
                return data;
            }

            return text.replace(this.regexp, function(str) {
                str = str.toUpperCase().replace("%LINK", "%RLINK");
                if (str.indexOf("_HTMLIFIED") >= 0)
                    return htmlEscape(convert(str.replace("_HTMLIFIED", "")));
                if (str.indexOf("_HTML") >= 0)
                    return htmlEscape(convert(str.replace("_HTML", "")));
                if (str.indexOf("_ENCODE") >= 0)
                    return encodeURIComponent(convert(str.replace("_ENCODE", "")));
                return convert(str);
            });
        },

        handleRelativePath: function(path) {
            if (path) {
                //path = path.replace(/\//g, '\\').toLocaleLowerCase();
                path = path.replace(/\//g, '\\');
                var profD = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get("ProfD", Ci.nsILocalFile);
                if (/^(\\)/.test(path)) {
                    if (path.startsWith('\\..\\')) {
                        return profD.parent.path + path.replace('\\..', '');
                    }
                    return profD.path + path;
                } else {
                    return path;
                }
            }
        },

        getSelection: function(win) {
            win || (win = this.FocusedWindow);
            var selection = this.getRangeAll(win).join(" ");
            if (!selection) {
                let element = document.commandDispatcher.focusedElement;
                let isOnTextInput = function(elem) {
                    return elem instanceof HTMLTextAreaElement ||
                        (elem instanceof HTMLInputElement && elem.mozIsTextField(true));
                };

                if (isOnTextInput(element)) {
                    selection = element.QueryInterface(Ci.nsIDOMNSEditableElement)
                        .editor.selection.toString();
                }
            }

            if (selection) {
                selection = selection.replace(/^\s+/, "")
                    .replace(/\s+$/, "")
                    .replace(/\s+/g, " ");
            }
            return selection;
        },

        getRangeAll: function(win) {
            win || (win = this.FocusedWindow);
            var sel = win.getSelection();
            var res = [];
            for (var i = 0; i < sel.rangeCount; i++) {
                res.push(sel.getRangeAt(i));
            };
            return res;
        },

        /*****************************************************************************************/
        EditFile: function(aFile) {

            // if (!aFile || !aFile.exists() || !aFile.isFile()) return;

            // var editor;
            // try {
            // 	editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
            // } catch (e) {}

            // if (!editor || !editor.exists()) {
            // 	if (useScraptchpad) {
            // 		this.openScriptInScratchpad(window, aFile);
            // 		return;
            // 	} else {
            // 		alert("請先設置編輯器的路徑!!!");
            // 		var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
            // 		fp.init(window, "設置全局腳本編輯器", fp.modeOpen);
            // 		fp.appendFilter("執行文件", "*.exe");
            // 		if (fp.show() == fp.returnCancel || !fp.file)
            // 			return;
            // 		else {
            // 			editor = fp.file;
            // 			Services.prefs.setCharPref("view_source.editor.path", editor.path);
            // 		}
            // 	}
            // }

            // // 調用自帶的
            // var aURL = userChrome.getURLSpecFromFile(aFile);

            // var aDocument = null;
            // var aCallBack = null;
            // var aPageDescriptor = null;

            // if (/aLineNumber/.test(gViewSourceUtils.openInExternalEditor.toSource()))
            // 	gViewSourceUtils.openInExternalEditor(aURL, aPageDescriptor, aDocument, aLineNumber, aCallBack);
            // else
            // 	gViewSourceUtils.openInExternalEditor(aURL, aPageDescriptor, aDocument, aCallBack);

            if (!aFile)
                aFile = this.File;
            else if (typeof(aFile) == "string") {
                if (/^file:\/\//.test(aFile))
                    aFile = aFile.QueryInterface(Components.interfaces.nsIFileURL).file;
                else {
                    var File = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                    aFile = File.initWithPath(aFile);
                }
            } else return;

            if (!aFile || !aFile.exists() || !aFile.isFile())
                return alert("文件不存在:\n" + aFile.path);

            var editor;
            try {
                editor = gPrefService.getCharPref("view_source.editor.path");
            } catch (e) {
                log("編輯器路徑讀取錯誤  >>  " + e);
                alert("請先設置編輯器的路徑!!!\nview_source.editor.path");
                toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
            }

            if (!editor) {
                this.OpenScriptInScratchpad(window, aFile);
                alert("請先設置編輯器的路徑!!!\nview_source.editor.path");
                return;
            }

            var UI = Cc['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Ci.nsIScriptableUnicodeConverter);
            var platform = window.navigator.platform.toLowerCase();
            if (platform.indexOf('win') > -1)
                UI.charset = 'GB2312';
            else
                UI.charset = 'UTF-8';
            // UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);

            try {
                var path = UI.ConvertFromUnicode(aFile.path);
                // process.init(editor);
                // process.run(false, [path], [path].length);
                var appfile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                appfile.initWithPath(editor);
                process.init(appfile);
                process.run(false, [path], 1, {});
            } catch (e) {
                alert("編輯器不正確！")
                this.OpenScriptInScratchpad(window, aFile);
            }
        },

        Copy: function(str) {
            if (!str) str = this.icon.tooltipText;
            Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(str);
            XULBrowserWindow.statusTextField.label = "已複製: " + str;
        },

        OpenScriptInScratchpad: function(parentWindow, file) {
            let spWin = (parentWindow.Scratchpad || Services.wm.getMostRecentWindow("navigator:browser").Scratchpad).openScratchpad();

            spWin.addEventListener("load", function spWinLoaded() {
                spWin.removeEventListener("load", spWinLoaded, false);

                let Scratchpad = spWin.Scratchpad;
                Scratchpad.setFilename(file.path);
                Scratchpad.addObserver({
                    onReady: function() {
                        Scratchpad.removeObserver(this);
                        Scratchpad.importFromFile.call(Scratchpad, file);
                    }
                });
            }, false);
        },

        LoadFile: function(aFile, isAlert) {
            if (!aFile || !aFile.exists() || !aFile.isFile())
                return null;
            var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
            var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
            fstream.init(aFile, -1, 0, 0);
            sstream.init(fstream);
            var data = sstream.read(sstream.available());
            try {
                data = decodeURIComponent(escape(data));
            } catch (e) {}
            sstream.close();
            fstream.close();
            if (!data) {
                var errmsg = "Rebuild Error:【" + aFile.leafName + "】文件不存在";
                console.log(errmsg);
                if (isAlert)
                    alert(errmsg);
                return null;
            }
            var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
            sandbox.Components = Components;
            sandbox.Cc = Cc;
            sandbox.Ci = Ci;
            sandbox.Cr = Cr;
            sandbox.Cu = Cu;
            sandbox.Services = Services;
            sandbox.locale = Services.prefs.getCharPref("general.useragent.locale");
            try {
                var lineFinder = new Error();
                Cu.evalInSandbox(data, sandbox, "1.8");
            } catch (e) {
                let line = e.lineNumber - lineFinder.lineNumber - 1;
                var errmsg = 'Error: ' + e + "\n請重新檢查【" + aFile.leafName + "】文件第 " + line + " 行";
                console.log(errmsg);
                if (isAlert)
                    alert(errmsg);
            }
            return sandbox || null;
        },
    };

    function AnoBtn_BuildPopup(ID, Popup) {
        this.ID = ID;
        if (typeof Popup == 'string')
            Popup = document.getElementById(Popup);
        Popup = Popup || document.getElementById(ID) || document.getElementById(ID + '_Popup');
        if (!Popup || !Popup.tagName || Popup.tagName != "menupopup") {
            Popup = document.createElement("menupopup");
            Popup.setAttribute('id', thins.ID + '_Popup')
        }
        this.Popup = Popup;
        this.Remove();
    }
    AnoBtn_BuildPopup.prototype = {
        ID: null,
        Popup: null,
        isReady: false,
        Remove: function() {
            Array.prototype.slice.call((this.Popup || document).querySelectorAll("." + this.ID + "_MenuNote")).forEach(item => {
                $("main-menubar").appendChild(item);
                item.classList.remove(this.ID + '_CustomMenu');
            });
            Array.prototype.slice.call((this.Popup).querySelectorAll("." + this.ID + "_CustomMenu")).forEach(item => {
                item.parentNode.removeChild(item);
            });
        },
        Build: function(Menus) {
            if (!Menus) return this.Remove();
            for (let [, obj] in Iterator(Menus)) {
                if (!obj) continue;
                this.Popup.appendChild(this.CreateMenuitem(obj));
            }
            this.isReady = true;
            return this.Popup;
        },
        CreateMenuitem: function(obj, i) {
            if (obj.MapFolder)
                return this.CreateMenu(this.EnumerateFolder(obj));
            let menuitem;
            if (obj.id && (menuitem = $(obj.id))) {
                let dupMenuitem;
                let isDupMenu = (obj.clone != false);
                if (isDupMenu)
                    dupMenuitem = menuitem.cloneNode(true);
                else
                    dupMenuitem = menuitem;
                for (let [key, val] in Iterator(obj)) {
                    if (typeof val == "function")
                        obj[key] = val = "(" + val.toSource() + ").call(this, event);";
                    dupMenuitem.setAttribute(key, val);
                }
                let type = dupMenuitem.nodeName,
                    cls = dupMenuitem.classList;
                if ((type == 'menuitem' || type == 'menu') && !cls.contains(type + '-iconic')) cls.add(type + '-iconic');
                if (!cls.contains(this.ID + '_CustomMenu')) cls.add(this.ID + '_CustomMenu');
                if (!isDupMenu && !cls.contains(this.ID + '_MenuNote')) cls.add(this.ID + '_MenuNote');
                return dupMenuitem;
            }
            if (obj.child)
                return this.CreateMenu(obj);
            if (obj.label === "separator" || (!obj.label && !obj.image && !obj.text && !obj.keyword && !obj.url && !obj.oncommand && !obj.command)) {
                menuitem = document.createElement("menuseparator");
            } else if (obj.oncommand || obj.command) {
                let org = obj.command ? document.getElementById(obj.command) : null;
                if (org && org.localName === "menuseparator") {
                    menuitem = document.createElement("menuseparator");
                } else {
                    menuitem = document.createElement("menuitem");
                    if (obj.command)
                        menuitem.setAttribute("command", obj.command);
                    if (!obj.label)
                        obj.label = obj.command || obj.oncommand;
                }
            } else {
                menuitem = document.createElement("menuitem");
                if (!obj.label)
                    obj.label = obj.exec || obj.keyword || obj.url || obj.text || "NoName";

                if (obj.keyword && !obj.text) {
                    let index = obj.keyword.search(/\s+/);
                    if (index > 0) {
                        obj.text = obj.keyword.substr(index).trim();
                        obj.keyword = obj.keyword.substr(0, index);
                    }
                }

                if (obj.where && /\b(tab|tabshifted|window|current)\b/i.test(obj.where))
                    obj.where = RegExp.$1.toLowerCase();

                if (obj.where && !("acceltext" in obj))
                    obj.acceltext = obj.where;

                if (obj.exec)
                    obj.exec = this.handleRelativePath(obj.exec);
            }
            for (let [key, val] in Iterator(obj)) {
                if (key === "command" || key === "MapFolder" || key === "Filter" || key === "Sort" || key === "ExcludeDir") continue;
                if (typeof val == "function")
                    obj[key] = val = "(" + val.toSource() + ").call(this, event);";
                menuitem.setAttribute(key, val);
            }
            var cls = menuitem.classList;
            cls.add(this.ID + "_CustomMenu");
            let type = menuitem.nodeName;
            if ((type == 'menuitem' || type == 'menu') && (!cls.contains(type + '-iconic')))
                cls.add(type + '-iconic');

            if (menuitem.localName == "menuseparator")
                return menuitem;

            if (!obj.onclick)
                menuitem.setAttribute("onclick", "checkForMiddleClick(this, event)");

            if (obj.oncommand || obj.command)
                return menuitem;
            menuitem.setAttribute("oncommand", "anoBtn.onCommand(event);");
            this.SetMenusIcon(menuitem, obj);
            return menuitem;
        },
        CreateMenu: function(menuObj, i) {
            var menu = document.createElement("menu");
            var Popup = menu.appendChild(document.createElement("menupopup"));
            if (menuObj.MapFolder)
                menuObj = this.EnumerateFolder(menuObj);

            for (let [key, val] in Iterator(menuObj)) {
                if (key === "child" || key === "MapFolder" || key === "Sort" || key === "Filter" || key === "Exclude" || key === "Directories" || key === "FilterDirs" || key === "ExcludeDirs") continue;
                if (key === 'onshowing') {
                    this.customShowings.push({
                        item: menu,
                        fnSource: menuObj.onshowing.toSource()
                    });
                    delete menuObj.onshowing;
                    continue;
                }
                if (typeof val == "function")
                    menuObj[key] = val = "(" + val.toSource() + ").call(this, event);"
                menu.setAttribute(key, val);
            }

            let cls = menu.classList;
            cls.add(this.ID + "_CustomMenu");
            cls.add("menu-iconic");

            menuObj.child && menuObj.child.forEach(function(obj) {
                Popup.appendChild(this.CreateMenuitem(obj));
            }, this);

            if (!menu.hasAttribute('label')) {
                let firstItem = menu.querySelector('menuitem');
                if (firstItem) {
                    let command = firstItem.getAttribute('command');
                    if (command)
                        firstItem = document.getElementById(command) || firstItem;
                    ['label', 'accesskey', 'image', 'icon'].forEach(function(n) {
                        if (!menu.hasAttribute(n) && firstItem.hasAttribute(n))
                            menu.setAttribute(n, firstItem.getAttribute(n));
                    }, this);
                    menu.setAttribute('onclick', "if (event.target != event.currentTarget) return;var firstItem = event.currentTarget.querySelector('menuitem');if (!firstItem) return;if (event.button === 1) {checkForMiddleClick(firstItem, event);} else {firstItem.doCommand();closeMenus(event.currentTarget);}");
                }
            }
            return menu;
        },
        EnumerateFolder: function(obj) {
            obj || (obj = {});
            var path = this.handleRelativePath(obj.MapFolder);
            var dir = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
            dir.initWithPath(path);
            if (!dir.exists() || !dir.isDirectory())
                return obj;
            var Entries = dir.directoryEntries;
            var ExcludeDirs = obj.ExcludeDirs ? ((typeof obj.ExcludeDirs == "string") ? (new RegExp(obj.ExcludeDirs)) : obj.ExcludeDirs) : null;
            var FilterDirs = obj.FilterDirs ? ((typeof obj.FilterDirs == "string") ? (new RegExp(obj.FilterDirs)) : obj.FilterDirs) : null;
            obj.child || (obj.child = []);
            if (obj.child.length > 0 && obj.child[obj.child.length - 1].label != "separator") {
                obj.child.push({
                    label: 'separator',
                });
            }
            while (Entries.hasMoreElements()) {
                var Entry = Entries.getNext();
                Entry.QueryInterface(Components.interfaces.nsIFile);
                if (Entry.isDirectory() && (typeof obj.Directories === 'number') && (obj.Directories > 0)) {
                    if (ExcludeDirs && ExcludeDirs.test(Entry.leafName)) continue;
                    if (FilterDirs && !FilterDirs.test(Entry.leafName)) continue;
                    obj.child.push(this.EnumerateFolder({
                        label: Entry.leafName,
                        MapFolder: Entry.path,
                        exec: Entry.path,
                        Directories: obj.Directories - 1,
                        Filter: obj.Filter,
                        Exclude: obj.Exclude,
                        ExeText: obj.ExeText,
                        FilterDirs: obj.FilterDirs,
                        ExcludeDirs: obj.ExcludeDirs,
                        onclick: "anoBtn.onCommand(event);",
                        Sort: 0,
                        image: "moz-icon://" + Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(Entry) + "?size=16",
                    }))
                    continue;
                }
                if (!Entry.isFile()) continue;
                var Exclude = obj.Exclude ? ((typeof obj.Exclude == "string") ? (new RegExp(obj.Exclude)) : obj.Exclude) : null;
                var Filter = obj.Filter ? ((typeof obj.Filter == "string") ? (new RegExp(obj.Filter)) : obj.Filter) : null;
                if (Exclude && Exclude.test(Entry.leafName)) continue;
                if (Filter && !Filter.test(Entry.leafName)) continue;
                var child = {
                    label: Entry.leafName.substr(0, Entry.leafName.lastIndexOf(".")),
                    exec: Entry.path,
                    Sort: 1,
                    tooltiptext: Entry.path,
                };
                var text;
                if (typeof obj.ExeText == 'object') {
                    var Program = obj.ExeText.Program ? ((typeof obj.ExeText.Program == "string") ? (new RegExp(obj.ExeText.Program)) : obj.ExeText.Program) : null;
                    if (Program.test(Entry.leafName)) {
                        text = obj.ExeText.text.replace(/%DIR%/i, dir.leafName).replace(/%EXE%/i, obj.label)
                    }

                }
                if (!!text) child.text = text;
                obj.child.push(child);
            }
            if (obj && obj.child && obj.child[obj.child.length - 1] && obj.child[obj.child.length - 1].label == "separator")
                delete obj.child[obj.child.length - 1];
            obj.MapFolder = false;
            obj.child.sort(function(a, b) {
                return a.Sort - b.Sort;
            });
            return obj;
        },
        handleRelativePath: function(path) {
            if (path) {
                //path = path.replace(/\//g, '\\').toLocaleLowerCase();
                path = path.replace(/\//g, '\\');
                var profD = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get("ProfD", Ci.nsILocalFile);
                if (/^(\\)/.test(path)) {
                    if (path.startsWith('\\..\\')) {
                        return profD.parent.path + path.replace('\\..', '');
                    }
                    return profD.path + path;
                } else {
                    return path;
                }
            }
        },
        SetMenusIcon: function(menu, obj) {
            if (menu.hasAttribute("src") || menu.hasAttribute("image") || menu.hasAttribute("icon"))
                return;

            if (obj.exec) {
                var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                try {
                    aFile.initWithPath(obj.exec);
                } catch (e) {
                    return;
                }
                if (!aFile.exists()) {
                    menu.setAttribute("disabled", "true");
                } else {
                    let fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(aFile);
                    menu.setAttribute("image", "moz-icon://" + fileURL + "?size=16");
                }
                return;
            }

            if (obj.keyword) {
                let engine = Services.search.getEngineByAlias(obj.keyword);
                if (engine && engine.iconURI) {
                    menu.setAttribute("image", engine.iconURI.spec);
                    return;
                }
            }
            var setIconCallback = function(url) {
                let uri, iconURI;
                try {
                    uri = Services.io.newURI(url, null, null);
                } catch (e) {}
                if (!uri) return;

                menu.setAttribute("scheme", uri.scheme);
                PlacesUtils && PlacesUtils.favicons && PlacesUtils.favicons.getFaviconDataForPage(uri, {
                    onComplete: function(aURI, aDataLen, aData, aMimeType) {
                        try {
                            // javascript: URI  host 
                            menu.setAttribute("image", aURI && aURI.spec ?
                                "moz-anno:favicon:" + aURI.spec :
                                "moz-anno:favicon:" + uri.scheme + "://" + uri.host + "/favicon.ico");
                        } catch (e) {}
                    }
                });
            }
            PlacesUtils && PlacesUtils.keywords && PlacesUtils.keywords.fetch(obj.keyword || '').then(entry => {
                let url;
                if (entry) {
                    url = entry.url.href;
                } else {
                    url = (obj.url + '').replace(/%TITLE(?:_HTML(?:IFIED)?|_ENCODE)?%|%t\b|%TITLES(?:_HTML(?:IFIED)?|_ENCODE)?%|%t\b|%(?:R?LINK_OR_)?URL(?:_HTML(?:IFIED)?|_ENCODE)?%|%u\b|%HOST(?:_HTML(?:IFIED)?|_ENCODE)?%|%h\b|%BASEDOMAIN(?:_HTML(?:IFIED)?|_ENCODE)?%|%h\b|%IP(?:_HTML(?:IFIED)?|_ENCODE)?%|%h\b|%SEL(?:_HTML(?:IFIED)?|_ENCODE)?%|%s\b|%R?LINK(?:_TEXT|_HOST)?(?:_HTML(?:IFIED)?|_ENCODE)?%|%l\b|%IMAGE(?:_URL|_ALT|_TITLE)(?:_HTML(?:IFIED)?|_ENCODE)?%|%i\b|%IMAGE_BASE64(?:_HTML(?:IFIED)?|_ENCODE)?%|%i\b|%MEDIA_URL(?:_HTML(?:IFIED)?|_ENCODE)?%|%m\b|%CLIPBOARD(?:_HTML(?:IFIED)?|_ENCODE)?%|%p\b|%FAVICON(?:_HTML(?:IFIED)?|_ENCODE)?%|%FAVICON_BASE64(?:_HTML(?:IFIED)?|_ENCODE)?%|%EMAIL(?:_HTML(?:IFIED)?|_ENCODE)?%|%EOL(?:_HTML(?:IFIED)?|_ENCODE)?%|%RLT_OR_UT(?:_HTML(?:IFIED)?|_ENCODE)?%/gi, "");
                }
                setIconCallback(url);
            }, e => {
                console.log(e)
            }).catch(e => {});
        }
    };
    window.AnoBtn_BuildPopup = AnoBtn_BuildPopup;
    // 來自 User Agent Overrider 擴展
    const ToolbarManager = (function() {

        /**
         * Remember the button position.
         * This function Modity from addon-sdk file lib/sdk/widget.js, and
         * function BrowserWindow.prototype._insertNodeInToolbar
         */
        let layoutWidget = function(document, button, isFirstRun) {

            // Add to the customization palette
            let toolbox = document.getElementById('navigator-toolbox');
            toolbox.palette.appendChild(button);

            // Search for widget toolbar by reading toolbar's currentset attribute
            let container = null;
            let toolbars = document.getElementsByTagName('toolbar');
            let id = button.getAttribute('id');
            for (let i = 0; i < toolbars.length; i += 1) {
                let toolbar = toolbars[i];
                if (toolbar.getAttribute('currentset').indexOf(id) !== -1) {
                    container = toolbar;
                }
            }

            // if widget isn't in any toolbar, default add it next to searchbar
            if (!container) {
                if (isFirstRun) {
                    container = document.getElementById('nav-bar');
                } else {
                    return;
                }
            }

            // Now retrieve a reference to the next toolbar item
            // by reading currentset attribute on the toolbar
            let nextNode = null;
            let currentSet = container.getAttribute('currentset');
            let ids = (currentSet === '__empty') ? [] : currentSet.split(',');
            let idx = ids.indexOf(id);
            if (idx !== -1) {
                for (let i = idx; i < ids.length; i += 1) {
                    nextNode = document.getElementById(ids[i]);
                    if (nextNode) {
                        break;
                    }
                }
            }

            // Finally insert our widget in the right toolbar and in the right position
            container.insertItem(id, nextNode, null, false);

            // Update DOM in order to save position
            // in this toolbar. But only do this the first time we add it to the toolbar
            if (ids.indexOf(id) === -1) {
                container.setAttribute('currentset', container.currentSet);
                document.persist(container.id, 'currentset');
            }
        };

        let addWidget = function(window, widget, isFirstRun) {
            try {
                layoutWidget(window.document, widget, isFirstRun);
            } catch (error) {
                console.log(error);
            }
        };

        let removeWidget = function(window, widgetId) {
            try {
                let widget = window.document.getElementById(widgetId);
                widget.parentNode.removeChild(widget);
            } catch (error) {
                console.log(error);
            }
        };

        let exports = {
            addWidget: addWidget,
            removeWidget: removeWidget,
        };
        return exports;
    })();

    function log(str) {
        console.log("[Another Button Debug] ", arguments);
    }

    function alert(aString, aTitle) {
        Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "Another Button", aString, false, "", null);
    }

    function $(id) {
        return document.getElementById(id);
    }

    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n){ el.setAttribute(n, attr[n])});
        return el;
    }

    function addStyle(css) {
        var pi = document.createProcessingInstruction(
            'xml-stylesheet',
            'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
        );
        return document.insertBefore(pi, document.documentElement);
    }

    anoBtn.init();
    window.anoBtn = anoBtn;
})('\
#anoBtn_Icon dropmarker {\
    display: none;\
}\
'.replace(/\n|\t/g, ''));