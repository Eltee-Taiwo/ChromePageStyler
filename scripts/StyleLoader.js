// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ "google.com" : "body {background-color: #3aa757;}" });
  console.log('Default background color set to %cgreen', `color: #FF0000`);
});