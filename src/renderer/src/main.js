import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import axios from '@/utils/Request.js'
import * as Pinia from 'pinia'

import 'element-plus/dist/index.css'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.css'
import '@/assets/base.scss'

import router from '@/router'
import Utils from '@/utils/Utils'
import Verify from '@/utils/Verify'
import Message from '@/utils/Message.js'

import Layout from '@/components/Layout.vue'
import WinOp from '@/components/WinOp.vue'
import ContentPanel from '@/components/ContentPanel.vue'
import ShowLocalImage from '@/components/ShowLocalImage.vue'
import Dialog from '@/components/Dialog.vue'
import Avatar from '@/components/Avatar.vue'
import AvatarBase from '@/components/AvatarBase.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(ElementPlus)
app.use(Pinia.createPinia())

app.component("Layout", Layout)
app.component("WinOp", WinOp)
app.component("ContentPanel", ContentPanel)
app.component("ShowLocalImage", ShowLocalImage)
app.component("Dialog", Dialog)
app.component("Avatar",Avatar)
app.component("AvatarBase",AvatarBase)

app.config.globalProperties.$http = axios; 
app.config.globalProperties.Utils = Utils
app.config.globalProperties.Verify = Verify
app.config.globalProperties.Message = Message