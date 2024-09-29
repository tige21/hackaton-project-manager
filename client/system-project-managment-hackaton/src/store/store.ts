import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api'
export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch