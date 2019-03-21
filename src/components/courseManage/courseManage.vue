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
                style="width: 100%; border: 1px solid #f1f1f1;">

                <el-table-column
                    prop="name"
                    label="课程信息"
                    width="360">
                    
                    <template slot-scope="scope">
                        <div class="msg-cont">
                            <div class="list-img">
                                <img :src="scope.row.img" alt="">
                            </div>
                        
                            <div class="cont">
                                <div class="title">
                                    <a href="#">{{scope.row.name}}</a>
                                </div>

                                <p>{{scope.row.describe}}</p>
                            </div>
                        </div>
                    </template>

                </el-table-column>

                <el-table-column
                    prop="subject"
                    label="科目"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="chapter"
                    label="章节数">
                </el-table-column>

                <el-table-column
                    prop="time"
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
            <pages></pages>
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
            tableData: [{
                time: '2016-05-02',
                name: '爱谁谁',
                describe: '12-16岁，14-18岁',
                img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3546951286,2409603795&fm=173&app=49&f=JPEG?w=218&h=146&s=1786D60011BD1D827C210913010080E2',
                subject: '英语',
                chapter: 10
            }, {
                time: '2016-05-02',
                name: '爱谁谁',
                describe: '12-16岁，14-18岁',
                img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3546951286,2409603795&fm=173&app=49&f=JPEG?w=218&h=146&s=1786D60011BD1D827C210913010080E2',
                subject: '英语',
                chapter: 10
            }, {
                time: '2016-05-02',
                name: '爱谁谁',
                describe: '12-16岁，14-18岁',
                img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3546951286,2409603795&fm=173&app=49&f=JPEG?w=218&h=146&s=1786D60011BD1D827C210913010080E2',
                subject: '英语',
                chapter: 10
            }, {
                time: '2016-05-02',
                name: '爱谁谁',
                describe: '12-16岁，14-18岁',
                img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3546951286,2409603795&fm=173&app=49&f=JPEG?w=218&h=146&s=1786D60011BD1D827C210913010080E2',
                subject: '英语',
                chapter: 10
            }]
        }
    },
    methods: {
        newCourse() {
            this.$router.push({
                path: '/admin/courseManage/newCourseDetail'
            })
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

