import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  size: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      const { id, title } = action.payload;
      console.log(state);
      state.chats = [...state.chats, { id, title, messages: [] }];
      state.size += 1;
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
    getChatMessages: (state, action) => {
      const { chatId } = action.payload;
      console.log(chatId)
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        return chat.messages;
      }
      return [];
    },
  },
});

export const { addChat, addMessage, getChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
