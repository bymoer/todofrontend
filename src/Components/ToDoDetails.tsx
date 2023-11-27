import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../App/store";
import React, { useState } from "react";
import { updateToDo, selectToDo } from "../Features/ToDoService";
import { useUpdateTodoMutation, useDeleteTodoMutation, useCompleteTodoMutation } from "../Features/Api";
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

    const [onCompleteToDo, {}] = useCompleteTodoMutation();

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value);
    }

    const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditContent(event.target.value)
    }

    const editTodo = () => {

        dispatch(updateToDo());

    }

    const updateTodo = async () => {

        try {

            const todoData = {_id: thisTodo?._id, title: editTitle, content: editContent};

            await updateTodoMutation(todoData);

            dispatch(updateToDo());

            dispatch(selectToDo());
            
        } catch (error) {

            console.error(error);
            
        }

    }

    const onDeleteToDo = () => {

        try {
            
            let deleteId = thisTodo?._id;

            console.log('Selected ID: ', deleteId);

            deleteToDo({_id: deleteId});

            dispatch(selectToDo());

        } catch (error) {
            
            console.error(error);

        }

    }

    const onToDoComplete = () => {

        try {

            let completeId = thisTodo?._id;

            console.log('Selected for completion id: ', completeId);

            // safety for todos without isComplete prop - yeah yeah I know

            if(thisTodo?.isComplete == undefined) {
                let isComplete = true;

                onCompleteToDo({_id: completeId, isComplete: isComplete})

            } else {

                onCompleteToDo({_id: completeId, isComplete: !thisTodo.isComplete})

            }

            dispatch(selectToDo());
            
        } catch (error) {
            
        }

    }

    return(
        <div className="todo-details">
        {editToDo ? 
            <div className="edit-input">
                <div>
                    <input type="text" value={editTitle} onChange={onChangeTitle}></input>
                </div>
                <div>
                    <textarea value={editContent} onChange={onChangeContent}></textarea>
                </div>
            </div> 
            : 
            <div>
                <h3>{thisTodo?.title}</h3>
                <p>{new Date(thisTodo?.timeCreated!).toString()}</p>
                <p>{thisTodo?.content}</p>
            </div>
        }
        {editToDo ? 
            <div>
                <button className="btn-verify" type="button" onClick={() => updateTodo()}>Save</button>
            </div>
            : 
            <div>
                <button className="btn-select" type="button" onClick={() => editTodo()}>Edit</button>
                <button className="btn-delete" type="button" onClick={() => onDeleteToDo()}>Delete</button>

                <button className={thisTodo?.isComplete ? "btn-delete" : "btn-verify" } type="button" onClick={() => onToDoComplete()}>{thisTodo?.isComplete ? 'Redo' : 'Complete'}</button>

            </div>
            }
        </div>
    )

}

export default ToDoDetails;