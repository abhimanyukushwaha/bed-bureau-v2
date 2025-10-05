import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducerSlice/adminReducer";

// Create store
export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
