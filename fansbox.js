/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2740474922
    Link: https://vk.com/js/al/fansbox.js?2740474922
    Last Update: 10.2.117
*/
var FansBox = {
    init: function(n, o) {
        extend(cur, {
            fnbxOffsets: cur.fnbxOffsets || {},
            fnbxPhCache: cur.fnbxPhCache || {},
            fnbxPhShown: cur.fnbxPhShown || {},
            fnbxIdolsList: cur.fnbxIdolsList || {},
            fnbxIdolsCache: cur.fnbxIdolsCache || {},
            fnbxIdolsIndex: cur.fnbxIdolsIndex || {},
            fnbxIdolsProcessed: cur.fnbxIdolsProcessed || {},
            fnbxIdolsQuery: cur.fnbxIdolsQuery || "",
            fnbxAutoload: !0,
            fnbxWasScroll: !1,
            fnbxHash: o.hash,
            fnbxOwnerId: o.ownerId,
            fnbxObjectId: o.objectId || "",
            fnbxId: n.tbId,
            fnbxSearchLink: o.searchLink || "",
            fnbxPage: o.address || "al_fans.php",
            fnbxVars: o.getVars || FansBox.fnbxVars
        }), cur.fnbxOffsets[o.tab] = o.offset, ajax.preload(cur.fnbxPage, extend(cur.fnbxVars(o.tab), {
            offset: o.offset
        }), o.preload);
        var r = "padding: 0;";
        isVisible(n.titleWrap) || (r += "margin-top: 50px;"), n.setOptions({
            width: o.intro ? 630 : 638,
            bodyStyle: r,
            noRefreshCoords: !0
        });
        var s = boxLayerWrap.scrollTop;
        elfocus(geByClass1("_scroll_node", n.bodyNode)), boxLayerWrap.scrollTop = s, window.uiScrollBox && uiScrollBox.init(n, {
            onShow: function() {
                cur.fnbxWasScroll && (boxLayerWrap.scrollTop = cur.fnbxWasScroll, cur.fnbxWasScroll = !1), setTimeout(FansBox.onScroll, 0)
            },
            onHide: function() {
                o.onHide && o.onHide()
            }
        }), n.tbDeinit || (extend(n, {
            tbDeinit: function() {
                cur.fnbxOwnerId = cur.fnbxOffsets = cur.fnbxPhShown = !1, re(cur.lSTL), removeEvent(boxLayerWrap, "scroll", FansBox.onScroll)
            },
            tbcShowProgress: function() {
                hide("fans_idol_search"), cur.fnbxSearchLink && hide(cur.fnbxSearchLink)
            },
            tbcOnLoad: function() {
                if ("idols" == curBox().tbVis) {
                    if (ge("fans_rowsidols")) {
                        show("fans_idol_search");
                        var n = cur.fnbxOwnerId;
                        cur.fnbxIdolsList[n] ? cur.fnbxIdolsQuery && FansBox.moreIdols(!0) : (cur.fnbxIdolsList[n] = "loading", ajax.post("/al_fans.php", {
                            act: "load_idols",
                            oid: n
                        }, {
                            onDone: function(o) {
                                if (cur.fnbxIdolsList) {
                                    var r = "update" == cur.fnbxIdolsList[n],
                                        s = r || "more" == cur.fnbxIdolsList[n];
                                    cur.fnbxIdolsCache[n] = {
                                        all: []
                                    };
                                    for (var e = cur.fnbxIdolsProcessed, a = 0, c = o.length; c > a; ++a) void 0 !== e[o[a][0]] && (o[a][1] = e[o[a][0]]), cur.fnbxIdolsCache[n].all.push(a);
                                    cur.fnbxIdolsList[n] = o, cur.fnbxIdolsIndex[n] = new vkIndexer(cur.fnbxIdolsCache[n].all, function(o) {
                                        return cur.fnbxIdolsList[n][o][2]
                                    }, s ? function() {
                                        cur.fnbxOwnerId == n && curBox().tbId == cur.fnbxId && "idols" == curBox().tbVis && FansBox.moreIdols(r)
                                    } : function() {})
                                }
                            }
                        }))
                    }
                } else hide("fans_idol_search"), cur.fnbxSearchLink && show(cur.fnbxSearchLink)
            }
        }), addEvent(boxLayerWrap, "scroll", FansBox.onScroll)), n.tbcOnLoad(), cur.fnbxLoaded && cur.fnbxLoaded(), onBodyResize(), setTimeout(FansBox.onScroll, 0)
    },
    fnbxVars: function(n) {
        return {
            act: cur.fnbxAct || "box",
            oid: cur.fnbxOwnerId,
            tab: n
        }
    },
    getHighlight: function(n) {
        var o = cur.fnbxIdolsIndex[cur.fnbxOwnerId],
            r = o.delimiter,
            s = o.trimmer;
        return n += " " + (parseLatin(n) || ""), n = escapeRE(n).replace(/&/g, "&amp;"), n = n.replace(s, "").replace(r, "|"), {
            re: new RegExp("(" + n + ")", "gi"),
            val: '<span class="highlight">$1</span>'
        }
    },
    moreIdols: function(n) {
        var o = cur.fnbxOwnerId,
            r = cur.fnbxIdolsList[o];
        if (o && curBox().tbId == cur.fnbxId) {
            if (!r || "loading" == r || "update" == r || "more" == r) return void("loading" == r && (cur.fnbxIdolsList[o] = "more"));
            var r = cur.fnbxIdolsCache[o].all,
                s = ge("sb_search_" + cur.fnbxId),
                e = trim(val(s));
            isVisible(curBox().tbSearch) || (e = "");
            var a = n || e != cur.fnbxIdolsQuery,
                c = !1;
            if (cur.fnbxIdolsQuery = e, e) {
                if (r = cur.fnbxIdolsCache[o]["_" + e], void 0 === r) {
                    var i = cur.fnbxIdolsIndex[o].search(e),
                        f = {};
                    r = [];
                    for (var l = 0, t = i.length; t > l; ++l) f[i[l]] || (f[i[l]] = !0, r.push(i[l]));
                    r.sort(function(n, o) {
                        return n - o
                    }), cur.fnbxIdolsCache[o]["_" + e] = r
                }
                c = FansBox.getHighlight(e)
            }
            var u = r.length,
                d = ge("fans_rowsidols"),
                b = ge("fans_more_linkidols");
            if (!u) return hide(b), void val(d, FansBox.genIdolEmpty(val(s)));
            for (var x = a ? 0 : d.childNodes.length, h = Math.min(u, x + 32), _ = [], l = x; h > l; ++l) {
                var p = cur.fnbxIdolsList[o][r[l]],
                    g = p[2];
                p && (p = FansBox.genIdolRow(p, c ? g.replace(c.re, c.val) : g), a ? _.push(p) : d.appendChild(se(p)))
            }
            a && (val(d, _.join("")), curBox().tbToTop()), toggle(b, u > h)
        }
    },
    genIdolEmpty: function(n) {
        var o = '<a href="/search?c[section]=groups&c[q]=' + encodeURIComponent(n) + '">',
            r = trim(n) ? getLang("fans_idols_not_found") + "<br>" + getLang("groups_you_can_find").replace("{term}", o + clean(n) + "</a>").replace("{link}", o).replace("{/link}", "</a>") : getLang("fans_no_idols");
        return '<div class="no_rows">' + r + "</div>"
    },
    genIdolRow: function(n, o) {
        var r = n[0],
            s = n[6] ? ' onmouseover="uiPhotoZoom.over(this, ' + r + ', {onBeforeShow: FansBox.beforePhotoShow, showOpts: {onHide: FansBox.backToBox}});"' : "",
            e = "/" + (n[4] ? n[4] : r > 0 ? "id" + r : "public" + -r),
            a = n[3],
            c = getLang("public_N_followers", n[5], !0),
            i = ' style="display: none"',
            f = n[7].length ? n[7] : getLang(r > 0 ? "profile_own_profile" : "groups_type_public"),
            l = vk.id && vk.id != r;
        n[8] ? '<a onclick="FansBox.feedToggle(this, ' + r + ')">' + getLang("public_feedunblock") + "</a>" : "";
        return ['<div class="fans_idol_row inl_bl">  <div class="fans_idolph_wrap fl_l"', s, '>    <a class="fans_idol_ph" href="', e, '">      <img class="fans_idol_img" src="', a, '" />    </a>  </div>  <div class="fans_idol_info">    <div class="fans_idol_name"><a class="fans_idol_lnk" href="', e, '">', o, '</a></div>    <div class="fans_idol_status">', f, '</div><div class="fans_idol_size">', c, '</div>    <div id="fans_idol_sub', r, '" class="button_blue fans_idol_sub"', n[1] || !l ? i : "", '>      <button class="flat_button button_small" onclick="FansBox.subscribe(this, ', r, ')">', getLang("public_subscribe"), '</button>    </div>    <div id="fans_idol_unsub', r, '" class="fans_idol_unsub"', n[1] && l ? "" : i, '>      <button class="flat_button button_small secondary" onclick="FansBox.unsubscribe(this, ', r, ')">', getLang("public_unsubscribe"), "</button>    </div>  </div></div>"].join("")
    },
    resetSearch: function() {
        val("fans_idol_search_inp", ""), FansBox.moreIdols(!0), setTimeout(elfocus.pbind("fans_idol_search_inp"), 0)
    },
    more: function() {
        var n = curBox().tbCur;
        if ("idols" == n) return FansBox.moreIdols();
        var o = ge("fans_more_link" + n);
        buttonLocked(o) || (ajax.post(cur.fnbxPage, extend(cur.fnbxVars(n), {
            offset: cur.fnbxOffsets[n]
        }), {
            onDone: function(r, s, e) {
                var a = ce("div", {
                        innerHTML: r
                    }),
                    c = ge("fans_rows" + n);
                if (c) {
                    var i = geByClass1("no_rows", c);
                    r && i && re(i);
                    for (var f = domFC(a); f; f = domFC(a)) c.appendChild(f);
                    cur.fnbxOffsets[n] = s, e ? FansBox.preload() : hide(o)
                }
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            cache: 1
        }), cur.fnbxAutoload = !0)
    },
    preload: function() {
        var n = curBox().tbCur;
        ajax.post(cur.fnbxPage, extend(cur.fnbxVars(n), {
            offset: cur.fnbxOffsets[n]
        }), {
            cache: 1
        })
    },
    markSubsc: function(n, o) {
        cur.fnbxIdolsProcessed[n] = o;
        var r = cur.fnbxIdolsList[cur.fnbxOwnerId];
        if (r && r.length)
            for (var s = 0, e = r.length; e > s; ++s)
                if (r[s][0] == n) {
                    cur.fnbxIdolsList[cur.fnbxOwnerId][s][1] = o;
                    break
                }
    },
    subscribe: function(n, o) {
        ajax.post("al_feed.php", {
            act: "subscr",
            oid: o,
            hash: cur.fnbxHash
        }, {
            onDone: function() {
                hide("fans_idol_sub" + o), show("fans_idol_unsub" + o), show("fans_idol_feedact" + o), cur.fnbxOwnerId == vk.id && FansBox.recache(1), FansBox.markSubsc(o, 1)
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n)
        })
    },
    blacklistTip: function(n) {
        showTooltip(n, {
            text: getLang("fans_block_fan"),
            shift: [8, 5, 5],
            black: 1
        })
    },
    blacklist: function(n, o, r) {
        return n.tt && n.tt.destroy && n.tt.destroy(), cur.fnbxWasScroll = boxLayerWrap.scrollTop, showBox("/al_fans.php", {
            act: "block",
            oid: o
        }, {
            params: {
                width: 440
            }
        }), cancelEvent(r)
    },
    unsubscribe: function(n, o) {
        ajax.post("/al_fans.php", {
            act: "unsub",
            oid: o,
            hash: cur.fnbxHash,
            from: "box"
        }, {
            onDone: function() {
                show("fans_idol_sub" + o), hide("fans_idol_unsub" + o), hide("fans_idol_feedact" + o), cur.fnbxOwnerId == vk.id && FansBox.recache(-1), FansBox.markSubsc(o, 0)
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n)
        })
    },
    feedToggle: function(n, o) {
        ajax.post("/al_fans.php", {
            act: "feedtgl",
            oid: o,
            hash: cur.fnbxHash,
            from: "box"
        }, {
            onDone: function(r, s) {
                n.innerHTML = s, cur.fnbxOwnerId == vk.id && FansBox.recache(-1);
                var e = cur.fnbxIdolsList[cur.fnbxOwnerId];
                if (e && e.length)
                    for (var a = 0, c = e.length; c > a; ++a)
                        if (e[a][0] == o) {
                            cur.fnbxIdolsList[cur.fnbxOwnerId][a][0] = r;
                            break
                        }
            },
            showProgress: function() {
                n.innerHTML = '<span class="progress_inline"></span>'
            }
        })
    },
    onScroll: function() {
        var n = curBox();
        if (cur.fnbxAutoload && n) {
            var o = lastWindowHeight,
                r = ge("fans_more_link" + n.tbCur);
            isVisible(r) && o > getXY(r, !0)[1] && r.click()
        }
    },
    recache: function(n) {
        cur.fnbxOffsets[curBox().tbCur] += n;
        for (var o in ajaxCache) o.match(new RegExp("^\\/" + cur.fnbxPage + "\\#act=" + (cur.fnbxAct || "box"), "")) && delete ajaxCache[o]
    },
    remove: function(n) {
        re("fans_fan_row" + n), FansBox.recache(-1), FansBox.onScroll();
        var o = curBox().tbCur;
        domFC(ge("fans_rows" + o)) || (curBox().hide(), nav.reload())
    },
    backToBox: function() {
        if (cur.fnbxLoaded = function() {
                var n = curBox().tbVis,
                    o = ge("fans_rows" + n),
                    r = cur.fnbxBack.scroll;
                return n != cur.fnbxBack.tab ? void curBox().tbTab(cur.fnbxBack.tab) : (extend(cur, {
                    fnbxOffsets: cur.fnbxBack.offsets,
                    fnbxIdolsQuery: cur.fnbxBack.query
                }), domPN(o).replaceChild(cur.fnbxBack.cont, o), toggle("fans_more_link" + n, !!cur.fnbxBack.vis), unlockButton("fans_more_link" + n), cur.fnbxLoaded = cur.fnbxBack = !1, boxLayerWrap.scrollTop = r, val("fans_idol_search_inp", cur.fnbxIdolsQuery), "idols" == n && cur.fnbxIdolsQuery && (elfocus("fans_idol_search_inp"), show("fans_reset_search")), void setTimeout(function() {
                    boxLayerWrap.scrollTop = r, onBodyResize(), FansBox.onScroll()
                }, 0))
            }, cur.fnbxBack) {
            cur.fnbxOwnerId = cur.fnbxBack.oid, cur.fnbxObjectId = cur.fnbxBack.objectId;
            var n = cur.fnbxVars(cur.fnbxBack.initial);
            if (n.w) nav.change({
                w: n.w
            });
            else {
                var o = cur.audioListenersOnDone ? cur.audioListenersOnDone : {};
                showBox(cur.fnbxPage, n, extend({
                    cache: 1
                }, o))
            }
        }
    },
    beforePhotoShow: function() {
        var n = curBox();
        if (n) {
            var o = n.tbCur;
            cur.fnbxPhShown = !1, extend(cur, {
                fnbxBack: {
                    tab: o,
                    initial: n.tbInitial,
                    oid: cur.fnbxOwnerId,
                    objectId: cur.fnbxObjectId,
                    offsets: cur.fnbxOffsets,
                    scroll: boxLayerWrap.scrollTop,
                    query: cur.fnbxIdolsQuery,
                    vis: isVisible("fans_more_link" + o),
                    cont: ge("fans_rows" + o),
                    instance: n.tbInstance
                }
            })
        }
    }
};
try {
    stManager.done("fansbox.js")
} catch (e) {}