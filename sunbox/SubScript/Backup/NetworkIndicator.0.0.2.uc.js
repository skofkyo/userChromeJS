// ==UserScript==
// @name			Network Indicator
// @version			0.0.2
// @compatibility	FF34+
// @description		显示当前页面连接IP 和SPDY、HTTP/2
// @include			main
// ==/UserScript==

'use strict';

if (location == 'chrome://browser/content/browser.xul') {

	let networkIndicator = {

		init(){
			if(this.icon) return;
			this.setStyle();
			this.icon.addEventListener('click', this, false);
			this.panel.addEventListener('dblclick', this, false);
			this.panel.addEventListener('mouseover', this, false);
			this.panel.addEventListener('mouseout', this, false);
			gBrowser.tabContainer.addEventListener('TabSelect', this, false);
			['content-document-global-created', 'inner-window-destroyed', 'outer-window-destroyed',
			 'http-on-examine-cached-response', 'http-on-examine-response'].forEach(topic => {
				Services.obs.addObserver(this, topic, false);
			});
		},

		_icon: null,
		_panel: null,

		get icon (){
			if(!this._icon){
				this._icon = document.getElementById('NetworkIndicator-icon') || 
					this.createElement('image', {id: 'NetworkIndicator-icon', class: 'urlbar-icon'},
						[document.getElementById('urlbar-icons')]);
				return false;
			}
			return this._icon;
		},

		get panel (){
			if(!this._panel){
				this._panel = document.getElementById('NetworkIndicator-panel') || 
					this.createElement('panel', {
						id: 'NetworkIndicator-panel',
						type: 'arrow'
					}, document.getElementById('mainPopupSet'));
					this._panel._list = this.createElement('html:ul', {}, this._panel);
			}
			return this._panel;
		},

		currentBrowserPanel: new WeakMap(),
		_panelNeedUpdate: false,

		observe(subject, topic, data) {
			if(topic == 'http-on-examine-response' || topic == 'http-on-examine-cached-response'){
				this.onExamineResponse(subject, topic);
			}else if(topic == 'inner-window-destroyed'){
				let innerID = subject.QueryInterface(Ci.nsISupportsPRUint64).data;
				delete this.recordInner[innerID];
				if(this.getWinId().currentInnerWindowID != innerID){
					this._panelNeedUpdate = true;
					this.updateState();
				}
			}else if(topic == 'outer-window-destroyed'){
				let outerID = subject.QueryInterface(Ci.nsISupportsPRUint64).data,
					cwId = this.getWinId();
				delete this.recordOuter[outerID];
				if(cwId.outerWindowID != outerID){
					this._panelNeedUpdate = true;
					this.updateState();
					//从一般网页后退到无网络请求的页面（例如about:xxx）应关闭面板。
					if(!this.recordInner[cwId.currentInnerWindowID])
						this.panel.hidePopup();
				}
			}else if(topic == 'content-document-global-created'){
				let domWinUtils = subject.top
									.QueryInterface(Ci.nsIInterfaceRequestor)
									.getInterface(Ci.nsIDOMWindowUtils),
					outerID = domWinUtils.outerWindowID,
					innerID = domWinUtils.currentInnerWindowID,
					ro = this.recordOuter[outerID];
				if(!ro) return;
				let mainHost = ro.pop(),
					ri = this.recordInner[innerID];
				//标记主域名
				mainHost.isMainHost = true;
				this.recordInner[innerID] = [mainHost];
				delete this.recordOuter[outerID];
			}
		},

		//记录缓存对象
		recordOuter: {},
		recordInner: {},

		onExamineResponse(subject, topic) {
			let channel = subject.QueryInterface(Ci.nsIHttpChannel),
				nc = channel.notificationCallbacks || channel.loadGroup && channel.loadGroup.notificationCallbacks,
				domWinUtils = null,
				domWindow = null;
			if(!nc || (channel.loadFlags & Ci.nsIChannel.LOAD_REQUESTMASK) == 5120){
				//前进后退读取Cache需更新panel
				return this._panelNeedUpdate = topic == 'http-on-examine-cached-response';
			}
			try{
					domWindow = nc.getInterface(Ci.nsIDOMWindow);
					domWinUtils = domWindow.top
									.QueryInterface(Ci.nsIInterfaceRequestor)
									.getInterface(Ci.nsIDOMWindowUtils);
			}catch(ex){
				//XHR响应处理
				let ww = null;
				try{
					ww = subject.notificationCallbacks.getInterface(Ci.nsILoadContext);
				}catch(ex1){
					try{
						ww = subject.loadGroup.notificationCallbacks.getInterface(Ci.nsILoadContext);
					}catch(ex2){}
				}
				if(!ww) return;
				try{domWindow = ww.associatedWindow;}catch(ex3){}
				domWinUtils = this.getWinId(ww.topFrameElement);
			}

			let isMainHost = (channel.loadFlags & Ci.nsIChannel.LOAD_INITIAL_DOCUMENT_URI
					&& domWindow && domWindow == domWindow.top);

			//排除ChromeWindow的、unload等事件触发的请求响应
			if(!domWinUtils || (channel.loadFlags == 640 && !subject.loadGroup)
				|| domWindow instanceof Ci.nsIDOMChromeWindow
				|| (!isMainHost && channel.loadInfo && channel.loadInfo.loadingDocument
					&& channel.loadInfo.loadingDocument.ownerGlobal === null)
			) return;

			let outerID = domWinUtils.outerWindowID,
				innerID = domWinUtils.currentInnerWindowID,
				newentry = Object.create(null),
				cwId = this.getWinId();

			newentry.host = channel.URI.asciiHost;
			newentry.scheme = channel.URI.scheme;
			//newentry.url = channel.URI.asciiSpec;
			channel.remoteAddress && (newentry.ip = channel.remoteAddress);

			channel.QueryInterface(Ci.nsIHttpChannelInternal);
			try{
				//获取响应头的服务器、SPDY、HTTP/2信息
				channel.visitResponseHeaders({
					visitHeader(name, value){
						let lowerName = name.toLowerCase();
						if (lowerName == 'server') {
							newentry.server = value
						}else if(lowerName == 'x-firefox-spdy'){
							newentry.spdy = value
						}
					}
				});
			}catch(ex){}

			if(isMainHost){
				newentry.url = channel.URI.asciiSpec;
				outerID && (this.recordOuter[outerID] || (this.recordOuter[outerID] = [])).push(newentry);
				if(this.panel.state != 'closed'){
					if(cwId.outerWindowID == outerID){
						if(this.panel.hasAttribute('overflowY'))
							this.panel.removeAttribute('overflowY');
						let list = this.panel._list;
						while(list && list.hasChildNodes())
							list.removeChild(list.lastChild);
					}
				}
			}else{
				innerID && (this.recordInner[innerID] || (this.recordInner[innerID] = [])).push(newentry);
				//newentry.loadFlags = channel.loadFlags
			}

			//更新图标状态
			if(cwId.outerWindowID == outerID || cwId.currentInnerWindowID == innerID)
				this.updateState(cwId);

			//当且仅当主动点击打开显示面板时才查询IP位置、更新面板信息。
			//避免每次刷新页面都请求查询网站的IP，以减少暴露隐私的可能、性能消耗。
			if(this.panel.state != 'closed' && (cwId.outerWindowID == outerID || cwId.currentInnerWindowID == innerID)){
				//标记下次点击显示时是否需更新面板内容
				if(this._panelNeedUpdate = !(this.recordInner[cwId.currentInnerWindowID] || [{}]).some(re => re.isMainHost))
					this.panel.hidePopup(); //类似about:addons页面情况下，刷新时必须关闭面板，避免计数叠加。

				this.dnsDetect(newentry, isMainHost);
			}else{
				this._panelNeedUpdate = true;
			}
		},

		_nsIDNSService: Cc['@mozilla.org/network/dns-service;1'].createInstance(Ci.nsIDNSService),

		dnsDetect(obj, isMainHost){
			if(obj.ip) return this.updatePanel(obj, isMainHost);
			this._nsIDNSService.asyncResolve(obj.host, this._nsIDNSService.RESOLVE_BYPASS_CACHE, {
				onLookupComplete: (request, records, status) => {
					if (!Components.isSuccessCode(status)) return;
					obj.ip = records.getNextAddrAsString();
					this.updatePanel(obj, isMainHost);
				}
			}, null);
		},

		updatePanel(record, isMainHost){
			let cE = this.createElement,
				list = this.panel._list,
				li = list.querySelector(`li[ucni-ip="${record.ip}"]`),
				p = null;

			if(!li){//不存在相同的IP
				let fragment = document.createDocumentFragment();
				li = cE('html:li', {'ucni-ip': record.ip}, fragment);
				cE('html:p', {class: 'ucni-ip', text: record.ip + '\n'}, cE('html:span', {}, li));
				// + '\n' 复制时增加换行格式
				p = cE('html:p', {class: 'ucni-host', host: record.host, scheme: record.scheme, counter: 1, text: record.host + '\n'}, cE('html:span', {}, li));
				p._connCounter = 1;
				p._connScheme = [record.scheme];
				if(isMainHost){
					//标记主域名
					li.classList.add('ucni-MainHost');
					//主域名重排列至首位
					list.insertBefore(fragment, list.firstChild);
					//更新主域名 IP位置
					this.setMainHostLocation(record, list);
				}else{
					list.appendChild(fragment);
					//不存在相同的IP且非主域名
					this.setTooltip(li, record);
				}
			}else{//相同的IP
				p = li.querySelector(`.ucni-host[host="${record.host}"]`);
				if(!p){//同IP不同的域名
					p = cE('html:p', {class: 'ucni-host', host: record.host, scheme: record.scheme, counter: 1, text: record.host + '\n'}, li.querySelector('.ucni-host').parentNode);
					p._connCounter = 1;
					p._connScheme = [record.scheme];
				}else{//同IP同域名
					p.setAttribute('counter', ++p._connCounter); //计数+1

					if(p._connScheme.every(s => s != record.scheme)){
						//同IP同域名不同的协议
						p._connScheme.push(record.scheme);
						p.setAttribute('scheme', p._connScheme.join(' '));
					}
				}
				if(isMainHost){
					li.classList.add('ucni-MainHost');
					if(list.firstChild != li){
						list.insertBefore(li, list.firstChild);
						li.insertBefore(p, li.firstChild);
					}
					this.setMainHostLocation(record, list);
				}
			}

			if(this.panel.popupBoxObject.height > 500 && !this.panel.hasAttribute('overflowY')){
				this.panel.setAttribute('overflowY', true);
			}

			if(record.spdy && (!p.spdy || p.spdy.every(s => s != record.spdy))){
				(p.spdy || (p.spdy = [])).push(record.spdy);
				p.setAttribute('spdy', p.spdy.join(' '));
			}

			this.setTooltip(p, {
				counter: p._connCounter,
				server: record.server,
				scheme: p._connScheme || [record.scheme],
				spdy: p.spdy
			});
		},

		setMainHostLocation(obj, list) {
			if(obj.location){
				if(list.querySelector('#ucni-mplocation')) return;
				let cE = this.createElement,
					fm = document.createDocumentFragment(),
					li = cE('html:li', {id: 'ucni-mplocation'}, fm);
				cE('html:span', {text: obj.location + '\n'}, cE('html:span', {text: '所在地: '}, cE('html:p', {}, li)).parentNode);
				obj.server && cE('html:span', {text: obj.server + '\n'}, cE('html:span', {text: '服务器: '}, cE('html:p', {}, li)).parentNode);
				list.insertBefore(fm, list.firstChild);
				//同时更新第一个（主域名）tooltip
				this.setTooltip(list.querySelector('.ucni-MainHost'), obj);
			}else{
				this.queryLocation(obj.ip, result => {
					obj.location = result.location;
					this.setMainHostLocation(obj, list);
				});
			}
		},

		queryLocation(ip, callback){
			let req = Cc['@mozilla.org/xmlextras/xmlhttprequest;1']
						.createInstance(Ci.nsIXMLHttpRequest);
			req.open('GET', 'http://www.cz88.net/ip/index.aspx?ip=' + ip, true);
			req.send(null);
			req.onload = () => {
				if (req.status == 200) {
					try{
						callback({
							ip: ip,
							location: req.responseText.match(/"InputIPAddrMessage">([^<]+)/)[1].replace(/\s*CZ88.NET.*/, '')
						});
					}catch(ex){
						callback({
							ip: ip,
							location: 'ERR 查询过程中出错，请重试。'
						});
					}
				}
			}
		},

		updateState(cwId = this.getWinId()){
			let records = this.recordInner[cwId.currentInnerWindowID] || [],
				state = this.getStateBySpdyVer((records.filter(re => re.isMainHost)[0] || {}).spdy),
				subDocsState = (records.filter(re => !re.isMainHost) || [{}]).map(re => this.getStateBySpdyVer(re.spdy));
			if(state == 0 && subDocsState.some(st => st != 0))
				state = subDocsState.some(st => st == 7) ? 2 : 1;

			state = ['unknown', 'subSpdy', 'subHttp2', 'active', 'spdy2', 'spdy3', 'spdy31', 'http2'][state];
			if(this.icon.spdyState != state){
				this.icon.setAttribute('state', this.icon.spdyState = state);
			}
		},

		getStateBySpdyVer(version = '0'){
			let state = 3;
			if(version === '0'){
				state = 0;
			}else if(version === '2'){
				state = 4;
			}else if(version === '3'){
				state = 5;
			}else if(version === '3.1'){
				state = 6;
			}else if(/^h2/.test(version)){
				state = 7;
			}
			return state;
		},

		openPopup(event){
			if(event.button !== 0) return;
			let currentBrowser = this.currentBrowserPanel.get(this.panel);
			if(gBrowser.selectedBrowser != currentBrowser || this._panelNeedUpdate){
				let list = this.panel._list,
					cwId = this.getWinId(),
					ri = this.recordInner[cwId.currentInnerWindowID];
				if(!ri) return;

				if(this.panel.hasAttribute('overflowY'))
						this.panel.removeAttribute('overflowY');
				while(list && list.hasChildNodes())
					list.removeChild(list.lastChild);

				let noneMainHost = !ri.some(re => re.isMainHost);
				ri.forEach((record, index) => {
					//类似about:addons无主域名的情况
					if(index == 0 && noneMainHost)
						record.isMainHost = true;
					this.dnsDetect(record, record.isMainHost);
				});

				this.currentBrowserPanel.set(this.panel, gBrowser.selectedBrowser);
				//更新完毕
				this._panelNeedUpdate = false;
			}

			//弹出面板
			let position = (this.icon.boxObject.y < (window.outerHeight / 2)) ?
					'bottomcenter top' : 'topcenter bottom';
			position += (this.icon.boxObject.x < (window.innerWidth / 2)) ?
								'left' : 'right';
			this.panel.openPopup(this.icon, position, 0, 0, false, false);
		},

		updataLocation(event){
			let target = event.target;
			while(!target.hasAttribute('ucni-ip')){
				if(target == this.panel) return;
				target = target.parentNode;
			}
			let currentBrowser = this.currentBrowserPanel.get(this.panel),
				cwId = this.getWinId(),
				ri = this.recordInner[cwId.currentInnerWindowID];
			if(target.matches('li[ucni-ip]')){
				this.queryLocation(target.getAttribute('ucni-ip'), result => {
					//刷新所有同IP的location
					ri.forEach(record => {
						if(result.ip == record.ip){
							record.location = result.location;
							let text = this.setTooltip(target, record);
							if(event.altKey){
								Cc['@mozilla.org/widget/clipboardhelper;1']
									.createInstance(Ci.nsIClipboardHelper)
									.copyString(text);
							}
						}
					});
				});
			}
		},

		highlightHosts(event){
			let host = event.target.getAttribute('host');
			if(!host) return;
			Array.prototype.forEach.call(this.panel._list.querySelectorAll(`p[host="${host}"]`), p => {
				let hover = p.classList.contains('ucni-hover');
				if(event.type === 'mouseover' ? !hover : hover) p.classList.toggle('ucni-hover');
			});
		},

		setTooltip(target, obj){
			let text = [];
			if(obj.counter){
				text.push('连接数:   ' + obj.counter);
				obj.scheme && obj.scheme.length && text.push('Scheme:   ' + obj.scheme.join(', '));
				obj.spdy && obj.spdy.length && text.push('SPDY:    ' + obj.spdy.join(', '));
			}else{
				text.push('所在地:   ' + (obj.location || '双击获取， + Alt键同时复制。'));
				obj.server && text.push('服务器:   ' + obj.server);
				obj.ip && text.push('IP地址:   ' + obj.ip);
			}
			text = text.join('\n');
			target.setAttribute('tooltiptext', text);

			return text;
		},

		handleEvent(event){
			switch(event.type){
				case 'TabSelect':
					this.panel.hidePopup();
					this.updateState();
					break;
				case 'dblclick':
					this.updataLocation(event);
					break;
				case 'mouseover':
				case 'mouseout':
					this.highlightHosts(event);
					break;
				default:
					this.openPopup(event);
			}
		},

		getWinId(browser = gBrowser.selectedBrowser){
			if(!browser) return {};
			let windowUtils = browser.contentWindow
								.QueryInterface(Ci.nsIInterfaceRequestor)
								.getInterface(Ci.nsIDOMWindowUtils);
			return {
				currentInnerWindowID: windowUtils.currentInnerWindowID,
				outerWindowID: windowUtils.outerWindowID
			};
		},

		createElement(name, attr, parent){
			let e = document.createElementNS(!!~['panel', 'image'].indexOf(name) ? 
				'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul' :
				'http://www.w3.org/1999/xhtml', name);
			if(attr){
				for (let i in attr) {
					if(typeof attr[i] == 'function')
						e[i] = attr[i];
					else if(i == 'text')
						e.textContent = attr[i];
					else
						e.setAttribute(i, attr[i]);
				}
			}
			if(parent){
				if(Array.isArray(parent)){
					(parent.length == 2) ? 
						parent[0].insertBefore(e, parent[1]) :
						parent[0].insertBefore(e, parent[0].firstChild);
				}else{
					parent.appendChild(e);
				}
			}
			return e;
		},

		setStyle(){
			let sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
			sss.loadAndRegisterSheet(Services.io.newURI('data:text/css,' + encodeURIComponent(`
			@-moz-document url("chrome://browser/content/browser.xul"){
				#NetworkIndicator-icon{
					list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAQCAYAAADeWHeIAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAKnAAACpwB9NLfEgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAATqSURBVGiB7dnPS9t3HMfx5/uTb2Oy6VpnIEsrCoNcMkxt2UHmRWEXkdHL7kPoD2xHD/U6cshAKBSmS1ud3U4T+gfk4KGz9rBTJYVSPHkq3WoRXGnTjmnM973D91sTTb7ffJOcmu0NknyT7+P7+pjv5/PO96uiqvxf/92y/N7M5XIDxphJVY2LSFJVNyORyOz58+f3ghxcbhQGsMwkaByVJKKbvInM6ncpTy8iVVuvBsD1SBJ0E47NQnQv0MTNyAAwCcSBJLAJzJLVYOMvnBrA2JMocUSSqG4S+XhWUxsd430ngDHma+Ar96SUjDGBTz4AIceD4zEh35NfZwSHPWYWok14XI/rg598J14dL64PEfjDf1+88bKLi4u9wFjVS/nLly9vBM2WX570Ioe9Xj0d2MPbmnzoDu4zUuuzGnz8T070glZ5yevprY7znhOgVCp9AfS4m1tdXV0/BQ0H4PVexStbvG3Ss38oH6wmPUc8zfm9aJWXLbpOdKT3/AoQkXNVz5d3d3djt2/f7rdtOx4Oh9cuXrz4xn8EFY+RZU7sxuTHx/3Y5TjRyJpeSgX3sAz7MXjTD3Ycjq0BDTxHPDEy0o9zPbBGVv29yDlwrzNEl9ndjsnjRD9ljROx1zS13RG+7gTI5XJDxphPAVTVBqZUNQJ0i8hqsVhc8c2eKwwhjge1UabY1wjY3RhZ5fftFS6lfI7wagik4pEpcPJBVuHlCiS8eUaGANdjA1OA61kF/Mdf+GQI4+ar69WKYNONsMr2Zyv4DP998nUngDHmGyAEICIGiLkXgjvGmKWZmZl973iAigfHg4Cygwkt6a9jrXnYAbMEJ/cPZnf9qvK4HtezRFb9841UvLheAGSHkC7p2FrH+JoJcP36dau7u7ugqhvAUxEZVdVxABFZmJ6e3vbLlp8fWJjjBWzHg4yC41FZ0G/Tvh6eW0AB6nhkAT709xlxPa5nFHA9C2TVf/wPxOJ4vIDKBuhTREZR14tZ0PTzjvI1EyCdTpcnJibuvtu+efNmWpzlf//KlSurfuEAfD5W1mEOvPzwKO3e3N/Xa2ca+2KiTI/crbzwOg2Oh57GHspkteIzksZpH/fJamM/Rll5URn/o5NpRJ3xn/mj43zNXcDExMRBb52bm+sDRlS1GA6HbzUMB3S40ptl8WEfwghoEdMVyNMjVb39ZR+4HiuYz1b9hSgjfcCIfM8YcEvEObaI6LufmvFT8fLwoz7QEZQiXcHyg/h285v2Z1+McfZF9uj+IqKet4EAlmUlRSQuIvMXLlz4K8gHcKj+sZIgcWyZ16up5j0hxyPzEG3Bk8S56oesHnhVFVUVL3RQ1gdJhDgSmtfUs+bzPXy7+U37R6e+9NrfdwIYY8ZVdT1Q669/hHHQ9UCtv27JOOh6wNZfr8aBdXBm+8FRPVZPTRkzjrIeqPU24dvNb9Zz9s/fvPb3nAC5XC6mqoOhUOhOw6A6JTcKMYwOYpuWPLyKAYMgrfmMuJ474Kya6rcbrSIpnIqh9iDGau33b+DbyQ/SAaq93/5+HSBh23Z+enp60y/IsywSlO28XhtuzUMC7Dz0tOHJk9W6vvEqKiewJa/Dz1rM9/ft5AfrABV/dP/q537/DCpFo9F7/iE+ZVPi7zY8lCDcpuceVFb/0Uf/MiWivW3ke/t285v19brfu8d/ARECPGiONeyhAAAAAElFTkSuQmCC");
					-moz-image-region: rect(0px 16px 16px 0px);
				}
				#NetworkIndicator-icon[state=subSpdy] {
					-moz-image-region: rect(0px 32px 16px 16px);
				}
				#NetworkIndicator-icon[state=subHttp2] {
					-moz-image-region: rect(0px 48px 16px 32px);
				}
				#NetworkIndicator-icon[state=http2] {
					-moz-image-region: rect(0px 64px 16px 48px);
				}
				#NetworkIndicator-icon[state=active] {
					-moz-image-region: rect(0px 80px 16px 64px);
				}
				#NetworkIndicator-icon[state=spdy2] {
					-moz-image-region: rect(0px 96px 16px 80px);
				}
				#NetworkIndicator-icon[state=spdy3] {
					-moz-image-region: rect(0px 112px 16px 96px);
				}
				#NetworkIndicator-icon[state=spdy31] {
					-moz-image-region: rect(0px 128px 16px 112px);
				}

				#NetworkIndicator-panel :-moz-any(ul, li, span, p){
					margin:0;
					padding:0;
				}
				#NetworkIndicator-panel p{
					-moz-user-focus: normal;
					-moz-user-select: text;
				}
				#NetworkIndicator-panel .panel-arrowcontent{
					margin: 0;
					padding:5px !important;
				}
				#NetworkIndicator-panel #ucni-mplocation{
					flex-direction: column;
				}
				#NetworkIndicator-panel #ucni-mplocation>p{
					display: flex;
				}
				#NetworkIndicator-panel p.ucni-ip{
					font-weight: bold;
					font-size: 90%;
					line-height: 1.4rem;
					color: #2553B8;
				}
				#NetworkIndicator-panel #ucni-mplocation>p>span{
					color: #666;
					font-size:90%;
					font-weight:bold;
				}
				#NetworkIndicator-panel #ucni-mplocation>p>span:last-child{
					color:#0055CC;
					flex:1;
					text-align: center;
					margin-left: 1ch;
					max-width:23em;
				}

				#NetworkIndicator-panel li:nth-child(2n-1){
					background: #eee;
				}
				#NetworkIndicator-panel li:not(#ucni-mplocation):hover{
					background-color: #ccc;
				}
				#NetworkIndicator-panel p.ucni-host,
				#NetworkIndicator-panel li{
					display:flex;
				}
				#NetworkIndicator-panel li>span:first-child{
					min-width: 14ch;
				}
				#NetworkIndicator-panel li>span:last-child{
					flex: 1;
				}

				#NetworkIndicator-panel p[scheme="http"]{
					color:#629BED;
				}
				#NetworkIndicator-panel p[scheme="https"]{
					color:#479900;
					text-shadow:0 0 1px #BDD700;
				}
				#NetworkIndicator-panel p[scheme~="https"][scheme~="http"]{
					color:#7A62ED;
					font-weight: bold;
				}
				#NetworkIndicator-panel p[scheme="https"]{
					color:#00CC00;
				}
				#NetworkIndicator-panel p.ucni-host[spdy]::after,
				#NetworkIndicator-panel p.ucni-host[counter]::before{
					content: attr(spdy);
					color: #FFF;
					font-weight: bold;
					font-size:75%;
					display: block;
					top:1px;
					background: #6080DF;
					border-radius: 3px;
					float: right;
					padding: 0 2px;
					margin: 2px 0;
				}
				#NetworkIndicator-panel p.ucni-host[counter]::before{
					float: left;
					background: #FF9900;
					content: attr(counter);
				}
				#NetworkIndicator-panel p.ucni-hover:not(:hover){
					text-decoration:underline wavy orange;
				}
				#NetworkIndicator-panel p.ucni-host.ucni-hover{
					color: blue;
					text-shadow:0 0 1px rgba(0, 0, 255, .4);
				}

				#NetworkIndicator-panel[overflowY] .panel-arrowcontent{
					height: 400px!important;
					overflow-y: scroll;
				}
				#NetworkIndicator-panel[overflowY] ul{
					position: relative;
				}
				#NetworkIndicator-panel[overflowY] #ucni-mplocation{
					position: sticky;
					top:-5px;
					margin-top: -5px;
					border-top:5px #FFF solid;
				}
			}`), null, null), sss.AGENT_SHEET);
		}
	};

	networkIndicator.init();
}