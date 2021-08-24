# java.util.function

||||
|---|---|---|
|```Consumer<T>```|```void accept(T t)```|[oracle.com](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html)|
|```Function<T,R>```|```R apply(T t)```|[oracle.com](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html)|
|```Predicate<T>```|```boolean test(T t)```|[oracle.com](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html)|
|```Supplier<T>```|```T get()```|[oracle.com](https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html)|
||||

## example

```java
Predicate<Integer> p = x -> x > 10;

System.out.println(p.test(11)); // 11 > 10 true
```

### Note:
```java
Predicate<Integer>
```
> equivalent to:
```java
Integer x;
```


# Reference:

- [Java 8 Function Examples, mkyong](https://mkyong.com/java8/java-8-function-examples/)
- [Java 8 Predicate Examples, mkyong](https://mkyong.com/java8/java-8-predicate-examples/)


