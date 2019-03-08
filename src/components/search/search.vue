<template>
    <div>
        <el-row>
            <el-col :span="7">
                创建时间：
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    style="width: 250px;"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                电话：
                <el-input v-model="telephone" style="width: 100px;" placeholder="请输入电话号码"></el-input>
            </el-col>
            <el-col :span="4">
                姓名：
                <el-input v-model="name" style="width: 100px;" placeholder="请输入姓名"></el-input>
            </el-col>
            <el-col :span="4">
                昵称：
                <el-input v-model="nickname" style="width: 100px;" placeholder="请输入昵称"></el-input>
            </el-col>
            <el-col :span="5">
                所属机构：
                <el-input v-model="mechanism" style="width: 150px;" placeholder="请输入所属机构"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
                学校名称：
                <el-input v-model="telephone" style="width: 220px;" placeholder="请输入电话号码"></el-input>
            </el-col>
            <el-col :span="5">
                班级：
                <el-input v-model="telephone" style="width: 140px;" placeholder="请输入电话号码"></el-input>
            </el-col>
            <el-col :span="5">
                教授科目：
                <!-- <el-cascader
                    :options="options"
                    v-model="subject"
                    style="width: 110px;"
                    @change="subjectChange">
                </el-cascader> -->
            </el-col>
            <el-col :span="4">
                状态：
                <!-- <el-cascader
                    :options="options1"
                    v-model="state"
                    style="width: 80px;"
                    @change="stateChange">
                </el-cascader> -->
            </el-col>
            <el-col :span="2" style="text-align: right;">
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
            subject: '',
            state: '',
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
<style lang="less" scoped>

</style>

