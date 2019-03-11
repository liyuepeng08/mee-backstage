<template>
    <div>
        <crumbs></crumbs>
        <search></search>
        <div class="account-content">
            <tab></tab>
        </div>
    </div>
</template>
<script>
//这个是 账号管理 组件
import Crumbs from '@/components/crumbs/crumbs'
import Search from '@/components/search/search'
import TableList from '@/components/table/table'
import Tab from '@/components/account/tab/tab'
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
.account-content {
    background-color: #fff;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 20px;
}
</style>

