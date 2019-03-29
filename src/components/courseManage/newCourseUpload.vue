<template>
    <div class="newCourseUpload-vue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建课程</el-breadcrumb-item>
        </el-breadcrumb>
        <h2-title text="新建课程"></h2-title>
        <div class="title">
            <span><i>○</i> &nbsp; 基本信息</span> &nbsp; &gt; &nbsp; <span class="selected"><i>●</i> &nbsp; 课件上传</span>
        </div>
        <div class="newCourseUpload-content">
            
            <h2 class="h-title">课件上传</h2>
            <!-- <el-row>
                <el-col :span="3">课程介绍：</el-col>
                <el-col :span="10">
                    <el-input type="textarea" placeholder="" :rows="4"></el-input>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="3">上传视频：</el-col>
                <el-col :span="15">
                   <table class="table" border="1" width="100%" align="center">
                       <thead>
                           <tr>
                               <th class="left">名称</th>
                               <th>类型</th>
                               <!-- <th>时长</th> -->
                               <th>大小</th>
                               <th class="right">操作</th>
                           </tr>
                           <!-- <tr>
                               <th colspan="3" class="left">Linux C语言结构体</th>
                               <th class="right"><el-button type="text">重命名</el-button></th>
                           </tr> -->
                       </thead>
                       <tbody>
                           <tr v-for="(value, index) in videoAttachList" :key="index">
                               <td class="left">{{value.name}}</td>
                               <td>{{value.type}}</td>
                               <td>{{value.size}}</td>
                               <td class="right"><el-button type="text">编辑</el-button> | <el-button @click="deleteAttach(value.uri, 'video')" type="text">删除</el-button></td>
                           </tr>
                           <tr>
                               <td colspan="4">
                                   <el-button type="primary" icon="el-icon-plus" @click="addVideo">添加视频</el-button>
                               </td>
                           </tr>
                       </tbody>
                   </table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">上传文档：</el-col>
                <el-col :span="15">
                    <table class="table" border="1" width="100%" align="center">
                       <thead>
                           <tr>
                               <th class="left">名称</th>
                               <th>类型</th>
                               <th>大小</th>
                               <th class="right">操作</th>
                           </tr>
                           <!-- <tr>
                               <th colspan="3" class="left">Linux C语言结构体文档</th>
                               <th class="right"><el-button type="text">重命名</el-button></th>
                           </tr> -->
                       </thead>
                       <tbody>
                           <tr v-for="(item, idx) in wordAttachList" :key="idx">
                               <td class="left">{{item.name}}</td>
                               <td>{{item.type}}</td>
                               <td>{{item.size}}</td>
                               <td class="right"><el-button type="text">编辑</el-button> | <el-button type="text" @click="deleteAttach(item.uri, 'word')">删除</el-button></td>
                           </tr>
                           <tr>
                               <!--  -->
                               <td colspan="4">
                                   <el-button type="primary" icon="el-icon-plus" @click="addWord">添加文档</el-button>
                               </td>
                           </tr>
                           
                       </tbody>
                   </table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <el-button round @click="$router.go(-1)">上一步</el-button>
                    <el-button type="primary" round style="width: 120px;" @click="createAttach">提交</el-button>
                </el-col>
            </el-row>
            
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import H2Title from '@/components/courseManage/h2'
export default {
    data() {
        return {

        }
    },
    computed: {
        // videoList() {
        //     return this.attachList.map((item) => {
        //         console.log("是否重新计算")
        //         if (this.wordFormat.indexOf(item.type) < 0) {
        //             return item
        //         }
        //     })
        // },
        // wordList() {
        //     return this.attachList.map((item) => {
        //         if (this.wordFormat.indexOf(item.type) >= 0) {
        //             return item
        //         }
        //     })
        // },
        ...mapState([
            'courseId',
            'attachList',
            'videoAttachList',
            'wordAttachList'
        ])
    },
    created() {
        let courseId = this.$route.query.courseId
        if (courseId) {
            window.scrollTo(0, 0)
            this.setCourseId(courseId),        //这里保存本地courseId是为了防止刷新vuex丢失课程id
            this.getAttachList(courseId)        //根据courseId，来获取附件列表详情
        }
        else {
            this.$router.push({path: '/admin/courseManage'})    //地址栏没有courseId，无法操作，则跳转至课程列表页。
        }
        
        this.wordFormat = ['ppt', 'docx', 'pdf', 'doc']               //文档格式
    },
    methods: {
      addVideo() {          //跳转到 添加视频 页面
        this.$router.push({path: '/admin/courseManage/newCourseUpload/uploadVideo'})
      },
      addWord() {           //跳转到 添加文档 页面
        this.$router.push({path: '/admin/courseManage/newCourseUpload/uploadWord'})
      },
      async createAttach() {          //开始创建附件
        try {
            let totalAttach = this.videoAttachList.concat(this.wordAttachList)
            let {status, data: {data: dataMsg}} = await this.axiosC({
            url: '/material/course/attach/create',
                method: 'post',
                data: {
                    courseId: this.courseId,
                    attachList: totalAttach,
                    role: 1             //1为老师可以看，2是学生可以看
                }
            })

            if (status === 200 && dataMsg) {       //课程创建成功
                console.log("附件创建成功！")

                let timer = setTimeout(() => {      //倒计时跳转
                    this.$router.push({     //跳转到列表页
                        path: '/admin/courseManage'
                    })
                    //模拟点击关闭按钮
                    document.getElementsByClassName('el-message-box__close')[0].click()
                }, 3000)

                this.$alert('3秒后返回上一级', '提交成功！', {
                    confirmButtonText: '直接跳转',
                    callback: action => {
                        clearTimeout(timer)     //清除定时器
                        this.$router.push({     //跳转到列表页
                            path: '/admin/courseManage'
                        })
                    }
                });
                
            }

        }
        catch(err) {
            console.log(err)
        }
      },
      async getAttachList(courseId) {             //根据courseId来获取附件列表信息
            let {status, data: {data: attachList}} = await this.axiosC({
                url: '/material/course/attach/' + courseId,
                method: 'get',
                params: {
                    params: JSON.stringify({
                        role: 1
                    })
                }
            })

            if (status === 200 && attachList) {

                //过滤附件列表，分别放入视频 和 文档附件内
                attachList.forEach((item) => {
                    if (this.wordFormat.indexOf(item.type) >= 0) {
                        //文档附件
                        this.pushWordAttach(item)
                    }
                    else {
                        //视频附件
                        this.pushVideoAttach(item)
                    }
                })

            }
      },
      async deleteAttach(uri, type) {          //删除附件
        try {
            let {status, data: {code}} = await this.axiosC({
                url: '/oss/delete',
                method: 'get',
                params: {
                    params: JSON.stringify({
                        uid: "123",
                        filePath: uri
                    })
                }
            })

            if (status === 200 && code === 0) {       //课程创建成功
                console.log(uri)
                //vuex中的附件列表做同步更新
                type === 'video' ? this.deleteVideoAttach(uri) : this.deleteWordAttach(uri)
                

                this.$message('附件删除成功');
                // this.$router.push({     //点击下一步，跳转到 课件上传页面
                //     path: '/admin/courseManage/newCourseUpload'
                // })
            }

        }
        catch(err) {
            console.log(err)
        }
      },
      deleteAlert() {
          //删除弹窗
        let alertBox = document.getElementsByClassName('el-message-box__wrapper')[0]
        alertBox.parentNode.removeChild(alertBox)
        //还有弹窗背景
        let alertBj = document.getElementsByClassName('v-modal')[0]
        alertBj.parentNode.removeChild(alertBj)
      },
      ...mapMutations([
          'deleteAttachList',
          'deleteVideoAttach',
          'deleteWordAttach',
          'setCourseId',
          'pushWordAttach',
          'pushVideoAttach'
      ])
    },
    components: {
        H2Title
    }
}
</script>
<style lang="less" scoped>
.title {
    font-size: 12px;
	font-weight: normal;
    color: #a9a9a9;
    margin-bottom: 30px;
    margin-top: -8px;
    i {
        font-size: 26px;
        position: relative;
        top: 3px;
    }
    .selected {
        color: #5693ff;
    }
}
.h-title {
    font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
    color: #a9a9a9;
    margin-bottom: 20px;
}
.newCourseUpload-vue {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background-color: #F8FAFC;
    z-index: 100;
}
.newCourseUpload-content {
    background-color: #fff;
    padding: 30px;
}
/deep/ .el-button--default {
    margin-right: 50px;
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
.newCourseUpload-content /deep/ .el-col {
    margin-bottom: 40px;
}
.el-button+.el-button {
    margin-left: 0px;
}

</style>

