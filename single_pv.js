/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 2438273057
    Link: https://vk.com/js/al/single_pv.js?2438273057
    Last Update: 10.2.117
*/
var SinglePhotoview = {
    blank: "/images/blank.gif",
    blankf: function() {},
    cacheSize: 3,
    init: function(e) {
        cur.spvData = [];
        for (var t = 0, i = e.length; i > t; ++t) {
            var o = e[t];
            cur.spvData.push({
                id: o.id,
                src: o.src,
                desc: o.desc,
                w: o.width,
                h: o.height
            })
        }
    },
    updateArrows: function() {
        var e = sbWidth() + 2;
        cur.spvLeft.style.left = "20px", cur.spvLeftNav.style.width = Math.floor((lastWindowWidth - e - cur.spvActualWidth - 52) / 2) + "px", cur.spvRightNav.style.left = Math.floor((lastWindowWidth - e + cur.spvActualWidth + 52) / 2) + "px", cur.spvRightNav.style.width = Math.floor((lastWindowWidth - e - cur.spvActualWidth - 52) / 2) + "px", cur.spvClose.style.left = lastWindowWidth - e - 2 - 37 + "px"
    },
    updateHeight: function() {
        var e = cur.spvBox.offsetHeight + 110;
        Math.floor(sbWidth() / 2);
        if (cur.spvLeftNav.style.height = cur.spvRightNav.style.height = e - 110 + "px", browser.mobile) {
            10 + cur.spvYOffset;
            cur.spvLeft.style.top = cur.spvClose.style.top = cur.spvYOffset + 25 + "px", lastWindowHeight < cur.spvYOffset + e && setTimeout(function() {
                var t = ge("footer");
                t.style.height = intval(getStyle(t, "height")) + (cur.spvYOffset + e - lastWindowHeight) + "px", onBodyResize(), SinglePhotoview.onResize()
            }, 1)
        }
    },
    locNav: function(e, t, i, o) {
        var s = e.z;
        if (delete e.z, isEmpty(e) && void 0 !== s) {
            return 0 == s && cur.spvShown ? (SinglePhotoview.hide(), !1) : void 0
        }
    },
    updateLocNav: function() {
        for (var e = 0, t = cur.nav.length; t > e; ++e)
            if (cur.nav[e] == SinglePhotoview.locNav) return;
        cur.nav.push(SinglePhotoview.locNav)
    },
    show: function(e, t, i, o, s, v) {
        var r = e.tagName ? {
            src: e.href,
            id: e.id
        } : {
            src: e
        };
        return cur.spvTitle = v, SinglePhotoview.init([extend(r, {
            desc: s,
            width: t,
            height: i
        })]), SinglePhotoview.showByIndex(0, o)
    },
    showByIndex: function(e, t) {
        if (!t || 2 != t.button && 3 != t.which) {
            if (__afterFocus) return t ? cancelEvent(t) : !1;
            var i = (cur.spvData || {}).length,
                o = !1;
            if (i) {
                if (window.wkLayerWrap && isVisible(window.wkLayerWrap) && (wkcur.scrollTop = window.wkLayerWrap.scrollTop, hide(wkLayerWrap)), isVisible(layerWrap)) {
                    if (1 == i && !o && e != cur.spvIndex) return SinglePhotoview.hide(), t ? cancelEvent(t) : !1
                } else o = !0, addEvent(window, "resize", SinglePhotoview.onResize), addEvent(document, "keydown", SinglePhotoview.onKeyDown), addEvent(layerWrap, "click", SinglePhotoview.onClick), boxQueue.hideAll(), setStyle(layerBG, {
                    opacity: ""
                }), layers.show(), layers.fullhide = SinglePhotoview.hide;
                e += 0 > e ? i : e >= i ? -i : 0;
                var s = cur.spvData[e];
                if (s && s.src) {
                    SinglePhotoview.updateLocNav(), t && t.pageX && t.pageY && extend(cur, {
                        spvOldX: t.pageX,
                        spvOldY: t.pageY,
                        spvOldT: vkNow()
                    });
                    var v = o ? 1 : cur.spvIndex > e ? -1 : 1;
                    return cur.spvIndex = e, cur.spvShown = !0, cur.spvFixed || (cur.spvFixed = bodyNode.appendChild(ce("div", {
                        className: "spv_fixed fixed spv_dark",
                        innerHTML: '<div class="spv_left no_select" onmousedown="SinglePhotoview.showByIndex(cur.spvIndex - 1 + vk.rtl * 2, event);" onmouseover="SinglePhotoview.activate(this)" onmouseout="SinglePhotoview.deactivate(this)"><div></div></div><div class="spv_close no_select" onmouseover="SinglePhotoview.activate(this)" onmouseout="SinglePhotoview.deactivate(this)" onmousedown="SinglePhotoview.onClick(event);cur.spvClicked=true;"><div></div></div>      '
                    })), cur.spvLeft = cur.spvFixed.firstChild, cur.spvClose = cur.spvLeft.nextSibling, addClass(layerWrap, "spv_dark"), addClass(layerBG, "spv_dark"), vkImage().src = "/images/upload.gif", layer.innerHTML = '<div class="spv_cont"><table cellspacing="0" cellpadding="0"><tr><td class="sidesh s1"><div></div></td><td><table cellspacing="0" cellpadding="0"><tr><td class="sidesh s2"><div></div></td><td><table cellspacing="0" cellpadding="0"><tr><td colspan="3" class="bottomsh s3"><div></div></td></tr><tr><td class="sidesh s3"><div></div></td><td><div id="spv_box" onclick="cur.spvClicked = true;">  <a class="fl_r spv_close_link" onclick="SinglePhotoview.hide()">' + getLang("global_close") + '</a>  <div id="spv_summary"><span class="summary"></span></div>  <div class="no_select spv_data">    <a onmousedown="if (checkEvent(event) === false) return SinglePhotoview.showByIndex(cur.spvIndex + 1, event);" onselectstart="return cancelEvent(event);" onclick="return checkEvent(event)" id="spv_photo"></a>  </div>  <div class="clear_fix select_fix" id="spv_comments_data">    <div id="spv_wide"></div>  </div></div></td><td class="sidesh s3"><div></div></td></tr><tr><td colspan="3" class="bottomsh s3"><div></div></td></tr></table></td><td class="sidesh s2"><div></div></td></tr><tr><td colspan="3" class="bottomsh s2"><div></div></td></tr></table></td><td class="sidesh s1"><div></div></td></tr><tr><td colspan="3" class="bottomsh s1"><div></div></td></tr></table></div><div class="no_select" id="spv_left_nav" onmouseover="SinglePhotoview.activate(cur.spvLeft)" onmouseout="SinglePhotoview.deactivate(cur.spvLeft)" onmousedown="SinglePhotoview.showByIndex(cur.spvIndex - 1 + vk.rtl * 2, event); cur.spvClicked = true;" onselectstart="return cancelEvent(event);"></div><div class="no_select" id="spv_right_nav" onmouseover="SinglePhotoview.activate(cur.spvClose)" onmouseout="SinglePhotoview.deactivate(cur.spvClose)" onmousedown="SinglePhotoview.onClick(event); cur.spvClicked = true;"></div>      ', extend(cur, {
                        spvCont: layer.firstChild,
                        spvBox: ge("spv_box"),
                        spvLeftNav: ge("spv_left_nav"),
                        spvRightNav: ge("spv_right_nav"),
                        spvSummary: ge("spv_summary").firstChild,
                        spvPhoto: ge("spv_photo"),
                        spvCommentsData: ge("spv_comments_data"),
                        spvWide: ge("spv_wide")
                    }), window.wkcur && wkcur.wkCont && nav.objLoc.w && (cur.spvCont.style.top = wkcur.wkCont.style.top), show(cur.spvCommentsData), browser.mobile && (cur.spvYOffset = intval(window.pageYOffset), cur.spvCont.style.paddingTop = cur.spvLeftNav.style.top = cur.spvRightNav.style.top = cur.spvYOffset + 10 + "px"), addEvent(layerBG, "mouseover", SinglePhotoview.activate.pbind(cur.spvClose)), addEvent(layerBG, "mouseout", SinglePhotoview.deactivate.pbind(cur.spvClose))), cur.spvCurrent && (cur.spvCurrent.onload = SinglePhotoview.blankf, cur.spvCurrent.src = SinglePhotoview.blank), delete cur.spvCurrent, cur.spvCurrent = vkImage(), cur.spvCurrent.onload = SinglePhotoview.preload.pbind(e, v), cur.spvCurrent.src = s.src, o && (i > 1 ? show : hide)(cur.spvLeft, cur.spvLeftNav, cur.spvRightNav, cur.spvClose), cur.spvSummary.innerHTML = cur.spvTitle || "", cur.spvCurPhoto = s, SinglePhotoview.doShow(), t ? cancelEvent(t) : !1
                }
            }
        }
    },
    doShow: function() {
        var e = cur.spvCurrent;
        if (cur.spvShown) {
            var t = cur.spvCurPhoto,
                i = cur.spvPhoto,
                o = 1,
                s = 0,
                v = e.width || t.w,
                r = e.height || t.h;
            r * o >= 453 ? i.style.height = Math.floor(r * o) + "px" : i.style.height = "453px", s = positive(Math.floor((453 - r * o) / 2)), cur.spvPhWidth = Math.floor(v * o), cur.spvPhHeight = Math.floor(r * o), cur.spvActualWidth = Math.max(cur.spvPhWidth, 604), cur.spvCont.style.width = cur.spvActualWidth + 154 + "px", cur.spvSummary.parentNode.style.width = cur.spvActualWidth - 4 + "px", i.innerHTML = '<img style="width: ' + cur.spvPhWidth + "px; height: " + cur.spvPhHeight + "px; margin-top: " + s + 'px;" src="' + e.src + '" />', layerWrap.scrollTop = 0, t.desc ? (cur.spvWide.innerHTML = '<div id="spv_desc">' + t.desc + "</div>", show(cur.spvCommentsData)) : hide(cur.spvCommentsData), SinglePhotoview.updateArrows(), setTimeout(SinglePhotoview.afterShow, 2)
        }
    },
    afterShow: function() {
        if (SinglePhotoview.updateSize(), SinglePhotoview.updateHeight(), cur.spvPhoto.focus(), cur.spvCurPhoto.id) {
            var e = extend(nav.objLoc, {
                z: cur.spvCurPhoto.id
            });
            nav.strLoc != nav.toStr(e) && nav.setLoc(e)
        }
    },
    preload: function(e, t) {
        var i = (cur.spvData || {}).length;
        if (i) {
            cur.spvLastFrom = e, cur.spvLastDirection = t;
            for (var o = 0; o < Math.min(SinglePhotoview.cacheSize, i - SinglePhotoview.cacheSize); ++o) {
                for (var s = e + (o + 1) * -t; s >= i;) s -= i;
                for (; 0 > s;) s += i;
                var v = cur.spvData[s];
                v && v.img && v.img.src && (v.img.src = SinglePhotoview.blank, delete v.img)
            }
            for (var o = 0; o < SinglePhotoview.cacheSize; ++o) {
                for (var s = e + (o + 1) * t; s >= i;) s -= i;
                for (; 0 > s;) s += i;
                var v = cur.spvData[s];
                v && !v.img && (v.img = vkImage(), v.img.src = v.src)
            }
        }
    },
    hide: function(e) {
        if (cur.spvShown && !__afterFocus) {
            if (e !== !0 && nav.objLoc.z) {
                var t = clone(nav.objLoc);
                delete t.z, nav.setLoc(t)
            }
            setTimeout(SinglePhotoview.doHide, 0), window.wkcur && wkcur.scrollTop && setTimeout(function() {
                window.wkLayerWrap.scrollTop = wkcur.scrollTop, wkcur.scrollTop = !1
            }, 0)
        }
    },
    doHide: function() {
        cur.spvHistoryLength = 0;
        var e = (cur.spvData || {}).length;
        if (cur.spvLastDirection && e) {
            for (var t = 0; t < SinglePhotoview.cacheSize; ++t) {
                for (var i = cur.spvLastFrom + (t + 1) * cur.spvLastDirection; i >= e;) i -= e;
                for (; 0 > i;) i += e;
                var o = cur.spvData[i];
                o && o.img && o.img.src && (o.img.src = SinglePhotoview.blank, delete o.img)
            }
            cur.spvLastDirection = cur.spvLastFrom = !1
        }
        layers.hide(), layers.fullhide = !1, each(["spvLeft", "spvClose", "spvFixed"], function() {
            var e = this + "";
            re(cur[e]), cur[e] = !1
        }), browser.mobile && (ge("footer").style.height = ""), removeClass(layerWrap, "spv_dark"), removeClass(layerBG, "spv_dark"), layerBG.style.opacity = "", cur.spvShown = cur.spvClicked = !1, removeEvent(window, "resize", SinglePhotoview.onResize), removeEvent(document, "keydown", SinglePhotoview.onKeyDown), removeEvent(layerWrap, "click", SinglePhotoview.onClick), cur.spvOnHide && cur.spvOnHide(), window.wkcur && wkcur.shown && WkView.showLayer()
    },
    onClick: function(e) {
        if (e = e || window.event, cur.spvClicked || __afterFocus) return void(cur.spvClicked = !1);
        if (!e || 2 != e.button && 3 != e.which) {
            var t = Math.abs(e.pageX - intval(cur.spvOldX)),
                i = Math.abs(e.pageY - intval(cur.spvOldY));
            (void 0 === e.pageX || void 0 === e.pageY || t > 3 || i > 3) && vkNow() - intval(cur.spvOldT) > 300 && SinglePhotoview.hide()
        }
    },
    onKeyDown: function(e) {
        return e.returnValue === !1 ? !1 : e.keyCode == KEY.ESC ? (SinglePhotoview.hide(), cancelEvent(e)) : void(boxQueue.count() || (e.keyCode == KEY.RIGHT ? SinglePhotoview.showByIndex(cur.spvIndex + 1) : e.keyCode == KEY.LEFT && SinglePhotoview.showByIndex(cur.spvIndex - 1)))
    },
    onResize: function() {
        cur.spvActualWidth = Math.max(intval(cur.spvPhWidth), 604), SinglePhotoview.updateArrows(), SinglePhotoview.updateHeight()
    },
    updateSize: function() {
        onBodyResize(), SinglePhotoview.onResize()
    },
    activate: function(e) {
        e.timeout ? (clearTimeout(e.timeout), removeAttr(e, "timeout")) : fadeTo(e, 200, cur.spvDark ? 1 : .7)
    },
    deactivate: function(e) {
        e.timeout || (e.timeout = setTimeout(function() {
            removeAttr(e, "timeout"), fadeTo(e, 200, .4)
        }, 1))
    }
};
try {
    stManager.done("single_pv.js")
} catch (e) {}