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
    
            <el-row>
                <el-col :span="3">课程封面：</el-col>
                <el-col :span="10">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">课程介绍：</el-col>
                <el-col :span="10">
                    <el-input type="textarea" placeholder="" :rows="4"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">上传视频：</el-col>
                <el-col :span="15">
                   <table class="table" border="1" width="100%" align="center">
                       <thead>
                           <tr>
                               <th class="left">名称</th>
                               <th>类型</th>
                               <th>时长</th>
                               <th class="right">操作</th>
                           </tr>
                           <tr>
                               <th colspan="3" class="left">Linux C语言结构体</th>
                               <th class="right"><el-button type="text">重命名</el-button></th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td class="left">某某内容第一课</td>
                               <td>视频</td>
                               <td>01:22:23</td>
                               <td class="right"><el-button type="text">编辑</el-button> | <el-button type="text">删除</el-button></td>
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
                           <tr>
                               <th colspan="3" class="left">Linux C语言结构体文档</th>
                               <th class="right"><el-button type="text">重命名</el-button></th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td class="left">某某内容第一课</td>
                               <td>PPT</td>
                               <td>2M</td>
                               <td class="right"><el-button type="text">编辑</el-button> | <el-button type="text">删除</el-button></td>
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
                    <el-button round>上一步</el-button>
                    <el-button type="primary" round style="width: 120px;">提交</el-button>
                </el-col>
            </el-row>
            
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import H2Title from '@/components/courseManage/h2'
export default {
    data() {
        return {
            imageUrl: ''
        }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      addVideo() {          //跳转到 添加视频 页面
        this.$router.push({path: '/admin/courseManage/newCourseUpload/uploadVideo'})
      },
      addWord() {           //跳转到 添加文档 页面
        // this.$router.push({path: '/admin/courseManage/newCourseUpload/uploadVideo'})
      }
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
    background-color: #F3F3F5;
    z-index: 100;
}
.newCourseUpload-content {
    background-color: #fff;
    padding: 30px;
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
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 120px;
}
.avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader /deep/ .el-upload /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.newCourseUpload-content /deep/ .el-col {
    margin-bottom: 40px;
}
.el-button+.el-button {
    margin-left: 0px;
}

</style>

