---
title: 微信支付查询订单API
date: 2021-11-04 22:09
categories:
- java
- 第三方服务
tags:
- java
- 第三方服务
- 微信支付
---

什么时候会用到这个API？常规情况下，回调接口已经足够我们使用，用户支付成功后，微信会自动调用我们的回调接口进行回调，那么还需要这个API吗？
<!-- more -->
使用场景：微信服务器故障，我们的服务器故障，服务器端正在进行更新导致用户付款后端没有及时接收到微信的回调请求，那么此时我们就可以让用户点击按钮“更新支付状态”，此时再来调用这个API。

来看一下下面的java对象，是不是很熟悉？没错，这个接口的返回数据和回调接口是一样的，我们直接拿来复用一下。

```java
@Data
@Slf4j
public class WxchatCallbackSuccessData {

    /**
     * 商户订单号
     */
    private String orderId;

    /**
     * 微信支付系统生成的订单号
     */
    private String transactionId;

    /**
     * 交易状态
     * SUCCESS：支付成功
     * REFUND：转入退款
     * NOTPAY：未支付
     * CLOSED：已关闭
     * REVOKED：已撤销（付款码支付）
     * USERPAYING：用户支付中（付款码支付）
     * PAYERROR：支付失败(其他原因，如银行返回失败)
     */
    private String tradestate;

    /**
     * 支付完成时间
     */
    private Date successTime;

    /**
     * 交易类型
     * JSAPI：公众号支付
     * NATIVE：扫码支付
     * APP：APP支付
     * MICROPAY：付款码支付
     * MWEB：H5支付
     * FACEPAY：刷脸支付
     */
    private String 	tradetype;

    /**
     * 订单总金额
     */
    private BigDecimal totalMoney;


    public Date getSuccessTime() {
        return successTime;
    }

    public void setSuccessTime(String successTime) {
        // Hutool工具包的方法，自动识别一些常用格式的日期字符串
        this.successTime = DateUtil.parse(successTime);
    }
}
```



### 解析响应数据

和回调接口不同的是，我们的解析响应数据返回的不是Map集合，而是一个直接的对象，请求和创建微信订单的请求一样，我们往后放一放。

```java
/**
  * 解析响应数据
  * @param response 发送请求成功后，返回的数据
  * @return 微信返回的参数
  */
private static WxchatCallbackSuccessData resolverResponse(CloseableHttpResponse response) {
    try {
        // 1.获取请求码
        int statusCode = response.getStatusLine().getStatusCode();
        // 2.获取返回值 String 格式
        final String bodyAsString = EntityUtils.toString(response.getEntity());

        Gson gson = new Gson();
        if (statusCode == 200) {
            // 3.如果请求成功则解析成Map对象返回
            HashMap<String, String> resultMap = gson.fromJson(bodyAsString, HashMap.class);

            // 4.封装成我们需要的数据
            WxchatCallbackSuccessData callbackData = new WxchatCallbackSuccessData();
            callbackData.setSuccessTime(String.valueOf(resultMap.get("success_time")));
            callbackData.setOrderId(String.valueOf(resultMap.get("out_trade_no")));
            callbackData.setTransactionId(String.valueOf(resultMap.get("transaction_id")));
            callbackData.setTradestate(String.valueOf(resultMap.get("trade_state")));
            callbackData.setTradetype(String.valueOf(resultMap.get("trade_type")));
            String amount = String.valueOf(resultMap.get("amount"));
            HashMap<String,Object> amountMap = gson.fromJson(amount, HashMap.class);
            String total = String.valueOf(amountMap.get("total"));
            callbackData.setTotalMoney(new BigDecimal(total).movePointLeft(2));
            return callbackData;
        } else {
            if (StringUtils.isNoneBlank(bodyAsString)) {
                log.error("微信支付请求失败，提示信息:{}", bodyAsString);
                // 4.请求码显示失败，则尝试获取提示信息
                HashMap<String, String> resultMap = gson.fromJson(bodyAsString, HashMap.class);
                throw new DefaultException(resultMap.get("message"));
            }
            log.error("微信支付请求失败，未查询到原因，提示信息:{}", response);
            // 其他异常，微信也没有返回数据，这就需要具体排查了
            throw new IOException("request failed");
        }
    } catch (Exception e) {
        e.printStackTrace();
        throw new DefaultException(e.getMessage());
    } finally {
        try {
            response.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





### 发送查询微信订单请求

这样有两个请求，只是url不同，其余部分是一样的，一个是根据微信支付订单号查询，另一个是根据商户订单号查询。

```java
@Slf4j
public class WxPaySearchOrderUtil {


    /**
     * 根据微信支付系统生成的订单号查询订单详情
     * @param wxPayConfig 微信支付配置信息
     * @param transactionId 微信支付系统生成的订单号
     * @param wxPayClient 微信支付客户端请求对象
     * @return 微信订单对象
     */
    public static WxchatCallbackSuccessData searchByTransactionId(WxPayConfig wxPayConfig, String transactionId, CloseableHttpClient wxPayClient) {
        // 1.请求路径和对象
        String url = wxPayConfig.getDomain().concat("/v3/pay/transactions/id/").concat(transactionId).concat("?mchid=").concat(wxPayConfig.getMchId());
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Accept", "application/json");

        // 2.完成签名并执行请求
        CloseableHttpResponse response = null;
        try {
            response = wxPayClient.execute(httpGet);
        } catch (IOException e) {
            e.printStackTrace();
            throw new DefaultException("微信支付请求失败");
        }

        // 3.解析返回的数据
        WxchatCallbackSuccessData callbackData = resolverResponse(response);
        log.info("callbackData:{}",callbackData);
        return callbackData;
    }

    /**
     * 根据微信支付系统生成的订单号查询订单详情
     * @param wxPayConfig 微信支付配置信息
     * @param orderId 我们自己的订单id
     * @param wxPayClient 微信支付客户端请求对象
     * @return 微信订单对象
     */
    public static WxchatCallbackSuccessData searchByOrderId(WxPayConfig wxPayConfig, String orderId, CloseableHttpClient wxPayClient) {
        // 1.请求路径和对象
        String url = wxPayConfig.getDomain().concat("/v3/pay/transactions/out-trade-no/").concat(orderId).concat("?mchid=").concat(wxPayConfig.getMchId());
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Accept", "application/json");

        // 2.完成签名并执行请求
        CloseableHttpResponse response = null;
        try {
            response = wxPayClient.execute(httpGet);
        } catch (IOException e) {
            e.printStackTrace();
            throw new DefaultException("微信支付请求失败");
        }

        // 3.解析返回的数据
        WxchatCallbackSuccessData callbackData = resolverResponse(response);
        log.info("callbackData:{}",callbackData);
        return callbackData;
    }


    /**
     * 解析响应数据
     * @param response 发送请求成功后，返回的数据
     * @return 微信返回的参数
     */
    private static WxchatCallbackSuccessData resolverResponse(CloseableHttpResponse response) {
        try {
            // 1.获取请求码
            int statusCode = response.getStatusLine().getStatusCode();
            // 2.获取返回值 String 格式
            final String bodyAsString = EntityUtils.toString(response.getEntity());

            Gson gson = new Gson();
            if (statusCode == 200) {
                // 3.如果请求成功则解析成Map对象返回
                HashMap<String, String> resultMap = gson.fromJson(bodyAsString, HashMap.class);

                // 4.封装成我们需要的数据
                WxchatCallbackSuccessData callbackData = new WxchatCallbackSuccessData();
                callbackData.setSuccessTime(String.valueOf(resultMap.get("success_time")));
                callbackData.setOrderId(String.valueOf(resultMap.get("out_trade_no")));
                callbackData.setTransactionId(String.valueOf(resultMap.get("transaction_id")));
                callbackData.setTradestate(String.valueOf(resultMap.get("trade_state")));
                callbackData.setTradetype(String.valueOf(resultMap.get("trade_type")));
                String amount = String.valueOf(resultMap.get("amount"));
                HashMap<String,Object> amountMap = gson.fromJson(amount, HashMap.class);
                String total = String.valueOf(amountMap.get("total"));
                callbackData.setTotalMoney(new BigDecimal(total).movePointLeft(2));
                return callbackData;
            } else {
                if (StringUtils.isNoneBlank(bodyAsString)) {
                    log.error("微信支付请求失败，提示信息:{}", bodyAsString);
                    // 4.请求码显示失败，则尝试获取提示信息
                    HashMap<String, String> resultMap = gson.fromJson(bodyAsString, HashMap.class);
                    throw new DefaultException(resultMap.get("message"));
                }
                log.error("微信支付请求失败，未查询到原因，提示信息:{}", response);
                // 其他异常，微信也没有返回数据，这就需要具体排查了
                throw new IOException("request failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new DefaultException(e.getMessage());
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



### 使用方法

使用方法就更简单了，基本上是无脑使用。

```java
@Autowired
private WxPayConfig wxPayConfig;

@Autowired
private CloseableHttpClient wxPayClient;  

@ApiOperation("根据微信订单号查询订单")
@PostMapping("/search/order/transaction/{transactionId}")
public WxchatCallbackSuccessData searchByTransactionId(@PathVariable String transactionId) {
    return  WxPaySearchOrderUtil.searchByTransactionId(wxPayConfig,transactionId,wxPayClient);
}

@ApiOperation("根据商户订单号查询")
@PostMapping("/search/order/{orderId}")
public WxchatCallbackSuccessData searchByOrderId(@PathVariable String orderId) {
    return  WxPaySearchOrderUtil.searchByOrderId(wxPayConfig,orderId,wxPayClient);
}
```

