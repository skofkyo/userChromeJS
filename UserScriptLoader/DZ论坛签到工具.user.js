// ==UserScript==
// @name       DZ论坛签到工具
// @version    0.2.1
// @description  自动签到工具
// @include      http://*/plugin.php?id=dsu_paulsign*
// @include      http://bbs.kafan.cn/*
// @include      http://www.tsdm.net/*
// @include      http://www.lightnovel.cn/home.php?mod=task
// @include      http://www.mddmm.com/dsu_paulsign-sign.html
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @grant        unsafeWindow
// @copyright  2013+, Coolkid
// ==/UserScript==

function isURL(x){
    if(window.location.href.indexOf(x)!=-1){
    	return true;
    }else{
     	return false;
    }
}

function qd(){
	if(window.find("今天签到了吗")&&window.find("请选择您此刻的心情图片并写下今天最想说的话")){
		var text = document.getElementById("ch_s");
		var text2 = document.getElementById("todaysay");
        if(text==null){
        	return;
        }
    	text.setAttribute('checked',true);    
        text2.value = "全自动签到,不服来打我";
		var button = document.getElementById("qiandao");
		button.submit();
        /*var inplen = document.getElementById("qiandao").getElementsByTagName("a");
		for (var i = 0, len = inplen.length; i < len; i++) {
			if(inplen[i].href=="javascript:;"){
				var ev = document.createEvent('HTMLEvents'); 
				ev.initEvent('click', false, true); 
				inplen[i].dispatchEvent(ev);
				return;
			}
		}*/
        return;
    }
}

function qd2(){
	var imgs = document.getElementById("pper_a").getElementsByTagName("IMG");
	if(imgs[0].src.indexOf("wb.png")==-1){
		var a = document.getElementById("pper_a");;
		/*var ev = document.createEvent('HTMLEvents'); 
		ev.initEvent('click', false, true); 
		a.dispatchEvent(ev);*/
		a.onclick();
		return;
	}
}


if(isURL("http://www.tsdm.net/")){
	//天使论坛
	qd();
    if(window.find("签到领奖")&&(window.location.href!="http://www.tsdm.net/plugin.php?id=dsu_paulsign:sign")){
        window.location.href="http://www.tsdm.net/plugin.php?id=dsu_paulsign:sign";
        return;
    }
}else if(isURL("bbs.kafan.cn")){
	//卡饭论坛
	qd2();
}else if(isURL("www.lightnovel.cn/home.php?mod=task")){
	//轻国
	if(window.find("每日任务")&&window.find("啪啪啪")){
		window.location.href="http://www.lightnovel.cn/home.php?mod=task&do=apply&id=98";
		return;
	}
}else{
	//其他论坛
	qd();
}
