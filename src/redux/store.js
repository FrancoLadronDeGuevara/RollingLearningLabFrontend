import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.slice";
import workshopReducer from "./slices/workshop.slice";
import eventReducer from "./slices/event.slice";
import commentReducer from "./slices/comment.slice";
import requestReducer from "./slices/request.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workshop: workshopReducer,
    event: eventReducer,
    comment: commentReducer,
    request: requestReducer,
  },
});
