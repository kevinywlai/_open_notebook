```java
package com.fbtest.test_spring_boot.pr20200909;

import javax.net.ssl.SSLContext;

import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

public class WSTest {

	public static void main(String[] args) throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {

		//https://stackoverflow.com/questions/42323468/how-to-call-https-restful-web-services-using-spring-resttemplate
		
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
		RestTemplate restTemplate = new RestTemplate(requestFactory);
		String requestStr = "{\"FromSys\":\"B2****E\"}";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<String> request = new HttpEntity<>(requestStr,headers);

		String urlstr = "https://****.com/###api/login/token";
		String a = restTemplate.postForObject(urlstr, request, String.class);
		System.out.println(a);
	}

}
```