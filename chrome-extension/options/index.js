document.title = chrome.i18n.getMessage('extension_name');

chrome.extension.isAllowedFileSchemeAccess().then(isAllowed => {
	document.body.setAttribute('data-file-scheme-access-allowed', isAllowed);
});

{
	const lang = chrome.i18n.getMessage('@@ui_locale') === 'ja' ? 'ja' : 'en';
	document.querySelectorAll(`[lang="${lang}"]`).forEach(e => {
		e.style.display = 'inline';
	});
}

document.querySelectorAll('a[data-id="extension-page-link"').forEach(a => {
	const url = `chrome://extensions/?id=${chrome.runtime.id}`;
	a.innerText = url;
	a.href = url;
	a.addEventListener('click', event => {
		event.preventDefault();
		chrome.tabs.update({
			url,
		});
	});
});
