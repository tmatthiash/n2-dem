export type Action = 
    | {type: "SET_MESSAGE_BLOCK"; msgBlock: string[][] }
    | {type: "SET_MESSAGE"; message: string }
    | { type: "INCREMENT_COUNT" }