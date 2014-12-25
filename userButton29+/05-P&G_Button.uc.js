// ==UserScript==
// @name                 P&G_Button.uc.js
// @description       貼上就瀏覽&貼上就搜索
// @namespace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.11.26
// @startup        
// @shutdown       
// @config         
// @homepageURL    
// @ohomepageURL    
// @reviewURL    
// @downloadURL    
// @note                   
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 貼上就瀏覽&貼上就搜索 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
(function () {
    CustomizableUI.createWidget({
        id : "RFC-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "貼上就瀏覽",
        tooltiptext : "左鍵：貼上就瀏覽(新分頁背景)\n中鍵：貼上就瀏覽(新分頁前景)\n右鍵：貼上就瀏覽",
        onClick : function (event) {
            switch (event.button) {
            case 0:
               gBrowser.addTab(readFromClipboard());
                break;
            case 1:
                gBrowser.selectedTab = gBrowser.addTab(readFromClipboard());
                break;
            case 2:
                 loadURI(readFromClipboard());
                break;
            }
        }
    });
    
    var btn = document.querySelector("#RFC-button");
    btn.setAttribute("context", "_child");
    var image1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANYSURBVDhPbZFbTJNnHMa/C8VtVaCODqW0CP360RpRYdMOQdBWsdATbW1HOZWWQjm02HKQU1eGpMREIigajZqQoHFkGhHjIQo74IiGhAESpRovuqvdbAlZsmUhIo/v92nILnyTX96b//N7n/xfar+YWqeVUp8QeFqa4ukkFC9TnshLFgsDX8THT4oShef2pEk3qpkono7M6BiClPqUsD46ivr4sZcWXa9yVf5RUlr2r8NR8WeL3zMnEMQxH5225Sb1eHXMAmEp4MpbGhn5fml+fn45HA6/XVx8sRoOL7599erlytjY7b97jlmX2DnCa8JwXPQGMWVXJT/pKd7+5mSpHCec+xEIBODz+eD1etdQN0jh8FgRrFKjr0yGfrt8pcUs/0cQsyGNFcy1HZWj2ZSKGo0MlsMZMCp3ovBg2hrK1k3QdO6CQilFnYZGszEV9VopSIPdnIDY0GSSwWdIRZ32PS61FBWHJbAfkkB/QojTE24U9WfjQEkSnEdo+AtlrCBjTdBMBBxEpq3l44grFipHNDING1EYEmHwqROhnw3wXFMhtzgBbtJg86YoBSdgQ2yDdtuXHPruRFyebMX5n/wY/NGLwckahKY0cI9vRd9verTdLsCh6kTwhevd7wUk3GiUIejIQdCZC2MoCecn6+G9kUFIR90YA8edzXCNx8DzRIBTC2oE72uhahFFOEETCfsLU7kwiym0DZemmtA8mo2m0Swcv/c16h+kwPUoBrW/8tE4LcLArAUNV5WrnIANHyMLDHxoYOpNwfD0twje0yB4twBdD/PQMZGJmodbUDURi94ZFboeaKHsTF/mBD4i8OoZdJRncw3MvTTuPruI0bkBjM7249ZcP4Znj6P7FyVOPTVzO8hpVSBaLr3CCdjXPVoGjZZ0bol7S2goylOw9wO2vh248/wMhqbb0faDFQp/DmzlJvD5sXmcoIG8XltAo4YlXwJ3PgNjVhLUX4m42xKicXPmDDxDR7GvRQ17ZTFOt5chPi6G+8bHDTpmuY6Ea/NZAU0ENMz7RNDsSYAlW4y8zs9RMZCPXZXFq+WVtuWznXZc6HIiIZ6fQZmzRB3VaskUIfJ/iCCiVwgj3+SIIwerP/svy2pYMRh1f33nMf8e8lkjLFsFsdvfARA31F/rldguAAAAAElFTkSuQmCC";
    var image2 = "data:image/png;base64,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";
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#RFC-button .toolbarbutton-icon {list-style-image:url('+image1+')}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();

(function () {
    CustomizableUI.createWidget({
        id : "searchClipboard-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "貼上就搜索",
        tooltiptext : "左鍵：Google搜索剪貼簿文字\n中鍵：翻譯剪貼簿文字\n右鍵：Google站內搜索選取文字否則搜索剪貼簿文字",
        onClick : function (event) {
            switch (event.button) {
            case 0:
               gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(readFromClipboard()));
                break;
            case 1:
						var div = content.document.documentElement.appendChild(content.document.createElement("div"));
						
						div.style.cssText = "position:absolute;\
						z-index:1000;\
						border:solid 3px hsla(220,65%,84%,1);\
						border-radius: 5px;\
						background-color:InfoBackground;color:InfoText;\
						padding:5px;\
						font-size: 10pt;\
						color: black;\
						left:" + +(event.clientX + content.scrollX ) + 'px;top:' + +(event.clientY + content.scrollY ) + "px";
						
						var xmlhttp = new XMLHttpRequest;
						xmlhttp.open("get", "http://translate.google.tw/translate_a/t?client=t&sl=en&tl=zh-TW&text=" + encodeURIComponent(readFromClipboard()), 0);
						xmlhttp.send();
						div.textContent = eval("(" + xmlhttp.responseText + ")")[0][0][0];
						content.addEventListener("click", function() {
						content.removeEventListener("click", arguments.callee, false);
						div.parentNode.removeChild(div);
						}, false);
                break;
            case 2:
               var selection = content.document.getSelection().toString();
               var gbs = getBrowserSelection();
               if (selection || gbs) {
                 loadURI("http://www.google.com/search?q=" + "site:" + content.location.host + " " + encodeURIComponent(selection || gbs));
               } else {
                 loadURI("http://www.google.com/search?q=" + "site:" + content.location.host + " " + encodeURIComponent(readFromClipboard()));
               }
                break;
            }
        }
    });
    
    var btn = document.querySelector("#searchClipboard-button");
    btn.setAttribute("context", "_child");
    var image1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANGSURBVDhPbZJrTFJhHMbPh66jy1bZzUsX5ACVtXXbXLlWDdEE77YsnICABxIFBW8RE3DaulmKpimGXa1mabOs7GJXc9lilRL1QavVl9ZcrT5U2tN7qNVsne335ez//z3Pe85LRYRQYyQ8agKBIwmlOFIuxQkXBnEWhARaZs6adSs4KNC5Kow3KYoex5GSGSlN4FETCWOnjKP+/6TLtpxUqzLebZOlfVEo5O/NxqzHAQEz6P9Op66b59BL6SeEIYsqcqi5+dSQx+P56vV6R/r7+354vf0jPt/z4ba21o+OnM1D7BzhJeHojCnjQ6j0jQvuO7Yu+r5LJoRdGQGLxQKDwQC9Xj8Km82GUm0M9qYJUJEuHDYnCT8HTB0fxgoeFyYLYUrkg4kRIEW0HAkbliJ+fdgoUiJXQB2zGLlxNEwJfGyX8EAaLPMLiA15iQIY4vjQSQhSIQo18Th9rAEdV66h/UIb9tlNYBJWQCXmgonmITdBANLgr8BEBH6SFsFZZkbLlR7sdnfi0JkulLsuoeL4DVzvvApD6lp/EBv6R2D63SCPWK1MLNqu9aDm9HW8GHiDZ74B3Ot9isqmC3AcvojWsydgTl7yj4Aks5WM8QI01uyGnQzefODBg0dPcKe7F503b6OsygWN9RDukPdWtXi0gE02xvP91c6ccKOosgXnO26gtf0yzp07j+qaamTlmpFZuAeXunqxp0iJcl0k5kyf/OsbsMs5ZDk7lkb9wVJy5g4UOvajwFICRqMAo0iBdrsOTHEF7nY/hNOmRZ0tA0Gzp/0SGIhAT5bJ5UCBQoR7PR6odjixVclAti0VjDoNmpwCuFpuwVVbidqSjNECNj1LQvv/rS6GB0eeHN0PPdjn7kBeuQslVc1o73qEvr4+NDW5UWxUwWlV/m3AVtduCgXDEs1FZhQX8rhw2IoMcNfXoPZAGTSbN4KRxY643UdQV1cHS342Vi1fJmaPcDtbSn/VkWVtNCsIRSYhMTwY0SvnInHtfMjFfKSLQrFTLf6SrUz61tBQj8bGRtjt9kEqaU1wsSaKe5cwwEJu2qBStHBQujrwVVwE/bY0X/PBVVX+yWqUf9BtWf82XyV9rUgWvT+wf++wz+fDT0mU+xExjL1SAAAAAElFTkSuQmCC";
    var image2 = "data:image/png;base64,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";
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#searchClipboard-button .toolbarbutton-icon {list-style-image:url('+image1+')}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
