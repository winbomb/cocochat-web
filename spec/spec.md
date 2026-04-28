

## 5. 构建时间显示好阅读的方式

版本信息页面，构建时间改成标准时间格式，例如：2026年4月28日 21:35:32，而不要使用timestamp.



## 4. 修复onboard语言加载的问题

onboard页面，经常会出现国际化没有加载成功的情况，并且语言切换按钮也无法使用。



## 3. 优化机器人创建的逻辑

1、机器人创建增加password（用于matrix协议连接）

2、apikey创建不需要password，当matrix客户端通过用户名、密码登录时，自动创建一个apikey并返回给客户端。





## 2. 调整创建api_key页面

调整“创建机器人 API Key”页面：

1、变宽一点，name输入框、password输入框不要换行。

2、name输入框、password输入框不要自动填充，这是每次都要重写输入的内容。

## 1. bot_key增加password

在 配置 -> 机器人&Webhook 页面，新增api_key的时候，在“创建机器人 API Key”弹框中，增加password字段，该字段非必填，如果填了，调用后端接口的时候，加上password字段。