import serviceAxios from './index'
export const getAllNotes = async () => {
    const data = await serviceAxios.get('/notes/all')
    return data
}
export const updateDetail = async (key,newDetail) => {
    const ans = await serviceAxios.post('/notes/update',{key,newDetail})
    // return data
}
export const deleteNote = async (key) => {
    const ans = await serviceAxios.get(`/notes/delete/${key}`)
    // return data
}
export const addNote = async (key,title,label) => {
    const ans = await serviceAxios.post(`/notes/add`,{key,title,label})
    // return data
}
export const query = async (keyword) => {
    const ans = await serviceAxios.post(`/notes/query`,{keyword})
    return ans
}