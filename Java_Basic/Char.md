## int
```java
String txt1 = "test@test.com";
StringJoiner sj = new StringJoiner(":");
txt1.chars()
        .mapToObj(c -> String.valueOf((int) c))
        .collect(Collectors.toList())
        .forEach(intStr -> sj.add(intStr));

String test = sj.toString();

StringBuilder sb = new StringBuilder();
Arrays.asList(test.split(":"))
        .stream()
        .forEach(i -> {
            int charInt = Integer.valueOf(i);
            char a = (char)charInt;
            sb.append(Character.toString(a));
        });
System.out.println(sb.toString());
```
### Output:
```
116:101:115:116:64:116:101:115:116:46:99:111:109
test@test.com
```
## Hex
```java
StringJoiner sj2 = new StringJoiner(":");
txt1.chars()
        .mapToObj(c -> Integer.toHexString((int) c))
        .collect(Collectors.toList())
        .forEach(intStr -> sj2.add(intStr));

String test2 = sj2.toString();

StringBuilder sb2 = new StringBuilder();
Arrays.asList(test2.split(":"))
        .stream()
        .forEach(i -> {
            //int charInt = (int)Long.parseLong(i, 16);
            int charInt = Integer.parseInt(i, 16);
            char a = (char)charInt;
            sb2.append(Character.toString(a));
        });
System.out.println(sb2.toString());
```
### Output:
```
74:65:73:74:40:74:65:73:74:2e:63:6f:6d
test@test.com
```