<template>
    <div>
        <crumbs></crumbs>
        <search></search>
        <div class="examine-content">
            <tab></tab>
        </div>
        
    </div>
</template>
<script>
//这个是 审核管理 组件
import Crumbs from '@/components/crumbs/crumbs'
import Search from '@/components/search/search'
import Tab from '@/components/examine/tab/tab'
import TableList from '@/components/examine/table-list/table-list'
export default {
    components: {
        Crumbs,
        Search,
        Tab
    }
}
</script>
<style lang="less" scoped>
.examine-content {
    background-color: #fff;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 20px;
    padding-right: 10px;
}
</style>

