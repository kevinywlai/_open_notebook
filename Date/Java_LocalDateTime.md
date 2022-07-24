- [LocalDateTime toString](#localdatetime-tostring)
- [String to LocalDateTime](#string-to-localdatetime)
- [Millis](#millis)
- [XMLGregorianCalendar](#xmlgregoriancalendar)
- [java.util.Date](#javautildate)
- [java.sql.Date](#javasqldate)
- [java.sql.Timestamp](#javasqltimestamp)
- [Calendar](#calendar)

# Pattern Letters and Symbols

|Symbol|Meaning|Presentation|Examples|
|---|---|---|---|
Y|week-based-year|year|1996; 96
w|week-of-week-based-year|number|27
W|week-of-month|number|4
E|day-of-week|text|Tue; Tuesday; T
a|am-pm-of-day|text|PM
h|clock-hour-of-am-pm (1-12)|number|12
K|hour-of-am-pm (0-11)|number|0
k|clock-hour-of-day (1-24)|number|24
H|hour-of-day (0-23)|number|0
m|minute-of-hour|number|30
s|second-of-minute|number|55
S|fraction-of-second|fraction|978
|||||

[more DateTimeFormatter,docs.oracle.com](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html#patterns)

```java
DateTimeFormatter.ISO_DATE_TIME
```
[Field Summary,docs.oracle.com](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html#field.summary)


# LocalDateTime toString

<a id="LocalDateTime-toString">anchor</a>

```java
String timeStr1 = "2022-07-24T17:00:00";
LocalDateTime l1 = 
    LocalDateTime
        .parse(timeStr1, DateTimeFormatter.ISO_DATE_TIME);

System.out.println(l1.toString()); 
```

## Output

```md
2022-07-24T17:00
```

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
```

# String to LocalDateTime

<a id="String-to-LocalDateTime">anchor</a>

## 1

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
LocalDateTime localDateTime = LocalDateTime
                                .parse(timeStr1, formatter);
String parsedTimeStr1 = localDateTime.format(DateTimeFormatter.ISO_DATE_TIME);
```

### Output

```md
2022-07-24T17:34:33
```

### Error

> yyyy-MM-dd `hh`:mm:ss

```properties

h       clock-hour-of-am-pm (1-12)
H       hour-of-day (0-23)
#error note
#------------
# "2022-07-24 08:34:33" ofPattern("yyyy-MM-dd hh:mm:ss")
# Text '2022-07-24 08:34:33' could not be parsed: Unable to obtain LocalDateTime from TemporalAccessor:

# "2022-07-24 17:34:33" ofPattern("yyyy-MM-dd hh:mm:ss")
# Text '2022-07-24 17:34:33' could not be parsed: Invalid value for ClockHourOfAmPm

```

## 2,3

```java
String timeStr2 = "2022-07-24T12:34:33";
DateTimeFormatter formatter2 =  DateTimeFormatter.ISO_DATE_TIME;

String parsedTimeStr2 = LocalDateTime
                            .parse(timeStr2, formatter2)
                            .format(DateTimeFormatter.ISO_DATE_TIME);

String timeStr3 = "2022-07-24T12:34:33+08:00";
String parsedTimeStr2_2 = LocalDateTime
                            .parse(timeStr3, formatter2)
                            .format(DateTimeFormatter.ISO_DATE_TIME);
```

### Output

```md
2022-07-24T12:34:33
2022-07-24T12:34:33
```

## 4

```java
String timeStr4 = "2022-07-24T12:34:33.123+08:00";
DateTimeFormatter formatter4 =  DateTimeFormatter
                                    .ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS+08:00");
String parsedTimeStr4 = LocalDateTime
                            .parse(timeStr4, formatter4)
                            .format(DateTimeFormatter.ISO_DATE_TIME);
```

### Output

```md
2022-07-24T12:34:33.123
```

### Error IllegalArgumentException: Unknown pattern letter: T

> 2022-07-24`T`12:34:33.123+08:00

```java
String timeStr5 = "2022-07-24T12:34:33.123+08:00";
DateTimeFormatter formatter5 =  DateTimeFormatter
                                    .ofPattern("yyyy-MM-ddTHH:mm:ss.SSS+08:00"); 
```

# Millis

<a id="Millis">anchor</a>

## now

### 1

```java
long currentMillis = System.currentTimeMillis();
```

### 2

- Reference

[whats-the-difference-between-instant-and-localdatetime, stackoverflow.com](https://stackoverflow.com/questions/32437550/whats-the-difference-between-instant-and-localdatetime)

```java
Instant instant = Instant.now();
long currentMillis2 = instant.toEpochMilli();
```

### 3

```java
ZonedDateTime zdt = ZonedDateTime.of(LocalDateTime.now(),ZoneId.of("Asia/Taipei") ); 
// or ZoneId.systemDefault()
long currentMillis3 = zdt.toInstant().toEpochMilli();
```
## specific time

- 2022-07-24T12:34:33

```java
ZonedDateTime zdt2 = 
ZonedDateTime
    .of(
        LocalDateTime.parse("20220724 12:34:33", 
            DateTimeFormatter.ofPattern("yyyyMMdd HH:mm:ss")),
        ZoneId.systemDefault()
    );
long currentMillis4 = zdt2.toInstant().toEpochMilli();
```

# Get time between two time zones

<a id="time-zone">anchor</a>

```java
LocalDateTime localDateTimeTokyo =
        LocalDateTime.parse("2022-07-24T12:34:33.123+08:00",
                        DateTimeFormatter
                                .ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS+08:00")
                )
        .atZone(ZoneId.of("Asia/Taipei"))
        .withZoneSameInstant(ZoneId.of("Asia/Tokyo"))
        .toLocalDateTime();

System.out.println("localDateTime Tokyo:"+localDateTimeTokyo.format(DateTimeFormatter.ISO_DATE_TIME));
System.out.println("localDateTime Tokyo:"+localDateTimeTokyo.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
```

### Output

```md
localDateTime Tokyo:2022-07-24T13:34:33.123
localDateTime Tokyo:2022-07-24T13:34:33.123
```

# XMLGregorianCalendar

<a id="XMLGregorianCalendar">anchor</a>

## to LocalDateTime

```java
XMLGregorianCalendar xmlGregorianCalendar4 =
                DatatypeFactory
                    .newInstance().newXMLGregorianCalendar(new GregorianCalendar());
System.out.println(xmlGregorianCalendar4);

LocalDateTime localDateTime5 = LocalDateTime
                                .parse(
                                    xmlGregorianCalendar4.toString(), 
                                    DateTimeFormatter.ISO_DATE_TIME);

String parsedTimeStr5 = localDateTime5.format(DateTimeFormatter.ISO_DATE_TIME);

System.out.println("localDateTime5:"+parsedTimeStr5); // 2022-07-24T02:33:40.904
```

### Output

```md
2022-07-24T02:33:40.904
```

## to XMLGregorianCalendar

```java
public static XMLGregorianCalendar convert(LocalDateTime localDateTime) 
        throws DatatypeConfigurationException {
    return DatatypeFactory
            .newInstance()
            .newXMLGregorianCalendar(
                    localDateTime.format(DateTimeFormatter.ISO_DATE_TIME)
            );
}
```

```java
DateTimeFormatter formatter = 
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
LocalDateTime localDateTime = LocalDateTime
                .parse("2022-07-24 17:34:33", formatter);

System.out.println(convert(localDateTime));
```

# java.util.Date

<a id="java.util.Date">anchor</a>

## to LocalDateTime

```java
public static LocalDateTime convert(java.util.Date dateToConvert) {
    return dateToConvert.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDateTime();
}

public static LocalDateTime convert(java.util.Date dateToConvert){
    return new java.sql.Timestamp(dateToConvert.getTime()).toLocalDateTime();
}
```

## to java.util.Date

```java
public static java.util.Date convert(LocalDate dateToConvert) {
    return java.util.Date.from(dateToConvert.atStartOfDay()
            .atZone(ZoneId.systemDefault())
            .toInstant());
}

public static java.util.Date convert(LocalDateTime dateToConvert) {
    return java.util.Date.from(dateToConvert
            .atZone(ZoneId.systemDefault())
            .toInstant());
}
```

# java.sql.Date

<a id="java.sql.Date">anchor</a>

## to LocalDateTime

```java
public static LocalDateTime convert(java.sql.Date dateToConvert) {
    return dateToConvert.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDateTime();
}

public static LocalDateTime convert(java.sql.Date dateToConvert){
    return new java.sql.Timestamp(dateToConvert.getTime()).toLocalDateTime();
}
```

## to java.sql.Date

```java
public static java.sql.Date convertToDateViaSqlTimestamp(LocalDateTime dateToConvert) {
    long millis = 
        ZonedDateTime.of(
            dateToConvert,ZoneId.systemDefault()
        ).toInstant().toEpochMilli();

    return new java.sql.Date(millis);
}
```

```java
DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
LocalDateTime localDateTime = 
                LocalDateTime
                    .parse("2022-07-24 17:34:33", formatter);

java.sql.Date d =  convert(localDateTime);
System.out.println(d.toLocaleString());
```

### Output

```md
Jul 24, 2022 5:34:33 PM
```


# java.sql.Timestamp

<a id="java.sql.Timestamp">anchor</a>

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

# Calendar

## to java.util.Calendar

<a id="java.util.Calendar">anchor</a>

```java
public static Calendar convert(LocalDateTime localDateTime) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(
        java.util.Date.from(localDateTime
        .atZone(ZoneId.systemDefault())
        .toInstant())
    );
    return calendar;
}
```

```java
System.out.println(convert(LocalDateTime.now()));
```

### output:

```
java.util.GregorianCalendar[time=1658660272845,areFieldsSet=true,areAllFieldsSet=true,lenient=true,zone=sun.util.calendar.ZoneInfo[id="Asia/Taipei",offset=28800000,dstSavings=0,useDaylight=false,transitions=42,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2022,MONTH=6,WEEK_OF_YEAR=31,WEEK_OF_MONTH=5,DAY_OF_MONTH=24,DAY_OF_YEAR=205,DAY_OF_WEEK=1,DAY_OF_WEEK_IN_MONTH=4,AM_PM=1,HOUR=6,HOUR_OF_DAY=18,MINUTE=57,SECOND=52,MILLISECOND=845,ZONE_OFFSET=28800000,DST_OFFSET=0]
```

## to LocalDateTime

```java
public static LocalDateTime convert(Calendar calendar) {
    return calendar.getTime().toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDateTime();
}
```

```java
Calendar calendar = Calendar.getInstance();
String parsedTimeStr = convert(calendar).format(DateTimeFormatter.ISO_DATE_TIME);
System.out.println(parsedTimeStr);
```

### output:
```
2022-07-24T18:57:52.709
```

```java
import java.util.Calendar;
```

# Reference

[java-date-to-localdate-and-localdatetime, baeldung.com](https://www.baeldung.com/java-date-to-localdate-and-localdatetime)