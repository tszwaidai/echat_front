<template>
  <ContentPanel>
    <div class="search-form">
        <el-input 
        clearable 
        placeholder="请输入用户ID或群组ID" 
        v-model="contactId"
        size="large"
        @keydown.enter="search">
    </el-input>
    <div class="search-bth iconfont icon-search" @click="search"></div>
    </div>
    <div v-if="searchResult && Object.keys(searchResult).length > 0" class="search-result-panel">
        <div class="search-result">
            <!-- <span class="contact-type">{{ contactTypeName }}</span> -->
             <!-- 先写死 -->
            <span class="contact-type">
                {{ searchResult.contactType === 0 ? '用户' : '群组' }}
            </span>
            <UserBaseInfo
            :userInfo="searchResult"
 
            >
            </UserBaseInfo>
        </div>
        <div class="op-btn" v-if="searchResult.contactId" >
            <el-button
            type="primary"
            v-if="
            searchResult.status == null ||
            searchResult.status == 0 ||
            searchResult.status == 2 ||
            searchResult.status == 3 ||
            searchResult.status == 4
            "
            @click="applyContact"
            >{{ searchResult.contactType == 0 ? '添加到联系人' : '添加到群组' }}</el-button>
            <el-button type="primary" v-if="searchResult.status == 1" @click="sendMessage">
                发消息
            </el-button>
            <span v-if="searchResult.status == 5 || searchResult.status == 6">对方拉黑了你</span>
        </div>
    </div>
    <div v-if="Object.keys(searchResult).length === 0" class="no-data">没有搜索到任何结果</div>
  </ContentPanel>
  <SearchAdd ref="searchAddRef" @reload="resetForm"></SearchAdd>
</template>

<script setup>
import SearchAdd from './SearchAdd.vue';
import ContentPanel from '../../components/ContentPanel.vue';
import { ref, reactive, getCurrentInstance, nextTick, computed } from "vue"
import { getSearch } from '../../api/Search';
import { useUserStore } from '@/stores/userStore'
import UserBaseInfo from '../../components/UserBaseInfo.vue'
const { proxy } = getCurrentInstance();

const userStore = useUserStore();
// const contactTypeName = computed(()=> {
//     if (userStore.)
// })


const searchAddRef = ref();
const applyContact = () => {
    searchAddRef.value.show(searchResult.value)
}
const contactId = ref();
const searchResult = ref({

})
// TODO 接 search API
const search = async ()=> {
    if (!contactId.value) {
        proxy.Message.warning('请输入用户ID或群组ID')
        return 
    }
    try {
        const data = { contactId: contactId.value };  // 将数据包裹成对象
        console.log(data);  // 确保数据传递正确
        let result = await getSearch(data);  // 传递对象
        // console.log(contactId.value)
        console.log(result)
        if (result.code === 200) {
            searchResult.value = result.data
            console.log(searchResult.value)
            proxy.Message.success('查询成功');
        } else {
            searchResult.value = {}
        }
    } catch (error) {
        console.error('搜索失败:', error);
        proxy.Message.error('请求失败，请稍后再试');
    }
    

}

const resetForm = () => {
    searchResult.value = {}
    contactId.value = undefined
}


</script>

<style lang="scss" scoped>
.search-form {
    padding-top: 50px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    :deep(.el-input_wrapper) {
        border-radius: 4px 0px 0px 4px;
        border-right: none;
    }
    .search-bth {
        background: #07c160;
        color: #fff;
        line-height: 40px;
        width: 80px;
        text-align: center;
        border-radius: 0px 5px 5px 0px;
        cursor: pointer;
        &:hover {
            background: #0dd36c;
        }
    }
}
.no-data {
    padding: 30px 0px;
}
.search-result-panel {
    padding: 0px 20px 0px 20px;
    .search-result {
        padding: 30px 20px 20px 20px;
        background: #fff;
        border-radius: 5px;
        margin-top: 10px;
        position: relative;
        .contact-type {
            position: absolute;
            left: 0px;
            top: 0px;
            background: #2cb6fe;
            padding: 2px 5px;
            color: #fff;
            border-radius: 5px 0px 0px 0px;
            font-size: 12px;
        }
    }
    .op-btn {
        border-radius: 5px;
        margin-top: 10px;
        padding: 10px;
        background: #fff;
        text-align: center;
    }
}
</style>
