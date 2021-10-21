console.log('Pop.Js was loaded!');

// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  const myRegexp = new RegExp("^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)", "g");
  var matches = myRegexp.exec(document.domain);
  var domain = matches[1];
  console.log(domain);
  chrome.storage.sync.get(domain, (item) => {
    var style = document.createElement('style')
    style.innerHTML = item[domain];
    document.head.appendChild(style)
  });
}