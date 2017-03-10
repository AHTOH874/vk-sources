/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 3953380422
    Link: https://vk.com/js/al/ui.js?3953380422
    Last Update: 10.2.117
*/
var Ui = {};
Ui.tableInitFilters = function(e) {
    var t = e.getAttribute("ui_table_filter_id");
    Ui.tableInitFilterDropdowns(e), t && (uiSearch.init(ge(t)), setTimeout(elfocus.pbind(ge(t)), 0)), Ui.tableUpdateFilterTerm(e)
}, Ui.tableInitFilterDropdowns = function(e) {
    var t, i = e.getAttribute("ui_table_filter_id");
    e.uiFilterDropdowns = {}, each(geByClass("ui_table_filter_dropdown", ge(i).parentNode), function(i, r) {
        t = r.getAttribute("data-column"), e.uiFilterDropdowns[t] = new InlineDropdown(r, {
            withArrow: !0,
            onSelect: Ui.tableUpdateFilterTerm.pbind(e)
        })
    })
}, Ui.tableUpdateFilterTerm = function(e) {
    var t, i = e.getAttribute("ui_table_filter_id"),
        r = e.getAttribute("ui_filter_text_column"),
        s = {};
    each(e.uiFilterDropdowns || {}, function(e, i) {
        t = i.val().trim(), t && (s[e] = t)
    }), t = val(i).trim(), t && (s[r] = t), Ui.tableFilterRows(e, s)
}, Ui.tableSetFilterTerm = function(e, t, i) {
    i = i.split(",");
    var r = t;
    "string" == typeof r && (r = {}, r[i[0]] = trim(t));
    var s, a, n = [];
    for (var u in i) a = i[u], s = a in r ? "[^~]*" + r[a].replace(/[~]/g, "") + "[^~]*" : "[^~]*", n.push(a + "=" + s);
    t = "~" + n.join("~") + "~";
    var l = e.getAttribute("ui_filter_term");
    if (l === t) return !1;
    if (e.setAttribute("ui_filter_term", t), 0 == t.length) return e.removeAttribute("ui_filter_rows_indices"), !0;
    var o, _, b, d = e.getAttribute("ui_filter_data"),
        g = parseJSON(e.getAttribute("ui_filter_index")),
        p = [],
        f = 0,
        c = 0;
    for (t = t.replace(/[|]/g, ""), o = new RegExp(t, "gi"), b = {}; null != (_ = o.exec(d));) p.push(_.index);
    for (var h in g) {
        for (; f < p.length && p[f] < h;) b[g[h]] || (b[g[h]] = 1, c++), f++;
        if (f >= p.length) break
    }
    return e.setAttribute("ui_filter_rows_indices", JSON.stringify(b)), c
}, Ui.tableOnclick = function(e, t) {
    var i = vkNow(),
        e = normEvent(e || window.event),
        r = t.getAttribute("ui_table_header_id"),
        s = t.getAttribute("ui_table_rows_id"),
        a = t.getAttribute("ui_table_more_id"),
        n = t.getAttribute("ui_table_excluded_id"),
        u = t.getAttribute("ui_table_shower_id"),
        l = t.getAttribute("ui_table_result_id"),
        o = t.getAttribute("ui_table_pages_id"),
        _ = t.getAttribute("ui_group_key"),
        b = ge(r),
        d = ge(s),
        g = ge(a),
        p = ge(n),
        f = ge(u),
        c = ge(l),
        h = ge(o),
        w = e.target,
        v = !1,
        m = !1,
        A = !1,
        U = !1,
        C = !1,
        y = !1,
        S = 0;
    if (d) {
        for (; w && w !== t && w !== b && w !== d && w !== g && w !== f && w !== c && w !== h;) "TH" === w.nodeName ? v = w : "TD" === w.nodeName ? m = w : w.hasAttribute("ui_page_number") ? y = w : w.hasAttribute("ui_per_page_limit") ? C = w : w.hasAttribute(_) ? (A = w, S = Math.abs(intval(w.getAttribute(_)))) : A && "TR" === w.nodeName && (U = w), w = w.parentNode;
        w === b && v ? Ui.tableUpdateSort(t, d, g, p, v, !0) : w !== d && w !== g && w !== c || !U ? w === f && m ? Ui.tableUpdateShower(t, g, f, m) : w === h && C ? Ui.tableUpdatePerPageLimit(t, b, d, g, p, C) : w === h && y && Ui.tableUpdatePageNumber(t, b, d, g, p, y) : Ui.tableUpdateHiderGroup(d, g, U, S);
        var N = vkNow(),
            O = (document.body.offsetHeight, vkNow());
        window.debugLog && debugLog("Table click time JS: ", N - i, ", time with reflow: ", O - i)
    }
}, Ui.tableOnFilterKeypress = function(e, t) {
    e.target;
    Ui.tableFilterTimeout && clearTimeout(Ui.tableFilterTimeout), Ui.tableFilterTimeout = setTimeout(function() {
        Ui.tableUpdateFilterTerm(ge(t))
    }, 200)
}, Ui.tableClearRowsSortCache = function(e) {
    e.t_rows_sort && delete e.t_rows_sort
}, Ui.tableGetRowsSort = function(e, t, i, r, s, a) {
    var n = !isObject(s),
        u = e.t_rows_sort;
    if (!u) {
        var l, o, _, b, d;
        u = [];
        for (var g = 0; b = [t, i, r][g]; ++g) {
            l = b.children;
            for (var p = 0; d = l[p]; p++) o = intval(d.getAttribute("ui_sort_index")), u[o] || (u[o] = {}), u[o].row = d, u[o].hasOwnProperty("excludedByFilter") || (u[o].excludedByFilter = !n && !s[o]), !n && s[o] && o in a && (_ = a[o], _ && (u[_] || (u[_] = {}), u[_].excludedByFilter = !1))
        }
        Object.defineProperty && (Object.defineProperty(e, "t_rows_sort", {
            configurable: !0,
            writable: !0
        }), e.t_rows_sort = u)
    }
    return u
}, Ui.tableGetAllIndices = function(e, t) {
    function i(e, t) {
        if (e[2] < 0 && t[2] < 0) {
            if (e[1] != t[1]) return e[1] < t[1] ? -1 : 1;
            if (e[4] || t[4]) return e[0] < t[0] ? -2 : 2;
            if (e[0] != t[0]) return e[0] < t[0] ? -1 : 1
        } else if (e[2] >= 0 && t[2] >= 0) {
            if (e[3] != t[3]) return e[3] < t[3] ? -1 : 1;
            if (e[2] != t[2]) return e[2] < t[2] ? -1 : 1;
            if (e[1] != t[1]) return e[1] < t[1] ? -1 : 1;
            if (e[4] || t[4]) return e[0] < t[0] ? -2 : 2;
            if (e[0] != t[0]) return e[0] < t[0] ? -1 : 1
        } else {
            if (e[2] >= 0) return e[3] != t[1] ? e[3] < t[1] ? -1 : 1 : t[4] ? 2 : e[2] != t[0] ? e[2] < t[0] ? -1 : 1 : 2;
            if (t[2] >= 0) return e[1] != t[3] ? e[1] < t[3] ? -1 : 1 : e[4] ? -2 : e[0] != t[2] ? e[0] < t[2] ? -1 : 1 : -2
        }
        return 0
    }

    function r(e, t) {
        return result = i(e, t), (1 == result || -1 == result) && (result *= -1), result
    }
    var s, a, n, u;
    if (n = e.p_group_indices, n || (n = e.getAttribute("ui_group_indices"), n = n ? parseJSON(n) : {}, Object.defineProperty && (Object.defineProperty(e, "p_group_indices", {
            configurable: !0,
            writable: !0
        }), e.p_group_indices = n)), u = e.p_wide_indices, u || (u = e.getAttribute("ui_wide_indices"), u = u ? parseJSON(u) : {}, Object.defineProperty && (Object.defineProperty(e, "p_wide_indices", {
            configurable: !0,
            writable: !0
        }), e.p_wide_indices = u)), s = t ? t.p_sort_indices_asc : [], a = t ? t.p_sort_indices_desc : [], !s && (s = t.getAttribute("ui_sort_indices_asc"), a = t.getAttribute("ui_sort_indices_desc"), s)) {
        s = s.split(","), a = a.split(",");
        for (var l in s) s[l] = intval(s[l]);
        for (var l in a) a[l] = intval(a[l])
    }
    if (!s) {
        s = [], a = [];
        var o, _, b = t.getAttribute("ui_sort_data"),
            d = [];
        if (!b) return;
        b = b.split("!");
        var g = b.shift();
        if ("int" === g)
            for (var l = 0, p = b.length; p > l; l++) o = l in n ? n[l] : -1, _ = intval(b[o]), u[l] ? d[l] = [l, d[l - 1][1], d[l - 1][2], d[l - 1][3], 1] : d[l] = [l, intval(b[l]), o, _, 0];
        else if ("float" === g)
            for (var l = 0, p = b.length; p > l; l++) o = l in n ? n[l] : -1, _ = floatval(b[o]), u[l] ? d[l] = [l, d[l - 1][1], d[l - 1][2], d[l - 1][3], 1] : d[l] = [l, floatval(b[l]), o, _, 0];
        else
            for (var l = 0, p = b.length; p > l; l++) o = l in n ? n[l] : -1, _ = b[o], u[l] ? d[l] = [l, d[l - 1][1], d[l - 1][2], d[l - 1][3], 1] : d[l] = [l, b[l], o, _, 0];
        d.sort(i);
        for (var l = 0, p = d.length; p > l; l++) s.push(d[l][0]);
        d.sort(r);
        for (var l = 0, p = d.length; p > l; l++) a.push(d[l][0]);
        t.setAttribute("ui_sort_indices_asc", s.join(",")), t.setAttribute("ui_sort_indices_desc", a.join(",")), Object.defineProperty && (Object.defineProperty(t, "p_sort_indices_asc", {
            configurable: !0,
            writable: !0
        }), Object.defineProperty(t, "p_sort_indices_desc", {
            configurable: !0,
            writable: !0
        }), t.p_sort_indices_asc = s, t.p_sort_indices_desc = a)
    }
    return [s, a, n]
}, Ui.tableUpdateEven = function(e, t) {
    var i, r, s, a, n = 0;
    i = e.children;
    for (var u, l = 0; u = i[l]; l++) r = hasClass(u, "unshown"), s = hasClass(u, "wide"), r || (a = "ui_table_row", a += n % 2 ? " even" : "", a += s ? " wide" : "", u.className = a, n++, s && (n = 1));
    if (isVisible(t)) {
        i = t.children;
        for (var u, l = 0; u = i[l]; l++) r = hasClass(u, "unshown"), s = hasClass(u, "wide"), r || (a = "ui_table_row", a += n % 2 ? " even" : "", a += s ? " wide" : "", u.className = a, n++, s && (n = 1))
    }
}, Ui.tableFilterRows = function(e, t) {
    var i = e.getAttribute("ui_table_rows_id"),
        r = e.getAttribute("ui_table_more_id"),
        s = e.getAttribute("ui_table_pages_id"),
        a = e.getAttribute("ui_table_excluded_id"),
        n = e.getAttribute("ui_table_empty_filter_id"),
        u = e.getAttribute("ui_table_shower_id"),
        l = parseInt(e.getAttribute("ui_shower_enabled")),
        o = e.getAttribute("ui_filter_columns"),
        _ = e.getAttribute("ui_table_result_id"),
        b = ge(_),
        d = ge(i),
        g = ge(r),
        p = ge(a),
        f = ge(s),
        c = ge(n),
        h = ge(u),
        w = geByTag1("thead", e),
        v = geByClass1("sort", w, "th"),
        m = geByClass1("shower", h, "td"),
        A = geByClass1("ui_table_pages_numbers", f);
    if (!d) return !1;
    var U = Ui.tableSetFilterTerm(e, t, o);
    if (U === !1) return !1;
    if (0 === U ? (removeClass(c, "unshown"), addClass(b, "unshown")) : (addClass(c, "unshown"), removeClass(b, "unshown")), Ui.tableClearRowsSortCache(e), e.setAttribute("ui_rows_page_number", 0), Ui.tableUpdateSort(e, d, g, p, v, !1), m) {
        var C = m.getAttribute("ui_shower_less");
        l && g.children.length ? (C || g.hasClass(g, "unshown")) && removeClass(h, "unshown") : addClass(h, "unshown")
    }
    A && Ui.tableUpdatePages(e, A, 0)
}, Ui.tableUpdateSort = function(e, t, i, r, s, a) {
    var n, u, l, o, _, b, d, g = !hasClass(i, "unshown"),
        p = i.nextSibling,
        f = [];
    if (n = Ui.tableGetAllIndices(e, s)) {
        for (u = n[2], d = parseJSON(e.getAttribute("ui_filter_rows_indices")), l = Ui.tableGetRowsSort(e, t, i, r, d, u), o = l.length, _ = intval(e.getAttribute("ui_rows_limit")), b = intval(e.getAttribute("ui_rows_page_number")) * _, e.removeChild(t), e.removeChild(i); t.firstChild;) t.removeChild(t.firstChild);
        for (; i.firstChild;) i.removeChild(i.firstChild);
        var c = s ? hasClass(s, "sort") : !0,
            h = s ? hasClass(s, "reverse") : !1,
            w = s ? intval(s.getAttribute("ui_sort_original")) : 3;
        if (a && (w && (w = c ? w % 3 + 1 : 1), h = c && !h || !c && h), c && 3 == w)
            for (var v = 0; o > v; v++) f[v] = v;
        else f = h ? n[1] : n[0];
        for (var m, A, U, C, y, S, N, O, T = (!g && Object.defineProperty, !1), F = 0, P = !1, x = t.hasAttribute("ui_ensure_group_visibilities") ? parseJSON(t.getAttribute("ui_ensure_group_visibilities")) : {}, v = 0; o > v; v++) A = f[v], m = l[A].row, U = !(A in u), C = hasClass(m, "unshown"), y = hasClass(m, "wide"), S = l[A].excludedByFilter, !U && m.hasAttribute("ui_group") && (O = u[A] + ":" + intval(m.getAttribute("ui_group")), C = O in x ? x[O] : C), N = "ui_table_row", N += C ? " unshown" : "", N += P % 2 ? " even" : "", N += y ? " wide" : "", m.className = N, S ? r.appendChild(m) : (b > F || b >= F && !U || _ && (F - b - 1 >= _ || F - b >= _ && U) ? T ? T.push(m) : i.appendChild(m) : (t.appendChild(m), P === !1 && (P = 0)), F += U, P !== !1 && (P += !C, y && !C && (P = 1)));
        e.setAttribute("ui_main_rows_count", F), t.removeAttribute("ui_ensure_group_visibilities"), T && T.length && (Object.defineProperty(i, "p_rows_more", {
            configurable: !0,
            writable: !0
        }), i.p_rows_more = T), s && a && (removeClass(geByClass1("sort", s.parentNode), "sort"), c && 3 == w || addClass(s, "sort"), c && 1 != w && toggleClass(s, "reverse", h), w && s.setAttribute("ui_sort_original", w)), e.insertBefore(i, p), e.insertBefore(t, i)
    }
}, Ui.tableUpdatePages = function(e, t, i) {
    for (; t.firstChild;) t.removeChild(t.firstChild);
    var r, s, a = intval(e.getAttribute("ui_main_rows_count")),
        n = intval(e.getAttribute("ui_rows_limit")),
        u = n ? Math.ceil(a / n) : 1,
        l = i >= 4 ? i - 2 : 0,
        o = u - i > 4 ? i + 2 : u - 1;
    if (1 != u) {
        0 != l && (s = "ui_table_page", r = document.createElement("a"), r.className = s, r.setAttribute("ui_page_number", 0), r.innerHTML = "&laquo;", t.appendChild(r));
        for (var _ = l; o >= _; _++) s = "ui_table_page", s += _ == i ? " selected" : "", r = document.createElement("a"), r.className = s, r.setAttribute("ui_page_number", _), r.innerHTML = _ + 1, t.appendChild(r);
        o != u - 1 && (s = "ui_table_page", r = document.createElement("a"), r.className = s, r.setAttribute("ui_page_number", u - 1), r.innerHTML = "&raquo;", t.appendChild(r))
    }
}, Ui.tableUpdatePerPageLimit = function(e, t, i, r, s, a) {
    if (!hasClass(a, "selected")) {
        removeClass(geByClass1("selected", a.parentNode), "selected"), addClass(a, "selected"), e.setAttribute("ui_rows_limit", a.getAttribute("ui_per_page_limit"));
        var n = a.parentNode.nextSibling;
        hasClass(n, "ui_table_pages_numbers") && (Ui.tableUpdatePages(e, n, 0), e.setAttribute("ui_rows_page_number", 0));
        var u = geByClass1("sort", t, "th");
        Ui.tableUpdateSort(e, i, r, s, u, !1)
    }
}, Ui.tableUpdatePageNumber = function(e, t, i, r, s, a) {
    var n = intval(e.getAttribute("ui_rows_page_number")),
        u = intval(a.getAttribute("ui_page_number"));
    if (n != u) {
        Ui.tableUpdatePages(e, a.parentNode, u), e.setAttribute("ui_rows_page_number", u);
        var l = geByClass1("sort", t, "th");
        Ui.tableUpdateSort(e, i, r, s, l, !1)
    }
}, Ui.tableUpdateShower = function(e, t, i, r) {
    var s = r.getAttribute("ui_shower_less");
    if (s) {
        if (2 == s) return scrollToY(Math.max(Math.min(getXY(e)[1] - 10, scrollGetY()), 0), 0), r.innerHTML = r.getAttribute("ui_shower_more_text"), r.setAttribute("ui_shower_less", 1), void addClass(t, "unshown");
        r.innerHTML = r.getAttribute("ui_shower_less_text"), r.setAttribute("ui_shower_less", 2), removeClass(t, "unshown")
    } else addClass(i, "unshown"), removeClass(t, "unshown");
    var a = t.p_rows_more;
    if (a && a.length) {
        var n = t.nextSibling;
        e.removeChild(t);
        for (var u, l = 0; u = a[l]; l++) t.appendChild(u);
        t.p_rows_more = [], e.insertBefore(t, n)
    }
}, Ui.tableUpdateHiderGroup = function(e, t, i, r) {
    for (var s, a, n = i.nextSibling, u = parseInt(i.getAttribute("ui_sort_index")), l = !1, o = e.hasAttribute("ui_ensure_group_visibilities") ? parseJSON(e.getAttribute("ui_ensure_group_visibilities")) : {}; n && n.hasAttribute("ui_group");) {
        if (Math.abs(intval(n.getAttribute("ui_group"))) == r) a = toggleClass(n, "unshown") ? 1 : 0, s = u + ":" + r, o[s] = a, l = hasClass(n, "wide");
        else if (l) break;
        n = n.nextSibling
    }
    e.setAttribute("ui_ensure_group_visibilities", JSON.stringify(o)), Ui.tableUpdateEven(e, t)
};
try {
    stManager.done("ui.js")
} catch (e) {}