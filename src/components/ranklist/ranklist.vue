<template>
  <div class="ranklist-wrap">
    <div class="ranklist-main">
      <img :src="ranklistImgUrl" alt="" />
      <div class="ranklist-title-wrap">
        <p class="title">{{title}}</p>
        <p class="viceTitle">{{viceTitle}}</p>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="bottom">
      <router-link class="linkText" to="/">查看全部></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ranklist",
  components: {
  },
  props: {
    ranklistImgUrl:"",
    title: "",
    viceTitle:"",
  },
  data() {
    return {
      color:"#c0c0c0"
    };
  },
  watch: {},
  computed: {},
  methods: {

  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.ranklist-wrap{
  display:flex;
  flex:1;
  flex-direction: column;
  background:var(--verylight-leetcode-color);;
  box-shadow:0px 1px 3px rgba(0,0,0,0.04),0px 6px 16px rgba(0,0,0,0.12);
}
.ranklist-main{

  display:flex;
  flex-direction: row;
  margin:20px 0 0 20px;
  width:100%;
  height:120px;
}
.ranklist-title-wrap{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width:100%;
  margin:0 20px 0 5px;
  height:80px;
}
.title{
  margin:0;
  font-size:2rem;
  color:var(--leetcode-color)
}
.title:hover{
  text-decoration:underline;
}
.viceTitle{
  margin:0;
  min-width:1.8rem;
  min-height:1.8rem;
  color:var(--leetcode-color)
}
.btnWrap{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top:10px;
  width:66px;
}
.bottom{
  text-align:right;
  height:32px;
  line-height:32px;
  background:var(--light-leetcode-color);;
  
}
.linkText{
  font-size:12px;
  color:var(--leetcode-color);
  margin-right:30px;
  margin-top:0;
  margin-bottom:0;
}
.linkText:hover{
  text-decoration:underline;
}
img{
  width:80px;
  height:80px;
  box-shadow:0px 2px 2px rgba(0,0,0,0.24),2px 0px 1px rgba(0,0,0,0.24);;
}
svg{
  width:30px;
  height:30px;
}
</style>