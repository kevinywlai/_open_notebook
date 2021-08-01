# Builder

```java
public class Response<T> {
    private final String status;
    private final String msg;
    private final T respObj;

    Response(ResponseBuilder<T> responseBuilder){
        this.status = CODE.statusMap.get(responseBuilder.code);
        if("_9999".equals(responseBuilder.code.name())
            && StringUtils.hasLength(responseBuilder.customMsg)){
            this.msg = responseBuilder.customMsg;
        }else{
            this.msg = CODE.msgMap.get(responseBuilder.code);
        }
        respObj = responseBuilder.respObj;
    }

    public String getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }

    public T getRespObj() {
        return respObj;
    }

    @Override
    public String toString(){
        String respStr = new Gson().toJson(this);
        String simpleClassName = this.respObj.getClass().getSimpleName();
        return respStr.replace("respObj",simpleClassName.substring(0, 1).toLowerCase() + simpleClassName.substring(1));
    }

    static class ResponseBuilder<T>{
        private T respObj;
        private String customMsg;
        private CODE code;

        public Response<T> build(){
            return new Response<>(this);
        }

        public ResponseBuilder<T> setObject(T object) {
            this.respObj = object;
            return this;
        }

        public ResponseBuilder<T> setCustomMsg(String customMsg) {
            this.customMsg = customMsg;
            return this;
        }

        public ResponseBuilder<T> setCode(CODE code) {
            this.code = code;
            return this;
        }
    }

    public enum CODE{
        _0000("0000","success"),
        _0001("0001","connection error"),
        _0002("0002","data error"),
        _9999("9999","other error");
        private final String status;
        private String msg;
        CODE(String status,String msg){
            this.status = status;
            this.msg = msg;
        }

        public String getStatus() {
            return status;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg){
            this.msg = msg;
        }

        public static Map<Response.CODE,String> statusMap = new ArrayList<>(EnumSet.allOf(Response.CODE.class))
                .stream()
                .collect(Collectors.toMap(Function.identity(), Response.CODE::getStatus));

        public static Map<Response.CODE,String> msgMap = new ArrayList<>(EnumSet.allOf(Response.CODE.class))
                .stream()
                .collect(Collectors.toMap(Function.identity(), Response.CODE::getMsg));
    }
}
```

## import 

```java
package com.fbtest.pr20210725.tests.pr20210731.builder;

import com.google.gson.Gson;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
```

## Usage

```java
package com.fbtest.pr20210725.tests.pr20210731.builder;

import com.fbtest.pr20210725.tests.pr20210731.Car;

public class Main1 {
    public static void main(String[] args) {

        Response<Car> response = new Response
                .ResponseBuilder<Car>()
                .setObject(new Car("blue","Adam"))
                .setCode(Response.CODE._0000)
                .build();
        System.out.println(response);

        Response<Car> response2 = new Response
                .ResponseBuilder<Car>()
                .setObject(new Car("blue","Adam"))
                .setCode(Response.CODE._9999)
                .build();
        System.out.println(response2);

        Response<Car> response3 = new Response
                .ResponseBuilder<Car>()
                .setObject(new Car("blue","Adam"))
                .setCode(Response.CODE._9999)
                .setCustomMsg("Error!!!")
                .build();
        System.out.println(response3);

        Response<Car> response4 = new Response
                .ResponseBuilder<Car>()
                .setObject(new Car("blue","Adam"))
                .setCode(Response.CODE._0001)
                .setCustomMsg("Error!!!")
                .build();
        System.out.println(response4);

    }
}
```

# Common

```java
package com.fbtest.pr20210725.tests.pr20210731;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.Locale;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Resp<T> {
    private String status;

    private String msg;

    private T respObj;

    public Resp(CODE code){
        this.status = Resp.CODE.statusMap.get(code);
        this.msg    = Resp.CODE.msgMap.get(code);
    }

    /**
     * only {@code CODE._9999} can custom message
     * @param code
     * @param customMsg
     */
    public Resp(CODE code, String customMsg){
        this.status = Resp.CODE.statusMap.get(code);
        if("_9999".equals(code.name())){
            this.msg = customMsg;
        }else{
            this.msg = Resp.CODE.msgMap.get(code);
        }

    }

    public enum CODE{
        _0000("0000","success"),
        _0001("0001","connection error"),
        _0002("0002","data error"),
        _9999("9999","other error");
        private String status;
        private String msg;
        CODE(String status,String msg){
            this.status = status;
            this.msg = msg;
        }

        public String getStatus() {
            return status;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg){
            this.msg = msg;
        }

        public static Map<CODE,String> statusMap = new ArrayList<>(EnumSet.allOf(CODE.class))
                .stream()
                .collect(Collectors.toMap(Function.identity(),CODE::getStatus));

        public static Map<CODE,String> msgMap = new ArrayList<>(EnumSet.allOf(CODE.class))
                .stream()
                .collect(Collectors.toMap(Function.identity(),CODE::getMsg));
    }


    public void setObject(T object) {
        this.respObj = object;
    }

    public String getStatus() {
        return this.status;
    }

    public String getMsg() {
        return this.msg;
    }

    public Object getObject() {
        return this.respObj;
    }

    public String replaceKey(String jsonString){
        return jsonString.replace("respObj",respObj.getClass().getSimpleName().toLowerCase(Locale.ROOT));
    }

    @Override
    public String toString(){
        String respStr = new Gson().toJson(this);
        String simpleClassName = this.respObj.getClass().getSimpleName();
        return respStr.replace("respObj",simpleClassName.substring(0, 1).toLowerCase() + simpleClassName.substring(1));
    }
}

```

```java
public class Main2 {
    public static void main(String[] args) {

        Resp resp = new Resp(Resp.CODE._0000);
        System.out.println(new Gson().toJson(resp));

        Resp resp2 = new Resp(Resp.CODE._9999,"Custom Error");
        System.out.println(new Gson().toJson(resp2));

        Resp resp3 = new Resp(Resp.CODE._0001,"Custom Error");
        System.out.println(new Gson().toJson(resp3));

        CarResp respCar = new CarResp(Resp.CODE._0000);
        Car car1 = new Car("blue","Adam");
        respCar.setCar(car1);
        System.out.println(new Gson().toJson(respCar));

        Resp<Car> resp4 = new Resp<>(Resp.CODE._0001,"Custom Error");
        resp4.setObject(car1);
        String respStr = new Gson().toJson(resp4);
        System.out.println(respStr);
        System.out.println(resp4.replaceKey(respStr));
        System.out.println(resp4);
    }
}

```