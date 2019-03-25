<template>
    <div class="newSearch fr">
        <ul class="search">
            <li>
                <input type="text" v-model="search.realname" placeholder="请输入姓名">
            </li>
            <li>
                <el-select class="select" v-model="search.gender" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </li>
            <li>
                <input type="text" v-model="search.email" placeholder="请输入邮箱">
            </li>
            <li>
                <input type="text" v-model="search.mobile" placeholder="请输入电话">
            </li>
            <li @click="getSearch">
                <span></span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: {
                realname: '',
                gender: '',
                email: '',
                mobile: '',
                status: "",
            },
            options: [{
                value: '1',
                label: '男'
            }, {
                value: '0',
                label: '女'
            }, {
                value: '2',
                label: '保密'
            }]
        }
    },

    methods: {
        getSearch() {
            let params = {
                realname: this.search.realname,
                gender: this.search.gender,
                email: this.search.email,
                moblie: this.search.mobile,
                status: this.search.status,
                role: 1,
                pageIndex: 1,
                pageSize: 10
            }
            this.$emit('getSearchData',params)

        },
    }
}
</script>
<style lang="less" scoped>
.newSearch {
    li {
        display: inline-block;
        margin-right: 10px;
        input {
            width: 120px;
            height: 34px;
            padding: 0 10px;
            background-color: #ffffff;
            border-radius: 4px;
            border: solid 1px #cacaca;
        }
        span {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: url("./search.png") no-repeat center center #ccc;
            background-size: 50% 50%;
            position: relative;
            top: 10px;
        }
        .select {
            width: 140px;
            /deep/ .el-input__inner {
                height: 36px;
                border: solid 1px #cacaca;
            }
        }
    }
    li:last-child {
        cursor: pointer;
    }
}
</style>
