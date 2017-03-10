/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 703789694
    Link: https://vk.com/js/al/grid_sorter.js?703789694
    Last Update: 10.2.117
*/
function GridSorter(t, e, i) {
    if (isObject(e) ? i = e : this._dragElClass = e, this.options = extend({
            dragThreshold: GridSorter.DRAG_THRESHOLD_DIST
        }, i), this._contEl = ge(t), this._contEl) {
        this._excludedCount = 0;
        for (var o = 0; o < this._contEl.children.length; o++) this._contEl.children[o].getAttribute("nodrag") && this._excludedCount++;
        addEvent(this._contEl, "mousedown", this._ev_mousedown_handler = this._onMouseDown.bind(this)), setStyle(this._contEl, "position", "relative"), this._inited = !0
    }
}
GridSorter.AUTO_SCROLL_DY = 10, GridSorter.DRAG_THRESHOLD_DIST = 0, GridSorter.AUTO_SCROLL_DISTANCE_THRESHOLD = 300, GridSorter.AUTO_SCROLL_GAP = 300, GridSorter.prototype.destroy = function() {
    this._inited = !1, this._deinitEvents(!0)
}, GridSorter.prototype._getParentDragItemEl = function(t) {
    for (var e, i = t; i && (e = domPN(i)) != this._contEl;) i = e;
    return i == this._curPlaceholderEl && (i = null), i
}, GridSorter.prototype._onKey = function(t) {
    t.keyCode == KEY.ESC && this.isCurrentlyDragging() && this._onMouseUp()
}, GridSorter.prototype._onMouseDown = function(t) {
    if (!(this._disabled || 0 != t.button || this._curDragEl || attr(t.target, "nodrag")) && (this._dragElClass ? hasClass(t.target, this._dragElClass) : 1)) {
        for (var e = t.target; e && e != window.document;) {
            if (intval(domData(e, "nodrag"))) return;
            e = domPN(e)
        }
        var i = this._getParentDragItemEl(t.target);
        if (i && !attr(i, "nodrag") && (re(geByClass1("ui_gridsorter_placeholder"), this._contEl), this._contInfo = this._contInfo || {
                prevSize: getSize(this._contEl)
            }, this._ensureGridIsActual(), !(this._grid.length <= 1))) {
            var o = window.getComputedStyle(i),
                r = getXY(i);
            this._initial = {
                candidateEl: i,
                x: t.clientX,
                y: t.clientY,
                itemMargin: {
                    x: parseInt(o.marginLeft),
                    y: parseInt(o.marginTop)
                },
                shift: {
                    x: t.pageX - r[0],
                    y: t.pageY - r[1]
                }
            }, addEvent(document, "mousemove", this._ev_mousemove_handler = this._onMouseMove.bind(this)), addEvent(document, "mouseup", this._ev_mouseup_handler = this._onMouseUp.bind(this)), addEvent(document, "keydown", this._ev_keydown_handler = this._onKey.bind(this)), cur.cancelClick = !1, cancelEvent(t)
        }
    }
}, GridSorter.prototype._dist = function(t) {
    return Math.abs(t.clientX - this._initial.x) + Math.abs(t.clientY - this._initial.y)
}, GridSorter.prototype._onMouseUp = function(t) {
    var e = this._curDragEl,
        i = t ? !1 : !0,
        o = this;
    if (this._curDragEl) {
        this._curDragEl = null, removeClass(e, "ui_gridsorter_moveable_notrans"), this._curOverCell || (this._curOverCell = {
            el: this._curPlaceholderEl,
            pos: getXY(this._curPlaceholderEl),
            size: getSize(this._curPlaceholderEl)
        });
        var r = this._curOverCell.pos,
            s = this._curOverCell.el,
            l = (getXY(s), this._grid[this._curDragCellIndex]),
            n = l.size;
        this._getItemMargins();
        this._isShiftToLeft && (r[1] -= n[1] - this._curOverCell.size[1]), setTimeout(function() {
            if (i) {
                for (var t = 0, s = o._grid.length; s > t; t++) {
                    var l = o._grid[t];
                    l.dirty && o._setPos(l.el, {
                        left: 0,
                        top: 0
                    })
                }
                o._setPos(e, o._initialCurDragPos)
            } else o._setPos(e, {
                left: r[0],
                top: r[1]
            })
        }), setTimeout(function() {
            if (re(o._curPlaceholderEl), removeClass(o._contEl, "ui_gridsorter_cont"), o.options.dragCls && removeClass(e, o.options.dragCls), o._inited) {
                if (i) {
                    for (var t = 0, r = o._grid.length; r > t; t++) cell = o._grid[t], cell.dirty && o._setPos(cell.el, {
                        left: null,
                        top: null
                    });
                    o._setPos(e, {
                        left: null,
                        top: null,
                        width: null,
                        height: null
                    })
                } else {
                    var l = o._isShiftToLeft ? domNS(s) : s;
                    o._contEl.insertBefore(e, l);
                    var n, h = -1,
                        a = (o._getContShift(), o._initial.hasInlineSize);
                    o._setPos(e, {
                        left: null,
                        top: null
                    }), a || setStyle(e, {
                        width: null,
                        height: null
                    });
                    for (var t = 0, r = o._grid.length; r > t; t++) cell = o._grid[t], (cell.dirty || cell.el == e) && (o._setPos(cell.el, {
                        left: null,
                        top: null
                    }), a || setStyle(cell.el, {
                        width: null,
                        height: null
                    }), cell.pos = o._calcElementPos(cell.el), cell.dirty = !1), cell.el == e ? n = t : cell.el == s && (overCell = cell, h = t);
                    if (h >= 0) {
                        var _ = o._grid.splice(n, 1);
                        o._grid.splice(h, 0, _[0])
                    }
                }
                removeClass(e, "ui_gridsorter_moveable"), o._curOverCell = o._curPlaceholderEl = null, i && o.update(), s != e && !i && o.options.onReorder && o.options.onReorder(e, l, domPS(e))
            }
        }, 210), t && this._dist(t) > 5 && (cancelEvent(t), cur.cancelClick = !0)
    }
    this._updateScrollbar(), this._deinitEvents(), e && this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, e), i || e && this._overEl && this.options.onDragDrop && (i = this.options.onDragDrop(this._overEl, e)), this._overEl = null
}, GridSorter.prototype._deinitEvents = function(t) {
    t && (this._onMouseUp(), removeEvent(this._contEl, "mousedown", this._ev_mousedown_handler)), this._isCurrentlyAutoScroll = !1, clearTimeout(this._autoScrollTO), this._autoScrollTO = !1, this._ev_mousemove_handler && removeEvent(document, "mousemove", this._ev_mousemove_handler), this._ev_mouseup_handler && removeEvent(document, "mouseup", this._ev_mouseup_handler), this._ev_keydown_handler && removeEvent(document, "keydown", this._ev_keydown_handler)
}, GridSorter.prototype._setPos = function(t, e) {
    !this.options.noPosTransform && this._grid.length > 100 && (this._hasTranslateFeauture || (this._hasTranslateFeauture = window.getComputedStyle(t).getPropertyValue("transform"))) ? null === e.left || null === e.top ? setStyle(t, {
        transform: null,
        top: null,
        left: null
    }) : setStyle(t, {
        transform: "translate(" + e.left + "px, " + e.top + "px)",
        top: null,
        pos: null
    }) : setStyle(t, extend({
        transform: null
    }, e))
}, GridSorter.prototype._recalc = function() {
    var t = this._curDragEl,
        e = this._curOverCell.el;
    if (this._initGrid(), e != t) {
        for (var i, o = 0, r = !1, s = !1, l = (this._getItemMargins(), 0), n = this._grid.length; n > l; l++) {
            if (i = this._grid[l], i.el == t) {
                r = !0;
                break
            }
            if (i.el == e) {
                r = !1;
                break
            }
        }
        this._isShiftToLeft = r;
        for (var l = r ? 0 : this._grid.length - 1, h = r ? this._grid.length : -1, a = r ? 1 : -1, _ = [0, 0]; l != h; l += a)
            if (i = this._grid[l], 2 != o)
                if (i.el != t) {
                    if (i.el == e && o++, 1 == o || 2 == o) {
                        var d = 0,
                            c = 0;
                        r ? (d = s.pos[0] + _[0], c = s.pos[1] + _[1], _[0] += i.size[0] - s.size[0], _[1] += i.size[1] - s.size[1]) : (_[0] += s.size[0] - i.size[0], _[1] += s.size[1] - i.size[1], d = s.pos[0] + _[0], c = s.pos[1] + _[1]), this._setPos(i.el, {
                            left: d - i.pos[0],
                            top: c - i.pos[1]
                        }), i.dirty = !0
                    } else i.dirty && (this._setPos(i.el, {
                        left: null,
                        top: null
                    }), i.dirty = !1);
                    s = i
                } else o++, s = i;
        else i.dirty && (this._setPos(i.el, {
            left: null,
            top: null
        }), i.dirty = !1), s = i
    } else
        for (var l = 0, n = this._grid.length; n > l; l++) {
            var i = this._grid[l];
            i.el != t && i.dirty && (i.dirty = !1, this._setPos(i.el, {
                left: null,
                top: null
            }))
        }
}, GridSorter.prototype.disable = function() {
    this._disabled = !0
}, GridSorter.prototype.enable = function() {
    this._disabled = !1, this._initGrid(!0)
}, GridSorter.prototype.update = function() {
    this._disabled || this._initGrid(!0)
}, GridSorter.prototype._ensureGridIsActual = function() {
    this._initGrid()
}, GridSorter.prototype._needGridUpdate = function() {
    if (!this._grid) return 1;
    this._contInfo.prevSize = this._contInfo.prevSize || getSize(this._contEl);
    var t = 0,
        e = this._contEl.children.length - this._excludedCount - intval(!!this._curPlaceholderEl);
    if (e != this._grid.length) t = e > this._grid.length ? 2 : 1, this._contInfo.prevSize = getSize(this._contEl);
    else {
        var i = getSize(this._contEl),
            o = this._contInfo.prevSize;
        (Math.abs(o[0] - i[0]) > 5 || Math.abs(o[1] - i[1]) > 5) && (t = 1), this._contInfo.prevSize = i
    }
    return t
}, GridSorter.prototype._initGrid = function(t) {
    var e = t ? 1 : this._needGridUpdate();
    if (e) {
        1 == e && (this._grid = [], this._contInfo && (delete this._contInfo.pos, delete this._contInfo.size));
        var i = this._grid ? this._grid[this._grid.length - 1] : null;
        this._grid = this._grid || [];
        var o, r = !!i,
            s = this._contEl.children;
        if (0 != s.length)
            for (var l = this._getItemMargins(), n = this._curDragEl ? this._grid.length : 0, h = n, a = s.length; a > h; h++) el = s[h], i && el == i.el ? r = !1 : r || el == this._curPlaceholderEl || el.getAttribute("nodrag") || (o = getSize(el), o[0] += l[0], o[1] += l[1], this._grid.push({
                el: el,
                size: o,
                pos: this._calcElementPos(el)
            }))
    }
}, GridSorter.prototype._getRelativeMousePos = function(t) {
    var e = this._getContPos(),
        i = this._getContShift();
    return {
        left: t.clientX - e[0] - i[0],
        top: t.clientY - e[1] - i[1]
    }
}, GridSorter.prototype._updateDraggablePosition = function(t) {
    if (this._curDragEl) {
        var e = this._getRelativeMousePos(t),
            i = this._getItemShift(),
            o = this._getContShift(),
            r = this._getContSize(),
            s = e.top - this._initial.shift.y - i[1] + o[1];
        this.options.limitBottomMove && (s = Math.min(s, r[1] + 30)), this._setPos(this._curDragEl, {
            left: e.left - this._initial.shift.x - i[0] + o[0],
            top: s
        })
    }
}, GridSorter.prototype._getContShift = function() {
    if (this._contInfo = this._contInfo || {}, !this._contInfo.shift) {
        var t = window.getComputedStyle(this._contEl);
        this._contInfo.shift = [parseFloat(t.paddingLeft), parseFloat(t.paddingTop)]
    }
    return this._contInfo.shift
}, GridSorter.prototype._getContSize = function() {
    return this._contInfo = this._contInfo || {}, this._contInfo.size = getSize(this._contEl), this._contInfo.size
}, GridSorter.prototype._getContPos = function() {
    return this._contInfo = this._contInfo || {}, this._contInfo.pos = getXY(this._contEl), this._contInfo.pos[1] -= scrollGetY(), this._contInfo.pos
}, GridSorter.prototype._getItemShift = function() {
    if (this._contInfo = this._contInfo || {}, !this._contInfo.itemShift) {
        var t = window.getComputedStyle(domFC(this._contEl));
        this._contInfo.itemShift = [parseFloat(t.marginLeft), parseFloat(t.marginTop)]
    }
    return this._contInfo.itemShift
}, GridSorter.prototype._getItemMargins = function() {
    if (this._contInfo = this._contInfo || {}, !this._contInfo.itemMargins) {
        var t = window.getComputedStyle(domFC(this._contEl));
        this._contInfo.itemMargins = [parseFloat(t.marginLeft) + parseFloat(t.marginRight), parseFloat(t.marginTop) + parseFloat(t.marginBottom)]
    }
    return this._contInfo.itemMargins
}, GridSorter.prototype._calcElementPos = function(t) {
    var e = this._getContShift(),
        i = this._getItemShift();
    return [t.offsetLeft - e[0] - i[0], t.offsetTop - e[1] - i[1]]
}, GridSorter.prototype.isCurrentlyDragging = function() {
    return !!this._curDragEl
}, GridSorter.prototype._updateScrollbar = throttle(function() {
    var t = this.options.wrapNode || scrollNode,
        e = data(t, "sb");
    e && e.update(!1, !0)
}, 500), GridSorter.prototype._getWrapNodeHeight = function() {
    var t = this.options.wrapNode || scrollNode;
    return this._wrapNodeHeight = this._wrapNodeHeight || getSize(t)[1]
}, GridSorter.prototype._onMouseMove = function(t) {
    function e() {
        return o.options.wrapNode ? o.options.wrapNode.scrollTop : scrollGetY()
    }

    function i(t) {
        o.options.wrapNode ? o.options.wrapNode.scrollTop = t : scrollToY(t, 0, !1, !0)
    }
    var o = this;
    if (this._curDragEl) {
        this._ensureGridIsActual();
        var r = !t;
        e();
        r && (t = {
            clientX: this._lastMousePos.x,
            clientY: this._lastMousePos.y
        }), this._lastMousePos = {
            x: t.clientX,
            y: t.clientY
        }, this._updateDraggablePosition(t);
        var s = (this._getContShift(), this._getContSize()),
            l = this._getContPos(),
            n = this._getRelativeMousePos(t),
            h = !1,
            a = n.left > 0 && n.left < s[0] && n.top > 0 && n.top < s[1];
        if (a)
            for (var _, d = 0, c = this._grid.length - 1, u = 50; u;) {
                var g = d + Math.floor((c - d) / 2);
                if (_ = this._grid[g], n.left > _.pos[0] && n.top > _.pos[1] && n.left < _.pos[0] + _.size[0] && n.top < _.pos[1] + _.size[1]) {
                    h = _;
                    break
                }
                if (d == c) break;
                n.top < _.pos[1] || n.left < _.pos[0] && n.top < _.pos[1] + _.size[1] ? c = c == g ? c - 1 : g : d = d == g ? d + 1 : g, u--
            } else {
                for (var p, f, v, E, S = 999999, m = 0, y = this._grid.length; y > m; m++) {
                    var _ = this._grid[m];
                    v = n.left - (_.pos[0] + _.size[0] / 2), E = n.top - (_.pos[1] + _.size[1] / 2), f = v * v + E * E, S > f && (S = f, p = _)
                }
                h = p
            }!h || this._curOverCell && this._curOverCell.el == h.el || (this._curOverCell = h, this._recalc());
        var C, D, I, P, G = 0;
        if (this.options.wrapNode) C = P = this.options.wrapNode, D = getSize(C), I = getXY(C), I[1] -= scrollGetY(), G = t.clientY;
        else {
            var w = window,
                f = document,
                z = f.documentElement,
                M = f.getElementsByTagName("body")[0],
                T = w.innerWidth || z.clientWidth || M.clientWidth,
                b = w.innerHeight || z.clientHeight || M.clientHeight;
            P = w.bodyNode, C = w, D = [T, b], I = [0, 0], G = t.clientY
        }
        var O = Math.max(20, D[1] / 10),
            L = (I[1] > l[1], I[1] + D[1] < l[1] + s[1], I[1] + O - G),
            N = O - (D[1] - G);
        if (N > 0 || L > 0) {
            this._isCurrentlyAutoScroll = !0;
            var Y = Math.min(1, L / O),
                x = Math.min(1, N / O);
            if (!this._autoScrollTO) {
                P.scrollHeight - D[1];
                this._autoScrollTO = setTimeout(function() {
                    o._autoScrollTO = !1;
                    var t = e();
                    i(t + 16 * (Y > 0 ? -Y : x)), t != P.scrollTop && (o._updateScrollbar(), o._onMouseMove())
                }, 20)
            }
        } else this._isCurrentlyAutoScroll = !1;
        if (this.options.onDragOverElClass) {
            var F = t.target;
            hasClass(F, this.options.onDragOverElClass) || (F = gpeByClass(this.options.onDragOverElClass, F)) ? this._overEl != F && (this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, this._curDragEl), this.options.onDragEnter && this.options.onDragEnter(F, this._curDragEl), this._overEl = F) : (this._overEl && this.options.onDragLeave && this.options.onDragLeave(this._overEl, this._curDragEl), this._overEl = null)
        }
    } else if (this._dist(t) > this.options.dragThreshold) {
        this._curDragEl = this._initial.candidateEl;
        for (var m = 0, y = this._grid.length; y > m; m++)
            if (this._grid[m].el == this._curDragEl) {
                this._curDragCellIndex = m;
                break
            }
        this.options.dragCls && addClass(this._curDragEl, this.options.dragCls);
        var A = getSize(this._curDragEl),
            R = getXY(this._curDragEl),
            k = window.getComputedStyle(this._curDragEl),
            l = this._getContPos();
        this._initial.hasInlineSize = !(!this._curDragEl.style.width && !this._curDragEl.style.height), setStyle(this._curDragEl, {
            width: A[0],
            height: A[1]
        }), this._initialCurDragPos = {
            left: R[0] - l[0],
            top: R[1] - l[1] - bodyNode.scrollTop
        }, this._curPlaceholderEl = ce("div", {
            className: "ui_gridsorter_placeholder"
        }), setStyle(this._curPlaceholderEl, {
            width: A[0] + parseFloat(k.marginLeft) + parseFloat(k.marginRight),
            height: A[1] + parseFloat(k.marginTop) + parseFloat(k.marginBottom)
        }), this._contEl.insertBefore(this._curPlaceholderEl, this._curDragEl), addClass(this._curDragEl, "ui_gridsorter_moveable"), addClass(this._curDragEl, "ui_gridsorter_moveable_notrans"), addClass(this._contEl, "ui_gridsorter_cont"), this._onMouseMove(t), this._updateDraggablePosition(t)
    }
    cancelEvent(t)
};
try {
    stManager.done("grid_sorter.js")
} catch (e) {}