// ==UserScript==
// @name            showLocationModEx.uc.js
// @charset         UTF-8
// @description     顯示國旗與IP
// @include         chrome://browser/content/browser.xul
// @author          紫雲飛
// @note            version20160821: mod by skofkyo
// @note            version20130719: mod by lastdream2013 
// ==/UserScript==
(function() {
    //改這裡選擇是否加載本地國旗圖示庫，不存在或路徑錯誤自動切換從網絡中讀國旗圖示
    var localFlagPath = "\\Local\\countryflags.js"; // 注意是相對路徑： profile\chrome\Local\countryflags.js
    //改這裡選擇顯示國旗圖示/IP位置
    var showLocationPos = "urlbar-icons"; // urlbar-icons   identity-box
    var IsUserLocalFlag = false;
    var FullPath = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("UChrm", Ci.nsILocalFile).path + localFlagPath;
    var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
    file.initWithPath(FullPath);
    if (file.exists()) {
        IsUserLocalFlag = true;
        userChrome.import(localFlagPath, "UChrm");
    }
    gBrowser.addEventListener("DOMWindowCreated", function(event) {
        var self = arguments.callee;
        if (!self.showLocation) {
            window.addEventListener("TabSelect", self, false);
            self.showLocation = document.getElementById(showLocationPos);
            if (showLocationPos == "identity-box") { 
                self.showFlag = self.showLocation.insertBefore(document.createElement("image"), self.showLocation.childNodes[1]);
                self.showFlag.id = "showLocationModEx";
                self.showFlag.style.marginLeft = "4px";
                self.showFlag.style.marginRight = "2px";
            }
            if (showLocationPos == "urlbar-icons") { 
                self.showFlag = self.showLocation.insertBefore(document.createElement("image"), self.showLocation.firstChild);
                self.showFlag.id = "showLocationModEx";
                self.showFlag.style.margin = "0 2px";
            }
            //單擊時複製
            self.showFlag.addEventListener("click", function() {
                Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(self.showFlag.tooltipText);
            }, false);
            //設置等待時國旗圖示
            self.showFlag.src = self.flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2TwW7aQBRF+ZDku0q/qChds5mxkDG2iY3H9jyTBFAWLAgRG7CwCawQi6BEQhgEFkiAuF3VaVXaSlWvdBazuGfx5r1c7n/H9/1rIvpCAUWS5E6S3FFAkU9+wff967+VP1FA6fPzMwaDAcbjMQaDAabTKSggEFEqpcxfLEvp5huNxnmxWGC73SIMQ9Tv6gjqAbrdLqT0Ub+rg4jOUro/S4QQV57nbZMkwel0wvF4xGazQafTgeu5GY1GA8PhEMITqRDiKhM4jnPTbrdxOBxwOByQJAlcz4UQ4heiKILruXAc52smsGzrpd/v4/X1FcPhEBQQ7Jp9kVarhdlsBsu2Xj4E1u3x/v4eRATLuv0tQT3AdDrFcrmEZd2eMoFZNXdm1cSP2DUbZtUEEYECglk1MRqNkKYp3t/fYZjGPhPohh7rhg7d0PH09IQ4jjGbzdBsNtHr9SBcAd3QMZlMMJ/PEYYhdEOPM0G5Ur7RKhoeHx+xWq2wXq+xXq/x9vaGVqsFraJBq2jQDT17l8vljyFyzq9UVd2qqoooirBarTLCMIRds6GqKgzTgOPUoKpqyjn/+MZcLpdTFCVfKpXOlm1huVwiSRIkSYLFYgGzauLh4QHNZhNaRTsrinJ5GxljeUVRUil99Ho9dLtduJ4LKX0QERRFSTnnny+Wv6dYLF4zxgqMsZhzvuec7xljMWOsUCwW/3xM/5JvTakQArDW8fcAAAAASUVORK5CYII=";
            self.isReqLocationHash = [];
            self.isReqFlagHash = [];
            self.showFlagTooltipHash = [];
            self.showFlagHash = [];
            self.flagPath = 'http://www.razerzone.com/asset/images/icons/flags/' //備用：self.flagPath = 'http://www.1108.hk/images/ext/'
        }
        try {
            var host = (event.originalTarget.location || content.location).hostname;
            if (!/tp/.test(content.location.protocol)) {
                (event.type == "TabSelect" || event.originalTarget == content.document) && (self.showFlag.src = self.flag);
                return
            }
            var ip = Components.classes["@mozilla.org/network/dns-service;1"].getService(Components.interfaces.nsIDNSService).resolve(host, 0).getNextAddrAsString();
            var server = (gBrowser.mCurrentBrowser.webNavigation.currentDocumentChannel.QueryInterface(Components.interfaces.nsIHttpChannel).getResponseHeader("server").match(/\w+/) || ["未知"])[0];
            if (!self.showFlagTooltipHash[host]) {
                (event.type == "TabSelect" || event.originalTarget == content.document);
                self.isReqLocationHash[host] = true;
                let req = new XMLHttpRequest();
                req.open("GET", 'http://www.cz88.net/ip/index.aspx?ip=' + ip, true);
                req.send(null);
                req.onload = function() {
                    if (req.status == 200) {
                        var lmsg = req.responseText.match(/"InputIPAddrMessage">([^<]+)/);
                        if (lmsg)
                            var location = lmsg[1].replace(/\s*CZ88.NET.*/, "") + " \n";
                        else
                            var location = "";
                        //設置文字提示內容
                        self.showFlagTooltipHash[host] = location + server + " \n" + ip;
                        host == content.location.hostname && (self.showFlag.tooltipText = self.showFlagTooltipHash[host]);
                    }
                    self.isReqLocationHash[host] = false;
                }
            } else {
                host == content.location.hostname && (self.showFlag.tooltipText = self.showFlagTooltipHash[host]);
            }
            if (!self.showFlagHash[host]) {
                (event.type == "TabSelect" || event.originalTarget == content.document) && (self.showFlag.src = self.flag);
                self.isReqFlagHash[host] = true;
                let req = new XMLHttpRequest();
                req.open("GET", 'http://freegeoip.net/json/' + ip, true);
                req.send(null);
                req.onload = function() {
                    if (req.status == 200) {
                        var responseObj = JSON.parse(req.responseText);
                        self.showFlagHash[host] = responseObj.country_code.toLocaleLowerCase();
                        host == content.location.hostname;
                        if (IsUserLocalFlag) {
                            self.showFlag.src = CountryFlags[self.showFlagHash[host]];
                        } else {
                            self.showFlag.src = self.flagPath + self.showFlagHash[host] + ".gif";
                        }
                    }
                    self.isReqFlagHash[host] = false;
                }
            } else {
                host == content.location.hostname;
                if (IsUserLocalFlag) {
                    self.showFlag.src = CountryFlags[self.showFlagHash[host]];
                } else {
                    self.showFlag.src = self.flagPath + self.showFlagHash[host] + ".gif";
                }
            }
        } catch (e) {
            (event.type == "TabSelect" || event.originalTarget == content.document) && (self.showFlag.src = self.flag);
        }
    }, false)
})();