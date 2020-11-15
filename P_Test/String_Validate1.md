```java
String txt1 = "IOEDCBAAI";
List<Character> charList = txt1.chars()
				.mapToObj(c -> (char) c)
				.collect(Collectors.toList());
```

```java
static boolean isChar(List<Character> charList, int type) {

		for(int i = 0; i < charList.size() - 1 ;i++) {
			if(charList.get(i+1) - charList.get(i) != type ) {
				return false;
			}
		}
		return true;
	}

```

```java
static boolean isChar_(List<Character> charList, int numOfTest) {

		for(int i = 0; i < charList.size() - numOfTest + 1; i++) {
			List<Character> charList_ = new ArrayList<>();
			for(int j = i; j < i + numOfTest; j++){
				charList_.add(charList.get(j));
			}
			if(isChar(charList_, 1) 
                || isChar(charList_, -1) 
                || isChar(charList_, 0)) {
				return true;
			}
		}
		return false;
	}
```