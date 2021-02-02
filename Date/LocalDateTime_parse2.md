```java
String time1 = "2017/10/06 17:48:23.558";

LocalDateTime localDateTime = 
    LocalDateTime.parse(
        time1,
            DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS"));

System.out.println(localDateTime);
```

### Output
```
2017-10-06T17:48:23.558
```

yyyy/MM/dd <mark>hh</mark>:mm:ss.SSS 
```
Exception in thread "main" java.time.format.DateTimeParseException: Text '2017/10/06 17:48:23.558' could not be parsed: Invalid value for ClockHourOfAmPm (valid values 1 - 12): 17

hh => 12
HH => 24
```

