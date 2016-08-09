// ==UserScript==
// @name            Sidebar.uc.js
// @description     侧边栏功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// ==/UserScript==
(function() {
    if (!document.getElementById('sidebar-box')) return;
	if (!window.SidebarMod) {
		window.SidebarMod = {
			sitelist:[
			{
				name: '书签',
				url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVDhPlZE/SBxBFMY/olHEgFUStNVODKSSIAiBFJKApZAiYqWNWGqhYCPEO+90V43cYlC880BPFOz8U9hZKSEkpLFJYhEQNIfnzs4bYSZvLmNEPPTywQ/evPd9j9lZ3CXaQBfz1h3/T3oVNWoDOWbN1q5dvjj4Qq3jqAjXrl2eTICHKocRsQZlsbXtufH90hnU0wr21AqMxda258Y3pfOHTbTf06KW0SYz6KQsupmYWAKpLC9gRAaSlvGeeXeZxWu13dqqTz816/yXRtASfJHGuUqzuUzEAnSUxm/OetDfxuppAX44D0GLfN0ycN4ZfRhrKH6GMaMPonn0yxRO6COb7sB65GLtgM0Uw1cqvnyAPgrwkzEl+YAfKoVecxCU/iMXKX79WezSHJtLs12YwxNnvy3y8Vz4+EozbC6BmMZnvsUzZ78tOYVO4SFPHgeYMIFC6OHi6hx5OJWTeOPsN2VGUSmTGAnj0BwMKYktNYX2KImXNIkd27MzXjBojKlwsWuZWTyiODYpge9yAkPax2M3QsHDU5nAMM+OaQI5rX/VutG1zDjqZAypKI5XfJsq1/4nXljNsw4ZR2DOzur+doE/oEdo9V5pyj4AAAAASUVORK5CYII='
			},{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH7SURBVDhPhVI9a9tQFBUeO4YOwZTSH+Ch1I2esIdi10jvPYsMmTLkH5Sm9lI8FIsOHUsU+gOMKSGEBNwiB5K9xJbdQJYQYtWIYEonL82HBhNe7316LnbT2AcOsu5759xzr6zdB+FoibPlTPL6OJMUQkuo8nwEtvGsx/TtgOuXASci6hripkMuoy7ZufaXnqtr/0eP69UeI7coDBjpH7JseLKXDW+6RhgbGbdg9F5dj3FeNAryyck7KeR6GHCDYs2y6JZpss/4O+rq5oRRFWsS0PEXRD4G4QjFOLc6mjJAXPlLi2iCSa78zFNZhK6tuDMRMELwo0hWcYF49q8BIvINiimAcR2EW2MDxcO+nX5sWdYT06TnlsXOKKWP5GWFeBQylC89Tj6gEEa5gD2syCIAujdALJCQ4hRYi8lp1CENTPH7e/ohGqyhyU87/UBpJUC4O2mA4yAhDc81aSPfhPqBuaCu3wXGHu+Ac76oyhJ5j4U5j8UjIF59+pYsua2N8uaR/Hyz8HKf2dg936R1VdK0dbeTeuO2R6WN1uD1ZntqYZMofCkkofsAOHrhFVOqHKPktt8CBZqsu77tOOLv/99xnETOo1yKoTvsoKKOpgFjVGQSZQT0QPAVBBcyNnS+VzwGjgNGdTAaopHsCAsD1u7Enofyx6OFmZ9K07Q/7iAmIuxhVMIAAAAASUVORK5CYII='
			},{
				name: '附加组件',
				url: 'about:addons',
				favicon: "chrome://mozapps/skin/extensions/extensionGeneric-16.png#-moz-resolution=16,16"
			},{
				name: '侧栏翻译',
				url: 'http://translate.google.com.hk/#auto/zh-CN/',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAElSURBVDhPrZE/awJBEEevEOz9JPkS6dIHLCzSpQtYBQIhpYF0dmJnkyKkE1FSaCMcxCNBwcI/ICYhiF20sBl5w82y4U4NwYUHe8f+3szsBkdZ65+FGM3ms1SqZVkupsr351C+PgYSH01fBK5vikrhIq/YN8xn/b8J/KAvOiig9W7Y1kDUDzVweVeSq1Ac5x2Rs9ZKTuoiuceN4kazea0iHbE/JIBfAi7QWmfvh19GcwVJqmAy7iVmJwj3r0v3GuwTAubOFEd6D1TmG6gGVDYB+4SAsKE/4sW8CAg+hZFWZ++PoQf3CQjxKreNyMn8LvTgLgEH7Fm5I0DAv50CHyoSov3T2rsG6MTuxwmwpgkAgYUNLhucgJUmyT68KX7Yh0wc/+8Kgi1VwxKf8jOsdgAAAABJRU5ErkJggg=='
			},{
				name: 'webQQ',
				url: 'http://w.qq.com/',
				favicon: 'data:image/ico;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAy9JREFUOI1lk11MW3Uchv8zphfGC2N6sQS8UBPBTTDjZptjy8imXWALm4S5uGgkRqIhsFBc6jTRxa9khCbMXgyMGYRtTmEIgzWdU2yQmc7RbVjb1fUDp20ZWHpODz09peWcPl4s8QOe5Hf3Pr+r9xViFUyLMvwP2gvBaq8WPq6fvXZUf+FSg3e7c6+98uK2stX5/8vBEivhLZr65wDzcxKzcZm6y6+yYXQbze5mOq91arucB6xrxUFh4vdaF7G30OLnmE9qSLKKlEpx3neGfVcOseniDo5MtjEednLI/bpr4+BG078PIpu7SfWi37WS+ivBkrpMIZ+HYhEKeWaTv/LJdCcvfnuQd386xuQfV3netd9+X/aJCpQvdeItaLF+MqoOhoEBjHrjdAz9wtjNe1Ao4Lk7RcePR+jydnEm+JW+aXD7BkGkqpv0WYg0oCanMQADaBryYfrIhfjAyQPHxrjiXwAgGPdjm+qgd6YHi6vRLoi3/sZcB0akHk2ZA+DCzALihBvRNYk4eRXx6QQtwz4AinnwRKewTVk5/H1TQBBryxOpwYjsJZ9V0A04OBZCOH5GnPIierwIx3We67vJRCiFvqKTkVVO3fiMPa4DaUF0X55gKUaoBnILeOMaD3/uY12fH9HnR5z2s64/wEM9M7R7JCiuoKU13OEJdoxbMgL/I2H8AkI1FJaiGMDIbQnRdwdxbvb+9YdpGfZhAAXDIKPkuBG9TvWlPQGRCdc5CuGnyUZsyLIEFBm5LbF7LE67R6LdI2EZT9DukZgIpUjFIiiSyg933FSN7OwWajRakRjo1WPqMikli6qqYKxgrOigFwHQgcJ8BKW3k3TtTlTbO5yYPqmXj26tEEIIIT3+pGP+wmnuyUmS2jJKXicH5AB1cY6l74ZIH96PtP4xpEfXk6vayjdvWrr/aWJACFOqtNQltzax+HUPSed5Foe/QHK8j9zaQHrXs8jVz6C8shulbjPpykpXoLHRJFaTNJdYpS3lWuYNC1nbS2SPv4bW1Uau/0OWBz4m09ygJUtK1o7pvyTM5jK5vNyefrn+Vva9t1GPtiDX196Sn3jKnjCb18z5b3Nxitlmajr/AAAAAElFTkSuQmCC'
				}],

			makeButton: function (sitelist) {
				var i,
					len = sitelist.length,
					item,
					btn,
					frag = document.createDocumentFragment();
					insertpoint = document.querySelector('#sidebar-header .close-icon');
				for (i = 0; i < len; i++) {
					item = sitelist[i];
					btn = frag.appendChild(document.createElement('toolbarbutton'));
					btn.setAttribute('tooltiptext', item.name);
					btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
					btn.setAttribute('url', item.url);
					btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
				}
				insertpoint.parentNode.insertBefore(frag, insertpoint);
			},

			toggleSidebar: function (commandID, forceOpen) {
				var sidebarBox = document.getElementById("sidebar-box"),
				sidebar = document.getElementById("sidebar"),
				sidebarTitle = document.getElementById("sidebar-title"),
				sidebarBoxArrow = document.getElementById('sidebar-box-arrow'),
				lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewHistorySidebar';
				
				if (!commandID && sidebarBox.hidden) {
					if (sidebarBox.getAttribute('sidebarcommand') === '') {
						toggleSidebar(lastcommand, true);
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					} else {
						sidebarBox.hidden = false;
						if (sidebarBoxArrow) sidebarBoxArrow.className = '';
					}
					return;
				}
				
				if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
				let sidebarBroadcaster = document.getElementById(commandID);
				
				if (sidebarBroadcaster.getAttribute("checked") == "true") {
					if (!forceOpen) {
						if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
							sidebar.setAttribute("src", "about:blank");
							sidebar.docShell.createAboutBlankContentViewer(null);
							sidebarBox.setAttribute("sidebarcommand", "");
							sidebarTitle.value = "";
							sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						}
						sidebarBox.setAttribute("sidebarcommand", "");
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						sidebarBroadcaster.removeAttribute("checked");
						sidebarBox.hidden = true;
						if (sidebarBoxArrow) sidebarBoxArrow.className = 'right';
						gBrowser.selectedBrowser.focus();
					} else {
						fireSidebarFocusedEvent();
					}
					return;
				}
				
				var broadcasters = document.getElementsByAttribute("group", "sidebar");
				for (let broadcaster of broadcasters) {
					if (broadcaster.localName != "broadcaster") continue;
					if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
					else sidebarBroadcaster.setAttribute("checked", "true");
				}
				
				sidebarBox.hidden = false;
				if (sidebarBoxArrow)sidebarBoxArrow.className = '';
				
				var url = sidebarBroadcaster.getAttribute("sidebarurl");
				var title = sidebarBroadcaster.getAttribute("sidebartitle");
				if (!title) title = sidebarBroadcaster.getAttribute("label");
				sidebar.setAttribute("src", url);
				sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
				if ( title &&  title !== '') sidebarTitle.value = title;
				sidebarBox.setAttribute("src", url);
				sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
				
				if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
				else fireSidebarFocusedEvent();
			},

			modifySidebarClickBehaviour: function () {
				var sidebar = document.getElementById('sidebar');
				sidebar.addEventListener('DOMContentLoaded', function(){
					if (sidebar.contentDocument){
						sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
						var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
						if (wpb) {
							wpb.onclick = null;
						}
					}
				}, false);
				
				eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
				
				eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
			},

			init: function() {
				window.toggleSidebar = this.toggleSidebar;
				this.makeButton(this.sitelist);
				this.addControlBtn();
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
})();
