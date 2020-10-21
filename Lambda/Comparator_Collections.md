## 1

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Car{
	private String type;
	private String color;
	
	public Car(String type, String color) {
		super();
		this.type = type;
		this.color = color;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
}
```
## Comparator
```java
class CarComparator implements Comparator<Car>{

	@Override
	public int compare(Car o1, Car o2) {
		int typeDifference = Integer.valueOf(o1.getType()) 
				- Integer.valueOf(o2.getType());
		return typeDifference;
	}
	
}

```

## Collections
```java
public class Main2 {

	public static void main(String[] args) {
		List<Car> cars = new ArrayList<>();
		
		Car car1 = new Car("4","Green");
		Car car2 = new Car("7","Yellow");
		Car car3 = new Car("3","Red");

		cars.add(car1);
		cars.add(car2);
		cars.add(car3);
		
		cars
            .stream()
            .forEach(i -> System.out.println(
                i.getType() + "," + i.getColor()));
		
		Collections.sort(cars, new CarComparator());
		System.out.println("================");
		
		cars
            .stream()
            .forEach(i -> System.out.println(
                i.getType() + "," + i.getColor()));
		
	}

}
```