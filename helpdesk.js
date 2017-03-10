/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 1914960490
    Link: https://vk.com/js/al/helpdesk.js?1914960490
    Last Update: 10.2.117
*/
Helpdesk = {
    goTab: function(e, t) {
        return inArray(nav.objLoc.act || "", ["history", "all"]) && nav.objLoc.q && (e.href += "&q=" + encodeURIComponent(nav.objLoc.q)), uiTabs.goTab(e, t, !0)
    },
    switchSubTab: function(e, t, s) {
        return checkEvent(s) || hasClass(e, "active") ? !1 : (each(geByClass("tickets_subtab1", ge("tickets_subtabs")), function(e, t) {
            removeClass(t, "active")
        }), addClass(e, "active"), nav.go(t, s))
    },
    addBug: function(e) {
        return !showBox("helpdesk", {
            act: "add_bug",
            hash: e,
            ticket_id: cur.ticket_id
        }, {
            params: {
                width: 620,
                bodyStyle: "padding: 0px"
            }
        })
    },
    addTemplate: function() {
        return !showBox("helpdesk", {
            act: "add_template",
            section: cur.selectedSection
        }, {
            params: {
                width: 630
            },
            dark: 1,
            cache: 1
        })
    },
    saveTemplate: function(tid) {
        if (!ge("add_template_title") || !ge("add_template_text")) return !1;
        var title = Emoji.val(geByClass1("_add_template_title_field" + tid)),
            text = trim(ge("add_template_text").value),
            anySectionChecked = isChecked("mobile_template") || isChecked("desktop_template") || isChecked("desktop_old_template") || isChecked("langs_template");
        if (!title) return notaBene("add_template_title_wrap"), !1;
        if (!text) return notaBene("add_template_text"), !1;
        if (!anySectionChecked) return notaBene("add_template_sections"), !1;
        var attachs = [],
            chosen = cur.ticketsTemplateMedia.chosenMedias;
        if (chosen)
            for (var i in chosen) {
                var att = chosen[i],
                    type = att[0],
                    value = att[1];
                ("photo" == type || "doc" == type) && attachs.push(type + "," + value)
            }
        var query = {
            act: "save_template",
            title: title,
            text: text,
            attachs: attachs,
            personal: isChecked("own_template"),
            mobile: isChecked("mobile_template"),
            desktop: isChecked("desktop_template"),
            desktop_old: isChecked("desktop_old_template"),
            langs: isChecked("langs_template"),
            by_default: isChecked("default_template"),
            hash: cur.hashes.template_hash,
            from_section: cur.selectedSection
        };
        tid && (query.template_id = tid);
        var box = curBox();
        return ajax.post("helpdesk", query, {
            progress: tid ? "" : box.progress,
            onDone: function(title, links, script) {
                val("template_links", links), val("template_title", '<a onclick="return Helpdesk.deselectTemplate(' + tid + ')">' + title + "</a>"), script && eval(script), box.hide()
            },
            onFail: function() {
                box.hide()
            }
        }), !1
    },
    switchTemplates: function(section, sel) {
        var query = {
                act: "get_templates",
                section: section,
                hash: cur.hashes.template_hash
            },
            actions = geByClass("_templates_switch");
        return each(actions, function(e, t) {
            removeClass(t, "templates_switch_selected")
        }), addClass(sel, "templates_switch_selected"), cur.selectedSection = intval(section), ajax.post("helpdesk", query, {
            onDone: function(content, script) {
                ge("template_links").innerHTML = content, script && eval(script)
            }
        }), !1
    },
    editTemplate: function() {
        return !showBox("helpdesk", {
            act: "edit_template",
            template_id: cur.selectedTemplate
        }, {
            params: {
                width: 630
            },
            dark: 1
        })
    },
    deleteTemplate: function() {
        if (!cur.selectedTemplate) return !1;
        var box = curBox();
        return box && box.isVisible() && box.hide({
            fasthide: 1
        }), box = showFastBox({
            title: getLang("support_delete_template_title"),
            width: 430,
            dark: 1
        }, getLang("support_delete_template_confirm"), getLang("global_delete"), function() {
            var tid = cur.selectedTemplate;
            Helpdesk.deselectTemplate(tid), ajax.post("helpdesk", {
                act: "delete_template",
                template_id: tid,
                hash: cur.hashes.template_hash,
                from_section: cur.selectedSection
            }, {
                progress: box.progress,
                onDone: function(content, script) {
                    ge("template_links").innerHTML = content, script && eval(script), box.hide()
                },
                onFail: function() {
                    box.hide()
                }
            })
        }, getLang("global_cancel")), !1
    },
    selectTemplate: function(e) {
        var t = cur.templates[e];
        if (!t) return !1;
        var s = cur.editing ? ge("reply" + cur.editing + "edit") : ge("tickets_reply"),
            a = s.scrollTop,
            o = 0,
            i = s.selectionStart || "0" == s.selectionStart ? "ff" : document.selection ? "ie" : !1,
            c = replaceEntities(t.text.replace(/<br>/g, "\n")) + "\n";
        if ("ie" == i) {
            s.focus();
            var r = document.selection.createRange();
            r.collapse(!0), r.moveStart("character", -s.value.length), o = r.text.length
        } else "ff" == i && (o = s.selectionStart);
        if (o += c.length, "ie" == i) {
            s.focus();
            var r = document.selection.createRange();
            r.moveStart("character", -s.value.length), r.moveStart("character", o), r.moveEnd("character", 0), r.select()
        } else "ff" == i && (s.selectionStart = o, s.selectionEnd = o, s.focus());
        var n = s.value.substring(0, o - c.length),
            l = s.value.substring(o - c.length, s.value.length);
        if (s.value = n + c + l, s.scrollTop = a, s.autosize || autosizeSetup(s, {
                minHeight: 42,
                maxHeight: 100
            }), s.autosize.update(), "ie" == i) {
            var r = s.createTextRange();
            r.move("character", o), r.select()
        } else "ff" == i && (s.focus(), s.setSelectionRange(o, o));
        if (val("template_title", '<a onclick="return Helpdesk.deselectTemplate(' + e + ')">' + t.title + "</a>"), setStyle("edit_template", {
                display: vk.id == intval(t.author_id) || cur.canEditTemplates ? "inline-block" : "none"
            }), cur.selectedTemplate = e, t.attachs) {
            var d = cur.editing ? cur.ticketsEditMedia : cur.ticketsNewMedia;
            for (var u in t.attachs) d.chooseMedia(t.attachs[u][0], t.attachs[u][1], t.attachs[u][2])
        }
        return Helpdesk.focusOnCursor(s), cur.canUseDrafts && (clearTimeout(cur.saveDraftTO), Tickets.saveDraft(cur.ticket_id)), each(geByClass("template_selected", "template_links"), function(e, t) {
            removeClass(t, "template_selected")
        }), !1
    },
    saveTemplatesOrder: function() {
        var e = ge("template_links"),
            t = Array.from(domQuery(".template", e)).map(function(e) {
                return e.id.replace("template", "")
            });
        ajax.post("helpdesk", {
            act: "save_templates_order",
            from_section: cur.selectedSection,
            template_ids: t
        })
    },
    focusOnCursor: function(e) {
        var t = val(e),
            s = t.indexOf("{cursor}"); - 1 != s && (t = t.replace("{cursor}", ""), val(e, t), setTimeout(elfocus.pbind(e, s), 0))
    },
    deselectTemplate: function(e) {
        return cur.templates[e] && ge("tickets_reply").value == replaceEntities(cur.templates[e].text.replace(/<br>/g, "\n")) && (ge("tickets_reply").setValue(""), ge("tickets_reply").autosize || autosizeSetup("tickets_reply", {
            minHeight: 42,
            maxHeight: 100
        }), ge("tickets_reply").autosize.update()), val("template_title", getLang("support_templates")), hide("edit_template"), delete cur.selectedTemplate, !1
    },
    clearCommentsFlood: function(e, t, s) {
        hide("tickets_flood_msg"), ajax.post("helpdesk", {
            act: "clear_flood",
            mid: e,
            section: t,
            hash: s
        })
    },
    exportDesktopTemplates: function(e) {
        var t = function(t, s) {
            if (t.isVisible() && s) {
                var a = geByClass1("_templates_switch" + e);
                Helpdesk.switchTemplates(e, a)
            }
        };
        return !showBox("al_helpdesk.php", {
            act: "export_desktop_templates",
            section: e
        }, {
            dark: 1,
            onDone: t
        })
    },
    getNewTicket: function(hash) {
        ajax.post("helpdesk", {
            act: "get_ticket",
            hash: hash
        }, {
            onDone: function(content, script) {
                content && val("tickets_content", content), script && eval(script)
            },
            showProgress: lockButton.pbind(ge("tickets_send")),
            hideProgress: unlockButton.pbind(ge("tickets_send"))
        })
    },
    getNextTicket: function() {
        return ajax.post("helpdesk", {
            act: "get_next",
            ticket_id: cur.ticket_id,
            hash: cur.hashes.next_hash
        }), !1
    },
    delegateAllTickets: function(hash, btn) {
        return ajax.post("helpdesk", {
            act: "stop_working",
            hash: hash
        }, {
            onDone: function(content, script) {
                content && (ge("tickets_content").innerHTML = content), script && eval(script)
            },
            showProgress: addClass.pbind(btn, "tickets_delegate_btn_process"),
            hideProgress: removeClass.pbind(btn, "tickets_delegate_btn_process")
        }), !1
    },
    showCommentReplies: function(e) {
        return showBox("helpdesk", {
            act: "replies_box",
            reply_id: e
        }, {
            params: {
                width: "727px",
                hideButtons: !0,
                bodyStyle: "padding: 0px; border: 0px;"
            }
        }), !1
    },
    showMemberCardCommentsTT: function(e, t, s) {
        showTooltip(e, {
            url: "meminfo",
            params: {
                act: "load_card_comments",
                mid: t,
                hash: s
            },
            slide: 15,
            className: "tickets_member_info_tt member_info_tt",
            shift: [50, 0, 10],
            hasover: 1,
            forcetodown: 1,
            toup: 1,
            showdt: 200,
            hidedt: 200,
            no_shadow: !0
        })
    },
    showGroupCardCommentsTT: function(e, t, s) {
        showTooltip(e, {
            url: "groupinfo",
            params: {
                act: "load_card_comments",
                mid: t,
                hash: s
            },
            slide: 15,
            className: "tickets_group_info_tt member_info_tt",
            shift: [170, 0, 10],
            hasover: 1,
            forcetodown: 1,
            toup: 1,
            showdt: 200,
            hidedt: 200,
            no_shadow: !0
        })
    },
    passTo: function(e, t, s) {
        var a = cur.pass_warnings && cur.pass_warnings[t] || cur.pass_warnings[0],
            o = '<div class="msg tickets_pass_to_msg">' + a + '</div><div style="line-height: 160%">' + getLang("support_sure_pass").replace("{section}", val(e)) + "<br>";
        cur.cat_average_times && intval(cur.cat_average_times[t]) > 0 && (o += getLang("support_cat_median_waiting") + "<b>" + cur.cat_average_times[t] + "</b>.<br>"), o += "</div>", o += '<div class="tickets_add_comm">' + getLang("support_comment") + '</div><textarea id="tickets_pass_comm" onkeydown="if (curBox()) curBox().changed = 1; onCtrlEnter(event, Helpdesk.doPass.pbind(' + t + ", val('tickets_pass_comm'), curBox()))\"></textarea>", o += cur.support_pass_comment, 16 != t && 17 != t && 18 != t || cur.isMobileTicket || (o += '<input type="hidden" id="support_send_payform" value="' + (cur.sendPayFormDefault ? 1 : "") + '" />');
        var i = showFastBox({
            title: getLang("support_pass_title"),
            width: 575
        }, o, getLang("support_do_pass"), function() {
            Helpdesk.doPass(t, val("tickets_pass_comm"), i)
        }, getLang("global_cancel"));
        cur.dontSendAutoanswer = new Checkbox(ge("support_pass_autoanswer"), {
            label: getLang("support_ignore_autoanswer_single"),
            width: 500,
            onChange: function() {
                toggle(ge("support_pass_answer_wrap"), this.val)
            }
        }), 1 == s && cur.dontSendAutoanswer.setState(!0, !0), cur.isMobileTicket || (16 == t || 17 == t || 18 == t) && (cur.sendPayFormCheck = new Checkbox(ge("support_send_payform"), {
            label: getLang("support_send_form_to_user"),
            width: 400
        })), (16 == t || 17 == t || 18 == t || 20 == t || 23 == t || 25 == t) && cur.dontSendAutoanswer.setState(!0, !0), hide("tis_add_lnk_auto"), autosizeSetup("tickets_pass_comm", {
            minHeight: 80,
            maxHeight: 200
        }), autosizeSetup("tickets_send_autoanswer", {
            minHeight: 60,
            maxHeight: 500
        }), elfocus("tickets_pass_comm")
    },
    showPassBox: function() {
        return !showBox("helpdesk", {
            act: "show_pass_box"
        }, {
            params: {
                width: "520px",
                bodyStyle: "padding: 0px"
            }
        })
    },
    doPass: function(section, text, box) {
        var act = box ? "pass" : "pass_back",
            query = {
                act: act,
                ticket_id: cur.ticket_id,
                to: section,
                comm: text,
                hash: cur.hashes.next_hash
            };
        if (cur.sendPayFormCheck && (query.send_pay_form = cur.sendPayFormCheck.val()), box && cur.dontSendAutoanswer && !cur.dontSendAutoanswer.val() && (query.autoanswer = val("tickets_send_autoanswer")), "all" == nav.objLoc.act && cur.checkedTickets) {
            var tickets = [];
            each(cur.checkedTickets, function(e, t) {
                tickets.push(e)
            }), query.tickets = tickets, query.act = "pass"
        }
        return ajax.post("helpdesk", query, {
            showProgress: function() {
                box ? box.showProgress() : Helpdesk.showTicketProgress()
            },
            hideProgress: function() {
                box ? box.hideProgress() : Helpdesk.hideTicketProgress()
            },
            onDone: function(content, script) {
                box && boxQueue.hideAll(), content && (ge("tickets_content").innerHTML = content), script && eval(script)
            }
        }), !1
    },
    sortModerStats: function(e, t) {
        if ("stats" != cur.section && "spec_stats" != cur.section && "ento_stats" != cur.section) return !1;
        if ("rate" == t) switch (cur.sort) {
            case "sum_rate":
                t = "plus_rate";
                break;
            case "plus_rate":
                t = "minus_rate";
                break;
            default:
                t = "sum_rate"
        }
        return t != cur.sort && (each(geByClass("table_header_upper_span", e.parentNode), function(e, t) {
            removeClass(t, "sorted")
        }), addClass(geByClass1("table_header_upper_span", e), "sorted"), nav.go("/helpdesk?act=" + nav.objLoc.act + "&sort=" + t)), !1
    },
    toggleAddBugRow: function(e, t, s) {
        if (s.target || (s.target = s.srcElement || document), "a" == s.target.tagName.toLowerCase()) return !0;
        var a = isVisible("tickets_add_bug_short_text" + e);
        return toggle("tickets_add_bug_short_text" + e, !a), toggle("tickets_add_bug_full_text" + e, a), toggleClass(t, "detailed", a), !1
    },
    toggleAddBugForm: function() {
        toggle("add_bug_search"), toggle("add_bug_form");
        var e = curBox();
        return isVisible(ge("add_bug_form")) ? (val("title", val("add_bug_search_input")), cur.sectionEditFilter.updateInput(), e.removeButtons(), e.addButton(getLang("global_close"), e.hide, "no"), e.addButton(getLang("global_save"), Helpdesk.saveBug, "yes"), e.setControlsText('<a href="" onclick="return Helpdesk.toggleAddBugForm();">' + getLang("global_cancel") + "</a>"), autosizeSetup(geByClass1("text", "add_bug_description"), {
            maxHeight: 500
        })) : (e.removeButtons(), e.addButton(getLang("global_close"), e.hide, "yes"), e.setControlsText("")), !1
    },
    toggleAutoanswerBlock: function(e) {
        checkbox(e), toggle("support_sure_bind", !isChecked(e))
    },
    saveBug: function() {
        var title = trim(val("title"));
        if (!title) return notaBene("title"), !1;
        if (!cur.sectionEditFilter.val()) return notaBene(cur.sectionEditFilter.selector), notaBene(cur.sectionEditFilter.input), !1;
        var descr = trim(val("desc"));
        if (!descr) return notaBene("desc"), !1;
        var doSave = function() {
            var query = {
                act: "save_bug",
                hash: cur.hashes.save_bug_hash,
                ticket_id: cur.ticket_id,
                title: title,
                desc: descr,
                browser: val("browser"),
                sections: cur.sectionEditFilter.val()
            };
            if ("all" == nav.objLoc.act && cur.checkedTickets) {
                var tickets = [];
                each(cur.checkedTickets, function(e, t) {
                    tickets.push(e)
                }), query.tickets = tickets
            }
            ge("tickets_closed_autoanswer_addressing_m") && (query.addressing_m = val("tickets_closed_autoanswer_addressing_m")), ge("tickets_closed_autoanswer_addressing_f") && (query.addressing_f = val("tickets_closed_autoanswer_addressing_f")), query.no_autoanswer = isChecked("support_ignore_autoanswer") ? 1 : 0, query.answer_text = val("tickets_send_autoanswer");
            var attachs = [],
                chosen = cur.ticketsAutoMedia.chosenMedias;
            return chosen && each(chosen, function(e, t) {
                var s = t[0],
                    a = t[1];
                ("photo" == s || "doc" == s) && attachs.push(s + "," + a)
            }), attachs.length && (query.attachs = attachs), ajax.post("helpdesk", query, {
                cache: 1,
                onDone: function(content, script) {
                    content && (ge("tickets_content").innerHTML = content), script && eval(script)
                },
                onFail: function() {
                    boxQueue.hideAll()
                }
            }), !0
        };
        return showFastBox({
            title: getLang("support_binding_title"),
            width: 430,
            bodyStyle: "line-height: 160%;"
        }, cur.sure_bind, getLang("support_do_bind"), function() {
            doSave() && curBox() && (curBox().content('<div style="height:100px; background: url(/images/progress7.gif) 50% 50% no-repeat;"></div>'), curBox().setOptions({
                bodyStyle: "padding: 0px;"
            }))
        }, getLang("global_cancel")), cur.ticketsAutoMedia = Tickets.initAddMedia(ge("tis_add_lnk_auto").firstChild, "tis_preview_auto", cur.mediaTypes, {
            limit: 5,
            oneClick: cur.oneClickUpload,
            photoCallback: cur.addAutoReply,
            target: "auto"
        }), autosizeSetup("tickets_send_autoanswer", {
            maxHeight: 500
        }), !1
    },
    bindTicket: function(bid, hash) {
        var doBind = function(bid, hash) {
                var query = {
                        act: "bind_ticket",
                        bug_id: bid,
                        ticket_id: cur.ticket_id,
                        hash: hash
                    },
                    attachs = [],
                    chosen = cur.ticketsAutoMedia.chosenMedias;
                if (chosen && each(chosen, function(e, t) {
                        var s = t[0],
                            a = t[1];
                        ("photo" == s || "doc" == s) && attachs.push(s + "," + a)
                    }), attachs && (query.attachs = attachs), "all" == nav.objLoc.act && cur.checkedTickets) {
                    var tickets = [];
                    each(cur.checkedTickets, function(e, t) {
                        tickets.push(e)
                    }), query.tickets = tickets
                }
                ge("support_ignore_autoanswer") && ge("tickets_send_autoanswer") && (query.no_autoanswer = isChecked("support_ignore_autoanswer") ? 1 : 0, query.answer_text = val("tickets_send_autoanswer")), ge("tickets_closed_autoanswer_addressing_m") && (query.addressing_m = val("tickets_closed_autoanswer_addressing_m")), ge("tickets_closed_autoanswer_addressing_f") && (query.addressing_f = val("tickets_closed_autoanswer_addressing_f")), ajax.post("helpdesk", query, {
                    cache: 1,
                    onDone: function(content, script) {
                        content && (ge("tickets_content").innerHTML = content), script && eval(script)
                    },
                    onFail: function() {
                        boxQueue.hideAll()
                    }
                })
            },
            box = showFastBox({
                title: getLang("support_binding_title"),
                width: 530,
                bodyStyle: "line-height: 160%;"
            }, cur.sure_bind, getLang("support_do_bind"), function() {
                doBind(bid, hash), box.hide(), curBox() && curBox().content('<div style="height:100px; background: url(/images/progress7.gif) 50% 50% no-repeat;"></div>')
            }, getLang("global_cancel"));
        return autosizeSetup("tickets_send_autoanswer", {
            minHeight: 60,
            maxHeight: 500
        }), cur.ticketsAutoMedia = Tickets.initAddMedia(ge("tis_add_lnk_auto").firstChild, "tis_preview_auto", cur.mediaTypes, {
            limit: 5,
            oneClick: cur.oneClickUpload,
            photoCallback: cur.addAutoReply,
            target: "auto"
        }), !1
    },
    unbindTicket: function(e, t, s) {
        var a = function() {
                var a = cur.unbindBox;
                ajax.post("helpdesk", {
                    act: "unbind_ticket",
                    ticket_id: cur.ticket_id,
                    bug_id: e,
                    hash: t
                }, {
                    cache: 1,
                    onDone: function() {
                        slideUp(s, 200, re.pbind(s)), a.hide()
                    },
                    showProgress: a.showProgress,
                    hideProgress: a.hideProgress
                })
            },
            o = function(e) {
                return e.keyCode == KEY.ENTER && __bq.count() ? (a(), !1) : void 0
            };
        browser.mobile || addEvent(document, "keydown", o), cur.unbindBox = showFastBox({
            title: getLang("support_delete_bind"),
            width: 430,
            onHide: function() {
                removeEvent(document, "keydown", o)
            }
        }, getLang("support_delete_text").replace("{title}", cur.bug_link || ""), getLang("support_delete"), a, getLang("global_cancel"))
    },
    rowActive: function(e, t) {
        showTooltip(e, {
            text: t,
            showdt: 200,
            dir: "bottom",
            center: 1,
            typeClass: "tt_black"
        })
    },
    switchModersSubTab: function(e, t, s, a, o, i) {
        return hasClass(e, "active") ? !1 : (each(geByClass("tickets_subtab1", e.parentNode), function(e, t) {
            removeClass(t, "active")
        }), addClass(e, "active"), Helpdesk.updateModerStats(t, s, a, 0, i))
    },
    showModerStats: function(id, hash) {
        var cont = ge("support_moders_stats" + id),
            row = ge("support_moder_stats_row" + id),
            data = ge("support_moder_stats_data" + id);
        return cont ? (isVisible(data) ? removeClass(row, "detailed") : addClass(row, "detailed"), slideToggle(data, 200)) : (addClass(row, "detailed"), slideToggle(data, 200), ajax.post("helpdesk", {
            act: "moder_stats",
            mid: id,
            hash: hash
        }, {
            onDone: function(res, script) {
                data.innerHTML = res, script && eval(script)
            }
        })), !1
    },
    showSpecAgentStats: function(id, hash) {
        var cont = ge("support_moders_stats" + id),
            row = ge("support_moder_stats_row" + id),
            data = ge("support_moder_stats_data" + id);
        return cont ? (isVisible(data) ? removeClass(row, "detailed") : addClass(row, "detailed"), slideToggle(data, 200)) : (addClass(row, "detailed"), slideToggle(data, 200), ajax.post("helpdesk", {
            act: "spec_agent_stats",
            mid: id,
            hash: hash
        }, {
            onDone: function(res, script) {
                data.innerHTML = res, script && eval(script)
            }
        })), !1
    },
    statsRowOver: function(e, t) {
        addClass(e, "over");
        var s = t ? e.nextSibling && e.nextSibling.nextSibling : e.nextSibling;
        s && addClass(s, "after_over")
    },
    statsRowOut: function(e, t) {
        removeClass(e, "over");
        var s = t ? e.nextSibling && e.nextSibling.nextSibling : e.nextSibling;
        s && removeClass(s, "after_over")
    },
    updateModerStats: function(e, t, s, a, o) {
        return 0 > a ? !1 : (ge("support_moders_period_stats" + e).innerHTML = '<div class="tickets_detailed_loading"><div>', ajax.post("helpdesk", {
            act: "detailed_stats",
            mid: e,
            type: s,
            offset: a,
            hash: t,
            is_spec: o
        }, {
            cache: 1,
            onDone: function(t, s) {
                ge("support_moders_period_stats" + e).innerHTML = t, ge("moder_subtabs" + e).innerHTML = s
            },
            onFail: function() {
                ge("support_moders_period_stats" + e).innerHTML = ""
            }
        }), !1)
    },
    subscribeToTag: function(e, t) {
        ajax.post("helpdesk", {
            act: "subscribe_to_tag",
            tag: e,
            hash: t
        }, {
            cache: 1,
            onDone: val.pbind("agent_tag" + e + "_subscribe")
        })
    },
    unsubscribeFromTag: function(e, t) {
        ajax.post("helpdesk", {
            act: "unsubscribe_from_tag",
            tag: e,
            hash: t
        }, {
            cache: 1,
            onDone: val.pbind("agent_tag" + e + "_subscribe")
        })
    },
    onFavoriteChanged: function(e, t) {
        var s = ge("tickets_header_links_movefav");
        return toggle("tickets_header_links_addfav", !e), toggle("tickets_header_links_delfav", e), s && (toggle(s, e), e && (each(geByClass("_movefav", "tickets_info_links"), function(e, t) {
            removeClass(t, "tickets_header_links_fav_selected")
        }), addClass("tickets_header_links_movefav_" + t, "tickets_header_links_fav_selected")), uiActionsMenu.toggle(domNS(s), e)), ajax.post("helpdesk", {
            act: "favorite",
            ticket_id: cur.ticket_id,
            add: e ? 1 : 0,
            gid: t ? t : 0,
            hash: cur.hashes.favorite_hash
        }), !1
    },
    onThanksChanged: function(e) {
        return toggle("tickets_header_links_enable_thanks", e), toggle("tickets_header_links_disable_thanks", !e), ajax.post("helpdesk", {
            act: "thanks_mod",
            ticket_id: cur.ticket_id,
            disable: e ? 1 : 0,
            hash: cur.hashes.thanks_hash
        }), !1
    },
    showTicketProgress: function() {
        var e = ge("tickets_header_progress"),
            t = ge("tickets_header_info");
        t && (e || (e = se('<div class="tickets_header_progress" id="tickets_header_progress"></div>'), t.insertBefore(e, t.firstChild)), hide("tickets_header_info_title"))
    },
    hideTicketProgress: function() {
        re("tickets_header_progress"), show("tickets_header_info_title")
    },
    searchAdd: function(e) {
        e && " " == e[e.length - 1] && (e[e.length - 1] = "_");
        var t = ge("add_bug_search_input");
        ajax.post("helpdesk", {
            act: "get_bugs",
            q: e
        }, {
            cache: 1,
            showProgress: uiSearch.showProgress.pbind(t),
            hideProgress: uiSearch.hideProgress.pbind(t),
            onDone: function(e, t) {
                e && (ge("tickets_add_list").innerHTML = ce("div", {
                    innerHTML: e
                }).innerHTML), ge("tickets_add_button").innerHTML = t
            }
        })
    },
    enterAddBugSearch: function(e, t) {
        clearTimeout(cur.addTimeout), t != cur.searchStr && (cur.searchStr = t, Helpdesk.searchAdd(cur.searchStr))
    },
    changeAddBugSearch: function(e) {
        clearTimeout(cur.addTimeout), cur.addTimeout = setTimeout(function() {
            e != cur.searchStr && (cur.searchStr = e, clearTimeout(cur.searchAddTimeout), cur.searchAddTimeout = setTimeout(function() {
                Helpdesk.searchAdd(cur.searchStr)
            }.bind(this), 300), scrollToTop())
        }.bind(this), 10)
    },
    getSearchParams: function(e) {
        var t = {
            q: trim(e)
        };
        switch (nav.objLoc.act) {
            case "show":
                t.act = "get_similar", t.ticket_id = cur.ticket_id;
                break;
            case "all":
                t.act = "all", nav.objLoc.faq_id && (t.faq_id = nav.objLoc.faq_id);
                var s = (window.radioBtns.filters || {}).val;
                if (t.good = 1 == s ? 1 : "", t.opened = 2 == s ? 1 : "", t.from_support = 3 == s ? 1 : "", t.has_replies = 4 == s ? 1 : "", t.search = 1, ge("tickets_extra_options") && t.opened) {
                    t.download = isChecked("tickets_download_checkbox"), t.no_category = isChecked("tickets_no_category_checkbox"), t.photo_server = ge("tickets_photo").value, t.id100 = ge("tickets_id").value, t.id1000 = ge("tickets_id1000").value, t.nospam_pid = ge("tickets_nospam_pid").value, t.cdn = ge("tickets_cdn").value;
                    var a = intval(cur.searchMobile.val());
                    a && (t.mobile = a);
                    var o = intval(cur.searchHttps.val());
                    o && (t.https = o);
                    var i = cur.searchBrowser.val();
                    i && "0" != i && (t.browser = -1 == i ? cur.searchBrowser.curTerm : i);
                    var c = intval(cur.searchTutorial.val());
                    c && (t.tutorial = c), isChecked("tickets_time_checkbox") && (t.time_from = val("search_start_date"), t.time_to = val("search_end_date"))
                }
                break;
            case "history":
                t.act = "get_answers", t.mid = nav.objLoc.mid
        }
        return t
    },
    sameParams: function(e) {
        if (!cur.params) return !1;
        for (var t in e)
            if (e[t] != cur.params[t]) return !1;
        for (var t in cur.params)
            if (e[t] != cur.params[t]) return !1;
        return !0
    },
    enterAllSearch: function() {
        Helpdesk.updateAllSearch(!0)
    },
    changeAllSearch: function() {
        Helpdesk.updateAllSearch(!1)
    },
    updateAllSearch: function(e) {
        clearTimeout(cur.faqTimeout), cur.faqTimeout = setTimeout(function() {
            var t = Helpdesk.getSearchParams(val("show" == nav.objLoc.act ? "similar_search" : "all_search"));
            !e || Helpdesk.sameParams(t) && !cur.ignoreEqual || (delete cur.ignoreEqual, cur.params = t, cur.searchStr = t.q, Helpdesk.searchAll(cur.searchStr)), "show" != nav.objLoc.act && scrollToTop()
        }.bind(this), 10)
    },
    searchAll: function() {
        var searchEl = "show" == nav.objLoc.act ? "similar_search" : "all_search",
            query = cur.params || Helpdesk.getSearchParams(val(searchEl));
        switch (nav.objLoc.act) {
            case "show":
                addClass(ge("similar_search_bar"), "similar_loading");
                break;
            case "all":
                cur.checkedTickets = {};
                break;
            case "history":
                query.q ? (show("tickets_history_tabs__search"), uiTabs.switchTab(geByClass1("ui_tab", "tickets_history_tabs__search"))) : (uiTabs.switchTab(geByClass1("ui_tab", "tickets_history_tabs__all"), {
                    noAnim: 1
                }), hide("tickets_history_tabs__search"))
        }
        var options = {
            cache: 1,
            onDone: function(cont, script) {
                switch (nav.objLoc.act) {
                    case "show":
                        ge("similar_rows").innerHTML = cont, removeClass(ge("similar_search_bar"), "similar_loading"), script && eval(script), toggle("tickets_toup", cur.similarCount > 10), each(cur.checkedTickets, function(e, t) {
                            if (ge("tickets_similar_row" + e)) {
                                var s = geByClass1("tickets_check", ge("tickets_similar_row" + e));
                                checkbox(domFC(s), !0)
                            }
                        }), isVisible("tickets_toup") && (setStyle(ge("tickets_toup"), {
                            height: "0px"
                        }), setStyle(ge("tickets_toup"), {
                            height: getSize(ge("tickets_similar"))[1]
                        }));
                        break;
                    case "all":
                        ge("tickets_all").innerHTML = cont, script && eval(script), delete nav.objLoc.offset, each(["q", "good", "opened", "download", "from_support", "photo_server", "id100", "nospam_pid", "time_from", "time_to", "mobile", "browser", "id1000", "https", "cdn", "no_category", "tutorial", "has_replies"], function(e, t) {
                            query[t] ? nav.objLoc[t] = query[t] : delete nav.objLoc[t]
                        }), nav.setLoc(nav.objLoc);
                        break;
                    case "history":
                        delete nav.objLoc.offset, delete nav.objLoc.section, ge("tickets_replies").innerHTML = cont, query.q ? nav.objLoc.q = query.q : delete nav.objLoc.q, nav.setLoc(nav.objLoc)
                }
            }
        };
        "all_search" === searchEl && extend(options, {
            showProgress: uiSearch.showProgress.pbind("all_search"),
            hideProgress: uiSearch.hideProgress.pbind("all_search")
        }), ajax.post("helpdesk", query, options)
    },
    restoreDraft: function(e) {
        var t = ge("tickets_reply"),
            s = ls.get("helpdesk_draft" + vk.id + "_" + e) || {},
            a = s.txt || "";
        if (!browser.mobile && t && !t.disabled && cur.canUseDrafts && (a || s.medias) && cur.ticket_id == e && (val(t).length < a.length && (val(t, a), t.autosize.update()), (s.medias || []).length && !((cur.ticketsNewMedia || {}).chosenMedias || []).length)) {
            var o = [];
            for (var i in s.medias) s.medias[i] && o.push(s.medias[i].slice(0, 2).join(","));
            ajax.post("helpdesk", {
                act: "draft_medias",
                attachs: o
            }, {
                onDone: function(e) {
                    (e || []).length && each(e, function() {
                        cur.ticketsNewMedia.chooseMedia.apply(cur.ticketsNewMedia, this)
                    })
                }
            })
        }
    },
    uncheckTickets: function() {
        each(cur.checkedTickets, function(e, t) {
            delete cur.checkedTickets[e]
        }), each(geByClass("tickets_check", ge("tickets_checked")), function(e, t) {
            checkbox(geByClass1("checkbox", t), !1)
        }), checkbox(geByClass1("checkbox", "tickets_all_check"), !1);
        var e = ge("tickets_all_search"),
            t = ge("tickets_all_selected");
        isVisible(e) || slideDown(e, 200), isVisible(t) && slideUp(t, 200)
    },
    toggleSimilar: function(e) {
        toggle("tickets_similar", !isVisible("tickets_similar"));
        var t = ge("toggle_similar_link");
        return toggleClass(t, "opened", isVisible("tickets_similar")), isVisible("tickets_similar") ? (t.innerHTML = getLang("support_hide_similar"), ge("similar_search") && cur.searchDD.updateInput(), cur.similarCount < 10 ? hide("tickets_toup") : isVisible("tickets_toup") && (setStyle(ge("tickets_toup"), {
            height: "0px"
        }), setStyle(ge("tickets_toup"), {
            height: getSize(ge("tickets_similar"))[1]
        }))) : t.innerHTML = cur.similarCount ? getLang("support_show_similar", cur.similarCount) : getLang("support_search_similar"), e && scrollToTop(0), !1
    },
    toggleSimilarRows: function(e) {
        var t = attr(e, "toggle-text"),
            s = val(e),
            a = !attr(e, "toggle-value");
        return attr(e, "toggle-value", a ? "1" : ""), val(e, t), attr(e, "toggle-text", s), each(geByClass("similar_row_wrap", "similar_rows"), function(e, t) {
            Helpdesk.doToggleSimilarRow(t, a)
        }), !1
    },
    toggleSimilarRow: function(e, t) {
        return t.target || (t.target = t.srcElement || document), "a" == t.target.tagName.toLowerCase() ? !0 : (Helpdesk.doToggleSimilarRow(e, !hasClass(e, "detailed")), isVisible("tickets_toup") && (setStyle(ge("tickets_toup"), {
            height: "0px"
        }), setStyle(ge("tickets_toup"), {
            height: getSize(ge("tickets_similar"))[1]
        })), !1)
    },
    doToggleSimilarRow: function(e, t) {
        toggle(geByClass1("_tickets_similar_short_text", e), !t), toggle(geByClass1("_tickets_similar_full_text", e), t), toggleClass(e, "detailed", t)
    },
    onSubmitSettingsChanged: function(e) {
        ajax.post("helpdesk", {
            act: "save_submit",
            value: e ? 1 : 0,
            hash: cur.hashes.submit_hash
        }), cur.next_manual = !!e
    },
    delayTicket: function(e, t) {
        ajax.post(nav.objLoc[0], {
            act: "delay_ticket",
            ticket_id: cur.ticket_id,
            delay: e,
            hash: t
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: function(e, t) {
                ge("tickets_header_info").innerHTML = e, cur.initDelayDD()
            }
        })
    },
    closeTicket: function(hash) {
        var link = ge("close_ticket_link"),
            pr = geByClass1("progress", link),
            label = geByClass1("label", link);
        return hide(label), show(pr), ajax.post("helpdesk", {
            act: "close_ticket",
            ticket_id: cur.ticket_id,
            hash: hash
        }, {
            onDone: function(content, script) {
                content && (ge("tickets_content").innerHTML = content), script && eval(script)
            },
            onFail: function() {
                show(label), hide(pr)
            }
        }), !1
    },
    selectFavoritesGroup: function(e) {
        var t = geByClass1("tickets_favorites_groups_tab_sel", "tickets_favorites_groups"),
            s = ge("tickets_favorites_groups_tab_" + e);
        t != s && (removeClass(t, "tickets_favorites_groups_tab_sel"), addClass(s, "tickets_favorites_groups_tab_sel"), each(geByClass("_tickets_favorites_table", "tickets_favorites_tables"), function(e, t) {
            hide(t)
        }), show("tickets_fav_table_" + e))
    },
    editFavoritesGroup: function(e) {
        cur.editFavoritesBox = showBox("helpdesk", {
            act: "edit_favorites_group",
            gid: e
        }, {
            params: {
                width: "430px"
            },
            dark: 1,
            onDone: function(t) {
                e && t.setControlsText('<a href="#" onclick="return Helpdesk.deleteFavoritesGroup(' + e + ');">' + getLang("support_favorites_delete_btn") + "</a>"), t.setButtons(getLang("global_save"), Helpdesk.saveFavoritesGroup.pbind(e)), elfocus("tickets_favorites_editor__text")
            }
        })
    },
    deleteFavoritesGroup: function(e) {
        var t = val("tickets_favorites_editor__hash"),
            s = showFastBox({
                title: getLang("global_warning")
            }, getLang("support_favorites_delete_confirm"), getLang("global_delete"), function() {
                ajax.post("helpdesk", {
                    act: "a_delete_favorites_group",
                    gid: e,
                    hash: t
                }, {
                    showProgress: s.showProgress,
                    hideProgress: s.hideProgress,
                    onDone: function(e) {
                        s.hide(), cur.editFavoritesBox.hide();
                        var t = ge("tickets_favorites");
                        if (e) {
                            var a = se(e);
                            t ? t.parentNode.replaceChild(a, t) : ge("tickets_content").firstChild.appendChild(a)
                        } else re(t)
                    }
                })
            });
        return !1
    },
    saveFavoritesGroup: function(e) {
        var t = ge("tickets_favorites_editor__text"),
            s = val(t).trim(),
            a = val("tickets_favorites_editor__hash");
        return s ? void ajax.post("helpdesk", {
            act: "a_save_favorites_group",
            gid: e,
            hash: a,
            title: s
        }, {
            showProgress: cur.editFavoritesBox.showProgress,
            hideProgress: cur.editFavoritesBox.hideProgress,
            onDone: function(e, t) {
                cur.editFavoritesBox.hide();
                var s = ge("tickets_favorites");
                if (e) {
                    var a = se(e);
                    s ? s.parentNode.replaceChild(a, s) : ge("tickets_content").firstChild.appendChild(a), Helpdesk.selectFavoritesGroup(t)
                } else re(s)
            }
        }) : notaBene(t)
    },
    trollAutoReply: function(hash) {
        return ajax.post("helpdesk", {
            act: "troll_auto_reply",
            ticket_id: cur.ticket_id,
            hash: hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: function(content, script) {
                content && (ge("tickets_content").innerHTML = content), script && eval(script)
            }
        }), !1
    },
    autoReplyPass: function(val, hash) {
        ajax.post("helpdesk", {
            act: "auto_reply_pass",
            pass: val,
            ticket_id: cur.ticket_id,
            hash: hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: function(content, script) {
                content && (ge("tickets_content").innerHTML = content), script && eval(script)
            }
        })
    },
    recommendAntivirus: function(hash) {
        ajax.post(nav.objLoc[0], {
            act: "recommend_antivirus",
            ticket_id: cur.ticket_id,
            hash: hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: function(content, script) {
                content && (ge("tickets_content").innerHTML = content), script && eval(script)
            }
        })
    },
    sendPayForm: function(e) {
        var t = showFastBox({
            title: getLang("support_send_form_to_user"),
            width: 500
        }, cur.send_pay_label, getLang("box_send"), function() {
            Helpdesk.doSendPayForm(val("tickets_send_comm"), t, e)
        }, getLang("global_cancel"));
        return !1
    },
    doSendPayForm: function(text, box, hash) {
        var btn = geByClass1("flat_button", box.bodyNode.nextSibling);
        return ajax.post("helpdesk", {
            act: "send_pay_form",
            ticket_id: cur.ticket_id,
            text: text,
            hash: hash
        }, {
            onDone: function(content, script) {
                box.hide(), content && (ge("tickets_content").innerHTML = content), script && eval(script)
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        }), !1
    },
    takeToSection: function() {
        return ajax.post("helpdesk", {
            act: "take",
            ticket_id: cur.ticket_id,
            hash: cur.hashes.next_hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: function(content, script) {
                content && (ge("tickets_content").innerHTML = content), script && eval(script)
            }
        }), !1
    },
    takeTicket: function() {
        return ajax.post("helpdesk", {
            act: "take_ticket",
            ticket_id: cur.ticket_id,
            hash: cur.hashes.take_hash
        }, {
            showProgress: Helpdesk.showTicketProgress,
            hideProgress: Helpdesk.hideTicketProgress,
            onDone: function(content, script) {
                content && val("tickets_content", content), script && eval(script)
            }
        }), !1
    },
    providerEmail: function() {
        return !showBox("helpdesk", {
            act: "provider_email_box",
            ticket_id: cur.ticket_id
        }, {
            params: {
                width: 500,
                bodyStyle: "padding: 20px; background-color: #F7F7F7;",
                hideButtons: !0
            },
            dark: 1
        })
    },
    getFaqSuggestions: function(e) {
        return !showBox(nav.objLoc[0], {
            act: "tlmd_suggestions",
            ticket_id: cur.ticket_id,
            hash: e
        }, {
            params: {
                dark: 1,
                width: 600
            }
        })
    },
    photosChooseMore: function(e) {
        var t = ge("photos_choose_more");
        return hasClass(t, "photos_choose_more_loading") ? !1 : void ajax.post("helpdesk", {
            act: "choose_photo_box",
            offset: attr(t, "offset"),
            to_id: e
        }, {
            onDone: function(e, s, a) {
                ge("photos_choose_rows").insertBefore(cf(e), ge("photos_choose_clear")), attr(t, "offset", s), a && hide(t)
            },
            onFail: removeClass.pbind(t, "photos_choose_more_loading"),
            showProgress: addClass.pbind(t, "photos_choose_more_loading"),
            hideProgress: removeClass.pbind(t, "photos_choose_more_loading")
        })
    },
    setTicketTag: function(e, t, s, a) {
        var o = hasClass(e, "secondary") ? 1 : 0;
        ajax.post("helpdesk", {
            act: "set_tag",
            id: t,
            tid: s,
            hash: a,
            val: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function() {
                toggleClass(e, "secondary", !o)
            }
        })
    },
    addFavGroupTT: function(e, t) {
        showTooltip(e, {
            text: t,
            dir: "bottom",
            typeClass: "tt_black",
            shift: [12, 4, 4]
        })
    },
    setSwitch: function(e, t, s, a) {
        ajax.post("helpdesk", {
            act: "a_set_switch",
            val: t,
            "switch": s,
            hash: a
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(s) {
                var a = gpeByClass("_switch", e);
                toggleClass(a, "helpdesk_switch_enabled", t), val("helpdesk_switches_logs", s)
            }
        })
    },
    getPage: function(offset) {
        show("pages_loading_top"), show("pages_loading_bottom");
        var _n = nav.objLoc,
            act = cur.section,
            query = {
                act: act,
                offset: offset,
                load: 1
            };
        for (var v in _n) "0" != v && "act" != v && "offset" != v && (query[v] = _n[v]);
        return "all" == _n.act && cur.checkedTickets && (window.checkedTickets = cur.checkedTickets, isEmpty(cur.checkedTickets) || (query.hide_search = 1)), ajax.post(cur.objLoc, query, {
            cache: 1,
            onDone: function(content, script) {
                if ("history" == nav.objLoc.act ? ge("tickets_replies").innerHTML = content : ge("tickets_content").innerHTML = content, window.tooltips && tooltips.hideAll(), script && eval(script), window.checkedTickets) {
                    cur.checkedTickets = window.checkedTickets, delete window.checkedTickets, each(cur.checkedTickets, function(e, t) {
                        var s = ge("tickets_similar_row" + e);
                        if (s) {
                            var a = geByClass1("tickets_check", s),
                                o = a ? geByClass1("checkbox", a) : null;
                            checkbox(o, !0)
                        }
                    });
                    var allChecked = !0;
                    each(geByClass("tickets_check", "tickets_checked"), function(e, t) {
                        var s = geByClass1("checkbox", t);
                        return isChecked(s) ? void 0 : (allChecked = !1, !1)
                    });
                    var allChb = ge("tickets_all_check");
                    allChb && checkbox(geByClass1("checkbox", allChb), allChecked), Tickets.updateChecked()
                }
                offset ? nav.setLoc(extend(nav.objLoc, {
                    offset: offset
                })) : (delete nav.objLoc.offset, nav.setLoc(nav.objLoc))
            },
            onFail: function() {
                hide("pages_loading_top"), hide("pages_loading_bottom")
            }
        }), !1
    },
    openAllMyTickets: function() {
        var e = [];
        each(geByClass("_ticket_link", "my_tickets_table"), function(t, s) {
            var a = attr(s, "ticket-id");
            e.push([s.href, a])
        });
        var t = setInterval(function() {
            if (!e.length) return void clearInterval(t);
            var s = e.shift();
            window.open(s[0], "helpdesk_show_" + s[1]), window.focus()
        }, 300)
    },
    checkTicketsChecked: function(e, t, s, a) {
        var o = Tickets.getCheckedArr();
        if (o.length) {
            uiTabs.switchTab(geByClass1("ui_tab", "tickets_tab_all"), {
                noAnim: 1
            });
            var i = showFastBox(getLang("support_ento_checked_leave_title"), getLang("support_ento_checked_leave_text"), getLang("global_continue"), function() {
                i.hide(), cur.checkedTickets = {}, nav.go(s)
            }, getLang("global_cancel"));
            return !1
        }
    },
    banContentChunk: function(e, t, s, a, o, i) {
        lockButton(i), ajax.post("al_helpdesk.php", {
            act: "claim_content_chunk",
            claim_id: e,
            reply_id: t,
            type: s,
            idx: a,
            hash: o
        }, {
            onDone: function() {
                unlockButton(i), i.innerHTML = "������� �����", disableButton(i, !0)
            }
        })
    },
    postFieldKeyDown: function(e, t) {
        if (e.ctrlKey || e.metaKey && browser.mac) {
            if (32 == e.keyCode) return cancelEvent(e), Helpdesk.trySelectTemplate(ge("tickets_reply"));
            onCtrlEnter(e, Tickets.addTicketReply.pbind(t, !0))
        }
    },
    trySelectTemplate: function(e) {
        var t = val(e),
            s = 0;
        if (document.selection) {
            var a = document.selection.createRange();
            a.moveStart("character", -t.length), s = a.text.length
        } else(e.selectionStart || "0" == e.selectionStart) && (s = e.selectionStart);
        console.log("Cursor pos: %s", s);
        var o = t.substring(0, s),
            i = t.substring(s),
            c = o.match(/(.+)$/);
        if (!c) return !1;
        each(geByClass("template_selected", "template_links"), function(e, t) {
            removeClass(t, "template_selected")
        }), c = c[1].toLowerCase(), console.log("Name part: %s", c);
        var r = [],
            n = [];
        if (each(cur.templates, function(e, t) {
                return c == t.title_low ? (r = [e], n = [c], !1) : void(0 == t.title_low.indexOf(c) && (r.push(e), n.push(t.title_low)))
            }), r.length > 1) {
            each(r, function(e, t) {
                addClass("template" + t, "template_selected")
            });
            for (var l = n.sort(), d = l[0], u = l[l.length - 1], h = d.length, _ = 0; h > _ && d.charAt(_) === u.charAt(_);) _++;
            _ > c.length && (val(e, o.substring(0, o.length - c.length) + d.substring(0, _) + i), elfocus(e, o.length - c.length + _))
        } else 1 == r.length && (val(e, o.substring(0, o.length - c.length) + i), elfocus(e, o.length - c.length), Helpdesk.selectTemplate(r[0]));
        return !1
    },
    toggleSectionStats: function(e) {
        var t = ge("helpdesk_section_stats_row" + e),
            s = ge("helpdesk_section_stats" + e),
            a = !isVisible(t);
        a ? (show(t), slideDown(s, 200)) : slideUp(s, 200, hide.pbind(t))
    },
    _eof: 1
};
try {
    stManager.done("helpdesk.js")
} catch (e) {}