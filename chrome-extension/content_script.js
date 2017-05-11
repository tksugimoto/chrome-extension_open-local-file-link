
document.body.addEventListener("click", evt => {
	// ユーザーの操作によるイベントならisTrusted == true
	// Chrome 46.0～
	// https://developer.mozilla.org/ja/docs/Web/API/Event/isTrusted
	if (!evt.isTrusted) return;
	let target = evt.target;
	while (target.parentNode && target.tagName !== "A") {
		target = target.parentNode;
	}
	if (target.tagName === "A") {
		const path = target.href;
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
