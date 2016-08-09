// ==UserScript==
// @name           BaiduMusicPlayBar
// @namespace      铭心
// @modified       w13998686967
// @description	   百度随心听播放工具条
// @include        main
// @version        2014/05/25 
// @version        2014/04/15
// @version        2013/09/09
// ==/UserScript==
var PlaySoundBar = {
	url : "http://fm.baidu.com/",
	logo : {
	    main:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAADQ0ND6+vrf39/09PQzMzM6OjpHR0fo6OhISEja2tp5eXmEhISZmZnv7++AgICpqamysrJlZWVCQkLu7u719fUGbKYmAAAAAXRSTlMAQObYZgAAAGpJREFUGNNVzlsSgzAMQ1GFxHacUMKr+99qQwcE3Bn9nC8Bbkw/6GnIZ1HkEE+4chUAlgnfuL0ByQmloJfthKmOY50eMDegzTfsawDCuhOqJCBKIyzWoWwLAcPwH4EdwOs8piGzoB3cHjl+XMkEcFyZcTQAAAAASUVORK5CYII=",//黑色
//		main:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAE9SURBVDhPnZNNKwVRGMfvl/AWt+jaKNko30MpSknsZKdcC1lYKuqmWElZWrASC1sWZo2at/IF5q1pXhd//g8zHe5c4zr1a2bOeX7/nnNO08DHcBznX3A0fN9HGIZI07Qv6NBtBEGALMt+ZXL7HuMbl0Jz5aScp1sbQJnSwPyBMLX3UK5JANuoarFgcOEI0+1bEec6z9A0rVyTLdQFjCyfSgBFVSZ/CmiuX3SJBRLgeR6SJOkJD44BVWt0awMmNq/qA+I4/sb1i4Oduze0tm7KDn7WkMoA7nn28BUz+4+f9/51BmpNgQS4rosoikp46qOrZxhbO0dr90m+GaDWFNCVDtRJFg8tdjC8dCzPXjKRDngVPBC1NUoF6rwKHblGXdclLc/zvqBjGAbkd+YLMU1TsCwLtm13wfmihvUA8A61vp3sDMPVvQAAAABJRU5ErkJggg==",
		hate:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAAAzMzNsbGyGhoZISEg5OTlaWlpHR0fo6OiBgYH19fX5+fmRkZGOjo5kZGRFRUW7u7vR0dFSUlJVVVVoaGiZmZnn5+d3d3dwcHDe3t65ubkT6osHAAAAAXRSTlMAQObYZgAAAHlJREFUGNNNz1kOxSAIQFFUUKlTp9dp/wt9NLUpN4aPEz8AAFt4ox9INMXeacwtOMAbkpEZIkjbJmM4W4d0reuVRPCBlD2zzwli6D/c7P3s4IN9sXbZFbB1zrKGyvI0HKUcGqohMlXBmEvJYwe1uiymj5MmAnW+1BD+RO4GBzWs4NQAAAAASUVORK5CYII=",
		loved:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAABHR0fo6OgzMzPz8/PX19ebm5s5OTmRkZG5ublJSUnR0dG9vb3e3t5KSko8PDxU4WaMAAAAAXRSTlMAQObYZgAAAGFJREFUCNdjYBQEgW8MDOyblJSUdI0TGBgdGIBguQEDowKI4SsAZbCAGKwpbgFMIEa41WNTMKPZ2NgCzAg2NoaI8BgbHwAzGCZbMkAYHA1QBhCAGA4QAyGWKmkXQJ0hKAAAAgwQdI7BGEcAAAAASUVORK5CYII=",
		love:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAAA6Ojr19fXR0dEzMzNKSkqamppHR0fo6Oh3d3ff39/JyclCQkL6+vrk5OR+fn6VlZVTU1NmZmbDw8Ojo6Pq6uqgoKCKioqyi0ikAAAAAXRSTlMAQObYZgAAAGlJREFUGNNVz0kSgCAMRNEGwhDEEYf731QpMeBfvupFAviWcnhSJtQiURGv8WUVFQgCOqYKIr6C4engAQgVhpWt5zULbDN2h2sTyCkCU2oLnDSOtKABnLULesDM6KHUQPeHvc9JRpXFL9xxoQSauLlt8AAAAABJRU5ErkJggg==",
		next:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAA5OTnBwcGamppISEhFRUX19fVHR0fo6OgzMzNXV1ft7e3R0dFoaGhjY2Pe3t7Nzc3n5+eVlZWJiYmgoKB7e3uxsbE8PDxJSUn8/PyFpEOtAAAAAXRSTlMAQObYZgAAAG1JREFUGNNtz0kOhDAMRNFKiEmKeehmuP9FAYWCDX/5ZFk2ECyqtcCZa9JdT14SSqjNEUBMD5S9CSQhwy5IMcOvq/GfAIw3TLSlYutRa4JsO3J+YGaByoZ3x+ABP+IF9Q06XYfl51TjkN9XFnAAi+YEpUiVaxkAAAAASUVORK5CYII="
	},
	setting : {
		showLyric : true // false-不显示歌词 true-显示歌词
	},
	debug : function (str) {
		PlaySoundBar.setting.debug ? alert(str) : null;
	},
	style : '',
	MusicBrowser : null,
	observe : function () {
		this.bar = this.getById('Music-bar');
		this.hbox = this.getById('MusicBar-hbox');
		this.btns.logo = this.getById('MusicBar-logo');
		this.btns.logo.addEventListener('click', this.onclick, false);
		this.title = this.getById('MusicBar-title');
		this.lyric = this.getById('MusicBar-lyric');
		this.btns.love = this.getById('MusicBar-love');
		this.btns.love.addEventListener('click', this.clickLoveBtn, false);
		this.btns.next = this.getById('MusicBar-next');
		this.btns.next.addEventListener('click', this.next, false);
		this.btns.hate = this.getById('MusicBar-hate');
		this.btns.hate.addEventListener('click', this.hateSong, false);
	},
	getById : function (id) {
		return document.getElementById(id);
	},
	getBaiduFMBrowser : function () {
		var pane_iframe = PlaySoundBar.getById("MusicBar-iframe");
		if (pane_iframe)
			return pane_iframe;
		return null;
	},
	addBar : function () {
		var overlay = '<overlay id="MusicBar" xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" xmlns:html="http://www.w3.org/1999/xhtml">\
						<toolbarpalette id="urlbar-icons">\
						<hbox id="Music-bar">\
						    <hbox id="MusicBar-hbox" hidden="true">\
							    <box id="MusicBar-lyric"></box>\
								<box id="MusicBar-title"></box>\
							</hbox>\
							<image id="MusicBar-hate" hidden="true" tooltiptext="讨厌这首歌"/>\
							<image id="MusicBar-love" hidden="true" love="false" tooltiptext="喜欢这首歌"/>\
							<image id="MusicBar-next" hidden="true" tooltiptext="下一首/下载歌曲/上一首"/>\
							<image id="MusicBar-logo" label="百度随心听" tooltiptext="百度随心听" style="list-style-image:url(' + PlaySoundBar.logo.main + ')"/>\
						</hbox>\
						</toolbarpalette>\
					</overlay>';
		overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
		window.userChrome_js.loadOverlay(overlay, PlaySoundBar);
		var css = '	#Music-bar{\
					    -moz-box-ordinal-group:0!important;\
					}\
		            #MusicBar-next { \
						list-style-image:url(' + PlaySoundBar.logo.next + ');\
					}\
					#MusicBar-love,#MusicBar-hate,#MusicBar-next{\
						margin:0px 1px;\
						overflow:hidden;\
					}\
					#MusicBar-love[love="false"]{\
						list-style-image:url(' + PlaySoundBar.logo.love + ');\
					}\
					#MusicBar-love[love="true"]{\
						list-style-image:url(' + PlaySoundBar.logo.loved + ');\
					}\
					#MusicBar-hate{\
						list-style-image:url(' + PlaySoundBar.logo.hate + ');\
					}\
					#MusicBar-title{\
						margin:0px 2px;\
						color: #000000;\
					}\
					#MusicBar-title,#MusicBar-lyric{\
					    line-height:14px;\
						font-size: 95%;\
						cursor:pointer;\
					}\
					#MusicBar-lyric{\
					    margin:0px 2px;\
						color: rgba(237,87,116,1);\
					}\
					#MusicBar-logo{\
						padding: 0px 2px;\
					}';
		//设置歌词显示宽度
		if (PlaySoundBar.setting.showLyric) {
			css += '#MusicBar-lyric{width:10px;}';
		}
		function addStyle(css) {
			var pi = document.createProcessingInstruction(
					'xml-stylesheet',
					'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"');
			return document.insertBefore(pi, document.documentElement);
		}
		PlaySoundBar.style = addStyle(css);
	},
	onclick : function (e) {
	try {
			if (PlaySoundBar.MusicBrowser) {
				if(e.button==0){	
					PlaySoundBar.btns.love.hidden = !PlaySoundBar.btns.love.hidden;
					PlaySoundBar.btns.next.hidden = !PlaySoundBar.btns.next.hidden;
					PlaySoundBar.btns.hate.hidden = !PlaySoundBar.btns.hate.hidden;
//					PlaySoundBar.hbox.hidden = !PlaySoundBar.hbox.hidden;
				}
				if(e.button==1){
					closeMenus(e.currentTarget);
					var panel = PlaySoundBar.getById("MusicBar-panel");
					panel.openPopup(PlaySoundBar.btns.logo, "after_end", -8, 0, false, null, null);
				}
				if(e.button==2){
				    e.preventDefault();	
                    return (PlaySoundBar.MusicBrowser.$(".playerpanel-btnplay")).click();
				}	
			} else { // 第一次加载
				if (!PlaySoundBar.getBaiduFMBrowser()) {
					var panel = PlaySoundBar.getById("MusicBar-panel");
					if (!panel) {
						var mainPopupSet = PlaySoundBar.getById("mainPopupSet");
						if (mainPopupSet && !panel) {
							panel = PlaySoundBar.addPanel(mainPopupSet);
//                          panel.openPopup(PlaySoundBar.btns.logo, "after_start", -8, 0, false, null, null); //第一次点击的弹窗
							document.addEventListener('DOMContentLoaded', function () {
							document.removeEventListener('DOMContentLoaded', arguments.callee, false);
								if (document.readyState == "complete") {
									setTimeout(PlaySoundBar.BarInnt, 1000);
								} else {
									setTimeout(arguments.callee, 100);
								}
							}, false);
						} 
					}
				}
			}
		} catch (e) {
			PlaySoundBar.debug('error' + e)
		}
	},
	addPanel : function (mainPopupSet) {
		var panel = document.createElement("panel");
		panel.id = "MusicBar-panel";
		panel.setAttribute("type", "arrow");
		panel.setAttribute("flip", "both");
		panel.setAttribute("side", "top");
		panel.setAttribute("consumeoutsideclicks", "false");
		panel.setAttribute("noautofocus", "false");
		panel.setAttribute("panelopen", "true");
		mainPopupSet.appendChild(panel);
		var iframe = panel.appendChild(document.createElement("iframe"));
		iframe.id = "MusicBar-iframe";
		iframe.setAttribute("type", "menu");
		iframe.setAttribute("flex", "1");
		iframe.setAttribute("transparent", "transparent");
		iframe.setAttribute("showcaret", "true");
		iframe.setAttribute("autocompleteenabled", "true");
		iframe.setAttribute("style", "width: 970px; height: 630px;");
		iframe.setAttribute('src', PlaySoundBar.url);

		return panel;
	},
	changeLoveStyle : function (state, time) {
		setTimeout(function () {
			PlaySoundBar.btns.love.setAttribute('love', state);
		}, time ? time : 100);
	},
	play : function () {
		this.MusicBrowser.player.play();
	},
	pause : function () {
		this.MusicBrowser.playlist.pause();
	},
	reset : function () {
		this.MusicBrowser.player.reset();
	},
	getState : function () {
		return this.MusicBrowser.player.getState();
	},
	getTitle : function () {
		var title = this.MusicBrowser.$("#playerpanel-songname").text();
		return title;
	},
	setTitle : function (title) {
		this.title.textContent = title;
	},
	getArtist : function () {
		var artist = this.MusicBrowser.$(".playerpanel-artistname").text();
		return artist;
	},
	next : function (event) {
		if(event.button==2){
			event.preventDefault();
            return (PlaySoundBar.MusicBrowser.$("#playerpanel-prev-song-overlay-text")).click();
		}	
		if(event.button==1){
		    return (PlaySoundBar.MusicBrowser.$("#playerpanel-btndownload")).click();
		}
        if(event.button==0){
		    return (PlaySoundBar.MusicBrowser.$(".playerpanel-btnskip")).click();
		}		
	},
	checkLoved : function () {
		return (PlaySoundBar.MusicBrowser.$(".playerpanel-btnlove")).hasClass("loved");
	},
	hateSong : function () {
		return (PlaySoundBar.MusicBrowser.$(".playerpanel-btnhate")).click();
	},
	loveSong : function (loveBtn) {
		loveBtn.click();
		this.changeLoveStyle('true');
	},
	deLoveSong : function (loveBtn) {
		loveBtn.click();
		this.changeLoveStyle('false');
	},
	clickLoveBtn : function (e) {
		if (!PlaySoundBar.MusicBrowser)
			return;
		var loveBtn = (PlaySoundBar.MusicBrowser.$(".playerpanel-btnlove"));
		if (loveBtn.hasClass("loved")) {
			PlaySoundBar.deLoveSong(loveBtn);
		} else {
			PlaySoundBar.loveSong(loveBtn);
		}
	},
	addTitleChangeEvent : function (e) {
		/*添加标题改变监听器*/
		try {
			var title = this.Browser.querySelector("#playerpanel-songname");
			if (!title) {
				setTimeout(PlaySoundBar.addTitleChangeEvent(), 1000);
				return;
			}

			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

			var observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (record) {
						if (record.attributeName == "title" || record.attributeName == "href") {
							//PlaySoundBar.debug(record.target.title)
							PlaySoundBar.setTitle(record.target.title + "-" + PlaySoundBar.getArtist());
							if (PlaySoundBar.checkLoved()) {
								PlaySoundBar.changeLoveStyle('true');
							} else {
								PlaySoundBar.changeLoveStyle('false');
							}
						}
					});
				});
			observer.observe(title, {
				attributes : true,
				childList : false,
				characterData : false,
				attributeOldValue : true,
				attributeFilter : ['href']//"title",
			});
			PlaySoundBar.setTitle(PlaySoundBar.getTitle() + "-" + PlaySoundBar.getArtist());
			// var panel = PlaySoundBar.getById("MusicBar-panel");
			// panel.hidePopup();
		} catch (e) {
			PlaySoundBar.debug('error' + e);
			setTimeout(PlaySoundBar.addTitleChangeEvent(), 1000);
		}
	},
	addLyricsChangeEvent : function (e) {
		try {
			var ul = this.Browser.querySelector('#playerpanel-lyrics');
			if (!ul) {
				setTimeout(PlaySoundBar.addLyricsChangeEvent(), 1000);
				return;
			}
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

			var observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (record) {
						if (record.attributeName == "class") {
							if (record.target.className == "current") {
								if (record.target.textContent != "")
									PlaySoundBar.lyric.textContent = record.target.textContent;
							}
						}
					});
				});
			observer.observe(ul, {
				childList : true,
				attributes : true,
				characterData : false,
				subtree : true,
				attributeOldValue : false,
				characterDataOldValue : false,
				attributeFilter : ['class']
			});
		} catch (e) {
			PlaySoundBar.debug('error' + e)
			setTimeout(PlaySoundBar.addLyricsChangeEvent(), 1000);
		}
	},
	BarInnt : function () {
		/*查找是否有音乐界面并初始化*/
		var Browser = PlaySoundBar.getBaiduFMBrowser();
		if (Browser) {
			PlaySoundBar.debug('BarInnt');
			PlaySoundBar.MusicBrowser = Browser.contentWindow.wrappedJSObject;
			PlaySoundBar.Browser = Browser.contentDocument;
			try {
				PlaySoundBar.addTitleChangeEvent();
				PlaySoundBar.setting.showLyric ? PlaySoundBar.addLyricsChangeEvent() : null;
				PlaySoundBar.hbox.hidden = false;
				PlaySoundBar.btns.love.hidden = false;
				PlaySoundBar.btns.next.hidden = false;
				PlaySoundBar.btns.hate.hidden = false;
				PlaySoundBar.bar.className = 'Music-bar-border';
				//PlaySoundBar.changeStateStyle('playing');
			} catch (e) {
				alert(e)
			}
			return true;
		}
		return false;
	},
	btns : {}
}
PlaySoundBar.addBar();