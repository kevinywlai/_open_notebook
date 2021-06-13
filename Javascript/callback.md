# Example:

```javascript

function print(name) {
  console.log('Hello, ' + name);
}

function input(callback) {
  var name = prompt('input your name');
  callback(name);
}

input(print);
```

# Reference

- [Callback_function, mozilla](https://developer.mozilla.org/zh-TW/docs/Glossary/Callback_function)