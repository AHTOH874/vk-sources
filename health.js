/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2993570139
    Link: https://vk.com/js/al/health.js?2993570139
    Last Update: 10.2.117
*/
var Health = {};
Health.toggleDistributionGraph = function(e, t, a) {
    var h = ge("health_distribution_graph_" + t),
        s = ge("health_distribution_graph_" + a);
    isVisible(h) ? (show(s), hide(h)) : (show(h), hide(s))
}, Health.toggleSmallGraphs = function(e, t) {
    function a(e, t) {
        var a = t.getAttribute("src2");
        a && (t.removeAttribute("src2"), t.setAttribute("src", a))
    }
    var h = e.target.parentNode.parentNode,
        s = geByClass1("selected", h);
    removeClass(s, "selected"), addClass(e.target, "selected"), nav.setLoc(e.target.getAttribute("href").replace(/^\//, "")), "count" === t ? (each(geByTag("img", ge("health_small_graphs_count")), a), show("health_small_graphs_count"), hide("health_small_graphs_time")) : (each(geByTag("img", ge("health_small_graphs_time")), a), show("health_small_graphs_time"), hide("health_small_graphs_count"))
};
try {
    stManager.done("health.js")
} catch (e) {}