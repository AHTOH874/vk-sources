/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 4187303773
    Link: https://vk.com/js/al/prereg.js?4187303773
    Last Update: 10.2.117
*/
function initReg(e, r) {
    extend(cur, {
        regOnlyNums: function(e) {
            return -1 == e.search(/[^0-9]/)
        },
        regChange: function(e, r, s, i) {
            i = i || window.event, i && 13 == i.keyCode && elfocus(e + s), hide(e + r + "_details")
        },
        regValidate: function(e, s) {
            var i = trim(ge(e + "fn").value),
                o = !1;
            i.length < 2 && (cur.regShowError(e, "fn_details", r.reg_error_fname), o = !0);
            var n = trim(ge(e + "ln").value),
                t = !1;
            n.length < 2 && (cur.regShowError(e, "ln_details", r.reg_error_lname), t = !0);
            var a = ge(e + "email").value,
                l = !1,
                g = a.lastIndexOf("."),
                u = a.indexOf("@");
            a.length < 8 ? (cur.regShowError(e, "email_details", r.reg_error_email), l = !0) : (0 > g || 0 >= u || u + 1 >= g) && (cur.regShowError(e, "email_details", r.reg_error_bad_email), l = !0);
            var c = ge(e + "pass").value,
                d = !1;
            c.length < 6 && (cur.regShowError(e, "pass_details", r.reg_error_pass), d = !0);
            var _ = intval(ge(e + "sex").value),
                f = !1;
            if (_ ? hide(e + "sex_details") : (cur.regShowError(e, "sex_details", r.reg_error_sex), f = !0), o) elfocus(e + "fn");
            else if (t) elfocus(e + "ln");
            else if (l) elfocus(e + "email");
            else if (d) elfocus(e + "pass");
            else if (!f) {
                if (s || !cur.regOnlyNums(c)) return !0;
                hide(e + "pass_details"), o || t || l || cur.regErrorBox(e, r.reg_error_passonlydigits, e + "pass", r.reg_error_changepass, !0)
            }
            return !1
        },
        regErrorBox: function(e, s, i, o, n) {
            o = o || r.reg_error_close;
            var t = showFastBox({
                title: r.reg_error_incorrectinfo
            }, s, o, function() {
                t.hide(), ge(i) && elfocus(i)
            }, n ? r.reg_error_continuereg : !1, n ? function() {
                t.hide(), cur.register(e, !0)
            } : !1);
            return !0
        },
        regShowError: function(e, r, s) {
            var i = ge(e + r),
                o = isVisible(i) && trim(i.innerHTML);
            i.innerHTML = "<span>" + s + "</span>", i.style.position = "relative", i.offsetHeight > 20 ? i.style.top = "0px" : i.style.top = "5px", o ? (i.style.color = "#777777", animate(i, {
                color: "#880000"
            }, 200, function() {
                setTimeout(animate.pbind(i, {
                    color: "#777777"
                }, 200, function() {
                    i.style.color = ""
                }), 500)
            })) : show(i)
        },
        register: function(e, s) {
            if (isVisible(cur[e + "reg_progress"])) return !1;
            if (!cur.regValidate(e, s)) return !1;
            var i = ge(e + "email").value,
                o = ge(e + "pass").value,
                n = (new Date).getTimezoneOffset(),
                t = {
                    act: "register",
                    first_name: ge(e + "fn").value,
                    last_name: ge(e + "ln").value,
                    regemail: i,
                    regpass: o,
                    sex: intval(ge(e + "sex").value),
                    timezone: -(Math.abs(n) > 20 ? n : Math.round(n / 60))
                },
                a = {
                    onDone: function(s, n, t) {
                        s = intval(s), s ? (cur.regBadEM = !0, cur.regShowError(e, "email_details", r.reg_login_is_taken), elfocus(e + "email")) : submitQuickLoginForm(n || i, t || o)
                    },
                    onFail: function(r) {
                        return r ? cur.regErrorBox(e) : void 0
                    },
                    progress: cur[e + "reg_progress"]
                };
            ajax.post("register.php", t, a)
        }
    }), cur[e + "sexdd"] || (cur[e + "sexdd"] = new Dropdown(ge(e + "sex"), r.sexes, {
        width: r.dd_width || 200,
        onChange: function(r) {
            intval(r) && hide(e + "sex_details")
        }
    }), cur[e + "reg_progress"] = r.progress, cur[e + "reg_destroy"] = function(r) {
        cur[e + "sexdd"].destroy(), delete cur[e + "sexdd"]
    })
}
try {
    stManager.done("prereg.js")
} catch (e) {}