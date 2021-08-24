
## Lambda_practice

```java
public class Main3 {

	public static void main(String[] args) {
		Function7<Integer,Integer> triple6_2_1 = (arg) -> arg * 3;
		Integer a = triple6_2_1.apply(2);
		System.out.println(a);
	}
}

interface Function7<T,U> {
	U apply(T t);
}
```

## Predicate\<T\> java.util.function
```java
Predicate<Integer> pre = (param) -> param == 1;
boolean aTest = pre.test(2);
System.out.println(aTest);
```

# Reference:
- [Oracle Package java.util.function](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html)
- [Oracle Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html)