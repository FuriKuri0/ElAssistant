import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	allNotes:[],
	notesDetail:'',
	key:'',
	showDetail:false,
	label:''
}
// 定义切片
const countSlice = createSlice({
	name: 'notes', 
	initialState: { 
		count: 0
	},
	reducers: { // 一个个的action操作
		setNotes(state, action){
			state.allNotes = action.payload
		},
		changeStatus(state, action){
			state.showDetail = action.payload
		},
		changeDetail(state, action){
			state.notesDetail = action.payload
		},
		changeKey(state, action){
			state.key = action.payload
		},
		changeLabel(state, action){
			state.label = action.payload
		},
	}
})



export const {changeLabel:changeLabelAction,changeKey:changeKeyAction,changeDetail:changeDetailAction, changeStatus: changeStatusAction, setNotes: setNotesAction } = countSlice.actions

export default countSlice.reducer

