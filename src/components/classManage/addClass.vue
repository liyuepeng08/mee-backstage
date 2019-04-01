<template>
    <div class="addClass">
        <p class="topNav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>班级管理</el-breadcrumb-item>
                <el-breadcrumb-item>班级列表</el-breadcrumb-item>
                <el-breadcrumb-item class="active">创建班级</el-breadcrumb-item>
            </el-breadcrumb>
        </p>
        <h3 class="pageTitle">创建班级</h3>
        <!-- <form class="el-form demo-ruleForm"> -->
        <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="90px"
            class="demo-ruleForm"
            style="width:870px"
            size="mini"
        >
            <dl class="model essential">
                <dt>基本信息</dt>
                <el-form-item label="班级名称">
                    <el-input class="w493" v-model="ruleForm.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="班级简介" prop="description">
                    <el-input
                        class="remarks"
                        type="textarea"
                        v-model="ruleForm.description"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="选择课程">
                    <ul class="lessonFather">
                        <!-- <li >{{v}}</li> -->
                        <li class="lesson" v-for="(v,i) in courseData" :key="i">
                            <div class="lessonImg">
                                <img :src="v.thumbnail" alt>
                            </div>
                            <h4>{{v.title}}</h4>
                            <div class="clearfix">
                                <span class="fl lessonTitle">{{v.tag2}}</span>
                            </div>
                            <div class="lessonBtn">
                                <span class="detail" @click="toCourseDetail(v.id)">详情</span>|
                                <span @click="removeCur">删除</span>
                            </div>
                        </li>
                        <li class="addLesson" @click="addTaskBtn">
                            <i class="el-icon-plus"></i>
                            <span>添加新课程</span>
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="授课教师" prop="school">
                    <el-table
                        :data="tableData"
                        v-loading="loading"
                        style="width: 100%; border: 1px solid #f1f1f1;"
                    >
                        <el-table-column label="名称" width="260">
                            <template slot-scope="scope">
                                <div class="msg-cont">
                                    <div class="list-img">
                                        <img :src="scope.row.img" alt>
                                    </div>
                                    <div class="cont">
                                        <div class="title">{{scope.row.nickName}}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="电话"></el-table-column>
                        <el-table-column label="操作" width="140">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">查看</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="deleteButt(scope,tableData)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="addTeaBtn" @click="addTeacherBtn(id)">
                        <i class="el-icon-plus"></i>
                        添加教师
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-row style="margin-bottom:10px;">
                        <el-button round style="width:120px;height:40px;font-size: 14px;">放弃创建</el-button>
                        <el-button
                            type="primary"
                            @click="submit"
                            round
                            style="width:120px;height:40px;font-size: 14px;"
                        >完成</el-button>
                    </el-row>
                </el-form-item>
            </dl>
        </el-form>
        <select-teacher-list
            @isShowed="isShowed"
            @teacherFinishData="teacherFinishData"
            v-if="isShow"
        ></select-teacher-list>
        <!-- </form> -->
        <add-course @giveUp="giveUp" @courseFinishData="courseFinishData" v-if="isCourse"></add-course>
    </div>
</template>

<script>
import AddCourse from './addCourses'
import SelectTeacherList from './selectTeacherList'
export default {
    name: "addClass",
    data() {
        return {
            tableData: [],
            loading: true, //保存是否请求表格数据的状态
            ruleForm: {
                tid: "", //租户ID
                creator: "", //创建人ID
                name: "", //班级名称
                description: "" //描述
            },
            id: "",
            isShow: false,//是否显示弹出层
            isCourse: false,
            courseData: [],//已选择的课程数据
        };
    },
    created() {
        //查看地址栏是否有courseId，有的话就是 更新课程，否则就是 新建课程。

        // this.emptyCourseVuex(); //首先vuex关于课程的内容数据全清空
        let courseId = this.$route.query.courseId;
        this.id = courseId;
        if (courseId) {
            //有，就是更新课程，发送请求获取详情数据

            // this.setCourseId(courseId); //保存到vuex中课程的courseId

            this.getCourseDetail(courseId); //请求获取课程详情数据
        }
    },
    mounted: function () {
        this.obtain(); //获取当前信息

        if (this.id) {
            this.getClassRoomTeacher()//获得老师数据
            this.getCourseList(this.id)//获得课程            
        } else {
            this.loading = false

        }
    },
    methods: {
        submit: function (formName) {
            const tid = sessionStorage.getItem("tid");
            let that = this.ruleForm;
            let path;
            if (this.id) {
                path = "classroom/update";
            } else {
                path = "classroom/create";
            }
            //新增
            http: this.axiosC
                .get(path, {
                    params: {
                        params: {
                            id: this.id,
                            name: that.name,
                            description: that.description,
                            tid: that.tid,
                            creator: that.uid
                        }
                    }
                })
                .then(response => {
                    let data = response.data;
                    if (data.code == 0) {
                        if (this.tableData != '') {
                            this.teacherFinished(data.data);
                        }
                        if (this.courseData != '') {
                            this.courseFinish(data.data);
                        }
                        let timer = setTimeout(() => {
                            //倒计时跳转
                            this.$router.push({
                                //跳转到列表页
                                path: "/admin/classManage"
                            });
                            //模拟点击关闭按钮
                            document
                                .getElementsByClassName("el-message-box__close")[0]
                                .click();
                        }, 3000);

                        this.$alert("3秒后返回上一级", "提交成功，请等待审核！！", {
                            confirmButtonText: "直接跳转",
                            callback: action => {
                                clearTimeout(timer); //清除定时器
                                this.$router.push({
                                    //跳转到列表页
                                    path: "/admin/classManage"
                                });
                            }
                        });
                    } else {
                        this.$message(data.msg);
                    }
                })
                .catch(error => {
                    this.$message("提交失败！");
                });
        },
        //更新课程时，获取 课程详情数据
        async getCourseDetail(roomId) {
            console.log("更新");
            try {
                this.isLoad = true; //加载数据loading动画显示
                let {
                    status,
                    data: { data: dataMsg }
                } = await this.axiosC({
                    method: "get",
                    url: "/classroom/" + roomId
                });
                if (status === 200 && dataMsg) {
                    // this.setCourseDetail(dataMsg); //将获取到的课程详情，存入到vuex中
                    // this.selectedTagsText = dataMsg.tag1.split(",");
                    this.ruleForm = dataMsg;
                    this.isLoad = false; //加载数据loading动画隐藏
                }
            } catch (err) {
                console.log(err);
            }
        },
        //获取当前信息
        obtain: function () {
            this.ruleForm.tid = sessionStorage.getItem("tid");
            this.ruleForm.create = sessionStorage.getItem("tTame");
            this.ruleForm.uid = sessionStorage.getItem("uid");
        },
        // 添加教师
        addTeacherBtn(id) {
            this.isShow = true;
        },
        // 放弃选择
        isShowed(f) {
            this.isShow = f
        },
        giveUp(f) {
            this.isCourse = f
        },
        // 选择课程
        addTaskBtn() {
            this.isCourse = true
        },
        // 获取教师
        getClassRoomTeacher(pageNum) {
            pageNum = pageNum || 1;
            let tid = sessionStorage.getItem('tid')
            let params = {
                tid: tid,
                roomId: this.id,
                pageIndex: pageNum,
                pageSize: 10
            }
            this.axiosC.get('/classroom/selectTeacherList', { params: { params } }).then(res => {
                if (res.status == 200) {
                    this.loading = false
                    if (res.data.code == 0) {
                        if (res.data.data.list == '') {
                            this.loading = false
                        }
                        this.tableData = res.data.data.list
                    }
                } else {
                    this.loading = fasle
                }
            })
        },
        // 删除教师
        deleteButt(scope, rows) {
            console.log(scope.row, rows);
        },
        // 获取课程
        getCourseList(id) {
            let tid = sessionStorage.getItem('tid'),
                params = {
                    tid: tid,
                    roomId: id
                };
            this.axiosC.get('/classroom/showTasks', { params: { params } }).then(res => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        },
        // 获得选中老师数据
        teacherFinishData(teacher) {
            this.isShow = false
            this.tableData = teacher
        },
        teacherFinished(classId) {
            let teacherArr = [],teacherObj={};
            let tid = Number(sessionStorage.getItem('tid'))
            this.tableData.forEach(item => {
                teacherObj.tid = tid;
                teacherObj.uid = item.uid;
                teacherObj.roomId = classId;
                teacherObj.status = item.status;
                teacherObj.role = item.role;
                teacherObj.mobile = item.mobile;
                teacherObj.nickName = item.nickName;
                teacherObj.gender = item.gender;
            })
            teacherArr.push(teacherObj)
            let params = { params: { "users": teacherArr } }
            this.axiosC.post('/classroom/addClassUser', params).then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                }
            })
        },
        // 获得选中的课程数据
        courseFinishData(course) {
            this.isCourse = false;
            this.courseData = course
            console.log(this.courseData)
        },
        courseFinish(classId) {
            let params = {}, tid = sessionStorage.getItem('tid');
            this.courseData.forEach(item => {
                let courseIdsArr = [];
                courseIdsArr.push(item.id.toString());
                params = {
                    tid: tid,
                    roomId: classId,
                    courseIds: courseIdsArr
                }
            })
            this.axiosC.post('/classroom/addTask', params).then(res => {
                if (res.status == 200) {
                    if (res.data.code == 0) {
                        this.$message('添加成功！')
                    }
                }
            })

        },
        // 跳转课程详情
        toCourseDetail(id) {
            this.$router.push({
                path: "/admin/courseManage/courseDetail",
                query: {
                    courseId: id
                }
            })
        },
        // 删除选中课程
        removeCur() {
            
        },

    },
    components: {
        SelectTeacherList,
        AddCourse
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addClass {
    background: #fff;
    // margin: 10px 10px 0 10px;
    // min-height: 600px;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    // background-color: #f3f3f5;
    z-index: 100;
    .topNav {
        padding: 0 0 30px 0;
        background-color: #f8fafc;
        font-size: 12px;
        color: #a9a9a9;
        .active {
            /deep/.el-breadcrumb__inner {
                color: #5693ff;
            }
        }
    }
    .pageTitle {
        font-size: 18px;
        color: #080808;
        padding: 0px 21px 25px 0px;
        background-color: #f8fafc;
    }
    //下dl模板
    .model {
        padding: 34px 40px;
        dt {
            padding-bottom: 30px;
        }
        .w493 {
            width: 493px;
        }
        //添加课程
        .lessonFather {
            overflow: hidden;

            //课程
            .lesson {
                width: 120px;
                height: 200px;
                background-color: #ffffff;
                border-radius: 4px;
                border: solid 1px #f1f1f1;
                padding: 19px;
                font-size: 12px;
                line-height: 20px;
                color: #666666;
                position: relative;
                float: left;
                margin-right: 20px;
                margin-bottom: 20px;
                .lessonImg {
                    height: 80px;
                    margin-bottom: 5px;
                    background-color: #e4e4e4;
                    border-radius: 4px;
                    opacity: 0.99;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                h4 {
                    color: #080808;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                .lessonTitle {
                    width: 70px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: inline-block;
                }
                .lessonBtn {
                    color: #5693ff;
                    text-align: center;
                    position: absolute;
                    bottom: 20px;
                    padding: 0 14px;
                    span {
                        padding: 0 10px;
                        cursor: pointer;
                    }
                }
            }

            //添加课程
            .addLesson {
                cursor: pointer;
                height: 240px;
                width: 158px;
                background-color: #f8fafc;
                border-radius: 4px;
                border: solid 1px #f1f1f1;
                text-align: center;
                margin-right: 20px;
                margin-bottom: 20px;
                float: left;
                i {
                    color: #a9a9a9;
                    font-size: 20px;
                    padding: 100px 70px 30px;
                }
                span {
                    text-align: center;
                    font-size: 12px;
                    color: #666666;
                }
            }
            :nth-child(4n) {
                margin-right: 0px;
            }
        }
        //添加老师
        .msg-cont {
            &:after {
                content: "";
                display: block;
                clear: both;
            }
            .list-img {
                width: 40px;
                height: 40px;
                background-color: #bfbfbf;
                float: left;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .cont {
                width: 185px;
                float: right;
                height: 40px;
                line-height: 40px;
                .title {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    a {
                        font-size: 12px;
                        color: #666;
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
        .addTeaBtn {
            cursor: pointer;
            text-align: center;
            color: #5693ff;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            border: 1px solid rgb(241, 241, 241);
            border-top: none;
            i {
                width: 16px;
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                background-color: #5693ff;
                border-radius: 4px;
                color: #fff;
            }
        }
    }

    /deep/ .el-form-item {
        margin-bottom: 30px;
        // width: 100%;
        .el-input__inner {
            height: 30px;
            line-height: 30px;
        }
    }
    /deep/ .el-form-item__label {
        font-size: 12px;
        text-align: justify;
        height: 30px;
        overflow: hidden;
    }
    /deep/ .el-form-item__label:after {
        display: inline-block;
        width: 100%;
        content: "";
    }
    /deep/ .el-select-dropdown__item.selected {
        font-size: 12px;
    }
    /deep/ .el-select-dropdown__item {
        font-size: 12px;
    }
    /deep/ .remarks {
        textarea {
            width: 493px;
            height: 120px;
        }
    }
    /deep/ .el-message-box__btns {
        text-align: center;
    }
}
</style>

