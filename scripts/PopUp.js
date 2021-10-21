window.onload = async function() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, {Action: "GetPageStyler", Sender: "PopUp"}, PopulateCssInput);
}

// Initialize button with user's preferred color
let saveButton = document.getElementById("SaveButton");
let cssInput = document.getElementById("cssInput");

// When the button is clicked, save the current style and apply it.
saveButton.addEventListener("click", async (event) => {
  event.preventDefault();
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const myRegexp = new RegExp("^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)", "g");
  var matches = myRegexp.exec(tab.url);
  var domain = matches[1];

  let customCss = cssInput.value;
  chrome.storage.sync.set({ [domain]: customCss }, () => {
    //Now that the style content has saved, send a message to the ActiveStyleLoader on the page to update the stylesheet.
    chrome.tabs.sendMessage(tab.id, {Action: "SetPageStyler", PageStylerContent: customCss, Sender: "PopUp"});
  });
});

function PopulateCssInput(styleContent) {
  cssInput.value = styleContent;
}