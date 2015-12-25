/******************************************************************************************
 *這裡是腳本中用到的各種圖標設置。
 *******************************************************************************************/
var Icons = {
	//等待時國旗圖標，預設Firefox內部圖標【chrome://branding/content/icon16.png】。
	DEFAULT_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2TwW7aQBRF+ZDku0q/qChds5mxkDG2iY3H9jyTBFAWLAgRG7CwCawQi6BEQhgEFkiAuF3VaVXaSlWvdBazuGfx5r1c7n/H9/1rIvpCAUWS5E6S3FFAkU9+wff967+VP1FA6fPzMwaDAcbjMQaDAabTKSggEFEqpcxfLEvp5huNxnmxWGC73SIMQ9Tv6gjqAbrdLqT0Ub+rg4jOUro/S4QQV57nbZMkwel0wvF4xGazQafTgeu5GY1GA8PhEMITqRDiKhM4jnPTbrdxOBxwOByQJAlcz4UQ4heiKILruXAc52smsGzrpd/v4/X1FcPhEBQQ7Jp9kVarhdlsBsu2Xj4E1u3x/v4eRATLuv0tQT3AdDrFcrmEZd2eMoFZNXdm1cSP2DUbZtUEEYECglk1MRqNkKYp3t/fYZjGPhPohh7rhg7d0PH09IQ4jjGbzdBsNtHr9SBcAd3QMZlMMJ/PEYYhdEOPM0G5Ur7RKhoeHx+xWq2wXq+xXq/x9vaGVqsFraJBq2jQDT17l8vljyFyzq9UVd2qqoooirBarTLCMIRds6GqKgzTgOPUoKpqyjn/+MZcLpdTFCVfKpXOlm1huVwiSRIkSYLFYgGzauLh4QHNZhNaRTsrinJ5GxljeUVRUil99Ho9dLtduJ4LKX0QERRFSTnnny+Wv6dYLF4zxgqMsZhzvuec7xljMWOsUCwW/3xM/5JvTakQArDW8fcAAAAASUVORK5CYII=",

	//未知的國旗圖標，預設同上，如不喜歡內置默認，可以再這裡修改。
	Unknown_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVQ4jZWRMahScRjFL40REW9ojqaGhoaGprg0eL3//3fkj0pCDrYp2hARmRItjk4ND0EuSFMgSEQIiuMjEjdnwUGIvLdF+bxc/j6ut8X3eM9X7z3P+vE7nPMdw9gRgPdEdCSlPJRS3t+9Xyrbtp8A4FqtFmQyGQbARHRERAXLsg6uNADwMZ1O83q9jpbLZdjtdnW5XPa3Rksi+iqEeA7g5j8NFosFu64bRjuaz+dhu93WhULBB8AAXCll3TTNO6fweDx+qLWOwvACf06TySR0HCdQSjGAt2fjKwA8m83+6zCdTsNWqxXkcjkG4Nq2/ezUgIg+ZbNZ3mw25yDP88JOp6NLpdLJL/4AaAkhnu4+cFyv14MoiiJmjvr9vq5Wq34ikeBt7+8AXpimeevC8+Lx+D0APBgMdK/X08lk8gT6KaV8HYvF7l46nxDiJQD2PC+sVCo+Ef0A8ODK3c/0/5zP5/0gCCKlFBPRu2vD2/6/ms1mMBqNjgGwEOLxtWEhxCMAPBwOjx3H0UT02zCMG/vEf6OU4tVqFRWLRZ+IvuwVn4g+pFIpbjQawXbnV3sZWJZ1IKU8BDAhom+2bd/eh/8LEFU+M9Rx2boAAAAASUVORK5CYII=",

	//本地文件圖標，預設同上，如不喜歡內置默認，可以再這裡修改。
	File_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARElEQVQ4jWNgoBaor6//jw/X1dU1EDSAgOHX8RpCyICqqipxvIYQMoCBgYEBryFEeAEFk2QAUWpHDRg2BpCCibWMIAAAMx6JL+oOYsgAAAAASUVORK5CYII=",
	/* data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAAB3ElEQVQ4jZ3QT2vTcBzH8YGPxpt4EHwmHoc+BRV8ADuu+8MG2w47DJINVkLHWDrFKXpYBtqmttl+JV3/Zk1/SX5pfklq09TCx8O0yLB/0g+8j9/X4bu09GB7ex9fHB8XqSgqVBQVKgj3iaJCj46+0f39r8Wtrezzh3czl0plXxUKLjj/BcuKYNv3MRbDMEKk0wWIonKTSp0+SwSvrmaXVdUGY33Uau64RsODrts4OVFhGH2I4tWPlZXTp4ngfN6C4/RBCEWp1IammSCEQtM6kKQcwnAEyxpCknLft7c/PJkbzuUoGIug6zYIoSiXKSoVB4RQCIICVTVAiAVFMbC7+/nq4ODL47lh141QrbrQdQeVioPbW4ZazYUsl5DJ5JHJqJDlIi4uGtjZ+fQuATxAvd5FtcrGNZscphnANAO02wE4j1Euc6ytya/nhj0vQqvlodHo/pM7rl53Yds9XF93k8IDGIaPVov/t2aTg7H+InCMdjvE3V0wMdeNksOcx+h0Qpjm5LrdwWKwZfVA6eQ8L4amLQDb9s+pcZ4QzucpfH8Ix+lPzfeHSV7x/mWhwBAEIzAWTy0IRiAkwMbG+duZ8OZmdjmdLoaHh5ehIFz2ZiVJWri+fvbmz/mjv85vk5TTd5np7HoAAAAASUVORK5CYII= */

	//Base64編碼地址圖標，預設同上，如不喜歡內置默認，可以再這裡修改。
	Base64_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jb2SvUpDYRBE9ynuN3umFEQklURTBUtJtLKyFKz0HXy75AkklY0ikng7O1NdGxWJ/1/AgWnPnIWNWDfA1HZXU2AStrvacdvd/wEkjYBHSeNvAZk5zMzhJ4DxjwDbR0ALzDPz4E8nZOYx8FBKGUjaAxaSRr8CACfAHNh5p7wLtJIOIyJKKT3b18DFB4Dt+1JKb3UhM/tAa/sSWNg+B26As1WDra80M7Nv+0rSfkRE0zQbwK3t0+o/sL1p+26tR5K0/QpY1gBeTJ4CmNle1hSY1o6/5Rn8GGw2HC8ubAAAAABJRU5ErkJggg==",
	/* data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAABC0lEQVQokZXTTSvEcRDA8Q/ZcvBQLlIeXoCDUl6Aq4tQzm7egHZtCoUk70EOXEjC3UEuDk4uHo8ODkIu2l27Djubv4e1a2qa38PMd2b6zQ92kUPpn5rHjlhcYREZpDETtpouRExO0JZ8SgN61JbliFVCNnExjhtM1ABkfwN04CTOztGdCGiN6v4ETOMZ63gI24ghHGOsGmAWnbjAAVqwgscI2g+/S/RXA6Qj+3A4dOEsKnkK4DWO0Kb8YiV4xyZusYFUosxRvGIbzZjEC+YxVwEUIsM9Bn2VFEbQF/smrEZrp5FcIUhr6pN2HKJYAeSjtwFM+Tl1mW+axlYkzlOe5yx6cae+f1DEG/Y+AKR8auXF6Pi+AAAAAElFTkSuQmCC */
	//LocalHOST【127.0.0.1】【::1】，預設同上，如不喜歡內置默認，可以再這裡修改。
	LocahHost_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABNklEQVQ4ja2UwUpCQRSGPwx9gyAfooVLF0GLXiFo5QsUlkHcUgjcCZVEqIueQGjlIqwWbXqAom2IVJu2Bobg4raYM93D8ard7IeBuf/85xtm7szApA6BUNq6eGfKC4GdmLq5CqS4It+nBurbdlJwFahL/0SBRkB7EfhKDDQENsU/WgRul79lxv8Er8+BepVNrvgf0Gnw/bjQeUKolz6eE/ALNTBMAPU6AMaKUQLYMzM2VMESkAHSBpQWP6W8O8PhWDpj4AuoqfAl0AeegWXxckBP/EBlO8BAgzNAAcgDL0BLhW/UpFnx1lRxU2UfgGtgg+jM/+jNgDsC+CS6OKvAI/AE7BrwrQV6vf4CPE0zwe9E7wTAlYAHuC2bpXvcD4xVH7fEAHc+e0T7WcNd5YppZcl+AF0P+gbk74HicL4aGwAAAABJRU5ErkJggg==",

	//局域網【192.168.xxx.xxx】【169.254.xxx.xxx】，預設同上，如不喜歡內置默認，可以再這裡修改。
	LAN_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABLklEQVQ4jeXUO0vcURAF8F8pxDqdAdFCZLUQ/ARiZ6f4AjWua2dhq4IaNEWKgNjFSi3ED2AhmEKxUXw3PrBQQwQbI6SSiJhiR1nwv6uwlXhguJc5cw4zl3svhTGIM1ziV8RvXGD4BW1BfMFDnvhejPEo7hJM7/HtfRlPJpg+xlQxxhlsYEv2dpxjG5sYKMb4Az6hHEMYQSXKUPpakxI0II0efEYnmtGCH5hBW+Q6curSaIxGnuGj7LmNoxt96A9RGnOYj1xvrBl0YQzTMd0TqlGLJsyiHTWoQkXs6zCBr6iPXGXUpNAa2pbgUrCCfRzhCofYwWJMsIZd2Wd8gT2sR4cLUXsY2pMc3h/J1+kUP/EvgbvHKo7zaG/JfipJ5AGWcJPA/cVydJekvX57xv8BD7eoP535NRkAAAAASUVORK5CYII=",

	//默認UA圖標，預設同上，如不喜歡內置默認，可以再這裡修改。
	DEFAULT_UA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWNgoAaQl5d/Ly8v/59UjGzAfzzm47J0gA3AbRpuNdjC6T0pBmCogYsNDgMIxTdZBpDiArwpkaABxABiXEmUAbj4xBiAOyFRAgBPbmsFfCHniwAAAABJRU5ErkJggg==",
/* data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACKklEQVQ4jbWPT4gSURzHXzqDzr6ZgefD+fd0YJynjI62ghhqZApLdCnwkpAn87CXvO4SHTqKhw4JIl5aloiCIBChBTstHj10CXYpIRbSdXGLWDoG0ynZFSNY6Ae/y+/zPl++D4D/OBAAsHZZmfA8/7Lb7bKXskVRfCVJ0kQUxTbLsrssyz53uVxbAAD7n7IgCHcJIXPLsj7puj4lhEw0TZv6/f5TnuePGIZ5vFJkGOYGQui6JEm7lNJJPB4/jEaji7Us6yAUCn3GGJ95vd4ny74LQrgXDoergUBgn1I6Nk1zbJrmhFI6MQxjaprmOBKJ/AmZQAivLmxN03SE0FE2m70dCoXeKoryw7btj9Vq9VG9Xt8sl8sN27ZHuq6PDcM4VFX1FCG0tQgwDGMdY/w1nU7ngsHgu42NjdedTufa+Yq5XG5bVdUTXdcPFUU5lmW5tYCFQoH6fL4TVVU3W63WuuM4zPIfIYQNjPE3VVUP/H7/jBDydAF3dna8iqKMeJ7fd7vd95ZlSmkgkUi8CYfDQ4TQGCE0tyzr4YVHmUxmm+O4nyzLfgcA3D/P2u02P5/PBULIC0EQjjHGXyqVSuJCwHA4RJFI5D1CaFwoFBqWZeGlIh6O40Yej+csmUy2l1sCAADo9/t6Pp/fLZVKNx3HubKEH7jd7l+xWGyv1+vJKwMAAMBxHK7ZbGrnTi4I4S1Zlj8Ui8Vns9lM+qu8alKp1FqtVrszGAySq/hvbPGRIDMl+58AAAAASUVORK5CYII= */
};
/******************************************************************************************
 *這裡是圖標彈出TIP文字的自定義設置。
 *******************************************************************************************/
var TipShow = {
	tipArrHost: "網站域名：", //域名
	tipArrIP: "網站IP：", //IP
	tipArrSep0: "", //分割線，留空就沒有
	/*這裡會顯示 服務器信息	ServerInfo*/
	tipArrSep1: "", // 分割線，留空就沒有
	/*這裡會顯示 網站IP信息*/
	tipArrSep2: "--------------------------------", //分割線，留空就沒有
	/*這裡會顯示 我的信息*/
	tipArrSep3: "--------------------------------", //分割線，留空就沒有
	/*這裡會顯示 網站SEO信息*/
	tipArrSep4: "--------------------------------", //分割線，留空就沒有
	tipArrThanks: "Thx&From：", //感謝：xxxxx 來自xxxx
};
/******************************************************************************************
 *這裡是自定義服務器信息顯示，可以根據需要截取(只支持函數操作)。
 *******************************************************************************************/
var ServerInfo = [{
	label: "服務器：",
	words: "Server"
}, {
	label: "網站編碼：", //項目名
	words: "Content-Type", //http頭信息關鍵字
	//截取或替換的函數，返回的是null就是在沒有結果的時候自動隱藏該項
	regx: function(word) {
		if (word && word.match("=")) {
			word = word.substring(word.indexOf("charset="));
			word = word.substring(8, word.length).toUpperCase();
			return word;
		} else return null;
	}
}, {
	label: "網站程序：",
	words: "X-Generator"
}, {
	label: "網站語言：",
	words: "X-Powered-By"
}];
/******************************************************************************************
 *這裡是UA自動切換規則列表。
 *支持正則匹配。
 *******************************************************************************************/
var UASites = [
{
	url : "https?://www\\.icbc\\.com\\.cn/",
	label : "Firefox10.0"
}, {
	url : "https?://(?:mybank1?|b2c1)\\.icbc\\.com\\.cn/",
	label : "Firefox10.0"
},{ //直接可以看kankan視頻，無需高清組件
	url: "http:\/\/vod\.kankan\.com/",
	label: "Safari - Mac"
}, { //WAP用UC瀏覽器
	url: "http://wap.",
	label: "UCBrowser"
}, {//使用Chrome，看QQ游覽器官網特效
	url: "http:\/\/browser\.qq\.com\/*",
	label: "Chrome - Win7"
},{
	url: "http:\/\/tieba\.baidu\.com\/mo",
	label: "UCBrowser"
}, {url : "http://cn\\.bing\\.com/",label:  "Chrome - Win7"}, 
{url : "http://wapp\\.baidu\\.com/",label:  "iPhone"},
{url : "http://wappass\\.baidu\\.com/",label:  "iPhone"},
{url : "http://wapbaike\\.baidu\\.com/",label:  "iPhone"},
{url : "http://m\\.weibo\\.cn/",label:  "iPhone"},
{url : "http://m\\.hao123\\.com/",label:  "iPhone"},
{url : "http://m\\.mail\\.163\\.com/",label:  "iPhone"},
{url : "http://w\\.mail\\.qq\\.com//",label:  "iPhone"},
{url : "http://m\\.qzone\\.com/",label:  "iPhone"},
{url : "http://wap\\.58\\.com/",label:  "iPhone"},
{url : "http://i\\.jandan\\.net/",label:  "iPhone"},
{url : "http://www\\.tianya\\.com\\m/",label:  "iPhone"},
{url : "http://m\\.xianguo\\.com\\wap/",label:  "iPhone"},
{url : "http://ti\\.3g\\.qq\\.com/",label:  "iPhone"},
{url : "http:\/\/[a-zA-Z0-9]*\\.z\\.qq\\.com/",label:  "iPhone"
},{
	url: "^http://browser.qq.com/",
	label: "Chrome-Win7"
}, {
	url: "^http://pan.baidu.com/",
	label: "BaiduYunGuanJia"
}, {
	url: "^http://www.115.com",
	label: "115Browser"
}];
/******************************************************************************************
 *RefererChange，破解反外鏈。
 *@FORGE：發送根站點referer
 *@BLOCK : 發送空referer
 *******************************************************************************************/
var RefererChange = {
	'bimg.126.net': '@FORGE',
	'tankr.net': '@FORGE',
	'51cto.com': '@FORGE',
	'wsj.com': 'https://www.google.com/', //免登陸或訂閱看全文
	'pconline.com.cn': '@FORGE',
	'postimg.org': '@FORGE',
	'chiphell.com': '@FORGE',
	'niunews.cn': '@FORGE',
	'poco.cn': '@FORGE',
	'about:blank': '@NORMAL',
	'jump.bdimg.com': '@NORMAL',
	'img.liufen.com': 'http://www.liufen.com.cn/',
	't4.mangafiles.com': 'http://www.imanhua.com/',
	't5.mangafiles.com': 'http://www.imanhua.com/',
	'laibafile.cn': 'http://www.tianya.cn/',
	'zol.com.cn': '@FORGE',
	'tmoke.com': '@BLOCK',
	'51img1.com': '@FORGE',
	'zol-img.com.cn': '@FORGE',
	'douban.com': 'http://www.douban.com',
	'yyets.com': 'http://www.yyets.com/',
	'img.cnbeta.com': '@FORGE',
	'hiphotos.baidu.com': '@FORGE',
	'hiphotos.bdimg.com': '@FORGE',
	'imgsrc.baidu.com': '@FORGE',
	'baidu-img.cn': 'http://www.baidu.com/',
	'photo.sina.com.cn': '@BLOCK',
	'sinaimg.cn': 'http://blog.sina.com.cn/',
	'pixiv.net': '@FORGE',
	'ph.126.net': '@FORGE',
	'isnowfy.com': '@FORGE',
	'image.itmedia.co.jp': '@FORGE',
	'2ch.net': '@FORGE',
	'imepita.jp': '@ORIGINAL',
	'tumblr.com': '@FORGE',
	'photo.store.qq.com': '@FORGE',
	'img.pconline.com.cn': '@FORGE',
	'fc2.com': '@BLOCK',
	'blogs.yahoo.co.jp': '@BLOCK',
	'hentaiverse.net': '@BLOCK',
	'qlogo.cn': '@BLOCK',
	'qpic.cn': '@BLOCK',
	'fmn.rrfmn.com': '@BLOCK',
	'postimage.org': '@FORGE',
	'bdstatic.com': 'http://tieba.baidu.com/',
	'space.wenxuecity.com': 'http://bbs.wenxuecity.com/',
	'www.autoimg.cn': 'http://club.autohome.com.cn/',
	'kkkmh.com': 'http://www.kkkmh.com/',
	'nonie.1ting.com': 'http://www.1ting.com/',
	'img.knb.im': 'http://www.kenengba.com/',
	'tianya.cn': 'http://bbs.tianya.cn/',
	'xici.net': 'http://www.xici.net/',
	'media.chinagate.com': 'http://www.wenxuecity.com/',
	'jdstatic.tankr.net': 'http://jandan.net/',
	'sankakustatic.com': 'http://chan.sankakucomplex.com/',
};
/******************************************************************************************
text 為運行參數，如果無需參數，直接刪除text屬性，目前只支持 %u 為當前網頁完整地址；
exec 為打開路徑，可以是任意文件和文件夾，支持相對路徑，相對於配置文件；
除了以上屬性外，可以自定義添加其他屬性，如果快捷鍵accesskey等。
=======================
{}, 為分隔條 
=======================
如果設置了id屬性，會嘗試獲取此id並移動，如果在瀏覽器中沒有找到此id，則創建此ID。
=======================
自帶命令函數：【showFlagS.command】-----形式類型：
1、是非常簡單的POST,如：
showFlagS.command('Post'（類型聲明）, this.tooltipText（提交的URL）, aPostData（提交的數據）); 就這麼簡單，其他東西一概沒有。
--------------
2、通用的GET，默認就是這個了，不用聲明類型，最終結果為，新標簽打開  url+參數  形式的網頁。
showFlagS.command("網址", "參數1", "參數2", "參數3", "參數4", "參數5"，"參數6")
網址可以是：tooltipText(編輯項的tooltiptext,方便查看)，可以是查詢API或網址；
網址也可以使用以下參數,參數有（當前網頁的）:
ip：IP地址；
host：域名；
basedomain：主域名；
url：完整地址；
-----------------
3、功能相對比較強大的動作模擬（感謝FlagFox!!），可以參考與FlagFox，本腳本增加識別按鈕class類名，使用方法如下：
showFlagS.command('Action','http://ping.chinaz.com/', 'host', 'IP', null,'but')
			    	Action：	聲明類型，如果要使用模擬提交功能必須先使用Action聲明；
'http://ping.chinaz.com/'： 	目標網址，推薦寫在tooltipText，用this.tooltipText代表，方便使用的時候查看
					 host： 	打開目標網頁時填寫你輸入數據位置的ID，
					   IP： 	這個是你需要輸入的數據，內置IP，host,basedomain,url，具體代表請參考第二條。
					 null： 	點擊使你輸入的數據生效或提交按鈕的ID，遇到奇葩網站提交按鈕沒有ID的話可以填寫null，用下面一條解決
					  but: 		點擊使你輸入的數據生效或提交按鈕的類名（class）
-----------------
還有一些其他的，比如編輯文件
showFlagS.command("Edit", "文件路徑，支持相對路徑")
showFlagS.command("Copy", "函數或者字符串")
*******************************************************************************************/
var Menus = [{
	//菜單名稱
	label: "地址IP",
	//圖標
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAt0lEQVQ4jcXTsWoCQRSF4Q8SsNEitUnhM6RQUtjb+xixTRHIG+SFks7GVxBksbBPGVjWQpsjSNhdXUjIhb+4c5l/mMMMv1g93IfeWf8Qhhi0CcYowmMosAtbfGCO2zrBFGV4CiUOP/iK5GrBHu94wTqSz7rrNAnKzOAtgm0yuUpQ4RkzLCNY4a5LBlU4ZG3RJYOT4BsbvKLfRVDlxAlGuKnb3CY4D7G1/l/Q9JSLzC5W02c69X9TR6H4UVapsaP+AAAAAElFTkSuQmCC",
	//child:[  ]內為當前菜單的下級菜單配置；
	child: [{
		label: "PingIP(aizhan)",
		tooltiptext: 'http://ping.aizhan.com/',//提示文字
		oncommand: "showFlagS.command('Action',this.tooltipText, 'site','host', null,'btn02')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2STUsbURSGJ/kNsaFQcCONYFy46GZowR+QVRb+BHXRbQghbiIGpNQSP2bjRxcGUbKYTagJDbHSVNPUIEjaJEWNxKAYbRIahlhmyDxdDE46BLrywrO6vM+555wrCI95dKDZUfjxW+Nj/c9/ueto6ECfIFHOIJ22eZVp9PEydW2yWby1CtSuTqKcQZQ8SDmZJ6l7hNiVQbSCEK1gWy9gWy9gXzliJFZC7eqYYSkn49sN41oQDclp21JxJFbqE+iAcNaoEUpH8EYnmZKDOOfc2HxOEuUMalc3UVSNkVgJ+8oRwvw+0/GCIai2bijWS/h2w3ijk6ZAlDy9JwqCcNfRGNzIm4J3X6u9GejAlBxElDzYfE6m5CDFeolmRzEF5617BjfyDCxmsPtl9i6avQE2Owre6CSuBRGbz4mUk81LHdCBg8s2Y++/MbCYQZjf57x136t+1qjhWhAt/f+7nc3iLYFkGW/sGEc4gSOcQFE1o8WH3Tvn3CbV1o3lg+xdNPHGjpmOF3CEE9j9Mi8iKaMNtasTSkfM8GhkCPl7nGK9ZHLWqLF0WGM6XsDul7H7ZQLJsvGCh/6fhp8xGhlifG2Y8bVhJrbdvI4bLGW9HF42TMFqrtLbgKJqhNIRMzyx7baEZz+N8ebLc/JXOwSSZVZzFct6BR24bv/i7edZlrNBlrNBtk5m2DqZ4cPPHvmrHQ4u29bwY5y/Ihk8/sKXNsAAAAAASUVORK5CYII="
	},{
		label: "PingIP(17ce)",
		tooltiptext: 'http://www.17ce.com/site/ping',
		oncommand: "showFlagS.command('Action',this.tooltipText, 'url','host', 'su')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVQ4jbWT60vTARSG92f0JYigCUlBm6Ufag4k7UIpXSzmbTM1f+XM5ZqUeClzRbrKNG/QZZDM0GqEpRNNRTOl4S1voc3SNhErpy1z4nr6UGTSiEB6Px+el/Oe94hYpUT/DTA5NUPPKxtdvaNM2D/8O2DE5iDj4m3CI9MIC1cTejiJAwotqenFdPfZ/g6obbASHKYhIvoEZaUlNDXW87ythUpTBceFVOS7BEzVTd4Bza19BAQJqJO1WF+2/+HksL8lJ0ePZIeKKnPrSsB7xzTyvVoOHhFofmYBYNRmR5dZjpBynea2nl+Q+EQtEplA/+DYMiAt+xY+flGcz77AF9csU9NOAvecRnOuhMoHTUgDBdo7BwAwGu+ycWskSiEPt3sR0ajNjm9AAgFB8RQV3QCgxtLJGnE4OVfu8bS+A7FUSdYlIwCWuifIQhJYtymKxpYuRB8/zRK0X8eW7bEY8vMBDx3WYcRSJT5+Knz8VKz1VVB+pwYA86OHbJPHIpGdZOj1+I8VqswtbJDEkKTWMfZmGAC9oQJf/zjEUhVxagMzThdLS25y9Xms36ygsMy8nIHH40FzthT/wBhKbhYwN+cEYHB4HGv3CN9+Jl5X+xjZTiUR8ZeZ/7qw8ozOWRdKIQ95iIqCa1cZGuhl0e0CzwKTjnfcN1UQsu8YoYosJuzT3os093mejFwj8t2JHDoqkKJJR3smE0W0GllwHKfSipmcmvFepN9l7R4hv7CaZF0hSdoC9AYTrS/6vY2u/hu/AzhXUaJ+f854AAAAAElFTkSuQmCC"
	},{
		label: "PingIP(chinaz)",
		tooltiptext: 'http://ping.chinaz.com/',
		image: "http://seo.chinaz.com/Chinaz.ico",
		//oncommand: "showFlagS.command('Action',this.tooltipText, 'host', 'host', null,'but')",
		oncommand: function() {
			var aPostData = "host=" + content.window.document.location.host + "&alllinetype=全選&linetype=電信&linetype=多線&linetype=聯通&linetype=移動&linetype=海外";
			showFlagS.command('Post', this.tooltipText, aPostData);
		}
	},  {
		label: "PingIP(CA)",
		tooltiptext: 'http://cloudmonitor.ca.com/zh_cn/ping.php?varghost=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFY0lEQVRYhe2W6U9TaRSH/U90ZGxtEXBhMCMOOEQd14BrUAFFglGDiiIqyGgIoKMVwR1xYVGHTVwoFItScBSKgAsiOhSlVllqiyCiAdtLn/kwAae5LJJMoh88yfvlPb/zu8+995z73lF85Rj1HWA4gc1mQxAErFYrgiBgs9kG1PX29n6R7osBurq6MBgMFKpUnDx+gkMHD3I2+Qx379yhpaUFi8WC1WrFbDLxtK6OnKxsjh05QrxCwelTp7hZVIRer6e7u3vkAM+ePiVix04kYx1wGD1GtKa5TeXcmbNUV1WxxMdnQI3D6DHIJVJioqNpbW39coC7d+7g5eE5qOl/V/DaIFb5rhhWtz44GKvVOjxAg66BhfPmiQzmzv6N4LVBzJk1W5RLiD+MbJwEL88ZBK8NYomPD+N+GCvSlZeVDQ3Q09PDkYQEUWH0nr0YDAbMJhP6xkb2REXZ5WdM/4WC/HwaX7zAbDLR0tLCkYQEEUS8QjE0gMFgwHv+AruiCeNlvO/stCvQlmuZM3MWrhMn4TbFFRfHCbS1tdlp6uvrmT9nrp1XVGTk0ACPHj4U3f1qP38EQbAr6BtLQRDo7e3tH7fmpiZKijVkXLpETHQ009ym2nntjhgGoFRTIgLYsX27CKAvBEGgQqsldPNmnGTyYRtxSACbzUa+Uikq2hW+Y0AAs8nEti2hIv1Pk6fg5eGJl+cMHKXjR/YESoo1IsOQDRtFAD3dPeyOiLS/8KTJ7I6IpFRTwtu3b9Hr9SxfsnRkAAP1gJeHp6iguroaT/fpdjplXp6dRqfT4b1g4cgABpoCh9FjKCnW2BXcunkT2ThJf95Z7igyLdWUMMnJeWQAgiBw4thxEYDbFFf2x8aRk5VN0smT7AwPZ7Kzi52mqrKy39BoNOK3YuXImrAv9I2NLF20SFQsdfgRmUSCTCIhYJWf6P06yeSs9vMnZMNG0fh98XegL+5X32fmr16DjtNibx+2bNqEXCIdVOPh7o6Hu7vdXljoViwWCyXFGtrb2wcHAGhtbWX71m24TXHFWe6IXCJFLpHiJJPjLHfk1ImTJCclMf3naTjJ5MglUhyl43FxnMBibx8e19QQr1Agl0iZ7OzCRCcn1vgH0NzUxJXcXAwGw9AAfdFmNlOkVnMhLZ201FQK8vNpbm7uz3d0dKAqKCA1JYWMS5fseqHNbKa+vh6dTodOp6NB1/Dvflub3cn4bfySWa1WjEYjnz59GlD01+3bQ5q8fPmSV69eDZgrLyvHYrEMDdDe3k54WBjqwhvcq6jgcU0N7zs7uZh+geamJtb4B1CoUqFvbKS8rJwbqkI633WiKiig5tEj8q5dR5mXx8MHDyi+dQvTGxP5SiWV9+7x58WLfPjwgazMTF6/es3fz56hKiigp7vnM0BHRwf7Y+M4cew40Xv2sjfqd9avW0eFVktVZSW+y5Zzr6KCzSEhpKelsS82lriYGPKVSkI2bORi+gUupKWzZdMm8q5dJyoyku1bt1GkVrN7VwTxCgV/7NuP34qV7I/bx/Wr1/pP0VEAne86SU5K4vjRYygOHKBCqyVoTSANugaqKitZ5euL2WTCd9lysjOzOJqYyLYtoWiKi/FfuYrUlBRSz58naE0g6htqAgMCWB8cjNFoJHLnLsLDwsi9fJmrV65wu7SUeMUhtOXazwAWi4VSTQk5Wdnk5uSQk5XN84bn7IuNpba2ltzLl/n48SO5OTnUPamjvKwMvV7PmdPJKPPyqHtSR21tLdevXuP82XNkZ2YRuHo1iYcTyMzIwPTGRFxMDDdUhRSp1SSfPk1XV9dngP87Hj54wNHERKqrq4fVfhtj+B3ga8Y/XeXRuGPZVfUAAAAASUVORK5CYII="
	}, {
		label: "IP地圖位置",
		tooltiptext: 'http://www.264.cn/ip/',
		oncommand: 'showFlagS.command(this.tooltipText, "ip",".html");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVQ4jbWTMQ6DQAwE9wmpKCjpUucHvIAn0UVCFBR5QDp+hqiT/jZNlJy9BuUicdI2Ps96pTsDRxwOFdlDNVTM2xS8twZ4NxlldWsSwXyuZEpGAMjbmfAJBHagmIx1Nn2sLfxYvo07Jn9NNymuJ4IXUJSS1jaED5Brr+aGaIKoOUpmDEoSuBpKpkX3ZQk2DX5VH7yC+Y1zFy+R19zpIhmjqYnBqRHwBfGiN9m6gWsFAAAAAElFTkSuQmCC"
	}, {
		label: "路由跟蹤",
		tooltiptext: 'http://www.domaintools.com/research/traceroute/?query=',
		oncommand: 'showFlagS.command(this.tooltipText, "ip","&search=traceroute");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jYWST4iNYRTG32ZSkyibWahZWM1GbJREmUwoC6w+xYaampJSMt26U9/5/VZsWEhZyM4NqTFTU6Kh8W82FobGYpTZyKRJhEQyjM17r88lc+os3vOc9znnPOeklE3tUIci4mRRFJ1FUXRGxAAwFRE70nIWEQfV9+oSMKU+Ab7m9/Tw8PDa/xKox4ER9Wf+NA9czj4HvFVrEXHin2RqFzCjLqnX1DVtHQ6onzJ+Q+1IKaVUluUmYASYyJXfqT0Z2wCcV49kjXrV18BktfKZzNr0p0VRdGaC9bnqGDBRr9e71a3q57Is+5oEt9Q7wAzwQ33VbL9er3cDL9SeiDiqXkopJeCq+jIi9id1N3BavaLO5i72pZTS4ODgCvV5RBxTD6izWY+9OW+xNQpwDrgLfFcfq125wwvAm7yFUzm2Pes1XtVis9oA5jJ7Q12ZsR51XSV3SF2KiD3tqwx1sSLoo5ZYv3P6gYWM76wCG4HxCsGHJhHwDBgF7mehm/GHLYKyLLcBk+oDdUy9qN6rCNv0L5loGpj/Y4SyLPsi4nDliM6q14HbueI3tT8iduWtbfnrpNtNPaTeBBaAj2pvSinVarXVy35OqXVMo2ojIlBXVfFfTgJz2sMe76oAAAAASUVORK5CYII="
	},  {}, {
		label: "旁站(aizhan)",
		tooltiptext: 'http://dns.aizhan.com/?q=',
		oncommand: 'showFlagS.command(this.tooltipText, "ip");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2STUsbURSGJ/kNsaFQcCONYFy46GZowR+QVRb+BHXRbQghbiIGpNQSP2bjRxcGUbKYTagJDbHSVNPUIEjaJEWNxKAYbRIahlhmyDxdDE46BLrywrO6vM+555wrCI95dKDZUfjxW+Nj/c9/ueto6ECfIFHOIJ22eZVp9PEydW2yWby1CtSuTqKcQZQ8SDmZJ6l7hNiVQbSCEK1gWy9gWy9gXzliJFZC7eqYYSkn49sN41oQDclp21JxJFbqE+iAcNaoEUpH8EYnmZKDOOfc2HxOEuUMalc3UVSNkVgJ+8oRwvw+0/GCIai2bijWS/h2w3ijk6ZAlDy9JwqCcNfRGNzIm4J3X6u9GejAlBxElDzYfE6m5CDFeolmRzEF5617BjfyDCxmsPtl9i6avQE2Owre6CSuBRGbz4mUk81LHdCBg8s2Y++/MbCYQZjf57x136t+1qjhWhAt/f+7nc3iLYFkGW/sGEc4gSOcQFE1o8WH3Tvn3CbV1o3lg+xdNPHGjpmOF3CEE9j9Mi8iKaMNtasTSkfM8GhkCPl7nGK9ZHLWqLF0WGM6XsDul7H7ZQLJsvGCh/6fhp8xGhlifG2Y8bVhJrbdvI4bLGW9HF42TMFqrtLbgKJqhNIRMzyx7baEZz+N8ebLc/JXOwSSZVZzFct6BR24bv/i7edZlrNBlrNBtk5m2DqZ4cPPHvmrHQ4u29bwY5y/Ihk8/sKXNsAAAAAASUVORK5CYII="
	}, {
		label: "旁站(264.cn)",
		tooltiptext: 'http://www.264.cn/sameip/',
		oncommand: 'showFlagS.command(this.tooltipText, "ip",".html");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVQ4jbWTMQ6DQAwE9wmpKCjpUucHvIAn0UVCFBR5QDp+hqiT/jZNlJy9BuUicdI2Ps96pTsDRxwOFdlDNVTM2xS8twZ4NxlldWsSwXyuZEpGAMjbmfAJBHagmIx1Nn2sLfxYvo07Jn9NNymuJ4IXUJSS1jaED5Brr+aGaIKoOUpmDEoSuBpKpkX3ZQk2DX5VH7yC+Y1zFy+R19zpIhmjqYnBqRHwBfGiN9m6gWsFAAAAAElFTkSuQmCC"
	}, {
		label: "旁站(114best)",
		tooltiptext: 'http://www.114best.com/ip/114.aspx?w=',
		oncommand: 'showFlagS.command(this.tooltipText, "ip");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACj0lEQVQ4jbXRaUjTARzG8b/1puh41YuOF11QIPXKUVCRFBZUEETHCyuEiNCyw1qHRKQvOhZpmB06i7LIMVrTTJM0D8rZsVyuprO57e+Odv2vqWVRxLcXQRSK0IseeF7+PvzgEYT/kdCAhkvWeBPTeB1RccRUREVlzCNzYIi8TpWsdoWNLQprn8ik18bRmaOkVUVYavrIGmuU3U1xnHHtb+y6L0mmY5CdXYNs7tBY2SCzpCbBYnOMOTfCTCsNMvGcyPjTXsYV9jHzaog73covpFdLktv9CX3wCznuT2zt0DhmVzjVqXDSLnP8hcTRDokt9TEmFvWTUtBHymkvGywRAkkN4VksyabnGuvbVFY3KuS0yzSKCVr7E7/fbPbGedQbJ90SZVZFmOnlYZbfi+CMKgj2oEJGRYDUSyKpJSJ7a8PMrfQx1SiS0xRgV53IhEIXaWVujtSFmWvwMvuCD12pH5tfQvBLKlnmELorIunlIgZbhGmmj4y/JTGpNMBkgwch/wPzL/RQ2RllRZmfhcV+sqtDBEdbZlt7jEyHytkeK4UOH8fbyimwNbLutpG9D8WxpzzvkpjSPMThPonqsBGT6KHCWUhVdzU7TEXMOOXmvjMyOuJKKMx7qiK8/IG+X6ZNukhD1M19j57H/iqyHlwkJa8HXUkPIU0eiZxpkdG9+oZghwOBJJXBuxj9XopdJRjf15NpuYxwrBfhQBeltsBIIN+ssdP3HcEOi95/JeOtm1W2BMset7OqxsmCa60I+R8Qct+x3ewZCWRXqBR1feZE52f09mHyXg1z0DbE/tYBcpuS7GtQ2VMtkXElQuat0EigoFZmj0nmkPWPPpDIs0gcsf6q3iqx66aE4ZE09hr/kp/pOwDc448VcwAAAABJRU5ErkJggg=="
	}, {
		label: "旁站(Bing)",
		tooltiptext: 'http://cn.bing.com/search?q=ip:',
		oncommand: 'showFlagS.command(this.tooltipText, "ip");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII="
	}]
}, {
	label: "域名DNS",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiElEQVQ4jXXTzUtVURQF8J+F9ugPKBTFbBAUNCl4GmE5LJI+Jn1IUP9Ck3DarEEIJVj2SKwg6AO0aNAgfZHRP1CaFVEPykGDnNekwd4XrpfngsvhHM7ae5291mUjunAMT9DCen4tPMMJbLMJdmISn/EQl3AEw7iIGaxiCt3tyPNYSsLWPO9Ff64HMIomXqKnIHdm5yUMVApfxzd8SGULGMv1dvGc4/iUcqu4id84j30pv5lKVnASHuNBSXYZk3iEjtzvzWZ13MUc/MDlNmS4hffYkfvT2XkgVf2EPxjJCzWcwg1cEXb+wxvM4guu5d3DwmLrOJqH4/iast/ir3Dnaqo5i+3VAi3hcx8+pjQp+x3ubPK8C8UTnuIeDooB7S9duo/pNuQtaOA5Ec8VYc2CsGqPGNha7qsYzGZniPxPYVGEpCkiu4zvmKiQe/E6FdSKw24Rz8VUVBdW7caukux6qnyVhTagR8RzVYTkHA5hSAy2IeLcaEcuUBPxnBcTLn7nX3iRc6mVCf8BM0VdfnCTBIgAAAAASUVORK5CYII=",
	child: [{
		label: "綜合查詢",
		tooltiptext: 'http://seo.chinaz.com/?q=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4jaXSwQkAIQxEUcWObc8STEuSPWWJ4wgJBjwt/4EbS+tDX05pfSiOiOiaVdesyr7bUMDHBtyQA8A4BbA4DNziMMBCQxkgIvsWMPZXQsDHFMAf6gGMr++AASxOAamXGAG2LWSBY40ZwE8awPmBl/MBE0/2WQgYGXQAAAAASUVORK5CYII="
	}, {
		label: "網站備案",
		tooltiptext: 'http://icp.aizhan.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2STUsbURSGJ/kNsaFQcCONYFy46GZowR+QVRb+BHXRbQghbiIGpNQSP2bjRxcGUbKYTagJDbHSVNPUIEjaJEWNxKAYbRIahlhmyDxdDE46BLrywrO6vM+555wrCI95dKDZUfjxW+Nj/c9/ueto6ECfIFHOIJ22eZVp9PEydW2yWby1CtSuTqKcQZQ8SDmZJ6l7hNiVQbSCEK1gWy9gWy9gXzliJFZC7eqYYSkn49sN41oQDclp21JxJFbqE+iAcNaoEUpH8EYnmZKDOOfc2HxOEuUMalc3UVSNkVgJ+8oRwvw+0/GCIai2bijWS/h2w3ijk6ZAlDy9JwqCcNfRGNzIm4J3X6u9GejAlBxElDzYfE6m5CDFeolmRzEF5617BjfyDCxmsPtl9i6avQE2Owre6CSuBRGbz4mUk81LHdCBg8s2Y++/MbCYQZjf57x136t+1qjhWhAt/f+7nc3iLYFkGW/sGEc4gSOcQFE1o8WH3Tvn3CbV1o3lg+xdNPHGjpmOF3CEE9j9Mi8iKaMNtasTSkfM8GhkCPl7nGK9ZHLWqLF0WGM6XsDul7H7ZQLJsvGCh/6fhp8xGhlifG2Y8bVhJrbdvI4bLGW9HF42TMFqrtLbgKJqhNIRMzyx7baEZz+N8ebLc/JXOwSSZVZzFct6BR24bv/i7edZlrNBlrNBtk5m2DqZ4cPPHvmrHQ4u29bwY5y/Ihk8/sKXNsAAAAAASUVORK5CYII="
	}, {}, {
		label: "Whois(Shosts)",
		tooltiptext: 'https://www.sugarhosts.com/members/whois.php?domain=',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACSUlEQVQ4jYWSXU8TQRSGTz8kIB+iKMQoaEKCxlhDNMH4UTUhpl5QMK18aMKF/8CfMD+Gq73lpoFlTncpu9ntwjKzObvbzJZNoOF3eFVSEMt7dWbOvE9m3jMAVySlvNtsNr8kSTLdXSdJMskYyzLGslfPX5KmabmDg4OVNE3nEXE9juNRznm1VqttOo5TajQay3Ecj15rRsS8UmrMtu2ylPKTrusbQojhMAyfhGH4Wtf1jZ2dnZ/tdrvged6tfwBSysL29vbvTqczQUTzSqkHPe1MHMfPhBDFra2tP0S0EATB1EU3iqI5IUQxSZLJfk9ExHyj0Vg+Ojpa1HV9g4hGQNO0HOe8uru7+8vzvNv9AIyx7P7+frnVai10MwIAAN/3x1ut1v1+5q6I6J5hGBXOedXzvDtgWdaQlLIQBME0AGRuAgghhjnna0RUdF33M/i+/9513W/d1G8CIGLecZzS3t7eqlJqFoQQL+v1+qphGBVEHLwJwBjLCiGKSqkXAJABxlg2iqKJTqczIaV8LqUs/PezAECapoOO45SCIHh1salpWq7ZbH51XXfR9/0PhmFULMsa6vFliGggiqKniPjj7OzsEfTmRUQjpmlWEXGwO6rT09NZpdQYIuaPj48/GoZROTw8LNVqtc12uz1z6VpENGCaZlUpNRuG4UNd19dt2y5zztfOz89n6vX6apIkbyzLWiKiEbhuWicnJ1OWZS2ZprkSRdGclPKdbdvlNE3HhRBvTdP8rpR63DdhTdNyiJjvpt2tASDTU1/SX16naBB9RDh8AAAAAElFTkSuQmCC"
	},{
		label: "Whois(cndns)",
		tooltiptext: 'http://who.cndns.com/?d=',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jY2RMWhTURSGj6LV987BgmaK4qDVopVnbQlUFMyQNO+d46JLCRLq1BaHOEQcpSoGKRERHLWDiygqbXcXKw6Co4iIiy7tkBhf3jlKsX0OosU0TXLG/7/ff/9zL0AXU3jk4f23A9dnXvfNjz08NOvd9MowMby9GxYgDdtGyt7z4kJ/PP6kPx65460N3UhNdOSqAewKecfhUj6ZOHLFWzx2ezA+c+/Er2wlda0tGDEOKuODKMCryu7k8lm8sHh+T6FycW9h+tLBvrawsjtpjC816yZN6JUyLhhT0RgvK9NcQ2i+Gjj7WsOBG5jQp1oGesM0JELfOd2iXd6EPmvWTTZ7W4zpY8SYb1sRACLBuyb09P/bc+6QCdrSKGCngLrsPGCMK2EaEuupPo6b0IdO8N+2ylSNfMytN2B3yhi/dBkAyrjcCGjsn2C+c84EVxtBz9FO8Pcc7DbGlTBwTjWLPzY8TosxpqIKfXs/AD1NBs6YUBwFWNoMjnJ4XJnqyljeYH49CY4JvTHGNWV6pr6bmgbYCgBQyzj7owBLylRXwXeb/tbSKKAyzprgqgnFxvjTBNWE4j8aPq5loLfTmqDiDptgRZnmVOiFCt2KfPRanf0N1/S6NRUXNMsAAAAASUVORK5CYII="
	},{
		label: "Whois(aizhan)",
		tooltiptext: 'http://whois.aizhan.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2STUsbURSGJ/kNsaFQcCONYFy46GZowR+QVRb+BHXRbQghbiIGpNQSP2bjRxcGUbKYTagJDbHSVNPUIEjaJEWNxKAYbRIahlhmyDxdDE46BLrywrO6vM+555wrCI95dKDZUfjxW+Nj/c9/ueto6ECfIFHOIJ22eZVp9PEydW2yWby1CtSuTqKcQZQ8SDmZJ6l7hNiVQbSCEK1gWy9gWy9gXzliJFZC7eqYYSkn49sN41oQDclp21JxJFbqE+iAcNaoEUpH8EYnmZKDOOfc2HxOEuUMalc3UVSNkVgJ+8oRwvw+0/GCIai2bijWS/h2w3ijk6ZAlDy9JwqCcNfRGNzIm4J3X6u9GejAlBxElDzYfE6m5CDFeolmRzEF5617BjfyDCxmsPtl9i6avQE2Owre6CSuBRGbz4mUk81LHdCBg8s2Y++/MbCYQZjf57x136t+1qjhWhAt/f+7nc3iLYFkGW/sGEc4gSOcQFE1o8WH3Tvn3CbV1o3lg+xdNPHGjpmOF3CEE9j9Mi8iKaMNtasTSkfM8GhkCPl7nGK9ZHLWqLF0WGM6XsDul7H7ZQLJsvGCh/6fhp8xGhlifG2Y8bVhJrbdvI4bLGW9HF42TMFqrtLbgKJqhNIRMzyx7baEZz+N8ebLc/JXOwSSZVZzFct6BR24bv/i7edZlrNBlrNBtk5m2DqZ4cPPHvmrHQ4u29bwY5y/Ihk8/sKXNsAAAAAASUVORK5CYII="
	},  {
		label: "Whois(ChinaZ)",
		tooltiptext: 'http://whois.chinaz.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4jaXSwQkAIQxEUcWObc8STEuSPWWJ4wgJBjwt/4EbS+tDX05pfSiOiOiaVdesyr7bUMDHBtyQA8A4BbA4DNziMMBCQxkgIvsWMPZXQsDHFMAf6gGMr++AASxOAamXGAG2LWSBY40ZwE8awPmBl/MBE0/2WQgYGXQAAAAASUVORK5CYII="
	}, {
		label: "Whois(Dtools)",
		tooltiptext: 'http://whois.domaintools.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jYWST4iNYRTG32ZSkyibWahZWM1GbJREmUwoC6w+xYaampJSMt26U9/5/VZsWEhZyM4NqTFTU6Kh8W82FobGYpTZyKRJhEQyjM17r88lc+os3vOc9znnPOeklE3tUIci4mRRFJ1FUXRGxAAwFRE70nIWEQfV9+oSMKU+Ab7m9/Tw8PDa/xKox4ER9Wf+NA9czj4HvFVrEXHin2RqFzCjLqnX1DVtHQ6onzJ+Q+1IKaVUluUmYASYyJXfqT0Z2wCcV49kjXrV18BktfKZzNr0p0VRdGaC9bnqGDBRr9e71a3q57Is+5oEt9Q7wAzwQ33VbL9er3cDL9SeiDiqXkopJeCq+jIi9id1N3BavaLO5i72pZTS4ODgCvV5RBxTD6izWY+9OW+xNQpwDrgLfFcfq125wwvAm7yFUzm2Pes1XtVis9oA5jJ7Q12ZsR51XSV3SF2KiD3tqwx1sSLoo5ZYv3P6gYWM76wCG4HxCsGHJhHwDBgF7mehm/GHLYKyLLcBk+oDdUy9qN6rCNv0L5loGpj/Y4SyLPsi4nDliM6q14HbueI3tT8iduWtbfnrpNtNPaTeBBaAj2pvSinVarXVy35OqXVMo2ojIlBXVfFfTgJz2sMe76oAAAAASUVORK5CYII="
	}, {
		label: "Whois(dnsw)",
		tooltiptext: 'http://dnsw.info/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4jaWR4Q7AMASE79Hvze2XrTu0bBIRjX44AGCrea6RpAEwklr/FOwAGgMgi+5HgPp4Ah/f9xxpYD+tDQDx8hEgfFryNqACftIgAFRpPZV+DBpUN951TgHVrduA+/EwSQnw/ccTtLslgAvMWymeSmzhxgAAAABJRU5ErkJggg=="
	}, {
		label: "DNS健康",
		tooltiptext: 'http://www.intodns.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABZUlEQVQ4ja2STWrCQBTHPYe4m8OI9AAKbTJi21AzI53E6mJmQKF20Ra6D5I6gUIXBZfZdSEktDNzjrlG0oWmIkaJpX94vI/F7/E+arX/lB19tayF6loL1e2ESf10gJArGKncEjKzXmXzzwAYqbwyAIoUtIMUQJECW8i5HUltCakvhDxrBymAwSc4f3xrOKMn4Aw4wHi8O1rREUYqtyOpy+Ley4fGPs+xz3Pks9UewBIy23hd5LaQuqgXAJfQbB8glCnMFiqGQhm4+DZ2mMQwTA0ME3P5/B4jnxvkc4M8tjy2xGUBuH4IY3Q3MWg4Me5wugYQbrDHYkToGkaoOXgFZxZs5/ZYaYx9npcCLCEzZxZol9AM+zxHhG534LHfuktotgPohEkdihTAIAZX03nDGd0DZ8BBn9Az5DGNPKaRz+bOgIPCKv3KzS1tHrxCFeENoPQPqqiHx3WX0K5LaLdPaOtkwDH9AMkIIs6laIJBAAAAAElFTkSuQmCC"
	}, {
		label: "黑名單",
		tooltiptext: 'http://rbls.org/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATklEQVQ4jc2RSQoAIAgA5/+ftkuBuCTSIQXBdXBBHoV5AECAMjYMoAuOrRsyfyspwMaiPNl4FUDV9QBBrg8wq1wP1L9B9QUHd7M35T9gAW7cCiGxw6gLAAAAAElFTkSuQmCC"
	}]
},{
	label: "網站安全",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVQ4jYWTMUtcURSEj4u2YmGZSh5rsdzzfU3+gq0QLISFhFhom3R2lkLSpA4Ee22sJIaYNkIC1kkpaiF2wUZhk+a95bk+NxemOjNzhsPciI5XSlkCdtUr9QrYLaUsdXEfPHUhM9eBU/VO/VvjDjjNzHV14ZEwM5eBDfUQ+NMSPkA9OwQ2MnO50ffU/YmNXeJRO5G6HxG9iIgecNwifs3Ml8CLBuoQeAuctHjHjcEMsNcMMvNVk6whZOazwWDwHHjdMtiLiJnmBjvAqI75Rv2i/mzhB/C5TjECRpm50z7imnpfD7fV6447XAPb9ZL7zFwbGwAD4KKONtWg5lwAg7FBVVXz6kF9g3fACfB9At/U97XZQVVV85MlGqq3wK/M/Kh+aAP4pP5Wb9XhozL1+/1F9WhaF2oc9fv9xc4qAyvq5RTxJbDy5F+IiFlgS73pEN8AWxExO80gImJO3QTOW6U5VzcjYu5/4nGSUsoqcAaclVJWn9r8D9Ly4rUXRHEbAAAAAElFTkSuQmCC",
	child: [{
		label: "安全掃描",
		tooltiptext: 'https://www.virustotal.com/#url',
		oncommand: "showFlagS.command('Action',this.tooltipText, 'url', content.window.document.location.host, 'btn-scan-url')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACo0lEQVQ4jX2Sy09TQRSHp7aI8RElMca4NS6NK6MLdefG+AcYN8YYNXFj3ApC4d5LgAWuDBqCxuA7KoqGmEAUHxih985QAgVF1LaUhy2lVOjrtvdz0SJo1ElOzmzmy3d+c4RvMknL+ylu+ma4pWbpDMSYTGZI2zbz6Sxm5AetAzO09U9zrX+azkCcbMHGP/0DM7yAuNo/w8G2MS52h7ntj9I1Pk/74HdOdUyws9mPqPQhqk1EjVns1T7OPP1K59gcjb0hRCKdI23bgEN0KcvZzi+IygFcl0zcmkQY6vfSFRUNiuMPxml8HUZEl7JAASjgOHkWczn6QgkOtI3i8ZqUaxK3oRCGROjFvk6XeLwW3p4goulVhL3XRvgQTrKYy4FTAPKAw7OPcfa0DFNhKNbqEqGvMvJaVPcEEZffRBBVPlxek2P3PvPiU5xEOleycoACd4eiHGn/REW9ZG3J4heg+U0E4bVw6Yo1tRab6iVH28e45Y+WTIrjLWSydATmcNdavxssA5b1XLqkXLfYXK/Yc2WYR4G5EgQudH2jrO5fgD+SFoaiTJNsMSweB2L0TMTZWq+Kgep/GWEFUEzbZShEjcX559+ILWXZd3UEz3KQ+v8MdIXLkAivyeHro6RyNueef6W8zsKtr3zlf0dwa5JtjYpgIs2TQAx3jVl8bEg8hireq3xc6v4LwKVLNmoWd/xRQokU6zWLMk3i0SUbGgbZ0aQ41Bqg+V2EuVS2tAerAOWa5MSjCaaSaXa3jLC9QbG/NcDpji/ckLOE5lOsnDyiqTeCqDIRtRJRK9l1eYjJZIaeiXmuDMzwNphgKpn+tQ/FyqOmF7EiSUTHcJTjt0c5ef8jx+6M0RdcAApk8jYFxwbyOKUqODa+cALtZYjTD8d5MDTLT6JH8NO39DItAAAAAElFTkSuQmCC"
	}, {
		label: "WOT Scorecard",
		tooltiptext: 'https://www.mywot.com/en/scorecard/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADTElEQVQ4jY2Ta0yTdxTGz3DGTDdvmVlcnBaEvm3/ldrRl4tiy2ZbVBQp2i6FLiYjdNTMD7NMjIlO0c0Zl+IlUQI1oOWWl7dQgULBLhYqbAacc3GIxjnJMsRL9mEkKkj7+GGBqImJz+fz/PKck+cQvSC/wK/r706CIKiziehtelMJAs3oEDTZgaaU86PDG9Es8D+dqVZZ3tgcPJ+Gq71GhPw6RCaqEO5ciyuXDDgZzEdRIAvWeh5fdW2CvVPXtzOYZSOit6YBF4SkFRdEfvcfA/l4PNaCaGQI408CuNRlgLM2FjZxKaz1PPTiImR5P4oYxQ+f5jTIhqcBfUENbl0z4uHIQUQjQwCAyWfX8eCfUty6ZkRfUANHHQ9bI4+C9pXQCvMhKZ+FXC93k4iIwoFkDA5k4NHIHkQnexCNDCE62YP7f+/C4EAGwoFkZB6WnlUe4O5pXYkoaE6FuY3D8vI5z1ac+kBPbjeLbwzkjv55PRsjd52ITFTh3/t78WuvAcXH5L2b9y/bvtQxLy7xYHw2K+Ueqg7JkCeoYWlNRLpH2k5EFHPu5x13woFUhPyrMPnYjJB/FcKdqTDtX7YzrvA9KdlpNhHFpB+THVcdVkB7UoHPfCoYBTZGREStN1xw9xWiwqvBvb84VHjUo6Z9sd9IiuZLyEzvTN0r+ai8gHcxpB9XIKeeYX2jIkJERA2/H4Dn6i6U+NS4fDEJzkpla6xjQSLZaSYRxUwBUo6w7bxLAe0JBUz1DOsENkFERJX9xajsL8bXXZ/AIXKw1Cb455pp4aud4Q+pmjRlHPSnFdgqMOgb2B0iIirsWF1e2V8Mz28l+LJdC7MoeWJriiuZMpqFRe9uOqH9UVmqGE9xybC5miHXy6Crkx/5P1r1zKTdFzf8NwXZ221BUceacbs/OeTw685Zz376i+YHZeTjo1JkVjBYRYYNgnw4rUoim463pmZekb1dg++6rfi+5wt8G9oGZ6cF+XWZWF2mAl+WAIObId/LsEWUj6VVSXNeXtBMM7LExTaTV3Izz6tEnqCBqUYNvZuD4UwCcmoZbD6Gz9u427oa6frXPldGzcIllublTrMY27JFjB+0NHG3rT75YF4L59vWFl+Q63l/8YvzzwF61aw+aYLiHQAAAABJRU5ErkJggg=="
	}, {
		label: "安全評估",
		tooltiptext: 'https://www.siteadvisor.com/sites/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACSUlEQVQ4jY2TT0gUcRTHB9FVN11EOkTQKRACDdRd/5SkP1ohkK6S0AyDl1AMhA7ezB96yHt5coMV1tQsW2cJN4J1N1YTJsbyMl4CYUBYmMvsyfXw6bDsqJTSFx5834/3vr/33u/9lExmm5czM76pmo6q6QghLljl/HxsJrONMjY+geM4OI7D/6ISPzY+gaJqOq5lE69qJz4wwtbkLAUjR8HI4Vo2rmX7/tbkLPGBEeJV7biWjarpZQGAeHUHmVAfG8EuNiPDpKKjrN/oZ60+TCo6Sio6ysdgF18b7xOvagcoCwghAFiuDnPQPMhB86Bfqjm3wFp92PdzTf3sNQ2wUtMJgBDib4GfzVE/4Si7x3yg5Uxw6DmZUB8r1ecEVE3Htg8xh6f40fSQwwfPLgzMnFvw+bcnL0g1dGMOT2Hbh+UWpJQkEgkKRo5cYz+/n077twOUSiWfm3MLbAQjFIwc71ZWkVKipNNphBB4RY9kXQ/Hr5YA/NJLJyc+31/6wOdrvXhFDyEE6XQaxXEcVE3HzOZJ3n7M8Wb2gsDp6anPj7J7fL81hJnNo2o6juOgKIqi5Hd2EULgWjZLgU7WG7v5ErpHoqGDN/WtLNa1MR9oIRnqxbVshBDkd3bLyRWomo6UEteyeR+IYDR0sxrsIFbXxuvaO2wEI7iWjZSyPLx/odKXV/RYrgnztvYui7WtpII9eEUPM5svP91VEEIQi8Xwih7r1wXbNx/hFT0+JTcRQpz1fRWklFQWrLIwl5Z9Gfb3f/nf2jBSlyb/AdPKVfDSJtJaAAAAAElFTkSuQmCC"
	}, {
		label: "釣魚分析",
		tooltiptext: 'http://toolbar.netcraft.com/site_report?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWPYH3vm/4XMxf8fllb9/9QY+P/fJIP/vzeo/f9xXvb/t7fC/+/95f+/8a/g/5Z/wv8j/on+D/ji8j/sWdP/6OsH/iec/P+fYRgasDJR4T8DAwNWLBvKTrwB5nps/4P82f57hbD+tw5hI92ApV3CKF4YNYCeBhwrUv0fYs37/9AicRQDdELZ/hv28gyFpEyqAQD5u5A3YumsgAAAAABJRU5ErkJggg=="
	}, {
		label: "安全查詢",
		tooltiptext: 'http://webscan.360.cn/index/checkwebsite?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwklEQVQ4jWWTb2jVBRSGn3u597a7xKURJS1osQqCsBIWN2oQDCIS1HAxHFpcBA2KXC5xhWRIUWROvyRLazbaGItmIaGCazrcprvD1Wq52h+L5gaarLHa7p/t9/RhIjUfON/e97zvh3NgEZ93kth/mvqa41zZfBQ3tWJFCxMvHqV+xzFKFutvsLuFJe+e5MsP2vBId9z3j0esbsKnPsTVjZj4BB+txTVf0Fi+j/hN5s866ftjcplapN6t5ut8yIkJfOMgPrIPH9yL0VfxiY/p/d+SwcvhZi1WN6pvqZsNgsfNZZeYm8VgFk+1Y+FOjL2OVGLxezQA0NTLk1qgVqqn1GH1mNlM0tJdcUt3hsxOo39jx2m8rwZ5DuNV2NFFCX9N06h3qTvUEXVe7TM985qxTcgGTI+hV9E/8VIKDzfg1y3oeLgB5xjTZeoGg+Abs5ku0zN1Tk2u89bkQt2pEUwPYXYAg2F0EP0VHQ+NYo45g5j6kLnsWkt33WlkI8ZfwvwkhiqR9chqLN2CuR60Dx1Gx0MZzDDnHJq7xdz0csvezJMXFpJDlUgF8jyyBstewVwXega9gF4OZfAfxpxGr2EwidlrYdNXw079dj15PU71Y/oHzPZi0IW2o+fRH2OjTA7QMNKNh5txZhS9sjDpS8g6ZC2m+9F+tAftuN7ge5y/mFdPUyuJZ2txayM+vAfbTqC/Y/YXLKvGsirMXkBTaCfaHtKesF6MePK76CoAHthD8zMH8OkDeH8NtrVi8DPm+kLmesMGqYh2x/RMTM/HdbDAcz/dU3/jEhNVxCNb6Fv6Mt77DhbtxuqPcPZsVFNx7blNUyt0oFjHVlp7tqgr0bLoHxJVxKNJGihHksh2jFZjxd6oh75a7qffFrqt9XZXttxRf5P5v5QfpKTwberYxhDbI1ITN2//0qEVhwrqHjuSv2qx/l9L8AUMFODD3QAAAABJRU5ErkJggg=="
	}, {
		label: "安全瀏覽",
		tooltiptext: 'http://google.com/safebrowsing/diagnostic?site=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC"
	}]
}, {
	label: "站點搜索",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAABHklEQVQokZ3TPyjFURwF8I8/r5fyUhZRUoqJ/Q0Gg0lGZbJgsxmUiSR5+TOIkWJQBhkUFvUGGZVRBsmCPMJkUIZ7vbxfnidn/J57zj3f+/1efkYKAzhAAR94wylGUF9GRyTn8IBzrGAi1vJ4wjZafhLXYgavmEVTgs9gDPfYQUPSIItHLMY2ymE0XjKeJHK4QfsvYkKbeaHFIlI4wmGF27+wgPfvhTROsI/qPxhMC9MpogobuEBjBXENdnGbJAaFeQ9XMMgKk1hNEhns4Rp9ZcRdOItJO5Ox6tCGY9xhORp1owdTuMIler+LU8K2bQnL0Yz5eLgQ4xaEnjejYRFpTOIFa0r3vDUmGEI/OoRtLUEOz1hS4ZOUw7rwmv8SfwIjnjkY6akXagAAAABJRU5ErkJggg==",
	child: [{
		label: "維基域名",
		tooltiptext: 'http://zh.wikipedia.org/wiki/Special:Search?search=',
		oncommand: 'showFlagS.command(this.tooltipText, "host","&go=Go&variant=zh-cn");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII="
	}, {},{
		label: "類似網站",
		tooltiptext: 'https://www.xmarks.com/site/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4jaVTvWoCQRicKpBU9ml8BN8hZZrE0tY8iMXdNoKdpdiFIBGxSRfM7RIlGDxMiEQsjuu2MHjg4REsJtWd9+cPZGFhd76d4Zv5WMB4voSQDzDVD4Ti0W2qXwj1DtMyUOucAUL2TyLmilkGYMo1hOLN4+xk4u6tXCAESbI91UfJ7akmyZ2dsDBwvUik0BhliIXGKCIPXG9XCw+OFzBctvYTIoXGiLb2o7rjBVmBsIO4yEV9yPP6a4K8twMIxVJrErVJkuXujOXuLLq3p5ql1iRpLy+oYnNMxwtY6X/z7mlBxwtYbI7zgz2U9NX9J687X4cnlAZqyiVJ9ubLCOvNlyTJmnKPC6yC7d4prIJtrsAmDtjaz/VbbI5paz+NbwBT2fFHmZRTU0qKyw/AeLn9x2eqAAAgrCqEHKbt5JPkGqZ8g7CqAPAHiSeO3LTeV9IAAAAASUVORK5CYII="
	},  {
		label: "類似網站",
		tooltiptext: 'http://www.similarsitesearch.com/cn/site/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC60lEQVQ4jY2TbUjTCRzH/0nqFttUEqJXcUFcBx306qgoKCiQnh+OqIu4CpyZ7sHtv7/rySi1aV5315P0QC+yJFun20rNctt/c+pMnWaZ1jQri6tssyfJLqTPvbCIKKHv69/3A7/f7/sVhDF0szOM199MfbCDcN+/RAZfMtbsF3LUBBFzT7Mmo5BFaYUsNxVjPlzNJc8NGlu6iA6++jYo8uI1BUftLNUfYWraadTaUpRb7Si051FuOcN0fQlaWwXinmLC4Z6vIQcOlbAg/S9U6XbiM5yoMl2odU7UOgfqTBex2xwoUi8wJUXPr7+lE4lEP0PcvmZW6f5Ak+kgXl9FfOZllLrLqA2VaIzVaIxVqI2VqLKuEK+1M+/3XMpdtaOAt8PDFJ/zMsNSgWCUSbL6+Cm/gan7AsRleVCKMglWmYRsHxNED4LRx4/mcs7aa4lGoghPnkU5crEJheEqc4510vroDQBv33/gZPApSTlNKLc3EmttYOGJW1TcGmR2YSM7T7rpudeP8LD/Cfnn6lBJMl0D7wAoa39O6PEoqLTtOeMsQYQMP3trHwOw5MRN1uc5Cd3oRrh95wEb8xzMOtgEwPn2CIIhQOLuJgJ9rwAoaR1g2z+9DAy95+XwCD/kNbN2VwktoU6Eru5eflmhZ26Bj6dDI2wuu4tgrme8VM80WwttH1cCGPpvhC32XhRmL5uzDxPuuT96yNXrtCSv/5PJua0k7Qig2V5HojVAnOhn0p4GUo53sPJUBzOLWhBMAWaYL7Jz76HPb3RVyWyQionbWo5S8pNg8ZJgkUmUfEwQ3cQYrhFjcBOTJZOc7WFp6j6qauQvw3Spuo60IicanZNYs4xKlNFYvGgkLypJRmHxkyy5mZ9qw1Z0/Ntxtlc2kppXxs+mMiaaalCLbjSSh2TxKtMNpaRsyiG/cAzzJ8n1IWx/n2GTeJBlGQdYnLafNdocTNYCXJXu72ukIAhCT+9Drje3EbweojvcN6bxf3NTD5HdL3rAAAAAAElFTkSuQmCC"
	},  {
		label: "相似頁面",
		tooltiptext: 'http://www.google.com/search?q=related:',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgGMzAl4GB4T8a9iVWcwtUQxADAwMvFAdBxVqItVkQi5wgMS6B2YwLwFyCE3xhgDgZF+CluQEUe4HiQLRjQMQ7ydEI02wHtWUfkmH7iLXZDp8iXECaEs3IhtAfAAAJGiQnfMavIgAAAABJRU5ErkJggg==",
		oncommand: 'showFlagS.command(this.tooltipText, "url");'
	}, {
		label: "反向鏈接",
		tooltiptext: 'http://www.google.com/search?q=link:',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgGMzAl4GB4T8a9iVWcwtUQxADAwMvFAdBxVqItVkQi5wgMS6B2YwLwFyCE3xhgDgZF+CluQEUe4HiQLRjQMQ7ydEI02wHtWUfkmH7iLXZDp8iXECaEs3IhtAfAAAJGiQnfMavIgAAAABJRU5ErkJggg==",
		oncommand: 'showFlagS.command(this.tooltipText, "host");'
	}, {
		label: "反向鏈接2",
		tooltiptext: 'http://www.google.co.jp/search?q=link:',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgGMzAl4GB4T8a9iVWcwtUQxADAwMvFAdBxVqItVkQi5wgMS6B2YwLwFyCE3xhgDgZF+CluQEUe4HiQLRjQMQ7ydEI02wHtWUfkmH7iLXZDp8iXECaEs3IhtAfAAAJGiQnfMavIgAAAABJRU5ErkJggg==",
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain","+-site:","basedomain");'
	}, {
		label: "內部鏈接",
		tooltiptext: 'http://www.google.co.jp/search?q=link:',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgGMzAl4GB4T8a9iVWcwtUQxADAwMvFAdBxVqItVkQi5wgMS6B2YwLwFyCE3xhgDgZF+CluQEUe4HiQLRjQMQ7ydEI02wHtWUfkmH7iLXZDp8iXECaEs3IhtAfAAAJGiQnfMavIgAAAABJRU5ErkJggg==",
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain","+site:","basedomain");'
	}, {
		label: "Email搜索",
		tooltiptext: 'http://www.google.co.jp/search?q="*@',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgGMzAl4GB4T8a9iVWcwtUQxADAwMvFAdBxVqItVkQi5wgMS6B2YwLwFyCE3xhgDgZF+CluQEUe4HiQLRjQMQ7ydEI02wHtWUfkmH7iLXZDp8iXECaEs3IhtAfAAAJGiQnfMavIgAAAABJRU5ErkJggg==",
		oncommand: function() {
			showFlagS.command(this.tooltipText, "basedomain", '"');
		}
	}]
}, {
	label: "開發審查",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGElEQVQ4jb3TOy/DURgG8F9dKjGowcRADUIwdHLpRCJG9RXEamBAY7H6AMQn0NnOQInbiJFJ7EYJYejbtP2njTB4kic5570973nPOfwD0ugPpn+bPIsSLoKlsLVEB/LYwh7uUMR4sIjbVkXasREB+zjEKlKJuG0coTNZII8bTMc+hba6dbXQJM5VZtKAnVBuhiWsheooHrBYdXZhJYy7YRvDQKwLeMUbFtCNTVxhDtZxGYF9yOERxyozeMEnDtBb11URJ0K5UOfIhe0L7/iIo/UkjjWBJ3jGSMI5hftQbpbcUCDZQRXT0WamiY/KdZ5Sm8EyhpENDmIomK1j9UFdY57aLZygjLMfWFZ50jPJljIJ1Vb806dqiW9kvzxuhp8KgQAAAABJRU5ErkJggg==",
	child: [{
		label: "BuiltWith",
		tooltiptext: 'http://builtwith.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABeElEQVQ4jWNgGPqgfVFrZd2cmpaV+5aFkWWAdKDYK05n5v9xzZHLKDbg3rN78m/fvuUjy4DY5sjl/O6c37ldWH8ltscufPbsGdfZG2f1Vh9YHbrnzB7HS/cvaaw+sDp0+7Et7lcfX1VZfWB16JajG70xDOB0Zv7P6cz8P6oxfEX5tNJuTmfm//a5NkfbF7VWcjoz/9eL17o2Zd3EbE5n5v8qYbKPUQyonlnaqRWjeovTmfk/pwvz37jmyGUEDZAPkXrK6cz8P6DadzMDAwPDpDUT8mCucMqzO0TQAM9St12czsz/uV1YfiW3x8+XD5F8zunM/J/Xnf1HVm/aDE5n5v/K4bKPQmr8N3I6M/+X9Bd6Hd0YvgImzrD37E4nbhfWXzBbYbhqVkXH+kNrAtDFkXFUY9gqBgYGBoZdp3Y5O+XaHRL1FfigF691feKqvnxYLNXOrGyVDRJ/YZSke2HV/lUhIdX+66QChN/6V3hvff78uShZaWdwAQAt8syRnVYeggAAAABJRU5ErkJggg=="
	}, {
		label: "W3C Validator",
		tooltiptext: 'http://validator.w3.org/check?uri=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB10lEQVQ4ja2TT0jTYRjHd34vUoQQBEOD6LRTCCUdg64R8UJZRrhWeUmS0jwUyaC69OcgobxMp9tsjdqwBDcwGbkxczRGZA2d/TFrOCvTTZ3bPt1e+bFTq+f2hef7ef7xmAA7sMnfxyZgNwHFKswaYvoHMwAmgPoLHrq9cQBiqQy7zgyQmM/qpC7XFEIqdp7ux3zejZCKK47oNuD4nSD7Wx9rQ22zky7XFADFUpnas06O3R5j8UeOxs4AO5r6ibz/vg14EkkjpGJpZR2AOpubQx1+AKIfMgip+PYzx2q+QM1JB97JOeMIq/kCQip8kTS5jS2EVAipAOj2xtl70QPAwWt+6m2eyh0AHL4eoN0RpS84w4H2pzR2BvCEZzly4zkdzhgAljYfQiqa7o2z/HvDCHj44i17WobYd2kY7+Qc90eS7D43RJ3NTSixoCuOvP6EkIrW3ldGwJfsmm59vVDkTTqLkAqz1cVWsWRou+aUA0ubzwgAsFz2Yba6tBZSYe0Jk/mVZzz5FYBSuYyQioarzyoBzQ9ecuJuSOujt0YZnEgxPbuEkIq+4AwtPWGEVDwae1cJCCUWGI1/1tofmyf5cRmAm8PTesTBiVTlFaqN//JM1b5zAbD/AVj9e1D9RukIAAAAAElFTkSuQmCC"
	}, {
		label: "W3C CSS Validator",
		tooltiptext: 'http://jigsaw.w3.org/css-validator/validator?uri=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZUlEQVQ4jb2TMQ7AIAwD/fQ8JQMP8ZO6d3AnUAUtCkHtcBPmpFgJAGgTSOeRogl6asC9CIBIxgVm1gcG8VTwEnp8/0YwI1xi5PP/ApKDbLmDu2xL4F7iApJtI1Mj1HC6g9QxrXABNY/jTAoGzWYAAAAASUVORK5CYII="
	}, {
		label: "Validate.nu",
		tooltiptext: 'http://validator.w3.org/nu/?doc=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB10lEQVQ4ja2TT0jTYRjHd34vUoQQBEOD6LRTCCUdg64R8UJZRrhWeUmS0jwUyaC69OcgobxMp9tsjdqwBDcwGbkxczRGZA2d/TFrOCvTTZ3bPt1e+bFTq+f2hef7ef7xmAA7sMnfxyZgNwHFKswaYvoHMwAmgPoLHrq9cQBiqQy7zgyQmM/qpC7XFEIqdp7ux3zejZCKK47oNuD4nSD7Wx9rQ22zky7XFADFUpnas06O3R5j8UeOxs4AO5r6ibz/vg14EkkjpGJpZR2AOpubQx1+AKIfMgip+PYzx2q+QM1JB97JOeMIq/kCQip8kTS5jS2EVAipAOj2xtl70QPAwWt+6m2eyh0AHL4eoN0RpS84w4H2pzR2BvCEZzly4zkdzhgAljYfQiqa7o2z/HvDCHj44i17WobYd2kY7+Qc90eS7D43RJ3NTSixoCuOvP6EkIrW3ldGwJfsmm59vVDkTTqLkAqz1cVWsWRou+aUA0ubzwgAsFz2Yba6tBZSYe0Jk/mVZzz5FYBSuYyQioarzyoBzQ9ecuJuSOujt0YZnEgxPbuEkIq+4AwtPWGEVDwae1cJCCUWGI1/1tofmyf5cRmAm8PTesTBiVTlFaqN//JM1b5zAbD/AVj9e1D9RukIAAAAAElFTkSuQmCC"
	}, {
		label: "WAVE a11y 檢查",
		tooltiptext: 'http://wave.webaim.org/report#/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADbUlEQVQ4jW2Te0wUdADHf3/kWOsxHjfYQhqQYzB5KN5xHMfxuo4jQGUZXYzMB4/gOqDCazwHDjDBKxWDeA857hAPuAPhQg8lZ0wqcMr0ChmDIdlcudU/1art03/ljM/fn89/368Q/+clLw8fQ0hIiCNKFrW6W7Zr7ZWQEKf3c5JjQojgLfz/eH6b13sxStmGvjYPk/U4XVfO0OM6w6cXmyhrKCYuQfHI6wWfyi1jiY9vc/bRLPquteJwm5lwm5latuJcGWJy2cLUyhDW+U7eKcnBz8evVwjxzL+xVKow5Op12BZ7Gb87wITbjGtthNn1ca6u2pndcDC1bMG5YmXqvpVC4yEidkYcF0IIUVhY9vKOoB2PW23NXF61Mfn9IDPrI3y5NkGWbi8JKfE4l4aZfTDG1H0LVzdGsV7vJCws9HdtfGaU0Gq15dHSaHLzddzYnGR6dYj5x9PUmIxo0tRkvbGPvJKD3Hg4gf1eH9c37ZTVFBEWGopandwiVEmq6abPa4lTKZhYsDC7aWfuRyea9BRMPY0MubqJiZUyttjHxTsd2G/1kahWYWw0oMlU3xRxifJ1xy0LyZokTg+cYOHXGcYXBomRSzHPtHPp9gAxsVJM1jps9zr4ZLgeuULG+WutqNNVD0V8svyBa2WUtwveQm/Mx/3nHGctJ1CqYhlZ7GZ0qZvUzBSKqg4x8l0H+tojqNOSMM+3otLGPRLhUTtnRxf6aWirIS1Tg/u3OQwVBezXpXPhdjt9X5/ioOFNXjugYXipnYzsVHKKXuf05XoipRGLQuIpqf24vw7Ht4PskUUz9c0w2gwNHzYW0XOzmVOuKoxn9Uhjoml1NCGLlWJsK6b03FG2bw/4TAghQrX7X/3lqx8myc3XERkRSXxiHF2uFlqmK6ge1dM4foxErZLI8EgSUpU0TJaj3Cv761nhrRBCCOH9oqS+0lTGF+4L5BZkc/J8NV1zJ6mzl1A+dASjLZ/32/NIzU7mo/5Ccqr24ecb0PHkkj0CAgKHK0ylTK9ZGL7bhulKFbV2Ax8MHabYnEP52GGqnUXoqjIJCgpyCeHp+fQdPHy9fFtSD6T8UdluoNFhpP5SKUZbHu/26tA1ZBCbEf23v39g51bxE2yTB/oHntmj2L2oTJP/pEiT/bxLGX4nODi4QyIkSU/b/wCyVuaeC+U/VwAAAABJRU5ErkJggg=="
	}, {
		label: "SSL 服務器測試",
		tooltiptext: 'https://www.ssllabs.com/ssltest/analyze.html?d=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1ElEQVQ4jX2Ty04bQRBF6zMQ8BP1E9nBLgt/mB0Hgg34IYFfxHhgAZEikm/wyuN59DwwlkIkZKSwOVn09NgIkpZqNX1vnb5VIyIiH++W7I5S9Poe6cRIJ0a9HGlHSCtCJzlyGiEnIXqZsXNm2L9dIE4s3RjpxuhVYdCOrEErQk4Lg5MQOQ7RcYY0Q6QRsHezQHZHqTXoFAbtCGlHDKIV7gyiFXIcIs3CoBEgRwHb3RjR63v0ylbl5xL18lLsJc94ybM1CVfoOEO/puhFio5SdJgg7s2b2E7ssD1jTaQRoBcp8iVADue2nFja67BKgwK7NDgK0FG6Fh/MEfVy1MvRSU7lx5Lp7xf+daaPL+gwsTVI0H6CuFG5tIE3aTtswL77YI58niN1H3Fia5BZgyLt1uyJ1uypxAbQQbIW131EJxZfJxmVu6W9NM6ofH8o0SvfFugwsd/6Cdo3tnoGcRvmsDfTdsdhWwNjO3/ykZqPOLHDfi9th10aOHHNR/QyswtSYE8f/zOFX3/QnlnXuUF2zsybtOVw/irtTWztGdu5OmOrGSL7t4tyt9/Dlrr/Clt7BqnOkOqMD15u/8i9mwXb3dh2LTZM+0k5qrJrzUfPDVvNsBT/BYjk09Pw0KheAAAAAElFTkSuQmCC"
	}, {
		label: "SSL 檢查器",
		tooltiptext: 'https://www.sslshopper.com/ssl-checker.html#hostname=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEElEQVQ4jX2Tb0zUBRzGv5O0UPojS0JH5hAh/hzin1dOReMid7HcTFrhMjdpgOGf2xEHCjJRS6digj8DKbHWTKa/37HIWrimMt0kBoYYcCgqTkJ/cHocyJ0HPz6+wF7Ssz17tufFZ8+bR0REZE7Ca6vs5buzFYcju1RTt5Zq6rYyTbWVaapN0dRcRVPtiqbmH9PUggqHw3ak+kSEef0Cea7JqSU1537ug7Mu0FzwyyM49xjqPPCHB+oG4E8PXBiE+kG46gO1pUcPjYiJFYl7f0lmvZuvumB3O+ztgP2dsKfNoLBpmMLGJ+xvG0G5DRV34Lu7UNUNNW5Iyig6JLJwXUrKb/3kd8CXNyD/H7A2+am89pjr9z209niobXdT1DTMwVtQchPKuuCbbghdbftWxJRmWep4yOZW2NQMWc3w9d9P8fkNWt3Q+Aj8Y3Dmppfc67CrbXxhrhMCVlkVkYQ0y4LqXjY0wmdX4ONLcOo2dA/B55dhfT1c0aFzALY0gv0a5LVC7AUQ83NA7MlePrwIa8+D2eGnssVHh8sgtWaID9RB6u6M0OEaJe13L5mXIaEW5DRIsk0RMaVZIssf8N6vsOIM7Lo4xEOPD6/fwPngCe29Q7iHR/CNjFLd4ibqh1GmHIfAn2CS2aaImD61hB/pY9lpWHwC6rqYUP3DMKccgo7CK1UwyZyjiJg2WGYfcLHoe4grg9r2iQE9Hog6CtNLILgSApLyFJHodMvMYjeRh+HNYjjbMjHgXw/ElsCMfRCiQMDK7YpIdIbljR0DvFUMM3LA0TwxwO2FhH0QWgwzD8PkxEJFZN66lFnbfYQXQpgVrD9CQyc0OOEv53g2OMe7qnqILIDZRRB2EKYm7akQmRYSH2PXvTFFEGWFyCyIy4T4dIjfCKZ0iMuA6E0Qvhnm5kD4TjAdgmnzP8kTEQkIW7TxwFJb5+CKnP6xpG26Yc7WjeQs3UjOHM93v9CNd7bqRqJNN5bb+8aWFNzzv72m9LyIhPz3yCnywkuJgUHBHwUGvbr2/x2c+uLUl1NE5HURkWcRXLN2a0bCxAAAAABJRU5ErkJggg=="
	}, {
		label: "Header Check",
		tooltiptext: 'https://quixapp.com/headers/?r=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACiklEQVQ4jZ2SW0iTYRjH//ve79tR80RpokVojBIvwlogFrJiFybmacQaVh4uRLuyA0lYoy6kNKSlGRQGERUSTZGQQDQhA9GWKbIybdE0p2PYdKudny7yItmE6H/7vL8fPO/zB6KEDJDS4C6lZ0i5n0bSM8gAPtq7SNAIiftpynnf8N7pwNi+EE2pKGTO8YffZY/7h9OrCBBtCtsroFhpizFRXwqFXqaSx5Q85u3Z9sL3KmWKxncSvd9BwddJHdQNFl1QL77ub5GQ+474l7tDrCeAAwDSQhzoVVwID8SG6U0c+ftjqyPgz1psna9kS57LAi038W3fiuSphvw/e6+1ymudDbL0gEn2nAZjKNSjmCQjJBsEn4r5I/MnGS3VsrC9hlfb66SPXdVIBAD33cQGjzHe5H8kVJBJTsFnMh91S5QbBB+PMa2tlJFVz3yzOl69UCezORoTCtdubN/jfpj2wNMeF3DfkjQE7sso2CWnn13CwQ2CaQ2vni3gyFrChWfKUfi1QrC4rsbTj840X6ArmVZvSmZXDbJLoRYp+W5LvHRPsnuDwKJC0pRatGgrYjRTzBknC5Btr2K9znNicl8R08pFfsB1lvVSE0/ea8L4tAHiiI80H0LTFw1Hc6Wcb+EUqyIt2PfTXKerTqDlet7rLEHYWw5y10AX9YxD+ZCa87gns0c5mi9jZNOLJmzFGF3U8+SoFchxWORfyETzZmViAIScBMT1HUDj21yRxZyL4GgGaDKPCzmqBbKfYfMGJVIBCEBktbn1gRQAnwUktmciq1VATr+K6RZ0LOioEWjiBK9Zh6O3MVqIILKW8SM2PbM59djyz+DfmTvOKq0lfPN/wQDwQQOFRYWkaLPfDBcdeek0cmkAAAAASUVORK5CYII="
	}, {
		label: "URL 解析器",
		tooltiptext: 'http://urlparser.com/?linkFrom=flagf1&url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABB0lEQVQ4jbXSzUsCURTGYf/pG0hQqxBulJSbGWhR5GKiIHAjLQpuU6b0IbPQyLJiDAXBHE1tFJtfCzPMPsYZ6IWzfJ/D5Z5I5L8ipGJyQhcDQX7lPyEhFfHNSzTDYmHtFCEV0VUTzbA+J5HMMx8/+Q6M1bLtAKAZFkIqYnqO6bj9IVv7ha+IH9Du9NF3LDL5KgBO2w0GPLdGBblxDsDwzQsGdHsDdtM3XJcbANw+NoMBk7mvOCxp2Z+B4t1oQzJVREjF+vYVAPVGj5ieYzGR+f0rhVTsHZQ+3vzKUdamVu8AcHhm+9+CkIq5ZUX6+IFmy8Xz4KU7wLx4IrpiznaRoa9wVsi3GCbvwhD0UutMHFIAAAAASUVORK5CYII="
	}, {
		label: "編輯頁面",
		tooltiptext: 'http://www.printwhatyoulike.com/print?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCUlEQVQ4jYXTaUjTcRgH8McusqjogKIXBYHQiUiH2IVQaFBmUpYVmpWZ0iGKpUZrKzvISSKmpVPTldnm5t8doa2/7VA3jzUXtnWYDV2OOdncZFBQ+e1NCpHWFz6vfjzP83tePEREBCAAQAAR0bOWrOAixQFugXyX4ElLXL2kI75GZjyZ22jKPlpamjyTporRIl5xX3mo4Xbd1rFHmihoes+gtS9lQktfCjQfz9pM/feyLRbLrD+KK2SX5+VJI3p4tVtQ/movXn08/Q9JMH3JrwIwbfzXdFO0s5BTsxF36reh0ZqApncn/tJoTUCuOAwXH65BnTF2rHugMJqIiG7XxyzOEYb4c4QhqG6NgvztsUnlCEMQnh6I8PRARHOXoKE7RU9ERFcfh+25VBUMTu0mSMyxkE5C3pPoLmLOH7hYEpF8+EbQ8/CMuTj3YN1Xt7t3PmVUBh9Jr1gPvnInal/HTIoxn44f31etVs/IKYvJjMhaCPWH/NWUJQyLvCBYgxL1bgg79/1FZDpaZ7PZZg8PDV13u92nPB7PAgDTT+aFNqQWbF9FbM/TpZerQ7+WtUWgXB85QWCI/Pm4K7a8iZFIpNXVg6a2NrhdLox6vS7fyAhXrinbXKsqWk5ERE/16XkV7TE/Kwz7/Y86Dg6ITGdePmnIuvaCYXpYlsWo14vyggI8Ewjw+f17jHq9GPV4HAAWEYCAmq5TCY4R60pzZyeHz+NJ4qOi3pyNixvL53KhkEphNBpRyufjVmYm7mZng5XL8clqtTocjjnE4/GmiU1pEp/PF9RrsQy1a7WoKi5GRlIS2nU6KMViFObmIvX4cfDS0qAUidCl1UKjUIw5nc4NRERkt+sDiYj8fv8yr8dTPOx0fuvQ6VDC5+NCYiISo6NxJTUVrSoVNAoFWIZBp1bbPOVd+FyuIJfTKRjs7//BKpXI43AgqqxEs0wGlmHQLJN9N+l0a6dsMB7HwMAO5+CghZXLof49mWUYGFSqwok7+F/sdnvgO7P5vF6lMrY0NYm6DYYTNptt9vj7L6mnPDF0znLsAAAAAElFTkSuQmCC"
	}]
}, {
	label: "鏡像快照",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSElEQVQ4jc3Tu0tcYRAF8N+GXVhWs+hGAiIi+Fh8gA+wyDZCEPf/MH0KNUXKZUmagNikSGETxEIb7S01uEUaQUQI2gRB7EQIQghrceeCXJSYLlN8MN89Z+6ZM/Pxv8Uz9GAIvcj/C3kYqzjGJX7gK2rI/Y08ie9o4wItnEW+h+4MvoaJNHmOnQCvo4oi+vAWcxnyaKjbDa46brCPF3E5J/EgjZd4jYrEo4Pg1GEl/t4I8Hv8xgYK0f9n/MGnwDSCsyyONprx8R1+RTv5KLCGW3wITDM4SzCPaxyG1BJmQ2oaFbxCOTCt4MxDB7ai4qZkImUMRjsLGROrOMF2cMEYvkWRKxzhp8fHOIORzJ1+fMRpyDvHF0x7wiJBV/S5KDH2jcSL0lPInZLNmpV4MI6pyAceUFBy753kJMtTiULp6AqRFzLkfKgtwh2F4z1a0Vqb4QAAAABJRU5ErkJggg==",
	child: [{
		label: "Google快照",
		tooltiptext: 'https://webcache.googleusercontent.com/search?q=cache:',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC"
	},{
		label: "Gigablast",
		tooltiptext: 'http://www.gigablast.com/search?q=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADDElEQVQ4jW2KS2icVRzFv85MJomKC+ur4kIpbly4sYlWY2amkSYoxnSQaiGmNraNFUGEZqGxghZFo+ADHwvdGESIaOIm1LYgLUoNSChIiiUJfVg1D9LMdL7vu/e79/7v/bkoFkXP4cc5HE7EFQUIl+Nf2//y9z0QEQKBgOBxXrBicN4iQZDgrvBPe2/BOiwZUUAIweODxfkEZzTOOqzRaGfRzvyHS84iNkUQIhcCVhQNa5k+p3j960Uef2OVjhdi2p/RtA0pNu1VtA1p2vZq7t6d0D54npnTa4h3RCKK842Ugakl1u+LKWy15EqBYqdQLDnyFUe+JOQrlnzZUigLTZ2WTyfqWJcQaZXy8Mllmo8Krd0ZTRXFzb2OuwYUmwdTNj9d577BmI6nEu7fpbl3d8qmZ+t8PBljtSeamr/E1YcbXDOakusy3NmveOkDxxdHE779qcY3xw3jP2Z8OV3nq2nFoROa70+k/HrGkIkhemuyQeF5R/P2Old1OoZGDWfOWrQJTP2g2bhtjduqy9xajdk4sELfK3/y+ZE6NaUIEhMNf5aQf1DRXDI0dyW8PxFjMkUWNJPHFimWFbmKptiRkesSijscTT0XqQ6vsNRoEH00sUK+pMhVYgqdhgNjKdqkeGuZv5Cy582U3v0NeoZj2vvrNO9MKD6R0lJKeXt8iWjunGFDzxq5iiL3gOf2bcuMfVdnYXWR32oNjp2ucWgm5vB0wr6xhNbHDMUtMevKgScPxkRaaw6OJdywNWbdFkOhZGip1LiuO+GWR1M29Cpu6tNcX12ipXqRfLdQLFnWP5Qy8oklcj7w+7LjnTHNPXsSbnykTmuXolAx5EsZ+XJ2uVcymsoZ13an3LFDseu1hOM/K6IQAt4bluqGIzOGD8cz9r+XMfCqpnpA0zei6BtRbH9R0f+y4rlRzbvjiulZIVGeCA9BPOIzjGgaacYfq8LcBcupBcvsvGF23vLLnOHUguXsoqOWekQcwRsiHzRWhMyDcY7MC0YE5zOsWJw4nDjEGbzzeBGcCN57RIS/ABzCMmCoimPmAAAAAElFTkSuQmCC"
	}, {
		label: "WebArchive",
		tooltiptext: 'http://web.archive.org/web/*/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEBElEQVRYhc1YyU7kQAzN1hwQH8INwYHf4oqQWCK4gNj6zj/0nSyVdIt78wFI/ADcIZV4DiN7XK6qLAMjJlKp03FsPz/blaoKwjCEIAhoRFEE+CyOY0MWhiEkSUL3/Lm8l3Z9z1xDvDesgEphGEIURVZAQRDAbDbzBipHHMeDYJkfv9DHEo4kSXodYVBjgMhsMVlgsTKUEkxzEASwvb0N8/kc1s9reHt7A6UUpGnay/4QaG7fYnBra6tXeX9/Hx4eHuDl5QXwatsW+NV1HQAAaK1BKQXn5+ews7NDtl1s9RD0h07J5N7eHhwcHMBisYD393cDjNYamqYBAICPjw+SfX5+Gu+1bQtaa9BaQ9d1sH5ew+XlJezu7jqb0FEaNvKu66BtW2jblthAZ5ItZIy/h/dN04DW2sku2nt9fR1Ku91hY+ifquMC4Kv9QYCYQp4qZJWzIP+7GJX3mAWeDRmAdx7EiGThY63hc/4fL6w9Hhi3obU2AuJBDWTFFkpg+OuqMwlCgpMsN01jNFrXdQZrjnLx15CcaEfWzKTa7bNpTDOyiI+PjyniNE0N+cXFBTFycnJi1c7Z2Rmxd3p6athN05R0Dw8PxzROABsbG5ZQKUWpu729Nb65WZZRTZVlaTmp65p0lVJGhvI8pxRXVeVl1poH8QF+ZqqqsgzhO1VVUV0ppeSnCfI8JwYxAAzw6emJZEopsolyJ4OyDsMwJBa6rrMiRYDIkCyR1WpFaVwul15dH4Ojlls8xdIQylzggyCAsixpKnHpIngMbmB8DaDLCQJ0gUCAPt1JAPuc9AEsioJ0ZRMVRUHzpKvBRgMsy5KaRIIoy5IAupxwgLLB+jLzVwBdLHGALgY5w/+Mwb5aGUqxbCK+mh7TxZOa5KsAfbrf1sU4oQ4B4HNXXwnwDp+cYj6by2J2AQAAWK1Whi5O8lgedV0bDvlXSE7izuHbGvq6eDabwXK5JCdZllm6j4+PFvu4b8bPIAA4db2fOhwItigKAlEUhaGc5zmtjpHBMQ0WRRF1MXa46yRCLP9scEmSGIsFWUdchuB5ABgcyrnDuq5pYYt25TpgVJPw6WCxWJCRKIogyzIA+L1WlDWWJAnVYNu2llwpRcFxWc/C1X4YRRHc3d1Rtx0dHRlG7u/vycn19bWlz+U3NzeGbD6fU+BXV1c+1kyAAxQb0fk223JNOGaMPHKxFbA58MKCb5qG7uWmybXJ53aknNtwAfWeLIRhaDhBQ66TBrkfHnPxANGui0Vr2zn2cPG7h8sv7pEsBuM4pj2wPFHgDE4ZUs9lS2ttHYAaAHmBuzbcaFieCIxNad/Fjz+8AF2Ub25u/kjKewHKevipuhRnld9/pDEVzGgG/6eB08wvrYg105qsOMQAAAAASUVORK5CYII="
	}, {
		label: "Google(限文字)",
		tooltiptext: 'https://webcache.googleusercontent.com/search?strip=1&q=cache:',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC"
	}, {
		label: "Yahoo!快照",
		tooltiptext: 'http://search.yahoo.com/search?p=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVQ4jV2RS0xcZRiG3/l7zn9Ku4F127hyqUFnzthTGFJoGaZOmCmkHVqKMdq68EKRAGFahVKSUsCApoPdcDOOYoSZJk2KXVgSKaVNmhiN2jQYoxvZGRftmnlcIFPjl7z57pc3n8LqJKIuwupaC6vnnK8PDlRrqHIHtcpW1epqVbWGKl/R0P6Ius+G1fVgu6cTRZUlpo9o0BRx+ymHQ5PEzCgxM0qtuUKtuVL2D4cmaVCOBk0R0zhRZVGgS8T1GcdDN/nzt78BSDsFUs4Sze7XpNxFUs4Sx20RSvD7L3+R1k0aNUegSyjQMEkt0eZ8x4ev32NHTtu7nLKrnLKrtHt3y/GBN++RMasktUSgYRToMsnQIm1mjdfchzz64Q8Apt59RId3nw7vPhNv/ATA52Pf0+E8pM2s8WroKwJdRoEGnqRMkZPOCu3uOmfssyvOeOt07F5/5tt12t11TjorpEyBQANPdFAXN5vMPK3ON2Tst7R5d5gdfgxAfvxXPnnrZ0olmB1+TJu3QsbeocVZpsnMc1AXNxVVdqPJzJN2i7TaW5zwlsnsuc1/pVSCzJ7bnPCWabW3SLkFmsw8UWU3FFV2I26mSboLpG2BFq9Ia0WxzBtg7MyPtFbcoMUrkLYFku6XxM309gBf/ZsNJkfCmSdp8zR7edIVC5x+vri9fatE5rlF0hULNHt5kjZPwpmjwVzDV/+mIup/WmcmaHSuE3enSdgZjnkzJPfOAbC1VSK5d45j3iwJO0PcnabRuU6dmSCi/qfy1UdNaIR68zFHnBxH7TXiNkfcmypTiHtTxG2OozbHESdHvZmkJjSCrz4UUQ+BhqgxI8R2jVLnjFHvjtNckS9TaN79BfXuGHXOGLFdo9SYqwQaIqIeFFY3UV0g0ACBGSQwgxxyB0nsmyx/ILFvkkPOYDkfaJCoLhBWNwqrC1+9+OrDVx/RUC++6SX6P/imdzv3b52vXsLqQmF1so3za2GdP+frnQPVer/yBb1dtaN37BfVuf8lvXf2ZXU+2On7B+kzEw3V663qAAAAAElFTkSuQmCC"
	}]
}, {
	label: "便捷工具",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiUlEQVQ4ja2NQQqDQBAE6+v+RyUIQkAQcsjBix/wAX4jl1WGZrY3gTQU3TPbzMKf1AG9QCVfdPHAKAfHZF/rAPAw7t5uTXJ9SrLrMCcQ3HWsnoWmlkLMcXYOwBrc5VX6Tb0K2Rz3vBPim3MANvl5+9Jv7cYjWQeAQw4eJmsXgAE4BcR1N2SHftYHOcZOEltHUS4AAAAASUVORK5CYII=",
	child: [{
		label: "二維碼",
		tooltiptext: 'http://atomurl.net/qrcode/?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiUlEQVQ4ja2NQQqDQBAE6+v+RyUIQkAQcsjBix/wAX4jl1WGZrY3gTQU3TPbzMKf1AG9QCVfdPHAKAfHZF/rAPAw7t5uTXJ9SrLrMCcQ3HWsnoWmlkLMcXYOwBrc5VX6Tb0K2Rz3vBPim3MANvl5+9Jv7cYjWQeAQw4eJmsXgAE4BcR1N2SHftYHOcZOEltHUS4AAAAASUVORK5CYII="
	}, {
		label: "視頻解析",
		tooltiptext: 'http://www.flvxz.com/?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcklEQVQ4jY2Ra0iTcRTG/+qmW6+XTS1lGtmX7fWdbhqZ2OiilFjCiggrdWh+MFtUoM1GamqkOS8ttRpYkKEgY15mBgVeyxhMM9FUMBJzdNFc6QKxLHz6kF/MF9wD58OB83s4zzmEsChyBz9GHMSVr7UumQmUlhDiwjbLKi9C/HITt9ZXJgdadvpy4h+dD7SqDlM5ThusSXBI4v08LVq4UnLCa7Xpgs9HQgjPGdDjgEIRGxcXF1+Sndo81nIVvfq96MkXQuTjdmpTukKnq/q9sowvtiksfZ3EYIcejvZYdF/3Bb3NY/MYGRlpmT+XFrH8ww6H/RMW5z5g+oEMPQXeCBfxc52J4G0w3G1c/G6H49ssTAat5V25D0yXPH8J3YnMGQNCCOFnq9NvVOVnNJYlUQ2jt/h4dsX9M0WRAGdgqizJ1ThQxPljLeJioNQfw7VyWAp56NS4LRzbRc6xUsHhiqPS1NrW6CzDq9biCIwU8zB+0xOT9Uo87TCh/PETNObJYbnmtro7mBzcsDKjsThklbOI1NsRVT2PWP17HKmeQE6NEeP9zeiyjsHYZsbrPAqZMZyCdTRXEBJBa4cRVjIDWakNSXU2GAcXoLxvQ3TZNPbrJpFQMYoGoxk1yQKryIvQ6ww4QolCcvElpNpRSLVvcfrOCGbn5vFmYgb7CgfBaIbAaIYgUXeBePiLN+TnUkFycXo7QtW9CM3qQry2E4UP+xF1uRuMug+M+gUYdR8kZ80gZIuI7Ya87Ym358VnmkCnmECntiBU1Qpa1QZaZf5XKc0ISdRNEUJcWb/A5QfuEUiUej/pyXts5cscryKeAWH/c38B9b8egwNZncgAAAAASUVORK5CYII="
	}, {
		label: "天涯脫水",
		tooltiptext: 'http://www.tianyatool.com/cgi-bin/bbs.pl?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXUlEQVQ4jcWTUQoAIAhDvf+l7asIeToLIiGIueYUM8vD4e5EnIl4jnnxEVVFJ6RKYjuODpX1dgskIgWy/jN35fAIp6pVy29CDvBmkZBQOZBcJfDPAS3SwrO/0FkuG6mPYZ+tEmByAAAAAElFTkSuQmCC"
	}, {
		label: "TinyUrl",
		tooltiptext: 'http://tinyurl.com/create.php?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVElEQVQ4jWNgYJj5nzLMMPM/MoDxkWlsYgg5NAXoinBpJNoAdIPQ1RJlAD42A4JBQSAOvAGofsIMPNz+J8IAfGJEG0CRC3DJUdcFxAQY7oAd6HQAAHRkJ4+ZfqapAAAAAElFTkSuQmCC"
	}, {
		label: "is.gd",
		tooltiptext: 'http://is.gd/api.php?longurl=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVQ4jWPYzsnwnxLMQBUDLqUl/L/dUg/HMEl0cWR8QEMBYcDbg/v/I4PtnAz/r5cW/McHfn14j9+A2y31eA2AqcPpBXQDniya///bg/vYDbg/uf//24P74RibASfdHf4fNTf4f9LdAY4p8sL9yf1UDANsBhw1N8DwM0kGnHR3wIh3bOqI9sLHi+f///rwnnwDSPbCubAAvJo/XjyPMABb/G7nZPh/QEMBRRybGopzIwC80ORySzRuEQAAAABJRU5ErkJggg=="
	}, {
		label: "Goo.gl",
		tooltiptext: 'http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuUlEQVQ4ja2SPajxcRiGf9mUVcosWUTJIKn/gM0kEynJqJSPpAwmkSQDKbFJkokig1FJmUUGi4lIIR9dZ3rfeotzzvA+29PzdNV9dQvxP4YP0+l00Ol0DAYDlsvl259vAc/nE6PRSDabJZFI0Gq16Pf7XC6X3wEAAoEAPp8PpVKJw+EgnU5zOp1+Bux2OwaDARqNBq/XS7FY5PF4/BxhMplQKBSIx+N4PB4UCgVyuRy/38/hcPgMmM/nOBwOwuEwiUQCs9lMt9tFLpeTz+c/RhRCCPF4PIhEIvR6PQAajQbtdptcLodMJkOSJFar1WfA6/Xi9XoBcL/faTabaLVa9Ho9BoOB0WjEZrP5nYPhcIjVamU8HmO321GpVEiSRCgU4ng8/gwA2G63SJKEWq0mn89zPp+/d/BneT6fTKdTLBYL9XqdcrnM4XBgNBqRyWSoVqtcr9f3gNvths1mQ6vVUq1WAXC5XMRiMWazGbVaDSEEu93uPWCxWOB2u/+2rNlsYjKZ2O/3VCoVnE4nwWDwc4T7/f7PIZlMkkqlWK/XCCFQKpVvXXys8mazYb1eUyqViEaj7Pf7txK/AJZP7MzxMNNqAAAAAElFTkSuQmCC"
	}]
}, {
	label: "Alexa排名",
	tooltiptext: 'http://www.alexa.com/siteinfo/',
	oncommand: 'showFlagS.command(this.tooltipText, "host");',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC3UlEQVQ4jW1TS0xTURC9fS0VQVpUBMQfKCKaoAsTE40aUBPjQmNiXLqQGHdGaF9baG1a0YoSFhoErBEh6sJoJBg/C6OSGNSoqAs3akSMb+59Ly2fgi1QKRwXPD5VJ5nN5J4zd+acYWxOHA4OWDfVaeU5PtFp9fBfZgfB7CRY3TS4xCsebahTDx+5oaWz/8XWBlG8/LRoT3XRqFEmSH+lUSakOnk0zy/atl0Wq5LAm+tFscVDL036Y4OdYHIQMtwcC6o5JPtUzShP1XN9orO0Wc3Xv91jzfaJeya9i1EmbLkYgvNBBJ7HQ2jsiqLu+TAKz2mQ5pDk+dWWyjvKfFZUK46ZHcqIUSYwO2HH5RDe/Yxj39UwLG6O9Rc0dH4bQ/unEaRX85lx5rv48MY6cYjl+HnXdGdmI1R0RBBPTOLg9T6wCgXspALXgwh6+saxvEadGcUoE3J94h6zuHlsmlWyE/LPqjh6ewCrAypWB1SUNYVxszuG7/3jWHkmmSDDTcRMjtmCUSaYZMKu5jBa3kTR+jaGio4Ibr2PoacvmUCSCVYPn2DznLNgSSYcvzuIz6FxnGgfxGKvAKtQUP1wCL39iX8ILB6KM6ub+qa1XniKo1uJo/VtDAYbgVUqyPIKPPkyht7+BJadVsFssw2tbvrCluoSSjIhvYqj49MoPtBvlDWFsedKGJde/ELbuxiUSALltwdQfF6DpEu58qwIspJ6dV+6i/olfYlFtRoCT4cRfB1F7bNh7G6ektN2P4LmV1FsbwjBYCdY3CRKG0PbWTDYnVIQEPUpDpo06i402AlmfbkGm25n3Z0GO8HspPE1AeEBIDHGGNt7TVmU6+OtZgclJDlZlbkpyQSzU4mvqFEbDrSEM5Lu4WBrb2ZhrVad6eE/Uhw08Tc4xUkTmR76ujagndgfFGn/vUi/3y/tbNBK1gRUb7aXP0lz0ce0KvqQ5RUPCwLcUdbE1zHGDHMxfwDuAj+ls3X/jQAAAABJRU5ErkJggg=="
}, {
	label: "WolframAlpha",
	tooltiptext: 'http://www.wolframalpha.com/input/?i=',
	oncommand: 'showFlagS.command(this.tooltipText, "host");',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/klEQVQ4jY1Tv2tUQRCeBM8zYhq9eznemzmCHgS8vNO3M1els7LxB8ZGbEwhiE3SWFgISauV5C/QIogBUbSPiJXEYKEYSWFxmLudUSRVsDBrcZfzEi8xHwzLLvvNznzfLEAHswCDq2OFYQAYgL8Y8BJPtFxyDg4Cz3TbXDLTe6ZMb9TR1MESZDhpTL/MJTNfR+GId3hFhTZbWXwRAGCtAnl1eN6PRyNd0loF8uscF7b3JvTChIIJPjahYIxbyrjoHV5XpkfK9LZ5tjTaTbA6Vhg2wfvG+MA7vKN1+qK1KOh4IWha7K5WLwcTCp6TWzvKngUYbLn4ggltWL3cJu0RJrSk1eKxvv2bw5tai4KmxbC18fOf0LQYfBp9V8aHnumyCV3rkpcZcso4bYz7V8AYjPG3Cf7wjAttmyS5qkzvO4L9N4EKvvYcnVoCONTxGZ+p4IoJfdQs3tyvBU2j4DOc7KtBA3FIGV/uW0G9HIzpeWdidw1ROnLSGD9bvRy0FgWtnthpo9A3dThvgg1lfKXVYmnX68ldZVxUl9wwwXftYaKgQs3O+gQAoMWYesa5ZlY6vdMFh5V1jo+2daGnJhTU0ZTPkjPqcF4ZPzQQh7Y5n6pwuK8WAACecUEFV5YZcgAAjSoeN6Z7XuKJPUm9UMbplsSXoOdrLzPk1iqQ3333DxUsSmRjeJYoAAAAAElFTkSuQmCC"
},{
	label: "BugMeNot",
	tooltiptext: 'http://bugmenot.com/view/',
	oncommand: 'showFlagS.command(this.tooltipText, "host");',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABxklEQVQ4jbWSv2tUQRDHN6BphDRa2VzA8sAmYORi7n3njLn9TmFjoYEUQdG/IATt7JRYyXUiQsAiVYpUdhFJYWEqDYJoIVikMB6JyrtkZziL9y7h9ALXODDF7uznOz92Qvgf5oqPh8Tl3tmIm0a8GlrAIu64yldXtJ346YofFnFrKHj/6qWzrrLjKt0+p+x1WLswRPb69X/g0o3Z3ROgbM6I1na1OroPnHPKhwECX35fmzq/Xa2OGtGymM0dCxCbRQZ55or3TukkxaNEmUoRVxLxuGzjsymeF2+xeSSQN2oVpyw5kTuRUgR6sTLjeiGA5JSOU5byRq1SwBHjeaNWeTcxcdopv4zyYiAccb+s5GBn9uKZvFGr5BHjwSl7TuSu+OQqXYuYHwSHEEJifbbXSlGt7AUjWkZZScST3qQHwSGEYCo3XKWbNHtqlBUjWn2/4SrfTPFmEFwOe9Up3zeAU0eXu5wcs4gFI9b6vu0v2Cn3jvcBaxaxsMvJsZBUlosA2k4sGvGy7HMrKR66Zg+MeF2Cq04suqJdtCLLITWzaSM2UhMzZbIRi5g3xVtXOXDi0ClbxvrtEMJICCGkJmYKJps+caWHtT8TkU/tSQNnTAAAAABJRU5ErkJggg=="
}, {
	label: "翻譯此頁",
	tooltiptext: 'http://translate.google.cn/translate?u=',
	oncommand: 'showFlagS.command(this.tooltipText, "url");',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC"
}, {
	label: "內嵌翻譯",
	oncommand: function() {
		gBrowser.loadURI("javascript:(function(){var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs';%20document.body.insertBefore(s,%20document.body.firstChild);})()");
	},
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMUlEQVQ4jY2SsU7DMBCG/TJYYqpEPDojcbq0NGM7sXdnggnigYFOyVDqLLBAkRJLTIwJSwdYw8gj8AQ/Q0kaO6HNSZbPp/P332+ZkJ7hSo2uvNdFV2rwMEOVGw28UVjl5bZZaqi8hA3aqzB/KOBKDVWUrcZ6ir/dgLlSY/HxAx5mmD++d15u7jzMjDNxpcbZyzeE+mz563o4bteaY9nj2bktwP97F7upS72yUgdLfNDIA428g9SD/6APZG84SoDGwoDQeFurly3CEh+OEmBKIFgPcWwBCCHkKPJwt7nA+dvIFBg/C9wUV3VhsbnF4L4NmKYT0Fjg9HVoApgSSL/WBuBkZQKm6QQ08jDLgraF8ZPAdX6JJnCw3AFo5IHGArMs2NVsi44SYIkPlviozraFrvgFK3TyTsPvtF8AAAAASUVORK5CYII="
},{
	label: "存為PDF",
	tooltiptext: 'http://www.web2pdfconvert.com/engine?curl=',
	oncommand: 'showFlagS.command(this.tooltipText, "url");',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4jZ3OT0iTcRzH8e9cWiAktVEiq5NkhCATgoShoqDoMAgMhpBChUUHC8IK8rCnSwSRBwkqMIIgUURMi6A89dfSVUxkZfhnU9NYc8up257f094dJAuyZH3gdXzDR+Tvq3I4HIMVFZXDlVVVw9XVzmGn8xez2Vz3j1Zy9ouMjtnt+OvqCLhcTBYWMtvTQzyhoyuFxWK5vm653Wq9euFiS/JB02nCNhuLJSVEa2oIZWYy134bXSmUYVB0wOITkb0/O6uIFIhIgc22q3dqZo6JKT9TY5+Y9wcIzswSfPWGleVllGGgDIOFUSulRfJOzGZpuNQoia7L6dxoO8/9/ofMB0N8nvvCt8Xo2uXYwNPVWBnoShF5YcXdKEk5Wi7B6ZvCx1smPvhuMD5xF//4PQK+LiLhr2uXV7r7UMogoSti8QSRfgvaEUHOOgUjUAuxa6C3roq1QuQK0Yk2ErpOIp4g2tnL0lsvS8srRBajhO5Y0GoFcTfvgfijdSl/I5GhcsKeYsJeBwseOwvjZYRGyphpT+dcpSBacx6EtdQFT9JSvwXRzuTA9OEUHYLJYrSmrYh2Kgt89o2N7oOR3fA+Czwm8AjaCUG045vh9c517IDBbfAyE56b4Zn8QTsmiNaQBgMZv9kET9LgsWxIqxfE7ZIkfcL/cLskKaX5Jq/ekcH3ztToHRmU5pu8IiK5ednSfdAuQ6nIy5ZuEcn9AUgSejPiQUKPAAAAAElFTkSuQmCC"
}, {
	label: "整頁截圖",
	oncommand: function() {
		var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		canvas.width = content.document.documentElement.scrollWidth;
		canvas.height = content.document.documentElement.scrollHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
		saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
	},
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jbWTUQrDIBBEH9QcokjZe+T+ieQaJXiKfvSjIyyJRmzpwHzsuo47qwJMgIlBvIpPMGAFEnAXUyOOLYEEbG7D1oirAsEV3sQoltivdwWO6Ap4C7UWIwMzqBUY8BTtGwvDAmWIBjyAGcjirJypJhwt+HvfdWoGXmJWbgeW0tHPAoHzvQ9Z6KE7xL8LRD5+FxoPqYfL7/wGEBc4QhYRpZIAAAAASUVORK5CYII="
}];
/******************************************************************************************************************
*這裡是自定義瀏覽器標識UserAgent設置
 *******************************************************************************************************************/
 
var UAList = [
	{
		ua: "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
		label: "IE6 - XP",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADF0lEQVQ4jZWTfVALcBjHn1rbaq1QXWiFLW8JebnK7byE0zmjVyVjKcrLEedwXg4pnXZeW7jpReTtWHpZw0zcMp3USpeXvF7ISyuu2qRQ7esPtHPyh+fP5/f9fO733HMP0X+UR9zNaVN3VKTM2lOZxVt2YzYRWf07HXDKlgIUXApSOlBgkQcrXD0+Tv4ob/ia20G8mJIpc5MqTnvGa6L6ABVcpyiN8LDm7YOC2lbDlTrjp3pTNxR17Z+YEdoJv2Pu0epQ7/Wlu/5gnaI0QnlZc1Phq66O9bqvL7UtMD/rAqo+A3ojoKrv7Jm+W59CROQYqZ7ntPR6bC/MClePl5W3fktQG3WCNENqWl13R2pZy4fVl9/rZDXtxnwDUNgMFDeZMXF71TaaVzCfREXCXkHo8SflM9NfZrrsfL5K+rgHy/Mb71OAgktExJJox24pM7XJGgBZA5B8vxP2i65vIFIwiIiIGab25SfcOWQXe1e4svyrectjYEjSi61ERLRAxSEi8stqVK2oBcTVwNqHwLjEmiOW4QOLPEh0Zaww19AQpgeC7pkxU9X+ZeqZxha/E29aBybVtzCSm74x0jthffw7OEeMGLCuvJTmKN16HS6b9Bn+JV3w1QG+WjNGyQ11/D31avv4ByUkrr5JSyoKSFJ5kaKrLlGkrpBE16QUqnH99YNivl3iqy88JTBUDQzKA6wD9m/+Y0XDNviTf24w+eXMJx95KI2Relsew0oSrVJNYJ4EOKcB5gmAIi9VEpHtzxU5j7ZaWdVmIzWBsa8VlPAaxBNFWATiu4+sJEq9zd4mIzsTsD8FsI52w3p12VNGSHaxzdbnzXaZACcHYMsA6zlpFyzwtIzBFK41EdvVkzkyROKQ3NzDyQJscwBWNsDOAmyzAU420D+9Gw6RZ68SEccisBeMI5HyXW/T0X2ES/R5leuxHvAzOiGQd0Bw8GOXYGNptfOk+Bj6+4A4bv3Et9q43uJ1bEf34W5es0O8glNTeDPiJf08Jns6DAsczeUOdO0DtJSj+6S5Pov3n5u88ICU7yeJ+GewD8kPRgBxL4eH9TwAAAAASUVORK5CYII="},
    //偽裝 IE8 - Windows7
    {






		//菜單文字
		label: "IE8-Win7",
		//瀏覽器標識字符串 UA
		ua: "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; zh-CN)",

		//是否附加 navigator.appVersion
		appVersion: true, //true 腳本會去掉UA字符串開頭的「Mozilla/」，作為navigator.appVersion
		//顯示的圖標
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7klEQVQ4jbWSu2tUQRTGbyT4QDF2ggRRtFvZ3DvfkaAEWcEXWwoGtxEbFXyAQsjK7p0zVlFERcw/oNhYWVhYSCCdrUSIhRZBLEzcnTnHRyIubrRws3uXjQQLD3zFzPD75sw3J4r+d+VOza4fsj5nrB8lDqV8qrvXhPZe8VuTVI/A6hixPiHWeXLyCqxlsJaT8dqOv8Kw9WFifQ4ni+T0V1usdbDcIQ4l2PrwqnBi/QGwvl2B4LQJpz/AutxZy0xckbj35nIYAOuLNsz6hjhcMKk/YVjuwcnX1v6yYXE9BpSGIjn9/sdAPiP1x9qHhel+42Qya96TA1gnMm/2xskkWG+1NEEszzpPkcWkKoey7e+Ek9lMYD/B8i0rYvkCJwIWhdOaYX+8bWBYz8FpsxOezBH7o6ioMVZhrCK29f2ohhFUw0hc9Qfjq7Kthd9YByePiPUlWMNKi8Sh1JmLdxtgw3VimSKWKTi5O3jtw6YoiqJo19m5jWB5alI5CZaHmRw+Eofbxup5cvKYWJZaATYMh0vZ/Prg9GZiw+mkWiOwvO4aoIzA2gDLg/zY/OauH8iP+0GycobSUKRUCmC5DyfvwdqA0yaxLMHJDNlwOXfx05ZVp7CrCtP9SBf2UBqKxvpRsBzeV1nYHkVR39rwP9ZvsJlc4gd6n5MAAAAASUVORK5CYII="
	},
	{
		ua: "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
		label: "IE11 - win8.1",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4jb1SPUtDUQwtIiIdOok4ipMoOPh6EwcpRcTJQQpuIkWkuBQKVrC+l4sODp2cREp/gYiIo5OTSAdHcXSyfrT3JYt0kKKDSN99/bAuBs6UnOQkOZHIf8RM/mUUPF5RHqcwa2J9kdA1c0iSR+Jz1PKBWipInEOSkpOpRrsSnUJ9ErTcopbPIEBLE4jL6JklcGvxzlMLZgq1mDA5hFe18zbWgb4/gJrvWoX8BMTrjuvPK+Ij0NL8ySnigzZ63ONkcJKzJ7OWOpLjQN5Mr94PWQ2A5DBQ0ADyizb4ousAJ1ONgpbaL7tbUJ4sBuTxRqjAqF2Z6IXx9ONwQD6fAcmV9TbPX7ZvwBq1VFBLBUhO7f0133wbhy9bf+d3IL+oiNNAcmo1J9m0/09SUi4nnO3qCGp56LU7EJfbDZQ1MSTOKfLXlMsJIDlBLY2QE5+B/K0OBuocmDUx8GRBeZyKu3WIJK8H+yb/Jb4Ar9hPAAb57PoAAAAASUVORK5CYII="},
	{
		ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0",
		label: "Spartan - win10",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4klEQVQ4ja1TPWtUQRS9Kj7zdt7MxU4CithIVCzFZouUamUgootFFLFShM2+j5l5NySChQiCjRhRxDRiuoiNEV02ebz5+Bv2gppGLNZis5vdl2fngdtczjlz7oEBqGIZDoaFnGNOxcypmHlaEJZuoqdrzMfH9vEnsD4fijJ/yE3+tFHS7SNfk9PcxU1u87do6Rd6/TnoJTO12sZmMo1Gv+KG7gx3uJ2d4pYseurvjd7hLm5WXz4UGXomrLw8vkajX06Kd8fq72GRnhgRI0vX0cusmkoU+iK39KfORLj8PWwkfED0tDLVzU7WnYaWvtWm8NRnNr+1G1WldeLwU/v4v8ToqS98/g4AAJiR7dpm1zoMvd6p3o9W/0Srv0SlXBoYlLJTazDsx9IP9PQk8nQW1joMNhIeWHU+cvregOQVwerdw6PyrHrAPX0QJl/mLm6OyhoDL/VV7mQy6MBJJYr0EgBAVKjZ6q21yQw9Cgs5BwAAQS+ZQU+rAADhlr4wFHJPv9HpXlXMXHYDjdLwZmFqb1lSCw09BoAD6HWXW/rY2Eymq2Lh0ito1Wvczo7ui8VKagmnnrOSWrA+H0xE7qpzUSmXIqte1BmPEGwtnolMfh9LJZmRbebVIhqVCk8r4//kv+Ev/AcEjRV2SjgAAAAASUVORK5CYII="},
	{}, 
	{
		label: "Chrome - Win7",
		ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36",
		//appVersion項為字符串，腳本會直接以字符串為navigator.appVersion；
		appVersion: "5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABZUlEQVQ4jX3SPUiWYRQG4AstJ4ewwiV3EQJrCXIJBIPIBBcpEBxcWvsBSQeDoNDBEKNNFGkQaW2sraYCB4WQSrAQ/b7SwZ/ox6/hPS+8Pr524F7Oc+77nPs8h8NxEl2Ywyp+Yh+fMYNOnHBMNGMCVdSOwSbGcCYlN+Hlf4gp5nE2JzegFe9LCn9hO/AD3wNVDKEOrmIKt8NzDRsYx3VcxAVcwy3cDPTkU8xhFwN4hQq6gzSMB2jDJXzAWuArJuFLdH2DfoygHR8LVpZwPpZctLhC9k01/MYdNGK0ZB/3cSPq8twO7BUSy2iJKVKBuyUCW/CpkDjAkxh3qZBfjD2kFpZhOklW0Bsi96JzKzpkh1SsfQZXSh4qeBpCXTjn6KGt4zLZ/T+O8VPff7GAwWRXf/AQ9SJO40WJSBV9eJuIzuKUJJrwKEbLiydlx5QLf4vOR8h51MeynuO17JTfyX5kKjzXFQn/APgEoX8xUiqtAAAAAElFTkSuQmCC"
	},
	{
		label: "Chrome - linux",
		ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB50lEQVQ4jWNgoD4wZlWLWBVrWvVinXndh+vmdR9um9W83amZtLdASMWTD69WGZcOXbOad9fM6z78x4FfqkVt8MKqWcQwScq89sM7PJph+LdmwrYAdP3MJuXPPU1r3p9GVmxW+/6eWd2H02Z1H06b1344A8Nmte/3Mkj5csF1KwbNCzGv+/DSuOq1t1nth3/mtR9eGBY/8NROPxapErEmid+mQlA75UCkdtqhJhhWi1yDcIVRyb3F5nUf/pvVvO0yq327yrjsfgCya8xq3z8yKr1na1734TeS2BW4AWa1H05BBD/8MCy+ZaedtC8Y3e962aerzGreHkcY8OEXwoC6D3DbTCqfr1WPXBOGboB+9rk6s5p3cAPMaz/8YWBgYIR4ofT+CiST/5lUvvAzq/1wA0nsjVHFEycUL9R9uAl3gUrwwhj0+DaueRNgmH85TzfnbJl00GwZk8pna5HVGORf60OKRW02s9r3t1Gj8MM/89oPt8xqP+w0qnzhY1b74R9SAH4RNM6XQ02Fbt3mZnXvv6L73bTqVYJpzbtLyAZrJ++Jx5oa5fwmW5vVvX8M11z77phZzatchIHvP2sm7IrFqhkORB14NOO3F5rVvDtsUvbQ1az2/T2z2vfndDJPtooYJknh10wGAACB6IAc8VaKWAAAAABJRU5ErkJggg=="
	},
	{
		ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
		label: "Chrome - Mac",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7UlEQVQ4jWNgoDYwZmBgXaqjGPvIWnfdCzv96y/tDG4/s9Xfuc1ApcBTiIEPr+YmJXHd57Z6117aGfzHhl/Y6r9cqavkhVVzkoiI1Etb/Xe4NCPh3+t1lQPQ9TM/sNb1fG6jdxrNxnsv7AxOv7AzOP3S1uAMDL+w1d/ry8DABdc9Q10u5IWt/ssnVjreL231/72w039x00LL84ChauRyLaWkCjl+wV2GqpF7DFWbYHilrgLCFTcsdBa/tDP4/9RWr+u5jf6qm5a6AciueWGr/+immZbtSzuD30hiV+AGvLAzOPXSzuD/Czv9H9dMNe126KkGo/v9iJFG1XMbveNwMVuDX8gGwG17YK23dpmOYhi6ASdMNepeIBtgZ/CHgYGBEeoF7RUIk/X/PbLW83tpq38D7lw7gzd3rLSdkL3w0lb/JtwFs7XkYtDj+5mtbsA5U628kybqZbNVpGXuW+utRVZzwUyzD26ANgMD2wtb/dsozrbV//fSzuDWS1v9nQ8tdXygfKiL9L+kSQnKoSSENgUZ8xe2Bl/R/f7ESjfhha3eJWSDtxuoxWNNjf3KUtYv7fQfI7yid+yprX4uwkD9z1v1VWKxaoYBBwYGng26SoXPbPQO3zPXcX1hq3/vpZ3+uSMmaq1JIiJSeDWTAwBf3VAlT96iJAAAAABJRU5ErkJggg=="
	},
	//360極速
	{
		ua: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 QIHU 360EE",
		label: "Chrome - 360極速",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADWElEQVQ4jX2Tf0zUdRjHH0DumKHAVDATRZb9oB1IB9wPLriDs18b4cZcZY6trdLIyubayrV1c45jE2xXjJBsQDSXNsdf+JfBVn+oDUkuD1mBgt5dyLz4dfd9ns/n+/1+nv5oWdmP1/+vZ+/t/X4A7sEbGFnV/BU9s+sL/eyBz9A70UBtV+vxzlU//hJpwNPh1xfz7nX+ZPeZjF19cmBnj0zV90js3499l1yaOVaNatxDKuwhFfbSwmRTquJf3DMZz/WJc/4TUvi7JdV1Sxx8IknD9qT6riqlLjo1ddmN6oqHVLiGtMhuUXJXfu3EaObz/bLF3yXJ3yXJ1yXx2XYhBsqW1aBtWQ3tWFHn7Un1bWVKXXBqatSNatyrjQUgkA4AAAd7ObfxpH6+vlOKuk6Jvk6JT3YICtkWuPehBXWqZEmdtS2rodKEeclxYe76U5+3R9/oXHc3gWumo7zxJPbWhST5QhJ9IYm1IYmHvIt8vDihurfdNi9uDUpt43ohi7I13Zab0r2bJvWXXW4AAKiIHr1ZPdsR8fVHf635iETtcUm1HRL3HkZj+NMUR/2vmpS3muT996F8cC3pZXlkePKl2fTwDwAA4IgHl5yxIDlnj6Hr3Iju6JkxHaE5dWhonpmZUz+eYuHOkuKBbJTbc9Cwr0OjNp/MxuLbAADgjrfNO2Nt5IwFyRlrxcqbR6h86j0qmzgo3pluUXyt0FAjacrYk6XLR/LQqFqPhq+AVNP2aQAA8MSPjTpjQc0ZayNH9Cjab3yApT+9jSXhF8UL49tMnrUgT1lIfZOu9IocMlwb0PRvJLV3x9cAAFAXb3+lKt665IgFReXMh1g+9S6WRPZj2ZjbjETXSJ6zIMcsyDcyyXgrmwxPPplPb06IA37b7zUEAunVseAnFbeOpB6ffl/Yrr1JtivN2pe3CgUnLciLFuQ7FuSEVajTuRGjZsOS+ZK9BQDS/rbGmtnWfVU/Hx7eOblvZGJl6zzrVmJpQUYrccpKvGKVfH1Tu/AV7PnvfwAA08j+mI3MJBsWZMNKbFiJpZVYrJ3WEqWb/1cGAGBuWM3GY82sFw+yvuUy60Xfs/HoAAu/7R+x/0IaAGQAgBUA1gBAPgAUAkARAGwBgAIAyAGALABY9ceh3wAMUuwebb+GCQAAAABJRU5ErkJggg=="},
    {},
	{
		label: "Android Droid",
		ua: "Mozilla/5.0 (Linux; U; Android 4.4.4; zh-CN; HM NOTE 1LTE Build/KTU84P) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.2.0.535 U3/0.8.0 Mobile Safari/534.30",/*小米 紅米Note 	Android 4.4 	UC瀏覽器 10.2*/
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4jWNgQANLjln+RxcjRg5D4apTrv+XHLNEwURrhtHomgkagq4JF6adAWQBdD8S6wI4e9SA/1gDdODTAbpCkhMQXQ0AAEsuZja4+pi7AAAAAElFTkSuQmCC"
	},
	//iPhone
	{
		label: "iPhone", //偽裝 iPhone，查詢http://www.zytrax.com/tech/web/mobile_ids.html
		ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4",/*Apple iPhone 6 PLUS*/
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABY0lEQVQ4jaWRTWrCQBiGc4Ruu+u2u5QiKEQiIQQcUSMyhDAJMaOZJDr5kV5Aurb0CB7FI3gEj5AjvN2UonRSxL7wbIb5nmG+V9NuzGw2e7717lUGg4FuWdZ5NBod7xJYlnWez+fgnO/uep0QAs75x00DQohH0zQPtm03hJBmOBy+UUpHQoj3NE3hed7ZcRy3VWAYxpEQAt/3sVwuf8iyDJvNBlmWIYqiRjnc6XR027bh+z7W6zXqukZd1yjLEkVRoKoqbLdbJEmiKwW9Xq/+/i/KskRVVb+QUrY3YRjGbjKZYLVaQUqpJM/z01+CwXg8RhzHyPNcSZqmkFJOlAJd1x8cx0EQBBBCKEmSBGEYglLqKSWmaR4opeCcX7VwSRzHKIriRSnodrtPhJCGMYbFYqEkiqLP1j1omqb1+313Op02jDEwxk6MsWMQBE0YhmCMtS/xMvv9/tXzvO7lmeu66v7/my+BUdxwcAL/pQAAAABJRU5ErkJggg=="
	}, 
	//偽裝 Apple iPad 3/4
    {
		ua: "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53",
		label : "Apple iPad 2",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACuUlEQVQ4jY3Pz0+SARwGcA5MkSFgsMBCnS1735f35fVFYWLhNBF6BVEEAiaggKAkmpK/IpzadDXz0Ja1VjMX4eaYqw5tdXDTNsdaW4dWm1un1ur/eLrUJTj0bN/j97PnEQj+xGw2D2s09cW6uvrjhobGY4KgipzeUOzouFzk+b6ixxsoDo+Mfognkh9nZhbcgn9D0fReRaUIYkkNJDIllKp6NDYxYFvacbHDiit2Nzy+MIKhKMaTk49KAC3DFEQSBfQGHsb2fphtPlicw+gZjMEVnMToVAZj6XV4/BFEo/EnpYCWKVRJVTBZg+h2X4N1cAS9vjH4U4uIzq0iPruGicwmbE4//IFQKUBpmYJEUYd21wRaB6fAR+bQn1zC0PQDxOYfI7S0jejyNi71DMDhGCidQFHaQs2Z87AmVmFJ3YMrvQlfZguh7A5iKzkE7u4ieOcFDF0OdHZaygOaCyzGVx5geuMZUg9fI/30LRaeHyCTP0R29xDZ/AFau3phNJrKAzpDG+7vvsLOmyO8PP6Md5++4fDLd7w/+Ymjk184+PoDXbwTDMOVAiSp3W/WkdhYv4nl7DyWbi0gEQ0jlYxjMZ3C9dQ4hoN+nK2tBUXT5QG1+jQcdhvsfXZ4vC64XA74fAPwePvhcvfBauuGUqkAQVClAEFq91VqFXinA31eL9yhEAaGgrgaiWIoMYbAaBzucBhqjQYEQZQHqsQS1J9rQiOhRRPDgeQMoPRG0AYTaKMJVEsbquU15QGKogqVoioYIrPonlrG6PwaYnO3kZxNIDYZQWasFzciFoiqxOUn0DS9JxQKIZHKUC2TQyaX45RCCYVCAZlcDplMCpm0GkKhECRJbpUAPM93sRyX0+ma8wzL5hiGyXOcPsdx+hzD6PIMw+ZYlsuxLJdzOp2mcg0qBAKB+P+Orvj79xu+Qj/xKTUSxAAAAABJRU5ErkJggg=="
	},
	// 偽裝 Nokia Lumia 7X0/8XX/900,N800,N810,N900
    {
		ua: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)",
		label: "Nokia",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4jaXTTUzTdwDG8e6ymO0wjdE5rPZf+f/+f0p9x2haeVkt4EsDCMqLOkAgWFGIOxg1MwozzrEpFCxvFYpS0FCoSGs0S8BNtxBFUEzIdBU06RZC0gU1btnFw9db1cRdtsNzeC6f0/NogA/+TzRvF9fAk0/sLSMlOTVD7rRTt4YtlTeC1sofgylVP41lnxnq3e28c8Decke8F+j5JRRnOTrwq1oWINruR7b7UfcFEGUB1LIAyl4/8l4/5kM/zGw9eTP/HSAUejHHVjkQXFzow2jvR190Gbm4D32RD22+F6nQR8yeKxjt/ailfawqv/oq88SgKQIcbBku0X/hxVDsQ93dQ0H1ILYjVyn8bpC26w8pd95CLvBiKO7FUOIjpqiXdeX+zgiws2rw/JK8SxgKupFyPNx/+JS//n5JeCbM71NTwD80+O4i5XSh5nej5ncTV+p7FAE+3+8bETmdqHldSJnnGR6f5PnLZ2yuuMiCTY10XhshPBMmdocHJfciSm4XKwovTUWAVbs8E0rWBWK2dyCltTL26ClXbtxnfmozC21uDpy+znR4muV57chZHajbOjDmembeANnuCTXDjZrhRtrUzOh4EE//baKSm9FudFFxKkDojxBLs84h0tyIDDexWe1vgOXpzjHZ1opic6FLdnJ7dJz23p9ZaHGitTay/+s+Hk8+Zml6M/JmF8LmIja9bToCGCxVXpHqQkltYlFSHXdHH+Dpucln8XVoE+upON7Dk8nfMG5xEm1tQk5pwrilJRgB5kXbKmJSWhGWsyxJdFB68ALZ9lZ0CXXok85iyW6g/CsP6gYHssWJYm1CWV/ljQAazSydMJ/8UyQ1IBJq0a6pRrv2e0SCA5HgQDKdISquGjm+FpFYj5pUz3x528Z3pvzRbDUjet03z9X4RpT19cgmB4qpBsVUgzDXIsx1qPENCHMNn+ozj773TJoP5xrmRCV/qzXuG9KtOByUVh8LSauPh3Qrj0wsWvblvXm6rY2zPl5s/dc3/pe8BiACa2LAfOYnAAAAAElFTkSuQmCC"
	},
	//Samsung Galaxy Note3
	{
		ua: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
		label: "Samsung",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABB0lEQVQ4jWP4//8/IyWYgSYGMISuYmaI2WPLELsnmSF2dypD9C5nBs9t7EQZwBC6TZQhds9pxri9/5ExQ9ze6wyRe8QJGxC7tx2uKXZPIyp/bzUxBqyFawjdJsrgt5GXIXbPXQje20yEAXsakVxwlSFqjyNJgcgQu5ObIXbPfhT/x+7ZzBCxU5b4WDCeycoQtzuXIXbvayRDPjJE7zEl7IKY7eoMUTuNGaJ2GjPE7RFmiN0zHykmdhI2IG7vQbiGqC2CULH70Fi4TEwgzkeJxpg90Qxxe7/DwoIIA3ZrIvsdKQ18ZojeZU1cIMbtEWaI2ZPOELd7MkPs7n6G2D3Z2FIh7TITKRgAShqRce+3IPcAAAAASUVORK5CYII="
	},
	//偽裝 日本DoCoMo手機
    {
		ua: "DoCoMo/1.0/P502i/c10 (Google CHTML Proxy/1.0)",
		label: "DoCoMo",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWM4w2D8nxLMMGoAwoCXk1f+P8Ng/P//////X05c/v+2Zy5pBvz//598F7ycuPw/DMDY14xjUPjYaLgBMHDbMxcrfcsDuzhRLoApRKYxXDA4onEEGwAAOydBL6/POBgAAAAASUVORK5CYII="
	},
    {name: "分隔線",},
	{
		label: "Googlebot",
		ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAABRklEQVQokXXSv0uVURwG8M+Sg5FrjoHYHyCIWyIiOCmITTa1uLq4NLi5aYrSKHRJwuGGy1WHBiEdvKUpuAiKcBMvai03CrTs2vCeC8fDe79w4D3n+f543uf5cj9aMYIizvAH1zhFAQN4oEl04C1quGtyvuM1HqfFnfiUJN/gHCeBwVWEfYibPML7pPgYSyFxCMM4QD3gdcygBcbwO5n8Esvhvo6noUE85BLPoJQANfRgIdwv0I2tHE0WhP+MH/8Fev3YxAqm8SunwQ78zAH+YheT6MK3Jq4c5TG4ww+UMYcnQae8vDKsJY+HGMcGKviCPryKXGicRXiRuDCF0SSxiImkwRV6oS0I1QBKQfU32MPn8P01yqljVtgDMp+3I3BftkgFfEQ1YbSKdkl04l0TV2Jx5/OKG/EQz8OEKm5lllZkmzkY04b/fzejj8A3wWEAAAAASUVORK5CYII="
	},
	{}, 
	{
		label: "Opera",
		ua: "Opera/9.80 (Windows NT 6.1;zh-CN) Presto/2.12.388 Version/12.14",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABpUlEQVQ4jaVSsUpdQRQ8iBJExMby2lwe94J3d2bQSkG0EqxtJSABC408/QUhgqSIYCCEIAims42NXxFIow+bGBKTVjHk+aLXZp+sy+s8MM3O7JzdOccsqizLBr33CyT3JbUk3Qa0SH4kOd9oNF5YryqKYlTSW5K/JdUk2yRPA9rh7FLSm6IoRp9cLstymORe6FaTvCf5wTk35pwbk/SJ5L2kWtItgHcAhh4NALyUdBMENcmzqqrGu3xVVeMkzyL+GsCimZnleT4i6aRLBsFhlmWDcTYkDxPNlzzPR0zSHMkfCbmVZkRyK9ZI+g5gxgC86oYU0CG53sNgXVInavKP5LIBaCbd2wBWUwMAq0mjGkDz+QYkl+IJSOoAaPb4wqak/5HuhuSSAZgIWxcHtN3DYCfRtABMmJkNkPyckEdlWQ7HiybpKNEcmNmAmZl572cl/YxyuPDeT3YNnHPTkn7FPICZ+IX9kjZIXseLImku4Dg6vyL52sz605SHJK1JOg/CO5J/Au6CwbmklXhL0+pzzk2TfE/yWxjbX0lfJe1676fMrC++8ADAy++mZ2aeNgAAAABJRU5ErkJggg=="
	}, 
	{
		label: "Safari - Mac",
		ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVQ4jYXTv0vWURQG8I9lvP4oCQvRIRN/VkPSlLzkJCRBUoJkiP+DDg3iKNTQkC01qKBCSLw1NBoRQaENLREILQ0RlIODhGIgosM9wtc3Xz1w4d5zz/Pcc55zLkdbNc7ixDFxoAMPcBu9eIRlfMUrDON8KXAZRtGPd9jBFr7hM35jN863SpEM4WMELuAmzuEMLmMEq0F85zCCqQCPoTx8tWjLxFzHd/xBu6KLLbxwULAcGmJ/D63owjaeZgke4h9uFGU1jAk8jpUL/xv8xEWoxKdIrT5erMN9Sdj3WMEltEitfYJN5OE0vkgK16MGFRgM0hlM4kqsqgxBt6h5XlK4JVJsxkvMRnnXikqbw1907jvuSh0YifM4BmLf4KA1Sl1YzGiiBkvSwPREmnASTRlwDoV47L9ZyGMDv9CXIamWJrUVrwP8rBi8b71Se3bxAdOSiAWshf+5JHxJa5ZU/iEpvYl1vJX+StlR4KxdkKYuj6s4dVjQHmMlTZu/PHeoAAAAAElFTkSuQmCC"
	}, 
	{
		label : "QQBrowser",
		ua : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.15 Safari/535.11 QQBrowser/6.13.13461.201",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADTUlEQVQ4jbWSW0wTBhiFz+a0gJdWBFkRiiuBlox2aBRDZIoK4yJqE8VlF7sNqU4CKhAk9bIZRtQydURGwbRVUdTK3OrKNYIwQqZNFoqyZQjBMcyArnPKzaJVOHvAsexhjzvJ/3a+7+U/wP8U75AVsZsT0rIPJ36cp1uSmLJr9vwAxX+2V0T4x2WoFYc2RXt/tHFrvC6r2u6ofkz+zKm78Yw83TXMTdoiCzyE0n/B0cvFCcbj8RaJn4f0zd2fN5zoHWWJw8Xm0XGOuXs4/tzBPtc9Nj5y0ugkt51pcc4U+S6ZFhTkKEtUMSIVglWZKTeeUtv5lIaBCdY+HOb4UDE50UXyMV2uZtb+0sT0thFGas33AYgAAB+un5NemKW8tSijcWiDxcE99iHqf3Pzwh9k/X0bH/YUko5L5PBZTo7oWNNpYvK13zlPmVIAAJgLLMjM3PKnTNvOdcZuqpud/KRrjPoBN4sekF/eaef1hv10tmyh+0c12b+elvZiij841wtgJgDAS5lmDdley6hjbUw2/8q0Vifz747w1ICbqR2jXH31Nj+1XqT9++Mca0rkpH0hD5YemgREQQAAgSKjxS+pgm/sruWqog6qzD1UX+9jUtU9Rlt7Kft2kPKyH/j+1WqaGio4WB5EZ50v5eGS5CnB0h0WUfwl+qzWU5lh5dqTNsaebuPiI61U6O183fgTJYZu+uc3McZ0jUe+NnD0KyGL982rnxIEx+UI363iS8tKKF5XSul75ZTs/IbyA41cprvJyC9slB6zUXjARv+9VUw8Y6bZvIv9lbMmXjzTS+yXWukSba/jnKRyeq8pZYDKSLnmCiPy6hmxv4Ehe2v4aqqFAlUVFbnnqdFuvvOgTsLpPXjK4vZIC27TP/c7+qRa6ff2FUpUBoammCjbepaSDUYuiD1HRF6md0xud5Ym7PKwbc0/AgCYHbXtqOxkB8OKOyn97BaDcuoYqD7PRaoy+sYb6LmqnGs1hbSY3uofbE14cjA9vOJv9mUAHgAEgsClWYE79H3hJ25SWWKnXNfCgLwazn+nzDUrbGNlUkzA4Wx18KlI5UL1CwYAMAOAEEAQgMUAombMFWu8gpfne4auPCoQh2bjFUECgNcA+EwPCMBfkJvCviG8sLUAAAAASUVORK5CYII="
	}, 
	{
		label: "UCBrowser",
		ua: "Mozilla/5.0 (Linux; U; Android 4.4.4; zh-CN) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.1.3.546 U3/0.8.0 Mobile Safari/534.30",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFklEQVQ4jc2TsWoCQRCG9w0sgqX4CHZpfQrxGkOwC1jZKDY2NhIUUgTsghDBQgsLW21EqyuuEeGuMQge6+7tDcT6t7hweuqdB7GwGGaHYT6Y/59ljDFGRAjE7/72mwjs6nCMwdM6HBAz7gQQNlxjGmyaOmhjHevtGmrSgxp3QMv5GWC1AM8/gYTt7yiqWajRB4gIatIDf0lBfr7BGb5DtotngOU8HGAZ4FoS7mIUIaKphwKcfgO7UubSicgViI6Abg2i/HxDRFMHzyVAPyu/sStloMYduLMhuJYEWUa0jaKahWxqcI0pnK8K+Gvad0G2Ch5wNgCZupcv7kDYvsLOdz1o4Z8TslWAbGpe/8Eu8T+AyB8ZY/gAY1aTwt2Ru2IAAAAASUVORK5CYII="
	},{
		label: "115Browser",
		ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36 115Browser/5.1.5",
		appVersion: true,
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4jZXTTUsCURQG4Pkno0It2gQW6B/Q8QMiAi1dlotWQdQqSKJwBitKGYhqU5QVKEFkGH2RBMFEYBaJkLWwD3WVCSKaOm+rJm9KzVx4d/c8nHsuh6KNHrOKYTNqhoOSqBg2Qxs9ZqpV8ah3H8JtGsLdM5FY8g33qRyBUL+LtTYfiqUKWh1RBIand4n7TcBq6AoAcH79BJ2DR2ffgpSOnvmmpxCAzsGjXKkCAFzuEDSm/2dBAFsHN0TLhWIZe2cJDIwH5AEzy6fYjsSReMyhLooEthOJo83q/RtoTHe/H4sbF6h81iRkJSjIB77TO7Iu/Uq1WkeX3a8MUDMc5taiUhdD7qBywD62KQEud0g5MOE/BADU6iL0Tl4ZoLX58JL7AAAEwjH5Q9SYOAxOBpHO5AEA4WgS7dbZZqBxmfROHlNLxzi6fMB7oYR8oYQTIdU0uJ9l4rIUbWAtKobLypkFUWxkX2kDa/kCvupaSijeUoEAAAAASUVORK5CYII="
	}, {}, {
		label: "BaiduYunGuanJia ",
		ua: "netdisk;4.4.0.6;PC;PC - Windows;6.2.9200;WindowsBaiduYunGuanJia",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFZUlEQVRYhc2Xe1BUdRTHr1lNzahNM06Opck0UabjIwgDxcdampo6KBJqM5YlMyI0oqD4SjQJFU2dBPFJCIoKkpikoqRjaj5G5S24azwXdtlllwsLu5d9ffpjfcFCQpn2nTn//H7nd87n3vmde88RhEcE9AJWAlcAFaB7QqYFcoHtwFChLQFTASX/vUzAqtbJJwOWp5D8UUU9+tpVTzn5fY0TgFXPKDnAOQG41tlTd3Rw9A7EZkPsLUgphiLdPwLQC4C6o95aI2y+bmf2CTsz0u18dtxhfumOtY1X7aibOg+g74inqtFOUKaVqakWZqZb8T9mwTfNwvQ0C/7pVmYdt+Jz1ErgaSvKhg4D6AQcdfq3stggPKuZTw6Y8E2RmJQs4XdUIjzLzPLfzMxMk5h0SMI3VWJiskToWTPN1icIcL7Uwsi9BiYkGhizz0BwhpG7OtuD/TLRxpJME7J4A5OSGhm1z0CmokNV3TGA5acNuP2ow2uHngnxdagNNicf0WTHJ0lkeFwdHjF6lpxsfDIAVmBKQh2uG9S8HVVNeIbYrm9UVgOuG9QMiFYxZZ8Wm83+LwEsZsxaHT6binljRSnPr6ghJMPQPkCmnlfC/qTP6nJkMWpqGu08hqFtAG2jlctnstHPD8YyZQq68ZO5PdGfuGmr+GLNFeraiGSz2vDZo2LYDj3TU03MOm5h3ikrYeesJObb0LRdns4AF8rM+KUZGXlYInDbNXSjP8Y4WoY0WgYjh6PxHEX5rkTMrSIl5jQz/mATvj9L+KSamHrEyKeHjUxINvLRASP+aUYuljuVRkuAS+XNjNhXj3d8PbKEBtz2N3FzzDTEQUPRuHuhHTEW/YgxNLi5k7J0N2vPNhJ9soaAFB2jfmpAllCPLEHEc08dHrsd5rVXZGyCiHe8yMh4kcsV5rYBRJONCQm1DI7RMixOS/9YPQsPllKfmIzxcCq1i8KpHOqJ8gNv1B7elA725M3pmQiLyxly74z7Di2DYzQs/LWew3kmknKMBKSLDNquwSPOsTdxvw7RZHMGSLppoM96JQO3VtMvuoqIs3XYrC3LrS7xEPJ33ZAPGU69qyvrZqyn7w4DA7dW039LFS4blSTeall+djtEna/HZaOSAVur6bNeyYHsRmeAuUdq6Lm2lNcjy/CKUSK18ym7OzsARS8XfvlwOv2/l9N3o5J+UWW8GlHCD7+3dT2h2Wpn9M4qekeW0XNtKV+lapwBxu2qpNtKBS8vVxBwpLrNQACaqGgyer/PWyvz6BFZyWsRd3kxXE7YCU27ZwDmpah5aZmcbisVyOIqnAFksWV0DSuiS2gR0+Ir2g1U8G0078zJoGtEBd2XFyGEFOKfpMT6mILfckGHEFSAsCCfOclVzgBzkysRgvLosqiAHksLKVSZnII0GZrwXHEdIUzOC6H5CAtyGbW9BIPk/GluLcliZ9uFWiJO1aAxPPhPPATIKKhHCMxBCMlDCMphYFQxf5Q0gs0G2FCojEyKLUEILnD4BGYzIOoONQ3/qpV8CGC12xm3swRhfg7C4nyEb3J5bnE+7pvleG2V031ZIUJwrmMvOJfeq4u4o5E6nEmUIOaGhciLzZSLLcvwQUNSKZp5b/NdhJB8hGW3EcILEULv2dJCx9qiAnquKeZaRedany0XDbhuUuOyXsncQzUtAFq0ZCqDBb/UarqsUyBEyBHWKBwWoUD4TsHYhEry1B1/8vuKzKxFCMhG+PIGPrvL7y/r221Kr6okVl8V+fxMLbMya1l6qY6scmOnE9+XaLIRekzF14eqKNE/uDf6/0Vb3otOdMZPWOOe/Wj2DIZTidbD6VMYzzU4xvMYWo3nfwES3RBaYmrGDgAAAABJRU5ErkJggg=="
	}, {}, {
		label: "Firefox31-Linux",
		ua: "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1UlEQVQ4jW2SO2hUYRCFJ7qIGGOhorig2WLZu9f/3vmOvaDBwsbGB4Eoltbx2aaJBLExpBAtDGJhI0hstbBQtPBBBImwCRLQzseCaLESXZt/w+V6fzjVnDP/zJlj9v+rAcHdJ9x9MmICCGa2sYJvQ+12e4eZ1UII+4FpSXclzbr7ZeASMAc8BKbzPG+b2dC6OkmSEeCapHOSFtz9KnBB0uHSVMeBj8AH4Gyz2dxmZmYhBID3wE9JHUmPJT0IIewrjhk/Gpf0Gvgu6War1dppwBjwSVJ/AOAtcDBJkpHyvsABSe+ArrufNOCOpLVig4hl4Gi5gbvvAp5L6rv7dZP0tSwG/kqaCSFsLTdI03QP8CZyV03SSkn8Q9KTPM9PV50sz/NDkl4M+CZpuTTBF+CEuw9nWbbb3ZMQwqaCBxej4X3gs0laqti/A9wDnklaBI5F/QZ3v1HgLZik+xUNBqu8knQ+y7K9jUZjc8xKJ9Z77j5pwDjQLYl7wDwwFkLYnqbpKDAFfCtwXoYQmoOAzFdM0JO0BDyVtCjpd6HWlXRm3VlJDUmPgD9V65TwC5iq1+tbyvcdBW7FmFaKY2KvVOVjkLJhdz8VjV2NwjVJK8Btdz9iZrWi5h+UYfMbxqhMHAAAAABJRU5ErkJggg=="
	}, {
		label: "Firefox33-Mac",
		ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaElEQVQ4jX3Sz0vUURQF8M/MYDWRCS2arIgiIZEEXQQSSBFBm6BFC4kKIkjEQCmFaGUUGSoo9GNqkVNBm6AW0a6/I/p7WnzPyJcnduDC495zzn3vvkuFAXTQwDk8xTZ6+JR4gjP2wDV8wU28xlt0Y3YAJ3EbP8Jt1MUtvMQ3/MVHvMd3HCsaLeMPbqHZTx7CBkZxKTGSm1zH/prBqTynm5uAE9jCUNHtCn7iaC3XxDPciKYDd/CwEJ/FemZSYiHmc7gLm7hQIxzBm5AapRqLuIzJaG2rptxHBx9wP10WMJ7aAF6pfud4tHoYLrqM52n38Eu1FzCFtRgN9w26GCsMJvAVv7GE05gOdzKcMbyDx5gpDPZlBs/TcQMrMe5jJlrnM4zDdqOh2sSDaosT7ma0YD5RJ+2FZo2/g0G8wCza/xG38SDcwbI4hEeqN19VfWc70UluLZxya3fQwkWs4rNq73s5r6bWqgv+AYBxON0vXviZAAAAAElFTkSuQmCC"
	}
];
/******************************************************************************************************************
 *這裡是查詢源設置，只支持"GET"方式獲取，taobao為腳本內置,可以自行按照示例添加。

 *不限定於IP，可以是其他相關的API，只要是你想要顯示的都可以。
 *******************************************************************************************************************/
//查詢本地信息
var MyInfo = {
	inquireAPI: "http://whois.pconline.com.cn/", //查詢接口API 下同
	//截取函數,傳入內容 docum 是XMLHttpRequest()的req.responseText，（具體可以百度	XMLHttpRequest()）。下同
	regulation: function(docum) {
		if (docum) {
			docum = docum.substring(docum.indexOf("位置"));
			docum = docum.substring(0, docum.indexOf("<h3>接口列表"));

			var addr = docum.substring(3, docum.indexOf("\n"));

			var ip = docum.substring(docum.indexOf("為:"));
			ip = ip.substring(2, ip.indexOf("\n"));

			var RemoteAddr = docum.substring(docum.indexOf("RemoteAddr"));
			RemoteAddr = RemoteAddr.substring(11, RemoteAddr.indexOf("<br/>"));
			if (addr || ip || RemoteAddr) {
				var MyInfos = "我的IP：" + ip + '\n' + "我的地址：" + addr + '\n' + "RemoteAddr：" + RemoteAddr;
				return MyInfos; //此處為傳回值，為字符串
			} else return null;
		} else return null;
	}
};
//網站SEO信息
var SeoInfo = {

	inquireAPI: "http://seo.chinaz.com/?q=",

	regulation: function(docum) {
		if (docum) {
			var doc = docum;
			docum = docum.substring(docum.indexOf("baiduapp/"));
			var quanzhong = docum.substring(9, docum.indexOf(".gif"));

			docum = docum.substring(docum.indexOf("Rank_"));
			var Rank = docum.substring(5, docum.indexOf(".gif"));

			docum = docum.substring(docum.indexOf("blue>"));
			var sameip = docum.substring(5, docum.indexOf("<"));

			docum = docum.substring(docum.indexOf("域名年齡"));
			docum = docum.substring(docum.indexOf("blue>"));
			var domainage = docum.substring(5, docum.indexOf("<"));

			docum = docum.substring(docum.indexOf("創建於"));
			docum = docum.substring(docum.indexOf("blue>"));
			var start = docum.substring(5, docum.indexOf("<"));

			docum = docum.substring(docum.indexOf("過期時間為"));
			docum = docum.substring(docum.indexOf("blue>"));
			var lastage = docum.substring(5, docum.indexOf("<"));

			docum = docum.substring(docum.indexOf("備案號"));
			docum = docum.substring(docum.indexOf("</font>"));
			var beianhao = docum.substring(7, docum.indexOf("&nbsp;&nbsp;"));

			docum = docum.substring(docum.indexOf("性質"));
			docum = docum.substring(docum.indexOf("</font>"));
			var xingzhi = docum.substring(7, docum.indexOf("&nbsp;&nbsp;"));

			docum = docum.substring(docum.indexOf("名稱"));
			docum = docum.substring(docum.indexOf("</font>"));
			var mingchen = docum.substring(7, docum.indexOf("&nbsp;&nbsp;"));

			docum = docum.substring(docum.indexOf("審核時間"));
			docum = docum.substring(docum.indexOf("</font>"));
			var shenhe = docum.substring(7, docum.indexOf("</td>"));

			docum = docum.substring(docum.indexOf("百度流量預計"));
			docum = docum.substring(docum.indexOf('_blank">'));
			var liuliang = docum.substring(8, docum.indexOf("</a>"));

			docum = docum.substring(docum.indexOf('庫">'));
			var keydb = docum.substring(3, docum.indexOf("</a>"));

			docum = docum.substring(docum.indexOf('標題（Title）'));
			docum = docum.substring(docum.indexOf('red">'));
			var TitleN = docum.substring(5, docum.indexOf("</font>"));
			docum = docum.substring(docum.indexOf('10px;">'));
			var Title = docum.substring(7, docum.indexOf("</td>"));

			docum = docum.substring(docum.indexOf('red">'));
			var KeyWordsN = docum.substring(5, docum.indexOf("</font>"));
			docum = docum.substring(docum.indexOf('10px;">'));
			var KeyWords = docum.substring(7, docum.indexOf("</td>"));

			docum = docum.substring(docum.indexOf('red">'));
			var DescriptionN = docum.substring(5, docum.indexOf("</font>"));
			docum = docum.substring(docum.indexOf('10px;">'));
			var Description = docum.substring(7, docum.indexOf("</td>"));

			docum = docum.substring(docum.indexOf("30px"));

			docum = docum.substring(docum.indexOf('blue">'));
			var yasuo = docum.substring(6, docum.indexOf("</font>"));

			docum = docum.substring(docum.indexOf('原網頁大小'));
			docum = docum.substring(docum.indexOf('blue">'));
			var yuanshi = docum.substring(6, docum.indexOf("</font>"));

			docum = docum.substring(docum.indexOf('壓縮後大小'));
			docum = docum.substring(docum.indexOf('blue">'));
			var yasuohou = docum.substring(6, docum.indexOf("</font>"));

			docum = docum.substring(docum.indexOf('壓縮比'));
			docum = docum.substring(docum.indexOf('blue">'));
			var yasuobi = docum.substring(6, docum.indexOf("</font>"));

			var info, infos;
			if (quanzhong && quanzhong.length < 3)
				info = "百度權重：" + quanzhong;
			if (Rank && Rank.length < 3)
				info = info + '  ||  ' + "GoogleRank：" + Rank;
			if (sameip && sameip.length < 6)
				info = info + '\n' + "同IP網站：" + sameip;
			if (sameip == "<!D") info = "暫時無法獲取SEO信息 \n請稍後重試";
			if (domainage && domainage.length < 7)
				info = info + '\n' + "域名年齡：" + domainage;
			if (start && start.length == 11)
				info = info + '\n' + "創建於：" + start;
			if (lastage && lastage.length == 11)
				info = info + '\n' + "過期時間為：" + lastage;
			if (beianhao && beianhao.beianhao == 16)
				info = info + '\n' + "備案號：" + beianhao;
			if (xingzhi && xingzhi.length < 20)
				info = info + '\n' + "性質：" + xingzhi;
			if (mingchen && mingchen.length < 50)
				info = info + '\n' + "名稱：" + mingchen;
			if (shenhe && shenhe.length == 10)
				info = info + '\n' + "審核時間：" + shenhe;
			if (liuliang && liuliang.length < 10)
				info = info + '\n' + "百度流量預計：" + liuliang;
			if (keydb && keydb.length < 10)
				info = info + '\n' + "關鍵詞庫：" + keydb;
			if (yasuo && yasuo.length == 1) {
				if (yuanshi && yuanshi.length < 10)
					info = info + '\n' + "網頁大小：" + yuanshi + "KB";
				if (yasuohou && yasuohou.length < 10)
					info = info + '  ||  ' + "壓縮後：" + yasuohou + "KB";
				if (yasuobi && yasuobi.length < 8)
					info = info + '  ||  ' + "壓縮比：" + yasuobi;
			}
			if (Title) {
				if (TitleN && TitleN.length < 10)
					info = info + '\n' + "標題(" + TitleN + "個)：" + Title;
			} else {
				if (TitleN && TitleN.length < 10)
					info = info + '\n' + "標題：" + TitleN + "個";
			}
			if (KeyWords) {
				if (KeyWordsN && KeyWordsN.length < 10)
					info = info + '\n' + "關鍵詞(" + KeyWordsN + "個)：" + KeyWords;
			} else {
				if (KeyWordsN && KeyWordsN.length < 10)
					info = info + '\n' + "關鍵詞：" + KeyWordsN + "個";
			}
			if (Description) {
				if (DescriptionN && DescriptionN.length < 10)
					info = info + '\n' + "描述(" + DescriptionN + "個)：" + Description;
			} else {
				if (DescriptionN && DescriptionN.length < 10)
					info = info + '\n' + "描述：" + DescriptionN + "個";
			}
			return info; //此處為傳回值，為字符串
		} else return null;
	}
};
//查詢網站IP信息等
var SourceAPI = [{
	label: "純真 查詢源", //菜單中顯示的文字
	id: "CZ", //必須設定一個ID，以便腳本讀取
	isFlag: false, //是否作為國旗圖標的查詢源,所有自定義項目中，只能有一個設為true，其余可刪除該項或為false,當你沒有設定的時候會使用腳本預設

	isJustFlag: false, //是否僅作為國旗圖標的查詢源,如果有此項，就不會創建此項的菜單，也不會作為信息查詢源使用。該項為false的時候可刪除或注釋掉
	inquireAPI: "http://www.cz88.net/ip/index.aspx?ip=",

	regulation: function(docum) {
		if (docum) { //判斷是否有傳入值

			var s_local, myip, myAddr;
			var addr_pos = docum.indexOf("AddrMessage");
			s_local = docum.substring(addr_pos + 13);
			s_local = s_local.substring(0, s_local.indexOf("<"));
			s_local = s_local.replace(/ +CZ88.NET ?/g, "");

			var myip_pos = docum.indexOf("cz_ip");
			myip = docum.substring(myip_pos + 7);
			myip = myip.substring(0, myip.indexOf("<"));

			var myAddr_pos = docum.indexOf("cz_addr");
			myAddr = docum.substring(myAddr_pos + 9);
			myAddr = myAddr.substring(0, myAddr.indexOf("<"));


			var obj = {}; //※必須，返回結果必須為object類型，此處為聲明。
			if (myip) s_local = s_local + '\n' + '--------------------------------' + '\n' + '我的IP：' + myip; //可以顯示自己的IP，可以關閉「查詢本地信息」以節省資源
			if (myAddr) s_local = s_local + '\n' + '我的地址：' + myAddr; //加上自己的地址，可以關閉「查詢本地信息」以節省資源
			obj.SiteInfo = s_local || null; //※必須，此處為返回結果中你需要顯示的信息;當前項僅為圖標查詢源的時候可以非必須。
			//以下兩項非必須，在此項目不作為國旗圖標查詢源的時候可以不用
			obj.countryCode = null; //此處為返回結果的國家CODE。
			obj.countryName = null; //此處為返回結果的國家名稱【中文，需要lib數據庫支持】。

			return obj || null; //返回「null」的時候便使用備用查詢源；
		} else return null; //如果沒有傳入值則返回空
	}
}, {
	label: "太平洋電腦",
	id: "pconline",
	inquireAPI: "http://whois.pconline.com.cn/ip.jsp?ip=",
	regulation: function(docum) {
		if (docum) {
			var docum = docum.replace(/\n/ig, "");

			var obj = {};
			obj.SiteInfo = docum || null;
			obj.countryCode = null;
			obj.countryName = null;
			return obj || null;
		} else return null;
	}
}, {
	label: "MyIP查詢源",
	id: "myip",
	inquireAPI: "http://www.myip.cn/",
	regulation: function(docum) {
		if (docum) {
			var myip_addr, myip_flag;
			var addr_pos = docum.indexOf("來自");
			myip_addr = docum.substring(addr_pos + 4);
			myip_addr = myip_addr.substring(0, myip_addr.indexOf("."));
			if (myip_addr.indexOf("&nbsp;") !== -1)
				myip_addr = myip_addr.substring(0, myip_addr.indexOf("&nbsp;"));
			if (myip_addr.indexOf("<") !== -1)
				myip_addr = myip_addr.substring(0, myip_addr.indexOf("<"));
			if (myip_addr.indexOf("\r\n\t\t") !== -1)
				myip_addr = myip_addr.substring(0, myip_addr.indexOf("\r\n\t\t"));

			var obj = {};
			obj.SiteInfo = myip_addr || null;
			obj.countryCode = null;
			obj.countryName = null;
			return obj || null;
		} else return null;
	}
}, {
	label: "新浪 查詢源",
	id: "sina",
	inquireAPI: "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=",
	regulation: function(docum) {
		if (docum) {
			var doc = JSON.parse(docum);
			if (doc.ret == 1) {
				if (doc.isp !== '' || doc.type !== '' || doc.desc !== '')
					var addr = doc.country + doc.province + doc.city + doc.district + '\n' + doc.isp + doc.type + doc.desc;
				else
					var addr = doc.country + doc.province + doc.city + doc.district;

				var obj = {};
				obj.SiteInfo = addr || null;
				obj.countryCode = null;
				obj.countryName = doc.country || null;
				return obj || null;
			} else return null;
		} else return null;
	}
}, {
	label: "波士頓大學",
	id: "CZedu",
	inquireAPI: "http://phyxt8.bu.edu/iptool/qqwry.php?ip=",
	regulation: function(docum) {
		if (docum) {
			var s_local = docum;
			s_local = s_local.replace(/ +CZ88.NET ?/g, "");

			var obj = {};
			obj.SiteInfo = s_local || null;
			obj.countryCode = null;
			obj.countryName = null;
			return obj || null;
		} else return null;

	}
}, {
	label: "淘寶 查詢源",
	id: "taobao",
	isFlag: true,
	inquireAPI: "http://ip.taobao.com/service/getIpInfo.php?ip=",
	regulation: function(docum) {
		if (docum && JSON.parse(docum).code == 0) {
			var doc = JSON.parse(docum);
			var country_id = doc.data.country_id.toLocaleLowerCase();
			var addr = doc.data.country + doc.data.area;
			if (doc.data.region || doc.data.city || doc.data.county || doc.data.isp)
				addr = addr + '\n' + doc.data.region + doc.data.city + doc.data.county + doc.data.isp;

			var obj = {};
			obj.SiteInfo = addr || null;
			obj.countryCode = country_id || null;
			obj.countryName = doc.data.country || null;
			return obj || null;
		} else return null;
	}
}]