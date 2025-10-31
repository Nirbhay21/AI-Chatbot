import { createSlice } from "@reduxjs/toolkit";

import { dummyUserData } from "../../assets/dummyData/assets";

interface UserState {
  _id: string,
  name: string,
  email: string,
  password: string
  credits: number,
}

const initialState: UserState | null = dummyUserData;

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {

  }
});

// export const { } = userSlice.actions;
export default userSlice.reducer;