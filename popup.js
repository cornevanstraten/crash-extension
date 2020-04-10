let currentURL = "about:blank";
let redirectURL = "https://crash.co/pitches/new";

function returnPitchJSON() {
  let pitchObj = {
    companyName: document.getElementById("company-name").value,
    companyDomain: document.getElementById("company-domain").value,
    jobTitle: document.getElementById("job-title").value,
    postingURL: currentURL,
    hiringManagerName: document.getElementById("hiring-manager").value,
  };
  return JSON.stringify(pitchObj);
}

function createURL(pitchJSON) {
  return `https://crash.co/pitches/new?variables=${encodeURI(pitchJSON)}`;
}

document
  .getElementById("pitch-button")
  .addEventListener("click", createPitchURLAndRedirect);

function requestjobData() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { txt: "req jobData" }, function (
      response
    ) {
      if (response.jobData) {
        document.getElementById("company-name").value =
          response.jobData.companyName;
        document.getElementById("company-domain").value =
          response.jobData.companyDomain;
        document.getElementById("job-title").value = response.jobData.jobTitle;
        document.getElementById("hiring-manager").value =
          response.jobData.hiringManager;
      }
    });
  });
}

requestjobData();

function createPitchURLAndRedirect() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { txt: "req URL" }, function (
      response
    ) {
      currentURL = response.url;
      redirectURL = createURL(returnPitchJSON());
      redirect();
    });
  });
}

function redirect() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      txt: "redirect",
      redirect: redirectURL,
    });
  });
}

//on open: request txt: "req job data"
//createURL(jobDataJSON)
