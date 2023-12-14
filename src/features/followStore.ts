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
    clearFollow(state) {
      state.followers = initialState.followers;
      state.followings = initialState.followings;
    },
  },
});

export const { saveFollowings, saveFollowers, clearFollow } =
  followSlice.actions;

export default followSlice.reducer;
