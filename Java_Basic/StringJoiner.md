```java
import java.util.StringJoiner;

public class Main1 {

	public static void main(String[] args) {
		String num1 = "100,200,300,400,500,600";
		// no less than 300
		System.out.println(getNewNum(num1, 300));
		// no less than 500
		System.out.println(getNewNum(num1, 500));
	}
	
	static String getNewNum(String originNum, Integer min) {
		String[] numArray = originNum.split(",");
		
		int index = 0;
		while(Integer.valueOf(numArray[index]) < min) {
			++index;
		}
		StringJoiner strJoiner = new StringJoiner(",");
		for(int i = index; i < numArray.length; i++) {
			strJoiner.add(numArray[i]);
		}
		return strJoiner.toString();
	}
}

```