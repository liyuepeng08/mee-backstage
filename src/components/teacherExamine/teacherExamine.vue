<template>
    <div class="teacherExamine">
        <p class="topNav">
            <span>审核管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">教师审核</span>
        </p>
        <h2>教师审核</h2>
        <div style="margin-top:30px;height:30px;width:100%;border:1px solid red;"></div>
        <el-table class="examineInfo" :data="tableData">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="mechanism" label="所属机构"></el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    <el-button type="text" size="small">通过</el-button>
                    <el-button type="text" size="small" @click="deleteMsg(scope)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pages></pages>
    </div>
</template>
<script>
import Pages from '../pages/pages'
export default {
    data() {
        return {
            tableData: [{
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }, {
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }, {
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }, {
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }]
        }
    },
    methods: {
        detailMsg(){
            this.$router.push({
                path:'examineTeacherDel'
            })
        }
    },
    components:{
        Pages,
    }
}
</script>
<style lang="less" scoped>
.teacherExamine {
    padding: 0 10px;
    .topNav {
        font-size: 12px;
        color: #a9a9a9;
        .active {
            color: #5693ff;
        }
    }
    h2 {
        font-size: 18px;
        color: #080808;
        margin-top: 29px;
    }
    .examineInfo {
        margin-top: 20px;
        /deep/ th {
            font-weight: 700;
            color: #080808;
        }
        /deep/ th,
        /deep/ td {
            padding-left: 40px;
        }
    }
}
</style>
