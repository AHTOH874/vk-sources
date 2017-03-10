/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1162259210
    Link: https://vk.com/js/al/pages.js?1162259210
    Last Update: 10.2.117
*/
var Pages = {
    init: function(e) {
        cur.module = "pages", cur.contentCache = {}, extend(cur, e), cur.nav.push(function(e, a, i) {
            return void 0 === e[0] && e.section ? (this.switchSection(i.section, e, a, i), !1) : void 0
        }.bind(this)), Pages.initDraft()
    },
    switchTab: function(e, a, i) {
        if (a && (2 == a.button || a.ctrlKey)) return !1;
        var o = ge("tab_" + e);
        if (o) {
            var t = geByClass("active_link", ge("pages_tabs"));
            for (var r in t) removeClass(t[r], "active_link");
            addClass(o, "active_link")
        }
        return show("pages_progress"), hide("pages_right_link"), nav.change(extend({
            section: e
        }, i)), !1
    },
    switchUiTab: function(e, a, i) {
        if (checkEvent(a)) return !0;
        var o = geByClass1("_pages_tab_" + e);
        o = o && geByClass1("ui_tab", o);
        var t = gpeByClass("ui_tabs", o);
        return uiTabs.switchTab(o), uiTabs.showProgress(t), nav.change(extend({
            section: e
        }, i)), !1
    },
    switchSection: function(section, changed, old, n, draft) {
        "history" == section && (delete n.hid, delete n.hid2);
        var params = clone(n);
        extend(params, {
            section: section,
            act: "edit",
            load: 1
        }), cur.page ? params.page = cur.page : (params.oid = cur.oid, params.id = cur.pid);
        var curSection = nav.objLoc.section;
        curSection || (curSection = isVisible("pages_cont_cache_source") ? "source" : isVisible("pages_cont_cache_edit") ? "edit" : "view", old.section = curSection);
        var wrap = ge("pages_wrap"),
            childs = wrap.childNodes,
            cacheId = "pages_cont_cache_" + section,
            callback = function() {
                Pages.hideError();
                var e = extend(n, {
                    section: section
                });
                nav.setLoc(e)
            },
            cache = ge(cacheId);
        if (draft) params.draft = 1;
        else if (cache) {
            for (var i in childs) hide(childs[i]);
            if (show(cache), callback(), "view" != section) return void uiTabs.hideProgress("pages_tabs")
        }
        "source" != section && "view" != section || "edit" != curSection && "source" != curSection || ("source" != section && (params.Body = cur.editor.val()), params.draft = 1), ajax.post("al_pages.php", params, {
            onDone: function(content, script, info) {
                if (uiTabs.hideProgress("pages_tabs"), hide("pages_bottom_preview"), curSection == (old.section || "view")) {
                    for (var i in childs) hide(childs[i]);
                    return cache ? (cache.innerHTML = content, show(cache)) : wrap.appendChild(ce("div", {
                        id: cacheId,
                        className: "pages_cont_cache",
                        innerHTML: content
                    })), script && eval(script), callback()
                }
            },
            onFail: Pages.showError
        })
    },
    pageAccess: function(e) {
        var a = e ? wkcur : cur;
        showBox("al_pages.php", {
            act: "page_access",
            id: a.pid,
            oid: a.oid
        }, {})
    },
    viewVersion: function(e) {
        return re("pages_cont_cache_edit"), re("pages_cont_cache_source"), Pages.switchUiTab("view", event, {
            hid: e
        })
    },
    compare: function(e) {
        var a = ge("pages_row" + e),
            i = Array.prototype.slice.apply(geByClass("pages_diff" + e, a)),
            o = geByClass1("pages_diff" + e, ge("pages_compare_cont"));
        if (o && i.push(o), hasClass(a, "pages_compare")) {
            for (var t in i) i[t].innerHTML = cur.lang.pages_compare;
            removeClass(a, "pages_compare"), void 0 === cur.compare2 ? (Pages.disableCompare(), slideUp("pages_compare_cont", 100), delete cur.compare1) : e == cur.compare2 ? (ge("pages_compare2").innerHTML = cur.compareEmptyCont, Pages.disableCompare(), delete cur.compare2) : (ge("pages_compare1").innerHTML = ge("pages_compare2").innerHTML, ge("pages_compare2").innerHTML = cur.compareEmptyCont, cur.compare1 = cur.compare2, Pages.disableCompare(), delete cur.compare2)
        } else {
            for (var t in i) i[t].innerHTML = cur.lang.pages_cancel2;
            addClass(a, "pages_compare"), void 0 === cur.compare1 ? (cur.compare1 = e, ge("pages_compare1").innerHTML = a.innerHTML, slideDown("pages_compare_cont", 100), Pages.disableCompare()) : (void 0 !== cur.compare2 && Pages.compare(cur.compare2), cur.compareEmptyCont || (cur.compareEmptyCont = ge("pages_compare2").innerHTML), cur.compare2 = e, ge("pages_compare2").innerHTML = a.innerHTML, Pages.enableCompare())
        }
    },
    compareView: function() {
        var e = cur.compare1,
            a = cur.compare2;
        return Pages.switchUiTab("view", !1, {
            hid: e,
            hid2: a
        })
    },
    disableCompare: function() {
        disableButton("pages_compare_button", !0)
    },
    enableCompare: function() {
        disableButton("pages_compare_button", !1)
    },
    showError: function(e) {
        return e || (e = "Check Internet connection"), uiTabs.hideProgress("pages_tabs"), val("pages_error", e), show("pages_error_wrap"), scrollToTop(200), !0
    },
    hideError: function() {
        hide("pages_error_wrap")
    },
    onScroll: function(e) {
        var a = scrollGetY(),
            i = ge("pages_buttons_panel"),
            o = ge("pages_buttons_cont"),
            t = ge("pages_wrap");
        if (i) {
            var r = getXY(o)[1];
            cur.bottomSize || (cur.bottomSize = getSize(i));
            var n = cur.bottomSize[1],
                s = window.innerHeight || document.documentElement.clientHeight;
            if (e && !cur.fixedBottom && r + 20 > s - n) scrollToY(a + r + 20 - (s - n), 0);
            else if (r > s + a - n) {
                if (!cur.fixedBottom || e) {
                    cur.fixedBottom = !0;
                    var c = getSize(o);
                    addClass(t, "wke_bottom_fixed"), setStyle(i, {
                        width: c[0],
                        height: c[1]
                    }), setStyle(o, {
                        paddingTop: c[1]
                    })
                }
            } else(cur.fixedBottom || e) && (cur.fixedBottom = !1, removeClass(t, "wke_bottom_fixed"), setStyle(i, {
                width: null,
                height: null
            }), setStyle(o, {
                paddingTop: 0
            }));
            var p = ge("wke_controls"),
                d = ge("wke_controls_cont");
            if (d && isVisible("pages_cont_cache_edit")) {
                var g = getXY(d);
                if (g[1] < a + getSize("page_header")[1]) {
                    if (!cur.fixedTop) {
                        cur.fixedTop = !0;
                        var u = getSize(d);
                        addClass(t, "wke_top_fixed"), setStyle(p, {
                            width: u[0],
                            height: u[1]
                        }), setStyle(d, {
                            paddingTop: u[1]
                        })
                    }
                } else cur.fixedTop && (cur.fixedTop = !1, removeClass(t, "wke_top_fixed"), setStyle(p, {
                    width: null,
                    height: null
                }), setStyle(d, {
                    paddingTop: 0
                }))
            }
        }
    },
    saveInfo: function() {
        var e = nav.objLoc.section;
        e || (e = isVisible("pages_cont_cache_edit") ? "edit" : "view");
        var a = cur.editor.val();
        if (!a) return !1;
        var i = {
                act: "save",
                page: cur.page,
                oid: cur.oid,
                id: cur.pid,
                hash: cur.hash,
                Body: a,
                plain: cur.editor.plainMode ? 1 : 0,
                view: 2
            },
            o = ge("pages_edit_title");
        o && (i.title = o.value), Pages.draftCancel(), ajax.post("al_pages.php", i, {
            onDone: function(e) {
                var a = ge("pages_save_info_wysiwyg");
                if (a.innerHTML = e, show(a), setTimeout(function() {
                        fadeOut(a, 200)
                    }, 1500), Pages.hideError(), nav.objLoc.hid) {
                    var i = clone(nav.objLoc);
                    delete i.hid, delete i.hid2, nav.setLoc(i), hide(geByClass1("_pages_header_info", ge("pages_cont_cache_" + (nav.objLoc.section || "view"))))
                }
                Pages.clearCache()
            },
            showProgress: function() {
                lockButton(ge("pages_save_wysiwyg"))
            },
            hideProgress: function() {
                unlockButton(ge("pages_save_wysiwyg"))
            },
            onFail: Pages.showError
        })
    },
    clearCache: function() {
        var e = ge("pages_wrap").childNodes;
        for (var a in e) "pages_cont_cache" != e[a].className || isVisible(e[a]) || re(e[a])
    },
    getScrollWidth: function() {
        if (!window.scrollbarWidth) {
            text = ce("div", {
                innerHTML: '<div style="height:200px;">1<br/>1<br/>1<br/>1<br/></div>'
            }, {
                overflowY: "scroll",
                position: "absolute",
                height: "100px",
                width: "100px"
            });
            var e = geByTag("BODY")[0];
            e.appendChild(test), window.scrollbarWidth = test.offsetWidth - geByTag("div", test)[0].offsetWidth - 1, e.removeChild(test), delete test
        }
    },
    banUser: function(e, a, i, o) {
        a.innerHTML = '<img src="/images/upload.gif" />';
        var t = hasClass(a, "banned") ? 1 : 0;
        ajax.post("al_pages.php", extend(e, {
            act: "ban_user",
            page: i || cur.page,
            hash: o || cur.hash,
            unban: t
        }), {
            onDone: function(e) {
                a.innerHTML = e, addClass(a, "banned"), t ? removeClass(a, "banned") : addClass(a, "banned")
            }
        })
    },
    _animDelX: function(e, a, i) {
        var o = ge("pages_delete_row" + e);
        if (o) {
            if (void 0 !== i) o.active = i;
            else if (o.active) return;
            animate(o, {
                opacity: a
            }, 200)
        }
    },
    rowActive: function(e, a) {
        Pages._animDelX(e, 1, 1), a && showTooltip(ge("pages_delete_row" + e), {
            text: a,
            showdt: 500
        })
    },
    rowInactive: function(e) {
        Pages._animDelX(e, .5, 0)
    },
    rowOver: function(e) {
        Pages._animDelX(e, .5)
    },
    rowOut: function(e) {
        Pages._animDelX(e, 0)
    },
    deleteNotification: function(e, a) {
        var i = ge("pages_notification" + e);
        ajax.post("al_pages.php", {
            act: "a_delete_notification",
            nid: e,
            hash: a
        }, {
            onDone: function(e) {
                i.innerHTML = e
            },
            showProgress: function() {
                setStyle(i, {
                    opacity: .5
                })
            },
            hideProgress: function() {
                setStyle(i, {
                    opacity: 1
                })
            }
        })
    },
    preview: function() {
        var e = nav.objLoc.section;
        e || (e = isVisible("pages_cont_cache_source") ? "source" : isVisible("pages_cont_cache_edit") ? "edit" : "view");
        var a = "edit" == e ? cur.editor.val() : "";
        ajax.post("al_pages.php", {
            Body: a,
            act: "edit",
            id: cur.pid,
            oid: cur.oid,
            section: "view",
            load: 1
        }, {
            onDone: function(e, a, i) {
                var o = ge("pages_bottom_preview");
                o.innerHTML = e, show(o), scrollToY(getXY(o)[1] - 104)
            },
            showProgress: lockButton.pbind("pages_preview_edit_link"),
            hideProgress: unlockButton.pbind("pages_preview_edit_link")
        })
    },
    initDraft: function() {
        cur.destroy.push(function() {
            cur.editor && (clearTimeout(cur.draftTimeout), Pages.saveDraft(cur.editor.val()))
        })
    },
    draftChanged: function(e, a, i) {
        clearTimeout(cur.draftTimeout), cur.draftTimeout = setTimeout(function() {
            !e && a && (e = cur.editor.val()), Pages.saveDraft(e)
        }, 5e3)
    },
    saveDraft: function(e) {
        if (e != cur.lastSavedWiki) {
            var a = geByClass("pages_draft_info", ge("pages_wrap"))[0];
            if (!a || !isVisible(a)) {
                var i = {
                    act: "save_draft",
                    page: cur.page,
                    oid: cur.oid,
                    id: cur.pid,
                    hash: cur.drafthash,
                    Body: e
                };
                cur.lastSavedWiki = e, ajax.post("al_pages.php", i, {
                    onFail: function() {
                        return !0
                    }
                })
            }
        }
    },
    draftCancel: function(e) {
        var a = ge("pages_draft_info");
        if (a && isVisible(a) && slideUp(a, 100), e) {
            var i = {
                act: "clear_draft",
                page: cur.page,
                oid: cur.oid,
                id: cur.pid,
                hash: cur.drafthash
            };
            ajax.post("al_pages.php", i)
        }
    },
    restoreDraft: function(e) {
        lockButton(e), Pages.switchSection(nav.objLoc.section, {}, nav.objLoc, nav.objLoc, !0)
    },
    applyVersion: function(e, a, i, o, t, r, n) {
        var s = {
            act: "apply_version",
            oid: a,
            pid: i,
            hid: e,
            hash: t,
            mid: o
        };
        ajax.post("al_pages.php", s, {
            onDone: function(e) {
                if (n) return n(i, e);
                var a = clone(nav.objLoc);
                delete a.hid, nav.go(a)
            },
            showProgress: uiTabs.showProgress.pbind("pages_tabs")
        })
    },
    versionApplied: function(e, a) {
        var i = ge("pages_notification" + e);
        i.innerHTML = a
    },
    abuseBox: function(e, a, i) {
        showBox("al_pages.php", {
            act: "report_box",
            oid: e,
            pid: a,
            hash: i
        })
    },
    actReport: function(e, a, i, o) {
        ajax.post("al_pages.php", {
            act: o,
            report_id: e,
            hash: a
        }, {
            onDone: function(a) {
                var i = ge("pages_abuse" + e);
                i.innerHTML = a
            },
            showProgress: function() {
                return "BUTTON" == i.tagName ? lockButton(i) : (cur.applyVersionCont || (cur.applyVersionCont = i.innerHTML), void(i.innerHTML = '<img src="/images/upload.gif"/>'))
            },
            hideProgress: function() {
                return "BUTTON" == i.tagName ? unlockButton(i) : void(cur.applyVersionCont && (i.innerHTML = cur.applyVersionCont))
            }
        })
    },
    sendReport: function(e, a, i, o, t, r, n) {
        ajax.post("al_reports.php", {
            act: "report",
            item_type: 5,
            oid: e,
            pid: a,
            place_id: i,
            hid: i,
            hid2: o,
            hash: r,
            type: 4,
            item_id: t,
            comment: ""
        }, {
            onDone: function(e) {
                n.parentNode.innerHTML = e
            },
            showProgress: function() {
                cur.applyVersionCont || (cur.applyVersionCont = n.innerHTML), n.innerHTML = '<img src="/images/upload.gif"/>'
            },
            hideProgress: function() {
                cur.applyVersionCont && (n.innerHTML = cur.applyVersionCont)
            }
        })
    },
    _eof: 1
};
try {
    stManager.done("pages.js")
} catch (e) {}