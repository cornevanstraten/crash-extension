chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message.txt === "req URL") {
    const currentURL = window.location.href;
    sendResponse({ url: currentURL });
    console.log(currentURL);
  } else {
    window.location.href = message.redirect;
  }
}
