// ==UserScript==
// @name            SidebarMod.uc.js
// @description     Firefox側邊欄增強
// @include         chrome://browser/content/browser.xul
// @include         chrome://mozapps/content/extensions/extensions.xul
// @charset         UTF-8
// @author          NightsoN
// @note            v20130428: mino fixed by lastdream2013, add useful site
// @version         0.5
// ==/UserScript==
(function() {
    if (!$('sidebar-box')) return;
    if (!window.SidebarMod) {
        window.SidebarMod = {
            operaLikeToggler: false, //是否顯示Opera風格屏幕邊緣側邊欄開關條
            sitelist: [{
                id: 'SidebarBookmarkstogglebutton',
                name: '書籤',
                command: 'toggleSidebar("viewBookmarksSidebar");',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABp0lEQVQ4jZWSv2sTYRzGP6SuErpmseggVIUImRJI8PCocwTFreVAlGsXj0Ao3BSSycE/IOISqjWQLBEKd+3RI1sHDwWhP9w6ZzgiFY7vew7eSY3XNn7Gl/d5vu/zvF+4mNvAS8AAbl5yL5McsO667uFoNPoGPE/O5ua+rut9pVQsIqpSqWwDd/5n+qvxePw9TvA87wjYuOgVOWAJeMTvvJuapvWVUio1EBEpl8sfgE1gDVgBbqSGT2q12sdOp+MPh8OvQRCchmF4Fs8QhuFZEASng8HgS7vd9pNYdYA30+n056zgKiaTyQ/gNcBT0zR3oiiSecVRFIlhGJ+AxwALwJplWY6IqHnEpmnuAKuJltTEaDabu+e6+wellLIsy0mK/CNOWSwUCu8um66UivP5/FvgetZ3Ltfr9eFVEXRd7wO3sgw027b3ZvOKyF/lNhoNF6hmGTzr9Xqf4ziORUQ5jnNYLBa3SqXSe8/zjtPF6na7B2n7szxstVr7ruseVavVbcAEloG7wIamaX3f909s294DHmQZXAN04EUiPL/3OeBeYqoldwH4BcyCupwVv0ffAAAAAElFTkSuQmCC',
            }, {
                id: 'SidebarHistorytogglebutton',
                name: '歷史',
                command: 'toggleSidebar("viewHistorySidebar");',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACWklEQVQ4jYWTT2sTYRDGf7ywLDT+gYUVEfQiLHQPFhoF8SIeYqDHlBxaCLlE8dTGg/WuHyIkrfXwNr2EpNa2h573kNQ2bVTipYGWFi9+gYRNs+PlXUir4nOcmeeZGWYeuAwFPAaWEonESjKZXE8mk+uJRGIFWDI5xT9wF3iZzWY32+322XA4HInBxcXF6Ojo6Hx2dvYT8NLUXiZbllVpNBrf5D9oNBrfLMuqAPfGx35Rr9e/x0WtVus0l8ttOY6z6jjOai6X29rf3z8dE/kOvIjXmc5kMhtRFImISKlU2jP7vu/1er+Oj49/Ae+At6VSaU9EJIoiyWQyG8A0wOtms3kSdzbkG0A57giUTWyp1Wqdiog0m80T4DW2bS+HYTgUEZmbm/sMPDKrXRUAeDQ/P78lIhKG4dC27WV831+LCx3H+QAkrgpMTEysAPeBa47jrMbxyclJjed5Og64rrsKXDcCbw4ODs5ERHZ2dn4Ar4Cbrut+jOs9z9NYllUZDAahiEg+n98GnhiBh7ZtL9dqta+j0SjKZrObwLN8Pr8tIjIYDEJzThaDIOiJiHQ6nXOlVBm4ZUTuAIWZmZl6pVL5opQqdzqdcxGRIAh6wCLAVDqdrkfmjtVq9dCIPDVCt4HnSqlytVo9NGeM0ul0HZiKH6mgtW7Hu3W73Z/FYnHX9/013/fXisXibrfb/RnntdZtoDDuC1cpVdZat+NJ/oYoiiKtddtM6F71gwsUUqlULQiCXr/fD2Niv98PgyDopVKpmun8B3ncFw+ABaVU2fM87XmeNh0XTO6SnX8DZ1DDGCS7xp8AAAAASUVORK5CYII=',
            }, {
                id: 'Sidebaraddonsbutton',
                name: '附加元件管理員',
                url: 'chrome://mozapps/content/extensions/extensions.xul',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVQ4jY2SQWhScRzHf1HYG/7fe/711SFPC0Wl52ne6l1Udng0FnQoutdtdJFaSGAtkF28mE4pxkAmBMLylh06zB3ipYWvwECDWkQbW2k5F8/Z/9dhKnZw83P9/7+f/5cvf4DRnFUUZW52dnZ1ZmYm7fP5rgPAmSPu/w+l9HK1Wn2NiB1E3C+XywWe55WxBVar9SYifsFDuoZhvLdYLFeOypg4jpvkef4iIcQvCMJcNBpd7wn2FxcXX4qieIsQ4ud5/hIAnAeAE4O0JEnnQqHQ/VKpVNR1Xdc0Ta/Vav0GnVqt9lnTNL1Sqej1en3D5/PdAQDTcAP3yspKHhH/4PEcBIPBVQCYALPZfINSelcQhNuxWKyAiMYYAgwEAjkAmIBCoVBijP3WNE0vFosfEZGNyDBE7CLiX0TE6enpQ0G73f41zouGYXyXJOlZIpF41Wg0PiiKcg8ATLC5ufkNEQ8YY3uIuD+qQbPZ/EopjUqS9MDhcCSsVus1ADgFkUjkaavVKofD4eeZTEbr1ezTGdqkmUql3mxtbX1CxIaqqikA4MBkMnkFQVAJIVfj8fhgxE6ns53P5zfW1tbWu93u9sgR+xBCLqTT6YEgm82+pZTOU0rnc7ncu7EEy8vLL4Yq//B6vY+npqaSiPjzWAHHcZPJZPIJY2wHEQ3G2K7dbs+43e4sY2y3JzZ6ZzuqqsYA4PTwTzTbbDa/y+VakGV5yel0PiSE+EVRDLpcrkeyLC/JspySZTnl8XgWRFH0A8DJf62vIbwvPGiAAAAAAElFTkSuQmCC',
            }, {
                id: 'Sidebardownloadsbutton',
                name: '下載',
                url: 'about:downloads',
                //url: 'chrome://browser/content/downloads/contentAreaDownloadsView.xul',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/ElEQVQ4je2RTUrDQBhAH+mpXAtZBB2EIZCURrPJJbLTjYgnyB20tIreZA6QRSEkuCjmZyYKukkgxKbpAXzwrYb3+JgP/nIGxEAymrh7myVWSu1+Riildl1klmQs93Sb/AcOcAk8MjjZTKCfO+Acy7KSoig+p6Qp0jT9AG4BrqIoem/b9vtUWWvd+r7/AtgAC+AmDMM3Y8zXnNw0jXFddwsEnUsfuQ6C4FVrPRmp69pIKTfACrDGn7kAAs/ztk3TtGO5qiojhFgDy0PyMLKSUm7quja9XJaldhznGfCPyT0WsBRCrPM832dZtrdt+wnwTpGHEQE8APfAxZT8C+pTrhFnReUNAAAAAElFTkSuQmCC',
            }, {
                id: 'Sidebartranslatebutton',
                name: 'Google翻譯',
                //url: 'https://translate.google.com/m/translate#auto/zh-TW/',
                url: 'https://translate.google.com/#auto/zh-TW/',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC'
            }, {
                id: 'Sidebaryoutubebutton',
                name: 'Youtube',
                url: 'https://m.youtube.com/#',
                favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYklEQVQ4jcXTzUoCURjG8XdTnnN0Zs7Yh4JIVyAEXUm0DVp0AW26gILAFiWJFJrYwo9FErQxAoMsjJxoNhUDQbgecSPjJgYGnhaVTCO1aOMLv9Xz375EE797It7RwzUjKkxDF64RDeMvHT38/NnyMhERtXWevtPD+I+2ztPUksK80QX8bmMSdq2Ch6UUgptfSwqTmlL0r3QBv+uFOFzXxftggKf1NQT3b00p+tTQuHchBX5IxuE4DhzHwXA4xFupiMt4FMGuoXGPzqXAmGQMtm2P9Ho9vBznxzspQHWNI+g0MY9utztitlrILKbGurrGQVWVeVWNw6+SmINlWbAsC2f7e9iYlcirDMGuqjKPSgrvn6gcfqXYDB4NA7sry9gUIRQD+6hTeJ8KKjcLKoffkcqxyqawHWEIbgEm5RSWPlQZ/iOnsDRliHhWYeWswswv+M2BEnoddRG2s0U0PdE/JCKiD2TAbGlHU6nxAAAAAElFTkSuQmCC'
            }, ],
            makeButton: function(sitelist, parent) {
                var i, len = sitelist.length, item, btn, menu, menupopup, menuitem, frag = document.createDocumentFragment();
                insertpoint = document.querySelector('#sidebar-header .close-icon.tabbable');
                for (i = 0; i < len; i++) {
                    item = sitelist[i];
                    if (item.childs) {
                        if (!parent) {
                            btn = frag.appendChild(document.createElement('toolbarbutton'));
                            btn.setAttribute('tooltiptext', item.name);
                            btn.setAttribute('type', 'menu');
                            btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
                            menupopup = btn.appendChild(document.createElement('menupopup'));
                            SidebarMod.makeButton(item.childs, menupopup);
                        } else {
                            if (item === 'sep') {
                                parent.appendChild(document.createElement('menuseparator'));
                            } else {
                                menu = parent.appendChild(document.createElement('menu'));
                                menu.setAttribute('label', item.name);
                                menu.setAttribute('class', 'menu-iconic');
                                menu.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
                                menupopup = menu.appendChild(document.createElement('menupopup'));
                                SidebarMod.makeButton(item.childs, menupopup);
                            }
                        }
                    } else if (parent) {
                        if (item === 'sep') {
                            parent.appendChild(document.createElement('menuseparator'));
                        } else {
                            menuitem = parent.appendChild(document.createElement('menuitem'));
                            menuitem.setAttribute('label', item.name);
                            menuitem.setAttribute('tooltiptext', item.name);
                            menuitem.setAttribute('url', item.url);
                            menuitem.setAttribute('class', 'menuitem-iconic');
                            menuitem.setAttribute('src', item.favicon);
                            menuitem.setAttribute('closemenu', 'none');
                            menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
                        }
                    } else {
                        btn = frag.appendChild(document.createElement('toolbarbutton'));
                        btn.setAttribute('id', item.id);
                        btn.setAttribute('tooltiptext', item.name);
                        btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
                        btn.setAttribute('url', item.url);
                        if (item.command) btn.setAttribute('oncommand', item.command);
                        btn.setAttribute('onclick', 'if (event.button == 0) {\
                                openWebPanel(this.getAttribute("tooltiptext"),this.getAttribute("url"))\
                            }');
                    }
                }
                insertpoint.parentNode.insertBefore(frag, insertpoint);
            },
            makeSplitter: function() {
                var sidebarBox = $('sidebar-box'),
                    splitter = sidebarBox.parentNode.insertBefore(document.createElement('splitter'), sidebarBox),
                    sidebarBoxArrow;
                splitter.setAttribute('id', 'sidebar-box-splitter');
                splitter.setAttribute('onclick', 'toggleSidebar();');
                sidebarBoxArrow = splitter.appendChild(document.createElement('div'));
                sidebarBoxArrow.id = 'sidebar-box-arrow';
                sidebarBoxArrow.className = sidebarBox.hidden ? 'right' : '';
            },
            AutoClick: function(event) {
                //PlacesCommandHook.showPlacesOrganizer("UnfiledBookmarks");
                //PlacesCommandHook.showPlacesOrganizer("History");
                //PlacesCommandHook.showPlacesOrganizer("Downloads");
                //PlacesCommandHook.showPlacesOrganizer("Tags");
                //PlacesCommandHook.showPlacesOrganizer("AllBookmarks");
                //PlacesCommandHook.showPlacesOrganizer("BookmarksToolbar");
                //PlacesCommandHook.showPlacesOrganizer("BookmarksMenu");
                var B = $("SidebarBookmarkstogglebutton");
                var H = $("SidebarHistorytogglebutton");
                var D = $("Sidebardownloadsbutton");
                var A = $("Sidebaraddonsbutton");
                var T = $("Sidebartranslatebutton");
                var Y = $("Sidebaryoutubebutton");
                B.addEventListener("mouseover", function(event) {t = setTimeout(function(event) {B.click()}, 400)}, false);
                B.addEventListener("mouseout", function(event) {clearTimeout(t)}, false);
                B.addEventListener("click", function(event) {
                    if (event.button == 2) PlacesCommandHook.showPlacesOrganizer("AllBookmarks");
                }, false);
                H.addEventListener("mouseover", function(event) {t = setTimeout(function(event) {H.click()}, 400)}, false);
                H.addEventListener("mouseout", function(event) {clearTimeout(t)}, false);
                H.addEventListener("click", function(event) {
                    if (event.button == 2) PlacesCommandHook.showPlacesOrganizer('History');
                }, false);
                D.addEventListener("mouseover", function(event) {t = setTimeout(function(event) {D.click()}, 400)}, false);
                D.addEventListener("mouseout", function(event) {clearTimeout(t)}, false);
                D.addEventListener("click", function(event) {
                    if (event.button == 2) switchToTabHavingURI("about:downloads", true)
                }, false);
                A.addEventListener("mouseover", function(event) {t = setTimeout(function(event) {A.click()}, 400)}, false);
                A.addEventListener("mouseout", function(event) {clearTimeout(t)}, false);
                A.addEventListener("click", function(event) {
                    if (event.button == 2) switchToTabHavingURI("about:addons", true)
                }, false);
                T.addEventListener("mouseover", function(event) {t = setTimeout(function(event) {T.click()}, 400)}, false);
                T.addEventListener("mouseout", function(event) {clearTimeout(t)}, false);
                T.addEventListener("click", function(event) {
                    if (event.button == 2) openUILinkIn(this.getAttribute("url"), "tab")
                }, false);
                Y.addEventListener("mouseover", function(event) {t = setTimeout(function(event) {Y.click()}, 400)}, false);
                Y.addEventListener("mouseout", function(event) {clearTimeout(t)}, false);
                Y.addEventListener("click", function(event) {
                    if (event.button == 2) openUILinkIn(this.getAttribute("url"), "tab")
                }, false);
            },
            addControlBtn: function() {
                var SHBtn = $("sidebar-header");
                if (SHBtn) {
                    var sidebarBtn = document.createElement('toolbarbutton');
                    sidebarBtn.setAttribute('type', 'button');
                    sidebarBtn.setAttribute("tooltiptext", "左鍵：上一頁\n中鍵：重新載入\n右鍵：下一頁");
                    sidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
                    sidebarBtn.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABaSURBVDhPzYzJEcAwCAPpJ62kaHfmHCMzJEbi4Y/3BSuNbE/OdnScTuZSniIbKEdGSQ1k2UtZuKEdFijnfhIgepWtD6QCKPf3PAiUHVVQ2YdqAK+GDeDcCrMLOe2fMX6PACcAAAAASUVORK5CYII=");
                    sidebarBtn.addEventListener("click",
                        function(event) {
                            var webPanel = $('sidebar').content$("web-panels-browser");
                            if (event.button == 2) {
                                event.preventDefault();
                                event.stopPropagation();
                                webPanel.contentWindow.history.forward();
                            } else if (event.button == 1) {
                                webPanel.contentWindow.location.reload();
                            } else {
                                webPanel.contentWindow.history.back();
                            }
                        },
                        false);
                    SHBtn.insertBefore(sidebarBtn, SHBtn.childNodes[100]);
                }
            },
            toggleSidebar: function(commandID, forceOpen) {
                var sidebarBox = $("sidebar-box"),
                    sidebar = $("sidebar"),
                    sidebarTitle = $("sidebar-title"),
                    sidebarSplitter = $("sidebar-splitter"),
                    sidebarBoxArrow = $('sidebar-box-arrow'),
                    lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewBookmarksSidebar';
                if (!commandID && sidebarBox.hidden) {
                    if (sidebarBox.getAttribute('sidebarcommand') === '') {
                        toggleSidebar(lastcommand, true);
                        sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
                    } else {
                        sidebarBox.hidden = false;
                        sidebarSplitter.hidden = false;
                        if (sidebarBoxArrow) sidebarBoxArrow.className = '';
                    }
                    return;
                }
                if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
                let sidebarBroadcaster = $(commandID);
                if (sidebarBroadcaster.getAttribute("checked") == "true") {
                    if (!forceOpen) {
                        if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
                            sidebar.setAttribute("src", "about:blank");
                            sidebar.docShell.createAboutBlankContentViewer(null);
                            sidebarBox.setAttribute("sidebarcommand", "");
                            sidebarTitle.value = "";
                            sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
                        }
                        sidebarBox.setAttribute("sidebarcommand", "");
                        sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
                        sidebarBroadcaster.removeAttribute("checked");
                        sidebarBox.hidden = true;
                        sidebarSplitter.hidden = true;
                        if (sidebarBoxArrow) sidebarBoxArrow.className = 'right';
                        gBrowser.selectedBrowser.focus();
                    } else {
                        fireSidebarFocusedEvent();
                    }
                    return;
                }
                var broadcasters = document.getElementsByAttribute("group", "sidebar");
                for (let broadcaster of broadcasters) {
                    if (broadcaster.localName != "broadcaster") continue;
                    if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
                    else sidebarBroadcaster.setAttribute("checked", "true");
                }
                sidebarBox.hidden = false;
                sidebarSplitter.hidden = false;
                if (sidebarBoxArrow) sidebarBoxArrow.className = '';
                var url = sidebarBroadcaster.getAttribute("sidebarurl");
                var title = sidebarBroadcaster.getAttribute("sidebartitle");
                if (!title) title = sidebarBroadcaster.getAttribute("label");
                sidebar.setAttribute("src", url);
                sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
                if (title && title !== '') sidebarTitle.value = title;
                sidebarBox.setAttribute("src", url);
                sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
                if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
                else
                    fireSidebarFocusedEvent();
            },
            modifySidebarClickBehaviour: function() {
                var sidebar = $('sidebar');
                sidebar.addEventListener('DOMContentLoaded', function() {
                    if (sidebar.contentDocument) {
                        sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
                        var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
                        if (wpb) {
                            wpb.onclick = null;
                        }
                    }
                }, false);
                eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) +
                    'var wpb = sidebar.content$("web-panels-browser");' +
                    'if (wpb) wpb.onclick = null;' + '}'
                );
                eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) +
                    'var wpb = sidebar.content$("web-panels-browser");' +
                    'if (wpb) wpb.onclick = null;' + '}'
                );
            },
            init: function() {
                window.toggleSidebar = this.toggleSidebar;
                this.makeButton(this.sitelist);
                if (this.operaLikeToggler) {
                    this.makeSplitter();
                }
                this.addControlBtn();
                this.modifySidebarClickBehaviour();
                this.AutoClick();
            }
        };
        SidebarMod.init();
    }
    function $(id) {
        return document.getElementById(id);
    }
})();