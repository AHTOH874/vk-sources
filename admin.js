/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 2866808704
    Link: https://vk.com/js/al/admin.js?2866808704
    Last Update: 10.2.117
*/
var adminAddItem = {
    init: function(t) {
        if (this.clear(), t = t || "", cur.addItem.options.obj_id)
            if ("school" == t) {
                var i = this.getSchool();
                i && i.uiSchool && (cur.addItem.options.country = i.uiCountry.val(), cur.addItem.options.country_val = i.uiCountry.val_full(), cur.addItem.options.city = i.uiCity.val(), cur.addItem.options.city_val = i.uiCity.val_full(), cur.addItem.options.school = i.uiSchool.val(), cur.addItem.options.school_val = i.uiSchool.val_full())
            } else if ("uni" == t || "faculty" == t || "chair" == t) {
            var d = this.getUni();
            d && d.uiUniversity && (cur.addItem.options.country = d.uiCountry.val(), cur.addItem.options.country_val = d.uiCountry.val_full(), cur.addItem.options.city = d.uiCity.val(), cur.addItem.options.city_val = d.uiCity.val_full(), cur.addItem.options.uni = d.uiUniversity.val(), cur.addItem.options.uni_val = d.uiUniversity.val_full(), cur.addItem.options.faculty = d.uiFaculty.val(), cur.addItem.options.faculty_val = d.uiFaculty.val_full(), cur.addItem.options.chair = d.uiChair.val(), cur.addItem.options.chair_val = d.uiChair.val_full())
        }
        window.radioBtns.adm_additem_type = {
            els: Array.prototype.slice.apply(geByClass("radiobtn", "adm_additem_type"))
        }
    },
    setType: function(t) {
        if (t) {
            this.init(t);
            var i = geByClass1("adm_additem_type_" + t, "adm_additem_type");
            switch (radiobtn(i, t, "adm_additem_type"), t) {
                case "school":
                    this.schoolInit(), this.setAddBtnTitle(cur.addItem.lang.admin_add_school);
                    break;
                case "uni":
                    this.uniInit(), cur.addItem.options.city && show("row_adm_additem_short", "row_adm_additem_link"), this.setAddBtnTitle(cur.addItem.lang.admin_add_uni);
                    break;
                case "faculty":
                    cur.addItem.options.uni && show("row_adm_additem_link"), this.facultyInit(), this.setAddBtnTitle(cur.addItem.lang.admin_add_fac);
                    break;
                case "chair":
                    cur.addItem.options.faculty && show("row_adm_additem_link"), this.chairInit(), this.setAddBtnTitle(cur.addItem.lang.admin_add_chair);
                    break;
                case "street":
                    this.streetInit(), this.setAddBtnTitle(cur.addItem.lang.admin_add_street);
                    break;
                default:
                    return
            }
            val("adm_additem_result", "");
            var d = ge("adm_additem_inputs");
            isVisible(d) || slideDown(d, 200), cur.addItem.curType = t
        }
    },
    clear: function(t) {
        switch (cur.addItem.curType) {
            case "school":
                this.schoolDestroy();
                break;
            case "uni":
                this.uniDestroy();
                break;
            case "faculty":
                this.facultyDestroy();
                break;
            case "chair":
                this.chairDestroy();
                break;
            case "street":
                this.streetDestroy()
        }
        val("adm_additem_result", ""), cur.addItem.curType = !1
    },
    setAddBtnTitle: function(t) {
        ge("adm_additem_btn_add").innerHTML = t
    },
    cityInit: function(t) {
        var i = {
            big: 1,
            progressBar: "adm_additem_progress",
            city: cur.addItem.options.city_val,
            country: cur.addItem.options.country,
            maxItemsShown: function(t) {
                return t > 6 ? 500 : 350
            },
            visible: 1
        };
        t = extend(i, t || {}), cur.addItem.uiCity ? cur.addItem.uiCity.setOptions(t) : cur.addItem.uiCity = new CitySelect(ge("adm_additem_city"), ge("row_adm_additem_city"), t), this.countryInit({
            citySelect: cur.addItem.uiCity
        })
    },
    cityDestroy: function() {
        cur.addItem.uiCity.hide(), this.countryDestroy()
    },
    countryInit: function(t) {
        var i = {
            big: 1,
            progressBar: "adm_additem_progress",
            country: cur.addItem.options.country_val,
            visible: 1
        };
        t = extend(i, t || {}), cur.addItem.uiCountry ? cur.addItem.uiCountry.setOptions(t) : cur.addItem.uiCountry = new CountrySelect(ge("adm_additem_country"), ge("row_adm_additem_country"), t)
    },
    countryDestroy: function() {
        cur.addItem.uiCountry.hide()
    },
    schoolInit: function() {
        var t = {
            big: 1,
            progressBar: "adm_additem_progress",
            school: cur.addItem.options.school_val || "",
            city: cur.addItem.options.city,
            forceEnableCustom: 1,
            type: 0,
            visible: 1
        };
        cur.addItem.uiSchool ? cur.addItem.uiSchool.setOptions(t) : cur.addItem.uiSchool = new SchoolSelect(ge("adm_additem_school"), ge("row_adm_additem_school"), !1, !1, t), this.cityInit({
            schoolSelect: cur.addItem.uiSchool,
            onChange: !1
        })
    },
    schoolDestroy: function() {
        cur.addItem.uiSchool.clear(), cur.addItem.uiSchool.hide(), this.cityDestroy()
    },
    uniInit: function(t, i) {
        var d = {
            big: 1,
            progressBar: "adm_additem_progress",
            university: cur.addItem.options.uni_val || "",
            city: cur.addItem.options.city,
            forceEnableCustom: 1,
            visible: 1
        };
        t = extend(d, t || {}), cur.addItem.uiUni ? cur.addItem.uiUni.setOptions(t) : cur.addItem.uiUni = new UniversitySelect(ge("adm_additem_uni"), ge("row_adm_additem_uni"), t);
        var a = function(t) {
            intval(t) ? show("row_adm_additem_short", "row_adm_additem_link") : hide("row_adm_additem_short", "row_adm_additem_link")
        };
        this.cityInit(extend({
            universitySelect: cur.addItem.uiUni,
            onChange: a
        }, i || {}))
    },
    uniDestroy: function() {
        cur.addItem.uiUni.clear(), cur.addItem.uiUni.hide(), val("adm_additem_short", ""), val("adm_additem_link", ""), hide("row_adm_additem_short", "row_adm_additem_link"), this.cityDestroy()
    },
    facultyInit: function(t, i) {
        var d = {
            big: 1,
            progressBar: "adm_additem_progress",
            university: cur.addItem.options.uni || "",
            faculty: cur.addItem.options.faculty_val || "",
            city: cur.addItem.options.city,
            forceEnableCustom: 1,
            visible: 1
        };
        t = extend(d, t || {}), cur.addItem.uiFaculty ? cur.addItem.uiFaculty.setOptions(t) : cur.addItem.uiFaculty = new FacultySelect(ge("adm_additem_fac"), ge("row_adm_additem_fac"), t), this.uniInit(extend({
            forceEnableCustom: -1,
            facultySelect: cur.addItem.uiFaculty,
            onChange: function(t) {
                intval(t) ? show("row_adm_additem_link") : hide("row_adm_additem_link")
            }
        }, i || {}), {
            onChange: !1
        })
    },
    facultyDestroy: function() {
        cur.addItem.uiFaculty.clear(), cur.addItem.uiFaculty.hide(), val("adm_additem_link", ""), hide("row_adm_additem_link"), this.uniDestroy()
    },
    chairInit: function() {
        var t = {
            big: 1,
            progressBar: "adm_additem_progress",
            university: cur.addItem.options.uni || "",
            faculty: cur.addItem.options.faculty || "",
            chair: cur.addItem.options.chair_val || "",
            city: cur.addItem.options.city,
            forceEnableCustom: 1,
            visible: 1
        };
        cur.addItem.uiChair ? cur.addItem.uiChair.setOptions(t) : cur.addItem.uiChair = new ChairSelect(ge("adm_additem_chair"), ge("row_adm_additem_chair"), t), this.facultyInit({
            forceEnableCustom: -1,
            chairSelect: cur.addItem.uiChair,
            onChange: function(t) {
                intval(t) ? show("row_adm_additem_link") : hide("row_adm_additem_link")
            }
        }, {
            onChange: !1
        })
    },
    chairDestroy: function() {
        cur.addItem.uiChair.clear(), cur.addItem.uiChair.hide(), val("adm_additem_link", ""), hide("row_adm_additem_link"), this.facultyDestroy()
    },
    streetInit: function() {
        cur.addItem.uiStreet ? cur.addItem.uiStreet.show() : cur.addItem.uiStreet = new StreetSelect(ge("adm_additem_street"), ge("row_adm_additem_street"), {
            big: 1,
            progressBar: "adm_additem_progress",
            city: cur.addItem.options.city,
            forceEnableCustom: 1,
            visible: 1
        }), this.cityInit({
            streetSelect: cur.addItem.uiStreet,
            onChange: !1
        })
    },
    streetDestroy: function() {
        cur.addItem.uiStreet.clear(), cur.addItem.uiStreet.hide(), this.cityDestroy()
    },
    addItem: function(t) {
        if (cur.addItem.curType) {
            var i = {
                    hash: cur.addItem.options.hash
                },
                d = "";
            switch (cur.addItem.curType) {
                case "school":
                    if (d = cur.addItem.lang.admin_school_already, !this.validateValue(cur.addItem.uiSchool, d)) return;
                    i = extend(i, {
                        act: "do_add_school",
                        country1: cur.addItem.uiCountry.val(),
                        city1: cur.addItem.uiCity.val(),
                        school1: cur.addItem.uiSchool.val(),
                        school1_type: 0,
                        school1_custom: cur.addItem.uiSchool.customVal()
                    });
                    break;
                case "uni":
                    if (d = cur.addItem.lang.admin_uni_already, !this.validateValue(cur.addItem.uiUni, d)) return;
                    i = extend(i, {
                        act: "do_add_university",
                        uni_city: cur.addItem.uiCity.val(),
                        university: cur.addItem.uiUni.val(),
                        university_custom: cur.addItem.uiUni.customVal(),
                        university_short: val("adm_additem_short"),
                        university_url: val("adm_additem_link")
                    });
                    break;
                case "faculty":
                    if (d = cur.addItem.lang.admin_fac_already, !this.validateValue(cur.addItem.uiFaculty, d)) return;
                    i = extend(i, {
                        act: "do_add_faculty",
                        uni_city2: cur.addItem.uiCity.val(),
                        university2: cur.addItem.uiUni.val(),
                        faculty2: cur.addItem.uiFaculty.val(),
                        faculty2_custom: cur.addItem.uiFaculty.customVal(),
                        faculty2_url: val("adm_additem_link")
                    });
                    break;
                case "chair":
                    if (d = cur.addItem.lang.admin_chair_already, !this.validateValue(cur.addItem.uiChair, d)) return;
                    i = extend(i, {
                        act: "do_add_chair",
                        uni_city3: cur.addItem.uiCity.val(),
                        university3: cur.addItem.uiUni.val(),
                        faculty3: cur.addItem.uiFaculty.val(),
                        chair3: cur.addItem.uiChair.val(),
                        chair3_custom: cur.addItem.uiChair.customVal(),
                        chair3_url: val("adm_additem_link")
                    });
                    break;
                case "street":
                    if (d = cur.addItem.lang.admin_street_already, !this.validateValue(cur.addItem.uiStreet, d)) return;
                    i = extend(i, {
                        act: "do_add_street",
                        uni_city4: cur.addItem.uiCity.val(),
                        street4: cur.addItem.uiStreet.val(),
                        street4_custom: cur.addItem.uiStreet.customVal()
                    });
                    break;
                default:
                    return
            }
            val("adm_additem_result", ""), ajax.post("admin.php", i, {
                onDone: function(t, i) {
                    return 0 === intval(t) ? (showDoneBox(i), void cur.addItemBox.hide()) : (intval(t) > 0 && d && (i = d), void(i && this.showError(i)))
                }.bind(this),
                onFail: function(t) {
                    return t && this.showError(t), !0
                }.bind(this),
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            })
        }
    },
    showError: function(t) {
        showMsg("adm_additem_result", t, "error", !0)
    },
    validateValue: function(t, i) {
        return t && intval(t.val()) > 0 ? (this.showError(i), !1) : t && -1 == intval(t.val()) && t.customVal() ? (val("adm_additem_result", ""), !0) : (t && val("adm_additem_result", ""), !1)
    },
    destroyScope: function() {
        cur.addItem.uiSchool && cur.addItem.uiSchool.destroy(), cur.addItem.uiUni && cur.addItem.uiUni.destroy(), cur.addItem.uiFaculty && cur.addItem.uiFaculty.destroy(), cur.addItem.uiChair && cur.addItem.uiChair.destroy(), cur.addItem.uiStreet && cur.addItem.uiStreet.destroy(), cur.addItem = {}, nav.objLoc.add_item && (delete nav.objLoc.add_item, nav.setLoc(nav.objLoc))
    },
    getUni: function() {
        var t = ProfileEditorEdu && cur.addItem.options.obj_id ? ProfileEditorEdu.getIndex(cur.unis, cur.addItem.options.obj_id) : !1;
        return t === !1 ? cur.primary_uni || !1 : cur.unis[t]
    },
    getSchool: function() {
        var t = ProfileEditorEdu && cur.addItem.options.obj_id ? ProfileEditorEdu.getIndex(cur.schools, cur.addItem.options.obj_id) : !1;
        return t === !1 ? !1 : cur.schools[t]
    }
};
try {
    stManager.done("admin.js")
} catch (e) {}