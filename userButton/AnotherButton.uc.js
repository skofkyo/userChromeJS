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
    anobtn.setAttribute('image', 'data:image/png;base64,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');

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