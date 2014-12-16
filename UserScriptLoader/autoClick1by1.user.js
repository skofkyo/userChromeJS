// ==UserScript==
// @name 网页自动化系列点击
// @namespace autoClick1by1.jasonshaw
// @version 0.2
// @description 匹配的任意url，顺序逐个点击设定的obj，任意不存在则彻底停止
// @include http://*.kdslife.com/show/photo/*.html
// @include http://www.repaik.com/forum.php?mod=viewthread*
// @include http://*.pcauto.com.cn/*/*/*/*.html
// @include http://bbs.pinggu.org/plugin.php?id=dsu_paulsign:sign*
// @include http://www.repaik.com/plugin.php?id=dsu_paulsign:sign*
// @include http://www.soft8.me/Files/*
// @include http://www.2121.club/*.html
// @include http://*.mimima.com/link.php?ref=*
// @include http://www.jptorrent.org/link.php*
// @include http://99files.net/download.html?id=*
// @include http://www.datafilehost.com/d/*
// @include http://9xdd.com/_dl*
// @include http://9xdd.com/_dl_*/_MediaFire_*mediafire.htm
// @include http://bbs.kafan.cn/thread-*-*-*.html
// @downloadURL    https://github.com/jasonshaw/userscript/blob/master/autoClick1by1.user.js
// @updateURL      https://github.com/jasonshaw/userscript/blob/master/autoClick1by1.user.js
// @note 支持kds阻止相册自动翻页
// @note 支持睿派克、人大论坛自动等自动签到
// @note 支持卡饭、睿派克自动关闭侧栏
// @note 支持太平洋汽车本页展开全部内容
// @run-at document-end
// @copyright 2014+, jasonshaw
// ==/UserScript==

(function() {
	var prefs = {
		kds: [/http:\/\/model\.kdslife\.com\/show\/photo\/\d+\.html/i, 'input[type="radio"][value="stop"]'], //第一个参数定义href正则，后续所有参数为要点击的按钮的css3 selector
		repaik: [/http:\/\/www\.repaik\.com\/forum\.php\?mod=viewthread&tid=\d+/i, 'a.btn_s_close'],
		pcauto: [/http:\/\/\w+\.pcauto\.com\.cn\/.+\.html/i, 'div.pageViewGuidedd > a[rel="nofollow"]'],
		pinggu: [/http:\/\/bbs\.pinggu\.org\/plugin\.php\?id=dsu_paulsign:sign/, 'ul.qdsmile > li#fd', 'table[class="tfm qdtfm"] input[value="2"]', 'td.qdnewtd3 > a'],
		repaik1: [/http:\/\/www\.repaik\.com\/plugin\.php\?id=dsu_paulsign:sign/, 'ul.qdsmile > li#ch', 'table[class="tfm"] input[value="2"]', '.tr3 > div:nth-child(2) > a > img'],
		soft8: [/http:\/\/\www\.soft8\.me\/Files\//i, 'a[onclick]'],
		club: [/http:\/\/\www\.2121\.club\/(.*)\.html/, 'button[onclick]'],
		mimima: [/http:\/\/(.*)\.mimima\.com\/link\.php/i, 'td[valign="bottom"] input[valign="bottom"]'],
		jptorrent: [/http:\/\/www\.jptorrent\.org\/link\.php/i, 'input[valign="bottom"]'],
		files: [/http:\/\/99files\.net\/download\.html/i, 'a[class="btn btn-success"]'],
		datafilehost: [/http:\/\/www\.datafilehost\.com\/d\//i, 'input[onclick]','#dl > a[href]'],
		azofreeware2: [/(.*)MediaFire(.*)mediafire/i, 'a[title="按此由MediaFire下載！"]'],
		azofreeware1: [/http:\/\/9xdd\.com\/\_dl/i, 'h2 > a[href]'],
		kafan: [/http:\/\/bbs\.kafan\.cn\/thread-\d+-\d+-\d+\.html/, 'a.btn_s_close'] //,
	};
	var href = window.location.href,
		site = null,
		i = 1;
	for (var key in prefs)
		if (prefs[key][0].test(href)) {
			site = key;
			break;
		}
		//alert(site);
	if (site == null) return;
	setTimeout(function() {
		try {
			while (prefs[site][i]) {
				var obj = document.querySelector(prefs[site][i]);
				if (obj == null) return; //alert(prefs[site][i]); continue;
				//AutoClose
				//dom.allow_scripts_to_close_windows 必须为true
				var ac1 = /http:\/\/\www\.2121\.club\/(.*)\.html/.test(href);
				var ac2 = /http:\/\/(.*)\.mimima\.com\/link\.php/i.test(href);
				var ac3 = /http:\/\/www\.jptorrent\.org\/link\.php/i.test(href);
				var ac4 = /http:\/\/99files\.net\/download\.html/i.test(href);
				var ac5 = /http:\/\/www\.datafilehost\.com\/d\//i.test(href);
				var ac6 = /(.*)MediaFire(.*)mediafire/i.test(href);
				if (ac1 || ac2 || ac5 || ac6) {
					obj.click();
					setTimeout(function() {window.close();}, 2000);
				} else if (ac3 || ac4) {
					setTimeout(function() {
						obj.click();
						document.querySelector('a[class="btn btn-success"]').click();
					}, 5000);
					setTimeout(function() {window.close();}, 6000);
				} else {
					obj.click();
				}
				i++
			}
		} catch (e) {
			alert(e)
		}
	}, 500);
})();
        