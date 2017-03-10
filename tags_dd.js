/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 3735969205
    Link: https://vk.com/js/al/tags_dd.js?3735969205
    Last Update: 10.2.117
*/
var TagsDD = function(t, s) {
    var t = ge(t);
    s = extend({
        width: 300,
        paddings: 0,
        placeholder: "no placeholder",
        steps: []
    }, s), this.opts = s, this.step = 0, this.steps = this.opts.steps || [], this.control = ce("div", {
        className: "tdd_wrap" + (s.search ? " tdd_search" : ""),
        innerHTML: ['<div class="tdd_control clear_fix"><div class="tdd_taglist"></div><div class="tdd_input_cont fl_l"><input class="tdd_input" placeholder="', (this.opts.steps[this.step] || this.opts).placeholder, '" /></div></div><div class="tdd_suggest" style="width: ', s.width - 2, 'px"><div class="tdd_suggest_items"></div><div class="tdd_bottom1" style="width: ', s.width - 2, 'px"></div><div class="tdd_bottom2" style="width: ', s.width - 2, 'px"></div></div>'].join("")
    }, {
        width: s.width + "px"
    }), t.parentNode.insertBefore(this.control, t), this.input = geByClass("tdd_input", this.control)[0], this.input.style.width = s.width - 26 + "px", this.tagCont = geByClass("tdd_taglist", this.control)[0], this.suggest = geByClass("tdd_suggest", this.control)[0], this.suggestItems = geByClass("tdd_suggest_items", this.suggest)[0], this.tags = {};
    var i = this;
    stManager.add(["notifier.js"], function() {
        i.scroll = new Scrollbar(i.suggestItems, {
            prefix: "tdd_",
            more: debugLog,
            nomargin: !0,
            nokeys: !0,
            right: 0,
            left: s.width - 9
        })
    }), this.obj = t;
    var e = "keydown blur focus paste cut";
    if (addEvent(this.input, e, function(t) {
            return this.inputEvent(t) === !1 ? cancelEvent(t) : !0
        }.bind(this)), placeholderSetup(this.input, {
            back: !0,
            fast: !0
        }), t.value) {
        var a = t.value.split(",");
        for (var n in a) this.addTag(a[n], !0)
    }
    data(this.control, "tags_dd", this), cur.destroy.push(function() {
        removeData(this.control, "tags_dd"), removeEvent(this.input, e)
    }), this.setData(s)
};
extend(TagsDD.prototype, {
    inputEvent: function(t) {
        switch (t.type) {
            case "paste":
                return this.inputChange(!0), !0;
            case "cut":
                return this.inputChange(!0), !0;
            case "focus":
                return this.showDD(!1, !0), !0;
            case "blur":
                return this.addTag(), this.hideDD(), !1
        }
        switch (t.keyCode) {
            case KEY.ESC:
                this.hideDD();
                break;
            case KEY.RIGHT:
                var s = val(this.input);
                s.length == this.selectionEnd() && this.addTag();
                break;
            case KEY.RETURN:
                var i = this.steps[this.step] || this.opts,
                    e = this.str || "";
                i.data && i.data[e] && i.data[e].length && isVisible(this.suggest) && this.setItem(), this.addTag();
                break;
            case KEY.UP:
                return this.itemMove(!0), !1;
            case KEY.DOWN:
                this.itemMove();
                break;
            case 16:
            case 17:
                break;
            case KEY.LEFT:
                if (val(this.input)) break;
            case KEY.DEL:
                if (0 == this.selectionEnd()) {
                    var a = this.tagCont.lastChild;
                    if (!a) {
                        this.hideDD();
                        break
                    }
                    var n = trim(TagsDD.tagVal(a));
                    return this.setValue(""), this.removeTag(a), this.setData({
                        input: n
                    }), this.updateSource(), this.inputChange(), !1
                }
            default:
                this.focus = "keys", setTimeout(function() {
                    this.str = val(this.input), "," == this.str.substr(this.str.length - 1, 1) && (val(this.input, this.str.substr(0, this.str.length - 1)), this.addTag()), this.updateSource(!0)
                }.bind(this), 0), this.inputChange()
        }
    },
    inputChange: function(t, s) {
        clearTimeout(this.inputTimeout), this.inputTimeout = setTimeout(function() {
            this.str ? this.showDD(!1, s) : this.hideDD()
        }.bind(this), t ? 0 : 100)
    },
    updateSource: function(t, s) {
        var i = (this.tagCont.childNodes, []);
        for (var e in this.tags) e && i.push(e);
        this.str && i.push(this.str), val(this.obj, i.join(",")), this.opts.onChange && this.opts.onChange(s, this.obj)
    },
    loadDD: function(t) {
        var s = this.steps[this.step] || this.opts,
            i = s.url || this.opts.url;
        if (i) {
            var e = s.params || this.opts.params;
            ajax.post(i, extend(e, {
                q: this.str,
                tags: this.obj.value
            }), {
                onDone: function(i) {
                    s.data = extend(s.data || {}, i), t()
                }
            })
        }
    },
    showDD: function(t, s) {
        var i = this.steps[this.step] || this.opts;
        if (i) {
            var e = this.str || "";
            if (!e && s) hide(this.suggest);
            else if (i.data && i.data[e]) {
                var a = i.data[e];
                a.length;
                a = a.slice(0, 40);
                var n = this.getListHTML(a);
                if (!n) return hide(this.suggest), !1;
                this.suggestItems.innerHTML = n, this.shown = a.length, show(this.suggest), this.scroll.update(!1, !0), this.itemMove(!1, !0)
            } else t || this.loadDD(function() {
                this.showDD(!0)
            }.bind(this))
        }
    },
    hideDD: function() {
        setTimeout(function() {
            hide(this.suggest), this.justSelected && (this.justSelected = !1, this.focusInput())
        }.bind(this), 0)
    },
    getListHTML: function(t) {
        var s = [];
        for (var i in t) {
            var e = t[i];
            this.tags[e[1]] || s.push('<a val="', e[0], '" class="tdd_item" onmouseover="TagsDD.activeItem(this);" onmousedown="return TagsDD.selectItem(this, event);">', e[1], "</a>")
        }
        return s.join("")
    },
    setValue: function(t) {
        this.input.setValue ? this.input.setValue(t) : val(this.input, t), this.str = t
    },
    setData: function(t) {
        if (t.input && this.setValue(t.input), t.steps && (this.steps = t.steps), t.tags) {
            this.tags = {}, this.step = 0, this.tagCont.innerHTML = "";
            for (var s in t.tags) this.addTag(s)
        }
        t.params && (this.opts.params = t.params), this.updateInput()
    },
    addTag: function(t, s) {
        var t = t || trim(val(this.input));
        if (t = t.replace(/<|>/g, "")) {
            var i = parseInt((this.opts.width - 15) / 7.5);
            if (t.length > i && (t = trim(t.substr(0, i)) + "..."), this.opts.capitalCase && (t = t.substr(0, 1).toUpperCase() + t.substr(1)), this.tags[t]) return !1;
            this.tags[t] = 1;
            var e = ce("div", {
                className: "tdd_tag fl_l",
                innerHTML: '<span class="tdd_l">' + t + '</span><a class="tdd_x" onclick="TagsDD.removeTag(this.parentNode);" onmouseover="TagsDD.overTag(this);" onmouseout="TagsDD.outTag(this);"><div class="tdd_x_c"></div></a>'
            });
            this.setValue(""), this.tagCont.appendChild(e), this.step += 1, this.updateInput(), s || this.updateSource(!1, !0), this.steps[this.step] && (this.steps[this.step].data = {}), this.hideDD()
        }
    },
    selectionEnd: function(t) {
        if (this.input.createTextRange) {
            var s = document.selection.createRange().duplicate();
            return s.moveStart("character", -this.input.value.length), s.text.length
        }
        return this.input.selectionEnd
    },
    updateInput: function() {
        var t = geByClass("input_back_content", this.input.previousSibling)[0];
        if (t) {
            if (t.innerHTML = (this.steps[this.step] || this.opts).placeholder, !isVisible(t.parentNode.parentNode)) {
                var s = !0;
                show(t.parentNode.parentNode)
            }
            var i = getSize(t)[0] + 2;
            s && hide(t.parentNode.parentNode), this.input.style.width = i + "px";
            var e = getXY(this.input),
                a = getXY(this.control),
                n = a[0] + this.opts.width - this.opts.paddings - (e[0] + i);
            n > 0 && (this.input.style.width = i + n - 11 + "px")
        }
    },
    removeTag: function(t) {
        for (re(t); t.firstChild && 3 != t.firstChild.nodeType;) t = t.firstChild;
        var s = t.innerHTML;
        delete this.tags[s], this.input.focus(), this.step -= 1, this.updateInput(), this.updateSource(!1, !0), this.steps[this.step] && (this.steps[this.step].data = {})
    },
    itemMove: function(t, s) {
        this.focus = "items";
        var i = geByClass("tdd_active", this.suggest)[0];
        if (i) {
            var e = t ? i.previousSibling : i.nextSibling;
            e && (TagsDD.activeItem(e, i), this.focusItem(e, t))
        } else s || addClass(this.suggestItems.firstChild, "tdd_active")
    },
    focusItem: function(t, s) {
        var i = getXY(t)[1] - getXY(this.suggestItems)[1],
            e = getSize(t)[1],
            a = this.scroll.val(),
            n = this.scroll.scrollHeight,
            h = i - Math.floor((n - e) / 2);
        (s && a > h || !s && h > a) && this.scroll.val(i - Math.floor((n - e) / 2))
    },
    setItem: function(t) {
        if (t = t || geByClass("tdd_active", this.suggestItems)[0]) {
            for (; t.firstChild && 3 != t.firstChild.nodeType;) t = t.firstChild;
            this.setValue(t.innerHTML), this.hideDD()
        }
    },
    focusInput: function() {
        this.input.focus(), this.inputChange(!0, !0)
    }
}), extend(TagsDD, {
    activeItem: function(t, s) {
        if (s = s || geByClass("tdd_active", t.parentNode)[0]) {
            if (s == t) return;
            removeClass(s, "tdd_active")
        }
        addClass(t, "tdd_active")
    },
    selectItem: function(t, s) {
        if (s = s || button, 2 == s.button) return cancelEvent(s);
        var i = data(t.parentNode.parentNode.parentNode, "tags_dd");
        i.setItem(t), i.addTag(), i.justSelected = !0, setTimeout(function() {
            i.justSelected = !1
        }, 1e3)
    },
    removeTag: function(t) {
        data(t.parentNode.parentNode.parentNode, "tags_dd").removeTag(t)
    },
    tagVal: function(t) {
        return geByClass("tdd_l", t)[0].innerHTML
    },
    overTag: function(t) {
        animate(t, {
            opacity: 1
        }, 100)
    },
    outTag: function(t) {
        animate(t, {
            opacity: .6
        }, 100)
    }
});
try {
    stManager.done("tags_dd.js")
} catch (e) {}