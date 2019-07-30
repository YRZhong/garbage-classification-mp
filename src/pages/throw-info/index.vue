<template>
  <van-panel :title="dataInfo.name" :desc="dataInfo.desc" use-footer-slot>
    <view class="info">{{ dataInfo.info }}</view>
    <view v-if="dataInfo.ps" class="ps">ps: {{ dataInfo.ps }}</view>
    <div style="text-align: center; margin-top: 20px; margin-bottom: 10px">
      <img class="img" :src="dataInfo.imgUrl" />
    </div>
    <view slot="footer" class="footer">
      <van-button plain hairline size="small" type="primary" @click="onBack">返回</van-button>
    </view>
  </van-panel>
</template>

<script>
export default {
  name: "throwInfo",
  mounted() {
    const type = this.$root.$mp.query.throwInfo;
    this.dataInfo = this.throwInfo[type] ? this.throwInfo[type] : {};
  },
  data() {
    return {
      throwInfo: {
        residual: {
          name: "干垃圾",
          desc: "eg: 餐巾纸，猫砂，烟蒂，一次性餐具...",
          info: "投入干垃圾收集容器，并保持周边环境整洁",
          imgUrl: "/static/images/throw/residual.png"
        },
        household: {
          name: "湿垃圾",
          desc: "eg: 食品废料，剩饭剩菜，过期食品，瓜皮果壳，花卉植物...",
          info:
            "湿垃圾应从产生时就与其他品种垃圾分开收集，投放前尽量沥干水分，有外包装的应尽量除去外包装投放",
          ps:
            "公共场所产生湿垃圾且未发现有对应收集容器时，应携带至有湿垃圾投放点妥善投放",
          imgUrl: "/static/images/throw/household.png"
        },
        recycle: {
          name: "可回收物",
          desc: "eg: 报纸，纸箱，书本，易拉罐，塑料瓶，酒瓶，衣服...",
          info:
            "投放可回收物时，应尽量保持清洁干燥；立体包装应清空内容物，清洁后压扁投放；易破损或有裹尖锐边角的应包后投放",
          imgUrl: "/static/images/throw/recycle.png"
        },
        hazardous: {
          name: "有害垃圾",
          desc:
            "eg: 镍镉电池，氧化汞电池，荧光灯管，药品及包装物，油漆及包装物...",
          info:
            "投放有害垃圾时，应注意轻放；易破碎的及废弃药品应连带包装或包裹后投放；压力罐装容器应排空内容物后投放",
          imgUrl: "/static/images/throw/hazardous.png"
        }
      },
      dataInfo: {}
    };
  },
  methods: {
    onBack() {
      wx.navigateBack();
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  text-align: right;
}
.info {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.6);
}
.ps {
  font-size: 14px;
  line-height: 18px;
  font-weight: 200;
  color: #999;
  padding: 0 15px 10px 15px;
}
.img {
  height: 320px;
  width: 320px;
}
</style>


