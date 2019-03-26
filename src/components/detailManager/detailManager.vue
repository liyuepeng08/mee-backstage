<template>
    <div class="detailAdmin">
        <el-row>
            <el-col :span="24">
                <h3 class="pageTitle">管理员详情</h3>
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
            <el-row class="infomation" v-loading="loading">
                <el-col :span="20">
                    <ul class="leftInfo">
                        <li class="letWid">
                            姓
                            <i></i>
                            名：
                            <span>{{ruleForm.realName}}</span>
                        </li>

                        <li>
                            联系电话：
                            <span>{{ruleForm.mobile}}</span>
                        </li>
                        <li class="letWid">
                            邮
                            <i></i>
                            箱：
                            <span>{{ruleForm.email}}</span>
                        </li>
                        <li>
                            所属机构：
                            <span>{{ruleForm.organization}}</span>
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
            loading: true,
            ruleForm: {},
        };
    },
    mounted() {
        this.uid = (this.$route.params.uid).toString()
        this.getAdminInfo()
    },
    methods: {
        backPre() {
            history.back(-1);
        },
        getAdminInfo() {
            let params = { uid: this.uid };
            this.axios.get('/user/getUserDetail', {
                params: {
                    params
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.code == 0) {
                        this.loading = false;
                        // console.log(res.data)
                        this.ruleForm = res.data.data
                    } else {
                        this.$alert(res.data.msg, {
                            dangerouslyUseHTMLString: true
                        });
                    }
                } else {
                    this.$alert('加载失败，请检查网络是否连接诶正常！', {
                        dangerouslyUseHTMLString: true
                    });
                }
            }).catch((error) => {
                console.log(error)
            })
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detailAdmin {
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
