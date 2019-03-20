<template>
    <div class="newCourse-vue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建课程</el-breadcrumb-item>
        </el-breadcrumb>
        <h2-title text="新建课程"></h2-title>
        <div class="title">
            <span class="selected"><i>●</i> &nbsp; 基本信息</span> &nbsp; &gt; &nbsp; <span><i>○</i> &nbsp; 课件上传</span>
        </div>
        <div class="newCourse-content">
            
            <h2 class="h-title">基本信息</h2>
    
            <el-row>
                <el-col :span="3">课程名称：</el-col>
                <el-col :span="10">
                    <el-input placeholder=""></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">副标题：</el-col>
                <el-col :span="10">
                    <el-input  placeholder=""></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">课程简介：</el-col>
                <el-col :span="10">
                    <el-input type="textarea" placeholder="" :rows="3"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">科目类别：</el-col>
                <el-col :span="3">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">年龄标签：</el-col>
                <el-col :span="10">
                    <el-tag round>0-6岁</el-tag> <el-tag>6-8岁</el-tag> <el-tag>9-12岁</el-tag> <el-tag>13-16岁</el-tag>
                    <el-tag>16-18岁</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">付费模式：</el-col>
                <el-col :span="10">
                    <el-radio v-model="radio" label="1">免费模式</el-radio>
                    <el-radio v-model="radio" label="2">收费模式</el-radio>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <div class="charge">
                        <ul>
                            <li>
                                <div>折扣价</div>
                                <el-input placeholder="单位：元"></el-input>
                            </li>
                            <li>
                                <div>原价</div>
                                <el-input placeholder="单位：元"></el-input>
                            </li>
                        </ul>
                        <p>*如课程无折扣优惠可不填写</p>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <el-button type="primary" round @click="routerTo">下一步</el-button>
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
            radio: "2",
            value: ''
        }
    },
    created() {
        this.options = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    },
    methods: {
        routerTo() {
            console.log("我点击事件了")
            this.$router.push({     //点击下一步，跳转到 课件上传页面
                path: '/admin/courseManage/newCourseUpload'
            })
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
.newCourse-vue {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #F3F3F5;
}
.newCourse-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;
    border: solid 1px #f1f1f1;
    margin-bottom: 30px;
}
.charge {
    width: 240px;
    height: 120px;
    background-color: #F8FAFC;
    border-radius: 4px;
    border: solid 1px #f1f1f1;
    ul {
        padding-left: 20px;
        padding-right: 20px;
        &:after {
            clear: both;
            display: block;
            content: ''
        }
        li {
            width: 100px;
            height: 80px;
            box-sizing: border-box;
            float: left;
            line-height: 35px;
            div {
                font-size: 12px;
                line-height: 40px;
                letter-spacing: 0px;
                color: #666666;
            }
            & /deep/ .el-input__inner {
                width: 90px;
                height: 30px;
            }
        }
    }
    p {
        font-size: 12px;
        line-height: 34px;
        padding-left: 20px;
        color: #666666;
    }
}

.newCourse-content /deep/ .el-col {
    height: 100px;
    line-height: 100px;
}
</style>
