/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2393839857
    Link: https://vk.com/js/al/fullscreen_pv.js?2393839857
    Last Update: 10.2.117
*/
var FullscreenPV = {
    init: function() {
        if (cur.pvCanvas && !cur.pvFSControls) {
            var e = positive(getCookie("remixfsss")),
                v = Math.min(positive(getCookie("remixfsdt")) || 5, 15);
            cur.pvFSControls = cur.pvCanvas.appendChild(ce("div", {
                id: "pv_fs_controls",
                innerHTML: '<div id="pv_fs_topright" class="pv_fs_controls">  <table cellspacing="0" cellpadding="0"><tr>    <td><div id="pv_fs_num"></div></td>    <td><div id="pv_fs_close" onclick="Photoview.fullscreenStop()">      <div id="pv_fs_close_btn"></div>    </div></td>  </tr></table></div><div id="pv_fs_bottomleft" class="pv_fs_controls">  <table cellspacing="0" cellpadding="0"><tr>    <td><div id="pv_fs_slide_check" onclick="FullscreenPV.startSlide()">      <div class="pv_fs_slide_check_icon"></div>' + getLang("photos_slideshow") + '    </div></td>    <td><div id="pv_fs_slide_speed_wrap">      <div id="pv_fs_slide_about"></div>      <div id="pv_fs_slide_speed" onmousedown="FullscreenPV.startSlideEdit(event)">        <div id="pv_fs_slide_speed_back"></div>        <div id="pv_fs_slide_speed_line"><div id="pv_fs_slide_speed_ctrl"></div></div>      </div>    </div></td>  </tr></table></div><div id="pv_fs_left_wrap" class="pv_fs_controls"><div id="pv_fs_left"></div></div><div id="pv_fs_right_wrap" class="pv_fs_controls"><div id="pv_fs_right"></div></div>',
                onmouseover: FullscreenPV.over,
                onmouseout: FullscreenPV.out
            })), extend(cur, {
                pvFSInfo: ge("pv_fs_num"),
                pvFSSlideCheck: ge("pv_fs_slide_check"),
                pvFSSlideSpeedWrap: ge("pv_fs_slide_speed_wrap"),
                pvFSSlideLine: ge("pv_fs_slide_speed_line"),
                pvFSSlideAbout: ge("pv_fs_slide_about"),
                pvFSSlideCont: ge("pv_fs_bottomleft"),
                pvFSSlideDelta: v,
                pvFSLeft: ge("pv_fs_left"),
                pvFSRight: ge("pv_fs_right")
            }), cur.pvFSSlideLine.style.width = Math.floor(100 * (v - 1) / 14) + "%", val(cur.pvFSSlideAbout, getLang("photos_seconds", v)), e && addClass(cur.pvFSSlideCont, "pv_fs_slide_on"), FullscreenPV.slide(), addEvent(cur.pvCanvas, "mousemove", FullscreenPV.showControls), addEvent(cur.pvCanvas, "mousedown", FullscreenPV.onClick), addEvent(cur.pvCanvas, "mouseup", FullscreenPV.endSlideEdit), FullscreenPV.showControls(!0), cur.pvPhoto.blur(), FullscreenPV.updateInfo()
        }
    },
    over: function(e) {
        var v = e || window.event,
            i = v.target || v.srcElement || document;
        cur.pvFSOver = !i.id.match(/^pv_fs_(left|right)(_wrap)?$/)
    },
    out: function() {
        cur.pvFSOver = !1
    },
    onClick: function(e) {
        return __afterFocus || e && (2 == e.button || 3 == e.which) || hasClass(cur.pvCanvas, "pv_fs_one") || (cur.pvFSLeftShown ? Photoview.show(cur.pvListId, cur.pvIndex - 1) : cur.pvFSRightShown && Photoview.show(cur.pvListId, cur.pvIndex + 1)), e ? cancelEvent(e) : !1
    },
    showControls: function(e) {
        var v, i, s = cur.pvFSrX = e.pageX,
            r = cur.pvFSrY = e.pageY;
        cur.pvFSSlideEdit && FullscreenPV.updateSlide(), void 0 !== cur.pvFSX && void 0 !== cur.pvFSY && Math.abs(s - cur.pvFSX) + Math.abs(r - cur.pvFSY) < 4 || (cur.pvFSControlsTimer || (removeClass(cur.pvCanvas, "pv_fs_nocursor"), clearTimeout(cur.pvFSHideControlsTimer), show(cur.pvFSControls), addClass(cur.pvFSControls, "pv_fs_shown")), clearTimeout(cur.pvFSControlsTimer), cur.pvFSOver || cur.pvFSSlideEdit || (cur.pvFSControlsTimer = setTimeout(FullscreenPV.hideControls, 3e3)), v = !cur.pvFSOver && (100 > s || cur.pvFSWidth && s < (cur.pvScrWidth - cur.pvFSWidth) / 2), v && !cur.pvFSLeftShown ? addClass(cur.pvFSLeft, "pv_fs_over") : !v && cur.pvFSLeftShown && removeClass(cur.pvFSLeft, "pv_fs_over"), cur.pvFSLeftShown = v, i = !cur.pvFSOver && !v, i && !cur.pvFSRightShown ? addClass(cur.pvFSRight, "pv_fs_over") : !i && cur.pvFSRightShown && removeClass(cur.pvFSRight, "pv_fs_over"), cur.pvFSRightShown = i, cur.pvFSX = s, cur.pvFSY = r)
    },
    hideControls: function() {
        addClass(cur.pvCanvas, "pv_fs_nocursor"), removeClass(cur.pvFSControls, "pv_fs_shown"), clearTimeout(cur.pvFSHideControlsTimer), cur.pvFSHideControlsTimer = setTimeout(hide.pbind(cur.pvFSControls), 300), cur.pvFSControlsTimer = !1
    },
    startSlide: function() {
        hasClass(cur.pvFSSlideCont, "pv_fs_slide_on") ? (clearTimeout(cur.pvFSTimer), removeClass(cur.pvFSSlideCont, "pv_fs_slide_on"), setCookie("remixfsss", 0)) : (addClass(cur.pvFSSlideCont, "pv_fs_slide_on"), FullscreenPV.slide(), setCookie("remixfsss", 1), clearTimeout(cur.hideAboutTO), cur.hideAboutTO = setTimeout(function() {
            removeClass(cur.pvFSSlideAbout, "highlighted")
        }, 3e3), addClass(cur.pvFSSlideAbout, "highlighted"))
    },
    updateSlide: function() {
        var e = Math.floor(15 * Math.max(Math.min((vk.rtl ? cur.pvFSrLeft + cur.pvFSrWidth - cur.pvFSrX : cur.pvFSrX - cur.pvFSrLeft) / cur.pvFSrWidth, .99), 0)) + 1;
        cur.pvFSSlideDelta != e && (setCookie("remixfsdt", cur.pvFSSlideDelta = e), cur.pvFSSlideLine.style.width = Math.floor(100 * (e - 1) / 14) + "%", val(cur.pvFSSlideAbout, getLang("photos_seconds", e)))
    },
    startSlideEdit: function(e) {
        return cur.pvFSrX && cur.pvFSrY ? (extend(cur, {
            pvFSSlideEdit: !0,
            pvFSrLeft: getXY(domPN(cur.pvFSSlideLine))[0],
            pvFSrWidth: getSize(domPN(cur.pvFSSlideLine))[0]
        }), addClass(cur.pvFSSlideCont, "pv_fs_slide_edit"), FullscreenPV.updateSlide(), clearTimeout(cur.pvFSTimer), cancelEvent(e || window.event)) : void 0
    },
    endSlideEdit: function() {
        cur.pvFSSlideEdit && (cur.pvFSSlideEdit = !1, removeClass(cur.pvFSSlideCont, "pv_fs_slide_edit"), FullscreenPV.slide(), cur.pvFSOver || (clearTimeout(cur.pvFSControlsTimer), cur.pvFSControlsTimer = setTimeout(FullscreenPV.hideControls, 3e3)))
    },
    slide: function() {
        clearTimeout(cur.pvFSTimer), !hasClass(cur.pvFSSlideCont, "pv_fs_slide_on") || cur.pvFSSlideEdit || hasClass(cur.pvCanvas, "pv_fs_one") || (cur.pvFSTimer = setTimeout(function() {
            cur.pvSlideNeedAnimation = !0, Photoview.show(cur.pvListId, cur.pvIndex + 1)
        }, 1e3 * cur.pvFSSlideDelta))
    },
    updateInfo: function() {
        var e = ((cur.pvData || {})[cur.pvListId] || []).length,
            v = cur.pvIndex + 1;
        val(cur.pvFSInfo, v + " / " + e), toggle(cur.pvFSInfo, e > 1), (e > 1 ? removeClass : addClass)(cur.pvCanvas, "pv_fs_one")
    }
};
try {
    stManager.done("fullscreen_pv.js")
} catch (e) {}