# Cloning Object

```java
public class TestClient2<T,U> {
    
    public void cloneObj(T t,U u, Class<?> fromClazz, Class<?> toClazz) throws 
                IntrospectionException, 
                InvocationTargetException, 
                IllegalAccessException {
        for (PropertyDescriptor pd: Introspector.getBeanInfo(fromClazz).getPropertyDescriptors()) {
            if (pd.getReadMethod() != null
                    && pd.getWriteMethod() != null
                    && !"class".equals(pd.getName())) {
                new PropertyDescriptor(pd.getName(), toClazz).getWriteMethod().invoke(u,pd.getReadMethod().invoke(t));
            }
        }
    }
```


## static
```java
    public static <T,U> void cloneObj2(T t,U u) throws 
            IntrospectionException, 
            InvocationTargetException, 
            IllegalAccessException {
        for (PropertyDescriptor pd: Introspector.getBeanInfo(t.getClass()).getPropertyDescriptors()) {
            if (pd.getReadMethod() != null
                    && pd.getWriteMethod() != null
                    && !"class".equals(pd.getName())) {
                new PropertyDescriptor(pd.getName(), u.getClass()).getWriteMethod().invoke(u,pd.getReadMethod().invoke(t));
            }
        }
    }
}
```

## main
```java
    public static void main(String[] args) throws 
            IntrospectionException, InvocationTargetException, IllegalAccessException {
        Test2 test2 = new Test2("","");

        TestClient2<Test1,Test2> t = new TestClient2();
        t.cloneObj(new Test1("name1","id1"), test2,Test1.class,Test2.class);
        System.out.println(test2);

        Test2 test4 = new Test2("","");
        cloneObj2(new Test1("name2","id2"),test4);
        System.out.println(test4);
    }
```

### note
```java
Class anyType = String.class;
Class <?> theUnknownType = String.class;
```

<br><br>


```&& !"class".equals(pd.getName())) {```
> ```getName()``` prints class

```java
System.out.println(pd.getDisplayName());
```

#### output
```
class
id
name
```
<br><br>

```java
System.out.println(pd.getReadMethod());
                
```

#### output

```
public java.lang.String com.fbtest.pr20210725.tests.pr20210813.fbModelTest.testObjectClone.Test1.getId()
public java.lang.String com.fbtest.pr20210725.tests.pr20210813.fbModelTest.testObjectClone.Test1.getName()
```