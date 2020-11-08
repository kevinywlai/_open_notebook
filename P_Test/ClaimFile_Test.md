
## Get Num of CateFile
```java
int numOf44 = m.numOfFileCate("44",m.getClaim1().stream());

int numOf29 = m.numOfFileCate("29",m.getClaim1().stream());
```

### numOfFileCate
```java
public int numOfFileCate(String typeOfFileCate, 
                        Stream<ClaimFile> claimFiles) {

    return claimFiles
            .filter(i ->typeOfFileCate
                        .equals(i.getFileCate())
                    )
            .collect(Collectors.toList())
            .size();
}
```

## Set Keys
```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
```


```java
public List<ClaimFile> getClaim1(){
    List<ClaimFile> a = new ArrayList<>();
    ClaimFile c1 = new ClaimFile("pic1", "file", "44");
    ClaimFile c2 = new ClaimFile("pic2", "file", "44");
    ClaimFile c3 = new ClaimFile("pic3", "file", "44");
    ClaimFile c4 = new ClaimFile("pic4", "file", "44");
    ClaimFile c5 = new ClaimFile("pic5", "file", "44");
    
    ClaimFile c6 = new ClaimFile("pic6", "file", "29");
    ClaimFile c7 = new ClaimFile("pic7", "file", "7");
    ClaimFile c8 = new ClaimFile("pic8", "file", "4");
    ClaimFile c9 = new ClaimFile("pic9", "file", "8");
    a.add(c1);
    a.add(c2);
    a.add(c3);
    a.add(c4);
    a.add(c5);
    a.add(c6);
    a.add(c7);
    a.add(c8);
    a.add(c9);
    return a;
}
```

```java
List<ClaimFile> d = new ArrayList<>();
int key44 = 1;
for(ClaimFile claimFile : m.getClaim1()) {
    if("44".equals(claimFile.getFileCate())) {
        if(m.is44KeyUsed(String.valueOf(key44),d)) {
            claimFile.setKey(String.valueOf(++key44));
        }else {
            claimFile.setKey(String.valueOf(key44));
        }
    }else if("29".equals(claimFile.getFileCate())) {
        claimFile.setKey("6");
    }else if("7".equals(claimFile.getFileCate())) {
        claimFile.setKey("7");
    }else if("4".equals(claimFile.getFileCate())) {
        claimFile.setKey("8");
    }else if("8".equals(claimFile.getFileCate())) {
        claimFile.setKey("9");
    }
    
    d.add(claimFile);
}

System.out.println(gson.toJson(d));
```

### is44KeyUsed
```java
public boolean is44KeyUsed(String key, List<ClaimFile> d) {
    return d.stream()
            .anyMatch(i -> key.equals(i.getKey()));
}
```




## ClaimFile

```java
public class ClaimFile {
	private String fileName;
	private String file;
	private String fileCate;
	private String key;
	
	public ClaimFile() {}
	
	public ClaimFile(String fileName, String file, String fileCate) {
		super();
		this.fileName = fileName;
		this.file = file;
		this.fileCate = fileCate;
	}
	public String getFileName() {
		return fileName;
	}
	public String getFile() {
		return file;
	}
	public String getFileCate() {
		return fileCate;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public void setFileCate(String fileCate) {
		this.fileCate = fileCate;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
}
```

## Output
```
[
  {
    "fileName": "pic1",
    "file": "file",
    "fileCate": "44",
    "key": "1"
  },
  {
    "fileName": "pic2",
    "file": "file",
    "fileCate": "44",
    "key": "2"
  },
  {
    "fileName": "pic3",
    "file": "file",
    "fileCate": "44",
    "key": "3"
  },
  {
    "fileName": "pic4",
    "file": "file",
    "fileCate": "44",
    "key": "4"
  },
  {
    "fileName": "pic5",
    "file": "file",
    "fileCate": "44",
    "key": "5"
  },
  {
    "fileName": "pic6",
    "file": "file",
    "fileCate": "29",
    "key": "6"
  },
  {
    "fileName": "pic7",
    "file": "file",
    "fileCate": "7",
    "key": "7"
  },
  {
    "fileName": "pic8",
    "file": "file",
    "fileCate": "4",
    "key": "8"
  },
  {
    "fileName": "pic9",
    "file": "file",
    "fileCate": "8",
    "key": "9"
  }
]
```

## Test 2
```java
public List<ClaimFile> getClaim1(){
    List<ClaimFile> a = new ArrayList<>();
    ClaimFile c1 = new ClaimFile("pic1", "file", "44");
    ClaimFile c2 = new ClaimFile("pic2", "file", "44");
    ClaimFile c5 = new ClaimFile("pic5", "file", "44");
    
    ClaimFile c6 = new ClaimFile("pic6", "file", "29");
    ClaimFile c7 = new ClaimFile("pic7", "file", "7");
    ClaimFile c8 = new ClaimFile("pic8", "file", "4");
    ClaimFile c9 = new ClaimFile("pic9", "file", "8");
    a.add(c1);
    a.add(c2);
    a.add(c5);
    a.add(c6);
    a.add(c7);
    a.add(c8);
    a.add(c9);
    return a;
}
```

### Output
```
[
  {
    "fileName": "pic1",
    "file": "file",
    "fileCate": "44",
    "key": "1"
  },
  {
    "fileName": "pic2",
    "file": "file",
    "fileCate": "44",
    "key": "2"
  },
  {
    "fileName": "pic5",
    "file": "file",
    "fileCate": "44",
    "key": "3"
  },
  {
    "fileName": "pic6",
    "file": "file",
    "fileCate": "29",
    "key": "6"
  },
  {
    "fileName": "pic7",
    "file": "file",
    "fileCate": "7",
    "key": "7"
  },
  {
    "fileName": "pic8",
    "file": "file",
    "fileCate": "4",
    "key": "8"
  },
  {
    "fileName": "pic9",
    "file": "file",
    "fileCate": "8",
    "key": "9"
  }
]
```