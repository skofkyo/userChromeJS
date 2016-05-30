// ==UserScript==
// @name         BaiduSearchNoJump modify by ted423
// @namespace    https://github.com/ywzhaiqi
// @authuer      ywzhaiqi
// @description  百度搜索反跳转，增加了翻页脚本的支持、不刷新页面的支持。
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @homepageURL  https://greasyfork.org/scripts/1771/

// @icon         http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version      2015.09.17.0
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==


var locationHref = location.href;


function decode(url, target){


	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			"Referer": locationHref,
			"Range": "bytes=0-1",
		},
		onerror: function(response) {
			target.setAttribute('style', 'color:#a9a9a9;');
		},
		onreadystatechange: function(response) {
			if(response.readyState==4||response.status==0){
				var newUrl = response.finalUrl;
				if(newUrl.indexOf('www.baidu.com')==-1)
					target.setAttribute('href', newUrl);
				else if (response.responseText.indexOf('window.location.replace')!=-1){
					console.log(response.responseTex);
					var a=response.responseText.split('"');
					target.setAttribute('href', a[1]);
				};
			}
		},
	});
}

function checkDocument(doc) {
	if (!doc) doc = document;
	var links = doc.querySelectorAll('a[href*="www.baidu.com/link?url="]');
	if (!links) return;

	[].forEach.call(links, function(link){
		link.href=link.href.substring(20);
		decode(link.href, link);
	});
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
	observer.observe(watch, {childList: true, subtree: true });
}

var callback = function(records){
	records.map(function(record){
		if(record.addedNodes[0]){
			//console.log(record.addedNodes[0].id);
			if(record.addedNodes[0].id=="wrapper_wrapper"){
				// 添加下一页和不刷新页面的支持
				addMutationObserver('#wrapper_wrapper', function(){
					// console.log('元素被添加')
					checkDocument();
				});
			}
			if(record.addedNodes[0].id=="content_left"){
				//console.log('!');
				checkDocument();
				Firstload.disconnect();
			}
		}
	})
};

checkDocument();//在有缓存的情况下

var Firstload = new MutationObserver(callback);

var option = {
	'childList': true, 
	'subtree': true,
};
Firstload.observe(document, option);
