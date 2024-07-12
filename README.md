# notice-message

> Loading animations that run on the front-end interface

> 在前端界面上运行的加载动画

## 🌰 Demo 示例
todo

## 📦 Install 安装
``` bash
$ npm i loading-sign
```

## 🔨 Usage 使用
```javascript
import { Loading } from "loading-sign";

// Full screen display of Loading Sign
// 全屏显示加载状态
const unit = Loading.service({ body: true, fullscreen: true, lock: true });
setTimeout(() => { unit.close(); }, 2000);
```

## 🔠 Details 详细用法
```javascript
// const spinner = document.createElement('div');
// spinner.style.backgroundColor = 'white';
// spinner.style.width = '32px';
// spinner.style.height = '32px';
// spinner.style.borderRadius = '20%';
// spinner.style.animation = 'spin 1s linear infinite';
// document.head.appendChild(document.createElement('style')).textContent = `
// @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
// }`;

/**
 * 创建一个“加载动画”实例
 * 以服务的方式调用的全屏 Loading 是单例的：若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例
 * 以服务的方式调用的非全屏 Loading 不是单例的：每次调用都会创建一个新的 Loading 实例；
 * 但是，若在同一个 DOM 节点上，前一个非全屏 Loading 关闭前再次调用非全屏 Loading，则会返回现有非全屏 Loading 的实例
 */
const unit = Loading.service({
    /**
     * 加载动画要覆盖的 DOM 节点或 DOM 选择器
     * DOM nodes or DOM selectors to be covered by the loading animations
     */
    target: '.specified-region',
    /**
     * 是否将加载动画添加到 body 上
     * Whether to add the loading animation to the body
     */
    body: false,
    /**
     * 是否全屏显示加载动画
     * Whether to display the loading animation in fullscreen
     */
    fullscreen: false,
    /**
     * 是否锁定背景滚动
     * Whether to lock the background scrolling
     */
    lock: false,
    /**
     * 加载中显示的文本
     * The text to be displayed during loading
     */
    text: '加载中...',
    /**
     * 自定义加载动画元素
     * Custom loading spinner element
     */
    // spinner: spinner,
    /**
     * 遮罩的背景颜色
     * Background color of the mask
     */
    background: 'rgba(0, 0, 0, 0.7)',
    /**
     * 自定义样式类名
     * Custom class name
     */
    customClass: 'my-loading',
    /**
     * 加载动画的尺寸
     * Size of the loading spinner
     */
    size: 42,
});

setTimeout(() => { unit.close(); }, 2000);
```