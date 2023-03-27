# devtools-catch

灵感来自于 [devtools-detect](https://www.npmjs.com/package/devtools-detect),在此基础上添加了一些功能。

## 使用
```js
import devtoolsCatch from 'devtools-catch'
const customConfig = {}
const customAtOpenFunc = () => {
  console.log('devtools~')
}
const funcThis = {}
devtoolsCatch(
  customConfig,//如有需要
  customAtOpenFunc,//当devtools第一次打开时执行该函数;有默认函数，不需要时请传入空函数
  funcThis//如有需要
);

//添加devtoolschange的时间监听器对devtools的打开和关闭进行监听
window.addEventListener('devtoolschange', event => {
  console.log('Is DevTools open:', event.detail.isOpen);
  console.log('DevTools orientation:', event.detail.orientation);
});

```
## 配置
```js
config = {
  isOnce: false,//是否只监听一次，否则持续监听
  threshold: 170,//阈值，当outerWidth - innerWidth 超过该值则认为devtools打开
  intervalTime: 500,//检测间隔时间
  whiteHosts: ['localhost', '127.0.0.1'],//白名单，当页面host为白名单中的项目时进行检测
  blackHosts: [],//黑名单，当host在黑名单中时不进行检测，优先级高于白名单。（当黑名单不为空则对黑名单外的所有host进行检测）
}
```
