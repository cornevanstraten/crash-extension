chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  const currentURL = window.location.href;
  sendResponse({ url: currentURL });
}
