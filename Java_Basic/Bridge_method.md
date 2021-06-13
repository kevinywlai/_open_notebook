```java

    public String test(String a, String b){
        ...
    }

    // bridge method?
    public String test(String c){
        ...
        return test(c,"");
    }

```

# Reference:
- [Java Generics - Bridge method?, stackoverflow](https://stackoverflow.com/questions/5007357/java-generics-bridge-method)