
# Test

```java
public class Test {
    StringBuilder sb;
    String test1;
    String test2;
    String test3;
    Test(TestBuilder testBuilder){
        this.sb = testBuilder.sb;
        this.test1 = testBuilder.test1;
        this.test2 = testBuilder.test2;
        this.test3 = testBuilder.test3;
    }
    static class TestBuilder{
        private final StringBuilder sb;
        String test1;
        String test2;
        String test3;

        TestBuilder(StringBuilder sb){
            this.sb = sb;
        }

        public TestBuilder setTest1(){
            this.sb.append("test1,");
            return this;
        }

        public TestBuilder setTest2(){
            this.sb.append("test2,");
            return this;
        }

        public TestBuilder setTest3(){
            this.sb.append("test3,");
            return this;
        }

        public Test build(){
            Test test = new Test(this);
            return test;
        }
    }
}
```

## main
```java
package pr20210602;

public class TestMain {

    public static void main(String[] args){
        Test test = new Test
                        .TestBuilder(new StringBuilder())
                        .setTest1()
                        .setTest3()
                        .build();
        System.out.println(test.sb.toString());
    }
}
```

# ApiInvoker
```java
public class ApiInvoker {
//    String url;
//    RestTemplate restTemplate;
//    String requestStr;
    String responseStr;
    //Response response;

    ApiInvoker(ApiInvokerBuilder apiInvokerBuilder){
        this.responseStr = apiInvokerBuilder.responseStr;
    }

    static class ApiInvokerBuilder{
        String url;
        RestTemplate restTemplate;
        String requestStr;
        String responseStr;

        public ApiInvokerBuilder setWebPaymentUrl(){
            this.url = "webpay";
            return this;
        }

        public ApiInvokerBuilder setQRCodeUrl(){
            this.url = "setQRUrl";
            return this;
        }

        public ApiInvokerBuilder setHttpsRestTemplate() throws NoSuchAlgorithmException, KeyStoreException, KeyManagementException {
            // SSL
            TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

            SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
                    .loadTrustMaterial(null, acceptingTrustStrategy)
                    .build();

            SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);

            CloseableHttpClient httpClient = HttpClients.custom()
                    .setSSLSocketFactory(csf)
                    .build();

            HttpComponentsClientHttpRequestFactory requestFactory =
                    new HttpComponentsClientHttpRequestFactory();

            requestFactory.setHttpClient(httpClient);

            // RestTemplate
            this.restTemplate = new RestTemplate(requestFactory);
            return this;
        }

        public ApiInvokerBuilder setHttpRestTemplate(){
            this.restTemplate = new RestTemplate();
            return this;
        }

        public ApiInvokerBuilder setRequestStr(String requestStr){
            this.requestStr = requestStr;
            return this;
        }

        // postForObject
        public ApiInvoker build(){
            this.responseStr = 
                this.restTemplate
                .postForObject(this.url, this.requestStr, String.class);

            ApiInvoker apiInvoker = new ApiInvoker(this);
            return apiInvoker;
        }
    }
}
```

## import 
```java
package com.fbtest.pr20210602.builder;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import javax.net.ssl.SSLContext;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.conn.ssl.TrustStrategy;
```