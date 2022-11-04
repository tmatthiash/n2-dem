export type Action = 
    | {type: "SET_MESSAGE_BLOCK"; msgBlock: string[][] }
    | {type: "SET_MESSAGE"; message: string }
    | {type: "SET_LATLON"; latLon: string }
    | {type: "SET_FUEL"; fuel: string }
    | {type: "SET_CALLSIGN"; callsign: string }
    | {type: "SET_TEMPERATURE"; temperature: string }
    | { type: "INCREMENT_COUNT" }