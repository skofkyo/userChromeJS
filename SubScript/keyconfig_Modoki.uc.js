// ==UserScript==
// @name           keyconfig_Modoki.uc.js
// @include        main
// @charset        UTF-8
// @include chrome://browser/content/browser.xul
// ==/UserScript==
(function(){
var keymap = {
'8':'backspace','9':'tab','12':'tenkey5','13':'enter','16':'shift','17':'ctrl','18':'alt',
'19':'pausebreak','20':'shift+capslock','27':'esc','32':'space',
'33':'pageup','34':'pagedown','35':'end','36':'home',
'37':'left','38':'up','39':'right','40':'down','45':'insert','46':'delete',
'48':'0','49':'1','50':'2','51':'3','52':'4','53':'5','54':'6','55':'7','56':'8','57':'9','59':':','61':';',
'65':'a','66':'b','67':'c','68':'d','69':'e','70':'f','71':'g','72':'h','73':'i',
'74':'j','75':'k','76':'l','77':'m','78':'n','79':'o','80':'p','81':'q','82':'r',
'83':'s','84':'t','85':'u','86':'v','87':'w','88':'x','89':'y','90':'z',
'91':'leftwindows','92':'rightwindows',
'96':'0','97':'1','98':'2','99':'3','100':'4','101':'5','102':'6','103':'7','104':'8','105':'9',
'106':'*','107':'+','109':'-','110':'.','111':'/',
'112':'f1','113':'f2','114':'f3','115':'f4','116':'f5','117':'f6',
'118':'f7','119':'f8','120':'f9','121':'f10','122':'f11','123':'f12',
'144':'numlock','145':'scrolllock',
'188':',','190':'.','191':'/','192':'@','219':'[','220':'\\','221':']','222':'^','226':'\\',
'240':'capslock',
};

function $(id){ return document.getElementById(id)}

function keyconfig(e){
   if (/^(input|textarea|select|textbox)$/i.test(e.target.localName)) return;
   var keycode = e.keyCode;
   if (keycode >= 16 && keycode <= 18) return;
   var command = keymap[keycode] + (e.ctrlKey?'+ctrl':'') + (e.shiftKey?'+shift':'') + (e.altKey?'+alt':'');

/* 小写关键字+ctrl/shift/alt+命令的顺序 添加 */
   switch(command){//uc.js脚本默认的快捷键设置
case 'r+ctrl+alt': Services.appinfo.invalidateCachesOnRestart()||Application.restart(); baeak;//重啟FF
case 'enter+ctrl': openLocation(); baeak;//網址列取得焦點
case 'q+ctrl+alt': hideFirefox(); baeak;//隱藏火狐
case 'c+ctrl': setTimeout('content.document.getSelection().removeAllRanges();',100); baeak;//快捷鍵複製後取消選取文字
case '9+ctrl+shift': var _document=document.commandDispatcher.focusedWindow.document;var p=prompt('請輸入想要在當前域內搜尋的關鍵字('+_document.location.hostname+'):','');if(p)_document.location.href='https://www.google.com/search?q=site:'+_document.location.href.split('/')[2]+' '+encodeURIComponent(p); baeak;//搜尋的關鍵字
case 'up+ctrl': loadURI(content.location.href.replace(/(\d+)(?=\D*$)/, function($0) {return +$0 + 1})); baeak;//URL中的數字遞增
case 'down+ctrl': loadURI(content.location.href.replace(/(\d+)(?=\D*$)/, function($0) {return +$0 - 1 > 0 ? +$0 - 1 : 0;})); baeak;//URL中的數字遞增
      default: return;
   }
   e.preventDefault();
}

gBrowser.mPanelContainer.addEventListener('keydown', keyconfig, false);
})(); 


