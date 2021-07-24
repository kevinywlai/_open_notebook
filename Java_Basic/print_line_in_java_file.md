
```java
public class PrintLineNumTest {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getStackTrace()[1].getLineNumber());
        System.out.println(Thread.currentThread().getStackTrace()[1].getLineNumber());
        System.out.println(new Gson().toJson(Thread.currentThread().getStackTrace()));
    }
}

```

## output
```json
7
8
[
    {
        "moduleName":"java.base",
        "moduleVersion":"11.0.8",
        "declaringClass":"java.lang.Thread",
        "methodName":"getStackTrace",
        "fileName":"Thread.java",
        "lineNumber":1606,
        "format":2
    },
    {
        "classLoaderName":"app"
        ,"declaringClass":"com.fbtest.pr20210723.PrintLineNumTest",
        "methodName":"main",
        "fileName":"PrintLineNumTest.java",
        "lineNumber":9,
        "format":1
    }
]
```

# Reference
[How can we print line numbers to the log in java, stackoverflow](https://stackoverflow.com/questions/115008/how-can-we-print-line-numbers-to-the-log-in-java)


