<template>
    <div class="login-panel">
      <div class="title drag">EasyChat</div>
      <div v-if="showLoading" class="loading-panel">
        <img src="../assets//img/loading.gif">
      </div>
      <div class="login-form" v-else>
        <div class="error-msg">{{ errorMsg }}</div>
        <el-form
          :model="formData"
          ref="formDataRef"
          label-width="80px"
          @submit.prevent
        >
        <!--input输入-->
        <el-form-item prop="email" >
            <el-input 
                size="large" 
                clearable
                placeholder="请输入邮箱"  
                maxLength="30"
                v-model.trim="formData.email"
                @focus="cleanVerify"
            >
                <template #prefix>
                    <span class="iconfont icon-email"></span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="nickName" v-if="!isLogin">
            <el-input 
                size="large" 
                clearable
                placeholder="请输入昵称" 
                maxLength="15"
                v-model.trim="formData.nickName"
                @focus="cleanVerify"
                >
                <template #prefix>
                    <span class="iconfont icon-user-nick"></span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password" >
            <el-input size="large" 
            show-password 
            clearable 
            placeholder="请输入密码" 
            v-model.trim="formData.password"
            @focus="cleanVerify"
            >
                <template #prefix>
                    <span class="iconfont icon-password"></span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" v-if="!isLogin">
            <el-input 
            size="large" 
            show-password 
            clearable 
            placeholder="请再次输入密码" 
            v-model.trim="formData.confirmPassword"
            @focus="cleanVerify"
            >
                <template #prefix>
                    <span class="iconfont icon-password"></span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="!isLogin">
            <div class="check-code-panel">
            <el-input 
                size="large" 
                show-password 
                clearable 
                placeholder="请输入验证码" 
                v-model.trim="formData.code"
                @focus="cleanVerify">
                <template #prefix>
                    <span class="iconfont icon-checkcode"></span>
                </template>
                
            </el-input>
            <img :src="captchaImg" class="check-code" @click="changeCaptcha"/>
        </div>
        </el-form-item>
        <div>
            <el-button type="primary" class="login-bth" @click="submit">{{isLogin ? '登录': '注册'}}</el-button>
        </div>
        <div class="bottom-link"> 
            <span class="a-link" @click="changeOpType">
                {{isLogin ? '没有账号？': '已有账号？'}}
            </span>
        </div>
        <!-- <el-alert v-if="errorMsg" title="错误" type="error" :description="errorMsg" /> -->
        </el-form> 
      </div>  
    </div>
    <!-- 置顶 放大 缩小组件 -->
    <WinOp :showSetTop="false" :showMin="false" :showMax="false" :closeType="0"></WinOp>
  </template>
  
<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
import { getCaptcha, login, register } from '../api/Login';
import { useUserStore } from '@/stores/userStore'
import md5 from 'js-md5';
import { useRouter } from 'vue-router';
import WinOp from '../components/WinOp.vue';
const router = useRouter()

const userStore = useUserStore()

const { proxy } = getCurrentInstance()

const formData = ref({
    email: '',
    nickName: '',
    password: '',
    confirmPassword: '',
    code: '',
    captchaKey: '',
});

const formDataRef = ref();
const isLogin = ref(true);
const changeOpType = () => {
    window.ipcRenderer.send('loginOrRegister', !isLogin.value)
    isLogin.value = !isLogin.value
    nextTick(() => {
        formDataRef.value.resetFields()
        formData.value = {}
        cleanVerify()
        changeCaptcha();

    })
}



// 获取验证码
const captchaImg = ref(''); // 用于存储验证码图片的Base64编码
//const captchaKey = ref(''); // 用于存储验证码的唯一标识符

// 获取验证码
const changeCaptcha = async () => {
    try {
        // 使用 proxy 访问 Axios 实例
        const response = await getCaptcha();
        captchaImg.value = `${response.data.captchaImg}`;
        formData.value.captchaKey = response.data.captchaKey; // 设置captchaKey
        console.log("存到captchaKey:" ,formData.value.captchaKey);
        console.log(response.data.captchaKey);
    } catch (error) {
        console.error('获取验证码失败:', error);
    }
}
changeCaptcha();

const showLoading = ref(false);
const errorMsg = ref(null)
const submit = async () => {
    cleanVerify();

    if (!checkValue('checkEmail', formData.value.email, '请输入正确的邮箱')) {
        return
    }
    if ((!isLogin.value && !checkValue(null, formData.value.nickName, '请输入昵称') )){
        return
    }
    if (
        !checkValue('checkPassword', formData.value.password, '密码只能是数字、字母、特殊字符6～18位')) {
            return
    }
    if ((!isLogin.value && formData.value.password != formData.value.confirmPassword )) {
        errorMsg.value = '两次输入的密码不一致'
        return
    }
    if ((!isLogin.value && !checkValue(null, formData.value.code, '请输入验证码') )){
        return
    }
    
    // showLoading.value = true;
    try {
        let res;
        if (isLogin.value) {
            showLoading.value = true;
            // const enPassword = md5(formData.value.password).toString();
            // TODO 校验有问题密码错误但能在报错的同时进入页面
            res = await login({
                email: formData.value.email,
                password: formData.value.password,
            });
            console.log("输入的邮箱是：",formData.value.email)
            console.log("输入的密码是：", formData.value.password)
            // console.log("加密密码是：", enPassword)
            if (res.code === 401) {
                errorMsg.value = '邮箱或密码错误';
                console.log("登录失败",errorMsg.value)
                return;

            }
            console.log("登录成功！！")
            console.log(res)
            // 检查 response 是否包含 userInfo 并存入 store
            if ( res && res.data && res.data.userInfo ) {
                userStore.setLoginStatus(true);
                userStore.setUserInfo(res.data.userInfo);

                if (res.data.token) {
                    localStorage.setItem('token',res.data.token);
                    console.log("Token已保存到localStorage：", res.data.token)
                } else {
                    console.error("登录成功，但未收到 token！")
                }

                console.log("登录信息和用户信息都保存了");
            } else {
                console.error("登录成功，但未收到用户信息！");
            }
            // 在提交成功后的代码中添加
            console.log("登录状态:", userStore.isLogin);
            console.log("用户信息:", userStore.userInfo);
            // TODO 登录后进入主页面
            router.push('/main')

            const screenwidth = window.screen.width
            const screenHeight = window.screen.height
            window.ipcRenderer.send('openChat',{
                email: formData.value.email,
                token: res.data.toke,
                userId: res.data.userInfo.userId,
                nickName: res.data.userInfo.nickName,
                screenwidth: screenwidth,
                screenHeight: screenHeight
            })

            console.log("成功进入主页!!")
        }else {
            await register({
                email: formData.value.email,
                nickName: formData.value.nickName,
                password: formData.value.password,
                confirmPassword: formData.value.confirmPassword,
                code: formData.value.code,
                captchaKey: formData.value.captchaKey,
            });
            console.log("注册成功!!")
            changeOpType() //回到登录页
        }

    } catch(error) {
        
        // errorMsg.value = error.response?.data?.message;
        
        
        changeCaptcha() //更新验证码
    } finally {
        showLoading.value = false;
    }

    
}

const checkValue = (type, value, msg) => {
    if (proxy.Utils.isEmpty(value)) {
        errorMsg.value = msg
        return false
    }
    if (type && !proxy.Verify[type](value)) {
        errorMsg.value = msg
        return false
    }
    return true
}
const cleanVerify = () => {
    errorMsg.value = null
}



</script>
  
<style lang="scss" scoped>
.email-select {
    width: 250px;
}
.loading-panel {
    height: calc(100vh - 32px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
        width: 300px;
    }
}
.login-panel {
    background: #fff;
    border-radius: 3px;
    border: 1px solid #ddd;
    .title {
        height: 30px;
        padding: 25px 0px 0px 10px;
    }

    .login-form {
        padding: 10px 15px 45px 10px;
        :deep(.el-input__wrapper) {
            border: none ; 
            box-shadow: none ; 
            margin-left: -80px;
        }
        :deep(.el-form-item__error) {
            margin-left: -70px;
            margin-top: 2px;
        }
        .el-form-item {
            border-bottom: 1px solid #ddd;
        }

        .email-panel {
            align-items: center;
            width: 100%;
            display: flex;
            .input {
                flex: 1;
            }
            .icon-down {
                margin-left: 3px;
                width: 16px;
                cursor: pointer;
                border: none;
            }
        }
        .error-msg {
            line-height: 30px;
            height: 30px;
            color: #fb7373;
        }
        .check-code-panel {
            display: flex;
            .check-code {
                cursor: pointer;
                width: 120px;
                margin-left: 5px;
            }
        }

        .login-bth {
            margin-top: 20px;
            width: 100%;
            background: #07c160;
            height: 36px;
            font-size: 16px;
        }
        .bottom-link {
            margin-top: 15px;
            text-align: right;
        }
    }
}


</style>
  