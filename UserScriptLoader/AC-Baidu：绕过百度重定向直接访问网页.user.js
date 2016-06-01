// ==UserScript==
// @name AC-Baidu：绕过百度重定向直接访问网页
// @author         AC
// @namespace      1353464539@qq.com
// @description    繞過百度搜索結果中的自己的跳轉鏈接，直接訪問原始網頁-反正都能看懂
// @version        6.6
// @create         2015-11-25
// @lastmodified   2016-4-24
// @include        http://www.baidu.com/*
// @include        https://www.baidu.com/*
// @include        http://tieba.baidu.com/*
// @include        http://www.sogou.com/*
// @include        https://www.sogou.com/*
// @copyright      2015+, AC
// @run-at         document-end
// @grant		    GM_xmlhttpRequest
// @icon            https://coding.net/u/zb227/p/zbImg/git/raw/master/img0/icon.jpg
// @note            2016.4.24-V6.6 恢复以前的版本，因为兼容性问题
// @note            2015.12.1-V5.0 加入搜狗的支持，但是支出不是很好
// @note            2015.11.25-V2.0 优化，已经是真实地址的不再尝试获取
// @connect *
// @note            2015.11.25-V1.0 完成去掉百度重定向的功能 
// ==/UserScript==

// 采用MutationObserver监视会大大实际代码的调用次数-比DOMNodeInserted更好的调用方式

var targets;
var list;
var time;
var Stype;
targets = document.body; // 百度
mo = new MutationObserver(function(allmutations) {
    // 注意querySelectorAll得到的对象是静态的，所以每次重复调用的时候需要更新
    time = new Date().getTime();
    if(location.href.indexOf("baidu.com") > -1)
        Stype = ".t a[href='";
    else if(location.href.indexOf("sogou.com") > -1)
        Stype = ".rb .pt a[href='";
    list = document.querySelectorAll(Stype.substring(0,Stype.length-7));
    resetURL();
});
mo.observe(targets, {'childList': true, 'subtree': true});
function resetURL(){
    for(var i = 0; i < list.length; i++){
        // 此方法是异步，故在结束的时候使用i会出问题-严重!
        // 采用调用前通过context过去，调用结束后通过response.context获得
        var curhref = list[i].href;
        if(curhref.indexOf("baidu.com") > -1 || curhref.indexOf("sogou.com") > -1)
            GM_xmlhttpRequest({
                    url: curhref,
                    headers: {
                        "Accept": "text/html"
                    },
                    context: curhref, //直接传递i,在i=0的时候反馈回来时null-猜想被会被转换掉，所以+1
                    method: "GET",
                    onload: function(response) {
                        var indexhref = response.context;
                        var ccnode = document.querySelectorAll(Stype+indexhref+"']")[0];
                        //console.log(ccnode.href);
                        if(ccnode != null){
                            ccnode.href = response.finalUrl;
                        }else{
                            //console.log("该链接已经被其他脚本干掉了哦"+response.finalUrl);
                        }
                    }
            });
        else{
            //console.log("绕过百度重定向直接访问网页： 第"+i+"个已经处理了");
        }
    }
}