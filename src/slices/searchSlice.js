import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchedTerm: "",
  searchResult: [],
};

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (search, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_MUSIC_API_URL}/label?query=${search}&limit=10&offset=0`,
        {
          headers: {
            "User-Agent": `songifyapp5/1.0.0 ( ${process.env.REACT_APP_MUSIC_SERVICE_EMAIL} )`,
            "Content-Type": "application/json",
          },
        }
      );
      return data.labels ? data.labels : [];
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [getSearchResult.pending]: (state) => {
      state.isLoading = true;
    },
    [getSearchResult.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchResult = action.payload;
    },
    [getSearchResult.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default searchSlice.reducer;
