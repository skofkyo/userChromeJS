/* 重用空白頁、新標簽頁，可自由添加 */
function _LoadURL(aTriggeringEvent, aPostData)
{
    var where = (gBrowser.currentURI.spec!='about:home' ||
        gBrowser.webProgress.isLoadingDocument) ? 'tab' :
        'current';
    if (gURLBar.value!='') openUILinkIn(gURLBar.value, where);
    return true;
}
function IsBlankPage(url)
{
    return url==""||url=="about:blank"||url=="about:home"||url=="about:newtab"||url=="http://start.firefoxchina.cn/";
}