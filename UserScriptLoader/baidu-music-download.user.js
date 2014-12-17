// ==UserScript==
// @name        baidu-music-download
// @namespace   thunderhit@163.com
// @description 快速免费下载百度音乐
// @author	    thunderhit
// @include     http://music.baidu.com/song/*
// @grant       GM_xmlhttpRequest
// @version     1.08
// @run-at      document-end
// ==/UserScript==
var needcheck = false;//这个选项可以提醒你当超出容量清理歌曲，因为百度云音乐本身提供了20000首歌的容量，如果你下载的歌曲超过这个数目就需要清理。我估计也没人下载到20000首歌，也就没有做过多测试。

var getcookie = function (name) {
  var cookie_start = document.cookie.indexOf(name);
  var cookie_end = document.cookie.indexOf(';', cookie_start);
  return cookie_start == - 1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}
var baiduid = getcookie('BAIDUID');
baiduid.substring(0, baiduid.indexOf(':FG'))
var songid = location.pathname.substr(6);
var ajax = function (callback, url) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: callback,
    onerror: function (e) {
      console.log(url);
      //console.log(e);
      //console.log(callback.toString());
    }
  });
};
var Eajax = function (callback, url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        callback(xhr.response);
      }
    }
  }
  xhr.send(null);
};
var collect = function (callback) {
  var url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?' +
  'method=baidu.ting.favorite.addSongFavorite&format=json&from=bmpc&version=1.0.0&version_d=9.0.4.7&&baiduid='
  + baiduid + '&songId=' + songid + '&time=' + (Math.round(new Date().getTime() / 1000));
  ajax(callback, url); //ajax回来的json待处理判断
};
var iscollect = function (callback) {
  var url = 'http://music.baidu.com/data/user/isCollect?type=song&ids=' + songid +
  '&r=' + Math.round(Math.random() * 100000) + (new Date).getTime();
  Eajax(function (data) {
    console.log(data);
    callback(JSON.parse(data).data['isCollect']); //
  }, url);
};
var getsonglist = function (callback) {
  var url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.favorite.getCollectSong&format=json&from=bmpc&version=1.0.0&version_d=9.0.4.7&bdiduid='
  + baiduid + '&pn=0&rn=50';
  ajax(function (data) {
    callback(JSON.parse(data.responseText));
  }, url);
};
var getsong = function (callback) {
  var url = 'http://yinyueyun.baidu.com/data/cloud/download?songIds=' + songid;
  ajax(function (data) {
    callback(JSON.parse(data.responseText));
  }, url);
};
var hasrate = function (rate, callback) {
  getsong(function (json) {
    if (rate == 999 && json.data.data['flac']) {
      callback(json.data.data['flac']['rate'], json.data.data['flac']['format'], true);
    } 
    else if (json.data.data[rate]) {
      callback(json.data.data[rate]['rate'], json.data.data[rate]['format'], true);
    } 
    else {
      callback(null, null, false);
    }
  });
}
var download = function (rate, target) {
  hasrate(rate, function (truerate, format, ishas) {
    if (ishas) {
      var finalurl = 'http://yinyueyun.baidu.com/data/cloud/downloadsongfile?songIds='
      + songid + '&rate=' + truerate + '&format=' + format;
      location.assign(finalurl);
      target.click = null;
      target.href = finalurl;
    } 
    else {
      target.click = null;
      target.text = '无资源';
      alert('没有该资源!');
    }
  });
};
var main = function (rate, target) {
  getsonglist();
  iscollect(function (collect_flag) {
    if (collect_flag) {
      download(rate, target);
    } 
    else {
      collect(function (data) {
        download(rate, target);
      });
    }
  });
  if (needcheck) {
    getsonglist(function (d) {
      if (d.total > 5000) {
        alert('音乐库容量不足，请按确定跳转到页面手动清理');
        location.assign('http://yinyueyun.baidu.com/');
      }
    });
  }
};
var init = function () {
  location.assign('javascript:(' + function () {
    var button = $('.add-song-btn').clone().attr('id', 'dlbutton');
    $('.btn.btn-b.down-song-btn').after(button);
    $('#dlbutton i').removeClass('icon btn-icon-add').addClass('icon btn-icon-down');
    $('#dlbutton .txt').text('下载').css('color', '#0096FF');
    $('#dlbutton .addlayer').attr('id', 'dlbutton-menu');
    $('#dlbutton-menu a').remove();
    $('#dlbutton-menu').append('<a class="dlbutton-rate" rate="128" href="javascript:void(0);">128kbps</a><a class="dlbutton-rate" rate="192" href="javascript:void(0);">192kbps</a><a class="dlbutton-rate" rate="320" href="javascript:void(0);">320kbps</a><a class="dlbutton-rate" rate="999" href="javascript:void(0);">无损</a>');
    button.hover(function () {
      $('#dlbutton-menu').toggle();
    });
  }
  + ')();void(0);');
  setTimeout(function () {
    var elements = document.getElementsByClassName('dlbutton-rate');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', function (event) {
        var rate = event.target.getAttribute('rate');
        main(rate, event.target);
      }, false);
    }
  }, 1024);
};
init();
