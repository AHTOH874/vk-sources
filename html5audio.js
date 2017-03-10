/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 976782859
    Link: https://vk.com/js/al/html5audio.js?976782859
    Last Update: 10.2.117
*/
var html5audio = {
    audio_prSliderW: 14,
    audio_volLineW: 41,
    playPause: function() {
        var o = ge("the_audio");
        return o ? (isNaN(o.duration) && (o.src = getUrl(), o.load()), void(o.paused ? (o.play(), audioPlayer.change(html5audio.audio_player_id, "play")) : (o.pause(), audioPlayer.change(html5audio.audio_player_id, "pause")))) : void(html5audio.audio_player_id = 0)
    },
    stopHTML5Audio: function() {
        html5audio.audio_player_id = 0;
        var o = ge("the_audio");
        if (o) {
            var i = o.parentNode,
                e = o.nextSibling;
            i.removeChild(o), i.removeChild(e), i.parentNode.removeChild(i), removeEvent(document, "mouseup", html5audio.docMouseUp), removeEvent(document, "mousemove", html5audio.docMouseMove)
        }
    },
    onErr: function(o, i) {
        topError("Audio loading error: " + i.target.error.code, {
            dt: -1,
            type: 101,
            url: o,
            code: i.target.error.code
        })
    },
    defX: function(o) {
        var i = browser.ipad || browser.iphone4 || browser.ipod4 ? 0 : document.all ? document.scrollLeft : window.pageXOffset;
        return intval(o.clientX + i)
    },
    prDrag: function(o) {
        html5audio.audio_moveState = 1, fadeTo(ge("audio_pr_slider"), 200, .5)
    },
    volDrag: function(o) {
        html5audio.audio_moveState = 2
    },
    prClick: function() {
        html5audio.onPrMove(), html5audio.prDrag()
    },
    volClick: function() {
        html5audio.onVolMove(), html5audio.volDrag()
    },
    onPrMove: function() {
        var o = ge("the_audio");
        if (!(browser.ipad || browser.iphone4 || browser.ipod4) || o.readyState == HTMLMediaElement.HAVE_FUTURE_DATA || o.readyState == HTMLMediaElement.HAVE_ENOUGH_DATA) {
            o.paused && o.play();
            var i = window.event,
                e = getXY(ge("audio_progress_line"));
            html5audio.audio_curPrX = html5audio.defX(i) - e[0] - 7, html5audio.audio_curPrX < 0 && (html5audio.audio_curPrX = 0), html5audio.audio_curPrX > html5audio.audio_prLineW && (html5audio.audio_curPrX = html5audio.audio_prLineW), ge("audio_pr_slider").style.left = html5audio.audio_curPrX + "px", html5audio.updTimeEx()
        }
    },
    updTimeEx: function() {
        var o = ge("the_audio");
        if (o && !isNaN(o.duration)) try {
            o.currentTime = o.startTime + o.duration * html5audio.audio_curPrX / html5audio.audio_prLineW
        } catch (i) {
            html5audio.initHTML5Audio(html5audio.audio_player_id)
        }
        html5audio.updTime()
    },
    onVolMove: function() {
        var o = window.event,
            i = getXY(ge("audio_volume_line"));
        html5audio.audio_curVolX = html5audio.defX(o) - i[0] - 3, html5audio.audio_curVolX < 0 && (html5audio.audio_curVolX = 0), html5audio.audio_curVolX > html5audio.audio_volLineW && (html5audio.audio_curVolX = html5audio.audio_volLineW), html5audio.updVol(!1)
    },
    updVol: function(o) {
        if (ge("audio_vol_slider")) {
            var i = intval(html5audio.audio_curVolX) / html5audio.audio_volLineW;
            ge("audio_vol_slider").style.left = html5audio.audio_curVolX + "px", ge("audio_volume_line").style.opacity = .5 + .5 * i, ge("the_audio").volume = i, o || audioPlayer.change(html5audio.audio_player_id, "volume", intval(100 * i))
        }
    },
    updTime: function() {
        var o = ge("the_audio");
        o && !isNaN(o.duration) && o.duration > 0 && 1 != html5audio.audio_moveState && (ge("audio_pr_slider").style.left = html5audio.audio_prLineW * (o.currentTime - o.startTime) / o.duration + "px", o.duration - o.currentTime <= 1 && (o.pause(), html5audio.onEnded()))
    },
    onPlay: function() {
        audioPlayer.change(html5audio.audio_player_id, "play"), fadeTo(ge("audio_pr_slider"), 200, 1)
    },
    onPause: function() {
        html5audio.audio_player_id && (audioPlayer.change(html5audio.audio_player_id, "pause"), fadeTo(ge("audio_pr_slider"), 200, .5))
    },
    onSuspend: function() {
        setStyle(ge("audio_progress_line"), {
            width: "100%"
        })
    },
    onPlaying: function() {
        html5audio.audio_curPrX > 0 && html5audio.updTimeEx(), setInterval(html5audio.updTime, 1e3)
    },
    onCanPlay: function() {
        ge("the_audio") && setTimeout(function() {
            ge("the_audio").play()
        }, 1e3)
    },
    onEnded: function() {
        0 == html5audio.audio_moveState && audioPlayer.nextTrack()
    },
    getUrl: function() {
        var o = ge("audio_info" + html5audio.audio_player_id).value.split(",");
        return o[0]
    },
    touchHandler: function(o) {
        var i = o.changedTouches,
            e = i[0],
            d = "";
        ge("the_audio");
        switch (o.type) {
            case "touchstart":
                d = "mousedown";
                break;
            case "touchmove":
                d = "mousemove";
                break;
            case "touchend":
                d = "mouseup";
                break;
            default:
                return
        }
        var a = document.createEvent("MouseEvent");
        a.initMouseEvent(d, !0, !0, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(a), (o.target == ge("audio_white_line") || o.target == ge("audio_progress_line") || o.target == ge("audio_pr_slider")) && o.preventDefault()
    },
    startHTML5Audio: function() {
        html5audio.audio_curPrX = 0, html5audio.audio_prLineW = getSize(ge("audio_white_line"))[0] - html5audio.audio_prSliderW, html5audio.updVol(!0);
        var o = ge("the_audio"),
            i = html5audio.getUrl();
        o.src = i, o.load(), o.volume = html5audio.audio_curVolX / html5audio.audio_volLineW, addEvent(o, "canplay", html5audio.onCanPlay), addEvent(o, "playing", html5audio.onPlaying), addEvent(o, "play", html5audio.onPlay), addEvent(o, "pause", html5audio.onPause), addEvent(o, "onerror", html5audio.onErr.pbind(i)), addEvent(o, "suspend", html5audio.onSuspend), (browser.ipad || browser.iphone4 || browser.ipod4) && (document.addEventListener("touchstart", html5audio.touchHandler, !0), document.addEventListener("touchmove", html5audio.touchHandler, !0), document.addEventListener("touchend", html5audio.touchHandler, !0)), setTimeout(function() {
            o.play()
        }, 100)
    },
    audioHTML5Code: function() {
        var o = browser.ipad || browser.iphone4 || browser.ipod4 ? "-12" : "5",
            i = '<div id="audio_player" style="top:' + o + 'px">  <audio id="the_audio"></audio>  <table width="100%" border="0" cellpadding="0" cellspacing="0">    <tr valign="top">      <td style="width:100%;padding:0px 0px 0px 0px">        <div id="audio_white_line" onmousedown="html5audio.prClick(this);"></div>        <div id="audio_progress_line" onmousedown="html5audio.prClick(this);">          <div id="audio_pr_slider" onmousedown="html5audio.prDrag(this);"></div>        </div>      </td>';
        return browser.ipad || browser.iphone4 || browser.ipod4 || (i += '      <td style="padding:0px 0px 0px 10px"></td>      <td style="padding:1px 0px 0px 0px">        <div id="audio_white_volume_line" onmousedown="html5audio.volClick(this);"></div>        <div id="audio_volume_line" onmousedown="html5audio.volClick(this);">          <div id="audio_vol_slider" style="left:' + html5audio.audio_curVolX + 'px;" onmousedown="html5audio.volDrag(this);"></div>        </div>      </td>'), i += "    </tr>  </table></div>"
    },
    initHTML5Audio: function(o) {
        addEvent(document, "mouseup", html5audio.docMouseUp), addEvent(document, "mousemove", html5audio.docMouseMove), html5audio.audio_moveState = 0, html5audio.audio_player_id = o, audioPlayer.change(o, "init"), audioPlayer.initVolume();
        var i = audioPlayer.volume / 100;
        html5audio.audio_curVolX = html5audio.audio_wasVolX = intval(html5audio.audio_volLineW * i);
        var e = ge("player" + o);
        e.innerHTML = html5audio.audioHTML5Code(), e.style.padding = "0px", show(e), setTimeout(html5audio.startHTML5Audio, 200)
    },
    docMouseUp: function() {
        1 != html5audio.audio_moveState || ge("the_audio").paused || fadeTo(ge("audio_pr_slider"), 200, 1), html5audio.audio_moveState = 0
    },
    docMouseMove: function() {
        1 == html5audio.audio_moveState ? html5audio.onPrMove() : 2 == html5audio.audio_moveState && html5audio.onVolMove()
    }
};
try {
    stManager.done("html5audio.js")
} catch (e) {}