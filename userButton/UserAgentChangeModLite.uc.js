// ==UserScript==
// @name UserAgentChangeModLite.uc.js
// @namespace http://www.sephiroth-j.de/mozilla/
// @charset     utf-8
// @note  modify by lastdream2013 at 20130616 mino fix
// @note  modify by lastdream2013 at 20130409 sitelist : change SITELIST idx to Name
// @note  modify by lastdream2013 for navigator.userAgent https://g.mozest.com/thread-43428-1-2
// @include chrome://browser/content/browser.xul
// ==/UserScript==
var ucjs_UAChanger = {

	DISPLAY_TYPE : 1, // 0顯示列表為radiobox, 1顯示為ua圖標列表

	//----講解開始----
	//（1）在url後面添加網站，注意用正則表達式

	//正則表達式簡單教程：先把網址裡的/換成\/
	//然後把.換成\.
	//比如 www.google.com/for.com 就是 www\.google\.com\/for\.com

    /*
    有誤：. 代表除換行符外的所有字符，* 代表 0個或多個

	*代表任意位數的字母數字，推薦看http://msdn.microsoft.com/zh-cn/library/cc295435.aspx
	所以要通吃 http和 https 可以用 http*: 或者https?: 或者 http+:
	要通吃www.google.com/reader/2.html和 www.google.com/music/2.html,就用www\.google\.com\/*\/2\.html
    */

	// www.google.com/chrome.exe 一般通配符就可以寫成2種（.*包含了所有後綴名）
	// 即 www\.google\.com\/.exe或者www\.google\.com\/.*
	// 添加網站開始，不想要的前面添加 //

	SITE_LIST : [

    //此處添加你需要的useragent的名稱
		{
			url : "https?://www\\.icbc\\.com\\.cn/",
			Name : "Firefox10.0"
		}, {
			url : "https?://(?:mybank1?|b2c1)\\.icbc\\.com\\.cn/",
			Name : "Firefox10.0"
		},{
			url : "http://vod\\.kankan\\.com/",
			Name : "Safari - Mac"
		}, //直接可以看kankan視頻，無需高清組件

		//添加網站到此結束
	],

	//現有版本firefox的圖標
	NOW_UA_IMG: "data:image/png;base64,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",
	//其他版本firefox的圖標
	EXT_FX_LIST_IMG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADgElEQVQ4jX2Te0wUdADHf3cEyEtAJCBkDqWZBWpAirIaA7kGIpOI44CTp2EQ8qrAbNSBxFJAOx/DFlM0HoEzKGVgQJTEIw3iDjjkcXV40IaMDbEk5+DTf23h1ufvz/e/70eIVfiH59nI3lYroksbK7NruzuOt2jbSnomzipLGsKjolRmq/3/4CcvkHsqK/S5Aw/4aQWmgHuAbgVO62ZJOlU/+O5HF4KfGi435X6Yk5hWaeZ9FJmqh+pzZXT1tdH99wo9D5/Q9uAJ52eWiK+5Q03jCVo/e+f6/ZFmZyGEEBNnQsyNca7G3mh72jL86FR4cSNpJ+o5aHoMzYvLlP++SPIP0wSqtdR8XYqxV8Gt08o+o7HBQow0n3fWpzotGKIsmIy0YizSknb5ZprVudS1NnBqbpnimSUyRv9E1jSH4vgZHk9EY2iRMWsoe0Ms1Cfk6Q+YMBRswa8yKzSRttx9azPTn4RSUFJKXO9fxLTPEXLtD7aV/IxbzAUGroWB/nXmh+I/FrMn9/SM7DVlUGaNJtyWsSQX5k/uIr68EZ+L0wRVG/BWdbLpUC2OMVUEpxRx92ooy0MBTF4M7hDGD7w02r3mDEXYcUtmy5eea4mOzWRrwfc8X6LBvbCfDUl1OIWUYr67GGVWOugCeNT3Cleyfe+LcYXL8ECQNcMKB77ZbsZ3L0tJOJyPfWorL6Z/xYFjlXhmX8UuoAjptnySU6Ogz5uFZnf6Pt8xInqV/pVdPqZoFY4MhlkysU/KSIIDHZne6DI3oj+6icO5x5B4F2DqkUhnuSfLLW7MV1gxV/1qhbiTlxze6CqhK9CO0SRH7qXY0h26lvLtLmT7+uC6IwPhVYRwzWX3nn08rHJk8QtbJo9I0Xyavl9cUqnW1G/dMFS1XsrtcAd0h5wwZDlTG/sS/r4KbJzD2Lh+CzkBHgwWurOgtmcy5xlq5FvQ3azwFEIIMXZOHaQ2N1m+7GbG7bB1DB90xJDuyG9p9vQn2DKcbM1M+hpm8y2ZKV7HeL5gqi2tAiEk/965KTY6vtRUsnTpWSk/vmaDVm7P6EE7JhPXMhFvgz7FhqksK/TvWTHbFFGoUqmkTzXREBu287KHU88VB0HLCxJ+CTRDt1/CuFzCWKIJNxTOj7Rn38/73yIboqJMrseFvHkzYpe6PfC5b/sTfOt6j/iVaU7IUjorlR6r/X8ACyEFfsUfVDgAAAAASUVORK5CYII=",

	//自己在底下添加ua
	UA_LIST : [
 {name : "分隔線",},
{  
		  name: "IE6 - XP",
		  ua: "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
		  label: "IE6",
		  img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADF0lEQVQ4jZWTfVALcBjHn1rbaq1QXWiFLW8JebnK7byE0zmjVyVjKcrLEedwXg4pnXZeW7jpReTtWHpZw0zcMp3USpeXvF7ISyuu2qRQ7esPtHPyh+fP5/f9fO733HMP0X+UR9zNaVN3VKTM2lOZxVt2YzYRWf07HXDKlgIUXApSOlBgkQcrXD0+Tv4ob/ia20G8mJIpc5MqTnvGa6L6ABVcpyiN8LDm7YOC2lbDlTrjp3pTNxR17Z+YEdoJv2Pu0epQ7/Wlu/5gnaI0QnlZc1Phq66O9bqvL7UtMD/rAqo+A3ojoKrv7Jm+W59CROQYqZ7ntPR6bC/MClePl5W3fktQG3WCNENqWl13R2pZy4fVl9/rZDXtxnwDUNgMFDeZMXF71TaaVzCfREXCXkHo8SflM9NfZrrsfL5K+rgHy/Mb71OAgktExJJox24pM7XJGgBZA5B8vxP2i65vIFIwiIiIGab25SfcOWQXe1e4svyrectjYEjSi61ERLRAxSEi8stqVK2oBcTVwNqHwLjEmiOW4QOLPEh0Zaww19AQpgeC7pkxU9X+ZeqZxha/E29aBybVtzCSm74x0jthffw7OEeMGLCuvJTmKN16HS6b9Bn+JV3w1QG+WjNGyQ11/D31avv4ByUkrr5JSyoKSFJ5kaKrLlGkrpBE16QUqnH99YNivl3iqy88JTBUDQzKA6wD9m/+Y0XDNviTf24w+eXMJx95KI2Relsew0oSrVJNYJ4EOKcB5gmAIi9VEpHtzxU5j7ZaWdVmIzWBsa8VlPAaxBNFWATiu4+sJEq9zd4mIzsTsD8FsI52w3p12VNGSHaxzdbnzXaZACcHYMsA6zlpFyzwtIzBFK41EdvVkzkyROKQ3NzDyQJscwBWNsDOAmyzAU420D+9Gw6RZ68SEccisBeMI5HyXW/T0X2ES/R5leuxHvAzOiGQd0Bw8GOXYGNptfOk+Bj6+4A4bv3Et9q43uJ1bEf34W5es0O8glNTeDPiJf08Jns6DAsczeUOdO0DtJSj+6S5Pov3n5u88ICU7yeJ+GewD8kPRgBxL4eH9TwAAAAASUVORK5CYII="},

{  name: "IE8 - Win7",//此處文字顯示在右鍵菜單上，中文字符請轉換成javascript編碼，否則亂碼(推薦http://rishida.net/tools/conversion/)
ua: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
label: "IE8",//此處文字顯示在狀態欄上，如果你設置狀態欄不顯示圖標
img: "data:image/png;base64,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"},

{  name: "IE11 - Win7",//此處文字顯示在右鍵菜單上，中文字符請轉換成javascript編碼，否則亂碼(推薦http://rishida.net/tools/conversion/)
ua: "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
label: "IE11",//此處文字顯示在狀態欄上，如果你設置狀態欄不顯示圖標
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADl0lEQVQ4jYWSW0ybdRjG30id8WKTnZRynLC4UDcWQmQhuKzRmcUro9jpzWZEpxl1Y9ADhSEnGWwSNkFhIqIctrF1Ww9gWSmMSkvSscI6KZiO8a3062H0AF3r16z9xP/rhYbMeLEneS5/yZNfHoCnJP+Men1Auzk3NL5RGKM2PIhMrmNCOmBDWrAFNZD2f4Jfw0mV/SLIqtP1F3bLqZtTh6I+WxbLGOIxPMyJrqjiWt2tUOjrBaG/D2z/YbcWybdn1o4aCnqtzu7Zh5HFpVLCuuLR17+RKPs+jpV3dnp5VZoG4NdwAADcbeBfg18quZ6eWTVsKx33xkY890l4eT8SCtB+iY/q38awfi6Mh8c8JLvB4NsqvPIdCARxrjboWZu9o0o3cUK/xN72TWNseRcSE6CxOf/Pgg7jyuvNE+4P5JSjYoZhPzf4yb72qUdbiq+1Uy3wJgAApMrUgnd/uusccVkJG8hEogecPJe30qQdeQdx6Ll44fW0l2Uayd5vb02XTATZj3QesrthhOIeV+YAAMDOWu3lCzNzEWY5D8kk4PzZnUuIo68gdjz7pKPd9SOWo8P+B5+MeZF/3ryUKlN3AADAgZab87TnCCF2wFn5Ifyw5w7hVeucGZVaOqNSS6ef1NLbKoborNMG50lzhHxhDODbvdZIilQ1BQAAanMTQ9zPo6MzG9vmXNhIsdhAsXiKYvHUAov1Cyx+dT+GdfNRrLZG8KghgPt/no2mSFWzgGHe3j9caavBCy+Q1t9dWHsvSnLPmrzbKobof6qhU8s1dIpskE6WDtBJEhWdKFbSXJFiMUGk6Ia//JuaHpsBL/aciFVaGZRYmHB24/jM0x66ltUFMD3sXRc+3GV0H9Q4iHiKWX3/6r0gr2706uZj8lzg13CgsGv9luPyHK5YeY0rUtoTRUo6QaS0c8WKIxD+FUIrA3FtvGqNKeeMMfKp3osSC7P62agnlHvO6EguG3DsqBpazGsetxeNBYLFt8NEMOCIpUlVd4Bfw4FHN2Dl3xsnpEtVtj3NBua9AZoUmYIoskRQfDeCIksEj5nDePCGk7z14/TjjPJBapPw0qsAABAahj5fD5QBAOSV1Cft+bLj1q5qjf21Jr0//4fp2L6+OfJGl4Xht08GchpHF5PLVPoNRfLtaw78WuD6+0Hv+gbQ8TUsUKdBliU5X8AVK75PkigmE0WKuUSRYpBbqmh5sfjKAYCaZ550+DdFHgPqjIs+EgAAAABJRU5ErkJggg=="},

{name: "分隔線",},

{  name: "Chrome - Win7",
ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36",
label: "Chrome Win7",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACYElEQVQ4jc2SP2gTYRiHX7zLxeRyufvuu++StHB/Yu4oJL1IloZKh4Q0BZGiHqESwdhFakGKpVShgqnUQTCGIi0FNy0ScClCwUUddJOKOFlrB2MS08R/oRXc4iQYWqujz/48/OB9Af5nNAAYBoDTAJAGAPyvopem6XmO4zYwxluEkKYoinWWZV/TND0NAAf2kw8qipIKBAJfQ6HQh3A4XLUsq9zT01PVNK2GMf7hcDjuAgC9p+10Om/HYrFjpmluJhKJpzMzM+fm5uYyk5OTl1Kp1JNkMrlqGMZbnucv797t9cZ5nv9ummYuk8mcLxQK/aIoXkUIlQzDuNBqtcSxsTE7l8tdzGazZ3cFZFme9vl8O5IkPc7n87TH41lACG0TQio8z28zDJM1TXOc47jPgiA8Y1n2cEcgEAjc8vv9TVmWX8ViMUsQhLWurq53iqK88fl8VYTQvWQy2S/LcgUh1PL7/Wc6AqqqXiOEfMIYr6fT6YimaSsIoQYhZEMUxVZvb++VYDB4lBBSlyRpyzTNEx2BeDx+EmPcEASh5vF4ri8tLUWj0egjXdfX+/r67pdKpUMul2sFIVSVZXnDtm2jI7C8vOxVFOW52+2uuFyuitPpvGHb9tDs7Gwin8+HKIp6wLJs1e12N8Lh8J09zzg6OjokSdJ7hmHKFEV9YRimPDAwcAQAFhwOxzeGYT7quv6iWCwG9wwAAExMTAyrqrrW3d39cmRkZJzn+ZsAsMOybDUSiawuLi5af5R/Ua/X9Vqtptq2fdyyrIeDg4PzU1NTp5rNJvdX+Xfa7TbVbrf3/f2fe46gX/I3GtkAAAAASUVORK5CYII="},

{  name: "Chrome - Mac",
ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
label: "Chrome Mac",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7UlEQVQ4jWNgoDYwZmBgXaqjGPvIWnfdCzv96y/tDG4/s9Xfuc1ApcBTiIEPr+YmJXHd57Z6117aGfzHhl/Y6r9cqavkhVVzkoiI1Etb/Xe4NCPh3+t1lQPQ9TM/sNb1fG6jdxrNxnsv7AxOv7AzOP3S1uAMDL+w1d/ry8DABdc9Q10u5IWt/ssnVjreL231/72w039x00LL84ChauRyLaWkCjl+wV2GqpF7DFWbYHilrgLCFTcsdBa/tDP4/9RWr+u5jf6qm5a6AciueWGr/+immZbtSzuD30hiV+AGvLAzOPXSzuD/Czv9H9dMNe126KkGo/v9iJFG1XMbveNwMVuDX8gGwG17YK23dpmOYhi6ASdMNepeIBtgZ/CHgYGBEeoF7RUIk/X/PbLW83tpq38D7lw7gzd3rLSdkL3w0lb/JtwFs7XkYtDj+5mtbsA5U628kybqZbNVpGXuW+utRVZzwUyzD26ANgMD2wtb/dsozrbV//fSzuDWS1v9nQ8tdXygfKiL9L+kSQnKoSSENgUZ8xe2Bl/R/f7ESjfhha3eJWSDtxuoxWNNjf3KUtYv7fQfI7yid+yprX4uwkD9z1v1VWKxaoYBBwYGng26SoXPbPQO3zPXcX1hq3/vpZ3+uSMmaq1JIiJSeDWTAwBf3VAlT96iJAAAAABJRU5ErkJggg=="},

{  name: "Chrome - linux",
ua: "Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.462.0 Safari/534.3",
label: "Chrome linux",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB50lEQVQ4jWNgoD4wZlWLWBVrWvVinXndh+vmdR9um9W83amZtLdASMWTD69WGZcOXbOad9fM6z78x4FfqkVt8MKqWcQwScq89sM7PJph+LdmwrYAdP3MJuXPPU1r3p9GVmxW+/6eWd2H02Z1H06b1344A8Nmte/3Mkj5csF1KwbNCzGv+/DSuOq1t1nth3/mtR9eGBY/8NROPxapErEmid+mQlA75UCkdtqhJhhWi1yDcIVRyb3F5nUf/pvVvO0yq327yrjsfgCya8xq3z8yKr1na1734TeS2BW4AWa1H05BBD/8MCy+ZaedtC8Y3e962aerzGreHkcY8OEXwoC6D3DbTCqfr1WPXBOGboB+9rk6s5p3cAPMaz/8YWBgYIR4ofT+CiST/5lUvvAzq/1wA0nsjVHFEycUL9R9uAl3gUrwwhj0+DaueRNgmH85TzfnbJl00GwZk8pna5HVGORf60OKRW02s9r3t1Gj8MM/89oPt8xqP+w0qnzhY1b74R9SAH4RNM6XQ02Fbt3mZnXvv6L73bTqVYJpzbtLyAZrJ++Jx5oa5fwmW5vVvX8M11z77phZzatchIHvP2sm7IrFqhkORB14NOO3F5rVvDtsUvbQ1az2/T2z2vfndDJPtooYJknh10wGAACB6IAc8VaKWAAAAABJRU5ErkJggg=="},


// 偽裝 Android Droid
{  name: "Android Droid",
ua: "Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17",
label: "Android Droid",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4jWNgQANLjln+RxcjRg5D4apTrv+XHLNEwURrhtHomgkagq4JF6adAWQBdD8S6wI4e9SA/1gDdODTAbpCkhMQXQ0AAEsuZja4+pi7AAAAAElFTkSuQmCC"},

//偽裝 Google 爬蟲
{ name: "Googlebot",
ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
label:"Googlebot",
img:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACxklEQVQ4jb2TW0hTARjHj1j0kiXdL/YSCdJDF4qECsGSQJOeWgVFrCItug260LrASaY2llvbWm6i6damZbZZbEuns9Uu7tY2d87Z2c7Z2XrxIaiwl6DA/j1Uq4guT/1fvpf///d9H3wfQfwHFfWYTK4Rt2fS5XKVK5XK5X90kyRZo9Foyq4rFAdUqtsrT5yRViYoBrzwcspqtS6SyWQbfwldukSuEYslpSRJrhoYsJ3xj4dedXUHIWsdmNq2XTe1ZasdbTeHPvb32zaYzGZJa6ty1Y8dZ5AkOc/nD5k9Xh8diSffmSyJt3v2qcDyOQSjHErmWmDoegp/KPomwWQQo1mtSCQqbmw8XU5YLJaV32CO4RFlRngJydkg6uo1YLN5sNk8anYM4NzFW2D4PBguj2Q6+2nY/cwh12qXEcbe3jVGo6Var++s6uq5a0tl89B1+DGntAlDYwnQXA519So8fOwClckhmckhmRbeaDTOWYU1RCJRscM1xtJcDjSXB83lcEPdB/ERNXbu6oWm/R4mWAETaQGJtIAEK+CJ61ldAaDW3VYEY9T09w45TKQFBOMcFiy+ioOH+xClecTYLGKpLF6ksgjEaDQ3q5YSBEEU9w/aJ3+kO0YYSM514FqLGRcu67BoyTEcONSBKMMjyvCIfKl0YQL70Gh1OMlGYqksnodZrFt/Eg63txC4/8iHshX74YsxCFM8QhQ/7XtBnf/pFrQGQ4V91Bt/aA9jdsleDA4FEKZ5hKjMa3eAel9bfwr+OItQkhO6u22l+k5LlVwuLykApNKWhQ8eDw+HKA6Np+SoWC3C8dMqyBRmtfjwlaNmq1Pmjafehhle+tszbmhomGkw9VU6PYGwJ0J9eDTqg30s0EQQBNGsUi1t0+jXEgRR9Mdf+Kqiuw8GN7uej2+5Z3PWtncaN+nvmHffMhrn/0v4J9DfDJ8BKCTDLoGbeskAAAAASUVORK5CYII="},

{name: "分隔線",},



//偽裝 Opera 10.60
{  name: "Opera",
ua: "Opera/9.80 (Windows NT 6.1; U) Presto/2.6.30 Version/10.60",
label: "Opera",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACo0lEQVQ4jX2RXUvbABiFX5B9MgYiu3J40c0wwUKTaL9SixmspNoilZTGqkkRKyOWzphK00rFKoEKRhkq04KT/YTBBvsJbmze7Go3Y7CBOGGwe8fZlVt0unP7nPPAy0t0eVpDoRArimLA4/F0ElHLf7p/097eflfX9b2FhYVjx3GwuroK27ZhmuandDq9QETXLh0HAoFOy7K+NZtNNJtNGIaxr6rqk3K5/G53dxdbW1vI5/Nviaj1on2LrusHm5ubWFtbg2maR0R0+/Qcy7KO19fXsbGxAUVRXv6zTiQSmeXlZSwtLaHRaEBRlE03z+VyeysrK7BtG5Zlgef5yBmBpmmv6vU6qtUqKpUKYrGY4uapVOpxrVZDtVrF4uIihoeHt938hqZph3NzczBNE7quQxCEoLsQi8USMzMzmJ2dRblchqIoH/5AhmE84+PjJ4VCAYVCAZqmgeO4LrcgGo0+zOfzmJ6eRrFYRDab/UpEV4mIyOv1epPJJEZHR6GqKmRZPuF5/p5bEA6Ho9lsFpqmQVVVJJPJIyK6RUREHR0dHoZhTliWBc/z4DjuF8dx992Crq6uaE9PD3p7e8GyLLq7uw95nr95yq8zDHPIsiz8fj9CoRCi0SjrFrAsGw8Gg/D7/fD5fPD5fB/PfIFhmNfBYBCiKCIej2NwcHDYzfv7+yclSYIoigiHwxAE4cV5Qaavrw+JRAKKokCW5WduPjQ01FQUBZIkQZIkDAwMPKJzaREE4X0mk8HExASmpqZ+joyMPCAiSqVSbZOTk99zuRzGxsaQyWTenB8TEVEkEvHIsvzZMAzMz8+jVCr9KJVKz03T/FSr1WBZForF4n6lUmm7UEBElE6n7xiG8bRer39xHAfb29twHAeNRuPAtu25nZ2dK+7+bySlGGZhBGRDAAAAAElFTkSuQmCC"},

{name: "分隔線",},

//偽裝 Safari - Mac OS X
{  name: "Safari - Mac",
ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
label: "Safari",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADWElEQVQ4jXVTW0ybBRj9zGZMXEh4MY43ZwwaNRpRBMma6EhMjGOTGegykazLplvFQpPBFkkpBWopBRmGFVqxTEvbWQq9rrS0/WsvdL1x35gbc7rJH9mg0DHGMhw5vuHU7Tydh++c5Hw5h+gfPPEQp6Kioh0CobC4Uig8UFFR8RYRbaHHgcPhZEUiEaNOp6vkcrmvXro41jEaDcxEQ76/4hEfYmHfn1PjMTPDMB8/0qCwsPBlm93OhoKh9dnp2HxwJIzWniFIlG40dg9DonRgwMng8sXExuWZSUMJj/fM/0y+PXWq/cbsNCTdFhxti0FtYaF1L8DgXUafOwVxzwwEzSZMTyUxFo949hw6lLEplkqlObNT0bk6lRVfyqLwjNxG//gD9DM3offcgi2chju2CoU5BZ7MikuTcVhMxpObz/O57GomGMKR7guw+G4iWVWLXlUEDd4HsCVWUK+dg9IyB1MgjZo+Fh16F877Xb+/m5u7nUoOHtzuthuvynU+yB0pKBNAlVCLZN5OmBr70HT2GgQ6FjXmBbTYb+FM4C5qzpyH02FGq0z2CVVVV+f4HMb7wp4QPtWkILItotR2D5LdfCx9kAeFwow9mutomViDKrGKRs9d7OscQ4AZRldHez3xjvALGKtu45h6BE/yWTxf+yvkzgW0nLuK1q+7cCd1A+1Dc+jS/4YDBhbblEt4QzaBZNiLb5qbZMTllmebf1AtNhv9IOki6CQLOnEFr7lXUGy+hgF3EncW0sj76gpIyYIcayjWjCJo70e9qLaCiGhbZ5ucCXideP3H6yD1fVB3CsTcBiecxvG+X/B5Zxz28Xk867qHrQNL0A4F8ZPm9Oo7nF1vExHRsS8Ehx36Xnzv8CDLsgIa3ACF1/C0dRkv9C+D1CnkGP7AS5ZFVDouIOqyQCQS2R6u/1NicYPHP2iAbvhnvOedR4Z3DRRcB/nXsSW0gSznEiTDo0i4rWhrkaff//CjN//VxPz8/Odq6+pGBnu/g99hRq8/jmpmEpW+aXQEJsD4GfhMerQ2y+b3lewvfuQmMjMzMz/j8+VSsZhVK2SwaVQY0mqg72yHoqkhLRAI7bkFBbmPXeVmnoyMF3fv3csrKytrKy8vP11auv94dvYrO4lo639v/wYCax87ws5wXwAAAABJRU5ErkJggg=="},

// 偽裝 Safari - Windows7
{  name: "Safari - Win7",
ua: "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
label: "Safari",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVQ4jYXTv0vWURQG8I9lvP4oCQvRIRN/VkPSlLzkJCRBUoJkiP+DDg3iKNTQkC01qKBCSLw1NBoRQaENLREILQ0RlIODhGIgosM9wtc3Xz1w4d5zz/Pcc55zLkdbNc7ixDFxoAMPcBu9eIRlfMUrDON8KXAZRtGPd9jBFr7hM35jN863SpEM4WMELuAmzuEMLmMEq0F85zCCqQCPoTx8tWjLxFzHd/xBu6KLLbxwULAcGmJ/D63owjaeZgke4h9uFGU1jAk8jpUL/xv8xEWoxKdIrT5erMN9Sdj3WMEltEitfYJN5OE0vkgK16MGFRgM0hlM4kqsqgxBt6h5XlK4JVJsxkvMRnnXikqbw1907jvuSh0YifM4BmLf4KA1Sl1YzGiiBkvSwPREmnASTRlwDoV47L9ZyGMDv9CXIamWJrUVrwP8rBi8b71Se3bxAdOSiAWshf+5JHxJa5ZU/iEpvYl1vJX+StlR4KxdkKYuj6s4dVjQHmMlTZu/PHeoAAAAAElFTkSuQmCC"},


 //偽裝 iPhone，查詢http://www.zytrax.com/tech/web/mobile_ids.html
{  name: "iPhone",
ua: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16",
label: "iPhone",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADLSURBVCiRddA/C0FRGMfxc4UyGdQNpQzIKzDhFViNZvKn7y5loow3Ay/AaLQpeQUMkkWhjBbFonQM13X9efRM5/l9zjlPj9Lqu4hSJeycfuMUKy5E/wB8TNEM3I4beTHxE+HIiBjBD4BBhSVH1lj0mbDlwJgMhlZKKzw00ULNMG2Q4yzEOxLPL2iL91uvGRiKoOSCjggsFxS5C+BCAY8NYizFN26UnT3URHAi74AAcwE03lZNkg0azZ4F168hnyRNjypxQmTpUsdr9x/STR736IkaIQAAAABJRU5ErkJggg=="},

//偽裝 Apple iPad 2
{  name: "Apple iPad 2",
ua: "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
label: "Apple iPad 2",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADG0lEQVQ4jW3R708TdxwH8HPGB0fLj0TguN5dCxkLiUSDOrLExDAXf8RHOjKJmTEKrcUftKUdlLrVWQwI18QZ2Nwsa7vatBRaaHtnqdIqFIzgZtzOLtb4wGV/h7lv33uwLIuh7z/glc/7/aGof7Otq6vrF4NeX2rmeaVFEIoCpyt+fuJE0Ts5WbzmdhfdV13FEeeQ4rDbSy6XK+LxeD6g/ks8Ht8ucFyplmHR1L4bDR+1YeeHbdhz8FOM3boN9/gEnNc9sLu/Rb/FAqPR+Nbn8+14D+B1uj+Omy6VZ5Zy6mg0UZ7KyGVvMlWOrq2XpY2NsvT8RTn/8pU65vOXu0+eLG0BdCyrfNl/GbnlHAnML2JubgaR2D3IhSyevVhB/skaXhafk/Hb0/js0KHXWwCWZRXboAOp5QKJLspISmkkMzIyS6tYX/sN+fVNFH4tkQnRi086O7cCDMsqww47Ftb/JDG5gHQijGQ6hmxiBfn5x5BWn2Jh8y8yNjqKXe3tlQBGcdhHUHgYJXImguXlVeTyjyDJElL37yObXMTjWJhc99xAc7OhUgVGGfpqBIn4PJEWQ0iml5B9kMXcXByhcBSZRAKZoJ98/c018DxfeQPLgAW53ApJxFOQ0hLSqRRkWYaUlrCQTCFfeEJs1kFwlQCdTqcY+0y4e9dHfvj+DkKhewgGgwgEAggEgpiZ+Rmz0RgxGk2VL+A4Tunu/gI/3vmJTEyK8Hq9EEUvRFHEpOjFzfEJTE1Nk1OneqDX6ysDhw8fgcvpJDarDVaLBTabFTbbICwWKwasVjiGRsjRI8dgMFQYURAEZW9HBy5ZnaTn9Bn0mi7iXJ8ZvefPwnShD2dO92BooJ907N0HQ6UvcBz/+8cde9SLwdy73uFRdco/q96YDqk3x4dV8TuP6nGcU1dD5nf7Ow+oer3wagvQ0tLyRqvVoJFtAtPEgGEY8IIAXtBjZ0MjGpkGsLpGVFdXo7W19W+z2fw/QFEUpdVqr9TW1vo1VVV+mqbDNE1HampqonV1dRENTUdoWhOuqtL4NRqNv76+3k5R1DaKoqh/AOus3HSfnM0iAAAAAElFTkSuQmCC"},

{name: "分隔線",},

//  偽裝 Nokia E72
{  name: "Nokia",
ua: "Mozilla/5.0 (SymbianOS/9.3; Series60/3.2 NokiaE72-1/021.021; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/525 (KHTML, like Gecko) Version/3.0 BrowserNG/7.1.16352",
label: "Nokia",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4jaXTTUzTdwDG8e6ymO0wjdE5rPZf+f/+f0p9x2haeVkt4EsDCMqLOkAgWFGIOxg1MwozzrEpFCxvFYpS0FCoSGs0S8BNtxBFUEzIdBU06RZC0gU1btnFw9db1cRdtsNzeC6f0/NogA/+TzRvF9fAk0/sLSMlOTVD7rRTt4YtlTeC1sofgylVP41lnxnq3e28c8Decke8F+j5JRRnOTrwq1oWINruR7b7UfcFEGUB1LIAyl4/8l4/5kM/zGw9eTP/HSAUejHHVjkQXFzow2jvR190Gbm4D32RD22+F6nQR8yeKxjt/ailfawqv/oq88SgKQIcbBku0X/hxVDsQ93dQ0H1ILYjVyn8bpC26w8pd95CLvBiKO7FUOIjpqiXdeX+zgiws2rw/JK8SxgKupFyPNx/+JS//n5JeCbM71NTwD80+O4i5XSh5nej5ncTV+p7FAE+3+8bETmdqHldSJnnGR6f5PnLZ2yuuMiCTY10XhshPBMmdocHJfciSm4XKwovTUWAVbs8E0rWBWK2dyCltTL26ClXbtxnfmozC21uDpy+znR4muV57chZHajbOjDmembeANnuCTXDjZrhRtrUzOh4EE//baKSm9FudFFxKkDojxBLs84h0tyIDDexWe1vgOXpzjHZ1opic6FLdnJ7dJz23p9ZaHGitTay/+s+Hk8+Zml6M/JmF8LmIja9bToCGCxVXpHqQkltYlFSHXdHH+Dpucln8XVoE+upON7Dk8nfMG5xEm1tQk5pwrilJRgB5kXbKmJSWhGWsyxJdFB68ALZ9lZ0CXXok85iyW6g/CsP6gYHssWJYm1CWV/ljQAazSydMJ/8UyQ1IBJq0a6pRrv2e0SCA5HgQDKdISquGjm+FpFYj5pUz3x528Z3pvzRbDUjet03z9X4RpT19cgmB4qpBsVUgzDXIsx1qPENCHMNn+ozj773TJoP5xrmRCV/qzXuG9KtOByUVh8LSauPh3Qrj0wsWvblvXm6rY2zPl5s/dc3/pe8BiACa2LAfOYnAAAAAElFTkSuQmCC"},

//偽裝 日本DoCoMo手機
{  name: "DoCoMo",
ua: "DoCoMo/1.0/P502i/c10 (Google CHTML Proxy/1.0)",
label: "DoCoMo",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWM4w2D8nxLMMGoAwoCXk1f+P8Ng/P//////X05c/v+2Zy5pBvz//598F7ycuPw/DMDY14xjUPjYaLgBMHDbMxcrfcsDuzhRLoApRKYxXDA4onEEGwAAOydBL6/POBgAAAAASUVORK5CYII="},

{name: "UCBrowser",
ua: "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; Desktop) AppleWebKit/534.13 (KHTML, like Gecko) UCBrowser/8.9.0.251",
label: "UCBrowser",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFklEQVQ4jc2TsWoCQRCG9w0sgqX4CHZpfQrxGkOwC1jZKDY2NhIUUgTsghDBQgsLW21EqyuuEeGuMQge6+7tDcT6t7hweuqdB7GwGGaHYT6Y/59ljDFGRAjE7/72mwjs6nCMwdM6HBAz7gQQNlxjGmyaOmhjHevtGmrSgxp3QMv5GWC1AM8/gYTt7yiqWajRB4gIatIDf0lBfr7BGb5DtotngOU8HGAZ4FoS7mIUIaKphwKcfgO7UubSicgViI6Abg2i/HxDRFMHzyVAPyu/sStloMYduLMhuJYEWUa0jaKahWxqcI0pnK8K+Gvad0G2Ch5wNgCZupcv7kDYvsLOdz1o4Z8TslWAbGpe/8Eu8T+AyB8ZY/gAY1aTwt2Ru2IAAAAASUVORK5CYII="},

{name: "分隔線",},

{  name: "Firefox33-Mobile",
ua: "Mozilla/5.0 (Android; Mobile; rv:33.0) Gecko/33.0 Firefox/33.0",
label: "Firefox33-Mobile",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/klEQVQ4ja3TW0iTcRgG8LfoZLZIbKSbs7n5/5QiisxTFx5SO2jTZZKuUJN0SmKI5qmDWFSk62jQQVGJsGVZmlkhmGLT0qhEl8fUbeosyiwiKyK/p5saGHbXc//8eC+el+h/J65uQBLXOHo5pmFsNLppnI/WTfAxDW9N6nrT+SBts+ifxZG85eFhVx7F+156PMkKm+BZ3gz/B2PYXP8eXrVm+FXoUdrW/bFce+4AEc2aVn6uECwdUEumDudkTiXmpUFbrMA2TSbE17vhVGXCoooBSApbkVTeDIOhDm134h9OA6qUoo29KoaRVA7mo84wFkrhmV0A8ZlqzC3phFVRB5bkt2B1TjU+jTfj84gGZt1ChQXQRTucH05gGN7HwZzLwXhchp5UP1zIS4Ztvg7C3HrY7b8P+4RrKKq5DYyfxPBTOm0BuuKkZmMsB1Myh9EsDm/OynEsQQkutQIOafcgTLoJgeoKFoSdwq3aEvAfLqL7rtxsAV5Gin4O7WIwqjnoozjkbvbAqsg0WO8sgrXqMuYpNJgflIf5nin48eka+ImDuFfszRPRbCIiehIsnuqPYDDEcmjb4IJylReW+SXDYWs6NsUnwDYwA4K1iVi+ToVvvQH4aeLwSms/abmg2l/aoQ9hGIhkeK1iMCZyGEpzhTGbw8M9LlAot8HGNQq5WevxtUWEydYlaD9iV2sByjykWa0+DN0KhkEVw2A0Q2ngSkS4uMNRFgyhLBQyJ390XZVjolKMvhNO0IbKD1mAGIHA9v4aybtnvr+RKAbDbg5V4Sux19sdmmA3jBzgMJ4vhymDoSbEkX+wZY7vtC2ccXbcUeci4Vt9GPQhDP0RDIM7GQyxDMNqhtEUBmM8gz5UxDcGSE7NtObFahubghvOsu86T4YXAQz6rQw9YQx92xk6lQyV7mI+WSQoJqIZf2IOEa2Q0ezs9KWL28ukkq81nJi/u8KeL3EVfznJhP1Km0UXicibiKxmAv7EiogkRORGRBuIKIiIvIhITkQC+uuRfgGBo4s9i8pUVAAAAABJRU5ErkJggg=="},

// 偽裝Firefox10.0
{  name: "Firefox10.0",
ua: "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6",
label: "Firefox10.0",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADSklEQVQ4ja2Ta0yTBxSGD2aaQLOYGFR0mHjZYpDoXGrMHEYRK5MgmaJVAkJAYxlMnMIHghckqLMQR4EpAeSqBihhg6x1QBhYKo5mQWaUyoCVa6F8n718vdAORN790HlZ+Ln31/nznLzJOQ/R/5gFb8dt7kKRePuXhyRJ+8JjL3+2+0jYtn0JW4WhkhVE5PZf0I2IFqwUSjyEQslCIiJvnz2fhISfZk6kXK2WnLumDIlmZF9JMk8dirsa5Onn9+F7tFicsUgck780IjErTRSVtN03MCbgfF7N09JfO1DXq0Ft30PkqhtwuaoSj7XPXDUNLZUfBUV4v1kQyDCC/Rfy191T/a7T/KHV3tdohwYnrbioLMLF1mvIbMtBetttJCp+hFTRBhM/i0K54reNwXFr/62wZPWJ5M19ffoXeJ3pmRdo/1OLRLkUkfIzyO0awAW1CTtl93As7y4mORPOXClKpeWRAorOzD/H5N8ptDtnYOQdsNicAIAB/TgiytLwtbISOY/sON3CIqCgE3G3fsaU04GqX9QPvjicfJCOp8kKkrNKFbxjGhNGHmabA89NLhS3KOBffArpHRNIVXGIVQxjV24n4gsbwVutGNUbnCV1jeWUkl12Pbvkp1qz3YWxSTPsVjtuNmkhruhAQMn3iFV0I04xiqO1OuzMVuF6jQovZ6ah54wWWUW9jJis8mxpgbya5aegG+PAGa3oHTbg5v1BlLU/QUOnBlHlndhxQ4WA75R42DMEAGh+8KjrwDcZYSQ6ejY4nMk6qX/uQP8Ii6FxIziTDb0DI2jtHsZZuRobriRgQ/q3SCutA2s0AQCSpLdS14oki4kCGYFwf/K6+tauEZb/G/0jBuhZC5QdTxBf3I7QH+oRUZKBanUTeN4CAOjq1o6v2bR3/XsP9bn/3ujH/RNzrG0GA2Mc9JwF/aMcenQGGFgbMPvqxFaHE8EhofHzubBkhyhE2qZ55jK7ANbqgtk2hSnXNGZfvoJZo2UuLDK6lIg+JqJF7/rjRkTuRLRqmdeaqJPMpWalSmPTDk5CN2FBz19jc4WV1U83b9maQkS+RORJRB/M18KNiBYSkadAIPh0hbfPgdU+vmGeXt7+RO6riMjjNfjGyH8A26AFd5TyH1gAAAAASUVORK5CYII="},

{  name: "Firefox3.6-Linux",
ua: "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.8) Gecko/20100723 Ubuntu/10.04 (lucid) Firefox/3.6.8",
label: "Firefox-Linux",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADUUlEQVQ4jc3SXUxScRjH8X9ZN23V1mpWd7a1VpFJByw00Cy0BlqtHZNKpYCDAvIumXD0oBw4iuABESUgTY/aWOvN3ldbbxdtXbW21tZNq81q666X7Rxe/t3EBbnWVVu/6+8+N88DwD/YkmMW3yap1rUZAAAAgi2vPONYidRja/MBgmKreQ3qYoCiRX9UOkcn1teZh94Q03cbEYVtbekxw2V5V/iVM3G1PN8k7r3kNXaPXOY1mowIhi1fhKAoWnTUHqBqzsXTaHcoVq0nn8k9c1BJJiO/t+5Lj7X7LMNQaqQcGBYrxIjY/IqqDmqhyh7NSmyjsOZsHB5yJr8o3eepilZLbcl+RfGvdGmzy1/imHnySNY7+dVEM/ICaDB1v0yk93NiywgnsY5y++wRttoe5SS2cYiSM596EvP1AAAgUlnWaL3j2+zxm31VjhhUBuYSBVB37NoJkSGQqTTRnNhCsxJrmBVbI7l65/h7V3Jen+/I2QfFXfHruLyTflnvnsqgXuZDAaSnZ84KOwLZPYYhrtIYZMVmOi3rji3o6DkLAACsQOo28NHT6wAAIHTj+WGpfSRzAJ+EDb3JbAGkIhNeRDeQLW8fYPfohrhK0zB7qj9+pyM8W7WpoV225UjbQ6mOCAEAQFf8Rs3Bc9GvB/ApKHPGYQFkCDJdfA2VE2A+VthGsbt1g2mh1vcDUbo+CzASNvQx382x+V4AANirdtn2O8ZgjTMJ5Xg8XXjSyZuy0lZ3DsG8HKIhWYGWYsvb/ZlqK/1NQU4+wRPXm6oJYlmJXKOps4c/SjqjWbEtChXU9OsCKJy6va4C6/tcqvbm+Op+FsF8HIJRnNQWfKcPzQaa8JETO5vMUwKNB+61RqDYGk6LjDQ0jV0L/v5nwDg8Q/BaemCpuj9bpupjd6lIlq/2ZnhKAvKUbrjbEIQVZjorMgZZoT4Aj/Scfxu6+hRZBIWZ26ua8LErvNYeuK2FgGUqT4avJjkE86YFWiot1A5wSNtgjo9RsNYe/uhhHhxfhOQ3MHd/o5qaiNRahxd2tOBwy0kX3NqMw+0tvZCnJGCF3g8V/ckX7ov3/ozkh6ZSRSaakesCjEfpu5g6SV642+yduIP5Z6fbhhgbPnFrx1+R/2I/AbJCenEQqVoaAAAAAElFTkSuQmCC"},

{  name: "Firefox3.6-Mac",
ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.2.8) Gecko/20100724 Firefox/3.6.8",
label: "Firefox-Mac",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADlElEQVQ4jW2TfVDTdQCHv1dd2Da2cMCGbxgshqPmXvhtv7Ht9zZ5VVeC44CBCHdJJ5r4R4BRRp3eefSmeXVUd3qeCUhKBxmYbJIYbMPxolididoVeWd3HSrINpZ8+q/TO5//n+e/h5BHaG4mT93/SasODaW/FvKlHA0Niz2hoRhvyLf6RNiXvnNuUK3t7CRPkyfxoD9Tv/BjwnDowpLF8MUYRHzPIhIQIRIQIexfgn/9MUAgBpELS6+EvAbhcbk7WX+vT353pk8G+GKB4FKE/EkIX0pCdDQJ4RElRjteQN9nqZg5J8PigCQ617067/9AtE8+NHg4GU3bs3C5XYOugzq0f2wEJtWIjqchOqZCsD0NJYUCqt0OXG9TItIrn/q7M0NC5k+r6MXv4tCxNxVGSy4YLg86yoF9dTpcO2NAeMyAhaAOMwPpCB5ZhcoiE7YWc5jtSsT8adVmMtu+sjZ8Uo6GKjNoKw+WZcGwLKxMDpp2sJgdNiPiNyF80YB7vWp8uUcL3pGHX1pXINyxooU8OJZ8eLpViU3redgZDjzPw2rnUOEScLVNj7teGrPnacx7jHh4ToPWBjPYnCJ8sycFkbZlJ8nsF4offm5ZhnUCA44TYDJbYMnMwPf703G/R4fwWQpzZ4yY71mLv46/jB1lVlj4DTiyaw1CXyV6yD+HFP2T7ymQw1vAcgJMZjMoisK+GhOOvkVjd7UDgU9NeNipxshHOjhyN4LPLkDPmy9i5mCil9w+sLz19/flqM5/CbSNB8dxsNsZGIwU8q1aNBWrce2DVPx5SIV3KgzgswvgLt4EX70Cdw4oT5HpZkXdH3vj8XnZcuhNNnAcD5blwLEMGl0anN29EufrU7HVmQWThUGeswg7X9Xjt8Y4TL+b9Am51ajkbjTEw789Di57GtZSVthsNtgZBlZGQM46AYLDAdrKwsoKyM524Gt3Am7Wy3GzPrGCDHDkmald8Zcna+PQVfo8CukUaLQGaI0mUHQWKNqKTIsNmVkMchgzWjYoMPG6DFN18tu/1sbKCSGE3KiROa5sky0EqmTocUnwtpCAQloFgdJAoDLgtKzBG/wqHHNK4dsSi6vb4nC9Rlr+2A8TVdLc8UrpLX+5FF6XGF1OEU6sF+N4gRinnM+hf7MII+WxmNgSe2e8Uup+4pHBjUQ0USbhR0sk+y+VSr7tfUXsGSwSe0ZKJN1jpeIPx9yifL+bSB91/gMKvPB030hdHgAAAABJRU5ErkJggg=="},

		// 添加ua，到此結束
	],

	UANameIdxHash : [],

	// ----- 下面設置開始 -----
	// defautl: ステータスバーの右端に表示する
	TARGET : null, // 定義一個target，用來調整狀態欄順序,null為空

	ADD_OTHER_FX : true, // true:自動添加其他版本firefox的ua  false:不添加
	
	//2種版本firefox，下面請勿修改
	EXT_FX_LIST : [{
			name : "Firefox4.0",
			ua : "Mozilla/5.0 (Windows; Windows NT 6.1; rv:2.0b2) Gecko/20100720 Firefox/4.0b2",
			label : "Fx4.0",
			img : ""
		}, {
			name : "Firefox3.6",
			ua : "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8",
			label : "Fx3.6",
			img : ""
		},
	],
	// ----------------------
	// UA リストのインデックス
	def_idx : 0,
	Current_idx : 0,

	// 初期化
	init : function () {
		this.mkData(); // UA データ(UA_LIST)を作る
		this.mkPanel(); // パネルとメニューを作る
		this.setSiteIdx();
		// Observer 登錄
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		os.addObserver(this, "http-on-modify-request", false);
		os.addObserver(this.onDocumentCreated, "content-document-global-created", false);
		// イベント登錄
		var contentArea = document.getElementById("appcontent");
		contentArea.addEventListener("load", this, true);
		contentArea.addEventListener("select", this, false);
		var contentBrowser = this.getContentBrowser();
		contentBrowser.tabContainer.addEventListener("TabClose", this, false);
		window.addEventListener("unload", this, false);
	},
	onDocumentCreated : function (aSubject, aTopic, aData) {
		var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
		if (aChannel instanceof Ci.nsIHttpChannel) {
			var navigator = aSubject.navigator;
			var userAgent = aChannel.getRequestHeader("User-Agent");
			if (navigator.userAgent != userAgent)
				Object.defineProperty(XPCNativeWrapper.unwrap(navigator), "userAgent", {
					value : userAgent,
					enumerable : true
				});
		}
	},
	// UA データを作る
	mkData : function () {
		var ver = this.getVer(); // 現在使っている Firefox のバージョン
		// 現在使っている Firefox のデータを作る
		var tmp = [];
		tmp.name = "Firefox" + ver;
		tmp.ua = "";
		tmp.img = this.NOW_UA_IMG;
		tmp.label = "Fx" + (this.ADD_OTHER_FX ? ver : "");
		this.UA_LIST.unshift(tmp);
		// Fx のバージョンを見て UA を追加する
		if (this.ADD_OTHER_FX) {
			if (ver == 3.6) { // Fx3.6 の場合 Fx4 を追加する
				this.EXT_FX_LIST[0].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[0]);
			} else { // Fx3.6 以外では Fx3.6 を追加する
				this.EXT_FX_LIST[1].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[1]);
			}
		}
		// 起動時の UA を 初期化 (general.useragent.override の值が有るかチェック 07/03/02)
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (preferencesService.getPrefType("general.useragent.override") != 0) {
			for (var i = 0; i < this.UA_LIST.length; i++) {
				if (preferencesService.getCharPref("general.useragent.override") == this.UA_LIST[i].ua) {
					this.def_idx = i;
					break;
				}
			}
		}
	},
	// UA パネルを作る
	mkPanel : function () {
		var uacPanel = document.createElement("toolbarbutton");
		uacPanel.setAttribute("id", "uac_statusbar_panel");
		uacPanel.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		uacPanel.setAttribute("type", "menu");
		// css 解決按鈕定義在urlbar-icons撐大地址欄，變寬……
		document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
		'\
		#uac_statusbar_panel {\
		  -moz-appearance: none !important;\
		  border-style: none !important;\
		  border-radius: 0 !important;\
		  padding: 0 3px !important;\
		  margin: 0 !important;\
		  background: transparent !important;\
		  box-shadow: none !important;\
		  -moz-box-align: center !important;\
		  -moz-box-pack: center !important;\
		  min-width: 18px !important;\
		  min-height: 18px !important;\
		          }\
		#uac_statusbar_panel > .toolbarbutton-icon {\
			max-width: 18px !important;\
		    padding: 0 !important;\
		    margin: 0 !important;\
		}\
		#uac_statusbar_panel dropmarker{display: none !important;}\
		    ') + '"'), document.documentElement);

		uacPanel.setAttribute("image", this.UA_LIST[this.def_idx].img);
		uacPanel.style.padding = "0px 2px";

		var toolbar = document.getElementById("urlbar-icons");
		if (this.TARGET != null) { // default から書き換えている場合
			this.TARGET = document.getElementById(this.TARGET);
		}
		toolbar.insertBefore(uacPanel, this.TARGET);
		// UA パネルのコンテクストメニューを作る
		var PopupMenu = document.createElement("menupopup");
		PopupMenu.setAttribute("id", "uac_statusbar_panel_popup");
		for (var i = 0; i < this.UA_LIST.length; i++) {
			if (this.UA_LIST[i].name == "分隔線") {
				var mi = document.createElement("menuseparator");
				PopupMenu.appendChild(mi);
			} else {
				var mi = document.createElement("menuitem");

				mi.setAttribute('label', this.UA_LIST[i].name);
				mi.setAttribute('tooltiptext', this.UA_LIST[i].ua);
				mi.setAttribute('oncommand', "ucjs_UAChanger.setUA(" + i + ");");

				if (this.DISPLAY_TYPE) {
					mi.setAttribute('class', 'menuitem-iconic');
					mi.setAttribute('image', this.UA_LIST[i].img);
				} else {
					mi.setAttribute("type", "radio");
					mi.setAttribute("checked", i == this.def_idx);
				}
				if (i == this.def_idx) {
					mi.setAttribute("style", 'font-weight: bold;');
					mi.style.color = 'red';
				} else {
					mi.setAttribute("style", 'font-weight: normal;');
					mi.style.color = 'black';
				}
				mi.setAttribute("uac-generated", true);
				PopupMenu.appendChild(mi);
			}
		}
		uacPanel.addEventListener("popupshowing", this, false);
		uacPanel.appendChild(PopupMenu);

		// パネルの變更を可能にする
		uacPanel.setAttribute("context", "uac_statusbar_panel_popup");
		uacPanel.setAttribute("onclick", "event.stopPropagation();");
	},
	// URL 指定で User-Agent の書き換え(UserAgentSwitcher.uc.js より)
	observe : function (subject, topic, data) {
		if (topic != "http-on-modify-request")
			return;
		var http = subject.QueryInterface(Ci.nsIHttpChannel);
		for (var i = 0; i < this.SITE_LIST.length; i++) {
			if (http.URI && (new RegExp(this.SITE_LIST[i].url)).test(http.URI.spec)) {
				var idx = this.SITE_LIST[i].idx;
				http.setRequestHeader("User-Agent", this.UA_LIST[idx].ua, false);
			}
		}
	},
	// イベント・ハンドラ
	handleEvent : function (aEvent) {
		var contentBrowser = this.getContentBrowser();
		var uacPanel = document.getElementById("uac_statusbar_panel");
		var uacMenu = document.getElementById("uac_statusbar_panel_popup");
		switch (aEvent.type) {
		case "popupshowing": // コンテクスト・メニュー・ポップアップ時にチェック・マークを更新する
			var menu = aEvent.target;
			for (var i = 0; i < menu.childNodes.length; i++) {
				if (i == ucjs_UAChanger.Current_idx) {
					menu.childNodes[i].setAttribute("style", 'font-weight: bold;');
					menu.childNodes[i].style.color = 'red';
					if (!this.DISPLAY_TYPE)
						menu.childNodes[i].setAttribute("checked", true);
				} else {
					menu.childNodes[i].setAttribute("style", 'font-weight: normal;');
					menu.childNodes[i].style.color = 'black';
				}
			}
			break;
		case "load": // SITE_LIST に登錄された URL の場合
		case "select":
		case "TabClose":
			for (var i = 0; i < ucjs_UAChanger.SITE_LIST.length; i++) {
				if ((new RegExp(this.SITE_LIST[i].url)).test(contentBrowser.currentURI.spec)) {
					var idx = this.SITE_LIST[i].idx;
					this.setImage(idx);
					return;
				}
			}
			this.setImage(this.def_idx);

			break;
		case "unload": // 終了處理
			var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
			os.removeObserver(this, "http-on-modify-request");
			os.removeObserver(this.onDocumentCreated, "content-document-global-created");
			var contentArea = document.getElementById("appcontent");
			contentArea.removeEventListener("load", this, true);
			contentArea.removeEventListener("select", this, false);
			if (contentBrowser)
				contentBrowser.tabContainer.removeEventListener("TabClose", this, false);
			uacMenu.removeEventListener("popupshowing", this, false);
			window.removeEventListener("unload", this, false);
			break;
		}
	},
	// 番號を指定して UA を設定
	setUA : function (i) {
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (i == 0) { // オリジナル UA にする場合
			// 既にオリジナル UA の場合は何もしない
			if (preferencesService.getPrefType("general.useragent.override") == 0)
				return;
			preferencesService.clearUserPref("general.useragent.override");
		} else { // 指定した UA にする場合
			preferencesService.setCharPref("general.useragent.override", this.UA_LIST[i].ua);
		}
		this.def_idx = i;
		this.setImage(i);
	},
	// UA パネル畫像とツールチップを設定
	setImage : function (i) {
		var uacPanel = document.getElementById("uac_statusbar_panel");

		uacPanel.setAttribute("image", this.UA_LIST[i].img);
		uacPanel.style.padding = "0px 2px";

		this.Current_idx = i;
	},
	// アプリケーションのバージョンを取得する(Alice0775 氏のスクリプトから頂きました。)
	getVer : function () {
		var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
		var ver = parseInt(info.version.substr(0, 3) * 10, 10) / 10;
		return ver;
	},
	setSiteIdx : function () {
		for (let i = 0; i < this.UA_LIST.length; i++) {
			this.UANameIdxHash[this.UA_LIST[i].name] = i;
		}
		for (let j = 0; j < this.SITE_LIST.length; j++) {
			var uaName = this.SITE_LIST[j].Name;
			if (this.UANameIdxHash[uaName]) {
				this.SITE_LIST[j].idx = this.UANameIdxHash[uaName];

			} else {
				this.SITE_LIST[j].idx = this.def_idx;

			}
		}
	},
	// 現在のブラウザオブジェクトを得る。
	getContentBrowser : function () {
		var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"]
			.getService(Ci.nsIWindowMediator);
		var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
		if (topWindowOfType)
			return topWindowOfType.document.getElementById("content");
		return null;
	}
}
ucjs_UAChanger.init();
