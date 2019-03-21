let Install = {
  isMecCode : /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/,
  phone: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
  pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/,
  email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, //邮箱正则
  isPhone(options) {
    return this.phone.test(options);
  },
  isPwd(options) {
    return this.pwd.test(options);
  },
  isEmail(options) {
    return this.email.test(options);
  },
  isCode(options) {
    //机构代码验证
    return this.isMecCode.test(options);
  },
};

export default Install
