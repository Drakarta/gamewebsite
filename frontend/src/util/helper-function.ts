type GameId = Record<string, string>

const gameId: GameId = {
    tictactoe: "t" 
}

function findKeyByValue<T>(obj: Record<string, T>, value: T): string | undefined {
    const entry = Object.entries(obj).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
}

function redirectToRoom(roomcode: string) {
    const roomtype = findKeyByValue(gameId, roomcode[0])
    location.href = `/${roomtype}/${roomcode}`
}

export default { findKeyByValue, redirectToRoom }