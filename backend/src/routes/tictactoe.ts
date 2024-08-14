import { Hono } from 'hono'
import { upgradeWebSocket } from '../util/websocket'

const tictactoe = new Hono()

tictactoe.get(
    "/ws",
    upgradeWebSocket((c) => {
        return {
            onOpen(event, ws) {
                console.log("connection opened")
                ws.send("Hello from server!")
            },
            onMessage(event, ws) {
                console.log(`Message from client: ${event.data}`)
                ws.send("Message received!")
            },
            onClose: () => {
                console.log("connection closed")
            }
        }
    })
)

export default tictactoe
