/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1336565657
    Link: https://vk.com/js/al/reg.js?1336565657
    Last Update: 10.2.117
*/
function initRegSteps(e) {
    extend(cur, {
        module: "regstep",
        anim: Fx.Transitions.sineInOut,
        step: e,
        stepsGlass: ge("reg_steps_s"),
        stepsPoint: ge("reg_point"),
        stepsWrap: ge("reg_steps_c")
    }), extend(cur, {
        stepsGlassContent: geByClass1("content", cur.stepsGlass),
        stepsContent: geByClass1("content", cur.stepsWrap),
        move: function(e) {
            if (e == (cur.moving ? cur.m_to : cur.step)) return void(cur.moving || nav.setLoc("regstep" + cur.step));
            cur.moving || (cur.m_height = cur.stepsWrap.offsetHeight - 2, cur.m_g = 115 * (cur.step - 1), cur.m_c = 632 * (1 - cur.step), cur.m_cur = cur.step, cur.moving = setInterval(function() {
                if (cur.m_time += 13, cur.anim_v) {
                    if (cur.m_time > cur.v_time) {
                        if (cur.m_height = cur.m_to_height, cur.anim_v = !1, cur.anim_h = cur.m_to_c != cur.m_c)
                            for (var e = 1; 3 >= e; ++e) show("reg_step" + e + "_c"), browser.opera_mobile ? ge("reg_step" + e + "_c").style.visibility = "visible" : ge("reg_step" + e + "_c").style.height = "auto";
                        cur.m_time -= cur.v_time
                    } else cur.m_height = cur.anim(cur.m_time, cur.m_from_height, cur.m_to_height - cur.m_from_height, cur.v_time);
                    cur.stepsWrap.style.height = cur.m_height + "px"
                }
                if (cur.anim_h && (cur.m_time > cur.h_time ? (cur.m_g = cur.m_to_g, cur.m_c = cur.m_to_c, cur.anim_h = !1, cur.anim_v = cur.m_to_height != cur.m_height, cur.m_time -= cur.h_time) : (cur.m_g = cur.anim(cur.m_time, cur.m_from_g, cur.m_to_g - cur.m_from_g, cur.h_time), cur.m_c = cur.anim(cur.m_time, cur.m_from_c, cur.m_to_c - cur.m_from_c, cur.h_time)), cur.stepsContent.style.marginLeft = cur.m_c + "px", cur.stepsGlass.style.marginLeft = cur.m_g + "px", cur.stepsGlassContent.style.marginLeft = -cur.m_g - 2 + "px", cur.m_cur = Math.floor(cur.m_g / 115) + 1, cur.m_to <= cur.m_cur && cur.m_cur < cur.m_next && (removeClass(ge("reg_step" + cur.m_next), "passed"), --cur.m_next), cur.m_to > cur.m_cur && cur.m_cur == cur.m_next && (addClass(ge("reg_step" + cur.m_next), "passed"), ++cur.m_next), cur.stepsPoint.style.marginLeft = cur.m_g + 47 + "px"), !cur.anim_v && !cur.anim_h) {
                    cur.step = cur.m_to, nav.setLoc("regstep" + cur.step), clearInterval(cur.moving), cur.moving = !1;
                    for (var e = 1; 3 >= e; ++e) e < cur.step ? browser.opera_mobile ? ge("reg_step" + e + "_c").style.visibility = "hidden" : ge("reg_step" + e + "_c").style.height = "10px" : e > cur.step && hide("reg_step" + e + "_c");
                    cur.stepsWrap.style.height = "auto", cur.stepsContent.style.width = 632 * cur.step + "px", cur.stepsWrap.style.overflow = "visible", 3 == cur.step && ge("inv_password") && elfocus("inv_password")
                }
            }, 13)), cur.m_time = 0, cur.m_to = e, cur.m_next = cur.m_cur, cur.m_from_height = cur.m_height;
            var t = ge("reg_step" + cur.m_to + "_c");
            if (t.style.position = "absolute", t.style.left = "-5000px", show(t), cur.m_to_height = geByClass1("borders", t).offsetHeight, cur.m_from_g = cur.m_g, cur.m_to_g = 115 * (cur.m_to - 1), cur.m_from_c = cur.m_c, cur.m_to_c = 632 * (1 - cur.m_to), cur.anim_v = cur.m_to_height > cur.m_height, cur.stepsWrap.style.height = cur.m_height + "px", cur.stepsWrap.style.overflow = "hidden", cur.stepsContent.style.width = "5000px", t.style.position = "static", t.style.left = "auto", cur.anim_h = cur.m_to_height <= cur.m_height)
                for (var r = 1; 3 >= r; ++r) show("reg_step" + r + "_c"), browser.opera_mobile ? ge("reg_step" + r + "_c").style.visibility = "visible" : ge("reg_step" + r + "_c").style.height = "auto";
            cur.h_time = 2 * Math.abs(cur.m_to_c - cur.m_c) / 5, cur.v_time = Math.abs(cur.m_to_height - cur.m_height) / 2, cur.h_time > 500 && (cur.h_time = 500), cur.v_time > 500 && (cur.v_time = 500)
        },
        finish: function(e) {
            ajax.post("register.php", {
                act: "finish",
                hash: e
            }, {
                progress: "step3_progress"
            })
        },
        uploadPhoto: function() {
            hide("photo_error"), show("upload_progress"), document.upload.submit(), setTimeout("ge('photo').blur(); ge('photo').disabled = true;", 0)
        },
        uploadSucceed: function(e, t, r, s) {
            var c = vkImage();
            c.src = s, cur.updatePhoto = function() {
                if (c.height) {
                    ge("photo_file").innerHTML = '<input id="photo" class="inputFile" type="file" onchange="cur.uploadPhoto()" name="photo" />', hide("upload_progress");
                    var e = ge("reg_photo");
                    "img" == e.firstChild.tagName.toLowerCase() ? animate(e, {
                        height: c.height + "px"
                    }, 200, function() {
                        ge("reg_photo").innerHTML = '<img src="' + s + '" />'
                    }) : animate(e.firstChild.firstChild, {
                        height: c.height - 2 + "px"
                    }, 200, function() {
                        ge("reg_photo").innerHTML = '<img src="' + s + '" />'
                    })
                } else setTimeout(cur.updatePhoto, 100)
            }, cur.updatePhoto(), cur.photo = [e, t, r]
        },
        uploadError: function(e) {
            ge("photo_error").innerHTML = e, show("photo_error"), hide("upload_progress"), ge("photo_file").innerHTML = '<input id="photo" class="inputFile" type="file" onchange="cur.uploadPhoto()" name="photo" />'
        }
    });
    for (var t = 1; 3 >= t; ++t) t < cur.step ? browser.opera_mobile ? ge("reg_step" + t + "_c").style.visibility = "hidden" : ge("reg_step" + t + "_c").style.height = "10px" : t > cur.step && hide("reg_step" + t + "_c");
    cur.stepsContent.style.width = 632 * cur.step + "px", cur.stepsWrap.style.overflow = "visible", cur.m_height = cur.stepsWrap.offsetHeight - 2, cur.m_g = 115 * (cur.step - 1), cur.m_c = 632 * (1 - cur.step), cur.stepsPoint.style.marginLeft = cur.m_g + 47 + "px", show(cur.stepsPoint), cur.stepsGlass.style.marginLeft = cur.m_g + "px", cur.stepsGlassContent.style.marginLeft = -cur.m_g - 2 + "px", show(cur.stepsGlass), cur.stepsContent.style.marginLeft = cur.m_c + "px", show(cur.stepsContent), selectsData.setCountries(cur.selData.countries_list);
    for (var t in cur.selData.countries) selectsData.setCountryInfo(t, cur.selData.countries[t]);
    for (var t in cur.selData.cities) selectsData.setCityInfo(t, cur.selData.cities[t]);
    for (var t in cur.selData.universities) selectsData.setUniversityInfo(t, cur.selData.universities[t]);
    for (var t in cur.selData.faculties) selectsData.setFacultyInfo(t, cur.selData.faculties[t]);
    var r, s, c, a, u, o, i, n, l, _, g, h, p, m, y, d, f, v, w, D, b, C = function(e, t) {
            isVisible(e) || slideDown(e, t || 150)
        },
        x = function(e, t) {
            isVisible(e) && slideUp(e, t || 150)
        };
    cur.getLastDay = function(e, t) {
        return 2 == t ? e % 4 == 0 ? 29 : 28 : t > 0 && (8 > t && t % 2 == 0 || t > 7 && t % 2 == 1) ? 30 : 31
    }, cur.genDays = function(e, t) {
        for (var r = [
                [0, cur.lang.profileEdit_main_sel_bday + ":"]
            ], s = cur.getLastDay(e, t), c = 1; s >= c; ++c) r.push([c, c + ""]);
        return r
    }, r = new Dropdown(ge("sex"), cur.selData.sexes, {
        width: 225,
        multiselect: !1,
        selectedItems: cur.selData.sex,
        onChange: function(e) {
            e = intval(e), e && (ge("birth_date_label").innerHTML = langSex(e, cur.lang.birth_date_label))
        }
    });
    var S = function(e, t) {
        s.val() > cur.getLastDay(e, t) && s.clear(), s.setData(cur.getLastDay(e, t))
    };
    s = new Dropdown(ge("bday"), cur.genDays(cur.selData.byear, cur.selData.bmonth), {
        width: 60,
        multiselect: !1,
        selectedItems: cur.selData.bday
    }), c = new Dropdown(ge("bmonth"), cur.selData.bmonths, {
        width: 95,
        multiselect: !1,
        selectedItems: cur.selData.bmonth,
        onChange: function(e) {
            S(a.val(), e)
        }
    }), a = new Dropdown(ge("byear"), cur.selData.byears, {
        width: 60,
        multiselect: !1,
        selectedItems: cur.selData.byear,
        onChange: function(e) {
            S(e, c.val())
        }
    }), v = new ClassSelect(ge("s_class"), ge("s_class_row"), {
        width: 200,
        country: cur.selData.s_country[0],
        school: cur.selData.school,
        school_class: cur.selData.s_class
    }), y = new SchoolSelect(ge("school"), ge("school_container"), ge("school_type"), ge("selectSchoolType"), {
        width: 200,
        type_width: 87,
        with_type_width: 108,
        show: C,
        hide: x,
        types: cur.selData.school_types,
        school: cur.selData.school,
        city: cur.selData.s_city[0],
        classSelect: v,
        onChange: function(e) {
            intval(e) ? C("school_details", 300) : x("school_details", 300), v.clear(), w.clear(), D.clear(), b.clear()
        }
    }), h = new EducationFormSelect(ge("edu_form"), ge("edu_form_row"), {
        width: 200,
        country: cur.selData.u_country[0],
        university: cur.selData.university,
        edu_form: cur.selData.edu_form
    }), p = new EducationStatusSelect(ge("edu_status"), ge("edu_status_row"), {
        width: 200,
        country: cur.selData.u_country[0],
        university: cur.selData.university,
        edu_status: cur.selData.edu_status
    }), i = new ChairSelect(ge("chair"), ge("chair_row"), {
        width: 200,
        show: C,
        hide: x,
        chair: cur.selData.chair,
        faculty: cur.selData.faculty
    }), n = new FacultySelect(ge("faculty"), ge("faculty_row"), {
        width: 200,
        show: C,
        hide: x,
        progressBar: ge("uni_progress"),
        faculty: cur.selData.faculty,
        university: cur.selData.university,
        chairSelect: i
    }), l = new UniversitySelect(ge("university"), ge("university_container"), {
        width: 200,
        show: C,
        hide: x,
        progressBar: ge("uni_progress"),
        university: cur.selData.university,
        city: cur.selData.u_city[0],
        facultySelect: n,
        eduFormSelect: h,
        eduStatusSelect: p,
        onChange: function(e) {
            intval(e) ? C("university_details", 300) : x("university_details", 300), h.clear(), p.clear(), m.clear()
        }
    }), _ = new CitySelect(ge("u_city"), ge("u_city_row"), {
        width: 200,
        show: C,
        hide: x,
        progressBar: ge("uni_progress"),
        city: cur.selData.u_city,
        country: cur.selData.u_country[0],
        universitySelect: l
    }), d = new CitySelect(ge("s_city"), ge("s_city_row"), {
        width: 200,
        show: C,
        hide: x,
        progressBar: ge("school_progress"),
        city: cur.selData.s_city,
        country: cur.selData.s_country[0],
        schoolSelect: y
    }), o = new CitySelect(ge("city"), ge("city_row"), {
        width: 225,
        show: C,
        hide: x,
        city: cur.selData.city,
        country: cur.selData.country[0],
        onChange: function(e) {
            if (e = intval(e)) {
                var t = u.val_full(),
                    r = o.val_full();
                intval(_.val()) || (g.val(t, !0), _.val(r, !0)), intval(d.val()) || (f.val(t, !0), d.val(r, !0))
            }
        }
    }), g = new CountrySelect(ge("u_country"), ge("u_country_row"), {
        width: 200,
        show: C,
        hide: x,
        progressBar: ge("uni_progress"),
        country: cur.selData.u_country,
        eduFormSelect: h,
        eduStatusSelect: p,
        citySelect: _
    }), f = new CountrySelect(ge("s_country"), ge("s_country_row"), {
        width: 200,
        show: C,
        hide: x,
        progressBar: ge("school_progress"),
        country: cur.selData.s_country,
        classSelect: v,
        citySelect: d
    }), u = new CountrySelect(ge("country"), ge("country_row"), {
        width: 225,
        show: C,
        hide: x,
        progressBar: ge("city_progress"),
        country: cur.selData.country,
        citySelect: o,
        onChange: function(e) {
            if (e = intval(e)) {
                var t = u.val_full();
                intval(g.val()) || g.val(t, !0), intval(f.val()) || f.val(t, !0)
            }
        }
    }), m = new Dropdown(ge("grad"), cur.selData.graduations, {
        width: 200,
        autocomplete: !0,
        placeholderColor: "#000",
        placeholder: cur.lang.select_year_not_selected,
        noResult: cur.lang.select_year_not_found,
        selectedItems: cur.selData.grad,
        onChange: function(e) {
            intval(e) || m.clear()
        }
    }), w = new Dropdown(ge("s_start"), cur.selData.start_years, {
        width: 200,
        autocomplete: !0,
        placeholderColor: "#000",
        placeholder: cur.lang.select_year_not_selected,
        noResult: cur.lang.select_year_not_found,
        selectedItems: cur.selData.s_start,
        onChange: function(e) {
            intval(e) || w.clear()
        }
    }), D = new Dropdown(ge("s_fin"), cur.selData.finish_years, {
        width: 200,
        autocomplete: !0,
        placeholderColor: "#000",
        placeholder: cur.lang.select_year_not_selected,
        noResult: cur.lang.select_year_not_found,
        selectedItems: cur.selData.s_finish,
        onChange: function(e) {
            intval(e) || D.clear()
        }
    }), b = new Dropdown(ge("s_grad"), cur.selData.finish_years, {
        width: 200,
        autocomplete: !0,
        placeholderColor: "#000",
        placeholder: cur.lang.select_year_not_selected,
        noResult: cur.lang.select_year_not_found,
        selectedItems: cur.selData.s_grad,
        onChange: function(e) {
            intval(e) || b.clear()
        }
    }), ge("step1_save").onclick = function() {
        var e = trim(ge("fname").value),
            t = trim(ge("lname").value),
            s = cleanName(e, t);
        fname = s[0], lname = s[1];
        var c = intval(ge("sex").value);
        if (!fname || 2 * fname.length < e.length) return scrollToTop(0), notaBene("fname");
        if (!lname || 2 * lname.length < t.length) return scrollToTop(0), notaBene("lname");
        if (!c) return scrollToTop(0), r.showDefaultList();
        var a = {
            act: "save_general",
            country: ge("country").value,
            city: ge("city").value,
            fname: fname,
            lname: lname,
            sex: ge("sex").value,
            bday: ge("bday").value,
            bmonth: ge("bmonth").value,
            byear: ge("byear").value,
            hash: ge("reghash").value
        };
        ajax.post("register.php", a, {
            progress: "step1_progress",
            onDone: function() {
                cur.selData.fname = fname, cur.selData.lname = lname, setTimeout(show.pbind("rs_skip1"), 300), nav.go("/regstep2")
            }
        })
    }, ge("step2_save").onclick = function() {
        var e = function() {
                for (var e = arguments[0], t = 1; t < arguments.length; t++) {
                    var r = arguments[t],
                        s = ge(r).value;
                    intval(s) && (e[r] = s)
                }
                return e
            },
            t = function() {
                for (var e = arguments[0], t = 1; t < arguments.length; t++) {
                    var r = arguments[t],
                        s = ge(r).value;
                    s.length && (e[r] = s)
                }
                return e
            },
            r = {
                act: "save_education",
                hash: ge("reghash").value
            };
        r = e(r, "s_country", "s_city", "school", "school_type", "s_class", "s_start", "s_fin", "s_grad", "u_country", "u_city", "university", "faculty", "chair", "edu_form", "edu_status", "grad"), r = t(r, "school_custom", "university_custom", "faculty_custom", "chair_custom"), ajax.post("register.php", r, {
            progress: "step2_progress"
        })
    }, ge("step3_save").onclick = function() {
        ajax.post("register.php", {
            act: "set_photo",
            server: cur.photo[0],
            photo: cur.photo[1],
            hash: ge("reghash").value,
            phash: cur.photo[2]
        }, {
            progress: "step3_progress"
        })
    }, cur.destroy.push(function() {
        each([u, o, i, n, l, _, g, h, p, m, y, d, f, v, w, D, b], Selector.prototype.destroy), cleanElems("step1_save", "step2_save", "step3_save", "reg_step1_c", "reg_step2_c", "reg_step3_c", "uni_progress", "school_progress", "city_progress")
    }), cur.nav.push(function(e) {
        if (!e[0]) return !1;
        var t = e[0].match(/regstep(\d)/i);
        if (t && (delete e[0], isEmpty(e))) {
            var r = intval(t[1]);
            if (r > 1) {
                if (!cur.selData.fname) return elfocus("fname"), !1;
                if (!cur.selData.lname) return elfocus("lname"), !1
            }
            return 1 > r || r > 3 ? setTimeout(function() {
                nav.go("regstep1")
            }, 0) : (cur.move(r), document.title = document.title), !1
        }
    })
}
var Reg = {};
try {
    stManager.done("reg.js")
} catch (e) {}