// ==UserScript==
// @name         Comics Bulk Loader
// @namespace    github.com/zanetu
// @version      0.2
// @description  一次性载入99漫画及类似网站上的整集漫画，支持99770，99comic，99manga，99mh，cococomic，hhcomic，hqmh8，iibq，iieye，jmydm，jmymh等网站
// @include      /^http\:\/\/([^\.\/]+\.)*99(manga|comic|mh)\.com\/[^\/]+\/[^\/]+\//
// @include      /^http\:\/\/([^\.\/]+\.)*(cococomic|jmydm|iibq)\.com\/[^\/]+\/[^\/]+\//
// @include      /^http\:\/\/([^\.\/]+\.)*hhcomic\.(com|net)\/[^\/]+\/.*\.htm/
// @include      /^http\:\/\/([^\.\/]+\.)*jmymh\.(com|net)\/[^\/]+\/[^\/]+\//
// @include      /^http\:\/\/([^\.\/]+\.)*hqmh8\.com\/[^\/]+\/[^\/]+\//
// @include      /^http\:\/\/([^\.\/]+\.)*(99770|iieye)\.cc\/[^\/]+\/[^\/]+\//
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

;(function() {
	//loop variables
	var i, l
	var PROTECTED_EVENTS = ['contextmenu', 'mousedown', 'dragstart', 'keydown', 'load']
	for(i = 0, l = PROTECTED_EVENTS.length; i < l; i++) {
		window.addEventListener(PROTECTED_EVENTS[i], function(event) {
			stopEvent(event)
		}, true)
	}
	window.addEventListener('click', function(event) {
		stopEvent(event)
		if(isLeftClick(event)) {
			var h = event.target['leftClickHandler']
			if('function' === typeof h) {
				h(event)
			}
		}
	}, true)
	//"@run-at document-start" is not fully supported
	if('interactive' == document.readyState || 'complete' == document.readyState) {
		loadAll()
	}
	else {
		window.addEventListener('DOMContentLoaded', function(event) {
			stopEvent(event)
			loadAll()
		}, true)
	}
	
	function stopEvent(e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation()
		}
		else if (e.stopPropagation) {
			e.stopPropagation()
		}
	}
	
	function isLeftClick(event) {
		var button = event.which || event.button
		return 1 === button
	}

	function loadAll() {
		var imageUrls = window.PicListUrl || window.PicLlstUrl || window.PicListsUrl 
		|| window.arrPicListUrl || window.arrPicListUrls || window.arrFiles
		var serverArray = window.ServerList || window.arrDS
		var serverIndex
		//for 99manga.com
		if (typeof server === 'string') {
			serverIndex = parseInt(server) - 1 + ''
		}
		else if(typeof sPath === 'string') {
			//for 99comic.com
			if(typeof cuD === 'string') {
				serverIndex = parseInt(cuD) - 1 + ''
			}
			//for jmydm.com
			else {
				serverIndex = cuD + ''
			}
		}
		//eligible page
		if (imageUrls && serverArray && serverIndex) {
			var imageArray
			//string
			if(imageUrls.split) {
				imageArray = imageUrls.split('|')
			}
			//array
			else {
				imageArray = imageUrls
			}
			var urlPrefix = serverArray[serverIndex]
			var hostPrefix = urlPrefix.split('|')[1]
			//for jmydm.com
			if(hostPrefix) {
				urlPrefix = hostPrefix + window.sPath
			}
			for (i = 0, l = imageArray.length; i < l; i++) {
				imageArray[i] = urlPrefix + imageArray[i]
			}
			var imageDiv = document.createElement('div'), imageImg
			imageDiv.style.textAlign = 'center'
			for(i = 0, l = imageArray.length; i < l; i++) {
				imageImg = document.createElement('img')
				imageImg.style.maxWidth = '99%'
				imageImg.style.margin = '25px auto'
				imageImg.style.border = '1px solid'
				imageImg.style.display = 'block'
				imageImg.src = imageArray[i]
				imageDiv.appendChild(imageImg)
			}
			//for hqmh8.com, iibq.com, iieye.cc, jmydm.com and jmymh.com
			var prevNext = document.getElementById('hdID')
			if(prevNext) {
				prevNext = prevNext.cloneNode(true)
				var series = document.getElementById('hdInfoID')
				if(series) {
					series = series.cloneNode(true)
				}
			}
			document.body.innerHTML = ''
			document.body.style.backgroundColor = 'white'
			document.body.style.backgroundImage = 'none'
			if(prevNext) {
				document.body.appendChild(prevNext)
				if(series) {
					document.body.appendChild(series)
				}
				//for jmydm.com
				if(typeof viewNextVol === 'function') {
					imageDiv.firstChild['leftClickHandler'] = function(event) {viewNextVol(1)}
					imageDiv.firstChild.style.cursor = 'pointer'
					imageDiv.lastChild['leftClickHandler'] = function(event) {viewNextVol(2)}
					imageDiv.lastChild.style.cursor = 'pointer'
				}
				//for hqmh8.com, iibq.com, iieye.cc and jmymh.com
				else if(typeof pageChangeVol === 'function') {
					imageDiv.firstChild['leftClickHandler'] = function(event) {pageChangeVol('P')}
					imageDiv.firstChild.style.cursor = 'pointer'
					imageDiv.lastChild['leftClickHandler'] = function(event) {pageChangeVol('N')}
					imageDiv.lastChild.style.cursor = 'pointer'
				}
			}
			document.body.appendChild(imageDiv)
		}
	}
})()