<template>
  <div class="course-vue">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级列表</el-breadcrumb-item>
    </el-breadcrumb>
    <h2-title text="班级管理"></h2-title>
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
        <!-- <el-table-column label="教程名称" width="360">
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
        </el-table-column>-->
        <el-table-column prop="name" label="班级名称" width="340"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="在班学生(人)" width="340">
          <template slot-scope="scope">
            <div class="people">
              <span>{{scope.row.studentNum?scope.row.studentNum:0}}</span>
              <i @click="nextHref" class="el-icon-edit-outline"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)">详情</el-button>
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
        text: {
          //是否显示input搜索输入框
          placeholder: "输入要查询的名称"
        }
      },
      tid: sessionStorage.getItem("tid"), //租户ID
      params: {
        //加载课程列表传参
        tid: sessionStorage.getItem("tid"),
        pageIndex: 1
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
          url: "classroom/listByPage",
          params: {
            params: this.params
          }
        });

        if (status === 200 && dataMsg) {
          //请求成功
          console.log(dataMsg.list);
          this.loading = false;
          // dataMsg.list.forEach(item => {
          //   //返回的数据处理

          //   item.studentNum ? "" : (item.studentNum = 0);

          // });
          this.tableData = dataMsg.list; //赋值表格数据
          this.totalCount = dataMsg.totalCount; //总条数赋值
        } else {
          this.loading = false;
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
        // this.$message("获取数据失败！");
        console.log(err);
      }
    },
    //新建
    newCourse() {
      //点击"新建"按钮，跳转到 新建课程详情页面
      this.$router.push({
        path: "/admin/classManage/addClass"
      });
    },
    //编辑
    edit(courseId) {
      //编辑课程按钮点击事件，参数为课程id
      this.$router.push({
        path: "/admin/classManage/addClass",
        query: {
          courseId
        }
      });
    },
    //详情
    detail(roomId) {
      //编辑课程按钮点击事件，参数为课程id
      this.$router.push({
        path: "/admin/classManage/detailClass",
        query: {
          roomId
        }
      });
    },
    //删除
    deleteButt(roomId, index) {
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
          this.deleteCourse(roomId, index);
        })
        .catch(() => {
          //取消
        });
    },
    //删除课程接口
    async deleteCourse(roomId, index) {
      try {
        let {
          status,
          data: { data: dataMsg, code }
        } = await this.axiosC({
          url: "/classroom/update",
          method: "get",
          params: {
            params: JSON.stringify({
              id: roomId,
              status: 3
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
    //切换页码回调函数，参数是切换后的页码
    changePage(pageNum) {
      this.params.pageIndex = pageNum;
      this.loadCourseList(pageNum, 10);
    },
    //点击搜索，调用的回调函数
    searchCourseList(searchMsg) {
      //点击搜索，调用的回调函数
      console.log(searchMsg);
      //搜索内容添加到要传递的参数中
      this.params.createTime = searchMsg.date;
      this.params.name = searchMsg.searchText;
      this.params.pageIndex = 1;
      //重新加载表格数据
      this.loadCourseList();
    },
    // 跳转学生列表
    nextHref() {
      this.$router.push({
        path: "classManage/classStudentList"
      });
    }
  },
  watch: {
    $route(to, form) {
      //监听路由变化，返回时刷新数据

      to.path === "/admin/classManage" && this.loadCourseList();
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
.course-vue {
  position: relative;
  min-height: 100%;
  //在班人数
  .people {
    span {
      width: 56px;
      display: inline-block;
    }
    i {
      color: #5693ff;
      cursor: pointer;
      padding: 10px;
    }
  }
}
</style>
<style lang="less">
.el-table th.is-leaf {
  font-size: 700;
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

