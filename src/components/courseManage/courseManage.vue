<template>
    <div class="course-vue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>课程列表</el-breadcrumb-item>
        </el-breadcrumb>
        <h2-title text="课程管理"></h2-title>
        <search></search>
        <div class="course-content">
            <el-button type="primary" icon="el-icon-plus" @click="newCourse">新建</el-button>

            <el-table
                :data="tableData"
                v-loading="loading"
                style="width: 100%; border: 1px solid #f1f1f1;">

                <el-table-column
                    label="课程信息"
                    width="360">
                    
                    <template slot-scope="scope">
                        <div class="msg-cont">
                            <div class="list-img">
                                <img :src="scope.row.thumbnail" alt="">
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

                <el-table-column
                    prop="categoryName"
                    label="科目"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="chapter"
                    label="章节数">
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间">
                </el-table-column>

                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">详情</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
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
import Crumbs from '@/components/crumbs/crumbs'
import Search from '@/components/search/search'
import Pages from '@/components/pages/pages'
import H2Title from '@/components/courseManage/h2' 
export default {
    data() {
        return {
            tableData: [],
            loading: true,           //保存是否请求表格数据的状态
            totalCount: ''               //列表数据的总条数
        }
    },
    async mounted() {
        try {
            
            let {status, data: {data: dataMsg}} = await this.axios({
                method: 'get',
                url: '/material/course/listByPage',
                params: {
                    params: {
                        pageIndex: 1,
                        pageSize: 10
                    }
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

                    console.log(item.tag)
                })     
                this.tableData = dataMsg.list    //赋值表格数据
                this.totalCount = dataMsg.totalCount        //总条数赋值

            }
        }
        catch(err) {
            console.log(err)
        }
    },
    methods: {
        newCourse() {
            this.$router.push({         //点击"新建"按钮，跳转到 新建课程详情页面
                path: '/admin/courseManage/newCourseDetail'
            })
        },
        changePage(pageNum) {       //切换页码回调函数，参数是切换后的页码
            console.log("页码：" + pageNum)
        }
    },
    components: {
        Crumbs,
        Search,
        Pages,
        H2Title
    }
}
</script>
<style lang="less">
.el-table th.is-leaf {
    font-size: 700;
}
.el-table th>.cell {
    font-weight: 700;
    color: #333333;
}
.course-vue {
    position: relative;
    min-height: 100%;
}
.msg-cont {
    &:after {
        content: '';
        display: block;
        clear: both
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
</style>

