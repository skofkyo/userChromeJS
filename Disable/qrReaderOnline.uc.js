// ==UserScript==
// @include        chrome://browser/content/browser.xul
// @name           qrReaderOnline.uc.js
// @version         0.13
// @note            20130425 zxing.org返回数据又插了东西……再改 
// @note            20130412 zxing.org改版了一点，解析数据又有问题了，再修正……希望现在的解析方式能应付得更长久一些
// @note            20130331 修正escapeHTML字符未转化的问题
// @note            20130331 修正url判定正则表达式不准确
// @author         lastdream2013
// @charset 	 utf-8
// ==/UserScript==

var qrReaderOnline={
	unescapeHTML:function ( input ) {
    		return String(input)
    	  .replace(/&amp;/g, '&')
    	  .replace(/&quot;/g, '"')
    	  .replace(/&lt;/g, '<')
    	  .replace(/&gt;/g, '>');
},
	
	initialize:function(){
		var menu=document.getElementById("contentAreaContextMenu");
			menu.addEventListener("popupshowing", qrReaderOnline.optionsShowHide, false);
		qrReaderOnline.createMenu();
	},
	getClickHandler:function(){
		var url=qrReaderOnline.imgURL;
            let req = new XMLHttpRequest();
            req.open("GET", 'http://zxing.org/w/decode?u=' + encodeURIComponent(url), true);
            req.send(null);
            req.onload = function () {
                if (req.status == 200) {
                   var title = req.responseText.match(/<title>(.+)<\/title>/i)[1];
                 	if (title =="Decode Succeeded") {
                		var resultstr = req.responseText.match(/Parsed Result<\/td><td>(.+)<\/td><\/tr><\/table><hr\/>/i)[1];
                 		resultstr = resultstr.match(/<pre[^>]+>(.+)<\/pre>/i)[1];
                		//Services.console.logStringMessage('[ resultstr ]: ' + resultstr );
                   		resultstr = resultstr.replace(/<br\/>/ig, '\n');
						qrReaderOnline.read(qrReaderOnline.unescapeHTML(resultstr));
					}
					else{
						alert("解析失敗：" + title);
					}
                }
            }
	},

	read:function(d){
        	var p=/^(https?|ftp|file):\/\/[-_.~*'()|a-zA-Z0-9;:\/?,@&=+$%#]*[-_.~*)|a-zA-Z0-9;:\/?@&=+$%#]$/;
		if(p.test(d)){
			var f=confirm("QR碼為網絡地址，確認打開?"+'\n\n'+d);
			if(f==true){
				gBrowser.loadOneTab(d, null, null, null, true, false);
	      	}
		}
		else{
			var r=confirm("QR代碼值（按OK鍵將其複製到剪貼板）："+'\n\n'+d);
			if(r==true){
				try{
					Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(d);
				}
				catch(e){
					alert(e);
				}
			}
		}
	},
	createMenu:function(){
		var menu=document.getElementById("contentAreaContextMenu");
		var menuItem=document.createElement("menuitem");
			menuItem.setAttribute("id", "qrReaderOnline.menu");
			menuItem.addEventListener("command", function(){qrReaderOnline.getClickHandler();}, false);
			menuItem.setAttribute("label", "在線解析圖像QR碼");
			menuItem.setAttribute("class", "menuitem-iconic");
			menuItem.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3UlEQVQ4jaWSzWnDQBBGH2kiLsAnIfXhQzoKGBZcgHpxBWpBPqoAGdSCrJfTbix5V4Zk4GNmvvlddvCfgiqQsOdnY5HMJaYpGfulQa74uXCbt2qQm1Sa+GLvrbj3tN8NHg8/ICH6JX7L4TTp/e4BdBx1HD1A0Y/6E3SaxK7zBHq9+pXRWy7iBNp1Ytvq5eIZNATPkBB9Q1jFDMFv0LYVm0arSuvaGyRY1wk5zqrSphH7XofBI3iEZDsMKzvGn2Hfi8vy9nSLN7Es4jwXk3N/vxo2z/un/HYDN6f8F/kB7L2cwHXEHwAAAAAASUVORK5CYII=");
		menu.insertBefore(menuItem, document.getElementById("context-openlinkintab"));

	},
	optionsShowHide:function(){
		if(gContextMenu){
			var isViewableImage=false;
			qrReaderOnline.imgTarget=gContextMenu.target;
			var p=/^(https?|ftp):\/\/[-_.~*'()|a-zA-Z0-9;:\/?,@&=+$%#]*[-_.~*)|a-zA-Z0-9;:\/?@&=+$%#]$/;
			if(gContextMenu.onImage && ( p.test(gContextMenu.imageURL)) ){
			//	if(gContextMenu.onImage  ){
				isViewableImage=true;
				qrReaderOnline.imgURL=gContextMenu.imageURL;
				if(gContextMenu.onLink){qrReaderOnline.linkURL=gContextMenu.linkURL;}
				else{qrReaderOnline.linkURL='';}
			}
			var currentEntry=document.getElementById("qrReaderOnline.menu");
			if(currentEntry){currentEntry.hidden=!isViewableImage;}
		
		}
	},
	fun_OpenSite:function(url){
		gBrowser.loadOneTab(url, null, null, null, true, false);
	},
};
if (window.location == "chrome://browser/content/browser.xul") {
	window.addEventListener("load", qrReaderOnline.initialize(), false);
}

