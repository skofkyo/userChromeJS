/**********************************************************************************
 *此处为按钮设置
 *************************************************************************************/
var anobtnset = {
	//※必须设置	按钮位置，0为可移动，1为地址栏图标，2为以前的自定义定位方式
	Icon_Pos: 2,

	//自定义定位方式：	按钮与哪个id相邻，alltabs-button，back-button等
	intags: "tabbrowser-tabs",

	//自定义定位方式：	按钮与目标id关系，之前（before）或者之后(after)
	orientation: "before",

	//按钮图标
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAFHRSTlMkAB/GwtscIyYWEQ3hn6RA2rzIOxcLApYAAABWSURBVBjTrc9LEoAgDAPQWD4VKAJ6/7s6WqEX8C0zySLYCsNwRqmnN26AXWMrNAE8NkPhDRKppAGX6tSRv0aEimsS1b+TXdGcGArPl0jLJchDepi6hBv9gwQXiMj9aQAAAABJRU5ErkJggg==",

	//菜单弹出方向，不设置就默认,参考 https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/Positioning
	position: "",
};

/**********************************************************************************
 *child:[  ]内为当前菜单的下一级菜单配置,支持多级
 *text 为运行参数，如果无需参数，直接删除text属性
 *这里是菜单配置:
 *配置与addmenu一样，但仅支持本脚本菜单位置，具体请参照；https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus
 *-------------------------------
 *{}, 为分隔条
 *-------------------------------
 *目录枚举添加请注意：
 *1、斜杠"/"或"\"开头为相对配置文件夹，注意：Linux路径区分大小写！！！！
 *2、根据文件名全名字符(包括扩展名)排除或筛选;
 *3、关系为：先排除再枚举。
 *4、注意：配对模式为 test循环模式正则！！！注意正则全局"g"的使用！！test()继承正则表达式的lastIndex属性，表达式在匹配全局标志g的时候须注意。
 *5、留空表示不进行该行为。
 *6、在文件夹上左键点击为打开文件夹
 *************************************************************************************/
var anomenu = [ //下面添加菜单
	   {
	label: '常用软件',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
	child: [{
		label: '科学上网',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
		label:"香港服务器Shadowsocks",
		tooltiptext: "不行就切换美国服务器，密码更新周期为6个小时",
		onclick: function(){
			FileUtils.getFile('UChrm',['Software', 'Readsshkid.bat']).launch();
		},
		insertBefore: 'addMenu-rebuild',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABc0lEQVR4XsVTvU7CUBT+WitQqCGGmVdgYNTNNxETXZiYSHgJJYGnIAw4sugTsLAwoUETGYxRCMb29h7P6b1QCG4ONPl67r3nft/5ax0iwn8el3FYAecdII300andg2LAWm2je7IJWi3L0iBBHAMqZqsAXlMUGSi1Y2eDATxTA0G/vAoxAdgpNjg7BxXy+Or1oEMRCUEhg/1uuZwwPROZUjLDdV2QyF7VQKMRcqUSvudviMNUwGEoKUMDhqwUIA4i+FySX6+Dpk+gnI+jdhuF2zt42SxoS0SvMyBl6gSL6IjXkwno4gI0uAf5Pkjz2XAIvVpBMxmmD0bAZKCEbGqMFD67XZzIebVqmpr3sej3ES0WaQ+2ShBF61BJhEyxCKpUzNnjQ5LFcRCY/Tq6YCNgx6LthZ/5HFGzieXNNT46HehGA8vZzPpDaDsl4TpTgE4vayC1nnW8Wevd2ZseMZEsJuMxnGeAwr0vbn+t/vhCM4zD/42/2hFVn5BfIpIAAAAASUVORK5CYII="
	},{
		label:"美国服务器Shadowsocks",
		tooltiptext: "不行就用日本服务器",
		onclick: function(){
			FileUtils.getFile('UChrm',['Software', 'Readssusid.bat']).launch();
		},
		insertBefore: 'addMenu-rebuild',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVR4XsWTv2sUQRTHP5PsoVERE1CTIh42/gFWikpMEY2kFSQBRRS0MCKIuIUQxZwWKSUgqBiFqEWaFN5VQcORzh+NBI5AUI4UHoqed5e9vd3Z98ThCAspLfLgw/vOMG++84YZo6r8T3QAW7uBuXx1SUmHCIgFIkBdfpJdQIN1fv747maljQU8gKePjzJbVEYHhNfvOxg7obwsGs4ft8wseiSDw6jCHhXad4aqUCjM4U4wMHqEN0UhERyRVRJ1mtAqn7gDv6pQ+wONOgQBZuwMpY9LeBCjAvO+cuqBoeDHDOU88rcDTua6WDYQTNxFRDbo7r5BszlO4/AxPKQTgNOTBhF1xTYGV0wLu/6BHRemnSuNBhqGSBTRdWkKu/wZDwlcz88WlLd+yNDkdvJ+jd6HEd9uCv3jLWozzzfcVdXl6v59/C7M4YHyYtFgLQzmtiFW6c0FJK0S/VcSKAu7R0acM63WP5zee+0cpdUSplxe1b6+A8RxnHZI603jZrPJwQxMz89ikvvX1QyfRfPv0EoFqlXXqyMM0SCAKELTOo7pvHWRV2tfMSsrXzSbPUQ9k2FXFKIKqs5tE9bGhGEPsEaSCD2P7uHtnPKpKAhQAyxA6qWFQB0I2sRAmFq39b/xLxJtS2mONlo4AAAAAElFTkSuQmCC"
	},{
		label:"日本服务器Shadowsocks",
		tooltiptext: "不行就用XX-Net或者Lantern，记得切换AutoProxy相应端口",
		onclick: function(){
			FileUtils.getFile('UChrm',['Software', 'Readssjpid.bat']).launch();
		},
		insertBefore: 'addMenu-rebuild',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4XsWTMW7CQBRE31pUbhENBUfhChQgKgouQpH0SNRJmXSIig4pqeEYiMYNlpBwYbzyJMp6tUYbpUnBl0bz/eWZ/bOyjST+UwnwWANTFEWUoa5rz+0+gv1GByBNUwOgcCG4TviRpAhZlrkIsVjw+YGentFiQb3d+lOjrZJfxZsNWq3QYY/2B7RcoteXaANvwJ34fEbrNaoqdLsFvL2j0+nOwFpL4tfxQ2UZulyCsGr4ekXHY3jPRXAGYSjU66EkCcKydCyhft+xBO0IYQjqdtFohMrGwEcZj9FggL8uz512BM+az1Gaot3OiYdDNJuFg5qy1v4YRK4YA9MpZjIByT1LDhhAAGGDPM9bX5eltq7/C74e/zd+AXscbYfJObujAAAAAElFTkSuQmCC"
	},{
		label: "获取Shadowsocks账号",
		tooltiptext: "感谢批处理之家ezibo",
		onclick: function(){
			FileUtils.getFile('UChrm',['Software', 'sunbox-Update-Shadowsocks.exe']).launch();
		},
		image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAa0lEQVR42mNgwAGcnJyOAPF/KD7MQCpA0gzGowYQaQAotNE1YsGHKTXgCCFXNODR3ECsVxqI1gx19mEChjTgSKmHGfCFMtSQBnyxxEBuPGMYAMQ2JGi2RjbgGRFRhws/BxngBWKQofkJSC8A7kTAGZ4aXdgAAAAASUVORK5CYII='
    },{},
		{
			label: "XX-Net",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\Software\\XX-Net\\start.vbs",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA6lBMVEUAAAA1cqYVLUD91EUaNkz93kP73UNWRxUKCgj95Ev90EEmY5zNpzErXohVWjwbOlRrXR0PIjH910knZaHlxTi9njInUXYcPFeBaB58Zh9fUB4ULUENHCkcGxIMDQswbKH6zj335Un22T41cqX0yT40bZ0jX5vrwToyapg0cKQqYpbfvzjcszIvaJYsY5C6kyoHOHCqhSWmoCgkT3I3R0dkYTZVVTdLVT0wPkBcWTFPSR9DNg83dqv/1kQ2bp02caP+zT07gLo8frY6fLM3daf/4kb/2z7/00H/7U7/30I8hMAlZqX/8k//2kzyvmU/AAAAPHRSTlMA/mX+c/78VhD+/vjOy4h9a0f++ua+uoOCe2ZbPikX/vv49/b18e7s5+Pi4N3Vzrurq6emiIaBf3p4YEMW0u7PAAAAyklEQVQY0z3IRbICQRRE0VfSrrjz3d2F0jZ8/9uhgqC5o8wD+9wRTWgDjk2en7TO8mhaA43cCyZljmto3EW3V1IwfLgjnPSSbiEQTVMX4GOlc8YKKcTJ5/kmhLFmBULSfIF+26QEqgvEWKsVBMHrv+1b0MsQu8c/cRx/pw9EWUAN4Pcz27arkisD4xxd/y22Tc7nvlKqAuhm6y+vSbgRXlVvAIDx0CNWZ9AfDJ0Z7HM8Qi5vwrYDcIAF9+en05d+DW6nLJfLx3Bi9g5UHhv7T8gXQwAAAABJRU5ErkJggg=="
		},
		{
		label:"XX-Net科学上网工具使用说明",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('https://github.com/XX-net/XX-Net/wiki/%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3')",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADC0lEQVRYhb2Wv2tUQRDHv9Fwefdul535zp7GRrGz9RcoiEIK/wdBjBhFOwsVxMI/wMbSQrSyiWKwE0t/NHbRIoURJdqI2iRBBZVocxeez93L5XI68Jo3M/v5zuzOvgf0b9F7P2Uid8zsZTRb3tpu/9rabv+KZstm9tJE7njvpwDEdazb28qy3E1y2sgfXeBaj5E/SE6XZbl7YLCqBpI3jVzpF5wQskLypqqGdVcdyTeDgutPJN/03Q3n3ISRi8OCV7qx6Jyb6AkPIez9F/CqiBDC3hxcjXxbS5gz8v4gooxc7OTO1d6/DSHoXwKMvF1fRFWPd9xj3vupaPahOnYUeUyRx9WxjGYfOqM4BgCqejwh7nb90O1LVVGW5Z5qnKqGRqOxC8CmRBM3NRqNXfUTX5blnsza+6rVz2SC9vc8NH1YWZb7M1s0040ZN/JnKkhEJjcqQEQmMwJ+AhiHOnc2FdAm3wPgRgUAIMl3KYY6dxYkp1NO7/2pIcABAN77UykGyWnUx6TbnnVfnz1MVUNqm42cQzT7+pfDbGFY8K6Z2UKdE82+ItWaaDY/bAHR7HWKlRRg5NKwBRi5lBSQdQBbhsjfki00isxm7oATw6KLyInkVovMguStjPMFgNEh8EejyIvMGN6CtlrHUs5OwPWN0klez62vrdYxAPDR7EsuyMh7AMYHYG8z8l5u3Wj2BYAHAKjqjVVVqtecc0co8qQi4nubvMsQznS+YpsTwFHfbB5U584ZOWPk9xy8w7mxmqmq26PZtw5shSIXAIwZ+TzRkRkAIwkBIybyoBe0Uv03Vd3+R7aIXK0GNZvNA0VR7Kx/SFT1UK7nzrnD/QgQkaup/FGSzyqVPupq895PqeqVVqt1NNP+rrXXgpN8hh7TNV69MkXkfA9YymSN1r/GWge6KIod0Wx+NSnGpxrCJe/9SVW9DKAYREA0my+KYke/lZDkw8wVLesVQPIhBvi5GWEIp6PZx0EFRPITQziD9NT0bY4iF8zslZGf0fndztiYkZ/N7BVDuAjAbQT8X+w36KQvZccCoxkAAAAASUVORK5CYII=",
	  }, {},
	  {
			label: "Lantern",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\Software\\Lantern.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzN+8gE8AAAAFXRSTlMA8KHqbC0y+NJaPCYdG87Lvnl4YE7SNMOjAAAAXklEQVQY02VP2Q6AMAhjgDuc8+b/f9UgiTFpX4BytUR7SR/KTESb/eDEdTaOituxkGPUIOqgF1My0d5VLE1e3+xJNNgji2mMqonfWM1yENkzIGAFjsJbEAbSwRzYfwBsmwhPnE7G/wAAAABJRU5ErkJggg=="
		}, {}, {
			label: "Shadowsocks",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\Software\\Shadowsocks.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAABdpNIegMEnhcOOv+AuicV4s9kfgcEcf8AegMAfgcEjg8IkhMImhcMxi8Yqh8RGl8xKmc1Om84ggcEhgcEigsEcf8AvisUjgsIkg8Irh8QvicUkg8IvicUohcMrh8QwisVBk8o1jcc1jcdAk8oZfb/aQAvrAAAAJXRSTlMADOt4A3gG/Pjv5825oH1tKCMW69bAv76zqpeQi4VyZF9IQzgwxtA2EAAAAHNJREFUGNNdjkcShDAMBGXsNWHJmwOZ+f8XkaEoI/owpR5dhk4YqSr/CdUBOqlAedQoRLLrhb/BC/h4xT3nKFa9gUmHiHMmqq9wfKuEMzZuypjFKNTav2nDltTAof0KW7WPEJMv0sxQ3VtfPDVJ/oYkaj8WEeIJh0wQlbIAAAAASUVORK5CYII="
		}, {
			label: "ShadowsocksR",
			exec:"D:\\Program Files\\ShadowsocksR\\ShadowsocksR-dotnet4.0.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAABdpNIegMEnhcOOv+AuicV4s9kfgcEcf8AegMAfgcEjg8IkhMImhcMxi8Yqh8RGl8xKmc1Om84ggcEhgcEigsEcf8AvisUjgsIkg8Irh8QvicUkg8IvicUohcMrh8QwisVBk8o1jcc1jcdAk8oZfb/aQAvrAAAAJXRSTlMADOt4A3gG/Pjv5825oH1tKCMW69bAv76zqpeQi4VyZF9IQzgwxtA2EAAAAHNJREFUGNNdjkcShDAMBGXsNWHJmwOZ+f8XkaEoI/owpR5dhk4YqSr/CdUBOqlAedQoRLLrhb/BC/h4xT3nKFa9gUmHiHMmqq9wfKuEMzZuypjFKNTav2nDltTAof0KW7WPEJMv0sxQ3VtfPDVJ/oYkaj8WEeIJh0wQlbIAAAAASUVORK5CYII="
		},]
	}, {
		label: '影音娱乐',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "Foobar2000",
			exec:"D:\\Program Files\\Foobar2000\\foobar2000.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAh1BMVEUAAAA5NzY4NjU5NzY6ODc5NzZ2dHRxcG85NzY4NjU5NzYzMTA5NzY4NjU3NTQ5NzY4NjU/PTw7OTg3NTQwLi1tbGs5NzY5NzY8OjlYVlVUU1I5NzY5NzY4NjU4NjU+PDvk5OS4uLje3t6Ih4dpZ2dfXV1cW1pTUVDa2tqsrKuYl5eOjY16eXi7nX0WAAAAHnRSTlMACPFWSw3+/b6CPxn669ayj3ltZBT79unIxrxeNSDdy1iXAAAAhklEQVQY00WNBw6DMAxFA1mEAC3QPeyE2XX/81VEAT/Jsv2kr88CSRKGuAvGOKdfZrtkmU3kado2p/KxiT1AUQCY9X9WEKhsFFxpBEClRRS1d1/Aj3s3UbSq66bBvY5rsb38/Dh4nR1YRKQ4z1jmjHqx79Ewwl6n8RYCFDqHAGHqsAgp4/EHimwIg1VV1u4AAAAASUVORK5CYII=",
		}, {},{
			label: "PotPlayer",
			exec:"D:\\Program Files\\PotPlayer\\PotPlayerMini.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmYDp0AAAAGHRSTlMASG/ux44qEwv28uLh1tGuoHpkTz8xGwaETBQgAAAATklEQVQY02XPRxKAUAwCUPzd3pX7n9QtDlm+mSQAlJgbdDpyPP+wkOujEEriEBSAIzLdCqgbmZsAcM2cOgW8e89qYCt21N5aMIvu5az+B/qABY0sWejhAAAAAElFTkSuQmCC",
		},]
	}, {
		label: '系统工具',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
    label: "adbyby",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\adbyby\\adbyby.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAABzjr+FlsBkib6NmsGAk8AAWLD///8OYbUPtQ/4+v0DWbHf6vbv+u+91exTj8xJick6fsM0esHx9vvo8Pjm7/fP4PHo9e3f9d+Ms919qti97L0UZbeYeELEAAAABnRSTlMA4p/1Q7xzHTCGAAAAcElEQVQY012MWRaEIAwEgzpNIjoz7uv9zymgIlhf6XqdJrw4BSdCRyQCHEQtkgoRYcfzsgl/o8bsGtHLIFLbxmhF5UUz3Rtda0UG/ErtKf9ARqScubMiizJoeq2r1ufL8LLuIZPbMQb4UKDIgbzw5wHlEwb3HcxS6wAAAABJRU5ErkJggg=="
    }, {},{
    label: "Dism++",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Dism++.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABM0lEQVQ4jbVSsU7DMBSM1LUoflYo6pCBqWsL/wE/gBDt91QI0ZxDFlTWfk4lquBz+QCousCAOtQMDaiFNAoDT7Is2b5757sXBFU18Q2BS1XKnoBepeyJoQkmvlGJC4IgUAnPlbF9AZcCfgjoi32pjO0rw7NKAp1wUIBKl0442AuWxGYCLorHa53YsRheCPgg4Lo4XwjcXSlBZPKOgO9Fp/tdZXZcELxFJu+UK9iSquAud7yBvdq+LzcQtltHgYLt/o8Hm05/SEHDxc1bHgroD7KnSMPFtecgHOXHAq4k4aOAvthX4Sg//prE0LhTAX2Y8OTXJEo2DwWcCviiwKGArwJOJZuHe/+3Y9h3XBxuEuB1ZUQ/K8pm7TIFUTZr1yKo9KBuabi4dfN8JKBvpq6l4eK62E/v8zD10SKdoQAAAABJRU5ErkJggg=="
    },{},{
			label:"IE浏览器",
			exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAARltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltuGA5VuAAAAJnRSTlMA0ZQJ/LeE6LJ2Oi30xG9C9u7ayquMf2dkXlpPKSAQBN2fe1BNFnhg+YwAAACTSURBVBjTdYxFEsMwFEMVx3YMYWiggeK//xH7PYFd30YjGOE/cdGJaTvMrE1UUuf6z94JSYFkxD34zVR0MBZgbiKi8jlkHMiwiPuW5BwKTnQILFELZk2JGlbHjxdyBUz4j04W+FAI4ELUKS8WAF4pZYHMap48cpcnrB6ofNzQiQUv3ojNbtMcjBN6mIqXqpX+Bv8DYOgPfPnW8/wAAAAASUVORK5CYII="
		}, {},{
			label:"记事本",
			exec:"C:\\windows\\System32\\notepad.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAAAQzm4RzW4A8nkRzW4RzW4QzW0RzW8RzW8Pzm0RzW4RzW4Szm8R0GgQzm4QzG0RzW4QzW8RzW4OzW0RzW4P028SzW4Szm4RzW4QyGkA220OBhRvAAAAG3RSTlMAF4gCoalLwzxCxrxTDy+RflpGNSUi25p/Rwd+O+hbAAAAYklEQVQY052PORKAIBAEd0U5RC4Rr/8/VApdypLMDibomgkGAGY9EHqBTG+AsD6HFJyRwO4WKTCeXLS8CDVOcj1c58OwUYMZxNMwxCrggSZVNI2fk7YRhXqJ77kdyv2eyPcvWFoD3lZ86iEAAAAASUVORK5CYII="
		}, {},{
			label:"写字板",
			exec:"C:\\Program Files\\Windows NT\\Accessories\\wordpad.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAADWIEvWIEvWIEvXIEvWIEvWIEvWIEvWIEvWIEvWH0vWIEvWH0rWIEvWIEvWIEvWIEvXIEvWIEvWIErWIEvWIEvWIEvWIUzWIEvWIEvWIUzXIUvXH0vXH0vWIEnVH0rVIk3WIEvWIEvWIEs53EvnAAAAI3RSTlMAyPlwMPbw5aDMulhMKtu1raiZjmASr5SAd2pmVEREPx4WDafP7X0AAAB1SURBVBjTbY9ZDoQgEAUZZBFFHfd9ffe/o6ISTLT+upJKXpM32c/yL80dwRGuh2CgN4gjrozwvQupU51sh7D4OShzCeRMERCX8FBBLKe4qDygJ6fgQnBgrE1gkwbo0oFp4hKZx1NQPETCWoHiMV1JM/393Ac78hwNTtTZzjwAAAAASUVORK5CYII="
		}, {}, {
			label:"计算器",
			exec:"C:\\Windows\\System32\\calc.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAu5wAu5wAup0AvJwAvJwAu5wAu5wAvJwAu5wAu50Au5wAu5sAu5wAu5wAu50Au5wAupwAu5wAu5wAu5wAvJsAu5yL9qGsAAAAFnRSTlMAoPxgiGfnrnjyb/n27d7XuZiEpJVX+KdN+AAAAGNJREFUGNNtz0kSgCAMBVETBAHnqe9/VC1KssHe5VU2v/vJK1/qCwjSl3bkg/qbKkRXylrBqjBcnMI+GGyvvddmgAIoBocjZvxhEFaWhTUYpMA8E5JBvMkeFw10YhyZFGnHtT3u0wfa+3lkFAAAAABJRU5ErkJggg=="
		}, {}, {
			label:"命令行",
			exec:"C:\\Windows\\System32\\cmd.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQCkAAAABnRSTlMAKNhIuHB+Z3vWAAAAOUlEQVQI12NIgwKGREEwEGNIYAADNmRGAIzhDGMwCcDUJEAZbDApRQYlBTDDgMHYAG4ONgbcUrgzAEKMDuT0b10fAAAAAElFTkSuQmCC"
		}, {},{
			label:"Everything",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Everything.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA21BMVEUAAAD///9wcHD5+fmVlZWCgoL9+vmMjIyFhYXHx8e9vb25ubm0tLSRkZGxZDyxViW2TxbfehXVbA7JXArEVgn27OfIw8HBwcG9trOurq7fsZmZmZmJiYnNhmGvZkC3Zz23WybwrBe+VhbggRTniRLijhDjng7MXgzy8vLl4+Le3t7c1NG7sq7Gs6rjuKOqo6CypZ6toJmwloi1koB8eXiugWqygGfMglvKgFrHdUXGb0LDaTfEaSnxpx3wlRyjSRjdiBbvoRXXcRTmkhPcfRHpqhDloQ/clg3FYgncu4dSAAAAAXRSTlMAQObYZgAAAKtJREFUGNNlyNUWgkAUQNG5woBIhwVIh93drf//RS4YXD543s5GCNXrFZ4XhCbmEKkCJNzkvsCYq7XJYIxLOfDVfeJf7l4VLALC5pYqiha5QBMYG5rEdVzV6BUw1dMZwFDTBwVMDFVimG30rokERsrxGgTxQ+qyBOQ4PB/8l9cHArunKi8dZ1GjwM6glYRyg6LaFACUc9BPjWyAQNbcomlRZFm7XAAq/UL/fQBnsg6NsM203gAAAABJRU5ErkJggg=="
    }, {},{
			label:"Notepad2",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Notepad2.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAACRhGHE5Ovu8fGVz9ys2uOnz9fL5Oql1uGt0tqOzNme09+VyNOz3OaLxNH+/v7U6vGFwc5/k5p7vMxzs8Lc7vO92eCbzNVGUlbC3OKq0dqGx9R4tcNxrrtpprXRxKdFT1Pf6ezZ5unI3uPb3uCEyNZ9xNSyqZAH0LMJAAAAAXRSTlMAQObYZgAAAJ1JREFUGNM9z4kOgyAQRVE7HQYE3CpWW5fa/f//sDxMHRISbk4mIcuy037S3MpxNYNaaaBBIRzKxhlVkK67jlPoWxaEWEwKMpdernl+vjyJEHRgZzaiFcJ9af6kdghVGF0icS8jHKfQeC8SCakkfGuxRRFRQRAyt3FLHwmRgdDhYy2btIYhHssmJAoHUU2W2TIu+4bY57X99rDPF+8fLUEJLW9qlukAAAAASUVORK5CYII="
    }, {},{
    label:"DnsJumper",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\DnsJumper.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAAAnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjaABOg9AAAAGnRSTlMAFvgH4fHde+e3HnXTJRCkmYFdT8GtZDWebMClLZ8AAACfSURBVBjTRY9ZbgMxDEOfbHkZz5aZbC3vf9DGboI8CJLAD4KkY2XKeSrGm5Kk7FI6GFyUwgQ/StojMKteNcOpR1UBS76e4QktlDWnxmYG2P+YbUzuC4STEFGtE8vW31CtC621j3DcX7u6J/bVuhAXRVpbb/y6XyDzzBF3P7p1jBYh9msjWB7BrnosKrzYlcJtNNCdwRwkr1IovLH5W/8P3PAHPWO4fUEAAAAASUVORK5CYII="
    },{},{
    label:"Hasher",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Hasher.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABCFBMVEUBAWeDg/5DerUqKn5NkN1LjOE6bMUhPZxDfNQyXbkpTasYLo4QHoEID3TKyv6jo/6Skv4BAV0BAUp7e/+xsf4rK4GcnP/9/f6Li/5hYfo5OfhpoOVFgdM4OL82ZL4ICLMuVKwdN5MVKIUNGXkIC2wID1ba2v9zc//j4/7S0v67u/7x8f1DQ/1LS/wxMfsGBvoICPHAwO0tSeo7bOksRONEduI9cOI9P91hktslJdksP9UODtVbhc9Ihc4VI8wQG8c+dMVUeMRhkMJNa7gQELNGXa09cao2ZaIRHKI+UaE3aJ8nSJ4xXJo4Q5ZNTZQqTo4LC4wxN4okQ4UwWIMeOHsYLHESIWcqKmZ6CBvwAAAAt0lEQVQY003K1bbCUAxF0eT2GtDTYsXd3d3dXf//T0h4AObLytgjsNMk4nW5vBK7gxYBgCY61UybDpMZJMrEgQXE3OE1oBGJxf8cNBpsquM9HMNC1BUr/WSFEJEobEOyLBtpiS/oCEdhGTQQi2rtc0M3mP4xVJUeN3iFcUBPMOVscdcXGPp0BGPJPDdwgs4vw7RS4fr20PD8E7TbStzBBtw/DO2JMtczB/c3qxZrz3ZXMPr6NDs/AIcZFKwjdlKfAAAAAElFTkSuQmCC"
    }, ]
	}, {
		label: '图形处理',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label:"FastStone",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\FSCapture\\FSCapture.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA51BMVEUAAADt7e3x8fHLAgCQkJDDw8Po5+eZmZnb2tqDg4P4+PiIiIgmjx8ViwoRhAjT0tL8WRQbnAnkLgnTEALg39/f793y4drgsKzZfHYlqQ8mrg70SA4qwArrOgraHQXl1tXT6dH42czIyMjG38TTtbPKraz0vqmozqfgqqXLpaPxtKCYoZqV0I7nmYzuoYuMwIqFoomJk4iGhobLg4CK13z5lmxssWjcbGPTWlf2glVdtFTdV0nKR0VFnkBY1DwylTnKOzncfThksDZupigukyiBrSbePCT7YB4gjBnNGBaufA/6Ug8nugkjoQlGAAAAAXRSTlMAQObYZgAAAL5JREFUGNNFj1WywzAMAC07hqR5gTI+pjIzM97/PJXdTrt/u6ORRuSO65IHUsqm65altKSl3Xc+uutMghqwcMdJbINl8hYggoHO8qdg/6sVTOjkL6vgnKtpB5vw92w2UxnmCtEqusCJURiGX6VC9DWWAiFw4gWBJDo7vukw9zxvQ+kuxhgbxOM2afQO3hRgzDTfqkU4hb86QN+Eth/BYM6lUSc/3Mel2oVKs0Xxk3Nl4286iP+UUEoJ8531BP0KhpoPjOBj8+gAAAAASUVORK5CYII="
},{},{
			label:"GifCam",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\GifCam.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAAD8M2P/LmX9MmX9MWX+Mmb9M2X/NWL/M2f9M2b8MWX9MWX9M2b8MGP8MWX9Mmb+Mmb9M2P9MmX+Mmb+MmX/MmT+NWT8M2b8M2b/M2b/PG3//P3//v7/zNn/bJH/wdD/8/b/ssX/fZ7/SHb/N2r/6O7/0Nz/wtH/u8z/lrD/j6v/d5r/cZT/Un3/w9L/t8n/rsL/hqT/Q3IGWDvoAAAAGXRSTlMA/QWxhFEsEQzz8aak9sq2q5WSRUEzJtHCWg4xMwAAAKJJREFUGNNlj+cOgzAMhGMSNmV3JCHsAh10vf/DNYlAQu33706274wWDANtsM0E49S0V72PdlTiYmvRR6AaCLVjR9C92w9jrIfYkYa5mx+8HsdhaDovk0ZCrwVvyrIq+I0SmYfppTiXorrXvKW+8WMEsk66WQGijrrzU4hpEuLVebmKxdAzTQ+BgyRWuBY7HZDGij0l3UBpjZMR3ye5nv97/wsnCw837oPTPQAAAABJRU5ErkJggg=="
}, {}, {
			label:"ScreenToGif",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\ScreenToGif 2.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEUAAAAXq+MXquMXq+QUp+IXq+MYq+QWq+IXreUVqt8Xq+MXquIXquIas+YXq+QXq+MXq+NNBVd1AAAAEHRSTlMA93jLGsDDPjQY27tOCp6aHwoWZAAAAFJJREFUGNOdjEsKwDAIRLVqUvNpc//TdgjBTSiUvs3MPFD6zQlidPd7gMu9T1Ew2IwRZQq0pESa4JdgzSJZOYSRjCFku9hP3p6i1YpYoh1Bow885qkDsjPvkZYAAAAASUVORK5CYII="
},  {}, {
      label:"TakeColor",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\TakeColor.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAACeV7mdVbicVLmdVbidVbidVbieVLifVridVbidVbidVbidVbidVbidVbidVbidVbidVbieVbaaV76dVbidVbidVbidVridVbidU7qdVbecVreeVbidVbidVbiwuftSAAAAHnRSTlMACYAbe2pCPBGzkoN0WU+9pYosBe/Iq6NGNDAl4WLt5aDiAAAAh0lEQVQY01XLWRLCIBAE0B72LXuMMVHuf0wzQmHl/dDdABjtatvUTqiM15bIam9KnyLNGm5YKE7cuw545Bc0TstZBpThigeChHIkcX0pXEKk92rQCIg+5+dtMG2QavQDxDKsB9cljdYBSA4ENvb1XSinsqg+v5tToAmctcRf79M8cWjIRIXqC0mvBUWYxUacAAAAAElFTkSuQmCC"
}, {}, {
      label:"画图",
			exec:"C:\\Windows\\System32\\mspaint.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAADrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjA76hHAAAAI3RSTlMA9e9aOZZD06KJVurPKxQMBPnm4HFpLRn4v7itnYB1YicSCDg6fOAAAAB6SURBVBjTjctJFoQgDEXRgCKggNhX3/3977FCPM59s/tzQidLrXHmlQ72BpJa67E4TozhClS1btk/C/gwLeLMgwdw6yBuPA8BxkNcNepOlC/QfH+L8ST6DiglW4yVX+agge6zFTuSsoOyTNie9uKIkhFL2+weS6Rz/QHBhgq5vjL5JgAAAABJRU5ErkJggg=="
		},
 ]
	}, {
		label: '代码工具',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
		label: "图片转Base64",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\template\\imagebase64.html",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAAARltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRlttZD1nFAAAAGHRSTlMAwQipiNEE+5T28vDmm4N9eBYT3ctmQTKt4Oj1AAAAWUlEQVQY023MVw6AIBRE0QGkiHTr/lcqGgl5hvt5khkoTlIQF2kagvQzAZ0RKBREOtmMHZ8G18HUW49DN0g4HVNA+sAAyAU1+4JQaC0PMA4Kq+zVj8hIO/7d/gIMLRe8+w0AAAAASUVORK5CYII="
}, {},{
    label: "正则表达式工具",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\template\\regexp.html",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAG1BMVEUAAAAAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZjyVtTqAAAACHRSTlMALT3p5zQlHv6bYmkAAAA2SURBVAjXY4CDDijAwmiAqOBAZjAWsAuAGSoCjE4gBqMRA4OyAJyBLMXAmsAWgNCOYCCsgAEAXdkZTtueOykAAAAASUVORK5CYII="
}, {},{
    label: "时间戳转换工具",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\template\\timestamp.html",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAgVBMVEUAAAARzW4RzW4J1HURzW4RzW4RzW4RzW4RzW4Rzm4Qzm4RzW8UzG8NyXARzW4RzG4RzW4RzW8RzW4RzW4RzW4Qzm4RzW4Rzm4RzW4RzW0RzW0Rzm4RzW4RzW4QzG0Szm8RzW0QzW4Qzm4V1WoSzW8Qzm4Qzm0RzG8Sz3IPy3ERzW6cnD+aAAAAKnRSTlMA+kQH8OTgt3I0u3kYEsGwp2tKKPbo1MrFsZ6ThH5uY1tUUAzpXT88OiKEDtDNAAAAoElEQVQY022PVxKDMAxE5W6wTQKE3iHV9z9gZBj+0Mdq9Wa0I8FFpY0BsA5giFOGc+/jTyu8l20e+wGBiBeuMmvXpMiURFB9HymAHgEMjxSCLbmj3oKoxqE6n58gIiGUcgigNGZmJEK7iAAmKWW9cYr25+15Ue5daGI8QV/ubd0390x6mKSYUJl+qGOmpHvyuiKiI/oAL2CZ1pTBe774/Q/pVQhH9eCgfwAAAABJRU5ErkJggg=="
}, {},{
    label: "CSS、JS格式化工具",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\qianduan\\qianduan.htm",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAADrTzjrUDjrTjjrTzjrTjjrTzjrTzfrTjjrTzjrUDjrTzjrTjjrTjjsTjjsTTbuTTzrTzfqTzfrTjjrUDjqTzjqTzjrTzgjqxfoAAAAF3RSTlMA4GHQhbf1z8Pl2rJxW1JCHtihnI16bgUfDNIAAABdSURBVBjTncxLDoAgDEVRwKL8we/b/04tgRCGxjtqT5OKX0UjeybWPWEqMegZNMMCGPIXScWnrUEADr2qFVgaPDze1oYBkvxJO+kGG0btB81ADMVh5IqoZdXL4ksvaFcI53BqOlkAAAAASUVORK5CYII="
}, {},{
		label:"在线代码对比",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAAAnsGElrV8mrV8or2Efplcnr2Aor2AThkQmsWAho1kXolYYoFUqsWMXjEgenFMorl8hqlkosGAepFQdo1gRdDwzvGsotWQakk0TgkIenVYYj0omq14gnlURfT4lsmMhoVUin1Ipr2AShkQnr2ApxW8WjkkVgkYmr18Ylk8nr2ApsmMYkEssvGkqtmUgnlQViUYPez0TgkJX36ubAAAAKnRSTlMARt/Z0kT48EUzLh0N5cePin1nVCUZ8/Hv6trUy8nBvrSpoZqTiYJtPDT74HWpAAAAl0lEQVQY03WO1xaCQAxE40qRJiJg793J0vz/jxM266PzMsk9OTMhovCUeJ5/fMYkihYVo1e1HAl46DaluMg8VLkBh66bDP4C++UwTNvWAJqB7wZoLSAA1OD7pnElTdUIetsBNn4MzHtz/gMFhBb8Qh05tOAGzgSwaXEZSSz/1NcyeqcApD7ya/3RDViFJCou2/Vqc85l+wIzOA9XMBBQeQAAAABJRU5ErkJggg==",
    url: "https://www.diffchecker.com/",
    where: 'tab'
	}, {},{
    label: "Beyond Compare",
    exec:"D:\\Program Files\\Beyond Compare 4\\BCompare.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmaHTeAAAAIXRSTlMA90YSIs1S00sF4Nq91l5X/rI5qpNBMCynoXhqF+SWh24tV+IDAAAAoElEQVQY0z3N2RaDIAxF0QQIk0AVx6od/v8re8tyeR542ARCszCzq3Qng1dqkOUGfuDYe6la69DA4pi3FJ1zk74ANyZ+bMlP3SB8FzKdIhp7CHvjpbMNjpRHwB65TzUDQrAM0CalFRNrIVIARcGf+GPKQz0BbS224B3HAyCpPNBbigyrBiybQxGDBrMAChrZzhBq0DJ5UsiPQlflxf9k/gGi+AbJ1Hs/IQAAAABJRU5ErkJggg=="
},]
	}, {
		label: '工作相关',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{}, {
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{}, {
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},]
	},{
		label: '办公软件',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "Word",
			exec: "D:\\Program Files\\快捷方式\\办公软件\\Word.lnk"
		},{},{
			label: "Excel",
			exec: "D:\\Program Files\\快捷方式\\办公软件\\Excel.lnk"
		},{}, {
			label: "Outlook",
			exec: "D:\\Program Files\\快捷方式\\办公软件\\Outlook.lnk"
		}, {}, {
			label: "Publisher",
			exec: "D:\\Program Files\\快捷方式\\办公软件\\Publisher.lnk"
		}, {}, {
			label: "Powerpoint",
			exec: "D:\\Program Files\\快捷方式\\办公软件\\Powerpoint.lnk"
		}, {},]
	}, ]
}, 
	{
		label: "常用功能",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADFSURBVDhPpZM5DsIwEEXT0JESLuLKlpfDkw7K1CQcgDPA/1FMJjaKHcXSSNYsbza7aXCcczfv/ack8Ltbay+MWZ1SYGLvM0h0yMhCobW+wq+ffdeQGgBZzCwgjx8/BRhjWqXUibOh8E6dgEzz+gsIIZxhfCNwEL0/qaONQVnFUjFnHtPBAjjSVgTIlSKjpUQYbbsBCHaimq4IONxCHCKyvkRm3uuGyBLlGhHYyTUWW9h6jdG2ucZDgJ2fanmJtd85STCt9AvwzgF23t8L3wAAAABJRU5ErkJggg==",
		child: [{
			label: "about:about",
			oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:about');",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhPnZJJCsJAEEUFxRM4LR1WRneCEDKRrPQAOZvjVhQ8hiAuRBzQvYgnEBcior+kGoJ2t0OgSNJd//3fQyymeRzHKaA6qAPqyu+O7/slne4553leA4KT67r31+LxphLCzkI8BKyKSti2bWBuwMCzMgmautw0krlEIH1pClorAchR1oC5MhscVYArNRiGkZQ1hGEYZ8BNm8CyrIouASVVAcQejBWAISfoqQD1yNGNKQkt5/UU8F98AwRBkIV4Kzt/MUb3gO6JVoymNRxqELVQe9SF322I81IxRDtyYXH643UVDSDmhBiAFZz/FpP75icABAvenGVk8+ZfxwdgCuEMy0iZppnB9xxjk28BDwjoo+kYqKCEAAAAAElFTkSuQmCC"
		},{
		label: "参数设置",
		oncommand: "toOpenWindowByType('pref:pref', 'About:config');",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABC0lEQVQ4jZWTTUrEUBCEc6DZyIC7pPurQVAh4F2EgAreRQKjSzE4Ki4H/J0jCAoeJC58Ay9vEuP0sruruqvozrKecPcJsJTUSmqBpbtP+no7AZwCdzE4JpG0AE6GwLcpaF3rIXtIwVUofJnZgaRLYBbVZ8AcOAQ+Qu95Fk1oJLVmVo7JNLO9QPC4YRhwNUYgqe4YmximaO0p8A6s8jzfjTYgNjZLDYsmvUaNq576L26IAHiONnsbJBiSUBTFjqQn4AWYrvPu7h0JiYnzMROBi43rBK4lte5+NEbg7vuB4D5OHofkt5mVkmozI1m7NrMS+AzDzlJTbv57ypIWQ/oqSc0fz9QA1ZjMrd75B1lk19vKzwu4AAAAAElFTkSuQmCC"
	  },{
		    label: "安全模式",
		    oncommand: "safeModeRestart();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFxSURBVDhPzZM5S8RQFIUjFoIbonaKxYiVhUswjJNZSEIkuGAzabSysxYLa+1dOgv9B9Z2LuAP0E60ttNCRERB0e8MLzIzZkhr4HC3c+67eYtlpXxRFHVUKpW1Uql0K8hXLo1by8Vx3O77/hDECMEBeCyXy9/1UA7siyOuNDUxyatmsolvqK3ir2Cv0zjSWkmB4AFcEG8Xi0U7DMMu13XHBfnUplUTR9xE99tA0+Tz+X7EOYqz2EXskmB85XLiiJvaIBFk2X/WgA151/9oo7DzWeOr3vALuihqwAa5+E5WAzhz3IU+afCftZt7ZkdPKHSL0KqJTgPOMJx1o7m0OOcREq8msWPbdif+THMTTagjJB+CFzN1tXYbKVZp8mmanGGnCoVCD80nWHHSjDwG55jal+EdNrwNigvgqe5mnhMvaxLsaZ3wg3gLcdufx8VKgxB3kxGTZsa+YY88zxtt+SqTguM4vZA3wB2r3YPNIAgG0oQ/m/YMiCgVxnsAAAAASUVORK5CYII="
     	},{
		    label: "清理痕迹",
            oncommand: "Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACsSURBVDhP5ZO7DYAwDERZg13yKaBgGuaBeWAWSkoo4c5KovBJFGqQLGTn+WIbU1WZR2s90XJM9swYc9D+ImCt7dDv4vvOvBeyj7kUJstQyb4JFE08+WVwsBWUL5dgN/ZLBQjUpcmeY04QwVBapyxbdy8z9rmZ9JVSTRBAoHfQwKCDZg/EPrjBsX0QADA+gon9vV8m2GtZCQGWHrcrGALr1yEyJ25BBvPF/G9+AmqEx/11J4FdAAAAAElFTkSuQmCC" 
     	},{
			label: "历史记录",
			oncommand: "PlacesCommandHook.showPlacesOrganizer('History');",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFBSURBVDhPjZNLTsNAEES9AiE4iYP47Ebyb2XJpyNA+NwlsCNHQAkHCCeABUFBUM/0WOOJLYhUUma6utxd3ZMk0S/P87Qsy4uiKJbCh2HJHbGY352dcwci3wlbkb+HYLFZmqZ7PSEuFHywpI3+X1VV5YQjg1NsJmzgKD7viViQr74K515dxCfgzxI7Mw7cm/Y+y7IJpdErhLA030Z4J/6p+bIlNxFpasRpbNCQAJxeDm5DpOf/CsA1L1YJ5XDYcfb3S71peD+aptn3hkNqnR0SICESWVAlk7EK3qhgNdbC2NL4FpT33BkioevRLYsCfuzKuaScYz9GRvSXiNb5xI+R3JbPUlhP63gXQkFiSl4b97aLYaAuH+NVruv6EFjP46uMEo9JAvfCVzy+4Exs9zGFZfJkMUfEF+FT/99xm7uh5/wD0RLVmfcHQ8QAAAAASUVORK5CYII=" 
	    },{
			label: "错误控制台",
			oncommand: "toJavaScriptConsole();",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEYSURBVDhPnVM7DoJAECWxsbDRXgtbPQAJLOgNbDiEiVfgENyAhsLeRk9AYWK01IQT0FKZqO+ZWbPgb5XkhWHmzZvZ2cFx3jxhGHaUUguC9jveSz8S2kEQbIGrYEuftQiqxkzE+0SIHVsJeJ43QEIFXAAloF1BrP9VBKRMKmZRFLUI0/dRoFkNiQf49s2uXopIpZ15Xj1EJhhz2ZH7JIIpzyWh0BM3BeRmCvrIrQn4vt9FhZJB2DMdhG9J6G/GpMPSdd3eQwSkRAIbU5lVm/cP3lq4yZ0LwhgCZ4K2KSB7cDR9GOioxofaqqZosOFPiebAdMfMdWRpuLJTnHFoA3Q6kQFXFMj1tP9457zfvrTKn+cXpFar/W33b66Bx0oLpLE2AAAAAElFTkSuQmCC"
		},{
     		label: "遥测数据",
    		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:telemetry')",
    		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADSSURBVDiNxZA9asNAEEbfDAYVOoZJmy6kMhgfwjqBkFSkymEkNwLjM7i2O9tHSOHahcuQIghmUkRykR/QSoU/2GJY9u37RtydMZn8d5Gm6UJVlwAisq6q6hAEUNVHIAMwsyPwJ0BDdIMMfibLslfgCaBpmpe6rq9BBu4+AxIgiaIo/mWQ5/mDu2/acQu89wHfDMwsBp7bM+1rNnqJ9wfclqiqH+5+aseziFy6WUSuwBtwAjCzz+6duDtFUcyH/F6W5X7SEnfDCiBdhdVAwHeFMfkCfLhCrrHVotkAAAAASUVORK5CYII="
    	},{
		    label:"代码速记",
			oncommand: "Scratchpad.openScratchpad();",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFmSURBVDiNldMxSNVRFAbw33u8si1sEkMEoQijFhOcCkkI14Zoyxo6YwbN4mLQ0uDUAaHIRXDIzSWCfEOz1hINIRRkDQVRENF7De/+5WFF7124w73nfOee7/vOrbXbbf2siDiEy7iB2Xqf4OPYxhoGM7PV6AM8imcYK1c70FOBAm5ipOt6G/5LISLqeFzAX7pCOz0VwDzO4w2+91UgIk5hqQC3MIwWHmTm5146mMcRLOhYV2He6zr86/UBXNHhfwKDJfQTK1XeHy5ExGEM4Ry+4hGelvBHLGTmhyq/Vk1iREzjJo4V3texjkVMoo27uI9vmfljn0JE3MYc7mTmJR3P97BbumjiVtHiAjbKSGsUn69iKjOrj3Ea94rSFw+wfBIRZzGDzXpmtnQGZLgr6W1l0180qmECr/Y1iIhxLOM5XuA13lUdRcRRnMQ4rmE1Mx8eFLFR+J0pewwD+IVPeFl2MzP3qo5+A3fNeAnsfDlKAAAAAElFTkSuQmCC"
		},/*{
		label: "编辑 user.js",
    exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\user.js",
	  image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVDhPzVG5EcMwDNMkyQTeII2ejdJktrjIUHaTKgZkUifJtF24Ce5wRwGgqBPdfyGldPPev0MIE/g74MQc89K6AuJohHeJ/EdaV0DMk3Hzg7dL6Ct2AX3To0iyhvnS8x6tF2RD6qeee6JxBkfwnhsVGpDjBmd+/4IysddYmzgLmL61e+paWxrrAn5GHdwEKpg+hDw5xjiYgQr0MLDdvfWCIyLf7l7+gDudrQYlfcm1u78G5xYt+dG/P60iLQAAAABJRU5ErkJggg=='
    },{
     label: '编辑 prefs.js',
     exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\prefs.js",
		 image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVDhPzVG5EcMwDNMkyQTeII2ejdJktrjIUHaTKgZkUifJtF24Ce5wRwGgqBPdfyGldPPev0MIE/g74MQc89K6AuJohHeJ/EdaV0DMk3Hzg7dL6Ct2AX3To0iyhvnS8x6tF2RD6qeee6JxBkfwnhsVGpDjBmd+/4IysddYmzgLmL61e+paWxrrAn5GHdwEKpg+hDw5xjiYgQr0MLDdvfWCIyLf7l7+gDudrQYlfcm1u78G5xYt+dG/P60iLQAAAABJRU5ErkJggg=='
    },*/
	]
},
  {
		label: '切换配置',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVUlEQVR42mNgoAZwcnLyBOJnQPwfCYP4nsQagK4Zbggxmv9TgqlnABnhRiMDiDWQKAOw+pnmXqCqAfT1AhBbk6DZGtmAZxSkxOcgA7xADDI0PwHpBQCQg+DlDp6WXQAAAABJRU5ErkJggg==",
		child: [{	
    label: "阳光盒子Firefox Lite版",
    text: "-no-remote -profile ..\\Profiles\\Lite",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{	
    label: "阳光盒子Vivaldi版",
    text: "-no-remote -profile ..\\Profiles\\Vivaldi",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{	
    label: "其他配置1",
    text: "-no-remote -profile ..\\Profiles\\Other1",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{	
    label: "其他配置2",
    text: "-no-remote -profile ..\\Profiles\\Other2",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},
{	
    label: "其他配置3",
    text: "-no-remote -profile ..\\Profiles\\Other3",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{},{
		label: "打开配置文件夹",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path,
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAMAAACXZR4WAAAAilBMVEUnt/8AAAAAFyVigo4nt/9qhpAWND0AFSN1hYopx/8nvv8qt/pfeoQkntqIjo0UOEQdUWcAKD8nt/////8ouP8ktv8Zs/8Hrv8htv8btf9kyv12iI5T2P+46P9J1v9Gwv85vv8Dq/9rzv4BFyXS+P+D1v9Q1P900f8Lsv8Usf9cvu/m5ON/kJVrgIdobHnQAAAAEnRSTlPyAPK75bqB9fTy8u7az7l5dmO77hXqAAAAd0lEQVQI13XN1w6DMAxAUTcBuleKTdKG3cX6/9/DICTCA0fyy5Vsw7UUQmzL+2YCQde+2O7iSyn90w2C5jF6J4m19nuEc108WaEiQ0TmAPt/HrHchGoAAGrmBE1GuwGzNM3QCdUvjj+EzkrIFjdQa1z74vHMlNcDWKINzYm6U7wAAAAASUVORK5CYII="
			},{
		label:"备份当前配置",
		id:"BackupProfiles",
		onclick: function(){
			FileUtils.getFile('UChrm',['Local','BackupProfiles.bat']).launch();
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAh1BMVEUAAABwkMhwkchwkMhwkMlGRkdGRUdwkMhxks1og7JGRkhHR0lwkMhwkMlHR0lwkMhyldFHR0lwkMhGRkdpg7JwkclwkMhHR0lvj8dwkMhwkMhGRkdHR0lFQ0RwkMhHR0lidptkeqJdbo1gc5VHR0lUX3JXY3pwkMhHR0hid5xaaINVYHVOVGDPePq5AAAAJ3RSTlMA8nanWFicNCoJdEjqh2oeFOrh3srFtLNpTUFAJxTQvbSlo5SSjXgYhP5IAAAAhklEQVQY05XMxxbCIABE0YEUQRMgvdsVLP//fQLRnGy9u5nFAzjbOIyDj3BoQpyEIioGACoNvJyk59cl7PHTJdrJsejp8XmiIVa2JgL+ORS7ve9MLptVhGhC9uBd6NW6Kh9lkIIHelarb0O21Gnl1Jh4wiyKrYMxprnCG3eWyEwhBqyIzDY+xeYJ8JtKMoUAAAAASUVORK5CYII="
	},	
		]
	   },
	  {
		label: '在线更新',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAENSURBVDiNpZO9SsRAFIXPyQ8EG1/AWlgtVh8hEJLK2Nik8n18gmU7K5u1MFZJkxewsNHCYt9BBAnEzLHJLIvsBENudYe557tnZu5QEuaEN0sNILBJlmVXxphC0tmYgOS753kPVVU9AwAlIU3TXNLTlM4kr+u6LgMA6Pv+zff9yymAvu+/dkcg+WiMmaIHSQC4sIClo2gDAJJuXKDAtUFy03VdAQBhGDohBwFW3DTNDwDEcVy4IK45WPi+/2IXQ774twNJ58MlWUdL18RaB1uHk7HY7jtYAbj7W5Ekyevg4BBgtQ9YkzyRdAvg2FY4nveT5L2kNTCMso08z4/atj0d8x1F0UdZlt+7JnO/8y8MoWIWIaNd4AAAAABJRU5ErkJggg==",
		child: [{
				label: "更新去视频广告播放器",
				tooltiptext: "更新播放器后记得更新脚本",
				onclick: function(){
			FileUtils.getFile('UChrm',['Local','update-SWF.bat']).launch();
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAABPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLAmlKKQAAAAE3RSTlMABU38+qtbuI0ktQLvp6E8MTAQAhYxjQAAAF5JREFUGNN1jkkSgCAMBAmKEsGV///VkEFSHOQydFc29/MoRhp4LSXQwPOkxtgvaoydgzGGSZJemVnNKeKJWl+tx25Uo884YJIx0dZM39fNBYZhyTsf34V75poJ2L4vvEcDofwIDtwAAAAASUVORK5CYII="
	},{
    label: "用代理更新去视频广告播放器",
    tooltiptext: "播放器不能正常更新的时候走代理（默认端口1080）更新播放器",
    id:"updateswf",
		onclick: function(){
		FileUtils.getFile('UChrm',['Local','update-GAE-SWF.bat']).launch();
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAABPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLAmlKKQAAAAE3RSTlMABU38+qtbuI0ktQLvp6E8MTAQAhYxjQAAAF5JREFUGNN1jkkSgCAMBAmKEsGV///VkEFSHOQydFc29/MoRhp4LSXQwPOkxtgvaoydgzGGSZJemVnNKeKJWl+tx25Uo884YJIx0dZM39fNBYZhyTsf34V75poJ2L4vvEcDofwIDtwAAAAASUVORK5CYII="
	},{
    label:"更新去视频广告脚本",
    tooltiptext: "更新脚本后记得更新播放器",
    oncommand: function() {
        var url = 'https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/YoukuAntiADs%40harv.c.uc.js';
        var uri = Services.io.newURI(url, null, null);

        var target = Components.classes["@mozilla.org/file/directory_service;1"]
                .getService(Components.interfaces.nsIProperties)
                .get("ProfD", Components.interfaces.nsIFile);
        target.append("chrome");
        target.append("SubScript");
        target.append("YoukuAntiADs.uc.js");

        var persist = Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist);
        persist.persistFlags = persist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;
        persist.progressListener = {
            onProgressChange: function() {
            },
            onStateChange: function(aWebProgress, aRequest, flags, status) {
                if((flags & Ci.nsIWebProgressListener.STATE_STOP) && status == 0) {
                    if (userChromejs.save) {
                        userChromejs.save.showInstallMessage('去视频广告', '已成功更新');
                    }
                }
            }
        };
        persist.saveURI(uri, null, null, null, null, null, target, null);
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAABPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLAmlKKQAAAAE3RSTlMABU38+qtbuI0ktQLvp6E8MTAQAhYxjQAAAF5JREFUGNN1jkkSgCAMBAmKEsGV///VkEFSHOQydFc29/MoRhp4LSXQwPOkxtgvaoydgzGGSZJemVnNKeKJWl+tx25Uo884YJIx0dZM39fNBYZhyTsf34V75poJ2L4vvEcDofwIDtwAAAAASUVORK5CYII="
},
       {},
    {
     label:"更新纯真IP数据库",
     tooltiptext: "更新地址栏国旗显示IP",
     image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD/gADrTzjrTzjiSTrqTzjqTjjqTjbsTzvrTjjrTjfrTjjsTzjrTzfrTjjrTzjrTjjsTjfsTjfsTjfrTzjrTzjrUDjsTzjsTzjsUDjrTjjsUDfrTznrTjbqUDrtTzfrTjvrTzgL7w0kAAAAIXRSTlMAAvroCG48IhHbw6SfjH14c2lOQfbwyqyRg2VcWkswKhpMHbaOAAAAeElEQVQY03WOhw6DMAwF4yRQRimre9///2SLCYghbMmWT5bemY2SeAESDnPQwkOmYA/OR8P19TFAfWwDiJoU7L+zADIHPC3QZ70Bd5IaKBQUQHMz3kGuIIdUEmOuBJkSNLDCfnrLM7tu3ylDir+8VK4aXUU/dKzrBxgiCAZdSUEoAAAAAElFTkSuQmCC",
		  exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\lib\\ShowIP.exe"
		},   
	    {},
	    {
		label:"查看阳光盒子Firefox更新信息",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://sunbox.cc/firefox-sunbox-plus.html')",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD/gADrTzjrTzjiSTrqTzjqTjjqTjbsTzvrTjjrTjfrTjjsTzjrTzfrTjjrTzjrTjjsTjfsTjfsTjfrTzjrTzjrUDjsTzjsTzjsUDjrTjjsUDfrTznrTjbqUDrtTzfrTjvrTzgL7w0kAAAAIXRSTlMAAvroCG48IhHbw6SfjH14c2lOQfbwyqyRg2VcWkswKhpMHbaOAAAAeElEQVQY03WOhw6DMAwF4yRQRimre9///2SLCYghbMmWT5bemY2SeAESDnPQwkOmYA/OR8P19TFAfWwDiJoU7L+zADIHPC3QZ70Bd5IaKBQUQHMz3kGuIIdUEmOuBJkSNLDCfnrLM7tu3ylDir+8VK4aXUU/dKzrBxgiCAZdSUEoAAAAAElFTkSuQmCC",
	  },  
		]
},{},
	   
	//移动 工具 菜单
	/*{
		id: "tools-menu",
		label: "工具菜单",
		accesskey: "",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcElEQVQ4jdWTQQ6AIAwE+drs33gxaMIJL2oMIKnVi5v0QNIObboN4SIgAgmIwSNglVSB5AJ4f41AklQNkbvxJBVj8QnpOpCUn0Bco5oAs6QfAtqC9j107N1KR4ChY/eVLkZAb6qZvvBBeXVoh2Pbtjdof7mCLHWekwAAAABJRU5ErkJggg==",
	},*/ {
		id: "charsetMenu",
		label: "字符编码",
		accesskey: "",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaklEQVR42mNgGHTAycnJAIj3A3ECklgCVMyAGM3vgfg/SAOS+H6o2HuchgAlFJA0oyhEMxhEK6BrFgDi8/hsQTMEpFaAaM14DQES66EC/wkGEsIQmPr1VDGAMi9QHIhUiUaqJCSqJOUBAQDF4pEx3If3EAAAAABJRU5ErkJggg==",
	}, {
			label: "隐私浏览",
		oncommand: "OpenBrowserWindow({private: true});",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA20lEQVR42mNgoBQ4OTkdBmEkPi8Q5wJxhxMCdEDFeLEZ8B+KWYE4C4hfI4mh49dQNSC13EDci2zAFzwa0TFI7W8QmwFN4gMQXwbi71g0fYfKfUAS+41sQBHIaVBvmQDxXyQ5ENsEKscKVQsSf4RswFwgZkQKmzNIcmeQxBmhakHiC9G9AHLiaiBeBcTPkMSfQcVAcleQxM0ZSAg4dLwQPRqPk6D5HBDzoxsAitd2IH4D5d8B4nQovgMVewNVw42RkJD4TEAshCXBCYHkcKZESvLCwBsAyo1HyNUPAFr59v1e4pXxAAAAAElFTkSuQmCC"
	},{
        label: "保存网页",
        oncommand: "saveDocument(window.content.document);",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVR42mNwcnLyBOJnQPyfRAzS48mApvkdERqR1TxjQOIYMgABugYGKEDmA2l9OB+XQnwGoPBpbgBBA7FIHMFjwBGCBhALaGcAkG0NxL44sDUxBvjiw7R3AdlhAMRWJGi2RDaAnJwIw89BBniBGGRofgLSCwDDQxufnOjqdgAAAABJRU5ErkJggg=="
    },{
		label: "书签管理",
		oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVDhP7VLbDcIwDOwXYpYswE8e69E/mAmxABJskQmo1N5FceW2ScNXv4h0khX7zhfHXYdjjDk55+7e+wiMDUTWkkNuOri4/UBcCINznQWkcwjBzpeVgDW5WdQCSb1Flry4/QuomW2G0pjmMUO01l6wLC+CsTa16wCLcuaWAV8pZAz0zFGoKsBOSL5ZAMJAUkYSQ/zJNcvFU50GXSi218JVB2ur+t2lp+lVfpaGVfpNNdwH8xOCpsBrchFApgAAAABJRU5ErkJggg=="
	}, {
		label: "设置选项",
		oncommand: "openPreferences();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADfSURBVDhPnVNbDoIwEOQAavxXr9GPJtCEI3gONFxLrqHoFcCrQKIzZqukD0Il2Wzpzs52d9osm/nyPL/S5jCzsaIoXrRFBKh0Abgty3IHf8b/wxJwDask1hLrkdoE+MEmuh6xkXvEhggONhn+CeBRKbWhcS17TB6MMfsQQS0VewC2LoB7iHdygjraAqvFhsaY1wJlmvbKI8cItNbrKfYjcQoB2lg5g719i01kS2vBMoD9JOzdgiFWXpuUxpWRPUvfHF4vAxxjMt4t4N+L1CRc5WbR+0h6TCFGkfgnVQD0Bjart3NZbbvtAAAAAElFTkSuQmCC"
	}, {
		label: "附加组件",
		oncommand: "BrowserOpenAddonsMgr();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfElEQVQ4jc2SSwqFQAwE+14KSWWn1/YqosfwrRzEEeNv8RqyCZki3RnpSwFDRCwRsQBD1q+0Dq2V9SVJZtYB034oK2Ays05PHm8hZT13b69m5e5tsXPkq/J5klcFyEJMAa83uKo/BNw5I9AUwMuPNAvogfkBYAT6u9Yr/QBtWNOEJkNI4gAAAABJRU5ErkJggg=="
	},{
        label: "定制界面",
        oncommand: "gCustomizeMode.toggle();",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABwSURBVDhPY3BycvIE4mdA/J9EDNLjyUCmZphlz0AG4LXZxcXFBqQGmYaxQeIEDSBkAfUMcHBwsGYgEmD1ApF64cpgXoN7YdQAYIIgEVA/EElJByC1yC4gJyfC8s9zBkdHRy+gac8JpXl0eaC+JyC9AJHGA1IHcnoMAAAAAElFTkSuQmCC"
    }, {},{
		label: "关于火狐",
		oncommand: "openAboutDialog();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFsSURBVDhPjVLNSsNgEEyq4lEURPEphBwMIT8QUpoXCOJT6BvozaN4VEEQb3ryJLUgopfiMxQ8FCkIitimFw91Ju7K15S0FoZvd3b2p5u1rNIvCIKnMAwfQNeMUA1cm7Gyfsz3PG8DwhEBcaxB2spTU1kEoroK8V6qkLbB1ysLoNOeIcxd110hwOUGvzttgjMZ/1veA7z7Je50okCapou+7y9zUdLpUN53vAT3olyb2izL5opCURTtYPSBMeIIglX4TWOhd8IVCxZ8IW/b0g5wPmF/ANcszG2DeyR087CvgC7wohNacDriNNll6nf+nXgdOS3ZS8dC0haInhBdCDarikDrQPcq2h5zdQ+sei+BPt6Jb00OGsZ4ZK04jtfGGjmOs4DAhfydIeyGcYkN8ENJPseU81VT2kg8liI5RyTg6yEdIdGetScbCcVBAW8Cjn3yn+SiOI8ECbfGHdz8Hc6s9hpPkmQJRZ4J2lV5P7lDzT8FaRF5AAAAAElFTkSuQmCC"
	}, {
		label: "重启火狐",
		oncommand: "Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC5SURBVDhPpVNJDsMgDMwHcmryGcRy4DV9Z3sjt+Y/iQfZFSUJdQQSEhqPBzM2w9BYzrkXdovTjHnvN2yVAN+WrLWzJNQCiBG2nFaFABIo+IkxPiACImFvnIHReWXR5VAVq2dCCOFZE4Bx8lpW+cPDLSAaY8ZaABhiUp3KFxWJ35nd1rTswC8BMezfbEh3NHzVK76kLhO72yiDhGGhdk0ySGIssOYgaUeZeEnTrezLrc90Znf5F67asQMTxXivwhMfxAAAAABJRU5ErkJggg=="
	}, {
		id: "appmenu-quit",
		label: "退出火狐",
		class: "menuitem-iconic",
    oncommand: "goQuitApplication();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFCSURBVDiNpZO9LwRRFMV/IxL8BSpEpxER1UZ9RK0h1kenQkMiW7GNApWKQsP/oLmJqIQs0SpMKaJZtvARzSjmjjxjZhNxk5eT++455913X16UJAn/iY52RUk1SbU/GUiqBOm2r6w21tZA0h5wIamr5MCGc76j04URsA8sAzHwWWJwD6z5AatmlmQdTLn4DZg2s7LJVoEP51bCKyw5bprZTYkYM2sAdU8nQoMhx7MycRDnjgKfAdDj+Jgj3xUYxI6DYQdZ26M58rivMEYcb8MOroBJ0iGdZkwzaxZ0MOd4HXZwCDwDs5KqBSIAJM0Ai0ALOAKIsr8gaR44BhLgAKib2ZPX+oF10ueLgAUzO/lh4MQVYAfo9q0m8Ar0ef5O+tS7mSbK/0ZJw8AW6fB6ffsBuAQ2zCwO+b8McmYDwIuZtco4X9WLZcPfgO/HAAAAAElFTkSuQmCC"
	}
]