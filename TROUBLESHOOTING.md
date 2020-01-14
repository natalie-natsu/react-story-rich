### `Function components cannot be given refs.`<br />`Attempts to access this ref will fail.`
You mostly forgot to use `React.forwardRef()` when creating a custom element.

### `So What About Inheritance?`
We may ask our self this question since
"At Facebook, they use React in thousands of components, and they haven’t found any use cases
where they would recommend creating component inheritance hierarchies."

https://reactjs.org/docs/composition-vs-inheritance.html#so-what-about-inheritance

In the early versions, I used composition but I've found it quite verbose in the project current context.
Controlling props was a bit of a challenge while the context was to give tools for creating story-rich game easily.

However, as you can imagine, I'm not satisfied with this decision
because I'm aware that at Facebook, they're always right.
And since for now, I'm alone on the project, it's difficult for me to have the best opinion.

If you read this, please feel free to give yours in an issue.
