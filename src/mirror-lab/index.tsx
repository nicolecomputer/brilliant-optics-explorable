"use client"

import { defaultState, reducer } from "@/core/reducer";
import Observer from "./optics-components/Observer"
import "./style.css"
import { useReducer } from "react";
import { DispatchContext, StateContext } from "@/lib/StateProvider";
import { State } from "@/core/reducer/types";

export default function MirrorLab() {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <StateContext.Provider value={state as State}>
            <DispatchContext.Provider value={dispatch}>
                <div className="mirror-lab">
                    <Observer />
                </div>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
