import serviceAxios from './index'
export const getAllNotes = async () => {
    const data = await serviceAxios.get('/notes/all')
    return data
}
export const updateDetail = async (key,newDetail) => {
    const ans = await serviceAxios.post('/notes/update',{key,newDetail})
    // return data
}