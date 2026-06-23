import { combineReducers } from "@reduxjs/toolkit";
import todosSlice from "./todos"

const reducer = combineReducers({
  todos: todosSlice
});

export default reducer;