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
