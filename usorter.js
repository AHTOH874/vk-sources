/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 362016183
    Link: https://vk.com/js/al/usorter.js?362016183
    Last Update: 10.2.117
*/
var usorter = {
    sqr: function(e) {
        return e * e
    },
    evCoords: function(e) {
        return browser.android ? [e.touches[0].pageX + (e.pageX || 0), e.touches[0].pageY + (e.pageY || 0)] : [e.pageX, e.pageY]
    },
    animstop: function() {
        clearInterval(usorter.animtimer), usorter.animtimer = !1
    },
    animcache: {},
    animstep: function() {
        var e, r = [],
            t = !0;
        for (var o in usorter.animcache)
            if (0 != o) {
                var s = usorter.animcache[o],
                    n = s.el,
                    a = Fx.Transitions.easeOutQuint,
                    i = 200,
                    u = vkNow();
                s.t += u - s.prev, s.prev = u, s.t < i ? (t = !1, n.style.left = a(s.t, s.sx, s.dx, i) + "px", n.style.top = a(s.t, s.sy, s.dy, i) + "px", browser.msie8 && (e = n.offsetLeft)) : (n.style.left = s.sx + s.dx + "px", n.style.top = s.sy + s.dy + "px", browser.msie8 && (e = n.offsetLeft), clearInterval(s.timer), r.push(n.parentNode.id), s.h && s.h.apply(n))
            } else t = !1, scrollNode.scrollTop += Math.ceil(usorter.animcache[o] / 5);
        for (var o in r) delete usorter.animcache[r[o]];
        t && usorter.animstop()
    },
    animdone: function(e) {
        removeClass(domPN(this), e.clsUp), setStyle(this, {
            left: 0,
            top: 0
        }), cur.usorterSetSize && setStyle(this.parentNode, {
            width: "",
            height: ""
        })
    },
    animate: function(e, r, t, o, s, n, a) {
        if (data(e, "tween") && data(e, "tween").stop(!0), browser.msie8 || r == o && t == s) return removeClass(domPN(e), a.clsUp), setStyle(e, {
            left: 0,
            top: 0
        }), void(cur.usorterSetSize && setStyle(e.parentNode, {
            width: "",
            height: ""
        }));
        var i = {
            t: 0,
            sx: r,
            sy: t,
            dx: o - r,
            dy: s - t,
            h: n,
            prev: vkNow()
        };
        return usorter.animcache[e.parentNode.id] ? void extend(usorter.animcache[e.parentNode.id], i) : (usorter.animcache[e.parentNode.id] = extend(i, {
            el: e
        }), void(usorter.animtimer || (usorter.animtimer = setInterval(usorter.animstep, 13))))
    },
    first: function(e) {
        for (el = e.firstChild; el && 3 == el.nodeType;) el = el.nextSibling;
        return el
    },
    mousedown: function(e) {
        var r = e && e.touches && 1 == e.touches.length;
        if (e && (2 == e.button || 3 == e.which || e.ctrlKey || e.metaKey) && !r) return !0;
        if (!usorter.current) {
            cur.usorterOver = !1;
            var t = this,
                o = usorter.first(t),
                s = t.parentNode.usorter,
                n = usorter.evCoords(e);
            if (!e.target.getAttribute("nosorthandle") && !t.getAttribute("nodrag")) {
                usorter.current = s, usorter.nextEl = t.nextSibling, extend(s, {
                    drag: t
                }), setStyle(o, {
                    left: t.x + "px",
                    top: t.y + "px",
                    zIndex: 150
                }), addClass(t, s.clsUp);
                var a = getSize(o);
                return setStyle(t, {
                    width: a[0],
                    height: a[1]
                }), addEvent(document, "mousemove drag touchmove", usorter.mousemove), addEvent(document, "mouseup touchend touchcancel", usorter.mouseup), extend(s, {
                    startX: n[0],
                    startY: n[1] + (browser.msie6 ? pageNode.scrollTop : 0),
                    before: domNS(t),
                    newbef: domNS(t),
                    after: domPS(t)
                }), extend(usorter, {
                    lastX: n[0],
                    lastY: n[1],
                    lastS: scrollNode.scrollTop
                }), window.Privacy && Privacy.hide(-1), cur.cancelClick = !1, r || cancelEvent(e)
            }
        }
    },
    mousemove: function(e) {
        if (usorter.current) {
            var r = !0,
                t = "scroll" == e.type ? [usorter.lastX, usorter.lastY + scrollNode.scrollTop - usorter.lastS] : usorter.evCoords(e);
            if ("scroll" == e.type) r = !1;
            else if (usorter.lastX = t[0], usorter.lastY = t[1], usorter.lastS = scrollNode.scrollTop, !browser.safari_mobile && !browser.android, !1) {
                var o = t[1] - (browser.msie6 ? 0 : scrollNode.scrollTop);
                100 > o ? usorter.animcache[0] = o - 100 : o > lastWindowHeight - 100 ? usorter.animcache[0] = o + 100 - lastWindowHeight : usorter.animcache[0] && delete usorter.animcache[0], usorter.animcache[0] && !usorter.animtimer && (usorter.animtimer = setInterval(usorter.animstep, 13))
            }
            var s, n = usorter.current,
                a = n.drag,
                i = t[0] - n.startX,
                u = t[1] + (browser.msie6 ? pageNode.scrollTop : 0) - n.startY,
                d = a.x,
                l = d + i,
                c = a.y,
                m = c + u;
            (i > 10 || -10 > i || u > 10 || -10 > u) && (cur.cancelClick = !0), setStyle(usorter.first(a), {
                left: l,
                top: m
            }), browser.msie8 && (s = a.offsetLeft);
            for (var f, h, p = !1, b = !1, v = domPN(a).childNodes, w = v[0], g = w.x, y = l + a.w, x = m + a.h, N = 0, S = v.length; S > N; ++N) {
                var C = S > N + 1 ? v[N + 1] : {
                        id: !1,
                        x: g - 1
                    },
                    P = w.y + w.h;
                b === !1 && g + w.w >= y && (b = w, (p === !1 || Math.abs(f - x) > Math.abs(P - x)) && (p = w, f = P)), h = g, w = C, g = w.x, h > g && (b === !1 && (p === !1 || Math.abs(f - x) > Math.abs(P - x)) && (p = w, f = P), b = !1)
            }
            if (p.id === !1 && (p = null), p !== n.newbef) {
                if (n.newbef !== a && n.newbef !== n.before && (animate(domFC(n.newbef ? domPS(n.newbef) : v[S - 1]), {
                        left: 0
                    }, 200), animate(domFC(n.newbef), {
                        left: 0
                    }, 200)), n.newbef = p, n.newbef !== a && n.newbef !== n.before)
                    if (!n.newbef || n.newbef.x > a.x) animate(domFC(n.newbef ? domPS(n.newbef) : v[S - 1]), {
                        left: -5
                    }, 200);
                    else {
                        var T = domPS(n.newbef);
                        T && T.x > n.newbef.x && Math.abs(T.y + T.h - x) < Math.abs(n.newbef.y + n.newbef.h - x) ? animate(domFC(n.newbef ? domPS(n.newbef) : v[S - 1]), {
                            left: -5
                        }, 200) : animate(domFC(n.newbef), {
                            left: 5
                        }, 200)
                    }
                return r ? cancelEvent(e) : !0
            }
        }
    },
    mouseup: function(e) {
        if (usorter.current) {
            var r = usorter.current,
                t = r.drag,
                o = usorter.evCoords(e),
                s = domPN(t).childNodes,
                n = (o[0] || usorter.lastX) - r.startX,
                a = (o[1] || usorter.lastY) + (browser.msie6 ? pageNode.scrollTop : 0) - r.startY;
            if (setStyle(usorter.first(t), {
                    zIndex: 99
                }), usorter.current = r.drag = !1, r.newbef !== t && r.newbef !== r.before) {
                for (var i = 0, u = s.length; u > i; ++i) {
                    var d = s[i],
                        l = usorter.first(d);
                    d != t && 3 !== d.nodeType && (addClass(d, r.clsUp), setStyle(d, {
                        width: 2 * d.w,
                        height: 2 * d.h
                    }), setStyle(l, {
                        zIndex: 90,
                        left: d.x,
                        top: d.y
                    }))
                }
                r.newbef ? domPN(t).insertBefore(t, r.newbef) : s[s.length - 1].getAttribute("nodrag") ? domPN(t).insertBefore(t, s[s.length - 1]) : domPN(t).appendChild(t);
                for (var i = 0, u = s.length; u > i; ++i) {
                    var d = s[i],
                        l = usorter.first(d),
                        c = d.offsetLeft,
                        m = d.offsetTop;
                    d == t ? usorter.animate(l, d.x + n, d.y + a, c, m, usorter.animdone.bind(l, r), r) : usorter.animate(l, d.x, d.y, c, m, usorter.animdone.bind(l, r), r), d.x = c, d.y = m
                }
            } else usorter.animate(usorter.first(t), t.x + n, t.y + a, t.x, t.y, usorter.animdone.bind(usorter.first(t), r), r);
            usorter.stop(), usorter.animcache[0] && (delete usorter.animcache[0], isEmpty(usorter.animcache) && usorter.animstop());
            var f = domNS(t),
                h = domPS(t);
            return f === r.before && h === r.after || !r.onReorder || r.onReorder(t, f, h), delete r.before, delete r.newbef, delete r.after, cancelEvent(e)
        }
    },
    stop: function() {
        var e = usorter.current;
        removeEvent(document, "mousemove drag touchmove", usorter.mousemove), removeEvent(document, "mouseup touchend touchcancel", usorter.mouseup), e.drag = usorter.current = !1
    },
    added: function(e) {
        if (!browser.mobile || browser.safari_mobile || browser.android) {
            for (var r = e.usorter, t = r.count, o = domFC(e), s = 0, n = 0; o; o = domNS(o), ++n)
                if (o.getAttribute("nodrag")) s++;
                else {
                    var a = usorter.first(o),
                        i = o.offsetLeft,
                        u = o.offsetTop,
                        d = getSize(a);
                    extend(o, {
                        x: i,
                        y: u,
                        w: d[0] / 2,
                        h: d[1] / 2,
                        index: n
                    }), n >= t && (addEvent(o, "mousedown touchstart", usorter.mousedown), setStyle(o, {
                        cursor: "move"
                    }))
                }
            r.count += n - t - s
        }
    },
    init: function(e, r) {
        if (!browser.mobile || browser.safari_mobile || browser.android) {
            usorter.scrollNode = browser.msie6 ? pageNode : window, e = ge(e), (browser.msie7 || browser.msie6) && (e.style.position = "relative");
            var t = {
                parent: e,
                canDrag: r.canDrag,
                clsUp: r.clsUp,
                count: 0,
                stop: function() {
                    usorter.current == t && usorter.stop();
                    for (var e = t.parent.childNodes, r = 0, o = e.length; o > r; ++r) {
                        var s = e[r];
                        3 === s.nodeType || s.getAttribute("nodrag") || usorter.animcache[s.id] && delete usorter.animcache[s.id]
                    }
                },
                destroy: function() {
                    t.stop();
                    var e = t.parent,
                        r = e.childNodes;
                    removeAttr(e, "usorter");
                    for (var o = 0, s = r.length; s > o; ++o) {
                        var n = r[o];
                        removeEvent(n, "mousedown touchstart", usorter.mousedown)
                    }
                },
                onReorder: r.onReorder
            };
            return e.usorter = t, usorter.added(e), t
        }
    }
};
try {
    stManager.done("usorter.js")
} catch (e) {}