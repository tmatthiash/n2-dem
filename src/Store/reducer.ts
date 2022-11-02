import { Action } from "./action";

interface State {
    msgBlock: string[][];
    altitudeCount: number;
    message: string;
    latLon: string;
}

export const defaultState: State = {
    msgBlock: [
        ["t", "e"],
        ["s", "t"],
    ],
    message: "default",
    altitudeCount: 0,
    latLon: "",
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
        case "INCREMENT_COUNT":
            return {
                ...state,
                altitudeCount: state.altitudeCount + 1,
            };
        default:
            return state;
    }
};
