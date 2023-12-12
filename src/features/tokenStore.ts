import { createSlice } from "@reduxjs/toolkit";

const TokenEmtpy = {
  token: "",
  profile_id: "",
};

const tokenStore = createSlice({
  name: "token",
  initialState: TokenEmtpy,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload.token;
      state.profile_id = action.payload.profile_id;
    },
    removeToken: (state) => {
      state.token = "";
      state.profile_id = "";
    },
  },
});

export const { saveToken, removeToken } = tokenStore.actions;
export default tokenStore.reducer;
