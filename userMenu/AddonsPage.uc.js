// ==UserScript==
// @name         AddonsPage.uc.js
// @description  附件組件頁面右鍵新增查看所在目錄，詳細信息頁面新增安裝地址或路徑，新增 uc腳本管理頁面。
// @author       ywzhaiqi
// @include      main
// @charset      UTF-8
// @version      2014.09.11
// @downloadURL  https://raw.github.com/ywzhaiqi/userChromeJS/master/AddonsPage/AddonsPage.uc.js
// @homepageURL  https://github.com/ywzhaiqi/userChromeJS/tree/master/AddonsPage
// @reviewURL    http://bbs.kafan.cn/thread-1617407-1-1.html
// @optionsURL   about:config?filter=view_source.editor.path
// @note         - 附件組件頁面右鍵新增查看所在目錄（支持擴展、主題、插件）、複製名字。Greasemonkey、Scriptish 自帶已經存在
// @note         - 附件組件詳細信息頁面新增GM腳本、擴展、主題安裝地址和插件路徑，右鍵即複製
// @note         - 新增 uc腳本管理頁面
// @note         - 右鍵菜單 "查看附加組件" 需要 DOM Inspector
// @note         uc腳本管理界面
// @note         - 啟用禁用需要 rebuild_userChrome.uc.xul
// @note         - 編輯命令需要首先設置 view_source.editor.path 的路徑
// @note         - 圖標請自行添加樣式，詳細信息見主頁
// @note         其它信息見主頁
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function(){

    var iconURL = "data:image/png;base64,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";  // uc 腳本列表的圖標

    var Config = {
        debug: 0,  // 1 則uc管理界面右鍵菜單會有 "重載 uc 腳本" 的菜單
        detailView: 1,  // 詳細信息頁面是否添加安裝鏈接
    };

    if(window.AM_Helper){  // 修改調試用，重新載入無需重啟
        window.AM_Helper.uninit();
        delete window.AM_Helper;
    }
    if(window.userChromeJSAddon){
        window.userChromeJSAddon.uninit();
        delete window.userChromeJSAddon;
    }

    Cu.import("resource://gre/modules/Services.jsm");
    Cu.import("resource://gre/modules/AddonManager.jsm");

    const isCN = Services.prefs.getCharPref("general.useragent.locale").indexOf("zh") != -1;

    var ApplyPatchForScript = (function(){
        const USO_URL_RE = /(^https?:\/\/userscripts.org.*\/scripts\/source\/\d+)\.\w+\.js$/i;

        const GFO_URL_RE_1 = /(^https?:\/\/greasyfork.org\/scripts\/code\/\w+)\.\w+\.js$/i;
        const GFO_URL_RE_2 = /(^https?:\/\/greasyfork.org\/scripts\/[^\/]+\/)code[\.\/].*\w+\.js$/i;

        // (http://binux.github.io/ThunderLixianExporter/)master/ThunderLixianExporter.user.js
        const GITHUB_URL_RE_1 = /(^https?:\/\/\w+.github.io\/\w+\/)master\/.*.*\w+\.js$/i;
        // 從   https://raw.githubusercontent.com/ywzhaiqi/userscript/master/noNoticetitleflashOnBBS.user.js
        // 轉為 https://github.com/ywzhaiqi/userscript/blob/master/noNoticetitleflashOnBBS.user.js
        const GITHUB_URL_RE_2 = /(^https?:\/\/raw.githubusercontent.com\/.*?\/master\/.*\.user\.js$)/i;

        function getScriptHomeURL(downURL) {
            var url;
            if (downURL && downURL.startsWith('http')) {
                if (USO_URL_RE.test(downURL)) {
                    url = RegExp.$1.replace(/source/, "show");
                } else if (GFO_URL_RE_1.test(downURL)) {
                    url = RegExp.$1;
                } else if (GFO_URL_RE_2.test(downURL)) {
                    url = RegExp.$1;
                } else if (GITHUB_URL_RE_1.test(downURL)) {
                    url = RegExp.$1;
                } else if (GITHUB_URL_RE_2.test(downURL)) {
                    url = RegExp.$1.replace('raw.githubusercontent.com', 'github.com')
                            .replace('/master/', '/blob/master/');
                }
            }
            return url ? decodeURIComponent(url) : null;
        }

        function addHomePage(){
            // 添加 Scriptish 腳本的主頁
            if (window.Scriptish_config) {
                Scriptish_config.scripts.forEach(function(script){
                    if(script.homepageURL) return;

                    var url = script.updateURL || script.downloadURL;
                    script.homepageURL = getScriptHomeURL(url);
                });
            }

            // 添加 Greasemonkey 腳本的主頁
            AddonManager.getAddonsByTypes(['greasemonkey-user-script'], function (aAddons) {
                aAddons.forEach(function (aAddon) {
                    if (aAddon.homepageURL) return;

                    var url = aAddon._script._downloadURL || aAddon._script._updateURL;
                    var homepageURL = getScriptHomeURL(url);
                    if (homepageURL) {
                        aAddon.homepageURL = homepageURL;
                    } else {
                        // console.log(aAddon.name, url);
                    }
                });
            });
        }

        return {
            init: addHomePage
        }
    })();

    setTimeout(function(){
        ApplyPatchForScript.init();
    }, 2000);

    window.AM_Helper = {
        init: function(){
            document.addEventListener("DOMContentLoaded", this, false);
        },
        uninit: function(){
            document.removeEventListener("DOMContentLoaded", this, false);
        },
        handleEvent: function(event){
            switch(event.type){
                case "DOMContentLoaded":
                    var doc = event.target;
                    var win = doc.defaultView;

                    if (["about:addons","chrome://mozapps/content/extensions/extensions.xul"].indexOf(doc.URL) == -1)
                        return;

                    this.addPopupMenu(doc);

                    // 給菜單調用
                    win.AM_Helper = AM_Helper;
                    this.win = win;

                    if (Config.detailView) {
                        var self = this;
                        var observer = new MutationObserver(function(e) {
                            e = e[e.length-1];
                            if(e.attributeName == "loading") {
                                var doc = e.target.ownerDocument;
                                self.setUrlOrPath(doc);
                            }
                        });
                        observer.observe(doc.getElementById("detail-view"), {attributes: true});
                    }
                    break;
                case "popupshowing":
                    this.getAddon(this.win.document.popupNode.value,
                                  this.setItemsAttributes,
                                  event);
                    break;
            }
        },
        addPopupMenu: function(doc){
            var ins = doc.getElementById("menuitem_uninstallItem");
            if(!ins) return;

            ins = ins.nextSibling;
            var popup = ins.parentNode;

            var menuitem = $C("menuseparator", {
                id: "AM-separator-1"
            });
            popup.insertBefore(menuitem, ins);

            menuitem = $C("menuitem", {
                id: "AM-inspect-addon",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVUlEQVQ4jWNgYGD4TyFm+P9/LXkYrwHoNhFtAFxDLirGZhBOA9A1IxuC1wB8mrEZQmcDWulhAFZDWqGYlFjAF40EXYAvIeHgk5V8KcsLVMlMKAZQggHc3forcDIvkQAAAABJRU5ErkJggg==",
                label: isCN ? "查看附加組件" : "Inspect Addon",
                accesskey: "i",
                tooltipText: isCN ? "調用 DOM Inspector 查看 addon 對像" : "inspect addon use DOM Inspector",
                oncommand: "AM_Helper.getAddon(AM_Helper.getPopupNode(this).value, AM_Helper.inspectAddon);"
            });
            popup.insertBefore(menuitem, ins);

            menuitem = $C("menuitem", {
                id: "AM-edit-script",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACvUlEQVQ4jXXSz2vTYBgH8GcbQztwP7q6rkls0mRNk6Zpk75Jk7dJ27RrsoSOKp48enHij4se3K6C/hOCF8EfKHhQ/4AdvLmBkYEy2cWT7OoOOsTXQ7eywvbCh/fwPs/LA88X+r3ey8v9/tZZ+v3+WwCAK/3+AzjtrIZhvBpF5Exh+B1jnFiNop+9KHoCAGMjH4RBEEe+T1a63WdREKxFQbAW+v7NIOjeC/3l+2EQ7ADA+Eqnczfy/fUgCHIn2scgaDdjv+2Rrtf65Lfbr33Pe9P1vPfdtvfh6P7Wc925Y47jXDhqHscYJ6DjunGn4ZKh5gmN0zRuAMAExjiJEJqCpm3FLWyTZq32yMM4bNfrPQ/jsGEYtbZloZZtHbSwTVrYJg3b3gSAScdxKM/zUhjjBDgIxY5pELdm/HAt64tr1eK6YWw7prk1YPx1TIM4BjqoVSpis1nLubb5zrUNDwDGwNK12K7qBCOdYFQltq6dytK0O47jUJ1OnXVM86qlabu2rt8CVCrFtbJKzEplA4liylXVOVdV54xS6auploiploipKB89z2JsvbJeR1oPACY0TZvVFfka6FIhrioy0YvSqbSi9MtGyDI17Xq1JP/Ti9JhWZZvDxepinxcFgVSzgv7al7YGxKFP2VRILoiPcSGoWtSfr8sCqQsCkTNC3sAMA4AAEqOjRWeJQrPbahilj9W5LldNc9/7romrxaEzUENSxSePVSFLBpOUGDpWMrSZARLD4oF4VVVUToFlvl9/Cay9OORJOaphXiJSpMhepEUsjSRWIZI3KUXADDB0bOakEnvCJmL2wjB5EgScwupmE+nyLElKk3y9CJZotKES88/zaZnlgHgHMdx5+lkgjnRPEhiEmA6m52ZY5jppCyzGVFkaFlmMwwznaQoaopfmH8uZFLo5NgY4wRCaApjnPgPzwAQGyfTt68AAAAASUVORK5CYII=",
                label: isCN ? "編輯" : "Edit",
                accesskey: "e",
                hidden: true,
                oncommand: "AM_Helper.getAddon(AM_Helper.getPopupNode(this).value, AM_Helper.editScript);"
            });
            popup.insertBefore(menuitem, ins);

            menuitem = $C("menuitem", {
                id: "AM-reload-uc",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB0ElEQVQ4jbWTsYoUQRCGa29B2c0cZPTO6a7qrp7u2Zkd92TuGNqBYTnwDfQJ5DAxMBE0EhQNLlbhzIzMzDQ+QREEwfeQw+gMNnAMnF1nz124xAqr6qv+u+tvgP8YPe/9oCiKofd+AAC9M5NRFAXOmNuJtfvj8fgqI75iokMl1HNmDruHnGY3tKRHsdYnjk2TxOYDRVQyUsNIjSZ60O1tlf0NjeqFZW5czF/y1N2SUl4Qm2KHkWZG4rGReCzCkAGg770PiqIYLmAlVP0Hjt/V9a4AgD4AABFtqyvyphZ6l5FmjPS2qqqt6XR6saugF2v9JmY+mUwm2Rw+HRr1S8s8K8sy9d4Hizfw3g9ibb5ZYz6vgwGgn1h717FptsejGwCwsagURTF0xF8Z8eM6uKqqrTSxDy1zI6VMl6re+wFLOtQSf4ZheKm9++UuvLd3HR3zJ0b5fZXKntgUO1riL434Xkl5oCK134VHsTtgpEYJ8XiNSgBG9XS+c5Z0J8/zOnOje47NUZs/AoDzawcoIZ7MB4xidz8x9rVlbjTiDxLy2Qp4yYl9K6XWURRfy3NflmWa53mNiD7LsnMrzvvXiW0yaE0SQHdVK/qWnAhn/31Lfb8BkyptY8SqyEEAAAAASUVORK5CYII=",
                hidden: true,
                label: isCN ? "重載 uc 腳本（慎用）" : "Reload uc script",
                style: "font-weight:bold",
                tooltiptext: "僅部分腳本支持。如有問題，重啟解決。",
                oncommand: "AM_Helper.getAddon(AM_Helper.getPopupNode(this).value, AM_Helper.reloadUserChromeJS);"
            });
            popup.insertBefore(menuitem, ins);

            menuitem = $C("menuitem", {
                id: "AM-browse-dir",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbklEQVQ4jY3RSU+TURSA4f4Lty78AWz8Ba5caFwoCHxAIZRGpZZZhTIPggs1KpJolARCgCvYIJMyI2ngg9YOUIggWhAoZWhLKYMFfF2U1ECJ8STv7twnNzkKkz7BY+lIYuJdHGZ9AtPdahyjurBmB7TYPyiVitMz3a+GnUf4ncU4xtOwtCdh6bzNkv0FYAx1GDAw2Z5IONCn5mi7KpiviiNfJV5HPrKQwJ79N+drrG3Ks4HDrUoOvJUceB9y4AkmC4l9cwaHtqwQYtYnhAP2XjUBdwW/No/bCCYLCb8xjX1zRggwvY8/A+hJYX+9nL21cvZc5ey6yth1lSELCe/YXXZN6SFgoiUuHJj6lMKOs4ydlVL8K6X4l4PJQmJ1JBW/MY2jqWx+T2UjC+lsYHupBN/PEnyLxWwtBJOFhKPvFu5RLQFrFgFrFqNNsRgaYiJOAJMfVXgdRXh/FOH5XoR7vhD3fCGykJjpVLEynIrflMmOJY/VL48xNMac/IWtW4X7WyGbcwVszBawbLnHwngmspAwtiSxMJDK5lg6vulqAEYaok8BXclsfM1nbUaHy65DFhKGRomh+jgm29UsDWtZ/qxl3focgOH6mycBa2cyLruO1ck8nNZcZCHR+SqatppoTHo1cz0a5no1DPVp0AxqGKyLOgV0JOO05bJsfsCS6T6ykNC/jKLpaST9dYnYOu6EMraq6K+N9JwAZBFrtnWpWBzPYUHOQRYStRWXeZZ3ieYnV+h9G3ncDU/vm+tp3TXXzoedcrRZKppoiWemLxVjawKZyotahUJxLmzxX2MQMRFjInZQFpJHVF+98L/v/gDacTCAI1Mk9gAAAABJRU5ErkJggg==",
                label: isCN ? "查看所在目錄" : "Browser Dir",
                accesskey: "b",
                oncommand: "AM_Helper.getAddon(AM_Helper.getPopupNode(this).value, AM_Helper.browseDir);"
            });
            popup.insertBefore(menuitem, ins);

            menuitem = $C("menuitem", {
                id: "AM-open-url",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJRSURBVDhPlZPdT1JhAIfPRX9A/RvdZF+a6aSLWq1czfJjDkORrVIWEql8xZdFEtXcmqU5yJQDhxQ18/hRc4g1E9PgKK61LlwTAcMKp+QI01+c3PSi2OJsz/bufZ/fc3cIIsmnVL3YU1BiEhWWmsv45dW7knl/3Yslfbtlqt6PD5rHIKjsAPeSDbwK62b2SSOdNCJuD6hlVMilsIdcQoljtY3ygB6dQ2lNHwQKGnkCEjxJN9Kybrr/GZHbQ4x17CtkBiduG4fxzheG4/U8ZM2TOFpGYX9+K9ILniDrfBO4qtGZGmvQVUsGLduxajLANA0v4gKvHZev9+BNItA/tQhR4zjSK3uwl0fhANeCEtUgcvlPwboyKrC8HRC1LTB3+gI4nW/C4TMtuGdloCUZlD9yg6N1Iu0ajXRhNwo1QzhW1ALWlVgWdgIVZj+jfDaPcxfbkXbqMfJuDIHfPAUBOYvM+24c1LmQLaWxr9iME3wSrCts9W8FjijfOzgabyRH60GOwo0M0QgypW+Re3caRY0fcLZhFscNXmTIx3FI7ES2cgKsy9F64+yW4DXNfa97vhTT9YTBoukIQu0IQZs4G/q/oT6BrjcMVVcI6s7gH2eLpY0r5s8Rovjhgl9sW12rsq1gG0sEYmsEUkcU1Z1RVFmXIbIs77wnXLFt5Re7JSravnyqH/wR0w9EkSKb7JaQd0VmTO5YvGU8hlRJbH3ErYHohH16fZ1i4kiVOnrVQzQ4f44khhs2bxypYny1NklQ0+tcfX/Ip6dTx/hy6ep//6XJxN/FaVH8t5ig9AAAAABJRU5ErkJggg==",
                label: isCN ? "打開安裝頁面" : "Open Install URL",
                accesskey: "u",
                tooltiptext: null,
                oncommand: "openURL(this.tooltipText)",
            });
            popup.insertBefore(menuitem, ins);

            menuitem = $C("menuitem", {
                id: "AM-copy-name",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABKUlEQVQ4jZ2TvU7DMBCA/YYg8TzoFtzYTltYgNKVkYdgCG0WBoY+AWWpLPcSuSSNU/cYKvqTujTipG+8z9/gY3FfXESSQxt6d9EVa46M+TURQRsiyeGkABEB0QRAQMR2gjRN4Wn4+CEUpzZ0+/KlUYAg446nliMUp6MCobgnIsoy/JOgANFsC7IMKU3HQU4IDIxGo/8XGGPAGH22ICjw3oPWGpIkaVXgnCNr7U5QVRVorWE2m50tmM/nVJYFJW/JTmBtDtZayPP8QNCk25cHCMWJdW/lpYw5/CIU9+u1D2YPhvfknKPlsqTp1+dG0ByheO1cdbS8L5hON8uR4u9BwWKxoLIsqCi+abWqqa5rmkwmNBg+bF8O3gVjjMU98Szjzsn/H6mb1/3lH36z2UsQzuZiAAAAAElFTkSuQmCC",
                label: isCN ? "複製名稱" : "Copy Name",
                accesskey: "c",
                oncommand: "AM_Helper.getAddon(AM_Helper.getPopupNode(this).value, AM_Helper.copyName);"
            });
            popup.insertBefore(menuitem, ins);

            // menuitem = $C("menuitem", {
            //     id: "AM-go-uso",
            //     class: "greasemonkey",
            //     hidden: true,
            //     label: isCN ? "在 Userscripts.org 上查看" : "View on Userscripts.org",
            //     oncommand: "openURL(this.tooltipText);"
            // });
            // popup.appendChild(menuitem);

            // menuitem = $C("menuitem", {
            //     id: "AM-find-uso",
            //     class: "greasemonkey",
            //     hidden: true,
            //     label: isCN ? "在 Userscripts.org 上查找" : "Find on Userscripts.org",
            //     oncommand: "openURL(this.getAttribute('find-on-uso'));"
            // });
            // popup.appendChild(menuitem);

            popup.addEventListener("popupshowing", this, true);
        },
        setItemsAttributes: function(aAddon, event){
            var popup = event.target;
            var doc = popup.ownerDocument;

            var
                isExtension = (aAddon.type == "extension"),
                isTheme = (aAddon.type == "theme"),
                isPlugin = (aAddon.type == "plugin"),
                isUserStyle = (aAddon.type == "userstyle"),
                isScriptish = (aAddon.type == "userscript"),
                isGreasemonkey = (aAddon.type == "user-script") || // Greasemonkey
                                (aAddon.type == "greasemonkey-user-script"), // Greasemonkey 1.7+
                isUserScript = isGreasemonkey || isScriptish,
                isUserChromeJS = (aAddon.type == "userchromejs"),
                isService = (aAddon.type == "service"),
                menuitem
            ;

            menuitem = doc.getElementById("AM-browse-dir");
            menuitem.hidden = isUserStyle || isUserScript || isService;

            menuitem = doc.getElementById("AM-edit-script");
            menuitem.hidden = !isUserChromeJS;

            menuitem = doc.getElementById("AM-reload-uc");
            menuitem.hidden = !Config.debug || !isUserChromeJS;

            var className = isGreasemonkey ? "greasemonkey" : "";

            // install url
            menuitem = doc.getElementById("AM-open-url");
            var installURL = isExtension ?
                        (this.getInstallURL(aAddon) || aAddon.homepageURL) :
                        (aAddon.homepageURL || this.getInstallURL(aAddon));
            menuitem.tooltipText = installURL;
            menuitem.hidden = !installURL;
            menuitem.className = installURL ? className : '';

            menuitem = doc.getElementById("AM-inspect-addon");
            menuitem.disabled = !("inspectObject" in window);
            menuitem.className = menuitem.disabled ? '' : className;

            menuitem = doc.getElementById("AM-copy-name");
            menuitem.tooltipText = aAddon.name;
            menuitem.className = className;

            // if(isUserScript && !isScriptish){
            //     var usoURL = "";
            //     if (aAddon._script) {
            //         var usDownloadURL = aAddon._script._downloadURL;
            //         var usUpdateURL = aAddon._script._updateURL;
            //         if (USO_URL_RE.test(usDownloadURL)) {
            //             usoURL = usDownloadURL;
            //         } else if (USO_URL_RE.test(usUpdateURL)) {
            //             usoURL = usUpdateURL;
            //         }
            //     }

            //     menuitem = doc.getElementById("AM-go-uso");
            //     menuitem.disabled = !USO_URL_RE.test(usoURL);
            //     menuitem.className = isUserScript ? menuitem.disabled ? "" : "greasemonkey" : "";
            //     menuitem.tooltipText = usoURL.replace(/source/, "show")
            //         .replace(/.\w+.js$/, "");

            //     menuitem = doc.getElementById("AM-find-uso");
            //     menuitem.disabled = USO_URL_RE.test(usoURL);
            //     menuitem.className = isUserScript ? menuitem.disabled ? "" : "greasemonkey" : "";
            //     menuitem.setAttribute("find-on-uso",
            //         "https://www.google.com.hk/search?q=site:userscripts.org+inurl:scripts+inurl:show+" +
            //         encodeURIComponent(aAddon.name));
            // }
        },

        getPopupNode: function (aNode) {
            var doc = aNode.ownerDocument;
            return "triggerNode" in aNode.parentNode ? aNode.parentNode.triggerNode : doc.popupNode;
        },
        getAddon: function (aId, aCallback, aEvent) {
            var self = this;

            if (this.win.gDetailView._addon) {
                aCallback.apply(this, [this.win.gDetailView._addon, aEvent]);
                return;
            }

            AddonManager.getAllAddons(function(aAddons) {
                for (var i = 0; i < aAddons.length; i++) {
                    if (aAddons[i].id == aId) {
                        aCallback.apply(self, [aAddons[i], aEvent]);
                        return;
                    }
                }
            });
        },

        inspectAddon: function (aAddon) {
            inspectObject(aAddon);
        },
        inspectUserscript: function (aAddon) {
            inspectObject(aAddon._script);
        },
        browseDir: function (aAddon) {
            switch(aAddon.type){
                case "plugin":
                    var pathes = aAddon.pluginFullpath;
                    for (var i = 0; i < pathes.length; i++) {
                        this.revealPath(pathes[i]);
                    }
                    return;
                case "userchromejs":
                    var file = aAddon._script.file;
                    if(file.exists())
                        file.reveal();
                    return;
            }

            // addon
            var gecko = parseInt(Services.appinfo.platformVersion);
            var nsLocalFile = Components.Constructor("@mozilla.org/file/local;1", (gecko >= 14) ? "nsIFile" : "nsILocalFile",
                "initWithPath");

            var dir = Services.dirsvc.get("ProfD", Ci.nsIFile);
            dir.append("extensions");
            dir.append(aAddon.id);
            var fileOrDir = dir.path + (dir.exists() ? "" : ".xpi");
            //Application.console.log(fileOrDir);
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
                    var protSvc = Cc["@mozilla.org/uriloader/external-protocol-service;1"].
                    getService(Ci.nsIExternalProtocolService);
                    protSvc.loadUrl(uri);
                }
            }
        },
        editScript: function(aAddon) {
            if(aAddon.type == "userchromejs"){
                var path = aAddon._script.file.path;
                this.launchEditor(path);
            }
        },
        reloadUserChromeJS: function (aAddon) {
            if(aAddon.type != "userchromejs") return;

            var result = confirm("確定要重載嗎？\n慎用，僅部分腳本支持，不支持的腳本會出現重複添加按鈕或菜單或事件等問題。\n如有問題，重啟火狐。");
            if(!result) return;

            var script = aAddon._script;

            Services.obs.notifyObservers(null, "startupcache-invalidate", "");
            Services.scriptloader.loadSubScript(script.url, {}, script.charset || "utf-8");
        },
        launchEditor: function(path){
            var editor = Services.prefs.getCharPref("view_source.editor.path");
            if (!editor) {
                toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
                return;
            }

            var UI = Cc['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Ci.nsIScriptableUnicodeConverter);
            var platform = window.navigator.platform.toLowerCase();
            UI.charset = platform.indexOf('win') > -1 ? 'GB2312' : 'UTF-8';
            path = UI.ConvertFromUnicode(path);

            var appfile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            appfile.initWithPath(editor);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            process.init(appfile);
            process.run(false, [path], 1, {});
        },
        copyName: function (aAddon) {
            this.copyToClipboard(aAddon.name);
        },

        getInstallURL: function(aAddon){
            aAddon = aAddon || this.win.gViewController.viewObjects.detail._addon;
            if(!aAddon) return null;

            var url = null;
            switch(aAddon.type){
                case "extension":
                case "theme":
                    url = (aAddon.contributionURL || aAddon.reviewURL) || null;
                    return url && url.replace(/\/developers|\/reviews/g, "") || aAddon.creator.url;
                case "greasemonkey-user-script":
                    return aAddon._script._downloadURL || aAddon._script._updateURL;
                case "userscript":
                    url = aAddon._downloadURL || aAddon._updateURL;
                    return url;
                case "userchromejs":
                    return aAddon.homepageURL || aAddon.reviewURL || aAddon.downloadURL || aAddon.updateURL;
                default:
                    return aAddon.homepageURL;
            }
        },

        get getPath(){
            var url = this.win.gViewController.viewObjects.detail._addon;
            if(!url) return false;
            return url.pluginFullpath || false;
        },
        setUrlOrPath :function(doc){
            var installURL = this.getInstallURL();
            if (!installURL && !this.getPath) return;

            if(!doc.getElementById("detail-InstallURL-row")){
                var value = "",label = "";
                if(this.win.gViewController.currentViewId.indexOf("detail")!= -1){
                    var aAddon = this.win.gViewController.viewObjects.detail._addon;
                    switch (aAddon.type){
                        case "extension":
                        case "theme":
                        case "greasemonkey-user-script":
                            value = installURL;
                            label = "%Installpage%";
                            break;
                        case "plugin":
                            value = this.getPath;
                            label = "%Path%";
                            break;
                    }
                }
                if(!!value && !!label){
                    var xul = "";
                    if(typeof(value) != "string"){
                        xul = "<vbox>";
                        for(var i=0;i< value.length;i++){
                            xul += ('<label class="detail-row-value text-link" crop="end" onclick="\
                                if(event.button == 0) { \
                                    AM_Helper.revealPath(this.value); \
                                } else if (event.button == 2){ \
                                    AM_Helper.copyToClipboard(this.value); \
                                } \
                                return false;" \
                                value="' + value[i] +'" href="'+ value[i] +'"/>');
                        }
                        xul += "</vbox>";
                    }else{
                        xul = '<label class="detail-row-value text-link" crop="end" onclick="\
                            if(event.button == 2){\
                                AM_Helper.copyToClipboard(this.value); \
                                return false;\
                            }" value="'+ value +'" href="'+ value +'"/>';
                    }
                    xul = '<row class="detail-row-complex" id="detail-InstallURL-row" label="'+ label +'">'+
                                '<label class="detail-row-label" value="'+ label +'"/>'+ xul +'</row>';
                    if(isCN){
                        xul = xul.replace(/\%Installpage\%/g, "安裝頁面").replace(/\%Path\%/g, "路徑");
                    }else{
                        xul = xul.replace(/\%/g,"");
                    }
                    // doc.getElementById("detail-rows").innerHTML += xul;
                    doc.getElementById("detail-rows").appendChild(doc.createElement("row")).outerHTML = xul;
                }
            }
        },
        revealPath: function(path){
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            if(file.exists())
                file.reveal();
        },
        copyToClipboard: function (aString) {
            Cc["@mozilla.org/widget/clipboardhelper;1"].
                getService(Ci.nsIClipboardHelper).copyString(aString);
        }
    };

    window.userChromeJSAddon = {
        scripts:[],
        unloads: [],

        init: function(){
	        if ('userchromejs' in AddonManager.addonTypes) return;

            this.initScripts();
            this.registerProvider();
            this.addStyle();
        },
        uninit: function(){
            this.unloads.forEach(function(func){ func(); });
        },
        initScripts: function(){
            var scripts = window.userChrome_js.scripts.concat(window.userChrome_js.overlays);

            var self = this;
            scripts.forEach(function(script, i){
                self.scripts[i] = new ScriptAddon(script);
            });
        },
        getScriptById: function(aId){
            for (var i = 0; i < this.scripts.length; i++) {
                if(this.scripts[i].id == aId)
                    return this.scripts[i];
            }
            return null;
        },
        registerProvider: function(){
            var types = null;
            if (AddonManagerPrivate.AddonType) {
                types = [new AddonManagerPrivate.AddonType(
                    "userchromejs",
                    "",
                    isCN ? "uc 腳本" : "userChrome JS",
                    AddonManager.VIEW_TYPE_LIST,
                    9000)];
            }

            let provider = {
                getAddonByID: function(aId, aCallback) {
                    let script = userChromeJSAddon.getScriptById(aId);
                    aCallback(script);
                },

                getAddonsByTypes: function(aTypes, aCallback) {
                    if (aTypes && aTypes.indexOf("userchromejs") < 0) {
                        aCallback([]);
                    } else {
                        aCallback(userChromeJSAddon.scripts);
                    }
                }
            };

            AddonManagerPrivate.registerProvider(provider, types);

            this.unloads.push(function(){
                AddonManagerPrivate.unregisterProvider(provider);
            });
        },
        addStyle: function(){
            let data = '@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
                \
                @-moz-document url("about:addons"), url("chrome://mozapps/content/extensions/extensions.xul") {\
                    #category-userchromejs > .category-icon {\
                        list-style-image: url(data:image/png;base64,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);\
                    }\
                }';
            let styleService = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
            let styleURI = Services.io.newURI("data:text/css," + encodeURIComponent(data), null, null);
            styleService.loadAndRegisterSheet(styleURI, Ci.nsIStyleSheetService.USER_SHEET);

            this.unloads.push(function(){
                styleService.unregisterSheet(styleURI, Ci.nsIStyleSheetService.USER_SHEET);
            });
        },
    };

    function ScriptAddon(aScript){
        this._script = aScript;

        this.id = this._script.url;
        this.name = this._script.filename;
        this.description = this._script.description;
        this.enabled = !userChrome_js.scriptDisable[this.name];

        // 我修改過的 userChrome.js 新增的
        this.version = this._script.version || null;
        this.author = this._script.author || null;
        this.homepageURL = this._script.homepageURL || null;
        this.reviewURL = this._script.reviewURL || null;
        this.reviewCount = 0;
        this.fullDescription = this._script.fullDescription || null;
        this.downloadURL = this._script.downloadURL || null;

        this.iconURL = iconURL;
    }

    ScriptAddon.prototype = {
        version: null,
        type: "userchromejs",
        isCompatible: true,
        blocklistState: 0,
        appDisabled: false,
        scope: AddonManager.SCOPE_PROFILE,
        name: null,
        creator: null,
        pendingOperations: AddonManager.PENDING_NONE,  // 必須，否則所有都顯示 restart
        operationsRequiringRestart: 6,
        // operationsRequiringRestart: AddonManager.OP_NEEDS_RESTART_DISABLE,

        get optionsURL(){
            if (this.isActive && this._script.optionsURL)
                return this._script.optionsURL;
        },

        get isActive() !this.userDisabled,
        get userDisabled() !this.enabled,
        set userDisabled(val) {
            if (val == this.userDisabled) {
                return val;
            }

            AddonManagerPrivate.callAddonListeners(val ? 'onEnabling' : 'onDisabling', this, false);

            if(this.pendingOperations == AddonManager.PENDING_NONE){
                this.pendingOperations = val ? AddonManager.PENDING_DISABLE : AddonManager.PENDING_ENABLE;
            }else{
                this.pendingOperations = AddonManager.PENDING_NONE;
            }

            this.enabled = !val;
            if(window.userChromejs){
                userChromejs.chgScriptStat(this.name);
            }

            AddonManagerPrivate.callAddonListeners(val ? 'onEnabled' : 'onDisabled', this);
        },
        get permissions() {
            // var perms = AddonManager.PERM_CAN_UNINSTALL;
            // perms |= this.userDisabled ? AddonManager.PERM_CAN_ENABLE : AddonManager.PERM_CAN_DISABLE;
            var perms = this.userDisabled ? AddonManager.PERM_CAN_ENABLE : AddonManager.PERM_CAN_DISABLE;
            // if (this.updateURL) perms |= AddonManager.PERM_CAN_UPGRADE;
            return perms;
        },

        uninstall: function() {
            AddonManagerPrivate.callAddonListeners("onUninstalling", this, false);
            this.needsUninstall = true;
            this.pendingOperations |= AddonManager.PENDING_UNINSTALL;
            AddonManagerPrivate.callAddonListeners("onUninstalled", this);
        },
        cancelUninstall: function() {
            this.needsUninstall = false;
            this.pendingOperations ^= AddonManager.PENDING_UNINSTALL;
            AddonManagerPrivate.callAddonListeners("onOperationCancelled", this);
        },
    };


    AM_Helper.init();

    userChromeJSAddon.init();

    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }
})();