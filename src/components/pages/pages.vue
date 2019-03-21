<template>
    <div class="pagesBox">
        <el-row>
            <el-col>
                <div class="pageBtn">
                    <el-pagination
                        background
                        next-text="下一页"
                        prev-text="上一页"
                        layout="prev, pager, next"
                        :total="100"
                       
                    ></el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>
<style lang="less" scoped>
.pagesBox {
    margin: 30px 0 25px 0;
    /deep/ .el-col {
        .pageBtn {
            width: 40%;
            margin: 0 auto;
            button {
                width: 60px;
                height: 30px;
                background-color: #f8fafc;
                border-radius: 15px;
                border: solid 1px #a9a9a9;
            }
            .el-pager {
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
        }
    }
}
</style>
