import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export interface ISocketContextProps {
    children: ReactNode;
}

export interface ISocketProviderProps {
    value: Socket;
}
  