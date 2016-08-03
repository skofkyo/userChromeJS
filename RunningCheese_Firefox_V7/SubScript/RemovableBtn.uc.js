// ==UserScript==
// @name           RemovableButton.uc.js
// @namespace   runningcheese@qq.com
// @description    新建一个可移动的功能按钮
// @author          runningcheese
// @version         0.0.2
// @license          MIT License
// @compatibility  Firefox 29+
// @charset         UTF-8
// @reviewURL     http://www.runningcheese.com/firefox-v6
// ==/UserScript==






//------------RSS按钮------------
(function(){
CustomizableUI.createWidget({
id: "Feedly-button",
defaultArea: CustomizableUI.AREA_NAVBAR,
label: "RSS",
tooltiptext: "左键：打开Feedly\n右键：打开Inoreader",
onClick: function(event){
switch (event.button) {
case 0:
// 左键：打开Feedly
gBrowser.loadURI("https://www.feedly.com");
break;
case 1:
case 2:
// 右键：打开Inoreader
event.preventDefault();
gBrowser.loadURI("http://www.inoreader.com/");
break;
}
}
});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#Feedly-button[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMACIQr9w/m38Twu66ceNeSjVxFP6QdufBfyQAAAGVJREFUGNOFjVkOgCAMRNn3HfX+R5WCBiUm9uO1mUxe0ccwYTx9BpgWIlVdalk6/E64VXwpRYUvaUjDublb6kUXcFmnwECS1RTYCJR0PhFwE4KAGpZPDcX0L4dupKFhF7OB2cD/nEjBAlfSLt5CAAAAAElFTkSuQmCC)'
		 + '}}'
     + '#Feedly-button[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #Feedly-button .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAYFBMVEUAAAAZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRnEsfo2AAAAH3RSTlMA6waSGW5J48eKJyFYOvXdzruzgmQUrZ6YNC0RDNWlNkxLUQAAAM9JREFUOMu9UlsSgyAQcwVFUVEePqq13v+Wnc6UBVoq/ZKvwIQkG8iuWYfoJTH8NyHfeFnMjNXrudCqWVUmzNq9uiUoBkh+ztimgSdECugSjBJSWbs/NIIcAqqlvYc5htxvknaFgqXxGRP5VB011N6tjX03RqfBEzFVrAH/2h6btYXGYZQI07tp+ujrP2qEGmGQ1JlwFi1Rz86D26IIuF8wAqaYzRsQSalEQ9ViYtsm0Jc3Hi/4ZDJK6HD+prcWijYKLUZAJMKQdicQHdkl6wluEAch5TtkCQAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();






//------------重新启动------------
(function () {
	CustomizableUI.createWidget({
		id : "ReStartBtn",
		defaultArea : CustomizableUI.AREA_NAVBAR,
		label : "重启",
		tooltiptext : "左键：重新启动\n右键：重新启动并清除缓存",
		onClick : function (event) {
			switch (event.button) {
			case 0:
				// 左键：重新启动
				Application.restart();
				break;
			case 1:
				// 中键：
       
			case 2:
				// 右键：重新启动并清除缓存
        event.preventDefault();
        userChromejs.rebuild();
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#ReStartBtn[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAd0lEQVQ4y2NgoAOQp1TzLwYGBjtKDLGDGuJPiiZ/BgaGIwwMDP+h+AmUJsolTVAN/gwMDAJQ+j8DA0MRsTY/gWpEDgMHYp1+BItfSYqF/0i2kxWthAzghKohyQvYYofoQEQGAkixQ1I0CiAZ3ERuQjpCakqkHwAApJYfIn3DHY8AAAAASUVORK5CYII=)'
		 + '}}'
     + '#ReStartBtn[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #ReStartBtn .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEUAAAAZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkaGhoZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkaGhoZGRkZGRkZGRkZGRkaGhqnd+olAAAAJ3RSTlMAA5QI10zrx3M8Hiborl3iv5uAdxLNqotnVQ399NG3pZ9iMy0YbkWoBP29AAAA4klEQVQ4y62SRxbDIAxEKaKDe03v9z9iNrEdEz2zyaxUPhLMgyCiGUmofSWArEgANL/hdaPL7syujjw7pN1UedsPY6bPXg3S/e715VSkQhUsns7ge+09SL4GLsVuSUzwdbPua8XnWaOCK48WOGnneFSCklhBk01ZybcBzci2TiIB5DYBHHgC2FO8Lqa7yQcODOUnUAYHWP0J+goHYDpoAO07P9/tiBpRLoMFIA+9+2ZJul+zd5B9Zbyt43706SwwvsrVJXKvCSCWgVpqxNgjVOZBuRVMBkcwmV7J/SE/1Zb8U28Y/AjF9a9sJAAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();


//------------护眼-----------
(function () {
	CustomizableUI.createWidget({
		id : "EyesCare",
		label : "护眼",
		tooltiptext : "左键：降低网页亮度\n右键：启用黑夜模式",
		onClick : function (event) {
			switch (event.button) {
			case 0:
				// 左键：降低网页亮度
  (function(){
        var id = [30]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    })();
				break;
			case 1:

				break;
			case 2:
				// 右键：启用黑夜模式
     event.preventDefault();
      (function(){
        var id = [35]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    })();
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#EyesCare[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAAOCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB89Of5AAAAFHRSTlMADk8f+Ga55KiEB8R758tFMvLaltxBdUoAAABqSURBVBjTjU85DsAwCCtnkt4H/39rixKFDh3KYGwLjBh+FpV1OVPomYXKgqEVBkzQ9c4PnzAWsjxgEIbRyxidO9SVmGihtLqh4lgSAlyH043BG05mLPWM1kTQuSVnFhpJuPTcTc0s759/3jzyAsLvmRbSAAAAAElFTkSuQmCC)'
		 + '}}'
     + '#EyesCare[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #EyesCare .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAnFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4jUzeAAAAM3RSTlMABhbv2a8D6uiaPi/ktYx0aiojHBDBvIR+b21jWFAI4Mmikol7RDk09tLQq4ZnSdGppJ/ob5bAAAABH0lEQVQ4y61S14KCMBCEhBggFJEm0otiv8L//9sJhDOC+2YeNpCZbGZnV/rk8pLyjLtKhmCLXuIdTqDraW4hyaF7CF/nTJLkUwzhuxPqownhuuE+4io/ALis3PutVaAEERl1aAC+MsbU1y1UoT/uIUSobF4K9ESh81q+AAJFXIu6WWBZH7qpPXW1IIR9OE4Ej7Yz3BoMMNzpP1HQS/1WN+gPni3cKoIMZPqYDae10FXcZFxepNb6aL5jCEPkmFSL9/dbiQmTSu5QcBNf3kS/JtHW7oNMvfGoVdFbgwJ7+roG7ybVLlb/9ZDLkpGKxsrEd+dTqrIXTxo1EpO4RJk3hplGyHg+XcNhthTlWAr2v7Wf4nhuENB5pCdxevCkj64/2IYP2pCFk/cAAAAASUVORK5CYII=)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();


