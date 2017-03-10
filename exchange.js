/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 3355553135
    Link: https://vk.com/js/al/exchange.js?3355553135
    Last Update: 10.2.117
*/
var Exchange = {
    initOfficesMenu: function(e) {
        function t() {
            cur.navigationOficesMenu.hide()
        }
        if (window.DropdownMenu && cur.mainNavigationOfficesItems && !cur.navigationOficesMenu) {
            ge("ads_navigation_offices_menu").removeAttribute("onmouseover");
            var a = "";
            a = -1 != location.hash.indexOf("#/") || -1 != location.hash.indexOf("#!") ? location.hash.replace("#/", "").replace("#!", "") : location.pathname + location.search;
            var n, o, r = "",
                c = [];
            for (var i in cur.mainNavigationOfficesItems) {
                c[i] = {}, c[i].onClick = t;
                for (var s in cur.mainNavigationOfficesItems[i]) c[i][s] = cur.mainNavigationOfficesItems[i][s];
                n = "", o = intval(c[i].i), r = "", -1 == c[i].i.indexOf("default") && (n = o, r = "&union_id=" + o);
                var u = "/exchange?act=office" + r,
                    d = !1;
                o ? cur.getOfficeLink ? u = cur.getOfficeLink(n) : a.match(/act=budget(&|$)/) ? u = "/exchange?act=budget" + r : a.match(/act=export_stats(&|$)/) ? u = "/exchange?act=export_stats" + r : a.match(/act=settings(&|$)/) && (u = "/exchange?act=settings" + r) : (u = "/exchange?act=office", d = function(e) {
                    return t(), showWiki({
                        w: "new_ad_union",
                        create: 1
                    }, !1, e, {
                        queue: !0
                    })
                }), c[i].h = u, d && (c[i].onClick = d)
            }
            var h = {
                title: '<span id="ads_navigation_dd_menu_header_text">' + ge("ads_navigation_offices_menu_text").innerHTML + "</span>",
                containerClass: "ads_navigation_dd_menu_header_wrap",
                target: ge("ads_navigation_offices_menu"),
                showHover: !1,
                updateTarget: !1,
                onSelect: function(e) {}
            };
            cur.navigationOficesMenu = new DropdownMenu(c, h), cur.destroy.push(function() {
                cur.navigationOficesMenu.destroy()
            })
        }
    },
    initScroll: function() {
        Exchange.scrollnode = browser.msie6 ? pageNode : window, Exchange.deinitScroll(), window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0, addEvent(Exchange.scrollnode, "scroll", Exchange.scrollCheck), addEvent(window, "resize", Exchange.scrollCheck)
    },
    deinitScroll: function() {
        removeEvent(Exchange.scrollnode, "scroll", Exchange.scrollCheck), removeEvent(window, "resize", Exchange.scrollCheck)
    },
    scrollCheck: function() {
        if (!(browser.mobile || cur.isSearchLoading || cur.disableAutoMore)) {
            var e = document.documentElement,
                t = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                a = scrollGetY(),
                n = ge("exchange_more_results");
            isVisible(n) && a + t + 300 > n.offsetTop && ("A" != n.nodeName && (n = geByTag1("a", n)), n.onclick())
        }
    },
    initCommunitySearch: function() {
        Exchange.initScroll(), cur.destroy.push(function(e) {
            e == cur && Exchange.deinitScroll()
        }), placeholderSetup("exchange_search_input", {
            back: !0
        }), each(["filter_cost_to", "filter_reach", "filter_preach", "filter_size"], function(e, t) {
            placeholderSetup(t), addEvent(t, "change", Exchange.updateCommunitySearch), addEvent(t, "keydown", function(e) {
                e.keyCode == KEY.ENTER && Exchange.updateCommunitySearch()
            })
        })
    },
    getSearchParams: function(e) {
        var t = {
            q: trim(val(e)),
            load: 1,
            cache: 1,
            offset: cur.searchOffset || 0,
            sort: cur.searchSortBy || "",
            r: cur.searchSortRev || 0,
            cost_to: val("filter_cost_to"),
            reach: val("filter_reach"),
            preach: val("filter_preach"),
            size: val("filter_size"),
            category: cur.uiCategory.val(),
            country: cur.uiCountry.val(),
            city: cur.uiCity.val(),
            sex: cur.uiSex.val(),
            age: cur.uiAge.val()
        };
        return t
    },
    sameParams: function(e) {
        if (!cur.params) return !1;
        for (var t in e)
            if (e[t] != cur.params[t]) return !1;
        for (var t in cur.params)
            if (e[t] != cur.params[t]) return !1;
        return !0
    },
    updateCommunitySearch: function(e, t, a, n) {
        e = e || ge("exchange_search_input"), t = t || 10, void 0 != a && (cur.searchSortRev = cur.searchSortRev || cur.searchSortBy != a && "cost" != a ? 0 : 1, cur.searchSortBy = a), n || (cur.searchOffset = 0), clearTimeout(cur.searchTimeout), cur.searchTimeout = setTimeout(function() {
            var t = Exchange.getSearchParams(e);
            (!Exchange.sameParams(t) || cur.ignoreEqual) && (delete cur.ignoreEqual, cur.params = t, Exchange.searchCommunity()), t.offset || scrollToTop()
        }.bind(this), t)
    },
    searchCommunity: function() {
        var e = cur.params || Exchange.getSearchParams(ge("exchange_search_input"));
        ajax.post("/exchange?act=community_search" + (cur.post_id ? "&ad_id=" + cur.post_id : "&union_id=" + cur.union_id), e, {
            cache: 1,
            onDone: function(t, a) {
                var n = ge("exchange_more_results");
                if (e.offset > 0) {
                    var o = ge("exchange_comm_search_table").tBodies[0];
                    if (t) {
                        if (browser.msie) {
                            var r = se("<table>" + t + "</table>"),
                                t = geByTag("tr", r);
                            for (i in t) 1 == t[i].nodeType && o.appendChild(t[i])
                        } else o.insertAdjacentHTML("beforeEnd", t);
                        o.appendChild(n)
                    }
                } else ge("exchange_comm_search_table").innerHTML = t, cur.searchOffset = 0;
                a ? show("exchange_more_results") : hide("exchange_more_results"), each(e, function(e, t) {
                    t && 0 != t && "load" != e && "cache" != e && "offset" != e ? nav.objLoc[e] = t : delete nav.objLoc[e]
                }), nav.setLoc(nav.objLoc)
            },
            showProgress: function() {
                addClass(ge("exchange_search_wrap"), "loading"), cur.isSearchLoading = !0
            },
            hideProgress: function() {
                removeClass(ge("exchange_search_wrap"), "loading"), cur.isSearchLoading = !1
            }
        })
    },
    clearCommunitySearch: function() {
        var e = ge("exchange_search_input");
        val(e, ""), elfocus(e), Exchange.updateCommunitySearch(e)
    },
    searchCommunityShowMore: function() {
        var e = cur.searchOffset || 0;
        return e += cur.searchPerPage, cur.searchOffset = e, hide("exchange_more_results"), Exchange.updateCommunitySearch(ge("exchange_search_input"), 10, void 0, !0), !1
    },
    switchSubTab: function(e, t, a, n, o) {
        if (checkEvent(n) || hasClass(e, "active")) return !1;
        if (each(geByClass("exchange_subtab1", ge(t)), function(e, t) {
                removeClass(t, "active")
            }), addClass(e, "active"), o.part) {
            var r = nav.fromStr(a),
                c = r[0];
            return delete r[0], ajax.post(c, extend(r, {
                part: 1
            }), {
                onDone: o.onDone.pbind(r)
            }), !1
        }
        return nav.go(a, n)
    },
    getPage: function(e, t) {
        var a = clone(nav.objLoc),
            n = a[0];
        return delete a[0], ajax.post(n, extend(a, {
            offset: e,
            part: 1
        }), {
            onDone: function(a) {
                ge(t || "exchange_requests_table_wrap").innerHTML = a, nav.setLoc(extend(nav.objLoc, {
                    offset: e
                }))
            }
        }), !1
    },
    reArrangeRows: function(e) {
        var t = geByClass(e),
            a = 0;
        t.length || nav.reload();
        for (var n in t) toggleClass(t[n], "even", a++ % 2 > 0)
    },
    addRequest: function(e, t, a, n) {
        return !showBox("/exchange", {
            act: "a_request_box",
            gid: e,
            ad_id: t,
            from_office: a,
            cost_max: n
        }, {
            params: {
                width: "430px",
                dark: !0,
                bodyStyle: "padding: 0px;",
                hideButtons: !0
            },
            onFail: nav.reload
        })
    },
    deleteRequest: function(e, t, a, n, o, r) {
        var c = "line-height: 160%; padding: 16px 20px;";
        r && (c += " background-color: #F7F7F7");
        var i = r ? 370 : 430,
            s = function() {
                ajax.post("/exchange", {
                    act: "a_delete_request",
                    gid: e,
                    ad_id: t,
                    request_id: a,
                    from_office: n,
                    comment: ge("exchange_box_comment") && val("exchange_box_comment") || "",
                    hash: o
                }, {
                    progress: curBox().progress,
                    onDone: function() {
                        curBox().hide(), re("exchange_request" + a), Exchange.reArrangeRows("exchange_request_row")
                    },
                    onFail: function(e) {
                        return ge("exchange_box_error").innerHTML = e, show("exchange_box_error"), !0
                    }
                })
            };
        cur.doDeleteRequest = s;
        showFastBox({
            title: getLang("ads_posts_sure_delete_title"),
            dark: !0,
            width: i,
            bodyStyle: c,
            hideButtons: r
        }, '<div id="exchange_box_error" class="error" style="display: none;"></div><div>' + getLang("ads_posts_sure_delete_text") + '</div><div id="exchange_box_comment_wrap" class="clear_fix" style="display:none;"><textarea id="exchange_box_comment" placeholder="' + getLang("ads_posts_delete_placeholder") + '" onkeypress="onCtrlEnter(event, cur.doDeleteRequest)"></textarea><div class="exchange_box_send_wrap button_blue fl_r"><button id="exchange_box_send" onclick="cur.doDeleteRequest()">' + getLang("ads_posts_delete") + "</button></div></div>", getLang("ads_posts_delete"), s, getLang("global_cancel"));
        return r && (show("exchange_box_comment_wrap"), placeholderSetup("exchange_box_comment", {
            back: !0
        }), autosizeSetup("exchange_box_comment", {
            minHeight: 45,
            maxHeght: 200
        })), !1
    },
    checkFromAndToDates: function() {
        var e = new Date(1e3 * val("exchange_request_time_from_d")),
            t = new Date(1e3 * val("exchange_request_time_to_d"));
        100 * e.getHours() + e.getMinutes() > 100 * t.getHours() + t.getMinutes() ? show(ge("exchange_request_box_next_day")) : hide(ge("exchange_request_box_next_day"))
    },
    sendRequest: function(e, t, a, n, o, r) {
        return ajax.post("/exchange", {
            act: "a_save_request",
            ad_id: t,
            gid: e,
            price: a,
            from_office: o,
            hash: n,
            text: val("exchange_request_comment"),
            time_from: val("exchange_request_time_from_d"),
            time_to: val("exchange_request_time_to_d"),
            date_from: val("exchange_request_date_from"),
            date_to: val("exchange_request_date_to")
        }, {
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r),
            onDone: function(e) {
                curBox().hide();
                var t = showFastBox({
                    title: getLang("ads_posts_request_sent_title"),
                    dark: !0,
                    width: 430,
                    bodyStyle: "line-height: 160%; padding: 16px 20px;"
                }, e.message);
                return setTimeout(function() {
                    t.hide()
                }, 3e3), !0
            },
            onFail: function(e) {
                return ge("exchange_request_box_error").innerHTML = e, show("exchange_request_box_error"), !0
            }
        }), !1
    },
    updatePostActions: function() {
        ajax.post("/exchange", {
            act: "a_update_actions",
            ad_id: cur.ad_id
        }, {
            showProgress: function() {
                lockButton(ge("exchange_status_btn"))
            },
            hideProgress: function() {
                unlockButton(ge("exchange_status_btn"))
            },
            onDone: function(e) {
                ge("exchange_post_info_actions").innerHTML = e
            },
            onFail: function(e) {
                return Exchange.showError(e), !0
            }
        })
    },
    editPost: function() {
        return this.showMsg(getLang("ads_posts_edit_notice")), cur.startedEditingPost = !1, cur.exchangeCheckEditPostTimer = setInterval(function() {
            cur.editingPost && !cur.startedEditingPost ? cur.startedEditingPost = !0 : !cur.editingPost && cur.startedEditingPost && (cur.startedEditingPost = !1, Exchange.updatePostActions(), cur.exchangeCheckEditPostTimer && (clearInterval(cur.exchangeCheckEditPostTimer), cur.exchangeCheckEditPostTimer = null))
        }, 500), wall.editPost(!1, cur.postRaw, {
            from: "exchange"
        }, !1, Exchange.showFullPost)
    },
    showFullPost: function() {
        removeClass("exchange_post_msg_wrap", "short"), setStyle("exchange_post_msg", {
            maxHeight: "none"
        })
    },
    slideFullPost: function() {
        if (ge("exchange_post_msg_wrap") || hasClass("exchange_post_msg_wrap", "short")) {
            var e = getSize(ge("wpt" + cur.postRaw))[1];
            animate(ge("exchange_post_msg"), {
                maxHeight: e
            }, 200, Exchange.showFullPost), animate(ge("exchange_post_msg_more"), {
                height: 0
            }, 200)
        }
    },
    archivePost: function(e, t, a, n) {
        var o = function(e, t, a) {
            addClass("exchange_info_archive", "loading"), ajax.post("/exchange", {
                act: "a_archive",
                ad_id: e,
                status: t,
                from: n || "",
                hash: a
            }, {
                onDone: function(e) {
                    ge("exchange_info_archive") && (ge("exchange_info_archive").innerHTML = e), toggle("exchange_info_actions", 2 != t), toggle("exchange_info_in_archive", 2 == t)
                },
                hideProgress: removeClass.pbind("exchange_info_archive", "loading")
            })
        };
        if (2 == t) var r = showFastBox({
            title: getLang("ads_posts_sure_archive_title"),
            dark: !0,
            width: 430,
            bodyStyle: "line-height: 160%; padding: 16px 20px;"
        }, getLang("ads_posts_sure_archive_text"), getLang("ads_posts_archive_btn"), function() {
            r.hide(), o(e, t, a, n)
        }, getLang("global_cancel"));
        else o(e, t, a, n);
        return !1
    },
    changeStatusLink: function(e, t, a, n) {
        function o() {
            e.parentNode.replaceChild(i, e)
        }

        function r() {
            i.parentNode.replaceChild(e, i)
        }

        function c(t) {
            t && (e.parentNode.innerHTML = t)
        }
        var i = ce("img", {
            src: "/images/upload.gif"
        });
        return Exchange.changeStatus(t, a, n, !1, !1, o, r, c)
    },
    changeStatus: function(e, t, a, n, o, r, c, i) {
        if (3 != t || o) {
            var s = curBox(),
                u = {
                    ad_id: e,
                    status: t,
                    hash: a,
                    from: i ? "table" : "button"
                };
            n && (u = extend(u, n)), ajax.post("/exchange?act=a_change_status", u, {
                onDone: function(e, t) {
                    if (s && s.onDone) s.onDone(e), s.hide();
                    else if (i) i(e);
                    else {
                        s && s.hide();
                        var a = ge("exchange_info_status").parentNode.parentNode;
                        ge("exchange_status_btn").parentNode.parentNode.innerHTML = e, t ? (ge("exchange_info_status").innerHTML = t, show(a)) : hide(a)
                    }
                },
                onFail: function(e) {
                    var t = e ? e : getLang("ads_error_unexpected_error_try_later");
                    return s ? Exchange.showError(e, s.bodyNode) : showFastBox(getLang("ads_cant_start_offer_box_title"), t), !0
                },
                showProgress: function() {
                    s && s.showProgress(), r ? r() : s || lockButton("exchange_status_btn")
                },
                hideProgress: function() {
                    s && s.hideProgress(), c ? c() : s || unlockButton("exchange_status_btn")
                }
            })
        } else {
            var s = showBox("/exchange", {
                act: "a_review_box",
                ad_id: e,
                hash: a
            }, {
                params: {
                    width: 450,
                    bodyStyle: "padding: 20px;"
                },
                dark: 1,
                onFail: Exchange.onBoxFail
            });
            s.postData = function(n) {
                Exchange.changeStatus(e, t, a, n, !0, r, c, i)
            }, i && requestBox(s, i)
        }
    },
    showMsg: function(e, t) {
        re("exchange_error");
        var a = ge("exchange_msg");
        if (!a) {
            var n = t || ge("ads_page");
            a = n.insertBefore(ce("div", {
                id: "exchange_msg",
                className: "msg"
            }), n.firstChild)
        }
        return a.innerHTML = e, a.style.backgroundColor = "#F4EBBD", animate(a, {
            backgroundColor: "#F9F6E7"
        }, 2e3), !0
    },
    showError: function(e, t) {
        re("exchange_msg");
        var a = ge("exchange_error");
        if (!a) {
            var n = t || ge("ads_page");
            a = n.insertBefore(ce("div", {
                id: "exchange_error",
                className: "error"
            }), n.firstChild)
        }
        return a.innerHTML = e, a.style.backgroundColor = "#FACEBB", animate(a, {
            backgroundColor: "#FFEFE8"
        }, 2e3), !0
    },
    onBoxFail: function(e) {
        return e || (e = getLang("global_unknown_error")), setTimeout(function() {
            showFastBox(getLang("ads_error_box_title"), e)
        }, 1), !0
    },
    createUnion: function(e, t) {
        return ajax.post("/exchange?act=a_new_union", {
            hash: t
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onFail: function(e) {
                return e && (ge("exchange_new_union_error").innerHTML = e, show("exchange_new_union_error")), !0
            }
        }), !1
    },
    checkMessageURLs: function(e, t) {
        var a, n = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?(\#.*?)?)(&nbsp;|[ \t\r\n \u00A0]|$)/i;
        if (e && (a = e.match(n))) {
            e = e.substr(a.index + a[0].length);
            var o = a[2],
                r = a[5] || "";
            o.match(/^https?:\/\//) || (o = "http://" + o);
            var c = !1;
            return a[4].match(/(^|\.|\/\/)(vkontakte\.ru|vk\.com)/) && (c = r.match(/wall(-?\d+_?\d+)$/)), c = c && c[1] ? c[1] : !1
        }
    },
    reInitComposer: function(e) {
        var t = data(cur.pbField, "composer");
        t && Composer.reset(t), Wall.deinitComposer(cur.pbField), Wall.initComposer(cur.pbField, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            media: {
                lnk: domFC(ge("pb_add_media")),
                preview: ge("pb_media_preview"),
                types: e ? cur.repostTypes : cur.postTypes,
                options: {
                    limit: e ? 1 : 10,
                    disabledTypes: e ? ["album", "share", "link", "page"] : void 0,
                    toggleLnk: !0,
                    nocl: e ? 1 : void 0,
                    editable: e ? void 0 : 1,
                    sortable: e ? void 0 : 1,
                    teWidth: 450,
                    teHeight: 260
                },
                checkLen: e ? void 0 : PostBox.postChanged
            }
        })
    },
    addClient: function(e) {
        return !showBox("/exchange", {
            act: "a_create_client_box",
            union_id: e
        }, {
            params: {
                width: "315px",
                dark: !0,
                bodyStyle: "padding: 20px;"
            }
        })
    },
    createClient: function(e, t) {
        var a = trim(val("new_union_name"));
        return a ? void ajax.post("/exchange?act=a_create_client", {
            union_id: e,
            hash: t,
            name: a
        }, {
            onFail: function(e) {
                return curBox() && Exchange.showError(e, curBox().bodyNode), !0
            }
        }) : void notaBene("new_union_name")
    },
    changePeriod: function(e, t) {
        if (!cur.loadingPeriod) {
            cur.loadingPeriod = !0;
            var a = clone(nav.objLoc);
            delete a[0], ajax.post("/exchange", extend(a, {
                period: e,
                load: 1
            }), {
                cache: 1,
                hideProgress: function() {
                    cur.loadingPeriod = !1
                },
                onDone: function(e, t) {
                    ge("exchange_clients_list").innerHTML = e, ge("exchange_stats_period_tabs").innerHTML = t
                }
            })
        }
    },
    openHelpBox: function(e, t) {
        return showBox("/exchange?act=a_help_text_box", {
            type: e,
            union_id: t
        }, {
            params: {
                width: 450,
                dark: 1,
                bodyStyle: "padding: 20px;"
            },
            cache: 1
        }), !1
    },
    initExportStats: function(e, t, a, n) {
        cur.topUnionId = e, cur.watchControls = t, cur.unionCreatedDate = a, cur.exportStatsHash = n, cur.storedDate = {}, Ads.getNamespace("exchange_export_stats").stats_period.options.onSelect = Exchange.onExportStatsPeriodChanged
    },
    onExportStatsPeriodChanged: function(e) {
        switch (e.target.index) {
            default: cur.exportUi.start_time.setMode("d"),
            cur.storedDate.start_time && cur.exportUi.start_time.setDate(cur.storedDate.start_time.year, cur.storedDate.start_time.month, cur.storedDate.start_time.day),
            cur.exportUi.stop_time.setMode("d"),
            cur.storedDate.stop_time && cur.exportUi.stop_time.setDate(cur.storedDate.stop_time.year, cur.storedDate.stop_time.month, cur.storedDate.stop_time.day);
            break;
            case 1:
                    cur.exportUi.start_time.setMode("m"),
                cur.exportUi.stop_time.setMode("m");
                break;
            case 2:
                    cur.exportUi.start_time.setMode("d"),
                cur.exportUi.stop_time.setMode("d"),
                cur.storedDate.start_time = clone(cur.exportParamsData.start_time),
                cur.storedDate.stop_time = clone(cur.exportParamsData.stop_time),
                cur.exportUi.start_time.setDate(cur.unionCreatedDate.year, cur.unionCreatedDate.month, cur.unionCreatedDate.day),
                cur.exportUi.stop_time.setDate(),
                cur.exportUi.start_time.setMode("h"),
                cur.exportUi.stop_time.setMode("h")
        }
    },
    submitExportStatsForm: function() {
        if (!Ads.lock("exchange_stat_export", function() {
                lockButton(cur.exportExchangeStatButton)
            }, function() {
                unlockButton(cur.exportExchangeStatButton)
            })) return !1;
        var e = 0 == Ads.getNamespace("exchange_export_stats").export_method.value,
            t = cur.topUnionId ? "&union_id=" + cur.topUnionId : "",
            a = "dwcookie",
            n = Math.random(),
            o = {
                method: "post",
                action: "/exchange?act=get_export_stats" + t
            };
        if (e) {
            var r = {};
            for (var c in cur.watchControls) r[cur.watchControls[c]] = Ads.getNamespace("exchange_export_stats")[cur.watchControls[c]].value;
            r.start_time = cur.exportParamsData.start_time.year + ("0" + cur.exportParamsData.start_time.month).slice(-2) + ("0" + cur.exportParamsData.start_time.day).slice(-2), r.end_time = cur.exportParamsData.stop_time.year + ("0" + cur.exportParamsData.stop_time.month).slice(-2) + ("0" + cur.exportParamsData.stop_time.day).slice(-2), r.dwcookie = n, r.hash = cur.exportStatsHash, ajax.post("/exchange?act=get_export_stats" + t, r, {
                onDone: function(e) {
                    ge("exchange_stats_content").innerHTML = e
                },
                onFail: function(e) {
                    return showFastBox({
                        title: getLang("global_error"),
                        width: 350
                    }, e), !0
                }
            })
        } else {
            var i = ce(browser.msie && browser.version < 9 ? '<iframe name="secret_iframe">' : "iframe", {
                name: "secret_iframe",
                id: "secret_iframe"
            });
            i.style.display = "none", document.body.appendChild(i), o.target = "secret_iframe";
            var s = ce("form", o);
            for (var c in cur.watchControls) s.appendChild(ce("input", {
                type: "hidden",
                name: cur.watchControls[c],
                value: Ads.getNamespace("exchange_export_stats")[cur.watchControls[c]].value
            }));
            s.appendChild(ce("input", {
                type: "hidden",
                name: "start_time",
                value: cur.exportParamsData.start_time.year + ("0" + cur.exportParamsData.start_time.month).slice(-2) + ("0" + cur.exportParamsData.start_time.day).slice(-2)
            })), s.appendChild(ce("input", {
                type: "hidden",
                name: "hash",
                value: cur.exportStatsHash
            })), s.appendChild(ce("input", {
                type: "hidden",
                name: "end_time",
                value: cur.exportParamsData.stop_time.year + ("0" + cur.exportParamsData.stop_time.month).slice(-2) + ("0" + cur.exportParamsData.stop_time.day).slice(-2)
            })), s.appendChild(ce("input", {
                type: "hidden",
                name: "dwcookie",
                value: n
            })), document.body.appendChild(s), s.submit()
        }
        var u = setInterval(function() {
            -1 != document.cookie.indexOf(a + "=" + n + "-error") && (clearInterval(u), Ads.unlock("exchange_stat_export"), e || showFastBox({
                title: getLang("global_error"),
                width: 350
            }, getLang("global_error"))), -1 != document.cookie.indexOf(a + "=" + n) && (clearInterval(u), Ads.unlock("exchange_stat_export"))
        }, 500)
    },
    createExportSubmitButton: function(e) {
        cur.exportExchangeStatButton = e, (new Image).src = "/images/upload_inv.gif", createButton(e, function() {
            Exchange.submitExportStatsForm()
        })
    }
};
try {
    stManager.done("exchange.js")
} catch (e) {}