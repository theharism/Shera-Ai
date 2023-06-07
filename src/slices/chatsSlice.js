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
      state.chats = [...state.chats, { id, title, messages: [] }];
      state.size += 1;
    },
    // addMessage: (state, action) => {
    //   const { chatId, id, message, sender } = action.payload;
    //   console.log('FUCK',state)
    //   const chat = state.chats.find((chat) => chat.id === chatId);
    //   if (chat) {
    //     if (!chat.messages) {
    //       chat.messages = [];
    //     }
    //     chat.messages.push({ id: id, message, sender });
    //   }
    // },
    addMessage: (state, action) => {
        const { chatId, id, message, sender } = action.payload;
        const updatedChats = state.chats.map((chat) => {
          if (chat.id === chatId) {
            const updatedMessages = [...chat.messages, { id, message, sender }];
            return {
              ...chat,
              messages: updatedMessages,
            };
          }
          return chat;
        });
      
        return {
          ...state,
          chats: updatedChats,
        };
      },
      
      
    getChatMessages: (state, action) => {
      const { chatId } = action.payload;
      if (chatId) {
        const chat = state.chats.find((chat) => chat.id === chatId);
        if (chat) {
          return chat.messages;
        }
      }
      return [];
    },
  },
});

export const { addChat, addMessage, getChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
