```java
package com.fbtest.test_spring_boot.pr20210328;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.google.gson.Gson;

public class Main2 {
//public class Main2<T>{
//	List<?> getList(T u){
//		List<T> aList = new ArrayList<>();
//		
//		return aList;
//	}

	static List<Car> getCarList(){
		List<Car> cars = new ArrayList<>();
		Car car1 = new Car();
		car1.setItemName("AAA");
		car1.setColor("red");
		cars.add(car1);
		Car car2 = new Car();
		car2.setItemName("BBB");
		car2.setColor("black");
		cars.add(car2);
		Car car3 = new Car();
		car3.setItemName("CCC");
		car3.setColor("silver");
		cars.add(car3);
		return cars;
	}
	
	public static void main(String[] args) {
		List<Car> carList1 = 
		getCarList().stream().map(car -> {
			Car car_ = new Car();
			car_.setItemName("DDD");
			car_.setColor("white");
			return car_;
		}).collect(Collectors.toList());
		
		System.out.println(new Gson().toJson(carList1));
		
		Main2 main2 = new Main2();
		System.out.println(new Gson().toJson(main2.mapCar()));
        
        List<Car> carList3 = 
				getCarList().stream().map(main2::getCar).collect(Collectors.toList());
		
		System.out.println(new Gson().toJson(carList3));
	}
	
	public List<Car> mapCar() {
		List<Car> carList2 = 
				getCarList().stream().map(this::getCar).collect(Collectors.toList());
		return carList2;
	}
	
	Car getCar(Car car) {
		car.setItemName("DDD");
		car.setColor("white");
		
		return car;
	}

}
class Car {
	private String itemName;
	private String color;
	
	public String getItemName() {
		return itemName;
	}
	public String getColor() {
		return color;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public void setColor(String color) {
		this.color = color;
	}
}
```


- output
```json
[{"itemName":"DDD","color":"white"},{"itemName":"DDD","color":"white"},{"itemName":"DDD","color":"white"}]

[{"itemName":"DDD","color":"white"},{"itemName":"DDD","color":"white"},{"itemName":"DDD","color":"white"}]

[{"itemName":"DDD","color":"white"},{"itemName":"DDD","color":"white"},{"itemName":"DDD","color":"white"}]

```

|||
|---|---|
|this::|same class|
|main2::|another class|
|SomeClass::|static|
|Item::|Stream item|
|Car::new|constructor |

# Reference:
[Functional Programming Patterns With Java 8](https://dzone.com/articles/functional-programming-patterns-with-java-8)