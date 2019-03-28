<template>
    <div class="resetPassword">
        <div class="resetBox">
            <p class="title">重置密码</p>
            <ul class="inputList">
                <li class="clearfix">
                    <p class="fl">名称：</p>
                    <p class="fl name">{{resetName}}</p>
                </li>
                <li>
                    <div>填写新密码</div>
                    <div>
                        <input type="password" v-model="password.newPwd1" placeholder="填写密码">
                    </div>
                </li>
                <li>
                    <div>确认密码</div>
                    <div>
                        <input type="password" v-model="password.newPwd2" placeholder="填写密码">
                    </div>
                </li>
                <li class="clearfix">
                    <p class="fl cancel" @click="resetBtn(0,password)">取消</p>
                    <p class="fl allowed" @click="resetBtn(1,password)">确定</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['resetName'],
    data() {
        return {
            password:{
                newPwd1:"",
                newPwd2:""
            }
        }
    },
    methods: {
        resetBtn(txt,pwd) {
             this.$emit('changeStatus', txt,pwd) 
        },
    }
}
</script>
<style lang="less" scoped>
.resetPassword {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .resetBox {
        width: 420px;
        height: 409px;
        background-color: #ffffff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: solid 1px #cacaca;
        padding: 0 40px;
        box-sizing: border-box;
        position: absolute;
        top: 25%;
        left: 35%;
        z-index: 200;
        .title {
            font-size: 18px;
            color: #080808;
            text-align: center;
            margin: 22px 0;
        }
        .inputList {
            margin-top: 17px;
            li {
                margin-bottom: 40px;
                p {
                    font-size: 18px;
                }
                .name {
                    color: #5693ff;
                }
                div {
                    font-size: 12px;
                    margin-bottom: 10px;
                    input {
                        font-size: 14px;
                        padding: 0 20px;
                        width: 340px;
                        height: 40px;
                        background-color: #f8fafc;
                        border-radius: 4px;
                        border: solid 2px #f1f1f1;
                        box-sizing: border-box;
                    }
                }
                .cancel,
                .allowed {
                    width: 90px;
                    height: 30px;
                    line-height: 28px;
                    text-align: center;
                    margin-right: 20px;
                    font-size: 12px;
                    background-color: #ffffff;
                    border-radius: 15px;
                    border: solid 1px #5693ff;
                    box-sizing: border-box;
                    color: #5693ff;
                    cursor: pointer;
                }
                .allowed {
                    margin-right: 0;
                    background: #5693ff;
                    color: #fff;
                }
            }
            li:last-child {
                width: 220px;
                margin: 0 auto;
            }
        }
    }
}
</style>
