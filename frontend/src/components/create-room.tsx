import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";

import JoinRoomForm from "./join-room-form";
import CreateRoomButton from "./create-room-button";

interface Game {
  name: string
  description: string
  type: string
}

function CreateRoom(props: { game: Game; }) {
  const game: Game = props.game

  return (
    <DialogContent className="w-[350px]">
      <DialogHeader>
        <DialogTitle>{game.name}</DialogTitle>
        <DialogDescription>Create or join room</DialogDescription>
      </DialogHeader>
      <div className="flex gap-2">
        <p>{game.description}</p>
      </div>
      <div className="flex justify-between">
        <Popover>
          <PopoverTrigger asChild>
              <Button>Join room</Button>
          </PopoverTrigger>
          <PopoverContent className="flex gap-2">
            <JoinRoomForm />
          </PopoverContent>
        </Popover>
        <CreateRoomButton type={game.type} />
      </div>
    </DialogContent>
  );
}

export default CreateRoom;