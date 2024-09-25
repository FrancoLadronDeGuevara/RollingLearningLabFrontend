import { createSlice } from "@reduxjs/toolkit";
import {
  blockComment,
  blockReply,
  createEventComment,
  createWorkshopComment,
  deleteComment,
  deleteReply,
  editComment,
  editReply,
  getEventComments,
  getUserComments,
  getWorkshopComments,
  replyComment,
  unblockComment,
  unblockReply,
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

      .addCase(editComment.pending, (state) => {
        state.loading = true;
      })

      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = state.workshopComments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
        state.eventComments = state.eventComments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
      })
      .addCase(editComment.rejected, (state, action) => {
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
      })

      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = state.workshopComments.filter(
          (comment) => comment._id !== action.payload._id
        );
        state.eventComments = state.eventComments.filter(
          (comment) => comment._id !== action.payload._id
        );
        state.userComments = state.userComments.filter(
          (comment) => comment._id !== action.payload._id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(blockComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = state.workshopComments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
        state.eventComments = state.eventComments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
      })
      .addCase(blockComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(replyComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const workshopIndex = state.workshopComments.findIndex(
          (comment) => comment._id === action.payload.commentId
        );
        const eventIndex = state.eventComments.findIndex(
          (comment) => comment._id === action.payload.commentId
        );
        if (workshopIndex !== -1) {
          state.workshopComments[workshopIndex].replies.push(
            action.payload.reply
          );
        } else if (eventIndex !== -1) {
          state.eventComments[eventIndex].replies.push(action.payload.reply);
        }
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const workshopIndex = state.workshopComments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        const eventIndex = state.eventComments.findIndex(
          (comment) => comment._id === action.payload._id
        );

        if (workshopIndex !== -1) {
          state.workshopComments[workshopIndex] = action.payload;
        } else if (eventIndex !== -1) {
          state.eventComments[eventIndex] = action.payload;
        }
      })
      .addCase(deleteReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(editReply.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = state.workshopComments.map((comment) => {
          if (
            comment.replies.some((reply) => reply._id === action.payload._id)
          ) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === action.payload._id ? action.payload : reply
              ),
            };
          }
          return comment;
        });

        state.eventComments = state.eventComments.map((comment) => {
          if (
            comment.replies.some((reply) => reply._id === action.payload._id)
          ) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === action.payload._id ? action.payload : reply
              ),
            };
          }
          return comment;
        });
      })
      .addCase(editReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(blockReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockReply.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = state.workshopComments.map((comment) => {
          if (
            comment.replies.some((reply) => reply._id === action.payload._id)
          ) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === action.payload._id ? action.payload : reply
              ),
            };
          }
          return comment;
        });

        state.eventComments = state.eventComments.map((comment) => {
          if (
            comment.replies.some((reply) => reply._id === action.payload._id)
          ) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === action.payload._id ? action.payload : reply
              ),
            };
          }
          return comment;
        });
      })
      .addCase(blockReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(unblockComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(unblockComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = state.workshopComments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
        state.eventComments = state.eventComments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
      })
      .addCase(unblockComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(unblockReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(unblockReply.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopComments = state.workshopComments.map((comment) => {
          if (
            comment.replies.some((reply) => reply._id === action.payload._id)
          ) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === action.payload._id ? action.payload : reply
              ),
            };
          }
          return comment;
        });

        state.eventComments = state.eventComments.map((comment) => {
          if (
            comment.replies.some((reply) => reply._id === action.payload._id)
          ) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === action.payload._id ? action.payload : reply
              ),
            };
          }
          return comment;
        });
      })
      .addCase(unblockReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
