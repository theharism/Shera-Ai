import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      const { id } = action.payload;
      console.log(state)
      state.chats = [...state.chats, { id, messages: [] }];
    },
    addMessage: (state, action) => {
        const { chatId, id, message, sender } = action.payload;
        const chat = state.chats.find((chat) => chat.id === chatId);
        if (chat) {
          if (!chat.messages) {
            chat.messages = [];
          }
          chat.messages.push({ id: id, message, sender });
        }
      },
    getChatsSize: (state) => state.chats ? state.chats.length : 0,
  },
});

export const { addChat, addMessage, getChatsSize } = chatSlice.actions;
export default chatSlice.reducer;
