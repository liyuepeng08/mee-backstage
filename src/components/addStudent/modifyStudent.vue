<template>
  <div class="addStudent">
    <p class="topNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        <el-breadcrumb-item class="active">学生编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <h3 class="pageTitle">修改学生</h3>
    <el-row class="bread">
      <span :class="{'selected':tab===1}" @click="checkTab(1)">
        <i/>基本信息
      </span>
      <b>></b>
      <span :class="{'selected':tab===2}" @click="checkTab(2)">
        <i/>更多信息
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
      <dl class="model essential" v-if="tab === 1">
        <dt>基本信息</dt>
        <!-- <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" placeholder="账号"></el-input>
        </el-form-item>-->
        <el-form-item label="姓名" prop="userName" class="validate">
          <el-input disabled class="w150" v-model="ruleForm.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName" class="validate">
          <el-input class="w150" v-model="ruleForm.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select class="w150" v-model="ruleForm.gender" placeholder="请选择活动区域">
            <el-option label="女" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="school">
          <el-select disabled style="width:100%" v-model="ruleForm.school" placeholder="请选择活动区域"></el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="next"
            round
            style="width:120px;height:40px;font-size: 14px;"
          >下一步</el-button>
        </el-form-item>
      </dl>
      <dl class="model more" v-if="tab === 2">
        <dt>更多信息</dt>
        <el-form-item label="民族" prop="nation">
          <el-input class="w150" v-model="ruleForm.nation" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker class="w150" type="date" placeholder="选择日期" v-model="ruleForm.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="籍贯" prop="nativeAddress">
          <el-input class="w480" v-model="ruleForm.nativeAddress" placeholder="输入内容" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input class="w480" v-model="ruleForm.address" placeholder="输入内容" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="父母电话" prop="parentsMobile">
          <el-row>
            <el-col :span="14">
              <el-input v-model="ruleForm.parentsMobile" placeholder="输入手机号码" maxlength="11"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input class="remarks" type="textarea" v-model="ruleForm.remark" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row style="margin-bottom:10px;">
            <el-button @click="back" round style="width:120px;height:40px;font-size: 14px;">上一步</el-button>
            <el-button
              @click="submitSM('ruleForm')"
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
        uid: "", //用户ID
        userName: "", //用户名
        nickName: "", //昵称
        password: "", //用户密码
        gender: "", //性别
        email: "", //邮箱
        mobile: "", //手机号
        school: "", //学校
        phone: "", //电话
        birthday: "", //出生年月
        nation: "", //民族
        nativeAddress: "", //籍贯
        address: "", //所在地址
        parentsMobile: "", //父母电话
        remark: "" //备注
      },
      rules: {
        userName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      },
      radio2: 3
    };
  },
  mounted: function() {
    this.details();
    this.obtain(); //获取当前信息
  },
  methods: {
    checkTab: function(index) {
      this.tab = index;
    },
    mounted: function() {
      this.details();
    },
    //上一步
    back: function() {
      this.tab--;
    },
    submitSM: function(formName) {
      const tid = sessionStorage.getItem("tid");
      const that = this.ruleForm;

      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
          this.axios
            .get("/user/update", {
              params: {
                params: {
                  uid: that.uid, //京东云ID
                  userName: that.userName, //用户名
                  realName: that.userName, //真实名
                  nickName: that.nickName, //昵称
                  password: "000000", //用户密码
                  gender:
                    that.gender == "" ? "2" : that.gender == "女" ? "0" : "1", //性别
                  email: that.email, //邮箱
                  mobile: that.mobile, //手机号
                  nation: that.nation, //民族
                  birthday: this.birthdayTime(), //生日
                  nativeAddress: that.nativeAddress, //籍贯
                  address: that.address, //所在地址
                  parentsMobile: that.parentsMobile, //父母电话
                  remark: that.remark, //备注
                  tenantId: tid, //机构
                  role: "2" //角色（老师：1；学生:2）
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
                      path: "/admin/studentManage"
                    });
                  }
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message("请填写所有带*号的必填项！");
          return false;
        }
      });
    },
    //点击修改前数据
    details: function() {
      const uid = this.$route.params.uid;
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
          let birthday = data.birthday;
          // data.birthday.slice(0, [4]);
          console.log(typeof data.birthday);
          that.uid = data.uid; //用户ID
          that.userName = data.realName; //用户名
          that.nickName = data.nickName; //昵称
          that.password = data.password; //用户密码
          that.gender = data.gender ? "女" : "男"; //性别
          that.email = data.email; //邮箱
          that.mobile = data.mobile; //手机号
          that.major = data.major; //专业，默认是22
          that.title = data.title; //职称，默认是1
          that.address = data.address; //地址
          that.birthday = data.birthday; //生日
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //获取当前信息
    obtain: function() {
      // this.ruleForm.tid = sessionStorage.getItem("tid");
      this.ruleForm.school = sessionStorage.getItem("tTame");
    },
    //点击修改前数据
    details: function() {
      const uid = this.$route.params.uid;
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
          let birthday = data.birthday;
          // data.birthday.slice(0, [4]);
          console.log(typeof data.birthday);
          that.uid = data.uid; //用户ID
          that.userName = data.realName; //用户名
          that.nickName = data.nickName; //昵称
          that.password = data.password; //用户密码
          that.gender = data.gender == 2 ? "保密" : data.gender ? "男" : "女"; //性别
          that.email = data.email; //邮箱
          that.mobile = data.mobile; //手机号
          that.address = data.address; //地址
          that.birthday = data.birthday; //生日
          that.nation = data.nation; //民族
          that.nativeAddress = data.nativeAddress; //籍贯
          that.address = data.address; //所在地址
          that.parentsMobile = data.parentsMobile; //父母电话
          that.remark = data.remark; //备注
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //生日由DTC转成8位数字
    birthdayTime: function() {
      var birthday = new Date(this.ruleForm.birthday);
      const year = birthday.getFullYear();
      const month = birthday.getMonth() + 1;
      const date = birthday.getDate();
      var times =
        year +
        "" +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date);
      return times;
      console.log(times);
    },
    birthdayReturn: function(birthday) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addStudent {
  background: #fff;
  margin: 10px 10px 0 10px;
  min-height: 600px;
  .topNav {
    background-color: #f3f3f5;
    font-size: 12px;
    color: #a9a9a9;
    .active {
      /deep/.el-breadcrumb__inner {
        color: #5693ff;
      }
    }
  }
  .pageTitle {
    font-size: 18px;
    color: #080808;
    padding: 19px 21px 31px 0;
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

