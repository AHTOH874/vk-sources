/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 77882181513
    Link: https://vk.com/js/al/videoplayer.js?77882181513
    Last Update: 10.2.117
*/
﻿! function(e) {
    function t(n) {
        if (i[n]) return i[n].exports;
        var r = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var i = {};
    return t.m = e, t.c = i, t.p = "", t(0)
}([function(e, t, i) {
    e.exports = i(39)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t, i, n, r) {
        var o = -1;
        return each(e, function(e, s) {
            return s.elem === t && s.type === i && s.handler === n && s.useCapture === r ? (o = e, !1) : void 0
        }), o
    }

    function s(e, t) {
        var i = e[t];
        i && (i.elem.removeEventListener(i.type, i.realHandler, i.useCapture), e.splice(t, 1))
    }

    function a(e, t, i) {
        var n = -1;
        return each(e, function(e, r) {
            return r.type === t && r.handler === i ? (n = e, !1) : void 0
        }), n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PlayerComponent = void 0;
    var l = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        u = i(2),
        h = n(u),
        d = function() {
            function e(t) {
                var i = this;
                r(this, e), this._playerListeners = [], this._domListeners = [], this._componentTimeouts = [], this.player = t, this.playerListen(h._INIT_VIDEO, function() {
                    i.initVideo && i.initVideo.apply(i, arguments)
                }), this.playerListen(h._DEINIT_VIDEO, function() {
                    i.deinitVideo && i.deinitVideo()
                }), this.playerListen(h._RESIZE, function() {
                    i.resize && i.resize.apply(i, arguments)
                }), this.playerListen(h._DESTROY, this.destroy)
            }
            return e.prototype.domListen = function(e, t, i) {
                var n = this,
                    r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3],
                    s = r.useCapture,
                    a = r.context,
                    l = r.once;
                if (!(o(this._domListeners, e, t, i, s) > -1)) {
                    isString(e) && (e = domByClass(this.el, e));
                    var u = l ? function(r) {
                        return n.domUnlisten(e, t, i, {
                            useCapture: s
                        }), i.call(a || n, r)
                    } : i.bind(a || this);
                    e.addEventListener(t, u, s), this._domListeners.push({
                        elem: e,
                        type: t,
                        handler: i,
                        useCapture: s,
                        realHandler: u
                    })
                }
            }, e.prototype.domListenOnce = function(e, t, i) {
                var n = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3];
                return n.once = !0, this.domListen(e, t, i, n)
            }, e.prototype.domUnlisten = function(e, t, i) {
                var n = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3],
                    r = n.useCapture;
                if (i && t) {
                    var a = o(this._domListeners, e, t, i, r);
                    s(this._domListeners, a)
                } else
                    for (var l = 0; this._domListeners[l];) {
                        var u = this._domListeners[l];
                        e !== u.elem || t && t !== u.type ? l++ : s(this._domListeners, l)
                    }
            }, e.prototype.domUnlistenAll = function() {
                for (var e; e = this._domListeners[0];) this.domUnlisten(e.elem, e.type, e.handler, {
                    useCapture: e.useCapture
                })
            }, e.prototype.attachTooltip = function(e) {
                var t = this;
                isString(e.el) && (e.el = domByClass(this.el, e.el));
                var i;
                this.domListen(e.el, "mouseenter", function() {
                    t.tooltip.isVisible() || vkNow() - t.tooltip.lastShown < 100 ? t.tooltip.show(e) : i = setTimeout(function() {
                        return t.tooltip.show(e)
                    }, 200)
                }), this.domListen(e.el, "mouseleave", function(n) {
                    clearTimeout(i), e.hideDelay ? t.tooltip.hideWithDelay(e.hideDelay) : t.tooltip.hide()
                }), this.domListen(e.el, "click", function(n) {
                    clearTimeout(i), e.hideOnClick ? t.tooltip.hide() : setTimeout(function() {
                        return t.tooltip.show(e)
                    }, 0)
                })
            }, e.prototype.playerListen = function(e, t) {
                var i = arguments.length <= 2 || void 0 === arguments[2] ? this : arguments[2],
                    n = t.bind(i);
                this.player.on(e, n), this._playerListeners.push({
                    type: e,
                    handler: t,
                    realHandler: n
                })
            }, e.prototype.playerUnlisten = function(e, t) {
                var i = a(this._playerListeners, e, t);
                if (!(0 > i)) {
                    var n = this._playerListeners[i];
                    this.player.off(e, n.realHandler), this._playerListeners.splice(i, 1)
                }
            }, e.prototype.playerUnlistenAll = function() {
                for (var e; e = this._playerListeners[0];) this.playerUnlisten(e.type, e.handler)
            }, e.prototype.getLang = function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                    n = this.player.langVars[e];
                return n ? (i.sex && (n = langSex(i.sex, n)), t && each(t, function(e, t) {
                    n = n.replace(new RegExp("{" + e + "}", "g"), t)
                }), n) : ""
            }, e.prototype.getVars = function() {
                return this.player.vars || {}
            }, e.prototype.getVar = function(e) {
                return this.getVars()[e]
            }, e.prototype.delay = function(e, t) {
                for (var i = arguments.length, n = Array(i > 2 ? i - 2 : 0), r = 2; i > r; r++) n[r - 2] = arguments[r];
                var o = this,
                    s = setTimeout(function() {
                        e.apply(o, n)
                    }, t);
                return this._componentTimeouts.push(s), s
            }, e.prototype.undelay = function(e) {
                clearTimeout(e);
                var t = this._componentTimeouts.indexOf(e);
                t >= 0 && this._componentTimeouts.splice(t, 1)
            }, e.prototype.clearComponentTimeouts = function() {
                each(this._componentTimeouts, function(e, t) {
                    clearTimeout(t)
                }), this._componentTimeouts = []
            }, e.prototype.destroy = function() {
                this.playerUnlistenAll(), this.domUnlistenAll(), this.clearComponentTimeouts()
            }, l(e, [{
                key: "tooltip",
                get: function() {
                    return this.player.ui.playerTooltip
                }
            }]), e
        }();
    t.PlayerComponent = d
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t._INIT_VIDEO = "_initVideo", t._DEINIT_VIDEO = "_deinitVideo", t._RESIZE = "_resize", t._DESTROY = "_destroy", t.STATE_CHANGE = "stateChange", t.QUALITIES_LIST_CHANGE = "qualitiesListChange", t.QUALITY_CHANGE = "qualityChange", t.FULLSCREEN_CHANGE = "fullscreenChange", t.SEEK = "seek", t.EXPANDED = "expanded", t.NEXT_TIMER_RESET = "nextTimerReset", t.NEXT_TIMER_START = "nextTimerStart", t.VIDEO_LIKE = "videoLike", t.VIDEO_SHARE = "videoShare", t.VIDEO_ADD = "videoAdd", t.SUBSCRIBED = "subscribed", t.LIVE_PHASE_CHANGE = "livePhaseChange", t.LIVE_DONATION = "liveDonation", t.MEDIA_TIMEUPDATE = "media.timeupdate", t.MEDIA_PROGRESS = "media.progress", t.MEDIA_VOLUMECHANGE = "media.volumechange", t.MEDIA_DURATIONCHANGE = "media.durationchange", t.MEDIA_WAITING = "media.waiting", t.MEDIA_PLAYING = "media.playing", t.MEDIA_ENDED = "media.ended", t.MEDIA_ERROR = "media.error", t.MEDIA_SEEKING = "media.seeking", t.MEDIA_SEEKED = "media.seeked", t.MEDIA_HLS_FIRST_LEVEL_LOADED = "media.hlsFirstLevelLoaded", t.MEDIA_HLS_FIRST_FRAG_LOADED = "media.hlsFirstFragLoaded", t.UI_SEEKSTART = "ui.seekstart", t.UI_SEEKEND = "ui.seekend", t.UI_CONTROLS_HIDE = "ui.controlsHide", t.UI_CONTROLS_SHOW = "ui.controlsShow", t.ADS_WAITING = "ads.waiting", t.ADS_TIME_REMAINED = "ads.timeRemained", t.ADS_LINEAR_STARTED = "ads.linearStarted", t.ADS_LINEAR_COMPLETED = "ads.linearCompleted", t.ADS_OVERLAY_STARTED = "ads.overlayStarted", t.ADS_OVERLAY_COMPLETED = "ads.overlayCompleted"
}, function(e, t) {
    "use strict";

    function i(e, t) {
        function i(e) {
            l.readyState && "loaded" != l.readyState && "complete" != l.readyState || (r(), s())
        }

        function n(e) {
            r(), a()
        }

        function r() {
            clearTimeout(u), l.removeEventListener("load", i), l.removeEventListener("readystatechange", i), l.removeEventListener("error", n)
        }
        var o = t.timeout,
            s = t.onLoad,
            a = t.onError,
            l = document.createElement("script");
        if (l.addEventListener("load", i), l.addEventListener("readystatechange", i), l.addEventListener("error", n), l.src = e, document.head.appendChild(l), o) var u = setTimeout(n, o);
        return {
            destroy: function() {
                r()
            }
        }
    }

    function n(e, t) {
        var i = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2],
            n = arguments.length <= 3 || void 0 === arguments[3] ? e.length : arguments[3];
        if (Array.prototype.fill) return Array.prototype.fill.call(e, t, i, n);
        i = 0 > i ? Math.max(e.length + i, 0) : Math.min(i, e.length), n = 0 > n ? Math.max(e.length + n, 0) : Math.min(n, e.length);
        for (var r = i; n > r; ++r) e[r] = t;
        return e
    }

    function r(e) {
        function t(e) {
            e ? n && n(o.responseText, o.status) : r && r(), o = n = r = null
        }
        var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
            n = i.onLoad,
            r = i.onError,
            o = new XMLHttpRequest;
        o.onload = t.pbind(!0), o.onerror = t.pbind(!1);
        try {
            o.open("GET", e), o.send()
        } catch (s) {
            t(!1)
        }
        return {
            abort: function() {
                o && o.abort(), t(!1)
            }
        }
    }

    function o(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {
            blank: !0
        } : arguments[1];
        e = "/away.php?to=" + encodeURIComponent(e);
        try {
            window._opener.contentWindow.open(e, t.blank ? "_blank" : ""), setTimeout(window._reopen, 0)
        } catch (i) {
            var n = window.open(e, t.blank ? "_blank" : "");
            n.opener = null
        }
    }

    function s(e, t) {
        "textContent" in Node.prototype ? e.textContent = t : e.innerText = t
    }

    function a(e) {
        var t = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/,
            i = "string" == typeof e ? e.match(t) : null;
        return i ? (3600 * i[1] || 0) + (60 * i[2] || 0) + (+i[3] || 0) : 0
    }

    function l(e) {
        var t = "";
        return e >= 3600 && (t += Math.floor(e / 3600) + "h", e %= 3600), e >= 60 && (t += Math.floor(e / 60) + "m", e %= 60), e > 0 && (t += Math.floor(e) + "s"), t
    }

    function u(e) {
        return ce("a", {
            href: e
        })
    }

    function h(e) {
        var t = ce("div");
        if ("string" == typeof t.style[e]) return e;
        for (var i, n = ["webkit", "moz", "ms"], r = e.charAt(0).toUpperCase() + e.slice(1), o = 0; i = n[o]; o++) {
            var s = i + r;
            if ("string" == typeof t.style[s]) return s
        }
        return null
    }

    function d() {
        return !!document.queryCommandSupported && document.queryCommandSupported("copy")
    }

    function c(e) {
        var t = !1,
            i = ce("textarea", {
                value: e
            }, {
                position: "absolute",
                top: 0,
                zIndex: 2
            });
        utilsNode.appendChild(i), browser.msie ? i.setSelectionRange(0, e.length) : i.select();
        try {
            t = document.execCommand("copy")
        } catch (n) {
            t = !1
        }
        return re(i), t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.loadScript = i, t.fillArray = n, t.request = r, t.safeOpenLink = o, t.setText = s, t.fromTimecode = a, t.toTimecode = l, t.parseUrl = u, t.getCssProp = h, t.canCopyToClipboard = d, t.copyToClipboard = c, t.storage = {
        set: function(e, t) {
            try {
                localStorage.setItem(e, JSON.stringify(t))
            } catch (i) {}
        },
        get: function(e) {
            try {
                return JSON.parse(localStorage.getItem(e))
            } catch (t) {
                return null
            }
        },
        remove: function(e) {
            localStorage.removeItem(e)
        }
    }, t.uniqueId = function(e) {
        return function(t) {
            return t + e++
        }
    }(0)
}, function(e, t) {
    "use strict";

    function i() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="175 567 21 18" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M181.676 584.73c-.925.603-1.676.196-1.676-.9v-15.662c0-1.1.744-1.5 1.662-.896l11.67 7.693c.92.605.92 1.58-.013 2.187l-11.644 7.578z" fill="#FFF" class="_play"/>\n  <path d="M180 567.993c0-.548.444-.993 1-.993h3c.552 0 1 .445 1 .993v16.014c0 .548-.444.993-1 .993h-3c-.552 0-1-.445-1-.993v-16.014zm9 0c0-.548.444-.993 1-.993h3c.552 0 1 .445 1 .993v16.014c0 .548-.444.993-1 .993h-3c-.552 0-1-.445-1-.993v-16.014z" fill="#FFF" class="_pause"/>\n  <path d="M178 576c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9c-1.625 0-3.15-.43-4.464-1.184l2.036-2.327c.743.327 1.564.51 2.428.51 3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6h3l-4.5 5-4.5-5h3z" fill="#FFF" class="_replay"/>\n</svg>\n  '
    }

    function n() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="212 434 12 14" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M212.834 446.872c-.46.295-.834.08-.834-.47V435.6c0-.555.38-.762.834-.47l8.315 5.336c.46.295.453.778 0 1.07l-8.316 5.336zM222 435h2v12h-2v-12z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function r() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="84 14 42 20" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="none" fill-rule="evenodd" transform="translate(84 14)">\n    <rect fill="#F75148" width="42" height="20" rx="2"/>\n    <path d="M26.874 6.486l-2.464 7.562c-.17.523-.756.952-1.307.952h-.206c-.552 0-1.136-.426-1.307-.952l-2.464-7.562c-.06-.11-.103-.233-.12-.363L19 6.1h.005C19.002 6.067 19 6.034 19 6c0-.552.448-1 1-1 .52 0 .945.395.995.9H21l2 6.4 2-6.4h.005c.05-.505.476-.9.995-.9.552 0 1 .448 1 1 0 .034-.002.067-.005.1H27l-.007.023c-.016.13-.058.253-.12.363zM31 9V7h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1h-4.02c-.268 0-.515.11-.696.29-.184.184-.294.432-.294.705v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31v-2h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31zM9 13V5.995C9 5.455 8.552 5 8 5c-.556 0-1 .446-1 .995v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H9zm6-7.005c0-.55.444-.995 1-.995.552 0 1 .456 1 .995v8.01c0 .55-.444.995-1 .995-.552 0-1-.456-1-.995v-8.01z" fill="#F0F2F5"/>\n  </g>\n</svg>\n  '
    }

    function o() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" xmlns="http://www.w3.org/2000/svg" viewBox="822 568 19 16" focusable="false">\n  <path d="M832.98 582.823c-.03 1.207-.67 1.61-1.828.62-1.72-1.47-3.61-3.194-4.242-3.72-.632-.53-1.645-.622-3.073-.622-1.427 0-1.815-.62-1.815-1.24s-.014-1.828-.014-2c0-.055.005-.086.014-.13.02-.095-.058-.973 0-1.59.085-.906.388-1.24 1.815-1.24 1.428 0 2.44-.093 3.073-.622.633-.528 2.523-2.252 4.242-3.72 1.158-.99 1.797-.588 1.83.62.042 1.606 0 3.85 0 6.682 0 2.83.042 5.356 0 6.963z" fill="#FFF"/>\n  <path d="M839 576l1.64 1.64c.205.205.203.517.01.71l-.3.3c-.194.194-.51.19-.71-.01L838 577l-1.64 1.64c-.2.2-.516.204-.71.01l-.3-.3c-.193-.193-.195-.505.01-.71L837 576l-1.64-1.64c-.205-.205-.203-.517-.01-.71l.3-.3c.194-.194.51-.19.71.01L838 575l1.64-1.64c.2-.2.516-.204.71-.01l.3.3c.193.193.195.505-.01.71L839 576z" fill="#FFF" class="_cross"/>\n  <path d="M835.138 578.866c.185.182.486.177.67-.006.737-.737 1.192-1.746 1.192-2.86 0-1.115-.454-2.123-1.19-2.86-.183-.184-.484-.188-.67-.006-.182.18-.185.473-.004.653.57.57.923 1.35.923 2.212 0 .863-.354 1.643-.926 2.213-.18.18-.178.473.004.653" fill="#FFF" class="_wave1"/>\n  <path d="M837.162 580.846c.214.207.562.205.775-.004C839.21 579.596 840 577.888 840 576c0-1.888-.788-3.596-2.06-4.842-.222-.218-.59-.21-.802.023-.193.215-.166.538.038.74 1.066 1.054 1.723 2.49 1.723 4.08 0 1.6-.67 3.048-1.75 4.104-.207.202-.197.54.012.742" fill="#FFF" class="_wave2"/>\n</svg>\n  '
    }

    function s() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="729 480 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M729 481.994c0-1.1.895-1.994 1.994-1.994h12.012c1.1 0 1.994.895 1.994 1.994v12.012c0 1.1-.895 1.994-1.994 1.994h-12.012c-1.1 0-1.994-.895-1.994-1.994v-12.012zm2 4.004c0-.55.456-.998 1.002-.998h9.996c.553 0 1.002.446 1.002.998v7.004c0 .55-.456.998-1.002.998h-9.996c-.553 0-1.002-.446-1.002-.998v-7.004z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function a() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="1034 567 18 18" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M1038.067 579.067l2.895-2.53 1.5 1.5-2.53 2.896L1043 584h-7.003c-.55 0-.997-.453-.997-.997V576l3.067 3.067zm9.866-6.134l-2.895 2.53-1.5-1.5 2.53-2.896L1043 568h7.003c.55 0 .997.453.997.997V576l-3.067-3.067z" fill="#FFF" fill-rule="evenodd" class="_enter"/>\n  <path d="M1047.067 570.067l2.895-2.53 1.5 1.5-2.53 2.896L1052 575h-7.003c-.55 0-.997-.453-.997-.997V567l3.067 3.067zm-8.134 11.866l-2.895 2.53-1.5-1.5 2.53-2.896L1034 577h7.003c.55 0 .997.453.997.997V585l-3.067-3.067z" fill="#FFF" fill-rule="evenodd" class="_exit"/>\n</svg>\n  '
    }

    function l() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="5 8 26 22" xmlns="http://www.w3.org/2000/svg">\n  <path d="M21 21v-8h-2v8h-2v2h2v2h2v-2h3v-2h-3zm2-3.077V20s3 0 3-3.5-3-3.5-3-3.5v2.087C22.725 15 22.5 15 22.5 15H21v3h1.5c.17 0 .34-.026.5-.077V20h-2v-7h2v2.087c.436.138 1 .493 1 1.413 0 .77-.45 1.246-1 1.423zM21.5 28c-5.247 0-9.5-4.253-9.5-9.5S16.253 9 21.5 9s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z" fill="#FFF" fill-rule="evenodd"/>\n  <path d="M15.818 27.995c-.106.003-.212.005-.318.005-5.247 0-9.5-4.253-9.5-9.5S10.253 9 15.5 9c.446 0 .884.03 1.314.09C12.844 10.503 10 14.294 10 18.75c0 4.073 2.376 7.592 5.818 9.245z" fill="#FFF" fill-rule="evenodd" />\n</svg>\n  '
    }

    function u() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="10 11 17 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M18.5 13.922c-1.7-3.4-5.097-3.393-7.042-1.43-1.944 1.96-1.944 5.147 0 7.11.608.612 5.834 5.76 5.834 5.76.608.613 1.702.613 2.31 0l5.833-5.76c2.066-1.963 2.066-5.15.12-7.11-1.943-1.84-5.355-1.97-7.055 1.43z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function h() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="11 11 14 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M14.16 21h-.637C12.077 21 11 19.39 11 18.09v-1.18c0-1.3 1.077-2.91 2.523-2.91H17c1.358 0 1.694.31 3.712-.99 1.387-.946 2.9-2.01 2.9-2.01H25v13h-1.26s-1.767-1.182-3.154-2.127c-1.46-.948-2.088-.9-3.166-.878.11.784.315 2.057.58 2.734 0 1.475-.133 2.27-2.667 2.27l-1.174-5z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function d() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="10 11 17 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M20 17v-4.993C20 11.45 19.553 11 19 11h-1c-.557 0-1 .45-1 1.007V17h-4.993C11.45 17 11 17.447 11 18v1c0 .557.45 1 1.007 1H17v4.993c0 .558.447 1.007 1 1.007h1c.557 0 1-.45 1-1.007V20h4.993C25.55 20 26 19.553 26 19v-1c0-.557-.45-1-1.007-1H20z" fill="#FFF" fill-rule="evenodd" class="_plus"/>\n  <path stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M11.5 18.5L16 23l9.5-9.5" class="_mark"/>\n</svg>\n  '
    }

    function c() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="0 2 12 8" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M7 5V2H5v3H2v2h3v3h2V7h3V5H7z" fill="#FFF" fill-rule="evenodd" class="_plus"/>\n  <path stroke="#FFF" stroke-width="1.5" fill="none" d="M2 6l2.5 2.5L10 3" class="_mark"/>\n  <path d="M3 3l6 6M9 3L3 9" stroke="#FFF" stroke-width="1.5" fill="none" class="_cancel"/>\n</svg>\n  '
    }

    function p() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="916 568 28 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M938.55 575.79s3.6-5.068 3.974-6.79c.188-.625-.187-1-.813-1h-3.065c-.75 0-1.064.313-1.252.75 0 0-1.5 3.66-3.63 6.04-.687.687-1 .906-1.375.906-.188 0-.47-.22-.47-.844v-5.85c0-.752-.094-1.002-.72-1.002h-4.817c-.47 0-.688.264-.688.594 0 .712 1.064.876 1.064 2.88v4.348c0 .813-.063 1.126-.438 1.126-1 0-3.436-3.677-4.88-7.884-.284-.818-.59-1.064-1.346-1.064h-3.13c-.5 0-.812.313-.812.75 0 .783 1 4.663 4.662 9.793 2.44 3.504 5.756 5.32 8.885 5.32 1.877 0 2.315-.314 2.315-1.065v-2.628c0-.563.094-1.032.688-1.032.438 0 1.19.22 2.94 1.908 2.004 2.003 2.19 2.816 3.318 2.816h3.504c.375 0 .688-.188.688-.75 0-.814-1.064-2.19-2.565-3.88-.69-.814-1.72-1.69-2.034-2.128-.437-.563-.312-.813 0-1.314" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function y() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="1093 569 9 5" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M1093 569h1v5h-1v-5zm3 0h1v5h-1v-5zm-2 2h2v1h-2v-1zm4-2h1v5h-1v-5zm3 1h1v3h-1v-3zm-2-1h2v1h-2v-1zm0 4h2v1h-2v-1z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function f() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="163 11 8 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M165 13l5 5.5-5 5.5"/>\n</svg>\n  '
    }

    function v() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="460 190 130 90" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M460 193.998c0-2.208 1.788-3.998 3.997-3.998h122.006c2.207 0 3.997 1.798 3.997 3.998v82.004c0 2.208-1.788 3.998-3.997 3.998H463.997c-2.207 0-3.997-1.798-3.997-3.998v-82.004zm6 2.993c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm112-72c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zm0 12c0-.546.45-.99.99-.99h4.02c.546 0 .99.45.99.99v4.02c0 .546-.45.99-.99.99h-4.02c-.546 0-.99-.45-.99-.99v-4.02zM507 232c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm36 0c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm-18.05 15c6.05 0 11.624 4.446 11.944 4.65 2.106 1.35 3.252.772 3.957.156.705-.616 1.15-2.806-1.044-4.657-1.735-1.48-5.806-5.16-14.856-5.15-9.05.01-12.95 3.5-14.792 5.185-1.84 1.685-2.288 3.498-.973 4.657 1.315 1.158 2.315 1.158 4.357-.327-.007.007 5.357-4.515 11.408-4.515z" fill="#555" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function g() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="160 0 149 109" xmlns="http://www.w3.org/2000/svg">\n  <g fill="#FFF" fill-rule="evenodd" transform="translate(160.000000, 0.000000)">\n    <path d="M118 47c-17.124592 0-31 13.8791728-31 31 0 4.2549287.8568557 8.3092632 2.407391 12.0000006L3.997336 90C1.7896683 90 0 88.202216 0 86.0020607V3.9979393C0 1.7899383 1.7882482 0 3.997336 0h122.005328C128.210332 0 130 1.797784 130 3.9979393v45.4095895c-1.95956-.823251-4.021557-1.450953-6.161563-1.8586993.1019-.1552555.161563-.340578.161563-.5396075v-4.018444c0-.5398028-.443586-.990778-.990778-.990778h-4.018444c-.539803 0-.990778.4435864-.990778.990778V47zm-35.2262838-.1074918c-8.6892106 5.577818-17.38831 11.1313474-26.0676317 16.733454C54.6589445 64.9472978 54 62.34328 54 62.34328V27.9815257s0-3.0880257 2.8729126-1.5541284c7.262442 4.6619402 20.0262364 12.7800163 25.8271328 16.5790718.8040324.5265675 1.2809798 1.013568 1.2990485 1.966665.0180685.9530972-.228701 1.2795827-1.2253778 1.919374zM6 6.990778C6 6.4435864 6.4509752 6 6.990778 6h4.018444C11.5564136 6 12 6.4509752 12 6.990778v4.018444C12 11.5564136 11.5490248 12 11.009222 12H6.990778C6.4435864 12 6 11.5490248 6 11.009222V6.990778zm0 12C6 18.4435864 6.4509752 18 6.990778 18h4.018444c.5471916 0 .990778.4509752.990778.990778v4.018444C12 23.5564136 11.5490248 24 11.009222 24H6.990778C6.4435864 24 6 23.5490248 6 23.009222v-4.018444zm0 12C6 30.4435864 6.4509752 30 6.990778 30h4.018444c.5471916 0 .990778.4509752.990778.990778v4.018444C12 35.5564136 11.5490248 36 11.009222 36H6.990778C6.4435864 36 6 35.5490248 6 35.009222v-4.018444zm0 12C6 42.4435864 6.4509752 42 6.990778 42h4.018444c.5471916 0 .990778.4509752.990778.990778v4.018444C12 47.5564136 11.5490248 48 11.009222 48H6.990778C6.4435864 48 6 47.5490248 6 47.009222v-4.018444zm0 12C6 54.4435864 6.4509752 54 6.990778 54h4.018444c.5471916 0 .990778.4509752.990778.990778v4.018444C12 59.5564136 11.5490248 60 11.009222 60H6.990778C6.4435864 60 6 59.5490248 6 59.009222v-4.018444zm0 12C6 66.4435864 6.4509752 66 6.990778 66h4.018444c.5471916 0 .990778.4509752.990778.990778v4.018444C12 71.5564136 11.5490248 72 11.009222 72H6.990778C6.4435864 72 6 71.5490248 6 71.009222v-4.018444zm0 12C6 78.4435864 6.4509752 78 6.990778 78h4.018444c.5471916 0 .990778.4509752.990778.990778v4.018444C12 83.5564136 11.5490248 84 11.009222 84H6.990778C6.4435864 84 6 83.5490248 6 83.009222v-4.018444zm112-72C118 6.4435864 118.450975 6 118.990778 6h4.018444c.547192 0 .990778.4509752.990778.990778v4.018444c0 .5471916-.450975.990778-.990778.990778h-4.018444C118.443586 12 118 11.5490248 118 11.009222V6.990778zm0 12c0-.5471916.450975-.990778.990778-.990778h4.018444c.547192 0 .990778.4509752.990778.990778v4.018444c0 .5471916-.450975.990778-.990778.990778h-4.018444C118.443586 24 118 23.5490248 118 23.009222v-4.018444zm0 12c0-.5471916.450975-.990778.990778-.990778h4.018444c.547192 0 .990778.4509752.990778.990778v4.018444c0 .5471916-.450975.990778-.990778.990778h-4.018444C118.443586 36 118 35.5490248 118 35.009222v-4.018444z"/>\n    <path d="M118 104c14.359403 0 26-11.6405965 26-26s-11.640597-26-26-26-26 11.6405965-26 26 11.640597 26 26 26zm0-4c12.150264 0 22-9.8497355 22-22s-9.849736-22-22-22-22 9.8497355-22 22 9.849736 22 22 22z"/>\n    <rect x="116" y="65" width="4" height="15" rx="2"/>\n    <rect transform="translate(121.500000, 81.500000) rotate(-45.000000) translate(-121.500000, -81.500000)" x="119.5" y="75.136039" width="4" height="12.7279221" rx="2"/>\n  </g>\n</svg>\n  '
    }

    function m() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M2.587 2.587L0 0h7v7L4.61 4.61c-.564.644-1.144 1.47-1.408 2.367C2.865 8.652 4.135 10 4.135 10S1 9.66 1 5.965c0-1.355.797-2.538 1.587-3.378z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }

    function _() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="230 33 12 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="#6590C7" fill-rule="evenodd">\n    <path d="M234.665 47.746c-.367.416-.563.32-.435-.22L236.006 40h4.478c.556 0 .712.333.34.754l-6.16 6.992z"/>\n    <path d="M237.337 34.254c.366-.416.56-.32.433.22L235.998 42h-4.466c-.554 0-.7-.344-.34-.754l6.145-6.992z"/>\n  </g>\n</svg>\n  '
    }

    function b(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
            i = "";
        switch (e) {
            case 2:
                i = "M16.283 20.264c.14-.225.396-.53.765-.91l3.278-3.533c.487-.52.834-.966 1.042-1.335.208-.37.312-.735.312-1.098 0-.328-.076-.62-.23-.875-.15-.255-.364-.452-.636-.593-.272-.142-.587-.212-.945-.212-.446 0-.83.12-1.157.36-.325.24-.572.592-.742 1.055-.14.275-.29.475-.452.598-.16.124-.356.185-.584.185-.293 0-.532-.095-.717-.285-.184-.19-.277-.432-.277-.725 0-.528.176-1.032.528-1.512.35-.48.838-.87 1.46-1.165.62-.296 1.31-.444 2.073-.444.763 0 1.447.147 2.053.44.607.293 1.08.7 1.424 1.217.343.52.514 1.104.514 1.755 0 .404-.065.794-.197 1.17-.13.374-.345.77-.64 1.185-.297.416-.7.89-1.21 1.424l-2.795 2.988v.114h4.123c.346 0 .617.087.813.26.197.173.295.41.295.716 0 .3-.098.533-.295.703-.196.17-.467.255-.812.255h-5.923c-.387 0-.696-.097-.928-.29-.232-.193-.348-.45-.348-.773 0-.223.07-.447.21-.673z";
                break;
            case 3:
                i = "M16.107 18.783c.176-.18.4-.272.668-.272.194 0 .368.052.523.155.156.102.315.27.48.505.257.404.578.712.962.923.384.21.822.316 1.314.316.433 0 .814-.076 1.142-.225.328-.15.582-.36.76-.633.18-.272.27-.587.27-.945 0-.357-.092-.675-.274-.953-.18-.28-.435-.494-.76-.646-.325-.153-.702-.23-1.13-.23h-.86c-.265 0-.483-.088-.656-.267-.172-.177-.26-.402-.26-.67 0-.265.088-.485.26-.66.173-.176.39-.264.655-.264h.82c.356 0 .677-.072.96-.215.285-.143.508-.342.67-.597.16-.255.24-.54.24-.857 0-.316-.078-.598-.237-.844-.158-.246-.38-.438-.668-.575-.287-.138-.615-.207-.984-.207-.872 0-1.543.4-2.012 1.195-.13.217-.272.375-.43.475-.16.1-.343.15-.554.15-.28 0-.513-.09-.694-.27-.182-.177-.273-.41-.273-.697 0-.47.176-.91.527-1.323.352-.413.834-.746 1.446-.998.613-.252 1.29-.378 2.035-.378.797 0 1.51.135 2.136.405.628.268 1.117.645 1.468 1.128.352.484.528 1.033.528 1.648 0 .428-.098.836-.295 1.226-.195.39-.46.714-.794.97-.334.26-.7.417-1.1.476v.15c.482.046.917.204 1.306.474.39.27.696.618.92 1.046.222.428.333.89.333 1.39 0 .69-.192 1.307-.576 1.85-.385.54-.918.962-1.6 1.264-.683.302-1.46.453-2.334.453-.767 0-1.472-.13-2.114-.39-.64-.262-1.148-.606-1.52-1.034-.372-.427-.558-.88-.558-1.36 0-.277.088-.505.263-.687z";
                break;
            case 4:
                i = "M17.048 19.776c-.45 0-.804-.114-1.06-.342-.254-.23-.382-.548-.382-.958 0-.194.03-.392.093-.594.06-.202.173-.467.337-.795.527-.996 1.055-1.935 1.582-2.817.526-.882 1.168-1.88 1.924-2.993.37-.54.716-.914 1.04-1.125.327-.21.718-.316 1.175-.316.59 0 1.055.15 1.392.448.337.3.505.71.505 1.23v6.33h.59c.316 0 .565.088.746.267.182.18.273.418.273.717 0 .293-.09.525-.268.694-.18.17-.43.256-.752.256h-.59V20.9c0 .376-.098.67-.298.885-.2.214-.47.32-.817.32-.345 0-.616-.106-.812-.32-.196-.214-.294-.51-.294-.884v-1.124h-4.386zm4.386-7.9h-.123c-.486.737-1.086 1.707-1.8 2.908-.716 1.2-1.293 2.2-1.733 2.997v.063h3.657v-5.968z";
                break;
            case 5:
                i = "M16.393 18.814c.18-.202.412-.303.7-.303.186 0 .355.045.504.133.15.087.295.234.435.44.557.825 1.275 1.238 2.154 1.238.44 0 .83-.094 1.173-.284.342-.19.61-.456.803-.796.193-.34.29-.73.29-1.17 0-.42-.092-.796-.277-1.124-.184-.328-.442-.583-.773-.764-.33-.182-.705-.273-1.12-.273-.294 0-.587.052-.88.157-.293.106-.568.26-.826.466-.252.21-.455.355-.61.43-.156.077-.32.115-.488.115-.365 0-.655-.12-.872-.365-.216-.243-.313-.564-.29-.962l.326-4.517c.03-.416.17-.726.42-.93.253-.206.623-.31 1.11-.31h4.973c.352 0 .626.088.822.26.196.173.294.412.294.717 0 .304-.097.54-.29.707-.194.167-.47.25-.827.25h-4.543l-.247 3.103h.123c.206-.28.53-.51.976-.685.445-.176.926-.264 1.44-.264.757 0 1.427.165 2.01.493.583.328 1.037.788 1.362 1.38.325.592.488 1.27.488 2.03 0 .844-.19 1.588-.57 2.233-.382.644-.918 1.145-1.61 1.503-.69.356-1.485.535-2.382.535-.767 0-1.462-.13-2.083-.387-.62-.258-1.106-.593-1.458-1.006-.35-.413-.527-.845-.527-1.297 0-.298.09-.55.268-.75z";
                break;
            case 6:
                i = "M16.244 12.714c.378-.958.93-1.686 1.656-2.184.727-.498 1.61-.747 2.646-.747.52 0 1.018.065 1.49.194.47.128.89.313 1.252.553.305.205.545.435.72.69.177.255.264.5.264.734 0 .264-.084.478-.254.642-.17.164-.393.246-.668.246-.164 0-.318-.03-.462-.092-.143-.062-.318-.175-.523-.34-.304-.257-.602-.446-.892-.566-.29-.12-.602-.18-.936-.18-.855 0-1.504.365-1.947 1.094-.442.73-.67 1.792-.68 3.186h.078c.135-.345.35-.652.642-.918.293-.267.637-.473 1.033-.62.395-.146.81-.22 1.243-.22.727 0 1.374.165 1.943.493.567.327 1.01.785 1.33 1.374.32.59.48 1.26.48 2.017 0 .827-.182 1.557-.546 2.19-.363.633-.874 1.123-1.533 1.472-.66.35-1.416.523-2.27.523-.763 0-1.446-.147-2.05-.44-.603-.293-1.104-.72-1.502-1.283-.72-1.013-1.08-2.458-1.08-4.333 0-1.366.188-2.528.566-3.486zm2.223 6.592c.185.337.44.6.765.79.325.192.693.287 1.103.287.404 0 .763-.092 1.077-.277.313-.185.556-.445.73-.782.172-.337.258-.725.258-1.165 0-.434-.087-.818-.263-1.152-.176-.334-.422-.592-.74-.774-.315-.18-.68-.272-1.097-.272-.404 0-.768.094-1.09.28-.322.19-.573.448-.752.78-.178.33-.268.707-.268 1.128 0 .434.093.82.277 1.156z";
                break;
            case 7:
                i = "M17.452 20.356l4.122-8.35v-.07h-4.922c-.363 0-.646-.086-.848-.26-.202-.172-.303-.405-.303-.697 0-.294.102-.53.304-.71.202-.178.485-.267.848-.267h6.153c.357 0 .65.108.88.325.227.217.34.504.34.86 0 .23-.038.475-.117.735-.08.26-.2.556-.365.884l-4.14 8.578c-.13.252-.278.44-.448.567-.17.126-.375.19-.615.19-.317 0-.58-.1-.787-.3-.208-.2-.312-.454-.312-.765 0-.21.072-.45.212-.72z";
                break;
            case 8:
                i = "M21.53 20.286c.346-.17.617-.404.813-.703.197-.3.295-.636.295-1.01 0-.382-.098-.723-.295-1.025-.196-.3-.467-.537-.813-.707-.345-.17-.738-.254-1.177-.254-.44 0-.832.085-1.178.255-.346.17-.617.407-.813.708-.196.302-.295.643-.295 1.024 0 .375.1.712.295 1.01.196.3.467.534.813.704.346.17.738.255 1.178.255.44 0 .832-.084 1.177-.254zm-.197-5.572c.29-.147.515-.352.676-.615.16-.265.24-.564.24-.898 0-.328-.08-.62-.24-.88-.162-.257-.387-.46-.677-.605-.29-.147-.617-.22-.98-.22-.364 0-.69.073-.98.22-.29.146-.516.348-.677.606-.16.258-.242.55-.242.88 0 .327.08.623.242.887.16.264.387.47.677.62.29.15.616.224.98.224.363 0 .69-.074.98-.22zm-3.428 7.1c-.7-.292-1.242-.705-1.626-1.238-.385-.533-.577-1.148-.577-1.846 0-.492.104-.946.312-1.362.208-.416.503-.766.883-1.05.38-.284.82-.476 1.32-.576v-.132c-.64-.2-1.138-.533-1.495-1.002-.358-.468-.536-1.022-.536-1.66 0-.616.175-1.164.527-1.644.35-.48.844-.856 1.476-1.125.633-.27 1.354-.406 2.163-.406.808 0 1.53.135 2.162.405.632.268 1.125.643 1.476 1.124.353.48.53 1.028.53 1.643 0 .633-.182 1.185-.542 1.657-.36.472-.86.807-1.5 1.006v.132c.5.1.938.292 1.315.576.378.284.673.634.884 1.05.21.416.316.867.316 1.354 0 .69-.196 1.305-.59 1.84-.39.537-.94.953-1.647 1.25-.706.295-1.516.443-2.43.443-.914 0-1.72-.147-2.42-.44z";
                break;
            case 9:
                i = "M21.838 12.72c-.176-.34-.422-.606-.738-.797-.317-.19-.677-.285-1.08-.285-.4 0-.756.093-1.07.28-.313.188-.556.452-.73.792-.172.34-.258.727-.258 1.16 0 .434.086.816.26 1.147.172.33.415.59.73.774.312.185.67.277 1.075.277.405 0 .764-.092 1.077-.276.313-.184.558-.442.734-.773.176-.33.264-.71.264-1.138 0-.435-.088-.82-.264-1.16zm-5.498 6.727c.173-.167.39-.25.655-.25.147 0 .284.027.413.083.13.055.284.157.466.303.3.264.598.46.897.584.3.126.64.19 1.02.19.86 0 1.518-.37 1.97-1.112.45-.742.676-1.798.676-3.17h-.08c-.216.558-.584.997-1.103 1.32-.518.322-1.117.483-1.797.483-.732 0-1.383-.167-1.95-.5-.57-.335-1.012-.804-1.328-1.407-.317-.603-.475-1.288-.475-2.056 0-.82.182-1.545.545-2.175.363-.63.876-1.12 1.538-1.465s1.424-.518 2.285-.518c.974 0 1.803.24 2.49.72.684.48 1.207 1.18 1.567 2.1.36.92.54 2.03.54 3.332 0 1.364-.187 2.52-.562 3.462-.375.943-.925 1.658-1.652 2.145-.726.486-1.61.73-2.654.73-.51 0-.996-.06-1.456-.177-.46-.117-.868-.287-1.226-.51-.322-.2-.576-.426-.76-.68-.185-.255-.277-.512-.277-.77 0-.275.087-.496.26-.663z"
        }
        return '\n<svg class="' + t + '" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="none" fill-rule="evenodd">\n    <path d="M8.832 19.334c-.2 0-.38-.08-.54-.24-.17-.168-.253-.35-.253-.546 0-.215.088-.406.266-.575l1.6-1.6-1.6-1.6c-.178-.186-.267-.382-.267-.587 0-.196.074-.37.225-.52.155-.154.33-.232.526-.232.21 0 .404.09.582.267l1.607 1.6 1.59-1.592c.184-.183.38-.274.59-.274.195 0 .375.082.54.246.16.16.238.34.238.54 0 .21-.088.404-.266.582l-1.6 1.6 1.6 1.606c.182.177.273.37.273.58 0 .192-.077.365-.232.52-.155.155-.33.233-.526.233-.21 0-.404-.088-.582-.266l-1.6-1.606-1.6 1.6c-.176.177-.368.266-.573.266z" fill="#000"/>\n    <path d="' + i + '" fill="#000"/>\n  </g>\n</svg>\n  '
    }

    function S() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
        return '\n<svg class="' + e + '" viewBox="279 24 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M289.53 36l-2.233 2.233c-.39.39-.387 1.02.004 1.412l.053.052c.397.397 1.024.393 1.413.004L291 37.47l2.234 2.23c.39.39 1.016.394 1.413-.003l.052-.052c.39-.39.392-1.023.003-1.412L292.47 36l2.233-2.233c.39-.39.387-1.02-.004-1.412l-.053-.052c-.397-.397-1.024-.393-1.413-.004L291 34.53l-2.234-2.23c-.39-.39-1.016-.394-1.413.003l-.052.052c-.39.39-.392 1.023-.003 1.412L289.53 36zM283 36c0-4.418 3.59-8 8-8 4.418 0 8 3.59 8 8 0 4.418-3.59 8-8 8-4.418 0-8-3.59-8-8z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  '
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.play = i, t.next = n, t.live = r, t.volume = o, t.expand = s, t.fullscreen = a, t.donate = l, t.like = u, t.share = h, t.add = d, t.subscribe = c, t.vk = p, t.hd = y, t.skipAd = f, t.error = v, t.errorWaiting = g, t.gotoLink = m, t.superComment = _, t.giftCount = b, t.bubbleClose = S
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.EMPTY = "empty", t.UNSTARTED = "unstarted", t.PLAYING = "playing", t.PAUSED = "paused", t.ENDED = "ended", t.ERROR = "error"
}, function(e, t, i) {
    e.exports = !i(14)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    var i = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = i)
}, function(e, t, i) {
    var n = i(66),
        r = i(62);
    e.exports = function(e) {
        return n(r(e))
    }
}, function(e, t) {
    var i = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return i.call(e, t)
    }
}, function(e, t, i) {
    var n = i(13),
        r = i(32),
        o = i(25),
        s = Object.defineProperty;
    t.f = i(6) ? Object.defineProperty : function(e, t, i) {
        if (n(e), t = o(t, !0), n(i), r) try {
            return s(e, t, i)
        } catch (a) {}
        if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
        return "value" in i && (e[t] = i.value), e
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.WAITING = 1, t.STARTED = 2, t.ENDED = 3, t.FAILED = 4, t.UPCOMING = 5
}, function(e, t) {
    "use strict";

    function i(e, t) {
        return 320 >= e && 240 >= t ? 240 : 640 >= e && 360 >= t ? 360 : 854 >= e && 480 >= t ? 480 : 1280 >= e && 720 >= t ? 720 : 1920 >= e && 1080 >= t ? 1080 : t
    }

    function n(e) {
        var t = [240, 360, 480, 720, 1080];
        return t[e] || 0
    }

    function r(e) {
        return 240 >= e ? 0 : 360 >= e ? 1 : 480 >= e ? 2 : 720 >= e ? 3 : 4
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.qualityFromSize = i, t.qualityFromIndex = n, t.indexFromQuality = r, t.AUTO = -1, t.DEFAULT = 480, t.HD = 720
}, function(e, t, i) {
    var n = i(15);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t) {
    var i = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++i + n).toString(36))
    }
}, function(e, t, i) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        a = i(1),
        l = function(e) {
            function t(i) {
                n(this, t);
                var o = r(this, e.call(this, i)),
                    s = i.getVars();
                return o.el = o.buildEl(s), o.initListeners(), o._delaySeek = 0, o
            }
            return o(t, e), t.prototype.buildEl = function(e) {
                var t = ce("video", {
                    preload: e.is_ext ? "none" : "metadata",
                    className: "videoplayer_media_provider",
                    poster: "/images/blank.gif"
                });
                return attr(t, "tabindex", -1), attr(t, "aria-hidden", "true"), t
            }, t.prototype.initListeners = function() {
                var e = this;
                this.domListen(this.el, "loadedmetadata", function() {
                    e._delaySeek && (e.currentTime = e._delaySeek, e._delaySeek = 0)
                })
            }, t.prototype.play = function() {
                var e = this.el.play();
                e && e["catch"](function(e) {})
            }, t.prototype.pause = function() {
                this.el.pause()
            }, t.prototype.load = function() {
                return this.el.load()
            }, t.prototype.canChangePlaybackRate = function() {
                return !!this.el.playbackRate
            }, t.prototype.reset = function() {
                this.el.pause(), this.el.src = "", this.el.load()
            }, t.prototype.destroy = function() {
                e.prototype.destroy.call(this), this.reset()
            }, s(t, [{
                key: "src",
                set: function(e) {
                    this.el.src = e
                },
                get: function() {
                    return this.el.src
                }
            }, {
                key: "currentSrc",
                get: function() {
                    return this.el.currentSrc || this.src
                }
            }, {
                key: "error",
                get: function() {
                    return this.el.error
                }
            }, {
                key: "currentTime",
                set: function(e) {
                    this.el.readyState ? this.el.currentTime = e : this._delaySeek = e
                },
                get: function() {
                    return this.el.readyState ? this.el.currentTime : this._delaySeek
                }
            }, {
                key: "duration",
                get: function() {
                    return this.el.duration
                }
            }, {
                key: "volume",
                set: function(e) {
                    this.el.volume = e
                },
                get: function() {
                    return this.el.volume
                }
            }, {
                key: "loop",
                set: function(e) {
                    this.el.loop = e
                },
                get: function() {
                    return this.el.loop
                }
            }, {
                key: "playbackRate",
                set: function(e) {
                    this.el.playbackRate = e
                },
                get: function() {
                    return this.el.playbackRate
                }
            }, {
                key: "readyState",
                get: function() {
                    return this.el.readyState
                }
            }, {
                key: "buffered",
                get: function() {
                    return this.el.buffered
                }
            }, {
                key: "played",
                get: function() {
                    return this.el.played
                }
            }]), t
        }(a.PlayerComponent);
    t["default"] = l
}, function(e, t) {
    var i = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = i)
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, i) {
    var n = i(10),
        r = i(23);
    e.exports = i(6) ? function(e, t, i) {
        return n.f(e, t, r(1, i))
    } : function(e, t, i) {
        return e[t] = i, e
    }
}, function(e, t, i) {
    var n = i(35),
        r = i(19);
    e.exports = Object.keys || function(e) {
        return n(e, r)
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, i) {
    var n = i(7),
        r = "__core-js_shared__",
        o = n[r] || (n[r] = {});
    e.exports = function(e) {
        return o[e] || (o[e] = {})
    }
}, function(e, t, i) {
    var n = i(15);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var i, r;
        if (t && "function" == typeof(i = e.toString) && !n(r = i.call(e))) return r;
        if ("function" == typeof(i = e.valueOf) && !n(r = i.call(e))) return r;
        if (!t && "function" == typeof(i = e.toString) && !n(r = i.call(e))) return r;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.INLINE = 1, t.END_SMALL = 2, t.END_LARGE = 3
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.screenfull = function() {
        var e = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            t = function() {
                for (var e, t, i = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], n = 0, r = i.length, o = {}; r > n; n++)
                    if (e = i[n], e && e[1] in document) {
                        for (n = 0, t = e.length; t > n; n++) o[i[0][n]] = e[n];
                        return o
                    }
                return !1
            }(),
            i = {
                request: function n(i) {
                    var n = t.requestFullscreen;
                    i = i || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? i[n]() : i[n](e && Element.ALLOW_KEYBOARD_INPUT)
                },
                exit: function() {
                    document[t.exitFullscreen]()
                },
                toggle: function(e) {
                    this.isFullscreen ? this.exit() : this.request(e)
                },
                raw: t
            };
        return t ? (Object.defineProperties(i, {
            isFullscreen: {
                get: function() {
                    return Boolean(document[t.fullscreenElement])
                }
            },
            element: {
                enumerable: !0,
                get: function() {
                    return document[t.fullscreenElement]
                }
            },
            enabled: {
                enumerable: !0,
                get: function() {
                    return Boolean(document[t.fullscreenEnabled])
                }
            }
        }), i) : !1
    }()
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.EndScreen = void 0;
    var a = i(1),
        l = i(2),
        u = n(l),
        h = i(4),
        d = n(h),
        c = i(26),
        p = n(c);
    t.EndScreen = function(e) {
        function t(i) {
            r(this, t);
            var n = o(this, e.call(this, i));
            return n.el = se('\n<div class="videoplayer_end_screen">\n  <div class="videoplayer_end_info">\n    <a href="/videos' + n.getVar("oid") + '" target="_blank">\n      <img class="videoplayer_end_info_author_photo" src="' + n.getVar("author_photo") + '"/>\n    </a>\n    <div class="videoplayer_end_info_title">' + n.getVar("md_title") + '</div>\n    <div class="videoplayer_end_info_author_name">\n      <a href="/videos' + n.getVar("oid") + '" target="_blank" class="videoplayer_end_info_author_link">' + n.getVar("md_author") + '</a>\n      <div class="videoplayer_end_info_subscribe">' + d.subscribe("_icon_subscribe") + '</div>\n    </div>\n  </div>\n  <div class="videoplayer_end_actions">\n    <div class="_like">\n      ' + d.like("_like_icon") + "\n      " + n.getLang("like") + '\n    </div>\n    <div class="_share">\n      ' + d.share("_share_icon") + "\n      " + n.getLang("share") + '\n    </div>\n    <div class="_add">\n      ' + d.add("_add_icon") + "\n      " + n.getLang("add") + "\n    </div>\n  </div>\n</div>\n    "), n._info = domByClass(n.el, "videoplayer_end_info"), n._actions = domByClass(n.el, "videoplayer_end_actions"), n._subscribeBtn = domByClass(n.el, "videoplayer_end_info_subscribe"), n.setLiked(!!i.videoLiked), n.setAdded(!!i.videoAdded), n.setSubscribed(!!i.isSubscribed), n.domListen(n.el, "click", function(e) {
                e.target === n.el && n.player.togglePlay()
            }), n.domListen("_like", "click", function() {
                i.likeVideo(n._largeActions ? p.END_LARGE : p.END_SMALL)
            }), n.domListen("_share", "click", function() {
                i.shareVideo(n._largeActions ? p.END_LARGE : p.END_SMALL)
            }), n.domListen("_add", "click", function() {
                i.addVideo(n._largeActions ? p.END_LARGE : p.END_SMALL)
            }), n.domListen(n._subscribeBtn, "click", function() {
                i.subscribeToAuthor(n._largeActions ? p.END_LARGE : p.END_SMALL)
            }), n.attachTooltip({
                el: "_like",
                text: function() {
                    return n._largeActions ? null : n.getLang("like")
                },
                hideDelay: 200
            }), n.attachTooltip({
                el: "_share",
                text: function() {
                    return n._largeActions ? null : n.getLang("share")
                },
                hideDelay: 200
            }), n.attachTooltip({
                el: "_add",
                text: function() {
                    return n.getLang(n.player.videoAdded ? "added" : "add")
                },
                hideDelay: 200
            }), n.attachTooltip({
                el: n._subscribeBtn,
                text: function() {
                    return n.getLang(n.player.isSubscribed ? "subscribed" : "subscribe")
                },
                toDown: !0
            }), n.getVar("can_add") || addClass(n._actions, "_no_add"), n.updateShareActionsVisibility(), toggle(n._subscribeBtn, !!n.getVar("can_subscribe")), n.playerListen(u.VIDEO_LIKE, function(e) {
                n.setLiked(e)
            }), n.playerListen(u.VIDEO_ADD, function(e) {
                n.setAdded(e)
            }), n.playerListen(u.SUBSCRIBED, function(e) {
                n.setSubscribed(e)
            }), n
        }
        return s(t, e), t.prototype.setLiked = function(e) {
            toggleClass(domByClass(this.el, "_like"), "_liked", e)
        }, t.prototype.setAdded = function(e) {
            toggleClass(domByClass(this.el, "_add"), "_added", e)
        }, t.prototype.setSubscribed = function(e) {
            toggleClass(this._subscribeBtn, "_subscribed", e)
        }, t.prototype.resize = function(e, t) {
            this._largeActions = e > 250 && t > 200, toggleClass(this._actions, "_large", this._largeActions)
        }, t.prototype.updateShareActionsVisibility = function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
            toggle(this._actions, !this.getVar("nolikes") && e)
        }, t.prototype.isStretchMode = function() {
            return !1
        }, t
    }(a.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.Slider = void 0;
    var a = i(1),
        l = i(3),
        u = n(l);
    t.Slider = function(e) {
        function t(i, n) {
            r(this, t);
            var s = o(this, e.call(this, i));
            return s.el = s.buildEl(), s._transformProp = u.getCssProp("transform"), s._loaded = domByClass(s.el, "_loaded"), s._filled = domByClass(s.el, "_filled"), s._handle = domByClass(s.el, "_handle"), s._handleWrap = domByClass(s.el, "_handle_wrap"), s._callbacks = n || {}, s.domListen(s.el, "mousemove", s.onMove), s.domListen(s.el, "mouseleave", s.onOut), s.domListen(s.el, "mousedown", s.onMouseDown), s.domListen(s.el, "keydown", s.onKeydown), s
        }
        return s(t, e), t.prototype.buildEl = function() {
            return se('\n<div class="videoplayer_slider" tabindex="0" role="slider">\n  <div class="_bars_wrap">\n    <div class="_loaded"></div>\n    <div class="_filled"></div>\n  </div>\n  <div class="_handle_wrap">\n    <div class="_handle"></div>\n  </div>\n</div>\n    ')
        }, t.prototype.initAria = function(e) {
            attr(this.el, "aria-label", e.label), attr(this.el, "aria-valuemin", e.valuemin), attr(this.el, "aria-valuemax", e.valuemax), this._ariaValues = e, this.updateAriaValue(this._filledPercent || 0)
        }, t.prototype.updateAriaValue = function(e) {
            if (this._ariaValues) {
                var t = this._ariaValues,
                    i = t.valuemin + Math.round((t.valuemax - t.valuemin) * e),
                    n = t.valuetext(i, t.valuemin, t.valuemax);
                attr(this.el, "aria-valuenow", i), attr(this.el, "aria-valuetext", n)
            }
        }, t.prototype.setLoaded = function(e) {
            if (e = Math.min(1, Math.max(0, e)), this._transformProp) var t = this._transformProp,
                i = "translateX(" + 100 * e + "%)";
            else var t = "marginLeft",
                i = 100 * e + "%";
            setStyle(this._loaded, t, i)
        }, t.prototype.setFilled = function(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
            if (e = Math.min(1, Math.max(0, e)), this._transformProp) var i = this._transformProp,
                n = "translateX(" + 100 * e + "%)";
            else var i = "marginLeft",
                n = 100 * e + "%";
            setStyle(this._filled, i, n), setStyle(this._handleWrap, i, n), this._filledPercent = e, t && this.updateAriaValue(e)
        }, t.prototype.disable = function() {
            this._disabled = !0, addClass(this.el, "_disabled")
        }, t.prototype.enable = function() {
            this._disabled = !1, removeClass(this.el, "_disabled")
        }, t.prototype.onMove = function(e) {
            if (!this._disabled) {
                var t = this._getMouseProgress(e);
                this._callbacks.mousemove && this._callbacks.mousemove(t)
            }
        }, t.prototype.onOut = function(e) {
            this._disabled || this._callbacks.mouseout && this._callbacks.mouseout()
        }, t.prototype.onMouseDown = function(e) {
            if (!this._disabled) {
                this.dragging = !0, addClass(this.el, "_dragging"), this.domListen(window, "mousemove", this.onMouseMove), this.domListen(document, "selectstart", this.onSelectStart), this.domListenOnce(window, "mouseup", this.onMouseUp);
                var t = this._getMouseProgress(e);
                this.setFilled(t);
                var i = e.target == this._handle;
                this._callbacks.dragStart && this._callbacks.dragStart(t, i), this.player.onTouchedByUser()
            }
        }, t.prototype.onMouseMove = function(e) {
            if (!this._disabled) {
                var t = this._getMouseProgress(e);
                this.setFilled(t), this._callbacks.drag && this._callbacks.drag(t), e.preventDefault()
            }
        }, t.prototype.onMouseUp = function(e) {
            if (!this._disabled) {
                this.dragging = !1, removeClass(this.el, "_dragging"), this.domUnlisten(window, "mousemove", this.onMouseMove), this.domUnlisten(document, "selectstart", this.onSelectStart);
                var t = this._getMouseProgress(e);
                this.setFilled(t), this.hidden && this.toggleVisibility(!1), this._callbacks.dragEnd && this._callbacks.dragEnd(t)
            }
        }, t.prototype.onSelectStart = function(e) {
            e.preventDefault()
        }, t.prototype._getMouseProgress = function(e) {
            var t, i = this.el.getBoundingClientRect();
            if (this.vertical) {
                var n = e.pageY - scrollGetY();
                t = (i.height - (n - i.top)) / i.height
            } else t = (e.pageX - i.left) / i.width;
            return Math.max(0, Math.min(1, t))
        }, t.prototype.onKeydown = function(e) {
            var t;
            switch (e.keyCode) {
                case KEY.LEFT:
                case KEY.DOWN:
                    t = -1;
                    break;
                case KEY.RIGHT:
                case KEY.UP:
                    t = 1;
                    break;
                default:
                    return
            }
            this._callbacks.keyboardSlide && this._callbacks.keyboardSlide(t, e.altKey)
        }, t.prototype.setVertical = function(e) {
            this.vertical = e, toggleClass(this.el, "_vertical", e)
        }, t.prototype.toggleVisibility = function(e) {
            this.hidden = !e, this.dragging || toggleClass(this.el, "hidden", !e)
        }, t
    }(a.PlayerComponent)
}, function(e, t) {
    var i = {}.toString;
    e.exports = function(e) {
        return i.call(e).slice(8, -1)
    }
}, function(e, t, i) {
    var n = i(15),
        r = i(7).document,
        o = n(r) && n(r.createElement);
    e.exports = function(e) {
        return o ? r.createElement(e) : {}
    }
}, function(e, t, i) {
    e.exports = !i(6) && !i(14)(function() {
        return 7 != Object.defineProperty(i(31)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, i) {
    var n = i(35),
        r = i(19).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e) {
        return n(e, r)
    }
}, function(e, t) {
    t.f = Object.getOwnPropertySymbols
}, function(e, t, i) {
    var n = i(9),
        r = i(8),
        o = i(60)(!1),
        s = i(36)("IE_PROTO");
    e.exports = function(e, t) {
        var i, a = r(e),
            l = 0,
            u = [];
        for (i in a) i != s && n(a, i) && u.push(i);
        for (; t.length > l;) n(a, i = t[l++]) && (~o(u, i) || u.push(i));
        return u
    }
}, function(e, t, i) {
    var n = i(24)("keys"),
        r = i(16);
    e.exports = function(e) {
        return n[e] || (n[e] = r(e))
    }
}, function(e, t) {
    var i = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : i)(e)
    }
}, function(e, t, i) {
    var n = i(24)("wks"),
        r = i(16),
        o = i(7).Symbol,
        s = "function" == typeof o;
    e.exports = function(e) {
        return n[e] || (n[e] = s && o[e] || (s ? o : r)("Symbol." + e))
    }
}, function(e, t, i) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = i(58),
        o = n(r),
        s = i(45),
        a = n(s);
    window.Symbol || (window.Symbol = o["default"]), window.VideoPlayer = a["default"];
    try {
        stManager.done("videoplayer.js")
    } catch (l) {}
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PlayerStats = void 0;
    var a = i(1),
        l = i(3),
        u = n(l),
        h = i(2),
        d = n(h),
        c = i(5),
        p = n(c);
    t.PlayerStats = function(e) {
        function t(i) {
            r(this, t);
            var n = o(this, e.call(this, i));
            return n.playerListen(d.MEDIA_TIMEUPDATE, n.onMediaTimeupdate), n.playerListen(d.MEDIA_PLAYING, n.onMediaPlaying), n.playerListen(d.MEDIA_WAITING, n.onMediaWaiting), n.playerListen(d.MEDIA_SEEKING, n.onMediaSeeking), n.playerListen(d.MEDIA_SEEKED, n.onMediaSeeked), n.playerListen(d.MEDIA_ENDED, n.onMediaEnded), n.playerListen(d.MEDIA_VOLUMECHANGE, n.onMediaVolumeChange), n.playerListen(d.MEDIA_HLS_FIRST_LEVEL_LOADED, n.onMediaHlsFirstLevelLoaded), n.playerListen(d.MEDIA_HLS_FIRST_FRAG_LOADED, n.onMediaHlsFirstFragLoaded), n.playerListen(d.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(d.QUALITY_CHANGE, n.onQualityChange), n.playerListen(d.STATE_CHANGE, n.onStateChange), n.playerListen(d.ADS_LINEAR_STARTED, n.onLinearAdStarted), n.playerListen(d.ADS_LINEAR_COMPLETED, n.onLinearAdCompleted), window.ns_ || n.loadComScoreLib(), n
        }
        return s(t, e), t.prototype.initVideo = function(e) {
            this.viewCounterIncremented = !1, this.lastPlayProgressSent = 0, this.lastViewSegmentsUpdate = 0, this.needViewSegments = !(!e.vsegs_size || !e.vsegs_hash), this.playFinishedSent = !1, this.requestedPlay = 0, this.startedPlay = 0, this.startQuality = 0, this.pausedBeforeStart = !1, this.stallsCount = 0, this.seekDurations = [], this.hlsFirstLevelLoadTime = 0, this.hlsFirstFragLoadTime = 0, this.collectWatchStat = !0, this.maxTimePosition = 0, this.lastVolume = this.player.isMuted() ? 0 : this.player.getVolume(), this.initViewSegments(e), this.flushWatchData(), this.flushCandyData(), this.initComScoreLib()
        }, t.prototype.deinitVideo = function() {
            this.comScoreTag && (this.comScoreTag.stop(), this.comScoreTag = null), this.flushWatchData(), this.flushCandyData()
        }, t.prototype.initViewSegments = function(e) {
            this.curSegments = e.vsegs ? e.vsegs.split("|").pop() : ""
        }, t.prototype.loadComScoreLib = function() {
            var e = this;
            this._comScoreLoader = u.loadScript("/js/lib/streamsense.5.1.1.160316.min.js", {
                onLoad: function() {
                    e._comsScoreLoader = null, e.initComScoreLib()
                },
                onError: function() {
                    e._comScoreLoader = null
                }
            })
        }, t.prototype.initComScoreLib = function() {
            window.ns_ && this.player.isInited() && (this.comScoreMetaData = {
                ns_st_ci: this.player.getVideoId(),
                ns_st_cl: 1e3 * this.getVar("duration"),
                c3: this.getVar("ads_comscore_c3") || "*null",
                c4: "*null",
                c6: "*null"
            }, this.comScoreTag = new ns_.StreamingTag({
                customerC2: "13765216"
            }), this.player.isPlaying() && (this.player.isPlayingLinearAd() ? this.comScoreTag.playVideoAdvertisement() : this.comScoreTag.playVideoContentPart(this.comScoreMetaData)))
        }, t.prototype.saveWatchData = function() {
            this.collectWatchStat && this.requestedPlay && this.startedPlay && u.storage.set("video_last_watch_stat", {
                video: this.player.getVideoId(),
                hash: this.getVar("hash"),
                started: this.startedPlay - this.requestedPlay,
                played: this.player.getPlayedSeconds(),
                start_quality: this.startQuality,
                stalls_count: this.stallsCount,
                seek_durations: this.seekDurations.join(";"),
                first_level_loaded: this.hlsFirstLevelLoadTime,
                first_frag_loaded: this.hlsFirstFragLoadTime,
                is_hls: this.getVar("hls") ? 1 : 0,
                is_autoplay: this.player.isFromAutoplay() ? 1 : 0,
                is_touched: this.player.isTouchedByUser() ? 1 : 0,
                last_pos: this.player.curTime(),
                post_id: this.getVar("post_id"),
                module: this.getVar("module")
            })
        }, t.prototype.flushWatchData = function() {
            var e = u.storage.get("video_last_watch_stat");
            e && (ajax.post("al_video.php?act=watch_stat", e, {}), this.clearWatchData())
        }, t.prototype.clearWatchData = function() {
            u.storage.remove("video_last_watch_stat")
        }, t.prototype.flushCandyData = function() {
            var e = u.storage.get("video_live_candy_stat");
            e && (ajax.post("al_video.php?act=live_candy_stat", e, {}), u.storage.remove("video_live_candy_stat"))
        }, t.prototype.onMediaPlaying = function() {
            this.startedPlay || (this.startedPlay = vkNow(), this.getVar("hls") || (this.startQuality = this.player.getQuality()), this.saveWatchData(), this.sendPlayStarted(), this.sendPladformStat(), this.sendAdPostStatEvent("video_start"))
        }, t.prototype.onMediaWaiting = function(e, t) {
            e && t && (this.stallsCount++, this.saveWatchData())
        }, t.prototype.onMediaSeeking = function(e) {
            this.seekingStarted = vkNow()
        }, t.prototype.onMediaSeeked = function(e) {
            if (this.seekingStarted && !e) {
                var t = vkNow() - this.seekingStarted;
                this.seekDurations.push(t + "," + this.player.getQuality()), this.saveWatchData()
            }
        }, t.prototype.onMediaEnded = function() {
            this.playFinishedSent || (this.sendPlayFinished(), this.playFinishedSent = !0), this.saveWatchData()
        }, t.prototype.onMediaTimeupdate = function(e) {
            var t = this;
            if (this.viewCounterIncremented || this.player.isPlayingLinearAd() || (this.player.getPlayedSeconds() > 5 || this.player.getDuration() < 5) && (this.sendIncViewCounter(), this.viewCounterIncremented = !0), vkNow() - this.lastPlayProgressSent > 1e3 && (this.sendPlayProgress(e), this.lastPlayProgressSent = vkNow(), this.saveWatchData()), this.needViewSegments && vkNow() - this.lastViewSegmentsUpdate > 1e3) {
                var i = this.getViewSegments();
                i != this.curSegments && (this.curSegments = i, this.sendViewSegments(i))
            }
            e > this.maxTimePosition && ! function() {
                var i = t.player.getDuration() || 1,
                    n = t.maxTimePosition,
                    r = n / i * 100,
                    o = e / i * 100;
                t.player.isLooped() && .5 > i - e && (o = 100), e >= 3 && 3 > n && t.sendAdPostStatEvent("video_play_3s"), each([25, 50, 75, 95, 100], function(e, i) {
                    o >= i && i > r && t.sendAdPostStatEvent("video_play_" + i)
                }), t.maxTimePosition = e
            }()
        }, t.prototype.onMediaVolumeChange = function(e) {
            this.player.isTouchedByUser() && (e ? e && !this.lastVolume && this.sendAdPostStatEvent("video_volume_on") : this.sendAdPostStatEvent("video_volume_off")), this.lastVolume = e
        }, t.prototype.onMediaHlsFirstLevelLoaded = function(e) {
            this.hlsFirstLevelLoadTime = e, this.saveWatchData()
        }, t.prototype.onMediaHlsFirstFragLoaded = function(e, t) {
            this.hlsFirstFragLoadTime = e, this.startQuality = t, this.saveWatchData()
        }, t.prototype.onLiveCandyStat = function(e) {
            var t = u.storage.get("video_live_candy_stat") || {
                p2p_bytes: 0,
                cdn_bytes: 0,
                video: this.player.getVideoId(),
                hash: this.getVar("hash")
            };
            t.p2p_bytes += e.p2pBytes, t.cdn_bytes += e.cdnBytes, u.storage.set("video_live_candy_stat", t)
        }, t.prototype.onStateChange = function(e, t) {
            this.comScoreTag && !this.player.isPlayingLinearAd() && (e === p.PLAYING ? this.comScoreTag.playVideoContentPart(this.comScoreMetaData) : t === p.PLAYING && this.comScoreTag.stop()), this.requestedPlay || e !== p.PLAYING || (this.requestedPlay = vkNow()), this.startedPlay || e != p.PAUSED || (this.collectWatchStat = !1, this.pausedBeforeStart = !0), this.player.isTouchedByUser() && (e === p.PAUSED && this.sendAdPostStatEvent("video_pause"), e === p.PLAYING && t === p.PAUSED && this.sendAdPostStatEvent("video_resume"))
        }, t.prototype.onQualityChange = function() {
            this.player.externalCall("onVideoResolutionChanged", this.getVar("oid"), this.getVar("vid"), this.getVar("hash"), this.player.getQualityIndex())
        }, t.prototype.onFullscreenChange = function(e) {
            this.sendAdPostStatEvent(e ? "video_fullscreen_on" : "video_fullscreen_off")
        }, t.prototype.onLinearAdStarted = function(e) {
            this.sendAdsPlayStarted(), this.comScoreTag && (this.player.isPlaying() && this.comScoreTag.stop(), this.comScoreTag.playVideoAdvertisement()), "preroll" == e && (this.clearWatchData(), this.collectWatchStat = !1)
        }, t.prototype.onLinearAdCompleted = function() {
            this.sendAdsPlayFinished(), this.comScoreTag && (this.comScoreTag.stop(), this.player.isPlaying() && this.comScoreTag.playVideoContentPart(this.comScoreMetaData))
        }, t.prototype.sendAdPostStatEvent = function(e) {
            this.getVar("post_id") && this.player.externalCall("onAdPostStat", this.getVar("post_id"), e)
        }, t.prototype.sendPladformStat = function() {
            var e = !!this.getVar("ads_eid1") && !this.player.isFromAutoplay() && 0 == vk.lang;
            if (this.getVar("pladform_views_stat_hash") && ajax.post("al_video.php?act=pladform_views_stat", {
                    owner_id: this.getVar("oid"),
                    video_id: this.getVar("vid"),
                    sent: intval(e),
                    autoplay: intval(this.player.isFromAutoplay()),
                    hash: this.getVar("pladform_views_stat_hash")
                }), e) {
                var t = this.getVar("ads_pl") || 21469,
                    i = this.getVar("ads_eid1"),
                    n = this.player.getVideoId();
                vkImage().src = "//stat.pladform.ru/video/start?pl=" + t + "&videoid=" + i + "&vkvideoid=" + n
            }
        }, t.prototype.getViewSegments = function() {
            if (this.getVar("vsegs_size")) {
                var e = this.player.getPlayedRanges(),
                    t = this.getVar("vsegs_size"),
                    i = Math.ceil(this.getVar("duration") / t),
                    n = u.fillArray(new Array(i), 0);
                this.curSegments && this.unpackViewSegments(this.curSegments, n);
                for (var r = 0; r < e.length; ++r)
                    for (var o = Math.round(e.start(r)), s = Math.round(e.end(r)), a = Math.floor(o / t), l = Math.floor(s / t), h = a; l >= h; ++h) {
                        var d = t * h,
                            c = Math.min(this.getVar("duration"), d + t);
                        n[h] += (Math.min(c, s) - Math.max(d, o)) / (c - d)
                    }
                return this.packViewSegments(n)
            }
        }, t.prototype.packViewSegments = function(e) {
            for (var t = [], i = e[0] >= .5, n = 1, r = 1; r < e.length; ++r) {
                var o = e[r] >= .5;
                o == i ? ++n : (t.push(n), i = o, n = 1)
            }
            return i && t.push(n), t.length && e[0] < .5 && t.unshift(0), t.join(",")
        }, t.prototype.unpackViewSegments = function(e, t) {
            e = e.split(",");
            for (var i = 0, n = 0; i < e.length; ++i) {
                var r = i % 2 == 0,
                    o = +e[i];
                u.fillArray(t, r ? 1 : 0, n, n + o), n += o
            }
            return t
        }, t.prototype.sendIncViewCounter = function() {
            var e = this.getVars();
            this.player.externalCall("incViewCounter", e.oid, e.vid, e.hash, this.player.getQualityIndex(), e.hd, "html5")
        }, t.prototype.sendPlayProgress = function(e) {
            var t = this.getVars();
            this.player.externalCall("onVideoPlayProgress", t.oid, t.vid, t.hash, e, t.duration)
        }, t.prototype.sendPlayStarted = function() {
            var e = this.getVars(),
                t = e.hls ? e.live ? "live_hls" : "hls" : e.live ? "live_mp4" : "mp4",
                i = !!this.pausedBeforeStart;
            this.player.externalCall("onVideoPlayStarted", e.oid, e.vid, e.hash, t, i)
        }, t.prototype.sendPlayFinished = function() {
            this.player.externalCall("onVideoPlayFinished")
        }, t.prototype.sendViewSegments = function() {
            this.getVar("vsegs_hash") && externalCall("onViewSegmentsChanged", oid, vid, segments, this.getVar("vsegs_hash"))
        }, t.prototype.sendAdsLoadStarted = function() {
            this.player.externalCall("onVideoAdsLoadStarted")
        }, t.prototype.sendAdsPlayStarted = function() {
            this.player.externalCall("onVideoAdsPlayStarted")
        }, t.prototype.sendAdsPlayFinished = function() {
            this.player.externalCall("onVideoAdsPlayFinished")
        }, t.prototype.sendAdsEvent = function(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1];
            if (this.player.isInited()) {
                var i = this.getVar("ads_stat_hash") || "",
                    n = this.getVar("pl_type") || "";
                "postroll" == t && (e = "post-" + e);
                var r = "preroll" == t || "postroll" == t ? "linear" : t;
                this.player.externalCall("onVideoAdEvent", this.getVar("oid"), this.getVar("vid"), i, e, r, "", n)
            }
        }, t.prototype.sendAdShown = function(e, t) {
            if (this.player.isInited()) {
                var i = e;
                "preroll" == e ? i = "pre" : "postroll" == e && (i = "post"), this.player.externalCall("onVideoAdShown", this.getVar("oid"), this.getVar("vid"), i, t)
            }
        }, t.prototype.sendViewSegments = function(e) {
            var t = this.getVars();
            t.vsegs_hash && this.player.externalCall("onViewSegmentsChanged", t.oid, t.vid, e, t.vsegs_hash)
        }, t
    }(a.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = i(3),
        s = n(o),
        a = "5d04",
        l = "5d05",
        u = "5d10",
        h = "5d31",
        d = "5d41",
        c = ["play", "pause", "resume", "stop", "seek", "buf_start", "buf_stop", "heartbeat", "bitrate_change", "error"],
        p = 100,
        y = 3e4,
        f = function() {
            function e(t, i) {
                r(this, e), this.player = t, this.media = i, this.gotNetworkStatus = !1, this.supported = !0, this.paused = !1, this.stopped = !0, this.eventsQueue = []
            }
            return e.prototype.init = function(e, t, i, n) {
                t ? this.svcid = n ? h : l : i ? this.svcid = u : this.svcid = n ? d : a, this.inited || (this.cid = e, this.getNetworkStatus(), this.inited = !0)
            }, e.prototype.reset = function() {
                this.flushEventsQueue(), this.stopHeartbeats(), this.paused = !1, this.stopped = !0, this.bufStarted = 0
            }, e.prototype.enable = function(e) {
                this.enabled = e
            }, e.prototype.getNetworkStatus = function() {
                var e = this;
                this.sendRequest("network_status", {
                    svcid: this.svcid,
                    cid: this.cid,
                    client: this.getClientData()
                }, {
                    onLoad: function(t) {
                        try {
                            e.supported = JSON.parse(t).supported
                        } catch (i) {
                            e.supported = !1
                        }
                        e.onNetworkStatusReceived()
                    },
                    onError: function() {
                        e.supported = !1, e.onNetworkStatusReceived()
                    }
                })
            }, e.prototype.onNetworkStatusReceived = function() {
                this.gotNetworkStatus = !0, this.supported ? this.flushEventsQueue() : this.clearEventsQueue()
            }, e.prototype.triggerEvent = function(e) {
                if (this.supported && this.enabled && inArray(e, c) && this.player.isInited() && (!this.stopped || "play" == e)) {
                    switch ("play" != e || this.stopped || (e = "resume"), e) {
                        case "play":
                            this.wid = irand(0, 1e10), this.seq = 0, this.buf_num = 0, this.paused = !1, this.stopped = !1, this.startHeartbeats();
                            break;
                        case "stop":
                            this.stopped = !0, this.bufStarted = 0, this.stopHeartbeats();
                            break;
                        case "pause":
                            if (this.paused) return;
                            this.paused = !0, this.stopHeartbeats();
                            break;
                        case "resume":
                            if (!this.paused) return;
                            this.paused = !1, this.startHeartbeats();
                            break;
                        case "buf_start":
                            if (this.bufStarted) return;
                            this.bufStarted = vkNow();
                            break;
                        case "buf_stop":
                            if (!this.bufStarted) return;
                            var t = vkNow() - this.bufStarted;
                            this.bufStarted = 0
                    }
                    var i = this.paramString({
                        type: e,
                        seq: ++this.seq,
                        ts: vkNow(),
                        tz: -60 * (new Date).getTimezoneOffset(),
                        pos: this.media.curTime(),
                        buffer: this.media.getBufferPercent(),
                        bytes: this.media.getLoadedBytes(),
                        bitrate: this.media.getBitrate(),
                        buf_num: "buf_start" == e ? ++this.buf_num : "buf_stop" == e ? this.buf_num : null,
                        buf_time: "buf_stop" == e ? t : null,
                        load_state: this.bufStarted ? "buffering" : null,
                        err: "error" == e ? this.media.getErrorCode() : null
                    });
                    this.eventsQueue.push(i), this.gotNetworkStatus && (clearTimeout(this.flushTimeout), this.eventsQueue.length > 10 || "bitrate_change" == e ? this.flushEventsQueue() : this.flushTimeout = setTimeout(this.flushEventsQueue.bind(this), p))
                }
            }, e.prototype.flushEventsQueue = function() {
                this.gotNetworkStatus && this.supported && this.eventsQueue.length && this.sendRequest("notify", {
                    svcid: this.svcid,
                    cid: this.cid,
                    wid: this.wid,
                    client: this.getClientData(),
                    co: this.getContentData(),
                    ev: this.eventsQueue
                }), this.clearEventsQueue()
            }, e.prototype.clearEventsQueue = function() {
                this.eventsQueue.length = 0
            }, e.prototype.startHeartbeats = function() {
                var e = this;
                clearInterval(this.heartbeatInterval), this.heartbeatInterval = setInterval(function() {
                    e.triggerEvent("heartbeat")
                }, y)
            }, e.prototype.stopHeartbeats = function() {
                clearInterval(this.heartbeatInterval)
            }, e.prototype.sendRequest = function(e, t) {
                var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                    n = i.onLoad,
                    r = i.onError,
                    o = "https://api.vigo.ru/uxzoom/1/" + e + "?" + this.queryString(t);
                s.request(o, {
                    onLoad: n,
                    onError: r
                })
            }, e.prototype.getClientData = function() {
                return this.paramString({
                    player: "HTML5"
                })
            }, e.prototype.getContentData = function() {
                return this.paramString({
                    duration: this.media.getDuration() || this.player.vars.duration,
                    quality: this.player.isAutoQualityEnabled() ? 100 : 2 + this.player.getQualityIndex(),
                    host: this.media.getContentHost()
                })
            }, e.prototype.paramString = function(e) {
                var t = [];
                return each(e, function(e, i) {
                    null != i && t.push(e + "=" + i)
                }), t.join(",")
            }, e.prototype.queryString = function(e) {
                var t = [];
                return each(e, function(e, i) {
                    isArray(i) || (i = [i]), each(i, function(i, n) {
                        t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                    })
                }), t.join("&")
            }, e.prototype.destroy = function() {
                this.reset()
            }, e
        }();
    t["default"] = f
}, function(e, t, i) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PlayerMedia = void 0;
    var l = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        u = i(1),
        h = i(5),
        d = r(h),
        c = i(2),
        p = r(c),
        y = i(11),
        f = r(y),
        v = i(12),
        g = r(v),
        m = i(3),
        _ = r(m),
        b = i(41),
        S = n(b),
        E = i(17),
        L = n(E),
        w = i(44),
        T = n(w),
        C = i(43),
        A = n(C),
        k = 2e3,
        P = 24;
    t.PlayerMedia = function(e) {
        function t(i) {
            o(this, t);
            var n = s(this, e.call(this, i));
            return n.el = ce("div", {
                className: "videoplayer_media"
            }), n.playerListen(p.UI_SEEKSTART, n.onUiSeekStart), n.playerListen(p.UI_SEEKEND, n.onUiSeekEnd), n.playerListen(p.MEDIA_WAITING, n.onWaitingChange), n.playerListen(p.STATE_CHANGE, n.onStateChange), n.playerListen(p.QUALITY_CHANGE, n.onQualityChange), n._interruptionCheckerInterval = setInterval(n.checkInterruption.bind(n), 200), n.vigoStats = new S["default"](n.player, n), n
        }
        return a(t, e), t.prototype.initVideo = function(e) {
            if (e.live === f.FAILED) return void this.player.trigger(p.MEDIA_ERROR, {
                message: this.getLang("live_failed")
            });
            var t;
            switch (this.providerType()) {
                case "hls":
                    t = new T["default"](this.player);
                    break;
                case "base":
                    t = new L["default"](this.player);
                    break;
                case "flash":
                    t = new A["default"](this.player);
                    break;
                default:
                    return void this.player.trigger(p.MEDIA_ERROR, {
                        message: this.getLang("bad_browser")
                    })
            }
            this.attachProvider(t);
            var i = this.getInitialSrc(e);
            i ? e.live === f.UPCOMING || e.live === f.WAITING || e.live === f.STARTED && "flash" != this.providerType() ? this.checkLiveStarted(i) : t.src = i : this.setQuality(this.getInitialQuality(e));
            var n = this.getInitialTime(e);
            n > 0 && (t.currentTime = n, this.player.trigger(p.MEDIA_TIMEUPDATE, n));
            var r = this.player.isMuted() ? 0 : this.player.getVolume();
            t.volume = r, this.toggleLoop(!!e.repeat), this.updateVisibility(), this.vigoStats.init(e.vigo_cid, !!e.hls, !!e.extra, !!e.from_autoplay), this.vigoStats.enable(!e.live)
        }, t.prototype.getInitialSrc = function(e) {
            var t = this.providerType();
            return e.rtmp && "flash" == t ? e.rtmp : e.hls && ("hls" == t || e.live && "base" == t && this.player.isNativeHlsSupported()) ? e.hls_raw && window.URL && window.Blob ? URL.createObjectURL(new Blob([e.hls_raw], {
                type: "application/vnd.apple.mpegurl"
            })) : e.hls : void 0
        }, t.prototype.getInitialQuality = function(e) {
            var t = this.player.preferredQuality;
            e.from_autoplay && (t = Math.min(480, t));
            var i = e.hd_def ? g.qualityFromIndex(e.hd_def) : 0,
                n = g.qualityFromIndex(e.hd);
            return Math.min(Math.max(i, t), n)
        }, t.prototype.getInitialTime = function(e) {
            if (this.player.isActiveLive()) return -1;
            if (e.t) {
                var t = _.fromTimecode(e.t);
                if (t < e.duration) return t
            } else {
                var i = _.storage.get("video_last_watched"),
                    n = 864e5;
                if (i && i.video === this.player.getVideoId() && i.date - vkNow() < n && e.duration - i.time > 30) return i.time
            }
            return 0
        }, t.prototype.providerType = function() {
            return this.provider instanceof T["default"] ? "hls" : this.provider instanceof A["default"] ? "flash" : this.provider instanceof L["default"] ? "base" : this.chooseProvider()
        }, t.prototype.chooseProvider = function() {
            if (this.player.isInited()) {
                var e = this.player.getVars(),
                    t = e.hls && this.player.isMseHlsSupported(),
                    i = e.live && e.hls && this.player.isNativeHlsSupported(),
                    n = e.can_play_mp4 && (!e.live || e.postlive_mp4 || e.hls && i),
                    r = browser.flash >= P && (!e.live || e.rtmp || e.postlive_mp4),
                    o = e.is_flv || e.force_rtmp && r,
                    s = e.direct_mp4;
                return !t || s || o ? n && !o ? "base" : r ? "flash" : void 0 : "hls"
            }
        }, t.prototype.attachProvider = function(e) {
            var t = this;
            this.provider && this.destroyProvider(), this.provider = e, this.el.appendChild(e.el), this.domListen(e.el, "timeupdate", this.onTimeupdate), this.domListen(e.el, "progress", this.onProgress), this.domListen(e.el, "volumechange", this.onVolumechange), this.domListen(e.el, "durationchange", function() {
                t.player.trigger(p.MEDIA_DURATIONCHANGE, t.getDuration())
            }), this.domListen(e.el, "loadeddata", function(e) {
                t.buffering = !1
            }), this.domListen(e.el, "playing", function() {
                t.buffering = !1, t.player.trigger(p.MEDIA_PLAYING)
            }), this.domListen(e.el, "ended", function() {
                t.player.trigger(p.MEDIA_ENDED)
            }), this.domListen(e.el, "error", this.onError)
        }, t.prototype.destroyProvider = function() {
            this.provider && (this.domUnlisten(this.provider.el), re(this.provider.el), this.provider.destroy(), this.provider = null)
        }, t.prototype.deinitVideo = function() {
            this._disabled = !1, this.buffering = !1, this.interrupted = !1, this.aborted = !1, this.preloadRequested = !1, this.bufEndReached = !1, this.vigoStats.reset(), this.destroyProvider(), this.updateVisibility(), this.liveHlsCheckRequest && (this.liveHlsCheckRequest.abort(), this.liveHlsCheckRequest = null)
        }, t.prototype.checkLiveStarted = function(e) {
            var t = this,
                i = function o() {
                    t.player.checkLivePhase(function(e) {
                        if (e.phase === f.STARTED) {
                            if (t.player.getLivePhase() == f.UPCOMING && !e.live_preparing && t.player.externalCall("onLiveStarted", t.player.getVideoId())) return;
                            "hls" == t.providerType() ? n() : r()
                        } else {
                            var i = t.player.getLivePhase() !== f.UPCOMING || t.getVar("live_preparing") ? 2e3 : 15e3;
                            t.liveStartCheckTimeout = t.delay(function() {
                                t.player.checkLivePhase(o)
                            }, i)
                        }
                    })
                },
                n = function s() {
                    t.liveHlsCheckRequest = _.request(e, {
                        onLoad: r,
                        onError: function() {
                            t.player.isInited() && t.delay(s, 2e3)
                        }
                    })
                },
                r = function() {
                    t.player.changeLivePhase(f.STARTED), t.provider.src = e, t.provider.load(), t.player.isPlaying() && t.provider.play()
                };
            this.player.getLivePhase() == f.STARTED ? n() : i()
        }, t.prototype.checkLiveEnded = function() {
            var e = this;
            this.player.checkLivePhase(function(t) {
                switch (e.liveEndCheckTimeout = null, t.phase) {
                    case f.ENDED:
                        t.jpg && (e.player.vars.jpg = t.jpg), e.player.trigger(p.MEDIA_ENDED), e.switchToPostLive(t);
                        break;
                    case f.FAILED:
                        e.destroyProvider(), e.player.trigger(p.MEDIA_ERROR, {
                            message: e.getLang("live_failed")
                        });
                        break;
                    case f.STARTED:
                    case f.WAITING:
                        "flash" === e.providerType() && e.provider.recoverNetwork(), e.liveEndCheckTimeout = e.delay(e.checkLiveEnded, 3e3)
                }
            })
        }, t.prototype.checkPostlive = function() {
            var e = this,
                t = this.player.getVideoId();
            ajax.post("al_video.php?act=check_postlive", {
                oid: this.getVar("oid"),
                vid: this.getVar("vid"),
                hash: this.getVar("hash")
            }, {
                onDone: function(i) {
                    e.player.getVideoId() == t && (i.hls || i.postlive_mp4 ? e.switchToPostLive(i) : i.deleted || e.checkPostliveDelayed())
                },
                onFail: function() {
                    return e.player.getVideoId() == t ? (e.checkPostliveDelayed(), !0) : void 0
                }
            })
        }, t.prototype.checkPostliveDelayed = function() {
            this.delay(this.checkPostlive, 3e3)
        }, t.prototype.switchToPostLive = function(e) {
            var t = e.hls,
                i = (e.rtmp, e.postlive_mp4);
            this.undelay(this.liveStartCheckTimeout), this.destroyProvider();
            var n, r;
            t && this.player.isMseHlsSupported() ? (n = new T["default"](this.player), r = t) : t && this.player.isNativeHlsSupported() ? (n = new L["default"](this.player), r = t) : i && this.getVar("can_play_mp4") ? (n = new L["default"](this.player), r = i) : i && browser.flash >= P && (n = new A["default"](this.player), r = i), n && r ? (this.player.changeLivePhase(f.ENDED), this.player.changeState(d.ENDED), this.updateVisibility(), this.attachProvider(n), n.src = r) : (this.player.trigger(p.MEDIA_ERROR, {
                message: this.getLang("live_wait_record"),
                waiting: 1
            }), this.checkPostliveDelayed())
        }, t.prototype.getAvailableQualities = function() {
            var e = [];
            if (this.provider && this.provider.getAvailableQualities) e = this.provider.getAvailableQualities();
            else
                for (var t = this.getVar("hd") || 0, i = 0; t >= i; ++i) {
                    var n = g.qualityFromIndex(i);
                    n && this.getMp4Url(n) && e.push(n)
                }
            return e.sort(function(e, t) {
                return t - e
            })
        }, t.prototype.isAutoQualityAvailable = function() {
            return this.provider && this.provider.isAutoQualityAvailable && this.provider.isAutoQualityAvailable() || !1
        }, t.prototype.isAutoQualityEnabled = function() {
            return this.provider && this.provider.isAutoQualityEnabled && this.provider.isAutoQualityEnabled() || !1
        }, t.prototype.getQuality = function() {
            return this.provider && this.provider.getQuality ? this.provider.getQuality() : 0
        }, t.prototype.onTimeupdate = function() {
            var e = this.curTime();
            this.player.trigger(p.MEDIA_TIMEUPDATE, e), this.player.isActiveLive() || _.storage.set("video_last_watched", {
                video: this.player.getVideoId(),
                date: vkNow(),
                time: e
            })
        }, t.prototype.onProgress = function() {
            if (this.provider.buffered.length) {
                for (var e = this.provider.buffered, t = this.curTime(), i = 0; i < e.length; ++i)
                    if (!(e.end(i) <= t)) {
                        if (e.start(i) - t > 30) break;
                        t = e.end(i)
                    }
                this.player.trigger(p.MEDIA_PROGRESS, t / this.getDuration()), this.bufEndReached || e.end(e.length - 1) !== this.getDuration() || (this.bufEndReached = !0, this.player.isPlaying() && this.vigoStats.triggerEvent("heartbeat"))
            }
        }, t.prototype.onVolumechange = function() {
            this.player.trigger(p.MEDIA_VOLUMECHANGE, this.getVolume())
        }, t.prototype.onError = function(e) {
            if (!e || "hls" != this.providerType()) {
                var t = this.getErrorCode();
                if (this.player.debugLog("media error: " + t, {
                        force: !0
                    }), t == MediaError.MEDIA_ERR_ABORTED) this.aborted = !0;
                else {
                    var i = this.getLang("load_error");
                    t && (i += "<br><small>" + this.getLang("err_code", {
                        code: t
                    }) + "</small>"), this.player.trigger(p.MEDIA_ERROR, {
                        message: i
                    }), this.vigoStats.triggerEvent("error"), ajax.post("al_video.php?act=player_error_stat", {
                        provider: this.providerType(),
                        code: t,
                        host: this.getContentHost(),
                        quality: this.player.getQuality(),
                        is_auto_quality: this.isAutoQualityEnabled() ? 1 : 0,
                        hash: this.getVar("error_stat_hash")
                    }, {})
                }
                this.updateVisibility()
            }
        }, t.prototype.onStateChange = function(e, t) {
            switch (e) {
                case d.PLAYING:
                    this._disabled || this.vigoStats.triggerEvent("play");
                    break;
                case d.PAUSED:
                    this._disabled || this.vigoStats.triggerEvent("pause");
                    break;
                case d.ENDED:
                    this.vigoStats.triggerEvent("stop")
            }
        }, t.prototype.onQualityChange = function(e, t, i) {
            this.vigoStats.triggerEvent(i ? "heartbeat" : "bitrate_change")
        }, t.prototype.onWaitingChange = function(e, t) {
            this.updateVisibility(), this.vigoStats.triggerEvent(e ? "buf_start" : "buf_stop"), t && this.player.getLivePhase() === f.STARTED && (e ? this.liveEndCheckTimeout || (this.liveEndCheckTimeout = this.delay(this.checkLiveEnded, k)) : (this.undelay(this.liveEndCheckTimeout), this.liveEndCheckTimeout = null))
        }, t.prototype.onUiSeekStart = function(e) {
            this._ui_seeking = !0, this._frame_seeking = e, this.pause()
        }, t.prototype.onUiSeekEnd = function() {
            this._ui_seeking = !1, this._frame_seeking = !1, this.player.getState() === d.PLAYING && this.curTime() !== this.getDuration() && this.play()
        }, t.prototype.updateVisibility = function() {
            var e = this.buffering || this._disabled || !this.player.isInited() || this.aborted || this.player.getState() === d.ERROR;
            setStyle(this.el, {
                visibility: e && "flash" != this.providerType() ? "hidden" : ""
            })
        }, t.prototype.isWaiting = function() {
            return this.buffering || this.interrupted
        }, t.prototype.curTime = function() {
            return this.provider && this.provider.currentTime || 0
        }, t.prototype.getDuration = function() {
            return this.provider && this.provider.duration || 0
        }, t.prototype.setQuality = function(e) {
            if (this.provider.setQuality) return this.provider.setQuality(e), void(e == g.AUTO && this.vigoStats.triggerEvent("bitrate_change"));
            var t = this.getMp4Url(e),
                i = this.curTime();
            this.provider.src = t, this.player.onQualityChanged(e), this.player.isUnstarted() || (this.vigoStats.triggerEvent("bitrate_change"), this.provider.load(), this.provider.currentTime = i, this.player.isPlaying() && this.play(), this.buffering = !0, this._lastInterruptionCheckTime = null)
        }, t.prototype.seekTo = function(e) {
            var t = this;
            this._frame_seeking || this.vigoStats.triggerEvent("heartbeat"), this.provider.currentTime = Math.max(0, Math.min(this.player.getDuration(), e)), this._frame_seeking || this.vigoStats.triggerEvent("seek");
            var i = this.isInBufferedArea(e);
            i || (this.buffering = !0), this.player.trigger(p.MEDIA_SEEKING, i), this.domListenOnce(this.provider.el, "seeked", function(e) {
                t.buffering = !1, t.player.trigger(p.MEDIA_SEEKED, i)
            }), this._lastInterruptionCheckTime = null, this.onProgress()
        }, t.prototype.getVolume = function() {
            return this.provider.volume
        }, t.prototype.setVolume = function(e) {
            this.provider.volume = e
        }, t.prototype.isLooped = function() {
            return this.provider.loop
        }, t.prototype.toggleLoop = function(e) {
            return this.provider.loop = e
        }, t.prototype.canChangePlaybackRate = function() {
            return !!this.provider && this.provider.canChangePlaybackRate()
        }, t.prototype.setPlaybackRate = function(e) {
            this.provider.playbackRate = e
        }, t.prototype.getPlaybackRate = function() {
            return this.provider.playbackRate
        }, t.prototype.preload = function() {
            this.player.isUnstarted() && !this.preloadRequested && (this.preloadRequested = !0, this.vigoStats.triggerEvent("play"), this.provider.readyState || (this.buffering = !0), this.vigoStats.triggerEvent("pause"), this.provider.load())
        }, t.prototype.play = function() {
            this._disabled || (this.provider.readyState || (this.buffering = !0), this.provider.play(), this._lastInterruptionCheckTime = null)
        }, t.prototype.pause = function() {
            this._disabled || this.provider.pause()
        }, t.prototype.disablePlayback = function() {
            this._disabled = !0, this.pause(), this.updateVisibility(), this.vigoStats.triggerEvent("pause")
        }, t.prototype.enablePlayback = function() {
            this._disabled = !1, this.updateVisibility(), this.player.getState() === d.PLAYING && (this.play(), this.vigoStats.triggerEvent("play"))
        }, t.prototype.getMp4Url = function(e) {
            return this.getVar("direct_mp4") || this.getVar("postlive_mp4") || this.getVar("extra_data") || this.getVar("cache" + e) || this.getVar("url" + e)
        }, t.prototype.getPlayedRanges = function() {
            return this.provider ? this.provider.played : []
        }, t.prototype.getPlayedSeconds = function() {
            for (var e = 0, t = this.getPlayedRanges(), i = 0; i < t.length; ++i) e += t.end(i) - t.start(i);
            return e
        }, t.prototype.isInBufferedArea = function(e) {
            for (var t = this.provider.buffered, i = 0; i < t.length; ++i)
                if (t.start(i) <= e && e <= t.end(i)) return !0;
            return !1
        }, t.prototype.getBufferPercent = function() {
            var e = this.curTime(),
                t = this.getDuration(),
                i = this.provider.buffered;
            if (!t || !i.length) return 0;
            for (var n = 0; n < i.length; ++n) {
                var r = i.start(n),
                    o = i.end(n);
                if (e >= r && o >= e) return (o - r) / t * 100
            }
            return 0
        }, t.prototype.getLoadedBytes = function() {
            return this.provider.getLoadedBytes && this.provider.getLoadedBytes()
        }, t.prototype.getBitrate = function() {
            return this.provider.getBitrate && this.provider.getBitrate()
        }, t.prototype.getContentHost = function() {
            var e;
            return e = this.provider.getContentUrl ? this.provider.getContentUrl() : this.provider.currentSrc, e ? (_.parseUrl(e).host || "").replace(/:\d+$/, "") : null
        }, t.prototype.getErrorCode = function() {
            return this.provider.error && this.provider.error.code
        }, t.prototype.getErrorsLog = function() {
            return this.provider.getErrorsLog && this.provider.getErrorsLog() || null
        }, t.prototype.checkInterruption = function() {
            if (!this.player.isPlaying() || this._ui_seeking || this._disabled || this.buffering) return void(!this.interrupted || this.provider && this.provider.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA || (this.interrupted = !1));
            if (null != this._lastInterruptionCheckTime) {
                var e = this.provider.currentTime,
                    t = e - this._lastInterruptionCheckTime;
                if (t) this.interrupted = this.buffering = !1;
                else {
                    var i = this.player.isFromAutoplay() && !this.player.isTouchedByUser() && !e;
                    i || (this.interrupted = !0)
                }
            }
            this._lastInterruptionCheckTime = this.provider.currentTime
        }, t.prototype.destroy = function() {
            clearInterval(this._interruptionCheckerInterval), e.prototype.destroy.call(this)
        }, l(t, [{
            key: "buffering",
            get: function() {
                return !!this._buffering
            },
            set: function(e) {
                if (e != this._buffering) {
                    var t = this.isWaiting();
                    this._buffering = e;
                    var i = this.isWaiting();
                    t != i && this.player.trigger(p.MEDIA_WAITING, i, !1)
                }
            }
        }, {
            key: "interrupted",
            get: function() {
                return !!this._interrupted
            },
            set: function(e) {
                if (e != this._interrupted) {
                    var t = this.isWaiting();
                    this._interrupted = e;
                    var i = this.isWaiting();
                    t != i && this.player.trigger(p.MEDIA_WAITING, i, !0)
                }
            }
        }]), t
    }(u.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        u = i(17),
        h = r(u),
        d = i(3),
        c = n(d),
        p = function(e) {
            function t(i) {
                o(this, t);
                var n = s(this, e.call(this, i));
                return n._delaySrc = !1, n._delaySeek = 0, n._volume = 1, n._currentTime = 0, n._duration = 0, n._loop = !1, n._played = [], n
            }
            return a(t, e), t.prototype.buildEl = function(e) {
                var t = ce("div");
                renderFlash(t, {
                    url: "/swf/video_lite.swf",
                    id: c.uniqueId("flashprovider"),
                    version: 11,
                    preventhide: 1
                }, {
                    bgcolor: "#000000",
                    allowscriptaccess: "always",
                    allowfullscreen: "true",
                    wmode: "opaque"
                });
                var i = domFC(t);
                return addClass(i, "videoplayer_media_provider"), i
            }, t.prototype.initListeners = function() {
                var e = this;
                this.domListen(this.el, "load", function() {
                    setTimeout(function() {
                        e._delaySrc !== !1 && (e.src = e._delaySrc, e._delaySrc = !1), e._delayPlay && (e.play(), e._delayPlay = !1)
                    }, 0)
                }), this.domListen(this.el, "loadeddata", function() {
                    e.volume = e.volume, e.loop = e.loop, e._delaySeek && (e.currentTime = e._delaySeek, e._delaySeek = 0)
                }), this.domListen(this.el, "durationchange", function() {
                    e._duration = e.el.getDuration()
                }), this.domListen(this.el, "timeupdate", function() {
                    var t = e.el.getCurrentTime();
                    e.updatePlayed(e._currentTime, t), e._currentTime = t
                }), this.domListen(this.el, "error", function() {
                    e.player.debugLog("Flash error", {
                        force: !0
                    })
                })
            }, t.prototype.isFlashReady = function() {
                return !!this.el.play
            }, t.prototype.play = function() {
                this.el.play ? this.el.play() : this._delayPlay = !0
            }, t.prototype.pause = function() {
                this.el.pause ? this.el.pause() : this._delayPlay = !1
            }, t.prototype.updatePlayed = function(e, t) {
                if (e != t && !(Math.abs(t - e) > 1)) {
                    if (e > t) {
                        var i = [t, e];
                        e = i[0], t = i[1]
                    }
                    for (var n = this._played, r = n.length, o = 0;; o += 2) {
                        var s = n[o],
                            a = n[o + 1];
                        if (o >= r || s > t) return void n.splice(o, 0, e, t);
                        if (a >= e) {
                            for (var l = Math.min(n[o], e), u = Math.max(n[o + 1], t), h = 2, d = o + 2;; d += 2) {
                                var c = n[d],
                                    p = n[d + 1];
                                if (d >= r || c > u) break;
                                u = Math.max(u, p), h += 2
                            }
                            return void n.splice(o, h, l, u)
                        }
                    }
                }
            }, t.prototype.load = function() {}, t.prototype.reset = function() {}, t.prototype.recoverNetwork = function() {
                this.el.load && this._src && this.el.load(this._src)
            }, l(t, [{
                key: "duration",
                get: function() {
                    return this._duration
                }
            }, {
                key: "currentTime",
                get: function() {
                    return this.el.getCurrentTime ? this.el.getCurrentTime() : this._currentTime
                },
                set: function(e) {
                    this._currentTime = e, this.el.seek && this.duration ? this.el.seek(e) : this._delaySeek = e
                }
            }, {
                key: "volume",
                get: function() {
                    return this._volume
                },
                set: function(e) {
                    this._volume = e, this.el.setVolume && this.el.setVolume(e)
                }
            }, {
                key: "src",
                set: function(e) {
                    this.el.load ? (this.el.load(e), this.volume = this._volume) : this._delaySrc = e, this._src = e
                },
                get: function() {
                    return this._src || ""
                }
            }, {
                key: "loop",
                get: function() {
                    return this._loop
                },
                set: function(e) {
                    this._loop = e, this.el.setLoop && this.el.setLoop(e)
                }
            }, {
                key: "readyState",
                get: function() {
                    return this.el.getReadyState ? this.el.getReadyState() : 0
                }
            }, {
                key: "networkState",
                get: function() {
                    return this.el.getNetworkState ? this.el.getNetworkState() : 0
                }
            }, {
                key: "buffered",
                get: function() {
                    var e = this;
                    return {
                        length: 1,
                        start: function() {
                            return 0
                        },
                        end: function() {
                            return e.el.getBuffered ? e.el.getBuffered() : 0
                        }
                    }
                }
            }, {
                key: "played",
                get: function() {
                    var e = this._played.slice();
                    return {
                        length: e.length / 2,
                        start: function(t) {
                            return e[2 * t]
                        },
                        end: function(t) {
                            return e[2 * t + 1]
                        }
                    }
                }
            }]), t
        }(h["default"]);
    t["default"] = p
}, function(e, t, i) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        u = i(2),
        h = r(u),
        d = i(12),
        c = r(d),
        p = i(3),
        y = r(p),
        f = i(17),
        v = n(f),
        g = 5e3,
        m = function(e) {
            function t(i) {
                o(this, t);
                var n = s(this, e.call(this, i));
                return n.hlsFragLoadedBytes = n.hlsFragLoadingBytes = 0, n.hlsErrors = [], n.initHls(), n.initFirstFragStat(), n
            }
            return a(t, e), t.prototype.initListeners = function() {}, t.prototype.initHls = function(e) {
                var t = this,
                    i = {
                        autoStartLoad: !1,
                        capLevelToPlayerSize: !0,
                        debug: !!window.nav.objLoc.video_debug
                    };
                this.getVar("live_candy") && (this.candy = new Candy({
                    video: this.el,
                    streamKey: this.player.getVideoId(),
                    loadedCallback: function(e) {
                        return t.player.stats.onLiveCandyStat(e)
                    }
                }), i.fLoader = this.candy.hlsJsLoader()), this.hls = new Hls(i), this.hls.attachMedia(this.el), this.hls.on(Hls.Events.MANIFEST_LOADED, this.onManifestLoaded.bind(this)), this.hls.on(Hls.Events.LEVEL_SWITCH, this.onLevelSwitch.bind(this)), this.hls.on(Hls.Events.ERROR, this.onHlsError.bind(this)), this.hls.on(Hls.Events.FRAG_LOAD_PROGRESS, function(e, i) {
                    t.hlsFragLoadingBytes = i.frag.loaded, clearTimeout(t._fragLoadStuckTO), t._destroy || (t._fragLoadStuckTO = setTimeout(t.recoverNetwork.bind(t), g))
                }), this.hls.on(Hls.Events.FRAG_LOADED, function(e, i) {
                    t.hlsFragLoadedBytes += i.frag.loaded, t.hlsFragLoadingBytes = 0, clearTimeout(t._fragLoadStuckTO)
                })
            }, t.prototype.initFirstFragStat = function() {
                var e = this;
                this.hls.on(Hls.Events.LEVEL_LOADING, function t(i, n) {
                    e.hls.off(Hls.Events.LEVEL_LOADING, t);
                    var r = vkNow();
                    e.hls.on(Hls.Events.LEVEL_LOADED, function o(t, i) {
                        e.hls.off(Hls.Events.LEVEL_LOADED, o);
                        var n = vkNow() - r;
                        e.player.trigger(h.MEDIA_HLS_FIRST_LEVEL_LOADED, n)
                    })
                }), this.hls.on(Hls.Events.FRAG_LOADING, function i(t, n) {
                    e.hls.off(Hls.Events.FRAG_LOADING, i);
                    var r = vkNow();
                    e.hls.on(Hls.Events.FRAG_LOADED, function o(t, i) {
                        e.hls.off(Hls.Events.FRAG_LOADED, o);
                        var n = vkNow() - r,
                            s = e.hls.levels[i.frag.level],
                            a = c.qualityFromSize(s.width, s.height);
                        e.player.trigger(h.MEDIA_HLS_FIRST_FRAG_LOADED, n, a)
                    })
                })
            }, t.prototype.onManifestLoaded = function(e, t) {
                var i = this.player.getAvailableQualities();
                if (this.player.trigger(h.QUALITIES_LIST_CHANGE, i), i.length) {
                    var n = Math.max.apply(Math, i),
                        r = this.player.preferredQuality,
                        o = !!y.storage.get("video_abr_disabled") && !this.player.isFromAutoplay();
                    if (!o) {
                        var s = this.player.getPreloadedQuality(),
                            a = y.storage.get("video_abr_quality");
                        r = s || a || r, this.getVar("is_inline") && (r = Math.min(r, 480))
                    }
                    r = Math.min(r, n);
                    var l = this.getLevelIndexForQuality(r);
                    this.hls.startLevel = l, o ? this.setCurrentLevel(l) : this.player.onQualityChanged(r), this.getVar("live") && this.hls.levels.length > 1 && this.capLiveLevels(), this.manifestLoaded = !0, this.needLoad && this.load(), o || this.forceNextLevel(l)
                }
            }, t.prototype.onLevelSwitch = function(e, t) {
                var i = this.hls.levels[t.level],
                    n = c.qualityFromSize(i.width, i.height);
                this.player.onQualityChanged(n);
                var r = this.hls.autoLevelEnabled;
                if (r && this.hls.levels.length > 1 && n) {
                    var o = y.storage.get("video_abr_quality"),
                        s = Math.max.apply(Math, this.getAvailableQualities());
                    (s > n || n > o) && y.storage.set("video_abr_quality", n)
                }
            }, t.prototype.onHlsError = function(e, t) {
                var i = t.fatal || t.details === Hls.ErrorDetails.BUFFER_APPENDING_ERROR;
                t.details !== Hls.ErrorDetails.BUFFER_STALLED_ERROR && t.details !== Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE && this.player.debugLog(["hls", t.type, t.details], {
                    force: !0,
                    type: i ? "error" : "warn"
                }), this.hlsErrors.push("[" + this.currentTime + "]" + t.details), t.details === Hls.ErrorDetails.FRAG_LOAD_ERROR && clearTimeout(this._fragLoadStuckTO), i && (this.player.isActiveLive() ? t.type === Hls.ErrorTypes.MEDIA_ERROR ? (this.player.debugLog("trying to recover hls after media error", {
                    force: !0
                }), this.recoverMedia()) : t.type === Hls.ErrorTypes.NETWORK_ERROR && (this.player.debugLog("trying to recover hls after network error", {
                    force: !0
                }), this.delay(this.recoverNetwork, 2e3)) : vkNow() - intval(this._lastMediaRecoverTry) > 5e3 && (this._lastMediaRecoverTry = vkNow(), this.recoverMedia()), this.getVar("live") && !this.getVar("postlive_mp4") ? this.player.media.onError() : (ajax.post("al_video.php?act=hls_fail_stat", {
                    hash: this.getVar("hash"),
                    video: this.player.getVideoId(),
                    error: t.details,
                    response_code: t.response ? t.response.code : "",
                    url: t.frag && t.frag.url || t.context && t.context.url
                }, {}), this.player.debugLog("reinit without hls", {
                    force: !0
                }), this.player.reinitWithoutHls()))
            }, t.prototype.recoverMedia = function() {
                this.hls.recoverMediaError()
            }, t.prototype.recoverNetwork = function() {
                vkNow() - this._lastNetworkRecoverTry < 300 || (this._lastNetworkRecoverTry = vkNow(), this.hls.startLoad())
            }, t.prototype.setCurrentLevel = function(e) {
                this.hls.currentLevel = e
            }, t.prototype.filterLiveLevels = function(e) {
                var t;
                return each(e, function(e, i) {
                    var n = i.url && i.url[0];
                    return /source/.test(n) ? (t = i, !1) : void 0
                }), t && (e = e.filter(function(e) {
                    return e.height < t.height
                }), e.push(t)), e
            }, t.prototype.capLiveLevels = function() {
                var e = this;
                each(this.hls.levels, function(t, i) {
                    var n = i.url && i.url[0];
                    return /source/.test(n) ? (e.hls.autoLevelCapping = t, !1) : void 0
                })
            }, t.prototype.forceNextLevel = function(e) {
                var t = this;
                this.hls.on(Hls.Events.FRAG_LOADED, function i(n, r) {
                    t.hls.off(Hls.Events.FRAG_LOADED, i), r.frag.autoLevel && r.frag.level == e && (t.hls.nextLoadLevel = e)
                })
            }, t.prototype.setQuality = function(e) {
                e == c.AUTO ? (this.setCurrentLevel(-1), y.storage.remove("video_abr_disabled")) : (this.setCurrentLevel(this.getLevelIndexForQuality(e)), y.storage.set("video_abr_disabled", 1))
            }, t.prototype.getQuality = function() {
                if (this.hls.levels) {
                    var e = this.hls,
                        t = e.levels,
                        i = t[e.currentLevel] || t[e.loadLevel] || t[e.startLevel];
                    if (i) return c.qualityFromSize(i.width, i.height)
                }
                return 0
            }, t.prototype.getAvailableQualities = function() {
                var e = this.hls.levels || [];
                return this.getVar("live") && (e = this.filterLiveLevels(e)), e.map(function(e) {
                    return c.qualityFromSize(e.width, e.height)
                })
            }, t.prototype.isAutoQualityAvailable = function() {
                return this.hls.levels && this.hls.levels.length > 1
            }, t.prototype.isAutoQualityEnabled = function() {
                return this.hls.autoLevelEnabled
            }, t.prototype.getLevelIndexForQuality = function(e) {
                var t = -1;
                return each(this.hls.levels || [], function(i, n) {
                    return c.qualityFromSize(n.width, n.height) == e ? (t = i, !1) : void 0
                }), t
            }, t.prototype.load = function() {
                this.startedLoading || (this.manifestLoaded ? (this.hls.startLoad(this._delaySeek || -1), this.startedLoading = !0) : this.needLoad = !0)
            }, t.prototype.play = function() {
                this.startedLoading || this.load(), e.prototype.play.call(this)
            }, t.prototype.reset = function() {
                this._destroy = !0, clearTimeout(this._fragLoadStuckTO), this.hls.destroy(), this.hls = null, this.candy && (this.candy.destroy(), this.candy = null)
            }, t.prototype.getLoadedBytes = function() {
                return intval(this.hlsFragLoadedBytes) + intval(this.hlsFragLoadingBytes)
            }, t.prototype.getCurLevel = function() {
                if (this.hls.levels) {
                    var e = this.getLevelIndexForQuality(this.player.getQuality());
                    return this.hls.levels[e]
                }
            }, t.prototype.getBitrate = function() {
                var e = this.getCurLevel();
                return e ? e.bitrate / 1e3 : void 0
            }, t.prototype.getContentUrl = function() {
                var e = this.getCurLevel();
                return e ? e.url[0] : void 0
            }, t.prototype.getErrorsLog = function() {
                return this.hlsErrors.join(", ")
            }, l(t, [{
                key: "src",
                set: function(e) {
                    this.hls.loadSource(e)
                }
            }]), t
        }(v["default"]);
    t["default"] = m
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            function e(e, t) {
                var i = [],
                    n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
                } catch (l) {
                    r = !0, o = l
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        s = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        a = i(5),
        l = n(a),
        u = i(2),
        h = n(u),
        d = i(11),
        c = n(d),
        p = i(12),
        y = n(p),
        f = i(3),
        v = n(f),
        g = i(27),
        m = i(42),
        _ = i(51),
        b = i(46),
        S = i(40),
        E = 5e3,
        L = 1,
        w = function() {
            function e(t) {
                return r(this, e), this.setLangVars(t), this.el = ce("div", {
                    className: "videoplayer"
                }), attr(this.el, "tabindex", -1), attr(this.el, "role", "complementary"), attr(this.el, "aria-label", this.langVars.aria_videoplayer), this.state = l.EMPTY, this._volume = this.preferredVolume, this._muted = !this._volume, this._events = new EventEmitter, this.media = new m.PlayerMedia(this), this.el.appendChild(this.media.el), this.ads = new b.PlayerAds(this), this.el.appendChild(this.ads.el), this.ui = new _.PlayerUI(this), this.el.appendChild(this.ui.el), this.stats = new S.PlayerStats(this), this.on(h.MEDIA_PLAYING, this.onStartedPlaying.bind(this)).on(h.MEDIA_TIMEUPDATE, this.checkSuggestionQuarterWatched.bind(this)).on(h.MEDIA_ENDED, this.onEnded.bind(this)).on(h.MEDIA_ERROR, this.onError.bind(this)).on(h.UI_SEEKSTART, this.onUiSeekStart.bind(this)), window.addEventListener("resize", this._resizeHandler = this.resize.bind(this)), g.screenfull && document.addEventListener(g.screenfull.raw.fullscreenchange, this._fsChangeHandler = this.onFullscreenChange.bind(this)), VideoPlayer._instances && VideoPlayer._instances.add(this), this.initVideo(t), {
                    el: this.el,
                    initVideo: this.initVideo.bind(this),
                    deinitVideo: this.deinitVideo.bind(this),
                    on: this.on.bind(this),
                    getState: this.getState.bind(this),
                    getVideoId: this.getVideoId.bind(this),
                    getVars: this.getVars.bind(this),
                    play: this.play.bind(this),
                    pause: this.pause.bind(this),
                    togglePlay: this.togglePlay.bind(this),
                    curTime: this.curTime.bind(this),
                    onLiked: this.onLiked.bind(this),
                    onAdded: this.onAdded.bind(this),
                    onSubscribed: this.onSubscribed.bind(this),
                    onExpanded: this.onExpanded.bind(this),
                    onLiveEnded: this.onLiveEnded.bind(this),
                    onStickersPurchased: this.onStickersPurchased.bind(this),
                    canExpand: this.canExpand.bind(this),
                    isFromAutoplay: this.isFromAutoplay.bind(this),
                    isTouchedByUser: this.isTouchedByUser.bind(this),
                    isFullscreen: this.isFullscreen.bind(this),
                    isActiveLive: this.isActiveLive.bind(this),
                    nextTimerStart: this.nextTimerStart.bind(this),
                    nextTimerReset: this.nextTimerReset.bind(this),
                    setSuggestions: this.setSuggestions.bind(this),
                    pushDonation: this.pushDonation.bind(this),
                    resize: this.resize.bind(this),
                    destroy: this.destroy.bind(this),
                    _player: t.dbg_on ? this : null
                }
            }
            return e.prototype.initVideo = function(e) {
                var t = this;
                e = clone(e, !0), this.vars = e, this.changeState(l.UNSTARTED, !0), this.videoLiked = e.liked, this.videoAdded = e.added, this.isSubscribed = e.is_subscribed, this._livePhase = e.live, this.trigger(h._INIT_VIDEO, e), e.from_autoplay && this.toggleMute(!0, !1), this.isActiveLive() && this.startLiveHeartbeat(), e.load_suggestions && this.loadSuggestions(), (window.requestAnimationFrame || window.setTimeout)(function() {
                    t.externalCall("onInitialized"), t.resize(), e.autoplay && t.play()
                }, 0)
            }, e.prototype.deinitVideo = function() {
                this.stopLiveHeartbeat(), this.changeState(l.EMPTY), this._quality = null, this._livePhase = null, this._startedPlaying = !1, this._didEnded = !1, this._suggestions = null, this._suggestionsQid = null, this.trigger(h._DEINIT_VIDEO), this.vars = null
            }, e.prototype.reinitWithoutHls = function() {
                var e = this.vars;
                this.deinitVideo(), delete e.hls, this.initVideo(e)
            }, e.prototype.setLangVars = function(e) {
                var t = this;
                this.langVars = {}, each(e, function(e, i) {
                    "lang_" === e.substr(0, 5) && (t.langVars[e.substr(5)] = i)
                })
            }, e.prototype.loadSuggestions = function() {
                var e = this,
                    t = this.getVideoId(),
                    i = this.vars.g || "",
                    n = this.vars.a || "",
                    r = this.vars.viewer_id || "",
                    o = this.vars.recommend_sig;
                o && v.request("//vk.go.mail.ru/vk/video_recommend?id=" + t + "&t_sex=" + i + "&t_age=" + n + "&uid=" + r + "&sig=" + o, {
                    onLoad: function(i) {
                        if (e.getVideoId() == t) {
                            var n = JSON.parse(i);
                            if (n && n.results && n.results.length) {
                                e._suggestionsQid = n.qid;
                                var r = n.results,
                                    o = !!e.vars.is_inline;
                                e.externalCall("fetchSuggestions", r.join(","), o)
                            }
                        }
                    }
                })
            }, e.prototype.checkSuggestionQuarterWatched = function(e) {
                this.isInited() && this.vars.suggestions_qid && !this._suggestionQuartedWatched && !this.isPlayingLinearAd() && e / this.getDuration() > .25 && (this._suggestionQuartedWatched = !0, this.onSuggestionQuarterWatched())
            }, e.prototype.isInited = function() {
                return this.getState() !== l.EMPTY
            }, e.prototype.getVars = function() {
                return this.vars
            }, e.prototype.getVideoId = function() {
                return this.isInited() ? this.vars.oid + "_" + this.vars.vid : null
            }, e.prototype.getVideoLink = function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0],
                    t = "https://vk.com/video" + this.getVideoId();
                return e && (t += "?t=" + v.toTimecode(this.curTime())), t
            }, e.prototype.getEmbedCode = function() {
                var e = this.vars,
                    t = "https://vk.com/video_ext.php?oid=" + e.oid + "&id=" + e.vid + "&hash=" + e.hash2;
                return '<iframe src="' + t + '" width="640" height="360" frameborder="0" allowfullscreen></iframe>'
            }, e.prototype.getDuration = function() {
                return this.isInited() ? this.isPlayingLinearAd() ? this.ads.getDuration() : this.media.getDuration() || intval(this.vars && this.vars.duration) : 0
            }, e.prototype.getAvailableQualities = function() {
                return this.media.getAvailableQualities()
            }, e.prototype.isAutoQualityAvailable = function() {
                return this.media.isAutoQualityAvailable()
            }, e.prototype.isAutoQualityEnabled = function() {
                return this.media.isAutoQualityEnabled()
            }, e.prototype.getQuality = function() {
                return this._quality || this.media.getQuality()
            }, e.prototype.getQualityIndex = function() {
                var e = this.getQuality();
                return y.indexFromQuality(e)
            }, e.prototype.setQuality = function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    i = t.setPreferred,
                    n = void 0 === i ? !0 : i;
                (inArray(e, this.getAvailableQualities()) || e === y.AUTO) && (e === y.AUTO && this.isAutoQualityEnabled() || (e !== this._quality || this.isAutoQualityEnabled()) && (this.media.setQuality(e), this.onQualityChanged(e === y.AUTO ? this.getQuality() : e), e !== y.AUTO && n && (this.preferredQuality = e, v.storage.set("video_preferred_quality", y.indexFromQuality(e))), this.getState() === l.ERROR && this.changeState(l.PLAYING)))
            }, e.prototype.onQualityChanged = function(e) {
                var t = this.isAutoQualityEnabled(),
                    i = this._quality;
                this._quality = e, this.trigger(h.QUALITY_CHANGE, e, i, t)
            }, e.prototype.play = function() {
                !this.isInited() || this.isPlaying() || this.hasError() || (this.getState() === l.UNSTARTED && this.onBeforeFirstPlay(), this.changeState(l.PLAYING), this.isPlayingLinearAd() ? this.ads.play() : this.media.play(), this.externalCall("onVideoStreamPlaying", this.vars.oid, this.vars.vid))
            }, e.prototype.pause = function() {
                this.isPlaying() && !this.hasError() && (this.isPlayingLinearAd() ? this.ads.pause() : this.media.pause(), this.changeState(l.PAUSED))
            }, e.prototype.isUnstarted = function() {
                return this.getState() === l.UNSTARTED
            }, e.prototype.isPlaying = function() {
                return this.getState() === l.PLAYING
            }, e.prototype.isBuffering = function() {
                return this.media.isWaiting()
            }, e.prototype.hasError = function() {
                return this.getState() === l.ERROR
            }, e.prototype.getLivePhase = function() {
                return this._livePhase
            }, e.prototype.changeLivePhase = function(e, t) {
                if (e != this._livePhase) {
                    var i = this._livePhase;
                    this._livePhase = e, this.trigger(h.LIVE_PHASE_CHANGE, e, i, t), this.isActiveLive() || this.stopLiveHeartbeat()
                }
            }, e.prototype.isActiveLive = function() {
                var e = this.getLivePhase();
                return e == c.WAITING || e == c.STARTED
            }, e.prototype.startLiveHeartbeat = function() {
                var e = this,
                    t = function i() {
                        ajax.post("al_video.php?act=live_heartbeat", {
                            oid: e.vars.oid,
                            vid: e.vars.vid,
                            user_id: e.vars.viewer_id,
                            hash: e.vars.live_heartbeat_hash
                        }, {
                            onDone: function(t) {
                                e.externalCall("onLiveViewersCountChange", e.getVideoId(), t)
                            },
                            onFail: function() {
                                return !0
                            }
                        }), e._liveHeartbeatTimeout = setTimeout(i, E)
                    };
                t()
            }, e.prototype.stopLiveHeartbeat = function() {
                this._liveHeartbeatTimeout && (clearTimeout(this._liveHeartbeatTimeout), this._liveHeartbeatTimeout = null, ajax.post("al_video.php?act=live_stop_heartbeat", {
                    oid: this.vars.oid,
                    vid: this.vars.vid,
                    user_id: this.vars.viewer_id,
                    hash: this.vars.live_heartbeat_hash
                }, {
                    onFail: function() {
                        return !0
                    }
                }))
            }, e.prototype.checkLivePhase = function(e) {
                var t = this,
                    i = this.getVideoId();
                ajax.post("al_video.php?act=check_live_phase", {
                    oid: this.vars.oid,
                    vid: this.vars.vid,
                    hash: this.vars.hash
                }, {
                    onDone: function(n) {
                        t.getVideoId() == i && e(n)
                    },
                    onFail: function() {
                        return t.getVideoId() == i && t.checkLivePhase(e), !0
                    }
                })
            }, e.prototype.togglePlay = function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !this.isPlaying() : arguments[0];
                e ? this.play() : this.pause()
            }, e.prototype.onBeforeFirstPlay = function() {
                var e = this;
                this.canShowAds() && (this.media.preload(), this.media.disablePlayback(), this.ads.start("preroll", function() {
                    e.isInited() && (e.media.enablePlayback(), setTimeout(function() {
                        return e.ads.start("overlay")
                    }, 0))
                }))
            }, e.prototype.onStartedPlaying = function() {
                this._startedPlaying = !0
            }, e.prototype.onEnded = function() {
                var e = this;
                this.isPlayingOverlayAd() && this.ads.stop(), this.canShowAds() && !this._didEnded ? (this.media.disablePlayback(), this.ads.start("postroll", function() {
                    e.changeState(l.ENDED), e.media.enablePlayback()
                })) : this.changeState(l.ENDED), this._didEnded = !0
            }, e.prototype.onError = function(e) {
                this.errorData = e, this.changeState(l.ERROR), this.ads.cancelAds(), this.externalCall("onVideoPlayError")
            }, e.prototype.onUiSeekStart = function() {
                this.getState() === l.ENDED && this.changeState(l.PAUSED)
            }, e.prototype.canShowAds = function() {
                var e = browser.msie && browser.version <= 10;
                return !this.vars.no_ads && !e && this.getLivePhase() !== c.UPCOMING
            }, e.prototype.curTime = function() {
                return this.isInited() ? this.isPlayingLinearAd() ? this.ads.curTime() : this.media.curTime() : 0
            }, e.prototype.seekTo = function(e) {
                this.vars.live && this.getLivePhase() !== c.ENDED || (e = Math.max(0, Math.min(this.getDuration(), e)), e === this.media.curTime() || this.hasError() || (this.media.seekTo(e), this.trigger(h.SEEK, e), this.getState() === l.UNSTARTED && this.play(), this.getState() === l.ENDED && this.changeState(l.PAUSED)))
            }, e.prototype.seekToPercent = function(e) {
                var t = this.getDuration() * e;
                return this.seekTo(t)
            }, e.prototype.seekBy = function(e) {
                return this.seekTo(this.curTime() + e)
            }, e.prototype.getVolume = function() {
                return this._volume
            }, e.prototype.setVolume = function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
                e = Math.max(0, Math.min(1, e)), this.media.setVolume(e), this.ads.setVolume(e), this._volume = e, this._muted = !e, t && (this.preferredVolume = e)
            }, e.prototype.toggleMute = function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !this.isMuted() : arguments[0],
                    t = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1],
                    i = e ? 0 : this._volume || L;
                this.media.setVolume(i), this.ads.setVolume(i), this._muted = e, t && (this.preferredVolume = i)
            }, e.prototype.isMuted = function() {
                return !!this._muted
            }, e.prototype.toggleLoop = function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !this.isLooped() : arguments[0];
                return this.media.toggleLoop(e)
            }, e.prototype.isLooped = function() {
                return this.media.isLooped()
            }, e.prototype.setPlaybackRate = function(e) {
                this.media.setPlaybackRate(e)
            }, e.prototype.getPlaybackRate = function() {
                return this.media.getPlaybackRate()
            }, e.prototype.isStartedPlaying = function() {
                return this._startedPlaying
            }, e.prototype.getPlayedRanges = function() {
                return this.media.getPlayedRanges()
            }, e.prototype.getPlayedSeconds = function() {
                return this.media.getPlayedSeconds()
            }, e.prototype.canChangePlaybackRate = function() {
                return "flash" != this.media.providerType()
            }, e.prototype.canExpand = function() {
                return "flash" != this.media.providerType()
            }, e.prototype.expand = function() {
                var e = this.vars.list_id,
                    t = v.toTimecode(this.curTime());
                this.externalCall("onOpenInPopup", this.getVideoId(), e, t)
            }, e.prototype.onExpanded = function() {
                var e = this;
                this.vars.is_inline = 0, setTimeout(function() {
                    e.onTouchedByUser(), e.resize(), e.isPlaying() && (e.isPlayingLinearAd() ? e.ads.resume() : e.media.play()), e.trigger(h.EXPANDED)
                }, 0)
            }, e.prototype.toggleFullscreen = function() {
                g.screenfull && (this.isFullscreen() ? g.screenfull.exit() : g.screenfull.request(this.el))
            }, e.prototype.isFullscreen = function() {
                return g.screenfull.element === this.el
            }, e.prototype.getSize = function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                if (!this._size || e) {
                    var t = this.el.getBoundingClientRect();
                    this._size = [t.width, t.height]
                }
                return this._size
            }, e.prototype.resize = function() {
                addClass(this.el, "no_transition");
                var e = this.getSize(!0);
                this.trigger.apply(this, [h._RESIZE].concat(e)), removeClassDelayed(this.el, "no_transition")
            }, e.prototype.onFullscreenChange = function() {
                this.trigger(h.FULLSCREEN_CHANGE, this.isFullscreen()), this.resize(), this.externalCall("fullscreen", this.isFullscreen())
            }, e.prototype.isMinimized = function() {
                return !(!window.Videoview || !Videoview.isMinimized())
            }, e.prototype.isControlsVisible = function() {
                return this.ui.isControlsVisible()
            }, e.prototype.isLoadingAds = function() {
                return this.ads.isLoading()
            }, e.prototype.isPlayingLinearAd = function() {
                return this.ads.isPlayingLinear()
            }, e.prototype.isPlayingOverlayAd = function() {
                return this.ads.isPlayingOverlay()
            }, e.prototype.isFromAutoplay = function() {
                return this.isInited() && !!this.vars.from_autoplay
            }, e.prototype.onTouchedByUser = function() {
                var e = this;
                this.isFromAutoplay() && !this.isTouchedByUser() && (this.touchedByUser = !0, this.toggleMute(!1), this.ui.onTouchedByUser(), setTimeout(function() {
                    e.isPlaying() && e.externalCall("onVideoStreamPlaying", e.vars.oid, e.vars.vid)
                }, 0))
            }, e.prototype.isTouchedByUser = function() {
                return !!this.touchedByUser
            }, e.prototype.onSuggestionsShown = function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0],
                    t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
                    i = t ? this._suggestionsQid : null;
                this.externalCall("onSuggestionsShown", i, this.getVideoId(), e)
            }, e.prototype.onSuggestionClicked = function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
                    i = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2],
                    n = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
                this.externalCall("onSuggestionClick", e, this._suggestionsQid, i, n, t)
            }, e.prototype.onSuggestionQuarterWatched = function() {
                this.externalCall("onSuggestionQuarterWatched", this.vars.suggestions_qid, this.getVideoId(), this.curTime())
            }, e.prototype.onSuggestionsReplayClicked = function() {
                this.togglePlay(), this.externalCall("onSuggestionsReplayClicked")
            }, e.prototype.nextVideo = function(e, t, i) {
                this.externalCall("onVideoNext", e, t, i)
            }, e.prototype.likeVideo = function(e) {
                this.onLiked(), this.externalCall("onLike", e)
            }, e.prototype.onLiked = function() {
                this.videoLiked = !this.videoLiked, this.trigger(h.VIDEO_LIKE, this.videoLiked)
            }, e.prototype.shareVideo = function(e) {
                this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onShare", e)
            }, e.prototype.addVideo = function(e) {
                this.onAdded(), this.videoAdded ? this.externalCall("onAdd", this.getVideoId(), this.vars.add_hash, e) : this.externalCall("onRemove", e)
            }, e.prototype.donate = function(e) {
                this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onDonate", e)
            }, e.prototype.onAdded = function() {
                this.videoAdded = !this.videoAdded, this.trigger(h.VIDEO_ADD, this.videoAdded)
            }, e.prototype.subscribeToAuthor = function(e) {
                var t = !this.isSubscribed;
                this.externalCall("onSubscribe", t, e)
            }, e.prototype.onSubscribed = function(e) {
                this.isSubscribed = !!e, this.trigger(h.SUBSCRIBED, this.isSubscribed)
            }, e.prototype.nextTimerReset = function() {
                this.nextTimerStopped || (this.nextTimerStopped = !0, this.trigger(h.NEXT_TIMER_RESET))
            }, e.prototype.nextTimerStart = function() {
                this.nextTimerStopped && (this.nextTimerStopped = !1, this.trigger(h.NEXT_TIMER_START))
            }, e.prototype.onLiveEnded = function() {}, e.prototype.setSuggestions = function(e) {
                this._suggestions = e
            }, e.prototype.pushDonation = function(e, t) {
                this.isActiveLive() && this.trigger(h.LIVE_DONATION, e, t)
            }, e.prototype.onStickersPurchased = function(e) {
                this.ui.onStickersPurchased(e)
            }, e.prototype.getSuggestions = function() {
                return this._suggestions || []
            }, e.prototype.getNextVideos = function() {
                return window.Videoview ? Videoview.getNextVideosData() : []
            }, e.prototype.nextTimerEnabled = function() {
                return window.VideoPlaylist ? VideoPlaylist.isAutoplayEnabled() : !1
            }, e.prototype.externalCall = function(e) {
                try {
                    for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; t > n; n++) i[n - 1] = arguments[n];
                    return window.videoCallback && videoCallback([e].concat(i))
                } catch (r) {
                    this.debugLog(["error calling callback " + e, r], {
                        type: "warn"
                    })
                }
            }, e.prototype.debugLog = function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    i = t.type,
                    n = void 0 === i ? "log" : i,
                    r = t.force,
                    o = void 0 === r ? !1 : r;
                if (this.isInited() && (this.vars.dbg_on || o)) try {
                    var s;
                    (s = console)[n].apply(s, ["%c videoplayer ", "background:#9ddcf7;"].concat(e))
                } catch (a) {}
            }, e.prototype.changeState = function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
                return this.isInited() || t ? "undefined" == typeof e ? void this.debugLog("trying to change state to undefined", {
                    type: "warn"
                }) : void(e !== this.state && (this.prevState = this.state, this.state = e, e != l.ERROR && (this.errorData = null), this.trigger(h.STATE_CHANGE, e, this.prevState))) : void 0
            }, e.prototype.getState = function() {
                return this.state
            }, e.prototype.getErrorData = function() {
                return this.errorData || ""
            }, e.prototype.trigger = function(e) {
                var t;
                if ("undefined" == typeof e) return void this.debugLog("trying to trigger undefined event", {
                    type: "warn"
                });
                for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), r = 1; i > r; r++) n[r - 1] = arguments[r];
                (t = this._events).emit.apply(t, [e].concat(n))
            }, e.prototype.on = function(e, t) {
                return "undefined" == typeof e ? void this.debugLog("trying to set listener to undefined event", {
                    type: "warn"
                }) : this._events.on(e, t)
            }, e.prototype.off = function(e, t) {
                return "undefined" == typeof e ? void this.debugLog("trying to unset listener from undefined event", {
                    type: "warn"
                }) : this._events.off(e, t)
            }, e.prototype.destroy = function() {
                this.deinitVideo(), this.trigger(h._DESTROY), this._events.removeAllListeners(), window.removeEventListener("resize", this._resizeHandler), g.screenfull && document.removeEventListener(g.screenfull.raw.fullscreenchange, this._fsChangeHandler)
            }, e.prototype.getDebugData = function() {
                if (!this.isInited()) return "";
                var e = [];
                return e.push(["Video ID", this.getVideoId()]), e.push(["Content host", this.media.getContentHost()]), e.push(["Media provider", this.media.providerType()]), e.push(["Quality", this.getQuality()]), e.push(["Auto quality", this.isAutoQualityAvailable() ? this.isAutoQualityEnabled() ? "enabled" : "disabled" : null]), e.push(["Position", this.curTime()]), e.push(["Player state", this.getState()]), e.push(["Live Phase", this.getLivePhase()]), e.push(["Player size", this.getSize().join("x")]), e.push(["Module", window.Videoview ? Videoview.getVideoModule() : cur.module]), e.push(["Error code", this.media.getErrorCode()]), e.push(["Errors log", this.media.getErrorsLog()]), this.vars.live && (e.push(["Live HLS", this.vars.hls]), e.push(["Live RTMP", this.vars.rtmp]), e.push(["Postlive MP4", this.vars.postlive_mp4])), e.filter(function(e) {
                    var t = o(e, 2),
                        i = (t[0], t[1]);
                    return null != i
                }).map(function(e) {
                    return e.join(": ")
                }).join("\n")
            }, e.prototype.isMseHlsSupported = function() {
                return window.MediaSource && MediaSource.isTypeSupported && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"') && !browser.safari && !browser.vivaldi
            }, e.prototype.isNativeHlsSupported = function() {
                var e = ce("video");
                return e.canPlayType && e.canPlayType("application/vnd.apple.mpegurl")
            }, e.prototype.getPreloadedQuality = function() {
                return T[this.getVideoId()]
            }, e.preload = function(e) {
                function t(e) {
                    var t = {};
                    return e.split(",").forEach(function(e) {
                        var i = e.split("="),
                            n = o(i, 2),
                            r = n[0],
                            s = n[1];
                        t[r] = s
                    }), t
                }
                var i = e.oid + "_" + e.vid;
                if (e.hls_raw && !T[i]) {
                    for (var n, r = [], s = {}, a = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g; n = a.exec(e.hls_raw);) {
                        var l = n,
                            u = o(l, 3),
                            h = u[1],
                            d = u[2];
                        if (h = t(h), h.RESOLUTION) {
                            var c = h.RESOLUTION.split("x"),
                                p = o(c, 2),
                                f = p[0],
                                g = p[1],
                                m = y.qualityFromSize(+f, +g);
                            r.push(m), s[m] = d
                        }
                    }
                    if (r.length) {
                        var _ = Math.max.apply(Math, r),
                            b = v.storage.get("video_abr_quality") || y.DEFAULT,
                            S = Math.min(b, _, y.DEFAULT),
                            E = s[S],
                            L = E.replace(/index-(.+).m3u8/, "seg-1-$1.ts");
                        v.request(E), v.request(L), T[i] = S
                    }
                }
            }, e.dispatchEventFromId = function(e, t, i) {
                var n, r = ge(e);
                if (r) {
                    try {
                        n = new Event(t)
                    } catch (o) {
                        n = document.createEvent("Event"), n.initEvent(t, !1, !1)
                    }
                    r.dispatchEvent(n)
                }
            }, s(e, [{
                key: "preferredVolume",
                get: function() {
                    var e = v.storage.get("video_volume");
                    return "number" == typeof e ? e : L
                },
                set: function(e) {
                    v.storage.set("video_volume", e)
                }
            }, {
                key: "preferredQuality",
                get: function() {
                    var e = v.storage.get("video_preferred_quality");
                    return y.qualityFromIndex(e) || y.DEFAULT
                },
                set: function(e) {
                    var t = y.indexFromQuality(e);
                    v.storage.set("video_preferred_quality", t)
                }
            }]), e
        }();
    t["default"] = w, window.WeakSet && (w._instances = new WeakSet);
    var T = {}
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function a(e) {
        return "string" != typeof e ? e : e.replace(new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1").replace(new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1")
    }

    function l(e, t) {
        for (var i = (e >>> 0).toString(16), n = t.toString(16); n.length < 8;) n = "0" + n;
        return i + n
    }

    function u(e) {
        if (e.ads_type == x) return 32;
        if (e.ads_safe) {
            if (e.ads_type == P) return 32;
            if (e.ads_type == I) return 3 == e.ads_cat && e.duration <= 1200 ? 32 : 74;
            if (e.ads_type == k) return e.duration > 1200 ? 74 : 32;
            if (6 == e.ads_cat) return 74
        }
        return ""
    }

    function h(e) {
        return "partner_all" == e.ads_pl_type ? 4 : e.is_ext ? 2 : 1
    }

    function d(e) {
        return e.ads_type == x ? 1 : e.ads_type !== k || e.ads_safe ? e.duration > 1200 ? 2 : 3 : ""
    }

    function c(e) {
        return e > 0 && 30 >= e ? 0 : e > 30 && 60 >= e ? 1 : e > 60 && 90 >= e ? 2 : e > 90 && 120 >= e ? 3 : e > 120 && 180 >= e ? 4 : e > 180 && 240 >= e ? 5 : e > 240 && 300 >= e ? 6 : e > 300 && 600 >= e ? 7 : e > 600 && 900 >= e ? 8 : e > 900 && 1800 >= e ? 9 : e > 1800 && 3600 >= e ? 10 : e > 3600 && 5400 >= e ? 11 : e > 5400 && 7200 >= e ? 12 : e > 7200 ? 13 : 0
    }

    function p(e) {
        return e.is_ext ? e.autoplay ? 3 : 1 : 0
    }

    function y(e, t) {
        return 400 > e || 225 > t ? 5 : 640 > e || 360 > t ? 0 : 960 > e || 540 > t ? 1 : 1280 > e || 720 > t ? 2 : 3
    }

    function f(e) {
        return 1 == e ? 2 : 2 == e ? 1 : 3
    }

    function v(e) {
        return 18 > e ? 1 : 22 > e ? 2 : 25 > e ? 3 : 28 > e ? 4 : 31 > e ? 5 : 35 > e ? 6 : 40 > e ? 7 : 45 > e ? 8 : 50 > e ? 9 : 55 > e ? 10 : 11
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PlayerAds = void 0;
    var g = i(1),
        m = i(3),
        _ = n(m),
        b = i(5),
        S = n(b),
        E = i(2),
        L = n(E),
        w = i(4),
        T = n(w),
        C = 6531,
        A = 2e3,
        k = -1,
        P = 1,
        I = 2,
        x = 3,
        D = (t.PlayerAds = function(e) {
            function t(i) {
                r(this, t);
                var n = o(this, e.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_ads"
                }), n.videoEl = ce("video", {
                    className: "videoplayer_ads_media_el"
                }), n.domListen(n.videoEl, "click", function() {
                    return n.player.pause()
                }), n.el.appendChild(n.videoEl), n.pauseLayer = ce("div", {
                    className: "videoplayer_ads_pause_layer"
                }), n.domListen(n.pauseLayer, "click", function() {
                    return n.player.play()
                }), n.el.appendChild(n.pauseLayer), n.buildActions(), n.playerListen(L.EXPANDED, n.onPlayerExpanded), n.playerListen(L.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(L.STATE_CHANGE, n.onStateChange), n.playerListen(L.UI_CONTROLS_HIDE, n.updateOverlay), n.playerListen(L.UI_CONTROLS_SHOW, n.updateOverlay), n
            }
            return s(t, e), t.prototype.buildActions = function() {
                this.actions = se('\n<div class="videoplayer_ads_actions">\n  <div class="videoplayer_ads_timer"></div>\n  <div class="videoplayer_ads_skip"></div>\n</div>\n    '), this.actionsTimer = domByClass(this.actions, "videoplayer_ads_timer"), this.actionsSkip = domByClass(this.actions, "videoplayer_ads_skip"), this.domListen(this.actionsSkip, "click", this.onSkipClick), this.el.appendChild(this.actions)
            }, t.prototype.initVideo = function(e) {
                e.no_ads || window.AdmanHTML || !this._admanLoader || this.loadAdman()
            }, t.prototype.deinitVideo = function() {
                this.cancelAds()
            }, t.prototype.cancelAds = function() {
                this.adman && (this.adman.destroy(), this.adman = null), this._needInit = !1, this._sectionToPlay = null, this._sectionCallback = null, this._adsReady = !1
            }, t.prototype.destroy = function() {
                this._admanLoader && (this._admanLoader.destroy(), this._admanLoader = null)
            }, t.prototype.loadAdman = function() {
                var e = this;
                this._admanLoader = _.loadScript("//ad.mail.ru/static/admanhtml/rbadman-html5.min.js", {
                    timeout: A,
                    onLoad: function() {
                        return e.onAdmanLoaded()
                    },
                    onError: function() {
                        return e.onAdmanLoadingError()
                    }
                }), this.player.stats.sendAdsEvent("AdmanLoadStart")
            }, t.prototype.onAdmanLoaded = function() {
                return window.AdmanHTML ? (this._admanLoader = null, this._needInit && this.initAdman(), void this.player.stats.sendAdsEvent("AdmanLoaded")) : void this.onAdmanLoadingError()
            }, t.prototype.onAdmanLoadingError = function() {
                this._admanLoader = null, this._admanLoadingError = !0, this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null), this.player.trigger(L.ADS_WAITING, !1), this.player.stats.sendAdsEvent("AdmanLoadError")
            }, t.prototype.initAdman = function() {
                var e = this.player.getVars(),
                    t = this.player.getSize(),
                    i = e.live ? 1800 : e.duration,
                    n = {
                        _SITEZONE: e.ads_sitezone || "",
                        vk_catid: e.ads_cat || "",
                        vk_id: e.viewer_id || "",
                        pl: e.ads_pl,
                        video_id: e.ads_eid1 || "",
                        content_id: l(e.oid, e.vid),
                        dl: encodeURIComponent(e.is_ext ? e.ads_referrer : a(document.URL)),
                        duration: i,
                        g: e.g,
                        a: e.a,
                        os: e.target_mob_os,
                        lang: 3 == vk.lang && e.cis ? 1 : 0,
                        autoplay: e.from_autoplay || 0,
                        player_width: t[0],
                        player_height: t[1],
                        puid1: u(e),
                        puid2: h(e),
                        puid3: 1,
                        puid4: d(e),
                        puid5: e.ads_puid5 || "",
                        puid6: e.ads_puid6 || "",
                        puid7: e.ads_puid7 || 1,
                        puid8: c(i),
                        puid9: p(e),
                        puid10: y.apply(void 0, t),
                        puid11: this.player.isFullscreen() ? 0 : 1,
                        puid12: 16,
                        puid13: f(e.g),
                        puid14: v(e.a),
                        puid15: e.ads_puid34 || "",
                        puid18: e.ads_puid18 || 0,
                        puid22: e.ads_puid22 || ""
                    };
                e.ads_type == k && (n.is_xz_video = 1), e.ads_preview && (n.preview = e.ads_preview);
                var r = {
                    slot: C,
                    wrapper: this.el,
                    videoEl: this.videoEl,
                    videoQuality: t[1],
                    params: n,
                    browser: D,
                    config: M
                };
                this.adman && this.adman.destroy(), this.adman = new AdmanHTML, this.adman.setDebug(!1), this.adman.onReady(this.onAdsReady.bind(this)), this.adman.onStarted(this.onAdStarted.bind(this)), this.adman.onCompleted(this.onAdCompleted.bind(this)), this.adman.onTimeRemained(this.onAdTimeRemained.bind(this)), this.adman.onClicked(this.onAdCliked.bind(this)), this.adman.onClosed(this.onAdClosed.bind(this)), this.adman.onError(this.onAdError.bind(this)), this.adman.init(r), this.player.stats.sendAdsLoadStarted(), this.player.stats.sendAdsEvent("AdmanInit")
            }, t.prototype.start = function(e, t) {
                return !this.player.isInited() || this._admanLoadingError ? void(t && t()) : (this._sectionToPlay = e, this._sectionCallback = t, window.AdmanHTML ? this._adsReady ? this.adman.start(e) : this.adman || this.initAdman() : (this._needInit = !0, this._admanLoader || this.loadAdman()), void this.player.trigger(L.ADS_WAITING, !0))
            }, t.prototype.play = function() {
                this.adman && this.adman.resume()
            }, t.prototype.pause = function() {
                this.adman && this.adman.pause()
            }, t.prototype.stop = function() {
                this.adman && this.adman.stop()
            }, t.prototype.setVolume = function(e) {
                this.isPlayingLinear() && this.adman.setVolume(e)
            }, t.prototype.onAdsReady = function() {
                this._adsReady = !0, this._sectionToPlay && this.adman.start(this._sectionToPlay), this.player.trigger(L.ADS_WAITING, !1), this.player.stats.sendAdsEvent("AdmanReady")
            }, t.prototype.onAdStarted = function(e, t) {
                this._curSection = e, this._curBanner = t, show(this.el), "preroll" == e || "postroll" == e ? (this._actionsInited = !1, ("VPAID" != t.apiFramework || "application/javascript" == t.type) && show(this.videoEl), this.player.trigger(L.ADS_LINEAR_STARTED, e, {
                    duration: t.duration,
                    hideControls: t.showControls === !1
                }), this.adman.setVolume(this.player.isMuted() ? 0 : this.player.getVolume())) : (addClass(this.el, "no_transition"), addClass(this.el, "_overlay"), removeClassDelayed(this.el, "no_transition"), this.updateOverlay(), this.player.trigger(L.ADS_OVERLAY_STARTED)), this.player.stats.sendAdShown(e, "start"), this.player.stats.sendAdsEvent("AdmanAdStarted", e)
            }, t.prototype.onAdCompleted = function() {
                var e = this._curSection,
                    t = this._sectionToPlay;
                this._curSection = null, this._sectionToPlay = null, this._curBanner = null, this._curTime = null, e ? (hide(this.el), "preroll" == e || "postroll" == e ? (hide(this.videoEl), hide(this.actions), hide(this.pauseLayer), this.player.trigger(L.ADS_LINEAR_COMPLETED, e)) : (removeClass(this.el, "_overlay"), this.player.trigger(L.ADS_OVERLAY_COMPLETED)), this.player.stats.sendAdShown(e, "end"), this.player.stats.sendAdsEvent("AdmanAdCompleted", e)) : this.player.stats.sendAdsEvent("AdmanAdEmpty", t), this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null)
            }, t.prototype.onAdTimeRemained = function(e) {
                var t = e.currentTime,
                    i = e.duration,
                    n = e.remained,
                    r = this._curBanner;
                this._curTime = t, r && r.showControls !== !1 && (val(this.actionsTimer, '<span class="_caption">' + this.getLang("ads") + '</span> <span class="_remained">' + formatTime(n) + "</span>"), r.allowClose && (t < r.allowCloseDelay ? (val(this.actionsSkip, this.getLang("ads_skip_time", {
                    time: "<b>" + Math.ceil(r.allowCloseDelay - t) + "</b>"
                })), removeClass(this.actionsSkip, "_can_skip")) : (val(this.actionsSkip, '<span class="_skip_text">' + this.getLang("ads_skip") + "</span>" + T.skipAd("_skip_icon")), addClass(this.actionsSkip, "_can_skip"))), this._actionsInited || (show(this.actions), setStyle(this.actionsSkip, {
                    display: r.allowClose && i > n ? "" : "none"
                }), this._actionsInited = !0), this.player.trigger(L.ADS_TIME_REMAINED, t, i, n))
            }, t.prototype.onAdCliked = function() {
                this.player.stats.sendAdsEvent("AdmanClicked", this._curSection)
            }, t.prototype.onAdClosed = function() {
                this.player.stats.sendAdsEvent("AdmanClosed", this._curSection), this.onAdCompleted()
            }, t.prototype.onAdError = function() {
                debugLog("video ad error"), this.player.stats.sendAdsEvent("AdmanError"), this._adsReady = !0, this.onAdCompleted()
            }, t.prototype.onSkipClick = function(e) {
                hasClass(this.actionsSkip, "_can_skip") && this.adman.skip()
            }, t.prototype.isLoading = function() {
                return !!this._sectionToPlay && !this._admanLoadingError && (this._admanLoader || !this._adsReady)
            }, t.prototype.isPlayingLinear = function() {
                return "preroll" == this._curSection || "postroll" == this._curSection
            }, t.prototype.isPlayingOverlay = function() {
                return "overlay" == this._curSection
            }, t.prototype.curTime = function() {
                return this._curTime || 0
            }, t.prototype.getDuration = function() {
                return intval(this._curBanner && this._curBanner.duration)
            }, t.prototype.resize = function(e, t) {
                toggleClass(this.actions, "_min_size", 400 > e), this.updateOverlay()
            }, t.prototype.canShowOverlay = function() {
                var e = this.player.getSize(),
                    t = e[0] >= 500 && e[1] >= 280,
                    i = this.player.isPlaying(),
                    n = this.player.isControlsVisible();
                return t && i && n
            }, t.prototype.updateOverlay = function() {
                var e = this.canShowOverlay();
                e ? (this.isPlayingOverlay() && this.adman.resume(), removeClass(this.el, "_overlay_hidden")) : (this.isPlayingOverlay() && this.adman.pause(), addClass(this.el, "_overlay_hidden"))
            }, t.prototype.onPlayerExpanded = function() {
                this.adman && this.player.isPlaying() && this.adman.resume()
            }, t.prototype.onFullscreenChange = function(e) {
                (this.isPlayingLinear() || this.isPlayingOverlay()) && this.adman.setFullscreen(e)
            }, t.prototype.onStateChange = function(e) {
                this.updateOverlay(), this.isPlayingLinear() && toggle(this.pauseLayer, e !== S.PLAYING)
            }, t
        }(g.PlayerComponent), {
            mobile: browser.mobile,
            FLASH_BLOCKED: 0,
            FLASH_READY: 1,
            FLASH_UNKNOWN: 2,
            checkFlashStatus: function(e) {
                e(browser.flash ? this.FLASH_READY : this.FLASH_BLOCKED)
            }
        }),
        M = {
            vpaidJsInterface: locProtocol + "//ad.mail.ru/static/vpaid-js-interface.swf"
        }
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ContextMenu = void 0;
    var a = i(1),
        l = i(3),
        u = n(l);
    t.ContextMenu = function(e) {
        function t(i) {
            r(this, t);
            var n = o(this, e.call(this, i));
            n.el = se('\n<div class="videoplayer_context_menu hidden">\n  <div class="_item" data-action="copy_link">' + n.getLang("cmenu_copy_video_link") + '</div>\n  <div class="_item" data-action="copy_timecoded_link">' + n.getLang("cmenu_copy_timecode_link") + '</div>\n  <div class="_item" data-action="copy_embed_code">' + n.getLang("cmenu_copy_embed_code") + '</div>\n  <div class="_item" data-action="toggle_loop">' + n.getLang("cmenu_enable_loop") + '</div>\n  <div class="_item" data-action="playback_rate">' + n.getLang("cmenu_playback_speed") + '</div>\n  <a class="_item" href="/support?act=new&from=v" target="_blank">' + n.getLang("cmenu_report_error") + '</a>\n  <div class="_item" data-action="copy_debug_data">' + n.getLang("cmenu_copy_debug") + "</div>\n</div>\n    "), n.playbackRateControl = se('\n<div class="videoplayer_playback_rate_control">\n  <span class="_decrease"></span>\n  <span class="_value">1x</span>\n  <span class="_increase"></span>\n</div>\n    '), n.playbackRateDecrease = domByClass(n.playbackRateControl, "_decrease"), n.playbackRateIncrease = domByClass(n.playbackRateControl, "_increase"), n.playbackRateValue = domByClass(n.playbackRateControl, "_value"), n.domListen(n.playbackRateDecrease, "click", n.changePlaybackRate.bind(n, -1)), n.domListen(n.playbackRateIncrease, "click", n.changePlaybackRate.bind(n, 1));
            var s = n.el.querySelector("[data-action=playback_rate]");
            return s.appendChild(n.playbackRateControl), n.domListen(n.player.el, "contextmenu", n.onContextmenu), n.domListen(n.el, "click", n.onMenuClick), n.domListen(document.body, "click", n.onLostFocus), n.domListen(window, "blur", n.onLostFocus), n
        }
        return s(t, e), t.prototype.initVideo = function(e) {
            this.updateLoopControl(!!e.repeat), this.updatePlaybackRateControl(1);
            var t = this.player.isActiveLive();
            toggle(this.el.querySelector("[data-action=copy_timecoded_link]"), !t), toggle(this.el.querySelector("[data-action=toggle_loop]"), !t), toggle(this.el.querySelector("[data-action=playback_rate]"), !t && this.player.canChangePlaybackRate())
        }, t.prototype.changePlaybackRate = function(e, t) {
            t.stopPropagation();
            var i = [.25, .5, 1, 1.25, 1.5, 2],
                n = this.player.getPlaybackRate(),
                r = i.indexOf(n),
                o = i[r + e];
            o && (this.player.setPlaybackRate(o), this.updatePlaybackRateControl(o))
        }, t.prototype.updatePlaybackRateControl = function(e) {
            var t = [.25, .5, 1, 1.25, 1.5, 2],
                i = t.indexOf(e);
            if (t[i]) {
                var n = e % 1 ? 100 * e + "%" : e + "x";
                val(this.playbackRateValue, n), toggleClass(this.playbackRateDecrease, "_disabled", 0 == i), toggleClass(this.playbackRateIncrease, "_disabled", i == t.length - 1)
            }
        }, t.prototype.updateLoopControl = function(e) {
            var t = this.el.querySelector("[data-action=toggle_loop]");
            val(t, this.getLang(e ? "cmenu_disable_loop" : "cmenu_enable_loop"))
        }, t.prototype.onMenuClick = function(e) {
            var t = this,
                i = e.target.getAttribute("data-action");
            switch (i) {
                case "copy_link":
                    u.copyToClipboard(this.player.getVideoLink());
                    break;
                case "copy_timecoded_link":
                    u.copyToClipboard(this.player.getVideoLink(!0));
                    break;
                case "copy_embed_code":
                    u.copyToClipboard(this.player.getEmbedCode());
                    break;
                case "toggle_loop":
                    var n = this.player.toggleLoop();
                    setTimeout(function() {
                        t.updateLoopControl(n)
                    }, 200);
                    break;
                case "playback_rate":
                    e.stopPropagation();
                    break;
                case "copy_debug_data":
                    var r = this.player.getDebugData();
                    u.copyToClipboard(r)
            }
        }, t.prototype.onContextmenu = function(e) {
            var t = 5,
                i = e.target;
            do
                if ("A" == i.nodeName) return void this.hide(); while (--t && (i = domPN(i)));
            e.preventDefault();
            var n = this.player.el.getBoundingClientRect(),
                r = this.el.getBoundingClientRect(),
                o = e.pageX - n.left + 1,
                s = e.pageY - scrollGetY() - n.top + 1;
            o + r.width > n.width && (o = Math.max(0, n.width - r.width)), s + r.height > n.height && (s = Math.max(0, n.height - r.height)), this.show(o, s), this.player.onTouchedByUser()
        }, t.prototype.onLostFocus = function(e) {
            this.isVisible() && this.hide()
        }, t.prototype.show = function(e, t) {
            setStyle(this.el, {
                left: e + "px",
                top: t + "px"
            }), removeClass(this.el, "hidden"), this._visible = !0
        }, t.prototype.hide = function() {
            addClass(this.el, "hidden"), this._visible = !1
        }, t.prototype.isVisible = function() {
            return !!this._visible
        }, t
    }(a.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
            function e(e, t) {
                var i = [],
                    n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
                } catch (l) {
                    r = !0, o = l
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        l = i(3),
        u = n(l),
        h = i(2),
        d = n(h),
        c = i(5),
        p = n(c),
        y = i(4),
        f = n(y),
        v = i(1),
        g = 5e3,
        m = 3,
        _ = function(e) {
            function t(i) {
                r(this, t);
                var n = o(this, e.call(this, i));
                return n.el = ce("div", {
                    className: "videoplayer_donations_layer"
                }), n._currentItems = [], n._queuedItems = [], n._supportsTransitions = "transition" == u.getCssProp("transition"), n.resize.apply(n, i.getSize()), n.playerListen(d.LIVE_DONATION, n.pushDonation), n.playerListen(d.STATE_CHANGE, n.onStateChange), n
            }
            return s(t, e), t.prototype.pushDonation = function(e, t) {
                if (!this._hidden) {
                    var i;
                    switch (e) {
                        case "gift":
                            i = this.giftTpl(t);
                            break;
                        case "comment":
                            if (!t.commentText) return;
                            i = this.commentTpl(t)
                    }
                    if (i) {
                        var n = {
                            el: se(i),
                            type: e,
                            senderId: t.senderId,
                            giftId: t.giftId,
                            count: 1,
                            inserted: !1
                        };
                        this.queueItem(n)
                    }
                }
            }, t.prototype.queueItem = function(e) {
                var t = this;
                if ("gift" == e.type) {
                    var i = this.findSenderGift(e.senderId, e.giftId);
                    if (i) return void this.increaseGiftCount(i)
                }
                if (this._currentItems.length >= m) return void this._queuedItems.push(e);
                if (this._currentItems.push(e), "gift" == e.type) {
                    var n = new Image;
                    n.onload = function() {
                        return t.insertItem(e)
                    }, n.src = this.giftImgSrc(e.giftId)
                } else this.insertItem(e)
            }, t.prototype.insertItem = function(e) {
                var t = this;
                e.timeout = this.delay(function() {
                    return t.removeItem(e)
                }, g), e.inserted = !0, this.el.insertBefore(e.el, domFC(this.el)), this._supportsTransitions && (setStyle(e.el, {
                    transition: "none",
                    opacity: 0,
                    marginTop: -e.el.offsetHeight + "px",
                    marginBottom: 0
                }), e.el.offsetHeight, setStyle(e.el, {
                    transition: "",
                    opacity: "",
                    marginTop: "",
                    marginBottom: ""
                }))
            }, t.prototype.checkQueue = function() {
                for (; this._currentItems.length < m && this._queuedItems.length;) {
                    var e = this._queuedItems.shift();
                    this.queueItem(e)
                }
            }, t.prototype.findSenderGift = function(e, t) {
                var i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var o, s = this._currentItems[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                        var a = o.value;
                        if (a.senderId === e && a.giftId === t && a.count < 9) return a
                    }
                } catch (l) {
                    n = !0, r = l
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (n) throw r
                    }
                }
            }, t.prototype.increaseGiftCount = function(e) {
                var t = this;
                e.count += 1;
                var i = domByClass(e.el, "_gift_count");
                val(i, f.giftCount(e.count, "_gift_count_icon")), e.inserted && (this._supportsTransitions && !this._hidden && (setStyle(i, {
                    transform: "scale(1.5)"
                }), this.domListenOnce(i, "transitionend", function() {
                    setStyle(i, {
                        transform: ""
                    })
                })), this.undelay(e.timeout), e.timeout = this.delay(function() {
                    return t.removeItem(e)
                }, g))
            }, t.prototype.removeItem = function(e) {
                var t = indexOf(this._currentItems, e),
                    i = this.getItemVerticalMargin(t),
                    n = Math.max(i, this.getItemVerticalMargin(t - 1)),
                    r = Math.max(i, this.getItemVerticalMargin(t + 1));
                this._currentItems.splice(t, 1), this._supportsTransitions && !this._hidden ? (setStyle(e.el, {
                    opacity: 0,
                    marginTop: n + "px",
                    marginBottom: -(e.el.offsetHeight + Math.max(n, r)) + "px",
                    marginLeft: "-150%"
                }), this.domListenOnce(e.el, "transitionend", function() {
                    return re(e.el)
                })) : re(e.el), this.checkQueue()
            }, t.prototype.getItemVerticalMargin = function(e) {
                var t = this._currentItems[e];
                if (t) {
                    if ("gift" == t.type) return 32;
                    if ("comment" === t.type) return 15
                }
                return 0
            }, t.prototype.donationTpl = function(e, t, i, n) {
                return '\n<div class="videoplayer_donation videoplayer_donation_' + e + '">\n  <div class="_sender_info_wrap">\n    <img class="_sender_photo" src="' + t.senderPhoto + '"/>\n    <div class="_sender_name">' + t.senderName + '</div>\n    <div class="_sender_event">' + i + "</div>\n  </div>\n  " + n + "\n</div>\n    "
            }, t.prototype.commentTpl = function(e) {
                var t = this.getLang("live_user_sent_supercomment", !1, {
                        sex: e.senderSex
                    }) + f.superComment("_comment_icon"),
                    i = '<div class="_comment_text">' + e.commentText + "</div>";
                return this.donationTpl("comment", e, t, i)
            }, t.prototype.giftTpl = function(e) {
                var t = this.getLang("live_user_sent_gift", !1, {
                        sex: e.senderSex
                    }),
                    i = this.giftImgSrc(e.giftId),
                    n = '<img class="_gift_img" src="' + i + '"/><div class="_gift_count"></div>';
                return this.donationTpl("gift", e, t, n)
            }, t.prototype.giftImgSrc = function(e) {
                var t = isRetina() ? 256 : 96;
                return "/images/gift/" + e + "/" + t + ".png"
            }, t.prototype.updateVisibility = function() {
                var e = this.player.getSize(),
                    t = a(e, 2),
                    i = t[0],
                    n = t[1],
                    r = this.player.getState();
                this._hidden = 640 > i || 360 > n || r !== p.PLAYING && r !== p.PAUSED, toggle(this.el, !this._hidden)
            }, t.prototype.resize = function() {
                this.updateVisibility()
            }, t.prototype.onStateChange = function() {
                this.updateVisibility()
            }, t.prototype.destroy = function() {
                var t = this;
                e.prototype.destroy.call(this), each(this._currentItems, function(e, i) {
                    return t.undelay(i.timeout)
                }), this._currentItems = null, this._queuedItems = null, re(this.el)
            }, t
        }(v.PlayerComponent);
    t["default"] = _
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.EndScreenNext = void 0;
    var a = i(28),
        l = i(2),
        u = n(l),
        h = i(4),
        d = n(h),
        c = i(3),
        p = n(c),
        y = 5e3;
    t.EndScreenNext = function(e) {
        function t(i, n, s, a) {
            r(this, t);
            var l = o(this, e.call(this, i));
            return l._nextVideosData = n, l._fromSuggestions = a, setStyle(l._actions, {
                marginTop: "-110px"
            }), s && (l.buildNextBlock(), i.nextTimerStopped || l.startTimer()), l.buildSuggestionsBlock(), s || l.showSuggestions(), l.playerListen(u.NEXT_TIMER_RESET, l.resetTimer), l.playerListen(u.NEXT_TIMER_START, l.startTimer), l
        }
        return s(t, e), t.prototype.buildNextBlock = function() {
            var e = this._nextVideosData[0];
            this._nextBlock = se('\n<div class="videoplayer_end_next_block">\n  <div class="_caption">' + this.getLang("next") + '</div>\n  <div class="_thumb" style="background-image:url(' + e.thumb + ')"></div>\n  <div class="_thumb_darken"></div>\n  <div class="_timer">\n    <canvas class="_timer_canvas" width="100" height="100"></canvas>\n    ' + d.play("_timer_play_icon") + '\n  </div>\n  <div class="_description">\n    <div class="_title">' + e.title + '</div>\n    <div class="_views">' + e.views + '</div>\n  </div>\n  <div class="_cancel"></div>\n</div>\n    '), this.domListen(this._nextBlock, "click", this.onNextClick), this.domListen(domByClass(this._nextBlock, "_cancel"), "click", this.onNextCancelClick), this.el.appendChild(this._nextBlock)
        }, t.prototype.buildSuggestionsBlock = function() {
            var e = this,
                t = this.player.getVideoId();
            this._suggestionsBlock = ce("div", {
                className: "videoplayer_end_suggestions _before_intro"
            }), each(this._nextVideosData, function(i, n) {
                var r = n.href || "/video" + n.vid,
                    o = se('\n<a class="_item" href="' + r + '" onclick="return false;">\n  <div class="_item_thumb" style="background-image:url(' + n.thumb + ');"></div>\n  <div class="_item_title">' + n.title + '</div>\n  <div class="_item_views">' + n.views + "</div>\n</a>\n      ");
                n.vid == t && domByClass(o, "_item_thumb").appendChild(se('\n<div class="_item_replay">\n  <div class="_item_replay_text">' + d.play("_item_replay_icon") + e.getLang("replay") + "</div>\n</div>\n        ")), e.domListen(o, "click", e.onSuggestionClick.bind(e, n.vid, i + 1)), e._suggestionsBlock.appendChild(o)
            }), this.el.appendChild(this._suggestionsBlock)
        }, t.prototype.startTimer = function() {
            var e = this;
            if (this._nextBlock && !this.minMode && window.CanvasRenderingContext2D) {
                var t = domByClass(this._nextBlock, "_timer_canvas"),
                    i = t.getContext("2d");
                i.lineWidth = 6, i.lineCap = "round", i.strokeStyle = "#fff";
                var n = vkNow(),
                    r = function o() {
                        var t = (vkNow() - n) / y;
                        1 > t ? (i.clearRect(0, 0, 100, 100), i.beginPath(), i.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * t), i.stroke(), e._nextTO = setTimeout(o, 16)) : e.player.nextVideo(e._nextVideosData[0].vid, !0, !0)
                    };
                show(t), this.timerInProgress = !0, r()
            }
        }, t.prototype.resetTimer = function() {
            this._nextBlock && window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this._nextBlock, "_timer_canvas")))
        }, t.prototype.showSuggestions = function() {
            removeClass(this._suggestionsBlock, "_before_intro");
            var e = this.isStretchMode.apply(this, this.player.getSize());
            this.player.onSuggestionsShown(e, this._fromSuggestions)
        }, t.prototype.onNextClick = function() {
            var e = this._nextVideosData[0];
            this.player.nextVideo(e.vid, !0)
        }, t.prototype.onNextCancelClick = function(e) {
            e.stopPropagation(), this.resetTimer(), re(this._nextBlock), this._nextBlock = null, this.showSuggestions()
        }, t.prototype.onSuggestionClick = function(e, t, i) {
            i.metaKey || i.ctrlKey || (i.preventDefault(), this.player.getVideoId() == e ? (this.player.onTouchedByUser(), this.player.onSuggestionsReplayClicked()) : e ? this._fromSuggestions ? this.player.onSuggestionClicked(e, this._stretchMode, t) : this.player.nextVideo(e) : p.safeOpenLink(i.currentTarget.href))
        }, t.prototype.resize = function(e, t) {
            var i = this,
                n = 600 > e || 350 > t;
            this.minMode = n, toggle(this._nextBlock, !n), this._suggestionsBlock && ! function() {
                var r = i.isStretchMode(e, t),
                    o = r ? 4 : 10,
                    s = r ? Math.floor((e - 6) / 3 - 2 * o) : 180,
                    a = r ? Math.round(s / 1.777) : 100;
                each(geByClass("_item", i._suggestionsBlock), function(e, t) {
                    setStyle(t, {
                        width: s + "px",
                        padding: "0 " + o + "px"
                    }), setStyle(domFC(t), {
                        height: a + "px"
                    })
                }), setStyle(i._suggestionsBlock, {
                    marginTop: r ? -Math.round(a / 2) + "px" : ""
                }), toggle(i._suggestionsBlock, !n || r), i.updateShareActionsVisibility(!r), toggleClass(i._info, "_right_offset", r && !i.getVar("nolikes")), i._stretchMode = r
            }(), setStyle(this._actions, {
                marginTop: n ? "" : "-110px"
            }), n && this.timerInProgress ? this.resetTimer() : this.timerInProgress || this.player.nextTimerStopped || this.startTimer()
        }, t.prototype.isStretchMode = function(e, t) {
            return !!this._suggestionsBlock && e >= 400 && 600 >= e && t >= 250 && 510 >= t
        }, t.prototype.destroy = function() {
            e.prototype.destroy.call(this), this.resetTimer()
        }, t
    }(a.EndScreen)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PlayerControls = void 0;
    var a = i(1),
        l = i(2),
        u = n(l),
        h = i(11),
        d = n(h),
        c = i(55),
        p = i(54),
        y = i(57),
        f = i(52),
        v = i(4),
        g = n(v),
        m = i(27),
        _ = i(3),
        b = n(_);
    t.PlayerControls = function(e) {
        function t(i) {
            r(this, t);
            var n = o(this, e.call(this, i));
            return n.buildEl(), n.buildTimelineSlider(), n.buildVolumeSlider(), n.buildQualitySelect(), n._isTimeReversed = !!b.storage.get("video_time_reversed"), n.playerListen(u.STATE_CHANGE, n.onStateChange), n.playerListen(u.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(u.MEDIA_TIMEUPDATE, n.onMediaTimeupdate), n.playerListen(u.MEDIA_PROGRESS, n.updateBuffered), n.playerListen(u.MEDIA_VOLUMECHANGE, n.updateVolume), n.playerListen(u.MEDIA_DURATIONCHANGE, n.updateDuration), n.playerListen(u.QUALITIES_LIST_CHANGE, n.onQualitiesListChange), n.playerListen(u.SEEK, n.onSeek), n.playerListen(u.EXPANDED, function() {
                n.toggleControl(n.btnExpand, !1)
            }), n.playerListen(u.ADS_LINEAR_STARTED, n.onLinearAdStarted), n.playerListen(u.ADS_LINEAR_COMPLETED, n.onLinearAdCompleted), n.playerListen(u.ADS_TIME_REMAINED, function(e, t, i) {
                n.updateTime(e)
            }), n.playerListen(u.LIVE_PHASE_CHANGE, n.onLivePhaseChange), n
        }
        return s(t, e), t.prototype.buildEl = function() {
            var e = this;
            this.el = se('\n<div class="videoplayer_controls">\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_play" role="button" tabindex="0" aria-label="' + this.getLang("play") + '">\n    ' + g.play("videoplayer_btn_icon videoplayer_play_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_next" role="button" tabindex="0" aria-label="' + this.getLang("next") + '">\n    ' + g.next("videoplayer_btn_icon videoplayer_next_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_live" style="display:none;">\n    ' + g.live("videoplayer_btn_icon videoplayer_live_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_live_app" style="display:none;">\n    <a href="//vk.cc/liveapp" target="_blank" class="videoplayer_live_app_link">' + this.getLang("live_download_app") + '</a>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_timeline"></div>\n  <div class="videoplayer_controls_item videoplayer_time">\n    <span class="_time_current"></span><span class="_time_duration"></span>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_mute" role="button" tabindex="0" aria-label="' + this.getLang("volume_off") + '">\n    ' + g.volume("videoplayer_btn_icon videoplayer_volume_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_volume"></div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_expand" style="display:none;" role="button" tabindex="0" aria-label="' + this.getLang("expand") + '">\n    ' + g.expand("videoplayer_btn_icon videoplayer_expand_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_fullscreen" role="button" tabindex="0" aria-label="' + this.getLang("aria_enter_fullscreen") + '">\n    ' + g.fullscreen("videoplayer_btn_icon videoplayer_fullscreen_icon") + '\n  </div>\n  <div class="videoplayer_controls_item videoplayer_quality" role="button" tabindex="0" aria-haspopup="true" aria-label="' + this.getLang("hdsd") + '"></div>\n  <a class="videoplayer_controls_item videoplayer_btn videoplayer_btn_vk" style="display:none;" target="_blank" aria-label="' + this.getLang("goto_orig_video") + '">\n    ' + g.vk("videoplayer_btn_icon videoplayer_vk_icon") + "\n  </a>\n</div>\n    "), this.btnPlay = domByClass(this.el, "videoplayer_btn_play"), this.btnNext = domByClass(this.el, "videoplayer_btn_next"), this.btnMute = domByClass(this.el, "videoplayer_btn_mute"), this.btnMuteIcon = domByClass(this.el, "videoplayer_volume_icon"), this.btnExpand = domByClass(this.el, "videoplayer_btn_expand"), this.btnFullscreen = domByClass(this.el, "videoplayer_btn_fullscreen"), this.btnLogo = domByClass(this.el, "videoplayer_btn_vk"), this.liveLabel = domByClass(this.el, "videoplayer_live"), this.liveApp = domByClass(this.el, "videoplayer_live_app"), this.timeLabel = domByClass(this.el, "videoplayer_time"), this.timeLabelCurrent = domByClass(this.timeLabel, "_time_current"), this.timeLabelDuration = domByClass(this.timeLabel, "_time_duration"), this.timelineContainer = domByClass(this.el, "videoplayer_timeline"), this.volumeContainer = domByClass(this.el, "videoplayer_volume"), this.domListen(this.btnPlay, "click", function() {
                return e.player.togglePlay()
            }), this.domListen(this.btnNext, "click", function() {
                return e.player.nextVideo()
            }), this.domListen(this.btnMute, "click", function() {
                return e.player.toggleMute()
            }), this.domListen(this.btnMute, "mouseenter", this.onVolumeOver), this.domListen(this.btnMute, "mouseleave", this.onVolumeOut), this.domListen(this.btnExpand, "click", function() {
                return e.player.expand()
            }), this.domListen(this.btnFullscreen, "click", function() {
                return e.player.toggleFullscreen()
            }), this.domListen(this.timeLabel, "click", this.toggleTime), this.domListen(this.volumeContainer, "mouseenter", this.onVolumeOver), this.domListen(this.volumeContainer, "mouseleave", this.onVolumeOut), this.attachTooltip({
                el: this.btnNext,
                text: this.getLang("next"),
                offsetY: -4
            }), this.attachTooltip({
                el: this.btnMute,
                text: function() {
                    return e._minSize ? "" : e.getLang(e.player.isMuted() ? "volume_on" : "volume_off")
                },
                offsetY: -4
            }), this.attachTooltip({
                el: this.btnExpand,
                text: this.getLang("open_popup"),
                offsetY: -2,
                hideOnClick: !0
            }), this.attachTooltip({
                el: this.btnFullscreen,
                text: this.getLang("fullscreen"),
                offsetY: -2,
                hideOnClick: !0
            }), this.attachTooltip({
                el: this.btnLogo,
                text: this.getLang("goto_orig_video"),
                offsetY: -4
            }), m.screenfull.enabled || this.toggleControl(this.btnFullscreen, !1)
        }, t.prototype.buildTimelineSlider = function() {
            this.timelinePreview = new p.TimelinePreview(this.player), this.timelineContainer.appendChild(this.timelinePreview.el), this.timelineSlider = new c.TimelineSlider(this.player, this, this.timelinePreview), this.timelineContainer.appendChild(this.timelineSlider.el)
        }, t.prototype.buildVolumeSlider = function() {
            var e = this;
            this.volumeSlider = new y.VolumeSlider(this.player), this.volumeContainer.appendChild(this.volumeSlider.el), setTimeout(function() {
                e.updateVolume(e.player.isMuted() ? 0 : e.player.getVolume())
            }, 0)
        }, t.prototype.buildQualitySelect = function() {
            this.qualityLabel = domByClass(this.el, "videoplayer_quality"), this.qualitySelect = new f.QualitySelect(this.player, this.qualityLabel), this.qualityLabel.appendChild(this.qualitySelect.el)
        }, t.prototype.initVideo = function(e) {
            b.setText(this.timeLabelCurrent, formatTime(0)), b.setText(this.timeLabelDuration, formatTime(this.player.getDuration())), this.toggleControl(this.timelineSlider.el, this.isControlAvailable("timeline")), this.toggleControl(this.timeLabel, this.isControlAvailable("time_label")), this.toggleControl(this.liveLabel, this.isControlAvailable("live_label")), this.toggleControl(this.liveApp, this.isControlAvailable("live_app")), this.toggleControl(this.btnNext, this.isControlAvailable("next")), this.toggleControl(this.btnExpand, this.isControlAvailable("expand")), this.toggleControl(this.btnFullscreen, this.isControlAvailable("fullscreen")), this.toggleControl(this.btnLogo, this.isControlAvailable("logo")), attr(this.btnLogo, "href", "/video" + e.oid + "_" + e.vid), this.toggleControl(this.qualityLabel, this.isControlAvailable("quality")), toggleClass(this.el, "_lite_controls", !!e.app_promo), toggleClass(this.el, "_has_quality", this.isControlAvailable("quality")), toggleClass(this.el, "_has_logo", this.isControlAvailable("logo")), this.qualitySelect.enable(), this.startTimelineAnimation()
        }, t.prototype.deinitVideo = function() {
            b.setText(this.timeLabelCurrent, formatTime(0)), b.setText(this.timeLabelDuration, formatTime(0)), this.stopTimelineAnimation(), this.timelineSlider.setLoaded(0), this.timelineSlider.setFilled(0), this.timelinePreview.hide(), this.qualitySelect.disable()
        }, t.prototype.toggleControl = function(e, t) {
            setStyle(e, {
                display: t ? "" : "none"
            })
        }, t.prototype.isControlAvailable = function(e) {
            var t = this.player.getVars();
            switch (e) {
                case "next":
                    return !!t.show_next && !this.player.isActiveLive();
                case "timeline":
                case "time_label":
                    return !t.live || this.player.getLivePhase() == d.ENDED;
                case "live_label":
                    return this.player.getLivePhase() == d.STARTED;
                case "live_app":
                    return this.player.getLivePhase() == d.STARTED && t.live_app_btn && "ios" == t.target_mob_os;
                case "expand":
                    return !!t.is_inline;
                case "fullscreen":
                    return !!m.screenfull.enabled && !t.app_promo;
                case "quality":
                    return !t.app_promo && this.player.getAvailableQualities().length > 1;
                case "logo":
                    return !t.nologo;
                default:
                    return !1
            }
        }, t.prototype.toggle = function(e) {
            toggleClass(this.el, "hidden", !e)
        }, t.prototype.show = function() {
            this.toggle(!0)
        }, t.prototype.hide = function() {
            this.toggle(!1)
        }, t.prototype.onStateChange = function() {
            var e = this.getLang(this.player.isPlaying() ? "pause" : "play");
            attr(this.btnPlay, "aria-label", e)
        }, t.prototype.onFullscreenChange = function() {
            var e = this.getLang(this.player.isFullscreen() ? "aria_exit_fullscreen" : "aria_enter_fullscreen");
            attr(this.btnFullscreen, "aria-label", e)
        }, t.prototype.onMediaTimeupdate = function(e) {
            this.timelineSlider.dragging || this.updateTime(e)
        }, t.prototype.startTimelineAnimation = function() {
            var e = this;
            if (!this._timelineAnimationRequestId && window.cancelAnimationFrame) {
                var t = function i() {
                    if (e.player.isPlaying() && !e.player.isActiveLive() && !e.timelineSlider.dragging) {
                        var t = e.player.curTime(),
                            n = e.player.getDuration();
                        if (t && n) {
                            var r = t / n;
                            e.timelineSlider.setFilled(r, !1)
                        }
                    }
                    e._timelineAnimationRequestId = requestAnimationFrame(i)
                };
                t()
            }
        }, t.prototype.stopTimelineAnimation = function() {
            this._timelineAnimationRequestId && (cancelAnimationFrame(this._timelineAnimationRequestId), this._timelineAnimationRequestId = null)
        }, t.prototype.updateBuffered = function(e) {
            this.timelineSlider.setLoaded(e)
        }, t.prototype.updateVolume = function(e) {
            this.volumeSlider.dragging || this.volumeSlider.setFilled(e);
            var t;
            t = e > .5 ? "max" : e > .2 ? "mid" : e > 0 ? "min" : "off", attr(this.btnMuteIcon, "data-value", t);
            var i = this.getLang(e ? "volume_off" : "volume_on");
            attr(this.btnMute, "aria-label", i)
        }, t.prototype.updateDuration = function(e) {
            var t = this;
            this.player.isPlayingLinearAd() || (this.timelineSlider.updateAria(), b.setText(this.timeLabelDuration, formatTime(e)), setTimeout(function() {
                return t.resize.apply(t, t.player.getSize())
            }, 0))
        }, t.prototype.updateTime = function(e) {
            var t = this.player.getDuration(),
                i = e / t;
            this.timelineSlider.setFilled(i);
            var n = formatTime(this._minSize && this._isTimeReversed ? t - e : e);
            this.timeLabelCurrent.textContent = n
        }, t.prototype.updateTimeWidth = function() {
            var e = val(this.timeLabelCurrent),
                t = formatTime(this.player.getDuration());
            t = t.replace(/\d/g, "8"), setStyle(this.timeLabel, {
                minWidth: ""
            }), b.setText(this.timeLabelCurrent, t), setStyle(this.timeLabel, {
                minWidth: getStyle(this.timeLabel, "width")
            }), b.setText(this.timeLabelCurrent, e)
        }, t.prototype.toggleTime = function() {
            this._minSize && (this._isTimeReversed = !this._isTimeReversed, b.storage.set("video_time_reversed", this._isTimeReversed ? 1 : 0), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed), this.updateTime(this.player.curTime()))
        }, t.prototype.resize = function(e, t) {
            var i = this;
            this._minSize = 550 > e, setStyle(this.timeLabel, {
                cursor: this._minSize ? "pointer" : ""
            }), toggle(this.timeLabelDuration, !this._minSize), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed && this._minSize), this.updateTime(this.player.curTime()), this.updateTimeWidth();
            var n = this._minSize;
            setStyle(this.volumeContainer, {
                padding: n ? "0" : ""
            }), this.volumeSlider.setVertical(n), this.volumeSlider.toggleVisibility(!n);
            var r = [this.btnMute];
            this.player.isInited() && (this.isControlAvailable("timeline") && r.unshift(this.timelineSlider.el), this.isControlAvailable("time_label") && r.unshift(this.timeLabel), this.isControlAvailable("quality") && r.unshift(this.qualityLabel)), each(r, function(e, t) {
                return show(t)
            }), each(r, function(e, t) {
                return i.el.offsetWidth <= i.player.el.offsetWidth ? !1 : void i.toggleControl(t, !1)
            }), toggleClass(this.el, "_has_quality", isVisible(this.qualityLabel))
        }, t.prototype.isActive = function() {
            return this.timelineSlider.dragging || this.volumeSlider.dragging || this.qualitySelect.isOpen()
        }, t.prototype.onVolumeOver = function() {
            this._minSize && (this.volumeSlider.toggleVisibility(!0), clearTimeout(this._hideVolumeSliderTimeout))
        }, t.prototype.onVolumeOut = function() {
            var e = this;
            this._minSize && (this._hideVolumeSliderTimeout = setTimeout(function() {
                e.volumeSlider.toggleVisibility(!1)
            }, 100))
        }, t.prototype.onLivePhaseChange = function(e) {
            toggle(this.timelineSlider.el, this.isControlAvailable("timeline")), toggle(this.timeLabel, this.isControlAvailable("time_label")), toggle(this.liveLabel, this.isControlAvailable("live_label")), toggle(this.liveApp, this.isControlAvailable("live_app"))
        }, t.prototype.onQualitiesListChange = function(e) {
            var t = this.isControlAvailable("quality");
            toggle(this.qualityLabel, t), toggleClass(this.el, "_has_quality", t)
        }, t.prototype.onSeek = function(e) {
            var t = e / this.player.getDuration();
            this.timelineSlider.setFilled(t), b.setText(this.timeLabelCurrent, formatTime(e))
        }, t.prototype.onLinearAdStarted = function(e, t) {
            var i = this,
                n = t.duration;
            this.timelineSlider.disable(), this.timelinePreview.hide(), this.qualitySelect.disable(), b.setText(this.timeLabelDuration, formatTime(intval(n))), this.updateTime(0), setTimeout(function() {
                return i.resize.apply(i, i.player.getSize())
            }, 0)
        }, t.prototype.onLinearAdCompleted = function(e) {
            var t = this;
            this.timelineSlider.enable(), this.qualitySelect.enable(), b.setText(this.timeLabelDuration, formatTime(this.player.getDuration())), this.updateTime(this.player.curTime()), setTimeout(function() {
                return t.resize.apply(t, t.player.getSize())
            }, 0)
        }, t
    }(a.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PlayerUI = void 0;
    var l = i(1),
        u = i(5),
        h = r(u),
        d = i(2),
        c = r(d),
        p = i(11),
        y = r(p),
        f = i(3),
        v = r(f),
        g = i(48),
        m = n(g),
        _ = i(50),
        b = i(53),
        S = i(47),
        E = i(28),
        L = i(49),
        w = i(56),
        T = i(4),
        C = r(T),
        A = 3e3,
        k = 5,
        P = 1 / 24,
        I = .05,
        x = .05;
    t.PlayerUI = function(e) {
        function t(i) {
            o(this, t);
            var n = s(this, e.call(this, i));
            return n.el = ce("div", {
                className: "videoplayer_ui"
            }), n.waiting = se(getProgressHtml("", "videoplayer_waiting")), n.el.appendChild(n.waiting), n.title = ce("div", {
                className: "videoplayer_title"
            }), n.titleLink = ce("a", {
                className: "videoplayer_title_link",
                target: "_blank"
            }), n.title.appendChild(n.titleLink), n.el.appendChild(n.title), n.error = ce("div", {
                className: "videoplayer_error hidden"
            }), attr(n.error, "role", "alert"), n.el.appendChild(n.error), n.liveWaiting = ce("div", {
                className: "videoplayer_live_waiting hidden"
            }), n.el.appendChild(n.liveWaiting), n.thumb = ce("div", {
                className: "videoplayer_thumb hidden",
                innerHTML: '<div class="videoplayer_big_play_btn"><div class="videoplayer_big_play_btn_bg"></div>' + C.play("videoplayer_big_play_icon") + "</div>"
            }), n.el.appendChild(n.thumb), n.controls = new _.PlayerControls(i), n.el.appendChild(n.controls.el), n.shareActions = new b.ShareActions(i), n.el.appendChild(n.shareActions.el), n.contextMenu = new S.ContextMenu(i), n.el.appendChild(n.contextMenu.el), n.playerTooltip = new w.Tooltip(i), n.el.appendChild(n.playerTooltip.el), n.autoplayTimer = ce("div", {
                className: "videoplayer_autoplay_timer hidden",
                innerHTML: '<div class="videoplayer_autoplay_timer_equalizer" style="display:none;"><div class="_col"></div><div class="_col"></div><div class="_col"></div></div><div class="videoplayer_autoplay_timer_text"></div>'
            }), n.autoplayTimerEqualizer = domByClass(n.autoplayTimer, "videoplayer_autoplay_timer_equalizer"), n.autoplayTimerText = domByClass(n.autoplayTimer, "videoplayer_autoplay_timer_text"), n.el.appendChild(n.autoplayTimer), n.autoplayHint = ce("div", {
                className: "videoplayer_autoplay_hint hidden"
            }), n.el.appendChild(n.autoplayHint), n.domListen(n.thumb, "click", function() {
                return n.player.play()
            }), n.domListen(i.el, "keydown", n.onKeyDown), n.domListen(i.el, "keyup", n.onKeyUp), n.domListen(i.el, "blur", n.onBlur), n.domListen(i.el, "mousedown", n.onMouseDown), n.domListen(i.el, "click", n.onClick), n.domListen(i.el, "dblclick", n.onDoubleClick), n.domListen(i.el, "mouseenter", n.onMouseEnter), n.domListen(i.el, "mousemove", n.onMouseMove), n.domListen(i.el, "mouseleave", n.onMouseLeave), n.domListen(i.el, "wheel", n.onWheel), n.playerListen(c.STATE_CHANGE, n.onStateChange), n.playerListen(c.FULLSCREEN_CHANGE, n.onFullscreenChange), n.playerListen(c.LIVE_PHASE_CHANGE, n.onLivePhaseChange), n.playerListen(c.MEDIA_PLAYING, n.onMediaPlaying), n.playerListen(c.MEDIA_TIMEUPDATE, n.onMediaTimeupdate), n.playerListen(c.MEDIA_WAITING, n.updateWaiting), n.playerListen(c.ADS_WAITING, n.updateWaiting), n.playerListen(c.ADS_LINEAR_STARTED, n.onLinearAdStarted), n.playerListen(c.ADS_LINEAR_COMPLETED, n.onLinearAdCompleted), n.playerListen(c.EXPANDED, n.onPlayerExpanded), n._mouseInside = !1, n._lastUserActivity = vkNow(), n._checkUserActivityInterval = setInterval(n.checkUserActivity.bind(n), 100), n
        }
        return a(t, e), t.prototype.initVideo = function(e) {
            if (setStyle(this.thumb, {
                    backgroundImage: "url(" + e.jpg + ")"
                }), this.updateTitle(e.md_title), toggleClass(this.titleLink, "_right_offset", !e.nolikes), toggleClass(this.titleLink, "_clickable", !!e.is_ext), e.live && this.onLivePhaseChange(e.live), !e.is_inline, e.stickers_promo && this.buildStickersPromo.apply(this, e.stickers_promo.split("|")), this._mouseInside = isHover(this.el), this._lastUserActivity = vkNow(), this.updateWaiting(), e.from_autoplay) {
                var t = e.live && e.live != y.ENDED ? this.getLang("live") : formatTime(this.player.getDuration());
                v.setText(this.autoplayTimerText, t), removeClass(this.autoplayTimer, "hidden"), val(this.autoplayHint, this.getLang(e.expand_on_click ? "autoplay_expand_hint" : "autoplay_volume_hint")), this._mouseInside || this.hideUI({
                    noTransition: !0
                })
            }
            e.is_aurora && this.player.isActiveLive() && (this.donationsLayer = new m["default"](this.player), this.el.appendChild(this.donationsLayer.el))
        }, t.prototype.deinitVideo = function() {
            this.endScreen && this.removeEndScreen(), this.donationsLayer && (clearTimeout(this._randDonationTimeout), this.donationsLayer.destroy(), this.donationsLayer = null), this.tooltip.hide(), this.toggleLiveDummy(!1), this.updateWaiting(), this.removeAdvSiteLink(), this.removeStickersPromo()
        }, t.prototype.onTouchedByUser = function() {
            addClass(this.autoplayHint, "hidden"), addClass(this.autoplayTimer, "hidden"), setStyle(this.player.el, {
                cursor: ""
            })
        }, t.prototype.onMouseDown = function(e) {
            this.onKeyboardFocus(!1), this._clickTarget = e.target
        }, t.prototype.onClick = function(e) {
            return this._lastUserActivity = vkNow(), this.contextMenu.isVisible() ? void 0 : this.player.isFromAutoplay() && !this.player.isTouchedByUser() ? (this.player.onTouchedByUser(), void(this.getVar("expand_on_click") && this.isBackgroundElement(this._clickTarget) && this.player.expand())) : void(this.isBackgroundElement(this._clickTarget) && this.player.togglePlay())
        }, t.prototype.onDoubleClick = function(e) {
            (e.target == this.player.el || e.target == this.player.media.el) && this.player.toggleFullscreen()
        }, t.prototype.onKeyDown = function(e) {
            var t = inArray(attr(e.target, "role"), ["button", "menuitemradio"]);
            switch (e.keyCode) {
                case KEY.TAB:
                    this.onKeyboardFocus(!0);
                    break;
                case KEY.SPACE:
                case KEY.ENTER:
                    t && this._keyboardFocus ? (this._clickTarget = e.target, e.target.click()) : e.keyCode == KEY.SPACE && this.player.togglePlay(), e.preventDefault();
                    break;
                case KEY.UP:
                case KEY.DOWN:
                    var i = e.keyCode == KEY.UP ? 1 : -1;
                    e.target === this.controls.timelineSlider.el && this._keyboardFocus ? (this.onKeyboardFocus(!0), this.keyboardSlideProgress(i, e.altKey)) : this.keyboardSlideVolume(i), e.preventDefault();
                    break;
                case KEY.LEFT:
                case KEY.RIGHT:
                    var i = e.keyCode == KEY.RIGHT ? 1 : -1;
                    e.target === this.controls.volumeSlider.el && this._keyboardFocus ? (this.onKeyboardFocus(!0), this.keyboardSlideVolume(i, e.altKey)) : this.keyboardSlideProgress(i, e.altKey), e.preventDefault();
                    break;
                case 70:
                    this.player.toggleFullscreen(), e.preventDefault();
                    break;
                case 77:
                    this.player.toggleMute(), e.preventDefault()
            }
            this._lastUserActivity = vkNow(), this.tooltip.hide(), this.showUI(), this.player.onTouchedByUser()
        }, t.prototype.isBackgroundElement = function(e) {
            return e === this.player.el || e === this.controls.el || e === this.title || e === this.player.media.el || this.player.media.el.contains(e)
        }, t.prototype.keyboardSlideProgress = function(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
            if (t && !this.frameSeeking && (this.frameSeeking = !0, this.player.trigger(c.UI_SEEKSTART, !0)), this.player.getState() != h.UNSTARTED && !this.player.isPlayingLinearAd()) {
                var i = t ? P : k;
                this.player.seekBy(i * e)
            }
        }, t.prototype.keyboardSlideVolume = function(e) {
            var t = I * e;
            this.player.setVolume(this.player.getVolume() + t)
        }, t.prototype.onKeyUp = function(e) {
            e.keyCode == KEY.ALT && this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(c.UI_SEEKEND))
        }, t.prototype.onKeyboardFocus = function(e) {
            this._keyboardFocus = e, toggleClass(this.el, "_keyboard_focus", e)
        }, t.prototype.onBlur = function(e) {
            this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(c.UI_SEEKEND))
        }, t.prototype.onMouseEnter = function(e) {
            this._mouseInside = !0, this.showUI()
        }, t.prototype.onMouseLeave = function(e) {
            this._mouseInside = !1;
            var t = this.player.isPlaying(),
                i = this.player.getState() == h.PAUSED && this.player.isFromAutoplay() && !this.player.isTouchedByUser();
            !t && !i || this.controls.isActive() || this.hideUI()
        }, t.prototype.onMouseMove = function(e) {
            this._lastUserActivity = vkNow(), this.showUI()
        }, t.prototype.onWheel = function(e) {
            if (!browser.mac && this.player.isFullscreen()) {
                var t = e.deltaY > 0 ? -1 : 1;
                this.player.setVolume(this.player.getVolume() + x * t), this._lastUserActivity = vkNow(), this.showUI()
            }
        }, t.prototype.hideUI = function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                t = e.hideCursor,
                i = void 0 === t ? !0 : t,
                n = e.noTransition,
                r = void 0 === n ? !1 : n;
            this._controlsHidden || (r && (addClass(this.el, "no_transition"), removeClassDelayed(this.el, "no_transition")), this.shareActions.hide(), this.controls.hide(), addClass(this.title, "hidden"), this.player.isFromAutoplay() && !this.player.isTouchedByUser() && (removeClass(this.autoplayTimer, "hidden"), addClass(this.autoplayHint, "hidden")), this.advertiserSiteLink && addClass(this.advertiserSiteLink, "hidden"), this.stickersPromo && addClass(this.stickersPromo, "hidden"), setStyle(this.player.el, {
                cursor: i ? "none" : ""
            }), this._controlsHidden = !0, this.player.trigger(c.UI_CONTROLS_HIDE))
        }, t.prototype.showUI = function() {
            !this._controlsHiddenByAd && this._controlsHidden && (this.shareActions.show(), this.controls.show(), removeClass(this.title, "hidden"), this.player.isFromAutoplay() && !this.player.isTouchedByUser() ? (addClass(this.autoplayTimer, "hidden"), removeClass(this.autoplayHint, "hidden"), setStyle(this.player.el, {
                cursor: "pointer"
            })) : setStyle(this.player.el, {
                cursor: ""
            }), this.advertiserSiteLink && removeClass(this.advertiserSiteLink, "hidden"), this.stickersPromo && removeClass(this.stickersPromo, "hidden"), this._controlsHidden = !1, this.player.trigger(c.UI_CONTROLS_SHOW))
        }, t.prototype.updateWaiting = function() {
            var e = this.player,
                t = inArray(this.player.getLivePhase(), [y.UPCOMING, y.WAITING]),
                i = (!e.isInited() || e.isBuffering() || e.isLoadingAds()) && !e.isPlayingLinearAd() && !e.hasError() && !t;
            toggle(this.waiting, i), attr(this.player.el, "aria-busy", i ? "true" : "false")
        }, t.prototype.updateTitle = function(e) {
            isUndefined(e) || (val(this.titleLink, e), attr(this.titleLink, "href", "/video" + this.player.getVideoId()));
            var t = this.player.isInited(),
                i = this.player.isPlayingLinearAd(),
                n = this.player.isFullscreen(),
                r = this.getVar("is_ext") || this.getVar("is_inline") && "videocat" == this.getVar("module"),
                o = t && !this.getVar("no_title") && !i && !this.endScreen && (n || r);
            toggle(this.title, !!o)
        }, t.prototype.toggleError = function(e, t) {
            if (e) {
                var i = "";
                if (i += t.waiting ? C.errorWaiting("_error_waiting_icon") : C.error("_error_icon"), i += '<div class="_text">' + t.message + "</div>", i = '<div class="_error_msg">' + i + "</div>", t.waiting) {
                    var n = this.getVar("first_frame_800") || this.getVar("first_frame_320") || this.getVar("jpg");
                    i = '<div class="_background" style="background-image:url(' + n + ')"></div>' + i
                }
                val(this.error, i), toggleClass(this.error, "_waiting", !!t.waiting)
            }
            toggleClass(this.error, "hidden", !e), attr(this.error, "aria-hidden", !e)
        }, t.prototype.onStateChange = function(e, t) {
            toggleClass(this.el, "_playing", this.player.isPlaying() && this.player.isInited()), toggleClass(this.el, "_ended", e === h.ENDED);
            var i = e == h.PAUSED && this.player.isFromAutoplay() && !this.player.isTouchedByUser();
            if (e === h.PLAYING || i || this.showUI(), this.endScreen && e !== h.ENDED && (this.removeEndScreen(), this._controlsHidden || this.controls.show()), e === h.ENDED && (addClass(this.autoplayTimer, "hidden"), addClass(this.autoplayHint, "hidden"), this.canShowEndScreen() && this.buildEndScreen()), !this.player.isFromAutoplay() || this.player.isTouchedByUser() || this.player.isStartedPlaying()) {
                var n = e === h.UNSTARTED && !this.getVar("autoplay") || e === h.ENDED,
                    r = !this.endScreen;
                this.toggleThumb(n, r)
            } else this.toggleThumb(!0, !1);
            this.toggleError(e === h.ERROR, this.player.getErrorData()), e === h.ERROR && (this.toggleThumb(!1), this.toggleLiveDummy(!1), addClass(this.autoplayHint, "hidden")), this.updateTitle(), this.updateWaiting(), this.updateShareActions(), toggle(this.advertiserSiteLink, e != h.ENDED)
        }, t.prototype.toggleThumb = function(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
            toggleClass(this.thumb, "hidden", !e), e && toggle(domByClass(this.thumb, "videoplayer_big_play_btn"), t)
        }, t.prototype.onFullscreenChange = function(e) {
            toggleClass(this.el, "_fullscreen", e), this.updateTitle()
        }, t.prototype.onLivePhaseChange = function(e) {
            var t = !1;
            e == y.UPCOMING && this.getVar("live_start"), e == y.UPCOMING || e == y.WAITING ? (val(this.liveWaiting, this.getLang("live_starting_soon")), t = !0) : t = !1, this.player.getState() === h.ERROR && (t = !1), this.toggleLiveDummy(t)
        }, t.prototype.toggleLiveDummy = function(e) {
            toggleClass(this.liveWaiting, "hidden", !e)
        }, t.prototype.onMediaPlaying = function() {
            this.player.isFromAutoplay() && (this.toggleThumb(!1), this.player.isTouchedByUser() || this.resizeAutoplayTimer())
        }, t.prototype.onMediaTimeupdate = function(e) {
            if (this.player.isFromAutoplay() && !this.player.isTouchedByUser() && !this.player.isActiveLive()) {
                var t = positive(this.player.getDuration() - e);
                val(this.autoplayTimerText, formatTime(t))
            }
        }, t.prototype.resizeAutoplayTimer = function() {
            if (!this.player.isActiveLive()) {
                var e = formatTime(this.player.getDuration()),
                    t = val(this.autoplayTimerText);
                v.setText(this.autoplayTimerText, e.replace(/\d/g, "8")), setStyle(this.autoplayTimerText, {
                    minWidth: this.autoplayTimerText.offsetWidth + "px"
                }), v.setText(this.autoplayTimerText, t)
            }
            setStyle(this.autoplayTimerEqualizer, {
                display: ""
            })
        }, t.prototype.onLinearAdStarted = function(e, t) {
            var i = (t.duration, t.hideControls);
            this.updateTitle(), this.updateShareActions(), this.player.isFromAutoplay() && !this.player.isTouchedByUser() && (hide(this.autoplayTimer), hide(this.autoplayHint)), i && (this._controlsHiddenByAd = !0, this.hideUI({
                hideCursor: !1
            })), this.updateWaiting()
        }, t.prototype.onLinearAdCompleted = function(e) {
            this.updateTitle(), this.updateShareActions(), this.player.isFromAutoplay() && !this.player.isTouchedByUser() && (show(this.autoplayTimer), show(this.autoplayHint)), this._controlsHiddenByAd && (this._controlsHiddenByAd = !1, this.showUI()), this.updateWaiting()
        }, t.prototype.checkUserActivity = function() {
            var e = this;
            if (!this._controlsHidden) {
                var t = this.player,
                    i = function() {
                        return vkNow() - e._lastUserActivity > A
                    },
                    n = function() {
                        return e.controls.isActive() || isHover(e.controls.el) || isHover(e.shareActions.el)
                    };
                !t.isPlaying() || this._mouseInside && !t.isFullscreen() || !i() || n() || this.hideUI({
                    hideCursor: this.player.isFullscreen()
                })
            }
        }, t.prototype.canShowEndScreen = function() {
            if (this.getVar("live") && this.getVar("live") !== y.ENDED) return !1;
            var e = !this.getVar("nolikes"),
                t = this.getVar("show_next") || this.getVar("show_suggestions"),
                i = t && (this.player.getNextVideos().length || this.player.getSuggestions().length);
            return !(!e && !i)
        }, t.prototype.buildEndScreen = function() {
            var e, t, i = [],
                n = !1,
                r = !1;
            this.getVar("show_next") && (i = this.player.getNextVideos(), n = this.player.nextTimerEnabled()), this.getVar("show_suggestions") && !i.length && (i = this.player.getSuggestions(), r = !0, n = !1), i.length ? this.endScreen = new L.EndScreenNext(this.player, i, n, r) : this.endScreen = new E.EndScreen(this.player), this.el.appendChild(this.endScreen.el);
            var o = this.player.getSize();
            (e = this.endScreen).resize.apply(e, o), (t = this.endScreen).isStretchMode.apply(t, o) && this.controls.hide()
        }, t.prototype.removeEndScreen = function() {
            re(this.endScreen.el), this.endScreen.destroy(), delete this.endScreen
        }, t.prototype.buildAdvSiteLink = function() {
            var e = this.getLang("goto_advertisers_site");
            this.advertiserSiteLink = ce("a", {
                className: "videoplayer_advertiser_site_link",
                innerHTML: C.gotoLink("videoplayer_goto_advertisers_site_icon") + e,
                href: buttonLink,
                target: "_blank"
            }), this.advertiserSiteLink.onclick = function(e) {
                v.safeOpenLink(href), e.preventDefault()
            }, this.el.appendChild(this.advertiserSiteLink)
        }, t.prototype.removeAdvSiteLink = function() {
            re(this.advertiserSiteLink), this.advertiserSiteLink = null
        }, t.prototype.buildStickersPromo = function(e, t, i, n) {
            var r = isRetina() ? 256 : 96,
                o = "/images/gift/-" + e + "/" + r + ".png";
            this.stickersPromo = ce("div", {
                className: "videoplayer_stickers_promo"
            }), domData(this.stickersPromo, "pack-id", e);
            var s = se('\n<a href="/stickers/' + t + '" target="_blank" class="videoplayer_stickers_promo__link">\n  <div class="videoplayer_stickers_promo__title">' + i + '</div>\n  <div class="videoplayer_stickers_promo__price">' + n + '</div>\n  <img src="' + o + '" class="videoplayer_stickers_promo__img"/>\n</a>');
            this.domListen(s, "click", this.onStickersPromoClick.bind(this, e, t));
            var a = se('<div class="videoplayer_sticker_promo__close">' + C.bubbleClose("videoplayer_sticker_promo__close_icon") + "</div>");
            this.domListen(a, "click", this.removeStickersPromo), this.stickersPromo.appendChild(s), this.stickersPromo.appendChild(a), this.el.appendChild(this.stickersPromo)
        }, t.prototype.onStickersPromoClick = function(e, t, i) {
            this.player.isFullscreen() && this.player.toggleFullscreen(), Emoji.previewSticker(e, this, {
                name: t
            }, i)
        }, t.prototype.onStickersPurchased = function(e) {
            domData(this.stickersPromo, "pack-id") == e && this.removeStickersPromo()
        }, t.prototype.removeStickersPromo = function() {
            this.stickersPromo && (re(this.stickersPromo), this.domUnlisten(domFC(this.stickersPromo)), this.domUnlisten(domLC(this.stickersPromo)), delete this.stickersPromo)
        }, t.prototype.isControlsVisible = function() {
            return !this._controlsHidden
        }, t.prototype.resize = function(e, t) {
            toggleClass(this.el, "_minimized", this.player.isMinimized()), toggleClass(this.error, "_min_size", 720 > e || 405 > t), toggleClass(this.liveWaiting, "_min_size", 720 > e || 405 > t), this.updateShareActions(), this.endScreen && (this.endScreen.isStretchMode(e, t) ? this.controls.hide() : this.controls.show()), this.stickersPromo && toggle(this.stickersPromo, e >= 640 && t >= 360)
        }, t.prototype.updateShareActions = function() {
            var e, t = !!this.endScreen && (e = this.endScreen).isStretchMode.apply(e, this.player.getSize());
            this.shareActions.updateVisibility(t)
        }, t.prototype.onPlayerExpanded = function() {
            this.updateTitle()
        }, t.prototype.destroy = function() {
            e.prototype.destroy.call(this), clearInterval(this._checkUserActivityInterval)
        }, t
    }(l.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.QualitySelect = void 0;
    var a = i(1),
        l = i(2),
        u = n(l),
        h = i(12),
        d = n(h),
        c = i(4),
        p = n(c),
        y = 1e3,
        f = 200;
    t.QualitySelect = function(e) {
        function t(i, n) {
            r(this, t);
            var s = o(this, e.call(this, i));
            return s.el = se('\n<div class="videoplayer_quality_select">\n  <div class="_label">\n    <span class="_label_text"></span>\n    <div class="_label_sd_icon hidden"></div>\n    <div class="_label_hd_icon hidden">' + p.hd("videoplayer_hd_icon") + '</div>\n  </div>\n  <div class="_list hidden" role="menu"></div>\n</div>\n    '), s._wrap = n, s._label = domByClass(s.el, "_label"), s._label_text = domByClass(s.el, "_label_text"), s._label_sd_icon = domByClass(s.el, "_label_sd_icon"), s._label_hd_icon = domByClass(s.el, "_label_hd_icon"), s._list = domByClass(s.el, "_list"), s.domListen(n, "mouseenter", s.onMouseEnter), s.domListen(n, "mouseleave", s.onMouseLeave), s.domListen(n, "mousemove", s.onMouseMove), s.domListen(n, "keydown", s.onKeyDown), s.domListen(n, "click", s.onLabelClick), s.domListen(s._list, "click", s.onItemClick), s.playerListen(u.QUALITIES_LIST_CHANGE, s.updateList), s.playerListen(u.QUALITY_CHANGE, s.updateQuality), s
        }
        return s(t, e), t.prototype.initVideo = function(e) {
            this.updateList(this.player.getAvailableQualities()), this.updateQuality(this.player.getQuality()), this.enable()
        }, t.prototype.deinitVideo = function() {
            this.disable()
        }, t.prototype.updateList = function(e) {
            var t = "";
            this.player.isAutoQualityAvailable() && (t += '<div class="_item" data-value="-1" role="menuitemradio" tabindex="0">' + this.getLang("quality_auto") + "</div>"), each(e, function(e, i) {
                var n = i;
                i >= d.HD && (n += p.hd("_item_hd_icon")), t += '<div class="_item" data-value="' + i + '" role="menuitemradio" tabindex="0">' + n + "</div>"
            }), val(this._list, t), this._items = geByClass("_item", this.el)
        }, t.prototype.updateQuality = function(e, t, i) {
            if (e) {
                val(this._label_text, i ? this.getLang("quality_auto") : e), toggleClass(this._label_hd_icon, "hidden", e < d.HD), toggleClass(this._label_sd_icon, "hidden", e >= d.HD), each(this._items, function(t, n) {
                    var r = +attr(n, "data-value"),
                        o = i ? r == d.AUTO : r == e;
                    toggleClass(n, "_item_active", o), attr(n, "aria-checked", o)
                });
                var n = this.getLang("hdsd");
                n += " (" + this.getLang("aria_quality_current", {
                    quality: e
                }) + (i ? " " + this.getLang("quality_auto") : "") + ")", attr(this._wrap, "aria-label", n)
            }
        }, t.prototype.onLabelClick = function(e) {
            this._disabled || e.target == this._list || isAncestor(e.target, this._list) || this.toggle(!this.isOpen())
        }, t.prototype.onItemClick = function(e) {
            var t = +attr(e.target, "data-value");
            t && this.player.setQuality(t), this.toggle(!1)
        }, t.prototype.onMouseEnter = function() {
            this._disabled || (clearTimeout(this._hideTimeout), addClass(this._label, "_over"), this.isOpen() || (vkNow() - this.tooltip.lastShown < 50 ? this.showTooltip() : this._tooltipTimeout = setTimeout(this.showTooltip.bind(this), f)))
        }, t.prototype.showTooltip = function() {
            var e = this;
            this._disabled || this.isOpen() || this.tooltip.show({
                el: this._label,
                text: function() {
                    return e.getLang("hdsd")
                },
                offsetY: 10
            })
        }, t.prototype.onMouseLeave = function() {
            this._hideTimeout = setTimeout(this.toggle.bind(this, !1), y), removeClass(this._label, "_over"), this.tooltip.hide(), clearTimeout(this._tooltipTimeout)
        }, t.prototype.onMouseMove = function(e) {
            this._disabled || toggleClass(this._label, "_over", !inArray(e.target, this._items))
        }, t.prototype.onKeyDown = function(e) {
            switch (e.keyCode) {
                case KEY.UP:
                case KEY.DOWN:
                    if (this.isOpen()) {
                        if (this._items.length) {
                            var t = this._items.length,
                                i = e.keyCode == KEY.DOWN ? 1 : -1,
                                n = indexOf(this._items, e.target),
                                r = (t + n + i) % t;
                            this._items[r].focus()
                        }
                    } else this.toggle(!0);
                    e.preventDefault(), e.stopPropagation();
                    break;
                case KEY.ESC:
                    this.isOpen() && (this.toggle(!1), e.preventDefault(), e.stopPropagation())
            }
        }, t.prototype.toggle = function() {
            var e = this,
                t = arguments.length <= 0 || void 0 === arguments[0] ? !this.isOpen() : arguments[0];
            t != this.isOpen() && (toggleClass(this._list, "hidden", !t), attr(this._list, "aria-hidden", !t), t ? ! function() {
                e.tooltip.hide(), attr(e._wrap, "tabindex", -1);
                var t = domByClass(e._list, "_item_active");
                t && setTimeout(function() {
                    return t.focus()
                }, 100)
            }() : (attr(this._wrap, "tabindex", 0), domPN(document.activeElement) == this._list && this._wrap.focus()), attr(this._wrap, "aria-expanded", t))
        }, t.prototype.isOpen = function() {
            return !hasClass(this._list, "hidden")
        }, t.prototype.disable = function() {
            this.toggle(!1), this._disabled = !0, setStyle(this._wrap, {
                cursor: "default"
            })
        }, t.prototype.enable = function() {
            this._disabled = !1, setStyle(this._wrap, {
                cursor: ""
            })
        }, t
    }(a.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ShareActions = void 0;
    var a = i(1),
        l = i(2),
        u = n(l),
        h = i(5),
        d = n(h),
        c = i(4),
        p = n(c),
        y = i(26),
        f = n(y);
    t.ShareActions = function(e) {
        function t(i) {
            r(this, t);
            var n = o(this, e.call(this, i));
            n.el = se('\n<div class="videoplayer_share_actions">\n  <div class="_donate">' + p.donate("_donate_icon") + '</div>\n  <div class="_like">' + p.like("_like_icon") + '</div>\n  <div class="_share">' + p.share("_share_icon") + '</div>\n  <div class="_add">' + p.add("_add_icon") + "</div>\n</div>\n    "), n._like = domByClass(n.el, "_like"), n._share = domByClass(n.el, "_share"), n._add = domByClass(n.el, "_add"), n._donate = domByClass(n.el, "_donate"), n.domListen(n._like, "click", function(e) {
                n.player.likeVideo(s())
            }), n.attachTooltip({
                el: n._like,
                text: n.getLang("like"),
                toDown: !0,
                hideDelay: 200
            }), n.domListen(n._share, "click", function(e) {
                n.player.shareVideo(s())
            }), n.attachTooltip({
                el: n._share,
                text: n.getLang("share"),
                toDown: !0,
                hideDelay: 200
            }), n.domListen(n._add, "click", function(e) {
                n.player.addVideo(s())
            }), n.attachTooltip({
                el: n._add,
                text: function() {
                    return n.getLang(n.player.videoAdded ? "added" : "add")
                },
                toDown: !0,
                hideDelay: 200
            }), n.domListen(n._donate, "click", function(e) {
                n.player.donate(s())
            }), n.attachTooltip({
                el: n._donate,
                text: n.getLang("donate"),
                toDown: !0,
                hideDelay: 200
            });
            var s = function() {
                return n.player.getState() === d.ENDED ? f.END_SMALL : f.INLINE
            };
            return i.on(u.VIDEO_LIKE, function(e) {
                n.setLiked(e)
            }).on(u.VIDEO_ADD, function(e) {
                n.setAdded(e)
            }), n
        }
        return s(t, e), t.prototype.initVideo = function(e) {
            this.setLiked(!!e.liked), this.setAdded(!!e.added), toggle(this._add, !!e.can_add), toggle(this._donate, !!e.can_donate), this.updateVisibility()
        }, t.prototype.setLiked = function(e) {
            toggleClass(this._like, "_liked", e)
        }, t.prototype.setAdded = function(e) {
            toggleClass(this._add, "_added", e)
        }, t.prototype.show = function() {
            removeClass(this.el, "hidden")
        }, t.prototype.hide = function() {
            addClass(this.el, "hidden")
        }, t.prototype.updateVisibility = function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0],
                t = !this.getVar("nolikes"),
                i = e || !this.player.isPlayingLinearAd() && this.player.getState() !== d.ENDED;
            toggle(this.el, t && i)
        }, t
    }(a.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.TimelinePreview = void 0;
    var s = function() {
            function e(e, t) {
                var i = [],
                    n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
                } catch (l) {
                    r = !0, o = l
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        a = i(1);
    t.TimelinePreview = function(e) {
        function t(i) {
            n(this, t);
            var o = r(this, e.call(this, i));
            return o.el = ce("div", {
                className: "videoplayer_timeline_preview",
                innerHTML: '\n<div class="_preview"></div>\n<div class="_text"></div>\n<div class="_arrow"></div>\n      '
            }, {
                display: "none"
            }), o._preview = domByClass(o.el, "_preview"), o._text = domByClass(o.el, "_text"), o._arrow = domByClass(o.el, "_arrow"), o
        }
        return o(t, e), t.prototype.initVideo = function(e) {
            if (e.timeline_thumbs) {
                var t = this.getThumbsData();
                setStyle(this._preview, {
                    width: t.frameWidth + "px",
                    height: t.frameHeight + "px"
                }), this._imgUrls = t.links, each(this._imgUrls, function(e, t) {
                    return vkImage().src = t
                })
            }
        }, t.prototype.getThumbsData = function(e) {
            var t = this.getVar("timeline_thumbs").split("|"),
                i = s(t, 6),
                n = i[0],
                r = i[1],
                o = i[2],
                a = i[3],
                l = i[4],
                u = i[5];
            return {
                frameWidth: n,
                frameHeight: r,
                countPerRow: o,
                countPerImage: a,
                countTotal: l,
                links: u.split(",")
            }
        }, t.prototype.show = function(e) {
            function t(t) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e) {
            var t = e.sliderEl,
                i = e.progress,
                n = e.text,
                r = this.getThumbsData(),
                o = Math.min(r.countTotal, Math.max(0, Math.floor(r.countTotal * i - .5))),
                s = Math.floor(o / r.countPerImage),
                a = Math.floor(o % r.countPerImage / r.countPerRow),
                l = o % r.countPerRow,
                u = -l * r.frameWidth + "px",
                h = -a * r.frameHeight + "px";
            setStyle(this._preview, {
                backgroundImage: "url(" + this._imgUrls[s] + ")",
                backgroundPosition: u + " " + h
            });
            var d = 3,
                c = 7,
                p = this.player.el.getBoundingClientRect(),
                y = t.getBoundingClientRect(),
                f = y.left - p.left + y.width * i;
            if (f = f - Math.round(r.frameWidth / 2) - d, 7 > f) {
                var v = f - 7 - c / 2;
                f = 7
            }
            setStyle(this.el, {
                left: f + "px"
            }), setStyle(this._arrow, {
                marginLeft: v ? v + "px" : null
            }), val(this._text, n), show(this.el)
        }), t.prototype.hide = function(e) {
            function t() {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function() {
            hide(this.el)
        }), t
    }(a.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.TimelineSlider = void 0;
    var a = i(29),
        l = i(2),
        u = n(l);
    t.TimelineSlider = function(e) {
        function t(i, n, s) {
            r(this, t);
            var a, l = o(this, e.call(this, i, {
                mousemove: function(e) {
                    l.showPreviewAt(e)
                },
                mouseout: function(e) {
                    l.preview.hide(), l.tooltip.hide()
                },
                dragStart: function(e, t) {
                    l.player.trigger(u.UI_SEEKSTART), t || l.player.seekToPercent(e), l.showPreviewAt(e), a = e
                },
                drag: function(e) {
                    var t = e * l.player.getDuration();
                    l.controls.updateTime(t), l.showPreviewAt(e)
                },
                dragEnd: function(e) {
                    l.player.trigger(u.UI_SEEKEND), e != a ? l.player.seekToPercent(e) : l.controls.updateTime(l.player.curTime()), l.preview.hide(), l.tooltip.hide()
                }
            }));
            return l.controls = n, l.preview = s, addClass(l.el, "videoplayer_timeline_slider"), l.updateAria(), l
        }
        return s(t, e), t.prototype.updateAria = function() {
            var e = this;
            this.initAria({
                label: this.getLang("aria_timeline_slider"),
                valuemin: 0,
                valuemax: this.player.getDuration(),
                valuetext: function(t, i, n) {
                    return e.getLang("aria_timeline_value", {
                        time: formatTime(t, !0),
                        duration: formatTime(n, !0)
                    })
                }
            })
        }, t.prototype.showPreviewAt = function(e) {
            if (this.player.isInited()) {
                var t = formatTime(this.player.getDuration() * e);
                this.getVar("timeline_thumbs") ? this.preview.show({
                    sliderEl: this.el,
                    progress: e,
                    text: t
                }) : this.tooltip.show({
                    el: this.el,
                    text: t,
                    offsetXpercent: e,
                    offsetY: 16
                })
            }
        }, t
    }(a.Slider)
}, function(e, t, i) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.Tooltip = void 0;
    var s = i(1),
        a = 10,
        l = 6,
        u = 3e3;
    t.Tooltip = function(e) {
        function t(i) {
            n(this, t);
            var o = r(this, e.call(this, i));
            return o.el = se('\n<div class="videoplayer_tooltip">\n  <div class="_text"></div>\n  <div class="_arrow"></div>\n</div>\n    '), o._text = domByClass(o.el, "_text"), o._arrow = domByClass(o.el, "_arrow"), o
        }
        return o(t, e), t.prototype.show = function(e) {
            function t(t) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e) {
            var t = e.el,
                i = e.text,
                n = e.toDown,
                r = void 0 === n ? !1 : n,
                o = e.offsetXpercent,
                s = void 0 === o ? .5 : o,
                h = e.offsetY,
                d = void 0 === h ? 9 : h;
            if (i = isFunction(i) ? i() : i) {
                show(this.el), val(this._text, i);
                var c, p = this.player.el.getBoundingClientRect(),
                    y = t.getBoundingClientRect(),
                    f = this.el.getBoundingClientRect(),
                    v = y.left - p.left + Math.round(y.width * s) - Math.round(f.width / 2),
                    g = (r ? y.bottom : y.top) - p.top - (r ? 0 : f.height) + d * (r ? 1 : -1);
                a > v ? (c = v - a - l, v = a) : v + f.width > p.width - a && (c = v + f.width - (p.width - a) - l, v = p.width - f.width - a), setStyle(this.el, {
                    left: v + "px",
                    top: g + "px"
                }), setStyle(this._arrow, {
                    marginLeft: c ? c + "px" : null
                }), toggleClass(this._arrow, "_arrow_up", r), clearTimeout(this._hideDelayedTimeout), clearTimeout(this._hideTimeout), this._hideTimeout = setTimeout(this.hide.bind(this), u)
            }
        }), t.prototype.hide = function(e) {
            function t() {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function() {
            hide(this.el), this.lastShown = vkNow()
        }), t.prototype.hideWithDelay = function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            this._hideDelayedTimeout = setTimeout(this.hide.bind(this), e)
        }, t.prototype.isVisible = function(e) {
            function t() {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function() {
            return isVisible(this.el)
        }), t.prototype.destroy = function() {
            e.prototype.destroy.call(this), this._hideTimeout && clearTimeout(this._hideTimeout)
        }, t
    }(s.PlayerComponent)
}, function(e, t, i) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.VolumeSlider = void 0;
    var s = i(29);
    t.VolumeSlider = function(e) {
        function t(i) {
            n(this, t);
            var o = function(e) {
                    s.player.setVolume(e), s.vertical || s.tooltip.show({
                        el: s.el,
                        text: Math.round(100 * e) + "%",
                        offsetXpercent: e,
                        offsetY: 16
                    })
                },
                s = r(this, e.call(this, i, {
                    dragStart: o,
                    drag: o,
                    dragEnd: function(e) {
                        s.tooltip.hide()
                    }
                }));
            return addClass(s.el, "videoplayer_volume_slider"), s.initAria({
                label: s.getLang("aria_volume_slider"),
                valuemin: 0,
                valuemax: 100,
                valuetext: function(e, t, i) {
                    var n = Math.round(100 * s.player.getVolume()) + "%";
                    return s.player.isMuted() && (n += " (" + s.getLang("aria_volume_muted") + ")"), n
                }
            }), s
        }
        return o(t, e), t
    }(s.Slider)
}, function(e, t, i) {
    i(80), i(79), e.exports = i(18).Symbol
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, i) {
    var n = i(8),
        r = i(78),
        o = i(77);
    e.exports = function(e) {
        return function(t, i, s) {
            var a, l = n(t),
                u = r(l.length),
                h = o(s, u);
            if (e && i != i) {
                for (; u > h;)
                    if (a = l[h++], a != a) return !0
            } else
                for (; u > h; h++)
                    if ((e || h in l) && l[h] === i) return e || h;
            return !e && -1
        }
    }
}, function(e, t, i) {
    var n = i(59);
    e.exports = function(e, t, i) {
        if (n(e), void 0 === t) return e;
        switch (i) {
            case 1:
                return function(i) {
                    return e.call(t, i)
                };
            case 2:
                return function(i, n) {
                    return e.call(t, i, n)
                };
            case 3:
                return function(i, n, r) {
                    return e.call(t, i, n, r)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t, i) {
    var n = i(21),
        r = i(34),
        o = i(22);
    e.exports = function(e) {
        var t = n(e),
            i = r.f;
        if (i)
            for (var s, a = i(e), l = o.f, u = 0; a.length > u;) l.call(e, s = a[u++]) && t.push(s);
        return t
    }
}, function(e, t, i) {
    var n = i(7),
        r = i(18),
        o = i(61),
        s = i(20),
        a = "prototype",
        l = function(e, t, i) {
            var u, h, d, c = e & l.F,
                p = e & l.G,
                y = e & l.S,
                f = e & l.P,
                v = e & l.B,
                g = e & l.W,
                m = p ? r : r[t] || (r[t] = {}),
                _ = m[a],
                b = p ? n : y ? n[t] : (n[t] || {})[a];
            p && (i = t);
            for (u in i) h = !c && b && void 0 !== b[u], h && u in m || (d = h ? b[u] : i[u], m[u] = p && "function" != typeof b[u] ? i[u] : v && h ? o(d, n) : g && b[u] == d ? function(e) {
                var t = function(t, i, n) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, i)
                        }
                        return new e(t, i, n)
                    }
                    return e.apply(this, arguments)
                };
                return t[a] = e[a], t
            }(d) : f && "function" == typeof d ? o(Function.call, d) : d, f && ((m.virtual || (m.virtual = {}))[u] = d, e & l.R && _ && !_[u] && s(_, u, d)))
        };
    l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, e.exports = l
}, function(e, t, i) {
    e.exports = i(7).document && document.documentElement
}, function(e, t, i) {
    var n = i(30);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t, i) {
    var n = i(30);
    e.exports = Array.isArray || function(e) {
        return "Array" == n(e)
    }
}, function(e, t, i) {
    var n = i(21),
        r = i(8);
    e.exports = function(e, t) {
        for (var i, o = r(e), s = n(o), a = s.length, l = 0; a > l;)
            if (o[i = s[l++]] === t) return i
    }
}, function(e, t) {
    e.exports = !0
}, function(e, t, i) {
    var n = i(16)("meta"),
        r = i(15),
        o = i(9),
        s = i(10).f,
        a = 0,
        l = Object.isExtensible || function() {
            return !0
        },
        u = !i(14)(function() {
            return l(Object.preventExtensions({}))
        }),
        h = function(e) {
            s(e, n, {
                value: {
                    i: "O" + ++a,
                    w: {}
                }
            })
        },
        d = function(e, t) {
            if (!r(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!o(e, n)) {
                if (!l(e)) return "F";
                if (!t) return "E";
                h(e)
            }
            return e[n].i
        },
        c = function(e, t) {
            if (!o(e, n)) {
                if (!l(e)) return !0;
                if (!t) return !1;
                h(e)
            }
            return e[n].w
        },
        p = function(e) {
            return u && y.NEED && l(e) && !o(e, n) && h(e), e
        },
        y = e.exports = {
            KEY: n,
            NEED: !1,
            fastKey: d,
            getWeak: c,
            onFreeze: p
        }
}, function(e, t, i) {
    var n = i(13),
        r = i(72),
        o = i(19),
        s = i(36)("IE_PROTO"),
        a = function() {},
        l = "prototype",
        u = function() {
            var e, t = i(31)("iframe"),
                n = o.length,
                r = ">";
            for (t.style.display = "none", i(65).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + r), e.close(), u = e.F; n--;) delete u[l][o[n]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var i;
        return null !== e ? (a[l] = n(e), i = new a, a[l] = null, i[s] = e) : i = u(), void 0 === t ? i : r(i, t)
    }
}, function(e, t, i) {
    var n = i(10),
        r = i(13),
        o = i(21);
    e.exports = i(6) ? Object.defineProperties : function(e, t) {
        r(e);
        for (var i, s = o(t), a = s.length, l = 0; a > l;) n.f(e, i = s[l++], t[i]);
        return e
    }
}, function(e, t, i) {
    var n = i(22),
        r = i(23),
        o = i(8),
        s = i(25),
        a = i(9),
        l = i(32),
        u = Object.getOwnPropertyDescriptor;
    t.f = i(6) ? u : function(e, t) {
        if (e = o(e), t = s(t, !0), l) try {
            return u(e, t)
        } catch (i) {}
        return a(e, t) ? r(!n.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, i) {
    var n = i(8),
        r = i(33).f,
        o = {}.toString,
        s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        a = function(e) {
            try {
                return r(e)
            } catch (t) {
                return s.slice()
            }
        };
    e.exports.f = function(e) {
        return s && "[object Window]" == o.call(e) ? a(e) : r(n(e))
    }
}, function(e, t, i) {
    e.exports = i(20)
}, function(e, t, i) {
    var n = i(10).f,
        r = i(9),
        o = i(38)("toStringTag");
    e.exports = function(e, t, i) {
        e && !r(e = i ? e : e.prototype, o) && n(e, o, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, i) {
    var n = i(37),
        r = Math.max,
        o = Math.min;
    e.exports = function(e, t) {
        return e = n(e), 0 > e ? r(e + t, 0) : o(e, t)
    }
}, function(e, t, i) {
    var n = i(37),
        r = Math.min;
    e.exports = function(e) {
        return e > 0 ? r(n(e), 9007199254740991) : 0
    }
}, function(e, t) {}, function(e, t, i) {
    "use strict";
    var n = i(7),
        r = i(18),
        o = i(9),
        s = i(6),
        a = i(64),
        l = i(75),
        u = i(70).KEY,
        h = i(14),
        d = i(24),
        c = i(76),
        p = i(16),
        y = i(38),
        f = i(68),
        v = i(63),
        g = i(67),
        m = i(13),
        _ = i(8),
        b = i(25),
        S = i(23),
        E = i(71),
        L = i(74),
        w = i(73),
        T = i(10),
        C = w.f,
        A = T.f,
        k = L.f,
        P = n.Symbol,
        I = n.JSON,
        x = I && I.stringify,
        D = !1,
        M = "prototype",
        O = y("_hidden"),
        V = y("toPrimitive"),
        R = {}.propertyIsEnumerable,
        F = d("symbol-registry"),
        N = d("symbols"),
        B = Object[M],
        U = "function" == typeof P,
        H = n.QObject,
        j = s && h(function() {
            return 7 != E(A({}, "a", {
                get: function() {
                    return A(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }) ? function(e, t, i) {
            var n = C(B, t);
            n && delete B[t], A(e, t, i), n && e !== B && A(B, t, n)
        } : A,
        z = function(e) {
            var t = N[e] = E(P[M]);
            return t._k = e, s && D && j(B, e, {
                configurable: !0,
                set: function(t) {
                    o(this, O) && o(this[O], e) && (this[O][e] = !1), j(this, e, S(1, t))
                }
            }), t
        },
        Q = U && "symbol" == typeof P.iterator ? function(e) {
            return "symbol" == typeof e
        } : function(e) {
            return e instanceof P
        },
        q = function(e, t, i) {
            return m(e), t = b(t, !0), m(i), o(N, t) ? (i.enumerable ? (o(e, O) && e[O][t] && (e[O][t] = !1), i = E(i, {
                enumerable: S(0, !1)
            })) : (o(e, O) || A(e, O, S(1, {})), e[O][t] = !0), j(e, t, i)) : A(e, t, i)
        },
        G = function(e, t) {
            m(e);
            for (var i, n = v(t = _(t)), r = 0, o = n.length; o > r;) q(e, i = n[r++], t[i]);
            return e
        },
        W = function(e, t) {
            return void 0 === t ? E(e) : G(E(e), t)
        },
        Y = function(e) {
            var t = R.call(this, e = b(e, !0));
            return t || !o(this, e) || !o(N, e) || o(this, O) && this[O][e] ? t : !0
        },
        K = function(e, t) {
            var i = C(e = _(e), t = b(t, !0));
            return !i || !o(N, t) || o(e, O) && e[O][t] || (i.enumerable = !0), i
        },
        X = function(e) {
            for (var t, i = k(_(e)), n = [], r = 0; i.length > r;) o(N, t = i[r++]) || t == O || t == u || n.push(t);
            return n
        },
        J = function(e) {
            for (var t, i = k(_(e)), n = [], r = 0; i.length > r;) o(N, t = i[r++]) && n.push(N[t]);
            return n
        },
        $ = function(e) {
            if (void 0 !== e && !Q(e)) {
                for (var t, i, n = [e], r = 1; arguments.length > r;) n.push(arguments[r++]);
                return t = n[1], "function" == typeof t && (i = t), (i || !g(t)) && (t = function(e, t) {
                    return i && (t = i.call(this, e, t)), Q(t) ? void 0 : t
                }), n[1] = t, x.apply(I, n)
            }
        },
        Z = h(function() {
            var e = P();
            return "[null]" != x([e]) || "{}" != x({
                a: e
            }) || "{}" != x(Object(e))
        });
    U || (P = function() {
        if (this instanceof P) throw TypeError("Symbol is not a constructor!");
        return z(p(arguments.length > 0 ? arguments[0] : void 0))
    }, l(P[M], "toString", function() {
        return this._k
    }), w.f = K, T.f = q, i(33).f = L.f = X, i(22).f = Y, i(34).f = J, s && !i(69) && l(B, "propertyIsEnumerable", Y, !0)), a(a.G + a.W + a.F * !U, {
        Symbol: P
    });
    for (var ee = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), te = 0; ee.length > te;) {
        var ie = ee[te++],
            ne = r.Symbol,
            re = y(ie);
        ie in ne || A(ne, ie, {
            value: U ? re : z(re)
        })
    }
    H && H[M] && H[M].findChild || (D = !0), a(a.S + a.F * !U, "Symbol", {
        "for": function(e) {
            return o(F, e += "") ? F[e] : F[e] = P(e)
        },
        keyFor: function(e) {
            if (Q(e)) return f(F, e);
            throw TypeError(e + " is not a symbol!")
        },
        useSetter: function() {
            D = !0
        },
        useSimple: function() {
            D = !1
        }
    }), a(a.S + a.F * !U, "Object", {
        create: W,
        defineProperty: q,
        defineProperties: G,
        getOwnPropertyDescriptor: K,
        getOwnPropertyNames: X,
        getOwnPropertySymbols: J
    }), I && a(a.S + a.F * (!U || Z), "JSON", {
        stringify: $
    }), P[M][V] || i(20)(P[M], V, P[M].valueOf), c(P, "Symbol"), c(Math, "Math", !0), c(n.JSON, "JSON", !0)
}]);