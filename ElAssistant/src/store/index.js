import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './modules/notes.js'

// 生成store
export default configureStore({
	// 将所有子模块匹配值在这里
	reducer: {
		notes: notesReducer
	}
})
