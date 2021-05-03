## ModelAttribute Example:

```java
@ModelAttribute
public void addAttributes(Model model) {
    model.addAttribute("msg", "Welcome 1!");
}

@ModelAttribute("msg2")
public String addAttributes() {
    return "Welcome 2!";
}
```

```html
<p th:text="${msg}"></p>
<p th:text="${msg2}"></p>
```

#### Html Output:
```
Welcome 1!

Welcome 2!
```


#### Example:

##### Main3Controller

```java
@Controller
@SessionAttributes("msg2")
public class Main3Controller {
    @ModelAttribute("msg2")
    public String addAttributes() {
        return "Welcome 2!";
    }
	
	@GetMapping("/main3/get1")
	public String getFactory1(HttpServletRequest request) {
		request.getSession().setAttribute("test", "test value");
		...
		return "get1";
	}
}
```

## SessionAttributes Example:

##### Main4Controller

```java
@Controller
@SessionAttributes("msg2")
public class Main4Controller {
	@GetMapping("/main4/get1")
	public String getFactory1(
			@ModelAttribute("msg2") String msg2 
			,HttpServletRequest request) {
		
		System.out.println(msg2);
		
		String a = (String)request.getSession().getAttribute("test");
		System.out.println(a);
		return "get1";
	}
}
```

> /main3/get1 -> /main4/get1

#### Console Output:

```
Welcome 2!
test value
```