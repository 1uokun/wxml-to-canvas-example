import style from './style';

const getWxml = ({commodity}) => {
  return `
  <view class="card">
    <view class="bg" />
    <view class="commodityTitle">
        <text class="title1">近7天</text>
        <text class="title2">超低价</text>
    </view>
    <view class="commodityInfo">
        <view class="image" />
        <view class="priceInfo">
            <view class="price">
                <text class="y">¥</text>
                <text class="num">${commodity.price}</text>
            </view>
            <view class="btn">
                <text class="btnTxt">立即购买</text>
            </view>
        </view>
    </view>
  </view>
  `;
};

// rpx单位换算成px
const rpxToPxNum = _style => {
  const str = JSON.stringify(_style).replace(/"(-?\d+)rpx"/gi, (match, $1) => {
    return Number((($1 * wx.getSystemInfoSync().windowWidth) / 750)?.toFixed?.(2))
  });
  return JSON.parse(str);
};
const getStyle = ({yWidth, priceWidth}) => {
  style.y.width = yWidth+4;
  style.num.width = priceWidth;
  return rpxToPxNum(style);
};

export { getWxml, getStyle };
