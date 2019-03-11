<template>
    <div>
        <crumbs></crumbs>
        <search></search>
        <div class="agent-content">
            <el-button type="primary" icon="el-icon-plus" class="new-add">新增</el-button>
            <table-list></table-list>
        </div>
    </div>
</template>
<script>
//这个是 代理商管理 组件
import Crumbs from '@/components/crumbs/crumbs'
import Search from '@/components/search/search'
import TableList from '@/components/table/table'
export default {
    components: {
        Crumbs,
        Search,
        TableList
    }
}
</script>
<style lang="less" scoped>
.agent-content {
    background-color: #fff;
    padding-top: 20px;
    padding-left: 10px;
}
.new-add {
    margin-bottom: 10px;
}
</style>

