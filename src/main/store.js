
const Store = require("electron-store")
const store = new Store();


let userId = null;
const initUserId = (_userId)=>{
    userId = _userId;
}

const getUserId = (_userId) => {
    return userId;
}

const setData = (key, value) => {
    // store.set(key, value);
    if (value === undefined || value === null) {
        store.delete(key);  // 如果 value 为 null 或 undefined，则删除该键
    } else {
        store.set(key, value);
    }
}

const getData = (key) => {
    return store.get(key);
}

const setUserData = (key, value) => {
    setData(userId + key, value);
}

const getUserData = (key) => {
    return getData(userId + key)
}

const deleteUserData = (key) =>{
    store.delete(userId + key);
}

export default {
    initUserId,
    getUserId,
    setData,
    getData,
    setUserData,
    getUserData,
    deleteUserData
}


// 动态导入 electron-store，以支持 ESM 语法
// let Store;
// (async () => {
//     const module = await import('electron-store');
//     Store = module.default;
// })();

// let store;
// let userId = null;

// // 初始化 store 和 userId
// const initUserId = (_userId)=>{
//     userId = _userId;
// }

// const getUserId = (_userId) => {
//     return userId;
// }

// const setData = (key, value) => {
//     store.set(key, value);
// }

// const getData = (key) => {
//     return store.get(key);
// }

// const setUserData = (key, value) => {
//     setData(userId + key, value);
// }

// const getUserData = (key) => {
//     return getData(userId + key)
// }

// const deleteUserData = (key) =>{
//     store.delete(userId + key);
// }

// export default {
//     initUserId,
//     getUserId,
//     setData,
//     getData,
//     setUserData,
//     getUserData,
//     deleteUserData
// }

