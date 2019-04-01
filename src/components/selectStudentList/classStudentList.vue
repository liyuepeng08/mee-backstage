<template>
    <div class="studentList">
        <p class="topNav">
            <span>班级管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">学生列表</span>
        </p>
        <h2>学生列表</h2>

        <div class="tableList">
            <div class="butt">
                <el-button class="addBtn" @click="addStudent" size="small" type="primary" round>添加学生</el-button>
                <el-button
                    class="removeAll"
                    @click="deleteAll"
                    size="small"
                    type="primary"
                    round
                >批量删除</el-button>
                <new-search @getSearchData="getSearchInfo"></new-search>
            </div>
            <el-table
                v-loading="loading"
                class="tableInfo"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="realName" label="名称"></el-table-column>
                <el-table-column prop="gender" label="性别"></el-table-column>
                <el-table-column prop="registerTime" label="添加时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                        <el-button type="text" size="small" @click="deleteMsg(scope,tableData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pos1" v-if="showpage">
                <p class="stuCount">
                    学生人数：
                    <span>{{multipleSelection.length}}</span>
                </p>
                <pages
                    @changeNum="getStudentList"
                    :pageSize="pageSize"
                    :total="total"
                    :pagerCount="pagerCount"
                ></pages>
            </div>
        </div>
    </div>
</template>
<script>
import Pages from "../pages/pages";
import NewSearch from "../newSearch/newSearch";
export default {
    data() {
        return {
            tid: '',
            total: 1,//总条数
            pagerCount: 1, //总页数
            pageSize: 10,
            loading: true,
            showpage: false,
            tableData: [],
            paramsData: {},
            multipleSelection: [],
            roomId: ''
        }
    },
    mounted() {
        this.roomId = this.$route.query.roomId;
        this.tid = sessionStorage.getItem('tid');
        this.getStudentList()
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 获得班级内的学生列表  /classroom/selectStudentList  参数tid roomid
        getStudentList(pageNum) {
            pageNum = pageNum || 1;
            if (JSON.stringify(this.paramsData) === "{}") {
                this.paramsData = { tid: this.tid, roomId: this.roomId, pageIndex: pageNum, pageSize: this.pageSize }
            } else {
                this.paramsData.pageIndex = pageNum;
            }
            this.axiosC.get('/classroom/selectStudentList', { params: { params: this.paramsData } }).then(res => {
                console.log(res)
                if (res.status == 200) {
                    this.loading = false
                    if (res.data.code == 0) {
                        this.total = res.data.data.totalCount;
                        this.pagerCount = res.data.data.totalPage;
                        if (res.data.data.list == '') {
                            this.loading = false
                        }
                        this.showPage = true
                        res.data.data.list.forEach(item => {
                            if (item.gender == 1) {
                                item.gender = '男'
                            } else if (item.gender == 2) {
                                item.gender = '保密'
                            } else {
                                item.gender = '女'
                            }
                        })
                        this.tableData = res.data.data.list;
                    }
                } else {
                    this.loading = false
                }
            })
        },
        // 学生详情
        detailMsg(scope) {
            this.$router.push({
                path: `/admin/detailStudent/${scope.row.uid}`
            });

        },
        // 单条删除
        deleteMsg(scope, rows) {
            this.$confirm(
                "确定要删除" + scope.row.realName + "用户吗？",
                "删除管理员",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).then(() => {
                let tid = sessionStorage.getItem('tid'),
                    params = { tid: tid, uid: scope.row.uid };
                this.axios.get("/tenant/user/delete", {
                    params: { params }
                }).then(res => {
                    this.loading = true
                    if (res.status == 200) {
                        this.loading = false
                        if (res.data.code == 0) {
                            rows.splice(scope.$index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$alert(res.data.msg);
                        }
                    }
                })

            }).catch((error) => {
                console.log(error)
            })
        },
        //跳转选择学生列表页
        addStudent() {
            this.$router.push({
                path: "selectStudentList",
                query:{
                    roomId:this.roomId
                }
            })
        },
        // 批量删除
        deleteAll() {
            if (this.multipleSelection == '') {
                this.$alert('请选择您要删除的信息！')
            } else {
                this.$alert('开发中...<(*￣▽￣*)/')
            }
        },
        // 获得搜索信息
        getSearchInfo(params) {
            this.paramsData = params;
            this.getStudentList()
        },
    },
    watch: {
    $route(to, form) {
      //监听路由变化，返回时刷新数据
      to.path === "/admin/classManage/classStudentList" && this.getStudentList();
    }
  },
    components: {
        Pages,
        NewSearch,
    }
}
</script>
<style lang="less" scoped>
.studentList {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background-color: #f8fafc;
    .topNav {
        font-size: 12px;
        color: #a9a9a9;
        background: #f8fafc;
        .active {
            color: #5693ff;
        }
    }
    h2 {
        font-size: 18px;
        color: #080808;
        margin: 30px 0;
        background: #f8fafc;
    }
    .tableList {
        width: 1126px;
        min-height: 570px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #f1f1f1;
        .butt {
            margin: 20px 0;
            padding-left: 20px;
            .addBtn,
            .removeAll {
                color: #fff;
                font-size: 12px;
                margin-top: 10px;
                box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
            }
            .removeAll {
                background: #f8fafc;
                color: #5693ff;
                box-shadow: none;
            }
        }
        .tableInfo {
            width: 1086px;
            margin: 0 auto;
            border: 1px solid #f1f1f1;
            border-bottom: none;
            border-radius: 4px;
            /deep/ .has-gutter th {
                font-size: 12px;
                color: #080808;
                font-weight: bold;
            }
            /deep/ .has-gutter th:first-child,
            /deep/ .el-table__row td:first-child {
                text-align: center;
            }
        }
        .stuCount {
            font-size: 12px;
            color: #666;
            position: absolute;
            top: 10px;
            left: 20px;
            span {
                color: #5693ff;
            }
        }
    }
}
</style>
