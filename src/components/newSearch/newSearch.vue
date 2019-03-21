<template>
    <div class="newSearch fr">
        <ul class="search">
            <li>
                <input type="text" v-model="search.uid" placeholder="请输入编号">
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
                uid: '',
                email: '',
                mobile: ''
            }
        }
    },
    methods: {
        getSearch() {
            let self = this, params;
            if (self.search.email != '') {
                params = { email: self.search.email }
            } else if (self.search.uid !== '') {
                params = { uid: self.search.uid }
            } else {
                params = { mobile: self.search.mobile }
            }
            this.axios.get('/user/getUser', { params: { params } }).then(res => {
                console.log(res)
            })

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
            height: 30px;
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
    }
}
</style>
