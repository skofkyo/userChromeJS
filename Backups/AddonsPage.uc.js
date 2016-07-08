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

    var iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABh0lEQVRIie3XMWvCQBQH8PQT1I9TKDd0KIXSLjf0S7hkDbVVOI5ChkI7nBbbYkEchJLGSSwFJVA6iCJEl8QpoC656fbX6UJUtG30msWD/3BJ4HeX944QTYsNPWND0lweVAaapu1pSYaesUEIkSgEM7g+rDipwAQzuELP76nABDPIHT2+pgITzKBwXK6kAhPMIH9SLqcCE8wgf/pwlwpMMIPCWclMBSaYQeG8eKMEXpe33AD0ffvj32EhBOgZGzaCeciXrnmuD8E4UAd7rg8GohE+m0zBQDTKU+5FDTzsjuZgq9QAA1HwXB/aVgcMRKHn9NXD9OIWamY9ul8z6/DZ/FIP18z63FxZjRdhOTcQXblTJbAQAoJxAPfZ4nabi4ccht3RWlhGNlfb6mwOr3q1ct5z+jCbTKPnDUTBKjXUwjzkYCAKzWpr+3AwDqLaxRtJLkTWtuf0oVltrW2yPzeXrJ2M5/pLC5OJn+mtdDUP+VwtFzObTH88yxt/JJJmB+/gxD9tv0nc+gZjLh8uVTXRaQAAAABJRU5ErkJggg==";  // uc 腳本列表的圖標

    var Config = {
        debug: 1,  // 1 則uc管理界面右鍵菜單會有 "重載 uc 腳本" 的菜單
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
                        list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXUlEQVR42mNgGBTg////rUD8GYv4Z5AcMQb8AeL/WMRB4CcxBvzHY8D/IWQAEFgjiVmTYsCz/6SBnyixA+R4AfFzEg35TJbXSE1gxIUBzQ2gxAvPKA1EXLHzCxaNAK9FN8ij3sDEAAAAAElFTkSuQmCC);\
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