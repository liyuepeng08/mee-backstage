<template>
  <div class="addManager">
    <h3 class="pageTitle">管理员详情</h3>
    <!-- <form class="el-form demo-ruleForm"> -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
      style="width:550px"
    >
      <el-form-item label="账号 :" prop="account">
        <span>{{ruleForm.account}}</span>
      </el-form-item>
      <el-form-item label="姓名 :" prop="name">
        <span>{{ruleForm.name}}</span>
      </el-form-item>
      <el-form-item label="昵称 :" prop="nickName">
        <span>{{ruleForm.nickName}}</span>
      </el-form-item>
      <el-form-item label="密码 :" prop="passWord">
        <span>{{ruleForm.passWord}}</span>
      </el-form-item>
      <el-form-item label="学校或机构 :" prop="school">
        <span>{{ruleForm.school}}</span>
      </el-form-item>
      <el-form-item label="联系电话 :" prop="phone">
        <span>{{ruleForm.phone}}</span>
      </el-form-item>
    </el-form>
    <!-- </form> -->
  </div>
</template>

<script>
export default {
  name: "AddManager",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      ruleForm: {
        account: "15010611993", //账户
        name: "123", //用户名
        nickName: "泡泡", //昵称
        passWord: "QB20190331", //密码
        school: "北京市第一小学", //学校
        phone: "15010611993" //电话
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addManager {
  background: #fff;
  margin: 10px 10px 0 10px;
  min-height: 600px;
  .pageTitle {
    font-size: 14px;
    font-weight: normal;
    color: #000000;
    padding: 19px 21px 25px;
  }
}
</style>
