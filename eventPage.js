chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);	
	chrome.browserAction.setBadgeText({ text: request.unreadMessagesCount});	
});