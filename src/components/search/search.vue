<template>
    <div class="searchBox">
        <el-row class="firstLine">
            <el-col :span="7" class="date">创建时间
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    style="width: 230px;"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-col>
            <el-col :span="3" class="mLeft phone">电话
                <el-input v-model="telephone" style="width: 100px;" placeholder="请输入电话号码"></el-input>
            </el-col>
            <el-col :span="3" class="mLeft name">姓名
                <el-input v-model="name" style="width: 100px;" placeholder="请输入姓名"></el-input>
            </el-col>
            <el-col :span="3" class="mLeft nickName">昵称
                <el-input v-model="nickname" style="width: 100px;" placeholder="请输入昵称"></el-input>
            </el-col>
            <el-col :span="5" class="mLeft mechanism">所属机构
                <el-input v-model="mechanism" style="width: 198px;" placeholder="请输入所属机构"></el-input>
            </el-col>
        </el-row>
        <el-row class="secondLine">
            <el-col class="school" :span="7">学校名称
                <el-input v-model="telephone" style="width: 220px;" placeholder="请输入学校名称"></el-input>
            </el-col>
            <el-col class="classes mLeft" :span="4">班级
                <el-input v-model="telephone" style="width: 140px;" placeholder="请输入班级"></el-input>
            </el-col>
            <el-col class="subject mLeft" :span="4">教授科目
                <el-cascader
                    :options="options"
                    v-model="subject"
                    style="width: 110px;"
                    @change="subjectChange"
                ></el-cascader>
            </el-col>
            <el-col class="state mLeft" :span="4">状态
                <el-cascader
                    :options="options1"
                    v-model="state"
                    style="width: 80px;"
                    @change="stateChange"
                ></el-cascader>
            </el-col>
            <el-col :span="4" class="searchBtn">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
//这个是 搜索 组件

export default {
    data() {
        return {
            telephone: '',
            date: '',
            mechanism: '',
            nickname: '',
            name: '',
            subject: [],
            state: [],
            options: [{
                value: 'zhinan',
                label: '指南',
            }, {
                value: 'zujian',
                label: '组件'
            }],
            options1: [
                {
                    value: 'zhuangtai1',
                    label: '状态1'
                }
            ]
        }
    },
    methods: {
        subjectChange() {

        },
        stateChange() {

        }

    },
    components: {

    }
}
</script>
<style lang="less">
.searchBox {
    height: 120px;
    font-size: 12px;
    background: #fff;
    margin-bottom: 20px;
    .el-input__inner {
        height: 30px;
        line-height: 30px;
        padding: 0 4px;
        margin-left: 4px;
    }

    .firstLine,
    .secondLine {
        padding: 20px 0;
        .date {
            width: 28.16667%;
            padding-left: 20px;
            .el-range__icon {
                line-height: 30px;
            }
        }
        .mLeft {
            margin-left: 29px;
        }
        .mechanism {
            width: 22.253333%;
        }
    }
    .secondLine {
        padding: 0;
        .school {
            padding-left: 20px;
            width: 26.16667%;
        }
        .classes,
        .subject {
            width: 15.47%;
        }
        .subject,
        .state {
            .el-cascader {
                height: 30px;
                line-height: 30px;
                .el-input__prefix,
                .el-input__suffix {
                    height: auto;
                    top: -4px;
                }
            }
        }
        .searchBtn {
            text-align: right;
            .el-button {
                padding: 7px 16px;
            }
        }
    }
}
</style>

