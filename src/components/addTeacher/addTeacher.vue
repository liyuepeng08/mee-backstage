<template>
  <div class="addTeacher">
    <h3 class="pageTitle">新增老师</h3>
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
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
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
      <el-form-item label="工作年限" prop="workLife">
        <el-select style="width:100%" v-model="ruleForm.workLife" placeholder="请选择班级">
          <el-option label="1-3年" value="1"></el-option>
          <el-option label="3-10年" value="2"></el-option>
          <el-option label="10年以上" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教授科目" prop="subject">
        <el-select style="width:100%" v-model="ruleForm.subject" placeholder="请选择班级">
          <el-option label="英语" value="1"></el-option>
          <el-option label="语文" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row style="margin-bottom:10px;">
          <el-button style="border:1px solid #2e8ed6">+ 添加</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="工作地址" prop="prefecture">
        <el-input v-model="ruleForm.prefecture"></el-input>
      </el-form-item>
      <el-form-item label="教授年级" prop="grade">
        <el-select style="width:100%" v-model="ruleForm.grade" placeholder="请选择年级">
          <el-option label="三年级" value="3"></el-option>
          <el-option label="四年级" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职称" prop="teacherTitle">
        <el-select style="width:100%" v-model="ruleForm.teacherTitle" placeholder="请选择年级">
          <el-option label="初级教师" value="shanghai"></el-option>
          <el-option label="中级教师" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资格证书" prop="card">
        <UpLoadImg></UpLoadImg>
        <div class="tips">
          <span class="tips">
            <img src="./images/tis.png" alt>
            请上传教师资格证照片页(jpeg,png格式图片,小于2M)
          </span>
          <div class="See">查看案例</div>
        </div>
        <!-- <el-input v-model="ruleForm.name"></el-input> -->
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
import UpLoadImg from "../base/UpLoadImg/UpLoadImg";
export default {
  name: "AddTeacher",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      ruleForm: {
        account: "", //账户
        sex: "", //性别
        name: "", //用户名
        nickName: "", //昵称
        passWord: "", //密码
        school: [{ name: "" }, { name: "" }], //学校
        phone: "", //电话
        email: "", //邮箱
        birthday: "", //出生年月
        workLife: "", //工作年限
        subject: "", //教育科目
        prefecture: "", //工作地址
        grade: "", //教授年纪
        teacherTitle: "", //教育职称
        card: "" // 教师资格证书
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
  },
  components: {
    UpLoadImg
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addTeacher {
  background: #fff;
  margin: 10px 10px 0 10px;
  min-height: 600px;
  .pageTitle {
    font-size: 14px;
    font-weight: normal;
    color: #000000;
    padding: 19px 21px 25px;
  }
  .tips {
    line-height: 24px;
    position: relative;
    right: -26px;
    top: -60px;
    width: 538px;
    text-align: right;
    img {
      position: relative;
      left: -4px;
      top: 4px;
    }
  }
  .See {
    float: left;
    position: relative;
    left: 234px;
    top: -28px;
    color: #477fff;
    cursor: pointer;
  }
}
</style>
<style>
.el-form-item {
  margin-bottom: 20px;
}
</style>
