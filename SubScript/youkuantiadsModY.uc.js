// ==UserScript==
// @name            youkuantiadsModY.uc.js
// @namespace       YoukuAntiADs@harv.c
// @description     視頻網站去黑屏（網絡本地結合版）。如果有本地播放器則使用本地的路徑，否則使用默認的網絡播放器
// @include         chrome://browser/content/browser.xul
// @author          ywzhaiqi && harv.c（原作者）
// @charset      UTF-8
// @homepage        http://haoutil.tk
// @version         1.6.0.26
// @update          2014.8.10
// @compatible      firefox 17+
// @startup         window.mYoukuAntiADs.init();
// @shutdown        window.mYoukuAntiADs.destroy();
// @homePageURL     https://github.com/ywzhaiqi/userChromeJS/tree/master/YoukuantiadsModY
// @downloadURL     https://github.com/ywzhaiqi/userChromeJS/raw/master/YoukuantiadsModY/youkuantiadsModY.uc.js
// updateURL       https://j.mozest.com/ucscript/script/92.meta.js
// downloadURL     https://j.mozest.com/zh-CN/ucscript/script/92.uc.js
// @note            2014-7-21 新增下載播放器、自動更新等功能。
// @note            2014-7-1 新增：提前判斷是否為 flash，加快速度。
// @note            2014-7-1 新增：本地播放器檢測功能。
// ==/UserScript==

(function() {
    /*
        腳本地址：http://bbs.kafan.cn/thread-1509944-1-1.html
        綠色播放器主頁：https://g.mozest.com/thread-43519-1-1
     */

    var enalbe_localPlayer = false; // 是否啟用本地播放器
    var SWF_DIR = 'swf';           // 本地播放器路徑，chrome 目錄下
    // var SWF_DIR = 'local\\swf';

    var XHR_TIMEOUT = 30 * 1000;

    var updateStates = {
        noUpdate: '無更新',
        urlNotExists: '鏈接錯誤或不存在',
        xhrError: '請求出錯',
        xhrTimeout: '請求超時'
    };

    var debug = false ? window.console && console.log.bind(console) : function() {};

    Cu.import("resource://gre/modules/FileUtils.jsm")
    Cu.import("resource://gre/modules/NetUtil.jsm");

    var Instances = {
        get xhr() Cc["@mozilla.org/xmlextras/xmlhttprequest;1"]
            .createInstance(Ci.nsIXMLHttpRequest),
        get wbp() Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
            .createInstance(Ci.nsIWebBrowserPersist),
        get ios() Cc["@mozilla.org/network/io-service;1"]
            .getService(Ci.nsIIOService)
    };

    var getURLSpecFromFile = Instances.ios
                    .getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler)
                    .getURLSpecFromFile;

    var ProfD = 'file:///' + FileUtils.getDir('UChrm', []).path + '/';

    // 全局替換規則，後面會檢驗是否存在，不存在會刪除
    var SpecialRules = [
        // 重定向這個網址 http://s3.music.126.net/s/2/pt_index.js?49d138c4e4dfbd143dc16794a95a4856
        {
            name: '網易雲音樂 320k 輔助',
            player: ProfD + 'pt_index.js',
            re: /^http:\/\/.*\.music\.126\.net\/.*pt_index\.js/i,
        }
    ];

    // YoukuAntiADs, request observer
    function YoukuAntiADs() {};
    YoukuAntiADs.prototype = {
    SITES: {
        'youku_loader': {
            'player': 'http://noads.aliapp.com/swf/loader.swf',
            're': /http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/loaders?\.swf/i
        },
        'youku_player': {
            'player': 'http://noads.aliapp.com/swf/player.swf',
            're': /http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/q?player[^\.]*\.swf/i
        },
        'ku6': {
            'player': 'http://noads.aliapp.com/swf/ku6.swf',
            're': /http:\/\/player\.ku6cdn\.com\/default\/common\/player\/\d{12}\/player\.swf/i
        },
        'ku6_out': {
            'player': 'http://noads.aliapp.com/swf/ku6_out.swf',
            're': /http:\/\/player\.ku6cdn\.com\/default\/out\/\d{12}\/player\.swf/i
        },
        'iqiyi': {
            'player0': 'http://noads.aliapp.com/swf/iqiyi_out.swf',
            'player1': 'http://noads.aliapp.com/swf/iqiyi5.swf',
            'player2': 'http://noads.aliapp.com/swf/iqiyi.swf',
            're': /https?:\/\/www\.iqiyi\.com\/(player\/\d+\/Player|common\/flashplayer\/\d+\/(Main|Coop|Share)?Player_?.*)\.swf/i
        },
        'tudou': {
            'player': 'http://no_ads.jd-app.com/tudou.swf',
            're': /http:\/\/js\.tudouui\.com\/.*portalplayer[^\.]*\.swf/i
        },
        'tudou_olc': {
            'player': 'http://noads.aliapp.com/swf/olc_8.swf',
            're': /http:\/\/js\.tudouui\.com\/.*olc[^\.]*\.swf/i
        },
        'tudou_sp': {
            'player': 'http://noads.aliapp.com/swf/sp.swf',
            're': /http:\/\/js\.tudouui\.com\/.*\/socialplayer[^\.]*\.swf/i
        },
		'letv': {
            'player': 'http://noads.aliapp.com/swf/letv.swf',
            're': /http:\/\/.*letv[\w]*\.com\/(hz|.*\/((?!(Live|seed|Disk))(S[\w]{2,3})?(?!Live)[\w]{4}|swf))Player*\.swf/i
        },
        'letv_live': {
            'player': 'http://no_ads.jd-app.com/letvlive.swf',
            're': /http:\/\/.*letv[\w]*\.com\/p\/\d+\/\d+\/\d+\/newplayer\/LivePlayer\.swf/i
        },
        'letvskin': {
            'player': 'http://player.letvcdn.com/p/201407/24/15/newplayer/1/SSLetvPlayer.swf',
            're': /http:\/\/.*letv[\w]*\.com\/p\/\d+\/\d+\/(?!15)\d*\/newplayer\/\d+\/S?SLetvPlayer\.swf/i
        },
        'pptv': {
            'player': 'http://noads.aliapp.com/swf/pptv.in.Ikan.swf',
            're': /http:\/\/player.pplive.cn\/ikan\/.*\/player4player2\.swf/i
        },
		'pplive': {
            'player': 'http://noads.aliapp.com/swf/pptv.in.Live.swf',
            're': /http:\/\/player.pplive.cn\/live\/.*\/player4live2\.swf/i
        },
		'sohu': {
           'player': 'http://noads.aliapp.com/swf/sohu.swf',
           're': /http:\/\/tv\.sohu\.com\/upload\/swf\/(?!(live|\d+)).*\d+\/(main|PlayerShell)\.swf/i
        },
        'sohu_liv': {
           'player': 'http://noads.aliapp.com/swf/sohu_live.swf',
           're': /http:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(:[0-9]{2,5})?(\/test)?\/(player|webplayer)\/(main|playershell)\.swf/i
        },
        'sohu_live': {
           'player': 'http://noads.aliapp.com/swf/sohu_live.swf',
           're': /http:\/\/tv\.sohu\.com\/upload\/swf\/(live\/|)\d+\/(main|PlayerShell)\.swf/i
        },
		'pps': {
            'player': 'http://no_ads.jd-app.com/pps.swf',
            're': /http:\/\/www\.iqiyi\.com\/player\/cupid\/.*\/pps[\w]+.swf/i
        },
		'ppsiqiyi': {
            'player': 'http://noads.aliapp.com/swf/iqiyi.swf',
            're': /http:\/\/www\.iqiyi\.com\/common\/flashplayer\/\d+\/PPSMainPlayer.*\.swf/i
		},	
		'ppslive': {
            'player': 'http://www.iqiyi.com/player/20140613210124/livePlayer.swf',
            're': /http:\/\/www\.iqiyi\.com\/common\/flashplayer\/\d+\/am.*\.swf/i
		},	
        'wanhenda': {
            'player': 'http://yuntv.letv.com/bcloud.swf',
            're': /http:\/\/assets\.dwstatic\.com\/.*\/vppp\.swf/i
        },
        '17173': {
            'player': 'http://noads.aliapp.com/swf/17173.in.Vod.swf',
            're': /http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/Player_file\.swf/i			                
		},
        '17173_out': {
            'player': 'http://noads.aliapp.com/swf/17173.out.Vod.swf',
  	    're': /http:\/\/f\.v\.17173cdn\.com(\/\d+)?\/flash\/Player_file_(custom)?out\.swf/i
     	},			
	    '17173_stream_customOut': {
            'player': 'http://noads.aliapp.com/swf/17173.out.Live.swf',
  	    're': /http:\/\/f\.v\.17173cdn\.com(\/\d+)?\/flash\/Player_stream_(custom)?Out\.swf/i
	    },			
        '17173_live': {
            'player': 'http://noads.aliapp.com/swf/17173.in.Live.swf',
            're': /http:\/\/f\.v\.17173cdn\.com\/\d+\/flash\/Player_stream(_firstpage)?\.swf/i
        },
		'baiduAD': {
            'player': 'http://noads.aliapp.com/swf/baidu.call.swf',
		    're': /http:\/\/list\.video\.baidu\.com\/swf\/advPlayer\.swf/i
		}
    },
        os: Cc['@mozilla.org/observer-service;1']
                .getService(Ci.nsIObserverService),
        init: function() {
            var site = this.SITES['iqiyi'];
            site['preHandle'] = function(aSubject) {
                var wnd = this.getWindowForRequest(aSubject);
                if(wnd) {
                    site['cond'] = [
                        !/(^((?!baidu|61|178).)*\.iqiyi\.com|pps\.tv)/i.test(wnd.self.location.host),
                        wnd.self.document.querySelector('span[data-flashplayerparam-flashurl]'),
                        true
                    ];
                    if(!site['cond']) return;

                    for(var i = 0; i < site['cond'].length; i++) {
                        if(site['cond'][i]) {
                            if(site['player'] != site['player' + i]) {
                                site['player'] = site['player' + i];
                                site['storageStream'] = site['storageStream' + i] ? site['storageStream' + i] : null;
                                site['count'] = site['count' + i] ? site['count' + i] : null;
                            }
                            break;
                        }
                    }
                }
            };
            site['callback'] = function() {
                if(!site['cond']) return;

                for(var i = 0; i < site['cond'].length; i++) {
                    if(site['player' + i] == site['player']) {
                        site['storageStream' + i] = site['storageStream'];
                        site['count' + i] = site['count'];
                        break;
                    }
                }
            };
        },
        // getPlayer, get modified player
        getPlayer: function(site, callback) {
            NetUtil.asyncFetch(site['player'], function(inputStream, status) {
                var binaryOutputStream = Cc['@mozilla.org/binaryoutputstream;1']
                                            .createInstance(Ci['nsIBinaryOutputStream']);
                var storageStream = Cc['@mozilla.org/storagestream;1']
                                        .createInstance(Ci['nsIStorageStream']);
                var count = inputStream.available();
                var data = NetUtil.readInputStreamToString(inputStream, count);

                storageStream.init(512, count, null);
                binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
                binaryOutputStream.writeBytes(data, count);

                site['storageStream'] = storageStream;
                site['count'] = count;

                if(typeof callback === 'function') {
                    callback();
                }
            });
        },
        getWindowForRequest: function(request){
            if(request instanceof Ci.nsIRequest){
                try{
                    if(request.notificationCallbacks){
                        return request.notificationCallbacks
                                    .getInterface(Ci.nsILoadContext)
                                    .associatedWindow;
                    }
                } catch(e) {}
                try{
                    if(request.loadGroup && request.loadGroup.notificationCallbacks){
                        return request.loadGroup.notificationCallbacks
                                    .getInterface(Ci.nsILoadContext)
                                    .associatedWindow;
                    }
                } catch(e) {}
            }
            return null;
        },
        observe: function(aSubject, aTopic, aData) {
            if(aTopic != 'http-on-examine-response') return;

            var http = aSubject.QueryInterface(Ci.nsIHttpChannel),
                url = http.URI.spec;

            // 先查找全局規則
            var site = null;
            SpecialRules.some(function(rule){
                if (rule.re.test(url)){
                    site = rule;
                    return true;
                }
            });

            // 如果不存在，搜索 flash 規則
            if (!site) {
                var aVisitor = new HttpHeaderVisitor();
                http.visitResponseHeaders(aVisitor);
                if (!aVisitor.isFlash())
                    return;

                var rule;
                for(var i in this.SITES) {
                    rule = this.SITES[i];
                    // 跳過禁用的
                    if (rule.enable == false) continue;

                    if(rule['re'].test(http.URI.spec)) {
                        site = rule;
                        break;
                    }
                }
            }

            if (site) {
                // console.log('1111', site.player)
                var fn = this,
                    args = Array.prototype.slice.call(arguments);

                if(typeof site['preHandle'] === 'function')
                    site['preHandle'].apply(fn, args);

                if(!site['storageStream'] || !site['count']) {
                    http.suspend();
                    this.getPlayer(site, function() {
                        http.resume();
                        if(typeof site['callback'] === 'function')
                            site['callback'].apply(fn, args);
                    });
                }

                var newListener = new TrackingListener();
                aSubject.QueryInterface(Ci.nsITraceableChannel);
                newListener.originalListener = aSubject.setNewListener(newListener);
                newListener.site = site;
            }
        },
        QueryInterface: function(aIID) {
            if(aIID.equals(Ci.nsISupports) || aIID.equals(Ci.nsIObserver))
                return this;

            return Cr.NS_ERROR_NO_INTERFACE;
        },
        register: function() {
            this.init();
            this.os.addObserver(this, 'http-on-examine-response', false);
        },
        unregister: function() {
            this.os.removeObserver(this, 'http-on-examine-response', false);
        }
    };

    // TrackingListener, redirect youku player to modified player
    function TrackingListener() {
        this.originalListener = null;
        this.site = null;
    }
    TrackingListener.prototype = {
        onStartRequest: function(request, context) {
            this.originalListener.onStartRequest(request, context);
        },
        onStopRequest: function(request, context) {
            this.originalListener.onStopRequest(request, context, Cr.NS_OK);
        },
        onDataAvailable: function(request, context) {
            this.originalListener.onDataAvailable(request, context, this.site['storageStream'].newInputStream(0), 0, this.site['count']);
        }
    };

    function HttpHeaderVisitor() {
        this._isFlash = false;
    }
    HttpHeaderVisitor.prototype = {
        visitHeader: function(aHeader, aValue) {
            if (aHeader.indexOf("Content-Type") !== -1) {
                if (aValue.indexOf("application/x-shockwave-flash") !== -1) {
                    this._isFlash = true;
                }
            }
        },
        isFlash: function() {
            return this._isFlash;
        }
    };

    if (window.mYoukuAntiADs) {
        window.mYoukuAntiADs.destroy();
        delete window.mYoukuAntiADs;
    }

    window.mYoukuAntiADs = {
        enable: true,
        registerDone: false,

        get prefs() {
            delete this.prefs;
            return this.prefs = Services.prefs.getBranch("userChromeJS.YoukuAntiADs.");
        },

        init: function() {
            this.initSpecialRules();

            // register observer
            // uc 腳本會因為打開新窗口而重複註冊
            var mediator = Cc["@mozilla.org/appshell/window-mediator;1"]
                           .getService(Ci.nsIWindowMediator);
            var enumerator = mediator.getEnumerator("navigator:browser");
            while (enumerator.hasMoreElements()) {
                var win = enumerator.getNext();
                if (win.mYoukuAntiADs && win.mYoukuAntiADs.registerDone) {
                    return;
                }
            }

            this.y = new YoukuAntiADs();
            this.y.register();
            this.registerDone = true;

            window.addEventListener('unload', this, false);


            if (!enalbe_localPlayer) return;

            this.swfDir = this.getSwfDir();

            this.addMenuItem();

            this.replaceLocalUrl();

            // this.initPrefs();
            // this.prefs.addObserver('', this, false);

            // if (!this.prefs.prefHasUserValue('enable')) {
            //     this.openPrefs();
            // } else {
            //     if (this.prefs.getBoolPref('localPlayer.enable')) {
            //         this.replaceLocalUrl();
            //     }
            // }
        },
        destroy: function() {
            this.y.unregister();

            window.removeEventListener('unload', this, false);

            // this.prefs.revemoObserver('', this, false);

            ['youkuAntiADsMod'].forEach(function(id){
                var node = document.getElementById(id);
                if (node) node.parentNode.removeChild(node);
            });
        },
        handleEvent: function(event) {
            switch (event.type) {
                case 'unload':
                    if(location == 'chrome://browser/content/browser.xul') {
                        this.y.unregister();
                    }
                    break;
            }
        },
        initSpecialRules: function() { // 移除不存在的
            SpecialRules.forEach(function(rule, i){
                var uri = Services.io.newURI(rule.player, null, null),
                    file = uri.QueryInterface(Ci.nsIFileURL).file;
                if (!file.exists()) {
                    SpecialRules.splice(i, 1);  // 從數組中移除
                }
            });
        },
        initPrefs: function() {  // 未完成
            var defPrefs = [
                ['enable', true],
                ['localPlayer.enable', true],
                // ['swfDir', '']
            ];

            defPrefs.forEach(function(item){
                if (!this.prefs.prefHasUserValue(item[0])) {
                    switch(typeof(item[1])) {
                        case 'boolean':
                            this.prefs.setBoolPref(item[0], item[1]);
                            break;
                        case 'string':
                            break;
                    }
                }
            });
        },
        observer: function(subject, topic, data) { // 未完成
            if (topic == 'nsPref:changed') {
                switch(data) {
                    case 'enable':
                        this.enable = !! this.prefs.getBoolPref('enable');
                        break;
                    case 'localPlayer.enable':
                        // if (enable) {
                        //     this.replaceLocalUrl();
                        // } else {

                        // }
                        break;
                    case 'swfDir':
                        this.swfDir = this.getSwfDir();
                        break;
                }
            }
        },
        getSwfDir: function (change) {
            if(!change){
                var aFolder;
                try {
                    aFolder = this.prefs.getComplexValue("swfDir", Ci.nsILocalFile);
                } catch (e) {}

                if (aFolder && aFolder.exists() && aFolder.isDirectory()) {}
                else {
                    aFolder = FileUtils.getDir('UChrm', SWF_DIR.replace(/\//g, '\\').split('\\'), true);
                }

                return aFolder;
            }

            var nsIFilePicker = Ci.nsIFilePicker;
            var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
            fp.init(window, '請選擇播放器存放的文件夾', nsIFilePicker.modeGetFolder);
            fp.displayDirectory = FileUtils.getDir('ProfD', ['']);

            if (fp.show() != nsIFilePicker.returnOK)
                return null;

            if (fp.file.exists() && fp.file.isDirectory()) {
                this.prefs.setComplexValue("swfDir", Ci.nsILocalFile, fp.file);
                return fp.file;
            }
        },
        addMenuItem: function() {
            var menuitem = $C('menuitem', {
                id: 'youkuAntiADsMod',
                class: 'menuitem-iconic menu-iconic',
                label: '更新視頻播放器',
                image: 'data:image/png;base64,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',
            });

            var self = this;
            menuitem.addEventListener('command', function(){
                self.updateSiteInfo()
            }, false);
            // menuitem.addEventListener('click', function(event){
            //     if (event.button == 2) {
            //         self.openPrefs();
            //     }
            // }, false);

            var ins = $('jscmdseparator') || $('devToolsSeparator');
            ins.parentNode.insertBefore(menuitem, ins);
        },
        replaceLocalUrl: function() {
            var existPlayerSize = this.setLocalSwf(this.y.SITES);
            if (existPlayerSize === 0) {
                this.updateSiteInfo();
            }
        },

        /**
         * 如果存在本地播放器，則替換地址為本地
         * @return 本地播放器的個數
         */
        setLocalSwf: function(SITES) {  // 這個修改的是原型
            let swfPaths = {};

            // 取得所有的 .swf 文件
            let files = this.swfDir.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
            while (files.hasMoreElements()) {
                let file = files.getNext().QueryInterface(Ci.nsIFile);
                if (file.leafName.endsWith('.swf')) {
                    swfPaths[file.leafName] = getURLSpecFromFile(file);
                }
            }

            var replaceSiteUrl = function(url, name, site) {
                let filename = getFileNameFromUrl(url);
                if (filename in swfPaths) {
                    if (name.startsWith('_')) {
                        site[name.replace(/^_/, '')] = swfPaths[filename];
                    } else {  // 先備份
                        site['_' + name] = site[name];
                        site[name] = swfPaths[filename];
                    }
                }
            };

            // 替換地址，因為 iqiyi 有 3個：player0、player1、player2
            for(let [siteName, site] in Iterator(SITES)) {
                for (let [name, url] in Iterator(site)) {
                    if (typeof url === 'string' && url.startsWith('http')) {
                        replaceSiteUrl(url, name, site);
                    }
                }
            }

            debug('成功替換播放器', SITES);

            return Object.keys(swfPaths).length;
        },
        updateSiteInfo: function() {
            this.updateMsgs = [];
            this.updateSize = 0;

            for(let [siteName, info] in Iterator(this.y.SITES)) {
                for (let [prop, value] in Iterator(info)) {
                    if (typeof value === 'string' && value.startsWith('http')) {
                        this.updateSize += 1;
                        // 備份
                        if (!prop.startsWith('_')) {
                            info['_' + prop] = info[prop];
                        }
                        // 去掉前面的 _
                        this._updateOneInfo(info, prop.replace(/^_/, ''), value);
                    }
                }
            }
        },
        _updateOneInfo: function(info, propName, url) {
            var self = this;

            var downloader = new Downloader(url, this.swfDir);
            downloader.run(function (aFile, state) {
                var msg;
                if (aFile) {
                    info[propName] = getURLSpecFromFile(aFile);
                    msg = '成功下載並替換 ' + aFile.leafName + ' 為 ' + info[propName];
                } else {
                    msg = url + ' <b>' + (updateStates[state] || state) + '</b>';
                }

                self.updateMsgs.push(msg);

                if (self.updateMsgs.length == self.updateSize) {
                    self.showUpdateMsg(self.updateMsgs.join('<br>'));
                    debug('更新並替換播放器', self.y.SITES);
                }
            });
        },
        showUpdateMsg: function(html) {
            openLinkIn('data:text/html;charset=utf-8,' + encodeURIComponent(html), 'tabshifted', {});
        },
        openPrefs: function() {
            let xul = '<?xml version="1.0"?>\
                <?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
                \
                <prefwindow\
                    xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"\
                    id="YoukuAntiADs"\
                    windowtype="YoukuAntiADs:Preferences">\
                    <prefpane id="main" flex="1">\
                        <preferences>\
                            <preference id="enable" type="bool" name="userChromeJS.YoukuAntiADs.enable"/>\
                            <preference id="localPlayereEnable" type="bool" name="userChromeJS.YoukuAntiADs.localPlayer.enable"/>\
                            <preference id="swfDir" type="string" name="userChromeJS.YoukuAntiADs.swfDir"/>\
                        </preferences>\
                        <checkbox label="是否啟用" preferences="enable" />\
                        <checkbox label="是否啟用本地播放器" preferences="localPlayereEnable" />\
                         <groupbox>\
                            <caption label="本地播放器的路徑"/>\
                                 <hbox>\
                                   <textbox id="textbox_path" flex="1" preference="swfDir"/>\
                                   <button id="choosePath" label="瀏覽" oncommand="YoukuAntiADsConfig.pickPath()" width="90"/>\
                                 </hbox>\
                        </groupbox>\
                    </prefpane>\
                    <script>\
                        var YoukuAntiADsConfig = {\
                            mainWin: Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser"),\
                            pickPath: function() {\
                                var aFolder = this.mainWin.getSwfDir(true);\
                                if (aFolder) {\
                                    document.getElementById("textbox_path").value = aFolder.path;\
                                }\
                            }\
                        };\
                    </script>\
                </prefwindow>\
                ';

            window.openDialog(
                "data:application/vnd.mozilla.xul+xml;charset=UTF-8," + encodeURIComponent(xul), '',
                'chrome,titlebar,toolbar,centerscreen,dialog=no');
        }
    };

    function Downloader(url, swfDir) {
        this.init.apply(this, arguments);
    }
    Downloader.prototype = {
        get player() {
            var file = this.swfDir.clone();
            file.append(this.filename);
            delete this.player;
            return this.player = file;
        },

        init: function(url, swfDir) {
            this.url = url;
            this.uri = NetUtil.newURI(url);
            this.swfDir = swfDir;

            this.filename = getFileNameFromUrl(url);
        },
        run: function(callback) {
            if (this.player.exists()) {
                this.checkUpdate(this.player, callback);
            } else {
                this.startDownload(callback);
            }
        },
        checkUpdate: function(aFile, callback) {
            var self = this;

            var xhr = Instances.xhr;
            xhr.open('HEAD', this.url, true);
            xhr.onload = function() {
                if (xhr.status != 200) {
                    callback(null, updateStates.urlNotExists)
                    return;
                }
                var modifiedTime = xhr.getResponseHeader("Last-Modified");
                // 可能存在 null 的情況
                modifiedTime = new Date(modifiedTime).getTime();
                if (modifiedTime > aFile.lastModifiedTime) {
                    self.startDownload(callback)
                } else {
                    callback(null, updateStates.noUpdate)
                }
            };
            xhr.onerror = function() {
                callback(null, updateStates.xhrError)
            };
            xhr.timeout = XHR_TIMEOUT;
            xhr.ontimeout = function(event) {
                callback(null, updateStates.xhrTimeout)
            };
            xhr.send(null);
        },
        startDownload: function(callback) {
            var targetFile = this.player;

            var persist = Instances.wbp;
            persist.persistFlags = persist.PERSIST_FLAGS_FROM_CACHE
                                 | persist.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
            persist.progressListener = {
                onProgressChange: function(progress, request, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {},
                onStateChange: function(progress, request, flags, status) {
                    if ((flags & Ci.nsIWebProgressListener.STATE_STOP) && status == 0) {
                        if (typeof callback === 'function') {
                            callback(targetFile);
                        }
                    }
                }
            };

            persist.saveURI(this.uri, null, null, null, "", targetFile, null);
        },
    };

    function $(id) document.getElementById(id)
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }

    function getFileNameFromUrl(url) {
        var m = url.match(/[^\/]+$/);
        if (m) {
            return m[0];
        }
    }

})();


window.mYoukuAntiADs.init();