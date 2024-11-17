<template>
  <Layout>
    <template #left-content>
      <div class="drag-panel drag"></div>
      <div class="top-search">
          <el-input clearable placeholder="搜索" v-model="searchKey" size="">
            <template #suffix>
              <span class="iconfont icon-search"></span>
            </template>
          </el-input>
      </div>
      <div class="contact-list">
        <template v-for="item in partList">
          <div class="part-title">{{ item.partName }}</div>
          <div class="part-list">
            <div 
            v-for="sub in item.children"
            :class="['part-item', sub.path == route.path ? 'active': '']"
            @click="partJump(sub)"
            >
            <div :class="['iconfont', sub.icon]" :style="{ background: sub.iconBgColor }"></div>
            <div class="text">{{ sub.name }}</div>
          </div>
          <template v-if="item.contactData && item.contactData.length > 0">
              <div 
                v-for="contact in item.contactData"
                :key="contact[item.contactId]"
                :class="['part-item', contact[item.contactId] == route.query.contactId ? 'active' : '']"
                @click="contactDetail(contact, item)"
              >
                <Avatar :userId="contact[item.contactId]" :width="35"></Avatar>
                <!-- <div class="text">{{ contact[item.contactName] }}</div> -->
                <div class="text">{{ contact.nickName }}</div> 
              </div>
            </template>
          <template v-if="item.contactData && item.contactData.length == 0">
            <div class="no-data">
              {{ item.emptyMsg }}
            </div>
          </template>
        </div>
        </template>
      </div>
    </template>
    <template #right-content>
      <div class="title-panel drag">{{ rightTitle }}</div>
      <router-view v-slot="{ Component }">
        <component :is="Component" ref="componentRef"></component>
      </router-view>
    </template>
  </Layout>
</template>

<script setup>
import Avatar  from '../../components/Avatar.vue';
import Layout from '../../components/Layout.vue';
import { loadContacts } from '../../api/Contact'
import { ref, reactive, getCurrentInstance, nextTick, onMounted ,watch,onUnmounted} from "vue"
const { proxy } = getCurrentInstance();

import { useRouter, useRoute } from "vue-router"
import { userContactStateStore } from '@/stores/contactStateStore';
const contactStateStore = userContactStateStore

const router = useRouter()
const route = useRoute()

const searchKey = ref()
const search = () => {

}
 
const partList = ref([
  {
    partName: '新朋友',
    children: [
      {
        name: '搜好友',
        icon: 'icon-search',
        iconBgColor: '#fa9d3b',
        path: '/contact/search'
      },
      {
        name: '新的朋友',
        icon: 'icon-plane',
        iconBgColor: '#08bf61',
        path: '/contact/contactNotice',
        showTitle: true,
        countKey: 'contactApplyCount'
      },
    ]
  },
  {
    partName: '我的群聊',
    children: [
      {
        name: '新建群聊',
        icon: 'icon-add-group',
        iconBgColor: '#1485ee',
        path: '/contact/createGroup'
      },
    ],
    contactId: 'groupId',
    contactName: 'groupName',
    showTitle: true,
    contactData: [],
    contactPath: '/contact/groupDetail'
  },
  {
    partName: '我加入的群聊',
    contactId: 'contactId',
    contactName: 'contactName',
    showTitle: true,
    contactData: [],
    contactPath: '/contact/groupDetail',
    emptyMsg: '暂未加入群聊'
  },
  {
    partName: '我的好友',
    children: [],
    contactId: 'contactId',
    contactName: 'nickName',
    contactData: [],
    contactPath: '/contact/userDetail',
    emptyMsg: '暂未好友'
  }
])

const rightTitle = ref()

const partJump = (data) => {
  if (data.showTitle) {
    rightTitle.value = data.name
  } else {
    rightTitle.value = null
  }

  // TODO 处理联系人好友申请数量已读
  router.push(data.path)
  
}

//加载联系人
const loadContact = async (contactType) => {
  try {
    const token = localStorage.getItem('token');
    console.log("获取到的token：", token);
    const result = await loadContacts({
      token, contactType
    })
    console.log("获取到的联系人用户：",result.data)
    if (result.code == 200) {
      partList.value[3].contactData = result.data
      console.log("更新后的：",partList.value[3].contactData)
    } else {
      proxy.Message.error('加载联系人错误');
    }

  } catch(error) {
    proxy.Message.error('加载联系人错误');
    console.error("加载联系人错误：", error);
  }
    
}

// TODO 加载群组
const loadMyGroup = async () => {

}

const contactDetail = (contact, part) => {
  if (part.showTitle) {
    rightTitle.value = contact[part.contactName]
  } else {
    rightTitle.value = null
  }
  router.push({
    path: part.contactPath,
    query: {
      contactId: contact[part.contactId]
    }
  })
}

// 全局监听 刷新联系人列表
onMounted(() => {
  loadContact("用户");
  window.addEventListener('refreshContact', () => {
    loadContact('用户');
  });
})

onUnmounted(() => {
  window.removeEventListener('refreshContact', () => {
    loadContact('用户');
  });
});

// watch(
//   () => contactStateStore.contactReload,
//   (newVal) => {
//     if (!newVal) {
//       return
//     }
//     switch (newVal) {
//       case 'USER':
//       case 'GROUP':
//         loadContact(newVal)
//         break
//     }
//   }, 
//   // TODO 需要加入群组
  
//   { immediate: true, deep: true }
// );




</script>

<style lang="scss" scoped>
.drag-panel {
  height: 25px;
  background: #f7f7f7;
}
.top-search {
  padding: 0px 10px 9px 10px;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 12px;
  }
}
.contact-list {
  border-top: 1px solid #ddd;
  height: calc(120vh - 50vh);
  overflow: hidden;
  &:hover {
    overflow: auto;
  }

  .part-title {
    color: #515151;
    padding-left: 10px;
    margin-top: 10px;
  }
  .part-list {
    border-bottom: 1px solid #d6d6d6;
    .part-item {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      position: relative;
      &:hover {
        cursor: pointer;
        background: #d6d6d7;
      }
      .iconfont {
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #fff;
      }
      .text {
        flex: 1;
        color: #000000;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .no-data {
      text-align: center;
      font-size: 12px;
      color: #9d9d9d;
      line-height: 30px;
    }
    .active {
      background: #c4c4c4;
      &:hover {
        background: #c4c4c4;
      }
    }
  }
}
.title-panel {
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 18px;
  color: #000000;
}
</style>
