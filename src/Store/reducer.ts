import { Action } from "./action";

interface State {
    msgBlock: string[][];
    altitudeCount: number;
    message: string;
    latLon: string;
    fuel: string;
    callsign: string;
    temperature: string;
}

export const defaultState: State = {
    msgBlock: [
        ["t", "e"],
        ["s", "t"],
    ],
    message: "default",
    altitudeCount: 0,
    latLon: "",
    fuel: "empty",
    callsign: "no callsign",
    temperature: "temp"
};

export const Reducer = (state: State = defaultState, action: Action): State => {
    switch (action.type) {
        case "SET_MESSAGE_BLOCK":
            return {
                ...state,
                msgBlock: action.msgBlock,
            };
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.message,
            };
        case "SET_LATLON":
            return {
                ...state,
                latLon: action.latLon,
            };
        case "SET_FUEL":
            return {
                ...state,
                fuel: action.fuel,
            };
        case "SET_CALLSIGN":
            return {
                ...state,
                callsign: action.callsign,
            };
        case "SET_TEMPERATURE":
            return {
                ...state,
                temperature: action.temperature,
            };
        case "INCREMENT_COUNT":
            return {
                ...state,
                altitudeCount: state.altitudeCount + 1,
            };
        default:
            return state;
    }
};
