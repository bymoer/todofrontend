import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useFetchTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, api } from "./Features/Api";
import { selectToDo, updateToDo, todoId, todoArray, todoChanged } from "./Features/ToDoService";
import { RootState, AppDispatch } from "./App/store";

import { useSocket } from "./SocketContext";

import CreateToDo from "./Components/CreateToDo";
import ToDoList from "./Components/ToDoList";
import ToDoDetails from "./Components/ToDoDetails";


const ToDoApp = () => {
    const dispatch =  useDispatch<AppDispatch>();

    // Setup Socket.IO conn
    const { value: socket } = useSocket();

    const {ToDoSelected, UpdateSelected, ToDoIdSelected} = useSelector((state: RootState) => state.todos)

    const {data, refetch} = useFetchTodosQuery();

    useEffect(() => {

        const fetchData = async () => {

            if (data) {
            console.log('Something happened', data);
            dispatch(todoArray(data));
            }

        };
    
        fetchData();

        socket.onAny( async (event, ...args) => {
          
            switch (event) {
                case 'ToDo Created':
                    console.log('Received data: ', args);
                    await refetch();
                    break;
                case 'ToDo Deleted':
                    console.log('Received data: ', args);
                    await refetch();
                    break;
                case 'ToDo Updated':
                    console.log('Received data: ', args);
                    await refetch();
                    break;
                case 'ToDo Complete':
                    console.log('Received data: ', args);
                    await refetch();
                    break;
                default:
                    break;
            }

        })

      }, [data, dispatch, refetch]);

    return(
        <div className="hello-todo-app">

            <div>
                <h1>Hello ToDo App !</h1>
            </div>

            <CreateToDo />

            {ToDoSelected ? <ToDoDetails /> : <ToDoList />}

        </div>
    )

}

export default ToDoApp;