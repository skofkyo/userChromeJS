// ==UserScript==
// @name                  P&G_Button.uc.js
// @namespace        
// @description    
// @include               main
// @compatibility     Firefox 29.0+
// @author                skofkyo
// @charset      utf-8
// @homepage         
// @version              
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 貼上就瀏覽&貼上就搜索 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
(function () {
    CustomizableUI.createWidget({
        id : "RFC-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "\u8CBC\u4E0A\u5C31\u700F\u89BD",
        tooltiptext : "\u5DE6\u9375\uFF1A\u8CBC\u4E0A\u5C31\u700F\u89BD(\u65B0\u5206\u9801\u80CC\u666F)\n\u4E2D\u9375\uFF1A\u8CBC\u4E0A\u5C31\u700F\u89BD(\u65B0\u5206\u9801\u524D\u666F)\n\u53F3\u9375\uFF1A\u8CBC\u4E0A\u5C31\u700F\u89BD",
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
    btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANYSURBVDhPbZFbTJNnHMa/C8VtVaCODqW0CP360RpRYdMOQdBWsdATbW1HOZWWQjm02HKQU1eGpMREIigajZqQoHFkGhHjIQo74IiGhAESpRovuqvdbAlZsmUhIo/v92nILnyTX96b//N7n/xfar+YWqeVUp8QeFqa4ukkFC9TnshLFgsDX8THT4oShef2pEk3qpkono7M6BiClPqUsD46ivr4sZcWXa9yVf5RUlr2r8NR8WeL3zMnEMQxH5225Sb1eHXMAmEp4MpbGhn5fml+fn45HA6/XVx8sRoOL7599erlytjY7b97jlmX2DnCa8JwXPQGMWVXJT/pKd7+5mSpHCec+xEIBODz+eD1etdQN0jh8FgRrFKjr0yGfrt8pcUs/0cQsyGNFcy1HZWj2ZSKGo0MlsMZMCp3ovBg2hrK1k3QdO6CQilFnYZGszEV9VopSIPdnIDY0GSSwWdIRZ32PS61FBWHJbAfkkB/QojTE24U9WfjQEkSnEdo+AtlrCBjTdBMBBxEpq3l44grFipHNDING1EYEmHwqROhnw3wXFMhtzgBbtJg86YoBSdgQ2yDdtuXHPruRFyebMX5n/wY/NGLwckahKY0cI9vRd9verTdLsCh6kTwhevd7wUk3GiUIejIQdCZC2MoCecn6+G9kUFIR90YA8edzXCNx8DzRIBTC2oE72uhahFFOEETCfsLU7kwiym0DZemmtA8mo2m0Swcv/c16h+kwPUoBrW/8tE4LcLArAUNV5WrnIANHyMLDHxoYOpNwfD0twje0yB4twBdD/PQMZGJmodbUDURi94ZFboeaKHsTF/mBD4i8OoZdJRncw3MvTTuPruI0bkBjM7249ZcP4Znj6P7FyVOPTVzO8hpVSBaLr3CCdjXPVoGjZZ0bol7S2goylOw9wO2vh248/wMhqbb0faDFQp/DmzlJvD5sXmcoIG8XltAo4YlXwJ3PgNjVhLUX4m42xKicXPmDDxDR7GvRQ17ZTFOt5chPi6G+8bHDTpmuY6Ea/NZAU0ENMz7RNDsSYAlW4y8zs9RMZCPXZXFq+WVtuWznXZc6HIiIZ6fQZmzRB3VaskUIfJ/iCCiVwgj3+SIIwerP/svy2pYMRh1f33nMf8e8lkjLFsFsdvfARA31F/rldguAAAAAElFTkSuQmCC)";

})();

(function () {
    CustomizableUI.createWidget({
        id : "searchClipboard-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "\u8CBC\u4E0A\u5C31\u641C\u7D22",
        tooltiptext : "\u5DE6\u9375\uFF1AGoogle\u641C\u7D22\n\u53F3\u9375\uFF1AGoogle\u7AD9\u5167\u641C\u7D22\u526A\u8CBC\u7C3F\u6587\u5B57",
        onClick : function (event) {
            switch (event.button) {
            case 0:
               gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(readFromClipboard()));
                break;
            case 2:
                 loadURI("http://www.google.com/search?q=" + "site:" + content.location.host + " " + encodeURIComponent(readFromClipboard()));
                break;
            }
        }
    });
    
    var btn = document.querySelector("#searchClipboard-button");
    btn.setAttribute("context", "_child");
    btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANGSURBVDhPbZJrTFJhHMbPh66jy1bZzUsX5ACVtXXbXLlWDdEE77YsnICABxIFBW8RE3DaulmKpimGXa1mabOs7GJXc9lilRL1QavVl9ZcrT5U2tN7qNVsne335ez//z3Pe85LRYRQYyQ8agKBIwmlOFIuxQkXBnEWhARaZs6adSs4KNC5Kow3KYoex5GSGSlN4FETCWOnjKP+/6TLtpxUqzLebZOlfVEo5O/NxqzHAQEz6P9Op66b59BL6SeEIYsqcqi5+dSQx+P56vV6R/r7+354vf0jPt/z4ba21o+OnM1D7BzhJeHojCnjQ6j0jQvuO7Yu+r5LJoRdGQGLxQKDwQC9Xj8Km82GUm0M9qYJUJEuHDYnCT8HTB0fxgoeFyYLYUrkg4kRIEW0HAkbliJ+fdgoUiJXQB2zGLlxNEwJfGyX8EAaLPMLiA15iQIY4vjQSQhSIQo18Th9rAEdV66h/UIb9tlNYBJWQCXmgonmITdBANLgr8BEBH6SFsFZZkbLlR7sdnfi0JkulLsuoeL4DVzvvApD6lp/EBv6R2D63SCPWK1MLNqu9aDm9HW8GHiDZ74B3Ot9isqmC3AcvojWsydgTl7yj4Aks5WM8QI01uyGnQzefODBg0dPcKe7F503b6OsygWN9RDukPdWtXi0gE02xvP91c6ccKOosgXnO26gtf0yzp07j+qaamTlmpFZuAeXunqxp0iJcl0k5kyf/OsbsMs5ZDk7lkb9wVJy5g4UOvajwFICRqMAo0iBdrsOTHEF7nY/hNOmRZ0tA0Gzp/0SGIhAT5bJ5UCBQoR7PR6odjixVclAti0VjDoNmpwCuFpuwVVbidqSjNECNj1LQvv/rS6GB0eeHN0PPdjn7kBeuQslVc1o73qEvr4+NDW5UWxUwWlV/m3AVtduCgXDEs1FZhQX8rhw2IoMcNfXoPZAGTSbN4KRxY643UdQV1cHS342Vi1fJmaPcDtbSn/VkWVtNCsIRSYhMTwY0SvnInHtfMjFfKSLQrFTLf6SrUz61tBQj8bGRtjt9kEqaU1wsSaKe5cwwEJu2qBStHBQujrwVVwE/bY0X/PBVVX+yWqUf9BtWf82XyV9rUgWvT+wf++wz+fDT0mU+xExjL1SAAAAAElFTkSuQmCC)";
    
})();
