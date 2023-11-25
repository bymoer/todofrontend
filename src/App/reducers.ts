import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../Features/Api";
import { todosSlice } from "../Features/ToDoService";

const rootReducer = combineReducers({
    api: api.reducer,
    todos: todosSlice.reducer,
});

export default rootReducer;