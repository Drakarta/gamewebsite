import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components//ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import utils from "../util/helper-function"

interface ResponseData {
  status: number
  message: string
}

const roomcodeSchema = z.object({
  roomcode: z.string().length(7, {
    message: "Invalid room code",
  })
})

function JoinRoomForm() {
  const [roomDoesntExist, setRoomDoesntExist] = useState(false)
  const form = useForm<z.infer<typeof roomcodeSchema>>({
    resolver: zodResolver(roomcodeSchema),
    defaultValues: {
      roomcode: "",
    },
  })

  const joinRoomAPI = useMutation({
    mutationFn: async (roomcode: string) => {
      try {
        const response = await fetch(`http://localhost:3000/searchroom?roomid=${roomcode}`);  
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

  function onSubmit(input: z.infer<typeof roomcodeSchema>) {
    joinRoomAPI.mutate(input.roomcode, {
      onSuccess: (data: ResponseData) => {
        if (data.status === 200 || data.status === 204) {
          utils.redirectToRoom(input.roomcode)
        } else {
          setRoomDoesntExist(true)
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form onChange={() => setRoomDoesntExist(false)} onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField 
          control={form.control}
          name="roomcode"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className={roomDoesntExist && "text-destructive" || ""}>Room code</FormLabel>
                <FormDescription>Input your room code here</FormDescription>
              </div>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="Room code" {...field}/>
                </FormControl>
              </div>
              <div>
                <FormMessage />
                {roomDoesntExist && <p className="font-medium text-[0.8rem] text-destructive">Room doesn't exist</p> || ""}
              </div>
            </FormItem>
          )}
        />
        <Button className="mt-[3.2rem]" type="submit">Submit</Button>
      </form>
    </Form> );
}

export default JoinRoomForm;