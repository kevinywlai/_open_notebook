```java
String text = "A12345678912345A6123AA456789123456";
byte[] binaryData = text.getBytes();
// encode
String encodedString = Base64.getEncoder().encodeToString(binaryData);
System.out.println(encodedString);
byte[] decodedBinary = Base64.getDecoder().decode(encodedString);
System.out.println(new String(decodedBinary));
System.out.println("=====");

String encodedUrlString = Base64.getUrlEncoder().encodeToString(binaryData);
System.out.println(encodedUrlString);
byte[] decodedBinary2 = Base64.getDecoder().decode(encodedUrlString);
System.out.println(new String(decodedBinary2));
```

```java
import java.util.Base64;
```