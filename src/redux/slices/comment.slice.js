import { createSlice } from "@reduxjs/toolkit";
import {
  createEventComment,
  createWorkshopComment,
  getEventComments,
  getUserComments,
  getWorkshopComments,
} from "../actions/comment.actions";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    loading: true,
    workshopComments: [],
    eventComments: [],
    userComments: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createWorkshopComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkshopComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments.push(action.payload);
      })
      .addCase(createWorkshopComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getWorkshopComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkshopComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = action.payload;
      })
      .addCase(getWorkshopComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createEventComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEventComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eventComments.push(action.payload);
      })
      .addCase(createEventComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getEventComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eventComments = action.payload;
      })
      .addCase(getEventComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUserComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userComments = action.payload;
      })
      .addCase(getUserComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
