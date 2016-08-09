/******************************************************************************************
 *这里是脚本中用到的各种图标设置。
 *******************************************************************************************/
var Icons = {
	//等待时国旗图标，预设Firefox内部图标【chrome://branding/content/icon16.png】。
	DEFAULT_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2TwW7aQBRF+ZDku0q/qChds5mxkDG2iY3H9jyTBFAWLAgRG7CwCawQi6BEQhgEFkiAuF3VaVXaSlWvdBazuGfx5r1c7n/H9/1rIvpCAUWS5E6S3FFAkU9+wff967+VP1FA6fPzMwaDAcbjMQaDAabTKSggEFEqpcxfLEvp5huNxnmxWGC73SIMQ9Tv6gjqAbrdLqT0Ub+rg4jOUro/S4QQV57nbZMkwel0wvF4xGazQafTgeu5GY1GA8PhEMITqRDiKhM4jnPTbrdxOBxwOByQJAlcz4UQ4heiKILruXAc52smsGzrpd/v4/X1FcPhEBQQ7Jp9kVarhdlsBsu2Xj4E1u3x/v4eRATLuv0tQT3AdDrFcrmEZd2eMoFZNXdm1cSP2DUbZtUEEYECglk1MRqNkKYp3t/fYZjGPhPohh7rhg7d0PH09IQ4jjGbzdBsNtHr9SBcAd3QMZlMMJ/PEYYhdEOPM0G5Ur7RKhoeHx+xWq2wXq+xXq/x9vaGVqsFraJBq2jQDT17l8vljyFyzq9UVd2qqoooirBarTLCMIRds6GqKgzTgOPUoKpqyjn/+MZcLpdTFCVfKpXOlm1huVwiSRIkSYLFYgGzauLh4QHNZhNaRTsrinJ5GxljeUVRUil99Ho9dLtduJ4LKX0QERRFSTnnny+Wv6dYLF4zxgqMsZhzvuec7xljMWOsUCwW/3xM/5JvTakQArDW8fcAAAAASUVORK5CYII=",

	//未知的国旗图标，预设为上一个图标设置，如不喜欢内置默认，可以再这里修改。
	Unknown_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVQ4jZWRMahScRjFL40REW9ojqaGhoaGprg0eL3//3fkj0pCDrYp2hARmRItjk4ND0EuSFMgSEQIiuMjEjdnwUGIvLdF+bxc/j6ut8X3eM9X7z3P+vE7nPMdw9gRgPdEdCSlPJRS3t+9Xyrbtp8A4FqtFmQyGQbARHRERAXLsg6uNADwMZ1O83q9jpbLZdjtdnW5XPa3Rksi+iqEeA7g5j8NFosFu64bRjuaz+dhu93WhULBB8AAXCll3TTNO6fweDx+qLWOwvACf06TySR0HCdQSjGAt2fjKwA8m83+6zCdTsNWqxXkcjkG4Nq2/ezUgIg+ZbNZ3mw25yDP88JOp6NLpdLJL/4AaAkhnu4+cFyv14MoiiJmjvr9vq5Wq34ikeBt7+8AXpimeevC8+Lx+D0APBgMdK/X08lk8gT6KaV8HYvF7l46nxDiJQD2PC+sVCo+Ef0A8ODK3c/0/5zP5/0gCCKlFBPRu2vD2/6/ms1mMBqNjgGwEOLxtWEhxCMAPBwOjx3H0UT02zCMG/vEf6OU4tVqFRWLRZ+IvuwVn4g+pFIpbjQawXbnV3sZWJZ1IKU8BDAhom+2bd/eh/8LEFU+M9Rx2boAAAAASUVORK5CYII=",

	//本地文件图标，预设为上一个图标设置，如不喜欢内置默认，可以再这里修改。
	File_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAAB3ElEQVQ4jZ3QT2vTcBzH8YGPxpt4EHwmHoc+BRV8ADuu+8MG2w47DJINVkLHWDrFKXpYBtqmttl+JV3/Zk1/SX5pfklq09TCx8O0yLB/0g+8j9/X4bu09GB7ex9fHB8XqSgqVBQVKgj3iaJCj46+0f39r8Wtrezzh3czl0plXxUKLjj/BcuKYNv3MRbDMEKk0wWIonKTSp0+SwSvrmaXVdUGY33Uau64RsODrts4OVFhGH2I4tWPlZXTp4ngfN6C4/RBCEWp1IammSCEQtM6kKQcwnAEyxpCknLft7c/PJkbzuUoGIug6zYIoSiXKSoVB4RQCIICVTVAiAVFMbC7+/nq4ODL47lh141QrbrQdQeVioPbW4ZazYUsl5DJ5JHJqJDlIi4uGtjZ+fQuATxAvd5FtcrGNZscphnANAO02wE4j1Euc6ytya/nhj0vQqvlodHo/pM7rl53Yds9XF93k8IDGIaPVov/t2aTg7H+InCMdjvE3V0wMdeNksOcx+h0Qpjm5LrdwWKwZfVA6eQ8L4amLQDb9s+pcZ4QzucpfH8Ix+lPzfeHSV7x/mWhwBAEIzAWTy0IRiAkwMbG+duZ8OZmdjmdLoaHh5ehIFz2ZiVJWri+fvbmz/mjv85vk5TTd5np7HoAAAAASUVORK5CYII=",

	//Base64编码地址图标，预设为上一个图标设置，如不喜欢内置默认，可以再这里修改。
	Base64_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAABC0lEQVQokZXTTSvEcRDA8Q/ZcvBQLlIeXoCDUl6Aq4tQzm7egHZtCoUk70EOXEjC3UEuDk4uHo8ODkIu2l27Djubv4e1a2qa38PMd2b6zQ92kUPpn5rHjlhcYREZpDETtpouRExO0JZ8SgN61JbliFVCNnExjhtM1ABkfwN04CTOztGdCGiN6v4ETOMZ63gI24ghHGOsGmAWnbjAAVqwgscI2g+/S/RXA6Qj+3A4dOEsKnkK4DWO0Kb8YiV4xyZusYFUosxRvGIbzZjEC+YxVwEUIsM9Bn2VFEbQF/smrEZrp5FcIUhr6pN2HKJYAeSjtwFM+Tl1mW+axlYkzlOe5yx6cae+f1DEG/Y+AKR8auXF6Pi+AAAAAElFTkSuQmCC",

	//LocalHOST【127.0.0.1】【::1】，预设为上一个图标设置，如不喜欢内置默认，可以再这里修改。
	LocahHost_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABNklEQVQ4ja2UwUpCQRSGPwx9gyAfooVLF0GLXiFo5QsUlkHcUgjcCZVEqIueQGjlIqwWbXqAom2IVJu2Bobg4raYM93D8ard7IeBuf/85xtm7szApA6BUNq6eGfKC4GdmLq5CqS4It+nBurbdlJwFahL/0SBRkB7EfhKDDQENsU/WgRul79lxv8Er8+BepVNrvgf0Gnw/bjQeUKolz6eE/ALNTBMAPU6AMaKUQLYMzM2VMESkAHSBpQWP6W8O8PhWDpj4AuoqfAl0AeegWXxckBP/EBlO8BAgzNAAcgDL0BLhW/UpFnx1lRxU2UfgGtgg+jM/+jNgDsC+CS6OKvAI/AE7BrwrQV6vf4CPE0zwe9E7wTAlYAHuC2bpXvcD4xVH7fEAHc+e0T7WcNd5YppZcl+AF0P+gbk74HicL4aGwAAAABJRU5ErkJggg==",

	//局域网【192.168.xxx.xxx】【169.254.xxx.xxx】，预设为上一个图标设置，如不喜欢内置默认，可以再这里修改。
	LAN_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABLklEQVQ4jeXUO0vcURAF8F8pxDqdAdFCZLUQ/ARiZ6f4AjWua2dhq4IaNEWKgNjFSi3ED2AhmEKxUXw3PrBQQwQbI6SSiJhiR1nwv6uwlXhguJc5cw4zl3svhTGIM1ziV8RvXGD4BW1BfMFDnvhejPEo7hJM7/HtfRlPJpg+xlQxxhlsYEv2dpxjG5sYKMb4Az6hHEMYQSXKUPpakxI0II0efEYnmtGCH5hBW+Q6curSaIxGnuGj7LmNoxt96A9RGnOYj1xvrBl0YQzTMd0TqlGLJsyiHTWoQkXs6zCBr6iPXGXUpNAa2pbgUrCCfRzhCofYwWJMsIZd2Wd8gT2sR4cLUXsY2pMc3h/J1+kUP/EvgbvHKo7zaG/JfipJ5AGWcJPA/cVydJekvX57xv8BD7eoP535NRkAAAAASUVORK5CYII=",

	//默认UA图标，预设为上一个图标设置，如不喜欢内置默认，可以再这里修改。
	DEFAULT_UA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACKklEQVQ4jbWPT4gSURzHXzqDzr6ZgefD+fd0YJynjI62ghhqZApLdCnwkpAn87CXvO4SHTqKhw4JIl5aloiCIBChBTstHj10CXYpIRbSdXGLWDoG0ynZFSNY6Ae/y+/zPl++D4D/OBAAsHZZmfA8/7Lb7bKXskVRfCVJ0kQUxTbLsrssyz53uVxbAAD7n7IgCHcJIXPLsj7puj4lhEw0TZv6/f5TnuePGIZ5vFJkGOYGQui6JEm7lNJJPB4/jEaji7Us6yAUCn3GGJ95vd4ny74LQrgXDoergUBgn1I6Nk1zbJrmhFI6MQxjaprmOBKJ/AmZQAivLmxN03SE0FE2m70dCoXeKoryw7btj9Vq9VG9Xt8sl8sN27ZHuq6PDcM4VFX1FCG0tQgwDGMdY/w1nU7ngsHgu42NjdedTufa+Yq5XG5bVdUTXdcPFUU5lmW5tYCFQoH6fL4TVVU3W63WuuM4zPIfIYQNjPE3VVUP/H7/jBDydAF3dna8iqKMeJ7fd7vd95ZlSmkgkUi8CYfDQ4TQGCE0tyzr4YVHmUxmm+O4nyzLfgcA3D/P2u02P5/PBULIC0EQjjHGXyqVSuJCwHA4RJFI5D1CaFwoFBqWZeGlIh6O40Yej+csmUy2l1sCAADo9/t6Pp/fLZVKNx3HubKEH7jd7l+xWGyv1+vJKwMAAMBxHK7ZbGrnTi4I4S1Zlj8Ui8Vns9lM+qu8alKp1FqtVrszGAySq/hvbPGRIDMl+58AAAAASUVORK5CYII=",

	//未知UA图标，预设为上一个图标设置，如不喜欢内置默认，可以再这里修改。
	Unknown_UAImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADM0lEQVQ4jW2T20tqeRzFf52nmIHzr5zmwjxLQzF2rLGHItCCqJAaa2Bnuywv263i/RKm0taEasc4D0USjGQQDELQUw8xWBuCEKGLWgfdiiLzW/MyRKdzPvB9+64Fi/X9EvIGjUbz3mKxfMzn83/e3NxIZ2dnBZ1OJ4yPj/f29/d/+3b/Ne84juu9urq6qFarnXq9jpOTE1QqFQQCAUQikVY+n8/Pz8//RAjp+kJsMBim7u/v5UajQTOZDC0UCojH4zSXy1Gn0wmbzUZ3d3fp+fl51WAw/PqZiU6n+/n6+lrudDpot9u0Wq3ScrmMbDZLfT4fdblc4Hme2mw2enFxgdPT00elUvkdIYQQpVL5XhTFi3a7jVarhWaziWKxiMPDQ2xubiIUCsHtdsNut8NqteLg4ADxeBxLS0tZhULRTbRa7cfj4+OOLMuo1+uQJAnpdBqiKCKRSGB9fR0ejwcOhwNWqxV2ux0PDw+4u7uTp6enfyALCwt/5HI5mk6nsb+/D1EUqSiKdHt7G4Ig0HA4TL1eLxwOBzWbzdTv96PRaKDZbFK73f47YVlWSqVS2NnZwdbWFgRBQCKRgCAI2NjYQDAYfIlgsVgQCoUgyzJqtRpisViMLC4u/uNwOJDJZBCJRBCNRhGNRhEOhxEIBOB2u/F/CzCZTPB4PKhUKigWi/D5fDEyNTUlcBxHnU4nXC4X9vb2aDKZpH6/Hy6XizqdTsrzPEwmE11ZWaGrq6uIRCKwWq3/jo2NLZCRkZFeo9HY4jgOwWAQ9Xod7XYbkiQhmUyC53lYLBasra3BaDS+DMMwn9RqdQ8ZHBz8Zm5u7m+z2YxkMonXdT49PSGVSsHtdn9hMDk5eaBQKLoJIYQMDAz8yDBM2Ww2o1AoUFmWaa1Ww/PzMy2Xy/T29hY8z1OWZanRaIRery+qVKoPr0+5a3h4WMUwzAPHcVSSJFqtVvH4+EhLpRLNZrNgWZayLEv1en1xaGjoF0LIu7f/0NXX19czMzPz19HRUb1UKtHLy0t4vV4sLy9ThmE+TUxMHKjV6p6viV9QKBTdWq32+9nZ2d+0Wq1Xo9F4R0dHZ1Qq1YeXzK/4Dz2YO52piHOZAAAAAElFTkSuQmCC",
};
/******************************************************************************************
 *这里是图标弹出TIP文字的自定义设置,可用于本地化，他国语言等
 *******************************************************************************************/
var TipShow = { //图标显示顺序不会因这里而改变顺序
	tipArrHost: "网站域名：", //域名文字：显示为 【网站域名：xxxx.xxx.xxx】
	tipArrIP: "网站IP：", //IP文字：显示为 【网站IP：xxxx.xxx.xxx】
	tipArrSepC: "--------------------------------", //分割线，留空表示不使用分割线
	/*这里会显示 自定义查询信息*/
	tipArrSepEnd: "--------------------------------", //分割线，留空表示不使用分割线
	tipArrThanks: "Thx&From：", //信息来源文字：自动使用查询API的主域名，显示为 【Thx&From：xxxx.xxx ,xxxx.xxx ,xxxx.xxx】
};
/******************************************************************************************
这里是菜单配置:
配置与addmenu一样，但仅支持本脚本菜单位置，具体请参照；https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus
本脚本参数增加:
%IP%：当域名IP地址
%BASEDOMAIN%：当前域名的主域名；
{}：为分隔条
=======================
目录枚举添加请注意：
1、斜杠"/"或"\"开头为相对配置文件夹，注意：Linux路径区分大小写！！！！
2、根据文件名全名字符(包括扩展名)排除或筛选;
3、关系为：先排除再枚举。
4、注意：配对模式为 test循环模式正则！！！注意正则全局"g"的使用！！test()继承正则表达式的lastIndex属性，表达式在匹配全局标志g的时候须注意。
5、留空表示不进行该行为。
6、在文件夹上左键点击为打开文件夹
示例：
{
	label: "菜单显示名称",
	image: "图标",

	//枚举文件夹内的所有文件。注意：Linux路径区分大小写！！！！
	MapFolder: '/chrome/tools',

	//排除的文件，需要注意:此处不使用"g"全局模式，可以匹配所有文件,
	Exclude: /\.(dat|reg|sample|config|db|log|dll|json|zip|rar|ini)$|7za\.exe/i,

	//枚举的文件
	Filter: /\.(exe|lnk|bat)$/i,

	//是否枚举子目录内的文件，值代表子目录深度，多少级的子目录，0为根目录（即不枚举子目录）
	Directories: 1,

	//排除目录,仅当Dirs>1时生效。
	ExcludeDirs: /tmp|temp/i,

	//枚举目录,仅当Dirs>1时生效。留空表示不筛选
	FilterDirs: "",
},
*******************************************************************************************/
var Menus = [ //菜单设置
  /*{
	label: '常用软件',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
	child: [{
		label: '科学上网',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "XX-Net",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\Software\\XX-Net\\start.vbs",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA6lBMVEUAAAA1cqYVLUD91EUaNkz93kP73UNWRxUKCgj95Ev90EEmY5zNpzErXohVWjwbOlRrXR0PIjH910knZaHlxTi9njInUXYcPFeBaB58Zh9fUB4ULUENHCkcGxIMDQswbKH6zj335Un22T41cqX0yT40bZ0jX5vrwToyapg0cKQqYpbfvzjcszIvaJYsY5C6kyoHOHCqhSWmoCgkT3I3R0dkYTZVVTdLVT0wPkBcWTFPSR9DNg83dqv/1kQ2bp02caP+zT07gLo8frY6fLM3daf/4kb/2z7/00H/7U7/30I8hMAlZqX/8k//2kzyvmU/AAAAPHRSTlMA/mX+c/78VhD+/vjOy4h9a0f++ua+uoOCe2ZbPikX/vv49/b18e7s5+Pi4N3Vzrurq6emiIaBf3p4YEMW0u7PAAAAyklEQVQY0z3IRbICQRRE0VfSrrjz3d2F0jZ8/9uhgqC5o8wD+9wRTWgDjk2en7TO8mhaA43cCyZljmto3EW3V1IwfLgjnPSSbiEQTVMX4GOlc8YKKcTJ5/kmhLFmBULSfIF+26QEqgvEWKsVBMHrv+1b0MsQu8c/cRx/pw9EWUAN4Pcz27arkisD4xxd/y22Tc7nvlKqAuhm6y+vSbgRXlVvAIDx0CNWZ9AfDJ0Z7HM8Qi5vwrYDcIAF9+en05d+DW6nLJfLx3Bi9g5UHhv7T8gXQwAAAABJRU5ErkJggg=="
		},{}, {
			label: "Lantern",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\Software\\Lantern.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzN+8gE8AAAAFXRSTlMA8KHqbC0y+NJaPCYdG87Lvnl4YE7SNMOjAAAAXklEQVQY02VP2Q6AMAhjgDuc8+b/f9UgiTFpX4BytUR7SR/KTESb/eDEdTaOituxkGPUIOqgF1My0d5VLE1e3+xJNNgji2mMqonfWM1yENkzIGAFjsJbEAbSwRzYfwBsmwhPnE7G/wAAAABJRU5ErkJggg=="
		}, {}, {
			label: "Shadowsocks",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\Software\\shadowsocks.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAABdpNIegMEnhcOOv+AuicV4s9kfgcEcf8AegMAfgcEjg8IkhMImhcMxi8Yqh8RGl8xKmc1Om84ggcEhgcEigsEcf8AvisUjgsIkg8Irh8QvicUkg8IvicUohcMrh8QwisVBk8o1jcc1jcdAk8oZfb/aQAvrAAAAJXRSTlMADOt4A3gG/Pjv5825oH1tKCMW69bAv76zqpeQi4VyZF9IQzgwxtA2EAAAAHNJREFUGNNdjkcShDAMBGXsNWHJmwOZ+f8XkaEoI/owpR5dhk4YqSr/CdUBOqlAedQoRLLrhb/BC/h4xT3nKFa9gUmHiHMmqq9wfKuEMzZuypjFKNTav2nDltTAof0KW7WPEJMv0sxQ3VtfPDVJ/oYkaj8WEeIJh0wQlbIAAAAASUVORK5CYII="
		},]
	}, {
		label: '影音娱乐',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "Foobar2000",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\FirefoxfanProfile\\chrome\\local\\Soft\\文件夹\\文件.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAh1BMVEUAAAA5NzY4NjU5NzY6ODc5NzZ2dHRxcG85NzY4NjU5NzYzMTA5NzY4NjU3NTQ5NzY4NjU/PTw7OTg3NTQwLi1tbGs5NzY5NzY8OjlYVlVUU1I5NzY5NzY4NjU4NjU+PDvk5OS4uLje3t6Ih4dpZ2dfXV1cW1pTUVDa2tqsrKuYl5eOjY16eXi7nX0WAAAAHnRSTlMACPFWSw3+/b6CPxn669ayj3ltZBT79unIxrxeNSDdy1iXAAAAhklEQVQY00WNBw6DMAxFA1mEAC3QPeyE2XX/81VEAT/Jsv2kr88CSRKGuAvGOKdfZrtkmU3kado2p/KxiT1AUQCY9X9WEKhsFFxpBEClRRS1d1/Aj3s3UbSq66bBvY5rsb38/Dh4nR1YRKQ4z1jmjHqx79Ewwl6n8RYCFDqHAGHqsAgp4/EHimwIg1VV1u4AAAAASUVORK5CYII=",
		}, {},{
			label: "PotPlayer",
			exec:"C:\\Program Files (x86)\\PotPlayer\\PotPlayerMini.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmYDp0AAAAGHRSTlMASG/ux44qEwv28uLh1tGuoHpkTz8xGwaETBQgAAAATklEQVQY02XPRxKAUAwCUPzd3pX7n9QtDlm+mSQAlJgbdDpyPP+wkOujEEriEBSAIzLdCqgbmZsAcM2cOgW8e89qYCt21N5aMIvu5az+B/qABY0sWejhAAAAAElFTkSuQmCC",
		},]
	}, {
		label: '系统工具',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
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
			label:"ScreenGif",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\ScreenGif.exe",
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
    exec:"D:\\Program Files\\Beyond Compare\\Beyond Compare 4.lnk",
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
		},
		{
     		label: "遥测数据",
    		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:telemetry')",
    		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADSSURBVDiNxZA9asNAEEbfDAYVOoZJmy6kMhgfwjqBkFSkymEkNwLjM7i2O9tHSOHahcuQIghmUkRykR/QSoU/2GJY9u37RtydMZn8d5Gm6UJVlwAisq6q6hAEUNVHIAMwsyPwJ0BDdIMMfibLslfgCaBpmpe6rq9BBu4+AxIgiaIo/mWQ5/mDu2/acQu89wHfDMwsBp7bM+1rNnqJ9wfclqiqH+5+aseziFy6WUSuwBtwAjCzz+6duDtFUcyH/F6W5X7SEnfDCiBdhdVAwHeFMfkCfLhCrrHVotkAAAAASUVORK5CYII="
    	},
        {
		    label:"代码速记",
			oncommand: "Scratchpad.openScratchpad();",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFmSURBVDiNldMxSNVRFAbw33u8si1sEkMEoQijFhOcCkkI14Zoyxo6YwbN4mLQ0uDUAaHIRXDIzSWCfEOz1hINIRRkDQVRENF7De/+5WFF7124w73nfOee7/vOrbXbbf2siDiEy7iB2Xqf4OPYxhoGM7PV6AM8imcYK1c70FOBAm5ipOt6G/5LISLqeFzAX7pCOz0VwDzO4w2+91UgIk5hqQC3MIwWHmTm5146mMcRLOhYV2He6zr86/UBXNHhfwKDJfQTK1XeHy5ExGEM4Ry+4hGelvBHLGTmhyq/Vk1iREzjJo4V3texjkVMoo27uI9vmfljn0JE3MYc7mTmJR3P97BbumjiVtHiAjbKSGsUn69iKjOrj3Ea94rSFw+wfBIRZzGDzXpmtnQGZLgr6W1l0180qmECr/Y1iIhxLOM5XuA13lUdRcRRnMQ4rmE1Mx8eFLFR+J0pewwD+IVPeFl2MzP3qo5+A3fNeAnsfDlKAAAAAElFTkSuQmCC"
		},
	]
},
  {
		label: '切换配置',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{	
    label: "火狐原版",
    text: "-no-remote -profile ..\\Profiles\\Lite",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{	
    label: "阳光盒子Vivaldi版",
    text: "-no-remote -profile ..\\Profiles\\Vivaldi",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{	
    label: "其他配置",
    text: "-no-remote -profile ..\\Profiles\\Other",
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
				onclick: function(){
			FileUtils.getFile('UChrm',['Local','update-SWF.bat']).launch();
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAABPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLAmlKKQAAAAE3RSTlMABU38+qtbuI0ktQLvp6E8MTAQAhYxjQAAAF5JREFUGNN1jkkSgCAMBAmKEsGV///VkEFSHOQydFc29/MoRhp4LSXQwPOkxtgvaoydgzGGSZJemVnNKeKJWl+tx25Uo884YJIx0dZM39fNBYZhyTsf34V75poJ2L4vvEcDofwIDtwAAAAASUVORK5CYII="
	},{
    label: "用代理更新去视频广告播放器",
    id:"updateswf",
		onclick: function(){
		FileUtils.getFile('UChrm',['Local','update-GAE-SWF.bat']).launch();
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAABPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLBPaLAmlKKQAAAAE3RSTlMABU38+qtbuI0ktQLvp6E8MTAQAhYxjQAAAF5JREFUGNN1jkkSgCAMBAmKEsGV///VkEFSHOQydFc29/MoRhp4LSXQwPOkxtgvaoydgzGGSZJemVnNKeKJWl+tx25Uo884YJIx0dZM39fNBYZhyTsf34V75poJ2L4vvEcDofwIDtwAAAAASUVORK5CYII="
	},{
    label:"更新去视频广告脚本",
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
     image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD/gADrTzjrTzjiSTrqTzjqTjjqTjbsTzvrTjjrTjfrTjjsTzjrTzfrTjjrTzjrTjjsTjfsTjfsTjfrTzjrTzjrUDjsTzjsTzjsUDjrTjjsUDfrTznrTjbqUDrtTzfrTjvrTzgL7w0kAAAAIXRSTlMAAvroCG48IhHbw6SfjH14c2lOQfbwyqyRg2VcWkswKhpMHbaOAAAAeElEQVQY03WOhw6DMAwF4yRQRimre9///2SLCYghbMmWT5bemY2SeAESDnPQwkOmYA/OR8P19TFAfWwDiJoU7L+zADIHPC3QZ70Bd5IaKBQUQHMz3kGuIIdUEmOuBJkSNLDCfnrLM7tu3ylDir+8VK4aXUU/dKzrBxgiCAZdSUEoAAAAAElFTkSuQmCC",
		  exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\lib\\ShowIP.exe"
		},   
	    {},
	    {
		label:"查看阳光盒子Firefox更新信息",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://sunbox.cc/firefox-sunbox-plus.html')",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD/gADrTzjrTzjiSTrqTzjqTjjqTjbsTzvrTjjrTjfrTjjsTzjrTzfrTjjrTzjrTjjsTjfsTjfsTjfrTzjrTzjrUDjsTzjsTzjsUDjrTjjsUDfrTznrTjbqUDrtTzfrTjvrTzgL7w0kAAAAIXRSTlMAAvroCG48IhHbw6SfjH14c2lOQfbwyqyRg2VcWkswKhpMHbaOAAAAeElEQVQY03WOhw6DMAwF4yRQRimre9///2SLCYghbMmWT5bemY2SeAESDnPQwkOmYA/OR8P19TFAfWwDiJoU7L+zADIHPC3QZ70Bd5IaKBQUQHMz3kGuIIdUEmOuBJkSNLDCfnrLM7tu3ylDir+8VK4aXUU/dKzrBxgiCAZdSUEoAAAAAElFTkSuQmCC",
	} ,  
		]
	   },
	   {
		label: "快捷火狐",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADFSURBVDhPpZM5DsIwEEXT0JESLuLKlpfDkw7K1CQcgDPA/1FMJjaKHcXSSNYsbza7aXCcczfv/ack8Ltbay+MWZ1SYGLvM0h0yMhCobW+wq+ffdeQGgBZzCwgjx8/BRhjWqXUibOh8E6dgEzz+gsIIZxhfCNwEL0/qaONQVnFUjFnHtPBAjjSVgTIlSKjpUQYbbsBCHaimq4IONxCHCKyvkRm3uuGyBLlGhHYyTUWW9h6jdG2ucZDgJ2fanmJtd85STCt9AvwzgF23t8L3wAAAABJRU5ErkJggg==",
		child: [{
			label: "隐私浏览",
		oncommand: "OpenBrowserWindow({private: true});",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFASURBVDhPzZK9SgNBFIUnXRARrG1tAimEha32R7ZSFLQSsdLUVrGJrxDIA6RKLz6CRRofwDqIRIyWWpjKEP1OuCObIRgrMXAy9+ecs/fOrnP/9pem6Tl4Ai9ZljUZtPKrYRHsgStEnwGukyTZ/9EEwjGiqRdqCuJGyWgqzpxJnuc7EB4hv5aIN8QXcRyvCYqBarOp4L5xPoNdx9+w1JBJW4JwVDNpBw8aysDvWiuKYmPZRYmDpuZ1DseJElapgm3dPPkd8ZY3U6waGHEHpHnVVpnIYGAGdRqbIlmz6w3gdO2JI3FA3TgDrdCzpGOCShRFK+EqVpt9Cxh2zLDnNB6FD1ulyYjr1FbJTyHdcz6Qn6mmni5TXGm+1yS5LF1m+AEtzNG05qakcIBJn/OdcwxuwQk4snhsvT6THC57W3/X/wLLLb31fHxHcQAAAABJRU5ErkJggg=="
	},{
		label: "设置选项",
		oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:preferences')",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADfSURBVDhPnVNbDoIwEOQAavxXr9GPJtCEI3gONFxLrqHoFcCrQKIzZqukD0Il2Wzpzs52d9osm/nyPL/S5jCzsaIoXrRFBKh0Abgty3IHf8b/wxJwDask1hLrkdoE+MEmuh6xkXvEhggONhn+CeBRKbWhcS17TB6MMfsQQS0VewC2LoB7iHdygjraAqvFhsaY1wJlmvbKI8cItNbrKfYjcQoB2lg5g719i01kS2vBMoD9JOzdgiFWXpuUxpWRPUvfHF4vAxxjMt4t4N+L1CRc5WbR+0h6TCFGkfgnVQD0Bjart3NZbbvtAAAAAElFTkSuQmCC" 
	},
	{
		label: "书签管理",
		oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVDhP7VLbDcIwDOwXYpYswE8e69E/mAmxABJskQmo1N5FceW2ScNXv4h0khX7zhfHXYdjjDk55+7e+wiMDUTWkkNuOri4/UBcCINznQWkcwjBzpeVgDW5WdQCSb1Flry4/QuomW2G0pjmMUO01l6wLC+CsTa16wCLcuaWAV8pZAz0zFGoKsBOSL5ZAMJAUkYSQ/zJNcvFU50GXSi218JVB2ur+t2lp+lVfpaGVfpNNdwH8xOCpsBrchFApgAAAABJRU5ErkJggg=="
	},
	{
        label: "保存网页",
        oncommand: "saveDocument(window.content.document);",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVR42mNwcnLyBOJnQPyfRAzS48mApvkdERqR1TxjQOIYMgABugYGKEDmA2l9OB+XQnwGoPBpbgBBA7FIHMFjwBGCBhALaGcAkG0NxL44sDUxBvjiw7R3AdlhAMRWJGi2RDaAnJwIw89BBniBGGRofgLSCwDDQxufnOjqdgAAAABJRU5ErkJggg=="
    },
	{
		label: "附加组件",
		oncommand: "BrowserOpenAddonsMgr();",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEmSURBVDhPY2DAAezs7BxtbW2vAemfQHqtjY2NIC61GOL29vY8QI0fgfg/Ep5PtAFA2+yhGs8CbbcCsYH0HZwGAG1ksba21gZqNAZhoIY6qAHrQa4Bav4DxF+ActYgeZBakB6wgUAJI6Die2jOBTsdqCgWpAbI3oFF/h5IL0jyLNSJD4D0GSg+AtScCnMyKACBiqfC5IFskFqQJWdBLvgCNUCR2EDS0tJigxrwF5vz3gEll1hYWAjhMxDmJQYrKyspIGcn0CW/0fy5gSgD0BUB/asESjxA/NfV1ZUbT0IDBzRYHi0aA6DR9gMozkHQAFzRCBSfRpQX0KMRqPEYEFfAEwruvALxAjnRCDRcAhr1v3GlMuRMhJMNtHw3vmjEpxEU5TtBSQAAJUTiREfmhAgAAAAASUVORK5CYII=" 
	},
	{
        label: "定制界面",
        oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:customizing');",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABwSURBVDhPY3BycvIE4mdA/J9EDNLjyUCmZphlz0AG4LXZxcXFBqQGmYaxQeIEDSBkAfUMcHBwsGYgEmD1ApF64cpgXoN7YdQAYIIgEVA/EElJByC1yC4gJyfC8s9zBkdHRy+gac8JpXl0eaC+JyC9AJHGA1IHcnoMAAAAAElFTkSuQmCC"
    },
	]
},*/
	{
		label: "打开方式",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		//枚举文件夹内的所有文件，当做可执行文件加入菜单，斜杠"/"或"\"开头为相对配置文件夹，注意：Linux路径区分大小写！！！！
		MapFolder: '/chrome/tools', //注意：Linux路径区分大小写！！！！
		Filter: /\.(exe|lnk|bat|xls|xlsx|txt|doc|docx|jpg|wps)$/i, //枚举文件
		Exclude: /\.(dat|reg|sample|config|db|log|dll|json|zip|rar|ini|js)$|7za\.exe|wget\.exe|pac\.txt/i, //排除文件
		Directories: 2, //是否枚举子目录内的文件，值代表子目录深度，多少级的子目录，0为根目录（即不枚举子目录）
		FilterDirs: "", //枚举目录
		ExcludeDirs: /tmp|temp|ConFile|msdll|扩展|data|help|nTrun|skins/i, //排除目录
		child: [ //子菜单
			{
				label: "IE打开",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSklEQVQ4jZXTv2sUQRwF8E88UYlg5WEhiqWIhREbIWVqOwkRUh6oqU/E/0KREBBUsJBwVmn9gXokXFJJCiN4pWKnp4lYnJ4W+x0Yhj1yLjwWZua977z3dpnsaaKF1xjgFzZweRzhEM5hAbfRDdIL3Ij1+1itI5/HQ3zBH/wNjPAO13E0hrRL8hw+ZKQ6DPEobF0qJ7/fh5zjLk4l8kE8KA58w+PwfAtv8Tvb/475JHAWn7LNPdzEMRzGEZxBpxiylgSuFuo/0cN6hi52Isx0bjcJtP/DewlNvCkW+3HdZwU6NdAKz3nnmzgZtzsQmMLxSD7hBLzCS2xnAiM8VVU7HWFeiSz6+BjvO/AVS5H6sLDyWVXfFn7U2JwRiV+LSU8mDG6AxdRAD/fQiECXo55x5H6QG0lgNhJu4yJOq/6255nQSPWhreBCBAr+AcklnGDMJaPHAAAAAElFTkSuQmCC",
				exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
			}, {},{
    label: "EDGE打开",
    condition: "nolink noimage noselect",
    url:"microsoft-edge:%u",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaPxwLAAAAD3RSTlMA8NBAwKBgIBDgcDCQgLAPTvPDAAAAdElEQVQI12Ng4Lj0/2M4AxDs/A8ECxgYuOVBjF8MDEz/fYwT//8vYMhXPsLA/f9/AMPT1m8MDPr/BRgc8icwMPj//8DQMB+kGMhg/w9lMCMY3xkg4P+nBgYGAyAj/r/MsksfgIxCiBKQZVAGQ+/8/18WMAAAOiZHRwI/gfMAAAAASUVORK5CYII="
      }, {},{
				label: "Chrome打开",
				text: "%u",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABZUlEQVQ4jX3SPUiWYRQG4AstJ4ewwiV3EQJrCXIJBIPIBBcpEBxcWvsBSQeDoNDBEKNNFGkQaW2sraYCB4WQSrAQ/b7SwZ/ox6/hPS+8Pr524F7Oc+77nPs8h8NxEl2Ywyp+Yh+fMYNOnHBMNGMCVdSOwSbGcCYlN+Hlf4gp5nE2JzegFe9LCn9hO/AD3wNVDKEOrmIKt8NzDRsYx3VcxAVcwy3cDPTkU8xhFwN4hQq6gzSMB2jDJXzAWuArJuFLdH2DfoygHR8LVpZwPpZctLhC9k01/MYdNGK0ZB/3cSPq8twO7BUSy2iJKVKBuyUCW/CpkDjAkxh3qZBfjD2kFpZhOklW0Bsi96JzKzpkh1SsfQZXSh4qeBpCXTjn6KGt4zLZ/T+O8VPff7GAwWRXf/AQ9SJO40WJSBV9eJuIzuKUJJrwKEbLiydlx5QLf4vOR8h51MeynuO17JTfyX5kKjzXFQn/APgEoX8xUiqtAAAAAElFTkSuQmCC", 
				exec: "D:\\Program Files\\Chrome\\MyChrome.exe",
			}, {},{
				label: "Opera打开",
				text: "%u",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU4H24AAAAG3RSTlMAcvfmJbSKx4F17+rPua6sm2pTUks1LR0IeB5Zc61XAAAAaklEQVQY02WPSQKEIAwEAwFEZ5zVvf7/T0G8pU5JZ+tIJeSoGvMhN85D10/OzS2PQJItFfl11QFXgz/wLfMenq31Az5IBn5NWID+2rBK4wFvURjkpgM1ghkxS81ZY8xat88Vwj4OOqZQ4xM4iAnjPi0KHgAAAABJRU5ErkJggg==", 
				exec: "‪D:\\Program Files\\Opera\\OperaPortable.exe",
			}, {},{
				label: "Vivaldi打开",
				text: "%u",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEU5OTn////09PTq6urV1dWqqqr6+vr4+PiysrKkpKRqampbW1tQUFBLS0tGRkZDQ0Pu7u7f39/Ly8u+vr6vr6+cnJybm5uOjo6NjY1iYmI8PDwaLcu+AAAAWElEQVQY053MNw7AIBBE0R2CyeCc7n9Qg4QwNa/50hRDY3buShyXdWBYS27MddCAzbHQdfATRM4zeaokcNG7yfYaFLBwFagxyAz9IgNYpM4JHNRLQiQa9QEY7QH2PVGGMAAAAABJRU5ErkJggg==", 
				exec: "‪‪D:\\Program Files\\Vivaldi\\Vivaldi.exe",
			}, {},{
				label: "360Chrome打开",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAolBMVEUAAACAgICzs7OCgoKurq42NjZYWFh0dHRsbGydnZ2RkZGWlpawsLDa2trGxsZYWFhEREQoKChQUFBmZmYyMjJaWlpERESFhYVra2tSUlI6Ojpubm5eXl6AgIA+Pj6dnZ16enqwsLDR0dEBAQEMDAw7OzsqKioWFhYhISEbGxs5OTkwMDBHR0c1NTVgYGD///9RUVFMTExCQkLd3d3MzMxxcXHJc2n6AAAAI3RSTlMAiTh1VcSWlI5kXVcuGhL17Ozn5N/a2tjLv7iwoZaHd19FLMqH410AAAC0SURBVBjTRY/XrsMgEAXXTq/3pve6DbBx+v//WtaOoswTMzoCARX9FHqtLnwZbqTWUefuvY+fc5HFKGMWf6jCWG6x8DEGdlQ3r0meh0Ili3HZHVpoW+CCSJw09qmF9Mr5nflGWNKB9t8kcsgelyuqelxD02Xm7nl5Ialqw+5ktkKOxNtiCynbIniHRJ482rs7DcHUUMYVGDObfkoyH0DJMfkvHbH//d1giiUJ/Ki3msmpOr0BiA0Y8YBo5EEAAAAASUVORK5CYII=",
				exec:"D:\\Program Files\\360Chrome\\360chrome.exe",
			}, 
		]
	}, {},{
		//菜单名称
		label: "地址IP",
		//枚举文件夹内的所有文件，当做可执行文件加入菜单，斜杠"/"或"\"开头为相对配置文件夹，注意：Linux路径区分大小写！！！！
		MapFolder: false, //注意：Linux路径区分大小写！！！！
		Filter: /\.(exe|lnk|bat)$/i, //枚举文件
		Exclude: /\.(dat|reg|sample|config|db|log|dll|json|zip|rar|ini)$|7za\.exe|wget\.exe/i, //排除文件
		Directories: 0, //是否枚举子目录内的文件，值代表子目录深度，多少级的子目录，0为根目录（即不枚举子目录）
		FilterDirs: "", //枚举目录
		ExcludeDirs: /tmp|temp|msdll/i, //排除目录
		//图标
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAt0lEQVQ4jcXTsWoCQRSF4Q8SsNEitUnhM6RQUtjb+xixTRHIG+SFks7GVxBksbBPGVjWQpsjSNhdXUjIhb+4c5l/mMMMv1g93IfeWf8Qhhi0CcYowmMosAtbfGCO2zrBFGV4CiUOP/iK5GrBHu94wTqSz7rrNAnKzOAtgm0yuUpQ4RkzLCNY4a5LBlU4ZG3RJYOT4BsbvKLfRVDlxAlGuKnb3CY4D7G1/l/Q9JSLzC5W02c69X9TR6H4UVapsaP+AAAAAElFTkSuQmCC",
		child: [ //child:[  ]内为当前菜单的下级菜单配置,不限制目录级数；
			{
				MapFolder: false, //此项将转为menu类型，注意：Linux路径区分大小写！！！！
				Filter: /\.(exe|lnk|bat)$/i, //枚举文件
				Exclude: /\.(dat|reg|sample|config|db|log|dll|json|zip|rar|ini)$|7za\.exe|wget\.exe/i, //排除文件
				Directories: 0, //是否枚举子目录内的文件，值代表子目录深度，多少级的子目录，0为根目录（即不枚举子目录）
				FilterDirs: "", //枚举目录
				ExcludeDirs: /tmp|temp|msdll/i, //排除目录
				label: "PingIP(aizhan)",
				tooltiptext: 'http://ping.aizhan.com/', //提示文字
				oncommand: "FeiRuoNet_Menu.OpenAction(this.tooltipText, 'site','%HOST%', null,'btn02')", //执行命令
				image: "http://www.aizhan.com/favicon.ico", //图标
			}, {
				label: "PingIP(17ce)",
				tooltiptext: 'http://www.17ce.com/site/ping',
				oncommand: "FeiRuoNet_Menu.OpenAction(this.tooltipText, 'url','%HOST%', 'su')",
				image: "http://www.17ce.com/smedia/images/favicon.ico"
			}, {
				label: "PingIP(chinaz)",
				tooltiptext: 'http://ping.chinaz.com/',
				image: "http://seo.chinaz.com/Chinaz.ico",
				Post: "host=%HOST%&checktype=0&alllinetype=全选&linetype=电信&linetype=多线&linetype=联通&linetype=移动&linetype=海外",
				url: 'http://ping.chinaz.com/',
			}, {}, {
				label: "旁站(aizhan)",
				url: 'http://dns.aizhan.com/?q=%IP%',
				image: "http://www.aizhan.com/favicon.ico"
			}, {
				label: "旁站(114best)",
				url: 'http://www.114best.com/ip/114.aspx?w=%IP%',
				image: "http://www.114best.com/favicon.ico"
			}, {
				label: "旁站(Bing)",
				url: 'http://cn.bing.com/search?q=ip:%IP%',
				image: "http://cn.bing.com/s/a/bing_p.ico"
			}

		]
	}, {
		label: "域名DNS",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiElEQVQ4jXXTzUtVURQF8J+F9ugPKBTFbBAUNCl4GmE5LJI+Jn1IUP9Ck3DarEEIJVj2SKwg6AO0aNAgfZHRP1CaFVEPykGDnNekwd4XrpfngsvhHM7ae5291mUjunAMT9DCen4tPMMJbLMJdmISn/EQl3AEw7iIGaxiCt3tyPNYSsLWPO9Ff64HMIomXqKnIHdm5yUMVApfxzd8SGULGMv1dvGc4/iUcqu4id84j30pv5lKVnASHuNBSXYZk3iEjtzvzWZ13MUc/MDlNmS4hffYkfvT2XkgVf2EPxjJCzWcwg1cEXb+wxvM4guu5d3DwmLrOJqH4/iast/ir3Dnaqo5i+3VAi3hcx8+pjQp+x3ubPK8C8UTnuIeDooB7S9duo/pNuQtaOA5Ec8VYc2CsGqPGNha7qsYzGZniPxPYVGEpCkiu4zvmKiQe/E6FdSKw24Rz8VUVBdW7caukux6qnyVhTagR8RzVYTkHA5hSAy2IeLcaEcuUBPxnBcTLn7nX3iRc6mVCf8BM0VdfnCTBIgAAAAASUVORK5CYII=",
		child: [ //
			{
				label: "综合查询",
				url: 'http://seo.chinaz.com/?q=%HOST%',
				image: "http://seo.chinaz.com/Chinaz.ico"
			}, {
				label: "网站备案",
				url: 'http://icp.aizhan.com/%BASEDOMAIN%',
				image: "http://www.aizhan.com/favicon.ico"
			}, {}, {
				label: "Whois(Shosts)",
				url: 'https://www.sugarhosts.com/members/whois.php?domain=%BASEDOMAIN%',
				image: "http://www.sugarhosts.com/templates/sh_christmas2009/favicon.ico"
			}, {
				label: "Whois(cndns)",
				tooltiptext: 'http://who.cndns.com/',
				image: "http://www.cndns.com/favicon.ico",
				oncommand: function() {
					FeiRuoNet_Menu.OpenAction(this.tooltipText, 'textDomain', "%BASEDOMAIN%", 'linkWhois')
				}
			}, {
				label: "Whois(aizhan)",
				url: 'http://whois.aizhan.com/%HOST%/',
				image: "http://www.aizhan.com/favicon.ico"
			}, {
				label: "Whois(ChinaZ)",
				url: 'http://whois.chinaz.com/%BASEDOMAIN%',
				image: "http://whois.chinaz.com/Images/Chinaz.ico"
			}, {
				label: "Whois(Dtools)",
				url: 'http://whois.domaintools.com/%BASEDOMAIN%',
				image: "http://whois.domaintools.com/favicon.png"
			}, {
				label: "Whois(dnsw)",
				url: 'http://dnsw.info/%BASEDOMAIN%',
				image: "http://dnsw.info/favicon.ico"
			}, {
				label: "DNS健康",
				url: 'http://www.intodns.com/%BASEDOMAIN%',
				image: "http://www.intodns.com/static/images/favicon.ico"
			}, {
				label: "黑名单",
				url: 'http://rbls.org/%HOST%',
				image: "http://rbls.org/favicon.ico"
			}

		]
	}, {
		label: "网站安全",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVQ4jYWTMUtcURSEj4u2YmGZSh5rsdzzfU3+gq0QLISFhFhom3R2lkLSpA4Ee22sJIaYNkIC1kkpaiF2wUZhk+a95bk+NxemOjNzhsPciI5XSlkCdtUr9QrYLaUsdXEfPHUhM9eBU/VO/VvjDjjNzHV14ZEwM5eBDfUQ+NMSPkA9OwQ2MnO50ffU/YmNXeJRO5G6HxG9iIgecNwifs3Ml8CLBuoQeAuctHjHjcEMsNcMMvNVk6whZOazwWDwHHjdMtiLiJnmBjvAqI75Rv2i/mzhB/C5TjECRpm50z7imnpfD7fV6447XAPb9ZL7zFwbGwAD4KKONtWg5lwAg7FBVVXz6kF9g3fACfB9At/U97XZQVVV85MlGqq3wK/M/Kh+aAP4pP5Wb9XhozL1+/1F9WhaF2oc9fv9xc4qAyvq5RTxJbDy5F+IiFlgS73pEN8AWxExO80gImJO3QTOW6U5VzcjYu5/4nGSUsoqcAaclVJWn9r8D9Ly4rUXRHEbAAAAAElFTkSuQmCC",
		child: [ //
			{
				label: "安全扫描",
				tooltiptext: 'https://www.virustotal.com/#url',
				image: "https://www.virustotal.com/static/img/favicon.ico",
				oncommand: function() {
					FeiRuoNet_Menu.OpenAction(this.tooltipText, 'url', gBrowser.selectedBrowser.currentURI.spec, 'btn-scan-url')
				}
			}, {
				label: "WOT Scorecard",
				url: 'https://www.mywot.com/en/scorecard/%HOST%',
				image: "https://www.mywot.com/files/favicon.ico"
			}, {
				label: "安全评估",
				url: 'https://www.siteadvisor.com/sites/%HOST%',
				image: "https://www.siteadvisor.com/favicon.ico"
			}, {
				label: "钓鱼分析",
				url: 'http://toolbar.netcraft.com/site_report?url=%HOST%',
				image: "http://toolbar.netcraft.com/favicon.ico"
			}, {
				label: "安全查询",
				url: 'http://webscan.360.cn/index/checkwebsite?url=%HOST%',
				image: "http://www.360.cn/favicon.ico"
			}
		]
	}, {
		label: "站点搜索",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAABHklEQVQokZ3TPyjFURwF8I8/r5fyUhZRUoqJ/Q0Gg0lGZbJgsxmUiSR5+TOIkWJQBhkUFvUGGZVRBsmCPMJkUIZ7vbxfnidn/J57zj3f+/1efkYKAzhAAR94wylGUF9GRyTn8IBzrGAi1vJ4wjZafhLXYgavmEVTgs9gDPfYQUPSIItHLMY2ymE0XjKeJHK4QfsvYkKbeaHFIlI4wmGF27+wgPfvhTROsI/qPxhMC9MpogobuEBjBXENdnGbJAaFeQ9XMMgKk1hNEhns4Rp9ZcRdOItJO5Ox6tCGY9xhORp1owdTuMIler+LU8K2bQnL0Yz5eLgQ4xaEnjejYRFpTOIFa0r3vDUmGEI/OoRtLUEOz1hS4ZOUw7rwmv8SfwIjnjkY6akXagAAAABJRU5ErkJggg==",
		child: [ //
			{
				label: "维基域名",
				url: 'http://zh.wikipedia.org/wiki/Special:Search?search=%HOST%&go=Go&variant=zh-cn',
				image: "http://bits.wikimedia.org/favicon/wikipedia.ico"
			}, {}, {
				label: "类似网站",
				url: 'https://www.xmarks.com/site/%HOST%',
				image: "http://www.xmarks.com/favicon.ico"
			}, {
				label: "类似网站",
				url: 'http://www.similarsitesearch.com/cn/site/%HOST%',
				image: "http://www.similarsitesearch.com/favicon.ico"
			}, {
				label: "相似页面",
				url: 'http://www.google.com/search?q=related:%URL%'
			}, {
				label: "反向链接",
				url: 'http://www.google.com/search?q=link:%HOST%'
			}, {
				label: "反向链接2",
				url: 'http://www.google.co.jp/search?q=link:%BASEDOMAIN%+-site:%BASEDOMAIN%',
			}, {
				label: "内部链接",
				url: 'http://www.google.co.jp/search?q=link:%BASEDOMAIN%+site:%BASEDOMAIN%',
			}, {
				label: "Email搜索",
				url: 'http://www.google.co.jp/search?q="*@%BASEDOMAIN%"',
			}
		]
	}, {
		label: "开发审查",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGElEQVQ4jb3TOy/DURgG8F9dKjGowcRADUIwdHLpRCJG9RXEamBAY7H6AMQn0NnOQInbiJFJ7EYJYejbtP2njTB4kic5570973nPOfwD0ugPpn+bPIsSLoKlsLVEB/LYwh7uUMR4sIjbVkXasREB+zjEKlKJuG0coTNZII8bTMc+hba6dbXQJM5VZtKAnVBuhiWsheooHrBYdXZhJYy7YRvDQKwLeMUbFtCNTVxhDtZxGYF9yOERxyozeMEnDtBb11URJ0K5UOfIhe0L7/iIo/UkjjWBJ3jGSMI5hftQbpbcUCDZQRXT0WamiY/KdZ5Sm8EyhpENDmIomK1j9UFdY57aLZygjLMfWFZ50jPJljIJ1Vb806dqiW9kvzxuhp8KgQAAAABJRU5ErkJggg==",
		child: [ //
			{
				label: "BuiltWith",
				url: 'http://builtwith.com/%HOST%',
				image: "http://builtwith.com/favicon.ico"
			}, {
				label: "W3C Validator",
				url: 'http://validator.w3.org/check?uri=%HOST%',
				image: "http://www.w3.org/2008/site/images/favicon.ico"
			}, {
				label: "W3C CSS Validator",
				url: 'http://jigsaw.w3.org/css-validator/validator?uri=%HOST%',
				image: "http://jigsaw.w3.org/favicon.ico"
			}, {
				label: "Validate.nu",
				url: 'http://validator.w3.org/nu/?doc=%HOST%',
				image: "http://www.w3.org/2008/site/images/favicon.ico"
			}, {
				label: "WAVE a11y 检查",
				url: 'http://wave.webaim.org/report#/%HOST%',
				image: "http://wave.webaim.org/favicon.ico?v=1395952834"
			}, {
				label: "SSL 服务器测试",
				url: 'https://www.ssllabs.com/ssltest/analyze.html?d=%HOST%',
				image: "https://www.ssllabs.com/favicon.ico"
			}, {
				label: "SSL 检查器",
				url: 'https://www.sslshopper.com/ssl-checker.html#hostname=%HOST%',
				image: "https://www.sslshopper.com/favicon.ico"
			}, {
				label: "Header Check",
				url: 'https://quixapp.com/headers/?r=%HOST%',
				image: "https://quixapp.com/wp/wp-content/themes/quix-theme/images/favicon.png"
			}, {
				label: "URL 解析器",
				url: 'http://urlparser.com/?linkFrom=flagf1&url=%URL%',
				image: "http://urlparser.com/favicon.ico"
			}, {
				label: "编辑页面",
				url: 'http://www.printwhatyoulike.com/print?url=%URL%',
				image: "http://www.printwhatyoulike.com/editor/img/favicon.png"
			}
		]
	}, {
		label: "镜像快照",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSElEQVQ4jc3Tu0tcYRAF8N+GXVhWs+hGAiIi+Fh8gA+wyDZCEPf/MH0KNUXKZUmagNikSGETxEIb7S01uEUaQUQI2gRB7EQIQghrceeCXJSYLlN8MN89Z+6ZM/Pxv8Uz9GAIvcj/C3kYqzjGJX7gK2rI/Y08ie9o4wItnEW+h+4MvoaJNHmOnQCvo4oi+vAWcxnyaKjbDa46brCPF3E5J/EgjZd4jYrEo4Pg1GEl/t4I8Hv8xgYK0f9n/MGnwDSCsyyONprx8R1+RTv5KLCGW3wITDM4SzCPaxyG1BJmQ2oaFbxCOTCt4MxDB7ai4qZkImUMRjsLGROrOMF2cMEYvkWRKxzhp8fHOIORzJ1+fMRpyDvHF0x7wiJBV/S5KDH2jcSL0lPInZLNmpV4MI6pyAceUFBy753kJMtTiULp6AqRFzLkfKgtwh2F4z1a0Vqb4QAAAABJRU5ErkJggg==",
		child: [ //
			{
				label: "Google快照",
				url: 'https://webcache.googleusercontent.com/search?q=cache:%URL%',
				image: "https://webcache.googleusercontent.com/favicon.ico"
			}, {
				label: "Gigablast",
				url: 'http://www.gigablast.com/search?q=%HOST%',
				image: "http://www.gigablast.com/favicon.ico"
			}, {
				label: "WebArchive",
				url: 'http://web.archive.org/web/*/%HOST%',
				image: "http://archive.org/images/glogo.jpg"
			}, {
				label: "Google(限文字)",
				url: 'https://webcache.googleusercontent.com/search?strip=1&q=cache:%URL%',
				image: "https://webcache.googleusercontent.com/favicon.ico"
			}, {
				label: "Yahoo!快照",
				url: 'http://search.yahoo.com/search?p=%URL%',
				image: "http://search.yahoo.com/favicon.ico"
			}
		]
	}, {
		label: "便捷工具",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiUlEQVQ4ja2NQQqDQBAE6+v+RyUIQkAQcsjBix/wAX4jl1WGZrY3gTQU3TPbzMKf1AG9QCVfdPHAKAfHZF/rAPAw7t5uTXJ9SrLrMCcQ3HWsnoWmlkLMcXYOwBrc5VX6Tb0K2Rz3vBPim3MANvl5+9Jv7cYjWQeAQw4eJmsXgAE4BcR1N2SHftYHOcZOEltHUS4AAAAASUVORK5CYII=",
		child: [ //
			{
				label: "天涯脱水",
				url: 'http://www.tianyatool.com/cgi-bin/bbs.pl?url=%URL%',
				image: "http://www.tianyatool.com/favicon.ico"
			}, {
				label: "TinyUrl",
				url: 'http://tinyurl.com/create.php?url=%URL%',
				image: "http://tinyurl.com/siteresources/images/favicon.ico"
			}, {
				label: "Goo.gl",
				url: 'http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl=%URL%',
				image: "http://www.ruanyifeng.com/favicon.ico"
			}
		]
	}, {
		label: "Alexa排名",
		url: 'http://www.alexa.com/siteinfo/%HOST%',
		image: "http://www.alexa.com/favicon.ico"
	}, {
		label: "WolframAlpha",
		url: 'http://www.wolframalpha.com/input/?i=%HOST%',
		image: "http://www.wolframalpha.com/favicon.ico"
	}, {
		label: "BugMeNot",
		url: 'http://bugmenot.com/view/%HOST%',
		image: "http://bugmenot.com/favicon.ico"
	}, {
		label: "翻译此页",
		url: 'http://translate.google.cn/translate?u=%URL%',
		image: "http://translate.google.cn/favicon.ico"
	}, {
		label: "内嵌翻译",
		oncommand: function() {
			gBrowser.loadURI("javascript:(function(){var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs';%20document.body.insertBefore(s,%20document.body.firstChild);})()");
		},
		image: "http://labs.microsofttranslator.com/favicon.ico"
	}, {
		label: "存为PDF",
		url: 'http://www.web2pdfconvert.com/engine?curl=%URL%',
		image: "http://www.web2pdfconvert.com/favicon.ico"
	}, {
		label: "整页截图",
		oncommand: function() {
			var cont = FeiRuoNet.Content;
			var canvas = cont.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = cont.document.documentElement.scrollWidth;
			canvas.height = cont.document.documentElement.scrollHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(cont, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), cont.document.title + ".png", null, null, null, null, cont.document);
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jbWTUQrDIBBEH9QcokjZe+T+ieQaJXiKfvSjIyyJRmzpwHzsuo47qwJMgIlBvIpPMGAFEnAXUyOOLYEEbG7D1oirAsEV3sQoltivdwWO6Ap4C7UWIwMzqBUY8BTtGwvDAmWIBjyAGcjirJypJhwt+HvfdWoGXmJWbgeW0tHPAoHzvQ9Z6KE7xL8LRD5+FxoPqYfL7/wGEBc4QhYRpZIAAAAASUVORK5CYII="
	}
];