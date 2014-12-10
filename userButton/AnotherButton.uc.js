// ==UserScript==
// @name		 anoBtn.uc.js
// @description	 AnotherButton
// @homepage	 https://github.com/feiruo/userchromejs/
// @author		 feiruo
// @include		 main
// @charset		 UTF-8
// @version		 1.2
// @compatibility    Firefox 29+
// @note 		 超感謝 ywzhaiqi  
// @note 		 按鈕菜單，外置配置文件.......
// @note 		 1.2修復按鈕移動之後重載殘留問題，增加菜單彈出位置選擇。
// @note 		 1.1解決編輯器中文路徑問題，修改菜單，提示等文字。
// @note 		 1.0
// ==/UserScript==

(function() {

    CustomizableUI.createWidget({
        defaultArea: CustomizableUI.AREA_NAVBAR,
        id: "anobtn",
        label: "Anobtn",
    });

    var anobtn = document.getElementById('anobtn');
    anobtn.setAttribute('type', 'menu');
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#anobtn .toolbarbutton-icon {list-style-image:url(data:image/png;base64,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)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

    window.anobtn = {
        get file() {
            let aFile;
            aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
            aFile.appendRelativePath("Local");
            aFile.appendRelativePath("_anoBtn.js");
            delete this.file;
            return this.file = aFile;
        },

        init: function() {
            var ins;
            ins = $("devToolsSeparator");
            ins.parentNode.insertBefore($C("menuitem", {
                id: "anobtn_set",
                label: "AnotherButton",
                tooltiptext: "\u5DE6\u9375\u91CD\u8F09 \uFF1B\u53F3\u9375\u7DE8\u8F2F",
                oncommand: "setTimeout(function(){ anobtn.reload(true); }, 10);",
                onclick: "if (event.button == 2) { event.preventDefault(); closeMenus(event.currentTarget);anobtn.edit(anobtn.file); }",
            }), ins);
            this.reload();
        },

        reload: function(isAlert) {
            var aFile = this.file;
            var data = loadFile(this.file);
            if (!aFile || !aFile.exists() || !aFile.isFile() || !data) return this.alert('Load Error: \u914D\u7F6E\u6587\u4EF6\u4E0D\u5B58\u5728');

            var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
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
                this.alert('Error: ' + e + '\n\u8ACB\u91CD\u65B0\u6AA2\u67E5\u914D\u7F6E\u6587\u4EF6');
                return;
            }
            try {
                this.unint();
            } catch (e) {}
            this.anomenu = sandbox.anomenu;
            this.anobtnset = sandbox.anobtnset;
            $("anobtn").appendChild(this.makepopup());
            if (isAlert) this.alert('\u914D\u7F6E\u5DF2\u7D93\u91CD\u65B0\u8F09\u5165');
        },

        makepopup: function() {
            var popup = document.createElement("menupopup");
            popup.setAttribute("id", "anobtn_popup");
            popup.setAttribute('position', this.anobtnset.position);
            var obj, menuitem;
            for (var i = 0; i < this.anomenu.length; i++) {
                obj = this.anomenu[i];
                menuitem = $(obj.id);
                if (menuitem) {
                    for (let [key, val] in Iterator(obj)) {
                        if (typeof val == "function") obj[key] = val = "(" + val.toSource() + ").call(this, event);";
                        menuitem.setAttribute(key, val);
                    }
                    menuitem.classList.add("anobtn");
                    menuitem.classList.add("menu-iconic");
                } else {
                    menuitem = obj.child ? this.newMenu(obj) : this.newMenuitem(obj);
                }
                //popup.appendChild(menuitem.cloneNode( true ));
                popup.appendChild(menuitem);
            }
            return popup;
        },

        unint: function() {
            for (var i = 0; i < this.anomenu.length; i++) {
                var obj = this.anomenu[i];
                try {
                    $("main-menubar").insertBefore($(obj.id), $("main-menubar").childNodes[7]);
                } catch (e) {}
            }
            $("anobtn").removeChild($("anobtn_popup"));
            $("anobtn").parentNode.removeChild($("anobtn"));
        },

        newMenu: function(menuObj) {
            var menu = document.createElement("menu");
            var popup = menu.appendChild(document.createElement("menupopup"));
            for (let [key, val] in Iterator(menuObj)) {
                if (key === "child") continue;
                if (typeof val == "function") menuObj[key] = val = "(" + val.toSource() + ").call(this, event);"
                menu.setAttribute(key, val);
            }

            menuObj.child.forEach(function(obj) {
                popup.appendChild(this.newMenuitem(obj));
            }, this);
            let cls = menu.classList;
            cls.add("anobtn");
            cls.add("menu-iconic");
            return menu;
        },

        newMenuitem: function(obj) {
            var menuitem;
            if (obj.label === "separator" || (!obj.label && !obj.text && !obj.oncommand && !obj.command)) {
                menuitem = document.createElement("menuseparator");
            } else {
                menuitem = document.createElement("menuitem");
            }

            for (let [key, val] in Iterator(obj)) {
                if (typeof val == "function") obj[key] = val = "(" + val.toSource() + ").call(this, event);";
                menuitem.setAttribute(key, val);
            }
            var cls = menuitem.classList;
            cls.add("anobtn");
            cls.add("menuitem-iconic");

            if (obj.oncommand || obj.command) return menuitem;

            if (obj.exec) {
                obj.exec = this.handleRelativePath(obj.exec);
            }

            menuitem.setAttribute("oncommand", "anobtn.onCommand(event);");
            this.setIcon(menuitem, obj);
            return menuitem;
        },

        setIcon: function(menu, obj) {
            if (menu.hasAttribute("src") || menu.hasAttribute("image") || menu.hasAttribute("icon")) return;

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
        },

        onCommand: function(event) {
            var menuitem = event.target;
            var text = menuitem.getAttribute("text") || "";
            var exec = menuitem.getAttribute("exec") || "";
            if (exec) this.exec(exec, this.convertText(text));
        },

        convertText: function(text) {
            text = text.toLocaleLowerCase().replace("%u", content.location.href);
            return text;
        },

        exec: function(path, arg) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            try {
                var a = (typeof arg == 'string' || arg instanceof String) ? arg.split(/\s+/) : [arg];
                file.initWithPath(path);

                if (!file.exists()) {
                    Cu.reportError('File Not Found: ' + path);
                    return;
                }

                if (file.isExecutable()) {
                    process.init(file);
                    process.run(false, a, a.length);
                } else {
                    file.launch();
                }

            } catch (e) {
                log(e);
            }
        },

        handleRelativePath: function(path) {
            if (path) {
                path = path.replace(/\//g, '\\').toLocaleLowerCase();
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

        alert: function(aString, aTitle) {
            Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "Another Button", aString, false, "", null);
        },

        edit: function(aFile) {
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
                this.alert("\u7DE8\u8F2F\u5668\u4E0D\u6B63\u78BA\uFF01")
            }
        },
    }
    window.anobtn.init()

    function $(id) {
        return document.getElementById(id);
    }

    function log() {
        Application.console.log("[Another Button] " + Array.slice(arguments));
    }

    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }

    function loadFile(aFile) {
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
        return data;
    }
    
    setTimeout(function() {
        anobtn.reload(true);
        addMenu.rebuild(true);
    }, 100);
})();