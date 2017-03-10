/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2830033131
    Link: https://vk.com/js/al/recover.js?2830033131
    Last Update: 10.2.117
*/
var Recover = {
    onEnter: function(o, e, n) {
        (e = e || window.event) && (10 == e.keyCode || 13 == e.keyCode) && (o.blur(), n())
    },
    showMsg: function(o, e) {
        var n = ge("recover_msg");
        n.innerHTML = o, isVisible(n) ? (animate(n, {
            backgroundColor: "#F4EBBD"
        }, 100, animate.pbind("recover_msg", {
            backgroundColor: "#F9F6E7"
        }, 2e3)), e()) : slideDown(n, 100, e)
    },
    submitLogin: function() {
        if (!buttonLocked("recover_submit_login")) {
            var o = trim(val("recover_login"));
            return o ? void ajax.post("recover.php", {
                act: "login",
                login: o
            }, {
                onDone: function() {},
                onFail: function(o) {
                    return o ? (Recover.showMsg(o), !0) : void 0
                },
                showProgress: lockButton.pbind("recover_submit_login"),
                hideProgress: unlockButton.pbind("recover_submit_login")
            }) : notaBene("recover_login")
        }
    }
};
try {
    stManager.done("recover.js")
} catch (e) {}