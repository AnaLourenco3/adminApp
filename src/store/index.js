import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import feedbackReducer from "./feedback/slice";
import categoryReducer from "./categories/slice";
import blogReducer from "./blog/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    feedback: feedbackReducer,
    category: categoryReducer,
    blog: blogReducer,
  },
});
