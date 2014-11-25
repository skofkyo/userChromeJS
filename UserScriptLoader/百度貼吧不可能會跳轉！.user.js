// ==UserScript==
// @id             tieba_url_no_jump
// @name           百度贴吧不可能会跳转！
// @version        1.5
// @namespace      jiayiming
// @author         jiayiming
// @description    去除贴吧帖子里链接的跳转
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct*
// @homepageURL    https://greasyfork.org/scripts/783/
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @note           2014.07.19 转帖用XHR+HEAD获取地址，其他照旧
// ==/UserScript==

var locationHref = location.href;

function decode(url,target){
    GM_xmlhttpRequest({
        method: 'HEAD',
        url: url,
        headers: {
            "Referer": locationHref,
        },
        onload: function(response) {
            var newUrl = response.finalUrl;
            //console.log(newUrl);
            target.setAttribute('href', newUrl);
        }
    })
}

function run() {
    var urls = document.querySelectorAll('a[href^="http://jump.bdimg.com/safecheck"]');
    for (var i = 0; i < urls.length; i++) {
        if (urls[i].parentNode.className == "apc_src_wrapper") {
            decode(urls[i],urls[i]);
        }
        else {
            var url = urls[i].childNodes[0].nodeValue;
            if (url.indexOf("http") < 0)
                url = "http://" + url;
            console.log(url);
            urls[i].setAttribute("href", url);
        }
    }
}
 
function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;
 
    var observer = new MutationObserver(function(mutations){
        var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
        if (nodeAdded) {
            // observer.disconnect();
            callback();
        }
    });
    observer.observe(watch, {childList: true, subtree: true});
}
 
 
run();
 
addMutationObserver('#j_p_postlist', run);