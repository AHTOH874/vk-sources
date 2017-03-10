/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 2834875544
    Link: https://vk.com/js/al/spe.js?2834875544
    Last Update: 10.2.117
*/
! function(e) {
    function t() {
        return window.devicePixelRatio >= 2
    }

    function a(e, t, a) {
        function i(t, a) {
            re(r);
            var i = getSize(cur.pvCont)[1],
                s = se(t);
            cur.pvNarrowColumnWrap.appendChild(s), setStyle(s, "height", i), hide(cur.pvNarrowColumn), Ce = {}, q = a, q.hash = e.pe_hash, Ce.stickersListEl = geByClass1("pe_sticker_pack_list"), Ce.tabs = geByClass("pe_tab"), Ce.tabContents = geByClass("pe_tab_content"), Ce.editPanel = s, extend(cur.lang, a.lang), each(q.stickerPacks, function(e, t) {
                each(t, function(e, t) {
                    ke[t.id] = t
                })
            }), _(), xe = se("<div></div>"), cur.pvBottomInfo.appendChild(xe), q.edited && q.canEdit ? xe.appendChild(se('<a class="pe_restore_link" onclick="SPE.restoreOriginal()">' + getLang("photos_filtered_restore") + "</a>")) : q.canEdit || xe.appendChild(se('<span class="pe_bottom_info">' + getLang("photos_will_be_saved_to_pe_album") + "</span>")), xe.appendChild(K = se('<a class="pe_delete_selected_btn" onclick="SPE.deleteSelected()"></a>')), J = geByClass1("_pe_save_btn"), this.openTab(ge("pe_tab_stickers")), n()
        }
        s(), U = t, G = a, addClass(cur.pvCont, "pv_pe");
        var r = se('<div id="pe_font_preload">      <div style="font-family: \'ImpactPE\'">test</div>       <div style="font-family: \'Lobster\'">test</div>       <div style="font-family: \'RobotoPE\'">test</div>     </div>');
        cur.pvCont.appendChild(r), hide(domFC(cur.pvBottomInfo)), e.pe_html && e.pe_data ? (i.call(this, e.pe_html, e.pe_data), delete e.pe_html, delete e.pe_data) : ajax.post("al_photos.php", {
            act: "get_editor",
            photo_id: e.id,
            hash: e.pe_hash
        }, {
            onDone: i.bind(this)
        })
    }

    function n() {
        var e = P(!0).length > 0 || Se.length > 0 || Ce.textLayers.children.length > 0;
        toggleClass(J, "button_disabled", !e)
    }

    function i() {
        removeClass(cur.pvCont, "pv_pe"), show(cur.pvNarrowColumn), re(Ce.editPanel), re(Ce.canvasEl), re(oe), xe && re(xe), show(domFC(cur.pvBottomInfo)), G()
    }

    function s() {
        Q = null, ce = null, Se = [], de && de.destroy(), pe && pe.destroy(), le && le.destroy(), de = pe = le = null
    }

    function r() {
        function e() {
            i = Math.max(Math.min(0, i), r), setStyle(a, "left", i), toggle(t[0], 0 > i), toggle(t[1], i > r)
        }
        var t = geByClass("pe_sticker_pack_tab_btn"),
            a = geByClass1("pe_sticker_packs_slider_cont"),
            n = domPN(a),
            i = intval(getStyle(a, "left")),
            s = 250,
            r = -a.scrollWidth + getSize(n)[0];
        addEvent(n, "mousewheel", function(t) {
            i -= t.deltaY, e()
        }), addEvent(t[0], "click", function(t) {
            return i += s, e(), cancelEvent(t)
        }), addEvent(t[1], "click", function(t) {
            return i -= s, e(), cancelEvent(t)
        })
    }

    function o(e) {
        each(Ce.tabs, function() {
            removeClass(this, "pe_selected")
        }), each(Ce.tabContents, function() {
            hide(this)
        }), addClass(e, "pe_selected");
        var t = e.id.split("_")[2],
            a = ge("pe_tab_content_" + t);
        switch (show(a), V = Z = $ = !1, t) {
            case "stickers":
                w(a);
                break;
            case "text":
                b(a);
                break;
            case "draw":
                I(a)
        }
    }

    function l() {
        var e = Q;
        m(), re(e), n()
    }

    function c(e) {
        return 90 == e.keyCode && (e.metaKey || e.ctrlKey) && M(), inArray(e.keyCode, [8, 46]) && Q && "TEXTAREA" != e.target.nodeName ? (l(), cancelEvent(e)) : !0
    }

    function d(e, t, a) {
        var n = e + "_" + t;
        if (!be[n] || a) {
            var i = vkImage();
            i.onload = function() {
                a && a(this)
            }, i.src = ke[e].sizes[t], be[n] = i
        }
    }

    function p(e, t) {
        var a = e + "_" + t;
        return be[a]
    }

    function v(e) {
        q.stickerPackSelected = e, each(geByClass("pe_sticker_pack_tab"), function() {
            removeClass(this, "pe_selected")
        }), addClass("pe_stickers_pack_tab_" + e, "pe_selected"), ee && ee.destroy(), Ce.stickersListEl.innerHTML = "", setStyle(Ce.stickersListEl, "height", getXY(cur.pvCont)[1] + getSize(cur.pvCont)[1] - getXY(Ce.stickersListEl)[1] - getSize(geByClass1("pe_bottom_actions"))[1]);
        var t = 0,
            a = 16;
        ee = new uiScroll(Ce.stickersListEl, {
            onmoreThreshold: 200,
            onmore: function(n) {
                var i = q.stickerPacks[e].slice(t, t + a);
                each(i, function(e, t) {
                    n.content.appendChild(se('<div class="pe_sticker_preview" data-sticker-id="' + t.id + '"><img src="' + t.sizes[ue] + '"/></div>'))
                }), t += a
            }
        });
        var n, i;
        removeEvent(Ce.stickersListEl, "mousedown"), addEvent(Ce.stickersListEl, "mousedown", function(t) {
            var a = domClosest("pe_sticker_preview", t.target);
            if (a) {
                var s = domData(a, "sticker-id"),
                    r = ke[s],
                    o = 1;
                d(s, ye, function(e) {
                    o = e.width / e.height
                });
                var l = se('<div class="pe_sticker_preview_drag"><img src="' + r.sizes[fe] + '"/><div>');
                cur.pvCont.appendChild(l);
                var c = [t.pageX, t.pageY],
                    p = 0;
                return n = function(e) {
                    t = t || getSize(l);
                    var t = [fe * o, fe];
                    setStyle(l, {
                        left: e.pageX - t[0] / 2,
                        top: e.pageY - scrollGetY() - t[1] / 2
                    });
                    var a = [e.pageX - c[0], e.pageY - c[1]];
                    p = Math.sqrt(a[0] * a[0] + a[1] * a[1])
                }, addEvent(window, "mousemove", n), addEvent(window, "mouseup", i = function(t) {
                    var a = getSize(geByTag1("img", l));
                    re(l);
                    var s = u(t);
                    r = extend({}, r, {
                        size: a,
                        packId: e
                    }), s[0] > 0 && s[0] < W[0] && s[1] > 0 && s[1] < W[1] ? x("sticker", s[0], s[1], r) : 5 > p && x("sticker", W[0] / 2, W[1] / 2, r), removeEvent(window, "mousemove", n), removeEvent(window, "mouseup", i)
                }), n(t), cancelEvent(t)
            }
        })
    }

    function _() {
        var e = domFC(cur.pvPhoto),
            t = getSize(e);
        getXY(e);
        Ce.canvasEl = se('<div class="pe_canvas">       <div class="pe_canvas_sticker_layers"></div>       <canvas class="pe_drawing_canvas" width="' + t[0] + '" height="' + t[1] + '"></canvas>       <div class="pe_canvas_text_layers"></div>     </div>'), setStyle(Ce.canvasEl, {
            width: t[0],
            height: t[1],
            marginTop: e.style.marginTop,
            marginLeft: e.offsetLeft
        }), W = t, cur.pvPhoto.appendChild(Ce.canvasEl), Ce.textEdits = cur.pvCont, Ce.stickerLayers = geByClass1("pe_canvas_sticker_layers", Ce.canvasEl), Ce.textLayers = geByClass1("pe_canvas_text_layers", Ce.canvasEl), Ce.drawingCanvas = geByClass1("pe_drawing_canvas", Ce.canvasEl);
        var a, n;
        addEvent(Ce.canvasEl, "mousedown", function(e) {
            return hasClass(e.target, "pe_textarea") ? void e.originalEvent.stopPropagation() : (cancelEvent(e), V && V(e), a && removeEvent(window, "mousemove", a), addEvent(window, "mousemove", a = function(e) {
                Z && Z(e)
            }), n && removeEvent(window, "mouseup", n), addEvent(window, "mouseup", n = function(e) {
                $ && $(e), removeEvent(window, "mousemove", a), removeEvent(window, "mouseup", n)
            }), !1)
        })
    }

    function h(e, t) {
        if (t) return [e.offsetLeft, e.offsetTop];
        var a = getXY(Ce.canvasEl),
            n = getXY(e);
        return [n[0] - a[0], n[1] - a[1]]
    }

    function g(e) {
        return [e.offsetWidth, e.offsetHeight]
    }

    function u(e) {
        var t = getXY(Ce.canvasEl);
        return [e.pageX - t[0], e.pageY - t[1]]
    }

    function f(e) {
        return e && hasClass(e, "pe_canvas_text_layer")
    }

    function y(e) {
        return geByClass1("pe_layer_text_inner", e)
    }

    function m() {
        L(), te && (re(te), Q = !1), hide(K)
    }

    function w() {
        r(), v(q.stickerPackSelected), k()
    }

    function C(e) {
        if (m(), te && re(te), te = se('       <div class="pe_layer_selection">         <div class="pe_layer_selection_handler" id="pe_nw"></div>         <div class="pe_layer_selection_handler" id="pe_ne"></div>         <div class="pe_layer_selection_handler" id="pe_se"></div>         <div class="pe_layer_selection_handler" id="pe_sw"></div>       </div>     '), e.appendChild(te), Q = e, f(Q)) {
            var t = y(Q);
            ae = parseInt(t.style.fontSize), ie = t.style.fontFamily, ne = domData(t, "color-index");
            var a = ge("pe_font_roboto");
            ie.toLowerCase().indexOf("impact") >= 0 && (a = ge("pe_font_impact")), ie.toLowerCase().indexOf("lobster") >= 0 && (a = ge("pe_font_lobster")), radiobtn(a, 1, "pe_fonts"), le.setValue((ae - we) / 100), F(ge("pe_text_color_picker"), ne)
        }
        K.innerHTML = f(Q) ? getLang("photos_pe_delete_text") : getLang("photos_pe_delete_sticker"), show(K)
    }

    function k() {
        V = function(e) {
            if (hasClass(e.target, "pe_layer_selection_handler")) {
                var t, a = e.target.id.split("_")[1],
                    n = gpeByClass("pe_canvas_layer", e.target),
                    i = g(n),
                    s = h(n, !0),
                    r = [s[0] + i[0] / 2, s[1] + i[1] / 2];
                switch (a) {
                    case "se":
                        t = [s[0] + i[0] - r[0], s[1] + i[1] - r[1]];
                        break;
                    case "sw":
                        t = [s[0] - r[0], s[1] + i[1] - r[1]];
                        break;
                    case "ne":
                        t = [s[0] + i[0] - r[0], s[1] - r[1]];
                        break;
                    case "nw":
                        t = [s[0] - r[0], s[1] - r[1]]
                }
                var o = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
                return Z = function(e) {
                    var a = u(e),
                        s = [a[0] - r[0], a[1] - r[1]],
                        l = 180 * (Math.atan2(s[1], s[0]) - Math.atan2(t[1], t[0])) / Math.PI,
                        c = {
                            transform: "rotateZ(" + l + "deg)"
                        };
                    if (!f(Q)) {
                        var d = Math.max(me, Math.sqrt(s[0] * s[0] + s[1] * s[1])),
                            p = d / o,
                            v = i[0] * p,
                            _ = i[1] * p;
                        extend(c, {
                            width: v,
                            height: _,
                            left: r[0] - v / 2,
                            top: r[1] - _ / 2
                        })
                    }
                    setStyle(n, c)
                }, void($ = !1)
            }
            var l = e.target;
            if (l == Ce.canvasEl) return m(), $ = Z = !1, !1;
            var c = !1;
            if (hasClass(l, "pe_layer_selection") && (l = gpeByClass("pe_canvas_layer", l), c = !0), !l || !hasClass(l, "pe_canvas_layer")) return !1;
            C(l);
            var d = u(e),
                p = h(l, !0),
                v = 0;
            Z = function(e) {
                var t = u(e);
                v = [d[0] - t[0], d[1] - t[1]], setStyle(l, {
                    left: p[0] - v[0],
                    top: p[1] - v[1]
                })
            }, $ = function(e) {
                var t = v ? Math.sqrt(v[0] * v[0] + v[1] * v[1]) : 0;
                return c && f(l) && 2 >= t ? (m(), void B(l)) : void 0
            }
        }
    }

    function x(e, t, a, i) {
        var s = se('<div class="pe_canvas_layer"></div>');
        if (m(), "sticker" == e) {
            setStyle(s, "background-image", "url('" + i.sizes[ue] + "')"), domData(s, "sticker-id", i.id), domData(s, "pack-id", i.packId);
            var r = (Math.max(W[0], W[1]), i.size[0] / i.size[1]),
                o = [fe * r, fe];
            setStyle(s, {
                left: t - o[0] / 2,
                top: a - o[1] / 2,
                width: o[0],
                height: o[1]
            });
            var l = vkImage();
            l.onload = function() {
                setStyle(s, "background-image", "url('" + i.sizes[ye] + "')")
            }, l.src = i.sizes[ye], setTimeout(function() {
                C(s)
            }, 10), Ce.stickerLayers.appendChild(s)
        } else if ("text" == e) {
            var c = q.textPlaceholders[irand(0, q.textPlaceholders.length - 1)];
            s.innerHTML = '<span class="pe_layer_text_inner">' + c + "</span>", setStyle(y(s), {
                fontFamily: ie,
                fontSize: ae,
                color: Ee[ne]
            }), setStyle(s, "visibility", "hidden"), domData(y(s), "color-index", ne), setTimeout(function() {
                var e = getSize(s);
                setStyle(s, {
                    top: .7 * W[1],
                    left: .5 * W[0] - e[0] / 2,
                    visibility: null
                })
            }), addClass(s, "pe_canvas_text_layer"), Ce.textLayers.appendChild(s)
        }
        return n(), s
    }

    function E(e) {
        if (f(Q)) {
            e || (e = {
                fontFamily: ie,
                fontSize: ae,
                color: Ee[ne]
            });
            var t = y(Q),
                a = e.fontFamily ? e.fontFamily : t.style.fontFamily,
                n = a.toLowerCase().indexOf("impact") >= 0,
                i = a.toLowerCase().indexOf("lobster") >= 0;
            setStyle(t, e), toggleClass(t, "pe_text_impact_style", n), toggleClass(t, "pe_text_lobster_style", i), oe && (setStyle(oe, e), toggleClass(oe, "pe_text_impact_style", n), toggleClass(oe, "pe_text_lobster_style", i), triggerEvent(oe, "change"))
        }
    }

    function b(e) {
        var t = geByClass1("pe_text_fonts");
        radioBtns.pe_fonts = {
            els: geByClass("_pe_text_font_rdbtn")
        }, removeEvent(t, "click"), addEvent(t, "click", function(e) {
            var t = e.target;
            hasClass(t, "radiobtn") && (radiobtn(t, 1, "pe_fonts"), ie = domData(t, "font"), E({
                fontFamily: ie
            }))
        }), ie = domData(geByClass1("_pe_text_font_rdbtn", t), "font"), le = le || new Slider(geByClass1("pe_text_size_slider"), {
            value: .5,
            fireChangeEventOnInit: !0,
            size: 2,
            onChange: function(e) {
                e = 100 * e + we, ae = e, E({
                    fontSize: e
                })
            },
            formatHint: function(e) {
                return parseInt(100 * e + we)
            }
        }), z(ge("pe_text_color_picker"), function(e, t) {
            if (ne = t, f(Q)) {
                var a = y(Q);
                setStyle(a, {
                    color: e
                }), domData(a, "color-index", t)
            }
        }, 7);
        var a = Ce.textLayers.children.length > 0;
        a || S(), k()
    }

    function S() {
        m();
        var e = x("text", 0, 0);
        setTimeout(B.pbind(e), 5)
    }

    function L() {
        if (Q && f(Q)) {
            var e = geByClass1("pe_textarea", Ce.textEdits);
            if (e) {
                var t = val(e).replace(/\n/g, "</br>");
                val(geByClass1("pe_layer_text_inner", Q), t), domPN(e) && re(e), show(Q), oe = !1
            }
        }
    }

    function B(e) {
        var t = se('<textarea class="pe_textarea"></textarea>'),
            a = g(e),
            n = h(e, !0),
            i = y(e),
            s = i.innerHTML;
        s = s.replace(/<\/?br>/g, "\n"), val(t, s);
        var r = window.getComputedStyle(i),
            o = {
                color: "white",
                fontFamily: r.fontFamily,
                fontSize: r.fontSize
            };
        setStyle(t, extend({
            width: a[0] + 2,
            height: a[1],
            left: n[0] + parseInt(Ce.textEdits.style.paddingLeft) + parseInt(Ce.canvasEl.style.marginLeft),
            top: n[1] + parseInt(Ce.canvasEl.style.marginTop)
        }, o)), Ce.textEdits.appendChild(t), t.select(), t.focus();
        var c = !0;
        addEvent(t, "input paste change", function() {
            if (c) {
                var e = val(t);
                if (!trim(e)) return c = !1, l();
                e = e.replace(/\n/g, "</br>") + (inArray(e[e.length - 1], ["\n", " "]) ? "&nbsp;" : "");
                var a = se('<div class="pe_text_temp">' + e + "</div>"),
                    n = y(Q),
                    i = window.getComputedStyle(n),
                    s = {
                        fontSize: i.fontSize,
                        fontFamily: i.fontFamily,
                        letterSpacing: i.letterSpacing
                    };
                Ce.canvasEl.appendChild(a), setStyle(a, s);
                var r = getSize(a);
                re(a), setStyle(t, {
                    width: r[0],
                    height: r[1] + 8
                })
            }
        }), hide(e), Q = e, oe = t, E(), triggerEvent(t, "change")
    }

    function F(e, t) {
        var a = e.children[t];
        removeClass(geByClass1("pe_selected", e), "pe_selected"), addClass(a, "pe_selected")
    }

    function z(e, t, a) {
        function n(a) {
            var n = a.target,
                i = domData(n, "color-index");
            F(e, i), t(Ee[i], i)
        }
        e.children.length > 0 || (each(Ee, function(t, a) {
            var n = "#FFFFFF" == a ? "pe_drawing_color_white" : "";
            e.appendChild(se('<div class="pe_drawing_color ' + n + '" data-color-index="' + t + '" style="background-color: ' + a + '"></div>'))
        }), removeEvent(e, "click"), addEvent(e, "click", n), addClass(e, "pe_drawing_colors_wrap"), addClass(e, "clear_fix"), n({
            target: e.children[a || 0]
        }))
    }

    function I(e) {
        function t(e) {
            _e = e, T()
        }
        var a;
        m(), V = function(e) {
            var t = u(e);
            a = [t, clone(t)], a[1][1] += .1, Se.push({
                color: _e,
                width: ve,
                opacity: he,
                path: a
            }), O()
        }, Z = function(e) {
            a.push(u(e)), O()
        }, $ = function(e) {
            n(), toggle(Ce.undoDrawing, Se.length > 0)
        }, de = de || new Slider(geByClass1("pe_drawing_width_slider"), {
            value: .3,
            fireChangeEventOnInit: !0,
            size: 2,
            log: !0,
            onChange: function(e) {
                e += .1, ve = 20 * e, T()
            },
            formatHint: function(e) {
                return parseInt(100 * e)
            }
        }), pe = pe || new Slider(geByClass1("pe_drawing_intensity_slider"), {
            value: 1,
            fireChangeEventOnInit: !0,
            size: 2,
            onChange: function(e) {
                he = e, T()
            },
            formatHint: function(e) {
                return parseInt(100 * e) + "%"
            }
        }), z(ge("pe_drawing_color_picker"), t, 0), Ce.undoDrawing = geByClass1("_pe_drawing_undo"), removeEvent(Ce.undoDrawing, "click"), addEvent(Ce.undoDrawing, "click", M), Ce.drawingPreview = geByClass1("pe_drawing_preview"), T()
    }

    function P(e) {
        var t = [];
        return each(Ce.stickerLayers.children, function() {
            var a = domData(this, "pack-id");
            (!isNaN(a) || e) && t.push(domData(this, "sticker-id"))
        }), t
    }

    function T() {
        if (Ce.drawingPreview) {
            var e = Ce.drawingPreview.getContext("2d");
            e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.beginPath(), e.moveTo(26, 25), e.bezierCurveTo(69, 65, 162, 61, 180, 23), e.lineWidth = ve, e.strokeStyle = D(_e, he), e.lineJoin = e.lineCap = "round", e.stroke()
        }
    }

    function D(e, t) {
        var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return "rgba(" + parseInt(a[1], 16) + ", " + parseInt(a[2], 16) + ", " + parseInt(a[3], 16) + ", " + t + ")"
    }

    function M() {
        Se.pop(), O(), toggle(Ce.undoDrawing, Se.length > 0)
    }

    function O(e, t) {
        var a = e;
        ce || a || (ce = Ce.drawingCanvas.getContext("2d")), e = e || ce, t = t || 1, e.lineJoin = e.lineCap = "round", a || e.clearRect(0, 0, e.canvas.width, e.canvas.height);
        for (var n = 0, i = Se.length; i > n; n++) {
            var s = Se[n];
            e.lineWidth = s.width * t, e.strokeStyle = D(s.color, s.opacity), e.beginPath(), e.moveTo(s.path[0][0] * t, s.path[0][1] * t);
            for (var r = 0, o = s.path.length; o > r; r++) e.lineTo(s.path[r][0] * t, s.path[r][1] * t);
            e.stroke()
        }
    }

    function X(e) {
        isArray(e) && (e = e[0]);
        var t = 512;
        return 256 >= e ? t = 256 : 128 >= e ? t = 128 : 64 >= e && (t = 64), t
    }

    function H(e) {
        lockButton(e), m();
        var t = vkImage();
        t.setAttribute("crossOrigin", "Anonymous"), t.onerror = function() {
            new MessageBox({
                title: getLang("global_error")
            }).content(getLang("photos_pe_save_error")).setButtons("Ok", function() {
                curBox().hide()
            }).show(), unlockButton(e)
        }, t.onload = function() {
            var e = t.width / W[0],
                a = Ce.stickerLayers.children;
            if (a.length) {
                var n = new callHub(function() {
                    R(t, A)
                }, a.length);
                each(a, function() {
                    var t = g(this)[0] * e,
                        a = domData(this, "sticker-id");
                    d(a, X(t), function() {
                        n.done()
                    })
                })
            } else R(t, A)
        }, t.src = q.maxPhotoUrl
    }

    function Y() {
        var e = "";
        return each(Ce.textLayers.children, function() {
            e += y(this).innerHTML
        }), e
    }

    function A(e) {
        var t = new FormData;
        t.append("file0", e, encodeURIComponent("edited_" + irand(99999) + ".jpg"));
        var a = q.upload.url,
            n = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
            s = new n;
        s.open("POST", a, !0), s.onload = function(e) {
            e = e.target.responseText;
            var t = (parseJSON(e), P());
            ajax.post("al_photos.php", {
                act: "pe_save",
                photo: q.photoId,
                hash: q.hash,
                _query: e,
                stickers: t.length ? t.join(",") : null,
                need_copy: q.need_copy,
                texts: Y()
            }, {
                onDone: function(e, t, a, n, s) {
                    i(), U(t, a, n, s)
                }
            })
        }, s.send(t)
    }

    function N() {
        var e = q.photoId.split("_");
        ajax.post("al_photos.php", {
            act: "restore_original",
            oid: e[0],
            pid: e[1],
            hash: q.hash
        }, {
            onDone: function(e, t, a, n) {
                i(), U(e, t, a, n)
            }
        })
    }

    function R(e, t) {
        var a = se('<canvas width="' + e.width + '" height="' + e.height + '">'),
            n = a.getContext("2d"),
            i = e.width / W[0],
            s = browser.mozilla ? -5 : browser.chrome ? 7.778 : 0;
        s *= i, n.drawImage(e, 0, 0), each(Ce.stickerLayers.children, function() {
            var e = this;
            n.save();
            var t = g(e);
            t[0] *= i, t[1] *= i;
            var a = h(e, !0);
            a[0] *= i, a[1] *= i;
            var s = e.style.transform ? parseFloat(e.style.transform.match(/-?[\d.]+/)[0]) * Math.PI / 180 : 0;
            n.translate(a[0], a[1]), n.translate(t[0] / 2, t[1] / 2), n.rotate(s), n.translate(-t[0] / 2, -t[1] / 2);
            var r = domData(e, "sticker-id"),
                o = p(r, X(t));
            n.drawImage(o, 0, 0, t[0], t[1]), n.restore()
        }), O(n, i), each(Ce.textLayers.children, function() {
            var e = this;
            n.save();
            var t = g(e);
            t[0] *= i, t[1] *= i;
            var a = h(e, !0);
            a[0] *= i, a[1] *= i;
            var r = e.style.transform ? parseFloat(e.style.transform.match(/-?[\d.]+/)[0]) * Math.PI / 180 : 0;
            n.translate(t[0] / 2, 0), n.translate(a[0], a[1]), n.translate(0, t[1] / 2), n.rotate(r), n.translate(0, -t[1] / 2);
            var o = y(e),
                l = replaceEntities(o.innerHTML.replace(/<br>/g, "\n")).split("\n"),
                c = parseInt(o.style.fontSize) * i,
                d = o.style.fontFamily,
                p = d.toLowerCase().indexOf("impact") >= 0,
                v = d.toLowerCase().indexOf("lobster") >= 0;
            n.textBaseline = "top", n.fillStyle = o.style.color, n.font = c + "px " + d, n.textAlign = "center", p && (n.strokeStyle = "black", n.lineWidth = 10, n.lineJoin = "round"), v && (n.shadowColor = "rgba(0, 0, 0, 0.6)", n.shadowBlur = 3, n.shadowOffsetX = 1, n.shadowOffsetY = 1);
            for (var _ = 0; _ < l.length; _++) p && n.strokeText(l[_], 0, _ * c - s), n.fillText(l[_], 0, _ * c - s);
            n.restore()
        }), a.toBlob(t, "image/jpeg", 1)
    }

    function j(e) {
        if (hasClass(J, "button_disabled")) return i(), e();
        var t = showFastBox({
            title: getLang("photos_pe_are_you_sure_close_title"),
            bodyStyle: "padding: 20px; line-height: 160%;",
            dark: 1,
            forceNoBtn: 1
        }, getLang("photos_pe_are_you_sure_close_text"), getLang("box_yes"), function() {
            i(), t.hide(), e()
        }, getLang("box_no"))
    }
    var q, W, J, K, U, G, V, Z, $, Q, ee, te, ae, ne, ie, oe, le, ce, de, pe, ve, _e, he, ue = t() ? 256 : 128,
        fe = t() ? 256 : 128,
        ye = 512,
        me = 30,
        we = 10,
        Ce = {},
        ke = {},
        xe = "",
        Ee = ["#E64646", "#FF9300", "#FFCB00", "#62DA37", "#00AEF9", "#CC74E1", "#000000", "#FFFFFF"],
        be = {},
        Se = [];
    e.SPE = {
        init: a,
        openTab: o,
        onKeyPress: c,
        addTextLayer: S,
        save: H,
        closeEditor: i,
        restoreOriginal: N,
        selectStickerPack: v,
        attemptHide: j,
        deleteSelected: l
    }
}(window);
try {
    stManager.done("spe.js")
} catch (e) {}