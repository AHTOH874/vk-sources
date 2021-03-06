/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2219175661
    Link: https://vk.com/js/al/feed.js?2219175661
    Last Update: 10.2.117
*/
var Feed = {
    longView: {
        PERCENT: .5,
        DURATION_MS: 1e3,
        headerHeight: null,
        tracking: [],
        viewed: {},
        registerElement: function(e) {
            var t = feed.longView;
            return e ? e.longViewTracking ? !0 : e.longViewRegistered ? !1 : (e.longViewRegistered = !0, e.longViewTracking = t.isAutoplayAd(e), e.longViewTracking ? (t.tracking.push(e), !0) : !1) : !1
        },
        process: function(e, t) {
            var s = feed.longView,
                o = s.tracking;
            if (0 === o.length) return [];
            var r = s.PERCENT,
                i = s.DURATION_MS,
                n = s.isElemViewable,
                a = s.viewed,
                c = [];
            return each(o, function(s, o) {
                var d = domFC(o),
                    l = d.id;
                if (d && l) {
                    var u = domData(d, "ad-block-uid"),
                        f = "" + l;
                    if (u && (f += "_" + u), !a[f] && document.body.contains(o))
                        if (n(o, r, e, t)) {
                            var p = Date.now();
                            o.longViewStartedAt ? p - o.longViewStartedAt >= i && (a[f] = !0, c.push(feed.postsGetRaws(o))) : o.longViewStartedAt = Date.now()
                        } else o.longViewStartedAt = null
                }
            }), c
        },
        isAutoplayAd: function(e) {
            var t = e && domFC(e);
            return t && t.hasAttribute("data-ad-video-autoplay")
        },
        isElemViewable: function(e, t, s, o) {
            var r = feed.longView.getHeaderHeight(),
                i = s + r,
                n = s + o,
                a = e.offsetHeight,
                c = e.offsetTop + r,
                d = c + a,
                l = d > i && n > c ? (Math.min(n, d) - Math.max(i, c)) / a : 0;
            return l >= t
        },
        getHeaderHeight: function() {
            return feed.longView.headerHeight || (feed.longView.headerHeight = ge("page_header").offsetHeight)
        }
    },
    videoRecomsBlockHideCancel: function() {
        ajax.post("/al_feed.php", {
            act: "a_video_recom_hide_cancel"
        }), feed.restorePost("video_recoms")
    },
    videoRecomsBlockHideReason: function(e, t) {
        re(geByClass1("feed_rb_video_reason_wrap")), show(geByClass1("feed_rb_video_reason_thankyou")), ajax.post("/al_feed.php", {
            act: "a_video_recom_hide_reason",
            reason: t,
            reason_hash: e
        })
    },
    expandVideosPost: function(e, t) {
        var s = geByClass1("page_post_sized_thumbs", domPN(t)),
            o = 0;
        each(s.children, function() {
            return !isVisible(this) && (show(this), o++, o > 5) ? !1 : void 0
        }), toggle(t, !isVisible(s.children[s.children.length - 1]))
    },
    closeVideoBlock: function(e) {
        ajax.post("al_feed.php", {
            act: "a_close_video_block",
            hash: e
        });
        var t = ge("feed_recommends");
        setStyle(t, {
            height: getSize(t)[1],
            opacity: 1
        }), setTimeout(function() {
            addClass(t, "recoms_hidden")
        })
    },
    update: function(e) {
        if (!cur.feedUpdateLoading && !(cur.add_queue && window.Notifier && Notifier.addKey(cur.add_queue, feed.updated) && "news" != cur.section || "top" == cur.subsection || inArray(cur.section, ["search", "photos_search", "mentions", "articles", "articles_search", "likes", "recommended"]))) {
            var t = Math.random();
            "news" != cur.section && "comments" != cur.section && t > .3 || "news" == cur.section && (e || t > .05) || (cur.feedUpdateLoading = !0, ajax.post("al_feed.php?au_" + cur.section, extend(feed.getSectionParams(cur.section), {
                timestamp: cur.timestamp,
                posted: e ? 1 : "",
                queue: cur.add_queue ? 1 : 0
            }), {
                onDone: function(t, s, o) {
                    if (cur.feedUpdateLoading = !1, 1 == e && (!s || -1 == s.indexOf(vk.id + ""))) return void setTimeout(feed.update.pbind(2), 2e3);
                    if (!(t.section != cur.section || t.timestamp < cur.timestamp || o < cur.timestamp)) {
                        t.count += cur.count;
                        var r, i, n, a, c = cur.rowsCont,
                            d = ce("div"),
                            l = 0;
                        if ("news" == cur.section) {
                            if (a = scrollGetY(), s) {
                                for (d.innerHTML = s; d.lastChild;) c.insertBefore(d.lastChild, c.firstChild);
                                each(geByClass("ts" + o, c), function() {
                                    var e = this;
                                    l += this.offsetHeight, nodeUpdated(e), cur.feedUnreadCount++
                                })
                            }
                            l && a > 100 && scrollToY(a + l, 0, !1, !0)
                        } else if (s)
                            for (d.innerHTML = s; r = d.lastChild;)
                                if ("DIV" == r.tagName)
                                    if (n = r.firstChild.id.substr(4), n && cur.wallLayer == n) d.removeChild(r);
                                    else if (i = ge("post" + n)) {
                            if (!hasClass(i.parentNode, "feed_row")) return;
                            var u = ge("replies" + n),
                                f = u.nextSibling,
                                p = 0;
                            if (each([].slice.call(geByClass("reply", r, "div")), function() {
                                    ge(this.id) || (addClass(this, "new_reply"), u.appendChild(this), p++)
                                }), p) {
                                var h = i.parentNode.offsetHeight,
                                    _ = geByClass("new_reply", u, "div").length;
                                f && "replies_open" == f.className || (f = ce("div", {
                                    className: "replies_open",
                                    onclick: wall.openNewComments.pbind(n)
                                }), u.parentNode.insertBefore(f, u.nextSibling)), f.innerHTML = getLang("wall_x_new_replies_more", Math.min(100, _)), f.newCnt = _;
                                var g = scrollGetY(),
                                    w = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                                    m = getXY(f)[1],
                                    v = i.parentNode.offsetHeight;
                                h = v - h, inArray(n, cur.feedUnread) || cur.feedUnread.unshift(n), !cur.idleManager.isIdle && m > g + 100 && g + w + 100 > m ? (c.insertBefore(ge("post_ph" + n) || ce("div", {
                                    id: "post_ph" + n
                                }), c.firstChild), inArray(n, cur.feedToSort) || cur.feedToSort.push(n)) : (re(i.parentNode), c.insertBefore(i.parentNode, c.firstChild), m > g + w + 100 && (h = v), h && scrollToY(scrollGetY() + h, 0, !1, !0)), cur.feedUnreadCount += p
                            }
                            d.removeChild(r)
                        } else a = scrollGetY(), c.insertBefore(r, c.firstChild), nodeUpdated(r), l = r.offsetHeight, a > 100 && scrollToY(a + l, 0, !1, !0);
                        else d.removeChild(r);
                        feed.applyOptions(t), feed.updateTitle()
                    }
                },
                onFail: function() {
                    return cur.feedUpdateLoading = !1, !1
                },
                showProgress: function() {
                    cur.feedUpdateLoading = !0
                },
                hideProgress: function() {
                    cur.feedUpdateLoading = !1
                }
            }))
        }
    },
    getNewQKey: function(e) {
        function t(t, o) {
            if (cur.section == r) {
                if (t) cur.add_queue = t, setTimeout(feed.update.pbind(0), 0);
                else if (!s.only_update) {
                    var i = o;
                    return void(cur.timestamp = (i || vkNow() / 1e3) - e)
                }
                isArray(o) && (cur.ignore_owners = o)
            }
        }
        var s = {
                act: "a_get_key",
                only_update: cur.add_queue ? 1 : 0,
                need_ignore: isArray(cur.ignore_owners) ? 0 : 1
            },
            o = {
                onDone: t,
                local: 1
            },
            r = cur.section;
        ajax.post("al_feed.php?queue", extend(feed.getSectionParams(cur.section), s), o)
    },
    updated: function(e, t) {
        if (("search" == cur.section || "news" == cur.section || !cur.section) && cur.add_queue && cur.add_queue.key == e) {
            if (t.failed) {
                cur.add_queue = !1;
                var s = curNotifier.error_timeout || 1;
                return clearTimeout(cur.lp_error_to), void(cur.lp_error_to = setTimeout(feed.getNewQKey.bind(feed).pbind(s), 1e3 * s))
            }
            if (isArray(t.events) && t.events.length) {
                cur.add_queue.ts = t.ts, t.key && (cur.add_queue.key = t.key);
                var o = scrollGetY(),
                    r = 0;
                each(t.events, function() {
                    r += feed.pushEvent(this.split("<!>"), o + getSize("page_header_cont")[1])
                });
                var i = scrollGetY();
                r && Math.abs(o - i) < 100 && (cur.leftMenuDelta = r, scrollToY(i + r, 0, !1, !0)), feed.updateTitle(), cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
            }
        }
    },
    needScrollPost: function(e, t) {
        return e + 80 > getXY(t)[1] || window.wkcur && wkcur.shown && "story" != wkcur.type || window.mvcur && mvcur.mvShown || window.pvcur && cur.pvShown
    },
    pushEvent: function(e, t) {
        var s = e[0],
            o = e[1],
            r = e[2],
            i = ge("post" + r),
            n = cur.section,
            a = "search" != n ? intval(e.pop()) : 0,
            c = 0,
            d = function(e) {
                return intval(getStyle(domByClass(e, "page_block"), "marginTop")) || intval(getStyle(domByClass(domNS(e), "page_block"), "marginTop")) || 15
            };
        if (!cur.options || s != cur.options.qversion) return 0;
        switch (o) {
            case "new_post":
                if (i) break;
                var l = 0;
                if (intval(e[11]) && intval(e[11]) != vk.id) return ajax.post("al_feed.php", {
                    act: "a_need_own_reply",
                    oid: intval(e[11])
                }, {
                    onDone: function(s) {
                        s && (e[11] = 0, feed.pushEvent(e, t))
                    }
                }), 0;
                if ("search" != n) {
                    var u = r.split("_")[0];
                    e[8] = intval(e[8]) > 0 && 4 == (4 & a) ? 1 : 0, 0 > u && (l = 8 & a ? 2 : 2 & a ? 1 : 0)
                }
                "search" == n && statlogsValueEvent("feed_switch", 0, "search_update", cur.options.q && "#" == cur.options.q.charAt(0) ? "hashtag" : "");
                var f, p, h, _, g, w, m = cur.rowsCont,
                    v = m.childNodes,
                    y = wall.getNewPostHTML(e, l, feed.feedPostRepl),
                    b = e[12],
                    C = "search" != n && (window._wf <= 0 || hasClass(cur.feedEls.wrap, "feed_has_new")),
                    k = layers && layers.visible && wkcur && "story" == wkcur.type;
                k && (C = !0);
                var x = !1,
                    S = y;
                if (C && (y = wall.updatePostImages(y)), b) {
                    if (cur.ignore_owners.length && inArray(intval(b), cur.ignore_owners)) break;
                    if (p = geByClass1("feed_reposts_wrap" + b, m, "div")) h = geByClass1("feed_reposts_first", p, "div").firstChild, _ = geByClass1("feed_reposts_group", p, "div"), g = geByClass1("feed_reposts_more_link", p, "a"), feed.needScrollPost(t, h) && (c -= h.offsetHeight + d(h)), h.parentNode.replaceChild(f = se(S), h), _.insertBefore(h, _.firstChild), isVisible(_) || val(g, getLang("news_show_X_reposts", _.childNodes.length)), p = p.parentNode, m.firstChild != p && m.insertBefore(p, m.firstChild), feed.needScrollPost(t, p) && (c += p.offsetHeight + d(p)), p.bits = 0;
                    else if ((w = geByClass("feed_repost" + b, m, "div")) && w.length) {
                        y = rs(cur.wallTpl.grouped_posts, {
                            place: b,
                            random: irand(1e8, 2e8),
                            first: y,
                            other: "",
                            label: getLang("news_show_X_reposts", w.length)
                        });
                        var P = se('<div class="feed_row' + (C ? "_unshown" : "") + '">' + y + "</div>"),
                            T = domFC(T);
                        m.insertBefore(P, m.firstChild), !C && feed.needScrollPost(t, P) && (c += P.offsetHeight + d(P)), x = !0, p = P.firstChild, f = geByClass1("feed_reposts_first", p, "div"), _ = geByClass1("feed_reposts_group", p, "div"), each(clone(w), function() {
                            feed.needScrollPost(t, this) && (c -= this.offsetHeight + d(this)), re(this.parentNode), _.appendChild(this.firstChild)
                        })
                    } else f = se('<div class="feed_row' + (C ? "_unshown" : "") + '"><div class="feed_repost' + b + '">' + y + "</div></div>"), m.insertBefore(f, m.firstChild), x = !0, !C && feed.needScrollPost(t, f) && (c += f.offsetHeight + d(f))
                } else f = se('<div class="feed_row' + (C ? "_unshown" : "") + '">' + y + "</div>"), m.insertBefore(f, m.firstChild), x = !0, !C && feed.needScrollPost(t, f) && (c += f.offsetHeight + d(f));
                C && x && (cur.newPostsCount = cur.newPostsCount ? cur.newPostsCount + 1 : 1, cur.feedEls.newPosts.innerHTML = getLang("news_new_posts", cur.newPostsCount), addClass(cur.feedEls.wrap, "feed_has_new"), 1 == cur.newPostsCount && feed.needScrollPost(t, cur.feedEls.newPosts) && !k && (c += getSize(cur.feedEls.newPosts)[1])), AudioUtils.updateQueueReceivedPost(f), ge("post_poll_id" + r) && wall.updatePoll(r), cur.feedUnreadCount++, "search" != n && nodeUpdated(f), v.length > 300 ? m.removeChild(v[300]) : v.length <= 1 && removeClass(cur.feedEls.wrap, "feed_is_empty"), Wall.updateMentionsIndex();
                break;
            case "new_post_reply":
                if (i) break;
                var m = cur.rowsCont,
                    v = m.childNodes,
                    y = wall.getNewPostHTML(e, !1, feed.feedPostRepl),
                    f = se('<div class="feed_row">' + y + "</div>");
                m.insertBefore(f, m.firstChild), feed.needScrollPost(t, f) && (c += f.offsetHeight + d(f)), cur.feedUnreadCount++, v.length > 300 ? m.removeChild(v[300]) : v.length <= 1 && removeClass(cur.feedEls.wrap, "feed_is_empty");
                break;
            case "edit_post":
                var B, E = ge("wpt" + r);
                if (!isVisible(i) || !E) break;
                var L = geByClass1("wall_post_more", E);
                L && (L = isVisible(domNS(L))), (B = feed.needScrollPost(t, E)) && (c -= E.offsetHeight);
                var N = psr(rs(e[3], {
                        poll_hash: cur.wallTpl.poll_hash
                    })),
                    m = ge("post" + r);
                m && !isVisible(m.parentNode) && (N = wall.updatePostImages(N)), val(E, N), L && (L = geByClass1("wall_post_more", E), L && L.onclick()), ge("post_poll_id" + r) && wall.updatePoll(r), B && (c += E.offsetHeight), nodeUpdated(E);
                break;
            case "edit_reply":
                var H = e[3],
                    E = ge("wpt" + H);
                if (!isVisible("post" + H) || !E) break;
                var L = geByClass1("wall_reply_more", E);
                L && (L = isVisible(domNS(L))), updH = -E.offsetHeight, updY = getXY(E)[1], val(E, psr(e[4])), L && (L = geByClass1("wall_reply_more", E), L && L.onclick()), updH += E.offsetHeight, nodeUpdated(E);
                break;
            case "post_parsed_link":
                if (!i) break;
                var M = geByClass1("wall_postlink_preview_btn_disabled", i);
                if (!M) break;
                intval(e[3]) ? removeClass(M, "wall_postlink_preview_btn_disabled") : re(M);
                break;
            case "del_post":
                if (i) {
                    var R = domClosest("feed_row", i) || domClosest("feed_row_unshown", i) || i;
                    cur.wallMyDeleted[r] || (feed.needScrollPost(t, i) && (c -= i.offsetHeight + d(i)), revertLastInlineVideo(i), re(R)), cur.options.offset--, hasClass(cur.feedEls.wrap, "feed_has_new") && !isVisible(R) && (cur.newPostsCount--, cur.newPostsCount ? cur.feedEls.newPosts.innerHTML = getLang("news_new_posts", cur.newPostsCount) : removeClass(cur.feedEls.wrap, "feed_has_new"))
                }
                break;
            case "res_post":
                i && cur.options.offset++;
                break;
            case "new_reply":
                if (!i || cur.wallMyReplied[r] || ge("post" + e[3])) break;
                var j = ge("replies" + r),
                    A = ge("replies_wrap" + r),
                    F = i.offsetHeight,
                    u = r.split("_")[0],
                    l = 0 > u ? 8 & a ? 2 : 2 & a ? 1 : 0 : 0,
                    D = wall.getNewReplyHTML(e, l),
                    f = !1,
                    V = !1;
                if (isVisible(j) && isVisible(A) && !isVisible("reply_link" + r)) {
                    var q = j.nextSibling,
                        I = geByClass("new_reply", j, "div").length + 1;
                    if (cur.wallMyOpened[r]) {
                        q && "replies_open" == q.className && re(q), V = !0;
                        var U = geByClass1("wr_header", j, "a"),
                            O = geByClass("reply", j, "div").length + 1,
                            Y = O;
                        U && (Y = intval(U.getAttribute("offs").split("/")[1]) + 1), (Y > 5 || Y > O) && (U || j.insertBefore(U = ce("a", {
                            className: "wr_header"
                        }), j.firstChild), wall.updateRepliesHeader(r, U, O, Y))
                    } else D = wall.updatePostImages(D), f = se(D), addClass(f, "new_reply"), q && "replies_open" == q.className || (q = ce("div", {
                        className: "replies_open",
                        onclick: wall.openNewComments.pbind(r)
                    }), j.parentNode.insertBefore(q, j.nextSibling)), q.innerHTML = getLang("wall_x_new_replies_more", Math.min(100, I)), q.newCnt = I
                } else re("reply_link" + r), show(A, j), V = !0;
                r.split("_")[0] == vk.id && cur.feedUnreadCount++, f || (f = se(D)), j.appendChild(f), feed.needScrollPost(t, V ? f : q) && (c += i.offsetHeight - F), V && nodeUpdated(f), Wall.repliesSideSetup(r), Wall.updateMentionsIndex();
                break;
            case "del_reply":
                if (!cur.wallMyDeleted[r] && i) {
                    feed.needScrollPost(t, i) && (c -= i.offsetHeight);
                    var W = i.parentNode.id.match(/replies(-?\d+_\d+)/);
                    revertLastInlineVideo(i), re(i), W && Wall.repliesSideSetup(W[1])
                }
                break;
            case "like_post":
            case "like_reply":
                if (layer && r == window.cur.wallLayerLike) {
                    window.WkView && WkView.likeUpdate(hasClass(ge("wk_like_wrap"), "my_like"), e[3], !1);
                    break
                }
                if (!i) break;
                var z = "like_reply" == o ? r.replace("_", "_wall_reply") : r,
                    G = i && domByClass(i, "_like_wrap"),
                    X = i && domByClass(i, "_share_wrap");
                wall.likeFullUpdate(G, z, {
                    like_my: G && hasClass(G, "my_like"),
                    like_num: e[3],
                    like_title: !1,
                    share_my: X && hasClass(X, "my_share"),
                    share_num: e[4],
                    share_title: !1
                });
                break;
            case "vote_poll":
                if (!ge("post_poll" + r)) break;
                wall.updatePollResults(r, e[3]);
                break;
            case "new_photos_private":
            case "new_photos":
            case "new_tagged":
        }
        return c
    },
    feedPostRepl: function(e, t) {
        e.replies = cur.wallTpl.post_replies;
        var s = {
            full_id: t[2],
            item_id: "wall_" + t[2],
            sec_name: stripHTML(t[3]),
            date: wall.getNowRelTime(),
            del: cur.wallTpl.spam
        };
        if ("search" == cur.section && cur.q) {
            var o = e.text || "",
                r = cur.q,
                i = r.toLowerCase().split(/[\s.,:;!?()]/),
                n = [];
            o = o.replace(/<(.|\n)+?>/g, function(e) {
                return n.push(e), ""
            });
            var a, c, d, l = o.toLowerCase();
            for (a = i.length - 1; a >= 0; a--)
                if (d = i[a], trim(d))
                    for (c = 0; - 1 != (c = l.indexOf(d, c));) o.charAt(c - 1) != String.fromCharCode(2) ? (o = o.substr(0, c) + "" + a + "" + o.substr(c + d.length), l = l.substr(0, c) + "" + a + "" + l.substr(c + d.length)) : c += 2;
            o = o.replace(/\x02(\d+)\x02/g, function(e, t) {
                return '<span class="highlight">' + i[t] + "</span>"
            }), o = o.replace(/\x01/g, function() {
                return n.shift() || ""
            }), s.text = o, "new_post_reply" == t[1] && (s.date_postfix = t[7])
        }
        return s
    },
    reSortItems: function() {
        cur.feedToSort && cur.feedToSort.length && (each(cur.feedToSort, function(e, t) {
            var s = ge("post_ph" + t),
                o = ge("post" + t).parentNode;
            s && o && (s.parentNode.insertBefore(o, s), re(s))
        }), cur.feedToSort = [], scrollToY(0, 0))
    },
    showNewPosts: function() {
        var e = cur.feedEls.newPosts;
        intval(getStyle(e, "marginTop"));
        removeClass(cur.feedEls.wrap, "feed_has_new"), cur.newPostsCount = 0;
        var t = ge("feed_rows");
        Wall.loadPostImages(t), each(geByClass("feed_row_unshown", t, "div"), function() {
            replaceClass(this, "feed_row_unshown", "feed_row")
        })
    },
    updateTitle: function() {
        cur.idleManager && (cur.idleManager.isIdle || (cur.feedUnreadCount = 0), document.title = (cur.feedUnreadCount ? "(" + cur.feedUnreadCount + ") " : "") + cur.feedInitialTitle)
    },
    toggleTabsMenu: function(e, t) {
        var s = ge("feed_add_list_icon");
        return void 0 === t && (t = !hasClass(s, "shown")), browser.mozilla && setStyle("page_body", {
            overflow: t ? "visible" : ""
        }), uiActionsMenu.toggle(s, t), t && addEvent(document, "mousedown", function(e) {
            feed.toggleTabsMenu(!1, 0), removeEvent(document, "mousedown", arguments.callee)
        }), e && cancelEvent(e)
    },
    checkTabsFilter: function(e, t) {
        switch (t) {
            case "news":
                return !1;
            case "newlist":
                return feed.addList();
            default:
                if (r = t.match(/list(\d+)/)) return feed.editList(r[1])
        }
        var s, o, r, i = (ge("tabs_type_filter"), cur.my_feed_types.tabs);
        cur.feed_types.tabs;
        s = -1 != (o = indexOf(i, t)), toggleClass(e, "checked", !s), s ? (i.splice(o, 1), cur.section == t && feed.switchSection("news")) : i.push(t), cur.my_feed_types.tabs = i;
        var n = geByClass1("feed_section_" + t, cur.feedEls.rmenu);
        isVisible(n);
        toggleClass(n, "ui_rmenu_item_hidden", s), clearTimeout(cur.saveTabsTO), cur.saveTabsTO = setTimeout(feed.saveTabs, 500)
    },
    hasSearchParams: function(e) {
        var t = !1;
        return each(e, function(e, s) {
            return (!e.indexOf("c[") && "c[section]" !== e || "q" == e) && s ? (t = !0, !1) : void 0
        }), t
    },
    getSectionParams: function(e) {
        var t = {
            section: e
        };
        switch (e) {
            case "news":
            case "recommended":
                void 0 === (t.subsection = cur.subsections[e]) && delete t.subsection;
                break;
            case "owner":
                (t.owner = cur.owner) || delete t.section;
                break;
            case "source":
                (t.source = cur.source) || delete t.source;
                break;
            case "list":
                (t.list = cur.list) || delete t.list;
                break;
            case "notifications":
                (t.source = cur.source) || delete t.source;
                break;
            case "articles":
                void 0 === (t.subsection = cur.subsections[e]) && delete t.subsection;
                break;
            case "search":
                var s = ge("search_filters_form");
                if (s) {
                    var o = serializeForm(s) || {};
                    for (var r in o) o[r] && "0" != o[r] || delete o[r];
                    extend(t, o)
                }
                t["c[q]"] = trim(val(cur.feedEls.search));
                break;
            case "photos_search":
                (t.q = trim(val(cur.feedEls.search))) || delete t.section, (t.sort = intval(cur.search_sort_value)) || delete t.sort;
                break;
            case "articles_search":
                (t.q = trim(val(cur.feedEls.search))) || (t.section = "articles");
                break;
            case "comments":
                cur.reposts && (t.reposts = cur.reposts);
                break;
            case "mentions":
                cur.mentionObj && cur.mentionObj != vk.id && (t.obj = cur.mentionObj)
        }
        return t
    },
    switchNotifyList: function(e, t) {
        uiRightMenu.go(geByClass1("feed_section_" + e), !1, !1), feed.go(t)
    },
    switchSubSection: function(e, t) {
        if (t && checkEvent(t)) return !0;
        cur.subsection = cur.subsections[cur.section] = e;
        var s = feed.getSectionParams(cur.section);
        delete cur.feedUpdateLoading, delete cur.isFeedLoading, nav.go(extend(s || {}, {
            0: "feed"
        })), uiRightMenu.showProgress(cur.feedEls.rmenu)
    },
    switchSection: function(e, t, s) {
        if (t && checkEvent(t)) return !0;
        if (cur.feedDestroy) {
            for (var o in cur.feedDestroy) try {
                cur.feedDestroy[o](cur)
            } catch (t) {
                try {
                    console.log(t.stack)
                } catch (r) {}
            }
            cur.feedDestroy = []
        }
        if (removeClass(cur.feedEls.wrap, "feed_has_new"), cur.newPostsCount = 0, "photos_search" == e && !trim(val(cur.feedEls.search))) {
            if ("photos_search" != cur.section) return !1;
            e = "photos"
        }
        "comments" == e && (cur.reposts = cur.options.reposts = ""), statlogsValueEvent("feed_switch", 0, e), feed.setSection(e, 1);
        var i = feed.getSectionParams(e || "news");
        delete cur.feedUpdateLoading, delete cur.isFeedLoading;
        var n = s ? !1 : extend(i || {}, {
            0: "feed"
        });
        return uiRightMenu.go(geByClass1("feed_section_" + e), !1, n), !1
    },
    setSection: function(e, t) {
        if (t = t || 0, cur.prevSection = cur.section, !(e == cur.section && 2 > t) && e) {
            if (uiRightMenu.hideProgress(cur.feedEls.rmenu), cur.feedEls.search && uiSearch.hideProgress(cur.feedEls.search), t > 1) {
                toggleClass(cur.feedEls.wrap, "feed_submit_shown", inArray(e, cur.options.feed_types.tabs.concat(["list"])));
                var s = inArray(e, ["articles_search", "articles", "search", "photos_search", "photos"]);
                toggleClass(cur.feedEls.wrap, "feed_search_shown", s), s && elfocus(cur.feedEls.search), cur.section && val(cur.feedEls.search, "")
            }
            if (cur.section = e, 4 == t) return void feed.searchUpdate();
            cur.editingHide = "notifications" == e || "replies" == e ? feed.notifyCheckHideReply : !1, cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler(), window.Stories && Stories.updateFeedStories()
        }
    },
    applyOptions: function(options, from) {
        if (from = from || 0, options.owner && (cur.owner = options.owner), cur.subsection = options.subsection || "", feed.setSection(options.section, from), cur.options || (cur.options = {
                reply_names: {}
            }), extend(cur.options.reply_names, options.reply_names), delete options.reply_names, extend(cur, options), cur.subsections[cur.section] = cur.subsection, options.loc && 2 == from && nav.setLoc(options.loc), options.section && "news" == options.section && options.subsection && "top" == options.subsection && statlogsValueEvent("feed_switch", 0, "top_news", from), void 0 !== options.filters) {
            var minEl = ge("search_filters_minimized"),
                filtersExpanded = minEl && hasClass(minEl, "ui_rmenu_item_expanded"),
                needExpand = !!minEl;
            val("feed_filters", options.filters), window.searcher && needExpand && searcher.toggleMinimizedFilters(ge("search_filters_minimized"), filtersExpanded, !0)
        }
        if (options.script && eval(options.script), options.htitle && (cur.feedInitialTitle = document.title = replaceEntities(stripHTML(options.htitle))), void 0 !== options.add_queue && null !== options.add_queue ? (options.add_queue === !0 && (cur.add_queue = options.add_queue = !1), feed.getNewQKey(0), options.add_queue !== !0 && (cur.add_queue = options.add_queue) && setTimeout(feed.update.pbind(0), 0)) : from && "search" != cur.section && "news" != cur.section && cur.section && (cur.add_queue = !1), options.q) {
            val(cur.feedEls.search, replaceEntities(options.q));
            var query = options.q;
            query.length > 30 && (query = trim(query.substr(0, 30)) + "...")
        }
        options.last_view && (cur.options.last_view = options.last_view), feed.searchUpdate(), "comments" != cur.section || cur.reposts || toggle("comments_filters", !cur.reposts), cur.all_shown_text && val("all_shown", cur.all_shown_text), cur.empty_text && val("feed_empty", cur.empty_text), cur.count >= 0 && re("feed_error_wrap");
        var hasNews = geByClass1("feed_row", cur.rowsCont, "div") || !1,
            isEmpty = !hasNews,
            nextRows = ge("feed_rows_next");
        if (isEmpty ? (toggleClass(cur.feedEls.wrap, "feed_is_empty", !isVisible("feed_error_wrap")), hide("all_shown"), toggle("show_more_link", cur.count > 0 && !cur.all_shown)) : !cur.all_shown || nextRows && nextRows.firstChild ? (hide("all_shown"), show("show_more_link"), removeClass(cur.feedEls.wrap, "feed_is_empty")) : (hide("show_more_link"), show("all_shown"), removeClass(cur.feedEls.wrap, "feed_is_empty"), re(nextRows)), options.playlistsData && (options.playlistsData = JSON.parse(options.playlistsData), cur.pageVideosList = extend(cur.pageVideosList || {}, options.playlistsData)), ("notifications" == cur.section || "replies" == cur.section) && cur.notify) {
            var el = ge("feedback_row" + cur.notify);
            el && el.onclick && (setTimeout(function() {
                el.onclick(), scrollToY(getXY(el)[1], 0)
            }, browser.msie ? 100 : 0), delete cur.notify)
        }
    },
    showMore: function() {
        if (!cur.isFeedLoading) {
            cur.disableAutoMore = !1;
            var e = ge("feed_rows_next");
            if (e) {
                if (e.firstChild)
                    for (; e.firstChild;) cur.rowsCont.insertBefore(e.firstChild, e);
                re(e)
            }
            var t = ge("show_more_link");
            cur.all_shown && (hide(t), show("all_shown"));
            var s = !1,
                o = function(e) {
                    e.keyCode == KEY.ESC && (s = !0)
                };
            addEvent(document, "keyup", o);
            var r = feed.getSectionParams(cur.section || "news");
            extend(r, {
                offset: cur.offset,
                from: cur.from,
                part: 1,
                more: 1,
                last_view: ge("feedback_unread_bar") ? 1 : cur.options.last_view
            });
            var i = cur.section;
            ajax.post("al_feed.php?sm_" + cur.section, r, {
                onDone: function(e, t) {
                    if (removeEvent(document, "keyup", o), i == cur.section) {
                        if (s) return void(cur.disableAutoMore = !0);
                        if (t) {
                            var r, n = ce("div");
                            for (n.innerHTML = t; r = n.firstChild;) r.firstChild && r.firstChild.id && !ge(r.firstChild.id) || "feedback_unread_bar" == r.id || "feed_row_fb_hidden" == r.className ? cur.rowsCont.appendChild(r) : n.removeChild(r)
                        }
                        shortCurrency(), feed.applyOptions(e), setTimeout(feed.scrollCheck, 200)
                    }
                },
                showProgress: function() {
                    lockButton(t), cur.isFeedLoading = !0
                },
                hideProgress: function() {
                    unlockButton(t), cur.isFeedLoading = !1
                },
                cache: 1
            })
        }
    },
    showMoreFriends: function(e, t) {
        checkEvent(t) || (lockButton(e), cur._back.show.push(function() {
            unlockButton(e)
        }), nav.go("/friends?act=find"))
    },
    showMorePublics: function(e, t) {
        checkEvent(t) || (lockButton(e), cur._back.show.push(function() {
            unlockButton(e)
        }), nav.go("/groups?act=catalog&c%5Bcategory%5D=0 "))
    },
    getTypesSection: function() {
        switch (cur.section) {
            case "owner":
                return cur.owner > 0 ? "person" : "group";
            default:
                return cur.section
        }
    },
    checkFilter: function(e, t) {
        var s, o, r = feed.getTypesSection(),
            i = (ge(r + "_type_filter"), cur.my_feed_types[r]),
            n = cur.feed_types[r];
        return "notifications" == r ? void feed.setNotifyFilter(e, t) : (i === !0 && (i = clone(n)), s = -1 != (o = indexOf(i, t)), s ? i.splice(o, 1) : (i.push(t), i.length == n.length && (i = !0)), checkbox(e), cur.my_feed_types[r] = i, feed.updateTypesCookie(), Feed.setFiltersUpdatePage(), void(cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu)))
    },
    setFilter: function(e, t) {
        var s = feed.getTypesSection(),
            o = ge(s + "_type_filter"),
            r = (cur.my_feed_types[s], cur.feed_types[s], !0);
        "notifications" != s && (each(geByClass("_feed_filter_row", o, "div"), function() {
            return isChecked(this) && this != e ? r = !1 : void 0
        }), r ? (cur.my_feed_types[s] = !0, each(geByClass("_feed_filter_row", o, "div"), function() {
            checkbox(this, !0)
        })) : (each(geByClass("_feed_filter_row", o, "div"), function() {
            checkbox(this, !1)
        }), cur.my_feed_types[s] = [t], checkbox(e, !0)), feed.updateTypesCookie(), Feed.setFiltersUpdatePage({
            force_expand_filters: 1
        }), cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu))
    },
    setFiltersUpdatePage: function(e) {
        e = e || {};
        var t = nav.strLoc;
        if ("updates" === cur.section) {
            t.match(/\&filters\_expanded\=1/) || ge("updates_show_all_filters") && !e.force_expand_filters || (t += "&filters_expanded=1"), t = t.replace(/\&filters\_shown\=([a-z\,]+)/, "");
            for (var s = geByClass("_feed_filter_row", "feed_filters"), o = [], r = 0; r < s.length; r++) hasClass(s[r], "hide") || o.push(s[r].id.replace("filter_updates", ""));
            t += "&filters_shown=" + o.join(",")
        }
        nav.go(t)
    },
    setNotifyFilter: function(e, t) {
        checkbox(e), cur.notifyPrefs || (cur.notifyPrefs = {}), cur.notifyPrefs[t] = isChecked(e), clearTimeout(cur.saveNotifyPrefsTO), cur.saveNotifyPrefsTO = setTimeout(function() {
            var e = [];
            each(cur.notifyPrefs, function(t, s) {
                e.push((s ? "" : "-") + t)
            }), e = e.join(","), ajax.post("/al_feed.php", {
                act: "a_set_notify_prefs",
                prefs: e,
                feed: 1,
                hash: cur.topNotifyHash
            }, {
                onDone: function(e) {
                    addTemplates({
                        top_notify_prefs: e
                    }), toggleClass("top_notify_pref_" + t, "checked", cur.notifyPrefs[t]), cur.notifyPrefs = {}, window.TopNotifier && TopNotifier.invalidate(), nav.go(nav.strLoc), cur.feedEls.rmenu && uiRightMenu.showProgress(cur.feedEls.rmenu)
                }
            })
        }, 500)
    },
    updateTypesCookie: function() {
        var e = [];
        each(cur.my_feed_types, function(t, s) {
            "tabs" != t && e.push(s === !0 ? "*" : s.join(","))
        }), setCookie("remixfeed", e.join("."), 365)
    },
    toggleFeedTop: function(e, t) {
        var s = geByClass1("_ui_toggler", e),
            o = "top";
        switch (toggleClass(s, "on"), cur.section) {
            case "news":
            case "recommended":
                o = hasClass(s, "on") ? "top" : "recent";
                break;
            case "articles":
                o = hasClass(s, "on") ? "suggested" : "top"
        }
        feed.switchSubSection(o, t)
    },
    switchList: function(e) {
        cur.prevList = cur.list, cur.list = e, feed.setSection("list", 1), uiRightMenu.go(geByClass1("feed_section_list" + e), !1, !1), feed.go(feed.getSectionParams(cur.section))
    },
    setSearchSort: function(e) {
        cur.search_sort_value = e, Feed.submitSearch()
    },
    notifyClick: function(e, t, s) {
        var o = ge("feedback_row" + e);
        if (Wall.checkPostClick(o, t)) {
            (t || {}).cancelBubble = !0;
            var r = ge("reply_box" + e);
            if (cur.editing && cur.editing != e && cur.notifyReplyData && cur.notifyReplyData[cur.editing].disabled && feed.notifyCheckHideReply(cur.editing, (window.event || {}).target), r && isVisible(r)) return void feed.notifyCheckHideReply(e, !1);
            if (void 0 === cur.notifyReplyData && (cur.notifyReplyData = {}), cur.notifyReplyData[e] = s, s.disabled) return r ? show(r) : o.appendChild(se(rs(cur.options.feedback_dis, {
                item: e,
                text: s.disabled
            }))), void setTimeout(function() {
                cur.editing = e
            }, 0);
            show(r), Wall.showEditReply(e, t);
            var i = ge("reply_field" + e);
            i.setAttribute("placeholder", s.ph), window.Emoji && Emoji.val(i, s.greet.replace(/ $/, "&nbsp;")), data(i, "send", feed.notifySendReply), removeClass("reply_box" + e, "clear_fix")
        }
    },
    notifySendReply: function(e, t, s) {
        var o = cur.notifyReplyData[e];
        if (o && !o.sending) {
            var r, i = ge("reply_field" + e),
                n = ge("reply_button" + e),
                a = ge("feedback_row" + e),
                c = i && data(i, "composer");
            if (s.stickerId) var d = {
                message: "",
                attach1_type: "sticker",
                attach1: s.stickerId
            };
            else {
                var d = c ? Composer.getSendParams(c, feed.notifySendReply.pbind(e)) : {
                    message: trim(Emoji.editableVal(i))
                };
                if (d.delayed) return;
                if (!d.attach1_type && (!d.message || o.greet && !o.greet.indexOf(d.message))) return void Emoji.editableFocus(i, !1, !0)
            }
            extend(d, {
                act: "post",
                from: "feedback",
                item: e
            }, o.params || {}), o.sending = 1, ajax.post("al_wall.php", Wall.fixPostParams(d), {
                onDone: function(t, s) {
                    if (delete o.sending, c ? r = Composer.reset(c) : window.Emoji && Emoji.val(i, ""), i.autosize && i.autosize.update(), feed.notifyHideReply(e), s) {
                        var n = geByClass1("_answer_wrap", a);
                        val(n, s), show(n)
                    } else t && showDoneBox(t)
                },
                onFail: function() {
                    delete o.sending
                },
                showProgress: lockButton.pbind(n),
                hideProgress: unlockButton.pbind(n)
            })
        }
    },
    notifyCheckHideReply: function(e, t) {
        var s = cur.notifyReplyData[e];
        if (s && !s.sending && isVisible("reply_box" + e)) {
            if (cur.editing = !1, !s.disabled) {
                var o = ge("reply_field" + e),
                    r = trim(window.Emoji ? Emoji.editableVal(o) : ""),
                    i = Wall.hasComposerMedia(o);
                if (!o || i || r && !s.greet || s.greet.indexOf(r)) return
            }
            feed.notifyHideReply(e)
        }
    },
    notifyHideReply: function(e) {
        cur.editing == e && (cur.editing = !1);
        var t = ge("feedback_row" + e);
        removeClass(t, "reply_box_open"), hide("reply_box" + e);
        var s = cur.replySubmitSettings;
        s && s.tt && s.tt.el && s.tt.destroy()
    },
    ungroup: function(e, t) {
        var s = ge("feedback_row" + e);
        if (t = t || window.event, s && !checkEvent(t) && Wall.checkPostClick(s, t, !0)) {
            var o = domNS(domPN(s)),
                r = geByClass1("_header", s),
                i = val(r),
                n = ge("fbgr_" + e + "_that");
            toggle(o), toggleClass(s, "feedback_row_expanded", isVisible(o)), val(r, val(n)), val(n, i)
        }
    },
    notifyPostTooltip: function(e, t, s, o) {
        var r = (s || {}).reply,
            i = "al_wall.php";
        t.indexOf("topic_comment") ? t = t.replace("wall_reply", "").replace("wall", "") : (i = "al_board.php", t = t.replace("topic_comment", "")), o = o || {}, showTooltip(e, extend({
            url: i,
            params: extend({
                act: "post_tt",
                post: t,
                self: 1,
                from: "feedback"
            }, s || {}),
            slide: 15,
            shift: [!r || r % 2 ? 27 : 329, 6],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 800,
            dir: "auto",
            className: "rich wall_tt wall_module _feed_notification",
            appendParentCls: "scroll_fix_wrap"
        }, o))
    },
    notifyDelete: function(e, t, s, o, r, i) {
        r.tt && r.tt.el && r.tt.hide();
        var n = ge("feedback_row" + e),
            a = geByClass1("post_actions", n);
        ajax.post("al_feed.php", {
            act: "a_feedback_delete",
            item: t,
            hash: o,
            types: s,
            candel: i
        }, {
            onDone: function(t) {
                feed.notifyHideReply(e);
                var s = geByClass1("_post_content", n),
                    o = geByClass1("_feedback_deleted", n);
                o ? (o.innerHTML = '<span class="dld_inner">' + t + "</span>", show(o)) : n.appendChild(ce("div", {
                    className: "feedback_row dld _feedback_deleted",
                    innerHTML: '<span class="dld_inner">' + t + "</span>"
                })), hide(s, geByClass1("_answer_wrap", n)), hasClass(n, "feedback_row_clickable") && addClass(n, "feedback_row_touched")
            },
            showProgress: addClass.pbind(a, "post_actions_progress"),
            hideProgress: removeClass.pbind(a, "post_actions_progress")
        })
    },
    notifyUndelete: function(e, t, s, o) {
        var r = ce("span", {
            className: "progress_inline"
        });
        ajax.post("al_feed.php", {
            act: "a_feedback_undelete",
            item: e,
            hash: s,
            types: t
        }, {
            onDone: function(e) {
                var t = gpeByClass("_feedback_deleted", o);
                if (t) {
                    var s = gpeByClass("_post_wrap", t),
                        r = geByClass1("_post_content", s);
                    show(r, geByClass1("_answer_wrap", s)), hide(t), removeClass(s, "feedback_row_touched")
                }
            },
            showProgress: function() {
                o && "button" === o.tagName.toLowerCase() ? lockButton(o) : o.parentNode.replaceChild(r, o)
            },
            hideProgress: function() {
                o && "button" === o.tagName.toLowerCase() ? unlockButton(o) : r.parentNode.replaceChild(o, r)
            }
        })
    },
    notifyMarkSpam: function(e, t, s) {
        ajax.post("al_feed.php", {
            act: "a_feedback_mark_spam",
            item: e,
            hash: s,
            types: t
        }, {
            onDone: function(t) {
                ge("notify_mark_spam_" + e).innerHTML = t
            }
        })
    },
    notifyDeleteAll: function(e, t, s, o) {
        if (cur.notifyDeletingAll || (cur.notifyDeletingAll = {}), !cur.notifyDeletingAll[e]) {
            cur.notifyDeletingAll[e] = 1;
            var r = ce("span", {
                className: "progress_inline"
            });
            ajax.post("al_feed.php", {
                act: "a_feedback_delete_all",
                uid: e,
                item: s,
                hash: t
            }, {
                onDone: function(t, s) {
                    var r = gpeByClass("_feedback_deleted", o);
                    if (1 == s) return void re(gpeByClass("_feed_row", r));
                    var i, n, a = !1;
                    if (hasClass(r, "_top_feedback_deleted") ? (a = !0, i = ge("top_notify_cont")) : i = cur.rowsCont, i && (n = i.firstChild)) {
                        var c, d, l = !1,
                            u = scrollGetY();
                        do n.className && hasClass(n, "_feed_row") && n.firstChild && e == n.firstChild.getAttribute("author") && (c = n.offsetHeight, d = n.offsetTop, l === !1 && (l = getXY(n.offsetParent)[1]), hide(n), u > d + l && (u -= c, scrollToY(u, 0))); while (n = n.nextSibling);
                        (0 === cur.wasScroll || cur.wasScroll > 0) && (cur.wasScroll = u), feed.scrollCheck()
                    }
                    r.innerHTML = '<span class="dld_inner">' + t + "</span>", a && TopNotifier && TopNotifier.refresh()
                },
                showProgress: function() {
                    o && "button" === o.tagName.toLowerCase() ? lockButton(o) : o.parentNode.replaceChild(r, o)
                },
                hideProgress: function() {
                    o && "button" === o.tagName.toLowerCase() ? unlockButton(o) : r.parentNode.replaceChild(o, r)
                }
            })
        }
    },
    ignoreItem: function(post_raw, feed_raw, hash) {
        var postEl = ge("post" + post_raw),
            adData = postEl.getAttribute("data-ad"),
            actMenu = geByClass1("ui_actions_menu_wrap", postEl);
        actMenu && uiActionsMenu.toggle(actMenu, !1), revertLastInlineVideo(postEl), cur.feedEntriesHTML[post_raw] = val(postEl), ajax.post("/al_feed.php?misc", {
            act: "a_ignore_item",
            post_raw: post_raw,
            feed_raw: feed_raw,
            hash: hash,
            ad_data: adData
        }, {
            onDone: function(html, js) {
                val(postEl, html), eval(js)
            },
            stat: ["privacy.js", "privacy.css"]
        })
    },
    unignoreItem: function(e, t, s, o) {
        ajax.post("/al_feed.php?misc", {
            act: "a_unignore_item",
            post_raw: e,
            feed_raw: t,
            hash: s
        }, {
            onDone: function() {
                feed.restorePost(e)
            },
            showProgress: o && lockButton.pbind(o),
            hideProgress: o && unlockButton.pbind(o)
        })
    },
    reportIgnoredItem: function(e, t) {
        ajax.post("al_wall.php", {
            act: "spam",
            post: e,
            hash: t
        }, {
            onDone: function(t) {
                var s = ge("post" + e),
                    o = s && geByClass1("feed_post_report", s, "div");
                val(o, t)
            }
        })
    },
    ignoreOwner: function(e, t, s, o) {
        e && (cur.feedEntriesHTML[e + "_ignored"] = val("post" + e)), ajax.post("/al_feed.php?misc", {
            act: "a_ignore_owner",
            post_raw: e,
            owner_id: t,
            hash: s,
            list: "list" == cur.section && cur.list || 0
        }, {
            onDone: function(s) {
                val("post" + e, s), each(geByClass("post", cur.rowsCont), function(s, o) {
                    var r = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    r && r[1] != e && (!r[4] && r[2] == t || r[4] && r[3] == t) && (revertLastInlineVideo(this), hide(this.parentNode))
                })
            },
            showProgress: o && lockButton.pbind(o),
            hideProgress: o && unlockButton.pbind(o)
        })
    },
    unignoreOwner: function(e, t, s, o) {
        ajax.post("/al_feed.php?misc", {
            act: "a_unignore_owner",
            post_raw: e || "",
            owner_id: t,
            hash: s,
            list: "list" == cur.section && cur.list || 0
        }, {
            onDone: function(s) {
                e ? val("post" + e, cur.feedEntriesHTML[e + "_ignored"]) : val("ignore_row" + t, s), each(geByClass("post", cur.rowsCont), function(e, s) {
                    var o = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
                    o && (!o[4] && o[2] == t || o[4] && o[3] == t) && show(this.parentNode)
                })
            },
            showProgress: o && lockButton.pbind(o),
            hideProgress: o && unlockButton.pbind(o)
        })
    },
    unsubscribe: function(e, t, s) {
        triggerEvent(ge("post_delete" + e), "mouseout"), cur.feedEntriesHTML[e] = ge("post" + e).innerHTML;
        var o = e.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
        o && ajax.post("al_feed.php", {
            act: "unsubscribe",
            type: {
                "": 24,
                photo: 21,
                video: 22,
                topic: 20,
                note: 23,
                market: 25
            }[o[2]],
            owner_id: o[1],
            place_id: o[3],
            hash: t,
            feed: 1
        }, {
            onDone: function(t) {
                ge("post" + e).innerHTML = t.replace("%post_raw%", e)
            },
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    subscribe: function(e, t, s) {
        var o = e.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
        o && ajax.post("al_feed.php", {
            act: "subscribe",
            type: {
                "": 24,
                photo: 21,
                video: 22,
                topic: 20,
                note: 23,
                market: 25
            }[o[2]],
            owner_id: o[1],
            place_id: o[3],
            hash: t,
            feed: 1
        }, {
            onDone: feed.restorePost.pbind(e),
            showProgress: s && lockButton.pbind(s),
            hideProgress: s && unlockButton.pbind(s)
        })
    },
    restorePost: function(e) {
        ge("post" + e).innerHTML = cur.feedEntriesHTML[e];
        var t = geByClass1("input_back", ge("post" + e), "div"),
            s = geByTag1("textarea", ge("post" + e));
        s && (s.placeholder = t.innerHTML, t.parentNode.removeChild(t), placeholderSetup(s))
    },
    toggleReposts: function(e, t, s, o) {
        if (checkEvent(o)) return !0;
        var r = ge("feed_reposts_more" + t + "_" + s),
            i = ge("feed_reposts" + t + "_" + s),
            n = 0,
            a = scrollGetY(),
            c = isVisible(i);
        return i ? (c ? n -= i.offsetHeight + intval(getStyle(e, "marginTop")) : (domPN(domPN(i)) || {}).bits = 0, toggle(i, !c), val(r, c ? getLang("news_show_X_reposts", i.childNodes.length) : getLang("news_hide_reposts")), n && scrollToY(a + n + getSize("page_header")[1], 0), !1) : void(r && re(r.parentNode.parentNode))
    },
    editHidden: function() {
        return showTabbedBox("al_settings.php", {
            act: "a_edit_owners_list",
            list: "feed",
            height: lastWindowHeight
        }, {
            stat: ["ui_controls.js", "ui_controls.css", "indexer.js"]
        }), cur.onOListSave = feed.onHiddenSave, !1
    },
    onHiddenSave: function(e, t, s, o) {
        var r = curBox(),
            i = {
                act: "a_ignore_olist",
                no_reposts: ge("feed_list_reposts") && !isChecked("feed_list_reposts") ? 1 : 0,
                hash: o.hash
            };
        return e.length < t.length ? i.White = e.join(",") : i.Black = t.join(","), ajax.post("al_feed.php", i, {
            onDone: function(e, t) {
                r.hide(), feed.switchSection("photos" == cur.section ? "photos" : "news")
            },
            showProgress: lockButton.pbind(r.btns.ok[0]),
            hideProgress: unlockButton.pbind(r.btns.ok[0])
        }), !1
    },
    addList: function() {
        return feed.editList(-1)
    },
    editList: function(e) {
        return feed.toggleTabsMenu(!1, 0), showTabbedBox("al_settings.php", {
            act: "a_edit_owners_list",
            list: "feed",
            list_id: e,
            height: lastWindowHeight
        }, {
            stat: ["ui_controls.js", "ui_controls.css", "indexer.js"],
            onFail: function(e) {
                return setTimeout(showFastBox({
                    title: getLang("global_error"),
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, e, getLang("global_close")).hide, 4500), !0
            }
        }), cur.onOListSave = feed.onListSave.pbind(e), !1
    },
    onListSave: function(e, t, s, o, r) {
        var i = val("feed_list_name");
        if (!trim(i)) return notaBene("feed_list_name"), !1;
        if (!t.length) return !1;
        var n = curBox();
        return ajax.post("al_feed.php", {
            act: "a_save_list",
            hash: cur.tabs_hash,
            White: t.join(","),
            title: i,
            list_id: e,
            no_reposts: ge("feed_list_reposts") && !isChecked("feed_list_reposts") ? 1 : 0
        }, {
            onDone: function(t) {
                var s = geByClass1("feed_section_list" + e, cur.feedEls.rmenu),
                    o = geByClass1("feed_filter_list" + e, cur.feedEls.rmenu);
                val(s, clean(i)), val(geByClass1("ui_actions_menu_item_label", o), clean(i)), n.hide(), e > 0 ? feed.switchList(e) : nav.go({
                    0: "feed",
                    section: "list",
                    list: t
                }, null, {
                    nocur: !0
                })
            },
            showProgress: lockButton.pbind(n.btns.ok[0]),
            hideProgress: unlockButton.pbind(n.btns.ok[0])
        }), !1
    },
    deleteList: function(e, t, s, o) {
        if (o && cancelEvent(o), 0 >= e) return !1;
        if (s) {
            var r = curBox();
            ajax.post("al_feed.php", extend({
                act: "a_delete_list",
                list_id: e,
                hash: cur.tabs_hash
            }), {
                onDone: function() {
                    re(geByClass1("feed_section_list" + e, cur.feedEls.rmenu)), re(geByClass1("feed_filter_list" + e, cur.feedEls.rmenu)), boxQueue.hideAll(), "list" == cur.section && cur.list == e && feed.switchSection("news")
                },
                showProgress: lockButton.pbind(r.btns.ok[0]),
                hideProgress: unlockButton.pbind(r.btns.ok[0])
            })
        } else {
            feed.toggleTabsMenu(!1, 0);
            var r = showFastBox({
                title: getLang("news_delete_list_sure_title"),
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("news_delete_list_sure").replace("{list}", t), getLang("global_delete"), function() {
                feed.deleteList(e, t, !0)
            }, getLang("global_cancel"), function() {
                r.hide()
            })
        }
    },
    saveTabs: function() {
        ajax.post("al_feed.php", {
            act: "a_save_tabs",
            hash: cur.tabs_hash,
            tabs: cur.my_feed_types.tabs.join(",")
        })
    },
    statsShow: function(e, t) {
        return showWiki({
            w: "stats" + (cur.source || "")
        }, !1, e)
    },
    scrollCheck: function(e) {
        if (cur.idleManager && !cur.isFeedLoading && !cur.idleManager.isIdle && !cur.disableAutoMore) {
            var t = ge("show_more_link");
            if (isVisible(t)) {
                var s, t, o, r, i = feed.longView,
                    n = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                    a = scrollGetY(),
                    c = 0,
                    d = [];
                if (a + n + 1e3 > t.offsetTop && feed.showMore(), (domPN(cur.topRow) != cur.rowsCont || "feed_rows_next" == (cur.topRow || {}).id) && (cur.topRow = domFC(cur.rowsCont)), !(!vk.id || !cur.topRow || "feed_rows_next" == cur.topRow.id || "news" != cur.section && "recommended" != cur.section && "search" != cur.section || ((window.curNotifier || {}).idle_manager || {}).is_idle && "init" != (e || {}).type)) {
                    for (postsUnseen = [], t = domPS(cur.topRow); t; t = domPS(t)) cur.topRow.offsetTop > a && (cur.topRow = t), t.unseen || (t.unseen = !0, postsUnseen.push(Feed.postsGetRaws(t)));
                    for (Page.postsUnseen(postsUnseen), t = cur.topRow; t && (s = c ? c : t.offsetTop, !(s >= a + n)); t = o) o = domNS(t), "feed_rows_next" == (o || {}).id && (o = null), c = o ? o.offsetTop : s + t.offsetHeight, a > c && o && (cur.topRow = o), LongView && LongView.onRegister(t, "feed"), i.registerElement(t) || (r = t.bits || 0, r >= 3 || (r |= (s >= a && a + n > s ? 1 : 0) | (c >= a && a + n > c ? 2 : 0), r && (t.bits = r, 3 == r && d.push(feed.postsGetRaws(t)))));
                    d = d.concat(i.process(a, n)), LongView && LongView.onScroll(a, n), Page.postsSeen(d)
                }
            }
        }
    },
    postsGetRaws: function(e) {
        var t, s, o, r = indexOf(domPN(e).children, e),
            i = domFC(e),
            n = /^post(-?\d+_\d+)$/,
            a = {};
        if (!i) return a;
        a.module = cur.module, a.index = r, "feed" == cur.module && ("search" == cur.section ? (a.module = "feed_search", a.q = cur.q) : "news" == cur.section ? a.module = cur.subsection ? "feed_news_" + cur.subsection : "feed_news" : "recommended" == cur.section ? a.module = cur.subsection ? "feed_recommended_" + cur.subsection : "feed_recommended" : a.module = "feed_other");
        var c = i.getAttribute("data-ad-view");
        if (c && (a["ad_" + c] = 1), s = i.id.match(n)) a[s[1]] = 1;
        else if (t = i.className, s = t.match(/feed_reposts_wrap(-?\d+_\d+)/)) {
            if (o = domFC(i), hasClass(domFC(o), "post_copy") && (a[s[1]] = -1), (s = domFC(o).id.match(n)) && (a[s[1]] = 1), isVisible(o = domNS(o)))
                for (o = domFC(o); o; o = domNS(o))(s = o.id.match(n)) && (a[s[1]] = 1)
        } else if (s = t.match(/feed_repost(-?\d+_\d+)/)) o = domFC(i), hasClass(o, "post_copy") && (a[s[1]] = -1), (s = o.id.match(n)) && (a[s[1]] = 1);
        else {
            var d = i.id;
            hasClass(i, "post_photos") && (o = geByClass1("post_image", i, "a"), o && (o = domFC(o), o && (s = o.getAttribute("data-post-id").match(/^(-?\d+_p?\d+)$/)) && (d = s[1]))), a[d] = 1
        }
        return a
    },
    searchUpdate: function() {
        if (cur.feedEls.search && getLang("news_search")) {
            var e;
            e = cur.section.indexOf("photos") ? cur.section.indexOf("articles") ? getLang("news_search") : getLang("news_articles_search") : getLang("news_photo_search"), cur.feedEls.search.setAttribute("placeholder", clean(unclean(e))), placeholderInit(cur.feedEls.search, {
                reload: !0
            })
        }
    },
    go: function(params, onBeforeReplace, noscroll) {
        if (cur._back_local) {
            var hist = cur._back_local;
            hist.back ? showBackLink(hist.back[0], hist.back[1], hist.back[2]) : showBackLink(!1), cur._back_local = !1
        }
        if (cur.feedReq) try {
            cur.feedReq.abort()
        } catch (e) {
            debugLog(e)
        }
        var frame = 1,
            hideProgress = function() {
                cur.isFeedLoading = !1
            };
        (browser.msie || noscroll) && (frame = !1, hideProgress = cur.onFrameBlocksDone), cur.wasScroll = noscroll ? scrollGetY() : !1, cur.feedReq = ajax.post("al_feed.php", extend(params, {
            part: 1
        }), {
            onDone: function(options, rows, js) {
                if (revertLastInlineVideo(), removeClass(cur.feedEls.wrap, "feed_has_new"), cur.newPostsCount = 0, window.tooltips && tooltips.destroyAll(ge("feed_rows")), boxQueue.hideAll(), layers.fullhide && layers.fullhide(!0), frame && ajax._framenext(), window.wall && wall.cancelEdit(), boxQueue.hideAll(), onBeforeReplace ? onBeforeReplace(rows || "") : val(cur.rowsCont, rows || ""), feed.applyOptions(options, 2), !params.norecom) {
                    val("feed_recommends", options.recommends || "");
                    var str = "/al_feed.php#" + ajx2q({
                        act: "recom"
                    });
                    ajaxCache[str] && delete ajaxCache[str], cur.recomPreload = !1, toggleClass(cur.feedEls.wrap, "feed_asc_shown", geByClass1("feed_asc_block", "feed_recommends"))
                }
                if (js && eval(js), checkPageBlocks(), scrollToTop(0), shortCurrency(), cur.feedEls.wall) {
                    var wallClass = "clear_fix";
                    switch (cur.section) {
                        case "updates":
                            wallClass += " page_block feed_updates";
                            break;
                        case "photos_search":
                            wallClass += " page_block feed_found_photos";
                            break;
                        case "notifications":
                            wallClass += " page_block feed_notifications"
                    }
                }
                ge("feed_wall").className = wallClass, toggle("feed_recommends", inArray(cur.section, ["news", "recommended", "videos"]));
                var _a = window.audioPlayer,
                    aid = currentAudioId();
                _a && aid && _a.showCurrentTrack && _a.showCurrentTrack(), setTimeout(function() {
                    var e = currentAudioId();
                    _a && e && _a.showCurrentTrack && _a.showCurrentTrack()
                }, 100), setTimeout(feed.scrollCheck, 200)
            },
            onFail: function() {
                return !1
            },
            showProgress: function() {
                cur.isFeedLoading = !0
            },
            frame: frame,
            ads: 1,
            hideProgress: hideProgress
        })
    },
    onFeedSearch: function(e, t, s, o) {
        var r, i, n = o || cur.section;
        n.indexOf("photos") ? n.indexOf("articles") ? (r = "search", i = "news") : (r = "articles_search", i = "articles") : (r = "photos_search", i = "photos"), "search" == r || feed.hasSearchParams(feed.getSectionParams(r)) ? (r != cur.section && feed.setSection(r, 1), feed.go(feed.getSectionParams(r)), window.searcher && searcher.highlightHotHashtag(t || val(e))) : feed.go(feed.getSectionParams(i)), uiSearch.onChanged(e), uiSearch.showProgress(e)
    },
    onSearchChange: function() {
        return setTimeout(feed.onFeedSearch.pbind(cur.feedEls.search), 0), !1
    },
    init: function(e) {
        setTimeout(function() {
            each(geByTag("textarea", cur.rowsCont), function() {
                placeholderSetup(this)
            })
        }, 200), extend(cur, {
            oid: e.user_id,
            postTo: e.user_id,
            phCache: {},
            phShown: {},
            subsections: {},
            feed_session_id: e.feed_session_id || "na",
            module: "feed",
            isFeedLoading: !1,
            customSearchChange: feed.onSearchChange,
            wallPostCb: function() {
                "news" == cur.section ? setTimeout(feed.update.pbind(1), 1e3) : setTimeout(feed.switchSection.pbind("news"), 1e3)
            },
            idleManager: function() {
                var e, t, s, o = {
                    isIdle: !1,
                    onIdle: null,
                    onUnIdle: null,
                    stop: function() {
                        removeEvent(document, "mousemove keydown", e), removeEvent(window, "focus blur", s)
                    },
                    start: function() {
                        browser.mobile || (e = function() {
                            cur.idleManager && o.isIdle && (o.isIdle = !1, o.onUnIdle && o.onUnIdle())
                        }, t = function() {
                            cur.idleManager && (o.isIdle = !0, o.onIdle && o.onIdle())
                        }, s = function(s) {
                            "focus" == s.type ? e() : t()
                        }, addEvent(window, "focus blur", s))
                    }
                };
                return o
            }(),
            currentModule: function() {
                return "videos" == cur.section ? "feed_videos" : cur.module
            },
            onFrameBlocksDone: function() {
                cur.isFeedLoading = !1, (0 === cur.wasScroll || cur.wasScroll > 0 || cur.wasScroll === !1 && "search" == cur.section && cur.q && "#" == cur.q.substr(0, 1)) && (cur.wasScroll = !1)
            },
            feedEntriesHTML: {},
            feedUnreadCount: 0,
            feedInitialTitle: "",
            feedUnread: [],
            feedToSort: [],
            feedEls: {
                wrap: ge("main_feed"),
                wall: ge("feed_wall"),
                search: ge("search_query"),
                rmenu: ge("feed_rmenu"),
                newPosts: ge("feed_new_posts")
            }
        }), cur.nav.push(function(e, t, s, o) {
            if (void 0 === e[0]) {
                var r = clone(s);
                if (delete r[0], void 0 === e.section || inArray(cur.section, ["notifications", "replies"]) == inArray(e.section, ["notifications", "replies"])) {
                    if ("notifications" == cur.section) return feed.switchNotifyList(s.list || "all", extend(r, o.params || {})), !1;
                    if (e.list) return feed.switchList(e.list), !1;
                    if (void 0 !== e.section && feed.switchSection(e.section || "news", !1, !0), e.notify) return !1;
                    if (e.q) return val(cur.feedEls.search, e.q), feed.onFeedSearch(cur.feedEls.search), !1;
                    if (delete e.subsection, isEmpty(e)) {
                        var i = geByClass1("feed_section_" + (t.section || "news") + (t.list || ""));
                        i && uiRightMenu.go(i, !1, !1)
                    }
                    return feed.go(extend(r, o.params || {})), !1
                }
            }
        }), cur.idleManager.onUnIdle = feed.updateTitle, cur.idleManager.onIdle = feed.reSortItems, cur.options = cur.options || {}, extend(cur.options, e), feed.applyOptions(e, 3), cur.rowsCont = e.wallCont = ge("feed_rows"), wall.init(e), cur._back = {
            text: getLang("news_return_to_news"),
            show: [feed.startEvents],
            hide: [function() {
                clearInterval(cur.updateInt), removeEvent(window, "scroll", feed.scrollCheck), removeEvent(window, "resize", feed.scrollCheck), cur.idleManager.stop(), clearTimeout(cur.lp_error_to)
            }],
            loc: !1
        }, feed.startEvents();
        var t = window.audioPlayer,
            s = currentAudioId();
        t && s && t.showCurrentTrack && t.showCurrentTrack(), setTimeout(function() {
            feed.scrollCheck({
                type: "init"
            })
        }, 200)
    },
    startEvents: function() {
        cur.idleManager.start(), cur.updateInt = setInterval(function() {
            feed.update(0)
        }, 2e4), addEvent(window, "scroll", feed.scrollCheck), addEvent(window, "resize", feed.scrollCheck)
    },
    mentionClick: function(e, t) {
        var s = e,
            o = ((e.getAttribute("mention") || "").match(/^bp(-?\d+_\d+)$/) || {})[1];
        if (!o) return nav.go(e, t);
        for (o = o.split("_"); e; e = e.parentNode) {
            var r = (e.id || "").match(/^replies(-?\d+_topic\d+)$/);
            if (r) {
                var i = r[1].split("_");
                if (i[0] == o[0]) return wall.showReply(s, r[1], o[0] + "topic_" + o[1], t);
                break
            }
        }
        return nav.go(e, t)
    },
    hideCustomFeedBar: function(e, t, s) {
        return slideUp(e, 200, re.pbind(e)), ajax.post("al_feed.php", {
            act: "hide_custom_feed_bar",
            section: t,
            hash: s
        }), !1
    },
    toggleCustomFeedTab: function(e, t) {
        return hasClass(e, "feed_tab_link_hidden") ? (removeClass(e, "feed_tab_link_hidden"), setCookie("remixcustom_feed_added", t)) : lockButton(e), feed.checkTabsFilter(geByClass1("_feed_custom_" + t), t)
    },
    recomPreload: function() {
        cur.recomPreload || (cur.recomPreload = !0, ajax.post("/al_feed.php", {
            act: "recom",
            section: cur.section
        }, {
            cache: 1
        }))
    },
    recomMore: function(e) {
        if (checkEvent(e) === !1) {
            var t = ge("feed_recom_rows"),
                s = ge("feed_recom_more");
            if (t.childNodes.length > 2) {
                for (getSize(t)[1]; t.childNodes.length > 2;) t.removeChild(t.lastChild);
                return scrollToY(0, 0), hide(s.firstChild.nextSibling), show(s.firstChild), cancelEvent(e)
            }
            return ajax.post("/al_feed.php", {
                act: "recom",
                section: cur.section
            }, {
                cache: 1,
                onDone: function(e) {
                    hide(s.firstChild), show(s.firstChild.nextSibling);
                    for (var t, o = ce("div", {
                            innerHTML: e
                        }), r = ge("feed_recom_rows"); t = o.firstChild;) ge(t.id) ? re(t) : r.appendChild(t);
                    r.childNodes.length % 2 && re(r.lastChild)
                },
                showProgress: function() {
                    hide(s.firstChild), show(s.lastChild)
                },
                hideProgress: function() {
                    show(s.firstChild), hide(s.lastChild)
                }
            }), cancelEvent(e)
        }
    },
    recomSubscribe: function(e, t, s) {
        var o, r, i = s ? t : domPS(t),
            n = s ? domNS(t) : t;
        s ? (o = "/al_feed.php", r = {
            act: "subscr",
            oid: e,
            from: nav.objLoc.section,
            hash: val("feed_recom_hash")
        }) : (o = "/al_fans.php", r = {
            act: "unsub",
            oid: e,
            hash: val("feed_recom_hash"),
            no_response: 1
        }), ajax.post(o, r, {
            onDone: function() {
                toggle(i, !s), toggle(n, !!s), "recommended" != nav.objLoc.section && nav.go(nav.objLoc, !1, {
                    params: {
                        norecom: 1
                    }
                })
            },
            showProgress: lockButton.pbind(t),
            hideProgress: unlockButton.pbind(t)
        })
    },
    infoTopFeedNotification: function(e) {
        Feed.hideTopFeedNotification(e, !1), setTimeout(function() {
            hide("top_feed_notification")
        }, 2500), nav.go("/feed?w=smartfeed")
    },
    hideTopFeedNotification: function(e, t) {
        ajax.post("al_feed.php", {
            act: "hide_top_feed_notification",
            hash: e,
            hide: t ? 1 : 0
        }), t && hide("top_feed_notification")
    },
    hide10YearsBlock: function(e) {
        re("feed_vk10_years"), ajax.post("al_feed.php", {
            act: "hide_vk10_years",
            hash: e
        })
    },
    hideBlogReminder: function(e, t) {
        re("feed_blog_reminder"), ajax.post("blog.php", {
            act: "hide_reminder",
            hash: e,
            nid: t
        }, {
            onDone: function() {}
        })
    },
    preloadVideos: function(e) {
        function t(e) {
            var t = new XMLHttpRequest;
            t.open("GET", e), t.send()
        }
        e && cur.videoAutoplayScrollHandler && (cur.videoAutoplayPreloaded = cur.videoAutoplayPreloaded || {}, each(e, function(e, s) {
            t(s.index_url), t(s.index_url.replace(/index-(.+).m3u8/, "seg-1-$1.ts")), cur.videoAutoplayPreloaded[s.video] = s.quality
        }))
    },
    expandJoinedGroups: function(e, t) {
        cancelEvent(t), show(geByClass1("feed_groups_hidden_list", e.parentNode)), re(e)
    },
    showAllFilters: function(e) {
        re(e);
        for (var t = geByClass("hide", e.parentNode), s = 0; s < t.length; s++) removeClass(t[s], "hide")
    }
};
window.feed = Feed;
try {
    stManager.done("feed.js")
} catch (e) {}