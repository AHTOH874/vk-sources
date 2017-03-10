/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 590267265
    Link: https://vk.com/js/al/box.js?590267265
    Last Update: 10.2.117
*/
function skinBoxTabs(a, t, b, o) {
    var e = [];
    for (var n in t) {
        var r = t[n].href ? ' href="' + t[n].href + '"' : "";
        e.push('<div class="fl_l summary_tab' + (b == n ? "_sel" : "") + '">  <a class="summary_tab2"' + r + ' onclick="if (checkEvent(event)) return; cur.onTabSwitch[' + o + "]('" + n + "');geByClass1('summary_tab_sel', this.parentNode.parentNode).className='fl_l summary_tab';this.parentNode.className='fl_l summary_tab_sel';return false;\">    <div class=\"summary_tab3\"><nobr>" + t[n].label + "</nobr></div>  </a></div>    ")
    }
    geByClass1("summary_tabs", a.bodyNode).innerHTML = e.join("")
}

function setUpTabbedBox(box, width, tabsObj, curTab, preload, arg0, arg1) {
    cur.onTabSwitch || (cur.onTabSwitch = []);
    var tabSwitch = cur.onTabSwitch.push(function(tab) {
        var t = tabsObj[tab];
        if (box.ctab != tab) {
            if (box.ctab = tab, t.func && !eval("((function() {" + t.func + "})())")) return;
            box.loadTabContent(t.url, t.data, tab)
        }
    });
    skinBoxTabs(box, tabsObj, curTab, tabSwitch - 1), box.setOptions({
        bodyStyle: "padding: 0px;",
        width: intval(width) || void 0
    }), extend(box, {
        tabs: tabsObj,
        ctab: curTab,
        tabContent: geByClass1("tabbed_container", box.bodyNode),
        loadTabContent: function(url, params, tab) {
            params = extend(params || {}, {
                only_content: 1,
                tab: tab
            }), ajax.post(url, params, {
                onDone: function(title, html, js) {
                    if (!tab || box.ctab == tab) {
                        title && box.setOptions({
                            title: title
                        }), html && (box.tabContent.innerHTML = html);
                        var fn = eval("((function() { return function() { var box = this; " + (js || "") + "}; })())");
                        fn.call(box)
                    }
                },
                showProgress: box.showProgress,
                hideProgress: box.hideProgress,
                cache: 1
            })
        }
    }), preload && ajax.preload(arg0, extend(arg1, {
        only_content: 1,
        tab: curTab
    }), preload)
}
try {
    stManager.done("box.js")
} catch (e) {}