var OK=false;
const validateRPass = (rule, value, callback) => {
  const reg= /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/
  if (value === '') {
    OK=false;
    callback(new Error('请输入密码'));
  }else if(!reg.test(value)){
    OK=false;
    callback(new Error("请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种"))
  } else{
    OK=true;
    callback()
  }
}
const validateRPass2 = (rule, value, callback) => {
  if (value === '') {
    OK = false;
    callback(new Error('请再次输入密码'));
  } else if (value !== this.ruleForm.pwd) {
    OK = false;
    callback(new Error('两次输入密码不一致!'));
  } else {
    OK = true;
    callback();
  }
}
const checkRUser = (rule, value, callback) => {
  if(!value){
    OK=false;
    callback(new Error("请输入账号"))
  }else if(value.length<6){
    OK=false
    callback(new Error("账号要不少于6位"))
  } else{
    OK=true
    callback()
  }
}
exports.validateRPass=validateRPass;
exports.validateRPass2=validateRPass2;
exports.checkRUser=checkRUser;
