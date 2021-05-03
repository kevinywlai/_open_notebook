
```java
public abstract class Point implements Cloneable {
    ...
	@Override
	public abstract Point clone();
    ...
}
```

```java
public class Main1 extends Point{
	@Override
	public Point clone() throws CloneNotSupportedException {
		return (Point) super.clone();
	}
    ...
}
```