// uAutoPagerize2.uc.js 的配置文件。

var prefs = {
    pauseA: true, // 快速停止翻页开关，需要刷新页面
        Pbutton: [0, 0, 0], // 需要按住的键.....0: 不按住任何键;1: shift鍵;2: ctrl鍵; 3: alt鍵;(同时按3个键.就填 1 2 3)(一个都不按.就填 0 0 0)
        mouseA: false, // 按住鼠标左键..否则.双击;
            Atimeout: 200, // 按住左键时..延时.多少生效..(单位:毫秒);
        stop_ipage: true, // 如果在连续翻页过程中暂停.重新启用后.不在继续..连续翻页..
    // 下一页图片的修正，是 image 的属性
    lazyImgSrc: 'zoomfile|file|original|load-src|_src|imgsrc|real_src|src2|data-lazyload-src|data-ks-lazyload|data-lazyload|data-src|data-original|data-thumb|data-imageurl|data-defer-src|data-placeholder',
};

// 自定义站点，优先级最高
var MY_SITEINFO = [
		{name: 'easyicon.net',
		url: '^http://www\\.easyicon\\.net/iconsearch/*',
		nextLink: 'id("result_right_layout")/div[@class="page_nav units-row"]/div[@class="pages_all"]/a[text()="下一页>"]',
		pageElement: 'id("result_right_layout")',
		exampleUrl: 'http://www.easyicon.net/iconsearch/feed/&color=black',
	},  {name: '天猫',
		url: '^http://list\\.tmall\\.com//search_product\\.htm\\?q=*',
		nextLink: '//a[@class="ui-page-next"]',
		pageElement: 'id("J_ItemList")',
		exampleUrl: 'http://list.tmall.com//search_product.htm?q=%D2%F4%CF%E4&type=p&cat=all',
	},	{name: 'User scripts on Greasy Fork',
		url: '^https://greasyfork\\.org/*',
		nextLink: '//div[@class="pagination"]/a[@class="next_page"]',
		pageElement: 'id("browse-script-list")',
		exampleUrl: 'https://greasyfork.org/scripts',
	},	{name: 'Yanu',
		url: '^http://www\\.ccav1\\.com/*',
		nextLink: 'id("content-list")/div[@class="pagination"]/a[text()="下页"]',
		pageElement: '//div[@id="content-list"]',
		exampleUrl: 'http://www.ccav1.com/',
	},	{name: '软件阁',
		url: '^http://www\\.lite6\\.com/',
		nextLink: '//div[@class="fuck"]/div[@class="main"]/div[@class="left"]/ol[@class="page-navigator"]/li[@class="next"]/a',
		pageElement: '//div[@class="fuck"]/div[@class="main"]/div[@class="left"]',
		exampleUrl: 'http://www.lite6.com/',
	},	{name: 'iconarchive',
		url: '^http://www\\.iconarchive\\.com/search\\?q=*',
		nextLink: 'id("layout-search-content")/div[@class="pagination-bar"]/div[@class="pagination"]/a[@class="next"]',
		pageElement: 'id("layout-search-content")',
		exampleUrl: 'http://www.iconarchive.com/search?q=pin',
	},  {name: 'Find Icons',
		url: '^http://findicons\\.com/search/',
		nextLink: '//div[@class="pages"]/a[contains(text(), "Next")]',
		pageElement: 'id("search_con")/div[@class="icon_list icon_list_165"]',
		exampleUrl: 'http://findicons.com/search/earth',
	},	{name: 'findicons',
		url: '^http://findicons\\.com/search/*',
		nextLink: 'id("search_con")/div[@class="info_page"]/div[@class="box_page right"]/div[@class="pages"]/a[text()="下一页 >"]',
		pageElement: 'id("search_con")/div[@class="icon_list icon_list_165"]',
		exampleUrl: 'http://findicons.com/search/player',
	},	{name: 'IconPng.com',
		url: '^http://www\\.iconpng\\.com/search/*',
		nextLink: 'id("searchresults")/div[@class="paging"]/a[text()="下一页"]',
		pageElement: 'id("searchresults")',
		exampleUrl: 'http://www.iconpng.com/search/tag=download',
	},	{name: 'iconarchiveShow',
		url: '^http://www\\.iconarchive\\.com/show/*',
		nextLink: 'id("allcontent")/div[@class="contentbox"]/div[@class="pagination-bar"]/div[@class="pagination"]/a[text()="Next >"]',
		pageElement: 'id("allcontent")/div[@class="contentbox"]',
		exampleUrl: 'http://www.iconarchive.com/show/icons8-metro-style-icons-by-visualpharm.2.html',
	},	{name: '炫电影',
		url: '^http://www\\.xuandy\\.com/*',
		nextLink: '//a[text()="下一页"]',
		pageElement: 'id("center")',
		exampleUrl: 'http://www.xuandy.com/tag/dzp',
	},	{name: '八零电子书',
		url: '^http://www\\.80txt\\.com/shuku/*',
		nextLink: 'id("pagelink")/a[@class="next"]',
		pageElement: 'id("centerl")/div[@class="bookstoretwo"]/div[@class="twoleft"]',
		exampleUrl: 'http://www.80txt.com/shuku/allvisit_0_5_2_0_2_0_2.html',
	},
];

// 本体に組み込まれている MICROFORMAT を利用するか？
USE_MICROFORMAT = true;
