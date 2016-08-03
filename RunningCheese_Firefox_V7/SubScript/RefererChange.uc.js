// ==UserScript==
// @name        refererChanger.uc.js
// @description 破解图片外链脚本，黑名单、工具菜单版、自用DIY版
// @include     main
// @include     chrome://browser/content/browser.xul
// @charset     utf-8
// @version     v2014.10.04
// @note        添加某站点规则
// ==/UserScript==
/* 设置参数：
   @NORMAL：不改变referer
   @FORGE：发送根站点referer
   @ORIGINAL：发送打开站点referer
   @BLOCK : 发送空referer */

var refererChanger = {};
refererChanger.state = true; /* 启动时是否启用 */
refererChanger.enabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVQ4jc3SvQ2DQAyGYZY4yd/rmoqWlgEQXZZgimwXNqBOjegoU5HmiCDkBxJFiiV358f23SXJXwTQuPu4J4HTDXD3cW/TRc0WwMxKYDCz8iUgqZBUfASYWQX0QDcd3LyCpAPQScol5e+QFQAMkvLZKjnQm1kVp8uAs6T6GdDdd5kQdz/G6eoJWQEhhPTRqBFpp4sNIaQR3feM8wC6rwAzyxY1QBu/6GVjjkCzp+nv4goaQ1+Hc93jJgAAAABJRU5ErkJggg==";
refererChanger.disabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAAAbGxsbGxsbGxsAAAAAAAAEBAQbGxsbGxsbGxsTExMDAwMAAAAAAAAbGxsAAAAbGxsAAAAAAAAbGxsAAAAFBQUREREbGxsKCgobGxsFBQUAAAAbGxsICAgPDw8QEBAAAAANDQ0bGxsAAAAAAAAbGxsVFRUODg4Rw8fDAAAAJXRSTlMA+ek0EQOHZ0k9Kv3t4N7bxb21JQv39vHm1LCPfXlrZl5ZUk02fNMB3AAAAHZJREFUGNONzzcShDAQBdG/Iy+8We+NtPe/IZSGAkI6fFljQ3VYiqceCJj7FX+swB7yb2BwDoC6ZE8wWCIL2bQSDB8Sgh6FVpjgKIB7puFLw0BQunrTjUxpEnSybSTE2aGjBL66KnAJYv4CpvwI/T7u5kK94XUAG3sIshANri8AAAAASUVORK5CYII=";

refererChanger.sites = {
	//目标网址类
//目标网址类
'www.economist.com': 'https://www.google.com/',//突破每週3篇限制 
'www.wsj.com': 'https://www.google.com/',//免登陆或订阅看全文
'img.liufen.com': 'http://www.liufen.com.cn/',
'mangafiles.com' : 'http://www.imanhua.com/',
'douban.com': 'http://www.douban.com',
'yyets.com': 'http://www.yyets.com/',
'space.wenxuecity.com': 'http://bbs.wenxuecity.com/',
'www.autoimg.cn': 'http://club.autohome.com.cn/',
'kkkmh.com': 'http://www.kkkmh.com/',
'nonie.1ting.com': 'http://www.1ting.com/',
'img.knb.im': 'http://www.kenengba.com/',
'xici.net': 'http://www.xici.net/',
'media.chinagate.com': 'http://www.wenxuecity.com/',
'jdstatic.tankr.net': 'http://jandan.net/',
'sankakustatic.com': 'http://chan.sankakucomplex.com/',

// baidu 相关网站
'hiphotos.baidu.com': '@FORGE',
'hiphotos.bdimg.com' : '@FORGE',
'imgsrc.baidu.com': '@FORGE',
'baidu-img.cn': 'http://www.baidu.com/',
'bdstatic.com': 'http://tieba.baidu.com/',

// sina
'photo.sina.com.cn': '@BLOCK',
'sinaimg.cn': 'http://blog.sina.com.cn/',

//天涯
'tianya.cn': 'http://bbs.tianya.cn/',
'laibafile.cn' : 'http://www.tianya.cn/',

//其它
'bjguahao.gov.cn': '@BLOCK',//从其它网址跳转打不开
'bimg.126.net': '@FORGE',
'tankr.net': '@FORGE',
'51cto.com': '@FORGE',
'pconline.com.cn': '@FORGE',
'postimg.org': '@FORGE',
'chiphell.com': '@FORGE',
'niunews.cn': '@FORGE',
'poco.cn': '@FORGE',
'jump.bdimg.com': '@NORMAL',
'tmoke.com': '@BLOCK',
'51img1.com' : '@FORGE',
'zol-img.com.cn' : '@FORGE',
'img.cnbeta.com': '@FORGE',
'pixiv.net': '@FORGE',
'ph.126.net' : '@FORGE',
'isnowfy.com': '@FORGE',
'image.itmedia.co.jp': '@FORGE',
'2ch.net': '@FORGE',
'imepita.jp': '@ORIGINAL',
'tumblr.com': '@FORGE',
'photo.store.qq.com': '@FORGE',
'img.pconline.com.cn': '@FORGE',
'fc2.com': '@BLOCK',
'blogs.yahoo.co.jp': '@BLOCK',
'hentaiverse.net': '@BLOCK',
'qlogo.cn': '@BLOCK',
'qpic.cn': '@BLOCK',
'fmn.rrfmn.com': '@BLOCK',
'postimage.org': '@FORGE',
};

refererChanger.init = function() {
	var src = this.state ? this.enabledSrc : this.disabledSrc;
	var label = this.state ? "破解图片外链" : "破解图片外链";
	var menuitem = document.createElement('menuitem');
	menuitem.setAttribute('id', 'RefererChanger');
	menuitem.setAttribute('class', 'menuitem-iconic');
	menuitem.setAttribute("tooltiptext", "RefererChanger\n破解图片外链开关");
	menuitem.setAttribute("label", label);
	menuitem.setAttribute('src', src);
	menuitem.setAttribute('oncommand', 'refererChanger.RCToggle();');
	document.getElementById('menu_ToolsPopup').appendChild(menuitem);

	var os = Cc['@mozilla.org/observer-service;1'].getService(
	Ci.nsIObserverService);
	os.addObserver(this, 'http-on-modify-request', false);

};
refererChanger.RCToggle = function() {
	this.state = !this.state;
	let menuitem = document.getElementById('RefererChanger');
	try {
		var src = this.state ? this.enabledSrc : this.disabledSrc;
		var label = this.state ? "破解图片外链" : "破解图片外链";
		menuitem.setAttribute("src", src);
		menuitem.setAttribute("label", label);
	} catch (e) {}
};

// *********Config End**********
//var statusbarHidden = true;
refererChanger.adjustRef = function(http, site) {
	try {
		var sRef;
		var refAction = undefined;
		for (var i in this.sites) {
			if (site.indexOf(i) != -1) {
				refAction = this.sites[i];
				break;
			}
		}

		if (refAction == undefined) return true;
		if (refAction.charAt(0) == '@') {
			//下はデバッグ用
			//logs.logStringMessage("ReferrerChanger:  " + http.originalURI.spec + " : "+refAction);
			//logs.logStringMessage("ReferrerChanger:  OriginalReferrer: "+http.referrer.spec);

			switch (refAction) {
			case '@NORMAL':
				return true;
				break;
			case '@FORGE':
				sRef = http.URI.scheme + "://" + http.URI.hostPort + "/";
				break;
			case '@BLOCK':
				sRef = "";
				break;
			case '@AUTO':
				return false;
			case '@ORIGINAL':
				sRef = window.content.document.location.href;
				break;
			default:
				//return false;
				break;
			}
		} else if (refAction.length == 0) {
			return true;
		} else {
			sRef = refAction;
		}
		http.setRequestHeader("Referer", sRef, false);
		if (http.referrer) http.referrer.spec = sRef;
		return true;
	} catch (e) {}
	return true;
};

refererChanger.observe = function(aSubject, aTopic, aData) {
	if (aTopic != 'http-on-modify-request') return;
	if (!this.state) return;
	var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
	for (var s = http.URI.host; s != ""; s = s.replace(/^.*?(\.|$)/, "")) {
		if (this.adjustRef(http, s)) return;
	}
	if (http.referrer && http.referrer.host != http.originalURI.host) http.setRequestHeader('Referer', http.originalURI.spec.replace(/[^/]+$/, ''), false);
};

refererChanger.unregister = function() {
	var os = Cc['@mozilla.org/observer-service;1'].getService(
	Ci.nsIObserverService);
	os.removeObserver(this, 'http-on-modify-request', false);
};

var added = false;
if (location == "chrome://browser/content/browser.xul") {
	added = true;
	refererChanger.init();
}
window.addEventListener("unload", function() {
	if (location == "chrome://browser/content/browser.xul") if (added) refererChanger.unregister();
}, false);