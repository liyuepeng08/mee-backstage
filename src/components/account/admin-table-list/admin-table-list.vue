<template>
    <el-table
      :data="tableData"
      style="width: 100%; border-left: 1px solid #CACACA; border-right: 1px solid #CACACA;border-bottom: 1px solid #CACACA;">

        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>

        <el-table-column
            prop="nickname"
            label="昵称">
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
            prop="schoolName"
            label="学校名称">
        </el-table-column>

        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small">详情</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="deleteMsg(scope)">删除</el-button>
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
                schoolName: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                subject: '高数'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                schoolName: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                subject: '高数'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                schoolName: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                subject: '高数'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                schoolName: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                subject: '高数'
            }]
        }
    },
    methods: {
        deleteMsg(scope) {
            

            this.$confirm('确定要删除' + this.tableData[scope.$index].name + '用户吗？', '删除管理员',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            })
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
