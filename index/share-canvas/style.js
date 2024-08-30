export default {
  commodity: {
    width: "520rpx",
    height: "416rpx",
    position: "relative",
    backgroundColor: "red",
  },
  bg: {
    width: "520rpx",
    height: "416rpx",
    position: "absolute",
    borderRadius: "12rpx",
    backgroundColor: "orange",
    left: "0rpx",
    top: "0rpx",
    zIndex: "-1",
  },
  commodityTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "520rpx",
    height: "102rpx",
  },
  title1: {
    height: "102rpx", // 必须
    lineHeight: "102rpx",
    width: "260rpx", // 520/2
    textAlign: "right",
    color: "#000000",
    fontSize: "42rpx",
    fontWeight: "bold",
  },
  title2: {
    height: "102rpx", // 必须
    lineHeight: "102rpx",
    width: "260rpx", // 520/2
    textAlign: "left",
    color: "#FD5155",
    fontSize: "42rpx",
    fontWeight: "bold",
  },
  commodityInfo: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "12rpx",
    marginLeft: "15rpx",
    width: "490rpx",
    height: "299rpx" /* 416-102-15 */,
  },
  image: {
    borderRadius: "12rpx",
    marginLeft: "8rpx",
    width: "283rpx",
    height: "283rpx",
    backgroundColor: "green",
  },
  priceInfo: {
    marginLeft: "30rpx",
    height: "150rpx",
    width: "199rpx",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  price: {
    width: "199rpx",
    height: "80rpx",
    display: "flex",
    flexDirection: "row",
  },
  y: {
    width: 0, // 傀儡属性，由外部控制
    height: "80rpx",
    lineHeight: "80rpx",
    color: "#FD5155",
    fontSize: "24rpx",
    fontWeight: "bold",
  },
  num: {
    width: 0, // 傀儡属性，由外部控制
    height: "80rpx",
    lineHeight: "80rpx",
    color: "#FD5155",
    fontSize: "40rpx",
    fontWeight: "bold",
  },
  btn: {
    width: "152rpx",
    height: "48rpx",
    backgroundColor: "#FD5155",
    borderRadius: "24rpx",
    textAlign: "center",
  },
  btnTxt: {
    height: "48rpx",
    lineHeight: "48rpx",
    textAlign: "center",
    color: "#ffffff",
    fontSize: "24rpx",
    fontWeight: "bold",
  },
};
