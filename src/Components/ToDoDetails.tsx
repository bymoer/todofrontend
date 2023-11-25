import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../App/store";
import React, { useState } from "react";
import { updateToDo, selectToDo } from "../Features/ToDoService";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../Features/Api";
import { IToDo, IToDos } from "../Types/IToDo";

const ToDoDetails = () => {
    const dispatch = useDispatch<AppDispatch>();

    const todoCollection: IToDo[] = useSelector((state: RootState) => state.todos.ToDoArray)

    const todoId: string = useSelector((state: RootState) => state.todos.ToDoIdSelected)

    const editToDo: boolean = useSelector((state: RootState) => state.todos.UpdateSelected)
    
    const thisTodo = todoCollection.find(todo => todo._id === todoId);

    const [editTitle, setEditTitle] = useState(thisTodo?.title || '');
    const [editContent, setEditContent] = useState(thisTodo?.content || '');

    const [updateTodoMutation, { isLoading, isError, isSuccess }] = useUpdateTodoMutation();

    const [deleteToDo ,{}] = useDeleteTodoMutation();

    const editTodo = () => {

        dispatch(updateToDo());

    }

    const updateTodo = async () => {

        try {

            const todoData = {_id: thisTodo?._id, title: editTitle, content: editContent};

            await updateTodoMutation(todoData);

            dispatch(selectToDo());
            
        } catch (error) {

            console.error(error);
            
        }

    }

    
    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value);
    }

    const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditContent(event.target.value)
    }

    const onDeleteToDo = () => {

        try {
            
            let deleteId = thisTodo?._id;

            console.log('Selected ID: ', deleteId);

            deleteToDo({_id: deleteId});

        } catch (error) {
            
            console.error(error);

        }

    }

    return(
        <div>
        {editToDo ? 
            <div>
                <input type="text" value={editTitle} onChange={onChangeTitle}></input>
                <textarea value={editContent} onChange={onChangeContent}></textarea>
            </div> 
            : 
            <div>
                <h3>{thisTodo?.title}</h3>
                <p>{thisTodo?.content}</p>
            </div>
        }
        {editToDo ? 
            <div>
                <button type="button" onClick={() => updateTodo()}>Save</button>
            </div>
            : 
            <div>
                <button type="button" onClick={() => editTodo()}>Edit</button>
                <button type="button" onClick={() => onDeleteToDo()}>Delete</button>
            </div>
            }
        </div>
    )

}

export default ToDoDetails;