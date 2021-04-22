```java
private Integer getCommandCount() {
    
    SecureRandom sr = new SecureRandom();
    sr.setSeed(System.currentTimeMillis());
    return sr.nextInt(10);
}
```