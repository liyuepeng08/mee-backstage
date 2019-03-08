<template>
  <div class="login">
    <div class="loginBody">
      <img class="logo" src="../assets/images/loginLogo.png" alt>
      <div class="account">
        <input type="text" class="userName" placeholder="请输入手机号/账号">
        <div class="phone">
          <input class="verification" type="text" placeholder="请输入验证码">
          <input class="sendVerification" type="button" value="发送验证码">
        </div>
        <input type="password" placeholder="请输入密码">
        <input type="password" placeholder="确认密码">
      </div>
      <select name="school" id="school" class="school tipsColor">
        <option class="tips" style="display: none;" disabled selected>请选择默认选项或机构</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <div class="addMechanism">+ 添加所属机构</div>
      <input type="button" value="注 册" class="button">
      <div class="aboutLink">
        已有账号：
        <a href>去登录-></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #196197;
  .loginBody {
    width: 300px;
    height: 600px;
    background-color: #f0f0f0;
    box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -320px;
    margin-top: -300px;
    padding: 0 170px;
    .logo {
      padding: 40px 90px;
    }
    .account {
      // height: 100px;
      input {
        border-radius: 4px;
        border: solid 1px #b8b8b8;
        margin-bottom: 10px;
        display: block;
        width: 277px;
        padding: 0 10px;
        height: 47px;
        background-color: #e8e8e8;
        text-indent: 10px;
        outline: none;
      }
      .phone {
        display: flex;
        align-items: center;
        .verification {
          width: 180px;
        }
        .sendVerification {
          width: 110px;
          height: 50px;
          background-color: #2e8ed6;
          border-radius: 4px;
          text-indent: 0px;
          font-size: 12px;
          line-height: 48px;
          color: #ffffff;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }

    .school {
      width: 298px;
      height: 50px;
      background-color: #e8e8e8;
      border-radius: 4px;
      border: solid 1px #b8b8b8;
      padding: 0 10px;
      text-indent: 6px;
      margin-bottom: 10px;
      .tips {
        color: #999;
      }
    }
    .tipsColor {
      color: #89888a;
    }
    .addMechanism {
      width: 140px;
      height: 30px;
      background-color: #f0f0f0;
      border-radius: 4px;
      border: solid 1px #2e8ed6;
      margin-bottom: 40px;
      font-size: 12px;
      line-height: 30px;
      color: #2e8ed6;
      text-align: center;
      cursor: pointer;
    }
    .button {
      width: 300px;
      height: 50px;
      background-color: #2e8ed6;
      border-radius: 4px;
      font-size: 16px;
      line-height: 48px;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
    .aboutLink {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      font-size: 12px;
      color: #333;
      a {
        display: inline;
        color: #2e8ed6;
      }
    }
  }
}
</style>
