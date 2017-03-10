/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 169519698
    Link: https://vk.com/js/al/friendsphotos.js?169519698
    Last Update: 10.2.117
*/
var friendsphotos = {
    scrollResize: function() {
        if (!browser.mobile) {
            var e = document.documentElement,
                o = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                i = scrollGetY(),
                s = ge("albums_load_more");
            i + o > s.offsetTop && friendsphotos.loadAlbums()
        }
    },
    loadedPhotos: function(e, o, i, s) {
        cur.albums[e].offset = o, ge("album_photos" + e).appendChild(ce("div", {
            innerHTML: s
        }));
        var r = ge("album_more_progress" + e).parentNode;
        return i ? (r.firstChild.innerHTML = i, cur.albums[e].loading = 1, void ajax.post("al_photos.php", {
            act: "friends_photos",
            album: e,
            offset: cur.albums[e].offset
        }, {
            cache: 1,
            onDone: function() {
                2 == cur.albums[e].loading ? friendsphotos.loadedPhotos.pbind(e).apply(window, arguments) : cur.albums[e].loading = !1
            }
        })) : void hide(r)
    },
    loadPhotos: function(e) {
        var o = ge("album_more_progress" + e);
        if (isVisible(o.parentNode) && !isVisible(o)) return cur.albums[e].loading ? void(cur.albums[e].loading = 2) : void ajax.post("al_photos.php", {
            act: "friends_photos",
            album: e,
            offset: cur.albums[e].offset
        }, {
            onDone: friendsphotos.loadedPhotos.pbind(e),
            showProgress: function() {
                show(o), hide(o.parentNode.firstChild)
            },
            hideProgress: function() {
                show(o.parentNode.firstChild), hide(o)
            },
            cache: 1
        })
    },
    loadedAlbums: function(e, o, i, s) {
        cur.offset = e, cur.count = o;
        for (var r in s) cur.albums[r] = {
            offset: cur.already
        }, ajax.preload("al_photos.php", {
            act: "friends_photos",
            album: r,
            offset: cur.already
        }, s[r]);
        for (i = ce("div", {
                innerHTML: i
            }); i.firstChild;) ge("friends_albums").appendChild(i.firstChild);
        return e >= o ? void hide("albums_load_more") : (cur.loading = !1, void friendsphotos.recache())
    },
    loadAlbums: function() {
        return isVisible("albums_load_more") && !isVisible("albums_more_progress") ? cur.loading ? void(cur.loading = 2) : void ajax.post("friendsphotos", {
            offset: cur.offset,
            part: 1
        }, {
            onDone: friendsphotos.loadedAlbums,
            showProgress: function() {
                show("albums_more_progress"), hide(ge("albums_load_more").firstChild)
            },
            hideProgress: function() {
                show(ge("albums_load_more").firstChild), hide("albums_more_progress")
            },
            cache: 1
        }) : void 0
    },
    recache: function() {
        if (cur.loading) return cur.loading = 1, void setTimeout(friendsphotos.recache, 100);
        for (var e = cur.offset; ajaxCache["/friendsphotos#offset=" + e + "&part=1"]; e += 10) delete ajaxCache["/friendsphotos#offset=" + e + "&part=1"];
        cur.loading = 1, ajax.post("friendsphotos", {
            offset: cur.offset,
            part: 1
        }, {
            cache: 1,
            onDone: function() {
                2 == cur.loading ? friendsphotos.loadedAlbums.apply(window, arguments) : cur.loading = !1
            }
        })
    },
    init: function() {
        cur.module = "friendsphotos", friendsphotos.scrollnode = browser.msie6 ? pageNode : window, window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0, addEvent(friendsphotos.scrollnode, "scroll", friendsphotos.scrollResize), addEvent(window, "resize", friendsphotos.scrollResize), removeEvent(window, "load", cur.init), cur.destroy.push(function() {
            removeEvent(friendsphotos.scrollnode, "scroll", friendsphotos.scrollResize), removeEvent(window, "resize", friendsphotos.scrollResize)
        })
    },
    removeOver: function(e) {
        var o = ge("album_remove" + e);
        animate(o, {
            backgroundColor: "#6B8DB1"
        }, 200), showTooltip(o, {
            text: getLang("photos_dont_show_album")
        })
    },
    removeOut: function(e) {
        animate(ge("album_remove" + e), {
            backgroundColor: "#C4D2E1"
        }, 200)
    },
    removeAlbum: function(e, o, i) {
        i && !i.tagName && (i = !1);
        var s = ge("album_date" + e);
        ajax.post("al_photos.php", {
            act: "fr_remove_album",
            album: e,
            hash: o
        }, {
            onDone: function(o) {
                i && (hide(i.parentNode), show(i.parentNode.previousSibling));
                var s = (ge("album_photos" + e) || {}).parentNode;
                s && (--cur.offset, friendsphotos.recache(), s.parentNode.insertBefore(ce("div", {
                    innerHTML: o,
                    className: "album_removed"
                }), s), hide(s))
            },
            showProgress: function() {
                i ? (hide(i.nextSibling), show(i)) : (hide(s), show(s.nextSibling))
            },
            hideProgress: function() {
                i ? (hide(i), show(i.nextSibling)) : (hide(s.nextSibling), show(s))
            }
        })
    },
    removeAllAlbums: function(e, o, i) {
        i && !i.tagName && (i = !1);
        var s = ge("frph_remove_progress" + e);
        ajax.post("al_photos.php", {
            act: "fr_remove_all",
            album: e,
            hash: o
        }, {
            onDone: function(o) {
                i && (hide(i.parentNode), show(i.parentNode.previousSibling));
                var s = (ge("album_photos" + e) || {}).parentNode;
                if (s) {
                    for (var r = e.split("_")[0], n = !1, t = browser.msie6 ? pageNode : browser.chrome || browser.safari ? bodyNode : htmlNode, a = ge("friends_albums").firstChild; a; a = a.nextSibling)
                        if (a.tagName) {
                            var d = a.id.match(/^album(-?\d+)_(\d+)$/);
                            if (d) {
                                if (d[1] == r) {
                                    if (--cur.offset, !n) {
                                        var l = getSize(a);
                                        t.scrollTop -= l[1]
                                    }
                                    hide(a)
                                }
                            } else a.nextSibling.id == "album" + e && (show(a.lastChild), hide(a.firstChild), n = !0), a = a.nextSibling
                        }
                    friendsphotos.recache()
                }
            },
            showProgress: function() {
                i ? (hide(i.nextSibling), show(i)) : s.style.visibility = "visible"
            },
            hideProgress: function() {
                i ? (hide(i), show(i.nextSibling)) : s.style.visibility = "hidden"
            }
        })
    },
    returnAlbum: function(e, o, i) {
        i && !i.tagName && (i = !1);
        var s = ge("frph_remove_progress" + e);
        ajax.post("al_photos.php", {
            act: "fr_return_album",
            album: e,
            hash: o
        }, {
            onDone: function() {
                i && (hide(i.parentNode), show(i.parentNode.nextSibling), cur.removedBox.setOptions({
                    onHideAttempt: function() {
                        return show(cur.removedBox.progress), nav.reload(), !1
                    }
                }));
                var o = (ge("album_photos" + e) || {}).parentNode;
                o && (++cur.offset, friendsphotos.recache(), show(o), o.parentNode.removeChild(o.previousSibling))
            },
            showProgress: function() {
                i ? (hide(i.nextSibling), show(i)) : s.style.visibility = "visible"
            },
            hideProgress: function() {
                i ? (hide(i), show(i.nextSibling)) : s.style.visibility = "hidden"
            }
        })
    },
    returnAllAlbums: function(e, o, i) {
        i && !i.tagName && (i = !1);
        var s = ge("frph_return_progress" + e);
        ajax.post("al_photos.php", {
            act: "fr_return_all",
            album: e,
            hash: o
        }, {
            onDone: function(o) {
                i && (hide(i.parentNode), show(i.parentNode.nextSibling), cur.removedBox.setOptions({
                    onHideAttempt: function() {
                        return show(cur.removedBox.progress), nav.reload(), !1
                    }
                }));
                var s = (ge("album_photos" + e) || {}).parentNode;
                if (s) {
                    for (var r = e.split("_")[0], n = !1, t = browser.msie6 ? pageNode : browser.chrome || browser.safari ? bodyNode : htmlNode, a = ge("friends_albums").firstChild; a; a = a.nextSibling)
                        if (a.tagName) {
                            var d = a.id.match(/^album(-?\d+)_(\d+)$/);
                            if (d) {
                                if (d[1] == r) {
                                    if (++cur.offset, !n) {
                                        var l = getSize(a);
                                        t.scrollTop += l[1]
                                    }
                                    show(a)
                                }
                            } else a.nextSibling.id == "album" + e && (show(a.firstChild), hide(a.lastChild), n = !0), a = a.nextSibling
                        }
                    friendsphotos.recache()
                }
            },
            showProgress: function() {
                i ? (hide(i.nextSibling), show(i)) : s.style.visibility = "visible"
            },
            hideProgress: function() {
                i ? (hide(i), show(i.nextSibling)) : s.style.visibility = "hidden"
            }
        })
    },
    activeTab: function(e) {
        for (var o = domPN(domPN(e)), i = domFC(o); i; i = domNS(i)) removeClass(i, "active_link");
        addClass(domPN(e), "active_link")
    }
};
try {
    stManager.done("friendsphotos.js")
} catch (e) {}