<template>
  <section class="container">
    <Header></Header>
    <el-row>
      <el-col :span="3">
        <left-nav></left-nav>
      </el-col>
      <el-col :span="21" class="right-cont" style="">
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
  data() {
    return {
      
    }
  },
  components: {
    LeftNav,
    Header
  }
};
</script>
<style lang="less" scoped>
.el-row, .el-col {
    min-height: 100%;
    background-color: #fff;
}
.container {
    min-height: 100%;
}
.right-cont {
    background-color: #F8FAFC;
    min-height: 600px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 50px;
}

</style>


