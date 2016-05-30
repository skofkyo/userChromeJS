// ==UserScript==
// @name         DM5 Bulk Loader
// @namespace    github.com/zanetu
// @version      0.5
// @description  一次性载入动漫屋的整集漫画
// @include      /^http\:\/\/([^\.\/]+\.)?dm5.com\/m(\d+|anhua\-).*?\//
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==

;(function() {
	//australian ip
	$.ajaxSetup({beforeSend: function(xhr) {xhr.setRequestHeader('X-Forwarded-For', '1.1.1.1')}})
	var $blocked = $('.tsmy.mato5:first')
	//series page
	if(window.DM5_COMIC_MID) {
		//chapters blocked on series page
		$('<div/>').attr({'id': 'tempc', 'class': 'ma5'}).replaceAll($blocked)
		.load('/template-' + DM5_COMIC_MID + '-t2/?language=1')
	}
	//chapter page
	else {
		$('.view_fy:first').insertBefore('.view_bt:first').each(function() {
			this.addEventListener('click', function(e) {
				e.target.href && e.stopPropagation()
			}, true)
		})
		$("#pagelist").unbind('change').change(function() {location.href = $(this).val()})
		//style set to work around http://bugzilla.mozilla.org/show_bug.cgi?id=434230
		var $divContainer = $('<div style="display: table; table-layout: fixed; width: 100%;" />')
		var $container = $('.cp_tbimg').length ?
		 $divContainer.appendTo($('.cp_tbimg:first').empty()) : $divContainer.replaceAll($blocked)
		window.DM5_PAGE = parseInt($('.current').text()) || 1
		loadSequentially(window.DM5_PAGE)
		$('.cp_tbimg, #cp_funtb').css('background-color', 'transparent')
		$('.cp_tbfu, .cp_fun_c2, .cp_tbimg').css('border', 'none')
		$('.view_bt').css('margin-right', 
					  '-' + ($('.cp_tbfu:visible').width() + $('.cp_tbmore').width()) + 'px')
		$('.cp_tbimg').unbind('contextmenu').css('min-width', '')
	}
	
	function loadSequentially(pageCount) {
		$.ajax({
			url: 'chapterfun.ashx', 
			data: {
				cid: window.DM5_CID, 
				page: pageCount, 
				key: $("#dm5_key").val(), 
				language: 1, 
				gtk: 4
			}, 
			success: function(data) {
				eval(data)
				if('undefined' === typeof d || !d[0]) {
					return
				}
				$('<img/>').attr('src', d[0]).css({
					'margin': '25px auto', 
					'display': 'block', 
					'border': '1px solid', 
					'max-width': '99%', 
					'color': '#111'
				}).appendTo($container)
				if(pageCount < window.DM5_IMAGE_COUNT) {
					loadSequentially(pageCount + 1)
				}
				else {
					$container.find('img:last').wrap($('.redzia:eq(1)').clone().empty())
				}
			}
		})
	}
})()
