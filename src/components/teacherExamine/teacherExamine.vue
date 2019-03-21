<template>
    <div class="teacherExamine">
        <p class="topNav">
            <span>审核管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">教师审核</span>
        </p>
        <h2>教师审核</h2>
        <div style="margin-top:30px;height:30px;width:100%;border:1px solid #ccc;"></div>
        <el-table class="examineInfo" :data="tableData">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="mechanism" label="所属机构"></el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    <el-button type="text" size="small" @click="allowed(scope)">通过</el-button>
                    <el-button type="text" size="small" @click="refuseMsg(scope)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pages></pages>
        <!-- tip -->
        <div class="tip" v-if="succTip">
            <div class="info">
                <img v-if="!errTip" src="./tip.png" alt>
                <img v-if="errTip" src="./err.png" alt="">
                <span v-if="!errTip">操作成功，已通过审核！</span>
                <span v-if="errTip">操作失败，审核已拒绝！</span>
            </div>
        </div>
    </div>
</template>
<script>
import Pages from '../pages/pages'
export default {
    mounted() {
        if (this.$route.params.bool) {
            this.succTip = true;
            setTimeout(() => {
                this.succTip = false;
            }, 2000)
        }
    },
    data() {
        return {
            succTip: false,
            errTip: false,
            tableData: [{
                id:1,
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }, {
                id:2,
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }, {
                id:3,
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }, {
                id:4,
                name: '爱谁谁',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',
            }]
        }
    },
    methods: {
        detailMsg(scope) {
            // console.log(scope.row)//改行表格内的数据信息
            this.$router.push({
                path: 'examineTeacherDel'
            })
        },
        allowed(scope) {
            let self = this;
            self.succTip = true;
            setTimeout(() => {
                self.succTip = false;
            }, 2000)
        },
        refuseMsg(scope) {
            let self = this;
            self.succTip = true;
            self.errTip = true;
            setTimeout(() => {
                self.succTip = false;
                self.errTip = false;
            }, 2000)

        }
    },
    components: {
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
    .tip {
        width: 360px;
        height: 120px;
        line-height: 120px;
        background-color: #f4f8ff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: solid 1px #cacaca;
        position: fixed;
        top: 40%;
        left: 40%;
        z-index: 1;
        .info {
            width: 250px;
            margin: 0 auto;
            text-align: center;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                position: relative;
                top: 8px;
                right: 10px;
            }
            span {
                font-size: 18px;
                color: #080808;
            }
        }
    }
}
</style>
