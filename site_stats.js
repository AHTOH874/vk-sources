/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 3102281884
    Link: https://vk.com/js/al/site_stats.js?3102281884
    Last Update: 10.2.117
*/
var SiteStats = {
    toggleSmallGraphs: function(e, s) {
        var a = e.target.parentNode.parentNode,
            t = geByClass1("selected", a);
        removeClass(t, "selected"), addClass(e.target, "selected"), nav.setLoc(e.target.getAttribute("href").replace(/^\//, "")), each(geByClass("site_stats_small_graphs", ge("site_stats_page")), hide), each(geByTag("img", ge("site_stats_small_graphs_" + s)), function(e, s) {
            s.setAttribute("src", s.getAttribute("src1"))
        }), show("site_stats_small_graphs_" + s)
    },
    toggleDemographyGraphs: function() {
        return isVisible("demography_graphs") ? (hide("demography_graphs"), show("demography_charts")) : (hide("demography_charts"), show("demography_graphs")), !1
    },
    updateSankeyData: function(e, s) {
        return e && e.sankey_id && s ? (e.game_id || (e.game_id = s.source_id[e.sankey_id]), ajax.post("site_stats.php", e, {
            onDone: function(a) {
                s.sankeyLinks[e.sankey_id] = a.links, s.sankeyNodes[e.sankey_id] = a.nodes, s.changeSvgSankeys(null, e.sankey_id, 0)
            }
        }), !1) : !1
    },
    updateTable: function(e) {
        return e && e.table_id && ge(e.table_id) ? (ajax.post("site_stats.php", e, {
            onDone: function(s) {
                ge(e.table_id).innerHTML = s
            },
            showProgress: show.pbind("ref_table_progress"),
            hideProgress: hide.pbind("ref_table_progress")
        }), !1) : !1
    },
    updateReferrersTable: function(e) {
        return e ? (e = extend(cur.statsTableParams || {}, e), e.act = "referrers", e.upd = 1, ajax.post("site_stats.php", e, {
            onDone: function(e) {
                cur.statsTableParams = e.params, ge("site_stats_navigation").innerHTML = e.nav, "visitors" == e.params.value_type ? (removeClass("table_value_type1", "graph_menu_item_sel"), addClass("table_value_type2", "graph_menu_item_sel")) : (removeClass("table_value_type2", "graph_menu_item_sel"), addClass("table_value_type1", "graph_menu_item_sel"));
                var s = "keywords" == e.params.page ? ge("searchers_sel") : ge("sources_sel");
                if (s) {
                    var a = geByTag("a", s);
                    e.params.searcher = e.params.searcher || 0;
                    for (var t in a) t == e.params.searcher ? addClass(a[t], "site_stats_tbl_control_active") : removeClass(a[t], "site_stats_tbl_control_active")
                }
                var r = cur.statsTable._curSortOrder,
                    n = cur.statsTable.curPage;
                cur.statsTable.setOptions(e.options), cur.statsTable.setContent(e.content), cur.statsTable.applyData(), cur.statsTable._initSearchHashes(), void 0 !== r && cur.statsTable.setSortingOrder(r[0], r[1]), cur.statsTable.goToPage(n);
                var o = nav.objLoc;
                extend(o, e.params), nav.setLoc(o)
            },
            showProgress: show.pbind("ref_table_progress"),
            hideProgress: hide.pbind("ref_table_progress")
        }), !1) : !1
    },
    showReferrersStat: function(e, s, a) {
        return showBox("site_stats.php", {
            act: "a_referrers_box",
            type: e,
            oid: s,
            word: a
        }, {
            params: {
                width: 650,
                hideButtons: !0,
                bodyStyle: "padding: 15px 25px;"
            },
            onFail: function() {
                return !0
            }
        }), !1
    }
};
try {
    stManager.done("site_stats.js")
} catch (e) {}