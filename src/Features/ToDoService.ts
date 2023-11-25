import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../App/store";
import { IToDo, IToDos, IToDoState } from "../Types/IToDo";

export const initialState: IToDoState = {
    ToDoSelected: false,
    UpdateSelected: false,
    ToDoIdSelected: '',
    ToDoArray: [],
    ToDoChanged: 0
}

// export type ToDos = ToDo[];

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        selectToDo: (state) => {
            state.ToDoSelected = !state.ToDoSelected
        },
        updateToDo: (state) => {
            state.UpdateSelected = !state.UpdateSelected
        },
        todoId: (state, action: PayloadAction<string>) => {
            const selectedId = action.payload
            state.ToDoIdSelected = selectedId
        },
        todoArray: (state, action: PayloadAction<IToDo[]>) => {
            state.ToDoArray = action.payload
        },
        todoChanged: (state, action: PayloadAction<number>) => {
            state.ToDoChanged = action.payload
        }
    }
})

export const { selectToDo, updateToDo, todoId, todoArray, todoChanged } = todosSlice.actions;

export default todosSlice.reducer;