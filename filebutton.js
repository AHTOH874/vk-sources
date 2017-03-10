/*
    Commit by VK Source Updates
    Author: @iprxy
    Version: 2454165044
    Link: https://vk.com/js/al/filebutton.js?2454165044
    Last Update: 10.2.117
*/
var FileButton = {
    init: function(i, e) {
        if (i = ge(i)) {
            var t = ' type="file" class="file_input"';
            e.name && (t += ' name="' + e.name + '"'), e.id && (t += ' id="' + e.id + '"'), e.accept && (t += ' accept="' + e.accept + '"'), e.multiple && (t += ' multiple="true"'), i.innerHTML = '<div class="file_button_inner"><input' + t + ' /><div class="file_button_text">' + i.innerHTML + "</div></div>", i.style.padding = "0px", i.firstChild.firstChild.onchange = e.onchange
        }
    }
};
try {
    stManager.done("filebutton.js")
} catch (e) {}