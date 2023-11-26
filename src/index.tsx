import React from 'react'
import { render } from 'react-dom';
import { store } from './App/store';
import { Provider } from 'react-redux';
import { SocketProvider } from './SocketContext';
import ToDoApp from './App';

if (typeof document !== 'undefined') {
    render(
        <Provider store={store}>
            <SocketProvider>
                <ToDoApp />
            </SocketProvider>
        </Provider>, 
        document.getElementById('target')
    );
}