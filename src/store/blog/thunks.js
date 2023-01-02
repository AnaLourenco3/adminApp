import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import {
  blogDeleteSuccess,
  blogPostSuccess,
  fetchBlogsSuccess,
  fetchBlogSuccess,
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

export const addNewBlogPost = (categoryId, date, title, text, mainImage) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());

      const response = await axios.post(`${apiUrl}/blogs`, {
        categoryId,
        date,
        title,
        text,
        mainImage,
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
