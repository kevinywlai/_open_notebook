```java
		String html = "<JsonArr><key>1</key><File>sss===sdsd/+</File><key>2</key><File>sss===sdsd</File></JsonArr>";
		String stripped = html.replaceAll("<File>.*?</File>", "<File>log</File>");
		System.out.println(stripped);
		
		StringBuilder str = new StringBuilder("<JsonArr><key>1</key><File>sss===sdsd/+</File><key>2</key><File>sss===sdsd</File></JsonArr>");
		System.out.println(Pattern.compile("<File>.*?</File>").matcher(str).replaceAll("<File>log</File>"));
		
		// https://stackoverflow.com/questions/3472663/replace-all-occurrences-of-a-string-using-stringbuilder

        String a = Pattern.compile("<File>.*?</File>")
				.matcher(new StringBuilder("<JsonArr><key>1</key><File>sss===sdsd/+</File><key>2</key><File>sss===sdsd</File></JsonArr>"))
				.replaceAll("<File>log</File>");
		System.out.println(a);
```