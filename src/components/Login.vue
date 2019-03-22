<template>
    <div class="login">
        <div class="loginBody">
            <img class="logo" src="../assets/images/loginLogo.png" alt>
            <div class="account">
                <input type="text" class="userName" v-model="user.userName" placeholder="请输入手机号/账号">
                <input type="password" placeholder="请输入密码" v-model="user.password">
            </div>
            <select name="school" id="school" class="school tipsColor">
                <option class="tips" style="display: none;" disabled selected>请选择默认选项或机构</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <input type="button" value="登 录" @click="signin" class="button">
            <div class="aboutLink">
                <a href class="registerLink">注册账号</a>|
                <a href>忘记密码？</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            user: {
                userName: '',
                password: '',
            }
        };
    },
    methods: {
        signin() {//点击按钮登录
            let self = this;
            if (self.user.userName == '' && self.user.password != '') {
                this.$message('请输入用户名！');
            } else if (self.user.password == '' && self.user.userName != '') {
                this.$message('请输入密码！');
            } else if (self.user.userName == '' && self.user.password == '') {
                this.$message('信息不能为空！');
            } else {
                let params = {
                    username: self.user.userName,
                    password: self.user.password
                }
                this.axios.get('/user/login', {
                    params: { params }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code == 0) {
                            sessionStorage.setItem('uid', res.data.data.uid);
                            document.cookie = "uid=" + res.data.data.uid;
                            document.cookie = "token=" + res.data.data.token;
                            this.getTid(res.data.data.uid);
                            this.$router.push({
                                path: '/admin/adminUser'
                            })
                        } else {
                            this.$alert(res.data.msg, {
                                dangerouslyUseHTMLString: true
                            });
                        }
                    } else {
                        this.$alert('网络连接不畅...', {
                            dangerouslyUseHTMLString: true
                        });
                    }
                })
            }
        },
        // 获取用户的tid
        getTid(uid) {
            this.axios.get('/tenant/user/getTenant/' + uid).then(res => {
                if (res.status === 200) {
                    if (res.data.code == 0) {
                        sessionStorage.setItem('tid', res.data.data)
                    }
                } else {
                    this.$alert('网络连接不畅...', {
                        dangerouslyUseHTMLString: true
                    });
                }
            }).catch((error) => {
                console.log(error)
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #196197;
    .loginBody {
        width: 300px;
        height: 460px;
        background-color: #f0f0f0;
        box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -320px;
        margin-top: -230px;
        padding: 0 170px;
        .logo {
            padding: 40px 90px;
        }
        .account {
            width: 298px;
            height: 100px;
            background-color: #e8e8e8;
            border-radius: 4px;
            border: solid 1px #b8b8b8;
            margin-bottom: 20px;
            input {
                display: block;
                border: none;
                width: 277px;
                margin: 0 10px;
                height: 47%;
                background-color: #e8e8e8;
                text-indent: 10px;
                outline: none;
            }
            .userName {
                background-color: #e8e8e8;
                border-bottom: solid 1px #b8b8b8;
            }
        }
        .school {
            width: 298px;
            height: 50px;
            background-color: #e8e8e8;
            border-radius: 4px;
            border: solid 1px #b8b8b8;
            padding: 0 10px;
            text-indent: 6px;
            margin-bottom: 40px;
            .tips {
                color: #999;
            }
        }
        .tipsColor {
            color: #89888a;
        }
        .button {
            width: 300px;
            height: 50px;
            background-color: #2e8ed6;
            border-radius: 4px;
            font-size: 16px;
            line-height: 48px;
            color: #ffffff;
            border: none;
            cursor: pointer;
        }
        .aboutLink {
            display: flex;
            justify-content: center;
            padding-top: 20px;
            font-size: 12px;
            a {
                display: inline;
                padding: 0 10px;
                color: #333;
            }
            .registerLink {
                color: #e47727;
            }
        }
    }
}
</style>
