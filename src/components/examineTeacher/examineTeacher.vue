<template>
  <div class="addManager">
    <h3 class="pageTitle">教师审核详情</h3>
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
        <div :key="index" v-for="(item,index) in ruleForm.school">{{item.name}}</div>
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
      <el-form-item label="工作年限 :" prop="workLife">
        <span>{{ruleForm.workLife}}</span>
      </el-form-item>
      <el-form-item label="教育科目 :" prop="subject">
        <span>{{ruleForm.subject}}</span>
      </el-form-item>
      <el-form-item label="工作地址 :" prop="prefecture">
        <span>{{ruleForm.prefecture}}</span>
      </el-form-item>
      <el-form-item label="教育年级 :" prop="grade">
        <span>{{ruleForm.grade}}</span>
      </el-form-item>
      <el-form-item label="职称 :" prop="teacherTitle">
        <span>{{ruleForm.teacherTitle}}</span>
      </el-form-item>
      <el-form-item label="资格证书 :" prop="card">
        <img class="teacherCard" src="./teacherCard.jpg" alt>
        <!-- <img class="teacherCard" :src="ruleForm.card" alt> -->
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
        account: "9527", //账户
        sex: "女", //性别
        name: "窦娥", //用户名
        nickName: "妖刀姬", //昵称
        passWord: "7758521", //密码
        school: [{ name: "北京市第一小学" }, { name: "北京市第二小学" }], //学校
        phone: "15010611993", //电话
        email: "15010611993@163.com", //邮箱
        birthday: "1981-05-15", //出生年月
        workLife: "10年以上", //工作年限
        subject: "英语（二类）", //教育科目
        prefecture: "北京市昌平区华家园东一区", //工作地址
        grade: "小学4年纪", //教授年纪
        teacherTitle: "高级教师", //教育职称
        card: "./teacherCard.jpg" // 教师资格证书
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
  .teacherCard {
    width: 220px;
    height: 140px;
    padding-bottom: 40px;
  }
}
</style>
