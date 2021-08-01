## RegexEnum.java

```java
package com.fbtest.pr20210725.tests.pr20210731.RegexTest;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public enum RegexEnum {
    ID("[^A-Za-z1-9][A-Za-z][1-28-9]\\d{8}"),
    CAR_PLATE_7GEN("([A-Z]{2}-[0-9]{4}|[A-Z]{3}-[0-9]{4}|[A-Z]{2}-[0-9]{3}" +
            "|[A-Z][0-9]-[0-9]{3}|[0-9][A-Z]-[0-9]{3}|[0-9]{4}-[A-Z]{2}|[0-9]{3}-[A-Z]{2}" +
            "|[0-9]{3}-[A-Z][0-9]|[0-9]{3}-[0-9][A-Z]|[A-Z][0-9]-[0-9]{2}|[0-9][A-Z]-[0-9]{2}" +
            "|[0-9]{2}-[A-Z][0-9]|[0-9]{2}-[0-9][A-Z]|[0-9]{2}-[A-Z]{2}|[A-Z]{2}-[0-9]{2}" +
            "|[A-Z]{2}-[A-Z][0-9]{2}|[A-Z]{2}-[A-Z][0-9]|[A-Z]{1}[0-9]{2}-[A-Z][0-9]{3}" +
            "|[A-Z][0-9][A-Z]-[A-Z][0-9]{3}|[0-9]{2}[A-Z]{1}-[A-Z][0-9]{3}|[0-9]{3}-[A-Z]{3})"),
    CAR_PLATE_8GEN1("([A-Z]{3}-[0-9]{4}|[A-Z]{3}-[0-9]{3}|[A-Z]{2}-[0-9]{3})"),
    CAR_PLATE_8GEN2("[A-Z]{3}-[0-9]{4}"),
    E_MAIL("\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]"),
    ADDRESS("(路|街|巷|段|里|鄰)"),
    MOBILE_PHONE("[^0-9]09\\d{8}[^0-9]"),
    NAMES("[陳林黃張李王吳劉蔡楊許鄭謝洪郭邱曾廖賴徐周葉蘇莊呂江何蕭羅高潘簡朱鍾游彭詹胡施沈余盧梁" +
            "趙顏柯翁魏孫戴范方宋鄧杜傅侯曹薛丁卓阮馬董温唐藍石蔣古紀姚連馮歐程湯黄田康姜白汪鄒尤巫鐘黎涂龔嚴韓" +
            "袁金童陸夏柳凃邵錢伍倪溫于譚駱熊任甘秦顧毛章史官萬俞雷粘饒張闕凌崔尹孔辛武辜陶易段龍韋葛池孟褚殷麥" +
            "賀賈莫文管關向包丘梅姜華利裴樊房全佘左花魯安鮑郝穆塗邢蒲成谷常閻練盛鄔耿聶符申祝繆陽解曲岳齊籃應單" +
            "舒畢喬龎翟牛鄞留季覃卜項喻商滕焦車買虞苗戚牟雲巴力艾樂臧司樓費屈宗幸衛尚靳祁諶桂沙欒宮路刁時龐瞿柴" +
            "柏鄺談查霍隋閔髙竇松吉甯遲儲風釋仲冉鄂湛仇東匡榮伊昌婁蘭冷][\\u4E00-\\u9FA5]"),
    CJK("[\\u4E00-\\u9FA5]");
    ;
    // [\u4E00-\u9FA5]
    private String regexStr;
    RegexEnum(String regexStr){
        this.regexStr = regexStr;
    }

    public String getRegexStr() {
        return regexStr;
    }

    public static Map<RegexEnum,String> getRegexMap() {
        return new ArrayList<>(EnumSet.allOf(RegexEnum.class))
                .stream()
                .collect(Collectors.toMap(Function.identity(), RegexEnum::getRegexStr));
    }

    public static boolean isMatcherFind(RegexEnum regexEnum,String line){
        Pattern pattern = Pattern.compile(regexEnum.getRegexStr());
        Matcher matcher = pattern.matcher(line);
        return matcher.find();
    }
}

```

## ReadWriteUtil.java

```java
package com.fbtest.pr20210725.tests.pr20210731.RegexTest;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class ReadWriteUtil {
    public static void getFile(RegexEnum regexEnum, String filename){
        Path path = Paths.get(filename);

        try (BufferedReader bufferedReader = new BufferedReader(
                new FileReader(path.toFile(), StandardCharsets.UTF_8))) {

            // write new text file in the folder regexTest
            Path textFile = Paths.get("regexTest/"+regexEnum.name()+".txt");

            String line;

            try (BufferedWriter bw = Files.newBufferedWriter( // BufferedWriter
                    textFile, StandardCharsets.UTF_8, StandardOpenOption.CREATE,
                    StandardOpenOption.WRITE)) {

                bw.write(filename+",... ");
                bw.newLine();

                while ((line = bufferedReader.readLine()) != null) { // read line

                    if (RegexEnum.isMatcherFind(regexEnum,line)) {
                        // write
                        bw.write(line);
                        bw.newLine();
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Main.java

```java
package com.fbtest.pr20210725.tests.pr20210731.RegexTest;

import java.util.*;

/**
 * Read log file
 */
public class Main1 {
    public static void main(String[] args) {
        // list types of regexes
        List<RegexEnum> enumList = new ArrayList<>(EnumSet.allOf(RegexEnum.class));
        // list files to read
        Set<String> filesSet = new HashSet<>(Arrays.asList(new String[]{"log.txt"}));

        enumList.stream().forEach( regex ->{
                System.out.println(regex.name() + " processing...");
                // write file
                filesSet.stream().forEach(filename -> {
                    //System.out.println("filename:"+filename);
                    ReadWriteUtil.getFile(regex, filename);
                });
        });
    }
}
```