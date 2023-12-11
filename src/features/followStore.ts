import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followings: [],
  followers: [],
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    saveFollowings(state, action) {
      state.followings = action.payload;
    },
    saveFollowers(state, action) {
      state.followers = action.payload;
    },
    clearFollowings(state) {
      state.followings = [];
    },
    clearFollowers(state) {
      state.followers = [];
    },
  },
});

export const { saveFollowings, saveFollowers, clearFollowings, clearFollowers } =
  followSlice.actions;

export default followSlice.reducer;
