'use strict';

chrome.runtime.onInstalled.addListener(() => {
	// 読み込み/更新時に既存のタブで実行する
	// Execute content scripts for existing tabs when extension installed/reloaded.
	chrome.tabs.query({
		url: '*://*/*',
	}, tabs => {
		tabs.forEach(tab => {
			chrome.tabs.executeScript(tab.id, {
				file: 'content_script.js',
				allFrames: true,
			}, result => {
				if (typeof result === 'undefined') {
					const message = chrome.i18n.getMessage('page_not_loaded');
					console.info(message, tab);
				}
			});
		});
	});
});

chrome.runtime.onMessage.addListener((message, sender) => {
	if (message.method === 'openLocalFile') {
		const localFileUrl = message.localFileUrl;
		const tab = sender.tab;
		openLocalFile(localFileUrl, tab);
	}
});


const openLocalFile = (localFileUrl, baseTab) => {
	chrome.tabs.create({
		url: localFileUrl,
		index: baseTab.index + 1,
	});
};
