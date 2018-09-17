'use strict';

console.log('Tab counter: background.js');

const green = [129, 214, 116, 255];
const yellow = [235, 241, 130, 255];
const red = [218, 98, 114, 255];

const colors = [{count: 0, color: green}, {count: 20, color: yellow}, {count: 30, color: red}];

function updateCount() {
  chrome.tabs.query({}, tabs => {
    const count = String(tabs.length);
    chrome.browserAction.setTitle({title: count});
    chrome.browserAction.setBadgeText({text: count});
    const color = getColor(tabs.length);
    chrome.browserAction.setBadgeBackgroundColor({color: color});
  });
}

function getColor(count) {
  for (let i = colors.length - 1; i < colors.length && i >= 0; i--) {
    if (colors[i].count <= count) {
      return colors[i].color;
    }
  }
  throw new Error('No color');
}

chrome.runtime.onInstalled.addListener(updateCount);
chrome.tabs.onCreated.addListener(updateCount);
chrome.tabs.onRemoved.addListener(updateCount);
// chrome.tabs.onAttached.addListener(updateCount);
// chrome.tabs.onDetached.addListener(updateCount);
