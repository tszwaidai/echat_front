<template>
  <div>
    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      width="400px"
      :showCancel="false"
      @close="dialogConfig.show = false"
    >
    <el-form
      :model="formData"
      :rules="rules"
      ref="formDataRef"
      @submit.prevent
    >
    <!--textarea输入-->
      <el-form-item label="" prop="">
        <el-input
          type="textarea"
          :rows="5"
          clearable
          placeholder="输入申请信息，更容易被通过"
          :maxlength="150"
          resize="none"
          show-word-limit
          v-model.trim="formData.applyInfo"
      ></el-input>
      </el-form-item>
    </el-form>
    </Dialog>

  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { searchAdd } from '../../api/SearchAdd';
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();

import { userContactStateStore } from '@/stores/contactStateStore';
const contactStateStore = userContactStateStore

const userStore = useUserStore()

const dialogConfig = ref({
  show: false,
  title: "提交申请",
  buttons: [
   {
    type: "primary",
    text: "确定",
    click: (e) => {
      submitApply()
    },
  },
 ],
});

const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};

const emit = defineEmits(['reload'])
const submitApply = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    const { contactId, applyInfo } = formData.value

    if (!token) {
      proxy.Message.error('Token或联系人ID缺失');
      return;
    }
    const result = await searchAdd({
      token,
      contactId,
      applyInfo
    });
    console.log(result)
    // TODO 后续需要修改成需要同意后加入
    if (result.code == 200) {
      proxy.Message.success('加入成功')
      window.dispatchEvent(new Event('refreshContact'));
    } else {
      proxy.Message.success('申请成功，等待对方同意')
    }
    dialogConfig.value.show = false
    emit('reload')


  }catch(error) {
    proxy.Message.error('申请失败，请重试');
  }
    
  
}

const show = (data) => {
    dialogConfig.value.show = true
    nextTick(()=> {
        formDataRef.value.resetFields();
        formData.value = Object.assign({}, data)
        formData.value.applyInfo = '我是' + userStore.userInfo.nickName
    })
}

defineExpose({
    show
})

</script>

<style lang="scss" scoped>
</style>
