### `Function components cannot be given refs.`<br />`Attempts to access this ref will fail.`
You mostly forgot to use `React.forwardRef()` when creating a custom element.
You can look at the [CustomElement component in the Layout code example](#layout).
Forwarding ref is important because `<Element>` use ref to handle the focus.
