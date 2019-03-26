<template>
  <div class="addStudent">
    <p class="topNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        <el-breadcrumb-item class="active">学生编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <h3 class="pageTitle">新增教师</h3>
    <el-row class="bread">
      <span :class="{'selected':tab===1}" @click="checkTab(1)">
        <i/>基本信息
      </span>
      <b>></b>
      <span :class="{'selected':tab===2}" @click="checkTab(2)">
        <i/>更多信息
      </span>
      <!-- <b>></b>
      <span :class="{'selected':tab===3}" @click="checkTab(3)">
        <i/>教师资质
      </span>-->
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
        <el-form-item label="头像" prop="name">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="姓名" prop="userName" class="validate">
          <el-input class="w150" v-model="ruleForm.userName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName" class="validate">
          <el-input class="w150" v-model="ruleForm.nickName" placeholder="输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" class="validate">
          <el-input class="w150" v-model="ruleForm.mobile" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select class="w150" v-model="ruleForm.gender" placeholder="请选择性别">
            <el-option label="女" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="保密" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input class="w480" v-model="ruleForm.email" placeholder="输入邮箱"></el-input>
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
      <dl class="model more" v-show="tab === 2">
        <dt>更多信息</dt>
        <el-form-item label="民族" prop="nation">
          <el-input class="w150" v-model="ruleForm.nation" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker class="w150" type="date" placeholder="选择日期" v-model="ruleForm.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="政治面貌" prop="politics">
          <el-select class="w150" v-model="ruleForm.politics" placeholder="请选择">
            <el-option
              :label="item.value"
              :value="item.key"
              v-for="(item,index) in politics"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况" prop="marital">
          <el-select class="w150" v-model="ruleForm.marital" placeholder="请选择">
            <el-option label="未婚" value="0"></el-option>
            <el-option label="已婚" value="1"></el-option>
            <el-option label="保密" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="nativeAddress">
          <el-input class="w480" maxlength="50" v-model="ruleForm.nativeAddress" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="identity">
          <el-input class="w480" maxlength="18" v-model="ruleForm.identity" placeholder="输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="常住地址" prop="address">
          <el-input maxlength="50" class="w480" v-model="ruleForm.address" placeholder="输入内容"></el-input>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="remarks">
          <el-input class="remarks" type="textarea" v-model="ruleForm.remarks" placeholder="输入内容"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button @click="back" class="back" round>上一步</el-button>
          <el-button
            @click="submit('ruleForm')"
            type="primary"
            round
            style="width:120px;height:40px;font-size: 14px;"
          >提交</el-button>
        </el-form-item>
      </dl>
      <dl style="display:none;" class="model aptitude" v-show="tab === 3">
        <dt>教师资质</dt>
        <el-form-item label="教龄" prop="teachingAge">
          <el-input disabled class="w150" v-model="ruleForm.teachingAge" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select disabled class="w150" v-model="ruleForm.education" placeholder="请选择">
            <el-option label="本科" value="0"></el-option>
            <el-option label="硕士" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="subject">
          <el-input class="w150" v-model="ruleForm.subject" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="教学简介" prop="teachingBrief">
          <el-input
            disabled
            class="remarks"
            type="textarea"
            v-model="ruleForm.teachingBrief"
            placeholder="输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="资质证书" prop="certificate">
          <el-row class="certificate" style="width:512px">
            <el-col :span="8">
              <el-upload
                disabled
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="title">上传身份证照片</div>
            </el-col>
            <el-col :span="8">
              <el-upload
                disabled
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="title">上传身份证照片</div>
            </el-col>
            <el-col :span="8">
              <el-upload
                disabled
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="title">上传身份证照片</div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button @click="back" class="back" round>上一步</el-button>
          <el-button
            @click="submit('ruleForm')"
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
        userName: "", //用户名
        nickName: "", //昵称
        password: "", //用户密码
        gender: "2", //性别
        email: "", //邮箱
        mobile: "", //手机号
        school: "", //学校
        phone: "", //电话
        birthday: "", //出生年月
        nation: "", //民族
        nativeAddress: "", //籍贯
        address: "", //所在地址
        parentsMobile: "", //父母电话
        remark: "", //备注
        marital: "2", //婚姻状况
        identity: "", //身份证号
        politics: "13" //政治面貌
      },
      politics: [
        { key: "1", value: "中共党员" },
        { key: "2", value: "中共预备党员" },
        { key: "3", value: "共青团员" },
        { key: "4", value: "民革党员" },
        { key: "5", value: "民盟盟员" },
        { key: "6", value: "民建会员" },
        { key: "7", value: "民进会员" },
        { key: "8", value: "农工党党员" },
        { key: "9", value: "致公党党员" },
        { key: "10", value: "九三学社社员" },
        { key: "11", value: "台盟盟员" },
        { key: "12", value: "无党派人士" },
        { key: "13", value: "群众" }
      ],
      rules: {
        userName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
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
    this.obtain(); //获取当前信息
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
                  realName: that.userName, //真实名
                  nickName: that.nickName, //昵称
                  password: "000000", //用户密码
                  gender: that.gender, //性别
                  email: that.email, //邮箱
                  mobile: that.mobile, //手机号
                  nation: that.nation, //民族
                  birthday: this.birthdayTime(), //生日
                  nativeAddress: that.nativeAddress, //籍贯
                  address: that.address, //所在地址
                  tenantId: tid, //机构
                  role: "1", //角色（老师：1；学生:2）
                  identity: that.identity, //身份证号
                  politics: that.politics //政治面貌
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
    },
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
    //获取当前信息
    obtain: function() {
      // this.ruleForm.tid = sessionStorage.getItem("tid");
      this.ruleForm.school = sessionStorage.getItem("tTame");
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
  //教师资质
  .aptitude {
    padding: 34px 0px 34px 40px;
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

