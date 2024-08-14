import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';

export const Route = createLazyFileRoute('/tictactoe/$roomid')({
  component: function App() {
    const { roomid } = Route.useParams()
    const [uuid, setUuid] = useState(() => {
      const storedUuid = localStorage.getItem("uuid");
      if (storedUuid) {
        return storedUuid;
      } else {
        const newUuid = crypto.randomUUID();
        localStorage.setItem("uuid", newUuid);
        return newUuid;
      }
    });
    
    const { data } = useQuery({
      queryKey: ["room"],
      queryFn: async () => {
        const response =  await fetch(`http://localhost:3000/tictactoe?roomid=${roomid}&uuid=${uuid}`)
        return await response.json()
      }
    })

    const x = useWebSocket("ws://localhost:3000/tictactoe/ws", {
      onMessage(e) {
        console.log(e.data)
      },
    })
    

    return (
      <div className="flex justify-center items-center h-screen">
      </div>
    )
  }
})