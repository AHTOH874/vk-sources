/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2226505192
    Link: https://vk.com/js/al/wk.js?2226505192
    Last Update: 10.2.117
*/
var Wiki = {
    inBox: function(e, o) {
        if (!checkEvent(o)) {
            cur.wkBox && cur.wkBox.hide();
            var a = cur.wkUrlInBox ? cur.wkUrlInBox : "/pages?act=in_box";
            return cur.wkBox = showBox(a, e, {
                params: {
                    width: 657
                }
            }), cancelEvent(o)
        }
    },
    switchHider: function(e) {
        var o = e.parentNode.parentNode;
        hasClass(o, "wk_hider_box") ? o.className = o.className.replace("wk_hider_box", "wk_hider_box_opened") : o.className = o.className.replace("wk_hider_box_opened", "wk_hider_box")
    },
    toHash: function(e, o) {
        var a = extend(clone(nav.objLoc), {
            f: o
        });
        e.href = "/" + nav.toStr(a), e.setAttribute("onmousedown", ""), e.onmousedown = null, delete e.onmousedown
    },
    showIconTT: function(e, o) {
        showTooltip(e, {
            text: o,
            slideX: vk.rtl ? -15 : 15,
            black: 1,
            asrtl: 1,
            className: "tt_black_side",
            shift: [-25, -21, 0]
        })
    }
};
try {
    stManager.done("wk.js")
} catch (e) {}