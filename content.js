chrome.runtime.onMessage.addListener(gotMessage);

const currentURL = window.location.href;
let jobData = false;

if (
  currentURL.indexOf("angel.co/company/") !== -1 &&
  currentURL.indexOf("/jobs/") !== -1 &&
  currentURL.length < 100
) {
  scrapeAngelData();
}

function scrapeAngelData() {
  jobData = {
    companyName: document.getElementsByTagName("h1")[0].innerText,
    companyDomain: document.getElementsByClassName("websiteLink_b71b4")[0]
      .innerText,
    jobTitle: document.getElementsByTagName("h2")[1].innerText,
    postingURL: currentURL,
    hiringManager: document.getElementsByTagName("h4")[0].innerText,
  };
  console.log(jobData);
}

function gotMessage(message, sender, sendResponse) {
  if (message.txt === "req jobData") {
    sendResponse({ jobData: jobData });
  } else if (message.txt === "req URL") {
    sendResponse({ url: currentURL });
  } else {
    window.location.href = message.redirect;
  }
}
