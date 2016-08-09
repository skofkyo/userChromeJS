//添加标签右键菜单项
tab([{
		label:"复制 Favicon 的 URL",
		text:"%FAVICON%",
		image:" "
	}, {
		label:"复制 Favicon 的 Base64",
		text:"%FAVICON_BASE64%",
		image:" "
	},{
		label: "关闭所有标签页",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
		accesskey: "Q"
	}
]);
	/*page({
		label:"启动Goagent",
		id:"Goagent",
		onclick: function(){
			FileUtils.getFile('UChrm',['Software', 'goagent', 'goagent.exe']).launch();
		},
		insertBefore: 'addMenu-rebuild',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAWrOMXrOQXq+MXq+IYq+MXq+MarOYXquMXq+MYq+Mgn98Xq+QVquMXreQXq+MXquMXrOQXrOMXq+MWqeIXq+MWq+QXrOUVrOUXrujjurMdAAAAGnRSTlMAkanIWD/RKHmIgAhwSDjguqCHZCLAXk0xFjseAw0AAABlSURBVBjThc1JDoAgDEBRWgqi4gQ43f+iQgE3mPgWbfIXrWgFVYQSYOsZDjXMeU9vAMO21VqrYriICB0xAyIbprznFA5E1DuyNQWgjnmI4/764rSUOlqWOExztIZzZKoGLwsr/j07PAPlXmXzxAAAAABJRU5ErkJggg=="
	});*/
/*
menu = ToolMenu({
    label: "切换配置",
    id:"ProfileSwitch",
    insertAfter: "downloadPlus_set",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAolBMVEUAAABSY3zcSTVwkMltjcNGRkhGR0jbSjfbSjdHR0lwkcpukctvj8fbSjfbSjfbSjfcSTZHR0nYTDtwkMmEg61HR0lwkMjbSjdwkMhHRkhvkclvkcpvkclwkMdqh7hGRUZvj8ZYZ4DbSjdHR0lwkMjpQSXdSTVwkMnbSjdwkMjbSjdHR0ncSjZFRERgdJi/XF1HR0lsk87bSjdwkMjbSjdHR0mCSahsAAAAM3RSTlMABovpLN+GH/b01ZdvV+nWtaViS0Y+8d3NzcWoeWJcW1RIPSATDsK6p4R5dmxnXFlQQDJeSMyIAAAAr0lEQVQY0z2M1xKDIBQFL1Ji76n2RNM78P+/louO2QdmdoEDyOK7wPPNNW/AkEZhFAARXOvtwdxHSoUBa+tOOM4Sw95WdupTKd1WzOGYo2Pppi9rZZVypG4IIJa6elPw0c2T830OjyWBIYiDoRqdPrlzA8tWYfzameAJrTmsFRLnrpQnJpIkAcuQ5lnpZ4wAGWfJp1gVPdtQj8HolxUO7FwzW5nAqPyz6TFksyGU/QAQcRjQz7e2MgAAAABJRU5ErkJggg=="
});
menu([{	
    label: "火狐原版",
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
]);

menu = ToolMenu({
    label: "在线更新",
    id:"update",
    insertAfter: "downloadPlus_set",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAABCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtElCtEm3gdr1AAAAE3RSTlMA0U73HPFWrREH6KiXtStGxZV7KDWuNwAAAIhJREFUGNNlj0sSwzAIQxHY+Nskre5/1zKMd3kr0AxIkmBom+RsOiQpu9YFI+suuX9ivLu3kD6hjC8J7yJeQ9lDtBKX9HEBDlaVRnO5n3vxJ25sMolewMeI0sEp5BI1BqayyLdwToJzkk8VJDSfHtuiWuRK27FPsO7IYBndsBYy+inHJMu96v8BhGwIj47DyQEAAAAASUVORK5CYII="
});
menu([{
    label: "更新去视频广告播放器",
    id:"updateswf",
		onclick: function(){
			FileUtils.getFile('UChrm',['Local','update-SWF.bat']).launch();
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAABCtElCtUlHR0lCtElHR0lCr0lCsklHR0lCs0lHR0lEkElHRklHR0lCtElHR0lCtUlGTUlCtElHRElHR0lCtUlCtElHR0lCtElHRklHSklHRklEfElHRklCtElCvElCtElCtElCtElHR0nKX7THAAAAInRSTlMAc/RyYmJYlVY1Hgru1q+upDYbEfjk2MG/pJWAe05JEMclWtMX6AAAAIpJREFUGNN9zukKwyAQBOBxY4ya29x3q+//jt0ihRRKP9g/y8AM/nEO38QocyBNWAsnhag8NQZ9YGXb+GiG1joti51IqMZT9sTbsVY+A+R8IsoVDQa4LnweHOiAji86adg3LpwOAEop+fBZXWx6CcVqQZ6NZgnRBCmYgeWBdejrFjdJmea4sxY/vADQbgkrLrr6UAAAAABJRU5ErkJggg=="
	},{
    label: "用代理更新去视频广告播放器",
    id:"updateswf",
		onclick: function(){
			FileUtils.getFile('UChrm',['Local','update-GAE-SWF.bat']).launch();
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAABCtElCtUlHR0lCtElHR0lCr0lCsklHR0lCs0lHR0lEkElHRklHR0lCtElHR0lCtUlGTUlCtElHRElHR0lCtUlCtElHR0lCtElHRklHSklHRklEfElHRklCtElCvElCtElCtElCtElHR0nKX7THAAAAInRSTlMAc/RyYmJYlVY1Hgru1q+upDYbEfjk2MG/pJWAe05JEMclWtMX6AAAAIpJREFUGNN9zukKwyAQBOBxY4ya29x3q+//jt0ihRRKP9g/y8AM/nEO38QocyBNWAsnhag8NQZ9YGXb+GiG1joti51IqMZT9sTbsVY+A+R8IsoVDQa4LnweHOiAji86adg3LpwOAEop+fBZXWx6CcVqQZ6NZgnRBCmYgeWBdejrFjdJmea4sxY/vADQbgkrLrr6UAAAAABJRU5ErkJggg=="
	},{
    label:"更新去视频广告脚本",
    id:"updateucjs",
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
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAABCtElCtUlHR0lCtElHR0lCr0lCsklHR0lCs0lHR0lEkElHRklHR0lCtElHR0lCtUlGTUlCtElHRElHR0lCtUlCtElHR0lCtElHRklHSklHRklEfElHRklCtElCvElCtElCtElCtElHR0nKX7THAAAAInRSTlMAc/RyYmJYlVY1Hgru1q+upDYbEfjk2MG/pJWAe05JEMclWtMX6AAAAIpJREFUGNN9zukKwyAQBOBxY4ya29x3q+//jt0ihRRKP9g/y8AM/nEO38QocyBNWAsnhag8NQZ9YGXb+GiG1joti51IqMZT9sTbsVY+A+R8IsoVDQa4LnweHOiAji86adg3LpwOAEop+fBZXWx6CcVqQZ6NZgnRBCmYgeWBdejrFjdJmea4sxY/vADQbgkrLrr6UAAAAABJRU5ErkJggg=="
},{},
   {
		label:"更新纯真IP数据库",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD/gADrTzjrTzjiSTrqTzjqTjjqTjbsTzvrTjjrTjfrTjjsTzjrTzfrTjjrTzjrTjjsTjfsTjfsTjfrTzjrTzjrUDjsTzjsTzjsUDjrTjjsUDfrTznrTjbqUDrtTzfrTjvrTzgL7w0kAAAAIXRSTlMAAvroCG48IhHbw6SfjH14c2lOQfbwyqyRg2VcWkswKhpMHbaOAAAAeElEQVQY03WOhw6DMAwF4yRQRimre9///2SLCYghbMmWT5bemY2SeAESDnPQwkOmYA/OR8P19TFAfWwDiJoU7L+zADIHPC3QZ70Bd5IaKBQUQHMz3kGuIIdUEmOuBJkSNLDCfnrLM7tu3ylDir+8VK4aXUU/dKzrBxgiCAZdSUEoAAAAAElFTkSuQmCC",
		  exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\lib\\ShowIP.exe"
	},{},{
		label:"查看阳光盒子Firefox更新信息",
		id:"SBFirefox",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD/gADrTzjrTzjiSTrqTzjqTjjqTjbsTzvrTjjrTjfrTjjsTzjrTzfrTjjrTzjrTjjsTjfsTjfsTjfrTzjrTzjrUDjsTzjsTzjsUDjrTjjsUDfrTznrTjbqUDrtTzfrTjvrTzgL7w0kAAAAIXRSTlMAAvroCG48IhHbw6SfjH14c2lOQfbwyqyRg2VcWkswKhpMHbaOAAAAeElEQVQY03WOhw6DMAwF4yRQRimre9///2SLCYghbMmWT5bemY2SeAESDnPQwkOmYA/OR8P19TFAfWwDiJoU7L+zADIHPC3QZ70Bd5IaKBQUQHMz3kGuIIdUEmOuBJkSNLDCfnrLM7tu3ylDir+8VK4aXUU/dKzrBxgiCAZdSUEoAAAAAElFTkSuQmCC",
    url: "http://sunbox.cc/firefox-sunbox-plus.html",
    where: 'tab'
	}   
]);

menu = ToolMenu({
    label: "代码工具",
    id:"sunbox_tool",
    insertAfter: "downloadPlus_set",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAABHR0lHR0lMR0hHR0lHR0lHR0lHR0neSjdHR0lHR0lHR0lHR0lHR0lHR0lHR0lHR0lHR0lHR0nbSjdHR0lHR0nbSjf0gg1KAAAAFnRSTlMA/OI2CPLcxaCfaCy2MR/r1NBTLbUdYTvEkgAAAHVJREFUGNNlT0cShDAMkx07nZBA4P9P3WFgMxTd5KKCE9K74I5kbbrRKTARB/PnC1NVrcTLtec5FudKnPm8CRQBY4BIQQBJXAtW71dsjSdBtqTO+H33xinZ/h7kz8tXdNhuh+0I1lTbCAaYV3RAjnKPupLzxX+9fgUcYM8jlAAAAABJRU5ErkJggg=="
});
menu([{
    label: "图片转Base64",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\template\\imagebase64.html",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAAARltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRlttZD1nFAAAAGHRSTlMAwQipiNEE+5T28vDmm4N9eBYT3ctmQTKt4Oj1AAAAWUlEQVQY023MVw6AIBRE0QGkiHTr/lcqGgl5hvt5khkoTlIQF2kagvQzAZ0RKBREOtmMHZ8G18HUW49DN0g4HVNA+sAAyAU1+4JQaC0PMA4Kq+zVj8hIO/7d/gIMLRe8+w0AAAAASUVORK5CYII="
},{
    label: "正则表达式工具",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\template\\regexp.html",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAG1BMVEUAAAAAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZjyVtTqAAAACHRSTlMALT3p5zQlHv6bYmkAAAA2SURBVAjXY4CDDijAwmiAqOBAZjAWsAuAGSoCjE4gBqMRA4OyAJyBLMXAmsAWgNCOYCCsgAEAXdkZTtueOykAAAAASUVORK5CYII="
},{
    label: "时间戳转换工具",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\template\\timestamp.html",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAgVBMVEUAAAARzW4RzW4J1HURzW4RzW4RzW4RzW4RzW4Rzm4Qzm4RzW8UzG8NyXARzW4RzG4RzW4RzW8RzW4RzW4RzW4Qzm4RzW4Rzm4RzW4RzW0RzW0Rzm4RzW4RzW4QzG0Szm8RzW0QzW4Qzm4V1WoSzW8Qzm4Qzm0RzG8Sz3IPy3ERzW6cnD+aAAAAKnRSTlMA+kQH8OTgt3I0u3kYEsGwp2tKKPbo1MrFsZ6ThH5uY1tUUAzpXT88OiKEDtDNAAAAoElEQVQY022PVxKDMAxE5W6wTQKE3iHV9z9gZBj+0Mdq9Wa0I8FFpY0BsA5giFOGc+/jTyu8l20e+wGBiBeuMmvXpMiURFB9HymAHgEMjxSCLbmj3oKoxqE6n58gIiGUcgigNGZmJEK7iAAmKWW9cYr25+15Ue5daGI8QV/ubd0390x6mKSYUJl+qGOmpHvyuiKiI/oAL2CZ1pTBe774/Q/pVQhH9eCgfwAAAABJRU5ErkJggg=="
},{
    label: "CSS、JS格式化工具",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\sunbox_tool\\qianduan\\qianduan.htm",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAADrTzjrUDjrTjjrTzjrTjjrTzjrTzfrTjjrTzjrUDjrTzjrTjjrTjjsTjjsTTbuTTzrTzfqTzfrTjjrUDjqTzjqTzjrTzgjqxfoAAAAF3RSTlMA4GHQhbf1z8Pl2rJxW1JCHtihnI16bgUfDNIAAABdSURBVBjTncxLDoAgDEVRwKL8we/b/04tgRCGxjtqT5OKX0UjeybWPWEqMegZNMMCGPIXScWnrUEADr2qFVgaPDze1oYBkvxJO+kGG0btB81ADMVh5IqoZdXL4ksvaFcI53BqOlkAAAAASUVORK5CYII="
},{
		label:"在线代码对比",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAAAnsGElrV8mrV8or2Efplcnr2Aor2AThkQmsWAho1kXolYYoFUqsWMXjEgenFMorl8hqlkosGAepFQdo1gRdDwzvGsotWQakk0TgkIenVYYj0omq14gnlURfT4lsmMhoVUin1Ipr2AShkQnr2ApxW8WjkkVgkYmr18Ylk8nr2ApsmMYkEssvGkqtmUgnlQViUYPez0TgkJX36ubAAAAKnRSTlMARt/Z0kT48EUzLh0N5cePin1nVCUZ8/Hv6trUy8nBvrSpoZqTiYJtPDT74HWpAAAAl0lEQVQY03WO1xaCQAxE40qRJiJg793J0vz/jxM266PzMsk9OTMhovCUeJ5/fMYkihYVo1e1HAl46DaluMg8VLkBh66bDP4C++UwTNvWAJqB7wZoLSAA1OD7pnElTdUIetsBNn4MzHtz/gMFhBb8Qh05tOAGzgSwaXEZSSz/1NcyeqcApD7ya/3RDViFJCou2/Vqc85l+wIzOA9XMBBQeQAAAABJRU5ErkJggg==",
    url: "https://www.diffchecker.com/",
    where: 'tab'
	}
]);
menu = ToolMenu({
    label: "实用工具",
    id:"Software",
    insertAfter: "downloadPlus_set",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAnFBMVEUAAABHR0lDREn4zDj72zZHR0lKSUj3yzhHR0n3yzj3yzhGR0n3yzj3yzhHR0n3yzhHR0n4zDhFRklIR0nrwjlFRUn3yzhHR0n3yzj4zDj5zThHR0n3yzhHR0n3yzjatjpHR0lHR0n3yzj3yzhVUkhTUEjctztHR0lFRklFRklHR0n3yzi+oT33yzjTsTtHR0n3yzhHR0mJeUP3yzhghFY9AAAAM3RSTlMA/gfiC+SZmCki+fTx6t7Lu7ewpp2JiIN8ZFlFKBgWERDq2bCdj2tnUk9OSkVBOzg1Mxde0VZyAAAAkUlEQVQY003KVxLDIAxFUWFwd9x73NJ7Zf97izBkzPvQzD0jUJucj9MbKtxmPMfmxkxfqpP84BNCLEd9tPme4CpMua8luvi3cYpFW0+moPBFZ0dqDxJM0emdcr5zZ7iGCBdmc86j9yzrkGQTDAnK9ial6vF2EcqqgWUPihKUmrSB+AFttce9Ugdm05qBvrED+AG82QryXV9/VAAAAABJRU5ErkJggg=="
});
menu([{
    label: "XX-Net",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\XX-Net\\start.vbs",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA6lBMVEUAAAA1cqYVLUD91EUaNkz93kP73UNWRxUKCgj95Ev90EEmY5zNpzErXohVWjwbOlRrXR0PIjH910knZaHlxTi9njInUXYcPFeBaB58Zh9fUB4ULUENHCkcGxIMDQswbKH6zj335Un22T41cqX0yT40bZ0jX5vrwToyapg0cKQqYpbfvzjcszIvaJYsY5C6kyoHOHCqhSWmoCgkT3I3R0dkYTZVVTdLVT0wPkBcWTFPSR9DNg83dqv/1kQ2bp02caP+zT07gLo8frY6fLM3daf/4kb/2z7/00H/7U7/30I8hMAlZqX/8k//2kzyvmU/AAAAPHRSTlMA/mX+c/78VhD+/vjOy4h9a0f++ua+uoOCe2ZbPikX/vv49/b18e7s5+Pi4N3Vzrurq6emiIaBf3p4YEMW0u7PAAAAyklEQVQY0z3IRbICQRRE0VfSrrjz3d2F0jZ8/9uhgqC5o8wD+9wRTWgDjk2en7TO8mhaA43cCyZljmto3EW3V1IwfLgjnPSSbiEQTVMX4GOlc8YKKcTJ5/kmhLFmBULSfIF+26QEqgvEWKsVBMHrv+1b0MsQu8c/cRx/pw9EWUAN4Pcz27arkisD4xxd/y22Tc7nvlKqAuhm6y+vSbgRXlVvAIDx0CNWZ9AfDJ0Z7HM8Qi5vwrYDcIAF9+en05d+DW6nLJfLx3Bi9g5UHhv7T8gXQwAAAABJRU5ErkJggg=="
},{
    label: "Shadowsocks",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\shadowsocks.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAABdpNIegMEnhcOOv+AuicV4s9kfgcEcf8AegMAfgcEjg8IkhMImhcMxi8Yqh8RGl8xKmc1Om84ggcEhgcEigsEcf8AvisUjgsIkg8Irh8QvicUkg8IvicUohcMrh8QwisVBk8o1jcc1jcdAk8oZfb/aQAvrAAAAJXRSTlMADOt4A3gG/Pjv5825oH1tKCMW69bAv76zqpeQi4VyZF9IQzgwxtA2EAAAAHNJREFUGNNdjkcShDAMBGXsNWHJmwOZ+f8XkaEoI/owpR5dhk4YqSr/CdUBOqlAedQoRLLrhb/BC/h4xT3nKFa9gUmHiHMmqq9wfKuEMzZuypjFKNTav2nDltTAof0KW7WPEJMv0sxQ3VtfPDVJ/oYkaj8WEeIJh0wQlbIAAAAASUVORK5CYII="
},{
    label: "Lantern",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Lantern.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzN+8gE8AAAAFXRSTlMA8KHqbC0y+NJaPCYdG87Lvnl4YE7SNMOjAAAAXklEQVQY02VP2Q6AMAhjgDuc8+b/f9UgiTFpX4BytUR7SR/KTESb/eDEdTaOituxkGPUIOqgF1My0d5VLE1e3+xJNNgji2mMqonfWM1yENkzIGAFjsJbEAbSwRzYfwBsmwhPnE7G/wAAAABJRU5ErkJggg=="
},{},{
    label: "adbyby",
    exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\adbyby\\adbyby.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAABzjr+FlsBkib6NmsGAk8AAWLD///8OYbUPtQ/4+v0DWbHf6vbv+u+91exTj8xJick6fsM0esHx9vvo8Pjm7/fP4PHo9e3f9d+Ms919qti97L0UZbeYeELEAAAABnRSTlMA4p/1Q7xzHTCGAAAAcElEQVQY012MWRaEIAwEgzpNIjoz7uv9zymgIlhf6XqdJrw4BSdCRyQCHEQtkgoRYcfzsgl/o8bsGtHLIFLbxmhF5UUz3Rtda0UG/ErtKf9ARqScubMiizJoeq2r1ufL8LLuIZPbMQb4UKDIgbzw5wHlEwb3HcxS6wAAAABJRU5ErkJggg=="
},{},{
    label:"ScreenGif",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\ScreenGif.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEUAAAAXq+MXquMXq+QUp+IXq+MYq+QWq+IXreUVqt8Xq+MXquIXquIas+YXq+QXq+MXq+NNBVd1AAAAEHRSTlMA93jLGsDDPjQY27tOCp6aHwoWZAAAAFJJREFUGNOdjEsKwDAIRLVqUvNpc//TdgjBTSiUvs3MPFD6zQlidPd7gMu9T1Ew2IwRZQq0pESa4JdgzSJZOYSRjCFku9hP3p6i1YpYoh1Bow885qkDsjPvkZYAAAAASUVORK5CYII="
},{
    label:"GifCam",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\GifCam.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAAD8M2P/LmX9MmX9MWX+Mmb9M2X/NWL/M2f9M2b8MWX9MWX9M2b8MGP8MWX9Mmb+Mmb9M2P9MmX+Mmb+MmX/MmT+NWT8M2b8M2b/M2b/PG3//P3//v7/zNn/bJH/wdD/8/b/ssX/fZ7/SHb/N2r/6O7/0Nz/wtH/u8z/lrD/j6v/d5r/cZT/Un3/w9L/t8n/rsL/hqT/Q3IGWDvoAAAAGXRSTlMA/QWxhFEsEQzz8aak9sq2q5WSRUEzJtHCWg4xMwAAAKJJREFUGNNlj+cOgzAMhGMSNmV3JCHsAh10vf/DNYlAQu33706274wWDANtsM0E49S0V72PdlTiYmvRR6AaCLVjR9C92w9jrIfYkYa5mx+8HsdhaDovk0ZCrwVvyrIq+I0SmYfppTiXorrXvKW+8WMEsk66WQGijrrzU4hpEuLVebmKxdAzTQ+BgyRWuBY7HZDGij0l3UBpjZMR3ye5nv97/wsnCw837oPTPQAAAABJRU5ErkJggg=="
},{
    label:"FastStone",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\FSCapture\\FSCapture.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA51BMVEUAAADt7e3x8fHLAgCQkJDDw8Po5+eZmZnb2tqDg4P4+PiIiIgmjx8ViwoRhAjT0tL8WRQbnAnkLgnTEALg39/f793y4drgsKzZfHYlqQ8mrg70SA4qwArrOgraHQXl1tXT6dH42czIyMjG38TTtbPKraz0vqmozqfgqqXLpaPxtKCYoZqV0I7nmYzuoYuMwIqFoomJk4iGhobLg4CK13z5lmxssWjcbGPTWlf2glVdtFTdV0nKR0VFnkBY1DwylTnKOzncfThksDZupigukyiBrSbePCT7YB4gjBnNGBaufA/6Ug8nugkjoQlGAAAAAXRSTlMAQObYZgAAAL5JREFUGNNFj1WywzAMAC07hqR5gTI+pjIzM97/PJXdTrt/u6ORRuSO65IHUsqm65altKSl3Xc+uutMghqwcMdJbINl8hYggoHO8qdg/6sVTOjkL6vgnKtpB5vw92w2UxnmCtEqusCJURiGX6VC9DWWAiFw4gWBJDo7vukw9zxvQ+kuxhgbxOM2afQO3hRgzDTfqkU4hb86QN+Eth/BYM6lUSc/3Mel2oVKs0Xxk3Nl4286iP+UUEoJ8531BP0KhpoPjOBj8+gAAAAASUVORK5CYII="
},{},{
    label:"Notepad2",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Notepad2.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAACRhGHE5Ovu8fGVz9ys2uOnz9fL5Oql1uGt0tqOzNme09+VyNOz3OaLxNH+/v7U6vGFwc5/k5p7vMxzs8Lc7vO92eCbzNVGUlbC3OKq0dqGx9R4tcNxrrtpprXRxKdFT1Pf6ezZ5unI3uPb3uCEyNZ9xNSyqZAH0LMJAAAAAXRSTlMAQObYZgAAAJ1JREFUGNM9z4kOgyAQRVE7HQYE3CpWW5fa/f//sDxMHRISbk4mIcuy037S3MpxNYNaaaBBIRzKxhlVkK67jlPoWxaEWEwKMpdernl+vjyJEHRgZzaiFcJ9af6kdghVGF0icS8jHKfQeC8SCakkfGuxRRFRQRAyt3FLHwmRgdDhYy2btIYhHssmJAoHUU2W2TIu+4bY57X99rDPF+8fLUEJLW9qlukAAAAASUVORK5CYII="
},{
    label:"Everything",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Everything.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA21BMVEUAAAD///9wcHD5+fmVlZWCgoL9+vmMjIyFhYXHx8e9vb25ubm0tLSRkZGxZDyxViW2TxbfehXVbA7JXArEVgn27OfIw8HBwcG9trOurq7fsZmZmZmJiYnNhmGvZkC3Zz23WybwrBe+VhbggRTniRLijhDjng7MXgzy8vLl4+Le3t7c1NG7sq7Gs6rjuKOqo6CypZ6toJmwloi1koB8eXiugWqygGfMglvKgFrHdUXGb0LDaTfEaSnxpx3wlRyjSRjdiBbvoRXXcRTmkhPcfRHpqhDloQ/clg3FYgncu4dSAAAAAXRSTlMAQObYZgAAAKtJREFUGNNlyNUWgkAUQNG5woBIhwVIh93drf//RS4YXD543s5GCNXrFZ4XhCbmEKkCJNzkvsCYq7XJYIxLOfDVfeJf7l4VLALC5pYqiha5QBMYG5rEdVzV6BUw1dMZwFDTBwVMDFVimG30rokERsrxGgTxQ+qyBOQ4PB/8l9cHArunKi8dZ1GjwM6glYRyg6LaFACUc9BPjWyAQNbcomlRZFm7XAAq/UL/fQBnsg6NsM203gAAAABJRU5ErkJggg=="
},{
    label:"Hasher",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\Hasher.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABCFBMVEUBAWeDg/5DerUqKn5NkN1LjOE6bMUhPZxDfNQyXbkpTasYLo4QHoEID3TKyv6jo/6Skv4BAV0BAUp7e/+xsf4rK4GcnP/9/f6Li/5hYfo5OfhpoOVFgdM4OL82ZL4ICLMuVKwdN5MVKIUNGXkIC2wID1ba2v9zc//j4/7S0v67u/7x8f1DQ/1LS/wxMfsGBvoICPHAwO0tSeo7bOksRONEduI9cOI9P91hktslJdksP9UODtVbhc9Ihc4VI8wQG8c+dMVUeMRhkMJNa7gQELNGXa09cao2ZaIRHKI+UaE3aJ8nSJ4xXJo4Q5ZNTZQqTo4LC4wxN4okQ4UwWIMeOHsYLHESIWcqKmZ6CBvwAAAAt0lEQVQY003K1bbCUAxF0eT2GtDTYsXd3d3dXf//T0h4AObLytgjsNMk4nW5vBK7gxYBgCY61UybDpMZJMrEgQXE3OE1oBGJxf8cNBpsquM9HMNC1BUr/WSFEJEobEOyLBtpiS/oCEdhGTQQi2rtc0M3mP4xVJUeN3iFcUBPMOVscdcXGPp0BGPJPDdwgs4vw7RS4fr20PD8E7TbStzBBtw/DO2JMtczB/c3qxZrz3ZXMPr6NDs/AIcZFKwjdlKfAAAAAElFTkSuQmCC"
},{
    label:"TakeColor",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\TakeColor.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAACeV7mdVbicVLmdVbidVbidVbieVLifVridVbidVbidVbidVbidVbidVbidVbidVbidVbieVbaaV76dVbidVbidVbidVridVbidU7qdVbecVreeVbidVbidVbiwuftSAAAAHnRSTlMACYAbe2pCPBGzkoN0WU+9pYosBe/Iq6NGNDAl4WLt5aDiAAAAh0lEQVQY01XLWRLCIBAE0B72LXuMMVHuf0wzQmHl/dDdABjtatvUTqiM15bIam9KnyLNGm5YKE7cuw545Bc0TstZBpThigeChHIkcX0pXEKk92rQCIg+5+dtMG2QavQDxDKsB9cljdYBSA4ENvb1XSinsqg+v5tToAmctcRf79M8cWjIRIXqC0mvBUWYxUacAAAAAElFTkSuQmCC"
},{
    label:"DnsJumper",
		exec:Services.dirsvc.get("ProfD", Ci.nsILocalFile).path+"\\chrome\\Software\\DnsJumper.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAAAnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjaABOg9AAAAGnRSTlMAFvgH4fHde+e3HnXTJRCkmYFdT8GtZDWebMClLZ8AAACfSURBVBjTRY9ZbgMxDEOfbHkZz5aZbC3vf9DGboI8CJLAD4KkY2XKeSrGm5Kk7FI6GFyUwgQ/StojMKteNcOpR1UBS76e4QktlDWnxmYG2P+YbUzuC4STEFGtE8vW31CtC621j3DcX7u6J/bVuhAXRVpbb/y6XyDzzBF3P7p1jBYh9msjWB7BrnosKrzYlcJtNNCdwRwkr1IovLH5W/8P3PAHPWO4fUEAAAAASUVORK5CYII="
},{},{
    label:"IE浏览器",
			exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAARltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltsRltuGA5VuAAAAJnRSTlMA0ZQJ/LeE6LJ2Oi30xG9C9u7ayquMf2dkXlpPKSAQBN2fe1BNFnhg+YwAAACTSURBVBjTdYxFEsMwFEMVx3YMYWiggeK//xH7PYFd30YjGOE/cdGJaTvMrE1UUuf6z94JSYFkxD34zVR0MBZgbiKi8jlkHMiwiPuW5BwKTnQILFELZk2JGlbHjxdyBUz4j04W+FAI4ELUKS8WAF4pZYHMap48cpcnrB6ofNzQiQUv3ojNbtMcjBN6mIqXqpX+Bv8DYOgPfPnW8/wAAAAASUVORK5CYII="
		},
   {
    label:"画图",
			exec:"C:\\Windows\\System32\\mspaint.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAADrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjA76hHAAAAI3RSTlMA9e9aOZZD06KJVurPKxQMBPnm4HFpLRn4v7itnYB1YicSCDg6fOAAAAB6SURBVBjTjctJFoQgDEXRgCKggNhX3/3977FCPM59s/tzQidLrXHmlQ72BpJa67E4TozhClS1btk/C/gwLeLMgwdw6yBuPA8BxkNcNepOlC/QfH+L8ST6DiglW4yVX+agge6zFTuSsoOyTNie9uKIkhFL2+weS6Rz/QHBhgq5vjL5JgAAAABJRU5ErkJggg=="
		},{
		    label:"记事本",
			exec:"C:\\windows\\System32\\notepad.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAAAQzm4RzW4A8nkRzW4RzW4QzW0RzW8RzW8Pzm0RzW4RzW4Szm8R0GgQzm4QzG0RzW4QzW8RzW4OzW0RzW4P028SzW4Szm4RzW4QyGkA220OBhRvAAAAG3RSTlMAF4gCoalLwzxCxrxTDy+RflpGNSUi25p/Rwd+O+hbAAAAYklEQVQY052PORKAIBAEd0U5RC4Rr/8/VApdypLMDibomgkGAGY9EHqBTG+AsD6HFJyRwO4WKTCeXLS8CDVOcj1c58OwUYMZxNMwxCrggSZVNI2fk7YRhXqJ77kdyv2eyPcvWFoD3lZ86iEAAAAASUVORK5CYII="
		},{
		    label:"写字板",
			exec:"C:\\Program Files\\Windows NT\\Accessories\\wordpad.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAADWIEvWIEvWIEvXIEvWIEvWIEvWIEvWIEvWIEvWH0vWIEvWH0rWIEvWIEvWIEvWIEvXIEvWIEvWIErWIEvWIEvWIEvWIUzWIEvWIEvWIUzXIUvXH0vXH0vWIEnVH0rVIk3WIEvWIEvWIEs53EvnAAAAI3RSTlMAyPlwMPbw5aDMulhMKtu1raiZjmASr5SAd2pmVEREPx4WDafP7X0AAAB1SURBVBjTbY9ZDoQgEAUZZBFFHfd9ffe/o6ISTLT+upJKXpM32c/yL80dwRGuh2CgN4gjrozwvQupU51sh7D4OShzCeRMERCX8FBBLKe4qDygJ6fgQnBgrE1gkwbo0oFp4hKZx1NQPETCWoHiMV1JM/393Ac78hwNTtTZzjwAAAAASUVORK5CYII="
		},{
		    label:"计算器",
			exec:"C:\\Windows\\System32\\calc.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAu5wAu5wAup0AvJwAvJwAu5wAu5wAvJwAu5wAu50Au5wAu5sAu5wAu5wAu50Au5wAupwAu5wAu5wAu5wAvJsAu5yL9qGsAAAAFnRSTlMAoPxgiGfnrnjyb/n27d7XuZiEpJVX+KdN+AAAAGNJREFUGNNtz0kSgCAMBVETBAHnqe9/VC1KssHe5VU2v/vJK1/qCwjSl3bkg/qbKkRXylrBqjBcnMI+GGyvvddmgAIoBocjZvxhEFaWhTUYpMA8E5JBvMkeFw10YhyZFGnHtT3u0wfa+3lkFAAAAABJRU5ErkJggg=="
		},{
		    label:"命令行",
			exec:"C:\\Windows\\System32\\cmd.exe",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQCkAAAABnRSTlMAKNhIuHB+Z3vWAAAAOUlEQVQI12NIgwKGREEwEGNIYAADNmRGAIzhDGMwCcDUJEAZbDApRQYlBTDDgMHYAG4ONgbcUrgzAEKMDuT0b10fAAAAAElFTkSuQmCC"
		},
]);
/*右键加图标*/
//分享此页面
page(
  { id: 'context-sharepage',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAloj///8Cl4nz+vq34t50x7+R0sx7ycI4rqIUnpEEmIr7/v3S7Oq95OBfvbRNtqxCsqcipJgZoZQQnY/r9/bq9vXm9fPh8/HV7uuz4NyX1M5VubAvqZ6NGBiZAAAAYElEQVQY052ORw6AMBADmfTQe///O0GKCLnC3GZXsp19QRxKJDroZVKvdkayS/1ou0FRl7igTQnI1iDzcPAK5rMBFePt2vUj6KRRVICL7vVQESICPUbYIlnh7f10dfaTC5BzArYVGeqrAAAAAElFTkSuQmCC" 
});
//查看元素
page(
  { id: 'context-inspect',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEVDQztDQztDQzv////5+fm6vL2TmJx/goNISUPz9PXv7+7n5+jj5OXS09PIycvAw8a1uLuprK6hpaeBhYl1enxna2xhZ2pNU1RPT0njPfnPAAAAAnRSTlPy5YB5WPAAAABoSURBVBjTZY9XDoAwDEMLSQere93/pEBV1IH//KQ4NllIr8euk0gllFb/gX0fQUAMPXCbUptrgEPMOQKvgGmkJRc1K+A60LzA4HHVEw9JiAS+hTKwFlj3RXAALoZi5zk1lbJNGfWbfwMAYAPBXgTvHAAAAABJRU5ErkJggg==" 
});
//分享此链接
page(
  { id: 'context-sharelink',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUKbA3x9vHe6985iTwNbhDg7eGIuIkWcxmkyKWgxqGcxJ2WwJiSvpNdnl9MlE4Zdhz///+10raPvJBzq3RRl1NAjUIyhDUvgjEdeCAQbxPz+PPp8unm8Obi7uPa6dqYwpp8sX54rnpanFxHkUo0hTcxhDQZ+JfeAAAAdElEQVQY042PRxKEMAwELckZ22RYNsf/f3EpShiO6DataqlGHB/5wke5zw1YVW/EBPiIryoy6K5vMsLd130/kkPqoGU/4K+ofAQtlzwFiLZq6KJZeELqb34Y08Rgvl1SVJQ/OBxEOmuTwalGC+wz8djK4yX/kHUEqoYj8kQAAAAASUVORK5CYII=" 
});
//分享选中部分
page(
  { id: 'context-shareselect',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAjVBMVEUOcRNKlE0PchSRvpSDtoZnpWpcn19WnFk+jkI5iz4rgzAifSYdeiIYdx3////j7+TO4s+TwJaOvZBzrXZrqG4ogCwmfyrS5NPJ38q+2b+jyaWaxJx8sn54sHtuqnFhomU2iDovhDMUdBn7/fvw9vDa6dvZ6drD28S717yw0LGKuoyIuYpPl1NGkkozhze70xS+AAAAl0lEQVQY03WORxLDIBAEB5EECOUcLef8/+cZyidV2X3p6rns4g9ZG22HJt5tWjKqnKwMv03yyN6dw8MJ8M4qBLkF9GX0rekbCAgHuPDNUgk31Dkipv3QJi9gpqaslsX44ytBRc4xUX0hkg6ACZ9TISam4ptsegDXI12deDnwUewBDF0NR52pYvYNa+AJyiTdvq/TR4AffAC12QfomK9XVgAAAABJRU5ErkJggg=="
});
//链接另存为
page(
  { id: 'context-savelink',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAXFxcZGRkiJiQKFQ8hISEqLywZGRkIbTIHLBcPOSEaMCQVFRUSEhIkJCQhISEIij9VyYYIhD0JgjwIiD4LfDsH3X0bAAAAEHRSTlMAX4+CfG9RPziUZllPLw8P1ZuMMAAAAFpJREFUGNN9j0kOgDAMAw1dKHuSlv9/lSonC4nOcZTINuTDSGQgVxKKDl+Ei4Vp0oA7udiBRWcVs0dcoDOJSYcExx7+QqLVaqKTnsBGsRq9x6BYk7WU+DeOeQEOdQ1IG6iCqAAAAABJRU5ErkJggg==" 
});
//图像另存为
page(
{ id: 'context-saveimage',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUNmKwAAAANmKwNmKwNmKwNmKwNmaoJjbANmqsNmasNmK0LlacPma0Omq0Gj7ULlKoNmK0NmKwLsL8JkasNmKwShpgNl60LmK4KkqYJkaIJzdAIsL8IjbIJh5UKu8sOlq0NmKwOma4Nm60NmawMl6sOkaYPiqG7FVESAAAAIHRSTlPwAOy34vzZGrT289O7r1ED7uvQxsLAoJ+WW1lQRz06CFsK4MEAAACCSURBVBjTZY/ZEsMgCEXBRs2e7vuCGvv/n1iMbWOSMwMMZ+DhQgYpvNIUCX9jvbeGxCj89vmoTCpuiJdU2DPi6ffiXOh1TV+xP/Y9D25RVB3ei+EmCtsi4vVNah2FURg4qJdWljZQmnYQWnPtnADKcKQTEgpo8hWTh2pKADkLt4j/AfKoEgKCwMHiAAAAAElFTkSuQmCC"
});
//图像复制
page(
{ id: 'context-copyimage-contents',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADtSURBVDiNpdMxSgRBEAXQt7qRiW4rhmIwaCIsGpkYm3kIAxcmM9kbCIqhbINH0HAyMfEGamBkX8G5wprswDgOA7P7k6J/dX1+VXcN5vO5VTAMMX2sJIDxqgIVjnvWvv8RKPOss5UQ0wUmeCzzrAgx/XNQv3yC7TLPXmv0A/ZwhKIi11qKB5jhOcR0UEu9NGK7AC5xii0UIaZNKPPsCruL2C4QYhrhtkYd4inEtL44/4SYpl0ObrDT4M5xH2LaxxvuugQmLS3BNb5w1kw0BdpmUmGjjWw+Y9/PZDCafVfb9Nmzdtx0sNRODC1hu45fix4zcUm95GcAAAAASUVORK5CYII="
});
//分享此图像
page(
{ id: 'context-shareimage',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUa3MYa3MYAAAAa3MYa3MUZ3cca3cYa3cYZ3Mcb28Qa3MUa3MYa3MYb3MUZ3McZ3Mcb3MId28EZ3ccY3Mga3MYa3MYV49AV49Ec2sMZ4csZ3MYa3cca3MUX3sga3Mgb3MMa3MYa3MX/XXL5AAAAIHRSTlPw+gD2/sa64dyfN+zX0KeDJR0E9fTtsaeWelpZTEEgBjSmWGoAAAB2SURBVBjTZY/ZEoMgDEXDbUChtVW775f//8laHEbR85ScySq1FOyEC8SQdjvlm0Hs0Z3nIr4BW1Z822OKs2CTZvhWs0g4fEIWsalY4WD6B3kaRHTo6v7Jv0xbPO4BYWxzFL3gpvIaR3lrRO01ksVhykJwwer9H/uoFHv91SnmAAAAAElFTkSuQmCC"
});
//复制
page(
{ id: 'context-copy',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAk1BMVEV7mQXl5eTo6Ojh4eHe3t7X2NOYrz/x8fHo6eK/zYiAnQ37+/v19vP09e/u7u7r6+vm6tjc3djS2bbN1LLT3LDN1q3K06jGzqjK1p6zwH+svWymuF+br0qWrTrg4dvh5NbR1MTa4MPP1LvY4LrW4LPQ2K/Iz6zP2qTCyqPF0ZXAzJK2xnipu2SVrDiIox+FoRh8mgcCDb9yAAAAd0lEQVQY043IRw6DQBBE0cFhEtE2JuMcyHD/06FqQGLJX5RUj23s/+lXr1aRafpKdQt4pWXbVvTmC/hMa53nnLczfDFPIYSXTHDFnB1HVrJZgevKNLgTBJjLDhkEIYGBbgSvLOPst0cngjSOkyE8IMBccUQPtqERpWMGqGVKtY0AAAAASUVORK5CYII="
});
//撤销
page(
{ id: 'context-undo',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAloj///+95OD7/v2DzMVhvrUEmIrw+fjr9/a14d2U081Asabz+vnQ7OnD5+Oo29aLz8l8ycJnwblbvLNPt60zq6AqqJwOnI/1+/rk9PLd8e/V7uus3diGzcd3x8B2x79swrogo5cYoJMTnpHyVUqtAAAAdklEQVQY022MWQ6DMBBDM5M9YYdCW3a4/x0hhAgpYj7G9pNl8nbtHIEMmEHN2pAtAPSYKyiEB3iCiZCOfY0Hqfqn3JkGbDSWYwS4jICF3cnSBVAp98WvDEDrSxr68bkOZkgq12R0vJuipBKzRPJnfuWmqDfyegfz8gPqFPzhYAAAAABJRU5ErkJggg=="
});
//剪切
page(
{ id: 'context-cut',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAhFBMVEXuWSHuYCv4+Pjv7+/s7OzpuqjqpYvqm33wdUjwaDXjx73nxLbreEzz8/P77uno6Ojh4eHy5N/23tX0yrrgxLnev7Pzwa7itaPwuKLotKHtspzhr5zlqJHumHfvk3Hmj27yhVzsglnxek3vckTuXSfuWyTuWiLlz8fmz8bdxr7nxrrqdUkaUO2HAAAAhklEQVQY042NRw7EIAxFbRggBNJ775l2//vNCISyzdvY/33JhjvI1W2rNGMOPZu9cLaTpKaRKbHNXpIMATAj5Q6GLQnq46iDZHPHRkqHgdLxetQ+/rQuoeALiyK2cIFGNIwr9Xx9FGeNEf4JItY6FnD6RuQaqx6gr/BrxfQuOgTArsgnuMEPaL4HF4FFOf4AAAAASUVORK5CYII="
});
//粘贴
page(
{ id: 'context-paste',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEU4tyLn5+fx8fHk5OTh4eHe3t7V2tT5+fn1+vXu7u7q6uphw1BWvkRUwEHz9fPt8u3j6OJzy2RYwUY8uSbc39vO5Muf15WE0XZ9zG9kxVRRvj7w+O7o7Ojf497Z5tfa8dbT6NDK18e447Cz2qxsxl1fw02kLTPLAAAAc0lEQVQY043P2Q6DIBCF4UKXWRBEqFrt7vL+r6gZo3Lpf/llksk5HemJiN8iAQTADuq4gQPIbZ2c5M5VcTRNE1bQugh67vdY4EUULBGVlV/EM7eWmcuh/wgopWyrJC9gjInZWXpvn7KLdN/hKiVwk/5Hpk4hvAWHsfyKUwAAAABJRU5ErkJggg=="
});  
//删除
page(
{ id: 'context-delete',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAqFBMVEXfAAD6+vr4+Pjb2tr88/Pz3d3kZGTjOTnz5OTlhITjWlrjUVHf39/b29vrkpLig4PgeHjoc3PiYmLgNzf09PTp6enr2tresLDeoKDemZnlh4fnhYXodnbkcnLhb2/pY2PmPj789vbx8fHu7u7k5OTm1tbk09P4z8/gzc3esbH0r6/oh4foamrfaWndYGDfVlbfVFToTU3fTEznR0ffQ0PkMTHeLi7hDw8G/cYDAAAAg0lEQVQY02MgBpgryKsrsgCBlqEpWMCYEQ5YwALsTHDACtEjI8LKAYYiChABQQ55PkEg1FFih6oQ49Zmk2aT5lKGCsiKcUuxSbFxconCBFS5Odk4hRACcmrc/EJAyKUiDBXQMBHQFzAQMOKBCujySGpKiEuIS8IE9HiZmYEISJgR41UApPkJQ3lsoccAAAAASUVORK5CYII="
}); 
//此框架
page(
{ id: 'frame',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAACdVbidVbidVbieVbidVbidVLidVbicVbidVbidVbidVbidVbidVbidVbidVbidVLidVbicVbieVbidVbhllC80AAAAFHRSTlMA8e3er/dOQebMxZ+Wkoc2LhsHqpE8o44AAABgSURBVBjTjc45DoAwDETRGQcnYc92/7NCEVmAUvCLV7iwBnV6VdE+Qffj2GkoiDtncHAI5+mj7wRCKcJmKJhyTtEgWIDijMFTnZdlfgBdt22l8WdY8yF4NRocRSRKh+4C9d4GXyKiimMAAAAASUVORK5CYII="
}); 
    
//添加页面右键菜单项
page([
/*{label: '选择屏蔽内容',
      oncommand: "window._ehhWrapper.toggleSelection(); ",
	    /* insertBefore: "context-searchselect",*/
	  /*condition: "noselect nolink noimage nomedia noinput",
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAolBMVEXrKFvrKVzveJftTXbrLV/51d7olKruXILuV3/sOWj4ztjww87svcnmu8fxuMfyscPis7/0orfyn7XtmrDxmK/zjafkiqHvYofsU3vqR3HqQm7rNmXrMGH39/f54efx4OXu2N710NrzzNbrydL2xNHwwM32tcbkt8PqqrvgrbrpoLPlkqjpjaXohJ7yfJvscJDmbY3waIzmZofuUXroT3ftSHMmZd6jAAAAhUlEQVQY042ORxaDMAxEJXcg9J6Q3nu//9Xws4E1f6HR/I0Eo5gR+uA8fzu9yN0dV+Xi4MZ/KxKi5l+ZwToOrZAherJMIMCN6VW2rAilhO0hMMJLVykisuYJEyO2TJ3AQK24COgOipsJx7/bPvXrbjlemQ4sxPBq9NKziWro+RR6/M4wihYg8gdns2jxgQAAAABJRU5ErkJggg=="
},*/
/*{
    label: '将此页加为书签',
    class: "menuitem-iconic",
    oncommand: "gContextMenu.bookmarkThisPage();",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAnzzx8fEJokLc3t3A4syq07qizbKRzqhvw49ewINOtXQNo0b6+vrr7Oze5uHH6dTM2NHH3dC43sa51MSw3sGY066WyqlyxZFou4dgvYNYv39KtHI7s2gtr14kqVYDoD7UmEEdAAAAdElEQVQY042ONxLAIAwEJcBgwDln/v9LEwbG7thCmttrDnIhbUt+4qiq45s1myamY7qkYHjfyIS8vEAcZmmMnAdEL8p6Bc9alxBMs7u3NzYHit7dvoAkBCgFIgkyLpxSvoxx29NRfp6cdk+ctSnbEbVpyOEFP4cEawNeYIMAAAAASUVORK5CYII=",
	  accesskey: "D"
    },*/
	{
		condition: "select",
		insertBefore:"context-selectall"
	},
	{
		label:"发送到OneNote",
		condition: "nolink nomailto noimage nomedia noinput",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAolBMVEWsGT2sGj6vIUPv0tnNpK7SqrThtsDSkKDNi5zIcYa+Um28UGu2N1awJUf59/fx7e/f29zr0tfcy8/iucPdtb/Xr7ncqLXSo6/KipnAWnO5RGGtHED26Ozs6erm5eXo4+Tj4OHu3eHm1dntztbmztThytDpyNDXyczexszfsLzRqrTOprDYoK7SmqjUj6DIjpzQgZTEbYLCa4DAUWy5TWetGz9PoUyBAAAAfElEQVQY043MRwKCQBBE0WYUdXSGpBLNOZDD/a9G0/QBeLv6i4JJmsNsdPdpl66ltBjoFwXrezXkAuWwpZC6tjAIB/mwk2iJJOwoHP2bUGsUc8ieZ6E2KIY9hepzSqIVkhwugaf51KQQeE5XmyjkAKED7Aekff/nowIm6AEzLwffpvQIawAAAABJRU5ErkJggg==",
		insertBefore: "context-selectall",
		oncommand: function(){
			var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
			var focusedWindow = document.commandDispatcher.focusedWindow;
			var selection = new String(focusedWindow.getSelection());
			if (selection.length == 0) {
				 goDoCommand('cmd_selectAll');
				 var allSelection = new String(focusedWindow.getSelection());
				 if (allSelection.length == 0)return;
				 goDoCommand('cmd_copy');
				 goDoCommand('cmd_selectNone');
			}
			else
			{
				 goDoCommand('cmd_copy');
			}
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(onenotePath);
			var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
			process.init(file);
			var args = ["/sidenote", "/paste"];
			process.run(false, args, args.length);
		}
	},
]);

/*UC脚本管理器加图标*/
page([
{id: 'addMenu-rebuild',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVR42mNgoAZwcnI6AsT/0fBhYuUZsEiCMbHyw8QAbIF0hFj5QQDolQ6skfg2JMcCFlfT2QA0L1gPnnQAAH/e4tL0xtUPAAAAAElFTkSuQmCC"},
{id: 'sanitizeItem',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAeFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVyEiIAAAAKHRSTlMAChGchfzf1pTkeGwgzLYZ9ol0aBe459rSkHxtT0j+y7+qpqWhQDs1a0pLYQAAAHdJREFUCNeVjFcOg0AMRO0NgcCSZAu9d+5/Q7wUISHxwfsZP8kzsOEJa7/ky5BU8ZoSOls04c8QUgz04ASoJpgVQ11SwXJYYHvAXR+/n83/5PnF+QM/9+72M8gjH+vVY4Z9AWXLMDGeiVQrrrnSUqTko/s+iApYALNbCEP34uV4AAAAAElFTkSuQmCC"},
{id: 'webDeveloperMenu',insertAfter: 'downloadPlus_set',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVR42mNwcnLyBOJnQPwfHTNAATY5qB5PBlyaiTAAbAiypA0DkQCkFm4Jum0kGELYAKLkBt4AXBKEYoZg4BBtwDAIRKolJBKTsjWyAZRkpucgSS8QgwwDnoD0AgAhONvWLzlLzQAAAABJRU5ErkJggg=="},
/*{id: 'abp-menuitem',insertAfter: 'webDeveloperMenu',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVR42pXT3Q3AEBQFYAPQobx3AqYtewgdpKWhOfF7SU4ilfNdD8oYLCklj7linkHSGWe9lctmUh4jVTnE6JizSvp2N0hnshsAfaSa7PLeL5BQEAaTdY4nIl8PATykIEOAikwBCrIEVkgDqA1EIWDhkII42JsEHBuIgxun9yPKa6QgCh6Q/cvwPwhAZmnLG0hTfgEPMUO+uEiMIQAAAABJRU5ErkJggg=="},*/
{id: 'gm_general_menu',insertAfter: 'abp-menuitem',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA6klEQVR42qWTMQrCQBBFF7xEgrUklWDhBSIWSeMBrDyIJNewES+wYGMv6BnEE0SsxNiJEv/CrIzDZg268CCT+f9nYCdKNZwkSTpgAlbgACqwVW0OhCNwBLVgBjIw9Jmn4OEwc+YuYw9ocP9ivhitNEfUqFtitJE1p+DMmhsQgDFN8yRNCNZMZzypCShFesgmW4AlqwOhLZUcj4Q7YgD6tqbep74h4P0sa1dA+UfASdFiSIMZee+pbUDm+kLuWbLcNaF5cbU3AArP/RfsJm48QPMd8EzQJY3Rat6If9jE2LXOmn7bJmNFmsj6XniZHU4PnwhMAAAAAElFTkSuQmCC"}
]);

//当前页面
new function () {
	var items = [
	{
		label:"复制此页标题+URL",
		text:"%TITLES%\n%URL%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzgRyIBbAAAAHXRSTlMAA9gayaclIOXe0pKKYhIMvK1wzsCkoJ+WhDkubD9pK/gAAACBSURBVBjTTcxJEoUgDEXRiDSKAoK9/rf/bX6gqIoZpHLuIMSTYk/fuQHxLTMGVQtb04TRNLt65mJbeIS+EnmJs6hzL4UF0a9QXfEBmS21xV69w5oNW5A4qhVWr7AEel0xnZCefpcWT/tvMeVtRriieuaiB8zNRL2AauaCm1lKTIw//b8HhMLS74AAAAAASUVORK5CYII="
	},
   {
		label:"复制此页标题",
		text:"%TITLES%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+Tjvd4NAAAAG3RSTlMAkChw4NgwYLixwEc6/gnsfRZTHcbBoZaTjmq3tyW+AAAAcUlEQVQY023ORw7EMAhAUZfggnFLpt//oOMJKJ5I+QsWTyChEixSU3v6ZbgPCNgxyHObQM9hr0JnMLKN+VZOEHNuE1xTfX3oCSmOYQ8wZO9EZYJGqIibvTh5R+/pH1wMYf1BMQyj448J1UlPhoKLBOkLdAkEdBqpoJwAAAAASUVORK5CYII="
	},
   {
    label: "复制当前页面标题",
    text: "[url=%URL%]%TITLE%[/url]",
	  image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAACkV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV51fzYpnAAAAHHRSTlMAsCigGJloA1hOQBPhxB/x+euqkX1cDG4+MtmJr1sW5wAAAJBJREFUGNNtj0kOgzAMRU2CSUMGIAND6/ufs5+GLpB4C0t+ku1veuAlAznVWP+iSGNEHyaZwto3DIRNEuxtR5DFdRcafY/Rysxv6Zg/EBtEMsppGWOktpT9LhYi+XNiLjJsVSJEmXHlyMhh8kIQVg6i6CDclE/hvL6SDtpA7BS9aUIZ4mXGI+oX1VfUji098gXLVgjd+6ZrKAAAAABJRU5ErkJggg=="
   },
	 {},
	 {
		label:"繁体转简体",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22https://raw.githubusercontent.com/skofkyo/userChromeJS/master/UserScriptLoader/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAADTIXvTIXuT0ZBWAAAAAnRSTlMAEGsk3VwAAAAcSURBVAjXY0ACWqtWQAmGTAZ0QmsFjGBqwEMAALnpDJVFI8EHAAAAAElFTkSuQmCC"
	},{
		label:"简体转繁体",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_tw%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22https://raw.githubusercontent.com/skofkyo/userChromeJS/master/UserScriptLoader/bookmarklet_tw.js%22;s.id=%22tongwenlet_tw%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAADTIXvTIXuT0ZBWAAAAAnRSTlMAEGsk3VwAAAAcSURBVAjXY0AArVUroARDJgMWQmsFjGBqwEkAALhtDJWgF/vyAAAAAElFTkSuQmCC"
	},
	{},
	 {
    label: "谷歌翻译此页面",
    url: "javascript:(function(){var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){window.open('http://translate.google.cn/translate_t?hl=zh-CN#auto|zh-CN|'+t);}else{window.open('http://translate.google.cn/translate?u='+escape(location.href)+'&hl=zh-CN&ie='+e+'&sl=auto&tl=zh-CN');};})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAk1BMVEUAAADf3+BMiu9Siu1/f89lcbmSrN/j4+PGyc5Ggux+iLjW1txXieFJivVQj/Xk5OTY2Nnd3d3K2fHn5+fT09WKm6Vkm/WDrvPg5vDW4PBrmubAw9HDyMu0vcFNXrlDVbaWprKEl6F5j5pclvWTt/O/0vGjudyYsNxbjNqPptLNzc+0t8y6v8qprsairrR0iJZkf4qJgFYiAAAADXRSTlMAsf2fCODYsJmVZVg9+ISLkwAAAI5JREFUGNNdzNcagjAMhmEKuE3a0pa93dv7vzobFQW+w/f5E8dDCtZOF37yxuD6I8ApYzPG2MpCGMQBYqq5UopzC0GEGwTMBH8DYIzbJAE46CfnBLSIdgBHY0xbE9CPEADq/F7Q4tepbaTsQ/pohJQ9cK+FEdJZ/GUvcgvf/KoqM0EnXZPyogewvJ0tiPkLHJ8OS+Ru6rkAAAAASUVORK5CYII="
   },
	 {
    label:"有道翻译此页面",
    url:"javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())",
    accesskey:"y",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
   },
   {
    label: '必应划词翻译',
    subdir: '',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAADrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzgsJJlWAAAAIXRSTlMAcBAy8Ovnjl9DOhr44MmXfHhULtjUxK+FZ1NKJyYjFgvR0A00AAAAcklEQVQY02XOVw6DMBBF0cdQbGJaIKG32f8mYQxCBu7fOxrJBko1rHDzmJP5AVw9wX9B3JkbfCjgrKgcQMt7qRovoJAl74QYoG9wB5M7F6khlbBUWvhN+7mU+RD4F5GdoYZNH5NzwlkvL9bu75cm0tfYAAOLDCrL/UQBAAAAAElFTkSuQmCC",
                oncommand: function() 
              {gBrowser.loadURI("javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");
                }
                },
	 {
		label:"在隐私窗打开此页",
		oncommand: "privateTab.readyToOpenTab(true); gBrowser.selectedTab=gBrowser.addTab(content.location);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAACUE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE78zTH2aAAAAHXRSTlMA8fjr5px4cFMrsdfOxGdGPw8G37uNgzQgpJJcFwQsLNIAAABtSURBVBjTrcw3DgIxAAXR+c72JtsbCfc/JxINokW8dqThB3Pwk5w2LzPeQqqYPVbo83FxznsR4otlvZhkDwirncgD24JJWHA8DKkQ7qRRAmlM+MjTLZ9DdQ1OF1vPIebeon3HXKTB+8GoZP7iBT6xA9r2i2aQAAAAAElFTkSuQmCC"
	 },
	 {
		label:"在侧栏中打开此页",
		oncommand:"openWebPanel(content.document.title, content.location);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAADhIVfWH0nWIEvWIEzWIEvWIEzWIEvWIEvXIEzXIEvWIEvMGk3XIErVIUrWIEvWIErWIErXIErWIEvVIk3XIkrWIEuBEAbQAAAAFnRSTlMABET42JY09e+9sacK0lWgkIlZWDwtYHL02gAAAEFJREFUGNOlyDkWgCAQBNEeaNzH3b7/UU1M5BFBZb9QW+dMhp1+fx40LkjSmfn6O65lI/SazGbFgLZDHrCN/qCiFwZ3A6vi+nj2AAAAAElFTkSuQmCC"
	 },
	 {
		label:"在谷歌快照打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%u",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAyVBMVEUAAAD9/f3////////6+fr+/v77+/v6+fn////2+f8/g/b60c4AkSTlEQCFsfj+9fVHifU0fPTN6tWZ1KRYuHHuZFjqPzH8vAX2/v/o7P9qnvj0+/b//PUabPIJYe72qqQ0qFMen0H+zyzoMCDp/P/97//B1/vu+PD97u38/+v//br/8bek2LLg35v705X0nZWy05NRqZM4mZLykYj3rYdGtnjweG7sWFkOn1Aqo0rsVEfnKS4nlhkAlRP/tADYpgD3lQDoKwDiAADzm7cHAAAACHRSTlMAmfTWlbw4L7+VJ/gAAAC4SURBVBjTZU/XFoJQDOMCatjKUkCWuPfe+/8/yjLezENPmyYdXI66KPC8INa5CgyAYVAQy7oGxI7rOrGBWtkfO5qWZdr3WGgaGJw0d6Uou6tCrgYJlp8bpRUYJ6D33lMmdTqSBAgc3223p1Q3W3KzpYPPieesJOTQJ4IsrzVZSK9HOlkYFvezCYInh0MwWts/qBfLNK1t5OdrSTKyVTVN1cfGA6tOn9tJYlsTOr2ASAOCACj6f+//AKuIDqnVGVRiAAAAAElFTkSuQmCC",
		where: 'tab'
	},
	{},	 
	 {
    label: "DOM Inspector",
    url: "javascript:void(z=document.body.appendChild(document.createElement('script')));void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://slayeroffice.com/tools/modi/modi.js');void(z.id='modi');",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbDgyaKRAAAADXRSTlMAnHZCPCQB58jCsHl1Dqe7lwAAAFtJREFUCNdjYGCI7r2xlQEIku4CgRoDA9vai7aXZW8lMPBcd+C9wFJ7gCH2CgPvBQbfqwy6AiCFjJcY5hqAGMw3Ge7evcDAwHv3LpwBl4IrhmuHGwi3Am4p3BkAYPIvrxbztWUAAAAASUVORK5CYII="
   },
	 {
		label:"查看页面信息(I)",
		command:"context-viewinfo",		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5w4Awa8AAAAFHRSTlMAB8BQEOgwIPCVPvqnYSUZA+HKcwRkwoYAAABOSURBVBjTfc45DsAwCETRwdnAa5b73zUFKTCO/MqvQQKjtQNQ2oxEoAAj/Idb6q5ODflph/pCie6Ec1wUaajNLS5xCynzPzgYTAB1MHgBho8Ci3BgkioAAAAASUVORK5CYII="
	},
	{
		label:"查看页面源代码(V)",
		command:"context-viewsource",		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAADrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzg8D1VLAAAAF3RSTlMAK7AFCeq9cuNN+teqaVZAzpuGYjgWFdbiAS0AAABWSURBVBjTrYjHAcAgDANleifd+28aJzACeki6w6LoaAAiE/VkxQ065MZKT3YGkXfjhikfQ/EFMUVEYA/cKcv1HKTJcpUrtrIlDNO39KBPFqPoOP/BmryuNgM1ZpQxKAAAAABJRU5ErkJggg=="
	},
	{},
	 {
		label:"在 IE 中打开此页",
		text:"%u",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAAYK8AYbAAYLAAYbAAYa8AYbAAX7AAarQAYbAAYbAAYbAAYbAAYbAAYa8AYbAAYbEAYbAAYbAAYbEAYrAAZbIAYK8AXbkAYa8AYrAAYLEAYLAAYLEAYLAAYq8AYq4AYbBtgDsDAAAAIHRSTlMAMJ5Y9R/5JwTl3Leud1ztpGhhWjYVEAvKxI+KgmpJPL/SG1cAAACCSURBVBjTfY9ZDsMgDESJgYQlkD3p3rn/KWuM1Kof7fux3kge2eofx5d1cxz69LZoAJPVw1bXBgKtNbDstFAL9EoY2XlMgK9BAG5a62wAWTnwQUslgKmp7CU4+9q2El2KN6Hj/rikAUiyQWpuIYxOrgzbfj1x5O/shS0/nXKN/fHyC6/TCa+2TXBRAAAAAElFTkSuQmCC"
	},
	{
    label: "在 EDGE 打开此页",
    condition: "nolink noimage noselect",
    url:"microsoft-edge:%u",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
  },
	];
	
	var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAhFBMVEXuWSHuYCv4+Pjv7+/s7OzpuqjqpYvqm33wdUjwaDXjx73nxLbreEzz8/P77uno6Ojh4eHy5N/23tX0yrrgxLnev7Pzwa7itaPwuKLotKHtspzhr5zlqJHumHfvk3Hmj27yhVzsglnxek3vckTuXSfuWyTuWiLlz8fmz8bdxr7nxrrqdUkaUO2HAAAAhklEQVQY042NRw7EIAxFbRggBNJ775l2//vNCISyzdvY/33JhjvI1W2rNGMOPZu9cLaTpKaRKbHNXpIMATAj5Q6GLQnq46iDZHPHRkqHgdLxetQ+/rQuoeALiyK2cIFGNIwr9Xx9FGeNEf4JItY6FnD6RuQaqx6gr/BrxfQuOgTArsgnuMEPaL4HF4FFOf4AAAAASUVORK5CYII=", onpopupshowing: syncHidden });
	menu(items);
}

// 页面信息右键菜单
new function () {
	var items = [
{
    label:"启动/关闭页面亮度",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAACIFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH+IFH/VnwpOAAAAHnRSTlMAqJDQe3Bl3zchFAvYrmpNx7VFPg4EvpaJX1tWNht1vxxyAAAAdElEQVQY02WO2xKDIAxEIQQViqC29e7//6ZOSNAZ9+XAZrMTlbVHTF4VubHHagqL/H2dCL1lo60yf8ERP7VEIxK+WoymvfEc/csKcplm+uC43SQq7zaJHma4NruoihpjLeTGt8G3aW2oWrQCoHsmZgAY6HkCBWQDcKSv+XgAAAAASUVORK5CYII=",
        oncommand: function(){
                var id = [24];
                var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
                for (var i = 0; i < id.length; i++){
                    var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
                    style.enabled = !style.enabled;
                    style.save();
                }
            }
    },{
    label:"启动/关闭黑夜模式",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAADYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgZrhACQAAAAH3RSTlMA5EgRtX4E7edtVhoP7+DNr4VzLPTd07uiZVxCNyQKBs81QAAAAHdJREFUGNNtjwkOhCAQBB3QRXS99r7r/79cYTyjnRDSBd2ZSfb1M22dZscVOzeImdwhnAYmcop/QDRVPl1h+/sGmQJfvQJ4QLqMJC3kY2EEouAzNhdoxL/Vfx1aWkrXN1p/AcSGJwP1lSgzhHO18+i2u1dOl9vqD2OQB1smnjbHAAAAAElFTkSuQmCC",
        oncommand: function(){
                var id = [3,11,20];
                var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
                for (var i = 0; i < id.length; i++){
                    var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
                    style.enabled = !style.enabled;
                    style.save();
                }
            }
    },{
    label: "启动/关闭阅读模式",
    id: 'reader_mode',
    condition: "normal",
    insertAfter: "RIL_context_savePage",
    onclick: "ReaderParent.buttonClick(event);",
    image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADqSURBVDiN7ZMhTsRgFIS/+bftkkBwJFgE3eDLAfDgMJDegEMQ7oDDNovcbCBYLoBYB1uDwpEQxIoW6CAWSE2DKJKRL2++zJvkyTZ9FHq5gQhgfpRkDtpvUW1zv/peXwEsouRAYqcBfe+o8fXosr6LABiQBetVNLetbLuLOBkDSL6RmYaAAeywx8AZ8AVYTh+3x/WslW72kK+sA4yK6qIduzwebjmw+XNCl4L99FsHvUv8B/wBQLaZ58NDGp8gVQDCwWgNeEbEmA3jF6GPpc2xpPO0qCbqfKYzhbKMc4A0fSs4ddOZoI96d/AJL11S0b5QEdgAAAAASUVORK5CYII="
   },{},{
		label:"自动刷新",
		url: "javascript:(function(p)%7Bopen('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3E%E7%82%B9%E5%87%BB%E5%BC%BA%E5%88%B6%E5%88%B7%E6%96%B0%3C/a%3E%3Cscript%3Efunction%20i(n)%7Breturn%20d.getElementById(n)%7Dfunction%20z()%7Bc+=0.2;if(c%3E=t)%7Bc=0;e.location=u;r++%7Dx()%7Dfunction%20x()%7Bs=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0%7C%7Cc/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22%E5%88%B7%E6%96%B0%E8%AE%A1%E6%95%B0:%20%22+r;i(3).innerHTML=%22%E5%88%B7%E6%96%B0%E5%80%92%E8%AE%A1%E6%97%B6:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)%7Dc=r=0;d=document;e=opener.top;u=prompt(%22%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%22,e.location.href);t=u?prompt(%22%E5%88%B7%E6%96%B0%E9%97%B4%E9%9A%94/%E7%A7%92%EF%BC%9A%22,300):0;setInterval(%22z()%22,200);if(!t)%7Bwindow.close()%7D%3C/script%3E%3C/body%3E')%7D)('status=0,scrollbars=0,width=240,height=160,left=1,top=1')",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEUAAAAPz28RzW4A6WERzW4RzW4RzW4RzW4RzW0RzW4A0XQRzW4RzW4RzW0RzW0QzW4RzW4Qzm4Rzm4RzW4RzW4SzG8WyG8SyG0RzW4Rzm4X0XQRzW7biIDhAAAAG3RSTlMAIdABcWT480osBeaxNtvZw7ilkISDFw7vWAtosAZMAAAAaUlEQVQY03VPSRKAIAyjyO6CiOLS///TEdGhB3rJJJ20CWvMDjVz24R4DL8GXK9mlFzJl3czh4xRjVmQypZN4BmH5fMaTA/0onArMJ61kDSiIBaB3tVHmfOGvAUGNFh/keg6WFqua/W+ASicBBNZOAX/AAAAAElFTkSuQmCC"
	},{
	label: "置顶当前窗口",
	oncommand: function() { (function() {
			if (document.getElementById('main-window').hasAttribute('ontop')) onTop = false;
			else onTop = true;
			try {
				Components.utils.import("resource://gre/modules/ctypes.jsm");
				var lib = ctypes.open("user32.dll");
				var funcActiveWindow = 0;
				try {
					funcActiveWindow = lib.declare("GetActiveWindow", ctypes.winapi_abi, ctypes.int32_t);
				} catch(ex) {
					funcActiveWindow = lib.declare("GetActiveWindow", ctypes.stdcall_abi, ctypes.int32_t);
				}

				if (funcActiveWindow != 0) {
					var activeWindow = funcActiveWindow();

					var funcSetWindowPos = 0;
					try {
						funcSetWindowPos = lib.declare("SetWindowPos", ctypes.winapi_abi, ctypes.bool, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t);
					} catch(ex) {
						funcSetWindowPos = lib.declare("SetWindowPos", ctypes.stdcall_abi, ctypes.bool, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t, ctypes.uint32_t);
					}

					var hwndAfter = -2;
					if (onTop) {
						hwndAfter = -1;
						document.getElementById('main-window').setAttribute('ontop', 'true');
					} else document.getElementById('main-window').removeAttribute('ontop');
					funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19);
				}
				lib.close();

			} catch(ex) {
				alwaysontop_log(ex);
			}
		})()
	},
	image: " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAADXHwbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbZHQfYHgbYHgbYHgbYHgbYHgbYHgb5N1jqAAAAFHRSTlMAyIgK0BK9LfXrQuXYqHIj8ME3AaVkeVIAAABVSURBVBjTjYxJCoAwEARbTYyazSX/f6tDE8woCCnoQ9Wh0UEaFUlCKIogIQ6KiF8m+/HD2JfPpbAoZ1G+rCzNN8fSHHiK2+ksPkM4vTiLyfUElUt2AxAoBHEEEmjiAAAAAElFTkSuQmCC"
},{label: '百度站內搜索', 
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAAAAYbAAYLAAYbEAYa8AYa8AXbkAYbAAYbEAYbAAYbAAYbAAYbAAYbAAYbEAYLEAYa8AYa8AX68Aa78AYLAAYbAAYLAAYbEAYLEAYq8AYLEAYLEAYLMAZrMAYbBIDO7RAAAAHnRSTlMA5T3dsHYL1uzP9pLyypdjWR8QBt7bpImCfW9SKBSqMIPJAAAAf0lEQVQY022PSRLDIAwEJQzGeHecfen/PzNgyIn0bVo1SMhfWmdVrWt/2TQcNKbkFDp8B4dp0/y6Xz4vaFLLpfkgflsAF4WF566BPtzBRqGwiA7reZUJzaL3s8g2mB7NFW4SeY+xUh49SeIBLq8ds5jj2nJYF7yfApjq9PpzNV+MWwnu4tN0wQAAAABJRU5ErkJggg==",
		oncommand:function () {gBrowser.loadURI("javascript:(function(){ p=prompt('%E5%9C%A8 '+document.location.href.split('/')[2]+' %E4%B8%AD%E6%90%9C%E7%B4%A2',''); if(p){ document.open('http://www.baidu.com/s?wd=site:'+document.location.href.split('/')[2]+' '+p,'','')} })();")  }   },{
				label : '谷歌站内搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAyVBMVEUAAAD9/f3////////6+fr+/v77+/v6+fn////2+f8/g/b60c4AkSTlEQCFsfj+9fVHifU0fPTN6tWZ1KRYuHHuZFjqPzH8vAX2/v/o7P9qnvj0+/b//PUabPIJYe72qqQ0qFMen0H+zyzoMCDp/P/97//B1/vu+PD97u38/+v//br/8bek2LLg35v705X0nZWy05NRqZM4mZLykYj3rYdGtnjweG7sWFkOn1Aqo0rsVEfnKS4nlhkAlRP/tADYpgD3lQDoKwDiAADzm7cHAAAACHRSTlMAmfTWlbw4L7+VJ/gAAAC4SURBVBjTZU/XFoJQDOMCatjKUkCWuPfe+/8/yjLezENPmyYdXI66KPC8INa5CgyAYVAQy7oGxI7rOrGBWtkfO5qWZdr3WGgaGJw0d6Uou6tCrgYJlp8bpRUYJ6D33lMmdTqSBAgc3223p1Q3W3KzpYPPieesJOTQJ4IsrzVZSK9HOlkYFvezCYInh0MwWts/qBfLNK1t5OdrSTKyVTVN1cfGA6tOn9tJYlsTOr2ASAOCACj6f+//AKuIDqnVGVRiAAAAAElFTkSuQmCC",
				oncommand :function () {
				gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('https://www.google.com/search?num=30&hl=zh-CN&newwindow=1&q='+q+'&sitesearch='+Bar+'');window.open(qlocation);}%20void%200");
				} },{
    label: "收藏到百度云",
    url: "javascript:void%20(function(d)%20{var%20e%20=%20d.createElement('script');e.byebj=true;e.src%20=%20'http://s.wenzhang.baidu.com/js/pjt/content_ex/page/bookmark.js?s=bm&t='%20+%20(+new%20Date());var%20b%20=%20d.getElementsByTagName('body')[0];b.firstChild%20?%20b.insertBefore(e,%20b.firstChild)%20:%20b.appendChild(e);}(document));",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAAzR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18zR18FO00yAAAAIXRSTlMA+uwH71RMPzInF+jUzbSIeTj18cW7kXEtIAQC4K2cWEUwQy8tAAAAi0lEQVQY04WORxLDMAwDQVmyorj3lob/fzL0ONH45r0RA+4AP5IVZ269tOVyuoVZR3OPwcB6TV4cY2BtAiws/j5H0banmWYotSU5+DQnKZUKaarKUMmnOmOKngFI9X7om2OJzG6qEdqw60yBkm5viD8WzfAiz7EVTXeaBnirsfvgoMgBbI2Lo0PAJV+tRAgwjW+4YgAAAABJRU5ErkJggg=="
},{},
	{
		label:"全页面截图",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAAWquQXrOQXq+QXq+IXq+MXq+MXquMXrOMWq+IQr98gn98XrOMXq+MXq+MXrOQWrOUVquMWq+MXq+MXrOMXq+MXrOMYq+MYq+MWquMZrOQSrOQAqv8Yq+IVquEXq+PCw4EwAAAAH3RSTlMAJN4dK+rax5NzEAjj1NNhOhi0rKWgnIt3TzINA2o8dgr2XAAAAIRJREFUGNNtj1sWgyAMRIcAAiIvtfXZsv9d1mo5bT3en8xk5iPBBfYsO1E8645RMfyL0LDdN49Sbd8bTi0KSRLnJBNQmHJV5Qk/3HO+fd1s+EK0cDN/UjVQiDHQoPZWohXCAU5gJQ4gKqCW1soaUE9seCN6DeheGHdcrP24pfXoNbv4/QUStgTZ12T0ZgAAAABJRU5ErkJggg==",
		oncommand: function () {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = content.document.documentElement.scrollWidth;
			canvas.height = content.document.documentElement.scrollHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
		}
	},
	{
	label:'可见区域截图',
	oncommand:function() {var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");canvas.width = content.innerWidth;canvas.height = content.innerHeight;var ctx =canvas.getContext("2d");ctx.drawWindow(content,content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);},
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAACdVbidVbidVbidVbidVbidVbiEMAvcAAAABnRSTlMAUGgZKiDv1WOpAAAANUlEQVQI12NgEGMAAwRDEAyEGRjSwCARKGQIEgcxxChkAM1LSkxjYAhSUlJSSRQECkGk4AwACMoLv6oCxP0AAAAASUVORK5CYII="},	
	{
	label:'整个界面截图',
	oncommand:function() {var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");canvas.width = innerWidth;canvas.height = innerHeight;var ctx = canvas.getContext("2d");ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);},
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAHlBMVEUAAAARzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW7NR7iVAAAACXRSTlMAB7jp0fCV2eEVrE/YAAAAT0lEQVQI12NgFBQUAGEGyZkzHVhmzpzIIGmklMCmpAxkKDAAARMKgyM0tADIEElgnTnTgM0RKAxiACkYAy4FVMxubOzAhGkOwgq4pXBnAADZvxhssJ2QOgAAAABJRU5ErkJggg=="},{},
		{
		label: "宽度匹配",
		url: "javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAAYa8AYq8AYbAAYbAAYK8AYLMAYrAAYbAAYbAAYbAAYbAAYbAAdLoAYbAAYq8AYbAAYbEAY64AZLIAYrEAYbEAYbAAYrAAYrAAYa8bDy+zAAAAGnRSTlMAkIDY6EAoiPfBRrKYBc59ZFEsIRrGqKJrWQkcO+gAAABaSURBVBjTjc3bCoAgDIBhndV0nvLQ6f1fNCMTgiC/u/1jjHXIWjQ6l+AFjRUJXwIH1gD/Dna+x6MGVBKRiBup8QnrFoIxcsH3yW6Bd30BF6cqumuZ1NCoxP6dqdIDNZum9xQAAAAASUVORK5CYII=",
	}, {
		label: "破解右键防复制",
		url: "javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEUAAAAAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5zmoAS0AAAAG3RSTlMAefjg1qFjVRUOf3AxB/GxiXVbT0rmmmhAIcOPiTMyAAAAeElEQVQY01XORw7DMAxEUaoXq0ZyC+9/zwCxScN/x7fhwFWGVzN2ET1wn5m69S3QnaObEJoXBOkQ0OzpGI7RQdVgGYKxSVVxMsA+XNFxS8BZU7Tc1l14JlWlQYPL/dcFpVCjJvD4XfHfQlMRGd7igBpaSllMZnj6ASb0BtvTkEVKAAAAAElFTkSuQmCC",
    },{
    label: "短网址到剪切板(百度)",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZhr351HAAAAGXRSTlMABw/5FuOBWE9K9Nu/eR+tomI4KdSUiEQzwz9QEAAAAHlJREFUGNNdy0cSxDAMA0FSonJw2oT/f3RlhYvnhq4C4RGB74RHqgG1vLZ0bELEE3aYqlEWXGyRf8Ax4auNlMq2SBjwAU5iJjJ4d/CIEox2DOQOdFYHQLsNdgAFjS6KOvTdxU/ImKUJ+4LXBEnRJBPXRa0uUUoaPPoDbV4MzgcXFAYAAAAASUVORK5CYII=",
    oncommand: function() {
        var url = addMenu.convertText("%RLINK_OR_URL%");
        var form = new FormData();
        form.append('url', url);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://dwz.cn/create.php", true);
        xhr.onload = function() {
            var obj = JSON.parse(xhr.responseText);
            addMenu.copy(obj.tinyurl);
        }
        xhr.send(form);
    }
},
    {},
	{
		label:"编辑当前网页",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAqpRUqpRUqpRUqpRUuog8qpRQqpRUppRQrpRUqphYppBUqpxcqpRVwq5PiAAAADXRSTlMAB/iemhGWy69gXFc3jJ+93AAAAFZJREFUCNdjQAOeDAxCSkpKDMx3FzDICgoKMoTfTWCQBUowt5YxgBm2NwJADKCKawxghu1dBxADKHCFQQjEOAsUkAUx9l4GkhBdaAxBEIgFMu6CAcJ+AK1jFmx3UqdsAAAAAElFTkSuQmCC",
		oncommand: 'content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";'
	},
	{
    label: "复制扩展清单",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAADrUDjrUDjrTjjqTzjsTzjqTjTrTzjrTzjrTzjsTjfqUDfvUED/Vi3rTznrTzjrTzjrUDfsTjnqTjnpUTbtTTXtTzXrTjvrTzgTjt/vAAAAGHRSTlMAgKDA7KsT85BYQSMQA+a1l31sSC8rHRqoqqGzAAAAVElEQVQY053LRw7AMAgEwMVxL+nt/y+NHSF89yAhtACGGBIGDaEU3hH33bfD7BMH26xXwNbiIKnlQohHkJczAne2jwS/Puq3cq51LaupAjpSFWHQBzj6AmEdre69AAAAAElFTkSuQmCC",
    oncommand: function() {
        Application.getExtensions(function(extensions) {
            var actives = [],
                unActives = [];
            extensions.all.forEach(function(item) {
                var arr = item._item.isActive ? actives : unActives;
                arr.push(item._item.name);
            });

            var str = '目前启用的：\n';
            str += actives.map(function(name, i) {
                return i + 1 + ": " + name;
            }).join('\n');
            str += '\n\n目前禁用的：\n';
            str += unActives.map(function(name, i) {
                return i + 1 + ": " + name;
            }).join('\n');

            addMenu.copy(str);
        });
    }
}, 
{
    label: "复制用户脚本清单",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAACdVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbizk5WjAAAAG3RSTlMAINjQJxDJNfznTYgXBgH1u4At8NzFmmNSRNLmvcDFAAAAdklEQVQY003PSQ7DIBBE0cIYusHM8ZTc/6CRWiD1X75FSQVEbyXfEyQbd4k4fAU2A8l9SEQBKCQNHELtCopzbvwmPDeedhHMNuHwhvubNLh6EhRc2Bu/C0pudx75PBYMDkSVvVlQUgGyg9qQBOa5VbSY92c+4g+UswS9qFScSQAAAABJRU5ErkJggg==",
    oncommand: function() {
        Cu.import("resource://gre/modules/AddonManager.jsm");

        AddonManager.getAddonsByTypes(['greasemonkey-user-script', 'userscript'], function(aAddons) {
            var downURLs = [];
            aAddons.forEach(function(aAddon) {
                var name, downURL;
                if (aAddon._script) { // Greasemonkey
                    name = aAddon._script.name;
                    downURL = aAddon._script._downloadURL;
                } else { // Scriptish
                    name = aAddon._name;
                    downURL = aAddon._downloadURL;
                    if (!downURL && item._updateURL) {
                        downURL = item._updateURL.replace(/\.meta\.js$/, '.user.js');
                    }
                    if (!downURL && item._homepageURL) {
                        downURL = item._homepageURL;
                    }
                }

                downURLs.push(name + '\n' + downURL);
            });
            Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).
            copyString(downURLs.join('\n\n'));
        });
    }
},{
		label:"查找适合此网站的样式",
		oncommand: "stylishOverlay.findStyle(event)",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAAAAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5zEob56AAAAGHRSTlMAIBAYiPfHuLGUgHRuJQsDz6J/aVVHQi6T8H84AAAAVUlEQVQY013LSRKAIBBDURBEZpzt+59Uq6XA+JevEvGkZE0JLlDLM0wdzB9GPsUPSJ7koZYtw1tanXa6dJiTgIoR2EESIdKJoGlHWGhDsBQQLq8QWjdCNAXkyywWlQAAAABJRU5ErkJggg=="
	},{
		label:"为此页搜索油猴脚本",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAACdVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbghMf7fAAAAHXRSTlMAgKBYmHdhiAjspW9PPjIDr5B8RCvVysO5XCgUmmhTZ40AAABySURBVBjTdcttD0QwEATgUUrfq1ocd///d162lkTC82GTnczg4FvmOJCC/fAmbn21AXDJWKW6QwKMyMHOO0420Q1L9A2ZsHxBxt0PpMGMashgKzdU5klr6HcGXlbAtPau07rgUqws6qMDbh6SUeAuRpA/lwoE0cp1lhYAAAAASUVORK5CYII=",
		oncommand: function () {
			var domain = content.location.hostname;
			gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:userscripts-mirror.org%20' + domain);
			gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:greasyfork.org%20' + domain);
		}
	}];
	var menu = PageMenu({
		label: "多功能菜单",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEXfACT9/f3s7Oze3t7fNFDgCiz58PLb0tTrt7/ldojiME3gJEPjK0ngCCv34eTbxcjqqbPla3/kO1bgEzRw/FxuAAAATklEQVQY053IOQ4AIQgAQLwVvP3/XzcBSouNUw48MQa3URw91hpF52gBIIgGVzMTZTE5rMVtFccq5xSx4Ap9C14gh3PVO8UxElESA374AGaAAuOwvDUhAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//复制链接文本地址
new function () {
	var items = [
	{
		label:"复制链接文本+URL",
		text:"%LINK_TEXT%\n%l",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAADUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nUI3nwhPrKAAAAJXRSTlMAOPJCPAbVovv1nYGIVjIW7ODBuqqYd29sZVNPLSMNAs7Fs2RGcozENwAAAJZJREFUGNMtzFUWwzAMRFHJECdxGBpooDT732JN9+/5eESe3qtxqOqLEs4Q9DL2gigHrO8mDym4zQDp9llq3txLf5FC8GSBrc1R0wNBOVvBCqho8v+lNbpkJYCRTNiXepp31/jQCigWxqSpJQZYFoJ/6TjdA7pD+r2XaaKzQNfI2HlDTl0gKb4UnO/Yr4OSm9fSLEqT8wc1jRNl3suWQQAAAABJRU5ErkJggg=="
	},
	{
		label:"复制链接地址(A)",
		command:"context-copylink",		
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAqpRUqpRUqpRUqpRXOcSRkAAAABHRSTlMAgDbD2dd/ZQAAADRJREFUCNdjYGBxAQEHBhYRXAyQGmclE4iIE4MKKgMihWKOEYMyhKHAwARhMDAwoKrBxQAAkOYXUkSJqx8AAAAASUVORK5CYII="
	},
	{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAAXq+MXq+MXq+MXrOQdouAXq+QXq+MXq+MXrOMXq+UXq+MXq+MXq+MWq+MWq+MXq+QRp9wXq9wWq+MXq+MXq+MZreIXq+MXq+MepeEXq+MXq+QVquMXquMWqOIXq+PQjTVrAAAAH3RSTlMAiJBQOAhw+MiQF7Du1Ll6aQ4FwIJdPjYZEcmeSC0jIuxLBQAAAHVJREFUGNNtzNkOAiEMQNECBbWyz+7G//+lTDFmJuE8NM1NWsiISI9S+RVxyTDW1ZSdDXUEkJ5Ih3tlEq2DACngQO4h2m24srkFfOYF2Qaye0IKdPMLYyF7YaqFNMNf/8fL62jYp4XJJXFj7/6JUwdOQCwn0xfuAgiWhmxs2gAAAABJRU5ErkJggg=="
	},
	{
    label: "复制链接文本（左中右三键）",
    tooltiptext: "左键:BBCode|中键:MD代码|右键:普通",
    onclick: function(event) {
        var formats = [
            "[url=%RLINK_OR_URL%]%RLT_OR_UT%[/url]",
            "[%RLT_OR_UT%](%RLINK_OR_URL%)",
            "%RLT_OR_UT%\n%RLINK_OR_URL%",
        ];
        var str = addMenu.convertText(formats[event.button]);
        addMenu.copy(str);
        if (event.button === 1) { // 中键点击后自动关闭菜单
            document.getElementById("contentAreaContextMenu").hidePopup();
        }
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAARldultAWLAAAAAXRSTlMAQObYZgAAACNJREFUCNdj+P8BhA4YMBxgYDj/H4TOMCPQGzDiASP+/0AEANqYEH9au1VgAAAAAElFTkSuQmCC"
},

	{},{
    label: "短网址到剪切板(百度)",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZgAQZhr351HAAAAGXRSTlMABw/5FuOBWE9K9Nu/eR+tomI4KdSUiEQzwz9QEAAAAHlJREFUGNNdy0cSxDAMA0FSonJw2oT/f3RlhYvnhq4C4RGB74RHqgG1vLZ0bELEE3aYqlEWXGyRf8Ax4auNlMq2SBjwAU5iJjJ4d/CIEox2DOQOdFYHQLsNdgAFjS6KOvTdxU/ImKUJ+4LXBEnRJBPXRa0uUUoaPPoDbV4MzgcXFAYAAAAASUVORK5CYII=",
    oncommand: function() {
        var url = addMenu.convertText("%RLINK_OR_URL%");
        var form = new FormData();
        form.append('url', url);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://dwz.cn/create.php", true);
        xhr.onload = function() {
            var obj = JSON.parse(xhr.responseText);
            addMenu.copy(obj.tinyurl);
        }
        xhr.send(form);
    }
},
	{
		label:"搜索链接文本",
		url:"https://www.google.com/search?q=%LINK_TEXT%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC",
		where: 'tab'
	}];
	var menu = PageMenu({ condition:'link', insertBefore:'context-openlink', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAhFBMVEXuWSHuYCv4+Pjv7+/s7OzpuqjqpYvqm33wdUjwaDXjx73nxLbreEzz8/P77uno6Ojh4eHy5N/23tX0yrrgxLnev7Pzwa7itaPwuKLotKHtspzhr5zlqJHumHfvk3Hmj27yhVzsglnxek3vckTuXSfuWyTuWiLlz8fmz8bdxr7nxrrqdUkaUO2HAAAAhklEQVQY042NRw7EIAxFbRggBNJ775l2//vNCISyzdvY/33JhjvI1W2rNGMOPZu9cLaTpKaRKbHNXpIMATAj5Q6GLQnq46iDZHPHRkqHgdLxetQ+/rQuoeALiyK2cIFGNIwr9Xx9FGeNEf4JItY6FnD6RuQaqx6gr/BrxfQuOgTArsgnuMEPaL4HF4FFOf4AAAAASUVORK5CYII=", onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//打开链接的各种方法
new function () {
	var items = [
	{
    label:"在新标签页打开",
	  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAG1BMVEUAAAAAYbIAYbEAYrIAYbIAYrEAYrEAXrEAYbInqzZyAAAACHRSTlMA27iidDQNLkwaUfUAAAAwSURBVAjXY0CADhBoQGU0oDFABC4pIMDJUNeAMFoYWMCMxgAGhkAQwwyI2QwQjgAAdSok5ictvP0AAAAASUVORK5CYII=", 
	  oncommand: "gContextMenu.openLinkInTab(event);",},

		{ label:"在谷歌快照打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%l",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAyVBMVEUAAAD9/f3////////6+fr+/v77+/v6+fn////2+f8/g/b60c4AkSTlEQCFsfj+9fVHifU0fPTN6tWZ1KRYuHHuZFjqPzH8vAX2/v/o7P9qnvj0+/b//PUabPIJYe72qqQ0qFMen0H+zyzoMCDp/P/97//B1/vu+PD97u38/+v//br/8bek2LLg35v705X0nZWy05NRqZM4mZLykYj3rYdGtnjweG7sWFkOn1Aqo0rsVEfnKS4nlhkAlRP/tADYpgD3lQDoKwDiAADzm7cHAAAACHRSTlMAmfTWlbw4L7+VJ/gAAAC4SURBVBjTZU/XFoJQDOMCatjKUkCWuPfe+/8/yjLezENPmyYdXI66KPC8INa5CgyAYVAQy7oGxI7rOrGBWtkfO5qWZdr3WGgaGJw0d6Uou6tCrgYJlp8bpRUYJ6D33lMmdTqSBAgc3223p1Q3W3KzpYPPieesJOTQJ4IsrzVZSK9HOlkYFvezCYInh0MwWts/qBfLNK1t5OdrSTKyVTVN1cfGA6tOn9tJYlsTOr2ASAOCACj6f+//AKuIDqnVGVRiAAAAAElFTkSuQmCC",
		where: 'tab'
	},
	{},
	{ command: 'context-copyemail' },
	{
		label:"在隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAACUE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE7+UE78zTH2aAAAAHXRSTlMA8fjr5px4cFMrsdfOxGdGPw8G37uNgzQgpJJcFwQsLNIAAABtSURBVBjTrcw3DgIxAAXR+c72JtsbCfc/JxINokW8dqThB3Pwk5w2LzPeQqqYPVbo83FxznsR4otlvZhkDwirncgD24JJWHA8DKkQ7qRRAmlM+MjTLZ9DdQ1OF1vPIebeon3HXKTB+8GoZP7iBT6xA9r2i2aQAAAAAElFTkSuQmCC"
	},
	{
		label:"在侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAADhIVfWH0nWIEvWIEzWIEvWIEzWIEvWIEvXIEzXIEvWIEvMGk3XIErVIUrWIEvWIErWIErXIErWIEvVIk3XIkrWIEuBEAbQAAAAFnRSTlMABET42JY09e+9sacK0lWgkIlZWDwtYHL02gAAAEFJREFUGNOlyDkWgCAQBNEeaNzH3b7/UU1M5BFBZb9QW+dMhp1+fx40LkjSmfn6O65lI/SazGbFgLZDHrCN/qCiFwZ3A6vi+nj2AAAAAElFTkSuQmCC"
	},
	{},
	{
		label: "迅雷云播放",
    condition: "link",
    position: 1,
    tooltiptext: "左键：新标签页打开链接\n中建：复制链接地址\n右键：用迅雷云播放此链接",
    onclick: function(e) {
    switch(e.button) {
    case 0:
    gBrowser.addTab(addMenu.convertText("%RLINK%"));
    closeMenus(this);
    break;
    case 1:
    addMenu.copy(addMenu.convertText("%RLINK%"));
    closeMenus(this);
    break;
    case 2:
    gBrowser.selectedTab = gBrowser.addTab("http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=" + addMenu.  convertText("%RLINK_OR_URL%"));

    closeMenus(this);
    break;
    }
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbAAYbCCrSv+AAAAEnRSTlMA36t18mMeCKb66ny+TEI3GBE4Hr2EAAAAYklEQVQY02WPWQ7AIAhEB1Crtav3P2wjSmPC+5oMDAs6SZiIJWESQ1NChJLbT9Z6W4hA0v5zn6kEUbE9x3AEPAygqmCQGbh6jBZDihoWeYdgG3qTDR1ra7G17jB3unvOvf8B1yQK+MugSzgAAAAASUVORK5CYII="
    },
	{
		label:"在 IE 中打开",
		text:"%l",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAAYK8AYbAAYLAAYbAAYa8AYbAAX7AAarQAYbAAYbAAYbAAYbAAYbAAYa8AYbAAYbEAYbAAYbAAYbEAYrAAZbIAYK8AXbkAYa8AYrAAYLEAYLAAYLEAYLAAYq8AYq4AYbBtgDsDAAAAIHRSTlMAMJ5Y9R/5JwTl3Leud1ztpGhhWjYVEAvKxI+KgmpJPL/SG1cAAACCSURBVBjTfY9ZDsMgDESJgYQlkD3p3rn/KWuM1Kof7fux3kge2eofx5d1cxz69LZoAJPVw1bXBgKtNbDstFAL9EoY2XlMgK9BAG5a62wAWTnwQUslgKmp7CU4+9q2El2KN6Hj/rikAUiyQWpuIYxOrgzbfj1x5O/shS0/nXKN/fHyC6/TCa+2TXBRAAAAAElFTkSuQmCC"
	},
	{
    label: "在 EDGE 中打开",
    condition: "link noimage",
    url:"microsoft-edge:%l",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
  },
	];
	var menu = PageMenu({ condition: 'link', insertBefore:'context-openlink', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEX/swj/tAz9uiP/txb8vjDt3rv6vTX+vCf48eD069f16cz26cvy5MP96r/x4b7+6rzq1qjy26ft2Kfk0KLzxFr1wEj7w0f5vzvz6M7k3c3x5cz97cjt4sjr38bo3cPj17zk1rX85bD85LDi0q7k0KPs1aL835/+3ZP4143+2Yb50375x1b2wEj4wkf/wDT/uR4yOZsVAAAAcklEQVQY043INwKDQAwF0S+0sGQw0TlnG7j/7YBCqpluHpY1vHZZlnxYnq8XC/TJU8D4BGawrxDROwq/FAjYuAkdG5i1gBP/VkDabhXSZgLX2yu4XTHDQSH/P4DCHCFRlQOEDbT2VAPVGRrVt3tZeljUCB3xBapzD+WQAAAAAElFTkSuQmCC", onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
},

//复制文本
new function () {
	var items = [
	{
		label:"复制(C)",
		command:"context-copy",		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAABWq+RYq+NWq+RWrORVq+VWrORWq+RXrORSreZSreRWq+Q/s+emAAAAC3RSTlMAgECoi2mF25kfHNYHYI4AAAA+SURBVAjXY8ACAgUFBRUWAxkCQMxWCSSEBAUFsh0gIoxbGMAiQtFODBCRVkawCFCXIlSEAYeIIVBEmAEfAAA3mwZYBP1lEQAAAABJRU5ErkJggg=="
	},
	{
		label:"复制纯文本",
		text:"%SEL%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+Tjvd4NAAAAG3RSTlMAkChw4NgwYLixwEc6/gnsfRZTHcbBoZaTjmq3tyW+AAAAcUlEQVQY023ORw7EMAhAUZfggnFLpt//oOMJKJ5I+QsWTyChEixSU3v6ZbgPCNgxyHObQM9hr0JnMLKN+VZOEHNuE1xTfX3oCSmOYQ8wZO9EZYJGqIibvTh5R+/pH1wMYf1BMQyj448J1UlPhoKLBOkLdAkEdBqpoJwAAAAASUVORK5CYII="
	},
	{
		label:"复制 BBCode",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAAARzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW7vBzEjAAAAHHRSTlMAQKAngHMYkBvz3HdtUwHGvZghzo1dMw8I065GJ4RV2gAAAH9JREFUGNNVzlkOwyAMRVFIgIaxgWbo8Pa/ztoySMmVsOTzgay4U/eKkjR637dAM81xwMqyP6RYvMdMMIVoqYqpaIFVcQeQblAWYzo8aYSsVLoCkjsvEDyAage81C9jy4e1A2iA/rBmF/jQiDM9U70c5tzCbYY2Bow6zHrUaPsDm1cIbWEeA8kAAAAASUVORK5CYII=",
		oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			function HTMLtoBBCode(a){function b(k,g,j,h,f){this.pos=k;this.font=g;this.face=j;this.size=h;this.color=f}fl=new b(50);fc=new b(50);al=new b(50);function e(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){m=h.indexOf(">",l);fl[g]=new b(0,0,0,0,0);fl[g].pos=l;fl[g].font=1;k=h.substring(l,m);if(k.search(/FACE/)!=-1){fl[g].face=1}else{fl[g].face=0}if(k.search(/SIZE/)!=-1){fl[g].size=1}else{fl[g].size=0}if(k.search(/COLOR/)!=-1){fl[g].color=1}else{fl[g].color=0}l++;g++}}for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fc[f]=new b(0,0,0,0,0);fc[f].pos=l;fc[f].font=1;for(ii=g-1;ii>=0;ii--){if(fl[ii].pos<l){if(fl[ii].font==1){fl[ii].font=0;fc[f].color=fl[ii].color;fc[f].size=fl[ii].size;fc[f].face=fl[ii].face;ii=-1}}}l++;f++}else{fc[f]=new b(0,0,0,0,0);fc[f].font=0}}}function d(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){m=h.indexOf(">",l);al[g]=new b(0,0,0,0,0);al[g].font=1;k=h.substring(l,m);if(k.search(/MAILTO:/)!=-1){k=k.replace(/<A HREF=MAILTO:/,"");k=k.replace(/\"/,"");k=k.replace(/\'/,"");al[g].pos=1;k=k.toLowerCase();al[g].face=k}else{al[g].pos=2}l++;g++}else{al[g]=new b(0,0,0,0,0);al[g].pos=0}}}e(a);a=a.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");a=a.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");a=a.replace(/ = /gi,"=");a=a.replace(/=\"/gi,"=");a=a.replace(/=\'/gi,"=");a=a.replace(/<param name=movie[^>]*value=/gi,"<movie=");a=a.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");a=a.replace(/<A\s*HREF/i,"<A HREF");d(a);a=a.replace(/<BR>/gi,"\r");a=a.replace(/<BR(.*?)\/>/gi,"\r");a=a.replace(/<P>/gi,"\r\r");a=a.replace(/<P [^>]*>/gi,"\r\r");a=a.replace(/<CODE>/gi,"[code]");a=a.replace(/<\/CODE>/gi,"[/code]");a=a.replace(/<BLOCKQUOTE>/gi,"[quote]");a=a.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");a=a.replace(/<UL[^>]*>/gi,"[list]");a=a.replace(/<\/UL>/gi,"[/list]");a=a.replace(/<OL[^>]*>/gi,"[list=1]");a=a.replace(/<\/OL>/gi,"[/list]");a=a.replace(/<LI>/gi,"[*]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<BIG>/gi,"[b]");a=a.replace(/<\/BIG>/gi,"[/b]");a=a.replace(/<B>/gi,"[b]");a=a.replace(/<\/B>/gi,"[/b]");a=a.replace(/<U>/gi,"[u]");a=a.replace(/<\/U>/gi,"[/u]");a=a.replace(/<I>/gi,"[i]");a=a.replace(/<\/I>/gi,"[/i]");a=a.replace(/<EM>/gi,"[i]");a=a.replace(/<\/EM>/gi,"[/i]");a=a.replace(/<h\d>/gi,"\r\r[b]");a=a.replace(/<\/h\d>/gi,"[/b]");a=a.replace(/&nbsp;/gi," ");a=a.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");a=a.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");a=a.replace(/<STRONG>/gi,"[b]");a=a.replace(/<\/STRONG>/gi,"[/b]");a=a.replace(/<TR[^>]*>/gi,"\r");a=a.replace(/<TD[^>]*>/gi," ");a=a.replace(/<TH[^>]*>/gi," ");a=a.replace(/<\/TR>/gi," ");a=a.replace(/<\/TD>/gi," ");a=a.replace(/<\/TH>/gi," ");a=a.replace(/<FONT SIZE=/gi,"[size=");a=a.replace(/<FONT color=/gi,"[color=");a=a.replace(/ color=/gi,"][color=");a=a.replace(/ size=/gi,"][size=");var c;for(i=0;fc[i].font!=0;i++){c="";if(fc[i].color==1){c=c+"[/color]"}if(fc[i].size==1){c=c+"[/size]"}a=a.replace(/<\/FONT>/i,c)}for(i=0;al[i].pos!=0;i++){if(al[i].pos==2){a=a.replace(/<A HREF/i,"[url");a=a.replace(/<\/A>/i,"[/url]")}if(al[i].pos==1){a=a.replace(/<A HREF[^<]*<\/A>/i,al[i].face)}}a=a.replace(/<[^>]*>/g,"");a=a.replace(/>/g,"]");a=a.replace(/\'>/g,"]");a=a.replace(/\">/g,"]");a=a.replace(/\']/g,"]");a=a.replace(/\"]/g,"]");a = a.replace(/\[url\=([^\]]+?)\]|\[img\](.+?)\[\/img\]/g, function($0,$1,$2){if($0.indexOf("http://")<0){var u = $1||$2,b="/";if(u){if(/^\.?\//.test(u)) b = "";return $0.replace(u,content.location.origin+b+u)}}else{return $0}});return a};
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(HTMLtoBBCode(div.innerHTML));
		}
	}];
	
	var menu = PageMenu({ condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden });
	menu(items);
	//page({ condition:'select', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
	});
};

//图片
new function () {
	var items = [
	/*{
		label:"复制图像(Y)",
		command:"context-copyimage-contents",		
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+Tjvd4NAAAAG3RSTlMAkChw4NgwYLixwEc6/gnsfRZTHcbBoZaTjmq3tyW+AAAAcUlEQVQY023ORw7EMAhAUZfggnFLpt//oOMJKJ5I+QsWTyChEixSU3v6ZbgPCNgxyHObQM9hr0JnMLKN+VZOEHNuE1xTfX3oCSmOYQ8wZO9EZYJGqIibvTh5R+/pH1wMYf1BMQyj448J1UlPhoKLBOkLdAkEdBqpoJwAAAAASUVORK5CYII="
	},*/
	{
	  label:"复制GIF",
    command: 'context-copyimage-contents',
    tooltiptext: "左键：复制静态&动态图\n右键：复制动态图",
  condition: 'image',
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+Tjvd4NAAAAG3RSTlMAkChw4NgwYLixwEc6/gnsfRZTHcbBoZaTjmq3tyW+AAAAcUlEQVQY023ORw7EMAhAUZfggnFLpt//oOMJKJ5I+QsWTyChEixSU3v6ZbgPCNgxyHObQM9hr0JnMLKN+VZOEHNuE1xTfX3oCSmOYQ8wZO9EZYJGqIibvTh5R+/pH1wMYf1BMQyj448J1UlPhoKLBOkLdAkEdBqpoJwAAAAASUVORK5CYII=',
  onclick: function (event) {
    if (event.button === 0) {
      var copyimage = document.querySelector('#context-copyimage-contents');
      copyimage.addEventListener('command', function () {
        var selection = content.getSelection();
        var ranges = [
        ];
        for (var i = 0; i < selection.rangeCount; i++)
        ranges.push(selection.getRangeAt(i));
        var range = document.createRange();
        range.selectNode(document.popupNode);
        selection.removeAllRanges();
        selection.addRange(range);
        goDoCommand('cmd_copy');
        selection.removeAllRanges();
        for (i in ranges)
        selection.addRange(ranges[i]);
      }, false);
    } 
    else if (event.button === 2) {
      var Cc = Components.classes;
      var Ci = Components.interfaces;
      var trans = Cc['@mozilla.org/widget/transferable;1'].createInstance(Ci.nsITransferable);
      var str = Cc['@mozilla.org/supports-string;1'].createInstance(Ci.nsISupportsString);
      var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
      var partialPath = '\\Cache2\\' + ( + new Date) + '.gif';
      try {
        var completePath = Cc['@mozilla.org/preferences-service;1'].getService(Ci.nsIPrefService).getCharPref('browser.cache.disk.parent_directory') + partialPath;
      } catch (e) {
        var completePath = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get('ProfLD', Ci.nsILocalFile).path + partialPath;
      }
      file.initWithPath(completePath);
      Cc['@mozilla.org/embedding/browser/nsWebBrowserPersist;1'].createInstance(Ci.nsIWebBrowserPersist).saveURI(Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService).newURI(gContextMenu.mediaURL || gContextMenu.imageURL, null, null), null, null, null, null, file, null);
      str.data = '<img src="file:///' + completePath + '">';
      trans.setTransferData('text/html', str, str.data.length * 2);
      Cc['@mozilla.org/widget/clipboard;1'].createInstance(Ci.nsIClipboard).setData(trans, null, 1);
    }
  }
},
  	{
    label:"复制图片地址",
	  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGPSURBVDiNpZOxa1NRGMXP+foupOBQ6KKQQTD/QHESFAchT5xEwou0UExSagcHV3ET0X/BgrkBcUlTOr8EFMQuHdp/wLXQLp2EUrgv97iYBwkVAznb93HPj+8cuJSERWQLuQEkAPDl2bfV4IotipzHJEouJJ83Dx5dJAAQlkKDkbeF+AMAQDpI4V8Aig/DUmgA2E0AgEZCOnIofhZ0HxDxW2YnnX7dXwfwWV4hWQFmOijkntvY3rcH6StKD+aJk8zcdhQZd7rZ8DvJy3kAUxe09x4fytgzcLlYWX092Xez4Xq3OXr6XwAA2FhPInVne/duAIBuc9Q2oAboXi8bNWbfUxJ8c7gD6UrCLQPPo5EmVSN5alK1tZe+AwCf5R8JOxbiDZCVdj/9VF5A2EsDz1uDtNfp130kT6m4MTH/jfhG0prAMk4JEOOwNUh7k7nTr3uKX32W35/qaZC+pXA2mRMAUJRIq/osfzEdEAJQ81lem96bU4wqAW7s9oMrVii7eV3TsxL1yxVuvyxxES38G/8AtOWitQf9gbIAAAAASUVORK5CYII=",
	  class: "context-copyimage", 
	  oncommand: "gContextMenu.copyMediaLocation();",
	  accesskey: "O"},
	{command: 'context-reloadimage'},
	{label:"重新载入图片",
  oncommand:"gContextMenu.reloadImage();",
  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEUAAAAAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbIAYbJ+LAWeAAAAInRSTlMA+W4i6CoLBtnGvIg3MRcP9OvfyqFjTh4TzK2pln51W0I0OehqRwAAAIBJREFUGNNdjFkWwiAQBBshYYcsZnHXuf8hBZSXaH1N1+sefHniD334zUHR3rw0JTbzYMIq6n3NDdMBo2iAGy/CdAE4pxyZzVmyK4AWiaOQeUFTHbc8C76953MpdpcqjEJZkkchsk937YUrA8wRBT+QWZaR7qisdnDuNLXYIevxBrNTBW6VA6WeAAAAAElFTkSuQmCC"},
	{
    label: "OCR文字识别",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABjSURBVDiNY/z//z8DJYCFgYGB4U2AJYopIhuOM2JTjFXd////GV77W/z///8/AykYpoeJIvczMFBuACOlgUixC1hgDPQQJgRgMTUMwoCJgYF0/yPrGfiEhDUaic1MDAxUiAUAWExSKR3mLL8AAAAASUVORK5CYII=",
    oncommand: function() {
        //apikey
        var apikey = "c2565dadaaa28bd1b009ef6af190f441";
  
        var base64str = img2base64(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL).replace("data:image/jpeg;base64,", "");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "http://apis.baidu.com/apistore/idlocr/ocr", true);
        xmlHttp.setRequestHeader("apikey", apikey);
        var formData = new FormData();
        for(var d of ("fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&image=" + base64str).split('&'))
            formData.append.apply(formData, d.split('=', 2));
        xmlHttp.send(formData);
        xmlHttp.onload = function() {
            if (xmlHttp.status == 200) {
                var data = JSON.parse(xmlHttp.responseText);
                if (data.errNum != 0)
                    alert("错误：" + data.errMsg);
                else {
                    var str = "识别内容：";
                    for (var i in data.retData) str += data.retData[i].word;
                    addMenu.copy(str);
                }
            }
        };
  
        function img2base64(imgsrc) {
            if (typeof imgsrc == 'undefined') return "";
  
            const NSURI = "http://www.w3.org/1999/xhtml";
            var img = new Image();
            var that = this;
            var canvas,
                isCompleted = false;
            img.onload = function() {
                var width = this.naturalWidth,
                    height = this.naturalHeight;
                canvas = document.createElementNS(NSURI, "canvas");
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                isCompleted = true;
            };
            img.onerror = function() {
                Components.utils.reportError("Count not load: " + imgsrc);
                isCompleted = true;
            };
            img.src = imgsrc;
  
            var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
            while (!isCompleted) {
                thread.processNextEvent(true);
            }
  
            var data = canvas ? canvas.toDataURL("image/jpeg", 1) : "";
            canvas = null;
            return data;
        }
    }
},
	{ // 替换 openImgRar.uc.js
		label: "打开图像RAR",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5w4Awa8AAAAE3RSTlMA+AjxAtjRet7K5LuPaUpEKyYZQCNKKQAAAFpJREFUGNOdzzkOwCAMRFEMmC175v53jeQhcuq8Cn4xkgPdIwanMK3mQEUMsPKfo8k7BkOD0YjEABIGn+gz+AbDnw23QedoSQaobxARiChvoYojfJwdkOWy9wP0jAU7GZtzsAAAAABJRU5ErkJggg==",
		oncommand: function(){
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			try {
				var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache2\\" + new Date().getTime() + ".rar";
				file.initWithPath(path);
			} catch (e) {
				var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache2\\" + new Date().getTime() + ".rar";
			}
			file.initWithPath(path);
			Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
			setTimeout(function () {
				file.launch();
			}, 100);
		}
	},{
		label:"复制图像Base64",
		text:"%IMAGE_BASE64%",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAAAXq+QXq+MYquQVquoWq+MXq+MXquQWquQrqtUZrebP6iD2AAAAC3RSTlMAxftUDKuSZjkGHztZ4PsAAAA/SURBVAjXY8ALOBkYJoBoFkEGBkEHIMNRmYHBSAQoIGTAwMCs6MDAqszWXpFgFABnwKUQihHaGWYxMKzEayMAhqEJb4wGs5kAAAAASUVORK5CYII="
	},{},
	{
	label: '谷歌以图搜图',
	url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADYHQXZHwDYHQbYHgbYHgbYHgbYHQbVKgDYHgbYHgbYHgbZHgbYHQXZHQXZHgfZHQTZHgXXHQfYHgbYHwbXHgbXHgXYHQbZHgXaHQTWHwrTIQvVFQDYHgbO83NiAAAAHXRSTlMAwBCCs2tUTgbs5cyflIxJODIi3tnVu6VePhkXDAKjH1UAAABwSURBVBjTZY/ZEoAgCEURK20ztX3x/38zxpKp8b7AHJYLkAulYEkkIMNHkoCg2KpT25US8YAizuo2gfqAam5MwR0lDHEBgwqo6BBxZ2BC8JS6/0gP6gXNBeVYdwhLsu109N34jjApj7aPLtnp2XOZbtl7CuszpE98AAAAAElFTkSuQmCC",
	where: 'tab'
	},
	{
  label: '百度以图搜图',
  url: 'http://image.baidu.com/n/pc_search?queryImageUrl=%IMAGE_URL%',
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEUAAAAQltsEkPkRltsRltsRl9wPk+ARltsRl9wAmdcQltsRldsSltwRldwUl9wRltsSltsRltsRltsSltwQltsTldoRltsRl9wQl9sRltwQldwRldsPmNoNmNYSl9oQldsSldwRltsSldyDMza7AAAAI3RSTlMAPwLJsqAQtogFqmElGwrRzMWXcm02v6eNeU8tFBK8nZFoSHOf14gAAACGSURBVBjTbY7pDoQgDIQLiij36bHqXu//kAsE3D9OMmn6NTMp3AtNxZdG0ifTP+igH7LrelzgxHl33adGkJ0TURTbWkrEGgEkSwnFqT+AntsjRWwgg94k17sfTe6VQb3yQcwT3+tbSxk+QNWKylDPBhaRghiwboAzZ5hhbwdNMeJU+sVwpx+ycwWcGTO7+QAAAABJRU5ErkJggg==",
  where: 'tab'
  }, 
  {
  label: '必应以图搜图',
  url: 'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%IMAGE_URL%&mkt=en-US',
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADfYhDgYg3gYgzpZhbgYg3gYg3gYg3gYg3eYAzaZgDgYg3gYQ3gYg3gYgzhYg3gYgziYA3hYQzgYg3gYQ3fYw3gYQ3hYg3fYQ3fYQ3dZQ3eYxD/VQDgYg1XPIoHAAAAHXRSTlMAEPamC/LuwLEUBtOsjX1yRj0z5dTCnYdhTyYfAwWDaKkAAABiSURBVBjTnY1HDoAwEANJJQFS6cX//yYiCRIHTvFltLOW3NSEoP0TXH9FUAKQyr8CYIHofYHqinD55WAecNCLJ9HJPnGk+swVSRNW2HxbDLlpKNsijwwzKcsHm4ToB9/U5QZABARWtklXCQAAAABJRU5ErkJggg==",
  where: 'tab'
  },
  {
  label: '360以图搜图',
  url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEUAAAAOky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky5F22j1AAAAInRSTlMA5ZAjHQj174uABUko8c+3loZ3bD86LhHrvbSvqKF6GGVUL19b/QAAAJpJREFUGNNNj0cWwyAMRAeDMe69t0T3P2QkPRb5Cz1m1BAE+5zGnINDZPSk1COUI+umZSmTjegQ/fkWUFxDNHJ/rupuCqQXeYthhZBRxXEuc0hBNIQOgeNDinFAwhYQ4lorxg1mfWua3xRihGn6m7H2cJ4uTrVG8uidDmi4WX/HW/m1E2VJuVRzYlotK4Z4nM9ZK7ZvzbYHPf8H5zgK1id6VXgAAAAASUVORK5CYII=",
  where: 'tab',
  }, 
  
	{command: 'context-sep-copyimage'},
	{command: 'context-viewbgimage'},
	{
		label:"查看图像信息(F)",
		command:"context-viewimageinfo",		
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+T46xURAAAAHnRSTlMA9+/z0s2PRCnp5tq0Wk0E/cmkc2Y9GBAC4JmDHhz7O7iTAAAAeklEQVQY022O6Q7CMAyD0/RgrO3YxRiX3/8xgblDqjT/cfJZiiNHuoXB+rD892sL4yy02/PWTKuss9U3QcC0ecZIMJgLh3ukWy9U6pk4LSCW5IG8+QlPgpdqx/K9Nxu40ffAuSmkSYoYZkNCLb8jFRESJzXRJLW+n30A5RIFKTAVsU8AAAAASUVORK5CYII="
	},];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//快捷回复
new function(){
	var items = [
		{label:"用户名~~",input_text: "AUNSEN",accesskey: "1",image:" "},
		{label:"QQ~~~~~~",input_text: "84383191@qq.com",accesskey: "2",image:" "},
		{label:"Gmail~~~",input_text: "duh2008@gmail.com",accesskey: "3",image:" "},
		{label:"LIVEmail",input_text: "aunsen@live.com",accesskey: "4",image:" "},
		{label:"网址",input_text: "http://sunbox.cc/",accesskey: "5",image:" "},
		{},
		{label:"感谢楼主分享", input_text: "矮油、、非常感谢楼主的分享!支持...",accesskey: "T",image:" "},
		{label:"亲，要的就是", input_text: "亲，要的就是这个，非常感谢！！！",accesskey: "D",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "Y",image:" "},

		{label:"收藏备用~~~", input_text: "看起来很不错哦，收藏之~~~\n谢谢LZ啦！！！",accesskey: "G",image:" "},
		{label:"谢谢楼主分享", input_text: "谢谢楼主的分享!这个绝对要顶！！！",accesskey: "F",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
		{label:"坐等楼下解答", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
		{},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！⊙_⊙",accesskey: "A",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众路过……ʅ（´◔౪◔）ʃ",accesskey: "S",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
		{label:"嘿嘿~~~", input_text: "☆.。.:*(嘿´Д｀嘿).。.:*☆",accesskey: "X",image:" "}
	];
	var menu = PageMenu({
		label:"快速回复...",
		condition:"input",
		accesskey: "W",
		position: 1,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEX/Klvx8fHv7u7q6ur09PTn5+f7+fr39/fk5OT9mbD6lq32dZL8R3Hu7O3o4OLl3uDh3N3l2Nvhz9Pju8T3k6r3iqP8c5L0cY/1YIPs5ufh4eH32N/71N3+xtPdys/qqrnnp7btlqrqkqb4epf2ZYf+UXn/Ll5k0l7GAAAAZUlEQVQY05XPRxKAIBBEUdQRUDEnzNn7H9ECBcolf/eqV40sCvDE/sZ4vIxDQpqADMYAEDYAypUjc2vl2BXFx8u79mRd9O0s8UWJMjrTnFKaaqNt4XmftUhXFmtWCKvmcufM4uMDLHgEihaxXeQAAAAASUVORK5CYII=",
		oncommand: function(event){
			var input_text = event.target.getAttribute('input_text');
			if(input_text) {
				addMenu.copy(input_text);
				setTimeout(function() {
					goDoCommand("cmd_paste");
				}, 100);
			}
		}
	});
	menu(items);
};

//颜文字输入
var Specialcharacters = PageMenu({
                label:"颜文字输入",
			         	condition:"input",
                accesskey: "T",
                insertBefore:"context-searchselect",
                oncommand: function(event){
                        var input_text = event.target.getAttribute('input_text');
                        if(input_text) {
                                addMenu.copy(input_text);
                                goDoCommand("cmd_paste");
                }
        },
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUPqpIPqpIPqpL///82uKS86OGb3NKG1cgXrZYTrJTM7ei35t+e3dNoyrvo9/Xa8u/Q7+rC6eOw49uq4dmQ2M11zsBPwbAkspv4/fzi9fLe9PDX8e3I7Oaz5NyC08Zsy71Hvqs9u6cqtJ+k39ag3dSO18xgx7dZxLRTwrEer5kVUSQ1AAAAAnRSTlPy5YB5WPAAAACaSURBVBjTZY/XEoIwEEXj3UASIPQmUgT7//+gLokzznje9mwXB/HLJwRzToJywY5gk5yCS5lHG8csikxyLiTpRJ3CobJdyOMGYwBtEDUswhjoRxi6oYlZBCEwWxi1QkbaCY9trHYtmre8BiLlhnbIq7ataJ5o8Wt1Vag8etq+9Id1AO40Eq3ie3oSqzodWgj/3DWYHpBc+Pf+G9dtCAH/I8ZHAAAAAElFTkSuQmCC"
});
Specialcharacters([
                {label: "^_^", input_text:"^_^"},
                {label: "-_-||| ", input_text:"-_-||| "},
                {label: "Orz", input_text:"Orz"},
                {label: "-_,-", input_text:"-_,-"},
                {label: "╯﹏╰", input_text:"╯﹏╰"},
                {label: "｡◕‿◕｡", input_text:"｡◕‿◕｡"},
                {label: "、(￣.￣)", input_text:"、(￣.￣)"},
                {label: "O(∩_∩)O~", input_text:"O(∩_∩)O~"},
                {label: "o(╥﹏╥)o", input_text:"o(╥﹏╥)o"},
                {label: "(￣３￣)", input_text:"(￣３￣)"},
                {label: " o(>< )o", input_text:" o(>< )o"},
                {label: "_(:з」∠)_", input_text:"_(:з」∠)_"},
                {label: "(・(ｪ)・)", input_text:"(・(ｪ)・)"},
                {label: "￣へ￣", input_text:"￣へ￣"},
                {label: "╮(╯_╰)╭", input_text:"╮(╯_╰)╭"},
]);


//搜索所选文本
new function () {
	var items = [
		{
		label: "搜索所选文本",
		url: "https://www.google.com/search?q=%s",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADYHQXZHwDYHQbYHgbYHgbYHgbYHQbVKgDYHgbYHgbYHgbZHgbYHQXZHQXZHgfZHQTZHgXXHQfYHgbYHwbXHgbXHgXYHQbZHgXaHQTWHwrTIQvVFQDYHgbO83NiAAAAHXRSTlMAwBCCs2tUTgbs5cyflIxJODIi3tnVu6VePhkXDAKjH1UAAABwSURBVBjTZY/ZEoAgCEURK20ztX3x/38zxpKp8b7AHJYLkAulYEkkIMNHkoCg2KpT25US8YAizuo2gfqAam5MwR0lDHEBgwqo6BBxZ2BC8JS6/0gP6gXNBeVYdwhLsu109N34jjApj7aPLtnp2XOZbtl7CuszpE98AAAAAElFTkSuQmCC",
		where: 'tab'
		},{
		label: "百度搜索所选文本",
        url: "http://www.baidu.com/baidu?wd=%s&ie=utf-8",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAAAAYbAAYLAAYbEAYa8AYa8AXbkAYbAAYbEAYbAAYbAAYbAAYbAAYbAAYbEAYLEAYa8AYa8AX68Aa78AYLAAYbAAYLAAYbEAYLEAYq8AYLEAYLEAYLMAZrMAYbBIDO7RAAAAHnRSTlMA5T3dsHYL1uzP9pLyypdjWR8QBt7bpImCfW9SKBSqMIPJAAAAf0lEQVQY022PSRLDIAwEJQzGeHecfen/PzNgyIn0bVo1SMhfWmdVrWt/2TQcNKbkFDp8B4dp0/y6Xz4vaFLLpfkgflsAF4WF566BPtzBRqGwiA7reZUJzaL3s8g2mB7NFW4SeY+xUh49SeIBLq8ds5jj2nJYF7yfApjq9PpzNV+MWwnu4tN0wQAAAABJRU5ErkJggg==",
        where: 'tab'
        }, {label: "谷歌站内搜索",
		url: "http://www.google.com/search?q=site:%HOST% %s",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAOky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky4Oky5PjdcBAAAAIHRSTlMA+fG46awy1ceGcA0G36d2UEYB4cyBXlcsJxqfnpRmNhLuhF8AAACNSURBVBjTbctVAsMwDANQOVnTQGFlGOn+p5xL+9r7kyVDFTErbzasOLmcOzOeWbbgS5L1vtc+m6wfGkuZAUTy9THUa0daABkleZ5MC5TMcONlgYZHa3hxgGWHgZRnfAulAAJ5T9tPcGQPYDWUJsU8nxqtoEaSPtSVrirsauGhSjjM1pDS6/6nXVwB/PcFVywOSWg64kEAAAAASUVORK5CYII=",
		where: 'tab'
		},{
    label: "询问Cortana",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAAAAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5xHyHE6AAAAJXRSTlMAuMA8sY8mA4Jd2xwU89HMyMWknpRYIO7qf310aGJKNCEP9nwv0oVKVQAAAJBJREFUGNNdztkOgjAQQNFC9xahO5tsKv//i9a2Jsp9mpxMMgMaQkgDfqowxsuMBJppAQBIW/nNV+1egHaMmNoGpmkG3lFI6Kpk5zO4Ka3en5PLgHiCYDnKwHDeWPCYAQ7pDyiHrZx1WsZB6gcsQFmPMOrFeYMJYjtnPKxtlAQl+1IfMfU30RzqFOCvw4zg2hvRPQcHa+glDAAAAABJRU5ErkJggg==",
    onclick: "askCortana.runCortana(content.getSelection().toString());"
    },{label: '百度站內搜索', 
		url: "http://www.baidu.com/s?wd=site:%HOST% %s",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAAAAYbAAYLAAYbEAYa8AYa8AXbkAYbAAYbEAYbAAYbAAYbAAYbAAYbAAYbEAYLEAYa8AYa8AX68Aa78AYLAAYbAAYLAAYbEAYLEAYq8AYLEAYLEAYLMAZrMAYbBIDO7RAAAAHnRSTlMA5T3dsHYL1uzP9pLyypdjWR8QBt7bpImCfW9SKBSqMIPJAAAAf0lEQVQY022PSRLDIAwEJQzGeHecfen/PzNgyIn0bVo1SMhfWmdVrWt/2TQcNKbkFDp8B4dp0/y6Xz4vaFLLpfkgflsAF4WF566BPtzBRqGwiA7reZUJzaL3s8g2mB7NFW4SeY+xUh49SeIBLq8ds5jj2nJYF7yfApjq9PpzNV+MWwnu4tN0wQAAAABJRU5ErkJggg==",
		where: 'tab'
    },{label: "翻译所选文本",
		url: "http://translate.google.cn/#auto/zh-CN/%s",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAXq+MYq+MXq+MXq+MZq+IXougWq+MXrOMXq+MWquMWq+MXq+MWq+MWrOMWq+MXquMXq+MXrOQXq+MXq+MWrOIYruUXquMXq+IXq+MXrOQWq+IXruIUqOQYp98cquMXq+Nze2puAAAAIHRSTlMAsHbm3T0LcDb5z79+W1LYurWLbWRQMMqYkYRGLCYgEhS2rlAAAACGSURBVBjTbY9ZFsMgCEUDGDVxyJzOLftfZXHol30/yj3AuXR/oxGIAPWv7hXnqL7WPHBNJlrROTqDuDlWaQqZJ0P+WE9pRAHAd4s82G6RGRBA8uBug43viakCf4mPV1g4AxCwj3A7Zie/stR/1i0+jSlLteKrmM0hqekilkJjEmvU2+PafAHxggtoFg/BSwAAAABJRU5ErkJggg==",
		where: 'tab'
		},{label: "百度云搜索",
		url: "https://www.google.com/search?q=site:pan.baidu.com%20%s",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAARldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRlduHtWONAAAAIHRSTlMABPtN8o+AMOqpoVVAIOXWzsS1i4V0bV4QCfXSmEYpFlLU/usAAAB7SURBVBjTjY83EsQwDAOpZEXnfBH/f+VR8ozPpbfAACAa0l3WYOw1e3ROxn9+I5LwTpxF1bAk1GexZD/jeyRROaBdjAaeqez1GHswRnlpeaAnol1DKvbdi2gDO+qxlnVgaQdBFjNl6nxMj2aQExWM3Fk/Y1B0sNkbb/4A72EF1CHAmjQAAAAASUVORK5CYII=",
		where: 'tab'
		},{label: "炫电影",
		url: "http://www.xuandy.com/index.php?s=%s&submit=%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2",
		image: "http://www.xuandy.com/favicon.ico",
		where: 'tab'
		},{label: "YouTube",
		url: "https://www.youtube.com/results?search_query=%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUAAADYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgbYHgYuksHoAAAAKXRSTlMA8dHZLweRQTjDsqdzbU1IGfm+rVLWxVtXJx/o5+Tdzsi4oYiEfmdoFBqKTrUAAACpSURBVBjTZc7ZDsIgEAXQAQqUFrALXe2+Kf//g4La2MRJZpJ7HiYXAKqFkgQuk6DbBA2Flp4shGRZQdOAfEHZBIf39gchgj8oDUrS6oRAgCkYzGv+yZRrberaaM2pz02PkLXWrTuNA7Y+w95a/hbmILc3LMuZqzKrsf8SOQhixhcVShVdIHoEW+4h9lAxrqSWW+zgsBkqMMmmrovR4WvsYsRkGAgexU7hBXTBDDSBBmEBAAAAAElFTkSuQmCC",
		where: 'tab'
		},{label: "搜库搜索",
		url: "http://www.soku.com/search_video/q_%s",
		image: "http://www.soku.com/favicon.ico",
		where: 'tab'
		},{},{label: "搜索相关图片",
		url: "https://www.google.com/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&q=%s", 
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADYHQXZHwDYHQbYHgbYHgbYHgbYHQbVKgDYHgbYHgbYHgbZHgbYHQXZHQXZHgfZHQTZHgXXHQfYHgbYHwbXHgbXHgXYHQbZHgXaHQTWHwrTIQvVFQDYHgbO83NiAAAAHXRSTlMAwBCCs2tUTgbs5cyflIxJODIi3tnVu6VePhkXDAKjH1UAAABwSURBVBjTZY/ZEoAgCEURK20ztX3x/38zxpKp8b7AHJYLkAulYEkkIMNHkoCg2KpT25US8YAizuo2gfqAam5MwR0lDHEBgwqo6BBxZ2BC8JS6/0gP6gXNBeVYdwhLsu109N34jjApj7aPLtnp2XOZbtl7CuszpE98AAAAAElFTkSuQmCC",
		where: 'tab'
		},{label: "搜索所选文本",
		url: "http://www.bing.com/search?q=%s",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAADrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzhzFzcEAAAAHHRSTlMAcML8mEg1MAfrykE8KxLyqmbkzLq4gHpuXk8Ohr8aZgAAAG9JREFUGNOFj1kSgCAMQ2sBQXDfl97/nGJlEP0xP528SacNQIdLDqkyIqp+gf6CfJfKvIDpqWm3OoISVvISWEZgLF3KAnB+qiIBCsDZJIGHHnmjcAwm3bIVsuYrKAV7Gyqp5k538dVqCOkoM+NT5gQoxwo6ViErNgAAAABJRU5ErkJggg==",
		where: 'tab'
		},{label: "360网盘搜索",
		url: "https://www.google.com/search?q=site:yunpan.cn%20%s",
		image: "http://yunpan.360.cn/favicon-32.ico",
		where: 'tab'
		},{},{label: "汉典查寻",
		url:"http://www.zdic.net/search?lb=1&q=%s", 
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3dmhyAAAAEXRSTlM1AHdEuxGZZiLMWyzdVe6IqlnsK20AAAB8SURBVBjTZY8BDsQgCARhEcWrtsf/P3tgY3JpJ7oJk0CAPvRPlAcnzSKsMR9EOhm+AQVnM+kQEXSxqDkeF08Kc4qgAfD4bYtSl6glheIhrOPRYkol8Ay6Z6gEnqG3EN9Iiopws/p38tpDuuo1BgTjvJTWcVqJE6p6vM7/AX8HBKkJPXpxAAAAAElFTkSuQmCC",
		where: 'tab'
		},{label: "Wiki-EN该词条",
		url: "https://en.wikipedia.org/wiki/%s",
		image: "http://bits.wikimedia.org/favicon/wikipedia.ico",
		where: 'tab'
		},{label: "Wiki-CN该词条",
		url: "https://zh.wikipedia.org/wiki/%s",
		image: "http://bits.wikimedia.org/favicon/wikipedia.ico",
		where: 'tab'
		}
		];
	var menu = PageMenu({
		condition:"select",
		position: 10,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAilBMVEUAcbnw8/Uig8Hj5OWYwNleos05jsQmhcH5+vvN4e7q6uq61ujn5+fc4eTh4eHe3t5ip9NZotBopcxOmspAk8lOmMYegcDz+Pvo8ffo7O/u7u7m6+7Z4+mex+LF1eDY3d+xzN3T2NyLvdzDz9dvrtaAs9RvqM1lo8tAlMo/k8lbnccLd7wDc7oDcrqu6do2AAAAdElEQVQY05WOxRaEMBRDqdDiNgMjuPv//x4UKLKDLF5O7ssiwl0N1vcjyc0BCim0LRW0PEOQzbdXZQ7eADKzwQ58j9nrxwH9i8xwwIGHFRHSUmF4qUYJ1pCmO+OaXR0hQgmB27+ODaM6r0xN07nMdvNOeKIJ2CgFKHFpLGsAAAAASUVORK5CYII="
	});
	menu(items);
};

//隐藏相同项。必须，不能删除
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};
