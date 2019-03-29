<template>
  <div class="addClass">
    <h3 class="pageTitle">班级详情</h3>
    <!-- <form class="el-form demo-ruleForm"> -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
      style="width:870px"
      size="mini"
    >
      <dl class="model essential">
        <dt>基本信息</dt>
        <el-form-item label="班级名称">
          <div class="detailContent">春天花华小小学</div>
        </el-form-item>
        <el-form-item
          label="班级简介"
          prop="remark"
        >本课是以网球的基本知识、基本技术、技能为主要学习内容。通过合理的网球教学和锻炼过程,使学生热爱网球运动,不仅学会打网球,同时也会欣赏高水平的比赛。</el-form-item>
        <el-form-item label="选择课程">
          <ul class="lessonFather">
            <li class="lesson">
              <div class="lessonImg">
                <img src alt>
              </div>
              <h4>少儿艺体二外英语</h4>
              <div>
                <span class="lessonTitle">英语</span>
                <span>12章节</span>
              </div>
              <div>开课时间</div>
              <div class="lessonBtn">
                <span class="detail">详情</span>
              </div>
            </li>
            <li class="lesson"></li>
            <li class="lesson"></li>
          </ul>
        </el-form-item>
        <el-form-item label="授课教师">
          <ul class="lessonFather">
            <li class="lesson teacher">
              <div class="lessonImg">
                <img src alt>
              </div>
              <p>wufawu</p>
              <p>15010618888</p>
            </li>
            <li class="lesson teacher"></li>
            <li class="lesson teacher"></li>
          </ul>
        </el-form-item>
        <el-form-item label="授课教师" prop="school">
          <el-table
            :data="tableData"
            v-loading="loading"
            style="width: 100%; border: 1px solid #f1f1f1;"
          >
            <el-table-column label="教程名称" width="260">
              <template slot-scope="scope">
                <div class="msg-cont">
                  <div class="list-img">
                    <img :src="scope.row.img" alt>
                  </div>
                  <div class="cont">
                    <div class="title">
                      <a href="#">{{scope.row.title}}</a>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>
            <el-table-column prop="sex" label="性别" width="140"></el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope>
                <el-button type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="addTeaBtn">
            <i class="el-icon-plus"></i>
            添加教师
          </div>
        </el-form-item>
        <pages v-if="totalCount" :pageSize="10" @changeNum="changePage" :total="totalCount"></pages>
      </dl>
    </el-form>

    <!-- </form> -->
  </div>
</template>

<script>
import Pages from "@/components/pages/pages";
export default {
  name: "addClass",
  data() {
    return {
      tableData: [
        {
          img: "https://minecraft.education.jdcloud.com/img/course-pic.png",
          title: "无法无天",
          time: "2019-12-12 12:30",
          sex: "男",
          tid: "12121214"
        },
        {
          img: "https://minecraft.education.jdcloud.com/img/course-pic.png",
          title: "百变小樱",
          time: "2019-12-12 12:31",
          sex: "女",
          tid: "12121213"
        }
      ],
      totalCount: 1, //列表数据的总条数
      loading: false, //保存是否请求表格数据的状态
      ruleForm: {
        tid: "", //租户ID
        tTame: "", //租户名称
        uid: "" //用户ID
      }
    };
  },
  mounted: function() {
    this.obtain(); //获取当前信息
  },
  methods: {
    submit: function(formName) {},
    //获取当前信息
    obtain: function() {
      this.ruleForm.tid = sessionStorage.getItem("tid");
      this.ruleForm.tTame = sessionStorage.getItem("tTame");
    },
    //切换页码回调函数，参数是切换后的页码
    changePage(pageNum) {
      // this.loadCourseList(pageNum, 10);
    }
  },
  components: { Pages }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addClass {
  background: #fff;
  // margin: 10px 10px 0 10px;
  // min-height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  // background-color: #f3f3f5;
  z-index: 100;
  .pageTitle {
    font-size: 18px;
    color: #080808;
    padding: 0px 21px 25px 0px;
    background-color: #f3f3f5;
  }
  //下dl模板
  .model {
    padding: 34px 40px;
    dt {
      padding-bottom: 30px;
    }
    .w493 {
      width: 493px;
    }
    //添加课程
    .lessonFather {
      overflow: hidden;
      //课程
      .lesson {
        width: 120px;
        height: 200px;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #f1f1f1;
        padding: 19px;
        font-size: 12px;
        line-height: 20px;
        color: #666666;
        position: relative;
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        .lessonImg {
          height: 80px;

          background-color: #e4e4e4;
          border-radius: 4px;
          opacity: 0.99;
        }
        h4 {
          color: #080808;
          line-height: 36px;
          font-size: 14px;
          padding-bottom: 10px;
        }
        .lessonTitle {
          width: 50px;
          display: inline-block;
        }
        .lessonBtn {
          color: #5693ff;
          text-align: center;
          position: absolute;
          bottom: 20px;
          padding: 0 14px;
          width: 90px;
          span {
            padding: 0 10px;
          }
        }
      }
      //教师
      .teacher {
        width: 160px;
        height: 238px;
        padding: 0px;
        .lessonImg {
          height: 160px;
        }
        p {
          text-align: center;
          padding: 4px 0px;
        }
      }
      :nth-child(4n) {
        margin-right: 0px;
      }
    }
    //添加老师
    .msg-cont {
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      .list-img {
        width: 40px;
        height: 40px;
        background-color: #bfbfbf;
        float: left;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cont {
        width: 185px;
        float: right;
        height: 40px;
        line-height: 40px;
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          a {
            font-size: 12px;
            color: #666;
            display: block;
          }
        }
        p {
          font-size: 12px;
          color: #a9a9a9;
          margin-top: 35px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    //添加老师按钮
    .addTeaBtn {
      cursor: pointer;
      text-align: center;
      color: #5693ff;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      border: 1px solid rgb(241, 241, 241);
      border-top: none;
      i {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        background-color: #5693ff;
        border-radius: 4px;
        color: #fff;
      }
    }
    //详情样式
    .detailContent {
      font-size: 12px;
      color: #080808;
    }
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
    padding-right: 20px;
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

