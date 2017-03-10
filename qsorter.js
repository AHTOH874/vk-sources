/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 4013122173
    Link: https://vk.com/js/al/qsorter.js?4013122173
    Last Update: 10.2.117
*/
var qsorter = {
    sqr: function(e) {
        return e * e
    },
    evCoords: function(e) {
        return browser.android ? [e.touches[0].pageX + (e.pageX || 0), e.touches[0].pageY + (e.pageY || 0)] : [e.pageX, e.pageY]
    },
    animstop: function() {
        clearInterval(qsorter.animtimer), qsorter.animtimer = !1
    },
    animcache: {},
    animstep: function() {
        var e, r = [],
            t = !0;
        for (var o in qsorter.animcache)
            if (0 != o) {
                var s = qsorter.animcache[o],
                    a = s.el,
                    n = Fx.Transitions.easeOutQuint,
                    i = 200,
                    l = vkNow();
                s.t += l - s.prev, s.prev = l, s.t < i ? (t = !1, a.style.left = n(s.t, s.sx, s.dx, i) + "px", a.style.top = n(s.t, s.sy, s.dy, i) + "px", browser.msie8 && (e = a.offsetLeft)) : (a.style.left = s.sx + s.dx + "px", a.style.top = s.sy + s.dy + "px", browser.msie8 && (e = a.offsetLeft), clearInterval(s.timer), r.push(a.parentNode.id), s.h && s.h.apply(a))
            } else t = !1, scrollNode.scrollTop += Math.ceil(qsorter.animcache[o] / 5);
        for (var o in r) delete qsorter.animcache[r[o]];
        t && qsorter.animstop()
    },
    animdone: function(e) {
        e.cls ? domPN(this).className = e.cls : removeClass(domPN(this), e.clsUp), this.style.left = this.style.top = this.style.zIndex = "", cur.qsorterSetSize && setStyle(this.parentNode, {
            width: "",
            height: ""
        })
    },
    animate: function(e, r, t, o, s, a, n) {
        if (browser.msie8) return n.cls ? domPN(e).className = n.cls : removeClass(domPN(e), n.clsUp), e.style.left = e.style.top = "", void(cur.qsorterSetSize && setStyle(e.parentNode, {
            width: "",
            height: ""
        }));
        var i = {
            t: 0,
            sx: r,
            sy: t,
            dx: o - r,
            dy: s - t,
            h: a,
            prev: vkNow()
        };
        return qsorter.animcache[e.parentNode.id] ? void extend(qsorter.animcache[e.parentNode.id], i) : (qsorter.animcache[e.parentNode.id] = extend(i, {
            el: e
        }), void(qsorter.animtimer || (qsorter.animtimer = setInterval(qsorter.animstep, 13))))
    },
    first: function(e) {
        for (el = e.firstChild; el && 3 == el.nodeType;) el = el.nextSibling;
        return el
    },
    mousedown: function(e) {
        var r = e && e.touches && 1 == e.touches.length;
        if (e && (2 == e.button || 3 == e.which || e.ctrlKey || e.metaKey) && !r) return !0;
        if (!qsorter.current) {
            cur.qsorterOver = !1;
            var t, o = this,
                s = qsorter.first(o),
                a = o.parentNode.qsorter,
                n = qsorter.evCoords(e);
            if (a.canDrag) {
                if (!a.canDrag(o)) return
            } else if (e.target.getAttribute("nosorthandle") || o.getAttribute("nodrag")) return;
            return qsorter.current = a, qsorter.nextEl = o.nextSibling, extend(a, {
                drag: o
            }), setStyle(s, {
                left: o.x + "px",
                top: o.y + a.offset + "px",
                zIndex: 12
            }), cur.qsorterSetSize && (t = getSize(s)), a.cls ? o.className = a.clsUp : addClass(o, a.clsUp), cur.qsorterSetSize && setStyle(o, {
                width: t[0],
                height: t[1]
            }), addEvent(document, "mousemove drag touchmove", qsorter.mousemove), addEvent(document, "mouseup touchend touchcancel", qsorter.mouseup), browser.opera || browser.msie || browser.mozilla || browser.safari_mobile || browser.android || a.noscroll || addEvent(qsorter.scrollNode, "scroll", qsorter.mousemove), extend(a, {
                startX: n[0],
                startY: n[1] + (browser.msie6 ? pageNode.scrollTop : 0),
                before: o.nextSibling,
                after: o.previousSibling
            }), extend(qsorter, {
                lastX: n[0],
                lastY: n[1],
                lastS: scrollNode.scrollTop
            }), window.Privacy && Privacy.hide(-1), o.tthide && o.tthide(), cur.cancelClick = !1, r || cancelEvent(e)
        }
    },
    checkOver: function(e, r) {
        for (var t in e.dragEls) {
            var o = e.dragEls[t];
            o.xy && 0 != o.xy[0] || (o.xy = getXY(o), o.sz = getSize(o)), r[0] > o.xy[0] && r[1] > o.xy[1] && r[0] < o.xy[0] + o.sz[0] && r[1] < o.xy[1] + o.sz[1] ? cur.qsorterOver != o && (cur.qsorterOver && e.onDragOut(cur.qsorterOver), cur.qsorterOver = o, e.onDragOver(o)) : cur.qsorterOver && cur.qsorterOver == o && (cur.qsorterOver = !1, e.onDragOut(o))
        }
    },
    mousemove: function(e) {
        if (qsorter.current) {
            var r = !0,
                t = "scroll" == e.type ? [qsorter.lastX, qsorter.lastY + scrollNode.scrollTop - qsorter.lastS] : qsorter.evCoords(e),
                o = qsorter.current;
            if ("scroll" == e.type) r = !1;
            else if (qsorter.lastX = t[0], qsorter.lastY = t[1], qsorter.lastS = scrollNode.scrollTop, !browser.safari_mobile && !browser.android && !o.noscroll) {
                var s = t[1] - (browser.msie6 ? 0 : scrollNode.scrollTop);
                100 > s ? qsorter.animcache[0] = s - 100 : s > lastWindowHeight - 100 ? qsorter.animcache[0] = s + 100 - lastWindowHeight : qsorter.animcache[0] && delete qsorter.animcache[0], qsorter.animcache[0] && !qsorter.animtimer && (qsorter.animtimer = setInterval(qsorter.animstep, 13))
            }
            var a = o.drag,
                n = t[0] - o.startX,
                i = t[1] + (browser.msie6 ? pageNode.scrollTop : 0) - o.startY,
                l = getSize(scrollNode),
                c = getXY(a),
                d = l[0],
                u = Math.max(window.lastWindowHeight || 0, l[1]);
            c[0] < d - o.width && c[0] + n > d - o.width && (n = d - c[0] - o.width), c[1] < u - o.height && c[1] + i > u - o.height && (i = u - c[1] - o.height);
            var m, f = a.x,
                g = f + n,
                v = a.y,
                q = v + i,
                p = o.width,
                h = o.height,
                y = a.i,
                b = o.xsize,
                x = y % b,
                w = Math.floor((y + .1) / b);
            if ((n > 10 || -10 > n || i > 10 || -10 > i) && (addClass(a, "qs_drag_started"), cur.cancelClick = !0), o.noMoveCursorFirst && !a.cursor_changed && (a.cursor_changed = !0, a.old_cursor = a.style.cursor, a.style.cursor = "move"), setStyle(qsorter.first(a), {
                    left: g,
                    top: q + o.offset
                }), browser.msie8 && (m = a.offsetLeft), o.dragCont && o.dragCont.visible) {
                if (t[0] > o.dragCont.x1 && t[1] > o.dragCont.y1 && t[0] < o.dragCont.x2 && t[1] < o.dragCont.y2) return cur.sorterDragIn || (cur.sorterDragIn = 1, animate(a, {
                    opacity: .2
                }, 400)), void qsorter.checkOver(o, t);
                cur.sorterDragIn && (cur.sorterDragIn = 0, animate(a, {
                    opacity: 1
                }, 400)), cur.qsorterOver && qsorter.checkOver(o, t)
            }
            var C = Math.floor(x + .5 + n / p),
                S = Math.floor(w + .5 + i / h),
                D = Math.floor(o.noDragCount / b),
                N = o.noDragCount - D * b;
            C = Math.min(Math.max(C, 0), b - 1), S = Math.max(S, 0), D > S && (S = D), S == Math.ceil(o.noDragCount / b) - 1 && N > C && (C = N);
            var z = S * b + C;
            if (z > o.count - 1) {
                var O = z - (o.count - 1);
                S -= Math.floor((O + .1) / b), C -= O % b, 0 > C && (C += b, --S), z = o.count - 1
            }
            if (z == y) return r ? cancelEvent(e) : !0;
            for (var E = x, M = w, _ = !1, I = y > z ? -1 : 1, X = y; X != z; X += I) {
                var Y = x + I,
                    T = w;
                Y == b ? (Y = 0, ++T) : 0 > Y && (Y = b - 1, --T), _ = o.elems[Y][T];
                var U = _.x,
                    L = _.y,
                    f = U + (x - Y) * p,
                    v = L + (w - T) * h;
                if (setStyle(qsorter.first(_), {
                        left: U,
                        top: L + o.offset
                    }), o.cls ? _.className = o.clsUp + " qs_moving_obj" : (addClass(_, o.clsUp), addClass(_, "qs_moving_obj2")), cur.qsorterSetSize) {
                    var k = getSize(qsorter.first(_));
                    setStyle(_, {
                        width: k[0],
                        height: k[1]
                    })
                }
                extend(_, {
                    i: X,
                    x: f,
                    y: v
                }), o.elems[x][w] = _, qsorter.animate(qsorter.first(_), U, L + o.offset, f, v + o.offset, qsorter.animdone.bind(qsorter.first(_), o), o), x = Y, w = T
            }
            return 0 > I ? o.parent.insertBefore(a, _) : _.nextSibling ? o.parent.insertBefore(a, _.nextSibling) : o.parent.appendChild(a), n = (x - E) * p, i = (w - M) * h, o.elems[C][S] = a, extend(a, {
                i: z,
                x: a.x + n,
                y: a.y + i
            }), o.startX += n, o.startY += i, browser.msie8 && (m = a.offsetLeft), r ? cancelEvent(e) : !0
        }
    },
    mouseup: function(e) {
        if (qsorter.current) {
            var r = qsorter.current,
                t = r.drag,
                o = qsorter.evCoords(e),
                s = (o[0] || qsorter.lastX) - r.startX,
                a = (o[1] || qsorter.lastY) + (browser.msie6 ? pageNode.scrollTop : 0) - r.startY + r.offset;
            if (setStyle(qsorter.first(t), {
                    zIndex: 11
                }), r.noMoveCursorFirst && (t.style.cursor = t.old_cursor, delete t.old_cursor, delete t.cursor_changed), qsorter.current = r.drag = !1, cur.qsorterOver && r.onDrop(cur.qsorterOver, t)) {
                var n = qsorter.first(t);
                return setStyle(n, {
                    top: 0,
                    left: 0
                }), qsorter.nextEl ? t.parentNode.insertBefore(t, qsorter.nextEl) : t.parentNode.appendChild(t), qsorter.animdone.bind(n)(r), qsorter.stop(), qsorter.animcache[0] && (delete qsorter.animcache[0], isEmpty(qsorter.animcache) && qsorter.animstop()), cur.sorterDragIn && (cur.sorterDragIn = 0, setStyle(t, {
                    opacity: 1
                })), cancelEvent(e)
            }
            qsorter.animate(qsorter.first(t), t.x + s, t.y + a, t.x, t.y + r.offset, qsorter.animdone.bind(qsorter.first(t), r), r), qsorter.stop(), qsorter.animcache[0] && (delete qsorter.animcache[0], isEmpty(qsorter.animcache) && qsorter.animstop()), cur.sorterDragIn && (cur.sorterDragIn = 0, animate(t, {
                opacity: 1
            }, 100));
            var i = t.nextSibling,
                l = t.previousSibling;
            return i == r.before && l == r.after || !r.onReorder || r.onReorder(t, i, l), delete r.before, delete r.after, cancelEvent(e)
        }
    },
    stop: function() {
        var e = qsorter.current;
        removeEvent(document, "mousemove drag touchmove", qsorter.mousemove), removeEvent(document, "mouseup touchend touchcancel", qsorter.mouseup), e.drag = qsorter.current = !1
    },
    update: function(e, r) {
        if (!browser.mobile || browser.safari_mobile || browser.android) {
            var t = e.qsorter;
            extend(t, r), t.count = 0, t.elems = [], t.noDragCount = 0, t.dragCont && t.updateDragCont(), this.added(e)
        }
    },
    added: function(e) {
        if (!browser.mobile || browser.safari_mobile || browser.android) {
            var r = e.qsorter,
                t = r.count,
                o = r.xsize,
                s = t % o,
                a = t ? r.elems[(t - 1) % o][Math.floor((t - .9) / o)].nextSibling : qsorter.first(e);
            r.noDragCount = r.noDragCount || 0;
            for (var n = t, i = 0; a; a = a.nextSibling, ++n)
                if (3 != a.nodeType && !a.getAttribute("nodragend")) {
                    i++;
                    var l = a.getAttribute("nodrag");
                    l && r.noDragCount++, r.elems[s] || (r.elems[s] = []), r.elems[s].push(a);
                    var c = qsorter.first(a),
                        d = c.offsetLeft,
                        u = c.offsetTop;
                    (browser.msie7 || browser.msie6) && (d += a.offsetLeft, u += a.offsetTop), extend(a, {
                        x: d,
                        y: u,
                        i: n
                    }), addEvent(a, "mousedown touchstart", qsorter.mousedown), browser.opera && !cur.qsorterNoOperaStyle && (a.style.display = "block", a.style.cssFloat = "left"), l || r.noMoveCursor || r.noMoveCursorFirst || (a.style.cursor = "move"), ++s, s >= o && (s -= o)
                }
            r.count += i
        }
    },
    remove: function(e, r) {
        var t = e.qsorter;
        t.count, t.xsize;
        if (debugLog("x", r.x, r.y), t.elems.length) {
            var o = t.elems[0].length,
                s = !1;
            for (debugLog("startRow", o); o;) {
                o -= 1;
                for (var a = t.xsize; a;) {
                    a -= 1;
                    var n = (t.elems[a] || [])[o];
                    if (debugLog("col: ", a, " row: ", o, " el: ", n), n) {
                        if (s ? (t.elems[a][o] = extend(s, {
                                x: n.x,
                                y: n.y,
                                i: n.i
                            }), debugLog("G", a, o, n.i)) : t.elems[a].pop(), n == r) {
                            o = 0;
                            break
                        }
                        s = n
                    }
                }
            }
            return re(r), t.count -= 1, s
        }
    },
    init: function(e, r) {
        if (!browser.mobile || browser.safari_mobile || browser.android) {
            qsorter.scrollNode = browser.msie6 ? pageNode : window, e = ge(e), (browser.msie7 || browser.msie6) && (e.style.position = "relative");
            var t = {
                parent: e,
                xsize: r.xsize,
                width: r.width,
                height: r.height,
                canDrag: r.canDrag,
                cls: r.clsUp ? !1 : cur.qsorterRowClass || "photo_row",
                clsUp: r.clsUp ? r.clsUp : cur.qsorterRowUpClass || "photo_row photo_row_up",
                count: 0,
                offset: 0,
                elems: new Array(r.xsize),
                stop: function() {
                    qsorter.current == t && qsorter.stop();
                    for (var e in t.elems)
                        for (var r = t.elems[e], o = 0, s = (r || {}).length || 0; s > o; ++o) {
                            var a = r[o];
                            qsorter.animcache[a.id] && delete qsorter.animcache[a.id]
                        }
                },
                destroy: function() {
                    t.stop();
                    var e = t.parent;
                    removeAttr(e, "qsorter");
                    for (var r = 0, o = t.elems.length; o > r; ++r)
                        for (var s = t.elems[r], a = 0, n = (s || {}).length || 0; n > a; ++a) {
                            var i = s[a];
                            removeEvent(i, "mousedown touchstart", qsorter.mousedown)
                        }
                },
                updateDragCont: function() {
                    var e = getXY(r.dragCont),
                        t = getSize(r.dragCont);
                    this.dragCont = {
                        visible: isVisible(r.dragCont),
                        el: r.dragCont,
                        x1: e[0],
                        y1: e[1],
                        x2: e[0] + t[0],
                        y2: e[1] + t[1]
                    }
                },
                onReorder: r.onReorder,
                noscroll: r.noscroll,
                dragEls: r.dragEls,
                onDragOver: r.onDragOver,
                onDragOut: r.onDragOut,
                onDrop: r.onDrop,
                noMoveCursor: r.noMoveCursor,
                noMoveCursorFirst: r.noMoveCursorFirst
            };
            return r.dragCont && t.updateDragCont(), e.qsorter = t, qsorter.added(e), t
        }
    }
};
try {
    stManager.done("qsorter.js")
} catch (e) {}