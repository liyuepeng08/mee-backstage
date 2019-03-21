<template>
    <div class="addManager">
        <p class="topNav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>审核管理</el-breadcrumb-item>
                <el-breadcrumb-item>教师审核</el-breadcrumb-item>
                <el-breadcrumb-item class="active">审核详情</el-breadcrumb-item>
            </el-breadcrumb>
        </p>
        <el-row>
            <el-col :span="24">
                <h3 class="pageTitle">教师审核</h3>
            </el-col>
        </el-row>
        <div class="teacherInfo">
            <el-row>
                <el-col :span="24">
                    <p class="backBtn">
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
                <el-col :span="4">
                    <div class="photo">
                        <img src="./teacherCard.jpg" alt>
                    </div>
                </el-col>
                <el-col :span="8">
                    <ul class="leftInfo">
                        <li class="letWid">
                            姓
                            <i></i>
                            名：{{ruleForm.name}}
                        </li>
                        <li class="letWid">
                            昵
                            <i></i>
                            称：{{ruleForm.niceName}}
                        </li>
                        <li class="letWid">
                            性
                            <i></i>
                            别：{{ruleForm.sex}}
                        </li>
                        <li class="letWid">
                            年
                            <i></i>
                            龄：{{ruleForm.age}}
                        </li>
                        <li class="letWid">
                            民
                            <i></i>
                            族：{{ruleForm.nation}}
                        </li>
                        <li>出生年月：{{ruleForm.birthday}}</li>
                        <li>政治面貌：{{ruleForm.political}}</li>
                        <li>婚姻状况：{{ruleForm.marriage}}</li>
                        <li>联系电话：{{ruleForm.phone}}</li>
                        <li class="letWid">
                            邮
                            <i></i>
                            箱：{{ruleForm.email}}
                        </li>
                        <li>身份证号：{{ruleForm.idNumeber}}</li>
                        <li class="letWid">
                            籍
                            <i></i>
                            贯：{{ruleForm.nativePlace}}
                        </li>
                        <li>常驻地址：{{ruleForm.address}}</li>
                    </ul>
                </el-col>
                <el-col :span="8">
                    <ul>
                        <li class="letWid">
                            教
                            <i></i>
                            龄：{{ruleForm.workLife}}
                        </li>
                        <li class="letWid">
                            学
                            <i></i>
                            历：{{ruleForm.education}}
                        </li>
                        <li class="letWid">
                            专
                            <i></i>
                            业：{{ruleForm.major}}
                        </li>
                        <li class="clearfix">
                            <p class="fl">教授科目：</p>
                            <div class="fl subject">
                                <p v-for="v in ruleForm.subject" :key="v">{{v}}</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <p class="fl">所在班级：</p>
                            <div class="fl classes">
                                <p v-for="v in ruleForm.classes" :key="v">{{v}}</p>
                            </div>
                        </li>
                        <li class="teachingBrief">
                            教学简介：
                            <span>{{ruleForm.teachingBrief}}</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <div class="aptitudeBox">
                <p class="aptitudeTitle pos1">
                    教师资质
                    <i></i>
                </p>
                <ul class="showImg">
                    <li>
                        <img src="./teacherCard.jpg" alt>
                    </li>
                    <li>
                        <img src="./teacherCard.jpg" alt>
                    </li>
                    <li>
                        <img src="./teacherCard.jpg" alt>
                    </li>
                </ul>
                <div class="submitBox clearfix">
                    <p class="fl" @click="refuse">拒绝</p>
                    <p class="fl active"  @click="allowed(txt)">通过</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddManager",
    data() {
        return {
            txt:true,
            ruleForm: {
                name: "窦娥", //用户名
                niceName: "梦里询他千百度", //昵称
                sex: "女", //性别
                age: 33,
                nation: "汉族", //民族
                birthday: "1981年05月15日", //出生年月
                political: "党员",//政治面貌
                marriage: "",//婚姻状况
                phone: "15010611993", //电话
                email: "15010611993@163.com", //邮箱
                idNumeber: 112233445566778899,//身份证号
                nativePlace: "北京市北京市北京市",//籍贯
                address: "北京市昌平区华家园东一区",//常住地址
                workLife: "10年以上", //教龄
                education: "硕士",//学历
                major: "英语", //专业
                subject: ["少儿英语", "艺术英语"],//教授科目
                classes: ["一年7班", "一年8班", "一年9班"], //所在班级
                teachingBrief: "南京大麦网络大学蛤蜊英文专业毕业，从事教师行业13年，桃李满天下，下面随便写，不知道写啥，没空瞎编，看着写吧。我是案例，是个很长很长的案例",//教学简介
            }
        };
    },
    methods:{
        refuse(){
            alert("拒绝！！！")
        },
        allowed(t){
            this.$router.push({
                name:'teacherExamine', 
                params:{
                    bool:t
                }             
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addManager {
    .topNav {
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
            padding: 20px 0 26px 220px;
        }
        .infomation {
            .photo {
                width: 120px;
                height: 120px;
                margin-left: 50px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            li {
                margin-bottom: 22px;
                font-size: 14px;
                .subject,
                .classes {
                    p {
                        margin-bottom: 20px;
                    }
                    p:last-child {
                        margin-bottom: 0px;
                    }
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
            .leftInfo {
                padding-left: 28px;
            }
        }
        .aptitudeBox {
            margin-top: 60px;
            .aptitudeTitle {
                width: 100px;
                font-size: 18px;
                color: #080808;
                margin-left: 220px;
                i {
                    display: block;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: url("./tip.png") no-repeat center center;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 0;
                    right: 0px;
                }
            }
            .showImg {
                margin-top: 30px;
                margin-left: 220px;
                li {
                    display: inline-block;
                    width: 220px;
                    height: 140px;
                    border-radius: 4px;
                    border: solid 1px #f1f1f1;
                    margin-right: 20px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 4px;
                    }
                }
            }
            .submitBox {
                width: 264px;
                margin: 0 auto;
                padding: 62px 0 51px 0;
                p {
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    margin-left: 20px;
                    font-size: 14px;
                    color: #5693ff;
                    background-color: #ffffff;
                    border-radius: 20px;
                    border: solid 1px #5693ff;
                    cursor: pointer;
                }
                p:first-child {
                    margin-left: 0;
                }
                .active {
                    background-color: #5693ff;
                    color: #fff;
                }
            }
        }
    }
}
</style>
