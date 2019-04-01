<template>
    <div class="teacherList">
        <div class="tableList pos1">
            <div class="clearfix">
                <h2 class="fl">选择教师</h2>
                <div class="fr search">
                    <ul class="clearfix">
                        <li class="fl">
                            <input type="text" placeholder="请输入名称/所属机构/电话">
                        </li>
                        <li>
                            <span></span>
                        </li>
                    </ul>
                </div>
            </div>
            <el-table
                v-loading="loading"
                class="tableInfo"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                @selection-change="selectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="名称">
                    <template slot-scope="scope">
                        <div class="msg-cont clearfix">
                            <div class="list-img fl">
                                <img src="./photo.jpg" alt>
                            </div>
                            <div class="cont fl">{{scope.row.realName}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="registerTime" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div v-if="isEmpty">
                <div class="clearfix pageBox">
                    <p class="stuCount fl">
                        已选教师：
                        <span>{{selectedArr.length}}</span> 名
                    </p>
                    <div class="fr">
                        <pages
                            v-if="showpage"
                            @changeNum="getTeacherList"
                            :pageSize="pageSize"
                            :total="total"
                            :pagerCount="pagerCount"
                        ></pages>
                    </div>
                </div>

                <ol class="selectedBtn">
                    <li @click="giveUp">放弃选择</li>
                    <li @click="finished">完成</li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script>
import Pages from "../pages/pages";
export default {
    props: ['courseId'],
    data() {
        return {
            tid: '',
            total: 1,//总条数
            pagerCount: 1, //总页数
            pageSize: 10,
            loading: true,
            showpage: true,
            tableData: [],
            paramsData: {},
            selectedArr: [],//当前选择
            selectedAllArray: [],//所有选择
            isEmpty: true,
            roomId: '',
            role: 1
        }
    },
    mounted() {
        this.roomId = this.courseId
        this.tid = sessionStorage.getItem('tid');
        this.getTeacherList();
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
                            // console.log(res.data.data.list)
                            this.total = res.data.data.totalCount;
                            this.pagerCount = res.data.data.totalPage;

                            this.tableData = res.data.data.list;
                            if (res.data.data.list == '') {
                                this.showPage = false
                                this.isEmpty = false
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
        // 教师详情
        detailMsg(scope) {
            this.$router.push({
                path: `/admin/detailTeacher/${scope.row.uid}`
            });

        },
        // 获得搜索信息
        getSearchInfo(params) {
            this.paramsData = params;
            this.getTeacherList()
        },
        // 返回
        giveUp() {
            this.$emit('isShowed', false)
        },

        // 完成
        finished() {
            if (this.selectedArr == '') {
                this.$alert('请选择您要添加的学生！')
            } else {
                let tid = Number(sessionStorage.getItem('tid'))
                this.selectedArr.forEach(item => {
                    item.tid = tid;
                    item.role = this.role;
                    item.roomId = this.roomId
                })
                let params = { params: { "users": this.selectedArr } }
                this.axiosC.post('/classroom/addClassUser',params).then(res => {
                    console.log(res);
                    if (res.status == 200) {

                    }
                })
            }
        }
    },
    components: {
        Pages,
    }
}
</script>
<style lang="less" scoped>
.teacherList {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;

    .tableList {
        width: 820px;
        height: 600px;
        padding: 0 20px;
        background: #fff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: solid 1px #f1f1f1;
        box-sizing: border-box;
        position: absolute;
        top: 5%;
        left: 20%;
        overflow: hidden;
        h2 {
            font-size: 18px;
            color: #080808;
            margin: 30px 0 20px 0;
        }
        .search {
            margin: 30px 0 20px 0;
            li {
                position: relative;
                margin-right: 40px;

                input {
                    padding: 0 10px;
                    width: 200px;
                    height: 30px;
                    background-color: #ffffff;
                    border-radius: 4px;
                    border: solid 1px #cacaca;
                    font-size: 12px;
                    box-sizing: border-box;
                }
                span {
                    display: block;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: url("./search.png") no-repeat center center #ccc;
                    background-size: 50% 50%;
                    position: absolute;
                    right: 0;
                    cursor: pointer;
                }
            }
            li:last-child {
                margin-right: 0;
            }
        }
        .tableInfo {
            width: 1086px;
            height: 375px;
            margin: 0 auto;
            border: 1px solid #f1f1f1;
            border-bottom: none;
            border-radius: 4px;
            overflow: hidden;
            overflow-y: auto;
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
            /deep/ .el-table__row td {
                .list-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .cont {
                    margin: 8px 5px;
                }
            }
        }
        .pageBox {
            padding-left: 20px;
            .stuCount {
                font-size: 12px;
                color: #666;
                margin-top: 40px;
                span {
                    color: #5693ff;
                }
            }
        }
        .selectedBtn {
            width: 260px;
            margin: 0px auto;
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
                color: #5693ff;
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
