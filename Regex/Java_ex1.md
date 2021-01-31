```java
boolean m = "14".matches("^[0-9].");
System.out.println(m);

boolean n = "14".matches(".\\d$");
System.out.println(n); // true

boolean o = "14".matches("\\d");
System.out.println(o); // 2 chars => false

boolean p = "1".matches("\\d"); 
System.out.println(p); // 1 char => true
```

```java
boolean i = "year".matches("^y.r$");
System.out.println(i); // false

boolean j = "year".matches("^y..r$");
System.out.println(j); // true

boolean k = "year".matches("^y\\w{1,}r$");
System.out.println(k); // true

boolean l = "year".matches("^y\\wr$");
System.out.println(l); // false

boolean m = "year".matches("^y\\w\\wr$");
System.out.println(m); // true

```