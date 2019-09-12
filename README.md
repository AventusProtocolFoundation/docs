This website was created with [Docusaurus](https://docusaurus.io/).

# What's In This Document

- [Publishing Updates](#publishing-updates)
- [Running Locally](#running-locally)
- [Directory Structure](#directory-structure)
- [Editing Content](#editing-content)
- [Adding Content](#adding-content)
- [Publishing the Website](#publishing-the-website)
- [Full Documentation](#full-documentation)

# Publishing Updates

Our continuous integration service, Jenkins, will auto-publish any changes pushed to the master
branch.

# Running Locally

Install [Homebrew](https://brew.sh/):

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install [Yarn](https://yarnpkg.com/lang/en/):

```sh
brew install yarn
```

Change to the `website` directory:

```sh
cd website
```

Make sure all the dependencies for the website are installed:

```sh
yarn
```

Run your dev server:

```sh
yarn start
```

To stop the local server use `ctrl+c`. You may need to stop and restart the server if you make site
config changes or add/remove a page. Any changes to text should not require the server to be
restarted (they are live-reloaded).

## Directory Structure

Your project file structure should look something like this

```
my-docusaurus/
  docs/
    doc-1.md
    doc-2.md
    doc-3.md
  website/
    core/
    node_modules/
    pages/
    static/
      css/
      img/
    package.json
    sidebar.json
    siteConfig.js
```

# Editing Content

## Editing an existing docs page

Edit docs by navigating to `docs/` and editing the corresponding document:

`docs/doc-1.md`

```markdown
---
id: this-is-a-page-id
title: This is the document title
---

Edit me...
```

For more information about docs, click [here](https://docusaurus.io/docs/en/navigation)

# Adding Content

## Adding a new docs page to an existing sidebar

Create the doc as a new markdown file in `/docs`, example `docs/newly-created-doc.md`:

```md
---
id: newly-created-doc
title: This Doc Needs To Be Edited
---

My new content here..
```

Refer to that doc's ID in an existing sidebar in `website/sidebar.json`:

```javascript
// Add newly-created-doc to the Getting Started category of docs
{
  "docs": {
    "Getting Started": [
      "quick-start",
      "newly-created-doc" // new doc here
    ],
    ...
  },
  ...
}
```

For more information about adding new docs, click [here](https://docusaurus.io/docs/en/navigation)

## Adding items to your site's top navigation bar

Add links to docs, custom pages or external links by editing the headerLinks field of
`website/siteConfig.js`:

```javascript
{
  headerLinks: [
    ...
    /* you can add docs */
    { doc: 'my-examples', label: 'Examples' },
    /* you can add custom pages */
    { page: 'help', label: 'Help' },
    /* you can add external links */
    { href: 'https://github.com/facebook/Docusaurus', label: 'GitHub' },
    ...
  ],
  ...
}
```

For more information about the navigation bar, click
[here](https://docusaurus.io/docs/en/navigation)

## Adding custom pages

Docusaurus uses React components to build pages. The components are saved as .js files in
`website/pages/en`:

If you want your page to show up in your navigation header, you will need to update
`website/siteConfig.js` to add to the `headerLinks` element:

```javascript
{
  headerLinks: [
    ...
    { page: 'my-new-custom-page', label: 'My New Custom Page' },
    ...
  ],
  ...
}
```

For more information about custom pages, click [here](https://docusaurus.io/docs/en/custom-pages).

# Versioning

To cut a new version, run the following command whilst in the `website` directory:

```sh
yarn new-version x.x.x
```

Versioning requires a hardcoded homepage (in the `website/pages/en/versions.js` file). This is
currently set to `intro`. This will need to be updated if `intro.md` is renamed.

# Full Documentation

Full documentation can be found on the [website](https://docusaurus.io/).
