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
            // params = {
            //     realname: '',
            //     gender: '',
            //     email: '',
            //     moblie: '',
            //     status: ''

            // }
            // this.axios.get('/user/getUser', { params: { params } }).then(res => {
            //     if (res.status === 200) {
            //         console.log(res)
            //         if (res.data.code == 0) {
            //             let searchArr = [];
            //             searchArr.push(res.data.data)
            //             this.$emit('getSearchData', searchArr);
            //         }
            //     } else {
            //         this.$alert('网络连接不畅...', {
            //             dangerouslyUseHTMLString: true
            //         });
            //     }
            // }).catch((error) => {
            //     console.log(error)
            // })

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
    li:last-child {
        cursor: pointer;
    }
}
</style>
