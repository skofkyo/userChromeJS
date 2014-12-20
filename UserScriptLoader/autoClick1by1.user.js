// ==UserScript==
// @name  网页自动化系列点击
// @namespace  autoClick1by1.jasonshaw
// @version    0.3
// @description  匹配的任意url，顺序逐个点击设定的obj，任意不存在则彻底停止
// @include http://*.kdslife.com/show/photo/*.html
// @include http://www.repaik.com/forum.php?mod=viewthread*
// @include http://*.pcauto.com.cn/*/*/*/*.html
// @include http://bbs.pinggu.org/plugin.php?id=dsu_paulsign:sign*
// @include http://www.repaik.com/plugin.php?id=dsu_paulsign:sign*
// @include http://www.soft8.me/*/*.html*
// @include http://www.2121.club/*.html
// @include http://*.mimima.com/link.php?ref=*
// @include http://www.jptorrent.org/link.php*
// @include http://99files.net/download.html?id=*
// @include http://www.365shares.net/storage/*
// @include http://www.datafilehost.com/d/*
// @include http://9xdd.com/_dl*
// @include http://9xdd.com/_dl_*/_MediaFire_*mediafire.htm
// @include http://softblog.tw/*
// @include http://bbs.kafan.cn/*
// @include http://g.mozest.com/*
// @include http://www.repaik.com/
// @include *zippyshare.com*
// @downloadURL    https://github.com/jasonshaw/userscript/blob/master/autoClick1by1.user.js
// @updateURL      https://github.com/jasonshaw/userscript/blob/master/autoClick1by1.user.js
// @note         允许自定义网站的点击延迟时间
// @note         允许自定义网站的是否在系列点击之后关闭网页
// @note         增加脚本运行判断，解决个别页面动态加载问题，比如睿派克签到
// @note         支持kds阻止相册自动翻页
// @note         支持睿派克、人大论坛自动等自动签到
// @note         支持卡饭、睿派克自动关闭侧栏
// @note         支持太平洋汽车本页展开全部内容
// @run-at       document-end
// @copyright  2014+, jasonshaw
// ==/UserScript==
(function(){
    var autoClose = false,delay = 500;
    var prefs = {
        'kds': {
            startReg: /http:\/\/model\.kdslife\.com\/show\/photo\/\d+\.html/i,//定义href正则
            autoClose: true,//config中dom.allow_scripts_to_close_windows  需要为true, 存在风险，请谨慎使用
            elements: ['.bigp_nav2 > form > input[value="stop"]'],//所有参数为要点击的按钮的css3 selector
            delay: 500
        },
        'repaik': {
            startReg: /^http:\/\/www\.repaik\.com\/$/,
            elements: ['a[onclick="hdMsg()"]']
        },
        /*'repaik': {
            startReg: /http:\/\/www\.repaik\.com\/forum\.php\?mod=viewthread&tid=\d+/i,
            elements: ['a.btn_s_close']
        },
        'kafan': {
            startReg: /http:\/\/bbs\.kafan\.cn\/thread-\d+-\d+-\d+\.html/,
            elements: ['a.btn_s_close']
        },*/
        'kafan': {
            startReg: /http:\/\/bbs\.kafan\.cn\/forum-\d+-\d+.html/,
            elements: ['img[src="http://a.ikafan.com/image/common/collapsed_no.gif"]']
        },
        'mozest': {
            startReg: /https?:\/\/g\.mozest\.com\//i,
            elements: ['#sidebar_img.collapsed_no']
        },
        'pcauto': {
            startReg: /http:\/\/\w+\.pcauto\.com\.cn\/.+\.html/i,
            elements: ['div.pageViewGuidedd > a[rel="nofollow"]']
        },
        'pinggu': {
            startReg: /http:\/\/bbs\.pinggu\.org\/plugin\.php\?id=dsu_paulsign:sign/,
            elements: ['ul.qdsmile > li#fd','table[class="tfm qdtfm"] input[value="2"]','td.qdnewtd3 > a']
        },
        'repaik1': {
            startReg: /http:\/\/www\.repaik\.com\/plugin\.php\?id=dsu_paulsign:sign/,
            elements: ['ul.qdsmile > li#ch','table[class="tfm"] input[value="2"]','.tr3 > div:nth-child(2) > a > img']
        },
        'soft8': {
            startReg: /http:\/\/\www\.soft8\.me\/\w+\/.+\.html/i,
            elements: ['a[onclick]','#dlbutton > div > ol:nth-child(2) > a[onclick]'],
            autoClose: true
        },
        'softblog': {
            startReg: /http:\/\/softblog\.tw\/potplayer64\.html/,
            elements: ['a[href="http://www.soft8.me/Media/3/515.html"]'],
            autoClose: true
        },
        '2121club': {
            startReg: /http:\/\/\www\.2121\.club\/\w+\.html/,
            elements: ['button[onclick]'],
            autoClose: true
        },
        'mimima': {
            startReg: /http:\/\/\w+\.mimima\.com\/link\.php/i,
            elements: ['td[valign="bottom"] input[valign="bottom"]'],
            autoClose: true
        },
        'jptorrent': {
            startReg: /http:\/\/www\.jptorrent\.org\/link\.php/i,
            elements: ['input[valign="bottom"]'],
            autoClose: true,
            delay: 5500
        },
        '99files': {
            startReg: /http:\/\/99files\.net\/download\.html/i,
            elements: ['a[class="btn btn-success"]'],
            autoClose: true,
            delay: 5500
        },
        '365shares': {
            startReg: /http:\/\/www\.365shares\.net\/storage\//i,
            elements: ['#dlink'],
            autoClose: true
        },
        'datafilehost': {
            startReg: /http:\/\/www\.datafilehost\.com\/d\//i,
            elements: ['input[onclick]','#dl > a[href]'],
            autoClose: true
        },
        'azofreeware2': {
            startReg: /(.*)MediaFire(.*)mediafire/i,
            elements: ['a[title="按此由MediaFire下載！"]'],
             autoClose: true
        },
        'azofreeware1': {
            startReg: /http:\/\/9xdd\.com\/\_dl\_/i,
            elements: ['h2 > a[href]']
        },
        'zippyshare': {
            startReg: /http:\/\/\w+\.zippyshare\.com\/v\/\d+\/file\.html$/,
            elements: ['#downloadB'],
             autoClose: true
        },
    };
    function autoClick1by1(){
        var href = window.location.href,site = null,i = 0;
        for (var key in prefs) if(prefs[key].startReg.test(href)) {site = key;break;}
        if(site == null) return;
        var elements = prefs[site].elements;
        autoClose = prefs[site].autoClose || autoClose;
        delay = prefs[site].delay || delay;
        setTimeout(function(){
            try {
                var elements = prefs[site].elements;
                //alert(elements);
                while(elements[i]){
                    var obj = document.querySelector(elements[i]);
                    if(obj == null) return;
                    obj.click();
                    i++;
                }
            } catch(e){alert(e);}
        }, delay);
        setTimeout(function(){
            if(autoClose) window.close();
        }, delay+2000);     
    }
    autoClick1by1();
    /*document.onreadystatechange = function () {
        autoClick1by1();
    }*/
})();