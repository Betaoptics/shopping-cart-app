import { createSlice } from '@reduxjs/toolkit'

export const storeDataSlice = createSlice({
  name: 'storeData',
  initialState: {
    data: "",
  },
  reducers: {
    storedData: (state, action) => {
      state.data = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  storedData, 
} = storeDataSlice.actions

export default storeDataSlice.reducer