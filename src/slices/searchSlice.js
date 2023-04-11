import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchResult: [],
  selctedResult: {},
};

export const getSelectedResult = createAsyncThunk(
  "search/getSelectedResult",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_MUSIC_API_URL}/recording/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (search, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_MUSIC_API_URL}/recording?query=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.recordings;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelectedResult: (state, action) => {
      state.selctedResult = action.payload;
    },
  },
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
    [getSelectedResult.pending]: (state) => {
      state.isLoading = true;
    },
    [getSelectedResult.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.selctedResult = action.payload;
    },
    [getSelectedResult.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setSelectedResult } = searchSlice.actions;

export default searchSlice.reducer;
