<template>
    <div class="course-vue">
        <div class="selectCourse">
            <div class="course-operation clearfix">
                <h2 class="fl">选择课程</h2>
                <div class="course-search fr">
                    <!-- <search :config="searchConfig" @getSearchText="searchCourseList"></search> -->
                </div>
            </div>
            <div class="course-content">
                <el-table
                    class="tableInfo"
                    @selection-change="selectionChange"
                    :data="tableData"
                    v-loading="loading"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="课程信息" width="360">
                        <template slot-scope="scope">
                            <div class="msg-cont clearfix">
                                <div class="list-img fl">
                                    <img :src="scope.row.thumbnail" alt>
                                </div>
                                <div class="cont fl">{{scope.row.title}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="categoryName" label="科目"></el-table-column>

                    <el-table-column prop="chapter" label="章节数"></el-table-column>

                    <el-table-column label="操作">
                        <el-button type="text" size="small">查看</el-button>
                    </el-table-column>
                </el-table>
                <div class="clearfix pos1">
                    <p class="fl selectedTask">
                        已选课程
                        <span>{{selectArray.length}}</span> 门
                    </p>
                    <pages
                        class="fr pageTop"
                        v-if="totalCount"
                        :pageSize="10"
                        @changeNum="changePage"
                        :total="totalCount"
                    ></pages>
                </div>
            </div>
            <ol class="selectedBtn">
                <li @click="giveUpBtn">放弃选择</li>
                <li @click="finished">完成</li>
            </ol>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
//课程管理组件
// import Search from '@/components/search/search'
import Pages from '@/components/pages/pages'
export default {
    data() {
        return {
            tableData: [],
            loading: true,           //保存是否请求表格数据的状态
            totalCount: 0,               //列表数据的总条数

            searchConfig: {            //搜索框配置
                date: true,         //是否显示日期搜索组件
                cascader1: {
                    placeholder: '所属科目',
                    data: []
                },
                text: {       //是否显示input搜索输入框
                    placeholder: '输入课程名称'
                }
            },

            params: {       //加载课程列表传参
                title: '',
                createTime: '',
                categoryId: '',
                pageIndex: 1,
                pageSize: 10,
                status: 1
            },
            selectArray: []
        }
    },
    mounted() {

        //首页加载数据
        this.loadCourseList()

        //加载分类数据，供 搜索用
        this.loadSearchClassify()
    },
    methods: {
        async loadCourseList() {     //参数  当前页数， 每页显示条数
            try {
                let { status, data: { data: dataMsg } } = await this.axiosC({
                    method: 'get',
                    url: '/material/course/listByPage',
                    params: {
                        params: this.params
                    }
                })

                if (status === 200 && dataMsg) {       //请求成功
                    this.loading = false
                    dataMsg.list.forEach((item) => {        //返回的数据处理
                        item.tag = (item.tag1 || '') + ' ' +        //tag合并
                            (item.tag2 || '') + ' ' +
                            (item.tag3 || '') + ' ' +
                            (item.tag4 || '') + ' ' +
                            (item.tag5 || '')

                    })
                    this.tableData = dataMsg.list    //赋值表格数据
                    this.totalCount = dataMsg.totalCount        //总条数赋值
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        //加载 搜索用的 课程分类数据
        async loadSearchClassify() {
            try {

                //获取所有课程类别
                let { status, data: { data: dataMsg } } = await this.axiosC({
                    url: '/material/categroy/list',
                    method: 'get',
                    params: {
                        params: {
                            status: 1
                        }
                    }
                })

                if (status === 200 && dataMsg) {

                    loopArr(dataMsg)

                    //循环数组
                    function loopArr(arr) {
                        for (let i = 0; i < arr.length; i++) {
                            loopObj(arr[i])
                        }
                    }

                    //循环对象
                    function loopObj(obj) {
                        var hasChilds = false
                        for (var item in obj) {
                            if (item === 'childs' && obj.childs.length) {
                                hasChilds = true
                            }
                        }

                        if (hasChilds) {
                            loopArr(obj.childs)
                        }
                        else {
                            delete obj.childs       //最后一级删除掉childs属性
                        }

                    }

                    this.searchConfig.cascader1.data = dataMsg      //赋值给搜索框配置json
                }
            }
            catch (err) {
                console.log(err)
            }

        },
        newCourse() {       //点击"新建"按钮，跳转到 新建课程详情页面
            this.$router.push({
                path: '/admin/courseManage/newCourseDetail'
            })
        },
        edit(courseId) {            //编辑课程按钮点击事件，参数为课程id
            this.$router.push({
                path: '/admin/courseManage/newCourseDetail',
                query: {
                    courseId
                }
            })
        },
        deleteButt(courseId, index) {                  //删除课程按钮点击事件，参数为课程id
            //弹窗确认
            this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {                 // 开始删除
                //删除数据方法
                this.deleteCourse(courseId, index)
            }).catch(() => {
                //取消        
            });
        },
        async deleteCourse(courseId, index) {                //删除课程接口
            try {
                let { status, data: { data: dataMsg, code } } = await this.axiosC({
                    url: '/material/course/update',
                    method: 'get',
                    params: {
                        params: JSON.stringify({
                            id: courseId,
                            status: -1
                        })
                    }
                })

                if (status === 200 && code === 0) {
                    this.tableData.splice(index, 1)     //删除数据
                    this.totalCount--              //总条数减1

                    this.$message("课程删除成功！")
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        changePage(pageNum) {       //切换页码回调函数，参数是切换后的页码
            this.loadCourseList(pageNum, 10)
        },
        searchCourseList(searchMsg) {           //点击搜索，调用的回调函数
            console.log(searchMsg)
            //搜索内容添加到要传递的参数中
            this.params.createTime = searchMsg.date
            this.params.categoryId = searchMsg.categoryId1[searchMsg.categoryId1.length - 1]
            this.params.title = searchMsg.searchText
            this.params.pageIndex = 1
            // params: {       //加载课程列表传参
            //     title: '',
            //     createTime: '',
            //     categoryId: '',
            //     pageIndex: 1,       
            //     pageSize: 10,
            //     status: 1
            // }
            //重新加载表格数据
            this.loadCourseList()
        },
        // 选中课程
        selectionChange(val) {
            this.selectArray = val
        },
        // 放弃选择
        giveUpBtn() {
            this.$emit('giveUp', false)
        },
        // 完成
        finished() {
            if (this.selectArray!='') {
                this.$emit('courseFinishData', this.selectArray)
            }else{
                this.$alert('请选择您要添加的课程！')
            }          
        }
    },
    watch: {
        $route(to, form) {      //监听路由变化，返回时刷新数据

            to.path === '/admin/courseManage' && this.loadCourseList()
        }
    },
    components: {
        // Search,
        Pages,
    }
}
</script>
<style lang="less" scoped>
.course-vue {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    .selectCourse {
        width: 820px;
        height: 600px;
        margin: 30px auto 0 auto;
        background-color: #ffffff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: solid 1px #f1f1f1;
        h2 {
            font-size: 18px;
            color: #080808;
            font-weight: 700;
        }
    }
    .course-content {
        padding: 0 20px;
        box-sizing: border-box;
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
                width: 120px;
                height: 80px;
                border-radius: 4px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
            }
            .cont {
                width: 120px;
                height: 40px;
                border: 1p solid red;
                margin-left: 10px;
            }
        }
        .tableInfo {
            height: 360px;
            border: 1px solid #f1fff1;
            overflow-y: auto;
        }
        .selectedTask {
            font-size: 12px;
            color: #666;
            position: absolute;
            top: 30px;
            left: 20px;
            span {
                color: #5693ff;
            }
        }
        .pageTop {
            margin-top: 20px;
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
            color: #5693ff;
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
.el-table /deep/ th.is-leaf {
    font-weight: 700;
    background-color: #fff;
}
.el-table th > .cell {
    font-weight: 700;
    color: #333333;
}
.course-operation {
    margin: 35px 0 20px 20px;
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

