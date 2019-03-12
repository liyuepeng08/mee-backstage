<template>
  <div class="reqManager">
    <div class="content">
      <div class="contentBor">
        <ul class="contentLeft">
          <h4>您的专属邀请链接</h4>
          <div class="link">http://www.jdcloud.com/cn/products/data-compute</div>
          <el-row>
            <el-button
              style="width: 180px;height: 40px;margin: 0 140px;background-color: #2e8ed6;border-radius: 4px;"
              type="primary"
            >复制按钮</el-button>
          </el-row>
        </ul>
        <i></i>
        <ul class="contentRight">
          <h4>您的专属二维码</h4>
          <img src="./images/reqManager.jpg" alt>
        </ul>
      </div>
    </div>
    <div class="Methods">
      <h3>选择推荐方式</h3>
      <el-row class="MethodList">
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="./images/weix.png" alt>
            <span>微信</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <img src="./images/weib.png" alt>
            <span>微博</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="./images/qq.png" alt>
            <span>QQ</span>
          </div>
        </el-col>
      </el-row>
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
  padding-bottom: 40px;
  padding-top: 40px;
  .content {
    width: 1045px;
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
        width: 522px;
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
          font-size: 12px;
          line-height: 48px;
          letter-spacing: 0px;
          color: #999999;
          padding-left: 20px;
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
        width: 462px;
        height: 100%;
        float: left;
        padding-left: 20px;
        h4 {
          font-size: 12px;
          font-weight: normal;
          color: #333333;
        }
        img {
          margin: 40px auto;
          display: block;
        }
      }
    }
  }
  .Methods {
    height: 160px;
    background-color: #ffffff;
    margin-left: 132px;
    h3 {
      font-size: 14px;
      line-height: 48px;
      color: #333333;
    }
    .grid-content {
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #333333;
    }
    img {
      padding-right: 10px;
      width: 40px;
    }
  }
}
</style>
