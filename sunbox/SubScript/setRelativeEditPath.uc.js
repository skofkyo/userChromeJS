//指定相对路径文本编辑器
location == 'chrome://browser/content/browser.xul' && (function(){

    var PATH = '/chrome/Software/Notepad2.exe';

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

    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH));
    if (file.exists()) {
        gPrefService.setCharPref('view_source.editor.path', file.path);
    }
    
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH));
    if (file.exists()) {
        gPrefService.setCharPref('extensions.greasemonkey.editor', file.path);
    }

})()