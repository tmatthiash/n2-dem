import { Dispatch } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createStore, Store } from 'redux';
import { Action } from './action';
import { defaultState, Reducer } from './reducer';

export type AppState = ReturnType<typeof Reducer>;
export type AppStore = Store<AppState, Action>;
export type AppDispatch = Dispatch<Action>;

export const createAppStore = () => createStore(Reducer, defaultState);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;