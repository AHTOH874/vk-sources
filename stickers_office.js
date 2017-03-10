/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 2301605568
    Link: https://vk.com/js/al/stickers_office.js?2301605568
    Last Update: 10.2.117
*/
var StickersOffice = {
    switchTab: function(s, e) {
        var i = geByClass("active_link", ge("stickers_office_tabs"));
        for (var t in i) removeClass(i[t], "active_link");
        return addClass(s, "active_link"), show("stickers_office_progress"), nav.go(s, e)
    },
    toggleRequest: function(s, e) {
        if (!checkEvent(e)) {
            var i = ge("sticker_hidden_info" + s);
            isVisible(i) ? hide(i) : (show(i), ajax.post("stickers_office.php", {
                act: "set_viewed",
                id: s,
                hash: cur.stickers_hash
            }))
        }
    },
    updateStatus: function(s, e, i) {
        var t = {
                act: "update_status",
                id: s,
                status: e,
                hash: cur.stickers_hash,
                confirm: i
            },
            c = curBox();
        c && isVisible("sticker_update_comment") && (t.comment = val("sticker_update_comment")), c && c.hide(), ajax.post("stickers_office.php", t, {
            onDone: function(i, t, c) {
                i ? (showDoneBox(t), hide("sticker" + s)) : showFastBox(t, c, getLang("box_yes"), StickersOffice.updateStatus.pbind(s, e, cur.stickers_hash, 1), getLang("box_no"))
            },
            showProgress: show.pbind("stickers_office_progress"),
            hideProgress: hide.pbind("stickers_office_progress")
        })
    }
};
try {
    stManager.done("stickers_office.js")
} catch (e) {}