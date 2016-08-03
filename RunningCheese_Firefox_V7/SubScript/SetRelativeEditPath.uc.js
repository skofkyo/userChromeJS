//指定相对路径文本编辑器
location == 'chrome://browser/content/browser.xul' && (function(){

    var PATH1 = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\..\\Software\\Notepad2.exe";
    
    var handleRelativePath = function (path) {
        if (path) {
        path = path.replace(/\//g, '\\').toLocaleLowerCase();
        var ProfD = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties)
                .get("ProfD", Ci.nsILocalFile).path;
        if (/^(\\)/.test(path)) {
            return ProfD + path;
        } else {
            return path;
            }
        }
    };
    
//Firefox自带全局编辑器和Greasemonkey编辑器
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH1));
    if (file.exists()) {
        gPrefService.setCharPref('view_source.editor.path', file.path);
        gPrefService.setCharPref('extensions.greasemonkey.editor', file.path);
    }
    
       
})()