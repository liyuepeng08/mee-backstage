<template>
    <div class="pagesBox">
        <el-row>
            <el-col :span="24">
                <div class="clearfix">
                    <div class="fr">
                        <el-pagination background next-text="下一页" 
                            prev-text="上一页" 
                            layout="prev, pager, next" 
                            :total="total"
                            @current-change="operation"
                        >
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        pageSize: {         //每页显示条目个数
            type: Number,
            default: 10
        },
        total: {            //总条目数
            type: Number
        },
        pagerCount: {       //页码按钮的数量
            type: Number,
            default: 8
        }
    },
    methods: {
        operation(pageNum) {        //切换页码回调函数。参数是切换后的 页码

            this.$emit('changeNum', pageNum)        //触发父组件 changeNum事件，把pageNum传回去
        }
    }
}
</script>
<style lang="less" scoped>
.pagesBox{
    margin: 30px 0 25px 0;
}
</style>
