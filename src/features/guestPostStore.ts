import { createSlice } from "@reduxjs/toolkit";

interface Comment {
  id: string;
  post_id: string;
  profile_id: string;
  reply_id: string;
  body: string;
  updated_at: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  likesCount: any;
  likes: any[];
  comments: Comment[];
}

const initialState = {
  posts: new Array<Post>(),
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    saveGuestPosts(state, action) {
      state.posts = action.payload;
    },
    clearGuestPosts(state) {
      state.posts = [];
    },
    likeGuestPost(state, action) {
      const { post_id, profile_id } = action.payload;
      state.posts.map((post) => {
        if (post.id === post_id) {
          post.likesCount = post.likesCount + 1;
          post.likes.push({
            __typename: "Like",
            profileIdLiked: profile_id,
          });
        }
        return post;
      });
    },
    unlikeGuestPost(state, action) {
      const { post_id, profile_id } = action.payload;
      state.posts.map((post) => {
        if (post.id === post_id) {
          post.likesCount = Number(post.likesCount) - 1;
          post.likes = post.likes.filter(
            (like) => like.profileIdLiked !== profile_id
          );
        }
        return post;
      });
    },
    commentGuestPost(state, action) {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      // @ts-ignore
      post.comments.push(comment);
    },
  },
});

export const { saveGuestPosts, clearGuestPosts, likeGuestPost, unlikeGuestPost, commentGuestPost } =
  postSlice.actions;
export default postSlice.reducer;
