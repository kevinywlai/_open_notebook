
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