let currentURL = "about:blank";

class Pitch {
  constructor() {
    (this.companyName = document.getElementById("company-name").value),
      (this.companyDomain = document.getElementById("company-domain").value),
      (this.jobTitle = document.getElementById("job-title").value),
      (this.postingURL = currentURL),
      (this.hiringManagerName = document.getElementById(
        "hiring-manager"
      ).value);
  }
  createURL() {
    let pitchJSON = JSON.stringify(this);
    this.pitchURL =
      "https://crash.co/pitches/new?variables=" + encodeURI(pitchJSON);
  }
}

document.querySelectorAll(".input").forEach((item) => {
  item.addEventListener("change", updateButton);
});

function updateButton() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { txt: "req URL" }, function (
      response
    ) {
      currentURL = response.url;
      let newPitch = new Pitch();
      newPitch.createURL();
      document.getElementById("pitch-button").href = newPitch.pitchURL;
    });
  });
}
