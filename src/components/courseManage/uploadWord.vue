<template>
    <div class="uploadvideo-vue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建课程</el-breadcrumb-item>
            <el-breadcrumb-item>上传视频</el-breadcrumb-item>
        </el-breadcrumb>
        <h2-title text="新建课程"></h2-title>
        <div class="uploadvideo-content">
            <a @click="$router.go(-1)" class="goback">&lt; 返回</a>
            <h2 class="h-title">上传文档</h2>
            <el-row>
                <el-col :span="3">章节名称：</el-col>
                <el-col :span="10">
                    <el-input v-model="name" placeholder="请输入章节名称"></el-input>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="3">文件类型：</el-col>
                <el-col :span="10">
                    <el-tag>视频</el-tag>  <el-tag>音频</el-tag>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="3">文档名称：</el-col>
                <el-col :span="10" v-loading="isUpload">
                    <el-upload
                        class="upload-demo"
                        action="https://localhost:8080"
                        :before-upload="beforeAvatarUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        
                    </el-upload>
                    <br>
                    <p>文档名称：{{fileName}}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">文档大小：</el-col>
                <el-col :span="10">
                    <el-input placeholder="" v-model="size" :disabled="true">
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <el-button round @click="$router.go(-1)">放弃上传</el-button>
                    <el-button type="primary" @click="submit" round style="width: 120px;">提交</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import H2Title from '@/components/courseManage/h2'
export default {
    data() {
      return {
        size: 0,                //文件大小
        name: '',           //章节名称
        creator: '111',            //创建人
        fileName: '',            //页面显示用的 视频名称
        uri: '',                 //附件上传成功后，存储的附件路径（包含类型扩展名）
        isUpload: false
      };
    },
    computed: {
        ...mapState([
            'wordAttachList'
        ])
    },
    methods: {
      async beforeAvatarUpload(file) {        //上传文件之前的回调函数
        this.isUpload = true        //Loading动画显示
        let fd = new FormData()
            fd.append('file', file)
            fd.append('params', JSON.stringify({uid: '123'}))

            try {
                let {status, data:{data: fileMsg}} = await this.axiosC({
                    url: '/oss/upload',
                    method: 'post',
                    data: fd,
                    noQs: true,
                    // headers: {
                    //     'Content-type': 'multipart/form-data'
                    // }
                })

                if (status === 200 && fileMsg) {

                    this.size = fileMsg.fileSize            //获取文件大小
                    this.fileName = fileMsg.fileName        //获取 用于显示的视频名称
                    this.uri = fileMsg.url              //获取 上传成功的视频路径（包括扩展名类型）
                    
                    this.isUpload = false           //loading动画消失
                }
            }
            catch(err) {
                console.log(err)
            }
      },
      submit() {        //点击提交按钮事件

        if (this.name && this.uri) {

            let fileObj = {
                name: this.name,
                uri: this.uri,
                creator: this.creator,
                type: this.uri.split('.').reverse()[0]
            }

            this.pushWordAttach(fileObj)        //将数据更新到vuex中

            let timer = setTimeout(() => {      //倒计时跳转
                this.$router.go(-1)
            }, 3000)

            this.$alert('3秒后返回上一级', '提交成功，请等待审核！', {
                confirmButtonText: '直接跳转',
                callback: action => {
                    clearTimeout(timer)     //清除定时器
                    this.$router.go(-1)     //跳转上一页
                }
            });
        }

        else {
            this.$message.error('请填入必填信息！');
        }

      },
      ...mapMutations([
          'pushWordAttach'
      ])
    },
    components: {
        H2Title
    }
}
</script>
<style lang="less" scoped>
.uploadvideo-vue {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #F3F3F5;
}
.uploadvideo-content {
    background-color: #fff;
    padding: 30px;
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

.uploadvideo-content /deep/ .el-col {
    margin-bottom: 40px;
}
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
</style>

