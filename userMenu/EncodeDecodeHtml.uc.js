// ==UserScript==
// @label                  EncodeDecodeHtml.uc.js
// @description       各式的編碼編輯工具
// @labelspace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.26
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

(function() {

	var type = 2; // 0:按鈕 2:工具菜單
	var image16 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADAUlEQVR42mWTW0iTYRzGNYtwbURSkBbtZje7DOsuIigkbAhWHpdOnTqttGwHrVlpJzoS1VQ0c8sDobVzq3TfqgvZdKdIhW2wahdeGINM3dzV3qfvk5Vu/eHhhe99n9/7vf9DWtp6pCfWTRvWzQltStlLT0sNlUrFDYVCSqfT+d5oNgcGNJqwzmhcnp2bW/b5/eFJuz1gslje60wmpVSp5CaZeTze1pnZuZ8ut4d4PF/ibrc37nS6iGN6mpgtFmKlKOJwOOJulyvucbnI7MzMT8bzD5Cbm8uaoGyR8QkbmZx0IPjtOyKRCObn59Hb14cWqRSdN29iQK2GzWYj1MdPEcazDhAIWFYaYDK/o2+axtLSMlZXo/D7A3it1aKjsxO19fWQt7ZCq9OSCYpKBjC/Q9lsC5Z3H4idBiwu/kYkGoXP78Po2Bjar11DTW0tFK1t0Ov1hKKohaQnMJnec+lpsKBRTh52P4fT8wU/foTgdruheamBTKFAUbkQp0Q1ONFwiWTLngUT1VkHfLq1O5hfdozwikXYdeYiOHVKZFa1IfO4GJxDJdh1rAy8k+XIr8gjn+9k/w/gttwK1ghzyWNxDoaadmC0jY1XUg4GK9lQF7LxojgLjyr3Qiw6QLiy2/8DMi88DrIKzxLW6RawKy6D1dABjvgKOCfqsO2wEOyj1WAVnAOrqIlktjxJBjAJufuka2F/mYTklDYhq0oBTuN1sMVKsAUScI4IsTNPhH2nG3FQdJ48UPUspPSBgPVh3BoZGhohPaou9HZ3o6+3F/fu30dVNZ04gQAlxUWQy6QYGR4m49aUMtKxzfzWEjWZLWRqyomVlQhisRgCgUQf3LiBOomELmMr3mi1xESfZTx/zVto8fUGY3StD+xT8V+LiyQajRKfz0dGx0ZJ+9WrpFosJnKFIq4zGIjeYGAA/IR3bcK28/n8fKlUNtjf/+Kr1+sN04MVo/sgrtZo4lK5PFZUWhoWVlR8bW5uHmTOMp4N05k0ohm0OLSyaXETyk58y0gd5z+RasELwMhMQQAAAABJRU5ErkJggg==";
	var image24 = "data:image/png;base64,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";
	var image32 = "data:image/png;base64,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";

	if (type == 0) {
		CustomizableUI.createWidget({
			id: "EncodeDecodeHtml",
			type: 'custom',
			defaultArea: CustomizableUI.AREA_NAVBAR,
			onBuild: function(aDocument) {
				var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
				var props = {
					id: "EncodeDecodeHtml",
					class: "toolbarbutton-1 chromeclass-toolbar-additional",
					label: "編碼工具",
					tooltiptext: "編碼工具",
					removable: "true",
					type: 'menu',
					style: "list-style-image: url(" + image16 + ")",
				};
				for (var p in props) {
					toolbarbutton.setAttribute(p, props[p]);
				};
				return toolbarbutton;
			}
		});
		var EDH = document.getElementById("EncodeDecodeHtml");
	} else if (type == 2) {
		var EDH = document.createElement("menu");
		EDH.setAttribute("id", "EncodeDecodeHtml");
		EDH.setAttribute("label", "編碼工具");
		EDH.setAttribute("class", "menu-iconic");
		EDH.setAttribute("image", image16);
		var dev = document.getElementById("devToolsSeparator");
		dev.parentNode.insertBefore(EDH, dev)
	}

	EDHitem = {
			add: function(menus, parent) {
				var menus = [{
						label: "Unicode轉換",
						tooltiptext: "Unicode轉換",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE7klEQVRYhcWXa2yTVRjHT1sZkvEBgobb7oyutylEI0YTHRclCCZGIYaoCx+UoCQkxJAo0RkSjRIjVwl4xflBICbqB/liTAyJKHjhksyYsPc97WrZ1sHK1rVrt77v+fnhfXtb22FMCSd5PrT9P+f8nv855+3zCim83M4QUniRDl9pVEoqp51OL7xIR+U1hBQedLG0JKTwlJ1MF+4y2rabQLRVXENIl5/QnBWE5hZHsOaeUgiHl9CcB/I6Oy84815bWw7CQ2jW8pL5Q3NWIF1+RKRtHUZ0GDOewBwdsyKeIPrUNjRRh3QFLAtFG7I2QEaG89oRS5s+dwlZE0A6pjjhCqCJekb2fooZT2DE4rn5jegwkbZ1iIhvPSo9ydQRfWZ7WQDj2nCJFmB41140sRjpap8CUMfIwW4AVIFepSeJ+NYjIt71qMQ4KAWmaYVSRJ9+pTzAQDSvVQoME0yFGU8Qrl+J7liCdPqLAfZ/AUqhJjO5PJUYJ+LNAiRTNpayAioDDA7ltdlhGACMdX+LJuoJugLFAPuOg2miJiYtrWmixpJVBACrMqD/kU400WDluQJoYjGjR74qu20R/4YqAhgWQPr8ZeQMN9LlRbr86KKR4Z3vkb7QQ+qXC6TPXSJ9/jKpM78RblpdRYACiOsv7yk4kD400UivmF8SUrirDGBaB9KIDBK6+0F0hxspWhlY+yI33vmY2BuHiHUdJvbWEWK7D9B310NVBihwIX7sJJpoRBeNjH50qqw0EniySgBK5S+5fUVVeoKr92/kimMeI/u7UZkMKjUBkxnIGKjRBBHPE7fAgQIXUmf/pFcsYPTAl1ZKxsjlqWSqCtfQvnoTF//GjCeK8pUNMbB2K7E3D94igIz1ABp5/zNiXYeKqs8+8SZ6rjDW/V3Rd1UHiB89gaxxY4QHgLwz2aFSEwUfbgHA2PFvuCLmEt38qm2/UbAgxeM/A2zcjuYoBPAga9sxhq6XOvDJ1+iOJnTRwvj3Z+ytqABRAuDfUAyQyQBwfefb9IoFBGcuQ97Rju5y0zf/YVRyvDyAaEZ3tPKP7wnMeLJov6d1ILzwUdRYMv+jaYKC9O89yDsDaGIRumimV8xj+PV9ls7eY5XJgFKMHj2BJuoI1iyjVywk1nW41IVKALqzmfEfz9r/7XaCaYlSZy8SfXYHA49tYeSDz/MV5a6apb/20m40sQg5ox3p9BCc3c7kX71FV7UiQK9YxNDmXXZFRomw4rAtNsIDBGuX2Y1pvgcYXLvVduEmANLhQc7yk/6jxxJMZooXyVZQaKepcrBDW15DE/XWYbVbsaDLjyYaSJw8XZpbAuD0o4sWwi2ryISu5qkNM38rCqPApdieD63mwzmlG3b60R0t9NV3YI6OWVtqny1M638jDyC8SGcATTTR19pB8vRP01sPmDfiXNvWVX7xXEPajibqGN75rlVxditKHCikFq3oopnoph2M//AzKpUust2IDBI/doqwe43VcGSbz0pvUE4P0uUm/eulkiJUasLqiqdaJx0+NFGPLpYSbllD/5pO+ld3cnXFJkKz70MTDeiipWjPp4PQxVL66jsYeHwL/Sufp3/VC/Sv6qS/4zmCtcunABT081L40MUSNNFgL9qEFG6kyz995SXhQxetuXny0YgUbRUAco74ct1t1p3/9RbsyM7jL47c2/FtjH8Bo93LTMPQzVkAAAAASUVORK5CYII=",
						oncommand: 'EncodeTool.Unicode();',
					},
					//{label: "sep"}, 
					{
						label: "Javascript/HTML 格式化",
						tooltiptext: "Javascript/HTML 格式化",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jbWTQQrFIAxEc6LGG2WpCB7AhbjIterZ5q/8SEUbaDswEMnMW0WityQieJQTEVggy9y46PPVJoDVW0CMEVd5722AlNJU7goh3AMA4OQDzfG/2Bzj5AMAbIDmeAL0twmw0/eAWuuynHNeA0aIqk7lUsq+TEQ0hlZW1fs/Y76+N/QDfH54UpD++6YAAAAASUVORK5CYII=",
						oncommand: 'EncodeTool.JavaScriptBeautify();',
					}, {
						label: "CSS格式化",
						tooltiptext: "CSS格式化",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jb2SMQuDMBCF/buunV2dXbs6d3UVB4cMDgodRAoqKlpUCCIaSpDXoUQQo1YKPchy3H15d+8U/BjKUUHLOCLKzgOCZoBGMqhOPD/DL9EyfgwwwxqqE+N6fyKiDBFl0L1izu0C7LyTFloJherEIFW/DRj5hIub4uKmGPm0UibLLQDidzOsZZNJYwEw/FIq82uA2Paebf8BbI2Q9699gPBaI9lq43beSZe7AATNMKvQSAYrobg9Wmgkg+4VxzYCAKn6xfkKW2XNUgDwORhxwluNu4Az8QZ5ZdIo1LKRXQAAAABJRU5ErkJggg==",
						oncommand: 'EncodeTool.CssBeautify();',
					}, {
						label: "檔案Base64編碼",
						tooltiptext: "檔案Base64編碼",
						image: "data:image/png;base64,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",
						oncommand: 'EncodeTool.FileEncodeToBase64URL();',
					}, {
						label: "文字Base64解碼/編碼",
						tooltiptext: "Base64解碼/編碼",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPUlEQVQ4jWNggID/ZGKKNMMNGUQGIAN0cTx8worIMoAsF+DyAgF5omyhLAzoYwC+aCTaAIoT0oAZQIkhDAASUV2xvpc9qgAAAABJRU5ErkJggg==",
						oncommand: 'EncodeTool.Base64DecodeandEncode();',
					}, {
						label: "URL解碼/編碼",
						tooltiptext: "URL解碼/編碼",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC80lEQVRYhe2UW0gUURjHPwspupARgi89R0S99NBb2EPQQ09RRFIQEcquWJurrqu7zsw5Z2Y3U9OVyltUkqbZVQoKKexKT4VGdEHLVcjW3VlbU9dNt38PuTJKgWj1ND/4MzBwft+c831niExMTEwMyLIolBXuZ0yAMRWcqeBcheAqBNcguGhgjG39Jw5Jkquam1sxMRFDPP4D8Xh8JlNTv579/f0oL6sAY8L6u+ILdrhKFPeVKy2YnJzEt9FRhMM69DkJD4cRnZhALBZD5WkfmJttMhZfsCMzM3OFUD0I6SFERiK43d6O3x1feVkFurq7MBYdQ29vL7jMzyaKL8pRWOjadfFSI75Gwuh6/Qq59vy3KSkp24locyK2E/ZWReFQFAGFiWm5+CWfKaBBcA0q16AKDarwoCDP0WrwbNm3b79SVenDkB6AruvgCu8hh6Mo58bNmwiGB/H4ySPY7QVtRJSc2J3NZkvxeEsRjcYwPh6dd6LRGDThgaFLSUS0WpaUYN9AD4b0QQimRsluL7C2XWvDl5Afz188hdPpum7srcViWevxliIY8WNw+P28Exzpn/sBRERJsqT4e/veIRAagMq175SVlb2ztr4eDx/fR0/fOzCuQpblNMOiJXl5jqaFtMBZWHx59hXluyvKTiOg+/Hm/UswmQ9QamrqKoUJ1NRVYyDwAR0POsC5OjNAjAm4XSWQJAXXb1xF57N7OFVxEgcPHLqb6G9ycvI2a3YO3JITHZ13UNdQh9xcO1wuadYQVvvOoPv1KwSGP6H1WjOcjqImIqKlOTnHyn3VVeCqhM/BjxgZC2N0PDIrkdEQghE/Gpsa4NG8yMjI2GHY3KIdaywWa4uqafCWqqg9X41z9T7cutsykwuNNfCWqpBlGUcOH80nouVz+rsox1IiWrdnz177cduJ7sQddrtKUFzshttVAqaIuCXLej89PX0XEa2cnmoji3YkTb9cT0QbyfAfmM4GIkojomX0Z/6Gw8TExMTk//ITMvlwcO0adboAAAAASUVORK5CYII=",
						oncommand: 'EncodeTool.URLDE();',
					}, {
						label: "線上圖片編輯",
						tooltiptext: "線上圖片編輯",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnklEQVQ4jWNgoABcv3tdjSyND14/kMys99kZk+O2l2TNu88sj/LPU/5q7Cn64e6zu3JEa7x69Srb9PUlk9O7zf+bBYr8X7NxYQzRml+9ui9RPtP5VOuakP/2MdL/q1ozpxOt+e7r62pZE40fzzmS9d8jVeG/f4L18atXr7IRpfnWk/MGGRP0Xi45U/TfL1v1v42f6r37r+5LEKX59KXDLtmT9N+uuFj23zdH5b+Rq+SrO3euqhCl+eHDh0rN3RU/8pvC/ntlKv7XcxT6cPXqBW2iNDMwMDAWVKS9ev/+/f+Kior/OsYKP06c2W9DrGaGhrbKrU+ePPlfVlb238rO/NfBo3udiNZ8aPOKlKXLFv9PS0v77+Bq9erBgweSRGl8+/Yt38Ys11PzfOX/W5to/s8vzF5HtK0MDAwMm6tiNp6eXf6/O8Tsf6Ku+CsGBgZGojXvXzw1vcaQ83+aFu9/b3HG/3O6mysvXLigffXqVZX79+9LvH37lg9vwqlNCFwbb6F+PVBN8O20ltrGI0eOWJw6dcoAZsC7d+/48RkAABBmw+1iCsQFAAAAAElFTkSuQmCC",
						oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://apps.pixlr.com/editor/");',
					}, {
						label: "JavaScript壓縮",
						tooltiptext: "JavaScript壓縮",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4jYWRy05TURSGv3NmitUqM0c8gQNPS/sUJibeIEAL1kYMKBoewJEWDwdarA9AohNmDkSIQpW2JxYbCmjiZehl0lqOtFAuoV0OdjGhDM5O/uxkrfzf/tfaANCzeI2wnWMgV6TfXif0bpCWU4JoFda2oLgJyyXoUp2+1BUiy0K0IERXlSJ5IZy+d2jegKE9DWk0VdeQXQ0pwQ0IZwvK3KJIrsall541aNuBal1DDprmQ1VgDQZyjnq5INzMFehPJwilE4TTcc/l6fYCeB2YLEOiDIltWKk3k2yDAwP2VwVYEUJLZuvsrWcDHh80ARX4Dr2p20TyKkFfZsoNUIaJuobsaUgRhlS1N3Of0PIvetJxN4AD4zX4/RdGj3auzpzy9E23uwFy0J4Bz7GGPcOJ9RdnzroBvCMdXqLnTx4pbs4zvJPihzPHpBsA0zBJdP7E9I0AUJrl1v6SLo2sLs687rpEnvgmSAaFqYAQMwapLGhfxNalntVlY153/UZM4xHJoPAsKFj+b2ynNEdslaCW0lacOd1SYtye4Zz3YYeXmGFi+ixMn0U8kCcZFJJBYdLvUH2rrTayCtDI6lLPqHt3kZ0PzznN6IU2xju3SAaFp03joSz/OsVZru+9VyaxlfaXdHFe8+B/7DHjLlOBo+ZEQIgZ3WqRr+iuvNE+1lJasbqgff4zy/Cx2ceMO1j+T8T9RazOPLGLPQD/AODKMJF/bhMAAAAAAElFTkSuQmCC",
						oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://closure-compiler.appspot.com/home");',
					}, {
						label: "CSS壓縮",
						tooltiptext: "CSS壓縮",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7UlEQVQ4jWPITr7+PzMRgVOS7vy/FJT3/7+vLwp+FZv2f/b6l//nrnkCx/PXPv3PkJl0/X96/DU4Tky4/f+if87//15eKPhVdMr/mete/J+z+gkcz1vzZNQAqhhQXXP7f1X1LTgurb73/1pB+/+/OTko+E1l/f81Ox7+X7ftHhyv337vP4PBgRP/9ZCw+r5j/3c9fvr//bt3KPjDw1P/P83X+v9poT4CLzL8z2B26NR/44Mn4Vhn/4n/u7EZ8Og0RNNiEwReaj5qAFUMsDh86r/ZIQTWP3Di/54nz7AYcOb/p0VG/z8tMUfgpZb/ATI29NPOivDIAAAAAElFTkSuQmCC",
						oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://csscompressor.com/");',
					}, {
						label: "打開html資料夾",
						tooltiptext: "打開html資料夾",
						image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbklEQVQ4jY3RSU+TURSA4f4Lty78AWz8Ba5caFwoCHxAIZRGpZZZhTIPggs1KpJolARCgCvYIJMyI2ngg9YOUIggWhAoZWhLKYMFfF2U1ECJ8STv7twnNzkKkz7BY+lIYuJdHGZ9AtPdahyjurBmB7TYPyiVitMz3a+GnUf4ncU4xtOwtCdh6bzNkv0FYAx1GDAw2Z5IONCn5mi7KpiviiNfJV5HPrKQwJ79N+drrG3Ks4HDrUoOvJUceB9y4AkmC4l9cwaHtqwQYtYnhAP2XjUBdwW/No/bCCYLCb8xjX1zRggwvY8/A+hJYX+9nL21cvZc5ey6yth1lSELCe/YXXZN6SFgoiUuHJj6lMKOs4ydlVL8K6X4l4PJQmJ1JBW/MY2jqWx+T2UjC+lsYHupBN/PEnyLxWwtBJOFhKPvFu5RLQFrFgFrFqNNsRgaYiJOAJMfVXgdRXh/FOH5XoR7vhD3fCGykJjpVLEynIrflMmOJY/VL48xNMac/IWtW4X7WyGbcwVszBawbLnHwngmspAwtiSxMJDK5lg6vulqAEYaok8BXclsfM1nbUaHy65DFhKGRomh+jgm29UsDWtZ/qxl3focgOH6mycBa2cyLruO1ck8nNZcZCHR+SqatppoTHo1cz0a5no1DPVp0AxqGKyLOgV0JOO05bJsfsCS6T6ykNC/jKLpaST9dYnYOu6EMraq6K+N9JwAZBFrtnWpWBzPYUHOQRYStRWXeZZ3ieYnV+h9G3ncDU/vm+tp3TXXzoedcrRZKppoiWemLxVjawKZyotahUJxLmzxX2MQMRFjInZQFpJHVF+98L/v/gDacTCAI1Mk9gAAAABJRU5ErkJggg==",
						oncommand: 'EncodeTool.OpenHtmlFolder();',
					},
				]

				var menupopup = document.createElement("menupopup");
				menupopup.setAttribute("id", "EncodeDecodeHtmlPopup");
				EDH.appendChild(menupopup);

				for (var i = 0; i < menus.length; i++) {
					if (menus[i].label == "sep") {
						var menuseparator = document.createElement("menuseparator");
						menupopup.appendChild(menuseparator);
					} else {
						var menuitem = document.createElement("menuitem");
						menuitem.setAttribute("label", menus[i].label);
						menuitem.setAttribute("tooltiptext", menus[i].tooltiptext);
						menuitem.setAttribute("image", menus[i].image);
						menuitem.setAttribute("class", "menuitem-iconic");
						menuitem.setAttribute("oncommand", menus[i].oncommand);
						//menuitem.setAttribute("onclick", menus[i].onclick);
						menupopup.appendChild(menuitem);
					}

				}
			},
		},
		EncodeTool = {
			Unicode: function() {
				gBrowser.selectedTab = gBrowser.addTab(Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\Unicode.html");
			},
			JavaScriptBeautify: function() {
				gBrowser.selectedTab = gBrowser.addTab(Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\JavaScriptBeautify.html");
			},
			CssBeautify: function() {
				gBrowser.selectedTab = gBrowser.addTab(Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\CssBeautify.html");
			},
			FileEncodeToBase64URL: function() {
				gBrowser.selectedTab = gBrowser.addTab(Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\FileEncodeToBase64URL.html");
			},
			Base64DecodeandEncode: function() {
				gBrowser.selectedTab = gBrowser.addTab(Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\Base64DecodeandEncode.html");
			},
			URLDE: function() {
				gBrowser.selectedTab = gBrowser.addTab(Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\URLDE.html");
			},
			OpenHtmlFolder: function() {
				var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("UChrm", Ci.nsILocalFile);
				file.append("Local");
				file.append("html");
				file.launch();
			}
		}
	EDHitem.add();
})();