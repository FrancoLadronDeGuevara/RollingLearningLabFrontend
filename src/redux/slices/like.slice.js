import { createSlice } from "@reduxjs/toolkit";
import { likeEvent, likeWorkshop } from "../actions/like.actions";
import { likeComment } from "../actions/comment.actions";


const likeSlice = createSlice({
    name: "likes",
    initialState: {
        loading: true,
        commentLikes: [],
        workshopLikes: [],
        eventLikes: [],
    },
    reducers: {},
    extraReducers(builder) {
        builder

        .addCase(likeWorkshop.pending, (state) => {
            state.loading = true;
        })
        .addCase(likeWorkshop.fulfilled, (state, action) => {
            state.loading = false;
            state.likes = action.payload;
        })
        .addCase(likeWorkshop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(likeEvent.pending, (state) => {
            state.loading = true;
        })
        .addCase(likeEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.likes = action.payload;
        })
        .addCase(likeEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(likeComment.pending, (state) => {
            state.loading = true;
        })
        .addCase(likeComment.fulfilled, (state, action) => {
            state.loading = false;
            state.commentLikes.push(action.payload);
        })
        .addCase(likeComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export default likeSlice.reducer