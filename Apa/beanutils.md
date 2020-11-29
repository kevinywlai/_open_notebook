## Note of jakarta-commons-cookbook

## Chapter 3

```java
		Car car = new Car( );
		car.setBrand( "Toyota" );
		
		
		String brand = (String) PropertyUtils.getSimpleProperty(car, "brand");
		System.out.println(brand);
		
		// 5. Accessing Nested Bean Properties
		Owner owner = new Owner();
		owner.setName("John");
		owner.setGender("M");
		car.setOwner(owner);
		String ownerName = (String) PropertyUtils.getNestedProperty( car, "owner.name" );
		System.out.println(ownerName);
		
		Owner owner_ = (Owner) PropertyUtils.getNestedProperty( car, "owner" );
		System.out.println(owner_.getGender());
		
		// 9. Determining the Type of a Bean Property
		Class type = PropertyUtils.getPropertyType( car, "brand" );
		System.out.println( "book.author type: " + type.getName( ) );
		
		// 11. Copying Bean Properties
		Car2 car2 = new Car2();
		PropertyUtils.copyProperties( car2, car );
		System.out.println(car2.getBrand());
		
		// 13. Setting a Bean Property
		Car car3 = new Car( );
		PropertyUtils.setProperty( car3, "brand", "Honda" );
		PropertyUtils.setProperty( car3, "owner", new Owner( ) );
		PropertyUtils.setProperty( car3, "owner.name", "Ken" );
		System.out.println(car3.getBrand());
		System.out.println(car3.getOwner().getName());
		
```

## Car
```java
public class Car {
    private String brand;
    private String color;
    private Owner owner;
    
    public Car() {}
	public String getBrand() {
		return brand;
	}
	public String getColor() {
		return color;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Owner getOwner() {
		return owner;
	}
	public void setOwner(Owner owner) {
		this.owner = owner;
	}
	
}
```

##  Car2
```java
public class Car2 {
    private String brand;
    private String color;
    private Owner owner;
    
    public Car2() {}
	public String getBrand() {
		return brand;
	}
	public String getColor() {
		return color;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Owner getOwner() {
		return owner;
	}
	public void setOwner(Owner owner) {
		this.owner = owner;
	}
	
}
```

## Owner
```java
public class Owner {
	private String name; 
	private String gender;
	public String getName() {
		return name;
	}
	public String getGender() {
		return gender;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
}
```