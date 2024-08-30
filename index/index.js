Page({
  data: {
    src: "",
  },
  onShareAppMessage(e) {
    const path = "/pages/mall/index"; // 被分享的页面路由
    const shareCanvas = this.selectComponent('#shareCanvas');
    return {
      title: "美团优选 明日达超市 真的真的省",
      // 兜底默认分享图
      imageUrl: "",
      path,
      // 来自<share-canvas>组件内部方法promise
      promise: shareCanvas.promise(path),
    };
  },
});
