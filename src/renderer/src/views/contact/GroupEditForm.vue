<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formDataRef"
    label-width="80px"
    @submit.prevent
  >
  <!--input输入-->
    <el-form-item label="群名" prop="groupName" style="margin-top: 10px;">
      <el-input 
        clearable 
        placeholder="请输入群名称" 
        v-model.trim="formData.groupName"
        style="width: 400px;"
        >
     </el-input>
    </el-form-item>
    <el-form-item label="封面" prop="avatarFile">
        <AvatarUpload
        v-model="formData.avatarFile"
        ref="avatarUploadRef"
        @coverFile="saveCover"
        >
        </AvatarUpload>
    </el-form-item>
    <el-form-item label="加入权限" prop="joinType" >
        <el-radio-group v-model="formData.joinType">
            <el-radio :label="1">管理员同意后加入</el-radio>
            <el-radio :label="0">直接加入</el-radio>
        </el-radio-group>      
    </el-form-item>
    <el-form-item label="公告" prop="groupNotice" >
        <el-input 
        clearable 
        placeholder="请输入群公告" 
        v-model.trim="formData.groupNotice"
        type="textarea"
        rows="5"
        maxlength="300"
        :show-word-limit="true"
        resize="none"
        style="width: 400px;"
        >
        </el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submit">
            {{ formData.groupId ? '修改群组': '创建群组'}}
        </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();
import { userContactStateStore } from '@/stores/contactStateStore';
const contactStateStore = userContactStateStore

const formData = ref({});
const formDataRef = ref();
const rules = {
    groupName: [{ required: true, message: "请输入群名称" }],
    joinType: [{ required: true, message: "请选择加入权限" }],
    avatarFile: [{ required: true, message: "请选择头像" }]
};


// TODO 创建群组和修改群组
const submit = async ()=> {
    formDataRef.value.validate(async (valid) => {
        if (!valid) {
            return
        }
        let params = {}
        Object.assign(params, formData.value)
        const result = await saveGroup ({

        })
    })
} 

</script>

<style lang="scss" scoped>
</style>
