

```java
package com.fbtest.test_spring_boot.pr20201018_Date;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Main {
	public static void main(String[] args) {
		LocalDateTime a = LocalDateTime.parse(
				"2020-10-18T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS+08:00")
			);
		System.out.println(a.getHour());
		
		
		String pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS+08:00";
		
		List<Between> dates = new ArrayList<>();
		Between b1 = new Between();
		b1.setBegin( LocalDateTime.parse(
				"2020-10-18T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern)));
		b1.setEnd(LocalDateTime.parse(
				"2020-10-20T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern)));
		
		Between b2 = new Between();
		b2.setBegin(LocalDateTime.parse(
				"2020-10-15T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern)));		
		b2.setEnd(LocalDateTime.parse(
				"2020-10-17T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern)));
		
		Between b3 = new Between();
		b3.setBegin(LocalDateTime.parse(
				"2020-10-10T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern)));
		b3.setEnd(LocalDateTime.parse(
				"2020-10-13T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern)));
		dates.add(b1);
		dates.add(b2);
		dates.add(b3);
		
		LocalDateTime test1 =  LocalDateTime.parse(
				"2020-10-19T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern));
		
		LocalDateTime test2 =  LocalDateTime.parse(
				"2020-10-01T11:52:00.000+08:00",
				DateTimeFormatter.ofPattern(pattern));
		
		//boolean test1Result = dates.stream().noneMatch(predicate)
		
		boolean test1Result = dates.stream().noneMatch(i -> 
				test1.isAfter(i.getBegin())
				&& test1.isBefore(i.getEnd()));
		
		boolean test1ResultAny = dates.stream().anyMatch(i -> 
				test1.isAfter(i.getBegin())
				&& test1.isBefore(i.getEnd()));
		
		System.out.println("test1: 2020-10-19T11:52:00.000+08:00");
		System.out.println("test1_none:"+test1Result);
		System.out.println("test1_any:"+test1ResultAny);
		
		boolean test2Result = dates.stream().noneMatch(i -> 
				test2.isAfter(i.getBegin())
				&& test2.isBefore(i.getEnd()));		
		boolean test2ResultAny = dates.stream().anyMatch(i -> 
				test2.isAfter(i.getBegin())
				&& test2.isBefore(i.getEnd()));
		
		System.out.println("test2: 2020-10-01T11:52:00.000+08:00");
		System.out.println("test2_none:"+test2Result);
		System.out.println("test2_any:"+test2ResultAny);
	}
}

class Between{
	LocalDateTime begin;
	LocalDateTime end;
	public LocalDateTime getBegin() {
		return begin;
	}
	public void setBegin(LocalDateTime begin) {
		this.begin = begin;
	}
	public LocalDateTime getEnd() {
		return end;
	}
	public void setEnd(LocalDateTime end) {
		this.end = end;
	}
}


```


```
    test1: 2020-10-19T11:52:00.000+08:00
    test1_none:false
    test1_any:true
    test2: 2020-10-01T11:52:00.000+08:00
    test2_none:true
    test2_any:false
```