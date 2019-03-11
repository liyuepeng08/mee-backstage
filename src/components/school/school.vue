<template>
    <div>
        <crumbs></crumbs>
        <search></search>
        <table></table>
    </div>
</template>
<script>
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

