import request from '@/utils/Request'

export const getSearch = async (contactId) => {
    return await request.post('/userContact/search',contactId)
}