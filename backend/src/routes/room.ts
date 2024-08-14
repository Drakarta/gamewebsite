import { Hono } from 'hono'
import utils from '../util/helper-function'
import type tictactoe from './tictactoe';

const room = new Hono()

type Player = {
    uuid: string;
    name: string;
}

type Room = {
    players: Record<number, Player | {}>;
}

type Rooms = Record<string, Room>;

type GameId = Record<string, string>

const gameId: GameId = {
    tictactoe: "t" 
}

const rooms: Rooms = {}

room.get("/createroom", (c) => {
    const { type } = c.req.query()
    if (!type) {
        return c.json({ 
            status: 400, 
            message: "type is required" 
        }, 400);
    }
    const id = utils.generateId(3)
    const roomid = gameId[type] + id
    return c.json({
        status: 200,
        message: "Room created",
        roomid: roomid  
    })
})

room.get("/searchroom", (c) => {
    const { roomid } = c.req.query()
    if (!roomid) {
        return c.json({ 
            status: 400, 
            message: "roomid is required" 
        }, 400);
    }
    const room = rooms[roomid]
    if (room) {
        if (Object.keys(room.players).length < 2) {
            return c.json({
                status: 200,
                message: "Room found",
            })
        } else {
            return c.json({
                status: 204,
                message: "Room found, but is full",
            })
        }
    } else {
        return c.json({
            status: 404,
            message: "Room not found"
        });
    }
});

export default room