/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 2135196486
    Link: https://vk.com/js/al/video_edit.js?2135196486
    Last Update: 10.2.117
*/
VideoEdit = {
    init: function() {
        onDomReady(function() {
            VideoEdit.opts = {
                onReorder: VideoEdit.onReorder
            }, cur.albumFilters = ge("video_albums_list"), cur.albumFilters && extend(VideoEdit.opts, {
                target: cur.albumFilters,
                onDragOver: VideoEdit.onDragOver,
                onDragOut: VideoEdit.onDragOut,
                onMouseDown: VideoEdit.onDragStart,
                onMouseUp: VideoEdit.onDragEnd
            }), sorter.init(cur.vRows, VideoEdit.opts)
        });
        var e = [];
        for (var o in cur.albums) e.push({
            i: o,
            l: cur.albums[o]
        });
        e.push({
            i: 0,
            l: getLang("video_no_album")
        }), cur.albumDDM = new DropdownMenu(e, {
            showHover: !1,
            onSelect: VideoEdit.onAlbumChange
        }), cur.module = "video_edit"
    },
    onReorder: function(e, o, i) {
        var r = e.id.replace("video_row", ""),
            t = (o && o.id || "").replace("video_row", ""),
            d = (i && i.id || "").replace("video_row", "");
        ajax.post("al_video.php", {
            act: "reorder_videos",
            video: r,
            before: t,
            after: d
        });
        for (var a = cur.videoList[cur.vSection], n = !1, u = 0, s = a.length; s > u; u++)
            if (a[u][0] + "_" + a[u][1] == r) {
                n = a[u], a.splice(u, 1);
                break
            }
        if (n)
            for (var u = 0, s = a.length; s > u; u++) {
                if (a[u][0] + "_" + a[u][1] == t) return void a.splice(u, 0, n);
                if (a[u][0] + "_" + a[u][1] == d) return void a.splice(u + 1, 0, n)
            }
    },
    onAdding: function() {
        cur.VideoEditChanged ? (sorter.init(cur.vRows, VideoEdit.opts), cur.VideoEditChanged = !1) : sorter.added(cur.vRows)
    },
    onChanging: function() {
        cur.VideoEditChanged = !0
    },
    showAlbumMenu: function(e, o) {
        cur.albumDDM && o.id != cur.albumDDM.options.id && (cur.currentVideo = e, cur.albumDDM.hide(!1), cur.albumDDM.setOptions({
            target: o,
            title: o.innerHTML
        }), cur.albumDDM.show())
    },
    onAlbumChange: function(e) {
        if (cur.currentVideo) {
            var o = parseInt(e.target.index || 0);
            VideoEdit.moveVideo(cur.currentVideo, o)
        }
    },
    moveVideo: function(e, o, i) {
        var r = ge("album_menu" + e);
        r.innerHTML = '<img src="/images/upload.gif" />', ajax.post("al_video.php", {
            act: "move_to_album",
            vid: e,
            album_id: o,
            oid: cur.oid,
            hash: cur.moveHash
        }, {
            onDone: function(t) {
                r.innerHTML = t;
                var d = 0,
                    a = cur.videoList.all;
                for (var n in a) a[n][1] == e && (d = a[n][6], a[n][6] = o);
                delete cur.videoList["album_" + d], delete cur.videoList["album_" + o], i && i()
            }
        })
    },
    onDragOver: function(e, o) {
        parseInt(e.id.substr(5));
        clearTimeout(cur.dragOutTimeout), hasClass(o, "side_filter") && (hasClass(o, "cur_section") || addClass(o, "video_drag_over"), animate(e, {
            opacity: .3
        }, 300))
    },
    onDragOut: function(e, o) {
        removeClass(o, "video_drag_over"), clearTimeout(cur.dragOutTimeout), cur.dragOutTimeout = setTimeout(function() {
            animate(e, {
                opacity: 1
            }, 200)
        }, 500)
    },
    onDragStart: function(e) {
        addClass(ge("page_body"), "no_overflow");
        var o = ge("video_albums_list");
        each(geByClass("side_filter", o), function(e, o) {
            hasClass(o, "cur_section") || addClass(o, "video_drag_on")
        })
    },
    onDragEnd: function(e, o) {
        removeClass(ge("page_body"), "no_overflow");
        var i = ge("video_albums_list");
        if (each(geByClass("side_filter", i), function(e, o) {
                removeClass(o, "video_drag_on")
            }), hasClass(o, "side_filter")) {
            var r = e.id.split("_"),
                t = o.id.split("_");
            if (!r[2] || !t[3]) return;
            var d = r[2],
                a = t[3];
            VideoEdit.moveVideo(d, a, function() {
                -1 != cur.vSection.indexOf("album_") && Video.section(cur.vSection)
            })
        }
    }
};
try {
    stManager.done("video_edit.js")
} catch (e) {}