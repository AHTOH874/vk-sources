/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2533221357
    Link: https://vk.com/js/al/filters.js?2533221357
    Last Update: 10.2.117
*/
var Filters = {
    init: function(e, t, r, i, l, u, o) {
        stManager.add(["btagger.css", "btagger.js"]), cur.settingsMoreShown = !1, cur.pvTagger && window.Phototag && Phototag.stopTag(), cur.cropActs = ge("pv_crop_actions");
        var s = {
                allowScriptAccess: "always",
                bgcolor: "#FFFFFF",
                wmode: "opaque",
                scale: "noscale",
                quality: "best",
                salign: "tl"
            },
            c = curBox();
        c && c.setOptions({
            onHideAttempt: function() {
                return cur.startedCrop = !1, cur.filtersBlur = 0, cur.blurShown = !1, cur.lastCrop = !1, cur.filtersAmount = !1, cur.amountSize = !1, !0
            }
        }), cur.filterPhoto = u, cur.filterHash = o;
        var a = renderFlash("pv_filter_cont", e, s, t);
        if (!a) return hide("pv_filter_wrap"), hide("pv_filter_roll"), show("pv_other_settings"), hide(geByClass1("pv_change_setting", c.bodyNode)), void setStyle(ge("pv_filter_panel"), {
            marginTop: 10
        });
        if (cur.filtersFont = ls.get("filter_font"), void 0 == cur.filtersFont ? cur.filtersFont = 1 : ge("pv_filter_font").className = "pv_filter_font pv_filter_font" + cur.filtersFont, cur.filterFl = ge("pv_filter_embed"), cur.filterApplied = 0, cur.filterSaveOptions = r, cur.filterParams = i, cur.customOpts = l, cur.filterUnderLeft = 0, cur.filterParams.disableCrop) {
            var n = geByClass1("pv_filter_crop", ge("pv_filters_cont"));
            hide(n), addClass(n.parentNode, "pv_filter_no_crop")
        }
        var p = {
            onComplete: function(e) {
                if (e) {
                    var t = parseJSON(e);
                    t && ("album_photo" == t.bwact ? Filters.save(e) : Filters.save(t))
                }
            },
            setSize: function(e, t) {
                cur.preventCrop = 200 > e || 200 > t, setStyle(cur.filterFl, {
                    height: t + "px"
                }), cur.filterUnderLeft = (604 - e) / 2, setStyle(ge("pv_filter_under"), {
                    height: t + "px",
                    padding: "0px " + cur.filterUnderLeft + "px",
                    width: e + "px"
                }), setStyle(ge("pv_filter_photo_inner"), {
                    width: e + "px",
                    height: t + "px"
                }), 150 > t ? hide("pv_filters_cont") : show("pv_filters_cont")
            },
            startCrop: function() {
                if (cur.preventCrop) return showDoneBox("<center>" + getLang("photos_too_small") + "</center>"), !1;
                var e = function(e) {
                        var t = {
                            marginTop: e.t + e.h / 2 - 25
                        };
                        vk.rtl ? t.marginRight = e.r + e.w / 2 - 50 + cur.filterUnderLeft : t.marginLeft = e.l + e.w / 2 - 50 + cur.filterUnderLeft, setStyle(cur.cropActs, t), fadeIn(cur.cropActs, 150)
                    },
                    t = {
                        onStart: e,
                        onMove: e,
                        onMoveStart: function(e) {
                            var t = {
                                marginTop: e.t + e.h / 2 - 25
                            };
                            vk.rtl ? t.marginRight = e.r + e.w / 2 - 50 + cur.filterUnderLeft : t.marginLeft = e.l + e.w / 2 - 50 + cur.filterUnderLeft, setStyle(cur.cropActs, t), fadeOut(cur.cropActs, 150)
                        }
                    };
                cur.lastCrop && (t.s = cur.lastCrop), cur.btagger = new BTagger("pv_filter_photo_inner", t), fadeOut(ge("pv_filters_cont"), 150)
            },
            textSize: function(e, t) {
                cur.textHeight = t, Filters.onTextResize()
            },
            onInit: function() {
                i.settings && Filters.fromStr(i.settings)
            }
        };
        if (cur.pvPhoto && cur.pvPhoto.firstChild) {
            var v = getSize(cur.pvPhoto.firstChild);
            v[0] > 604 && (v[1] = 604 * v[1] / v[0], v[0] = 604), p.setSize(v[0], v[1])
        }
        cur.filtersCallback = function(e) {
            method = e.shift(), p[method] ? p[method].apply(this, e) : debugLog("method " + method + " not found")
        }, autosizeSetup("pv_filter_text_ta", {
            maxHeight: 300,
            onResize: Filters.onTextResize
        })
    },
    filtersAct: function(e, t) {
        cssAnim(e, {
            opacity: t ? 1 : .85
        }, {
            duration: 100
        })
    },
    showMoreSettings: function(e) {
        cur.settingsMoreShown ? (slideUp("pv_other_settings", 200), cur.settingsMoreShown = !1, e.innerHTML = getLang("photos_change_setting")) : (slideDown("pv_other_settings", 200), cur.settingsMoreShown = !0, e.innerHTML = getLang("photos_hide_change_setting"))
    },
    filterCrop: function(e) {
        return cur.startedCrop || (cur.startedCrop = !0, cur.filterParams.disableCrop) ? void 0 : (stManager.add(["btagger.css", "btagger.js"], function() {
            cur.filterFl.originalCrop(), cur.filterCropped = !1
        }), cancelEvent(e))
    },
    doCrop: function() {
        cur.startedCrop = !1, cur.lastCrop = cur.btagger.getOpts(), Filters.cancelCrop(), cur.filterFl.crop(cur.lastCrop), cur.fBlurPos = !1, cur.filterCropped = !0
    },
    cancelCrop: function() {
        cur.startedCrop = !1, fadeOut(cur.cropActs, 150), cur.lastCrop = cur.btagger.getOpts(), cur.btagger.hide(), fadeIn(ge("pv_filters_cont"), 150)
    },
    hideBlur: function() {
        debugLog("hideBlur");
        var e = ge("pv_filter_blur_sl"),
            t = ge("pv_filter_under");
        setTimeout(function() {
            if (debugLog("hideBlurDoing"), !cur.blurShown) return !0;
            var r = {
                opacity: 0,
                width: 0
            };
            r[vk.rtl ? "marginRight" : "marginLeft"] = 24, isVisible(ge("pv_filters_cont")) ? cssAnim(e, r, {
                duration: 100
            }, function() {
                hide(e)
            }) : setStyle(e, r), cur.blurShown = !1, removeClass(t, "pv_filter_pointer"), removeEvent(t, "click mousemove", Filters.setBlurPos), removeEvent(t, "mousedown")
        }, 0)
    },
    showBlur: function(e) {
        var t = ge("pv_filter_blur_sl"),
            r = ge("pv_filter_under");
        if (cur.blurShown) return !0;
        show(t);
        var i = {
            width: 100,
            opacity: 1
        };
        i[vk.rtl ? "marginRight" : "marginLeft"] = 40, cssAnim(t, i, {
            duration: 100
        }, function() {}), cur.blurShown = !0, Filters.setBlur(), addClass(r, "pv_filter_pointer"), addEvent(r, "mousedown mousemove", Filters.setBlurPos);
        var l = function() {
            cur.mouseDown = !1, removeEvent(window, "mouseup", l)
        };
        return addEvent(r, "mousedown", function() {
            cur.mouseDown = !0, addEvent(window, "mouseup", l)
        }), addEvent(r, "mouseup", function() {
            cur.mouseDown = !1
        }), elfocus("pv_focus_blur"), cancelEvent(e)
    },
    hideText: function() {
        var e = ge("pv_filter_text_sl");
        setTimeout(function() {
            if (!cur.textShown) return !1;
            var t = {
                opacity: 0,
                width: 0
            };
            t[vk.rtl ? "marginRight" : "marginLeft"] = 24, isVisible(ge("pv_filters_cont")) ? cssAnim(e, t, {
                duration: 100
            }, function() {
                hide(e)
            }) : setStyle(e, t), cur.textShown = !1
        }, 0)
    },
    showText: function(e) {
        if (cur.textShown) return Filters.hideText(), !0;
        var t = ge("pv_filter_text_sl");
        show(t);
        var r = {
            width: 215,
            opacity: 1
        };
        return r[vk.rtl ? "marginRight" : "marginLeft"] = 40, cssAnim(t, r, {
            duration: 100
        }, function() {
            elfocus("pv_filter_text_ta")
        }), cur.textShown = !0, cancelEvent(e)
    },
    switchFont: function(e, t) {
        return cur.filtersFont = parseInt(cur.filtersFont) ? 0 : 1, Filters.updateText(!1, t), ls.set("filter_font", cur.filtersFont), e.className = "pv_filter_font pv_filter_font" + cur.filtersFont, cancelEvent(t)
    },
    updateText: function(e, t) {
        t && t.keyCode == KEY.RETURN && (t.ctrlKey || t.metaKey) && Filters.showText(t), setTimeout(function() {
            var t = ge("pv_filter_text_ta"),
                r = val(t) || "";
            return r.length > 140 && (r = r.substr(0, 140), val(t, r)), cur.filterText = r, cur.filterFl.setText ? void cur.filterFl.setText(r, cur.filtersFont, e || 0) : !1
        }, 0)
    },
    onTextResize: function() {
        var e = ge("pv_filter_text_sl"),
            t = getSize(e),
            r = cur.filterParams.disableCrop ? 34 : 4;
        setStyle(e, {
            marginTop: Math.min(105 - cur.textHeight - t[1], r)
        })
    },
    showSetts: function() {},
    hideSetts: function() {},
    startSlideEdit: function(e, t, r) {
        var i = geByClass1("pv_blur_line", e),
            l = r.pageX - getXY(geByClass1("pv_blur_back", e))[0];
        vk.rtl && (l = 86 - l);
        var u = r.pageX;
        if (1 == t) {
            var o = 0,
                s = 82;
            if (l > 86) return Filters.changeBlurType(ge("pv_blur_switch"), r)
        } else {
            if (!hasClass(e, "pv_level_shown")) return !0;
            var o = 3,
                s = 66
        }
        cur.fBg = bodyNode.appendChild(ce("div", {
            className: "pv_filter_bg no_select"
        }, {
            width: Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth)),
            height: Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight)),
            cursor: "pointer"
        })), setStyle(i, {
            width: Math.min(Math.max(l, o), s)
        }), addClass(e, "pv_filter_down");
        var c = intval(getStyle(i, "width"));
        return addEvent(cur.fBg, "mousemove", function(r) {
            var l = u - r.pageX;
            return vk.rtl && (l = -l), setStyle(i, {
                width: Math.max(Math.min(c - l, s), o)
            }), 1 == t ? Filters.setBlur() : 2 == t && Filters.setAmount(e), cancelEvent(r)
        }), addEvent(cur.fBg, "mouseup", function(t) {
            removeEvent(cur.fBg, "mouseup"), removeEvent(cur.fBg, "mousemove"), re(cur.fBg), cur.fBg = !1, removeClass(e, "pv_filter_down")
        }), 1 == t ? Filters.setBlur() : 2 == t && Filters.setAmount(e), cancelEvent(r)
    },
    changeBlurType: function(e) {
        return cur.blurType = (cur.blurType || 1) + 1, cur.blurType > 2 && (cur.blurType = 1), setStyle(ge("pv_blur_switch"), {
            backgroundPosition: "0px " + (-34 - 9 * cur.blurType) + "px"
        }), Filters.setBlur(), cancelEvent(e)
    },
    setBlur: function() {
        var e = getSize("pv_blur_back")[0],
            t = getSize("pv_blur_line")[0];
        cur.filtersBlur = t / e * 100;
        getSize(ge("pv_filter_under"));
        cur.fBlurPos || (cur.fBlurPos = [.5, .5]), debugLog("set blur", cur.fBlurPos), cur.blurTimeout || (cur.blurTimeout = setTimeout(function() {
            cur.filterFl.setBlur(cur.blurType || 1, cur.filtersBlur, cur.fBlurPos[0], cur.fBlurPos[1]), cur.blurTimeout = !1
        }, 5))
    },
    setAmount: function(e, t) {
        var r = getSize(geByClass1("pv_blur_back", e))[0];
        return cur.amountSize = getSize(geByClass1("pv_blur_line", e))[0], cur.filtersAmount = cur.amountSize / r, cur.filtersAmount = .8 - .8 * cur.filtersAmount, t ? void cur.filterFl.setAmount(cur.filtersAmount) : void(cur.amountTimeout || (cur.amountTimeout = setTimeout(function() {
            cur.filterFl.setAmount(cur.filtersAmount), cur.amountTimeout = !1
        }, 5)))
    },
    setBlurPos: function(e) {
        if ("mousemove" == e.type && !cur.mouseDown) return cancelEvent(e);
        var t = ge("pv_filter_under"),
            r = getXY(t),
            i = getSize(t);
        return cur.fBlurPos = [(e.pageX - r[0]) / i[0], (e.pageY - r[1]) / i[1]], Filters.setBlur(), elfocus("pv_focus_blur"), cancelEvent(e)
    },
    applyCustom: function() {
        (cur.filterApplied || cur.filtersBlur) && (cur.filterFl.restoreOriginal(), cur.filterApplied = 0), cur.customOpts[cur.customNum][0] = val("pv_fl_brightness"), cur.customOpts[cur.customNum][1] = val("pv_fl_contrast"), cur.customOpts[cur.customNum][2] = val("pv_fl_saturation"), cur.customOpts[cur.customNum][3] = val("pv_fl_sepia"), cur.customOpts[cur.customNum][4] = val("pv_fl_vig1"), cur.customOpts[cur.customNum][5] = val("pv_fl_vig2"), cur.customOpts[cur.customNum][6] = val("pv_fl_color1"), cur.customOpts[cur.customNum][7] = val("pv_fl_color2"), cur.customOpts[cur.customNum][8] = val("pv_fl_color3");
        var e = cur.customOpts[cur.customNum];
        cur.filterFl.addFilter("brightness", e[0]), cur.filterFl.addFilter("contrast", e[1]), cur.filterFl.addFilter("saturation", e[2]), cur.filterFl.addFilter("sepia", e[3]), cur.filterFl.addFilter("vignette", e[4], e[5]), cur.filterFl.addFilter("color", e[6], e[7], e[8]), cur.filterApplied = -1, cur.filterFl.applyFilter(!0), clearTimeout(cur.saveCustomTimeout), cur.saveCustomTimeout = setTimeout(Filters.saveCustom, 1e3)
    },
    saveCustom: function(e) {
        var t = {
            act: "save_custom_filters",
            share: e ? 1 : 0,
            num: cur.customNum
        };
        for (i in cur.customOpts) t["filter_" + i] = cur.customOpts[i].join(",");
        ajax.post("al_photos.php", t, {})
    },
    hideLevels: function(e) {
        var t = geByClass("pv_filter_level", ge("pv_filter_roll"));
        for (var r in t) hasClass(t[r], "pv_level_shown") || t[r].parentNode == e || cssAnim(t[r], {
            height: 0,
            marginTop: 0,
            opacity: 0
        }, {
            duration: 200
        })
    },
    getLevelCont: function(e, t) {
        var r = geByClass1("pv_filter_level", e);
        if (!r) {
            var r = ce("div", {
                className: "pv_filter_level",
                innerHTML: '<div class="pv_filter_level_txt"></div><div class="pv_blur_back"><div class="pv_blur_line" style="width: 36px;"><div class="pv_blur_slider"></div></div></div>'
            });
            e.appendChild(r), addEvent(r, "mousedown", Filters.startSlideEdit.pbind(r, 2))
        }
        var i = geByClass1("pv_filter_level_txt", e);
        return i.innerHTML = t, r
    },
    showLevel: function(e) {
        var t = Filters.getLevelCont(e);
        removeClass(t, "pv_level_before_hide"), show(t), addClass(t, "pv_level_shown");
        var r = geByClass1("pv_blur_line", e);
        setStyle(r, {
            width: cur.amountSize
        }), cssAnim(t, {
            height: 15,
            marginTop: -15,
            opacity: 1
        }, {
            duration: 250
        })
    },
    fromStr: function(e) {
        var t = e.split("/");
        if ("f" != t[0] && "p" != t[0]) {
            var r = t[0].split(","),
                i = intval(r[0]),
                l = intval(r[1]);
            cur.filtersAmount = l / 100;
            var u = t[2].split(",");
            t[2] && u && u.length && (cur.lastCrop = {
                t: intval(u[0]),
                l: intval(u[1]),
                w: intval(u[2]),
                h: intval(u[3])
            }, cur.filterFl.crop(cur.lastCrop), cur.filterCropped = !0);
            var o = t[3];
            o && (cur.filterText = replaceEntities(o), void 0 == t[4] && (t[4] = "1"), cur.filtersFont = t[4], ge("pv_filter_font").className = "pv_filter_font pv_filter_font" + cur.filtersFont, val("pv_filter_text_ta", cur.filterText), ge("pv_filter_text_ta").autosize.update(), Filters.updateText(1));
            var s = t[1].split(",");
            t[1] && s && (cur.filtersBlur = intval(s[0]), cur.blurType = intval(s[1]), cur.fBlurPos = [intval(s[2]) / 100, intval(s[3]) / 100], debugLog("blur here", cur.filtersBlur, cur.fBlurPos), cur.filterFl.setBlur(cur.blurType || 1, cur.filtersBlur, cur.fBlurPos[0], cur.fBlurPos[1])), i && l && (cur.amountSize = 66 * (.8 - cur.filtersAmount) / .8, debugLog("amount", cur.filtersAmount), Filters.applyFilter(i, !0), cur.filterFl.setAmount(cur.filtersAmount))
        }
    },
    toStr: function() {
        var e = (cur.filterApplied ? cur.filterApplied + "," + intval(100 * cur.filtersAmount) : "") + "/";
        return cur.filtersBlur && (e += intval(cur.filtersBlur) + "," + intval(cur.blurType || 1) + "," + intval(100 * cur.fBlurPos[0]) + "," + intval(100 * cur.fBlurPos[1])), e += "/", cur.filterCropped && cur.lastCrop && cur.lastCrop.w && cur.lastCrop.h && (e += cur.lastCrop.t + "," + cur.lastCrop.l + "," + cur.lastCrop.w + "," + cur.lastCrop.h), cur.filterText && (e += "/" + cur.filterText.replace("/", "&#47;") + "/" + cur.filtersFont), e.match(/^\/*$/) && (e = ""), e
    },
    applyFilter: function(e, t) {
        var r = ge("pv_filter_btn_" + e);
        debugLog("applyFilter", e, r);
        var i = geByClass1("pv_filter_sel", ge("pv_filter_panel"));
        if (i != r) {
            removeClass(i, "pv_filter_sel"), addClass(r, "pv_filter_sel");
            var l = geByClass1("pv_level_shown", ge("pv_filter_panel"));
            l && (addClass(l, "pv_level_before_hide"), removeClass(l, "pv_level_shown")), Filters.hideLevels(r), e && (Filters.showLevel(r), cur.filtersAmount || Filters.setAmount(r, !0))
        }
        if (cur.filterApplied == e) return !1;
        switch ((cur.filterApplied || cur.filtersBlur) && (cur.filterFl.restoreOriginal(), cur.filterApplied = 0), e) {
            case 0:
                break;
            case 8:
                cur.filterFl.addFilter("pro"), cur.filterFl.addFilter("vignette", 20, 70);
                break;
            case 10:
                cur.filterFl.addFilter("sepia", 30), cur.filterFl.addFilter("vignette", 25, 80), cur.filterFl.addFilter("saturation", -30), cur.filterFl.addFilter("contrast", 30);
                break;
            case 13:
                cur.filterFl.addFilter("color", 95, 105, 145), cur.filterFl.addFilter("sepia", 30), cur.filterFl.addFilter("contrast", 20), cur.filterFl.addFilter("vignette", 15, 60);
                break;
            case 21:
                cur.filterFl.addFilter("color", 125, 115, 95), cur.filterFl.addFilter("sepia", 40), cur.filterFl.addFilter("saturation", -20), cur.filterFl.addFilter("vignette", 40, 70), cur.filterFl.addFilter("contrast", -10);
                break;
            case 22:
                cur.filterFl.addFilter("color", 125, 110, 95), cur.filterFl.addFilter("vignette", 30, 80), cur.filterFl.addFilter("contrast", 15), cur.filterFl.addFilter("saturation", -100), cur.filterFl.addFilter("sepia", 100);
                break;
            case 23:
                cur.filterFl.addFilter("color", 110, 95, 105), cur.filterFl.addFilter("sepia", 50), cur.filterFl.addFilter("vignette", 30, 65), cur.filterFl.addFilter("saturation", -60), cur.filterFl.addFilter("contrast", 40);
                break;
            case 24:
                cur.filterFl.addFilter("pro", 2), cur.filterFl.addFilter("vignette", 20, 65), cur.filterFl.addFilter("contrast", 15), cur.filterFl.addFilter("brightness", 15), cur.filterFl.addFilter("vignette", 30, 65);
                break;
            case 25:
                cur.filterFl.addFilter("pro", 3), cur.filterFl.addFilter("vignette", 20, 65);
                break;
            case 26:
                cur.filterFl.addFilter("pro", 4), cur.filterFl.addFilter("vignette", 20, 60)
        }
        cur.filterApplied = e, cur.filterFl.applyFilter(!t)
    },
    savePhotoFilter: function(e) {
        lockButton(e), cur.filterApplied || cur.filterCropped || cur.filtersBlur || cur.filterText ? cur.filterFl.saveBigPhoto(cur.filterSaveOptions) : Filters.save()
    },
    changeThumbs: function(e, t) {
        if (e) {
            var r = [ge("photo_row" + cur.filterPhoto), ge("photos_add_thumb" + cur.filterPhoto)],
                i = geByClass("page_post_thumb_wrap");
            i.push.apply(i, geByClass("page_preview_photo")), i.push.apply(i, geByClass("im_preview_photo")), i.push.apply(i, geByClass("photo"));
            for (var l in i) {
                var u = i[l].getAttribute("onclick");
                u && -1 != u.indexOf("'" + cur.filterPhoto + "'") && r.push(i[l])
            }
            for (var l in r)
                if (r[l]) {
                    var o = geByTag1("img", r[l]);
                    o && (o.src = e, setStyle(o, {
                        height: "auto"
                    }))
                }
            if (cur.pvNoTemp || (cur.pvNoTemp = {}), cur.pvNoTemp[cur.filterPhoto] = !0, window.ThumbsEdit && t) {
                var s = ThumbsEdit.cache();
                for (var l in s) {
                    var c = s[l].previews || [],
                        a = !1;
                    for (var n in c) "photo" == c[n].type && c[n].photo.id == "photo" + cur.filterPhoto && (c[n].photo.sizes = t, a = !0);
                    a && ThumbsEdit.refresh(l)
                }
            }
        }
    },
    save: function(e) {
        var t = {
            act: "save_desc",
            photo: cur.filterPhoto,
            hash: cur.filterHash,
            aid: cur.pvMoveToAlbum.val(),
            cover: isChecked("pv_cover_check"),
            text: ge("pv_sett_desc").value,
            filter_num: cur.filterApplied,
            conf: Filters.toStr()
        };
        e && (e.hash ? extend(t, {
            filter_hash: e.hash,
            filter_aid: e.aid,
            filter_server: e.server,
            filter_photo: e.photos_list
        }) : t._query = e), ajax.post("al_photos.php", t, {
            onDone: function(e, r, i, l, u) {
                if (cur.webcamPhotoMedia) {
                    l && u && (cur.uploadPhotoData.editable.sizes = u, cur.uploadPhotoData.thumb_m = cur.uploadPhotoData.thumb_s = l), photos.onFiltersSave();
                    var o = curBox();
                    return void(o && o.hide())
                }
                var s = cur.pvListId,
                    c = cur.pvIndex,
                    a = cur.pvData[s];
                if (!a) return nav.reload();
                var n = a[c];
                unlockButton(ge("pv_filter_save"));
                var o = curBox();
                if (o && o.hide(), n.desc = e, r && (n.album = r), "album" == s.substr(0, 5)) {
                    var p = intval(s.split("_")[1]);
                    n.moved = t.aid != p
                }
                n.pe_type = Photoview.PE_V1;
                var v = cur.pvShown && s == cur.pvListId && c == cur.pvIndex;
                if (i && l && (Filters.changeThumbs(l, u), delete n.x_, delete n.x_src, delete n.y_, delete n.y_src, delete n.z_, delete n.z_src, extend(n, i)), v) {
                    var f = domFC(cur.pvDesc);
                    val(f, e || '<span class="pv_desc_edit">' + getLang("photos_edit_desc") + "</span>"), f.onmouseover = e ? Photoview.descTT.pbind(f) : function() {}, r && ge("pv_album") && (ge("pv_album").innerHTML = r), cur.pvCurData = Photoview.genData(n, vk.pvbig ? cur.pvVeryBig ? (cur.pvVeryBig > 1, "z") : "y" : "x"), domFC(cur.pvPhoto).src = Photoview.blank, setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0)
                }
            }
        })
    },
    restoreOriginal: function(e, t, r, i) {
        ajax.post("al_photos.php", {
            act: "restore_original",
            oid: t,
            pid: r,
            hash: i
        }, {
            onDone: function(e, t, r) {
                var i = cur.pvListId,
                    l = cur.pvIndex,
                    u = cur.pvData[i][l],
                    o = cur.pvShown && i == cur.pvListId && l == cur.pvIndex;
                extend(u, e), u.pe_type && (u.pe_type = Photoview.PE_V1 | Photoview.PE_V2 | Photoview.PE_V3);
                var s = curBox();
                s && s.hide(), Filters.changeThumbs(t, r), o && (cur.pvCurData = Photoview.genData(u, vk.pvbig ? cur.pvVeryBig ? (cur.pvVeryBig > 1, "z") : "y" : "x"), cur.pvPhoto.firstChild.src = cur.pvCurData.src, setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0))
            },
            loader: 1
        })
    },
    showName: function(e, t) {
        cur.tooltipObj && cur.tooltipObj && Filters.hideLevels(e), cur.tooltipObj = e;
        var r = Filters.getLevelCont(e, t);
        show(r), removeClass(r, "pv_level_before_hide"), cssAnim(r, {
            height: 15,
            marginTop: -15,
            opacity: 1
        }, {
            duration: 300,
            func: "ease-out"
        })
    },
    eof: 1
};
try {
    stManager.done("filters.js")
} catch (e) {}