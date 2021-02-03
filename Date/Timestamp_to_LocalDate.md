
- mybatis:
```java

LocalDate birthday = 
    ((Timestamp)data.get(0).get("birthday"))
        .toLocalDateTime()
        .toLocalDate();
```
## import:
```java
import java.sql.Timestamp;
```

## 2 <->

```java
LocalDateTime now = LocalDateTime.now();
Timestamp timestamp = Timestamp.valueOf(now);
System.out.println("LocalDateTime -> Timestamp :" + timestamp);

LocalDateTime localDateTime = timestamp.toLocalDateTime();

System.out.println("Timestamp -> LocalDateTime :" + localDateTime);

System.out.println("================");

LocalDate now2 = LocalDate.now();
Timestamp timestamp2 = Timestamp.valueOf(now2.atStartOfDay());
System.out.println("LocalDateTime -> Timestamp :" + timestamp2);

LocalDate localDate = timestamp2.toLocalDateTime().toLocalDate();

System.out.println("Timestamp -> LocalDateTime :" + localDate);
```
## output:
```
LocalDateTime -> Timestamp :2021-02-04 00:11:36.731
Timestamp -> LocalDateTime :2021-02-04T00:11:36.731
================
LocalDateTime -> Timestamp :2021-02-04 00:00:00.0
Timestamp -> LocalDateTime :2021-02-04
```
## import:
```java
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
```