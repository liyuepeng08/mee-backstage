<template>
    <div>
        <crumbs></crumbs>
        <search></search>
        <tab></tab>
    </div>
</template>
<script>
//这个是 账号管理 组件
import Crumbs from '@/components/crumbs/crumbs'
import Search from '@/components/search/search'
import TableList from '@/components/table/table'
import Tab from '@/components/tab/tab'
export default {
    components: {
        Crumbs,
        Search,
        TableList,
        Tab
    }
}
</script>
<style lang="less" scoped>

</style>

