### Nested List
```java
List<String> subA = Arrays.asList(new String[]{"21"});
List<String> subB = Arrays.asList(new String[]{"21","31"});
List<String> subC = Arrays.asList(new String[]{"21","31","30G2"});

List<List<String>> d = new ArrayList<>();
d.add(subA);
d.add(subB);
d.add(subC);
```

### Condition List
```java
List<String> con = Array.asList(new String[]{"21","51"});

List<List<String>> e = 
    d.stream().filter(
        i -> i.stream().noneMatch(
            j -> con.stream().allMatch(k -> !k.equals(j))
        )

    ).collect(Collectors.toList());
```

```java
con.stream().allMatch(k -> !k.equals(j)) 
```
equals to 
```java
!"21".equals() && !"31".equals() && !"32".equals()
```

### Set subA ~ subB to a Set
```java
Set<String> f = d.stream().flatMap(i -> i.stream()).collect(Collecters.toSet());
```