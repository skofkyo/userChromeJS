DISPLAY_TYPE =1; // 0顯示列表為radiobox, 1顯示為ua圖標列表

SITE_LIST =[
{url : "http:\/\/vod\.kankan\.com/",Name : "Safari - Mac"}, //直接可以看kankan視頻，無需高清組件
{url : "http:\/\/wap\.*",Name : "UCBrowser"}, //WAP用UC瀏覽器
{url : "http:\/\/browser\.qq\.com\/*",Name : "Chrome - Win7"}, 
{url : "http://www\\.google\\.co\\.jp\\m/",Name : "iPhone"},
{url : "http://wapp\\.baidu\\.com/",Name : "iPhone"},
{url : "http://wappass\\.baidu\\.com/",Name : "iPhone"},
{url : "http://wapbaike\\.baidu\\.com/",Name : "iPhone"},
{url : "http://weibo\\.cn/",Name : "iPhone"},
{url : "http://m\\.hao123\\.com/",Name : "iPhone"},
{url : "http://m\\.mail\\.163\\.com/",Name : "iPhone"},
{url : "http://w\\.mail\\.qq\\.com//",Name : "iPhone"},
{url : "http:\/\/m\\.qzone\\.com/",Name : "iPhone"},
{url : "http://wap\\.58\\.com/",Name : "iPhone"},
{url : "http://i\\.jandan\\.net/",Name : "iPhone"},
{url : "http://www\\.tianya\\.com\\m/",Name : "iPhone"},
{url : "http://m\\.xianguo\\.com\\wap/",Name : "iPhone"},
{url : "http:\/\/ti\\.3g\\.qq\\.com/",Name : "iPhone"},
{url : "http:\/\/[a-zA-Z0-9]*\\.z\\.qq\\.com/",Name : "iPhone"},
{url : "https?://www\\.icbc\\.com\\.cn/",Name : "Fox10.0"}, 
{url : "https?://(?:mybank1?|b2c1)\\.icbc\\.com\\.cn/",Name : "Fox10.0"},
{url : "http:\/\/www\.lightnovel\.*mobile.*",Name : "Android Droid"},
{url : "https:\/\/m\.youtube\.com\/*",Name : "Android Droid"},
],

UA_LIST=[
{name : "分隔線",},

{name: "IE6 - XP",
ua: "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
label: "IE6",
img: "data:image/png;base64,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"},

{name: "IE8 - Win7",//此處文字顯示在右鍵菜單上，中文字符請轉換成javascript編碼，否則亂碼(推薦http://rishida.net/tools/conversion/)
ua: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
label: "IE8",//此處文字顯示在狀態欄上，如果你設置狀態欄不顯示圖標
img: "data:image/png;base64,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"},

{name: "IE11 - Win7",//此處文字顯示在右鍵菜單上，中文字符請轉換成javascript編碼，否則亂碼(推薦http://rishida.net/tools/conversion/)
ua: "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
label: "IE11",//此處文字顯示在狀態欄上，如果你設置狀態欄不顯示圖標
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADl0lEQVQ4jYWSW0ybdRjG30id8WKTnZRynLC4UDcWQmQhuKzRmcUro9jpzWZEpxl1Y9ADhSEnGWwSNkFhIqIctrF1Ww9gWSmMSkvSscI6KZiO8a3062H0AF3r16z9xP/rhYbMeLEneS5/yZNfHoCnJP+Men1Auzk3NL5RGKM2PIhMrmNCOmBDWrAFNZD2f4Jfw0mV/SLIqtP1F3bLqZtTh6I+WxbLGOIxPMyJrqjiWt2tUOjrBaG/D2z/YbcWybdn1o4aCnqtzu7Zh5HFpVLCuuLR17+RKPs+jpV3dnp5VZoG4NdwAADcbeBfg18quZ6eWTVsKx33xkY890l4eT8SCtB+iY/q38awfi6Mh8c8JLvB4NsqvPIdCARxrjboWZu9o0o3cUK/xN72TWNseRcSE6CxOf/Pgg7jyuvNE+4P5JSjYoZhPzf4yb72qUdbiq+1Uy3wJgAApMrUgnd/uusccVkJG8hEogecPJe30qQdeQdx6Ll44fW0l2Uayd5vb02XTATZj3QesrthhOIeV+YAAMDOWu3lCzNzEWY5D8kk4PzZnUuIo68gdjz7pKPd9SOWo8P+B5+MeZF/3ryUKlN3AADAgZab87TnCCF2wFn5Ifyw5w7hVeucGZVaOqNSS6ef1NLbKoborNMG50lzhHxhDODbvdZIilQ1BQAAanMTQ9zPo6MzG9vmXNhIsdhAsXiKYvHUAov1Cyx+dT+GdfNRrLZG8KghgPt/no2mSFWzgGHe3j9caavBCy+Q1t9dWHsvSnLPmrzbKobof6qhU8s1dIpskE6WDtBJEhWdKFbSXJFiMUGk6Ia//JuaHpsBL/aciFVaGZRYmHB24/jM0x66ltUFMD3sXRc+3GV0H9Q4iHiKWX3/6r0gr2706uZj8lzg13CgsGv9luPyHK5YeY0rUtoTRUo6QaS0c8WKIxD+FUIrA3FtvGqNKeeMMfKp3osSC7P62agnlHvO6EguG3DsqBpazGsetxeNBYLFt8NEMOCIpUlVd4Bfw4FHN2Dl3xsnpEtVtj3NBua9AZoUmYIoskRQfDeCIksEj5nDePCGk7z14/TjjPJBapPw0qsAABAahj5fD5QBAOSV1Cft+bLj1q5qjf21Jr0//4fp2L6+OfJGl4Xht08GchpHF5PLVPoNRfLtaw78WuD6+0Hv+gbQ8TUsUKdBliU5X8AVK75PkigmE0WKuUSRYpBbqmh5sfjKAYCaZ550+DdFHgPqjIs+EgAAAABJRU5ErkJggg=="},

{name: "分隔線",},

// 偽裝 Android Droid
{  name: "Android Droid",
ua: "Mozilla/5.0 (Linux; U; Android 2.3.5; en-gb; HTC Desire HD A9191 Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
label: "Android Droid",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4jWNgQANLjln+RxcjRg5D4apTrv+XHLNEwURrhtHomgkagq4JF6adAWQBdD8S6wI4e9SA/1gDdODTAbpCkhMQXQ0AAEsuZja4+pi7AAAAAElFTkSuQmCC"},

//偽裝 Google 爬蟲
//{ name: "Googlebot",
//ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
//label:"Googlebot",
//img:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACxklEQVQ4jb2TW0hTARjHj1j0kiXdL/YSCdJDF4qECsGSQJOeWgVFrCItug260LrASaY2llvbWm6i6damZbZZbEuns9Uu7tY2d87Z2c7Z2XrxIaiwl6DA/j1Uq4guT/1fvpf///d9H3wfQfwHFfWYTK4Rt2fS5XKVK5XK5X90kyRZo9Foyq4rFAdUqtsrT5yRViYoBrzwcspqtS6SyWQbfwldukSuEYslpSRJrhoYsJ3xj4dedXUHIWsdmNq2XTe1ZasdbTeHPvb32zaYzGZJa6ty1Y8dZ5AkOc/nD5k9Xh8diSffmSyJt3v2qcDyOQSjHErmWmDoegp/KPomwWQQo1mtSCQqbmw8XU5YLJaV32CO4RFlRngJydkg6uo1YLN5sNk8anYM4NzFW2D4PBguj2Q6+2nY/cwh12qXEcbe3jVGo6Var++s6uq5a0tl89B1+DGntAlDYwnQXA519So8fOwClckhmckhmRbeaDTOWYU1RCJRscM1xtJcDjSXB83lcEPdB/ERNXbu6oWm/R4mWAETaQGJtIAEK+CJ61ldAaDW3VYEY9T09w45TKQFBOMcFiy+ioOH+xClecTYLGKpLF6ksgjEaDQ3q5YSBEEU9w/aJ3+kO0YYSM514FqLGRcu67BoyTEcONSBKMMjyvCIfKl0YQL70Gh1OMlGYqksnodZrFt/Eg63txC4/8iHshX74YsxCFM8QhQ/7XtBnf/pFrQGQ4V91Bt/aA9jdsleDA4FEKZ5hKjMa3eAel9bfwr+OItQkhO6u22l+k5LlVwuLykApNKWhQ8eDw+HKA6Np+SoWC3C8dMqyBRmtfjwlaNmq1Pmjafehhle+tszbmhomGkw9VU6PYGwJ0J9eDTqg30s0EQQBNGsUi1t0+jXEgRR9Mdf+Kqiuw8GN7uej2+5Z3PWtncaN+nvmHffMhrn/0v4J9DfDJ8BKCTDLoGbeskAAAAASUVORK5CYII="},

//{name: "分隔線",},

//偽裝 Safari - Mac OS X
//{  name: "Safari - Mac",
//ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
//label: "Safari",
//img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADWElEQVQ4jXVTW0ybBRj9zGZMXEh4MY43ZwwaNRpRBMma6EhMjGOTGegykazLplvFQpPBFkkpBWopBRmGFVqxTEvbWQq9rrS0/WsvdL1x35gbc7rJH9mg0DHGMhw5vuHU7Tydh++c5Hw5h+gfPPEQp6Kioh0CobC4Uig8UFFR8RYRbaHHgcPhZEUiEaNOp6vkcrmvXro41jEaDcxEQ76/4hEfYmHfn1PjMTPDMB8/0qCwsPBlm93OhoKh9dnp2HxwJIzWniFIlG40dg9DonRgwMng8sXExuWZSUMJj/fM/0y+PXWq/cbsNCTdFhxti0FtYaF1L8DgXUafOwVxzwwEzSZMTyUxFo949hw6lLEplkqlObNT0bk6lRVfyqLwjNxG//gD9DM3offcgi2chju2CoU5BZ7MikuTcVhMxpObz/O57GomGMKR7guw+G4iWVWLXlUEDd4HsCVWUK+dg9IyB1MgjZo+Fh16F877Xb+/m5u7nUoOHtzuthuvynU+yB0pKBNAlVCLZN5OmBr70HT2GgQ6FjXmBbTYb+FM4C5qzpyH02FGq0z2CVVVV+f4HMb7wp4QPtWkILItotR2D5LdfCx9kAeFwow9mutomViDKrGKRs9d7OscQ4AZRldHez3xjvALGKtu45h6BE/yWTxf+yvkzgW0nLuK1q+7cCd1A+1Dc+jS/4YDBhbblEt4QzaBZNiLb5qbZMTllmebf1AtNhv9IOki6CQLOnEFr7lXUGy+hgF3EncW0sj76gpIyYIcayjWjCJo70e9qLaCiGhbZ5ucCXideP3H6yD1fVB3CsTcBiecxvG+X/B5Zxz28Xk867qHrQNL0A4F8ZPm9Oo7nF1vExHRsS8Ehx36Xnzv8CDLsgIa3ACF1/C0dRkv9C+D1CnkGP7AS5ZFVDouIOqyQCQS2R6u/1NicYPHP2iAbvhnvOedR4Z3DRRcB/nXsSW0gSznEiTDo0i4rWhrkaff//CjN//VxPz8/Odq6+pGBnu/g99hRq8/jmpmEpW+aXQEJsD4GfhMerQ2y+b3lewvfuQmMjMzMz/j8+VSsZhVK2SwaVQY0mqg72yHoqkhLRAI7bkFBbmPXeVmnoyMF3fv3csrKytrKy8vP11auv94dvYrO4lo639v/wYCax87ws5wXwAAAABJRU5ErkJggg=="},

// 偽裝 Safari - Windows7
//{  name: "Safari - Win7",
//ua: "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
//label: "Safari",
//img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVQ4jYXTv0vWURQG8I9lvP4oCQvRIRN/VkPSlLzkJCRBUoJkiP+DDg3iKNTQkC01qKBCSLw1NBoRQaENLREILQ0RlIODhGIgosM9wtc3Xz1w4d5zz/Pcc55zLkdbNc7ixDFxoAMPcBu9eIRlfMUrDON8KXAZRtGPd9jBFr7hM35jN863SpEM4WMELuAmzuEMLmMEq0F85zCCqQCPoTx8tWjLxFzHd/xBu6KLLbxwULAcGmJ/D63owjaeZgke4h9uFGU1jAk8jpUL/xv8xEWoxKdIrT5erMN9Sdj3WMEltEitfYJN5OE0vkgK16MGFRgM0hlM4kqsqgxBt6h5XlK4JVJsxkvMRnnXikqbw1907jvuSh0YifM4BmLf4KA1Sl1YzGiiBkvSwPREmnASTRlwDoV47L9ZyGMDv9CXIamWJrUVrwP8rBi8b71Se3bxAdOSiAWshf+5JHxJa5ZU/iEpvYl1vJX+StlR4KxdkKYuj6s4dVjQHmMlTZu/PHeoAAAAAElFTkSuQmCC"},

 //偽裝 iPhone，查詢http://www.zytrax.com/tech/web/mobile_ids.html
{  name: "iPhone",
ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B440 Safari/600.1.4",
label: "iPhone",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADLSURBVCiRddA/C0FRGMfxc4UyGdQNpQzIKzDhFViNZvKn7y5loow3Ay/AaLQpeQUMkkWhjBbFonQM13X9efRM5/l9zjlPj9Lqu4hSJeycfuMUKy5E/wB8TNEM3I4beTHxE+HIiBjBD4BBhSVH1lj0mbDlwJgMhlZKKzw00ULNMG2Q4yzEOxLPL2iL91uvGRiKoOSCjggsFxS5C+BCAY8NYizFN26UnT3URHAi74AAcwE03lZNkg0azZ4F168hnyRNjypxQmTpUsdr9x/STR736IkaIQAAAABJRU5ErkJggg=="},

//偽裝 Apple iPad 2
{  name: "Apple iPad 2",
ua: "Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4",
label: "Apple iPad 2",
img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADG0lEQVQ4jW3R708TdxwH8HPGB0fLj0TguN5dCxkLiUSDOrLExDAXf8RHOjKJmTEKrcUftKUdlLrVWQwI18QZ2Nwsa7vatBRaaHtnqdIqFIzgZtzOLtb4wGV/h7lv33uwLIuh7z/glc/7/aGof7Otq6vrF4NeX2rmeaVFEIoCpyt+fuJE0Ts5WbzmdhfdV13FEeeQ4rDbSy6XK+LxeD6g/ks8Ht8ucFyplmHR1L4bDR+1YeeHbdhz8FOM3boN9/gEnNc9sLu/Rb/FAqPR+Nbn8+14D+B1uj+Omy6VZ5Zy6mg0UZ7KyGVvMlWOrq2XpY2NsvT8RTn/8pU65vOXu0+eLG0BdCyrfNl/GbnlHAnML2JubgaR2D3IhSyevVhB/skaXhafk/Hb0/js0KHXWwCWZRXboAOp5QKJLspISmkkMzIyS6tYX/sN+fVNFH4tkQnRi086O7cCDMsqww47Ftb/JDG5gHQijGQ6hmxiBfn5x5BWn2Jh8y8yNjqKXe3tlQBGcdhHUHgYJXImguXlVeTyjyDJElL37yObXMTjWJhc99xAc7OhUgVGGfpqBIn4PJEWQ0iml5B9kMXcXByhcBSZRAKZoJ98/c018DxfeQPLgAW53ApJxFOQ0hLSqRRkWYaUlrCQTCFfeEJs1kFwlQCdTqcY+0y4e9dHfvj+DkKhewgGgwgEAggEgpiZ+Rmz0RgxGk2VL+A4Tunu/gI/3vmJTEyK8Hq9EEUvRFHEpOjFzfEJTE1Nk1OneqDX6ysDhw8fgcvpJDarDVaLBTabFTbbICwWKwasVjiGRsjRI8dgMFQYURAEZW9HBy5ZnaTn9Bn0mi7iXJ8ZvefPwnShD2dO92BooJ907N0HQ6UvcBz/+8cde9SLwdy73uFRdco/q96YDqk3x4dV8TuP6nGcU1dD5nf7Ow+oer3wagvQ0tLyRqvVoJFtAtPEgGEY8IIAXtBjZ0MjGpkGsLpGVFdXo7W19W+z2fw/QFEUpdVqr9TW1vo1VVV+mqbDNE1HampqonV1dRENTUdoWhOuqtL4NRqNv76+3k5R1DaKoqh/AOus3HSfnM0iAAAAAElFTkSuQmCC"},

]