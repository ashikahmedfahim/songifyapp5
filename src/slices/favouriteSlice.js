import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFromFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
