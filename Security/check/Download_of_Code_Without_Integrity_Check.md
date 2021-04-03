## Preferred

```java
	static Class<?> getApi(String functionCode) {
		String rq = "RQ";
		String rs = "RS";
		
		Class<?> aClass = null;
		
		if(functionCode.endsWith(rq)) {
			aClass = ApiEnum.valueOf(functionCode.replace(rq, "")).getApirqClass();
		}else if(functionCode.endsWith(rs)) {
			aClass = ApiEnum.valueOf(functionCode.replace(rs, "")).getApirsClass();
		}
		return aClass;
	}

    public static void main(String[] args) {
		String functionCode = "API001RQ";
		Class<?> aClass = getApi(functionCode);
		
		String jsonStr = "{\"api001rq\":\"AAA\"}";
		API001RQ api001rq = (API001RQ)new Gson().fromJson(jsonStr,aClass);
		System.out.println(api001rq.getApi001rq());
	}
```

## ApiEnum

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