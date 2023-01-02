import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import {
  categoriesPostSuccess,
  fetchCategoriesSuccess,
  fetchCategoriesWithDataSuccess,
} from "./slice";

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());
      const response = await axios.get(`${apiUrl}/categories`);
      console.log("this is from /categories", response.data);
      dispatch(fetchCategoriesSuccess(response.data.categories));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

export const fetchBlogDataPerCategory = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());
      const response = await axios.get(`${apiUrl}/categories/${id}/blogs`);
      console.log("this is from /categories with blogs", response.data);
      dispatch(
        fetchCategoriesWithDataSuccess(response.data.categoriesWithData)
      );
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

export const addNewBlogPost = (id, date, title, text, mainImage) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());

      const response = await axios.post(`${apiUrl}/categories/${id}`, {
        date,
        title,
        text,
        mainImage,
      });
      dispatch(
        setMessage({
          variant: "success",
          dismissable: true,
          text: "You just added a new post",
        })
      );
      dispatch(appDoneLoading());

      dispatch(categoriesPostSuccess(response.data.newBlogPost));
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
