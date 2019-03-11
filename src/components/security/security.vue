<template>
    <div>
        <crumbs></crumbs>
        <search></search>
        <table-list></table-list>
    </div>
</template>
<script>
//这个是 安全管理 组件
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

</style>

