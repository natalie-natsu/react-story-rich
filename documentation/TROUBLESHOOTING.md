### `Function components cannot be given refs.`<br />`Attempts to access this ref will fail.`
You mostly forgot to use `React.forwardRef()` when creating a custom element.
