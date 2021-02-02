
## Pattern

```java
String date = "2021年1月30日";
String dateRegex = "^(?<year>\\d{4})(\\D{1,})(?<month>\\d{1,2})(\\D{1,})(?<day>\\d{1,2})(\\D{1,})$";

Pattern pattern = Pattern.compile(dateRegex);
Matcher matcher = pattern.matcher(date);

if(matcher.matches()){
    String year = matcher.group("year");
    String month = matcher.group("month");
    String day = matcher.group("day");
    System.out.println(year);
    System.out.println(month);
    System.out.println(day);
}
```
- import

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;
```

```java
String[] strArr = "2021/1/30".split("\\D");
System.out.println(new Gson().toJson(strArr));
		
String[] strArr2 = "2021年1月30日".split("\\D");
System.out.println(new Gson().toJson(strArr2));
		
//		String[] strArr3 = " 2021  年 1 月  30  日".matches("^\\d{4}$");
//		System.out.println(new Gson().toJson(strArr3));
boolean a = "2021".matches("^\\d{4}$");
System.out.println(a);
		
boolean b = "2021年1月30日".matches("^\\d{4}\\D{1,}");
System.out.println(b);
		
boolean e = "2021年1月".matches("^\\d{4}\\D{1,}"); 
System.out.println(e); // true
		
boolean c = "2021年1".matches("^\\d{4}\\D{1,}"); 
System.out.println(c); // false
		
boolean d = "2021".matches("^\\d{1}..");
System.out.println(d);
		
boolean f = "2021年1月30日".matches("^(\\d{4}\\D{1,}\\d{1,2}\\D{1,}\\d{1,2}\\D{1,})$|^(\\d{4}\\D{1,}\\d{1,2}\\D{1,}\\d{1,2})$");
System.out.println(f);
		
boolean g = "2021/1/30".matches("^(\\d{4}\\D{1,}\\d{1,2}\\D{1,}\\d{1,2}\\D{1,})$|^(\\d{4}\\D{1,}\\d{1,2}\\D{1,}\\d{1,2})$");
System.out.println(g);
		
boolean h = "2021年1月30日".matches("^(<year>\\d{4})(\\D{1,})(<month>\\d{1,2})(\\D{1,})(<day>\\d{1,2})(\\D{1,})$");
System.out.println(h);
```

## to LocalDateTime

```java
		String date = "2021/01/30 12:00:01.123";
		String dateRegex = "^(?<year>\\d{4})(\\D{1,})(?<month>\\d{2})(\\D{1,})(?<day>\\d{2})(\\D{1,})(?<hour>\\d{2})(\\D{1,})(?<min>\\d{2})(\\D{1,})(?<sec>\\d{2})(\\D{1,})(?<nano>\\d{3})$";

		Pattern pattern = Pattern.compile(dateRegex);
		Matcher matcher = pattern.matcher(date);

		if(matcher.matches()){
		    String year = matcher.group("year");
		    String month = matcher.group("month");
		    String day = matcher.group("day");
		    String hour = matcher.group("hour");
		    String min = matcher.group("min");
		    String sec = matcher.group("sec");
		    String nano = matcher.group("nano");
		    System.out.println(year);
		    System.out.println(month);
		    System.out.println(day);
		    System.out.println(hour);
		    System.out.println(min);
		    System.out.println(sec);
		    System.out.println(nano);
		    LocalDateTime time = LocalDateTime.of(
		    		Integer.valueOf(year)
		    		, Integer.valueOf(month)
		    		, Integer.valueOf(day)
		    		, Integer.valueOf(hour)
		    		, Integer.valueOf(min)
		    		, Integer.valueOf(sec)
		    		, Integer.valueOf(nano)*1_000_000
		    		);
		    System.out.println(time);
```