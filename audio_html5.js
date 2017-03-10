/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 287741914
    Link: https://vk.com/js/al/audio_html5.js?287741914
    Last Update: 10.2.117
*/
var audio_html5 = {
    music: null,
    defaultVolume: .8,
    preloadMusic: null,
    preloadUrl: null,
    autoStart: !0,
    setIntID: null,
    loadIntID: null,
    loadAudio: function(a) {
        var o = audio_html5;
        o.pauseAudio(), o.autoStart = !0, o.preloadUrl == a ? (o.music = o.preloadMusic, o.music.addEventListener("canplay", o.onCanPlay), o.music.addEventListener("error", o.onErr), o.preloadMusic = o.preloadUrl = null) : (o.music = ge("html5_audio"), o.music.addEventListener("canplay", o.onCanPlay), o.music.addEventListener("error", o.onErr), o.music.src = a, o.music.load()), o.loadIntID || (o.loadIntID = setInterval(o.onLoadProgress, 200)), o.music.volume = o.defaultVolume;
        try {
            o.playAudio()
        } catch (u) {}
    },
    unloadAudio: function() {
        var a = audio_html5;
        a.pauseAudio(), a.music = null
    },
    preloadAudio: function(a) {
        var o = audio_html5;
        o.preloadMusic = new Audio(a), o.preloadUrl = a, o.preloadMusic.load()
    },
    playAudio: function(a) {
        var o = audio_html5;
        if (o.music) {
            if (void 0 !== a) try {
                o.music.currentTime = a
            } catch (u) {}
            o.autoStart = !0, o.music.play(), o.setIntID || (o.setIntID = setInterval(o.onPlayProgress, 1e3))
        }
    },
    pauseAudio: function() {
        var a = audio_html5;
        a.music && (a.music.pause(), a.stopPlayProgress())
    },
    stopAudio: function() {
        var a = audio_html5;
        if (a.music) {
            try {
                a.music.currentTime = 0
            } catch (o) {}
            a.autoStart = !1, a.music.pause(), a.stopPlayProgress()
        }
    },
    setVolume: function(a) {
        var o = audio_html5;
        o.defaultVolume = a, o.music && (o.music.volume = a)
    },
    getVolume: function() {
        var a = audio_html5;
        return a.music ? a.music.volume : 0
    },
    paused: function() {
        var a = audio_html5;
        return a.music ? a.music.paused : !0
    },
    stopPlayProgress: function() {
        var a = audio_html5;
        clearInterval(a.setIntID), a.setIntID = null
    },
    stopLoadProgress: function() {
        var a = audio_html5;
        clearInterval(a.loadIntID), a.loadIntID = null
    },
    callPlayProgress: function() {
        audio_html5.onPlayProgress()
    },
    onPlayProgress: function() {
        var a = audio_html5,
            o = Math.floor(1e3 * a.music.currentTime) / 1e3,
            u = Math.floor(1e3 * a.music.duration) / 1e3;
        audioPlayer.onPlayProgress(o, u), Math.abs(u - o) < .1 && (a.pauseAudio(), audioPlayer.onPlayFinish())
    },
    onLoadProgress: function() {
        var a, o = audio_html5,
            u = Math.floor(1e3 * o.music.duration) / 1e3;
        try {
            a = Math.floor(1e3 * o.music.buffered.end(0)) / 1e3 || 0
        } catch (r) {}
        u && Math.abs(u - a) < .1 ? (audioPlayer.onLoadProgress(u, u), o.stopLoadProgress()) : audioPlayer.onLoadProgress(a, u)
    },
    onCanPlay: function() {
        var a = audio_html5;
        if (!a.paused() && audio_html5.autoStart) {
            try {
                a.music.play()
            } catch (o) {}
            a.setIntID || (a.setIntID = setInterval(a.onPlayProgress, 1e3))
        }
    },
    onErr: function(a) {
        audioPlayer.onError(a.target.error.code)
    }
};
try {
    stManager.done("audio_html5.js")
} catch (e) {}