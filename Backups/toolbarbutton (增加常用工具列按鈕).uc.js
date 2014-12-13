location == "chrome://browser/content/browser.xul" && (function () {
//重新啟動並清除啟動緩存
var toolbarbutton001 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[2]);
toolbarbutton001.setAttribute("id", "toolbarbutton001");
toolbarbutton001.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
toolbarbutton001.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACYElEQVR4Xr3QX0hTDxQH8O/utusUd6feaRqmC7JShjlTakEkhYQ9lMz+QMNK9qBZIeHi54NEaIkZkTIDiSKYUJGaGoo9lBVGQqRkqbXM/IdZykT885t6d+/pgouQEvSlDxwOnMN5OF/8U9GOfv7YtbpyAH7wYbCC9bYKBcyZWm5vVkgQr1cju1lpTeCrkw9azq3T86lYifpyL7vjdp+t9tNsz5cZmhteoMX6HvdYRmnNIw+RZO8mOmEvbgCg+uNYU/Ix/GjLdGfNMFFBJ1HOayKbXPcGiN5NEV2QZ2kvifJbJ6cBGJa/UNTDbTREtS2wWtOb70D/j3mMTXqgFgm3eoGUx4DTJc/dwGcEa3ead2UAUOCX4JvjVZyTKLNVIpQMEYq+ijjTPIGifiG3jejQE6IDLUSJDURmuRdWP+sCELD0x+l6ThnAW40hwNtBNyICsTiWb6yAWvPqeJO7NlYPxPKAKAHzIjAwB/SxKXE6fzZBBRnDssZAjgmc8YgwRWjw9OKpJgj/l+LS+xuNw1DLgUKQr8krAZIvbB2nDIpLSYcMqpz7WRY5HNPDOXJ0CQIAC5bwiN5eiA2mMoTHFoM3/AdtaB40umz4604CSFRBJk5NCMnhwLibwdZgiABGsMSNoY4rvrAIvxGWSbLGF7tIsj73kmuWvEoF9mGVGMjQWdd7p7HjQ9oWJVoGobSfzzvs260BFxm/7e7IZOUoUaWLFvenH8n1U4DFmig0Rtic7YYHgjemgSiq6tto2NXuF2ed7dcjIqNCsUoaMOrdTNimAi4muYwz7nFsNqeWA0jCX/wEyzz6gyhfsLsAAAAASUVORK5CYII=";
toolbarbutton001.setAttribute("label", "\u91CD\u65B0\u555F\u52D5");
toolbarbutton001.setAttribute("tooltiptext", "\u91CD\u65B0\u555F\u52D5");
toolbarbutton001.setAttribute("oncommand", 'Services.appinfo.invalidateCachesOnRestart()||Application.restart()');
//打開附加元件管理員
var toolbarbutton002 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[3]);
toolbarbutton002.setAttribute("id", "toolbarbutton002");
toolbarbutton002.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
toolbarbutton002.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACkUlEQVQ4T43T60tTYRwH8HMQ9QQJRSBJ50xU8BL1QpJMsbxNc162edxcYlAoZdkFh6gZurF5WV6nc7M/oBdBb7q9DSPEVBDbZtN0c5tzNymolwXht2eDhVO0Dnx4Hn6/5/me8xx4KOqQR2rcYfjpIC81BpXiqWBnxUSgpWQ0kHrY+gN1xdOdu/XTQfDGIMSGAET6AMpG/TbhiD/uv0LqTYF7cmPgN2/wQzzhh2jMB+Gwz1I65I3/Z8A1o5eRTXqP85M+pVTv260Z86JieNtcMridXNjnZvI1Lia31xV7IIgf99AKg/e1wrAN+YQHtXoPJKNbqBrewlWdG6UDLlzRupCv3sTFns3vFx47SqJCFHoPoyAb5eNb4MlGyYgb1UNuiHQulPW7UKRx4rJqE5d6HMjpdiC7066mRFpHvFTnbCHuSJ84E+rIJumQExKdEzVE5YAT5RoHCnvsyO3aQHb7Os63rSHrwRoy76+qqErNBi/ut4PYrdFsKCWDDoj77CjvXUdu+yqyWleQcsuK5GYrBE0WcE0Wm6DZmsk1W7VEI1XRu6YUqb6gUh22W9BhQ8ZtCwQ3PoEjQuM+psi5SSBNCR/Zusq7bSju+IyMpmWwjUvgrh+hcWks6scVKs0tBQ/NSG5YBKtYNHOKRRxt4WUogKufTwmh8lqXU9MaFlY42UcLJ5tnOfk8yPwov0j/LfGNUIe/huXnYrm6uTiOn2UI7GEjcxMxTrwifu7rq6KOw0o+MAT2SI8sYGtnaVJ/s68fFUCfONd2jK2e+cFWv0dY1bu+mPiTocsTmyR8kU56X//2wmtmuiMvoMkkdEkEp3K0N08XPZsKScwzdNB0zFlSz0pIaxBG6mQ0JBU/1yXmm878AbFQoHrb98HyAAAAAElFTkSuQmCC";
toolbarbutton002.setAttribute("label", "\u9644\u52A0\u5143\u4EF6\u7BA1\u7406\u54E1");
toolbarbutton002.setAttribute("tooltiptext", "\u9644\u52A0\u5143\u4EF6\u7BA1\u7406\u54E1");
toolbarbutton002.setAttribute("oncommand", 'BrowserOpenAddonsMgr()');
//貼上就瀏覽
var toolbarbutton003 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[5]);
toolbarbutton003.setAttribute("id", "toolbarbutton003");
toolbarbutton003.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
toolbarbutton003.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANYSURBVDhPbZFbTJNnHMa/C8VtVaCODqW0CP360RpRYdMOQdBWsdATbW1HOZWWQjm02HKQU1eGpMREIigajZqQoHFkGhHjIQo74IiGhAESpRovuqvdbAlZsmUhIo/v92nILnyTX96b//N7n/xfar+YWqeVUp8QeFqa4ukkFC9TnshLFgsDX8THT4oShef2pEk3qpkono7M6BiClPqUsD46ivr4sZcWXa9yVf5RUlr2r8NR8WeL3zMnEMQxH5225Sb1eHXMAmEp4MpbGhn5fml+fn45HA6/XVx8sRoOL7599erlytjY7b97jlmX2DnCa8JwXPQGMWVXJT/pKd7+5mSpHCec+xEIBODz+eD1etdQN0jh8FgRrFKjr0yGfrt8pcUs/0cQsyGNFcy1HZWj2ZSKGo0MlsMZMCp3ovBg2hrK1k3QdO6CQilFnYZGszEV9VopSIPdnIDY0GSSwWdIRZ32PS61FBWHJbAfkkB/QojTE24U9WfjQEkSnEdo+AtlrCBjTdBMBBxEpq3l44grFipHNDING1EYEmHwqROhnw3wXFMhtzgBbtJg86YoBSdgQ2yDdtuXHPruRFyebMX5n/wY/NGLwckahKY0cI9vRd9verTdLsCh6kTwhevd7wUk3GiUIejIQdCZC2MoCecn6+G9kUFIR90YA8edzXCNx8DzRIBTC2oE72uhahFFOEETCfsLU7kwiym0DZemmtA8mo2m0Swcv/c16h+kwPUoBrW/8tE4LcLArAUNV5WrnIANHyMLDHxoYOpNwfD0twje0yB4twBdD/PQMZGJmodbUDURi94ZFboeaKHsTF/mBD4i8OoZdJRncw3MvTTuPruI0bkBjM7249ZcP4Znj6P7FyVOPTVzO8hpVSBaLr3CCdjXPVoGjZZ0bol7S2goylOw9wO2vh248/wMhqbb0faDFQp/DmzlJvD5sXmcoIG8XltAo4YlXwJ3PgNjVhLUX4m42xKicXPmDDxDR7GvRQ17ZTFOt5chPi6G+8bHDTpmuY6Ea/NZAU0ENMz7RNDsSYAlW4y8zs9RMZCPXZXFq+WVtuWznXZc6HIiIZ6fQZmzRB3VaskUIfJ/iCCiVwgj3+SIIwerP/svy2pYMRh1f33nMf8e8lkjLFsFsdvfARA31F/rldguAAAAAElFTkSuQmCC";
toolbarbutton003.setAttribute("label", "\u8CBC\u4E0A\u5C31\u700F\u89BD");
toolbarbutton003.setAttribute("tooltiptext", "\u8CBC\u4E0A\u5C31\u700F\u89BD");
toolbarbutton003.setAttribute("oncommand", 'gBrowser.addTab(readFromClipboard())');
//貼上就搜索
var toolbarbutton004 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[6]);
toolbarbutton004.setAttribute("id", "toolbarbutton004");
toolbarbutton004.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
toolbarbutton004.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANGSURBVDhPbZJrTFJhHMbPh66jy1bZzUsX5ACVtXXbXLlWDdEE77YsnICABxIFBW8RE3DaulmKpimGXa1mabOs7GJXc9lilRL1QavVl9ZcrT5U2tN7qNVsne335ez//z3Pe85LRYRQYyQ8agKBIwmlOFIuxQkXBnEWhARaZs6adSs4KNC5Kow3KYoex5GSGSlN4FETCWOnjKP+/6TLtpxUqzLebZOlfVEo5O/NxqzHAQEz6P9Op66b59BL6SeEIYsqcqi5+dSQx+P56vV6R/r7+354vf0jPt/z4ba21o+OnM1D7BzhJeHojCnjQ6j0jQvuO7Yu+r5LJoRdGQGLxQKDwQC9Xj8Km82GUm0M9qYJUJEuHDYnCT8HTB0fxgoeFyYLYUrkg4kRIEW0HAkbliJ+fdgoUiJXQB2zGLlxNEwJfGyX8EAaLPMLiA15iQIY4vjQSQhSIQo18Th9rAEdV66h/UIb9tlNYBJWQCXmgonmITdBANLgr8BEBH6SFsFZZkbLlR7sdnfi0JkulLsuoeL4DVzvvApD6lp/EBv6R2D63SCPWK1MLNqu9aDm9HW8GHiDZ74B3Ot9isqmC3AcvojWsydgTl7yj4Aks5WM8QI01uyGnQzefODBg0dPcKe7F503b6OsygWN9RDukPdWtXi0gE02xvP91c6ccKOosgXnO26gtf0yzp07j+qaamTlmpFZuAeXunqxp0iJcl0k5kyf/OsbsMs5ZDk7lkb9wVJy5g4UOvajwFICRqMAo0iBdrsOTHEF7nY/hNOmRZ0tA0Gzp/0SGIhAT5bJ5UCBQoR7PR6odjixVclAti0VjDoNmpwCuFpuwVVbidqSjNECNj1LQvv/rS6GB0eeHN0PPdjn7kBeuQslVc1o73qEvr4+NDW5UWxUwWlV/m3AVtduCgXDEs1FZhQX8rhw2IoMcNfXoPZAGTSbN4KRxY643UdQV1cHS342Vi1fJmaPcDtbSn/VkWVtNCsIRSYhMTwY0SvnInHtfMjFfKSLQrFTLf6SrUz61tBQj8bGRtjt9kEqaU1wsSaKe5cwwEJu2qBStHBQujrwVVwE/bY0X/PBVVX+yWqUf9BtWf82XyV9rUgWvT+wf++wz+fDT0mU+xExjL1SAAAAAElFTkSuQmCC";
toolbarbutton004.setAttribute("label", "\u8CBC\u4E0A\u5C31\u641C\u7D22");
toolbarbutton004.setAttribute("tooltiptext", "\u8CBC\u4E0A\u5C31\u641C\u7D22");
toolbarbutton004.setAttribute("oncommand", 'gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(readFromClipboard()));');
//選項
var toolbarbutton005 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[98]);
toolbarbutton005.setAttribute("id", "toolbarbutton005");
toolbarbutton005.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
toolbarbutton005.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAACwElEQVQ4T7VUX0hTcRRWCV+0i5lRiRhqRbCEULSZ/5qa021ddd1td3Nuu9P5Z+ZmuimSGRVWD4H1EpFPIT1IEPQYBtWLEaXMHqSyh9CiOVqmoj2eft9tDnMJ9dCFH+d+3/nOdw/n/La4uP/9fPiydJid/E0n56+/yYp2RwwSYJCUnDKTtCeTOC51KmIIHh9I3dYUQre316QsLr0QeD9fAJylyCOVzkiIwOCR9/oHDMAxZugEJty+A+vph3IpLT37SWBuoUBZUUuCvZ0QgcEjz+3NXPcNDOlZXcpvZozIqak3Dh49XkbVDRYqrNBQoap2tuaMlcwtXYQIDB55RWEpaepNA6wuK6arz+HVKqHRMaERGknf5CKt0U4awRI9wOCRN1gdjz+FVyu3dhPdTnBprc7sbJ8VbG102mhdHBt/OBxe/dGKCCzYWsnS0vEGupht/tpO6sz+gwo6VlJJvEUiXrTT3Xv3Ly18XSli+XhEYPA6UZJ10HNcmrxNuTO85OTmk84skYnNw9HlJ53RSs9eBtQslxjRJAKDRx466LNZXaSzeNmoXK2dPsUL1NDoJLu7hxqamkmU2rojop2IwODlPNNBX16tmd7cUUZoed2IWcwvht0uj29O6vJRBW8I1+jFvmu37mgRgR1nfeTy+N8Fv620Q486ZpQRHToDOyYDb5X5xaqnpmY3dfYPkeTxk97mIrXBKkdg8CZnB+UVn5TvGatL2Lq5I0Uq9ZUSNU9Obx85Os9Rz+DlqQ7/IPUP3yBEYPCS108nqjRUqdX34/5tNeJGx8btZWrtUp1oI1dn90Roec1gd3vp/PURNhcvAYNHHrqxB49EZpQccyE/hpaVz1+87r55e3Rk457wZhv1XrxKiBgqeOQnXwU80G/7w2XCXewoNq4FL4jTdWITIW5sB/ng9zXuX/5SotuM2c4fXH4C3BQJxGxDNfsAAAAASUVORK5CYII=";
toolbarbutton005.setAttribute("label", "\u9078\u9805");
toolbarbutton005.setAttribute("tooltiptext", "\u9078\u9805");
toolbarbutton005.setAttribute("oncommand", 'openPreferences()');
//打開使用者設定資料夾
var toolbarbutton006 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[99]);
toolbarbutton006.setAttribute("id", "toolbarbutton006");
toolbarbutton006.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
toolbarbutton006.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+UlEQVR42n2Ta0hTYRjH/2fHS7q8TM20y8w0LWKlXdCKLlBGGRVG9UGjsqgIisL6UEEF0ZWKQulDF+hCUhliFFkYmaWVrouppW3eZmtON+fZ3PGcne1sp3eidpn0wsM578vz+52X53kOhf+suwe2xclknmuiy63sY9mje26UFJNj6c8c6l+o+NjOvZJb2i6K7lC3SxwbHhke7O9HQ9dm4NuNpsNnHlcUkDTPiIL7R7avpkE9jBgbFciYGXhEEXJ5EH7oOiEITjgEp/1zh35zkbrp0YiCwrwtD8bFxW4MCPRHY50WFA1ETAyHzWSFWc/AKbhgZTnNlXc1y3geP30EN/dkt6pmJk3+1qCFvd+BxPmpSE2dAkNbC+rV9fihNUiMhROqdIaTH/SmUz6CG7s29IaEyBVGUw/iUpIwb/lSBNMirF2dMLTr8fF9jTv/3svSZhaXSforb0H/ElzKWaUBJSVFT4rEnIVzMCZ6DARyV2sPg94uEzQNTeKFwme3GnvF3SRd9LlBdrpqWQhlvbgxO2tGzMQJoGkaLqcTrM0OW48F1VXq/gultSdYEeeH2unTxq3TQ+emL0grS1ZND/cKRNIJnu1Hp96I4p9xXJm2+7BHU5w/8hyoDimmzpp2e9GkgMzo7zdpZZg0kMA7PWgISINJuQ/alk/WphfnsmB4XfGP4LgsOTfhSc76dSslKoiq/1yJnYvCoAiSIUKZgEtFX9Bmiic1cUjVbwrKOfXlNQTihgX+i0/n7t2Ve12hiKE5HjBb7DDqa5E8jkKP1YVWYyjko2Lg4B1obq20G59uW06w6mFB+v4njSszMqfxggyk8OB4iTxF7xchcMIA6H3nib25payPqTi4g2BFw4LETXfKV2SsXSLzC6G8giHYwXlBYQBkmC5J3/HWbqu7Wo4+XR7B2n/XIHZ2VEBMytnx8bMyR0fER1JUoB9pocTbLS6W6eBt3Y29LnODBuavz8m/VEII31Emi0w/lCSmkIga3DtIWAaBThLsn8AvYjZqIIOjTNYAAAAASUVORK5CYII=";
toolbarbutton006.setAttribute("label", "\u6253\u958B\u4F7F\u7528\u8005\u8A2D\u5B9A\u8CC7\u6599\u593E");
toolbarbutton006.setAttribute("tooltiptext", "\u6253\u958B\u4F7F\u7528\u8005\u8A2D\u5B9A\u8CC7\u6599\u593E");
toolbarbutton006.setAttribute("oncommand", 'Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();');
//打開chrome資料夾
var toolbarbutton007 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[100]);
toolbarbutton007.setAttribute("id", "toolbarbutton007");
toolbarbutton007.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
toolbarbutton007.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAjVBMVEWAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGmhj//////5ylcgz/64T/54SdehnOoiH/12v/43v/84zav2v/85z91W/iwU+behj/14Tis0L/x1r//6WhfRjnvlLOvFvJoCDPoiXXuD/vukKxiRjGmhnw5Hn/+/f/33veskL/95THnBv38Im/mSj7+ZYxXGyuAAAACXRSTlMAjy8LIzt3m0cgtWYiAAAAgElEQVR4Xm3PRxaDMBAD0DFu0dhAeu+93/94sQMxLPJ30tNG9Ec3ULKVOYBODdgFjK84xGgQcYQyDJFP0DhqwgxD5gtHBa8MYYynqy3eU0GYb5f32nrjQ7Hbu7xSHGAN4XR2/cr1VtoO4eF6Py8vMlK+xRpFUhuRmPhAqixJH1s+qPAK0x2I/NAAAAAASUVORK5CYII=";
toolbarbutton007.setAttribute("label", "\u6253\u958Bchrome\u8CC7\u6599\u593E");
toolbarbutton007.setAttribute("tooltiptext", "\u6253\u958Bchrome\u8CC7\u6599\u593E");
toolbarbutton007.setAttribute("oncommand", 'Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).launch();');











//最小化
//var toolbarbutton008 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[101]);
//toolbarbutton008.setAttribute("id", "toolbarbutton008");
//toolbarbutton008.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
//toolbarbutton008.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAsSURBVDhPY2AYBaMhQGoIqKgozMaFCZqVlhIzGxcmqPn///9puDBBzUNDAQA9BisSqmQbnQAAAABJRU5ErkJggg==";
//toolbarbutton008.setAttribute("label", "\u6700\u5C0F\u5316");
//toolbarbutton008.setAttribute("tooltiptext", "\u6700\u5C0F\u5316");
//toolbarbutton008.setAttribute("oncommand", 'window.minimize();');
//切換視窗化最大化
//var toolbarbutton009 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[102]);
//toolbarbutton009.setAttribute("id", "toolbarbutton009");
//toolbarbutton009.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
//toolbarbutton009.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB8SURBVDhP3ZHRCoAgDEX7lAL9pZ7UoHR+1D7WXGBQedtbDwmXyd2ObG4Y/nOMGRlJnTKujpF0eHNcSqG7YvUhbO3EolSL2r1FgcSHcIqOkQ645iFMqd+u+EuYWeIL7LtJSv78AwwTgIF/eYgocM7uIfHVFfXW0zwV/rRgB07HiR2jIEETAAAAAElFTkSuQmCC";
//toolbarbutton009.setAttribute("label", "\u5207\u63DB\u8996\u7A97\u5316\u6700\u5927\u5316");
//toolbarbutton009.setAttribute("tooltiptext", "\u5207\u63DB\u8996\u7A97\u5316\u6700\u5927\u5316");
//toolbarbutton009.setAttribute("oncommand", 'onTitlebarMaxClick();');
//結束
//var toolbarbutton010 = document.querySelector("#nav-bar").insertBefore(document.createElement("toolbarbutton"),document.querySelector("#nav-bar").childNodes[103]);
//toolbarbutton010.setAttribute("id", "toolbarbutton010");
//toolbarbutton010.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
//toolbarbutton010.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFkSURBVDhPlY1NSwJhFIXvr4gIApGiphqbwY8UpQ/KXUSQBQVFLqyNiAsTgiBkFoItsg9wUQRBFKHRolW/oIiKaNHmhTb9AhdFUHSbM/CGE6PohcPlnPc896XT0IRiyjAlWhD6Cp0Ex43XdKbKxSI3K/TB0XFgTPwUCgw9Ztb4IrFqbZnVy8HRkW9YfOdy/JBKcWU5zhhs+EY5ODrQI+Irm+Xy/IIFyoG/T6w45uiDo5InJD6TSb5bXOLzmZjtgJNHD31wtNcfEO/xOEM3s3N8NjllOyANcrzLLjja7vWKJ1VlqfKAh3dM1Q488toeONrq1v5gJ1Ae+X8AHOXdqnjWda5oGu8OarYfnTx66IMjw9UnXvx+3te9NhD+0utzzNEHR5udPUKEw3w1FOSSP2AdwIZvlIOjjY4u8RaNMnQ9MsqH4Yi1ZVYvB0fr7W7jdjpW/UinuVmhD46ybS7FlGFKtCD0lV/WFD3rBYJStQAAAABJRU5ErkJggg==";
//toolbarbutton010.setAttribute("label", "\u7D50\u675F");
//toolbarbutton010.setAttribute("tooltiptext", "\u7D50\u675F");
//toolbarbutton010.setAttribute("oncommand", 'BrowserTryToCloseWindow()');
})()









