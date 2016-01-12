"use strict";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method === "openLocalFile") {
		var localFilePath = request.path;
		var fileName = decodeURIComponent(localFilePath.replace(/^([^/]*[/])+/, ""));
		var tab = sender.tab;
		var fqdn = tab.url.match(/^[^:]+:[/][/]([^/]+)/)[1];
		if (allowDomains.contains(fqdn)) {
			openLocalFile(localFilePath, tab);
		} else if (!denyDomains.contains(fqdn)) {
			chrome.notifications.create({
				type: "list",
				iconUrl: "/icon/icon.png",
				title: "ローカルファイルを開く",
				message: "",
				contextMessage: "今回だけ許可（次回も確認）",
				items: [{
					title: fileName,
					message: "（ローカルのファイル名）"
				}, {
					title: fqdn,
					message: "（Webページのドメイン）"
				}],
				buttons: [{
					title: fqdn + "ドメインは常に許可（開く）"
				}, {
					title: fqdn + "ドメインは常に拒否（今後通知もしない）"
				}]
			}, function (notificationId) {
				cache[notificationId] = {
					localFilePath: localFilePath,
					fqdn: fqdn,
					tab: tab
				}
			});
		}
	}
});

var cache = {};

chrome.notifications.onClosed.addListener(function (notificationId, byUser) {
	delete cache[notificationId];
});

chrome.notifications.onClicked.addListener(function (notificationId) {
	var data = cache[notificationId];
	openLocalFile(data.localFilePath, data.tab);
	chrome.notifications.clear(notificationId);
});

var INDEX_ALLOW_ALWAYS_OPEN = 0;
var INDEX_DENY_ALWAYS_OPEN = 1;
chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
	var data = cache[notificationId];
	if (buttonIndex === INDEX_ALLOW_ALWAYS_OPEN) {
		allowDomains.add(data.fqdn);
		openLocalFile(data.localFilePath, data.tab);
	} else if (buttonIndex === INDEX_DENY_ALWAYS_OPEN) {
		denyDomains.add(data.fqdn);
	}
	chrome.notifications.clear(notificationId);
});

function openLocalFile(localFilePath, baseTab) {
	chrome.tabs.create({
		url: localFilePath
	});
}

class Setting {
	constructor(name) {
		this.name = name;
		this.list = {};
	}
	load() {
		this.list = JSON.parse(localStorage[this.name] || "{}");
	}
	save() {
		localStorage[this.name] = JSON.stringify(this.list);
	}
	add(fqdn) {
		this.list[fqdn] = 1;
		this.save();
	}
	remove(fqdn) {
		delete this.list[fqdn];
		this.save();
	}
	contains(fqdn) {
		return fqdn in this.list;
	}
}

var allowDomains = new Setting("allowDomains");
allowDomains.load();
var denyDomains = new Setting("denyDomains");
denyDomains.load();