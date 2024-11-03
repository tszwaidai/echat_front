import { app, shell, BrowserWindow, ipcMain } from 'electron'

const NODE_ENV = process.env.NODE_ENV

import store from './store'

const onLoginOrRegister = (callback) => {
    ipcMain.on("loginOrRegister",(e,isLogin)=>{
        console.log("收到渲染进程消息:", isLogin);

        callback(isLogin)

        // mainWindow.setResizable(true)
        // if(isLogin){
        //   mainWindow.setSize(login_width,login_height)
        // }else {
        //   mainWindow.setSize(login_width, register_height)
        // }
        // mainWindow.setResizable(false)
      
    });
}

const onLoginSuccess = (callback) => {
    ipcMain.on("openChat",(e, config) => {
       
        store.initUserId(config.userId);
        console.log(config.userId)
        store.setUserData("token",config.token);
        // TODO 增加用户配置
        callback(config)
        // TODO 初始化ws连接
    });
}

// 置顶 放大 缩小
const winTitleOp = (callback) => {
    ipcMain.on("winTitleOp", (e, data) => {
        callback(e, data)
    })
}


export {
    onLoginOrRegister,
    onLoginSuccess,
    winTitleOp
}