import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedbacks: [],
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    fetchFeedbacksSuccess: (state, action) => {
      state.feedbacks = [...action.payload];
    },
    updateFeedbacks: (state, action) => {
      state.feedbacks.feedbacks = action.payload;
    },
    feedbackPostSuccess: (state, action) => {
      state.feedbacks.push(action.payload);
    },
    feedbackDeleteSuccess: (state, action) => {
      const feedbackId = action.payload;
      state.feedbacks = state.feedbacks.filter((a) => a.id !== feedbackId);
    },
  },
});

// Action creators are generated for each case reducer function
// as we add cases to our reducer we will also export the corresponding actions
export const {
  fetchFeedbacksSuccess,
  feedbackPostSuccess,
  feedbackDeleteSuccess,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
