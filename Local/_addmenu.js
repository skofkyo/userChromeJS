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

new function () {

page({
        label: "addMenuPlus重載/編輯",
        tooltiptext: "左鍵重載 ；右鍵編輯",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABO0lEQVRIib2WYbGDMBCEKwEJSNj5zkClIAEJOKgEJCChEpCAhEro+5N04Eho0r5yM/yBy+3tsrnkcqkMYJF0rV1XHWb2NLMnMEpq/q2wpAbozGwyszkCBbAH0H0NAgzAY10889wltZ+waH33BUCqBilkEaXrnQq3InYpJsAC9IFpfD95MwBj+DYfggBDAmTjrpy9g1nW64acZI2XDBhTeZkmRy9rMjdYeCNXzT4JjS6uRrdLTFDv9+WOA+id9FMKaGOCT/aFM0vaFN4EtSDFdc4EOk26c8xwmr1LN2zMPRg/xxs2JPsRtKMu6boeQ6HB0a3Lj6AY0RSejaRm/R+BDugzk/54qIaCLXBzTHMFk0dHtWMlyczuJQCRyTcn7VugcAAO1QA+wv/w0s1mNgHdL25DL3f9/G7n7V0af9jEflS+F9XNAAAAAElFTkSuQmCC",
        oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
        onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); };",
        position: 9999
})

};
new function () {
var items = [
                    {
                    label: "Google",
                    tooltiptext: "左鍵：Google 搜尋選取文字 (新分頁前景)\n右鍵：Google 站內搜索選取文字 (當前分頁)",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
                    onclick: function(e){
                            switch(e.button){
                                    case 0:
                                            gBrowser.selectedTab = gBrowser.addTab("https://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection()));
                                            break;
                                    case 2:
                                            loadURI('https://www.google.com/search?q=site:' + content.location.host + ' ' + encodeURIComponent(getBrowserSelection()));
                                            break;
                            }
                    },
                    },
                    {
                    label: "Youtube",
                    url: "https://www.youtube.com/results?search_query=%SEL%",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYhe3Wz0tUURjG8Xc195xz77n3nmv2AyIoccToT2jlPxCEIC7aiLjIoBa1cCm0bBSxCZ1EDKQGBCMoFGsSHXVm0EUuxkJIEUajceEsxmBAeFokA2rmK4XTYh747M75nu0hqq66/2UZI++lAzuRDtRSOlBLGaM2MoGNf8KojXI3UONpI28eeDwVqPF0YOMspYwdJyKieU82LwQ2KmHek800a+x40tiohFljx2nGl5kZo1ARvsxQwsjcR6PANXP5PPvsSRJG5mjKl3vvjQJH4lINfmxtorj2Fdn7nUhc8Fn3jjPlyz2a9BW4EjfCKJVKZcVvW1jpeoQPVy6yG4fRO1+B7XoYxWLxgN3dXRQ2c1h++AATtT6/tY/e+ApsjfXY2dn5rUKhgO+fV5C608rv+Qo07iuwNdYjn8//0fb2Nr68HMXrGs1q0pgnwdZQh1wud6LkyDDGAofVpLgnwdZQh/X19WN9WphH5PYtdNkhvGI2adSTYAtfw+rq6hHLi4uItreh07MR0YLf8yTohSfBFr6KbDZbtjg3h6ftbbhbG+CxY2HkNK19NKxFadiV4Bg85yM1PY3k5ASetLagw7XRbVuIMe8foUWJYq7YeO5KcAy6Eh2Bh3YZQrcjEGPeO07MFWs0oEVywJXgip7i7Im0SFJUW0PPXIFKiGpriPod0dSvBSrCEU1ERNSnrUifFjhbVuTAvzDihFp6tPW2V4ulMkfke7XAX/nVKDd7tDURcUItZ/PVrq46xn4C/yowaRwJnAkAAAAASUVORK5CYII=",
                    },
                    {
                    label: "百度",
                    url  : "http://www.baidu.com/s?wd=%SEL%",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC",
                    },
                    {
                    label: "維基百科",
                    url  : "http://zh.wikipedia.org/wiki/%SEL%",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII=",
                    },
                    {condition: "select",},
                    {
                    label: "subom字幕庫",
                    tooltiptext: "左鍵：字幕搜尋選取文字 (新分頁前景)\n右鍵：字幕搜索剪貼簿文字 (新分頁前景)",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWklEQVQ4jW2TW47FIAxDHfrgLhZ6968pOfORtKWjqVSJoGCM7cgBGDiAg/uJAz7AGcBgePa4E40AP+AgBqgYpoJJmBmSWGzFJDTtybJWQUUACAaLCjJxMn3+zzIJSAWpACMATGJwou+G2o71SmkVO7ZcfyjHB7UdfTcGJ6YSDC5EHNR2St+wI4GOJf62ol6wXlHfo1fCGQiHJYtoWJNvCDs/a2TlDBbdGgQaDHTELTAeEM9DtwPhjNmSAA4ygfN6u/qOtTV0aCv6hjY6KgA2M7iLo0bT98/hvmPHFuC9Ml8aALbc1CJMnrTP13OCQdo3M7hEnIUiBbySCqC+Yr0+IjrILzQnqPYalrX1tjEs3Sg97A0bS4QqNCivIJXjQ2kfrNfX299B0pPEK5rXQP1J8qs4CQGXJ8qgkgMyD0wOkOVgXXt2D5PByBzAz31TODCNMCNHO13xR1gHfgFv0qfjmordvwAAAABJRU5ErkJggg==",
                    onclick: function(e){
                            switch(e.button){
                                    case 0:
                                            gBrowser.selectedTab = gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(getBrowserSelection()));
                                            break;
                                    case 2:
                                            gBrowser.selectedTab = gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(readFromClipboard()));
                                            break;
                            }
                    },
                    },
                    {
                    label: "海盜灣",
                    url  : "http://thepiratebay.se/search/%SEL%/",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLklEQVQ4jZWTMUiqYRSGT/04haTpEoEagYLhWgRJ+je5hmC/DtbgFoEuQmOBGIFrDbmphVKSg9AQkSC0KkI0uAjSEoS4qfjcIe5fN4t77wsvfPCd7zmc850jfNF4PP6rP0t+H56enggEAvj9fjY3N7+1qqqoqsrl5eUkoFQqISL/5GAwOAkol8t6gMFgYHp6GovFgslkQlEUFEVhamoKESEcDv8M8Hg8NJtNotEolUqF5+dnYrEYlUqFdDqNiKBp2iTg+voaEWFlZYVut4umadjtdlwuF0tLSzQaDVKpFCJCKBSaBJyfn+slzM7OTtRtNBpRFEVPMhgMfgaICHa7nZmZGUQEp9OJwWDQ75aXlz8ArVaLeDzO2dmZnmF1dZVgMMjCwgIiQjQaZX19HbPZjIjg9/sZj8eMRiPk/v4eEeHw8JBMJkM+n6darVIsFikUCuTzeXK5HFdXV5TLZW5ubuh2u5yenhKJRJCDgwOdurGxwc7ODplMhkajwXA41Jv19vZGvV4nm81ydHSExWLB5/Mht7e37O3t4fP5uLi4IJlMYrVaERGsVitra2ssLi4yPz+P1+tF0zRUVcXtduNyud6b+PLygslkwuFwoKoqoVCIWCzGyckJx8fHbG1t4Xa78Xq97O/vY7PZ2N3d5eHh4R3Q7/eZm5sjkUjQ6/W+7hcAvV6PWq3G9vY2IsLj4+PHN45GI+7u7nh9ff328Wd1Oh0CgQDtdvvPOfgffV7pXz5OoYc083dvAAAAAElFTkSuQmCC",
                    },
                    /*
                    {
                    label: "PublicHD",
                    url  : "https://publichd.se/index.php?page=torrents&search=%SEL%&active=0",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVQ4ja2SwQ3DIAxFOdBg1sgKXYFZukLujWrlRsOtK/TsnLJCV8gKURQGoAeaiqoRgbSWfPAXfjYfGPtHWAO9beXDGumskW42cvQanBIBvnE9oc8A+MOThtIa6N/61iZr0zzkdaUWbtmAmJ6/gZFVFmDSUIavMmlQiYDvnK/QRJvXAP4fyPvm5JgHBzofRYeOMcZEh26pRYeuIBw51SoK4FSrELDUnGpV0KUqCMckwJIhIITv3aARhMNuDwTh8OHBL/EEcBoQnhOhTF0AAAAASUVORK5CYII=",
                    },
                    */
                    {
                    label: "Seed2Peer",
                    url  : "http://seed2peer.com/search/%SEL%/",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACJ0lEQVRYhe2XvZGrMBDHSTS6BNECEUOAqMKxm6ABanARhCbxIlXh3H14xiUQGHgvsBdWQsLgO897wWlGEZrdH/vxXykIftf/trgOE67CPWtEiZurcI/f2zqN7yB3HWRFD/LQQVa0dRpTG3iGbvuM37mOzl86+mNuceMq3Ld1Gg+QXwaQg7FP+bWDrAiCILiD3A2n/Do7A/nlDnK3CMCUqObOH5s1oryD3M0NTxBtncYdZMXSGS8E12HypcVtNcApv9p/2kFWLAKAHHqQRzeACvfojOvoTGuAKVFhCjrICswp5hpBsCaosx7koQd5HGGfkZqHvxHlCECKbs3qQR7R4QhgOaJgzjRMAOLGdZhsBDi8AmjrNMYoYMH+JMDLCFCAHuRhZoTWAGtEuQUAW9Oogc0ARhc8+n6Nczu3bwM8IKgIvYYwRSe/GDqwtQaCwEzDq3qwVRGN+gCwUL1dgMtWQ66jswuCGsS/NwC26sAYBcc8YEpU9Iyhdpa8vq2EyxBTPRihd2j727PABUFnA7amFeJZNfsBVkzDGQTVhmcaUHRo3p0AzxFNZ8cm51MkHqlgSlQ0/L5W8nXB2wsBuI7OYy8vGP8YAFOiwvvAUiX/KAAtRKZEhca9UvodAK7DhClRMSWq8TJKWpE1opwqPL88BcbYS7Ng0986L6U6TFaIjHcafgsAW/DjAK4rOZ0FHwUYIexHCRlErgeH/fho6zRGkE3Of9e/Wn8BoZT6QXxnPmMAAAAASUVORK5CYII=",
                    },
                    {
                    label: "KickassTorrents",
                    url  : "http://kickass.to/usearch/%SEL%/",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACP0lEQVQ4jY2S30uTYRTHn7/Bi4JwERgRWELJnMGYm6Gjd5JkuhzOrTVrbQOHTR1FM40aaxPWcJUr57aLtjFsYpQwsknSD6grqcxhJQkmOrIaQ520fbtY73i3NeoLn4vnfM85D+dwCPkjiYSz87al7adWIeikY73aer/bLt9kxvTqOo+l7+QiyZexi3oeDugQDujgtEoT3iHFNv0OB3Tw2OXJgPNcin5rT/MN2eIWYXlJ8K4yPXlfi//F0ndiOdtAJeUaHnpVyGfp40sAwPfYYoEXcp1Fi7C8JDOXqjYy7lJi3KXEhFuFmUdmTE9cRXIrAQB4/2YMtM9EJmZLCSGEGLS174JOGYJOGSb9PSimV1O3QOcFnTJ0tFVdy2xbXTPnc0jgc0gQGlXj9fQ9rC7PZQsX52fwbe0zHvu6Qef5HBKcaWWbCSGEaOSciPdmM5h8+vAMAJCIx5Dv0UiOH8iMIG2q6HdZG8Hk65fZzO/RF8j3XNZG3DE1QHikNLPEel4Za2hAiGETlWVtZQEAMD/7BMMmCg9GO3P8blX1Ss4hadoPRR0DdaCJvn0KAEinU9jciCP+YxVMX9ywvz+ngUiwu/KGgZu2GfmwGfnw2NuxndwAAKzHluB3ngftXeg4vF5wyoQQcoraOzJ4kQuakcFWjLn1sF0WZGNXdFUpisfi/bUBIYSIRWUhUw8H5t7qAi5pKn+JeKVNRYtpUTUsRZfy4NZ1PRs0iuZ9Czz2LtY/i5k6xmfpxdSeyFHOjopiOb8BYYfsxcx4u9YAAAAASUVORK5CYII=",
                    },
                    {
                    label: "NyaaTorrents",
                    url  : "http://sukebei.nyaa.se/?page=search&cats=0_0&filter=0&term=%SEL%",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,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",
                    },
                    {condition: "select",},
                    {
                    label: "BTDigg Search",
                    url  : "http://btdigg.org/search?info_hash=&q=%SEL%",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADCklEQVRYhb2X34uUZRTHP2sZkoVSN0GERPgHRERCLrQG4UKhpYEFddGFN0I3idBF9MrOvOdgeePF0mUJEiyIot4I5YZGkAzO+z2FbRa2VJb9snXLVSNdL+ad2Xec3XF3mJkHnosZ5n2+n/M9Z55zXuhgmdhigUYqPFb8Lg32dXLeHZeLj9OM1wpi73sMzHpgADvFShfnXEwUn0uqrO4WwAUXM1blmRxgv8fArAUyscHEnhxoenuF5QAevGrBRQ92LFlwpMraJGFZ/bMFn+WC35g4YsGlmmDrToPdlvGGixmPgVkXLyxJPBnjHhM/uzhVzhhKqqx2cWIhwbZbTCXj3Fc8e1EQHhzLLb1m4oeOxGsAF1IxaGKDB4c8+LWU8fAdAdIqT3twrWPhps20BdfrNVNMbdMysdGCJ7ZXWF4S6yy43B2AhhszZfHs/HkfZ4WLn3LKyxb80lXxGJg1MZl8wQPt8r7JxJVuC98GcdLFhIs/THzUAlEW23oJ0AAJ/imLbc0OVFhlGW/1HEBMeMb6ovV7PfjLxf8e3Ox59OLo7dX/ionJflifO/Cvi4Mu3vNgEwC7Pud+E6W+Qcy58ftcAWYM9dGFr9NgV+k0jzAiHjVRMvFtHwHmGpQF3/Xbeg8s/ZIHa9YHwyb2WDDWaKH9ceG3llbdcdtdwrbghov/8tvw7YZ4KgZdnO85gHg3qXBvU+Rplc3tppwuW/96ayMSoxb8aMFxC473uACny8Hw/C2RfMINvu+B9ZMW/JnXwcWXx7hrXoDahdStaahh+5RVeTIZZ4VlPJdmvDSveJKwzALllFc9mO5K9MH1csbQgrY3AE7zkIu/XRywjMdLYl19Uuow32frd0tLF1wQojBGe4VVnc6GJj7dKVamYtCCiovzyTh3LwqivizjxXoOU7HVgx1tbL5k4rCLc/kznzQF1m4eXBBAbDRxJs14Hmo1Uq+LVLzpGetdRB7xh5CP9GLKAi1ZcJFQkx6crf+NLOMdj9orWeE3W1yM9gTAgw+Kb8qlM6wx8VUqnurkvFt9loNRGQG+AQAAAABJRU5ErkJggg==",
                    },
                    {
                    label: "Torrent Search",
                    url  : "http://torrentproject.com/?t=%SEL%",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACL0lEQVQ4jW2Tz0vUQRjGP/ujdVODDkmZhB4yqIV03ZlTFy8JHrwEHjoEHlqDzoLX71GQ8NIlPCgdhMYCdWdYPH3/hDDcELdYwUgpaSFt1w2H6bCO7X5x4DnMO+/7vM/7zAwHx8c9QRDEaV0BcSBGQHJgiXRG0Y0iAcQAlFKJHycnt36dnU0QhmHSH4yGJMUG41KzLA0VaXDC8FcaKkKzkDX0+9wwDJOHh4dd+ACKhDC8EhorDU4a3Nh6E34vDKfC8AKIBUEQ9wTNYs2CT/SYOX3tZk5fu2hcal6ObdEVBEGcyRKp7BoPhKbRmiSKuA276zbsrhNFoiT1kXXuPv197wbjZTqk5l20y9g6rmqtq1rbNkaLiuXHP7lNJqRbGHbyn7ovOnp4gmg8/7HLCcOX4ZDrPHxLlzTURRE3dfCsrTCKVbvtpr49caLYNHRgiTRATBrqXtrQey4lWbXbbli1+5BRpABiwrAVdT9KMFObb/NAGLZyBTqbCjRzUfcvU9B2G5q5RztcA2CoQJ/U1PwIVWvdpt1zgyu4wRXcpt1zVWv/j6CpDRXom/g+0Xnx/HMFnkuDy3/udbONxbZuooibbSy6/PZNJw1upEAeRaJUKqX8U455ksyHppJLoamNFMj7mqNG4z77+/tXW0nOx5lrMbYuNF9zmvmsoX+0Qvr89zZrjmq1Pv85lFKJ6T/TvZkSqdwbrmQVPXKNOwQkCYhPlkhVKpV0GIZJpVSiXC53/APx/d8s2t1b5gAAAABJRU5ErkJggg==",
                    },
                    {
                    label: "vitorrent.org",
                    url  : "http://www.vitorrent.org/%SEL%.html",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQklEQVQ4jYWT0bGCMBBFc1MCloAdgB2IJVACKUE6EEtIC5QglmAJYgemBM77cJKBB477mWTP7r2bNU3TIImqqvgV0zQBUFUVknDOYYZhwFqLJMZx/Al5PB5IQhLDMGAAiqJAEl3XLSptVT+fz1hrKYoC4APw3iOJLMs2k+ex2+2QhPeeaZo+gBACWZYhib7vvyb3fZ8KhRA+HcSKbdtiraWu66+A0+mEJNq2TWcm6hvHMZkT6XP9r9cr3T+fzyUgRhxPNHMeXdetxp08+K8xz/PFI4A8zxcexfMFAGC/36cZx7jdbivwZgcAl8sFay1N06RHdV0jiev1mip/7SCEgDEmjSqEkMx7v98rbxJgTnbOYYzBe5/Mc86tfFkB4kXcj+PxSFmWSOJ+v2/+0pWEGGVZpiU7HA4r7T8BcT+ilK1kgD/YzzBJmJMa5AAAAABJRU5ErkJggg==",
                    },
                    {
                    label: "BT天堂",
                    url  : "http://www.bttiantang.com/s.php?q=%SEL%&sitesearch=www.bttiantang.com&domains=bttiantang.com&hl=zh-CN&ie=UTF-8&oe=UTF-8",
                    where: "tab",
                    condition: "select",
                    image: "",
                    },
                    {
                    label: "TorrentBa",
                    url  : "http://www.torrentba.com/tags/%SEL%/",
                    where: "tab",
                    condition: "select",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADM0lEQVQ4jY2Te0iUaRjFn4aQsFnTtomabHRiostnEijELmU3nZZhd9NEo/sSlbm0VDrd3U1QW1IxsszNUnPatGbGyu44uY1l6qib5QZlLWkr5B9blDDzfe/7ft9w+iOKIhf2/H3O7/DAc4iG0QKikSdT9DG+PXHJrZmTk2u+j4hdQDRyOO8nSpMo5FF+iv3lxcIB9cE5qD21ULuOgf+xF4OOtIHufTH2NIlChg07rPrxg6d2+NQnd6E974TW2wj1LyfUPysg2g5CNO8Bb8zAP4e+6qy2jZ7wWfNgRaZPPLgBbaAD2vM2aE8aoT50fwrwbIZ8ejn68xd3f2c0hn4A9Oybt5N7K6H2NiE42AWt/zbUx1egPnRC7XFA3CuH6CgC92RAcaVBrtyI22ujCt7ndS/qMgbEPQdEew3U3qvvbr9fA7XrN4j2Yog7v0DcyoJoyYFStxmB4z/gmT3+lWQw6OmwNSKGXfsRorUAouMohK8KorUM3HsE4k4RREsuhNcO7skAv7YC8qnlED4H5JpM7P76y0XkTg2zyWXxEM27IHyFEO1FYI0FUM7nQXHmgF3PBvdkgl9fA34pGfxSCrQXneDeIzhhHbOJqpaOSfRn6yCXzABvyoJo2Q/FZYfs2A65egsCFRuguFaDX04Bv7AErH4hRPM2KLXf4teE8PW0LHZs5L9bdUF/tg7+XaPA6tIhV1gRKE1H4OhKBEpTwdxLwM7MgVI9Dax+MZhzFt6UTQp+IxnnEhFRV5alLVA4E367DnL5fPh//gJD60dgaBXBnxMKuSQccrkRrMEG5pwF5jbDm2t+KhkMeiIiykuKsL3MnRiUTyRAfdwA7e8bGNoYCv/e0VCqYsHcSWAXE8FqTWD1Zrw5awn+lBi55eNf0lWmjzs0dCAMvMkOre8m5GPzwVyLoPwuQXFMAjsbBXZhCgLnp6JkbfS5OCOFfgwgiSikONmQ15c/PqCcjAS/sgzK6SiwOhOY2wzeYEF/pUXJTTUdnx0dHv6fg0qaNjG+fJWx2rPb9LS7zPa6u9jy+uZ+c1/puihXwnSjlf7PKomIJINBHzclwjQ7ekK0FBk2loh0w/neAsYEBhA6cjXRAAAAAElFTkSuQmCC",
                    },
                    {condition: "select",},
                    {
                    label: "Firefox 附加元件",
                    tooltiptext: "左鍵：Firefox 附加元件搜尋選取文字 (新分頁前景)\n右鍵：Firefox 附加元件搜索剪貼簿文字 (新分頁前景)",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4jY2Sa0hTcRjGD/7P2Fo2Vw1CsKyYlUn0YdnmOafstq6GWXZRmFS2OdCp2zlnXrI1IrxglJRF0ZUKEu26Sh25NC9b5gSrTxnZivpQUSHOClGfPiyLMKTnywMvPD9e3vehqAmky6dmMyJxMzzpZwXylRXJzXgbNXOizF9a75je5e29i8Dn53jx4Qmq6i0jnCh5/N8ATpC8dfWcxBGPAYcak3HJ6wAnSt/9NyDBFpZvuZD4/WB9Ehz3NyDnfOJ3nTXMPGGIyadXMQIJMDwNhqeRUhY1WN1qxvFHJqSURQ2OzRmBBJh8etU4ACuQvtJ76Tjns+F0hwUn2kzIqp0HY00MjjbvRlVLJqpaMlF8fRNYgfSN34CncbYzD6lXZUi9OumXy5B6RYZtl2XYekmKlItSVD5MB8PToDR51CzOLuleV6L6mMCH5TE8jVNPjEirkyOtbnLIa+XYVSvHzho5jLeiUexOxLE2QwjAiuTmre4Toy8/+XHNVzmUXB45WNW5CwZXODJcU5DhCofhTjgMt8ORdS8KzsYNo5tLI4MMTw+xAvlCsQL5Wu3dh9KOjTjcsQYVnUnI86ix163AXndEyBsV2NOgQEmrDlvKIgcYK9mjMVFytYWSUoxA+ivbt8PknoH97fGo8K+HrU0NU7MSWS1TkdWihKlZCaNHCYdPB71DGUywUkv/lMVON2Rf0Yw4m9bCcCbmW1K5arC8ZzWyvdOQ45sOsWsunN1L4PBrUOhbCHNd3NCKIvk3lic/GJEEqHgbNZO1063LCiSvdXyYheFplD1bjtwuFYqeqmFrWDysdyqCeqdiIPv2gmG7NxZ863zYPHGhI/7rjYd6liK3S4WDzxdhzQF5UMvTei1P61cWy4LW9jnIfBCBnKbofwO4Qskr443ZKPLHotgfhwQbGf0DJ8PZzVEwN83AjotKcAXk1TiAlqe4ZQWS3rHKsnby5ndLRfJ+bM7ZJb1anuJ+AlaseBXu6wE/AAAAAElFTkSuQmCC",
                    onclick: function(e){
                            switch(e.button){
                                    case 0:
                                            gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(getBrowserSelection()));
                                            break;
                                    case 2:
                                            gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(readFromClipboard()));
                                            break;
                            }
                    },
                    },
                    {
                    label: "greasyfork.org",
                    tooltiptext: "左鍵：greasyfork.org搜尋選取文字 (新分頁前景)\n右鍵：greasyfork.org搜索剪貼簿文字 (新分頁前景)",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4jZXTv8qCUBgG8OegVEOhkiS0NJzJewi6qMCpqZtwkybvoDvoAlqFoOjPoBBRikPDeb5Fpb7S6oGz+Ofne17fA7xGAvABRADuxYqKa/LN808JxuMxO50OAdStoO7lNQC6rsvD4UBd15uQ9cuXAXCz2bDdblNK+Q1SVSInkwlHoxEdx+F2u62Q/X7/CZEA4FuWxSRJOBwOORgMuNvtqGka5/M5T6cTW61WHeCj6DB7vV6F9Pt9Ho9Hllkul3VAhOI3sUTiOOZsNuNjFotFHXB/Akrker1SKVUBcRyz2+3WAtH/G4ZhcLVaMQxDns9nKqV4uVxoWdbbLfgNXaZpmsyyjEop3m43mqZJIcRTE2UTAIC2bTPP8wp52E412kETIISgbdtM05QkOZ1O3470+lMlhmHQ8zzquv4yyl9Vgg+HqcxPx/kP9hE33f0JJs0AAAAASUVORK5CYII=",
                    onclick: function(e){
                            switch(e.button){
                                    case 0:
                                            gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(getBrowserSelection()));
                                            break;
                                    case 2:
                                            gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(readFromClipboard()));
                                            break;
                            }
                    },
                    },
                    {
                    label: "userstyles.org",
                    tooltiptext: "左鍵：userstyles.org搜尋選取文字 (新分頁前景)\n右鍵：userstyles.org搜索剪貼簿文字 (新分頁前景)",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADDklEQVQ4jWXQ3U9TBxjH8ZNFRJ1UYAi0pz0lDba09Ch7ZWEyQtjktS6zHaask4zAgCYytkRbIFumnaKj2TQxc3QM416MI4EwozhTLzBLll4wFtGadWYTEbqNhKwsWbkp57sraWW/P+Dz5PkKgiAIGzduIE+9lXz1VvLVGag1mYiaHLRiHtlZKnK2bEbKeBxpWwa6LBW67EzS09IQHq7QmMv3M26u3XITvN1FKHKSqfB5Ll3+jFf3VWLT5jJR+RR3DtiIvNPCXd9hinWaJGAyq5l+cJTp+aP8PNfPkYHXsTts9PT04PP58Hg8NOzZQ4O5kImW14ie6EOWxCRgNkv8+tcX3JkP0NppIxgMsrq6SuoURSEajeJutBPtXwcUWwz88XeQgVPdjIxcBGB5eRm/3097ezsej4dQKEQsFuOgs5Fof++jgLXYxD//Rqirr2J2dhaAiatXqKqx0tzyEhV6DbYSGYfdzpt11USPe5GllAaSVsPpj0+yU7YQDocBWFlZIfB5ALe7A9sLz+PZ/QxfN9Zzra2J+eO9yKkRt2dvw7W3gpryEvr6ev/3fyKRIBQKYa+r5dtWJ/P+D9ZFNIj8fv00v1z1IxslhoaGSCQSrN/CwgKuynIenPkIq6RNAkUFGiLf9XNj2MuBht08XaKirKwId2cbZ89+yuLi4hri7XiLPwc/QdanACZ9PuEL71O2y4jD4WDfXhX3bj7Gb1MbaHVtoaa6eu2tN5xOakqsPKHKSAJGXR63hr2UykZisRiTk5N0d7XQ3PQs+x1VjI6OoigK8XicipdreXdgELVO/yhwc+gQpfIOlpaWUBRlLd7Dy/F4nEOHPbQdOcWFn+YoMFlSgVxmznkZ7nHxYumTdL99kEBgkPHxccbGxvjw2DGqX7Hz3vkrfDM9x+WZWQqMqYCUT3jER2TsBN2uWro6y/nxRgcXv2rC6XiO+v3NDP5wly+n7nNp5j7Xb99DbzQngc3paVgMIhaDiDonE1GdxU6rll1WEVGdxfbcPAqMFgwmM4VFFoxFZtI3bUIQBOE/EDAl6FFoKc0AAAAASUVORK5CYII=",
                    onclick: function(e){
                            switch(e.button){
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
var menu = PageMenu({ label:"搜索選取文字/剪貼簿文字", insertBefore:'page-menu-separator', onpopupshowing: syncHidden, image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jb2TIQ6AMAxFORt4/C4EDrWDcIoJHGqOKyz5YVNdPgowExsDfvJlX9P2t2neUDtE142RJW6H6C5AafHpbwD9JDTWEwAB0FjPfpJ8gLGe67ZTaaHSwnXbaazPBwCg0ndHpYUAfgRUj5BaIgDOS3h+xnkJSUhRDk7I90F6BKh+phod0Jg4w6E4Nw4AAAAASUVORK5CYII="});
menu(items);

};

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
                    
                    xmlhttp.open("get", "http://translate.google.tw/translate_a/t?client=t" + urls[event.button] + txt, 0);
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

page({
    label: "下載腳本檔案鏈接到指定位置",
    tooltiptext: "下載鏈接到指定位置 (不彈窗)\nUC Script 下載到 chrome 資料夾\nUser Script 下載到 UserScriptLoader 資料夾\nUser Style 下載到 UserCSSLoader 資料夾\nJavaScript 下載到 local 資料夾\nExtension 下載到 xpi 資料夾",
    condition:'link',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4jd2RsWoCURBFFwIJSUrFQuyUx8Luu+dCyAeIQmp/IB8k6bQx+UFLCxGirKZZQ7I+Y9Lmwq3ezJk787KsIUn3wMz21vah9haYSbpv1p+oLMs+sPzSfLB9AJZlWfYvAoBge9UE2F4B4b8CiqK4jjE+AENJz8A6ccR1/TYsiuJxMBjcfAJ6vd6tpCnwDuwT04+QfV3z0u12776lyPO8BSwa/9/0Fljked5KrnIB8nPzUSGEdgKyBRYhhHbq6hNJnTNJdrZ3qcmSOsAkAypJo1QSSVNJ09RkSSOgyoAqxjg+s9FV7RPFGMdAldneSHqVNPqtgSfbb7Y3GTC3vQGqP3hf98w/AHA+wuIFFjTgAAAAAElFTkSuQmCC",
    onshowing: function(menuitem) {
    var url = addMenu.convertText("%RLINK_OR_URL%");
    var urlt = !/\.(js$|xul$|css$|xpi)/.test(url);
    var urlt2 = /\/blob\/master\//i.test(url);
    this.hidden = urlt2 || urlt;
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

var execute = PageMenu({class: "exec",label: "以外部程序開啟", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII=" });
execute([
	{
		label: "PotPlayer(頁面 youtube限定)",
		text: "%u",
		exec: "C:\\綠化軟體\\PotPlayer\\PotPlayer.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArklEQVQ4jWNgQAN5+///RxcjGjit+f/faBkEp+8lwyCYZpe1ENpiBYmGGC37/z9mB0TTqlv//5stJ9E1yAYwMDAwXPwG4RPtGnQDYIBo1+AygGjX4DMABiacQ8QUWQZsvEumAc+//P9fcQShufsMCQZcfPr/PyyR+WwkIRCff/n/v/44AVtxGXDxKSJF4rUV3QCjZf//J+4iwVZkELAJoZFoW9FBxZH//yecI14zAJoE+V+sQXR/AAAAAElFTkSuQmCC",
		condition: "nolink",
		onshowing: function(menuitem) {
		var url = addMenu.convertText("%RLINK_OR_URL%");
		var urlt = !/^https?:\/\/www\.youtube\.com\/watch/i.test(url);
		this.hidden = urlt;
		},
	},
	{
		label: "Internet Explorer(頁面)",
		text: "%u",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAAD7ElEQVR42lWTe0xTBxSHT0sz55JlWzRMMp1kumUugjHVTDZBYGGPyHCBDTfkDbawWgRaaEvbe29pKZQWBIalDMwwRrbgmILAyEIzIshDXuUNujEYG2J5CKxCn/esGLNkJ/nl/PWdk5OcDyiKApKkgKJIINydoBSsIqUUNIQIBAIRlKjyYHZa4YOb+/S4BCO4vsNsH2Q1iAIOv0zIchn/gxUUyVARUogXaT0Dcuvjk/UNVf2jBiMu7Jl62LbjL2Pxa1eqP4KwzhzQ9maDMOr9j+E/WEkRDJGUgneJn6LCGh48qBnqwg1rJeLvB9DU5G+VNBtXfXW9pldP5oSJAt6AuSqmxA/cRT7bLJaRcFTRzOOaHuOAuRvRLrfj4At4qy4RtX9YUGVB5M048VCt2RVRpudPF8OxT/a+xQApqWAVkBIIlVb7xfYsbU4u33XhlsC59isTMxSclkBlizrIcPfmxb5Fq2qZdsaPWem39aYnFwUxJ9S5KgB1LuGRIVEwAqv66tv/vof0lsS2YmQ6hZIEDl9aBIVENgiycoCdURMpnFiziR+67MFta+iddbuWkMsAypQiiBSXvp7d0rXocJTR9D0WrTPwNnwlt5MTpLro8JzyxDiiNIbNr+TGG2fX81Zdzi/6Lc79eZ2zHCH1PGhIEcQKC493jF9z4f19dMeNcNe3WzReRcTLDkSDO+U2xEp3rrgQC54gxs0g7tdPYkqmzBtk0kvQ2CCJcC4E0fev73FcXlimdY8s9vMtw5OprUOjKT8PjXKbB8e4TQMTSQ19Y5F1fSMh33WPvyltHLggonZDW8sNsDz67OpaO6C68ZpNj0hz78w9PhKnPUiIRcxMgWSnKEviwc+UQCw3+8VErnBXCk/oyc+Sv5RDKADampL2umZZXbeun7JG9KzRmpUtR+mKDY/lt1acSVN7iAkKLmSTcDy9ihP+/eD42ZvDM6cMPeYD5ytKCIIA+KX1dAg9AoNZ0X7f+NbO/JM5u0EXrTsc+X9aMLiis/0dUZ3mPU1rI+fOvFO6jPjlNKJX0YDzNE/tr1W5B3S0fRiEJo/urz2f8/U6a0j1qTfTyb9ZkVql7doNRNWiHaklxHQz2kOHbLi7sJ/2jirgyeTE9gczoVL8wU5XL6upNgI4yvRI+Kpcxz9S1TMXYFzC0OEt/HTChYE9m3j4x3l8RWacPxhdGLcN5ypIBkGSALEnz0D+CTg0VQL5U+WQZpLD0YSIz73YgpoktvyHGjZZ1+gjqKlmc4qTY9IIL4nc7Y2CYhBPJaQA8os1kJmaCSGwC/yBCeeCz4FSqQKtUgZaUvw0OoVbP/e9aqViG/Ignhm87dG/AxAqkU/flzAAAAAASUVORK5CYII=",
		condition: "nolink"
	},
	{
		label: "CoolNovo(頁面)",
		text: "%u",
		exec: "C:\\ChromePlus\\Chrome.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAAD6klEQVR42mWTe0yTVxjGTzs2IdwyE+vATYFtUK6lWgQK1REKrZXCIAy5I4LDUafZEi792u+c7/t6F8gKUoGOKWFjMTgVCQSUa2SDwYhUYUEXjGNRRsxMtixGmGvPvoL/7Y+T95zk/T3ve5LnARRFgf8dhABiK63VckiziVOr04NrERGKuXyllNDrAYKQg171so2IfSDuq8rC1DZMkhytyQSMKhW4HisouZOS8LujQNliItQAUhTHPWRLwA3QiAY6rc595yAacSg3bDQC/adnPEeiwi8vyyV4MfcIXpaKlzurP/ZSsxvREG4LqJqrc/K+zT1TbTsVDmkIdAQNSIOBw8I+I9ERw0uKw3hBmbr5U2qSc0Es3GyrOhnt/gYNSc6WQHnzCZOiV44z+uXP83qzez5pPx2mO6sCN/lh1xfSJXguTfJiJjnOOSUW4enoMKet4sRBjcEAKBJytwTKLOVqebd8M7P3KM66psCKW8p1e0bUj3diY/BsohBPxcXiCZHANRoT6RoP3udsPV4arzGyApBkBRAAxUxZUapd+pf8G5kr80rGpqxHjq3pkSOT++P0XUolGgwN6xnbG4gHQ99zDvN4G9bCEj5hMANIIgAhDUCBptRf0pTiSLuY7pJ2p2GpTkEdMw8kZ31xf1huf3Qvq/FuQ4dIRgy8uRP3+e2cby3L86ctlI+ervc06NQAFNKlGQnmQ6sSWyr+oFn8MBOZBUmNq0/FDfewxOTA8c0rOB3ebrzBD7QuW71XHk/4PPx1xO/PR7d8f1sZ8h8Fx7TF5SIm6e/4hkOuww3JV/PJpsLImlEcWzuwIagdfBlTM/DyQM3Qg68tij1/fO/x4unUDrw++bprfdIDz7TzpkEpUel9gEieEjLifyUW8VDW5wbJ7tJu/G7Fl86Qis6N4Ao7DijuGenvTA1+Ns7958m49+baxA4837Xrl/PaAj9gpkxAps7KDq0XYiGVgI9qig4GZTM0V2bEbxwxYpB27rGsiuQv9oYQaze98NqoF55uCxizakv2EZQFAIaiufWQ8FTUZ9btrxPOJDL5szmatsQy1WlRxVlVetVn1UHzXe/nrl71fb50mceuHbjcgkoCNMgIaEr7GoCspw00BQhoAil1THlM/ZVnHzEdT+7agr67bw+0PLj01uTiRR52XArA8x27Fr8y5PDVpIWFSa47M8DI2reyhhGFV1onBafsc5k1bSIjPCkcMwZt3G4KwdPWvXi29W08c+Ed/IN198/ndcf3aKCBDZPbyqyRLHoEBEWonfch1V1dC0GTjgAEMoMLKM+3nw5t6aOjlvqYKMcNis/YyDwPBEmAtuK+ncb/APO91IACLw+tAAAAAElFTkSuQmCC",
		condition: "nolink"
	},
	{
		label: "AvantBrowser(頁面)",
		text: "%u",
		exec: "C:\\Avant Browser\\avant.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAADIUlEQVQ4TwXBTWhcRQDA8f/MvDdvP7KbtJukrk0aEQKmYMQvtNEKCrE9SKUoCgoaFBHRHhrQU6+FniwexKOn0kPqVW0PRVEoCkWCabRYapsmIW6y2U1238e+mTfj7yeGDjYn3lw4s/j+J4tnB8YhBAA451BBgBBgrUXIAGsHCCTt1sb6NxfOLd64dmVJfHnp+o1TJ154vhUr0tyxGw9ARuzu9zAIupmjnwtyK3G2QCiBc5a5qTKfvzs/J75bTn0lkqRW0N5L6BtJJzbsmpyT0xE//t3hr21FFkOee/J0QCAVE+MR4b2rS8FARKz/t09iAnb2C/rWsZVm+Cjk2KTmwVbBt795TCfB91LICrwv6D06ytSgIOgkCa1EsrFruHV3lztdS4zn/OmH0EpwfDLkscOClT0wIQgH2pXIC4cXhqBwil+X2/y+so2tRLgIJo6M8OEzw/yztsWBapmPnrR8sVXBCcDnFMZiCktJOeSfd/f4Y7WFDSTG5ZRHqrz3bJ3ID7j5oGA7jXipaXhkWBBKiYg0QoKOyuALZC/JEULirUVFGhE6Fp7Q9Hox7czRyjRSSk7PWFwlxBY5QgVICvACmRoHgAxCZKA4OT1EsyRotbuUS5o7OwmFNRxvWoZCi4pK+MIShYpBniP39hOwBS7LAfj46Qr9uM9G7BnSjvudhMaBYUzcZX4yx9kchEB4hxcCaVFIFYAUPDdV4ZXpGrmxrPSqTI9K5mdqjI+NMtY4yNtHBZFWYAvKWmOdQFqbYzVQ15x99RA77Q6b3ZTv1yRLKz2Gs23iOGbq4XGmm1VOHFVQK+GVwRhLoCtVwoalOV7ixWbGz/+mnPsF2r2UW1bzw5rmjfUen87VaYyO8dnLCdc2Y+qHRjDrIUFZe5rNGguzIV/fHHB5VaKM5vBIGQk4a7l6T3J9o887T9V4/Yjg1OMOtGbde8SZK5t+qDFKoyzoJikVLSmXAnSgKEyOUJJABSRphkMglKZOTubg/AevvaU2bi+vzs7OHKuWqFdcnxoZFdMjTLuE6R4Vm+L3dwhtTGASTNzBe8Olry5cvP3T5Yv/A8Wnidb2u+HkAAAAAElFTkSuQmCC",
		condition: "nolink"
	},
	{
		label: "Opera(頁面)",
		text: "%u",
		exec: "C:\\Opera\\launcher.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAC10lEQVQ4jWWTzWtcZRTGf++deyczY2PixNrRsVFpEFwUAoIgFApZiCB0V+oHrrpxof4JCrqRbroRhSoIDhWpSFfSoLTFhVQFoVbEaqUSTDBjb2Zy78z9fN9zXhfBOMWzOpvndw7nOY9hpvyFT7rAaeBZDcyqV7pq7R2pq+sibl2dO3fvK69NZzXm30Y+Hayp6Gem1enSiGh4D1UFVYXLM6oyZ1LmQ2vtqeU33v76LkDx0QfHVfXLZqvTDBU2Ll/y3924YTbjIf3uEseOrPj+yhOmqCs2xJaVtWur7394DaAxfvdssyryq22hG00z8p9/5PtvvzHXNv54/s1hevKxYnIzqquTvUZIVFvMdBJuTSfHX378yHsf37zlw8lodCpystwUD1XJ5PYtbu/sYFS/AjCqV/7c3WWyO0LbJYF1aF2tpNa9CAzCNI5PPGgFsRaxNa4oSIuCM0k9AghUR2lR4sWR7I6xzhJZy6R2J4BBmMTx0w+JkDuHOEeAx1m7f+V3MpG3AksYBMRJjHWWyjqmwlMAYRLHvcoYSmexztJqRlhnddYqtZaGMewkuzhx1CJkRAcBwnQ8ImkEOFfjnOPwoR6h9zIL6ABBEDDOJogItShZ1AYgnKbp9tBo34jDOcfDDxxi3gQR/LfEQhAQGMOkKBEPFYYMd2cPkOfXN9X2D4jFikNEWQxDoN4HLIURtXWUCgKkxlCo/AQQZFV5cbOsSfKMtChI84xeu8P5Fl2Az1t0D97TJilyCqAE/sZQqF7cA9R2MHay9ZcYSoHfh9v0719ivsEawOLi/LHe4WV+2d6mBGIMY/VbpfrB/iu/fqC5pvhLCyrN+/CsPvKoX2g0THNujmCuRZxN9epvvwYjDzveiHieuVD7K3eF6XSncVQ955v4o4t42gZvvTcCFHtTSYSRU176Qln/XxoBXpgzTQ+vquc5xT9plQWnJM7zg8K6es5dhmRW8w/HkbkYBGQB7QAAAABJRU5ErkJggg==",
		condition: "nolink"
	},
	{
		label: "GoogleChrome(頁面)",
		text: "%u",
		exec: "C:\\GoogleChrome\\MyChrome.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACkElEQVQ4ja2Rz2tUVxzFP99738yLMROJoglxxpai0pAYrOiiPzaKv1AshTpREF0VXGVhigHRnVtp+gd0VagLJ66atrqJOx03SqniNCKCjab4Y+KbefNm3o97bxehA7W40gNnc+B8OHDgHSVvBounvt7opcmUXttfVmlSAkeW8pcNworpWz1T/PHq4lsBjz/fdTTf11vRvofkPCTv4ZIMlxlsO8bElrQZlT+6c3f2f4CHmz8+muvNVXSvj+Q9xNOIEpy1OONwcYrtrDhNs/LWRwuzAArg2C/ljdd2FyqunWKCCFMPyeohWaaweJi4iTUtnIqxforql8qjEzuKAB5Ay7TOzB8a4JPqa4ZCgze4gcbZCzwYHkNEGCv8zmB9mpw8xctblGdx6DP8xLcKIKe8ibRHM3dkLa0sY2nyHN+/Gma+FnCjFnDpZomldRdZVYjJ+SlaG5zky90FbdMpaaW498UAC3ccNf8Dnj+LyHsKJUKSWX7+c4Qtm9ej7AsAtGuVugAMkANRiusTQwy0E16GbTytAUiNJYz9/5xmMkUX0GcKRLaFU46/h1PGvacs37UgCkEQsez/8BnKPgfAWYiSYWBh5QXXkSsucTjrEOC2u8zpfYZPi5rPSprJPQnj/vmVsoMszRG385XugpIuzdxv3p/wRBAfAgLm5Qf6x9ZgOwbFH/SpJZyFLMkTNgoEybbv4B4aoHq1ujh+cHsQZdFBUYKIIEBsY3qz10wPPkQ7RdLxiRo91INNUyNfXZsFVgAAtbkH1dG92xtR1D7grMM5sInj9OonFDFEzVU0XhWoN0tTo8dvzfzb6wIAFn6rVfccPnA9aERrCNVosb3Ml4QsB+tpNAcq9Wz8m50nf53lfeof8bUtLh4aPuAAAAAASUVORK5CYII=",
		condition: "nolink"
	},
	/*
	{
		label: "uTorrent",
		text: "%u",
		exec: "C:\\綠化軟體\\uTorrent\\uTorrent.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEklEQVQ4jXWT60+SYRjGn+b6G+pLW586fWhtbuaGZZliuLBMXgRT06ys0OxAikKplKYiHiow5jIPVKYlaioIIcpLU8tqzVqmlXagrFVzaRbyvl59MN/M5u/rfV2/3Xv23IQsIEHLX3H8ZmSZ0kwNq+1ij9pOec7YqEF5k0iTWiFdtjDPQVHER1YtrMyxiNg8hwSFzmgUOqNR0C1FXpcYuQ4R1PZINr2Z0lP1lM9/5SM1Yb3qDhHOd0mhccaiiI5DER2Hgu5o5HdJkOsQI98hxtnOSKgsUQ5CyBJOkKgPvpbZIpwt0zHQ0vEodiVAS8ejiI5D+wsDxn+Owct6oetJhtq+G2lNojJCCCFReQGrjhn57K0nJXjo7sDo+AD0vUdRdm//H8leGB9nYY6+963Ise9Ctk3IxBeGLSeJupDatFsCfPsxxoXuvjKimJ7dQOOMRUG3FGMTrwEA08wv5HdJoLIJkFInLCJJhuAPikYBXKMmTvBp8g209F5onLEodEYj1yFG07NSbm57WQ2FJQjKtvAhknCJx6SbBDD0ncB8qvoVON8dhXOdotmV7Tsx6RkHAHz/9RVKaygUlpBpsk+3iTnZwIf6bgTGJkY4wQO3BerOCGTZhVBZBci08tHvNnNzevQ2TnfsmCSHy/kfZTVboTLvgG34KhdgZryouC+H0haM9I6tyLSGcu8wx6Onfc9Ism5nXUK5P+SNIShwxGBmhv0rYb3oedsC81AFV74zqMPzzz34NvUJJbU5+WRP9rZ1Eu0GNqmKh1MtQRj60o/FcL1pxKn2QMjbApFqCmAkii0rCSGEyMrCGyWl67G/yg/VvdlgWAYAMOWZQPsLA1oH9ShxJf4pb0aqiYeMamnlvL9MfA6WBg2ItOuQVMXD+88jmJyagJeZhr43BXJzIE62bsax5gDI6v0hr424Twj59x4IRXySisNuR2jWztTaSzEw9ACj7mGYHupw6IYfDho3Yt8VX/bE5cg6X1/fpYtepTRjy5qMkgM1lQ0X3S2d19l66xXPgUuB72QXwo0xqu2rF+Z/A2PzbZLx4lJaAAAAAElFTkSuQmCC",
		condition: "link"
	},
	*/
	{
		label: "PotPlayer(連結 youtube限定)",
		text: "%l",
		exec: "C:\\綠化軟體\\PotPlayer\\PotPlayer.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArklEQVQ4jWNgQAN5+///RxcjGjit+f/faBkEp+8lwyCYZpe1ENpiBYmGGC37/z9mB0TTqlv//5stJ9E1yAYwMDAwXPwG4RPtGnQDYIBo1+AygGjX4DMABiacQ8QUWQZsvEumAc+//P9fcQShufsMCQZcfPr/PyyR+WwkIRCff/n/v/44AVtxGXDxKSJF4rUV3QCjZf//J+4iwVZkELAJoZFoW9FBxZH//yecI14zAJoE+V+sQXR/AAAAAElFTkSuQmCC",
		condition: "link",
		onshowing: function(menuitem) {
		var url = addMenu.convertText("%RLINK_OR_URL%");
		var urlt = !/^https?:\/\/www\.youtube\.com\/watch/i.test(url);
		this.hidden = urlt;
		},
	},
	{
		label: "Internet Explorer(連結)",
		text: "%l",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAAD7ElEQVR42lWTe0xTBxSHT0sz55JlWzRMMp1kumUugjHVTDZBYGGPyHCBDTfkDbawWgRaaEvbe29pKZQWBIalDMwwRrbgmILAyEIzIshDXuUNujEYG2J5CKxCn/esGLNkJ/nl/PWdk5OcDyiKApKkgKJIINydoBSsIqUUNIQIBAIRlKjyYHZa4YOb+/S4BCO4vsNsH2Q1iAIOv0zIchn/gxUUyVARUogXaT0Dcuvjk/UNVf2jBiMu7Jl62LbjL2Pxa1eqP4KwzhzQ9maDMOr9j+E/WEkRDJGUgneJn6LCGh48qBnqwg1rJeLvB9DU5G+VNBtXfXW9pldP5oSJAt6AuSqmxA/cRT7bLJaRcFTRzOOaHuOAuRvRLrfj4At4qy4RtX9YUGVB5M048VCt2RVRpudPF8OxT/a+xQApqWAVkBIIlVb7xfYsbU4u33XhlsC59isTMxSclkBlizrIcPfmxb5Fq2qZdsaPWem39aYnFwUxJ9S5KgB1LuGRIVEwAqv66tv/vof0lsS2YmQ6hZIEDl9aBIVENgiycoCdURMpnFiziR+67MFta+iddbuWkMsAypQiiBSXvp7d0rXocJTR9D0WrTPwNnwlt5MTpLro8JzyxDiiNIbNr+TGG2fX81Zdzi/6Lc79eZ2zHCH1PGhIEcQKC493jF9z4f19dMeNcNe3WzReRcTLDkSDO+U2xEp3rrgQC54gxs0g7tdPYkqmzBtk0kvQ2CCJcC4E0fev73FcXlimdY8s9vMtw5OprUOjKT8PjXKbB8e4TQMTSQ19Y5F1fSMh33WPvyltHLggonZDW8sNsDz67OpaO6C68ZpNj0hz78w9PhKnPUiIRcxMgWSnKEviwc+UQCw3+8VErnBXCk/oyc+Sv5RDKADampL2umZZXbeun7JG9KzRmpUtR+mKDY/lt1acSVN7iAkKLmSTcDy9ihP+/eD42ZvDM6cMPeYD5ytKCIIA+KX1dAg9AoNZ0X7f+NbO/JM5u0EXrTsc+X9aMLiis/0dUZ3mPU1rI+fOvFO6jPjlNKJX0YDzNE/tr1W5B3S0fRiEJo/urz2f8/U6a0j1qTfTyb9ZkVql7doNRNWiHaklxHQz2kOHbLi7sJ/2jirgyeTE9gczoVL8wU5XL6upNgI4yvRI+Kpcxz9S1TMXYFzC0OEt/HTChYE9m3j4x3l8RWacPxhdGLcN5ypIBkGSALEnz0D+CTg0VQL5U+WQZpLD0YSIz73YgpoktvyHGjZZ1+gjqKlmc4qTY9IIL4nc7Y2CYhBPJaQA8os1kJmaCSGwC/yBCeeCz4FSqQKtUgZaUvw0OoVbP/e9aqViG/Ignhm87dG/AxAqkU/flzAAAAAASUVORK5CYII=",
		condition: "link"
	},
	{
		label: "CoolNovo(連結)",
		text: "%l",
		exec: "C:\\ChromePlus\\Chrome.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAAD6klEQVR42mWTe0yTVxjGTzs2IdwyE+vATYFtUK6lWgQK1REKrZXCIAy5I4LDUafZEi792u+c7/t6F8gKUoGOKWFjMTgVCQSUa2SDwYhUYUEXjGNRRsxMtixGmGvPvoL/7Y+T95zk/T3ve5LnARRFgf8dhABiK63VckiziVOr04NrERGKuXyllNDrAYKQg171so2IfSDuq8rC1DZMkhytyQSMKhW4HisouZOS8LujQNliItQAUhTHPWRLwA3QiAY6rc595yAacSg3bDQC/adnPEeiwi8vyyV4MfcIXpaKlzurP/ZSsxvREG4LqJqrc/K+zT1TbTsVDmkIdAQNSIOBw8I+I9ERw0uKw3hBmbr5U2qSc0Es3GyrOhnt/gYNSc6WQHnzCZOiV44z+uXP83qzez5pPx2mO6sCN/lh1xfSJXguTfJiJjnOOSUW4enoMKet4sRBjcEAKBJytwTKLOVqebd8M7P3KM66psCKW8p1e0bUj3diY/BsohBPxcXiCZHANRoT6RoP3udsPV4arzGyApBkBRAAxUxZUapd+pf8G5kr80rGpqxHjq3pkSOT++P0XUolGgwN6xnbG4gHQ99zDvN4G9bCEj5hMANIIgAhDUCBptRf0pTiSLuY7pJ2p2GpTkEdMw8kZ31xf1huf3Qvq/FuQ4dIRgy8uRP3+e2cby3L86ctlI+ervc06NQAFNKlGQnmQ6sSWyr+oFn8MBOZBUmNq0/FDfewxOTA8c0rOB3ebrzBD7QuW71XHk/4PPx1xO/PR7d8f1sZ8h8Fx7TF5SIm6e/4hkOuww3JV/PJpsLImlEcWzuwIagdfBlTM/DyQM3Qg68tij1/fO/x4unUDrw++bprfdIDz7TzpkEpUel9gEieEjLifyUW8VDW5wbJ7tJu/G7Fl86Qis6N4Ao7DijuGenvTA1+Ns7958m49+baxA4837Xrl/PaAj9gpkxAps7KDq0XYiGVgI9qig4GZTM0V2bEbxwxYpB27rGsiuQv9oYQaze98NqoF55uCxizakv2EZQFAIaiufWQ8FTUZ9btrxPOJDL5szmatsQy1WlRxVlVetVn1UHzXe/nrl71fb50mceuHbjcgkoCNMgIaEr7GoCspw00BQhoAil1THlM/ZVnHzEdT+7agr67bw+0PLj01uTiRR52XArA8x27Fr8y5PDVpIWFSa47M8DI2reyhhGFV1onBafsc5k1bSIjPCkcMwZt3G4KwdPWvXi29W08c+Ed/IN198/ndcf3aKCBDZPbyqyRLHoEBEWonfch1V1dC0GTjgAEMoMLKM+3nw5t6aOjlvqYKMcNis/YyDwPBEmAtuK+ncb/APO91IACLw+tAAAAAElFTkSuQmCC",
		condition: "link"
	},
	{
		label: "AvantBrowser(連結)",
		text: "%l",
		exec: "C:\\Avant Browser\\avant.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAADIUlEQVQ4TwXBTWhcRQDA8f/MvDdvP7KbtJukrk0aEQKmYMQvtNEKCrE9SKUoCgoaFBHRHhrQU6+FniwexKOn0kPqVW0PRVEoCkWCabRYapsmIW6y2U1238e+mTfj7yeGDjYn3lw4s/j+J4tnB8YhBAA451BBgBBgrUXIAGsHCCTt1sb6NxfOLd64dmVJfHnp+o1TJ154vhUr0tyxGw9ARuzu9zAIupmjnwtyK3G2QCiBc5a5qTKfvzs/J75bTn0lkqRW0N5L6BtJJzbsmpyT0xE//t3hr21FFkOee/J0QCAVE+MR4b2rS8FARKz/t09iAnb2C/rWsZVm+Cjk2KTmwVbBt795TCfB91LICrwv6D06ytSgIOgkCa1EsrFruHV3lztdS4zn/OmH0EpwfDLkscOClT0wIQgH2pXIC4cXhqBwil+X2/y+so2tRLgIJo6M8OEzw/yztsWBapmPnrR8sVXBCcDnFMZiCktJOeSfd/f4Y7WFDSTG5ZRHqrz3bJ3ID7j5oGA7jXipaXhkWBBKiYg0QoKOyuALZC/JEULirUVFGhE6Fp7Q9Hox7czRyjRSSk7PWFwlxBY5QgVICvACmRoHgAxCZKA4OT1EsyRotbuUS5o7OwmFNRxvWoZCi4pK+MIShYpBniP39hOwBS7LAfj46Qr9uM9G7BnSjvudhMaBYUzcZX4yx9kchEB4hxcCaVFIFYAUPDdV4ZXpGrmxrPSqTI9K5mdqjI+NMtY4yNtHBZFWYAvKWmOdQFqbYzVQ15x99RA77Q6b3ZTv1yRLKz2Gs23iOGbq4XGmm1VOHFVQK+GVwRhLoCtVwoalOV7ixWbGz/+mnPsF2r2UW1bzw5rmjfUen87VaYyO8dnLCdc2Y+qHRjDrIUFZe5rNGguzIV/fHHB5VaKM5vBIGQk4a7l6T3J9o887T9V4/Yjg1OMOtGbde8SZK5t+qDFKoyzoJikVLSmXAnSgKEyOUJJABSRphkMglKZOTubg/AevvaU2bi+vzs7OHKuWqFdcnxoZFdMjTLuE6R4Vm+L3dwhtTGASTNzBe8Olry5cvP3T5Yv/A8Wnidb2u+HkAAAAAElFTkSuQmCC",
		condition: "link"
	},
	{
		label: "Opera(連結)",
		text: "%l",
		exec: "C:\\Opera\\launcher.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAC10lEQVQ4jWWTzWtcZRTGf++deyczY2PixNrRsVFpEFwUAoIgFApZiCB0V+oHrrpxof4JCrqRbroRhSoIDhWpSFfSoLTFhVQFoVbEaqUSTDBjb2Zy78z9fN9zXhfBOMWzOpvndw7nOY9hpvyFT7rAaeBZDcyqV7pq7R2pq+sibl2dO3fvK69NZzXm30Y+Hayp6Gem1enSiGh4D1UFVYXLM6oyZ1LmQ2vtqeU33v76LkDx0QfHVfXLZqvTDBU2Ll/y3924YTbjIf3uEseOrPj+yhOmqCs2xJaVtWur7394DaAxfvdssyryq22hG00z8p9/5PtvvzHXNv54/s1hevKxYnIzqquTvUZIVFvMdBJuTSfHX378yHsf37zlw8lodCpystwUD1XJ5PYtbu/sYFS/AjCqV/7c3WWyO0LbJYF1aF2tpNa9CAzCNI5PPGgFsRaxNa4oSIuCM0k9AghUR2lR4sWR7I6xzhJZy6R2J4BBmMTx0w+JkDuHOEeAx1m7f+V3MpG3AksYBMRJjHWWyjqmwlMAYRLHvcoYSmexztJqRlhnddYqtZaGMewkuzhx1CJkRAcBwnQ8ImkEOFfjnOPwoR6h9zIL6ABBEDDOJogItShZ1AYgnKbp9tBo34jDOcfDDxxi3gQR/LfEQhAQGMOkKBEPFYYMd2cPkOfXN9X2D4jFikNEWQxDoN4HLIURtXWUCgKkxlCo/AQQZFV5cbOsSfKMtChI84xeu8P5Fl2Az1t0D97TJilyCqAE/sZQqF7cA9R2MHay9ZcYSoHfh9v0719ivsEawOLi/LHe4WV+2d6mBGIMY/VbpfrB/iu/fqC5pvhLCyrN+/CsPvKoX2g0THNujmCuRZxN9epvvwYjDzveiHieuVD7K3eF6XSncVQ955v4o4t42gZvvTcCFHtTSYSRU176Qln/XxoBXpgzTQ+vquc5xT9plQWnJM7zg8K6es5dhmRW8w/HkbkYBGQB7QAAAABJRU5ErkJggg==",
		condition: "link"
	},
	{
		label: "GoogleChrome(連結)",
		text: "%l",
		exec: "C:\\GoogleChrome\\MyChrome.exe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACkElEQVQ4ja2Rz2tUVxzFP99738yLMROJoglxxpai0pAYrOiiPzaKv1AshTpREF0VXGVhigHRnVtp+gd0VagLJ66atrqJOx03SqniNCKCjab4Y+KbefNm3o97bxehA7W40gNnc+B8OHDgHSVvBounvt7opcmUXttfVmlSAkeW8pcNworpWz1T/PHq4lsBjz/fdTTf11vRvofkPCTv4ZIMlxlsO8bElrQZlT+6c3f2f4CHmz8+muvNVXSvj+Q9xNOIEpy1OONwcYrtrDhNs/LWRwuzAArg2C/ljdd2FyqunWKCCFMPyeohWaaweJi4iTUtnIqxforql8qjEzuKAB5Ay7TOzB8a4JPqa4ZCgze4gcbZCzwYHkNEGCv8zmB9mpw8xctblGdx6DP8xLcKIKe8ibRHM3dkLa0sY2nyHN+/Gma+FnCjFnDpZomldRdZVYjJ+SlaG5zky90FbdMpaaW498UAC3ccNf8Dnj+LyHsKJUKSWX7+c4Qtm9ej7AsAtGuVugAMkANRiusTQwy0E16GbTytAUiNJYz9/5xmMkUX0GcKRLaFU46/h1PGvacs37UgCkEQsez/8BnKPgfAWYiSYWBh5QXXkSsucTjrEOC2u8zpfYZPi5rPSprJPQnj/vmVsoMszRG385XugpIuzdxv3p/wRBAfAgLm5Qf6x9ZgOwbFH/SpJZyFLMkTNgoEybbv4B4aoHq1ujh+cHsQZdFBUYKIIEBsY3qz10wPPkQ7RdLxiRo91INNUyNfXZsFVgAAtbkH1dG92xtR1D7grMM5sInj9OonFDFEzVU0XhWoN0tTo8dvzfzb6wIAFn6rVfccPnA9aERrCNVosb3Ml4QsB+tpNAcq9Wz8m50nf53lfeof8bUtLh4aPuAAAAAASUVORK5CYII=",
		condition: "link"
	},
]);

var capture = PageMenu({label: "截圖", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAC2klEQVQ4ja2Sz0sbQRTHZ2bX/Zkf3cTdmK30EoxVRIl4qVKpx+bkQeLdU7GF/glehV7EYyGHQqXQS2lBLz1VivSQBiqkqaFad0XBrsZNskmaye5MD3UlplYQ+k7vMe/7efN+APCfjAEAgNXVVXR4eDguy/KorusBTdN+WpZ1IxBMp9Py9vZ2xrKsB57nBRBCVUEQviOECKX0TxKE4NyHfgwAoAAAwHFcvb+//y1rGMb40dFRmhAinMN7Mca95z7tLuyDRkZGgCRJoFQqkd3d3TYLIQz5LV7qmWEaoVDoK8a4RAjBoijecRxnFGMc5XkeLi0tbU5NTZVnZ2dThUIhwF7VryRJe7quv5ycnPyWy+UCHMcxmqa9Pzk5iezv72fOzs4m5+fnNUqpBACQJUmC3SDK8/zZwMDAc4Zh7PX19YVqtTpCKWVFUTxQVfXN2NhYNp/PByuVypjfKqWU/gUKBoMfZFk+KBQKjyuVyj0/uVar9WKMY4IgPIvH4+9qtdoQIYT3haiTghByE4nEF8MwkvV6PeVDfGu1WnHHce4PDw+XBEEoX2wAQngJRAihjuNUbdtWXNcVOt+SySRYXFyE1Wq1b25uroUQal76RGcAIUQ8zyvRaNRiWfYiURRFkMlkQLlcJsFg8CCbzYqe5wX+CaKUMqZpjk9MTOyFw+FPEEIvGo2C5eVlYNs23draMhRF+Wia5lCr1brVqWU0TUtaljVOKWUAALDdbscwxkVN07Zc14UYY7lYLP7K5XLbqqquKYpi7+zsLGCMY/4MOY4zWdB1ve12O2wYxhNd119NT0+vxWKx16enp8zMzExjZWUlkc/nn9br9bvdi7jyIDHGmmmaj46Pjx+qqvqD4zh3Y2PjdqPRSHieF+yGUEopSwixIYQYANDTOXdCiNBsNgdN0xy8qljHgtyenp4yqyjK50gk8sJ13T6EELxO1G2UUuB5Xi2VSm3eRHet/QZUwkmnfBikogAAAABJRU5ErkJggg==" });
capture([
        {
        label: "頁面/可見/界面",
        tooltiptext: "左鍵：頁面所有區域截圖\r\n中鍵：頁面可見區域截圖\r\n右鍵：瀏覽器界面截圖",
        onclick: function(e){
                switch(e.button){
                        case 0:
                                captureAll.init();
                                break;
                        case 1:
                                capturePage.init();
                                break;
                        case 2:
                                captureBrower.init();
                                break;
                        }
                },
        },
        {label: "擷取選擇範圍", oncommand: "WebScreenShotByClipping.init()"},
        {label: "擷取捕獲元素範圍", oncommand: "WebScreenShotByClick.init();"},
]);

page({
        label: '複製圖片base64',
        text: "%IMAGE_BASE64%",
        insertBefore: "context-sep-copyimage",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALNSURBVDhPnZN7TI1xGMffMfoDy7Qdw8wfmEskZrquFrkUOdOwaSUsqw6JVWdHDrFcQiHXyoZmklzHaE6GyS0kczlMMbfQdJFT53SOc87H8zpjM/7y27573717vt/f93me76vMy8mJEST/J2KUWKMxhf88KlfRGgypLreb4HwILYCIXTB1D4TvhLAdMOsAxB2GhaWw/iKcfAjHH4DKUbnKzMzMZQ6Xi9RySD8F66Ro93XIPg+5lZ73QsGGS3D6ETR8gceNoHJUrjI9PT3N5nSSe+EmJx40YnoOl80CeW4SsZUHbeyvtKMv7WJGdgsLdndR3QAqR+UqU3S6dIvDQfiGxURtXUah6QoVt5rRl3XR0gEtndBkgTtvRfQl5Jy1MS7hCxsPmQlJSMxWwpYuXdVmtzMgIYRRy2cSbIwn3PCM4moHnS5otoL5Mxy7A3UfoP4bbL8Goxe2EppUXK4EJSZmNNts9Js9H82cODTxBSwpsnDjNRjK3ZyphYr7YJK2Gts863ototHbISjr21dlYlxc1merlYnJJQSnHaH3NDPRm+3cfeWi6gmsPQcZJ2FbFbRKS1deQK04yjXBkPnf3cq4uXMNHzs6fgt4Tf3E3ioXbR1uCmTy0bLW2BIwykCtdmmhyTOTLVdhUAwoQyZPXtckM3hvsfxErygLR29LsVhVAuUWveRBclFV/2faiiUL/edIjbe/f1IfP7/Nv9AtrN26WrVdBr4rYPh66LMGhuXBoRppQTbxXYabIY40OqdT+evEkukr4VaHtEuc1LyBi5KJs0/BR5I6Yh+8kU0sktANXYPpbwH1SwDvlFDoqfP03SmwdEHkGZggkV4tyYwoor2vrzbynwLdo6qn906ktkcyrknyL6hOSmSVEUIOKcI9Ko93A1PqUxSf8T3/7aDX4O5ew7SjvXTkaLK5NzaPr4H5WMdsom6gnkLvkdqAX+QfyUegWA659sMAAAAASUVORK5CYII=",
        condition: "image"
})

page({
        label: '複製選取範圍連結',
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
/*
page({
        label: 'Google 翻譯(中翻英)',
        oncommand: function(event) {
                                        var _document=document.commandDispatcher.focusedWindow.document;
                                        var p=prompt('請輸入想要翻譯的關鍵字:','');
                                                if(p)_document.location.href='http://translate.google.com/?hl=zh-TW#auto/en/'+encodeURIComponent(p);
			},
        insertBefore: "spell-check-enabled",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC",
})
*/
page({
        label: '飛驢視頻分析',
        oncommand: function() {
				gBrowser.loadURI('http://flvxz.com/?url='+ encodeURIComponent(content.location.href) + '&flag=&format=high');
			},
        insertBefore: "spell-check-enabled",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcklEQVQ4jY2Ra0iTcRTG/+qmW6+XTS1lGtmX7fWdbhqZ2OiilFjCiggrdWh+MFtUoM1GamqkOS8ttRpYkKEgY15mBgVeyxhMM9FUMBJzdNFc6QKxLHz6kF/MF9wD58OB83s4zzmEsChyBz9GHMSVr7UumQmUlhDiwjbLKi9C/HITt9ZXJgdadvpy4h+dD7SqDlM5ThusSXBI4v08LVq4UnLCa7Xpgs9HQgjPGdDjgEIRGxcXF1+Sndo81nIVvfq96MkXQuTjdmpTukKnq/q9sowvtiksfZ3EYIcejvZYdF/3Bb3NY/MYGRlpmT+XFrH8ww6H/RMW5z5g+oEMPQXeCBfxc52J4G0w3G1c/G6H49ssTAat5V25D0yXPH8J3YnMGQNCCOFnq9NvVOVnNJYlUQ2jt/h4dsX9M0WRAGdgqizJ1ThQxPljLeJioNQfw7VyWAp56NS4LRzbRc6xUsHhiqPS1NrW6CzDq9biCIwU8zB+0xOT9Uo87TCh/PETNObJYbnmtro7mBzcsDKjsThklbOI1NsRVT2PWP17HKmeQE6NEeP9zeiyjsHYZsbrPAqZMZyCdTRXEBJBa4cRVjIDWakNSXU2GAcXoLxvQ3TZNPbrJpFQMYoGoxk1yQKryIvQ6ww4QolCcvElpNpRSLVvcfrOCGbn5vFmYgb7CgfBaIbAaIYgUXeBePiLN+TnUkFycXo7QtW9CM3qQry2E4UP+xF1uRuMug+M+gUYdR8kZ80gZIuI7Ya87Ym358VnmkCnmECntiBU1Qpa1QZaZf5XKc0ISdRNEUJcWb/A5QfuEUiUej/pyXts5cscryKeAWH/c38B9b8egwNZncgAAAAASUVORK5CYII=",
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

var resizeTosub = ToolMenu({ insertAfter: "toolbar-context-undoCloseTab", label: "變更視窗尺寸", image: "data:;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMF/8QAIxAAAQQBBAEFAAAAAAAAAAAAAQIDBAURABIhQQYiIzEyof/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEBAQABAwUAAAAAAAAAAAAAARECAANhBCEjQfD/2gAMAwEAAhEDEQA/ANRirmKZj2L0VT0V14JHuDc6d2Ckc5ycHrSi4pamPTSno8UR57CEOKSh9Sy0SrjPOOjqVXZUw8di19jMcjyWHFLBQhe5te9RBBAI+D+6O20hJsJTVbLkPxnyjKlE5eOB9hgZ9WetNeTczncjzEuo2bHT7NJk5B7FFHikfrr/2Q==" });
resizeTosub([
        {
            //id: "86",//此選單ID 可有可無
            label: "800x600  4:3",//此選單名稱
            oncommand: "resizeTo(800,600);",//執行的命令
            //image: "圖片連結或base64圖片編碼",//為此選單添加圖示 喜歡美美的選單就加吧
        },
        {
            label: "1024x768  4:3",
            oncommand: "resizeTo(1024,768);",
        },
        {
            label: "1280x1024  4:3",
            oncommand: "resizeTo(1280,1024);",
        },
        { },
        {
            label: "1280x800  16:10",
            oncommand: "resizeTo(1280,800);",
        },
        {
            label: "1440x900  16:10",
            oncommand: "resizeTo(1440,900);",
        },
        {
            label: "1680x1050  16:10",
            oncommand: "resizeTo(1680,1050);",
        },
       	{ },
        {
            label: "\u8996\u7A97\u5360\u7528\u87A2\u5E55\u5DE6\u534A\u90E8", //視窗占用螢幕左半部
            oncommand: "resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(0, 0));",
        },
        {
            label: "\u8996\u7A97\u5360\u7528\u87A2\u5E55\u53F3\u534A\u90E8",//視窗占用螢幕右半部
            oncommand: "resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(screen.availWidth / 1, 1));", 
        },
]);

//var openMenu = GroupMenu({ label: '打开...', condition: 'noinput noselect nomailto nocanvas nomedia', insertBefore: 'context-sep-navigation' }); openMenu([ { label:"复制文本+链接", text:"%RLT_OR_UT%\n%RLINK_OR_URL%", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==" }, { label:"在隐私窗打开", oncommand: "openLinkIn(addMenu.convertText('%RLINK_OR_URL%'), 'window',{private:true});", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKDSURBVDhPpY/PT5IBGMffWl76ceiS62/wlrc6uLmZM81MZ3noQik4NAWRVwXlVSbKDyEFcgoCyoshIvgCBpgS/siUhbnWDJrKVnaouS5tuTaX3wSxVrfGZ3sO3+/zPN89D5Ex7+dYWDLmIC1TsNnDWfcE1nNpeaS9Z5NeWv5NG4/aPgmorNSfr3s4LpHLmB2VwrdHSdzzkg7XnFw2tddNORL1XCtVWjpyIbVI4FRVlekOIWoxf9OrbTutLVN+Ra/747RrEevRGOKxBCJrb7EQjiL8PAqvZxljRgbdEttuC98alIrpN8Imy1dCKuRtzljb4PFE4A+sYdL5Cl7fOywuJ7C1vYf1jV3Q9ig02gUo+2ZgMc2ANnvAOLzoEo1uEWTTSCjgCYHqdO1z6wyb1dVKe3XNwCdZz1OsvExgdi6G+kYbbpdLP5RXiO13q+TxRsHYvscRAMk3LxKcmpHBee8c+Pwh6/FvBEFR1GkuVxN1Tm2AtkXAYqlepFspamuVTveoDZwHRjnRyeM8spscUPe5v3d1jTvb2x1ikcjWIBQ+DtH0KsasyyBJc0AgsDaQJH3UM3mUPU9+aLqNP0tKNFeIyMR1yNuaj35aQv/AM6jVfgz0B6HRzIJhXqdKqz32FQpfynfRDBo4en/qnN1wGZrvV3iFvNGVCQsDxrWEadcaBnU+hIIRzPtXYTYEwbgjmJ4MY9xgB9nYHyss1Fz+HWAWZyM3l53FZg2ppGLDZ73Scqjo0B1IWofjEnI4rujQHuh6DYedpPZLDUurLi7uvZhaTnISkJZEQYHqUlmJquhmkfJaXh51Jlm3bsivJr38fFl2euwP/wb8NxkH+HU5mQVkBkH8AgvRfy93EDdrAAAAAElFTkSuQmCC" }, { label: "在 IE 中打开", text: "%RLINK_OR_URL%", exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe", }, { label: "在 Chrome 中打开", text: '%RLINK_OR_URL%', exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe", },{label: "在 Opera 中打开",text : "%RLINK_OR_URL%",exec : "D:\\Program Files\\Opera\\opera.exe",},]);

// 添加样式
css('\
')
