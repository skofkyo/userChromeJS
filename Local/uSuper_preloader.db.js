
/////////////////////設置(請注意開關的縮進關係..子開關一般在父開關為true的時候才會生效.)//////////////////////
var prefs={
	floatWindow:true																	,//顯示懸浮窗
			FW_position:2																	,//1:出現在左上角;2:出現在右上角;3：出現在右下角;4：出現在左下角;
			FW_offset:[10,10]															,//偏離版邊的垂直和水平方向的數值..(單位:像素)
			FW_RAS:true																		,//點擊懸浮窗上的保存按鈕..立即刷新頁面;
	pauseA:false																				,//快速停止自動翻頁(當前模式為翻頁模式的時候生效.);
			Pbutton:[2,0,0]																,//需要按住的鍵.....0: 不按住任何鍵;1: shift鍵;2: ctrl鍵; 3: alt鍵;(同時按3個鍵.就填 1 2 3)(一個都不按.就填 0 0 0)
			mouseA:true																		,//按住鼠標左鍵..否則.雙擊;
					Atimeout:200															,//按住左鍵時..延時.多少生效..(單位:毫秒);
			stop_ipage:true																,//如果在連續翻頁過程中暫停.重新啟用後.不在繼續..連續翻頁..
	Aplus:true																				,//自動翻頁模式的時候..提前預讀好一頁..就是翻完第1頁,立馬預讀第2頁,翻完第2頁,立馬預讀第3頁..(大幅加快翻頁快感-_-!!)(建議開啟)..
	sepP:true																					,//翻頁模式下.分隔符.在使用上滾一頁或下滾一頁的時候是否保持相對位置..
	sepT:true																					,//翻頁模式下.分隔符.在使用上滾一頁或下滾一頁的時候使用動畫過渡..
			s_method:3																		,//動畫方式 0-10 一種11種動畫效果..自己試試吧
			s_ease:2																			,//淡入淡出效果 0：淡入 1：淡出 2：淡入淡出
			s_FPS:60																			,//幀速.(單位:幀/秒)
			s_duration:333																,//動畫持續時長.(單位:毫秒);
	// uSuper_preloader 已棄用 debug 參數
    debug: false,  //debug,firefox打開firebug切換到錯誤控制台,chrome打開自帶調試工具,opera打開dragonfly切換到命令行.
	someValue:''						,//顯示在翻頁導航最右邊的一個小句子..-_-!!..Powered by Super_preloader隱藏了
	DisableI:true																			,//只在頂層窗口加載JS..提升性能..如果開啟了這項,那麼DIExclude數組有效,裡面的網頁即使不在頂層窗口也會加載....
	arrowKeyPage:true																	,//允許使用 左右方向鍵 翻頁..
	updateSet:[true,7,false]													,//(不支持chrome)3項分別為:使用自動更新提醒,檢查間隔(天),給firefoxGM註冊右鍵
	sepStartN:1																				,//翻頁導航上的,從幾開始計數.(貌似有人在意這個,所以弄個開關出來,反正簡單.-_-!!)
};

//分頁導航的6個圖標:
var sep_icons = {
    top: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjM3NkQ2MTFFOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjM3NkQ2MTFGOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzc2RDYxMUM5NTI2MTFERkE2REY4  RUZDQkM2QzRENTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc2RDYxMUQ5NTI2MTFERkE2  REY4RUZDQkM2QzRENTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz7bso/VAAACxElEQVR42rSUS0iUURTH//d+j9EppSRtCjEi  w0EhjR6kIyUpWilFpbUTei1auMoellAQZFSbVrkQilplhZC9IKyNQg8CXVQKZigaOgojNdg3j++7  nTtjAzPqTI50Zu7ce+ec87vnnPtgQghIcZ3VxiGwGksRhomemwGHHKqRPwl6+ujFJXHvPLwWCUyN  VT7qvZ4UtK7oQtQ8CizLUlt4fr4U6ctmExPyZ478LelcMMNIa3vL2nkrR7KnvEaR/auuZ2akeHMt  f0SGsSvFSuk5rWOzs2RvXm6+zRJBDAx+8fUNfHjZfSNwMJ4fj6ekk9KU49hYuaXAZfs4/BzvhztR  6Nxmy85aXyl1SYFdjVrViuWrmqtLj9h7R18jKPwImD6CP0V5cY09fdnKZmmzKDA55Kqqrb2u4oR9  yNOHXz4PVEWDbtPhNSfR7+lGze46u6bp7dL2n8BkmMY4umrLj6XNCA8mfn4PQ3UdNgJzGzA28xnT  1giqdh4I2UqfuGAyYGTYUbH90JrMDAcbmuqFwlWCaiGoxQwomoCmc3z1vEV6RgrbUVTmkD7Sd+GI  GVo25Ra7tjp3af3ud1C5Dk3VQ9FazI+gYkAlqKqzUP/J3Yn8vAI9N8dZIn2jUJG3olE7nJ214cGp  /U2pMnVTmLCsIN4M3UMAXrj9g1B0AUXloAixb90Z0gtYpoBh+PD4xf2ZqemJ+p5bgSdRF4SMG0bd  31Ivt50MzxUYV463pchF3L/HaE5QjVNj4JzuocJw++5Vw/SLlFmEXTKojwbTgS+LqbfgZGmKAAzL  S+Xg4ARTCc5VFhpLKEXIFn1B5E5OG+PUy4wkDCGorDHj8R+lBGAGI+iN2t3QIowlfO3ig+kjb1v4  9aI2u1lBv0Xj+GA1nlKel+q8BnANdBrCdZVNBiwXSRY8eam1PjNBxlMLZpvo2UxWOP6T/BFgAOBe  8h+hfm64AAAAAElFTkSuQmCC',
    bottom: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg2RjU3NUQzOTUyNjExREY4M0U4RDZGQThBMjcwMEIzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg2RjU3NUQ0OTUyNjExREY4M0U4RDZGQThBMjcwMEIzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZGNTc1RDE5NTI2MTFERjgzRThE  NkZBOEEyNzAwQjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZGNTc1RDI5NTI2MTFERjgz  RThENkZBOEEyNzAwQjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bp+ZPAAAC0UlEQVR42rRVXUhUQRT+5t67uzdZwwX/0FKS  CCMiwcwi6QfpwcAgKHvzpR6EoKeQpIcIJCOCIB8SooIgKK2gssBwQ0PXsB8s8KdSIhFzXbHS2vbe  ufdOM3fd1mx3zRUPezgzzDnfnP3mm7mEMYaVMAkrZEq8hZ0nHQEe0hepD3RfpJlLAhagtcfPgBBA  sGWZzHbT4JEC2e4NON1UnbHkjoURiaDdf8kGpCELOncaMkF0FceKG5PnmPBVxSlBkom9iehemEN2  gYEt7/CEasLCiQKpihuLqSkhMLMAQ+ecCl5NMQ9vkqZm82glVkVZrSMy7uC5uyMT2UlCnFvV0CxY  Fps7PN6t5IZMHLB4MpER4uph86jr5GFP1wUKZd7GjelpWSWH9lenqKpL8KoyDmbolt25afBoEnic  uTBMand89uh1VeboYn71YcOvscmRxliquDf13V/i9T06sWtH+aqu8VuwJO2P3ITMUuUMPiagBoX3  w02oDje2rq3AE9/t0Fhg5LLAiM0xQ93w6JBv4H2/XpxZaXcrOBZRMVVIzAld1zmwDsPSUZi5Ha+G  Oum74Z5uUZvo8MQ/PPiir2NiZjrENnr2gnJQkxIOqkLTdA5MYVoGCtKLEJieYO2997+Imr9kE0cV  szyxvO35g9k0KQ+5KZtgaZgD1W0+s1avQwrx4K73hp0rav6VmxB9xKM2TKle1fqsJVjoKYObc6tr  YdBUlwcFni1oab8WNAytSuRGb1QUJ5GO22Z+fq339rQGS/MP2LdNIU4UrdmHx13NwW8/pupFTlJv  BbeGsclP294OvawoXV/pkoiC1/3d2ujEx6di7X+fzc/ccxaoREiN9A32Ijsn/Dq+GfCJmkruNAbe  OPf8MHD0LPNqqurivEbiFyav5shmOd7709TckBeTCsJvQ0vf+aS+GIeLTiXmeGFC8p+mqMz8V+6c  y1oWGoE/MvwtwABuklC1izbNcAAAAABJRU5ErkJggg==',
    pre: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkUzRDUyNEQ5OTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkUzRDUyNERBOTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTNENTI0RDc5MEUyMTFERkIyM0VG  NDM2QzAyN0U1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTNENTI0RDg5MEUyMTFERkIy  M0VGNDM2QzAyN0U1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6I8cyJAAAC20lEQVR42tRVW0hUURTd+5xz550PVMwcUksJ  JY2wrMHpoxQzQrFRxF5iGn1EERGEZCBI9OFPUR9ZkNRX0a9fkeBPEhFBP1mDFj0xdVTSqXnce8/p  3Gtjvh+IH53LZu6Bc9dZe+2196AQAtZjEVinxWIv3stsqXM3ATG+16E1iVbBVwUsOC525pI7dfNp  gRApDnxulvvrq5KCoFgoKhLjktsOeWud5d7qhHhX0lnPBaVqVcA6J3Njp9224ZGvtMHhD7yE/vFe  UlN+PM0V52jPr6WFKwbmTJ0ZbsZYt6+k0RkIfYLByX74HvTDYLSP1FQe25KYpTzYtJel25LQ1A+T  ERcFtgenw8U47anaX5+AFh0+BN6AwizAKAX/2HPQ7OPEV+HLzSyGu1YH2JOyFSICQmi6RhYEThkx  g6oO1lXuqctIS0kn74deACOKGZwIQCn62/GnkJaZggdLDpdlVyo3RgdU0yU4x7nTu8EsasQdT36Z  Jz9nt9L3oxcoMqASFOQvF5p0HKDOBbwaeUJ2FBTQosI9ddtPWq4Z30vGuCCwEORiXkbRiZJdR6zv  JFMBXILSKXAkQlWjgmuyFrqA4K/f0PO1E0u9B5w52zaecleQRkZm9wHGWvpoe17oTFWLjVKZtkTQ  JcNu/0NQ9bAIa5M4HBkAq5MKi41gdW6L5A1E6MgnJkbVjse3hz6+Dp379ox3zWuQL8P9tqv3GqbS  YBhua+qUEER6maIajchUZQZRQwyZi4bYeqs59DMobPKI1UrRHZcB5+Wn84FN/WPW04RsNDSl0KSn  VflwWSNNFo8LRF0Thoa2gfucLNvScxdKKkalDdbGnbLluRrhhArCNVUnBNcw3fCv7xVqMc8a40eL  cIxGVHkhrn1s2hWXwdkQybAP6sYNywAvOSv3ba2VM0OTOqswGR4DlUdiXjL4rxB4NvehKx31qf+2  YmZtwXQo4siSMv53f03rBvxHgAEAqLoqsgGSMo4AAAAASUVORK5CYII=',
    next: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkY3M0ZDRTgzOTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkY3M0ZDRTg0OTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjczRkNFODE5MEUyMTFERkI2OUVB  RjVBQjI2NDU3MTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjczRkNFODI5MEUyMTFERkI2  OUVBRjVBQjI2NDU3MTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Q0swTAAAC50lEQVR42tRVXUhUQRQ+M/dnd0sN/1gtAimW  LXsoiAixFyGIHnqNioioh36ghyh6sCAijAgiIoLowSRMBG1b1n5s0XxRtiyRlIpQ1M1sKxV1XffH  e2emM+u6qG11EXzoXM6de2fOfPeb8x3OJUIIWAmjsEKmzj+UndeWrv0kAgoJWTglT0cW0vqB96L5  144bxu/Ac5sWWeHpQxfT0xq1QbY9D1SqgUJVHHWovHfE+U/GU5Mc1uQoi1cFgYbua8mPErxK8reC  Q8sGm+qACtdh6zmejnLEEGlXCC4TTAiGSeiYEVm+eGMRDhxBpes2DVQbFWQuihtsdu4gFiopY1WM  T0tgEKqmCFUnVEuCCypTwgWXdwTnloH96CylIsdtcUUloNspqDpFdAoaXhKQcYZBAqhK4ql4sVT9  tHjhINzZsN3uPnngjDMnJ18jinAQEFy3KXIQzBBE023ImOEbJ5L51eM1dooVwpgB971V8YyMgy/M  5wMfYlcantaNJ8yI8H+7LXzDVRSrSlAFiKJRITVk3ERQA9r6auF10AfRRBjqW+7Ghsf6KzMCm9yU  Q3Xf5+8PWtpfzVSsPyayVq8CioSRFGiaTpAruplMBc7CZmcZtL57kvgY7KzFvbcyAquKKoLeJPil  zq439e97etiOwv1coURWnqAE0ZOgBkjw0qJy6O17awR6/YHiQXZq7ZCRWTyptOpUIBQQtN9nnH3Z  +swfGhoVW3L3yBQTygmeykj6JmQaGh3hzYH6oBY196VE/2NV8FQj4IkoxIY64ISnyfNJjeVyd94u  MBkDw5yFjQXbQMwq4G17OGlSVoHxESt1LBaMIxODxtFGX91AsV7K12W5oTjbBQWOEvC0Vs+Yprkb  Y74ut212RcLRC43Nj0Ku3HLuLtgJnpaaaCw+fRDXui21zb+YdyoyXtrc/vgcdg3bRHjsMurZZLkf  L7XQXgahdOrhevnoFxeWxxTKcNNKEyL/3a9pxYB/CTAALMFZuEnI1jsAAAAASUVORK5CYII=',
    next_gray: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg1RDA5RjFGOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg1RDA5RjIwOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODVEMDlGMUQ5NTIyMTFERkIyQzhB  RkQ4RjhDODYwNEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODVEMDlGMUU5NTIyMTFERkIy  QzhBRkQ4RjhDODYwNEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz62tt8rAAACiUlEQVR42tRVS6tSURTe5/hWFAderhoIKqmI  U2eCBg2a9AOaBQ4iZxE0yCCcNYkGDYWaNEh8ICQpoYg4CJQIFA0chKGpBb7A9+Oc1jp4LnK12+GC  gxYs1j7stb79rcfeh2JZlpxCaHIiEfMLj8dzee836NlVwRRF/QKj57+LxeIh8BE5CwQChC+VRCIh  arWaiEQiTsViMQkGg+f/ZDyfz4lcLj9wiEajF2uz2UwUCgWRyWTE5/MJr/FqteIY8gqporI7SxaL  xfWbt1wuL4ClUimWgAMGYdbrNecjZJKOTgWCYzzUkYV60mh53/2MhAJ/At1iLLIDXWCTsGkATGGz  aJomDMOQ7XbLAcP+YufP62HzRqPRa5PJZPf7/edarVYC6SvwAADGOrAARmHTABgwWQqBQ6GQHA/f  bDYkHA4vjjJuNBofO51OKB6P96FJbDabZVOpFA2BLDBFxlhr7gBknM/nSalUIrPZjEQikXm73X56  FBhPBXnTbDbfFgqFqdfrZVUqFZc+KjIHthRfCmyow+EguVxuWavV3kHsq6PAyKher+PyWblcfl+p  VLZut5tBUMwdU0ZQJIDW6XSSarW6/gwyGAwe9vv94xcEa6bRaIhSqaRhrB4B0A24aXdcLhcFKXM1  RVA8AJn2ej0mnU7/gNm/u2v6X6cCJ4Hazeu81Wo9SCaT3yATxm63c+njHFssFo4x7I3A9xboRMgc  s3v2J6R3PxaLfdfr9YzRaCQGg4HodDqSSCSmwP42+LSv+2x+mUwmTwCoa7PZGFAEnU2n03uw91XQ  s3mFJMfjsTOTyTyGtWw4HD4H+0Hwe3xZrFbr/ueLbrd7Exo4hvVLIY8Q9d/9mk4G/EeAAQCBEkva  rHrRPgAAAABJRU5ErkJggg==',
    pre_gray: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjc0MTI5MDY4OTUyMjExREZCODVDREYyM0U0QjMzQkQzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjc0MTI5MDY5OTUyMjExREZCODVDREYyM0U0QjMzQkQzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzQxMjkwNjY5NTIyMTFERkI4NUNE  RjIzRTRCMzNCRDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzQxMjkwNjc5NTIyMTFERkI4  NUNERjIzRTRCMzNCRDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz5D2F5XAAACZklEQVR42tSVz6sSURTH7x0VJxX8CampSQtF  /AESConiQkhdlKKCLdr0YxW0iDaBSBLZok3tol27/oC3TcS14EpEBV24UOO5EETLn9M5g4KoPXu9  XHTgMNc7537me7/3zEg5jiOnCIacKISbQSAQuKjuI6VULhAInhSLxdWlFKMlv8mXer3+qU6nu79c  Ll/9KyvuKZXKN9FoVBqJRBRyufyZz+eLXxXslkqlXxOJhKTZbBJIBsY6mUz23uFw3P5bsEEoFH4D  kHQwGJBer0e63S7p9/tMKpW6pVarv5hMphsSiYRi8eZ6EDybzTYpg5/FeDyuYBiGtNttIhKJCBwc  aTQaZLFYMHDPZjQaP8P8NY1Gw0wmEw7nD4LH4zGmQCwWn4GnN7VaLVOv13kgqCfQFZhctVolcJg0  HA7ftdlsH2BHfJfg/YNglUqF+ekOhNPpFNVqNYKKEYpX6AhcTFerFSmXy4zL5RJ4PJ4Hbrf7La4H  xfQgGNa8sNvtD0OhkBiVYquhWoRCcvP5nEMoJu6uVCrRYDAoNZvNj6xW62MUcPAFMRgM79LpNIsF  Xq+XBxQKBYQjlIIifgzKaSwWw+0z8HCaTCbVw+HwtcViOW+1Wmd74E6nw2azWX4MgJ+5XI5F30At  nU6n/IM220VgPp//AfNYI4Yag0KheA639sHoxmYAqjiEohXo7RrKHx5CcQ6CrVQqzNFvxW6su2D7  tFfrllrtttalX+kNFPt47SlBv7Hfd9vrjxVvB8uyZOu7jX5cDez3+3mPMUejEard281R8E7h90wm  c/3IRs4vtPG/+2s6GfiXAAMAq3cXTADTBMIAAAAASUVORK5CYII='
};

//懸浮窗的狀態顏色.
var FWKG_color = {
    loading: '#8B00E8', //讀取中狀態
    prefetcher: '#5564AF', //預讀狀態
    autopager: '#038B00', //翻頁狀態
    Apause: '#B7B700', //翻頁狀態(暫停).
    Astop: '#A00000', //翻頁狀態(停止)(翻頁完成,或者被異常停止.)(無法再開啟)
    dot: '#00FF05', //讀取完後,會顯示一個小點,那麼小點的顏色.
};

//黑名單,在此網頁上禁止加載..3個項.分別是:名字,啟用,網站正則..
var blackList = [
    // ['中關村首頁',false, /^http:\/\/www\.zol\.com\.cn\/(?:#.*)?$/i],
    ['Gmail', true, /mail\.google\.com/i],
    ['Google reader', true, /google\.com\/reader\//i],
    ['優酷視頻播放頁面', true, /http:\/\/v\.youku\.com\//i],
];

//在以下網站上允許在非頂層窗口上加載JS..比如貓撲之類的框架集網頁.
var DIExclude = [
    ['貓撲帖子', true, /http:\/\/dzh\.mop\.com\/[a-z]{3,6}\/\d{8}\/.*\.shtml$/i],
];

//////////////////////////---------------規則-------////////////////
//翻頁所要的站點信息.
//高級規則的一些默認設置..如果你不知道是什麼..請務必不要修改(刪除)它.此修改會影響到所有高級規則...
var SITEINFO_D = {
    enable: true, //啟用
    useiframe: false, //(預讀)是否使用iframe..
    viewcontent: false, //查看預讀的內容,顯示在頁面的最下方.
    autopager: {
        enable: true, //啟用自動翻頁...
        manualA: false, //手動翻頁.
        useiframe: false, //(翻頁)是否使用iframe..
        iloaded: false, //是否在iframe完全load後操作..否則在DOM完成後操作
        itimeout: 0, //延時多少毫秒後,在操作..
        remain: 1, //剩餘頁面的高度..是顯示高度的 remain 倍開始翻頁..
        maxpage: 999, //最多翻多少頁..
        ipages: [false, 2], //立即翻頁,第一項是控制是否在js加載的時候立即翻第二項(必須小於maxpage)的頁數,比如[true,3].就是說JS加載後.立即翻3頁.
        separator: true //顯示翻頁導航..(推薦顯示.)
    }
};

//高優先級規則,第一個是教程.
var SITEINFO = [{
        name: 'Google搜索', //站點名字...(可選)
        url: '^https?://(www|encrypted)\\.google\\..{2,9}/(webhp|search|#|$|\\?)', // 站點正則...(~~必須~~)
        //url:'wildc;http://www.google.com.hk/search*',
        siteExample: 'http://www.google.com', //站點實例...(可選)
        enable: true, //啟用.(總開關)(可選)
        useiframe: true, //是否用iframe預讀...(可選)
        viewcontent: false,
        // 新增的
        timer: 1500,
        hashchange: true,

        nextLink: 'id("pnnext") | id("navbar navcnt nav")//td[span]/following-sibling::td[1]/a | id("nn")/parent::a', //查看預讀的內容,顯示在頁面的最下方.(可選)
        // nextLink:'auto;',
        //nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',              //下一頁鏈接 xpath 或者 CSS選擇器 或者 函數返回值(此函數必須使用第一個傳入的參數作為document對象) (~~必選~~)
        //nextLink:'css;table#nav>tbody>tr>td.b:last-child>a',
        //nextLink:function(D,W){return D.evaluate('//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',D,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;},
        // 新增 Array 的格式，依次查找

        // preLink:'auto;',
        preLink: '//a[@id="pnprev"]',
        //preLink:'//table[@id="nav"]/descendant::a[1][parent::td[@class="b"]]',            //上一頁鏈接 xpath 或者 CSS選擇器 或者 函數返回值 (可選)
        autopager: {
            enable: true, //啟用(自動翻頁)(可選)
            useiframe: true, //是否使用iframe翻頁(可選)
            iloaded: false, //是否在iframe完全load之後操作..否則在DOM完成後操作.
            itimeout: 0, //延時多少毫秒後,在操作..
            newIframe: false, // 下一頁使用新的 iframe，能解決按鈕無法點擊的問題
            pageElement: '//div[@id="ires"]', //主體內容 xpath 或 CSS選擇器 或函數返回值(~~必須~~)
            // pageElement:'css;div#ires',
            //pageElement:function(doc,win){return doc.getElementById('ires')},
            //filter:'//li[@class="g"]',                                                                        //(此項功能未完成)xpath 或 CSS選擇器從匹配到的節點裡面過濾掉符合的節點.
            remain: 1 / 3, //剩余頁面的高度..是顯示高度的 remain 倍開始翻頁(可選)
            relatedObj: ['css;div#navcnt', 'bottom'], //以這個元素當做最底的元素,計算頁面總高度的計算.(可選)
            replaceE: '//div[@id="navcnt"]', //需要替換的部分 xpat h或 CSS選擇器 一般是頁面的本來的翻頁導航(可選);
            //replaceE:'css;div#navcnt',
            ipages: [false, 3], //立即翻頁,第一項是控制是否在js加載的時候立即翻第二項(必須小於maxpage)的頁數,比如[true,3].就是說JS加載後.立即翻3頁.(可選)
            separator: true, //是否顯示翻頁導航(可選)
            separatorReal: true,
            maxpage: 66, //最多翻頁數量(可選)
            manualA: false, //是否使用手動翻頁.
            HT_insert: ['//div[@id="res"]', 2], //插入方式此項為一個數組: [節點xpath或CSS選擇器,插入方式(1：插入到給定節點之前;2：附加到給定節點的裡面;)](可選);
            //HT_insert:['css;div#res',2],
            stylish: '', // 新增的自定義樣式 
            lazyImgSrc: 'imgsrc',
            documentFilter: function(doc) {
                var x = doc.evaluate('//script/text()[contains(self::text(), "data:image/")]', doc, null, 9, null).singleNodeValue;
                if (x) {
                    new Function('document', x.nodeValue)(doc);
                }
            },
            startFilter: function(win, doc) { // 只作用一次
                // 移除 Google 重定向
                if (unsafeWindow.rwt) {
                    Object.defineProperty(unsafeWindow, 'rwt', {
                        value: function() {
                            return '';
                        },
                    });
                } else { // Chrome 原生的情況
                    var removeLinkRedirect = function() {
                        var links = doc.querySelectorAll('a[onmousedown^="return rwt"]');
                        for (var i = links.length - 1; i >= 0; i--) {
                            links[i].removeAttribute("onmousedown");
                        }
                    };

                    removeLinkRedirect();
                    doc.addEventListener("Super_preloaderPageLoaded", removeLinkRedirect, false);
                }
            }
        }
    }, {
        siteName: '百度搜索',
        //url:/^https?:\/\/www\.baidu\.com\/(?:s|baidu|#wd=)/i,
        url: /https?:\/\/www\.baidu\.com\//i,
        siteExample: 'http://www.baidu.com',
        enable: true,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div#container',
            remain: 1 / 3,
            filter: 'css; #page',
            HT_insert: ['//div[@id="search"]', 1],
        }
    }, {
        name: '360搜索',
        url: "http://www\\.so\\.com/s",
        nextLink: '//div[@id="page"]/a[text()="下一頁>"]',
        autopager: {
            pageElement: '//div[@id="container"]',
        }
    }, {
        name: '搜狗搜索',
        url: /^https?:\/\/www\.sogou\.com\/(?:web|sogou)/i,
        siteExample: 'http://www.sogou.com',
        enable: true,
        nextLink: '//div[@id="pagebar_container"]/a[text()="下一頁>"]',
        autopager: {
            pageElement: '//div[@class="results"]',
            replaceE: 'id("pagebar_container")'
        }
    }, {
        name: 'Bing網頁搜索',
        url: /bing\.com\/search\?q=/i,
        siteExample: 'bing.com/search?q=',
        nextLink: '//div[@id="results_container"]/descendant::a[last()][@class="sb_pagN"]',
        autopager: {
            pageElement: '//div[@id="results"]',
            replaceE: '//div[@id="results_container"]/div[@class="sb_pag"]'
        }
    }, {
        name: '有道網頁搜索',
        url: /http:\/\/www\.youdao\.com\/search\?/i,
        siteExample: 'http://www.youdao.com/search?',
        nextLink: '//div[@class="c-pages"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//ol[@id="results"]',
            replaceE: 'id("resc")/div[@class="c-pages"]'
        }
    }, {
        name: 'SoSo網頁搜索',
        url: /http:\/\/www\.soso\.com\/q/i,
        siteExample: 'http://www.soso.com/q',
        nextLink: '//div[@class="pg"]/descendant::a[last()][@class="next"]',
        autopager: {
            // useiframe:true,
            pageElement: '//div[@id="result"]/ol/li',
            replaceE: 'id("pager")'
        }
    },

    // ========================= 知識、閱讀 ================================================
    {
        name: '豆瓣-書影音評論',
        url: '^http://.*\\.douban\\.com/subject',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[contains(text(),"後頁>")]',
        autopager: {
            pageElement: '//ul[contains(@class,"topic-reply")] | //div[@id="comments" or @class="post-comments"]'
        }
    }, {
        name: '我的小組話題 - 豆瓣',
        url: /^http:\/\/www\.douban\.com\/group\//i,
        exampleUrl: 'http://www.douban.com/group/',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[text()="後頁>"]',
        autopager: {
            pageElement: 'id("content")/div/div[@class="article"]',
        }
    }, {
        name: '豆瓣全站',
        url: '^http://.*\\.douban\\.com/.*',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[contains(text(),"後頁>")]',
        autopager: {
            pageElement: 'id("miniblog") | //*[@class="photolst clearfix" or @class="photolst clearbox" or @class="event-photo-list" or @class="poster-col4 clearfix"] | \
                //div[@id="comment-section"] | //table[@class="olt" or @class="list-b"]/tbody | //div[contains(@class,"clearfix")]/div[@class="article"]'
        }
    }, {
        name: '知乎',
        url: /^http:\/\/www\.zhihu\.com\/collection/i,
        exampleUrl: 'http://www.zhihu.com/collection/19561986',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("zh-list-answer-wrap")/div[@class="zm-item"]',
            useiframe: true,
            newIframe: true
        }
    }, {
        name: '譯言網',
        url: '^http://article\\.yeeyan\\.org/.*$',
        nextLink: '//ul[contains(concat(" ",normalize-space(@class)," "), " y_page") ]/li/a[text()="下一頁"]',
        pageElement: '//div[contains(concat(" ",normalize-space(@class)," "), "content_box")]',
    }, {
        name: '主題站 | 果殼網 ',
        url: '^http://www\\.guokr\\.com/(?:site|group|ask|event)/',
        nextLink: '//ul[@class="gpages"]/li/a[contains(.,"下一頁")]',
        pageElement: '//div[@class="article-list"] | //ul[@class="titles"] | //ul[@class="ask-list"] | //ul[@class="event_list gclear"]',
    }, {
        name: '大眾點評網',
        url: '^http://www\\.dianping\\.com/.*',
        nextLink: '//a[@class="NextPage" and @title="下一頁" and (text()="下一頁")]',
        pageElement: '//div[@id="searchList"]',
    }, {
        name: '我們一起成長 | 幸福進化俱樂部共同成長博客圈',
        url: /^http:\/\/upwith\.me\//i,
        exampleUrl: 'http://upwith.me/',
        nextLink: '//div[@class="pagination"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="content"]',
        }
    },

    // ========================= shopping、生活 ================================================
    {
        name: "淘寶",
        url: /^http:\/\/(?!bbs).*\.taobao\.com\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="tb-content"] | //div[@id="J_ShopSearchResult"]/div/div[contains(@class, "shop-hesper-bd")]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    }, {
        name: '天貓 - 搜索',
        url: '^http://list\\.tmall\\.com/search_product\\.htm\\?',
        nextLink: '//a[@class="ui-page-next" and (text()="下一頁>>")]',
        autopager: {
            pageElement: '//div[@id="J_ItemList"]',
            relatedObj: true,
            replaceE: '//div[@class="ui-page-wrap"]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        },
    }, {
        name: '店內搜索頁-淘寶網',
        url: /^http:\/\/[^.]+\.taobao\.com\/search\.htm\?/i,
        exampleUrl: 'http://jiaqibaihou.taobao.com/search.htm?spm=a1z10.3.w4002-1381691988.18.GgWBry&mid=w-1381691988-0&search=y&keyword=%BC%AA%C1%D0&pageNo=1',
        nextLink: '//a[(text()="下一頁")][not(@class="disable")]',
        autopager: {
            pageElement: '//div[@id="J_ShopSearchResult"]/div/div[contains(@class, "shop-hesper-bd")]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    }, {
        name: '淘寶論壇 ',
        url: /^http:\/\/bbs\.taobao\.com\//i,
        exampleUrl: 'http://bbs.taobao.com/catalog/thread/647133-264959947.htm?spm=0.0.0.0.Ji1u2u',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("detail")/div[@class="bbd"] | //div[@class="main-wrap"]//div[@class="bd"]/table[@class="posts"]',
            replaceE: '//div[@class="pagination"]'
        }
    }, {
        name: '前程無憂 - 搜索',
        url: /^http:\/\/search\.51job\.com\/jobsearch\/search_result/i,
        nextLink: '//table[@class="searchPageNav"]//td[@class="currPage"]/following-sibling::td[1]/a',
        autopager: {
            pageElement: 'id("resultList")',
        }
    }, {
        name: '搶了個便宜 | 高性價比正品低價商品推薦網',
        url: /^http:\/\/www\.qlgpy\.com\//i,
        nextLink: '//div[@class="wpagenavi"]/a[text()="下頁"]',
        autopager: {
            pageElement: 'id("wrapmain")//ul[starts-with(@id, "post-")]',
        }
    }, {
        name: '殺價幫3C導購網—真實 客觀 獨立 自由',
        url: /^http:\/\/www\.shajia\.cn\/article/i,
        exampleUrl: 'http://www.shajia.cn/article_list.php',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("agreement")',
        }
    },

    // ========================= baidu 其它 ================================================
    /*
    {
        name: '百度貼吧列表',
        url: /^http:\/\/tieba\.baidu\.(cn|com)\/f/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.skin_normal',
            //replaceE: 'css;.thread_list_bottom.clearfix',
            useiframe: true,
            newIframe: true
                // filter: function(pages) {
                //     // 修復圖片點擊放大、播放音樂等
                //     var doc = unsafeWindow.document;
                //     var wrapper = function () {
                //         var render= frs.ThreadList.render.toString()
                //             .replace('$("ul")', '$("#content_leftList > ul:last")');
                //         eval("render=" + render);
                //         render.apply(frs.ThreadList);
                //      };
                //      var script = doc.createElement('script');
                //      script.textContent = '('+ wrapper +')();';
                //      doc.body.appendChild(script);
                //      doc.body.removeChild(script);
                // }
        }
    }, {
        name: '百度貼吧帖子',
        url: /^http:\/\/tieba\.baidu\.com\/p/i,
        siteExample: 'http://tieba.baidu.com/p/918674650',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.skin_normal',
            //replaceE: "css;.l_posts_num > .l_pager",
            useiframe: true,
            newIframe: true,
            // filter: function(pages){
            //     var pb = unsafeWindow.pb;
            //     pb.ForumListV3.initial();
            // }
        }
    },*/ {
        name: '百度吧內搜索',
        url: /^http:\/\/tieba\.baidu\.com\/f\/search/i,
        siteExample: 'http://tieba.baidu.com/f/search/',
        nextLink: 'auto;',
        pageElement: 'css;.s_post'
    }, {
        name: '百度新聞搜索',
        url: '^http://news\\.baidu\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/ns',
        nextLink: 'id("page")/a[text()="下一頁>"]',
        pageElement: 'id("content_left")',
    }, {
        name: '百度知道',
        url: /^https?:\/\/zhidao\.baidu\.com\/search\?/i,
        siteExample: 'http://zhidao.baidu.com/search?pn=0&&rn=10&word=%BD%AD%C4%CFstyle',
        nextLink: 'auto;',
        pageElement: 'css;#wgt-list',
    }, {
        name: '百度空間',
        url: '^http://hi\\.baidu\\.com',
        nextLink: 'id("pagerBar")/div/a[@class="next"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="mod-realcontent mod-cs-contentblock"]',
        },
        exampleUrl: 'http://hi.baidu.com/gelida',
    }, {
        name: '百度文庫搜索',
        url: /^http:\/\/wenku\.baidu\.com\/search\?/i,
        exampleUrl: 'http://tieba.baidu.com/i/336636939/forum',
        nextLink: '//div[@class="page-content"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[@class="search-result"]',
        }
    }, {
        name: 'I',
        url: /^http:\/\/tieba\.baidu\.com\/i\/\d+\/forum/,
        exampleUrl: 'http://wenku.baidu.com/search?word=firefox&lm=0&od=0&fr=top_home',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#container',
        }
    },

    // ========================= news ================================================
    {
        name: '新浪新聞',
        url: /^http:\/\/news\.sina\.com\.cn\//i,
        exampleUrl: 'http://news.sina.com.cn/c/sd/2013-11-08/165728658916.shtml',
        nextLink: '//p[@class="page"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="artibody"]',
            relatedObj: true,
        }
    }, {
        name: '搜狐新聞',
        url: /^http:\/\/news\.sohu\.com\/.*\.shtml/i,
        exampleUrl: 'http://news.sohu.com/20120901/n352071543.shtml',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("contentText")',
        }
    }, {
        name: '新華網新聞頁面',
        url: /http:\/\/news\.xinhuanet\.com\/.+\/\d+-/i,
        siteExample: 'http://news.xinhuanet.com/politics/2010-07/19/c_12347755.htm',
        nextLink: '//div[@id="div_currpage"]/a[text()="下一頁"]',
        autopager: {
            remain: 2,
            pageElement: '//table[@id="myTable"] | id("content")'
        }
    }, {
        name: '騰訊網-大成網,新聞',
        url: /^http:\/\/[a-z]+\.qq\.com\/.*\.htm/i,
        exampleUrl: 'http://cd.qq.com/a/20131119/002713.htm',
        nextLink: 'id("ArtPLink")/ul/li/a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("Cnt-Main-Article-QQ")',
            relatedObj: true,
            replaceE: "css;#ArtPLink"
        }
    }, {
        name: '大成社區',
        url: /^http:\/\/[a-z]+\.qq\.com\/(?:forum\.php|.*\.htm)/i,
        exampleUrl: 'http://mycd.qq.com/forum.php?mod=forumdisplay&fid=1001037360&page=',
        nextLink: '//div[@class="pgb"]/a[@class="nxt"]',
        autopager: {
            pageElement: 'id("threadlisttableid") | id("postlist") | id("threadlist")/table',
            replaceE: 'css;.page_box .pgb'
        }
    }, {
        name: '中國新聞網',
        url: /http:\/\/www\.chinanews\.com\/[a-z]+\/.+\.shtml/i,
        siteExample: 'http://www.chinanews.com/英文/年/日期/編號.shtml',
        nextLink: '//div[@id="function_code_page"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="left_zw"] | //div[@class="hd_photo"]',
            relatedObj: true,
            HT_insert: ['//div[@id="function_code_page"]', 1],
            filter: '//div[@id="function_code_page"]',
        }
    }, {
        name: '人民網新聞',
        url: /^http:\/\/[a-z]+\.people\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://ent.people.com.cn/n/2013/0823/c1012-22672732-2.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="text_img"] | //div[@id="p_content"]',
            relatedObj: true
        }
    }, {
        name: '中關村在線新聞頁面',
        url: /http:\/\/(?:[^\.]+\.)?zol.com.cn\/\d+\/\d+/i,
        siteExample: 'http://lcd.zol.com.cn/187/1875145.html',
        nextLink: '//div[@class="page"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="cotent_idd"]',
            relatedObj: true,
            replaceE: 'css;.page'
        }
    }, {
        name: 'FT中文網',
        url: /^http:\/\/www\.ftchinese\.com\/story\//i,
        exampleUrl: 'http://www.ftchinese.com/story/001053472',
        nextLink: '//div[@class="pagination"]/a[text()="余下全文"]',
        autopager: {
            pageElement: '//div[@id="bodytext"]/div[1]',
            relatedObj: true,
            replaceE: '//div[@class="pagination"]'
        }
    }, {
        name: 'Solidot: 奇客的資訊，重要的東西',
        url: /^http:\/\/www\.solidot\.org\//i,
        exampleUrl: 'http://www.solidot.org/?issue=20131205',
        nextLink: 'id("center")/div[@class="page"]/a[last()]',
        autopager: {
            pageElement: 'id("center")/div[@class="block_m"]',
            separatorReal: false
        }
    }, {
        name: 'IT之家極速版 - 滾動IT新聞 - 最新IT文章列表',
        url: /^http:\/\/www\.ithome\.com\/list\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("wrapper")/div[@class="content fl"]/div[@class="post_list"]',
        }
    }, {
        name: '虎嗅網',
        url: "^http://www\\.huxiu\\.com/",
        nextLink: '//span[@class="next"]/a[text()=">"]',
        pageElement: '//div[@class="center-ctr-box"]'
    }, {
        name: '36氪',
        url: "^http://www\\.36kr\\.com/.+",
        nextLink: '//a[@rel="next"]',
        pageElement: 'id("mainContainer")/descendant::div[contains(concat(" ", @class, ""),"krContent")]'
    }, {
        name: '愛范兒 · Beats of Bits - 發現創新價值的科技媒體',
        url: "^http://www\\.ifanr\\.com/",
        nextLink: '//div[@class="content-nav"]/a[text()="下一頁"]',
        pageElement: 'id("content")/div[contains(concat(" ", @class, ""), "main")]'
    }, {
        name: '創業幫',
        url: /^http:\/\/www\.cyzone\.cn\//i,
        exampleUrl: 'http://www.cyzone.cn/',
        nextLink: 'id("pages")/*[@class="current"]/following-sibling::a[1]',
        autopager: {
            pageElement: '//div[@class="left"]/div[starts-with(@class, "intere")]/ul[@class="list clearfix"]',
        }
    }, {
        name: '蘿卜網',
        url: /^http:\/\/luo\.bo\//i,
        exampleUrl: 'http://luo.bo/',
        nextLink: '//div[@class="pagenavi"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="homeposts"]/ul[contains(@class, "explist homelist")] | //div[@class="container"]/div[@class="content"]',
            replaceE: '//div[@class="pagenavi"]'
        }
    }, {
        name: '鳳凰網 - 鳳凰汽車',
        url: /^http:\/\/auto\.ifeng\.com\/.*\.shtml/i,
        exampleUrl: 'http://auto.ifeng.com/youji/20131115/1003513.shtml',
        nextLink: '//div[@class="arl-pages"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[starts-with(@class,"arl-mian")]/div/div[@class="arl-cont"]',
            relatedObj: true,
            replaceE: '//div[@class="arl-pages"]'
        }
    }, {
        name: '鳳凰網 - 新聞、財經',
        url: /^http:\/\/\w+\.ifeng\.com\//i,
        exampleUrl: 'http://finance.ifeng.com/a/20131115/11089994_1.shtml',
        nextLink: '//a[@id="pagenext"] | //div[@class="next" or @class="fy"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="artical_real"] | //div[@class="content"]/div[@class="contentL"] | //div[@class="yib_left"]/div[@class="box_list"]',
            relatedObj: true,
            replaceE: 'id("artical")/div[@class="an"]/div[@class="next"] | //div[@class="yib_left"]/div[@class="fy"]'
        }
    }, {
        name: '和訊財經微博',
        url: /^http:\/\/t\.hexun\.com\/.*\.html/i,
        exampleUrl: 'http://t.hexun.com/21210301/default.html',
        nextLink: '//li[contains(@class, "nextbtn2")]/a[text()="下一頁 >"]',
        autopager: {
            pageElement: '//div[@id="listWeibo"]',
            replaceE: '//div[@id="page2"]'
        }
    }, {
        name: '汽車之家',
        url: /^http:\/\/www\.autohome\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://www.autohome.com.cn/culture/201310/643479-7.html',
        nextLink: 'id("articlewrap")/div[@class="page"]/a[@class="page-item-next"]',
        autopager: {
            pageElement: 'id("articleContent")',
            relatedObj: true,
            replaceE: 'id("articlewrap")/div[@class="page"]'
        }
    }, {
        name: '汽車之家論壇帖子和列表',
        url: /^http:\/\/club\.autohome\.com\.cn\/bbs/i,
        siteExample: 'http://club.autohome.com.cn/bbs/forum-c-2313-1.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//dl[@class="list_dl "][@lang] | //div[@class="conmain"]',
        }
    }, {
        name: '愛卡汽車',
        url: /^http:\/\/yp\.xcar\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://yp.xcar.com.cn/201311/news_1351064_1.html',
        nextLink: '//div[@class="article_page_bottom"]/a[@class="page_down"]',
        autopager: {
            pageElement: 'id("newsbody")',
            relatedObj: true,
            replaceE: '//div[@class="article_page_bottom"]'
        }
    }, {
        name: '愛卡汽車論壇帖子',
        url: /^http:\/\/www\.xcar\.com\.cn\/bbs\/viewthread/i,
        siteExample: 'http://www.xcar.com.cn/bbs/viewthread.php?tid=12474760',
        nextLink: '//a[text()="下一頁＞"][@href]',
        autopager: {
            pageElement: '//form[@id="delpost"] | //div[@class="maintable"][@id="_img"]',
        }
    }, {
        name: '新聞 - 加拿大華人網',
        url: /^http:\/\/www\.sinonet\.org\/.*\.html/i,
        exampleUrl: 'http://www.sinonet.org/news/society/2013-11-15/301940.html',
        nextLink: '//p[@class="pageLink"]/a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("zoom")',
            relatedObj: true
        }
    }, {
        name: '美國中文網',
        url: /^http:\/\/news\.sinovision\.net\/.*\.htm/i,
        exampleUrl: 'http://news.sinovision.net/politics/201401/00279206.htm',
        nextLink: '//div[@class="pg"]/a[@class="nxt"]',
        autopager: {
            pageElement: '//div[@class="d"]/table[@class="vwtb"]',
            replaceE: '//div[@class="pg"]',
            relatedObj: true
        }
    }, {
        name: '火星網－中國領先的數字藝術門戶',
        url: /^http:\/\/news\.hxsd\.com\/.*\.html/i,
        exampleUrl: 'http://news.hxsd.com/CG-dynamic/201401/684528.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="news_content_left"]/div[@class="content"]',
        }
    },

    //--- 國外新聞
    {
        name: 'TouringCarTimes',
        url: '^http://www\\.touringcartimes\\.com/category/',
        nextLink: '//li[@class="bpn-next-link"]/a',
        autopager: {
            pageElement: '//div[@id="archive_page_wrapper"]'
        }
    },

    // ========================= video ================================================
    {
        name: "優酷視頻",
        url: "^http://(?:www|u|i)\\.youku\\.com/",
        nextLink: "//a[em/@class='ico_next'] | //a[@title='下一頁']",
        autopager: {
            pageElement: "//div[@id='list' or @id='listofficial'] | id('imgType') | //div[@class='YK_main']/descendant::div[@class='items']",
            relatedObj: true
        }
    }, {
        name: '優酷電視劇—檢索',
        url: '^http://tv\\.youku\\.com/search',
        nextLink: '//a[span[@class="ico__pagenext"]]',
        pageElement: '//div[@class="mainCol"]/descendant::div[@class="items"]',
    }, {
        name: "搜庫-專找視頻",
        url: "^http://www\\.soku\\.com/",
        nextLink: '//li[@class="next"]/a[@title="下一頁"]',
        pageElement: "//div[@class='sk-result']/descendant::div[@class='sk-vlist']",
        siteExample: 'http://www.soku.com/t/nisearch/firefox'
    }, {
        name: '愛奇藝',
        url: /^http:\/\/(list|so)\.iqiyi\.com\//i,
        exampleUrl: ['http://list.iqiyi.com/www/2/18------------2-1-1-1---.html', 'http://so.iqiyi.com/so/q_%E7%81%B5%E4%B9%A6%E5%A6%99%E6%8E%A2'],
        nextLink: '//div[@class="page"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="list_content"]/div[@class="list0"] | //div[@class="s_main"]/descendant::div[@class="mod_sideright clearfix"]/ul',
        }
    }, {
        name: '土豆網 - 全部視頻',
        url: /^http:\/\/www\.tudou\.com\/cate\/.*\.html/i,
        exampleUrl: 'http://www.tudou.com/cate/ach30.html',
        nextLink: '//div[@class="page-nav-bar"]/a[text()="下一頁>"]',
        autopager: {
            pageElement: '//div[@class="content"]',
        }
    }, {
        name: '土豆網 - 個人主頁_視頻',
        url: /^http:\/\/www\.tudou\.com\/home\/item\//i,
        exampleUrl: 'http://www.tudou.com/home/item/loveqiaolin',
        nextLink: {
            startAfter: '?page=',
            mFails: [/^http:\/\/www\.tudou\.com\/home\/item\/.+/i, '?page=1&sort=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var document = unsafeWindow.document;
                var last = document.querySelector('#page ol:last-child');
                var maxNum = last.textContent;
                var m = lhref.match(/\?page=(\d+)/i);
                if (m) {
                    return m[1] >= maxNum;
                }
            },
        },
        autopager: {
            pageElement: 'id("main")/div[@class="mod mod_program_list"]/div[@class="c"]',
            useiframe: true,
            itimeout: 1000,
            filter: 'css;#page'
        }
    }, {
        name: '搜狐視頻 搜索',
        url: /^http:\/\/so\.tv\.sohu\.com\/mts\?&wd=/i,
        exampleUrl: 'http://so.tv.sohu.com/mts?&wd=%u6211%u662F%u7279%u79CD%u5175%u4E4B%u706B%u51E4%u51F0',
        nextLink: '//div[@class="page"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="listBox clear"]/div[@class="column picList"]',
        }
    }, {
        name: 'youtube 搜索列表',
        url: /^https?:\/\/www\.youtube\.com\/results/i,
        nextLink: 'css;[data-link-type="next"]',
        autopager: {
            pageElement: 'css;#results',
        }
    }, {
        name: 'imdb',
        url: /^http:\/\/www\.imdb\.com\/search/i,
        exampleUrl: 'http://www.imdb.com/search/title?count=100&title_type=feature,tv_series&ref_=nv_ch_mm_1',
        nextLink: '//span[@class="pagination"]/a[last()] | id("right")/a[last()]',
        autopager: {
            pageElement: 'id("main")/*',
        }
    },

    //--- 手機
    {
        name: '手機百度百科',
        url: /^http:\/\/wapbaike\.baidu\.com\//i,
        exampleUrl: 'http://wapbaike.baidu.com/goodlist?uid=F381CCCD6FD2F58151EFFB4A63BFA4FF&ssid=0&pu=sz%401321_1004&bd_page_type=1&from=844b&st=4&step=2&net=1&bk_fr=bk_more_glist',
        nextLink: '//div[@class="pages"]/a[text()="下一頁"] | //div[@class="page"]/p[@class="next"]/a[text()="下頁"] | //table[@class="table next"]//a[text()="下頁"] | //a[@class="m-rm-5" and text()="余下全文"]',
        autopager: {
            pageElement: '//div[@class="bd"] | //div[@class="list"] | id("lemma-content")',
            separatorReal: false,
            replaceE: 'css;.page > .p-num'
        }
    }, {
        name: '手機豆瓣',
        url: /^http:\/\/m\.douban\.com\/.*/i,
        exampleUrl: 'http://m.douban.com/book/subject/1088065/reviews?session=c0ea1419',
        nextLink: '//div[@class="pg" or @class="paginator"]/a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("bd")/div[@class="itm"] | //div[@class="bd"]/div[@class="list"]',
            separatorReal: false
        }
    }, {
        name: '手機新浪新聞',
        url: /^http:\/\/[a-z]+\.sina\.cn\/\?sa=/i,
        exampleUrl: 'http://news.sina.cn/?sa=t124d10608655v71&pos=108&vt=4&clicktime=1386267238910&userid=user138626723891024077253801575993',
        nextLink: 'id("j_loadingBtn")',
        autopager: {
            pageElement: 'id("j_articleContent")',
            relatedObj: true
        }
    }, {
        name: '手機網易網',
        url: '^http://3g\\.163\\.com/[a-z]+/.*\\.html',
        exampleUrl: 'http://3g.163.com/news/13/0914/04/98N4CSHI0001124J.html',
        nextLink: ['//a[text()="余下全文"]', '//a[text()="下頁"]'],
        autopager: {
            pageElement: '//div[@class="content"]',
            // separator: false,
            replaceE: '//div[@class="reset marTop10 cBlue"][child::a[text()="下頁"]] | //div[child::form[@class="reset"]]',
            relatedObj: true,
        }
    }, {
        name: '手機鳳凰網',
        url: '^http://3g\\.ifeng\\.com/[a-z]+/',
        exampleUrl: 'http://3g.163.com/news/13/0914/04/98N4CSHI0001124J.html',
        nextLink: ['//a[text()="余下全文"]', '//a[text()="下一頁"]'],
        autopager: {
            pageElement: '//div[@class="zwword"]',
            // separator: false,
            relatedObj: true,
        }
    }, {
        name: '手機環球網',
        url: '^http://wap\\.huanqiu\\.com/',
        nextLink: ['//a[text()="余下全文"]', '//a[text()="下一頁"]'],
        autopager: {
            pageElement: '//div[@class="newscont"]',
            // separator: false,
            separatorReal: false,
            relatedObj: true,
        }
    }, {
        name: 'cnBeta.COM - 移動版',
        url: /^http:\/\/m\.cnbeta\.com\//i,
        exampleUrl: 'http://m.cnbeta.com/',
        nextLink: 'id("yw0")/a[@class="page-next"]',
        autopager: {
            pageElement: '//div/div/div[@class="list"]',
        }
    }, {
        name: '手機版M.BookLink.Me',
        url: /^http:\/\/m\.booklink\.me\//i,
        exampleUrl: 'http://m.booklink.me/charpter.php?site_id=2&book_id=69507',
        nextLink: '//div[@class="sec nav"]/form/a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("m_main")/ul[@class="list sec"]',
        }
    }, {
        name: '開源中國(OSChina.NET)',
        url: /^http:\/\/m\.oschina\.net\//i,
        exampleUrl: 'http://m.oschina.net/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//ul[@class="ui-listview"]',
            useiframe: true
        }
    }, {
        name: '博客園博客手機版',
        url: /^http:\/\/m\.cnblogs\.com\/blog\//i,
        exampleUrl: 'http://m.cnblogs.com/blog/',
        nextLink: '//a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="list_item"]',
        }
    },

    // ========================= download ================================================
    {
        name: 'VeryCD搜索頁面',
        url: /http:\/\/www\.verycd\.com\/search\/folders.+/i,
        siteExample: 'http://www.verycd.com/search/folders/',
        nextLink: '//ul[@class="page"]//a[contains(text(),"下一頁")][@href]',
        autopager: {
            pageElement: '//ul[@id="resultsContainer"]',
            replaceE: 'id("page_html")/ul[@class="page"]',
            lazyImgSrc: '_src'
        }
    }, {
        name: "VeryCD分類資源頁",
        url: /^http:\/\/www\.verycd\.com\/sto\/.+/i,
        exampleUrl: "http://www.verycd.com/sto/music/page1",
        nextLink: '//div[@class="pages-nav"]/a[text()="下一頁 »"]',
        autopager: {
            pageElement: '//div[@id="content"]/ul',
            lazyImgSrc: 'load-src',
            replaceE: '//div[@class="pages-nav"]'
        }
    }, {
        name: 'SimpleCD | 讓被牆變得簡單',
        url: /^http:\/\/www\.simplecd\.me\//i,
        exampleUrl: 'http://www.simplecd.me/search/entry/?query=%E7%81%8C%E7%AF%AE%E9%AB%98%E6%89%8B',
        nextLink: '//td[@class="next"]/a[@class="enabled"]',
        autopager: {
            pageElement: '//div[@class="result-list" or @class="sub-recommend"]/div[@class="content"]',
        }
    }, {
        name: '射手網',
        url: /^http:\/\/(?:www\.)?shooter\.cn\/search\//i,
        exampleUrl: 'http://www.shooter.cn/search/Elysium/',
        preLink: {
            startAfter: '?page=',
            inc: -1,
            min: 1,
        },
        nextLink: {
            startAfter: '?page=',
            mFails: [/^http:\/\/(?:www\.)?shooter\.cn\/search\/[^\/]+/i, '?page=1'],
            inc: 1,
        },
        autopager: {
            pageElement: '//div[@id="resultsdiv"]/div[@class="subitem"]',
        }
    }, {
        name: "YYeTs 人人影視",
        url: "^http://www\\.yyets\\.com/",
        nextLink: "//div[starts-with(@class, 'pages')]/descendant::a[text()='下一頁'] | //div[@class='pages']//a[@class='cur']/following-sibling::a",
        autopager: {
            pageElement: "//div[@class='box_1 topicList'] | //div[@class='box_4 res_listview' or @class='box_4 bg_eb'] | //ul[@class='u_d_list']/li | //ul[@class='allsearch dashed boxPadd6' or @class='dashed bbs_info_list']",
            replaceE: '//div[@class="pages" or @class="pages clearfix"]',
            separatorReal: false
        }
    }, {
        name: 'TTmeiju.Com 您的高清美劇片源下載中心',
        url: /^http:\/\/www\.ttmeiju\.com\//i,
        exampleUrl: 'http://www.ttmeiju.com/meiju/Person.of.Interest.html?page=1',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="seedlistdiv" or @class="contentbox"]/table[@class="seedtable"]',
        }
    }, {
        name: '電影天堂',
        url: /^http:\/\/www\.dy2018\.com\//i,
        exampleUrl: 'http://www.dy2018.com/html/gndy/dyzz/index.html',
        nextLink: '//div[@class="x"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="co_area2"]/div[@class="co_content8"]',
        }
    }, {
        name: '最新電影 | 龍部落',
        url: /^http:\/\/www\.longbuluo\.com\//i,
        exampleUrl: 'http://www.longbuluo.com/category/movie',
        nextLink: '//div[@class="pagebar"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="postlist"]',
            replaceE: "css;.pagebar"
        }
    }, {
        name: '高清連續劇 | 一起下載吧',
        url: /^http:\/\/17down\.net\/category/i,
        exampleUrl: 'http://17down.net/category/tv',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("content")/div[starts-with(@class, "entry_box")]',
            replaceE: '//div[@class="pagination"]'
        }
    }, {
        name: 'Go下載',
        url: /^http:\/\/goxiazai\.cc\//i,
        exampleUrl: 'http://goxiazai.cc/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("main")/div[@class="post"]',
            replaceE: 'id("pagenavi")'
        }
    }, {
        name: '720P電影下載,1080P電影下載,bt藍光電影下載,BT原盤電影下載：BT之家老牌電影下載網站，百萬用戶選擇了這裡',
        url: /^http:\/\/bbs\.1lou\.com\//i,
        exampleUrl: 'http://bbs.1lou.com/forum-index-fid-1183.htm',
        nextLink: '//div[@class="page"]/a[text()="▶"]',
        autopager: {
            pageElement: 'id("threadlist") | id("body")/div/table[@class="post_table"]',
        }
    }, {
        name: 'CMCT高清影視樂園PT站，chdbits',
        url: /^http:\/\/(?:hdcmct|chdbits)\.org\//i,
        exampleUrl: 'http://hdcmct.org/torrents.php',
        nextLink: '//b[@title="Alt+Pagedown"]/parent::a',
        autopager: {
            pageElement: '//table[@class="torrents"]',
        }
    }, {
        name: '很BT電影聯盟',
        url: /^http:\/\/henbt\.com\//i,
        exampleUrl: 'http://henbt.com/',
        nextLink: '//div[@class="pages clear"]/a[@class="nextprev"]',
        autopager: {
            pageElement: 'id("btm")/div[@class="main"]/div[@class="box clear"]',
            separatorReal: false,
        }
    },

    // ========================= bbs、blog ================================================
    {
        name: '天涯論壇_帖子列表',
        url: '^http://bbs\\.tianya\\.cn/list',
        nextLink: '//a[text()="下一頁"]',
        pageElement: '//div[@class="mt5"]',
    }, {
        name: '天涯論壇帖子',
        url: /http:\/\/bbs\.tianya\.cn\/.+\.shtml/i,
        siteExample: 'http://bbs.tianya.cn/post-feeling-2792523-1.shtml',
        nextLink: '//div[@class="atl-pages"]/descendant::a[text()="下頁"][@href]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="atl-main"]',
            filter: function(pages) {
                var see_only_uname = unsafeWindow.see_only_uname;
                var setOnlyUser = unsafeWindow.setOnlyUser;
                if (see_only_uname) {
                    setOnlyUser(see_only_uname);
                }
            }
        }
    },

    {
        name: 'mozest社區',
        url: /^https?:\/\/g\.mozest\.com/i,
        nextLink: '//div[@class="pages"]//a[@class="next"]',
        autopager: {
            pageElement: '//div[@id="threadlist"] | //div[@id="postlist"]',
            useiframe: true,
            replaceE: 'css;.pages_btns > .pages'
        }
    }, {
        name: 'Firefox中文社區 - 列表',
        url: /^https?:\/\/www\.firefox\.net\.cn\/thread/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#J_posts_list',
            replaceE: 'css;.pages',
            useiframe: true
        }
    }, {
        name: 'Firefox中文社區 - 帖子',
        url: /^https?:\/\/www\.firefox\.net\.cn\/read/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.floor.cc.J_read_floor',
            useiframe: true,
            newIframe: true
        }
    }, {
        name: 'Mozilla Addons',
        url: /^https?:\/\/addons\.mozilla\.org\/[^\/]+\/firefox/i,
        siteExample: 'https://addons.mozilla.org/zh-CN/firefox/',
        nextLink: '//p[@class="rel"]/a[@class="button next"][@href] | //ol[@class="pagination"]/li/a[@rel="next"][@href]',
        autopager: {
            uAutoPagerize2: {
                useiframe: true,
            },
            pageElement: '//div[@id="pjax-results" or @class="separated-listing"]/div[@class="items"] | //section[@class="primary"]/div/div[@class="items"] | //ul[@class="personas-grid"] | //div[@id="reviews"]',
            relatedObj: true,
            replaceE: 'css;.paginator'
        }
    }, {
        name: '搜索 | Mozilla 技術支持',
        url: '^https://support\\.mozilla\\.org/zh-CN/search\\?',
        exampleUrl: 'https://support.mozilla.org/zh-CN/search?esab=a&product=firefox&q=%E7%BE%A4%E7%BB%84',
        nextLink: '//a[@class="btn-page btn-page-next" and contains(text(),"下一個")]',
        autopager: {
            pageElement: '//div[@id="search-results"]/div[@class="grid_9"]/div[@class="content-box"]',
        }
    }, {
        name: '傲游瀏覽器-插件中心',
        url: "^http://extension\\.maxthon\\.cn/",
        nextLink: '//div[@class="pages page-right"]/a[text()=">"]',
        pageElement: '//ul[@id="delegate-all"]'
    }, {
        name: "小米手機官方論壇",
        url: "^http://bbs\\.xiaomi\\.cn/",
        nextLink: "//a[@class='nxt' and (text()='下一頁')]",
        autopager: {
            pageElement: "id('postlist') | id('threadlist')",
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
            documentFilter: function(doc) {
                var firstDiv = doc.querySelector("div[id^='post_']");
                firstDiv && firstDiv.parentNode.removeChild(firstDiv);
            }
        }
    }, {
        name: '棋友家園',
        url: /^http:\/\/www\.weiqitv\.com\/home\/forum/i,
        exampleUrl: 'http://www.weiqitv.com/home/forum.php?mod=viewthread&tid=1623&extra=&page=1',
        nextLink: '//div[@class="pg"]/a[@class="nxt"]',
        autopager: {
            pageElement: 'id("threadlisttableid") | id("postlist")',
            useiframe: true,
        }
    }, {
        name: 'Discuz X2.5修復',
        url: /^http?:\/\/(bbs.gfan|bbs.xda|bbs.weiphone|www.weiqitv|www.diypda|f.ppxclub|bbs.sd001|bbs.itiankong)\.(com|cn)/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="threadlist"] | //div[@id="postlist"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
        }
    }, {
        name: 'Discuz 頁面跳轉修復',
        url: /^http:\/\/(bbs.pcbeta|bbs.besgold|www.pt80)\.(com|net)/i,
        nextLink: '//div[@class="pg"]/descendant::a[@class="nxt"]',
        autopager: {
            pageElement: '//div[@id="postlist"] | //form[@id="moderate"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
        }
    }, {
        name: 'vBulletin論壇 加加/看雪/XDA',
        url: /http:\/\/(bbs|forum)\.(jjol|pediy|xda-developers)\.(cn|com)\/(forumdisplay|showthread)/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="posts"]/div[@align="center"] | //table[@class="tborder"][@id="threadslist"]',
        }
    }, {
        name: 'xda-developers',
        url: "^http://forum\\.xda-developers\\.com/",
        nextLink: "//td[@class='alt1']/a[@rel='next']",
        autopager: {
            pageElement: "//table[@id='threadslist'] | //div[@id='posts']",
            replaceE: "//div[@class='pagenav']/table[@class='pagenavControls']",
            separatorReal: false
        }
    }, {
        name: '玩機圈',
        url: /^http:\/\/www\.wanjiquan\.com\//i,
        exampleUrl: 'http://www.wanjiquan.com/forum-169-1.html',
        nextLink: 'css;.ma_tiezi_list_page > .next',
        autopager: {
            pageElement: '//form[@id="moderate"] | id("postlist")',
        }
    }, {
        name: '極限社區',
        url: '^http://bbs\\.themex\\.net/',
        nextLink: '//a[@rel="next"]',
        pageElement: 'id("threadslist posts")',
    }, {
        name: '天壇',
        url: /http:\/\/bbs\.waptw\.com/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="content"]',
        }
    }, {
        name: '鐵血社區',
        url: /^http:\/\/bbs\.tiexue\.net\/.*\.html$/i,
        nextLink: '//div[@class="pages"]/span/a[text()=">>"]',
        autopager: {
            pageElement: '//div[@class="posts_list"]',
        }
    }, {
        name: '鐵血網',
        url: /http:\/\/[a-z]+\.tiexue\.net/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="fontListBox"]',
        }
    }, {
        name: '霏凡論壇',
        url: /http:\/\/bbs\.crsky\.com\/read\.php/i,
        nextLink: 'auto;',
        autopager: {
            // useiframe:true,
            pageElement: '//div[@class="t5 t2"]',
        }
    }, {
        name: '虎撲籃球論壇',
        url: /^http:\/\/bbs\.hupu\.com\//i,
        exampleUrl: 'http://bbs.hupu.com/8173461.html',
        nextLink: 'id("j_next")',
        autopager: {
            pageElement: '//div[@id="t_main"]/div[@class="floor"] | //table[@id="pl"]',
            replaceE: 'css;.page'
        }
    }, {
        name: '人大經濟論壇',
        url: /http:\/\/bbs\.pinggu\.org\/thread/i,
        siteExample: 'http://bbs.pinggu.org/thread-1562552-3-1.html',
        nextLink: '//div[@id="pgt"]/descendant::a[@class="nxt"]',
        autopager: {
            pageElement: '//div[@id="postlist"]',
        }
    }, {
        name: '九尾網',
        url: /joowii\.com\/arc/i,
        siteExample: 'http://www.joowii.com/arc/ysyl/ssgx/2012/0905/125571.html',
        nextLink: 'auto;',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="article"]',
        }
    }, {
        name: '17173.com中國游戲第一門戶站',
        url: '^http://news\\.17173\\.com/content/.*\\.shtml',
        nextLink: '//a[@class="page-next"]',
        pageElement: '//div[@id="matterc"]',
    }, {
        name: '游俠網 - 新聞',
        url: /^http:\/\/www\.ali213\.net\//i,
        exampleUrl: 'http://www.ali213.net/news/html/2013-12/91377.html',
        nextLink: '//a[@id="after_this_page"][@href]',
        autopager: {
            pageElement: '//div[@id="Content"]',
            relatedObj: true,
            filter: 'css;.page_fenye'
        }
    }, {
        name: '游民星空',
        url: /http:\/\/www\.gamersky\.com/i,
        siteExample: 'http://www.gamersky.com/news/201207/206490.shtml',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="act mid"]',
            remain: 1 / 3,
            relatedObj: ['css;div.Comment_box', 'top'],
        }
    }, {
        name: '3DMGAME',
        url: /http:\/\/[a-z]+\.3dmgame\.com\/.*\.html/i,
        // http://dl.3dmgame.com/SoftList_18.html  已經失效
        siteExample: 'http://www.3dmgame.com/news/201312/2310792.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="QZmainL"]/div/div[contains(@class, "con")]',
            relatedObj: true,
        }
    }, {
        name: '猴島論壇',
        url: /^http:\/\/bbs\.houdao\.com/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="z threadCommon"] | //div[@class="mb10 bodd"]',
        }
    }, {
        name: '魔獸世界',
        url: /^http:\/\/wow\.178\.com\/.*\.html/i,
        exampleUrl: 'http://wow.178.com/201308/170546277543.html',
        nextLink: 'id("cms_page_next")',
        autopager: {
            pageElement: 'id("content")/div[@id="text"]',
            replaceE: '//div[@class="page"]'
        }
    }, {
        name: '阡陌居',
        url: /http:\/\/www\.1000qm\.com\/(?:thread\.php\?fid\-\d+|read\.php\?tid\-\d+)\.html/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="z threadCommon"] | //div[@id="pw_content"][@class="mb10"]',
        }
    }, {
        name: '煎蛋首頁',
        url: /http:\/\/jandan\.net\/(?:page)?/i,
        siteExample: 'http://jandan.net/',
        useiframe: true,
        nextLink: '//div[@class="wp-pagenavi"]/child::a[text()=">"] | //p[@class="cp-pagenavi"]/a[text()="»"]',
        autopager: {
            pageElement: '//div[@id="content"] | id("comments")'
        }
    }, {
        name: '蜂鳥網',
        url: /http:\/\/qicai\.fengniao\.com\/\d+\/\d+.html/i,
        siteExample: 'http://qicai.fengniao.com/370/3705137.html',
        useiframe: true,
        nextLink: 'auto;',
        autopager: {
            remain: 1 / 3,
            relatedObj: ['css;div.page_num', 'bottom'],
            pageElement: '//div[@class="article"]',
        }
    }, {
        name: '55188論壇',
        url: /http:\/\/www\.55188\.com/i,
        siteExample: 'http://www.55188.com/forum-8-1.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="mainbox threadlist"] | //div[@class="mainbox viewthread"]',
        }
    }, {
        name: 'PCHOME 社區',
        url: /http:\/\/club\.pchome\.net/i,
        siteExample: 'http://club.pchome.net/forum_1_15.html#',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//form[@id="mytopics"] | //div[@id="weibo_app"]',
        }
    }, {
        name: 'pconline',
        url: '^http://[a-z]+\\.pconline\\.com\\.cn/',
        nextLink: '//div[contains(@class, "pconline_page") or contains(@class, "pager")]/a[@class="next"]',
        autopager: {
            pageElement: '//div[@class="content"] | //table[@class="posts"] | id("post_list") | id("topicList")',
            relatedObj: true,
            replaceE: 'css;.pconline_page',
        },
        exampleUrl: 'http://diy.pconline.com.cn/377/3774616.html',
    }, {
        name: '糗事百科',
        url: '^http://www\\.qiushibaike\\.com/',
        nextLink: '//a[@class="next" and (text()="下一頁")]',
        pageElement: '//div[@class="main"]/div[contains(@class, "content-block")]/div[@class="col1"]',
        exampleUrl: 'http://www.qiushibaike.com/8hr/page/2/?s=4559487',
    }, {
        name: '抽屜新熱榜',
        url: /^http:\/\/dig\.chouti\.com\//i,
        nextLink: '//a[@class="ct_page_edge" and (text()="下一頁")]',
        autopager: {
            pageElement: '//div[@id="content-list"]',
            lazyImgSrc: 'original',
            filter: function(pages) {
                var chouti = unsafeWindow.chouti;
                var NS_links_comment_top = unsafeWindow.NS_links_comment_top;
                chouti.vote();
                chouti.addCollect();
                chouti.shareweibo();
                chouti.playVido();
                NS_links_comment_top.init();
            }
        }
    }, {
        name: '貓撲大雜燴帖子',
        url: /http:\/\/dzh\.mop\.com\/topic\/readSub/i,
        nextLink: '//a[contains(text(),"下一頁")][@href]',
        autopager: {
            pageElement: '//div[@class="huitie"]',
        }
    }, {
        name: '色影無忌帖子',
        url: /http:\/\/forum\.xitek\.com\/showthread/i,
        siteExample: 'http://forum.xitek.com/showthread.php?threadid=571986',
        nextLink: '//font[@size="2"]/font[@class="thtcolor"]/following-sibling::a[@href]',
        autopager: {
            pageElement: '//body/table[position()>2 and position()<(last()-2)]',
        }
    }, {
        name: '19樓帖子',
        url: /^http:\/\/www\.19lou\.com/i,
        siteExample: 'http://www.19lou.com/forum-1502-thread-29762777-1-1.html',
        nextLink: 'auto;',
        useiframe: true,
        autopager: {
            useiframe: true,
            pageElement: '//form[@name="postForm"] | //form[@name="manageForm"]',
        }
    }, {
        name: 'blogspot',
        url: '^http://[^./]+\\.(blogspot|playpcesor)(?:\\.[^./]{2,3}){1,2}/(?!\\d{4}/)',
        exampleUrl: 'http://program-think.blogspot.com/  http://www.playpcesor.com/',
        nextLink: '//a[contains(concat(" ", @class, " "), " blog-pager-older-link ")]',
        autopager: {
            pageElement: '//div[contains(concat(" ", @class, " "), " hfeed ") or contains(concat(" ", @class, " "), " blog-posts ")] | id("Blog1")/div[contains(concat(" ", @class, " "), " entry ")]',
            relatedObj: true,
            replaceE: "css;#blog-pager"
        }
    }, {
        name: '北海365網',
        url: /^http:\/\/[a-z]+\.beihai365\.com\//i,
        exampleUrl: 'http://kj.beihai365.com/',
        nextLink: '//div[@class="pages"]/*[contains(concat(" ",normalize-space(@class)," "), " active ")]/following-sibling::a[1]',
        autopager: {
            pageElement: 'id("threadlist")/tr[@class="tr3"] | id("pw_content")//form[@method="post" and @name="delatc"]',
            replaceE: '//div[@class="pages"]',
        }
    }, {
        name: 'Flickr搜索',
        url: /http:\/\/www\.flickr\.com\/search\/\?q=/i,
        siteExample: 'http://www.flickr.com/search/?q=opera',
        nextLink: '//div[@class="Paginator"]/a[@class="Next"][@href]',
        autopager: {
            pageElement: '//div[@id="ResultsThumbsDiv"]',
            replaceE: '//div[@class="Paginator"]',
        }
    }, {
        name: 'Flickr photos',
        "url": "^http://www\\.flickr\\.com/photos/[^/]+/favorites(?:[/?#]|$)",
        "nextLink": "id(\"paginator-module\")/descendant::a[contains(concat(\" \", @class, \" \"), \" Next \")]",
        "pageElement": "id(\"faves\")",
        "insertBefore": "//div[@class=\"Pages\"]"
    }, {
        name: 'pixiv',
        url: /http:\/\/www\.pixiv\.net\//i,
        siteExample: 'http://www.pixiv.net/search.php?s_mode=s_tag_full&word=%E8%85%90 or http://www.pixiv.net/novel/ranking.php',
        nextLink: '//*[@class="next"]/a[@rel="next"][@href]',
        autopager: {
            pageElement: '//ul[contains(@class, "autopagerize_page_element")] | //section[contains(@class, "autopagerize-page-element")] | //div[@class="column-content"]/ul[contains(@class, "tag-list")]',
            relatedObj: true,
            replaceE: 'css;.pager-container > .page-list'
        }
    }, {
        name: 'bilibili',
        "url": "^http://(www\\.bilibili\\.tv/search|space\\.bilibili\\.tv/)",
        "nextLink": "//div[@class=\"pagelistbox\"]/a[@class=\"nextPage\"]|//ul[@class=\"page\"]/li[@class=\"current\"]/following-sibling::li[1]/a",
        "pageElement": "//div[@class=\"searchlist\"]/ul[@class=\"search_result\"]/li|//div[@class=\"main_list\"]/ul/li"
    }, {
        name: '照片處理網',
        url: /http:\/\/www\.photops\.com\/Article\/.+/i,
        siteExample: 'http://www.photops.com/Article/xsjc/20100728172116.html',
        nextLink: '//a[text()="下一頁"][@href]',
        autopager: {
            pageElement: '//body/table[last()-2]',
            useiframe: true,
        }
    }, {
        name: '撲家漢化平台',
        url: /^http:\/\/www\.pujiahh\.com\/library/i,
        siteExample: 'http://www.pujiahh.com/library/',
        nextLink: '//div[@class="pagination"]/descendant::a[text()="下一頁 ››"]',
        autopager: {
            pageElement: '//div[@class="span8"]/div[@class="modal"]/div[@class="modal-body"]',
        }
    }, {
        name: 'Show妹子',
        url: /^http:\/\/www\.showmeizi\.com\/\w+\/\d+/i,
        siteExample: 'http://www.showmeizi.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="post image"]/div[@class="main-body"]',
        }
    }, {
        name: 'Beautyleg腿模寫真圖片網',
        url: /^http:\/\/www\.beautylegmm\.com\/\w+\/beautyleg-\d+.html/i,
        siteExample: 'http://www.beautylegmm.com/x/beautyleg-x.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="container_16_1 clearfix"]/div[@class="grid_10"]/div[@class="post"]',
            HT_insert: ['//div[@class="archives_page_bar"]', 1],
        }
    }, {
        name: 'Rosi美女圖',
        url: /^http:\/\/www\.rosiyy\.com\/.*.html/i,
        siteExample: 'http://www.rosiyy.com/x/x.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="clearfix"]/div[@class="grid_10"]/div[@class="post postimg"]/p/a',
        }
    }, {
        name: '桌酷壁紙',
        url: /^http:\/\/www\.zhuoku\.com\/.*\.htm/i,
        exampleUrl: 'http://www.zhuoku.com/zhuomianbizhi/computer-kuan/20140107052306.htm',
        nextLink: '//div[@class="turn"]/a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("liebiao")',
        }
    }, {
        name: '美姿女性網 - 國內專業全面的女性網站',
        url: '^http://[a-z]+\\.meizw\\.com/.*\\.html',
        nextLink: '//div[@id="content_pages"]/li/a[(text()="下一頁")]',
        pageElement: '//div[div[2]/@id="content_pages"]',
        exampleUrl: 'http://fashion.meizw.com/street/20130815/328344.html',
    }, {
        name: 'gelbooru, safebooru etc',
        url: '^http://(?:www\\.)?\\w{3,4}booru\\.(?:com|org)',
        nextLink: 'id("paginator")//b/following-sibling::a[1]',
        pageElement: 'id("post-list")/div[@class="content"]//span[contains(@class,"thumb")]|id("content")/table',
        exampleUrl: 'http://gelbooru.com/index.php?page=post&s=list http://safebooru.org/index.php?page=post&s=list&tags=all http://safebooru.org/index.php?page=tags&s=list'
    }, {
        name: '耳機大家壇 全球最大中文耳機論壇',
        url: /^http:\/\/www\.erji\.net\//i,
        exampleUrl: 'http://www.erji.net/thread.php?fid=138',
        nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)]',
        autopager: {
            pageElement: '//table[@id="ajaxtable"] | //div[@id="main"]/form[@method="post"]',
            replaceE: '//div[@class="pages"]'
        }
    }, {
        name: '艾澤拉斯國家地理論壇',
        url: /^http:\/\/(?:bbs\.ngacn\.cc|nga\.178\.com)\//i,
        exampleUrl: 'http://bbs.ngacn.cc/thread.php?fid=390&rand=183',
        nextLink: '//a[@title="下一頁"][@href]',
        autopager: {
            pageElement: 'id("topicrows") | id("m_posts_c")',
            useiframe: true,
            separatorReal: false,
        }
    }, {
        name: 'Final Fantasy Shrine Forums',
        url: /^http:\/\/forums\.ffshrine\.org\//i,
        exampleUrl: 'http://forums.ffshrine.org/general-discussion/',
        nextLink: '//a[@rel="next"][@href]',
        autopager: {
            pageElement: 'id("thread_inlinemod_form") | id("postlist")',
        }
    },


    // ========================= software ================================================
    {
        name: '小眾軟件',
        url: 'http://www\\.appinn\\.com/',
        nextLink: '//a[@class="nextpostslink"]',
        pageElement: '//div[@id="spost"]',
    }, {
        name: '善用佳軟',
        url: /^http:\/\/xbeta\.info\/page\//i,
        exampleUrl: 'http://xbeta.info/page/2',
        nextLink: '//div[@class="wp-pagenavi"]/a[@class="nextpostslink"]',
        autopager: {
            pageElement: 'id("entries-in")/div[@class="post"]',
            replaceE: "css;#entries-in > .wp-pagenavi"
        }
    }, {
        name: '異次元軟件世界',
        url: /^http:\/\/www\.iplaysoft\.com\//i,
        exampleUrl: 'http://www.iplaysoft.com/tag/%E5%90%8C%E6%AD%A5',
        nextLink: '//span[@class="pagenavi_c"]/a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("postlist")/div[@class="entry"]',
            replaceE: '//div[@class="pagenavi"]/span[@class="pagenavi_c"]'
        }
    }, {
        name: 'PlayNext - 低調的異次元',
        url: '^http://www\\.playnext\\.cn/',
        nextLink: '//div[@class="pagenavi"]/a[contains(text(), "下一頁")]',
        pageElement: '//div[@id="container"]/div[@class="content"]/div[@class="post-list"]',
    }, {
        name: '獨木成林',
        url: '^http://www\\.guofs\\.com/',
        nextLink: '//a[@class="nextpostslink"]',
        pageElement: 'id("content")',
        exampleUrl: 'http://www.guofs.com/',
    }, {
        name: '軟件淘',
        url: '^http://www\\.65052424\\.com/',
        nextLink: '//a[@class="next"]',
        pageElement: '//div[@id="content"]',
        exampleUrl: 'http://www.65052424.com/page/7',
    }, {
        name: 'portableapps',
        url: '^http://portableapps\\.com/(?:forums|node)/',
        nextLink: '//li[@class="pager-next"]/a',
        pageElement: 'id("forum")/table|id("comments")/*[not(@class="item-list")]'
    }, {
        name: '精品綠色便攜軟件',
        url: '^http://www\\.portablesoft\\.org/',
        nextLink: '//div[@class="pagination"]/a[text()="下頁 ›"]',
        pageElement: 'id("main")/div[@class="post-entry"]'
    }, {
        name: 'zd423',
        url: /^http:\/\/www\.zdfans\.com\//i,
        exampleUrl: 'http://www.zdfans.com/',
        nextLink: '//div[@class="paging"]/a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="wrapper"]/div[@class="content-wrap"]/div[@class="content column2"]/ul[@class="excerpt"]',
        }
    }, {
        name: '軟件閣 - 原創綠色軟件更新,精品軟件共享',
        url: /^http:\/\/www\.lite6\.com\//i,
        exampleUrl: 'http://www.lite6.com/',
        nextLink: '//ol[@class="page-navigator"]/li/a[@class="next"]',
        autopager: {
            pageElement: '//div[@class="main"]/div[@class="left"]',
        }
    }, {
        name: '綠軟家園(綠色下載站)',
        url: /^http:\/\/www\.downg\.com\/.*\.html/i,
        exampleUrl: 'http://www.downg.com/list/r_1_1.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="cp top-list" or @class="cp software-list"]/div[@class="cp-main"]',
        }
    }, {
        name: '綠色下載吧',
        url: /^http:\/\/www\.xiazaiba\.com\//,
        exampleUrl: 'http://www.xiazaiba.com/newsoft.html',
        nextLink: '//div[@class="page-num" or @class="ylmf-page"]/a[@class="nextprev"]',
        autopager: {
            pageElement: 'id("j_soft_list") | //ul[@class="list-soft list-soft-title j-hover"]',
        }
    }, {
        name: '下載銀行',
        url: /^http:\/\/www\.downbank\.cn\/.*\.htm/i,
        exampleUrl: 'http://www.downbank.cn/soft/html/newlist-1.htm',
        nextLink: '//p[@class="list_page"]/a[text()="下一頁"] | id("NextPageText")//a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="topiclistzone"] | id("content")/div[@class="listitem"]/div[@class="cp-main"]',
        }
    }, {
        name: '小路工作室',
        url: /^http:\/\/www\.wzlu\.cc\/.*\.html/i,
        exampleUrl: 'http://www.wzlu.cc/soft/html/newlist-1.html',
        nextLink: '//p[@class="list_page"]/a[text()="下一頁"] | id("NextPageText")//a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("topiclistzone") | id("listbox")',
        }
    }, {
        name: '心海e站',
        url: /^http:\/\/hrtsea\.com\//i,
        exampleUrl: 'http://hrtsea.com/',
        nextLink: 'id("pagenavi")/span[@class="older"]/a[text()="下一頁"]',
        autopager: {
            pageElement: 'id("main")',
        }
    }, {
        name: '天天資源網 ttrar.com - 精品 綠色 免費 便攜 軟件 - 博客型首頁',
        url: /^http:\/\/www\.ttrar\.com\//i,
        exampleUrl: 'http://www.ttrar.com/',
        nextLink: '//a[text()="..."] | //a[text()="下一页"] | //a[text()="下一頁"]',
        autopager: {
            pageElement: '//ul[@class="articlelist-ul"]',
            //replaceE: "css;#page, .page"
        }
    },
    {
        name: 'Sublime text - Packages',
        url: '^https://sublime\\.wbond\\.net/browse',
        nextLink: '//nav[@class="pagination"]/a[@class="selected"]/following::a[1]',
        pageElement: '//div[@id="content"]/div[@class="results"]/ul[@class="packages results"]',
    },

    // ========================= dev ================================================
    {
        name: 'User Scripts',
        url: /^https?:\/\/userscripts\.org\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("review-list") | //tr[starts-with(@id, "scripts-")] | //tr[starts-with(@id, "posts-")]',
            replaceE: '//div[@class="pagination"]'
        }
    }, {
        name: '博客園',
        url: '^http://www\\.cnblogs\\.com/.*$',
        nextLink: '//a[(text()="Next >")]',
        pageElement: '//div[@id="post_list"]',
        exampleUrl: 'http://www.cnblogs.com/cate/javascript/',
    }, {
        name: '開源中國',
        url: '^http://\\w+\\.oschina\\.net/',
        nextLink: '//li[@class="page next"]/a',
        pageElement: '//div[@class="code_list"]/ul | //div[@class="ProjectList"]/ul[@class="List"] | id("OSC_Content")/div[@class="SpaceList BlogList"]/ul | \
                id("OSC_Content")/div[@class="QuestionList"]/ul/li[@class="question"]',
    }, {
        name: 'CSDN博客',
        url: /http:\/\/blog\.csdn\.net/i,
        siteExample: 'http://blog.csdn.net/wangjieest?viewmode=list',
        nextLink: '//div[@id="papelist"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="article_list"]'
        }
    }, {
        name: 'CSDN論壇',
        url: /^http:\/\/bbs\.csdn\.net\/forums\//i,
        siteExample: 'http://bbs.csdn.net/forums/Qt',
        nextLink: '//div[@class="page_nav"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//body/div/div[@class="content"]/table',
            replaceE: '////div[@class="page_nav"]',
        }
    }, {
        name: 'CSDN話題',
        url: /^http:\/\/bbs\.csdn\.net\/topics\//i,
        siteExample: 'http://bbs.csdn.net/topics/390244325',
        nextLink: '//div[@class="control_area"]/descendant::a[@class="next"]',
        autopager: {
            pageElement: '//div[@class="detailed"]',
            replaceE: '//div[@class="control_area"]',
        }
    }, {
        name: '51CTO',
        url: /^http:\/\/\w+\.51cto\.com\/\w+\/\d+\/\w+\.htm/i,
        siteExample: 'http://developer.51cto.com/art/201007/214478.htm',
        nextLink: 'auto;',
        autopager: {
            useiframe: false,
            relatedObj: ['css;#content', 'bottom'],
            pageElement: 'css;#content>p'
        }
    }, {
        name: "Stack Overflow, Super User, Server Fault, Stack Apps",
        url: "^http://(?:meta\\.)?(?:s(?:erverfault|tackoverflow|uperuser|tackapps)|\\w+\\.stackexchange|askubuntu)\\.com/",
        nextLink: '//a[@rel="next"]',
        pageElement: "id(\"mainbar questions\")//div[contains(concat(\" \",@class,\" \"),\" question-summary \")]|id(\"answers\")/div[@class=\"pager-answers\"][1]/following-sibling::*[./following-sibling::div[@class=\"pager-answers\"]]",
    },

    // ========================= novel ================================================
    {
        name: '起點文學',
        url: /^http:\/\/(www|read)\.(qidian|qdmm|qdwenxue)\.com\/BookReader\/\d+,\d+/i,
        siteExample: 'http://www.qidian.com/BookReader/1545376,27301383.aspx',
        useiframe: true,
        nextLink: '//a[@id="NextLink"]',
        autopager: {
            enable: true,
            useiframe: true,
            pageElement: '//div[@id="maincontent"]/div[@class="booktitle"] | //div[@id="maincontent"]/div[@id="content"]'
        }
    }, {
        name: '逐浪小說',
        url: /^http:\/\/book\.zhulang\.com\/.+\.html/i,
        siteExample: 'http://book.zhulang.com/153319/62230.html',
        nextLink: '//div[@class="readpage_leftnfy"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="readpage_leftntxt"]',
        }
    }, {
        name: '煙雨紅塵',
        url: /^http:\/\/www\.cc222\.com\/chapter\/.+\.html/i,
        siteExample: 'http://www.cc222.com/chapter/558139.html',
        nextLink: '//div[@id="paging"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="aContainer"]',
            remain: 1 / 5,
        }
    }, {
        name: '17k',
        url: /^http:\/\/(mm.17k|www.17k)\.com\/chapter\/.+\.html/i,
        siteExample: 'http://www.17k.com/chapter/143095/3714822.html',
        nextLink: '//div[@class="read_bottom"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="readAreaBox"]'
        }
    }, {
        name: '縱橫書庫',
        url: /^http:\/\/book\.zongheng\.com\/chapter\/.+\.html/i,
        siteExample: 'http://book.zongheng.com/chapter/239553/4380340.html',
        nextLink: '//div[@class="tc quickkey"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="readcon"]'
        }
    }, {
        name: '縱橫女生',
        url: /^http:\/\/www\.mmzh\.com\/chapter\/.+\.html/i,
        siteExample: 'http://www.mmzh.com/chapter/182074/3287355.html',
        nextLink: '//div[@class="tc key"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="book_con"]'
        }
    }, {
        name: '新小說吧',
        url: /http:\/\/book\.xxs8\.com\/.+\.html/i,
        siteExample: 'http://book.xxs8.com/165779/859903.html',
        nextLink: '//div[@class="page"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="midbody"]',
            maxpage: 10,
        }
    }, {
        name: '書迷樓',
        url: /http:\/\/www\.shumilou\.com\/.+\.html/i,
        siteExample: 'http://www.shumilou.com/tiandilonghun/698520.html',
        nextLink: '//div[@class="content"]/div[@id="content"]/div[@class="title"]/a[text()="下一頁(→)"]',
        autopager: {
            pageElement: '//div[@class="content"]/div[@id="content"]',
        }
    }, {
        name: '玄幻小說網',
        url: /^http:\/\/www\.xhxsw\.com\/books\/.+\.htm/i,
        siteExample: 'http://www.xhxsw.com/books/1063/1063066/10579171.htm',
        nextLink: '//div[@id="footlink"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '新浪讀書',
        url: /^http:\/\/vip\.book\.sina\.com\.cn\/book\/.+\.html/i,
        siteExample: 'http://vip.book.sina.com.cn/book/chapter_212356_210018.html',
        nextLink: '//p[@class="pages"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="mainContent"]'
        }
    }, {
        name: '搜狐原創',
        url: /^http:\/\/vip\.book\.sohu\.com\/content/i,
        siteExample: 'http://vip.book.sohu.com/content/124852/3902398/',
        nextLink: '//div[@class="artical_btn"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="bgdiv"]'
        }
    }, {
        name: '紅袖添香',
        url: /^http:\/\/novel\.hongxiu\.com\/a\/.+\.shtml/i,
        siteExample: 'http://novel.hongxiu.com/a/303084/3543064.shtml',
        nextLink: '//div[@class="papgbutton"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="wrapper_main"]'
        }
    }, {
        name: '言情小說吧',
        url: /^http:\/\/www\.xs8\.cn\/book\/.+\.html/i,
        siteExample: 'http://www.xs8.cn/book/132368/86157.html',
        nextLink: '//div[@class="chapter_Turnpage"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="chapter_content"]'
        }
    }, {
        name: '來書小說網',
        url: /^http:\/\/www\.laishu\.com\/book\/.+\.shtml/i,
        siteExample: 'http://www.laishu.com/book/8/8891/5488036.shtml',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//table[@class="tabkuan"]'
        }
    }, {
        name: '小說閱讀網',
        url: /^http:\/\/www\.readnovel\.com\/novel\/.+/i,
        siteExample: 'http://www.readnovel.com/novel/142947.html',
        nextLink: '//div[@class="bottomTools1"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="newContentBody "]'
        }
    }, {
        name: '鳳鳴軒',
        url: /^http:\/\/read\.fmx\.cn\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://read.fmx.cn/files/article/html/5/7/0/4/8/5/70485/1339404.html',
        nextLink: '//div[@class="newread_fy"]/descendant::a[text()="下一章>>"]',
        autopager: {
            pageElement: '//div[@class="newbodybox"]'
        }
    }, {
        name: '紅薯網',
        url: /http:\/\/www\.hongshu\.com\/content\/.+\.html/i,
        siteExample: 'http://www.hongshu.com/content/38591/49531-1193339.html',
        nextLink: '//div[@class="ann"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="readtext"]'
        }
    }, {
        name: '百書齋',
        url: /^http:\/\/baishuzhai\.com/i,
        siteExample: 'http://baishuzhai.com/shancunqirenchuan/683763.html',
        nextLink: '//div[@class="page"]/descendant::a[text()="下一章(快捷鍵:→)"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="booktext"]'
        }
    }, {
        name: '百書庫',
        url: /^http:\/\/baishuku\.com\/html\/.+\.html/i,
        siteExample: 'http://baishuku.com/html/40/40514/8778339.html',
        nextLink: '//div[@id="footlink"]/a[text()="下一頁(快捷鍵:→)"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '頂點小說',
        url: '^http://www\\.23us\\.com/html/.+\\.html',
        siteExample: 'http://www.23us.com/html/26/26627/16952316.html',
        nextLink: ' //dd[@id="footlink"]/descendant::a[text()="下一頁"]',
        pageElement: 'id("amain")/dl/dd/h1 | id("contents")'
    }, {
        name: '快眼文學網',
        url: /^http:\/\/www\.kywxw\.com\/.+\.html/i,
        siteExample: 'http://www.kywxw.com/0/12/3792643.html',
        nextLink: '//div[@id="thumb"]/descendant::a[text()="下一章"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '就愛文學',
        url: /^http:\/\/www\.92wx\.org\/html\/.+\.html/i,
        siteExample: 'http://www.92wx.org/html/0/807/220709.html',
        nextLink: '//div[@id="page_bar"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="chapter_content"]'
        }
    }, {
        name: '親親小說網',
        url: /^http:\/\/www\.77shu\.com\/view\/.+\.html/i,
        siteExample: 'http://www.77shu.com/view/0/20/2062418.html',
        nextLink: 'auto;',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="chapter_content"] | //div[@id="content"]'
        }
    }, {
        name: '七味書屋',
        url: /^http:\/\/www\.7wsw\.net\/html\/.+\.html/i,
        siteExample: 'http://www.7wsw.net/html/shifangtianshi/719412.html',
        nextLink: '//div[@id="chapter_pager"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="book_middle_article"]'
        }
    }, {
        name: '天天中文',
        url: /^http:\/\/www\.360118\.com\/html\/.+\.html/i,
        siteExample: 'http://www.360118.com/html/21/21951/5416831.html',
        nextLink: '//div[@id="FootLink"]/descendant::a[text()="下一頁（快捷鍵→）"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '言情後花園',
        url: /^http:\/\/www\.yqhhy\.org\/novel\/.+\.html/i,
        siteExample: 'http://www.yqhhy.org/novel/0/761/38769.html',
        nextLink: '//div[@id="link"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '平南文學',
        url: /^http:\/\/www\.pnxs\.com\/book\/.+\.html/i,
        siteExample: 'http://www.pnxs.com/book/zhongshengyantaizidan/2164438.html',
        nextLink: '//div[@class="book_middle_text_next"]/descendant::a[text()="下一章"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="book_middle_text"]'
        }
    }, {
        name: '一流小說',
        url: /^http:\/\/www\.1lxs\.com\/novel\/.+\.html/i,
        siteExample: 'http://www.1lxs.com/novel/80341/9055036.html',
        nextLink: '//div[@id="chapter_nav"]/descendant::a[text()="下一章"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '一一小說',
        url: /^http:\/\/www\.11xs\.com\/.+\.htm/i,
        siteExample: 'http://www.11xs.com/xs/213/119908.htm',
        nextLink: '//div[@id="LinkMenu"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="Content"]'
        }
    }, {
        name: '六九中文',
        url: /^http:\/\/www\.69zw\.com\/xiaoshuo\/.+\.html/i,
        siteExample: 'http://www.69zw.com/xiaoshuo/21/21943/4461482.html',
        nextLink: '//div[@class="chapter_Turnpage"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@class="novel_content"]'
        }
    }, {
        name: '華夏書庫',
        url: /^http:\/\/www\.hxsk\.net\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.hxsk.net/files/article/html/67/67509/12704488.html',
        nextLink: '//td[@class="link_14"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//table[@class="border_l_r"]'
        }
    }, {
        name: '書路/3K',
        url: /^http:\/\/www\.(shuluxs|kkkxs)\.com\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.shuluxs.com/files/article/html/22/22306/8727879.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '書山路',
        url: /^http:\/\/www\.shu36\.com\/book\/.+\.html/i,
        siteExample: 'http://www.shu36.com/book/0/1/3.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '落秋',
        url: /^http:\/\/www\.luoqiu\.com\/html\/.+\.html/i,
        siteExample: 'http://www.luoqiu.com/html/18/18505/1385765.html',
        nextLink: '//div[@id="bgdiv"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//table[@class="border_l_r"]',
        }
    }, {
        name: '君子網',
        url: /^http:\/\/www\.junziwang\.com\/.+\.html/i,
        siteExample: 'http://www.junziwang.com/0/155/25137.html',
        nextLink: '//div[@id="footlink"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '哈羅小說網',
        url: /^http:\/\/www\.hellodba\.net\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.hellodba.net/files/article/html/0/46/21565.html',
        nextLink: '//div[@class="papgbutton"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="htmlContent"]'
        }
    }, {
        name: '百書樓',
        url: /^http:\/\/baishulou\.com\/read\/.+\.html/i,
        siteExample: 'http://baishulou.com/read/10/10647/2536085.html',
        nextLink: '//a[text()="下一頁(快捷鍵:→)"][@href]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '萬書樓',
        url: /^http:\/\/www\.wanshulou\.com\/xiaoshuo\/.+\.shtml/i,
        siteExample: 'http://www.wanshulou.com/xiaoshuo/29/29091/2062593.shtml',
        nextLink: '//div[@id="LinkMenu"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="BookText"]'
        }
    }, {
        name: '萬卷書屋',
        url: /^http:\/\/www\.wjsw\.com\/html\/.+\.shtml/i,
        siteExample: 'http://www.wjsw.com/html/35/35404/2887335.shtml',
        nextLink: '//div[@id="bookreadbottom"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="maincontent"]'
        }
    }, {
        name: '書書網',
        url: /^http:\/\/www\.shushuw\.cn\/shu\/.+\.html/i,
        siteExample: 'http://www.shushuw.cn/shu/28560/4509794.html',
        nextLink: '//div[@align="center"]/a[text()="下頁"][@href]',
        autopager: {
            pageElement: '//div[@class="cendiv"]'
        }
    }, {
        name: '飛盧小說',
        url: /^http:\/\/b\.faloo\.com\/p\/.+\.html/i,
        siteExample: 'http://b.faloo.com/p/247559/1.html',
        nextLink: '//div[@id="pager"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="main0"]'
        }
    }, {
        name: '青帝文學網',
        url: /^http:\/\/www\.qingdi\.com\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.qingdi.com/files/article/html/0/27/13314.html',
        nextLink: '//div[@class="readerFooterPage"]/descendant::a[text()="下一頁"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="readerTitle"]'
        }
    }, {
        name: '筆下文學',
        url: /^http:\/\/www\.bxwx\.org\/b\/.+\.html/i,
        siteExample: 'http://www.bxwx.org/b/56/56907/9020932.html',
        nextLink: '//div[@id="footlink"]/descendant::a[text()="下一頁[→]"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '筆趣閣',
        url: /^http:\/\/www\.biquge\.com\/.+\.html/i,
        siteExample: 'http://www.biquge.com/0_67/471472.html',
        nextLink: '//div[@class="bottem2"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '小說客棧',
        url: /^http:\/\/www\.xskz\.com\/xiaoshuo\/.+\.shtml/i,
        siteExample: 'http://www.xskz.com/xiaoshuo/29/29091/2062593.shtml',
        nextLink: '//div[@id="LinkMenu"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="BookText"]'
        }
    }, {
        name: '翠微居',
        url: /^http:\/\/www\.cuiweiju\.com\/html\/.+\.html/i,
        siteExample: 'http://www.cuiweiju.com/html/124/124362/6468025.html',
        nextLink: '//p[@class="cz_bar"]/descendant::a[text()="下一章 》"]',
        autopager: {
            pageElement: '//div[@class="book_wrap"]'
        }
    }, {
        name: '在線書吧',
        url: /^http:\/\/www\.bookba\.net\/Html\/Book\/.+\.html/i,
        siteExample: 'http://www.bookba.net/Html/Book/15/15995/2030251.html',
        nextLink: '//td[@id="thumb"]/descendant::a[text()="下一章"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '文學迷',
        url: /^http:\/\/www\.wenxuemi\.net\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.wenxuemi.net/files/article/html/10/10884/4852125.html',
        nextLink: '//div[@id="footlink"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '愛尚文學網',
        url: /^http:\/\/www\.kenshu\.cc\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.kenshu.cc/files/article/html/5/5379/6389640.html',
        nextLink: '//dd[@id="footlink"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="bdsub"]'
        }
    }, {
        name: 'E品中文網',
        url: /^http:\/\/www\.epzw\.com\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.epzw.com/files/article/html/50/50244/3271485.html',
        nextLink: '//div[@id="link"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '大家讀書院',
        url: /^http:\/\/www\.dajiadu\.net\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.dajiadu.net/files/article/html/14/14436/3337407.html',
        nextLink: '//div[@id="footlink"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="center"]'
        }
    }, {
        name: '北京愛書',
        url: /^http:\/\/www\.bj-ibook\.cn\/book\/.+\.htm/i,
        siteExample: 'http://www.bj-ibook.cn/book/17/t10409k/12.htm',
        nextLink: '//div[@class="zhtop"]/a[text()="下一頁（快捷鍵→）"][@href]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="bmsy_content"]'
        }
    }, {
        name: '小說570',
        url: /^http:\/\/www\.xiaoshuo570\.com/i,
        siteExample: 'http://www.xiaoshuo570.com/11/11844/2678383.html',
        nextLink: '//div[@id="thumb"]/a[text()="下一頁"][@href]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="fonts_big"]',
        }
    }, {
        name: '看書',
        url: /^http:\/\/www\.kanshu\.com\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.kanshu.com/files/article/html/30997/935806.html',
        nextLink: '//div[@class="yd_linebot"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//table[@class="yd_table"]'
        }
    }, {
        name: '全本小說網',
        url: /^http:\/\/www\.quanben\.com\/xiaoshuo\/.+\.html/i,
        siteExample: 'http://www.quanben.com/xiaoshuo/10/10412/2095098.html',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '晉江原創',
        url: /^http:\/\/www\.jjwxc\.net\/onebook\.php\?novelid=/i,
        siteExample: 'http://www.jjwxc.net/onebook.php?novelid=862877&chapterid=6',
        nextLink: {
            startAfter: '&chapterid=',
            inc: 1,
        },
        autopager: {
            pageElement: '//div[@class="noveltext"]',
        }
    }, {
        name: '奇書屋',
        url: /^http:\/\/www\.qishuwu\.com\/.+/i,
        siteExample: 'http://www.qishuwu.com/a_zhijian/314815/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="bgdiv"]'
        }
    }, {
        name: 'lu5小說網',
        url: /^http:\/\/www\.lu5\.com\/.+\.html/i,
        siteExample: 'http://www.lu5.com/b/5/5442/9575830.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '飛庫',
        url: /^http:\/\/www\.feiku\.com\/\/html\/book\/.+\.shtm/i,
        siteExample: 'http://www.feiku.com//html/book/130/164016/4891625.shtm',
        nextLink: '//div[@class="prenext"]/descendant::a[text()="下一頁→"]',
        autopager: {
            pageElement: '//div[@id="chcontent"]'
        }
    }, {
        name: '幻俠小說網',
        url: /http:\/\/www\.huanxia\.com\/book\w+\.html/i,
        siteExample: 'http://www.huanxia.com/book548761_6041285.html',
        nextLink: '//a[@href][@id="htmlxiazhang"]',
        autopager: {
            pageElement: '//div[@class="h1title"] | //div[@id="htmlContent"][@class="contentbox"]',
            HT_insert: ['//div[@id="htmlContent"]', 2],
        }
    }, {
        name: '瀟湘書院',
        url: /^http:\/\/www\.xxsy\.net\/books\/.*\.html/i,
        siteExample: 'http://www.xxsy.net/books/485034/5259176.html',
        nextLink: '//div[@id="detailsubsbox"]/span/a[@href][@title="閱讀下一章節"]',
        autopager: {
            pageElement: '//div[@id="detail_title"] | //div[@id="zjcontentdiv"]',
            HT_insert: ['//div[@id="zjcontentdiv"]', 2],
        }
    }, {
        name: '書海',
        url: /^http:\/\/www\.shuhai\.com\/read\/.+\.html/i,
        siteExample: 'http://www.shuhai.com/read/4014/371553.html',
        nextLink: '//div[@class="page_operate font_blue"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="txt"]'
        }
    }, {
        name: 'yi-see',
        url: /^http:\/\/www\.yi-see\.com/i,
        siteExample: 'http://www.yi-see.com/read_266768_15501.html',
        nextLink: '//div[@class="B2"]/descendant::a[text()="下一節"]',
        autopager: {
            pageElement: '//table[@width="900px"][@align="CENTER"]',
        }
    }, {
        name: '天下書盟',
        url: /^http:\/\/www\.fbook\.net\/book\/.+\.htm/i,
        siteExample: 'http://www.fbook.net/book/35793/2656834.htm',
        nextLink: '//div[@id="pages"]/descendant::a[text()="下一章"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="bookbody"]'
        }
    }, {
        name: '涂鴉小說網',
        url: /^http:\/\/www\.tooya\.net\/.+\.html/i,
        siteExample: 'http://www.tooya.net/tooya/2/2094/820902.html',
        nextLink: '//div[@class="novel_bottom"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '百曉生/谷粒',
        url: /^http:\/\/www\.(bxs|guli)\.cc\/.+/i,
        siteExample: 'http://www.bxs.cc/26758/7708992.html',
        enable: true,
        nextLink: '//div[@id="papgbutton"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="main"]/h1 | //div[@id="readbox"]/div[@id="content"] | //div[@id="readbox"]/div[@id="papgbutton"]',
            HT_insert: ['//div[@id="weekhot"]', 1],
        }
    }, {
        name: '熬夜看書',
        url: /^http:\/\/www\.aoye\.cc\/.+\.html/i,
        siteExample: 'http://www.aoye.cc/843/5.html',
        nextLink: '//div[@id="pagebottom"]/descendant::a[@id="nextpage"]',
        autopager: {
            pageElement: '//pre[@id="content"]'
        }
    }, {
        name: '塔讀文學',
        url: /^http:\/\/www\.tadu\.com\/book\/\d+\/\d+/i,
        siteExample: 'http://www.tadu.com/book',
        nextLink: '//div[@class="container_center"]/div[@class="left"]/div[@class="jump"]/a[@href][text()="下一章>>"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="container_center"]/div[@class="left"]/div[@class="content"][@id="partContent"]',
        }
    }, {
        name: '無錯小說網',
        url: /^http:\/\/www\.wcxiaoshuo\.com\/wcxs\-\d+\-\d+/i,
        siteExample: 'http://www.wcxiaoshuo.com/wcxs-*-*/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="wrapper_main"][@id="jsreadbox"]/h1 | //div[@class="wrapper_main"][@id="jsreadbox"]/div[@id="htmlContent"][@class="contentbox"]',
        }
    }, {
        name: '燃文',
        url: /^http:\/\/www\.ranwen\.cc\/.+\.html/i,
        siteExample: 'http://www.ranwen.cc/A/9/9818/3505060.html',
        nextLink: '//div[@class="pageTools"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="oldtext"]'
        }
    }, {
        name: '書河',
        url: /^http:\/\/www\.shuhe\.cc\/.+/i,
        siteExample: 'http://www.shuhe.cc/30976/4401025/',
        nextLink: '//div[@class="bottem"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="TXT"]'
        }
    }, {
        name: '89文學',
        url: /^http:\/\/89wx\.com\/.+\.htm/i,
        siteExample: 'http://89wx.com/html/book/70/70732/6641331.htm',
        nextLink: '//dd[@id="footlink"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//dd[@id="contents"]'
        }
    }, {
        name: '極速小說網',
        url: /^http:\/\/www\.186s\.cn\/files\/article\/html\/.+\.html/i,
        siteExample: 'http://www.186s.cn/files/article/html/0/304/4528937.html',
        nextLink: '//div[@id="footlink"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '手打8',
        url: /^http:\/\/shouda8\.com\/.+\.html/i,
        siteExample: 'http://shouda8.com/zhangyuxingchen/85649.html',
        nextLink: '//div[@id="papgbutton"]/descendant::a[text()="下一章（快捷鍵 →）"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: '閃文書庫',
        url: /^http:\/\/read\.shanwen\.com\/.+\.html/i,
        siteExample: 'http://read.shanwen.com/14/14616/1011063.html',
        nextLink: '//td[@class="tb0"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@id="content"]'
        }
    }, {
        name: 'PaiTxt',
        url: /^http:\/\/paitxt\.com\/.+\.html/i,
        siteExample: 'http://paitxt.com/24/24596/4507312.html',
        nextLink: '//div[@class="book_middle_text_next"]/descendant::a[text()="下一章(快捷鍵:→)"]',
        autopager: {
            pageElement: '//div[@id="booktext"]'
        }
    }, {
        name: '好書樓',
        url: /^http:\/\/www\.haoshulou\.com\/.+\.html/i,
        siteExample: 'http://www.haoshulou.com/Hao/6/60238.html',
        nextLink: '//div[@class="movenext"]/descendant::a[text()="下一章"]',
        autopager: {
            pageElement: '//div[@id="booktext"]'
        }
    },

    // =============================== manhua ================================================
    {
        name: '天極動漫頻道新聞',
        url: /http:\/\/comic\.yesky\.com\/\d+\/.+\.shtml/i,
        siteExample: 'http://comic.yesky.com/249/11335749_5.shtml',
        nextLink: '//div[@id="numpage"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="article"]',
            remain: 1.4,
            replaceE: '//div[@id="numpage"]',
        }
    }, {
        name: '暴走漫畫',
        url: '^http://baozoumanhua\\.com/',
        nextLink: '//div[@class="pagebar"]/a[text()="下一頁" or @class="next"] | //a[@class="next" and (text()="下一頁")]',
        pageElement: '//div[@class="main cf"]/div[@class="content-block cf"]/div[1]',
    }, {
        name: '178漫畫',
        url: "^http://www\\.dmzj\\.com/.+/.+shtml|^http://manhua\\.178\\.com/.+/.+shtml",
        siteExample: 'http://manhua.178.com/lansechumoshi/15794.shtml',
        nextLink: '//div[@class="pages2"]/descendant::a[text()="下一頁"]',
        autopager: {
            pageElement: '//div[@class="inner_img"]',
            useiframe: true,
        }
    }, {
        name: '愛漫畫',
        url: /^http:\/\/www\.imanhua\.com\/comic\/.+/i,
        siteExample: 'http://www.imanhua.com/comic/55/list_39448.html',
        useiframe: true,
        preLink: {
            startAfter: '?p=',
            inc: -1,
            min: 1,
        },
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.imanhua\.com\/comic\/.+\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var pageSelect = doc.getElementById('pageSelect');
                if (pageSelect) {
                    var s2os = pageSelect.options
                    var s2osl = s2os.length;
                    //alert(s2.selectedIndex);
                    if (pageSelect.selectedIndex == s2osl - 1) return true;
                };
            },
        },
        autopager: {
            useiframe: true,
            remain: 1 / 2,
            pageElement: '//img[@id="comic"]',
        }
    }, {
        name: 'CC漫畫網',
        url: "^http://www\\.tuku\\.cc/comic/\\d+/\\d+/",
        siteExample: 'http://www.tuku.cc/comic/6123/1/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//img[@id="Img"]',
            useiframe: true,
        }
    }, {
        name: '新動漫',
        url: /http:\/\/www\.xindm\.cn\/mh\/.+/i,
        siteExample: 'http://www.xindm.cn/mh/shishangzuiqiangdizi/58784.html?p=2',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="imgArea"]',
            useiframe: true,
        }
    }, {
        name: '看漫畫',
        url: /^http:\/\/www\.kkkmh\.com\/manhua\/\d+\/\d+\/\d+\.html/i,
        siteExample: 'http://www.kkkmh.com/manhua/0710/1011/34412.html?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.kkkmh\.com\/manhua\/\d+\/\d+\/\d+\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, gm_win, lhref) {
                var pic_num = gm_win.pic.length;
                var url_info = lhref.split("?p=");
                var current_page = Number(url_info[1]);
                if (current_page >= pic_num) {
                    return true;
                }
            },
        },
        autopager: {
            pageElement: 'css;img#pic-show-area',
            remain: 1 / 3,
            documentFilter: function(doc, lhref) {
                var current_pic_server = unsafeWindow.current_pic_server,
                    hex2bin = unsafeWindow.hex2bin,
                    pic = unsafeWindow.pic;

                var url_info = lhref.split("?p=");
                var current_page = Number(url_info[1]);
                if (isNaN(current_page)) return;
                var imgSrc = current_pic_server + hex2bin(pic[current_page - 1]);
                doc.getElementById("pic-show-area").setAttribute('src', imgSrc);
            }
        }
    }, {
        name: 'SF在線漫畫',
        url: /http:\/\/comic\.sfacg\.com\/HTML\/.+/i,
        siteExample: 'http://comic.sfacg.com/HTML/HZDLQ/243/?p=2',
        preLink: {
            startAfter: '?p=',
            inc: -1,
            min: 1,
        },
        nextLink: {
            startAfter: '?p=',
            mFails: [/http:\/\/comic\.sfacg\.com\/HTML\/.+\//i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var pageSel = doc.getElementById('pageSel');
                if (pageSel) {
                    var s2os = pageSel.options
                    var s2osl = s2os.length;
                    if (pageSel.selectedIndex == s2osl - 1) return true;
                };
            },
        },
        autopager: {
            pageElement: '//img[@id="curPic"]',
            useiframe: true,
            replaceE: 'id("Pages")'
        }
    }, {
        name: '99漫畫old',
        url: /^http:\/\/(cococomic|dm.99manga|99manga|99comic|www.99comic|www.hhcomic)\.(com|cc)\/.+\.htm/i,
        siteExample: 'http://99manga.com/page/168/6481.htm?v=3*s=9',
        nextLink: {
            startAfter: '?v=',
            inc: 1,
        },
        autopager: {
            useiframe: true,
            maxpage: 20,
            pageElement: '//img[@id="ComicPic"]',
        }
    }, {
        name: '99漫畫new',
        url: /^http:\/\/(1mh|99mh|mh.99770|www.jmydm)\.(com|cc)\/.+/i,
        siteExample: 'http://99mh.com/comic/8436/117728/?p=1&s=0',
        nextLink: {
            startAfter: '?p=',
            inc: 1,
        },
        autopager: {
            useiframe: true,
            maxpage: 20,
            pageElement: '//div[@id="iBody"]',
        }
    }, {
        name: '動漫Fans',
        url: /http:\/\/www\.dm123\.cn\/bbs\/(thread\.php\?fid=|read\.php\?tid=)/i,
        siteExample: 'http://www.dm123.cn/bbs/read.php?tid=593645',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//tbody[@id="threadlist"]|//div[@id="pw_content"]',
        }
    }, {
        name: 'KuKu動漫',
        url: /http:\/\/comic\.kukudm\.com\/comiclist\/\d+\/\d+.*\.htm/i,
        siteExample: 'http://comic.kukudm.com/comiclist/4/17099/3.htm',
        useiframe: true,
        nextLink: '//a[img[contains(@src,"images/d.gif")]]',
        autopager: {
            useiframe: true,
            pageElement: '//body/table[2]'
        }
    }, {
        name: '52pk漫畫',
        url: /http:\/\/(op|sishen|narutocn)\.52pk\.com\/manhua\/\d+\/\d+/i,
        siteExample: 'http://op.52pk.com/manhua/2010/921364.html',
        nextLink: '//li[@id="page__next"]/a[1]',
        autopager: {
            relatedObj: ['css;li#page__select', 'bottom'],
            pageElement: '//div[@id="pictureContent"]'
        }
    }, {
        name: '有妖氣漫畫',
        url: /http:\/\/www\.u17\.com\/comic_show\/.+/i,
        siteExample: 'http://www.u17.com/comic_show/c28540_m0.html',
        autopager: {
            pageElement: '//div[@class="mg_auto"]',
            useiframe: true,
        }
    }, {
        name: '動漫屋',
        url: /http:\/\/(www|tel)\.dm5\.com\/.+/i,
        nextLink: '//span[@id="s_next"]/a[1]',
        autopager: {
            pageElement: '//div[@id="showimage"]',
            useiframe: true,
        }
    }, {
        name: '天使漫畫網,TSDM漫畫組',
        url: /^http:\/\/mh\.tsdm\.net\/comic\/.+/i,
        siteExample: 'http://mh.tsdm.net/comic/4697/68059.html',
        useiframe: true,
        preLink: {
            startAfter: '?p=',
            inc: -1,
            min: 1,
        },
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/mh\.tsdm\.net\/comic\/.+\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var pageSelect = doc.getElementById('qTcms_select_i');
                if (pageSelect) {
                    var s2os = pageSelect.options
                    var s2osl = s2os.length;
                    //alert(s2.selectedIndex);
                    if (pageSelect.selectedIndex == s2osl - 1) return true;
                };
            },
        },
        autopager: {
            useiframe: true,
            remain: 1 / 2,
            pageElement: '//img[@id="qTcms_pic"]',
        }
    }, {
        name: '漫畫頻道_游俠網',
        url: /^http:\/\/manhua\.ali213\.net\/comic\/.*\.html/i,
        exampleUrl: 'http://manhua.ali213.net/comic/5257/141336.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="enjoy_hostcon"]',
            useiframe: true,
            replaceE: "//div[@class='enjoy_center_bottom_page']//*[@class='li_middle' or @class='previouspage' or @class='nextpage']"
        }
    }, {
        name: '火影忍者中文網',
        url: /http:\/\/www\.narutom\.com\/comic\/.+/i,
        siteExample: 'http://www.narutom.com/comic/11624.html?p=3',
        preLink: {
            startAfter: '?p=',
            inc: -1,
            min: 1,
        },
        nextLink: {
            startAfter: '?p=',
            mFails: [/http:\/\/www\.narutom\.com\/comic\/.+\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var topSelect = doc.getElementById('topSelect');
                if (topSelect) {
                    var s2os = topSelect.options;
                    var s2osl = s2os.length;
                    if (topSelect.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            pageElement: '//img[@id="showImg"]',
            useiframe: true,
        }
    }, {
        name: '死神中文網',
        url: /http:\/\/(?:\w+\.)?bleachcn\.net\/manhua\/.+/i,
        siteExample: 'http://naruto.bleachcn.net/manhua/6759.html',
        nextLink: '//div[@id="comic_pages"]/a[text()="下一頁"][@href]',
        autopager: {
            pageElement: '//div[@id="comic_endtext"]',
        }
    }, {
        name: 'iiikl論壇',
        url: '^http://bbs\\.iiikl\\.net/forum\\.php\\?forum_id=.*',
        nextLink: '//a[@class="next"]',
        pageElement: '//tr[@class="topic_list_row"]',
        exampleUrl: 'http://bbs.iiikl.net/forum.php?forum_id=82&class_id=0&page=2'
    }, {
        name: 'sosg論壇帖子',
        url: /http:\/\/www\.sosg\.net\/read/i,
        siteExample: 'http://www.sosg.net/read.php?tid=424833',
        nextLink: '//td[@align="left"]/b/following-sibling::a[@href]',
        autopager: {
            pageElement: '//div[@id="b5"]/form/a/table[1]',
        }
    }, {
        name: '澄空貼子內容',
        url: /http:\/\/bbs\.sumisora\.org\/read\.php\?tid=/i,
        siteExample: 'http://bbs.sumisora.org/read.php?tid=11015694',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.t.t2',
        }
    }, {
        name: '9gal蒼雪論壇',
        url: /http:\/\/bbs\.(9gal|9baka)\.com\/read\.php\?tid=/i,
        siteExample: 'http://bbs.9gal.com/read.php?tid=299016',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//form[@method="post"]/a[@name]/following-sibling::div',
            replaceE: '//ul[@class="pages"]',
        },
    }, {
        name: '和邪社|你的ACG生活 文不在長.內涵則明 圖不在色.意淫則靈',
        url: /^http:\/\/www\.hexieshe\.com\//i,
        exampleUrl: 'http://www.hexieshe.com/',
        nextLink: '//div[@class="pagebar"]/a[text()="Next"]',
        autopager: {
            pageElement: 'id("centent")',
        }
    }, {
        name: 'haruhichan',
        url: /^http:\/\/haruhichan\.com\//i,
        nextLink: '//a[@rel="next"]',
        autopager: {
            pageElement: '//div[@id="postlist"]',
        }
    }, {
        name: 'exhentai',
        url: '^http://exhentai\\.org/s/.*$',
        nextLink: '//img[@src="http://st.exhentai.net/img/n.png"]/..',
        pageElement: '//body/div[@class="sni"]',
        exampleUrl: 'http://exhentai.org/s/0088446283/653117-4',
        useiframe: true
    }, {
        name: '1024社區',
        url: '^http://(www\\.)?t66y\\.com/',
        nextLink: '//div[@class="pages"]/b/following-sibling::a[1]',
        pageElement: 'id("ajaxtable") | id("main")',
        exampleUrl: 'http://t66y.com/thread0806.php?fid=15',
    }, {
        name: ' DLsite 検索結果',
        url: /^http:\/\/(?:[^.]+\.)?dlsite\.com\//i,
        exampleUrl: 'http://www.dlsite.com/home/fsr/=/language/jp/keyword/kon/age_category%5B0%5D/general/per_page/30/show_type/n/page/2',
        nextLink: '//td[@class="page_no"]/ul/li/a[text()="次へ" or text()="Next"]',
        autopager: {
            pageElement: 'id("search_result_list")',
        }
    }, {
        name: 'Gyutto.com｜の検索結果',
        url: /^http:\/\/gyutto\.com\/search\/search_list\.php/i,
        exampleUrl: 'http://gyutto.com/search/search_list.php?_adult_check=yes&action=perPage&search_keyword=lol&search_type=&mode=search&perPage=30&pageID=2&ref_path=%2Fsearch%2Fsearch_list.php',
        nextLink: '//a[text()="次の30件へ"]',
        autopager: {
            pageElement: 'id("struct_2ColRightIn")/div[@class="unit_ItemList"]/div[contains(@class, "parts_ItemBox")]',
            relatedObj: true
        }
    },

    // =================================== google 其它================================================
    {
        name: "Google Bookmarks",
        "url": "^https?://www\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/bookmarks/",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" kd-buttonbar \")]//tr/td[last()-1 or last]/a[img[contains(@src,\"right.png\")]]",
        "pageElement": "id(\"search\")"
    }, {
        name: "Google Code List",
        url: "^https?://code\\.google\\.com/[pr]/(?:[^/]+/){2}list",
        nextLink: "id(\"colcontrol\")//div[contains(concat(\" \", @class, \" \"), \" pagination \")]/a[contains(., \"›\")]",
        pageElement: "id(\"resultstable\")//tr"
    }, {
        "url": "^https?://code\\.google\\.com/hosting/search\\?",
        "nextLink": "id(\"serp\")/following::a[contains(., \"Next\")][1]",
        "pageElement": "id(\"serp\")/*"
    }, {
        "url": "^http://[^.]+\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/codesearch",
        "nextLink": "(id(\"navbar\")//td[@class=\"b\"]/a)[last()]",
        "pageElement": "//*[self::div[@class=\"h\"] or self::pre[@class=\"j\"] or self::div[@class=\"f\"]]",
        "insertBefore": "id(\"navbar\")"
    }, {
        "url": "^https?://groups\\.google(?:\\.[^./]{2,3}){1,2}/groups/search",
        "nextLink": "id(\"navbar\")//td[last()][@class=\"b\"]/a",
        "pageElement": "id(\"res\")/*[self::div or self::br]"
    }, {
        "url": "^http://scholar\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/scholar",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" n \")]/table/tbody/tr/td[last()]/a|id(\"gs_n\")//table/tbody/tr/td[span and b]/following-sibling::td/a",
        "pageElement": "//form[@name=\"gs\"]/following-sibling::node()[ following::div[contains(concat(\" \", @class, \" \"), \" n \")] ]|id(\"gs_ccl\")/div[@class=\"gs_r\"]"
    }, {
        "url": "^http://(?:[^.]+\\.)?google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/news",
        "nextLink": "id(\"end-next\")/..",
        "pageElement": "id(\"search-stories story-articles\")"
    }, {
        "url": "^https?://www\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/history/",
        "nextLink": "//td[@class=\"bl\"][last()-1]/a|//div[@class=\"nn\"]/parent::a",
        "pageElement": "//table[@class=\"res\"]"
    }, {
        "url": "^http://www\\.google\\.[^./]{2,3}(?:\\.[^./]{2,3})?/logos/",
        "nextLink": "//div[@class=\"base-nav\"]//a[contains(., \"«\")]",
        "pageElement": "id(\"doodles\")|//div[contains(concat(\" \", @class, \" \"), \" title \")]"
    }, {
        "url": "^http://books\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/books",
        "nextLink": "id(\"navbar\")//span[@class=\"navlink\"]/parent::a",
        "pageElement": "id(\"main_content\")/*"
    }, {
        "url": "^https?://appengine\\.google\\.com/datastore/explorer\\?.",
        "nextLink": "id(\"ae-datastore-explorer\")//a[@class=\"ae-paginate-next\"]",
        "pageElement": "id(\"ae-datastore-explorer-entities\")"
    }, {
        "url": "^https?://(?:[^/]+\\.)?google(?:\\.\\w{2,3}){1,2}/movies",
        "nextLink": "id(\"pnnext\")|id(\"navbar navcnt nav\")//td[span]/following-sibling::td[1]/a|id(\"nn\")/parent::a",
        "pageElement": "id(\"movie_results\")/*"
    }, {
        "url": "^https://chrome\\.google\\.com/webstore/(?:list|search)",
        "nextLink": "//table[@class=\"paginator\"]//td[last()]/a",
        "pageElement": "//div[@class=\"mod-fullpage\"]/div[@class=\"mod-body\"]"
    }, {
        "url": "^http://www\\.google\\.com/intl/ja/googlebooks/chrome/",
        "nextLink": "id(\"info\")/p[contains(concat(\" \",@class,\" \"),\"nav\")]/a[img[@src=\"images/arrowright.gif\"]]",
        "pageElement": "id(\"page\")/div[a[img] or img]"
    }, {
        "url": "^http://desktop\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/",
        "nextLink": "id(\"content\")/table[@class=\"header\"]//a[contains(., \"»\")]",
        "pageElement": "id(\"content\")/*[(self::table and @class=\"gadget\") or (self::br and @style=\"clear: both;\")]"
    }, {
        "url": "^http://sketchup\\.google\\.com/3dwarehouse/search\\?",
        "nextLink": "//div[@class=\"pager_next\"]/parent::a",
        "pageElement": "//div[@class=\"searchresult\"]/ancestor::tr[1]"
    }, {
        "url": "^https://www\\.google\\.com/a/cpanel/[^/]+/",
        "nextLink": "//tr//ul[@class=\"inlinelist\"]//a[contains(text(),\"›\")]",
        "pageElement": "id(\"list\")"
    }, {
        "url": "^http://www\\.google\\.com/support/forum/",
        "nextLink": "//div[@class=\"wppkrootCSS\"]/a[contains(text(), \">\")]",
        "pageElement": "//table[@class=\"lctCSS\"]"
    }, {
        "url": "^http://www\\.google\\.com/products\\?",
        "nextLink": "id(\"nn\")/parent::a",
        "pageElement": "id(\"results\")|id(\"results\")/following-sibling::p[@class=\"clear\"]"
    }, {
        "url": "^http://www\\.google\\.com/reviews/t",
        "nextLink": "//a[contains(text(), \"Next\")]",
        "pageElement": "id(\"allresults\")/table",
        "insertBefore": "//div[contains(concat(\" \", normalize-space(@class), \" \"), \" t_ftr \")]"
    }, {
        "url": "^http://www\\.google\\.com/cse\\?cx=",
        "nextLink": "//div[@class='gsc-cursor-page gsc-cursor-current-page']/following-sibling::node()[1]",
        "pageElement": "//div[@class='gsc-webResult gsc-result']",
        "insertBefore": "//div[@class='gsc-cursor-box gs-bidi-start-align']"
    }, {
        "url": "^http://www\\.google(?:\\.[^./]{2,3}){1,2}/m\\?.",
        "nextLink": "//*[starts-with(text(), \"Next page\") or starts-with(text(), \"次のページ\")]",
        "pageElement": "id(\"universal\")/div[not(@*)]",
        "insertBefore": "id(\"universal\")/*[@class][last()]"
    }, {
        "url": "^http://followfinder\\.googlelabs\\.com/search",
        "nextLink": "//td[@class=\"more\"]//a[last()]",
        "pageElement": "//table//tr[//div]"
    }, {
        "url": "^http://www\\.googlelabs\\.com/",
        "nextLink": "id(\"nav\")//td[@class=\"cur\"]/following-sibling::td[1]/a",
        "pageElement": "id(\"nav\")/preceding-sibling::ul"
    },

    // ========================= github ================================================
    {
        name: "github mix",
        "url": "^https?://github\\.com/(?:$|dashboard|(?:timeline|[^/]+/[^/]+/(?:comments|network/feed)))",
        "nextLink": "//a[@hotkey=\"l\"]|//div[contains(concat(\" \",@class,\" \"),\" pagination \")]/a",
        "pageElement": "//div[@class=\"news\"]/div[contains(@class, \"alert\")]"
    }, {
        name: "github 搜索",
        url: "^https?://github\\.com/search",
        nextLink: "//div[@class='pagination']/a[@rel='next']",
        pageElement: "id('code_search_results issue_search_results')|//div[@class='sort-bar']/following-sibling::*[following-sibling::span[@class='search-foot-note']]",
        insertBefore: "//div[@class='pagination']"
    }, {
        "url": "^https?://gist\\.github\\.com/",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" pagination \")]/a[contains(text(),\"Older\")]",
        "pageElement": "//div[contains(concat(\" \", @class, \" \"), \" gist-item \")]"
    },
    // 有點小問題，需要刷新下才有用
    {
        "url": "^https?://github\\.com/(?:changelog|[^/]+/[^/]+/commits)",
        "nextLink": "//a[contains(text(), \"Older\")]",
        "pageElement": "//*[starts-with(@class,\"commit-group\")]"
    }, {
        "url": "^https?://github\\.com/[^/]+/[^/]+/watchers",
        "nextLink": "//div[@class=\"pagination\"]/span[@class=\"current\"]/following-sibling::a",
        "pageElement": "id(\"watchers\")"
    }, {
        "url": "^https?://github\\.com/[^/]+/following",
        "nextLink": "//a[hotkey='l']",
        "pageElement": "id(\"watchers\")"
    }, {
        "url": "^http://learn\\.github\\.com/p/",
        "nextLink": "//a[contains(text(), \"next\")]",
        "pageElement": "//div[@class=\"container\"]/div[@id=\"welcome\" or @class=\"content\"]"
    }, {
        "url": "^http://github\\.com/blog",
        "nextLink": "//div[contains(concat(\" \",@class,\" \"),\" pagination \")]/a[contains(text(),\"Next\")]",
        "pageElement": "id(\"posts\")/div[contains(concat(\" \",@class,\" \"),\" list \")]/ul/li"
    },

    // ========= 很少用的 ================
    {
        name: 'bookcool-小說合集',
        url: '^http://www\\.bookcool\\.com/.*\\.htm',
        nextLink: '//div[@id="object1"]/descendant::a[last()][@href]',
        pageElement: '//div[@align="center"]/table[@width !="100%"]',
    }, {
        name: 'Hachiya Makoto',
        url: '^http://g\\.e-hentai\\.org/s/.*$',
        nextLink: '//img[@src="http://ehgt.org/g/n.png"]/..',
        pageElement: '//body/div[@class="sni"]',
        exampleUrl: 'http://g.e-hentai.org/s/2221a78fe2/592744-3',
        useiframe: true
    },

    // ========= 自己蛋疼的 ================
    {
        siteName: '海芋小站',
        url: /http:\/\/www\.inote\.tw\//i,
        siteExample: 'http://www.inote.tw/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;[id^="post"]',
        },
    }, {
        siteName: '就是教不落',
        url: /http:\/\/steachs\.com\//i,
        siteExample: 'http://steachs.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#post,.ads_index,.post',
        },
    }, {
        siteName: '虫二電氣診所',
        url: /http:\/\/blog\.yam\.com\/danfong/i,
        siteExample: 'http://blog.yam.com/danfong',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="blogmain"]',
            remain: 3,
        },
    }, {
        siteName: '阿榮福利味',
        url: /http:\/\/www\.azofreeware\.com\//i,
        siteExample: 'http://www.azofreeware.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.blog-posts > .date-outer',
            //				useiframe:true,
        },
    }, {
        siteName: '電腦玩物',
        url: /http:\/\/www\.playpcesor\.com\//i,
        siteExample: 'http://www.playpcesor.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.blog-posts > .date-outer',
            //				useiframe:true,
        },
    }, {
        siteName: 'GDaily',
        url: /http:\/\/gdaily\.org\//i,
        siteExample: 'http://daily.org/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#content [id^="post"]',
            //				useiframe:true,
        },
    }, {
        siteName: 'blogspot.com',
        url: /http:\/\/?(?:(?:[^\.]))+\.blogspot\.?(?:(?:com)|(?:tw))+\//i,
        siteExample: 'http://playpcesor.blogspot.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.blog-posts > .date-outer',
            //				useiframe:true,
        },
    }, {
        siteName: '重灌狂人',
        url: /https:\/\/briian\.com\//i,
        siteExample: 'http://briian.com/',
        nextLink: 'auto;',
        autopager: {
            //remain: 3,
            pageElement: 'css;#content [id^="post"]',
            HT_insert: ['css;.pagination', 1],
        },
    }, {
        siteName: '㊣軟體玩家',
        url: /http:\/\/blog\.soft\.idv\.tw\//i,
        siteExample: 'http://blog.soft.idv.tw/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.post',
            HT_insert: ['css;.navigation', 1],
        },
    }, {
        siteName: '《硬是要學！》網路生活通',
        url: /http:\/\/www\.soft4fun\.net\//i,
        siteExample: 'http://www.soft4fun.net/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div#front-list > section',
            HT_insert: ['css;.navigation', 1],
        },
    }, {
        siteName: '軟體部落',
        url: /http:\/\/softblog\.tw\//i,
        siteExample: 'http://softblog.tw/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#content [id^="post"]',
            HT_insert:['css;.wp-pagenavi',1],		
        },
    }, {
        siteName: '★Portableware~綠色軟體集散區☆',
        url: /http:\/\/tw\.myblog\.yahoo\.com\/jen9945x\//i,
        siteExample: 'http://tw.myblog.yahoo.com/jen9945x/archive?l=a',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div#yarticle.ycntmod',
        },
    }, {
        siteName: '動漫花園資源網',
        url: /https:\/\/share\.dmhy\.org\//i,
        siteExample: 'http://share.dmhy.org/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="table clear"]',
            useiframe: true,
        },
    }, {
        siteName: '動漫花園資源網',
        url: /http:\/\/share\.popgo\.org\//i,
        siteExample: 'http://share.popgo.org/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#index_maintable',
            useiframe: true,
        },
    }, {
        siteName: '爱恋动漫BT下载',
        url: /http:\/\/www\.kisssub\.org\//i,
        siteExample: 'http://www.kisssub.org/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.box.clear.rounded',
            HT_insert: ['css;.pages.clear', 1],
            useiframe: true,
        },
    }, {
        name: '極影BT發佈索引',
        url: /http:\/\/bt\.ktxp\.com\//i,
        siteExample: 'http://bt.ktxp.com/sort-1-1.html',
        nextLink: 'auto;',
        pageElement: '//div[@class="item-box round-corner"]',
    }, {
        siteName: 'Mobile01',
        url: /http:\/\/www\.mobile01\.com\/?(?:(?:forumtopic)|(?:topiclist))+/i,
        siteExample: 'http://www.mobile01.com/forumtopic.php?c=17&s=10',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="tablelist forumlist"]',
            useiframe: true,
        },
    }, {
        siteName: 'Mobile01 帖子頁面',
        url: /http:\/\/www\.mobile01\.com\/topicdetail.php\?f=/i,
        siteExample: 'http://www.mobile01.com/topicdetail.php?f=296&t=2408059&m=f&last=31456743',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="forum-content"]',
            useiframe: true,
        },
    }, {
        siteName: '小馬資訊網',
        url: /http:\/\/www\.pccppc\.com\//i,
        siteExample: 'http://www.pccppc.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div#mainlist',
            HT_insert: ['css;#pageli', 1],
        },
    }, {
        siteName: '惡魔圖書館',
        url: /http:\/\/sos117\.com\//i,
        siteExample: 'http://sos117.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.post,.post-meta',
        },
    }, {
        siteName: 'yande.re',
        url: /^https?:\/\/yande\.re\/post/i,
        siteExample: 'http://yande.re/post?page=2&tags=',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;ul#post-list-posts>li',
            useiframe: true,
            separator: false,
        },
    }, {
        siteName: '黑亮BT',
        url: /http:\/\/bt\.hliang\.com\/index.php/i,
        siteExample: 'http://bt.hliang.com/index.php',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="box clear"]',
        },
    }, {
        siteName: '痞客邦 PIXNET',
        url: /http:\/\/?(?:(?:[^\.]))+\.pixnet\.net\//i,
        siteExample: 'http://flamefox.pixnet.net/blog',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="article-box"]',
        },
    }, {
        siteName: 'userstyles.org',
        url: /https:\/\/userstyles\.org\/styles\//i,
        siteExample: 'http://userstyles.org/styles/browse?page=1',
        nextLink: 'css;.next_page',
        autopager: {
            pageElement: 'css;.style-brief.no-rating',
        },
    }, {
        siteName: 'userscripts.org',
        url: /http:\/\/userscripts\.org\/scripts/i,
        siteExample: 'http://userscripts.org/scripts',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="content"]',
        },
    }, {
        siteName: '海盜灣',
        url: /http:\/\/thepiratebay\.se\/?(?:(?:browse)|(?:search)|(?:user))+/i,
        siteExample: 'https://thepiratebay.se/browse/505',
        nextLink: 'auto',
        autopager: {
            //pageElement:'css;#searchResult > TBODY > TR:first-child,#searchResult > TBODY > TR:nth-child(2),#searchResult > TBODY > TR:nth-child(3),#searchResult > TBODY > TR:nth-child(4),#searchResult > TBODY > TR:nth-child(5),#searchResult > TBODY > TR:nth-child(6),#searchResult > TBODY > TR:nth-child(7),#searchResult > TBODY > TR:nth-child(8),#searchResult > TBODY > TR:nth-child(9),#searchResult > TBODY > TR:nth-child(10),#searchResult > TBODY > TR:nth-child(11),#searchResult > TBODY > TR:nth-child(12),#searchResult > TBODY > TR:nth-child(13),#searchResult > TBODY > TR:nth-child(14),#searchResult > TBODY > TR:nth-child(15),#searchResult > TBODY > TR:nth-child(16),#searchResult > TBODY > TR:nth-child(17),#searchResult > TBODY > TR:nth-child(18),#searchResult > TBODY > TR:nth-child(19),#searchResult > TBODY > TR:nth-child(20),#searchResult > TBODY > TR:nth-child(21),#searchResult > TBODY > TR:nth-child(22),#searchResult > TBODY > TR:nth-child(23),#searchResult > TBODY > TR:nth-child(24),#searchResult > TBODY > TR:nth-child(25),#searchResult > TBODY > TR:nth-child(26),#searchResult > TBODY > TR:nth-child(27),#searchResult > TBODY > TR:nth-child(28),#searchResult > TBODY > TR:nth-child(29),#searchResult > TBODY > TR:nth-child(30)',
            //HT_insert:['css;#searchResult > TBODY > TR:last-child',1],		
            pageElement: 'css;#searchResult',
        },
    }, {
        siteName: '綠色工廠 Easylife Blog',
        url: /http:\/\/portable\.easylife\.tw/i,
        siteExample: 'http://portable.easylife.tw/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.hentry',
            HT_insert: ['css;#pager', 1],
        },
    }, {
        siteName: '滄者極限 - Powered by vBulletin帖子列表頁面',
        url: /http:\/\/www\.coolaler\.com\/forumdisplay.php/i,
        siteExample: 'http://www.coolaler.com/forumdisplay.php/149-%E6%B8%AC%E8%A9%A6%E8%BB%9F%E9%AB%94%E3%80%81%E9%A9%85%E5%8B%95%E7%A8%8B%E5%BC%8F%E6%8F%90%E4%BE%9B',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;form#inlinemodform',
        },
    }, {
        siteName: '滄者極限 - Powered by vBulletin帖子內容頁面',
        url: /http:\/\/forum\.coolaler\.com\/showthread/i,
        siteExample: 'http://forum.coolaler.com/showthread.php?t=249302',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="posts"]',
        },
    }, {
        siteName: 'AMO',
        url: /https:\/\/addons\.mozilla\.org\/?(?:(?:zh-TW)|(?:zh-CN))+\/firefox\/?(?:(?:extensions)|(?:search)|(?:themes))+/i,
        siteExample: 'https://addons.mozilla.org/zh-TW/firefox/extensions',
        nextLink: 'css;A[class="button next"]',
        autopager: {
            pageElement: 'css;.items > .item.addon,div#themes-listing.island > div.items',
        }
    }, {
        siteName: 'AMO personas',
        url: /https:\/\/addons\.mozilla\.org\/?(?:(?:zh-TW)|(?:zh-CN))+\/firefox\/personas/i,
        siteExample: 'https://addons.mozilla.org/zh-TW/firefox/personas',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.personas-grid',
        }
    }, {
        siteName: '奇摩搜索',
        url: /http:\/\/tw\.search\.yahoo\.com\/search/i,
        siteExample: 'http://tw.search.yahoo.com/search',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="main"]',
        },
    }, {
        siteName: '奇摩知識搜索',
        url: /http:\/\/tw\.?(?:(?:knowledge)|(?:blog)|(?:news))+\.search\.yahoo\.com\/search/i,
        siteExample: 'http://tw.knowledge.search.yahoo.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="main"]',
            useiframe: true,
        },
    }, {
        siteName: '巴哈哈啦帖子列表',
        url: /http:\/\/forum\.gamer\.com\.tw\/B\.php/i,
        siteExample: 'http://forum.gamer.com.tw/B.php?bsn=17532',
        nextLink: 'css;.next',
        autopager: {
            pageElement: 'css;table.FM-blist',
        },
    }, {
        siteName: '巴哈哈啦帖子內容',
        url: /http:\/\/forum\.gamer\.com\.tw\/C\.php/i,
        siteExample: 'http://forum.gamer.com.tw/C.php?bsn=16303&snA=229&tnum=662',
        nextLink: 'css;.next',
        autopager: {
            pageElement: 'css;.FM-cbox1',
        },
    }, {
        siteName: '巴哈哈啦',
        url: /http:\/\/acg\.gamer\.com\.tw\//i,
        siteExample: 'http://acg.gamer.com.tw/?p=pc',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.ACG-mainbox1',
        },
    }, {
        siteName: 'Youtube搜索',
        url: /^https?:\/\/www\.youtube\.com\/results/i,
        siteExample: 'https://www.youtube.com/results?search_query=Larva&oq=Larva&aq=f&aqi=g10&aql=&gs_l=youtube.12..0l10.6626.6626.0.7335.1.1.0.0.0.0.56.56.1.1.0...0.0.He-8ZtiA4R4',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#search-results',
            useiframe: true,
        },
    }, {
        siteName: 'Google Play 搜索',
        url: /^https?:\/\/play\.google\.com\/store\/search\?q/i,
        siteExample: 'https://play.google.com/store/search?q=dict&c=apps&start=24&num=24',
        nextLink: {
            startAfter: '&start=',
            mFails: [/^https:\/\/play\.google\.com\/.*\/search\?q.*/i, '&start=0&num24'],
            inc: 24,
        },
        autopager: {
            remain: 0.33,
            pageElement: 'css;.results-section-set',
        }
    }, {
        siteName: '筆趣閣',
        url: /^http:\/\/www\.biquge\.com\/.+\.html/i,
        siteExample: 'http://www.biquge.com/0_67/471472.html',
        useiframe: true,
        nextLink: '//div[@class="bottem2"]/descendant::a[text()="下一章"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@id="content"]'
        }
    }, {
        siteName: '原創閱讀網',
        example: 'http://www.yuanchuang.com/bookreader/10165901/10295065.html',
        url: /^http:\/\/www\.yuanchuang\.com\/bookreader\/.+\.html/i,
        nextLink: function(doc) {
            return doc.getElementById('btnNext').onclick.toString().match(/http.*html/)[0]
        },
        autopager: {
            HT_insert: ['css;#readtext', 2],
            pageElement: 'css;#readcon',
        }
    }, {
        siteName: '百曉生中文網',
        example: 'http://www.bxs.cc/book/14/14151/3711953.html',
        url: /^http:\/\/www\.bxs\.cc\/book\/.+\.html/i,
        nextLink: "css;#nextpage",
        autopager: {
            pageElement: 'css;#readbox',
        }
    }, {
        siteName: 'publichd.se',
        url: /^https?:\/\/publichd\.se\/index\.php\?page=torrents/i,
        siteExample: 'http://publichd.se//index.php?page=torrents&search=&category=0&active=0',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.b-content table#bgtorrlist2',
            HT_insert: ['css;div.b-content table#bgtorrlist2', 2],
        },
    }, {
        siteName: 'publichd.eu',
        url: /^https?:\/\/publichd\.eu\/index\.php\?page=userdetails/i,
        siteExample: 'http://publichd.eu/index.php?page=userdetails&id=26',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#mcol > DIV > DIV:nth-child(2) > DIV > DIV > DIV > TABLE:nth-child(4)',
        },
    }, {
        siteName: 'Shareファイル検索',
        url: /^https?:\/\/www\.sharedb\.info\/index\.php/i,
        siteExample: 'http://www.sharedb.info/index.php/cat-%E3%82%A2%E3%83%8B%E3%83%A1/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.fileinfo_odd,.fileinfo',
            useiframe: true,
        },
    }, {
        siteName: 'Winnyファイル検索',
        url: /^https?:\/\/www\.nyhash\.info\/index\.php/i,
        siteExample: 'http://www.nyhash.info/index.php/cat-%E3%82%A2%E3%83%8B%E3%83%A1/',
        nextLink: 'auto;',
        useiframe: true,
        autopager: {
            pageElement: 'css;.fileinfo_odd,.fileinfo',
            useiframe: true,
            iloaded: true,
        },
    }, {
        siteName: 'sukebei.nyaa.se',
        url: /^https?:\/\/sukebei\.nyaa\.se\/\?page=torrents/i,
        siteExample: 'http://sukebei.nyaa.se/?page=torrents&catid=7&subcat=25',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.tlist',
        },
    }, {
        siteName: 'sukebei.nyaa.se',
        url: /^https?:\/\/sukebei\.nyaa\.se\/\?user=/i,
        siteExample: 'http://sukebei.nyaa.se/?user=180326',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.tlist',
        },
    }, {
        siteName: 'www.nyaa.se',
        url: /^https?:\/\/www\.nyaa\.se\//i,
        siteExample: 'http://www.nyaa.se/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.tlist',
        },
    }, {
        siteName: 'alabout.com',
        url: /^https?:\/\/www\.alabout\.com\/list/i,
        siteExample: 'http://www.alabout.com/list.php?sid=3',
        nextLink: '//a[contains(text(),"次ページ")]',
        useiframe: true,
        autopager: {
            pageElement: '//node()[preceding-sibling::hr and following-sibling::hr]',
            useiframe: true,
        },
    }, {
        siteName: 'alafs.com',
        url: /^https?:\/\/alafs\.com\/list/i,
        siteExample: 'http://alafs.com/list.php?sid=3',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;HR[size="1"],TABLE[width="100%"][cellpadding="2"][border="0"],.thread_separator',
        },
    }, {
        siteName: 'Dragon Ball Multiverse',
        url: /http:\/\/www\.dragonball-multiverse\.com\/cn\/page/i,
        siteExample: 'http://www.dragonball-multiverse.com/cn/page-0.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.dapage',
            useiframe: true,
            iloaded: true,
            remain: 10,
        },
    }, {
        siteName: '我愛P2P',
        url: /^https?:\/\/oabt\.org\//i,
        siteExample: 'http://oabt.org/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.toplist',
            HT_insert: ['css;#copyOpt', 1],
        },
    }, {
        siteName: 'YYeTs人人影視',
        url: /^https?:\/\/www\.yyets\.com\/php\/?(?:(?:resourcelist)|(?:subtitle))+/i,
        siteExample: 'http://www.yyets.com/php/resourcelist',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.box_4.res_listview,.box_4.res_listview4',
            HT_insert: ['css;.pages', 1],
        },
    }, {
        siteName: 'm8008',
        url: /^https?:\/\/m8008\.com/i,
        siteExample: 'http://m8008.com/',
        nextLink: 'css;.newer,.next a',
        autopager: {
            pageElement: 'css;.post',
        },
    }, {
        siteName: 'zhongwenmanhua',
        url: /^https?:\/\/zhongwenmanhua\.blog131\.fc2blog\.net\//i,
        siteExample: 'http://zhongwenmanhua.blog131.fc2blog.net/',
        nextLink: 'css;#main > DIV:nth-child(21) > A:last-child',
        autopager: {
            pageElement: 'css;#main > DIV:first-child,#main > DIV:nth-child(2),#main > DIV:nth-child(3),#main > DIV:nth-child(2),#main > DIV:nth-child(4),#main > DIV:nth-child(5),#main > DIV:nth-child(6),#main > DIV:nth-child(7),#main > DIV:nth-child(8),#main > DIV:nth-child(9),#main > DIV:nth-child(10),#main > DIV:nth-child(11),#main > DIV:nth-child(12),#main > DIV:nth-child(13),#main > DIV:nth-child(14),#main > DIV:nth-child(15),#main > DIV:nth-child(16),#main > DIV:nth-child(17),#main > DIV:nth-child(18),#main > DIV:nth-child(19),#main > DIV:nth-child(20)',
            HT_insert: ['css;.page_navi', 1],
        },
    }, {
        siteName: '软件盒子',
        url: /^https?:\/\/www\.itopdog\.cn\//i,
        siteExample: 'http://www.itopdog.cn/page/2',
        nextLink: 'css;.more,DIV.navigation:last-child > A:last-child',
        autopager: {
            pageElement: 'css;#post,.post',
        },
    }, {
        siteName: 'portableapps.com',
        url: /^https?:\/\/portableapps\.com\/news/i,
        siteExample: 'http://portableapps.com/news',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.view-content',
            HT_insert: ['css;.view-content', 2],
        },
    }, {
        siteName: 'portableapps.com',
        url: /^https?:\/\/portableapps\.com\/search/i,
        siteExample: 'http://portableapps.com/search/node/Mozilla',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.search-results.node-results',
            HT_insert: ['css;.search-results.node-results', 2],
        },
    }, {
        siteName: '.NET菜鳥自救會',
        url: /^https?:\/\/www\.dotblogs\.com\.tw\/chou/i,
        siteExample: 'http://www.dotblogs.com.tw/chou/Default.aspx',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.post',
            HT_insert: ['css;#HomePager', 1],
        },
    }, {
        siteName: '奇摩部落格',
        url: /^https?:\/\/tw\.myblog\.yahoo\.com\/[^\/]+\/archive/i,
        siteExample: 'http://tw.myblog.yahoo.com/jen9945x/archive?l=a',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#yarticle > DIV:nth-child(2) > DIV > DIV:nth-child(2)',
            HT_insert: ['css;#yarticle > DIV:nth-child(2) > DIV > DIV:last-child', 1],
        },
    }, {
        siteName: 'btscene.eu',
        url: /^https?:\/\/www\.btscene\.eu\/?(?:(?:subcat)|(?:verified))+/i,
        siteExample: 'http://www.btscene.eu/subcat/id/28/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.tor',
            HT_insert: ['css;.pagination2', 1],
        },
    }, {
        siteName: 'kat.ph',
        url: /^https?:\/\/kat\.ph\/[^\/]+\//i,
        siteExample: 'http://kat.ph/movies/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.data',
            HT_insert: ['css;.pages.botmarg5px.floatright', 1],
        },
    }, {
        siteName: 'isohunt.com',
        url: /^https?:\/\/isohunt\.com\/torrents/i,
        siteExample: 'http://isohunt.com/torrents/?ihs1=5&iho1=d&iht=3',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#serps',
            HT_insert: ['css;#IH_tblBody > TBODY > TR > TD:first-child > TABLE:nth-child(21)', 1],
        },
    }, {
        siteName: '東京圖書館',
        url: /^https?:\/\/www\.tokyotosho\.info\/index\.php/i,
        siteExample: 'http://www.tokyotosho.info/index.php',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.listing',
            HT_insert: ['css;#main > FORM:nth-child(9) > TABLE:last-child', 1],
        },
    }, {
        siteName: '東京圖書館 搜索',
        url: /^https?:\/\/www\.tokyotosho\.info\/search\.php/i,
        siteExample: 'http://www.tokyotosho.info/search.php?terms=mp4&type=0&size_min=&size_max=&username=',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.listing',
            HT_insert: ['css;#main > P:nth-child(10)', 1],
        },
    }, {
        siteName: 'JAV Torrent 掲示板',
        url: /^https?:\/\/www\.freedl\.org\/treebbs2rss\/treebbs2rss\/tree\.php\?mode\=(tree|expn|dump)/i,
        siteExample: 'http://www.freedl.org/treebbs2rss/treebbs2rss/tree.php?mode=tree',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;body center div > a[name],.list',
            //separator: false,
        },
    }, {
        siteName: 'JAV Torrent 掲示板',
        url: /^https?:\/\/www\.freedl\.org\/treebbs2rss\/treebbs2rss\/tree\.php\?mode\=root/i,
        siteExample: 'http://www.freedl.org/treebbs2rss/treebbs2rss/tree.php?mode=root',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.bgc',
            separator: false,
        },
    }, {
        siteName: '綠軟家園',
        url: /^https?:\/\/www\.downg\.com\/list\//i,
        siteExample: 'http://www.downg.com/list/r_1_1.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.cp div.cp-main > dl',
            HT_insert: ['css;div.cp div.cp-main div.pages', 1],
        },
    }, {
        siteName: '绿色软件联盟',
        url: /^https?:\/\/www\.xdowns\.com\/soft\//i,
        siteExample: 'http://www.xdowns.com/soft/8/9/Soft_009_5.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.co_area3',
            HT_insert: ['css;div.bd3 div.bd3r div.co_area2', 1],
        },
    }, {
        siteName: '小7聚樂部帖子列表',
        url: /^https?:\/\/7club\.ithome\.com\.tw\/board\//i,
        siteExample: 'http://7club.ithome.com.tw/board/15/2/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div#normal-articles div.article-list section div.articles div.article',
        },
    }, {
        siteName: '小7聚樂部帖子內容',
        url: /^https?:\/\/7club\.ithome\.com\.tw\/?(?:(?:article)|(?:search))+/i,
        siteExample: 'http://7club.ithome.com.tw/article/10033942/2',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;div.replies-block div#replies,div.data-list div.body',
        },
    }, {
        siteName: '挨踢路人甲',
        url: /^https?:\/\/walker-a\.com\//i,
        siteExample: 'http://walker-a.com/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.post',
        },
    }, {
        siteName: 'Win8迷',
        url: /^https?:\/\/www\.win8mi\.com\//i,
        siteExample: 'http://www.win8mi.com/',
        nextLink: 'auto;',
        autopager: {
            useiframe: true,
            pageElement: 'css;.post',
        },
    }, {
        siteName: '靖 ● 技場',
        url: /^https?:\/\/www\.jinnsblog\.com\//i,
        siteExample: 'http://www.jinnsblog.com/search?updated-max=2013-05-17T13:56:00%2B08:00&max-results=5&start=10&by-date=false&m=0',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.post',
        },
    }, {
        siteName: '和諧漫畫國度',
        url: /^https?:\/\/zlock1980\.blog\.fc2\.com\//i,
        siteExample: 'http://zlock1979.blog.fc2.com/page-1.html',
        nextLink: 'css;div.page_navi a[title="下一頁"]',
        autopager: {
            pageElement: 'css;div.content,.page_navi',
        },
    }, {
        siteName: 'Browse icon sets | Icon Search Engine',
        url: /^https?:\/\/www\.iconfinder\.com\/browse\//i,
        siteExample: 'http://www.iconfinder.com/browse/',
        nextLink: 'auto;',
        autopager: {
            useiframe: true,
            pageElement: 'css;section.iconsets',
        },
    }, {
        siteName: '人人資料庫',
        url: /^https?:\/\/www\.renrencd\.com\/list/i,
        siteExample: 'http://www.renrencd.com/list-53.html',
        nextLink: 'auto;',
        autopager: {
            useiframe: true,
            pageElement: 'css;.listview',
        },
    }, {
        siteName: '久久漫畫網',
        url: /^https?:\/\/coldpic\.sfacg\.com\/AllComic\//i,
        siteExample: 'http://coldpic.sfacg.com/AllComic/438/243/',
        nextLink: '//a[@class="cViewPChange cNext"]',
        autopager: {
            useiframe: true,
            pageElement: 'css;#iBody',
        },
    }, {
        siteName: '無限動漫',
        url: /^https?:\/\/new\.comicvip\.com\/show\//i,
        siteExample: 'http://new.comicvip.com/show/cool-11874.html?ch=6#',
        nextLink: 'css;#next2',
        autopager: {
            useiframe: true,
            pageElement: 'css;#TheImg',
        },
    }, {
        siteName: '大ACG時代 NEW',
        url: /http:\/\/www\.flamefox\.org\//i,
        siteExample: 'http://www.flamefox.org/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#Blog1',
        },
    }, {
        siteName: 'IT天空',
        url: /http:\/\/bbs\.itiankong\.com\/?(?:(?:forum)|(?:thread))+/i,
        siteExample: 'http://bbs.itiankong.com/forum-198-1.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#threadlist,#postlist',
        },
    }, {
        siteName: '阿图人体艺术网',
        url: /http:\/\/www\.aturt\.com\/doc/i,
        siteExample: 'http://www.aturt.com/doc/499.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.content',
        },
    }, {
        siteName: 'subom',
        url: /http:\/\/www\.subom\.net\/(search|newsubs)/i,
        siteExample: 'http://www.subom.net/search/Gone%20Girl/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;[id^="subs"],[class^="subs_list"]',
        },
    }, {
        siteName: 'wnacg',
        url: /http:\/\/www\.wnacg\.com\/photos\-view\-id\-\d+\.html/,
        siteExample: 'http://www.wnacg.com/photos-view-id-945033.html',
        nextLink: 'css;#imgarea > a',
        autopager: {
            pageElement: 'css;.photo',
            separator: false,
            ipages: [false, 5],
        },
    }, {
        siteName: 'greasyfork',
        url: /https:\/\/greasyfork\.org\//i,
        siteExample: 'https://greasyfork.org/zh-TW/scripts',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;#browse-script-list',
        },
    }, {
        siteName: '漫畫台',
        url: /http:\/\/www\.manhuatai\.com\/.*\/.*\.html/i,
        siteExample: 'http://www.manhuatai.com/doupocangqiong/1ce.html',
        nextLink: 'auto;',
        autopager: {
            useiframe: true,
            pageElement: 'css;.mh_comiclist.tc',
        },
    },

];

//統配規則..用來滅掉一些DZ.或者phpwind論壇系統..此組規則..優先級自動降為最低..
var SITEINFO_TP = [{
        siteName: 'Discuz論壇列表',
        url: /^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:(?:forum)|(?:showforum)|(?:viewforum)|(?:search.php?)|(?:forumdisplay))+/i,
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href] | //div[@class="p_bar"]/a[@class="p_curpage"]/following-sibling::a[@class="p_num"]',
        autopager: {
            useiframe: true,
            iloaded: false,
            pageElement: '//form[@method="post"][@name] | //div[@id="postlist"] | //div[@id="threadlist"][@class="slst mtw"] | //div[@class="slst"]',
        }
    }, {
        name: 'Discuz論壇帖子',
        url: /https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))+/i,
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href] | //div[@class="p_bar"]/descendant::a[text()="››"]',
        autopager: {
            pageElement: '//div[@id="postlist"] | //form[@method="post"][@name]',
            replaceE: '//div[@class="pages" or @class="pg"][child::a[@class="next" or @class="nxt"][@href]]',
            filter: function(pages) {
                // 回復後插入到最後一頁
                var doc = unsafeWindow.document;
                var replays = doc.querySelectorAll("#postlistreply");
                if (replays.length > 1) {
                    var first = replays[0];
                    first.parentNode.removeChild(first);
                }
            }
        }
    }, {
        name: 'phpWind論壇列表',
        url: /^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)?thread/i,
        preLink: '//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
        autopager: {
            pageElement: '//div[@class="t z"] | //div[@class="z"] | //div[@id="ajaxtable"]',
        }
    }, {
        name: 'phpWind論壇帖子',
        url: /^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)?read/i,
        preLink: '//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
        autopager: {
            pageElement: '//div[@class="t5"] | //div[@class="read_t"] | //div[@id="pw_content"]',
        }
    }, {
        name: 'phpBB列表',
        url: /^https?:\/\/[^\/]+(\/[a-z,0-9]+)?\/viewforum/i,
        siteExample: 'http://www.firefox.net.cn/forum/viewforum.php?f=4',
        nextLink: 'auto;',
        autopager: {
            pageElement: '(//div[@id="page-body"]/div[@class="forumbg"]|//table[@class="forumline"]|//table[@class="tablebg"])',
            //replaceE:'//fildset[@class="display-options")]',
            remain: 1 / 3,
        }
    }, {
        name: 'phpBB帖子',
        url: /^https?:\/\/[^\/]+(\/[a-z,0-9]+)?\/viewtopic/i,
        siteExample: 'http://www.firefox.net.cn/forum/viewtopic.php?t=34339',
        nextLink: 'auto;',
        autopager: {
            //pageElement:'//div[@id="page-body"]',
            pageElement: '(//div[@id="page-body"]/div[contains(@class,"post")]|//table[@class="forumline"]|//table[@class="tablebg"])',
            //replaceE:"//fildset[@class='display-options']",
        }
    },

];

//兼容 oautopager的規則放在這裡,此規則組..優先級最低(比統配規則還低)..
//所以說盡量不要放規則在這個組裡面.
var SITEINFO_comp = [];


//---------------------------------------------------------------------------------------
//當沒有找到規則的時候,進入自動搜索模式.
//在沒有高級規則的網站上.的一些設置..
var autoMatch = {
    keyMatch: true, //是否啟用關鍵字匹配
    cases: false, //關鍵字區分大小寫....
    digitalCheck: true, //對數字連接進行檢測,從中找出下一頁的鏈接
    pfwordl: { //關鍵字前面的字符限定.
        previous: { //上一頁關鍵字前面的字符,例如 "上一頁" 要匹配 "[上一頁" ,那麼prefix要的設置要不小於1,並且character要包含字符 "["
            enable: true,
            maxPrefix: 3,
            character: [' ', '　', '[', '〔', '<', '＜', '‹', '«', '<<', '『', '「', '【', '(', '←']
        },
        next: { //下一頁關鍵字前面的字符
            enable: true,
            maxPrefix: 2,
            character: [' ', '　', '[', '〔', '『', '「', '【', '(', '←']
        }
    },
    sfwordl: { //關鍵字後面的字符限定.
        previous: { //上一頁關鍵字後面的字符
            enable: true,
            maxSubfix: 2,
            character: [' ', '　', ']', '〕', '』', '」', '】', ')', '→']
        },
        next: { //下一頁關鍵字後面的字符
            enable: true,
            maxSubfix: 3,
            character: [' ', '　', ']', '〕', '>', '﹥', '›', '»', '>>', '』', '」', '】', ')', '→', '▸']
        }
    },
    useiframe: false, //(預讀)是否使用iframe..
    viewcontent: false, //查看預讀的內容,顯示在頁面的最下方.
    FA: { //強制拼接 選項 功能設置.
        enable: false, //默認啟用 強制拼接
        manualA: false, //手動翻頁.
        useiframe: false, //(翻頁)是否使用iframe..
        iloaded: false, //(只在opera有效)如果使用iframe翻頁..是否在iframe完全load後操作..否則在DOM完成後操作
        itimeout: 0, //當使用iframe翻頁時在完成後繼續等待多少毫秒後,在操作..
        remain: 1, //剩餘頁面的高度..是顯示高度的 remain 倍開始翻頁..
        maxpage: 99, //最多翻多少頁..
        ipages: [false, 2], //立即翻頁,第一項是控制是否在js加載的時候立即翻第二項(必須小於maxpage)的頁數,比如[true,3].就是說JS加載後.立即翻3頁.
        separator: true, //顯示翻頁導航..(推薦顯示.)..
    }
};

//上一頁關鍵字
var prePageKey = [
    '較新的文章', 'Previous 75', '«', 'Newer posts',
    '上一頁', '上一頁', '上1頁', '上1頁', '上頁', '上頁',
    '翻上頁', '翻上頁', '较新文章',
    '上一張', '上一張', '上一幅', '上一章', '上一節', '上一節', '上一篇',
    '前一頁', '前一頁',
    '後退', '後退', '上篇',
    'previous', 'previous Page', '前へ', '前のページ', '前ページ',
    '前の 20 件','前の 15 件','前の 10 件','前の 5 件'
];

//下一頁關鍵字
var nextPageKey = [
    '較舊的文章', 'Next 75', '»', 'Older posts',
    '下一頁', '下一頁', '下1頁', '下1頁', '下頁', '下頁',
    '翻頁', '翻頁', '翻下頁', '翻下頁', '早期文章',
    '下一張', '下一張', '下一幅', '下一章', '下一節', '下一節', '下一篇',
    '後一頁', '後一頁',
    '前進', '下篇', '後頁', '往後',
    'Next', 'Next Page', '次へ', '次のページ', '次ページ',
    '次の 20 件','次の 15 件','次の 10 件','次の 5 件'
];



var superPreloader = {
    prefs: prefs,
    sep_icons: sep_icons,
    FWKG_color: FWKG_color,
    blackList: blackList,
    DIExclude: DIExclude,
    SITEINFO_D: SITEINFO_D,
    SITEINFO: SITEINFO,
    SITEINFO_TP: SITEINFO_TP,
    SITEINFO_comp: SITEINFO_comp,
    autoMatch: autoMatch,
    prePageKey: prePageKey,
    nextPageKey: nextPageKey,
};
