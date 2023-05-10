import { createSlice } from '@reduxjs/toolkit'
import data from '../../localization/products.json';

export const storeDataSlice = createSlice({
  name: 'storeData',
  initialState: {
    data: data,
    count: 0,
    productInList: [0],
  },
  reducers: {
    storedData: (state, action) => {
      state.data = action.payload;
    },
    countOfProduct: (state, action) => {
      state.count = action.payload;
    },
    countOfProductInList: (state, action) => {
      state.countOfProductInList = [...state.productInList, action.payload];
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  storedData, 
  countOfProduct,
  countOfProductInList,
} = storeDataSlice.actions

export default storeDataSlice.reducer