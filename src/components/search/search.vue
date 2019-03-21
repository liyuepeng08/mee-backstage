<template>
    <div class="searchBox">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-select v-model="select1" placeholder="所属机构">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="select2" placeholder="所在班级">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="select3" placeholder="教授科目">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input v-model="searchText" placeholder="输入名称/所属机构/电话"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" circle></el-button>
            </el-col>
        </el-row>

    </div>
</template>
<script>
//这个是 搜索 组件

export default {
    data() {
        return {
            date: '',
            select1: '',
            select2: '',
            select3: '',
            searchText: '',
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
    width: 860px;
    & /deep/ .el-date-editor.el-input {
        width: 100%;
    }
}
</style>

