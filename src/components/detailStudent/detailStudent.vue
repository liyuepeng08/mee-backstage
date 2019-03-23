<template>
    <div class="detailStudent">
        <el-row>
            <el-col :span="24">
                <h3 class="pageTitle">学生详情</h3>
            </el-col>
        </el-row>
        <div class="teacherInfo">
            <el-row>
                <el-col :span="24">
                    <p class="backBtn" @click="backPre">
                        <i class="el-icon-arrow-left"></i>
                        <span>返回</span>
                    </p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <p class="title">基本资料</p>
                </el-col>
            </el-row>
            <el-row class="infomation">
                <el-col :span="12">
                    <ul class="leftInfo">
                        <li class="letWid">
                            姓
                            <i></i>
                            名：
                            <span>{{ruleForm.name}}</span>
                        </li>
                        <li class="letWid">
                            昵
                            <i></i>
                            称：
                            <span>{{ruleForm.niceName}}</span>
                        </li>
                        <li class="letWid">
                            性
                            <i></i>
                            别：
                            <span>{{ruleForm.sex}}</span>
                        </li>
                        <li class="letWid">
                            年
                            <i></i>
                            龄：
                            <span>{{ruleForm.age}}</span>
                        </li>
                        <li class="letWid">
                            民
                            <i></i>
                            族：
                            <span>{{ruleForm.nation}}</span>
                        </li>
                        <li>
                            出生年月：
                            <span>{{ruleForm.birthday}}</span>
                        </li>
                        <li>
                            联系电话：
                            <span>{{ruleForm.phone}}</span>
                        </li>
                        <li class="letWid">
                            邮
                            <i></i>
                            箱：
                            <span>{{ruleForm.email}}</span>
                        </li>
                        <li>
                            身份证号：
                            <span>{{ruleForm.idNumeber}}</span>
                        </li>
                        <li class="letWid">
                            籍
                            <i></i>
                            贯：
                            <span>{{ruleForm.nativePlace}}</span>
                        </li>
                        <li>
                            常驻地址：
                            <span>{{ruleForm.address}}</span>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="12">
                    <ul>
                        <li class="clearfix">
                            <p class="fl">所属机构：</p>
                            <div class="fl institution">
                                <p v-for="v in ruleForm.institution" :key="v">{{v}}</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <p class="fl">所在班级：</p>
                            <span class="fl classes">{{ruleForm.classes}}</span>
                        </li>
                        <li class="clearfix">
                            <p class="fl">父母电话：</p>
                            <div class="fl parentTel">
                                <p v-for="v in ruleForm.parentTel" :key="v">{{v}}</p>
                            </div>
                        </li>
                        <li class="teachingBrief">
                            教学简介：
                            <span>{{ruleForm.teachingBrief}}</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddManager",
    data() {
        return {
            ruleForm: {
                name: "窦娥", //用户名
                niceName: "梦里询他千百度", //昵称
                sex: "女", //性别
                age: 12,
                nation: "汉族", //民族
                birthday: "2007年05月15日", //出生年月             
                phone: "15010611993", //电话
                email: "15010611993@163.com", //邮箱
                idNumeber: 112233445566778899,//身份证号
                nativePlace: "北京市北京市北京市",//籍贯
                address: "北京市昌平区华家园东一区",//常住地址
                institution: ["少儿英语", "艺术英语"],//所属机构
                classes: "一年7班", //所在班级
                parentTel: ["13113113131", "15715711571"],//父母电话
                teachingBrief: "南京大麦网络大学蛤蜊英文专业毕业，从事教师行业13年，桃李满天下，下面随便写，不知道写啥，没空瞎编，看着写吧。我是案例，是个很长很长的案例",//教学简介
            }
        }
    },
    mounted() {
        this.uid = (this.$route.params.uid).toString()
        this.getUserInfo()
    },
    methods: {
        backPre() {
            history.back(-1);
        },
        getUserInfo() {
            let params = { uid: this.uid };
            this.axios.get('/user/getUserDetail', {
                params: {
                    params
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.code == 0) {
                        console.log(res.data)
                    } else {
                        alert(res.data.msg)
                    }
                } else {
                    alert('加载失败，请检查网络是否连接诶正常！')
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detailStudent {
    margin: 10px 10px 0 10px;
    min-height: 600px;
    .pageTitle {
        font-size: 18px;
        font-weight: normal;
        color: #000000;
        padding: 19px 21px 31px;
    }

    .teacherInfo {
        width: 100%;
        background: #fff;
        .backBtn {
            width: 50px;
            height: 20px;
            line-height: 20px;
            color: #a9a9a9;
            background-color: #f8fafc;
            border-radius: 4px;
            font-size: 12px;
            margin: 10px 0 0 30px;
            cursor: pointer;
        }
        .title {
            font-size: 18px;
            color: #080808;
            padding: 20px 0 26px 0;
            text-align: center;
        }
        .infomation {
            padding: 60px 120px;
            li {
                margin-bottom: 22px;
                font-size: 14px;
                color: #a9a9a9;
                .institution,
                .parentTel {
                    p {
                        margin-bottom: 20px;
                        color: #080808;
                    }
                    p:last-child {
                        margin-bottom: 0px;
                    }
                }
                span {
                    color: #080808;
                }
            }
            .letWid {
                i {
                    display: inline-block;
                    padding: 0 10px;
                }
            }
            .teachingBrief {
                line-height: 20px;
            }
        }
        .aptitudeBox {
            margin-top: 60px;
            .aptitudeTitle {
                width: 100px;
                font-size: 18px;
                color: #080808;
                margin-left: 220px;
            }
        }
    }
}
</style>
