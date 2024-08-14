import * as crypto from "crypto"

function generateId(length: number) {
    return crypto.randomBytes(length).toString("hex")
}

function findKeyByValue<T>(obj: Record<string, T>, value: T): string | undefined {
    const entry = Object.entries(obj).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
}

export default { generateId, findKeyByValue }