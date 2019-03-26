<template>
    <div class="adminUser">
        <p class="topNav">
            <span>用户管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">管理员管理</span>
        </p>
        <h2>管理员管理</h2>
        <div class="butt">
            <el-button class="addBtn" type="primary" icon="el-icon-plus" @click="addAdmin">新增</el-button>
            <!-- <el-button
                class="addBtn teachBtn"
                type="primary"
                icon="el-icon-share"
                @click="invite"
            >邀请</el-button>-->
            <new-search @getSearchData="getSearchInfo"></new-search>
        </div>
        <el-table class="adminInfo" :data="tableData">
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="organization" label="所属机构"></el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteMsg(scope,rows)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pages
            v-if="showpage"
            @changeNum="getAdminList"
            :pageSize="pageSize"
            :total="total"
            :pagerCount="pagerCount"
        ></pages>
    </div>
</template>
<script>
import Pages from "../pages/pages";
import NewSearch from "../newSearch/newSearch";
export default {
    data() {
        return {
            tableData: [],
            total: 1,//总条数
            pagerCount: 1, //总页数
            pageSize: 10,
            loading: true,
            showpage: true,
            paramsData: {},
            tid: ''
        }
    },
    mounted() {
        this.tid = sessionStorage.getItem('tid');
        this.getAdminList();
    },
    methods: {
        getAdminList(pageNum) {
            pageNum = pageNum || 1;
            if (JSON.stringify(this.paramsData) === "{}") {
                this.paramsData = { role: 3, pageIndex: pageNum, pageSize: this.pageSize }
            } else {
                this.paramsData.pageIndex = pageNum;
                this.paramsData.role = 3;
            }

            this.axios
                .get("/tenant/user/list/" + this.tid, {
                    params: { params: this.paramsData }
                }).then(res => {
                    if (res.status === 200) {
                        this.loading = false;
                        if (res.data.code == 0) {
                            this.total = res.data.data.totalCount;
                            this.pagerCount = res.data.data.totalPage;
                            this.tableData = res.data.data.list;
                            console.log(this.tableData)
                            if (res.data.data.list == '') {
                                this.showPage = false
                            }
                        }
                    } else {
                        this.loading = true
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
                let tid = sessionStorage.getItem('tid'),
                    params = { tid: tid, uid: scope.row.uid };
                this.axios.get("/tenant/user/delete", {
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
                            alert(res.data.msg);
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
            });
        },
        detailMsg(scope) {
            this.$router.push({
                path: `detailManager/${scope.row.uid}`
            })
        },
        addAdmin() {
            this.$router.push({
                path: 'addManager'
            })
        },
        invite() {
            this.$router.push({
                path: ' reqManager'
            })

        }
    },
    components: {
        Pages,
        NewSearch
    }
};
</script>
<style lang="less">
.adminUser {
    padding: 0 10px;
    .el-table th > .cell {
        font-weight: 700;
        color: #333333;
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
        .addBtn {
            width: 90px;
            height: 30px;
            background: #5693ff;
            border-radius: 15px;
            border: solid 1px #5693ff;
            padding: 0;
            box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
        }
        .teachBtn {
            background: #f8fafc;
            color: #5693ff;
            margin-left: 20px;
        }
        .active {
            color: #fff;
            background-color: #5693ff;
            box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
        }
    }
    .adminInfo {
        margin-top: 20px;
        border: 1px solid #f1f1f1;
        /deep/ th {
            padding-left: 20px;
        }
        /deep/ .el-table__row {
            td {
                padding-left: 20px;
            }
        }
    }
}
</style>
