/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 3360514866
    Link: https://vk.com/js/api/widgets/al_contactus.js?3360514866
    Last Update: 10.2.117
*/
WContactus = {

    init: function(height) {
        extend(cur, {
            height: height,
            noNavGo: true,
            noAwayCheck: true
        });
        cur.RpcMethods = {
            onInit: this.resizeWidget.bind(this)
        };
        try {
            cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                safe: true
            });
        } catch (e) {
            debugLog(e);
        }
    },

    resizeWidget: function() {
        onBodyResize(true);
        if (!cur.Rpc) return;
        cur.Rpc.callMethod('resize', cur.height);
    }

};

try {
    stManager.done('api/widgets/al_contactus.js');
} catch (e) {}