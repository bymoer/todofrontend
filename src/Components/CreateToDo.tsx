import React, { useState } from "react";
import { useCreateTodoMutation } from "../Features/Api";

const CreateToDo = ({...props}) => {
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const [mutate, { /*isLoading, isSuccess, isError*/ }] = useCreateTodoMutation();

    const onHandleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value)
    }

    const onHandleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditContent(event.target.value)
    }

    const onHandleSave = async () => {

        const newToDo = {title: editTitle, content: editContent, isComplete: false, timeCreated: Date.now()};
        
        try {
            
            await mutate(newToDo);

            setEditTitle('');
            setEditContent('');

        } catch (error) {

            console.error(error);
            
        }

    }

    return(
        <div className="create-todo">
            <div>
                <input placeholder="Enter title" type="text" onChange={onHandleTitleChange} value={editTitle}></input>
            </div>
            
            <div>
                <textarea placeholder="Enter content" onChange={onHandleContentChange} value={editContent}></textarea>
            </div>

            <div>
                <button className="btn-verify" value="button" onClick={onHandleSave}>Save</button>
            </div>
        </div>
    )

}

export default CreateToDo