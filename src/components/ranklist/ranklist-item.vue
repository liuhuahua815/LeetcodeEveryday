<template>
  <div
    class="rankListItemWrap"
    :style="
      index % 2 == 0 ? 'background-color:var(--light-leetcode-color)' : ''
    "
  >
    <p class="itemIndex" :style="index <= 2 ? 'color:red;' : ''">
      {{ index + 1 }}
    </p>
    <div class="itemWrap">
      <p @click="goTo(item)" class="item">{{ item.user_name }}</p>
      <p  class="itemNum">{{ sum }}</p>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ranklist-item",
  components: {},
  props: {
    index: "",
    item: [],
    itemName: "",
    sum:0,
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    goTo(item) {
      window.open("https://leetcode.cn/"+item.user_name)
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.rankListItemWrap {
  display: flex;
  align-items: center;
}
.itemIndex {
  /* position:relative; */
  /* float:left; */
  width: 35px;
  height: 32px;
  line-height: 32px;

  font-size: 16px;
  text-align: center;
  
  padding: 0;
  margin: 0 0 0 30px;
  color: var(--leetcode-color);
}
.item {
  width:7rem;
  max-width:7rem;
  margin-left: 15px;
  color: var(--leetcode-color);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
.item:hover {
  text-decoration: underline;
}
.itemWrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width:100%;
  padding-right:1.8rem;
}
.itemNum{
  width:2rem;
  text-align: center;
    color: var(--leetcode-color);
}
</style>