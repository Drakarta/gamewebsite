import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { websocket } from './util/websocket'
import tictactoe from './routes/tictactoe'
import room from './routes/room'

const app = new Hono()

app.use('/*', cors())

app.route("/", room)
app.route("/tictactoe", tictactoe)

Bun.serve({
    fetch: app.fetch,
    websocket,
})

console.log("server running")