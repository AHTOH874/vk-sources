/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1298313198
    Link: https://vk.com/js/al/shortener.js?1298313198
    Last Update: 10.2.117
*/
var Shortener = {
    init: function() {
        setTimeout(elfocus.pbind("shorten_link")), window.addEventListener("scroll", this.onShortenedScrolled), cur.isLoadingMore = !1, cur.offset = 15, cur.count = 10, console.log("here")
    },
    submitLink: function(e, o) {
        if (!e) return void this.submitLinkOld();
        var t = ge("shorten_error");
        t.className = "shorten_error", ajax.post("/cc", {
            act: "shorten",
            link: val("shorten_link"),
            count: cur.offset + 1,
            hash: o
        }, {
            onDone: function(e, o) {
                var t = ge("shorten_link");
                t.value = e, setTimeout(cur.selResult, 0), ge("last_shortened_block").innerHTML = o, cur.offset++
            },
            onFail: function(e) {
                if (e) {
                    var o = ge("shorten_error");
                    return o.className = "shorten_error_display", val("shorten_msg", e), isVisible(o) || slideDown(o, 200), !0
                }
            },
            showProgress: lockButton.pbind("shorten_btn"),
            hideProgress: unlockButton.pbind("shorten_btn")
        })
    },
    deleteLastShortened: function(e, o, t, n) {
        console.log("delete"), ajax.post("/cc", {
            act: "delete",
            key: o,
            timestamp: t,
            hash: n,
            count: cur.offset
        }, {
            onDone: function(e) {
                ge("last_shortened_block").innerHTML = e
            },
            onFail: function() {
                return !0
            }
        }), e || (e = window.event), e.cancelBubble = !0, e.stopPropagation()
    },
    selResult: function() {
        var e = ge("shorten_link");
        if (e.createTextRange) {
            var o = e.createTextRange();
            o.collapse(!0), o.moveEnd("character", 0), o.moveStart("character", val(e).length), o.select()
        } else e.setSelectionRange && e.setSelectionRange(0, val(e).length)
    },
    submitLinkOld: function() {
        var e = ge("shorten_error");
        e.className = "shorten_error", ajax.post("/cc", {
            act: "shorten",
            link: val("shorten_link")
        }, {
            onDone: function(e) {
                var o = ge("shorten_short");
                val(o, e), isVisible("shorten_error") && slideUp("shorten_error", 200), isVisible("shorten_result") ? o.select() : slideDown("shorten_result", 200, function() {
                    o.select()
                }), setTimeout(cur.selResult, 0), ge("shorten_row").style.paddingBottom = 0
            },
            onFail: function(e) {
                if (ge("shorten_row").style.paddingBottom = 0, e) {
                    var o = ge("shorten_error");
                    o.className = "shorten_error_display", isVisible("shorten_result") && slideUp("shorten_result", 200);
                    var o = ge("shorten_error");
                    return val("shorten_msg", e), isVisible(o) || slideDown(o, 200), !0
                }
            },
            showProgress: lockButton.pbind("shorten_btn"),
            hideProgress: unlockButton.pbind("shorten_btn")
        })
    },
    highlightDeleteIcon: function(e) {
        ge("delete_icon_" + e).style.opacity = Math.max(.5, ge("delete_icon_" + e).style.opacity)
    },
    showDeleteIcon: function(e, o, t) {
        ge("delete_icon_" + o).style.opacity = 1, showTooltip(e, {
            text: t,
            black: 1,
            shift: [15, 11, 0]
        })
    },
    onShortenedScrolled: function() {
        var e = document.getElementById("page_body"),
            o = document.getElementById("last_shortened_list");
        if (!cur.allLoaded && document.body.scrollHeight - e.scrollHeight < 70 && window.innerHeight + window.scrollY >= document.body.offsetHeight && !cur.isLoadingMore) {
            cur.isLoadingMore = !0;
            var t = document.createElement("div");
            t.className = "load_more", o.appendChild(t), ajax.post("/cc", {
                act: "load_more",
                offset: cur.offset,
                count: cur.count
            }, {
                onDone: function(e) {
                    e ? (ge("last_shortened_block").innerHTML = e, cur.offset += cur.count) : (cur.allLoaded = !0, o.removeChild(o.lastChild)), cur.isLoadingMore = !1
                },
                onFail: function() {
                    o.removeChild(o.lastChild), cur.isLoadingMore = !1
                }
            })
        }
    }
};
try {
    stManager.done("shortener.js")
} catch (e) {}