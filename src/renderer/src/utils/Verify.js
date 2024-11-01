const regs = {
    email: /^[A-Za-z0-9+_.-]+@(.+)$/,
    password: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,18}$/,

}

const verfiy = (rule, value, reg, callback) => {
    if (value) {
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error(rule.message))
        }
    } else {
        callback();
    }
}

const checkPassword = (value)=>{
    return regs.password.test(value)
}
const checkEmail = (value)=>{
    return regs.email.test(value)
}

const password = (rule, value, callback) => {
    return verfiy(rule, value,regs.password,callback)
}

export default {
    checkEmail,
    checkPassword,
    password,
}


