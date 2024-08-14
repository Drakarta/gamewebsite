import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import utils from "../util/helper-function"

interface ResponseData {
  status: number
  message: string
  roomid: string
}

function CreateRoomButton(props: {type: string}) {
  const type = props.type
  const createRoomAPI = useMutation({
    mutationFn: async (type: string) => {
      try {
        const response = await fetch(`http://localhost:3000/createroom?type=${type}`);  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }  
        const data = await response.json();  
        return data;
      } catch (error) {
        throw error;
      }
    }
  })

  function handleButton() {
    createRoomAPI.mutate(type, {
      onSuccess: (data: ResponseData) => {
        if (data.status === 200) {
          utils.redirectToRoom(data.roomid)
        }
      }
    })
  }

  return (
    <Button onClick={() => handleButton(  )} className="w-1/3">Create room</Button>
  );
}

export default CreateRoomButton;