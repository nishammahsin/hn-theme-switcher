// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enabled: true }, () => {
      console.log('Extension is enabled by default');
      updateIcon(true);
    });
  });
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message in background:', request);
    if (request.action === 'enable' || request.action === 'disable') {
      const isEnabled = request.action === 'enable';
      updateIcon(isEnabled);
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: request.action });
        }
      });
    }
  });
  
  // Update icon based on state
  function updateIcon(enabled) {
    const path = enabled ? 'icons/icon48.png' : 'icons/icon48_disabled.png';
    chrome.browserAction.setIcon({ path: path });
  }
  
  // Set initial icon state
  chrome.storage.sync.get('enabled', (data) => {
    updateIcon(data.enabled);
  });