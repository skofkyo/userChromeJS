// ==UserScript==
// @name        百度音乐下载
// @namespace   thunderhit@163.com
// @description bdmusicdownload
// @author		  thunderhit
// @include     http://music.baidu.com/song/*
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @version     1.06
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==
$(function () {
  main = {
    _bdiduid: '',
    songid: '',
    get_bdiduid: function () {
      if (this._bdiduid == '') {
        this._bdiduid = document.cookie.substring(8, 40);
      }
    },
    getsongid: function () {
      this.songid = location.pathname.substr(6);
    },
    getsonginfo: function (callback) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://yinyueyun.baidu.com/data/cloud/download?songIds=' + this.songid,
        onload: function (response) {
          var json = eval('(' + response.responseText + ')');
          if (json.data.data) {
            callback(json);
          }
        },
      });
    },
    getcollection: function (callback) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.favorite.getCollectSong&format=json&from=bmpc&version=1.0.0&version_d=9.0.4.7&bdiduid=' + this._bdiduid + '&pn=0&rn=50',
        onload: function (response) {
          var json = eval('(' + response.responseText + ')');
          callback(json);
        },
      });
    },
    addfavorite: function (callback) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.favorite.addSongFavorite&format=json&from=bmpc&version=1.0.0&version_d=9.0.4.7&baiduid=' + this.bdiduid + '&songId=' + this.songid + '&time=' + (Math.round(new Date() .getTime() / 1000)),
        onload: function (response) {
          var json = eval('(' + response.responseText + ')');
          if (json.error_code == '22322') {
            callback(json);
          } 
          else {
            callback(json);
          }
        },
      });
    },
    isfavorite: function (json) {
      if (json.total > 1500) {
        alert('你需要清理百度云音乐才可以继续使用');
        location.assign('http://yinyueyun.baidu.com');
        return
      }
      if (json.error_code == 22000) {
        for (var i = 0; i < json.total; i++) {
          if (this.songid == json.result[i].song_id) {
            return true;
          }
        }
      } 
      else {
        return false;
      }
    },
    downloadfun: function (t, rate) {
      var downloadurl = '';
      if (rate == '无损') {
        this.getsonginfo(function (data) {
          if (data.data.data.flac) {
            //使用GM_xmlhttpRequest的回调，所以this是 Sandbox ,而不是main
            //console.log(this);
            downloadurl = main.getdownloadurl(data.data.data.flac.rate);
            location.assign(downloadurl);
            t.attr('href', downloadurl);
            t.unbind('click');
            t.text('无损');
          } else {
            t.text('没有无损资源');
          }
        });
      } 
      else {
        downloadurl = this.getdownloadurl(rate);
        location.assign(downloadurl);
        t.attr('href', downloadurl);
        t.unbind('click');
        t.text(rate + 'kbps');
      }
    },
    getdownloadurl: function (rate) {
      //无损
      if (eval(rate) > 320) {
        return 'http://yinyueyun.baidu.com/data/cloud/downloadsongfile?songIds=' + this.songid + '&rate=' + rate + '&format=flac';
      }
      return 'http://yinyueyun.baidu.com/data/cloud/downloadsongfile?songIds=' + this.songid + '&rate=' + rate + '&format=mp3';
    }
  };
  main.get_bdiduid();
  main.getsongid();
  if (main._bdiduid == '' || main.songid == '') return
  var dlbutton = $('.add-song-btn') .clone();
  $('.btn.btn-b.down-song-btn') .after(dlbutton);
  $(dlbutton) .addClass('bdmdl');
  $('.bdmdl i') .removeClass('icon btn-icon-add');
  $('.bdmdl i') .addClass('icon btn-icon-down');
  $('.addlayer', $('.bdmdl')) .addClass('bdmdl-hovermenu');
  $('.txt', $('.bdmdl')) .html('<font color=\'green\'>下载</font>');
  $('a', $('.bdmdl-hovermenu')) .remove();
  $('.bdmdl-hovermenu') .append('<a class=\'bdmdl-rate\' id=\'128\' href=\'javascript:void(0);\'>128kbps</a><a class=\'bdmdl-rate\' id=\'192\' href=\'javascript:void(0);\'>192kbps</a><a class=\'bdmdl-rate\' id=\'320\' href=\'javascript:void(0);\'>320kbps</a><a class=\'bdmdl-rate\' id=\'无损\' href=\'javascript:void(0);\'>无损</a>');
  $('.bdmdl') .hover(function () {
    $('.bdmdl-hovermenu') .toggle();
  });
  $('.bdmdl-rate') .click(function () {
    var t = $(this)
    var rate = $(this) .attr('id');
    $(this) .text('获取中...');
    main.getcollection(function (data) {
      var isflag = main.isfavorite(data);
      if (!isflag) {
        main.addfavorite(function (data) {
          if (data.error_code == '22322') {
            main.downloadfun(t, rate);
          }
        });
      } 
      else {
        main.downloadfun(t, rate);
      }
    });
  });
});
