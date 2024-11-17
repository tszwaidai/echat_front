<template>
  <div>
    <AvatarBase
        :userId="userId"
        :width="width"
        :borderRadius="borderRadius"
        :showDetail="false"
        v-if="userId == 'Uroot'"
    >
    </AvatarBase>
    <!-- 上面为机器人 下面为用户 -->
    <el-popover
        v-else
        :width="280"
        placement="right-start"
        :show-arrow="false"
        trigger="click"
        transition="none"
        :hide-after="0"
        @show="getContactInfo"
        ref="popoverRef"
    >
    <template #reference>
        <AvatarBase
            :userId="userId"
            :width="width"
            :borderRadius="borderRadius"
            :showDetail="false"
        ></AvatarBase>
    </template>
    <template #default>
        <div class="popover-user-panel">
            <UserBaseInfo :userInfo="userInfo"></UserBaseInfo>
            <!-- <div class="op-btn" v-if="userId !== localStorage.getItem('userInfo').userId">
                <el-button v-if="userInfo.contactStatus == 1" type="primary" @click="sendMessage">
                    发送消息</el-button>
                <el-button v-else type="primary" @click="addContact">加为好友</el-button>
            </div> -->
        </div> 
    </template>
    </el-popover>
  </div>
</template>

<script setup>
import UserBaseInfo from '../components/UserBaseInfo.vue'
import AvatarBase from '../components/AvatarBase.vue'
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();

import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()


const props = defineProps({
    userId: {
        type: String
    },
    width: {
        type: Number,
        default: 40
    },
    borderRadius: {
        type: Number,
        default: 0
    },
    showDetail: {
        type: Boolean,
        default: false
    }
})

// TODO 需要测试修改
const userInfo = ref({});
const getContactInfo = async() => {
    // userInfo.value.userId = props.userId;
    // const userInfo1 = localStorage.getItem('userInfo');
    // console.log("获取到的userInfo1是",userInfo1);
    // const parsedUserInfo = JSON.parse(userInfo1);
    // if (parsedUserInfo.userId == props.userId) {
    //     userInfo.value = parsedUserInfo;
    //     console.log("获取到的userInfo",userInfo.value);
    // } else {
    //     const result = await getContactInfo({
    //         showLoading: false
    //     });
    //     if (!result) {
    //         return
    //     }
    //     userInfo.value = Object.assign({}, result.data)
    // }
}

//TODO 发送消息
const sendMessage = () => {

}

//TODO 添加好友
const addContact = () => {

}

</script>

<style lang="scss" scoped>
</style>
