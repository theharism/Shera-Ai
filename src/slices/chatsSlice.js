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
      const { id, title,date } = action.payload;
      state.chats = [...state.chats, { id, title,date, messages: [] }];
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
      
      
    saveChats:async (state, action) => {
        try {
          console.log(state)
          const jsonValue = JSON.stringify(state)
          await AsyncStorage.setItem('chats', jsonValue)
        } catch (e) {
          // saving error
        }
      }
  },
});

export const { addChat, addMessage, saveChats } = chatSlice.actions;
export default chatSlice.reducer;
