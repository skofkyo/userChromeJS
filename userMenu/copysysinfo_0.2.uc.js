// ==UserScript==
// @name ucjs_copysysinfo_0.2.uc.js
// @include main
// @charset              UTF-8
// @description 添加一个复制UA、 附件组件/userChrome.js 脚本列表等信息到剪贴板的菜
// @compatibility WindowsXP/Vista/7/Ubuntu10.04(gnome)
// @compatibility Firefox 3.6.* - 9.0.* / Thunderbird 3.1.*
// @compatibility userChromeJS 1.2 / userChrome.js 0.7 - 0.8 , 0.8.010070202(Fx4 対応 Alice0775 版)
// @compatibility Sub-Script/Overlay Loader v3.0.29mod
// @author otokiti
// @version 0.1 : 09/11/13 初版
// @version 0.1_fx4 : 10/07/13 Fx4 専用版
// @version 0.2 10/07/29 Fx3.6/Fx4 用をマージ
// @version 10/02/08 default テーマが表示されない時の処理の改善とリスト表示を整理した。
// @version auf github/ardiman - Anpassung fuer Benutzer, die nur mit einfacher userChrome.js arbeiten
// @Note -----------------------------------------------------------------------------------------------------------
// @Note 【制限事項】
// @Note 1) 得られるリストはユニコード(UTF8)文字列となります。
// @Note 2) userChome.js スクリプト・リストは Alice0775 氏のサブスクリプトローダ以外では動作しません。
// @Note 3) userChome.js スクリプト・リストは各スクリプトをユニコードで保存しないと説明等で文字化けします。
// @Note -----------------------------------------------------------------------------------------------------------
// @Note userChome.js スクリプト・リストを得る部分は Alice0775 氏作 rebuild_userChrome.uc.xul から拝借しています。
// @Note Fx4 で利用する場合は userChromeJS 1.2 または Alice0775 氏による trunk 4.0b2pre用のuserchrome.js 0.8の修正版
// @Note http://space.geocities.jp/alice0775/STORE/userchrome.js-0.8.010070203-Fx4.0.xpi が必要です。
// ==/UserScript==
var ucjs_copysysinfo = {

// メニュー項目
MENU_LIST: [
// ユーザ・エージェント(UA)
{ disp: true,
label: "\u700F\u89BD\u5668User Agent",//瀏覽器User Agent
cmd: "UA",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVQ4jY2Ra0iTARSGj6mzvDWdKF5owqSCcjkNZCEyr1RkK2lirrbRp9k0QcESC0XUJCSHWpmaYanUmGIoWiZl5jaaayip6eYtnWYXoqgIzMy3X5L9EH1+n+eBl0O0DkKhcHdISMgxLpfrvd7NuggEAiGfz3/N4/EW/f39ewMCAhKIiLUpmcfjefICeDphaDCOH41FdMQB+HP9vrm4uIg3Fdi30ycsNmzXD31rLr5aGjBjqEBJVjR2eDrXENGWDQMFp/fGqzLDl3NSo6FRJSIv4yBu5x+COi+808+Ptm0YOCzw3q+/mfBpsjUT3/UlmGq/gIU25Ur31ZhyIrLfzArXxpzIxl/a4t9/BmuwbCzHSL1sUCz0CtyMTETkKgz0lYzdPzvyubcUMw+zlq9nRmYTkc2GZnJysldSUlJiyjllr1nXvPi+IxvWvipUVpSZZAomLT09a09GZaVDgUbDkmg0tv/JDMNEpaSkmBjmzJLyYh56jEPQGQ0obNFBrmpB/JWmlZNlrfOnanu7pbV9XZLie+dp9SsSiYSlUCjaGYZBMsPgWnklzOMTGHr7DtrRWWhHZ/Ho1SiaewxQd+vQNzKNqgb1AyJyICIiqVTqKpPJ+uVyOWRyOaqqbmBq0gLL2AjGzW9gGRvG9KQF/S910L7ogdGgx936un8BkUjkIRaLh+Pi4pAklaKzowPPn3Wjva0VXY870PP0CWamx2EeHcaAyQCjQY/6O7X/Alwu11sgEJiCgoIQHByM0tJSmAYHYDSZYJ4Yx8T0FGass7DOz8E6b4V1fg5q9ZoJRGTHZrMjOBzOJQ93d01ozJE5eVH1oqzw1pKiqHpJVljzU15S9yW1rPGDUtW4kKZq+ngiPbd6bWAVGyJys9vqLHJwYmeyHF3zWY7bL9s7uylZbM94B3efGGeOb6QTxzeK5eTGJyLbvxO+Tu//0jOiAAAAAElFTkSuQmCC"},
// 拡張リスト(Extension list)
{ disp: true,
label: "\u64F4\u5145\u5957\u4EF6\u6E05\u55AE",//擴充套件清單
cmd: "extension",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACkUlEQVQ4T43T60tTYRwH8HMQ9QQJRSBJ50xU8BL1QpJMsbxNc162edxcYlAoZdkFh6gZurF5WV6nc7M/oBdBb7q9DSPEVBDbZtN0c5tzNymolwXht2eDhVO0Dnx4Hn6/5/me8xx4KOqQR2rcYfjpIC81BpXiqWBnxUSgpWQ0kHrY+gN1xdOdu/XTQfDGIMSGAET6AMpG/TbhiD/uv0LqTYF7cmPgN2/wQzzhh2jMB+Gwz1I65I3/Z8A1o5eRTXqP85M+pVTv260Z86JieNtcMridXNjnZvI1Lia31xV7IIgf99AKg/e1wrAN+YQHtXoPJKNbqBrewlWdG6UDLlzRupCv3sTFns3vFx47SqJCFHoPoyAb5eNb4MlGyYgb1UNuiHQulPW7UKRx4rJqE5d6HMjpdiC7066mRFpHvFTnbCHuSJ84E+rIJumQExKdEzVE5YAT5RoHCnvsyO3aQHb7Os63rSHrwRoy76+qqErNBi/ut4PYrdFsKCWDDoj77CjvXUdu+yqyWleQcsuK5GYrBE0WcE0Wm6DZmsk1W7VEI1XRu6YUqb6gUh22W9BhQ8ZtCwQ3PoEjQuM+psi5SSBNCR/Zusq7bSju+IyMpmWwjUvgrh+hcWks6scVKs0tBQ/NSG5YBKtYNHOKRRxt4WUogKufTwmh8lqXU9MaFlY42UcLJ5tnOfk8yPwov0j/LfGNUIe/huXnYrm6uTiOn2UI7GEjcxMxTrwifu7rq6KOw0o+MAT2SI8sYGtnaVJ/s68fFUCfONd2jK2e+cFWv0dY1bu+mPiTocsTmyR8kU56X//2wmtmuiMvoMkkdEkEp3K0N08XPZsKScwzdNB0zFlSz0pIaxBG6mQ0JBU/1yXmm878AbFQoHrb98HyAAAAAElFTkSuQmCC"},
// テーマ・リスト(Themes list)
{ disp: true,
label: "\u4E3B\u984C\u6E05\u55AE",//主題清單
cmd: "theme",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL2SURBVDhPpZJbSJNhGMdHSoUEiR0oJCGyQOmiq3U1DA/RTQV2IChJCwrtgERS4IWVV0tJMYlMxEMemoQ6EZ2Gbm77plszt89Nmd9OzqYkbm6edt6/9/tqI7sKunj53sP3/z3P838eHgDe/6x/E6/O7MbIVZlH3vbw72A7AMvLywmzs7NX5HL5J6PRyNjtdu/CwoLfqah2r33Ihaq3vX5paenwn5A4YGRk5AxN04ZAIIBoNIpIwIGQuxeb1j6ExPnQNFbAZrPBYrF4ZTJZfgzCAaanp08T8jorjEYiCAW3EFq8A78xDyHZbTDCi9BqNHCvueHz++B0OoM6ne4sq+UAJOVhVrzlccFlZxAMbOOH7hq2qUJ43p2DTNSGZqoGo4wYivlhuLyrIFko4gCGYfzhcBiWN8UwVNwgYjU26FaEBm5CJXyACS2FWlU5Xo4Wo4WqI5m4YDabIxqN5gCXgcFgcAeDQWhvZUB5+QhmCCiiLAXzIgdSiQSM1YRJkxw9mo+wfbdgZWWF80OtVgs4QF9fn8jnI7VNSqGuvA9vfxE8bwUYqKvC1NQUHA4HWzdUtANdo2ZYbIusmdBqtZc4APnhGOnCV6vVCseCHWVPSqCorwS5g8lkAmknrFY7XnWYUFD9DcPUHEi7MTExkbdjDoiZ2d3d3QFhVe1GR0dnlETA/Pw8iEeQqudwr0aDu6+V+ELNQKVSBZVK5S8PYststrwveVS6tr4ZPtHa2nqeRAhTFOUl+8aent5JPU1zkcmQoaWlpSPeBXYz3vysqP55YYg2Wq/HgBKJxN3U1NTIvY+PpyoUCuj1egwODrrIOS0OoD7Xp/VX8MNlF05JY2LiciLxINLV1TVJep4qEokKScoYGhra6OzszI5PIo/HS8g9mVL0OOe4/dC+PXxyPsqu5OTk1IaGhk2xWAwiQHt7O4RCoY7P52eR90SpVMqVzkvdvzct42BSQVLCrvSYOPZNT0/PzsrKKhcIBE8zMzPzft+nsICxsTEO8BNx39I4b4WQ+wAAAABJRU5ErkJggg=="},
// プラグイン・リスト(Plugin list)
{ disp: true,
label: "\u5916\u639B\u6E05\u55AE",//外掛清單
cmd: "plugin",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACAUlEQVQ4jZWRPWtUQRSGn5k7c+/dr2TZxM8oQVBEtI2IINb+AFs7CwsbyR+wsBOENBbp/DUBOy1kwSgxQoRssrt6d/feO3fmWOxm89GEvM3MOcPzvnNmFCf0avP3g7ySD3nFmo3oNqxaF2Ds5L3z3E0Nn1Oj3nx8eePrEaMAXmzs1QXeZuP82WiU32s2Yp2NnCSJ/Q5QFO52s2HVv1EZmo30W7OebinF+qfX1wYGwFrVEXi+1LarxioEWFhQKrH2jgLyRIHWtNs1vVg39wN6BXgHDDRAkppOmkQ3u9tDsmGOm5T0ehOcC5QuTPeTkmyY0/0xJI31Yi2NrgAYgDSO1gT0Yb9gZ7dEBEykuLTcAmBnN6PyglLQasQkiVFKyUNgazaCfgrw5NEK/f6EynmWOylXLzdQAkutiP3DHGMjOu0acawBHgMbBmB799fq7D1BCyqGXjZiPztAAngRvAJfCP0/ffweSJDr8xEmeRkhIICIEARCmK0n63kPRETPDVwRYAaLgJwAJQh+1vdBTp3NDaoycPYGPghBhMoLIRzBxwEzHgPUi6wwKjL4IDgvOBemBuE46awkVAaoG6CV/R1bT4rzYZ5wnoLLY6BlADscFFobcz51yqDSgDVAXOVVFMXhQga+9BqIDSDeCXBBAycAYoBBcfBlE7gF0789XyoAP4HBfxiULKFbljIsAAAAAElFTkSuQmCC"},
// userChrome.js スクリプト・リスト(userChrome.js script list)
{ disp: true,
label: "UC\u8173\u672C\u6E05\u55AE",//UC腳本清單
cmd: "USERCHROME",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAo0lEQVQ4je3QsQnDQAyFYfUqjDbQBDeKJzB4CUOKbOHy2sA1QhNkggNvcEWGSJnipUmacC5sknCBCH7UfQgR/cyICFQVIQS4e59SGmKMUwgBqgoRwe1Cq7UBllKW1/5gHRyJcOg6zMz4KEhEGIlwJMLMjBMzzsxYmL8APk83s2xm18fOZpbfAeY10N37WrvBlNJQazcYY5xq7QY3/7BWG2Czcwc44yOBgihjTgAAAABJRU5ErkJggg=="},
// テンプレ(Template)
{ disp: true,
label: "\u7D44\u614B\u6E05\u55AE",//組態清單
cmd: "TEMPLATE",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEoklEQVRIibWVSWxbVRSGvQCUqhISLGABG5BAZYFYsqILFixYMhTBosCK7pBg14oKVIaKIhAE2jRpEpqGDE6cwU7seIidqbXj2LGboYkd27GdwXEmO7GdZ/u9ez8WidKWJKWAONJdXN3z/k/3P//T1fE/l+5hG+OZMu6EgjuhkNgsH2yQO7B9js1kJcXtoX8O6I+XsMUF1pjAOpu//1DkYOMk5D6gR3+W82c/QdlwHg2IbJTIl8X+PleW2OIq9oTANi/ont6hUNo71zYQa6+iZM/AxJMQ/Rh93aeszf58OMC3XMSxoGKOFQimFaKZMs6kQv+iwJEU2OMCS0SlbzZPNL1IYfkVttbPIAOPg1uH4qwgaj7J1sx3BwHxrIpjQcO5JHClBM4VDVdKw7mkYZhYoWk0TrMnQasvhTO8QG7pJbbWP0QGnoBbOrZtxwg0vcCq5yOQ2kFAUYX+pLoPGEgL2gNJqqwejDPrGEMZuu9ksEwGyS08Ryb9PtJ/HG7qKDgq8DS8SPoe8UMturOxd4NlwfXhGeoHp7DEcvTFCpjn8jhmJ9hZepbM6jvIscd2xe0VjDaeIOI6fZ/4oYBYRsWR1GgbX+InwyCmUBZLNI8lWsAVHkdZeobMypvIseMwokPZE/eZTxNf3TkQmPsA20UNR6yIIym41NJPW2AF4+wWPaEcw1E3xeWn2Ui/gRytgGEdim3XllvdpzBNqhjH82zmD7lBeK2E6c4OveEytnlBz2yeC/W9tAVW6ZzKYJpZp5R+jUzqdaT7URjSUbRW4Gk8gdt4inrXPIbxIl0BQYtbQX8rx8xi8S5gOFbCMifoiwisUUHLWIqLf/Sj96/SHlxnJBJmY/ktcD8CgzpKtmOM1D+P2/ge1wcSXHPEafXk6ApKOsclHT7J4NTOXcBQtIw5JLCEBX1zglZvmm8b7DSNpmjxrZJMuSB7DjxPodqP4W99mYG2d6lzxahzJqm2zdPqztEVkHT4JYaxvwDm1zVcEZXeGRVzSGCcVjhfZaRhZJGG4STba1WQPUc6/AU+89t4bZ/x5ZVOavuT1NjjVFmitI+V6PALDF4V++0Sy5vqwSGXNHDOlTHPCi7ecHHNEeObWhND1s8J+r/H4qzjlyY9X1WbuWIOU2OPc7UvRo01See4xD6pIOQDUgQQX9cwTQvafFku1Dr4uqaHS40ubgwtUdufoMYeo8YRp9o2T5UlxuWeCK0ehTavykpGfXBMAbzzJUxTEtO05HfXIj+0eKnqi1JtjXHVGqOqL8YVS5TLvRF+M0VoHM7S4ZfoR1W8c3/zH+yUJJ2BMsYJiXFyd+lHt/lRP05l9wy/GkNUGkNUdoe5Zl1A71H2h2rwShoHchSK4mhAJK3RGRB0ByXdtyVdQUFXcHffFZQ039ym+eYWneOSTr/EMCYwjEnavZJ2j6R5uLw/3CMtCiQ0DD6NLn+JSFojlZU4psr7oh17wvaJIutbgqmkRrtHpWVEZWbh4Et36IOznBHcG4Z8EQxejQ7frh1NIwqqdrejrMJqVhwUOgpwWJn85V0rRiU9Y4WH/ezhAdEVgSdcxhMqs7xxMI7/GfBv608NeRilCvglugAAAABJRU5ErkJggg=="},
],

STR_SELECTED:	"\u0020\u0028\u0061\u0075\u0073\u0067\u0065\u0077\u00e4\u0068\u006c\u0074\u0029",	// (選択)
STR_DISABLE:	" (\u5DF2\u505C\u7528)",	// (無効)
STR_SEP:	" \t",	// 項目の区切り

init:function() {
var menu = document.createElement("menu");
menu.setAttribute("id", "ucjs_copysysinfo-menu");
menu.setAttribute("label", "\u8907\u88FD\u706B\u72D0\u8CC7\u8A0A");//複製火狐資訊
menu.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACSElEQVQ4jX2Tv27cRRSFv/n9xrvEBglZCRAplkwgQCJkxYBAAqUAISpEAwUFBQ/AE0CR10gkOgpaRMETQEWaNIkcCgwyTjDgP8kSxzvn3Eux65VXII5G082de797Tvn82u/7SgZJlghjBw5jG1lIoknYpqnRWqOpYbfMjHFVMBgOGZ5driWiIzKweyKN3SNXLOMw8gKysMTGr3u5/2BMzZLlmeVaPnnvyTKoheRYeXxOKMmEo2auXr/Bzu6DUiNMRsdCLfQ9yMmgdpRS+D/JoqlR7cAZRCTXvrnDrc19PvvwOfZ2/+LuH7vzrxKeXz3LhfPnJnzamOow4Z5SYOXpRbZ39lA7ZPXcGQY1gDJX4dQAbM+gVttEBKXA+1dWeHt9mZ39MdENee3yJTLnKQAcHhnZNJkqC0cPCaV0PHZqkS+/2sAyX3x6ia+//R5HTBtI1i6usv7yBSwhNaok7Dqj3XWFF1Ye5+DgAKvx8Qdv8XA0ginUvitkBorpCE1CMpnJz9v3uffnIR+98yy1T2rf03UdTywtzdovpfBoPDGWpAkDhcmE737Y4pd7I5YGYuu3bX7a3JqHOB3h9fWLU6eaOrHlAqXAm2tPUfNvFgfBu1fWeOPy+X8B7LpCZmILWdTWGrYowCsvnubVl5aJmAI9PfxPE40ejnEEPu5ANo+apyCnd3pu/ye3eXjUTjJQbmzu5dXrN1BM0mcLKXAI2diapNSa/Xzzzt3MjKyZbgejcfnx9n2aGmrjSWxlpEl0pUkhWTMXRpja0f4BNHzC0imxpuoAAAAASUVORK5CYII=");

var APP = document.getElementById("devToolsSeparator");
APP.parentNode.insertBefore(menu,APP);

// サブ・メニューの作成
var popup = document.createElement("menupopup");
menu.appendChild(popup);

// UA
if (this.MENU_LIST[0].disp) {
var menuItem = document.createElement("menuitem");
menuItem.setAttribute("label", this.MENU_LIST[0].label);
menuItem.setAttribute("image", this.MENU_LIST[0].image);
menuItem.setAttribute("oncommand", "ucjs_copysysinfo.copyText(\'"+this.MENU_LIST[0].cmd+"\');");
popup.appendChild(menuItem);
popup.appendChild(document.createElement("menuseparator"));
}

// 説明無し
for (var i = 1; i < this.MENU_LIST.length; i++) {
if (this.MENU_LIST[i].disp) {
var menuItem = document.createElement("menuitem");
menuItem.setAttribute("label", this.MENU_LIST[i].label);
menuItem.setAttribute("image", this.MENU_LIST[i].image);
menuItem.setAttribute("oncommand", "ucjs_copysysinfo.copyText(\'"+this.MENU_LIST[i].cmd+"\');");
popup.appendChild(menuItem);
}
}
popup.appendChild(document.createElement("menuseparator"));

// 説明付き
for (var i = 1; i < this.MENU_LIST.length; i++) {
if (this.MENU_LIST[i].disp) {
var menuItem = document.createElement("menuitem");
if (this.MENU_LIST[i].label=='configuration'){
menuItem.setAttribute("label", this.MENU_LIST[i].label+"sinfo");
menuItem.setAttribute("image", this.MENU_LIST[i].image);
} else {
menuItem.setAttribute("label", this.MENU_LIST[i].label+"\u542B\u8AAA\u660E");
menuItem.setAttribute("image", this.MENU_LIST[i].image);
}
menuItem.setAttribute("oncommand", "ucjs_copysysinfo.copyText(\'"+"DESCRIPTION-"+this.MENU_LIST[i].cmd+"\');");
popup.appendChild(menuItem);
}
}
},

description: false,	// 説明付き・無しのフラグ

// 文字列をクリップボードにコピーする
copyText: function(cmd) {

if (/DESCRIPTION-(.+)/.test(cmd)) {	// 説明付き
cmd = RegExp.$1;
this.description = true;
} else this.description = false;	// 説明無し

var txt = "";
switch(cmd) {
case "UA":
txt = window.navigator.userAgent+" BuildID: " + window.navigator.buildID
break;
case "extension":
case "theme":
case "plugin":
txt = ucjs_copysysinfo.getAddonsInfo(cmd) + "\n";
break;
case "USERCHROME":
if (typeof(userChrome_js) !="undefined") {
txt = ucjs_copysysinfo.getScriptsList() + "\n";
} else {
txt = ucjs_copysysinfo.getScriptsListSimple() + "\n";
}

break;
case "TEMPLATE":
//【UserAgent】
txt = "=====Useragent=====" + "\n" +
"\n" +
window.navigator.userAgent+" BuildID: " + window.navigator.buildID + "\n" +
//【導入している拡張とそのバージョン】
"\n" + "=====附加元件=====" + "\n" +
"\n" +
ucjs_copysysinfo.getAddonsInfo("extension") + "\n" +
//【使用しているテーマ】
"\n" + "=====外觀樣式=====" + "\n" +
"\n" +
ucjs_copysysinfo.getAddonsInfo("theme") + "\n" +
//【導入しているプラグインとそのバージョン】
"\n" + "=====外掛=====" + "\n" +
"\n" +
ucjs_copysysinfo.getAddonsInfo("plugin") +"\n" +
"\n" + "=====UC腳本=====" + "\n" +
"\n" +
ucjs_copysysinfo.getScriptsList() +"\n";
break;
}
Components.classes["@mozilla.org/widget/clipboardhelper;1"]
.getService(Components.interfaces.nsIClipboardHelper)
.copyString(txt);
XULBrowserWindow.statusTextField.label = "清單已複製";
setTimeout(function(){
XULBrowserWindow.statusTextField.label = "";
}, 1500);	
},

// Fx4/Other で動作を変える
getAddonsInfo: function(type) {
if ("@mozilla.org/addons/integration;1" in Components.classes) {	// fx4.0
return this.getAddonsInfo40(type);
} else {	// other
switch(type) {
case "extension":
return this.getAddonList(Components.interfaces.nsIUpdateItem.TYPE_EXTENSION);
case "theme":
return this.getAddonList(Components.interfaces.nsIUpdateItem.TYPE_THEME);
case "plugin":
return this.getPluginList();;
}
}
},

// アドオン・リストを得る(Fx4)
getAddonsInfo40: function(type) {
// ソート
function compare(a, b) {
return String.localeCompare(a.toLowerCase() , b.toLowerCase());
}

Components.utils.import("resource://gre/modules/AddonManager.jsm");

// テーマの場合現在のテーマを得る
if (type == "theme") {
// default テーマを表す文字列
var defThemeStr = this.getPrefLocalizedString("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.name");
// 現在のテーマを表す文字列
var theme = this.getPrefString("general.skins.selectedSkin");
if (theme == "classic/1.0") {
theme = defThemeStr;
}
}

// リストを得る
var Addons;
AddonManager.getAddonsByTypes([type], function(installedItems) {
Addons = installedItems;
});

// Callback の実行を待つ
var thread = Components.classes['@mozilla.org/thread-manager;1'].getService().mainThread;
while (Addons == void(0)) {
thread.processNextEvent(true);
}

// アドオン情報を得る
var result = new Array();
var isSelected = false;	// 選択されているか（テーマの場合のみ）
var isDefTheme = false;	// default テーマか（テーマの場合のみ）
for (var j = 0; j < Addons.length; j++) {
var line = Addons[j].name + this.STR_SEP + Addons[j].version;
if (Addons[j].type == "theme") {	// テーマの場合
if (Addons[j].name == defThemeStr)	// default テーマの場合
isDefTheme = true;
if (Addons[j].name == theme) {	// 選択されている場合
isSelected = true;
line += this.STR_SELECTED;
}
} else {	// 拡張・プラグインの場合
if(Addons[j].userDisabled)
line += this.STR_DISABLE;
}
if (this.description) line += this.STR_SEP+ Addons[j].description;
result.push(line);
}

// ------------------------------------------------------------------------------
// Mozilla/5.0 (X11; Linux i686; rv:2.0b3pre) Gecko/20100730 Ubuntu/10.04 (lucid)
// デフォルト・テーマは表示されないので.....
// 複数テーマがある場合デフォルトに切り替えられないのでバグだと思うが?
if (type == "theme" && !isDefTheme) {	// テーマで default テーマがない場合は追加する
var line = defThemeStr + this.STR_SEP
+ Components.classes["@mozilla.org/xre/app-info;1"]
.getService(Components.interfaces.nsIXULAppInfo).version;
if (!isSelected)	// 選択されたテーマがない場合 default が選択されているとする
line += this.STR_SELECTED;
if (this.description)
line += (this.STR_SEP + this.getPrefLocalizedString("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.description"));
result.push(line);
}
// ------------------------------------------------------------------------------
     result.sort(compare);

return result.join("\n");
},

// プラグインのリストを得る(Fx3.6/Tb)
getPluginList: function(){
// ソート
function compare(a, b) {
return String.localeCompare(a.name.toLowerCase() , b.name.toLowerCase());
}

var result = new Array();
        var gPluginHost = Components.classes["@mozilla.org/plugin/host;1"]
         .getService(Components.interfaces.nsIPluginHost);
var itemList = gPluginHost.getPluginTags({});

itemList.sort(compare);

var before = "";
for (var i=0; i < itemList.length; i++) {
if (itemList[i].name == before) continue;
else before = itemList[i].name;
var line = itemList[i].name;
if (itemList[i].version) line += this.STR_SEP + itemList[i].version;
if(itemList[i].disabled) line += this.STR_DISABLE;
       if (this.description) line += this.STR_SEP + itemList[i].description.replace(/<\/?[a-z][^>]*>/gi, " ");
result.push(line);
}
return result.join("\n");
},

// 拡張機またはテーマのリストを得る(Fx3.6/Tb)
getAddonList: function(type) {
// ソート
function compare(a, b) {
return String.localeCompare(a.name.toLowerCase() , b.name.toLowerCase());
}

function getResource(aID, str){
try {
var gRDFS = Components.classes["@mozilla.org/rdf/rdf-service;1"]
.getService(Components.interfaces.nsIRDFService);
var item = gRDFS.GetResource("urn:mozilla:item:" + aID);
var property = gRDFS.GetResource("http://www.mozilla.org/2004/em-rdf#" + str)
var target = gExtensionManager.datasource.GetTarget(item, property, true)
.QueryInterface(Components.interfaces.nsIRDFLiteral);
return target.Value;
} catch (e) {
return "";
}
}

var result = new Array();
var gExtensionManager = Components.classes["@mozilla.org/extensions/manager;1"]
.getService(Components.interfaces.nsIExtensionManager);
var itemList = gExtensionManager.getItemList(type, {});

itemList.sort(compare);

if (type == Components.interfaces.nsIUpdateItem.TYPE_THEME) {	// テーマの場合現在のテーマを得る
var theme = this.getPrefString("general.skins.selectedSkin");
if (theme == "classic/1.0") {
theme = this.getPrefLocalizedString("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.name");
}
}
for (var i=0; i < itemList.length; i++) {
var line = itemList[i].name + this.STR_SEP + itemList[i].version;
// 有効・無効／選択・非選択をしらべる
if (type == Components.interfaces.nsIUpdateItem.TYPE_EXTENSION) {	// 拡張の場合
if(getResource(itemList[i].id, "isDisabled") =="true")
line += this.STR_DISABLE;
} else {	// テーマの場合
if (itemList[i].name == theme)
line += this.STR_SELECTED;
}
if (this.description) {
var str = getResource(itemList[i].id, "description");
if (str != "") line += this.STR_SEP + str;
}
result.push(line);
}
return result.join("\n");
},

// userChome.js スクリプト・リストを得る
// rebuild_userChrome.uc.xul: onpopup() より
getScriptsList: function() {
var result = new Array();

// フォルダをチェック
for(var j = 0, lenj = userChrome_js.arrSubdir.length; j < lenj; j++){
var dirName = userChrome_js.arrSubdir[j] == "" ? "root" : userChrome_js.arrSubdir[j];
var flg = false;
// uc.js ファイルが存在するか？
for(var i = 0, len = userChrome_js.scripts.length; i < len; i++){
var script = userChrome_js.scripts[i];
if(script.dir != dirName) continue;
flg = true;
break;
}
// uc.xul ファイルが存在するか？
if(!flg){
for(var i = 0, len = userChrome_js.overlays.length; i < len; i++){
var script = userChrome_js.overlays[i];
if(script.dir != dirName) continue;
flg = true;
break;
}
}
if(!flg) continue;	// 存在しない場合はスキップ

// フォルダ名
var isroot = dirName=="root";
result.push((isroot? "": "\n" ) + "[chrome/" + (isroot? "": dirName) + "]");
if (isroot) result.push("userChrome.js");	// userChrome.js を最初に追加

// uc.js ファイル・リスト
for(var i = 0, len = userChrome_js.scripts.length; i < len; i++){
var script = userChrome_js.scripts[i];
if(script.dir != dirName) continue;
var line = script.filename + (this.description
? ((script.description==script.filename)? "": this.STR_SEP + script.description)
: "") + (userChrome_js.scriptDisable[script.filename]? " (\u5DF2\u505C\u7528)": "");
result.push(line);
}
// uc.xul ファイル・リスト
for(var i = 0, len = userChrome_js.overlays.length; i < len; i++){
var script = userChrome_js.overlays[i];
if(script.dir != dirName) continue;
var line = script.filename + (this.description
? ((script.description==script.filename)? "": this.STR_SEP + script.description)
: "") + (userChrome_js.scriptDisable[script.filename]? " (\u5DF2\u505C\u7528)": "");
result.push(line);
}
}
return result.join("\n");
},

getScriptsListSimple: function() {
var result = new Array();
// Arrays (jeweils ein Array fuer uc.js und uc.xul) nehmen Namen der gefundenen Skripte auf
let ucJsScripts = [];
let ucXulScripts = [];
// Suchmuster, also die Dateierweiterungen uc.js und uc.xul
let extjs = /\.uc\.js$/i;
let extxul= /\.uc\.xul$/i;
let aFolder = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
aFolder.initWithPath(Services.dirsvc.get("UChrm", Ci.nsIFile).path);
// files mit Eintraegen im Chrome-Ordner befuellen
let files = aFolder.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
// Ordner bzw. files durchlaufen und kontrollieren, ob gesuchte Dateien dabei sind
while (files.hasMoreElements()) {
let file = files.getNext().QueryInterface(Ci.nsIFile);
// keine gewuenschte Datei, deshalb continue
if (!extjs.test(file.leafName) && !extxul.test(file.leafName)) continue;
// uc.js gefunden -> im Array ablegen
if (extjs.test(file.leafName)) ucJsScripts.push(file.leafName);
// uc.xul gefunden -> im Array ablegen
if (extxul.test(file.leafName)) ucXulScripts.push(file.leafName);
}

result.push("userChromeJS/uc.js:");
for(var i = 0, len = ucJsScripts.length; i < len; i++){
var line = ucJsScripts[i];
result.push(line);
}
result.push("\nuserChromeJS/uc.xul:");
for(var i = 0, len = ucXulScripts.length; i < len; i++){
var line = ucXulScripts[i];
result.push(line);
}

return result.join("\n");
},

// 設定文字列情報を取得
getPrefString: function(str) {
return Components.classes["@mozilla.org/preferences;1"]
.getService(Components.interfaces.nsIPrefBranch)
.getCharPref(str);
},

// ロケールファイルから既定値を取得
getPrefLocalizedString: function(str) {
return Components.classes["@mozilla.org/preferences;1"]
.getService(Components.interfaces.nsIPrefBranch)
.getComplexValue(str, Components.interfaces.nsIPrefLocalizedString).data;
}
};
ucjs_copysysinfo.init();