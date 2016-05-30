// ==UserScript==
// @name 			网盘自动填写密码【增强版】
// @description		网盘自动填写提取密码【增强版】+网盘超链接与提取码融合。
// @author			极品小猫
// @namespace   	http://www.cnblogs.com/hkmhd/
// @homepage		https://greasyfork.org/scripts/13463
// @supportURL		https://greasyfork.org/scripts/13463/feedback
// @version			2.2.0
// @date			2016.03.19
// 
// 支持的网盘
// @include     	http://pan.baidu.com/share/init?*
// @include     	http://yun.baidu.com/share/init?*
// @include     	http://www.kuaipan.cn/file/id_*
// @include     	/^https?://.+\.yunpan.cn/lk//
// @include     	http://vdisk.weibo.com/lc/*
// @include     	http://*
// @include			https://*
// 
// @exclude			/https?://www.baidu.com/(?:s|baidu)\?/
// @exclude			https://*.evernote.com/*
// @exclude			https://*.yinxiang.com/*
// @require			http://code.jquery.com/jquery-2.1.4.js
// @grant			unsafeWindow
// @encoding		utf-8
// @run-at			document-idle
// ==/UserScript==

var urls=location.href;
var hash=location.hash;
var host=location.hostname.replace(/^www\./i,'').toLowerCase();
unsafeWindow.eve = Event;

var site = {
	'yunpan.cn': {
		chk:  /^[a-z0-9]{4}$/,
		code: '.pwd-input',
		btn:  '.submit-btn'
	},
	'baidu.com': {
		chk:  /^[a-z0-9]{4}$/,
		code: '#accessCode',
		btn:  '#submitBtn'
	},
	'kuaipan.cn': {
		chk:  /^[a-z0-9]{6}$/i,
		code: '#pwdContaier .txt',
		btn:  '#btnOK',
		preSubmit: function (codeBox, okBtn) {
			$('#pwdContaier .bold').textContent = '请手动单击确认按钮然后刷新页面';
		}
	},
	'weibo.com': {
		chk:  /^[a-z0-9]{4}$/i,
		code: '#keypass',
		btn:  '.search_btn_wrap > a',
		preSubmit: function (codeBox, okBtn) {unsafeWindow.$("#validate").submit();}
	},
	'codeRule':/(?:提取|密码?|访问|艾)[码碼]?[:： ]?\s*([a-z\d]{4})/i
};

var hostName = location.host.match(/\w+\.\w+$/)[0].toLowerCase();
var conf = site[hostName];
var HostArr = [];for(var i in site) HostArr.push(i);var HostExp = new RegExp(HostArr.join("|"),'i');	//生成校验超链接的正则

if(conf){	//网盘页面填密码登录
	// 抓取提取码
	var sCode = hash.slice(1).trim();
	
	// 调试用，检查是否为合法格式
	if (!conf.chk.test(sCode)) {
		console.log('没有 Key 或格式不对');
	} else {
		console.log ('抓取到的提取码: %s', sCode);
	}

		// 加个小延时
		setTimeout (function () {
			// 键入提取码并单击「提交」按钮，报错不用理。
			var codeBox = $(conf.code),
				btnOk = $(conf.btn);

			codeBox.val(sCode);		//填写验证码
			
			if (conf.preSubmit)
				if (conf.preSubmit (codeBox, btnOk))
					return ;

			btnOk.click();
		}, 10);
} else {
	$('A').click(function(){
		var target=this;
		//var target=event.target.tagName==='A'?event.target:event.target.parentNode;
		//console.log(this.parentNode.textContent);
		if(HostExp.test(this.href)){
			if(site['codeRule'].test(target.textContent)){
				console.log('在当前超链接的对象中查找密码');
				target.href+='#'+extCode(target);
			} else if(target.nextSibling&&site['codeRule'].test(target.nextSibling.textContent)){
				console.log('密码在超链接后面的兄弟元素中');
				if(!/#/i.test(target.href)) target.href+='#'+extCode(target.nextSibling);
			} else if(site['codeRule'].test(target.parentNode.textContent)){
				console.log('从父对象中查找密码');
				if(!/#/i.test(target.href)) target.href+='#'+extCode(target.parentNode);
			} else {
				console.log('从父对象中查找密码');
				if(!/#/i.test(target.href)) target.href+='#'+extCode(document.body);
			}
		console.log(site['codeRule']);
		console.log(document.body.textContent);
		}
	})
}

function extCode(obj){
	text=obj.textContent.trim();
	var rule=new RegExp('(?:提取|访问)[码碼]?[:： ]?\\s*([a-z\\d]{4})','i');
	return rule.test(text)?text.match(rule)[1]:text.match(site['codeRule'])[1]
}