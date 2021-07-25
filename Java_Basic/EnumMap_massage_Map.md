<mark>PROD</mark>

```java
enum MSG_MAP{
    STATUS,
    MESSAGE;
    static EnumMap<MSG_MAP,String> msg_map;

    enum MSG_CODE_MSG{
        _0000("0000","success"),
        _0001("0001","error type A"),
        /** Custom Message */
        _9999("9999","");

        private String code;
        private String msg;
        MSG_CODE_MSG(String code,String msg){
            this.code = code;
            this.msg = msg;
        }
        public String getCode(){
            return this.code;
        }
        public String getMsg(){
            return this.msg;
        }
    }


    /**
     * STATUS:0000
     * @return
     */
    public static EnumMap<MSG_MAP,String> successMSGMap(){
        msg_map = new EnumMap<>(MSG_MAP.class);
        //status
        msg_map.put(MSG_MAP.STATUS,MSG_CODE_MSG._0000.getCode());
        //message
        msg_map.put(MSG_MAP.MESSAGE,MSG_CODE_MSG._0000.getMsg());
        return msg_map;
    }

    /**
     * STATUS:9999 custom message
     * @return
     */
    public static EnumMap<MSG_MAP,String> customMSGMap(String message){
        msg_map = new EnumMap<>(MSG_MAP.class);
        //status
        msg_map.put(MSG_MAP.STATUS,MSG_CODE_MSG._9999.getCode());
        //message
        msg_map.put(MSG_MAP.MESSAGE,message);
        return msg_map;
    }

    /**
     * EnumMap to Map
     * @param enumMap
     * @return
     */
    public static Map<String,String> toHashMap(
            EnumMap<MSG_MAP,String> enumMap){

        Gson gson = new Gson();
        String jsonStr = gson.toJson(enumMap);
        return gson.fromJson(jsonStr,Map.class);
    }
}
```