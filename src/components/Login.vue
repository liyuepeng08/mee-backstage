<template>
  <div class="login">
    <div class="loginLogo"></div>
    <div class="loginAccount" id="loginAccount">
      <h3>欢迎登陆</h3>
      <h6>请输入您的账号</h6>
      <input id="account" type="text" placeholder="电子邮件、电话、账号" style="outline:none;">
      <ol>
        <li class="register">
          没有账号 ?
          <a href="#">立即注册 -></a>
        </li>
        <li class="forget">
          <a href="#">忘记用户名？</a>
        </li>
      </ol>
      <div class="bottomButton">
        <input id="cancel" class="cancel" type="button" value="取消">
        <input id="next" type="button" value="下一步">
      </div>
    </div>
    <div class="loginPassword hide" id="loginPassword">
      <h3>欢迎登陆</h3>
      <h6>请输入您的密码</h6>
      <input id="passWord" type="password" placeholder="密码" style="outline:none;">
      <ol>
        <a href="#">忘记密码？</a>
      </ol>
      <a href id="loginLink">
        <input type="button" id="login" value="登陆">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
body {
  background: url(../img/loginBackground.jpg) bottom center no-repeat;
  background-size: 100% 100%;
  position: relative;

  .login {
    width: 700px;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
    border: solid 1px #eeeeee;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -350px;
    margin-top: -250px;

    .loginLogo {
      background: url(../img/loginLogo.png);
      width: 528px;
      height: 129px;
      margin: 0 auto;
      position: relative;
      top: -70px;
    }

    .loginPassword,
    .loginAccount {
      margin: 0px 60px;
      position: relative;

      h3 {
        font-family: MicrosoftYaHei-Bold;
        font-size: 30px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #333333;
      }

      h6 {
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        font-size: 18px;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #333333;
        padding-top: 28px;
      }

      input[type="text"] {
        width: 580px;
        border: none;
        font-family: MicrosoftYaHei;
        font-size: 22px;
        line-height: 54px;
        color: #999999;
        border-bottom: 2px solid #4ca1cc;
        padding-top: 30px;
      }

      ol {
        a {
          display: inline-block;
          padding-top: 45px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 0px;
          color: #435597;
        }
      }

      input[type="button"] {
        width: 120px;
        height: 50px;
        background-color: #435597;
        position: absolute;
        right: 0px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #ffffff;
        border: none;
        margin-top: 50px;
      }
    }

    .loginAccount {
      overflow: hidden;

      ol {
        overflow: hidden;

        .register {
          float: left;
          font-size: 14px;

          a {
            padding-left: 2px;
          }
        }

        .forget {
          float: right;
        }
      }

      .bottomButton {
        height: 140px;

        .cancel {
          right: 140px;
          background: #999;
          color: #ffffff;
        }
      }
    }

    .hide {
      display: none;
    }

    .show {
      display: block;
    }
  }
}
</style>
