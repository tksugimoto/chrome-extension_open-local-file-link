
document.body.addEventListener("click", function (evt) {
    var target = evt.target;
    while (target.parentNode && target.tagName !== "A") {
        target = target.parentNode;
    }
    if (target.tagName === "A") {
        var path = target.href;
        if (path.lastIndexOf("file://", 0) === 0) {
            evt.preventDefault();
            // 拡張が再読み込みされた場合エラーになるので捕捉
            try {
                chrome.runtime.sendMessage({
                    method: "openLocalFile",
                    path: path
                });
            } catch (e) {}
        }
    }
});