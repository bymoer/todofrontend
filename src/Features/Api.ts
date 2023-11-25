import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IToDo, IToDos } from '../Types/IToDo';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    fetchTodos: builder.query<IToDos, void>({
        query: () => 'todos'
    }),
    createTodo: builder.mutation<IToDo, {title: string, content: string}>({
        query: ({title, content}) => ({
            url: 'createtodo',
            method: 'POST',
            body: {title, content},
        })
    }),
    updateTodo: builder.mutation<IToDo, {_id: string | undefined, title: string, content: string}>({
        query: ({_id, title, content}) => ({
            url: `updatetodo/${_id}`,
            method: 'PUT',
            body: {_id, title, content}
        })
    }),
    deleteTodo: builder.mutation<IToDo, {_id: string | undefined}>({
        query: ({_id}) => ({
            url: `deletetodo/${_id}`,
            method: 'DELETE',
        })
    }),
  })
});

export const { useFetchTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = api;