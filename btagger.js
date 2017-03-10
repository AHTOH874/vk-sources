/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 333150
    Link: https://vk.com/js/al/btagger.js?333150
    Last Update: 10.2.117
*/
function BTagger(e, t) {
    e = ge(e);
    var r = function() {};
    t = extend({
        padding: 50,
        size: getSize(e),
        s: {},
        onMove: r,
        onStart: r,
        onMoveStart: r
    }, t), t.s = extend({
        t: t.padding,
        l: t.padding,
        w: t.size[0] - 2 * t.padding,
        h: t.size[1] - 2 * t.padding
    }, t.s), t.s.b || (t.s.b = t.size[1] - t.s.t - t.s.h), t.s.r || (t.s.r = t.size[0] - t.s.l - t.s.w), BTagger._inst[BTagger._i] = this;
    var s = "",
        i = ["tl", "tm", "tr", "ml", "mr", "bl", "bm", "br"];
    for (var n in i) s += '<div onmousedown="return BTagger._inst[' + BTagger._i + "].move(this, '" + i[n] + '\', event)" class="btagger_pin btagger_' + i[n] + '"></div>';
    this.border = ce("div", {
        className: "btagger_border"
    }, {
        width: t.s.w,
        height: t.s.h,
        borderWidth: t.s.t + "px " + t.s.r + "px " + t.s.b + "px " + t.s.l + "px"
    }), this.corners = ce("div", {
        className: "btagger_corners",
        innerHTML: s
    }, {
        width: t.s.w,
        height: t.s.h,
        margin: t.s.t + "px " + t.s.r + "px 0px " + t.s.l + "px"
    }), this.opts = t, e.parentNode.insertBefore(this.border, e), e.parentNode.insertBefore(this.corners, e), addEvent(this.corners, "mousedown", function(e) {
        this.move(this.corners, "mm", e)
    }.bind(this)), t.onStart(t.s)
}
extend(BTagger, {
    _inst: {},
    _i: 0,
    prototype: {
        move: function(e, t, r) {
            var s = getStyle(e, "cursor"),
                i = bodyNode.appendChild(ce("div", {
                    className: "btagger_bg fixed"
                }, {
                    cursor: s,
                    width: Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth)),
                    height: Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight))
                }));
            addClass(this.corners, "btagger_active");
            var n = [r.pageX, r.pageY],
                a = this.opts.s;
            this.opts.onMoveStart(a);
            var o, h, d = clone(a),
                g = t.substr(1),
                m = t.substr(0, 1);
            return h = function(e) {
                removeClass(this.corners, "btagger_active"), removeEvent(i, "mousemove", o), removeEvent(i, "mouseup", h), re(i), extend(this.opts.s, d), this.opts.onMove(d)
            }.bind(this), o = function(e) {
                var t = [e.pageX - n[0], e.pageY - n[1]],
                    r = "l" == g ? t[0] : -t[0],
                    s = "t" == m ? t[1] : -t[1],
                    i = a.h - s,
                    o = a.w - r;
                if (80 > i || 80 > o) {
                    var p = m,
                        c = g;
                    "m" != m && (80 > i ? (e.pageY += "t" == m ? i : -i, p = "t" == m ? "b" : "t") : 160 > i ? (e.pageY += "t" == m ? i - 160 : -(i - 160), debugLog("case here")) : s + a[m] < 0 && (e.pageY += "b" == m ? s + a[m] : -(s + a[m]))), "m" != g && (80 > o ? (e.pageX += "l" == g ? o : -o, c = "l" == g ? "r" : "l") : 160 > o ? (debugLog(o, r, a.w), e.pageX += "l" == g ? o - 160 : -(o - 160)) : r + a[g] < 0 && (e.pageX += "r" == g ? r + a[g] : -(r + a[g]))), setTimeout(function() {
                        var t = geByClass1("btagger_" + p + c, ge("pv_filter_under"));
                        return h(), this.move(t, p + c, e)
                    }.bind(this), 0)
                }
                "m" != m && (s -= Math.min(s + a[m], 0), s -= Math.max(160 - a.h + s, 0)), "m" != g && (r -= Math.min(r + a[g], 0), r -= Math.max(160 - a.w + r, 0)), "m" == g && "m" == m ? (s += Math.min(-s + a.t, 0), s -= Math.min(s + a.b, 0), r += Math.min(-r + a.l, 0), r -= Math.min(r + a.r, 0), d.t = a.t - s, d.b = a.b + s, d.l = a.l - r, d.r = a.r + r, d.w = a.w, d.h = a.h) : "m" == g ? (d[m] = a[m] + s, d.h = a.h - s, d.w = a.w) : "m" == m ? (d[g] = a[g] + r, d.w = a.w - r, d.h = a.h) : (d[g] = a[g] + r, d[m] = a[m] + s, d.w = a.w - r, d.h = a.h - s);
                var v = d.t + "px " + d.r + "px " + d.b + "px " + d.l + "px";
                return setStyle(this.border, {
                    width: d.w,
                    height: d.h,
                    borderWidth: v
                }), setStyle(this.corners, {
                    width: d.w,
                    height: d.h,
                    margin: d.t + "px " + d.r + "px 0px " + d.l + "px"
                }), cancelEvent(e)
            }.bind(this), addEvent(i, "mousemove", o), addEvent(i, "mouseup", h), cancelEvent(r)
        },
        hide: function() {
            re(this.corners), re(this.border)
        },
        getOpts: function() {
            return this.opts.s
        }
    }
});
try {
    stManager.done("btagger.js")
} catch (e) {}