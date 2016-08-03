/*
keys[1] = function(ev, arg) {getBrowser().selectedTab = getBrowser().mTabs[0]}; //选中第1个标签，注意ctrl+1是原来默认的
keys[2] = "gBrowser.selectTabAtIndex(1, event);"; //选中第2个标签
keys[3] = "gBrowser.selectTabAtIndex(2, event);"; //选中第3个标签
keys[4] = "gBrowser.selectTabAtIndex(3, event);"; //选中第4个标签
keys[5] = "gBrowser.selectTabAtIndex(4, event);"; //选中第5个标签
keys[6] = "gBrowser.selectTabAtIndex(5, event);"; //选中第6个标签
keys[7] = "gBrowser.selectTabAtIndex(6, event);"; //选中第7个标签
keys[8] = "gBrowser.selectTabAtIndex(7, event);"; //选中第8个标签
keys[9] = "gBrowser.selectTabAtIndex(8, event);"; //选中第9个标签
*/

keys['1'] = "gBrowser.mTabContainer.advanceSelectedTab(-1,true);";//上一标签
keys['2'] = "gBrowser.mTabContainer.advanceSelectedTab(1,true);";//下一标签
keys['3'] = "gBrowser.removeCurrentTab();"; //关闭当前页
keys['`'] = "BrowserHome();"; //关闭当前页并回到主页
keys['4'] = function(ev) {ReaderParent.toggleReaderMode(event);}; //启用阅读模式


keys['a'] = "goDoCommand('cmd_scrollLeft');"; //向左滚动
keys['b'] = "var bar = document.getElementById('PersonalToolbar'); setToolbarVisibility(bar, bar.collapsed); ";//Baidu站内搜索
//keys['c'] = "goDoCommand('cmd_scrollLeft');"; //向左滚动
keys['d'] = "goDoCommand('cmd_scrollRight');"; //向右滚动
keys['e'] = "__readable_by_evernote.button__call(event);";//Evernote clear
keys['f'] = "gFindBar.onFindCommand();"; //查找
keys['g'] = "var s = prompt('谷歌搜索——输入关键词', '');if (s.length > 0) gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(s));";//Google站内搜索
keys['h'] = "SidebarUI.show('viewHistorySidebar');";//我的足迹（历史）
keys['i'] = function() {
	try {
		var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
		file.append("Internet Explorer");
		file.append("iexplore.exe");
		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
		process.init(file);
		process.run(false, [content.location.href], 1);
	} catch (ex) {
		alert("\u6253\u5f00IE\u5931\u8d25!")
	}
}; //用IE打开当前页
keys['j'] = "BrowserDownloadsUI();"; //我的足迹（下载）
//keys['k'] = "BrowserSearch.webSearch();"; //聚焦到搜索栏 
//keys['l'] = "openLocation();"; //聚焦到地址栏
keys['m'] = function() {var toolbar = document.getElementById("PersonalToolbar");toolbar.collapsed = !toolbar.collapsed;document.persist(toolbar.id, "collapsed");};//开关书签工具栏
keys['n'] = function(ev) {OpenBrowserWindow();}; //打开新窗口
keys['o'] = "openPreferences();"; //Firefox选项
keys['p'] = "OpenBrowserWindow({private: true});"; //打开隐私窗口
keys['q'] = "PageTranslationIciba()"; //开启词霸有声划词翻译
//keys['r'] =  "OpenBrowserWindow({private: true});"; //打开隐私窗口
keys['s'] = "goDoCommand('cmd_scrollLineDown');"; //向下滚动
keys['t'] = function(){var tab = gBrowser.tabContainer.selectedItem;if (tab.pinned) gBrowser.unpinTab(tab);else gBrowser.pinTab(tab);};  //Pin/UnPin当前标签
keys['u'] = function(ev) {    BrowserPageInfo();}; //查看页面信息
//keys['v'] = "onTitlebarMaxClick();";//窗口最大化
keys['w'] = "goDoCommand('cmd_scrollLineUp');"; //向上滚动
//keys['y'] =   "goDoCommand('cmd_scrollLineUp');"; //向上滚动
keys['x'] = "getWebNavigation().canGoForward && getWebNavigation().goForward();";//前进
keys['z'] = "getWebNavigation().canGoBack && getWebNavigation().goBack();";//后退
keys['['] = function(ev) {goDoCommand("cmd_scrollTop");}; //滚动到顶部
keys[']'] = function(ev) {goDoCommand("cmd_scrollBottom");}; //滚动到底部
keys['-'] = function(ev) {FullZoom.reduce();}; //页面缩小
keys['='] = function(ev) {FullZoom.enlarge();}; //页面放大
keys['0'] = function(ev) {FullZoom.reset();}; //页面重置



keys['F1'] = "BrowserGoHome(event);";
keys['F2'] = function() {var oldHistory = gBrowser.webNavigation.sessionHistory;
gBrowser.selectedTab = gBrowser.addTab("about:blank");
var newHistory = gBrowser.webNavigation.sessionHistory;
newHistory.QueryInterface(Components.interfaces.nsISHistoryInternal);
for (var i = 0; i < oldHistory.count; i++) { newHistory.addEntry(oldHistory.getEntryAtIndex(i, false), true); }
if(oldHistory.count) gBrowser.webNavigation.gotoIndex(oldHistory.index);}; //复制当前标签页
keys['F3'] ="gBrowser.selectedTab.toggleMuteAudio()"; // 关闭当前标签声音
keys['F4'] = function(){
        var id = [30]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    };//夜晚模式
keys['F6'] =function() { gBrowser.loadURI("javascript:(function(bookmarklets)%7Bfor(var%20i=0;i%3Cbookmarklets.length;i++)%7Bvar%20code=bookmarklets%5Bi%5D.url;if(code.indexOf(%22javascript:%22)!=-1)%7Bcode=code.replace(%22javascript:%22,%22%22);eval(code)%7Delse%7Bcode=code.replace(/%5Es+%7Cs+$/g,%22%22);if(code.length%3E0)%7Bwindow.open(code)%7D%7D%7D%7D)(%5B%7Btitle:%22%E7%A0%B4%E9%99%A4%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E9%99%90%E5%88%B6%22,url:%22javascript:function%20applyWin(a)%7Bif(typeof%20a.__nnANTImm__===%5Cx22undefined%5Cx22)%7Ba.__nnANTImm__=%7B%7D;a.__nnANTImm__.evts=%5B%5Cx22mousedown%5Cx22,%5Cx22mousemove%5Cx22,%5Cx22copy%5Cx22,%5Cx22contextmenu%5Cx22%5D;a.__nnANTImm__.initANTI=function()%7Ba.__nnantiflag__=true;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.addEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__)%7D;a.__nnANTImm__.clearANTI=function()%7Bdelete%20a.__nnantiflag__;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.removeEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__);delete%20a.__nnANTImm__%7D;a.__nnANTImm__.fnANTI=function(b)%7Bb.stopPropagation();return%20true%7D;a.addEventListener(%5Cx22unload%5Cx22,function(b)%7Ba.removeEventListener(%5Cx22unload%5Cx22,arguments.callee,false);if(a.__nnantiflag__===true)%7Ba.__nnANTImm__.clearANTI()%7D%7D,false)%7Da.__nnantiflag__===true?a.__nnANTImm__.clearANTI():a.__nnANTImm__.initANTI()%7DapplyWin(top);var%20fs=top.document.querySelectorAll(%5Cx22frame,%20iframe%5Cx22);for(var%20i=0,len=fs.length;i%3Clen;i++)%7Bvar%20win=fs%5Bi%5D.contentWindow;try%7Bwin.document%7Dcatch(ex)%7Bcontinue%7DapplyWin(fs%5Bi%5D.contentWindow)%7D;void%200;%22%7D,%7Btitle:%22%E7%A0%B4%E9%99%A4%E9%80%89%E6%8B%A9%E5%A4%8D%E5%88%B6%E9%99%90%E5%88%B6%22,url:%22javascript:(function()%7Bvar%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20()%7Breturn%20true;%7D;with(document.wrappedJSObject%7C%7Cdocument)%7Bonmouseup=null;onmousedown=null;oncontextmenu=null;%7Dvar%20arAllElements=document.getElementsByTagName(%5Cx27*%5Cx27);for(var%20i=arAllElements.length-1;i%3E=0;i--)%7Bvar%20elmOne=arAllElements;with(elmOne.wrappedJSObject%7C%7CelmOne)%7Bonmouseup=null;onmousedown=null;%7D%7Dvar%20head=document.getElementsByTagName(%5Cx27head%5Cx27)%5B0%5D;if(head)%7Bvar%20style=document.createElement(%5Cx27style%5Cx27);style.type=%5Cx27text/css%5Cx27;style.innerHTML=%5Cx22html,*%7B-moz-user-select:auto!important;%7D%5Cx22;head.appendChild(style);%7Dvoid(0);%7D)();%22%7D%5D)");}; //解除复制和右键菜单限制
keys['F8'] =function() { gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())");}; //启用翻译功能
keys['F9'] = function(){var newtabs=["http://weibo.com/","https://feedly.com","https://www.twitter.com/","http://www.runningcheese.com/"];var i=0;while(i<=newtabs.length-1){gBrowser.selectedTab=gBrowser.addTab(newtabs[i]);i=i+1;}};//一键打开标签组
//keys['F10'] = function () {loadURI(PlacesUtils.getURLAndPostDataForKeyword("aa")[0]);}; //以书签的关键词执行书签（主要用于Bookmarkets）


//========组合键类========
keys["Shift+W"] = function(ev) {goDoCommand("cmd_scrollTop");}; //滚动到顶部
keys["Shift+S"] = function(ev) {goDoCommand("cmd_scrollBottom");}; //滚动到底部
keys["Shift+R"] = "undoCloseTab();";//恢复关闭的标签
keys["Shift+Q"]  = "onTitlebarMaxClick();";//窗口最大化
keys["Shift+F"]  = function() {var path ="..\\..\\..\\Software\\Everything.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();  return file;}; //搜索本机文件
keys["Shift+A"] = function(){
        var id = [30]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    };//降低屏幕亮度
keys["Shift+E"]  = "__readable_by_evernote.button__call(event);";//Evernote clear
keys["Shift+D"] = function(){
        var id = [35]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    };//夜晚模式

//keys["Shift+D"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //重启Firefox
keys['Shift+Ctrl+C'] = function() {	Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();}; //打开Chrome目录
keys['Shift+Ctrl+X'] = function() {Components.classes["@mozilla.org/file/directory_service;1"].	getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();}; //打开当前Firefox实例配置文件夹
keys['Shift+Ctrl+Z'] = "gBrowser.selectedTab = gBrowser.addTab('about:config');";//参数设置



keys["Alt+F1"] = function(){var tab;var tabs = gBrowser.mCurrentTab.boxObject;do {tab = tabs.previousSibling;if(tab.pinned) break;gBrowser.removeTab(tab);}while(tab);};  //关闭左侧所有标签页
keys["Alt+F2"] = function(){var tab;var tabs = gBrowser.mCurrentTab.boxObject;do {tab = tabs.nextSibling;while (tab.pinned) tab = tab.nextSibling;gBrowser.removeTab(tab);}while(tab);};  //关闭右侧所有标签页
keys["Alt+F3"] = function(){var tab = gBrowser.mCurrentTab;
if (tab.pinned) {
var tabs = gBrowser.mCurrentTab.boxObject;
do {
tab = tabs.nextSibling;
while (tab.pinned) tab = tab.nextSibling;
gBrowser.removeTab(tab);
}while(tab);
} else
gBrowser.removeAllTabsBut(tab);};  //关闭其他标签页

keys['Alt+A'] = "RIL.hotKeyToggle();"; //Pocket标记/去除标记
keys['Alt+Z'] = "SidebarUI.toggle('viewHistorySidebar');";//侧边栏）


//截图:
keys['Ctrl+Alt+A'] =  function(){  var path ="..\\..\\..\\Software\\snapshot.exe";
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();
  return file;};

keys['Shift+Ctrl+Alt+A'] =  function(){document.getElementById("titlebar-min").click();
  var path ="..\\..\\..\\Software\\snapshot.exe";
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();};

//音乐播放器快捷键：
keys["Ctrl+VK_DOWN"] = "SimpleMusicPlayer.doAction('playPause');";//暂停or开始快捷键
keys["Alt+VK_UP"] = "SimpleMusicPlayer.doAction('play');";//开始快捷键
keys["Alt+VK_DOWN"] = "SimpleMusicPlayer.doAction('pause');";//暂停快捷键
keys["Alt+VK_LEFT"] = "SimpleMusicPlayer.doAction('prev');";//上一曲
keys["Alt+VK_RIGHT"] = "SimpleMusicPlayer.doAction('next');";//下一曲
keys["Alt+VK_INSERT"] = "SimpleMusicPlayer.doAction('love');";//喜欢
keys["Alt+VK_DELETE"] = "SimpleMusicPlayer.doAction('hate');";//讨厌


/*
keys['R+Y'] =function() {
                    try {
                        var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
                        file.append("Internet Explorer");
                        file.append("iexplore.exe");
                        var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
                        process.init(file);
                        process.run(false, [content.location.href], 1);
                    } catch (ex) {
                        alert("\u6253\u5f00IE\u5931\u8d25!")
                    }
                };//像Opera那样，可以按下g，i两个键来激活指令，比如按下g，i 键之后就用ie打开。


keys[2] = "gBrowser.selectedTab = gBrowser.addTab('http://translate.google.com/#auto/zh-CN/');";

格式gBrowser.loadURL("javascript:")  注意外层用双引号, 内层js里面用单引号
*/