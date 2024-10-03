import { createSlice } from "@reduxjs/toolkit";
import {
  addEventFavorite,
  addFavoriteWorkshop,
  getFavoriteEvents,
  getFavoriteWorkshops,
  removeEventFavorite,
  removeFavoriteWorkshop,
} from "../actions/favorite.actions";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    loading: false,
    error: null,
    favoriteWorkshops: [],
    favoriteEvents: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteWorkshops.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavoriteWorkshops.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favoriteWorkshops = action.payload;
      })
      .addCase(getFavoriteWorkshops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getFavoriteEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavoriteEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favoriteEvents = action.payload;
      })
      .addCase(getFavoriteEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addFavoriteWorkshop.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavoriteWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favoriteWorkshops.push(action.payload);
      })
      .addCase(addFavoriteWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(removeFavoriteWorkshop.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavoriteWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favoriteWorkshops = state.favoriteWorkshops.filter(
          (workshop) => workshop._id !== action.payload._id
        );
      })
      .addCase(removeFavoriteWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addEventFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEventFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favoriteEvents.push(action.payload);
      })
      .addCase(addEventFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(removeEventFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeEventFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favoriteEvents = state.favoriteEvents.filter(
          (event) => event._id !== action.payload._id
        );
      })
      .addCase(removeEventFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default favoriteSlice.reducer;
