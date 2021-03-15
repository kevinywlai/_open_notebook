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

### javascript ^,$,{ }
```javascript
/^\d{6}$/.test('123456');   // true

/^\d{6}$/.test('1234567');   // false

/^\d{6}$/.test('14564');     // false

/\d{6}$/.test('145673356');     // true 

/\d{6}/.test('1234567890');     // true 123456, 234567 ...

/\d{6}/.test('145673356555fff');  // true

/\d{2}$/.test('1d34'); // true start from last 2 times 4,3 => true

/^\d{2}/.test('12d34'); // true from left 2 times 1,2 => true

/^\d{4,5}/.test('12gy3467'); // false from left not min 4 times and not max 5 times

/^\d{4,5}/.test('12345678'); // true

/^\d{4,5}/.test('1234t67');  // true from left, match min 4 times

/^\d{4,5}/.test('12345y78'); // true

/^\d{4,5}/.test('12345y7');  // true

/\d{4,5}/.test('1y3456789'); // true 3456, 4567 ... match

/\d{4,5}/.test('1y345'); // false
```