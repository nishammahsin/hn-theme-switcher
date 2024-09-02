
let isEnabled = true;

// Function to create and inject the theme dropdown
function createThemeDropdown() {
  console.log('Creating theme dropdown');
  const dropdown = document.createElement('select');
  dropdown.id = 'hn-theme-dropdown';
  dropdown.style.marginLeft = '10px';

  // Add options to the dropdown
  const themes = ['default', 'dark', 'solarized-light', 'solarized-dark', 'oceanic', 'midnight-blue', 'forest-green', 'sepia', 'monokai'];
  THEMES.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme;
    option.textContent = theme.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    dropdown.appendChild(option);
  });

  // Add event listener for theme change
  dropdown.addEventListener('change', function() {
    if (isEnabled) {
      applyTheme(this.value);
      chrome.storage.sync.set({'theme': this.value});
    }
  });

  // Insert the dropdown in the header
  const topbar = document.querySelector('.pagetop');
  if (topbar) {
    console.log('Found .pagetop element');
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(' | '));
    span.appendChild(dropdown);
    topbar.appendChild(span);
    console.log('Inserted dropdown into .pagetop');
  } else {
    console.error('Could not find .pagetop element');
  }
}

function applyTheme(theme) {
  if (!isEnabled) return;
  
  console.log(`Applying theme: ${theme}`);

  // Remove any previously injected style tags
  const existingStyles = document.querySelectorAll('#hn-base-theme-style, #hn-theme-style');
  existingStyles.forEach(style => style.remove());
  console.log('Removed existing styles');

  if (theme === 'default') {
    document.documentElement.removeAttribute('data-theme');
    console.log('Removed data-theme attribute');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    console.log(`Set data-theme attribute to ${theme}`);

    // Fetch and inject the base theme CSS
    const baseThemeUrl = chrome.runtime.getURL('css/base-theme.css');
    console.log(`Fetching base theme from: ${baseThemeUrl}`);
    fetch(baseThemeUrl)
      .then(response => response.text())
      .then(css => {
        const style = document.createElement('style');
        style.id = 'hn-base-theme-style';
        style.textContent = css;
        document.head.appendChild(style);
        console.log('Injected base theme CSS');
      })
      .catch(error => console.error('Error loading base theme:', error));

    // Fetch and inject the specific theme CSS
    const themeUrl = chrome.runtime.getURL(`themes/${theme}.css`);
    console.log(`Fetching theme from: ${themeUrl}`);
    fetch(themeUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(css => {
        const style = document.createElement('style');
        style.id = 'hn-theme-style';
        style.textContent = css;
        document.head.appendChild(style);
        console.log('Injected theme CSS');
      })
      .catch(error => console.error(`Error loading theme ${theme}:`, error));
  }

  // Update dropdown selection
  const dropdown = document.getElementById('hn-theme-dropdown');
  if (dropdown) {
    dropdown.value = theme;
  }
}

// Create and inject the dropdown when the page loads
window.addEventListener('load', function() {
  console.log('Window loaded, creating dropdown');
  createThemeDropdown();

  // Load and apply the saved theme
  chrome.storage.sync.get(['theme', 'enabled'], function(data) {
    console.log('Retrieved from storage:', data);
    isEnabled = data.enabled !== false;
    if (data.theme && isEnabled) {
      applyTheme(data.theme);
    }
  });
});

// Listen for enable/disable messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Received message:', request);
  if (request.action === "enable") {
    isEnabled = true;
    chrome.storage.sync.get('theme', function(data) {
      if (data.theme) {
        applyTheme(data.theme);
      }
    });
  } else if (request.action === "disable") {
    isEnabled = false;
    applyTheme('default');
  }
});

console.log('Content script loaded');