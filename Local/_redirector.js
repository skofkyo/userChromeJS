rules = [
	{
		name: "about:haoutil", // 规则名称
		from: "about:haoutil", // 需要重定向的地址
		to: "https://haoutil.googlecode.com", // 目标地址
		wildcard: false, // 可选，true 表示 from 是通配符
		regex: false, // 可选，true 表示 from 是正则表达式
		resp: false // 可选，true 表示替换 response body
	},
	{
		name: "反Google搜索验证码",
		from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/www\.google\.com(?:\.hk|)\/search\?(.*q=.*)&q=.*/i,
		to: "https://www.google.com/ncr#$1",
		regex: true
	},
	{
		name: "hdwallpapers直接連結圖片",
		from: /^http:\/\/www\.hdwallpapers\.in\/(.*)-wallpapers\.html/i,
		to: "http://www.hdwallpapers.in/download/$1-1920x1200.jpg",
		regex: true
	},
	{
		name: "userscripts.org",
		from: "http*://userscripts.org/*",
		to: "http://userscripts-mirror.org/$2",
		wildcard: true,
	},
	{
		name: "ref.gamer.com.tw",
		from: "http://ref.gamer.com.tw/redir.php?url=*",
		to: "$1",
		wildcard: true,
	},
	{
		name: "noMoreArchiver",
		from: /(.*)\/archiver\/\??tid\-(\d+)(\-page\-(\d+))?\.html$/,
		to: "$1/viewthread.php?tid=$2",
		regex: true
	},
	{
		name: "2ch 顯示全部貼文",
		from: "http://*.2ch.net/*l50",
		to: "http://$1.2ch.net/$2",
		wildcard: true,
	},
	{
		name: "sohu 跳轉",
		from: "http://so.tv.sohu.com/redirect?kisId=*&url=*.html*",
		to: "$2.html",
		wildcard: true,
	},
	{
		name: "海芋",
		from: "http://0zz.cc/redir.php?url=*",
		to: "$1",
		wildcard: true,
	},
	{
		name: "微剋多資訊",
		from: "http://www.microduo.tw/plugin.php?id=dxksst_link:link&dxksst=*",
		to: "$1",
		wildcard: true,
	},
	{
		name: "greasyfork",
		from: /^https?:\/\/greasyfork\.org\/(en|zh-CN)/i,
		to: "https://greasyfork.org/zh-TW",
		regex: true
	},
	{
		name: "硬是要學",
		from: "http://www.soft4fun.net/scan/redir.php?url=*",
		to: "$1",
		wildcard: true,
	},
	{
		name: "mozest",
		from: "https://g.mozest.com/",
		to: "http://g.mozest.com/",
		wildcard: true,
	},
    //{
    //name: "flickr >> 原始大图",
    //from: /^(https?:\/\/[^.]+\.staticflickr\.com\/\d\/\d+\/(?:(?!_b)[^.])+)(\.jpg)/i,
    //to: "$1_b$2",
    //regex: true
    //},
    {
    name: "flickr >> 原始大图",
    //state: false,
    from: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_[^\._]+)(_[a-z])?(\.jpg)$/,
    exclude: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_\w+)_b(\.jpg)$/,
    to: "$1_b$3",
    regex: true
    },
	//{
	//name: "优酷收费视频 >> 脱裤视频",
	//from: /^(http:\/\/v\.youku\.com\/v_show\/*)/i,
	//to: "http://goapi.sturgeon.mopaas.com/player.php?url=$1",
	//state: true,
	//regex: true,
	//},
	//百度系
	{
	//百度云盘分享页，手机版 重定向至 电脑版
	//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
	//example: http://pan.baidu.com/wap/link?uk=1429459134&shareid=2632372014&third=4
	name: "百度盤wap/link >> share/link",
	from: /^https?:\/\/(pan|yun)\.baidu\.com\/(wap\/link)(.*)/i,
	to: 'http://pan.baidu.com/share/link$3',
	regex: true
	},
	{
	//百度云盘分享页，手机版 重定向至 电脑版
	//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
	//example: http://pan.baidu.com/wap/album/file?uk=2469870276&album_id=8356718462803856700&fsid=1135635585
	name: "百度盤wap/album/file >> pcloud/album/file",
	from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/album\/file(.*)/i,
	to: 'http://pan.baidu.com/pcloud/album/file$2',
	regex: true
	},
	{
	//百度云盘分享页，手机版 重定向至 电脑版
	//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
	//example: http://pan.baidu.com/wap/share/home?uk=3008368389&third=4
	name: "百度盤wap/share/home >> share/home",
	from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/share\/(home\?|)(.*)/i,
	to: 'http://pan.baidu.com/share/home?$3',
	regex: true
	},
{
            //百度贴吧-->旧版
	name: "百度贴吧-->旧版",
            from: /(^http:\/\/tieba\.baidu\.com\/f\?(?:ie=utf-?8&)?kw=[^&]+$)/,
            to: "$1&tp=2",
            regex: true
        },
];