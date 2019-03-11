<template>
  <div class="addStudent">
    <h3 class="pageTitle">新增学生</h3>
    <!-- <form class="el-form demo-ruleForm"> -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
      style="width:550px"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="ruleForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="ruleForm.passWord"></el-input>
      </el-form-item>
      <el-form-item label="学校或机构" prop="school">
        <el-select style="width:100%" v-model="ruleForm.school" placeholder="请选择活动区域">
          <el-option label="北京市第一小学" value="shanghai"></el-option>
          <el-option label="北京市第二小学" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row style="margin-bottom:10px;">
          <el-button style="border:1px solid #2e8ed6">+ 添加</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="出生年月" required>
        <el-form-item prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.birthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select style="width:100%" v-model="ruleForm.grade" placeholder="请选择年级">
          <el-option label="三年级" value="shanghai"></el-option>
          <el-option label="四年级" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-select style="width:100%" v-model="ruleForm.class" placeholder="请选择班级">
          <el-option label="一班" value="shanghai"></el-option>
          <el-option label="二班" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row style="margin-bottom:10px;">
          <el-button style="border:1px solid #2e8ed6">+ 添加</el-button>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row style="margin-bottom:10px;">
          <el-button
            style="width:120px;height:40px;margin:50px 0 58px;background:#2e8ed6"
            type="primary"
          >提交</el-button>
        </el-row>
      </el-form-item>
    </el-form>

    <!-- </form> -->
  </div>
</template>

<script>
export default {
  name: "addStudent",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      ruleForm: {
        account: "", //账户
        sex: "", //性别
        name: "", //用户名
        nickName: "", //昵称
        passWord: "", //密码
        school: "", //学校
        phone: "", //电话
        email: "", //邮箱
        birthday: "", //出生年月
        grade: "", //年级
        class: "" //班级
      },
      rules: {
        account: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 2, max: 11, message: "长度在 2 到 11 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 8, max: 11, message: "长度在 8 到 11 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addStudent {
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
<style>
.el-form-item {
  margin-bottom: 20px;
}
</style>
