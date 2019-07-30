<template>
  <div style="margin-top: 30px">
    <div v-if="info.aim">
      <text class="goods-name">{{ info.aim.goodsName }}</text>
      <van-tag size="large" :color="tagColor[info.aim.goodsType]">{{ info.aim.goodsType }}</van-tag>
    </div>
    <div class="divide-block" v-if="info.recommendList.length">
      <text class="divide-text">相关结果</text>
      <van-cell-group>
        <van-cell v-for="item in info.recommendList" :key="item.goodsName" :title="item.goodsName">
          <view slot="right-icon">
            <van-tag :color="tagColor[item.goodsType]" plain>{{ item.goodsType }}</van-tag>
          </view>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-res",
  mounted() {
    this.info = JSON.parse(this.$root.$mp.query.res);
  },
  data() {
    return {
      info: {},
      tagColor: {
        干垃圾: "#2c2b29",
        湿垃圾: "#693f36",
        可回收物: "#0e6db6",
        有害垃圾: "#e43123"
      }
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.goods-name {
  font-size: 14px;
  line-height: 18px;
  margin-left: 20px;
  margin-right: 10px;
}
.divide-block {
  margin-top: 20px;
  margin-bottom: 20px;
  /deep/ .van-cell-group {
    margin-left: 5px;
    margin-top: 10px;
  }
}
.divide-text {
  margin-left: 5px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(69, 90, 100, 0.6);
  padding: 20px 15px 15px;
}
</style>


