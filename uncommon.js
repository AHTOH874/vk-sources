/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 1524646384
    Link: https://vk.com/js/al/uncommon.js?1524646384
    Last Update: 10.2.117
*/
function doChangeMail(o) {
    var e = {
        act: "do_change_mail",
        hash: cur.changeMailHash
    };
    return e.newmail = ge(o.input).value, e.newmail ? /[a-z0-9\.\-_]+@[a-z0-9\.\-_]+/i.test(e.newmail) ? (hide(o.error), void ajax.post("al_register.php", e, {
        onDone: function(e) {
            return e ? (showMsg(o.error, e, "error"), void elfocus(o.input)) : void(o.handler && o.handler())
        },
        progress: o.progress
    })) : (showMsg(o.error, cur.changeMailError, "error"), void elfocus(o.input)) : void elfocus(o.input)
}

function mentionSubscribe(o, e, r) {
    if (!buttonLocked(o)) {
        var n = hasClass(o, "secondary"),
            a = {
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o),
                onDone: function() {
                    toggleClass(o, "secondary")
                }
            };
        e > 0 ? ajax.post("al_friends.php", {
            act: n ? "remove" : "add",
            mid: e,
            hash: r,
            from: "mention_tt"
        }, a) : ajax.post("al_groups.php", {
            act: n ? "a_leave" : "a_enter",
            gid: -e,
            hash: r,
            from: "mention_tt"
        }, a)
    }
}
try {
    stManager.done("uncommon.js")
} catch (e) {}