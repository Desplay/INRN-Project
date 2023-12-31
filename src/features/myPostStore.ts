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
  name: "myPosts",
  initialState,
  reducers: {
    saveMyPosts(state, action) {
      state.posts = action.payload;
    },
    clearMyPosts(state) {
      state.posts = [];
    },
    likeMyPost(state, action) {
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
    unlikeMyPost(state, action) {
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
    commentMyPost(state, action) {
      const comment = action.payload;
      const { post_id } = comment;
      const post = state.posts.find((post) => post.id === post_id);
      // @ts-ignore
      post?.comments.push(comment);
    },
  },
});

export const {
  saveMyPosts,
  clearMyPosts,
  likeMyPost,
  unlikeMyPost,
  commentMyPost,
} = postSlice.actions;

export default postSlice.reducer;
