chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method === "openLocalFile") {
		var path = request.path;
		chrome.tabs.create({
			url: path
		});
	}
});