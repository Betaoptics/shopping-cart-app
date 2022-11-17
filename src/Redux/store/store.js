import { configureStore } from '@reduxjs/toolkit';
import storeDataSlice from '../featrures/storeDataSlice';

export default configureStore({
  reducer: {
    storeData: storeDataSlice,
  },
})