
```java
package com.fbtest.test_spring_boot.pr20210326;

public class Main {
	public static void main(String [] args) {
		Test<Integer> a = (d)-> { return d;};
		
		System.out.println( "a = " + a.testMethod(2) );
	}
}

@FunctionalInterface
interface Test<T> {
    T testMethod(int d);
}
```

## 2-1
```java
public class Main2 {
	
	public static void main(String[] args) {
		Test2<Integer> a = ()-> 1;
		
		System.out.println( "a = " + a.testMethod() );

	}

}

@FunctionalInterface
interface Test2<T> {
    T testMethod();
}
```

## 2-2

```java
public class Main3 {

	public static void main(String[] args) {
		Test3<Integer> a = new Test3<>();
		System.out.println( "a = " + a.testMethod() );
	}

}

class Test3<T>{
	public Integer testMethod() {
		return 1;
	}
}

```



```java
public class Main2 {
	
	public static void main(String[] args) {
		Test2<Integer> a = ()-> 1;
		Test2<Integer> b = a;
		a = ()-> b.testMethod() + b.testMethod();
		System.out.println( "a = " + a.testMethod() );

	}

}

@FunctionalInterface
interface Test2<T> {
    T testMethod();
}

```

# Referenece

[Lazy_evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation)