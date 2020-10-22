## @Controller
```java
package com.piTest.piTest.controllers;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
	
	@ResponseBody
	@GetMapping("/main/get")
	public byte[] getMain(@RequestParam ("p1") String p1) 
            throws UnsupportedEncodingException {
		String respJSON = "{\"p1\":\""+p1+"\",\"time\":\""+LocalDateTime.now().toString()+"\"}";
		return respJSON.getBytes("UTF-8");
	}
	
	@ResponseBody
	@PostMapping("/main/post")
	public byte[] postMain(@RequestParam ("p1") String p1) 
            throws UnsupportedEncodingException {
		String respJSON = "{\"p1\":\""+p1+"\",\"time\":\""+LocalDateTime.now().toString()+"\"}";
		return respJSON.getBytes("UTF-8");
	}
}
```

## @RestController

```java
package com.piTest.piTest.controllers;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainRestController {
	
	@GetMapping("/rest/get")
	public Map<String, String> getMain(
        @RequestParam ("p1") String p1) 
            throws UnsupportedEncodingException {
		Map<String, String> map = new HashMap<>();
		map.put("p1", p1);
		map.put("time", LocalDateTime.now().toString());
	
		return map;
	}
	
	@PostMapping("/rest/post")
	public Map<String, String> postMain(
            @RequestParam ("p1") String p1) 
            throws UnsupportedEncodingException {
		Map<String, String> map = new HashMap<>();
		map.put("p1", p1);
		map.put("time", LocalDateTime.now().toString());
	
		return map;
	}
}
```

## Client
```java
package com.piTest.piTest.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class Main {
	public static void main(String[] args) {
		
		String url = "http://localhost:8080/rest/post";
		
		RestTemplate restTemplate = new RestTemplate();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		//headers.setContentType(MediaType.APPLICATION_JSON);
		
		MultiValueMap<String,String> map = new LinkedMultiValueMap<>();
		map.add("p1", "Test");
		
		HttpEntity<MultiValueMap<String,String>> request = 
				new HttpEntity<MultiValueMap<String,String>>(map,headers);
		
		ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
		//response.getHeaders().getLocation();
		System.out.println(response.getBody());
	}
}
```