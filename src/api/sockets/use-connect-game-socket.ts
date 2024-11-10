import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useConnectGameSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io("http://localhost:4000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};

export default useConnectGameSocket;
