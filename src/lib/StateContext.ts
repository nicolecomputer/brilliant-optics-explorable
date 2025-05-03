import { useContext } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { Action, State } from "@/core/reducer/types";

export function useState(): State {
    return useContext(StateContext)!;
}

export function useDispatch(): React.Dispatch<Action> {
    return useContext(DispatchContext)!;
}
