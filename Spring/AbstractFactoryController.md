```java
package com.fbtest.pr20210424_Design_Patterns.controllers;

import java.security.SecureRandom;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

/**
 * http://localhost:8080/main7/get1?t=1
 * 
 * http://localhost:8080/main7/get2
 * 
 * http://localhost:8080/main7/get3
 * @author kevin
 *
 */
@SessionAttributes("main7Factroy")
@Controller
public class Main7Controller {
	@RequestMapping(value = "/main7/get1", method = RequestMethod.GET)
	public String get1(@RequestParam ("t") String t			
			,Model model) {
		Main7Factroy main = null;
		
		if("1".equals(t)) {
			main = new Main7_A_Factroy();
		}else {
			main = new Main7_B_Factroy();
		}
		model.addAttribute("main7Factroy", main);
		return main.get1(model);
	}
	
	@RequestMapping(value = "/main7/get2", method = RequestMethod.GET)
	public String get2(@ModelAttribute ("main7Factroy") Main7Factroy main7Factroy) {
		boolean a = main7Factroy instanceof Main7_A_Factroy;
		System.out.println(a);
		return main7Factroy.get2();
	}
	
	@RequestMapping(value = "/main7/get3", method = RequestMethod.GET)
	public String get3(@ModelAttribute ("main7Factroy") Main7Factroy main7Factroy) {
		boolean a = main7Factroy instanceof Main7_A_Factroy;
		System.out.println(a);
		return main7Factroy.get3();
	}
}


abstract class Main7Factroy{
//class Main7Factroy{
	int random = 0;
	
	String get1(Model model) {
		SecureRandom sr = new SecureRandom();
	    sr.setSeed(System.currentTimeMillis());
	    this.random = sr.nextInt(100);
	    
	    System.out.println("get1:"+this.random);
		return "main7get1";
	}
	abstract String get2();
	abstract String get3();
	
//	String get2() { return "";};
//	String get3() { return "";};
}

class Main7_A_Factroy extends Main7Factroy{

	@Override
	String get2() {
		System.out.println("get2:"+this.random);
		System.out.println("Main7_A_Factroy");
		return "main7get2";
	}

	@Override
	String get3() {
		System.out.println("get3:"+this.random);
		System.out.println("Main7_A_Factroy");
		return "main7get3";
	}
	
}

class Main7_B_Factroy extends Main7Factroy{

	@Override
	String get2() {
		System.out.println("get2:"+this.random);
		System.out.println("Main7_B_Factroy");
		return "main7get2";
	}

	@Override
	String get3() {
		System.out.println("get3:"+this.random);
		System.out.println("Main7_B_Factroy");
		return "main7get3";
	}
	
}
```


## Output
```
get1:26
get1:29
false
get2:29
Main7_B_Factroy
true
get2:26
Main7_A_Factroy
```