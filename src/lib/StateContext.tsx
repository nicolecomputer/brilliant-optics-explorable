"use client"

import { useContext, useReducer } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { Action, State } from "@/core/reducer/types";
import { reducer, defaultState } from "@/core/reducer";

export function useState(): State {
    return useContext(StateContext)!;
}

export function useDispatch(): React.Dispatch<Action> {
    return useContext(DispatchContext)!;
}

type TaskProviderProps = {
    labConfig?: State
    children: React.ReactNode
}
export function StateProvider({ children, labConfig }: TaskProviderProps) {
    const startingState = labConfig ?? defaultState
    const [state, dispatch] = useReducer(reducer, startingState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}


