<template>
  <div class="main-container">
    <div class="progress-bar">
      <van-progress :percentage="percentage"></van-progress>
    </div>
    <van-transition :show="tansitionShow" name="fade-down" class="transition">
      <text class="text">{{ currentQuestion + '属于以下哪一种垃圾？' }}</text>
    </van-transition>
    <div class="img-group">
      <div class="img" v-for="item in answerImg" :key="item.name">
        <img
          style="height: 300rpx; width: 300rpx"
          :src="item.url"
          @click="handleAnswerClick(item.value)"
        />
        <p class="lable">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { garbageData } from "../../utils/garbageData";
export default {
  name: "game",
  mounted() {
    this.percentage = 0;
    this.points = 0;
    this.mistakes = [];
    this.getRandomQuestion();
  },
  data() {
    return {
      percentage: 0,
      currentQuestion: "",
      currentAnswer: 0,
      points: 0,
      mistakes: [],
      answerImg: [
        {
          name: "干垃圾",
          value: 8,
          url: "/static/images/test/residual.png"
        },
        {
          name: "湿垃圾",
          value: 4,
          url: "/static/images/test/household.png"
        },
        {
          name: "可回收物",
          value: 1,
          url: "/static/images/test/recycle.png"
        },
        {
          name: "有害垃圾",
          value: 2,
          url: "/static/images/test/hazardous.png"
        }
      ],
      tansitionShow: true
    };
  },
  methods: {
    getRandomQuestion() {
      const length = garbageData.length;
      const index = Math.round(Math.random() * length);
      this.currentQuestion = garbageData[index].name;
      this.currentAnswer = garbageData[index].categroy;
    },
    handleAnswerClick(value) {
      this.percentage += 10;
      this.tansitionShow = false;
      setTimeout(() => {
        this.tansitionShow = true;
      }, 500);
      setTimeout(() => {
        if (value === this.currentAnswer) {
          this.points += 1;
        } else {
          this.mistakes.push({
            qes: this.currentQuestion,
            ans: this.currentAnswer
          });
        }
        if (this.percentage < 100) {
          this.getRandomQuestion();
        } else {
          wx.redirectTo({
            url:
              "../result/main?res=" +
              this.points +
              "&mistakes=" +
              JSON.stringify(this.mistakes)
          });
        }
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.main-container {
  position: relative;
  text-align: center;
  .progress-bar {
    padding: 20px 40px 40px 40px;
  }
  .text {
    font-weight: 400;
    font-size: 14px;
    color: rgba(69, 90, 100, 0.8);
  }
  .img-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    // padding: 30px;
    margin-top: 20px;
    .img {
      margin-bottom: 10px;
    }
    .lable {
      font-weight: 300;
      font-size: 14px;
      color: rgba(69, 90, 100, 0.6);
    }
  }
  .transition {
    width: 100%;
    right: 1%;
    top: 10%;
    position: absolute;
  }
}
</style>


