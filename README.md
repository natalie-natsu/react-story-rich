@react-story-rich helps to create narrative games with javascript basics.

Contrary to
[Ink](https://github.com/inkle/ink) or
[Twine](https://twinery.org/),
you don't have to learn a "proxy" language to get started.
On the other hand, the library remains sufficiently low level not to restrict itself in the possibilities.
This includes:
* A tree API to parse simple story definitions in JS or even in JSON
* A navigation API to navigate through a Story Node to another
* A history reducer to keep tracks of user actions and render a timeline
* Components & hooks to handle most common interactions

<img src="https://raw.githubusercontent.com/wasa42/react-story-rich/HEAD/documentation/assets/example.gif" alt="Example of a CardElement from @react-story-rich">

## Installation
```bash
npm install @react-story-rich/core -S
// or
yarn add @react-story-rich/core
```

## Getting started
With @react-story-rich, you can start with a template based on create-react-app already including the following topics:
* [Working with translations](https://wasa42.github.io/react-story-rich/#section-translations)
* [Dark mode & theming](https://wasa42.github.io/react-story-rich/#section-theming)
* [Local saves & persistence](https://wasa42.github.io/react-story-rich/#section-persistence)
* [Optimizing performance with virtualization](https://wasa42.github.io/react-story-rich/#section-virtualization)
* [Game oriented UI](https://wasa42.github.io/react-story-rich/#section-game-ui)
* [Hash Routing](https://wasa42.github.io/react-story-rich/#section-hash-routing)
* [Deploy to gh-pages](https://wasa42.github.io/react-story-rich/#section-deployment)

Find the template on GitHub: [react-story-rich-template](https://github.com/WaSa42/react-story-rich-template)

<img style="max-width: 100%;" src="https://raw.githubusercontent.com/wasa42/react-story-rich/HEAD/documentation/assets/settings-view.png" alt="Settings view template with dark mode on">

## Go further
To go further, you may be interested to create specific components like a dice roller for example
or puzzle games or a Pokémon like battle scene, everything is possible.

Check the documentation for how create your own custom components with hooks:
* [How to create custom components](https://wasa42.github.io/react-story-rich/#section-custom-component)
* [Use hooks for focus and interactions](https://wasa42.github.io/react-story-rich/#section-hooks)
