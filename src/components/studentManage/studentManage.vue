<template>
    <div class="studentManager">
        <p class="topNav">
            <span>用户管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">学生管理</span>
        </p>
        <h2>学生管理</h2>
        <div class="butt">
            <el-button
                class="addBtn"
                type="primary"
                size="small"
                round
                icon="el-icon-plus"
                @click="addStudent"
            >新增</el-button>
            <el-upload
                class="upload-demo"
                action="http://116.196.91.10:3000/uploadExcel"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
            >
                <el-button size="small" icon="el-icon-share" round type="primary">点击上传</el-button>
            </el-upload>
            <!-- <el-button class="addBtn" type="primary" icon="el-icon-share" @click="importBtn">导入</el-button> -->
            <a href="./static/用户导入模版.xls" download="用户导入模版">
                <i class="el-icon-download"></i>下载模板
            </a>
            <!-- <el-button
                class="addBtn teachBtn"
                type="primary"
                icon="el-icon-share"
                @click="invite"
            >邀请</el-button>-->
            <new-search @getSearchData="getSearchInfo"></new-search>
        </div>
        <el-table class="studentInfo" v-loading="loading" :data="tableData">
            <el-table-column prop="realName" label="名称"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <!-- <el-table-column prop="class" label="所在班级"></el-table-column>
            <el-table-column prop="mechanism" label="所属机构"></el-table-column>-->
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
            v-if="showpage"
            @changeNum="getStudentList"
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
            isUpload: false,//loading动画状态
            fileUrl: '' ,//上传文件的路径
            isResetPwd:false,
            resetName: ''
        };
    },
    mounted() {
        this.getStudentList()
    },
    methods: {
        // 获得学生信息列表
        getStudentList(pageNum) {
            pageNum = pageNum || 1;
            if (JSON.stringify(this.paramsData) === "{}") {
                this.paramsData = { role: 2, pageIndex: pageNum, pageSize: this.pageSize }
            } else {
                this.paramsData.pageIndex = pageNum;
            }
            let tid = sessionStorage.getItem('tid');
            this.axios
                .get("/tenant/user/list/" + tid, {
                    params: { params: this.paramsData }
                }).then(res => {
                    if (res.status === 200) {
                        this.loading = false;
                        if (res.data.code == 0) {
                            this.total = res.data.data.totalCount;
                            this.pagerCount = res.data.data.totalPage;
                            this.tableData = res.data.data.list;
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
            this.getStudentList()
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
                path: `detailStudent/${scope.row.uid}`
            });
        },
        modifyMsg(scope) {
            // 跳转到编辑
            this.$router.push({
                path: `modifyStudent/${scope.row.uid}`
            });
        },
        // 重置密码
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
        addStudent() {
            this.$router.push({ path: "addStudent" });
        },
        importBtn() {
            alert("你好啊");
        },
        invite() {
            this.$router.push({ path: "reqManager" });
        },
        handleAvatarSuccess(res, file) {      //图片上传成功后的回调
            this.fileUrl = URL.createObjectURL(file.raw);
          
          
            if (res.code === 0) {   //上传成功
                this.getStudentList()       //重新获取学生信息列表
            }
        },
        async beforeAvatarUpload(file) {        //上传图片前的回调
            //excel格式校验
            const isJPG = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            const isLt2M = file.size / 1024 / 1024 < 10;        

            if (!isJPG) {
                this.$message.error('上传文件格式不正确！');
                return false
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
                return false
            }
            // return isJPG && isLt2M;
            this.isUpload = true        //loading动画显示
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
.studentManager {
    padding: 0 10px;
    .el-table th > .cell {
        font-weight: 700;
        color: #080808;
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
            // width: 90px;
            // height: 30px;
            // background: #5693ff;
            // border-radius: 15px;
            // border: solid 1px #5693ff;
            // padding: 0;
            // box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
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
        a {
            font-size: 12px;
            color: #5693ff;
        }
    }
    .studentInfo {
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
.butt .upload-demo {
    display: inline-block;
}
</style>
