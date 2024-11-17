import request from '@/utils/Request'

export const searchAdd = async (data) => {
    return await request.post('/userContact/applyAdd',data)
}