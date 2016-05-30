// ==UserScript==
// @name                 OpenProfFolder.uc.js
// @description       快速打开指定文件夹
// @labelspace        http://www.runningcheese.com
// @author               runningcheese
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2016.1.11             
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

CustomizableUI.createWidget({
	id: 'OpenProfFolder',
	type: 'custom',
	defaultArea: CustomizableUI.AREA_NAVBAR,
	onBuild: function(aDocument) {
		var aLists = [{
			label: "Profiles",
			tooltiptext: "配置文件夹",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'run_Profiles();',
		}, {
			label: "Chrome",
			tooltiptext: "脚本文件夹",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'run_Chrome();',
		}, {
			label: "Images",
			tooltiptext: "图像文件夹",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'run_Images();',
		}, {
			label: "Software",
			tooltiptext: "工具文件夹",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'run_Software();',
		}, {
			label: "Application",
			tooltiptext: "火狐根目录",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'run_Application();',
		}, 
		{label: "sep"}, 
		{
			label: "About:config",
			tooltiptext: "about:config",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'gBrowser.selectedTab = gBrowser.addTab("about:config");',
		}, {
			label: "About:about",
			tooltiptext: "about:about",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'gBrowser.selectedTab = gBrowser.addTab("about:about");',
		}, {
			label: "User.js",
			tooltiptext: "user.js",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg==",
			oncommand: 'run_userjs();',
		}, 
		{label: "sep"}, 
		{
			label: "如何使用?",
			tooltiptext: "如何使用文件夹快捷打开？",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEUAAABAQEBERERMTExFRUVOTk5OTk5OTk5PT09LS0tKSkpPT09GRkZISEhJSUlISEhNTU1OTk6jJnUjAAAAEnRSTlMA+umE3Ss4JQuSmRXWvrjIXkG3I7t/AAAAeklEQVQY02VP0RaFIAhjKElp3dv//2wT6ak9eIDB3GSiVAC1SGJTLSZWVLfV4/ATGCYHYqK7nMP6pSK7znsVR2OBTpI61GqVfYeTZUU2cA0+Bg6i5fkkHO9Gxy25sfy0XzqMXwj/x0BL+IjdJZROJZBOM4u/WT5pP3gAao8CUlKco+oAAAAASUVORK5CYII=",
			oncommand: 'gBrowser.selectedTab = gBrowser.addTab("about:about");',
		}, ];

		OpenProfFolder = {
			onClick: function(event) {
				switch (event.button) {
					case 2:
						event.preventDefault();
						run_editOpenProfFolder();
						break;
				}
			}
		}

		var aMenu = aDocument.createElement('toolbarbutton');
		aMenu.setAttribute('id', 'OpenProfFolder');
		aMenu.setAttribute('class', 'toolbarbutton-1 chromeclass-toolbar-additional');
		aMenu.setAttribute('type', 'menu');
		aMenu.setAttribute('label', '文件夹');
		aMenu.setAttribute('tooltiptext', '左键：打开指定文件夹\n右键：编辑此脚本');
		//aMenu.setAttribute('context', 'OpenProfFolderPopup');
		aMenu.setAttribute('onclick', 'OpenProfFolder.onClick(event);');

		var aPopup = aDocument.createElement('menupopup');
		aPopup.setAttribute('id', 'OpenProfFolderPopup');
		aMenu.appendChild(aPopup);

		for (var i in aLists) {
			if (aLists[i].label == "sep") {
				var menuseparator = aDocument.createElement("menuseparator");
				aPopup.appendChild(menuseparator);
			} else {
				var aItem = aDocument.createElement('menuitem');
				aItem.setAttribute('label', aLists[i].label);
				aItem.setAttribute('tooltiptext', aLists[i].tooltiptext);
				aItem.setAttribute('class', 'menuitem-iconic');
				aItem.setAttribute('oncommand', aLists[i].oncommand);
				aItem.setAttribute('image', aLists[i].image);
				aPopup.appendChild(aItem);
			}
		}

		return aMenu;
	},
});

var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
 + '#OpenProfFolder {'
 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA+0lEQVQ4y62SPU7DQBCFvzdKPMoFLP5yDkC5QETBIXISX4AmFUgcgYaLuEtFFRpfACHtNkNjIxM5zo940mo1O/s+zYwGRmRmlZlVnCMzq9x9I6k+GdKZgRIoD0LMbOnujbtHezpzp1JS3cs3Zrb8zbYPixMqXLh70wfE0McpzCStJdWSHvu5P559AElrIAHvQAE87HrUBSklDQDqiPgGtpI8Im6Au75nMtLqPCIuJTURcR0R95JeIgaKHWhhLukD2AJNO4OnKcyOmUFnbtp7PlTeXoCkV+BrzHwIcAs8A1dju7ALOHuRJgA551VRFG/AxTGAlNJnznnFf+gHPttao1uWCmgAAAAASUVORK5CYII=)'
 + '}}'
 + '#OpenProfFolder[cui-areatype="menu-panel"], toolbarpaletteitem[place="palette"]> #OpenProfFolder {'
 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMA9+7l1PLN+9mAMC0OB+iifN2pnIyHX1XBujMmA06HCK0AAACVSURBVDjLzdLJDoQgDIDhFkpRFFzGZbb3f845mV5KJ/Fg/E8k/S4U4B4VlOJTASHLOXkFOJC68rVB9k76CFCjXQChUkTkA8QetPpwAAQ9dxa0zWaCNY6TBVb/wsUAre+aB+hA5hqQ+WDcYvSJhso1ZV4He0g0W4viqczWJt+OFnPVectQAfzvscAEQX6L/mEYqzFc0Q++XQRNE0juCwAAAABJRU5ErkJggg==)'
 + '}}'
;
var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

/*function函数指定*/
function run_Profiles() {
     var canvas = Components.classes["@mozilla.org/file/directory_service;1"].  getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();
}
  
function run_Chrome() {
    var canvas = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
}
  
function run_Images() {
    var file = Services.dirsvc.get('ProfD', Ci.nsILocalFile); file.appendRelativePath("extensions\\userChromeJS_Mix@develop.com\\content\\images"); file.launch();
}
  
function run_Software() {
     var path ="..\\..\\..\\Software\\";
     var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();;
}
  
function run_Application() {
    var path ="..\\..\\..\\..\\";
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();;
}
  
function run_userjs() {
    var file = Services.dirsvc.get('ProfD', Ci.nsILocalFile); file.appendRelativePath("user.js"); file.launch();
}
  
function run_editOpenProfFolder() {
    var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile); file.appendRelativePath("SubScript\\OpenProfFolder.uc.js"); file.launch();
}