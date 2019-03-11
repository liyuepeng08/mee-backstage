<template>
  <section class="container">
    <Header></Header>
    <el-row>
      <el-col :span="3">
        <left-nav></left-nav>
      </el-col>
      <el-col :span="21" style="background-color: #F3F3F5;">
        <router-view/>
      </el-col>
    </el-row>
  </section>
</template>
<script>
//当前是 后台主页组件
import LeftNav from "@/components/nav/nav";
import Header from "@/components/base/Header/Header";
export default {
  components: {
    LeftNav,
    Header
  }
};
</script>
<style lang="less" scoped>
</style>


