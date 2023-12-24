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
    savePosts(state, action) {
      console.log("savePosts", action.payload);
      if (action.payload.length !== state.posts.length) {
        state.posts = action.payload;
      }
    },
    clearPosts(state) {
      state.posts = [];
    },
    likePost(state, action) {
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
    unlikePost(state, action) {
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
    commentPost(state, action) {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      // @ts-ignore
      post.comments.push(comment);
    },
  },
});

export const { savePosts, clearPosts, likePost, unlikePost, commentPost } =
  postSlice.actions;
export default postSlice.reducer;
