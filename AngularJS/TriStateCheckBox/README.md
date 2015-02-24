HTML does not support tri-state checkboxes by default. There is an indeterminate attribute to indicate the value is undefined but there is no way set a checkbox back to indeterminate through the user interface once it has been checked or unchecked. The attribute can only be changed with JavaScript.

This sample shows how to build an AngularJS directive with TypeScript that allows to set all three states of a checkbox in HTML and with AngularJS data binding.
