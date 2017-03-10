/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 284788792
    Link: https://vk.com/js/al/pinbar.js?284788792
    Last Update: 10.2.117
*/
window._iconAdd || (window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : ""), window.initPinBar = function(e, a, t) {
    if (navigator.userAgent.toLowerCase().match(/msie (9|10)(\.?[0-9]*)*/)) {
        window.lang = extend(window.lang || {}, t);
        var n = {
                applicationName: getLang("global_vkontakte"),
                startURL: "/feed",
                shortcutIcon: "/images/icons/pinbar_favicon_vk.ico?100",
                taskIcon: "/images/" + (vk.intnat ? "favicon_vk" : "faviconnew") + _iconAdd + ".ico",
                tasks: [{
                    name: getLang("left_mynews"),
                    action: "/feed"
                }, {
                    name: getLang("left_mymessages"),
                    action: a || "/im"
                }, {
                    name: getLang("left_myfriends"),
                    action: "/friends"
                }, {
                    name: getLang("left_mypage"),
                    action: e || "/al_profile.php"
                }]
            },
            o = {
                meta: function(e, a) {
                    return se('<meta name="' + e + '" content="' + a + '" />')
                },
                link: function(e, a) {
                    return se('<link rel="' + e + '" href="' + a + '" />')
                }
            };
        try {
            var i = window.external;
            bodyNode.onfocus = i.msSiteModeClearIconOverlay(), i.msSiteModeCreateJumpList(getLang("global_vkontakte")), i.msSiteModeClearJumpList();
            for (var c, s = 0; s < n.tasks.length; s++) c = n.tasks[s], i.msSiteModeAddJumpListItem(c.name, c.action, n.taskIcon);
            i.msSiteModeShowJumpList()
        } catch (r) {
            try {
                console.error(r)
            } catch (d) {}
        }
        setFavIcon(n.shortcutIcon, !0);
        try {
            headNode.appendChild(o.meta("application-name", n.applicationName)), headNode.appendChild(o.meta("msapplication-starturl", n.startURL))
        } catch (r) {
            try {
                console.error(r)
            } catch (d) {}
        }
    }
};
try {
    stManager.done("pinbar.js")
} catch (e) {}