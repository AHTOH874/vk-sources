/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 3718548841
    Link: https://vk.com/js/al/suggester.js?3718548841
    Last Update: 10.2.117
*/
function Suggester(t, e) {
    this._inputEl = t, this._opts = extend(e, {}), this._opts.history = !!this._opts.historyItems, this._fetchTO = !1, this._candidateQuery = "", this._suggestions = {}, addEvent(this._inputEl, "input keyup keydown change valueChanged refresh", this._onInputValueChanged.bind(this)), addEvent(this._inputEl, "click", this._onInputClick.bind(this));
    var s = geByClass1("_ui_search_button_search", this._parentEl());
    s && addEvent(s, "click", function() {
        this.value() && (this._hideSuggestions(!0), this._triggerSearch(this.value(), !0)), this._inputEl.focus()
    }.bind(this))
}
Suggester.FETCH_DELAY = 250, Suggester.FETCH_TIMEOUT = 9500, Suggester.SEARCH_TRIGGER_DELAY = 200, Suggester.prototype._onInputClick = function() {
    var t = this.value();
    !this._isSuggestionsShown() && !t && this._opts.history && this._opts.historyItems && this._showSuggestions(this._opts.historyItems, !0), !this._isSuggestionsShown() && t && this._suggestions[t] && this._showSuggestions(this._suggestions[t])
}, Suggester.prototype._onInputValueChanged = function(t) {
    "valueChanged" == t.type && (this.value() || (this._hideSuggestions(!0), this._triggerSearch(""))), "refresh" == t.type && (this.value() || this._hideSuggestions(!0)), t.keyCode === KEY.DEL || (this._candidateIsNotAppropriateForUser = !1);
    var e = !1;
    if ("keydown" == t.type) {
        if (this._prevCaretPos = this._prevCaretPos || 0, this._candidateQuery && (t.keyCode == KEY.TAB || t.keyCode == KEY.RIGHT && this._inputEl.selectionStart == this._inputEl.value.length && this._prevCaretPos == this._inputEl.selectionStart) && (this._inputEl.value = this._candidateQuery, this._candidateQuery = "", this._renderCandidate(), this._hideSuggestions(), this._fetchSuggestions(), t.keyCode == KEY.TAB && (e = !0)), setTimeout(function() {
                this._prevCaretPos = this._inputEl.selectionStart
            }.bind(this)), (t.keyCode == KEY.UP || t.keyCode == KEY.DOWN) && this._isSuggestionsShown()) return this._selectSuggestion(t.keyCode == KEY.DOWN), !1;
        if (t.keyCode == KEY.ENTER) return this._cancelFetchSuggestion(), this._hideSuggestions(!0), void this._triggerSearch(this.value(), !0)
    } else if ("keyup" == t.type) switch (t.keyCode) {
        case KEY.ESC:
            this._isSuggestionsShown() ? (this._triggerSearch(this.value(), this._candidateQuery ? this._candidateQuery : !0), this._hideSuggestions(!0)) : (this._inputEl.value = "", this._triggerSearch(""));
            break;
        case KEY.ENTER:
        case KEY.RIGHT:
        case KEY.LEFT:
        case KEY.TAB:
        case KEY.SHIFT:
        case KEY.CTRL:
        case KEY.ALT:
        case 35:
        case 36:
            break;
        case KEY.UP:
        case KEY.DOWN:
            break;
        default:
            var s = this.value();
            s.length > 1 ? (this._fetchSuggestions(), this._renderCandidate()) : this._hideSuggestions(!0), this._triggerSearchDelayed(s)
    }
    return setTimeout(function() {
        this.value() || (this._candidateQuery = ""), this._renderCandidate()
    }.bind(this)), e ? !1 : void 0
}, Suggester.prototype._cancelFetchSuggestion = function() {
    clearTimeout(this._fetchTimeout), clearTimeout(this._fetchTO), this._fetchTimeout = this._fetchTO = 0
}, Suggester.prototype._selectSuggestion = function(t) {
    var e = "ui_search_suggestion_selected",
        s = geByClass1(e, this._parentEl());
    if (removeClass(s, e), t) s = domNS(s) || geByClass1("ui_search_sugg_list_item", this._parentEl());
    else {
        var i = geByClass("ui_search_sugg_list_item", this._parentEl());
        s = domPS(s) || i[i.length - 1]
    }
    addClass(s, e), this._candidateQuery = "", this._inputEl.value = domData(s, "value"), this._triggerSearchDelayed(this.value(), !0)
}, Suggester.prototype._parentEl = function() {
    return gpeByClass("_wrap", this._inputEl)
}, Suggester.prototype._renderCandidate = function() {
    var t = geByClass1("_ui_search_suggester_shadow", this._parentEl()),
        e = this.value();
    return this._candidateQuery && 0 === this._candidateQuery.indexOf(e.toLowerCase()) ? (t.innerHTML = '<span class="ui_search_suggester_shadow_hidden">' + e + "</span>" + this._candidateQuery.substring(e.length), show(t), !0) : (t.innerHTML = "", hide(t), !1)
}, Suggester.prototype._isSuggestionsShown = function() {
    return !!this._suggestionsShown
}, Suggester.prototype._hideSuggestions = function(t) {
    t && (this._candidateQuery = "", this._renderCandidate());
    var e = geByClass1("_ui_search_sugg_list", this._parentEl());
    hide(e), hide(geByClass1("_ui_search_suggester_shadow", this._parentEl())), this._onWindowMouseDown && removeEvent(window, "mousedown", this._onWindowMouseDown), this._renderCandidate(), this._suggestionsShown = !1
}, Suggester.prototype._showSuggestions = function(t, e) {
    this._hideSuggestions(), t = t || [];
    var s = trim(this.value());
    if (t = t.filter(function(t) {
            return t[3] != s
        }), 0 != t.length) {
        var i = geByClass1("_ui_search_sugg_list", this._parentEl()),
            h = "";
        e && (h += '<div class="ui_search_sugg_history_header">' + getLang("global_recent_search_history") + "</div>"), h += "<div>", each(t, function(t, s) {
            var i = "";
            e && (i = '<a class="ui_search_sugg_list_item_remove" data-hash="' + s[4] + '" data-id="' + s[0] + '">' + getLang("global_remove_history_search_item") + "</a>");
            var a = e ? "ui_search_sugg_list_item_history" : "";
            h += '<div class="ui_search_sugg_list_item ' + a + '" data-value="' + s[3] + '">' + s[1] + i + "</div>"
        }), h += "</div>", i.innerHTML = h, show(i), removeEvent(i, "click"), addEvent(i, "click", function(t) {
            if (hasClass(t.target, "ui_search_sugg_list_item_remove")) {
                var e = domData(t.target, "id"),
                    s = domData(t.target, "hash"),
                    i = domChildIndex(domPN(t.target));
                return re(domPN(t.target)), this._opts.historyItems.splice(i, 1), 0 == this._opts.historyItems.length && this._hideSuggestions(), ajax.post("al_search.php", {
                    act: "remove_history_item",
                    hash: s,
                    item_id: e,
                    type: this._opts.type
                }), !1
            }
            if (hasClass(t.target, "ui_search_sugg_list_item")) {
                var h = domData(t.target, "value");
                this._inputEl.value = h, this._hideSuggestions(!0), this._triggerSearch(h, !0, !0), elfocus(this._inputEl)
            }
        }.bind(this)), removeEvent(i, "mousemove"), addEvent(i, "mousemove", function(t) {
            hasClass(t.target, "ui_search_sugg_list_item") && (removeClass(geByClass1("ui_search_suggestion_selected", i), "ui_search_suggestion_selected"), addClass(t.target, "ui_search_suggestion_selected"))
        }.bind(this)), removeEvent(i, "mouseleave"), addEvent(i, "mouseleave", function(t) {
            removeClass(geByClass1("ui_search_suggestion_selected", i), "ui_search_suggestion_selected")
        }.bind(this)), this._candidateIsNotAppropriateForUser || e || (this._candidateQuery = t[0][3], this._renderCandidate() || (this._candidateQuery = "")), addEvent(window, "mousedown", this._onWindowMouseDown = function(t) {
            (!domClosest("_wrap", t.target) || hasClass(t.target, "_ui_search_params_button")) && this._hideSuggestions(!0)
        }.bind(this)), this._suggestionsShown = !0
    }
}, Suggester.prototype._triggerSearchDelayed = function(t, e) {
    clearTimeout(this._triggerSearchTO), this._triggerSearchTO = setTimeout(function() {
        this._triggerSearch(t, e)
    }.bind(this), Suggester.SEARCH_TRIGGER_DELAY)
}, Suggester.prototype._triggerSearch = function(t, e, s) {
    t || (e = ""), t = trim(t), e === !0 && (e = t), e = void 0 !== e ? trim(e) : e, (this._lastTriggeredSearch || t) && (this._lastTriggeredSearch && this._lastTriggeredSearch == t && this._lastTriggeredSuggestedSearch && void 0 === e || (this._lastTriggeredSearch = t, this._lastTriggeredSuggestedSearch = e, this._opts.onSearch && this._opts.onSearch(t, e, s)))
}, Suggester.prototype.value = function() {
    return trim(this._inputEl.value) ? this._inputEl.value : ""
}, Suggester.prototype._onSuggestionsFetched = function(t, e) {
    var s = trim(this.value());
    s == t && (this._suggestions[t] = e, this._showSuggestions(e), e.length ? this._triggerSearch(s, this._candidateQuery ? this._candidateQuery : !0) : this._triggerSearch(s, !0))
}, Suggester.prototype.saveHistoryItem = function(t, e, s, i, h) {
    if (i && this._opts.history) {
        for (var a = this._opts.historyItems || [], r = 0, o = a.length; o > r; r++)
            if (a[r][1] == t) return;
        debugLog("Saving search history item '" + t + "'"), ajax.post("al_search.php", {
            act: "save_history_item",
            type: this._opts.type,
            q: t,
            object_owner_id: e,
            object_id: s,
            total_count: i,
            total_count_hash: h,
            hash: this._opts.saveHash
        }, {
            onDone: function(t) {
                t && (this._opts.historyItems = t || [])
            }.bind(this)
        })
    }
}, Suggester.prototype._fetchSuggestions = function() {
    clearTimeout(this._fetchTO);
    var t = trim(this.value());
    t.length < 2 || "goods" === this._opts.type || (this._fetchTO = setTimeout(function() {
        this._fetchTimeout = setTimeout(function() {
            this._fetchTimeout = 0, this._onSuggestionsFetched(t, [])
        }.bind(this), Suggester.FETCH_TIMEOUT), ajax.post("/hints.php", {
            act: "a_gsearch_hints",
            q: t,
            section: this._opts.type
        }, {
            onDone: function(e) {
                this._fetchTimeout && (clearTimeout(this._fetchTimeout), this._onSuggestionsFetched(t, e))
            }.bind(this),
            cache: 1
        })
    }.bind(this), Suggester.FETCH_DELAY))
};
try {
    stManager.done("suggester.js")
} catch (e) {}