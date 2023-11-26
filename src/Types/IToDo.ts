export interface IToDo {
    _id: string,
    title: string,
    content: string,
    isComplete: boolean,
    timeCreated: number
}

export interface IToDoState {
    ToDoSelected: boolean,
    UpdateSelected: boolean,
    ToDoIdSelected: string,
    ToDoArray: IToDos,
    ToDoChanged: number,
}

export type IToDos = IToDo[];