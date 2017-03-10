/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1228491530
    Link: https://vk.com/js/al/agents.js?1228491530
    Last Update: 10.2.117
*/
var Agents = {
    openCardsBox: function(a, s, e, r) {
        checkEvent(a) || (cancelEvent(a), cur.agentsCardsBox = showBox("/agents.php", {
            act: "modify_cards_box",
            uid: s,
            type: r,
            dept: e
        }, {}))
    },
    changeCards: function(a, s) {
        var e = parseInt(val("agents_cards_form_delta"));
        return isNaN(e) || !e ? notaBene("agents_cards_form_delta") : void ajax.post("/agents.php", {
            act: "modify_cards",
            uid: a,
            hash: s,
            delta: e,
            note: val("agents_cards_form_note"),
            type: cur.agentsCardTypeDD.val(),
            dept_id: cur.agentsCardDeptDD.val()
        }, {
            showProgress: cur.agentsCardsBox.showProgress,
            hideProgress: cur.agentsCardsBox.hideProgress
        })
    },
    loadCardsHistory: function(a) {
        var s = {
            act: "cards",
            max_id: cur.agentsCardsMaxId,
            load: 1
        };
        each(["uid", "who_uid", "type"], function(a, e) {
            nav.objLoc[e] && (s[e] = nav.objLoc[e])
        }), ajax.post("/agents.php", s, {
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a),
            onDone: function(s, e) {
                e ? cur.agentsCardsMaxId = e : hide(a);
                var r = ge("agents_cards_history_rows");
                each(sech(s), function(a, s) {
                    r.appendChild(s)
                })
            }
        })
    },
    applyCardsHistoryFilters: function() {
        var a = {
            0: nav.objLoc[0],
            act: "cards"
        };
        0 != cur.agentsCardsUidDD.val() && (a.uid = cur.agentsCardsUidDD.val()), -1 != cur.agentsCardsWhoUidDD.val() && (a.who_uid = cur.agentsCardsWhoUidDD.val()), -1 != cur.agentsCardsTypeDD.val() && (a.type = cur.agentsCardsTypeDD.val()), 0 != cur.agentsCardsDeptDD.val() && (a.dept = cur.agentsCardsDeptDD.val()), uiTabs.showProgress(ge("ach_tabs")), nav.go(a)
    },
    _eof: 1
};
try {
    stManager.done("agents.js")
} catch (e) {}