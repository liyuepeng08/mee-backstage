<template>
  <div class="reqManager">
    <div class="content">
      <div class="contentBor">
        <ul class="contentLeft">
          <h4>您的专属邀请链接</h4>
          <div class="link"></div>
          <el-row>
            <el-button
              style="width: 180px;height: 40px;margin: 0 140px;background-color: #2e8ed6;border-radius: 4px;"
              type="primary"
            >复制按钮</el-button>
          </el-row>
        </ul>
        <i></i>
        <ul class="contentRight"></ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reqManager",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.reqManager {
  background: #fff;
  margin: 10px 10px 0 10px;
  min-height: 600px;
  padding-bottom: 40px;
  padding-top: 40px;
  .content {
    width: 1025px;
    height: 260px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #cacaca;
    margin: 40px auto;
    padding: 10px;
    .contentBor {
      // width: 100%;
      height: 85%;
      background-color: #f9fcff;
      border-radius: 10px;
      padding: 20px;
      .contentLeft {
        width: 502px;
        height: 100%;
        float: left;
        .el-button--primary {
          margin: 0 auto;
        }
        h4 {
          font-size: 12px;
          font-weight: normal;
          // line-height: 48px;
          color: #333333;
        }
        .link {
          width: 420px;
          height: 60px;
          background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px #cacaca;
          margin: 40px auto;
        }
      }
      i {
        float: left;
        height: 180px;
        width: 1px;
        background-color: #dedede;
        border-radius: 0px;
        margin-top: 20px;
        // border: 1px solid #dedede;
      }
      .contentRight {
        width: 500px;
        height: 100%;
        float: left;
      }
    }
  }
}
</style>
