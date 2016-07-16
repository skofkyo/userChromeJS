// ==UserScript==
// @name                 P&G_Button.uc.js
// @description       貼上就瀏覽&貼上就搜索
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 45+
// @charset              UTF-8
// @version              2016.7.16                 
// @include              main
// @include              chrome://browser/content/browser.xul
// @note                   2016.7.16 重寫代碼 使用新函數
// @homepageURL    https://github.com/skofkyo/userChromeJS/blob/master/userButton/05-P&G_Button.uc.js
// ==/UserScript==
(function() {

    window.CustomPGButton = {

        addmovebtn: function() {
            CustomizableUI.createWidget({
                id: 'CustomPGButton',
                type: 'custom',
                defaultArea: CustomizableUI.AREA_NAVBAR,
                onBuild: function(aDocument) {
                    var tb = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                    var props = {
                        id: 'CustomPGButton',
                        class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                        removable: 'true',
                        overflows: "false",
                        label: 'P&G按鈕',
                        tooltiptext: "左鍵：Google搜索剪貼簿文字如果是網址的話直接開啟\n中鍵：Google翻譯選取文字否則翻譯剪貼簿文字\n右鍵：Google站內搜索選取文字否則搜索剪貼簿文字",
                        type: 'button',
                        style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANGSURBVDhPbZJrTFJhHMbPh66jy1bZzUsX5ACVtXXbXLlWDdEE77YsnICABxIFBW8RE3DaulmKpimGXa1mabOs7GJXc9lilRL1QavVl9ZcrT5U2tN7qNVsne335ez//z3Pe85LRYRQYyQ8agKBIwmlOFIuxQkXBnEWhARaZs6adSs4KNC5Kow3KYoex5GSGSlN4FETCWOnjKP+/6TLtpxUqzLebZOlfVEo5O/NxqzHAQEz6P9Op66b59BL6SeEIYsqcqi5+dSQx+P56vV6R/r7+354vf0jPt/z4ba21o+OnM1D7BzhJeHojCnjQ6j0jQvuO7Yu+r5LJoRdGQGLxQKDwQC9Xj8Km82GUm0M9qYJUJEuHDYnCT8HTB0fxgoeFyYLYUrkg4kRIEW0HAkbliJ+fdgoUiJXQB2zGLlxNEwJfGyX8EAaLPMLiA15iQIY4vjQSQhSIQo18Th9rAEdV66h/UIb9tlNYBJWQCXmgonmITdBANLgr8BEBH6SFsFZZkbLlR7sdnfi0JkulLsuoeL4DVzvvApD6lp/EBv6R2D63SCPWK1MLNqu9aDm9HW8GHiDZ74B3Ot9isqmC3AcvojWsydgTl7yj4Aks5WM8QI01uyGnQzefODBg0dPcKe7F503b6OsygWN9RDukPdWtXi0gE02xvP91c6ccKOosgXnO26gtf0yzp07j+qaamTlmpFZuAeXunqxp0iJcl0k5kyf/OsbsMs5ZDk7lkb9wVJy5g4UOvajwFICRqMAo0iBdrsOTHEF7nY/hNOmRZ0tA0Gzp/0SGIhAT5bJ5UCBQoR7PR6odjixVclAti0VjDoNmpwCuFpuwVVbidqSjNECNj1LQvv/rS6GB0eeHN0PPdjn7kBeuQslVc1o73qEvr4+NDW5UWxUwWlV/m3AVtduCgXDEs1FZhQX8rhw2IoMcNfXoPZAGTSbN4KRxY643UdQV1cHS342Vi1fJmaPcDtbSn/VkWVtNCsIRSYhMTwY0SvnInHtfMjFfKSLQrFTLf6SrUz61tBQj8bGRtjt9kEqaU1wsSaKe5cwwEJu2qBStHBQujrwVVwE/bY0X/PBVVX+yWqUf9BtWf82XyV9rUgWvT+wf++wz+fDT0mU+xExjL1SAAAAAElFTkSuQmCC)",
                        onclick: 'CustomPGButton.iconClick(event);',
                        context: '_child',
                    };
                    for (var p in props)
                        tb.setAttribute(p, props[p]);
                    return tb;
                }
            });
        },

        iconClick: function(event) {
            switch (event.button) {
                case 0:
                    let url = readFromClipboard();
                    try {
                        switchToTabHavingURI(url, true);
                    } catch (ex) {
                        url = 'https://www.google.com.tw/search?q=' + encodeURIComponent(url);
                        switchToTabHavingURI(url, true);
                    }
                    break;
                case 1:
                    var selection = content.document.getSelection().toString();
                    var gbs = getBrowserSelection();
                    if (selection || gbs) {
                        openUILinkIn("https://translate.google.com.tw/?hl=zh-TW#auto/zh-TW/" + encodeURIComponent(selection || gbs), 'tab');
                    } else {
                        openUILinkIn("https://translate.google.com.tw/?hl=zh-TW#auto/zh-TW/" + encodeURIComponent(readFromClipboard()), 'tab');
                    }
                    break;
                case 2:
                    var selection = content.document.getSelection().toString();
                    var gbs = getBrowserSelection();
                    if (selection || gbs) {
                        loadURI("https://www.google.com.tw/search?q=" + "site:" + content.location.host + " " + encodeURIComponent(selection || gbs));
                    } else {
                        loadURI("https://www.google.com.tw/search?q=" + "site:" + content.location.host + " " + encodeURIComponent(readFromClipboard()));
                    }
                    break;
            }
        },

    };

    window.CustomPGButton.addmovebtn();

}());