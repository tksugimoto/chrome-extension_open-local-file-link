
window.addEventListener('click', evt => {
	// ユーザーの操作によるイベントならisTrusted == true
	// If event is fired by user's operation then isTrusted == true.
	// Chrome 46.0～
	// https://developer.mozilla.org/ja/docs/Web/API/Event/isTrusted
	if (!evt.isTrusted) return;
	let target = evt.target;
	while (target && target.tagName.toLowerCase() !== 'a' && target.tagName.toLowerCase() !== 'area') {
		target = target.parentElement;
	}
	if (target) {
		// check for baseVal of svg a tag's href-SVGAnimatedString
		const url = target instanceof SVGAElement ? target.href.baseVal : target.href;
		if (url.startsWith('file://')) {
			evt.preventDefault();
			// 拡張が再読み込みされた場合エラーになるので捕捉
			// Catch the error for the extension is reloaded.
			try {
				chrome.runtime.sendMessage({
					method: 'openLocalFile',
					localFileUrl: url,
				});
			} catch (e) {}
		}
	}
}, {
	capture: true,
});
