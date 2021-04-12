## Example 1

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

## Example 2 with ResponseEntity
- Apache HttpClient 4.5.13
- Apache HttpCore 4.4.14

```java
import javax.net.ssl.SSLContext;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

public class RestTest {

	public static void main(String[] args) throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {
		
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
		
		String url = "https://txxx.xxxxx.com/xxxxx/member/jwtdecodetest.do";
		String token = "eyJhbG.....2SdiQ";

		String reqStr = 
			"{"
                + "\"Header\":{"
                    +  "\"FromSys\":\"ooo\","
                    +  "\"FunctionCode\":\"xxxxxxx1058\""
                +   "},"
                +  "\"xxxxxxx1058RQ\":{"
                    +  "\"jwt\":\""+token+"\""
                + "}"
            +"}";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> request = new HttpEntity<>(reqStr,headers);
		
		
		ResponseEntity<String> response 
	      = new RestTemplate(requestFactory).exchange(
	    		  url, HttpMethod.POST, request, String.class);
		System.out.println(response.getBody());
	}

}
```

## Example 3

```java
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;


import javax.net.ssl.SSLContext;

import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.BasicHttpClientConnectionManager;
import org.apache.http.ssl.SSLContexts;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

public class RestTest2 {

	public static void main(String[] args) throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {
		
		TrustStrategy acceptingTrustStrategy = (cert, authType) -> true;
	    SSLContext sslContext = SSLContexts.custom().loadTrustMaterial(null, acceptingTrustStrategy).build();
	    SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext, 
	      NoopHostnameVerifier.INSTANCE);
	    
	    Registry<ConnectionSocketFactory> socketFactoryRegistry = 
	      RegistryBuilder.<ConnectionSocketFactory> create()
	      .register("https", sslsf)
	      .register("http", new PlainConnectionSocketFactory())
	      .build();

	    BasicHttpClientConnectionManager connectionManager = 
	      new BasicHttpClientConnectionManager(socketFactoryRegistry);
	    CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(sslsf)
	      .setConnectionManager(connectionManager).build();

	    HttpComponentsClientHttpRequestFactory requestFactory = 
	      new HttpComponentsClientHttpRequestFactory(httpClient);
		
		String url = "https://txxx.xxxxx.com/xxxxx/member/jwtdecodetest.do";
		String token = "eyJhbGci...Xh2SdiQ";

		String reqStr = 
			"{"
                + "\"Header\":{"
                    +  "\"FromSys\":\"ooo\","
                    +  "\"FunctionCode\":\"xxxxxxx1058\""
                +   "},"
                +  "\"xxxxxxx1058RQ\":{"
                    +  "\"jwt\":\""+token+"\""
                + "}"
            +"}";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> request = new HttpEntity<>(reqStr,headers);
		
		ResponseEntity<String> response 
	      = new RestTemplate(requestFactory).exchange(
	    		  url, HttpMethod.POST, request, String.class);
		System.out.println(response.getBody());
	}

}
```

# Reference:
- [HttpClient with SSL
](https://www.baeldung.com/httpclient-ssl)