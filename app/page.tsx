"use client"

import { useState} from "react";
import { socket } from "@/lib/socket";
import Main from "@/components/Main";

export default function Home() {
  const [connection, setConnection] = useState(socket.connected)

  function onConnect() {
    console.log(`Connection: ${connection.valueOf()}`)
    setConnection(true);
  }

  function onDisconnect() {
    console.log(`Connection: ${connection.valueOf()}`)
    setConnection(false);
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);

  return (
    <Main />
  );
}
