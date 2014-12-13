// ==UserScript==
// @name           RedirectionHelper
// @namespace      No.bbs@ptt.cc
// @description    轉址小幫手 v4.0.4
// @author         SuYS
// @updateURL      https://userscripts.org/scripts/source/69797.meta.js
// @version        4.0.4
// @include        http://*alabout.com/*
// @include        http://*alafs.com/*
// @include        http://acg.gamer.com.tw/*
// ==/UserScript==

(function() {
	function RedirectionHelper(baseURI){
		this.baseURI=baseURI;
		this.domain=null;
		this.action=new Actions();
	}
	RedirectionHelper.prototype = {
		matchDomain: function(){
			var domain = this.baseURI.match(/^https?:\/\/([^\/]+)\//);
			if(domain)
				this.domain=domain[1];
			return this;
		},

		matchAction: function(){
			if(this.domain)
				this.action.find(this.domain);
			return this;
		},

		invokeAction: function(){
			if(this.action.invoked)
				this.action.invoked();
			return this;
		}
	}

	function Actions(){
		this.invoked=null;
		this.targetUrl=null;
	}
	Actions.prototype = {
		find: function(domain){
			var isMatch;
			var pattern;
			for(var key in this.patterns){
				pattern = this.patterns[key];
				isMatch = typeof pattern.rule === 'string' ? pattern.rule == domain : pattern.rule.test(domain);
				if(isMatch){
					this.invoked = pattern.run;
					return;
				}
			}
		},

		redirect: function(){
			if(this.targetUrl)
				window.location.replace(this.targetUrl);
		},

		cleanTimer: function(){
			var intervalID=setInterval('0', 10);
			while(--intervalID>0)
				clearInterval(intervalID);
		},

		disableWindowOpen: function(){
			if(unsafeWindow){
				unsafeWindow.open = function(){};
			}

			if(window){
				window.open = function(){};
			}
		},

		patterns: {
			alabout: {
				rule: /(alabout|alafs)\.com/,
				run: function(){
					var o=document.getElementsByTagName('a');
					for(var i in o)
						if(/http:\/\/(www\.)?(alabout|alafs)\.com\/j\.phtml\?url=/.test(o[i].href))
							o[i].href=o[i].textContent;
				}
			},
		}
	}

	var myRedirector=new RedirectionHelper(document.baseURI);
	myRedirector.matchDomain().matchAction().invokeAction();

})();