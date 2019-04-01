<template>
    <div class="courseDetail-vue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建课程</el-breadcrumb-item>
        </el-breadcrumb>
        <h2-title text="新建课程"></h2-title>
        <div class="courseDetail-content">
            <a @click="$router.go(-1)" class="goback">&lt; 返回</a>
            <div class="title-detail clearfix">
                <div class="detail-left fl">
                    <img src="https://minecraft.education.jdcloud.com/img/course-pic.png" alt="">
                </div>
                <div class="detail-right fr">
                    <h2>{{title}}</h2>
                    <p class="subtitle">{{subtitle}}</p>
                    <span class="price"><i>¥</i>{{price}}</span>
                    <div class="label">
                        <el-tag v-for="tag in tagList" :key="tag">{{tag}}</el-tag>
                    </div>
                </div>
            </div>

            <div class="introduce">
                <div class="introduce-title">简介：</div>
                <!-- <p>{{description}}</p> -->
                <p>{{description}}</p>
            </div>

            <div class="uploadFiles">
                <table class="table" border="1" width="100%" align="center">
                    <thead>
                        <tr>
                            <th class="left">名称</th>
                            <th>类型</th>
                            <th>大小</th>
                            <!-- <th class="right">操作</th> -->
                        </tr>
                        <!-- <tr>
                            <th colspan="3" class="left">Linux C语言结构体文档</th>
                            <th class="right"><el-button type="text">重命名</el-button></th>
                        </tr> -->
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in attachList" :key="idx">
                            <td class="left">{{item.name}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.size}}</td>
                        </tr>
        
                    </tbody>
                </table>
            </div>
            <div class="operation">
                <el-button type="primary" round @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import H2Title from '@/components/courseManage/h2'
export default {
    data() {
        return {
            attachList: [],
            title: '',
            subtitle: '',
            description: '',
            price: '',
            tagList: []
        }
    },
    mounted() {
        this.courseId = this.$route.query.courseId
        this.getCourseDetail()          //获取课程详情
        this.getAttachList()            //获取附件列表详情
    },
    methods: {
        async getCourseDetail() {     //更新课程时，获取 课程详情数据
            try {
                this.isLoad = true          //加载数据loading动画显示
                let {status, data: {data: dataMsg}} = await this.axiosC({
                    method: 'get',
                    url: '/material/course/' + this.courseId
                })

                if (status === 200 && dataMsg) {

                    this.title = dataMsg.title
                    this.price = dataMsg.price
                    this.subtitle = dataMsg.subtitle
                    this.description = dataMsg.description
                    for (let i = 0; i < 6; i ++) {
                        dataMsg['tag' + i] && this.tagList.push(dataMsg['tag' + i])
                    }

                }
            }
            catch(err) {
                console.log(err)
            }
            
        },
        async getAttachList() {           //获取附件列表
            let {status, data: {data: attachList}} = await this.axiosC({
                url: '/material/course/attach/' + this.courseId,
                method: 'get',
                params: {
                    params: JSON.stringify({
                        role: 1
                    })
                }
            })

            if (status === 200 && attachList) {
                this.attachList = attachList
            }
        }
    },
    components: {
        H2Title
    }
}
</script>
<style lang="less" scoped>
.courseDetail-vue {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background-color: #F8FAFC;
    z-index: 100;
}
.courseDetail-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;
    border: solid 1px #f1f1f1;
    margin-bottom: 30px;
    .goback {
        display: block;
        width: 50px;
        height: 20px;
        color: #a9a9a9;
        font-size: 12px;
        background-color: #f8fafc;
        border-radius: 4px;
        text-align: center;
        line-height: 20px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .title-detail {
        width: 700px;
        height: 160px;
        border: 1px solid #F1F1F1;
        padding: 20px;
        box-sizing: border-box;
        .detail-left {
            width: 177px;
            height: 115px;
            img {
                width: 177px;
                height: 115px;
            }
        }
        .detail-right {
            width: 450px;
            height: 115px;
            h2 {
                font-size: 16px;
                font-weight: 700;
                line-height: 20px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .subtitle {
                font-size: 14px;
                color: #666666;
                line-height: 30px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .price {
                i {
                    font-size: 12px;
                    margin-right: 5px;
                }
                font-size: 24px;
                color: #C03636;
                font-weight: 700;
                line-height: 30px;
            }
            .label {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                .el-tag {
                    margin-right: 10px;
                }
            }
        }
    }
    .introduce {
        margin-top: 30px;
        margin-bottom: 30px;
        width: 700px;
        .introduce-title {
            margin-bottom: 20px;
            font-weight: 700;
        }
        p {
            text-indent: 2em;
            line-height: 25px;
        }
    }
    .uploadFiles {
        width: 700px;
    }
    .operation {
        width: 700px;
        text-align: center;
        margin-top: 30px;
    }
}
.table {
    border: solid 1px #f1f1f1;
    .left {
        text-align: left;
        padding-left: 20px;
    }
    .right {
        text-align: right;
        padding-right: 20px;
    }
    thead {
        tr {
            border: solid 1px #f1f1f1;
            height: 40px;
            line-height: 40px;
        }
    }
    tbody {
        tr {
            border: solid 1px #f1f1f1;
            height: 50px;
            line-height: 50px;
            background-color: #f8fafc;
            td {
                text-align: center;
            }
        }
    }
}

</style>

