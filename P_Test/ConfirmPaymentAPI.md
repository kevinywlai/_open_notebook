
```java
@Controller
public class MainController {

	@ResponseBody()
	@RequestMapping(value = "/confirmPayment", 
                method = RequestMethod.POST
                ,produces = "application/json")
	public byte[] post1(@RequestBody String payload) throws UnsupportedEncodingException {
		Gson gson = new GsonBuilder()
                        .setPrettyPrinting()
                        .disableHtmlEscaping()
                        .create();
		Map<String, Object> respMap = new HashMap<>();
		try {
			System.out.println(payload);
			// logger.info("payload:"+payload);
			
			JsonObject jsonOb = gson.fromJson(payload, JsonObject.class);
			
			String trade_id = jsonOb.get("trade_id").getAsString();
			String secret_key = jsonOb.get("secret_key").getAsString();
			String transaction_id = jsonOb.get("transaction_id").getAsString();
			String paid_at = jsonOb.get("paid_at").getAsString();
			
			respMap.put("success", true);
			respMap.put("trade_id", trade_id);
			
			// failed
			// respMap.put("success", "false");
			// respMap.put("error_message", "false");
			
			// logger.info("respStr:"+respStr);
			
			
		}catch(Exception e ) {
			// logger.error
			
			respMap.put("success", false);
			respMap.put("error_message", "參數錯誤");
		}
		String respStr = gson.toJson(respMap); 
		System.out.println(respStr);
		return respStr.getBytes("UTF-8");
	}
}
```

## test request
```
{
	"trade_id":"AAA",
	"secret_key":"BBB",
	"transaction_id":"CCC",
	"paid_at":"DDD"
}
```


``` java
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;


```

