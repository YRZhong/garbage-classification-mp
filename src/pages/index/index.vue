<template>
  <div class="test">
    <van-search
      :value="searchParams"
      placeholder="请输入垃圾名称"
      @change="onChange"
      @search="onSearch"
    />
    <van-card
      class="card"
      v-for="item in garbageType"
      :key="item.index"
      :desc="item.description"
      :title="item.name"
      :thumb="item.imageURL">
      <view slot="footer" class="van-card__footer">
        <van-button
          plain 
          hairline 
          round 
          type="info" 
          size="mini"
          @click="getThrowInfo(item.index)">投放方法</van-button>
        <!-- <van-button 
          plain 
          hairline 
          round 
          style="margin-left: 20rpx" 
          type="info" 
          size="mini">查看分类</van-button> -->
      </view>
    </van-card>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '../../../static/vant/dialog/dialog'
export default {
  name: '',
  data() {
    return {
      garbageType: [
        {
          name: '干垃圾',
          index: 'residual',
          description: '即其它垃圾，指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物',
          imageURL: '../../../static/images/residual.png'
        },
        {
          name: '湿垃圾',
          index: 'household',
          description: '即易腐垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物',
          imageURL: '../../../static/images/household.png'
        },
        {
          name: '可回收物',
          index: 'recycle',
          description: '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物',
          imageURL: '../../../static/images/recycle.png'
        },
        {
          name: '有害垃圾',
          index: 'hazardous',
          description: '指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物',
          imageURL: '../../../static/images/hazardous.png'
        }
      ],
      searchParams: ''
    }
  },
  methods: {
    getThrowInfo(params) {
      const url = '../throw-info/main?throwInfo=' + params
      wx.navigateTo({ url })
    },
    onChange(e) {
      this.searchParams=e.mp.detail
    },
    onSearch(event) {
      if (this.searchParams.trim()) {
          this.$fly.request({
          method: 'get',
          body: { name: this.searchParams }
        }).then(res => {
          if (res.code === 1) {
            //无搜索结果
            if (!res.data.aim && res.data.recommendList.length === 0) {
              this.searchFaild('未查询到相关结果')
            }
            //有结果 跳转展示
            else {
              wx.navigateTo({ url: '../search/main?res=' + JSON.stringify(res.data)})
            }
          }
          else {
            this.searchFaild('请求超时,请稍后再试')
          }
        })
      }
    },
    searchFaild(message) {
      Dialog.alert({
          message
        });
    }
  }
}
</script>

<style lang="less" scoped>
  .card {
    margin-bottom: 0;
    padding: 15rpx;
    /deep/ .van-card__content {
      margin-top: 5px;
    }
  }

  .test {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-card__footer {
    margin-bottom: 10rpx;
  }
</style>


