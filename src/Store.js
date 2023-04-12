import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import gifReducer from "./slices/gifSlice";
import favouriteReducer from "./slices/favouriteSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    gif: gifReducer,
    favourite: favouriteReducer,
    theme: themeReducer,
  },
});
