/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1146267795
    Link: https://vk.com/js/al/mrtarg.js?1146267795
    Last Update: 10.2.117
*/
try {
    ! function(t, e) {
        t.RB = t.RB || function() {
            function i() {
                T = !0, l(!0)
            }

            function n() {
                T = !1
            }

            function r() {
                e.hidden ? n() : i()
            }

            function o() {
                l()
            }

            function c() {
                l()
            }

            function a(t) {
                B = (new Date).getTime(), H[t] || (H[t] = {
                    c: g(t)
                }), d(), l(!0)
            }

            function l(t) {
                for (var e in H) H[e] && f(H[e].c) >= 50 && s() && !H[e].t ? ! function(t) {
                    H[t].t = setTimeout(function() {
                        try {
                            h(t)
                        } catch (e) {}
                    }, 1e3)
                }(e) : H[e] && f(H[e].c) < 50 ? H[e].t && (clearTimeout(H[e].t), delete H[e].t) : H[e] && !s() ? H[e].t && (clearTimeout(H[e].t), delete H[e].t, clearTimeout(w), t = !1) : H[e] || u(e);
                t && (clearTimeout(w), w = setTimeout(function() {
                    l(!0)
                }, 300))
            }

            function u(t, e) {
                if (t && H[t]) return clearTimeout(H[t].t), H[t].t = null, void(e || (H[t].c = null, delete H[t]));
                clearTimeout(w), w = null;
                for (var t in H) H[t].t && u(t, !0)
            }

            function h(t, e) {
                if (!g(t)) return void u(t);
                if (H[t]) {
                    if (e = H[t].c, !s()) return void u(t, !0);
                    if (f(e) < 50) return void u(t, !0);
                    (new Image).src = e.getAttribute("data-counter"), u(t), y(H) || m()
                }
            }

            function s() {
                return p || "function" != typeof e.hasFocus || (T = e.hasFocus()), T
            }

            function f(i) {
                var n = {};
                if (n.w = n.h = 1 / 0, !isNaN(e.body.clientWidth) && e.body.clientWidth > 0 && (n.w = e.body.clientWidth), !isNaN(e.body.clientHeight) && e.body.clientHeight > 0 && (n.h = e.body.clientHeight), W && W.clientWidth && !isNaN(W.clientWidth) && (n.w = W.clientWidth), W && W.clientHeight && !isNaN(W.clientHeight) && (n.h = W.clientHeight), t.innerWidth && !isNaN(t.innerWidth) && (n.w = Math.min(n.w, t.innerWidth)), t.innerHeight && !isNaN(t.innerHeight) && (n.h = Math.min(n.h, t.innerHeight)), n.h == 1 / 0 || n.h == 1 / 0) n = {
                    E: ":-("
                };
                else {
                    var r = i.getClientRects()[0];
                    if (!r) return n = {
                        p: 0
                    };
                    if (n.t = r.top, n.b = r.bottom, n.l = r.left, n.r = r.right, r.bottom < 0 || r.right < 0 || r.top > n.clientHeight || r.left > n.clientWidth) n = 0;
                    else {
                        var o = (r.right - r.left) * (r.bottom - r.top),
                            c = Math.ceil(Math.max(0, r.left)),
                            a = Math.floor(Math.min(n.w, r.right)),
                            l = Math.ceil(Math.max(0, r.top)),
                            u = Math.floor(Math.min(n.h, r.bottom)),
                            h = (a - c) * (u - l);
                        n = Math.round(h / o * 100)
                    }
                }
                return n
            }

            function d() {
                M || (v(t, "resize", c), v(t, "scroll", o), p ? v(e, p, r) : (v(t, "blur", n), v(t, "focus", i)), M = !0)
            }

            function m() {
                b(t, "resize", c), b(t, "scroll", o), p && b(e, p, r), b(t, "focus", i), b(t, "blur", n), clearTimeout(w), M = !1
            }

            function g(t) {
                return e.getElementById(t)
            }

            function v(t, e, i) {
                t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i)
            }

            function b(t, e, i) {
                t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i)
            }

            function y(t) {
                var e, i = 0;
                for (e in t) t.hasOwnProperty(e) && i++;
                return i
            }

            function N() {
                var t = "mailru-visibility-check";
                if (e.getElementsByClassName) return e.getElementsByClassName(t);
                if (e.querySelectorAll) return e.querySelectorAll("." + t);
                for (var i = [], n = e.getElementsByTagName("*"), r = new RegExp("(^|s)" + classname + "(s|$)"), o = 0; o < n.length; o++) r.test(n[o].className) && i.push(n[o]);
                return i
            }

            function E() {
                for (var t = N(), e = t.length - 1; e >= 0; e--) t[e].id && t[e].getAttribute("data-counter") && a(t[e].id)
            }
            var w, M = !1,
                T = !0,
                H = {},
                W = e.documentElement,
                p = e.mozVisibilityState ? "mozvisibilitychange" : e.webkitVisibilityState ? "webkitvisibilitychange" : e.visibilityState ? "visibilitychange" : "",
                B = 0;
            return {
                doCheck: E
            }
        }()
    }(window, document)
} catch (e) {}
try {
    stManager.done("mrtarg.js")
} catch (e) {}