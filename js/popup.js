document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('enableToggle');
  var status = document.getElementById('status');

  // Load the current state
  chrome.storage.sync.get('enabled', function(data) {
    toggle.checked = data.enabled;
    status.textContent = data.enabled ? 'Enabled' : 'Disabled';
  });

  // Listen for changes to the toggle
  toggle.addEventListener('change', function() {
    var isEnabled = toggle.checked;
    chrome.storage.sync.set({enabled: isEnabled}, function() {
      status.textContent = isEnabled ? 'Enabled' : 'Disabled';
      chrome.runtime.sendMessage({action: isEnabled ? 'enable' : 'disable'});
    });
  });
});