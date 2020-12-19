

```java
public class Main {
```

## father sub-class
```java
    static class Pit{
        PitBean pitBean;
        
        public Pit() {
            this.pitBean = new PitBean();
            pitBean.setCopied(false);
            pitBean.setNew_(false);
        }
        
        public PitBean getPitBean() {
            return this.pitBean;
        }
    }
```

## child sub-class 1
```java
    static class Pit21 extends Pit{
        PitBean pitBean;
        
        public Pit21() {
            this.pitBean = super.getPitBean();
            pitBean.setNumParam1("50000");
        }
        
        @Override
        public PitBean getPitBean() {
            return this.pitBean;
        }
    }
```

## child sub-class 2
```java
	static class PitMoto extends Pit{
		PitBean pitBean;
		
		public PitMoto() {
			this.pitBean = super.pitBean;
			pitBean.setNumParam2("100000");
			pitBean.setNumParam3("1000000");
		}

		@Override
		public PitBean getPitBean() {
			return this.pitBean;
		}
	}
```
## Output
```json
[
  {
    "copied": false,
    "new_": false,
    "numParam1": "50000"
  },
  {
    "copied": false,
    "new_": false,
    "numParam2": "100000",
    "numParam3": "1000000"
  }
]

```

## public static void main(String[] args)
```java
    public static void main(String[] args) {
        Gson gson = new GsonBuilder()
                        .setPrettyPrinting()
                        .create();
        List<PitBean> pitBeanList = new ArrayList<>();
        
        // Instance child sub-class 1
        PitBean pitBean21 = (new Pit21()).getPitBean();
        // Instance child sub-class 2
        PitBean pitBeanMoto = (new PitMoto()).getPitBean();

        // Add to List pitBeanList
        pitBeanList.add(pitBean21);
        pitBeanList.add(pitBeanMoto);
        System.out.println(gson.toJson(pitBeanList));
    }
```
```java
}
```



## PitBean
```java
public class PitBean {
	private boolean copied;
	private boolean new_;
	private String bnfCode;
	private String numParam1;
	private String numParam2;
	private String numParam3;
	private String tsi;
	public boolean isCopied() {
		return copied;
	}
	public boolean isNew_() {
		return new_;
	}
	public String getBnfCode() {
		return bnfCode;
	}
	public String getNumParam1() {
		return numParam1;
	}
	public String getNumParam2() {
		return numParam2;
	}
	public String getNumParam3() {
		return numParam3;
	}
	public String getTsi() {
		return tsi;
	}
	public void setCopied(boolean copied) {
		this.copied = copied;
	}
	public void setNew_(boolean new_) {
		this.new_ = new_;
	}
	public void setBnfCode(String bnfCode) {
		this.bnfCode = bnfCode;
	}
	public void setNumParam1(String numParam1) {
		this.numParam1 = numParam1;
	}
	public void setNumParam2(String numParam2) {
		this.numParam2 = numParam2;
	}
	public void setNumParam3(String numParam3) {
		this.numParam3 = numParam3;
	}
	public void setTsi(String tsi) {
		this.tsi = tsi;
	}
}

```