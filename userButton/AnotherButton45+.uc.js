// ==UserScript==
// @name				AnotherButton
// @description			可移動的按鈕菜單
// @author				feiruo/skofkyo
// @compatibility 		Firefox 45+
// @charset 			UTF-8
// @include				main
// @id 					[A26C02CA]
// @startup        		window.anobtn.init();
// @shutdown       		window.anobtn.unint(true);
// @reviewURL			http://bbs.kafan.cn/thread-1657589-1-1.html
// @homepageURL	 		https://github.com/feiruo/userChromeJS/tree/master/anoBtn
// @note         	  	支持菜單和腳本設置重載
// @note          		需要 _anoBtn.js 配置文件
// @version		 		1.3.0.7	2016.07.17 23:34 修正新視窗無法正常載入選單的問題 by skofkyo
// @version		 		1.3.0	2014.08.12 19:00 支持多級菜單，不限制菜單級數。
// @version		 		1.2.1
// @version 			1.2修復按鈕移動之後重載殘留問題，增加菜單彈出位置選擇。
// @version 			1.1解決編輯器中文路徑問題，修改菜單，提示等文字。
// @version 			1.0
// ==/UserScript==
(function() {

    var icon = 0; // 0為視窗圖標 1為三槓動畫圖標
    var useScraptchpad = true; // 如果不存在編輯器，則使用代碼片段速記器，否則設置編輯器路徑

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
                class: "menuitem-iconic",
                label: "AnotherButton",
                tooltiptext: "左鍵：重載配置\n右鍵：編輯配置",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADQElEQVQ4jZXT24sbVRwH8Ekyk9mZySTbZLu7brWxILuK74agooIo/i0iIsqAL4IgilIURcSKlqJ155LJPZtmL0ldt8YWFhQfvDzYmpxkkmzu2Uu73c18fZhMspWieODLeTqf8/3NcCjqf67Q9bb30eLRM4s3hq8tbQ8vL24Pf332p+70vx5aSjbF4He3nwtuHr0R3DpeDl4b/nG2aA6DRRMP/2ji3HUT524M8WKx7x8fejxH/HO53vOzuYF0em1PXVjfvzi/cSjN5g8xV7iL+atHWNg8xpnvhzizZeLBLRMPXTNx9gcT4WLfTwVixmNCsnmTT3VMMdOFd6WP6Su7mFndzc+u7Ukz6wewchuzG3cwlz/E/NW7eGAEL2wOLcir10NsbAdT8Sb4ZBuedBdipgd/tpcP5AbSqdwe7PhX9xBY3cfM+gFOb9yB3XYMuaMNsLEG2NgOuEQLQqoDX7qb92V7knelD2+2D1+2D192AF92gOkruyN4H4G1A4RzfT/F6STE6DUweh0WaLXzJJt5MdmRPOkOPOnuOGLGauzN9OBb6WM6O5hALs0AHbEwGxRijbwQb0lcogUu0QKfbIFPtsEn2xBSbQipDoSUdUk4R/wUq5FHGLWiTqlVmYsYl3nduOTWa18J0drrvrjxgife+MwTr38ixHc+EuLN82Ki+YGY2nnPm2q940013/Yk2m+FNcJRovLnIqtVE+5IJerWKppbqypTevVbMWq8yUdqL7G68SWr17/go/XPeb32qRCrfyzo9Q+5eOO8EG+8L0br74Y1wlGcfCvkVCtwKhU41SpcahUuzQCrGQV3pCrRkdpo7JOjW+PbeSJWCVCcfCvkUCqgFALHCHOqVbCqUaAjVcmlGaDtjNERONrHkFOxGjlOhFEqBVolkt3Qzr2gtY8hSiZwyAQOZRJGIQVaJZLdcDL2BKYjNdCaYUHiNzeX6OXSb5RcPqbkMiiZgJIJaIUUnMtEshs6T4x98lu6bGjy0n8XRbn8NKuUXmXk0tesUrrgXCbSpOlkbOvnTNB7oPuthQvbvKiWnmSV0iuMXL7EKOVfHAo5+if8n9B98fQ2L2p/hVm5/DKjlC/SCvn5qUzp1N/awan9OSOqjQAAAABJRU5ErkJggg==",
                oncommand: "setTimeout(function(){ anobtn.reload(true); }, 10);",
                onclick: "if (event.button == 2) { event.preventDefault(); closeMenus(event.currentTarget);anobtn.edit(anobtn.file); }",
            }), ins);
            this.addmenumovebtn();
            this.addstyle();
            this.reload();
        },

        addmenumovebtn: function() {
            CustomizableUI.createWidget({
                defaultArea: CustomizableUI.AREA_NAVBAR,
                id: "anobtn",
                type: 'custom',
                onBuild: function(aDocument) {
                    var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                    var props = {
                        id: "anobtn",
                        class: "toolbarbutton-1 chromeclass-toolbar-additional",
                        label: "Anobtn",
                        removable: "true",
                        overflows: "false",
                        type: "menu",
                        popup: "anobtn_popup"
                    };
                    for (var p in props) {
                        toolbarbutton.setAttribute(p, props[p]);
                    };
                    return toolbarbutton;
                }
            });
        },

        addstyle: function() {
            if (icon == 0) {
                var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' + '#anobtn .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADQElEQVQ4jZXT24sbVRwH8Ekyk9mZySTbZLu7brWxILuK74agooIo/i0iIsqAL4IgilIURcSKlqJ155LJPZtmL0ldt8YWFhQfvDzYmpxkkmzu2Uu73c18fZhMspWieODLeTqf8/3NcCjqf67Q9bb30eLRM4s3hq8tbQ8vL24Pf332p+70vx5aSjbF4He3nwtuHr0R3DpeDl4b/nG2aA6DRRMP/2ji3HUT524M8WKx7x8fejxH/HO53vOzuYF0em1PXVjfvzi/cSjN5g8xV7iL+atHWNg8xpnvhzizZeLBLRMPXTNx9gcT4WLfTwVixmNCsnmTT3VMMdOFd6WP6Su7mFndzc+u7Ukz6wewchuzG3cwlz/E/NW7eGAEL2wOLcir10NsbAdT8Sb4ZBuedBdipgd/tpcP5AbSqdwe7PhX9xBY3cfM+gFOb9yB3XYMuaMNsLEG2NgOuEQLQqoDX7qb92V7knelD2+2D1+2D192AF92gOkruyN4H4G1A4RzfT/F6STE6DUweh0WaLXzJJt5MdmRPOkOPOnuOGLGauzN9OBb6WM6O5hALs0AHbEwGxRijbwQb0lcogUu0QKfbIFPtsEn2xBSbQipDoSUdUk4R/wUq5FHGLWiTqlVmYsYl3nduOTWa18J0drrvrjxgife+MwTr38ixHc+EuLN82Ki+YGY2nnPm2q940013/Yk2m+FNcJRovLnIqtVE+5IJerWKppbqypTevVbMWq8yUdqL7G68SWr17/go/XPeb32qRCrfyzo9Q+5eOO8EG+8L0br74Y1wlGcfCvkVCtwKhU41SpcahUuzQCrGQV3pCrRkdpo7JOjW+PbeSJWCVCcfCvkUCqgFALHCHOqVbCqUaAjVcmlGaDtjNERONrHkFOxGjlOhFEqBVolkt3Qzr2gtY8hSiZwyAQOZRJGIQVaJZLdcDL2BKYjNdCaYUHiNzeX6OXSb5RcPqbkMiiZgJIJaIUUnMtEshs6T4x98lu6bGjy0n8XRbn8NKuUXmXk0tesUrrgXCbSpOlkbOvnTNB7oPuthQvbvKiWnmSV0iuMXL7EKOVfHAo5+if8n9B98fQ2L2p/hVm5/DKjlC/SCvn5qUzp1N/awan9OSOqjQAAAABJRU5ErkJggg==)}' + '}';
                var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
                var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
                sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
            } else if (icon == 1) {
                var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' + '#TabsToolbar #anobtn {background: none !important;}' + '#anobtn .toolbarbutton-icon{' + 'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAQCAYAAAB+690jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsdJREFUeNrMVltrE0EUntndNNWEtFZjbEsrtqmRmksx+guKlEIQfRAR9En0QXzzd/gu2EdfvSBFCJKCN1BrMSWgsUqb2IZeTGqbNCGb3dnxnJCUcXvJ+NbAxwyZc749c/abb5ZyzslB+lFHR087jMcAHoDSIt4CFAF5QFVcMB7lHDC4AMhHW/DwRn4ZU8UFDeBLxCfvnwmcPiKzg/T3uT+jY7EHMM3+s7Dy0zMaGog7VCUqw2MwayaRmh8jJ/wFe0GdQ0NDTpNZJRkijMUce0H09y93yTgVrelM6tW0KSSKOdxWkAK90z9+mt6EuSkDjMWcHU/IpdnmZjFpmiaRAcZizg4NaZ6eLtw4vPXuRsewAx0A9y6aMkEcqzAuADZETbFozEmo0ke0tuPApRCnS+Me7yHS7nYSRbVpijPSdrhAuv1L3H+hKGqKqp4etVEEipJSSvrik89uhIJnXTKt//otXbo4fumhxcmSyMPH73Wdu3b7qcPhiMjwmBafmc7mxzSFEmxbRVg7OTw8bIKm1mWIAoEAbqiTTeSyIg9NTXWsV61IrVKV1BSta0rZ5Tzqb9+9rzSOY0tg7F6aKpaKScMwiAwwFnPQh5oUTT/qBwzCQ3wNTe3lR1uAAuwgA+MPcyLX7Gjdj+jcBy9ZXegntcpR6Je6OwvjpLql042VLVIpLhNuLYoP9L188eT6SCTcLtPimS9JLXb56hsofJ6IHQI/GnDTuNrrjZJeb0sexthsZur5Ffr6MR4WXSyoMxQM6obJyjIFjYTDGhwdFQ5BXTdM8KM88UV1JnclOVUa4YPnLWsiV+dRRO3EXyUMWT/C2L20Uy5XpP0IY0U/0gQ1r926c3da8KN9TynEL8O4Zr+1aGa2xLOpm9t+tP+NZhGztka5VeL2guAPdOsUTNKSlyN2U7cH0s+TKHbU1eL/8GznH7TPj78CDAD/U5+2FYl1DgAAAABJRU5ErkJggg==") !important;' + '}' + '#anobtn:not(:hover) .toolbarbutton-icon {' + '-moz-image-region: rect(0px 18px 16px 0px) !important;' + '-moz-transition: all 0.2s !important;' + '}' + '#anobtn:hover .toolbarbutton-icon {' + '-moz-image-region: rect(0px 36px 16px 18px) !important;' + '-moz-transition: all 0.2s !important;' + '}' + '}';
                var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
                var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
                sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
            }
        },

        reload: function(event) {
            var aFile = this.file;
            var data = loadFile(this.file);
            if (!aFile || !aFile.exists() || !aFile.isFile() || !data) return this.alert('Load Error: 配置文件不存在');

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
                this.alert('Error: ' + e + '\n請重新檢查配置文件');
                return;
            }
            try {
                this.unint();
            } catch (e) {}
            this.anomenu = sandbox.anomenu;
            this.anobtnset = sandbox.anobtnset;
            $("mainPopupSet")
                .appendChild(this.makepopup());
            if (event) this.alert('配置已經重新載入');
        },

        startupreload: function(event) {
            var aFile = this.file;
            var data = loadFile(this.file);
            if (!aFile || !aFile.exists() || !aFile.isFile() || !data) return this.alert('Load Error: 配置文件不存在');

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
                this.alert('Error: ' + e + '\n請重新檢查配置文件');
                return;
            }
            try {
                this.unint();
            } catch (e) {}
            this.anomenu = sandbox.anomenu;
            this.anobtnset = sandbox.anobtnset;
            $("mainPopupSet")
                .appendChild(this.makepopup());
        },

        unint: function(real) {
            for (var i = 0; i < this.anomenu.length; i++) {
                var obj = this.anomenu[i];
                try {
                    $("main-menubar")
                        .insertBefore($(obj.id), $("main-menubar")
                            .childNodes[7]);
                } catch (e) {}
            }
            $("mainPopupSet")
                .removeChild($("anobtn_popup"));
            if (real) {
                $("anobtn_set")
                    .parentNode.removeChild($("anobtn_set"));
            }
        },

        makepopup: function(event) {
            var popup = document.createElement("menupopup");
            popup.setAttribute("id", "anobtn_popup");
            popup.setAttribute('position', 'after_start');
            popup.addEventListener('popupshowing', (event) => anobtn.onpopup(event));
            popup.addEventListener('popuphiding', (event) => anobtn.hidepopup(event));
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
                popup.appendChild(menuitem);
            }
            return popup;
        },

        onpopup: function(event) {
            var popup = event.target;
            if (popup.id != "anobtn_popup") {
                return;
            }
            if (popup.triggerNode) {
                popup.triggerNode.setAttribute('open', 'true');
            }
        },

        hidepopup: function(event) {
            var popup = event.target;
            if (popup.id != "anobtn_popup") {
                return;
            }
            if (popup.triggerNode) {
                popup.triggerNode.removeAttribute('open');
            }
        },

        newMenu: function(menuObj, islow) {
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
            if (obj.child) return this.newMenu(obj);
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
                    let fileURL = Services.io.getProtocolHandler("file")
                        .QueryInterface(Ci.nsIFileProtocolHandler)
                        .getURLSpecFromFile(aFile);
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
            text = text.toLocaleLowerCase()
                .replace("%u", content.location.href);
            if (text.indexOf('\\') === 0)
                text = Services.dirsvc.get("ProfD", Ci.nsILocalFile)
                .path + text;
            return text;
        },

        exec: function(path, arg) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            if (path.indexOf('\\') === 0)
                path = Services.dirsvc.get("ProfD", Ci.nsILocalFile)
                .path + path;
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

        handleRelativePath: function(path) {
            if (path) {
                path = path.replace(/\//g, '\\')
                    .toLocaleLowerCase();
                var profD = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties)
                    .get("ProfD", Ci.nsILocalFile);
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
            win || (win = this.focusedWindow);
            var selection = this.getRangeAll(win)
                .join(" ");
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
            win || (win = this.focusedWindow);
            var sel = win.getSelection();
            var res = [];
            for (var i = 0; i < sel.rangeCount; i++) {
                res.push(sel.getRangeAt(i));
            };
            return res;
        },

        alert: function(aString, aTitle) {
            Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
                .showAlertNotification("", aTitle || "Another Button", aString, false, "", null);
        },

        edit: function(aFile) {
            if (!aFile || !aFile.exists() || !aFile.isFile())
                return alert("Load Error: 設置檔不存在:\n" + aFile.path);
            var editor = Services.prefs.getCharPref("view_source.editor.path");
            if (!editor) {
                alert("請先設定文字編輯器的路徑!!!");
                var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
                fp.init(window, "設定全局腳本編輯器", fp.modeOpen);
                fp.appendFilter("執行檔案", "*.exe");
                if (fp.show() == fp.returnCancel || !fp.file)
                    return;
                else {
                    editor = fp.file;
                    Services.prefs.setCharPref("view_source.editor.path", editor.path);
                }
                return;
            }
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
            UI.charset = window.navigator.platform.toLowerCase()
                .indexOf("win") >= 0 ? "BIG5" : "UTF-8";
            try {
                var path = UI.ConvertFromUnicode(aFile.path);
                var args = [path]
                file.initWithPath(editor);
                process.init(file);
                process.run(false, args, args.length);
            } catch (e) {}
        },
    };

    let absr = {
        startup: function() {
            setTimeout(function(event) {
                anobtn.startupreload(true);
            }, 500);
        },
    };

    absr.startup();
    window.anobtn.init();

    function $(id) {
        return document.getElementById(id);
    }

    function log() {
        Application.console.log("[Another Button] " + Array.slice(arguments));
    }

    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr)
            .forEach(function(n) el.setAttribute(n, attr[n]));
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
})();