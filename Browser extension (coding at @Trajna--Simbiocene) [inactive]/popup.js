function mapCurrentTab() {
  var tab = chrome.tabs.getCurrent();
  tab.executeScript({
    file: 'parseFeed.js'
  });
  /*chrome.tabs.executeScript({
    file: 'switch.js'
  });*/
}

document.getElementById('clickme').addEventListener('click', mapCurrentTab);