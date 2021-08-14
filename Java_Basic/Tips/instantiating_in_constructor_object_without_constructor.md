# instantiating in a constructor, the object without a constructor

for example:
- object in a jar

Solution:

```java
class A extends ObjInJar{
    public A(String field1, String field2){
        this.field1 = field1;
        this.field2 = field2;
    }
}

```

```java
class Client{
    ...
        A a = new A("field1","field2");
}
```