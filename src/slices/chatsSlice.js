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
      console.log(action);
      const { id, title, date } = action.payload;
      state.chats = [...state.chats, { id, title, date, messages: [] }];
      state.size += 1;
    },
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
    setChatsData: (state, action) => {
      const { chats, size } = action.payload;

      if (chats && size) {
        state.chats = chats;
        state.size = size;
      }
    },
  },
});

export const { addChat, addMessage, setChatsData } = chatSlice.actions;
export default chatSlice.reducer;
