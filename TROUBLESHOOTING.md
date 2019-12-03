### Function components cannot be given refs. Attempts to access this ref will fail.
You mostly forgot to use `React.forwardRef()` when creating a custom element.
You can look at the [CustomElement example](#section-custom-element).
Forwarding ref is important because `<Element>` use ref to handle the focus.
