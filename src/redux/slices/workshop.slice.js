import { createSlice } from "@reduxjs/toolkit";
import {
  createWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  getWorkshop,
  updateWorkshop,
} from "../actions/workshop.actions";

const workshopSlice = createSlice({
  name: "workshops",
  initialState: {
    loading: true,
    workshops: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllWorkshops.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllWorkshops.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops = action.payload;
      })
      .addCase(getAllWorkshops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createWorkshop.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops.push(action.payload);
      })
      .addCase(createWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateWorkshop.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops = state.workshops.map((workshop) =>
          workshop._id === action.payload._id ? action.payload : workshop
        );
      })
      .addCase(updateWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteWorkshop.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops = state.workshops.filter(
          (workshop) => workshop._id !== action.payload._id
        );
      })
      .addCase(deleteWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getWorkshop.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshop = action.payload;
      })
      .addCase(getWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workshopSlice.reducer;
