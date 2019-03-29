<template>
  <div class="header">
    <el-row>
      <el-col :span="3">
        <div class="logo">
          <img src="./images/logo.png" alt>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="headerRight">
          <b class="photo">
            <img src="./images/photo.jpg" alt>
          </b>
          <span>ADMIN</span>|
          <span style="cursor:pointer" @click="signOut">退出</span>
          <img class="youx" src="./images/youx.png" alt>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    signOut: function() {
      var uid = sessionStorage.getItem("uid");
      this.axios
        .get("/user/logout", {
          params: {
            params: {
              uid: uid
            }
          }
        })
        .then(response => {
          let data = response.data;
          if (data.code == 0) {
            alert("退出登录成功");
            sessionStorage.removeItem("uid");
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=token; expires=" + date.toGMTString();
            this.$router.push({ path: "/" });
          }
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
.header {
  width: 100%;
  height: 60px;
  background-color: #F8FAFC;
  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    float: left;
  }
  .headerRight {
    height: 60px;
    padding-left: 180px;
    float: right;
    display: flex;
    align-items: center;
    color: #666666;
    font-size: 12px;
    .photo {
      width: 30px;
      height: 30px;
      background-color: #bfbfbf;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      padding: 0 10px;
    }
    .youx {
      padding: 0 20px 0 30px;
    }
  }
}
</style>
