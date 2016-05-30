// ==UserScript==
// @name         Stylish Custom2
// @description  在Stylish編輯窗口中增加一些小功能
// @namespace    stylishCustom2@uc.js
// @author       Crab
// @include      about:stylish-edit*
// @version      0.0.3.20150805
// @charset      UTF-8
// @homepageURL  http://tieba.baidu.com/p/2541544018
// @downloadURL  https://raw.githubusercontent.com/lychichem/Userchromejs/master/StylishCustom2_0.0.3.uc.js
// ==/UserScript==
if(location.href.indexOf('about:stylish-edit') == 0) {
/* 
// 1.取消預覽:  恢復 預覽 至未保存時的狀態(實質上是將保存前的樣式再一次"預覽")
// 2.鍵盤輸入"!"時自動補全為"!important;"
// 3.注釋按鈕(ctrl+/)
// 4.插入鏈接:檢測當前打開的窗口和標簽列出其地址鏈接;
//		左鍵菜單項直接插入對應的鏈接;
//		中鍵或右鍵則插入包含@-moz-document url("")的鏈接
// 5.插入文本:第一個子菜單為文檔規則,其余為一些常用的文本 
// 6.顯示行和列，在行文本框內輸入正整數回車可跳轉之對應行
*/
	var stylishCustom2 = {

		_revertOldFindbar: true, //還原舊查找欄(默認關閉，若開啟請將 false , 改為 true);

		insertRules: {
			//可以在text中按格式加入一些常用的屬性或文本
			text: [
				'/* AGENT_SHEET */',
				'-moz-box-ordinal-group:',
				'-moz-linear-gradient',
				'vertical-align:middle',
				'text-decoration:underline',
				['::before 偽元素', '::before {\n\tcontent: ""\n}', 3], // 插入模板塊數組，
				['::after 偽元素', '::after {\n\tcontent: ""\n}', 3],	// 參數 0：菜單名，
																		// 參數 1：插入內容，其中\n代表換行符，\t為制表符（tab）。
																		// 參數 2：插入內容後光標所在對應內容倒數位置，可忽略默認為0，即最末
			],
			domRules: {
				'url("")': '@-moz-document url(""){\n\n}',
				'url-prefix("")': '@-moz-document url-prefix(""){\n\n}',
				'domain("")': '@-moz-document domain(""){\n\n}',
				'regexp("")': '@-moz-document regexp(""){\n\n}'
			}
		},

		locale : ['en-US', 'zh-TW'].indexOf(Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getCharPref('general.useragent.locale')),

		_localeText: {
			unperview: ['UnPerview', '取消預覽'],
			lineNumber: ['Ln: ', '行: '],
			colNumber: [',Col: ', ',列: '],
			comment: ['Comment', '注釋'],
			save: ['Save', '保存'],
			insertURL:['Insert URL', '插入鏈接'],
			insertText:['Insert Text', '插入文本'],
			saveAndClose: ['Save & Close', '保存並關閉'],
			documentRules:['Document Rule', '文檔規則'],
			chromeMenu: ['Chrome URL', 'Chrome 路徑'],
		},

		localeText: function(name){
			return this._localeText[name][this.locale == -1 ? 0 : this.locale];
		},

		oldPreview: null,
		init: function () {
			if(document.getElementById('stylishCustomToolbar') || !sourceEditor || sourceEditorType == 'textarea') return;
			eval('save=' + save.toString().replace(/(?=return true;\s+}$)/, 'if(typeof(stylishCustom2)!=\'undefined\'){stylishCustom2.oldPreview = codeElementWrapper.value;document.getElementById(\'unperview\').setAttribute(\'disabled\',true);}\n'));
			eval('enableSave=' + enableSave.toString().replace(/(?=\}$)/, 'if(typeof(stylishCustom2)!=\'undefined\'){document.getElementById(\'saveAndClose\').setAttribute(\'disabled\', !enabled);}\n'));
			eval('preview=' + preview.toString().replace('setTimeout', 'if(typeof(stylishCustom2)!=\'undefined\'){document.getElementById(\'unperview\').setAttribute(\'disabled\',false);}$&'));

			this.setToolButtons();
			this.setShortcuts();
			this.oldPreview = codeElementWrapper.value;
			this.revertOldFindbar();
			sourceEditor.on('cursorActivity', this.setLineAndcolNum.bind(this));
		},

		setToolButtons: function () {
			var _et = document.getElementById('editor-tools'),
				cE = this.createElement,
				editortools = cE('hbox', {id: 'stylishCustomToolbar'}, [_et.parentNode, _et.nextSibling]),
				insertMenupopup =  document.getElementById('insert-data-uri').parentNode;
			//工具欄按鈕

			//保存並關閉按鈕
			cE('button', {id: 'saveAndClose', class: 'devtools-toolbarbutton', label: this.localeText('saveAndClose'), disabled: true, onclick: function(){
				'save' in window  && window.save() && codeElementWrapper.value && window.nameE.value && window.setTimeout(window.close, 200);
			}}, editortools);
			//注釋按鈕
			cE('button', {id: 'comment', class: 'devtools-toolbarbutton', label: this.localeText('comment'), onclick: this.setComment}, editortools);
			//預覽按鈕
			this.unperview = cE('button', {id: 'unperview', class: 'devtools-toolbarbutton', label: this.localeText('unperview'), onclick: this.unperview.bind(this)}, editortools);

			cE('spacer', {flex: '1'}, editortools);
			cE('label', {style: 'max-height: 20px; margin:7px 0 4px 0;', value: this.localeText('lineNumber')}, editortools);
			(this.lineNumber = cE('textbox', {id:'lineNumber', class: 'devtools-textinput', style: 'padding: 0; width:40px; max-height: 20px; margin:5px 0;', onkeydown: this.goToLine.bind(this)}, editortools)).value = 1;
			this.colNumber = cE('label', {id:'colNumber', style: 'width:50px; max-height: 20px; margin:7px 0 4px 2px;', value: this.localeText('colNumber') + '0'}, editortools);
			//插入鏈接菜單
			cE('menupopup', {onpopupshowing: 'stylishCustom2.showDocumentList(event,false);'},
				cE('menu', {id:'insertURLMenu',  label: this.localeText('insertURL')}, insertMenupopup));
			//插入文本菜單
			var insertTextMenupopup = cE('menupopup', {}, 
					cE('menu', {id:'insertTextMenu',  label: this.localeText('insertText')}, insertMenupopup));
			//插入文檔規則
			var documentRules = cE('menupopup', {}, cE('menu', {id:'documentRules', label: this.localeText('documentRules')}, insertTextMenupopup));
			var {text, domRules} = this.insertRules;
			for(var i in domRules){
				cE('menuitem', {label: i, onclick: this.insertString.bind(null, domRules[i], 6)}, documentRules);
			}
			cE('menuseparator', {}, insertTextMenupopup);
			for(var i in text){
				cE('menuitem', {label: Array.isArray(text[i]) ? text[i][0] : text[i], onclick: this.insertString.bind(null, text[i])}, insertTextMenupopup);
			}

		},

		setLineAndcolNum: function(){
			var {line, ch} = sourceEditor.getCursor();
			this.lineNumber.value = line + 1;
			this.colNumber.value = this.localeText('colNumber') + ch;
		},

		goToLine: function(event){
			if(event.keyCode == 13 || event.keyCode == 108){
				event.preventDefault();
				var l = parseInt(event.target.value);
				if(isNaN(l) || l <= 0) return;
				sourceEditor.setCursor({line: l - 1, ch: 0});
				sourceEditor.focus();
			}
		},

		unperview: function(){
			style.name = nameE.value;
			style.code = stylishCustom2.oldPreview;
			this.unperview.setAttribute('disabled', true);
			document.getElementById('preview-button').removeAttribute('disabled');
			document.getElementById('errors').style.display = 'none';
			setTimeout(function () {
				style.setPreview(true);
			}, 50);
		},

		setComment: function(){
			var selText = sourceEditor.getSelection();
			if(!selText) return;
			var [from, to] = [sourceEditor.getCursor('start'), sourceEditor.getCursor('end')],
				re = /(^[\W\s]*?\/\*)((?:(?!\/\*|\*\/)[\s\S])*?)(\*\/[\W\s]*?$)/;
			if(!re.test(selText)){
				if(!/\/\*|\*\//.test(selText)){
					sourceEditor.replaceSelection('/*' + selText + '*/');
					sourceEditor.setSelection(from, {line: to.line, ch: to.ch + (from.line == to.line ? 4 : 2)});
				}
			}else{
				var reg = selText.match(re);
				sourceEditor.replaceSelection(reg[1].replace(/\/\*$/g, '') + reg[2] + reg[3].replace(/^\*\//g, ''));
				sourceEditor.setSelection(from, {line: to.line, ch: to.ch - (from.line == to.line ? 4 : 2)});
			}
			sourceEditor.focus();
		},

		setShortcuts: function(){
			sourceEditor.config.extraKeys['Shift-1'] = function(e){
				sourceEditor.replaceSelection(' !important;');
			};
			sourceEditor.config.extraKeys['Ctrl-/'] = this.setComment.bind(this);
		},

		insertString: function (str, range) {
			if(Array.isArray(str)){
				sourceEditor.replaceSelection(str[1]);
				range = str[2] || range || 0;
			}else{
				sourceEditor.replaceSelection(str);
			}
			if(range)
				sourceEditor.setCursor(sourceEditor.getPosition(sourceEditor.getOffset(sourceEditor.getCursor('end')) - range));
			sourceEditor.focus();
		},

		revertOldFindbar: function(){
			if(!this._revertOldFindbar) return;
			Object.defineProperty(codeElementWrapper, 'scrollElement', {get: function(){
				if(sourceEditorType == 'sourceeditor')
					return sourceEditor.container.contentDocument.getElementsByClassName('CodeMirror-code')[0];
				return sourceEditor.inputField;
			}});
			finder.requestMatchesCount = function(){};
			var findBar = document.getElementById('findbar');
			Object.defineProperty(findBar.browser, '_lastSearchString', {get: function() finder.searchString});
			findBar.browser.finder = finder;
			findBar.open();
		},

		showDocumentList: function (event, isChrome) {
			var menu = event.target,
				ww = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator),
				windows = ww.getXULWindowEnumerator(null),
				docs = [],
				cE = this.createElement;
			while (windows.hasMoreElements()) {
				try {
					var windowDocShell = windows.getNext().QueryInterface(Components.interfaces.nsIXULWindow).docShell;
					this.appendContainedDocuments(docs, windowDocShell,
					isChrome ? Components.interfaces.nsIDocShellTreeItem.typeChrome : Components.interfaces.nsIDocShellTreeItem.typeContent);
				} catch (ex) {
					Components.utils.reportError(ex);
				}
			}
			this.emptyChildren(menu);
			if(!isChrome && menu.id != 'chromeMenu'){
				cE('menuseparator', {},
					cE('menupopup', {},
						cE('menu', {
							id: 'chromeMenu',
							label: this.localeText('chromeMenu'),
							onpopupshowing:'event.stopPropagation();stylishCustom2.showDocumentList(event,true);'
					}, menu)
				).parentNode.parentNode);
			}
			if (!docs.length) {
				cE('menuitem', {label: '(None)', disabled: true}, menu);
			} else {
				for (var i = 0; i < docs.length; i++) {
					this.addMenuItem(menu, docs[i]);
				}
			}
		},

		appendContainedDocuments: function (array, docShell, type) {
			var containedDocShells = docShell.getDocShellEnumerator(type,
			Components.interfaces.nsIDocShell.ENUMERATE_FORWARDS);
			while (containedDocShells.hasMoreElements()) {
				try {
					var childDoc = containedDocShells.getNext().QueryInterface(Components.interfaces.nsIDocShell)
						.contentViewer.DOMDocument;
					if (type == 0 && docShell.contentViewer.DOMDocument.location.href == childDoc.location.href && childDoc.location.href != 'about:blank') {
						array.push(childDoc);
					}
					if (type == 1 && docShell.contentViewer.DOMDocument.location.href != childDoc.location.href && (childDoc.location.href != 'about:blank' ||childDoc.URL == childDoc.baseURI)) {
						if(childDoc.location.href == 'about:blank' && childDoc.URL != childDoc.baseURI || (childDoc.defaultView && childDoc.defaultView.frameElement != null)) 
							continue;
						array.push(childDoc);
					}
				} catch (ex) {
					console.log(ex + '\n');
				}
			}
		},

		emptyChildren: function (node) {
			while (node.hasChildNodes()) {
				node.removeChild(node.lastChild);
			}
		},

		createElement: function(name, attr, parent){
			var e = document.createElementNS(
					'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', name);
			if(attr){
				for (var i in attr) {
					if(typeof attr[i] == 'function' || (i == 'value' && (name == 'textbox' || name == 'menuitem')))
						e[i] = attr[i];
					else
						e.setAttribute(i, attr[i]);
				}
			}
			if(parent){
				if(parent instanceof Array){
					parent[0].insertBefore(e, parent[1]);
				}else{
					parent.appendChild(e);
				}
			}
			return e;
		},

		addMenuItem: function (parent, doc) {
			this.createElement('menuitem', {
				label: doc.title || doc.location.href, 
				tooltiptext: doc.location.href, 
				onclick: function (e) {
					if (e.button != 0) 
						stylishCustom2.insertString('@-moz-document url("' + e.target.getAttribute('tooltiptext') + '"){\n\n}', 2);
					else
						stylishCustom2.insertString(e.target.getAttribute('tooltiptext'));
					stylishCustom2.closeMenus(this);
				}
			}, parent);
		},

		closeMenus: function (node) {
			if ('tagName' in node) {
				if (node.namespaceURI == 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul' && (node.tagName == 'menupopup' || node.tagName == 'popup')) node.hidePopup();
				this.closeMenus(node.parentNode);
			}
		}
	}
	setTimeout(stylishCustom2.init.bind(stylishCustom2), 150);
}
(function winhook(aWindow) {
    // get the checkbox
    var checkbox = aWindow.document.getElementById("wrap-lines");

    if (aWindow.document.getElementById("internal-code")) {} //ver 1.0 のとき color picker と importantを入れる

//External Editor///////////////////////////////////////////////////////////////////////////////////
    //if(typeof ItsAllText != 'undefined') return;
    // add External Editor button
    button = aWindow.document.createElement("button");
    button.setAttribute("label", "外部編輯");
    button.setAttribute("accesskey","T");
    checkbox.parentNode.insertBefore(button, checkbox);

    // add click event to button
    button.addEventListener("click", function() {
      if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
        var textarea = aWindow.document.getElementById("sourceeditor");
        editinit();
        edittarget(textarea);
      } else {
        var textarea = aWindow.document.getElementById("code");
        if (!textarea)
          textarea = aWindow.document.getElementById("internal-code");
        try{
          editinit();
          edittarget(textarea);
        }catch(e){}
      }
    }, false);

////Extarnal Edittor functions///////////////////////////////////////////////////////////////////////

    //Extarnal Edittor functions
    //
    var _editor,_tmpdir = null,_dir_separator,_os;
    var _ext,_encode,_target=[];

    function editinit(){
      if(window.navigator.platform.toLowerCase().indexOf("win") != -1){
        _editor = "C:\\WINDOWS\\notepad.exe";             /* windows */
        //_editor = "C:\\progra~1\\hidemaru\\hidemaru.exe"; /* windows */
        _dir_separator = '\\';                            /* windows */
        _os = 'win';                                      /* windows */
      }else{
        _editor = "/bin/vi";      /* unix */
        _dir_separator = '/';     /* unix */
        _os = 'unix';             /* unix */
      }
      _ext = "css";
      _encode = 'UTF-8';
      _target = [];

      window.addEventListener("unload", function(){ edituninit(); }, false);
      aWindow.addEventListener("unload", function(){
        aWindow.document.removeEventListener("focus", function(){ checkfocus_window(); }, true);
      }, false);
    }

    function edituninit(){
      if(_tmpdir == null) return;
      var windowType = "navigator:browser";
      var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
      var windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator);
      var enumerator = windowManagerInterface.getEnumerator(windowType);
      if (enumerator.hasMoreElements()) {
        return;
      }
      var file = Components.classes["@mozilla.org/file/local;1"]
                           .createInstance(Components.interfaces.nsILocalFile);
      file.initWithPath(_tmpdir);
      var entries = file.directoryEntries;
      while (entries.hasMoreElements()) {
        var entry = entries.getNext().QueryInterface(Components.interfaces.nsIFile);
        if (/^ucjs.textarea\./i.test(entry.leafName)){
          try{
            entry.remove(false);
          }catch(e){}
        }
      }

      try{
        if( file.exists() == true ) file.remove(false);
      }catch(e){}
      _tmpdir = null;
    }

    function checkfocus_window(){
      var target, filename, timestamp, encode, file, inst, sstream, utf, textBoxText
      if (_target.length<=0) return;
      file = Components.classes["@mozilla.org/file/local;1"].
                     createInstance(Components.interfaces.nsILocalFile);
      istr = Components.classes['@mozilla.org/network/file-input-stream;1'].
              createInstance(Components.interfaces.nsIFileInputStream);
      // FileInputStream's read is [noscript].
      sstream = Components.classes["@mozilla.org/scriptableinputstream;1"].
              createInstance(Components.interfaces.nsIScriptableInputStream);
      utf = Components.classes['@mozilla.org/intl/utf8converterservice;1'].
            createInstance(Components.interfaces.nsIUTF8ConverterService);

      for(var i=0,len=_target.length;i<len;i++){
        target = _target[i];
        if(!target.hasAttribute("filename")) continue;
        filename = target.getAttribute("filename");
        timestamp = target.getAttribute("timestamp");
        file.initWithPath(filename);
        if(!file.exists() || !file.isReadable()) continue;
        if(file.lastModifiedTime <= timestamp) continue;

        target.setAttribute("timestamp", file.lastModifiedTime);

        istr.init(file, 1, 0x400, false);
        sstream.init(istr);

        textBoxText = sstream.read(sstream.available());
        encode = target.getAttribute("encode");
        if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
          aWindow.sourceEditor.setText(utf.convertStringToUTF8(textBoxText, encode, true));
        } else {
          if(textBoxText.length)
            target.value = utf.convertStringToUTF8(textBoxText, encode, true);
          else
            target.value = "";
        }
				enableSave(true);
				enablePreview(true);
				enableCheckForErrors(true);

        sstream.close();
        istr.close();
        try{file.remove(false);}catch(e){}
      }
    }


    function editfile(target,filename){
      // Figure out what editor to use.
      var editor = _editor;
      var file = Components.classes["@mozilla.org/file/local;1"].
          createInstance(Components.interfaces.nsILocalFile);
      file.initWithPath(editor);
      if(!file.exists()){
        alert("Error_invalid_Editor_file");
        return false;
      }
      if(!file.isExecutable()){
        alert("Error_Editor_not_executable");
        return false;
      }
      target.setAttribute("filename", filename);
      target.setAttribute("timestamp", file.lastModifiedTime);

      // Run the editor.
      var process = Components.classes["@mozilla.org/process/util;1"].
          createInstance(Components.interfaces.nsIProcess);
      process.init(file);
      var args = [filename];
      process.run(false, args, args.length);  // don't block
      aWindow.document.addEventListener("focus", function(){ checkfocus_window(); }, true);
      return true;
    }

    function edittarget(target){
  		if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
  			var textBoxText = aWindow.sourceEditor.getText();
  		} else {
        var textBoxText = target.value;
      }
      // Get filename.
      var file = Components.classes["@mozilla.org/file/local;1"].
                 createInstance(Components.interfaces.nsILocalFile);
      if(target.hasAttribute("filename")){
        var filename = target.getAttribute("filename");
        file.initWithPath(filename);
        try{
          if( file.exists() == true ) file.remove(false);
        }catch(e){}
      }else{
        var filename = TmpFilenameTextarea();
      }
      file.initWithPath(filename);
      file.create(file.NORMAL_FILE_TYPE, parseInt(600,8));

      // Write the data to the file.
      var ostr = Components.classes['@mozilla.org/network/file-output-stream;1'].
            createInstance(Components.interfaces.nsIFileOutputStream);
      ostr.init(file, 2, 0x200, false);

      if(navigator.platform == "Win32"){
        // Convert Unix newlines to standard network newlines.
        textBoxText = textBoxText.replace(/\n/g, "\r\n");
      }
      var conv = Components.classes['@mozilla.org/intl/saveascharset;1'].
            createInstance(Components.interfaces.nsISaveAsCharset);
      try{
        conv.Init(_encode, 0, 0);
        textBoxText = conv.Convert(textBoxText);
      }catch(e){
        textBoxText = "";
      }
      ostr.write(textBoxText, textBoxText.length);

      ostr.flush();
      ostr.close();

      // setup target info
      target.setAttribute("encode", _encode);

      // Edit the file.
      if(editfile(target,file.path)){
        _target.push(target); // Editting target array
      }
    }

    //Compose temporary filename out of
    //    - tmpdir setting
    //    - document url
    //    - textarea name
    //    - ext suffix
    function TmpFilenameTextarea(){
      var TmpFilename;
      _tmpdir = gettmpDir();
      do{
        TmpFilename = _tmpdir + _dir_separator + "ucjs.textarea." +
                      Math.floor( Math.random() * 100000 ) + "." + _ext;
      }while(!ExistsFile(TmpFilename))
      return TmpFilename;
    }

  //Function returns true if given filename exists
    function ExistsFile(filename){
      try{
        var file = Components.classes["@mozilla.org/file/local;1"].
                   createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(filename);
        return true;
      }catch(e){
        return false;
      }
    }
    /**
    * Returns the directory where we put files to edit.
    * @returns nsILocalFile The location where we should write editable files.
    */
    function gettmpDir() {
      /* Where is the directory that we use. */
      var fobj = Components.classes["@mozilla.org/file/directory_service;1"].
        getService(Components.interfaces.nsIProperties).
        get("ProfD", Components.interfaces.nsIFile);
      fobj.append('Temp_ExternalEditor');
      if (!fobj.exists()) {
        fobj.create(Components.interfaces.nsIFile.DIRECTORY_TYPE,
                    parseInt('0700',8));
      }
      if (!fobj.isDirectory()) {
        alert('Having a problem finding or creating directory: '+fobj.path);
      }
      return fobj.path;
    }
  })(window);
