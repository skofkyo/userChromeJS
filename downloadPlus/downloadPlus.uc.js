// ==UserScript==
// @name         downloadPlus.uc.js
// @charset      utf-8
// @description  從硬盤中刪除+下載重命名並可轉碼+雙擊複製鏈接+另存為+保存並打開+完成下載提示音+自動關閉下載產生的空白標籤
// @author       w13998686967再次修改整合 (ywzhaiqi、黑儀大螃蟹、Alice0775、紫雲飛)
// @include      chrome://browser/content/browser.xul
// @include      chrome://browser/content/places/places.xul
// @include      chrome://mozapps/content/downloads/unknownContentType.xul
// @include      chrome://mozapps/content/downloads/downloads.xul
// @include      chrome://browser/content/downloads/contentAreaDownloadsView.xul
// @version      2014.11.02 增加多個功能
// @version      2014.06.06 add delay to fix for new userChrome.js
// ==/UserScript==
(function() {

    var encoding = true         //true,(新建下載)彈窗             false,不彈窗
    var rename = true           //true,(下載改名)可改名           false,不可改
    var locking = true          //true,(下載改名)自動鎖定保存文件 false,不鎖定
    var encodingConvert = true  //true,(下載改名)開啟下拉菜單選項 false,關閉下拉菜單選項
    var Convert = false          //true,(保存並打開)兼容火狐版本26+(也許會有BUG)     false,火狐版本29+

    switch (location.href) {
	    case "chrome://browser/content/browser.xul":
		    setTimeout(function(){
			    new_Download();                    // 新建下載
			    downloadsPanel_removeFile();       // 從硬盤中刪除
			    //downloadSound_Play();              // 下載完成提示音
				downloadFileSize();                // 精確顯示文件大小
				autoClose_blankTab();              // 自動關閉下載產生的空白標籤
				saveAndOpen_on_main(); 		       // 跟下面的 save_AndOpen 配合使用
				download_dialog_changeName_on_main()// 跟下面的 download_dialog_changeName 配合使用
			}, 200);	
            break;
        case "chrome://mozapps/content/downloads/unknownContentType.xul":
            setTimeout(function(){
			    save_And_Open();                   // 儲存並開啟
                download_dialog_changeName();      // 下載改名
                download_dialog_saveas();          // 另存新檔...
				download_dialog_saveTo();          // 儲存到...
				download_dialog_showCompleteURL(); // 下載彈出窗口雙擊鏈接複製完整鏈接
				download_dialog_doubleclicksaveL();// 下載彈出窗口雙擊保存文件項執行下載	
				//Window.sizeToContent();
            }, 200);
            break;
		case "chrome://browser/content/places/places.xul":
		    setTimeout(function(){
			    new_Download();                    // 新建下載(我的足跡)
                downloadsPanel_removeFile();       // 從硬盤中刪除(我的足跡)
			}, 200);	
            break;
		case "chrome://browser/content/downloads/contentAreaDownloadsView.xul":
		    setTimeout(function(){
			    new_Download();
                downloadsPanel_removeFile();       // 從硬盤中刪除(我的足跡)
			}, 200);	
            break;
    }
	
		
	// 下載完成提示音
	function downloadSound_Play() {
	    var downloadPlaySound = {
        
            DL_START : null,
            DL_DONE : "file:///C:/WINDOWS/Media/chimes.wav",
            DL_CANCEL: null,
            DL_FAILED: null,
            
            
            _list: null,
            init: function sampleDownload_init() {
                XPCOMUtils.defineLazyModuleGetter(window, "Downloads",
                        "resource://gre/modules/Downloads.jsm");
            
            
                window.addEventListener("unload", this, false);
            
                //**** 監視下載
                if (!this._list) {
                  Downloads.getList(Downloads.ALL).then(list => {
                    this._list = list;
                    return this._list.addView(this);
                  }).then(null, Cu.reportError);
                }
            },
            
            uninit: function() {
                window.removeEventListener("unload", this, false);
                if (this._list) {
                  this._list.removeView(this);
                }
            },
            
            onDownloadAdded: function (aDownload) {
                 //**** 開始下載
                if (this.DL_START);
                  this.playSoundFile(this.DL_START);
            },
            
            onDownloadChanged: function (aDownload) {
                //**** 取消下載
                if (aDownload.canceled && this.DL_CANCEL)
                  this.playSoundFile(this.DL_CANCEL)
                //**** 下載失敗
                if (aDownload.error && this.DL_FAILED)
                  this.playSoundFile(this.DL_FAILED)
                //**** 完成下載
                if (aDownload.succeeded && this.DL_DONE)
                  this.playSoundFile(this.DL_DONE)
            },
            
            playSoundFile: function(aFilePath) {
                if (!aFilePath)
                  return;
                var ios = Components.classes["@mozilla.org/network/io-service;1"]
                          .createInstance(Components.interfaces["nsIIOService"]);
                try {
                  var uri = ios.newURI(aFilePath, "UTF-8", null);
                } catch(e) {
                  return;
                }
                var file = uri.QueryInterface(Components.interfaces.nsIFileURL).file;
                if (!file.exists())
                  return;
                
                this.play(uri);
            },
            
            play: function(aUri) {
                var sound = Components.classes["@mozilla.org/sound;1"]
                        .createInstance(Components.interfaces["nsISound"]);
                sound.play(aUri);
            },
            
            handleEvent: function(event) {
                switch (event.type) {
                  case "unload":
                    this.uninit();
                    break;
                }
            }
        }
        downloadPlaySound.init();
    }
	
	//新建下載
	function new_Download() {
	    var createDownloadDialog = function(){
        if (encoding)
            window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjw/eG1sLXN0eWxlc2hlZXQgaHJlZj0iY2hyb21lOi8vZ2xvYmFsL3NraW4vIiB0eXBlPSJ0ZXh0L2NzcyI/Pg0KPHdpbmRvdyB4bWxucz0iaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9rZXltYXN0ZXIvZ2F0ZWtlZXBlci90aGVyZS5pcy5vbmx5Lnh1bCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSIzMDAiIHRpdGxlPSLmlrDlop7kuIvovInku7vli5kiPg0KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvplovlp4st57WQ5p2fLeS9jeaVuF0pIj4NCgkJPGxhYmVsIHZhbHVlPSLmibnph4/ku7vli5kiPjwvbGFiZWw+DQoJCTx0ZXh0Ym94IGZsZXg9IjEiLz4NCgk8L2hib3g+DQoJPHRleHRib3ggaWQ9InVybHMiIG11bHRpbGluZT0idHJ1ZSIgZmxleD0iMSIvPg0KCTxoYm94IGRpcj0icmV2ZXJzZSI+DQoJCTxidXR0b24gbGFiZWw9IumWi+Wni+S4i+i8iSIvPg0KCTwvaGJveD4NCgk8c2NyaXB0Pg0KCQk8IVtDREFUQVsNCgkJZnVuY3Rpb24gUGFyc2VVUkxzKCkgew0KCQkJdmFyIGJhdGNodXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlOw0KCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7DQoJCQkJZm9yICh2YXIgbWF0Y2ggPSBiYXRjaHVybC5tYXRjaCgvXFsoXGQrKS0oXGQrKS0/KFxkKyk/XF0vKSwgaSA9IG1hdGNoWzFdLCBqID0gbWF0Y2hbMl0sIGsgPSBtYXRjaFszXSwgdXJscyA9IFtdOyBpIDw9IGo7IGkrKykgew0KCQkJCQl1cmxzLnB1c2goYmF0Y2h1cmwucmVwbGFjZSgvXFtcZCstXGQrKC1cZCspP1xdLywgKGkgKyAiIikubGVuZ3RoIDwgayA/IChldmFsKCIxMGUiICsgKGsgLSAoaSArICIiKS5sZW5ndGgpKSArICIiKS5zbGljZSgyKSArIGkgOiBpKSk7DQoJCQkJfQ0KCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSB1cmxzLmpvaW4oIlxuIik7DQoJCQl9IGVsc2Ugew0KCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsNCgkJCX0NCgkJfQ0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOw0KCQl3aGlsZShvd25lci5vcGVuZXIgJiYgb3duZXIubG9jYXRpb24gIT0gImNocm9tZTovL2Jyb3dzZXIvY29udGVudC9icm93c2VyLnh1bCIpew0KCQkJb3duZXIgPSBvd25lci5vcGVuZXI7DQoJCX0NCnZhciBtYWlud2luID0gQ29tcG9uZW50cy5jbGFzc2VzWyJAbW96aWxsYS5vcmcvYXBwc2hlbGwvd2luZG93LW1lZGlhdG9yOzEiXS5nZXRTZXJ2aWNlKENvbXBvbmVudHMuaW50ZXJmYWNlcy5uc0lXaW5kb3dNZWRpYXRvcikuZ2V0TW9zdFJlY2VudFdpbmRvdygibmF2aWdhdG9yOmJyb3dzZXIiKTsJCQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJ0ZXh0Ym94IikuYWRkRXZlbnRMaXN0ZW5lcigia2V5dXAiLCBQYXJzZVVSTHMsIGZhbHNlKTsNCgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiYnV0dG9uIikuYWRkRXZlbnRMaXN0ZW5lcigiY29tbWFuZCIsIGZ1bmN0aW9uICgpIHsJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUuc3BsaXQoIlxuIikuZm9yRWFjaChmdW5jdGlvbiAodXJsKSB7DQoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsNCgkJCX0pOw0KCQkJY2xvc2UoKQ0KCQl9LCBmYWxzZSk7DQoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZSA9IG93bmVyLnJlYWRGcm9tQ2xpcGJvYXJkKCk7DQoJCVBhcnNlVVJMcygpOw0KCQldXT4NCgk8L3NjcmlwdD4NCjwvd2luZG93Pg==", "name", "top=" + (window.screenY + window.innerHeight/4 - 50) + ",left=" + (window.screenX + window.innerWidth/2 - 250));
	    else
	        window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjw/eG1sLXN0eWxlc2hlZXQgaHJlZj0iY2hyb21lOi8vZ2xvYmFsL3NraW4vIiB0eXBlPSJ0ZXh0L2NzcyI/Pg0KPHdpbmRvdyB4bWxucz0iaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9rZXltYXN0ZXIvZ2F0ZWtlZXBlci90aGVyZS5pcy5vbmx5Lnh1bCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSIzMDAiIHRpdGxlPSLmlrDlu7rkuIvovInku7vli5kiPg0KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvplovlp4st57WQ5p2fLeS9jeaVuF0pIj4NCgkJPGxhYmVsIHZhbHVlPSLmibnph4/ku7vli5kiPjwvbGFiZWw+DQoJCTx0ZXh0Ym94IGZsZXg9IjEiLz4NCgk8L2hib3g+DQoJPHRleHRib3ggaWQ9InVybHMiIG11bHRpbGluZT0idHJ1ZSIgZmxleD0iMSIvPg0KCTxoYm94IGRpcj0icmV2ZXJzZSI+DQoJCTxidXR0b24gbGFiZWw9IumWi+Wni+S4i+i8iSIvPg0KCTwvaGJveD4NCgk8c2NyaXB0Pg0KCQk8IVtDREFUQVsNCgkJZnVuY3Rpb24gUGFyc2VVUkxzKCkgew0KCQkJdmFyIGJhdGNodXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlOw0KCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7DQoJCQkJZm9yICh2YXIgbWF0Y2ggPSBiYXRjaHVybC5tYXRjaCgvXFsoXGQrKS0oXGQrKS0/KFxkKyk/XF0vKSwgaSA9IG1hdGNoWzFdLCBqID0gbWF0Y2hbMl0sIGsgPSBtYXRjaFszXSwgdXJscyA9IFtdOyBpIDw9IGo7IGkrKykgew0KCQkJCQl1cmxzLnB1c2goYmF0Y2h1cmwucmVwbGFjZSgvXFtcZCstXGQrKC1cZCspP1xdLywgKGkgKyAiIikubGVuZ3RoIDwgayA/IChldmFsKCIxMGUiICsgKGsgLSAoaSArICIiKS5sZW5ndGgpKSArICIiKS5zbGljZSgyKSArIGkgOiBpKSk7DQoJCQkJfQ0KCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSB1cmxzLmpvaW4oIlxuIik7DQoJCQl9IGVsc2Ugew0KCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsNCgkJCX0NCgkJfQ0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOw0KCQl3aGlsZShvd25lci5vcGVuZXIgJiYgb3duZXIubG9jYXRpb24gIT0gImNocm9tZTovL2Jyb3dzZXIvY29udGVudC9icm93c2VyLnh1bCIpew0KCQkJb3duZXIgPSBvd25lci5vcGVuZXI7DQoJCX0NCnZhciBtYWlud2luID0gQ29tcG9uZW50cy5jbGFzc2VzWyJAbW96aWxsYS5vcmcvYXBwc2hlbGwvd2luZG93LW1lZGlhdG9yOzEiXS5nZXRTZXJ2aWNlKENvbXBvbmVudHMuaW50ZXJmYWNlcy5uc0lXaW5kb3dNZWRpYXRvcikuZ2V0TW9zdFJlY2VudFdpbmRvdygibmF2aWdhdG9yOmJyb3dzZXIiKTsJCQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJ0ZXh0Ym94IikuYWRkRXZlbnRMaXN0ZW5lcigia2V5dXAiLCBQYXJzZVVSTHMsIGZhbHNlKTsNCgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiYnV0dG9uIikuYWRkRXZlbnRMaXN0ZW5lcigiY29tbWFuZCIsIGZ1bmN0aW9uICgpIHsJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUuc3BsaXQoIlxuIikuZm9yRWFjaChmdW5jdGlvbiAodXJsKSB7DQoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCB0cnVlLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsNCgkJCX0pOw0KCQkJY2xvc2UoKQ0KCQl9LCBmYWxzZSk7DQoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZSA9IG93bmVyLnJlYWRGcm9tQ2xpcGJvYXJkKCk7DQoJCVBhcnNlVVJMcygpOw0KCQldXT4NCgk8L3NjcmlwdD4NCjwvd2luZG93Pg==", "name", "top=" + (window.screenY + window.innerHeight/4 - 50) + ",left=" + (window.screenX + window.innerWidth/2 - 250));
    }
        
        location == "chrome://browser/content/browser.xul" && (function () {
            document.getElementById('downloads-button').parentNode.addEventListener('click', function(e){
                    if(e.target.id == "downloads-button" || e.target.id == "downloads-indicator"){
                        if(e.button == 2){
                            if(!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)){
                                createDownloadDialog();
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }
                    }
                }
                , false);
        })();
        
        location == "chrome://browser/content/places/places.xul" && (function () {
            var button = document.querySelector("#placesToolbar").insertBefore(document.createElement("toolbarbutton"), document.querySelector("#clearDownloadsButton"));
            button.id = "createNewDownload";
            button.label = "新建下載";
            button.style.paddingRight = "9px";
            button.addEventListener("command", createDownloadDialog, false);
            window.addEventListener("mouseover", function(e){
                button.style.display
                    = (document.getElementById("searchFilter").attributes.getNamedItem("collection").value == "downloads")
                    ? "-moz-box"
                    : "none";
                }, false);
        })();
	}
	// 從硬盤中刪除
	function downloadsPanel_removeFile() {
	    var removeDownloadfile = {
	    	removeStatus : function (){
	    		var RMBtn = document.querySelector("#removeDownload"),
	    			listbox = document.querySelector("#downloadsListBox") || document.querySelector("#downloadsRichListBox"),
	    			state = listbox.selectedItems[0].getAttribute('state');
	    			RMBtn.setAttribute("disabled","true");
	    		if(state != "0" && state != "4" && state != "5") 
	    			RMBtn.removeAttribute("disabled");
	    	},
	    	
	    	removeMenu : function (){
	    		try{removeDownloadfile.removeStatus();}catch(e){};
	    		if(document.querySelector("#removeDownload")) return;
	    		var menuitem = document.createElement("menuitem"),
	    			rlm = document.querySelector('.downloadRemoveFromHistoryMenuItem');
	    		menuitem.setAttribute("label", rlm.getAttribute("label").indexOf("History") != -1 ? "Delete File" : "\u5F9E\u786C\u76E4\u4E2D\u5FB9\u5E95\u522A\u9664");
	    		menuitem.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABIUlEQVRIie2VUZHDIBRFKyESIuHOvQYiYSVUQiTUQSRUAhKQUAmREAnZj33sUBpoScjsz74ZPjLzwoHHeXC5JAGgI3klOUnykh6S1mg8JHmSE8krgC6doxgABkkumfTT4QAMbyG2+j2Ap0FyKkFuLSAR7JYDLY1By9+CzKxmIEk+C2opQwm0kry30JvkXdKaBRlsDg1Y27CWP4ecj2Swb0dyBDAA6ON8AL2tfrS8l///ZaiSQdLX6TLYWf9W5RQZ4lsbAEjOzWUIO7LSefxEH6A2twPQHZHB2UJdBF4MhqRS7ogMbqsiJJeNi9ofkiE6l+wLEHa5RwYkMmyV6hli1u1+YQtn8gpKe6BmlCBZ2OkypFEhw1il99FIGzaWRlHDfgO7af5HS7KuxwAAAABJRU5ErkJggg==");
	    		menuitem.setAttribute("id","removeDownload");
	    		
	    		menuitem.onclick = function (e){
	    			if(e.target.disabled) return;
	    			var path = "";
	    			if(typeof DownloadsViewItemController != "undefined"){
	    				DownloadsView._dataItems.forEach(function(item){
	    					if(item.downloadGuid == DownloadsView.richListBox.selectedItem.getAttribute("downloadGuid")) {
	    						path = item.file;
	    						if(item.done == false) path += ".part";
	    						return path;
	    					}
	    				});
	    			}else{
	    				DownloadsView = document.getElementById("downloadsRichListBox")._placesView;
	    				var selectedItems = DownloadsView._richlistbox.selectedItems;
	    				path = selectedItems[0]._shell._metaData.filePath;
	    			}
	    			
	    			var file=Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	    			try{
	    				file.initWithPath(path);
	    			}catch(e){
	    				var fileUrl = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService)
	    								.getProtocolHandler('file').QueryInterface(Components.interfaces.nsIFileProtocolHandler)
	    								.getFileFromURLSpec(path).path;
	    				file.initWithPath(fileUrl);
	    			}
	    			if(file.exists()){file.permissions |= 0666;file.remove(0);}
	    			
	    			if(typeof DownloadsViewItemController != "undefined"){
	    				new DownloadsViewItemController(DownloadsView.richListBox.selectedItem).doCommand("cmd_delete");
	    			}else{
	    				DownloadsView.doCommand("cmd_delete");
	    			}
	    		};
	    		
	    		document.querySelector("#downloadsContextMenu").insertBefore(menuitem, rlm.nextSibling);
	    		removeDownloadfile.removeStatus();
	    	},
        
	    	Start : function(){
	    		document.querySelector("#downloadsContextMenu").addEventListener("popupshowing", this.removeMenu, false);
        
	    	}
	    }
	    if(location != "chrome://browser/content/places/places.xul"){
	    	try{
	    		eval("DownloadsPanel.showPanel = " + DownloadsPanel.showPanel.toString()
	    			.replace(/DownloadsPanel\.\_openPopupIfDataReady\(\)/,"{$&;removeDownloadfile\.Start\(\);}"));
        
	    	}catch(e){
	    		//Components.utils.reportError(e);
	    	}
	    }else{
	    	removeDownloadfile.Start();
	    }
	    if(location != "chrome://browser/content/downloads/contentAreaDownloadsView.xul"){
	    	try{
	    		eval("DownloadsPanel.showPanel = " + DownloadsPanel.showPanel.toString()
	    			.replace(/DownloadsPanel\.\_openPopupIfDataReady\(\)/,"{$&;removeDownloadfile\.Start\(\);}"));
        
	    	}catch(e){
	    		//Components.utils.reportError(e);
	    	}
	    }else{
	    	removeDownloadfile.Start();
	    }
    }
	
	//精確顯示文件大小
	function downloadFileSize() {    
        location == "chrome://browser/content/browser.xul" && (DownloadUtils.convertByteUnits =
        function DU_convertByteUnits(aBytes) {
                let unitIndex = 0;
                while ((aBytes >= 999.5) && (unitIndex < 3)) {
                        aBytes /= 1024;
                        unitIndex++;
                }
                return [(aBytes > 0) && (aBytes < 100) && (unitIndex != 0) ? (aBytes < 10 ? (parseInt(aBytes * 100) / 100).toFixed(2) : (parseInt(aBytes * 10) / 10).toFixed(1)): parseInt(aBytes), ['bytes', 'KB', 'MB', 'GB'][unitIndex]];
        });
	}
	
	// 自動關閉下載產生的空白標籤
    function autoClose_blankTab() {
        eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
            if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
            && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank" && aStatus == 0) {\
            aWebProgress.DOMWindow.setTimeout(function() {\
            !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
            }, 100);\
            }\
        '));
    }
	
	// 保存並打開
	function save_And_Open() {
	    var saveAndOpen = document.getAnonymousElementByAttribute(document.querySelector("*"), "dlgtype", "extra2");
	    saveAndOpen.parentNode.insertBefore(saveAndOpen,document.documentElement.getButton("accept").nextSibling);
	    saveAndOpen.setAttribute("hidden", "false");
	    saveAndOpen.setAttribute("label", "\u5132\u5B58\u4E26\u958B\u555F");
	    saveAndOpen.setAttribute("oncommand", 'Components.classes["@mozilla.org/browser/browserglue;1"].getService(Components.interfaces.nsIBrowserGlue).getMostRecentBrowserWindow().saveAndOpen.urls.push(dialog.mLauncher.source.asciiSpec);document.querySelector("#save").click();document.documentElement.getButton("accept").disabled=0;document.documentElement.getButton("accept").click()')
    }
	//作用於 main 窗口
	function saveAndOpen_on_main() {
    	Components.utils.import("resource://gre/modules/Downloads.jsm");
    	saveAndOpen = {
    		urls: [],
    		init: function(){
    			Downloads.getList(Downloads.ALL).then(list => {
    				list.addView({
    					onDownloadChanged: function(dl){
						    if (Convert){
							    if(dl.progress == 100 && saveAndOpen.urls.indexOf(dl.source.url)>-1){
						    		dl.launch();
    					    		saveAndOpen.urls[saveAndOpen.urls.indexOf(dl.source.url)] = "";
    					    	}
						    } else {
						        if(dl.progress == 100 && saveAndOpen.urls.indexOf(dl.source.url)>-1){
    					    		(new FileUtils.File(dl.target.path)).launch(); 
    					    		saveAndOpen.urls[saveAndOpen.urls.indexOf(dl.source.url)] = "";
    					    	}
						    }	
    					},
    					onDownloadAdded:  function(){},
    					onDownloadRemoved: function(){},
    				});
    			}).then(null, Cu.reportError);
    		}
    
    	}
    	saveAndOpen.init();
    }
	
    // 下載改名
    function download_dialog_changeName() {
        //注:同時關閉改名和下拉菜單會導致下載文件的文件名不顯示(非要關閉請默認在28行最前面加//來註釋掉該功能)
        if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
        document.querySelector("#mode").addEventListener("select", function() {
            if (dialog.dialogElement("save").selected) {
                if (!document.querySelector("#locationtext")) {
				    if (rename || encodingConvert) {
					    var orginalString = "";
                        if (encodingConvert) {
                            try{
                                orginalString = (opener.localStorage.getItem(dialog.mLauncher.source.spec) ||
                                dialog.mLauncher.source.asciiSpec.substring(dialog.mLauncher.source.asciiSpec.lastIndexOf("/"))).replace(/[\/:*?"<>|]/g, "");
                                opener.localStorage.removeItem(dialog.mLauncher.source.spec)
                            }catch(e){
							    orginalString = dialog.mLauncher.suggestedFileName;
                            }
                        }
					    if (encodingConvert)
                            var locationtext = document.querySelector("#location").parentNode.insertBefore(document.createElement("menulist"), document.querySelector("#location"));
					    else
					        var locationtext = document.querySelector("#location").parentNode.insertBefore(document.createElement("textbox"), document.querySelector("#location"));
                        locationtext.id = "locationtext";
					    if (rename && encodingConvert)
					        locationtext.setAttribute("editable", "true");
                            locationtext.setAttribute("style", "margin-top:-2px;margin-bottom:-3px");
							locationtext.setAttribute("tooltiptext","Ctrl+\u9EDE\u64CA\u8F49\u63DBurl\u7DE8\u78BC\n\u5DE6\u9375:UNICODE\n\u53F3\u9375:GB2312");
                            locationtext.addEventListener("click",function(e){
                                if(e.ctrlKey){
                                    if(e.button==0)
                                        this.value = decodeURIComponent(this.value);
                                    if(e.button==2){
                                        e.preventDefault();
                                        converter.charset = "GB2312";
                                        this.value = converter.ConvertToUnicode(unescape(this.value));
                                    }
                                }
                            },false); 
					    if (rename)
						    locationtext.value = dialog.mLauncher.suggestedFileName;
					    if (encodingConvert) {
					        locationtext.addEventListener("command", function (e) {
							    if (rename)
                                    locationtext.value = e.target.value;
                                    document.title = "Opening " + e.target.value;
                            });
					        let menupopup = locationtext.appendChild(document.createElement("menupopup"));
                            let menuitem = menupopup.appendChild(document.createElement("menuitem"));
                            menuitem.value = dialog.mLauncher.suggestedFileName;
                            menuitem.label = "Original: " + menuitem.value;
					        if (!rename)
				        	locationtext.value = menuitem.value;
                            let converter = Components.classes['@mozilla.org/intl/scriptableunicodeconverter']
                                .getService(Components.interfaces.nsIScriptableUnicodeConverter);
				        	function createMenuitem(encoding) {
                                converter.charset = encoding;
                                let menuitem = menupopup.appendChild(document.createElement("menuitem"));
                                menuitem.value = converter.ConvertToUnicode(orginalString).replace(/^"(.+)"$/, "$1");
                                menuitem.label = encoding + ": " + menuitem.value;       
                            }
                            ["GB18030", "BIG5", "Shift-JIS"].forEach(function (item) { createMenuitem(item) });	
                        }
				    }
				}
                document.querySelector("#location").hidden = true;
                document.querySelector("#locationtext").hidden = false;
            } else {
                document.querySelector("#locationtext").hidden = true;
                document.querySelector("#location").hidden = false;
            }
        }, false)
		if (locking)
		    dialog.dialogElement("save").click();
        else
            dialog.dialogElement("save").selected && dialog.dialogElement("save").click();
        window.addEventListener("dialogaccept", function() {
            if ((document.querySelector("#locationtext").value != dialog.mLauncher.suggestedFileName) && dialog.dialogElement("save").selected) {
                var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
                mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, document.querySelector("#locationtext").value, null, null, null, null, null, null, mainwin.document, Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getBoolPref("browser.download.useDownloadDir"), null);
                document.documentElement.removeAttribute("ondialogaccept");
            }
        }, false);
	}
	//作用於 main 窗口
	function download_dialog_changeName_on_main() {
	    const obsService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);
        const RESPONSE_TOPIC = 'http-on-examine-response';

        var respObserver = {
            observing: false,
            observe: function (subject, topic, data) {
                try {
                    let channel = subject.QueryInterface(Ci.nsIHttpChannel);
                    let header = channel.contentDispositionHeader;
                    let associatedWindow = channel.notificationCallbacks
                                            .getInterface(Components.interfaces.nsILoadContext)
                                            .associatedWindow;
                    associatedWindow.localStorage.setItem(channel.URI.spec, header.split("=")[1]);
                } catch (ex) { }
            },
            start: function () {
                if (!this.observing) {
                    obsService.addObserver(this, RESPONSE_TOPIC, false);
                    this.observing = true;
                }
            },
            stop: function () {
                if (this.observing) {
                    obsService.removeObserver(this, RESPONSE_TOPIC, false);
                    this.observing = false;
                }
            }
        };

        respObserver.start();
        addEventListener("beforeunload", function () {
            respObserver.stop();
        })
	}
	
	
	// 另存為...
    function download_dialog_saveas() {
        var saveas = document.documentElement.getButton("extra1");
        saveas.setAttribute("hidden", "false");
        saveas.setAttribute("label", "\u53E6\u5B58\u65B0\u6A94");
        saveas.setAttribute("oncommand", 'var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser"); mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : dialog.mLauncher.suggestedFileName), null, null, null, null, null, null, mainwin.document, 0, null);close()');
    }
	
	// 保存到...
	function download_dialog_saveTo() {
	//目錄路徑的反斜槓\要雙寫\\
	//第一次使用要修改路徑，否則無法下載
	//如果使用Firefox3.6 + userChromeJS v1.2,則路徑中的漢字要轉義為\u6C49\u5B57編碼類型,否則會出現亂碼
        var cssStr = (function(){/*
        button[label="\4FDD\5B58\5230"] .dropmarker-icon{
                display:none;
        }
        button[label="\4FDD\5B58\5230"]::after{
                content:"";
                display:-moz-box;
                width:8px;
                height:19px;
                margin-left:-20px;
                -moz-appearance: menulist-button;
        }
        button[label="\4FDD\5B58\5230"][disabled]::after{
                opacity:.3;
        }
        */}).toString().replace(/^.+\s|.+$/g,"");
        var style = document.createProcessingInstruction("xml-stylesheet", "type=\"text/css\"" + " href=\"data:text/css;base64," + btoa(cssStr) + "\"");
        document.insertBefore(style,document.firstChild);
	    var dir = [
		["E:\\Download\\軟體", "軟體"],
		["E:\\Download\\影片", "影片"],
		["E:\\Download\\漫畫", "漫畫"],
		["E:\\Download\\其他", "其他"]
	    ];
	    var saveTo = document.documentElement._buttons.cancel.parentNode.insertBefore(document.createElement("button"), document.documentElement._buttons.cancel);
	    var saveToMenu = saveTo.appendChild(document.createElement("menupopup"));
	        saveTo.classList.toggle("dialog-button");
	    saveTo.label = "\u5132\u5B58\u5230...";
	        saveTo.type = "menu";
	    dir.forEach(function (dir) {
	    	var [name, dir] = [dir[1], dir[0]];
	    	var item = saveToMenu.appendChild(document.createElement("menuitem"));
	    	item.setAttribute("label", (name || (dir.match(/[^\\/]+$/) || [dir])[0]));
	    	item.setAttribute("image", "moz-icon:file:///" + dir + "\\");
	    	item.setAttribute("class", "menuitem-iconic");
	    	item.onclick = function(){var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(dir.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path) + "\\" + (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : document.querySelector("#location").value)); dialog.mLauncher.saveToDisk(file,1); dialog.onCancel = function(){};close();};
	    })	
	}
		
	// 下載彈出窗口雙擊鏈接複製完整鏈接
	function download_dialog_showCompleteURL() {
	    var s = document.querySelector("#source");
        s.value = dialog.mLauncher.source.spec;
        s.setAttribute("crop", "center");
        s.setAttribute("tooltiptext", dialog.mLauncher.source.spec);
        s.setAttribute("ondblclick", 'Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(dialog.mLauncher.source.spec)')
    }
	
	// 下載彈出窗口雙擊保存文件項執行下載
	function download_dialog_doubleclicksaveL() {
        addEventListener("dblclick", function (event) {
            event.target.nodeName === "radio" && document.documentElement.getButton("accept").click()
        }, false)
    }	
})();