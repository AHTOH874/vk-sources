/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1463178433
    Link: https://vk.com/js/al/pay.js?1463178433
    Last Update: 10.2.117
*/
var Pay = {
    navTo: function(r, e, o, a, n) {
        (n || !isVisible(cur.payBox.progress)) && (extend(r, {
            merchant_id: cur.payMerchantId,
            order_hash: cur.payOrderHash,
            order_id: cur.payOrderId,
            layout: cur.payLayout
        }), hide("pay_error"), a || (a = 1, cur.payNavTimer && clearTimeout(cur.payNavTimer)), show(cur.payBox.progress), hide("pay_back_link"), ajax.post(cur.payUrl, r, {
            onDone: function(n, c) {
                e && e(), "not_ready" == n ? (show(cur.payBox.progress), clearTimeout(cur.payNavTimer), cur.payNavTimer = setTimeout(function() {
                    Pay.navTo(r, e, o, a + 1, !0)
                }, 1e3 * a)) : (hide(cur.payBox.progress), clearTimeout(cur.payNavTimer), cur.payNavTimer = 0, Pay.received(n, c))
            },
            onFail: function(n) {
                return o && o(), n ? Pay.showError(n) : (show(cur.payBox.progress), clearTimeout(cur.payNavTimer), cur.payNavTimer = setTimeout(function() {
                    Pay.navTo(r, e, o, a + 1, !0)
                }, 1e3 * a)), !0
            }
        }))
    },
    showError: function(r) {
        ge("pay_box_error") ? (ge("pay_box_error").innerHTML = r, show("pay_box_error")) : ge("pay_error") ? (ge("pay_error").innerHTML = r, show("pay_error")) : ge("pay_merchant_error") && (ge("pay_merchant_error").innerHTML = r, show("pay_merchant_error"), Pay.payDoResize()), hide(cur.payBox.progress), cur.payConfirmBox && cur.payConfirmBox.isVisible() && (hide("pay_retry_msg"), ge("pay_confirm_phone") ? elfocus("pay_confirm_phone") : ge("pay_confirm_code") && elfocus("pay_confirm_code"))
    },
    received: function(html, script) {
        if (cur.payNotEnoughTimer && (clearTimeout(cur.payNotEnoughTimer), cur.payNotEnoughTimer = 0), trim(html).length && (ge("pay_container").innerHTML = html), trim(script).length) {
            var box = cur.payBox;
            eval(script)
        }
    },
    agreementChanged: function(r) {
        isChecked(r) ? Pay.initPaymentButtons() : cur.payBox.removeButtons().addButton(getLang("global_close"), Pay.cancel)
    },
    showAgreement: function(r) {
        var e = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight;
        return !showBox("merchants.php", {
            act: "agreement",
            id: cur.payMerchantId
        }, {
            stat: ["wk.css", "wk.js"],
            params: {
                bodyStyle: "overflow: auto; padding: 0px; height: " + (e - 270) + "px",
                width: 643,
                height: e - 200
            }
        }, r)
    },
    makePayment: function(r, e) {
        var o = isChecked("status_export") ? 0 : 1,
            a = cur.payConfirmBox && cur.payConfirmBox.isVisible() ? cur.payConfirmBox.progress : cur.payBox.progress;
        if (!isVisible(a)) {
            hide("pay_error", "pay_box_error");
            var n = {
                act: "lock",
                hash: cur.payConfirmHash,
                merchant_id: cur.payMerchantId,
                order_id: cur.payOrderId,
                order_hash: cur.payOrderHash,
                show_in_box: !0,
                layout: cur.payLayout,
                donation: cur.payDonation
            };
            r ? n.other_phone = 1 : e ? (n.retry_phone = 1, cur.payConfirmPhone && (n.confirm_phone = cur.payConfirmPhone)) : ge("pay_confirm_code") && ge("pay_confirm_code").value ? n.confirm_code = ge("pay_confirm_code").value : ge("pay_confirm_phone") && (cur.payConfirmPhone = n.confirm_phone = ge("pay_confirm_phone").value), ajax.post(cur.payUrl, n, {
                onDone: function(n, c, i) {
                    switch (n) {
                        case -1:
                            show(a), setTimeout(function() {
                                hide(a), Pay.makePayment(r, e)
                            }, 1e3);
                            break;
                        case 0:
                            Pay.received(c, i);
                            break;
                        case 1:
                            cur.payConfirmBox && cur.payConfirmBox.hide(), cur.payConfirmHtml = c, cur.payConfirmScript = i, c = "";
                        case 2:
                            cur.payConfirmBox && cur.payConfirmBox.isVisible() || (cur.payConfirmBox = showFastBox(cur.payConfirmTitle, cur.payConfirmHtml, getLang("box_send"), Pay.makePayment.pbind(!1, !1), getLang("global_cancel")), cur.payConfirmBox.evalBox(cur.payConfirmScript)), c && Pay.showError(c);
                            break;
                        case 3:
                            cur.payConfirmCallbackId = intval(c), cur.payConfirmBox && cur.payConfirmBox.hide(), cur.payBox.removeButtons().addButton(getLang("global_cancel"), Pay.cancel), cur.payBox.setControlsText("");
                            var c = '<div id="pay_process_info"><div class="pay_process_please">' + cur.payPleaseWait + '<br><br><img src="images/progress7.gif" /><br><br>' + cur.payInProgress + "</div><br><br>" + cur.payHistory + "</div>",
                                i = "";
                            Pay.received(c, i), Pay.navTo({
                                act: "pay",
                                order_id: cur.payOrderId,
                                callback_id: cur.payConfirmCallbackId,
                                show_in_box: !0,
                                donation: cur.payDonation,
                                url: cur.paySiteUrl,
                                doexport: o
                            })
                    }
                },
                onFail: function(r) {
                    return r ? (Pay.showError(r), !0) : void 0
                }
            })
        }
    },
    initPaymentButtons: function() {
        cur.payBox.removeButtons().addButton(getLang("global_cancel"), Pay.cancel, "no"), cur.payBox.addButton(cur.payBtnLabel, Pay.makePayment)
    },
    checkMoney: function() {
        ajax.post(cur.payUrl, {
            act: "money",
            money: cur.payMoney,
            merchant_id: cur.payMerchantId,
            order_id: cur.payOrderId,
            order_hash: cur.payOrderHash,
            show_in_box: !0,
            layout: cur.payLayout
        }, {
            onDone: function(r, e, o, a) {
                return cur.payMoney = r, e && (ge("pay_you_will_msg").innerHTML = e, ge("pay_will_be_left").innerHTML = o, !a) ? void hide("pay_error", "pay_box_error") : (cur.payWaitFor = 5e3, void(cur.payNotEnoughTimer = setTimeout(Pay.checkMoney, cur.payWaitFor)))
            },
            onFail: function(r) {
                return r ? Pay.showError(r) : (cur.payWaitFor *= 2, cur.payNotEnoughTimer = setTimeout(Pay.checkMoney, cur.payWaitFor)), !0
            }
        })
    },
    successFinish: function() {
        clearTimeout(cur.paySuccessTimer), cur.payBox.setOptions({
            onHide: function() {
                cur.onMerchantPaymentSuccess ? cur.onMerchantPaymentSuccess(cur.payMerchantOrderId) : debugLog("no cur.onMerchantPaymentSuccess handler")
            }
        }), cur.payBox.hide()
    },
    showCongrats: function(r) {
        hide("pay_text_logged"), show("pay_text_success"), hide("pay_text_logged", "pay_text_success_publish"), cur.paySuccessTimer = setTimeout(Pay.successFinish, 4e3), cur.destroy.push(function() {
            clearTimeout(cur.paySuccessTimer)
        }), ge("pay_process_info").innerHTML = '<div class="pay_process_please">' + r + "</div>", cur.payBox.removeButtons().addButton(getLang("global_close"), Pay.successFinish)
    },
    payResizeShow: function(r) {
        cur.payShowInBox
    },
    payResizeHide: function(r) {
        cur.payShowInBox
    },
    payDoResize: function(r) {
        cur.payShowInBox
    },
    cancel: function() {
        cur.onMerchantPaymentCancel && cur.onMerchantPaymentCancel(), cur.payBox.hide()
    }
};
try {
    stManager.done("pay.js")
} catch (e) {}