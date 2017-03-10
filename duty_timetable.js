/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 3515753564
    Link: https://vk.com/js/al/duty_timetable.js?3515753564
    Last Update: 10.2.117
*/
var DTT = {
    showDoneBox: function(e) {
        if (!e) return void DTT.hideDoneBox();
        var t = ge("dtt_done_box"),
            o = ge("dtt_done_box_replacer");
        val(geByClass1("_content", t), e), show(t);
        var a = getSize(t)[1];
        o.style.height = a + "px", show(o)
    },
    hideDoneBox: function() {
        hide("dtt_done_box"), hide("dtt_done_box_replacer")
    },
    initMonthly: function() {},
    initDaily: function(e) {
        var t = ge("dtt_day_u");
        t && (cur.shiftEditorUser = new Dropdown(t, cur.users, {
            width: 180,
            autocomplete: !0,
            multiple: !1,
            placeholder: getLang("timetable_user_placeholder"),
            selectedItems: cur.users[0][0]
        }), e && cur.shiftEditorUser.val(e))
    },
    showShiftEditor: function(e, t) {
        if (!hasClass(t, "_editing")) {
            addClass(t, "_editing"), addClass(t, "dtt_day_h_editing");
            var o = val(t);
            data(t, "old_val", o), val(t, cur.shiftEditor.split("%id%").join(e));
            var a = ge("dtt_editor_" + e);
            val(a, o), elfocus(a)
        }
    },
    shiftEditorCheckKey: function(e, t, o, a) {
        if (o.keyCode == KEY.ENTER) DTT.saveShiftEditor(e, t, a);
        else if (o.keyCode == KEY.ESC) try {
            DTT.cancelShiftEdit(domPN(a))
        } catch (o) {}
    },
    shiftEditorBlur: function(e, t, o) {
        var a = domPN(o),
            n = data(a, "old_val");
        hasClass(a, "_saving") || n != val(o) || DTT.cancelShiftEdit(a)
    },
    cancelShiftEdit: function(e) {
        return hasClass(e, "_saving") ? !1 : (val(e, data(e, "old_val")), removeClass(e, "_editing"), removeClass(e, "dtt_day_h_editing"), !0)
    },
    saveShiftEditor: function(e, t, o) {
        var a = domPN(o),
            n = cur.shiftEditorUser.val();
        return t || n ? void ajax.post("duty_timetable.php", {
            act: "a_edit",
            id: t,
            dept: e,
            val: val(o),
            ts: nav.objLoc.ts,
            uid: n
        }, {
            showProgress: function() {
                attr(o, "readonly", "readonly"), addClass(a, "_saving")
            },
            hideProgress: function() {
                o.removeAttribute("readonly"), removeClass(a, "_saving")
            },
            onDone: function(e, t, o, n) {
                showDoneBox(e), DTT.showDoneBox(n);
                var s = [],
                    d = cur.shiftEditorUser.val();
                removeClass(a, "_editing"), removeClass(a, "dtt_day_h_editing"), each(geByClass("_editing", "dtt_day"), function(e, t) {
                    s.push([t.id, val(t), val(domFC(t)), data(t, "old_val")])
                }), domReplaceEl(ge("dtt_day_filling"), se(t)), domReplaceEl(ge("dtt_day"), se(o)), each(s, function(e, t) {
                    var o = ge(t[0]);
                    if (o) {
                        addClass(o, "_editing"), addClass(o, "dtt_day_h_editing"), val(o, t[1]);
                        var a = domFC(o);
                        val(a, t[2]), data(o, "old_val", t[3]), 0 == e && elfocus(a)
                    }
                }), DTT.initDaily(d)
            },
            onFail: function() {
                notaBene(o)
            }
        }) : void notaBene(cur.shiftEditorUser.container)
    },
    removeShift: function(e, t, o) {
        var a = ge("dtt_editor_" + t);
        a && DTT.cancelShiftEdit(domPN(a)), ajax.post("duty_timetable.php", {
            act: "a_remove",
            dept: e,
            id: t,
            ts: nav.objLoc.ts
        }, {
            onDone: function(e, t) {
                var a = gpeByClass("_a", o);
                data(a, "content", val(a)), val(a, e), domReplaceEl(ge("dtt_day_filling"), se(t))
            }
        })
    },
    restoreShift: function(e, t, o) {
        var a = ge("dtt_editor_" + t);
        a && DTT.cancelShiftEdit(domPN(a)), ajax.post("duty_timetable.php", {
            act: "a_restore",
            dept: e,
            id: t,
            ts: nav.objLoc.ts
        }, {
            onDone: function(e) {
                var t = gpeByClass("_a", o);
                val(t, data(t, "content")), domReplaceEl(ge("dtt_day_filling"), se(e))
            }
        })
    },
    dayKeyDownHandler: function(e) {
        if (e.ctrlKey || e.metaKey && browser.mac) {
            var t = null;
            e.keyCode == KEY.LEFT ? (t = extend({}, nav.objLoc), t.ts = cur.prevDayTs) : e.keyCode == KEY.RIGHT && (t = extend({}, nav.objLoc), t.ts = cur.nextDayTs), t && (nav.go(t), cancelEvent(e))
        }
    },
    monthKeyDownHandler: function(e) {
        (e.ctrlKey || e.metaKey && browser.mac) && (67 == e.keyCode ? DTT.openCopyBox(null, cur.dept) : 88 == e.keyCode && DTT.openCopyBox(null, cur.dept, 1))
    },
    openCopyBox: function(e, t, o) {
        var a = {
            act: "copy_box",
            cells: DTT.getDayPairs(),
            dept: t,
            move: o ? 1 : 0
        };
        a.cells.length && (cur.copyBox = showBox("duty_timetable.php", a))
    },
    copy: function() {
        var e = ge("dtt_copy_box_btn");
        ajax.post("duty_timetable.php", {
            act: cur.move ? "a_move" : "a_copy",
            dept: cur.dept,
            cells: cur.cells,
            ts_to: val("dtt_copy_box_to"),
            uid_to: cur.users.length ? cur.copyBoxUserDD.val() : 0,
            ts: nav.objLoc.ts
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, t, o) {
                showDoneBox(e), domReplaceEl(ge("dtt_month"), se(t)), DTT.updatePanel(!0), cur.copyBox.hide(), DTT.showDoneBox(o)
            }
        })
    },
    getDayPairs: function() {
        var e = geByClass("_sel", "dtt_month"),
            t = [];
        return e.length ? (each(e, function(e, o) {
            t.push(attr(o, "uid") + "_" + attr(o, "ts"))
        }), t) : t
    },
    clearDaySel: function() {
        var e = geByClass("_sel", "dtt_month");
        return each(e, function(e, t) {
            removeClass(t, "_sel"), removeClass(t, "dtt_month_d_sel")
        }), DTT.updatePanel(!0), e.length
    },
    dayOver: function(e, t) {
        var o;
        cur.mousePressed && (e.shiftKey ? (o = domPN(t), toggleClass(o, "dtt_month_d_sel", cur.mouseBrushSel), toggleClass(o, "_sel", cur.mouseBrushSel), DTT.updatePanel(), cancelEvent(e)) : e.altKey && (o = domPN(t), hasClass(o, "_sel") && (removeClass(o, "dtt_month_d_sel"), removeClass(o, "_sel"), DTT.updatePanel()), cancelEvent(e)))
    },
    dayOut: function(e, t) {
        domPN(t)
    },
    dayDown: function(e, t) {
        if (e.shiftKey) {
            cur.mousePressed = !0;
            var o = domPN(t);
            cur.mouseBrushSel = !hasClass(o, "_sel"), toggleClass(o, "dtt_month_d_sel", cur.mouseBrushSel), toggleClass(o, "_sel", cur.mouseBrushSel), DTT.updatePanel(), cancelEvent(e), cur.overEl = o
        } else e.altKey && (cur.mousePressed = !0, o = domPN(t), hasClass(o, "_sel") && (removeClass(o, "dtt_month_d_sel"), removeClass(o, "_sel"), DTT.updatePanel()), cur.overEl = o, cancelEvent(e))
    },
    dayUp: function(e, t) {
        cur.mousePressed = !1;
        domPN(t)
    },
    dayClick: function(e, t) {
        if (o = domPN(t), e.ctrlKey || e.metaKey && browser.mac) DTT.openDayBox(o), cancelEvent(e);
        else if (e.shiftKey || e.altKey) {
            var o = domPN(t);
            o == cur.overEl && cancelEvent(e)
        } else DTT.clearDaySel() && cancelEvent(e)
    },
    updatePanel: function(e) {
        var t = [];
        if (e || (t = geByClass("_sel", "dtt_month")), toggle("dtt_month_actions", t.length), t.length) {
            var o = {
                    uhours: [getLang("timetable_u_hours"), 0],
                    nhours: [getLang("timetable_n_hours"), 0],
                    hhours: [getLang("timetable_h_hours"), 0],
                    nhhours: [getLang("timetable_nh_hours"), 0]
                },
                a = 0;
            each(t, function(e, t) {
                each(o, function(e, n) {
                    var s = parseInt(attr(t, e));
                    o[e][1] += s, a += s
                })
            });
            var n = [];
            each(o, function(e, t) {
                t[1] > 0 && n.push(t[0].replace("%s", t[1]))
            }), val("dtt_month_actions_hours_details", n.join("<br>")), val("dtt_month_actions_hours_total", getLang("timetable_total_hours").replace("%s", a))
        }
    },
    openDayBox: function(e) {
        cur.dttDayBox = showBox("duty_timetable.php", {
            act: "day_box",
            dept: cur.dept,
            uid: attr(e, "uid"),
            ts: attr(e, "ts")
        }, {
            params: {
                hideButtons: !0,
                width: 300,
                onHide: removeEvent.pbind(document, "keydown", DTT.dayBoxKeyHandler)
            }
        }, {
            type: "custom"
        })
    },
    dayBoxInputKeyHandler: function(e) {
        13 == e.keyCode && DTT.saveDayBox(e.target), e.keyCode != KEY.ESC && 84 != e.keyCode && e.stopPropagation(), 84 == e.keyCode && e.preventDefault()
    },
    dayBoxKeyHandler: function(e) {
        if (e.keyCode >= 49 && e.keyCode <= 57) {
            var t = ge("btt_day_box_btn" + (e.keyCode - 48));
            t && DTT.saveDayBox(t)
        } else if (84 == e.keyCode) {
            var t = ge("dtt_day_box_use_template");
            t && DTT.saveDayBoxTemplates(t)
        }
    },
    saveDayBox: function(e) {
        ajax.post("duty_timetable.php", {
            act: "a_save_day",
            dept: cur.dept,
            uid: cur.dttUid,
            ts_to: cur.dttTs,
            val: val(e),
            ts: nav.objLoc.ts
        }, {
            showProgress: addClass.pbind(e, "dtt_day_box_btn_locked"),
            hideProgress: removeClass.pbind(e, "dtt_day_box_btn_locked"),
            onDone: function(e, t, o) {
                domReplaceEl(ge("dtt_month"), se(t)), DTT.updatePanel(!0), cur.dttDayBox.hide(), showDoneBox(e), DTT.showDoneBox(o)
            }
        })
    },
    saveDayBoxTemplates: function(e) {
        ajax.post("duty_timetable.php", {
            act: "a_save_day_templates",
            dept: cur.dept,
            uid: cur.dttUid,
            ts_to: cur.dttTs,
            ts: nav.objLoc.ts
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, t, o) {
                domReplaceEl(ge("dtt_month"), se(t)), DTT.updatePanel(!0), cur.dttDayBox.hide(), showDoneBox(e), DTT.showDoneBox(o)
            }
        })
    },
    dayTT: function(e, t, o) {
        var a = {
            center: 1,
            dir: "top",
            className: "dtt_month_day_tt"
        };
        hasClass(domPN(t), "_no_hours") ? a.text = getLang("timetable_no_entries") : a.text = o, showTooltip(t, a), cancelEvent(e)
    },
    openTemplatesEditor: function(e) {
        cur.dttTemplatesBox = showBox("duty_timetable.php", {
            act: "templates_box",
            id: e,
            dept: cur.dept
        }, {
            params: {
                width: 400
            }
        })
    },
    templateRemoveRow: function(e) {
        var t = geByClass("_row", "dtt_templates_box_list"),
            o = gpeByClass("_row", e);
        1 == t.length ? val(geByClass1("_input", o), "") : re(o)
    },
    templateKeyDown: function(e, t) {
        if (e.keyCode == KEY.ENTER) {
            var o = gpeByClass("_row", t),
                a = domNS(o);
            a || (a = se(cur.dttTemplateBoxRowTemplate), ge("dtt_templates_box_list").appendChild(a)), elfocus(geByClass1("_input", a)), cancelEvent(e)
        }
    },
    saveTemplates: function() {
        var e = [];
        each(geByClass("_input", "dtt_templates_box_list"), function(t, o) {
            e.push(val(o))
        }), ajax.post("duty_timetable.php", {
            act: "a_save_templates",
            id: cur.dttTemplateBoxUid,
            dept: cur.dept,
            hours: e
        }, {
            onDone: function(e) {
                cur.dttTemplatesBox.hide(), showDoneBox(e)
            }
        })
    },
    monthHeadTT: function(e, t) {
        showTooltip(e, {
            center: 1,
            dir: "top",
            className: "dtt_month_day_tt",
            text: t
        })
    },
    dayFillingTT: function(e, t) {
        showTooltip(e, {
            center: 1,
            dir: "top",
            className: "dtt_month_day_tt",
            text: t
        })
    },
    weeklyLoadMore: function(e) {
        var t = extend({}, nav.objLoc);
        t.ts = cur.dttWeeklyTsTo, t.load = 1, ajax.post("duty_timetable.php", t, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, t) {
                cur.dttWeeklyTsTo = t;
                var o = sech(e),
                    a = ge("dtt_weekly_rows");
                each(o, function(e, t) {
                    a.appendChild(t)
                })
            }
        })
    }
};
try {
    stManager.done("duty_timetable.js")
} catch (e) {}