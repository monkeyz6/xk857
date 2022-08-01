---
title: Hash结构实战之电商购物车
date: 2022-08-01 15:29
categories:
- java
- Redis
tags:
- java
- Redis
---

购物车的数据自然是加载的越快越好，商城网站中购物车数据量大访问次数多，属于频繁读写类型的数据。使用MySQL存储会给数据库带来压力的同时，降低购物车的读写性能，因此使用Redis来解决这个问题。
<!-- more -->

::: tip
- 购物车数据结构介绍：一个购物车里面，存在多个购物项，因此购物车结构是一个双层Map
  - Map<String,Map<String,String>>
  - 第一层Map，Key是用户id
  - 第二层Map，Key是购物车中商品id，Value是购物车数据
- 对应redis里面的存储 --- redis里面有多种数据结构，应该使用哪种？答案是 hash结构
- 注：这里模拟在线教育平台购物车，因此命名使用video
:::


### 编写购物车准备工作

单个商品对象 CartItemVO

```java
/**
 * 单个商品卡片对象
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/21 7:46
 */
public class CartItemVO {

    /**
     * 商品id
     */
    private Integer productId;

    /**
     * 购买数量
     */
    private Integer buyNum;

    /**
     * 商品标题
     */
    private String productTitle;

    /**
     * 图片
     */
    private String productImg;

    /**
     * 商品单价
     */
    private int price ;

    /**
     * 总价格，单价+数量
     */
    private int totalPrice;


    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Integer getBuyNum() {
        return buyNum;
    }

    public void setBuyNum(Integer buyNum) {
        this.buyNum = buyNum;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public String getProductImg() {
        return productImg;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg;
    }

    /**
     * 商品单价 * 购买数量
     * @return
     */
    public int getTotalPrice() {
        return this.price*this.buyNum;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
}
```

购物车对象

```java
/**
 * 购物车对象
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/21 7:58
 */
public class CartVO {

    /**
     * 购物项
     */
    private List<CartItemVO> cartItems;

    /**
     * 购物车总价格
     */
    private Integer totalAmount;

    /**
     * 总价格
     * @return
     */
    public int getTotalAmount() {
        return cartItems.stream().mapToInt(CartItemVO::getTotalPrice).sum();
    }

    public List<CartItemVO> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemVO> cartItems) {
        this.cartItems = cartItems;
    }

}
```

编写模拟数据，这里为了简便数据直接存到map中模拟 VideoDao

```java
@Repository
public class VideoDao {


    private static Map<Integer, VideoDO> map = new HashMap<>();

    static {
        map.put(1,new VideoDO(1,"商品1","https://图片地址",1099));
        map.put(2,new VideoDO(2,"商品2","https://图片地址",79));
        map.put(3,new VideoDO(3,"商品3","https://图片地址",49));
        map.put(4,new VideoDO(4,"商品4","https://图片地址",49));
        map.put(5,new VideoDO(5,"商品5","https://图片地址",49));
        map.put(6,new VideoDO(6,"商品6","https://图片地址",59));
    }


    /**
     * 模拟从数据库找
     * @param videoId
     * @return
     */
    public VideoDO findDetailById(int videoId) {
        return map.get(videoId);
    }

}

```

Video

```java
@Data
@AllArgsConstructor
public class VideoDO implements Serializable {

    private int id;

    private String title;

    private String img;

    private int price;
}
```

json工具类-序列化与反序列化

```java
package com.xk857.util;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * json序列化
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/21 7:58
 */
public class JsonUtil {


    private static final ObjectMapper MAPPER = new ObjectMapper();


    /**
     * 把对象转字符串
     * @param data
     * @return
     */
    public static String objectToJson(Object data){
        try {
            return MAPPER.writeValueAsString(data);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


    /**
     * json字符串转对象
     * @param jsonData
     * @param beanType
     * @param <T>
     * @return
     */
    public static <T> T jsonToPojo(String jsonData, Class<T> beanType){

        try {
            T t = MAPPER.readValue(jsonData,beanType);
            return t;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

}

```



### 加入购物车接口开发

```java
package com.xk857.controler;

import com.xk857.dao.VideoDao;
import com.xk857.model.VideoDO;
import com.xk857.util.JsonUtil;
import com.xk857.vo.CartItemVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundHashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 购物车接口
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/21 9:04
 */
@RestController
@RequestMapping("api/cart")
public class CardController {

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private VideoDao videoDao;

   @RequestMapping("add")
    public String addCart(int videoId,int buyNum) {
        // 获取购物车
        BoundHashOperations<String, Object, Object> myCart = getMyCartOps();
        Object cacheObj = myCart.get(videoId+"");
        String result = "";
        if (cacheObj!=null) {
            result = (String) cacheObj;
        }

        // 购物车没这个商品
        if (cacheObj == null) {
            CartItemVO cartItem = new CartItemVO();
            VideoDO videoDO = videoDao.findDetailById(videoId);

            cartItem.setBuyNum(buyNum);
            cartItem.setPrice(videoDO.getPrice());
            cartItem.setProductId(videoDO.getId());
            cartItem.setProductImg(videoDO.getImg());
            cartItem.setProductTitle(videoDO.getTitle());

            myCart.put(videoId+"", JsonUtil.objectToJson(cartItem));
        }else {
            // 商品购买数量
            CartItemVO cartItemVO = JsonUtil.jsonToPojo(result, CartItemVO.class);
            // 老的商品数量加新的商品数量
            if (buyNum+cartItemVO.getBuyNum()<=0){
                myCart.delete(videoId+"");
                return "商品已删除";
            }
            cartItemVO.setBuyNum(buyNum+cartItemVO.getBuyNum());
            myCart.put(videoId+"", JsonUtil.objectToJson(cartItemVO));
        }

        return "成功";
    }

    /**
     * 抽取我的购物车通用方法
     * @return
     */
    private BoundHashOperations<String,Object,Object> getMyCartOps() {
        String key = getCartKey();
        return redisTemplate.boundHashOps(key);
    }


    /**
     * 获取购物车的Key
     * @return
     */
    private String getCartKey() {
        // 用户id，实际业务使用拦截器获取
        int userId = 88;
        String cartKey = String.format("video:cart:%s", userId);
        return cartKey;
    }
}
```



### 查看购物车和清空购物车

查看购物车

```java
@GetMapping("/mycart")
public JsonData findMyCart(){
    BoundHashOperations<String,Object,Object> myCart = getMyCartOps();
    List<Object> itemList = myCart.values();
    List<CartItemVO> cartItemVOList = new ArrayList<>();

    for(Object item: itemList){
        CartItemVO cartItemVO = JsonUtil.jsonToPojo((String)item,CartItemVO.class);
        cartItemVOList.add(cartItemVO);
    }

    //封装成cartvo
    CartVO cartVO = new CartVO();
    cartVO.setCartItems(cartItemVOList);

    return JsonData.buildSuccess(cartVO);
}
```

清空购物车

```java
@GetMapping("/clear")
public JsonData clear() {
    String cartKey = getCartKey();
    redisTemplate.delete(cartKey);
    return JsonData.buildSuccess();
}
```

根据商品id删除商品

```java
@GetMapping("/delete/{videoId}")
public JsonData deleteById(@PathVariable String videoId) {
    BoundHashOperations<String, Object, Object> myCart = getMyCartOps();
    myCart.delete(videoId+"");
    return JsonData.buildSuccess();
}
```

