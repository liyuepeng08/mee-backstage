<template>
    <div class="pagesBox">
        <el-row>
            <el-col :span="24">
                <div class="clearfix">
                    <div class="fr">
                        <el-pagination background next-text="下一页" prev-text="上一页" layout="prev, pager, next" :total="1000"></el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.pagesBox{
    margin: 30px 0 25px 0;
}
</style>
