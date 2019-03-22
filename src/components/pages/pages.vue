<template>
    <div class="pagesBox">
        <div class="pageStyle">
            <el-pagination
                background
                next-text="下一页"
                prev-text="上一页"
                layout="prev, pager, next"
                :total="100"
                @current-change="operation"
            ></el-pagination>
        </div>
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
.pagesBox {
    margin: 30px 0 25px 0;
    .pageStyle {
        text-align: center;
        /deep/ .el-pager {
            li {
                height: 30px;
                border-radius: 50%;
                border: 1px solid #a9a9a9;
                color: #a9a9a9;
            }
            .active {
                border: 1px solid #5693ff;
                color: #fff;
            }
            li:hover {
                background: #5693ff;
                border: solid 1px #5693ff;
                color: #fff;
            }
        }
        /deep/ button {
            width: 60px;
            height: 30px;
            background-color: #f8fafc;
            border-radius: 15px;
            border: solid 1px #a9a9a9;
        }
    }
}
</style>
