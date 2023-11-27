import { selectToDo, updateToDo, todoId } from "../Features/ToDoService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../App/store";

const SingleToDo = ({...props}) => {
    const dispatch = useDispatch<AppDispatch>();

    const viewTodo = (selId: string) => {

        dispatch(todoId(selId));

        dispatch(selectToDo());

    };

    return(
        <div className="single-todo" key={props.thisToDo._id}>
            <h3>{props.thisToDo.title}</h3>
            <p>{new Date(props.thisToDo.timeCreated!).toString()}</p>
            <p>{props.thisToDo.content}</p>
            <div>
                <button className="btn-select" type="button" onClick={() => viewTodo(props.thisToDo._id)}>View</button>
            </div>
        </div>
    )

}

export default SingleToDo