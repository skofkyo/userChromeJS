// ==UserScript==
// @name            SidebarPlus.uc.js
// @description     侧边栏按钮以及功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @version         LastMod 2013.12.27 突然发现自从写了配套的浮动侧栏样式以后按钮就再也没用过了，还是去掉吧
// @note            v2013.07.30 添加几个小书签脚本
// @note            v2013.07.26 添加侧栏前进、后退、刷新按钮
// @note            v2013.07.15 侧栏激活挂在主页按钮
// ==/UserScript==
/* *********************使用说明*********************
	此脚本从lastdream2013的SidebarMod.uc.js修改而来，原作者是NightsoN，感谢他们
	去除了某些我用不到的站点以及Splitter，开关直接使用FF自带的按钮或快捷键吧ctrl+B或ctrl+H
	添加侧栏前进、后退以及刷新的3合1按钮
*/

(function () {

if (!document.getElementById('sidebar-box')) return;
if (!window.SidebarMod) {
	window.SidebarMod = {
		operaLikeToggler: true,//是否显示Opera风格屏幕边缘侧边栏开关条
		sitelist:[
			{
				name: '书签',
				url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAS1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAHBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADbYEoUAAAAGHRSTlMAAY2SUm0P39erf1kowriYeDozB4UeF0rzvZ8FAAAAgklEQVQY032Q2RLCMAhFISFLsy9t7f9/qVUzQesoLxcOA8wF/kStX2hZriTEuF2QJBKfRFtEq7lsviQFoKLzdceTiCMXah2gB1LyeIxj5iUoJD5VilM5G71x9u2oeYnFSbY0HISJbit0t2pwNFHxZJUynhxbNnIH0MIkNtiG9/zjc3c2mwOIj3p50gAAAABJRU5ErkJggg=='
			},
			{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAQlBMVEUAAAAAAAAaDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKmo3AAAAFXRSTlMAOglSF9eS9e2FM38r3yC4jXNnsJ5P9lTSAAAAeUlEQVQY05WPSw6AMAhEoZb+rPXL/a8qImriSmfBTF4CGeCHfB6YqfcP6WJA5zBwd5NUgJqEkoz5WADG5Yg1nrv9JGPeNE9ZjVAGJs04qLGT4biBmiFd53GuFyJUa8tKgHSeD3ArZCtRDVgJqyqyqsb4euj9dvbwXTuDvAOuFZfV/AAAAABJRU5ErkJggg=='
			},
			{
				name: '侧栏站点',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWNxwqAAAACHRSTlMA/OCuOCwOT7FCJjwAAAAuSURBVAjXYyAeFIAQCLAKgxAYOKqBEAiwKToAEZjJLApECBZCFq4DYQrCZOIBAAKiBbmB7yqAAAAAAElFTkSuQmCC',
				childs: [
					{
                        name: 'Config',
                        url: "about:config",
                        favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABxElEQVQ4jZXQzYsScRzH8d/f16lTFCwRdOoSUYddtlrUaXTVEdR1xqfysLtUrC2EujNjbplPjIGtJIZB6YLMjqu105/w7tQhMB8+99f7C18hVpiiKGiaRjqdJplMsor5B6dSKWzbxnVdVFVdL6CqKuPxmMlkgmmaxOPx9QKapmHbNt1uF0VREEKISCRCOBxmd3d3eSyRSDAcDmk2m4RCIYLBIPl8nsFggCzLiwOyLBOLxej3+7TbbSqVCuVymVqtRqPRQJKk+QE5bSLnPhGNRrEsi06ng2VZtFot6vU61WoVn883Hz/TDLLmhOSJQ/j1N3q9HqVSiUAggCzLSJKE1+udjyXNIKs7VLq/KZ+5hI/HbGd6+P3+5c/yqQYp3eHdmcvL6pT900sK7V94Ds656/+4OOBN6CSLDuXPLocfpqjFC56bE45bP9nKjbjjNf8f2Eno7BUcjI7L4fspe4ULMrrDm8aMzRcjbnuMxde3ckP0zhX7p5fE3tqkTxzy9RmPsiM2dpZgIYS4r32n0L4iY0xIFh2O6jMeZkfceroCFkKIe4qF5+Cco9qMV9UZD1I/uPl4Rfx3G7LFdd9Xrj35wo3t9fAfyK1fDftrXK0AAAAASUVORK5CYII='
                    },
                    {
                        name: 'Stylish',
                        url: 'chrome://stylish/content/manage.html',
                        favicon: 'chrome://stylish/skin/16.png'
                    },
					{
                        name: '扩展',
                        url: 'chrome://mozapps/content/extensions/extensions.xul',
                        favicon: "chrome://browser/content/abouthome/addons.png"
                    },
                    {
                        name: '豆瓣电台',
                        url: 'http://douban.fm/partner/sidebar',
                        favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgYGBgmF9h9p8czADTfGtn9f+fD1aQhG/trIYYMr/CjGTNMIxhwNntnUThUQPwGEBxLFDVgP8/3/3///////8/32HlEzbg////8yvMIHqw8GnvApLCgKLMRGl2BgAcEBr6B9RuCQAAAABJRU5ErkJggg=='
                    },
                    {
                        name: '新浪微博',
                        url: 'http://m.weibo.cn/',
                        favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbUlEQVQ4jb1SW0gUYRQ+TAsSZA+xL5Lu7R9nptBIzJJQKCFKicAHo4cowi5gkBCtbMXiPvQQbJnrziAVCUW91IN0ISiCTXYLglYSfIkC3ZnFWt3LjLZ5a/+vB1stCiGCDhwO/Od83/l+zkf0v0IPUlU2RCfTIWqNdNC6vyawVLpmqTRqaZS1VJrKqrT/j4N9RCUJJh3VPYo6zqTm4nuASMhq1JC5ShWWRt3TGs2memnLL+BxJ9utM3lM90jcEBUkmPSx2Bs6tLbCDNGwqZKZDVGDpdJjK0y3l8GGW243RGXREBUUU2fKqCFKxw1RfmBI0otkneOgeVnoslS6Z4WpY1qjESIiSrjlNoPJheLmVeq7SW/JvlyYOk2VLlgqvaLhMrfTEOVpQ1SQ3FqLrL8b+SdPMfc2jtloDNb1G/i0p3lJkagMfdixYT0R0UQPbTPD1EQJJt/UPRKfPHIM36bSPJfLQdM0HggEEI/HOQDwhQWeOdf1Q4k8Ne5kO1f+LirpiYZdKOTzSKVScLlcICIIggCbzYZYLAYAKMx8gbGpuqjk5YpBRGU+0+XjABAMBnljYyP6+/t5S0sLiIj7/X5wzjlfXESyumbpOh7p+U8E8qPPB1rBCwUMDAzA6/UiEonAZrNBEAREo1EAwMydu0vXYXJhzCXuXSZ4XV6+UffI7zPnL2LBtLjP50NlZSWvr6/H4OAgL+S/wupTuSFtRoLJ8wkmnfjNfQ/t9lKdyZeSNdtT6c6zMHt6YV7pQfr0GSRr6qCL8pwhyvdHKljVqn5vI1rzrMxRG3e4D8cd7NSw093+xsmabtntpasC/yW+A9uHY8MWzyGVAAAAAElFTkSuQmCC'
                    },                   
                    {
                        name: '维基百科',
                        url: 'http://zh.m.wikipedia.org/',
                        favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS0lEQVQ4jcWTwY3EIAxFR6MUETpwDaPcQwekBVICOUIRLiGUQBqYlAAdhB6I/h5GQZPdaLXSrrQHDljW8/e3fSt7wW/e7f8BYQlQg4LsJcISUPYCP3vIXsJMBjFFlL3ATAZqUIgpIqYIPWqoQb0UOOtARBVQ9gLZSxARYorIW4azDsyMshfkLUOPGsz8AsQUIVoBPWrkLaPsBcwM0Qr42WN9rtCjrvADcPJADQqiFVifKw7oocJZBz/7CghLqP/be1C0As66msjMaO4N1KBO1Z11td3TFGQvIXtZjYspont0kL2sOTFFmMlcj9FZh+beVHkH4N1gZq5mXu4BEUENCnnL8LOHHjW6R1dNc9ZVoy8Bzjp0jw5mMvCzr5KJCMx88ugS4GcPIgIR1VbCEmrsmNK3q/zZzLIX6FGDiH52C2EJXyrFFE+b+mfH9AGWL1wAegygIwAAAABJRU5ErkJggg=='
                    },
                    {
                        name: '百度百科',
                        url: 'http://wapbaike.baidu.com/',
                        favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII='
                    },
                     {
                        name: 'Web QQ',
                        url: 'http://web.qq.com/',
                        favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADbUlEQVQ4jZXRbUzUdQDA8V9vXBFubbmW5DhgCcXOvzfFoFswEGNscKTWxdN4Pm6CgxM4Qm4kpzs4QQjiwUQUPXlQQx0nD1083cFu0h3kCUhiZNmDtMrpepiNOfj2olrrpS++7z7vvkIIIVRarVdJdVPwk6TSar2EEEJEqvO9jdap2UOD1/k345AH8/AsDfYFGu0LmIfnMA55+J+xTs1GqvO9RWp5dXDRZTe6Sy50l1wUX3FjGpxBW3EMZVQcoeExpJVUYhqYpuTKf67osht1eXWw2KM3yjU9TrK7neR0OznY50aVWkBoWDzy4BAkeQhBgXKUu+Ix9LnI+cdqepzs0RvlIqbQKE8640DdYSfVMkFuzSkCN79GS8tJ3tMf5Ki5liOHTfi+5E/6+3Wkn5tE3WEn6YyDmEKjXETnGSRV2yhxJ0ZIOetgt6YY2aZX0GTnU1a8H9MhPWmpGcg2BRCbmE1G5yRxJ0ZQtY0SnWeQRLhGL0U324hqspF5boLSVwNRBvvxWf0GVu6E8djpx5c163j79Y0UyTaisYyzs8lGdLONcI1eEtuSdZJkthJWP4CmrZ9Gn+f4NOBZKiQfmpN8aE/cQPXW57HL1vHhi+vJajyP8oNBJLOVbck6SQQl6yRZZS876vpRqtKJiYjl2s4Qlnyf4tHLgpXNgl/k65nbn8mu8Fh2vLmX0PoBZJW9BCXrJKFIOaDYWmsloXUQf78tJCXl8EN8BN9teYFvp6dZ9lzntwcPuP/rI95JzMLXN5CEk6NINVYUKQcUQplbqohqtbG3fZi39pWhzixg/ngrD6vLWV1dZW1tjT9XHnPj9vdk6MpR5ZWx+9QYUS02lLmlChGdZ5DUFgcpXROUWl1caNdSVbGPW9/8yM8P/2D5/u/MLd2jqTKTi+1Z6K0uUromedfi+PtCgs4oFfS5KL46jXn4cwbr3uCe5Wku5gVQZzpC/eEKrPn+/NTxDP01ERwd9VDSP01hn4sEnVESaYYquWlsllrHTVqvLdI5Zqer6zid3afpdc7w8YSL8xcsnO1ooHNknI+mFjk2cZOq8TnSDFVyEalWezeMuD2nZ5bovnEH6/wiQwuLfPLFXUaXlhn7ahnbrbvYFm5zdX6Rntmv6ZhZomHU7YlUq72FEEJsV6m8coxV8idpu0rlJYQQfwHpwVM0aLClJwAAAABJRU5ErkJggg=='
                    },
{
						name: 'Gmail',
						url: 'https://mail.google.com/mail/x/1cj43rhn0qhbt/?ltmpl=ecobh&nui=5&btmpl=mobile&shva=1',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiElEQVQ4jdWPsQ3AIAwEGYtZ2IZpvIGHoaRLm47q0wCyiY2SKspL3/mOJ4T/p8SI0TNnNKJtz5whGSUoMQLMcMOM9T7I14+UfEmHj5TUiikA4EsWGIAtMCUGvBWAWUkULFbZglrRiJREwo0IqNURDLgfjO/I2fLmJlhhN11iLngcb8GbTsHnuQAHliL7fehqZAAAAABJRU5ErkJggg=='
					},
					{
						name: 'Hotmail',
						url: 'https://login.live.com/?pcexp=false',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOklEQVQ4jWP47if3HxdmYGBgqN/F8B8XZmBgYGAYNWAwGEA5WPL+P07MwMDwfyfDf1x41IDBYwCFAABNnuSDUZI3LgAAAABJRU5ErkJggg=='
					},
					{
						name: '网易邮箱',
						url: 'http://m.mail.163.com/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWNgoAX4z8DwHxsmWTM+MaI0Y2PjNQSfIrIMIDks8CkkKxwojglcBhLlf3SDSPIGTDEuPkWuwGkAvpAnJIbXMEKuIegFfOJUAQBXtbVLrN/2QwAAAABJRU5ErkJggg=='
					},
					{
						name: 'QQ邮箱',
						url: 'http://w.mail.qq.com/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMUlEQVQ4jWWTXWxTdRyG/5jYC+ONhBjCxoWROD7cDHKBkw9ZhBQ3CMNlqBCNQFyiy0bWqRVNlPiVsKzJsBdsxrBlgChj2Qc0RWA2c5hmUGDUlkE/JrpubHbnnJ719HRtz+njBYkf25P87t7nd/W+QsyD26KIwKOO3N2NPj18xDg1/KFhdVX5XnLtcJT0bSian/+/PFpgI/yCrv3ZydSkzFhMoeLiW6zu3UCNp4am4SZ9m3u3baF4Vlj4vdzN+LvosdNMxXVkRUOWJM74T7Lz0uus7dvMocF6zoddvOE56F5zdo3l3weR9S1IbRj3bUh/TTCrzZHNZCCfh2yGsfhvfHW9iVd/2sPHvx5m8I+rbHNXOh7KflGM+r1BrBZ9vIOkZoBpYgK9vhiNXbfpv/kAslm894do/OUQzb5mTo7+YKzt3bRaEFnXQuIURKrQ4tcxARPY3+XH8oUb8ZmLRw73cykwDcBoLIB9qJG2kVasF6sdgom6u0w2YkZ2oauTAJwbmUYc9SCaBxHHriK+HqC22w9APgPe6BD2IRv7rhwICmL1GSJlmJEdZFIqhgl7+kMI5zDiuA/R6kM4r/Fi+00GQhJGziCpaBy/8Q2vuHcnBGM7M4wWYobKID2NL6bz+Ld+FrUHEO0BxIkAizqCPNY6QoNXhnwOPaHjCQ+w+cL2pCD4RJiAgFAZ2dkoJtBzR0a030OcHnt4HWFqu/2YQNY0SappbkSvsenC9qBIhiuc2fAqUhE7iiIDeXruyGztj9HglWnwyljPT9DglRkISUjjEVRZ4+d7Htb1bWkRWjRaPNHZZoxrc0hqCk3TwMxh5gww8gAYQHYqgtrWRKJ8C5r9I476jhnFvaXFQggh5Keedk6dO8EDJU5cn0PNGKSBNKDNTDJ7uYvEvkrkpcuRFy8l/XwpPe9ZW/5pYlAIi1xY6Fbq9jPzYytx1xlmur9Ddn6KUldF4uXnUDY+i/rmVtSK9SRKStzB6mqLmI/0ZIFNKV2lJ9+xkrK/RurI2+jN9aQ7Pmeu80uSNVW6VLB84Zj+S3zJsiJl5UqHunfXrdQn76N9UEuisvyWsuIZR3zJsgVz/hsDb4s1Ix8u4wAAAABJRU5ErkJggg=='
					},

					{
						name: '有道词典',
						url: 'http://dict.youdao.com/m',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg=='
					},
					{
						name: '海词词典',
						url: 'http://3g.dict.cn/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVQ4jY3Tz2vTYBzH8SB487I+U8RdxUzqhky8qCBDcOrJk/gHTBCPipTRNjAtKgh9oNXhaQOZ0B1EkLRYS5kV3Nb1hzSt1k27NGvRNa2lTZMmLcrHw5aOWFED72Nez/N9kochHJ0hHEX6+BFLhKMgHIXNTX/Y3HTJ5vZy+6bu7Wd+fwhHcXN5DamTdkvOTAmuTBmuTAnXFjOYCIRxyPMYxO29bwEGp/04/HwVidNjllheAMsLsAezGI/mcSNRhCMl4sSTBRCOzvQB8XOnLJmA2TAv4PLbdTgz5W3E3MngtB8sL2D54jhYXsBoKIf1Z0+RqLdR7f7ESl3Dg/w3HAtlwfICzi9+giMlbo/j9A71AJYXMPYqh3fVFmSjC1nv7GZ0EZMVjO4gk/ENXFqIYICjHgvgW9tCRe+goBlWQO+gonfwMP8VLC/gbDSP67EcbBx9bwE+NFQUNAOzchuzchuBmo43Db0HJL8rO2NmcTu5AZvb2+gBR4MCSi0NQmsXMJuT28irBkRF7S12KyWCcLRl2UG80sAX1cBcVe+rqBqIVxpgeQEjoSwmY9n+Ee5kNlFWNKw0DczX9F6rioGyoqEYnYLkIzgT+YiJwOv+Q7QHswhJMkpNFZuqjoLWgaTqKDVVbOTDkPwHIPkIJB/582c0EVdaRFiq4HOtjmBxC46UiOTVvb2XJR9B48UFWH6k/yl5ZY8FkXwE/wSGeQH2l2mMzEdw8O6jPoQxr/Pfsrnp0gBHPcTpHWIYhjERhmGYX1cvojf/ywBHAAAAAElFTkSuQmCC'
					},
					{
						name: '在线字典',
						url: 'http://www.chazidian.com/m/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg=='
					},
                    {
						name: '糗事百科',
						url: 'http://wap2.qiushibaike.com/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD9SURBVDhPpZM7DsJADET3VjRchYLLIGpOwXVoKBPnewRao2c0kbUkCEQx8sYej2c3u2UYBm/b1s3Mp2nycRy973snfz7uIq8a+aZpgtN1XeQKRQpEkhAAzY/7JSJ5htAIqMNnXfhQIwlNptmuh8UFQ4AE5KagjAAFYm4WyMkJwDqDEFnOgMikNYEsJC5xnueXAylqEgK30/4NqsOlORxob2oEItbIThCJM5AdklvWa8BlKOcRAprwjUDeStyDbJ9Y77sGHImxLmrOyU8Qb1PgF/wloO3EW2ChPa6RBXHUHPdA15NEFlqDOIAefn/hV+BCDyaTavBe4OjRmZk/AatB9hwTzzBfAAAAAElFTkSuQmCC'
					},
                    {
						name: 'Google翻译',
						url: 'http://translate.google.com/m/translate',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC'
					}
				]
			}],

		makeButton: function (sitelist, parent) {
			var i,
				len = sitelist.length,
				item,
				btn,
				menu,
				menupopup,
				menuitem,
				frag = document.createDocumentFragment();
				insertpoint = document.querySelector('#sidebar-header .close-icon');
			for (i = 0; i < len; i++) {
				item = sitelist[i];
				if (item.childs) {
					if (!parent) {
						btn = frag.appendChild(document.createElement('toolbarbutton'));
						btn.setAttribute('tooltiptext', item.name);
						btn.setAttribute('type', 'menu');
						btn.setAttribute('style', getIconStyle(item));
						menupopup = btn.appendChild(document.createElement('menupopup'));
						SidebarMod.makeButton(item.childs, menupopup);
					} else {
						if (item === 'sep') {
							parent.appendChild(document.createElement('menuseparator'));
						} else {
							menu = parent.appendChild(document.createElement('menu'));
							menu.setAttribute('label', item.name);
							menu.setAttribute('class', 'menu-iconic');
							menu.setAttribute('style', getIconStyle(item));
							menupopup = menu.appendChild(document.createElement('menupopup'));
							SidebarMod.makeButton(item.childs, menupopup);
						}
					}
				} else if (parent) {
					if (item === 'sep') {
						parent.appendChild(document.createElement('menuseparator'));
					} else {
						menuitem = parent.appendChild(document.createElement('menuitem'));
						menuitem.setAttribute('label', item.name);
						menuitem.setAttribute('tooltiptext', item.name);
						menuitem.setAttribute('url', item.url);
						menuitem.setAttribute('class', 'menuitem-iconic');
						// menuitem.setAttribute('src', item.favicon);
                        menuitem.setAttribute('style', getIconStyle(item));
						menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
                        menuitem.setAttribute('onclick', 'SidebarMod.itemClicked(event, this.getAttribute("url"));');
					}
				} else {
					btn = frag.appendChild(document.createElement('toolbarbutton'));
					btn.setAttribute('tooltiptext', item.name);
					btn.setAttribute('style', getIconStyle(item));
					btn.setAttribute('url', item.url);
					btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
				}
			}
			insertpoint.parentNode.insertBefore(frag, insertpoint);

            function getIconStyle(item){
                if(item.style){
                    return item.style;
                }else{
                    // 濡傛灉涓嶅瓨鍦ㄥ垯鍙栫涓€涓瓙鏉＄洰鐨?favicon
                    if(!item.favicon){
                        return item.childs && getIconStyle(item.childs[0]);
                    }
                    return 'list-style-image: url("' + item.favicon + '")';
                }
            }
		},
		makeSplitter: function () {
			var sidebarBox = document.getElementById('sidebar-box'),
				splitter = sidebarBox.parentNode.insertBefore(document.createElement('splitter'), sidebarBox),
				sidebarBoxArrow;
			splitter.setAttribute('id', 'sidebar-box-splitter');
			splitter.setAttribute('onclick', 'toggleSidebar();');
			sidebarBoxArrow = splitter.appendChild(document.createElement('div'));
			sidebarBoxArrow.id = 'sidebar-box-arrow';
			sidebarBoxArrow.className = sidebarBox.hidden ? 'right' : '';
			//sidebarBoxArrow.className = sidebarBox.collapsed ? 'right' : '';
		},
		toggleSidebar: function (commandID, forceOpen) {
			var sidebarBox = document.getElementById("sidebar-box"),
				sidebar = document.getElementById("sidebar"),
				sidebarTitle = document.getElementById("sidebar-title"),
				sidebarSplitter = document.getElementById("sidebar-splitter"),
				sidebarBoxArrow = document.getElementById('sidebar-box-arrow'),
				lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewBookmarksSidebar';

			//if (!commandID && sidebarBox.collapsed) {
			if (!commandID && sidebarBox.hidden) {
				if (sidebarBox.getAttribute('sidebarcommand') === '') {
					toggleSidebar(lastcommand, true);
					sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
				} else {
					sidebarBox.hidden = false;
					sidebarSplitter.hidden = false;
					//setToolbarVisibility(sidebarSplitter, true);
					//setToolbarVisibility(sidebarBox, true);
					if (sidebarBoxArrow) sidebarBoxArrow.className = '';
				}
				return;
			}

			if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
			let sidebarBroadcaster = document.getElementById(commandID);

			if (sidebarBroadcaster.getAttribute("checked") == "true") {
				if (!forceOpen) {
					if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
						sidebar.setAttribute("src", "about:blank");
						sidebar.docShell.createAboutBlankContentViewer(null);
						sidebarBox.setAttribute("sidebarcommand", "");
						sidebarTitle.value = "";
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					}
					sidebarBox.setAttribute("sidebarcommand", "");
					sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					sidebarBroadcaster.removeAttribute("checked");
					sidebarBox.hidden = true;
					sidebarSplitter.hidden = true;
					//setToolbarVisibility(sidebarSplitter, false);
					//setToolbarVisibility(sidebarBox, false);
					if (sidebarBoxArrow)sidebarBoxArrow.className = 'right';
					gBrowser.selectedBrowser.focus();
				} else {
					fireSidebarFocusedEvent();
				}
				return;
			}

			var broadcasters = document.getElementsByAttribute("group", "sidebar");
			for (let broadcaster of broadcasters) {
				if (broadcaster.localName != "broadcaster") continue;

				if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
				else sidebarBroadcaster.setAttribute("checked", "true");
			}

			sidebarBox.hidden = false;
			sidebarSplitter.hidden = false;
			//setToolbarVisibility(sidebarSplitter, true);
			//setToolbarVisibility(sidebarBox, true);
			if (sidebarBoxArrow)sidebarBoxArrow.className = '';

			var url = sidebarBroadcaster.getAttribute("sidebarurl");
			var title = sidebarBroadcaster.getAttribute("sidebartitle");
			if (!title) title = sidebarBroadcaster.getAttribute("label");
			sidebar.setAttribute("src", url);
			sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
			if ( title &&  title !== '') sidebarTitle.value = title;
			sidebarBox.setAttribute("src", url);
			sidebarBox.setAttribute('sidebarlastcommand', lastcommand);

			if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
			else
			fireSidebarFocusedEvent();
		},
		modifySidebarClickBehaviour: function () {
			var sidebar = document.getElementById('sidebar');
			sidebar.addEventListener('DOMContentLoaded', function(){
				if (sidebar.contentDocument){
					sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
					var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
					if (wpb) {
						wpb.onclick = null;
					}
				}
			}, false);

			eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) +
				'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
				'if (wpb) wpb.onclick = null;' + '}'
			);

			eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) +
				'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
				'if (wpb) wpb.onclick = null;' + '}'
			);
		},
        itemClicked: function(e, url){
            if(e.button == 1){
                gBrowser.selectedTab = gBrowser.addTab(url);
            }
        },
        addEventListener: function(){
            var sidebarTitle = document.getElementById('sidebar-title');
            if(sidebarTitle){
                sidebarTitle.addEventListener("click", function(e){
                    if(e.button == 1){
                        openSidebarURL();
                    }
                }, false);
            }

            function openSidebarURL(){
                var sidebar = document.getElementById('sidebar');
                if (sidebar.contentDocument){
                    var webPanel = sidebar.contentDocument.getElementById("web-panels-browser");
                    if(webPanel && webPanel.contentDocument){
                        var url = webPanel.contentDocument.URL;
                        if(!url) return;
                        gBrowser.selectedTab = gBrowser.addTab(url);
                    }
                }
            }
        },
		init: function () {
			window.toggleSidebar = this.toggleSidebar;
			this.makeButton(this.sitelist);
			if (this.operaLikeToggler) {
				this.makeSplitter();
			}
			this.modifySidebarClickBehaviour();
			var css = ('\
			@-moz-document url(chrome://browser/content/browser.xul){\
				#sidebar-box-splitter {\
					display: none!important;\
				}\
				\
				#sidebar{\
					max-width:none!important;\
          min-width:1px !important;\
				}\
         \
			}\
			');
			var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
			var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
			if (!sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
				sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
			}

            this.addEventListener();
		}
	};

	SidebarMod.init();
}

})();