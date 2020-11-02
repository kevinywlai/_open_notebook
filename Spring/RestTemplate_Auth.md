## basic

```java
RestTemplate restTemplate = new RestTemplate();
...
HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);
headers.set("Authorization","Basic Encoded_Account:Password");

HttpEntity<String> request = new HttpEntity<>(requestStr, headers);

```

### Basic Encoded_Account:Password
```java
String auth = "Account:Password";
byte[] encodedAuth = Base64.encodeBase64(
    autho.getBytes(Charset.forName("UTF-8"))
);
String authStrEncoded = new String(encodedAuth); 

```


## oauth2
```java
RestTemplate restTemplate = new RestTemplate();
...
HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);
headers.set("Authorization","Bearer jwt_token");

HttpEntity<String> request = new HttpEntity<>(requestStr, headers);

```