// ==UserScript==
// @name         View in other browser
// @include      chrome://browser/content/browser.xul
// @include      chrome://browser/content/history/history-panel.xul
// @include      chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include      chrome://browser/content/places/places.xul
// @author       Cye3s
// @modified    skofkyo
// @modified    Kelo
// @version      1.5
// @note           2016.7.26   支持WIN10 Edge覽器 瀏覽器不存在時選單禁用 by skofkyo
// @note           2015.4.4   增加多個瀏覽器 by Kelo http://bbs.kafan.cn/thread-1820331-1-1.html
// @note           2015.4.5   精簡、重寫代碼 修復在側邊欄選單顯示 和 增加在收藏庫顯示 by Kelo 
// @note           2015.4.5   增加圖示可選，沒有則用系統圖示 by Kelo 
// @note           2015.4.11 增加階層式選單功能 by Kelo 
// ==/UserScript==
var LaunchBrowser = {
    //使用階層式選單；true使用，false不使用
    ismenu: true,
    //設置多個瀏覽器
    browsers: [{
        name: 'Internet Explorer', //名字
        //瀏覽器檔案位址
        //path: 'C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe', //WIN64位元使用32位元IE
        path: 'C:\\Program Files\\Internet Explorer\\iexplore.exe', //WIN64位元使用64位元IE
        //image: '' //可選，沒有則用系統圖標
    }, {
        name: 'Edge',
        path: 'microsoft-edge:',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC',
    }, {
        name: 'CentBrowser',
        path: 'C:\\CentBrowser_x64\\chrome.exe',
    }, {
        name: 'MyChrome',
        path: 'C:\\MyChrome\\MyChrome.exe',
    }, {
        name: 'GoogleChrome',
        path: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', //WIN64位元安裝版預設路徑
    }, {
        name: 'Opera',
        path: 'C:\\Program Files (x86)\\Opera\\launcher.exe', //WIN64位元安裝版預設路徑
    }],
    
    init: function() {
        for (var i = 0; i < this.browsers.length; i++) {
            let browsers = this.browsers[i];
            let mItemPlace = $C('menuitem', {
                class: "menuitem-iconic",
                label: '在' + browsers.name + '中打開',
                selection: 'link',
                selectiontype: 'single',
                path: browsers.path,
                disabled: this.setdisabled(browsers.path),
                image: browsers.image || this.setIcon(browsers.path),
                oncommand: "LaunchBrowser.launch(this.getAttribute('path'))"
            });
            if (this.ismenu && popupPlace) popupPlace.appendChild(mItemPlace);
            else if (this.ismenu && !popupPlace) {
                var popupPlace = document.createElement("menupopup");
                popupPlace.appendChild(mItemPlace);
            } else $('placesContext').insertBefore(mItemPlace, $('placesContext_open:newprivatewindow').nextSibling);
        }

        if (this.ismenu) {
            let menuPlace = $C('menu', {
                id: "placesContext_LaunchBrowser",
                class: "menu-iconic",
                label: '在其他瀏覽器開啟',
                accesskey: "U",
                selection: 'link',
                selectiontype: 'single',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII=",
                //image: this.browsers[0].image || this.setIcon(this.browsers[0].path),
                //onclick: "if(event.target!=event.currentTarget)return;var firstItem=event.currentTarget.querySelector('menuitem');if(!firstItem)return;if(event.button===1){checkForMiddleClick(firstItem,event);}else{firstItem.doCommand();closeMenus(event.currentTarget);}"
            });
            menuPlace.appendChild(popupPlace);
            $('placesContext').insertBefore(menuPlace, $('placesContext_open:newprivatewindow').nextSibling);
        }
    },

    launch: function(path) {
        var n = document.popupNode;
        if (path == "microsoft-edge:") {
            if (n.node && n.node.uri) {
                openUILink(path + n.node.uri)
            } else if (n._placesNode && n._placesNode.uri) {
                openUILink(path + n._placesNode.uri)
            } else if (n.parentNode.view.nodeForTreeIndex(n.parentNode.view.selection.currentIndex) && n.parentNode.view.nodeForTreeIndex(n.parentNode.view.selection.currentIndex).uri) {
                openUILink(path + n.parentNode.view.nodeForTreeIndex(n.parentNode.view.selection.currentIndex).uri)
            }
        } else {
            var shellServicr = Cc['@mozilla.org/browser/shell-service;1'].getService(Ci.nsIShellService);
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            if (n.node && n.node.uri) {
                shellServicr.openApplicationWithURI(file, n.node.uri);
            } else if (n._placesNode && n._placesNode.uri) {
                shellServicr.openApplicationWithURI(file, n._placesNode.uri);
            } else if (n.parentNode.view.nodeForTreeIndex(n.parentNode.view.selection.currentIndex) && n.parentNode.view.nodeForTreeIndex(n.parentNode.view.selection.currentIndex).uri) {
                shellServicr.openApplicationWithURI(file, n.parentNode.view.nodeForTreeIndex(n.parentNode.view.selection.currentIndex).uri);
            }
        }
    },

    setIcon: function(path) {
        var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
        file.initWithPath(path);
        if (!file.exists()) return "chrome://browser/skin/aboutSessionRestore-window-icon.png";
        let fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(file);
        return "moz-icon://" + fileURL + "?size=16";
    },

    setdisabled: function(path) {
        if (path == "microsoft-edge:") {
            return "false";
        } else {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            if (!file.exists()) {
                return "true";
            } else {
                return "false";
            }
        }
    },

};

LaunchBrowser.init();

function log() {
    Application.console.log('[VIOB] ' + Array.slice(arguments));
}

function $(id) document.getElementById(id);

function $C(name, attr) {
    var el = document.createElement(name);
    if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
    return el;
}