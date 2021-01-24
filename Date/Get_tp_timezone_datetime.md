## Back
### Java

```java
LocalDateTime loc = LocalDateTime.now();
LocalDateTime utcLoc = LocalDateTime.now(ZoneId.of("UTC"));
		
int offset = ChronoUnit.SECONDS.between(utcLoc,loc);
// or
// Duration.between(utcLoc,loc).getSeconds();

// pass offset to the front
```
- import:
```java
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
```

&darr;

## Front
### javascript

```javascript
var offsetBack = 28799;

var now = new Date();

var offsetSec = now.getTimezoneOffset()*60;

var twDateStr = new Date(now.setSeconds(offsetSec + offsetBack)).toLocaleDateString('en-GB');

var twDateArr = twDateStr.split('/');

// set year, month, day twDateArr[i]

```

```javascript
(new Date()).toLocaleDateString('en-GB');
"24/01/2021"

(new Date()).toLocaleDateString('zh-TW');
"2021/1/24"
```