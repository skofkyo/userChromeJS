// ==UserScript==
// @name        refererChangerBlacklistVersion
// @include     main
// @include     chrome://browser/content/browser.xul
// @version     1.0.3
// @description Refererの内容を柔軟に書き換えるUserScriptです。
// ==/UserScript==
// ◆設定方法
//   スクリプト内のsites配列（ハッシュ配列）にリファラーを書き換えたいサイトと書き換え方法を指定すれば次回userChrome.jsロード時から書き換えてくれます。
//   sites配列の書き方はハッシュのkeyに書き換え対象のドメインを、valueに書き換え方法を指定して下さい。
// ◇sites配列のvalue指定方法
//   @NORMAL：リファラを変更しない
//   @FORGE：開こうとしているサーバのルートに
//   @ORIGINAL：開こうとしているサイトのURLを送信する
//   @BLOCK : リファラを空にして送信
//   無指定：開こうとしているサーバが別サーバだとそのサーバのルートに、ドキュメントと同じサーバーから開かれたようにする
//   それ以外 : 指定された内容にリファラを書き換える。

var refererChanger = {};
refererChanger.state = true; /* 启动时是否启用 */
refererChanger.enabledTip = "RefererChanger\u7834\u89E3\u56FE\u7247\u5916\u94FE\u5DF2\u5F00\u542F";
refererChanger.disabledTip = "RefererChanger\u7834\u89E3\u56FE\u7247\u5916\u94FE\u5DF2\u5173\u95ED";
refererChanger.enabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAHlBMVEUAAAAwKio9Nzd7d3dXUlLy8vKLiIi+vLyxr6/Y19dsFnluAAAAAXRSTlMAQObYZgAAADdJREFUCNdjwAMYBcFAgIERwgcxlBCMZAiDgV2wAcIIEpQEM4wNBYUCgAxmQSdBQQeEdoSBuAEAQfIEwUAEZLIAAAAASUVORK5CYII=";
refererChanger.disabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAGFBMVEUAAAAFBwgFBwgFBwgFBwgFBwgFBwgFBwg5OfzYAAAAB3RSTlMAnBCyUNgw6998+AAAAD1JREFUCNdjwAPYy0EAxIDwCxjYmcoRDEEgAyTFUgBlqDOUgRmCBuzlCkAGYzlDeXlAAZL28gKQmQV47AQAji4Nhtne3dMAAAAASUVORK5CYII=";

refererChanger.sites = {
    'image.itmedia.co.jp' : '@FORGE',
    '2ch.net' : '@FORGE',
    'imepita.jp' : '@ORIGINAL',
    'tumblr.com' : '@FORGE',
    'photo.store.qq.com' : '@FORGE',
    'imgcache.qq.com' : '@FORGE',
    'vsrctfs.tc.qq.com' : '@FORGE',
    'img.pconline.com.cn' : '@FORGE',
    'fc2.com' : '@BLOCK',
    'blogs.yahoo.co.jp' : '@BLOCK',
    'hentaiverse.net': '@BLOCK',
    'photo.sina.com.cn':'@BLOCK',
    'qlogo.cn':'@BLOCK',
    'qpic.cn':'@BLOCK',
    'fmn.rrfmn.com' : '@BLOCK',
    'bdstatic.com' : 'http://tieba.baidu.com/',
    'space.wenxuecity.com' : 'http://bbs.wenxuecity.com/',
    'www.autoimg.cn' : 'http://club.autohome.com.cn/',
    'kkkmh.com' : 'http://www.kkkmh.com/',
    'nonie.1ting.com' : 'http://www.1ting.com/',
    'sinaimg.cn' : 'http://blog.sina.com.cn/',
    'yyets.com' : 'http://www.yyets.com/',
    'img.knb.im' : 'http://www.kenengba.com/',
    'tianya.cn' : 'http://bbs.tianya.cn/',
    'baidu-img.cn' : 'http://www.baidu.com/',
    'xici.net' : 'http://www.xici.net/',
    'media.chinagate.com' : 'http://www.wenxuecity.com/',
    'jdstatic.tankr.net' : 'http://jandan.net/',
    'sankakustatic.com' : 'http://chan.sankakucomplex.com/',

    //下はデバッグ用
    //'taruo.net' : 'example.co.jp',
        'postimage.org' : '@FORGE',
       // 'xunlei.com' : '@BLOCK',
        'hiphotos.baidu.com' : '@FORGE',
        'img.cnbeta.com' : '@FORGE',
        'imgsrc.baidu.com' : '@FORGE',
};
refererChanger.init = function () {
    var tooltiptext = this.state ? this.enabledTip : this.disabledTip;
    var src = this.state ? this.enabledSrc : this.disabledSrc;
    var statusbarpanel = document.createElement("image");
    statusbarpanel.setAttribute("id", "refererChangerTogglePanel");
    statusbarpanel.setAttribute("tooltiptext", tooltiptext);
    statusbarpanel.setAttribute("src", src);
    statusbarpanel.setAttribute("style", "padding: 0 3px !important;");
    statusbarpanel.setAttribute("onclick", "event.preventDefault();event.stopPropagation();refererChanger.RCToggle(); "); 
    document.getElementById("urlbar-icons").appendChild(statusbarpanel);
    var os = Cc['@mozilla.org/observer-service;1'].getService(
        Ci.nsIObserverService);
    os.addObserver(this, 'http-on-modify-request', false);

};
refererChanger.RCToggle = function () {
    this.state = !this.state;
    let statusbarpanel = document.getElementById('refererChangerTogglePanel');
    let menuitem = document.getElementById('refererChangerToggle');
    try{
        var tooltiptext = this.state ? this.enabledTip : this.disabledTip;
        var src = this.state ? this.enabledSrc : this.disabledSrc;
        statusbarpanel.setAttribute("tooltiptext", tooltiptext);
        statusbarpanel.setAttribute("src", src);
    }catch(e){}
};
// *********Config End**********
//var statusbarHidden = true;
refererChanger.adjustRef = function (http, site) {
    try {
        var sRef;
        var refAction = undefined;
        for (var i in this.sites) {
            if(site.indexOf(i) != -1){
                refAction = this.sites[i];
                break;
            }
        }

        if (refAction == undefined)
            return true;
        if (refAction.charAt(0) == '@'){
            //下はデバッグ用
            //logs.logStringMessage("ReferrerChanger:  " + http.originalURI.spec + " : "+refAction);
            //logs.logStringMessage("ReferrerChanger:  OriginalReferrer: "+http.referrer.spec);

            switch (refAction){
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
        }else if(refAction.length == 0) {
            return true;
        }else{
            sRef= refAction;
        }
        http.setRequestHeader("Referer", sRef, false);
        if (http.referrer)
            http.referrer.spec = sRef;
        return true;
    } catch (e) {}
    return true;
};

refererChanger.observe = function (aSubject, aTopic, aData) {
    if (aTopic != 'http-on-modify-request') return;
    if (!this.state) return;
    var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
    for (var s = http.URI.host; s != ""; s = s.replace(/^.*?(\.|$)/, "")){
        if (this.adjustRef(http, s))
            return;
    }
    if (http.referrer && http.referrer.host != http.originalURI.host)
        http.setRequestHeader('Referer',
            http.originalURI.spec.replace(/[^/]+$/,''), false);
};

refererChanger.unregister = function () {
    var os = Cc['@mozilla.org/observer-service;1'].getService(
        Ci.nsIObserverService);
    os.removeObserver(this, 'http-on-modify-request', false);
};

var added = false;
if (location == "chrome://browser/content/browser.xul") {
    added = true;
    refererChanger.init();
}
window.addEventListener("unload", function () {
    if (location == "chrome://browser/content/browser.xul")
    if (added)
    refererChanger.unregister();
}, false);

