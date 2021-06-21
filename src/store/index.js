import { configureStore } from "@reduxjs/toolkit";
import filesTreeReducer from "./reducers/filesTreeReducer";
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    filesTree: filesTreeReducer,
  },
  middleware: [thunk],
});
