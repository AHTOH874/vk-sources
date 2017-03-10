/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2289308011
    Link: https://vk.com/js/al/ads_tagger.js?2289308011
    Last Update: 10.2.117
*/
function adsPhotoTagger(t, e) {
    if (t = ge(t), !t || !t.src) return !1;
    var i, n, h, a, o, s = 0,
        r = t.parentNode,
        l = Math.abs,
        c = Math.min,
        d = Math.max,
        f = Math.floor,
        g = Math.ceil,
        v = function(t) {
            return 0 > t ? -1 : 1
        },
        p = function() {
            var t = 1e-8;
            return function(e, i) {
                return l(e - i) < t ? 0 : i > e ? -1 : 1
            }
        }(),
        w = document.body,
        u = intval(e.zstart),
        m = intval(e.minw) || 30,
        x = intval(e.minh) || 30,
        y = intval(e.maxw) || 100,
        E = intval(e.maxh) || 100,
        z = Number(e.minr) || 1,
        b = Number(e.maxr) || 1,
        N = intval(e.defw) || 100,
        _ = intval(e.defh) || 100,
        A = vkImage(),
        I = [],
        M = [];
    A.src = t.src;
    var C, T, X, Y, S, L, H, R, W, Z = {},
        j = {},
        k = 0,
        F = 0,
        P = {},
        q = function(t, i) {
            if (P = extend(P, t), each(t, function(t) {
                    var e = this + ("left" == t ? h : "top" == t ? a : 0);
                    C.style[t] = e + "px"
                }), T.style.marginLeft = -t.left + "px", T.style.marginTop = -t.top + "px", each(Z, function(e) {
                    if (e.length < 2) "n" == e || "s" == e ? (this.style.left = h + t.left + intval(t.width / 2) - 5 + "px", this.style.top = a + t.top + ("n" == e ? 0 : t.height) - 5 + "px") : (this.style.left = h + t.left + ("w" == e ? 0 : t.width) - 5 + "px", this.style.top = a + t.top + intval(t.height / 2) - 5 + "px");
                    else {
                        var i = e.charAt(0),
                            n = e.charAt(1);
                        this.style.left = h + t.left + ("w" == n ? 0 : t.width) - 5 + "px", this.style.top = a + t.top + ("n" == i ? 0 : t.height) - 5 + "px"
                    }
                }), each(j, function(i) {
                    var n, o = e.safeZones[i];
                    n = "top" == i || "bottom" == i ? o / _ * t.height : o / N * t.width, this.style.left = h + t.left + ("right" == i ? t.width - n : 0) + "px", this.style.top = a + t.top + ("bottom" == i ? t.height - n : 0) + "px", this.style.width = ("left" == i || "right" == i ? n : t.width) + "px", this.style.height = ("top" == i || "bottom" == i ? n : t.height) + "px"
                }), !i)
                for (var n in I)
                    if (I[n]) {
                        var o = I[n],
                            s = M[n].width,
                            r = M[n].height,
                            l = (o.parentNode, t.width / t.height),
                            c = d(s, intval(r * l)),
                            v = d(r, intval(c / l)),
                            p = t.left + t.width / 2,
                            w = t.top + t.height / 2;
                        o.style.width = g(k * c / t.width) + "px", o.style.height = g(F * v / t.height) + "px", o.style.marginLeft = -f(p * c / t.width - s / 2) + "px", o.style.marginTop = -f(w * v / t.height - r / 2) + "px"
                    }
        },
        B = 0,
        D = function(t, e) {
            return [c(k, d(0, t - W[0])), c(F, d(0, e - W[1]))]
        },
        G = function() {
            var t = Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth)),
                e = Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight));
            o.style.width = t + "px", o.style.height = e + "px"
        },
        J = function(t) {
            B && (1 == B || 0 > B ? t = "move" : 2 == B ? t = "crosshair" : B.length && (t = B + "-resize"), o.style.cursor = t)
        },
        K = function(e) {
            Y = e.pageX, S = e.pageY, W = getXY(t), R = extend({}, P);
            return e.target == T || hasClass(e.target, "tag_frame_zone") ? B = 1 : e.target == X || e.target == t ? B = 2 : "preview" == e.target.className ? B = -1 - e.target.id.substring(4) : each(Z, function(t) {
                if (e.target == this) {
                    B = t;
                    var i = Y - W[0],
                        n = S - W[1],
                        h = [t.charAt(0), t.length > 1 ? t.charAt(1) : t.charAt(0)];
                    Y = P.left + ("w" == h[1] ? 0 : P.width), S = P.top + ("n" == h[0] ? 0 : P.height);
                    var a = Y,
                        o = S;
                    1 == t.length && ("s" == t || "n" == t ? a -= g(P.width / 2) : o -= g(P.height / 2)), L = a - i, H = o - n
                }
            }), B ? ((2 != B && B >= 0 || B.length) && each(Z, function() {
                setStyle(this, "opacity", .7)
            }), show(o), J(), addEvent(w, "mousemove", O), addEvent(w, "mouseup", Q), addEvent(w, "dragend", Q), cancelEvent(e)) : void 0
        },
        O = function(e) {
            if (window.getSelection) {
                var i = window.getSelection();
                i.removeAllRanges && i.removeAllRanges()
            }
            var n = e.pageX,
                h = e.pageY;
            if (1 == B) {
                var a = R.left + (n - Y),
                    o = R.top + (h - S);
                a = c(k - P.width, d(0, a)), o = c(F - P.height, d(0, o)), q(extend(P, {
                    left: a,
                    top: o
                }))
            } else if (2 == B) l(n - Y) > 3 && l(h - S) > 3 && (B = 3, J(), W = getXY(t), Y -= W[0], S -= W[1], show(C, X), each(Z, function() {
                show(this), setStyle(this, "opacity", .7)
            }));
            else if (0 > B) {
                var s = -(B + 1),
                    r = M[s].width,
                    w = M[s].height,
                    a = R.left - f((n - Y) * P.width / r),
                    o = R.top - f((h - S) * P.height / w);
                a = c(k - P.width, d(0, a)), o = c(F - P.height, d(0, o)), q(extend(P, {
                    left: a,
                    top: o
                }))
            } else if (B.length) {
                var u = D(n + L, h + H);
                n = u[0], h = u[1];
                var a = P.left,
                    o = P.top,
                    N = P.width,
                    _ = P.height,
                    A = 0,
                    I = 0;
                2 == B.length ? (A = "n" == B.charAt(0) ? -1 : 1, I = "w" == B.charAt(1) ? -1 : 1) : (A = "n" == B ? -1 : "s" == B ? 1 : 0, I = "w" == B ? -1 : "e" == B ? 1 : 0), Y = a + N * (0 > I), S = o + _ * (0 > A), (a > n || n > a + N) && l(n - Y) < l(n - (a + N * (I >= 0))) && (Y += d(m, intval(_ * z)) * I, I *= -1), (o > h || h > o + _) && l(h - S) < l(h - (o + _ * (A >= 0))) && (S += d(x, intval(N / b)) * A, A *= -1);
                var T = l(I) * l(n - Y),
                    j = l(A) * l(h - S);
                if (I || (T = P.width), A || (j = P.height), !T && !j) return cancelEvent(e);
                T = d(T, m), j = d(j, x);
                var G = c(y, I >= 0 ? k - Y : Y),
                    K = c(E, A >= 0 ? F - S : S);
                T = c(T, G), j = c(j, K), a = I >= 0 ? Y : Y - T, o = A >= 0 ? S : S - j;
                var O, Q = 0,
                    U = 0,
                    V = c(a, k - a - T),
                    $ = c(o, F - o - j),
                    tt = T / j;
                p(tt, z) < 0 ? 0 == I ? (O = c(G, j * z), Q = (T - O) / 2, Q = v(Q) * c(g(l(Q)), V), T = c(T - 2 * Q, G), j = T / z) : 0 == A ? (O = d(T / z, x), U = (j - O) / 2, U = v(U) * g(l(U)), j = d(j - 2 * U, x), T = j * z) : (T = c(j * z, G), j = T / z) : p(tt, b) > 0 && (0 == I ? (O = d(j * b, m), Q = (T - O) / 2, Q = v(Q) * g(l(Q)), T = d(T - 2 * Q, m), j = T / b) : 0 == A ? (O = c(K, T / b), U = (j - O) / 2, U = v(U) * c(g(l(U)), $), j = c(j - 2 * U, K), T = j * b) : (j = c(T / b, K), T = j * b)), T = intval(T), j = intval(j), a = I >= 0 ? Y : Y - T, o = A >= 0 ? S : S - j, a += Q, o += U, q({
                    left: a,
                    top: o,
                    width: T,
                    height: j
                }), A = A > 0 ? "s" : 0 > A ? "n" : "", I = I > 0 ? "e" : 0 > I ? "w" : "", B != A + I && (B = A + I, J())
            }
            return 3 == B && (n -= W[0], h -= W[1], n = c(k, d(0, n)), h = c(F, d(0, h)), J(v((Y - n) * (S - h)) > 0 ? "nw-resize" : "ne-resize"), q({
                left: Y > n ? n : Y,
                top: S > h ? h : S,
                width: l(Y - n),
                height: l(S - h)
            }, !0)), cancelEvent(e)
        },
        Q = function(e) {
            var h, a = e.pageX,
                s = e.pageY;
            if (W = getXY(t), 2 == B) {
                a -= W[0], s -= W[1];
                var r = c(k - N, d(0, a - i)),
                    l = c(F - _, d(0, s - n));
                q({
                    left: r,
                    top: l,
                    width: N,
                    height: _
                })
            } else if (3 == B) {
                a -= W[0], s -= W[1], a > Y && (h = a, a = Y, Y = h), s > S && (h = s, s = S, S = h);
                var f = Y - a,
                    g = S - s;
                if (0 > a && (f += a, a = 0), 0 > s && (g += s, s = 0), f = c(f, k - a), g = c(g, F - s), m > f) {
                    var v = m - f,
                        u = intval(v / 2);
                    a -= u, f = m, a = c(k - f, d(0, a))
                }
                if (x > g) {
                    var v = x - g,
                        u = intval(v / 2);
                    s -= u, g = x, s = c(F - g, d(0, s))
                }
                var y = k - a,
                    E = F - s,
                    A = f / g;
                p(A, z) < 0 ? (f = c(g * z, y), g = f / z) : p(A, b) > 0 && (g = c(f / b, E), f = g * b), q({
                    left: a,
                    top: s,
                    width: f,
                    height: g
                })
            }
            return show(C, X), each(Z, function() {
                fadeTo(this, 200, .3)
            }), each(j, function() {
                show(this)
            }), hide(o), B = 0, removeEvent(w, "mousemove", O), removeEvent(w, "mouseup", Q), removeEvent(w, "dragend", Q), cancelEvent(e)
        };
    return function() {
        if (!(0 > s)) {
            if (k = A.width, F = A.height, !k || !F) return void(++s < 3e3 && setTimeout(arguments.callee, 100));
            if (r.style.position = "relative", h = t.offsetLeft, a = t.offsetTop, N = c(k, N), i = intval(N / 2), _ = c(F, _), n = intval(_ / 2), m = c(m, N), x = c(x, _), e.icons)
                for (var l in e.icons) e.icons[l] && e.icons[l].width && e.icons[l].height && e.icons[l].box && (M.push({
                    width: e.icons[l].width,
                    height: e.icons[l].height
                }), I.push(ge(e.icons[l].box).appendChild(ce("img", {
                    src: t.src,
                    className: "preview"
                }))), ge(e.icons[l].box).style.overflow = "hidden", I[I.length - 1].style.cursor = "move", addEvent(I[I.length - 1], "mousedown", K));
            if (o = w.appendChild(ce("div", {
                    className: "tag_bg"
                }, {
                    position: "fixed"
                })), addEvent(window, "resize", G), G(), r.style.zIndex = u + 10, t.style.zIndex = u + 20, C = r.appendChild(ce("div", {
                    className: "tag_frame",
                    innerHTML: '<img src="' + t.src + '" />'
                }, {
                    cursor: "move",
                    zIndex: u + 40
                })), T = C.firstChild, X = r.appendChild(ce("div", {
                    className: "tag_faded"
                }, {
                    cursor: "crosshair",
                    left: h,
                    top: a,
                    width: k,
                    height: F,
                    zIndex: u + 30
                })), each(["nw", "n", "ne", "w", "e", "sw", "s", "se"], function() {
                    var t = this.toString();
                    z == b && t.length < 2 || (Z[t] = r.appendChild(ce("div", {
                        className: "tag_frame_handle " + t
                    }, {
                        cursor: t + "-resize",
                        zIndex: u + 50
                    })))
                }), each(e.safeZones || {}, function(t) {
                    j[t] = r.appendChild(ce("div", {
                        className: "tag_frame_zone zone_" + t
                    }, {
                        zIndex: u + 45
                    })), addEvent(j[t], "mousedown", K)
                }), addEvent(r, "mousedown", K), e.crop) {
                for (var d = e.crop.split(","), l = 0; l < d.length; ++l) d[l] = intval(d[l]);
                d[3] || (d[3] = d[2]), d[2] < m && (d[2] = m), d[3] < x && (d[3] = x), e.rect = {
                    left: d[0],
                    top: d[1],
                    width: d[2],
                    height: d[3]
                }
            }
            e.rect ? (q(e.rect), show(X, C), each(Z, function() {
                show(this)
            }), each(j, function() {
                show(this)
            })) : (t.style.cursor = "crosshair", addEvent(t, "mousedown", K)), isFunction(e.onInit) && e.onInit()
        }
    }(), {
        destroy: function() {
            s = -1, t.style.cursor = "default", cleanElems(r, t);
            for (var e in I) I[e] && cleanElems(I[e]);
            each(Z, function() {
                cleanElems(this)
            }), each(j, function() {
                cleanElems(this)
            }), removeEvent(window, "resize", G)
        },
        result: function() {
            return [P.left, P.top, P.width, P.height]
        }
    }
}
try {
    stManager.done("ads_tagger.js")
} catch (e) {}