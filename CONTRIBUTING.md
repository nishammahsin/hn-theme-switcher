# Contributing to Hacker News Theme Switcher

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Creating new themes

## We Develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project.

## Report bugs using Github's [issues](https://github.com/yourusername/hn-theme-switcher/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/hn-theme-switcher/issues/new); it's that easy!

## Creating a New Theme

To create a new theme:

1. Create a new CSS file in the `themes` directory (e.g., `my-awesome-theme.css`).
2. Use the following template for your theme file:

   ```css
   html[data-theme="my-awesome-theme"] {
     --bg-color: #your-color;
     --content-bg-color: #your-color;
     --content-border-color: #your-color;
     --text-color: #your-color;
     --comment-text-color: #your-color;
     --link-color: #your-color;
     --visited-color: #your-color;
     --header-bg-color: #your-color;
     --header-text-color: #your-color;
     --toptext-color: #your-color;
     --subtext-color: #your-color;
     --titleline-color: #your-color;
     --titleline-visited-color: #your-color;
     --comment-border-color: #your-color;
     --comment-highlight-color: #your-color;
     --input-bg-color: #your-color;
     --input-text-color: #your-color;
     --input-border-color: #your-color;
     --code-bg-color: #your-color;
     --code-text-color: #your-color;

     --font-size-base: 14px;
     --font-size-title: 16px;
     --font-size-subtext: 12px;
     --font-size-comment: 14px;
   }
   ```

3. Replace `my-awesome-theme` with your theme's name and set appropriate color values.
4. Add your new theme to the `THEMES` array in `js/constants.js`:
   - Open `js/constants.js`
   - Find the `THEMES` array
   - Add your new theme name to this array (e.g., `'my-awesome-theme'`)
5. Test your theme thoroughly by loading the extension and selecting your new theme.
6. Submit a pull request with your new theme file and the updated `constants.js`.

Note: Adding a new theme requires updating the `constants.js` file to include the theme in the list. This ensures that your new theme appears in the dropdown menu and can be selected by users.