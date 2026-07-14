import { createSlice } from '@reduxjs/toolkit';

export const crmSlice = createSlice({
  name: 'crm',
  initialState: {
    formData: {
      hcpName: '',
      interactionType: 'Meeting',
      topicsDiscussed: '',
      sentiment: 'Neutral',
    },
    chatHistory: [],
  },
  reducers: {
    updateForm: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
  },
});

export const { updateForm, addChatMessage } = crmSlice.actions;
export default crmSlice.reducer;
