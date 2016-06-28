// uAutoPagerize2.uc.js 的配置文件。

var prefs = {
    pauseA: true,            // 快速停止翻頁開關，需要刷新頁面
        Pbutton: [0, 0, 0],     // 需要按住的鍵.....0: 不按住任何鍵;1: shift鍵;2: ctrl鍵; 3: alt鍵;(同時按3個鍵.就填 1 2 3)(一個都不按.就填 0 0 0)
        mouseA: false,           // 按住鼠標左鍵..否則.雙擊;
            Atimeout: 200,      // 按住左鍵時..延時.多少生效..(單位:毫秒);
        stop_ipage: true,       // 如果在連續翻頁過程中暫停.重新啟用後.不在繼續..連續翻頁..
    ipages: [false, 2],         // 立即翻頁,第一項是控制是否在js加載的時候立即翻第二項(必須小於maxpage)的頁數,比如[true,3].就是說JS加載後.立即翻3頁.

    // 下一頁圖片延遲加載的移除，是 image 節點的屬性。該功能會把屬性地址替換到圖片地址。
    lazyImgSrc: 'zoomfile|file|original|load-src|_src|imgsrc|real_src|src2|data-lazyload-src|data-ks-lazyload|data-lazyload|data-src|data-original|data-thumb|data-imageurl|data-defer-src|data-placeholder',
};

// 頁面不刷新的站點，通過延遲加載和額外添加 hashchange 事件來解決。
var HashchangeSites = [
    { url: /^https?:\/\/(www|encrypted)\.google\..{2,9}\/(webhp|#|$|\?)/, timer: 1500 },
    { url: /^https?:\/\/www\.baidu\.com\/($|#wd=)/, timer: 1000 },
    { url: /^https?:\/\/www\.newsmth\.net/, timer: 1000 },  // 水木清華社區延遲加載及下一頁加載的修復
];

// 自定義站點，優先級最高
var MY_SITEINFO = [
	{name: '大连生活网',
		url: '^http://www\\.dlkoo\\.com/.*',
		exampleUrl: 'https?://www.dlkoo.com/down',
		nextLink: '//a[contains(text(),"下一页")]',
		pageElement: '//div[@id="mymov"]',
	},
	{name: '收藏夹 - 知乎',
		url: '^https://www\\.zhihu\\.com/collection/\\d+(\\?page=\\d+)?',
		nextLink: '//a[text()="下一页"]',
		pageElement: '//div[@role="main"]/div',
		exampleUrl: 'https://www.zhihu.com/collection/37406996?page=2',
	},
    // 下面的都是示例
    // {
    //    siteName: "google",
    //     url: '^https?\\:\\/\\/(www|encrypted)\\.google\\..{2,9}\\/(webhp|search|#|$|\\?)',
    //     nextLink: "//a[div[@id=('nn')]] | //a[span/@id='nn'] | id('nav')//td[last()]/a | id('nn')/parent::a",
    //     pageElement: "//div[@id='ires']",
    //     exampleUrl: 'http://www.google.com.hk/'
    // },
    // {
    //    siteName: '百度贴吧',
    //     url: '^http://tieba\\.baidu\\.(cn|com)/f',
    //     nextLink: '//div[@class="pager clearfix"]/descendant::a[@class="next"]',  // xpath
    //     nextLink: 'auto;',  // Super_preloader 的自动查找
    //     nextLink: 'css;.pager a.next',  // Super_preloader 的 css 选择器
    //     pageElement: '//ul[@id="thread_list"]',
    // }

    // 示例：ipages 參數的使用。打開百度後立即加載3頁。
    // {
    //     // 通過更改 pageElement 解決清爽百度的問題
    //     name: '百度搜索',
    //     url: "^https?://www\\.baidu\\.com/(?:s|baidu)\\?",
    //     nextLink: '//p[@id="page"]/a[contains(text(),"下一页")][@href]',
    //     pageElement: 'css;div#content_left',
    //     stylish: '.autopagerize_page_info { margin-bottom: 10px; }',
    //     ipages: [true, 3]
    // },
];

// 本体に組み込まれている MICROFORMAT を利用するか？
USE_MICROFORMAT = true;
