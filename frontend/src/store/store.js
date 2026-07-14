import { configureStore } from '@reduxjs/toolkit';
import crmReducer from './crmSlice';

export default configureStore({
  reducer: {
    crm: crmReducer,
  },
});
