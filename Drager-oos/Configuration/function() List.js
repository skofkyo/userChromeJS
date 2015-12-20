Firefox中的一动作对应的代码 用于自定义鼠标手势和快捷键

1、关闭左边标签页：

代码：

var tab = gBrowser.mCurrentTab.boxObject.previousSibling;
if(tab) gBrowser.removeTab(tab);

2、关闭右边标签页：

代码

var tab = gBrowser.mCurrentTab.boxObject.nextSibling;
if(tab) gBrowser.removeTab(tab);

3、复制当前标签页：

代码

var oldHistory = gBrowser.webNavigation.sessionHistory;
gBrowser.selectedTab = gBrowser.addTab("about:blank");
var newHistory = gBrowser.webNavigation.sessionHistory;
newHistory.QueryInterface(Components.interfaces.nsISHistoryInternal);

for (var i = 0; i < oldHistory.count; i++) { newHistory.addEntry(oldHistory.getEntryAtIndex(i, false), true); }

if(oldHistory.count) gBrowser.webNavigation.gotoIndex(oldHistory.index);

4、下一个标签页（与ctrl+pagedown同）：

代码

gBrowser.mTabContainer.advanceSelectedTab(1,true);

5、上一个标签页（与ctrl+pageup同):

代码

gBrowser.mTabContainer.advanceSelectedTab(-1,true);

6、重新载入其它标签页：

代码

var browsers = gBrowser.browsers;
var i = 0;
var l = browsers.length;
var x = gBrowser.mCurrentTab._tPos;

for(; i < l; i++)
if(i != x) try { browsers[i].reload(); } catch(err){};

7、重新载入所有标签页：

代码

gBrowser.reloadAllTabs();

8、重新载入左边所有标签页：

代码

var browsers = gBrowser.browsers;
var i = gBrowser.mCurrentTab._tPos - 1;
var l = -1;

for(; i > l; i--)
try { browsers[i].reload(); } catch(err){};

9、重新载入右边所有标签页：

代码

var browsers = gBrowser.browsers;
var i = gBrowser.mCurrentTab._tPos + 1;
var l = browsers.length;

for(; i < l; i++)
try { browsers[i].reload(); } catch(err){};

10、定位到最左边标签页：

代码

gBrowser.selectedTab = gBrowser.mTabContainer.firstChild;

11、定位到最右边标签页：

代码

gBrowser.selectedTab =
gBrowser.tabContainer.childNodes[gBrowser.tabContainer.childNodes.length-1];

12、关闭其他标签页：

代码

gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);

13、关闭所有标签页：

代码

gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
gBrowser.removeCurrentTab();

14、定位到左邻标签页（不能循环）：

代码

gBrowser.mTabContainer.advanceSelectedTab(-1);

15、定位到右邻标签页（不能循环）：

代码

gBrowser.mTabContainer.advanceSelectedTab(1);

16、在当前标签页右边新建标签页：

代码

var x = gBrowser.mCurrentTab._tPos + 1;
gBrowser.moveTabTo(gBrowser.selectedTab = gBrowser.addTab("about:blank"), x);

17、高亮关键词后，新建标签页后台搜索（以当前搜索栏搜索引擎，下同）：

代码

BrowserSearch.loadSearch(getBrowserSelection(), true);

18、新建标签页前台搜索：

代码

gBrowser.mPrefs.setBoolPref("browser.tabs.loadInBackground",false);
BrowserSearch.loadSearch(getBrowserSelection(), true);
gBrowser.mPrefs.setBoolPref("browser.tabs.loadInBackground",true);

19、在当前标签页搜索：

代码

BrowserSearch.loadSearch(getBrowserSelection(), false);

20、在新窗口打开about:config：

代码

toOpenWindowByType('pref:pref', 'About:config');

21、书签管理器对话框：

代码

toOpenWindowByType('bookmarks:manager',
'chrome://browser/content/bookmarks/bookmarksManager.xul');

22、工具—选项对话框：

代码

openPreferences();

23、附加软件对话框：

代码

toOpenWindowByType('Add-ons:manager',
'chrome://mozapps/content/extensions/extensions.xul');

24、scrapbook扩展“获取前进行编辑”命令：

代码

if(sbPageEditor.TOOLBAR.hidden ||
document.getElementById("ScrapBookToolbox").hidden) {
sbPageEditor.init();
} else {
sbPageEditor.exit(true);
}


25、显示/隐藏书签工具栏：

代码

const bmToolbar = document.getElementById("PersonalToolbar");
bmToolbar.collapsed = !bmToolbar.collapsed;

26、显示/隐藏菜单栏：

代码

var mb = document.getElementById("toolbar-menubar");
mb.collapsed = !mb.collapsed;

27、页面向右滚动：

代码

goDoCommand('cmd_scrollRight');

28、页面向左滚动：

代码

goDoCommand('cmd_scrollLeft');

29、页面向上滚动：

代码

goDoCommand('cmd_scrollLineUp');

30、页面向下滚动：

代码

goDoCommand('cmd_scrollLinedown');

31、向下翻页（与space同）：

代码

goDoCommand('cmd_scrollPageDown');

32、向上翻页（与shift+space同）：

代码

goDoCommand('cmd_scrollPageup');

33、回到页首（与home同）：

代码

goDoCommand('cmd_scrollTop');

34、回到页尾（与end同）：

代码

goDoCommand('cmd_scrollBottom');

35、关闭所有正在运行的Firefox程序：

代码

goQuitApplication();

36、拷贝当前标签页标题：

代码

Components.classes["@mozilla.org/widget/clipboardhelper;1"]
.getService(Components.interfaces.nsIClipboardHelper)
.copyString(content.document.title);

37、在当前标签打开网页：

代码

gBrowser.loadURI('http://www.google.com/');

38、在新标签打开网页：（原来还可以用来打开about:config。Great!）

代码

var myUrl = "http://www.baidu.com";
var ff= document.getElementById("content");
var tab = ff.addTab(myUrl);
ff.selectedTab = tab;

39、以定义的书签关键词在当前标签打开书签（对运行bookmarklets非常有用）：

代码

if(window.loadURI) loadURI(getShortcutOrURI('填入你定义的关键词',{}));

40、类似paste and go，节省一次enter键：

代码

var url = readFromClipboard(); if (url) content.location = url;

41、跟踪下一链接（论坛的Sprill朋友提供，谢谢。下同。）：

代码

var document = window._content.document;
var links = document.links;
for(i = 0; i < links.length; i++) {
if ((links[i].text == '下一頁') ||(links[i].text == '下一页') ||(links[i].text == '下一页>')||(links[i].text == '下一页 »') ||(links[i].text == '下一页>>') || (links[i].text == '[下一页]') || (links[i].text == '【下一页】') ||(links[i].text == 'Next') || (links[i].text == 'next') || (links[i].text == '››') || (links[i].text == '>')) document.location = links[i].href;
}


42、跟踪上一链接：

代码

var document = window._content.document;
var links = document.links;
for(i = 0; i < links.length; i++) {
if ((links[i].text == '上一頁') ||(links[i].text == '上一页') ||(links[i].text == '<上一页')||(links[i].text == '« 上一页') ||(links[i].text == '<<上一页') || (links[i].text == '[上一页]') || (links[i].text == '【上一页】') ||(links[i].text == 'Previous') || (links[i].text == 'Prev') ||(links[i].text == 'previous') || (links[i].text == 'prev') || (links[i].text == '‹‹') || (links[i].text == '<')) document.location = links[i].href;
}

PS:补充

关闭当前标签并定位到左边的标签：

代码

var tab = gBrowser.mCurrentTab; if(tab.previousSibling)
gBrowser.mTabContainer.selectedIndex--;
gBrowser.removeTab(tab);

关闭当前标签并定位到右边的标签：

代码

var tab = gBrowser.mCurrentTab; if(tab.nextSibling)
gBrowser.mTabContainer.selectedIndex++;
gBrowser.removeTab(tab);

还有一个，类似paste and go，在新标签页后台打开剪贴板中的url地址。很是喜欢，原代码已经失效了，试着修改了一下，可以工作了。

代码

var url = readFromClipboard(); if (url) content.location= gBrowser.addTab(url);

高亮关键词使用Google后台搜索

代码

var ss = Cc["@mozilla.org/browser/search-service;1"].getService(Ci.nsIBrowserSearchService);
var submission = ss.defaultEngine.getSubmission(getBrowserSelection(), null);
gBrowser.loadOneTab(submission.uri.spec, null, null, submission.postData, true, false);

高亮关键词Google前台搜索：

代码

var ss = Cc["@mozilla.org/browser/search-service;1"].getService(Ci.nsIBrowserSearchService);
var submission = ss.defaultEngine.getSubmission(getBrowserSelection(), null);
gBrowser.loadOneTab(submission.uri.spec, null, null, submission.postData, false, false);

新标签页前台打开：

代码

var paste = readFromClipboard();
if(!paste) return;
gBrowser.selectedTab = gBrowser.addTab(paste);

撤销关闭标签页：
CODE
gBrowser.undoRemoveTab();

快退

代码

if (gBrowser.sessionHistory.index > 0)
gBrowser.gotoIndex(0);


快进

代码

var nav = gBrowser.webNavigation;
var hist = nav.sessionHistory;
nav.gotoIndex(hist.count - 1);

跟踪下一链接的脚本
nextpage:

代码

var document = window._content.document;
var links = document.links;
for(i = 0; i < links.length; i++) {
if(/^([^\d^\w.]*(下一页|下一頁|next)[^\d^\w]*|\s*(»|>+|›+)\s*)$/i.test(links[i].text))
document.location = links[i].href;
}


prevpage:

代码

var document = window._content.document;
var links = document.links;
for(i = 0; i < links.length; i++) {
if(/^([^\d^\w.]*(上一頁|上一页|previous|prev)[^\d^\w]*|\s*(«|<+|‹+)\s*)$/i.test(links[i].text))
document.location = links[i].href;
}

复制当前页URL：
代码
var gClipboardHelper=Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
gClipboardHelper.copyString(window._content.location.href);

开/关查找栏

代码

gFindBar.hidden ? gFindBar.onFindCommand() : gFindBar.close();

通过热键能重启ff3, 并且恢复重启前tabs

代码

const nsIAppStartup = Components.interfaces.nsIAppStartup;

// Notify all windows that an application quit has been requested.
var os = Components.classes["@mozilla.org/observer-service;1"]
.getService(Components.interfaces.nsIObserverService);
var cancelQuit = Components.classes["@mozilla.org/supports-PRBool;1"]
.createInstance(Components.interfaces.nsISupportsPRBool);
os.notifyObservers(cancelQuit, "quit-application-requested", null);

// Something aborted the quit process.
if (cancelQuit.data)
return;

// Notify all windows that an application quit has been granted.
os.notifyObservers(null, "quit-application-granted", null);

// Enumerate all windows and call shutdown handlers
var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
.getService(Components.interfaces.nsIWindowMediator);
var windows = wm.getEnumerator(null);
while (windows.hasMoreElements()) {
var win = windows.getNext();
if (("tryToClose" in win) && !win.tryToClose())
return;
}
Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(nsIAppStartup)
.quit(nsIAppStartup.eRestart | nsIAppStartup.eAttemptQuit);

打开配置文件夹

代码

Components.classes["@mozilla.org/file/directory_service;1"].
getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();
复制标签页的URL地址

代码

var gClipboardHelper=Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
gClipboardHelper.copyString(window._content.location.href);

复制标签页的标题

代码

Components.classes["@mozilla.org/widget/clipboardhelper;1"]
.getService(Components.interfaces.nsIClipboardHelper)
.copyString(content.document.title);

同时复制标签页标题和url（格式“标题” - "URL"）

代码

Components.classes["@mozilla.org/widget/clipboardhelper;1"]
.getService(Components.interfaces.nsIClipboardHelper)
.copyString(content.document.title + " - " + content.location);

开/关菜单栏

代码

var toolbar = document.getElementById("toolbar-menubar");
toolbar.collapsed = !toolbar.collapsed;
document.persist(toolbar.id, "collapsed");

开/关导航栏

代码

var toolbar = document.getElementById("nav-bar");
toolbar.collapsed = !toolbar.collapsed;
document.persist(toolbar.id, "collapsed");

开/关书签工具栏

代码

var toolbar = document.getElementById("PersonalToolbar");
toolbar.collapsed = !toolbar.collapsed;
document.persist(toolbar.id, "collapsed");

或者

goToggleToolbar('PersonalToolbar','');

开/关标签栏

代码

function tbtoggle (thisBTN)
{thisBTN.checked = !thisBTN.checked;
if ( thisBTN.checked )
{gBrowser.setStripVisibilityTo(false);
gBrowser.mPrefs.setBoolPref("browser.tabs.forceHide", true);}
else
{gBrowser.setStripVisibilityTo(true);
gBrowser.mPrefs.setBoolPref("browser.tabs.forceHide", false);}}
tbtoggle(this);

开/关Google Toolbar

代码

goToggleToolbar('gtbToolbar','toggle_taskbar');

开/关状态栏

代码

goToggleToolbar('status-bar','toggle_taskbar');

当鼠标放在链接上时，复制链接地址

代码

if(XULBrowserWindow.overLink)
Components.classes["@mozilla.org/widget/clipboardhelper;1"].
getService(Components.interfaces.nsIClipboardHelper).copyString(XULBrowserWindow.

overLink);

复制链接文字 - 链接地址

代码

if(XULBrowserWindow.overLink)
for (var i = 0, links = content.document.links, l = links.length ; i < l; i++)
if(links[i].href == XULBrowserWindow.overLink) {
Components.classes["@mozilla.org/widget/clipboardhelper;1"]
.getService(Components.interfaces.nsIClipboardHelper)
.copyString(links[i].text + " - " + links[i].href);

break;
}

在侧边栏开/关在线版的google talk

代码

var sidebar_box = document.getElementById('sidebar-box');
if(sidebar_box.hidden) {openWebPanel("Google Talk","http://talkgadget.google.com/talkgadget/popout");}
else {toggleSidebar();}
