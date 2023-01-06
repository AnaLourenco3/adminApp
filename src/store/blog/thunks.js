import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import {
  fetchBlogSuccess,
  imageBlogDeleteSuccess,
  imagesBlogPostSuccess,
  updateBlogContentDetails,
  updateMainImage,
} from "./slice";

export const fetchBlogsData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());
      const response = await axios.get(`${apiUrl}/blogs`);
      console.log("this is from /blogs", response.data);
      // dispatch(fetchBlogsSuccess(response.data.blogs));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

export const fetchBlogDataById = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());
      const response = await axios.get(`${apiUrl}/blogs/${id}`);
      console.log("this is from /blog", response.data);
      dispatch(fetchBlogSuccess(response.data.blog));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

export const addNewBlogPost = (
  categoryId,
  date,
  title,
  text,
  mainImage,
  videoUrl
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());

      const response = await axios.post(`${apiUrl}/blogs`, {
        categoryId,
        date,
        title,
        text,
        mainImage,
        videoUrl,
      });
      console.log(response.data.newBlogPost);
      dispatch(appDoneLoading());
      // dispatch(blogPostSuccess(response.data.newBlogPost));
      dispatch(
        setMessage({
          variant: "success",
          dismissable: true,
          text: "You added a blog post",
        })
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      // const { token } = getState().user;
      await axios.delete(`${apiUrl}/blogs/${id}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      });

      // dispatch(blogDeleteSuccess(id));
      dispatch(appDoneLoading());
      dispatch(
        setMessage({
          variant: "success",
          dismissable: true,
          text: "You deleted a blog post",
        })
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const editContentDetails = (
  id,
  categoryId,
  categoryName,
  date,
  title,
  text,
  videoUrl
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());

      const response = await axios.put(`${apiUrl}/blogs/${id}`, {
        categoryId,
        date,
        title,
        text,
        videoUrl,
      });

      dispatch(
        updateBlogContentDetails({
          ...response.data.blogData,
          category: { id: categoryId, name: categoryName },
        })
      );

      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

//replace main image blog

export const replaceMainImageBlog = (id, mainImage) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());

      const response = await axios.put(`${apiUrl}/blogs/${id}/main-image`, {
        mainImage,
      });

      dispatch(updateMainImage(response.data.blogData.mainImageUrl));

      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

/// Images Blog ///

export const deleteImageBlog = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      // const { token } = getState().user;
      await axios.delete(`${apiUrl}/images/${id}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      });
      dispatch(imageBlogDeleteSuccess(id));
      dispatch(
        setMessage({
          variant: "success",
          dismissable: true,
          text: "Your image has been deleted",
        })
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const postBlogImages = (image, blogId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const result = await axios.post(`${apiUrl}/blogs/${blogId}/images`, {
        image: image,
      });
      console.log("this is from postBlogImages", result.data.image);
      dispatch(imagesBlogPostSuccess(result.data.image));

      dispatch(
        setMessage({
          variant: "success",
          dismissable: true,
          text: "Your images have been added",
        })
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};
