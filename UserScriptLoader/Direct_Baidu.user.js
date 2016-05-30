// ==UserScript==
// @name         Direct Baidu
// @namespace    http://userscripts.org/users/92143
// @version      1.3
// @description  不用点击继续访问您选择的百度结果，去除百度搜索跳转，兼容AutoPager等自动翻页扩展和脚本
// @include      /^https?\:\/\/www\.baidu\.com\/search\/ressafe\.html\?.*\&url\=/
// @include      /^https?\:\/\/www\.baidu\.com\/(?=(s|baidu)\?|$)/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

//不用点击继续访问您选择的百度结果
var u = location.href.split('&url=')[1]
u && location.replace(u)
//去除百度搜索跳转使用的缓存
var cache = {}
//去除百度搜索跳转
function modifyBaidu() {
	for(var i = 0, a; a = document.links[i]; i++) {
		var h = a.href
		if(isRedirect(h)) {
			if(!cache[h]) {
				cache[h] = 'pending'
				removeRedirect(h)
			}
			else if('pending' != cache[h]) {
				a.href = cache[h]
			}
		}
	}
	function removeRedirect(url) {
		//GM_xmlhttpRequest needed on https://www.baidu.com for cross-protocol requests
		GM_xmlhttpRequest({
			method: 'GET', 
			url: url, 
			onload: function(r) {
				cache[url] = isRedirect(r.finalUrl) ? r.responseText.split('"')[1] : r.finalUrl
				if(cache[url]) {
					for(var i = 0, a; a = document.links[i]; i++) {
						if(url == a.href) {
							a.href = cache[url]
						}
					}
				}
			}
		})
	}
	function isRedirect(href) {
		return /^https?\:\/\/www\.baidu\.com\/link\?url\=/.test(href)
	}
}
//兼容AutoPager等自动翻页扩展和脚本
MutationObserver = window.MutationObserver || window.WebKitMutationObserver
if(MutationObserver) {
	var observer = new MutationObserver(function(mutations) {
		modifyBaidu()
	})
	//tiny delay needed for firefox
	setTimeout(function() {
		observer.observe(document.body, {
			childList: true, 
			subtree: true
		})
		modifyBaidu()
	}, 100)
}
//for chrome v18-, firefox v14-, internet explorer v11-, opera v15- and safari v6-
else {
	setInterval(function() {
		modifyBaidu()
	}, 500)
}
