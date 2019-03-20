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
            <a href="">返回</a>
            <h2 class="h-title">课件上传</h2>
            <el-row>
                <el-col :span="3">章节名称：</el-col>
                <el-col :span="10">
                    <el-input></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">文件类型：</el-col>
                <el-col :span="10">
                    <el-tag>视频</el-tag>  <el-tag>音频</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">章节名称：</el-col>
                <el-col :span="10">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <p>这个是章节名称</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">视频时长：</el-col>
                <el-col :span="10">
                    <el-input placeholder="" :disabled="true">
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <el-button round>放弃上传</el-button>
                    <el-button type="primary" round style="width: 120px;">提交</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import H2Title from '@/components/courseManage/h2'
export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
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
</style>

