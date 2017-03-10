/*
    Commit by VK Source Updates
    Author: @iprxy
Version: 1932948232
    Link: https://vk.com/js/al/jobs.js?1932948232
    Last Update: 10.2.117
*/
var Jobs = {
    view: function(o, n) {
        return showWiki({
            w: "job" + o
        }, !1, n)
    },
    addVacancyBox: function() {
        return !showBox("al_jobs.php", {
            act: "add_box"
        }, {
            params: {
                dark: 1,
                width: 550
            }
        })
    },
    addVacancy: function(o) {
        var n = se(o),
            e = ge("jobs_vacancies_list");
        e.appendChild(n)
    },
    deleteVacancyBox: function(o, n) {
        return showFastBox({
            title: getLang("jobs_delete_vacancy"),
            dark: 1,
            bodyStyle: "padding: 20px;"
        }, getLang("jobs_delete_vacancy_confirmation"), getLang("global_delete"), function(e) {
            ajax.post("al_jobs.php", {
                act: "delete",
                id: o,
                hash: n
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e),
                onDone: function(n) {
                    n.error ? topError(n.error) : Jobs.deleteVacancy(o), curBox().hide()
                }
            })
        }, getLang("global_cancel")), !1
    },
    deleteVacancy: function(o) {
        re("jobs_job" + o)
    },
    editVacancyBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "edit_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 550
            }
        })
    },
    editVacancy: function(o, n, e, t) {
        var a = ge("jobs_job" + o + "_name"),
            i = ge("jobs_job" + o + "_text"),
            d = ge("jobs_job" + o + "_ordering");
        a.innerHTML = n, i.innerHTML = e, d.innerHTML = t
    },
    toggleVacancy: function(o, n) {
        var e = ge("jobs_job" + o + "_toggle_link"),
            t = ge("jobs_job" + o + "_upload"),
            a = intval(e.getAttribute("data-disabled"));
        return t.olddisplay = "inline-block", ajax.post("al_jobs.php", {
            act: "toggle",
            id: o,
            hash: n,
            disable: a ? 0 : 1
        }, {
            showProgress: function() {
                show(t)
            },
            hideProgress: function() {
                hide(t)
            },
            onDone: function(o) {
                e.setAttribute("data-disabled", a ? 0 : 1), e.innerHTML = getLang("jobs_" + (a ? "hide" : "show"))
            }
        }), !1
    },
    showInlineProgress: function() {
        show("jobs_progress_inline")
    },
    goToPage: function(o, n) {
        return this.showInlineProgress(), nav.go(o, n)
    },
    declineApplicationBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "decline_application_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 550,
                hideButtons: !0,
                bodyStyle: "padding: 0"
            }
        })
    },
    acceptApplicationBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "accept_application_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 400,
                hideButtons: !0,
                bodyStyle: "padding: 0"
            }
        })
    },
    editCommentBox: function(o) {
        return !showBox("al_jobs.php", {
            act: "edit_comment_box",
            id: o
        }, {
            params: {
                dark: 1,
                width: 400,
                hideButtons: !0,
                bodyStyle: "padding: 0"
            }
        })
    },
    deleteApplicationBox: function(o, n) {
        return showFastBox({
            title: getLang("jobs_delete_application"),
            dark: 1,
            bodyStyle: "padding: 20px;"
        }, getLang("jobs_delete_application_confirmation"), getLang("global_delete"), function(e) {
            ajax.post("al_jobs.php", {
                act: "delete_application",
                id: o,
                hash: n
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e),
                onDone: function(n) {
                    re("jobs_application" + o), curBox().hide()
                }
            })
        }, getLang("global_cancel")), !1
    }
};
try {
    stManager.done("jobs.js")
} catch (e) {}