||||
|---|---|---|
|/**|HTML markup tags||

<br>

## Doc-Comment Tags
||||
|---|---|---|
| @author name| @version text| @param parameter-name description|  
| @return description| @exception full-classname description | @throws full-classname description|
| @see reference| @deprecated explanation| @since version|
| @serial description| @serialField name type description| @serialData description|

<br>

## Inline Doc-Comment Tags

||||
|---|---|---|
| {@link reference }| {@linkplain reference }| {@inheritDoc}|
| {@docRoot}| {@literal text }| {@code text }|
| {@value}| {@value reference }||

<br>

## Cross-References in Doc Comments
-  @see, {@link}, {@linkplain}, {@value}

||||
|---|---|---|
| pkgname| pkgname.typename| typename|
| typename # methodname| typename # methodname ( paramtypes )| # methodname|
| # methodname ( paramtypes )| typename # fieldname| # fieldname|


<hr>

## Example:

```java
package com.fbtest.test_spring_boot.pr20210227;

public class Main2 {
    /**     
     * Holds the real part of this complex number.     
     * @see #y
     * @version 1.01, 2021/02/27
     */    
	protected double x;    
	
	/**     
	 * Holds the imaginary part of this complex number.     
	 * @see #x
	 * 
	 * @see #Main2(double x, double y)
	 */    
	protected double y;
	
	/**
	 * <img src="../../../../../../../src/main/resources/doc/test.png">
	 * <img src="{@docRoot}../../../../src/main/resources/doc/test.png">
	 * <img src="{@docRoot}/docRoot.png">
	 * <br>
	 * <a href="{@docRoot}../../../../src/main/resources/doc/README.md">info</a> not work
	 * <br>
	 * <a href="{@docRoot}../../../../src/main/resources/doc/info.html">info</a>
	 * @param x
	 * @param y
	 * 
	 * @see Main3#getText()<br>
	 * @see com.fbtest.test_spring_boot.pr20210227.model.Model1#AAA
	 * 
	 */
	public Main2(double x, double y) {        
		this.x = x;        
		this.y = y;    
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```


```java
package com.fbtest.test_spring_boot.pr20210227;

public class Main3 {
	
	/**
	 * info getText
	 * @return
	 */
	public String getText() {
		return "a text";
	}
}
```

```java
package com.fbtest.test_spring_boot.pr20210227.model;

public class Model1 {
	/** AAA **/
	private String AAA;
	/** BBB **/
	private String BBB;

	/**
	 * 
	 * @return
	 */
	public String getAAA() {
		return AAA;
	}

	public String getBBB() {
		return BBB;
	}

	/**
	 * @see #AAA
	 * @param aAA
	 */
	public void setAAA(String aAA) {
		AAA = aAA;
	}

	/**
	 * 
	 * @param bBB
	 */
	public void setBBB(String bBB) {
		BBB = bBB;
	}
}
```
<hr>

### @docRoot example
```
* <img src="{@docRoot}/docRoot.png">
```

```
test_spring_boot/src/main/java/docRoot.png
```