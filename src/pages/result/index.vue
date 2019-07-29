<template>
    <div>
        <div class="img-container">
            <img style="width: 360rpx; height: 315rpx" :src="result.imgUrl"/>
            <van-rate :value="points" count="10"></van-rate>
            <p class="text">{{ result.msg }}</p>
            <van-collapse v-if="showMistakes" :value="activeCol" data-key="activeCol" @change="onChange" class="mistakesCol">
                <van-collapse-item title="错题集">
                    <van-cell
                        v-for="item in mistakes"
                        :key="item.qes"
                        :title="item.qes"
                        class="cell"
                        >
                            <view slot="right-icon">
                                <van-tag :color="tagColor[item.ans]" plain>{{ tagName[item.ans] }}</van-tag>
                            </view>
                        </van-cell>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="button-group">
            <van-button plain hairline type="info" @click="handleHome">返回首页</van-button>
            <van-button plain hairline type="primary" @click="handleTestAgain">再做一次</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'result',
    data() {
        return {
            activeCol: [],
            points: 0,
            mistakes: [],
            tagColor: {
                '8': '#2c2b29',
                '4': '#693f36',
                '1': '#0e6db6',
                '2': '#e43123'
            },
            tagName: {
                '8': '干垃圾',
                '4': '湿垃圾',
                '1': '可回收物',
                '2': '有害垃圾'
            },
        }
    },
    computed: {
        result() {
            const points = Number(this.points)
            switch (points) {
                case 0:
                case 1:
                    return {
                        msg: '我认真问你，你是不是来搞事的？',
                        imgUrl: '/static/images/result/01.png'
                    }
                case 2:
                case 3:
                case 4:
                case 5:
                    return {
                        msg: '《上海市生活垃圾管理条例》规定，个人混投行为处50元以上200元以下罚款，根据您的测试结果，建议您申请包月罚款',
                        imgUrl: '/static/images/result/2345.png'
                    }
                case 6:
                case 7:
                case 8:
                    return {
                        msg: '学海无涯，继续努力',
                        imgUrl: '/static/images/result/678.png'
                    }
                case 9:
                    return {
                        msg: '只差一点点，你就可以成为垃圾王，继续加油！',
                        imgUrl: '/static/images/result/9.png'
                    }
                case 10:
                    return {
                        msg: '中央已经决定了，下一届垃圾站站长就由你来当',
                        imgUrl: '/static/images/result/10.png'
                    }
            }
        },
        showMistakes() {
            const points = Number(this.points)
            return points === 10 ? false : true
        }
    },
    mounted() {
        this.activeCol = []
        this.points = this.$root.$mp.query.res
        this.mistakes = JSON.parse(this.$root.$mp.query.mistakes)
    },
    methods: {
        handleHome() {
            wx.switchTab({ url: '/pages/index/main' })
        },
        handleTestAgain() {
            wx.switchTab({ url: '/pages/logs/main' })
        },
        onChange(event) {
            const { key } = event.mp.currentTarget.dataset;
            this[key]=event.mp.detail
        }
    }
}
</script>

<style lang="less" scoped>
    .img-container {
        margin-top: 20px;
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
        .text {
            margin-bottom: 10px;
            padding-top: 20px;
            padding-bottom: 20;
            font-weight: 400;
            font-size: 14px;
            color: rgba(69,90,100,.6);
        }
        .mistakesCol {
            text-align: left;
            /deep/ .van-collapse-item__content {
                padding-top: 0;
            }
        }
    }
    .button-group {
        margin: 20px 40px 0 40px;
        text-align: center;
        display: flex;
        justify-content: space-around;
    }
</style>


