
# UTF-8

```java
RestTemplate restTemplate = new RestTemplate();
restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
```

# Reference

- [How can I tell RestTemplate to POST with UTF-8 encoding?, stackoverflow](https://stackoverflow.com/questions/29392422/how-can-i-tell-resttemplate-to-post-with-utf-8-encoding)