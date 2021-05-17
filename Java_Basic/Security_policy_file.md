
### java file:

```java
System.setProperty("java.security.policy", "C:\\tmp\\Permission.policy");
```

### Package:

```java
package com.fbtest.test_spring_boot.pr20210515;
```

### C:\\tmp\\Permission.policy

```
grant 
{  
   permission com.fbtest.test_spring_boot.pr20210515.WordCheckPermission "test1,test2,test3", "avoid";   
};

```

## Impl Principal Example:
- Core Java, Volume II--Advanced Features, Ch10


### Example in Learning Java, 4th Edition(2013)

```cmd
C:\Projects\Exploring>javac EvilEmoooo.java

C:\Projects\Exploring>java EvilEmoooo
Connected!

C:\Projects\Exploring>java -Djava.security.manager EvilEmoooo
SecurityException: could not connect.
```

```java
import java.net.*;

public class EvilEmoooo {
  public static void main(String[] args) throws Exception{
    try {
      Socket s = new Socket("127.0.0.1", 8080);
      System.out.println("Connected!");
    }
    catch (SecurityException e) {
      System.out.println("SecurityException: could not connect.");
    }
  }
}
```

### EvilEmoooo.policy
```
/* AUTOMATICALLY GENERATED ON Sun May 16 17:06:23 CST 2021*/
/* DO NOT EDIT */

grant codeBase "file:/C:/Users/xxxxx/Documents/pr20210508/src/main/java/com/fbtest/pr20210508/test/pr20210516" {
  permission java.net.SocketPermission "127.0.0.1", "connect";
};

grant {
  permission java.net.SocketPermission "127.0.0.1", "connect";
};
```

```cmd
C:\Projects\Exploring>java -Djava.security.manager -Djava.security.policy=EvilEmoooo.policy EvilEmoooo
Connected!
```

### EvilEmoooo2.policy
```
/* AUTOMATICALLY GENERATED ON Sun May 16 17:07:29 CST 2021*/
/* DO NOT EDIT */

grant codeBase "file:/C:/Users/xxxxx/Documents/pr20210508/src/main/java/com/fbtest/pr20210508/test/pr20210516" {
  permission java.net.SocketPermission "127.0.0.1", "connect";
};

grant codeBase "file:/c:/Projects/" {
  permission java.net.SocketPermission "127.0.0.1", "connect";
};
```

```cmd
C:\Projects\Exploring>java -Djava.security.manager -Djava.security.policy=EvilEmoooo2.policy EvilEmoooo
SecurityException: could not connect.
```


### EvilEmoooo3.policy
```
/* AUTOMATICALLY GENERATED ON Sun May 16 17:08:14 CST 2021*/
/* DO NOT EDIT */

grant codeBase "file:/C:/Users/xxxxx/Documents/pr20210508/src/main/java/com/fbtest/pr20210508/test/pr20210516" {
  permission java.net.SocketPermission "127.0.0.1", "connect";
};

grant codeBase "file:/c:/Projects/Exploring/" {
  permission java.net.SocketPermission "127.0.0.1", "connect";
};
```

```cmd
C:\Projects\Exploring>java -Djava.security.manager -Djava.security.policy=EvilEmoooo3.policy EvilEmoooo
Connected!
```