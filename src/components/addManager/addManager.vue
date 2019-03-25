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
    >
      <dl class="model essential" v-if="tab === 1">
        <dt>基本信息</dt>
        <!-- <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" placeholder="账号"></el-input>
        </el-form-item>-->
        <el-form-item label="姓名" prop="userName">
          <el-input class="w150" v-model="ruleForm.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
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
        <el-form-item>
          <el-row style="margin-bottom:10px;">
            <el-button
              @click="submit"
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
        email: "", //邮箱
        mobile: "" //手机号
      },
      radio2: 3
    };
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
    submit: function() {
      //新增
      this.axios
        .get("/user/create", {
          params: {
            params: {
              userName: this.userName, //用户名
              password: "000000", //用户密码
              gender: this.gender, //性别
              email: this.email, //邮箱
              mobile: this.mobile //手机号
            }
          }
        })
        .then(function(response) {
          console.log(111);
          let data = response.data;
          console.log("-------data" + data);
          if (data.code == 200) {
            //提交弹出框
            this.$alert("提交成功，请等待审核！", "", {
              confirmButtonText: "返回",
              type: "success",
              showClose: "",
              confirmButtonClass: "round"
              // center: true
            }).then(() => {
              this.$router.push({ path: "/admin" });
            });
          }
        })
        .catch(function(error) {
          console.log(2222);
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
