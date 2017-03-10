/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 2030679272
    Link: https://vk.com/js/al/offers.js?2030679272
    Last Update: 10.2.117
*/
var Offers = {
    init: function() {
        cur.statusesDD = []
    },
    edit: function(e) {
        return showBox("offers.php", {
            act: "edit",
            offer_id: e
        }), !1
    },
    preview: function(e) {
        showBox("offers.php", {
            act: "show",
            preview: 1,
            offer_id: e || 0
        })
    },
    getSecret: function() {
        ajax.post("offers.php", {
            act: "show_secret",
            offer_id: cur.offerId
        }, {
            onDone: function(title, html, js) {
                var box = showFastBox(title, html);
                eval(js)
            }
        })
    },
    switchTab: function(e, o, s) {
        if (s && (2 == s.button || s.ctrlKey)) return !1;
        var r = ge("tab_" + e);
        if (r) {
            var t = geByClass("active_link", ge("offers_tabs"));
            for (var f in t) removeClass(t[f], "active_link");
            addClass(r, "active_link")
        }
        return show("pages_progress"), hide("pages_right_link"), nav.go(o, s)
    },
    gotoTable: function(e, o) {
        var s = nav.fromStr(nav.strLoc);
        return delete s.f, s.f = e, nav.go(nav.toStr(s), o), !1
    },
    save: function() {
        var e = {
            act: "do_edit",
            offer_id: cur.offerId,
            title: val("offer_title"),
            short_desc: val("offer_short_desc"),
            desc: val("offer_desc"),
            man: val("offer_man"),
            link: val("offer_link"),
            link_type: cur.uiLinkType.val(),
            link_id: val("offer_link_id"),
            complete_on_join: cur.uiJoinComplete.checked() ? 1 : 0,
            tag: val("offer_tag"),
            need_validation: cur.uiValidation.val(),
            country: cur.uiCountry.val(),
            city: cur.uiCity.val(),
            sex: cur.uiSex.val(),
            age_from: cur.uiAgeFrom.val(),
            age_to: cur.uiAgeTo.val(),
            browser: cur.uiBrowser.val(),
            operator: cur.uiOperator.val(),
            status: cur.uiStatus.val(),
            percent: val("offer_percent")
        };
        ge("offer_limit") && (e.limit = val("offer_limit")), ge("offer_day_limit") && (e.day_limit = val("offer_day_limit")), ge("offer_spent") && (e.spent = val("offer_spent")), ge("offer_cost_field") && (e.cost = val("offer_cost_field")), lockButton(ge("offers_save")), ajax.post("offers.php", e, {
            onDone: function(e, o, s, r) {
                debugLog(arguments), unlockButton(ge("offers_save"));
                var t = ge("offers_msg");
                if (removeClass(t, "offers_error"), t.innerHTML = e, show(t), setStyle(t, {
                        backgroundColor: "#F4EBBD"
                    }), animate(t, {
                        backgroundColor: "#F9F6E7"
                    }, 2e3), scrollToTop(200), o && (show("secret_field"), show("tab_test"), ge("offers_edit_hidden_secret").innerHTML = o), s) {
                    cur.offerId = s, cur.deleteHash = r, nav.setLoc("offersdesk?act=edit&offer_id=" + s);
                    var f = geByTag("a", ge("offers_tabs"));
                    each(f, function() {
                        this.href = (this.href || "").replace(/offer_id=([0-9]+)/, "offer_id=" + s)
                    })
                }
            },
            onFail: function(e) {
                if ("offer_" == e.substr(0, 6)) notaBene(e);
                else {
                    var o = ge("offers_msg");
                    addClass(o, "offers_error"), o.innerHTML = e, show(o), setStyle(o, {
                        backgroundColor: "#FCEC42"
                    }), animate(o, {
                        backgroundColor: "#FFEFE8"
                    }, 2e3), scrollToTop()
                }
                return unlockButton(ge("offers_save")), !0
            }
        })
    },
    remove: function() {
        var e = showFastBox(cur.lang.offers_remove, cur.lang.offers_remove_sure, getLang("box_yes"), function() {
            e.showProgress(), ajax.post("offers.php", {
                act: "do_delete",
                hash: cur.deleteHash,
                offer_id: cur.offerId
            }, {
                onDone: function() {
                    e.showProgress(), nav.go("offersdesk")
                }
            })
        }, getLang("box_no"))
    },
    ddStatus: function(e, o, s) {
        var r, t, f, n = o + "_" + s,
            a = cur.statusesDD[n];
        a || (3 == s ? (t = '<span class="offers_dd_title offers_dd_on_h"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_on + "</span>", f = '<span class="offers_dd_title offers_dd_off"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_off + "</span>", r = [{
            i: 2,
            l: f
        }]) : 2 == s ? (t = '<span class="offers_dd_title offers_dd_off_h"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_off + "</span>", f = '<span class="offers_dd_title offers_dd_on"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_on + "</span>", r = [{
            i: 3,
            l: f
        }]) : 1 == s ? (t = '<span class="offers_dd_title offers_dd_wait_h"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_moderate + "</span>", f = '<span class="offers_dd_title offers_dd_off"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_off + "</span>", r = [{
            i: 0,
            l: f
        }]) : 0 == s && (t = '<span class="offers_dd_title offers_dd_off_h"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_off + "</span>", f = '<span class="offers_dd_title offers_dd_wait"></span><span class="offers_dd_text">' + cur.lang.offers_statuses_moderate_send + "</span>", r = [{
            i: 1,
            l: f
        }]), debugLog("create"), a = new DropdownMenu(r, {
            target: e,
            title: t,
            showHover: !1,
            offsetLeft: -1,
            offsetTop: 0,
            containerClass: "dd_menu_posts",
            onSelect: function(e) {
                a.destroy(), delete cur.statusesDD[n], Offers.changeStatus(o, a.val())
            }
        }), cur.statusesDD[n] = a), debugLog(a), cur.dd = a, a.show(), addClass(a.header, "dd_wide"), addClass(a.body, "dd_wide")
    },
    changeStatus: function(e, o) {
        var s = ge("offers_row_" + e);
        s.innerHTML = '<img class="offers_center_upl" src="/images/upload.gif" />', ajax.post("offers.php", {
            act: "do_change_status",
            offer_id: e,
            hash: cur.hash,
            status: o
        }, {
            onDone: function(e) {
                s.innerHTML = e
            }
        })
    },
    changeLimit: function(e, o, s) {
        var r = getXY(e),
            t = ge("offers_limit_box");
        cur.limitOfferId = o, cur.limitObj = e, cur.limitDay = s, cur.startLimitBoxPos || (show(t), cur.startLimitBoxPos = getXY(t)), r[0] -= cur.startLimitBoxPos[0] + 18, r[1] -= cur.startLimitBoxPos[1] + 17, setStyle(t, {
            marginLeft: r[0],
            marginTop: r[1]
        }), show(t);
        var f = ge("offers_limit_input");
        val(f, parseInt(e.innerHTML.replace(/<.*>/g, "")) || 0), f.focus(), setTimeout(function() {
            cur.onMouseClick = function(e) {
                for (var o = e.target; o = o.parentNode;)
                    if (o == t) return !1;
                Offers.hideFocusBox()
            }
        }, 0)
    },
    hideFocusBox: function() {
        hide("offers_limit_box"), cur.onMouseClick = !1
    },
    saveLimit: function() {
        var e = val("offers_limit_input");
        e = parseInt(e), lockButton(ge("offers_limit_save_btn")), ajax.post("offers.php", {
            act: "do_change_limit",
            offer_id: cur.limitOfferId,
            hash: cur.hash,
            limit: e,
            per_day: cur.limitDay
        }, {
            onDone: function() {
                if (e) {
                    e = e.toString();
                    for (var o = [], s = e.length - 3; s > -3; s -= 3) o.unshift(e.slice(s > 0 ? s : 0, s + 3));
                    e = o.join('<span style="font-size:60%"> </span>'), cur.limitObj.innerHTML = e
                } else cur.limitObj.innerHTML = cur.lang.offers_no_limit_set;
                unlockButton(ge("offers_limit_save_btn")), Offers.hideFocusBox()
            },
            onFail: function() {
                unlockButton(ge("offers_limit_save_btn"))
            }
        })
    },
    addToBanBox: function(e, o) {
        var s = getLang("offers_" + e + "_box_title");
        return ge("offers_ban_box_input").setAttribute("placeholder", getLang("offers_" + e + "_input")), cur.options.banType = e, cur.banBox = showFastBox(s, ge("offers_ban_box").innerHTML, getLang("global_add"), function() {
            Offers.searchToBan(o)
        }, getLang("box_cancel")), !1
    },
    searchToBan: function(e) {
        var o = ge("offers_ban_box_input"),
            s = trim(val(o)),
            r = cur.options.banType;
        return s ? (hide("offers_ban_box_error"), void ajax.post("offers.php", {
            act: "search_blacklist",
            type: r,
            query: s,
            offer_id: e,
            hash: cur.options.hash
        }, {
            onDone: function(e, s, t) {
                if (!e) return ge("offers_ban_box_error").innerHTML = s, void show("offers_ban_box_error");
                if (val(o, ""), s && -1 != s && (ge("offers_" + r + "_summary").innerHTML = s), t) {
                    var f = ce("div", {
                            innerHTML: t
                        }).firstChild,
                        n = ge("offers_" + r);
                    re(f.id), n.insertBefore(f, n.firstChild), hide("offers_" + r + "_empty")
                }
                cur.banBox.hide()
            },
            showProgress: function() {
                cur.banBox.showProgress()
            },
            hideProgress: function() {
                cur.banBox.hideProgress()
            }
        })) : void o.focus()
    },
    addToBan: function(e, o, s, r) {
        return ajax.post("offers.php", {
            act: "a_add_to_bl",
            type: e,
            oid: o,
            offer_id: s,
            hash: cur.options.hash
        }, {
            onDone: function(t) {
                t && (ge("offers_" + e + "_summary").innerHTML = t), r.onclick = function() {
                    return Offers.delFromBan(e, o, s, r), !1
                }, r.innerHTML = getLang("offers_unban")
            },
            onFail: function(e) {
                return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
            },
            showProgress: function() {
                hide(r), show("offers_progress_" + e + o)
            },
            hideProgress: function() {
                show(r), hide("offers_progress_" + e + o)
            }
        }), !1
    },
    delFromBan: function(e, o, s, r) {
        return ajax.post("offers.php", {
            act: "a_del_from_bl",
            type: e,
            oid: o,
            offer_id: s,
            hash: cur.options.hash
        }, {
            onDone: function(t) {
                t && (ge("offers_" + e + "_summary").innerHTML = t), r.onclick = function() {
                    return Offers.addToBan(e, o, s, r), !1
                }, r.innerHTML = getLang("offers_reban")
            },
            onFail: function(e) {
                return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
            },
            showProgress: function() {
                hide(r), show("offers_progress_" + e + o)
            },
            hideProgress: function() {
                show(r), hide("offers_progress_" + e + o)
            }
        }), !1
    },
    _eof: 1
};
try {
    stManager.done("offers.js")
} catch (e) {}