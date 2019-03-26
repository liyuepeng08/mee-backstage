<template>
  <div class="addStudent">
    <h3 class="pageTitle">修改教师</h3>
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
      <dl class="model essential" v-show="tab === 1">
        <dt>基本信息</dt>
        <el-form-item label="姓名" prop="userName" class="validate">
          <el-input disabled class="w150" v-model="ruleForm.userName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile" class="validate">
          <el-input class="w150" v-model="ruleForm.mobile" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input class="w480" v-model="ruleForm.email" placeholder="输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="school">
          <el-select disabled class="w480" v-model="ruleForm.school" placeholder="请选择">
            <el-option label="北京市第一小学" value="shanghai" selected></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submit"
            type="primary"
            round
            style="width:120px;height:40px;font-size: 14px;"
          >提交</el-button>
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
        uid: "", //用户ID
        userName: "", //用户名
        password: "", //用户密码
        gender: "男", //性别
        email: "", //邮箱
        mobile: "", //手机号
        school: "北京大学"
      },
      rules: {
        userName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ]
      },
      radio2: 3
    };
  },
  mounted: function() {
    this.details();
  },
  methods: {
    submit: function() {
      const that = this.ruleForm;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .get("/user/update", {
              params: {
                params: {
                  uid: that.uid, //京东云ID
                  userName: that.userName, //用户名
                  nickName: that.nickName, //昵称
                  gender: that.gender == "男" ? 0 : 1, //性别
                  email: that.email, //邮箱
                  mobile: that.mobile //手机号
                }
              }
            })
            .then(response => {
              let data = response.data;
              if (data.code == 0) {
                let timer = setTimeout(() => {
                  //倒计时跳转
                  this.$router.push({
                    //跳转到列表页
                    path: "/admin/courseManage"
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
                      path: "/admin/teacherManage"
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
      //修改
    },
    //点击修改前数据
    details: function() {
      const uid = this.$route.params.uid;
      console.log(1);
      //渲染
      this.axios
        .get("/user/getUserDetail", {
          params: {
            params: {
              uid: uid
            }
          }
        })
        .then(response => {
          let data = response.data.data;
          const that = this.ruleForm;
          that.uid = data.uid; //用户ID
          that.userName = data.realName; //用户名
          that.nickName = data.nickName; //昵称
          that.password = data.password; //用户密码
          that.gender = data.gender ? "女" : "男"; //性别
          that.email = data.email; //邮箱
          that.mobile = data.mobile; //手机号
        })
        .catch(function(error) {
          console.log(error);
        });
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
    .back {
      width: 120px;
      height: 40px;
      font-size: 14px;
      color: #409eff;
      border: 1px solid #409eff;
    }
    .w150 {
      width: 150px;
    }
    .w480 {
      width: 480px;
    }
    .w260 {
      width: 260px;
    }
    // 头像
    /deep/ .avatar-uploader {
      height: 120px;
    }
    /deep/ .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;

      overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    /deep/ .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    /deep/ .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
    .certificate {
      .title {
        text-align: center;
        font-size: 12px;
        color: #666666;
      }
      /deep/ .avatar-uploader-icon {
        width: 150px;
        height: 120px;
        line-height: 120px;
      }
      /deep/ .avatar {
        width: 150px;
        height: 120px;
      }
    }
  }
  // 设置label标题到右侧距离
  /deep/ .el-form-item__label {
    padding-right: 30px;
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
