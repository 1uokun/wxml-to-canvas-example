const { getWxml, getStyle } = require("./poster");

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    commodity: {},
  },
  lifetimes: {
    attached() {},
    detached() {},
  },
  methods: {
    api() {
      return new Promise(async (resolve) => {
        // 由于图片资源域名需要配置在微信后台，这里为了通用演示改用背景颜色
        setTimeout(() => {
          resolve({
            price: "13.99",
          });
        }, 1000);
      });
    },
    renderToCanvas() {
      return new Promise(async (resolve) => {
        // 1. 接口请求商品信息
        const commodity = await this.api();

        // 2. 预渲染计算DOM position
        this.setData({ commodity });

        // 3. 渲染完成后计算DOM layout
        wx.nextTick(async () => {
          const canvasWidget = this.selectComponent(".canvas-widget");
          const yWidth = await this.getYWidth();
          const priceWidth = await this.getPriceWidth();

          await canvasWidget.renderToCanvas({
            wxml: getWxml({ commodity }),
            style: getStyle({ yWidth, priceWidth }),
          });

          const { tempFilePath } = await canvasWidget.canvasToTempFilePath();
          resolve(tempFilePath);
        });
      });
    },
    promise(path) {
      wx.showLoading({
        title: "生成分享图片中",
        icon: "none",
        duration: 3000,
      });
      return new Promise(async (resolve) => {
        try {
          const imageUrl = await this.renderToCanvas();
          wx.hideLoading();
          resolve({
            title: "美团优选 明日达超市 真的真的省",
            imageUrl,
            path,
          });
        } catch (err) {
          wx.hideLoading();
        }
      });
    },

    // 获取¥宽度
    getYWidth() {
      return new Promise((resolve) => {
        wx.nextTick(() => {
          const query = this.createSelectorQuery();
          query.select(".y").boundingClientRect();
          query.exec((res) => {
            const width = res[0].width;
            resolve(width);
          });
        });
      });
    },
    // 获取price宽度
    getPriceWidth() {
      return new Promise((resolve) => {
        wx.nextTick(() => {
          const query = this.createSelectorQuery();
          query.select(".num").boundingClientRect();
          query.exec((res) => {
            const width = res[0].width;
            resolve(width);
          });
        });
      });
    },
  },
});
