```java
package com.fbtest.test_spring_boot.pr20210402.apis;

public enum ApiEnum {
	API001("API001RQ"
			,"API001RS"
			,com.fbtest.test_spring_boot.pr20210402.apis.API001RQ.class
			,com.fbtest.test_spring_boot.pr20210402.apis.API001RS.class),
	API002("API003RQ"
			,"API003RS"
			,com.fbtest.test_spring_boot.pr20210402.apis.API002RQ.class
			,com.fbtest.test_spring_boot.pr20210402.apis.API002RS.class);
	
	private String apirq;
	private String apirs;
	private Class<?> apirqClass;
	private Class<?> apirsClass;

    // constructor
	private ApiEnum(String apirq, String apirs, Class<?> apirqClass, Class<?> apirsClass) {
		this.apirq = apirq;
		this.apirs = apirs;
		this.apirqClass = apirqClass;
		this.apirsClass = apirsClass;
	}
	public String getApirq() {
		return apirq;
	}
	public String getApirs() {
		return apirs;
	}
	public Class<?> getApirqClass() {
		return apirqClass;
	}
	public Class<?> getApirsClass() {
		return apirsClass;
	}
}
```

## get API001  API001RQ in ApiEnum

### .valueOf()

```java
ApiEnum apiEnum = ApiEnum.valueOf("API001");
apiEnum.getApirq();  // API001RQ
```

# EnumMap

```java
package com.fbtest.pr20210723;

import java.util.EnumMap;

public class Main2 {
    enum MSGKEYS{
        STATUS,
        MSG;
    }

    enum MSGVALUE{
        _0000("0000"),
        _0001("0001"),
        MESSAGE("error");
        String code;
        MSGVALUE(String code){
            this.code = code;
        }
        String getCode(){
            return this.code;
        }
        void setCode(String code){
            this.code = code;
        }

    }

    public static void main(String[] args) {
        MSGVALUE.MESSAGE.setCode("abc error");
        System.out.println(MSGVALUE._0001.getCode());

        EnumMap<MSGKEYS, String> activityMap = new EnumMap<>(MSGKEYS.class);
        activityMap.put(MSGKEYS.STATUS,MSGVALUE._0000.getCode());
        activityMap.put(MSGKEYS.MSG,MSGVALUE.MESSAGE.getCode());
        // activityMap.put(MSGKEYS.JKL,MSGVALUE.MESSAGE.getCode()); // Cannot resolve symbol 'JKL'
        System.out.println(activityMap.toString());
        // activityMap.get(MSGKEYS.ABC); // Cannot resolve symbol 'ABC'
    }
}
```