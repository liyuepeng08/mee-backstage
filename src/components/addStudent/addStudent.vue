<template>
  <div class="addManager">
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
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学校或机构" prop="region">
        <el-select style="width:100%" v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="北京市第一小学" value="shanghai"></el-option>
          <el-option label="北京市第二小学" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row style="margin-bottom:10px;">
          <el-button style="border:1px solid #2e8ed6">+ 添加</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="联系电话" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
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
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="年级" prop="region">
        <el-select style="width:100%" v-model="ruleForm.region" placeholder="请选择年级">
          <el-option label="三年级" value="shanghai"></el-option>
          <el-option label="四年级" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="region">
        <el-select style="width:100%" v-model="ruleForm.region" placeholder="请选择班级">
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
  name: "AddManager",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      ruleForm: {
        name: "",
        region: "",
        sex: "",
        email: "",
        date1: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择行别", trigger: "change" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
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
<style>
.el-form-item {
  margin-bottom: 10px;
}
</style>
