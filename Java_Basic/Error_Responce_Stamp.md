<mark>PROD</mark>

```java
package com.fbtest.pr20210725.utils;

import java.util.Objects;

public class ErrorRespStamp {
    // field
    private Class<?> clazz;

    public ErrorRespStamp(Class<?> clazz) {
        this.clazz = clazz;
    }

    public String getErrorCode(){
        String hashcodeHex = Integer.toHexString(Objects.hashCode(this.clazz.getSimpleName()));
        int num = 0;
        try{
            // in a method index = 2
            num = Thread.currentThread().getStackTrace()[2].getLineNumber();
        }catch (ArrayIndexOutOfBoundsException e){
            // logger.error 
        }
        return hashcodeHex+"#"+num;
    }

    public static int getLine(){
        int num = Thread.currentThread().getStackTrace()[2].getLineNumber();
        return num;
    }
}

```


```java
package com.fbtest.pr20210725.controllers;

import com.fbtest.pr20210725.utils.ErrorRespStamp;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Main1Controller {
    // instance
    private static final ErrorRespStamp errorRespStamp = new ErrorRespStamp(Main1Controller.class);

    @GetMapping("/main1")
    public String getMain1(){

        System.out.println(errorRespStamp.getErrorCode());
        return "/main1/main1";
    }
}
```


## Create Java file list

```cmd
pr20210602\src\main\java>dir /s /b /o:gn .java
```

- save as txt

## Get Hex Hashcode Table

```java
package com.fbtest.pr20210725.utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

public class JavaList {
    public static void main(String[] args) {
        Path path = Paths.get("javaList.txt");

        try (BufferedReader bufferedReader = new BufferedReader(
                new FileReader(path.toFile(), StandardCharsets.UTF_8))) {

            String line;
            // keep buffering and print
            while ((line = bufferedReader.readLine()) != null) {
                String[] lineArr = line.split("\\\\");
                int index = lineArr.length - 1;
                String JavaFileName = lineArr[index].replace(".java","");
                String JavaFileNameHex = Integer.toHexString(Objects.hashCode(JavaFileName));
                System.out.println(JavaFileName+"\t"+JavaFileNameHex);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```