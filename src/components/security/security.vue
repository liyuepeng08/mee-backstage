<template>
    <div>
        <crumbs></crumbs>
        <search></search>
        <table></table>
    </div>
</template>
<script>
//这个是 安全管理 组件
import Crumbs from '@/components/crumbs/crumbs'
import Search from '@/components/search/search'
import Table from '@/components/table/table'
export default {
    components: {
        Crumbs,
        Search,
        Table
    }
}
</script>
<style lang="less" scoped>

</style>

