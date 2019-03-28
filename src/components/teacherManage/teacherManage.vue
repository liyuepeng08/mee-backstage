<template>
    <div class="teacherManager">
        <p class="topNav">
            <span>用户管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">教师管理</span>
        </p>
        <h2>教师管理</h2>
        <div class="butt">
            <el-button
                class="teachBtn active"
                type="primary"
                icon="el-icon-plus"
                @click="addTeacher"
            >新建</el-button>
            <!-- <el-button class="teachBtn" type="primary" icon="el-icon-share" @click="invite">邀请</el-button> -->
            <new-search @getSearchData="getSearchInfo"></new-search>
        </div>
        <el-table class="tablelInfo" v-loading="loading" :data="tableData">
            <el-table-column prop="realName" label="名称"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="registerTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    <el-button type="text" size="small" @click="modifyMsg(scope)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteMsg(scope,tableData)">删除</el-button>
                    <el-button type="text" size="small" @click="resetPassword(scope)">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pages
            v-if="showPage"
            @changeNum="getTeacherList"
            :pageSize="pageSize"
            :total="total"
            :pagerCount="pagerCount"
        ></pages>
        <transition name="el-fade-in-linear">
            <reset-password
                class="transition-box"
                :resetName="resetName"
                @changeStatus="getStatus"
                v-if="isResetPwd"
            ></reset-password>
        </transition>
    </div>
</template>
<script>
import Pages from "../pages/pages";
import NewSearch from "../newSearch/newSearch";
import ResetPassword from '../resetPassword/resetPassword'
// import Install from '@/config/checkRule'
export default {
    data() {
        return {
            tableData: [],
            total: 1,//总条数
            pagerCount: 1, //总页数
            pageSize: 10,
            loading: true,
            showPage: true,
            paramsData: {},
            tid: '',
            isResetPwd: false,
            resetName: ''
        };
    },
    mounted() {
        this.tid = sessionStorage.getItem('tid');
        this.getTeacherList();

    },
    methods: {
        getTeacherList(pageNum) {
            pageNum = pageNum || 1;
            if (JSON.stringify(this.paramsData) === "{}") {
                this.paramsData = { role: 1, pageIndex: pageNum, pageSize: this.pageSize }
            } else {
                this.paramsData.pageIndex = pageNum;
            }
            this.axios
                .get("/tenant/user/list/" + this.tid, {
                    params: { params: this.paramsData }
                }).then(res => {
                    if (res.status === 200) {
                        this.loading = false
                        if (res.data.code == 0) {
                            // console.log(res.data)
                            this.total = res.data.data.totalCount;
                            this.pagerCount = res.data.data.totalPage;
                            this.tableData = res.data.data.list;
                            if (res.data.data.list == '') {
                                this.showPage = false
                            }
                        }
                    } else {
                        this.loading = false
                        this.$alert(res.data.msg, {
                            dangerouslyUseHTMLString: true
                        });
                    }
                }).catch((error) => {
                    console.log(error)
                });
        },
        // 获得搜索信息
        getSearchInfo(params) {
            this.paramsData = params;
            this.getTeacherList()
        },

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
                let params = { tid: this.tid, uid: scope.row.uid };
                this.axios
                    .get("/tenant/user/delete", {
                        params: { params }
                    }).then(res => {
                        if (res.status === 200) {
                            if (res.data.code == 0) {
                                rows.splice(scope.$index, 1);
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$alert(res.data.msg, {
                                    dangerouslyUseHTMLString: true
                                });
                            }
                        }
                    }).catch((error) => {
                        console.log(error)
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        detailMsg(scope) {
            this.$router.push({
                path: `detailTeacher/${scope.row.uid}`
            });
        },
        modifyMsg(scope) {
            // 跳转到编辑
            this.$router.push({
                path: `modifyTeacher/${scope.row.uid}`
            });
        },
        resetPassword(scope) {
            this.resetName = scope.row.realName
            this.isResetPwd = true
        },
        getStatus(txt, pwd) {
            if (txt) {
                // if (Install.isPwd(pwd.newPwd1) && Install.iPwd(pwd.newPwd2)) {
                //     console.log(pwd.newPwd1, pwd.newPwd2);
                // } else {
                //     this.$alert('密码格式不正确！', {
                //         dangerouslyUseHTMLString: true
                //     });
                // }
                if (pwd.newPwd1 == '' && pwd.newPwd2 == '') {
                    this.$alert('密码不能为空！', {
                        dangerouslyUseHTMLString: true
                    });
                } else if (pwd.newPwd1 == '' && pwd.newPwd2 != '' || pwd.newPwd2 == '' && pwd.newPwd1 != '' || pwd.newPwd1 != pwd.newPwd2) {
                    this.$alert('密码输入不一致！', {
                        dangerouslyUseHTMLString: true
                    });
                } else if (pwd.newPwd1 == pwd.newPwd2) {
                    this.$alert('密码修改成功！', {
                        dangerouslyUseHTMLString: true
                    });
                    this.isResetPwd = false
                }
            } else {
                this.isResetPwd = false
            }
        },
        addTeacher() {
            this.$router.push({
                path: "addTeacher"
            });
        },
        invite() {
            //邀请
            this.$router.push({
                path: "reqManager"
            });
        }
    },
    components: {
        Pages,
        NewSearch,
        ResetPassword
    }
};
</script>
<style lang="less">
.teacherManager {
    padding: 0 10px;
    .el-table th > .cell {
        font-weight: 700;
        color: #080808;
        padding-left: 30px;
    }
    .topNav {
        font-size: 12px;
        color: #a9a9a9;
        .active {
            color: #5693ff;
        }
    }
    h2 {
        font-size: 18px;
        color: #080808;
        margin-top: 29px;
    }
    .butt {
        margin-top: 31px;
        .teachBtn {
            width: 90px;
            height: 30px;
            color: #5693ff;
            background: #f8fafc;
            border-radius: 15px;
            border: solid 1px #5693ff;
            padding: 0;
        }
        .active {
            color: #fff;
            background-color: #5693ff;
            box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
        }
    }
    .tablelInfo {
        margin-top: 20px;
        border: 1px solid #f1f1f1;
        border-bottom: none;
        /deep/ tr {
            background: #fff;
        }
        /deep/ .el-table__row {
            td {
                padding-left: 20px;
            }
        }
    }
}
</style>
