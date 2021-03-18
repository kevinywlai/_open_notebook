```java
package com.fbtest.test_spring_boot.pr20210319;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			int a = 10/0;
		}catch(Exception e) {
//			e.printStackTrace();
			System.out.println(e.getStackTrace().length);
			System.out.println(e.getClass().getSimpleName());
			System.out.println(e.getMessage());
			for(StackTraceElement s: e.getStackTrace()) {
				System.out.println(s.getClassName());
				System.out.println(s.getMethodName());
				System.out.println(s.getLineNumber());
			}
		}

	}

}

```

### Output
```
1
ArithmeticException
/ by zero
com.fbtest.test_spring_boot.pr20210319.Test
main
8
```
