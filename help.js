/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 981062856
    Link: https://vk.com/js/al/help.js?981062856
    Last Update: 10.2.117
*/
var Help = {
    initCCObjectionSelects: function() {
        cur.citySelect = new CitySelect(ge("ccform_city"), ge("ccform_city_row"), {
            width: 308,
            progressBar: ge("ccform_progress"),
            city: cur.selectData.city_val,
            country: cur.selectData.country
        }), cur.countrySelect = new CountrySelect(ge("ccform_country"), ge("ccform_country_row"), {
            width: 308,
            progressBar: ge("ccform_progress"),
            country: cur.selectData.country_val,
            citySelect: cur.citySelect
        })
    },
    showMsgBox: function(e, t, o) {
        return setTimeout(showFastBox({
            title: t,
            onHide: function() {
                o && ge(o).focus()
            }
        }, e).hide, 4e3), !1
    },
    submitCCObjection: function(e, t, o, n) {
        var c = ge("ccform_submit"),
            i = {
                act: "a_cc_objection",
                claim_id: e,
                content_type: t,
                content_owner: o,
                content_id: n,
                name: ge("ccform_name").value,
                email: ge("ccform_email").value,
                country: cur.countrySelect.val(),
                city: cur.citySelect.val(),
                region: ge("ccform_region").value,
                address: ge("ccform_address").value,
                objections: ge("ccform_legality").value,
                doc_mid: ge("ccform_doc_mid").value,
                doc_photo: ge("ccform_doc_photo").value,
                doc_server: ge("ccform_doc_server").value
            };
        return i.name.length < 5 ? (notaBene("ccform_name"), !1) : /^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(i.email) ? i.country < 1 ? (cur.countrySelect.focus(), !1) : i.city < 1 ? (cur.citySelect.focus(), !1) : i.address < 9 ? (notaBene("ccform_address"), !1) : i.objections.length < 5 ? (notaBene("ccform_legality"), !1) : isChecked("ccobjection_agree_email") ? isChecked("ccobjection_agree_inform") ? isChecked("ccobjection_agree_rules") ? (lockButton(c), void ajax.post("/al_help.php", i, {
            onDone: function(e) {
                nav.go("/help?act=cc_objection_sent")
            },
            onFail: function() {
                unlockButton(c)
            }
        })) : Help.showMsgBox(getLang("help_ccobjection_need_rules"), getLang("global_error")) : Help.showMsgBox(getLang("help_ccobjection_need_inform"), getLang("global_error")) : Help.showMsgBox(getLang("help_ccobjection_need_email"), getLang("global_error")) : (notaBene("ccform_email"), !1)
    },
    submitDocPhoto: function() {
        var e = ge("doc_file_button");
        lockButton(e), setTimeout(function() {
            e.innerHTML = e.innerHTML
        }, 0), ge("doc_upload_frame").uploadType = 0, document.doc_upload.submit()
    },
    uploadError: function(e) {
        var t = "";
        e ? 1 == e || 4 == e ? t = getLang("restore_not_uploaded") : 2 == e ? t = getLang("restore_bad_format") : 5 == e && (t = getLang("restore_bad_size")) : t = getLang("global_unknown_error"), setTimeout(showFastBox(getLang("global_error"), t).hide, 2e3);
        var o = type ? "photo_" : "doc_",
            n = ge(o + "file_button");
        unlockButton(n)
    },
    uploadComplete: function(e, t, o, n) {
        var c = ge("doc_file_button");
        unlockButton(c), ge("ccform_doc_mid").value = e, ge("ccform_doc_photo").value = t, ge("ccform_doc_server").value = o, show("doc_photos"), ge("doc_photos").innerHTML = '<div id="photo"><img id="photo_img" src="' + n + '" /><span onmouseover="this.className=\'over\';" onmouseout="this.className=\'\';" onclick="Help.deleteImage()" id="del_link">' + getLang("global_delete") + "</span></div>"
    },
    deleteImage: function() {
        ge("ccform_doc_mid").value = "0", ge("ccform_doc_photo").value = "", ge("ccform_doc_server").value = "0", hide("doc_photos"), ge("doc_photos").innerHTML = ""
    },
    initSecurityTest: function(e) {
        extend(cur, e), cur.doneQuestions = {}, cur.qLen = cur.doneLen = cur.doneRight = 0;
        var t;
        for (t in cur.questions) cur.qLen++;
        var o = ge("help_test_finish_btn");
        setStyle("help_test_finish_btn_lock", {
            height: o.clientHeight + 2,
            width: o.clientWidth + 2
        }), cur.after_ban && cur.nav.push(function(e, t, o, n) {
            if (!(cur.leaving || cur.doneLen >= cur.qLen)) {
                var c = showFastBox(getLang("global_warning"), getLang("help_sectest_away_warning"), getLang("help_sectest_away_skip"), function() {
                    cur.leaving = !0, c.hide(), nav.go(o)
                }, getLang("global_cancel"), function() {
                    c.hide()
                });
                return !1
            }
        })
    },
    stestRadioClick: function(e, t) {
        if (void 0 === cur.doneQuestions[e]) {
            var o = ge("help_question_hint" + e),
                n = ge("help_question" + e),
                c = geByClass1("help_answers", n),
                i = geByClass1("help_answers_lock", n),
                r = cur.questions[e][t],
                s = r[1],
                a = r[0];
            val(geByClass1("help_question_hint_text", o, "div"), s), toggleClass(o, "help_question_hint_wrong", !a), cur.doneQuestions[e] = t, a ? cur.doneRight++ : addClass(geByClass1("radiobtn", ge("help_answer" + e + "_" + t), "div"), "on"), cur.doneLen++, each(cur.questions[e], function(t) {
                addClass("help_answer" + e + "_" + t, this[0] ? "help_right_answer" : "help_done_answer")
            }), addClass("help_question_hint" + e + "_" + t, "help_done_question"), setStyle(i, {
                width: c.offsetWidth,
                height: c.offsetHeight,
                display: "block"
            }), show(o), cur.doneLen < cur.qLen ? (val("help_test_results_warn", getLang("help_sectest_cant_finish_X_done", cur.doneLen) + " " + getLang("help_sectest_cant_finish_X_remain", cur.qLen)), show("help_question" + (e + 1))) : hide("help_test_results_warn", "help_test_finish_btn_lock")
        }
    },
    stestFinish: function(e, t) {
        lockButton(e), nav.go(t + "?r=" + (cur.doneRight || 0) + "&ab=" + (cur.after_ban ? 1 : 0), !1, {
            onFail: unlockButton.pbind(e)
        })
    },
    initSecurityTestResults: function(e) {
        extend(cur, e), window.VK && VK.init && VK.Widgets && VK.Widgets.Like ? Help.stestInitWLike() : (window.vkAsyncInit = Help.stestInitWLike, headNode.appendChild(ce("script", {
            type: "text/javascript",
            src: "/js/api/openapi.js?" + e.openapi_version
        })))
    },
    stestInitWLike: function() {
        VK.init({
            apiId: 1936057
        }), VK.Widgets.Like("help_test_results_like", {
            pageTitle: cur.like_title,
            pageDescription: cur.like_desc,
            pageUrl: cur.like_url,
            pageImage: cur.like_image,
            text: cur.like_text,
            width: 450,
            base_domain: locProtocol + "//" + locHost + "/"
        }, cur.like_page), delete window.vkAsyncInit
    }
};
try {
    stManager.done("help.js")
} catch (e) {}