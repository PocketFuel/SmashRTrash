import { ReactNode, createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER_URL}`);
// Define the shape of the context
export interface SocketContextProps {
    socket: object
}

// Create the User context
export const SocketContext = createContext<SocketContextProps | null>(null);

// Create the User context provider component
export const SocketProvider = ({ children }: { children: ReactNode }) => {

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketProvider = () => useContext(SocketContext);