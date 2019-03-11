<template>
    <el-table
      :data="tableData"
      style="width: 100%; border-left: 1px solid #CACACA; border-right: 1px solid #CACACA;border-bottom: 1px solid #CACACA;">

        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>

        <el-table-column
            prop="nickname"
            label="昵称"
            width="180">
        </el-table-column>

        <el-table-column
            prop="telephone"
            label="电话">
        </el-table-column>

        <el-table-column
            prop="time"
            label="创建时间">
        </el-table-column>

        <el-table-column
            prop="state"
            label="状态">
        </el-table-column>

        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small">详情</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                address: '上海市普陀区金沙江路 1518 弄',
                telephone: '18897689866',
                time: '2019-02-19',
                state: '正常'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                address: '上海市普陀区金沙江路 1518 弄',
                telephone: '18897689866',
                time: '2019-02-19',
                state: '待支付'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                address: '上海市普陀区金沙江路 1518 弄',
                telephone: '18897689866',
                time: '2019-02-19',
                state: '正常'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                address: '上海市普陀区金沙江路 1518 弄',
                telephone: '18897689866',
                time: '2019-02-19',
                state: '待支付'
            }]
        }
    }
};
</script>
<style lang="less">
.el-table th.is-leaf {
    background-color: #C7DAED;
    font-size: 700;
}
.el-table th>.cell {
    font-weight: 700;
    color: #333333;
}
</style>
