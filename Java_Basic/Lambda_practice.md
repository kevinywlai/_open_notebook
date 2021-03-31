```java
class Packages{
	
	static Item item21 = new Item("compulsory insurance","21","200");
	static Item item31 = new Item("liability insurance 1","31","50");
	static Item item32 = new Item("liability insurance 2","32","100");
	static Item item27 = new Item("medical insurance 2","27","300");
	static Item item30 = new Item("excess insurance","30","1000");
	static Item item59 = new Item("injury insurance","59","20");
	
	static Project project1 = new Project("project 1","p001",true,Arrays.asList(item21));
	static Project project2 = new Project("project 2","p002",true,Arrays.asList(item21,item31,item32));
	static Project project3 = new Project("project 3","p003",true,Arrays.asList(item21,item31,item32,item27,item30));
	
	static List<Project> packages = Arrays.asList(project1,project2,project3);
	
	static Project project2_1 = new Project("project 1","p001",true,Arrays.asList(item21));
	static Project project2_2 = new Project("project 2","p002",true,Arrays.asList(item21,item31,item32));
	static Project project2_3 = new Project("project 3","p003",true,Arrays.asList(item21,item31,item32,item27,item30));
	static Project project2_4 = new Project("project 3","p003",true,Arrays.asList(item21,item59,item30));
	
	static List<Project> packages2 = Arrays.asList(project2_1,project2_2,project2_3,project2_4);
	
	static Project project3_1 = new Project("project 2","p002",true,Arrays.asList(item31,item32));
	static Project project3_2 = new Project("project 3","p003",true,Arrays.asList(item31,item32,item27,item30));
	
	static List<Project> packages3 = Arrays.asList(project3_1,project3_2);
}

class Package{
	private String PackageName;
	private String PackageNo;
	private boolean isShow;
	List<Project> items = new ArrayList<>();
	
	public Package(String packageName, String packageNo, boolean isShow, List<Project> items) {
		super();
		PackageName = packageName;
		PackageNo = packageNo;
		this.isShow = isShow;
		this.items = items;
	}
	
	public String getPackageName() {
		return PackageName;
	}
	public String getPackageNo() {
		return PackageNo;
	}
	public boolean isShow() {
		return isShow;
	}
	public List<Project> getItems() {
		return items;
	}
	public void setPackageName(String packageName) {
		PackageName = packageName;
	}
	public void setPackageNo(String packageNo) {
		PackageNo = packageNo;
	}
	public void setShow(boolean isShow) {
		this.isShow = isShow;
	}
	public void setItems(List<Project> items) {
		this.items = items;
	}
}

class Project{
	private String ProjectName;
	private String ProjectNo;
	private boolean isShow;
	List<Item> items = new ArrayList<>();
	public Project(String projectName, String projectNo, boolean isShow, List<Item> items) {
		super();
		ProjectName = projectName;
		ProjectNo = projectNo;
		this.isShow = isShow;
		this.items = items;
	}
	public String getProjectName() {
		return ProjectName;
	}
	public String getProjectNo() {
		return ProjectNo;
	}
	public boolean isShow() {
		return isShow;
	}
	public List<Item> getItems() {
		return items;
	}
	public void setProjectName(String projectName) {
		ProjectName = projectName;
	}
	public void setProjectNo(String projectNo) {
		ProjectNo = projectNo;
	}
	public void setShow(boolean isShow) {
		this.isShow = isShow;
	}
	public void setItems(List<Item> items) {
		this.items = items;
	}
}

class Item{
	private String ItemName;
	private String ItemNo;
	private String AccidentNum;
	public Item(String itemName, String itemNo, String accidentNum) {
		super();
		ItemName = itemName;
		ItemNo = itemNo;
		AccidentNum = accidentNum;
	}
	public String getItemName() {
		return ItemName;
	}
	public String getItemNo() {
		return ItemNo;
	}
	public void setItemName(String itemName) {
		ItemName = itemName;
	}
	public void setItemNo(String itemNo) {
		ItemNo = itemNo;
	}

	public String getAccidentNum() {
		return AccidentNum;
	}

	public void setAccidentNum(String accidentNum) {
		AccidentNum = accidentNum;
	}
}
```

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;

public class Main1 {
	static Gson gson = new Gson().newBuilder().setPrettyPrinting().create();
	public static void main(String[] args) {
		System.out.println(gson.toJson(Packages.packages));

	}
	
}
```

### 2021/04/01

```java
public class Main2 {

	static Gson gson = new Gson().newBuilder().setPrettyPrinting().create();
	
	public static void main(String[] args) {
		Project project2 = new Project("project 2","p002",true,Arrays.asList(Packages.item21,Packages.item31,Packages.item32));
		System.out.println(gson.toJson(project2));
		Project project2_ = replaceOb(project2,"32");
		
		System.out.println(gson.toJson(project2)); //!!! side effect
		System.out.println(gson.toJson(project2_));
	}
	
	public static Project replaceOb(Project project,String itemNo) {
		Item item = project.getItems()
			.stream()
			.filter(i-> itemNo.equals(i.getItemNo())).findFirst().orElse(new Item());
		int index = project.getItems().indexOf(item);
		item.setAccidentNum("200");
		project.getItems().set(index, item); // cause side effect
		return project;
	}

}


```

### output

```
{
  "ProjectName": "project 2",
  "ProjectNo": "p002",
  "isShow": true,
  "items": [
    {
      "ItemName": "compulsory insurance",
      "ItemNo": "21",
      "AccidentNum": "200"
    },
    {
      "ItemName": "liability insurance 1",
      "ItemNo": "31",
      "AccidentNum": "50"
    },
    {
      "ItemName": "liability insurance 2",
      "ItemNo": "32",
      "AccidentNum": "100"
    }
  ]
}
{
  "ProjectName": "project 2",
  "ProjectNo": "p002",
  "isShow": true,
  "items": [
    {
      "ItemName": "compulsory insurance",
      "ItemNo": "21",
      "AccidentNum": "200"
    },
    {
      "ItemName": "liability insurance 1",
      "ItemNo": "31",
      "AccidentNum": "50"
    },
    {
      "ItemName": "liability insurance 2",
      "ItemNo": "32",
      "AccidentNum": "200" 
    }
  ]
}
{
  "ProjectName": "project 2",
  "ProjectNo": "p002",
  "isShow": true,
  "items": [
    {
      "ItemName": "compulsory insurance",
      "ItemNo": "21",
      "AccidentNum": "200"
    },
    {
      "ItemName": "liability insurance 1",
      "ItemNo": "31",
      "AccidentNum": "50"
    },
    {
      "ItemName": "liability insurance 2",
      "ItemNo": "32",
      "AccidentNum": "200"
    }
  ]
}
```
"AccidentNum": <mark>"100"</mark><br>
"AccidentNum": <mark>"200"</mark><br>



# Reference:
[Oracle Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)

[Stream Resources](https://github.com/kevinywlai/_notebook/blob/master/Java_notebook/Lambda/Resources.md)