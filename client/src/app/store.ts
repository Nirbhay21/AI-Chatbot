import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"
import themeReducer from "../features/theme/themeSlice"
import chatReducer from "../features/chat/chatSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    chat: chatReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;