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
<style lang="less" scoped>
</style>
