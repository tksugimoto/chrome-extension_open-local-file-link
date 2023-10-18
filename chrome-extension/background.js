'use strict';

/***************************************************************************************/
// When installed from the store, it seems that chrome.runtime.onInstalled.addListener is not called when updating the extension by changing settings.
// Debugging processing for considering countermeasures
console.info('loaded');
chrome.runtime.onInstalled.addListener(() => console.info('onInstalled'));
chrome.runtime.onSuspend.addListener(() => console.info('onSuspend'));
/***************************************************************************************/

chrome.runtime.onInstalled.addListener(() => {
	// 読み込み/更新時に既存のタブで実行する
	// Execute content scripts for existing tabs when extension installed/reloaded.
	chrome.tabs.query({
		url: '*://*/*', // only http:// or https:// page
	}, tabs => {
		tabs.forEach(tab => {
			chrome.scripting.executeScript({
				files: [
					'content_script.js',
				],
				target: {
					tabId: tab.id,
					allFrames: true,
				},
			}, result => {
				if (typeof result === 'undefined') {
					const message = chrome.i18n.getMessage('page_not_loaded');
					console.info(message, tab);
				}
			});
		});
	});
});

chrome.runtime.onMessage.addListener(async (message, sender) => {
	if (message.method === 'openLocalFile') {
		const localFileUrl = message.localFileUrl;
		const tab = sender.tab;
		const canOpen = await chrome.extension.isAllowedFileSchemeAccess();
		if (!canOpen) {
			openTab(chrome.runtime.getURL('/options/index.html#need-file-scheme-access'), tab);
			return;
		}
		openTab(localFileUrl, tab);
	}
});


const openTab = (url, baseTab) => {
	chrome.tabs.create({
		url,
		index: baseTab.index + 1,
	});
};
