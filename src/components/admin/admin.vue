<template>
    <section class="container">
        <header>
            <main-header></main-header>
        </header>
        <el-row class="cont">
            <el-col :span="3" class="left-nav">
                <left-nav></left-nav>
            </el-col>
            <el-col :span="21" style="background-color: #F3F3F5;">
                <router-view/>
            </el-col>
        </el-row>
    </section>
</template>
<script>
//当前是 后台主页组件
import LeftNav from '@/components/nav/nav'
import mainHeader from '@/components/base/Header/Header'
export default {
    components: {
        LeftNav,
        mainHeader
    }
}
</script>
<style lang="less" scoped>
.left-nav {
    background-color: #3F4464;
    height: 100%;
}
.container, .cont {
    height: 100%;
}
</style>


