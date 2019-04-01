<template>
  <div class="course-vue">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <h2-title text="课程管理"></h2-title>
    <div class="course-operation">
      <div class="course-butt">
        <el-button type="primary" round icon="el-icon-plus" @click="newCourse">新建</el-button>
      </div>

      <div class="course-search">
        <search :config="searchConfig" @getSearchText="searchCourseList"></search>
      </div>
    </div>
    <div class="course-content">
      <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%; border: 1px solid #f1f1f1;"
      >
        <el-table-column label="课程信息" width="360">
          <template slot-scope="scope">
            <div class="msg-cont">
              <div class="list-img">
                <img :src="scope.row.thumbnail" alt>
              </div>

              <div class="cont">
                <div class="title">
                  <a href="#">{{scope.row.title}}</a>
                </div>

                <p>{{scope.row.tag}}</p>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="categoryName" label="科目" width="180"></el-table-column>

        <el-table-column prop="chapter" label="章节数"></el-table-column>

        <el-table-column prop="createTime" label="创建时间"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small">详情</el-button> -->
            <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteButt(scope.row.id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pages v-if="totalCount" :pageSize="10" @changeNum="changePage" :total="totalCount"></pages>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
//课程管理组件
import Crumbs from "@/components/crumbs/crumbs";
import Search from "@/components/search/search";
import Pages from "@/components/pages/pages";
import H2Title from "@/components/courseManage/h2";
export default {
  data() {
    return {
      tableData: [],
      loading: true, //保存是否请求表格数据的状态
      totalCount: 0, //列表数据的总条数

      searchConfig: {
        //搜索框配置
        date: true, //是否显示日期搜索组件
        cascader1: {
          placeholder: "所属科目",
          data: []
        },
        text: {
          //是否显示input搜索输入框
          placeholder: "输入课程名称"
        }
      },

      params: {
        //加载课程列表传参
        title: "",
        createTime: "",
        categoryId: "",
        pageIndex: 1,
        pageSize: 10,
        status: 1
      }
    };
  },
  mounted() {
    //首页加载数据
    this.loadCourseList();

    //加载分类数据，供 搜索用
    this.loadSearchClassify();
  },
  methods: {
    async loadCourseList() {
      //参数  当前页数， 每页显示条数
      try {
        let {
          status,
          data: { data: dataMsg }
        } = await this.axiosC({
          method: "get",
          url: "/material/course/listByPage",
          params: {
            params: this.params
          }
        });

        if (status === 200 && dataMsg) {
          //请求成功
          this.loading = false;
          dataMsg.list.forEach(item => {
            //返回的数据处理
            item.tag =
              (item.tag1 || "") +
              " " + //tag合并
              (item.tag2 || "") +
              " " +
              (item.tag3 || "") +
              " " +
              (item.tag4 || "") +
              " " +
              (item.tag5 || "");
          });
          this.tableData = dataMsg.list; //赋值表格数据
          this.totalCount = dataMsg.totalCount; //总条数赋值
        }
      } catch (err) {
        console.log(err);
      }
    },
    //加载 搜索用的 课程分类数据
    async loadSearchClassify() {
      try {
        //获取所有课程类别
        let {
          status,
          data: { data: dataMsg }
        } = await this.axiosC({
          url: "/material/categroy/list",
          method: "get",
          params: {
            params: {
              status: 1
            }
          }
        });

        if (status === 200 && dataMsg) {
          loopArr(dataMsg);

          //循环数组
          function loopArr(arr) {
            for (let i = 0; i < arr.length; i++) {
              loopObj(arr[i]);
            }
          }

          //循环对象
          function loopObj(obj) {
            var hasChilds = false;
            for (var item in obj) {
              if (item === "childs" && obj.childs.length) {
                hasChilds = true;
              }
            }

            if (hasChilds) {
              loopArr(obj.childs);
            } else {
              delete obj.childs; //最后一级删除掉childs属性
            }
          }

          this.searchConfig.cascader1.data = dataMsg; //赋值给搜索框配置json
        }
      } catch (err) {
        console.log(err);
      }
    },
    newCourse() {
      //点击"新建"按钮，跳转到 新建课程详情页面
      this.$router.push({
        path: "/admin/courseManage/newCourseDetail"
      });
    },
    edit(courseId) {
      //编辑课程按钮点击事件，参数为课程id
      this.$router.push({
        path: "/admin/courseManage/newCourseDetail",
        query: {
          courseId
        }
      });
    },
    deleteButt(courseId, index) {
      //删除课程按钮点击事件，参数为课程id
      //弹窗确认
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 开始删除
          //删除数据方法
          this.deleteCourse(courseId, index);
        })
        .catch(() => {
          //取消
        });
    },
    async deleteCourse(courseId, index) {
      //删除课程接口
      try {
        let {
          status,
          data: { data: dataMsg, code }
        } = await this.axiosC({
          url: "/material/course/update",
          method: "get",
          params: {
            params: JSON.stringify({
              id: courseId,
              status: -1
            })
          }
        });

        if (status === 200 && code === 0) {
          this.tableData.splice(index, 1); //删除数据
          this.totalCount--; //总条数减1

          this.$message("课程删除成功！");
        }
      } catch (err) {
        console.log(err);
      }
    },
    changePage(pageNum) {
      //切换页码回调函数，参数是切换后的页码
      this.params.pageIndex = pageNum;
      this.loadCourseList(pageNum, 10);
    },
    searchCourseList(searchMsg) {
      //点击搜索，调用的回调函数
      console.log(searchMsg);
      //搜索内容添加到要传递的参数中
      this.params.createTime = searchMsg.date;
      this.params.categoryId =
        searchMsg.categoryId1[searchMsg.categoryId1.length - 1];
      this.params.title = searchMsg.searchText;
      this.params.pageIndex = 1;
      // params: {       //加载课程列表传参
      //     title: '',
      //     createTime: '',
      //     categoryId: '',
      //     pageIndex: 1,
      //     pageSize: 10,
      //     status: 1
      // }
      //重新加载表格数据
      this.loadCourseList();
    }
  },
  watch: {
    $route(to, form) {
      //监听路由变化，返回时刷新数据

      to.path === "/admin/courseManage" && this.loadCourseList();
    }
  },
  components: {
    Crumbs,
    Search,
    Pages,
    H2Title
  }
};
</script>
<style lang="less" scoped>
.el-table /deep/ th.is-leaf {
  font-weight: 700;
  background-color: #fff;
}
.el-table th > .cell {
  font-weight: 700;
  color: #333333;
}
.course-vue {
  position: relative;
  min-height: 100%;
}
.msg-cont {
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  .list-img {
    width: 120px;
    height: 80px;
    float: left;
    img {
      width: 120px;
      height: 80px;
    }
  }
  .cont {
    width: 215px;
    float: right;
    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      a {
        font-size: 14px;
        color: #080808;
        font-weight: 700;
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
.course-operation {
  margin-bottom: 20px;
  &:after {
    content: "";
    clear: both;
    display: block;
  }
  .course-butt {
    float: left;
    width: 20%;
  }
  .course-search {
    width: 900px;
    float: right;
  }
}
</style>

