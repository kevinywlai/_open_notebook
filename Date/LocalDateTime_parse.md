```java
String time1 = "2020-10-21T23:15:12";

String time2 = "2020-10-21T23:15:12.000";

String time3 = "2020-10-21T23:15:12.000+08:00";

//ISO_DATE_TIME

LocalDateTime l1 = LocalDateTime.parse(time1, DateTimeFormatter.ISO_DATE_TIME);
LocalDateTime l2 = LocalDateTime.parse(time2, DateTimeFormatter.ISO_DATE_TIME);
LocalDateTime l3 = LocalDateTime.parse(time3, DateTimeFormatter.ISO_DATE_TIME);

System.out.println(l1.toString());
System.out.println(l2.toString());
System.out.println(l3.toString());
```

## Output
```
2020-10-21T23:15:12
2020-10-21T23:15:12
2020-10-21T23:15:12
```

## Error

```java
DateTimeFormatter p1 = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'hh:mm:ss.SSS");

//LocalDateTime l21 = LocalDateTime.parse(time1, DateTimeFormatter.ISO_OFFSET_DATE_TIME); // java.time.format.DateTimeParseException: Text '2020-10-21T23:15:12' could not be parsed at index 19
//LocalDateTime l22 = LocalDateTime.parse(time2, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
LocalDateTime l23 = LocalDateTime.parse(time3, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
```

## Reference
- [Class LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html)

- [Class DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) 
    - yyyy/MM/dd HH:mm:ss.SSS, ZoneId etc.