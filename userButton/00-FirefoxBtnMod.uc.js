// ==UserScript==
// @label                  CustomFirefoxMenu.uc.js
// @description       火狐選單
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 45+
// @charset              UTF-8
// @version              2016.7.29
// @include              main
// @include              chrome://browser/content/browser.xul
// @note                   2016.7.30 部分元素使用複製 調整代碼
// @note                   2016.7.17 V2修正CSS新視窗移動按鈕沒有圖示的問題
// @note                   2016.7.17 修正PanelUI按鈕右鍵選單 新視窗無效的問題
// @note                   2016.7.16 重寫代碼 使用新函數
// @homepageURL    https://github.com/skofkyo/userChromeJS/blob/master/userButton/00-FirefoxBtnMod.uc.js
// ==/UserScript==
(function() {

    var mode = 0;//位置 0可移動按鈕 1頁面右鍵選單 2僅PanelUI按鈕右鍵選單
    var PUb = true;// true/false 移動按鈕模式時是否同時添加PanelUI按鈕右鍵選單

    var CustomFirefoxMenu = {
        
        startup: function() {
            if (PUb && mode !== 1 && mode !== 2 || mode == 2) this.addPUContextMenu();
        },
        
        init: function() {
            this.addmenuitem();
            if (mode == 0) {this.addmenumovebtn();} else if (mode == 1) {this.addContextMenu();}
            this.addstyle();
        },

        addmenumovebtn: function() {
            CustomizableUI.createWidget({
                id: 'CustomFirefoxMenu',
                type: 'custom',
                defaultArea: CustomizableUI.AREA_NAVBAR,
                onBuild: function(aDocument) {
                    var tb = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                    var props = {
                        id: 'CustomFirefoxMenu',
                        class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                        removable: 'true',
                        overflows: "false",
                        label: '火狐選單',
                        tooltiptext: "火狐選單",
                        type: 'menu',
                        popup: "CustomFirefoxMenuPopup"
                    };
                    for (var p in props)
                        tb.setAttribute(p, props[p]);
                    return tb;
                }
            });
        },

        addContextMenu: function() {
            var ins = $("contentAreaContextMenu").firstChild;
            ins.parentNode.insertBefore($C("menu", {
                id: "CustomFirefoxMenu",
                class: "menu-iconic",
                label: "火狐選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",
            }), ins);
            var m = $('CustomFirefoxMenu');
            var mp = $('CustomFirefoxMenuPopup');
            mp.removeAttribute("position");
            m.appendChild(mp);
        },

        addmenuitem: function() {
            var mp = $C("menupopup", {
                id: "CustomFirefoxMenuPopup",
                position: "after_start",
            });
            $('mainPopupSet').appendChild(mp);
            
            var menues = [
            {moveid: "file-menu"}, 
            {moveid: "edit-menu"}, 
            {moveid: "view-menu"}, 
            {moveid: "history-menu"}, 
            {moveid: "bookmarksMenu"}, 
            {moveid: "tools-menu"}, 
            {moveid: "helpMenu"}, 
            {label: "sep"}, 
            {moveid: "menu_preferences",clone: true}, 
            {moveid: "fullScreenItem",clone: true}, 
            {moveid: "charsetMenu"}, 
            {moveid: "menu_openDownloads",clone: true}, 
            {moveid: "menu_openAddons",clone: true}, 
            {moveid: "webDeveloperMenu"}, 
            {
                label: "錯誤主控台",
                tooltiptext: "錯誤主控台",
                oncommand: "toJavaScriptConsole();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC"
            }, 
            {label: "sep"}, 
            {moveid: "aboutName",clone: true}, 
            {
                label: "重新啟動瀏覽器",
                tooltiptext: "重新啟動瀏覽器",
                oncommand: "Services.appinfo.invalidateCachesOnRestart() || ('BrowserUtils' in window) ? BrowserUtils.restartApplication(): Application.restart();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII="
            }, 
            {moveid: "menu_FileQuitItem",clone: true}
            ];

            var i, item, menue, mid;
            for (i = 0; i < menues.length; i++) {
                menue = menues[i];
                mid = menue.moveid;
                if (mid) {
                    if (mid != null && menue.clone) {
                        mp.appendChild($(menue.moveid).cloneNode(true));
                    } else if (mid != null) {
                        mp.appendChild($(menue.moveid));
                    }
                } else if (menue.label == "sep") {
                    item = $C("menuseparator");
                    mp.appendChild(item);
                } else {
                    item = $C('menuitem', {
                        label: menue.label,
                        class: "menuitem-iconic",
                        tooltiptext: menue.tooltiptext,
                        oncommand: menue.oncommand,
                        image: menue.image,
                    });
                    mp.appendChild(item);
                }
            }

        },
        
        addstyle: function() {
            //移動按鈕的樣式
            var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
            + '#CustomFirefoxMenu .toolbarbutton-icon' 
            + '{list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADmElEQVRYhcWX308cVRTH5w/Ap91F0BLjkxIfTPR19cHaqLEo0QeMDya2D41EdhZKq5ISSZvIIuAuP0KLiYJNLErCryWlPxbTVvsjRTC1QQslEhDB2dndmZ2dmd2d2Zn79QFd3GXnx6KFk9yHmdxzvp85555771AURVEbtSWVDO2cCNMOkfW68CBHmHbIDO2c3KgtqaT+JS48aOH8wdBOYaO2pJJiaOfEbotnIeqcQWo30m5YDo9DoopxiPnckM5/Ajnkh3ypA/LFdsiXP9t8nu6CONqEaPNTRUHYAuDankfy6mkkznkQ+eDxwvPqSyEMHkbq9hDiZ2rA1pfuHCB64kkIA4fAel0QR5sgjnwEtqHMOmBDGbiO/ZBDAajLM5AmTyJy/LHiAaQpHzRmEeJwI3j/y9n38b43oPxyGcLAu8ZZ+OIdqCtzgKYAALTwEqItTxtmriBAZnUOAKCuzCL90yiU+YtIz40AhCA1861lJiKNj0IKtoBkNiEyfy4g8fX79gH0BAsjS5zz2F5g8b43s5nQ+XXEfG5rgMixCpCUYAigJ1iIYyeQ+KYefPdBSwhxrDnrK11oswaQgi2G4vkmTbVaAvBdr2YzqixcsQbQoiuWwkTmIJw9YqsMcsgPXYxuZk9gEGncZwzA+dwA0S0B4v1v2V4H+Rnle143AejYb66sqcisziExRNsHuPBpTghx5ENjAL632lRfmvL93e8P2+uCz99G6vZQTox8+BwAYeCQKUD67nnbWyzrdSH14zBIWswt35kakxK0v2BeAgDKryHwPa+B63wRciiAzPo81KUfwBXo8fSd4Db/2KlnzbtA59YsIfJNYxYhjjXnAhx9BJm1n3Pm6QJj3YbJG4O2hUlahBRs2XZQcT43hMHDgK7lzE/dGLQG4DoPmKvqGpLXvwTfXYXIsYptAWMnn4EW+x3q/e+3ufKBV6wBWK8LysIVy69X5i+B97+05ddQDuHskeymk2/q8kzBhVoQgPO5s4eIlZFkHFp0FUSRTSYRw3PD8EYkjn9sC8COJa/1G7aq6ZUsdfOr/yyevhME21C+MwC2vhTydBdASPHKhEAOBSx3TVuXUr63Gpk/7trWVn+7VXDF7xggC9JdheTV01BXZqFLMZCMApKWoEWWodz7DtJUK7i252zHY70uUGHaIRfj8H+OsMchUQztnNxDgPG9/Dnl19976ImtP+Q6ZzDscUi7kfawxzH+j/hf6BR628uPQMQAAAAASUVORK5CYII=)}' 
            + '}';
            var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
            var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
            sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
        },
        
        addPUContextMenu: function(event) {
            var pb = $("PanelUI-button")
            pb.addEventListener("contextmenu", function(event) {
                $("CustomFirefoxMenuPopup").openPopup(this, "after_pointer", 0, true, false);
                event.preventDefault();
            }, false);
        },

    };

    CustomFirefoxMenu.startup();
    CustomFirefoxMenu.init();
    window.CustomFirefoxMenu = CustomFirefoxMenu;

    function $(id) document.getElementById(id);

    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }

}());
