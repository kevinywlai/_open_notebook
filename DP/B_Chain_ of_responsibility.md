## Benefit:
### Before:

```java
method1(){
    // do something 1
    // do something 2
    // do something 3
}

method2(){
    // do something 2
    // do something 4
    // do something 3
}

method3(){
    // do something 4
    // do something 3
    // do something 2
}
```

### After
```java
class Things{
    // do something 1
    // do something 2
    // do something 3
    // do something 4
}

class Handler{
    ...
}

class Client{
    // method1()
    do_something_1.next = do_something_2
    do_something_2.next = do_something_3
    do_something_1.method

    // method2()
    do_something_2.next = do_something_4
    do_something_4.next = do_something_3
    do_something_2.method

    ....
}
```
---
## Subclass Way

```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811.subclass_test;


import java.util.Objects;

public class Handler {
    Handler next;

    private Test test;

    public Handler(){
    }

    public Handler(Test test){
        this.test = test;
    }

    public Test doSomething() {
        this.test.print();

        // For the last object
        if(Objects.isNull(this.next)){
            System.out.println("Finished");
            return null;
        }
        return this.next.doSomething();
    }

    public class Test {
        public void print() {
            System.out.println("Test");
        }
    }

    public class Test1 extends Test{
        public void print() {
            System.out.println("Test1");
        }
    }

    public class Test2 extends Test{
        public void print() {
            System.out.println("Test2");
        }
    }

    public class Test3 extends Test{
        public void print() {
            System.out.println("Test3");
        }
    }
}

```

### Client
```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811.subclass_test;

public class Clients {
    public static void main(String[] args) {
        Handler handler = new Handler();
        Handler testHanlder = new Handler(handler.new Test());
        Handler test1Hanlder = new Handler(handler.new Test1());
        Handler test2Hanlder = new Handler(handler.new Test2());
        Handler test3Hanlder = new Handler(handler.new Test3());
        // try Builder()

        testHanlder.next = test1Hanlder;
        test1Hanlder.next = test2Hanlder;
        test2Hanlder.next = test3Hanlder;
        testHanlder.doSomething();
    }
}

```

---
## Test1

```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811;

import java.util.Objects;

public class Handler{
    public Handler next;
    private Test test;
    public Handler(){
    }
    public Handler(Test test){
        this.test = test;
    }

    public Test doSomething() {
        this.test.print();

        // For the last object
        if(Objects.isNull(this.next)){
            System.out.println("Finished");
            return null;
        }
        return this.next.doSomething();
    }
}
```

```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811;

public class Test {
    public void print(){
        System.out.println("Test");
    }
}
```
```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811;

public class Test1 extends Test{
    public void print(){
        System.out.println("Test1");
    }
}
```
```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811;

public class Test2 extends Test{
    public void print(){
        System.out.println("Test2");
    }
}
```

```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811;

public class Test3 extends Test{
    public void print(){
        System.out.println("Test3");
    }
}
```

```java
package com.fbtest.pr20210802.tests.dps.chain.pr20210811;

public class Clients {
    public static void main(String[] args) {
        Handler test1Handler = new Handler(new Test1());
        Handler test2Handler = new Handler(new Test2());
        Handler test3Handler = new Handler(new Test3());

        test1Handler.next = test2Handler;
        test2Handler.next = test3Handler;
        test1Handler.doSomething();

    }
}
```

---

## Modern Java:

```java
package com.fbtest.pr20210725.tests.pr20210824.ch09;

public class ChainTest {

    public static void main(String[] args) {
        ProcessingObj<String> testA = new TestAProcessing();
        ProcessingObj<String> testB = new TestBProcessing();
        testA.next = testB;
        // or p1.setSuccessor(p2);

        String result1 = testA.handle("Aren't labdas really sexy?!!");
        System.out.println(result1);
    }


    private static abstract class ProcessingObj<T>{
        protected ProcessingObj<T> next;

        // or
        //protected ProcessingObj<T> successor;
        //public void setSuccessor(ProcessingObj<T> successor) {
        //    this.successor = successor;
        //}


        public T handle(T input) {
            T r = handleWork(input);
            if (next != null) {
                return next.handle(r);
            }
            return r;
        }

        abstract protected T handleWork(T input);
    }

    private static class TestAProcessing extends ProcessingObj<String> {
        @Override
        public String handleWork(String text) {
            return "Test A: " + text;
        }
    }
    private static class TestBProcessing extends ProcessingObj<String> {
        @Override
        public String handleWork(String text) {
            return "Test B: " + text;
        }
    }
}

```

# Reference:
[Chapter 9. Refactoring, testing, and debugging, Modern Java in Action](https://www.manning.com/books/modern-java-in-action)