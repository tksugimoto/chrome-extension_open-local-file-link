"use strict";

chrome.runtime.onInstalled.addListener(() => {
	// ver. 0.1の時に使っていたlocalStorageの削除
	localStorage.clear();

	// 読み込み/更新時に既存のタブで実行する
	chrome.tabs.query({
		url: "*://*/*"
	}, result => {
		result.forEach(tab => {
			chrome.tabs.executeScript(tab.id, {
				file: "content_script.js",
				allFrames: true
			}, result => {
				if (typeof result === "undefined") {
					console.info("ページが読み込まれていません", tab);
				}
			});
		});
	});
});

chrome.runtime.onMessage.addListener((request, sender) => {
	if (request.method === "openLocalFile") {
		const localFilePath = request.path;
		const tab = sender.tab;
		openLocalFile(localFilePath, tab);
	}
});


const openLocalFile = (localFilePath, baseTab) => {
	chrome.tabs.create({
		url: localFilePath,
		index: baseTab.index + 1
	});
};
