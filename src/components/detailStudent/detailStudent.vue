<template>
  <div class="addManager">
    <h3 class="pageTitle">学生详情</h3>
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
      <el-form-item label="性别 :" prop="sex">
        <span>{{ruleForm.sex}}</span>
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
      <el-form-item label="邮箱 :" prop="email">
        <span>{{ruleForm.email}}</span>
      </el-form-item>
      <el-form-item label="出生年月 :" prop="birthday">
        <span>{{ruleForm.birthday}}</span>
      </el-form-item>
      <el-form-item label=" 年级 :" prop="grade">
        <span>{{ruleForm.grade}}</span>
      </el-form-item>
      <el-form-item label=" 班级 :" prop="class">
        <span>{{ruleForm.class}}</span>
      </el-form-item>
      <!-- <div class="auditor" v-show="ifAuditor">
        <el-row>
          <el-button style="width:120px;height:40px;background:#2e8ed6" type="primary">通过</el-button>
          <el-button style="width:120px;height:40px;border:1px solid #2e8ed6" plain>拒绝</el-button>
        </el-row>
      </div> -->
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
        account: "9527", //账户
        sex: "女", //性别
        name: "窦娥", //用户名
        nickName: "妖刀姬", //昵称
        passWord: "7758521", //密码
        school: "北京市第一小学", //学校
        phone: "15010611993", //电话
        email: "15010611993@163.com", //邮箱
        birthday: "1981-05-15", //出生年月
        grade: "小学4年纪", //教授年纪
        class: "英语托福班" //班级
      },
      ifAuditor: true
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
  padding-bottom: 40px;
  .pageTitle {
    font-size: 14px;
    font-weight: normal;
    color: #000000;
    padding: 19px 21px 25px;
  }
  .teacherCard {
    width: 220px;
    height: 140px;
    padding-bottom: 40px;
  }
  .auditor {
    padding: 30px 120px 50px;
  }
}
</style>
