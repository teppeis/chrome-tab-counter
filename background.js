console.log('Tab counter: background.js');

var green = [129,214,116,255];
var yellow = [235,241,130,255];
var red = [218,98,114,255];

var colors = [
  {count: 0, color: green},
  {count: 20, color: yellow},
  {count: 30, color: red}
];

function updateCount() {
  chrome.tabs.query({}, function(tabs) {
    var count = String(tabs.length);
    chrome.browserAction.setTitle({title: count});
    chrome.browserAction.setBadgeText({text: count});
    var color = getColor(tabs.length);
    chrome.browserAction.setBadgeBackgroundColor({color: color});
  });
}

function getColor(count) {
  for (var i = colors.length - 1; i < colors.length && i >= 0; i--) {
    if (colors[i].count <= count) {
      return colors[i].color;
    }
  }
  throw new Error('No color');
}

chrome.runtime.onInstalled.addListener(updateCount);
chrome.tabs.onCreated.addListener(updateCount);
chrome.tabs.onRemoved.addListener(updateCount);
//chrome.tabs.onAttached.addListener(updateCount);
//chrome.tabs.onDetached.addListener(updateCount);
