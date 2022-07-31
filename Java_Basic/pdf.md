
# Allow more then 1 permission

- Allow: 
    1. ALLOW_MODIFY_ANNOTATIONS
    2. AllowPrinting

```java
PdfWriter a = PdfWriter.getInstance(document, new FileOutputStream("test.pdf"));

int permissions = PdfWriter.ALLOW_MODIFY_ANNOTATIONS;
int permissions2 = PdfWriter.AllowPrinting;

a.setEncryption( "null".getBytes(StandardCharsets.UTF_8) , 
                    null , 
                    permissions | permissions2, 
                    PdfWriter.STRENGTH128BITS );

document.open(); // set encryption before open document

```

### import:

```java
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
```

### pom.xml

```xml
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itextpdf</artifactId>
    <version>5.5.13.3</version>
</dependency>
<dependency>
    <groupId>org.bouncycastle</groupId>
    <artifactId>bcprov-jdk18on</artifactId>
    <version>1.71</version>
</dependency>
```