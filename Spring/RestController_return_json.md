```java
@RestController
public class MainRestController{

    @PostMapping("rest/client")
    public Map<String,String> postMain(){

        Map<String,String> clientMap = new HashMap<>();
        clientMap.put("name","test");

        return clientMap;
    }
}

```

## Output:
```

```