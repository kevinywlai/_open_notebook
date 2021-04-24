

## Controller

```java
package com.fbtest.pr20210424_Design_Patterns.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory;
import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory1;
import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory2;
import com.fbtest.pr20210424_Design_Patterns.utils.Test2Util;

@Controller
public class MainController {

	@Autowired
	private ApplicationContext context;
	
	@GetMapping("/main/get1")
	public String getTest1() {
		Test2Util test2Util = (Test2Util)context.getBean("test2Util");
		String a = test2Util.getTestTest2Util();
		System.out.println(a);
		return "get1";
	}
	
	@GetMapping("/main/factory1_1")
	public String getFactory1() {
		
		Factory factory = (Factory1)context.getBean("factory1");
		String a = factory.getFactory_1();
		System.out.println(a);
		return "get1";
	}
	
	@GetMapping("/main/factory2_1")
	public String getFactory2() {
		
		Factory factory = (Factory2)context.getBean("factory2");
		String a = factory.getFactory_1();
		System.out.println(a);
		return "get1";
	}	
}
```

## Component

```java
package com.fbtest.pr20210424_Design_Patterns.utils;

import org.springframework.stereotype.Component;

@Component
public class TestUtils {

	public String getTest() {
		return "test...";
	}
}
```

## interface Factory

```java
package com.fbtest.pr20210424_Design_Patterns.services.factories;

public interface Factory {
	public String getFactory_1();
}
```

## Factory1

```java
package com.fbtest.pr20210424_Design_Patterns.services.factories;

import org.springframework.beans.factory.annotation.Autowired;

import com.fbtest.pr20210424_Design_Patterns.utils.TestUtils;

//@Component
public class Factory1 implements Factory{

	int count = 0;
	
	@Autowired
	TestUtils testUtils;
	
	@Override
	public String getFactory_1() {
		count ++;
		return testUtils.getTest()+" + Factory1_1:" + count;
	}	
}
```

## Factory2

```java
package com.fbtest.pr20210424_Design_Patterns.services.factories;

import org.springframework.beans.factory.annotation.Autowired;

import com.fbtest.pr20210424_Design_Patterns.utils.TestUtils;

//@Component
public class Factory2 implements Factory{
	
	int count = 0;
	
	@Autowired
	TestUtils testUtils;
	
	@Override
	public String getFactory_1() {
		count ++;
		return testUtils.getTest()+" + Factory2_1:" + count;
	}
}
```

## Configuration - singleton

```java
package com.fbtest.pr20210424_Design_Patterns.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory1;
import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory2;
import com.fbtest.pr20210424_Design_Patterns.utils.Test2Util;

@Configuration
@ComponentScan(basePackages = "com.fbtest.pr20210424_Design_Patterns")
public class AppConfig {
	@Bean
	@Scope("prototype")
    public Test2Util test2Util() {
        return new Test2Util();
    }
	
	@Bean
    public Factory1 factory1() {
        return new Factory1();
    }
	
	@Bean
    public Factory2 factory2() {
        return new Factory2();
    }
}
```

### output

```
// http://localhost:8080/main/factory1_1
test... + Factory1_1:1
test... + Factory1_1:2
test... + Factory1_1:3

// http://localhost:8080/main/factory1_2
test... + Factory2_1:1
test... + Factory2_1:2
test... + Factory2_1:3

// http://localhost:8080/main/factory1_1
test... + Factory1_1:4
```



## Configuration - prototype
```java
package com.fbtest.pr20210424_Design_Patterns.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory1;
import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory2;
import com.fbtest.pr20210424_Design_Patterns.utils.Test2Util;

@Configuration
@ComponentScan(basePackages = "com.fbtest.pr20210424_Design_Patterns")
public class AppConfig {
	@Bean
	@Scope("prototype")
    public Test2Util test2Util() {
        return new Test2Util();
    }
	
	@Bean
    @Scope("prototype")
    public Factory1 factory1() {
        return new Factory1();
    }
	
	@Bean
    @Scope("prototype")
    public Factory2 factory2() {
        return new Factory2();
    }
}
```
### output
```
// http://localhost:8080/main/factory1_1
test... + Factory1_1:1
test... + Factory1_1:1
test... + Factory1_1:1

// http://localhost:8080/main/factory2_1
test... + Factory2_1:1
test... + Factory2_1:1
test... + Factory2_1:1
 
// http://localhost:8080/main/factory1_1
test... + Factory1_1:1
```

<hr>
<br>

## Main2Controller

```java
package com.fbtest.pr20210424_Design_Patterns.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory;
import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory1;
import com.fbtest.pr20210424_Design_Patterns.services.factories.Factory2;
import com.fbtest.pr20210424_Design_Patterns.utils.Test2Util;

@Controller
public class Main2Controller {
	
	@Autowired
	Test2Util testTest2Util;
	
	@Autowired
	private ApplicationContext context;
	
	Factory factory = null;
	
	@GetMapping("/main2/factory1_1")
	public String getFactory1() {
		
		factory = (Factory1)context.getBean("factory1");
		String a = factory.getFactory_1();
		System.out.println(a);
		return "get1";
	}
	
	@GetMapping("/main2/factory2_1")
	public String getFactory2() {
		
		factory = (Factory2)context.getBean("factory2");
		String a = factory.getFactory_1();
		System.out.println(a);
		return "get1";
	}
	
	@GetMapping("/main2/step2")
	public String getStep2() {
		String a = factory.getFactory_2();
		System.out.println(a);
		System.out.println(factory instanceof Factory1);
		System.out.println(factory instanceof Factory2);
		return "get1";
	}
}
```

## Factory
```java
package com.fbtest.pr20210424_Design_Patterns.services.factories;

public interface Factory {
	public String getFactory_1();
	
	public String getFactory_2();
}
```

## Factory1

```java
package com.fbtest.pr20210424_Design_Patterns.services.factories;

import org.springframework.beans.factory.annotation.Autowired;

import com.fbtest.pr20210424_Design_Patterns.utils.TestUtils;

public class Factory1 implements Factory{

	int count = 0;
	
	@Autowired
	TestUtils testUtils;
	
	@Override
	public String getFactory_1() {
		count ++;
		return testUtils.getTest()+" + Factory1_1:" + count;
	}
	
	@Override
	public String getFactory_2() {
		count ++;
		return testUtils.getTest()+" + Factory1_2:" + count;
	}	
}
```

## Factory2

```java
package com.fbtest.pr20210424_Design_Patterns.services.factories;

import org.springframework.beans.factory.annotation.Autowired;

import com.fbtest.pr20210424_Design_Patterns.utils.TestUtils;

public class Factory2 implements Factory{
	
	int count = 0;
	
	@Autowired
	TestUtils testUtils;
	
	@Override
	public String getFactory_1() {
		count ++;
		return testUtils.getTest()+" + Factory2_1:" + count;
	}
	
	@Override
	public String getFactory_2() {
		count ++;
		return testUtils.getTest()+" + Factory2_2:" + count;
	}
}
```


```
// http://localhost:8080/main2/factory1_1
test... + Factory1_1:1

// http://localhost:8080/main2/step2
test... + Factory1_2:2
true
false

// http://localhost:8080/main2/factory2_1
test... + Factory2_1:1

// http://localhost:8080/main2/step2
test... + Factory2_2:2
false
true
```