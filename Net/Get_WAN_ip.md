
```java
package com.fbtest.test_spring_boot.pr20201024;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

/* 
 * https://stackoverflow.com/questions/2939218/
 * getting-the-external-ip-address-in-java
 */

public class WAN_Test {
	public static void main(String[] args) throws IOException {
		URL whatismyip = new URL("http://checkip.amazonaws.com");
		BufferedReader in = new BufferedReader(new InputStreamReader(
		    whatismyip.openStream()));

		String ip = in.readLine(); //you get the IP as a String
		System.out.println(ip);
	}
}

```