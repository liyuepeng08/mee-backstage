<template>
  <div class="addStudent">
    <h3 class="pageTitle">新增管理员</h3>
    <el-row class="bread">
      <span :class="{'selected':tab===1}" @click="checkTab(1)">
        <i/>基本信息
      </span>
    </el-row>
    <!-- <form class="el-form demo-ruleForm"> -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm"
      style="width:390px"
      size="mini"
      :rules="rules"
    >
      <dl class="model essential">
        <dt>基本信息</dt>
        <el-form-item label="姓名" prop="userName" class="validate">
          <el-input class="w150" v-model="ruleForm.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" class="validate">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" class="validate">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="school">
          <el-select disabled style="width:100%" v-model="ruleForm.tTame" placeholder="请选择活动区域"></el-select>
        </el-form-item>
        <el-form-item>
          <el-row style="margin-bottom:10px;">
            <el-button
              @click="submit('ruleForm')"
              type="primary"
              round
              style="width:120px;height:40px;font-size: 14px;"
            >提交</el-button>
          </el-row>
        </el-form-item>
      </dl>
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
      tab: 1,
      ruleForm: {
        tid: "", //租户ID
        tTame: "", //租户名称
        uid: "", //用户ID
        userName: "", //用户名
        password: "", //用户密码
        email: "", //邮箱
        mobile: "" //手机号
      },
      rules: {
        userName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      radio2: 3
    };
  },
  mounted: function() {
    this.obtain(); //获取当前信息
  },
  methods: {
    submit: function(formName) {
      const tid = sessionStorage.getItem("tid");
      let that = this.ruleForm;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //新增
          this.axios
            .get("/tenant/user/createUser", {
              params: {
                params: {
                  userName: that.userName, //用户名
                  realName: that.userName, //用户名
                  nickName: that.nickName, //昵称
                  password: "000000", //用户密码
                  gender: 2, //性别保密
                  email: that.email, //邮箱
                  mobile: that.mobile, //手机号
                  tenantId: tid, //机构
                  role: 3 //角色（学生：0；老师：1；管理员：3）
                }
              }
            })
            .then(response => {
              console.log(111);
              let data = response.data;
              console.log("-------data" + data);
              if (data.code == 0) {
                let timer = setTimeout(() => {
                  //倒计时跳转
                  this.$router.push({
                    //跳转到列表页
                    path: "/admin/adminUser"
                  });
                  //模拟点击关闭按钮
                  document
                    .getElementsByClassName("el-message-box__close")[0]
                    .click();
                }, 3000);

                this.$alert("3秒后返回上一级", "提交成功，请等待审核！！", {
                  confirmButtonText: "直接跳转",
                  callback: action => {
                    clearTimeout(timer); //清除定时器
                    this.$router.push({
                      //跳转到列表页
                      path: "/admin/adminUser"
                    });
                  }
                });
              }
            })
            .catch(error => {
              this.$message("提交失败！");
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          this.$message("请填写所有带*号的必填项！");
          return false;
        }
      });
    },
    //获取当前信息
    obtain: function() {
      this.ruleForm.tid = sessionStorage.getItem("tid");
      this.ruleForm.tTame = sessionStorage.getItem("tTame");
    }
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
    font-size: 18px;
    color: #080808;
    padding: 0px 21px 25px 0px;
    background-color: #f3f3f5;
  }
  // 面包屑
  .bread {
    background-color: #f3f3f5;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    padding-bottom: 15px;
    letter-spacing: 0px;
    color: #a9a9a9;
    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 6px;
      position: relative;
      top: 1px;
      background-color: #f3f3f5;
      border: solid 1px #a9a9a9;
    }
    b {
      padding: 0 4px;
      position: relative;
      top: -1px;
    }
    .selected {
      color: #5693ff;
      i {
        background-color: #5693ff;
        border: solid 1px #5693ff;
      }
    }
  }
  //下dl模板
  .model {
    padding: 34px 40px;
    dt {
      padding-bottom: 30px;
    }
    .w150 {
      width: 150px;
    }
    .w480 {
      width: 480px;
    }
  }
  //more
  .more {
    padding: 34px 0px 34px 40px;
  }
  // 验证
  .validate {
    position: relative;
  }
  // 验证子项
  /deep/
    .el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    position: absolute;
    left: -12px;
    top: 2px;
  }
  /deep/ .el-form-item {
    margin-bottom: 30px;
    // width: 100%;
    .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    text-align: justify;
    height: 30px;
    overflow: hidden;
  }
  /deep/ .el-form-item__label:after {
    display: inline-block;
    width: 100%;
    content: "";
  }
  /deep/ .el-select-dropdown__item.selected {
    font-size: 12px;
  }
  /deep/ .el-select-dropdown__item {
    font-size: 12px;
  }
  /deep/ .remarks {
    textarea {
      width: 493px;
      height: 120px;
    }
  }
  /deep/ .el-message-box__btns {
    text-align: center;
  }
}
</style>
<style lang="less">
.el-message-box__content {
  padding-left: 110px;
}
</style>
