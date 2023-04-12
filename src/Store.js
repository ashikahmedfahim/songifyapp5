import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import gifReducer from "./slices/gifSlice";
import favouriteReducer from "./slices/favouriteSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    gif: gifReducer,
    favourite: favouriteReducer,
  },
});
