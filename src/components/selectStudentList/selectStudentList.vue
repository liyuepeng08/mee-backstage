<template>
    <div class="studentList">
        <p class="topNav">
            <span>班级管理</span>
            <i class="el-icon-arrow-right"></i>
            <span>学生列表</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">选择学生</span>
        </p>
        <h2>选择学生</h2>

        <div class="tableList pos1">
            <p class="stuCount">
                已选人数：
                <span>{{selectedArr.length}}</span>
            </p>
            <new-search class="getSearch" @getSearchData="getSearchInfo"></new-search>
            <el-table
                v-loading="loading"
                class="tableInfo"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                @selection-change="selectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="realName" label="名称"></el-table-column>
                <el-table-column prop="gender" label="性别"></el-table-column>
                <el-table-column prop="registerTime" label="添加时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
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
            <ol class="selectedBtn">
                <li @click="returnBack">返回</li>
                <li @click="finished">完成</li>
            </ol>
        </div>
    </div>
</template>
<script>
import Pages from "../pages/pages";
import NewSearch from "../newSearch/newSearch";
export default {
    data() {
        return {
            total: 1,//总条数
            pagerCount: 1, //总页数
            pageSize: 10,
            loading: true,
            showpage: true,
            tableData: [],
            paramsData: {},
            selectedArr: [],//当前选择
            selectedAllArray: [],//所有选择
            role: 2,
            roomId: ''
        }
    },
    mounted() {
        this.getStudentList();
        // this.removal();
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
        selectionChange(val) {
            this.selectedArr = val;
            // this.selectedArr.forEach(item => {
            //     if (this.selectedAllArray.indexOf(item.id) == -1) {
            //         this.selectedAllArray.push(item)
            //     }
            // });
            // console.log(this.selectedAllArray) 
            // this.toggleSelection(this.selectedAllArray) 
        },
        removal() {
            if (this.selectedAllArray != '') {
                for (let i = 0; i < this.selectedAllArray.length; i++) {
                    for (let j = 0; j < this.tableData.length; j++) {
                        if (this.selectedAllArray[i].id == this.tableData[j].id) {
                            this.selectedArr.push(this.tableData[j])
                        }
                    }
                }
            } else {
                console.log(2322);
            }
        },
        // 获得学生列表
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
                            if (res.data.data.list == '') {
                                this.showPage = false
                            }
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
                        this.loading = true
                    }
                }).catch((error) => {
                    console.log(error)
                });
        },
        // 学生详情
        detailMsg(scope) {
            this.$router.push({
                path: `/admin/detailStudent/${scope.row.uid}`
            });

        },
        // 获得搜索信息
        getSearchInfo(params) {
            this.paramsData = params;
            this.getStudentList()
        },
        // 返回
        returnBack() {
            history.back(-1)
        },
        // 完成
        finished() {
            if (this.selectedArr == '') {
                this.$alert('请选择您要添加的学生！')
            } else {
                // console.log(this.selectedArr);
                let tid = Number(sessionStorage.getItem('tid'))
                this.selectedArr.forEach(item => {
                    if (item.gender == '保密') {
                        item.gender = 2
                    } else if (item.gender == '男') {
                        item.gender = 1
                    } else {
                        item.gender = 0
                    }
                    item.tid = tid;
                    item.role = this.role;
                    item.roomId = this.courseId
                })
                let params = { params: { "users": this.selectedArr } }
                this.axiosC.post('/classroom/addClassUser', params).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        
                    }
                })
            }
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
    background-color: #f3f3f5;
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
        margin: 30px 0;
    }
    .stuCount {
        margin-top: 20px;
        color: #666;
        font-size: 12px;
        span {
            color: #5693ff;
        }
    }
    .getSearch {
        margin: 10px 0 20px 0;
    }
    .tableList {
        width: 1126px;
        min-height: 570px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #f1f1f1;

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
            /deep/ .has-gutter th:nth-child(5),
            /deep/ .el-table__row td:last-child {
                text-align: right;
                padding-right: 30px;
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
        .selectedBtn {
            width: 260px;
            margin: 20px auto;
            li {
                display: inline-block;
                width: 120px;
                height: 40px;
                font-size: 14px;
                line-height: 40px;
                background-color: #ffffff;
                border-radius: 20px;
                border: solid 1px #5693ff;
                text-align: center;
                margin-right: 10px;
                cursor: pointer;
            }
            li:last-child {
                margin-right: 0;
                color: #fff;
                background-color: #5693ff;
                box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
            }
        }
    }
}
</style>
