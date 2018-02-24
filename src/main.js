import Vue from 'vue'
import App from './App'

// 链接到 ./router/index.js，在其中配置路由相关信息
import router from './router/router.js'

// 调用loading组件（自定义组件）
import Loading from '@/ui/loading'
Vue.use(Loading);

// 调用loading组件（通过npm安装的外部组件）
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: '../static/loading-svg/loading-bars.svg'
});

Vue.config.productionTip = false


// styles
import './assets/css/base.css'

import './assets/css/login.css'
import './assets/css/product.css'

// 全局方法

/*
* 获取类型
* return：
* 	['boolean', 'number', 'string', 'function', 'array', 'date', 'regExp', 'undefined', 'null', 'object']的一项
*/
Vue.prototype.getType = function(obj){
	var toString = Object.prototype.toString;
   	var map = {
      	'[object Boolean]'  : 'boolean', 
      	'[object Number]'   : 'number', 
      	'[object String]'   : 'string', 
      	'[object Function]' : 'function', 
      	'[object Array]'    : 'array', 
      	'[object Date]'     : 'date', 
      	'[object RegExp]'   : 'regExp', 
      	'[object Undefined]': 'undefined',
      	'[object Null]'     : 'null', 
      	'[object Object]'   : 'object'
  	};
  	if(obj instanceof Element) {
  	     return 'element';
  	}
  	return map[toString.call(obj)];
}

/*
*	对象（数组）深拷贝
*	@param:
*		target被扩展的对象
*		length参数的数量
*		deep是否深度操作
*/
Vue.prototype.deepClone = function(){
	
　　var options, name, src, copy, copyIsArray, clone,
　　　　target = arguments[0] || {},
　　　　i = 1,
　　　　length = arguments.length,
　　　　deep = false;

　　// target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
　　// deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
　　// 然后把第二个参数赋值给target
　　if ( typeof target === "boolean" ) {
　　　　deep = target;
　　　　target = arguments[1] || {};

　　　　// 将i赋值为2，跳过前两个参数
　　　　i = 2;
　　}

　　// target既不是对象也不是函数则把target设置为空对象。
　　if ( typeof target !== "object" && !this.getType(target) === 'function' ) {
　　　　target = {};
　　}

　　// 如果只有一个参数，则把jQuery对象赋值给target，即扩展到jQuery对象上
　　if ( length === i ) {
　　　　target = this;

　　　　// i减1，指向被扩展对象
　　　　--i;
　　}

　　// 开始遍历需要被扩展到target上的参数

　　for ( ; i < length; i++ ) {
　　　　// 处理第i个被扩展的对象，即除去deep和target之外的对象
　　　　if ( (options = arguments[ i ]) != null ) {
　　　　　　// 遍历第i个对象的所有可遍历的属性
　　　　　　for ( name in options ) {
　　　　　　　　// 根据被扩展对象的键获得目标对象相应值，并赋值给src
　　　　　　　　src = target[ name ];
　　　　　　　　// 得到被扩展对象的值
　　　　　　　　copy = options[ name ];

　　　　　　　　// 这里为什么是比较target和copy？不应该是比较src和copy吗？
　　　　　　　　if ( target === copy ) {
　　　　　　　　　　continue;
　　　　　　　　}

　　　　　　　　// 当用户想要深度操作时，递归合并
　　　　　　　　// copy是纯对象或者是数组
　　　　　　　　if ( deep && copy && ( this.getType(copy) === 'object' || (copyIsArray = this.getType(copy) === 'array') ) ) {
　　　　　　　　　　// 如果是数组
　　　　　　　　　　if ( copyIsArray ) {
　　　　　　　　　　　　// 将copyIsArray重新设置为false，为下次遍历做准备。
　　　　　　　　　　　　copyIsArray = false;
　　　　　　　　　　　　// 判断被扩展的对象中src是不是数组
　　　　　　　　　　　　clone = src && this.getType(src) === 'array' ? src : [];
　　　　　　　　　　} else { 
　　　　　　　　　　　　// 判断被扩展的对象中src是不是纯对象
　　　　　　　　　　　　clone = src && this.this.getType(src) === 'object' ? src : {};
　　　　　　　　　　}

　　　　　　　　　　// 递归调用extend方法，继续进行深度遍历
　　　　　　　　　　target[ name ] = this.deepClone( deep, clone, copy );

　　　　　　　　// 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
　　　　　　　　} else if ( copy !== undefined ) {
　　　　　　　　　　target[ name ] = copy;
　　　　　　　　}
　　　　　　}
　　　　}
　　}

　　// 原对象被改变，因此如果不想改变原对象，target可传入{}
　　return target;
}

/* 
* 事件模拟
* @param:
*   1.dom（String）-- 需要触发模拟事件的原生dom元素
*   2.eventType（String）-- 需要触发的事件
*/
Vue.prototype.triggerEvent = function(dom, eventType){
  // 鼠标事件的列表
  let mouseEventType = ['click', 'hover', 'mouseover', 'mouseenter', 'mouseout', 'mouseleave', 'dbclick'];
  // 键盘事件列表
  let keyboardEventType = ['keydown', 'keypress', 'keyup'];
  let event;

  // 判断事件类型（鼠标事件、键盘事件或其他事件）
  if(mouseEventType.indexOf(eventType) != 0){
    event = document.createEvent('MouseEvent');
    event.initMouseEvent(eventType, true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }else if(keyboardEventType.indexOf(eventType) != 0){
    event = document.createEvent('KeyboardEvent');
    event.initKeyboardEvent(eventType, true, true, document.defaultView, 'a', 0, 'Shift', 0);
  }else{
    event = document.createEvent('HTMLEvents');
    event.initEvent(eventType, true, false);
  }
  dom.dispatchEvent(event);
}

/* 
* 去除数字前面的0，相当于trim
*/
Vue.prototype.numberTrim = function(num){
  let arr = num.split('');
  let index;
  let allZero = true;
  let result;
  for(let i=0;i<arr.length;i++){
    if(arr[i] == 0){
      index = i;
    }else{
      allZero = false;
      break;
    }
  }
  if(typeof index == 'undefined'){
    result = num
  }else{
    result = arr.slice(0-index+1)
    if(allZero) result = 0;
  }
  return result;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
