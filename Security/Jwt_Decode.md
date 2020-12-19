
## Decode
```java
Base64 base64Url = new Base64(true);
String jwtToken = JwtToken.TOKEN;

String base64EncodedBody = jwtToken.split("\\.")[1];
String body = new String(base64Url.decode(base64EncodedBody));

JsonObject json = new Gson().fromJson(body, JsonObject.class);

System.out.println(json.get("client_id").getAsString());
```

## import
```java
import org.apache.commons.codec.binary.Base64;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
```