/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 4217435992
    Link: https://vk.com/js/al/call.js?4217435992
    Last Update: 10.2.117
*/
function videochatCallback(a) {
    var l = a.shift();
    return Call && Call.callbacks ? (Call.callbacks[l] || Call.defaultCallbacks[l] || setTimeout(function() {}, 0), setTimeout(function() {
        return Call.callbacks[l] ? Call.callbacks[l].apply(Call, a) : Call.defaultCallbacks[l] ? Call.defaultCallbacks[l].apply(Call, a) : void 0
    }, 0), !0) : !0
}
window._iconAdd || (window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "");
var Call = {
    invitation: null,
    videochat: null,
    params: {},
    initiated: !1,
    width: 480,
    log: "",
    playRing: function() {
        window.ls && ls.get("videocall_sound") && ls.get("videocall_sound") + 6e3 > (new Date).getTime() || (window.ls && ls.set("videocall_sound", (new Date).getTime()), Call.sound || (window.Sound ? Call.sound = new Sound("mp3/call") : Call.sound = {
            play: function() {},
            pause: function() {}
        }), Call.sound.play(), Call.ringTimer = setInterval(function() {
            Call.sound && (Call.sound.play(), window.ls && ls.set("videocall_sound", (new Date).getTime()))
        }, 5e3))
    },
    stopRing: function() {
        window.ls && ls.remove("videocall_sound"), clearInterval(Call.ringTimer), Call.sound && (Call.sound.pause(), Call.sound = !1)
    },
    baseVideoBox: function(a, l, e) {
        return browser.flash < 10 || 10 == browser.flash && browser.flashfull.minor < 1 ? (ge(a).innerHTML = '<div class="flash_needed"><div>' + getLang("calls_install_flash_text").replace("{link}", '<a href="http://get.adobe.com/flashplayer/">').replace("{/link}", "</a>") + '</div><div class="button_blue"><button id="videocalls_need_flash">' + getLang("calls_install_flash_player") + "</button></div></div>", ge("videocalls_need_flash").onclick = function() {
            location.href = "http://get.adobe.com/flashplayer/"
        }, !1) : (renderFlash(ge(a), extend({
            url: "/swf/vkvideochat.swf",
            id: a + "_pl",
            width: 480,
            height: 360,
            preventhide: 1,
            bgcolor: "#000000",
            version: 10
        }, l || {}), {
            allowFullScreen: !0,
            allowscriptaccess: "always",
            allownetworking: "all",
            wmode: "opaque"
        }, extend(e || {}, {
            lang_calls_allow_access: getLang("calls_allow_access"),
            lang_calls_no_popup: getLang("calls_no_popup"),
            lang_calls_no_video: getLang("calls_no_video"),
            lang_calls_outgoing_waiting: getLang("calls_outgoing_waiting"),
            lang_calls_tooltip_microphone_on: getLang("calls_tooltip_microphone_on"),
            lang_calls_tooltip_microphone_off: getLang("calls_tooltip_microphone_off"),
            lang_calls_tooltip_camera_on: getLang("calls_tooltip_camera_on"),
            lang_calls_tooltip_camera_off: getLang("calls_tooltip_camera_off"),
            lang_calls_tooltip_volume_on: getLang("calls_tooltip_volume_on"),
            lang_calls_tooltip_volume_off: getLang("calls_tooltip_volume_off"),
            lang_calls_tooltip_fullscreen_on: getLang("calls_tooltip_fullscreen_on"),
            lang_calls_tooltip_fullscreen_off: getLang("calls_tooltip_fullscreen_off"),
            lang_calls_no_devices: getLang("calls_no_devices"),
            lang_calls_microphone_inactive: getLang("calls_microphone_inactive"),
            lang_calls_camera_inactive: getLang("calls_camera_inactive")
        })), ge(a + "_pl"))
    },
    incomingBox: function(a, l, e, t, i, n, o, r, c, s, d) {
        Call.debug("incoming call " + e + " from " + t + ", prefer " + d);
        var C = se('<div>    <div class="call_invitation_wrap clear_fix">      <div class="call_title noselect">' + getLang("calls_invitation_title") + '</div>      <div class="call_text noselect">' + a + '</div>      <div class="call_user_pic"><img src="' + l + '" /></div>      <div class="call_buttons">        <div class="button_green"><button onclick="Call.incomingReply(' + e + ", " + t + ", '" + i + "', '" + o + "', '" + r + "', '" + c + "', '" + s + "', '" + d + "', Call.enableCamera)\">" + getLang("calls_reply") + '</button></div>        <div class="button_red"><button onclick="Call.incomingReject(3,' + e + "," + t + "," + t + ",'" + o + "');\">" + getLang("calls_reject") + '</button></div>        <button class="hover_button" onclick="Call.incomingToggleCam(this);"><div class="call_camera_btn"></div>' + getLang("calls_camera_on") + "</button>      </div>    </div></div>"),
            p = geByClass1("call_invitation_wrap", C, "div"),
            m = {
                movable: p,
                startLeft: parseInt((window.innerWidth - 244) / 2) + "px",
                startTop: parseInt((window.innerHeight - 404) / 2) + "px",
                startWidth: 244,
                startHeight: 404,
                resize: !1,
                onBeforeHide: function() {
                    Call.incomingReject(0, e, t, t, o)
                },
                onDragEnd: function(a, l) {},
                onResize: function(a, l) {}
            };
        Call.invitation = new RBox(C, m), Call.doShowChat(t, !1, !1)
    },
    calcBoxPos: function() {
        var a = window,
            l = document.documentElement,
            e = {
                dw: Math.max(intval(a.innerWidth), intval(l.clientWidth)),
                dh: Math.max(intval(a.innerHeight), intval(l.clientHeight)),
                w: Call.width,
                h: 454 + (vk.id < 1e7 ? 37 : 0)
            };
        return e.x = parseInt((e.dw - Call.width) / 2), e.y = parseInt((e.dh - 454) / 2), e
    },
    videochatBox: function(a) {
        var l = Call.calcBoxPos(),
            e = defBox({
                title: getLang("calls_alpha_version") + '</div><div class="fc_tab_title noselect">' + a,
                x: l.x + "px",
                y: l.y + "px",
                resize: !0,
                width: Call.width,
                minW: 320,
                minH: l.h,
                subClass: "calls_rb",
                onResize: function(a, l) {
                    Call.videochat && (Call.videochat.width = l - 20, Call.videochat.height = a - 94), Call.resizeToggleChat(a, l)
                },
                onBeforeHide: function() {
                    return Call.endCall(!0, 0), !0
                },
                innerHTML: '<div id="call_wrap" class="call_wrap clear_fix">      <div id="call_videochat"></div><div id="chat_toggle_btn" class="hover_button fl_r call_open_chat" onclick="Call.toggleChat(event)"><img class="call_chat_toggle_img" align="middle" src="/images/icons/call_chat_toggle.png" />      <span id="call_chat_toggle">' + getLang("calls_open_chat") + '</span></div>      <div id="call_cancel" class="call_cancel">        <div class="button_red"><button onclick="Call.endCall(true, 0)">' + getLang("calls_finish") + "</button></div>      </div>    </div>"
            }, function() {});
        if (Call.chatToggleBtn = ge("chat_toggle_btn"), Call.chatToggleLabel = ge("call_chat_toggle"), curFastChat && curFastChat.tabs && curFastChat.tabs[Call.params.far_uid]) {
            var l = getSize(Call.chatToggleLabel);
            setStyle(Call.chatToggleLabel, {
                width: l[0] + "px"
            }), Call.chatToggleLabel.innerHTML = getLang("calls_hide_chat"), addClass(Call.chatToggleBtn, "call_chat_sel")
        }
        var t = geByClass1("fc_tab_head", e.content, "div"),
            i = geByClass1("fc_tab_title", t, "div");
        setStyle(i, {
            color: "#FFFFFF",
            fontSize: "11px"
        }), addClass(i, "fl_r");
        var n = geByClass1("fc_clist_inner", e.content, "div");
        return browser.msie || setStyle(n, "background", "rgba(0, 0, 0, 0.8);"), e
    },
    resizeToggleChat: function(a, l) {
        470 > l ? addClass(Call.chatToggleBtn, "call_only_icon") : removeClass(Call.chatToggleBtn, "call_only_icon"), setStyle(Call.chatToggleBtn, {
            width: Math.floor((l - 192 - 95) / 2)
        })
    },
    hideChat: function(a) {
        var a = Call.chatToggleBtn;
        if (a) {
            if (curFastChat) {
                var l = curFastChat.tabs[Call.params.far_uid];
                l && l.box.close()
            }
            removeClass(a, "call_chat_sel"), ge("call_chat_toggle").innerHTML = getLang("calls_open_chat")
        }
    },
    showChat: function(a, l) {
        var e = Call.chatToggleBtn;
        e && (!hasClass(e, "call_chat_sel") || a) && Call.doShowChat(Call.params.far_uid, e, l)
    },
    doShowChat: function(a, l, e, t) {
        stManager.add(["notifier.js", "notifier.css"], function() {
            var t = {};
            if (l) {
                var i = getSize(Call.chatToggleLabel);
                setStyle(Call.chatToggleLabel, {
                    width: i[0] + "px"
                }), addClass(l, "call_chat_sel"), Call.chatToggleLabel.innerHTML = getLang("calls_hide_chat"), t.beforeClose = function() {
                    l && removeClass(l, "call_chat_sel"), Call.chatToggleLabel.innerHTML = getLang("calls_open_chat")
                }
            }
            Call.box && (t.startLeft = Call.box.pos[1] + Call.box.pos[3] + 10, t.startTop = Math.abs(Call.box.pos[0] + Call.box.pos[2] - 319)), FastChat.selectPeer(a, e, t)
        })
    },
    toggleChat: function(a) {
        hasClass(Call.chatToggleBtn, "call_chat_sel") ? Call.hideChat() : Call.showChat(!0, a)
    },
    init: function() {
        if (!Call.initiated) {
            Call.initiated = !0;
            var a = window.Notifier;
            a && (a.addRecvClbk("videocall_reject", "videocall", Call.dismissInvitation), a.addRecvClbk("videocall_accept", "videocall", Call.dismissInvitation)), Call.stopRing()
        }
    },
    doneMsg: function(a) {
        showDoneBox(getLang(a), {
            out: 4e3
        })
    },
    incomingToggleCam: function(a) {
        Call.enableCamera = Call.enableCamera ? 0 : 1, a.innerHTML = Call.enableCamera ? '<div class="call_camera_btn"></div>' + getLang("calls_camera_on") : '<img src="/images/icons/videocall_off.png">' + getLang("calls_camera_off")
    },
    incomingReceive: function(a) {
        if (Call.init(), Call.invitation || Call.box) return void(Call.params.far_uid == a.author_id && vk.id < a.author_id ? (Call.debug("simultaneous invitations, instant reply"), Call.endCall(), Call.incomingReply(a.custom.call_id, a.author_id, a.custom.near_id, a.custom.hash, a.custom.stream, a.custom.rtmp, a.custom.rtmfp, a.custom.prefer)) : (Call.debug("incoming call declined, busy"), Call.incomingReject(1, a.custom.call_id, a.author_id, a.author_id, a.custom.hash)));
        if (browser.flash < 10 || 10 == browser.flash && browser.flashfull.minor < 1) return void Call.debug("old fp, can not respond now, ignoring");
        if (Call.devices) Call.devices > 0 && Call.incomingDoReceive(a.custom.call_id, a.author_id, a.custom.near_id, a.custom.rtmp_hash, a.custom.hash, a.custom.stream, a.custom.rtmp, a.custom.rtmfp, a.custom.prefer, a.custom.video);
        else {
            var l = ce("div", {
                id: "vchatdevices_swf"
            });
            utilsNode.appendChild(l), window.__vchatDevicesCB = function(l, e) {
                Call.devices = l > 0 || e > 0 ? 1 : -1, Call.devices > 0 && Call.incomingDoReceive(a.custom.call_id, a.author_id, a.custom.near_id, a.custom.rtmp_hash, a.custom.hash, a.custom.stream, a.custom.rtmp, a.custom.rtmfp, a.custom.prefer, a.custom.video)
            }, renderFlash(l, {
                url: "swf/vchatdevices.swf",
                id: "vchatdevices_pl",
                width: 1,
                height: 1,
                bgcolor: "#FFFFFF",
                version: 10
            }, {
                allowscriptaccess: "always",
                allownetworking: "all",
                wmode: "opaque"
            }, {})
        }
    },
    incomingDoReceive: function(a, l, e, t, i, n, o, r, c, s) {
        ajax.post("call.php", {
            act: "received",
            call_id: a,
            uid: l,
            hash: i
        }, {
            onDone: function(d, C, p) {
                d && (Call.videocallActive(!0), window.langpack = extend(window.langpack || {}, d), Call.enableCamera = 1, Call.incomingBox(C, p, a, l, e, t, i, n, o, r, c), Call.far_camera = s, Call.invitation_text = stripHTML(C), Call.pingTimeout = setTimeout(Call.noPing, 2e4), cur.titleTO || (cur.titleTO = setInterval(Call.changeTitle, 1e3)), Call.playRing())
            }
        })
    },
    noPing: function() {
        Call.debug("invitation ping timed out"), Call.doneMsg("calls_error_connection"), Call.endCall(!0, -1)
    },
    dismissInvitation: function() {
        clearInterval(Call.pingTimer), clearInterval(Call.shortPollTimer), clearTimeout(Call.pingTimeout), Call.invitation && (Call.invitation.close(), Call.invitation = null), Call.stopRing(), Call.restoreTitle()
    },
    incomingReject: function(a, l, e, t, i) {
        var n = window.Notifier;
        n && n.lcSend("videocall_reject", {}), Call.dismissInvitation(), Call.videocallActive(!1), ajax.post("call.php", {
            act: "reject",
            reason: a,
            call_id: l,
            from_id: e,
            uid: t,
            hash: i
        })
    },
    incomingReply: function(a, l, e, t, i, n, o, r, c) {
        Call.debug("accepting call " + a + " from " + l + ", prefer " + r);
        var s = window.Notifier;
        s && s.lcSend("videocall_accept", {}), Call.dismissInvitation(), setFavIcon("/images/icons/fav_call" + _iconAdd + ".ico"), Call.params = {
            call_id: a,
            from_id: l,
            far_stream: i,
            far_uid: l,
            far_id: e,
            far_prefer: r,
            hash: t,
            video: c,
            audio: 1
        }, Call.box = Call.videochatBox(getLang("calls_incoming_title")), Call.connected = {
            rtmp: "" == n ? 2 : 0,
            rtmfp: "" == o ? 2 : 0
        }, Call.callbacks.onConnectionSuccess = function(a, l) {
            Call.debug(a + " connected, proceed"), Call.connected[a] = 1, "rtmfp" == a && (Call.params.near_id = l), Call.incomingInitialized()
        }, Call.callbacks.onConnectionError = function(a) {
            Call.debug(a + " failed, proceed"), Call.connected[a] = 2, Call.incomingInitialized(), ajax.post("call.php", {
                act: "fail",
                type: "rtmp" == a ? 1 : 2,
                rtmp: Call.rtmpServer,
                rtmp_hash: vk.vc_h
            })
        }, Call.callbacks.onCameraStatus = function(a) {
            Call.debug("camera " + (a ? "muted" : "unmuted") + ", proceed"), Call.params.cameraActive = !a, Call.incomingInitialized()
        }, Call.callbacks.onMicrophoneStatus = function(a) {
            Call.debug("mic " + (a ? "muted" : "unmuted") + ", proceed"), Call.params.microphoneActive = !a, Call.incomingInitialized()
        }, ajax.post("call.php", {
            act: "init",
            incoming: 1
        }, {
            onDone: function(a) {
                vk.vc_h = a, Call.videochat = Call.baseVideoBox("call_videochat", null, {
                    rtmp: n,
                    rtmp_id: vk.id,
                    rtmp_hash: vk.vc_h,
                    rtmfp: o
                }), Call.videochat ? Call.incomingInitialized() : (hide("alpha_testing_disclaimer"), hide("call_cancel"))
            }
        })
    },
    incomingInitialized: function() {
        if (!Call.params.init_complete && ((Call.params.cameraActive || Call.params.microphoneActive) && (Call.toggleMessage("calls_allow_access", !0), Call.toggleMessage("calls_initialization")), Call.connected && (Call.connected.rtmp || Call.connected.rtmfp) && (Call.params.cameraActive || Call.params.microphoneActive) && Call.videochat)) {
            if (Call.connected.rtmp && !Call.connected.rtmfp && !Call.params.waitForRtmfp) return Call.params.waitForRtmfp = 1, void setTimeout(Call.incomingInitialized, 1e3);
            Call.params.init_complete = !0, Call.debug("initialization complete"), Call.callbacks.onConnectionSuccess = function(a, l) {
                Call.debug(a + " connected, proceed"), Call.connected[a] = 1, "rtmfp" == a && (Call.params.near_id = l)
            }, Call.callbacks.onConnectionError = null, Call.callbacks.onCameraStatus = null, Call.callbacks.onMicrophoneStatus = null, Call.videochat && Call.establishConnection(function() {
                Call.debug("answering with " + Call.params.near_prefer + " preferred"), ajax.post("call.php", {
                    act: "reply",
                    call_id: Call.params.call_id,
                    from_id: Call.params.from_id,
                    uid: Call.params.far_uid,
                    near_id: Call.params.near_id,
                    hash: Call.params.hash,
                    prefer: Call.params.near_prefer,
                    video: Call.params.video
                }, {
                    onDone: function(a) {
                        Call.debug("done, incoming call is started"), Call.params.near_stream = a, Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video)), Call.videochat.startCallPlay(Call.params.far_stream, "rtmfp" == Call.params.near_prefer ? Call.params.far_id : "", Call.params.near_prefer), Call.videochat.cameraAvailable(Call.far_camera), Call.toggleMessage("calls_allow_access", !0), Call.toggleMessage("calls_initialization", !0)
                    }
                })
            })
        }
    },
    establishConnection: function(a) {
        if (Call.videochat) {
            if (Call.params.far_prefer && 1 == Call.connected[Call.params.far_prefer]) Call.params.near_prefer = Call.params.far_prefer;
            else if (1 == Call.connected.rtmp) Call.params.near_prefer = "rtmp";
            else {
                if (1 != Call.connected.rtmfp) return Call.params.establishTry = (Call.params.establishTry || 0) + 1, Call.debug("wait to establish"), Call.params.establishTry < 10 ? setTimeout(Call.establishConnection.pbind(a), 1e3) : (Call.debug("unable to establish any connection, terminating"), Call.doneMsg("calls_error_connection"), Call.endCall(!0, -1), !1);
                Call.params.near_prefer = "rtmfp"
            }
            return "rtmfp" != Call.params.near_prefer || Call.params.connected || (Call.peerTimer = setTimeout(function() {
                Call.videochat && (Call.debug("no response for 5 seconds, fallback to rtmp...(2)"), Call.params.near_prefer = "rtmp", Call.connected.rtmfp = 2, Call.establishConnection() && (Call.debug("reconnecting to " + Call.params.near_prefer), Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video)), Call.videochat.startCallPlay(Call.params.far_stream, "rtmfp" == Call.params.near_prefer ? Call.params.far_id : ""), Call.videochat.cameraAvailable(Call.far_camera), ajax.post("call.php", {
                    act: "reconnect",
                    call_id: Call.params.call_id,
                    from_id: Call.params.from_id,
                    uid: Call.params.far_uid,
                    hash: Call.params.hash,
                    prefer: Call.params.near_prefer
                })), ajax.post("call.php", {
                    act: "fail",
                    type: 0
                }))
            }, 5e3)), a && a(), !0
        }
        return !1
    },
    videocallActive: function(a) {
        var l = ge("profile_message_send"),
            e = !1;
        if (a) {
            e = hasClass(l, "profile_msg_split") ? "profile_msg_msg" : "profile_msg_none", hide(boxLoader), hide(boxLayerWrap);
            var t = window.Notifier;
            t && t.lcSend("videocall_start", {})
        } else {
            hasClass(l, "profile_msg_msg") ? e = "profile_msg_split" : hasClass(l, "profile_msg_split") || (e = "profile_msg_call");
            var t = window.Notifier;
            t && t.lcSend("videocall_end", {})
        }
        l && e && (l.className = "profile_action_btn " + e)
    },
    toggleVideo: function() {
        Call.videochat && (Call.params.video = Call.params.video ? 0 : 1, Call.videochat.toggleVideo(Boolean(Call.params.video)))
    },
    toggleAudio: function() {
        Call.videochat && (Call.params.audio = Call.params.audio ? 0 : 1, Call.videochat.toggleAudio(Boolean(Call.params.audio)))
    },
    toggleFullscreen: function() {
        Call.videochat && (Call.params.fullscreen = Call.params.fullscreen ? 0 : 1, Call.videochat.toggleFullscreen(Boolean(Call.params.fullscreen)))
    },
    toggleMute: function() {
        Call.videochat && (Call.params.mute = Call.params.mute ? 0 : 1, Call.videochat.setVolume(Call.params.mute ? 0 : 1))
    },
    changeTitle: function() {
        return Call.invitation ? void(Call.old_title ? (document.title = Call.old_title, Call.old_title = !1, setFavIcon("/images/favicon" + (vk.intnat ? "_vk" : "new") + _iconAdd + ".ico")) : (Call.old_title = document.title.toString(), document.title = Call.invitation_text, setFavIcon("/images/icons/fav_call" + _iconAdd + ".ico"))) : Call.restoreTitle()
    },
    restoreTitle: function() {
        if (Call.old_title) {
            var a = Call.old_title;
            setTimeout(function() {
                document.title = a
            }, 200), setFavIcon("/images/favicon" + (vk.intnat ? "_vk" : "new") + _iconAdd + ".ico"), Call.old_title = !1
        }
        clearInterval(cur.titleTO), cur.titleTO = !1
    },
    sendPing: function(a) {
        ajax.post("call.php", {
            act: "ping",
            call_id: Call.params.call_id,
            from_id: Call.params.from_id,
            uid: Call.params.far_uid,
            near_id: Call.params.near_id,
            prefer: Call.params.near_prefer,
            hash: Call.params.hash,
            fast: a ? 1 : 0
        }, {
            onDone: function(a) {
                if (a && a.length)
                    for (var l in a) Call.processNotify(a[l], !0)
            },
            onFail: function(a) {
                return debugLog(a), !0
            }
        })
    },
    start: function(a, l) {
        Call.debug("started outgoing call to " + a), Call.init(), Call.endCall();
        var e = (ge("videocall_btn") || {}).tt;
        e && e.hide && e.destroy && e.destroy(), Call.videocallActive(!0), setFavIcon("/images/icons/fav_call" + _iconAdd + ".ico"), Call.params = {
            from_id: vk.id,
            far_uid: a,
            video: l,
            audio: 1
        }, Call.box = Call.videochatBox(getLang("calls_outgoing_title")), Call.connected = {
            rtmp: "" == Call.rtmpServer ? 2 : 0,
            rtmfp: "" == Call.rtmfpServer ? 2 : 0
        }, Call.callbacks.onConnectionSuccess = function(a, l) {
            Call.debug(a + " connected, proceed"), Call.connected[a] = 1, "rtmfp" == a && (Call.params.near_id = l), Call.outgoingInitialized()
        }, Call.callbacks.onConnectionError = function(a) {
            Call.debug(a + " failed, proceed"), Call.connected[a] = 2, ajax.post("call.php", {
                act: "fail",
                type: "rtmp" == a ? 1 : 2,
                rtmp: Call.rtmpServer,
                rtmp_hash: vk.vc_h
            }), Call.outgoingInitialized()
        }, Call.callbacks.onCameraStatus = function(a) {
            Call.debug("camera " + (a ? "muted" : "unmuted") + ", proceed"), Call.params.cameraActive = !a, Call.outgoingInitialized()
        }, Call.callbacks.onMicrophoneStatus = function(a) {
            Call.debug("mic " + (a ? "muted" : "unmuted") + ", proceed"), Call.params.microphoneActive = !a, Call.outgoingInitialized()
        }, Call.videochat = Call.baseVideoBox("call_videochat", null, {
            rtmp: Call.rtmpServer,
            rtmp_id: vk.id,
            rtmp_hash: vk.vc_h,
            rtmfp: Call.rtmfpServer
        }), Call.videochat || (hide("alpha_testing_disclaimer"), hide("call_cancel"))
    },
    outgoingInitialized: function() {
        if (!Call.params.init_complete && ((Call.params.cameraActive || Call.params.microphoneActive) && (Call.toggleMessage("calls_allow_access", !0), Call.toggleMessage("calls_initialization")), Call.connected && (Call.connected.rtmp || Call.connected.rtmfp) && (Call.params.cameraActive || Call.params.microphoneActive))) {
            if (Call.connected.rtmp && !Call.connected.rtmfp && !Call.params.waitForRtmfp) return Call.params.waitForRtmfp = 1, void setTimeout(Call.outgoingInitialized, 1e3);
            Call.params.init_complete = !0, Call.debug("initialization complete"), Call.callbacks.onConnectionSuccess = function(a, l) {
                Call.debug(a + " connected, proceed"), Call.connected[a] = 1, "rtmfp" != a || Call.params.near_id || (Call.params.near_id = l)
            }, Call.callbacks.onConnectionError = null, Call.callbacks.onMicrophoneStatus = null, Call.callbacks.onCameraStatus = null, Call.videochat && (Call.params.near_prefer = 1 == Call.connected.rtmfp ? "rtmfp" : "rtmp", Call.debug("calling with " + Call.params.near_prefer + " preferred"), Call.receiveTimeout = setTimeout(function() {
                Call.box && (Call.doneMsg("calls_user_unavailable"), Call.endCall(!0, 2))
            }, 1e4), Call.replyTimeout = setTimeout(function() {
                Call.box && (Call.doneMsg("calls_no_reply"), Call.endCall(!0, 2))
            }, 18e4), ajax.post("call.php", {
                act: "start",
                uid: Call.params.far_uid,
                near_id: Call.params.near_id,
                prefer: Call.params.near_prefer,
                video: Call.params.video
            }, {
                onDone: function(a, l, e, t) {
                    return 0 == a ? (Call.debug("server says other user can not reply to this call..."), Call.doneMsg("calls_user_unavailable"), void Call.endCall()) : (Call.debug("call " + a + " started, publishing"), Call.params = extend(Call.params, {
                        call_id: a,
                        near_stream: l,
                        hash: e
                    }), Call.videochat.setUserPic(t), void Call.startPublish(l))
                }
            }))
        }
    },
    startPublish: function(a) {
        return Call.connected[Call.params.near_prefer] ? (Call.videochat.startCallPublish(a, Call.params.near_prefer, Boolean(Call.params.video)), Call.toggleMessage("calls_allow_access", !0), Call.shortPollTimer = setInterval(Call.sendPing.pbind(!0), 2e3), Call.pingTimer = setInterval(Call.sendPing.pbind(!1), 15e3), Call.sendPing(!0), void(Call.params.far_id && Call.outgoingReplied())) : (setTimeout(Call.startPublish.pbind(a), 1e3), !1)
    },
    outgoingReply: function(a) {
        Call.debug(Call.params.far_uid + " replied with " + a.custom.prefer + " preferred"), Call.params = extend(Call.params, {
            far_id: a.custom.far_id,
            far_prefer: a.custom.prefer,
            far_stream: a.custom.stream
        }), Call.far_camera = a.custom.video, Call.videochat.cameraAvailable(Call.far_camera), Call.params.call_id && Call.outgoingReplied()
    },
    outgoingReplied: function() {
        Call.debug("processing reply"), clearInterval(Call.pingTimer), clearTimeout(Call.pingTimeout), clearTimeout(Call.receiveTimeout), clearTimeout(Call.replyTimeout), Call.videochat.toggleWait(!1), Call.params.far_prefer == Call.params.near_prefer ? ("rtmfp" != Call.params.near_prefer || Call.params.connected || (Call.peerTimer = setTimeout(function() {
            Call.debug("no response for 5 seconds, fallback to rtmp...(1)"), Call.params.near_prefer = "rtmp", Call.connected.rtmfp = 2, Call.establishConnection() && (Call.debug("reconnecting to " + Call.params.near_prefer), Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video)), Call.videochat.startCallPlay(Call.params.far_stream, "rtmfp" == Call.params.near_prefer ? Call.params.far_id : "", Call.params.near_prefer), Call.videochat.cameraAvailable(Call.far_camera), ajax.post("call.php", {
                act: "reconnect",
                call_id: Call.params.call_id,
                from_id: Call.params.from_id,
                uid: Call.params.far_uid,
                hash: Call.params.hash,
                prefer: Call.params.near_prefer
            })), ajax.post("call.php", {
                act: "fail",
                type: 0
            })
        }, 5e3)), Call.videochat.startCallPlay(Call.params.far_stream, "rtmfp" == Call.params.near_prefer ? Call.params.far_id : "", Call.params.near_prefer)) : Call.establishConnection() && (Call.debug("connecting over " + Call.params.near_prefer), Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video)), Call.videochat.startCallPlay(Call.params.far_stream, "rtmfp" == Call.params.near_prefer ? Call.params.far_id : "", Call.params.near_prefer), Call.videochat.cameraAvailable(Call.far_camera))
    },
    doEndCall: function(a, l) {
        if (Call.videocallActive(!1), Call.videochat) {
            try {
                Call.videochat.endCall()
            } catch (e) {
                debugLog("player problems")
            }
            Call.videochat = null
        }
        if (Call.box && (Call.box.close(0, !0), Call.box = null), Call.invitation && (Call.invitation.close(), Call.invitation = null), a && Call.params.call_id && Call.params.far_uid && Call.params.hash) {
            ajax.post("call.php", {
                act: "reject",
                reason: l,
                call_id: Call.params.call_id,
                from_id: Call.params.from_id,
                uid: Call.params.far_uid,
                hash: Call.params.hash
            });
            var t = window.Notifier;
            t && t.lcSend("videocall_reject", Call.params)
        }
        Call.params = {}, Call.stopRing(), Call.restoreTitle(), setFavIcon("/images/favicon" + (vk.intnat ? "_vk" : "new") + _iconAdd + ".ico")
    },
    endCall: function(a, l) {
        clearInterval(Call.pingTimer), clearInterval(Call.shortPollTimer), clearTimeout(Call.pingTimeout), clearTimeout(Call.peerTimer), clearTimeout(Call.receiveTimeout), clearTimeout(Call.replyTimeout), Call.box ? (setStyle(Call.box.wrap, {
            left: -1e3,
            top: -1e3
        }), setTimeout(function() {
            Call.doEndCall(a, l)
        }, 10)) : Call.doEndCall(a, l)
    },
    toggleMessage: function(a, l) {
        Call.videochat && (l ? Call.videochat.hideMessage(a) : Call.videochat.showMessage(a, getLang(a)))
    },
    processNotify: function(a, l) {
        switch (a.custom.code) {
            case "received":
                if (Call.videochat && Call.params.call_id == a.custom.call_id && !Call.params.far_stream) {
                    if (Call.params.received) break;
                    Call.params.received = !0, clearTimeout(Call.receiveTimeout), Call.toggleMessage("calls_initialization", !0), Call.videochat.toggleWait(!0)
                }
                break;
            case "reply":
                if (Call.params.replied) break;
                Call.params.replied = !0, Call.videochat && Call.outgoingReply(a);
                break;
            case "ping":
                clearTimeout(Call.pingTimeout), Call.invitation && (Call.pingTimeout = setTimeout(Call.noPing, 2e4));
                break;
            case "selfreply":
                Call.params && Call.params.call_id || Call.endCall();
                break;
            case "selfhangup":
                Call.endCall();
                break;
            case "hangup":
                if (Call.box || Call.invitation) switch (a.custom.reason) {
                    case -1:
                        Call.doneMsg("calls_error_connection");
                        break;
                    case 1:
                        Call.doneMsg("calls_error_busy");
                        break;
                    case 3:
                        Call.doneMsg("calls_rejected");
                        break;
                    default:
                        Call.doneMsg("calls_hangup")
                }
                Call.endCall();
                break;
            case "reconnect":
                Call.videochat && Call.params.near_prefer != a.custom.prefer && (clearTimeout(Call.peerTimer), Call.params.far_prefer = a.custom.prefer, Call.establishConnection() && (Call.videochat.startCallPublish(Call.params.near_stream, Call.params.near_prefer, Boolean(Call.params.video)), Call.videochat.startCallPlay(Call.params.far_stream, "rtmfp" == Call.params.near_prefer ? Call.params.far_id : "", Call.params.near_prefer)));
                break;
            case "camera":
                l || clearInterval(Call.shortPollTimer), Call.videochat && (Call.videochat.cameraAvailable(a.custom.available), a.custom.available || Call.toggleMessage("calls_connection_troubles", !0)), Call.far_camera = a.custom.available
        }
    },
    debug: function(a) {
        debugLog(a);
        var l = "[" + ((new Date).getTime() - _logTimer) / 1e3 + "] ";
        Call.log += l + a + "\n"
    },
    defaultCallbacks: {
        debugLog: function(a) {
            Call.debug(a)
        },
        onPeerConnect: function() {
            Call.debug("peer connected"), Call.params.connected = !0, clearTimeout(Call.peerTimer)
        },
        onCameraToggle: function(a) {
            Call.params.call_id && Call.params.from_id && Call.params.far_uid && Call.params.hash && ajax.post("call.php", {
                act: "camera",
                available: a ? 1 : 0,
                call_id: Call.params.call_id,
                from_id: Call.params.from_id,
                uid: Call.params.far_uid,
                hash: Call.params.hash
            })
        },
        onSignalChange: function(a) {
            Call.toggleMessage("calls_connection_troubles", a)
        },
        onNeedHelpLink: function() {
            Call.endCall(), nav.go("support")
        }
    },
    callbacks: {
        debugLog: function(a) {
            vk.host && vk.host.length > 20 && debugLog([a])
        }
    },
    eof: 1
};
try {
    stManager.done("call.js")
} catch (e) {}