# Instantiating via a reflected constructor

- also see [java_beans](java_beans.md)

```java
Class<Test3> clazz = Test3.class;

Constructor<Test3> init = clazz.getConstructor();
Test3 test3 = init.newInstance();
test3.setId("id3");
System.out.println(test3);
```

```java
Constructor<Test3> init2 = clazz.getConstructor(String.class,String.class);
Test3 test3_3 = init2.newInstance("test3","id3");
System.out.println(test3_3);
```

## Use static method

```java
public static <T> T initTest3(Class<T> t) throws 
        NoSuchMethodException, InvocationTargetException, 
        InstantiationException, IllegalAccessException {
    Class<T> clazz = t;
    Constructor<T> con = clazz.getConstructor();
    T init = con.newInstance();
    return init;
}
```
```java
    Test3 test3_4 = initTest3(Test3.class);
    test3_4.setName("test3");
    System.out.println("static method:"+test3_4);
```


## Error:

```java
Test3 test3_2 = init.newInstance("test3","id3");
System.out.println(test3_2);
```

#### output:
```
Exception in thread "main" java.lang.IllegalArgumentException: wrong number of arguments
at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62)
at java.base/jdk.internal.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:490)
```


## Test3

```java
package com.fbtest.pr20210725.tests.pr20210813.fbModelTest.testObjectClone;

public class Test3 {
    private String name;
    private String id;

    public Test3() {
    }

    public Test3(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Test3{" +
                "name='" + name + '\'' +
                ", id='" + id + '\'' +
                '}';
    }
}
```