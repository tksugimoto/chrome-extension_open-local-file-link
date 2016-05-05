"use strict";

chrome.runtime.onInstalled.addListener(function (details) {
	// 読み込み/更新時に既存のタブで実行する
	chrome.tabs.query({
		url: "*://*/*"
	}, function(result){
		result.forEach(function (tab){
			chrome.tabs.executeScript(tab.id, {
				file: "content_script.js",
				allFrames: true
			}, function (result) {
				if (typeof result === "undefined") {
					console.info("ページが読み込まれていません", tab);
				}
			});
		});
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method === "openLocalFile") {
		var localFilePath = request.path;
		var tab = sender.tab;
		openLocalFile(localFilePath, tab);
	}
});


function openLocalFile(localFilePath, baseTab) {
	chrome.tabs.create({
		url: localFilePath,
		index: baseTab.index + 1
	});
}