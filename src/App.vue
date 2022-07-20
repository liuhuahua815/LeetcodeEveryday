<template>
  <div id="app">
    <layout>
      <template v-slot:header>
        <headerBar class="headerBar" @click.native="goHome"></headerBar>
        <div class=""></div>
      </template>
      <template v-slot:main>
        <router-view></router-view>
      </template>

    </layout>
  </div>
</template>
<script>
import layout from "@/layout/layout";
import headerBar from "@/components/header/headerBar.vue";
export default {
  name: "",
  components: {
    layout,
    headerBar,
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    goHome(){
      this.$router.push({path:'/'})
    }
  },
};
</script>
<style scoped>
.headerBar:hover{
  cursor:pointer;
}
</style>