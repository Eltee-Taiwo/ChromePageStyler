// background.js

chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.sync.set({ "google.com": "body {background-color: #3aa757;}" });
});

// When the tab loads, inject SetPageStyle into current page
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (!tab.url.startsWith("chrome")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: SetPageStyle,
    });

    //todo: send message
  }
})

// The body of this function will be executed as a content script inside the
// current page
function SetPageStyle() {
  const myRegexp = new RegExp("^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)", "g");
  var matches = myRegexp.exec(document.domain);
  var domain = matches[1];
  chrome.storage.sync.get(domain, (item) => {
    var style = document.getElementById('PageStylerContent');
    if (style === null) {
      style = document.createElement('style')
      style.id = "PageStylerContent";
    }
    style.innerHTML = item[domain];
    document.head.appendChild(style);
    chrome.runtime.sendMessage({ Action: "SetPageStyler", PageStylerContent: item[domain], Sender: "StyleLoader" });
  });
}