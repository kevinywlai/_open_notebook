
## HttpSessionRequiredException

### Requisition:
- @SessionAttributes
- @ModelAttribute("main5Model")

```java
package com.fbtest.pr20210424_Design_Patterns.controllers;

@SessionAttributes("main5Model") // <==
@Controller
public class Main5Controller {

	@GetMapping("/main5/get1")
	public String get1() {
		return "mainget1";
	}
	
	@GetMapping("/main5/get2")
	public String get2(
            @ModelAttribute("main5Model")Main5Model main5Model) {
		System.out.println(main5Model== null);
		return "mainget2";
	}
	
	@PostMapping("/main5/post2")
	public String post2(
            @ModelAttribute("main5Model")Main5Model main5Model) { // <==
		System.out.println(main5Model.getName());
		return "mainget2";
	}
	
	@ExceptionHandler(HttpSessionRequiredException.class)
	public String handleException(HttpSessionRequiredException e, HttpServletRequest request) {
	    // Handle it
	    return "error";
	}
}
```

```java
class Main5Model{
	String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}	
}
```

## Test:
> http://localhost:8080/main5/get2

### Result:

```
2021-05-02 17:46:50.951 ERROR 37112 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Expected session attribute 'main5Model'] with root cause

org.springframework.web.HttpSessionRequiredException: Expected session attribute 'main5Model'
```

- return error.html
```
Error
```