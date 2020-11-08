## To List<String>

```java
List<String> b = m.getClaim1().stream()
				.filter(i -> "44".equals(i.getFileCate()))
				.map(i -> i.getFile().toUpperCase())
				.collect(Collectors.toList());
System.out.println(gson.toJson(b));
```

### Output

```
[
  "FILE",
  "FILE",
  "FILE",
  "FILE",
  "FILE"
]
```

## To List<Object>

```java
List<ClaimFile> c = m.getClaim1().stream()
				.filter(i -> "44".equals(i.getFileCate()))
				.map(temp -> {
					ClaimFile cl = new ClaimFile();
					cl.setFile(temp.getFile());
					cl.setFileName(temp.getFileName());
					cl.setFileCate(temp.getFileCate());
					cl.setKey("1");
					return cl;
				})
				.collect(Collectors.toList());
System.out.println(gson.toJson(c));
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
    "key": "1"
  },
  {
    "fileName": "pic3",
    "file": "file",
    "fileCate": "44",
    "key": "1"
  },
  {
    "fileName": "pic4",
    "file": "file",
    "fileCate": "44",
    "key": "1"
  },
  {
    "fileName": "pic5",
    "file": "file",
    "fileCate": "44",
    "key": "1"
  }
]
```

## To Map<String,Object>

```java
Map<String,ClaimFile> d = m.getClaim1().stream()
        .filter(i -> "44".equals(i.getFileCate()))
        .collect(Collectors.toMap(ClaimFile::getFileName
                                    , claim -> claim));
System.out.println(gson.toJson(d));                                   
```

### Output

```
{
  "pic1": {
    "fileName": "pic1",
    "file": "file",
    "fileCate": "44"
  },
  "pic2": {
    "fileName": "pic2",
    "file": "file",
    "fileCate": "44"
  },
  "pic3": {
    "fileName": "pic3",
    "file": "file",
    "fileCate": "44"
  },
  "pic4": {
    "fileName": "pic4",
    "file": "file",
    "fileCate": "44"
  },
  "pic5": {
    "fileName": "pic5",
    "file": "file",
    "fileCate": "44"
  }
}
```

## ClaimFile
```java
Gson gson = new GsonBuilder().setPrettyPrinting().create();

Main3 m = new Main3();
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