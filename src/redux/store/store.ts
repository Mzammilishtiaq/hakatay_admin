import { configureStore } from '@reduxjs/toolkit';
import DashboardSlice from '../slice/DashboardSlice/DashboardSlice'
import MessageSlice from '../slice/MessageSlice/MessageSlice'

export const store = configureStore({
  reducer: {
    dashboard: DashboardSlice,
    message: MessageSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch