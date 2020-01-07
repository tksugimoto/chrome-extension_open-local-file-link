document.body.addEventListener("click", evt => {
  // ユーザーの操作によるイベントならisTrusted == true
  // If event is fired by user's operation then isTrusted == true.
  // Chrome 46.0～
  // https://developer.mozilla.org/ja/docs/Web/API/Event/isTrusted
  if (!evt.isTrusted) return;
  let target = evt.target;
  while (target && target.tagName && target.tagName.toLowerCase() !== "a") {
    target = target.parentNode;
  }
  if (target) {
    // check for baseVal of svg a tag's href-SVGAnimatedString
    const url = target.href && (target.href.baseVal || target.href);
    if (url && url.startsWith && url.startsWith("file://")) {
      evt.preventDefault();
      // 拡張が再読み込みされた場合エラーになるので捕捉
      // Catch the error for the extension is reloaded.
      try {
        chrome.runtime.sendMessage({
          method: "openLocalFile",
          localFileUrl: url
        });
      } catch (e) {}
    }
  }
});
