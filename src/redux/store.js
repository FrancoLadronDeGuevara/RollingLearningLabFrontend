import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.slice";
import workshopReducer from "./slices/workshop.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workshop: workshopReducer,
  },
});
