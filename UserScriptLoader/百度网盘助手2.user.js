// ==UserScript==
// @name        百度网盘助手2
// @author      有一份田
// @modified    Max Sky
// @description 显示百度网盘文件的直接链接，突破大文件需要使用电脑管家的限制（原作者：有一份田）
// @namespace   https://greasyfork.org/zh-CN/scripts/18964-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E5%8A%A9%E6%89%8B2
// @icon        http://img.duoluohua.com/appimg/script_dupanlink_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        26/08/2013
// @modified    23/05/2016
// @include     *://pan.baidu.com/*
// @include     *://yun.baidu.com/*
// @exclude     *://yun.baidu.com
// @exclude     *://yun.baidu.com/#*
// @exclude     *://pan.baidu.com/play/*
// @exclude     *://pan.baidu.com/share/manage*
// @exclude     *://pan.baidu.com/disk/recyclebin*
// @exclude     *://yun.baidu.com/pcloud/album/info*
// @require     http://libs.useso.com/js/jquery/2.1.1/jquery.min.js
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @run-at      document-end
// @version     2.5.0
// ==/UserScript==
/*
 * === 说明 ===
 *@说明:此版本为修复本助手被 Baidu 和谐的问题，因原作者不知所踪得来
 *@作者:有一份田
 *@官网:http://www.duoluohua.com/download/
 *@Email:youyifentian@gmail.com
 *@Git:http://git.oschina.net/youyifentian
 *@转载重用请保留此信息
 *@最后更新版本:2.4.7
 *
 * */
var VERSION = '2.5.0';
var APPNAME = '百度网盘助手2';
var t = new Date().getTime();
$ = $ || unsafeWindow.$;
var disk = unsafeWindow.disk;
var FileUtils = unsafeWindow.FileUtils;
var Page = unsafeWindow.Page;
var Utilities = unsafeWindow.Utilities;
var yunData = unsafeWindow.yunData;
var require = unsafeWindow.require;
(function() {
    var isOther = location.href.indexOf('://pan.baidu.com/disk') == -1,
        downProxy = null,
        shareData = null,
        RestAPI, Canvas, Pancel, Toast = {}, errorMsg,
        iframe = '',
        httpHwnd = null,
        index = 0,
        msg = ['咱能不二么,一个文件都不选你让我咋个办...', //0
               '尼玛一个文件都不选你下个毛线啊...', //1
               '你TM知道你选了<b>90</b>多个文件吗?想累死我啊...', //2
               '<b>请求已发送，数据下行中...</b>', //3
               '<b>该页面</b>不支持文件夹和多文件的<font color="red"><b>链接复制和查看</b></font>！', //4
               '<font color="red">请求超时了...</font>', //5
               '<font color="red">请求出错了...</font>', //6
               '<font color="red">返回数据无法直视...</font>', //7
               '请输入验证码', //8
               '验证码输入错误,请重新输入', //9
               '<b>链接已复制到剪切板！</b>', //10
               '未知错误，errno:', //11
               '<font color="red"><b>尼玛竟然跪了了，不要告诉我你的水表在里面...</b></font>', //12
               ''
              ],
        btnClassArr = [{
            css: 'icon-download',
            tag: 'a',
            id: ''
        }, {
            css: 'icon-btn-download',
            tag: 'li',
            id: ''
        }, {
            css: 'icon-btn-download',
            tag: '',
            id: ''
        }, {
            css: 'download-btn',
            tag: '',
            id: ''
        }, {
            css: '',
            tag: '',
            id: 'downFileButton'
        }];
    try {
        downProxy = isOther ? disk.util.DownloadProxy || null : null;
        shareData = isOther ? disk.util.ViewShareUtils || null : null;
    } catch (e) {}
    if (isOther) {
        Canvas = require("common:widget/canvasPanel/canvasPanel.js");
        RestAPI = require("common:widget/restApi/restApi.js");
        Pancel = require("common:widget/panel/panel.js");
        Toast = require("common:widget/toast/toast.js");
        errorMsg = require("common:widget/errorMsg/errorMsg.js");
    } else {
        All = require("http://s1.pan.bdstatic.com/yun-static/common-cdn/pkg/all_c5b6de6.js");
    }
    //if (!isOther || (isOther && !FileUtils)) {}
    var BCHelperMenuBtns = (function() {
        function createHelperBtn(btn) {
            var newnode = btn.cloneNode(true),
                html = newnode.innerHTML;
            $(newnode).attr('id', '').attr('href', 'javascript:void(0);').attr('data-key', 'DownloadHelper').attr('node-type', 'btn-Helper').attr('onclick', '').css({
                width: 63
            }).html(html.replace(/[\u4E00-\u9FA5]{2,4}(\(.*\)|\uff08.*\uff09)?/, '网盘助手')).unbind();
            var o = $('<div class="PanHelperBtn" style="display:inline-block;">').append(newnode)[0];
            btn.parentNode.insertBefore(o, btn.nextSibling);
            return o;
        }
        var menuTitleArr = ['直接下载', '复制链接', '查看链接'],
            panBtnsArr = [],
            html = '';
        for (var i = 0; i < btnClassArr.length; i++) {
            var item = btnClassArr[i];
            var tmpItem = item.id !== '' ? $('#' + item.id) : $('.' + item.css);
            var tmpArr = item.tag !== '' ? tmpItem.parent(item.tag) : tmpItem;
            panBtnsArr = $.merge(panBtnsArr, tmpArr.toArray());
        }
        if (!panBtnsArr.length) {
            return panBtnsArr;
        }
        html += '<div id="BCHelperMenu" style="display:none;position:fixed;z-index:999999;">';
        html += '<ul class="pull-down-menu" style="display:block;margin:0px;padding:0px;left:0px;top:0px;list-style:none;">';
        for (var j = 0; j < menuTitleArr.length; j++) {
            html += '<li><a href="javascript:;" class="panHelperMenuBtn" type="' + j + '"><b>' + menuTitleArr[j] + '</b></a></li>';
        }
        $('<div>').html(html).appendTo(document.body);
        for (var k = 0; k < panBtnsArr.length; k++) {
            var panBtn = panBtnsArr[k];
            createHelperBtn(panBtn);
        }
        var helperBtn = $('.PanHelperBtn'),
            helperMenu = $('#BCHelperMenu'),
            menuFun = function() {
                helperDownload($(this).attr('type') || 0);
                helperMenu.hide();
            };
        helperBtn.click(menuFun).mouseenter(function() {
            $(this).addClass('b-img-over');
            var o = $(this).children('a'),
                offset = o.offset(),
                w = o.outerWidth() - parseInt(o.css('paddingRight'));
            helperMenu.children('ul').css('width', w - 2);
            helperMenu.css('top', offset.top + o.height() + parseInt(o.css('paddingTop')) - $(document).scrollTop());
            helperMenu.css('left', offset.left).show();
        }).mouseleave(function() {
            $(this).removeClass('b-img-over');
            helperMenu.hide();
        });
        $(document).scroll(function() {
            helperMenu.hide();
        });
        helperMenu.mouseenter(function() {
            $(this).show();
        }).mouseleave(function() {
            $(this).hide();
        });
        helperMenu.find('a').css('text-align', 'center');
        return helperMenu.find('a.panHelperMenuBtn').click(menuFun).toArray();
    })();
    if (!BCHelperMenuBtns.length) {
        return;
    }

    function helperDownload(type) {
        iframe = createDownloadIframe();
        iframe.src = 'javascript:;';
        var items = getListViewCheckedItems(),
            len = items.length;
        if (!len) {
            index = 1 == index ? 0 : 1;
            return myToast(msg[index]);
        } else if (len > 90) {
            return myToast(msg[2]);
        }
        if (1 == len) {
            var url = items[0].dlink;
            if (isUrl(url)) {
                if (2 == type) {
                    showHelperDialog(type, items, {
                        "errno": 0,
                        "dlink": url
                    });
                } else if (1 == type) {
                    copyText(url);
                } else {
                    myToast(msg[3], 1);
                    iframe.src = url;
                }
            } else {
                getDownloadInfo(type, items);
            }
        } else {
            getDownloadInfo(type, items);
        }
        downloadCounter(items);
    }

    function getDownloadInfo(type, items, vcode) {
        if (!vcode) {
            showHelperDialog(BCHelperMenuBtns.length + 1, items);
            vcode = {};
        }
        var url = '',
            data = {}, fidlist = '',
            fids = [];
        for (var i = 0; i < items.length; i++) {
            fids.push(items[i].fs_id);
        }
        fidlist = '[' + fids.join(',') + ']';
        if (isOther) {
            if (FileUtils) {
                url = disk.api.RestAPI.SHARE_GET_DLINK + '&uk=' + FileUtils.share_uk + '&shareid=' + FileUtils.share_id + '&timestamp=' + FileUtils.share_timestamp + '&sign=' + FileUtils.share_sign + '&fid_list=' + fidlist;
                data = {
                    shareid: FileUtils.share_id,
                    uk: FileUtils.share_uk,
                    fid_list: fidlist
                };
            } else {
                var context = yunData.getContext();
                if (typeof vcode == 'object') {
                    url = '/api/sharedownload?' + 'uk=' + yunData.SHARE_UK + '&shareid=' + yunData.SHARE_ID + '&timestamp=' + yunData.TIMESTAMP + '&sign=' + yunData.SIGN + '&fid_list=' + fidlist;
                    data = 'encrypt=0&product=share&primaryid=' + yunData.SHARE_ID + '&shareid=' + yunData.SHARE_ID + '&uk=' + yunData.SHARE_UK + '&fid_list=' + fidlist + '&extra=' + '{"sekey":"' + context.sekey + '"}';
                    data = {
                        encrypt: 0,
                        extra: '{"sekey":"' + context.sekey + '"}',
                        product: 'share',
                        primaryid: yunData.SHARE_ID,
                        shareid: yunData.SHARE_ID,
                        uk: yunData.SHARE_UK,
                        fid_list: fidlist
                    };
                } else {
                    url = RestAPI.GET_CAPTCHA + '?prod=share';
                }
            }
            if (typeof vcode == 'object') {
                data = $.extend(data, vcode);
            }
            data.type = (items.length > 1 || items[0].isdir) ? "batch" : "dlink";
        } else {
            url = RestAPI.DOWN_GET_DLINK;
            if ("function" != typeof yunData.sign2) try {
                yunData.sign2 = function() {
                    return yunData.sign2;
                };
            } catch (o) {}
            data = {
                sign: base64Encode(yunData.sign2(yunData.sign3, yunData.sign1)),
                timestamp: yunData.timestamp,
                bdstoken: yunData.MYBDSTOKEN,
                fidlist: fidlist,
                type: (items.length > 1 || items[0].isdir) ? "batch" : "dlink"
            };
        }
        httpHwnd = $.post(url, data, function(o) {
            var dlink = typeof o.dlink == 'object' ? o.dlink[0].dlink : o.dlink;
            if (-20 === o.errno) {
                getDownloadInfo(type, items, JSON.stringify(vcode) == '{}' ? 'getvcode' : 'showvcode');
            } else if (0 === o.errno) {
                if (o.list || dlink) {
                    if (!dlink) {
                        var list = o.list,
                            opt = list[0];
                        dlink = opt.dlink;
                    }
                    dlink = dlink + '&zipname=' + encodeURIComponent(getDownloadName(items));
                    o.dlink = dlink;
                    if (shareData) {
                        var obj = JSON.parse(shareData.viewShareData);
                        obj.dlink = dlink;
                        shareData.viewShareData = JSON.stringify(obj);
                    }
                    if (1 == items.length) {
                        items[0].dlink = dlink;
                        if (items[0].item) {
                            $(items[0].item).attr('dlink', dlink);
                        }
                        try {
                            if (yunData.SHAREPAGETYPE == "single_file_page") {
                                yunData.FILEINFO = items;
                            }
                        } catch (e) {}
                    }
                } else {
                    if (o.vcode_img && o.vcode_str) {
                        o.errno = -20;
                        if (vcode == 'getvcode') {
                            //return getDownloadInfo(type, items, getVCode('test',o.vcode_str));
                        }
                    }
                }
                showHelperDialog(type, items, o, vcode);
            } else {
                showHelperDialog(type, items, o, vcode);
            }
        });
    }

    function showHelperDialog(type, items, opt, vcode) {
        var canvas = document.canvas ? document.canvas : Canvas ? new Canvas() : new disk.ui.Canvas(),
            _ = document.helperdialog || createHelperDialog(),
            isVisible = _.isVisible(),
            status = 0;
        document.canvas = canvas;
        _.canvas = canvas;
        _.type = type;
        _.items = items;
        if (type < BCHelperMenuBtns.length) {
            if (0 === opt.errno) {
                status = 1;
                if (type < 2) {
                    _.canvas.setVisible(false);
                    _.setVisible(false);
                    if (0 === type) {
                        iframe.src = opt.dlink;
                        myToast(msg[3], 1);
                    } else {
                        copyText(opt.dlink);
                    }
                    return;
                }
                _.sharefilename.innerHTML = getDownloadName(items);
                _.sharedlink.value = opt.dlink;
                _.dlink = opt.dlink;
                //_.downloadbtn.href= opt.dlink;
                _.focusobj = _.sharedlink;
            } else if (-19 == opt.errno) {
                status = 2;
                _.vcodeimg.src = opt.img;
                _.vcodeimgsrc = opt.img;
                _.vcodevalue = opt.vcode;
                _.vcodetip.innerHTML = vcode ? msg[9] : '';
                _.vcodeinput.value = '';
                _.focusobj = _.vcodeinput;
            } else if (-20 == opt.errno) {
                status = 2;
                _.vcodeimg.src = opt.vcode_img;
                _.vcodeimgsrc = opt.vcode_img;
                _.vcodevalue = opt.vcode_str;
                _.vcodetip.innerHTML = vcode && vcode != 'getvcode' ? msg[9] : '';
                _.vcodeinput.value = '';
                _.focusobj = _.vcodeinput;
            } else {
                _.canvas.setVisible(false);
                _.setVisible(false);
                return myToast(errorMsg ? errorMsg.ErrorMessage[opt.errno] : disk.util.shareErrorMessage[opt.errno] || (msg[11] + opt.errno));
            }
        }
        _.loading.style.display = 0 === status ? '' : 'none';
        _.showdlink.style.display = 1 == status ? '' : 'none';
        _.showvcode.style.display = 2 == status ? '' : 'none';
        _.copytext.style.display = 1 == status ? '' : 'none';
        if (!isVisible) {
            _.canvas.setVisible(true);
            _.setVisible(true);
        }
        _.setGravity(Pancel ? Pancel.CENTER : disk.ui.Panel.CENTER);
        _.focusobj.focus();
    }

    function createHelperDialog() {
        var html = '<div class="dlg-hd b-rlv"title="有一份田"><span title="关闭"id="helperdialogclose"class="dlg-cnr dlg-cnr-r"></span><h3><a href="' + getApiUrl('getnewversion', 1) + '"target="_blank"style="color:#000;">' + APPNAME + '&nbsp;' + VERSION + '</a><a href="javascript:;"title="点此复制"id="copytext"style="float:right;margin-right:240px;display:none;">点此复制</a></h3></div><div class="download-mgr-dialog-msg center"id="helperloading"><b>数据赶来中...</b></div><div id="showvcode"style="text-align:center;display:none;"><div class="dlg-bd download-verify"style="text-align:center;margin-top:25px;"><div class="verify-body">请输入验证码：<input type="text"maxlength="4"class="input-code vcode"><img width="100"height="30"src=""alt="验证码获取中"class="img-code"><a class="underline"href="javascript:;">换一张</a></div><div class="verify-error"style="text-align:left;margin-left:84px;"></div></div><br><div><div class="alert-dialog-commands clearfix"><a href="javascript:;"class="sbtn okay postvcode"><b>确定</b></a><a href="javascript:;"class="dbtn cancel"><b>关闭</b></a></div></div></div><div id="showdlink"style="text-align:center;display:none;"><div class="dlg-bd download-verify"><div style="padding:5px 0px;"><b><span id="sharefilename"></span></b></div><input type="text"name="sharedlink"id="sharedlink"class="input-code"maxlength="1024"value=""style="width:500px;border:1px solid #7FADDC;padding:3px;height:24px;"></div><br><div><div class="alert-dialog-commands clearfix"><a href="javascript:;"class="sbtn okay postdownload"><b>直接下载</b></a><a href="javascript:;"class="dbtn cancel"><b>关闭</b></a></div></div></div>',
            o = $('<div class="b-panel download-mgr-dialog helperdialog" style="width:550px;">').html(html).appendTo(document.body);
        o[0].pane = o[0];
        var _ = Pancel ? new Pancel(o[0]) : new disk.ui.Panel(o[0]),
            vcodeimg = o.find('img')[0],
            vcodeinput = o.find('.vcode')[0],
            sharedlink = o.find('#sharedlink')[0],
            vcodetip = o.find('.verify-error')[0],
            copytext = o.find('#copytext')[0],
            postdownloadBtn = o.find('.postdownload')[0],
            dialogClose = function() {
                vcodeinput.value = '';
                vcodetip.innerHTML = '';
                vcodeimg.src = '';
                _.canvas.setVisible(false);
                _.setVisible(false);
                if (httpHwnd) {
                    httpHwnd.abort();
                }
            },
            postvcode = function() {
                if (httpHwnd) {
                    httpHwnd.abort();
                }
                var v = vcodeinput.value,
                    len = v.length,
                    max = msg.length - 1,
                    i = max,
                    vcode = getVCode(v, _.vcodevalue);
                i = 0 === len ? 8 : (len < 4 ? 9 : i);
                vcodetip.innerHTML = msg[i];
                if (i != max) {
                    return vcodeinput.focus();
                }
                getDownloadInfo(_.type, _.items, vcode);
            },
            postdownload = function(e) {
                //if(!e){iframe.src = _.dlink;}
                iframe.src = _.dlink;
                dialogClose();
                myToast(msg[3], 1);
            };
        _._mUI.pane = o[0];
        _.loading = o.find('#helperloading')[0];
        _.showvcode = o.find('#showvcode')[0];
        _.showdlink = o.find('#showdlink')[0];
        _.copytext = copytext;
        _.downloadbtn = postdownloadBtn;
        _.vcodeinput = vcodeinput;
        _.sharedlink = sharedlink;
        _.sharefilename = o.find('#sharefilename')[0];
        _.vcodeimg = vcodeimg;
        _.vcodetip = vcodetip;
        _.vcodeimgsrc = '';
        _.vcodevalue = '';
        _.focusobj = sharedlink;
        $(copytext).click(function() {
            copyText(_.dlink);
            this.blur();
        });
        $(vcodeimg).siblings('a').click(function() {
            vcodeimg.src = _.vcodeimgsrc + '&' + new Date().getTime();
            vcodeinput.focus();
        });
        vcodeinput.onkeydown = function(e) {
            if (13 == e.keyCode) {
                postvcode();
            }
        };
        o.find('.postvcode').click(postvcode);
        $(postdownloadBtn).click(postdownload);
        $('#sharedlink').focusin(function() {
            this.style.boxShadow = '0 0 3px #7FADDC';
            this.select();
        }).focusout(function() {
            this.style.boxShadow = '';
        }).mouseover(function() {
            this.select();
            this.focus();
        }).keydown(function(e) {
            if (13 == e.keyCode) {
                postdownload();
            }
        });
        $(window).bind("resize", function() {
            _.setGravity(Pancel ? Pancel.CENTER : disk.ui.Panel.CENTER);
        });
        o.find('#helperdialogclose').click(dialogClose);
        o.find('.dbtn').click(dialogClose);
        _.setVisible(false);
        document.helperdialog = _;
        return _;
    }

    function getVCode(v, k) {
        return FileUtils ? {
            input: v,
            vcode: _.k
        } : {
            vcode_input: v,
            vcode_str: k
        };
    }

    function myToast(msg, type) {
        try {
            unsafeWindow.myToastInjection(msg, type, isOther);
            return;
        } catch (e) {}
        try {
            var Toast = {}, obtain, Pancel = null;
            if (isOther && disk.ui) {
                obtain = disk.ui.Toast;
                Toast.obtain = {};
                Toast.obtain.useToast = Utilities.useToast;
            } else {
                Toast = require("common:widget/toast/toast.js");
                Pancel = require("common:widget/panel/panel.js");
                obtain = Toast.obtain;
            }
            var o = Toast.obtain.useToast({
                toastMode: type ? obtain.MODE_SUCCESS : obtain.MODE_FAILURE,
                msg: msg,
                sticky: false,
                position: Pancel ? Pancel.TOP : (disk.ui ? disk.ui.Panel.TOP : undefined)
            });
            try {
                $(o._mUI.pane).css({
                    "z-index": 999999
                });
            } catch (e) {}
        } catch (err) {
            if (!type) {
                alert(msg);
            }
        }
    }

    function copyText(text) {
        GM_setClipboard(text);
        myToast(msg[10], 1);
    }

    function createDownloadIframe() {
        if (iframe) {
            return iframe;
        }
        var o = $('#helperdownloadiframe');
        iframe = o.length ? o[0] : '';
        if (!iframe) {
            iframe = $('<div style="display:none;">').html('<iframe src="" id="helperdownloadiframe" name="helperdownloadiframe"></iframe>').appendTo(document.body).find('#helperdownloadiframe')[0];
        }
        $(iframe).load(function() {
            if (this.src == 'javascript:;') {
                return;
            }
            myToast(msg[12], 0);
        });
        return iframe;
    }

    function getListViewCheckedItems() {
        var items = [];
        if (shareData) {
            items.push(JSON.parse(shareData.viewShareData));
        } else if (isOther) {
            if (FileUtils) {
                items = FileUtils.getListViewCheckedItems();
            } else if (yunData) {
                if (yunData.SHAREPAGETYPE == "multi_file") {
                    items = getCheckItems();
                } else if (yunData.SHAREPAGETYPE == "single_file_page") {
                    items = yunData.FILEINFO;
                }
            }
        } else {
            items = getCheckItems();
        }
        return items;
    }

    function getCheckItems() {
        var items = [],
            boxCss = $('.list-selected').length ? 'module-list-view' : 'module-grid-view';
        $('div.' + boxCss).find('.item-active').each(function(i, o) {
            items.push(getListViewCheckedItemInfo(o));
        });
        return items;
    }

    function getListViewCheckedItemInfo(obj) {
        var o = $(obj),
            fs_id = o.attr('data-id'),
            category = o.attr('data-category'),
            isdir = o.attr('data-extname') == 'dir' ? 1 : 0,
            server_filename = o.find('[node-type="name"]').attr('title'),
            dlink = o.attr('dlink') || '';
        return {
            'fs_id': fs_id,
            'category': category,
            'isdir': isdir,
            'server_filename': server_filename,
            'dlink': dlink,
            'item': obj
        };
    }

    function getDownloadName(items) {
        var packName = items[0].server_filename;
        if (items.length > 1 || 1 == items[0].isdir) {
            try {
                downProxy.prototype.setPackName(FileUtils.parseDirFromPath(items[0].path), !items[0].isdir);
                packName = downProxy.prototype._mPackName;
            } catch (e) {
                packName = '【批量下载】' + packName + '等.zip';
            }
        }
        return packName;
    }

    function downloadCounter(C) { // C:items, B:isOneFile
        if (!isOther) {
            return;
        }
        var F = FileUtils ? FileUtils.share_uk || disk.util.ViewShareUtils.uk : yunData.SHARE_UK,
            D = FileUtils ? FileUtils.share_id : yunData.SHARE_ID,
            A = [],
            B = (1 == C.length && 0 === C[0].isdir),
            G = shareData ? disk.util.ViewShareUtils.albumId : '';
        for (var _ in C) {
            if (C.hasOwnProperty(_)) {
                var E = {
                    fid: C[_].fs_id,
                    category: C[_].category
                };
                A.push(E);
            }
        }
        G && B && $.post(disk.api.RestAPI.PCLOUD_ALBUM_DOWNLOAD_COUNTER, {
            uk: F,
            album_id: G,
            fs_id: C[_].fs_id
        });
        !G && $.post(FileUtils ? disk.api.RestAPI.MIS_COUNTER : RestAPI.MIS_COUNTER, {
            uk: F,
            filelist: JSON.stringify(A),
            sid: D,
            ctime: FileUtils ? FileUtils.share_ctime : yunData.SHARE_TIME,
            "public": FileUtils ? FileUtils.share_public_type : yunData.SHAREPAGETYPE,
            t: (new Date()).getTime(),
            _: Math.random()
        });
        !G && B && $.get(FileUtils ? disk.api.RestAPI.SHARE_COUNTER : RestAPI.SHARE_COUNTER, {
            type: 1,
            shareid: D,
            uk: F,
            sign: FileUtils ? FileUtils.share_sign : yunData.SIGN,
            timestamp: FileUtils ? FileUtils.share_timestamp : yunData.TIMESTAMP,
            t: new Date().getTime(),
            _: Math.random()
        });
    }
})();
loadJs('function myToastInjection(msg,type,isOther){try{var Toast={},obtain,Pancel=null;if(isOther&&disk.ui){obtain=disk.ui.Toast;Toast.obtain={};Toast.obtain.useToast=Utilities.useToast}else{Toast=require("common:widget/toast/toast.js");Pancel=require("common:widget/panel/panel.js");obtain=Toast.obtain}var o=Toast.obtain.useToast({toastMode:type?obtain.MODE_SUCCESS:obtain.MODE_FAILURE,msg:msg,sticky:false,position:Pancel?Pancel.TOP:(disk.ui?disk.ui.Panel.TOP:undefined)});try{$(o._mUI.pane).css({"z-index":999999})}catch(e){}}catch(err){if(!type){alert(msg)}}}');

function base64Encode(a) {
    var b, c, d, e, f, g, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (d = a.length, c = 0, b = ""; d > c;) {
        if (e = 255 & a.charCodeAt(c++), c == d) {
            b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4), b += "==";
            break;
        }
        if (f = a.charCodeAt(c++), c == d) {
            b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4 | (240 & f) >> 4), b += h.charAt((15 & f) << 2), b += "=";
            break;
        }
        g = a.charCodeAt(c++), b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4 | (240 & f) >> 4), b += h.charAt((15 & f) << 2 | (192 & g) >> 6), b += h.charAt(63 & g);
    }
    return b;
}

function isUrl(url) {
    return /^(http|https):\/\/([\w-]+(:[\w-]+)?@)?[\w-]+(\.[\w-]+)+(:[\d]+)?([#\/\?][^\s<>;"\']*)?$/.test(url);
}

function getApiUrl(action, type) {
    return 'http://app.duoluohua.com/update?action=' + action + '&system=script&appname=dupanlink&apppot=scriptjs&frompot=dupan&type=' + type + '&version=' + VERSION + '&t=' + t;
}

function loadJs(js) {
    var oHead = document.getElementsByTagName('HEAD')[0],
        oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.text = js;
    oHead.appendChild(oScript);
}