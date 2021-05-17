

## with Request Parameters 

```
https://test.com/test/test?ID=A12345
```

```javascript
fetch(
    'https://test.com/test/test',{
        method:'POST',
        body:'ID=A12345',
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
        }       
})
.then(res=>res.json())
.then(console.log)
```

# Reference
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)