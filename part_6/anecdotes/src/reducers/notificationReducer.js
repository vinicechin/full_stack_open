import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    setNotification(_, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer