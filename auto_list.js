/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2419796116
    Link: https://vk.com/js/al/auto_list.js?2419796116
    Last Update: 10.2.117
*/
function AutoList(t, s) {
    if (this.constructor != AutoList) throw new Error("AutoList: AutoList was called without 'new' operator");
    this._containerEl = ge(t);
    var o = window;
    if (s.scrollNode ? (s.scrollNode = ge(s.scrollNode), o = s.scrollNode) : "scroll" == window.getComputedStyle(this._containerEl).overflow && (o = this._containerEl), this._opts = extend({
            scrollNode: o,
            threshold: 0,
            renderImmediate: !1
        }, s), !this._containerEl) throw new Error("AutoList: container not found");
    this._rowClasses = this._opts.rowClass ? this._opts.rowClass.split(" ") : !1, delete this._opts.rowClass, this._initialRender = this._opts.renderImmediate, this._isProgressShown = !1, this._prefetched = [], this._offset = this._initialRender ? 0 : this._opts.rowClasses ? this._countRows(this._containerEl.children) : this._containerEl.children.length, this._page = this._offset > 0 ? 1 : 0, addEvent(this._opts.scrollNode, "scroll", this._ev_scroll = this._onScroll.bind(this)), this._setState(this._opts.renderImmediate ? AutoList.STATE_PENDING_ROWS : AutoList.STATE_PENDING_PREFETCH_ROWS), this._requestRows()
}
AutoList.STATE_IDLE = "idle", AutoList.STATE_PENDING_ROWS = "pend_rows", AutoList.STATE_PENDING_PREFETCH_ROWS = "pend_prefetch", AutoList.STATE_DONE_PREFETCH = "done_prefetch", AutoList.STATE_DONE = "done", AutoList.prototype._countRows = function(t) {
    var s = this,
        o = 0;
    return each(t, function(t, e) {
        "string" == typeof e && (e = se(e)), s._rowClasses ? each(s._rowClasses, function(t, s) {
            return hasClass(e, s) ? (o++, !1) : void 0
        }) : o++
    }), o
}, AutoList.prototype._drawRows = function(t) {
    var s = this;
    this._opts.drawRows ? this._opts.drawRows(s._containerEl, t) : each(t, function(t, o) {
        "string" == typeof o && (o = se(trim(o))), s._containerEl.appendChild(o)
    }), this.toggleProgress(this._state != AutoList.STATE_DONE), !this._forceDrawCalled && this._opts.onRendered && this._opts.onRendered()
}, AutoList.prototype.toggleProgress = function(t) {
    t ? !this._isProgressShown && this._opts.showProgress && this._opts.showProgress() : this._isProgressShown && this._opts.hideProgress && this._opts.hideProgress(), this._isProgressShown = t
}, AutoList.prototype.drawMore = function() {
    inArray(this._state, [AutoList.STATE_IDLE, AutoList.STATE_DONE_PREFETCH]) && (this._forceDrawCalled = !0, this._drawRows(this._prefetched), this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS), this._prefetched = [], this._requestRows(!0), this._forceDrawCalled = !1)
}, AutoList.prototype.destroy = function() {
    this._ev_scroll && (removeEvent(this._opts.scrollNode, "scroll", this._ev_scroll), this._ev_scroll = !1), this._setState(AutoList.STATE_DONE), this.toggleProgress(!1)
}, AutoList.prototype._requestRows = function(t) {
    function s() {
        o._opts.onNeedRows(o._onRowsProvided.bind(o), o._offset, o._page++, o._state == AutoList.STATE_PENDING_PREFETCH_ROWS)
    }
    if (this._state != AutoList.STATE_DONE_PREFETCH) {
        var o = this;
        this._initialRender = !1, s()
    }
}, AutoList.prototype._onRowsProvided = function(t, s) {
    if (t === !1) return this._requestRows();
    switch (t = t || [], this._offset += void 0 === s ? this._countRows(t) : s, this._state) {
        case AutoList.STATE_PENDING_PREFETCH_ROWS:
            0 == t.length ? (this._setState(AutoList.STATE_DONE_PREFETCH), this._opts.onNoMore && this._opts.onNoMore(), 0 == this._prefetched.length && this._setState(AutoList.STATE_DONE)) : (this._setState(AutoList.STATE_IDLE), this._prefetched = this._prefetched.concat(t), this._opts.onHasMore && this._opts.onHasMore(), this._onScroll());
            break;
        case AutoList.STATE_PENDING_ROWS:
            this._drawRows(t), 0 == t.length ? (this._setState(AutoList.STATE_DONE), this._opts.onNoMore && this._opts.onNoMore()) : (this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS), this._requestRows()), this.toggleProgress(!1);
            break;
        case AutoList.STATE_IDLE:
            this._prefetched = this._prefetched.concat(t);
            break;
        case AutoList.STATE_DONE_PREFETCH:
        case AutoList.STATE_DONE:
    }
}, AutoList.prototype._setState = function(t) {
    this._state = t
}, AutoList.prototype.isDone = function() {
    return this._state == AutoList.STATE_DONE
}, AutoList.prototype.isPendingRows = function() {
    return this._state == AutoList.STATE_PENDING_ROWS
}, AutoList.prototype._onScroll = function() {
    if (!this._forceDrawCalled && this._state != AutoList.STATE_PENDING_ROWS) {
        var t = this._opts.scrollNode == window,
            s = (this._opts.scrollNode.scrollY || this._opts.scrollNode.scrollTop || 0, Math.max(0, getXY(this._containerEl)[1] - (this._opts.scrollNode ? scrollNode.scrollTop : 0)), getSize(this._containerEl)[1], this._opts.scrollNode.innerHeight || this._opts.scrollNode.offsetHeight, t ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : getSize(this._opts.scrollNode)[1]),
            o = 0;
        o = this._opts.contentNode ? getSize(this._opts.contentNode)[1] : t ? getSize(bodyNode)[1] : this._opts.scrollNode.scrollHeight;
        var e = t ? scrollGetY() : this._opts.scrollNode.scrollTop;
        30 > o - s - e && (this._state == AutoList.STATE_PENDING_ROWS || !this._prefetched.length && this._state == AutoList.STATE_PENDING_PREFETCH_ROWS ? (this.toggleProgress(!0), this._setState(AutoList.STATE_PENDING_ROWS)) : this._state == AutoList.STATE_PENDING_PREFETCH_ROWS || this._state == AutoList.STATE_IDLE ? (this._drawRows(this._prefetched), this._prefetched = [], this._setState(AutoList.STATE_PENDING_PREFETCH_ROWS), this._requestRows()) : this._state == AutoList.STATE_DONE_PREFETCH && (this._drawRows(this._prefetched), this._prefetched = [], this._setState(AutoList.STATE_DONE), this._opts.onNoMore && this._opts.onNoMore(), this.destroy()))
    }
};
try {
    stManager.done("auto_list.js")
} catch (e) {}