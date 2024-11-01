import request from '@/utils/Request'

export const getCaptcha = async () => {
    return await request.get('/userInfo/captcha')
}
export const login = async (data) => {
    return await request.post('/userInfo/login', data)
}
export const register = async (data) => {
    return await request.post('/userInfo/register', data)
}