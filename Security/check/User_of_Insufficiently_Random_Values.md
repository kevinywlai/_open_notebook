# User of Insufficiently Random Values

## Preferred:

```java
    // preferred:
    SecureRandom scRand = new SecureRandom();
    scRand.setSeed(System.currentTimeMillis());
    
    System.out.println(scRand.nextInt(26));
    System.out.println(scRand.nextDouble());
```
## User of Insufficiently Random Values
```java
    Random random = new Random();
    System.out.println(random.nextInt(26));
    System.out.println(Math.random());
```

```java
import java.security.SecureRandom;
import java.util.Random;
```