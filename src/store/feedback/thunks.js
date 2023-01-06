import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import {
  feedbackDeleteSuccess,
  feedbackPostSuccess,
  fetchFeedbacksSuccess,
} from "./slice";
import { showMessageWithTimeout } from "../appState/thunks";

export const fetchFeedbacks = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());
      const response = await axios.get(`${apiUrl}/feedbacks`);
      console.log("this is from /feedback", response.data);
      dispatch(fetchFeedbacksSuccess(response.data.feedbacks));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

export const deleteFeedback = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      // const { token } = getState().user;
      await axios.delete(`${apiUrl}/feedbacks/${id}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      });

      // dispatch(
      //   setMessage({
      //     variant: "success",
      //     dismissable: true,
      //     text: "Your feedback has been deleted",
      //   })
      // );
      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          "Your feedback has been deleted"
        )
      );
      dispatch(feedbackDeleteSuccess(id));
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

export const postFeedback = (image) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const result = await axios.post(`${apiUrl}/feedbacks`, {
        image: image,
      });

      dispatch(
        setMessage({
          variant: "success",
          dismissable: true,
          text: "Your feedback has been deleted",
        })
      );
      dispatch(feedbackPostSuccess(result.data.feedback));
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
