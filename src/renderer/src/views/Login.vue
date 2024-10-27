<template>
    <div class="login-panel">
      <div class="title drag">EasyChat</div>
      <div class="login-form">
        <div class="error-msg"></div>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          label-width="80px"
          @submit.prevent
        >
        <!--input输入-->
        <el-form-item prop="email" >
            <el-input size="large" clearable placeholder="请输入邮箱" v-model.trim="formData.email">
                <template #prefix>
                    <span class="iconfont icon-email"></span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password" >
            <el-input size="large" show-password clearable placeholder="请输入密码" v-model.trim="formData.password">
                <template #prefix>
                    <span class="iconfont icon-password"></span>
                </template>
            </el-input>
        </el-form-item>
        <div>
            <el-button type="primary" class="login-bth" @click="">登录</el-button>
        </div>
        <div class="bottom-link">没有账号？</div>
        </el-form> 
      </div>  
    </div>
  </template>
  
<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()

const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};

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
        padding: 10px 15px 85px 10px;
        :deep(.el-input__wrapper) {
            border: none ; 
            box-shadow: none ; 
            margin-left: -80px;
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
            // margin-left: 7.5px;
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
  