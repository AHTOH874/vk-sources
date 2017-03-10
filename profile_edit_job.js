/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 281115018
    Link: https://vk.com/js/al/profile_edit_job.js?281115018
    Last Update: 10.2.117
*/
var ProfileEditorJob = {
    init: function() {
        cur.globalCounter = 0, cur.worksCount = 0, selectsData.setCountries(cur.selData.countries_list);
        for (var e in cur.selData.countries) selectsData.setCities(e, cur.selData.countries[e]);
        if (!isVisible("works")) {
            if (cur.worksCount = cur.works.length, cur.worksCount)
                for (var e = 0; e < cur.works.length; ++e) ge("works").appendChild(this.genWorkRow(cur.works[e].id, 0 == e)), cur.works[e] = this.initWorkRow(cur.works[e]);
            else this.addWork();
            show("works")
        }
        cur.worksCount >= 7 ? hide("add_work_link") : show("add_work_link")
    },
    genOneRow: function(e, t, r, i, o, n) {
        var a = e + t;
        return i || (i = 'class="pedit_dropdown" type="hidden"'), n || (n = ""), '<div class="pedit_row clear_fix" id="row_' + a + '"' + (o || "") + '><div class="pedit_label">' + r + '</div><div class="pedit_labeled"><input id="' + a + '" name="' + a + '" ' + i + "/></div>" + n + "</div>"
    },
    genWorkRow: function(e, t) {
        var r = (t ? "" : '<div class="pedit_separator"></div>') + '<div id="content' + e + '">' + this.genOneRow("group", e, getLang("select_company"), 'type="text" class="dark"', "", '<div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml("ProfileEditorJob.deleteWork(" + e + ")") + '</div><img class="pedit_progress" src="/images/upload.gif" id="progress' + e + '" />') + '<div id="pedit_country_row' + e + '">' + this.genOneRow("country", e, getLang("select_country"), "") + this.genOneRow("city", e, getLang("select_city"), "") + '</div><div id="details' + e + '" style="display: none">' + this.genOneRow("start", e, getLang("select_work_start")) + this.genOneRow("finish", e, getLang("select_work_finish")) + this.genOneRow("position", e, getLang("select_work_position"), 'id="position' + e + '_name" class="pedit_dropdown"') + '</div></div><div class="deleted" id="deleted' + e + '"><div></div><a class="pedit_right_control" onclick="ProfileEditorJob.restoreWork(' + e + ')">' + getLang("global_dont_delete") + "</a></div>";
        return ce("div", {
            className: "pedit_edu_big_row",
            id: "work" + e,
            innerHTML: r
        }, {
            display: "none"
        })
    },
    get_by_id: function(e, t) {
        if (e.id == t) return e;
        for (var r = 0; r < e.childNodes.length; ++r) {
            var i = this.get_by_id(e.childNodes[r], t);
            if (i) return i
        }
        return !1
    },
    initWorkRow: function(e, t) {
        var r = t ? function(e) {
            return ProfileEditorJob.get_by_id(t, e)
        } : ge;
        return e.uiStart = new Dropdown(r("start" + e.id), [
            [0, getLang("select_year_not_selected")]
        ].concat(cur.selData.years), {
            autocomplete: !0,
            placeholder: getLang("select_year_not_selected"),
            noResult: getLang("select_year_not_found"),
            onChange: function(t) {
                t = intval(t);
                var r = [];
                if (t) {
                    var i = intval(e.uiFinish.val());
                    i && t > i && e.uiFinish.val(t);
                    for (var o = 0; o < cur.selData.years.length; ++o) cur.selData.years[o][0] >= t && r.push(cur.selData.years[o])
                } else e.uiStart.clear(), r = cur.selData.years;
                e.uiFinish.setOptions({
                    defaultItems: [
                        [0, getLang("select_year_not_selected")]
                    ].concat(r)
                }), e.uiFinish.setData(r)
            },
            dark: 1
        }), e.uiStart.setData(cur.selData.years), e.uiFinish = new Dropdown(r("finish" + e.id), [
            [0, getLang("select_year_not_selected")]
        ].concat(cur.selData.years), {
            autocomplete: !0,
            placeholder: getLang("select_year_not_selected"),
            noResult: getLang("select_year_not_found"),
            onChange: function(t) {
                t = intval(t);
                var r = [];
                if (t) {
                    var i = intval(e.uiStart.val());
                    i && i > t && e.uiStart.val(t);
                    for (var o = 0; o < cur.selData.years.length; ++o) cur.selData.years[o][0] <= t && r.push(cur.selData.years[o])
                } else e.uiFinish.clear(), r = cur.selData.years;
                e.uiStart.setOptions({
                    defaultItems: [
                        [0, getLang("select_year_not_selected")]
                    ].concat(r)
                }), e.uiStart.setData(r)
            },
            dark: 1
        }), e.uiFinish.setData(cur.selData.years), e.uiStart.val(e.start, !0), e.uiFinish.val(e.finish, !0), e.uiPosition = new Selector(r("position" + e.id), "select.php?act=apositions", {
            multiselect: !1,
            noResult: getLang("select_work_position_select"),
            introText: getLang("select_work_position_select"),
            selectedItems: [e.position_val],
            dropdown: !1,
            enableCustom: !0,
            progressBar: "progress" + e.id,
            onChange: function(t) {
                var r = intval(t);
                r || e.uiPosition.clear()
            },
            dark: 1
        }), ProfileEditorJob.initGroupCompany(e), ge("work" + e.id).style.display = "block", (e.city || e.company_gid) && (ge("details" + e.id).style.display = "block"), e
    },
    initGroupCompany: function(e) {
        var t = {
            autocomplete: !0,
            enableCustom: !0,
            noResult: "",
            placeholder: cur.workCompanyPlaceholder,
            defaultItems: cur.groupsList,
            onChange: function(t) {
                if (-1 !== parseInt(t)) {
                    var r = parseInt(t),
                        i = cur.countryInfo[r];
                    i && i[0] && (e.uiCountry.selectItem(i[0]), i[1] && e.uiCity.selectItem(i[1]));
                    var o = !1;
                    for (var n in cur.groupsList) cur.groupsList[n][0] == r && (o = !0);
                    !o && cur.searchList[r] && cur.groupsList.push(cur.searchList[r])
                }
            },
            onData: function(e) {
                cur.searchList || (cur.searchList = {});
                for (var t in e) cur.searchList[e[t][0]] = e[t]
            },
            withIcons: !0,
            dark: !0,
            dropdown: !0,
            multiselect: !1,
            al: !0,
            hideDropdown: !0,
            noArr: !0
        };
        if (e.uiCity = new CitySelect(ge("city" + e.id), ge("row_city" + e.id), {
                progressBar: "progress" + e.id,
                country: e.country,
                city: e.city_val,
                onChange: function(t) {
                    intval(t) ? show("details" + e.id) : hide("details" + e.id)
                },
                dark: 1
            }), e.uiCountry = new CountrySelect(ge("country" + e.id), ge("row_country" + e.id), {
                progressBar: "progress" + e.id,
                country: e.country_val,
                citySelect: e.uiCity,
                dark: 1
            }), e.company_name) {
            var r = winToUtf(e.company_name);
            e.company_gid ? t.selectedItems = [e.company_gid] : t.selectedItems = [
                [-1, r]
            ]
        }
        var i = "/edit?act=a_career_groups";
        e.uiGroup = new Autocomplete(ge("group" + e.id), i, t)
    },
    addWork: function() {
        if (cur.worksCount >= 7) return !1;
        var e = {
                id: - ++cur.globalCounter,
                country: cur.selData.mem.country,
                country_val: cur.selData.mem.country_val,
                city: cur.selData.mem.city,
                city_val: cur.selData.mem.city_val,
                company_name: "",
                start: 0,
                finish: 0,
                position: 0,
                position_val: ""
            },
            t = ge("works").appendChild(this.genWorkRow(e.id, 0 == cur.worksCount));
        return cur.worksCount || hide(geByClass1("_del_icon", t)), e = this.initWorkRow(e), cur.works.length || (cur.works = new Array), cur.works.push(e), ++cur.worksCount, cur.worksCount >= 7 && hide("add_work_link"), !1
    },
    getIndex: function(e, t) {
        for (var r = 0; r < e.length; ++r)
            if (e[r].id == t) return r;
        return !1
    },
    deleteWork: function(e) {
        if (--cur.worksCount, show("add_work_link"), ge("position" + e).value.length || e > 0) hide("content" + e), ge("deleted" + e).firstChild.innerHTML = getLang("profileEdit_work_will_be_deleted"), show("deleted" + e);
        else {
            var t = this.getIndex(cur.works, e);
            cur.works[t] = cur.works[cur.works.length - 1], cur.works.pop(), ge("work" + e).parentNode.removeChild(ge("work" + e)), 0 == cur.works.length && this.addWork()
        }
        return !1
    },
    restoreWork: function(e) {
        return cur.worksCount >= 7 ? !1 : (hide("deleted" + e), show("content" + e), ++cur.worksCount, cur.worksCount >= 7 && hide("add_work_link"), !1)
    },
    addFields: function() {
        for (var e = arguments[0], t = arguments[1], r = arguments[2], i = 3; i < arguments.length; ++i) intval(ge(arguments[i] + t).value) && (e[arguments[i] + r] = ge(arguments[i] + t).value);
        return e
    },
    saveWorks: function(e) {
        for (var t = {
                act: "a_save_career",
                hash: ge("hash").value
            }, r = 0; r < cur.works.length; ++r) {
            var i = cur.works[r].id;
            if (t["id" + r] = i, isVisible("content" + i)) {
                t = this.addFields(t, i, r, "start", "finish");
                var o = cur.works[r].uiGroup.val_full();
                t["company" + r] = o[1], t = this.addFields(t, i, r, "country", "city");
                var n = intval(o[0]);
                if (-1 != n && (t["group" + r] = n), ge("position" + i).value.length) {
                    var a = cur.works[r].uiPosition.val_full(),
                        s = a[1] || "";
                    s.length && (t["position" + r] = s)
                }
            } else t["deleted" + r] = 1
        }
        var l = function(e) {
            var t = ge("works"),
                r = geByClass("pedit_edu_big_row", t);
            for (var i in r) t.removeChild(r[i]);
            for (var o = [], i = 0; i < cur.works.length; ++i) {
                var n = e["res" + i];
                intval(n) && (o[i] = this.updateWork(cur.works[i], n, t, i))
            }
            cur.works = o, cur.worksCount = cur.works.length, cur.worksCount >= 7 ? hide("add_work_link") : show("add_work_link"), cur.worksCount || this.addWork()
        };
        return ajax.post("al_profileEdit.php", t, {
            onDone: function(e) {
                l.call(ProfileEditorJob, e), ProfileEditor.showMsg(getLang("profileEdit_works_saved"))
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        }), !1
    },
    updateWork: function(e, t, r, i) {
        e.country = e.uiCountry.val(), e.country_val = e.uiCountry.val_full(), e.city = e.uiCity.val(), e.city_val = e.uiCity.val_full(), e.company = e.uiGroup.val(), e.company_val = e.uiGroup.val_full(), e.company_name = e.company_val[1], e.company_val[0] && "-1" != e.company_val[0] && (e.company_gid = e.company_val[0]), e.start = e.uiStart.val(), e.finish = e.uiFinish.val(), e.position = e.uiPosition.val(), e.position_val = e.uiPosition.val_full();
        var o = this.genWorkRow(t, 0 == i);
        return show(o), e.id = t, r.appendChild(o), new_work = this.initWorkRow(e, o), new_work
    },
    workChanged: function(e) {
        var t = e.position_val[1] || "",
            r = (e.uiPosition.val_full() || [])[1] || "";
        return !isVisible("content" + e.id) || e.country != e.uiCountry.val() || e.city != e.uiCity.val() || winToUtf(e.company_name) != winToUtf(e.uiGroup.val_full()[1]) || winToUtf(t) != winToUtf(r) || e.start != e.uiStart.val() || e.finish != e.uiFinish.val()
    }
};
try {
    stManager.done("profile_edit_job.js")
} catch (e) {}