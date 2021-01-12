
- mybatis:
```java

LocalDate birthday = 
    ((Timestamp)data.get(0).get("birthday"))
        .toLocalDateTime()
        .toLocalDate();
```

```java
import java.sql.Timestamp;
```