var anobtnset = {
	//※必须设置	按钮放在哪个id之前，alltabs-button，back-button等
	intags: "tabbrowser-tabs",

	//※必须设置	按钮图标
	//image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABmElEQVRIic3Vz2ddURAH8I+IqqonKqqioiKLyiKqIqKqqqoi3iKL6qKriKguKp56qioekUVVFhEVVfef7eLMbY/z7i8N1S/jcmfm+z0zd+Zc/gMsYQs7hW1hdB3iFTzDBhYb/Dewiae4O5R0NZ47eNgTuxgxLzCLZyfWcRqBS/FuIcT2NFcxwj6+osIEtyJvDvsRNMVB2BRXmWATFrCNi8g/llo3h8MIKO207UQFlnEeOWcaKj5pEajwOSrq6/NmlrOeOzY6yGu7xKMege2sipe5o609tX3R/R1qvMpyDmVt6mpPhaMB5KXAhTRRnQI/cB/3BpAv43WR+7uCc80CPyNxCHb9GdUK33LntEWgCvEnWMNYmqgj3C4ExkXeJHfudQg0VXUgta7GzRDN48a5wEoP6VWU/wEPipOPoj2XRc5qEedjh8BMsTiBO+EryU8aYq1F+V2VfJLa+Rxv8b0lrnUh3/QIDLH3beSkuT2+BvlMtlxdIn1XR5NNzI9uJx5LV3Uf8Zn0U/pr1Av2Tpq0ibQHu+ZH9t/jF5XwjtYY3gV/AAAAAElFTkSuQmCC",
	image: "data:image/png;base64,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",

	//菜单弹出方向，不设置就默认,参考 https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/Positioning
	position: "",
};
/*
child:[  ]内为当前菜单的下一级菜单配置
text 为运行参数，如果无需参数，直接删除text属性
exec 为打开路径，可以是任意文件和文件夹，支持相对路径，相对于配置文件夹；
文件夹不支持直接“\\”开头的相对路径，需要用“Services.dirsvc.get("ProfD", Ci.nsILocalFile).path”开头
oncommand 可以用function(){}；
----
除了以上属性外，可以自定义添加其他属性，如果快捷键accesskey等
----
{}, 为分隔条 
----
如果设置了id属性，会尝试获取此id并移动，如果在浏览器中没有找到此id，则创建此id
*/

//下面添加菜单
/*
var anomenu = [{
		label: "我的电脑",
		text: "::{20D04FE0-3AEA-1069-A2D8-08002B30309D}",
		exec: "C:\\Windows\\explorer.exe",
	}, {
		label: '外部程序',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
				label: "测试配置1",
				text: "-no-remote -profile ProfileTest",
				exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\firefox.exe",
			}, {
				label: "测试配置2",
				text: "-no-remote -profile ProfileTest",
				exec: "\\..\\firefox.exe",
			}, {
				label: "配置文件夹",
				exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path,
			}, {}, // 分隔条
			{
				label: " 启动 Internet Explorer",
				exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe"
			}, {
				label: " Internet Explorer 打开此页",
				text: "%u",
				exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe"
			},
		]
	}, {
		label: "常用功能",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVQ4jdVTwQ2AIAx0A0ZwFD/3Ilc6EqMxkiPow9SACphoTGxyj9K7a9rQYTgEGaKILlcgQzzyiwDgamLDSdQTdA1fMJBpgz1aXkPJO43SXFKLlxdEdBbROavt+TcGj0d4bPDzHdQOBoDLD817PxYEUtPd70tqqnTom5CaADjTrW77Ai0wH7nFAAAAAElFTkSuQmCC",
		child: [{
			label: "打开文件",
			oncommand: "BrowserOpenFileWindow();",
			image: "chrome://browser/skin/places/query.png"
		}, {
			label: "隐私浏览",
			oncommand: "OpenBrowserWindow({private: true});",
			image: "chrome://browser/skin/Privacy-16.png"
		}, {}, {
			label: "遥测数据",
			oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:telemetry')",
			image: "chrome://browser/skin/Geolocation-16.png"
		}, {
			label: "关于about",
			oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:about');",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcElEQVQ4jdWTQQ6AIAwE+drs33gxaMIJL2oMIKnVi5v0QNIObboN4SIgAgmIwSNglVSB5AJ4f41AklQNkbvxJBVj8QnpOpCUn0Bco5oAs6QfAtqC9j107N1KR4ChY/eVLkZAb6qZvvBBeXVoh2Pbtjdof7mCLHWekwAAAABJRU5ErkJggg=="
		}, {
			label: "权限管理",
			oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:permissions')",
			image: "chrome://mozapps/skin/passwordmgr/key.png"
		}, {
			label: "故障排除",
			oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:support')",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4jc1SyQnDMBDcDhSBtXqmBD8MtrQflWAICGlfLsUluASX5BJSgktwXgH5iBKCIRnQZ9kZaUYD8HeopBeEcSTkmTQvpHkh5JkwjpX0IktudGhXxO1Bnhsd2kOyUdyliwZjbwvvbOGdwdinwkZxlyXXGMrtBTWG8lCkxlCmzzQYewAAg7HPzUjzYgvvwOp43w0BYOsfAMAW3q12dbwDIU/fChDytPf2qYU0q1chVtILutyu2RBP+cZTivREJb2wKgzbKlsVhrdV/gkeMqXAlXes4XwAAAAASUVORK5CYII="
		}, {
			label: "帮助支持",
			oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://support.mozilla.org/zh-CN/products/firefox')",
			image: "chrome://global/skin/icons/information-16.png"
		}, {
			label: "安全模式",
			oncommand: "safeModeRestart();",
			image: "chrome://mozapps/skin/extensions/alerticon-warning.png",
		}, ]
	}, {
		label: '谷歌站內搜索',
		oncommand: function() {
			gBrowser.loadURI("javascript:q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22%E8%AF%B7%E8%BE%93%E5%85%A5%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.google.com/search?num=30&amp;hl=zh-CN&amp;newwindow=1&amp;q='+q+'&amp;sitesearch='+location.host+'');window.open(qlocation);}%20void%200")
		}
	},

	//移动 工具 菜单
	{
		id: "tools-menu",
		label: "工具菜单",
		accesskey: "",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcElEQVQ4jdWTQQ6AIAwE+drs33gxaMIJL2oMIKnVi5v0QNIObboN4SIgAgmIwSNglVSB5AJ4f41AklQNkbvxJBVj8QnpOpCUn0Bco5oAs6QfAtqC9j107N1KR4ChY/eVLkZAb6qZvvBBeXVoh2Pbtjdof7mCLHWekwAAAABJRU5ErkJggg==",
	}, {
		id: "charsetMenu",
		label: "字符编码",
		accesskey: "",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jdWSsQ2AMAwEr6TMQJQMlAGyQ5SakgEyCgNQMgYFFHERmRAiaOA7v30vSzb8QSOwvgmYgdg6bIEdCFJ3wAa4rOdbYYBevEHNnEJKcO6bgue1oWGACVgq2/rqWgJPlYCgjTzEiGfv4KuQQeq+BS6FONIJu1ZYK5Ke6LFW0ht/XAcCHjHf2jnyJAAAAABJRU5ErkJggg==",
	}, {
		label: "书签管理",
		oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS0lEQVQ4jY1SzUoCURi9IL5CVJuEKAoShNk5ejnnPEQEQgQiGESrgt4gaC0qhSHVoh96ETe+SJt2peBt802MMlNz4YO55/vOz3cZ53KOpIGkYDXIm8s8ANYlBZILkgtJoV6vrxUWIDky5zeS7/Z9V9T9wNznjUZjF8Aeybmk4L3fzyO1SA5JTrP2Jnmb4CSnJIcAWqtxk/qSNGk2mxuJQBzHm5Imkr7TsyRHLiEB6AKoRVFUzlsviqIygBqArhmF3wQkn5xzpQLPVCL5kk6wJenTgP5/bJJ9S/0Rx/Gmc8457301tdd5HlnSRTLnva8uNQGcmUCvgPtpVvPGBC7/SHAlKQC4zmq+msChJaqQ7JPsAagYdmQzz1kJHqx5THJMcpZ6lxnJewAndh9nJeis/FBB0qPVEg6gnbdjx5J0JG0nuPd+B0Cb5HiV/AOStMNZrdTkSAAAAABJRU5ErkJggg=="
	}, {
		label: "打开选项",
		oncommand: "openPreferences();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVQ4jY2SP0sDQRDFr1UEUTRW+Q7iieGO7N57z8I/WJvSxlJrQS2sbSz9BulESGUEQRtbGwULrdKJaCEE03g2k3DGu1wWlllm5/dm9rFBMGIB2JPUIvkpqQVgd1T9YNVqtQWSbUlpzj4vFSB5JSkl+QKgUa/XZwDskPyRlAJYLBs7lfTqnJs3wU1JPcvf92Mcx5V/ApIurUsjk/u2iW4sPli8yBN4N4G5TG7gAcnnOI4rdn7Le/+HpDSKotkcgZ5zbimKogkT6P6BkySJMp2SIp+SJNmwuusi+LQIDsNwmuSj1R2Wws65FQBTYRhOAtiS9GR1d0EQBAGA5SIYwFHeZyJ5672v9k1r2sVZEUzyi2SXZBvAwbDrHUmp975K8tlcP+7DANaL/BieYN97X5V0MjZsAtsF71wrhbMiJJskOxZXx2V/AYbjyhDulDKPAAAAAElFTkSuQmCC"
	}, {
		label: "附加组件",
		oncommand: "BrowserOpenAddonsMgr();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfElEQVQ4jc2SSwqFQAwE+14KSWWn1/YqosfwrRzEEeNv8RqyCZki3RnpSwFDRCwRsQBD1q+0Dq2V9SVJZtYB034oK2Ays05PHm8hZT13b69m5e5tsXPkq/J5klcFyEJMAa83uKo/BNw5I9AUwMuPNAvogfkBYAT6u9Yr/QBtWNOEJkNI4gAAAABJRU5ErkJggg=="
	}, {
		label: "参数设置",
		oncommand: "toOpenWindowByType('pref:pref', 'About:config');",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABC0lEQVQ4jZWTTUrEUBCEc6DZyIC7pPurQVAh4F2EgAreRQKjSzE4Ki4H/J0jCAoeJC58Ay9vEuP0sruruqvozrKecPcJsJTUSmqBpbtP+no7AZwCdzE4JpG0AE6GwLcpaF3rIXtIwVUofJnZgaRLYBbVZ8AcOAQ+Qu95Fk1oJLVmVo7JNLO9QPC4YRhwNUYgqe4YmximaO0p8A6s8jzfjTYgNjZLDYsmvUaNq576L26IAHiONnsbJBiSUBTFjqQn4AWYrvPu7h0JiYnzMROBi43rBK4lte5+NEbg7vuB4D5OHofkt5mVkmozI1m7NrMS+AzDzlJTbv57ypIWQ/oqSc0fz9QA1ZjMrd75B1lk19vKzwu4AAAAAElFTkSuQmCC"
	}, {
		label: "错误控制台",
		oncommand: "toJavaScriptConsole();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC"
	}, {
		label: "关于浏览器",
		oncommand: "openAboutDialog();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACK0lEQVQ4jc2RQUsbQRTHh7DZ7JiZ7CQZw+w6klmjm1yCmE1KaSLIghcPUgs5hPSQD+AHkCLFHnroqYcGeqilVE9NkSAhBw+yJ/FQSiiylPdpphdj1dj22gd/mOH9/z/evEHofytx727eOlv/CpuEkNMoioxkMlnDGH/d2Nh4PG32ej2Ry+VeIYQyD6bz+fxzzjk4jrOfzWavarXaO621cduzubnZI4ScIoTmZgCu637xPA+KxSJ4ngdKqTOM8dtUKuVPPVEUMdd1J9ls9sWd8MHBgek4Tuz7PpTLZfB9H5RSP9fX1z8NBoMcQgi1220ipXxWqVROOOc/giD4PUWz2XQdxwHP88DzPFhZWblaW1s70VrfeW+1Wt1bXFy8FELAwsLCzX7Q6uqqXygUQEoJUkoolUoXh4eHjxBCmUQisWsYRogQQkqpnhAChBCwtLS0dQPodrsyn8/DtMk5h3Q6PUmlUhMp5Xmn03mKEEKMsY/z8/PAOYdGo/HkBhDHsSmEuOScw1TFYvFie3v7zWg0qriuO2ea5h6lFDjnIIT4PhwO2Z1FBkGwb9s2MMaAMQaUUrBt+zyZTB4bhvHNsizIZDJg2za0Wq29mW8cj8dCKXVGKQVKKRBCAGMMlmUBxhgIIUApheXl5WEcx7kZwDXEr9frx+l0GjDGMwqC4HMURerB8LS01uzo6Chst9svwzB8H4bhh52dndf9fn9La83+Gr4HSmitrWsZf/L9AnXzp979k0QwAAAAAElFTkSuQmCC"
	}, {
		label: "重启浏览器",
		oncommand: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII="
	}, {
		label: "退出浏览器",
		class: "menuitem-iconic",
		oncommand: "Application.quit();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACtElEQVQ4jY2ST0gUYRjGn9m1Yb/d+WZ3/u/MzsqMMy4uC0ogDawEkuDBhCCQlAg9SBety4aXooiQPRh0bUnKQ38gKOlkFpGEWmQEJRsVKaXW6qpdlDp0mC4aW2L1Xj543uf3vu/3fh/w92gEcB5A9T98O6O5uTnEcdxkJBLxo9Fo4X85DcBZAPt6enpCyWTyhWmaK5Zl3drKtwMYAEB2kISQBCFkihDygxAymcvlZNd1p13XLafT6eGuri6ZEPKJEPKdEHLHMIxwJR+klN6RZbkcj8eXPc8rjI6OxhzHeeo4Trm2tvZaoVAINzQ03Nc07bMoil8ppRd/0ZIkHRZFcS2RSCy2tLTc3djYUFpbWyO2bT+3LKvsuu51AJidnU17nvfEMIwFQRCWFEXZu13ghqZp5bq6uuLY2Fj91hJjyWRyxjTNck1Nzc3tZoODgwcty/qoquqaJEkX0NTURGVZnlFVdbWxsfHqtnFgYIDquv5SEIRv1dXVt7d13/f3ZDKZcUVRVlVVvQfP80xZlouyLK+n0+nTlYvp7u4+lc1mp/r7+49U6qlUaliSpHVN0ybQ29urKYryShCEdcMw8pXGYrHIbm5uxn3fD/z21pp2SxCEdV3XH8D3/SrTNMcppSuxWOxxR0dHcLdPAgCZTCYei8WKlNKy4zhXAADZbPYMx3Gr4XB4mef5k38rwHHcpUgksszz/Ep7e/tRAMDIyIiTSCResyy7yLLsQiAQOAGA/YONVlVVDYZCoS8sy352XffR3Nxc9Fe2r6/vWDQaXQoEAgvBYLDEMMxDAOcA9APIA5gOBoPLDMMsqqr6Pp/PH9gxXi6XO67r+hsAJQAlhmFWAaxtnSWGYUq2bc8MDQ0d2vWOExMT+9va2i7btv2M5/l3lNIPoii+TaVSk52dnUPz8/P1lf6fdmi4VMHjbpAAAAAASUVORK5CYII="
	}
]
*/


var anomenu = [
	{
		id: "file-menu",
		label: "檔案",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4ja3MzUvCcADG8d29dgzqoPamoJaESoZNmtmmLtPZXnQ5Z21mtsxRIA4ED0FCN//VNOHp1CF+s3bogc/x+VLUf23DH5pshePznWgSu7HUD9uRBPx7+x/r/pCzMhBNnCxzvAxOaBKyXA1mz9ZCB0fzzWDEPXKcu4CoW5Bv+gSGlwHA1zItLRxPu0dorgrFeHLF8BIoiqIA+MyerYXj6TkRyBZqaHRsVyWpjcPMGWIpGpnzSyRpFkTgtCjiuvviSjEGqKh3KCsGBO0eNCuQAYaXofWGnjC8TAZy5Tr0R8eTXLlOBvIVFbeDsSf5ikoGWKGJzvPEE1ZokgFO1NEdvnrCiToZKEltPDhvnpSkNhkoXLWWljNFf/z+K8uZoijqCyJQVY1Z3RwsNGuE1gqaNYLSsT+rDWNGBACsAQgACP4hAGDt+/cFdf2I5rQvZZQAAAAASUVORK5CYII=",
	}, 
	{
		id: "edit-menu",
		label: "編輯",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABeUlEQVQ4jY3QP2vTURTG8SO0ghQpYgcdBEFcOlUCKSEk3JDk5v7u9zljBkEn3Rx8A30FDi7Oxc3BRTDoYKDURbCb4KD4Akq3Dh2KfxKXXyToLzEHzvh5nnuP2Yoj6TZw4O6fc84PV3V/JoRwzd1P3H0KfAfurWrXgJfu/g6oufuXWUhK6e5SGWPcGAwG9/v9/g5wLOmoKIpt4GsZ8nEhrtVq65JeAz/cfdTtdlvAmaSj8iUnOee9Slyv169KeuXu09nmnJ/HGNvAMTBut9s3Go3Gpco//43nQkYhhB3gTWVzs9m8LOltFS73p6THIYS1f3AIYau89iI8dff3wJXKdmC8DEs6NLOLVfYCsC9psgy3Wq3rlc1FUdwCTnPOT1NKe5I+zWPgYDgcVjabmVnO+ZGk8xjjrpmZpCfzV+/1epsLsZmZu79w918ppZudTmcXeCZpAoxDCFtLcRnwrXzqBDgHToH9/8LZSPqQcx4BD4qiuBNj3FgZm9lvjufPl5m/3UUAAAAASUVORK5CYII=",
	}, 
	{
		id: "view-menu",
		label: "檢視",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIhSURBVDhPrZPNqxJRGMbvf3D3QbiJVoGY2Acig8kVVHS0EO5dlFAhDBIj1CY3p1WLgqBbCkU3CQI3grVoM0guZrBFkdsiTdCL5ec4kszARZ/OGceL94Nq0YGHGc77Pr/zzvueWVv7nyuZTNqoRCpiyf7PfGpIUKlUOKQKA/8RRBP4FRMzLCtg7wzIwPyxEBpYtxLyx51kxRmQQRJHIHSTGfcD8XicoyKWuKXB6k/tCIRumEnUYI/FYk2v1wuXywWHwwG3241wONykMfMAqxr2WQebSxP4UCiE02ecuHY3h8KHHzhx+xNOXt2B7eJlExiNRis0j30uU4k9zeropi0YDKr0JNx724L0dQ9sbb1o4tKOgVMPxnDckUxIIBCorUDIEkD8fj/6/T6ey2PsjmeofPwCQgiuiA+x8WqGs4+G+PztJ1iVKxC7ORnWLEmSYBgGcrIK/vUMmykCjuPgdDpx480M57Y1KN91tFqtwxCOAdYzmUxtOByi0dPhfjrBzcfvTbOf30SiNMf57Qm66hSj0Qj1eh0+n4/1pLQ/0iVkMBjgvjTGVmEPQmEXt97Nwb2c43pBhaZpYPFOp4NyuQyPxwPqEw/cC0EQiKIoyCm/sPFsggtPJhCKE/Q1wzy92+2i3W6j0WgglUohEoksGrm62FSy2WxelmVV13VMp4vSe72eWX6xWEQ6nc6zC/fXH01VVY6axWq1SodCROuWLuZvrd9KMIgX5g5/JAAAAABJRU5ErkJggg==",
	}, 
	{
		id: "history-menu",
		label: "歷史",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACuklEQVQ4jX1Q30tacRz9xoKil41Wi7KlllmWmTk1TbNbec3rz656NRXzqiRFpbCglyAK1pNRm+DDoP0JPQjFRhSx1/bgf9Dj/oAscmN19rAZt1U7b5/DOedzPh9CnoJEUt8i7pG2iHukRCKpf1L3L9q6+k3SvqHPCrXxx4DOggGdBYoh409pn+ZLW5dy5H/eZx3dqt1BwzhGbdOYdIdAe2ZAe2Yw6Q5h1MZi0DCOjm7VLiHk2QN3p0Lz3jDuAO0Nw8XNnqysbcbOSiX1WamkXlnbjDm42Ak9HYZh3AFp79CH++fKVAb9GHNr98cQjKe3AbQBaFBqLd/6tZYzAA0ARMF4etvuj0E/xtxKZCrDXcCAzlK0+2Jwc/wJgMYqP0wxGKYYVGcAjW6OP7H7YhjQWYpVvtZMe65doSSS82/9wmZWzwysnhkIufh81u8KJWGmPdeEkFqiUg2329gonKEENra3m4Ri23QEjH8WMpmsrsrlcrlXzlACNjYK+aBRRCw272sHx8MZTMBqtT6/F+ANf3UE4ujTmD9WOYqafuEMJuDgeFCMr53k8/k6hz9+5Y2kodSaaGHA+fl3MRtOfNJapn519r8xE0KIUmuivZE0HP74VT6f/9PMycUPAvwi9BRzTAipETytBkDz+rscqxmZ2CCE1Ogp5jjAL8LJxQ/uNmVX12l2duGGCfDoVY9sCUP+BtVfXFy8VOpHt5gAD3Z24Sa7uk4LBXVBfr7AJZdBs1EodWOnYsUg2y6Xi9rlclGXQsOqjZOnU74YuOQygvx8AUCdcAkpl8vN0VSmwCWXbjyROVBODoYJFwwTLlBODp7IHLjk0k00lSmUy+Vm8hgANO3k99zhVOaQS2Qug6ksgqksuETmMpzKHO7k99wAmh41C88B0FqpVLr3i0em/eKRqVKpdANofVCbEPIbnNspbMzggyQAAAAASUVORK5CYII=",
	}, 
	{
		id: "bookmarksMenu",
		label: "書籤",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACUElEQVQ4jZWSS08TcRTF/xulMeELFBGQggRaSilFUFtBHuFRaHmUDo8OzKPOtAX+01JaLDMtQw2RloUfwbhgaVjiRvkQLoxKTExYdGHSEBM2hONKI6E0cpPf6t5zcnPuJaRMVTdY9u81tr4tN3Nt1ZpauzqeDKD9Ud9FVWOL9cYGZofzcMS3hJFpFha78+BG4rpGa6dz0AtGpGAEisf9nou7D8yt/7F3rcFoarbZuvs+euaCWIwksRhJYnxWgK2797CqrsVKiKnikqbGZInUN9sPmtq6vpodrvPOnmEMT7OYl9bArabAraYwL61haCoAx9MhmB2u86a2h1/ut7S/q24wy8TicJ08c/sw5ucxGZDBiBRsOAGebkJQVAiKCp6mwIYTYESKyYAMt59H76gPlg7nMUnrr0bH/EKRjSQgRjUEY+myiFENbDiB0Rnu51Y2N0gAVKjZXe8EGzoVFA1SXC+LQFVMsaFiNvfaDeA2IYQQAIZNPedjBOWXtL6NUPJlSaT1bcwI9HRrZ88L4HKYAAwMt7wfjKWx/GKnJEFFA7MUeQPAUPKKA97ZIzGWwaq6WxIxqqHf439/7RsMTsyfhJJZKJk90HT+r5Cm81Aye5ATWQx4545Lio1G+50xRrxQtDyomkMwlgG3svGJW0l+fr62BarlQLU8xv3COSH2W1cMrB0u28SCDCmuIyDHvykpfeXs7KymWCzW0Q09ysrr36W4Ds+CBIu9p+mKgZdZqh338x8iiXSyUCjUA6j8J+DKH4VCfTiubroZ7ojheeOf3m+YRFhprYu0ewAAAABJRU5ErkJggg==",
	}, 
	{
		id: "tools-menu",
		label: "工具",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBUlEQVQ4jZXS309SARQH8KObZFu9NM1ZUCQQwoUQiSngSrCBQiQCF+x2gcuPgEBvdsmRWY3H/oMe2np0azXXsulqbo5qDaKopx7osT+hev720kNbCXRezz7f7Zx9ibqcowq1akihM5BS2d+tISKiYyrGoWYsXwyWKejMdpwaNW11jeUjRuMZ67mfM/4IZoM8XL5g/VW1qvm97ukYwJjtTz1BHmGhCH9EqNdqNQ2A3sFB5pBCbdwmufxg24BJp/dbNCUilCigeKM8D6BnYEB7WGeafGOamMYIY7W2DXD52BafvwlWKMLm8j1RaS1OZtzx7sKlRTh9LDwXF0xtuKVvNsg3E8UyYoVVeFkB5+dC8LIComkR7nnuKwDZftfLGItj07+YRlpcR3rlDmKFVXBZCVxWgp+7+qO0Vgnsi3Vj9mfuwBXEC2UkxTVwuVIrmlxuhuLXWuF4/vGDh49cAP7VB0amNzuee4IxJJZuISneRiieb77c2zMAOAHgJIAhAH1/W7X6gP6sY3sunEDq+joyK3cREYofd3df6wH0tv22Uqns149P7XhZARnpHrKlCiKp5Q/ValXXERMRjY7ZNtwBbovLSd+zpQqiGfH920ZD2xUmIpqY9jYADPM5aYMVlur1+ufTXWMiIl+Iv2+b8b9wL1zerNU+aQB07vmfA+AIgOMAhv8X/wL9cuJtpIsiPgAAAABJRU5ErkJggg==",
	}, 
	{
		id: "helpMenu",
		label: "說明",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfklEQVQ4jYWTz0pbURCHB2nRIBYJgUAyd+abWGmbis/QdX2Bbk2FQDHo1pW46cqFT1CzEkqhdtXFzeK+mptzwvHmtg7cxZk/3z3zmzkiLVPVMTAHlhFRR0QNLIG5qo7b+aVtAacRsQKari/FTkVkq6v4JidFxMLMpqraU9WemU0jYlHAb55B3H2Win+p6lsRkX6//8bdT4BPIrItIlJV1QHwE2jcfSbJOUp/XanqYZH4WFx/CeyLiESEJ21WqjqWJFgDXOYbRcQt8Hc0GlmC/Xb3b0V8kWrmAtwDTVVVRznBzCaqepzPwBXwvYhPE+CHpDE1g8Fgr2My28B74A/wpfC/TprV/wUAF8Cju5+Vqqtqbw3ILZjZxzbA3T8Ddx3+D6mF+1LEi44WXg2Hw90OwPlaRFUdpzHWZjZptfAAPJS+jTEm4te8SCUEuAau89nMJsUinZXgcpXriFikPneAnYh45+7nWfCNVc4Qd5+99JjSCm8Ur631nFcJ+M/n/ASYa4gEyp5tIAAAAABJRU5ErkJggg==",
	}, 
	{
		label: "附加元件",
		oncommand: "BrowserOpenAddonsMgr();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcUlEQVQ4jZXSPUwTYRzH8ceQODi6YKIRRKhiC1gsL0ITXgXr0dK3u/Zsr9felfbesG9Hr9BSrS2EmBjC4OLqyuRioiEkLMbRuBlHiCvEQdToz4GAA7UJ/+SbPHnyPJ/leQhpMFdNlsUOS/83U1ffYYvJ8qLR2brTMzC6O+liMe0Jw3p3HISYz58JmHYFX3o5GUxMw5STeQPg3JkAZyCS9HIS6KgGyheqEUIaA603el53Wodgttlxe3AMYxSNgPgI7Fwaky4W1qEJmG123OodxrWb1o+ngP4Rx64zKMLDSfDxCoLxFHjNAK8ZYOcy8PEKPJyE2VACg+MzOL7XdLyYdAX3opoBMV1qmJAqYsr98AgwdQ/86ejqe2ex2QUqEPsdz5Qwly2fSkgVEZZyP9lE5pBTFnBvlj0CKCYGh5+Hw88jlMgiqVfqFkrmoJeq4tvtbZuTiW098IY3CSGEcEoevFpASNYRTy9DNmp180VV5HLFFgBNAC4DaCaEEDITEL6ygrr5ZO15hFONX2phBdriKtTCChSjCsWoQi2sgInN487wBH/d3Ntusdk/dVqHdgghhABoA9AM4IKfl/fUxVVoS6sQ0yVEJP1LRF74LKRKiM4XcN/LYcThA0XHYJ9yn7zCv48TFPa04hoSegVStlQD0AqgRcou1eLZMhJ6BfHsY8iFGpxsvD6QKj2DmF6Gk+Ezx/suhs/HM2XkKusneTj5/0By4SlGKeZ7e/fAFVNXX9sYRf+Q8lXo1Q3o1Q3kKutwh6XTgDskvgrJ+f2IYuw7fJH3NC1epOnopWk/9yGiGPtCunwgpMsH/PzSgTMobBFCyF+tx2eysq1wDgAAAABJRU5ErkJggg=="
	}, 
	{
		id: "febe_tools_menu",
	}, 
	{
		id: "webDeveloperMenu",
		label: "網頁開發者",
	}, 
	{
		label: "錯誤控制台",
		oncommand: "toJavaScriptConsole();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC"
	}, 
		/*
 	{
		label: 'UC腳本樣式配置數據',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApklEQVR42mNggAInJydPIH4GxP+JxCC1ngxIBpCiGW4ISOMRNEFrBgIAqCYEpp4BTEAE/8PYBDSLALEPsgEoLoAqeojH2S+B2BfDQkIuAMqxOkGAL4oB2FyARTMjEFsiafbFGwY4vPAKlwF4XQAUU0DT6Et0GCCFOG4DiIiFV4QMwBYG6CFOvAtwhDjxYQDEcURoLsNmADmZ6TmyAV4gARI0PwHpAQDbYi/L6+zZOgAAAABJRU5ErkJggg==",
		child: [
			{
				label: "addMenuPlus重載/編輯",
				tooltiptext: "左鍵重載 ；右鍵編輯",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABO0lEQVRIib2WYbGDMBCEKwEJSNj5zkClIAEJOKgEJCChEpCAhEro+5N04Eho0r5yM/yBy+3tsrnkcqkMYJF0rV1XHWb2NLMnMEpq/q2wpAbozGwyszkCBbAH0H0NAgzAY10889wltZ+waH33BUCqBilkEaXrnQq3InYpJsAC9IFpfD95MwBj+DYfggBDAmTjrpy9g1nW64acZI2XDBhTeZkmRy9rMjdYeCNXzT4JjS6uRrdLTFDv9+WOA+id9FMKaGOCT/aFM0vaFN4EtSDFdc4EOk26c8xwmr1LN2zMPRg/xxs2JPsRtKMu6boeQ6HB0a3Lj6AY0RSejaRm/R+BDugzk/54qIaCLXBzTHMFk0dHtWMlyczuJQCRyTcn7VugcAAO1QA+wv/w0s1mNgHdL25DL3f9/G7n7V0af9jEflS+F9XNAAAAAElFTkSuQmCC",
				oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
				onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); };",
			}, 
			{
				label: "編輯uSuper_preloader.db.js",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII=",
				exec: 'c:\\windows\\notepad.exe',
				text: Services.dirsvc.get('UChrm', Ci.nsILocalFile).path+'\\Local\\uSuper_preloader.db.js' ,
			}, 
			{}, // 分隔条
			{
				label: "編輯userChrome.css",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII=",
				exec: 'c:\\windows\\notepad.exe',
				text: Services.dirsvc.get('UChrm', Ci.nsILocalFile).path+'\\userChrome.css' ,
			}, 
			{
				label: "編輯userContent.css",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII=",
				exec: 'c:\\windows\\notepad.exe',
				text: Services.dirsvc.get('UChrm', Ci.nsILocalFile).path+'\\userContent.css' ,
			}, 
			{
				label: "編輯userChrome.js",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII=",
				exec: 'c:\\windows\\notepad.exe',
				text: Services.dirsvc.get('UChrm', Ci.nsILocalFile).path+'\\userChrome.js' ,
			}, 
			{
				label: "編輯userContent.js",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII=",
				exec: 'c:\\windows\\notepad.exe',
				text: Services.dirsvc.get('UChrm', Ci.nsILocalFile).path+'\\編輯userContent.js' ,
			}, 
		]
	}, 
	{
		label: 'About頁面設置選單',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApklEQVR42mNggAInJydPIH4GxP+JxCC1ngxIBpCiGW4ISOMRNEFrBgIAqCYEpp4BTEAE/8PYBDSLALEPsgEoLoAqeojH2S+B2BfDQkIuAMqxOkGAL4oB2FyARTMjEFsiafbFGwY4vPAKlwF4XQAUU0DT6Et0GCCFOG4DiIiFV4QMwBYG6CFOvAtwhDjxYQDEcURoLsNmADmZ6TmyAV4gARI0PwHpAQDbYi/L6+zZOgAAAABJRU5ErkJggg==",
		child: [
         {label: 'about:config 參數配置',
                 oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:config')",
                 image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACYUlEQVQ4jY2RQUjbYBiGfzcRJ3WwwdjoRAaZ0IHtio6VDeogjNraWLaYpEnbJaUwPOwgQ9lBPJTt4EHx0EOPhSGFEvBQehAcksNKwyaCawljRPa3ja3+scpQHLrLv4sDD3btA9/xfb4XXgDOMU3TYhjGfcMwHIZhOCCE9wAAIB6PXwGtkGX56tzc3PO+vr51u91+aLfba4ODg3IqlXpmmqalpQBC2L20tPRyenpaGR0drfp8PpMkyZOBgYHtdDr9WFGUzv9+BwAAjPFNVVUfrK6uvo3FYiWO4xBJkoeBQOCjruvXmwrOzs5sCwsLr2VZtmia1oUQuh0Oh3Mcxx3RNI1CoVCxXq/3NBWUy+Uhq9W6Q1FUan5+3sMwzPuRkZGqKIq7LMvuT05OqhDC7qYChBDB8/z68PDwH5vN9sPlcu2zLHsgiqIhCII5Njb2NZPJEIVC4dqlAkVROlVVDQYCgW2/339E0/R+MBjcEwRhTxTFmsfjOXA6nZ8ymcxDWZa7LpUcHx/fKpVKr2ZnZ7NTU1PfZ2ZmNqPRaJFhGCQIQu18kc/Ly8tPmy6iaZoFIeRACD2p1+uPisXii2g0+oVhmEYkEql4vd7fBEFsJhIJD8a4+az/yOVyPVtbW0Ge57/xPN+IRCJliqJO+vv7tcXFRRpj3HtZruPCgXw+37uxsRFjWVYLhUKNcDgMJyYmflmt1p+6rg+1bAEAANlstndtbe3N+Pi4LknSriRJVbfb3YAQutrJdwAAAMb4xsrKyjufz1f1+/07yWTyA8b4TlsNLkjuVioVqVarxU5PT4l2wy35C451GzeIKv5qAAAAAElFTkSuQmCC"},
        {label: 'about:',
                oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:')"},
                {label: 'about:about 「about:」頁面列表',
                oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:about')"},
        {label: 'about:addons 附加元件管理員', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:addons')",
                image: "chrome://mozapps/skin/extensions/extensionGeneric-16.png"},
        {label: 'about:addons-memory', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:addons-memory')"},
        {label: 'about:buildconfig', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:buildconfig')"},
        {label: 'about:cache 快取', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:cache')"},
        {label: 'about:cache?device=disk', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:cache?device=disk')"},
        {label: 'about:cache?device=memory', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:cache?device=memory')"},
        {label: 'about:cache?device=offline', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:cache?device=offline')"},
        {label: 'about:compartments', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:compartments')"},
        {label: 'about:crashes', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:crashes')"},
        {label: 'about:credits', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:credits')"},
        {label: 'about:downloads 下載', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:downloads')", image: "chrome://browser/skin/places/downloads.png"},
        {label: 'about:firefox', oncommand: "openAboutDialog();"},
        {label: 'about:home 開始頁', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:home')"},
        {label: 'about:license', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:license')"},
        {label: 'about:logo', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:logo')"},
        {label: 'about:memory 記憶體占用詳細內容', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:memory')"},
        {label: 'about:mozilla', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:mozilla')"},
        {label: 'about:newtab 新分頁', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:newtab')"},
        {label: 'about:permissions 權限管理員', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:permissions')"},           
        {label: 'about:plugins 關於外掛程式', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:plugins')", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB50lEQVQ4jaWTwUobcRDGf7O73diktStGMVBdJIdYhL5GKZTWQ5/BoxfvHjz14qHHPkdfom9QPfQQVGrQgtomwd2Z//SQ3WAM0kMH/vDN8J9vvvlgxN35n0geFo6Ofn4eDv19qyVf9/c7e4/V6pBaweHhYMdMP11envZarSbD4YhXvZcAfD85o66trKwXcRzvHRysfZlR0GikOyGE3ubmBkUhtNuB8V0MQJ6voxqxuuqoSirSeAs8JGh0z8+v6Pd/kGXPub39Q7u9BsDV1QWLi8+4vv5NnnfJ8+VO3RfVYGHhaTfLMsyEfn/AeGxk2RJZtsR4bPT7A8yELMtoNtPunIlRJJ08XyHP38w5vbW1MZOPRizPERwff0MkwixgFlANqBqqVuVGUShFUVKWyu7ux1mCJEkBcA+4B6JIEQEIhABmEAK4CyDMKTAz3KWaaJSlUZZKWSqqdV5O8YyJndcftqNooZJvqIaq4T7W6UrwhKXeu+2pgtGv06Y7qOq0sSzLGVxPNlNEEu5uzppTArUonnwMlWy79/SemRNDRQxI4ilBMJKJ1PLRnc0Us0AIAQgQJr2VibG4p7g3gAR3xV2BCHcDDEgQMUQCUdTEPRaojilOX6yli72eu8XAv+5bRGIrbk9OrLi5+AvbLV+clWSB1wAAAABJRU5ErkJggg=="},
        {label: 'about:preferences 分頁式選項', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:preferences')"},
        {label: 'about:privatebrowsing 隱私模式', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:privatebrowsing')"},
        {label: 'about:robots 機器人', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:robots')"},
        {label: 'about:sessionrestore 回復瀏覽狀態', oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:sessionrestore')"},
        {label: 'about:support 疑難排除資訊', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:support')"},
        {label: 'about:telemetry', oncommand: "gBrowser.selectedTab = gBrowser.addTab ('about:telemetry')"}


		]
	}, 
	{
		label: "重新啟動瀏覽器",
		oncommand: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII="
	}, 
	{
		label: "關於",
		oncommand: "openAboutDialog();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACK0lEQVQ4jc2RQUsbQRTHh7DZ7JiZ7CQZw+w6klmjm1yCmE1KaSLIghcPUgs5hPSQD+AHkCLFHnroqYcGeqilVE9NkSAhBw+yJ/FQSiiylPdpphdj1dj22gd/mOH9/z/evEHofytx727eOlv/CpuEkNMoioxkMlnDGH/d2Nh4PG32ej2Ry+VeIYQyD6bz+fxzzjk4jrOfzWavarXaO621cduzubnZI4ScIoTmZgCu637xPA+KxSJ4ngdKqTOM8dtUKuVPPVEUMdd1J9ls9sWd8MHBgek4Tuz7PpTLZfB9H5RSP9fX1z8NBoMcQgi1220ipXxWqVROOOc/giD4PUWz2XQdxwHP88DzPFhZWblaW1s70VrfeW+1Wt1bXFy8FELAwsLCzX7Q6uqqXygUQEoJUkoolUoXh4eHjxBCmUQisWsYRogQQkqpnhAChBCwtLS0dQPodrsyn8/DtMk5h3Q6PUmlUhMp5Xmn03mKEEKMsY/z8/PAOYdGo/HkBhDHsSmEuOScw1TFYvFie3v7zWg0qriuO2ea5h6lFDjnIIT4PhwO2Z1FBkGwb9s2MMaAMQaUUrBt+zyZTB4bhvHNsizIZDJg2za0Wq29mW8cj8dCKXVGKQVKKRBCAGMMlmUBxhgIIUApheXl5WEcx7kZwDXEr9frx+l0GjDGMwqC4HMURerB8LS01uzo6Chst9svwzB8H4bhh52dndf9fn9La83+Gr4HSmitrWsZf/L9AnXzp979k0QwAAAAAElFTkSuQmCC"
	},
	*/
	{
		id: "aboutName",
	}, 
	{
		label: "結束",
		oncommand: "Application.quit();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACtElEQVQ4jY2ST0gUYRjGn9m1Yb/d+WZ3/u/MzsqMMy4uC0ogDawEkuDBhCCQlAg9SBety4aXooiQPRh0bUnKQ38gKOlkFpGEWmQEJRsVKaXW6qpdlDp0mC4aW2L1Xj543uf3vu/3fh/w92gEcB5A9T98O6O5uTnEcdxkJBLxo9Fo4X85DcBZAPt6enpCyWTyhWmaK5Zl3drKtwMYAEB2kISQBCFkihDygxAymcvlZNd1p13XLafT6eGuri6ZEPKJEPKdEHLHMIxwJR+klN6RZbkcj8eXPc8rjI6OxhzHeeo4Trm2tvZaoVAINzQ03Nc07bMoil8ppRd/0ZIkHRZFcS2RSCy2tLTc3djYUFpbWyO2bT+3LKvsuu51AJidnU17nvfEMIwFQRCWFEXZu13ghqZp5bq6uuLY2Fj91hJjyWRyxjTNck1Nzc3tZoODgwcty/qoquqaJEkX0NTURGVZnlFVdbWxsfHqtnFgYIDquv5SEIRv1dXVt7d13/f3ZDKZcUVRVlVVvQfP80xZlouyLK+n0+nTlYvp7u4+lc1mp/r7+49U6qlUaliSpHVN0ybQ29urKYryShCEdcMw8pXGYrHIbm5uxn3fD/z21pp2SxCEdV3XH8D3/SrTNMcppSuxWOxxR0dHcLdPAgCZTCYei8WKlNKy4zhXAADZbPYMx3Gr4XB4mef5k38rwHHcpUgksszz/Ep7e/tRAMDIyIiTSCResyy7yLLsQiAQOAGA/YONVlVVDYZCoS8sy352XffR3Nxc9Fe2r6/vWDQaXQoEAgvBYLDEMMxDAOcA9APIA5gOBoPLDMMsqqr6Pp/PH9gxXi6XO67r+hsAJQAlhmFWAaxtnSWGYUq2bc8MDQ0d2vWOExMT+9va2i7btv2M5/l3lNIPoii+TaVSk52dnUPz8/P1lf6fdmi4VMHjbpAAAAAASUVORK5CYII="
	},
	{
		label: "AnotherButton重載/編輯",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABO0lEQVRIib2WYbGDMBCEKwEJSNj5zkClIAEJOKgEJCChEpCAhEro+5N04Eho0r5yM/yBy+3tsrnkcqkMYJF0rV1XHWb2NLMnMEpq/q2wpAbozGwyszkCBbAH0H0NAgzAY10889wltZ+waH33BUCqBilkEaXrnQq3InYpJsAC9IFpfD95MwBj+DYfggBDAmTjrpy9g1nW64acZI2XDBhTeZkmRy9rMjdYeCNXzT4JjS6uRrdLTFDv9+WOA+id9FMKaGOCT/aFM0vaFN4EtSDFdc4EOk26c8xwmr1LN2zMPRg/xxs2JPsRtKMu6boeQ6HB0a3Lj6AY0RSejaRm/R+BDugzk/54qIaCLXBzTHMFk0dHtWMlyczuJQCRyTcn7VugcAAO1QA+wv/w0s1mNgHdL25DL3f9/G7n7V0af9jEflS+F9XNAAAAAElFTkSuQmCC",
		tooltiptext: "左鍵重載 ；右鍵編輯",
		oncommand: "setTimeout(function(){ anobtn.reload(true); }, 10);",
		onclick: "if (event.button == 2) { event.preventDefault(); closeMenus(event.currentTarget);anobtn.edit(anobtn.file); };",
	}, 
]

