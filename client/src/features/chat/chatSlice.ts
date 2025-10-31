import { createSlice } from "@reduxjs/toolkit/react";

import { dummyChats } from "../../assets/dummyData/assets";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface ChatMessage {
  isImage: boolean;
  isPublished: boolean;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export interface Chat {
  _id: string;
  userId: string;
  userName: string;
  name: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
};

interface ChatState {
  chats: Chat[];
  selectedChat: Chat | null;
}

const initialState: ChatState = {
  chats: dummyChats,
  selectedChat: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<Chat>) {
      state.selectedChat = action.payload;
    }
  }
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;