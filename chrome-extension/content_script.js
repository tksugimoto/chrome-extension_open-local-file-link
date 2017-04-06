
window.addEventListener('click', evt => {
	// ユーザーの操作によるイベントならisTrusted == true
	// If event is fired by user's operation then isTrusted == true.
	// Chrome 46.0～
	// https://developer.mozilla.org/ja/docs/Web/API/Event/isTrusted
	if (!evt.isTrusted) return;
	let target = evt.target;
	while (target && target.tagName.toLowerCase() !== 'a') {
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
});

var Button = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2
};

// <pre>, <p>, <code>にlocalファイルのパスが書かれている場合にリンクにする
(function () {
	"use strict";
	var className = "chrome-extension-" + chrome.runtime.id + "-local-file-link";
	
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(`
		.${className} {
			cursor: pointer;
			text-decoration: underline;
		}
		.${className}:hover {
			text-decoration: none;
		}
	`));
	(document.head || document.body).appendChild(style);

	Array.prototype.forEach.call(document.querySelectorAll("pre, p, code"), function (elem) {
		var text = elem.innerText.replace(/^\s*(.*)\s*$/, function (all, m1) {
			return m1;
		}).replace(/^"(.*)"$/, function (all, m1) {
			return m1;
		});
		if (/^\\\\[^\r\n]+$/.test(text)) {
			elem.classList.add(className);
			elem.title = "クリック（左/中）でローカルファイルを開く\nby Chrome拡張：ローカルファイルリンク有効化";
			elem.addEventListener("mousedown", function (evt) {
				var button = evt.button;
				if (button === Button.LEFT || button === Button.MIDDLE) {
					evt.preventDefault();
					chrome.runtime.sendMessage({
						method: "openLocalFile",
						path: "file:" + text
					});
				}
			});
		}
	});
})();
