<template>
  <ContentPanel>
    <div class="user-info">
        <UserBaseInfo :userInfo="userInfo"></UserBaseInfo>
    </div>
  </ContentPanel>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
import UserBaseInfo from "../../components/UserBaseInfo.vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const userInfo = ref({})
const loadUserDetail = async () => {
    const result = await getContactUserInfo({
         
    })
}

</script>

<style lang="scss" scoped>
.user-info {
    position: relative;
    .more-op {
        position: absolute;
        right: 0px;
        top: 20px;
        .icon-more {
            color: #9e9e9e;
            &:hover {
                background: #dddddd;
            }
        }
    }
}

.part-item {
    display: flex;
    border-bottom: 1px solid #eaeaea;
    padding: 20px 0px;
    .part-title {
        width: 60px;
        color: #9e9e9e;
    }
    .part-content {
        flex: 1;
        margin-left: 15px;
        color: #161616;
    }
}

.send-message {
    width: 80px;
    margin: 0px auto;
    text-align: center;
    margin-top: 20px;
    color: #7d8cac;
    padding: 5px;
    .icon-chat2 {
        font-size: 23px;
    }
    .text {
        font-size: 12px;
        margin-top: 5px;
    }
    &:hover {
        background: #9e9e9e;
        cursor: pointer;
    }
}

</style>
