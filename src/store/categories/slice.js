import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoriesWithData: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoriesSuccess: (state, action) => {
      state.categories = [...action.payload];
    },
    fetchCategoriesWithDataSuccess: (state, action) => {
      state.categoriesWithData = [...action.payload];
    },
    categoriesPostSuccess: (state, action) => {
      state.categories.push({ ...action.payload });
    },
    updateCategoryDetails: (state, action) => {
      const { id, quote, description } = action.payload;
      const category = state.categories.find((category) => category.id === id);
      if (category) {
        category.quote = quote;
        category.description = description;
      }
      const categoryWithData = state.categoriesWithData.find(
        (category) => category.id === id
      );
      if (categoryWithData) {
        categoryWithData.quote = quote;
        categoryWithData.description = description;
      }
    },
  },
});

// Action creators are generated for each case reducer function
// as we add cases to our reducer we will also export the corresponding actions
export const {
  fetchCategoriesSuccess,
  categoriesPostSuccess,
  fetchCategoriesWithDataSuccess,
  updateCategoryDetails,
} = categorySlice.actions;

export default categorySlice.reducer;
