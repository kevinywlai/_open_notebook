# Exception: declare multiple json fields named

- Gson

- solution: transient

```java
public class ParentClass{
    private String partnerId;
    ...
}
public class ChildClass extends ParentClass{
    private transient String partnerId;
    ...
}
```

# Reference:
- [class A declares multiple JSON fields, stackoverflow](https://stackoverflow.com/questions/16476513/class-a-declares-multiple-json-fields)

<hr>

# factory pattern vs strategy pattern

- objects that change their behavior at runtime

# Reference
- [strategy-vs-factory-design-pattern, stackexchange](https://softwareengineering.stackexchange.com/questions/405688/strategy-vs-factory-design-pattern)