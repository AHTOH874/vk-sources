/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 1976440538
    Link: https://vk.com/js/al/sorter.js?1976440538
    Last Update: 10.2.117
*/
var sorter = {
    sqr: function(e) {
        return e * e
    },
    evCoords: function(e, r) {
        return browser.android ? [e.touches[0].pageX + (e.pageX || 0), e.touches[0].pageY + (e.pageY || 0) + (r.scrollNode && r.scrollNode.scrollTop || 0)] : [e.pageX, e.pageY + (r.scrollNode && r.scrollNode.scrollTop || 0)]
    },
    animstop: function() {
        clearInterval(sorter.animtimer), sorter.animtimer = !1
    },
    animcache: {},
    animstep: function() {
        var e = [],
            r = !0;
        for (var t in sorter.animcache)
            if (0 != t) {
                var o = sorter.animcache[t],
                    s = o.el,
                    n = Fx.Transitions.easeOutQuint,
                    l = 200,
                    a = vkNow();
                o.t += a - o.prev, o.prev = a, o.t < l ? (r = !1, s.style.left = n(o.t, o.sx, o.dx, l) + "px", s.style.top = n(o.t, o.sy, o.dy, l) + "px") : (s.style.left = o.sx + o.dx + "px", s.style.top = o.sy + o.dy + "px", clearInterval(o.timer), e.push(s.id), o.h && o.h())
            } else r = !1, scrollNode.scrollTop += Math.ceil(sorter.animcache[t] / 5);
        for (var t in e) delete sorter.animcache[e[t]];
        r && sorter.animstop()
    },
    animate: function(e, r, t, o) {
        if (browser.msie8) return setStyle(e, {
            left: r,
            top: t
        }), void(o && o());
        var s = intval(getStyle(e, "left")),
            n = intval(getStyle(e, "top")),
            l = {
                t: 0,
                sx: s,
                sy: n,
                dx: r - s,
                dy: t - n,
                h: o,
                prev: vkNow()
            };
        return sorter.animcache[e.id] ? void extend(sorter.animcache[e.id], l) : (sorter.animcache[e.id] = extend(l, {
            el: e
        }), void(sorter.animtimer || (sorter.animtimer = setInterval(sorter.animstep, 13))))
    },
    mousedown: function(e) {
        var r = e && e.touches && 1 == e.touches.length;
        if (e && (2 == e.button || 3 == e.which || e.ctrlKey || e.metaKey) && !r) return !0;
        if (!sorter.current) {
            var t = this,
                o = t.parentNode.sorter,
                s = sorter.evCoords(e, o);
            if (!("A" == e.target.tagName || "INPUT" == e.target.tagName || "TEXTAREA" == e.target.tagName || e.target.getAttribute("nosorthandle") || e.target.parentNode && "A" == e.target.parentNode.tagName)) return sorter.current = o, o.drag = t, addEvent(document, "mousemove drag touchmove", sorter.mousemove), addEvent(document, "mouseup touchend touchcancel", sorter.mouseup), browser.opera || browser.msie || browser.mozilla || browser.safari_mobile || browser.android || o.noscroll || (addEvent(sorter.scrollNode, "scroll", sorter.mousemove), o.scrollNode && o.scrollNode.scrollHeight > o.scrollNode.offsetHeight && addEvent(o.scrollNode, "scroll", sorter.mousemove)), extend(o, {
                startX: s[0],
                startY: s[1] + (browser.msie6 ? pageNode.scrollTop + (o.scrollNode && o.scrollNode.scrollTop || 0) : 0),
                before: t.nextSibling ? t.nextSibling.nextSibling : !1,
                after: t.helper.previousSibling,
                startIndex: t.index
            }), extend(sorter, {
                lastX: s[0],
                lastY: s[1],
                lastS: scrollNode.scrollTop + (o.scrollNode && o.scrollNode.scrollTop || 0)
            }), setStyle(t, {
                zIndex: 13
            }), addClass(t, "sort_taken"), window.Privacy && Privacy.hide(-1), o.onMouseDown && o.onMouseDown(t), cur.cancelClick = !1, r || cancelEvent(e)
        }
    },
    mousemove: function(e) {
        if (sorter.current) {
            var r = sorter.current,
                t = !0,
                o = "scroll" == e.type ? [sorter.lastX, sorter.lastY + scrollNode.scrollTop + (r.scrollNode && r.scrollNode.scrollTop || 0) - sorter.lastS] : sorter.evCoords(e, r);
            if ("scroll" == e.type) t = !1;
            else {
                sorter.lastX = o[0], sorter.lastY = o[1], sorter.lastS = scrollNode.scrollTop + (r.scrollNode && r.scrollNode.scrollTop || 0);
                var s = o[1] - (browser.msie6 ? 0 : scrollNode.scrollTop + (r.scrollNode && r.scrollNode.scrollTop || 0));
                browser.safari_mobile || browser.android || r.noscroll || (100 > s ? sorter.animcache[0] = s - 100 : s > lastWindowHeight - 100 ? sorter.animcache[0] = s + 100 - lastWindowHeight : sorter.animcache[0] && delete sorter.animcache[0], sorter.animcache[0] && !sorter.animtimer && (sorter.animtimer = setInterval(sorter.animstep, 13)))
            }
            var n = r.drag,
                l = o[0] - r.startX,
                a = o[1] + (browser.msie6 ? pageNode.scrollTop : 0) - r.startY,
                i = n.helper.offsetLeft,
                d = n.helper.offsetTop,
                c = i + l,
                p = d + a;
            if ((l > 10 || -10 > l || a > 10 || -10 > a) && (cur.cancelClick = !0), r._dragtargets)
                for (var f in r._dragtargets.nodes) {
                    var m = r._dragtargets.nodes[f],
                        u = getXY(m),
                        h = getSize(m),
                        v = {
                            x: o[0] - u[0],
                            y: o[1] - u[1]
                        };
                    v.x > 0 && v.x < h[0] && v.y > 0 && v.y < h[1] ? m._dragover || (r._dragtargets.onDragOver && r._dragtargets.onDragOver(n, m), m._dragover = !0, r._dragtarget = m) : m._dragover && (r._dragtargets.onDragOut && r._dragtargets.onDragOut(n, m), m._dragover = !1, r._dragtarget = null)
                }
            if (setStyle(n, {
                    left: c,
                    top: p
                }), browser.msie8) {
                n.offsetLeft
            }
            if (c + n.w / 2 > i && p + n.h / 2 > d && c - n.w / 2 < i && p - n.h / 2 < d) return t ? cancelEvent(e) : !0;
            for (var f = 0, g = 0, x = 1e9; f < r.elems.length; ++f) {
                var w = r.elems[f],
                    b = sorter.sqr(w.x - c) + sorter.sqr(w.y - p);
                x > b && (g = f, x = b)
            }
            if (g == n.index) return t ? cancelEvent(e) : !0;
            var y;
            g < n.index ? (r.parent.insertBefore(n, r.elems[g].helper), y = -1) : g > n.index && (r.elems[g].nextSibling ? r.parent.insertBefore(n, r.elems[g].nextSibling) : r.parent.appendChild(n), y = 1), r.parent.insertBefore(n.helper, n), (g == r.elems.length - 1 ? addClass : removeClass)(n.helper, "sort_helper_last");
            for (var f = n.index; f != g; f += y) {
                var w = r.elems[f] = r.elems[f + y],
                    i = w.helper.offsetLeft,
                    d = w.helper.offsetTop;
                extend(w, {
                    index: w.index - y,
                    x: i + w.w / 2,
                    y: d + w.h / 2
                }), sorter.animate(w, i, d)
            }
            return r.elems[g] = n, extend(n, {
                index: g,
                x: n.helper.offsetLeft + n.w / 2,
                y: n.helper.offsetTop + n.h / 2
            }), r.startX = o[0] - c + n.helper.offsetLeft, r.startY = o[1] + (browser.msie6 ? pageNode.scrollTop : 0) - p + n.helper.offsetTop, t ? cancelEvent(e) : !0
        }
    },
    mouseup: function(e) {
        if (sorter.current) {
            var r = sorter.current,
                t = r.drag;
            if (setStyle(t, {
                    zIndex: 12
                }), sorter.animate(t, t.previousSibling.offsetLeft, t.previousSibling.offsetTop, function() {
                    setStyle(t, {
                        zIndex: ""
                    }), removeClass(t, "sort_taken")
                }), sorter.stop(), sorter.animcache[0] && (delete sorter.animcache[0], isEmpty(sorter.animcache) && sorter.animstop()), r.onMouseUp) {
                var o = r._dragtarget;
                if (o && (r._dragtargets.onDragOut && r._dragtargets.onDragOut(t, o), sorter.restore(r, t)), r.onMouseUp(t, o), delete r._dragtarget, o) return cancelEvent(e)
            }
            var s = t.nextSibling ? t.nextSibling.nextSibling : !1,
                n = t.helper.previousSibling;
            return s == r.before && n == r.after || !r.onReorder || r.onReorder(t, s, n), delete r.startIndex, delete r.before, delete r.after, cancelEvent(e)
        }
    },
    stop: function() {
        var e = sorter.current;
        removeEvent(document, "mousemove drag touchmove", sorter.mousemove), removeEvent(document, "mouseup touchend touchcancel", sorter.mouseup), e.drag = sorter.current = !1
    },
    restore: function(e, r) {
        var t, o = e.startIndex;
        o < r.index ? (e.parent.insertBefore(r, e.elems[o].helper), t = -1) : o > r.index && (e.elems[o].nextSibling ? e.parent.insertBefore(r, e.elems[o].nextSibling) : e.parent.appendChild(r), t = 1), e.parent.insertBefore(r.helper, r);
        for (var s = r.index; s != o; s += t) {
            var n = e.elems[s] = e.elems[s + t],
                l = n.helper.offsetLeft,
                a = n.helper.offsetTop;
            extend(n, {
                index: n.index - t,
                x: l + n.w / 2,
                y: a + n.h / 2
            }), sorter.animate(n, l, a)
        }
        e.elems[o] = r, extend(r, {
            index: o,
            x: r.helper.offsetLeft + r.w / 2,
            y: r.helper.offsetTop + r.h / 2
        }), sorter.animate(r, r.helper.offsetLeft, r.helper.offsetTop), delete e.startIndex, delete e.before, delete e.after
    },
    shift: function(e) {
        var r, t = e.sorter,
            o = t.elems[t.elems.length - 1],
            s = 0;
        t.parent.insertBefore(o, t.elems[s].helper), r = -1, t.parent.insertBefore(o.helper, o);
        for (var n = o.index; n != s; n += r) {
            var l = t.elems[n] = t.elems[n + r],
                a = l.helper.offsetLeft,
                i = l.helper.offsetTop;
            extend(l, {
                index: l.index - r,
                x: a + l.w / 2,
                y: i + l.h / 2
            }), l.style.left = a + "px", l.style.top = i + "px"
        }
        var a = o.helper.offsetLeft,
            i = o.helper.offsetTop;
        t.elems[s] = o, extend(o, {
            index: s,
            x: a + o.w / 2,
            y: i + o.h / 2
        }), o.style.left = a + "px", o.style.top = i + "px"
    },
    added: function(e) {
        for (var r = e.sorter, t = r.elems.length, o = t ? e.sorter.elems[t - 1].nextSibling : e.firstChild, s = t; o && !o.getAttribute("stopsort"); o = o.nextSibling, ++s)
            if (!o.getAttribute("skipsort")) {
                r.elems.push(o);
                var n = o.offsetLeft,
                    l = o.offsetTop,
                    a = getSize(o),
                    i = {
                        width: a[0],
                        height: a[1] - r.dh
                    };
                extend(o, {
                    helper: ce("div", {
                        className: "sort_helper"
                    }, i),
                    x: n + a[0] / 2,
                    w: a[0],
                    y: l + a[1] / 2,
                    h: a[1],
                    index: s
                });
                var d = {
                    left: n,
                    top: l,
                    width: getStyle(o, "width"),
                    position: "absolute"
                };
                r.noMoveCursor || (d.cursor = "move"), setStyle(o, d), e.insertBefore(o.helper, o), addEvent(o, "mousedown touchstart", sorter.mousedown)
            }
    },
    update: function(e) {
        if (e) {
            var r = e.parentNode,
                t = r.sorter,
                o = !1;
            for (var s in t.elems) {
                var n = t.elems[s];
                if (n == e && (o = !0), o) {
                    var l = n.helper.offsetLeft,
                        a = n.helper.offsetTop,
                        i = getSize(n);
                    setStyle(n.helper, {
                        height: i[1] - t.dh
                    }), extend(n, {
                        x: l + i[0] / 2,
                        w: i[0],
                        y: a + i[1] / 2,
                        h: i[1]
                    });
                    var d = {
                        left: l,
                        top: a,
                        position: "absolute"
                    };
                    t.noMoveCursor || (d.cursor = "move"), setStyle(n, d)
                }
            }
        }
    },
    init: function(e, r) {
        if (!browser.mobile || browser.safari_mobile || browser.android) {
            sorter.scrollNode = browser.msie6 ? pageNode : window, e = ge(e);
            var t = {
                parent: e,
                dh: r.dh || 0,
                scrollNode: r.scrollNode,
                noMoveCursor: r.noMoveCursor || 0,
                elems: [],
                stop: function() {
                    sorter.current == t && sorter.stop();
                    for (var e in t.elems) {
                        var r = t.elems[e];
                        sorter.animcache[r.id] && delete sorter.animcache[r.id]
                    }
                },
                destroy: function() {
                    t.stop();
                    var e = t.parent;
                    removeAttr(e, "sorter");
                    for (var r in t.elems) {
                        var o = t.elems[r];
                        e.removeChild(o.helper), removeEvent(o, "mousedown touchstart", sorter.mousedown), setStyle(o, {
                            position: "",
                            margin: ""
                        }), removeAttr(o, "helper")
                    }
                    sorter.animstop()
                },
                onReorder: r.onReorder,
                noscroll: r.noscroll
            };
            r.onMouseDown && (t.onMouseDown = r.onMouseDown), r.onMouseUp && (t.onMouseUp = r.onMouseUp);
            var o = {
                nodes: []
            };
            if (r && r.target) {
                var s = r.target.childNodes;
                each(s, function(e, r) {
                    1 == r.nodeType && o.nodes.push(r)
                }), o.onDragOver = r.onDragOver, o.onDragOut = r.onDragOut, o.nodes.length > 0 && (t._dragtargets = o)
            }
            return e.sorter = t, sorter.added(e), t
        }
    }
};
try {
    stManager.done("sorter.js")
} catch (e) {}