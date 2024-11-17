import request from '@/utils/Request'

export const loadContacts = async (data) => {
    return await request.post('/userContact/loadContact',data)
}