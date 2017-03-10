/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 112384103
    Link: https://vk.com/js/al/profile_edit_mil.js?112384103
    Last Update: 10.2.117
*/
var ProfileEditorMil = {
    init: function() {
        if (cur.globalCounter = 0, cur.militariesCount = 0, selectsData.setCountries(cur.selData.countries_list), !isVisible("militaries")) {
            if (cur.militariesCount = cur.militaries.length, cur.militariesCount)
                for (var i = 0; i < cur.militaries.length; ++i) ge("militaries").appendChild(this.genMilitaryRow(cur.militaries[i].id, 0 == i)), cur.militaries[i] = this.initMilitaryRow(cur.militaries[i]);
            else this.addMilitary();
            show("militaries")
        }
        cur.militariesCount >= 5 ? hide("add_military_link") : show("add_military_link")
    },
    genOneRow: function(i, t, e, r, a) {
        var l = i + t;
        return r || (r = ""), a || (a = ""), '<div class="pedit_row clear_fix" id="row_' + l + '"><div class="pedit_label">' + e + '</div><div class="pedit_labeled"><input class="pedit_dropdown" type="hidden" id="' + l + '" name="' + l + '" ' + r + "/></div>" + a + "</div>"
    },
    genMilitaryRow: function(i, t) {
        return ce("div", {
            className: "pedit_edu_big_row",
            id: "military" + i,
            innerHTML: (t ? "" : '<div class="pedit_separator"></div>') + '<div id="content' + i + '">' + this.genOneRow("country", i, getLang("select_country"), "", '<div class="pedit_right_control">' + ProfileEditor.deleteLinkHtml("ProfileEditorMil.deleteMilitary(" + i + ")") + '</div><img src="/images/upload.gif" class="pedit_progress" id="progress' + i + '" />') + '<div id="details' + i + '" style="display: none">' + this.genOneRow("unit", i, getLang("select_military_unit")) + '<div id="all' + i + '" style="display: none">' + this.genOneRow("start", i, getLang("select_military_start")) + this.genOneRow("finish", i, getLang("select_military_finish")) + '</div></div></div><div class="deleted" id="deleted' + i + '"><div></div><a class="pedit_right_control" onclick="ProfileEditorMil.restoreMilitary(' + i + ')">' + getLang("global_dont_delete") + "</a></div>"
        }, {
            display: "none"
        })
    },
    get_by_id: function(i, t) {
        if (i.id == t) return i;
        for (var e = 0; e < i.childNodes.length; ++e) {
            var r = this.get_by_id(i.childNodes[e], t);
            if (r) return r
        }
        return !1
    },
    initMilitaryRow: function(i, t) {
        var e = t ? function(i) {
            return ProfileEditorMil.get_by_id(t, i)
        } : ge;
        return i.uiStart = new Dropdown(e("start" + i.id), [
            [0, getLang("select_year_not_selected")]
        ].concat(cur.selData.from_years), {
            autocomplete: !0,
            placeholder: getLang("select_year_not_selected"),
            noResult: getLang("select_year_not_found"),
            onChange: function(t) {
                t = intval(t);
                var e = [];
                if (t) {
                    var r = intval(i.uiFinish.val());
                    r && t > r && i.uiFinish.val(t);
                    for (var a = 0; a < cur.selData.until_years.length; ++a) cur.selData.until_years[a][0] >= t && e.push(cur.selData.until_years[a])
                } else i.uiStart.clear(), e = cur.selData.until_years;
                i.uiFinish.setOptions({
                    defaultItems: [
                        [0, getLang("select_year_not_selected")]
                    ].concat(e)
                }), i.uiFinish.setData(e)
            },
            dark: 1
        }), i.uiStart.setData(cur.selData.from_years), i.uiFinish = new Dropdown(e("finish" + i.id), [
            [0, getLang("select_year_not_selected")]
        ].concat(cur.selData.until_years), {
            autocomplete: !0,
            placeholder: getLang("select_year_not_selected"),
            noResult: getLang("select_year_not_found"),
            onChange: function(t) {
                t = intval(t);
                var e = [];
                if (t) {
                    var r = intval(i.uiStart.val());
                    r && r > t && i.uiStart.val(t);
                    for (var a = 0; a < cur.selData.from_years.length; ++a) cur.selData.from_years[a][0] <= t && e.push(cur.selData.from_years[a])
                } else i.uiFinish.clear(), e = cur.selData.from_years;
                i.uiStart.setOptions({
                    defaultItems: [
                        [0, getLang("select_year_not_selected")]
                    ].concat(e)
                }), i.uiStart.setData(e)
            },
            dark: 1
        }), i.uiFinish.setData(cur.selData.until_years), i.uiStart.val(i.start, !0), i.uiFinish.val(i.finish, !0), i.uiUnit = new Selector(e("unit" + i.id), "select_ajax.php?act=a_get_units&country=" + i.country, {
            multiselect: !1,
            placeholder: getLang("select_military_unit_not_selected"),
            noResult: getLang("select_military_unit_select"),
            introText: getLang("select_military_unit_select"),
            selectedItems: [i.unit_val],
            dropdown: !1,
            enableCustom: !0,
            progressBar: "progress" + i.id,
            onChange: function(t) {
                intval(t) ? show("all" + i.id) : (i.uiUnit.clear(), hide("all" + i.id)), i.uiStart.val(0, !0), i.uiFinish.val(0, !0)
            },
            dark: 1
        }), i.uiCountry = new CountrySelect(e("country" + i.id), e("row_country" + i.id), {
            progressBar: "progress" + i.id,
            country: i.country_val,
            onChange: function(t) {
                intval(t) ? (show("details" + i.id), i.uiUnit.setURL("select_ajax.php?act=a_get_units&country=" + t)) : hide("details" + i.id)
            },
            dark: 1
        }), e("military" + i.id).style.display = "block", intval(i.country) && (e("details" + i.id).style.display = "block"), intval(i.unit) && (e("all" + i.id).style.display = "block"), i
    },
    addMilitary: function() {
        if (cur.militariesCount >= 5) return !1;
        var i = {
                id: - ++cur.globalCounter,
                country: cur.selData.mem.country,
                country_val: cur.selData.mem.country_val,
                unit: 0,
                unit_val: "",
                start: 0,
                finish: 0
            },
            t = ge("militaries").appendChild(this.genMilitaryRow(i.id, 0 == cur.militariesCount));
        return cur.militariesCount || hide(geByClass1("_del_icon", t)), i = this.initMilitaryRow(i), cur.militaries.push(i), ++cur.militariesCount, cur.militariesCount >= 5 && hide("add_military_link"), !1
    },
    getIndex: function(i, t) {
        for (var e = 0; e < i.length; ++e)
            if (i[e].id == t) return e;
        return !1
    },
    deleteMilitary: function(i) {
        if (--cur.militariesCount, show("add_military_link"), intval(ge("unit" + i).value)) hide("content" + i), ge("deleted" + i).firstChild.innerHTML = getLang("profileEdit_military_will_be_deleted"), show("deleted" + i);
        else {
            var t = this.getIndex(cur.militaries, i);
            cur.militaries[t] = cur.militaries[cur.militaries.length - 1], cur.militaries.pop(), ge("military" + i).parentNode.removeChild(ge("military" + i)), 0 == cur.militaries.length && this.addMilitary()
        }
        return !1
    },
    restoreMilitary: function(i) {
        return cur.militariesCount >= 5 ? !1 : (hide("deleted" + i), show("content" + i), ++cur.militariesCount, cur.militariesCount >= 5 && hide("add_military_link"), !1)
    },
    addFields: function() {
        for (var i = arguments[0], t = arguments[1], e = arguments[2], r = 3; r < arguments.length; ++r) intval(ge(arguments[r] + t).value) && (i[arguments[r] + e] = ge(arguments[r] + t).value);
        return i
    },
    saveMilitaries: function(i) {
        for (var t = {
                act: "a_save_military",
                hash: ge("hash").value
            }, e = 0; e < cur.militaries.length; ++e) {
            var r = cur.militaries[e].id;
            t["id" + e] = r, isVisible("content" + r) && intval(ge("unit" + r).value) ? (t = this.addFields(t, r, e, "country", "unit", "start", "finish"), ge("unit" + r + "_custom").value.length && (t["unit" + e + "_custom"] = ge("unit" + r + "_custom").value)) : t["deleted" + e] = 1
        }
        var a = function(i) {
            for (var t = [], e = 0; e < cur.militaries.length; ++e) {
                var r = i["res" + e];
                intval(r) ? cur.militaries[e] = this.updateMilitary(cur.militaries[e], r, ge("militaries"), e) : t.push(e)
            }
            for (var e = 0; e < t.length; ++e) {
                var a = t[e];
                ge("military" + cur.militaries[a].id).parentNode.removeChild(ge("military" + cur.militaries[a].id)), cur.militaries[a] = cur.militaries[cur.militaries.length - 1];
                for (var l = e + 1; l < t.length; ++l) t[l] == cur.militaries.length - 1 && (t[l] = a);
                cur.militaries.pop()
            }
            cur.militariesCount = cur.militaries.length, cur.militariesCount >= 5 ? hide("add_military_link") : show("add_military_link"), cur.militariesCount || this.addMilitary()
        };
        return ajax.post("al_profileEdit.php", t, {
            onDone: function(i) {
                a.call(ProfileEditorMil, i), ProfileEditor.showMsg(getLang("profileEdit_military_saved"))
            },
            showProgress: lockButton.pbind(i),
            hideProgress: unlockButton.pbind(i)
        }), !1
    },
    updateMilitary: function(i, t, e, r) {
        i.country = i.uiCountry.val(), i.country_val = i.uiCountry.val_full(), i.unit = i.uiUnit.val(), i.unit_val = i.uiUnit.val_full(), i.start = i.uiStart.val(), i.finish = i.uiFinish.val();
        var a = this.genMilitaryRow(t, 0 == r),
            l = ge("military" + i.id);
        return i.id = t, new_military = this.initMilitaryRow(i, a), e.replaceChild(a, l), new_military
    },
    militaryChanged: function(i) {
        return !isVisible("content" + i.id) || i.country != i.uiCountry.val() || i.unit != i.uiUnit.val() || i.start != i.uiStart.val() || i.finish != i.uiFinish.val()
    }
};
try {
    stManager.done("profile_edit_mil.js")
} catch (e) {}