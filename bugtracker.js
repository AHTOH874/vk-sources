/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 188714712
    Link: https://vk.com/js/al/bugtracker.js?188714712
    Last Update: 10.2.117
*/
var BugTracker = {
    openNewBugBox: function() {
        cur.newBugBox = showBox("bugtracker", {
            act: "add"
        }, {
            params: {
                onHideAttempt: BugTracker.closeNewBugBoxCallback
            }
        })
    },
    openEditBugBox: function(e) {
        cur.newBugBox = showBox("bugtracker", {
            act: "edit",
            id: e
        }, {})
    },
    closeNewBugBoxCallback: function(e) {
        if (!e && (trim(val("bt_form_title")) || trim(val("bt_form_descr")) || cur.newBugPlatformsDD.val() || cur.newBugTagsDD.val() || cur.btNewMedia.getMedias().length)) {
            var t = showFastBox(getLang("global_action_confirmation"), getLang("bugs_t_close_filled_form_confirm"), getLang("global_close"), function() {
                t.hide(), cur.newBugBox.hide(!0)
            }, getLang("global_cancel"));
            return !1
        }
        return !0
    },
    saveNewBug: function(e, t) {
        var r = cur.newBugBoxButton;
        if (r) {
            var o = {
                    act: "save",
                    id: e,
                    hash: t,
                    product: cur.newProductId,
                    title: trim(val("bt_form_title")),
                    descr: trim(val("bt_form_descr")),
                    severity: cur.newBugSeverityDD.val(),
                    platforms: cur.newBugPlatformsDD.val(),
                    platforms_versions: cur.newBugPlatformsVersionsDD.val(),
                    devices: cur.newBugDevicesDD.val(),
                    tags: cur.newBugTagsDD.val(),
                    vulnerability: isChecked("bt_form_vulnerability") ? 1 : 0,
                    comment: val("bt_form_comment")
                },
                a = !1;
            if (o.title || (notaBene("bt_form_title"), a = !0), o.tags.length || (notaBene(cur.newBugTagsDD.container), a = !0), !o.platforms.length && cur.newBugPlatformsDD.dataItems.length > 1 && isVisible("bt_form_platforms_block") && (notaBene(cur.newBugPlatformsDD.container), a = !0), !o.platforms_versions.length && cur.newBugPlatformsVersionsDD.dataItems.length > 1 && isVisible("bt_form_platforms_versions_block") && (notaBene(cur.newBugPlatformsVersionsDD.container), a = !0), !o.devices.length && cur.newBugDevicesDD.dataItems.length > 1 && isVisible("bt_form_devices_block") && (notaBene(cur.newBugDevicesDD.container), a = !0), !a) {
                var c = [];
                each(cur.btNewMedia.getMedias(), function(e, t) {
                    c.push(t[0] + "," + t[1])
                }), o.attachs = c, ajax.post("bugtracker", o, {
                    showProgress: lockButton.pbind(r),
                    hideProgress: unlockButton.pbind(r)
                })
            }
        }
    },
    sendComment: function() {
        if (cur.bugreportId && cur.bugreportHash) {
            var b = ge("bt_comment_form_submit"),
                t = ge("bt_comment_form_text"),
                m = trim(val(t)),
                attachs = [];
            return each(cur.btNewCommentMedia.getMedias(), function(e, t) {
                attachs.push(t[0] + "," + t[1])
            }), m || attachs.length ? void ajax.post("bugtracker", {
                act: "send_comment",
                report_id: cur.bugreportId,
                hash: cur.bugreportHash,
                message: m,
                attachs: attachs
            }, {
                showProgress: lockButton.pbind(b),
                hideProgress: unlockButton.pbind(b),
                onDone: function(html, js) {
                    html && val("bt_report_one", html), js && eval(js)
                }
            }) : notaBene(t)
        }
    },
    updateMergeBoxSearch: function(e) {
        clearTimeout(cur.btMergeBoxSearchTimeout), cur.btMergeBoxSearchTimeout = setTimeout(BugTracker.doUpdateMergeBoxSearch.pbind(e), 300)
    },
    forceUpdateMergeBoxSearch: function(e, t) {
        clearTimeout(cur.btSearchTimeout), BugTracker.doUpdateMergeBoxSearch(t)
    },
    doUpdateMergeBoxSearch: function(e) {
        ajax.post("bugtracker", {
            act: "bind_box_search",
            q: e
        }, {
            showProgress: uiSearch.showProgress.pbind("bt_merge_box_search"),
            hideProgress: uiSearch.hideProgress.pbind("bt_merge_box_search"),
            onDone: function(e, t) {
                toggle("bt_merge_box_title", t.length), val("bt_merge_box_rows", e), window.radioBtns.original_id = {
                    els: geByClass("radiobtn", "bt_merge_box_rows"),
                    val: t[0]
                }
            }
        })
    },
    updateSearch: function(e) {
        clearTimeout(cur.btSearchTimeout), cur.btSearchTimeout = setTimeout(BugTracker.doUpdateSearch.pbind(e), 300)
    },
    forceUpdateSearch: function(e, t) {
        clearTimeout(cur.btSearchTimeout), BugTracker.doUpdateSearch(t, !0)
    },
    addSearchFilter: function(e, t, r) {
        var o = null;
        "platform" == e ? o = cur.btSearchPlatformDD : "platform_version" == e ? o = cur.btSearchPlatformVersionDD : "device" == e ? o = cur.btSearchDeviceDD : "version" == e ? o = cur.btSearchVersionDD : "tag" == e && (o = cur.btSearchTagsDD), o && (r && BugTracker.ddVisible(cur.btSearchProductDD) && cur.btSearchProductDD.val() != r && (cur.btPreventUpdateProduct = !0, cur.btSearchProductDD.val(r, !0)), o.val(t, !0))
    },
    ddVisible: function(e) {
        return isVisible(domPN(e.container))
    },
    updateSearchFilters: function(e) {
        var t = {
            0: "bugtracker"
        };
        nav.objLoc.act && (t.act = nav.objLoc.act), nav.objLoc.q && (t.q = nav.objLoc.q);
        var r = cur.btSearchProductDD.val(),
            o = cur.btSearchVersionDD.val(),
            a = cur.btSearchPlatformDD.val(),
            c = cur.btSearchPlatformVersionDD.val(),
            s = cur.btSearchStatusDD.val(),
            n = cur.btSearchSeverityDD.val(),
            u = cur.btSearchTagsDD.val(),
            i = cur.btSearchOriginalDD ? cur.btSearchOriginalDD.val() : 0,
            b = cur.btSearchDeviceDD.val();
        BugTracker.ddVisible(cur.btSearchProductDD) && (t.product = r), o > 0 && BugTracker.ddVisible(cur.btSearchVersionDD) && (t.version = o), a > 0 && BugTracker.ddVisible(cur.btSearchPlatformDD) && (t.platform = a), c && BugTracker.ddVisible(cur.btSearchPlatformVersionDD) && (t.pversion = c), b && BugTracker.ddVisible(cur.btSearchDeviceDD) && (t.device = b), s && (t.status = s), n && (t.severity = n), u && BugTracker.ddVisible(cur.btSearchTagsDD) && (t.tag = u), i && (t.original = i), isChecked("bt_sb_search_bookmarks") && (t.bookmarks = 1), isChecked("bt_sb_search_vulnerabilites") && (t.vulnerability = 1), ge("bt_sb_search_member") && nav.objLoc.mid && (t.mid = nav.objLoc.mid), isChecked("bt_sb_search_wishes") && (t.wish = 1), BugTracker.loadSearch(t, e)
    },
    doUpdateSearch: function(e, t) {
        e = e.toLowerCase(), (e != nav.objLoc.q || t) && (e ? nav.objLoc.q = e : delete nav.objLoc.q, BugTracker.loadSearch(nav.objLoc))
    },
    loadSearch: function(e, t) {
        nav.setLoc(e);
        var r = extend({}, e, {
            load: 1
        });
        t && cur.btMaxUDate && (r.min_udate = cur.btMaxUDate), delete r[0], ajax.post("bugtracker", r, {
            showProgress: uiSearch.showProgress.pbind("bt_search"),
            hideProgress: uiSearch.hideProgress.pbind("bt_search"),
            onDone: function(e, t) {
                removeClass("bt_reports", "bt_reports_reloading"), val("bt_page_content", e), BugTracker.checkSelectedReports(), cur.btMaxUDate = t
            }
        })
    },
    bookmark: function(e, t, r, o) {
        ajax.post("bugtracker", {
            act: "subscribe",
            v: r,
            id: e,
            hash: t
        }, {
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            onDone: function(e) {
                e && (toggleClass("bt_report_sb_subscribe_btns", "bt_report_sb_subscribed"), val("bt_report_sb_nsubscribers", e))
            }
        })
    },
    removeComment: function(e, t) {
        var r = ge("cmt" + e);
        r && ajax.post("bugtracker", {
            act: "remove_comment",
            id: e,
            hash: t
        }, {
            showProgress: addClass.pbind(r, "bt_report_cmt_processing"),
            hideProgress: removeClass.pbind(r, "bt_report_cmt_processing"),
            onDone: function(e) {
                addClass(r, "bt_report_cmt_removed"), r.appendChild(se(e))
            }
        })
    },
    restoreComment: function(e, t) {
        var r = ge("cmt" + e);
        r && ajax.post("bugtracker", {
            act: "restore_comment",
            id: e,
            hash: t
        }, {
            showProgress: addClass.pbind(r, "bt_report_cmt_processing"),
            hideProgress: removeClass.pbind(r, "bt_report_cmt_processing"),
            onDone: function() {
                re(geByClass1("_restore_msg", r)), removeClass(r, "bt_report_cmt_removed")
            }
        })
    },
    openChangeStatusBox: function(e, t) {
        if (!curBox()) {
            cur.btChangeStatusBox = new MessageBox({
                title: getLang("bugs_t_change_status_title")
            }), cur.btChangeStatusBox.content(cur.btChangeStatusBoxContent).show(), cur.btChangeStatusBoxStatusDD = new Dropdown(ge("bt_change_status_to"), cur.btStatuses, {
                big: 1,
                width: 400,
                multiselect: !1,
                autocomplete: !1
            });
            var r;
            cur.btChangeStatusBoxCallback = function() {
                isButtonLocked(r) || ajax.post("bugtracker", {
                    act: "change_status",
                    id: e,
                    hash: t,
                    status: cur.btChangeStatusBoxStatusDD.val(),
                    message: val("bt_change_status_comment")
                }, {
                    showProgress: lockButton.pbind(r),
                    hideProgress: unlockButton.pbind(r),
                    onDone: function() {
                        cur.btChangeStatusBox.hide()
                    }
                })
            }, r = cur.btChangeStatusBox.addButton(getLang("global_save"), cur.btChangeStatusBoxCallback, "ok", !0), autosizeSetup("bt_change_status_comment", {
                minHeight: 100,
                maxHeight: 500
            })
        }
    },
    removeReport: function(e, t) {
        var r = showFastBox(getLang("global_action_confirmation"), getLang("bugs_t_remove_report_confirm"), getLang("global_delete"), function() {
            r.hide(), ajax.post("bugtracker", {
                act: "remove",
                id: e,
                hash: t
            }, {
                showProgress: cur.newBugBox.showProgress,
                hideProgress: cur.newBugBox.hideProgress
            })
        }, getLang("global_cancel"))
    },
    loadMore: function(e) {
        var t = {
            load: 1,
            max_udate: cur.btMaxUDate
        };
        each(["act", "product", "device", "q", "mid", "vulnerability", "platform", "pversion", "status", "severity", "tag", "original", "bookmarks", "wish"], function(e, r) {
            nav.objLoc.hasOwnProperty(r) && (t[r] = nav.objLoc[r])
        }), ajax.post("bugtracker", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t, r) {
                cur.btMaxUDate = r, r || re(e);
                var o = sech(t),
                    a = ge("bt_reports");
                each(o, function(e, t) {
                    ge(t.id) || a.appendChild(t)
                }), BugTracker.checkSelectedReports()
            }
        })
    },
    initSelected: function() {
        cur.btSelected = {
            count: 0,
            reports: {}
        }
    },
    selectAllRows: function(e) {
        checkbox(e);
        var t = isChecked(e);
        each(geByClass("_sel_checkbox", "bt_reports"), function(e, r) {
            if (t != isChecked(r)) {
                var o = gpeByClass("bt_report_row", r),
                    a = o.id.replace("bugreport", "");
                checkbox(r, t), BugTracker.storeSelection(a, t)
            }
        }), BugTracker.updateSelectedCount()
    },
    storeSelection: function(e, t) {
        t ? cur.btSelected.reports[e] || (cur.btSelected.reports[e] = 1, cur.btSelected.count++) : cur.btSelected.reports[e] && (delete cur.btSelected.reports[e], cur.btSelected.count--)
    },
    selectReportRow: function(e, t) {
        checkbox(e), BugTracker.storeSelection(t, isChecked(e)), BugTracker.updateSelectedCount()
    },
    updateSelectedCount: function() {
        var e = ge("bt_search_selected");
        !isVisible(e) && cur.btSelected.count > 0 ? slideDown(e, 200) : isVisible(e) && !cur.btSelected.count && slideUp(e, 100), val(geByClass1("_count", "bt_search_selected_count"), getLang("bugs_t_X_reports_selected", cur.btSelected.count))
    },
    diselectAllReports: function() {
        BugTracker.initSelected();
        var e = ge("bt_reports"),
            t = ge("bt_search_selected");
        e && each(geByClass("_sel_checkbox", e), function(e, t) {
            checkbox(t, !1)
        }), t && isVisible(t) && slideUp(t, 100)
    },
    checkSelectedReports: function() {
        var e = ge("bt_reports");
        e && cur.btSelected && cur.btSelected.reports && each(e.children, function(e, t) {
            var r = t.id.replace("bugreport", ""),
                o = geByClass1("_sel_checkbox", t);
            checkbox(o, 1 == cur.btSelected.reports[r])
        })
    },
    getSelectedReportIds: function() {
        var e = [];
        return cur.btSelected && each(cur.btSelected.reports, function(t, r) {
            e.push(t)
        }), e
    },
    openMergeBox: function(e) {
        cur.btMergeBox = showBox("bugtracker", {
            act: "merge_box",
            ids: BugTracker.getSelectedReportIds()
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: function() {
                unlockButton(e), cur.btMergeBox.show()
            },
            params: {
                width: 550
            }
        })
    },
    merge: function(e) {
        var t = {
            act: "merge",
            ids: BugTracker.getSelectedReportIds(),
            to_id: radioval("original_id")
        };
        cur.btMergeBoxStatusDD && (t.status = cur.btMergeBoxStatusDD.val()), cur.btMergeBoxSeverityDD && (t.severity = cur.btMergeBoxSeverityDD.val()), ge("bt_merge_box_comment") && (t.comment = val("bt_merge_box_comment")), ge("bt_merge_box_vulnerability") && (t.set_vulnerability = radioval("set_vulnerability")), ajax.post("bugtracker", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                cur.btMergeBox && cur.btMergeBox.hide(), cur.btBindToBox && cur.btBindToBox.hide(), BugTracker.diselectAllReports(), addClass("bt_reports", "bt_reports_reloading"), BugTracker.updateSearchFilters(!0), showDoneBox(e)
            }
        })
    },
    unbind: function(e, t, r) {
        ajax.post("bugtracker", {
            act: "unbind",
            id: t,
            hash: r
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    makeOriginal: function(e, t, r) {
        var o = "by_original" == nav.objLoc.act ? nav.objLoc.id : 0,
            a = nav.objLoc.from;
        addClass("bt_reports", "bt_reports_reloading"), ajax.post("bugtracker", {
            act: "make_original",
            id: t,
            hash: r,
            original_id: o,
            from: a
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    checkReportsSelected: function(e, t, r, o) {
        var a = cur.btSelected ? cur.btSelected.count : 0;
        if (a) {
            ge("bt_tab_all") && uiTabs.switchTab(geByClass1("ui_tab", "bt_tab_all"), {
                noAnim: 1
            });
            var c = showFastBox(getLang("global_action_confirmation"), getLang("bugs_t_confirm_leave_selected_reports"), getLang("global_continue"), function() {
                c.hide(), BugTracker.diselectAllReports(), nav.go(r)
            }, getLang("global_cancel"));
            return !1
        }
    },
    openBindToBox: function(e) {
        cur.btBindToBox = showBox("bugtracker", {
            act: "bind_box",
            ids: BugTracker.getSelectedReportIds()
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: function() {
                unlockButton(e), cur.btBindToBox.show()
            },
            params: {
                width: 550
            }
        })
    },
    loadMoreUpdates: function(e) {
        ajax.post("bugtracker", {
            act: "updates",
            load: 1,
            max_time: cur.btMaxTime
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t, r) {
                cur.btMaxTime = r, cur.btMaxTime || hide(e);
                var o = sech(t),
                    a = ge("bt_updates");
                each(o, function(e, t) {
                    ge(t.id) || a.appendChild(t)
                })
            }
        })
    },
    loadMoreReporters: function(e) {
        ajax.post("bugtracker", {
            act: "reporters",
            load: 1,
            pos: cur.btPos,
            prev_rate: cur.btPrevRate,
            offset: cur.btOffset,
            sort: cur.btOrderBy,
            product: cur.btProduct
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(t, r, o, a) {
                cur.btOffset = r, cur.btPrevRate = a, cur.btPos = o, cur.btOffset || hide(e);
                var c = sech(t),
                    s = ge("bt_reporters");
                each(c, function(e, t) {
                    s.appendChild(t)
                })
            }
        })
    },
    markUpdatesRead: function() {
        setTimeout(function() {
            ajax.post("bugtracker", {
                act: "updates_clear"
            }, {});
            var e = ge("bt_updates"),
                t = function() {
                    var r = geByClass1("bt_report_cmt_new", e);
                    if (removeClass(r, "bt_report_cmt_new"), r) setTimeout(t, 500);
                    else {
                        var o = geByClass1("ui_tab_count", "bt_tab_updates");
                        setTimeout(val.pbind(o, ""), 2e3)
                    }
                };
            t()
        }, 500)
    },
    showSimilar: function(e, t) {
        var r = ge("bt_report_one_similar_list");
        hide(r), ajax.post("bugtracker", {
            act: "show_similar",
            id: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                show(r), val("bt_report_one_similar_list", e)
            }
        })
    },
    toggleSetRate: function() {
        var e = ge("bt_report_set_rate_form");
        isVisible(e) ? slideUp(e, 200) : slideDown(e, 200, function() {
            elfocus("bt_report_set_rate_form__rate"), autosizeSetup("bt_report_set_rate_form__note", {})
        })
    },
    saveRate: function() {
        var e = ge("bt_report_set_rate_form__btn");
        ajax.post("bugtracker", {
            act: "save_rate",
            id: cur.btReportId,
            hash: cur.btReportRateHash,
            rate: val("bt_report_set_rate_form__rate"),
            note: val("bt_report_set_rate_form__note")
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    setDropdownData: function(e, t) {
        var r = t || [];
        e && (e.setData(r), e.currenDataItems = r, e.select.content(r))
    },
    _eof: 1
};
try {
    stManager.done("bugtracker.js")
} catch (e) {}