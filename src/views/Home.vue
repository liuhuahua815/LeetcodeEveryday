<template>
  <div class="home-wrap">
    <div class="first-row">
      <div class="data-panel">
        <DataPanel
          title="总人数"
          :num="peopleCount + '人'"
          class="people-panel"
        ></DataPanel>
        <DataPanel
          title="LeetCode最高名"
          :num="siteRank + '名'"
          class="people-panel"
        ></DataPanel>
        <DataPanel
          title="最高竞赛分"
          :num="rankScore + '分'"
          class="people-panel"
        ></DataPanel>
      </div>
      <el-card class="ranklist-card">
        <div class="ranklist-wrap flex-column">
          <el-radio-group
            class="selectRanklistType"
            v-model="ranklistType"
            text-color="white"
            fill="#FFA116"
          >
            <el-radio-button label="日榜"></el-radio-button>
            <el-radio-button label="周榜"></el-radio-button>
            <el-radio-button label="总榜"></el-radio-button>
          </el-radio-group>
          <ranklist
            v-show="ranklistType == '总榜'"
            :title="'刷题总榜'"
            :viceTitle="' '"
            :ranklistImgUrl="imgList.overallRanking"
          >
            <ranklist-item
              v-show="ranklistType == '总榜'"
              :key="item.user + 'overallRanking'"
              v-for="(item, index) in userOverallProgress"
              :index="index"
              :item="item"
              :itemName="item.user_name"
              :sum="item.acSum"
            ></ranklist-item>
          </ranklist>
          <ranklist
            v-show="ranklistType == '周榜'"
            :title="'刷题周榜'"
            :viceTitle="' '"
            :ranklistImgUrl="imgList.weekRanking"
          >
            <!-- <ranklist-item></ranklist-item> -->
          </ranklist>
          <ranklist
            v-show="ranklistType == '日榜'"
            :title="'刷题日榜'"
            :viceTitle="'(' + yesterday + '日数据)'"
            :ranklistImgUrl="imgList.dayRanking"
          >
            <div>
              <ranklist-item
                v-show="ranklistType == '日榜'"
                :key="item.user + 'dayRanking'"
                v-for="(item, index) in userDayProgress"
                :index="index"
                :item="item"
                :itemName="item.user_name"
                :sum="item.yesterdaySum"
              ></ranklist-item>
            </div>
          </ranklist>
        </div>
      </el-card>
    </div>

    <div></div>
    <div></div>
  </div>
</template>
<script>
import {
  getAllUserInfo,
  getAllUserProgress,
  getUserRecentSubmit,
} from "@/net/home/home.js";
import ranklist from "@/components/ranklist/ranklist.vue";
import ranklistItem from "@/components/ranklist/ranklist-item.vue";
import Ranklist from "@/components/ranklist/ranklist.vue";
import DataPanel from "@/components/dataPanel/data-panel.vue";
export default {
  name: "",
  components: {
    ranklist,
    ranklistItem,
    Ranklist,
    DataPanel,
  },
  mixins: [],
  props: {},
  data() {
    return {
      // 切换榜单类型type值
      ranklistType: "日榜",
      // 数据面板总人数
      peopleCount: 0,
      // 数据面板比赛分
      rankScore: 0,
      // 数据面板全站排名
      siteRank: 100000,
      // 所有群友的lc档案信息
      userInfo: [],
      // 所有群友日榜用到的数据,按照昨日刷题数量排序的
      userDayProgress: [],
      // 所有群友总榜用到的数据,按照总刷题数量排序的
      userOverallProgress: [],
      // 前天00:00:00的时间戳
      dayBeforeYesterday: "",
      // 昨天00:00:00的时间戳
      yesterday: "",
      // 排行榜3个图片
      imgList: {
        overallRanking: require("@/assets/img/overallRanking.png"),
        weekRanking: require("@/assets/img/weekRanking.png"),
        dayRanking: require("@/assets/img/dayRanking.png"),
      },
    };
  },
  computed: {},
  created() {
    this.init();
  },
  watch: {},
  mounted() {},
  methods: {
    init() {
      this.getUserInfo();
      this.getUserProgress();
    },
    getUserInfo() {
      getAllUserInfo().then((res) => {
        this.peopleCount = res.data.length;
        this.userInfo = res.data;
      });
    },
    getUserProgress() {
      // 今天毫秒级时间戳
      let today = new Date(new Date().toDateString()).getTime();
      // 昨天秒级时间戳
      let yesterday = Math.round((today - 86400000) / 1000);
      // 前天秒级时间戳
      let dayBeforeYesterday = Math.round((today - 2 * 86400000) / 1000);
      // 前天00:00:00时间戳
      this.dayBeforeYesterday = new Date(
        dayBeforeYesterday * 1000
      ).toLocaleString("zh", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      // 昨天00:00:00时间戳
      this.yesterday = new Date(yesterday * 1000).toLocaleString("zh", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      getAllUserProgress(dayBeforeYesterday).then((res) => {
        // 得到截至到前天的群友刷题进度
        let userDayBeforeYesterdayProgress = res.data[dayBeforeYesterday];
        // 得到截至到昨天的群友刷题进度
        this.userDayProgress = res.data[yesterday];
        // 遍历昨天的群友刷题进度数组
        for (let i = 0; i < this.userDayProgress.length; i++) {
          // 获取最高竞赛分
          if (this.rankScore < this.userDayProgress[i].rank_score) {
            this.rankScore = this.userDayProgress[i].rank_score;
          }
          // 获取最高站排名
          if (this.siteRank > this.userDayProgress[i].site_rank) {
            this.siteRank = this.userDayProgress[i].site_rank;
          }
          // 求和(easy_count,middle_count,hard_count)截止到昨天的刷题通过的总数
          this.userDayProgress[i].acSum =
            this.userDayProgress[i].ac_count_easy +
            this.userDayProgress[i].ac_count_medium +
            this.userDayProgress[i].ac_count_hard;
          // console.log(userDayBeforeYesterdayProgress[i]);

          // 因为是遍历昨天的，所以群人数如果呈增长的话，
          // 前天的数据可能没有加入新增的人，那么就对昨天新加入的人数据设置成暂无
          if (!userDayBeforeYesterdayProgress[i]) {
            this.userDayProgress[i].yesterdaySum = "暂无";
            continue;
          }
          // 当群人数趋于稳定后，前天和昨天获取到的刷题进度是按照userId排好序的，
          // 如果前后两天数组里，同一index指向的用户id不一致，那也把数据设置成暂无
          if (userDayBeforeYesterdayProgress[i].user != this.userDayProgress[i].user) {
            // console.log(`this.userDayProgress[${i}]`, this.userDayProgress[i]);
            // console.log(`userDayBeforeYesterdayProgress[${i}]`, userDayBeforeYesterdayProgress[i]);
            this.userDayProgress[i].yesterdaySum = "暂无";
            continue;
          }
          // 计算 昨天减前天的简单题刷题数差值
          this.userDayProgress[i].yesterdayACEasyCount =
            this.userDayProgress[i].ac_count_easy - userDayBeforeYesterdayProgress[i].ac_count_easy;
          // 计算 昨天减前天的中等题刷题数差值
          this.userDayProgress[i].yesterdayACMediumCount =
            this.userDayProgress[i].ac_count_medium -
            userDayBeforeYesterdayProgress[i].ac_count_medium;
           // 计算 昨天减前天的困难题刷题数差值
          this.userDayProgress[i].yesterdayACHardCount =
            this.userDayProgress[i].ac_count_hard - userDayBeforeYesterdayProgress[i].ac_count_hard;
           // 计算 昨天减前天的刷题数差值
          this.userDayProgress[i].yesterdaySum =
            this.userDayProgress[i].yesterdayACEasyCount +
            this.userDayProgress[i].yesterdayACMediumCount +
            this.userDayProgress[i].yesterdayACHardCount;
        }
        // 这里是为了渲染日榜，所以按照yesterdaySum排序从高到低
        this.userDayProgress.sort((a, b) => {
          return b.yesterdaySum - a.yesterdaySum;
        });
        // 这里是为了渲染总榜，所以按照acSum排序从高到低
        this.userOverallProgress = JSON.parse(JSON.stringify(this.userDayProgress));
        this.userOverallProgress.sort((a, b) => {
          return b.acSum - a.acSum;
        });
      });
    },
  },
};
</script>
<style scoped>
.home-wrap {
  width: 77%;
  margin-top: 15px;
}
.first-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.data-panel {
  width: 200px;
  position: fixed;
  left: 11.5%;
}
.people-panel {
  padding-bottom: 1rem;
}

.ranklist-card {
  width: 310px;
  min-width: 310px;
}
.selectRanklistType /deep/ .el-radio-button__inner {
  font-size: 1.5rem;
  color: #ffa116;
  min-width: 90px;
  width: 90px;
  text-align: center;
  margin-bottom: 1rem;
  background: var(--verylight-leetcode-color);
}
.ranklist-wrap {
  min-width: 270px;
  width: 270px;
  justify-content: flex-start;
}
@media screen and (max-width: 700px) {
  .data-panel {
    display: none;
  }
  .unknown {
    display: none;
  }
}
</style>