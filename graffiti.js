/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1826105362
    Link: https://vk.com/js/al/graffiti.js?1826105362
    Last Update: 10.2.117
*/
var Graffiti = {
    init: function() {
        function i(i) {
            var t = ce("div");
            return t.innerHTML = i.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t.textContent || t.innerText
        }
        var t = navigator.userAgent.toLowerCase();
        /android|iphone|ipod|ipad|opera mini|opera mobi/i.test(t), this.W = 586, this.H = 293, this.factor = 1, this.brush = {
            size: 0,
            opacity: 0,
            color: "51, 102, 153"
        }, this.resizing = !1, this.resDif = 0, this.resW = 586, this.resH = 293, this.fsEnabled = !1, this.resizer = ge("graffiti_resizer"), this.histHelpCanv = ge("graffiti_hist_helper"), this.histHelpCtx = this.histHelpCanv.getContext("2d"), this.canvWrapper = ge("graffiti_aligner"), this.mainCanv = ge("graffiti_common"), this.mainCtx = this.mainCanv.getContext("2d"), this.overlayCanv = ge("graffiti_overlay"), this.overlayCtx = this.overlayCanv.getContext("2d"), this.helpCanv = ge("graffiti_helper"), this.helpCtx = this.helpCanv.getContext("2d"), this.controlsCanv = ge("graffiti_controls"), this.controlsCtx = this.controlsCanv.getContext("2d"), this.grWrapper = ge("graffiti_wrapper"), this.cpWrapper = ge("graffiti_cpwrap"), this.cpCanv = ge("graffiti_cpicker"), this.rzLink = ge("graffiti_resize_link"), this.cpCtx = this.cpCanv.getContext("2d"), this.addSlider("size", this.controlsCtx, 267, 31, 20), this.addSlider("opacity", this.controlsCtx, 483, 31, 80), this.redrawColorPickerButton(this.controlsCtx, 147, 30, "51, 102, 153", !1), this.addText(this.controlsCtx, i(cur.lang.graffiti_flash_color), 137, 35.5), this.addText(this.controlsCtx, i(cur.lang.graffiti_flash_opacity), 473, 35.5), this.addText(this.controlsCtx, i(cur.lang.graffiti_flash_thickness), 257, 35.5), this.drawColorPicker(this.cpCtx), this.attachEvents(), this.canvWrapper.style.width = this.W + "px", this.canvWrapper.style.height = this.H + "px"
    },
    mouse: {
        pressed: !1,
        touched: !1,
        x: [],
        y: []
    },
    destroy: function() {
        this.detachEvents(), Graffiti.hstorage = [], Graffiti.gstorage = [], Graffiti.checkPoint = ""
    },
    events: {
        controls: function(i) {
            return Graffiti.handleControlsEvents(i), cancelEvent(i)
        },
        drawing: function(i) {
            return Graffiti.handleDrawingEvents(i), cancelEvent(i)
        },
        all: function(i) {
            return Graffiti.handleDrawingEvents(i), Graffiti.handleControlsEvents(i), Graffiti.handleResize(i), "mousemove" == i.type || "touchmove" == i.type ? cancelEvent(i) : void 0
        },
        color: function(i) {
            return Graffiti.handleColorPickerEvents(i), cancelEvent(i)
        },
        controlsF: function(i) {
            return Graffiti.handleControlsEvents(i), !1
        },
        keyboard: function(i) {
            return Graffiti.keyboardEvents(i) ? void 0 : cancelEvent(i)
        },
        cancel: function(i) {
            return cancelEvent(i)
        },
        resize: function(i) {
            return Graffiti.handleResize(i), cancelEvent(i)
        }
    },
    attachEvents: function() {
        var i = Graffiti.events;
        window.navigator.msPointerEnabled ? (addEvent(Graffiti.controlsCanv, "MSPointerDown MSPointerMove MSPointerUp", i.controls), addEvent(Graffiti.overlayCanv, "MSPointerDown MSPointerMove MSPointerUp", i.drawing), addEvent(Graffiti.cpCanv, "MSPointerDown MSPointerMove", i.color)) : (addEvent(Graffiti.controlsCanv, "mousedown click touchstart touchmove touchend", i.controls), addEvent(window, "mousemove mouseup touchmove touchend", i.all), addEvent(Graffiti.overlayCanv, "mousedown click touchstart touchmove touchend", i.drawing), addEvent(Graffiti.cpCanv, "mousemove click touchstart touchmove", i.color)), addEvent(Graffiti.controlsCanv, "DOMMouseScroll mousewheel", i.controlsF), addEvent(document, "keydown keyup", i.keyboard), addEvent(document, "contextmenu", i.cancel), addEvent(document.body, "selectstart", i.cancel), addEvent(Graffiti.resizer, "mousedown", i.resize)
    },
    detachEvents: function() {
        var i = Graffiti.events;
        window.navigator.msPointerEnabled ? (removeEvent(Graffiti.controlsCanv, "MSPointerDown MSPointerMove MSPointerUp", i.controls), removeEvent(Graffiti.overlayCanv, "MSPointerDown MSPointerMove MSPointerUp", i.drawing), removeEvent(Graffiti.cpCanv, "MSPointerDown MSPointerMove", i.color)) : (removeEvent(Graffiti.controlsCanv, "mousedown click touchstart touchmove touchend", i.controls), removeEvent(window, "mousemove mouseup touchmove touchend", i.all), removeEvent(Graffiti.overlayCanv, "mousedown click touchstart touchmove touchend", i.drawing), removeEvent(Graffiti.cpCanv, "mousemove click touchstart touchmove touchend", i.color)), removeEvent(Graffiti.controlsCanv, "DOMMouseScroll mousewheel", i.controlsF), removeEvent(document, "keydown keyup", i.keyboard), removeEvent(document.body, "selectstart", i.cancel), removeEvent(Graffiti.resizer, "mousedown", i.resize), removeEvent(document, "contextmenu", i.cancel)
    },
    handleResize: function(i) {
        if (2 != i.button) switch (i.type) {
            case "mousedown":
                document.body.style.cursor = "s-resize", Graffiti.controlsCanv.style.cursor = "s-resize";
                var t = Graffiti.getMouseXY(i, window);
                Graffiti.resDif = t.y, Graffiti.resizing = !0, Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H);
                break;
            case "mousemove":
                if (Graffiti.resizing) {
                    var t = Graffiti.getMouseXY(i, window),
                        r = parseInt(Graffiti.canvWrapper.style.height),
                        e = (parseInt(Graffiti.canvWrapper.style.width), r + t.y - Graffiti.resDif);
                    e > 586 && (e = 586), 293 > e && (e = 293);
                    var a = e / Graffiti.H * Graffiti.W;
                    Graffiti.resW = a, Graffiti.resH = e, Graffiti.canvWrapper.style.width = a + "px", Graffiti.canvWrapper.style.height = e + "px", Graffiti.onResize && Graffiti.onResize(a, e), Graffiti.resDif = t.y
                }
                break;
            case "mouseup":
                Graffiti.resizing && (Graffiti.resizing = !1, Graffiti.resDif = 0, Graffiti.controlsCanv.style.cursor = "default", document.body.style.cursor = "default", Graffiti.factor = Graffiti.resH / 293, Graffiti.W = Graffiti.resW, Graffiti.H = Graffiti.resH, Graffiti.resizeCanvases(Graffiti.resW, Graffiti.resH), Graffiti.copyImage(Graffiti.mainCtx))
        }
    },
    copyImage: function(i, t) {
        if ("" != Graffiti.checkPoint) {
            var r = vkImage();
            r.src = Graffiti.checkPoint, r.onload = function() {
                i.drawImage(r, 0, 0, Graffiti.W, Graffiti.H), Graffiti.propDraw(i, Graffiti.hstorage, 0, Graffiti.hstorage.length), t && t()
            }
        } else Graffiti.propDraw(i, Graffiti.hstorage, 0, Graffiti.hstorage.length), t && t()
    },
    keyboardBlocked: !1,
    shiftPressed: !1,
    keyboardEvents: function(i) {
        switch (i.type) {
            case "keydown":
                if (i.shiftKey || 16 == i.keyCode) return Graffiti.drawPath = !0, !0;
                switch (i.keyCode) {
                    case 90:
                        if (!i.ctrlKey) return;
                        if (Graffiti.keyboardBlocked) return;
                        return Graffiti.keyboardBlocked = !0, Graffiti.backHistory(), !0;
                    case 70:
                        if (!i.ctrlKey) return;
                        return Graffiti.fullScreen(), !0
                }
                break;
            case "keyup":
                if (i.shiftKey || 16 == i.keyCode) return Graffiti.stopDrawPathLine(), !0;
                if (90 == i.keyCode) return Graffiti.keyboardBlocked = !1, !0
        }
    },
    handleControlsEvents: function(i) {
        switch (i.type) {
            case "touchstart":
            case "MSPointerDown":
                Graffiti.handleColorBtn(i);
            case "mousedown":
                for (var t = Graffiti.getMouseXY(i, Graffiti.controlsCanv), r = Graffiti.sliders, e = 0; e < r.length; e++) t.x >= r[e].x && t.x <= r[e].x + 100 && t.y >= r[e].y - 10.5 && t.y <= r[e].y + 6 && (t.x > r[e].x + 95 && (t.x -= 4), Graffiti.redrawSlider(r[e].id, Graffiti.controlsCtx, {
                    x: r[e].x,
                    y: r[e].y
                }, t.x), Graffiti.sliders[e].holder = t.x, Graffiti.aboveSlider.status = !0, Graffiti.aboveSlider.index = e);
                break;
            case "touchmove":
            case "MSPointerMove":
            case "mousemove":
                if (!Graffiti.mouse.pressed && !Graffiti.mouse.touched && !Graffiti.resizing) {
                    var t = Graffiti.getMouseXY(i, Graffiti.controlsCanv);
                    if (Graffiti.aboveSlider.status) {
                        var a = Graffiti.sliders[Graffiti.aboveSlider.index];
                        t.x > a.x && t.x < a.x + 95 ? (Graffiti.redrawSlider(a.id, Graffiti.controlsCtx, {
                            x: a.x,
                            y: a.y
                        }, t.x), Graffiti.sliders[Graffiti.aboveSlider.index].holder = t.x) : (t.x < a.x && (Graffiti.redrawSlider(a.id, Graffiti.controlsCtx, {
                            x: a.x,
                            y: a.y
                        }, a.x), Graffiti.sliders[Graffiti.aboveSlider.index].holder = a.x), t.x > a.x + 95 && (Graffiti.redrawSlider(a.id, Graffiti.controlsCtx, {
                            x: a.x,
                            y: a.y
                        }, a.x + 95), Graffiti.sliders[Graffiti.aboveSlider.index].holder = a.x + 95))
                    } else {
                        var f = Graffiti.cpbXY;
                        t.x >= f.x - 8 && t.x <= f.x + 23 && t.y >= f.y - 5 && t.y <= f.y + 25 ? (Graffiti.controlsCanv.style.cursor = "pointer", Graffiti.redrawColorPickerButton(Graffiti.controlsCtx, Graffiti.gpXY.x, Graffiti.gpXY.y, Graffiti.brush.color, !0)) : (Graffiti.controlsCanv.style.cursor = "default", Graffiti.redrawColorPickerButton(Graffiti.controlsCtx, Graffiti.gpXY.x, Graffiti.gpXY.y, Graffiti.brush.color, !1))
                    }
                }
                break;
            case "click":
                Graffiti.handleColorBtn(i);
                break;
            case "MSPointerUp":
            case "touchend":
            case "mouseup":
                Graffiti.aboveSlider.status && (Graffiti.aboveSlider.status = !1);
                break;
            case "DOMMouseScroll":
                Graffiti.handleWheelAboveSlider(i);
                break;
            case "mousewheel":
                Graffiti.handleWheelAboveSlider(i);
                break;
            default:
                throw new Error(i.type)
        }
    },
    handleColorBtn: function(i) {
        var t = Graffiti.cpbXY,
            r = Graffiti.getMouseXY(i, Graffiti.controlsCanv);
        r.x >= t.x - 8 && r.x <= t.x + 23 && r.y >= t.y - 5 && r.y <= t.y + 25 && (Graffiti.cpActive ? (Graffiti.cpActive = !1, animate(Graffiti.cpWrapper, {
            opacity: 0,
            top: -210
        }, 200, function() {
            Graffiti.cpWrapper.style.display = "none"
        })) : (Graffiti.cpActive = !0, Graffiti.cpWrapper.style.display = "block", animate(Graffiti.cpWrapper, {
            opacity: 1,
            top: -250
        }, 200)))
    },
    sliders: [],
    aboveSlider: {
        status: !1,
        index: 0
    },
    addSlider: function(i, t, r, e, a) {
        this.redrawSlider(i, t, {
            x: r,
            y: e
        }, r + a), this.drawAboveSliderLines(t, r, e), this.sliders.push({
            id: i,
            x: r,
            y: e,
            holder: r + a
        })
    },
    redrawSlider: function(i, t, r, e) {
        var a = r.x,
            f = r.y,
            o = e;
        t.clearRect(a - 3.5, f - 3, 108, 12), this.drawSliderLine(t, a, f), this.drawSliderHolder(t, o - 3, f), this.slideEventHandler(i, r, e)
    },
    drawSliderLine: function(i, t, r) {
        i.lineJoin = "miter", i.lineCap = "square", i.strokeStyle = "#BFBFBF", i.fillStyle = "#E4E4E4", i.lineWidth = 1, i.beginPath(), i.fillRect(t + .5, r + .5, 100, 4), i.strokeRect(t + .5, r + .5, 100, 4), i.closePath()
    },
    drawSliderHolder: function(i, t, r) {
        i.lineJoin = "miter", i.lineCap = "square", i.strokeStyle = "#ABB8C7", i.fillStyle = "#DAE1E8", i.beginPath(), i.fillRect(t + .5, r - 2.5, 7, 11), i.strokeRect(t + .5, r - 2.5, 7, 11), i.closePath()
    },
    drawAboveSliderLines: function(i, t, r) {
        i.strokeStyle = "#BFBFBF", i.lineWidth = 1;
        for (var e = t + 10.5, a = r - 4, f = 0; 9 > f; f++) i.beginPath(), i.moveTo(e, a - 6), i.lineTo(e, a), e += 10, i.stroke(), i.closePath()
    },
    handleWheelAboveSlider: function(i) {
        var t = 0,
            r = 0;
        if (i.wheelDelta ? t = i.wheelDelta / 120 : i.detail && (t = -i.detail / 3), t) {
            t = 10 * t, r = t;
            for (var e = Graffiti.getMouseXY(i, Graffiti.controlsCanv), a = Graffiti.sliders, f = 0; f < a.length; f++)
                if (e.x >= a[f].x && e.x <= a[f].x + 100 && e.y >= a[f].y - 10.5 && e.y <= a[f].y + 6) {
                    if (a[f].holder + t < a[f].x && (r = a[f].x - a[f].holder), a[f].holder + t > a[f].x + 95 && (r = a[f].x + 95 - a[f].holder), 0 == r) return;
                    Graffiti.redrawSlider(a[f].id, Graffiti.controlsCtx, {
                        x: a[f].x,
                        y: a[f].y
                    }, a[f].holder + r), Graffiti.sliders[f].holder = a[f].holder + r
                }
        }
    },
    slideEventHandler: function(i, t, r) {
        var e = r - t.x;
        switch (i) {
            case "size":
                var a = e;
                1 > a && (a = 1), Graffiti.brush.size = 64 * (a / 95 * 100 / 100).toFixed(2), Graffiti.updateSample();
                break;
            case "opacity":
                var f = Math.max(Math.min(e / 95 * 100 / 100, 1), 0).toFixed(2);
                .01 > f && (f = .01), Graffiti.brush.opacity = f, Graffiti.updateSample();
                break;
            default:
                throw new Error("Slider " + i + " is not exist")
        }
    },
    redrawColorPickerButton: function(i, t, r, e, a) {
        Graffiti.gpXY.x = t, Graffiti.gpXY.y = r, i.clearRect(t - 3, r - 10, 20, 27), i.lineWidth = 1, i.fillStyle = "rgb(" + e + ")", i.beginPath(), i.fillRect(t, r - 1, 13, 13), i.closePath();
        var f, o = t - 1;
        f = a ? "rgb(255, 255, 255)" : "rgb(218, 225, 232)", i.strokeStyle = "rgb(171, 184, 199)", i.fillStyle = f, i.lineCap = "square", i.lineJoin = "miter", i.beginPath(), i.moveTo(o, r - 3.5), i.lineTo(o + 15, r - 3.5), i.lineTo(o + 7.5, r - 8.5), i.fill(), i.closePath(), i.stroke(), Graffiti.cpbXY.x = t - 1, Graffiti.cpbXY.y = r - 9
    },
    updateSample: function() {
        var i = Graffiti.brush.size,
            t = Graffiti.brush.opacity,
            r = Graffiti.controlsCtx;
        r.clearRect(0, 0, 66, 66), r.strokeStyle = "rgba(" + Graffiti.brush.color + ", " + t + ")", r.lineWidth = i, r.lineCap = "round", r.lineJoin = "round", r.beginPath(), r.moveTo(31.75, 33.75), r.lineTo(32.26, 33.75), r.stroke(), r.closePath()
    },
    labels: [],
    addText: function(i, t, r, e) {
        i.fillStyle = "#000000", i.strokeStyle = "#000000", i.font = "11px Tahoma, Arial, Verdana, Sans-Serif, Lucida Sans", i.textAlign = "right", i.beginPath(), i.fillText(t, Math.floor(r + .5), Math.floor(e + .5)), i.closePath()
    },
    hstorage: [],
    gstorage: [],
    checkPoint: "",
    saveBuffer: 100,
    pushHistory: function(i) {
        function t() {
            for (var i, t, r = Graffiti.hstorage, e = [], a = [], f = 0; f < Graffiti.saveBuffer; f++) {
                t = r[f].factor;
                for (var o = 0; o < r[f].mouse.x.length; o++) e.push(r[f].mouse.x[o] / t * 2), a.push(r[f].mouse.y[o] / t * 2);
                i = r[f].size / t * 2, Graffiti.draw(Graffiti.histHelpCtx, {
                    mouse: {
                        x: e,
                        y: a
                    },
                    size: i,
                    color: r[f].color,
                    opacity: r[f].opacity
                }), e = [], a = []
            }
            Graffiti.checkPoint = Graffiti.histHelpCanv.toDataURL();
            var n = vkImage();
            n.src = Graffiti.checkPoint, n.onload = function() {
                Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.mainCtx.drawImage(n, 0, 0, Graffiti.W, Graffiti.H), Graffiti.propDraw(Graffiti.mainCtx, Graffiti.hstorage, Graffiti.saveBuffer, Graffiti.hstorage.length), Graffiti.hstorage.splice(0, Graffiti.saveBuffer)
            }
        }
        if (Graffiti.gstorage.push(i), Graffiti.hstorage.push(i), Graffiti.hstorage.length == 2 * Graffiti.saveBuffer)
            if (Graffiti.histHelpCtx.clearRect(0, 0, 1172, 586), "" != Graffiti.checkPoint) {
                var r = vkImage();
                r.src = Graffiti.checkPoint, r.onload = function() {
                    Graffiti.histHelpCtx.drawImage(r, 0, 0, 1172, 586), t()
                }
            } else t()
    },
    backBlocked: !1,
    backQueue: 0,
    globalBlock: !1,
    backHistory: function() {
        function i() {
            Graffiti.propDraw(Graffiti.helpCtx, Graffiti.hstorage, 0, Graffiti.hstorage.length), Graffiti.propDraw(Graffiti.mainCtx, Graffiti.hstorage, 0, Graffiti.hstorage.length - 1), fadeOut(Graffiti.helpCanv, 200, function() {
                if (Graffiti.helpCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.helpCanv.style.backgroundColor = "", Graffiti.helpCanv.style.display = "block", Graffiti.backBlocked = !1, Graffiti.backQueue > 0)
                    for (var i = 0; i < Graffiti.backQueue; i++) Graffiti.backHistory(), Graffiti.backQueue--
            }), Graffiti.hstorage.pop(), Graffiti.gstorage.pop()
        }
        if (!Graffiti.globalBlock)
            if (0 == this.hstorage.length) {
                if (Graffiti.backQueue = 0, "" == this.checkPoint) return !1;
                Graffiti.hstorage = [], Graffiti.checkPoint = "", fadeOut(Graffiti.mainCanv, 200, function() {
                    Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.mainCanv.style.display = "block"
                })
            } else {
                if (Graffiti.backBlocked) return void Graffiti.backQueue++;
                Graffiti.backBlocked = !0;
                Graffiti.hstorage;
                if ("" != Graffiti.checkPoint) {
                    var t = vkImage();
                    t.src = Graffiti.checkPoint, t.onload = function() {
                        Graffiti.helpCanv.style.backgroundColor = "#FFFFFF", Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.mainCtx.drawImage(t, 0, 0, Graffiti.W, Graffiti.H), Graffiti.helpCtx.drawImage(t, 0, 0, Graffiti.W, Graffiti.H), i()
                    }
                } else Graffiti.helpCanv.style.backgroundColor = "#FFFFFF", Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), i()
            }
    },
    flushHistory: function() {
        fadeOut(Graffiti.mainCanv, 200, function() {
            Graffiti.mainCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.mainCanv.style.display = "block", Graffiti.checkPoint = "", Graffiti.hstorage = [], Graffiti.gstorage = []
        })
    },
    draw: function(i, t) {
        var r, e, a, f;
        if (t ? (r = t.mouse, e = t.color, f = t.opacity, a = t.size) : (r = Graffiti.mouse, e = Graffiti.brush.color, a = Graffiti.brush.size * Graffiti.factor, f = Graffiti.brush.opacity), i.strokeStyle = "rgba(" + e + ", " + f + ")", i.lineWidth = a, i.lineCap = "round", i.lineJoin = "round", i.beginPath(), r.x.length < 2) return i.moveTo(r.x[0], r.y[0]), i.lineTo(r.x[0] + .51, r.y[0]), i.stroke(), void i.closePath();
        i.beginPath(), i.moveTo(r.x[0], r.y[0]), i.lineTo(.5 * (r.x[0] + r.x[1]), .5 * (r.y[0] + r.y[1]));
        for (var o = 0; ++o < r.x.length - 1;) {
            var n = Math.abs(r.x[o - 1] - r.x[o]) + Math.abs(r.y[o - 1] - r.y[o]) + Math.abs(r.x[o] - r.x[o + 1]) + Math.abs(r.y[o] - r.y[o + 1]),
                s = Math.abs(r.x[o - 1] - r.x[o + 1]) + Math.abs(r.y[o - 1] - r.y[o + 1]);
            n > 10 && s > .8 * n ? i.quadraticCurveTo(r.x[o], r.y[o], .5 * (r.x[o] + r.x[o + 1]), .5 * (r.y[o] + r.y[o + 1])) : (i.lineTo(r.x[o], r.y[o]), i.lineTo(.5 * (r.x[o] + r.x[o + 1]), .5 * (r.y[o] + r.y[o + 1])))
        }
        i.lineTo(r.x[r.x.length - 1], r.y[r.y.length - 1]), i.moveTo(r.x[r.x.length - 1], r.y[r.y.length - 1]), i.stroke(), i.closePath()
    },
    propDraw: function(i, t, r, e) {
        for (var a, f, o = t, n = [], s = [], l = r; e > l; l++) {
            f = o[l].factor;
            for (var c = 0; c < o[l].mouse.x.length; c++) n.push(o[l].mouse.x[c] / f * Graffiti.factor), s.push(o[l].mouse.y[c] / f * Graffiti.factor);
            a = o[l].size / f * Graffiti.factor, Graffiti.draw(i, {
                mouse: {
                    x: n,
                    y: s
                },
                size: a,
                color: o[l].color,
                opacity: o[l].opacity
            }), n = [], s = []
        }
    },
    drawPath: !1,
    handleDrawingEvents: function(i) {
        var t = Graffiti.getMouseXY(i, Graffiti.overlayCanv);
        switch (!i.which && i.button && (1 & i.button ? i.which = 1 : 4 & i.button ? i.which = 2 : 2 & i.button && (i.which = 3)), i.type) {
            case "touchstart":
                Graffiti.drawPath || (Graffiti.mouse.touched = !0, Graffiti.mouse.x = [t.x], Graffiti.mouse.y = [t.y], Graffiti.draw(Graffiti.overlayCtx));
                break;
            case "MSPointerDown":
            case "mousedown":
                1 == i.which && (Graffiti.drawPath || (Graffiti.mouse.pressed = !0, Graffiti.mouse.x = [t.x], Graffiti.mouse.y = [t.y], Graffiti.draw(Graffiti.overlayCtx))), 3 == i.which && (Graffiti.drawPath = !0);
                break;
            case "click":
                1 == i.which && Graffiti.drawPath && (Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.mouse.x.push(t.x), Graffiti.mouse.y.push(t.y), Graffiti.draw(Graffiti.overlayCtx));
                break;
            case "touchmove":
                Graffiti.mouse.touched && Graffiti.handleMouseMove(t);
                break;
            case "MSPointerMove":
            case "mousemove":
                Graffiti.mouse.pressed && Graffiti.handleMouseMove(t);
                break;
            case "touchend":
                Graffiti.mouse.touched && Graffiti.handleMouseUp(t);
                break;
            case "MSPointerUp":
            case "mouseup":
                1 == i.which && Graffiti.mouse.pressed && Graffiti.handleMouseUp(t), 3 == i.which && Graffiti.stopDrawPathLine()
        }
    },
    handleMouseMove: function(i) {
        var t = Graffiti.mouse;
        (t.x != i.x || t.y != i.y) && (Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.mouse.x.push(i.x), Graffiti.mouse.y.push(i.y), Graffiti.draw(Graffiti.overlayCtx))
    },
    handleMouseUp: function(i) {
        Graffiti.mouse.pressed = !1, Graffiti.mouse.touched = !1, Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.draw(Graffiti.mainCtx), Graffiti.pushHistory({
            mouse: {
                x: Graffiti.mouse.x,
                y: Graffiti.mouse.y
            },
            color: Graffiti.brush.color,
            size: Graffiti.brush.size * Graffiti.factor,
            opacity: Graffiti.brush.opacity,
            factor: Graffiti.factor
        }), Graffiti.mouse.x = [], Graffiti.mouse.y = []
    },
    stopDrawPathLine: function() {
        Graffiti.drawPath = !1, Graffiti.overlayCtx.clearRect(0, 0, Graffiti.W, Graffiti.H), Graffiti.draw(Graffiti.mainCtx), Graffiti.pushHistory({
            mouse: {
                x: Graffiti.mouse.x,
                y: Graffiti.mouse.y
            },
            color: Graffiti.brush.color,
            size: Graffiti.brush.size * Graffiti.factor,
            opacity: Graffiti.brush.opacity,
            factor: Graffiti.factor
        }), Graffiti.mouse.x = [], Graffiti.mouse.y = []
    },
    handleColorPickerEvents: function(i) {
        switch (i.type) {
            case "MSPointerMove":
            case "touchmove":
            case "mousemove":
                Graffiti.handleColorMoveEvent(i);
                break;
            case "MSPointerDown":
            case "touchstart":
                Graffiti.handleColorMoveEvent(i);
            case "click":
                var t = Graffiti.cpCtx,
                    r = Graffiti.cpActiveCell,
                    e = 14 * r.cellX + 7,
                    a = 14 * r.cellY + 7,
                    f = t.getImageData(e, a, 1, 1).data,
                    o = [].slice.call(f, 0, 3).join();
                Graffiti.brush.color = o, Graffiti.redrawColorPickerButton(Graffiti.controlsCtx, Graffiti.gpXY.x, Graffiti.gpXY.y, o, !1), Graffiti.updateSample(), Graffiti.cpActive = !1, animate(Graffiti.cpWrapper, {
                    opacity: 0,
                    top: -210
                }, 200, function() {
                    Graffiti.cpWrapper.style.display = "none"
                });
                break;
            default:
                throw new Error(i.type)
        }
    },
    handleColorMoveEvent: function(i) {
        var t = Graffiti.getMouseXY(i, Graffiti.cpCanv),
            r = Math.floor(t.x / 14),
            e = Math.floor(t.y / 14);
        if (!(e > 11 || r > 17)) {
            var a = Graffiti.cpCtx;
            a.lineWidth = 1, a.lineJoin = "miter", a.lineCap = "butt";
            var f = Graffiti.cpLastCell;
            f.length > 0 && (a.strokeStyle = "rgba(0,0,0,1)", a.beginPath(), a.strokeRect(14 * f[0].x + .5, 14 * f[0].y + .5, 14, 14), a.closePath(), Graffiti.cpLastCell = []), a.strokeStyle = "rgb(255,255,255)", a.beginPath(), a.strokeRect(14 * r + .5, 14 * e + .5, 14, 14), a.closePath(), Graffiti.cpLastCell.push({
                x: r,
                y: e
            }), Graffiti.cpActiveCell.cellX = r, Graffiti.cpActiveCell.cellY = e
        }
    },
    cpbXY: {},
    gpXY: {},
    cpActive: !1,
    drawColorPicker: function(i) {
        var t = 14,
            r = [];
        i.lineWidth = 1;
        for (var e = 0; 6 > e; e++)
            for (var a = 0; 6 > a; a++)
                for (var f = 0; 6 > f; f++) r[36 * e + 6 * a + f] = "rgb(" + e / 5 * 255 + "," + a / 5 * 255 + "," + f / 5 * 255 + ")";
        for (var o = 0; 12 > o; o++)
            for (var n = 0; 18 > n; n++) {
                var s = Math.floor(n / 6) + 3 * Math.floor(o / 6),
                    l = n % 6,
                    c = o % 6,
                    h = 36 * s + 6 * l + c;
                i.fillStyle = r[h], i.strokeStyle = "rgb(0, 0, 0)";
                var G = Math.floor(14 * n) + .5,
                    d = Math.floor(14 * o) + .5;
                i.fillRect(G, d, G + t, G + t), i.strokeRect(G, d, d + t, d + t)
            }
        i.strokeStyle = "rgb(0, 0, 0)", i.beginPath(), i.moveTo(252.5, 0), i.lineTo(252.5, 168.5), i.moveTo(252.5, 168.5), i.lineTo(0, 168.5), i.closePath(), i.stroke()
    },
    cpActiveCell: {
        cellX: 0,
        cellY: 0
    },
    cpLastCell: [],
    blockResize: !1,
    fsEnabled: !1,
    fullScreen: function() {
        if (!Graffiti.mouse.pressed && !Graffiti.mouse.touched && !Graffiti.blockResize)
            if (this.fsEnabled) this.fsEnabled = !1, Graffiti.blockResize = !0, Graffiti.W = Graffiti.resW || 586, Graffiti.H = Graffiti.resH || 293, Graffiti.factor = Graffiti.H / 293, hide(Graffiti.mainCanv), animate(Graffiti.grWrapper, {
                top: Graffiti.boxPos[1],
                left: Graffiti.boxPos[0],
                height: Graffiti.H + 140,
                width: Graffiti.W + 45
            }, 200), animate(Graffiti.canvWrapper, {
                width: Graffiti.W,
                height: Graffiti.H,
                marginTop: -185,
                marginLeft: 22
            }, 200, function() {
                show(Graffiti.mainCanv), Graffiti.resizeCanvases(Graffiti.W, Graffiti.H), Graffiti.copyImage(Graffiti.mainCtx), Graffiti.blockResize = !1, Graffiti.rzLink.innerHTML = cur.lang.graffiti_full_screen, removeClass(Graffiti.grWrapper, "graffiti_fullscreen"), setStyle(Graffiti.grWrapper, {
                    height: "auto",
                    width: "100%"
                }), setStyle(Graffiti.canvWrapper, {
                    margin: "0 auto"
                })
            });
            else {
                this.fsEnabled = !0, Graffiti.blockResize = !0, setStyle(Graffiti.canvWrapper, {
                    marginTop: -185,
                    marginLeft: 18
                }), addClass(Graffiti.grWrapper, "graffiti_fullscreen"), Graffiti.boxPos = getXY(curBox().bodyNode, !0), setStyle(Graffiti.grWrapper, {
                    top: Graffiti.boxPos[1],
                    left: Graffiti.boxPos[0],
                    height: Graffiti.H + 141,
                    width: Graffiti.W + 45
                });
                var i = Math.min(window.innerWidth - 40, 1172),
                    t = Math.min(intval(.5 * i), window.innerHeight - 120);
                i = 2 * t, Graffiti.W = i, Graffiti.H = t, Graffiti.factor = Graffiti.H / 293, hide(Graffiti.mainCanv), animate(Graffiti.grWrapper, {
                    top: 0,
                    left: 0,
                    height: window.innerHeight,
                    width: bodyNode.scrollWidth
                }, 200), animate(Graffiti.canvWrapper, {
                    width: Graffiti.W,
                    height: Graffiti.H,
                    marginTop: -Math.floor((Graffiti.H + 75) / 2),
                    marginLeft: (window.innerWidth - Graffiti.W) / 2
                }, 200, function() {
                    show(Graffiti.mainCanv), Graffiti.resizeCanvases(Graffiti.W, Graffiti.H), Graffiti.copyImage(Graffiti.mainCtx), Graffiti.blockResize = !1, Graffiti.rzLink.innerHTML = cur.lang.graffiti_normal_size, setStyle(Graffiti.grWrapper, {
                        height: "100%",
                        width: "100%"
                    })
                })
            }
    },
    resizeCanvases: function(i, t) {
        Graffiti.mainCanv.width = i, Graffiti.mainCanv.height = t, Graffiti.overlayCanv.width = i, Graffiti.overlayCanv.height = t, Graffiti.helpCanv.width = i, Graffiti.helpCanv.height = t, Graffiti.helpCanv.style.top = (-1 * (2 * t)).toFixed() + "px", Graffiti.overlayCanv.style.top = -1 * t + "px"
    },
    exportBlocked: !1,
    exportSVG: function(i) {
        if (!Graffiti.exportBlocked) {
            Graffiti.exportBlocked = !0;
            var t = '<?xml version="1.0" standalone="yes"?>';
            if (t += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', t += '<svg width="1172px" height="586px" viewBox="0 0 1172 586" xmlns="http://www.w3.org/2000/svg" version="1.1">', 0 != Graffiti.gstorage.length)
                for (var r = 0; r < Graffiti.gstorage.length; r++) t += Graffiti.drawSVG(Graffiti.gstorage[r]);
            if (t += "</svg>", Graffiti.exportBlocked = !1, i) return t;
            window.open("data:image/svg+xml," + encodeURIComponent(t));
            window.focus()
        }
    },
    drawSVG: function(i) {
        for (var t, r, e, a = '<path d="', f = {
                x: [],
                y: []
            }, o = i.factor, n = 0; n < i.mouse.x.length; n++) f.x.push(i.mouse.x[n] / o * 2), f.y.push(i.mouse.y[n] / o * 2);
        if (t = i.color, e = i.opacity, r = i.size / o * 2, f.x.length < 2) return a += "M" + f.x[0] + "," + f.y[0] + " ", a += "L" + (f.x[0] + .51) + "," + f.y[0] + " ", a += '" fill="none" stroke="rgb(' + t + ')" stroke-opacity="' + e + '" stroke-width="' + r + '" stroke-linecap="round" stroke-linejoin="round" />';
        a += "M" + f.x[0] + "," + f.y[0] + " ", a += "L" + .5 * (f.x[0] + f.x[1]) + "," + .5 * (f.y[0] + f.y[1]) + " ";
        for (var n = 0; ++n < f.x.length - 1;) {
            var s = Math.abs(f.x[n - 1] - f.x[n]) + Math.abs(f.y[n - 1] - f.y[n]) + Math.abs(f.x[n] - f.x[n + 1]) + Math.abs(f.y[n] - f.y[n + 1]),
                l = Math.abs(f.x[n - 1] - f.x[n + 1]) + Math.abs(f.y[n - 1] - f.y[n + 1]);
            s > 10 && l > .8 * s ? a += "Q" + f.x[n] + "," + f.y[n] + " " + .5 * (f.x[n] + f.x[n + 1]) + "," + .5 * (f.y[n] + f.y[n + 1]) + " " : (a += "L" + f.x[n] + "," + f.y[n] + " ", a += "L" + .5 * (f.x[n] + f.x[n + 1]) + "," + .5 * (f.y[n] + f.y[n + 1]) + " ")
        }
        return a += "L" + f.x[f.x.length - 1] + "," + f.y[f.y.length - 1] + " ", a += '" fill="none" stroke="rgb(' + t + ')" stroke-opacity="' + e + '" stroke-width="' + r + '" stroke-linecap="round" stroke-linejoin="round" />'
    },
    getMouseXY: function(i, t) {
        var r = {},
            e = getXY(t);
        if (i.type && "touch" == i.type.substr(0, 5)) {
            var a = i.originalEvent.touches[0] || i.originalEvent.changedTouches[0];
            r.x = a.pageX - e[0], r.y = a.pageY - e[1]
        } else r.x = i.pageX - e[0], r.y = i.pageY - e[1];
        return r
    },
    isChanged: function() {
        return Graffiti.hstorage.length || Graffiti.checkPoint
    },
    getImage: function(i) {
        var t = {
            w: Graffiti.W,
            h: Graffiti.H,
            f: Graffiti.factor
        };
        Graffiti.factor = 1280 / 586, Graffiti.W = 1280, Graffiti.H = 640;
        var r = ce("canvas", {
                width: Graffiti.W,
                height: Graffiti.H
            }),
            e = r.getContext("2d");
        Graffiti.copyImage(e, function() {
            Graffiti.factor = t.f, Graffiti.W = t.w, Graffiti.H = t.h, i(r.toDataURL())
        })
    }
};
try {
    stManager.done("graffiti.js")
} catch (e) {}