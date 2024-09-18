import { createSlice } from "@reduxjs/toolkit";
import {
    addEventFavorite,
  addFavoriteWorkshop,
  removeEventFavorite,
  removeFavoriteWorkshop,
} from "../actions/favorite.actions";
import { getUser } from "../actions/user.actions";

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
          (workshop) => workshop !== action.payload
        );
      })
      .addCase(removeFavoriteWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addEventFavorite
      .pending, (state) => {
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
          (event) => event !== action.payload
        );
      })
      .addCase(removeEventFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favoriteWorkshops = action.payload.favoriteWorkshops || [];
        state.favoriteEvents = action.payload.favoriteEvents || [];
      });
  },
});

export default favoriteSlice.reducer;
