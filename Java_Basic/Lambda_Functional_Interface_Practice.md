
## (1) implement class
```java
interface Function1 {
	int apply(int arg);
}

class Function1Impl implements Function1{
	@Override
	public int apply(int arg) {
		return arg * 3;
	}
}

public class Main1 {
	public static void main(String[] args) {
        Function1 triple1 = new Function1Impl();
		System.out.println(triple1.apply(2));
    }
}
```

## (2) new interface

```java
interface Function2 {
	int apply(int arg);
}

public class Main1 {
	public static void main(String[] args) {
        Function2 triple2 = new Function2() {
			@Override
			public int apply(int arg) {
				return arg * 3;
			}
		};
		System.out.println(triple2.apply(2));
    }
}
```

## (3) lambda
```java
interface Function3 {
	int apply(int arg);
}

public class Main1 {
	public static void main(String[] args) {
        Function3 triple3 = (arg) -> { return arg * 3; };
        // or
		Function3 triple3_2 = arg -> arg * 3;

        System.out.println(triple3.apply(2));
		System.out.println(triple3_2.apply(2));
    }
}
```

```java
interface Function4 {
	int apply(int arg);
}

class Test{
    // (1)
	Function4 triple4 = (arg) -> { return arg * 3; };
	// (2)
	static Function4 triple4_2 = (arg) -> { return arg * 3; };
}

public class Main1 {
	public static void main(String[] args) {
        // (1)
        Test test = new Test();
		System.out.println(test.triple4.apply(2));
		// (2)
		System.out.println(Test.triple4_2.apply(2));
    }
}
```

```java
interface Function5 {
	int apply(int arg);
	Function5 triple5 = (arg) -> arg * 3;
	static Function5 triple5_2 = (arg) -> arg * 3;
}

public class Main1 {
	public static void main(String[] args) {
		System.out.println("triple5:" + Function5.triple5.apply(2));
		System.out.println("triple5_2:" + Function5.triple5_2.apply(2));
    }
}
```

### output
```
triple5:6
triple5_2:6
```

## Use Lambda Variable as Param

```java
interface Function6<T> {
	T apply(T t);
}
public class Main1 {
	public static void main(String[] args) {

        Function6<Integer> triple6 = (arg) -> arg * 3;
		Function6< Function6<Integer> > triple6_2 = arg2 -> arg -> arg * 3 ;
		
        // (1)
		Function6<Integer> a = triple6_2.apply(triple6);
		System.out.println(a.apply(2));
		
        // or (2)
		Integer a_2 = triple6_2.apply(triple6).apply(2);
		System.out.println(a_2);
    }
}
```

### output
```
6
6
```

## Chain

```java
interface Function6<T> {
	T apply(T t);
}
public class Main1 {
	public static void main(String[] args) {

        Function6< Function6<Integer> > triple6_3 = arg2 -> arg -> arg2.apply(arg * 3) ;

        Function6<Integer> triple6 = (arg) -> arg * 3;
		Integer a_3 = triple6_3.apply(triple6).apply(2);
		System.out.println("a_3:"+a_3);
		
		Function6<Integer> triple6_1_1 = (arg) -> arg * 5;
		Integer a_4 = triple6_3.apply(triple6_1_1).apply(2);
		System.out.println("a_4:"+a_4);
    }
}
```

### output
```
a_3:18
a_4:30
```

```java
//==== prefer use this
interface Function7<T,U> {
	U apply(T t);
}
public class Main1 {
	public static void main(String[] args) {
		Function7<Integer,Integer> triple6_2_1 = (arg) -> arg * 3;
		System.out.println(triple6_2_1.apply(2));

        // =====

		Function7<Integer,Integer> triple7_1 = (arg) -> arg * 3;
		Function7<Integer,Integer> triple7_3 = (arg) -> arg * 5;

		Function7<Function7<Integer,Integer>,
			Function7<Function7<Integer,Integer>,
				Function7<Integer,Integer>>> triple7 = arg3 -> arg2 -> arg -> arg3.apply(arg2.apply(arg)) ;
        // (1)        
		Function7<Integer, Integer> f = triple7.apply(triple7_3).apply(triple7_1);
		System.out.println(f.apply(2));
		// or (2)
        System.out.println(triple7.apply(triple7_3).apply(triple7_1).apply(2));
    }
}
```