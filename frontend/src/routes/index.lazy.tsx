import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import CreateRoom from '@/components/create-room'
import JoinRoomForm from '@/components/join-room-form'

export const Route = createLazyFileRoute('/')({
  component: function App() {
    const games = {
      "tictactoe" : {
        name : "Tic-Tac-Toe",
        description : "Text",
        type: "tictactoe"
      }
    }

    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px]">
          <CardHeader className="flex flex-row justify-between">
            <div className="w-1/2">
              <CardTitle>Games</CardTitle>
              <CardDescription>Choose a game</CardDescription>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                  <Button variant={'outline'}>Join room</Button>
              </PopoverTrigger>
              <PopoverContent className="flex gap-2">
                <JoinRoomForm />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent className="gap-2 grid grid-cols-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">{games["tictactoe"].name}</Button>
              </DialogTrigger>
              <CreateRoom game={games["tictactoe"]}  />
            </Dialog>
            <Button disabled>Soon™...</Button>
          </CardContent>
        </Card>
      </div>
    )
  }
})