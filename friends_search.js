/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 3688413939
    Link: https://vk.com/js/al/friends_search.js?3688413939
    Last Update: 10.2.117
*/
var FriendsSearch = {
    submit: function() {
        var e = ge("fsearch_email").value,
            o = ge("fsearch_pass").value;
        return /^.{1,40}@.{1,40}\..{1,4}$/.test(e) ? o ? (cur.inviteBox.showProgress(), ge("fsearch_inviter_form").submit(), void hide("fsearch_error")) : notaBene("fsearch_pass") : notaBene("fsearch_email")
    },
    checkResult: function(e, o, t) {
        if (cur.inviteBox) {
            cur.inviteBox.hideProgress();
            try {
                var r = ge("fsearch_inviter").contentWindow.location;
                r.href, r.hash.replace("#", "")
            } catch (n) {
                debugLog(n.message)
            }
            var i = document.createElement("script");
            i.type = "text/javascript", i.src = "http://" + e + ".vk.com/inviter.php?act=get_friends_list&hash=" + hash + "&skey=" + key + "&mid=" + o + "&vk=" + t + "&back=FriendsSearch.getEmailResult&v=" + Math.floor(1e4 * Math.random()), headNode.appendChild(i)
        }
    },
    getEmailResult: function(e) {
        if (!e || e.error) return FriendsSearch.showError(e.error), !1;
        var o = [];
        for (var t in e.list) o.push(t);
        FriendsSearch.getList(1, o, {
            hash: e.hash
        })
    },
    getList: function(e, o, t) {
        o = o.join("|");
        var r = extend({
            act: "save_friends",
            service: e,
            Ids: o
        }, t);
        ajax.post("al_friends.php", r, {
            onDone: function(e, o) {
                if (1 == o) return curBox().hide(), Friends.section("suggestions", function() {
                    Friends.changeSummary(), nav.setLoc(extend(nav.objLoc, {
                        section: "suggestions"
                    }))
                }, {
                    m: 1
                }), !0;
                var t = ge("fsearch_results");
                t.innerHTML = e, show(t), curBox().hideProgress()
            }
        })
    },
    checkTwitter: function() {
        showBox("al_profileEdit.php", {
            act: "twitter_settings_box",
            import_friends: 1
        }, {
            params: {
                width: 560
            }
        })
    },
    checkOAuth: function(e, o, t) {
        var r = "https://" + location.host + "/friends?act=import_contacts&type=" + t;
        if (1 == t) var n = "https://accounts.google.com/o/oauth2/auth?scope=https://www.google.com/m8/feeds/&response_type=code&redirect_uri=" + encodeURIComponent(r) + "&approval_prompt=force&state=" + o + "&client_id=190525020719-3g15ppddiep5mnjbt0g8vi1kh6v160an.apps.googleusercontent.com&hl=" + e;
        else if (3 == t) var n = "https://graph.facebook.com/v2.7/oauth/authorize?client_id=128749580520227&redirect_uri=" + encodeURIComponent(r) + "&display=popup&state=" + o;
        else if (4 == t) var n = "http://www.odnoklassniki.ru/oauth/authorize?client_id=168388096&scope=VALUABLE+ACCESS&response_type=code&redirect_uri=" + encodeURIComponent(r + "&state=" + o);
        var i = "undefined" != typeof window.screenX ? window.screenX : window.screenLeft,
            s = "undefined" != typeof window.screenY ? window.screenY : window.screenTop,
            a = "undefined" != typeof window.outerWidth ? window.outerWidth : document.body.clientWidth,
            c = "undefined" != typeof window.outerHeight ? window.outerHeight : document.body.clientHeight - 22,
            d = 640,
            h = 450,
            u = parseInt(i + (a - d) / 2, 10),
            p = parseInt(s + (c - h) / 2.5, 10),
            f = "width=" + d + ",height=" + h + ",left=" + u + ",top=" + p,
            l = window.open(n, "google_auth", f);
        cur.importDone || (cur.importDone = {}), cur.importDone[t] = 0;
        var m = setInterval(function() {
            l.closed ? (clearInterval(m), FriendsSearch.checkImportResult()) : cur.importDone[t] && clearInterval(m)
        }, 500)
    },
    importDone: function(e) {
        cur.importDone[e.type] = 1, e.error && setTimeout(showFastBox(getLang("global_error"), e.error).hide, 2e3)
    },
    checkImportResult: function() {
        showBox("al_friends.php", {
            act: "check_contacts_import",
            from: cur.module
        }, {
            dark: 1,
            showProgress: function() {},
            onFail: function() {
                return !0
            },
            onDone: function(e) {
                e.show()
            },
            preOnDone: !0
        })
    },
    checkImportingLoop: function() {
        var e = curBox();
        cur.importingInt = setInterval(function() {
            showBox("al_friends.php", {
                act: "check_contacts_import",
                provider: "twitter",
                from: cur.module
            }, {
                dark: 1,
                showProgress: function() {},
                onFail: function() {
                    return !0
                },
                onDone: function(o) {
                    e.hide(), clearInterval(cur.importingInt), o.show()
                },
                preOnDone: !0
            })
        }, 500)
    },
    showImportTT: function(e) {
        stManager.add(["intro.css"], function() {
            var o = ge("friends_summary");
            showTooltip(o, {
                content: '    <div id="intr_tt_pointer_left"></div>    <div id="intr_tt" style="width: 192px">      <div id="intr_hide" class="fl_r" onclick="ge(\'friends_summary\').tt.hide();" onmouseover="showTooltip(this, {text: \'' + e.hide + '\', black: 1, shift: [14, 4, 0]})"></div>      <div id="intr_header">' + e.header + '</div>      <div id="intr_text">' + e.text + "</div>    </div>",
                slideX: 15,
                className: "profile_intro_side_tt",
                shift: [-454, 0, 0],
                forcetodown: !0,
                nohide: !0,
                nohideover: !0
            })
        })
    },
    showError: function(e) {
        var o = ge("fsearch_error");
        o.innerHTML = e, show(o), curBox().hideProgress()
    },
    addImported: function(e, o, t, r) {
        debugLog("onimport", arguments);
        var n = curBox();
        if (n) return ajax.post("al_friends.php", {
            act: "add_imported",
            hash: r.hash,
            uids: e.join(",")
        }, {
            onDone: function(e) {
                n.hide();
                var o = ge("friends_import_msg");
                o.className = "friends_import_success", o.innerHTML = e, setStyle(o, {
                    backgroundColor: "#F4EBBD"
                }), animate(o, {
                    backgroundColor: "#F9F6E7"
                }, 2e3)
            },
            onFail: function() {
                n.hide();
                var e = ge("friends_import_msg");
                e.className = "friends_import_fail", e.innerHTML = text, setStyle(e, {
                    backgroundColor: "#FACEBB"
                }), animate(e, {
                    backgroundColor: "#FFEFE8"
                }, 2e3)
            },
            showProgress: n.showProgress,
            hideProgress: n.hideProgress
        }), !1
    },
    addCancelled: function(e) {
        return debugLog("why", arguments), ajax.post("al_friends.php", {
            act: "cancel_imported",
            hash: e.hash
        }, {
            onDone: function() {}
        }), !0
    },
    inviteBox: function() {
        return showBox("invite.php", {
            act: "invite_box"
        }, {
            stat: ["ui_controls.js", "selects.js", "ui_controls.css", "invite.js", "invite.css"],
            params: {
                bodyStyle: "padding: 0px;",
                dark: 1
            }
        }), !1
    },
    __eof: 1
};
try {
    stManager.done("friends_search.js")
} catch (e) {}