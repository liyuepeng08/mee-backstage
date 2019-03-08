<template>
    <div class="date_box">
        <div class="date_time clearfix">
            <div class="block fl">
                <span class>创建时间</span>
                <el-date-picker v-model="dateInfo.date1" type="date" placeholder="选择日期"></el-date-picker>
                <span class="reach">至</span>
                <el-date-picker v-model="dateInfo.date2" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="_info tel fl">
                <label>电话</label>
                <input v-model="dateInfo.phone" placeholder>
            </div>
            <div class="_info name fl">
                <label>姓名</label>
                <input v-model="dateInfo.phone" placeholder>
            </div>
            <div class="_info nice_name fl">
                <label>昵称</label>
                <input v-model="dateInfo.phone" placeholder>
            </div>
            <div class="_info Affiliate fl">
                <label>所属机构</label>
                <input v-model="dateInfo.phone" placeholder>
            </div>
        </div>
        <!-- <div class="name_list clearfix">
            <div class="fl"></div>
        </div>-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            dateInfo: {
                date1: '',
                date2: '',
                phone: ''
            }
        }
    }
}
</script>
<style lang="less" scoped>
.date_box {
    .date_time {
        width: 1146px;
        height: 120px;
        margin: 0 auto;
        background: #fff;
        // padding: 0 20px;
        .block {
            line-height: 48px;
            .el-date-editor.el-input,
            .el-date-editor {
                width: 110px;
            }
            span {
                padding: 0;
            }
            .reach {
                margin: 0 5px;
            }
        }
        ._info {
            label {
                line-height: 48px;
                padding-right: 10px;
            }
            input {
                width: 100px;
                height: 30px;
                background-color: #f5f5f5;
                border-radius: 4px;
                border: solid 1px #cacaca;
                margin-right: 29px;
            }
        }
    }
}
</style>
