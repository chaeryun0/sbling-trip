import { User } from '@models/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    resetUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
