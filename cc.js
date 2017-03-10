/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 883568819
    Link: https://vk.com/js/al/cc.js?883568819
    Last Update: 10.2.117
*/
var CC = {
    DUCK_ID: 733,
    ZING_COLORS: 5,
    prepare: function(u) {
        function n() {
            CC.pauseSound(), CC.hideDucks(), delete cur.soundCC
        }
        if (736 != u || cur.zingImgs) {
            if (cur.soundCC = cur.soundCC || {}, cur.soundCC[u]) return;
            var i = !1,
                e = curBox();
            window.Sound ? 830 == u || 831 == u ? (i = cur.soundCC[u] = new Sound("mp3/cc_gift_sound_2017"), statlogsValueEvent("gifts_play", 1, "song", u)) : 675 == u || 747 == u ? (i = cur.soundCC[u] = new Sound("mp3/cc_gift_sound_2016"), statlogsValueEvent("gifts_play", 1, "song", u)) : -1 !== [728, 729, 730].indexOf(u) ? i = cur.soundCC[u] = new Sound("mp3/calendar") : u == CC.DUCK_ID && (i = cur.soundCC[u] = {
                m: new Sound("mp3/duck_gift_sound_m"),
                s: new Sound("mp3/duck_gift_sound_s")
            }, vkImage().src = "/images/gift/" + CC.DUCK_ID + "/t_256.png?2") : i = cur.soundCC[u] = {
                play: function() {},
                pause: function() {}
            }, cur.destroy.push(n), e && e.setOptions({
                onHide: n
            })
        } else {
            cur.zingImgs = [];
            for (var s = 0; s < CC.ZING_COLORS; s++) {
                var C = vkImage();
                C.src = "/images/gift/736/c" + (s + 1) + ".jpg?1", C.width = C.height = 256, cur.zingImgs.push(C)
            }
        }
    },
    toggle: function(u, n) {
        if (CC.prepare(n), 736 != n || cur.zingImgs.length != CC.ZING_COLORS || hasClass(domPN(u), "fc_msg_media")) {
            if (-1 !== [675, 728, 729, 730, 747, 830, 831].indexOf(n)) cur.playingCC ? CC.pauseSound() : CC.playSound(cur.soundCC[n]);
            else if (n == CC.DUCK_ID) {
                if (CC.pauseSound(), clearTimeout(cur.duckTO), cur.giftDuckClick = cur.giftDuckClick || 0, 2 == cur.giftDuckClick) return void(cur.giftDuckClick = 0);
                0 == cur.giftDuckClick && CC.playSound(cur.soundCC[n].s), 1 == cur.giftDuckClick && (removeClass(u, "gift_duck_tease"), CC.playSound(cur.soundCC[n].m), cur.duckTO = setTimeout(function() {
                    var n = 3,
                        i = domPN(u);
                    ducks = '<div class="gift_duck_wrap gift_duck_act" onclick="return CC.hideDucks(true);">';
                    for (var e = 0; n > e; e++) {
                        var s = "top:" + (120 * Math.random() - 85 - 256 * e) + "px; left: " + (150 * Math.random() - 75) + "px",
                            C = 10 * Math.random() - 5,
                            c = "transform: rotateZ(" + C + "deg);-webkit-transform: rotateZ(" + C + "deg);";
                        ducks += '<div style="' + s + '" class="gift_duck_clone"><img style="' + c + '" src="/images/gift/' + CC.DUCK_ID + '/t_256.png?2"></div>'
                    }
                    ducks += "</div>", ducks = se(ducks), i.appendChild(ducks), setStyle(i, {
                        overflow: "visible",
                        position: "relative"
                    })
                }, browser.safari ? 300 : 0)), cur.giftDuckClick++
            }
        } else data(u, "zing_inited") || (each(cur.zingImgs, function() {
            var n = this.cloneNode();
            u.appendChild(n), addClass(n, "gift_zing")
        }), data(u, "zing_inited", 1)), setTimeout(function() {
            var n = data(u, "zing_index") || 0,
                i = geByClass("gift_zing", u);
            n == cur.zingImgs.length && (n = 0, each(i, function(u) {
                u > 0 && removeClass(this, "zing_shown")
            })), addClass(i[n], "zing_shown"), data(u, "zing_index", n + 1)
        });
        if (-1 !== [728, 729, 730].indexOf(n)) {
            var i = domPN(u);
            !hasClass(i, "gift_rot") && addClass(i, "gift_rot")
        }
        return !1
    },
    toggleSound: function(u, n) {
        u instanceof window.Sound ? n ? u.play() : u.pause() : each(u, function(u, i) {
            n ? i.play() : i.pause()
        }), cur.playingCC = n
    },
    pauseSound: function() {
        cur.soundCC && each(cur.soundCC, function(u, n) {
            CC.toggleSound(n, !1)
        })
    },
    playSound: function(u) {
        CC.toggleSound(u, !0)
    },
    hideDucks: function(u) {
        re(geByClass1("gift_duck_wrap")), u && (CC.pauseSound(), CC.toggle(!1, CC.DUCK_ID)), cur.soundCC && delete cur.soundCC[CC.DUCK_ID], u && CC.prepare(CC.DUCK_ID)
    },
    eof: 1
};
try {
    stManager.done("cc.js")
} catch (e) {}