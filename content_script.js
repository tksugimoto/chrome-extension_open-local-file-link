
document.body.addEventListener("click", function (evt) {
    var target = evt.target;
    if (target.tagName === "A") {
        var path = target.href;
        if (path.lastIndexOf("file://", 0) === 0) {
            evt.preventDefault();
            chrome.runtime.sendMessage({
                method: "openLocalFile",
                path: path
            });
        }
    }
});