import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { ISocketContextProps, ISocketProviderProps } from './Types/ISocket';


const SocketContext = createContext<ISocketProviderProps | undefined>(undefined);

export const useSocket = (): ISocketProviderProps => {

    const context = useContext(SocketContext);

    if(!context) {
        throw new Error('useSocket must be used within a SocketProvider!');
    }

    return context;

}

export const SocketProvider: React.FC<ISocketContextProps> = ({ children }) => {
    const socket = io('http://localhost:5000/'); // Replace with your server URL
  
    useEffect(() => {
      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }, [socket]);
  
    const contextValue: ISocketProviderProps = { value: socket };
  
    return (
      <SocketContext.Provider value={contextValue}>
        {children}
      </SocketContext.Provider>
    );
  };