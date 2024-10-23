import { createSlice } from "@reduxjs/toolkit";
import {
    cancelRequest,
  createRoleRequest,
  createWorkshopRequest,
  deleteRequest,
  editRequest,
  getAllRequests,
  getRoleRequest,
  getWorkshopRequest,
  resendRequest,
  sendNote,
} from "../actions/request.actions";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    loading: true,
    requests: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createRoleRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRoleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createRoleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createWorkshopRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkshopRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createWorkshopRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getWorkshopRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkshopRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(getWorkshopRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(editRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.map((request) =>
          request._id === action.payload._id ? action.payload : request
        );
      })
      .addCase(editRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(cancelRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload
        );
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getRoleRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(getRoleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload
        );
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(sendNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendNote.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(resendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default requestSlice.reducer;
