## 1. Return Map
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

## 2. Return Object
```java
@RestController
public class MainRestController{

    @PostMapping("rest/client")
    public Client postMain(){
        ....

        Client client = service.findByID(id);
        return client;
    }
}
```

## Output:
```

```