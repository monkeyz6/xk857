---
title: 微信支付之商家转账API
date: 2021-11-05 13:15
categories:
- java
- 第三方服务
tags:
- java
- 第三方服务
- 微信支付
---

这个功能就比较复杂了，首先是得有90天的资金流水才能开通，其次开通后还需要在官网进行配置，不能直接调用，并且限制了IP地址。
<!-- more -->




如下图所示，首先需要进行产品设置，将里面都设置好后才能进行开发，只开通功能是远远不够的。

![image-20220805130622451](https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/image-20220805130622451.png)

![image-20220805130533437](https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/image-20220805130533437.png)

### 商家转账设置说明及避坑指南

- 页面发起：即登录微信支付后，手动输入用户信息，进行转账
- 验密批量API：开启这个才能调用API，否则会提示没有调用API的权限

单笔付款区间默认1-200元，最低改为0.3，所以你去提现0.01去做测试是没有效果的。

![image-20220805164244551](https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/image-20220805164244551.png)

::: danger
这个钱不是从“基本账户”扣除的，而是从**运营账户**扣除的，如果提示“提现失败，商家运营账户资金不足”，那你可就要看看运营账户里面是不是没钱了。
:::



### 请求参数及讲解

商家转账支持一次性多次转账，一次最多可以发起3000笔转账，估计是为了防止营销手段，所以该接口设置了QPS为50，注意自己的业务，别踩雷！

那么数据可以理解为，转账说明，和详细说明。也就是由转账信息+转账对象列表组成，请求的json官方实例如下。

```json
{
  "appid": "wxf636efh567hg4356",
  "out_batch_no": "plfk2020042013",
  "batch_name": "2019年1月深圳分部报销单",
  "batch_remark": "2019年1月深圳分部报销单",
  "total_amount": 4000000,
  "total_num": 200,
  "transfer_detail_list": [
    {
      "out_detail_no": "x23zy545Bd5436",
      "transfer_amount": 200000,
      "transfer_remark": "2020年4月报销",
      "openid": "o-MYE42l80oelYMDE34nYD456Xoy",
      "user_name": "757b340b45ebef5467rter35gf464344v3542sdf4t6re4tb4f54ty45t4yyry45"
    }
  ]
}
```

那么我们可以封装为：

```java
/**
 * @author cv大魔王
 * @version 1.0
 * @description 微信支付商家转账到零钱请求参数
 * @date 2022/8/4
 */
@Data
public class WechatTransferBatchesParam {

    /**
     * 商户系统内部的商家批次单号，对应 out_batch_no，
     */
    private String batchId;

    /**
     * 该笔批量转账的名称，对应 batch_name，示例值：2019年1月深圳分部报销单
     */
    private String title;

    /**
     * 批次备注
     */
    private String remark;

    /**
     * 转账总金额
     */
    private BigDecimal totalMoney;

    /**
     * 转账明细列表
     */
    private List<transferDetail> transferDetailList;

    @Data
    public static class transferDetail {

        /**
         * 商户系统内部的商家批次单号，对应 out_detail_no，
         */
        private String batchId;

        /**
         * 转账金额
         */
        private BigDecimal totalDetailMoney;

        /**
         * 转账备注
         */
        private String detailRemark;

        /**
         * openid是微信用户在公众号（小程序）appid下的唯一用户标识
         */
        private String openid;
    }
}
```





### 商家转账请求工具类

这里和发起创建支付订单的请求相似，因此不单独列出，首先是封装转账请求参数，然后是获取请求对象发起请求，完成签名验证发送请求，最后解析数据，如果转账失败则返回提示信息给用户。

```java
@Slf4j
public class WxPayTransferBatchesUtils {

    /**
     * 发起商家转账，支持批量转账
     *
     * @param wxPayConfig 微信配置信息
     * @param param 转账请求参数
     * @param wxPayClient 微信请求客户端（）
     * @return 微信支付二维码地址
     */
    public static String transferBatches(WxPayConfig wxPayConfig, WechatTransferBatchesParam param, CloseableHttpClient wxPayClient) {
        // 1.获取请求参数的Map格式
        Map<String, Object> paramsMap = getParams(wxPayConfig, param);

        // 2.获取请求对象，WxApiType.TRANSFER_BATCHES="/v3/transfer/batches"
        HttpPost httpPost = getHttpPost(wxPayConfig,WxApiType.TRANSFER_BATCHES , paramsMap);

        // 3.完成签名并执行请求
        CloseableHttpResponse response = null;
        try {
            response = wxPayClient.execute(httpPost);
        } catch (IOException e) {
            e.printStackTrace();
            throw new DefaultException("商家转账请求失败");
        }

        // 4.解析response对象
        HashMap<String, String> resultMap = resolverResponse(response);
        if (resultMap != null) {
            // batch_id微信批次单号，微信商家转账系统返回的唯一标识
            return resultMap.get("batch_id");
        }
        return null;
    }


    /**
     * 解析响应数据
     * @param response 发送请求成功后，返回的数据
     * @return 微信返回的参数
     */
    private static HashMap<String, String> resolverResponse(CloseableHttpResponse response) {
        try {
            // 1.获取请求码
            int statusCode = response.getStatusLine().getStatusCode();
            // 2.获取返回值 String 格式
            final String bodyAsString = EntityUtils.toString(response.getEntity());

            Gson gson = new Gson();
            if (statusCode == 200) {
                // 3.如果请求成功则解析成Map对象返回
                HashMap<String, String> resultMap = gson.fromJson(bodyAsString, HashMap.class);
                return resultMap;
            } else {
                if (StringUtils.isNoneBlank(bodyAsString)) {
                    log.error("商户转账请求失败，提示信息:{}", bodyAsString);
                    // 4.请求码显示失败，则尝试获取提示信息
                    HashMap<String, String> resultMap = gson.fromJson(bodyAsString, HashMap.class);
                    throw new DefaultException(resultMap.get("message"));
                }
                log.error("商户转账请求失败，未查询到原因，提示信息:{}", response);
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


    /**
     * 获取请求对象（Post请求）
     *
     * @param wxPayConfig 微信配置类
     * @param apiType     接口请求地址
     * @param paramsMap   请求参数
     * @return Post请求对象
     */
    private static HttpPost getHttpPost(WxPayConfig wxPayConfig, WxApiType apiType, Map<String, Object> paramsMap) {
        // 1.设置请求地址
        HttpPost httpPost = new HttpPost(wxPayConfig.getDomain().concat(apiType.getType()));

        // 2.设置请求数据
        Gson gson = new Gson();
        String jsonParams = gson.toJson(paramsMap);

        // 3.设置请求信息
        StringEntity entity = new StringEntity(jsonParams, "utf-8");
        entity.setContentType("application/json");
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        return httpPost;
    }

    /**
     * 封装转账请求参数
     *
     * @param wxPayConfig 微信的配置文件
     * @param param 批量转账请求数据
     * @return 封装后的map对象
     */
    private static Map<String, Object> getParams(WxPayConfig wxPayConfig, WechatTransferBatchesParam param) {
        Map<String, Object> paramsMap = new HashMap<>();
        paramsMap.put("appid", wxPayConfig.getAppid());
        paramsMap.put("out_batch_no", param.getBatchId());
        paramsMap.put("batch_name", param.getTitle());
        paramsMap.put("batch_remark", param.getRemark());
        paramsMap.put("total_amount", param.getTotalMoney().multiply(new BigDecimal("100")).intValue());
        paramsMap.put("total_num", param.getTransferDetailList().size());

        // 存储转账明细，一次最多三千笔
        if (param.getTransferDetailList().size() > 3000) {
            throw new DefaultException("发起批量转账一次最多三千笔");
        }
        List<Map<String, Object>> detailList = new ArrayList<>();
        for (WechatTransferBatchesParam.transferDetail detail : param.getTransferDetailList()) {
            Map<String, Object> detailMap = new HashMap<>();
            detailMap.put("out_detail_no",detail.getBatchId());
            detailMap.put("transfer_amount",detail.getTotalDetailMoney().multiply(new BigDecimal("100")).intValue());
            detailMap.put("transfer_remark",detail.getDetailRemark());
            detailMap.put("openid",detail.getOpenid());
            detailList.add(detailMap);
        }
        paramsMap.put("transfer_detail_list", detailList);
        return paramsMap;
    }
}
```



### 使用方法

```java
@Autowired
private WxPayConfig wxPayConfig;

@Autowired
private CloseableHttpClient wxPayClient;
```

```java
@ApiOperation("转账测试")
@GetMapping("/transfer/batches")
public String transferBatches() {
    WechatTransferBatchesParam param = new WechatTransferBatchesParam();
    String batchId = IdWorker.getIdStr();
    log.info("转账Id:{}", batchId);
    param.setBatchId(batchId);
    param.setTitle("转账测试");
    param.setRemark("转账测试");
    param.setTotalMoney(new BigDecimal("0.02"));


    // 批量转账，可以同时转账给多人，但是不能超过3000，我这里只转账给一个人，只用来测试
    List<WechatTransferBatchesParam.transferDetail> detailList = new ArrayList<>();
    WechatTransferBatchesParam.transferDetail detail = new WechatTransferBatchesParam.transferDetail();
    detail.setBatchId(batchId);
    detail.setTotalDetailMoney(new BigDecimal("0.02"));
    detail.setDetailRemark("转账测试详情");
    detail.setOpenid("DF7E6901802E9F75A6FB45137C6D3685");
    detailList.add(detail);


    param.setTransferDetailList(detailList);
    return WxPayTransferBatchesUtils.transferBatches(wxPayConfig,param,wxPayClient);
}
```
