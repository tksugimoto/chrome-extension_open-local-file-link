

Array.prototype.forEach.call(document.querySelectorAll('a[href^="\\\\"]'), function (elem) {
    elem.addEventListener("click", function (evt) {
        evt.preventDefault();
        var path = elem.href;
        chrome.runtime.sendMessage({
            method: "openLocalFile",
            path: path
        });
    });
});
