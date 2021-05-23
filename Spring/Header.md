## Example1:

```java
package com.fbtest.pr20210424_Design_Patterns.controllers;

    @GetMapping("/get1")
	public String get1(HttpServletResponse response) {
		/**
		 * set Response Header
		 * testHeader: a_test_header
		 */
		response.setHeader("testHeader", "a_test_header"); 
		return "main10get1";
    }
```

```java
    @GetMapping("/get2")
	public String get2(@RequestHeader ("testHeader") String testHeader) {
		/**
		 * testHeader is not RequestHeader
		 */
		//System.out.println(testHeader);
		return "main10get2";
	}
```
### Result:
```
2021-05-23 17:54:47.245  WARN 1472 --- [nio-8086-exec-1] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MissingRequestHeaderException: Required request header 'testHeader' for method parameter type String is not present]
```