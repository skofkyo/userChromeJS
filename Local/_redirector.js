rules = [

        {
            name: "wap百度手機版轉PC版",
            from: /^https?:\/\/pan\.baidu\.com\/wap\//i,
            to: "http://pan.baidu.com/pcloud/",
            regex: true
        },
        {
            name: "hdwallpapers直接連結圖片",
            from: /^http:\/\/www\.hdwallpapers\.in\/(.*)-wallpapers\.html/i,
            to: "http://www.hdwallpapers.in/download/$1-1920x1200.jpg",
            regex: true
        },
        {
            name: "about:haoutil",                  // 规则名称
            from: "about:haoutil",                  // 需要重定向的地址
            to: "https://haoutil.googlecode.com",   // 目标地址
            wildcard: false,                        // 可选，true 表示 from 是通配符
            regex: false,                           // 可选，true 表示 from 是正则表达式
            resp: false                             // 可选，true 表示替换 response body
        },
        {
            name: "userscripts:8080",
            from: /^https?:\/\/userscripts\.org\/(.*)/i,
            to: "http:\/\/userscripts.org:8080/$1",
            regex: true
        }
];