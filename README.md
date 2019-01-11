# Static UI Component Library - v1

This is a work in progress version of static ui component library build with HTML, CSS and JavaScript, which was put together as a POC for further development. 
DEMO [https://rahulpatle101.github.io/component-lib-poc/]

## Tools/language used to build
* HTML
* LESS
* JavaScript
* Live server
* Iconmoon for generating icon fonts

## Sections

These are the following sections used in the docs

* Icons
* Header
* Typography
* Page
* Panel
* Links
* Buttons Default
* Buttons Sizes
* Buttons Fluid
* Buttons Group
* Forms & Inputs
* Inline Form Elements
* Disabled Element
* Form Error Element
* Checkbox Slider Toggle
* Modal
* Tooltip


## Next Steps for v2

* Implement Atomic Design folder architecture
* Add better codesnippet view for clear documentation
* Reactify components
* Make responsive


## Refactor / bug fixes

* Refactor Layout (Panel and grid)
* Refactor HTML Markup (Remove unused markup)
* Cleanup styles of all Components
* Remove extra, unused vendor CSS files, jQuery
* Consolidate sass variables


## How to run this library in your local host

* Download .zip
* Make sure you have node v10^
* Install live server and node-sass

```sh

npm install -g live-server

npm install -g node-sass

```
* cd to downloaded directory
* Compile sass to css

```sh

node-sass -w styles/main.sass styles/main.css

```

* Open new terminal from same directory and run live-server

```sh

live-server

```

* Open browser you should be able to see the live site on http://127.0.0.1:8080





