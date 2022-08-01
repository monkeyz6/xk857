---
title: Hash结构实战之淘宝短链接
date: 2022-08-01 15:50
categories:
- java
- Redis
tags:
- java
- Redis
---

网址链接过长给用户不好的体验，缩短链接长度方便社交化传播，还能跟踪点击量和统计。通过算法缩短链接作为key,然后可根据key获取真正指向的地址。
<!-- more -->

### 算法解析

生成a~z A~z 0~9的字符，后面有用

```java
public static void main(String[] args) {
    System.out.print("{ ");
    for (int i = 1; i <= 26; i++) {
        System.out.print("\"" + (char) (64 + i) + "\"" + ",");
    }
    for (int i = 1; i <= 26; i++) {
        System.out.print("\"" + (char) (96 + i) + "\"" + ",");
    }
    for (int i = 1; i <= 10; i++) {
        if (i == 10) {
            System.out.print("\"" + (char) (47 + i) + "\"");
        } else {
            System.out.print("\"" + (char) (47 + i) + "\"" + ",");
        }
    }
    System.out.print(" }");
}
```

结果：
```java
{"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9" }
```

直接上代码，代码中有注释，下面总结：
```java
public static final String[] chars = new String[]{"A", "B", "C", "D", "E", "F", "G", "H", 
       "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
       "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", 
       "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

/**
 * 长链接转换为4个短KEY
 *
 * @param url
 * @return
 */
public static String[] shortUrl(String url) {
    String key = "";
    // 对地址进行md5加密
    String sMD5EncryptResult = DigestUtils.md5DigestAsHex((key + url).getBytes());
    String hex = sMD5EncryptResult;
    String[] resUrl = new String[4];
    for (int i = 0; i < 4; i++) {
        // 取出8位字符串，md5 32位，被切割为4组，每组8位字符
        String sTempSubString = hex.substring(i * 8, i * 8 + 8);
        // Long.parseLong(sTempSubString, 16) 将其转换成16进制，详情见说明1尝试理解
        // 先转换成16进制，然后用 0x3FFFFFF 进行位与运算，目的是格式化截取前30位
        long lHexLong = 0x3FFFFFF & Long.parseLong(sTempSubString, 16);
        String outChars = "";
        for (int j = 0; j < 6; j++) {
            // 0x0000003D的10进制是61，61代表chars数组长度62的0~61的坐标
            // 0x0000003D & lHexLong 进行位与运算，就是格式化为6位，即61内的数字
            // 保障了index绝对是61以内的值
            long index = 0x0000003D & lHexLong;
            outChars += chars[(int) index];
            // 每次循环按位移5位，因为30位的二进制分6次循环，即每次右移5位
            lHexLong = lHexLong >> 5;
        }
        resUrl[i] = outChars;
    }
    return resUrl;
}

@Test
public void test06() {
    // 输出短网址
    System.out.println(Arrays.toString(shortUrl("https://www.xk857.com")));
}
```

说明1：

```java
/**
 * 2进制:111111111111111111111111111111
 * 2进制:1010110011010101011100100001111
 * 格式化后:10110011010101011100100001111
 * 0x0000003D:2进制:111101
 * 0x0000003D∶10进制:61
 */
@Test
public void test07() {
    String str = "566ab90f";
    System.out.println("2进制:" + Long.toBinaryString(0x3FFFFFFF));
    System.out.println("2进制:" + Long.toBinaryString(0x566ab90f));
    System.out.println("格式化后:" + Long.toBinaryString(0x3fffffff & 0x566ab90f));
    System.out.println("0x0000003D:2进制:" + Long.toBinaryString(0x0000003D));
    System.out.println("0x0000003D∶10进制:" + Long.parseLong("0000003D", 16));
}
```
::: tip
解析：将长网址md5生成32位签名串，分为4段，每段8个字节对这四段循环处理，取8个字节，将他看成16进制串与0x3fffffff(30位1）与操作，即超过30位的忽略处理这30位分成6段，每5位的数字作为字母表的索引取得特定字符，依次进行获得6位字符串。总的 md5串可以获得4个6位串,取里面的任意一个就可作为这个长url 的短 url 地址
:::



### 实战-短链接接口开发

::: tip
《短链接转换器》的原理:
1．长链接转换为短链接：长链接转换为短链接加密串key,然后存储于redis的hash结构中。
2.重定向到原始的url：通过加密串key到redis找出原始url，然后重定向出去
:::


工具类：ShortUrlUtils

```java
package com.xk857.util;

import org.springframework.util.DigestUtils;

/**
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/23 11:35
 */
public class ShortUrlUtils {


    public static final String[] chars = new String[]{"A", "B", "C", "D", "E", "F", "G",
            "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
            "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
            "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8",
            "9"};

    /**
     * 长链接转换为4个短KEY
     *
     * @param url
     * @return
     */
    public static String[] shortUrl(String url) {
        String key = "";
        // 对地址进行md5加密
        String sMD5EncryptResult = DigestUtils.md5DigestAsHex((key + url).getBytes());
        String hex = sMD5EncryptResult;
        String[] resUrl = new String[4];
        for (int i = 0; i < 4; i++) {
            // 取出8位字符串，md5 32位，被切割为4组，每组8位字符
            String sTempSubString = hex.substring(i * 8, i * 8 + 8);
            // Long.parseLong(sTempSubString, 16) 将其转换成16进制，详情见说明1尝试理解
            // 先转换成16进制，然后用 0x3FFFFFF 进行位与运算，目的是格式化截取前30位
            long lHexLong = 0x3FFFFFF & Long.parseLong(sTempSubString, 16);
            String outChars = "";
            for (int j = 0; j < 6; j++) {
                // 0x0000003D的10进制是61，61代表chars数组长度62的0~61的坐标
                // 0x0000003D & lHexLong 进行位与运算，就是格式化为6位，即61内的数字
                // 保障了index绝对是61以内的值
                long index = 0x0000003D & lHexLong;
                outChars += chars[(int) index];
                // 每次循环按位移5位，因为30位的二进制分6次循环，即每次右移5位
                lHexLong = lHexLong >> 5;
            }
            resUrl[i] = outChars;
        }
        return resUrl;
    }

}
```

接口开发：

```java
@RestController
@RequestMapping("/api/short")
public class ShortUrlController {

    @Autowired
    private RedisTemplate redisTemplate;
    private final static  String SHORT_KEY ="short:url";

    @GetMapping("/encode")
    public String encode(String url){
        String[] keys = ShortUrlUtils.shortUrl(url);
        String key = keys[0];
        redisTemplate.opsForHash().put(SHORT_KEY,key,url);
        return "http://localhost:8080/api/short/"+ key;
    }

    /**
     * 重定向到原始的
     * @param key
     */
    @GetMapping(value = "/{key}")
    public void decode(@PathVariable String key,HttpServletResponse response) {
        String url = (String)redisTemplate.opsForHash().get(SHORT_KEY,key);
        System.out.println(url);
        try {
            response.sendRedirect(url);
        }catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
