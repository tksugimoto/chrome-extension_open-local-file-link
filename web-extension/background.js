'use strict';

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
