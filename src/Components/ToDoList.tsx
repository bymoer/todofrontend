import { Key, useEffect } from "react";
import SingleToDo from "./SingleToDo";
import { useFetchTodosQuery } from "../Features/Api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../App/store";
import { RootState } from "../App/store";
import { IToDo, IToDos } from "../Types/IToDo";

const ToDoList = () => {
    const todoArray: IToDos = useSelector((state: RootState) => state.todos.ToDoArray)

    return(
        <div className="todo-list">

            {
            todoArray ? (
                    todoArray.map((todo: IToDo) => <SingleToDo key={todo._id} thisToDo={todo} />)
                    ) : (
                    <h3>Løwding...</h3>
                    )
            }


        </div>
    )

}

export default ToDoList