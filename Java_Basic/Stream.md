

# Reference

- [Stream, oracle](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)


# Create Double ( 0.5 ~ 0.75, 4 decimal places ) List

```java
List<Double> doubles = DoubleStream
                // from 0.5
                .iterate( 0.5, i -> 
                        new BigDecimal(i + 0.0001 )
                        // 4 decimal places
                        .setScale(4, RoundingMode.HALF_UP) 
                        .doubleValue())
                // 2501 doubles between 0.5 and 0.75
                .limit( Double.valueOf((0.75 - 0.5)/0.0001).longValue() + 1 ) 
                .boxed().collect(Collectors.toList());

```

```
doubles2.contains(0.8) => false
doubles2.contains(0.7) => true
```

