import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  gifResult: {},
};

const getGifByKeyword = createAsyncThunk(
  "gifs/getGifByKeyword",
  async (keyword, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GIF_API_URL}/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${keyword}&limit=5&offset=0&rating=g&lang=en`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const gifSlice = createSlice({
  name: "gif",
  initialState,
  extraReducers: {
    [getGifByKeyword.pending]: (state) => {
      state.isLoading = true;
    },
    [getGifByKeyword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.gifResult = action.payload;
    },
    [getGifByKeyword.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setSelectedResult } = gifSlice.actions;

export default gifSlice.reducer;
