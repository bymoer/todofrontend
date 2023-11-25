import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useFetchTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, api } from "./Features/Api";
import { selectToDo, updateToDo, todoId, todoArray, todoChanged } from "./Features/ToDoService";
import { RootState, AppDispatch } from "./App/store";

import CreateToDo from "./Components/CreateToDo";
import ToDoList from "./Components/ToDoList";
import ToDoDetails from "./Components/ToDoDetails";


const ToDoApp = () => {
    const dispatch =  useDispatch<AppDispatch>();

    const {ToDoSelected, UpdateSelected, ToDoIdSelected} = useSelector((state: RootState) => state.todos)

    // Should be removed when implemented in SingleToDo and ToDoDetails
    const ButtonSelect = () =>{
        dispatch(selectToDo());
    }

    const ButtonEdit = () => {
        dispatch(updateToDo());
    }
    
    const {data, refetch } = useFetchTodosQuery();

    useEffect(() => {
        const fetchData = async () => {

            if (data) {
            console.log('Something happened', data);
            dispatch(todoArray(data));
            }

        };
    
        fetchData();

      }, [data]);

    return(
        <div>

            <h1>Hello ToDo App !</h1>

            <button type="button" onClick={ButtonSelect}>Select ToDo</button>
            <button type="button" onClick={ButtonEdit}>Edit ToDo</button>

            <CreateToDo />

            {ToDoSelected ? <ToDoDetails /> : <ToDoList />}

        </div>
    )

}

export default ToDoApp;