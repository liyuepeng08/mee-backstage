<template>
  <div class="addStudent">
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
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="school">
          <el-select disabled style="width:100%" v-model="ruleForm.school" placeholder="请选择活动区域">
            <el-option label="北京市第一小学" value="shanghai"></el-option>
            <el-option label="北京市第二小学" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在班级" prop="class">
          <el-row>
            <el-col :span="14">
              <el-select disabled style="width:100%" v-model="ruleForm.class" placeholder="选择班级">
                <el-option label="一班" value="shanghai"></el-option>
                <el-option label="二班" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9">
              <el-row style="margin-bottom:10px;">
                <el-row style="margin-bottom:10px;">
                  <el-button style="color:#a9a9a9;border:none">
                    <i class="el-icon-circle-plus-outline" style="margin-right: 4px;"></i>添加班级选项
                  </el-button>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
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
          <el-input disabled class="w150" v-model="ruleForm.nation" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input class="w150" v-model="ruleForm.age" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker class="w150" type="date" placeholder="选择日期" v-model="ruleForm.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="籍贯" prop="native">
          <el-input disabled class="w480" maxlength="50" v-model="ruleForm.age" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input
            disabled
            class="w480"
            maxlength="50"
            v-model="ruleForm.address"
            placeholder="输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="父母电话" prop="parentPhone">
          <el-row>
            <el-col :span="14">
              <el-input disabled v-model="ruleForm.parentPhone" placeholder="输入手机号码"></el-input>
            </el-col>
            <el-col :span="9">
              <el-row style="margin-bottom:10px;">
                <el-button style="color:#a9a9a9;border:none">
                  <i class="el-icon-circle-plus-outline" style="margin-right: 4px;"></i>添加班级选项
                </el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            disabled
            class="remarks"
            type="textarea"
            v-model="ruleForm.remarks"
            placeholder="输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row style="margin-bottom:10px;">
            <!-- <el-button round>圆角按钮</el-button> -->
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
        password: "", //用户密码
        gender: "男", //性别
        email: "", //邮箱
        mobile: "", //手机号
        major: 22, //专业，默认是22
        title: 1, //职称，默认是1
        nickName: "", //昵称
        address: "", //地址

        account: "", //账户
        school: "", //学校
        phone: "", //电话
        birthday: "", //出生年月
        grade: "", //年级
        class: "", //班级
        nation: "", //民族
        age: "", //年龄
        native: "", //籍贯
        remarks: "" //备注
      },
      rules: {
        userName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      },
      radio2: 3
    };
  },
  mounted: function() {
    this.details();
  },
  methods: {
    checkTab: function(index) {
      this.tab = index;
    },
    //下一步
    next: function() {
      this.tab++;
    },
    //上一步
    back: function() {
      this.tab--;
    },
    submitSM: function(formName) {
      const tid = sessionStorage.getItem("tid");
      const that = this.ruleForm;
      var birthday = new Date(that.birthday);
      const year = birthday.getFullYear();
      const month = birthday.getMonth() + 1;
      const date = birthday.getDate();
      var times =
        year +
        "" +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date);
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
          this.axios
            .get("/user/update", {
              params: {
                params: {
                  uid: that.uid,
                  userName: that.userName, //用户名
                  nickName: that.nickName, //昵称
                  gender: that.gender == "男" ? 0 : 1, //性别
                  email: that.email, //邮箱
                  birthday: times, //生日
                  mobile: that.mobile, //手机号
                  address: that.address, //地址
                  avatar: "http://jdcloud.image.com/4664.pgn" //头像
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

