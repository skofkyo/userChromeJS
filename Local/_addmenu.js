//====================================================================//
// command 屬性からオリジナルの hidden 等を連動させる関數
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

/**
 * ファイルメニューなどを右クリックメニューから無理矢理使えるようにする
 */

// 既存の menupopup をサブメニューとして利用する関數
// menu に subpopup 屬性が必要
function subPopupshowing(event) {
	var subPopup = document.getElementById(event.currentTarget.getAttribute('subpopup'));
	if (!subPopup) return;

	var popup = event.target;
	if (!popup.hasAttribute('style')) {
		popup.style.cssText = [
			'-moz-appearance: none !important;'
			,'max-height: 1px !important;'
			,'border: none !important;'
			,'background: transparent !important;'
			,'opacity: 0 !important;'
		].join(' ');
	}
	popup.style.setProperty('min-width', (popup._width || 100)+'px', 'important');

	var {screenY, screenX, width} = popup.boxObject;
	var popupshown = function(evt) {
		var utils = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
		utils.sendMouseEvent('mousemove', screenX, screenY, 0, 1, 0);
		subPopup.removeEventListener('popupshown', popupshown, false);
		popup._width = subPopup.boxObject.width;
	};
	setTimeout(function() {
		subPopup.addEventListener('popupshown', popupshown, false);
		subPopup.openPopupAtScreen(screenX-2, screenY-2, true);
	}, 0);
};
//====================================================================//
// 可以导入多文件的配置。默认在这个文件加载后执行。 include('');
// 调整位置3种方法: insertBefore, insertAfter, position

// app({
//     label: "重启浏览器",
//     oncommand: "Application.restart();"
// });
page({
        label: "addMenuPlus重載/編輯",
        tooltiptext: "左鍵重載 ；右鍵編輯",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABO0lEQVRIib2WYbGDMBCEKwEJSNj5zkClIAEJOKgEJCChEpCAhEro+5N04Eho0r5yM/yBy+3tsrnkcqkMYJF0rV1XHWb2NLMnMEpq/q2wpAbozGwyszkCBbAH0H0NAgzAY10889wltZ+waH33BUCqBilkEaXrnQq3InYpJsAC9IFpfD95MwBj+DYfggBDAmTjrpy9g1nW64acZI2XDBhTeZkmRy9rMjdYeCNXzT4JjS6uRrdLTFDv9+WOA+id9FMKaGOCT/aFM0vaFN4EtSDFdc4EOk26c8xwmr1LN2zMPRg/xxs2JPsRtKMu6boeQ6HB0a3Lj6AY0RSejaRm/R+BDugzk/54qIaCLXBzTHMFk0dHtWMlyczuJQCRyTcn7VugcAAO1QA+wv/w0s1mNgHdL25DL3f9/G7n7V0af9jEflS+F9XNAAAAAElFTkSuQmCC",
        oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
		onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
        position: 9999
})

new function() {
    var items = [{
            label: "Google",
            tooltiptext: "左鍵：Google 搜尋選取文字 (新分頁前景)\n右鍵：Google 站內搜索選取文字 (當前分頁)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        loadURI('https://www.google.com/search?q=site:' + content.location.host + ' ' + encodeURIComponent(getBrowserSelection()));
                        break;
                }
            },
        }, {
            label: "Google庫存頁面搜索",
            tooltiptext: "左鍵：庫存搜索當前頁面\n右鍵：庫存搜索剪貼簿網址",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        loadURI("https://webcache.googleusercontent.com/search?q=cache:" + content.location.href);
                        break;
                    case 2:
                    var url = readFromClipboard();
					if (/^(https?:\/\/)?([\w\-]+\.)+\w+/.test(url))
                        gBrowser.selectedTab = gBrowser.addTab("https://webcache.googleusercontent.com/search?q=cache:" + url);
                        break;
                }
            },
        }, {
            label: "Youtube",
            url: "https://www.youtube.com/results?search_query=%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYhe3Wz0tUURjG8Xc195xz77n3nmv2AyIoccToT2jlPxCEIC7aiLjIoBa1cCm0bBSxCZ1EDKQGBCMoFGsSHXVm0EUuxkJIEUajceEsxmBAeFokA2rmK4XTYh747M75nu0hqq66/2UZI++lAzuRDtRSOlBLGaM2MoGNf8KojXI3UONpI28eeDwVqPF0YOMspYwdJyKieU82LwQ2KmHek800a+x40tiohFljx2nGl5kZo1ARvsxQwsjcR6PANXP5PPvsSRJG5mjKl3vvjQJH4lINfmxtorj2Fdn7nUhc8Fn3jjPlyz2a9BW4EjfCKJVKZcVvW1jpeoQPVy6yG4fRO1+B7XoYxWLxgN3dXRQ2c1h++AATtT6/tY/e+ApsjfXY2dn5rUKhgO+fV5C608rv+Qo07iuwNdYjn8//0fb2Nr68HMXrGs1q0pgnwdZQh1wud6LkyDDGAofVpLgnwdZQh/X19WN9WphH5PYtdNkhvGI2adSTYAtfw+rq6hHLi4uItreh07MR0YLf8yTohSfBFr6KbDZbtjg3h6ftbbhbG+CxY2HkNK19NKxFadiV4Bg85yM1PY3k5ASetLagw7XRbVuIMe8foUWJYq7YeO5KcAy6Eh2Bh3YZQrcjEGPeO07MFWs0oEVywJXgip7i7Im0SFJUW0PPXIFKiGpriPod0dSvBSrCEU1ERNSnrUifFjhbVuTAvzDihFp6tPW2V4ulMkfke7XAX/nVKDd7tDURcUItZ/PVrq46xn4C/yowaRwJnAkAAAAASUVORK5CYII=",
        }, {
            label: "百度",
            url: "http://www.baidu.com/s?wd=%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC",
        }, {
            label: "維基百科",
            url: "https://zh.wikipedia.org/wiki/%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII=",
        }, {
            label: "BT&字幕多引擎搜索",
            tooltiptext: "左鍵：字幕搜尋選取文字\n右鍵：字幕搜索剪貼簿文字",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoElEQVQ4jdWT0Q3DIAxEbwVW8AqswAqZxSuwgldgFlbwCl7h+oXVKKkqJelHkSwQh57ubAEAvFngWlfOzwBuR3gMYGZpb4yR9yLCiEgtIo4AVaWZpTDGoKoSAOecbK0RAEspdPcjwN0pIim8P3T3BHyMEBEspewAy2prLe27O2ut3yOYGXvvBJD7gp1GWLnPmjjn3DVx27YfjfEy4L//wguf2NOhL0+T5QAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.addTab("https://rarbg.to/torrents.php?search=" + encodeURIComponent(getBrowserSelection()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kat.cr/usearch/" + encodeURIComponent(getBrowserSelection()) + "/");//KickassTorrents
                        gBrowser.addTab("http://seed2peer.com/search/" + encodeURIComponent(getBrowserSelection()) + "/");//Seed2Peer
                        gBrowser.addTab("https://thepiratebay.vg/search/" + encodeURIComponent(getBrowserSelection()));//海盜灣
                        gBrowser.addTab("http://sub.makedie.me/sub/?searchword=" + encodeURIComponent(getBrowserSelection()));//射手網(偽)
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(getBrowserSelection()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(getBrowserSelection()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(getBrowserSelection()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(getBrowserSelection()));//163sub
                        //http://www.opensubtitles.org/zt/search2/sublanguageid-zht,chi,zhe/moviename-%SEL%
                        break;
                    case 2:
                        gBrowser.addTab("https://rarbg.to/torrents.php?search=" + encodeURIComponent(readFromClipboard()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kat.cr/usearch/" + encodeURIComponent(readFromClipboard()) + "/");//KickassTorrents
                        gBrowser.addTab("http://seed2peer.com/search/" + encodeURIComponent(readFromClipboard()) + "/");//Seed2Peer
                        gBrowser.addTab("https://thepiratebay.vg/search/" + encodeURIComponent(readFromClipboard()));//海盜灣
                        gBrowser.addTab("http://sub.makedie.me/sub/?searchword=" + encodeURIComponent(readFromClipboard()));
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(readFromClipboard()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(readFromClipboard()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(readFromClipboard()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(readFromClipboard()));//163sub
                        break;
                }
            },
        }, {
            label: "多引擎字幕搜索",
            tooltiptext: "左鍵：字幕搜尋選取文字\n右鍵：字幕搜索剪貼簿文字",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcElEQVQ4jW2TW0zTdxzFj0ORhDTMC5rYYEh8YCQ+YLy0W6YEYTG+LUHUZNGwB5kPxvDQgLiEkMw1AZsIblzKrdxWaNFx90K4ClUqpQ4LJGyuKNlYucwwxpC2/9/37M2ExM/75zx9DvABhrOzEzuOHk35OTHxCxtQbtfpPicZAQBFQNKHnPeM5+RkPz5zpncwPX2wDvDUA//WAN5fzOb+P9686Xvd3j5m37vXXrN9+6dbxAdnzyZbgR/vJSQsLD59ysDoKOt27GAdwCqAnrw8kmRgZIRNMTGsBVaaIiO/BQDU7tv32ZzT+fdsVRUdBw5sLgwMhEiGvfn5WjWgqoDwRH5+SCkVfnLlSrgcCNoA6TEYCAAoBSyTZjNJvpssKtL6LlzQ3vp86sHp06wFVDVAb0GBkBTX1avSEhcn9ZGRoY4jRzQAQAXQN3D+vBKlQv/4/WpheFjNVlQoKyDVgFgBeVlYSJJqbW6OofV19dJiCd8/fDgEALAC9x6lpIiIhMZzcjTvrVuaz2KR+uhoPrl8WfwOBzdWVkSJCElZnZ2V/vR0rcdoJAaBj61AS4/BwODaWui32lo1XVKiLb94IYsuF0kqktxcXaWIyExZGRv37FE1gHQfO7YCu073STnQ0XXiRHhjaSk8ZbGohaEhtehySafBwO5Tp8R56BCn7twhSRm8eFHKgLAjNlZ5cnO/QxGQXKfTjftbW4PB1VVtvrNTtFCI3vx8aUtK4mhWFpvj4uizWEhSXFlZYgWkVa9fJxmFQuDroUuXZpYmJtZHMjPVXwMD6r9AQN5OT8tGIECSMnP3Ln23b5OkuE0mVQnQsWvXqtPpjMBXQGpTbOzjruPHfYvPnonf4VDjJpMsj4+LJy9PepKTad+/n9PFxSSpxkwmZQWkLSFh3pmREQEAqALss5WVG0tud8gWHS2eGzf4qqFBjV27xodpafwB4FRxMUVEnt+8Ga4EpMto7HifcRmQ4YyP37BFRLyrBoJLbrf2uq1Naz54UP3Z2yu/2mxc9nhIUk2azZuVAPtPnhze8oX2pKSf7sfH0xYVRU9uLqdLSlgJsEWvp9/ppBYOUwsG+dxkom3nzqAlNfXLLQO/O50xrxobv+82GktLgeqGyMjOum3bvM27d8879Hq6r1/nSGam62Famn3w3LlvAKCgoOCj/wFAqy0Z5ZaacgAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.addTab("http://sub.makedie.me/sub/?searchword=" + encodeURIComponent(getBrowserSelection()));//射手網(偽)
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(getBrowserSelection()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(getBrowserSelection()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(getBrowserSelection()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(getBrowserSelection()));//163sub
                        //http://www.opensubtitles.org/zt/search2/sublanguageid-zht,chi,zhe/moviename-%SEL%
                        break;
                    case 2:
                        gBrowser.addTab("http://sub.makedie.me/sub/?searchword=" + encodeURIComponent(readFromClipboard()));
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(readFromClipboard()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(readFromClipboard()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(readFromClipboard()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(readFromClipboard()));//163sub
                        break;
                }
            },
        }, {
            label: "多引擎BT搜索",
            tooltiptext: "左鍵：BT搜尋選取文字\n右鍵：BT搜索剪貼簿文字",
            image: "data:image/png;base64,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",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.addTab("https://rarbg.to/torrents.php?search=" + encodeURIComponent(getBrowserSelection()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kat.cr/usearch/" + encodeURIComponent(getBrowserSelection()) + "/");//KickassTorrents
                        gBrowser.addTab("http://seed2peer.com/search/" + encodeURIComponent(getBrowserSelection()) + "/");//Seed2Peer
                        gBrowser.addTab("https://thepiratebay.vg/search/" + encodeURIComponent(getBrowserSelection()));//海盜灣
                        break;
                    case 2:
                        gBrowser.addTab("https://rarbg.to/torrents.php?search=" + encodeURIComponent(readFromClipboard()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kat.cr/usearch/" + encodeURIComponent(readFromClipboard()) + "/");//KickassTorrents
                        gBrowser.addTab("http://seed2peer.com/search/" + encodeURIComponent(readFromClipboard()) + "/");//Seed2Peer
                        gBrowser.addTab("https://thepiratebay.vg/search/" + encodeURIComponent(readFromClipboard()));//海盜灣
                        break;
                }
            },
        }, /*{
            label: "subom字幕庫",
            tooltiptext: "左鍵：字幕搜尋選取文字 (新分頁前景)\n右鍵：字幕搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWklEQVQ4jW2TW47FIAxDHfrgLhZ6968pOfORtKWjqVSJoGCM7cgBGDiAg/uJAz7AGcBgePa4E40AP+AgBqgYpoJJmBmSWGzFJDTtybJWQUUACAaLCjJxMn3+zzIJSAWpACMATGJwou+G2o71SmkVO7ZcfyjHB7UdfTcGJ6YSDC5EHNR2St+wI4GOJf62ol6wXlHfo1fCGQiHJYtoWJNvCDs/a2TlDBbdGgQaDHTELTAeEM9DtwPhjNmSAA4ygfN6u/qOtTV0aCv6hjY6KgA2M7iLo0bT98/hvmPHFuC9Ml8aALbc1CJMnrTP13OCQdo3M7hEnIUiBbySCqC+Yr0+IjrILzQnqPYalrX1tjEs3Sg97A0bS4QqNCivIJXjQ2kfrNfX299B0pPEK5rXQP1J8qs4CQGXJ8qgkgMyD0wOkOVgXXt2D5PByBzAz31TODCNMCNHO13xR1gHfgFv0qfjmordvwAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "字幕帝",
            tooltiptext: "左鍵：字幕搜尋選取文字 (新分頁前景)\n右鍵：字幕搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACFUlEQVQ4jZ2OX0hTYRjG3+/0584La99naRihY7I6otRdEBhunj+I2Y21ihUWw/UHIjYrmdC08ELCrrroxi5c7Zwdu+qmHUeYOVxU1xNalNtiEHij108Xczb6M1YP/Hi/7+V5Hl4idc8BUoWXeh069XCtLjxcI0X0UW9jKzGVv6T+pg3yN2/ScEt9XGjeJF1sMF0kiRRRYlcPgmKdoHhXfTyVwfwtII2vEymOEoUPgea7QVadmN2gQCtI5etEiviPgq4/FFidoIQMSlSm/Je/DDLk6gJHSRp14sRiAMrSDbiTZzGwHMKpdAiD6TBk24eexSAG0+Ht3cnXI9g50gZS95YLdt9xYyo7iye5F7j07h7ia69g5m2YeRuB9/fxcHUOVj4FI5+Embcxk51Dw7XDPwuk2054lq7jXCaCMytjGFgO4WjKD18mgqGVMfgyERxLXUT/21s4nxmH/uYmdgXbqy4YdWNqdRZWMQWzuIDHny0Mf5iEUbBhFGyYhQVc+fgAjz49h1VMYSYbQ0OwcoEmvrCh/WDjTrDJDrCJDrCoCxR1lt9bUNQFNuEqe+62g53eB9L4NyKF+yVNxCSFG5LGDUnjcaaIeVLFd6YJVEMqX2MqT0gKNySVPyOt6TJtSfqFHZIuppkuUIF0kSNF9BERq/LVkLfxCGn863ZYFd7agd/FJF1Mky5ypAnPv4bLUkUbqeJ4LcsP16VoiDmqrqkAAAAASUVORK5CYII=",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "SUBHD",
            tooltiptext: "左鍵：字幕搜尋選取文字 (新分頁前景)\n右鍵：字幕搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,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",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "163sub",
            tooltiptext: "左鍵：字幕搜尋選取文字 (新分頁前景)\n右鍵：字幕搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4jdWTywnAMAxDvZN28k7aSTupJ5v0k0vTUmowyMK8RIRERHixw1V39DOA5QiPATLTAFqTnM4nAMkxlyUZgDOzAdWXAAB9AgDbNkmT3EGngFooWOnRG/0poDJKsqS+wXF+5xW+A/z7L2wjHbVZI+KpCwAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "opensubtitles",
            url: "http://www.opensubtitles.org/zt/search2/sublanguageid-zht,chi,zhe/moviename-%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoElEQVQ4jdWT0Q3DIAxEbwVW8AqswAqZxSuwgldgFlbwCl7h+oXVKKkqJelHkSwQh57ubAEAvFngWlfOzwBuR3gMYGZpb4yR9yLCiEgtIo4AVaWZpTDGoKoSAOecbK0RAEspdPcjwN0pIim8P3T3BHyMEBEspewAy2prLe27O2ut3yOYGXvvBJD7gp1GWLnPmjjn3DVx27YfjfEy4L//wguf2NOhL0+T5QAAAABJRU5ErkJggg==",
        }, {
            label: "RARBG",
            url: "https://rarbg.to/torrents.php?search=%SEL%&order=seeders&by=DESC",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jYWTP4jXMBiGK3IIde5cHG6wi1MRp04u2TNKxoNsQjaR4HAIhduy3FREDqFznBwyZxSyOBXH4CBC4RCR54a2P+9PDwPv8r0fT96PLymAB0ANvAHeA6c7OgGO194bKoAXwBf+f34Bb4Gj24DXwM+QMtJEpL0pZSPGJULKG+hsF+BjplWBTgdata8xZIBL4OndBDHT6YDQAdMnQsyEmDEuIfQCVjYyLylOdgHCBIQJuDFtcf/mDNJGhAlIG8nLJO92AdIE5C3ANM0ou9R1f0ig7gfYgHWREDM+TJg+Io2nU57Bp20bT+4BeKTxCD3SyGGRWGRd3FKd7m8hTDTCUXc9rXQINVB3PXXX0wjHNM3b7ce7gNEnysZQNgZtRwC0HSkbQ9UahB62BJ+BRzuASNloylqhzdI8zzOtsP/qK/j6GNcAgaKWFJVEGQfwB7iMaaJqFOXqucFvEAUcHQDDGCjKjqLskLoH+MHywX67wVNUi1dUAh8iwHfgVQG8BGLOMzEmQkxMUwb4usY8A4gpHfyUJoBvgCzWpmfAOXABfAQ+AM9X7/H68j6t3gUwrP7DKzy0Ezk+OKScAAAAAElFTkSuQmCC",
        }, {
            label: "Seed2Peer",
            url: "http://seed2peer.com/search/%SEL%/",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACJ0lEQVRYhe2XvZGrMBDHSTS6BNECEUOAqMKxm6ABanARhCbxIlXh3H14xiUQGHgvsBdWQsLgO897wWlGEZrdH/vxXykIftf/trgOE67CPWtEiZurcI/f2zqN7yB3HWRFD/LQQVa0dRpTG3iGbvuM37mOzl86+mNuceMq3Ld1Gg+QXwaQg7FP+bWDrAiCILiD3A2n/Do7A/nlDnK3CMCUqObOH5s1oryD3M0NTxBtncYdZMXSGS8E12HypcVtNcApv9p/2kFWLAKAHHqQRzeACvfojOvoTGuAKVFhCjrICswp5hpBsCaosx7koQd5HGGfkZqHvxHlCECKbs3qQR7R4QhgOaJgzjRMAOLGdZhsBDi8AmjrNMYoYMH+JMDLCFCAHuRhZoTWAGtEuQUAW9Oogc0ARhc8+n6Nczu3bwM8IKgIvYYwRSe/GDqwtQaCwEzDq3qwVRGN+gCwUL1dgMtWQ66jswuCGsS/NwC26sAYBcc8YEpU9Iyhdpa8vq2EyxBTPRihd2j727PABUFnA7amFeJZNfsBVkzDGQTVhmcaUHRo3p0AzxFNZ8cm51MkHqlgSlQ0/L5W8nXB2wsBuI7OYy8vGP8YAFOiwvvAUiX/KAAtRKZEhca9UvodAK7DhClRMSWq8TJKWpE1opwqPL88BcbYS7Ng0986L6U6TFaIjHcafgsAW/DjAK4rOZ0FHwUYIexHCRlErgeH/fho6zRGkE3Of9e/Wn8BoZT6QXxnPmMAAAAASUVORK5CYII=",
        }, {
            label: "KickassTorrents",
            url: "http://kat.cr/usearch/%SEL%/",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACP0lEQVQ4jY2S30uTYRTHn7/Bi4JwERgRWELJnMGYm6Gjd5JkuhzOrTVrbQOHTR1FM40aaxPWcJUr57aLtjFsYpQwsknSD6grqcxhJQkmOrIaQ520fbtY73i3NeoLn4vnfM85D+dwCPkjiYSz87al7adWIeikY73aer/bLt9kxvTqOo+l7+QiyZexi3oeDugQDujgtEoT3iHFNv0OB3Tw2OXJgPNcin5rT/MN2eIWYXlJ8K4yPXlfi//F0ndiOdtAJeUaHnpVyGfp40sAwPfYYoEXcp1Fi7C8JDOXqjYy7lJi3KXEhFuFmUdmTE9cRXIrAQB4/2YMtM9EJmZLCSGEGLS174JOGYJOGSb9PSimV1O3QOcFnTJ0tFVdy2xbXTPnc0jgc0gQGlXj9fQ9rC7PZQsX52fwbe0zHvu6Qef5HBKcaWWbCSGEaOSciPdmM5h8+vAMAJCIx5Dv0UiOH8iMIG2q6HdZG8Hk65fZzO/RF8j3XNZG3DE1QHikNLPEel4Za2hAiGETlWVtZQEAMD/7BMMmCg9GO3P8blX1Ss4hadoPRR0DdaCJvn0KAEinU9jciCP+YxVMX9ywvz+ngUiwu/KGgZu2GfmwGfnw2NuxndwAAKzHluB3ngftXeg4vF5wyoQQcoraOzJ4kQuakcFWjLn1sF0WZGNXdFUpisfi/bUBIYSIRWUhUw8H5t7qAi5pKn+JeKVNRYtpUTUsRZfy4NZ1PRs0iuZ9Czz2LtY/i5k6xmfpxdSeyFHOjopiOb8BYYfsxcx4u9YAAAAASUVORK5CYII=",
        }, */{
            label: "NyaaTorrents",
            url: "http://sukebei.nyaa.se/?page=search&cats=0_0&filter=0&term=%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,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",
        }, {
            condition: "select",
        }, {
            label: "BTDigg Search",
            tooltiptext: "左鍵：搜尋選取文字 (新分頁前景)\n右鍵：搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADCklEQVRYhb2X34uUZRTHP2sZkoVSN0GERPgHRERCLrQG4UKhpYEFddGFN0I3idBF9MrOvOdgeePF0mUJEiyIot4I5YZGkAzO+z2FbRa2VJb9snXLVSNdL+ad2Xec3XF3mJkHnosZ5n2+n/M9Z55zXuhgmdhigUYqPFb8Lg32dXLeHZeLj9OM1wpi73sMzHpgADvFShfnXEwUn0uqrO4WwAUXM1blmRxgv8fArAUyscHEnhxoenuF5QAevGrBRQ92LFlwpMraJGFZ/bMFn+WC35g4YsGlmmDrToPdlvGGixmPgVkXLyxJPBnjHhM/uzhVzhhKqqx2cWIhwbZbTCXj3Fc8e1EQHhzLLb1m4oeOxGsAF1IxaGKDB4c8+LWU8fAdAdIqT3twrWPhps20BdfrNVNMbdMysdGCJ7ZXWF4S6yy43B2AhhszZfHs/HkfZ4WLn3LKyxb80lXxGJg1MZl8wQPt8r7JxJVuC98GcdLFhIs/THzUAlEW23oJ0AAJ/imLbc0OVFhlGW/1HEBMeMb6ovV7PfjLxf8e3Ox59OLo7dX/ionJflifO/Cvi4Mu3vNgEwC7Pud+E6W+Qcy58ftcAWYM9dGFr9NgV+k0jzAiHjVRMvFtHwHmGpQF3/Xbeg8s/ZIHa9YHwyb2WDDWaKH9ceG3llbdcdtdwrbghov/8tvw7YZ4KgZdnO85gHg3qXBvU+Rplc3tppwuW/96ayMSoxb8aMFxC473uACny8Hw/C2RfMINvu+B9ZMW/JnXwcWXx7hrXoDahdStaahh+5RVeTIZZ4VlPJdmvDSveJKwzALllFc9mO5K9MH1csbQgrY3AE7zkIu/XRywjMdLYl19Uuow32frd0tLF1wQojBGe4VVnc6GJj7dKVamYtCCiovzyTh3LwqivizjxXoOU7HVgx1tbL5k4rCLc/kznzQF1m4eXBBAbDRxJs14Hmo1Uq+LVLzpGetdRB7xh5CP9GLKAi1ZcJFQkx6crf+NLOMdj9orWeE3W1yM9gTAgw+Kb8qlM6wx8VUqnurkvFt9loNRGQG+AQAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://btdigg.org/search?info_hash=&q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://btdigg.org/search?info_hash=&q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, /*{
            label: "Torrent Search",
            url: "http://torrentproject.com/?t=%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACL0lEQVQ4jW2Tz0vUQRjGP/ujdVODDkmZhB4yqIV03ZlTFy8JHrwEHjoEHlqDzoLX71GQ8NIlPCgdhMYCdWdYPH3/hDDcELdYwUgpaSFt1w2H6bCO7X5x4DnMO+/7vM/7zAwHx8c9QRDEaV0BcSBGQHJgiXRG0Y0iAcQAlFKJHycnt36dnU0QhmHSH4yGJMUG41KzLA0VaXDC8FcaKkKzkDX0+9wwDJOHh4dd+ACKhDC8EhorDU4a3Nh6E34vDKfC8AKIBUEQ9wTNYs2CT/SYOX3tZk5fu2hcal6ObdEVBEGcyRKp7BoPhKbRmiSKuA276zbsrhNFoiT1kXXuPv197wbjZTqk5l20y9g6rmqtq1rbNkaLiuXHP7lNJqRbGHbyn7ovOnp4gmg8/7HLCcOX4ZDrPHxLlzTURRE3dfCsrTCKVbvtpr49caLYNHRgiTRATBrqXtrQey4lWbXbbli1+5BRpABiwrAVdT9KMFObb/NAGLZyBTqbCjRzUfcvU9B2G5q5RztcA2CoQJ/U1PwIVWvdpt1zgyu4wRXcpt1zVWv/j6CpDRXom/g+0Xnx/HMFnkuDy3/udbONxbZuooibbSy6/PZNJw1upEAeRaJUKqX8U455ksyHppJLoamNFMj7mqNG4z77+/tXW0nOx5lrMbYuNF9zmvmsoX+0Qvr89zZrjmq1Pv85lFKJ6T/TvZkSqdwbrmQVPXKNOwQkCYhPlkhVKpV0GIZJpVSiXC53/APx/d8s2t1b5gAAAABJRU5ErkJggg==",
        }, {
            label: "vitorrent.org",
            url: "http://www.vitorrent.org/%SEL%.html",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQklEQVQ4jYWT0bGCMBBFc1MCloAdgB2IJVACKUE6EEtIC5QglmAJYgemBM77cJKBB477mWTP7r2bNU3TIImqqvgV0zQBUFUVknDOYYZhwFqLJMZx/Al5PB5IQhLDMGAAiqJAEl3XLSptVT+fz1hrKYoC4APw3iOJLMs2k+ex2+2QhPeeaZo+gBACWZYhib7vvyb3fZ8KhRA+HcSKbdtiraWu66+A0+mEJNq2TWcm6hvHMZkT6XP9r9cr3T+fzyUgRhxPNHMeXdetxp08+K8xz/PFI4A8zxcexfMFAGC/36cZx7jdbivwZgcAl8sFay1N06RHdV0jiev1mip/7SCEgDEmjSqEkMx7v98rbxJgTnbOYYzBe5/Mc86tfFkB4kXcj+PxSFmWSOJ+v2/+0pWEGGVZpiU7HA4r7T8BcT+ilK1kgD/YzzBJmJMa5AAAAABJRU5ErkJggg==",
        }, {
            label: "BT天堂",
            url: "http://www.bttiantang.com/s.php?q=%SEL%&sitesearch=www.bttiantang.com&domains=bttiantang.com&hl=zh-CN&ie=UTF-8&oe=UTF-8",
            where: "tab",
            condition: "select",
            image: "",
        }, {
            label: "TorrentBa",
            url: "http://www.torrentba.com/tags/%SEL%/",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADM0lEQVQ4jY2Te0iUaRjFn4aQsFnTtomabHRiostnEijELmU3nZZhd9NEo/sSlbm0VDrd3U1QW1IxsszNUnPatGbGyu44uY1l6qib5QZlLWkr5B9blDDzfe/7ft9w+iOKIhf2/H3O7/DAc4iG0QKikSdT9DG+PXHJrZmTk2u+j4hdQDRyOO8nSpMo5FF+iv3lxcIB9cE5qD21ULuOgf+xF4OOtIHufTH2NIlChg07rPrxg6d2+NQnd6E974TW2wj1LyfUPysg2g5CNO8Bb8zAP4e+6qy2jZ7wWfNgRaZPPLgBbaAD2vM2aE8aoT50fwrwbIZ8ejn68xd3f2c0hn4A9Oybt5N7K6H2NiE42AWt/zbUx1egPnRC7XFA3CuH6CgC92RAcaVBrtyI22ujCt7ndS/qMgbEPQdEew3U3qvvbr9fA7XrN4j2Yog7v0DcyoJoyYFStxmB4z/gmT3+lWQw6OmwNSKGXfsRorUAouMohK8KorUM3HsE4k4RREsuhNcO7skAv7YC8qnlED4H5JpM7P76y0XkTg2zyWXxEM27IHyFEO1FYI0FUM7nQXHmgF3PBvdkgl9fA34pGfxSCrQXneDeIzhhHbOJqpaOSfRn6yCXzABvyoJo2Q/FZYfs2A65egsCFRuguFaDX04Bv7AErH4hRPM2KLXf4teE8PW0LHZs5L9bdUF/tg7+XaPA6tIhV1gRKE1H4OhKBEpTwdxLwM7MgVI9Dax+MZhzFt6UTQp+IxnnEhFRV5alLVA4E367DnL5fPh//gJD60dgaBXBnxMKuSQccrkRrMEG5pwF5jbDm2t+KhkMeiIiykuKsL3MnRiUTyRAfdwA7e8bGNoYCv/e0VCqYsHcSWAXE8FqTWD1Zrw5awn+lBi55eNf0lWmjzs0dCAMvMkOre8m5GPzwVyLoPwuQXFMAjsbBXZhCgLnp6JkbfS5OCOFfgwgiSikONmQ15c/PqCcjAS/sgzK6SiwOhOY2wzeYEF/pUXJTTUdnx0dHv6fg0qaNjG+fJWx2rPb9LS7zPa6u9jy+uZ+c1/puihXwnSjlf7PKomIJINBHzclwjQ7ekK0FBk2loh0w/neAsYEBhA6cjXRAAAAAElFTkSuQmCC",
        }, */{
            condition: "select",
        }, {
            label: "Firefox 附加元件",
            tooltiptext: "左鍵：Firefox 附加元件搜尋選取文字 (新分頁前景)\n右鍵：Firefox 附加元件搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4jY2Sa0hTcRjGD/7P2Fo2Vw1CsKyYlUn0YdnmOafstq6GWXZRmFS2OdCp2zlnXrI1IrxglJRF0ZUKEu26Sh25NC9b5gSrTxnZivpQUSHOClGfPiyLMKTnywMvPD9e3vehqAmky6dmMyJxMzzpZwXylRXJzXgbNXOizF9a75je5e29i8Dn53jx4Qmq6i0jnCh5/N8ATpC8dfWcxBGPAYcak3HJ6wAnSt/9NyDBFpZvuZD4/WB9Ehz3NyDnfOJ3nTXMPGGIyadXMQIJMDwNhqeRUhY1WN1qxvFHJqSURQ2OzRmBBJh8etU4ACuQvtJ76Tjns+F0hwUn2kzIqp0HY00MjjbvRlVLJqpaMlF8fRNYgfSN34CncbYzD6lXZUi9OumXy5B6RYZtl2XYekmKlItSVD5MB8PToDR51CzOLuleV6L6mMCH5TE8jVNPjEirkyOtbnLIa+XYVSvHzho5jLeiUexOxLE2QwjAiuTmre4Toy8/+XHNVzmUXB45WNW5CwZXODJcU5DhCofhTjgMt8ORdS8KzsYNo5tLI4MMTw+xAvlCsQL5Wu3dh9KOjTjcsQYVnUnI86ix163AXndEyBsV2NOgQEmrDlvKIgcYK9mjMVFytYWSUoxA+ivbt8PknoH97fGo8K+HrU0NU7MSWS1TkdWihKlZCaNHCYdPB71DGUywUkv/lMVON2Rf0Yw4m9bCcCbmW1K5arC8ZzWyvdOQ45sOsWsunN1L4PBrUOhbCHNd3NCKIvk3lic/GJEEqHgbNZO1063LCiSvdXyYheFplD1bjtwuFYqeqmFrWDysdyqCeqdiIPv2gmG7NxZ863zYPHGhI/7rjYd6liK3S4WDzxdhzQF5UMvTei1P61cWy4LW9jnIfBCBnKbofwO4Qskr443ZKPLHotgfhwQbGf0DJ8PZzVEwN83AjotKcAXk1TiAlqe4ZQWS3rHKsnby5ndLRfJ+bM7ZJb1anuJ+AlaseBXu6wE/AAAAAElFTkSuQmCC",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "greasyfork.org",
            tooltiptext: "左鍵：greasyfork.org搜尋選取文字 (新分頁前景)\n右鍵：greasyfork.org搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4jZXTv8qCUBgG8OegVEOhkiS0NJzJewi6qMCpqZtwkybvoDvoAlqFoOjPoBBRikPDeb5Fpb7S6oGz+Ofne17fA7xGAvABRADuxYqKa/LN808JxuMxO50OAdStoO7lNQC6rsvD4UBd15uQ9cuXAXCz2bDdblNK+Q1SVSInkwlHoxEdx+F2u62Q/X7/CZEA4FuWxSRJOBwOORgMuNvtqGka5/M5T6cTW61WHeCj6DB7vV6F9Pt9Ho9Hllkul3VAhOI3sUTiOOZsNuNjFotFHXB/Akrker1SKVUBcRyz2+3WAtH/G4ZhcLVaMQxDns9nKqV4uVxoWdbbLfgNXaZpmsyyjEop3m43mqZJIcRTE2UTAIC2bTPP8wp52E412kETIISgbdtM05QkOZ1O3470+lMlhmHQ8zzquv4yyl9Vgg+HqcxPx/kP9hE33f0JJs0AAAAASUVORK5CYII=",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "userstyles.org",
            tooltiptext: "左鍵：userstyles.org搜尋選取文字 (新分頁前景)\n右鍵：userstyles.org搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADDklEQVQ4jWXQ3U9TBxjH8ZNFRJ1UYAi0pz0lDba09Ch7ZWEyQtjktS6zHaask4zAgCYytkRbIFumnaKj2TQxc3QM416MI4EwozhTLzBLll4wFtGadWYTEbqNhKwsWbkp57sraWW/P+Dz5PkKgiAIGzduIE+9lXz1VvLVGag1mYiaHLRiHtlZKnK2bEbKeBxpWwa6LBW67EzS09IQHq7QmMv3M26u3XITvN1FKHKSqfB5Ll3+jFf3VWLT5jJR+RR3DtiIvNPCXd9hinWaJGAyq5l+cJTp+aP8PNfPkYHXsTts9PT04PP58Hg8NOzZQ4O5kImW14ie6EOWxCRgNkv8+tcX3JkP0NppIxgMsrq6SuoURSEajeJutBPtXwcUWwz88XeQgVPdjIxcBGB5eRm/3097ezsej4dQKEQsFuOgs5Fof++jgLXYxD//Rqirr2J2dhaAiatXqKqx0tzyEhV6DbYSGYfdzpt11USPe5GllAaSVsPpj0+yU7YQDocBWFlZIfB5ALe7A9sLz+PZ/QxfN9Zzra2J+eO9yKkRt2dvw7W3gpryEvr6ev/3fyKRIBQKYa+r5dtWJ/P+D9ZFNIj8fv00v1z1IxslhoaGSCQSrN/CwgKuynIenPkIq6RNAkUFGiLf9XNj2MuBht08XaKirKwId2cbZ89+yuLi4hri7XiLPwc/QdanACZ9PuEL71O2y4jD4WDfXhX3bj7Gb1MbaHVtoaa6eu2tN5xOakqsPKHKSAJGXR63hr2UykZisRiTk5N0d7XQ3PQs+x1VjI6OoigK8XicipdreXdgELVO/yhwc+gQpfIOlpaWUBRlLd7Dy/F4nEOHPbQdOcWFn+YoMFlSgVxmznkZ7nHxYumTdL99kEBgkPHxccbGxvjw2DGqX7Hz3vkrfDM9x+WZWQqMqYCUT3jER2TsBN2uWro6y/nxRgcXv2rC6XiO+v3NDP5wly+n7nNp5j7Xb99DbzQngc3paVgMIhaDiDonE1GdxU6rll1WEVGdxfbcPAqMFgwmM4VFFoxFZtI3bUIQBOE/EDAl6FFoKc0AAAAASUVORK5CYII=",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://userstyles.org/styles/browse?as=1&search_terms=" + encodeURIComponent(getBrowserSelection()) + "&sort=updated_date&sort_direction=desc");
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://userstyles.org/styles/browse?as=1&search_terms=" + encodeURIComponent(readFromClipboard()) + "&sort=updated_date&sort_direction=desc");
                        break;
                }
            },
        },
    ];
    var menu = PageMenu({
        label: "搜索選取文字/剪貼簿文字",
        insertBefore: 'page-menu-separator',
        onpopupshowing: syncHidden,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jb2TIQ6AMAxFORt4/C4EDrWDcIoJHGqOKyz5YVNdPgowExsDfvJlX9P2t2neUDtE142RJW6H6C5AafHpbwD9JDTWEwAB0FjPfpJ8gLGe67ZTaaHSwnXbaazPBwCg0ndHpYUAfgRUj5BaIgDOS3h+xnkJSUhRDk7I90F6BKh+phod0Jg4w6E4Nw4AAAAASUVORK5CYII="
    });
    menu(items);

};
/*
page({
            label: "輸入區：繁轉簡/簡轉繁",
            tooltiptext: "左鍵：繁轉簡\n右鍵：簡轉繁",
            insertBefore:'spell-undo-add-to-dictionary',
            image:'data:image/png;base64,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',
            onclick: function(event) {
            if (event.button == 1) return;
                    var urls = [
                            "&sl=zh-TW&tl=zh-CN&text=",
                            null,
                            "&sl=zh-CN&tl=zh-TW&text="
                    ];
                    var focused = document.commandDispatcher.focusedElement,
                            select = getBrowserSelection();
                    if (!select) {var txt = focused.value}
                    else {var txt = getBrowserSelection();}
                    var xmlhttp = new XMLHttpRequest;
                    //https://translate.google.com/translate_tts?client=t
                    xmlhttp.open("get", "https://translate.google.com/translate_tts?client=t" + urls[event.button] + txt, 0);
                    xmlhttp.send();
                    for(var i = 0; i < xmlhttp.responseText.length; i++) {
                            var output = eval("(" + xmlhttp.responseText + ")")[0][i][0];
                            if (focused && !select) {
                                    focused.value = output;
                            }
                            else if (focused && select) {
                                    goDoCommand("cmd_delete");
                                    var aStart = aEnd = focused.selectionStart;
                                    focused.value = focused.value.slice(0, aStart) + output + focused.value.slice(aEnd);
                                    var aOffset = aStart + output.length;
                                    focused.setSelectionRange(aOffset, aOffset);
                            } else if (!focused) {
                                    Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(output);
                                    goDoCommand("cmd_paste");
                            }
                    };
            },
            condition:'input',
});
*/
page({
    label: "下載腳本檔案鏈接到指定位置",
    tooltiptext: "下載鏈接到指定位置 (不彈窗)\nUC Script 下載到 chrome 資料夾\nUser Script 下載到 UserScriptLoader 資料夾\nUser Style 下載到 UserCSSLoader 資料夾\nJavaScript 下載到 local 資料夾\nExtension 下載到 xpi 資料夾",
    condition:'link',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4jd2RsWoCURBFFwIJSUrFQuyUx8Luu+dCyAeIQmp/IB8k6bQx+UFLCxGirKZZQ7I+Y9Lmwq3ezJk787KsIUn3wMz21vah9haYSbpv1p+oLMs+sPzSfLB9AJZlWfYvAoBge9UE2F4B4b8CiqK4jjE+AENJz8A6ccR1/TYsiuJxMBjcfAJ6vd6tpCnwDuwT04+QfV3z0u12776lyPO8BSwa/9/0Fljked5KrnIB8nPzUSGEdgKyBRYhhHbq6hNJnTNJdrZ3qcmSOsAkAypJo1QSSVNJ09RkSSOgyoAqxjg+s9FV7RPFGMdAldneSHqVNPqtgSfbb7Y3GTC3vQGqP3hf98w/AHA+wuIFFjTgAAAAAElFTkSuQmCC",
    onshowing: function(menuitem) {
    var url = addMenu.convertText("%RLINK_OR_URL%");
    var urls = !/\.(js$|xul$|css$|xpi)/.test(url);
    var urls2 = /\/blob\/master\//i.test(url);
    this.hidden = urls2 || urls;
    },
    onclick: function(e) {
        var url = addMenu.convertText("%RLINK_OR_URL%"),
            uri = Components.classes["@mozilla.org/network/io-service;1"].
        getService(Components.interfaces.nsIIOService).newURI(url, null, null)

        var file = Components.classes["@mozilla.org/file/directory_service;1"].
        getService(Components.interfaces.nsIProperties).
        get("ProfD", Components.interfaces.nsIFile);

        // 添加哪个文件夹名
        file.append("chrome");
        if (url.endsWith(".uc.js") || url.endsWith(".uc.xul")) {

        } else if (url.endsWith("user.js")) {
            file.append("UserScriptLoader");
        } else if (url.endsWith(".js")) {
            file.append("local");
        } else if (url.endsWith(".css")) {
            file.append("UserCSSLoader");
        } else if (url.endsWith(".xpi")) {
            file.append("xpi");
        } else if (/latest\.xpi/i.test(url)) {
            file.append("xpi");
        }

        // 添加文件名
        file.append(getDefaultFileName(null, uri));
        internalSave(null, null, null, null, null, null, null, {
            file: file,
            uri: uri
        }, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
    }
});

var execute = PageMenu({
    class: "exec",
    label: "以外部程序開啟",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII="
});
execute([{
    label: "PotPlayer(頁面 youtube限定)",
    text: "%u",
    exec: "C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArklEQVQ4jWNgQAN5+///RxcjGjit+f/faBkEp+8lwyCYZpe1ENpiBYmGGC37/z9mB0TTqlv//5stJ9E1yAYwMDAwXPwG4RPtGnQDYIBo1+AygGjX4DMABiacQ8QUWQZsvEumAc+//P9fcQShufsMCQZcfPr/PyyR+WwkIRCff/n/v/44AVtxGXDxKSJF4rUV3QCjZf//J+4iwVZkELAJoZFoW9FBxZH//yecI14zAJoE+V+sQXR/AAAAAElFTkSuQmCC",
    condition: "nolink",
    onshowing: function(menuitem) {
        var url = addMenu.convertText("%RLINK_OR_URL%");
        var urls = !/^https?:\/\/www\.youtube\.com\/(watch|playlist)/i.test(url);
        this.hidden = urls;
		},
	}, {
		label: "Internet Explorer(頁面)",
		text: "%u",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
		condition: "nolink"
	}, {
		label: "Edge(頁面)",
		url:"microsoft-edge:%u",
		condition: "nolink",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
	}, {
		label: "CentBrowser(頁面)",
		text: "%u",
		exec: "C:\\CentBrowser_x64\\chrome.exe",
		condition: "nolink"
	}, {
		label: "Opera(頁面)",
		text: "%u",
		exec: "C:\\Program Files (x86)\\Opera\\launcher.exe",
		condition: "nolink"
	}, {
		label: "GoogleChrome(頁面)",
		text: "%u",
		exec: "C:\\MyChrome\\MyChrome.exe",
		condition: "nolink"
	}, {
		label: "PotPlayer(鏈結)",
		text: "%l",
		exec: "C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArklEQVQ4jWNgQAN5+///RxcjGjit+f/faBkEp+8lwyCYZpe1ENpiBYmGGC37/z9mB0TTqlv//5stJ9E1yAYwMDAwXPwG4RPtGnQDYIBo1+AygGjX4DMABiacQ8QUWQZsvEumAc+//P9fcQShufsMCQZcfPr/PyyR+WwkIRCff/n/v/44AVtxGXDxKSJF4rUV3QCjZf//J+4iwVZkELAJoZFoW9FBxZH//yecI14zAJoE+V+sQXR/AAAAAElFTkSuQmCC",
		condition: "link",
		onshowing: function(menuitem) {
			var url = addMenu.convertText("%RLINK_OR_URL%");
			var urls0 = !/^https?:\/\/www\.youtube\.com\/watch/i.test(url);
			var urls1 = !/^https?:\/\/www\.youtube\.com\/playlis.*/i.test(url);
			var urls2 = !/(k|pl)\.youku\.com\/(player|playlist)\/(getFlvPath|m3u8)/i.test(url);
			var urls3 = !/newflv\.sohu\.ccgslb\.net\//i.test(url);
			var urls4 = !/sohu\.vodnew\.lxdns\.com\//i.test(url);
			var urls5 = !/data\.video\.qiyi\.com\/videos\//i.test(url);
			var urls6 = !/\/letv\-uts\//i.test(url);
			var urls7 = !/porn\.im\./i.test(url);
			var urls8 = !/cdn\.xvideos\.com\/videos\/mp4\//i.test(url);
			//http://data.video.qiyi.com/videos/v0/20141202/22/94/4ff27ef76d4de4b0a6e650ad791d4d89.f4v?key=1a5b6d22dd12b1e8&uuid=da5df8ed
			//http://sohu.vodnew.lxdns.com/197/193/dDNusBtPTKKHaI82iqJkLH.mp4?key=hipEuDmEL5-cTPhAZi2WaDJdXLqLp84A
			//http://sohu.vodnew.lxdns.com/86/151/FgfGcqS1SJOBNAzn8y4NSH.mp4?key=w3WfokfbjNPQlHASBBLXhVJhfRWObzdj
			this.hidden = urls0 && urls1 && urls2 && urls3 && urls4 && urls5 && urls6 && urls7 && urls8;
		},
	}, {
		label: "Internet Explorer(鏈結)",
		text: "%l",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
		condition: "link"
	}, {
		label: "Edge(鏈結)",
		url:"microsoft-edge:%l",
		condition: "link",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
	}, {
		label: "CentBrowser(鏈結)",
		text: "%l",
		exec: "C:\\CentBrowser_x64\\chrome.exe",
		condition: "link"
	}, {
		label: "Opera(鏈結)",
		text: "%l",
		exec: "C:\\Program Files (x86)\\Opera\\launcher.exe",
		condition: "link"
	}, {
		label: "GoogleChrome(鏈結)",
		text: "%l",
		exec: "C:\\MyChrome\\MyChrome.exe",
		condition: "link"
	},  
]);

page({
        label: '複製圖片base64',
        text: "%IMAGE_BASE64%",
        insertBefore: "context-sep-copyimage",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALNSURBVDhPnZN7TI1xGMffMfoDy7Qdw8wfmEskZrquFrkUOdOwaSUsqw6JVWdHDrFcQiHXyoZmklzHaE6GyS0kczlMMbfQdJFT53SOc87H8zpjM/7y27573717vt/f93me76vMy8mJEST/J2KUWKMxhf88KlfRGgypLreb4HwILYCIXTB1D4TvhLAdMOsAxB2GhaWw/iKcfAjHH4DKUbnKzMzMZQ6Xi9RySD8F66Ro93XIPg+5lZ73QsGGS3D6ETR8gceNoHJUrjI9PT3N5nSSe+EmJx40YnoOl80CeW4SsZUHbeyvtKMv7WJGdgsLdndR3QAqR+UqU3S6dIvDQfiGxURtXUah6QoVt5rRl3XR0gEtndBkgTtvRfQl5Jy1MS7hCxsPmQlJSMxWwpYuXdVmtzMgIYRRy2cSbIwn3PCM4moHnS5otoL5Mxy7A3UfoP4bbL8Goxe2EppUXK4EJSZmNNts9Js9H82cODTxBSwpsnDjNRjK3ZyphYr7YJK2Gts863ototHbISjr21dlYlxc1merlYnJJQSnHaH3NDPRm+3cfeWi6gmsPQcZJ2FbFbRKS1deQK04yjXBkPnf3cq4uXMNHzs6fgt4Tf3E3ioXbR1uCmTy0bLW2BIwykCtdmmhyTOTLVdhUAwoQyZPXtckM3hvsfxErygLR29LsVhVAuUWveRBclFV/2faiiUL/edIjbe/f1IfP7/Nv9AtrN26WrVdBr4rYPh66LMGhuXBoRppQTbxXYabIY40OqdT+evEkukr4VaHtEuc1LyBi5KJs0/BR5I6Yh+8kU0sktANXYPpbwH1SwDvlFDoqfP03SmwdEHkGZggkV4tyYwoor2vrzbynwLdo6qn906ktkcyrknyL6hOSmSVEUIOKcI9Ko93A1PqUxSf8T3/7aDX4O5ew7SjvXTkaLK5NzaPr4H5WMdsom6gnkLvkdqAX+QfyUegWA659sMAAAAASUVORK5CYII=",
        condition: "image"
})

page({
        label: '複製選取範圍鏈結',
        oncommand: function(event) {
			var urls = {};
			addMenu.$$('a:not(:empty)', null, true).forEach(function(a) { urls[a.href] = true; });
			urls = Object.keys(urls);
			if (urls.length === 0) return;
			addMenu.copy(urls.join('\n'));
			},
        insertBefore: "context-openlinkintab",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAInSURBVDhPlZJLa1pBHMUv6AcQP0CzDwVX3bgRCu5cphtJ6aqLbgoGwZbWBwipFULcWJDehaE1BCJNseIjWk3NVRMXitXGB4LSS7rQVXJ9a3I6MyH2lZh04AfDDOfMued/OY6sZDKJv4nH45Ak6Tm9v3FR8XQ6wXTyi1wuh0gkctb63npyo0EikWDiyWQ8QxAE9Pt9hMPhUb1efzTXhMal4oNshjEeDRGNRqmYQfdzDWKxGMbjEUbDwYzz8zP8OD5Gq9lEPp+fb0BfoK9m0mlGpVL5p1Ta07XFBoNBDAd99CSJMRwMmMGti/X7/eh1u0ilUoxyuYz/KpbneXRPTyGdnDAGvR6Ly4o9yDJoR9cWa7fbyczD+BQIMELkk9xuN2q1KmrVCj7HY2QaIezuRuHf3gZN7PP5LorV6XT3DAYD6CQajQZEUUSTNJ/JZLCx4cWr1VVkyf73u0KhAJfLBarltFrt41TqS8Nms6aVSuW6XC53OhwOeDyeP6BnRqMRz0wm8Pxb7O0lQbWcWq1eKZVKw4WFOzaaiBoQQxwdfUO73Uan0wH5E1mih8vLEPb34XS+RrFYBNVyKpXqaSAQaVos9pBCoViRyWQvTOSVq7BZrVhfW4PX+w47O0FQLUdi319cvPuG532iIBSn5bKIw8PKlOffw2y2wPzSgs3ND0inv5Lxisjlqtja+oilpQegWlYkia0l2Gj8SzQaDfR6PYPuSdwZl3dU+xMnZlCbtAOgOgAAAABJRU5ErkJggg==",
        condition: "select"
})

page({
        label: 'Flvcd視頻分析',
        oncommand: function() {
				gBrowser.loadURI('http://www.flvcd.com/parse.php?kw='+ encodeURIComponent(addMenu.convertText("%RLINK_OR_URL%")) + '&flag=one&format=real');
			},
        insertBefore: "spell-check-enabled",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVQ4jXXRz0/TYBjA8f2LArogCIyZ6MHEiydPXDUcCEuEgUNEXFzBX9FgpgcPxkFAwM3MjXbttnZjZW3XdiuBLCZfD8uolfEkn9P7PN/LGwoNmBlBYZBBu4GJpXViaZ2K5eF1u5z96fG6XarWKf33K48752d0zs/Q3TZVy0ExeqqWg+62L94vRfrHuttBbtqUTmxKzZ6y6aLaHVTHQ3U8DO/0ciSW1tHbHaQTO0AxXQqmx6dyG0F0eV9y2T32qLc7fmBGUDhUTRTD4ajRQtTtC5LRRijYzO2bxLIt5g8tYvsm32ttPmZ1xmfzhGYEhZJhIzZsisetC5Jus6c5zO+ZPMk6LORcFnIOsYMWSwcmnyXLD8imw++aRb7uE3WbrYLF40yTub2W70eL2UyTZM70A/t1m11ZZ1tqsC012JEaZGsmj77Wib7TuLd1HHD3Q42Hac0PbPwyyDZsdmSdbVnnsGbxRTS5nZKZ2lSJvtECpl+rTKdkPxB5ViD50yCj2nyr2Gxkm9zflAk/l5hKVZh8FTS9WfUD/Z+YfCkxligwligyEs8zslxk7IUStKZwc03hztuaf9wPRAWNW0mFa/EiI8si4ZVST0IinJC4kZC4/lQikqoSSVWDgVAoFHqwkiMqaEQFjfBKieG4yNDiEUOLRwzHRcKJElFBG3zcn9ElkdElkYlVhch6mUiy0rNeZmJVYXw2f/Xxv9Nf/N+g3b/3UqHdPGBmngAAAABJRU5ErkJggg==",
		condition: "nolink",
		onshowing: function(menuitem) {
			var url = addMenu.convertText("%RLINK_OR_URL%");
			var urls1 = !/tv\.sohu\.com\/(.*)\.shtml/.test(url);
			var urls2 = !/tv\.sohu\.com\/s(.*)\/(.*)\//.test(url);
			var urls3 = !/v\.youku\.com\/v\_show\/(.*)\.html/i.test(url);
			var urls4 = !/www\.iqiyi\.com\/(a|v)\_(.*)\.html/.test(url);
			var urls5 = !/www\.tudou\.com\/albumplay\/(.*)\.html/.test(url);
			var urls6 = !/(www|comic)\.letv\.com\/(comic|ptv|zt|izt)\/(.*)\.(html|shtml)/.test(url);
			this.hidden = urls1 && urls2 && urls3 && urls4 && urls5 && urls6;
		},
})
page({
        label: 'Flvcd視頻分析(鏈結)',
        oncommand: function() {
				gBrowser.selectedTab = gBrowser.addTab('http://www.flvcd.com/parse.php?kw='+ encodeURIComponent(addMenu.convertText("%RLINK_OR_URL%")) + '&flag=one&format=real');
			},
        insertBefore: "spell-check-enabled",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVQ4jXXRz0/TYBjA8f2LArogCIyZ6MHEiydPXDUcCEuEgUNEXFzBX9FgpgcPxkFAwM3MjXbttnZjZW3XdiuBLCZfD8uolfEkn9P7PN/LGwoNmBlBYZBBu4GJpXViaZ2K5eF1u5z96fG6XarWKf33K48752d0zs/Q3TZVy0ExeqqWg+62L94vRfrHuttBbtqUTmxKzZ6y6aLaHVTHQ3U8DO/0ciSW1tHbHaQTO0AxXQqmx6dyG0F0eV9y2T32qLc7fmBGUDhUTRTD4ajRQtTtC5LRRijYzO2bxLIt5g8tYvsm32ttPmZ1xmfzhGYEhZJhIzZsisetC5Jus6c5zO+ZPMk6LORcFnIOsYMWSwcmnyXLD8imw++aRb7uE3WbrYLF40yTub2W70eL2UyTZM70A/t1m11ZZ1tqsC012JEaZGsmj77Wib7TuLd1HHD3Q42Hac0PbPwyyDZsdmSdbVnnsGbxRTS5nZKZ2lSJvtECpl+rTKdkPxB5ViD50yCj2nyr2Gxkm9zflAk/l5hKVZh8FTS9WfUD/Z+YfCkxligwligyEs8zslxk7IUStKZwc03hztuaf9wPRAWNW0mFa/EiI8si4ZVST0IinJC4kZC4/lQikqoSSVWDgVAoFHqwkiMqaEQFjfBKieG4yNDiEUOLRwzHRcKJElFBG3zcn9ElkdElkYlVhch6mUiy0rNeZmJVYXw2f/Xxv9Nf/N+g3b/3UqHdPGBmngAAAABJRU5ErkJggg==",
		condition: "link",
		onshowing: function(menuitem) {
			var url = addMenu.convertText("%RLINK_OR_URL%");
			var urls1 = !/tv\.sohu\.com\/(.*)\.shtml/.test(url);
			var urls2 = !/v\.youku\.com\/v\_show\/(.*)\.html/i.test(url);
			var urls3 = !/www\.iqiyi\.com\/(a|v)\_(.*)\.html/.test(url);
			var urls4 = !/www\.tudou\.com\/albumplay\/(.*)\.html/.test(url);
			var urls5 = !/(www|comic)\.letv\.com\/(comic|ptv|zt|izt)\/(.*)\.(html|shtml)/.test(url);
			//http://www.letv.com/ptv/vplay/20802658.html
			this.hidden = urls1 && urls2 && urls3 && urls4 && urls5;
		},
})

page({
    label: "字元編碼",
    tooltiptext: "左鍵：UTF-8\n中鍵：Big5\n右鍵：GBK",
    insertBefore: "context-sep-selectall",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEUSURBVDhPvZE9S4JhFIZ9B6lJxBZBUloSwo9o6T8IGTg4uAniX3CQwNWlqamhqba+IAiDqAZBgsC5P9Dv6LrlvPL49IgO4QsX55zrnOe8X4nEf1xRFNUh7+/CNeE29srl/twTeW/cEFNOHftgnC/iQAFOoQdpKBld4pVTK5eb9Ze+Pc0yPK2g7D7BHcN9aEASKvAMx5CBodXK5dSruAvOEI/wAjtQtVz1Mqqhj7nHgW3IwqHDOfmr57KhBW1boPixgvbCAoZrMIYtOPKQv/C9v+CBgWtJ4mQd3I94woEv6LpbqQ/MD4gtuJQL/f935DfsW7NI7MAU3iBnKJdTTzPz69MGY/FDIkaw68wpl4v7oYfZsPsFkotMBB1tttAAAAAASUVORK5CYII=",
    onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);"
});

tab({
        id: "Faviconbase64",
        label: '複製 Favicon 的 base64',
        text: "%FAVICON_BASE64%",
        insertBefore: "context_reloadTab",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2UlEQVQ4jY2Tu47aQBSGzzskZaI026Sl5xnQYol+W7qgXERcbJMuL5EWhNA0WQN9noEHQArg9dxsj21sj/8UxsasWCkj/c3M+b5zTjFERHdENPzP3NGNMzz6Pg5HH89BAM45hJSQSkFpDa01dBgiimOcJbcFR78WbLdb/H56gud58DwPq9UKq/Uam80GRPSdiPqdvCciGgacIwgCCCEwm82w3+/biQLOwYWAlBJSSquUKpVSpdK6HI/HP4iIhlwICCmhtMZ8Psff/b6dqH1Tql0nDEOEUYTpdPqTiGjY7BtGERaLBY6+j4BzCCEglaqhKEIcxzDG1EkSuK5bC5oCYwyWy2UNnydqwSRBmqbIsqzO6XQRRHGMOI6RpikYY1ewMaYF8zy/SitoOmRZBsYYlFJX8Ol0Qp7nKIoCRVGgLEuUZXkRNIV5noMxBh2G7URduAGttbDWXgTJuXsjiKII3bsGttaiqqo2rwqa7rdgay3SNIXSuhoMBp+IiO6TNK2aYsYYjDFX3bvwbreD7z/DfXxcE9FbIqIPRHTffJh+v/8rSZJ29253YwwOhwMmX7/9IaJ3t/4FOY4zaQQvxw84r7647vpV+Hw+Oo4zGY1Gn1+m1+s9ENGbbvE/7y7BpIiSLPIAAAAASUVORK5CYII=",
})

tab({
        label: '複製頁面標題',
        text: "%TITLE%",
        insertAfter: "Faviconbase64",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2UlEQVQ4jY2Tu47aQBSGzzskZaI026Sl5xnQYol+W7qgXERcbJMuL5EWhNA0WQN9noEHQArg9dxsj21sj/8UxsasWCkj/c3M+b5zTjFERHdENPzP3NGNMzz6Pg5HH89BAM45hJSQSkFpDa01dBgiimOcJbcFR78WbLdb/H56gud58DwPq9UKq/Uam80GRPSdiPqdvCciGgacIwgCCCEwm82w3+/biQLOwYWAlBJSSquUKpVSpdK6HI/HP4iIhlwICCmhtMZ8Psff/b6dqH1Tql0nDEOEUYTpdPqTiGjY7BtGERaLBY6+j4BzCCEglaqhKEIcxzDG1EkSuK5bC5oCYwyWy2UNnydqwSRBmqbIsqzO6XQRRHGMOI6RpikYY1ewMaYF8zy/SitoOmRZBsYYlFJX8Ol0Qp7nKIoCRVGgLEuUZXkRNIV5noMxBh2G7URduAGttbDWXgTJuXsjiKII3bsGttaiqqo2rwqa7rdgay3SNIXSuhoMBp+IiO6TNK2aYsYYjDFX3bvwbreD7z/DfXxcE9FbIqIPRHTffJh+v/8rSZJ29253YwwOhwMmX7/9IaJ3t/4FOY4zaQQvxw84r7647vpV+Hw+Oo4zGY1Gn1+m1+s9ENGbbvE/7y7BpIiSLPIAAAAASUVORK5CYII=",
})

//var openMenu = GroupMenu({ label: '打开...', condition: 'noinput noselect nomailto nocanvas nomedia', insertBefore: 'context-sep-navigation' }); openMenu([ { label:"复制文本+链接", text:"%RLT_OR_UT%\n%RLINK_OR_URL%", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==" }, { label:"在隐私窗打开", oncommand: "openLinkIn(addMenu.convertText('%RLINK_OR_URL%'), 'window',{private:true});", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKDSURBVDhPpY/PT5IBGMffWl76ceiS62/wlrc6uLmZM81MZ3noQik4NAWRVwXlVSbKDyEFcgoCyoshIvgCBpgS/siUhbnWDJrKVnaouS5tuTaX3wSxVrfGZ3sO3+/zPN89D5Ex7+dYWDLmIC1TsNnDWfcE1nNpeaS9Z5NeWv5NG4/aPgmorNSfr3s4LpHLmB2VwrdHSdzzkg7XnFw2tddNORL1XCtVWjpyIbVI4FRVlekOIWoxf9OrbTutLVN+Ra/747RrEevRGOKxBCJrb7EQjiL8PAqvZxljRgbdEttuC98alIrpN8Imy1dCKuRtzljb4PFE4A+sYdL5Cl7fOywuJ7C1vYf1jV3Q9ig02gUo+2ZgMc2ANnvAOLzoEo1uEWTTSCjgCYHqdO1z6wyb1dVKe3XNwCdZz1OsvExgdi6G+kYbbpdLP5RXiO13q+TxRsHYvscRAMk3LxKcmpHBee8c+Pwh6/FvBEFR1GkuVxN1Tm2AtkXAYqlepFspamuVTveoDZwHRjnRyeM8spscUPe5v3d1jTvb2x1ikcjWIBQ+DtH0KsasyyBJc0AgsDaQJH3UM3mUPU9+aLqNP0tKNFeIyMR1yNuaj35aQv/AM6jVfgz0B6HRzIJhXqdKqz32FQpfynfRDBo4en/qnN1wGZrvV3iFvNGVCQsDxrWEadcaBnU+hIIRzPtXYTYEwbgjmJ4MY9xgB9nYHyss1Fz+HWAWZyM3l53FZg2ppGLDZ73Scqjo0B1IWofjEnI4rujQHuh6DYedpPZLDUurLi7uvZhaTnISkJZEQYHqUlmJquhmkfJaXh51Jlm3bsivJr38fFl2euwP/wb8NxkH+HU5mQVkBkH8AgvRfy93EDdrAAAAAElFTkSuQmCC" }, { label: "在 IE 中打开", text: "%RLINK_OR_URL%", exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe", }, { label: "在 Chrome 中打开", text: '%RLINK_OR_URL%', exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe", },{label: "在 Opera 中打开",text : "%RLINK_OR_URL%",exec : "D:\\Program Files\\Opera\\opera.exe",},]);

// 添加样式
css('\
')

//page({
//        id: 'tools-menu',
//	})
/*
page([
{
  label: '生成网址二维码',
  tooltiptext: '生成网址二维码',
  onclick: function openView()
  {
    var sl = (screen.width) / 2 - 250;
    var st = (screen.height) / 2 - 100;
    var url = addMenu.convertText('%RLINK_OR_URL%');
    theURL = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + url;
    theDes = 'status:no;center:no;dialogTop:' + st + ';dialogLeft:' + sl + ';help:no;minimize:no;maximize:no;dialogWidth:400px;scroll:no;dialogHeight:400px;border:think';
    var rv = self.showModalDialog(theURL, '&Oacute;&brvbar;&Oacute;&Atilde;&frac12;&Uacute;&Auml;&iquest;&ETH;&Aring;&Iuml;&cent;', theDes);
    //window.open(theURL, '二维码', config='height=400,width=400');
  },
}
])

page({
    label: "打开图像RAR",
    condition: "image",
    image: "moz-icon://file:///c:/program%20files/WinRAR/WinRAR.exe?size=16",
    oncommand: function() {
        var imageUrl = (gContextMenu.mediaURL || gContextMenu.imageURL);
        imageUrl = imageUrl.replace(/\.jpg\.thumb\.jpg$/i, '.jpg');

        var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsILocalFile);
        file.append(new Date().getTime() + ".rar");

        Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
            .saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
                .newURI(imageUrl, null, null), null, null, null, null, file, null);
        setTimeout(function() {
            file.launch();
        }, 100);
    }
});*/
tab({
        label: "按標題重排所有標簽頁",
        tooltiptext: "按標題重排，同域名靠近",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACH0lEQVQ4jZXTzWoaURQH8IOrLPIMpbvmAbpIwJeID5JVP8giZJBhEBcZgotggl2FlgRpITSiaEONMyaisRJ11EwmH+M4Tk3QODN3XP67qA2xFUkvXO7q/7vnwDkUjW5xmXQKeVl6vJl0CpHIpkBEc0Tko1knk07B8xgc28ag34c9HIK5DjTtEqFwaIOI5mcieVmCY9uIRrfifv/Scmxne6/b7YIxFxfqBYSQIM5E8rKEwaAPv39pmYheBQKBxbpSgzfy4LgOGq0meGEGkpcl2PYQsZ3tvUAgsBjf3492zA6Yx+AyFw/2EDVFAcfz05FMOgXGXFiWCUWpwjRNOK4DlzE4rotqvY5rXcdJuYz14BQkEtkUNO0SHmMYjbzxrw+46/fxLfsdxUoFB8kkzmoKjuQ81rjgP8hcOBzaUBp19O576N3fwfxpwbAsKKqKg2QSJ+Uf+JxIoHBeRVqSsMpxE4iPiOaFUEgslIq4NQwYlgW928W1aeK81cKXRAK54hniXw9RajQR2/0IInpBv+eEHhFeEES5UICm67g2TWhGB6phoKw0ED9MoKJqSGZzWHn7PkZEC+MqaALheF7Mnp6ieXMDtd1BS2+jcdtGRdWQOpaw8ubdByJ6/XcFE8g6z4tHch61qys0bnVULjUkj3NPwy9nDZePiObXuKCYlmSUlOZ/hSeQVY4TY7uf/vT87PAEMu51Yfw+O/wUmRsHp672LyxdnN6ef1H/AAAAAElFTkSuQmCC",
        oncommand: function() {
            //var len = gBrowser.mPanelContainer.childNodes.length;
            //for (var i = 0; i < len; i++) {
               // if (event.button == 0) gBrowser.getBrowserAtIndex(i).reload();
               // else if (event.button == 2) gBrowser.getBrowserAtIndex(i).stop();
                //   }
            Array.from(gBrowser.tabs).sort((a, b) => a.label.localeCompare(b.label)).forEach(gBrowser.moveTabTo.bind(gBrowser));
         //使用favicon的值來排序
            Array.from(gBrowser.tabs).sort((a, b) => a.image.localeCompare(b.image)).forEach(gBrowser.moveTabTo.bind(gBrowser));
        }
    });
