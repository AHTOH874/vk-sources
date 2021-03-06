/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 746817657
    Link: https://vk.com/js/al/restore.js?746817657
    Last Update: 10.2.117
*/
var Restore = {
    showMsgBox: function(e, o, r) {
        setTimeout(showFastBox({
            title: o,
            width: 440,
            onHide: function() {
                r && ge(r).focus()
            }
        }, e).hide, 8e3)
    },
    showResult: function(e, o, r, t) {
        cur.wasShown && cur.wasShown != e && hide(cur.wasShown), cur.wasShown = e;
        var s = ge(e);
        return val(s, o), isVisible(s) || show(s), setTimeout(function() {
            t ? scrollToY(getXY(r)[1] - 100, 200) : scrollToY(getXY(s)[1] - 20, 200), setTimeout(elfocus.pbind(r), 201)
        }, 1), !1
    },
    checkPhoneOnBlur: function(e) {
        var o = e;
        if (phone = ge(o).value.replace(/[^0-9]/g, ""), !isVisible(o) || /^[1-9][0-9]{6,14}$/.test(phone)) {
            var r = function(e, o) {
                var r = "request_email_res";
                2 === e ? (cur.wasShown && cur.wasShown != r && hide(cur.wasShown), cur.wasShown = r, val(r, o), cur.checkedPhones[phone] = [e, o], isVisible(r) || setTimeout(function() {
                    slideDown(r, 150)
                }, 50), cur.checkedPhones[phone] = [e, o]) : isVisible(r) && slideUp(r, 200)
            };
            cur.checkedPhones = cur.checkedPhones || {}, phone in cur.checkedPhones ? r(cur.checkedPhones[phone][0], cur.checkedPhones[phone][1]) : ajax.post("al_restore.php", {
                act: "a_check_phone",
                hash: cur.options.fhash,
                phone: phone
            }, {
                onDone: r
            })
        }
    },
    getUploadedPhotosIds: function(e) {
        var o = [];
        return each(cur.images, function(r, t) {
            (e || !t.deleted) && o.push(t.id)
        }), o
    },
    submitDocPhoto: function() {
        var e = ge("doc_file_button");
        lockButton(e), setTimeout(function() {
            e.innerHTML = e.innerHTML
        }, 0), val("doc_upload_ids", Restore.getUploadedPhotosIds(!0).join(",")), document.doc_upload.submit()
    },
    submitPersonalPhoto: function() {
        var e = ge("photo_file_button");
        lockButton(e), setTimeout(function() {
            e.innerHTML = e.innerHTML
        }, 0), val("photo_upload_ids", Restore.getUploadedPhotosIds(!0).join(",")), document.photo_upload.submit()
    },
    uploadError: function(e, o) {
        var r = "",
            t = 4e3;
        e ? 1 == e || 4 == e ? r = getLang("restore_not_uploaded") : 2 == e ? r = getLang("restore_bad_format") : 5 == e ? r = getLang("restore_bad_size") : 7 == e ? (r = getLang("restore_too_small_image"), t = 8e3) : 8 == e ? (r = getLang("restore_photo_already_attached"), t = 8e3) : 9 == e && (r = getLang("restore_photo_incorrect"), t = 8e3) : r = getLang("global_unknown_error"), setTimeout(showFastBox({
            title: getLang("global_error"),
            width: 470
        }, r).hide, t);
        var s = o ? "photo_" : "doc_",
            n = ge(s + "file_button");
        unlockButton(n)
    },
    uploadComplete: function(e, o, r, t, s) {
        var n = t ? "photo" : "doc",
            i = n + "_",
            a = ge(i + "file_button");
        unlockButton(a);
        var l = cur.images.length,
            _ = !0;
        each(cur.images, function(e, o) {
            return o.type == t && o.deleted ? (l = e, _ = !1, !1) : void 0
        }), cur.images[l] = {
            id: o,
            hash: r,
            type: t
        }, ++cur.images_count[t], ge(i + "input").disabled = cur.images_count[t] >= 2, ge(i + "input").disabled && hide(i + "upload"), show(i + "photos"), s = s.split("%index%").join(l).split("%type%").join(t);
        var u = se(s);
        _ ? ge(i + "photos").appendChild(u) : domReplaceEl(ge("photo" + l), u), show("restore_roll_button_" + n)
    },
    deleteImage: function(e, o) {
        var r = e ? "photo" : "doc",
            t = r + "_";
        if (cur.images[o].deleted) {
            if (cur.images_count[e] >= 2) return;
            cur.images[o].deleted = !1, removeClass("photo_img" + o, "restore_uploaded_image__img_removed"), ++cur.images_count[e] >= 2 && (ge(t + "input").disabled = !0, hide(t + "upload")), ge("del_link" + o).innerHTML = getLang("global_delete"), show("restore_roll_button_" + r)
        } else cur.images[o].deleted = !0, addClass("photo_img" + o, "restore_uploaded_image__img_removed"), --cur.images_count[e], ge(t + "input").disabled = !1, show(t + "upload"), ge("del_link" + o).innerHTML = getLang("global_dont_delete"), cur.images_count[e] || hide("restore_roll_button_" + r)
    },
    submitPageLink: function() {
        var e = ge("submitBtn"),
            o = val("link");
        if (!o) return void elfocus("link");
        hide("error");
        var r = {
            act: "a_profile_link",
            link: o
        };
        ajax.post("al_restore.php", r, {
            onDone: function(e, o) {
                ge("error").innerHTML = (o ? "<b>" + o + "</b><br>" : "") + e, show("error")
            },
            onFail: function() {
                unlockButton(e)
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    usePhoneAsLogin: function() {
        var e = ge("usePhoneBtn");
        lockButton(e);
        var o = {
            act: "a_new_email",
            rid: cur.options.request_id,
            hash: cur.options.lhash,
            login: -1
        };
        ajax.post("al_restore.php", o, {
            onDone: function(o) {
                o ? (unlockButton(e), Restore.showMsgBox(o, getLang("global_error"))) : nav.reload()
            },
            onFail: function() {
                unlockButton(e)
            }
        })
    },
    useAnotherEmail: function() {
        var e = ge("anotherEmailBtn"),
            o = ge("login").value;
        if (!/^\s*[a-zA-Z0-9_\.]+@[a-zA-Z0-9_\.]+\s*$/.test(o)) return void Restore.showMsgBox(getLang("restore_error_email"), getLang("global_error"), "login");
        lockButton(e);
        var r = {
            act: "a_new_email",
            rid: cur.options.request_id,
            hash: cur.options.lhash,
            login: o
        };
        ajax.post("al_restore.php", r, {
            onDone: function(o) {
                unlockButton(e), Restore.showMsgBox(o, getLang("global_error"))
            },
            onFail: function() {
                unlockButton(e)
            }
        })
    },
    extendRequest: function(e, o) {
        var r = {
            act: "a_extend",
            rid: cur.options.request_id,
            hash: cur.options.phash,
            comment: val("comment"),
            images: []
        };
        o === !0 && (r.force = 1);
        for (var t = 0; t < cur.images.length; ++t) cur.images[t].deleted || r.images.push(cur.images[t].id + "_" + cur.images[t].hash);
        if (!trim(r.comment).length && !r.images.length) return void elfocus("comment");
        if (!r.images.length && cur.restorePhotosRequested && !o) {
            var s = {
                title: getLang("global_warning"),
                width: 620
            };
            return void(cur.restoreConfirmNoPhotos = showFastBox(s, getLang("restore_extend_no_photos_are_you_sure"), getLang("restore_extend"), null, getLang("restore_dont_extend_with_photos"), function() {
                cur.restoreConfirmNoPhotos.hide(), Restore.extendRequest(e, !0)
            }))
        }
        ajax.post("al_restore.php", r, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, o) {
                e ? (val("request_result_msg", o), hide("request_result_wrap"), show("request_result_msg")) : Restore.showMsgBox(o, getLang("global_error"))
            }
        })
    },
    tryToSubmitRequest: function() {
        Restore.independency_cheched && Restore.submitRequest(), cur.options && cur.options.can_restore_independently || Restore.submitRequest(), Restore.independency_cheched = !0;
        var e = ge("login").value;
        lockButton(ge("tryToSubmitBtn")), ajax.post("/restore", {
            act: "check_independent_restore_allowed",
            login: e,
            hash: cur.options.fhash
        }, {
            onDone: function(e) {
                e ? (show("restore_roll_back_link"), hide("try_to_submit_wrapper")) : Restore.fixClassicSubmitForm()
            },
            onFail: function() {
                Restore.fixClassicSubmitForm()
            }
        })
    },
    fixClassicSubmitForm: function() {
        hide("try_to_submit_wrapper"), hide("restore_roll_back_link"), show("about_old_password_wrapper"), show("submit_wrapper")
    },
    submitRequest: function() {
        var e, o, r, t, s, n = ge("submitBtn"),
            i = cur.options.request_type;
        if (4 == i) {
            if (e = ge("login").value, isVisible("email_wrap") && !/^\s*$/.test(e) && !/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(e) && !/^\s*[a-zA-Z0-9_]{6,32}\s*$/.test(e)) return Restore.showResult("request_email_res", getLang("restore_login_error"), "login");
            o = ge("email").value, isVisible("email_wrap") && !/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(o)
        } else if (!i || 2 == i) {
            if (e = ge("login").value, (isVisible("email_wrap") && !/^\s*$/.test(e) || i) && !/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(e) && !/^\s*[a-zA-Z0-9_]{6,32}\s*$/.test(e)) return Restore.showResult("request_email_res", getLang(2 == i ? "restore_login_error1" : "restore_login_error"), "login");
            o = ge("email").value, isVisible("email_wrap") && !/^\s*[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\s*$/.test(o)
        }
        if (!(i && 4 != i || (r = ge("old_phone").value.replace(/[^0-9]/g, ""), /^\s*$/.test(r) || /^[1-9][0-9]{6,14}$/.test(r)))) return Restore.showResult("request_phone_res", getLang("restore_old_phone_error"), "old_phone");
        if (2 != i) {
            var a = isVisible("new_phone_wrap") ? "new_phone" : "phone";
            if (t = ge(a).value.replace(/[^0-9]/g, ""), isVisible(a) && !/^[1-9][0-9]{6,14}$/.test(t)) return Restore.showResult("request_phone_res", getLang("restore_phone_error"), a);
            if (cur.checkedPhones && cur.checkedPhones[t] && 2 == cur.checkedPhones[t][0]) return Restore.showResult("request_email_res", cur.checkedPhones[t][1], a, !0)
        }
        if (4 == i) {
            if (!isVisible("new_phone_wrap") && !e && !r) {
                var l = getLang("restore_need_email_or_phone");
                return l += "<br>" + val("request_email_or_phone_need"), Restore.showResult("request_phone_res", l, "old_phone")
            }
            if (s = val("old_password"), !s) return Restore.showResult("request_old_password_res", getLang("restore_need_old_password") + "<br>" + val("request_old_password_need"), "old_password")
        } else {
            if (cur.images_count[0] < 1) return Restore.showResult("request_doc_res", getLang("restore_doc_error") + "<br>" + getLang("restore_attention"));
            if (cur.images_count[1] < 1) return Restore.showResult("request_photo_res", getLang("restore_photo_error") + "<br>" + getLang("restore_attention"))
        }
        var _ = {
            act: "a_request",
            rv2: cur.options.rv2 || "",
            bad_phone: cur.wrongPhone ? 1 : 0
        };
        if (4 == i) extend(_, {
            hash: cur.options.fhash,
            login: e,
            email: o,
            phone: t,
            old_phone: r,
            password: s
        });
        else {
            extend(_, {
                comment: ge("comment").value,
                images: []
            }), i ? 1 == i ? extend(_, {
                change_phone: 1,
                phone: t,
                old_phone: r
            }) : extend(_, {
                change_email: 1,
                login: e,
                email: o
            }) : extend(_, {
                hash: cur.options.fhash,
                login: e,
                email: o,
                phone: t,
                old_phone: r
            });
            for (var u = 0; u < cur.images.length; ++u) cur.images[u].deleted || _.images.push(cur.images[u].id + "_" + cur.images[u].hash)
        }
        cur.validationLastCallback = function(e) {
            hide("request_phone_res"), e ? Restore.submitRequest() : elfocus("phone")
        }, ajax.post("/al_restore.php", _, {
            onDone: function(e, o, r, t) {
                if (!e) return Restore.showMsgBox(o, getLang("global_error"));
                var s = intval(e);
                if (-1 == s) ge("request_result").innerHTML = o, show("request_result"), hide("request_form"), scrollToTop();
                else {
                    if (-2 == s) return lockButton(n), setTimeout(Restore.submitRequest, 1e3);
                    s > 0 ? (cur.request_id = s, cur.request_hash = o, Restore.phone_confirm_box = showFastBox(getLang("restore_confirmation"), '<div id="phone_confirm_box">' + ge("phone_confirm").innerHTML + "</div>", getLang("box_send"), function() {
                        Restore.confirmPhoneSend()
                    }, getLang("global_cancel")), ge("phone_confirm_code").focus()) : ("login" == t ? o += "<br>" + val("request_email_or_phone_need") : "phonenum" == t && (cur.wrongPhone = !0), Restore.showResult(e, o, r))
                }
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n)
        })
    },
    confirmCodeResend: function() {
        return hide("phone_confirm_error"), ajax.post("/al_restore.php", {
            act: "a_confirm",
            request_id: cur.request_id,
            resend: 1,
            hash: cur.request_hash,
            rv2: cur.options.rv2 || ""
        }, {
            onDone: function(e, o) {
                Restore.confirmPhoneError(o)
            }
        }), !1
    },
    confirmPhoneSend: function() {
        var e = trim(ge("phone_confirm_code").value);
        return cur.options.rv2 && !/^[0-9a-zA-Z]{6}$/i.test(e) ? void Restore.confirmPhoneError(getLang("restore_code_error_6chars")) : cur.options.rv2 || /^[0-9a-fA-F]{8}$/i.test(e) ? void ajax.post("/al_restore.php", {
            act: "a_confirm",
            request_id: cur.request_id,
            code: e,
            hash: cur.request_hash,
            rv2: cur.options.rv2 || ""
        }, {
            onDone: function(e, o) {
                e ? (ge("request_result").innerHTML = o, show("request_result"), hide("request_form"), scrollToTop(), Restore.phone_confirm_box.hide()) : Restore.confirmPhoneError(o)
            }
        }) : void Restore.confirmPhoneError(getLang("restore_code_error"))
    },
    confirmPhoneError: function(e) {
        var o = ge("phone_confirm_error");
        o.innerHTML = e, show(o), elfocus("phone_confirm_code")
    },
    toFullRequest: function(e) {
        hide(cur.wasShown), ajax.post("al_restore.php", {
            act: "to_full",
            mid: e
        }, {
            onDone: function(e) {
                var o = ge("restore_fields");
                val(o, e), hide("email_wrap"), cur.options.request_type = 0;
                var r = geByClass1("restore_roll_colored", o);
                r && (show(r), removeClass(r, "restore_roll_colored"))
            }
        })
    },
    initRequest: function() {
        extend(cur, {
            images: [],
            images_count: [0, 0],
            request_id: !1,
            request_hash: !1,
            wrongPhone: !1
        });
        var e = ge("comment"),
            o = ge("phone"),
            r = ge("old_phone");
        placeholderSetup(e, {
            back: !0
        }), Restore.initFormTT(e, "restore_lost_phone_your_comment_short"), isVisible(o) && Restore.initFormTT(o, "restore_form_available_phone_tooltip"), isVisible(r) && Restore.initFormTT(r, "restore_form_old_phone_tooltip")
    },
    initFormTT: function(e, o) {
        addEvent(e, "focus", showTooltip.pbind(e, {
            dir: "right",
            text: getLang(o),
            shift: function() {
                var o = Math.round((getSize(e.tt.container)[1] + getSize(e)[1]) / 2);
                return [225, -o, 0]
            },
            width: 215,
            slideX: -15,
            hasover: 1,
            forcetoup: !0,
            nohide: !0
        })), addEvent(e, "blur", function() {
            e.tthide && e.tthide()
        })
    },
    returnToFormStep: function(e) {
        var o = geByClass1("_restore_roll_active", "restore");
        removeClass(o, "_restore_roll_active"), Restore.fillRollShort(o.id.replace("restore_roll_", ""));
        var r = ge("restore_roll_" + e);
        removeClass(r, "restore_roll_hidden"), addClass(r, "_restore_roll_active")
    },
    checkIndependentRestore: function(e, o) {
        if (!cur.options || !cur.options.can_restore_independently) return void o();
        var r = (val("old_phone").replace(/[^0-9]/g, ""), val("phone").replace(/[^0-9]/g, "")),
            t = val("new_phone").replace(/[^0-9]/g, "");
        return t ? void e() : (r || Restore.changeFormStep("phones", "photo"), lockButton(geByClass1("flat_button", ge("restore_roll_button_phones"))), void ajax.post("restore", {
            act: "check_independent_restore_allowed",
            phone: r,
            hash: cur.options.fhash
        }, {
            onDone: function(r) {
                r ? e() : o()
            },
            onFail: function() {
                o()
            }
        }))
    },
    _phoneIndependentRestoreSuccess: function() {
        Restore.changeFormStep("phones", "back_link")
    },
    _phoneIndependentRestoreFail: function() {
        Restore.changeFormStep("phones", "photo")
    },
    changeFormStep: function(e, o) {
        if (Restore.checkRoll(e)) {
            if (Restore.fillRollShort(e), "phones" == e && "independency_check" == o) return Restore.checkIndependentRestore(Restore._phoneIndependentRestoreSuccess, Restore._phoneIndependentRestoreFail), !1;
            var r = ge("restore_roll_" + e);
            removeClass(r, "_restore_roll_active"), re("restore_roll_button_" + e);
            var t = ge("restore_roll_" + o);
            show(t), removeClass(t, "restore_roll_colored"), scrollToY(getXY(t)[1], 400), removeClass("restore_roll_" + o, "restore_roll_hidden"), addClass(t, "_restore_roll_active"), "comment" == o && autosizeSetup(ge("comment"), {
                minHeight: 55,
                maxHeight: 300
            })
        }
    },
    checkRoll: function(e) {
        if ("phones" == e) {
            var o = (val("old_phone"), val("phone"), cur.options.request_type);
            if (!o || 4 == o) {
                var r = ge("old_phone").value.replace(/[^0-9]/g, "");
                if (!/^\s*$/.test(r) && !/^[1-9][0-9]{6,14}$/.test(r)) return Restore.showResult("request_phone_res", getLang("restore_old_phone_error"), "old_phone")
            }
            if (2 != o) {
                var t = isVisible("new_phone_wrap") ? "new_phone" : "phone",
                    s = ge(t).value.replace(/[^0-9]/g, "");
                if (isVisible(t) && !s) return notaBene(t), !1;
                if (isVisible(t) && !/^[1-9][0-9]{6,14}$/.test(s)) return Restore.showResult("request_phone_res", getLang("restore_phone_error"), t);
                if (cur.checkedPhones && cur.checkedPhones[s] && 2 == cur.checkedPhones[s][0]) return Restore.showResult("request_email_res", cur.checkedPhones[s][1], t, !0)
            }
        } else if ("doc" == e) {
            if (cur.images_count[0] < 1) return Restore.showResult("request_doc_res", getLang("restore_doc_error") + "<br>" + getLang("restore_attention"))
        } else if ("photo" == e && cur.images_count[1] < 1) return Restore.showResult("request_photo_res", getLang("restore_photo_error") + "<br>" + getLang("restore_attention"));
        return !0
    },
    fillRollShort: function(e) {
        var o = ge("restore_roll_" + e),
            r = geByClass1("_restore_roll_short", o);
        if ("phones" == e) {
            var t = val("old_phone"),
                s = val("phone"),
                n = geByClass1("_restore_roll_short_old_phone", r),
                i = geByClass1("_restore_roll_short_new_phone", r);
            n.innerHTML = t ? t : getLang("restore_phone_not_set"), i.innerHTML = s ? s : getLang("restore_phone_not_set")
        } else if ("doc" == e || "photo" == e) {
            var a = geByClass1("_restore_roll_short_images", r),
                l = geByClass1("_restore_roll_short_message", r);
            a.innerHTML = "", hide(l), each(geByClass("restore_uploaded_image__img", e + "_photos"), function(e, o) {
                if (!hasClass(o, "restore_uploaded_image__img_removed")) {
                    var r = o.cloneNode(!0);
                    r.id = "", a.appendChild(r)
                }
            }), a.innerHTML || show(l)
        } else "back_link" == e && hide("restore_roll_back_link");
        return !0
    },
    activate: function(e, o, r) {
        isButtonLocked(e) || ajax.post("restore", {
            act: "a_activate",
            id: o,
            hash: r
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    }
};
try {
    stManager.done("restore.js")
} catch (e) {}