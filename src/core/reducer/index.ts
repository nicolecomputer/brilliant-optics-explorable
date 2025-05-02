import { calculateReflections } from "../optics"
import { Mirror, Observer, ObservableObject } from "../types"
import { State, Action, SimulationOptions } from "./types"

export default function reducer(state: State, action: Action): State {
    // First apply the action to the state to get the next state
    let nextState: State = {
        ...state,
        mirrors: mirrorReducer(state.mirrors, action),
        observer: observerReducer(state.observer, action),
        observableObjects: observableObjectReducer(state.observableObjects, action),
        simulationOptions: simulationOptionsReducer(state.simulationOptions, action)
    }

    // Then using the next state calculate all of the reflections that exist
    // NOTE(NEW)/TODO(NEW): This might make sense as a calculated property that happens in a component
    // and feeds into the simulation (maybe move out the reducer). Ditto for rays
    nextState = {
        ...nextState,
        reflections: calculateReflections(nextState.observer, nextState.observableObjects, nextState.mirrors)
    }

    return nextState
}

// Child Reducers

export function mirrorReducer(mirrors: Mirror[], action: Action): Mirror[] {
    if (!action.type.startsWith("MIRROR")) {
        return mirrors
    }

    return mirrors
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function observerReducer(observer: Observer, action: Action): Observer {
    return observer
}

export function observableObjectReducer(observableObjects: ObservableObject[], action: Action): ObservableObject[] {
    if (!action.type.startsWith("OBSERVABLE-OBJECT")) {
        return observableObjects
    }

    return observableObjects
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function simulationOptionsReducer(simulationOptions: SimulationOptions, action: Action): SimulationOptions {
    return simulationOptions
}

