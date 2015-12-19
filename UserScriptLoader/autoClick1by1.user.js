// @name 網頁自動化系列點擊
// @namespace autoClick1by1.jasonshaw
// @version 0.5
// @description 匹配的任意url，順序逐個點擊設定的obj，任意不存在則徹底停止
// @include http://*
// @include https://*
// @downloadURL https://raw.githubusercontent.com/jasonshaw/userscript/master/autoClick1by1.user.js
// @updateURL https://raw.githubusercontent.com/jasonshaw/userscript/master/autoClick1by1.user.js
// @note 允許在配置中直接給出dom元素 而替代css3 selector數組，參數直接為函數，返回值即dom元素數組
// @note 允許是定standby狀態，用於要點擊的內容依賴頁面初始加載後的動態加載才能運行的情況，默認直接運行系列化點擊，否則等待動態加載後運行
// @note 允許自定義網站的點擊延遲時間
// @note 允許自定義網站的是否在系列點擊之後關閉網頁
// @note 增加腳本運行判斷，解決個別頁面動態加載問題，比如睿派克簽到
// @note 支持kds阻止相冊自動翻頁
// @note 支持睿派克、人大論壇自動等自動簽到
// @note 支持卡飯、睿派克自動關閉側欄
// @note 支持太平洋汽車本頁展開全部內容
// @grant GM_openInTab
// @run-at document-end
// @copyright 2014+, jasonshaw
// ==/UserScript==
(function() {
	var autoClose = false,
		delay = 500,
		standby = false;
	var prefs = {
		'rutracker': {
			startReg: /^http:\/\/rutracker\.org\/forum\/viewtopic\.php\?t=.*/i, //定義href正則
			elements: function() {
				return document.querySelectorAll('div[class="sp-head folded"]');
			}, //不為數組而是函數時，直接提供一個捕獲所有點擊元素的函數方法
			delay: 500
		}, //壇友 amf需要增加的，自動展開折疊的帖子，不要用壇友直接刪除這個規則
		'kds': {
			standby: false, //定義是否，存在等待
			startReg: /http:\/\/model\.kdslife\.com\/show\/photo\/\d+\.html/i, //定義href正則
			autoClose: true, //config中dom.allow_scripts_to_close_windows 需要為true, 存在風險，請謹慎使用
			elements: ['.bigp_nav2 > form > input[value="stop"]'], //所有參數為要點擊的按鈕的css3 selector
			delay: 500
		}, //寬帶山美圖庫阻止自動播放，方便autopager翻頁
		'repaik': {
			startReg: /http:\/\/www\.repaik\.com\/forum\.php\?mod=viewthread&tid=\d+/i,
			elements: ['a.btn_s_close']
		}, //睿派克關閉側欄
		'repaik1': {
			standby: false, //這裡的自動簽到，就是動態加載，需要等待簽到所需的dom元素和js加載和執行完畢，再運行自動化點擊實現簽到
			autoClose: true,
			startReg: /http:\/\/www\.repaik\.com\/plugin\.php\?id=dsu_paulsign:sign/,
			elements: ['ul.qdsmile > li#ch', 'table[class="tfm"] input[value="2"]', '.tr3 > div:nth-child(2) > a > img']
		}, //睿派克自動簽到
		'repaik2': {
			startReg: /http:\/\/www\.repaik\.com\/$/,
			elements: ['a[href$="plugin.php?id=dsu_paulsign:sign"]']
		}, //睿派克自動跳轉到簽到
		'pcauto': {
			startReg: /http:\/\/\w+\.pcauto\.com\.cn\/.+\.html/i,
			elements: ['div.pageViewGuidedd > a[rel="nofollow"]']
		},
		//'kafan': {
		//	startReg: /http:\/\/bbs\.kafan\.cn\/(thread-\d+-\d+-\d+\.html|forum.php\?mod=viewthread.*)/,
		//	elements: ['a.btn_s_close']
		//}, //kafan關閉側欄
		//'kafan1': {
		//	startReg: /http:\/\/bbs\.kafan\.cn\/.*/,
		//	elements: ['a#pper_a']
		//}, //kafan每日簽到

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
            startReg: /http:\/\/appinc\.org\//i,
            elements: ['a[onclick]','#dlbutton > div > ol:nth-child(2) > a[onclick]'],
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
            startReg: /http:\/\/(www|host2)\.jptorrent\.org\/link\.php/i,
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
            startReg: /.*MediaFire.*mediafire/i,
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
        'googledocs': {
            startReg: /^https?:\/\/docs\.google\.com\/uc\?id\=\w+\&export\=download$/,
            elements: ['#uc-download-link'],
            autoClose: true
        },
        'pcloud': {
            startReg: /https?:\/\/my\.pcloud\.com\/publink\/show\?code\=\w+/i,
            elements: ['.publinkResponsive > a[download]'],
            autoClose: true
        },
        'uploadingit': {
            startReg: /http:\/\/uploadingit\.com\/file\/\w+\//i,
            elements: ['#downloadButton'],
            delay: 11000,
            autoClose: true
        },
        'popgo': {
            startReg: /http:\/\/share\.popgo\.org\//i,
            elements: ['#bopen'],
        },
	}

	function autoClick1by1() {
		var href = window.location.href,
			site = null,
			i = 0;
		for (var key in prefs)
			if (prefs[key].startReg.test(href)) {
				site = key;
				break;
			}
			//alert(site);
		if (site == null) return;
		var elements = prefs[site].elements;
		autoClose = prefs[site].autoClose || autoClose;
		delay = prefs[site].delay || delay;
		standby = prefs[site].standby || standby;
		setTimeout(function() {
			try {
				if (elements instanceof Array) var els = prefs[site].elements;
				else { //function
					var els = prefs[site].elements();
				}
				while (els[i]) {
					var obj = (prefs[site].elements instanceof Array) ? document.querySelector(els[i]) : els[i];
					if (obj == null) return;
					if (obj.tagName == "A" && obj.href.indexOf("javascript") < 0 && obj.onclick == "undefined") GM_openInTab(obj.href);
					else obj.click();
					i++;
				}
			} catch (e) {
				alert(e);
			}
		}, delay);
		setTimeout(function() {
			if (autoClose) window.close();
		}, delay + 2000);
	}
	if (standby) {
		document.onreadystatechange = function() {
			if (document.readyState == "complete") autoClick1by1();
		}
	} else autoClick1by1();
})();