// =====================UC脚本管理器加图标======================
page(
{id: 'addMenu-rebuild',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAADr6+v8/Pzh4eGSkpJVVVVERERBQUErKyscHBwWFhby8vLT09PPz8+2traxsbGhoaGgoKBtbW1ra2sLCwsKCgqT8ZvFAAAAAXRSTlMAQObYZgAAAD9JREFUGNPFzTcSwCAQxVAtGZzT/a/q8o/H9Kh5pejl/UdLrWWTxNO5K0qeCeyW1BmWKgllW0uQcOS0yzHbfy87/AR9dbQdjwAAAABJRU5ErkJggg=="});
page(
{id: 'webDeveloperMenu',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeBAMAAAAiKQiSAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaPxwLAAAAD3RSTlMAEM/vgL9QQGAsr5/fj3CUF5PQAAABAUlEQVQY04XQz0oCQRwH8O8uYmLEbEu3TnrqFpQIStCy0tl6AusJ3Eu3QKNTp+zQWXqC6gnsDeoNypNHl8UFReTnzndn8ODB72G+85k/MAywN4aJM9Fj8bxv/FRnHacD9tvSA/PA9eJFZO+NfgH8fcGmtAT259jk5ROjvkUaoSAyA+7jTKwDkRU3mBiuSKLbWomI9XZLT3R61sgdwWYqokT+jfy0TV8lHl9f9Tr0tV/J2AorMHaqrQBHZ4fPl3Tj0a/pG+WG0IsmGDfIHYe51Z1xN/fw1Xg4oLv4ob/VLR2iTQduwH9twtVOUK5ndD7e4XQy33CKgl4snaoTfbSGXVkDbzyE9+jnkBkAAAAASUVORK5CYII="});




// =====================右键菜单定制======================
//复制所选
page([{label:'复制',id:"context-copy",condition:"select",accesskey:"",clone:false},{label:'粘贴所选',id:"context-paste",condition:"input",accesskey:"",clone:false},{label:'剪切所选',id:"context-cut",condition:"input",accesskey:"",clone:false},{label: '删除所选',id: "context-delete",condition:"input",accesskey:"",clone:false}]);



// 页面信息右键菜单
new function () {
	var items = [
{
				label : '谷歌站内搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
				oncommand :function () {
				gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('https://www.google.com/search?num=30&hl=zh-CN&newwindow=1&q='+q+'&sitesearch='+Bar+'');window.open(qlocation);}%20void%200");
				}
},{
				label : '百度站内搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
				oncommand :function () {
				gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.baidu.com/s?&ie=UTF-8&oe=UTF-8&cl=3&rn=100&wd=%20%20'+q+'%20%20%20site:%20'+Bar+'');window.open(qlocation);}%20void%200");
				}
},
{
		label: "本地文件搜索",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Software\\Everything.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg=="
	},
{
      label: "查找相似页面",
      oncommand: function() {
      gBrowser.loadURI(
"javascript:%20location.href%20=%20'http://www.similarsitesearch.com/s.php?URL='%20+%20encodeURIComponent(document.location.href)%20+%20'&src=bmt';");},
      condition: "noselect nolink nomailto noimage nomedia noinput",
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4jaWRwQ2DMAxFX8oo6aUSg2QDtmCfjMC9K7ABR1iDK1zcNEVOFNMvfUX6sr+/HbDhAEIudIbmAOzAC3gbBwMwA17ehIdSeCial3cDJmCsTdIMRtE/nJWaooFXtJilSk0lRmGOoGjFBFVoR9QQL6nSEVsNAJ6AEw41A9dgttxJsPJdIeHuCj3yjRaDKzarQb7C9MfgX5wVmydVGUgXkQAAAABJRU5ErkJggg==",
},{},
{
    label: "短网址该网页",
    tooltiptext: "已复制到粘贴板",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAe0lEQVQ4je2QuxGAIBAFV1uxGTqwA0M6MLIK7MBC6IDMYjQ59Q3K6BizMwTsHfcBKooHotwjsNkpeddKoAcS0Ilr7CRpMokfj8QOCICzpLzTJu6R8JLsrfitQGuBQcaazeWswCITnk1CJp05XSFkj85PLK30mYZr58pPdhnlJMaUDTKQAAAAAElFTkSuQmCC",
    oncommand: function() {
        var url = addMenu.convertText("%RLINK_OR_URL%");
        var form = new FormData();
        form.append('url', url);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://dwz.cn/create.php", true);
        xhr.onload = function() {
            var obj = JSON.parse(xhr.responseText);
            addMenu.copy(obj.tinyurl);
        }
        xhr.send(form);
    }
},  
{
		label:"博客一键留言",
		url: "javascript:(function(){document.getElementById('author').value='%E5%A5%94%E8%B7%91%E4%B8%AD%E7%9A%84%E5%A5%B6%E9%85%AA';document.getElementById('email').value='runningcheese@qq.com';document.getElementById%20('url').value='www.runningcheese.com';document.getElementById('comment').value='%E6%96%87%E7%AB%A0%E5%86%99%E5%BE%97%E5%BE%88%E4%B8%8D%E9%94%99%EF%BC%8C%E7%BB%A7%E7%BB%AD%E5%8A%A0%E6%B2%B9~~';})()",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jd2SwQ3CMBAExxQyjQSJMnhQARW5BqoAKXEN/N2I+RiEggR2wiv7ufvs3Gm1sFJBPQFnYOj0TkBEndReM+peHVFLr/kNUnZLzU/9H1AzGb/tLR+Ehv11cQMhpoVFGoD0UeWcc1APwO0HIwFxTi11XtVjyyfzDGKF3HPOlxbAaj0Absok57WhMU0AAAAASUVORK5CYII="
	}, {
		label: "购物比价工具",
		oncommand: function() {
               gBrowser.loadURI("javascript:(function(){var%20s;s=document.createElement(%22script%22);s.type=%22text/javascript%22;s.charset=%22utf-8%22;s.src=%22http://www.gwdang.com/get.js?f=/js/gwdang_extension.js%22;document.body.appendChild(s);})();");
			   },
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzUlEQVQ4y6WTPQrCQBCFX1ghyHcEC9EL2CXYWthYeAuFiJWNJ7GzTecFvIBgJWinjbV1ChGMzQohxM2PD7aYnZnHe7szHrCU1JH0krRLkuSkmkizB/DVFMAdGNfpaeXiraSJpH1TBUPg+Y+Co6S3fY9SGGMeRZc3YFah+Qysi2zMjTHXEqvG/li/KNmzSc9BMCqzmQIDh/wLsHJJ3PwqyMjvugim+QnNTeuhbB7a+hdAAETf3QB8Gwe1lgyILMEiY6OSgtgShDYObRxn6z4vdzQsAV2dpAAAAABJRU5ErkJggg=="
	},{
				label: "搜索共享密码",
				image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAt0lEQVQ4ja2TvRECIRCFv9ECLrCESyzgWqCWSzW7YqzAuQ5swMgWLICIzAyT5fhxRTx9MzvDLrzHYwH4I3pgBhzg34STNX1J3gMWOABdZZNO1ljhLJhlohWTcBa4DztrTlxa8F+QM85GUb4RmzYBdxlbYKyqAYOQwtgXuSUeNXOdCqQOtDA1gROxu0bqY5JfFE6WGLHpFSdlDzKB1de4lcIA7IBro8AReADnUPj5KQeR1s/0Ql6NJxy8Siv3YY6WAAAAAElFTkSuQmCC",
				oncommand: function() {
               gBrowser.loadURI("javascript:(function(){w=open(('http://www.bugmenot.com/view/'+encodeURIComponent(location.host)),'w','location=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,width=500,height=400,modal=yes,dependent=yes');if(w){setTimeout('w.focus()',1000)}else{location='http://www.bugmenot.com/view/'+encodeURIComponent(location.host)}})();");
			   },
   },
{
		label:"查看明文密码",
		url: "javascript:(function()%7Bvar%20IN,F;IN=document.getElementsByTagName('input');for(var%20i=0;i<IN.length;i++)%7BF=IN%5Bi%5D;if(F.type.toLowerCase()=='password')%7Btry%7BF.type='text'%7Dcatch(r)%7Bvar%20n,Fa;n=document.createElement('input');Fa=F.attributes;for(var%20ii=0;ii<Fa.length;ii++)%7Bvar%20k,knn,knv;k=Fa%5Bii%5D;knn=k.nodeName;knv=k.nodeValue;if(knn.toLowerCase()!='type')%7Bif(knn!='height'&&knn!='width'&!!knv)n%5Bknn%5D=knv%7D%7D;F.parentNode.replaceChild(n,F)%7D%7D%7D%7D)()",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAjVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADqhzP4AAAALnRSTlMAtqa4rqqURQbFn4+EciQUDdbAvJxhCs6ximldV1BNSTwmHBr25+XLsnpYMjAfbW7huwAAAKRJREFUGNM9yFWuxEAMBdFqSneYM8yPwftf3sjSKMcfJV9UnMzWm+nMi82/b8vS1MM2AaTc8jJtOqAoWJUe4ieqaVD5CVvDLeuD+yh/YfaYO7XInLqdSEVnCFQiJVWP01o9kfOfSJuJDFhMSyZvTR2vIj4lg93D9Ws8/by7Cxw8lxzgP8aHdjhCyFhVBug267LrW81ixv0dHrMb9VfHwoXgigPAE+P4C0U7fVB0AAAAAElFTkSuQmCC"
	},

];
	var menu = PageMenu({
		label: "多功能菜单",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABBJREFUCNdjgID6fxCaIBcAcUwEeC1dweYAAAAASUVORK5CYII="
	});
	menu(items);
};


//当前页面
new function () {
	var items = [
	{
		label:"自动滚屏",
		url:"javascript:var%20_ss_interval_pointer;_ss_speed=3;_ss_speed_pairs=[[0,0],[1,200.0],[1,120.0],[1,72.0],[1,43.2],[1,25.9],[2,31.0],[4,37.2],[8,44.8],[8,26.4],[16,32.0]];_ss_last_onkeypress=document.onkeypress;_ss_stop=function(){clearTimeout(_ss_interval_pointer)};_ss_start=function(){_ss_abs_speed=Math.abs(_ss_speed);_ss_direction=_ss_speed/_ss_abs_speed;_ss_speed_pair=_ss_speed_pairs[_ss_abs_speed];_ss_interval_pointer=setInterval('scrollBy(0,'+_ss_direction*_ss_speed_pair[0]+');%20if((pageYOffset<=1)||(pageYOffset==document.height-innerHeight))%20_ss_speed=0;',_ss_speed_pair[1]);};_ss_adj=function(q){_ss_speed+=q;if(Math.abs(_ss_speed)>=_ss_speed_pairs.length)_ss_speed=(_ss_speed_pairs.length-1)*(_ss_speed/Math.abs(_ss_speed))};_ss_quit=function(){_ss_stop();document.onkeypress=_ss_last_onkeypress;};document.onkeypress=function(e){if((e.charCode==113)||(e.keyCode==27)){_ss_quit();return;};if(e.charCode>=48&&e.charCode<=57)_ss_speed=e.charCode-48;else%20switch(e.charCode){case%2095:_ss_adj(-2);case%2045:_ss_adj(-1);break;case%2043:_ss_adj(2);case%2061:_ss_adj(1);break;};_ss_stop();_ss_start();};_ss_stop();_ss_start();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABHRSTlMAPvpPlVb7NgAAAC1JREFUCNdjQAEshBmMLIwQBpOIEFRERREqZ2IAU4RqqgsYgMxwACE4AyEFBwC6ugU6mH43HwAAAABJRU5ErkJggg=="
	},{
		label:"自动翻页",
		url:"javascript:(function(){if(window['pgzp']){_pgzpToggleBookmarklet();}else{window._page_zipper_is_bookmarklet=true;window._page_zipper=document.createElement('script');window._page_zipper.type='text/javascript';window._page_zipper.src='http://www.printwhatyoulike.com/static/pagezipper/pagezipper_10.js';document.getElementsByTagName('head')[0].appendChild(window._page_zipper);}})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYUlEQVQ4jWNgoBAwovH/U6ifJAP+MzAwMLDgkyTGVlwGYDgNF0A3AJtGdNcQNNyOgYHhF5TGB/CGF8wQfzya/iMz8GFcLqGeC3BpdsBnA8wAYqILVyz8x6Z/GKREQrZjAACcgyBE8VS2qwAAAABJRU5ErkJggg=="
	},{
		label:"自动刷新",
		url:"javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEUAAAAAAAAfEgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQf2vJAAAAEXRSTlMAHw17Z1b3ybmFRSnn0qgynGqaBMMAAABoSURBVBjTbY/bCoAwDEN725zzMvP/PyuVrVMwD4FDS0IotF30lRw6gddlX1bUwZqNhRU2uIhnIHVu2ZnSYDotsqy4g2c43CGzGr8f5ZVxuteokNz6JWFzLjo+oSxsOcZUPFuYQnpE9Q1ElwJ0eM5iRAAAAABJRU5ErkJggg=="
	},{
		label:"繁简转换",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22https://raw.githubusercontent.com/skofkyo/userChromeJS/master/UserScriptLoader/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQADW0BAgycaAi2ANAbEccBMgAABgfgLQN3XpGgAAAABJRU5ErkJggg=="
	},{
		label:"简繁转换",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_tw%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22https://raw.githubusercontent.com/skofkyo/userChromeJS/master/UserScriptLoader/bookmarklet_tw.js%22;s.id=%22tongwenlet_tw%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQAKsoSFAUoUBK8EaAmI54CHAAACTvgQ4AxXYAgAAAABJRU5ErkJggg=="
	},
{},{
		label:"置顶当前窗口",
		oncommand:function () {
	(function ()
{if(document.getElementById('main-window').hasAttribute('ontop'))
onTop=false;else onTop=true;
	try {

	Components.utils.import("resource://gre/modules/ctypes.jsm");
	var lib = ctypes.open("user32.dll");
	var funcActiveWindow = 0;
	try
	{
		 funcActiveWindow = lib.declare("GetActiveWindow", ctypes.winapi_abi, ctypes.int32_t);
	}
	catch (ex)
	{
		funcActiveWindow = lib.declare("GetActiveWindow", ctypes.stdcall_abi, ctypes.int32_t);
	}
	
	if (funcActiveWindow != 0)
	{
		var activeWindow = funcActiveWindow();
		
		var funcSetWindowPos = 0;
		try
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.winapi_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);
		}
		catch(ex)
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.stdcall_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);		
		}
		
		var hwndAfter = -2;
		if (onTop)
			{hwndAfter = -1;document.getElementById('main-window').setAttribute('ontop','true');}else document.getElementById('main-window').removeAttribute('ontop');

		funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19);
	}

	lib.close();
	
	} catch (ex) {
		alwaysontop_log(ex);
	}
})()
},image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9UlEQVQ4jZ2SoY4CQRBE5zN6Xv3HijUoDAp/5hIkEnXhFxAkiDM4/H0EDoPD3A9gVpGg50wPmZBdZo9Wk+6q6pqaCWFEAUdJhzHYIYFOUooxfr8lIOkEtMAN2L8jkMrzv0R86xG4Fb27pO0zcCFpK+kATL13zfcG9pJ+gamZTSSlR7BA69Y6YANcHHB6WnLOfceey+ES6Iq7fnr6a59vgM7MmldhrcrAzKxxZz/AfVRoMcYPJ7XZSSlarSKglO3m8KrkvM3MGn+VFEIIwK76lQvr86L35WlfgF2VbGazHlcrF170krPVPnIuM5sMbvcnmg8CKvUHlS1YnrKdBIcAAAAASUVORK5CYII="
	},
{
		label:"高亮选定区域",
		url:"javascript:function%20LightBox(){this.bindFn=function(c,d,e){if(typeof%20c!=%22string%22||typeof%20d!=%22function%22){return}var%20b=d.bind(this);e=e?true:false;var%20a={type:c,fn:b,userCapture:e};if(Object.prototype.toString.apply(this._fns)!==%22[object%20Array]%22){this._fns=[]}this._fns.push(a)};this.toBind=function(a){if(this._fns){this._fns.forEach(function(c,b,d){a.addEventListener(c.type,c.fn,c.userCapture)})}};this.init=function(b){var%20f=document.createElementNS(%22http://www.w3.org/1999/xhtml%22,%22div%22);if(!f){return}var%20e=Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth);var%20a=Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);f.style.cssText=%22position:%20fixed;%20border:%200px%20solid%20rgba(0,%200,%200,%200.5);%20top:%200;%20right:%200;%20bottom:%200;%20left:%200;%20margin:%200;%20padding:%200;%20z-index:%2099999;%20border-left-width:%20%22+e+%22px;%20border-top-width:%20%22+a+%22px;%20%22;var%20d=document.body||document.documentElement;var%20c=document.createElementNS(%22http://www.w3.org/1999/xhtml%22,%22div%22);if(c){c.style.cssText=%22width:%20100%;%20height:%20100%;%20margin:%200;%20padding:%200;%20-moz-box-sizing:%20border-box;%20box-sizing:%20border-box;%20%22;this._subBox=f.appendChild(c)}this.box=d.appendChild(f);this.width=e;this.height=a;this.later=b;b||this.toBind(f);f.addEventListener(%22mousedown%22,this,false);this.rect={x:0,y:0,w:0,h:0}};this.handleEvent=function(g){g.preventDefault();g.stopPropagation();var%20f=g.currentTarget;switch(g.type){case%22mousedown%22:this.x=g.clientX;this.y=g.clientY;f.style.borderLeftWidth=this.x+%22px%22;f.style.borderTopWidth=this.y+%22px%22;f.style.borderRightWidth=this.width-this.x+%22px%22;f.style.borderBottomWidth=this.height-this.y+%22px%22;f.style.width=%220px%22;f.style.height=%220px%22;this._subBox.style.border=%22none%22;var%20c=this;this._tid=setTimeout(function(){c._tid=0;f.addEventListener(%22mousemove%22,c,false)},100);f.addEventListener(%22mouseup%22,this,false);break;case%22mousemove%22:var%20a=g.clientX,i=g.clientY;f.setCapture(true);f.style.borderLeftWidth=Math.min(a,this.x)+%22px%22;f.style.borderTopWidth=Math.min(i,this.y)+%22px%22;f.style.borderRightWidth=this.width-Math.max(a,this.x)+%22px%22;f.style.borderBottomWidth=this.height-Math.max(i,this.y)+%22px%22;f.style.width=Math.abs(a-this.x)+%22px%22;f.style.height=Math.abs(i-this.y)+%22px%22;this._subBox.style.border=%221px%20dashed%20rgba(0,%200,%200,%200.6)%22;break;case%22mouseup%22:if(this._tid){clearTimeout(this._tid);this._tid=0}else{f.removeEventListener(%22mousemove%22,this,false);document.releaseCapture();var%20a=parseFloat(f.style.borderLeftWidth),i=parseFloat(f.style.borderTopWidth),b=parseFloat(f.style.width),d=parseFloat(f.style.height);this.rect={x:a,y:i,w:b,h:d};this.later&&this.toBind(f)}f.removeEventListener(%22mouseup%22,this,false);break}};this.uninit=function(){if(this.box){this.box.removeEventListener(%22mousedown%22,this,false);if(this._fns){this._fns.forEach(function(b,a,c){this.box.removeEventListener(b.type,b.fn,b.userCapture)},this);delete%20this._fns}this.box.parentNode.removeChild(this.box);delete%20this.box;if(this._subBox){delete%20this._subBox}}}}var%20hbox=new%20LightBox();if(typeof%20hbox.temp!=%22object%22){hbox.temp={}}hbox.temp.flag=0;hbox.bindFn(%22mouseup%22,function(a){this.temp.flag=0;this.box.removeEventListener(%22mousedown%22,this,false);this.box.removeEventListener(%22mouseup%22,arguments.callee,false)},false);hbox.temp.reselect=function(a){if(a.keyCode==a.DOM_VK_ESCAPE){++hbox.temp.flag;if(hbox.temp.flag==2){hbox.uninit();window.removeEventListener(%22keydown%22,arguments.callee,false)}else{hbox.box.style.borderLeftWidth=hbox.width+%22px%22;hbox.box.style.borderTopWidth=hbox.height+%22px%22;hbox.box.style.width=%220px%22;hbox.box.style.height=%220px%22;hbox.box.addEventListener(%22mousedown%22,hbox,false)}}};window.addEventListener(%22keydown%22,hbox.temp.reselect,false);hbox.init();void%200;",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVQ4jZXSvWpUURTF8d9EvX6sQUgRC9G8gWBjJTaCjUKsVERIY2PlG6jgI0gqIY0gIhZia6EgWAVEYi3WGj8IsiF4JdrckOudGdFVHc5a6382nD0yUJI5LOM6TnbXb7GKB1W13c+PBuUGT7CAu3jdWadxC59xqap+zAKsdOVrVfVz4O3FQ3ysqpvDySU5nmQjyfyEuZuZ7zLHdu727ByaprmMtqoezQK0bbvVNM0J7Gvb9g3M9fxFfJhV7ul9lzUEfMGRfwAsdNkJwAuc735iqpKMsYSXE4Cqeoc13EsymlI+gMd4XlXr0yZgd3lW+pAk+/EM33CjX/gDUFWbOIdTuNKzrmIby8P9GE6gqr7jKc4mOZjkEM7g1XCNpwI6/cJFbOATLuDwtOAsAKxW1biqxriPrf8BrGMpydEki900a395bFJJbif5mmQzyZ1Zud8PpmLu1nwFDAAAAABJRU5ErkJggg=="
	},
{
		label:"垂直分屏浏览",
		keyword: 'czfp',
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACVJREFUCNdjYFEUBAIhBwYmAwYGAQZmBQZGBiADiOjAgFsKdwYADc8DzUvmw0wAAAAASUVORK5CYII="
	},{
		label:"水平分屏浏览",
		keyword: 'spfp',
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACZJREFUCNdjgAMnQTBQYVCG8I0YBCAMRnwMQSiAixDDgFuBsBQGAPjBA2Ss8G+fAAAAAElFTkSuQmCC"
	},
		{
       label: "恢复默认窗口",
       oncommand: function(e) {window.innerWidth=1240, window.innerHeight=740; window.moveTo(100, 50);},//可视区域居中
       image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVQ4jd3Orw3CYBCG8V9JJQMgKjoCkoQg2IRRukMHqEQiOkM9IyBwFYzQGkB8yaVNERDe5HJ/nrvLy7eV4YxdwAvcA3bDEYYETPV9Oh9mRP/Mj6QHl8DilGrIscEpWNqjC1j5KpqFDipYLTx+6w8eZGixDvgW14DlOHxq4Ac0Am4mHKhHtyEUAAAAAElFTkSuQmCC"}
];

		var menu = PageMenu({
		label: "阅读辅助工具",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVQ4je3SIQ7CcAzF4Y8Fj5hBYpEkOBSXWIKY5VQoOAYaw8QMB9gJMBgcCLpkIeEPyQQInmn7fknzmpRvaxB1jhWWmIbXYI8jZi/YNgujwgVr5BijxBm7J5Z3WNUmuSVSJlmWgB/pv+AXFgw7/QYLTGJucHjH2gQ1Tigw8vi2IrxrgtV9L+ivO97LHdW2qVgKAAAAAElFTkSuQmCC"
	});
	menu(items);
};




//复制链接文本地址
new function () {
	var items = [
		{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="
	},
	{ command: 'context-copylink' ,image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
{
		label:"复制链接文本+地址",
		text:"%LINK_TEXT%\n%l",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
	},
];
	var menu = PageMenu({ condition:'link', insertBefore:'context-openlink', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//打开链接的各种方法
new function () {
	var items = [
	{
    label:"新标签页打开",
	  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5j0chXjkmEm3FABQbwIJDHN3ZyHxGYjQQLTfwYUCMAVj9TDUXwEzHF1C0BQCpARnHXF2p+wAAAABJRU5ErkJggg==", 
	  oncommand: "gContextMenu.openLinkInTab();",},
{
			label: '当前标签页打开'
			,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWNxwqAAAAB3RSTlMA6xeSuwaF7u2ifAAAADBJREFUCNdjwASshuVAUGjKwOwE4jK5MTAqgCUUGdghKtixMtiBuuAixDLKIQBuOQBI1gi6H+1sQAAAAABJRU5ErkJggg=="
			,oncommand: 'document.getElementById("context-openlinkincurrent").doCommand();'
		},
   {
		label:"IE浏览器打开",
		text:"%l",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC"
	},
{
		label:"其他浏览器打开",
		text:"%u",
    tooltiptext: "需要自定义Chrome.exe所在位置",
		exec:"C:\\Users\\Administrator\\Desktop\\MyChrome\\MyChrome.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQAGqkIVcAxgYIAF2moGBQYNcAzYzQEL8OwMDgwM5BtRADbjOgOoVog3QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAXItLMzITnmsAAAAASUVORK5CYII="
	},
	{
		label:"隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
	},
	{
		label:"侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
	},
	{
		label:"谷歌缓存打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%l",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVQ4jc2SsQ3AIAwEbwGK1NmFDdIwE3OxCCOkZYAU+RSRMEFyIuUkN7Z5vwH4IxtQgKYoyk2RgQokICiScnlmcgWWTm1RbeikaJpFUo9J47RsEdTznYB7BfclwvgZGxCfBC4nvY8UgX1WxOJVkdUj4jp84wDU6yD4kZGU+wAAAABJRU5ErkJggg=="
	},

];
	var menu = PageMenu({ condition: 'link', insertBefore:'context-openlink', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//复制文本
new function () {
	var items = [
	{ command: 'context-copy',
	  image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII=" },
	{
		label:"复制纯文本",
		text:"%SEL%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="
	},
{
		label:"复制源代码",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAABmZmbc3Ny3t7eRkZE6OjpRDxSxAAAAAXRSTlMAQObYZgAAADJJREFUCNdjwASCECDAIADhY2UwMQoKsgqAGUyMJiAGoyATYzJMhEEYxhDAoh1hBQYAAPxVA4qkxzcpAAAAAElFTkSuQmCC",
	oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);
		}},
	{
		label:"复制BBCode",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAAADd3d1EREQiIiKIiIh3d3czMzPMzMyqqqpVVVURERHu7u6A1ky6AAAAAXRSTlMAQObYZgAAADtJREFUCNdjwASCECDAIADhIzMYBQsMpRWADBaGCiO2ALCIg6EgRCTViHMBjLEILFVjKN2AxRyEFRgAAGitCNm3Ki02AAAAAElFTkSuQmCC",
		oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			function HTMLtoBBCode(a){function b(k,g,j,h,f){this.pos=k;this.font=g;this.face=j;this.size=h;this.color=f}fl=new b(50);fc=new b(50);al=new b(50);function e(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){m=h.indexOf(">",l);fl[g]=new b(0,0,0,0,0);fl[g].pos=l;fl[g].font=1;k=h.substring(l,m);if(k.search(/FACE/)!=-1){fl[g].face=1}else{fl[g].face=0}if(k.search(/SIZE/)!=-1){fl[g].size=1}else{fl[g].size=0}if(k.search(/COLOR/)!=-1){fl[g].color=1}else{fl[g].color=0}l++;g++}}for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fc[f]=new b(0,0,0,0,0);fc[f].pos=l;fc[f].font=1;for(ii=g-1;ii>=0;ii--){if(fl[ii].pos<l){if(fl[ii].font==1){fl[ii].font=0;fc[f].color=fl[ii].color;fc[f].size=fl[ii].size;fc[f].face=fl[ii].face;ii=-1}}}l++;f++}else{fc[f]=new b(0,0,0,0,0);fc[f].font=0}}}function d(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){m=h.indexOf(">",l);al[g]=new b(0,0,0,0,0);al[g].font=1;k=h.substring(l,m);if(k.search(/MAILTO:/)!=-1){k=k.replace(/<A HREF=MAILTO:/,"");k=k.replace(/\"/,"");k=k.replace(/\'/,"");al[g].pos=1;k=k.toLowerCase();al[g].face=k}else{al[g].pos=2}l++;g++}else{al[g]=new b(0,0,0,0,0);al[g].pos=0}}}e(a);a=a.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");a=a.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");a=a.replace(/ = /gi,"=");a=a.replace(/=\"/gi,"=");a=a.replace(/=\'/gi,"=");a=a.replace(/<param name=movie[^>]*value=/gi,"<movie=");a=a.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");a=a.replace(/<A\s*HREF/i,"<A HREF");d(a);a=a.replace(/<BR>/gi,"\r");a=a.replace(/<BR(.*?)\/>/gi,"\r");a=a.replace(/<P>/gi,"\r\r");a=a.replace(/<P [^>]*>/gi,"\r\r");a=a.replace(/<CODE>/gi,"[code]");a=a.replace(/<\/CODE>/gi,"[/code]");a=a.replace(/<BLOCKQUOTE>/gi,"[quote]");a=a.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");a=a.replace(/<UL[^>]*>/gi,"[list]");a=a.replace(/<\/UL>/gi,"[/list]");a=a.replace(/<OL[^>]*>/gi,"[list=1]");a=a.replace(/<\/OL>/gi,"[/list]");a=a.replace(/<LI>/gi,"[*]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<BIG>/gi,"[b]");a=a.replace(/<\/BIG>/gi,"[/b]");a=a.replace(/<B>/gi,"[b]");a=a.replace(/<\/B>/gi,"[/b]");a=a.replace(/<U>/gi,"[u]");a=a.replace(/<\/U>/gi,"[/u]");a=a.replace(/<I>/gi,"[i]");a=a.replace(/<\/I>/gi,"[/i]");a=a.replace(/<EM>/gi,"[i]");a=a.replace(/<\/EM>/gi,"[/i]");a=a.replace(/<h\d>/gi,"\r\r[b]");a=a.replace(/<\/h\d>/gi,"[/b]");a=a.replace(/&nbsp;/gi," ");a=a.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");a=a.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");a=a.replace(/<STRONG>/gi,"[b]");a=a.replace(/<\/STRONG>/gi,"[/b]");a=a.replace(/<TR[^>]*>/gi,"\r");a=a.replace(/<TD[^>]*>/gi," ");a=a.replace(/<TH[^>]*>/gi," ");a=a.replace(/<\/TR>/gi," ");a=a.replace(/<\/TD>/gi," ");a=a.replace(/<\/TH>/gi," ");a=a.replace(/<FONT SIZE=/gi,"[size=");a=a.replace(/<FONT color=/gi,"[color=");a=a.replace(/ color=/gi,"][color=");a=a.replace(/ size=/gi,"][size=");var c;for(i=0;fc[i].font!=0;i++){c="";if(fc[i].color==1){c=c+"[/color]"}if(fc[i].size==1){c=c+"[/size]"}a=a.replace(/<\/FONT>/i,c)}for(i=0;al[i].pos!=0;i++){if(al[i].pos==2){a=a.replace(/<A HREF/i,"[url");a=a.replace(/<\/A>/i,"[/url]")}if(al[i].pos==1){a=a.replace(/<A HREF[^<]*<\/A>/i,al[i].face)}}a=a.replace(/<[^>]*>/g,"");a=a.replace(/>/g,"]");a=a.replace(/\'>/g,"]");a=a.replace(/\">/g,"]");a=a.replace(/\']/g,"]");a=a.replace(/\"]/g,"]");a = a.replace(/\[url\=([^\]]+?)\]|\[img\](.+?)\[\/img\]/g, function($0,$1,$2){if($0.indexOf("http://")<0){var u = $1||$2,b="/";if(u){if(/^\.?\//.test(u)) b = "";return $0.replace(u,content.location.origin+b+u)}}else{return $0}});return a};
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(HTMLtoBBCode(div.innerHTML));
		}
	},
{
    label: "保存选定文本",
    condition: "select",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeElEQVQ4jWNgoBJYz8DA8J8Afs7AwNDOwMDAgs2A/1B6O5IGZHCZgYFBgoGB4ToDA8NqbIbANMzHYcB+KI3TEGINQDaEJBfcxqEeQyACqvg+Gr5MrAHEgkFsgBgDA8N7BkioY8NEGbAfXRKL+CA04DQD4cyEjqkDAH5+TabhljjtAAAAAElFTkSuQmCC",
    oncommand: function() {
        if (!window.NetUtil) Cu.import("resource://gre/modules/NetUtil.jsm");
        if (!window.FileUtils) Cu.import("resource://gre/modules/FileUtils.jsm");

        goDoCommand('cmd_copy');
        var data = readFromClipboard();

        var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
        fp.init(window, "另存为", Ci.nsIFilePicker.modeSave);
        fp.appendFilter("文本文件", "*.txt");
        fp.defaultString = content.document.title + '.txt';

        var res = fp.show();
        if (res != Ci.nsIFilePicker.returnCancel) {
            var aFile = fp.file;

            var ostream = FileUtils.openSafeFileOutputStream(aFile);

            var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
            converter.charset = "gbk";
            var istream = converter.convertToInputStream(data);

            NetUtil.asyncCopy(istream, ostream, function(status) {
                if (!Components.isSuccessCode(status)) {
                    // Handle error!
                    return;
                }

                aFile.launch();
            });
        }
    }}
];
	
	var menu = PageMenu({ condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="  });
	menu(items);
	//page({ condition:'select', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
	});
};


/*右键加图标*/
//链接另存为
page(
  { id: 'context-savelink',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeElEQVQ4jWNgoBJYz8DA8J8Afs7AwNDOwMDAgs2A/1B6O5IGZHCZgYFBgoGB4ToDA8NqbIbANMzHYcB+KI3TEGINQDaEJBfcxqEeQyACqvg+Gr5MrAHEgkFsgBgDA8N7BkioY8NEGbAfXRKL+CA04DQD4cyEjqkDAH5+TabhljjtAAAAAElFTkSuQmCC" 
});
//图像复制
page(
{ id: 'context-copyimage-contents',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
});
//图像另存为
page(
{ id: 'context-saveimage',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII="
});
page(
{ id: 'context-bookmarklink',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCUlEQVQ4jbWSoVLCYRDELzDM3e2PGSPBRzASCAQCgWAwEIxEI8FgpPswBh6ASDQYCDwA8R8IBIIGPh1F/jgw4858aW/3dr5bs/9EZnbcfXCxATAHVmbWOFvs7n2gAlaSxpdun0oan5Oi7e59SU9AZWZXZtYoKZ4lDc3s+pdK0gzYADtgKWn2PXZm3gIvwBuwLW/xZRARPaCSNPkrYkSMgG1EjA6JHrA5ZVIrPjQ5NhAR3TruB4DFsaHM7ADrk+JiUDWbzRuzfRcy8+6TarVa77a/TC3awLZsmwNrYAW8lmItI6Jbq5Y0LKesJD2amZtZo5RpDewy86HWwN0HwLQmpkuaRMT9yT84Fx9MUjjgcgk5VgAAAABJRU5ErkJggg=="
});
//复制
page(
{ id: 'context-copy',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
});
//撤销
page(
{ id: 'context-undo',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAAAAAAAAAAAAAAABAQERAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAABAQEAAAAAAAAAAAABAQEAAAABAQECAgIDAwMBAQEAAAACAgIBAQEAAAAAAAAg8UzUAAAAHHRSTlMA5xG9Rg3yUyDEr5qSaFsY+eHOyLi1Yk4+Oy4GjDFPOAAAAGJJREFUGNOFj1kKwCAMRNVUa127r97/nF3UgqHQ+QiZR4Yh5JYnpSrKkN8Kz0R4JEaXSE33a3JWD8AySYuBdCNzHCzuaxDgAoP2LwJzLNE8ep1rTWfl4V0/vT+tigaqFvKlE4jpAvNwMHn3AAAAAElFTkSuQmCC"
});
//剪切
page(
{ id: 'context-cut',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
});
//粘贴
page(
{ id: 'context-paste',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgoAaQlJT8j44lJCTqSTIAnS8hIXGFaEOwGSAuLi5GtCHYDEDGJBuAyyCcYYPPAHQ+Vm+RYgDWsCHFAKxhQ6wBOOWwBRahGKAodoaYAeSED0kAAOILU0uDB0+zAAAAAElFTkSuQmCC"
});  
//删除
page(
{ id: 'context-delete',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATklEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyBBCBqBjkgwgSi1M0APKVsbBJ2gAsqY8LJqJMgCXzfRxAVXCgBCgnQGkYOoAAAV3QUQ5G1NkAAAAAElFTkSuQmCC"
});     
//此框架
page(
{ id: 'frame',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC"
});
//打开链接
page(
{ id: 'context-openlinkincurrent',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC"
});
//分享此页面     
page(
  { id: 'context-sharepage',insertAfter:"context-inspect",clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC" 
});
//播放速度     
page(
  { id: 'context-media-playbackrate',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAI0lEQVQ4jWNgGNbgPxQPDgPIMoxmBuA1jBhNowZQIX0MMgAAHXQ5x38zRc4AAAAASUVORK5CYII=" 
});









//添加页面右键菜单项
	/*{page([
		label: "弹窗翻译所选文本",
		condition: "select",
		oncommand: "gTranslator.selectionTranslation();",
		insertBefore: "context-selectall",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFCSURBVDhPnZExSwNBEEZPESStP8PKP2Fnr1hYiI2dkEoQJKWCnVXEIpDGQsRGJGKhFsKBHpEIFokJ4VQkpFMLm5E3OsvcmRBx4XG3e/u9md2LGB9vPfH0e+3A6/OD6KZhIx+u1Y5kb383I3h5uh8uIURgfaOoLC0vKjaHtNv4m8AHvWikAK7jCw0kjVgDq6UtWYslMH8pMnf2LjMnIlMHn4oK/IVZRTravumPFKjEC7hAaz0fPm+mCpKBgsfWbebshAy6sb/Bu4UL5VQiPnDuiWJT74EumFvLQGXbR6FfAsIGFwicFRBQ+TBOtDoC1girwIcNAiYghHDzNNEgAmRBwPBh5mMLx6FN+60EDdamKx2Z3Kl/C8ZXrjTMExCArzhbvVPoBAHPjCAfNhAQtJaBy4YgYAySsAF82NaMn/h/RxR9Ab4TXij6pKP0AAAAAElFTkSuQmCC"
 },
]);
*/

//当前页面
new function () {
	var items = [
{
    label: "编辑当前页面",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=",
    oncommand: function() {document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}}
},
{
                label: '解除右键限制',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAAAAAAC4uLjb29tmZmY6OjqRkZHr6+vIyMiurq6enp6fJmq8AAAAAXRSTlMAQObYZgAAAGVJREFUCNdjQAJMS5MawHSgoKAYiFEYwMBg6ABkhACxYhhQJgCIhQwNGFgTgAIKLAkMjAZAAQY2ByADKMDABGIABUAiLAlAAQZWoKCQEEg/EDsCBZhBHBYhY2MgBwgmCgoGIbkBAF+5CxbmrSXzAAAAAElFTkSuQmCC",
                oncommand: function() {
                gBrowser.loadURI("javascript:(function(bookmarklets)%7Bfor(var%20i=0;i%3Cbookmarklets.length;i++)%7Bvar%20code=bookmarklets%5Bi%5D.url;if(code.indexOf(%22javascript:%22)!=-1)%7Bcode=code.replace(%22javascript:%22,%22%22);eval(code)%7Delse%7Bcode=code.replace(/%5Es+%7Cs+$/g,%22%22);if(code.length%3E0)%7Bwindow.open(code)%7D%7D%7D%7D)(%5B%7Btitle:%22%E7%A0%B4%E9%99%A4%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E9%99%90%E5%88%B6%22,url:%22javascript:function%20applyWin(a)%7Bif(typeof%20a.__nnANTImm__===%5Cx22undefined%5Cx22)%7Ba.__nnANTImm__=%7B%7D;a.__nnANTImm__.evts=%5B%5Cx22mousedown%5Cx22,%5Cx22mousemove%5Cx22,%5Cx22copy%5Cx22,%5Cx22contextmenu%5Cx22%5D;a.__nnANTImm__.initANTI=function()%7Ba.__nnantiflag__=true;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.addEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__)%7D;a.__nnANTImm__.clearANTI=function()%7Bdelete%20a.__nnantiflag__;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.removeEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__);delete%20a.__nnANTImm__%7D;a.__nnANTImm__.fnANTI=function(b)%7Bb.stopPropagation();return%20true%7D;a.addEventListener(%5Cx22unload%5Cx22,function(b)%7Ba.removeEventListener(%5Cx22unload%5Cx22,arguments.callee,false);if(a.__nnantiflag__===true)%7Ba.__nnANTImm__.clearANTI()%7D%7D,false)%7Da.__nnantiflag__===true?a.__nnANTImm__.clearANTI():a.__nnANTImm__.initANTI()%7DapplyWin(top);var%20fs=top.document.querySelectorAll(%5Cx22frame,%20iframe%5Cx22);for(var%20i=0,len=fs.length;i%3Clen;i++)%7Bvar%20win=fs%5Bi%5D.contentWindow;try%7Bwin.document%7Dcatch(ex)%7Bcontinue%7DapplyWin(fs%5Bi%5D.contentWindow)%7D;void%200;%22%7D,%7Btitle:%22%E7%A0%B4%E9%99%A4%E9%80%89%E6%8B%A9%E5%A4%8D%E5%88%B6%E9%99%90%E5%88%B6%22,url:%22javascript:(function()%7Bvar%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20()%7Breturn%20true;%7D;with(document.wrappedJSObject%7C%7Cdocument)%7Bonmouseup=null;onmousedown=null;oncontextmenu=null;%7Dvar%20arAllElements=document.getElementsByTagName(%5Cx27*%5Cx27);for(var%20i=arAllElements.length-1;i%3E=0;i--)%7Bvar%20elmOne=arAllElements;with(elmOne.wrappedJSObject%7C%7CelmOne)%7Bonmouseup=null;onmousedown=null;%7D%7Dvar%20head=document.getElementsByTagName(%5Cx27head%5Cx27)%5B0%5D;if(head)%7Bvar%20style=document.createElement(%5Cx27style%5Cx27);style.type=%5Cx27text/css%5Cx27;style.innerHTML=%5Cx22html,*%7B-moz-user-select:auto!important;%7D%5Cx22;head.appendChild(style);%7Dvoid(0);%7D)();%22%7D%5D)");
                }
                },{
    label: "网页字体查询",
    url: "javascript:(function(){var%20d=document,s=d.createElement('scr'+'ipt'),b=d.body,l=d.location;s.setAttribute('src','http://chengyinliu.com/wf.js?o='+encodeURIComponent(l.href)+'&t='+(new%20Date().getTime()));b.appendChild(s)})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABNJREFUCNdjgAD5DwyMDAQREAAAK6kBHIC7lQ4AAAAASUVORK5CYII="
},
{
		label:"显示所有链接",
		url: "javascript:WN7z=open('','Z6','width=400,height=200,scrollbars,resizable,menubar');DL5e=document.links;with(WN7z.document){write('<base%20target=_blank>');for(lKi=0;lKi<DL5e.length;lKi++){write(DL5e[lKi].toString().link(DL5e[lKi])+'<br><br>')};void(close())}",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABFJREFUCNdjgAPzP0CEkw0DAKqRBzPWW0nIAAAAAElFTkSuQmCC"
	}, 
{
		label:"移除所有图片",
		url:"javascript:(function(){function%20toArray%20(c){var%20a,%20k;a=new%20Array;for%20(k=0;%20k%20<%20c.length;%20++k)a[k]=c[k];return%20a;}var%20images,%20img,%20altText;images=toArray(document.images);for%20(var%20i=0;%20i%20<%20images.length;%20++i){img=images[i];altText=document.createTextNode(img.alt);img.parentNode.replaceChild(altText,%20img)}})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFklEQVQ4jc3SPy9EQRQF8N+uREcUT6EgJIr1DUSyQUQpEgq+jKAgW9EoiEJCr9UoEBZR6JAt/Glka6HaYhVvJtZkt+ZWb+45590zZy5/XYUO/WFMYChw3lDFK0p4jNpiIpzEGS4xh170hO9r3ATxWLupm2HCUgdXJTTxjtUU3MIFsnDOUAnkOnaDuBSwO6xF8XywlfmpCk4wgHIQH7XgGV4wDTXMJI7qQRxtl/GRcBZwW5QH2UjAIkb9BFZDV8JpoBsW8ZBc4SBMHkcfjrGfXOEZs7Gxg9MARNuH+MQX9vwOuIqNxJFt+TPGtNvVcuCsx0brJsYNu0c/zuUbWMAIpgK+gqt2P2jKA3uSr3IZg6Hfusr/rL4BuIFAjab+mzQAAAAASUVORK5CYII="
	},{
		label: "显示所有图片",
		oncommand: function() {
               gBrowser.loadURI("javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}");
			   },
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII="
	},{
    label: "显示丢失图片",
    url: "javascript:(function(){var%20ims=document.images,%20brokenCount=0,%20brokenURLs=%22%22,%20text,%20i;%20for(i=0;i<ims.length;++i)%20if%20(!%20(ims[i].naturalHeight%20||%20ims[i].fileSize%20>%200))%20{%20++brokenCount;%20brokenURLs%20+=%20%22URL:%20%22%20+%20ims[i].src%20+%20%22\n%22;%20};%20text%20=%20brokenCount%20+%20%22%20broken%20image%22%20+%20(brokenCount==1?%22%22:%22s%22);%20if(brokenCount)%20alert(text%20+%20%22:\n\n%22%20+%20brokenURLs);%20else%20alert(%22No%20broken%20images.%22);%20})()",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII="
},  	


];
	
var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=", onpopupshowing: syncHidden });
	menu(items);
};



//当前页面
new function () {
	var items = [
{
				label : '翻译当前页面',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
				oncommand :
			function() {
               gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())");

				},
			}, 
{
				label : '谷歌页内翻译',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg==",
				oncommand :
				function ()
				{
					gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")
				},
			},
{
    label: "必应页内翻译",
    tooltiptext: "无法在中文页面内使用",
    oncommand : function (){
        var s = content.document.createElement('script');
        s.type = 'text/javascript';
        s.src="http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs";
        content.document.body.insertBefore(s, content.document.body.firstChild);
     },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYklEQVQ4jZWTO0tDQRCFP8Uo2giC2Cqi2IiCpZ2FP0CwtPQP2PgAIWipWKTS1vI2ksTc7GyhYCcoWCj4AEs7BVFIcnN3x+YG8jAxHphmd8/H2ZldADRNnxaY/QoZBXr4r97yDKnl3Au3TjiKDHPJVk+HagIIV2pRtagz7PwLoO0BdAA1JvD1AGG7XGC6GrL8nWUsnab3F1iHBMJWJc+Mtzx74d4Jx3GR1VKOiZsTUi1NbHcFJ2Rqa2qJVHj1liAustKQqh0gKjCvwrVaojqQeoN5yTDQVRO/s4w5y6EKle4Blg2AcsikM+yp8KoW3xXAC2fVkEVn2FTLc70xqafYsNYwiQRwoYJ1wr4Kdyq4BqPw7oRMOc9U6xQCBtVymkSNmowVL4TVkKXLNH0t5poiYcFbjApxYvZqeYgN6x8Bw00P6Xd9Bow4w64Kj044KOWYaDL+/VNvTkiViow/BPT/eRj4AQDIQ/bRONShAAAAAElFTkSuQmCC"
},
{
    label: "谷歌弹窗翻译",
    url: "javascript:(function(){var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){window.open('https://translate.google.cn/translate_t?hl=zh-CN#auto|zh-CN|'+t);}else{window.open('https://translate.google.cn/translate?u='+escape(location.href)+'&hl=zh-CN&ie='+e+'&sl=auto&tl=zh-CN');};})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=="
},
{
    label: "百度弹窗翻译",
    url: "javascript:(function(){window.open('http://fanyi.baidu.com/transpage?query='+escape(document.location.href)+'&from=auto&to=zh&source=url&render=1')})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC"
},
/*{
                label: '必应划词翻译',
                subdir: '',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",
                oncommand: function() 
              {gBrowser.loadURI("javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");
                }
                },
{
    label: "海词划词翻译",
    url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://dict.cn/hc/init.php');%20document.body.appendChild(element);})())",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+klEQVQ4jX2TyU9bdxSFf39FI0JIApTUIgwOc5ixBVn0L2kVqV202Veq1G3VdNi0SSklDmMwBtvP0/NYj8/2MyZAmME4CTY4KVQhqaWvC+xEkaqc/bmfzj33CiGE0CWzI3o169KnMkc6NcNQYp/B+B4Dyi79sW36Ilv0hDfoDq7T5V896vCtuFqdSyNCCCH0iYNhvZot6tQDdMmyeZf+2A590W16w5v0hNa5GXhCl3+VDu9j2t1pWp2polZKDAt9KiPr1AxDyQ9R1+j0rdDuWaZNTtPiTHHDnqRJUpxiKJHJlakDyg4/KmliewfIOwes5I/Jnf7DxmGe78MqvU6VFoeK1pagSVJoMEdzYjDxjvqFXwVgK3/8dkDh1RllrT07ZECK0GSN0WCOUL8QQgwopayRTX5R0gDsHhW4bfVxxxniG2+M6dQK+ZNTAFxPtri+GKbeFERj9CP6olv0hjfpDq7zc2wJgP3jAm1ymlZXihuOJFqbwndykPh+FoBPF7x8Mufn2qwX0RPaoDt4vuEfwiqv/i2ycXhEi1NFa0/QLCk0WqIMG93En+ZYfvqcr+wB6mY91E7LiJuBNTp9q3R4HvOtJ8J24SXBnX20tngpa5TrC2FuGd3svTxh78Xf3LH7qZ1yUT3hRHR6y/Us8bXkw7ubZWZpjUZLjIbFCPWmEBpjgJ8CCqev33D6+g1D03aqJxxcMdgQbe53Wb+0+jAklrkXVfncFuAzyc9tycfD5PLbJrzr21x9aOfKA4mqcSuifBTNUpy7oQQfUub4BV2TNi6PS1T9aaFyzIzQ2uL5JqtCoznK3eD/Dzg5O+PXcIJmg42qcSuXxixU/rFIxagpJxosUbl8FB3zPgaNbvrn3PTPyvTNOGmfdFBjkLj84Jx6aczMxdFFKn43ceH+vCw0ptCIZv6vosbo59ojL3UzHmqnZGomnaWs71Mvji6UzMbiR789Ov/Ij+e8t+pmvXLttFyomXJRPeHgqsH+HrWyRK24byxcuDcnl83/AUlb4n7+kg0rAAAAAElFTkSuQmCC"
},
*/
{
    label: "词霸划词翻译",
    url: "javascript:var%20ICIBA_HUAYI_ALLOW=1,iciba_huaci_url=%22http://open.iciba.com/huaci/%22;void%20function(){if(!document.getElementById(%22icIBahyI-yi%22)){var%20a=document.createElement(%22div%22);a.id=%22icIBahyI-yi%22,a.style.display=%22none%22,a.style.zIndex=%224294967295%22,document.body.insertBefore(a,document.body.firstChild);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-main_box%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20e='%3Clink%20type=%22text/css%22%20rel=%22stylesheet%22%20href=%22'+iciba_huaci_url+'mini.css%22%20/%3E%3Cobject%20style=%22height:0px;width:0px;overflow:hidden;%22%20classid=%22clsid:d27cdb6e-ae6d-11cf-96b8-444553540000%22%20codebase=%22http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab%23version=6,0,0,0%22%20width=%220%22%20height=%220%22%20id=%22asound_hanci%22%20align=%22absmiddle%22%3E%3Cparam%20name=%22allowScriptAccess%22%20value=%22always%22%20/%3E%3Cparam%20name=%22movie%22%20value=%22http://www.iciba.com/top/asound.swf%22%20/%3E%3Cparam%20name=%22quality%22%20value=%22high%22%20/%3E%3Cembed%20src=%22http://www.iciba.com/top/asound.swf%22%20quality=%22high%22%20width=%220%22%20height=%220%22%20name=%22asound_hanci%22%20align=%22absmiddle%22%20allowScriptAccess=%22always%22%20type=%22application/x-shockwave-flash%22%20pluginspage=%22http://www.macromedia.com/go/getflashplayer%22%20/%3E%3C/object%3E%3Cdiv%20class=%22icIBahyI-main_title%22%20id=%22icIBahyI-main_title%22%20%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-gb%22%20class=%22icIBahyI-gb%22%20title=%22%E5%85%B3%E9%97%AD%22%3E%3C/a%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-dq%22%20class=%22icIBahyI-dq2%22%20title=%22%E7%82%B9%E5%87%BB%E5%9B%BA%E5%AE%9A%E7%BB%93%E6%9E%9C%22%3E%3C/a%3E%E7%88%B1%E8%AF%8D%E9%9C%B8%20%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3Cdiv%20class=%22icIBahyI-sz_list%22%20id=%22icIBahyI-sz_list%22%3E%3Ca%20href=%22javascript:;%22%3E%E5%85%B3%E9%97%AD%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3C/a%3E%3Ca%20href=%22%23%22%20target=%22_blank%22%3E%E5%8F%8D%E9%A6%88%3C/a%3E%3Ca%20href=%22%23%22%20style=%22border:none;%22%20target=%22_blank%22%3E%E5%B8%AE%E5%8A%A9%3C/a%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tr%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-bl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-br%22%3E%3C/span%3E%3C/div%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-search%22%3E%3Cinput%20id=%22ICIBA_HUAYI_input%22%20name=%22%22%20type=%22text%22%20onkeydown=%22ICIBA_HUAYI_KEYDOWN(event);%22%3E%3Ca%20href=%22javascript:;%22%20class=%22icIBahyI-sear%22%20onclick=%22ICIBA_HUAYI_searchword()%22%20%3E%E6%9F%A5%20%E8%AF%8D%3C/a%3E%3C/div%3E%3Cspan%20class=%22icIBahyI-contTop%22%3E%3C/span%3E%3Cdiv%20class=%22icIBahyI-loading%22%20id=%22loading%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-main_cont%22%20id=%22icIBahyI-main_cont%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-CB%22%20id=%22icIBahyI-scbiframe%22%20style=%22display:none%22%3E%3C/div%3E%3Cdiv%20id=%22ICIBA_TOO_LONG%22%20style=%22height:150px%22%20class=%22icIBahyI-footer%22%3E%E6%82%A8%E5%88%92%E5%8F%96%E7%9A%84%E5%86%85%E5%AE%B9%E5%A4%AA%E9%95%BF%EF%BC%8C%E5%BB%BA%E8%AE%AE%E6%82%A8%E5%8E%BB%E7%88%B1%E8%AF%8D%E9%9C%B8%3Ca%20href=%22http://fy.iciba.com%22%3E%E7%BF%BB%E8%AF%91%3C/a%3E%E9%A1%B5%E9%9D%A2%E3%80%82%3C/div%3E%3Cspan%20class=%22icIBahyI-contB%22%3E%3C/span%3E';document.getElementById(%22icIBahyI-main_box%22).innerHTML=e;var%20c=document.createElement(%22script%22);c.setAttribute(%22src%22,iciba_huaci_url+%22dict.php%22),document.body.appendChild(c);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-USER_LOGIN%22,i.className=%22icIBahyI-USER_LOGIN%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20t=document.createElement(%22script%22);t.setAttribute(%22src%22,iciba_huaci_url+%22ICIBA_HUACI_COM.js%22),document.body.appendChild(t)}}();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVQ4jZXSoZKDMBSF4fMYvAKysnYl8kosMrIyNnIlsrYysjK2EllZuxJZ+a8I0LRlp2xmDjGcj5sJUrG8iev1usSb0NblTcCZvM4kr+3AWplLtQ3IZS1lbyL0Z6yLWBfZ1x8QbyIEcY95ZHcciCP0P5nsvsHM/kYeEwgJBuDCAwDoDiMhhHWkBGq7LaV4v9P/ZGwzIIUFGAqktts2wNvzFPPX28PI6XT6DDzuPhTJmDQ9iqS9WAWOO5GU09Q9td0YXpC0z//OE0BoSPMLxT4jcz+XeQeSn4p9D02Ts6tgV70hAEkrR0gv5ywzI23bkiSccxMwfsGlInkRprE/7c65fCsxRpxz/858i78ni99QUhiH/QAAAABJRU5ErkJggg=="
},
{
    label: "汉典划词翻译",
    url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://www.zdic.net/tools/zih.asp');%20document.body.appendChild(element);})())",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg=="
}

];
	
var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVR42mNkwATrgXg/EE9iIAIwYhETAOKDQFwOxDuIMeA/A3FgFhCnE+MCZBAMxI1ArEOMFw4AcTIQ30USOwrEcWhiOA2wBeIOILaG8j2AOAKIE0gJRJCmQCC+CsThQOwNxB9IMUAAGoXfiNGMbIA8EG+BBpYnEN8G4jtQORVoGChDxUKAeC22aFTBEViggLSCpg1WIOYEYiN80fgfjzjIkkXIMUOsAaD00ATE2kCcB8RuQOxDigEgb8wA4s1ArADE54FYEBTIuAwgJrm3A3EVIxF5YCaUbgPij1C2MxCvARlOjAG4AvUcKDYAi+YxEXgzorIAAAAASUVORK5CYII=", onpopupshowing: syncHidden });
	menu(items);
};


//当前页面
page({
    label: "将图像另存到桌面",
    tooltiptext: "左键：桌面\n中键：D盘\n右键：下载",
    onclick: function(e) {
        var uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(gContextMenu.imageURL, null, null)
        switch(e.button) {
            case 0:
                var path = "C:\\Users\\Administrator\\Desktop\\";
            break;
            case 1:
                var path = "D:\\";
            break;
            case 2:
                var path = "C:\\Users\\Administrator\\Downloads\\";
            break;
        }
        var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(path);
        file.append(getDefaultFileName(null, uri));
        internalSave(null, null, null, null, null, null, null, {
            file: file,
            uri: uri
        }, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
    },
   condition: "image",
   insertAfter: "context-saveimage",
   image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeElEQVQ4jWNgoBJYz8DA8J8Afs7AwNDOwMDAgs2A/1B6O5IGZHCZgYFBgoGB4ToDA8NqbIbANMzHYcB+KI3TEGINQDaEJBfcxqEeQyACqvg+Gr5MrAHEgkFsgBgDA8N7BkioY8NEGbAfXRKL+CA04DQD4cyEjqkDAH5+TabhljjtAAAAAElFTkSuQmCC",
});


//当前页面
new function () {
	var items = [
{
    label: "分享当前页面",
    url: "javascript:(function(){var%20w=window,d=document,s;if(!w.jiathis){w.jiathis=1;s=d.createElement('script');s.src='http://www.jiathis.com/code/j.js';d.getElementsByTagName('head')[0].appendChild(s);s=null}else{$CKE.center()}})()",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC"
},{
				label : '生成当页面二维码',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAACNJREFUCNdjAIJaOwZXJYZQLQaXRQw1+0Ai9f+QxJWg4mAAANvuCPguZlr6AAAAAElFTkSuQmCC",
				oncommand :
				function ()
				{
					gBrowser.loadURI("javascript:(function(){if(document.getElementById){var%20x=document.body;var%20o=document.createElement('script');if(typeof(o)!='object')%20o=document.standardCreateElement('script');o.setAttribute('src','https://qrbookmarklet.googlecode.com/svn/trunk/qr.js');o.setAttribute('type','text/javascript');x.appendChild(o);}})();")
				}
},{ 
    label: "邮件发送当前页面",
    id: 'context-sendlink',clone :false,
    command:'Browser:SendLink',
    condition: "normal",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jc3SL24CQRSA8R9s0pA1SBSqGlfHBUrIOmQ9FlnJGTgDJ6ikd6gtDgchVTUoyFbsE7CdEBbTvmQmeTPzffPmD/8hXnBE2bAdMYLvaP0Gm06xwVbYZvhE7wa4CPAx2KrDHB/oXoEH+MJT5BcCWOAdeQLuR9nF2dgvASzxhuxsLI/qXmtrk4KHECwjzyJfJKoqWyFo1SZyrLBGR3W5zzjVBe2EFQ4Yq553j0kCvjzHnVG2scPwDngYrJHqYzT9yttg/zh+ALjrRgDEp5xKAAAAAElFTkSuQmCC",
},{
    label: "发送到百度云收藏",
    url: "javascript:void%20(function(d)%20{var%20e%20=%20d.createElement('script');e.byebj=true;e.src%20=%20'http://s.wenzhang.baidu.com/js/pjt/content_ex/page/bookmark.js?s=bm&t='%20+%20(+new%20Date());var%20b%20=%20d.getElementsByTagName('body')[0];b.firstChild%20?%20b.insertBefore(e,%20b.firstChild)%20:%20b.appendChild(e);}(document));",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg=="
},{
    label: "发送到有道云笔记",
    url: "javascript:(function(){CLIP_HOST='http://note.youdao.com/yws';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=CLIP_HOST+'/YNoteClipper.js?'+(new%20Date().getTime()/100000);x.charset='utf-8';document.getElementsByTagName('head')[0].appendChild(x);}catch(e){alert(e);}})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},
{
    label: "发送到Evernote",
    url: "javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},
{
		label:"发送到Onenote",
    tooltiptext: "需要自定义OneNote.exe所在位置",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC",
		oncommand: function(){
			var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
			var focusedWindow = document.commandDispatcher.focusedWindow;
			var selection = new String(focusedWindow.getSelection());
			if (selection.length == 0) {
				 goDoCommand('cmd_selectAll');
				 var allSelection = new String(focusedWindow.getSelection());
				 if (allSelection.length == 0)return;
				 goDoCommand('cmd_copy');
				 goDoCommand('cmd_selectNone');
			}
			else
			{
				 goDoCommand('cmd_copy');
			}
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(onenotePath);
			var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
			process.init(file);
			var args = ["/sidenote", "/paste"];
			process.run(false, args, args.length);
		}
},

];
	
var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC", onpopupshowing: syncHidden });
	menu(items);
};



//当前页面
new function () {
	var items = [
	{
		label:"IE浏览器打开",
		text:"%u",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC"
	},
{
		label:"其他浏览器打开",
		text:"%u",
    tooltiptext: "需要自定义Chrome.exe所在位置",
		exec:"C:\\Users\\Administrator\\Desktop\\MyChrome\\MyChrome.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQAGqkIVcAxgYIAF2moGBQYNcAzYzQEL8OwMDgwM5BtRADbjOgOoVog3QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAXItLMzITnmsAAAAASUVORK5CYII="
	},
		{
		label:"隐私窗口打开",
		oncommand: "openLinkIn(content.location, 'window',{private:true});",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
	},
	{
		label:"侧边栏中打开",
		oncommand:"openWebPanel(content.document.title, content.location);",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
	},
	{
		label:"谷歌缓存打开",
		url:"https://webcache.googleusercontent.com/search?q=cache:%u",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg=="
	},
];
	
var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',onpopupshowing: syncHidden });
	menu(items);
};


//图片
new function () {
	var items = [
	{command: 'context-copyimage-contents',
	 image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
	},
 {
    label:"复制图像地址",
	  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII=",
	  class: "context-copyimage", 
	  oncommand: "gContextMenu.copyMediaLocation();",
},
	   {
		label: '谷歌以图搜图',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
   oncommand: function() {
        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
    }
	},
{
    label: "四引擎搜图片",
    condition: "image",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
    oncommand: function() {
        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
        gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
        gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
        gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
    }
},{
    label: "OCR文字识别",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMA8pCEUxQK59CV0pPm8Xt3/wAAAFlJREFUCNdjQALBCzhMQTSLuAJToQOQ4TuNgSHzCgMDqyRIeGIAA3MZ7927F9INGDgUQCJMC4AESATJEKAUSISpAagYxM0xgGrfGAA0cBsDQ/YVuBVwSxEAAEPFFhtdnlGhAAAAAElFTkSuQmCC",
    oncommand: function() {
        //apikey
        var apikey = "aee93efca6438819212e64aa47711ee0";
   
        var base64str = img2base64(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL).replace("data:image/jpeg;base64,", "");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "http://apis.baidu.com/apistore/idlocr/ocr", true);
        xmlHttp.setRequestHeader("apikey", apikey);
        var formData = new FormData();
        for(var d of ("fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&image=" + base64str).split('&'))
            formData.append.apply(formData, d.split('=', 2));
        xmlHttp.send(formData);
        xmlHttp.onload = function() {
            if (xmlHttp.status == 200) {
                var data = JSON.parse(xmlHttp.responseText);
                if (data.errNum != 0)
                    alert("错误：" + data.errMsg);
                else {
                    var str = "";
                    for (var i in data.retData) str += data.retData[i].word;
                    alert("识别内容：" + str);//弹窗提示
                    addMenu.copy(str);//自动复制识别内容到剪贴板
                }
            }
        };
   
        function img2base64(imgsrc) {
            if (typeof imgsrc == 'undefined') return "";
   
            const NSURI = "http://www.w3.org/1999/xhtml";
            var img = new Image();
            var that = this;
            var canvas,
                isCompleted = false;
            img.onload = function() {
                var width = this.naturalWidth,
                    height = this.naturalHeight;
                canvas = document.createElementNS(NSURI, "canvas");
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                isCompleted = true;
            };
            img.onerror = function() {
                Components.utils.reportError("Count not load: " + imgsrc);
                isCompleted = true;
            };
            img.src = imgsrc;
   
            var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
            while (!isCompleted) {
                thread.processNextEvent(true);
            }
   
            var data = canvas ? canvas.toDataURL("image/jpeg", 1) : "";
            canvas = null;
            return data;
        }
    }
},{},
{
    label: "在线编辑图片",
    condition: "image",
    tooltiptext: "图片地址已经复制到粘贴板",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII=",
    oncommand: "gContextMenu.copyMediaLocation(); gBrowser.selectedTab = gBrowser.addTab('https://pixlr.com/editor/');",
},
{
    label: "在线美化图片",
    condition: "image",
    tooltiptext: "图片地址已经复制到粘贴板",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII=",
    oncommand: "gContextMenu.copyMediaLocation(); gBrowser.selectedTab = gBrowser.addTab('https://v2.polarr.co');",
},
{
label: "打开图像RAR",
condition: "image",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgGCwghoGB4Q8DA8N/IvEfBgYGT2QDPjIwMFijGfofB5sBqvYZLsXIYsgYmzxBA4iVp50BZHmBjZouoNgAor3wjIHCdOAJFSA2JT5jQEuJQxgAAFeqQ1dXIFWxAAAAAElFTkSuQmCC",
oncommand: function() {
var imageUrl = (gContextMenu.mediaURL || gContextMenu.imageURL);
imageUrl = imageUrl.replace(/\.jpg\.thumb\.jpg$/, '.jpg');
var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsILocalFile);
file.append(new Date().getTime() + ".rar");
Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
.saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
.newURI(imageUrl, null, null), null, null, null, null, null, file, null);
setTimeout(function() {
file.launch();
}, 500);
},
},{
		label:"复制Base64码",
		text:"%IMAGE_BASE64%",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC"
	},
{command: 'context-viewimageinfo',
 image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaVTQQ4AMATzFq/y/49sFxIRoWiyU9eWDaIar+FLsBrwVCgqjEcmYku1Fqya0iSKvQFkgvRrJjiBBGUP5jnk3q2ClkCDzr+QmYzmIJqsJtFjvQsep22E8AGEZDOcIlQ9sgAAAABJRU5ErkJggg=="},
];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};



//快捷回复
new function(){
	var items = [
		{label:"虽然不知道LZ在说什么", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子～",accesskey: "T",image:" "},
		{label:"Qmail~~~", input_text: "xxxxxx@qq.com",accesskey: "D",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "Y",image:" "},
		{label:"反馈情况再说", input_text: "Mark，看反馈情况再说。。。",accesskey: "M",image:" "},
		{label:"看起来很不错", input_text: "看起来很不错哦，收藏之~~~\n谢谢LZ啦！！！",accesskey: "G",image:" "},
		{label:"谢谢楼主分享", input_text: "谢谢楼主的分享!这个绝对要顶！！！",accesskey: "F",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
		{label:"坐等楼下解答", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
		{},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",accesskey: "A",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "S",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "X",image:" "}
	];
	var menu = PageMenu({
		label:"快速输入...",
		condition:"input",
    insertBefore:"context-searchselect",
		accesskey: "W",
		position: 1,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAABAQEFBQUFBQUAAAAFBQUBAQEFBQUFBQUBAQEBAQEBAQEFBQUFBQUFBQUFBQUFBQUBAQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUDAwNxFq0VAAAAGXRSTlMA5xCm+wj2i5Tu7eudShoMB+/Df35nWiolwh78/gAAAGNJREFUGNN9ykkSgCAMRNEmRnAWZ7n/RU2hSBaWvcp/Feg5NofuwtBmgHDvlC4xsADiYo/tIpCb2goCuRtpAd0JOuNBtQM9QDzG7tPHbjFMTs4EhbW8QgF3vYeCuB+YwzuLj12wlgVNTTHpdAAAAABJRU5ErkJggg==",
		oncommand: function(event){
			var input_text = event.target.getAttribute('input_text');
			if(input_text) {
				addMenu.copy(input_text);
				goDoCommand("cmd_paste");
			}
		}
	});
	menu(items);
};


//颜文字输入
var Specialcharacters = PageMenu({
                label:"颜文字输入",
			         	condition:"input",
                insertBefore:"context-searchselect",
                oncommand: function(event){
                        var input_text = event.target.getAttribute('input_text');
                        if(input_text) {
                                addMenu.copy(input_text);
                                goDoCommand("cmd_paste");
                }
        },
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD4+PghISERERExMTEUFBSVlZVPT08eHh4YGBi8vLyioqKBgYF4eHhJSUlBQUHg4ODR0dG1tbWamppzc3NgYGBXV1ft7e3i4uKvr6+oqKiPj4+JiYkoKCgkJCQICAgmMdadAAAAAXRSTlMAQObYZgAAAINJREFUGNNti1cSAyEMQwX20mGzJb3d/5YxJX+rGSw/IeNQJztp7eflz4ayAlSiPPij+qLc3vokPBIfZNqMmCpuT0QWnxT8F3WZ5IlrqfYjma4HQwMI4FsrcAPML6QC0dlirY2FJGSzlfcV7t5+GIi2GAW+oGn3j2qrGwwEJq1JBxzpB9l0A8JvhjyGAAAAAElFTkSuQmCC"
});
Specialcharacters([
                {label: "｡◕‿◕｡", input_text:"｡◕‿◕｡"},
                {label: "(●'‿'●) ", input_text:"(●'‿'●) "},
                {label: "ヘ(-ω-ヘ)", input_text:"ヘ(-ω-ヘ)"},
                {label: "(￣_￣|||)", input_text:"(￣_￣|||)"},
                {label: "(눈_눈)", input_text:"(눈_눈)"},
                {label: "o(╥﹏╥)o", input_text:"o(╥﹏╥)o"},
                {label: "(￣▽￣*)b", input_text:"(￣▽￣*)b"},
                {label: "(๑′°︿°๑)", input_text:"(๑′°︿°๑)"},
                {label: "_(:з」∠)_", input_text:"_(:з」∠)_"},
                {label: "(๑•́ ₃ •̀๑) ", input_text:"(๑•́ ₃ •̀๑) "},
                {label: "(｡•́︿•̀｡)", input_text:"(｡•́︿•̀｡)"},
                {label: "Σ(๑０ω０๑) ", input_text:"Σ(๑０ω０๑)"},
                {label: "(ง •̀_•́)ง", input_text:"(ง •̀_•́)ง"},
                {label: "Ծ‸Ծ", input_text:"Ծ‸Ծ"},
                 {label: "( ´◔‸◔`)", input_text:"( ´◔‸◔`)"},
                {label: "( ´･ᴗ･` )", input_text:"( ´･ᴗ･` )"},
                {label: "( ⊙⊙)!!", input_text:"( ⊙⊙)!!"},
                {label: "(๑•̀ω•́๑)", input_text:"(๑•̀ω•́๑)"}, 
                {label: "(๑¯∀¯๑)", input_text:"(๑¯∀¯๑)"},
                 {label: "(๑•̀ㅂ•́)و✧", input_text:"(๑•̀ㅂ•́)و✧"},
                {label: "ᕙ(⇀‸↼‵‵)ᕗ ", input_text:"ᕙ(⇀‸↼‵‵)ᕗ "},
                {label: "_(•̀ω•́ 」∠)_", input_text:"_(•̀ω•́ 」∠)_"},          
]);






//================菜单栏的“工具”菜单================
menu = ToolMenu({
    label: "切换火狐配置",
    id:"ProfileSwitch",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVQ4ja2SQQqDMBBFX7tx5SU8R3YuFHtFT9Iz9BiFFrIqHkA3PzJJIwnigwGj83/+DMKFdMBaWV0Q3Y3BA5iBW6Fm9f4ZjMBTz0c3o54xjd8AP6CtGLVVb2MT9MALWCrmX9TbW4PBxC/tIIwx2FgfwGfmtdhvXpodD7jE0J5dInDSRO6WSYJw41vvDjW5yCVWiP+DU1xm8CVeWgknzU66tFLllnqODcQBSVVEfuY+AAAAAElFTkSuQmCC"
});
menu([{
    label: "V7 Lite",
    text: "-no-remote -profile ..\\Profiles\\V7_Lite",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{
    label: "默认配置",
    text: "-no-remote -profile ..\\Profiles\\Default",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{
    label: "其他配置",
    text: "-no-remote -profile ..\\Profiles\\Others",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{
    label:"加速火狐",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAAAFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWTkVvkAAAAHXRSTlMA6d9MO3AH5EYWx35UHfOrlIhbIw/SzcE2K7imaPunRqwAAACNSURBVBjTRc9bEoMwCAXQC+Qdo9a3bbP/bXY0Js1HgDPMALC9DaMYtJeNV3pnadAv169oqsAznCU5aX7gLSClCPHzQBwLGDoLJPJiSQA9FMBrX+5oOOf8vYXbhJm7Kxxhc3fdjWxRMh6u1k0fdWWTAb0uzv8vgHBCJNcgDZOKkFBBr5Q8db5HEwZcoPwDuwwFSyeXYhMAAAAASUVORK5CYII=",
		onclick: function(){var path ="..\\..\\..\\Software\\speedyfox.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();  return file;}
    },{
    label:"清理痕迹",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAb1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt6r1GAAAAJHRSTlMAzVQUwp9BDPLTp3dwPDUsGPvn39vHtauPh35sZlxMJB736yg/5R5gAAAAhklEQVQY01WPVxLDMAhEJatb1b07TsL9z5goGmckPoB5DAuL7InKoE1VAkLBlESMsKKD8QzVMDagLpITaB3u/mIPCdJRExg+Eqjgyac1Tli/RRDaap5jcxIv02k9/WoY6J6WNPsmvyGLb92BI4H2HrsbvJWovegyF2a5XrhwpTS2hSW+pNc/dQcGVNn7bGYAAAAASUVORK5CYII=",
		oncommand: 'Cc["@mozilla.org/browser/browserglue;1"].getService(Ci.nsIBrowserGlue).sanitize(window);',
    },{
    label:"健康报告",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/UlEQVQ4jbXToU7DUBTG8R+EICAzICp4BSZIQM1heIAaHHZmHllTiRlPM8MjTJFMYUmWqQnSjCAQPYWuaztB+JKT5p77/U/vybmXf1CCHHMUEXNksbelw8Y6xSsGmOA8YoKz2Eu7/pziHdc9pxuGZ6dIglUYujRQtjYM71Y7GZ564BybKCK8ed0wx6gFvK/BdWAUzI8KHDfgxwCbsPAW+wp8RmyUE6jrBGt+x7jATcP0HN8Hu7rCWz2RYdpi7NJUtHUQiUR5SW5xtAf+wgsusazMS4wxwx0+OuDT8IyD2VGqvCRT5aguIkaRW+m5ypWqx7SI466VM8+1PKY/6xu4sjeUOdlxIAAAAABJRU5ErkJggg==",
		oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:healthreport"), x);',
    },{
    label: '错误报告',
    oncommand: 'toJavaScriptConsole();',
    image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdklEQVQ4jb2QMU8bQRCF383syi7iEkeRQmH57GlJA1UKJIqUqWgwFVGkSEj8iyBKKiREB2kQP4EGRJ+Utya6JjQIuUA0lmZnncaJjLmjQWKq3bdvvn0zwAuL6x5EZL3Vav1st9txNBpd1fmymmZW1RsiujazD41G431RFPdVXqoSU0r7AMDMq0RUmtlxXYInABFZjDF+8d5/CyGYc26gqp9EZKUO8qjyPL/M8/wSALrdbgkAvV7v7N/52QQi8tnMlpl5AwBijJ3pKFsppYV+v79dC5gu7sA5dxRC+DNrKori3nv/XVV3RYQrAZPJZA8AiGinKupwONwloruU0uETgIi8VdVt7/1OCMGqAADgnPuqqpsikj8CmNkJM/8KIZzONjSbzd7sPYRw7py7MLOT/wARWTOzj8w8mP9xPB5fz2vMPDCzJRFZBwCKMR5OF/d73jyfYJri1jn3Q1X3ASDrdDoPKaU3dXNnWaZVOhGNyrJ8V9f3evUXS4uVaHmCA4UAAAAASUVORK5CYII='
    },{
    label:"配置备份",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4jdWSQQ6AIAwER2P8FC/gD74fz95J8CDBBinl4EE3adK0ZdsNC1/BBkQgDUYEvCQ4AFeRJiUnzwZtWNZktPrMTUE3phwqLAITi9FvnW5esIrclNDb1PuFUntNws7TB6BLcPlNgecyxqgTA5UTf4wT3dkrh8jNxJsAAAAASUVORK5CYII=",
    tooltiptext: "备份文件将另存为桌面，备份文件包含个人隐私，请妥善保管",
		onclick: function(){
	var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
	file.appendRelativePath("Local\\BackupProfiles.bat");
	file.launch(); return file;
		}}
]);



//================标签右键菜单-================
tab([//添加标签右键菜单项
 	{
		label: "关闭左侧标签页",
    id:"context_closeTabsToTheFirst",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAABuAABpAAAAAACOszMyAAAAA3RSTlMAbYYu/vchAAAAH0lEQVQI12NABswHkIkSIMF0AUiw//8PYkHF0NWhAgAbAQzws7ptnwAAAABJRU5ErkJggg==",
		insertBefore:"context_closeTabsToTheEnd",
		oncommand: function() {
			var tabs = gBrowser.mTabContainer.childNodes,i;
				for (i = 0; tabs[i] != gBrowser.selectedTab; i++);
				for (i--;i>=0;i--){
					gBrowser.removeTab(tabs[i]);
			}
		}
	},
{
		label: "关闭所有标签页",
    id:"context_closeAllTabs",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
	},
{
label : "复制当前标签",
id:"context_CopyTab",
insertAfter:"context_pinTab",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5j0chXjkmEm3FABQbwIJDHN3ZyHxGYjQQLTfwYUCMAVj9TDUXwEzHF1C0BQCpARnHXF2p+wAAAABJRU5ErkJggg==",
onclick :  function() {var oldHistory = gBrowser.webNavigation.sessionHistory;
gBrowser.selectedTab = gBrowser.addTab("about:blank");
var newHistory = gBrowser.webNavigation.sessionHistory;
newHistory.QueryInterface(Components.interfaces.nsISHistoryInternal);
for (var i = 0; i < oldHistory.count; i++) { newHistory.addEntry(oldHistory.getEntryAtIndex(i, false), true); }
if(oldHistory.count) gBrowser.webNavigation.gotoIndex(oldHistory.index);}
},
{
label : "关闭重复标签",
id:"context_CloseSameTab",
insertAfter:"context_pinTab",
onclick : function () {
	var num = gBrowser.browsers.length;
	var msg = "";
	for (var i = 0; i < num; i++)
	{
		var a = gBrowser.getBrowserAtIndex(i);
		try
		{
			for (var j = 0; j < num; j++)
			{
				if (j != i)
				{
					var b = gBrowser.getBrowserAtIndex(j);
					if (a.currentURI.spec == b.currentURI.spec)
					{
						//gBrowser.alert(a.currentURI.spec);
						if (msg != "")
							msg += "\n";
						msg += b.currentURI.spec;
						gBrowser.removeTab(gBrowser.tabContainer.childNodes[j]);
						num--;
						j--;
						//Not executing "i--" because there won't be tabs equal before the one on i
					}
				}
			}
		}
		catch(e)
		{
			Components.utils.reportError(e);
		}
	}
	if (msg != ""){
		//alert("\u5173\u95ED\u7684\u91CD\u590D\u6807\u7B7E\u9875:\n\n" + msg);
		}
	else
		alert("\u6CA1\u6709\u91CD\u590D\u6807\u7B7E\u9875");
},
},{
label:"移动到侧边栏",
id:"context_TabFloatSidebar",
oncommand:"openWebPanel(content.document.title, content.location);",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
},{
label : "当前窗口置顶",
id:"context_StickyTab",
onclick : function () {
	(function ()
{if(document.getElementById('main-window').hasAttribute('ontop'))
onTop=false;else onTop=true;
	try {

	Components.utils.import("resource://gre/modules/ctypes.jsm");
	var lib = ctypes.open("user32.dll");
	var funcActiveWindow = 0;
	try
	{
		 funcActiveWindow = lib.declare("GetActiveWindow", ctypes.winapi_abi, ctypes.int32_t);
	}
	catch (ex)
	{
		funcActiveWindow = lib.declare("GetActiveWindow", ctypes.stdcall_abi, ctypes.int32_t);
	}
	
	if (funcActiveWindow != 0)
	{
		var activeWindow = funcActiveWindow();
		
		var funcSetWindowPos = 0;
		try
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.winapi_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);
		}
		catch(ex)
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.stdcall_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);		
		}
		
		var hwndAfter = -2;
		if (onTop)
			{hwndAfter = -1;document.getElementById('main-window').setAttribute('ontop','true');}else document.getElementById('main-window').removeAttribute('ontop');

		funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19);
	}

	lib.close();
	
	} catch (ex) {
		alwaysontop_log(ex);
	}
})()
},
},
{
		label:"重新载入标签",
    id:"context_ReloadTabandAllTab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA90lEQVQ4jZXTMUvDQBjG8R8WHETo2KkIdtDJScXVwbHgB+iuo34Dl34B50zFSXBxreDSUVw7CYLi4iBOXR1ygdzlGuIfAsm9z/PkvTcXmgwya2vpJc/7eMEevsL1bwZ4xAo3tfUzjFLxRsb8gHcs8Vyr7eIJ00znYBMLTELQd0bYxxx3uYALFLV2i5wIW6G7cVpY4HCNKWUSOolYKbfRhWqLjSF25QfbacASRx0DDoI+CpjhusV0qzxocIn7VFBN9ypj7uM3aMZ4DfcNRiGkEJ+6aurTYB5WhXSIbzjBp/g7n+MYOzjFR+7tbfRC4Fz5gw3b5e1E5j/bkCjyUT1I9wAAAABJRU5ErkJggg==",
    tooltiptext: "左键：重新载入标签\n右键：重新载入所有标签",
    onclick: function(e) {
                switch(e.button) {
            case 0:
            gBrowser.reloadTab(TabContextMenu.contextTab);
            break;
						case 1:
				
						break;
            case 2:
            gBrowser.reloadAllTabs();
            break;
                }
        }
	},
]);


new function () {
	var items = [
    {label:"复制当前标签标题",oncommand: function() {addMenu.copy(addMenu.convertText("%TITLES%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
	{label:"复制当前标签地址",oncommand: function() {addMenu.copy(addMenu.convertText("%URL%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
	{label:"复制当前标签标题和地址",oncommand: function() {addMenu.copy(addMenu.convertText("%TITLE%\n%URL%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
{},
	{label:"复制所有标签标题",oncommand: function() {(function(){
           var titles = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                titles += tab.label + "\n";
            });
            this.clipboard.copyString(titles);   
    })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
	{label:"复制所有标签地址",oncommand: function() {(function(){
            var URLs = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                var url = gBrowser.getBrowserForTab(tab).contentWindow.location.href;
                URLs += url + "\n";
            });
            this.clipboard.copyString(URLs);      
    })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
	{label:"复制所有标签标题和地址",oncommand: function() {(function() {
            var txt = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                 var url = gBrowser.getBrowserForTab(tab).contentWindow.location.href;
                txt += tab.label + "\n" + url + "\n";
            });
            this.clipboard.copyString(txt); 
        })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
{},
{label:"复制Favicon地址",oncommand: function() {addMenu.copy(addMenu.convertText("%FAVICON%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
	{label:"复制Favicon编码",oncommand: function() {addMenu.copy(addMenu.convertText("%FAVICON_BASE64%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"},
{label: "保存Favicon图标",oncommand: "saveURL(gBrowser.mCurrentTab.image, content.document.title || gBrowser.currentURI.spec, null, true, true, undefined, document);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoDH4PzQNkMVhgCy6QmxAmYGB4TUDA4M9mgH2UHFlYgyBKbaHGoDMJxrANP0nRzMMBEMNCCZHMwyYEKvQk4GB4RnURkL4GVQ9CnjGwMBgTaRl1lD1KIBQgvmPpgZDPcUuoDgMyAYA/mQv97JO38EAAAAASUVORK5CYII=",
	},
	];
	var menu = TabMenu({id:"context_TabInfoCopy",insertafter: 'context_openTabInWindow', onpopupshowing: syncHidden});
	menu(items);
};



//隐藏相同项。必须，不能删除
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};
