/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 223664659
    Link: https://vk.com/js/al/html5video.js?223664659
    Last Update: 10.2.117
*/
function VideoTimer(e, i) {
    var t, d, o = i;
    this.pause = function() {
        window.clearTimeout(t), o -= new Date - d
    }, this.resume = function() {
        d = new Date, t = window.setTimeout(e, o)
    }, this.resume()
}
var html5video = {
    volLineW: 50,
    volStep: .05,
    prStep: 7,
    minPrW: 78,
    volume: .65,
    lastVolume: .65,
    liked: !1,
    added: !1,
    fixed_player_size: !1,
    actionsW: 39,
    cur_res: -1,
    inside: 0,
    moveState: 0,
    notLoaded: 1,
    videoFinished: !1,
    nextTimerStopped: !1,
    initHTML5Video: function(e, i, t) {
        html5video.destroy(), addEvent(document, "mouseup", html5video.docMouseUp), addEvent(document, "mousemove", html5video.docMouseMove), addEvent(document, browser.opera ? "keypress" : "keydown", html5video.docKeyPressed), addEvent(window, "resize", html5video.onResize), html5video.angle = 90 * (e.angle || 0), html5video.volume = html5video.lastVolume = .65, html5video.cur_res = -1, html5video.fixed_player_size = !1, html5video.actionsW = 39, html5video.inside = 0, html5video.moveState = 0, html5video.notLoaded = 1, html5video.videoClicked = !1, html5video.streamPlaying = !1, html5video.incViewSent = !1, this.incViewTimer && (this.incViewTimer.pause(), delete this.incViewTimer), this.incSmallViewTimer && (this.incSmallViewTimer.pause(), delete this.incSmallViewTimer);
        var d = {};
        e.no_flv && each([240, 360, 480, 720, 1080], function() {
            e["cache" + this] && (d[this] = e["cache" + this], delete e["cache" + this])
        }), html5video.liked = e.liked, html5video.added = e.added, e.cacheData = d, html5video.vars = e, i && (html5video.fixed_player_size = !0, html5video.fixedWidth = i, html5video.fixedHeight = t), ge(video_box_id).innerHTML = html5video.htmlCode(), ge(video_box_id).style.padding = "0px";
        var o = ge("video_actions"),
            l = intval(e.is_ext);
        if (l || e.nolikes || e.min_controls || (ge("popup_actions").appendChild(se('<div id="vid_like" class="vid_like fl_l ' + (e.liked ? "selected" : "") + '" onclick="html5video.onLike(1)"><div id="vid_like_bg" class="vid_like_bg"></div><div id="vid_like_fg" class="vid_like_fg"></div><div id="vid_liked_fg" class="vid_liked_fg"></div></div>')), e.ads_link || ge("popup_actions").appendChild(se('<div id="vid_share" class="vid_share fl_l" onclick="html5video.onShare(1)"><div id="vid_share_bg" class="vid_share_bg"></div><div id="vid_share_fg" class="vid_share_fg"></div></div>')), e.viewer_id !== e.oid && e.can_add && ge("popup_actions").appendChild(se('<div id="vid_add" class="vid_add fl_l ' + (e.added ? "selected" : "") + '" onclick="html5video.onAdd(1)"><div id="vid_add_bg" class="vid_add_bg"></div><div id="vid_add_fg" class="vid_add_fg"></div><div id="vid_added_fg" class="vid_added_fg"></div></div>'))), e.show_next && setStyle(ge("next_button").parentNode, {
                display: null
            }), !l && e.ads_link) {
            ge("popup_actions").appendChild(se('<div id="vid_link" class="vid_link fl_r" onmouseover="html5video.linkOver()" onmouseout="html5video.linkOut()" onclick="html5video.linkClick()"><div id="vid_link_bg" class="vid_link_bg"></div><div id="vid_link_content"><div id="vid_link_fg" class="vid_link_fg"></div><div id="vid_link_text">' + (e.lang_ads_link || "Advertiser's Site") + "</div></div></div>"));
            var n = getSize(ge("vid_link_text"))[0];
            setStyle(ge("vid_link_bg"), {
                width: n + 48
            }), setStyle(ge("vid_link"), {
                width: n + 48
            })
        }
        e.is_inline && (o.insertBefore(se('<div id="popup_btn" class="popup_button fl_l" onmouseover="html5video.openPopupOver(this, event)" onmouseout="html5video.openPopupOut(this, event)" onmouseout="" onclick="html5video.openVideoPopup()"></div>'), ge("quality_btn")), html5video.actionsW += 28), fullScreenApi.supportsFullScreen && (o.insertBefore(se('<div id="fullscreen_btn" class="fullscreen_button fl_l" onmouseover="html5video.fullscreenOver(this, event)" onmouseout="html5video.fullscreenOut(this, event)" onclick="html5video.toggleFullscreen()"></div>'), ge("quality_btn")), "mozfullscreenchange" == fullScreenApi.fullScreenEventName ? (addEvent(document, fullScreenApi.fullScreenEventName, html5video.updateFullscreen), cur.destroy.push(function() {
            removeEvent(document, fullScreenApi.fullScreenEventName, html5video.updateFullscreen)
        })) : addEvent(ge("html5_player"), fullScreenApi.fullScreenEventName, html5video.updateFullscreen), addEvent(ge("video_cont"), "dblclick", html5video.toggleFullscreen), html5video.actionsW += 25), e.nologo || (o.appendChild(se('<div id="logo_btn" class="logo ' + (e.is_vk ? "vk " : "") + 'fl_l" onmouseover="html5video.logoOver(this, event)" onmouseout="html5video.logoOut(this, event)" onclick="html5video.logoClick()"></div>'), ge("quality_btn")), html5video.actionsW += 35), html5video.noQualityBtn = !e.vtag || !e.hd, html5video.noQualityBtn && (hide("quality_btn"), html5video.actionsW -= 39), html5video.maxActionsW = html5video.actionsW, setStyle(o, {
            minWidth: html5video.actionsW
        }), e.min_controls && hide(o.parentNode), (e.min_controls || e.mute) && (html5video.volume = 0), ge("the_video").removeAttribute("controls", ""), show("menu_bk", "menu_controls"), html5video.updVol(), ge("video_title").innerHTML = html5video.vars.md_title || "", ge("video_author").innerHTML = html5video.vars.md_author || "", ge("video_author").href = html5video.vars.author_href, html5video.initVideoLinks(), html5video.addVideoListeners();
        var v = ge("html5_player");
        if (addEvent(v, "mouseover", html5video.showMenu), addEvent(v, "mouseout", html5video.hideMenu), addEvent(v, fullScreenApi.fullScreenEventName, html5video.onResize), html5video.fixed_player_size ? setStyle(v.parentNode, {
                width: html5video.fixedWidth,
                height: html5video.fixedHeight
            }) : setStyle(v.parentNode, {
                width: "100%",
                height: "100%"
            }), html5video.timeLabelW = getSize("time_label")[0], setStyle("time_label", {
                width: html5video.timeLabelW + "px"
            }), html5video.centerPopup(), html5video.updateActions(), e.thumb && (ge("the_video").parentNode.insertBefore(ce("img", {
                src: e.thumb,
                id: "video_thumb"
            }, {
                height: getSize(ge("html5_player"))[1],
                width: "auto",
                margin: "auto"
            }), ge("the_video")), hide("the_video")), html5video.updateRotation(), e.timeline_thumbs) {
            var a = "";
            each(e.timeline_thumbs_jpg.split(","), function(e) {
                a += '<img id="video_preview_tip_img_' + e + '" src="' + decodeURIComponent(this) + '" class="video_preview_tip_img">'
            }), ge("menu_controls").appendChild(se('<div id="video_preview_tip"><div id="video_preview_tip_img_wrap">' + a + '</div><div id="video_preview_tip_text"></div><div id="video_preview_tip_arrow"></div></div>'))
        }
        setStyle("video_preview_tip_img_wrap", {
            webkitTransform: "rotate(" + 90 * e.angle + "deg)",
            mozTransform: "rotate(" + 90 * e.angle + "deg)",
            msTransform: "rotate(" + 90 * e.angle + "deg)",
            transform: "rotate(" + 90 * e.angle + "deg)"
        }), html5video.onResize(), setInterval(function() {
            1 != html5video.moveState && (html5video.updTime(), html5video.addViewTimer())
        }, 100), (e.autoplay || html5video.timeFromStr(e.t)) && html5video.playVideo(!0, !0), window.videoCallback && videoCallback(["onInitialized"])
    },
    initVideoLinks: function() {
        var e = 0;
        this.vars.no_flv ? (show("button240"), this.max_res = 240, e++) : re("button240"), this.vars.hd >= 1 ? (show("button360"), this.max_res = 360, e++) : re("button360"), this.vars.hd >= 2 ? (show("button480"), this.max_res = 480, e++) : re("button480"), this.vars.hd >= 3 ? (show("button720"), this.max_res = 720, e++) : re("button720"), this.vars.hd >= 4 ? (show("button1080"), this.max_res = 1080, e++) : re("button1080"), setStyle(ge("quality_panel_wrap"), {
            top: -4 - 22 * e
        }), setStyle(ge("quality_bk"), {
            height: 22 * e - 5
        });
        var i = Math.min(this.max_res, intval(getCookie("video_quality") || 360)),
            t = this.timeFromStr(this.vars.t);
        this.changeQuality(i, !1, t)
    },
    addVideoListeners: function() {
        var e = ge("the_video");
        e.volume = html5video.volume, addEvent(ge("video_cont"), "mousewheel", html5video.docScroll), addEvent(e, "loadstart", html5video.onLoadStart), addEvent(e, "progress", html5video.onProgress), addEvent(e, "seeking", html5video.onSeeking), addEvent(e, "seeked", html5video.onSeeked), addEvent(e, "canplay", html5video.onCanPlay), addEvent(e, "play", html5video.onPlay), addEvent(e, "pause", html5video.onPause), addEvent(e, "error", html5video.onErr), addEvent(e, "durationchange", html5video.onDurationChange), addEvent(e, "ended", html5video.onEnded)
    },
    pathToHD: function(e) {
        var i, t = html5video.vars;
        return t.cacheData[e] ? t.cacheData[e] : !t.vtag && t.extra_data ? t.extra_data : t["url" + e] ? t["url" + e] : (i = "string" == typeof t.host && "http" == t.host.substr(0, 4) ? t.host : t.proxy ? (t.https ? "https://" : "http://") + t.proxy + ".vk.me/c" + t.host + "/" : "http://cs" + t.host + "." + locDomain + "/", t.ip_subm ? i + "u" + t.uid + "/videos/" + t.vtag + "." + e + ".mp4" : i + "u" + t.uid + "/video/" + t.vtag + "." + e + ".mp4")
    },
    changeQuality: function(e, i, t) {
        if (e != html5video.cur_res) {
            html5video.cur_res = e, html5video.onPause(), ge("quality_val").innerHTML = e, toggle("quality_val_hd", e > 480), toggle("quality_val_arrow", 720 > e), each(geByTag("button", ge("quality_panel")), function() {
                removeClass(this, "selected")
            });
            var d = ge("button" + e);
            d && addClass(d, "selected"), toggleClass(ge("popup1"), "show_hd", html5video.max_res > 480 && html5video.cur_res < 720);
            var o = ge("the_video");
            html5video.changeQualityTime = o.currentTime, o.pause(), html5video.incViewTimer && html5video.incViewTimer.pause(), html5video.incSmallViewTimer && html5video.incSmallViewTimer.pause(), o.currentTime && (hide("popup1"), html5video.showLoading()), animate(ge("menu_layer"), {
                bottom: 36
            }, 200), removeClass("popup_actions", "hidden"), removeClass(o, "no_cursor"), o.src = html5video.pathToHD(e) + (t > 0 && t < html5video.vars.duration ? "#t=" + t : ""), this.videoClicked && o.load();
            var l = html5video.vars,
                n = 0;
            if (window.videoCallback && l.oid && l.vid && l.hash) {
                switch (e) {
                    case 1080:
                        n = 4;
                        break;
                    case 720:
                        n = 3;
                        break;
                    case 480:
                        n = 2;
                        break;
                    case 360:
                        n = 1;
                        break;
                    case 240:
                    default:
                        n = 0
                }
                videoCallback(["onVideoResolutionChanged", l.oid, l.vid, l.hash, n])
            }
            html5video.playStarted = !1, i && setCookie("video_quality", e, 365)
        }
    },
    onResize: function() {
        if (ge("the_video")) {
            var e = html5video.minSize = getSize("bg")[0] < 500;
            html5video.centerPopup(), addClass("popup_actions", "no-transition"), toggleClass("popup_actions", "popup_actions_min", e), toggleClass("time_label", "time_label_min", e), setStyle("time_label", {
                width: e ? Math.round((html5video.timeLabelW - 11) / 2) : html5video.timeLabelW
            }), e ? (ge("volume_dropdown").appendChild(ge("vid_vol")), hide("vid_vol_cell")) : (ge("vid_vol_cell").appendChild(ge("vid_vol")), show("vid_vol_cell")), html5video.calcPrLineW(), html5video.updateActions(), ge("video_thumb") && setStyle(ge("video_thumb"), {
                height: getSize(ge("html5_player"))[1]
            }), html5video.videoFinished && ge("vid_finish_layer") && html5video.resizeFinishScreen(), setTimeout(function() {
                removeClass("popup_actions", "no-transition")
            }, 0)
        }
    },
    playVideo: function(e, i) {
        var t = ge("the_video"),
            d = this.vars;
        !t || e === !0 && !t.paused || e === !1 && t.paused || (re("video_thumb"), show(t), this.videoClicked || (t.load(), this.videoClicked = !0), this.videoFinished && (html5video.videoFinished = !1, re(ge("vid_finish_layer")), html5video.nextTimerReset(), html5video.nextTimerStopped = !1, html5video.showMenu(), hide(ge("replay_button").parentNode), show(ge("play_button").parentNode)), this.addViewTimer(), t.paused ? (t.play(), this.incViewTimer && this.incViewTimer.resume(), this.incSmallViewTimer && this.incSmallViewTimer.resume(), window.videoCallback && videoCallback(["onVideoStreamPlaying", d.oid, d.vid, d.hash])) : (t.pause(), this.incViewTimer && this.incViewTimer.pause(), this.incSmallViewTimer && this.incSmallViewTimer.pause()), i || this.touchedByUser || (this.touchedByUser = !0, this.volume = this.lastVolume, this.updVol()))
    },
    nextVideo: function(e, i, t) {
        html5video.nextTimerReset(), videoCallback(["onVideoNext", e, i, t])
    },
    isMinimized: function() {
        return !(!window.mvcur || !mvcur.minimized)
    },
    showFinishLayer: function() {
        var e = html5video.vars,
            i = '      <div class="vid_finish_layer_bk" onclick="html5video.onFinishLayerClick()"></div>      <div id="vid_finish_title" class="vid_finish_title">' + e.md_title + '</div>      <div id="vid_finish_actions" class="vid_finish_actions clear_fix">        <div id="vid_finish_like" class="vid_finish_like fl_l ' + (html5video.liked ? "selected" : "") + '" onclick="html5video.onLike(2)"><div id="vid_finish_like_bg" class="vid_finish_like_bg"></div><div id="vid_finish_like_fg" class="vid_finish_like_fg"></div><div id="vid_finish_liked_fg" class="vid_finish_liked_fg"></div></div>        <div id="vid_finish_share" class="vid_finish_share fl_l" onclick="html5video.onShare(2)"><div id="vid_finish_share_bg" class="vid_finish_share_bg"></div><div id="vid_finish_share_fg" class="vid_finish_share_fg"></div></div>        ' + (e.viewer_id !== e.oid && e.can_add ? '<div id="vid_finish_add" class="vid_finish_add fl_l ' + (html5video.added ? "selected" : "") + '" onclick="html5video.onAdd(2)"><div id="vid_finish_add_bg" class="vid_finish_add_bg"></div><div id="vid_finish_add_fg" class="vid_finish_add_fg"></div><div id="vid_finish_added_fg" class="vid_finish_added_fg"></div></div>' : "") + '      </div>      <div>        <div id="vid_finish_content" class="vid_finish_content"></div>      </div>',
            t = ce("div", {
                id: "vid_finish_layer",
                className: "vid_finish_layer"
            });
        t.innerHTML = i, hide(ge("popup1")), ge("html5_player").insertBefore(t, ge("menu_layer")), html5video.resizeFinishScreen()
    },
    showFinishExtendedLayer: function() {
        var e = html5video.vars,
            i = e.viewer_id !== e.oid && e.can_add,
            t = '      <div class="vid_finish_layer_bk" onclick="html5video.onFinishLayerClick()"></div>      <div id="vid_finish_title" class="vid_finish_title">' + e.md_title + '</div>      <div id="vid_finish_actions" class="vid_finish_actions vid_finish_extended_actions clear_fix">        <div id="vid_finish_like" class="vid_finish_like vid_finish_extended_like fl_l ' + (html5video.liked ? "selected" : "") + '"' + (i ? "" : ' style="width:230px"') + ' onclick="html5video.onLike(3)"><div id="vid_finish_like_bg" class="vid_finish_like_bg"></div><div id="vid_finish_like_fg" class="vid_finish_like_fg"></div><div id="vid_finish_liked_fg" class="vid_finish_liked_fg"></div><div id="vid_finish_like_text" class="vid_finish_like_text">' + e.lang_like + "</div></div>        " + (i ? '<div id="vid_finish_add" class="vid_finish_add vid_finish_extended_add fl_l ' + (html5video.added ? "selected" : "") + '" onclick="html5video.onAdd(3)"><div id="vid_finish_add_bg" class="vid_finish_add_bg"></div><div id="vid_finish_add_fg" class="vid_finish_add_fg"></div><div id="vid_finish_added_fg" class="vid_finish_added_fg"></div></div>' : "") + '        <div id="vid_finish_share" class="vid_finish_share vid_finish_extended_share fl_l" onclick="html5video.onShare(3)"><div id="vid_finish_share_bg" class="vid_finish_share_bg"></div><div id="vid_finish_share_fg" class="vid_finish_share_fg"></div><div id="vid_finish_share_text" class="vid_finish_share_text">' + e.lang_share + '</div></div>      </div>      <div>        <div id="vid_finish_content" class="vid_finish_content"></div>      </div>',
            d = ce("div", {
                id: "vid_finish_layer",
                className: "vid_finish_layer vid_finish_layer_extended"
            });
        d.innerHTML = t, hide(ge("popup1")), ge("html5_player").insertBefore(d, ge("menu_layer")), html5video.resizeFinishScreen()
    },
    showNextVideoLayer: function() {
        var e = html5video.vars,
            i = html5video.nextVideosData[0];
        html5video.showFinishLayer();
        var t = '      <div id="vid_next_video" class="vid_next_video" onmouseover="html5video.nextThumbOver()" onmouseout="html5video.nextThumbOut()" onclick="html5video.nextVideo(\'' + i.vid + '\', true, false)">        <div class="vid_next_video_caption">' + e.lang_next + '</div>        <div class="vid_next_video_thumb" style="background-image: url(' + i.thumb + ')"></div>        <div class="vid_next_video_thumb_darken"></div>        <div id="vid_next_video_timer" class="vid_next_video_timer">          <canvas id="vid_next_video_timer_canvas" class="vid_next_video_timer_canvas" width="100" height="100"></canvas>          <div class="vid_next_video_play"></div>        </div>        <div class="vid_next_video_info">          <div class="vid_next_video_title">' + i.title + '</div>          <div class="vid_next_video_views">' + i.views + '</div>        </div>        <div class="vid_next_video_cancel" onclick="html5video.nextCancel(event)"></div>      </div>';
        ge("vid_finish_content").innerHTML = t, html5video.resizeFinishScreen(), html5video.nextTimerStopped || html5video.nextTimerStart()
    },
    showSuggestionsLayer: function() {
        html5video.vars, html5video.nextVideosData[0];
        contentHtml = "", html5video.showFinishLayer(), contentHtml += '<div id="vid_suggestions" class="vid_suggestions hidden clear_fix">', each(html5video.nextVideosData, function() {
            contentHtml += '        <div class="vid_suggestions_item fl_l" onclick="html5video.nextVideo(\'' + this.vid + '\')">          <div class="vid_suggestions_item_thumb" style="background-image:url(' + this.thumb + ')"></div>          <div class="vid_suggestions_item_title">' + this.title + '</div>          <div class="vid_suggestions_item_views">' + this.views + "</div>        </div>"
        }), contentHtml += "</div>", ge("vid_finish_content").innerHTML = contentHtml, html5video.resizeFinishScreen(), setTimeout(function() {
            removeClass(ge("vid_suggestions"), "hidden")
        }, 0)
    },
    onFinishLayerClick: function(e) {
        html5video.playVideo(!0)
    },
    resizeFinishScreen: function() {
        var e = ge("vid_finish_layer"),
            i = getSize(ge("bg"));
        if (e) {
            if (ge("vid_next_video") && (i[0] < 400 || i[1] < 300) || ge("vid_suggestions") && (i[0] < 580 || i[1] < 300) || hasClass(e, "vid_finish_layer_extended") && (i[0] < 250 || i[1] < 200)) return html5video.nextTimerReset(), re(e), void html5video.showFinishLayer();
            setStyle("vid_finish_title", {
                display: html5video.isMinimized() ? "none" : null
            });
            var t = ge("vid_finish_actions"),
                d = ge("vid_finish_content"),
                o = getSize(t),
                l = getSize(d);
            d && l[0] && l[1] ? (setStyle(t, {
                left: i[0] / 2 - o[0] / 2 + "px",
                top: i[1] / 2 - 110 + "px"
            }), setStyle(d, {
                left: i[0] / 2 - l[0] / 2 + "px",
                top: i[1] / 2 - 25 + "px"
            })) : setStyle(t, {
                left: i[0] / 2 - o[0] / 2 + "px",
                top: i[1] / 2 - o[1] / 2 - 10 + "px"
            })
        }
    },
    nextThumbOver: function() {},
    nextThumbOut: function() {},
    nextCancel: function(e) {
        e.stopPropagation(), html5video.nextTimerReset(), re(ge("vid_finish_layer")), html5video.showSuggestionsLayer()
    },
    nextTimerStart: function() {
        html5video.nextTimerStopped = !1, ge("vid_next_video") && !html5video.nextTimer && html5video.canvasSupport() && (html5video.nextTimerStarted = (new Date).getTime(), html5video.nextTimerCtx = ge("vid_next_video_timer_canvas").getContext("2d"), html5video.nextTimerCtx.lineWidth = 6, html5video.nextTimerCtx.lineCap = "round", html5video.nextTimerCtx.strokeStyle = "#fff", html5video.nextTimerTick())
    },
    nextTimerTick: function() {
        var e = ((new Date).getTime() - html5video.nextTimerStarted) / 1e4;
        if (1 > e) {
            var i = html5video.nextTimerCtx;
            i.clearRect(0, 0, 100, 100), i.beginPath(), i.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * e), i.stroke(), html5video.nextTimer = setTimeout(html5video.nextTimerTick, 20)
        } else html5video.nextVideo(html5video.nextVideosData[0].vid, !0, !0)
    },
    nextTimerReset: function() {
        html5video.nextTimerStopped = !0, html5video.nextTimer && (clearTimeout(html5video.nextTimer), html5video.nextTimerCtx.clearRect(0, 0, 100, 100), html5video.nextTimer = null, html5video.nextTimerCtx = null, html5video.nextTimerStarted = null)
    },
    canvasSupport: function() {
        return !!window.CanvasRenderingContext2D
    },
    onLike: function(e, i) {
        html5video.liked = !html5video.liked;
        var t = html5video.liked;
        i || videoCallback(["onLike", e]), t ? addClass(ge("vid_like"), "selected") : removeClass(ge("vid_like"), "selected"), t ? addClass(ge("vid_finish_like"), "selected") : removeClass(ge("vid_finish_like"), "selected")
    },
    onShare: function(e) {
        fullScreenApi.isFullScreen() && fullScreenApi.cancelFullScreen(), html5video.nextTimerReset(), videoCallback(["onShare", e])
    },
    onAdd: function(e, i) {
        html5video.added = !html5video.added;
        var t = html5video.added;
        vars = html5video.vars, i || (t ? videoCallback(["onAdd", vars.oid + "_" + vars.vid, vars.add_hash, e]) : videoCallback(["onRemove", e])), t ? addClass(ge("vid_add"), "selected") : removeClass(ge("vid_add"), "selected"), t ? addClass(ge("vid_finish_add"), "selected") : removeClass(ge("vid_finish_add"), "selected")
    },
    onLiked: function() {
        html5video.onLike(null, !0)
    },
    onAdded: function() {
        html5video.onAdd(null, !0)
    },
    addViewTimer: function() {
        var e = ge("the_video"),
            i = this.vars;
        !this.incViewTimer && e && e.duration && (this.incViewTimer = new VideoTimer(function() {
            window.videoCallback && !html5video.incViewSent && i.oid && i.vid && i.hash && (html5video.incViewSent = !0, videoCallback(["incViewCounter", i.oid, i.vid, i.hash, html5video.cur_res, html5video.max_res, "html5", "big"]))
        }, e.duration > 5 ? 5e3 : 900 * e.duration), e.paused && this.incViewTimer.pause()), !this.incSmallViewTimer && e && e.duration && (this.incSmallViewTimer = new VideoTimer(function() {
            window.videoCallback && !html5video.incSmallViewSent && i.oid && i.vid && i.hash && (html5video.incSmallViewSent = !0, videoCallback(["incViewCounter", i.oid, i.vid, i.hash, html5video.cur_res, html5video.max_res, "html5", "small"]))
        }, e.duration > 1 ? 1e3 : 900 * e.duration), e.paused && this.incSmallViewTimer.pause())
    },
    showMenu: function(e) {
        html5video.inside = 1, animate(ge("menu_layer"), {
            bottom: 36
        }, 200), html5video.videoFinished || removeClass("popup_actions", "hidden"), removeClass(ge("the_video"), "no_cursor")
    },
    hideMenu: function(e) {
        var i = ge("the_video");
        html5video.inside = 0, i && !i.paused && (html5video.hideMenuTO = setTimeout(function() {
            0 != html5video.inside || 0 != html5video.moveState || html5video.isMenuOver || (html5video.hideResMenu(!0), html5video.hideTip(), html5video.hidePreviewTip(), animate(ge("menu_layer"), {
                bottom: 0
            }, 200), addClass("popup_actions", "hidden"), addClass(ge("the_video"), "no_cursor"))
        }, 0))
    },
    onMenuOver: function() {
        html5video.isMenuOver = !0
    },
    onMenuOut: function() {
        html5video.isMenuOver = !1, html5video.updateMenu()
    },
    unhideMenu: function() {
        html5video.hideMenuTO && clearTimeout(html5video.hideMenuTO)
    },
    updateMenu: function() {
        if (html5video.fsHideTO && clearTimeout(html5video.fsHideTO), fullScreenApi.isFullScreen()) {
            var e = parseInt(getStyle(ge("menu_layer"), "bottom"));
            0 === e && html5video.showMenu(), html5video.fsHideTO = setTimeout(html5video.hideMenu, 1e3)
        }
    },
    defX: function(e) {
        return intval(e.clientX + (window.scrollX || 0))
    },
    defY: function(e) {
        return intval(e.clientY + (window.scrollY || 0))
    },
    centerPopup: function() {
        var e, i, t = getSize("bg");
        e = t[0] < 300 || t[1] < 250 ? 2 : html5video.vars.min_controls || t[0] < 400 ? 1 : 0, toggleClass("popup1", "min", 2 == e), toggleClass("popup1", "small", e >= 1), show("popup_bk", "video_title", "big_play", "video_author"), i = getSize("popup1"), setStyle("loading_gif2", {
            left: (t[0] - 64) / 2,
            top: (t[1] - 16) / 2
        }), setStyle("popup1", {
            position: "absolute",
            left: (t[0] - i[0]) / 2,
            top: (t[1] - i[1]) / 2
        })
    },
    addZero: function(e) {
        return e = intval(e), 10 > e ? "0" + e : e
    },
    formatTime: function(e) {
        var i, t, d;
        return i = parseInt(e), t = parseInt(i / 60), i %= 60, d = parseInt(t / 60), t %= 60, (d > 0 ? d + ":" + html5video.addZero(t) : t) + ":" + html5video.addZero(i)
    },
    timeFromStr: function(e) {
        var i = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/,
            t = "string" == typeof e ? e.match(i) : null;
        return t ? (3600 * t[1] || 0) + (60 * t[2] || 0) + (+t[3] || 0) : 0
    },
    timeToStr: function(e) {
        var i = "";
        return e >= 3600 && (i += Math.floor(e / 3600) + "h", e %= 3600), e >= 60 && (i += Math.floor(e / 60) + "m", e %= 60), e > 0 && (i += Math.floor(e) + "s"), i
    },
    updTime: function() {
        var e = html5video.vars,
            i = ge("the_video");
        if (i) {
            var t = i.currentTime || 0,
                d = i.duration || e.duration || 0,
                o = Math.min(100, Math.max(0, d > 0 ? 100 * t / d : 0));
            setStyle(ge("progress_line"), {
                width: o + "%"
            }), ge("curtime").innerHTML = html5video.reversed && html5video.minSize ? html5video.formatTime(d - t) : html5video.formatTime(t), ge("duration").innerHTML = html5video.formatTime(d)
        }
    },
    updVol: function() {
        var e = html5video.volume,
            i = ge("volume_button");
        e > .5 ? i.setAttribute("value", "max") : e > .2 ? i.setAttribute("value", "ave") : e > 0 ? i.setAttribute("value", "min") : i.setAttribute("value", "off"), setStyle(ge("volume_line"), {
            width: Math.min(100, Math.max(0, 100 * e)) + "%"
        }), ge("the_video").volume = e
    },
    changeVol: function(e) {
        var i = this.volume + e * this.volStep;
        this.volume = Math.min(1, Math.max(0, i)), this.updVol(), this.showTip(Math.round(100 * this.volume) + "%", getXY(ge("volume_line"))[0] + getSize("volume_line")[0] - getXY(ge("html5_player"))[0])
    },
    changePr: function(e) {
        var i = html5video.vars,
            t = ge("the_video"),
            d = (t.currentTime || 0) + e * this.prStep;
        t.currentTime = Math.min(t.duration || i.duration || 0, Math.max(0, d)), this.updTime()
    },
    showLoading: function() {
        toggle("video_cont", !this.notLoaded), toggle("loading_gif2", !!this.notLoaded)
    },
    calcPrLineW: function() {
        html5video.prLineW = getSize(ge("pr_back_line"))[0], html5video.updTime()
    },
    updateActions: function() {
        var e = ["quality_btn", "time_label_cell", "fullscreen_btn"],
            i = {
                quality_btn: 39,
                time_label_cell: (html5video.minSize ? (html5video.timeLabelW - 11) / 2 : html5video.timeLabelW) + 14,
                fullscreen_btn: 25
            };
        html5video.noQualityBtn && (e = e.slice(1)), html5video.vars.is_inline && (fullScreenApi.isFullScreen() ? isVisible("popup_btn") && (hide("popup_btn"), html5video.maxActionsW -= 28) : isVisible("popup_btn") || (show("popup_btn"), html5video.maxActionsW += 28));
        var t = ge("video_actions");
        for (var d in e) show(e[d]);
        if (html5video.actionsW = html5video.maxActionsW, setStyle(t, {
                minWidth: html5video.actionsW
            }), html5video.calcPrLineW(), html5video.prLineW < html5video.minPrW)
            for (var d in e)
                if (hide(e[d]), html5video.actionsW -= i[e[d]], setStyle(t, {
                        minWidth: html5video.actionsW
                    }), html5video.calcPrLineW(), html5video.prLineW >= html5video.minPrW) break
    },
    htmlCode: function() {
        return '  <div id="html5_player">    <div id="bg" class="bg" onclick="html5video.playVideo()">      <div id="loading_gif2" class="loading_gif2"></div>      <div id="video_cont">        <video id="the_video" width="100%" height="100%" onloadedmetadata="html5video.onMetadata()" preload="none"' + (this.vars.jpg ? ' poster="' + this.vars.jpg + '"' : "") + '>          HTML5 not supported.<br>        </video>      </div>    </div>    <div id="menu_layer">      <div id="menu_bk"></div>        <div id="menu_controls" onmouseenter="html5video.onMenuOver()" onmouseleave="html5video.onMenuOut()">          <div id="video_tip_wrap">            <div id="video_tip_bk"></div>            <div id="video_tip"></div>            <div id="video_tip_arrow"></div>          </div>          <table border="0" cellpadding="0" cellspacing="0" ondragstart="cancelEvent(event); return false" onstartselect="cancelEvent(event); return false">            <tr>              <td style="padding:10px 14px 0px 12px">                <div id="play_button" class="play_button" onclick="html5video.playVideo()"></div>              </td>              <td style="padding:9px 10px 0px 10px; display:none">                <div id="replay_button" class="replay_button" onclick="html5video.playVideo()"></div>              </td>              <td style="padding:12px 12px 0px 0; display:none">                <div id="next_button" class="next_button" onmouseover="html5video.nextOver(this, event)" onmouseout="html5video.nextOut(this, event)"  onclick="html5video.nextVideo(null)"></div>              </td>              <td width="100%" style="padding:16px 0 0">                <div id="vid_pr" onmouseover="html5video.sliderOver(this, event)" onmouseout="html5video.sliderOut(this, event)" onmousedown="html5video.prClick(event)">                  <div id="pr_white_line" class="white_line"></div>                  <div id="pr_back_line" class="back_line"><!-- --></div>                  <div id="pr_load_line" class="load_line"><!-- --></div>                  <div id="progress_line" class="progress_line">                    <div id="progress_slider" class="slider"><!-- --></div>                  </div>                </div>              </td>              <td style="padding:11px 0 0 14px" id="time_label_cell">                <div id="time_label" class="time_label" onclick="html5video.onTimeClick(this)">                  <span id="curtime" class="time1_text">' + this.formatTime(this.vars.duration || 0) + '</span>                  <span id="duration" class="time2_text">' + this.formatTime(this.vars.duration || 0) + '</span>                </div>              </td>              <td style="padding:11px 0 0px 16px">                <div id="volume_wrap" class="volume_wrap" onmouseover="html5video.volumeBtnOver(this, event)" onmouseout="html5video.volumeBtnOut(this, event)">                  <div id="volume_dropdown" class="volume_dropdown hidden">                    <div class="volume_dropdown_bk"></div>                  </div>                  <div id="volume_button" class="volume_button" value="ave" onclick="html5video.onVolumeBut()"></div>                </div>              </td>              <td style="padding:16px 13px 0 0" id="vid_vol_cell">                <div id="vid_vol" onmouseover="html5video.sliderOver(this, event)" onmouseout="html5video.sliderOut(this, event)" onmousedown="html5video.volClick(event)">                  <div id="vol_white_line" class="white_line"><!-- --></div>                  <div id="vol_back_line" class="load_line"><!-- --></div>                  <div id="volume_line" class="progress_line">                    <div id="volume_slider" class="slider"><!-- --></div>                  </div>                </div>              </td>              <td style="padding:9px 10px 5px 5px">                <div id="video_actions" class="clear_fix">                  <div id="quality_btn" class="quality_button fl_l" onclick="html5video.toggleResMenu()">                    <div class="quality_label">                      <div id="quality_val" class="quality_val" onmouseover="html5video.qualityOver(this, event);html5video.unhideResMenu()" onmouseout="html5video.qualityOut(this, event);html5video.hideResMenu()"></div>                      <div id="quality_val_arrow" class="quality_val_arrow"></div>                      <div id="quality_val_hd" class="quality_val_hd"></div>                    </div>                    <div id="quality_panel_wrap" class="quality_panel_wrap hidden fl_l" onmouseover="html5video.unhideResMenu()" onmouseout="html5video.hideResMenu()">                      <div id="quality_bk" class="quality_bk"></div>                      <div id="quality_panel" class="quality_panel">                        <button id="button1080" value="1080p" onclick="html5video.changeQuality(1080, true);"><span class="quality_item_text">1080</span><span class="quality_item_hd"></span></button>                        <button id="button720" value="720p" onclick="html5video.changeQuality(720, true);"><span class="quality_item_text">720</span><span class="quality_item_hd"></span></button>                        <button id="button480" value="480p" onclick="html5video.changeQuality(480, true);"><span class="quality_item_text">480</span></button>                        <button id="button360" value="360p" onclick="html5video.changeQuality(360, true);"><span class="quality_item_text">360</span></button>                        <button id="button240" value="240p" onclick="html5video.changeQuality(240, true);"><span class="quality_item_text">240</span></button>                      </div>                    </div>                  </div>                </div>              </td>            </tr>          </table>        </div>      </div>      <div id="popup1" onclick="html5video.playVideo()">        <div id="popup_bk" class="popup_bk"></div>        <div id="video_title" class="video_title"></div>        <div id="big_play" class="big_play" onmouseover="addClass(this, \'over\');" onmouseout="removeClass(this, \'over\');"></div>        <a id="video_author" class="video_author" target="_blank" onclick="event.stopPropagation();"></a>        <div id="video_show_hd" class="video_show_hd" onclick="return html5video.playHD()">' + (this.vars.video_play_hd || "Play HD") + '</div>      </div>      <div id="popup_actions" class="clear_fix" onmouseenter="html5video.onMenuOver()" onmouseleave="html5video.onMenuOut()"></div>     </div>'
    },
    transformAvailable: function() {
        if (void 0 !== cur.transformAvailable) return cur.transformAvailable;
        var e, i = "Webkit Moz o ms".split(" "),
            t = ce("div"),
            d = 0,
            o = "transform",
            l = void 0 != t.style[o];
        for (o = o.charAt(0).toUpperCase() + o.slice(1); !l && (e = i[d++]);) l = void 0 != t.style[e + o];
        return cur.transformAvailable = l, l
    },
    showTip: function(e, i, t) {
        ge("video_tip").innerHTML = e, show("video_tip_wrap");
        var d = getSize("video_tip")[0],
            o = getSize("html5_player")[0],
            l = i - d / 2,
            n = d / 2 - 3;
        l + d > o - 10 && (n -= o - d - l - 10, l = o - d - 10), t = intval(t), setStyle(ge("video_tip_bk"), {
            width: d,
            height: 13 - t
        }), setStyle(ge("video_tip_wrap"), {
            left: l,
            top: -13 + t
        }), setStyle(ge("video_tip_arrow"), {
            left: n
        }), html5video.tipTO && clearTimeout(html5video.tipTO), html5video.tipTO = setTimeout(html5video.hideTip, 1e3)
    },
    hideTip: function() {
        hide("video_tip_wrap")
    },
    showPreviewTip: function(e, i, t) {
        var d, o, l = html5video.vars,
            n = ge("video_preview_tip_img_" + Math.floor(t / l.timeline_thumbs_per_image)),
            v = -4,
            a = getSize("bg"),
            s = l.timeline_thumb_width,
            h = l.timeline_thumb_height,
            r = 50,
            m = Math.round(s / h * r),
            u = l.timeline_thumbs_per_row,
            _ = l.timeline_thumbs_per_image,
            c = l.timeline_thumbs_total;
        a[1] > 300 ? (setStyle(n, {
            width: Math.min(u, c) * s + "px",
            left: -s * (t % u) - 1 + "px",
            top: -h * Math.floor(t % _ / u) - 1 + "px"
        }), d = s - 2, o = h - 2) : (setStyle(n, {
            width: Math.min(u, c) * m + "px",
            left: -m * (t % u) - 1 + "px",
            top: -r * Math.floor(t % _ / u) - 1 + "px"
        }), d = m - 2, o = r - 2), setStyle("video_preview_tip_img_wrap", {
            width: d + "px",
            height: o + "px"
        }), each(ge("video_preview_tip_img_wrap").children, function() {
            this !== n ? hide(this) : show(this)
        }), 20 > i - d / 2 && (v += Math.round(i - (20 + d / 2)), i = Math.round(20 + d / 2)), setStyle("video_preview_tip_arrow", {
            marginLeft: v + "px"
        }), setStyle("video_preview_tip", {
            left: Math.round(i - d / 2 - 3) + "px",
            bottom: "30px"
        }), show("video_preview_tip");
        var p = ge("video_preview_tip_text");
        p.innerHTML = e;
        var g = getSize(p);
        setStyle(p, {
            marginLeft: -Math.round(g[0] / 2)
        })
    },
    hidePreviewTip: function() {
        hide("video_preview_tip")
    },
    toggleResMenu: function() {
        var e = !hasClass("quality_panel_wrap", "hidden");
        e && html5video.hideTip(), toggleClass("quality_panel_wrap", "hidden", e)
    },
    hideResMenu: function(e) {
        clearTimeout(html5video.hideResMenuTO), html5video.hideResMenuTO = setTimeout(function() {
            addClass("quality_panel_wrap", "hidden")
        }, e ? 0 : 1e3)
    },
    unhideResMenu: function() {
        html5video.hideResMenuTO && clearTimeout(html5video.hideResMenuTO)
    },
    updateFullscreen: function() {
        html5video.updateActions(), toggleClass(ge("fullscreen_btn"), "isfs", fullScreenApi.isFullScreen()), toggleClass(ge("html5_player"), "isfs", fullScreenApi.isFullScreen())
    },
    toggleFullscreen: function() {
        return fullScreenApi.supportsFullScreen && (fullScreenApi.isFullScreen() ? fullScreenApi.cancelFullScreen() : fullScreenApi.requestFullScreen(ge("html5_player"))), !1
    },
    playHD: function() {
        return this.changeQuality(this.max_res, !0), this.playHDClicked = !0, !1
    },
    likeClick: function() {
        var e = this.vars;
        intval(e.is_ext);
        videoCallback(["onLike"]), this.liked = !this.liked, this.liked ? (setStyle(ge("vid_like_fg"), {
            opacity: 0
        }), setStyle(ge("vid_liked_fg"), {
            opacity: .9
        })) : (setStyle(ge("vid_like_fg"), {
            opacity: null
        }), setStyle(ge("vid_liked_fg"), {
            opacity: null
        }))
    },
    linkClick: function() {
        var e = this.vars,
            i = ge("the_video");
        e.ads_link && (i.paused || this.playVideo(), window.open(e.ads_link, "_blank"), window.focus())
    },
    shareClick: function() {
        fullScreenApi.isFullScreen() && html5video.toggleFullscreen(), videoCallback(["onShare"])
    },
    logoClick: function() {
        var e = this.vars,
            i = ge("the_video");
        e.oid && e.vid && (i.paused || this.playVideo(), window.open("/video" + e.oid + "_" + e.vid, "_blank"), window.focus())
    },
    rotateVideo: function() {
        this.transformAvailable() && (this.angle += 90, this.updateRotation())
    },
    openVideoPopup: function() {
        var e = html5video.vars,
            i = ge("the_video"),
            t = i ? html5video.timeToStr(i.currentTime) : "";
        videoRaw = e.oid + "_" + e.vid, fullScreenApi.isFullScreen() && html5video.toggleFullscreen(), videoCallback(["onOpenInPopup", videoRaw, e.list_id, t])
    },
    addClick: function() {
        var e = this.vars;
        this.added = !this.added, this.added ? (videoCallback(["onAdd", e.oid + "_" + e.vid, e.add_hash]), setStyle(ge("vid_add_fg"), {
            transform: "scale(0)",
            opacity: 0
        }), setStyle(ge("vid_added_fg"), {
            transform: "scale(1)",
            opacity: .7
        })) : (videoCallback(["onRemove"]), setStyle(ge("vid_add_fg"), {
            transform: null,
            opacity: null
        }), setStyle(ge("vid_added_fg"), {
            transform: null,
            opacity: null
        }))
    },
    updateRotation: function() {
        if (this.transformAvailable()) {
            var e = ge("the_video"),
                i = ge("video_thumb"),
                t = ge("rotate_btn"),
                d = getSize("html5_player"),
                o = this.angle % 180 ? d[1] / d[0] : 1;
            e.style.webkitTransform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")", e.style.msTransform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")", e.style.MozTransform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")", e.style.transform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")", i && (i.style.webkitTransform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")", i.style.msTransform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")", i.style.MozTransform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")", i.style.transform = "rotate(" + this.angle + "deg) scale(" + o + ", " + o + ")"), t && (t.style.webkitTransform = "rotate(" + this.angle + "deg)", t.style.msTransform = "rotate(" + this.angle + "deg)", t.style.MozTransform = "rotate(" + this.angle + "deg)", t.style.transform = "rotate(" + this.angle + "deg)")
        }
    },
    updateRepeat: function(e) {
        html5video.vars && (html5video.vars.repeat = intval(e) ? 1 : 0)
    },
    onMetadata: function() {
        var e = ge("the_video"),
            i = (ge("html5_player"), ge("bg")),
            t = (html5video.vars, e.videoWidth / e.videoHeight, "100%"),
            d = "100%";
        i.style.height = d, e.style.height = d, i.style.width = t, e.style.width = t, html5video.fixed_player_size && (t = html5video.fixedWidth, d = html5video.fixedHeight), ge(video_box_id).style.height = d, ge(video_box_id).style.width = t;
        var o = document.getElementsByClassName("popup_box_container")[0];
        o && !cur.snapsterIsLayer && (o.style.width = html5video.cur_res > 240 ? "629px" : "502px"), html5video.updateActions(), html5video.centerPopup(), animate(ge("menu_layer"), {
            bottom: 36
        }, 200), removeClass("popup_actions", "hidden"), removeClass(e, "no_cursor")
    },
    onDurationChange: function() {
        html5video.updTime()
    },
    onErr: function(e) {
        window.debugLog && debugLog("html5 videoplayer error: ", e.target.error)
    },
    onPlay: function() {
        html5video.showLoading(), ge("play_button").className = "pause_button", hide("popup1")
    },
    onPause: function() {
        var e = ge("the_video"),
            i = html5video.vars;
        !e || i.repeat && e.duration && Math.abs(e.duration - e.currentTime) < 1 || (ge("play_button") && (ge("play_button").className = "play_button"), show("popup1"), html5video.showMenu())
    },
    onProgress: function() {
        var e = ge("the_video"),
            i = 0;
        if (e && e.buffered.length) {
            for (var t = e.currentTime, d = 0, o = e.buffered.length; o > d; d++)
                if (e.buffered.start(d) < t && t < e.buffered.end(d)) {
                    i = e.buffered.end(d) / e.duration;
                    break
                }
            i = Math.min(1, Math.max(0, i)), setStyle(ge("pr_load_line"), {
                width: 100 * i + "%"
            })
        }
    },
    onLoadStart: function() {
        html5video.notLoaded = 1, html5video.onProgress()
    },
    onSeeking: function() {
        html5video.notLoaded = 1, html5video.showLoading(), html5video.videoClicked = !0, ge("the_video").pause(), html5video.playVideo()
    },
    onSeeked: function() {
        html5video.notLoaded = 0, html5video.showLoading()
    },
    onCanPlay: function() {
        html5video.notLoaded = 0, html5video.showLoading();
        var e = ge("the_video"),
            i = html5video.vars;
        html5video.changeQualityTime ? (e.currentTime = html5video.changeQualityTime, show(e), delete html5video.changeQualityTime, e.play(), html5video.incViewTimer && html5video.incViewTimer.resume(), html5video.incSmallViewTimer && html5video.incSmallViewTimer.resume()) : html5video.playHDClicked && (show(e), delete html5video.playHDClicked, e.play(), html5video.incViewTimer && html5video.incViewTimer.resume(), html5video.incSmallViewTimer && html5video.incSmallViewTimer.resume()), window.videoCallback && !html5video.playStarted && i.oid && i.vid && i.hash && (html5video.playStarted = !0, videoCallback(["onVideoPlayStarted", i.oid, i.vid, i.hash]))
    },
    onEnded: function() {
        var e = ge("the_video"),
            i = html5video.vars;
        if (e) {
            if (i.repeat) return e.currentTime = 0, html5video.updTime(), void e.play();
            if (html5video.videoFinished = !0, e.pause(), html5video.incViewTimer && html5video.incViewTimer.pause(), html5video.incSmallViewTimer && html5video.incSmallViewTimer.pause(), setStyle(ge("menu_layer"), {
                    bottom: 36
                }), addClass("popup_actions", "hidden"), removeClass(e, "no_cursor"), fullScreenApi.isFullScreen() && html5video.toggleFullscreen(), hide(ge("play_button").parentNode), show(ge("replay_button").parentNode), 0 == i.is_ext) {
                var t = getSize(ge("bg"));
                i.min_controls || i.nolikes || (i.show_next && t[0] > 400 && t[1] > 300 && (html5video.nextVideosData = Videoview.getNextVideosData()) ? html5video.showNextVideoLayer() : t[0] > 250 && t[1] > 200 ? html5video.showFinishExtendedLayer() : html5video.showFinishLayer()), window.videoCallback && videoCallback(["onVideoPlayFinished"])
            }
        }
    },
    prClick: function(e) {
        e.preventDefault(), checkEvent(e) || (html5video.onPrMove(e), html5video.moveState = 1, addClass(ge("vid_pr"), "down"))
    },
    volClick: function(e) {
        e.preventDefault(), html5video.onVolMove(e), html5video.moveState = 2, addClass(ge("vid_vol"), "down")
    },
    onPrMove: function(e) {
        var i = html5video.vars,
            t = getXY(ge("progress_line")),
            d = ge("the_video"),
            o = html5video.prLineW ? (html5video.defX(e) - t[0] + (fullScreenApi.isFullScreen() ? getXY(ge("html5_player"))[0] : 0)) / html5video.prLineW : 0;
        o = Math.min(1, Math.max(0, o)), d.currentTime = (d.duration || i.duration) * o, d.play(), html5video.updTime()
    },
    onVolMove: function(e) {
        var i = getSize("html5_player")[0] < 500 ? 1 : 0;
        xy = getXY(ge("volume_line")), video = ge("the_video"), percent = html5video.volLineW ? ((i ? xy[1] - html5video.defY(e) : html5video.defX(e) - xy[0]) + (fullScreenApi.isFullScreen() ? getXY(ge("html5_player"))[i] : 0)) / html5video.volLineW : 0, percent = Math.min(1, Math.max(0, percent)), html5video.volume = percent, html5video.updVol(), i || html5video.showTip(Math.round(100 * percent) + "%", getXY(ge("volume_slider"))[0] - getXY(ge("html5_player"))[0] + 3, -2), html5video.touchedByUser = !0
    },
    onVolumeBut: function() {
        html5video.volume > 0 ? (html5video.lastVolume = html5video.volume, html5video.volume = 0) : html5video.volume = html5video.lastVolume, html5video.updVol(), html5video.volumeBtnOver(ge("volume_button"), window.event), html5video.touchedByUser = !0
    },
    sliderOver: function(e, i) {
        addClass(e, "over")
    },
    sliderOut: function(e, i) {
        removeClass(e, "over"), this.hideTip(), this.hidePreviewTip()
    },
    nextOver: function(e, i) {
        var t = html5video.vars,
            d = t.lang_next || "Next video";
        this.showTip(d, getXY(e)[0] - getXY(ge("html5_player"))[0] + 9)
    },
    nextOut: function() {
        this.hideTip()
    },
    linkOver: function() {},
    linkOut: function() {},
    onTimeClick: function(e) {
        var i = getSize("bg");
        i[0] > 500 || (html5video.reversed = !html5video.reversed, toggleClass(e, "time_label_reversed", html5video.reversed))
    },
    volumeBtnOver: function(e, i) {
        var t = ge("the_video").volume,
            d = this.vars,
            o = t > 0 ? d.lang_volume_off || "Mute" : d.lang_volume_on || "Unmute";
        html5video.minSize && html5video.transformAvailable() ? removeClass("volume_dropdown", "hidden") : this.showTip(o, getXY(e)[0] - getXY(ge("html5_player"))[0] + 7, -5)
    },
    volumeBtnOut: function(e, i) {
        html5video.minSize && html5video.transformAvailable() ? 2 !== html5video.moveState && addClass("volume_dropdown", "hidden") : this.hideTip()
    },
    rotateOver: function(e, i) {
        var t = this.vars.lang_rotate || "Rotate";
        this.showTip(t, getXY(e)[0] - getXY(ge("html5_player"))[0] + 7)
    },
    rotateOut: function(e, i) {
        this.hideTip()
    },
    openPopupOver: function(e, i) {
        var t = this.vars.lang_open_popup || "Open in popup";
        this.showTip(t, getXY(e)[0] - getXY(ge("html5_player"))[0] + 9, -5)
    },
    openPopupOut: function(e, i) {
        this.hideTip()
    },
    fullscreenOver: function(e, i) {
        var t = this.vars,
            d = fullScreenApi.isFullScreen() ? t.lang_window || "Minimize" : t.lang_fullscreen || "Full Screen";
        this.showTip(d, getXY(e)[0] - getXY(ge("html5_player"))[0] + 7, -5)
    },
    fullscreenOut: function(e, i) {
        this.hideTip()
    },
    qualityOver: function(e, i) {
        var t = this.vars.lang_hdsd || "Change Video Quality";
        isVisible("quality_panel_wrap") || this.showTip(t, getXY(e)[0] - getXY(ge("html5_player"))[0] + (getSize(e)[0] - 9) / 2, -4)
    },
    qualityOut: function(e, i) {
        this.hideTip()
    },
    logoOver: function(e, i) {
        var t = vars.goto_orig_video || "Go to original video";
        this.showTip(t, getXY(e)[0] - getXY(ge("html5_player"))[0] + 6)
    },
    logoOut: function(e, i) {
        this.hideTip()
    },
    docKeyPressed: function(e) {
        var i = ge("the_video");
        if (i && (html5video.inside || fullScreenApi.isFullScreen())) {
            switch (e.keyCode) {
                case KEY.DOWN:
                    html5video.changeVol(-1);
                    break;
                case KEY.UP:
                    html5video.changeVol(1);
                    break;
                case KEY.LEFT:
                    html5video.changePr(-1);
                    break;
                case KEY.RIGHT:
                    html5video.changePr(1);
                    break;
                case KEY.SPACE:
                    html5video.playVideo()
            }
            cancelEvent(e), html5video.updateMenu()
        }
    },
    docScroll: function(e) {
        if (fullScreenApi.isFullScreen()) {
            var i = e.wheelDelta ? e.wheelDelta / 120 : e.detail / -3;
            html5video.changeVol(i > 0 ? 1 : -1), html5video.updateMenu()
        }
    },
    docMouseUp: function() {
        switch (html5video.moveState) {
            case 1:
                removeClass("vid_pr", "down"), html5video.hideTip(), html5video.hidePreviewTip();
                break;
            case 2:
                removeClass("vid_vol", "down"), html5video.minSize && html5video.transformAvailable() ? addClass("volume_dropdown", "hidden") : html5video.hideTip()
        }
        html5video.moveState = 0, 0 == html5video.inside && html5video.hideMenu()
    },
    docMouseMove: function(e) {
        var i = html5video.vars,
            t = ge("the_video"),
            d = t && t.duration || i.duration;
        if (1 == html5video.moveState ? html5video.onPrMove(e) : 2 == html5video.moveState && html5video.onVolMove(e), (1 == html5video.moveState || hasClass("vid_pr", "over")) && d) {
            var o = getXY("html5_player")[0],
                l = getXY("progress_line")[0],
                n = html5video.prLineW,
                v = html5video.defX(e) - l + (fullScreenApi.isFullScreen() ? o : 0),
                a = Math.min(1, Math.max(0, html5video.prLineW ? v / html5video.prLineW : 0)),
                s = html5video.formatTime(d * a),
                h = Math.min(l + n, Math.max(l, v + l)) - o;
            if (i.timeline_thumbs) {
                var r = Math.min(i.timeline_thumbs_total, Math.max(0, Math.floor(i.timeline_thumbs_total * a - .5)));
                html5video.showPreviewTip(s, h, r)
            } else html5video.showTip(s, h, -2)
        }
        html5video.updateMenu()
    },
    isTouchedByUser: function() {
        return !!html5video.touchedByUser
    },
    destroy: function() {
        removeEvent(document, "mouseup", html5video.docMouseUp), removeEvent(document, "mousemove", html5video.docMouseMove), removeEvent(document, browser.opera ? "keypress" : "keydown", html5video.docKeyPressed), removeEvent(window, "resize", html5video.onResize), removeEvent(ge("video_cont"), "mousewheel", html5video.docScroll);
        var e = ge("the_video");
        e && (e.src = "", e.load(), re(e))
    }
};
! function() {
    var e = {
            supportsFullScreen: !1,
            isFullScreen: function() {
                return !1
            },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: "",
            prefix: ""
        },
        i = "webkit moz o ms khtml".split(" ");
    if ("undefined" != typeof document.cancelFullScreen) e.supportsFullScreen = !0;
    else
        for (var t = 0, d = i.length; d > t; t++)
            if (e.prefix = i[t], "undefined" != typeof document[e.prefix + "CancelFullScreen"]) {
                e.supportsFullScreen = !0;
                break
            }
    e.supportsFullScreen && (e.fullScreenEventName = e.prefix + "fullscreenchange", e.isFullScreen = function() {
        switch (this.prefix) {
            case "":
                return document.fullScreen;
            case "webkit":
                return document.webkitIsFullScreen;
            default:
                return document[this.prefix + "FullScreen"]
        }
    }, e.requestFullScreen = function(e) {
        return "" === this.prefix ? e.requestFullScreen() : e[this.prefix + "RequestFullScreen"]()
    }, e.cancelFullScreen = function() {
        return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
    }), window.fullScreenApi = e
}();
try {
    stManager.done("html5video.js")
} catch (e) {}