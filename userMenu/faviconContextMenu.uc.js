// ==UserScript==
// @label                  faviconContextMenu.uc.js
// @description       给地址栏图标加上右键菜单
// @author               noname
// @modified          小蛐蛐，skofkyo
// @license               MIT License
// @charset              UTF-8
// @version              2016.8.23
// @include              chrome://browser/content/browser.xul
// @note                   2016.8.23 CSS加載xul版改寫成uc.js by skofkyo
// @note                   http://g.mozest.com/viewthread.php?tid=43101
// ==/UserScript==
(function() {

    var faviconContextMenu = {

        init: function() {
            this.additem();
            $("identity-icon").setAttribute("context", "faviconContextMenu");
            //$("urlbar").setAttribute("context", "faviconContextMenu");
        },

        additem: function() {
            var mp = $C("menupopup", {
                id: "faviconContextMenu",
            });
            $('mainPopupSet').appendChild(mp);
            var menues = [{
                label: "清空地址栏",
                oncommand: "(gURLBar.value = '') || gURLBar.focus();",
            }, {
                label: "还原地址栏地址",
                oncommand: "(gURLBar.value = gBrowser.currentURI.spec) || gURLBar.focus();",
            }, {
                label: "sep",
            }, {
                label: "复制当前标签地址",
                oncommand: "faviconContextMenu.Copy(gBrowser.currentURI.spec);",
            }, {
                label: "复制当前标签标题+地址",
                oncommand: function() {
                    faviconContextMenu.Copy(content.document.title + '\n' + gBrowser.currentURI.spec);
                },
            }, {
                label: "复制当前标签标题+地址（简短）",
                oncommand: function() {
                    faviconContextMenu.Copy(content.document.title.replace(/\s-\s.*/i, '').replace(/_[^\[\]【】]+$/, '') + '\n' + gBrowser.currentURI.spec)
                },
            }, {
                label: "sep",
            }, {
                label: "粘贴并在当前标签打开",
                oncommand: "openUILinkIn(readFromClipboard(), 'current', true);",
            }, {
                label: "粘贴并在新标签打开（前台）",
                oncommand: "openUILinkIn(readFromClipboard(), 'tab', true);",
            }, {
                label: "粘贴并在新标签打开（后台）",
                oncommand: "gBrowser.loadOneTab(readFromClipboard(), null, null, null, true);",
            }, {
                label: "sep",
            }, {
                label: "向上一层",
                oncommand: "faviconContextMenu.goUpperLevel();",
            }, {
                label: "向上到根域名",
                oncommand: "faviconContextMenu.goUpperRoot();",
            }, {
                label: "sep",
            }, {
                label: "可见区域截图",
                oncommand: "faviconContextMenu.ScreenShot();",
            }, {
                label: "整个网页截图",
                oncommand: "faviconContextMenu.WebScreenShot();",
            }, {
                label: "sep",
            }, {
                label: "复制站点图标地址",
                oncommand: "faviconContextMenu.Copy(gBrowser.selectedTab.image);",
            }, {
                label: "复制站点图标（base64 编码）",
                oncommand: "faviconContextMenu.toBase64(gBrowser.selectedTab.image);",
            }, {
                label: "保存站点图标",
                oncommand: "saveURL(gBrowser.selectedTab.image, null, null, false, null, null, document);",
            }, ];
            var i, item, menue;
            for (i = 0; i < menues.length; i++) {
                menue = menues[i];
                if (menue.label == "sep") {
                    item = $C('menuseparator');
                } else {
                    item = $C('menuitem', {
                        label: menue.label,
                        class: "menuitem-iconic",
                        oncommand: menue.oncommand,
                    });
                }
                mp.appendChild(item);
            }
        },

        Copy: function(string) {
            Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(string);
        },

        goUpperLevel: function() {
            var uri = gBrowser.currentURI;
            if (uri.path == "/")
                return;
            var pathList = uri.path.split("/");
            if (!pathList.pop())
                pathList.pop();
            loadURI(uri.prePath + pathList.join("/") + "/");
        },

        goUpperRoot: function() {
            var uri = gBrowser.currentURI;
            loadURI(uri.prePath + "/");
        },

        toBase64: function(icon) {
            const NSURI = "http://www.w3.org/1999/xhtml";
            var img = new Image();
            var that = this;
            img.onload = function() {
                var width = this.naturalWidth,
                height = this.naturalHeight;
                var canvas = document.createElementNS(NSURI, "canvas");
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                that.Copy(canvas.toDataURL("image/png"));
            };
            img.onerror = function() {
                Components.utils.reportError("Count not load: " + icon);
            };
            img.src = icon;
        },

        ScreenShot: function() {
            var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            canvas.width = content.innerWidth;
            canvas.height = content.innerHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
            saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, false, null, null, document);
        },

        WebScreenShot: function() {
            var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            canvas.width = content.document.width || content.document.body.scrollWidth;
            canvas.height = content.document.body.scrollHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
            saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, false, null, null, document);
        },

    };

    faviconContextMenu.init();
    window.faviconContextMenu = faviconContextMenu;

    function $(id) document.getElementById(id);

    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) {
            if (typeof attr[n] === 'function') {
                el.setAttribute(n, '(' + attr[n].toSource() + ').call(this, event);');
            } else {
                el.setAttribute(n, attr[n]);
            }
        });
        return el;
    }
}());