var gIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC";

var bIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC";

configs = {
/********************************************************************* 添加按鈕 ********************************************************************/
    buttons : [
		{
			label: "左鍵：滾動到頁面底部\n中鍵：UTF-8\n右鍵：滾動到頁面頂部",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBUlEQVQ4jZWSPWhTURTHT6uDg5SmwxsqZsng4CK4dJFCcTKIi68RqTgo2UKtlhSkkkWHEl8/EOoQaEEQIWJr7isJCFWaD0LwUiSxSUybPFOSq8TAW8qDB4F/h/iS1LQaf3CWe/n/zj2HS/Sbyy925TtvS/Lo8q48dI/LdAySO+GQ3AnHcXfkYRUsRmu4+74Cx2wWXWFPwnFtOR+54v8akVyb3ZLJcBW+6C9cZQI2Xx5/hide7WXmojWMr1dgn/6SkcbCRyXXX5dxI/wDw6v76HvUfoHkSThuBr5F5qI1TH2sYeRdFWf9RZy+lYxIY+ttyYWlPQyv7oMWNNBUW3Dp2U7GGxG4/+EnRtaqOPOyDPJroOkc+p3xDJ0a58Fzj3eCtoUS+pa+Y+bNFmZWPiGkhoIhNRT0rWxicW0LFwMaBgNl0LwGmi2A3GmZRmMynXd/nh96mj8gRQMpGjjn6EQIgUKhgH5vrhlWNNBkx5Ltzg3b4ERSoScF0POmQNd1cM5RKpUghIAQAvQgC6vJEYHFwO2kQt7sAeccnHMwlYGpDPV6HbFYrBn6m8Du3LANuJKK1ZmpDPF4HI1GA4ZhgFzboIe5Zrm2uwUW1gimaQIADMOAEKI11onBTgHnHOl0GqZpQggBpjJY5z0LmMqQSqVanYvFYu8CXddb2++kJ4H1gU6qfwr+l0MoVbN/DSk+EAAAAABJRU5ErkJggg==",
			onclick: function() {
				switch(event.button) {
					case 0:
						content.scrollTo(0, 1e10);
					break;
					case 1:
						BrowserSetForcedCharacterSet('UTF-8');
					break;
					case 2:
						content.scrollTo(0, 0);
					break;
				}
			},
			state: "dblclick"
		},
		{
			label: '複製為\n左鍵：純文字\n中鍵：HTML\n右鍵：完整格式',
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==",
			onclick: function() {
				if (event.button == 0) {
					Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.getSelection());
				}
				else if (event.button == 1) {
					var div = content.document.createElement('div'); div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
					Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);
				}
				else if (event.button == 2) {
					goDoCommand('cmd_copy');
				}
			},
			state: "select"
		},
		{
			label: "左鍵：高亮\n中鍵：下載 (不彈窗)\n右鍵：刪除",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWNgGBTg6dOi/6RgrAb8/19PFB7EBlAUBoMDFD0t+k8qxjCgngQ4SA2gKAwGDAAAM3SE/usVkKQAAAAASUVORK5CYII=",
			onclick: function() {
				if (event.button == 0) {
					gWHT.addWord(getBrowserSelection());
				}
				else if (event.button == 1) {
					[/\s(·|::|-|—|»|\|)\s.*/i, /_[^\[\]【】]+$/].forEach(function(r) {content.document.title = content.document.title.replace(r, "");});
					saveImageURL('data:text/plain;charset=UTF-8;base64,' + btoa(unescape(encodeURIComponent(content.location + '\r\n\r\n' + content.getSelection()))), content.document.title + ".txt", null, null, true, null, document);
				}
				else if (event.button == 2) {
					content.getSelection().deleteFromDocument(0);
				}
			},
			state: "select"
		},
		{
			label: "翻譯為\n左鍵：繁體中文\n中鍵：英文\n右鍵：簡體中文",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC",
			onclick: function() {
				var urls = [
					"zh-TW&sl=auto&tl=zh-TW&text=",
					"en&sl=auto&tl=en&text=",
					"zh-CN&sl=auto&tl=zh-CN&text="
				];
				var div = content.document.documentElement.appendChild(content.document.createElement("div"));
				div.style.cssText = "position: absolute; z-index: 1000; border: 2px solid #FFF; border-radius: 5px; background-color: #3B3B3B; padding: 0px 3px 1px 3px; font-size: 12pt; box-shadow: 0px 0px 4px #000; color: #FFF; opacity: 0.95; left:" + +(content.scrollX + 5) + 'px; top:' + +(content.scrollY + 5) + "px;";
				var xmlhttp = new XMLHttpRequest;
				xmlhttp.open("get", "http://translate.google.hk/translate_a/t?client=t&hl=" + urls[event.button] + content.getSelection(), 0);
				xmlhttp.send();
				for(var i = 0; i < xmlhttp.responseText.length; i++) {
					div.textContent += eval("(" + xmlhttp.responseText + ")")[0][i][0];
					content.addEventListener("click", function(e) {
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(div.textContent);
						content.removeEventListener("click", arguments.callee, false);
						div.parentNode.removeChild(div);
					}, false);
				};
			},
			state: "select"
		},
    ],

/******************************************************************* 添加搜索引擎 ******************************************************************/
	menuitems : [
		{
			label: "Google 加密",
			url: "https://encrypted.google.com/#q=",
			image: gIcon
		},
		{
			label: "Google 加密站內",
			url: "https://encrypted.google.com/#q=site:",
			image: gIcon
		},
		{
			label: "Google 翻譯",
			url: "https://translate.google.com/#auto/zh-CN/",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC"
		},
		{
			label: "Google 圖片",
			url: "https://duckduckgo.com/?q=!img ",
			image: gIcon
		},
		{
			label: "Google 地圖",
			url: "https://duckduckgo.com/?q=!googlemaps ",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4jZ2T3W9TdRjHf//F4cbE+YaxvYIrTDQuU+LLhYneiR1yQ+jBizVwQ0xqE4IXQAgZOes6cUHWTTPp2zmup4d14thKCIKkp9Cm6wt0zK1dxyiYRV3L7+NF240Qr/wmn8vn8+T5Pc9PCCGElfnhhWRmQklmYltcL8eU6+WkIjrJf/xB01ac5D96vymej6araMZz6F3c5N97l7TiwFac2IqT7FtvoxkqQgghEldiP//19wZSyv9kvhgl59hFWnHS3/MS9g4n2Z270HSVa3MawpzRLYBS1e50dlOq2kigsHiXIUPd6mwrTtKKg7Ti4KjHzeh3AYQ5E7WklATMATRdZagzgpSSJxsNNEMldXMMe4dza4zBvne2BVPJ8GUpJYH4AJrREegqT59K1hp1NENlbmGS2vg30lacnOvr5ajH/awg1BaYnu3HM1RarRa3Fn5F01Vq9VBrYy3GjVd3bxVb0e+Z0iOIqelL1marRb1RI2AOMGJ6WKyVyVVuoxkqSytjrSfrk5QLcfRPPuXsSS+35wzupIy2IGpOxIYMlXTpKg9WCjSbTcoP7qIZKqWKv9lYG6VSDJO+kSA0fJpMyiA7HyM3G2kLwmYw1t391bTO5maTynIBO3Oq+bCm0Vj1s177luVykPytMHfmouRmQ+R++aktiJjB6PbxuOlmrV5iejb8j8tnkcv+yHp1iEerw6wujnL/93EWkhMdQXx8imeyVDjE48c1AGr1dc4F53H5LFw+iyupCCsVP49W/TysjnQFwbimu9EMlT+Kh1i+d4RQ/OKfmfwSAKnfFvj86wSuLj6L85O6zNqB9iVeMi5ENL1dvFQ8KP0XBze+8F3m4IkZipUqAC5vHJfPot+boN+b4DNvgn3eBOfHwgghRM/JwN5rlv5h+qvjrhnHXs+FN3oPD7/edziwf+CU7vry+PRrverIy28eOPvKngNnXtyz/4x6bBD12CBCiJ7uh+z5n4h/AWy0oXdRPD+0AAAAAElFTkSuQmCC"
		},
		{
			label: "百度",
			url: "http://www.baidu.com/s?ie=utf-8&wd=",
			image: bIcon
		},
		{
			label: "百度貼吧",
			url: "http://tieba.baidu.com/f?ie=utf-8&kw=",
			image: bIcon
		},
		{
			label: "百度圖片",
			url: "http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=",
			image: bIcon
		},
	]
};
