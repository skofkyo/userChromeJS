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
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5zxFVKOAAAAIHRSTlMABnDlyAy+njr4r4BtZEXbhXRUMhPd0banpZGQZ0QkItku8DgAAAB9SURBVBjTVc1HFsQgDANQE0gogfTpTfc/5cBDi+CV9eFZwjkOaef1bPPP+28Dd/hwzjtg4Rh6F60GOqNtdL3IiDrdvtyyj6ICIf81CEpEDYS8DDmXhwoRpq9npwobJvakAvPmkAgsumIhWECvqwYehOHyLm1pNoSP4lKO/gHhwgok3YdXzQAAAABJRU5ErkJggg=='
			},{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RRzBITAAAAJnRSTlMAOwf58+zRvRQC44p1Wh0Yj3pSNi8h1sfEtqymZkYsJQ3ayYNiMXN743QAAACbSURBVBjTdY5XDsMwDEPlHTsemU3TzC7d/4i1nSJfLT8EkXoCCH/03spXp09LBmwMouqzK3bCpdNr4QQnKWgkv1LQNp7kncagQuYBQhXXjtVxDoiR6G6JVgpAT/VSAC1l6ymUAmJiFwBi2FRZkgOQiQ5zfhnTfPIeDrXM5iLmsWcfLhd6FGXGBfCzEO0X3RQiRxw9nFpd3fTwUx9HRAfb8c0vtgAAAABJRU5ErkJggg=='
			},{
				name: '附加组件',
				url: 'chrome://mozapps/content/extensions/extensions.xul',
				favicon: 'data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAAQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttQQttRm4MCuAAAAH3RSTlMAxboR8dOfwqmmkH459eC1nJSKhhoMBOzpzLCAdDMkBGkl7QAAAHNJREFUGNONzTcOwzAQRNFhjsrB2XP/WxoUDELs9Lt9xQ5Kmw0K5ywZGgikb0CRaz1e2hipO2mMnlGSrImLIPhOf3iqx7BBKWBiLSJnYORRp8kFjtHS2wLD7qf9eDoCsVmZgdTOfldWSL1wt/y5O9Ev5f4BQoIN6jdDdR4AAAAASUVORK5CYII='
			},{
				name: '侧栏翻译',
				url: 'http://translate.google.cn/m/translate',
				favicon: 'data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA21BMVEX///9GgN/i4uLk5ORJh+3j4+NOiu9DU7PV1dVWkfVOiu1EU692nuNCZcDh4eFHgd9PjvVJivRRj/VMi/Xl5eXX2NhLi/VUkPXn5+fe3t7b3NxHiPRblPTU1NRBV7h7j5pyo/O1zPHO2/DI1/Df5e+Epd7Z2dmcpMimsrh+k518qPOXufKQtfKPtPKtx/HT3vDn6u9dkutUi+aMq+Lh4eFMheHX2Nq2wdfPz9HJzM6ot85qkczDyMq5w8eZn8Kzu8BFVracrLSCmbSWpayKnKR2jJZuiJVxiJNqgY8VFHf1AAAAEHRSTlMBISEh5+Pb29fTg4NFRQ0N5ZDrRAAAALhJREFUGNNFi1WSwzAQBbWb3TBIGku25NgOMzMz3f9EGTmVpKvmo3vqkYRt25zTJHmDik6j38DDAOlI5BfJktCRseM4lmX9m2AP2pQOxasQfHaKfQow16ivUGqVCwDV5WU70yYUKuVSEeQ0aAa3owm9LvBKXrLT5tzACUCe41HG1vdrTU0IIFIyZPQIhFJEIszguqtGUyjyZyR0tyr2GHI/IRnf9+tCa0XexA51T9S0/oTUbuF5QsSfObIWQXe1ZS8AAAAASUVORK5CYII='
			},{
				name: 'sina微博',
				url: 'http://m.weibo.cn/',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAABHVBMVEUAAADfKjHmIiblIyjlJCnlJCrjIyvhKjHbMj3mIyfmHiTlISflJCrjIifjIyrkJiziJCnjKC/cLDXbLjbVPU3lHyLqYmXukpblHyPmNTrpbnHoWV3obHDmOD3oWl3lOj7nSU7jICXlHiXkJSrlPUPjJSviJyvjJi3hKS7hJCzhIirgLDHdGSHmIib////mHyP+//8BAQFXV1fnPD/5+fn66On74uTn29v3y8zDw8OipKTvgYTscXTscHLrXGDpTlNJSUnoQkYZGRkKCgr7+/r++fn09fX69PTu8fH97Ozz6uv439/319j40NHNzs7Nzc3zt7iztLSxsbHzqKupqanwoaOWmJjuioyBgYF9fX3ten1iYmJdXV05OTkoKCjijSyvAAAALXRSTlMAI/zc1rZgPwnu6ObEn5VzajsXDQL8+vj17Onn5N7R0c6+vqqljomEXFA0KBwMXYj5AAAAxUlEQVQI10XKRbbDMBBE0XaMYfzMEE5Lsh1mZmbe/zIij3Jn9U6BJRAVJRXukrINMXzfggs5D2h+xR/iO/iHFq8q21EUePDxP6UPPw6K6ORBkJCiWa1UqiZSSdXAa8PaKttrk05200B7BFxYzvS3hlFME5Y3qQjOWqZ7aul6a00IO1IZHCVSuCz3Tf3AQ+k5Br9lNjVmZ71ZIGTUcGsQf5mni/VrfcHY+NEdAAgpH7tJLjcc5J++fUGwJDxfb6/vn/9KCrgb2xceqUZ8hbsAAAAASUVORK5CYII='
						},{
				name: 'Google+',
				url: 'https://m.google.com/app/plus/',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAADWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEvWIEuDyf0LAAAAFXRSTlMAtHDn9oAmVxjhDwZRQdvPMLyLbwrCH+MGAAAAcElEQVQY02WPWRKDMAxDvWQPUNqi+18ViBOGmbw/L5JsugmeVdkH6ohDw4nVjAduc7yQS++QY0oxmyqQRy51ieWLhidGpA8Mul0UaQVE5AcigvbGvh9r29Ah2erfgodpLWqmI3bZeux02HT69Nz0/gkqcguiFukfUwAAAABJRU5ErkJggg=='
						},{
				name: 'Twitter',
				url: 'https://mobile.twitter.com/',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAb1BMVEUAAAAuxegZv+UjwuYav+UbwOUcwOUeweYjwucow+cZv+Uav+UcwOYdweYfweYjwucgweYwxugbwOUbwOUcwOUbwOUcwOUfweYeweYiwuYfweYjwuYav+Ubv+UeweYkwuYdwOUdwOUiwuYpxOcZv+XHlXi/AAAAJHRSTlMABPwc5c+dYiMP+O69kzsyKQvfxbewjGhUTksW6dylnHdvWRjQv6dCAAAAiklEQVQY05WPRxLDIAxFwTQ3mntJj+5/xgDCmUx2fivpSTP6IqehFf0z9nYvc8lmF6d7C93EUFUjl4aSBwSGHd1cQ6OtgMgT1cIBimudlFA2XdIFHBTtmtaU+Lp+yxdUfSyp0PkYoByyGqvQvV+rWWSDpsWsTl4AaTQjiN+k4LzrJ0N//y0d8+QUH4DzDXiSKiVvAAAAAElFTkSuQmCC'
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
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
})();
