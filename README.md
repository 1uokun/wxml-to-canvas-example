# wxml-to-canvas 最佳实践

小程序内通过**静态模板**和**样式**绘制 `canvas` ，导出图片，可用于生成分享图等场景。[代码片段]()

## 官方文档

> https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/component-plus/wxml-to-canvas.html

## 前言

### 建议文件结构

 1. 将需要绘制的`canvas`封装成一个组件，如`<share-canvas>`

    ```bash
    #component/share-canvas
     - /components
      - /share-canvas
       - index.js
       - index.json
       - index.wxml
       - index.wxss
       - poster.js
       - style.js
    #page
     - index.js
     - index.json
     - index.wxml
     - index.wxss
    ```

 2. 本质上，`renderToCanvas({wxml, style}): Promise` 获取的`wxml`和`style`都是**字符串**，而非`index.wxml`和`index.wxss`文件。

    因此 wxml 模板写在`poster.js`文件内,样式写在`style.js`内：

    ```js
    import { getWxml, getStyle } from "./poster";
    ```

 3. `canvas`的特点就是不能用动态布局，**即每一个区块都必须确定宽高** 🚩🚩🚩

    所以`<share-canvas>`内的`index.wxml`除了引入`<wxml-to-canvas>`组件之外，
    <br/>还需要承担 **预渲染动态 DOM 后获取实得尺寸** 的职能。

    ```html
    <view class="hidden">
      <wxml-to-canvas class="canvas-widget" />
      <view class="dynamic"> ... </view>
    </view>
    ```

### 不同的 CSS 支持情况

默认弹性布局（flex），但是：

 1. 文本不能写在`<view></view>`里，必须用`<text></text>`包裹。
 2. 不支持自动撑开高度，必须给一个`height`属性；高度尽量给多，**不然差 1px 整个就都不会显示**。
 3. 父级水平布局(`flexDirection:row`)时，`<text>`必须要有一个`width`属性，且值小于父级的宽度。
 4. `text-align:center`必须有`width`属性才生效
 5. `vertical-align`必须有`height`属性才生效

背景&图片：

 4. 只支持`backgroundColor`，不支持`background-image`。

    > _拓展：PC 端的`html2canvas`支持背景图，但是会导致图片模糊_

 5. `<image>`的`src`必须是 HTTPS 链接才能渲染，否则报错会导致整个 canvas 无法渲染。
    > _否则报错：`不在以下 downloadFile 合法域名列表中`_

其他：

 6. 样式`class`只能一个，不支持多个。
 7. 组件不能放在 `wx:if` 以内，必须在`onLoad`之前就能保持渲染状态。
    > 否则会报错：
    > <br/>_`"canvasToTempFilePath:fail Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The image argument is a canvas element with a width or height of 0."`_

## 实施过程

> 以 “美团优选 明日达超市” 小程序分享电商商品卡片图为例

<img src="preview.jpg" />
<br/>
<img src="img.png" />

要实现"¥13.99"水平布局

```html
<view class="price">
  <text class="y">¥</text>
  <text class="num">13.99</text>
</view>
```

wxml 常规版，用 flex 动态布局

```json
{
  "price": {
    "width": "199rpx",
    "height": "80rpx",
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "y": {
    "color": "#FD5155",
    "fontSize": "24rpx",
    "fontWeight": "bold"
  },
  "num": {
    "color": "#FD5155",
    "fontSize": "40rpx",
    "fontWeight": "bold"
  }
}
```

发现没有渲染出来，按 canvas 特性，有几个问题：

1. 没有设置高度
2. 水平布局下没有设置宽度

```diff
{
  "price": {
    "width": "199rpx",
    "height": "80rpx",
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
  },
  "y": {
+    "width": 0, // 傀儡属性，由外部控制
+    "height": "80rpx",
+    "lineHeight": "80rpx",
    "color": "#FD5155",
    "fontSize": "24rpx",
    "fontWeight": "bold"
  },
  "num": {
+    "width": 0, // 傀儡属性，由外部控制
+    "height": "80rpx",
+    "lineHeight": "80rpx",
    "color": "#FD5155",
    "fontSize": "40rpx",
    "fontWeight": "bold"
  }
}
```
