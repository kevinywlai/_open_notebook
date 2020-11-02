## File
```java
File pic = new File("c:\\pic.jpg");
Image image = ImageIO.read(pic);
```

## URL
```java
URL url = new URL("http://localhost:8080/pic.jpg");
Image image = ImageIO.read(url);
```

## to api
```java
	public static void main(String[] args) throws IOException {
		// File
		byte[] fileContent = FileUtils.readFileToByteArray(new File("c:\\pic.jpg"));
		String encodedString1 = Base64.getEncoder().encodeToString(fileContent);
		// URL
		byte[] imageBytes = IOUtils.toByteArray(new URL("http://localhost:8080/pic.jpg"));
		String encodedString2 = Base64.getEncoder().encodeToString(imageBytes);
		
		// Header
		Map<String, String> header = new HashMap<>();
		header.put("FuntionCode", "F******1");
		header.put("FromSys", "B******E");
		header.put("ToSys", "B******I");
		
		// Body
		Map<String, String> imgMap1 = new HashMap<>();
		imgMap1.put("File", encodedString1);
		//imgMap1.put("File", "aaa");
		imgMap1.put("FileName", "pic01");
		imgMap1.put("FileType", "png");
		
		Map<String, String> imgMap2 = new HashMap<>();
		imgMap2.put("File", encodedString2);
		//imgMap1.put("File", "bbb");
		imgMap2.put("FileName", "pic02");
		imgMap2.put("FileType", "png");
		
		List<Map<String, String>> bodyList = new ArrayList<>();
		bodyList.add(imgMap1);
		bodyList.add(imgMap2);
		
		Map<String,Object> req = new HashMap<>();
		req.put("Header", header);
		req.put("F******1RQ", bodyList);
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		System.out.println(gson.toJson(req));
	};
```


### import
```java
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
```