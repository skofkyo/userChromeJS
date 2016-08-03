rules = [
/*{
// 示例
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false, // 可选，true 表示替换 response body
state: false, // 可选，表示该规则默认关闭，state: true,  表示该规则默认开启，需要时能点击使用，重启firefox后恢复关闭状态。
},
 {
name: "google链接加密",
from: /^http:\/\/(([^\.]+\.)?google\..+)/i,
exclude: /google\.cn/i, // 可选，排除例外规则
to: "https://$1",
regex: true
}, */
{
name: "Google中文 >> Google英文",
from: /^https?:\/\/www\.google\.com\.hk\/search\?(.*)/i,
to: "https://www.google.com/ncr#$1&hl=en-US&safe=off",
exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
regex: true,
state: false, 
},{
name: "Google搜索 >> 关闭安全搜索",
from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)/i,
to: "https://www.google.com/$1$2&hl=en-US&safe=off",
exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
regex: true,
},{
    name: "Google快照 http >> https",
    from: /^http:\/\/(.*?googleusercontent\.com\/.*)$/i,
    to: "https://$1",
    regex: true
},{
name: "Userscripts >> Mirror",
from: /^https?:\/\/userscripts\.org\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},{
    name: "Wiki繁体 >> 简体",
    from: /^(https?:\/\/zh\.wikipedia\.org)\/(wiki|zh|zh((?!\-cn)[^\/])+)\/(.*)/i,
    to: "$1/zh-cn/$4",
    regex: true,
},{
name: "WiKi http >> https",
from: /^http:\/\/([^\/]+\.wikipedia\.org\/.+)/i,
to: "https://$1",
regex: true
},{
    name: "常用hosts网站 http >> https",
    from: /^http:\/\/(.*)?(youtube|google|wordpress|github|twitter|facebook|feedly|tumblr|flickr|quora|instagram)\.com\/(.*)$/i,
    to: "https://$1$2.com/$3",
    regex: true
},
/*{
    name: "【https】常用网站（一）",
    from: /^http:\/\/(upload\.wikimedia\.org|t\.williamgates\.net|dyncdn\.me|www\.baidu\.com)(.*)/i,
    exclude:/^http:\/\/www\.baidu\.com\/p\//i,
    to: "https://$1$2",
    regex: true
},{
    name: "【https】常用网站（二）",
    from: /^http:\/\/(.*?)(m-team\.cc)(.*)/i,
    to: "https://$1$2$3",
    regex: true
},
*/
{
//example: http://bbs.kafan.cn/forum.php?mod=viewthread&tid=1480897&highlight=noscript
//example: http://www.zasq.net/forum.php?mod=viewthread&tid=102909&highlight=极品家丁
name:"去除URL的highlight防止卡死",
from: /^(http:\/\/.*\.(com|cn|net)\/.*?)&highlight=(.*)/,
to: "$1",
regex: true
},
{
//Google服务转国内镜像, Http走360，Https走科大
//参考https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
//参考https://github.com/jiacai2050/gooreplacer
name: "Googleapis http >> 360",
from: /^http:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},{
name: "Googleapis https >> 科大",
from: /^https:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "https://$1.lug.ustc.edu.cn/$2",
regex: true
},{
name: "Google Theme >> 科大",
from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "http://google-themes.lug.ustc.edu.cn/$1",
regex: true
},{
name: "Google Fonts >> 科大",
from: /^https?:\/\/fonts\.gstatic\.com\/(.*)$/,
to: "https://fonts-gstatic.lug.ustc.edu.cn/$1",
regex: true
},
/*{
name: "Google Analytics>> Minggo",
from: /^https?:\/\/(.*?)(google-analytics|googletagmanager|googletagservices|googleadservices)\.com\/([\w]+\/)*([\w]+(\.[\w]+)?)/i,
to: "http://minggo.coding.io/cdn/google/$4",
regex: true
},*/
{
name: "Gravatar头像>>多说",
from: /^https?:\/\/([0-9]?)\.gravatar\.com\/avatar\/(.*)$/,
to: "http://gravatar.duoshuo.com/avatar/$1",
regex: true
},

];