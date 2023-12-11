import { createSlice } from "@reduxjs/toolkit";

const TokenEmtpy = {
  token: "",
};

const tokenStore = createSlice({
  name: "token",
  initialState: TokenEmtpy,
  reducers: {
    saveToken: (state, action) => {
        state.token = action.payload;
    },
    removeToken: (state) => {
        state.token = "";
    }
  },
});

export const { saveToken, removeToken } = tokenStore.actions;
export default tokenStore.reducer;
