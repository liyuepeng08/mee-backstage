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
        <div class="newCourse-content" v-loading="isLoad">
            
            <h2 class="h-title">基本信息</h2>
            <el-row>
                <el-col :span="3"><i class="red">*</i>课程封面：</el-col>
                <el-col :span="4" v-loading="isUpload">
                    <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8080"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="$store.state.thumbnail" :src="$store.state.thumbnail" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3"><i class="red">*</i>课程名称：</el-col>
                <el-col :span="10">
                    <el-input v-model="title"  placeholder="请输入课程名称"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">副标题：</el-col>
                <el-col :span="10">
                    <el-input v-model="subtitle"  placeholder="请输入副标题"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">课程简介：</el-col>
                <el-col :span="10">
                    <el-input v-model="description" type="textarea" placeholder="请输入课程简介" :rows="3"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3"><i class="red">*</i>课程类别：</el-col>
                <el-col :span="3">
                    <el-cascader
                        :options="subjectList"
                        v-model="categoryId"
                        :props = 'subjectProps'
                        :show-all-levels="false">
                    </el-cascader>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">年龄标签：</el-col>
                <el-col :span="13">
                    <el-tag v-for="(text, idx) in tagsText" :class='{tags: true,tagsSelected: selectedTagsText.indexOf(text) >= 0}' :key="idx" @click="clickTags(text)">{{text}}</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">付费模式：</el-col>
                <el-col :span="10">
                    <el-radio v-model="radio" label="1">免费模式</el-radio>
                    <el-radio v-model="radio" label="2">收费模式</el-radio>
                </el-col>
            </el-row>
            <el-row v-show="radio == 2">
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <div class="charge">
                        <ul>
                            <li>
                                <div>折扣价</div>
                                <el-input v-model="discountPrice" placeholder="单位：元"></el-input>
                            </li>
                            <li>
                                <div>原价</div>
                                <el-input v-model="price" placeholder="单位：元"></el-input>
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
                    <el-button type="primary" round @click="submit">下一步</el-button>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>
<script>
import H2Title from '@/components/courseManage/h2'
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            radio: "2",
            tagsText: ['0-6岁', '6-8岁', '9-12岁', '13-16岁', '16-18岁'],                   //年龄标签内容
            selectedTagsText: [],           //选中的tags索引值，是数组。因为可以选多个
            // subjectCategory: [],        //默认选中的 课程类别ID 分级数组。
            subjectProps: {
                value: 'id',
                children: 'childs',
                label: 'name'
            },
            subjectList: [],             //课程分类的数据源
            isUpload: false,             //上传图片loading动画状态显示控制
            isLoad: false,               //更新课程请求数据 页面loading动画控制
            discountPrice: 0           //折扣价
        }
    },
    computed: {
        title: {        //课程名称
            get() {
                return this.$store.state.title
            },
            set(value) {
                this.setTitle(value)
            }
        },
        subtitle: {     //课程副标题
            get() {
                return this.$store.state.subtitle
            },
            set(value) {
                this.setSubtitle(value)
            }
        },
        description: {          //课程描述
            get() {
                return this.$store.state.description
            },
            set(value) {
                this.setDescription(value)
            }
        },
        price: {            //课程价格
            get() {
                return this.$store.state.price
            },
            set(value) {        //判断是否免费
                this.setPrice(this.radio == 2 ? value : 0)
            }
        },
        categoryId: {       //课程分类id
            get() {
                return this.$store.state.categoryId
            },
            set(value) {        //参数是一个数组
                
                this.setCategoryId(value)
            }
        },
        ...mapState([
            'courseId'
        ])
    },
    created() {         //查看地址栏是否有courseId，有的话就是 更新课程，否则就是 新建课程。

        this.emptyCourseVuex()          //首先vuex关于课程的内容数据全清空
        let courseId = this.$route.query.courseId

        if (courseId) {       //有，就是更新课程，发送请求获取详情数据

            this.setCourseId(courseId)        //保存到vuex中课程的courseId

            this.getCourseDetail(courseId)      //请求获取课程详情数据

        }

    },
    async mounted() {
        try {

            //获取所有课程类别
            let {status, data: {data: dataMsg}} = await this.axiosC({
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
                    for (let i = 0; i < arr.length; i ++) {
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
                console.log(JSON.stringify(dataMsg))
                this.subjectList = dataMsg

            }
            
        }
        catch(err) {
            console.log(err)
        }
        
    },
    methods: {
        async submit() {              //点击下一步 ， 判断是 更新课程 还是 新建课程，分别对应不同的请求接口
            this.$route.query.courseId ?
                this.updateCourse()         //更新课程
            :
                this.createCourse()         //新建课程
        },
        async updateCourse() {          //更新课程

            let {status, data: {data: dataMsg}} = await this.axiosC({
                method: 'get',
                url: '/material/course/update',
                params: {
                    params: JSON.stringify({
                        id: Number(this.courseId),
                        categoryId: this.categoryId[this.categoryId.length - 1],
                        title: this.title,
                        subtitle: this.subtitle,
                        description: this.description,
                        price: this.price,
                        thumbnail: this.$store.state.thumbnail,
                        visible: 1,
                        creator: 111,
                        tag1: this.$store.state.tag1
                    })
                }
            })

            if (status === 200 && dataMsg) {
                
                this.$message("课程更新成功！")

                this.$router.push({
                    path: '/admin/courseManage/newCourseUpload',
                    query: {
                        courseId: this.courseId
                    }
                })
            }
        },
        async createCourse() {          //新建课程
            if(!this.$store.state.thumbnail) {this.$message({message: '警告：必须上传封面图片', type: 'warning'}); return false}
            if(!this.title) {this.$message({message: '警告：必须输入标题名称', type: 'warning'}); return false}
            if(!this.categoryId.length) {this.$message({message: '警告：必须选择课程类别', type: 'warning'}); return false}

            let {status, data: {data: courseId}} = await this.axiosC({
                method: 'get',
                url: '/material/course/create',
                params: {
                    params: JSON.stringify({
                        categoryId: this.categoryId[this.categoryId.length - 1],
                        title: this.title,
                        subtitle: this.subtitle,
                        description: this.description,
                        price: this.price,
                        thumbnail: this.$store.state.thumbnail,
                        visible: 1,
                        creator: 111,
                        tag1: this.$store.state.tag1
                    })
                }
            })

            if (status === 200 && courseId) {

                this.$message({message: "课程新建成功！", type: 'success'})

                this.setCourseId(courseId)      //更新vuex中的课程courseId

                this.$router.push({
                    path: '/admin/courseManage/newCourseUpload',
                    query: {
                        courseId
                    }
                })
            }
        },
        async getCourseDetail(courseId) {     //更新课程时，获取 课程详情数据
            try {
                this.isLoad = true          //加载数据loading动画显示
                let {status, data: {data: dataMsg}} = await this.axiosC({
                    method: 'get',
                    url: '/material/course/' + courseId
                })

                if (status === 200 && dataMsg) {
                    this.setCourseDetail(dataMsg)       //将获取到的课程详情，存入到vuex中
                    this.selectedTagsText = dataMsg.tag1.split(',')
                    this.isLoad = false     //加载数据loading动画隐藏
                }
            }
            catch(err) {
                console.log(err)
            }
            
        },
        clickTags(text) {          //点击tag标签选中效果，及数据赋值
            let index = this.selectedTagsText.indexOf(text)

            index >= 0 ?        //数组是否包含点击的tags内容
                this.selectedTagsText.splice(index, 1)      //包含，则删除
                : 
                this.selectedTagsText.push(text)            //不包含，则添加
            
            this.setTag1(this.selectedTagsText.join(','))
        },
        handleAvatarSuccess(res, file) {      //图片上传成功后的回调
            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log("这个是图片上传成功后返回的地址：" + this.imageUrl)
        },
        async beforeAvatarUpload(file) {        //上传图片前的回调
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                return false
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return false
            }
            // return isJPG && isLt2M;
            this.isUpload = true        //loading动画显示

            let fd = new FormData()
            fd.append('file', file)
            fd.append('params', JSON.stringify({uid: '123'}))

            try {
                let {status, data:{data: dataMsg}} = await this.axiosC({
                    url: '/oss/upload',
                    method: 'post',
                    data: fd,
                    noQs: true,
                    // headers: {
                    //     'Content-type': 'multipart/form-data'
                    // }
                })

                if (status === 200 && dataMsg) {
                    this.setThumbnail(dataMsg.url)     //上传成功后返回服务器上的图片路径地址
                    
                    this.isUpload = false           //loading动画隐藏
                }
            }
            catch(err) {
                console.log(err)
            }
        },
        ...mapMutations([
            'setTitle',
            'setSubtitle',
            'setDescription',
            'setPrice',
            'setTag1',
            'setCategoryId',
            'setThumbnail',
            'setCourseId',
            'emptyCourseVuex',
            'setCourseDetail'
        ])
    },
    components: {
        H2Title
    }
}
</script>
<style lang="less" scoped>
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
    min-height: 100%;
    width: 100%;
    background-color: #F8FAFC;
    z-index: 100;
}
.newCourse-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;
    border: solid 1px #f1f1f1;
    margin-bottom: 30px;
}
.tags {
    border-radius: 20px;
    margin-right: 20px;
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;
}
.tagsSelected {
    color: #fff;
    background-color: #5693ff;
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
.red {
    color: red;
    margin-right: 10px;
}
</style>
