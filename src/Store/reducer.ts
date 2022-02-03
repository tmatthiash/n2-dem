import { Action } from "./action"


interface State {
    msgBlock: string[][];
}

export const defaultState: State = {
    msgBlock: [["t","e"], ["s","t"]]
}

export const Reducer = (state: State = defaultState, action: Action): State => {
    switch (action.type) {
        case 'SET_MESSAGE_BLOCK':
            return {
                ...state,
                msgBlock: action.msgBlock,
            }
        default:
            return state;
    }
}