// ==UserScript==
// @name        refererChanger
// @include     main
// @include     chrome://browser/content/browser.xul
// @version     1.0.3
// @description Refererの内容を柔軟に書き換えるUserScriptです。
// ==/UserScript==
// ◆設定方法
//   スクリプト内のsites配列（ハッシュ配列）にリファラーを書き換えたいサイトと書き換え方法を指定すれば次回userChrome.jsロード時から書き換えてくれます。
//   sites配列の書き方はハッシュのkeyに書き換え対象のドメインを、valueに書き換え方法を指定して下さい。
// ◇sites配列のvalue指定方法
//   @NORMAL：不改變referer
//   @FORGE：發送根站點referer
//   @ORIGINAL：發送打開站點referer
//   @BLOCK : 發送空refere
//   無指定：開こうとしているサーバが別サーバだとそのサーバのルートに、ドキュメントと同じサーバーから開かれたようにする
//   それ以外 : 指定された内容にリファラを書き換える。

var refererChanger = {};
refererChanger.state = true; /* 启动时是否启用 */

refererChanger.sites = {
    'dm5.com' : '@FORGE',
    'image.itmedia.co.jp' : '@FORGE',
    '2ch.net' : '@FORGE',
    'imepita.jp' : '@ORIGINAL',
    'tumblr.com' : '@FORGE',
    'fc2.com' : '@BLOCK',
    'blogs.yahoo.co.jp' : '@BLOCK',
    'hentaiverse.net': '@BLOCK',
    'rakuten-static.com': '@NORMAL',
    'rakuten.co.jp': '@NORMAL',
    'api.e-map.ne.jp': '@NORMAL',
    '9lala.com' : '@NORMAL',
    '19disk.com' : '@NORMAL', 
    '115cdn.com' : '@NORMAL',
    'photo.sina.com.cn':'@BLOCK',
    'qlogo.cn':'@BLOCK',
    'qpic.cn':'@BLOCK',
    'space.wenxuecity.com' : 'http://bbs.wenxuecity.com/',
    'fmn.rrfmn.com' : '@BLOCK',
    'www.autoimg.cn' : 'http://club.autohome.com.cn/',
    'kkkmh.com' : 'http://www.kkkmh.com/',
    'nonie.1ting.com' : 'http://www.1ting.com/',
    'sinaimg.cn' : 'http://blog.sina.com.cn/',
    'yyets.com' : 'http://www.yyets.com/',
    'img.knb.im' : 'http://www.kenengba.com/',
    'tianya.cn' : 'http://www.tianya.cn/',
    'baidu-img.cn' : 'http://www.baidu.com/',
    'file.xici.net' : 'http://www.xici.net/',
    'hiphotos.baidu.com' : '@FORGE',
    'forum.fdzone.org' : 'http://forum.fdzone.org/',
    'forum.tw.fdzone.org' : 'http://forum.tw.fdzone.org/',
    'forum.tw2.fdzone.org' : 'http://forum.tw2.fdzone.org/',
    'imageporter.com' : '@FORGE',
    'imageshack.us' : '@FORGE',
    'imgsrc.baidu.com' : '@FORGE',
    'imgur.com' : '@FORGE',
    'myweb.hinet.net' : 'http://myweb.hinet.net/service/download.html?',
    'oversea.forum.fdzone.org' : 'http://oversea.forum.fdzone.org/',
    'tudou.com' : 'http://www.tudou.com/',
    'imgchili.net' : '@NORMAL',
    'imgchili.com' : '@NORMAL',
    'file-static.com' : '@ORIGINAL',
    'static-file.com' : '@ORIGINAL',
    'www.dotup.org' : '@NORMAL',
    '183.60' : '@NORMAL',
    '119.147' : '@NORMAL',
    '112.91' : '@NORMAL',
    '60.221' : '@NORMAL',
    '122.225' : '@NORMAL',
    '218.29' : '@NORMAL',
    '113.105' : '@NORMAL',
    '58.253' : '@NORMAL',
    '211.142' : '@NORMAL',
    '125.211' : '@NORMAL',
    'orzhd.com' : '@NORMAL',
    'img2.sofree.cc' : '@NORMAL',
    'fsm.vip2ch.com' : '@FORGE',
    'turboimagehost.com' : '@NORMAL',
    'imgdino.com' : 'http://imgdino.com/',
    'xindm.cn' : 'http://www.xindm.cn/',
    'img.liufen.com': 'http://www.liufen.com.cn/',
    
    //下はデバッグ用
    //'taruo.net' : 'example.co.jp',

};
refererChanger.init = function () {
    var os = Cc['@mozilla.org/observer-service;1'].getService(
        Ci.nsIObserverService);
    os.addObserver(this, 'http-on-modify-request', false);

};
refererChanger.RCToggle = function () {
    this.state = !this.state;
    let statusbarpanel = document.getElementById('refererChangerTogglePanel');
    let menuitem = document.getElementById('refererChangerToggle');
    try{
        if (this.addMenu)
            menuitem.setAttribute("checked", !(menuitem.getAttribute("checked") == "true"));
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
            return false;
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
            return false;
        }else{
            sRef= refAction;
        }
        http.setRequestHeader("Referer", sRef, false);
        if (http.referrer)
            http.referrer.spec = sRef;
        return true;
    } catch (e) {}
    return false;
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

