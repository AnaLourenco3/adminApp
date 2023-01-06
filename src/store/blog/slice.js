import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blog: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlogSuccess: (state, action) => {
      state.blog = { ...action.payload };
    },
    updateBlogContentDetails: (state, action) => {
      state.blog = action.payload;
    },
    imagesBlogPostSuccess: (state, action) => {
      state.blog.blogImages.push(action.payload);
    },

    updateMainImage: (state, action) => {
      state.blog.mainImageUrl = action.payload;
    },

    imageBlogDeleteSuccess: (state, action) => {
      const imageBlogId = action.payload;
      state.blog.blogImages = state.blog.blogImages.filter(
        (i) => i.id !== imageBlogId
      );
    },
  },
});

// Action creators are generated for each case reducer function
// as we add cases to our reducer we will also export the corresponding actions
export const {
  // blogPostSuccess,
  // fetchBlogsSuccess,
  fetchBlogSuccess,
  imagesBlogPostSuccess,
  // blogDeleteSuccess,
  fetchImagesSuccess,
  imageBlogDeleteSuccess,
  updateBlogContentDetails,
  updateMainImage,
} = blogSlice.actions;

export default blogSlice.reducer;
